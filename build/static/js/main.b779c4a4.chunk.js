(this["webpackJsonpfuck-found-fund"]=this["webpackJsonpfuck-found-fund"]||[]).push([[0],{36:function(e,t,a){e.exports=a(71)},41:function(e,t,a){},68:function(e,t){},69:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(30),c=a.n(i),s=(a(41),a(11)),o=a(17),l=a.n(o),u=a(31),C=a(32),m=a(33),F=a(35),f=a(34),d=a(14),h=a.n(d),S=a(12),v=a.n(S),p=a(18),E=a.n(p),D=a(74),Y=a(5),Z=a(16),R=a.n(Z);R.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),R.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var J=R.a,b=["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406","001156"],N={"000478":{FCCFE:2359.5,FCCCBDJ:2.2977},"001679":{FCCFE:6520.6,FCCCBDJ:1.7636},161028:{FCCFE:8654.75,FCCCBDJ:.4439},"001102":{FCCFE:3715.63,FCCCBDJ:3.1489},519712:{FCCFE:1930.09,FCCCBDJ:3.3455},"005827":{FCCFE:3452.54,FCCCBDJ:2.416},161005:{FCCFE:2137.87,FCCCBDJ:3.3186},161725:{FCCFE:7089.61,FCCCBDJ:1.2356},163406:{FCCFE:4651.61,FCCCBDJ:2.0439},"002510":{FCCFE:9234.87,FCCCBDJ:1.5593},"003095":{FCCFE:2776.91,FCCCBDJ:3.0644},"002656":{FCCFE:7481.17,FCCCBDJ:1.3056},"004069":{FCCFE:9993.63,FCCCBDJ:1.2474},"008086":{FCCFE:11419.77,FCCCBDJ:1.2452},"007300":{FCCFE:4457.47,FCCCBDJ:2.1649},"009329":{FCCFE:8776.88,FCCCBDJ:1.3786},519727:{FCCFE:3051.22,FCCCBDJ:2.2016},"001156":{FCCFE:5241.35,FCCCBDJ:2.6129}},g=h.a.uniq([].concat(Object(Y.a)(Object.keys(N)),Object(Y.a)(b)));function w(e){return J(Object(s.a)(Object(s.a)({},e),{},{baseURL:"https://fundmobapi.eastmoney.com/"})).then((function(e){var t=e.data;if(200===e.status)return t}))}function y(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}var B=function(e){var t=e.funds,a=e.onlyShowHave;return r.a.createElement("div",{className:"list-container"},r.a.createElement("div",{className:"list-content"},r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate"},"\u6536\u76ca\u7387")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u6301\u4ed3\u6536\u76ca")," |")),t.filter((function(e){return!a||e.isHave})).map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,y(e.GSZZL,"%")," |",y(e.JRGSSY)," |",y(e.JRQRSY)," |",y(e.CCSY)," |",r.a.createElement("span",{className:"fund-name"},r.a.createElement("label",{className:"have-tag"},e.isHave?"\u6301\u6709":""),e.SHORTNAME,"(",e.FCODE,")")))}))))},k="".concat(v()().format("YYYY-MM-DD")," 9:00:01"),O="".concat(v()().format("YYYY-MM-DD")," 15:00:01"),j=function(e){window.consoleInfo=function(){console.log("\u6301\u4ed3\u603b\u6210\u672c\uff1a",e.CCZCB),console.log("\u9884\u4f30\u603b\u5e02\u503c\uff1a",e.YGZSZ)}},G=function(e){Object(F.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(C.a)(this,a),(n=t.call(this,e)).state={showDetail:!1,onlyShowHave:!0,updateFlag:-1,refreshTime:"",fundData:[],funListData:[]},n}return Object(m.a)(a,[{key:"getFundListData",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n,r,i,c,s,o,u,C;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=v()().format("YYYY-MM-DD HH:mm:ss"),a=v()(t).isAfter(O)||v()(k).isAfter(t),!this.timer||!a){e.next=5;break}return this.clearTimer(),e.abrupt("return");case 5:return e.next=7,w({url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:void 0||g.join(",")}});case 7:n=e.sent,r=this.dealData(n.Datas,t),i=r.list,c=r.updateFlag,s=r.ZRQRZSY,o=r.JRQRZSY,u=r.JRGSZSY,C=r.CCZSY,this.setState({updateFlag:c,refreshTime:t,fundData:{ZRQRZSY:s,JRQRZSY:o,JRGSZSY:u,CCZSY:C},funListData:h.a.orderBy(i||[],(function(e){return Number(e.GSZZL)+1e5}),"desc")}),this.setTimer();case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"dealData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a={ZRQRZSY:0,JRQRZSY:0,JRGSZSY:0,CCZSY:0,updateFlag:-1},n=0,r=0,i=0,c=0;return a.list=e.map((function(e){var o=N[e.FCODE],l=0,u=0,C=0,m=0,F=!1;if(o){r+=1;var f=o.FCCFE,d=o.FCCCBDJ,h=e.NAV,S=e.NAVCHGRT,v=e.GSZ,p=e.GSZZL,E=e.PDATE;F=!0,0===t.indexOf(E)&&Number(S)&&Number(h)?(n+=1,C=D.a(S*h*f/100,2)):l=D.a(S*h*f/100,2),u=D.a(v*p*f/100,2),m=D.a(h*f-d*f,2)||0,a.ZRQRZSY+=Number(l),a.JRQRZSY+=Number(C),a.JRGSZSY+=Number(u),a.CCZSY+=Number(m),i=D.a(i+h*f,2),c=D.a(c+f*d,2)}return Object(s.a)(Object(s.a)({},e),{},{JRGSSY:u,JRQRSY:C,CCSY:m,isHave:F})})),j({YGZSZ:i,CCZCB:c}),a.updateFlag=0===n?-1:n===r?1:0,a.ZRQRZSY=D.a(a.ZRQRZSY,2),a.JRQRZSY=D.a(a.JRQRZSY,2),a.JRGSZSY=D.a(a.JRGSZSY,2),a.CCZSY=D.a(a.CCZSY,2),a}},{key:"setTimer",value:function(){var e=this;this.timer=setTimeout((function(){E.a.start(),e.getFundListData(),E.a.done()}),5e3)}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.getFundListData()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"changeShowHave",value:function(){this.setState({onlyShowHave:!this.state.onlyShowHave})}},{key:"changeShowDetail",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"render",value:function(){var e=this.state,t=e.funListData,a=void 0===t?[]:t,n=e.fundData,i=void 0===n?{}:n,c=e.refreshTime,s=e.onlyShowHave,o=e.updateFlag,l=e.showDetail,u=Object.keys(N).length;return r.a.createElement("div",null,r.a.createElement("p",{className:"update-time"},"\u66f4\u65b0\u65f6\u95f4\uff1a",c),r.a.createElement("p",null,"\u6301\u4ed3\u6570\u91cf\uff1a",u),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca\uff1a",i.CCZSY),r.a.createElement("p",null,"\u6628\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.ZRQRZSY),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.JRQRZSY,function(e){var t=["\u66f4\u65b0\u4e2d","\u66f4\u65b0\u5b8c\u6210"];return t[e]?r.a.createElement("span",{className:"red"},"(",t[e],")"):""}(o)),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",i.JRGSZSY),r.a.createElement("div",{className:"operation-container"},r.a.createElement("button",{onClick:this.changeShowDetail.bind(this)},l?"\u9690\u85cf":"\u663e\u793a","\u8be6\u60c5"),r.a.createElement("button",{onClick:this.changeShowHave.bind(this)},s?"\u663e\u793a":"\u9690\u85cf","\u672a\u6301\u6709")),l&&r.a.createElement(B,{funds:a,onlyShowHave:s}))}}]),a}(r.a.Component);a(69),a(70);var Q=function(){return r.a.createElement("div",{className:"content"},r.a.createElement(G,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.b779c4a4.chunk.js.map