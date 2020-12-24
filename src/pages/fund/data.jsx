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
        console.log('gettt')
        const refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // 不在开市时间不刷新
        const isCloseMarket = dayjs(closeMarketTime).isAfter(refreshTime) || dayjs(refreshTime).isAfter(openMarketTime);
        
        if (this.timer && isCloseMarket) {
            this.clearTimer();
            return;
        }

        const fundListData = await getFundList();
        const {
            list,
            JZQRZSY,
            JZGSZSY,
            CCZSY
        } = this.dealData(fundListData.Datas, refreshTime);

        this.setState({
            refreshTime,
            fundData: {
                JZQRZSY,
                JZGSZSY,
                CCZSY
            },
            funListData: _.orderBy(list || [], 'GSZZL', 'desc')
        });
        this.setTimer();
    }

    /**
     * 计算基金实时收益情况等
     * @param {Array} funds 基金实时信息
     * @param {Date|String} refreshTime 刷新基金的时间
     * 
     * @returns {Number} JZQRZSY 今日确认总收益
     * @returns {Number} JZGSZSY 今日估算总收益
     * @returns {Number} CCZSY 持仓收益
     * @returns {Array} list 基金数组
     */
    dealData(funds = [], refreshTime) {
        const obj = {
            JZQRZSY: 0,
            JZGSZSY: 0,
            CCZSY: 0,
        }
        obj.list = funds.map(fund => {
            const currentInvote = fundInvote[fund.FCODE];
            // 实时预估收益
            let JZGSSY = '';
            // 今日确认收益
            let JZQRSY = '';
            // 确认持仓收益
            let CCSY = '';
            // 是否持仓
            let isHave = false;

            if (currentInvote) {
                const { FCCFE, FCCCB } = currentInvote;
                const { NAV, NAVCHGRT, GSZ, GSZZL, PDATE } = fund;
                
                isHave = true;
                // 说明今天的净值已经更新
                if (refreshTime.indexOf(PDATE) === 0 && Number(NAVCHGRT) && Number(NAV)) {
                    JZQRSY = mathjs.round(NAVCHGRT * NAV * FCCFE / 100, 2);
                }
                JZGSSY = mathjs.round(GSZ * GSZZL * FCCFE / 100, 2);
                CCSY = mathjs.round(GSZ * FCCFE - FCCCB, 2);
                obj.JZQRZSY += Number(JZQRSY);
                obj.JZGSZSY += Number(JZGSSY);
                obj.CCZSY += Number(CCSY);
            }

            return {
                ...fund,
                JZGSSY,
                JZQRSY,
                CCSY,
                isHave
            };
        });
        obj.JZQRZSY = mathjs.round(obj.JZQRZSY, 2);
        obj.JZGSZSY = mathjs.round(obj.JZGSZSY, 2);
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
            <p className="update-time">时间：{refreshTime}</p>
            <p>持仓收益: {fundData.CCZSY}</p>
            <p>今日确认总收益：{fundData.JZQRZSY}</p>
            <p>今日预估总收益：{fundData.JZGSZSY}</p>
            <FundList funds={funListData}></FundList>
        </div>;
    }
}


export default funDataComponent;