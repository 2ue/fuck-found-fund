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
        date: '2021/5/6',
        url: 'https://mp.weixin.qq.com/s/-PRqyBSW0IvtrwvvTKdm4A',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    },
    {
        date: '2021/4/27',
        url: 'https://mp.weixin.qq.com/s/m3W8lk2AXjekCm3MBLUQHA',
        headermap: ['code', 'name', 'retracement', 'sharpe'],
    },
    {
        date: '2021/4/20',
        url: 'https://mp.weixin.qq.com/s/ILRxk8wcfyrsAdyfxbXmPA',
        headermap: ['code', 'name', 'income', 'retracement', 'sharpe'],
    }
];

