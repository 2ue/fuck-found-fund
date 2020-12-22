import React from 'react';

class FundChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(JSON.parse(JSON.stringify(props)));
        const { code } = props;
        this.state = {
            // 或者http://www.27ba.com/zb_users/upload/2018/09/20180925202910_16888.png
            url: code ? `http://j4.dfcfw.com/charts/pic6/${code}.png` : '',
        };
    }
    render() {
        const url = this.state.url;
        console.log(url);

        return url && <img src={url} alt=""/>;
    }
}

export default FundChart;