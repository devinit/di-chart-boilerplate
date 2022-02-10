(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){"use strict";n.r(e);n(9);var a=n(5),r=n(1),o=function(){function t(){this.id=Math.random(),this.state={},this.listeners=[],Object(r.d)(this,{state:r.e,setState:r.a,getState:r.c})}var e=t.prototype;return e.setState=function(t,e){void 0===e&&(e=!0),this.state=e?Object.assign({},this.state,t):t},e.addListener=function(t){return this.listeners=this.listeners.concat(Object(r.b)(t)),this.listeners.length-1},e.removeListener=function(t){t<this.listeners.length&&this.listeners[t]&&(this.listeners[t](),this.listeners[t]=null)},e.resetListeners=function(){this.listeners=[]},Object(a.a)(t,[{key:"getState",get:function(){return this.state}}]),t}();window.DIState=new o;var i=n(0),c=n.n(i),u=n(2),l=function(t){return c.a.createElement("div",{className:"table-styled"},c.a.createElement("table",null,t.children))},s=function(t){var e=function(t,e){return void 0===e&&(e=!1),t.map((function(t,n){return c.a.createElement("tr",{key:n},t.map((function(t,n){return e?c.a.createElement("th",{key:n},t):c.a.createElement("td",{key:n},t)})))}))};return c.a.createElement(l,null,c.a.createElement("thead",null,e(t.rows.filter((function(t,e){return 0===e})),!0)),c.a.createElement("tbody",null,e(t.rows.filter((function(t,e){return e>0})))))},d="U.S. Agency for International Development",f="Reporting Organisation Narrative",p=["Reproductive health care","Family planning"],m=[2019,2021],h=n(6);function w(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0;return function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var y=function(t,e){void 0===e&&(e="");var n=Number(Number(t).toFixed(2));return isNaN(n)?e:n},g=function(t){return new Promise((function(e){Object(h.parse)(t,{download:!0,header:!0,complete:function(t){var n=t.data;return e(n)}})}))},b=function(t,e,n){return t.filter((function(t){return t[n]===e}))},S=function(t,e,n){return t.filter((function(t){return e.includes(t[n])}))},I=function(t){for(var e,n=t[1]-t[0]+1,a=[],r=w(Array(n).keys());!(e=r()).done;){var o=e.value;a.push(o)}return a.map((function(e){return t[0]+e}))};function E(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return D(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return D(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0;return function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=t[Symbol.iterator]()).next.bind(n)}function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var L=function(t){window.DICharts.handler.addChart({className:t,d3:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading(),window.DIState?window.DIState.addListener((function(){e.showLoading();var n=window.DIState.getState,a=n.country,r=n.dataOne;if(a&&r){var o=S(b(r,a||d,f),p,"purpose_name");!function(t,e,n){for(var a,r=[],o=E(Array(m[1]-m[0]+1).keys());!(a=o()).done;){var c=a.value;r.push(c)}var l=["Purpose code"].concat(r.map((function(t){return m[0]+t}))),d=[l].concat(p.map((function(t){var n=S(e,[t],"purpose_name");return l.reduce((function(e,a,r){if(0===r)return e.concat(t);var o=n.filter((function(t){return t.year===""+a})).reduce((function(t,e){return t+Number(e.x_transaction_value_usd_m_Sum)}),0);return e.concat(Math.round(o))}),[])})));Object(u.render)(Object(i.createElement)(s,{country:n,rows:d}),t)}(t,o,a||d),e.hideLoading(),t.parentElement.classList.add("auto-height")}})):console.log("State is not defined")}))}}})},A=function(t){var e,n=document.createElement("div");return(e=n.classList).add.apply(e,["spotlight-banner","data-selector--wrapper"]),t.parentElement.insertBefore(n,t),n},O=function(t,e){var n=document.createElement("option");n.value="string"==typeof e?e:e.value,n.text="string"==typeof e?e:e.label,t.appendChild(n)},C=function(t){var e,n=t.wrapper,a=t.options,r=t.defaultOption,o=t.allItemsLabel,i=t.className,c=t.label,u=document.createElement("select");if((e=u.classList).add.apply(e,["data-selector","js-plotly-chart-data-selector",i]),o&&O(u,{label:o,value:"*"}),a.forEach((function(t){return O(u,t)})),u.classList.add("data-selector--active"),r&&(u.value=r),c){var l=document.createElement("label");l.innerHTML=c;var s=document.createElement("div");s.classList.add("labelled-data-selector--wrapper"),s.appendChild(l),s.appendChild(u),n.appendChild(s)}else n.appendChild(u);return u},x=function(t){window.DICharts.handler.addChart({className:t,d3:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading();var n=[],a=A(t);window.DIState?window.DIState.addListener((function(){e.showLoading();var r=window.DIState.getState.dataOne;if(r&&r.length&&!n.length){n=r.reduce((function(t,e){var n=e[f];return t.includes(n)?t:t.concat(n)}),[]).map((function(t){return{label:t,value:t}}));var o=C({wrapper:a,options:n,defaultOption:d,className:"country-filter",label:"Select Donor"});window.DIState&&window.DIState.setState({country:"U.S. Agency for International Development"}),o.addEventListener("change",(function(t){var e=t.currentTarget.value;window.DIState&&window.DIState.setState({country:e})}))}e.hideLoading(),t.parentElement.classList.add("auto-height")})):console.log("State is not defined")}))}}})},j=n(7),N=n.n(j),_={legend:{top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{trigger:"axis",textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{showTitle:!1,feature:{saveAsImage:{title:"Save as image",pixelRatio:2}},right:20,tooltip:{show:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif",formatter:function(t){return"<div>"+t.title+"</div>"}}}},color:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},grid:{top:10}},k=function(t,e){var n,a=Object(r.f)(t).filter((function(t){return t.purpose_name===e&&t.year>=2019&&t.year<=2021})).map((function(t){return{year:t.year,value:t.x_transaction_value_usd_m_Sum}}));return n={},a.forEach((function(t){n[t.year]?n[t.year]=Object.assign({},n[t.year],{value:(parseFloat(t.value?t.value:0)+parseFloat(n[t.year].value?n[t.year].value:0)).toFixed(3)}):n[t.year]=t})),Object.values(n).map((function(t){return t.value}))},F=function(t,e){return p.map((function(e){return{name:e,type:"bar",stack:"oda",data:k(t,e)}})).map((function(t,e,n){return e===n.length-1?Object.assign({},t,{label:{normal:{show:!0,position:"top",formatter:function(t){var e=n.reduce((function(e,n){var a=n.data[t.dataIndex];return e+parseFloat(a||0)}),0);return y(e)},color:"#000000"}}}):t}))},R=function(t){window.DICharts.handler.addChart({className:t,echarts:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading(),window.DIState?window.DIState.addListener((function(){e.showLoading();var n=window.DIState.getState,a=n.country,r=n.dataOne;if(a&&r){var o=S(b(r,a||"U.S. Agency for International Development",f),p,"purpose_name");!function(t,e){var n=window.echarts.init(t),a=I(m),r={legend:{show:!0,selectedMode:!1},xAxis:{type:"category",data:a},yAxis:{type:"value",name:"USD$ millions (constant 2019 prices)",nameLocation:"middle",nameGap:50},grid:{top:60},series:F(e)};n.setOption(N()(_,r))}(t,o),e.hideLoading()}})):(console.log("State is not defined"),e.hideLoading())}))}}})},T=function(t){var e=function(t,e){return void 0===e&&(e=!1),t.map((function(n,a){return c.a.createElement("tr",{key:a},n.map((function(n,r){return e?c.a.createElement("th",{key:r},n):a===t.length-1&&0===r?c.a.createElement("td",{colSpan:2,key:r},n):c.a.createElement("td",{key:r},n)})))}))};return c.a.createElement(l,null,c.a.createElement("thead",null,e(t.rows.filter((function(t,e){return 0===e})),!0)),c.a.createElement("tbody",null,e(t.rows.filter((function(t,e){return e>0})))))},G=[2019,2021],M=function(t,e,n,a){var r=I(G),o=["Rank","Recipient"].concat(r),c=t.filter((function(t){return n===t["Code type"]})),l=function(t){for(var e=[].concat(t),n=[],a=0;a<10;a++)if(e.length>=1){var r=e.reduce((function(t,e){return Number(t[""+G[1]])<Number(e[""+G[1]])?e:t}));n.push(r);var o=e.indexOf(r);e.splice(o,1)}return{sortedData:n,unsortedData:e}}(b(c,e,"Reporting Organisation Narrative")),s=l.sortedData,d=function(t,e){var n=[];return e.forEach((function(e){var a=t.map((function(t){return Number(t[e])||0})).reduce((function(t,e){return t+e}),0);n.push(y(a))})),n}(l.unsortedData,r),f=[o].concat(function(t,e){for(var n=[],a=function(a){if(t.length>=1){var r=a+1;n.push([r,t[a].recipient_name].concat(e.map((function(e){return t[a][""+e]?y(t[a][""+e]):""}))))}},r=0;r<10;r++)a(r);return n}(s,r)).concat([["All other recipients (sum)"].concat(d)]);Object(u.render)(Object(i.createElement)(T,{rows:f}),a)},U=function(t){window.DICharts.handler.addChart({className:t,echarts:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading();var n,a=A(t);window.DIState?window.DIState.addListener((function(){e.showLoading();var r=window.DIState.getState,o=r.country,i=r.dataTwo,c=r.purpose;o&&i&&(n||(n=C({wrapper:a,options:i.reduce((function(t,e){var n=e["Code type"];return t.includes(n)?t:t.concat(n)}),[]).filter((function(t){return!!t})).map((function(t){return{label:t,value:t}})),defaultOption:p[0],className:"purpose-code-filter",label:"Select Purpose Code"}),window.DIState.setState({purpose:p[0]}),n.addEventListener("change",(function(t){window.DIState.setState({purpose:t.target.value})}))),M(i,o,c,t),e.hideLoading())})):(console.log("State is not defined"),e.hideLoading())}))}}})};window.addEventListener("load",(function(){window.DIState?(window.DIState.setState({country:d}),g("https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v1.csv").then((function(t){window.DIState.setState({dataOne:t})})),g("https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v2.csv").then((function(t){window.DIState.setState({dataTwo:t})}))):console.log("State is not defined"),x("dicharts--iati-root"),L("dicharts--iati-table-one-root"),R("dicharts--iati-chart-one-root"),U("dicharts--iati-table-two-root")}))},8:function(t,e,n){t.exports=n(15)},9:function(t,e,n){}},[[8,1,2]]]);