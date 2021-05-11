const _ = require('lodash');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const writeFile = require('./fs/write-file');
const utils = require('./utils');
const config = require('./config');

function getTargetOption(options, index = 0) {
    console.log(options[index]);
    return options[index];
}

const option = getTargetOption(config);
fetch(option.url)
    .then(res => res.text())
    .then(body => {
        const $ = cheerio.load(body);
        const data = [];
        const title = $('#activity-name').text().replace(/[^\d]/ig, '');
        $('table tr').each((i, tr) => {
            const fund = {
                sortNum: i || '排名'
            };
            $(tr).find('span').each((j, span) => {
                const text = $(span).text();
                const key = option.headermap[j];
                if (key === 'code' && /^[\d]+$/.test(text)) {
                    fund[key] = utils.completionZero(text);
                } else {
                    fund[key] = text;
                }
                if (j === option.headermap.length - 1) {
                    data.push(fund);
                }
            });
        });
        writeFile(JSON.stringify(data, null, '\t'), `${title}.json`);
    });

    console.log('end');