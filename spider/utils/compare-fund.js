/**
 * 对比基金数据排名
 * 如对比20210506与20210427的数据
 */

const importCwd = require('import-cwd');
const path = require('path');
const writeFile = require('../fs/write-file');
// const { fundCodes } = require('../../src/data/fund');

const DIR = path.join(process.cwd(), 'src/data/quantify');

// module.exports = function(nxt, pre) {
//     const preData = importCwd(path.join(DIR, '202156.json'));
//     const nextData = importCwd(path.join(DIR, '20210427.json'));
//     console.log('preData==>', preData);
// }

// pre nxt
const preData = importCwd(path.join(DIR, '2021420.json'));
const nxtData = importCwd(path.join(DIR, '202156.json'));

// len
const preData10 = preData.splice(1, 10);
const nxtData10 = nxtData.splice(1, 10);

const keepFundList = [];

const lostFundList = [];

const newFundList = [];

nxtData10.forEach(fund => {
    const preFund = preData10.find(d => d.code === fund.code);
    // console.log('preFund==>', preFund);
    if (preFund) {
        keepFundList.push({
            ...fund,
            preSortNum: preFund.sortNum,
        });
    } else {
        newFundList.push(fund);
    }
});

preData10.forEach(fund => {
    const nxtFund = nxtData10.some(d => d.code === fund.code);
    if (!nxtFund) {
        lostFundList.push(fund);
    }
});

// console.log('keepFundList==>', keepFundList);
// console.log('lostFundList==>', lostFundList);
// console.log('newFundList==>', newFundList);

const header = nxtData.splice(0, 1)[0];
const keys = Object.keys(header);

const data = {
    keys,
    headers: Object.keys(header).map(key => {
        return { key, name: header[key] };
    }),
    recentFundList: nxtData,
    recent10FundList: nxtData10,
    keepFundList,
    lostFundList,
    newFundList
}
console.log('compare-fund 开始创建');
writeFile(JSON.stringify(data, null, '\t'), 'compare.json');