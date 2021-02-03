/**
 * 主要用于做历史回测
 * 
 * 定投策略
 * 1.确认投入本金
 * 2.确认计划投入周期：整体时间，间隔时间，每次投入份额
 * 
 * 本金恒定策略：
 * 1.设定恒定本金金额
 * 2.设置卖出收益率和最小时间间隔
 * 3.设置买进亏损率和最小时间问题
 * 思考：
 * 可以通过设置以上参数，适应不同市场？
 * 是否可以设置多个目标
 * 
 * 动态止盈/止损
 * 1.设定止盈目标和最小时间间隔
 * 2.设置止损目标和最小时间间隔
 */
const mathjs = require('mathjs');

// 恒定本金金额
const constantInvote = 10000;
// 目标收益和最小时间，用于卖出保持本金恒定
const targetIncome = 0.20;
const invoteMinTime = 7;
// 目标亏损率和最小时间，用于买进保持本金恒定
const targetDeficit = -0.1;
const deficitMinTime = 15;

const DEFAULT_PROPS = {
    price: 'price',
    time: 'timer'
}

const opEnums = {
    sell: '卖出(手动)',
    buy: '买进(手动)',
    autoSell: '卖出(自动)',
    autoBuy: '买进(自动)',
    clear: '清仓'
}

function count(n, l = 2) {
    return mathjs.round(n, l);
}

function isBlankVar(param) {
    if ([undefined, null, '', NaN].includes(param)) return true;
    if (Array.isArray(param) && Array.length === 0) return true;
    const type = typeof param;
    if (type === 'object' && JSON.stringify(param) === '{}') return true;
    return false;
}

class TradingModel {
    constructor(data = [], options = {}) {
        this.init(data, options);
    }
    /**
     * 初始化：
     * 1.初始化配置
     * 1.建仓
     */
    init(data, options) {

        // 要回撤历史数据
        this.data = data;

        this.props = {
            ...DEFAULT_PROPS,
            ...options.props
        };

        // 基金信息
        // 基金名称，CODE等
        this.fund = options.fund;

        // 建仓时间
        this.startTime = '';

        // 操作时间
        this.operationTime = '';

        // invote: 投入本金
        // 初始投入本金：不会发生改变
        this.startInvote = 0;
        // 累计投入本金：整个过程中最大需要投入的现金
        // 累计每次买进的金额（包括建仓）
        this.totalInvote = 0;
        // 累计净投入本金：整个过程中最小需要投入的现金
        // 利用卖出产生的正收益，进行下一次买进（理论上不抵扣上一次的买进），抵扣部分不计入累计投入本金
        this.netInvote = 0;
        // 持仓包含的本金：随着卖出和买进，持仓中的本金会发生变化
        this.postionInvote = 0;

        // 初始买进的净值：不会发生改变
        this.startPrice = 0;
        // 市净值：当前基金的确认净值
        this.marketPrice = 0;
        // 持仓成本价: 只当前持仓金额和当前份额的单价
        // positionValue / positionAmount
        this.positionPrice = 0;

        // amount: 份额
        // 持仓份额: 原有份额 + 变动份额(买进：份额为+；卖出份额为-)
        this.positionAmount = 0;

        // 持仓市值(持仓金额): 持仓所有份额的价值
        // 持仓份额（新） * 当前价格
        this.positionValue = 0;

        // 持仓总收益：在每买入/卖出后更新
        this.positionTotalIncome = 0;
        // 持仓收益率
        this.positionTotalRate = 0;

        // income: 收益
        // 累计收益：包含卖出和持仓在内的所有收益
        this.totalIncome = 0;
        // 累计净收益：卖出部分作为本金循环使用后剩余的收益
        this.netIncome = 0;

        // 累计收益率: totalIncome / totalInvote
        this.totalRate = 0;

        this.records = [];

        // 策略参数
        // 恒定本金：原则上初始建仓是一次性买入，如需分批买入
        this.constantInvote = options.constantInvote || constantInvote;
        // 目标收益和亏损率: 暂未考虑时间
        this.targetIncome = options.targetIncome || targetIncome;
        this.targetDeficit = options.targetDeficit || targetDeficit;

        // TODO
        // 卖出频次: 必须高于七天才能卖出，减少手续费
        this.sellInterval = 7;

        this.createPosition(options.startInvote);
        const len = 20 || this.data.length;
        for (let i = 1; i < len; i++) {
            this.checkTrade(data[i]);
        }
    }

