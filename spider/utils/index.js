module.exports = {
    completionZero(num, len = 6) {
        let cStr = '';
        if (String(num).length < 6) {
            cStr = Array(len).join('0');
        }
        const aStr = `${cStr}${num}`;
        const start = aStr.length - len;
        return aStr.substr(start, len);
    }
}