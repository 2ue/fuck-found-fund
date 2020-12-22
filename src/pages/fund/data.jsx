import React from 'react';
import FundUtils from '../../utils/fetchFundData';
import FundList from './list';
import _ from 'lodash';
import dayjs from 'dayjs';
import config from '../../utils/config';
import * as mathjs from 'mathjs';

// 开市时间
const openMarketTime = `${dayjs().format('YYYY-MM-DD')} 9:00:01`;
// 收市时间
const closeMarketTime = `${dayjs().format('YYYY-MM-DD')} 15:00:01`;

class funDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshTime: '',
            funListData: []
        };
    }

    async getFundListData() {
        const fundListData = await this.utils.getFundListData();
        const refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const {
            data,
            JZQRZSY,
            JZGSZSY,
            QRZSY
        } = this.dealData(fundListData.Datas, refreshTime);

        this.setState({
            refreshTime,
            fundData: {
                JZQRZSY,
                JZGSZSY,
                QRZSY
            },
            funListData: _.orderBy(data || [], 'GSZZL', 'desc')
        });
    }

    dealData(funds = [], refreshTime) {
        const { fundInvote } = config;
        const obj = {
            JZQRZSY: 0,
            JZGSZSY: 0,
            QRZSY: 0,
        }
        obj.data = funds.map(fund => {
            const currentInvote = fundInvote[fund.FCODE];
            // 估算实时预估收益
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
                obj.QRZSY += Number(CCSY);
            }

            return {
                ...fund,
                JZGSSY,
                JZQRSY,
                CCSY,
                isHave
            }
        });
        obj.JZQRZSY = mathjs.round(obj.JZQRZSY, 2);
        obj.JZGSZSY = mathjs.round(obj.JZGSZSY, 2);
        obj.QRZSY = mathjs.round(obj.QRZSY, 2);
        return obj;
    }

    setTimer() {
        this.getFundListData();

        // 不在开市时间不刷新
        const { refreshTime } = this.state;
        const isCloseMarket = dayjs(closeMarketTime).isAfter(refreshTime) || dayjs(refreshTime).isAfter(openMarketTime);
        if (isCloseMarket) return;
        this.timer = setInterval(() => {
            this.getFundListData();
        }, 5000);
    }

    clearTimer() {
        this.timer && clearInterval(this.timer);
    }

    autoRefresh() {
        this.clearTimer();
        this.setTimer();
    }

    componentDidMount() {
        this.utils = new FundUtils();
        this.setTimer();
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
            <p>持仓收益: {fundData.QRZSY}</p>
            <p>今日确认总收益：{fundData.JZQRZSY}</p>
            <p>今日预估总收益：{fundData.JZGSZSY}</p>
            <FundList funds={funListData}></FundList>
        </div>;
    }
}


export default funDataComponent;