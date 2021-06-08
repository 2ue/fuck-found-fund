const  axios = require('axios');

axios({
    url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cee65edf-7d94-4b8c-a0c3-d19af33037a3',
    method: 'POST',
    data: {
        msgtype: 'markdown',
        markdown: {
            content: '本日新增案例<font color="red">11</font>',
        },
    }
})