(this["webpackJsonpfuck-found-fund"]=this["webpackJsonpfuck-found-fund"]||[]).push([[0],{126:function(e,t,a){e.exports=a(231)},131:function(e,t,a){},132:function(e,t,a){},163:function(e,t){},164:function(e,t,a){},231:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),i=a.n(c),o=(a(131),a(50)),s=a(11),l=(a(132),a(133),a(134),a(30)),u=a(31),m=a(34),f=a(33);var h=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"home-container"},r.a.createElement("ul",{className:"menu"},_.map((function(e){return r.a.createElement("li",{style:{width:"".concat(100/_.length,"%")},key:e.path.replace("/","")},r.a.createElement(o.b,{to:e.path},e.name))}))))}}]),a}(r.a.Component),C=a(59),d=a(25),p=a.n(d),v=a(125),F=a(52),E=a(39),S=a.n(E),y=a(35),b=a.n(y),Y=a(92),D=a.n(Y),R=a(53),k=a(16),Z=a(42),O=a.n(Z);O.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),O.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var L=O.a,w=["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406","001156","162605"],J={"001679":{FCCFE:6783.15,FCCCBDJ:1.8281,PLATFORM:"JD"},"001102":{FCCFE:5385.2,FCCCBDJ:3.4399,PLATFORM:"TTJJ"},"001156":{FCCFE:8779.41,FCCCBDJ:2.5167,PLATFORM:"TTJJ"},"005969":{FCCFE:3112.99,FCCCBDJ:3.2834,PLATFORM:"TTJJ"},"005827":{FCCFE:5382.42,FCCCBDJ:2.6518,PLATFORM:"TTJJ"},161005:{FCCFE:3074.76,FCCCBDJ:3.22831,PLATFORM:"TTJJ"},161725:{FCCFE:12074.85,FCCCBDJ:1.2971,PLATFORM:"MYCF"},163406:{FCCFE:7879.74,FCCCBDJ:2.0759,PLATFORM:"MYCF"},162605:{FCCFE:5734.05,FCCCBDJ:3.6027,PLATFORM:"MYCF"},"005911":{FCCFE:3112.99,FCCCBDJ:3.2834,PLATFORM:"MYCF"},"003095":{FCCFE:5776.2,FCCCBDJ:3.4029,PLATFORM:"MYCF"},"001875":{FCCFE:3690.46,FCCCBDJ:2.791,PLATFORM:"MYCF"},"002656":{FCCFE:10180.9,FCCCBDJ:1.3572,PLATFORM:"MYCF"},"009329":{FCCFE:10269.65,FCCCBDJ:1.4363,PLATFORM:"MYCF"},519727:{FCCFE:4079.78,FCCCBDJ:2.3084,PLATFORM:"MYCF"}},g=S.a.uniq([].concat(Object(k.a)(Object.keys(J)),Object(k.a)(w)));function j(e){return L(Object(R.a)(Object(R.a)({},e),{},{baseURL:"https://fundmobapi.eastmoney.com/"})).then((function(e){var t=e.data;if(200===e.status)return t}))}function N(e){return j({url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:e||g.join(",")}})}var T=a(234);function M(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return T.a(e,t)}function B(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n={ZRQRZSY:0,JRQRZSY:0,JRGSZSY:0,CCZSY:0,YGZSZ:0,CCZCB:0,updateFlag:-1},r=0,c=0;return n.list=e.map((function(e){var i=a[e.FCODE],o=0,s=0,l=0,u=0,m=0,f=0,h=!1;if(i){c+=1;var C=i.FCCFE,d=i.FCCCBDJ,p=e.NAV,v=e.NAVCHGRT,F=e.GSZ,E=e.GSZZL,S=e.PDATE;h=!0,m=M(d*C),f=M(p*C),0===t.indexOf(S)&&Number(v)&&Number(p)?(r+=1,l=M(v*f/100)):o=M(v*f/100),s=M(F*E*C/100),u=M(f-m)||0,n.ZRQRZSY+=Number(o),n.JRQRZSY+=Number(l),n.JRGSZSY+=Number(s),n.CCZSY+=Number(u),n.YGZSZ=M(n.YGZSZ+f),n.CCZCB=M(n.CCZCB+m)}return Object(R.a)(Object(R.a)({},e),{},{JRGSSY:s,JRQRSY:l,JRQRSYL:M(l/f*100),CCSY:u,CCSYL:M(u/m*100),CCZCB:m,CCZSZ:f,isHave:h})})),n.updateFlag=0===r?-1:r===c?1:0,n.ZRQRZSY=M(n.ZRQRZSY),n.JRQRZSY=M(n.JRQRZSY),n.JRGSZSY=M(n.JRGSZSY),n.CCZSY=M(n.CCZSY),n}var G=function(e){var t=e.funds,a=e.onlyShowHave,n=e.showRate,c=e.updateFlag,i=e.sortList;return r.a.createElement("div",{className:"list-container"},r.a.createElement("div",{className:"list-content"},r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"GSZZL")},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca\u7387"),n?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRGSSY")},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca"),-1!==c?r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRQRSYL")},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca\u7387"):"",-1===c||n?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRQRSY")},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca"),r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"CCSYL")},"\u6301\u4ed3\u6536\u76ca\u7387"),n?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"CCSY")},"\u6301\u4ed3\u6536\u76ca"))),t.filter((function(e){return!a||e.isHave})).map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,B(e.GSZZL,"%"),n?"":B(e.JRGSSY),-1!==c?B(e.JRQRSYL,"%"):"",-1===c||n?"":B(e.JRQRSY),B(e.CCSYL,"%"),n?"":B(e.CCSY),r.a.createElement("span",{className:"fund-name"},r.a.createElement("label",{className:"have-tag"},e.isHave?"\u6301\u6709":""),e.SHORTNAME,"(",e.FCODE,")")))}))))},H="".concat(b()().format("YYYY-MM-DD")," 9:00:01"),P="".concat(b()().format("YYYY-MM-DD")," 15:00:01"),Q=function(e){window.consoleInfo=function(){console.log("\u6301\u4ed3\u603b\u6210\u672c\uff1a",e.CCZCB),console.log("\u9884\u4f30\u603b\u5e02\u503c\uff1a",e.YGZSZ)}};function x(e,t,a){if(t){var n=M(e/a*100);return"".concat(n,"%")}return e}var q=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={showDetail:!1,onlyShowHave:!0,updateFlag:-1,refreshTime:"",fundData:[],funListData:[],showRate:!0},n}return Object(u.a)(a,[{key:"getFundListData",value:function(){var e=Object(F.a)(p.a.mark((function e(){var t,a,n,r,c,i,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=b()().format("YYYY-MM-DD HH:mm:ss"),a=b()(t).isAfter(P)||b()(H).isAfter(t),!this.timer||!a){e.next=5;break}return this.clearTimer(),e.abrupt("return");case 5:return e.next=7,N();case 7:n=e.sent,r=A(n.Datas,t,J),c=r.list,i=r.updateFlag,o=Object(v.a)(r,["list","updateFlag"]),Q(r),this.setState({updateFlag:i,refreshTime:t,fundData:o}),this.sortList(c,"GSZZL",this.state.GSZZL||"desc"),this.setTimer();case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"sortList",value:function(e,t,a){var n,r=this.state[t],c=a||("desc"===r?"asc":"desc"),i=e;S.a.isEmpty(i)&&(i=this.state.funListData),this.setState((n={},Object(C.a)(n,t,c),Object(C.a)(n,"funListData",S.a.orderBy(i||[],(function(e){return Number(e[t])+1e5}),c)),n))}},{key:"setTimer",value:function(){var e=this;this.timer=setTimeout((function(){D.a.start(),e.getFundListData(),D.a.done()}),5e3)}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.getFundListData()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"changeShowHave",value:function(){this.setState({onlyShowHave:!this.state.onlyShowHave})}},{key:"changeShowDetail",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"printAll",value:function(){var e=this.state.fundData,t=e.CCZCB,a=e.YGZSZ;window.consoleInfo(),window.alert("\u6301\u4ed3\u603b\u6210\u672c\uff1a".concat(t,"<br/>\u9884\u4f30\u603b\u5e02\u503c\uff1a").concat(a))}},{key:"swtichNumber",value:function(){this.setState({showRate:!this.state.showRate})}},{key:"render",value:function(){var e=this.state,t=e.funListData,a=void 0===t?[]:t,n=e.fundData,c=void 0===n?{}:n,i=e.refreshTime,o=e.onlyShowHave,s=e.updateFlag,l=e.showDetail,u=e.showRate,m=c.CCZCB,f=c.CCZSY,h=c.YGZSZ,C=c.ZRQRZSY,d=c.JRQRZSY,p=c.JRGSZSY,v=Object.keys(J).length,F=M(f/m*100,2);return r.a.createElement("div",{className:"fund-container"},r.a.createElement("button",{className:"total-all",onClick:this.printAll.bind(this)},"\u603b\u8ba1"),r.a.createElement("button",{className:"total-all swtich-number",onClick:this.swtichNumber.bind(this)},"\u603b\u8ba1"),r.a.createElement("p",{className:"update-time"},"\u66f4\u65b0\u65f6\u95f4\uff1a",i),r.a.createElement("p",null,"\u6301\u4ed3\u6570\u91cf\uff1a",v),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca\uff1a",u?"".concat(F,"%"):f),r.a.createElement("p",null,"\u6628\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",x(C,u,h)),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",x(d,u,h),function(e){var t=["\u66f4\u65b0\u4e2d","\u66f4\u65b0\u5b8c\u6210"];return t[e]?r.a.createElement("span",{className:"red"},"(",t[e],")"):""}(s)),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",x(p,u,h)),r.a.createElement("div",{className:"operation-container"},r.a.createElement("button",{onClick:this.changeShowDetail.bind(this)},l?"\u9690\u85cf":"\u663e\u793a","\u8be6\u60c5"),r.a.createElement("button",{onClick:this.changeShowHave.bind(this)},o?"\u663e\u793a":"\u9690\u85cf","\u672a\u6301\u6709")),l&&r.a.createElement(G,{funds:a,onlyShowHave:o,showRate:u,updateFlag:s,sortList:this.sortList.bind(this)}))}}]),a}(r.a.Component),I=(a(164),a(63));function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.keepFundList,a=e.lostFundList,n=e.newFundList;return[].concat(Object(k.a)(t),Object(k.a)(a),Object(k.a)(n)).map((function(e){return e.code})).join(",")}var W=function(e,t){var a=function(e,t){return e.find((function(e){return e.FCODE===t}))}(e,t)||{};return r.a.createElement("td",{key:"GSZZL".concat(t)},B(a.GSZZL,"%"))},U=function(e,t,a){return e.map((function(e){return"code"===e?r.a.createElement("td",{key:"".concat(t[e]).concat(t.code)},r.a.createElement("a",{href:"http://fund.eastmoney.com/".concat(t[e],".html"),target:"_blank",rel:"noopener noreferrer"},t[e])):r.a.createElement("td",{key:"".concat(t[e]).concat(t.code)},t[e])})).concat([W(a,t.code)])},z=b()().format("YYYY-MM-DD HH:mm:ss"),$=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={fundVsData:{},fundList:[],historyData:[]},n}return Object(u.a)(a,[{key:"getFundListData",value:function(){var e=Object(F.a)(p.a.mark((function e(t){var a,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=V(t),e.next=3,N(a);case 3:n=e.sent,r=A(n.Datas,z),this.setState({fundList:r.list});case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getHistoryData",value:function(){var e=Object(F.a)(p.a.mark((function e(){var t=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O()({url:"/data/quantify/compare/history.json",responseType:"json"}).then((function(e){200===e.status?t.setState({historyData:e.data.historyData}):I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef1")})).catch((function(e){I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef1")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getCurrentData",value:function(){var e=Object(F.a)(p.a.mark((function e(){var t,a,n=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props.match.params.date,a=void 0===t?"index":t,O()({url:"/data/quantify/compare/".concat(a,".json"),responseType:"json"}).then((function(e){200===e.status?(n.setState({fundVsData:e.data}),n.getFundListData(e.data)):I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef2")})).catch((function(e){console.log(e),I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef3")}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.getCurrentData(),this.getHistoryData()}},{key:"render",value:function(){var e=this.state,t=e.fundList,a=e.fundVsData,n=e.historyData,c=a.date,i=a.preDate,s=a.keys,l=a.headers,u=a.keepFundList,m=a.lostFundList,f=a.newFundList;return console.log("hh==>",a,n),Object(E.isEmpty)(a)?r.a.createElement("div",null,"loading..."):r.a.createElement("div",{className:"quantify-container"},r.a.createElement("p",null,"\u672c\u671f\u699c\u5355\u66f4\u65b0(",c,"\u4e0e",i,")\uff1a"),r.a.createElement("br",null),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,l.map((function(e){return r.a.createElement("td",{key:e.key},e.name)})),r.a.createElement("td",{key:"GSSL"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca\u7387"))),r.a.createElement("tbody",null,r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:s.length},"\u672c\u671f\u5728\u699c\u57fa\u91d1\uff08",c,"\uff09")),u.map((function(e){return r.a.createElement("tr",{key:e.code},U(s,e,t))})),r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:s.length},"\u672c\u671f\u843d\u699c\u57fa\u91d1\uff08",i,"\uff09")),m.map((function(e){return r.a.createElement("tr",{key:e.code},U(s,e,t))})),r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:s.length},"\u672c\u671f\u4e0a\u699c\u57fa\u91d1\uff08",c,"\uff09")),f.map((function(e){return r.a.createElement("tr",{key:e.code},U(s,e,t))})))),r.a.createElement("div",{className:"vs-history"},r.a.createElement("p",null,"\u5f80\u671f\u56de\u987e\uff1a"),r.a.createElement("div",null,n.map((function(e){return r.a.createElement("p",{key:e},r.a.createElement(o.b,{to:"/quantify/rank/".concat(e)},e))})))))}}]),a}(r.a.Component),_=[{name:"\u9996\u9875",path:"/",component:h},{name:"\u6301\u4ed3",path:"/fund",component:q},{name:"\u91cf\u5316\u7b56\u7565",path:"/quantify",component:$,exact:!0,children:[{name:"\u91cf\u5316\u7b56\u7565\u5f80\u671f\u6392\u884c",path:"/quantify/rank/:date",component:$}]},{name:"\u81ea\u9009",path:"/mark",component:function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"\u81ea\u9009")}}]),a}(r.a.Component)}],K=[];!function e(t){t.forEach((function(t){K.push(t),t.children&&e(t.children)}))}(_);var X=function(){return r.a.createElement("div",{className:"container"},r.a.createElement(o.a,null,K.map((function(e){return r.a.createElement(s.a,{path:e.path,component:e.component,key:e.path,exact:e.exact})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[126,1,2]]]);
//# sourceMappingURL=main.989d650a.chunk.js.map