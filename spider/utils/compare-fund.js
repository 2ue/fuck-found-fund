/**
 * 对比基金数据排名
 * 如对比20210506与20210427的数据
 */

const importCwd = require('import-cwd');
const path = require('path');
const fs = require('fs');
const writeFile = require('../fs/write-file');
const utils = require('../utils');
const config = require('../config');

const DIR = path.join(process.cwd(), 'public/data/quantify');

const { pre = config[0].date, nxt = config[1].date, filename } = utils.getParamsToObj();

// pre nxt
const preData = importCwd(path.join(DIR, `${pre}.json`));
const nxtData = importCwd(path.join(DIR, `${nxt}.json`));
// console.log('preData==>', nxt, nxtData);

// len
const preData10 = [...preData].splice(1, 10);
const nxtData10 = [...nxtData].splice(1, 10);

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

const header = [...nxtData].splice(0, 1)[0];
const keys = Object.keys(header);

const data = {
    date: nxt,
    preDate: pre,
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
const name = filename ? `/compare/${filename}.json` : '/compare/index.json';
writeFile(JSON.stringify(data, null, '\t'), name);

const readDir = fs.readdirSync(path.join(DIR, 'compare'));
console.log(readDir);
const historyData = [];
readDir.forEach(d => {
    console.log('d==>', d, /^[\d]*vs[\d]*\.json$/.test(d));
    if (/^[\d]*vs[\d]*\.json$/.test(d)) {
        historyData.push(d.replace('.json', ''));
    }
});

writeFile(JSON.stringify({ historyData }, null, '\t'), '/compare/history.json');

