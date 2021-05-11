
import * as mathjs from 'mathjs';

export function  count(number, dec = 2) {
    return mathjs.round(number, dec);
}

/**
     * 计算基金实时收益情况等
     * @param {Array} funds 基金实时信息
     * @param {Date|String} refreshTime 刷新基金的时间
     * 
     * @returns {Number} ZRQRZSY 昨日确认总收益
     * @returns {Number} JRQRZSY 今日确认总收益
     * @returns {Number} JRGSZSY 今日估算总收益
     * @returns {Number} CCZSY 持仓收益
     * @returns {Array} list 基金数组
     */
 export function dealFundData(funds = [], refreshTime, fundInvote) {
    const obj = {
        ZRQRZSY: 0,
        JRQRZSY: 0,
        JRGSZSY: 0,
        CCZSY: 0,
        // 预估总市值
        YGZSZ: 0,
        // 持仓总成本
        CCZCB: 0,
        updateFlag: -1
    };

    let updateLen = 0;
    let needUpdate = 0;

    obj.list = funds.map(fund => {
        const currentInvote = fundInvote[fund.FCODE];
        // 昨日确认总收益
        let ZRQRZSY = 0;
        // 实时预估收益
        let JRGSSY = 0;
        // 今日确认收益
        let JRQRSY = 0;
        // 确认持仓收益
        let CCSY = 0;
        // 持仓总成本: 投入的本金
        let CCZCB = 0;
        // 持仓总市值： CCSY+CCZCB
        let CCZSZ = 0;
        // 是否持仓
        let isHave = false;

        if (currentInvote) {
            needUpdate += 1;
            const { FCCFE, FCCCBDJ } = currentInvote;
            const { NAV, NAVCHGRT, GSZ, GSZZL, PDATE } = fund;
            
            isHave = true;
            CCZCB = count(FCCCBDJ * FCCFE);
            CCZSZ = count(NAV * FCCFE);
            // 说明今天的净值已经更新
            if (refreshTime.indexOf(PDATE) === 0 && Number(NAVCHGRT) && Number(NAV)) {
                updateLen += 1;
                JRQRSY = count(NAVCHGRT * CCZSZ / 100);
            } else {
                ZRQRZSY = count(NAVCHGRT * CCZSZ / 100);
            }
            JRGSSY = count(GSZ * GSZZL * FCCFE / 100);
            CCSY = count(CCZSZ - CCZCB) || 0;
            obj.ZRQRZSY += Number(ZRQRZSY);
            obj.JRQRZSY += Number(JRQRSY);
            obj.JRGSZSY += Number(JRGSSY);
            obj.CCZSY += Number(CCSY);
            obj.YGZSZ = count(obj.YGZSZ + CCZSZ);
            obj.CCZCB = count(obj.CCZCB + CCZCB);
        }
        return {
            ...fund,
            JRGSSY,
            JRQRSY,
            JRQRSYL: count(JRQRSY / CCZSZ * 100),
            CCSY,
            CCSYL: count(CCSY / CCZCB * 100),
            CCZCB,
            CCZSZ,
            isHave
        };
    });
    if (updateLen === 0) {
        obj.updateFlag = -1;
    } else if (updateLen === needUpdate) {
        obj.updateFlag = 1;
    } else {
        obj.updateFlag = 0;
    }
    obj.ZRQRZSY = count(obj.ZRQRZSY);
    obj.JRQRZSY = count(obj.JRQRZSY);
    obj.JRGSZSY = count(obj.JRGSZSY);
    obj.CCZSY = count(obj.CCZSY);
    return obj;
}