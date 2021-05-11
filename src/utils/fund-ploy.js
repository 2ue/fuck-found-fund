/**
 * 定投策略
 * 1.确认投入本金
 * 2.确认计划投入周期：整体时间，间隔时间，每次投入份额
 * 
 * 本金恒定策略：
 * 1.设定恒定本金金额
 * 2.设置卖出收益率和最小时间间隔
 * 3.设置买入亏损率和最小时间问题
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
// 目标亏损率和最小时间，用于买入保持本金恒定
const targetDeficit = -0.1;
const deficitMinTime = 15;

const opEnums = {
    sell: '卖出(手动)',
    buy: '买入(手动)',
    autoSell: '卖出(自动)',
    autoBuy: '买入(自动)',
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
    constructor(options = {}, data = []) {
        this.priceKey = options.priceKey || 'price';
        this.timeKey = options.timeKey || 'time';
        // 数据
        this.data = data;
        // 初始本金
        this.invote = options.invote || constantInvote;
        // 持仓金额
        this.nowInvote = this.invote;
        // 持仓本金：随着盈利止盈，投入本金越来越少
        this.inInvote = this.invote;
        // 总共投入本金：随着不断买入，投入本金越来越多
        this.totalInvote = this.invote;
        // 初始单价
        this.price = 0;
        // 市场现价
        this.marketPrice = 0;
        // 持仓单价，随着每次买卖，单价会进行变换
        this.nowPrice = 0;
        // 初始份额
        this.amount = 0;
        // 持仓份额
        this.nowAmount = this.amount;

        // 累计收益
        this.totalIncome = 0;

        this.fundCode = options.fundCode;
        // 恒定本金
        this.constantInvote = options.constantInvote || constantInvote;
        // 目标收益和亏损率: 暂未考虑时间
        this.targetIncome = options.targetIncome || targetIncome;
        this.targetDeficit = options.targetDeficit || targetDeficit;

        // 记录变化过程
        this.record = [];
        this.total = {};

        // 处理方式
        this.dealType = {
            // 以金额为标准
            type: 'money',
            standard: this.constantInvote
        }
    }

    /**
     * 1.计算数据
     * 传入的数据应该是有单价
     * @param {}} item 
     */
    checkTrade(item) {
        const data = this.countData(item);
        const { rate } = data;
        if (rate >= this.targetIncome) {
            this.sell(data);
        }
        if (rate <= this.targetDeficit) {
            this.buy(data);
        }
    }
 
    // 计算当前单价的数据变动点
    countData(item, dealType = this.dealType) {
        const { standard, type } = dealType;
        const price = item[this.priceKey];
        const time = item[this.timeKey];
        const rate = count(price / this.marketPrice - 1, 4);
        let changeMoney = 0;
        let changeAmout = 0;

        const markValue = price * this.nowAmount;

        if (type === 'money') {
            changeMoney = count(markValue - standard);
            changeAmout = count(changeMoney / price, 4);
        } else {
            changeMoney = count(price * (this.nowAmount - standard));
            changeAmout = count(this.nowAmount - standard, 4);
        }
        // if (rate >= this.targetIncome || rate <= this.targetDeficit) {
        //     console.log(this.nowPrice * this.nowAmount, changeMoney);
        // }
        return {
            time,
            price,
            rate,
            preAmount: this.nowAmount,
            changeMoney,
            changeAmout,
            income: changeMoney,
            changeInvote: changeMoney,
            nowInvote: count(this.nowInvote - changeMoney),
            prePrice: this.nowPrice,
            // nowPrice: count((this.nowPrice * this.nowAmount - changeMoney) / (this.nowAmount - changeAmout), 4),
            nowPrice: count((standard - changeMoney) / (this.nowAmount - changeAmout), 4)
        };
    }
    // 更新数据
    updateData(data) {
        const {
            price,
            changeAmout,
            changeInvote,
            nowPrice
        } = data;
        // this.inInvote = count(this.inInvote - changeInvote);
        this.nowAmount = count(this.nowAmount - changeAmout, 4);
        this.marketPrice = price;
        this.nowPrice = nowPrice;
    }

    updatetotalInvote(type, data) {
        const {
            income,
            changeInvote
        } = data;
        console.log(this.totalIncome, changeInvote);
        if (type === 'autoSell') {
            this.totalIncome = count(this.totalIncome + income);
        } else {
            const tempIncome = count(this.totalIncome + changeInvote);
            // 过往盈利，能够支撑再投资
            if (tempIncome >= 0) {
                this.totalIncome = count(tempIncome);
            } else {
                this.totalInvote = count(this.totalInvote - tempIncome);
                // console.log(this.totalIncome, changeInvote, tempIncome);
                this.totalIncome = 0;
            }
        }
    }

    // 记录操作
    pushRecord(type, result) {
        const {
            time,
            rate,
            preAmount,
            changeMoney,
            changeAmout,
            prePrice,
            income
        } = result;
        this.record.push({
            操作类型: opEnums[type],
            时间: time,
            // 初始本金: this.invote,
            持仓金额: count(this.nowAmount * this.marketPrice),
            在投本金: this.inInvote,
            // 初始单价: this.price,
            上期单价: prePrice,
            市场单价: this.marketPrice,
            持仓单价: this.nowPrice,
            // 初始份额: this.amount,
            // 操作前持仓份额
            上期持仓份额: preAmount,
            最新持仓份额: this.nowAmount,
            变动金额: -changeMoney,
            变动份额: -changeAmout,
            收益: income,
            收益率: `${count(rate * 100)}%`,
            累计收益: this.totalIncome,
            累计收益率: `${count(this.totalIncome / this.totalInvote * 100)}%`,
        })
    }
 
    inTotal() {
        const totalIncome = this.record.reduce((t, n = {}) => {
            return count(t + n['收益']);
        }, 0);
        this.total = {
            基金: this.fundCode,
            恒定持仓金额: this.constantInvote,
            止盈点设置: this.targetIncome,
            买入点设置: this.targetDeficit,
            初始投入: this.invote,
            总投入: this.totalInvote,
            总盈利: totalIncome,
        }
    }

    // 卖出
    sell(data) {
        this.updateData(data, this.dealType);
        this.updatetotalInvote('autoSell', data);
        this.pushRecord('autoSell', data);
    }

    // 买入
    buy(data) {
        this.updateData(data);
        // this.totalInvote = count(this.totalInvote - data.changeMoney);
        this.updatetotalInvote('autoBuy', data);
        this.pushRecord('autoBuy', {
            ...data,
            income: 0,
            rate: 0
        });
    }

    // 清仓
    clearance(item) {
        if (this.nowAmount <= 0) return;
        const data = this.countData(item, {
            type: 'amout',
            standard: 0
        });

        const _data = {
            ...data,
            income: count(data.rate * data.price * this.nowAmount),
            changeInvote: this.inInvote
        };
        this.updateData(_data);
        this.pushRecord('clear', _data);
    }

    // 执行策略
    do() {
        const { data } = this;
        if (isBlankVar(data)) return;
        data.forEach((d, index) => {
            if (index === 0) {
                const price = d[this.priceKey];
                console.log(d[this.priceKey]);
                this.price = price;
                this.marketPrice = price;
                this.nowPrice = price;
                this.amount = count(this.invote / this.price, 4);
            }
            this.checkTrade(d);
        });
        this.clearance(data[data.length - 1]);
        this.inTotal();
    }
}

const csv = require('csvtojson');
const path = require('path');

function run(code) {
    csv()
    .fromFile(path.join(__dirname, `../data/grid/${code}.csv`))
    .then((json) => {
        // console.log(json);
        const aa = new TradingModel({
            priceKey: 'DWJZ',
            timeKey: 'FSRQ',
            invote: 10000,
            constantInvote: 10000,
            targetIncome: 0.05,
            targetDeficit: -0.01,
            fundCode: code
        }, json);
        aa.do();
        console.table(aa.record);
        console.table(aa.total);
    })
}
run(110011);
// run('000478');