(this.webpackJsonppathfinder2=this.webpackJsonppathfinder2||[]).push([[0],{11:function(t,e,n){},13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var i=n(1),s=n.n(i),a=n(6),o=n.n(a),r=(n(11),n(2)),c=n(0);function h(t){var e=t.choices,n=t.defaultChoice,s=t.handleChange,a=t.id,o=t.question,h=Object(i.useState)(n),u=Object(r.a)(h,2),l=u[0],d=u[1],f=Object(i.useState)(!1),g=Object(r.a)(f,2),v=g[0],j=g[1],m=function(){j(!v)},b="options-container ".concat(v?"active":"");return Object(c.jsxs)("div",{className:"drop-list noselect",id:a,children:[Object(c.jsx)("div",{className:"list-question button",onClick:m,children:o}),Object(c.jsxs)("div",{className:"select-box",children:[Object(c.jsx)("div",{className:"list-button button",onClick:m,children:l}),Object(c.jsx)("div",{className:b,children:e.map((function(t,e){return Object(c.jsxs)("div",{className:"option",onClick:function(){return d(e=t),j(!1),void s(e);var e},children:[Object(c.jsx)("input",{type:"radio",className:"radio",id:"".concat(a,"option").concat(e),name:"category"}),Object(c.jsx)("label",{htmlFor:"".concat(a,"option").concat(e),children:t})]},t)}))})]})]})}n(13);var u=n(3),l=n(4),d=function(){function t(e){Object(u.a)(this,t),this._pos=void 0,this._state=void 0,this.stateHandler=void 0,this._weight=void 0,this._pos=e,this._state="empty"}return Object(l.a)(t,[{key:"state",get:function(){return this._state},set:function(t){this._state!==t&&("empty"!==t&&"path"!==t&&"visited"!==t&&(this._weight=void 0),this._state=t,this.stateHandler&&this.stateHandler(t,this._weight))}},{key:"pos",get:function(){return this._pos}},{key:"nodeInfo",get:function(){var t={pos:this._pos,state:this._state};return this._weight&&(t.weight=this._weight),t}},{key:"stateChangeHandler",set:function(t){this.stateHandler=t}},{key:"weight",get:function(){return this._weight},set:function(t){this._weight=t,this.stateHandler&&this.stateHandler(this._state,this._weight)}},{key:"clear",value:function(){"path"!==this._state&&"visited"!==this._state||(this.state="empty")}},{key:"reset",value:function(){"wall"===this._state&&(this.state="empty"),this._weight&&(this.weight=void 0)}}]),t}(),f={x:Math.floor(11.5),y:Math.floor(51/4)-1},g={x:Math.floor(11.5),y:Math.floor(38.25)+1},v=["Astar","Djikstra"],j="Astar",m=["Slow","Medium","Fast AF","Instant"],b=["YES","NO"],p={Slow:30,Medium:10,"Fast AF":5,Instant:0},x="Fast AF";function y(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)}function w(t,e){return{x:t.x+e.x,y:t.y+e.y}}function O(t){return!(t.x<0||t.x>=23)&&!(t.y<0||t.y>=51)}function k(t){return"".concat(t.x,"-").concat(t.y)}function N(t,e){return t.x===e.x&&t.y===e.y}function C(t,e,n){return Array.from(t).filter(function(t,e){return function(n){return!(N(n,t)||N(n,e))}}(e,n))}var _=[{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0}];function M(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return _.map((function(t){return{x:t.x*n,y:t.y*n}})).map((function(e){return w(t,e)})).filter((function(t){return O(t)}))}function E(t,e,n,i,s){return{heuristic:s||0,dist:n,parent:e,pos:t,visited:!1,weight:i||1}}function D(t,e){return t.dist+t.heuristic-e.dist-e.heuristic}function A(t,e,n,i){var s=new Set,a=t[e.x][e.y],o=[E(e,void 0,0,a.weight)],r={};r[k(e)]=o[0];for(var c=function(){o.sort(D);var a=o.shift();if(k(a.pos)===k(n)){for(var c=[],h=a.parent;h.parent;)c.unshift(h.pos),h=h.parent;return{v:[c,C(s,e,n)]}}a.visited=!0;var u=function(t,e){return M(t,e).filter((function(t){return"wall"!==e[t.x][t.y].state}))}(a.pos,t).map((function(e){var o=k(e),c=r[o];return c||(c=E(e,a,a.dist+(t[e.x][e.y].weight||1),t[e.x][e.y].weight,i&&i(e,n)),r[o]=c,s.add(e)),c}));u.forEach((function(t){t.dist>a.dist+t.weight&&(t.dist=a.dist+t.weight,t.parent=a)})),u.filter((function(t){return!(t.visited||o.includes(t))})).forEach((function(t){return o.push(t)}))};o.length;){var h=c();if("object"===typeof h)return h.v}return[[],C(s,e,n)]}function S(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Set,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];i.add(k(n)),s.push(n);var a=M(n,e,2);return a.sort((function(){return Math.random()-.5})).forEach((function(a){var o=!1;if(!(i.has(k(a))&&(o=!0,Math.random()>.05))){var r={x:(a.x+n.x)/2,y:(a.y+n.y)/2};s.push(r),o||S(t,e,a,i,s)}})),s}var F=function(){function t(e,n,i,s){var a,o=this;Object(u.a)(this,t),this.board=void 0,this.start=void 0,this.goal=void 0,this.rightClick=void 0,this.mouseDown=void 0,this.toChange=void 0,this.currentRenderID=void 0,this._autoRefresh=void 0,this._currentAlgo=void 0,this._speed=void 0,this.handleMouseDown=function(t,e){switch(e){case 0:o.rightClick=!1;break;case 2:o.rightClick=!0;break;default:return}switch(o.clear(),t.state){case"empty":o.toChange=o.rightClick?t.weight?"removeWeight":"setWeight":"setWall";break;case"wall":o.toChange=o.rightClick?"none":"removeWall";break;case"start":o.toChange=o.rightClick?"none":"start";break;case"goal":o.toChange=o.rightClick?"none":"goal";break;default:return}o.mouseDown=!0,o.handleMouseEnter(t)},this.board=(a=n,Array(e).fill(null).map((function(t,e){return Array(a).fill(null).map((function(t,n){return new d({x:e,y:n})}))}))),this.start=i,this.goal=s,this.board[this.start.x][this.start.y].state="start",this.board[this.goal.x][this.goal.y].state="goal",this.rightClick=!1,this.mouseDown=!1,this.toChange="none",this._autoRefresh=!0,this._currentAlgo=j,this._speed=x,this.currentRenderID=Math.random()}return Object(l.a)(t,[{key:"speed",set:function(t){this._speed=t}},{key:"currentAlgo",set:function(t){this._currentAlgo=t}},{key:"autoRefresh",set:function(t){this._autoRefresh=t}},{key:"grid",get:function(){return this.board}},{key:"clear",value:function(){return this.board.forEach((function(t){return t.forEach((function(t){return t.clear()}))})),this.currentRenderID=Math.random(),this.currentRenderID}},{key:"reset",value:function(){var t=this.clear();return this.board.forEach((function(t){return t.forEach((function(t){return t.reset()}))})),t}},{key:"launch",value:function(t){var e=this;console.time(this._currentAlgo);var n=this.clear(),i=this.board.map((function(t){return t.map((function(t){return t.nodeInfo}))})),s="Astar"===e._currentAlgo?A(i,e.start,e.goal,y):A(i,e.start,e.goal),a=Object(r.a)(s,2),o=a[0],c=a[1];0===o.length&&console.log("no Path");var h=c.length;this.animateNodes(c,(function(t){t.state="visited"}),n,t),this.animateNodes(o,(function(t){t.state="path"}),n,t,h),console.timeEnd(this._currentAlgo)}},{key:"handleMouseEnter",value:function(t){if(this.mouseDown)switch(this.toChange){case"setWall":"empty"===t.state&&(t.state="wall");break;case"removeWall":"wall"===t.state&&(t.state="empty");break;case"start":"empty"===t.state&&(this.board[this.start.x][this.start.y].state="empty",t.state="start",this.start=t.pos);break;case"goal":"empty"===t.state&&(this.board[this.goal.x][this.goal.y].state="empty",t.state="goal",this.goal=t.pos);break;case"setWeight":"empty"!==t.state||t.weight||(t.weight=10);break;case"removeWeight":t.weight&&(t.weight=void 0)}}},{key:"handleMouseUp",value:function(){this._autoRefresh&&this.mouseDown&&this.launch(!1),this.mouseDown=!1}},{key:"generateMaze",value:function(){console.time("maze generation");var t=this.reset();this.board.forEach((function(t){t.forEach((function(t){"empty"===t.state&&(t.state="wall")}))}));var e={x:this.start.x+(this.start.x+1)%2,y:this.start.y+(this.start.y+1)%2},n=this.board.map((function(t){return t.map((function(t){return t.nodeInfo}))})),i=S(this.board,n,e);this.animateNodes(i,(function(t){"wall"===t.state&&(t.state="empty")}),t),console.timeEnd("maze generation")}},{key:"animateNodes",value:function(t,e,n){var i=this,s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=s&&0!==p[this._speed]?function(t,s){return setTimeout((function(){n===i.currentRenderID&&e(i.board[t.x][t.y])}),(a+s)*p[i._speed])}:function(t){e(i.board[t.x][t.y])};t.forEach(o)}}]),t}();function I(t){var e=t.node,n=t.handleMouseDown,s=t.handleMouseEnter,a=t.bottom,o=t.right,h=Object(i.useState)("node"),u=Object(r.a)(h,2),l=u[0],d=u[1],f=function(t,n){var i=["node"];"empty"!==t&&i.push("node-".concat(e.state)),n&&i.push("node-weight"),a&&i.push("empty"!==e.state?"node-".concat(e.state,"-bottom"):"node-bottom"),o&&i.push("empty"!==e.state?"node-".concat(e.state,"-right"):"node-right"),d(i.join(" "))};return Object(i.useEffect)((function(){e.stateChangeHandler=f,f(e.state)}),[e]),Object(c.jsx)("div",{className:l,onMouseDown:function(t){return n(e,t.button)},onMouseEnter:function(){return s(e)},children:Object(c.jsxs)("div",{children:[Object(c.jsx)("i",{className:"far fa-dot-circle igoal"}),Object(c.jsx)("i",{className:"far fa-compass istart"}),Object(c.jsx)("i",{className:"fas fa-weight-hanging iweight"})]})})}function R(t){var e=t.nodeGrid,n=t.handleMouseDown,i=t.handleMouseEnter;return Object(c.jsx)("div",{id:"grid",className:"noselect",onContextMenu:function(t){return t.preventDefault()},children:e.map((function(t,e){return t.map((function(t,s){return Object(c.jsx)(I,{node:t,handleMouseDown:n,handleMouseEnter:i,bottom:22===e,right:50===s},k(t.pos))}))}))})}function W(){var t=new F(23,51,f,g);return Object(i.useEffect)((function(){window.addEventListener("mouseup",(function(){return t.handleMouseUp()}))}),[]),Object(c.jsxs)("div",{className:"main",children:[Object(c.jsxs)("nav",{className:"nav-bar",children:[Object(c.jsx)("div",{className:"title",children:Object(c.jsx)("p",{children:"PathFinder"})}),Object(c.jsxs)("div",{className:"options-bar noselect",children:[Object(c.jsx)(h,{handleChange:function(e){t.currentAlgo=e},choices:v,id:"algo-list",defaultChoice:j,question:"Algorithm :"}),Object(c.jsx)("div",{className:"button",onClick:function(){t.launch(!0)},children:"Visualize"}),Object(c.jsx)("div",{className:"button",onClick:function(){t.clear()},children:"Clear Path"}),Object(c.jsx)("div",{className:"button",onClick:function(){t.reset()},children:"Clear Walls & Weights"}),Object(c.jsx)(h,{handleChange:function(e){t.autoRefresh="YES"===e},choices:b,id:"refresh-list",defaultChoice:"YES",question:"Auto Refresh :"}),Object(c.jsx)(h,{handleChange:function(e){t.speed=e},choices:m,id:"speed-list",defaultChoice:x,question:"Speed :"}),Object(c.jsx)("div",{className:"button",onClick:function(){t.generateMaze()},children:"Generate Maze"})]})]}),Object(c.jsxs)("div",{id:"exemple",children:[Object(c.jsxs)("div",{className:"exemple-container",children:[Object(c.jsx)("p",{children:"Unvisited/Blank Node :"}),Object(c.jsx)("div",{className:"node exemple"})]}),Object(c.jsxs)("div",{className:"exemple-container",children:[Object(c.jsx)("p",{children:"Wall Node :"}),Object(c.jsx)("div",{className:"node exemple node-wall"})]}),Object(c.jsxs)("div",{className:"exemple-container",children:[Object(c.jsx)("p",{children:"Visited Node :"}),Object(c.jsx)("div",{className:"node exemple node-visited"})]}),Object(c.jsxs)("div",{className:"exemple-container",children:[Object(c.jsx)("p",{children:"Path Node :"}),Object(c.jsx)("div",{className:"node exemple node-path"})]}),Object(c.jsxs)("div",{className:"exemple-container",children:[Object(c.jsxs)("p",{children:["Weighted Node (cost"," ".concat(10," "),"to cross) :"]}),Object(c.jsx)("div",{className:"node exemple node-weight",children:Object(c.jsx)("div",{children:Object(c.jsx)("i",{className:"fas fa-weight-hanging iweight"})})})]})]}),Object(c.jsx)(R,{nodeGrid:t.grid,handleMouseDown:function(e,n){t.handleMouseDown(e,n)},handleMouseEnter:function(e){t.handleMouseEnter(e)}})]})}var H=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),i(t),s(t),a(t),o(t)}))};o.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(W,{})}),document.getElementById("root")),H()}},[[14,1,2]]]);
//# sourceMappingURL=main.eaa7e0ce.chunk.js.map