    // 取出数据中的价格和时间
    getFundData(data = {}) {
        return {
            price: data[this.props.price],
            time: data[this.props.time]
        };
    }

    setCommonVars(data) {
        const {
            price,
            time
        } = data;

        // 记录买入时间
        this.operationTime = time;
        // 记录买入价格
        this.marketPrice = price;
    }

    /**
     * @function 建仓，默认取数据的第一条价格
     * @param value 初始买入金额
     * @param fundData 基金的数据
     *  */
    createPosition(value, fundData) {
        console.log('startInvote==>', value);
        let data = fundData || this.data[0];
        if (!value && value < 0) {
            console.log('无建仓数据');
            return;
        };
        const {
            price,
            time
        } = this.getFundData(data);
        this.startTime = time;
        this.startPrice = price;
        this.startInvote = value;
        this.buy(value, data);
    }

    /** 
     * 卖出前的检查
     * 份额是否大于持有份额
     */
    checkSell(amount, { price } = {}) {
        if (amount > this.positionAmount) {
            console.log('=== 卖出份额不能大于持仓份额！===');
            return true;
        }
    }

    /**
     * 买入
     * 
     * 需要更新
     * 持仓包含的本金：postionInvote
     * 累计投入本金：totalInvote
     * 累计净投入本金：netInvote
     * 
     * 市净值: marketPrice
     * 持仓成本单价：positionPrice
     * 持仓份额：positionAmount
     * 持仓市值(持仓金额): postionValue
     * 
     * 当前持仓收益：positionTotalIncome
     * 当前持仓收益率：positionTotalRate
     * 
     * @param {Object} data: 买入信息
     * @param {Number} value: 买入金额
     */
    buy(value, data) {
        const {
            price,
            time
        } = this.getFundData(data);

        this.setCommonVars({
            price,
            time
        });

        // 如果不使用盈利再投入，所需要投入的最大总资金
        this.totalInvote = count(value + this.totalInvote);
        // 如果使用盈利再投入：优先使用盈利再投入
        const inFactNeedInvote = value - this.netIncome;
        if (inFactNeedInvote > 0) {
            this.netIncome = 0;
            this.netInvote = count(inFactNeedInvote + this.netInvote);
        } else {
            this.netIncome = count(-inFactNeedInvote);
        }
        // 当前持仓的中本金金额
        this.postionInvote = count(value + this.postionInvote);
        // 缓存一些数据
        const prePositionAmount = this.positionAmount;
        const prePositionPrice = this.positionPrice;
        const prePositionTotalIncome = this.positionTotalIncome;

        // 更新份额：买入金额/买入价格 + 当前份额（旧）
        this.positionAmount = count(value / price + prePositionAmount, 4);
        /**
         * 更新持仓金额：
         * 方式1：当前份额（旧） * 当前价格 + 本次买入金额
         * 方式2：当前份额（新） * 当前价格
         */
        // 持仓成本价：持仓金额 / 当前份额（新）
        this.positionPrice = count(this.postionInvote / this.positionAmount, 4);
        console.log('======dd===>', this.positionAmount, price);
        console.log('=====================');
        this.positionValue = count(this.positionAmount * price);

        // 持仓收益：持仓金额 - 持仓本金
        this.positionTotalIncome = count(this.positionValue - this.postionInvote);
        // 持仓收益率
        this.positionTotalRate = count(this.positionTotalIncome / this.postionInvote, 4);
        // // 累积收益：包含持仓和卖出部分收益
        this.totalIncome = count(this.totalIncome + (this.positionTotalIncome - prePositionTotalIncome));
        this.totalRate = count(this.totalIncome / this.totalInvote, 4);

        this.pushRecord('autoBuy', {
            preAmount: prePositionAmount,
            changeMoney: value,
            changeAmout: count(this.positionAmount - prePositionAmount),
            prePrice: prePositionPrice
        });

        // console.log('-------START BUY-------');
        // console.log('operationTime==>', this.operationTime);
        // console.log('marketPrice==>', this.marketPrice);
        // console.log('totalInvote==>', this.totalInvote);
        // console.log('netInvote==>', this.netInvote);
        // console.log('netIncome==>', this.netIncome);
        // console.log('postionInvote==>', this.postionInvote);
        // console.log('positionAmount==>', this.positionAmount);
        // console.log('positionPrice==>', this.positionPrice);
        // console.log('positionValue==>', this.positionValue);
        // console.log('positionTotalIncome==>', this.positionTotalIncome);
        // console.log('positionTotalRate==>', this.positionTotalRate);
        // console.log('totalIncome==>', this.totalIncome);
        // console.log('totalRate==>', this.totalRate);
        // console.log('-------END BUY-------');
    }
    
