import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import * as mathjs from 'mathjs';
import { getFundList } from '../../api/eastmoney';
import { fundInvote } from '../../data/fund';

import FundList from './list';

// 开市时间
const openMarketTime = `${dayjs().format('YYYY-MM-DD')} 9:00:01`;
// 收市时间
const closeMarketTime = `${dayjs().format('YYYY-MM-DD')} 15:00:01`;
// 轮询时间(s)
const pollingTime = 5;

class funDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshTime: '',
            funListData: []
        };
    }

    /**
     * 
     */
    async getFundListData() {
        const refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // 是否开市
        const isCloseMarket = dayjs(refreshTime).isAfter(closeMarketTime) || dayjs(openMarketTime).isAfter(refreshTime);
        
        // 不在开市时间不刷新
        if (this.timer && isCloseMarket) {
            this.clearTimer();
            return;
        }

        const fundListData = await getFundList();
        const {
            list,
            ZRQRZSY,
            JRQRZSY,
            JRGSZSY,
            CCZSY
        } = this.dealData(fundListData.Datas, refreshTime);

        this.setState({
            refreshTime,
            fundData: {
                ZRQRZSY,
                JRQRZSY,
                JRGSZSY,
                CCZSY
            },
            funListData: _.orderBy(list || [], d => (Number(d.GSZZL) + 100000), 'desc')
        });
        this.setTimer();
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
    dealData(funds = [], refreshTime) {
        const obj = {
            ZRQRZSY: 0,
            JRQRZSY: 0,
            JRGSZSY: 0,
            CCZSY: 0,
        }
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
            // 是否持仓
            let isHave = false;

            if (currentInvote) {
                const { FCCFE, FCCCB } = currentInvote;
                const { NAV, NAVCHGRT, GSZ, GSZZL, PDATE } = fund;
                
                isHave = true;
                // 说明今天的净值已经更新
                if (refreshTime.indexOf(PDATE) === 0 && Number(NAVCHGRT) && Number(NAV)) {
                    JRQRSY = mathjs.round(NAVCHGRT * NAV * FCCFE / 100, 2);
                } else {
                    ZRQRZSY = mathjs.round(NAVCHGRT * NAV * FCCFE / 100, 2);
                }
                JRGSSY = mathjs.round(GSZ * GSZZL * FCCFE / 100, 2);
                CCSY = mathjs.round(GSZ * FCCFE - FCCCB, 2);
                obj.ZRQRZSY += Number(ZRQRZSY);
                obj.JRQRZSY += Number(JRQRSY);
                obj.JRGSZSY += Number(JRGSSY);
                obj.CCZSY += Number(CCSY);
            }

            return {
                ...fund,
                JRGSSY,
                JRQRSY,
                CCSY,
                isHave
            };
        });
        obj.ZRQRZSY = mathjs.round(obj.ZRQRZSY, 2);
        obj.JRQRZSY = mathjs.round(obj.JRQRZSY, 2);
        obj.JRGSZSY = mathjs.round(obj.JRGSZSY, 2);
        obj.CCZSY = mathjs.round(obj.CCZSY, 2);
        return obj;
    }

    // 定时请求
    setTimer() {
        this.timer = setTimeout(() => {
            this.getFundListData();
        }, pollingTime * 1000);
    }

    // 清除定时器
    clearTimer() {
        this.timer && clearInterval(this.timer);
    }

    // 重置定时器：一般用于手动刷新场景
    resetTimer() {
        this.clearTimer();
        this.setTimer();
    }

    componentDidMount() {
        this.getFundListData();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        const {
            funListData = [],
            fundData = {},
            refreshTime,
        } = this.state;
        return <div>
            <p className="update-time">更新时间：{refreshTime}</p>
            <p>持仓收益: {fundData.CCZSY}</p>
            <p>昨日确认总收益：{fundData.ZRQRZSY}</p>
            <p>今日确认总收益：{fundData.JRQRZSY}</p>
            <p>今日预估总收益：{fundData.JRGSZSY}</p>
            <FundList funds={funListData}></FundList>
        </div>;
    }
}


export default funDataComponent;