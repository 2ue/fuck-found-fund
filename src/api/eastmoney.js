/**
 * 基于https://fundmobapi.eastmoney.com的接口
 */

import axios from '../utils/axios';
import { fundCodes } from '../data/fund';
import { re } from 'mathjs';

function https(config) {
    return axios({
        ...config,
        baseURL: 'https://fundmobapi.eastmoney.com/'
    }).then(res => {
        const { data, status } = res;
        if (status === 200) return data;
    });
}

/**
 * 获取基金历史净值
 * @param {String|Number} code 基金代码
 * 
 * @returns FCODE 基金代码
 * @returns SHORTNAME 基金名称
 * @returns PDATE 最新确认净值日期
 * @returns NAV 最新确认净值
 * @returns NAVCHGRT 最新确认净值涨跌比率
 * @returns GSZ 实时估算净值
 * @returns GSZZL 实时估算净值涨跌比率
 * @returns GZTIME 时间估算时间
 */
export function getFund(code) {
    return https({
        url: '/FundMNewApi/FundMNNBasicInformation',
        params: {
            version: '6.2',
            plat: 'Android',
            appType: 'ttjj',
            FCODE: code,
            onFundCache: 3,
            keeeeeyparam: 'FCODE',
            deviceid: '656c09923c567b89bb44801020bc59ab%7C%7Ciemi_tluafed_me',
            igggggnoreburst: true,
            product: 'EFund',
            MobileKey: '656c09923c567b89bb44801020bc59ab%7C%7Ciemi_tluafed_me'
        }
    })
}

/**
 * 批量获取基金实时数据
 * @param {Array} codes 基金代码
 * 
 * @returns FCODE 基金代码
 * @returns SHORTNAME 基金名称
 * @returns PDATE 最新确认净值日期
 * @returns NAV 最新确认净值
 * @returns NAVCHGRT 最新确认净值涨跌比率
 * @returns GSZ 实时估算净值
 * @returns GSZZL 实时估算净值涨跌比率
 * @returns GZTIME 时间估算时间
 */
export function getFundList(codes) {
    return https({
        url: '/FundMNewApi/FundMNFInfo',
        params: {
            pageIndex: 1,
            pageSize: 999,
            appType: 'ttyy',
            product: 'EFund',
            plat: 'Android',
            deviceid: '9e16077fca2fcr78ep0ltn98',
            Version: 1,
            Fcodes: codes || fundCodes.join(',')
        }
    })
}

export function getFunHistoryPrice() {
    return https({
        url: 'http://api.fund.eastmoney.com/f10/lsjz',
        params: {
            callback: 'jQuery183007463799119798509_1609123464486',
            fundCode: '002190',
            pageIndex: 3,
            pageSize: 20,
            startDate: '',
            endDate: '',
            _: 1609123716901
        }
    })
}

getFunHistoryPrice().then(res => {
    console.log(res);
})