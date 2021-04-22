const fetch = require('node-fetch');
const cheerio = require('cheerio');
const writeFile = require('./fs/write-file');
const utils = require('./utils');

fetch('https://mp.weixin.qq.com/s/ILRxk8wcfyrsAdyfxbXmPA')
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        const data = [];
        const title = $('#activity-name').text().replace(/[^\d]/ig, '');
        $('table tr').each((i, tr) => {
            const fund = {};
            $(tr).find('span').each((j, span) => {
                const text = $(span).text();
                if (j === 0) {
                    fund.code = /^[\d]+$/.test(text) ? utils.completionZero(text) : text;
                    fund.originalCode = text;
                } else if (j === 1) {
                    fund.name = text;
                } else if (j === 2) {
                    fund.income = text;
                } else if (j === 3) {
                    fund.retracement = text;
                } else if (j === 4) {
                    fund.sharpe = text;
                    data.push(fund);
                }
            });
        });
        writeFile(JSON.stringify(data, null, '\t'), `${title}.json`);
    });
