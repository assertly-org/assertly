!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t){var n,r,i;return e&&0!==t?(null===(n=null==e?void 0:e._debugSource)||void 0===n?void 0:n.fileName)?{filename:null===(r=null==e?void 0:e._debugSource)||void 0===r?void 0:r.fileName,linenumber:null===(i=null==e?void 0:e._debugSource)||void 0===i?void 0:i.lineNumber}:o(null==e?void 0:e._debugOwner,t-1):null}function r(e){return e?e.elementType&&e.elementType.name?e.elementType.name:e.elementType&&e.elementType.displayName?e.elementType.displayName:e.type.displayName?e.type.displayName:e.type.name?e.type.name:r(e._debugOwner):null}n.r(t),n.d(t,"default",(function(){return d}));const i={mouseup:!0,mousedown:!0,mousemove:!0,mouseover:!0};function s(e){const t=e;return i[e.type]?{x:t.clientX,y:t.clientY}:null}function c(e){const t=Object.keys(e).find(e=>e.startsWith("__reactInternalInstance$")),n=t?e[t]:null;return console.log("React Node if Found: ",n),null==n?null:n}function l(e){for(let t in e)if(e[t]&&"[object Function]"==={}.toString.call(e[t]))try{e[t]="[Function]"}catch(e){console.error("Error stringifying prop",e)}!function(e){const t=Object.keys(e);for(const n of t)"[object Object]"!==Object.prototype.toString.call(e[n])||!e[n].hasOwnProperty("_owner")&&"inputRef"!==n&&"InputProps"!==n||delete e[n]}(e)}class a{constructor(e){this.recordEvents=[],this.reconcileEvents=["blur","focus","change"],this.addAllListeners=()=>{this.recordEvents.forEach(e=>{window.addEventListener(e,this.eventCallback,!0)}),this.reconcileEvents.forEach(e=>{window.addEventListener(e,this.reconcileCallback,!0)})},this.removeAllListeners=()=>{this.recordEvents.forEach(e=>{window.removeEventListener(e,this.eventCallback,!0)}),this.reconcileEvents.forEach(e=>{window.removeEventListener(e,this.reconcileCallback,!0)})},this.start=()=>{window.recorderAddedControlListeners||(this.addAllListeners(),window.recorderAddedControlListeners=!0)},this.stop=()=>{window.recorderAddedControlListeners&&(this.removeAllListeners(),window.recorderAddedControlListeners=!1)};const{eventCallback:t,reconcileCallback:n,recordEvents:o,reconcileEvents:r=null}=e;this.eventCallback=t,this.reconcileCallback=n,this.recordEvents=o,r&&(this.reconcileEvents=r)}}var u=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function s(e){try{l(o.next(e))}catch(e){i(e)}}function c(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,c)}l((o=o.apply(e,t||[])).next())}))};class d{constructor(){this.eventsToRecord=["click","change"],this.componentEventCache=[],this.previousComponent=null,this.previousMsg=null,this.start=()=>{this.eventRecorder.start()},this.stop=()=>{this.eventRecorder.stop()},this.clearEventCache=()=>{this.componentEventCache=[]},this.reconcileEventCache=e=>{(e.target?c(e.target):null)!==this.previousComponent&&(this.componentEventCache.forEach(e=>{this.sendEvent(e)}),this.clearEventCache())},this.getMessage=(e,t)=>{var n,i,c;const a=t.target||t.srcElement,u=a,d=a,v=function e(t,n={}){var o;if(!t)return l(n),n;const r=t.pendingProps?Object.assign(Object.assign({},n),t.pendingProps):n;return delete r.children,(null===(o=null==t?void 0:t.type)||void 0===o?void 0:o.__proto__)&&["Component","PureComponent"].includes(t.type.__proto__.name)?(l(r),r):e(t._debugOwner,r)}(e);return{action:t.type,checked:(null===(n=null==t?void 0:t.target)||void 0===n?void 0:n.hasOwnProperty("checked"))?u.checked:null,componentName:r(null==e?void 0:e._debugOwner),coordinates:s(t),filename:null===(i=o(e,10))||void 0===i?void 0:i.filename,linenumber:null===(c=o(e,10))||void 0===c?void 0:c.linenumber,href:d.href?d.href:null,keyCode:t.keyCode?t.keyCode:null,props:v,tagName:u.tagName,tagType:u.type,textContent:u.textContent||u.innerText,timestamp:(new Date).getTime(),value:u.value,writeTestLocation:""}},this.recordEvent=e=>{const t=e.target;if((!this.previousMsg||this.previousMsg.timestamp!==e.timeStamp)&&("load"!==e.type||"#document"!==t.nodeName)&&e.target)try{if(this.previousMsg&&("change"===e.type||"click"===e.type)&&this.previousMsg&&"click"===this.previousMsg.action&&(new Date).getTime()-this.previousMsg.timestamp<100)return void console.log("message not send due to time");const t=c(e.target);console.log("reactComponent: ",t);const n=this.getMessage(t,e);if(console.log("record event msg",n),localStorage.setItem("lastEvent",JSON.stringify(n)),this.previousMsg=n,!this.previousComponent||this.previousComponent&&this.previousComponent===t)return this.previousComponent=t,this.previousComponent&&null!==n.checked&&"click"===n.action?void this.sendEvent(n):void this.componentEventCache.push(n);this.clearEventCache(),this.previousComponent=t,this.sendEvent(n)}catch(e){console.error("Error recording event",e)}},this.sendEvent=e=>u(this,void 0,void 0,(function*(){const t=window.dataLayer[0].apiKey,n=window.dataLayer[0].testLocation,o=`//localhost:3002/api/accounts/${t}/events/`;console.log("this is the write location: ",n,t),e.writeTestLocation=n,yield fetch(o,{method:"POST",mode:"cors",cache:"no-cache",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:window.location.href,event:[e],placeholder:null})})})),this.eventRecorder=new a({recordEvents:this.eventsToRecord,eventCallback:this.recordEvent,reconcileCallback:this.reconcileEventCache})}}window.eventRecorder=new d,window.eventRecorder.start()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC1yZWNvcmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiZ2V0Q29tcG9uZW50RmlsZU5hbWUiLCJjb21wb25lbnQiLCJtYXhOZXN0IiwiX2RlYnVnU291cmNlIiwiZmlsZU5hbWUiLCJmaWxlbmFtZSIsImxpbmVudW1iZXIiLCJsaW5lTnVtYmVyIiwiX2RlYnVnT3duZXIiLCJnZXRDb21wb25lbnROYW1lIiwiZmliZXIiLCJlbGVtZW50VHlwZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsImV2ZW50c1dpdGhDb29yZGluYXRlcyIsIm1vdXNldXAiLCJtb3VzZWRvd24iLCJtb3VzZW1vdmUiLCJtb3VzZW92ZXIiLCJnZXRDb29yZGluYXRlcyIsImV2ZW50IiwibW91c2VFdmVudCIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJmaW5kUmVhY3RFbGVtZW50IiwidGFyZ2V0Iiwia2V5cyIsImZpbmQiLCJzdGFydHNXaXRoIiwiaW50ZXJuYWxJbnN0YW5jZSIsImNvbnNvbGUiLCJsb2ciLCJmdW5jdGlvblN0cmluZ2lmeSIsIm9iaiIsImsiLCJ0b1N0cmluZyIsImUiLCJlcnJvciIsInByb3BzIiwic3RyaXBFeHRyYUNvbXBvbmVudFByb3BzIiwiRXZlbnRSZWNvcmRlciIsImNvbmZpZyIsInJlY29yZEV2ZW50cyIsInJlY29uY2lsZUV2ZW50cyIsImFkZEFsbExpc3RlbmVycyIsInRoaXMiLCJmb3JFYWNoIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Q2FsbGJhY2siLCJyZWNvbmNpbGVDYWxsYmFjayIsInJlbW92ZUFsbExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdGFydCIsInJlY29yZGVyQWRkZWRDb250cm9sTGlzdGVuZXJzIiwic3RvcCIsImV2ZW50c1RvUmVjb3JkIiwiY29tcG9uZW50RXZlbnRDYWNoZSIsInByZXZpb3VzQ29tcG9uZW50IiwicHJldmlvdXNNc2ciLCJldmVudFJlY29yZGVyIiwiY2xlYXJFdmVudENhY2hlIiwicmVjb25jaWxlRXZlbnRDYWNoZSIsIm1zZyIsInNlbmRFdmVudCIsImdldE1lc3NhZ2UiLCJyZWFjdENvbXBvbmVudCIsInNyY0VsZW1lbnQiLCJpbnB1dFRhcmdldCIsImxpbmtUYXJnZXQiLCJnZXRDb21wb25lbnRQcm9wcyIsIm5ld1Byb3BzIiwicGVuZGluZ1Byb3BzIiwiY2hpbGRyZW4iLCJfX3Byb3RvX18iLCJpbmNsdWRlcyIsImFjdGlvbiIsImNoZWNrZWQiLCJjb21wb25lbnROYW1lIiwiY29vcmRpbmF0ZXMiLCJocmVmIiwia2V5Q29kZSIsInRhZ05hbWUiLCJ0YWdUeXBlIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsIndyaXRlVGVzdExvY2F0aW9uIiwicmVjb3JkRXZlbnQiLCJub2RlVGFyZ2V0IiwidGltZVN0YW1wIiwibm9kZU5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsInB1c2giLCJtZXNzYWdlIiwiYWNjb3VudElkIiwid3JpdGVMb2NhdGlvbiIsInVybCIsImZldGNoIiwibWV0aG9kIiwiY2FjaGUiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJib2R5IiwibG9jYXRpb24iLCJwbGFjZWhvbGRlciJdLCJtYXBwaW5ncyI6ImFBQ0UsSUFBSUEsRUFBbUIsR0FHdkIsU0FBU0MsRUFBb0JDLEdBRzVCLEdBQUdGLEVBQWlCRSxHQUNuQixPQUFPRixFQUFpQkUsR0FBVUMsUUFHbkMsSUFBSUMsRUFBU0osRUFBaUJFLEdBQVksQ0FDekNHLEVBQUdILEVBQ0hJLEdBQUcsRUFDSEgsUUFBUyxJQVVWLE9BTkFJLEVBQVFMLEdBQVVNLEtBQUtKLEVBQU9ELFFBQVNDLEVBQVFBLEVBQU9ELFFBQVNGLEdBRy9ERyxFQUFPRSxHQUFJLEVBR0pGLEVBQU9ELFFBS2ZGLEVBQW9CUSxFQUFJRixFQUd4Qk4sRUFBb0JTLEVBQUlWLEVBR3hCQyxFQUFvQlUsRUFBSSxTQUFTUixFQUFTUyxFQUFNQyxHQUMzQ1osRUFBb0JhLEVBQUVYLEVBQVNTLElBQ2xDRyxPQUFPQyxlQUFlYixFQUFTUyxFQUFNLENBQUVLLFlBQVksRUFBTUMsSUFBS0wsS0FLaEVaLEVBQW9Ca0IsRUFBSSxTQUFTaEIsR0FDWCxvQkFBWGlCLFFBQTBCQSxPQUFPQyxhQUMxQ04sT0FBT0MsZUFBZWIsRUFBU2lCLE9BQU9DLFlBQWEsQ0FBRUMsTUFBTyxXQUU3RFAsT0FBT0MsZUFBZWIsRUFBUyxhQUFjLENBQUVtQixPQUFPLEtBUXZEckIsRUFBb0JzQixFQUFJLFNBQVNELEVBQU9FLEdBRXZDLEdBRFUsRUFBUEEsSUFBVUYsRUFBUXJCLEVBQW9CcUIsSUFDL0IsRUFBUEUsRUFBVSxPQUFPRixFQUNwQixHQUFXLEVBQVBFLEdBQThCLGlCQUFWRixHQUFzQkEsR0FBU0EsRUFBTUcsV0FBWSxPQUFPSCxFQUNoRixJQUFJSSxFQUFLWCxPQUFPWSxPQUFPLE1BR3ZCLEdBRkExQixFQUFvQmtCLEVBQUVPLEdBQ3RCWCxPQUFPQyxlQUFlVSxFQUFJLFVBQVcsQ0FBRVQsWUFB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b0JZLFFBRXRCRSxNQUFNRCxFQUFLLENBQ2ZFLE9BQVEsT0FDUnZILEtBQU0sT0FDTndILE1BQU8sV0FDUEMsWUFBYSxjQUNiQyxRQUFTLENBQ1AsZUFBZ0Isb0JBRWxCQyxLQUFNWixLQUFLQyxVQUFVLENBQ25CSyxJQUFLdkQsT0FBTzhELFNBQVM3QixLQUNyQjlELE1BQU8sQ0FBQ2lGLEdBRVJXLFlBQWEsWUExSWpCakUsS0FBS2UsY0FBZ0IsSUFBSXBCLEVBQWMsQ0FDckNFLGFBQWNHLEtBQUtXLGVBQ25CUCxjQUFlSixLQUFLNkMsWUFDcEJ4QyxrQkFBbUJMLEtBQUtpQix1QkE2SXhCZixPQUFRYSxjQUFnQixJQUFJLEVBQzVCYixPQUFRYSxjQUFjUCIsImZpbGUiOiJhc3NlcnRseS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImltcG9ydCBDb29yZGluYXRlcyBmcm9tIFwiLi90eXBlcy9Db29yZGluYXRlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50RmlsZU5hbWUoY29tcG9uZW50OiBhbnksIG1heE5lc3Q6IG51bWJlcik6IGFueSB7XG4gIFxuXG4gIC8vIGNvbnNvbGUubG9nKCdmaW5kRmlsZU5hbWU6ICcsIGNvbXBvbmVudClcblxuICBpZiAoIWNvbXBvbmVudCB8fCBtYXhOZXN0ID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmIChjb21wb25lbnQ/Ll9kZWJ1Z1NvdXJjZT8uZmlsZU5hbWUpIHtcblxuICAgIHJldHVybiB7ZmlsZW5hbWU6IGNvbXBvbmVudD8uX2RlYnVnU291cmNlPy5maWxlTmFtZSwgbGluZW51bWJlcjogY29tcG9uZW50Py5fZGVidWdTb3VyY2U/LmxpbmVOdW1iZXJ9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldENvbXBvbmVudEZpbGVOYW1lKGNvbXBvbmVudD8uX2RlYnVnT3duZXIsbWF4TmVzdC0xKVxuICB9XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFByb3BzKGNvbXBvbmVudDogYW55LCBwcm9wcyA9IHt9KTogYW55IHtcbiAgaWYgKCFjb21wb25lbnQpIHtcbiAgICBmdW5jdGlvblN0cmluZ2lmeShwcm9wcyk7XG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgY29uc3QgbmV3UHJvcHMgPSBjb21wb25lbnQucGVuZGluZ1Byb3BzXG4gICAgPyB7IC4uLnByb3BzLCAuLi5jb21wb25lbnQucGVuZGluZ1Byb3BzIH1cbiAgICA6IHByb3BzO1xuICBkZWxldGUgbmV3UHJvcHMuY2hpbGRyZW47XG5cbiAgaWYgKFxuICAgIGNvbXBvbmVudD8udHlwZT8uX19wcm90b19fICYmXG4gICAgW1wiQ29tcG9uZW50XCIsIFwiUHVyZUNvbXBvbmVudFwiXS5pbmNsdWRlcyhjb21wb25lbnQudHlwZS5fX3Byb3RvX18ubmFtZSlcbiAgKSB7XG4gICAgZnVuY3Rpb25TdHJpbmdpZnkobmV3UHJvcHMpO1xuICAgIHJldHVybiBuZXdQcm9wcztcbiAgfVxuXG4gIHJldHVybiBnZXRDb21wb25lbnRQcm9wcyhjb21wb25lbnQuX2RlYnVnT3duZXIsIG5ld1Byb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUoZmliZXI6IGFueSk6IGFueSB7XG4gIGlmICghZmliZXIpIHJldHVybiBudWxsO1xuXG4gIGlmIChmaWJlci5lbGVtZW50VHlwZSAmJiBmaWJlci5lbGVtZW50VHlwZS5uYW1lKSB7XG4gICAgcmV0dXJuIGZpYmVyLmVsZW1lbnRUeXBlLm5hbWU7XG4gIH1cblxuICBpZiAoZmliZXIuZWxlbWVudFR5cGUgJiYgZmliZXIuZWxlbWVudFR5cGUuZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gZmliZXIuZWxlbWVudFR5cGUuZGlzcGxheU5hbWU7XG4gIH1cblxuICBpZiAoZmliZXIudHlwZS5kaXNwbGF5TmFtZSkge1xuICAgIHJldHVybiBmaWJlci50eXBlLmRpc3BsYXlOYW1lO1xuICB9XG5cbiAgaWYgKGZpYmVyLnR5cGUubmFtZSkge1xuICAgIHJldHVybiBmaWJlci50eXBlLm5hbWU7XG4gIH1cbiAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUoZmliZXIuX2RlYnVnT3duZXIpO1xufVxuXG5jb25zdCBldmVudHNXaXRoQ29vcmRpbmF0ZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7XG4gIG1vdXNldXA6IHRydWUsXG4gIG1vdXNlZG93bjogdHJ1ZSxcbiAgbW91c2Vtb3ZlOiB0cnVlLFxuICBtb3VzZW92ZXI6IHRydWUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29vcmRpbmF0ZXMoZXZlbnQ6IEV2ZW50KTogQ29vcmRpbmF0ZXMgfCBudWxsIHtcbiAgY29uc3QgbW91c2VFdmVudCA9IGV2ZW50IGFzIE1vdXNlRXZlbnQ7XG5cbiAgcmV0dXJuIGV2ZW50c1dpdGhDb29yZGluYXRlc1tldmVudC50eXBlXVxuICAgID8geyB4OiBtb3VzZUV2ZW50LmNsaWVudFgsIHk6IG1vdXNlRXZlbnQuY2xpZW50WSB9XG4gICAgOiBudWxsO1xufVxuXG4vLyBtYXAgcmVhY3QgY2xhc3NlcyB0byBkb20gZWxlbWVudHNcbmV4cG9ydCBmdW5jdGlvbiBmaW5kUmVhY3RFbGVtZW50KHRhcmdldDogRXZlbnRUYXJnZXQpOiBhbnkge1xuICAvLyBjb25zb2xlLmRpcih0YXJnZXQpXG4gIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRhcmdldCkuZmluZCgoa2V5KSA9PlxuICAgIGtleS5zdGFydHNXaXRoKFwiX19yZWFjdEludGVybmFsSW5zdGFuY2UkXCIpXG4gICk7XG4gIC8vIGNvbnNvbGUubG9nKCdrZXk6ICcsIGtleSlcbiAgLy8gY3JlYXRlcyBhbiBvYmplY3Qgb3V0IG9mIHRoZSB0YXJnZXQgcGFzc2VkXG4gIGNvbnN0IHRhcmdldE1hcCA9IHRhcmdldCBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXG4gIGNvbnN0IGludGVybmFsSW5zdGFuY2UgPSBrZXkgPyB0YXJnZXRNYXBba2V5XSA6IG51bGw7XG4gIGNvbnNvbGUubG9nKCdSZWFjdCBOb2RlIGlmIEZvdW5kOiAnLCBpbnRlcm5hbEluc3RhbmNlKVxuICBpZiAoaW50ZXJuYWxJbnN0YW5jZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcblxuICAvLyBjb25zb2xlLmxvZygnaW50ZXJuYWxJbnN0YW5jZTI6ICcsIGludGVybmFsSW5zdGFuY2UpXG4gIC8vIHJldHVybiBpbnRlcm5hbEluc3RhbmNlLl9kZWJ1Z093bmVyXG4gIC8vICAgPyBpbnRlcm5hbEluc3RhbmNlLl9kZWJ1Z093bmVyLnN0YXRlTm9kZVxuICAvLyAgIDogaW50ZXJuYWxJbnN0YW5jZS5yZXR1cm4uc3RhdGVOb2RlO1xuXG4gIHJldHVybiBpbnRlcm5hbEluc3RhbmNlO1xuXG4gIC8vIGZvciAobGV0IGtleTogc3RyaW5nIGluIHRhcmdldCkge1xuICAvLyAgIGlmIChrZXkuc3RhcnRzV2l0aChcIl9fcmVhY3RJbnRlcm5hbEluc3RhbmNlJFwiKSkge1xuICAvLyAgICAgLy8gY29uc29sZS5sb2coJ2tleXMgaW4gdGhlIGZpbmQgUmVhY3RFbGVtZW50JywgdGFyZ2V0W2tleV0pXG4gIC8vICAgICByZXR1cm4gdGFyZ2V0W2tleV07XG4gIC8vICAgfVxuICAvLyB9XG4gIC8vIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnVuY3Rpb25TdHJpbmdpZnkob2JqOiBhbnkpOiB2b2lkIHtcbiAgZm9yIChsZXQgayBpbiBvYmopIHtcbiAgICBpZiAob2JqW2tdICYmIHt9LnRvU3RyaW5nLmNhbGwob2JqW2tdKSA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBvYmpba10gPSBcIlwiICsgb2JqW2tdO1xuICAgICAgICBvYmpba10gPSBcIltGdW5jdGlvbl1cIlxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc3RyaW5naWZ5aW5nIHByb3BcIiwgZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN0cmlwRXh0cmFDb21wb25lbnRQcm9wcyhvYmopO1xufVxuXG5cblxuZnVuY3Rpb24gc3RyaXBFeHRyYUNvbXBvbmVudFByb3BzKHByb3BzOiBhbnkpOiB2b2lkIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BzKTtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGlmIChcbiAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9wc1trZXldKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIiAmJlxuICAgICAgKHByb3BzW2tleV0uaGFzT3duUHJvcGVydHkoXCJfb3duZXJcIikgfHxcbiAgICAgICAga2V5ID09PSBcImlucHV0UmVmXCIgfHxcbiAgICAgICAga2V5ID09PSBcIklucHV0UHJvcHNcIilcbiAgICApIHtcbiAgICAgIGRlbGV0ZSBwcm9wc1trZXldO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRUeXBlLCBSZWNvbmNpbGVUeXBlIH0gZnJvbSBcIi4vdHlwZXMvRXZlbnRUeXBlXCI7XG5pbXBvcnQgeyBSZWNvcmRlckNvbmZpZyB9IGZyb20gXCIuL3R5cGVzL1JlY29yZGVyQ29uZmlnXCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgcmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnM6IGJvb2xlYW47XG4gICAgZGF0YUxheWVyOiBhbnlbXTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFJlY29yZGVyIHtcbiAgcHJpdmF0ZSBldmVudENhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiBhbnk7XG4gIHByaXZhdGUgcmVjb25jaWxlQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IGFueTtcbiAgcHJpdmF0ZSByZWNvcmRFdmVudHM6IEV2ZW50VHlwZVtdID0gW107XG4gIHByaXZhdGUgcmVjb25jaWxlRXZlbnRzOiBSZWNvbmNpbGVUeXBlW10gPSBbXCJibHVyXCIsIFwiZm9jdXNcIiwgXCJjaGFuZ2VcIl07XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBSZWNvcmRlckNvbmZpZykge1xuICAgIGNvbnN0IHtcbiAgICAgIGV2ZW50Q2FsbGJhY2ssXG4gICAgICByZWNvbmNpbGVDYWxsYmFjayxcbiAgICAgIHJlY29yZEV2ZW50cyxcbiAgICAgIHJlY29uY2lsZUV2ZW50cyA9IG51bGwsXG4gICAgfSA9IGNvbmZpZztcbiAgICB0aGlzLmV2ZW50Q2FsbGJhY2sgPSBldmVudENhbGxiYWNrO1xuICAgIHRoaXMucmVjb25jaWxlQ2FsbGJhY2sgPSByZWNvbmNpbGVDYWxsYmFjaztcbiAgICB0aGlzLnJlY29yZEV2ZW50cyA9IHJlY29yZEV2ZW50cztcbiAgICBpZiAocmVjb25jaWxlRXZlbnRzKSB7XG4gICAgICB0aGlzLnJlY29uY2lsZUV2ZW50cyA9IHJlY29uY2lsZUV2ZW50cztcbiAgICB9XG4gIH1cblxuICBhZGRBbGxMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmV2ZW50Q2FsbGJhY2ssIHRydWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZWNvbmNpbGVFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLnJlY29uY2lsZUNhbGxiYWNrLCB0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZW1vdmVBbGxMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgdGhpcy5yZWNvcmRFdmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmV2ZW50Q2FsbGJhY2ssIHRydWUpO1xuICAgIH0pO1xuICAgIHRoaXMucmVjb25jaWxlRXZlbnRzLmZvckVhY2goKGV2ZW50OiBSZWNvbmNpbGVUeXBlKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5yZWNvbmNpbGVDYWxsYmFjaywgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgc3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cucmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMuYWRkQWxsTGlzdGVuZXJzKCk7XG4gICAgICB3aW5kb3cucmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnMgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBzdG9wID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cucmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnMpIHtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICB3aW5kb3cucmVjb3JkZXJBZGRlZENvbnRyb2xMaXN0ZW5lcnMgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBmaW5kUmVhY3RFbGVtZW50LFxuICBnZXRDb29yZGluYXRlcyxcbiAgZ2V0Q29tcG9uZW50TmFtZSxcbiAgZ2V0Q29tcG9uZW50UHJvcHMsXG4gIGdldENvbXBvbmVudEZpbGVOYW1lXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW1wb3J0IEV2ZW50UmVjb3JkZXIgZnJvbSBcIi4vZXZlbnQtcmVjb3JkZXJcIjtcbmltcG9ydCBDbGllbnRJbnRlcmZhY2UgZnJvbSBcIi4vdHlwZXMvQ2xpZW50XCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi90eXBlcy9NZXNzYWdlXCI7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi90eXBlcy9FdmVudFR5cGVcIjtcblxuaW50ZXJmYWNlIENvbXBvbmVudCB7fVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc3NlcnRseUNsaWVudCBpbXBsZW1lbnRzIENsaWVudEludGVyZmFjZSB7XG4gIGV2ZW50c1RvUmVjb3JkOiBFdmVudFR5cGVbXSA9IFtcImNsaWNrXCIsIFwiY2hhbmdlXCJdO1xuXG4gIHByaXZhdGUgZXZlbnRSZWNvcmRlcjogRXZlbnRSZWNvcmRlcjtcbiAgcHJpdmF0ZSBjb21wb25lbnRFdmVudENhY2hlOiBNZXNzYWdlW10gPSBbXTtcbiAgcHJpdmF0ZSBwcmV2aW91c0NvbXBvbmVudDogQ29tcG9uZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNNc2c6IE1lc3NhZ2UgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmV2ZW50UmVjb3JkZXIgPSBuZXcgRXZlbnRSZWNvcmRlcih7XG4gICAgICByZWNvcmRFdmVudHM6IHRoaXMuZXZlbnRzVG9SZWNvcmQsXG4gICAgICBldmVudENhbGxiYWNrOiB0aGlzLnJlY29yZEV2ZW50LFxuICAgICAgcmVjb25jaWxlQ2FsbGJhY2s6IHRoaXMucmVjb25jaWxlRXZlbnRDYWNoZSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMuZXZlbnRSZWNvcmRlci5zdGFydCgpO1xuICB9O1xuXG4gIHN0b3AgPSAoKSA9PiB7XG4gICAgdGhpcy5ldmVudFJlY29yZGVyLnN0b3AoKTtcbiAgfTtcblxuICBjbGVhckV2ZW50Q2FjaGUgPSAoKSA9PiB7XG4gICAgdGhpcy5jb21wb25lbnRFdmVudENhY2hlID0gW107XG4gIH07XG5cbiAgcmVjb25jaWxlRXZlbnRDYWNoZSA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICBjb25zdCByZWFjdENvbXBvbmVudCA9IGV2ZW50LnRhcmdldCA/IGZpbmRSZWFjdEVsZW1lbnQoZXZlbnQudGFyZ2V0KSA6IG51bGw7XG4gICAgaWYgKHJlYWN0Q29tcG9uZW50ICE9PSB0aGlzLnByZXZpb3VzQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudEV2ZW50Q2FjaGUuZm9yRWFjaCgobXNnKSA9PiB7XG4gICAgICAgIHRoaXMuc2VuZEV2ZW50KG1zZyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2xlYXJFdmVudENhY2hlKCk7XG4gICAgfVxuICB9O1xuXG4gIGdldE1lc3NhZ2UgPSAocmVhY3RDb21wb25lbnQ6IGFueSwgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBFdmVudCk6IE1lc3NhZ2UgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xuICAgIGNvbnN0IGlucHV0VGFyZ2V0ID0gdGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgbGlua1RhcmdldCA9IHRhcmdldCBhcyBIVE1MTGlua0VsZW1lbnQ7XG5cbiAgICBjb25zdCBwcm9wcyA9IGdldENvbXBvbmVudFByb3BzKHJlYWN0Q29tcG9uZW50KTtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiBldmVudC50eXBlLFxuICAgICAgY2hlY2tlZDogZXZlbnQ/LnRhcmdldD8uaGFzT3duUHJvcGVydHkoXCJjaGVja2VkXCIpXG4gICAgICAgID8gaW5wdXRUYXJnZXQuY2hlY2tlZFxuICAgICAgICA6IG51bGwsXG4gICAgICBjb21wb25lbnROYW1lOiBnZXRDb21wb25lbnROYW1lKHJlYWN0Q29tcG9uZW50Py5fZGVidWdPd25lciksXG4gICAgICBjb29yZGluYXRlczogZ2V0Q29vcmRpbmF0ZXMoZXZlbnQpLFxuICAgICAgLy8gZmlsZW5hbWU6IHJlYWN0Q29tcG9uZW50Py5fZGVidWdTb3VyY2U/LmZpbGVOYW1lLFxuICAgICAgZmlsZW5hbWU6IGdldENvbXBvbmVudEZpbGVOYW1lKHJlYWN0Q29tcG9uZW50LDEwKT8uZmlsZW5hbWUsXG4gICAgICBsaW5lbnVtYmVyOiBnZXRDb21wb25lbnRGaWxlTmFtZShyZWFjdENvbXBvbmVudCwxMCk/LmxpbmVudW1iZXIsXG4gICAgICBocmVmOiBsaW5rVGFyZ2V0LmhyZWYgPyBsaW5rVGFyZ2V0LmhyZWYgOiBudWxsLFxuICAgICAga2V5Q29kZTogKGV2ZW50IGFzIEtleWJvYXJkRXZlbnQpLmtleUNvZGVcbiAgICAgICAgPyAoZXZlbnQgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZVxuICAgICAgICA6IG51bGwsXG4gICAgICBwcm9wcyxcbiAgICAgIHRhZ05hbWU6IGlucHV0VGFyZ2V0LnRhZ05hbWUsXG4gICAgICB0YWdUeXBlOiBpbnB1dFRhcmdldC50eXBlLFxuICAgICAgdGV4dENvbnRlbnQ6IGlucHV0VGFyZ2V0LnRleHRDb250ZW50IHx8IGlucHV0VGFyZ2V0LmlubmVyVGV4dCxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICB2YWx1ZTogaW5wdXRUYXJnZXQudmFsdWUsXG4gICAgICB3cml0ZVRlc3RMb2NhdGlvbjogJydcbiAgICB9O1xuICB9O1xuXG4gIHJlY29yZEV2ZW50ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IG5vZGVUYXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZTtcblxuICAgIGlmICh0aGlzLnByZXZpb3VzTXNnICYmIHRoaXMucHJldmlvdXNNc2cudGltZXN0YW1wID09PSBldmVudC50aW1lU3RhbXApXG4gICAgICByZXR1cm47XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibG9hZFwiICYmIG5vZGVUYXJnZXQubm9kZU5hbWUgPT09IFwiI2RvY3VtZW50XCIpIHJldHVybjtcblxuICAgIGlmICghZXZlbnQudGFyZ2V0KSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMucHJldmlvdXNNc2cpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChldmVudC50eXBlID09PSBcImNoYW5nZVwiIHx8IGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIikgJiZcbiAgICAgICAgICB0aGlzLnByZXZpb3VzTXNnICYmXG4gICAgICAgICAgdGhpcy5wcmV2aW91c01zZy5hY3Rpb24gPT09IFwiY2xpY2tcIiAmJlxuICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5wcmV2aW91c01zZy50aW1lc3RhbXAgPCAxMDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJtZXNzYWdlIG5vdCBzZW5kIGR1ZSB0byB0aW1lXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFjdENvbXBvbmVudCA9IGZpbmRSZWFjdEVsZW1lbnQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWFjdENvbXBvbmVudDogJywgcmVhY3RDb21wb25lbnQpXG4gICAgICBjb25zdCBtc2c6IE1lc3NhZ2UgPSB0aGlzLmdldE1lc3NhZ2UocmVhY3RDb21wb25lbnQsIGV2ZW50KTtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNvcmQgZXZlbnQgbXNnJywgbXNnKVxuXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RFdmVudFwiLCBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICAgIHRoaXMucHJldmlvdXNNc2cgPSBtc2c7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXRoaXMucHJldmlvdXNDb21wb25lbnQgfHxcbiAgICAgICAgKHRoaXMucHJldmlvdXNDb21wb25lbnQgJiYgdGhpcy5wcmV2aW91c0NvbXBvbmVudCA9PT0gcmVhY3RDb21wb25lbnQpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c0NvbXBvbmVudCA9IHJlYWN0Q29tcG9uZW50O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wcmV2aW91c0NvbXBvbmVudCAmJlxuICAgICAgICAgIG1zZy5jaGVja2VkICE9PSBudWxsICYmXG4gICAgICAgICAgbXNnLmFjdGlvbiA9PT0gXCJjbGlja1wiXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuc2VuZEV2ZW50KG1zZyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50RXZlbnRDYWNoZS5wdXNoKG1zZyk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbGVhckV2ZW50Q2FjaGUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2aW91c0NvbXBvbmVudCA9IHJlYWN0Q29tcG9uZW50O1xuXG4gICAgICB0aGlzLnNlbmRFdmVudChtc2cpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZWNvcmRpbmcgZXZlbnRcIiwgZSk7XG4gICAgfVxuICB9O1xuXG4gIHNlbmRFdmVudCA9IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XG4gICAgLy8gY29uc3QgYWNjb3VudElkID0gd2luZG93W1wiZGF0YUxheWVyXCJdWzBdW1wiYXBpS2V5XCJdO1xuICAgIGNvbnN0IGFjY291bnRJZCA9ICh3aW5kb3cgYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfSlbXCJkYXRhTGF5ZXJcIl1bMF1bXCJhcGlLZXlcIl1cbiAgICBjb25zdCB3cml0ZUxvY2F0aW9uID0gKHdpbmRvdyBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9KVtcImRhdGFMYXllclwiXVswXVtcInRlc3RMb2NhdGlvblwiXVxuICAgIGNvbnN0IHVybCA9IGAvL2xvY2FsaG9zdDozMDAyL2FwaS9hY2NvdW50cy8ke2FjY291bnRJZH0vZXZlbnRzL2A7XG4gICAgLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIG1lc3NhZ2U6ICcsIG1lc3NhZ2UpO1xuICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSB3cml0ZSBsb2NhdGlvbjogJywgd3JpdGVMb2NhdGlvbiwgYWNjb3VudElkKTtcbiAgICBtZXNzYWdlLndyaXRlVGVzdExvY2F0aW9uID0gd3JpdGVMb2NhdGlvbjtcbiAgICBcbiAgICBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgIGV2ZW50OiBbbWVzc2FnZV0sXG4gICAgICAgIC8vIFRPRE86IHRlc3Qgc2V0IGlkIHNob3VsZCBiZSBzZXQgd2hlbiBjcmVhdGluZy9sb2FkaW5nIHRlc3RzZXQgaW4gdGhlIHJ1bm5lclxuICAgICAgICBwbGFjZWhvbGRlcjogbnVsbCxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9O1xufVxuXG4oPGFueT53aW5kb3cpLmV2ZW50UmVjb3JkZXIgPSBuZXcgQXNzZXJ0bHlDbGllbnQoKTtcbig8YW55PndpbmRvdykuZXZlbnRSZWNvcmRlci5zdGFydCgpOyJdLCJzb3VyY2VSb290IjoiIn0=