    /**
     * 卖出指定份额
     * 
     * 需要更新
     * 持仓包含的本金：postionInvote
     * 
     * 市净值: marketPrice
     * // 持仓成本单价：positionPrice
     * 持仓份额：positionAmount
     * 持仓市值(持仓金额): postionValue
     * 
     * 当前持仓收益：positionTotalIncome
     * 当前持仓收益率：positionTotalRate
     * 
     * 累积总收益：totalIncome
     * 累积净收益：netIncome
     * 累积总收益率：totalRate
     * 累积净收益率：netRate
     * 
     * @param {Object} data: 买入信息
     * @param {Number} value: 买入金额
     */

    sellByAmount(amount, data) {
        if (this.checkSell(amount)) return;

        const {
            price,
            time
        } = this.getFundData(data);

        this.setCommonVars({
            price,
            time
        });

        this.positionAmount = count(this.positionAmount - amount, 4);
        this.positionValue = count(this.positionAmount * price);

        // 缓存一些数据
        const prePositionAmount = this.positionAmount;
        const prePositionPrice = this.positionPrice;

        // 持仓包含的本金: 持仓本金 - 成本价 * 份额
        this.postionInvote = count(this.postionInvote - this.positionPrice * amount);

        // 持仓收益：持仓金额 - 持仓本金
        this.positionTotalIncome = count(this.positionValue - this.postionInvote);
        // 持仓收益率
        this.positionTotalRate = count(this.positionTotalIncome / this.postionInvote);

        // 累积总收益: （市价 - 成本价）* 卖出份额
        const totalIncome = count(this.totalIncome + amount * (price - this.positionPrice));
        this.totalIncome = count(totalIncome + this.positionTotalIncome);
        // 累积总收益率: 没有计入持仓的收益
        this.totalRate = count(this.totalIncome / this.totalInvote, 4);

        this.pushRecord('autoSell', {
            preAmount: prePositionAmount,
            changeMoney: count(amount * price),
            changeAmout: amount,
            prePrice: prePositionPrice
        });
    }

