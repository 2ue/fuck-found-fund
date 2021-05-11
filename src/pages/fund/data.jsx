import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import NProgress from 'nprogress';
import { getFundList } from '../../api/eastmoney';
import { fundInvote } from '../../data/fund/index';
import FundList from './list';
import { count, dealFundData } from '../../utils';

// 开市时间
const openMarketTime = `${dayjs().format('YYYY-MM-DD')} 9:00:01`;
// 收市时间
const closeMarketTime = `${dayjs().format('YYYY-MM-DD')} 15:00:01`;
// 轮询时间(s)
const pollingTime = 5;

const setInfo = (data) => {
    window.consoleInfo = () => {
        console.log('持仓总成本：', data.CCZCB);
        console.log('预估总市值：', data.YGZSZ);
    };
};

const getUpdateFlag = (value) => {
    const arr = ['更新中', '更新完成'];
    if (arr[value]) {
        return <span className="red">({arr[value]})</span>;
    } else {
        return '';
    }
}

function getNumber(value, type, data) {
    if (type) {
        const rate = count(value / data * 100);
        return `${rate}%`;
    }
    return value;
}

class funDataComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            onlyShowHave: true,
            // 0，更新中，1更新完成
            updateFlag: -1,
            refreshTime: '',
            fundData: [],
            funListData: [],
            showRate: true
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
        const data = dealFundData(fundListData.Datas, refreshTime, fundInvote);
        const {
            list,
            updateFlag,
            ...fundData
        } = data;
        setInfo(data);

        this.setState({
            updateFlag,
            refreshTime,
            fundData
        });
        this.sortList(list, 'GSZZL', this.state.GSZZL || 'desc');
        this.setTimer();
    }
    sortList(list, key, order) {
        const _order = this.state[key];
        const o =  order || (_order === 'desc' ? 'asc' : 'desc');
        let l = list;
        if (_.isEmpty(l)) {
            l = this.state.funListData;
        }
        this.setState({
            [key]: o,
            funListData: _.orderBy(l || [], d => (Number(d[key]) + 100000), o)
        });
    }

    // 定时请求
    setTimer() {
        this.timer = setTimeout(() => {
            NProgress.start();
            this.getFundListData();
            NProgress.done();
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

    changeShowHave() {
        this.setState({
            onlyShowHave: !this.state.onlyShowHave
        });
    }

    changeShowDetail() {
        this.setState({
            showDetail: !this.state.showDetail
        });
    }
    printAll() {
        const {
            CCZCB,
            YGZSZ
        } = this.state.fundData;
        window.consoleInfo();
        window.alert(`持仓总成本：${CCZCB}<br/>预估总市值：${YGZSZ}`);
    }
    
    swtichNumber() {
        this.setState({
            showRate: !this.state.showRate
        });
    }

    render() {
        const {
            funListData = [],
            fundData = {},
            refreshTime,
            onlyShowHave,
            updateFlag,
            showDetail,
            showRate
        } = this.state;
        const {
            CCZCB,
            CCZSY,
            YGZSZ,
            ZRQRZSY,
            JRQRZSY,
            JRGSZSY
        } = fundData;
        const fundLen = Object.keys(fundInvote).length;

        const ZSYL = count(CCZSY / CCZCB * 100, 2);

        return <div className="fund-container">
            <button className="total-all" onClick={this.printAll.bind(this)}>总计</button>
            <button className="total-all swtich-number" onClick={this.swtichNumber.bind(this)}>总计</button>
            <p className="update-time">更新时间：{refreshTime}</p>
            <p>持仓数量：{fundLen}</p>
            <p>持仓收益：{showRate ? `${ZSYL}%` : CCZSY}</p>
            <p>昨日确认总收益：{getNumber(ZRQRZSY, showRate, YGZSZ)}</p>
            <p>今日确认总收益：{getNumber(JRQRZSY, showRate, YGZSZ)}{getUpdateFlag(updateFlag)}</p>
            <p>今日预估总收益：{getNumber(JRGSZSY, showRate, YGZSZ)}</p>
            <div className="operation-container">
                <button onClick={this.changeShowDetail.bind(this)}>{showDetail ? '隐藏' : '显示'}详情</button>
                <button onClick={this.changeShowHave.bind(this)}>{!onlyShowHave ? '隐藏' : '显示'}未持有</button>
            </div>
            {showDetail && <FundList funds={funListData} onlyShowHave={onlyShowHave} showRate={showRate} updateFlag={updateFlag} sortList={this.sortList.bind(this)}></FundList>}
        </div>;
    }
}


export default funDataComponent;