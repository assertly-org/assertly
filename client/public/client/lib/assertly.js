!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t){var n,r,i;return e&&0!==t?(null===(n=null==e?void 0:e._debugSource)||void 0===n?void 0:n.fileName)?{filename:null===(r=null==e?void 0:e._debugSource)||void 0===r?void 0:r.fileName,linenumber:null===(i=null==e?void 0:e._debugSource)||void 0===i?void 0:i.lineNumber}:o(null==e?void 0:e._debugOwner,t-1):null}function r(e){return e?e.elementType&&e.elementType.name?e.elementType.name:e.elementType&&e.elementType.displayName?e.elementType.displayName:e.type.displayName?e.type.displayName:e.type.name?e.type.name:r(e._debugOwner):null}n.r(t),n.d(t,"default",(function(){return u}));const i={mouseup:!0,mousedown:!0,mousemove:!0,mouseover:!0};function s(e){const t=e;return i[e.type]?{x:t.clientX,y:t.clientY}:null}function c(e){const t=Object.keys(e).find(e=>e.startsWith("__reactInternalInstance$")),n=t?e[t]:null;return console.log("React Node if Found: ",n),null==n?null:n}function l(e){for(let t in e)if(e[t]&&"[object Function]"==={}.toString.call(e[t]))try{e[t]=""+e[t]}catch(e){console.error("Error stringifying prop",e)}!function(e){const t=Object.keys(e);for(const n of t)"[object Object]"!==Object.prototype.toString.call(e[n])||!e[n].hasOwnProperty("_owner")&&"inputRef"!==n&&"InputProps"!==n||delete e[n]}(e)}class a{constructor(e){this.recordEvents=[],this.reconcileEvents=["blur","focus","change"],this.addAllListeners=()=>{this.recordEvents.forEach(e=>{window.addEventListener(e,this.eventCallback,!0)}),this.reconcileEvents.forEach(e=>{window.addEventListener(e,this.reconcileCallback,!0)})},this.removeAllListeners=()=>{this.recordEvents.forEach(e=>{window.removeEventListener(e,this.eventCallback,!0)}),this.reconcileEvents.forEach(e=>{window.removeEventListener(e,this.reconcileCallback,!0)})},this.start=()=>{window.recorderAddedControlListeners||(this.addAllListeners(),window.recorderAddedControlListeners=!0)},this.stop=()=>{window.recorderAddedControlListeners&&(this.removeAllListeners(),window.recorderAddedControlListeners=!1)};const{eventCallback:t,reconcileCallback:n,recordEvents:o,reconcileEvents:r=null}=e;this.eventCallback=t,this.reconcileCallback=n,this.recordEvents=o,r&&(this.reconcileEvents=r)}}var d=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{l(o.next(e))}catch(e){i(e)}}function c(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}l((o=o.apply(e,t||[])).next())}))};class u{constructor(){this.eventsToRecord=["click","change"],this.componentEventCache=[],this.previousComponent=null,this.previousMsg=null,this.start=()=>{this.eventRecorder.start()},this.stop=()=>{this.eventRecorder.stop()},this.clearEventCache=()=>{this.componentEventCache=[]},this.reconcileEventCache=e=>{(e.target?c(e.target):null)!==this.previousComponent&&(this.componentEventCache.forEach(e=>{this.sendEvent(e)}),this.clearEventCache())},this.getMessage=(e,t)=>{var n,i,c;const a=t.target||t.srcElement,d=a,u=a,v=function e(t,n={}){var o;if(!t)return l(n),n;const r=t.pendingProps?Object.assign(Object.assign({},n),t.pendingProps):n;return delete r.children,(null===(o=null==t?void 0:t.type)||void 0===o?void 0:o.__proto__)&&["Component","PureComponent"].includes(t.type.__proto__.name)?(l(r),r):e(t._debugOwner,r)}(e);return{action:t.type,checked:(null===(n=null==t?void 0:t.target)||void 0===n?void 0:n.hasOwnProperty("checked"))?d.checked:null,componentName:r(null==e?void 0:e._debugOwner),coordinates:s(t),filename:null===(i=o(e,10))||void 0===i?void 0:i.filename,linenumber:null===(c=o(e,10))||void 0===c?void 0:c.linenumber,href:u.href?u.href:null,keyCode:t.keyCode?t.keyCode:null,props:v,tagName:d.tagName,tagType:d.type,textContent:d.textContent||d.innerText,timestamp:(new Date).getTime(),value:d.value}},this.recordEvent=e=>{const t=e.target;if((!this.previousMsg||this.previousMsg.timestamp!==e.timeStamp)&&("load"!==e.type||"#document"!==t.nodeName)&&e.target)try{if(this.previousMsg&&("change"===e.type||"click"===e.type)&&this.previousMsg&&"click"===this.previousMsg.action&&(new Date).getTime()-this.previousMsg.timestamp<100)return void console.log("message not send due to time");const t=c(e.target);console.log("reactComponent: ",t);const n=this.getMessage(t,e);if(console.log("record event msg",n),localStorage.setItem("lastEvent",JSON.stringify(n)),this.previousMsg=n,!this.previousComponent||this.previousComponent&&this.previousComponent===t)return this.previousComponent=t,this.previousComponent&&null!==n.checked&&"click"===n.action?void this.sendEvent(n):void this.componentEventCache.push(n);this.clearEventCache(),this.previousComponent=t,this.sendEvent(n)}catch(e){console.error("Error recording event",e)}},this.sendEvent=e=>d(this,void 0,void 0,(function*(){const t=`//localhost:3002/api/accounts/${window.dataLayer[0].apiKey}/events/`;yield fetch(t,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:window.location.href,event:[e],testSetId:"60652b19-98f3-40b4-88f7-88c71dbc788a"})})})),this.eventRecorder=new a({recordEvents:this.eventsToRecord,eventCallback:this.recordEvent,reconcileCallback:this.reconcileEventCache})}}window.eventRecorder=new u,window.eventRecorder.start()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC1yZWNvcmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZ2V0Q29tcG9uZW50RmlsZU5hbWUiLCJjb21wb25lbnQiLCJtYXhOZXN0IiwiX2RlYnVnU291cmNlIiwiZmlsZU5hbWUiLCJmaWxlbmFtZSIsImxpbmVudW1iZXIiLCJsaW5lTnVtYmVyIiwiX2RlYnVnT3duZXIiLCJnZXRDb21wb25lbnROYW1lIiwiZmliZXIiLCJlbGVtZW50VHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsImV2ZW50c1dpdGhDb29yZGluYXRlcyIsIm1vdXNldXAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJtb3VzZW92ZXIiLCJnZXRDb29yZGluYXRlcyIsImV2ZW50IiwibW91c2VFdmVudCIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJmaW5kUmVhY3RFbGVtZW50IiwidGFyZ2V0Iiwia2V5cyIsImZpbmQiLCJzdGFydHNXaXRoIiwiaW50ZXJuYWxJbnN0YW5jZSIsImNvbnNvbGUiLCJsb2ciLCJmdW5jdGlvblN0cmluZ2lmeSIsIm9iaiIsImsiLCJ0b1N0cmluZyIsImUiLCJlcnJvciIsInByb3BzIiwic3RyaXBFeHRyYUNvbXBvbmVudFByb3BzIiwiRXZlbnRSZWNvcmRlciIsImNvbmZpZyIsInJlY29yZEV2ZW50cyIsInJlY29uY2lsZUV2ZW50cyIsImFkZEFsbExpc3RlbmVycyIsInRoaXMiLCJmb3JFYWNoIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Q2FsbGJhY2siLCJyZWNvbmNpbGVDYWxsYmFjayIsInJlbW92ZUFsbExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdGFydCIsInJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzIiwic3RvcCIsImV2ZW50c1RvUmVjb3JkIiwiY29tcG9uZW50RXZlbnRDYWNoZSIsInByZXZpb3VzQ29tcG9uZW50IiwicHJldmlvdXNNc2ciLCJldmVudFJlY29yZGVyIiwiY2xlYXJFdmVudENhY2hlIiwicmVjb25jaWxlRXZlbnRDYWNoZSIsIm1zZyIsInNlbmRFdmVudCIsImdldE1lc3NhZ2UiLCJyZWFjdENvbXBvbmVudCIsInNyY0VsZW1lbnQiLCJpbnB1dFRhcmdldCIsImxpbmtUYXJnZXQiLCJnZXRDb21wb25lbnRQcm9wcyIsIm5ld1Byb3BzIiwicGVuZGluZ1Byb3BzIiwiY2hpbGRyZW4iLCJfX3Byb3RvX18iLCJpbmNsdWRlcyIsImFjdGlvbiIsImNoZWNrZWQiLCJjb21wb25lbnROYW1lIiwiY29vcmRpbmF0ZXMiLCJocmVmIiwia2V5Q29kZSIsInRhZ05hbWUiLCJ0YWdUeXBlIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsInJlY29yZEV2ZW50Iiwibm9kZVRhcmdldCIsInRpbWVTdGFtcCIsIm5vZGVOYW1lIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwdXNoIiwibWVzc2FnZSIsInVybCIsImZldGNoIiwibWV0aG9kIiwiY2Fj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QUFPLENBQUNnRixHQUVSUyxVQUFXLDhDQXJJZjlELEtBQUtlLGNBQWdCLElBQUlwQixFQUFjLENBQ3JDRSxhQUFjRyxLQUFLVyxlQUNuQlAsY0FBZUosS0FBSzRDLFlBQ3BCdkMsa0JBQW1CTCxLQUFLaUIsdUJBd0l4QmYsT0FBUWEsY0FBZ0IsSUFBSSxFQUM1QmIsT0FBUWEsY0FBY1AiLCJmaWxlIjoiYXNzZXJ0bHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQgQ29vcmRpbmF0ZXMgZnJvbSBcIi4vdHlwZXMvQ29vcmRpbmF0ZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudEZpbGVOYW1lKGNvbXBvbmVudDogYW55LCBtYXhOZXN0OiBudW1iZXIpOiBhbnkge1xuICBcblxuICAvLyBjb25zb2xlLmxvZygnZmluZEZpbGVOYW1lOiAnLCBjb21wb25lbnQpXG5cbiAgaWYgKCFjb21wb25lbnQgfHwgbWF4TmVzdCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAoY29tcG9uZW50Py5fZGVidWdTb3VyY2U/LmZpbGVOYW1lKSB7XG5cbiAgICByZXR1cm4ge2ZpbGVuYW1lOiBjb21wb25lbnQ/Ll9kZWJ1Z1NvdXJjZT8uZmlsZU5hbWUsIGxpbmVudW1iZXI6IGNvbXBvbmVudD8uX2RlYnVnU291cmNlPy5saW5lTnVtYmVyfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRDb21wb25lbnRGaWxlTmFtZShjb21wb25lbnQ/Ll9kZWJ1Z093bmVyLG1heE5lc3QtMSlcbiAgfVxuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRQcm9wcyhjb21wb25lbnQ6IGFueSwgcHJvcHMgPSB7fSk6IGFueSB7XG4gIGlmICghY29tcG9uZW50KSB7XG4gICAgZnVuY3Rpb25TdHJpbmdpZnkocHJvcHMpO1xuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIGNvbnN0IG5ld1Byb3BzID0gY29tcG9uZW50LnBlbmRpbmdQcm9wc1xuICAgID8geyAuLi5wcm9wcywgLi4uY29tcG9uZW50LnBlbmRpbmdQcm9wcyB9XG4gICAgOiBwcm9wcztcbiAgZGVsZXRlIG5ld1Byb3BzLmNoaWxkcmVuO1xuXG4gIGlmIChcbiAgICBjb21wb25lbnQ/LnR5cGU/Ll9fcHJvdG9fXyAmJlxuICAgIFtcIkNvbXBvbmVudFwiLCBcIlB1cmVDb21wb25lbnRcIl0uaW5jbHVkZXMoY29tcG9uZW50LnR5cGUuX19wcm90b19fLm5hbWUpXG4gICkge1xuICAgIGZ1bmN0aW9uU3RyaW5naWZ5KG5ld1Byb3BzKTtcbiAgICByZXR1cm4gbmV3UHJvcHM7XG4gIH1cblxuICByZXR1cm4gZ2V0Q29tcG9uZW50UHJvcHMoY29tcG9uZW50Ll9kZWJ1Z093bmVyLCBuZXdQcm9wcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKGZpYmVyOiBhbnkpOiBhbnkge1xuICBpZiAoIWZpYmVyKSByZXR1cm4gbnVsbDtcblxuICBpZiAoZmliZXIuZWxlbWVudFR5cGUgJiYgZmliZXIuZWxlbWVudFR5cGUubmFtZSkge1xuICAgIHJldHVybiBmaWJlci5lbGVtZW50VHlwZS5uYW1lO1xuICB9XG5cbiAgaWYgKGZpYmVyLmVsZW1lbnRUeXBlICYmIGZpYmVyLmVsZW1lbnRUeXBlLmRpc3BsYXlOYW1lKSB7XG4gICAgcmV0dXJuIGZpYmVyLmVsZW1lbnRUeXBlLmRpc3BsYXlOYW1lO1xuICB9XG5cbiAgaWYgKGZpYmVyLnR5cGUuZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gZmliZXIudHlwZS5kaXNwbGF5TmFtZTtcbiAgfVxuXG4gIGlmIChmaWJlci50eXBlLm5hbWUpIHtcbiAgICByZXR1cm4gZmliZXIudHlwZS5uYW1lO1xuICB9XG4gIHJldHVybiBnZXRDb21wb25lbnROYW1lKGZpYmVyLl9kZWJ1Z093bmVyKTtcbn1cblxuY29uc3QgZXZlbnRzV2l0aENvb3JkaW5hdGVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICBtb3VzZXVwOiB0cnVlLFxuICBtb3VzZWRvd246IHRydWUsXG4gIG1vdXNlbW92ZTogdHJ1ZSxcbiAgbW91c2VvdmVyOiB0cnVlLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzKGV2ZW50OiBFdmVudCk6IENvb3JkaW5hdGVzIHwgbnVsbCB7XG4gIGNvbnN0IG1vdXNlRXZlbnQgPSBldmVudCBhcyBNb3VzZUV2ZW50O1xuXG4gIHJldHVybiBldmVudHNXaXRoQ29vcmRpbmF0ZXNbZXZlbnQudHlwZV1cbiAgICA/IHsgeDogbW91c2VFdmVudC5jbGllbnRYLCB5OiBtb3VzZUV2ZW50LmNsaWVudFkgfVxuICAgIDogbnVsbDtcbn1cblxuLy8gbWFwIHJlYWN0IGNsYXNzZXMgdG8gZG9tIGVsZW1lbnRzXG5leHBvcnQgZnVuY3Rpb24gZmluZFJlYWN0RWxlbWVudCh0YXJnZXQ6IEV2ZW50VGFyZ2V0KTogYW55IHtcbiAgLy8gY29uc29sZS5kaXIodGFyZ2V0KVxuICBjb25zdCBrZXkgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbmQoKGtleSkgPT5cbiAgICBrZXkuc3RhcnRzV2l0aChcIl9fcmVhY3RJbnRlcm5hbEluc3RhbmNlJFwiKVxuICApO1xuICAvLyBjb25zb2xlLmxvZygna2V5OiAnLCBrZXkpXG4gIC8vIGNyZWF0ZXMgYW4gb2JqZWN0IG91dCBvZiB0aGUgdGFyZ2V0IHBhc3NlZFxuICBjb25zdCB0YXJnZXRNYXAgPSB0YXJnZXQgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblxuICBjb25zdCBpbnRlcm5hbEluc3RhbmNlID0ga2V5ID8gdGFyZ2V0TWFwW2tleV0gOiBudWxsO1xuICBjb25zb2xlLmxvZygnUmVhY3QgTm9kZSBpZiBGb3VuZDogJywgaW50ZXJuYWxJbnN0YW5jZSlcbiAgaWYgKGludGVybmFsSW5zdGFuY2UgPT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cbiAgLy8gY29uc29sZS5sb2coJ2ludGVybmFsSW5zdGFuY2UyOiAnLCBpbnRlcm5hbEluc3RhbmNlKVxuICAvLyByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZS5fZGVidWdPd25lclxuICAvLyAgID8gaW50ZXJuYWxJbnN0YW5jZS5fZGVidWdPd25lci5zdGF0ZU5vZGVcbiAgLy8gICA6IGludGVybmFsSW5zdGFuY2UucmV0dXJuLnN0YXRlTm9kZTtcblxuICByZXR1cm4gaW50ZXJuYWxJbnN0YW5jZTtcblxuICAvLyBmb3IgKGxldCBrZXk6IHN0cmluZyBpbiB0YXJnZXQpIHtcbiAgLy8gICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJfX3JlYWN0SW50ZXJuYWxJbnN0YW5jZSRcIikpIHtcbiAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCdrZXlzIGluIHRoZSBmaW5kIFJlYWN0RWxlbWVudCcsIHRhcmdldFtrZXldKVxuICAvLyAgICAgcmV0dXJuIHRhcmdldFtrZXldO1xuICAvLyAgIH1cbiAgLy8gfVxuICAvLyByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZ1bmN0aW9uU3RyaW5naWZ5KG9iajogYW55KTogdm9pZCB7XG4gIGZvciAobGV0IGsgaW4gb2JqKSB7XG4gICAgaWYgKG9ialtrXSAmJiB7fS50b1N0cmluZy5jYWxsKG9ialtrXSkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgb2JqW2tdID0gXCJcIiArIG9ialtrXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHN0cmluZ2lmeWluZyBwcm9wXCIsIGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzdHJpcEV4dHJhQ29tcG9uZW50UHJvcHMob2JqKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHN0cmlwRXh0cmFDb21wb25lbnRQcm9wcyhwcm9wczogYW55KTogdm9pZCB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvcHNba2V5XSkgPT09IFwiW29iamVjdCBPYmplY3RdXCIgJiZcbiAgICAgIChwcm9wc1trZXldLmhhc093blByb3BlcnR5KFwiX293bmVyXCIpIHx8XG4gICAgICAgIGtleSA9PT0gXCJpbnB1dFJlZlwiIHx8XG4gICAgICAgIGtleSA9PT0gXCJJbnB1dFByb3BzXCIpXG4gICAgKSB7XG4gICAgICBkZWxldGUgcHJvcHNba2V5XTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50VHlwZSwgUmVjb25jaWxlVHlwZSB9IGZyb20gXCIuL3R5cGVzL0V2ZW50VHlwZVwiO1xuaW1wb3J0IHsgUmVjb3JkZXJDb25maWcgfSBmcm9tIFwiLi90eXBlcy9SZWNvcmRlckNvbmZpZ1wiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzOiBib29sZWFuO1xuICAgIGRhdGFMYXllcjogYW55W107XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRSZWNvcmRlciB7XG4gIHByaXZhdGUgZXZlbnRDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gYW55O1xuICBwcml2YXRlIHJlY29uY2lsZUNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiBhbnk7XG4gIHByaXZhdGUgcmVjb3JkRXZlbnRzOiBFdmVudFR5cGVbXSA9IFtdO1xuICBwcml2YXRlIHJlY29uY2lsZUV2ZW50czogUmVjb25jaWxlVHlwZVtdID0gW1wiYmx1clwiLCBcImZvY3VzXCIsIFwiY2hhbmdlXCJdO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUmVjb3JkZXJDb25maWcpIHtcbiAgICBjb25zdCB7XG4gICAgICBldmVudENhbGxiYWNrLFxuICAgICAgcmVjb25jaWxlQ2FsbGJhY2ssXG4gICAgICByZWNvcmRFdmVudHMsXG4gICAgICByZWNvbmNpbGVFdmVudHMgPSBudWxsLFxuICAgIH0gPSBjb25maWc7XG4gICAgdGhpcy5ldmVudENhbGxiYWNrID0gZXZlbnRDYWxsYmFjaztcbiAgICB0aGlzLnJlY29uY2lsZUNhbGxiYWNrID0gcmVjb25jaWxlQ2FsbGJhY2s7XG4gICAgdGhpcy5yZWNvcmRFdmVudHMgPSByZWNvcmRFdmVudHM7XG4gICAgaWYgKHJlY29uY2lsZUV2ZW50cykge1xuICAgICAgdGhpcy5yZWNvbmNpbGVFdmVudHMgPSByZWNvbmNpbGVFdmVudHM7XG4gICAgfVxuICB9XG5cbiAgYWRkQWxsTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHRoaXMucmVjb3JkRXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5ldmVudENhbGxiYWNrLCB0cnVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVjb25jaWxlRXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5yZWNvbmNpbGVDYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVtb3ZlQWxsTGlzdGVuZXJzID0gKCkgPT4ge1xuICAgIHRoaXMucmVjb3JkRXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5ldmVudENhbGxiYWNrLCB0cnVlKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlY29uY2lsZUV2ZW50cy5mb3JFYWNoKChldmVudDogUmVjb25jaWxlVHlwZSkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMucmVjb25jaWxlQ2FsbGJhY2ssIHRydWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIHN0YXJ0ID0gKCkgPT4ge1xuICAgIGlmICghd2luZG93LnJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLmFkZEFsbExpc3RlbmVycygpO1xuICAgICAgd2luZG93LnJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LnJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgd2luZG93LnJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzID0gZmFsc2U7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IHtcbiAgZmluZFJlYWN0RWxlbWVudCxcbiAgZ2V0Q29vcmRpbmF0ZXMsXG4gIGdldENvbXBvbmVudE5hbWUsXG4gIGdldENvbXBvbmVudFByb3BzLFxuICBnZXRDb21wb25lbnRGaWxlTmFtZVxufSBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmltcG9ydCBFdmVudFJlY29yZGVyIGZyb20gXCIuL2V2ZW50LXJlY29yZGVyXCI7XG5pbXBvcnQgQ2xpZW50SW50ZXJmYWNlIGZyb20gXCIuL3R5cGVzL0NsaWVudFwiO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4vdHlwZXMvTWVzc2FnZVwiO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4vdHlwZXMvRXZlbnRUeXBlXCI7XG5cbmludGVyZmFjZSBDb21wb25lbnQge31cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZXJ0bHlDbGllbnQgaW1wbGVtZW50cyBDbGllbnRJbnRlcmZhY2Uge1xuICBldmVudHNUb1JlY29yZDogRXZlbnRUeXBlW10gPSBbXCJjbGlja1wiLCBcImNoYW5nZVwiXTtcblxuICBwcml2YXRlIGV2ZW50UmVjb3JkZXI6IEV2ZW50UmVjb3JkZXI7XG4gIHByaXZhdGUgY29tcG9uZW50RXZlbnRDYWNoZTogTWVzc2FnZVtdID0gW107XG4gIHByaXZhdGUgcHJldmlvdXNDb21wb25lbnQ6IENvbXBvbmVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzTXNnOiBNZXNzYWdlIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudFJlY29yZGVyID0gbmV3IEV2ZW50UmVjb3JkZXIoe1xuICAgICAgcmVjb3JkRXZlbnRzOiB0aGlzLmV2ZW50c1RvUmVjb3JkLFxuICAgICAgZXZlbnRDYWxsYmFjazogdGhpcy5yZWNvcmRFdmVudCxcbiAgICAgIHJlY29uY2lsZUNhbGxiYWNrOiB0aGlzLnJlY29uY2lsZUV2ZW50Q2FjaGUsXG4gICAgfSk7XG4gIH1cblxuICBzdGFydCA9ICgpID0+IHtcbiAgICB0aGlzLmV2ZW50UmVjb3JkZXIuc3RhcnQoKTtcbiAgfTtcblxuICBzdG9wID0gKCkgPT4ge1xuICAgIHRoaXMuZXZlbnRSZWNvcmRlci5zdG9wKCk7XG4gIH07XG5cbiAgY2xlYXJFdmVudENhY2hlID0gKCkgPT4ge1xuICAgIHRoaXMuY29tcG9uZW50RXZlbnRDYWNoZSA9IFtdO1xuICB9O1xuXG4gIHJlY29uY2lsZUV2ZW50Q2FjaGUgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVhY3RDb21wb25lbnQgPSBldmVudC50YXJnZXQgPyBmaW5kUmVhY3RFbGVtZW50KGV2ZW50LnRhcmdldCkgOiBudWxsO1xuICAgIGlmIChyZWFjdENvbXBvbmVudCAhPT0gdGhpcy5wcmV2aW91c0NvbXBvbmVudCkge1xuICAgICAgdGhpcy5jb21wb25lbnRFdmVudENhY2hlLmZvckVhY2goKG1zZykgPT4ge1xuICAgICAgICB0aGlzLnNlbmRFdmVudChtc2cpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNsZWFyRXZlbnRDYWNoZSgpO1xuICAgIH1cbiAgfTtcblxuICBnZXRNZXNzYWdlID0gKHJlYWN0Q29tcG9uZW50OiBhbnksIGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgRXZlbnQpOiBNZXNzYWdlID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbiAgICBjb25zdCBpbnB1dFRhcmdldCA9IHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGxpbmtUYXJnZXQgPSB0YXJnZXQgYXMgSFRNTExpbmtFbGVtZW50O1xuXG4gICAgY29uc3QgcHJvcHMgPSBnZXRDb21wb25lbnRQcm9wcyhyZWFjdENvbXBvbmVudCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjdGlvbjogZXZlbnQudHlwZSxcbiAgICAgIGNoZWNrZWQ6IGV2ZW50Py50YXJnZXQ/Lmhhc093blByb3BlcnR5KFwiY2hlY2tlZFwiKVxuICAgICAgICA/IGlucHV0VGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgOiBudWxsLFxuICAgICAgY29tcG9uZW50TmFtZTogZ2V0Q29tcG9uZW50TmFtZShyZWFjdENvbXBvbmVudD8uX2RlYnVnT3duZXIpLFxuICAgICAgY29vcmRpbmF0ZXM6IGdldENvb3JkaW5hdGVzKGV2ZW50KSxcbiAgICAgIC8vIGZpbGVuYW1lOiByZWFjdENvbXBvbmVudD8uX2RlYnVnU291cmNlPy5maWxlTmFtZSxcbiAgICAgIGZpbGVuYW1lOiBnZXRDb21wb25lbnRGaWxlTmFtZShyZWFjdENvbXBvbmVudCwxMCk/LmZpbGVuYW1lLFxuICAgICAgbGluZW51bWJlcjogZ2V0Q29tcG9uZW50RmlsZU5hbWUocmVhY3RDb21wb25lbnQsMTApPy5saW5lbnVtYmVyLFxuICAgICAgaHJlZjogbGlua1RhcmdldC5ocmVmID8gbGlua1RhcmdldC5ocmVmIDogbnVsbCxcbiAgICAgIGtleUNvZGU6IChldmVudCBhcyBLZXlib2FyZEV2ZW50KS5rZXlDb2RlXG4gICAgICAgID8gKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGVcbiAgICAgICAgOiBudWxsLFxuICAgICAgcHJvcHMsXG4gICAgICB0YWdOYW1lOiBpbnB1dFRhcmdldC50YWdOYW1lLFxuICAgICAgdGFnVHlwZTogaW5wdXRUYXJnZXQudHlwZSxcbiAgICAgIHRleHRDb250ZW50OiBpbnB1dFRhcmdldC50ZXh0Q29udGVudCB8fCBpbnB1dFRhcmdldC5pbm5lclRleHQsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgdmFsdWU6IGlucHV0VGFyZ2V0LnZhbHVlLFxuICAgIH07XG4gIH07XG5cbiAgcmVjb3JkRXZlbnQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3Qgbm9kZVRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xuXG4gICAgaWYgKHRoaXMucHJldmlvdXNNc2cgJiYgdGhpcy5wcmV2aW91c01zZy50aW1lc3RhbXAgPT09IGV2ZW50LnRpbWVTdGFtcClcbiAgICAgIHJldHVybjtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJsb2FkXCIgJiYgbm9kZVRhcmdldC5ub2RlTmFtZSA9PT0gXCIjZG9jdW1lbnRcIikgcmV0dXJuO1xuXG4gICAgaWYgKCFldmVudC50YXJnZXQpIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy5wcmV2aW91c01zZykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKGV2ZW50LnR5cGUgPT09IFwiY2hhbmdlXCIgfHwgZXZlbnQudHlwZSA9PT0gXCJjbGlja1wiKSAmJlxuICAgICAgICAgIHRoaXMucHJldmlvdXNNc2cgJiZcbiAgICAgICAgICB0aGlzLnByZXZpb3VzTXNnLmFjdGlvbiA9PT0gXCJjbGlja1wiICYmXG4gICAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnByZXZpb3VzTXNnLnRpbWVzdGFtcCA8IDEwMFxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIm1lc3NhZ2Ugbm90IHNlbmQgZHVlIHRvIHRpbWVcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlYWN0Q29tcG9uZW50ID0gZmluZFJlYWN0RWxlbWVudChldmVudC50YXJnZXQpO1xuICAgICAgY29uc29sZS5sb2coJ3JlYWN0Q29tcG9uZW50OiAnLCByZWFjdENvbXBvbmVudClcbiAgICAgIGNvbnN0IG1zZzogTWVzc2FnZSA9IHRoaXMuZ2V0TWVzc2FnZShyZWFjdENvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgY29uc29sZS5sb2coJ3JlY29yZCBldmVudCBtc2cnLCBtc2cpXG5cbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFzdEV2ZW50XCIsIEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgICAgdGhpcy5wcmV2aW91c01zZyA9IG1zZztcblxuICAgICAgaWYgKFxuICAgICAgICAhdGhpcy5wcmV2aW91c0NvbXBvbmVudCB8fFxuICAgICAgICAodGhpcy5wcmV2aW91c0NvbXBvbmVudCAmJiB0aGlzLnByZXZpb3VzQ29tcG9uZW50ID09PSByZWFjdENvbXBvbmVudClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnByZXZpb3VzQ29tcG9uZW50ID0gcmVhY3RDb21wb25lbnQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnByZXZpb3VzQ29tcG9uZW50ICYmXG4gICAgICAgICAgbXNnLmNoZWNrZWQgIT09IG51bGwgJiZcbiAgICAgICAgICBtc2cuYWN0aW9uID09PSBcImNsaWNrXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZW5kRXZlbnQobXNnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wb25lbnRFdmVudENhY2hlLnB1c2gobXNnKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsZWFyRXZlbnRDYWNoZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByZXZpb3VzQ29tcG9uZW50ID0gcmVhY3RDb21wb25lbnQ7XG5cbiAgICAgIHRoaXMuc2VuZEV2ZW50KG1zZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlY29yZGluZyBldmVudFwiLCBlKTtcbiAgICB9XG4gIH07XG5cbiAgc2VuZEV2ZW50ID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2UpID0+IHtcbiAgICAvLyBjb25zdCBhY2NvdW50SWQgPSB3aW5kb3dbXCJkYXRhTGF5ZXJcIl1bMF1bXCJhcGlLZXlcIl07XG4gICAgY29uc3QgYWNjb3VudElkID0gKHdpbmRvdyBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9KVtcImRhdGFMYXllclwiXVswXVtcImFwaUtleVwiXVxuICAgIGNvbnN0IHVybCA9IGAvL2xvY2FsaG9zdDozMDAyL2FwaS9hY2NvdW50cy8ke2FjY291bnRJZH0vZXZlbnRzL2A7XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHNlbmRFdmVudCcsIG1lc3NhZ2UpXG4gICAgYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgICBjYWNoZTogXCJuby1jYWNoZVwiLFxuICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICBldmVudDogW21lc3NhZ2VdLFxuICAgICAgICAvLyBUT0RPOiB0ZXN0IHNldCBpZCBzaG91bGQgYmUgc2V0IHdoZW4gY3JlYXRpbmcvbG9hZGluZyB0ZXN0c2V0IGluIHRoZSBydW5uZXJcbiAgICAgICAgdGVzdFNldElkOiBcIjYwNjUyYjE5LTk4ZjMtNDBiNC04OGY3LTg4YzcxZGJjNzg4YVwiLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH07XG59XG5cbig8YW55PndpbmRvdykuZXZlbnRSZWNvcmRlciA9IG5ldyBBc3NlcnRseUNsaWVudCgpO1xuKDxhbnk+d2luZG93KS5ldmVudFJlY29yZGVyLnN0YXJ0KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==