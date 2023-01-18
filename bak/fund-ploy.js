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
 * 
 */

/**
 * 本策略核心思想:
 * 1.不止损
 * 2.恒定定持仓金额
 * 
 * TODO & 优化:
 * 1.考虑净值折算
 * 2.考虑手续费：频次以及不超过七天
 * 3.动态止盈
 * 4.初始投入本金，可用本金，持续收入
 * 5.盈利循环使用
 * 6.计算真实投入本金
 * 7.买入的算法可以不恒定金额？
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
        this.price = options.price || 1;
        // 持仓单价，随着每次买卖，单价会进行变换
        this.nowPrice = this.price;
        // 初始份额
        this.amount = count(this.invote / this.price, 4);
        // 持仓份额
        this.nowAmount = this.amount;

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
        const { price } = item;
        const rate = count(price / this.nowPrice - 1, 4);
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

        return {
            price,
            rate,
            changeMoney,
            changeAmout,
            income: changeMoney,
            changeInvote: changeMoney,
            nowInvote: count(this.nowInvote - changeMoney)
        };
    }
    // 更新数据
    updateData(data) {
        const {
            price,
            changeAmout,
            changeInvote
        } = data;
        this.inInvote = count(this.inInvote - changeInvote);
        this.nowAmount = count(this.nowAmount - changeAmout, 4);
        this.nowPrice = price;
    }

    // 记录操作
    pushRecord(type, result) {
        const {
            rate,
            changeMoney,
            changeAmout,
            income
        } = result;
        this.record.push({
            操作类型: opEnums[type],
            // 初始本金: this.invote,
            持仓金额: count(this.nowAmount * this.nowPrice),
            在投本金: this.inInvote,
            // 初始单价: this.price,
            现价: this.nowPrice,
            // 初始份额: this.amount,
            持仓份额: this.nowAmount,
            变动金额: -changeMoney,
            变动份额: -changeAmout,
            收益: income,
            收益率: `${count(rate * 100)}%`,
        })
    }

    inTotal() {
        const totalIncome = this.record.reduce((t, n = {}) => {
            return count(t + n['收益']);
        }, 0);
        this.total = {
            初始投入: this.invote,
            总投入: this.totalInvote,
            总盈利: totalIncome,
        }
    }

    // 卖出
    sell(data) {
        this.updateData(data, this.dealType);
        this.pushRecord('autoSell', data);
    }

    // 买入
    buy(data) {
        this.updateData(data);
        this.totalInvote = count(this.totalInvote - data.changeMoney);
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
        data.forEach(d => {
            this.checkTrade(d);
        });
        this.clearance(data[data.length - 1]);
        this.inTotal();
    }
}
// 震荡上行
const ddd = [
    {price: 1.05},
    {price: 1.1},
    {price: 1.11},
    {price: 1.12},
    {price: 1.09},
    {price: 1.15},
    {price: 1.20},
    {price: 1.22},
    {price: 1.24},
    {price: 1.21},
    {price: 1.18},
    {price: 1.14},
    {price: 1.15},
    {price: 1.04},
    {price: 1.04},
    {price: 1.09},
    {price: 1.12},
    {price: 1.18},
    {price: 1.22},
    {price: 1.25},
    {price: 1.30},
    {price: 1.33},
    {price: 1.30},
    {price: 1.34},
    {price: 1.35},
    {price: 1.36},
    {price: 1.40},
    {price: 1.45},
    {price: 1.49},
    {price: 1.54},
    {price: 1.49},
    {price: 1.44},
    {price: 1.45},
    {price: 1.42},
    {price: 1.41},
    {price: 1.39},
    {price: 1.35},
    {price: 1.32},
    {price: 1.33},
    {price: 1.29},
    {price: 1.25},
    {price: 1.22},
    {price: 1.28},
    {price: 1.32},
    {price: 1.33},
    {price: 1.39},
    {price: 1.41},
    {price: 1.48},
    {price: 1.52},
    {price: 1.56},
    {price: 1.55},
    {price: 1.59},
    {price: 1.62},
    {price: 1.66},
    {price: 1.67},
    {price: 1.62},
    {price: 1.59},
    {price: 1.55},
    {price: 1.52},
    {price: 1.49},
    {price: 1.51},
    {price: 1.55},
    {price: 1.58},
    {price: 1.62},
    {price: 1.67},
    {price: 1.69},
    {price: 1.71},
    {price: 1.73},
    {price: 1.78},
    {price: 1.81},
    {price: 1.83},
    {price: 1.90},
    {price: 1.94},
    {price: 1.99},
    {price: 1.95},
    {price: 1.97},
    {price: 1.93},
    {price: 1.91},
    {price: 1.89},
    {price: 1.88},
    {price: 1.85},
    {price: 1.81},
    {price: 1.83},
    {price: 1.86},
    {price: 1.92},
    {price: 1.96},
    {price: 1.99},
    {price: 2.01},
    {price: 2.05},
    {price: 2.07},
    {price: 2.09},
    {price: 2.12},
    {price: 2.15},
    {price: 2.18},
    {price: 2.23},
    {price: 2.24},
    {price: 2.27},
    {price: 2.29},
    {price: 2.31},
    {price: 2.39},
    {price: 2.45},
    {price: 2.50},
    {price: 2.56},
]

const mm = new TradingModel({}, ddd);

mm.do();

console.table(mm.record);
console.table(mm.total);