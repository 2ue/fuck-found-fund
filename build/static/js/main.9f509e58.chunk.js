(this["webpackJsonpelectron-demo"]=this["webpackJsonpelectron-demo"]||[]).push([[0],{32:function(e,t,a){e.exports=a(66)},37:function(e,t,a){},64:function(e,t){},65:function(e,t,a){},66:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(27),c=a.n(i),s=(a(37),a(5)),o=a(15),u=a.n(o),C=a(28),l=a(12),m=a(13),F=a(31),d=a(30),f=a(14),p=a.n(f);p.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),p.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var v=p.a,h={baseURL:"https://fundmobapi.eastmoney.com/",fundCodes:["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406"],fundInvote:{"000478":{FCCFE:2359.5,FCCCB:5421.5},"001679":{FCCFE:6129.84,FCCCB:10300},161028:{FCCFE:10613.24,FCCCB:12e3},"001102":{FCCFE:3570.04,FCCCB:11100},519712:{FCCFE:1848.7,FCCCB:6156.96},"005827":{FCCFE:2950.01,FCCCB:6840.11},161005:{FCCFE:1922.35,FCCCB:6294.62},519674:{FCCFE:733.16,FCCCB:3669.31},161725:{FCCFE:3657.24,FCCCB:4868.88-1213.41},163406:{FCCFE:920.31,FCCCB:1742.99},"002510":{FCCFE:9106.87,FCCCB:14300},"003095":{FCCFE:2392.26,FCCCB:7309.67},"002656":{FCCFE:7141.93,FCCCB:9367.77},"004069":{FCCFE:7865.48,FCCCB:9858.44},"008086":{FCCFE:9307.22,FCCCB:11748.7},320007:{FCCFE:4800.38,FCCCB:8566.3},"001552":{FCCFE:4780.9,FCCCB:5386.87},"007300":{FCCFE:4136.3,FCCCB:8950},"009329":{FCCFE:8437.19,FCCCB:11500},519727:{FCCFE:2864.02,FCCCB:6217.6}}},E=function(){function e(t){Object(l.a)(this,e),this.config=t}return Object(m.a)(e,[{key:"dealJsonp",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.data;if("object"===typeof t)return t;try{return JSON.parse(t.match(/^jsonpgz\((.*)\)/,"")[1])}catch(a){return console.error(a),{}}}},{key:"axios",value:function(e){var t=this,a=Object(s.a)(Object(s.a)({},e),{},{baseURL:h.baseURL});return v(a).then((function(e){return t.dealJsonp.call(t,e)}))}},{key:"getFundCurrentData",value:function(e){return this.axios(Object(s.a)(Object(s.a)({},this.config),{},{url:"/js/".concat(e,".js?"),method:"GET",params:{rt:(new Date).getTime()}}))}},{key:"getFundLastData",value:function(e){return v(e)}},{key:"getFundData",value:function(e){return this.axios(Object(s.a)(Object(s.a)({},this.config),{},{url:"/FundMNewApi/FundMNNBasicInformation",params:{version:"6.2",plat:"Android",appType:"ttjj",FCODE:e,onFundCache:3,keeeeeyparam:"FCODE",deviceid:"656c09923c567b89bb44801020bc59ab%7C%7Ciemi_tluafed_me",igggggnoreburst:!0,product:"EFund",MobileKey:"656c09923c567b89bb44801020bc59ab%7C%7Ciemi_tluafed_me"}}))}},{key:"getFundListData",value:function(e){return this.axios(Object(s.a)(Object(s.a)({},this.config),{},{url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:e||h.fundCodes.join(",")}}))}}]),e}();function Z(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}var S=function(e){var t=e.funds;return r.a.createElement("div",null,r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate"},"\u6536\u76ca\u7387")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca")," |")),t.map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,Z(e.GSZZL,"%")," |",Z(e.JZGSSY)," |",Z(e.JZQRSY)," |",r.a.createElement("span",{className:"fund-name"},e.SHORTNAME,"(",e.FCODE,")")))})))},b=a(29),Y=a.n(b),g=a(11),D=a.n(g),y=a(69),j="".concat(D()().format("YYYY-MM-DD")," 9:00:01"),B="".concat(D()().format("YYYY-MM-DD")," 15:00:01"),O=function(e){Object(F.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={refreshTime:"",funListData:[]},n}return Object(m.a)(a,[{key:"getFundListData",value:function(){var e=Object(C.a)(u.a.mark((function e(){var t,a,n,r,i,c,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.utils.getFundListData();case 2:t=e.sent,a=D()().format("YYYY-MM-DD HH:mm:ss"),n=this.dealData(t.Datas,a),r=n.data,i=n.JZQRZSY,c=n.JZGSZSY,s=n.QRZSY,this.setState({refreshTime:a,fundData:{JZQRZSY:i,JZGSZSY:c,QRZSY:s},funListData:Y.a.orderBy(r||[],"GSZZL","desc")});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"dealData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=h.fundInvote,n={JZQRZSY:0,JZGSZSY:0,QRZSY:0};return n.data=e.map((function(e){var r=a[e.FCODE],i="",c="",o="";if(r){var u=r.FCCFE,C=r.FCCCB,l=e.NAV,m=e.NAVCHGRT,F=e.GSZ,d=e.GSZZL,f=e.PDATE;0===t.indexOf(f)&&(c=y.a(m*l*u/100,2)),i=y.a(F*d*u/100,2),o=y.a(F*u-C,2),n.JZQRZSY+=Number(c),n.JZGSZSY+=Number(i),n.QRZSY+=Number(o)}return Object(s.a)(Object(s.a)({},e),{},{JZGSSY:i,JZQRSY:c,CCSY:o})})),n.JZQRZSY=y.a(n.JZQRZSY,2),n.JZGSZSY=y.a(n.JZGSZSY,2),n.QRZSY=y.a(n.QRZSY,2),n}},{key:"setTimer",value:function(){var e=this;this.getFundListData();var t=this.state.refreshTime;D()(B).isAfter(t)||D()(t).isAfter(j)||(this.timer=setInterval((function(){e.getFundListData()}),5e3))}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"autoRefresh",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.utils=new E,this.setTimer()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"render",value:function(){var e=this.state,t=e.funListData,a=void 0===t?[]:t,n=e.fundData,i=void 0===n?{}:n,c=e.refreshTime;return r.a.createElement("div",null,r.a.createElement("p",{className:"update-time"},"\u65f6\u95f4\uff1a",c),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca: ",i.QRZSY),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.JZQRZSY),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",i.JZGSZSY),r.a.createElement(S,{funds:a}))}}]),a}(r.a.Component);a(65);var J=function(){return r.a.createElement("div",{className:"content"},r.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[32,1,2]]]);
//# sourceMappingURL=main.9f509e58.chunk.js.map