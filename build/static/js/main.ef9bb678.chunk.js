(this["webpackJsonpfuck-found-fund"]=this["webpackJsonpfuck-found-fund"]||[]).push([[0],{126:function(e,t,n){e.exports=n(231)},131:function(e,t,n){},132:function(e,t,n){},163:function(e,t){},164:function(e,t,n){},231:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),i=n.n(c),s=(n(131),n(65)),o=n(11),l=(n(132),n(133),n(134),n(29)),u=n(30),m=n(33),C=n(32);var d=function(e){Object(m.a)(n,e);var t=Object(C.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"home-container"},r.a.createElement("ul",{className:"menu"},K.map((function(e){return r.a.createElement("li",{style:{width:"".concat(100/K.length,"%")},key:e.path.replace("/","")},r.a.createElement(s.b,{to:e.path},e.name))}))))}}]),n}(r.a.Component),f=n(57),h=n(49),p=n.n(h),F=n(125),v=n(66),E=n(38),S=n.n(E),b=n(34),Y=n.n(b),R=n(91),Z=n.n(R),y=n(50),D=n(16),k=n(51),O=n.n(k);O.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),O.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var L=O.a,J=["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406","001156","162605"],w={"001679":{FCCFE:6783.15,FCCCBDJ:1.8281,PLATFORM:"JD"},"001102":{FCCFE:5385.2,FCCCBDJ:3.4399,PLATFORM:"TTJJ"},"001156":{FCCFE:8779.41,FCCCBDJ:2.5167,PLATFORM:"TTJJ"},"005969":{FCCFE:3112.99,FCCCBDJ:3.2834,PLATFORM:"TTJJ"},"005827":{FCCFE:5382.42,FCCCBDJ:2.6518,PLATFORM:"TTJJ"},161005:{FCCFE:3074.76,FCCCBDJ:3.22831,PLATFORM:"TTJJ"},161725:{FCCFE:12074.85,FCCCBDJ:1.2971,PLATFORM:"MYCF"},163406:{FCCFE:7879.74,FCCCBDJ:2.0759,PLATFORM:"MYCF"},162605:{FCCFE:5734.05,FCCCBDJ:3.6027,PLATFORM:"MYCF"},"005911":{FCCFE:3112.99,FCCCBDJ:3.2834,PLATFORM:"MYCF"},"003095":{FCCFE:5776.2,FCCCBDJ:3.4029,PLATFORM:"MYCF"},"001875":{FCCFE:3690.46,FCCCBDJ:2.791,PLATFORM:"MYCF"},"002656":{FCCFE:10180.9,FCCCBDJ:1.3572,PLATFORM:"MYCF"},"009329":{FCCFE:10269.65,FCCCBDJ:1.4363,PLATFORM:"MYCF"},519727:{FCCFE:4079.78,FCCCBDJ:2.3084,PLATFORM:"MYCF"}},N=S.a.uniq([].concat(Object(D.a)(Object.keys(w)),Object(D.a)(J)));function T(e){return L(Object(y.a)(Object(y.a)({},e),{},{baseURL:"https://fundmobapi.eastmoney.com/"})).then((function(e){var t=e.data;if(200===e.status)return t}))}function g(e){return T({url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:e||N.join(",")}})}var j=n(234);function M(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return j.a(e,t)}function B(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}function A(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a={ZRQRZSY:0,JRQRZSY:0,JRGSZSY:0,CCZSY:0,YGZSZ:0,CCZCB:0,updateFlag:-1},r=0,c=0;return a.list=e.map((function(e){var i=n[e.FCODE],s=0,o=0,l=0,u=0,m=0,C=0,d=!1;if(i){c+=1;var f=i.FCCFE,h=i.FCCCBDJ,p=e.NAV,F=e.NAVCHGRT,v=e.GSZ,E=e.GSZZL,S=e.PDATE;d=!0,m=M(h*f),C=M(p*f),0===t.indexOf(S)&&Number(F)&&Number(p)?(r+=1,l=M(F*C/100)):s=M(F*C/100),o=M(v*E*f/100),u=M(C-m)||0,a.ZRQRZSY+=Number(s),a.JRQRZSY+=Number(l),a.JRGSZSY+=Number(o),a.CCZSY+=Number(u),a.YGZSZ=M(a.YGZSZ+C),a.CCZCB=M(a.CCZCB+m)}return Object(y.a)(Object(y.a)({},e),{},{JRGSSY:o,JRQRSY:l,JRQRSYL:M(l/C*100),CCSY:u,CCSYL:M(u/m*100),CCZCB:m,CCZSZ:C,isHave:d})})),a.updateFlag=0===r?-1:r===c?1:0,a.ZRQRZSY=M(a.ZRQRZSY),a.JRQRZSY=M(a.JRQRZSY),a.JRGSZSY=M(a.JRGSZSY),a.CCZSY=M(a.CCZSY),a}var G=function(e){var t=e.funds,n=e.onlyShowHave,a=e.showRate,c=e.updateFlag,i=e.sortList;return r.a.createElement("div",{className:"list-container"},r.a.createElement("div",{className:"list-content"},r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"GSZZL")},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca\u7387"),a?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRGSSY")},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca"),-1!==c?r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRQRSYL")},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca\u7387"):"",-1===c||a?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"JRQRSY")},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca"),r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"CCSYL")},"\u6301\u4ed3\u6536\u76ca\u7387"),a?"":r.a.createElement("span",{className:"income-rate",onClick:i.bind(this,null,"CCSY")},"\u6301\u4ed3\u6536\u76ca"))),t.filter((function(e){return!n||e.isHave})).map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,B(e.GSZZL,"%"),a?"":B(e.JRGSSY),-1!==c?B(e.JRQRSYL,"%"):"",-1===c||a?"":B(e.JRQRSY),B(e.CCSYL,"%"),a?"":B(e.CCSY),r.a.createElement("span",{className:"fund-name"},r.a.createElement("label",{className:"have-tag"},e.isHave?"\u6301\u6709":""),e.SHORTNAME,"(",e.FCODE,")")))}))))},P="".concat(Y()().format("YYYY-MM-DD")," 9:00:01"),H="".concat(Y()().format("YYYY-MM-DD")," 15:00:01"),Q=function(e){window.consoleInfo=function(){console.log("\u6301\u4ed3\u603b\u6210\u672c\uff1a",e.CCZCB),console.log("\u9884\u4f30\u603b\u5e02\u503c\uff1a",e.YGZSZ)}};function x(e,t,n){if(t){var a=M(e/n*100);return"".concat(a,"%")}return e}var q=function(e){Object(m.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={showDetail:!1,onlyShowHave:!0,updateFlag:-1,refreshTime:"",fundData:[],funListData:[],showRate:!0},a}return Object(u.a)(n,[{key:"getFundListData",value:function(){var e=Object(v.a)(p.a.mark((function e(){var t,n,a,r,c,i,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=Y()().format("YYYY-MM-DD HH:mm:ss"),n=Y()(t).isAfter(H)||Y()(P).isAfter(t),!this.timer||!n){e.next=5;break}return this.clearTimer(),e.abrupt("return");case 5:return e.next=7,g();case 7:a=e.sent,r=A(a.Datas,t,w),c=r.list,i=r.updateFlag,s=Object(F.a)(r,["list","updateFlag"]),Q(r),this.setState({updateFlag:i,refreshTime:t,fundData:s}),this.sortList(c,"GSZZL",this.state.GSZZL||"desc"),this.setTimer();case 14:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"sortList",value:function(e,t,n){var a,r=this.state[t],c=n||("desc"===r?"asc":"desc"),i=e;S.a.isEmpty(i)&&(i=this.state.funListData),this.setState((a={},Object(f.a)(a,t,c),Object(f.a)(a,"funListData",S.a.orderBy(i||[],(function(e){return Number(e[t])+1e5}),c)),a))}},{key:"setTimer",value:function(){var e=this;this.timer=setTimeout((function(){Z.a.start(),e.getFundListData(),Z.a.done()}),5e3)}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.getFundListData()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"changeShowHave",value:function(){this.setState({onlyShowHave:!this.state.onlyShowHave})}},{key:"changeShowDetail",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"printAll",value:function(){var e=this.state.fundData,t=e.CCZCB,n=e.YGZSZ;window.consoleInfo(),window.alert("\u6301\u4ed3\u603b\u6210\u672c\uff1a".concat(t,"<br/>\u9884\u4f30\u603b\u5e02\u503c\uff1a").concat(n))}},{key:"swtichNumber",value:function(){this.setState({showRate:!this.state.showRate})}},{key:"render",value:function(){var e=this.state,t=e.funListData,n=void 0===t?[]:t,a=e.fundData,c=void 0===a?{}:a,i=e.refreshTime,s=e.onlyShowHave,o=e.updateFlag,l=e.showDetail,u=e.showRate,m=c.CCZCB,C=c.CCZSY,d=c.YGZSZ,f=c.ZRQRZSY,h=c.JRQRZSY,p=c.JRGSZSY,F=Object.keys(w).length,v=M(C/m*100,2);return r.a.createElement("div",{className:"fund-container"},r.a.createElement("button",{className:"total-all",onClick:this.printAll.bind(this)},"\u603b\u8ba1"),r.a.createElement("button",{className:"total-all swtich-number",onClick:this.swtichNumber.bind(this)},"\u603b\u8ba1"),r.a.createElement("p",{className:"update-time"},"\u66f4\u65b0\u65f6\u95f4\uff1a",i),r.a.createElement("p",null,"\u6301\u4ed3\u6570\u91cf\uff1a",F),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca\uff1a",u?"".concat(v,"%"):C),r.a.createElement("p",null,"\u6628\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",x(f,u,d)),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",x(h,u,d),function(e){var t=["\u66f4\u65b0\u4e2d","\u66f4\u65b0\u5b8c\u6210"];return t[e]?r.a.createElement("span",{className:"red"},"(",t[e],")"):""}(o)),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",x(p,u,d)),r.a.createElement("div",{className:"operation-container"},r.a.createElement("button",{onClick:this.changeShowDetail.bind(this)},l?"\u9690\u85cf":"\u663e\u793a","\u8be6\u60c5"),r.a.createElement("button",{onClick:this.changeShowHave.bind(this)},s?"\u663e\u793a":"\u9690\u85cf","\u672a\u6301\u6709")),l&&r.a.createElement(G,{funds:n,onlyShowHave:s,showRate:u,updateFlag:o,sortList:this.sortList.bind(this)}))}}]),n}(r.a.Component),I=(n(164),n(96));function V(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.keepFundList,n=e.lostFundList,a=e.newFundList;return[].concat(Object(D.a)(t),Object(D.a)(n),Object(D.a)(a)).map((function(e){return e.code})).join(",")}var W=function(e,t){var n=function(e,t){return e.find((function(e){return e.FCODE===t}))}(e,t)||{};return r.a.createElement("td",{key:"GSSL"},B(n.GSZZL,"%"))},U=function(e,t,n){return e.map((function(e){return r.a.createElement("td",{key:t[e]},t[e])})).concat([W(n,t.code)])},z=Y()().format("YYYY-MM-DD HH:mm:ss"),$=function(e){Object(m.a)(n,e);var t=Object(C.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={fundVsData:{},fundList:[]},a}return Object(u.a)(n,[{key:"getFundListData",value:function(){var e=Object(v.a)(p.a.mark((function e(t){var n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=V(t),e.next=3,g(n);case 3:a=e.sent,r=A(a.Datas,z),this.setState({fundList:r.list});case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this,t=this.props.match.params.date,n=void 0===t?"index":t;O()({url:"/data/quantify/compare/".concat(n,".json"),responseType:"json"}).then((function(t){200===t.status?(e.setState({fundVsData:t.data}),e.getFundListData(t.data)):I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef")})).catch((function(e){I.a.fail("\u83b7\u53d6\u6570\u636e\u9519\u8bef")}))}},{key:"render",value:function(){var e=this.state,t=e.fundList,n=e.fundVsData,a=n.date,c=n.keys,i=n.headers,s=n.keepFundList,o=n.lostFundList,l=n.newFundList;return Object(E.isEmpty)(n)?r.a.createElement("div",null,"loading..."):r.a.createElement("div",{className:"quantify-container"},r.a.createElement("p",null,"\u672c\u671f\u699c\u5355\u66f4\u65b0(",a,")\uff1a"),r.a.createElement("br",null),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,i.map((function(e){return r.a.createElement("td",{key:e.key},e.name)})),r.a.createElement("td",{key:"GSSL"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca\u7387"))),r.a.createElement("tbody",null,r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:c.length},"\u672c\u671f\u5728\u699c\u57fa\u91d1")),s.map((function(e){return r.a.createElement("tr",{key:e.code},U(c,e,t))})),r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:c.length},"\u843d\u699c\u57fa\u91d1")),o.map((function(e){return r.a.createElement("tr",{key:e.code},U(c,e,t))})),r.a.createElement("tr",{className:"fund-list-title"},r.a.createElement("td",{colSpan:c.length},"\u4e0a\u699c\u57fa\u91d1")),l.map((function(e){return r.a.createElement("tr",{key:e.code},U(c,e,t))})))))}}]),n}(r.a.Component),K=[{name:"\u9996\u9875",path:"/",component:d},{name:"\u6301\u4ed3",path:"/fund",component:q},{name:"\u91cf\u5316\u7b56\u7565",path:"/quantify",component:$,exact:!0,children:[{name:"\u91cf\u5316\u7b56\u7565\u5f80\u671f\u6392\u884c",path:"/quantify/rank/:date",component:$}]},{name:"\u81ea\u9009",path:"/mark",component:function(e){Object(m.a)(n,e);var t=Object(C.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,"\u81ea\u9009")}}]),n}(r.a.Component)}],X=[];!function e(t){t.forEach((function(t){X.push(t),t.children&&e(t.children)}))}(K);var _=function(){return r.a.createElement("div",{className:"container"},r.a.createElement(s.a,null,X.map((function(e){return r.a.createElement(o.a,{path:e.path,component:e.component,key:e.path,exact:e.exact})}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[126,1,2]]]);
//# sourceMappingURL=main.ef9bb678.chunk.js.map