    // 记录操作
    pushRecord(type, data) {
        const {
            preAmount,
            changeMoney,
            changeAmout,
            prePrice,
        } = data;
        this.records.push({
            操作类型: opEnums[type],
            时间: this.operationTime,
            // 初始本金: this.invote,
            持仓金额: this.positionValue,
            在投本金: this.postionInvote,
            上期单价: prePrice,
            市场单价: this.marketPrice,
            持仓单价: this.positionPrice,
            上期持仓份额: preAmount,
            最新持仓份额: this.positionAmount,
            变动金额: changeMoney,
            变动份额: changeAmout,
            持仓收益: this.positionTotalIncome,
            持仓收益率: `${count(this.positionTotalRate * 100)}%`,
            累计收益: this.totalIncome,
            累计收益率: `${count(this.totalRate * 100)}%`
        })
    }

    // // --------------------------------OLD---------------------------------------

    /**
     * 1.计算数据
     * 传入的数据应该是有单价
     * @param {}} item 
     */
    checkTrade(data) {
        const { price } = this.getFundData(data);
        const rate = count(price / this.positionPrice - 1, 4);
        const value = count(this.positionValue * rate);
        if (rate >= this.targetIncome) {
            this.sellByAmount(count(value / price, 4), data);
        }
        if (rate <= this.targetDeficit) {
            console.log('this.rate==>', rate, (this.positionValue - price * this.positionAmount) / this.positionValue);
            console.log('this.positionValue==>', this.positionValue);
            this.buy(this.positionValue - price * this.positionAmount, data);
        }
    }

    doOperation(type, data) {

    }
 
    // // 计算当前单价的数据变动点
    // countData(item, dealType = this.dealType) {
    //     const { standard, type } = dealType;
    //     const price = item[this.priceKey];
    //     const time = item[this.timeKey];
    //     const rate = count(price / this.marketPrice - 1, 4);
    //     let changeMoney = 0;
    //     let changeAmout = 0;

    //     const markValue = price * this.nowAmount;

    //     if (type === 'money') {
    //         changeMoney = count(markValue - standard);
    //         changeAmout = count(changeMoney / price, 4);
    //     } else {
    //         changeMoney = count(price * (this.nowAmount - standard));
    //         changeAmout = count(this.nowAmount - standard, 4);
    //     }
    //     // if (rate >= this.targetIncome || rate <= this.targetDeficit) {
    //     //     console.log(this.nowPrice * this.nowAmount, changeMoney);
    //     // }
    //     return {
    //         time,
    //         price,
    //         rate,
    //         preAmount: this.nowAmount,
    //         changeMoney,
    //         changeAmout,
    //         income: changeMoney,
    //         changeInvote: changeMoney,
    //         postionInvote: count(this.postionInvote - changeMoney),
    //         prePrice: this.nowPrice,
    //         // nowPrice: count((this.nowPrice * this.nowAmount - changeMoney) / (this.nowAmount - changeAmout), 4),
    //         nowPrice: count((standard - changeMoney) / (this.nowAmount - changeAmout), 4)
    //     };
    // }
    // // 更新数据
    // updateData(data) {
    //     const {
    //         price,
    //         changeAmout,
    //         changeInvote,
    //         nowPrice
    //     } = data;
    //     // this.inInvote = count(this.inInvote - changeInvote);
    //     this.nowAmount = count(this.nowAmount - changeAmout, 4);
    //     this.marketPrice = price;
    //     this.nowPrice = nowPrice;
    // }

    // updatetotalInvote(type, data) {
    //     const {
    //         income,
    //         changeInvote
    //     } = data;
    //     console.log(this.totalIncome, changeInvote);
    //     if (type === 'autoSell') {
    //         this.totalIncome = count(this.totalIncome + income);
    //     } else {
    //         const tempIncome = count(this.totalIncome + changeInvote);
    //         // 过往盈利，能够支撑再投资
    //         if (tempIncome >= 0) {
    //             this.totalIncome = count(tempIncome);
    //         } else {
    //             this.totalInvote = count(this.totalInvote - tempIncome);
    //             // console.log(this.totalIncome, changeInvote, tempIncome);
    //             this.totalIncome = 0;
    //         }
    //     }
    // }

