/**
 * 
 * 接口文档：https://www.doctorxiong.club/api/#api-Fund-fund
 * 天天基金：http://fundgz.1234567.com.cn/
 * 对基金数据再次封装
 * 1.对天天基金数据的jsonp格式进行处理
 * 2.对某些数据进行缓存：如资金交易记录等
 * 
 */

import axios from './axios';
import FundConfig from './config';

export default class FundUtils {
    constructor(config) {
        this.config = config;
    }

    dealJsonp({ data } = {}) {
        if (typeof data === 'object') return data;
        try {
            return JSON.parse(data.match(/^jsonpgz\((.*)\)/, '')[1]);
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    axios(config) {
        const _config = {
            ...config,
            baseURL: FundConfig.baseURL
        };
        return axios(_config).then((res) => {
            return this.dealJsonp.call(this, res);
        });
    }

    /**
     * 
     * 获取基金实时数据
     * @returns funcode 基金代码
     * @returns name 基金名称
     * @returns jzrq 净值日期
     * @returns dwjz 当日净值
     * @returns gsz 估算(净)值
     * @returns gszzl 估算(净)值涨幅百分比
     * @returns gztime 估值时间
     */
    getFundCurrentData(code) {
        return this.axios({
            ...this.config,
            url: `/js/${code}.js?`,
            method: 'GET',
            params: {
                rt: new Date().getTime(),
            },
        });
    }

    getFundLastData(config) {
        return axios(config);
    }
    getFundData(code) {
        return this.axios({
            ...this.config,
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
    getFundListData(codes) {
        return this.axios({
            ...this.config,
            url: '/FundMNewApi/FundMNFInfo',
            params: {
                pageIndex: 1,
                pageSize: 999,
                appType: 'ttyy',
                product: 'EFund',
                plat: 'Android',
                deviceid: '9e16077fca2fcr78ep0ltn98',
                Version: 1,
                Fcodes: codes || FundConfig.fundCodes.join(',')
            }
        })
    }
}