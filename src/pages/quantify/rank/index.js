import React from 'react';
import dayjs from 'dayjs';
import '../index.css';
import { getFundList } from '../../../api/eastmoney';
import { dealFundData, getIncome } from '../../../utils';
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
  return <td  key="GSSL">{ getIncome(fund.GSZZL, '%') }</td>
}

const renderTd = (keys, data, fundList) => {
  return keys.map(key => <td key={data[key]}>{data[key]}</td>).concat([getGSZZL(fundList, data.code)]);
};

const refreshTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

export default class QuantifyRank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fundVsData: {},
      fundList: []
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

  componentDidMount() {
    const { date = 'index' } = this.props.match.params;
    axios({
      url: `/data/quantify/compare/${date}.json`,
      responseType: 'json'
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          fundVsData: res.data
        });
        this.getFundListData(res.data);
      } else {
        Toast.fail('获取数据错误');
      }
    }).catch(er => {
      Toast.fail('获取数据错误');
    })
  }

  render() {
    const { fundList, fundVsData} = this.state;
    const { date, keys, headers, keepFundList, lostFundList, newFundList } = fundVsData;
    if (isEmpty(fundVsData)) return <div>loading...</div>;
    return (
      <div className="quantify-container">
        <p>本期榜单更新({date})：</p>
        <br></br>
        <table>
          <thead>
            <tr>
              { headers.map(h => <td key={h.key}>{ h.name }</td>) }
              <td key="GSSL">今日预估收益率</td>
            </tr>
          </thead>
          <tbody>
            <tr className="fund-list-title"><td colSpan={keys.length}>本期在榜基金</td></tr>
            {
              keepFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>落榜基金</td></tr>
            {
              lostFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>上榜基金</td></tr>
            {
              newFundList.map(f => <tr key={f.code}>{renderTd(keys, f, fundList)}</tr>)
            }
          </tbody>
        </table>
      </div>
    )
  }
};
