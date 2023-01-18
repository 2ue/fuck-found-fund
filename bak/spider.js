let request = require('request-promise')
let $ = require('cheerio')
let express = require('express');
const e = require('express');
let app = express()
const URI = 'https://mp.weixin.qq.com/s/zPYbklOboUsbf64mnWwXVQ/';

app.get('/', async (req, res) => {
    let result = await request(URI)//异步请求网页
    let data = []
    // let elements = $('#js_content', 'section section section p', result)//解析出网页里的a元素
    console.log(elements);
    // elements.map((i, ele) => {
    //   let json = {}
    //   let $ele = $(ele)
    //   json.url = $ele.attr('href')//获取a元素的地址链接
    //   json.title = $ele.children().text()//获取标题
    //   data.push(json)
    // })
    // console.log(data)
    res.send(1)//把data数据返回给前台
  })
  app.get('/detail', async (req, res) => {
    let result = await request(URI + req.query.path)
    let data = {}
    let element = $('.content-inner .answer', result)//解析网页的指定元素
    data.avatar_url = $('.meta img.avatar', element).attr('src')//获取头像url
    data.author = $('.meta .author', element).text()//获取作者
    data.bio = $('.meta .bio', element).text()//获取作者签名
    data.content = $('.content', element).text()//获取文章内容
    res.send(data)//返回data给前台
  })
  app.listen(8001, () => {//启动一个8001端口的server服务
    console.log('Listening on port 8001')
  })

  const puppeteer = require('puppeteer')

//启动浏览器
const browers = await puppeteer.launch()
//启动新页面
const page = await browers.newPage()
//链接网址
await page.goto(url)

// function gg(p, n) {
//     const price = 1.2;
//     const num = 8333.3333;

//     const als = 10000;
//     const nowAls = num * p;

//     if (als - nowAls > 0) {
//         const newNum = (als - nowAls) / p;
//         const newP = als / (num + newNum);
//         console.log('ddd==>', p, newP);
//     }
//     console.log((num + n))
// }

// gg(1.04);
// gg(1.1);
// gg(0.84);