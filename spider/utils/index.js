module.exports = {
    completionZero(num, len = 6) {
        const str = Array(len).join('0').concat(num);
        return str.substr(str.length - len, len);
    }
}