    // // // 记录操作
    // // pushRecord(type, result) {
    // //     const {
    // //         time,
    // //         rate,
    // //         preAmount,
    // //         changeMoney,
    // //         changeAmout,
    // //         prePrice,
    // //         income
    // //     } = result;
    // //     this.record.push({
    // //         操作类型: opEnums[type],
    // //         时间: time,
    // //         // 初始本金: this.invote,
    // //         持仓金额: count(this.nowAmount * this.marketPrice),
    // //         在投本金: this.inInvote,
    // //         // 初始单价: this.price,
    // //         上期单价: prePrice,
    // //         市场单价: this.marketPrice,
    // //         持仓单价: this.nowPrice,
    // //         // 初始份额: this.amount,
    // //         // 操作前持仓份额
    // //         上期持仓份额: preAmount,
    // //         最新持仓份额: this.nowAmount,
    // //         变动金额: -changeMoney,
    // //         变动份额: -changeAmout,
    // //         收益: income,
    // //         收益率: `${count(rate * 100)}%`,
    // //         累计收益: this.totalIncome,
    // //         累计收益率: `${count(this.totalIncome / this.totalInvote * 100)}%`,
    // //     })
    // // }
 
    // inTotal() {
    //     const totalIncome = this.record.reduce((t, n = {}) => {
    //         return count(t + n['收益']);
    //     }, 0);
    //     this.total = {
    //         基金: this.fundCode,
    //         恒定持仓金额: this.constantInvote,
    //         止盈点设置: this.targetIncome,
    //         买进点设置: this.targetDeficit,
    //         初始投入: this.invote,
    //         总投入: this.totalInvote,
    //         总盈利: totalIncome,
    //     }
    // }

    // // 卖出
    // sell(data) {
    //     this.updateData(data, this.dealType);
    //     this.updatetotalInvote('autoSell', data);
    //     this.pushRecord('autoSell', data);
    // }

    // // 买进
    // // buy(data) {
    // //     this.updateData(data);
    // //     // this.totalInvote = count(this.totalInvote - data.changeMoney);
    // //     this.updatetotalInvote('autoBuy', data);
    // //     this.pushRecord('autoBuy', {
    // //         ...data,
    // //         income: 0,
    // //         rate: 0
    // //     });
    // // }

    // // 清仓
    // clearance(item) {
    //     if (this.nowAmount <= 0) return;
    //     const data = this.countData(item, {
    //         type: 'amout',
    //         standard: 0
    //     });

    //     const _data = {
    //         ...data,
    //         income: count(data.rate * data.price * this.nowAmount),
    //         changeInvote: this.inInvote
    //     };
    //     this.updateData(_data);
    //     this.pushRecord('clear', _data);
    // }

    // 执行策略
    // do() {
    //     const { data } = this;
    //     if (isBlankVar(data)) return;
    //     data.forEach((d, index) => {
    //         if (index === 0) {
    //             const price = d[this.priceKey];
    //             console.log(d[this.priceKey]);
    //             this.price = price;
    //             this.marketPrice = price;
    //             this.nowPrice = price;
    //             this.amount = count(this.invote / this.price, 4);
    //         }
    //         this.checkTrade(d);
    //     });
    //     this.clearance(data[data.length - 1]);
    //     this.inTotal();
    // }
}

const csv = require('csvtojson');
const path = require('path');
const { isEmpty } = require('lodash');

function run(code) {
    csv()
    .fromFile(path.join(__dirname, `../data/${code}.csv`))
    .then((json) => {
        // console.log(json);
        const aa = new TradingModel(json, {
            props: {
                price: 'DWJZ',
                time: 'FSRQ',
            },
            startInvote: 10000,
            constantInvote: 10000,
            targetIncome: 0.05,
            targetDeficit: -0.01,
            fundCode: code,
            fund: '2',
        });
        // aa.do();
        console.table(aa.records);
        // console.table(aa.total);
    })
}
run(110011);
// run('000478');