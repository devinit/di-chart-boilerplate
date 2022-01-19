(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){"use strict";n.r(e);n(7);var a=n(3),r=n(1),i=function(){function t(){this.id=Math.random(),this.state={},this.listeners=[],Object(r.d)(this,{state:r.e,setState:r.a,getState:r.c})}var e=t.prototype;return e.setState=function(t,e){void 0===e&&(e=!0),this.state=e?Object.assign({},this.state,t):t},e.addListener=function(t){return this.listeners=this.listeners.concat(Object(r.b)(t)),this.listeners.length-1},e.removeListener=function(t){t<this.listeners.length&&this.listeners[t]&&(this.listeners[t](),this.listeners[t]=null)},e.resetListeners=function(){this.listeners=[]},Object(a.a)(t,[{key:"getState",get:function(){return this.state}}]),t}();window.DIState=new i;var o=n(0),s=n.n(o),c=n(4),d=function(t){return s.a.createElement("div",{className:"table-styled"},s.a.createElement("table",null,t.children))},u=function(t){var e=function(t,e){return void 0===e&&(e=!1),t.map((function(t,n){return s.a.createElement("tr",{key:n},t.map((function(t,n){return e?s.a.createElement("th",{key:n},t):s.a.createElement("td",{key:n},t)})))}))};return s.a.createElement(d,null,s.a.createElement("thead",null,e(t.rows.filter((function(t,e){return 0===e})),!0)),s.a.createElement("tbody",null,e(t.rows.filter((function(t,e){return e>0})))))},l=["Reproductive health care","Family planning"],f=[2010,2019],p=function(t,e,n){return t.filter((function(t){return t[n]===e}))},h=function(t,e,n){return t.filter((function(t){return e.includes(t[n])}))},w=function(t){return new Promise((function(e){window.d3.csv(t,(function(t){return e(t)}))}))},m=function(t,e,n){var a=["Purpose code"].concat([].concat(Array(f[1]-f[0]+1).keys()).map((function(t){return f[0]+t}))),r=[a].concat(l.map((function(t){var n=h(e,[t],"purpose_name");return a.reduce((function(e,a,r){if(0===r)return e.concat(t);var i=n.filter((function(t){return t.year===""+a})).reduce((function(t,e){return t+Number(e.usd_disbursement_deflated)}),0);return e.concat(Math.round(i))}),[])})));Object(c.render)(Object(o.createElement)(u,{country:n,rows:r}),t)},v=function(t){window.DICharts.handler.addChart({className:t,d3:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading();w("https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH-and-FP-CRS-Data-2019.csv").then((function(n){if(window.DIState)window.DIState.addListener((function(){var e=window.DIState.getState.country,a=h(p(n,e||"United States","donor_name"),l,"purpose_name");m(t,a,e||"United States")}));else{var a=h(p(n,"United States","donor_name"),l,"purpose_name");m(t,a,"United States")}e.hideLoading()}))}))}}})},b=function(t,e){var n=document.createElement("option");n.value="string"==typeof e?e:e.value,n.text="string"==typeof e?e:e.label,t.appendChild(n)},y=function(t){window.DICharts.handler.addChart({className:t,d3:{onAdd:function(t){Array.prototype.forEach.call(t,(function(t){var e=new window.DICharts.Chart(t.parentElement);e.showLoading();w("https://raw.githubusercontent.com/devinit/di-website-data/main/2022/rh-and-fp-dropdowns.csv").then((function(n){var a=function(t){var e,n=t.wrapper,a=t.options,r=t.defaultOption,i=t.allItemsLabel,o=t.className,s=t.label,c=document.createElement("select");if((e=c.classList).add.apply(e,["data-selector","js-plotly-chart-data-selector",o]),i&&b(c,{label:i,value:"*"}),a.forEach((function(t){return b(c,t)})),c.classList.add("data-selector--active"),r&&(c.value=r),s){var d=document.createElement("label");d.innerHTML=s;var u=document.createElement("div");u.classList.add("labelled-data-selector--wrapper"),u.appendChild(d),u.appendChild(c),n.appendChild(u)}else n.appendChild(c);return c}({wrapper:function(t){var e,n=document.createElement("div");return(e=n.classList).add.apply(e,["spotlight-banner","data-selector--wrapper"]),t.parentElement.insertBefore(n,t),n}(t),options:n.map((function(t){return t.Donors})),defaultOption:"United States",className:"country-filter",label:"Select Donor"});window.DIState&&window.DIState.setState({country:"United States"}),a.addEventListener("change",(function(t){var e=t.currentTarget.value;window.DIState&&window.DIState.setState({country:e})})),e.hideLoading()}))}))}}})};window.addEventListener("load",(function(){y("dicharts--oda-root"),v("dicharts--table-one-root")}))},6:function(t,e,n){t.exports=n(13)},7:function(t,e,n){}},[[6,1,2]]]);