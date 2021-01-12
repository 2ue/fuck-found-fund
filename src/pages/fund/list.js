import React from 'react';

function getIncome(income, unit) {
    if (income > 0) {
        return <span className="income-rate positive-income">+{income}{unit}</span>;
    } else if (income < 0) {
        return <span className="income-rate negative-income">{income}{unit}</span>;
    } else {
        return <span className="income-rate">0.00</span>;
    }
}

function FundList(props) {
    const { funds, onlyShowHave } = props;
    return (
        <div>
            <div className="list-header">
                <p>
                <span className="income-rate">收益率</span> | 
                <span className="income-rate">今日预估收益</span> | 
                <span className="income-rate">今日确认收益</span> | 
                <span className="income-rate">持仓收益</span> | 
                </p>
            </div>
            {funds.filter(fund => !onlyShowHave || fund.isHave).map(fund => {
                return <div className="" key={fund.FCODE}>
                    <p>
                        {getIncome(fund.GSZZL, '%')} | 
                        {getIncome(fund.JRGSSY)} |
                        {getIncome(fund.JRQRSY)} |
                        {getIncome(fund.CCSY)} |
                        <span className="fund-name">
                            <label className="have-tag">{fund.isHave ? '持有' : ''}</label>
                            {fund.SHORTNAME}({fund.FCODE})
                        </span>
                    </p>
                </div>;
            })}
        </div>
    );
}

export default FundList;