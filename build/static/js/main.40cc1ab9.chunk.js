(this["webpackJsonpfuck-found-fund"]=this["webpackJsonpfuck-found-fund"]||[]).push([[0],{36:function(e,t,a){e.exports=a(71)},41:function(e,t,a){},68:function(e,t){},69:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(30),c=a.n(i),s=(a(41),a(11)),o=a(17),u=a.n(o),l=a(31),C=a(32),m=a(33),F=a(35),f=a(34),d=a(14),h=a.n(d),S=a(12),v=a.n(S),p=a(18),E=a.n(p),D=a(74),Y=a(5),R=a(16),Z=a.n(R);Z.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),Z.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var J=Z.a,b=["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406","001156"],y={"000478":{FCCFE:2359.5,FCCCBDJ:2.297},"001679":{FCCFE:6129.84,FCCCBDJ:1.664},161028:{FCCFE:7734.35,FCCCBDJ:.3674},"001102":{FCCFE:3570.04,FCCCBDJ:3.1093},519712:{FCCFE:1848.7,FCCCBDJ:3.3305},"005827":{FCCFE:2968.3,FCCCBDJ:2.3213},161005:{FCCFE:1950.93,FCCCBDJ:3.2778},161725:{FCCFE:5401.44,FCCCBDJ:1.1775},163406:{FCCFE:4226.06,FCCCBDJ:2.0368},"002510":{FCCFE:9234.87,FCCCBDJ:1.5593},"003095":{FCCFE:2407.36,FCCCBDJ:3.0364},"002656":{FCCFE:7214.85,FCCCBDJ:1.2984},"004069":{FCCFE:9833.74,FCCCBDJ:1.2473},"008086":{FCCFE:11180.99,FCCCBDJ:1.245},"007300":{FCCFE:4136.3,FCCCBDJ:2.1638},"009329":{FCCFE:8437.19,FCCCBDJ:1.363},519727:{FCCFE:2864.02,FCCCBDJ:2.1709},"001156":{FCCFE:4998.12,FCCCBDJ:2.62}},w=h.a.uniq([].concat(Object(Y.a)(Object.keys(y)),Object(Y.a)(b)));function N(e){return J(Object(s.a)(Object(s.a)({},e),{},{baseURL:"https://fundmobapi.eastmoney.com/"})).then((function(e){var t=e.data;if(200===e.status)return t}))}function g(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}var k=function(e){var t=e.funds,a=e.onlyShowHave;return r.a.createElement("div",null,r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate"},"\u6536\u76ca\u7387")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca")," |")),t.filter((function(e){return!a||e.isHave})).map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,g(e.GSZZL,"%")," |",g(e.JRGSSY)," |",g(e.JRQRSY)," |",r.a.createElement("span",{className:"fund-name"},r.a.createElement("label",{className:"have-tag"},e.isHave?"\u6301\u6709":""),e.SHORTNAME,"(",e.FCODE,")")))})))},B="".concat(v()().format("YYYY-MM-DD")," 9:00:01"),O="".concat(v()().format("YYYY-MM-DD")," 15:00:01"),Q=function(e){Object(F.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(C.a)(this,a),(n=t.call(this,e)).state={showDetail:!1,onlyShowHave:!0,updateFlag:-1,refreshTime:"",fundData:[],funListData:[]},n}return Object(m.a)(a,[{key:"getFundListData",value:function(){var e=Object(l.a)(u.a.mark((function e(){var t,a,n,r,i,c,s,o,l,C;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=v()().format("YYYY-MM-DD HH:mm:ss"),a=v()(t).isAfter(O)||v()(B).isAfter(t),!this.timer||!a){e.next=5;break}return this.clearTimer(),e.abrupt("return");case 5:return e.next=7,N({url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:void 0||w.join(",")}});case 7:n=e.sent,r=this.dealData(n.Datas,t),i=r.list,c=r.updateFlag,s=r.ZRQRZSY,o=r.JRQRZSY,l=r.JRGSZSY,C=r.CCZSY,this.setState({updateFlag:c,refreshTime:t,fundData:{ZRQRZSY:s,JRQRZSY:o,JRGSZSY:l,CCZSY:C},funListData:h.a.orderBy(i||[],(function(e){return Number(e.GSZZL)+1e5}),"desc")}),this.setTimer();case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"dealData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a={ZRQRZSY:0,JRQRZSY:0,JRGSZSY:0,CCZSY:0,updateFlag:-1},n=0,r=0;return a.list=e.map((function(e){var i=y[e.FCODE],c=0,o=0,u=0,l=0,C=!1;if(i){r+=1;var m=i.FCCFE,F=i.FCCCBDJ,f=e.NAV,d=e.NAVCHGRT,h=e.GSZ,S=e.GSZZL,v=e.PDATE;C=!0,0===t.indexOf(v)&&Number(d)&&Number(f)?(n+=1,u=D.a(d*f*m/100,2)):c=D.a(d*f*m/100,2),o=D.a(h*S*m/100,2),l=D.a(f*m-F*m,2)||0,a.ZRQRZSY+=Number(c),a.JRQRZSY+=Number(u),a.JRGSZSY+=Number(o),a.CCZSY+=Number(l)}return Object(s.a)(Object(s.a)({},e),{},{JRGSSY:o,JRQRSY:u,CCSY:l,isHave:C})})),a.updateFlag=0===n?-1:n===r?1:0,a.ZRQRZSY=D.a(a.ZRQRZSY,2),a.JRQRZSY=D.a(a.JRQRZSY,2),a.JRGSZSY=D.a(a.JRGSZSY,2),a.CCZSY=D.a(a.CCZSY,2),a}},{key:"setTimer",value:function(){var e=this;this.timer=setTimeout((function(){E.a.start(),e.getFundListData(),E.a.done()}),5e3)}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.getFundListData()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"changeShowHave",value:function(){this.setState({onlyShowHave:!this.state.onlyShowHave})}},{key:"changeShowDetail",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"render",value:function(){var e=this.state,t=e.funListData,a=void 0===t?[]:t,n=e.fundData,i=void 0===n?{}:n,c=e.refreshTime,s=e.onlyShowHave,o=e.updateFlag,u=e.showDetail;return r.a.createElement("div",null,r.a.createElement("p",{className:"update-time"},"\u66f4\u65b0\u65f6\u95f4\uff1a",c),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca\uff1a",i.CCZSY),r.a.createElement("p",null,"\u6628\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.ZRQRZSY),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.JRQRZSY,function(e){var t=["\u66f4\u65b0\u4e2d","\u66f4\u65b0\u5b8c\u6210"];return t[e]?r.a.createElement("span",{class:"red"},"(",t[e],")"):""}(o)),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",i.JRGSZSY),r.a.createElement("div",{className:"operation-container"},r.a.createElement("button",{onClick:this.changeShowDetail.bind(this)},u?"\u9690\u85cf":"\u663e\u793a","\u8be6\u60c5"),r.a.createElement("button",{onClick:this.changeShowHave.bind(this)},s?"\u663e\u793a":"\u9690\u85cf","\u672a\u6301\u6709")),u&&r.a.createElement(k,{funds:a,onlyShowHave:s}))}}]),a}(r.a.Component);a(69),a(70);var T=function(){return r.a.createElement("div",{className:"content"},r.a.createElement(Q,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.40cc1ab9.chunk.js.map