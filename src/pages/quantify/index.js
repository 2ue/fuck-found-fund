import React from 'react';
import dayjs from 'dayjs';
import './index.css';
import { getFundList } from '../../api/eastmoney';
import { dealFundData, getIncome } from '../../utils';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { Toast } from 'antd-mobile';

function getCodes(data = {}) {
  const {
    keepFundList,
    lostFundList,
    newFundList
  } = data;
  
  return [
    ...keepFundList,
    ...lostFundList,
    ...newFundList,
  ].map(f => f.code).join(',');
}

const getFund = (fundList, code) => {
  return fundList.find(f => f.FCODE === code);
}

const getGSZZL = (fundList, code) => {
  const fund = getFund(fundList, code) || {};
  return <td  key={`GSZZL${code}`}>{ getIncome(fund.GSZZL, '%') }</td>
}

const renderTd = (keys, data, fundList) => {
  return keys.map(key => {
    if (key === 'code') return <td key={`${data[key]}${data.code}`}><a href={`http://fund.eastmoney.com/${data[key]}.html`} target="_blank" rel="noopener noreferrer">{data[key]}</a></td>;
    return <td key={`${data[key]}${data.code}`}>{data[key]}</td>;
  }).concat([getGSZZL(fundList, data.code)]);
};

const refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

export default class Quantify extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fundVsData: {},
      fundList: [],
      historyData: [],
    };
  }

  async getFundListData(vsData) {
    const codes = getCodes(vsData);
    const fundData = await getFundList(codes);
    const data = dealFundData(fundData.Datas, refreshTime);
    this.setState({
      fundList: data.list
    });
  }

  async getHistoryData() {
    axios({
      url: `/data/quantify/compare/history.json`,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          historyData: res.data.historyData,
        });
      } else {
        Toast.fail('获取数据错误1');
      }
    }).catch(er => {
      Toast.fail('获取数据错误1');
    })
  }

  async getCurrentData() {
    const { date = 'index' } = this.props.match.params;
    axios({
      url: `/data/quantify/compare/${date}.json`,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          fundVsData: res.data,
        });
        this.getFundListData(res.data);
      } else {
        Toast.fail('获取数据错误2');
      }
    }).catch(er => {
      console.log(er);
      Toast.fail('获取数据错误3');
    });
  }

  componentDidMount() {
    this.getCurrentData();
    this.getHistoryData();
  }

  render() {
    const { fundList, fundVsData, historyData } = this.state;
    const { date, preDate, keys, headers, keepFundList, lostFundList, newFundList } = fundVsData;
    console.log('hh==>', fundVsData, historyData);
    if (isEmpty(fundVsData)) return <div>loading...</div>;
    return (
      <div className="quantify-container">
        <p>本期榜单更新({date}与{preDate})：</p>
        <br></br>
        <table>
          <thead>
            <tr>
              { headers.map(h => <td key={h.key}>{ h.name }</td>) }
              <td key="GSSL">今日预估收益率</td>
            </tr>
          </thead>
          <tbody>
            <tr className="fund-list-title"><td colSpan={keys.length}>本期在榜基金（{date}）</td></tr>
            {
              keepFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>本期落榜基金（{preDate}）</td></tr>
            {
              lostFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>本期上榜基金（{date}）</td></tr>
            {
              newFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
          </tbody>
        </table>
        <div className="vs-history">
          <p>往期回顾：</p>
          <div>
            {
              historyData.map(d => <p key={d}><Link to={`/quantify/rank/${d}`}>{d}</Link></p>)
            }
          </div>
        </div>
      </div>
    )
  }
};
