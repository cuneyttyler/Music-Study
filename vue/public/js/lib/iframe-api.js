!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){if(!window.YT)var i={loading:0,loaded:0};if(!window.YTConfig)var r={host:"https://www.youtube.com"};if(!i.loading){i.loading=1;var o=[];i.ready=function(t){i.loaded?t():o.push(t)},window.onYTReady=function(){i.loaded=1;for(var t=0;t<o.length;t++)try{o[t]()}catch(e){}},i.setConfig=function(t){for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e])},n(1)}},function(t,e){!function(){function t(t){t=t.split(".");for(var e,n=Yt;e=t.shift();){if(null==n[e])return null;n=n[e]}return n}function e(){}function n(){throw Error("unimplemented abstract method")}function i(t){var e=typeof t;if("object"==e){if(!t)return"null";if(t instanceof Array)return"array";if(t instanceof Object)return e;var n=Object.prototype.toString.call(t);if("[object Window]"==n)return"object";if("[object Array]"==n||"number"==typeof t.length&&"undefined"!=typeof t.splice&&"undefined"!=typeof t.propertyIsEnumerable&&!t.propertyIsEnumerable("splice"))return"array";if("[object Function]"==n||"undefined"!=typeof t.call&&"undefined"!=typeof t.propertyIsEnumerable&&!t.propertyIsEnumerable("call"))return"function"}else if("function"==e&&"undefined"==typeof t.call)return"object";return e}function r(t){var e=i(t);return"array"==e||"object"==e&&"number"==typeof t.length}function o(t){return"string"==typeof t}function a(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}function s(t,e,n){return t.call.apply(t.bind,arguments)}function u(t,e,n){if(!t)throw Error();if(2<arguments.length){var i=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,i),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function h(t,e,n){return h=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?s:u,h.apply(null,arguments)}function c(t,e){t=t.split(".");var n=Yt;t[0]in n||!n.execScript||n.execScript("var "+t[0]);for(var i;t.length&&(i=t.shift());)t.length||void 0===e?n=n[i]?n[i]:n[i]={}:n[i]=e}function l(t,e){function n(){}n.prototype=e.prototype,t.D=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.W=function(t,n,i){for(var r=Array(arguments.length-2),o=2;o<arguments.length;o++)r[o-2]=arguments[o];return e.prototype[n].apply(t,r)}}function f(t,e){return t<e?-1:t>e?1:0}function d(t,e){t:{for(var n=t.length,i=o(t)?t.split(""):t,r=0;r<n;r++)if(r in i&&e.call(void 0,i[r],r,t)){e=r;break t}e=-1}return 0>e?null:o(t)?t.charAt(e):t[e]}function p(t){return Array.prototype.concat.apply(Array.prototype,arguments)}function v(t){var e=t.length;if(0<e){for(var n=Array(e),i=0;i<e;i++)n[i]=t[i];return n}return[]}function y(t){var e,n=be;for(e in n)if(t.call(void 0,n[e],e,n))return e}function g(t){return-1!=Pt.indexOf(t)}function m(t,e){var n=ne;Object.prototype.hasOwnProperty.call(n,t)||(n[t]=e(t))}function w(){var t=Yt.document;return t?t.documentMode:void 0}function b(t){m(t,function(){for(var e=0,n=Rt(String(ee)).split("."),i=Rt(String(t)).split("."),r=Math.max(n.length,i.length),o=0;0==e&&o<r;o++){var a=n[o]||"",s=i[o]||"";do{if(a=/(\d*)(\D*)(.*)/.exec(a)||["","","",""],s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],0==a[0].length&&0==s[0].length)break;e=f(0==a[1].length?0:parseInt(a[1],10),0==s[1].length?0:parseInt(s[1],10))||f(0==a[2].length,0==s[2].length)||f(a[2],s[2]),a=a[3],s=s[3]}while(0==e)}return 0<=e})}function E(t){var e,n,i,r;if(e=document,e.querySelectorAll&&e.querySelector&&t)return e.querySelectorAll(""+(t?"."+t:""));if(t&&e.getElementsByClassName){var o=e.getElementsByClassName(t);return o}if(o=e.getElementsByTagName("*"),t){for(r={},n=i=0;e=o[n];n++){var a,s=e.className;(a="function"==typeof s.split)&&(a=0<=Bt(s.split(/\s+/),t)),a&&(r[i++]=e)}return r.length=i,r}return o}function S(t,e){for(var n=0;t;){if(e(t))return t;t=t.parentNode,n++}return null}function I(t){Yt.setTimeout(function(){throw t},0)}function T(){var t=Yt.MessageChannel;if("undefined"==typeof t&&"undefined"!=typeof window&&window.postMessage&&window.addEventListener&&!g("Presto")&&(t=function(){var t=document.createElement("IFRAME");t.style.display="none",t.src="",document.documentElement.appendChild(t);var e=t.contentWindow,t=e.document;t.open(),t.write(""),t.close();var n="callImmediate"+Math.random(),i="file:"==e.location.protocol?"*":e.location.protocol+"//"+e.location.host,t=h(function(t){"*"!=i&&t.origin!=i||t.data!=n||this.port1.onmessage()},this);e.addEventListener("message",t,!1),this.port1={},this.port2={postMessage:function(){e.postMessage(n,i)}}}),"undefined"!=typeof t&&!g("Trident")&&!g("MSIE")){var e=new t,n={},i=n;return e.port1.onmessage=function(){if(void 0!==n.next){n=n.next;var t=n.G;n.G=null,t()}},function(t){i.next={G:t},i=i.next,e.port2.postMessage(0)}}return"undefined"!=typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(t){var e=document.createElement("SCRIPT");e.onreadystatechange=function(){e.onreadystatechange=null,e.parentNode.removeChild(e),e=null,t(),t=null},document.documentElement.appendChild(e)}:function(t){Yt.setTimeout(t,0)}}function x(t,e,n){this.f=n,this.c=t,this.g=e,this.b=0,this.a=null}function C(){this.b=this.a=null}function A(){this.next=this.b=this.a=null}function P(t){ce||Y(),le||(ce(),le=!0);var e=fe,n=he.get();n.set(t,void 0),e.b?e.b.next=n:e.a=n,e.b=n}function Y(){var t=Yt.Promise;if(-1!=String(t).indexOf("[native code]")){var e=t.resolve(void 0);ce=function(){e.then(O)}}else ce=function(){var t=O;"function"!=i(Yt.setImmediate)||Yt.Window&&Yt.Window.prototype&&!g("Edge")&&Yt.Window.prototype.setImmediate==Yt.setImmediate?(ae||(ae=T()),ae(t)):Yt.setImmediate(t)}}function O(){for(var t;t=fe.remove();){try{t.a.call(t.b)}catch(e){I(e)}var n=he;n.g(t),n.b<n.f&&(n.b++,t.next=n.a,n.a=t)}le=!1}function N(){this.c=this.c,this.f=this.f}function M(t){N.call(this),this.s=1,this.g=[],this.h=0,this.a=[],this.b={},this.v=!!t}function R(t,e,n){var i=xe;if(t=i.b[t]){var r=i.a;(t=d(t,function(t){return r[t+1]==e&&r[t+2]==n}))&&i.F(t)}}function k(t,e,n){P(function(){t.apply(e,n)})}function D(t,e,n){if("array"==i(e))for(var r=0;r<e.length;r++)D(t,String(e[r]),n);else null!=e&&n.push("&",t,""===e?"":"=",encodeURIComponent(String(e)))}function _(t){var e,n=[];for(e in t)D(e,t[e],n);return n[0]="",n.join("")}function L(t){var e=arguments;if(1<e.length){var n=e[0];ve[n]=e[1]}else for(n in e=e[0])ve[n]=e[n]}function U(t){return"function"==i(t)&&(t=W(t)),window.setInterval(t,250)}function W(t){return t&&window.yterr?function(){try{return t.apply(this,arguments)}catch(e){throw j(e),e}}:t}function j(e,n){var i=t("yt.logging.errors.log");i?i(e,n,void 0,void 0,void 0):(i=[],i="ERRORS"in ve?ve.ERRORS:i,i.push([e,n,void 0,void 0,void 0]),L("ERRORS",i))}function B(t){if(this.type="",this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null,this.charCode=this.keyCode=0,this.shiftKey=this.ctrlKey=this.altKey=!1,this.clientY=this.clientX=0,t=t||window.event){this.a=t;for(var e in t)e in we||(this[e]=t[e]);if((e=t.target||t.srcElement)&&3==e.nodeType&&(e=e.parentNode),this.target=e,e=t.relatedTarget)try{e=e.nodeName?e:null}catch(n){e=null}else"mouseover"==this.type?e=t.fromElement:"mouseout"==this.type&&(e=t.toElement);this.relatedTarget=e,this.clientX=void 0!=t.clientX?t.clientX:t.pageX,this.clientY=void 0!=t.clientY?t.clientY:t.pageY,this.keyCode=t.keyCode?t.keyCode:t.which,this.charCode=t.charCode||("keypress"==this.type?this.keyCode:0),this.altKey=t.altKey,this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey}}function V(t,e,n){return t.addEventListener&&("mouseenter"!=e||"onmouseenter"in document?"mouseleave"!=e||"onmouseenter"in document?"mousewheel"==e&&"MozBoxSizing"in document.documentElement.style&&(e="MozMousePixelScroll"):e="mouseout":e="mouseover"),y(function(i){return i[0]==t&&i[1]==e&&i[2]==n&&0==i[4]})}function K(t,e,n){if(t&&(t.addEventListener||t.attachEvent)){var i=V(t,e,n);if(!i){var r,i=++Ee.count+"",o=!("mouseenter"!=e&&"mouseleave"!=e||!t.addEventListener||"onmouseenter"in document);r=o?function(i){if(i=new B(i),!S(i.relatedTarget,function(e){return e==t}))return i.currentTarget=t,i.type=e,n.call(t,i)}:function(e){return e=new B(e),e.currentTarget=t,n.call(t,e)},r=W(r),t.addEventListener?("mouseenter"==e&&o?e="mouseover":"mouseleave"==e&&o?e="mouseout":"mousewheel"==e&&"MozBoxSizing"in document.documentElement.style&&(e="MozMousePixelScroll"),t.addEventListener(e,r,!1)):t.attachEvent("on"+e,r),be[i]=[t,e,n,r,!1]}}}function F(t){t&&("string"==typeof t&&(t=[t]),Vt(t,function(t){if(t in be){var e=be[t],n=e[0],i=e[1],r=e[3],e=e[4];n.removeEventListener?n.removeEventListener(i,r,e):n.detachEvent&&n.detachEvent("on"+i,r),delete be[t]}}))}function G(t){return Se[t]||(Se[t]=String(t).replace(/\-([a-z])/g,function(t,e){return e.toUpperCase()}))}function z(){Vt(Te,function(t){t()})}function q(t){var e=v(document.getElementsByTagName("yt:"+t));t="yt-"+t;var n=document;return t=v(n.querySelectorAll&&n.querySelector?n.querySelectorAll("."+t):E(t)),p(e,t)}function X(t,e){return"yt:"==t.tagName.toLowerCase().substr(0,3)?t.getAttribute(e):t?t.dataset?t.dataset[G(e)]:t.getAttribute("data-"+e):null}function H(t,e){xe.I.apply(xe,arguments)}function J(t,e,n){if(this.b=e,this.h=this.a=null,this.g=this[Ot]||(this[Ot]=++Nt),this.c=0,this.B=!1,this.w=[],this.f=null,this.s=n,this.v={},e=document,(t=o(t)?e.getElementById(t):t)&&("iframe"!=t.tagName.toLowerCase()&&(e=Z(this,t),this.h=t,(n=t.parentNode)&&n.replaceChild(e,t),t=e),this.a=t,this.a.id||(e=t=this.a,e=e[Ot]||(e[Ot]=++Nt),t.id="widget"+e),Ie[this.a.id]=this,window.postMessage)){this.f=new M,tt(this),t=vt(this.b,"events");for(var i in t)t.hasOwnProperty(i)&&this.addEventListener(i,t[i]);for(var r in Ce)$(this,r)}}function $(t,e){if(e=e.split("."),2==e.length){var n=e[1];t.s==e[0]&&et(t,n)}}function Q(t,e,n){n=n||[],n=Array.prototype.slice.call(n),e={event:"command",func:e,args:n},t.B?t.C(e):t.w.push(e)}function Z(t,e){var n=document.createElement("iframe");e=e.attributes;for(var i=0,r=e.length;i<r;i++){var o=e[i].value;null!=o&&""!=o&&"null"!=o&&n.setAttribute(e[i].name,o)}n.setAttribute("frameBorder",0),n.setAttribute("allowfullscreen",1),n.setAttribute("title","YouTube "+vt(t.b,"title")),(e=vt(t.b,"width"))&&n.setAttribute("width",e),(e=vt(t.b,"height"))&&n.setAttribute("height",e);var a=t.u();return a.enablejsapi=window.postMessage?1:0,window.location.host&&(a.origin=window.location.protocol+"//"+window.location.host),a.widgetid=t.g,window.location.href&&Vt(["debugjs","debugcss"],function(t){var e;e=window.location.href;var n,i=e.search(pe);t:{n=0;for(var r=t.length;0<=(n=e.indexOf(t,n))&&n<i;){var o=e.charCodeAt(n-1);if((38==o||63==o)&&(o=e.charCodeAt(n+r),!o||61==o||38==o||35==o))break t;n+=r+1}n=-1}0>n?e=null:(r=e.indexOf("&",n),(0>r||r>i)&&(r=i),n+=t.length+1,e=decodeURIComponent(e.substr(n,r-n).replace(/\+/g," "))),null===e||(a[t]=e)}),n.src=vt(t.b,"host")+t.o()+"?"+_(a),n}function tt(t){yt(t.b,t,t.g),t.c=U(h(t.H,t)),K(t.a,"load",h(function(){window.clearInterval(this.c),this.c=U(h(this.H,this))},t))}function et(t,e){t.v[e]||(t.v[e]=!0,Q(t,"addEventListener",[e]))}function nt(){}function it(t){if(t instanceof nt)return t;if("function"==typeof t.m)return t.m(!1);if(r(t)){var e=0,n=new nt;return n.next=function(){for(;;){if(e>=t.length)throw Ae;if(e in t)return t[e++];e++}},n}throw Error("Not implemented")}function rt(t,e){if(r(t))try{Vt(t,e,void 0)}catch(n){if(n!==Ae)throw n}else{t=it(t);try{for(;;)e.call(void 0,t.next(),void 0,t)}catch(n){if(n!==Ae)throw n}}}function ot(t){if(r(t))return v(t);t=it(t);var e=[];return rt(t,function(t){e.push(t)}),e}function at(){}function st(){}function ut(t){this.a=t}function ht(t){if(t.a)try{t.a.setItem("__sak","1"),t.a.removeItem("__sak")}catch(e){}}function ct(){var t=null;try{t=window.localStorage||null}catch(e){}this.a=t}function lt(){var t=null;try{t=window.sessionStorage||null}catch(e){}this.a=t}function ft(t){return(0==t.search("cue")||0==t.search("load"))&&"loadModule"!=t}function dt(t){return 0==t.search("get")||0==t.search("is")}function pt(t){this.c=t||{},this.a={},this.a.host="https://www.youtube.com",this.a.title="",this.f=this.b=!1}function vt(t,e){t=[t.c,window.YTConfig||{},t.a];for(var n=0;n<t.length;n++){var i=t[n][e];if(void 0!=i)return i}return null}function yt(t,e,n){Pe||(Pe={},K(window,"message",h(t.g,t))),Pe[n]=e}function gt(t){pt.call(this,t),this.a.title="video player",this.a.videoId="",this.a.width=640,this.a.height=360}function mt(t,e){e=new gt(e),J.call(this,t,e,"player"),this.i={},this.j={}}function wt(t){if("iframe"!=t.tagName.toLowerCase()){var e=X(t,"videoid");if(e){var n=X(t,"width"),i=X(t,"height");new mt(t,{videoId:e,width:n,height:i})}}}function bt(t,e){if(a(e))for(var n in e)t.j[n]=e[n]}function Et(t,e){Vt(e,function(t){this[t]||("getCurrentTime"==t?this[t]=function(){var t=this.j.currentTime;if(1==this.j.playerState){var e=(Mt()/1e3-this.j.currentTimeLastUpdated_)*this.j.playbackRate;0<e&&(t+=Math.min(e,1))}return t}:ft(t)?this[t]=function(){return this.j={},this.i={},Q(this,t,arguments),this}:dt(t)?this[t]=function(){var e=0;return 0==t.search("get")?e=3:0==t.search("is")&&(e=2),this.j[t.charAt(e).toLowerCase()+t.substr(e+1)]}:this[t]=function(){return Q(this,t,arguments),this})},t)}function St(t){pt.call(this,t),this.a.title="Thumbnail",this.a.videoId="",this.a.width=120,this.a.height=68}function It(t,e){e=new St(e),J.call(this,t,e,"thumbnail")}function Tt(t){if("iframe"!=t.tagName.toLowerCase()){var e=X(t,"videoid");if(e){e={videoId:e,events:{}},e.width=X(t,"width"),e.height=X(t,"height"),e.thumbWidth=X(t,"thumb-width"),e.thumbHeight=X(t,"thumb-height"),e.thumbAlign=X(t,"thumb-align");var n=X(t,"onclick");n&&(e.events.onClick=n),new It(t,e)}}}function xt(t){pt.call(this,t),this.a.host="https://www.youtube.com",this.a.title="upload widget",this.a.width=640,this.a.height=.67*vt(this,"width")}function Ct(t,e){e=new xt(e),J.call(this,t,e,"upload")}var At,Pt,Yt=this,Ot="closure_uid_"+(1e9*Math.random()>>>0),Nt=0,Mt=Date.now||function(){return+new Date},Rt=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},kt=/&/g,Dt=/</g,_t=/>/g,Lt=/"/g,Ut=/'/g,Wt=/\x00/g,jt=/[\x00&<>"']/,Bt=Array.prototype.indexOf?function(t,e,n){return Array.prototype.indexOf.call(t,e,n)}:function(t,e,n){if(n=null==n?0:0>n?Math.max(0,t.length+n):n,o(t))return o(e)&&1==e.length?t.indexOf(e,n):-1;for(;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},Vt=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){for(var i=t.length,r=o(t)?t.split(""):t,a=0;a<i;a++)a in r&&e.call(n,r[a],a,t)};t:{var Kt=Yt.navigator;if(Kt){var Ft=Kt.userAgent;if(Ft){Pt=Ft;break t}}Pt=""}var Gt,zt=g("Opera"),qt=g("Trident")||g("MSIE"),Xt=g("Edge"),Ht=g("Gecko")&&!(-1!=Pt.toLowerCase().indexOf("webkit")&&!g("Edge"))&&!(g("Trident")||g("MSIE"))&&!g("Edge"),Jt=-1!=Pt.toLowerCase().indexOf("webkit")&&!g("Edge");t:{var $t="",Qt=function(){var t=Pt;return Ht?/rv\:([^\);]+)(\)|;)/.exec(t):Xt?/Edge\/([\d\.]+)/.exec(t):qt?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t):Jt?/WebKit\/(\S+)/.exec(t):zt?/(?:Version)[ \/]?(\S+)/.exec(t):void 0}();if(Qt&&($t=Qt?Qt[1]:""),qt){var Zt=w();if(null!=Zt&&Zt>parseFloat($t)){Gt=String(Zt);break t}}Gt=$t}var te,ee=Gt,ne={},ie=Yt.document;te=ie&&qt?w()||("CSS1Compat"==ie.compatMode?parseInt(ee,10):5):void 0;var re;if(!(re=!Ht&&!qt)){var oe;(oe=qt)&&(oe=9<=Number(te)),re=oe}re||Ht&&b("1.9.1"),qt&&b("9");var ae,se=Yt.JSON.parse,ue=Yt.JSON.stringify;x.prototype.get=function(){var t;return 0<this.b?(this.b--,t=this.a,this.a=t.next,t.next=null):t=this.c(),t};var he=new x(function(){return new A},function(t){t.reset()},100);C.prototype.remove=function(){var t=null;return this.a&&(t=this.a,this.a=this.a.next,this.a||(this.b=null),t.next=null),t},A.prototype.set=function(t,e){this.a=t,this.b=e,this.next=null},A.prototype.reset=function(){this.next=this.b=this.a=null};var ce,le=!1,fe=new C;N.prototype.c=!1,N.prototype.dispose=function(){this.c||(this.c=!0,this.A())},N.prototype.A=function(){if(this.f)for(;this.f.length;)this.f.shift()()},l(M,N),At=M.prototype,At.subscribe=function(t,e,n){var i=this.b[t];i||(i=this.b[t]=[]);var r=this.s;return this.a[r]=t,this.a[r+1]=e,this.a[r+2]=n,this.s=r+3,i.push(r),r},At.F=function(t){var n=this.a[t];if(n){var i=this.b[n];if(0!=this.h)this.g.push(t),this.a[t+1]=e;else{if(i){var r=Bt(i,t);0<=r&&Array.prototype.splice.call(i,r,1)}delete this.a[t],delete this.a[t+1],delete this.a[t+2]}}return!!n},At.I=function(t,e){var n=this.b[t];if(n){for(var i=Array(arguments.length-1),r=1,o=arguments.length;r<o;r++)i[r-1]=arguments[r];if(this.v)for(r=0;r<n.length;r++){var a=n[r];k(this.a[a+1],this.a[a+2],i)}else{this.h++;try{for(r=0,o=n.length;r<o;r++)a=n[r],this.a[a+1].apply(this.a[a+2],i)}finally{if(this.h--,0<this.g.length&&0==this.h)for(;n=this.g.pop();)this.F(n)}}return 0!=r}return!1},At.clear=function(t){if(t){var e=this.b[t];e&&(Vt(e,this.F,this),delete this.b[t])}else this.a.length=0,this.b={}},At.A=function(){M.D.A.call(this),this.clear(),this.g.length=0};var de=/^(?:([^:\/?#.]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/#?]*?)(?::([0-9]+))?(?=[\/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,pe=/#|$/,ve=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};c("yt.config_",ve),c("yt.tokens_",window.yt&&window.yt.tokens_||{});var ye=window.yt&&window.yt.msgs_||t("window.ytcfg.msgs")||{};c("yt.msgs_",ye);var ge=t("yt.dom.getNextId_");if(!ge){ge=function(){return++me},c("yt.dom.getNextId_",ge);var me=0}B.prototype.preventDefault=function(){this.a&&(this.a.returnValue=!1,this.a.preventDefault&&this.a.preventDefault())},B.prototype.stopPropagation=function(){this.a&&(this.a.cancelBubble=!0,this.a.stopPropagation&&this.a.stopPropagation())},B.prototype.stopImmediatePropagation=function(){this.a&&(this.a.cancelBubble=!0,this.a.stopImmediatePropagation&&this.a.stopImmediatePropagation())};var we={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1},be=t("yt.events.listeners_")||{};c("yt.events.listeners_",be);var Ee=t("yt.events.counter_")||{count:0};c("yt.events.counter_",Ee);var Se={},Ie={},Te=[],xe=new M,Ce={};At=J.prototype,At.S=function(t,e){return this.a.width=t,this.a.height=e,this},At.R=function(){return this.a},At.J=function(t){this.l(t.event,t)},At.addEventListener=function(t,e){var n=e;return"string"==typeof e&&(n=function(){window[e].apply(window,arguments)}),this.f.subscribe(t,n),et(this,t),this},At.P=function(){this.a.id&&(Ie[this.a.id]=null);var t=this.f;if(t&&"function"==typeof t.dispose&&t.dispose(),this.h){var t=this.a,e=t.parentNode;e&&e.replaceChild(this.h,t)}else(t=this.a)&&t.parentNode&&t.parentNode.removeChild(t);Pe&&(Pe[this.g]=null),this.b=null;var n,t=this.a;for(n in be)be[n][0]==t&&F(n);this.h=this.a=null},At.o=n,At.u=function(){return{}},At.l=function(t,e){this.f.c||(e={target:this,data:e},this.f.I(t,e),H(this.s+"."+t,e))},At.H=function(){this.a&&this.a.contentWindow?this.C({event:"listening"}):window.clearInterval(this.c)},At.C=function(t){t.id=this.g,t.channel="widget",t=ue(t);var e;e=this.b;var n,i=this.a.src.match(de);n=i[1];var r=i[2],o=i[3],i=i[4],a="";for(n&&(a+=n+":"),o&&(a+="//",r&&(a+=r+"@"),a+=o,i&&(a+=":"+i)),n=a,e=0==n.indexOf("https:")?[n]:e.b?[n.replace("http:","https:")]:e.f?[n]:[n,n.replace("http:","https:")],n=0;n<e.length;n++)try{this.a.contentWindow.postMessage(t,e[n])}catch(s){if(!s.name||"SyntaxError"!=s.name)throw s;j(s,"WARNING")}};var Ae="StopIteration"in Yt?Yt.StopIteration:{message:"StopIteration",stack:""};nt.prototype.next=function(){throw Ae},nt.prototype.m=function(){return this},at.prototype.set=n,at.prototype.get=n,at.prototype.remove=n,l(st,at),st.prototype.m=n,st.prototype.clear=function(){var t=ot(this.m(!0)),e=this;Vt(t,function(t){e.remove(t)})},l(ut,st),At=ut.prototype,At.set=function(t,e){try{this.a.setItem(t,e)}catch(n){if(0==this.a.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded"}},At.get=function(t){if(t=this.a.getItem(t),!o(t)&&null!==t)throw"Storage mechanism: Invalid value was encountered";return t},At.remove=function(t){this.a.removeItem(t)},At.m=function(t){var e=0,n=this.a,i=new nt;return i.next=function(){if(e>=n.length)throw Ae;var i=n.key(e++);if(t)return i;if(i=n.getItem(i),!o(i))throw"Storage mechanism: Invalid value was encountered";return i},i},At.clear=function(){this.a.clear()},At.key=function(t){return this.a.key(t)},l(ct,ut),l(lt,ut),ht(new ct),ht(new lt);var Pe=null;pt.prototype.g=function(t){if(t.origin==vt(this,"host")||t.origin==vt(this,"host").replace(/^http:/,"https:")){var e;try{e=se(t.data)}catch(n){return}this.f=!0,this.b||0!=t.origin.indexOf("https:")||(this.b=!0),(t=Pe[e.id])&&(t.B=!0,t.B&&(Vt(t.w,t.C,t),t.w.length=0),t.J(e))}},l(gt,pt),l(mt,J),At=mt.prototype,At.o=function(){return"/embed/"+vt(this.b,"videoId")},At.u=function(){var t=vt(this.b,"playerVars");if(t){var e,n={};for(e in t)n[e]=t[e];t=n}else t={};return window!=window.top&&document.referrer&&(t.widget_referrer=document.referrer.substring(0,256)),t},At.J=function(t){var e=t.event;switch(t=t.info,e){case"apiInfoDelivery":if(a(t))for(var n in t)this.i[n]=t[n];break;case"infoDelivery":bt(this,t);break;case"initialDelivery":window.clearInterval(this.c),this.j={},this.i={},Et(this,t.apiInterface),bt(this,t);break;default:this.l(e,t)}},At.V=function(){var t=vt(this.b,"host")+this.o(),e='<iframe width="'+parseInt(vt(this.b,"width"),10)+'" height="'+parseInt(vt(this.b,"height"),10)+'" src="';return jt.test(t)&&(-1!=t.indexOf("&")&&(t=t.replace(kt,"&amp;")),-1!=t.indexOf("<")&&(t=t.replace(Dt,"&lt;")),-1!=t.indexOf(">")&&(t=t.replace(_t,"&gt;")),-1!=t.indexOf('"')&&(t=t.replace(Lt,"&quot;")),-1!=t.indexOf("'")&&(t=t.replace(Ut,"&#39;")),-1!=t.indexOf("\0")&&(t=t.replace(Wt,"&#0;"))),e+t+'" frameborder="0" allowfullscreen></iframe>'},At.U=function(t){return this.i.namespaces?t?this.i[t].options||[]:this.i.namespaces||[]:[]},At.T=function(t,e){if(this.i.namespaces&&t&&e)return this.i[t][e]},l(St,pt),l(It,J),It.prototype.o=function(){return"/embed/"+vt(this.b,"videoId")},It.prototype.u=function(){return{player:0,thumb_width:vt(this.b,"thumbWidth"),thumb_height:vt(this.b,"thumbHeight"),thumb_align:vt(this.b,"thumbAlign")}},It.prototype.l=function(t,e){It.D.l.call(this,t,e?e.info:void 0)},l(xt,pt),l(Ct,J),At=Ct.prototype,At.o=function(){return"/upload_embed"},At.u=function(){var t={},e=vt(this.b,"webcamOnly");return null!=e&&(t.webcam_only=e),t},At.l=function(t,e){Ct.D.l.call(this,t,e),"onApiReady"==t&&Q(this,"hostWindowReady")},At.K=function(t){Q(this,"setVideoDescription",arguments)},At.M=function(t){Q(this,"setVideoKeywords",arguments)},At.N=function(t){Q(this,"setVideoPrivacy",arguments)},At.L=function(t){Q(this,"setVideoDraftPrivacy",arguments)},At.O=function(t){Q(this,"setVideoTitle",arguments)},c("YT.PlayerState.UNSTARTED",-1),c("YT.PlayerState.ENDED",0),c("YT.PlayerState.PLAYING",1),c("YT.PlayerState.PAUSED",2),c("YT.PlayerState.BUFFERING",3),c("YT.PlayerState.CUED",5),c("YT.UploadWidgetEvent.API_READY","onApiReady"),c("YT.UploadWidgetEvent.UPLOAD_SUCCESS","onUploadSuccess"),c("YT.UploadWidgetEvent.PROCESSING_COMPLETE","onProcessingComplete"),c("YT.UploadWidgetEvent.STATE_CHANGE","onStateChange"),c("YT.UploadWidgetState.IDLE",0),c("YT.UploadWidgetState.PENDING",1),c("YT.UploadWidgetState.ERROR",2),c("YT.UploadWidgetState.PLAYBACK",3),c("YT.UploadWidgetState.RECORDING",4),c("YT.UploadWidgetState.STOPPED",5),c("YT.get",function(t){return Ie[t]}),c("YT.scan",z),c("YT.subscribe",function(t,e,n){xe.subscribe(t,e,n),Ce[t]=!0;for(var i in Ie)$(Ie[i],t)}),c("YT.unsubscribe",function(t,e,n){R(t,e,n)}),c("YT.Player",mt),c("YT.Thumbnail",It),c("YT.UploadWidget",Ct),J.prototype.destroy=J.prototype.P,J.prototype.setSize=J.prototype.S,J.prototype.getIframe=J.prototype.R,J.prototype.addEventListener=J.prototype.addEventListener,mt.prototype.getVideoEmbedCode=mt.prototype.V,mt.prototype.getOptions=mt.prototype.U,mt.prototype.getOption=mt.prototype.T,Ct.prototype.setVideoDescription=Ct.prototype.K,Ct.prototype.setVideoKeywords=Ct.prototype.M,Ct.prototype.setVideoPrivacy=Ct.prototype.N,Ct.prototype.setVideoTitle=Ct.prototype.O,Ct.prototype.setVideoDraftPrivacy=Ct.prototype.L,Te.push(function(){var t=q("player");Vt(t,wt)}),Te.push(function(){var t=q("thumbnail");Vt(t,Tt)}),"undefined"!=typeof YTConfig&&YTConfig.parsetags&&"onload"!=YTConfig.parsetags||z();var Ye=t("onYTReady");Ye&&Ye();var Oe=t("onYouTubeIframeAPIReady");Oe&&Oe();var Ne=t("onYouTubePlayerAPIReady");Ne&&Ne()}()}]);