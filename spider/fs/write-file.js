const fs = require('fs');
const path = require('path');

const DIR = 'src/data';
const FILENAME = 'fund.json';
module.exports = function (data, filename = FILENAME, dir = DIR) {
    const wDir = path.join(process.cwd(), dir);
    if (!fs.existsSync(wDir)) {
        console.log(`创建文件夹：${dir}`);
        fs.mkdirSync(wDir);
    }
    fs.writeFile(path.join(wDir, filename), data, (error) => {
        // 创建失败
        if(error){
            console.log(`创建失败：${error}`);
        }
    
        // 创建成功
        console.log(`创建成功！`);
        
    });
}