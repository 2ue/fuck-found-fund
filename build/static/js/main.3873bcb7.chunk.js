(this["webpackJsonpfuck-found-fund"]=this["webpackJsonpfuck-found-fund"]||[]).push([[0],{37:function(e,t,a){e.exports=a(72)},42:function(e,t,a){},69:function(e,t){},70:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(30),c=a.n(i),o=(a(42),a(11)),s=a(17),l=a.n(s),u=a(35),C=a(31),m=a(32),F=a(33),f=a(36),d=a(34),h=a(14),p=a.n(h),v=a(12),E=a.n(v),S=a(18),Y=a.n(S),R=a(75),D=a(5),J=a(16),Z=a.n(J);Z.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),Z.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var T=Z.a,M=["001679","320007","001102","001071","005963","161028","005827","161005","519712","008086","519674","000478","004069","001552","009329","003095","002510","519727","002656","007300","161725","001694","163406","001156"],O={"000478":{FCCFE:2359.5,FCCCBDJ:2.2977,PLATFORM:"JD"},"001679":{FCCFE:6783.15,FCCCBDJ:1.8281,PLATFORM:"JD"},161028:{FCCFE:8654.75,FCCCBDJ:.4439,PLATFORM:"TTJJ"},"001102":{FCCFE:4023.65,FCCCBDJ:3.237,PLATFORM:"TTJJ"},"001156":{FCCFE:5813.26,FCCCBDJ:2.6138,PLATFORM:"TTJJ"},"005969":{FCCFE:2067.01,FCCCBDJ:3.3484,PLATFORM:"TTJJ"},"005827":{FCCFE:3610.28,FCCCBDJ:2.4489,PLATFORM:"TTJJ"},161005:{FCCFE:2191.41,FCCCBDJ:3.3288,PLATFORM:"TTJJ"},161725:{FCCFE:7444.18,FCCCBDJ:1.2439,PLATFORM:"MYCF"},163406:{FCCFE:4888.18,FCCCBDJ:2.0473,PLATFORM:"MYCF"},"002510":{FCCFE:9234.87,FCCCBDJ:1.5593,PLATFORM:"MYCF"},"003095":{FCCFE:2937.07,FCCCBDJ:3.1016,PLATFORM:"MYCF"},"002656":{FCCFE:7870.36,FCCCBDJ:1.3173,PLATFORM:"MYCF"},"004069":{FCCFE:10968.37,FCCCBDJ:1.2459,PLATFORM:"MYCF"},"008086":{FCCFE:12340.87,FCCCBDJ:1.2414,PLATFORM:"MYCF"},"007300":{FCCFE:4890.16,FCCCBDJ:2.1574,PLATFORM:"MYCF"},"009329":{FCCFE:8889.8,FCCCBDJ:1.3836,PLATFORM:"MYCF"},519727:{FCCFE:3120.58,FCCCBDJ:2.2168,PLATFORM:"MYCF"}},b=p.a.uniq([].concat(Object(D.a)(Object.keys(O)),Object(D.a)(M)));function w(e){return T(Object(o.a)(Object(o.a)({},e),{},{baseURL:"https://fundmobapi.eastmoney.com/"})).then((function(e){var t=e.data;if(200===e.status)return t}))}function N(e,t){return e>0?r.a.createElement("span",{className:"income-rate positive-income"},"+",e,t):e<0?r.a.createElement("span",{className:"income-rate negative-income"},e,t):r.a.createElement("span",{className:"income-rate"},"0.00")}var g=function(e){var t=e.funds,a=e.onlyShowHave;return r.a.createElement("div",{className:"list-container"},r.a.createElement("div",{className:"list-content"},r.a.createElement("div",{className:"list-header"},r.a.createElement("p",null,r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca\u7387")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u9884\u4f30\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u4eca\u65e5\u786e\u8ba4\u6536\u76ca")," |",r.a.createElement("span",{className:"income-rate"},"\u6301\u4ed3\u6536\u76ca")," |")),t.filter((function(e){return!a||e.isHave})).map((function(e){return r.a.createElement("div",{className:"",key:e.FCODE},r.a.createElement("p",null,N(e.GSZZL,"%")," |",N(e.JRGSSY)," |",N(e.JRQRSY)," |",N(e.CCSY)," |",r.a.createElement("span",{className:"fund-name"},r.a.createElement("label",{className:"have-tag"},e.isHave?"\u6301\u6709":""),e.SHORTNAME,"(",e.FCODE,")")))}))))},y="".concat(E()().format("YYYY-MM-DD")," 9:00:01"),A="".concat(E()().format("YYYY-MM-DD")," 15:00:01"),L=function(e){window.consoleInfo=function(){console.log("\u6301\u4ed3\u603b\u6210\u672c\uff1a",e.CCZCB),console.log("\u9884\u4f30\u603b\u5e02\u503c\uff1a",e.YGZSZ)}},B=function(e){Object(f.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={showDetail:!1,onlyShowHave:!0,updateFlag:-1,refreshTime:"",fundData:[],funListData:[]},n}return Object(F.a)(a,[{key:"getFundListData",value:function(){var e=Object(C.a)(l.a.mark((function e(){var t,a,n,r,i,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=E()().format("YYYY-MM-DD HH:mm:ss"),a=E()(t).isAfter(A)||E()(y).isAfter(t),!this.timer||!a){e.next=5;break}return this.clearTimer(),e.abrupt("return");case 5:return e.next=7,w({url:"/FundMNewApi/FundMNFInfo",params:{pageIndex:1,pageSize:999,appType:"ttyy",product:"EFund",plat:"Android",deviceid:"9e16077fca2fcr78ep0ltn98",Version:1,Fcodes:void 0||b.join(",")}});case 7:n=e.sent,r=this.dealData(n.Datas,t),i=r.list,c=r.updateFlag,o=Object(u.a)(r,["list","updateFlag"]),this.setState({updateFlag:c,refreshTime:t,fundData:o,funListData:p.a.orderBy(i||[],(function(e){return Number(e.GSZZL)+1e5}),"desc")}),this.setTimer();case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"dealData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a={ZRQRZSY:0,JRQRZSY:0,JRGSZSY:0,CCZSY:0,YGZSZ:0,CCZCB:0,updateFlag:-1},n=0,r=0;return a.list=e.map((function(e){var i=O[e.FCODE],c=0,s=0,l=0,u=0,C=!1;if(i){r+=1;var m=i.FCCFE,F=i.FCCCBDJ,f=e.NAV,d=e.NAVCHGRT,h=e.GSZ,p=e.GSZZL,v=e.PDATE;C=!0,0===t.indexOf(v)&&Number(d)&&Number(f)?(n+=1,l=R.a(d*f*m/100,2)):c=R.a(d*f*m/100,2),s=R.a(h*p*m/100,2),u=R.a(f*m-F*m,2)||0,a.ZRQRZSY+=Number(c),a.JRQRZSY+=Number(l),a.JRGSZSY+=Number(s),a.CCZSY+=Number(u),a.YGZSZ=R.a(a.YGZSZ+f*m,2),a.CCZCB=R.a(a.CCZCB+m*F,2)}return Object(o.a)(Object(o.a)({},e),{},{JRGSSY:s,JRQRSY:l,CCSY:u,isHave:C})})),L(a),a.updateFlag=0===n?-1:n===r?1:0,a.ZRQRZSY=R.a(a.ZRQRZSY,2),a.JRQRZSY=R.a(a.JRQRZSY,2),a.JRGSZSY=R.a(a.JRGSZSY,2),a.CCZSY=R.a(a.CCZSY,2),a}},{key:"setTimer",value:function(){var e=this;this.timer=setTimeout((function(){Y.a.start(),e.getFundListData(),Y.a.done()}),5e3)}},{key:"clearTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"resetTimer",value:function(){this.clearTimer(),this.setTimer()}},{key:"componentDidMount",value:function(){this.getFundListData()}},{key:"componentWillUnmount",value:function(){this.clearTimer()}},{key:"changeShowHave",value:function(){this.setState({onlyShowHave:!this.state.onlyShowHave})}},{key:"changeShowDetail",value:function(){this.setState({showDetail:!this.state.showDetail})}},{key:"printAll",value:function(){var e=this.state.fundData,t=e.CCZCB,a=e.YGZSZ;window.consoleInfo(),window.alert("\u6301\u4ed3\u603b\u6210\u672c\uff1a".concat(t,"<br/>\u9884\u4f30\u603b\u5e02\u503c\uff1a").concat(a))}},{key:"render",value:function(){var e=this.state,t=e.funListData,a=void 0===t?[]:t,n=e.fundData,i=void 0===n?{}:n,c=e.refreshTime,o=e.onlyShowHave,s=e.updateFlag,l=e.showDetail,u=Object.keys(O).length;return r.a.createElement("div",null,r.a.createElement("button",{className:"total-all",onClick:this.printAll.bind(this)},"\u603b\u8ba1"),r.a.createElement("p",{className:"update-time"},"\u66f4\u65b0\u65f6\u95f4\uff1a",c),r.a.createElement("p",null,"\u6301\u4ed3\u6570\u91cf\uff1a",u),r.a.createElement("p",null,"\u6301\u4ed3\u6536\u76ca\uff1a",i.CCZSY),r.a.createElement("p",null,"\u6628\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.ZRQRZSY),r.a.createElement("p",null,"\u4eca\u65e5\u786e\u8ba4\u603b\u6536\u76ca\uff1a",i.JRQRZSY,function(e){var t=["\u66f4\u65b0\u4e2d","\u66f4\u65b0\u5b8c\u6210"];return t[e]?r.a.createElement("span",{className:"red"},"(",t[e],")"):""}(s)),r.a.createElement("p",null,"\u4eca\u65e5\u9884\u4f30\u603b\u6536\u76ca\uff1a",i.JRGSZSY),r.a.createElement("div",{className:"operation-container"},r.a.createElement("button",{onClick:this.changeShowDetail.bind(this)},l?"\u9690\u85cf":"\u663e\u793a","\u8be6\u60c5"),r.a.createElement("button",{onClick:this.changeShowHave.bind(this)},o?"\u663e\u793a":"\u9690\u85cf","\u672a\u6301\u6709")),l&&r.a.createElement(g,{funds:a,onlyShowHave:o}))}}]),a}(r.a.Component);a(70),a(71);var k=function(){return r.a.createElement("div",{className:"content"},r.a.createElement(B,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.3873bcb7.chunk.js.map