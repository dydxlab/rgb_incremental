(this.webpackJsonprgb_incremental=this.webpackJsonprgb_incremental||[]).push([[0],{129:function(e,r,n){},139:function(e,r){},141:function(e,r){},151:function(e,r){},153:function(e,r){},180:function(e,r){},182:function(e,r){},183:function(e,r){},188:function(e,r){},190:function(e,r){},196:function(e,r){},198:function(e,r){},217:function(e,r){},229:function(e,r){},232:function(e,r){},237:function(e,r,n){},239:function(e,r,n){"use strict";n.r(r);var t=n(0),a=n.n(t),o=n(38),i=n.n(o),c=(n(129),n(31)),u=function(){return Object(c.b)()},s=c.c,l=n(13),d=n(6),b={steps:[{options:[{title:"Puzzle",action:"Solve it - 19B"},{title:"Battle",action:"Fight him - 340R"}],active:!0},{options:[{title:"Jungle",action:"Swing from vine to vine - 50120G"},{title:"Desert",action:"Brave the wastes - 290B 800R 19439G"}],active:!0},{options:[{title:"Lions",action:"Wrestle them to the ground - 19478G"},{title:"Bears",action:"Punch them in the face - 8905R"}],active:!0}]},m=Object(l.c)({name:"cyoaState",initialState:b,reducers:{step:function(e,r){var n=e.steps.find((function(e){return e.active})),t=Object(d.a)(n);n&&t&&(t.options.find((function(e){return e==r.payload.choice}))&&(n.active=!1))}}}),f=m.actions.step,g=function(e){var r;return(null===(r=e.cyoaState.steps.find((function(e){return e.active})))||void 0===r?void 0:r.options)||[]},P=m.reducer,j=n(7),p=n.n(j),h=n(1),v=function(){var e=s(g),r=u();return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Quest"}),Object(h.jsx)("div",{className:p.a.row,children:e&&e.map((function(e){return Object(h.jsxs)("div",{children:[Object(h.jsxs)("p",{children:[e.title," "]}),Object(h.jsx)("button",{className:p.a.button,onClick:function(){return r(f({choice:e}))},children:e.action})]})}))})]})},A=n(124),x=n(32),y=n(69);function S(e){var r=0;return e.linearP1&&(r+=e.linearP1),r}function U(e){var r=0;return e.normalP1>0&&e.normalP2>0&&(r+=Math.max(0,y.rnorm(1,e.normalP1,e.normalP2))),r}var w={resources:{red:0,green:2e3,blue:3},items:function(){var e=[{green:0,red:0,blue:1},{green:0,red:19,blue:0},{green:42,red:0,blue:0},{green:66,red:0,blue:0},{green:20,red:20,blue:0},{green:7,red:2,blue:0}],r=[{green:98,red:0,blue:0},{green:117,red:0,blue:0},{green:193,red:0,blue:0},{green:338,red:0,blue:0},{green:680,red:0,blue:0},{green:1033,red:0,blue:0}];e=function(e){for(var r=e.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),t=[e[n],e[r]];e[r]=t[0],e[n]=t[1]}return e}(e);var n=[];for(var t in r)n.push([r[t],e[t]]);return n}(),redFnParams:{linearP1:1},greenFnParams:{linearP1:2,quadraticP1:0,twoPowerP1:0},blueFnParams:{normalP1:0,normalP2:0},blueDist:[0,0,0,0],bluePast:Object(x.a)(Array(40).keys()).map((function(e){return 0})),greenDist:Object(x.a)(Array(40).keys()).map((function(e){return 0})),redDist:Object(x.a)(Array(40).keys()).map((function(e){return 0})),loopStarted:!1,greenUpgrades:[[{green:13,red:0,blue:0},!1,{linearP1:.3,quadraticP1:0,twoPowerP1:0}],[{green:29,red:0,blue:0},!1,{linearP1:.3,quadraticP1:0,twoPowerP1:0}],[{green:105,red:0,blue:0},!1,{linearP1:4,quadraticP1:0,twoPowerP1:0}],[{green:82,red:0,blue:0},!1,{linearP1:.3,quadraticP1:1,twoPowerP1:0}],[{green:379,red:0,blue:0},!1,{linearP1:0,quadraticP1:3,twoPowerP1:0}],[{green:1800,red:0,blue:7},!1,{linearP1:.3,quadraticP1:1,twoPowerP1:10}],[{green:5e5,red:100,blue:0},!1,{linearP1:.3,quadraticP1:1,twoPowerP1:2}],[{green:1e9,red:0,blue:0},!1,{linearP1:.3,quadraticP1:1,twoPowerP1:10}]],redUpgrades:[[{green:13,red:0,blue:0},!1,{linearP1:.3}],[{green:37,red:0,blue:1},!1,{linearP1:.3}],[{green:105,red:0,blue:3},!1,{linearP1:4}],[{green:10,red:0,blue:0},!1,{linearP1:.3}],[{green:7e3,red:0,blue:0},!1,{linearP1:8}],[{green:61589,red:0,blue:55},!1,{linearP1:22}]],blueUpgrades:[[{green:9,red:45,blue:0},!1,{normalP1:2e-4,normalP2:1e-4}],[{green:499,red:0,blue:2},!1,{normalP1:0,normalP2:.5}],[{green:0,red:389,blue:21},!1,{normalP1:2,normalP2:0}],[{green:0,red:0,blue:131},!1,{normalP1:0,normalP2:10}],[{green:0,red:0,blue:305},!1,{normalP1:0,normalP2:10}]]};function O(e,r){for(var n in e)if(e[n]>r[n])return!1;return!0}function X(e,r){for(var n in e)r[n]-=e[n];return r}var B=Object(l.c)({name:"gameState",initialState:w,reducers:{startLoop:function(e){e.loopStarted=!0},incrementRed:function(e){e.resources.red+=S(e.redFnParams),e.redDist.push(S(e.redFnParams)),e.redDist.shift()},incrementBlue:function(e){e.resources.blue+=U(e.blueFnParams),e.blueDist=Object(x.a)(Array(1e3).keys()).map((function(r){return Math.round(U(e.blueFnParams))})),e.bluePast.push(e.resources.blue),e.bluePast.shift()},incrementGreen:function(e){e.resources.green+=function(e){var r=0;return e.linearP1&&(r+=e.linearP1),e.quadraticP1&&(r+=e.quadraticP1*e.quadraticP1),e.twoPowerP1&&(r+=Math.pow(2,e.twoPowerP1)),r}(e.greenFnParams),e.greenDist.push(e.resources.green),e.greenDist.shift()},buyItem:function(e,r){if(r.payload.item){var n=e.items[0],t=Object(d.a)(n);if(!n||!t||r.payload.item!==t)return;if(!O(t[0],e.resources))return;e.resources=X(t[0],e.resources),e.resources=function(e,r){for(var n in e)r[n]+=e[n];return r}(t[1],e.resources),e.items.shift()}},upgrade:function(e,r){if(r.payload.green){var n=e.greenUpgrades.find((function(e){return!e[1]})),t=Object(d.a)(n);if(!n||!t||r.payload.green!==t)return;if(!O(t[0],e.resources))return;e.resources=X(t[0],e.resources),e.greenFnParams=function(e,r){for(var n in e)e[n]=e[n]+r[n];return e}(e.greenFnParams,t[2]),n[1]=!0}if(r.payload.red){var a=e.redUpgrades.find((function(e){return!e[1]})),o=Object(d.a)(a);if(!a||!o||r.payload.red!==o)return;if(!O(o[0],e.resources))return;e.resources=X(o[0],e.resources),e.redFnParams=function(e,r){for(var n in e)e[n]=e[n]+r[n];return e}(e.redFnParams,o[2]),a[1]=!0}if(r.payload.blue){var i=e.blueUpgrades.find((function(e){return!e[1]})),c=Object(d.a)(i);if(!i||!c||r.payload.blue!==c)return;if(!O(c[0],e.resources))return;e.resources=X(c[0],e.resources),e.blueFnParams=function(e,r){for(var n in e)e[n]=e[n]+r[n];return e}(e.blueFnParams,c[2]),i[1]=!0}}}}),q=B.actions,D=q.incrementRed,F=q.startLoop,J=q.incrementGreen,Y=q.incrementBlue,C=q.buyItem,G=q.upgrade,N=function(e){return e.gameState.resources.red},W=function(e){return e.gameState.resources.blue},z=function(e){return e.gameState.resources.green},R=function(e){return e.gameState.loopStarted},V=function(e){return e.gameState.blueDist},Q=function(e){return e.gameState.bluePast},I=function(e){return e.gameState.greenDist},K=function(e){return e.gameState.redDist},E=function(e){return e.gameState.greenUpgrades.find((function(e){return!e[1]}))},M=function(e){return e.gameState.redUpgrades.find((function(e){return!e[1]}))},Z=function(e){return e.gameState.blueUpgrades.find((function(e){return!e[1]}))},k=function(e){return e.gameState.items[0]},T=B.reducer,H=n(40),L=n.n(H),_=n(69);for(var $=[],ee=[],re=0;re<2e4;re++)$[re]=_.rbeta(1,.5,.5)[0],ee[re]=_.rbeta(1,.5,.5)[0];var ne=function(){var e=s(N),r=s(K),n=s(z),a=s(I),o=s(W),i=s(V),c=s(Q),l=s(R),d=u(),b=Object(t.useState)("2"),m=Object(A.a)(b,2);m[0],m[1];return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:p.a.row,children:[Object(h.jsx)("span",{className:p.a.value,style:{color:"red"},children:e.toFixed(1)}),Object(h.jsx)("span",{className:p.a.value,style:{color:"limegreen"},children:n.toFixed(1)}),Object(h.jsx)("span",{className:p.a.value,style:{color:"steelblue"},children:o.toFixed(1)})]}),Object(h.jsxs)("div",{className:p.a.row,children:[Object(h.jsx)(L.a,{data:[{type:"scatter",y:r,marker:{color:"red"}}],layout:{width:160,height:120,margin:{l:30,r:20,b:20,t:20,pad:4}},config:{displayModeBar:!1}}),Object(h.jsx)(L.a,{data:[{type:"scatter",y:a,marker:{color:"limegreen"}}],layout:{width:160,height:120,margin:{l:30,r:20,b:20,t:20,pad:4}},config:{displayModeBar:!1}}),Object(h.jsx)(L.a,{data:[{type:"histogram",orientation:"h",y:i,xaxis:"x2",yaxis:"y2"},{type:"scatter",y:c,marker:{color:"steelblue"}}],layout:{width:160,height:120,margin:{l:40,r:20,b:20,t:20,pad:4},showlegend:!1,xaxis:{domain:[0,.7],zeroline:!1},yaxis:{zeroline:!1},xaxis2:{domain:[.8,1],showticklabels:!1},yaxis2:{anchor:"x2",range:[0,10],showticklabels:!1}},config:{displayModeBar:!1}})]}),!l&&Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:p.a.button,"aria-label":"start",onClick:function(){l||(d(F()),setInterval((function(){return d(D())}),1e3),setInterval((function(){return d(J())}),1e3),setInterval((function(){return d(Y())}),1e3))},children:"Start"})})]})};function te(e){return Object(h.jsxs)("span",{children:[e.green>0&&Object(h.jsxs)("span",{children:[e.green,Object(h.jsx)("span",{style:{color:"limegreen"},children:"G  "})]}),e.blue>0&&Object(h.jsxs)("span",{children:[e.blue,Object(h.jsx)("span",{style:{color:"blue"},children:"B  "})]}),e.red>0&&Object(h.jsxs)("span",{children:[e.red,Object(h.jsx)("span",{style:{color:"red"},children:"R  "})]})]})}var ae=function(){var e=s(E),r=s(M),n=s(Z),t=s(k),a=u();return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:p.a.row,children:[r&&Object(h.jsxs)("button",{className:p.a.button,onClick:function(){return a(G({red:r}))},children:["Red Upgrade - ",te(null===r||void 0===r?void 0:r[0])]}),e&&Object(h.jsxs)("button",{className:p.a.button,onClick:function(){return a(G({green:e}))},children:["Green Upgrade - ",te(null===e||void 0===e?void 0:e[0])]}),n&&Object(h.jsxs)("button",{className:p.a.button,onClick:function(){return a(G({blue:n}))},children:["Blue Upgrade - ",te(null===n||void 0===n?void 0:n[0])]})]}),Object(h.jsx)("div",{className:p.a.row,children:t&&Object(h.jsxs)("button",{className:p.a.button,onClick:function(){return a(C({item:t}))},children:["Item - ",te(t[0])]})})]})};n(237);var oe=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsxs)("header",{className:"App-header",children:[Object(h.jsx)("img",{src:"data:image/png;base64,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",className:"App-logo",alt:"logo"}),Object(h.jsx)(v,{}),Object(h.jsx)(ne,{}),Object(h.jsx)(ae,{})]})})},ie=n(67),ce=n.n(ie),ue=n(123);function se(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(r){return setTimeout((function(){return r({data:e})}),500)}))}var le=Object(l.b)("counter/fetchCount",function(){var e=Object(ue.a)(ce.a.mark((function e(r){var n;return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,se(r);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()),de=Object(l.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,r){e.value+=r.payload}},extraReducers:function(e){e.addCase(le.pending,(function(e){e.status="loading"})).addCase(le.fulfilled,(function(e,r){e.status="idle",e.value+=r.payload}))}}),be=de.actions,me=(be.increment,be.decrement,be.incrementByAmount,de.reducer),fe=Object(l.a)({reducer:{counter:me,gameState:T,cyoaState:P}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(c.a,{store:fe,children:Object(h.jsx)(oe,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,r,n){e.exports={row:"Counter_row__3dHJ0",value:"Counter_value__9lNV0",button:"Counter_button__QVSYQ",textbox:"Counter_textbox__13BFQ",asyncButton:"Counter_asyncButton__3yoXe Counter_button__QVSYQ","modebar-container":"Counter_modebar-container__24Lzs"}}},[[239,1,2]]]);
//# sourceMappingURL=main.6e0a1001.chunk.js.map