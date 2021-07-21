/**
 * 放置一些配置
 * 爬取目标页面的URL
 * url: 'https://mp.weixin.qq.com/s/ILRxk8wcfyrsAdyfxbXmPA'
 * 爬取目标表格的标题头字段的映射关系，数组index和表格标题index相对应
 * 基金代码 基金名称 基金收益 基金回撤 夏普率
 * headermap: ['code', 'name', 'income', 'retracement', 'sharpe']
 */

module.exports = [
    {
        date: '2021721',
        url: 'https://mp.weixin.qq.com/s/exxWvlbOmWhGuGC-liKq1w',
        headermap: ['code', 'name', 'income', 'sharpe'],
    },
    {
        date: '2021714',
        url: 'https://mp.weixin.qq.com/s/5Xmd0hDPYdFXt889kN-nMw',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '202175',
        url: 'https://mp.weixin.qq.com/s/RBdIGk8HczTny1rOGHLGQA',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021629',
        url: 'https://mp.weixin.qq.com/s/7lbuPFQeA-OfzXpcSrr22A',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021623',
        url: 'https://mp.weixin.qq.com/s/5VPUnsACjIkpD087oBoFMw',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021616',
        url: 'https://mp.weixin.qq.com/s/VZl532RVE8ZweKZW8l2fnA',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '202163',
        url: 'https://mp.weixin.qq.com/s/mG8WHe7aLYn-V3IBGyn3qw',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021528',
        url: 'https://mp.weixin.qq.com/s/RgFMX5TrZTEja0NcwlP_Mw',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021519',
        url: 'https://mp.weixin.qq.com/s/AuBQBqi5AwDH1SyXcjsqXQ',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021512',
        url: 'https://mp.weixin.qq.com/s/0T6JcqarT9XqcBV8uKRf8w',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '202156',
        url: 'https://mp.weixin.qq.com/s/-PRqyBSW0IvtrwvvTKdm4A',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021427',
        url: 'https://mp.weixin.qq.com/s/m3W8lk2AXjekCm3MBLUQHA',
        headermap: ['code', 'name', 'retracement', 'sharpe'],
    },
    {
        date: '2021420',
        url: 'https://mp.weixin.qq.com/s/ILRxk8wcfyrsAdyfxbXmPA',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    }
];

