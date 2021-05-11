import React from 'react';
import './index.css';
import data from '../../data/quantify/compare.json';

console.log(data);
const {
  keys,
  headers,
  // recentFundList,
  // recent10FundList,
  keepFundList,
  lostFundList,
  newFundList
} = data;

const renderTd = (data) => {
  return keys.map(key => <td key={data[key]}>{data[key]}</td>);
}

export default class Quantify extends React.Component {
  render() {
    return (
      <div className="quantify-container">
        <p>本期榜单更新：</p>
        <br></br>
        <table>
          <thead>
            <tr>
              { headers.map(h => <td key={h.key}>{ h.name }</td>) }
            </tr>
          </thead>
          <tbody>
            <tr className="fund-list-title"><td colSpan={keys.length}>本期在榜基金</td></tr>
            {
              keepFundList.map(f => <tr key={f.code}>{renderTd(f)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>落榜基金</td></tr>
            {
              lostFundList.map(f => <tr key={f.code}>{renderTd(f)}</tr>)
            }
            <tr className="fund-list-title"><td colSpan={keys.length}>上榜基金</td></tr>
            {
              newFundList.map(f => <tr key={f.code}>{renderTd(f)}</tr>)
            }
          </tbody>
        </table>
      </div>
    )
  }
};
