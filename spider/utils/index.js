module.exports = {
    completionZero(num, len = 6) {
        const str = Array(len).join('0').concat(num);
        return str.substr(str.length - len, len);
    },
    getParamsToArr() {
        const args = process.argv.slice(2);
        return args;
    },
    getParamsToObj() {
        // console.log(this);
        const arr = this.getParamsToArr();
        const obj = {};
        arr.forEach(a => {
            const data = a.split('=');
            obj[data[0]] = data[1];
        });
        return obj;
    }
}