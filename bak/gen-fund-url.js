var fs = require('fs')

// API
const fundCodes = [
'000751',
'161005',
'260108',
'163406',
'519704',
'001875',
'040035',
'163415',
'202023',
'007119',
'',
'005827',
'110022',
'180012',
'000083',
'162605',
'519066',
'213001',
'110003',
'519697',
'270002',
'',
'202101',
'110027',
'485111',
'',
'003095',
'001410',
];
const arr = fundCodes.map(code => `http://fundf10.eastmoney.com/ccmx_${code}.html`);
fs.writeFile('./hello.text', arr.join('\n'), (error) => {
  
    // 创建失败
    if(error){
        console.log(`创建失败：${error}`)
    }

    // 创建成功
    console.log(`创建成功！`)
    
})