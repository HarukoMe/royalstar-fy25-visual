(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();function Ou(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ic={exports:{}},Or={},rc={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Si=Symbol.for("react.element"),_u=Symbol.for("react.portal"),Bu=Symbol.for("react.fragment"),Uu=Symbol.for("react.strict_mode"),zu=Symbol.for("react.profiler"),$u=Symbol.for("react.provider"),Hu=Symbol.for("react.context"),Ku=Symbol.for("react.forward_ref"),Gu=Symbol.for("react.suspense"),Vu=Symbol.for("react.memo"),Qu=Symbol.for("react.lazy"),Ea=Symbol.iterator;function Yu(e){return e===null||typeof e!="object"?null:(e=Ea&&e[Ea]||e["@@iterator"],typeof e=="function"?e:null)}var oc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},sc=Object.assign,ac={};function Mt(e,n,t){this.props=e,this.context=n,this.refs=ac,this.updater=t||oc}Mt.prototype.isReactComponent={};Mt.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Mt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function lc(){}lc.prototype=Mt.prototype;function Ls(e,n,t){this.props=e,this.context=n,this.refs=ac,this.updater=t||oc}var Ns=Ls.prototype=new lc;Ns.constructor=Ls;sc(Ns,Mt.prototype);Ns.isPureReactComponent=!0;var ja=Array.isArray,cc=Object.prototype.hasOwnProperty,Fs={current:null},dc={key:!0,ref:!0,__self:!0,__source:!0};function uc(e,n,t){var i,r={},o=null,s=null;if(n!=null)for(i in n.ref!==void 0&&(s=n.ref),n.key!==void 0&&(o=""+n.key),n)cc.call(n,i)&&!dc.hasOwnProperty(i)&&(r[i]=n[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(e&&e.defaultProps)for(i in a=e.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Si,type:e,key:o,ref:s,props:r,_owner:Fs.current}}function Ju(e,n){return{$$typeof:Si,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Ms(e){return typeof e=="object"&&e!==null&&e.$$typeof===Si}function Xu(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var La=/\/+/g;function ao(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Xu(""+e.key):n.toString(36)}function Zi(e,n,t,i,r){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Si:case _u:s=!0}}if(s)return s=e,r=r(s),e=i===""?"."+ao(s,0):i,ja(r)?(t="",e!=null&&(t=e.replace(La,"$&/")+"/"),Zi(r,n,t,"",function(c){return c})):r!=null&&(Ms(r)&&(r=Ju(r,t+(!r.key||s&&s.key===r.key?"":(""+r.key).replace(La,"$&/")+"/")+e)),n.push(r)),1;if(s=0,i=i===""?".":i+":",ja(e))for(var a=0;a<e.length;a++){o=e[a];var l=i+ao(o,a);s+=Zi(o,n,t,l,r)}else if(l=Yu(e),typeof l=="function")for(e=l.call(e),a=0;!(o=e.next()).done;)o=o.value,l=i+ao(o,a++),s+=Zi(o,n,t,l,r);else if(o==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return s}function Fi(e,n,t){if(e==null)return e;var i=[],r=0;return Zi(e,i,"","",function(o){return n.call(t,o,r++)}),i}function Zu(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var be={current:null},er={transition:null},ep={ReactCurrentDispatcher:be,ReactCurrentBatchConfig:er,ReactCurrentOwner:Fs};function pc(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:Fi,forEach:function(e,n,t){Fi(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return Fi(e,function(){n++}),n},toArray:function(e){return Fi(e,function(n){return n})||[]},only:function(e){if(!Ms(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=Mt;R.Fragment=Bu;R.Profiler=zu;R.PureComponent=Ls;R.StrictMode=Uu;R.Suspense=Gu;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ep;R.act=pc;R.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=sc({},e.props),r=e.key,o=e.ref,s=e._owner;if(n!=null){if(n.ref!==void 0&&(o=n.ref,s=Fs.current),n.key!==void 0&&(r=""+n.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in n)cc.call(n,l)&&!dc.hasOwnProperty(l)&&(i[l]=n[l]===void 0&&a!==void 0?a[l]:n[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Si,type:e.type,key:r,ref:o,props:i,_owner:s}};R.createContext=function(e){return e={$$typeof:Hu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:$u,_context:e},e.Consumer=e};R.createElement=uc;R.createFactory=function(e){var n=uc.bind(null,e);return n.type=e,n};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:Ku,render:e}};R.isValidElement=Ms;R.lazy=function(e){return{$$typeof:Qu,_payload:{_status:-1,_result:e},_init:Zu}};R.memo=function(e,n){return{$$typeof:Vu,type:e,compare:n===void 0?null:n}};R.startTransition=function(e){var n=er.transition;er.transition={};try{e()}finally{er.transition=n}};R.unstable_act=pc;R.useCallback=function(e,n){return be.current.useCallback(e,n)};R.useContext=function(e){return be.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return be.current.useDeferredValue(e)};R.useEffect=function(e,n){return be.current.useEffect(e,n)};R.useId=function(){return be.current.useId()};R.useImperativeHandle=function(e,n,t){return be.current.useImperativeHandle(e,n,t)};R.useInsertionEffect=function(e,n){return be.current.useInsertionEffect(e,n)};R.useLayoutEffect=function(e,n){return be.current.useLayoutEffect(e,n)};R.useMemo=function(e,n){return be.current.useMemo(e,n)};R.useReducer=function(e,n,t){return be.current.useReducer(e,n,t)};R.useRef=function(e){return be.current.useRef(e)};R.useState=function(e){return be.current.useState(e)};R.useSyncExternalStore=function(e,n,t){return be.current.useSyncExternalStore(e,n,t)};R.useTransition=function(){return be.current.useTransition()};R.version="18.3.1";rc.exports=R;var W=rc.exports;const np=Ou(W);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tp=W,ip=Symbol.for("react.element"),rp=Symbol.for("react.fragment"),op=Object.prototype.hasOwnProperty,sp=tp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ap={key:!0,ref:!0,__self:!0,__source:!0};function hc(e,n,t){var i,r={},o=null,s=null;t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),n.ref!==void 0&&(s=n.ref);for(i in n)op.call(n,i)&&!ap.hasOwnProperty(i)&&(r[i]=n[i]);if(e&&e.defaultProps)for(i in n=e.defaultProps,n)r[i]===void 0&&(r[i]=n[i]);return{$$typeof:ip,type:e,key:o,ref:s,props:r,_owner:sp.current}}Or.Fragment=rp;Or.jsx=hc;Or.jsxs=hc;ic.exports=Or;var u=ic.exports,qo={},fc={exports:{}},Fe={},mc={exports:{}},yc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(T,D){var M=T.length;T.push(D);e:for(;0<M;){var _=M-1>>>1,Y=T[_];if(0<r(Y,D))T[_]=D,T[M]=Y,M=_;else break e}}function t(T){return T.length===0?null:T[0]}function i(T){if(T.length===0)return null;var D=T[0],M=T.pop();if(M!==D){T[0]=M;e:for(var _=0,Y=T.length,nt=Y>>>1;_<nt;){var en=2*(_+1)-1,fn=T[en],nn=en+1,A=T[nn];if(0>r(fn,M))nn<Y&&0>r(A,fn)?(T[_]=A,T[nn]=M,_=nn):(T[_]=fn,T[en]=M,_=en);else if(nn<Y&&0>r(A,M))T[_]=A,T[nn]=M,_=nn;else break e}}return D}function r(T,D){var M=T.sortIndex-D.sortIndex;return M!==0?M:T.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var l=[],c=[],p=1,g=null,m=3,w=!1,d=!1,b=!1,C=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(T){for(var D=t(c);D!==null;){if(D.callback===null)i(c);else if(D.startTime<=T)i(c),D.sortIndex=D.expirationTime,n(l,D);else break;D=t(c)}}function k(T){if(b=!1,v(T),!d)if(t(l)!==null)d=!0,Wt(I);else{var D=t(c);D!==null&&ie(k,D.startTime-T)}}function I(T,D){d=!1,b&&(b=!1,y(N),N=-1),w=!0;var M=m;try{for(v(D),g=t(l);g!==null&&(!(g.expirationTime>D)||T&&!xe());){var _=g.callback;if(typeof _=="function"){g.callback=null,m=g.priorityLevel;var Y=_(g.expirationTime<=D);D=e.unstable_now(),typeof Y=="function"?g.callback=Y:g===t(l)&&i(l),v(D)}else i(l);g=t(l)}if(g!==null)var nt=!0;else{var en=t(c);en!==null&&ie(k,en.startTime-D),nt=!1}return nt}finally{g=null,m=M,w=!1}}var S=!1,L=null,N=-1,V=5,q=-1;function xe(){return!(e.unstable_now()-q<V)}function qn(){if(L!==null){var T=e.unstable_now();q=T;var D=!0;try{D=L(!0,T)}finally{D?Wn():(S=!1,L=null)}}else S=!1}var Wn;if(typeof f=="function")Wn=function(){f(qn)};else if(typeof MessageChannel<"u"){var Ni=new MessageChannel,so=Ni.port2;Ni.port1.onmessage=qn,Wn=function(){so.postMessage(null)}}else Wn=function(){C(qn,0)};function Wt(T){L=T,S||(S=!0,Wn())}function ie(T,D){N=C(function(){T(e.unstable_now())},D)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){d||w||(d=!0,Wt(I))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return t(l)},e.unstable_next=function(T){switch(m){case 1:case 2:case 3:var D=3;break;default:D=m}var M=m;m=D;try{return T()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,D){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var M=m;m=T;try{return D()}finally{m=M}},e.unstable_scheduleCallback=function(T,D,M){var _=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?_+M:_):M=_,T){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=M+Y,T={id:p++,callback:D,priorityLevel:T,startTime:M,expirationTime:Y,sortIndex:-1},M>_?(T.sortIndex=M,n(c,T),t(l)===null&&T===t(c)&&(b?(y(N),N=-1):b=!0,ie(k,M-_))):(T.sortIndex=Y,n(l,T),d||w||(d=!0,Wt(I))),T},e.unstable_shouldYield=xe,e.unstable_wrapCallback=function(T){var D=m;return function(){var M=m;m=D;try{return T.apply(this,arguments)}finally{m=M}}}})(yc);mc.exports=yc;var lp=mc.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cp=W,Ne=lp;function x(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var gc=new Set,ai={};function Xn(e,n){St(e,n),St(e+"Capture",n)}function St(e,n){for(ai[e]=n,e=0;e<n.length;e++)gc.add(n[e])}var cn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Wo=Object.prototype.hasOwnProperty,dp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Na={},Fa={};function up(e){return Wo.call(Fa,e)?!0:Wo.call(Na,e)?!1:dp.test(e)?Fa[e]=!0:(Na[e]=!0,!1)}function pp(e,n,t,i){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function hp(e,n,t,i){if(n===null||typeof n>"u"||pp(e,n,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ke(e,n,t,i,r,o,s){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=o,this.removeEmptyString=s}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new ke(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];pe[n]=new ke(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new ke(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new ke(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new ke(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new ke(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new ke(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new ke(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new ke(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ds=/[\-:]([a-z])/g;function qs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Ds,qs);pe[n]=new ke(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Ds,qs);pe[n]=new ke(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Ds,qs);pe[n]=new ke(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new ke(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new ke("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new ke(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ws(e,n,t,i){var r=pe.hasOwnProperty(n)?pe[n]:null;(r!==null?r.type!==0:i||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(hp(n,t,r,i)&&(t=null),i||r===null?up(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):r.mustUseProperty?e[r.propertyName]=t===null?r.type===3?!1:"":t:(n=r.attributeName,i=r.attributeNamespace,t===null?e.removeAttribute(n):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?e.setAttributeNS(i,n,t):e.setAttribute(n,t))))}var hn=cp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Mi=Symbol.for("react.element"),rt=Symbol.for("react.portal"),ot=Symbol.for("react.fragment"),Rs=Symbol.for("react.strict_mode"),Ro=Symbol.for("react.profiler"),vc=Symbol.for("react.provider"),wc=Symbol.for("react.context"),Os=Symbol.for("react.forward_ref"),Oo=Symbol.for("react.suspense"),_o=Symbol.for("react.suspense_list"),_s=Symbol.for("react.memo"),yn=Symbol.for("react.lazy"),bc=Symbol.for("react.offscreen"),Ma=Symbol.iterator;function Ot(e){return e===null||typeof e!="object"?null:(e=Ma&&e[Ma]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,lo;function Gt(e){if(lo===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);lo=n&&n[1]||""}return`
`+lo+e}var co=!1;function uo(e,n){if(!e||co)return"";co=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var i=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){i=c}e.call(n.prototype)}else{try{throw Error()}catch(c){i=c}e()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),o=i.stack.split(`
`),s=r.length-1,a=o.length-1;1<=s&&0<=a&&r[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(r[s]!==o[a]){if(s!==1||a!==1)do if(s--,a--,0>a||r[s]!==o[a]){var l=`
`+r[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=s&&0<=a);break}}}finally{co=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?Gt(e):""}function fp(e){switch(e.tag){case 5:return Gt(e.type);case 16:return Gt("Lazy");case 13:return Gt("Suspense");case 19:return Gt("SuspenseList");case 0:case 2:case 15:return e=uo(e.type,!1),e;case 11:return e=uo(e.type.render,!1),e;case 1:return e=uo(e.type,!0),e;default:return""}}function Bo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ot:return"Fragment";case rt:return"Portal";case Ro:return"Profiler";case Rs:return"StrictMode";case Oo:return"Suspense";case _o:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case wc:return(e.displayName||"Context")+".Consumer";case vc:return(e._context.displayName||"Context")+".Provider";case Os:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _s:return n=e.displayName||null,n!==null?n:Bo(e.type)||"Memo";case yn:n=e._payload,e=e._init;try{return Bo(e(n))}catch{}}return null}function mp(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Bo(n);case 8:return n===Rs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function jn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function kc(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function yp(e){var n=kc(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),i=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,o=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return r.call(this)},set:function(s){i=""+s,o.call(this,s)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(s){i=""+s},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Di(e){e._valueTracker||(e._valueTracker=yp(e))}function xc(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),i="";return e&&(i=kc(e)?e.checked?"true":"false":e.value),e=i,e!==t?(n.setValue(e),!0):!1}function pr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Uo(e,n){var t=n.checked;return Z({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Da(e,n){var t=n.defaultValue==null?"":n.defaultValue,i=n.checked!=null?n.checked:n.defaultChecked;t=jn(n.value!=null?n.value:t),e._wrapperState={initialChecked:i,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Cc(e,n){n=n.checked,n!=null&&Ws(e,"checked",n,!1)}function zo(e,n){Cc(e,n);var t=jn(n.value),i=n.type;if(t!=null)i==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?$o(e,n.type,t):n.hasOwnProperty("defaultValue")&&$o(e,n.type,jn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function qa(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var i=n.type;if(!(i!=="submit"&&i!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function $o(e,n,t){(n!=="number"||pr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Vt=Array.isArray;function gt(e,n,t,i){if(e=e.options,n){n={};for(var r=0;r<t.length;r++)n["$"+t[r]]=!0;for(t=0;t<e.length;t++)r=n.hasOwnProperty("$"+e[t].value),e[t].selected!==r&&(e[t].selected=r),r&&i&&(e[t].defaultSelected=!0)}else{for(t=""+jn(t),n=null,r=0;r<e.length;r++){if(e[r].value===t){e[r].selected=!0,i&&(e[r].defaultSelected=!0);return}n!==null||e[r].disabled||(n=e[r])}n!==null&&(n.selected=!0)}}function Ho(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(x(91));return Z({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Wa(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(x(92));if(Vt(t)){if(1<t.length)throw Error(x(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:jn(t)}}function Ic(e,n){var t=jn(n.value),i=jn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),i!=null&&(e.defaultValue=""+i)}function Ra(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Tc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ko(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Tc(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var qi,Sc=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,i,r){MSApp.execUnsafeLocalFunction(function(){return e(n,t,i,r)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(qi=qi||document.createElement("div"),qi.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=qi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function li(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Xt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gp=["Webkit","ms","Moz","O"];Object.keys(Xt).forEach(function(e){gp.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Xt[n]=Xt[e]})});function Pc(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Xt.hasOwnProperty(e)&&Xt[e]?(""+n).trim():n+"px"}function Ac(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=Pc(t,n[t],i);t==="float"&&(t="cssFloat"),i?e.setProperty(t,r):e[t]=r}}var vp=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Go(e,n){if(n){if(vp[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(x(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(x(61))}if(n.style!=null&&typeof n.style!="object")throw Error(x(62))}}function Vo(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qo=null;function Bs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Yo=null,vt=null,wt=null;function Oa(e){if(e=Ei(e)){if(typeof Yo!="function")throw Error(x(280));var n=e.stateNode;n&&(n=$r(n),Yo(e.stateNode,e.type,n))}}function Ec(e){vt?wt?wt.push(e):wt=[e]:vt=e}function jc(){if(vt){var e=vt,n=wt;if(wt=vt=null,Oa(e),n)for(e=0;e<n.length;e++)Oa(n[e])}}function Lc(e,n){return e(n)}function Nc(){}var po=!1;function Fc(e,n,t){if(po)return e(n,t);po=!0;try{return Lc(e,n,t)}finally{po=!1,(vt!==null||wt!==null)&&(Nc(),jc())}}function ci(e,n){var t=e.stateNode;if(t===null)return null;var i=$r(t);if(i===null)return null;t=i[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(x(231,n,typeof t));return t}var Jo=!1;if(cn)try{var _t={};Object.defineProperty(_t,"passive",{get:function(){Jo=!0}}),window.addEventListener("test",_t,_t),window.removeEventListener("test",_t,_t)}catch{Jo=!1}function wp(e,n,t,i,r,o,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(p){this.onError(p)}}var Zt=!1,hr=null,fr=!1,Xo=null,bp={onError:function(e){Zt=!0,hr=e}};function kp(e,n,t,i,r,o,s,a,l){Zt=!1,hr=null,wp.apply(bp,arguments)}function xp(e,n,t,i,r,o,s,a,l){if(kp.apply(this,arguments),Zt){if(Zt){var c=hr;Zt=!1,hr=null}else throw Error(x(198));fr||(fr=!0,Xo=c)}}function Zn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Mc(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function _a(e){if(Zn(e)!==e)throw Error(x(188))}function Cp(e){var n=e.alternate;if(!n){if(n=Zn(e),n===null)throw Error(x(188));return n!==e?null:e}for(var t=e,i=n;;){var r=t.return;if(r===null)break;var o=r.alternate;if(o===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===o.child){for(o=r.child;o;){if(o===t)return _a(r),e;if(o===i)return _a(r),n;o=o.sibling}throw Error(x(188))}if(t.return!==i.return)t=r,i=o;else{for(var s=!1,a=r.child;a;){if(a===t){s=!0,t=r,i=o;break}if(a===i){s=!0,i=r,t=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===t){s=!0,t=o,i=r;break}if(a===i){s=!0,i=o,t=r;break}a=a.sibling}if(!s)throw Error(x(189))}}if(t.alternate!==i)throw Error(x(190))}if(t.tag!==3)throw Error(x(188));return t.stateNode.current===t?e:n}function Dc(e){return e=Cp(e),e!==null?qc(e):null}function qc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=qc(e);if(n!==null)return n;e=e.sibling}return null}var Wc=Ne.unstable_scheduleCallback,Ba=Ne.unstable_cancelCallback,Ip=Ne.unstable_shouldYield,Tp=Ne.unstable_requestPaint,ne=Ne.unstable_now,Sp=Ne.unstable_getCurrentPriorityLevel,Us=Ne.unstable_ImmediatePriority,Rc=Ne.unstable_UserBlockingPriority,mr=Ne.unstable_NormalPriority,Pp=Ne.unstable_LowPriority,Oc=Ne.unstable_IdlePriority,_r=null,Xe=null;function Ap(e){if(Xe&&typeof Xe.onCommitFiberRoot=="function")try{Xe.onCommitFiberRoot(_r,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:Lp,Ep=Math.log,jp=Math.LN2;function Lp(e){return e>>>=0,e===0?32:31-(Ep(e)/jp|0)|0}var Wi=64,Ri=4194304;function Qt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function yr(e,n){var t=e.pendingLanes;if(t===0)return 0;var i=0,r=e.suspendedLanes,o=e.pingedLanes,s=t&268435455;if(s!==0){var a=s&~r;a!==0?i=Qt(a):(o&=s,o!==0&&(i=Qt(o)))}else s=t&~r,s!==0?i=Qt(s):o!==0&&(i=Qt(o));if(i===0)return 0;if(n!==0&&n!==i&&!(n&r)&&(r=i&-i,o=n&-n,r>=o||r===16&&(o&4194240)!==0))return n;if(i&4&&(i|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=i;0<n;)t=31-Ke(n),r=1<<t,i|=e[t],n&=~r;return i}function Np(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Fp(e,n){for(var t=e.suspendedLanes,i=e.pingedLanes,r=e.expirationTimes,o=e.pendingLanes;0<o;){var s=31-Ke(o),a=1<<s,l=r[s];l===-1?(!(a&t)||a&i)&&(r[s]=Np(a,n)):l<=n&&(e.expiredLanes|=a),o&=~a}}function Zo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function _c(){var e=Wi;return Wi<<=1,!(Wi&4194240)&&(Wi=64),e}function ho(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function Pi(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ke(n),e[n]=t}function Mp(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<t;){var r=31-Ke(t),o=1<<r;n[r]=0,i[r]=-1,e[r]=-1,t&=~o}}function zs(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var i=31-Ke(t),r=1<<i;r&n|e[i]&n&&(e[i]|=n),t&=~r}}var z=0;function Bc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Uc,$s,zc,$c,Hc,es=!1,Oi=[],xn=null,Cn=null,In=null,di=new Map,ui=new Map,vn=[],Dp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ua(e,n){switch(e){case"focusin":case"focusout":xn=null;break;case"dragenter":case"dragleave":Cn=null;break;case"mouseover":case"mouseout":In=null;break;case"pointerover":case"pointerout":di.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":ui.delete(n.pointerId)}}function Bt(e,n,t,i,r,o){return e===null||e.nativeEvent!==o?(e={blockedOn:n,domEventName:t,eventSystemFlags:i,nativeEvent:o,targetContainers:[r]},n!==null&&(n=Ei(n),n!==null&&$s(n)),e):(e.eventSystemFlags|=i,n=e.targetContainers,r!==null&&n.indexOf(r)===-1&&n.push(r),e)}function qp(e,n,t,i,r){switch(n){case"focusin":return xn=Bt(xn,e,n,t,i,r),!0;case"dragenter":return Cn=Bt(Cn,e,n,t,i,r),!0;case"mouseover":return In=Bt(In,e,n,t,i,r),!0;case"pointerover":var o=r.pointerId;return di.set(o,Bt(di.get(o)||null,e,n,t,i,r)),!0;case"gotpointercapture":return o=r.pointerId,ui.set(o,Bt(ui.get(o)||null,e,n,t,i,r)),!0}return!1}function Kc(e){var n=Un(e.target);if(n!==null){var t=Zn(n);if(t!==null){if(n=t.tag,n===13){if(n=Mc(t),n!==null){e.blockedOn=n,Hc(e.priority,function(){zc(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function nr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=ns(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var i=new t.constructor(t.type,t);Qo=i,t.target.dispatchEvent(i),Qo=null}else return n=Ei(t),n!==null&&$s(n),e.blockedOn=t,!1;n.shift()}return!0}function za(e,n,t){nr(e)&&t.delete(n)}function Wp(){es=!1,xn!==null&&nr(xn)&&(xn=null),Cn!==null&&nr(Cn)&&(Cn=null),In!==null&&nr(In)&&(In=null),di.forEach(za),ui.forEach(za)}function Ut(e,n){e.blockedOn===n&&(e.blockedOn=null,es||(es=!0,Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority,Wp)))}function pi(e){function n(r){return Ut(r,e)}if(0<Oi.length){Ut(Oi[0],e);for(var t=1;t<Oi.length;t++){var i=Oi[t];i.blockedOn===e&&(i.blockedOn=null)}}for(xn!==null&&Ut(xn,e),Cn!==null&&Ut(Cn,e),In!==null&&Ut(In,e),di.forEach(n),ui.forEach(n),t=0;t<vn.length;t++)i=vn[t],i.blockedOn===e&&(i.blockedOn=null);for(;0<vn.length&&(t=vn[0],t.blockedOn===null);)Kc(t),t.blockedOn===null&&vn.shift()}var bt=hn.ReactCurrentBatchConfig,gr=!0;function Rp(e,n,t,i){var r=z,o=bt.transition;bt.transition=null;try{z=1,Hs(e,n,t,i)}finally{z=r,bt.transition=o}}function Op(e,n,t,i){var r=z,o=bt.transition;bt.transition=null;try{z=4,Hs(e,n,t,i)}finally{z=r,bt.transition=o}}function Hs(e,n,t,i){if(gr){var r=ns(e,n,t,i);if(r===null)Co(e,n,i,vr,t),Ua(e,i);else if(qp(r,e,n,t,i))i.stopPropagation();else if(Ua(e,i),n&4&&-1<Dp.indexOf(e)){for(;r!==null;){var o=Ei(r);if(o!==null&&Uc(o),o=ns(e,n,t,i),o===null&&Co(e,n,i,vr,t),o===r)break;r=o}r!==null&&i.stopPropagation()}else Co(e,n,i,null,t)}}var vr=null;function ns(e,n,t,i){if(vr=null,e=Bs(i),e=Un(e),e!==null)if(n=Zn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Mc(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return vr=e,null}function Gc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Sp()){case Us:return 1;case Rc:return 4;case mr:case Pp:return 16;case Oc:return 536870912;default:return 16}default:return 16}}var bn=null,Ks=null,tr=null;function Vc(){if(tr)return tr;var e,n=Ks,t=n.length,i,r="value"in bn?bn.value:bn.textContent,o=r.length;for(e=0;e<t&&n[e]===r[e];e++);var s=t-e;for(i=1;i<=s&&n[t-i]===r[o-i];i++);return tr=r.slice(e,1<i?1-i:void 0)}function ir(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function _i(){return!0}function $a(){return!1}function Me(e){function n(t,i,r,o,s){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=o,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(t=e[a],this[a]=t?t(o):o[a]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?_i:$a,this.isPropagationStopped=$a,this}return Z(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=_i)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=_i)},persist:function(){},isPersistent:_i}),n}var Dt={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gs=Me(Dt),Ai=Z({},Dt,{view:0,detail:0}),_p=Me(Ai),fo,mo,zt,Br=Z({},Ai,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zt&&(zt&&e.type==="mousemove"?(fo=e.screenX-zt.screenX,mo=e.screenY-zt.screenY):mo=fo=0,zt=e),fo)},movementY:function(e){return"movementY"in e?e.movementY:mo}}),Ha=Me(Br),Bp=Z({},Br,{dataTransfer:0}),Up=Me(Bp),zp=Z({},Ai,{relatedTarget:0}),yo=Me(zp),$p=Z({},Dt,{animationName:0,elapsedTime:0,pseudoElement:0}),Hp=Me($p),Kp=Z({},Dt,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Gp=Me(Kp),Vp=Z({},Dt,{data:0}),Ka=Me(Vp),Qp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Jp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xp(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Jp[e])?!!n[e]:!1}function Vs(){return Xp}var Zp=Z({},Ai,{key:function(e){if(e.key){var n=Qp[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ir(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Yp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vs,charCode:function(e){return e.type==="keypress"?ir(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ir(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),eh=Me(Zp),nh=Z({},Br,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ga=Me(nh),th=Z({},Ai,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vs}),ih=Me(th),rh=Z({},Dt,{propertyName:0,elapsedTime:0,pseudoElement:0}),oh=Me(rh),sh=Z({},Br,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ah=Me(sh),lh=[9,13,27,32],Qs=cn&&"CompositionEvent"in window,ei=null;cn&&"documentMode"in document&&(ei=document.documentMode);var ch=cn&&"TextEvent"in window&&!ei,Qc=cn&&(!Qs||ei&&8<ei&&11>=ei),Va=" ",Qa=!1;function Yc(e,n){switch(e){case"keyup":return lh.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var st=!1;function dh(e,n){switch(e){case"compositionend":return Jc(n);case"keypress":return n.which!==32?null:(Qa=!0,Va);case"textInput":return e=n.data,e===Va&&Qa?null:e;default:return null}}function uh(e,n){if(st)return e==="compositionend"||!Qs&&Yc(e,n)?(e=Vc(),tr=Ks=bn=null,st=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Qc&&n.locale!=="ko"?null:n.data;default:return null}}var ph={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ya(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!ph[e.type]:n==="textarea"}function Xc(e,n,t,i){Ec(i),n=wr(n,"onChange"),0<n.length&&(t=new Gs("onChange","change",null,t,i),e.push({event:t,listeners:n}))}var ni=null,hi=null;function hh(e){cd(e,0)}function Ur(e){var n=ct(e);if(xc(n))return e}function fh(e,n){if(e==="change")return n}var Zc=!1;if(cn){var go;if(cn){var vo="oninput"in document;if(!vo){var Ja=document.createElement("div");Ja.setAttribute("oninput","return;"),vo=typeof Ja.oninput=="function"}go=vo}else go=!1;Zc=go&&(!document.documentMode||9<document.documentMode)}function Xa(){ni&&(ni.detachEvent("onpropertychange",ed),hi=ni=null)}function ed(e){if(e.propertyName==="value"&&Ur(hi)){var n=[];Xc(n,hi,e,Bs(e)),Fc(hh,n)}}function mh(e,n,t){e==="focusin"?(Xa(),ni=n,hi=t,ni.attachEvent("onpropertychange",ed)):e==="focusout"&&Xa()}function yh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ur(hi)}function gh(e,n){if(e==="click")return Ur(n)}function vh(e,n){if(e==="input"||e==="change")return Ur(n)}function wh(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ve=typeof Object.is=="function"?Object.is:wh;function fi(e,n){if(Ve(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),i=Object.keys(n);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Wo.call(n,r)||!Ve(e[r],n[r]))return!1}return!0}function Za(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function el(e,n){var t=Za(e);e=0;for(var i;t;){if(t.nodeType===3){if(i=e+t.textContent.length,e<=n&&i>=n)return{node:t,offset:n-e};e=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Za(t)}}function nd(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?nd(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function td(){for(var e=window,n=pr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=pr(e.document)}return n}function Ys(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function bh(e){var n=td(),t=e.focusedElem,i=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&nd(t.ownerDocument.documentElement,t)){if(i!==null&&Ys(t)){if(n=i.start,e=i.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var r=t.textContent.length,o=Math.min(i.start,r);i=i.end===void 0?o:Math.min(i.end,r),!e.extend&&o>i&&(r=i,i=o,o=r),r=el(t,o);var s=el(t,i);r&&s&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(n=n.createRange(),n.setStart(r.node,r.offset),e.removeAllRanges(),o>i?(e.addRange(n),e.extend(s.node,s.offset)):(n.setEnd(s.node,s.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var kh=cn&&"documentMode"in document&&11>=document.documentMode,at=null,ts=null,ti=null,is=!1;function nl(e,n,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;is||at==null||at!==pr(i)||(i=at,"selectionStart"in i&&Ys(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ti&&fi(ti,i)||(ti=i,i=wr(ts,"onSelect"),0<i.length&&(n=new Gs("onSelect","select",null,n,t),e.push({event:n,listeners:i}),n.target=at)))}function Bi(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var lt={animationend:Bi("Animation","AnimationEnd"),animationiteration:Bi("Animation","AnimationIteration"),animationstart:Bi("Animation","AnimationStart"),transitionend:Bi("Transition","TransitionEnd")},wo={},id={};cn&&(id=document.createElement("div").style,"AnimationEvent"in window||(delete lt.animationend.animation,delete lt.animationiteration.animation,delete lt.animationstart.animation),"TransitionEvent"in window||delete lt.transitionend.transition);function zr(e){if(wo[e])return wo[e];if(!lt[e])return e;var n=lt[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in id)return wo[e]=n[t];return e}var rd=zr("animationend"),od=zr("animationiteration"),sd=zr("animationstart"),ad=zr("transitionend"),ld=new Map,tl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Fn(e,n){ld.set(e,n),Xn(n,[e])}for(var bo=0;bo<tl.length;bo++){var ko=tl[bo],xh=ko.toLowerCase(),Ch=ko[0].toUpperCase()+ko.slice(1);Fn(xh,"on"+Ch)}Fn(rd,"onAnimationEnd");Fn(od,"onAnimationIteration");Fn(sd,"onAnimationStart");Fn("dblclick","onDoubleClick");Fn("focusin","onFocus");Fn("focusout","onBlur");Fn(ad,"onTransitionEnd");St("onMouseEnter",["mouseout","mouseover"]);St("onMouseLeave",["mouseout","mouseover"]);St("onPointerEnter",["pointerout","pointerover"]);St("onPointerLeave",["pointerout","pointerover"]);Xn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Xn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Xn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Xn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Xn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Xn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yt="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ih=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yt));function il(e,n,t){var i=e.type||"unknown-event";e.currentTarget=t,xp(i,n,void 0,e),e.currentTarget=null}function cd(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var i=e[t],r=i.event;i=i.listeners;e:{var o=void 0;if(n)for(var s=i.length-1;0<=s;s--){var a=i[s],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==o&&r.isPropagationStopped())break e;il(r,a,c),o=l}else for(s=0;s<i.length;s++){if(a=i[s],l=a.instance,c=a.currentTarget,a=a.listener,l!==o&&r.isPropagationStopped())break e;il(r,a,c),o=l}}}if(fr)throw e=Xo,fr=!1,Xo=null,e}function K(e,n){var t=n[ls];t===void 0&&(t=n[ls]=new Set);var i=e+"__bubble";t.has(i)||(dd(n,e,2,!1),t.add(i))}function xo(e,n,t){var i=0;n&&(i|=4),dd(t,e,i,n)}var Ui="_reactListening"+Math.random().toString(36).slice(2);function mi(e){if(!e[Ui]){e[Ui]=!0,gc.forEach(function(t){t!=="selectionchange"&&(Ih.has(t)||xo(t,!1,e),xo(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ui]||(n[Ui]=!0,xo("selectionchange",!1,n))}}function dd(e,n,t,i){switch(Gc(n)){case 1:var r=Rp;break;case 4:r=Op;break;default:r=Hs}t=r.bind(null,n,t,e),r=void 0,!Jo||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(r=!0),i?r!==void 0?e.addEventListener(n,t,{capture:!0,passive:r}):e.addEventListener(n,t,!0):r!==void 0?e.addEventListener(n,t,{passive:r}):e.addEventListener(n,t,!1)}function Co(e,n,t,i,r){var o=i;if(!(n&1)&&!(n&2)&&i!==null)e:for(;;){if(i===null)return;var s=i.tag;if(s===3||s===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(s===4)for(s=i.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;s=s.return}for(;a!==null;){if(s=Un(a),s===null)return;if(l=s.tag,l===5||l===6){i=o=s;continue e}a=a.parentNode}}i=i.return}Fc(function(){var c=o,p=Bs(t),g=[];e:{var m=ld.get(e);if(m!==void 0){var w=Gs,d=e;switch(e){case"keypress":if(ir(t)===0)break e;case"keydown":case"keyup":w=eh;break;case"focusin":d="focus",w=yo;break;case"focusout":d="blur",w=yo;break;case"beforeblur":case"afterblur":w=yo;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=Ha;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=Up;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=ih;break;case rd:case od:case sd:w=Hp;break;case ad:w=oh;break;case"scroll":w=_p;break;case"wheel":w=ah;break;case"copy":case"cut":case"paste":w=Gp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=Ga}var b=(n&4)!==0,C=!b&&e==="scroll",y=b?m!==null?m+"Capture":null:m;b=[];for(var f=c,v;f!==null;){v=f;var k=v.stateNode;if(v.tag===5&&k!==null&&(v=k,y!==null&&(k=ci(f,y),k!=null&&b.push(yi(f,k,v)))),C)break;f=f.return}0<b.length&&(m=new w(m,d,null,t,p),g.push({event:m,listeners:b}))}}if(!(n&7)){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&t!==Qo&&(d=t.relatedTarget||t.fromElement)&&(Un(d)||d[dn]))break e;if((w||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,w?(d=t.relatedTarget||t.toElement,w=c,d=d?Un(d):null,d!==null&&(C=Zn(d),d!==C||d.tag!==5&&d.tag!==6)&&(d=null)):(w=null,d=c),w!==d)){if(b=Ha,k="onMouseLeave",y="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(b=Ga,k="onPointerLeave",y="onPointerEnter",f="pointer"),C=w==null?m:ct(w),v=d==null?m:ct(d),m=new b(k,f+"leave",w,t,p),m.target=C,m.relatedTarget=v,k=null,Un(p)===c&&(b=new b(y,f+"enter",d,t,p),b.target=v,b.relatedTarget=C,k=b),C=k,w&&d)n:{for(b=w,y=d,f=0,v=b;v;v=it(v))f++;for(v=0,k=y;k;k=it(k))v++;for(;0<f-v;)b=it(b),f--;for(;0<v-f;)y=it(y),v--;for(;f--;){if(b===y||y!==null&&b===y.alternate)break n;b=it(b),y=it(y)}b=null}else b=null;w!==null&&rl(g,m,w,b,!1),d!==null&&C!==null&&rl(g,C,d,b,!0)}}e:{if(m=c?ct(c):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var I=fh;else if(Ya(m))if(Zc)I=vh;else{I=yh;var S=mh}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(I=gh);if(I&&(I=I(e,c))){Xc(g,I,t,p);break e}S&&S(e,m,c),e==="focusout"&&(S=m._wrapperState)&&S.controlled&&m.type==="number"&&$o(m,"number",m.value)}switch(S=c?ct(c):window,e){case"focusin":(Ya(S)||S.contentEditable==="true")&&(at=S,ts=c,ti=null);break;case"focusout":ti=ts=at=null;break;case"mousedown":is=!0;break;case"contextmenu":case"mouseup":case"dragend":is=!1,nl(g,t,p);break;case"selectionchange":if(kh)break;case"keydown":case"keyup":nl(g,t,p)}var L;if(Qs)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else st?Yc(e,t)&&(N="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(N="onCompositionStart");N&&(Qc&&t.locale!=="ko"&&(st||N!=="onCompositionStart"?N==="onCompositionEnd"&&st&&(L=Vc()):(bn=p,Ks="value"in bn?bn.value:bn.textContent,st=!0)),S=wr(c,N),0<S.length&&(N=new Ka(N,e,null,t,p),g.push({event:N,listeners:S}),L?N.data=L:(L=Jc(t),L!==null&&(N.data=L)))),(L=ch?dh(e,t):uh(e,t))&&(c=wr(c,"onBeforeInput"),0<c.length&&(p=new Ka("onBeforeInput","beforeinput",null,t,p),g.push({event:p,listeners:c}),p.data=L))}cd(g,n)})}function yi(e,n,t){return{instance:e,listener:n,currentTarget:t}}function wr(e,n){for(var t=n+"Capture",i=[];e!==null;){var r=e,o=r.stateNode;r.tag===5&&o!==null&&(r=o,o=ci(e,t),o!=null&&i.unshift(yi(e,o,r)),o=ci(e,n),o!=null&&i.push(yi(e,o,r))),e=e.return}return i}function it(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function rl(e,n,t,i,r){for(var o=n._reactName,s=[];t!==null&&t!==i;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=ci(t,o),l!=null&&s.unshift(yi(t,l,a))):r||(l=ci(t,o),l!=null&&s.push(yi(t,l,a)))),t=t.return}s.length!==0&&e.push({event:n,listeners:s})}var Th=/\r\n?/g,Sh=/\u0000|\uFFFD/g;function ol(e){return(typeof e=="string"?e:""+e).replace(Th,`
`).replace(Sh,"")}function zi(e,n,t){if(n=ol(n),ol(e)!==n&&t)throw Error(x(425))}function br(){}var rs=null,os=null;function ss(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var as=typeof setTimeout=="function"?setTimeout:void 0,Ph=typeof clearTimeout=="function"?clearTimeout:void 0,sl=typeof Promise=="function"?Promise:void 0,Ah=typeof queueMicrotask=="function"?queueMicrotask:typeof sl<"u"?function(e){return sl.resolve(null).then(e).catch(Eh)}:as;function Eh(e){setTimeout(function(){throw e})}function Io(e,n){var t=n,i=0;do{var r=t.nextSibling;if(e.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){e.removeChild(r),pi(n);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);pi(n)}function Tn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function al(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var qt=Math.random().toString(36).slice(2),Je="__reactFiber$"+qt,gi="__reactProps$"+qt,dn="__reactContainer$"+qt,ls="__reactEvents$"+qt,jh="__reactListeners$"+qt,Lh="__reactHandles$"+qt;function Un(e){var n=e[Je];if(n)return n;for(var t=e.parentNode;t;){if(n=t[dn]||t[Je]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=al(e);e!==null;){if(t=e[Je])return t;e=al(e)}return n}e=t,t=e.parentNode}return null}function Ei(e){return e=e[Je]||e[dn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ct(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function $r(e){return e[gi]||null}var cs=[],dt=-1;function Mn(e){return{current:e}}function G(e){0>dt||(e.current=cs[dt],cs[dt]=null,dt--)}function $(e,n){dt++,cs[dt]=e.current,e.current=n}var Ln={},ye=Mn(Ln),Se=Mn(!1),Gn=Ln;function Pt(e,n){var t=e.type.contextTypes;if(!t)return Ln;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===n)return i.__reactInternalMemoizedMaskedChildContext;var r={},o;for(o in t)r[o]=n[o];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=r),r}function Pe(e){return e=e.childContextTypes,e!=null}function kr(){G(Se),G(ye)}function ll(e,n,t){if(ye.current!==Ln)throw Error(x(168));$(ye,n),$(Se,t)}function ud(e,n,t){var i=e.stateNode;if(n=n.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in n))throw Error(x(108,mp(e)||"Unknown",r));return Z({},t,i)}function xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ln,Gn=ye.current,$(ye,e),$(Se,Se.current),!0}function cl(e,n,t){var i=e.stateNode;if(!i)throw Error(x(169));t?(e=ud(e,n,Gn),i.__reactInternalMemoizedMergedChildContext=e,G(Se),G(ye),$(ye,e)):G(Se),$(Se,t)}var rn=null,Hr=!1,To=!1;function pd(e){rn===null?rn=[e]:rn.push(e)}function Nh(e){Hr=!0,pd(e)}function Dn(){if(!To&&rn!==null){To=!0;var e=0,n=z;try{var t=rn;for(z=1;e<t.length;e++){var i=t[e];do i=i(!0);while(i!==null)}rn=null,Hr=!1}catch(r){throw rn!==null&&(rn=rn.slice(e+1)),Wc(Us,Dn),r}finally{z=n,To=!1}}return null}var ut=[],pt=0,Cr=null,Ir=0,De=[],qe=0,Vn=null,on=1,sn="";function On(e,n){ut[pt++]=Ir,ut[pt++]=Cr,Cr=e,Ir=n}function hd(e,n,t){De[qe++]=on,De[qe++]=sn,De[qe++]=Vn,Vn=e;var i=on;e=sn;var r=32-Ke(i)-1;i&=~(1<<r),t+=1;var o=32-Ke(n)+r;if(30<o){var s=r-r%5;o=(i&(1<<s)-1).toString(32),i>>=s,r-=s,on=1<<32-Ke(n)+r|t<<r|i,sn=o+e}else on=1<<o|t<<r|i,sn=e}function Js(e){e.return!==null&&(On(e,1),hd(e,1,0))}function Xs(e){for(;e===Cr;)Cr=ut[--pt],ut[pt]=null,Ir=ut[--pt],ut[pt]=null;for(;e===Vn;)Vn=De[--qe],De[qe]=null,sn=De[--qe],De[qe]=null,on=De[--qe],De[qe]=null}var Le=null,je=null,Q=!1,$e=null;function fd(e,n){var t=We(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function dl(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Le=e,je=Tn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Le=e,je=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Vn!==null?{id:on,overflow:sn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=We(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,Le=e,je=null,!0):!1;default:return!1}}function ds(e){return(e.mode&1)!==0&&(e.flags&128)===0}function us(e){if(Q){var n=je;if(n){var t=n;if(!dl(e,n)){if(ds(e))throw Error(x(418));n=Tn(t.nextSibling);var i=Le;n&&dl(e,n)?fd(i,t):(e.flags=e.flags&-4097|2,Q=!1,Le=e)}}else{if(ds(e))throw Error(x(418));e.flags=e.flags&-4097|2,Q=!1,Le=e}}}function ul(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Le=e}function $i(e){if(e!==Le)return!1;if(!Q)return ul(e),Q=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!ss(e.type,e.memoizedProps)),n&&(n=je)){if(ds(e))throw md(),Error(x(418));for(;n;)fd(e,n),n=Tn(n.nextSibling)}if(ul(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){je=Tn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}je=null}}else je=Le?Tn(e.stateNode.nextSibling):null;return!0}function md(){for(var e=je;e;)e=Tn(e.nextSibling)}function At(){je=Le=null,Q=!1}function Zs(e){$e===null?$e=[e]:$e.push(e)}var Fh=hn.ReactCurrentBatchConfig;function $t(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(x(309));var i=t.stateNode}if(!i)throw Error(x(147,e));var r=i,o=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===o?n.ref:(n=function(s){var a=r.refs;s===null?delete a[o]:a[o]=s},n._stringRef=o,n)}if(typeof e!="string")throw Error(x(284));if(!t._owner)throw Error(x(290,e))}return e}function Hi(e,n){throw e=Object.prototype.toString.call(n),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function pl(e){var n=e._init;return n(e._payload)}function yd(e){function n(y,f){if(e){var v=y.deletions;v===null?(y.deletions=[f],y.flags|=16):v.push(f)}}function t(y,f){if(!e)return null;for(;f!==null;)n(y,f),f=f.sibling;return null}function i(y,f){for(y=new Map;f!==null;)f.key!==null?y.set(f.key,f):y.set(f.index,f),f=f.sibling;return y}function r(y,f){return y=En(y,f),y.index=0,y.sibling=null,y}function o(y,f,v){return y.index=v,e?(v=y.alternate,v!==null?(v=v.index,v<f?(y.flags|=2,f):v):(y.flags|=2,f)):(y.flags|=1048576,f)}function s(y){return e&&y.alternate===null&&(y.flags|=2),y}function a(y,f,v,k){return f===null||f.tag!==6?(f=No(v,y.mode,k),f.return=y,f):(f=r(f,v),f.return=y,f)}function l(y,f,v,k){var I=v.type;return I===ot?p(y,f,v.props.children,k,v.key):f!==null&&(f.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===yn&&pl(I)===f.type)?(k=r(f,v.props),k.ref=$t(y,f,v),k.return=y,k):(k=dr(v.type,v.key,v.props,null,y.mode,k),k.ref=$t(y,f,v),k.return=y,k)}function c(y,f,v,k){return f===null||f.tag!==4||f.stateNode.containerInfo!==v.containerInfo||f.stateNode.implementation!==v.implementation?(f=Fo(v,y.mode,k),f.return=y,f):(f=r(f,v.children||[]),f.return=y,f)}function p(y,f,v,k,I){return f===null||f.tag!==7?(f=Kn(v,y.mode,k,I),f.return=y,f):(f=r(f,v),f.return=y,f)}function g(y,f,v){if(typeof f=="string"&&f!==""||typeof f=="number")return f=No(""+f,y.mode,v),f.return=y,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Mi:return v=dr(f.type,f.key,f.props,null,y.mode,v),v.ref=$t(y,null,f),v.return=y,v;case rt:return f=Fo(f,y.mode,v),f.return=y,f;case yn:var k=f._init;return g(y,k(f._payload),v)}if(Vt(f)||Ot(f))return f=Kn(f,y.mode,v,null),f.return=y,f;Hi(y,f)}return null}function m(y,f,v,k){var I=f!==null?f.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return I!==null?null:a(y,f,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Mi:return v.key===I?l(y,f,v,k):null;case rt:return v.key===I?c(y,f,v,k):null;case yn:return I=v._init,m(y,f,I(v._payload),k)}if(Vt(v)||Ot(v))return I!==null?null:p(y,f,v,k,null);Hi(y,v)}return null}function w(y,f,v,k,I){if(typeof k=="string"&&k!==""||typeof k=="number")return y=y.get(v)||null,a(f,y,""+k,I);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Mi:return y=y.get(k.key===null?v:k.key)||null,l(f,y,k,I);case rt:return y=y.get(k.key===null?v:k.key)||null,c(f,y,k,I);case yn:var S=k._init;return w(y,f,v,S(k._payload),I)}if(Vt(k)||Ot(k))return y=y.get(v)||null,p(f,y,k,I,null);Hi(f,k)}return null}function d(y,f,v,k){for(var I=null,S=null,L=f,N=f=0,V=null;L!==null&&N<v.length;N++){L.index>N?(V=L,L=null):V=L.sibling;var q=m(y,L,v[N],k);if(q===null){L===null&&(L=V);break}e&&L&&q.alternate===null&&n(y,L),f=o(q,f,N),S===null?I=q:S.sibling=q,S=q,L=V}if(N===v.length)return t(y,L),Q&&On(y,N),I;if(L===null){for(;N<v.length;N++)L=g(y,v[N],k),L!==null&&(f=o(L,f,N),S===null?I=L:S.sibling=L,S=L);return Q&&On(y,N),I}for(L=i(y,L);N<v.length;N++)V=w(L,y,N,v[N],k),V!==null&&(e&&V.alternate!==null&&L.delete(V.key===null?N:V.key),f=o(V,f,N),S===null?I=V:S.sibling=V,S=V);return e&&L.forEach(function(xe){return n(y,xe)}),Q&&On(y,N),I}function b(y,f,v,k){var I=Ot(v);if(typeof I!="function")throw Error(x(150));if(v=I.call(v),v==null)throw Error(x(151));for(var S=I=null,L=f,N=f=0,V=null,q=v.next();L!==null&&!q.done;N++,q=v.next()){L.index>N?(V=L,L=null):V=L.sibling;var xe=m(y,L,q.value,k);if(xe===null){L===null&&(L=V);break}e&&L&&xe.alternate===null&&n(y,L),f=o(xe,f,N),S===null?I=xe:S.sibling=xe,S=xe,L=V}if(q.done)return t(y,L),Q&&On(y,N),I;if(L===null){for(;!q.done;N++,q=v.next())q=g(y,q.value,k),q!==null&&(f=o(q,f,N),S===null?I=q:S.sibling=q,S=q);return Q&&On(y,N),I}for(L=i(y,L);!q.done;N++,q=v.next())q=w(L,y,N,q.value,k),q!==null&&(e&&q.alternate!==null&&L.delete(q.key===null?N:q.key),f=o(q,f,N),S===null?I=q:S.sibling=q,S=q);return e&&L.forEach(function(qn){return n(y,qn)}),Q&&On(y,N),I}function C(y,f,v,k){if(typeof v=="object"&&v!==null&&v.type===ot&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Mi:e:{for(var I=v.key,S=f;S!==null;){if(S.key===I){if(I=v.type,I===ot){if(S.tag===7){t(y,S.sibling),f=r(S,v.props.children),f.return=y,y=f;break e}}else if(S.elementType===I||typeof I=="object"&&I!==null&&I.$$typeof===yn&&pl(I)===S.type){t(y,S.sibling),f=r(S,v.props),f.ref=$t(y,S,v),f.return=y,y=f;break e}t(y,S);break}else n(y,S);S=S.sibling}v.type===ot?(f=Kn(v.props.children,y.mode,k,v.key),f.return=y,y=f):(k=dr(v.type,v.key,v.props,null,y.mode,k),k.ref=$t(y,f,v),k.return=y,y=k)}return s(y);case rt:e:{for(S=v.key;f!==null;){if(f.key===S)if(f.tag===4&&f.stateNode.containerInfo===v.containerInfo&&f.stateNode.implementation===v.implementation){t(y,f.sibling),f=r(f,v.children||[]),f.return=y,y=f;break e}else{t(y,f);break}else n(y,f);f=f.sibling}f=Fo(v,y.mode,k),f.return=y,y=f}return s(y);case yn:return S=v._init,C(y,f,S(v._payload),k)}if(Vt(v))return d(y,f,v,k);if(Ot(v))return b(y,f,v,k);Hi(y,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,f!==null&&f.tag===6?(t(y,f.sibling),f=r(f,v),f.return=y,y=f):(t(y,f),f=No(v,y.mode,k),f.return=y,y=f),s(y)):t(y,f)}return C}var Et=yd(!0),gd=yd(!1),Tr=Mn(null),Sr=null,ht=null,ea=null;function na(){ea=ht=Sr=null}function ta(e){var n=Tr.current;G(Tr),e._currentValue=n}function ps(e,n,t){for(;e!==null;){var i=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,i!==null&&(i.childLanes|=n)):i!==null&&(i.childLanes&n)!==n&&(i.childLanes|=n),e===t)break;e=e.return}}function kt(e,n){Sr=e,ea=ht=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Te=!0),e.firstContext=null)}function Oe(e){var n=e._currentValue;if(ea!==e)if(e={context:e,memoizedValue:n,next:null},ht===null){if(Sr===null)throw Error(x(308));ht=e,Sr.dependencies={lanes:0,firstContext:e}}else ht=ht.next=e;return n}var zn=null;function ia(e){zn===null?zn=[e]:zn.push(e)}function vd(e,n,t,i){var r=n.interleaved;return r===null?(t.next=t,ia(n)):(t.next=r.next,r.next=t),n.interleaved=t,un(e,i)}function un(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var gn=!1;function ra(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function wd(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ln(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function Sn(e,n,t){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,O&2){var r=i.pending;return r===null?n.next=n:(n.next=r.next,r.next=n),i.pending=n,un(e,t)}return r=i.interleaved,r===null?(n.next=n,ia(i)):(n.next=r.next,r.next=n),i.interleaved=n,un(e,t)}function rr(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,zs(e,t)}}function hl(e,n){var t=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,o=null;if(t=t.firstBaseUpdate,t!==null){do{var s={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};o===null?r=o=s:o=o.next=s,t=t.next}while(t!==null);o===null?r=o=n:o=o.next=n}else r=o=n;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:o,shared:i.shared,effects:i.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Pr(e,n,t,i){var r=e.updateQueue;gn=!1;var o=r.firstBaseUpdate,s=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,s===null?o=c:s.next=c,s=l;var p=e.alternate;p!==null&&(p=p.updateQueue,a=p.lastBaseUpdate,a!==s&&(a===null?p.firstBaseUpdate=c:a.next=c,p.lastBaseUpdate=l))}if(o!==null){var g=r.baseState;s=0,p=c=l=null,a=o;do{var m=a.lane,w=a.eventTime;if((i&m)===m){p!==null&&(p=p.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var d=e,b=a;switch(m=n,w=t,b.tag){case 1:if(d=b.payload,typeof d=="function"){g=d.call(w,g,m);break e}g=d;break e;case 3:d.flags=d.flags&-65537|128;case 0:if(d=b.payload,m=typeof d=="function"?d.call(w,g,m):d,m==null)break e;g=Z({},g,m);break e;case 2:gn=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=r.effects,m===null?r.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},p===null?(c=p=w,l=g):p=p.next=w,s|=m;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;m=a,a=m.next,m.next=null,r.lastBaseUpdate=m,r.shared.pending=null}}while(!0);if(p===null&&(l=g),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=p,n=r.shared.interleaved,n!==null){r=n;do s|=r.lane,r=r.next;while(r!==n)}else o===null&&(r.shared.lanes=0);Yn|=s,e.lanes=s,e.memoizedState=g}}function fl(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var i=e[n],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(x(191,r));r.call(i)}}}var ji={},Ze=Mn(ji),vi=Mn(ji),wi=Mn(ji);function $n(e){if(e===ji)throw Error(x(174));return e}function oa(e,n){switch($(wi,n),$(vi,e),$(Ze,ji),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Ko(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Ko(n,e)}G(Ze),$(Ze,n)}function jt(){G(Ze),G(vi),G(wi)}function bd(e){$n(wi.current);var n=$n(Ze.current),t=Ko(n,e.type);n!==t&&($(vi,e),$(Ze,t))}function sa(e){vi.current===e&&(G(Ze),G(vi))}var J=Mn(0);function Ar(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var So=[];function aa(){for(var e=0;e<So.length;e++)So[e]._workInProgressVersionPrimary=null;So.length=0}var or=hn.ReactCurrentDispatcher,Po=hn.ReactCurrentBatchConfig,Qn=0,X=null,re=null,se=null,Er=!1,ii=!1,bi=0,Mh=0;function he(){throw Error(x(321))}function la(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ve(e[t],n[t]))return!1;return!0}function ca(e,n,t,i,r,o){if(Qn=o,X=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,or.current=e===null||e.memoizedState===null?Rh:Oh,e=t(i,r),ii){o=0;do{if(ii=!1,bi=0,25<=o)throw Error(x(301));o+=1,se=re=null,n.updateQueue=null,or.current=_h,e=t(i,r)}while(ii)}if(or.current=jr,n=re!==null&&re.next!==null,Qn=0,se=re=X=null,Er=!1,n)throw Error(x(300));return e}function da(){var e=bi!==0;return bi=0,e}function Ye(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return se===null?X.memoizedState=se=e:se=se.next=e,se}function _e(){if(re===null){var e=X.alternate;e=e!==null?e.memoizedState:null}else e=re.next;var n=se===null?X.memoizedState:se.next;if(n!==null)se=n,re=e;else{if(e===null)throw Error(x(310));re=e,e={memoizedState:re.memoizedState,baseState:re.baseState,baseQueue:re.baseQueue,queue:re.queue,next:null},se===null?X.memoizedState=se=e:se=se.next=e}return se}function ki(e,n){return typeof n=="function"?n(e):n}function Ao(e){var n=_e(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var i=re,r=i.baseQueue,o=t.pending;if(o!==null){if(r!==null){var s=r.next;r.next=o.next,o.next=s}i.baseQueue=r=o,t.pending=null}if(r!==null){o=r.next,i=i.baseState;var a=s=null,l=null,c=o;do{var p=c.lane;if((Qn&p)===p)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:e(i,c.action);else{var g={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=g,s=i):l=l.next=g,X.lanes|=p,Yn|=p}c=c.next}while(c!==null&&c!==o);l===null?s=i:l.next=a,Ve(i,n.memoizedState)||(Te=!0),n.memoizedState=i,n.baseState=s,n.baseQueue=l,t.lastRenderedState=i}if(e=t.interleaved,e!==null){r=e;do o=r.lane,X.lanes|=o,Yn|=o,r=r.next;while(r!==e)}else r===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Eo(e){var n=_e(),t=n.queue;if(t===null)throw Error(x(311));t.lastRenderedReducer=e;var i=t.dispatch,r=t.pending,o=n.memoizedState;if(r!==null){t.pending=null;var s=r=r.next;do o=e(o,s.action),s=s.next;while(s!==r);Ve(o,n.memoizedState)||(Te=!0),n.memoizedState=o,n.baseQueue===null&&(n.baseState=o),t.lastRenderedState=o}return[o,i]}function kd(){}function xd(e,n){var t=X,i=_e(),r=n(),o=!Ve(i.memoizedState,r);if(o&&(i.memoizedState=r,Te=!0),i=i.queue,ua(Td.bind(null,t,i,e),[e]),i.getSnapshot!==n||o||se!==null&&se.memoizedState.tag&1){if(t.flags|=2048,xi(9,Id.bind(null,t,i,r,n),void 0,null),ae===null)throw Error(x(349));Qn&30||Cd(t,n,r)}return r}function Cd(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=X.updateQueue,n===null?(n={lastEffect:null,stores:null},X.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Id(e,n,t,i){n.value=t,n.getSnapshot=i,Sd(n)&&Pd(e)}function Td(e,n,t){return t(function(){Sd(n)&&Pd(e)})}function Sd(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ve(e,t)}catch{return!0}}function Pd(e){var n=un(e,1);n!==null&&Ge(n,e,1,-1)}function ml(e){var n=Ye();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:e},n.queue=e,e=e.dispatch=Wh.bind(null,X,e),[n.memoizedState,e]}function xi(e,n,t,i){return e={tag:e,create:n,destroy:t,deps:i,next:null},n=X.updateQueue,n===null?(n={lastEffect:null,stores:null},X.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(i=t.next,t.next=e,e.next=i,n.lastEffect=e)),e}function Ad(){return _e().memoizedState}function sr(e,n,t,i){var r=Ye();X.flags|=e,r.memoizedState=xi(1|n,t,void 0,i===void 0?null:i)}function Kr(e,n,t,i){var r=_e();i=i===void 0?null:i;var o=void 0;if(re!==null){var s=re.memoizedState;if(o=s.destroy,i!==null&&la(i,s.deps)){r.memoizedState=xi(n,t,o,i);return}}X.flags|=e,r.memoizedState=xi(1|n,t,o,i)}function yl(e,n){return sr(8390656,8,e,n)}function ua(e,n){return Kr(2048,8,e,n)}function Ed(e,n){return Kr(4,2,e,n)}function jd(e,n){return Kr(4,4,e,n)}function Ld(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Nd(e,n,t){return t=t!=null?t.concat([e]):null,Kr(4,4,Ld.bind(null,n,e),t)}function pa(){}function Fd(e,n){var t=_e();n=n===void 0?null:n;var i=t.memoizedState;return i!==null&&n!==null&&la(n,i[1])?i[0]:(t.memoizedState=[e,n],e)}function Md(e,n){var t=_e();n=n===void 0?null:n;var i=t.memoizedState;return i!==null&&n!==null&&la(n,i[1])?i[0]:(e=e(),t.memoizedState=[e,n],e)}function Dd(e,n,t){return Qn&21?(Ve(t,n)||(t=_c(),X.lanes|=t,Yn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Te=!0),e.memoizedState=t)}function Dh(e,n){var t=z;z=t!==0&&4>t?t:4,e(!0);var i=Po.transition;Po.transition={};try{e(!1),n()}finally{z=t,Po.transition=i}}function qd(){return _e().memoizedState}function qh(e,n,t){var i=An(e);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},Wd(e))Rd(n,t);else if(t=vd(e,n,t,i),t!==null){var r=we();Ge(t,e,i,r),Od(t,n,i)}}function Wh(e,n,t){var i=An(e),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(Wd(e))Rd(n,r);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=n.lastRenderedReducer,o!==null))try{var s=n.lastRenderedState,a=o(s,t);if(r.hasEagerState=!0,r.eagerState=a,Ve(a,s)){var l=n.interleaved;l===null?(r.next=r,ia(n)):(r.next=l.next,l.next=r),n.interleaved=r;return}}catch{}finally{}t=vd(e,n,r,i),t!==null&&(r=we(),Ge(t,e,i,r),Od(t,n,i))}}function Wd(e){var n=e.alternate;return e===X||n!==null&&n===X}function Rd(e,n){ii=Er=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Od(e,n,t){if(t&4194240){var i=n.lanes;i&=e.pendingLanes,t|=i,n.lanes=t,zs(e,t)}}var jr={readContext:Oe,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},Rh={readContext:Oe,useCallback:function(e,n){return Ye().memoizedState=[e,n===void 0?null:n],e},useContext:Oe,useEffect:yl,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,sr(4194308,4,Ld.bind(null,n,e),t)},useLayoutEffect:function(e,n){return sr(4194308,4,e,n)},useInsertionEffect:function(e,n){return sr(4,2,e,n)},useMemo:function(e,n){var t=Ye();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var i=Ye();return n=t!==void 0?t(n):n,i.memoizedState=i.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},i.queue=e,e=e.dispatch=qh.bind(null,X,e),[i.memoizedState,e]},useRef:function(e){var n=Ye();return e={current:e},n.memoizedState=e},useState:ml,useDebugValue:pa,useDeferredValue:function(e){return Ye().memoizedState=e},useTransition:function(){var e=ml(!1),n=e[0];return e=Dh.bind(null,e[1]),Ye().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var i=X,r=Ye();if(Q){if(t===void 0)throw Error(x(407));t=t()}else{if(t=n(),ae===null)throw Error(x(349));Qn&30||Cd(i,n,t)}r.memoizedState=t;var o={value:t,getSnapshot:n};return r.queue=o,yl(Td.bind(null,i,o,e),[e]),i.flags|=2048,xi(9,Id.bind(null,i,o,t,n),void 0,null),t},useId:function(){var e=Ye(),n=ae.identifierPrefix;if(Q){var t=sn,i=on;t=(i&~(1<<32-Ke(i)-1)).toString(32)+t,n=":"+n+"R"+t,t=bi++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Mh++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Oh={readContext:Oe,useCallback:Fd,useContext:Oe,useEffect:ua,useImperativeHandle:Nd,useInsertionEffect:Ed,useLayoutEffect:jd,useMemo:Md,useReducer:Ao,useRef:Ad,useState:function(){return Ao(ki)},useDebugValue:pa,useDeferredValue:function(e){var n=_e();return Dd(n,re.memoizedState,e)},useTransition:function(){var e=Ao(ki)[0],n=_e().memoizedState;return[e,n]},useMutableSource:kd,useSyncExternalStore:xd,useId:qd,unstable_isNewReconciler:!1},_h={readContext:Oe,useCallback:Fd,useContext:Oe,useEffect:ua,useImperativeHandle:Nd,useInsertionEffect:Ed,useLayoutEffect:jd,useMemo:Md,useReducer:Eo,useRef:Ad,useState:function(){return Eo(ki)},useDebugValue:pa,useDeferredValue:function(e){var n=_e();return re===null?n.memoizedState=e:Dd(n,re.memoizedState,e)},useTransition:function(){var e=Eo(ki)[0],n=_e().memoizedState;return[e,n]},useMutableSource:kd,useSyncExternalStore:xd,useId:qd,unstable_isNewReconciler:!1};function Ue(e,n){if(e&&e.defaultProps){n=Z({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function hs(e,n,t,i){n=e.memoizedState,t=t(i,n),t=t==null?n:Z({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Gr={isMounted:function(e){return(e=e._reactInternals)?Zn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var i=we(),r=An(e),o=ln(i,r);o.payload=n,t!=null&&(o.callback=t),n=Sn(e,o,r),n!==null&&(Ge(n,e,r,i),rr(n,e,r))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var i=we(),r=An(e),o=ln(i,r);o.tag=1,o.payload=n,t!=null&&(o.callback=t),n=Sn(e,o,r),n!==null&&(Ge(n,e,r,i),rr(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=we(),i=An(e),r=ln(t,i);r.tag=2,n!=null&&(r.callback=n),n=Sn(e,r,i),n!==null&&(Ge(n,e,i,t),rr(n,e,i))}};function gl(e,n,t,i,r,o,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,o,s):n.prototype&&n.prototype.isPureReactComponent?!fi(t,i)||!fi(r,o):!0}function _d(e,n,t){var i=!1,r=Ln,o=n.contextType;return typeof o=="object"&&o!==null?o=Oe(o):(r=Pe(n)?Gn:ye.current,i=n.contextTypes,o=(i=i!=null)?Pt(e,r):Ln),n=new n(t,o),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Gr,e.stateNode=n,n._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=o),n}function vl(e,n,t,i){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,i),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,i),n.state!==e&&Gr.enqueueReplaceState(n,n.state,null)}function fs(e,n,t,i){var r=e.stateNode;r.props=t,r.state=e.memoizedState,r.refs={},ra(e);var o=n.contextType;typeof o=="object"&&o!==null?r.context=Oe(o):(o=Pe(n)?Gn:ye.current,r.context=Pt(e,o)),r.state=e.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(hs(e,n,o,t),r.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(n=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),n!==r.state&&Gr.enqueueReplaceState(r,r.state,null),Pr(e,t,r,i),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Lt(e,n){try{var t="",i=n;do t+=fp(i),i=i.return;while(i);var r=t}catch(o){r=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:n,stack:r,digest:null}}function jo(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function ms(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Bh=typeof WeakMap=="function"?WeakMap:Map;function Bd(e,n,t){t=ln(-1,t),t.tag=3,t.payload={element:null};var i=n.value;return t.callback=function(){Nr||(Nr=!0,Ts=i),ms(e,n)},t}function Ud(e,n,t){t=ln(-1,t),t.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var r=n.value;t.payload=function(){return i(r)},t.callback=function(){ms(e,n)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(t.callback=function(){ms(e,n),typeof i!="function"&&(Pn===null?Pn=new Set([this]):Pn.add(this));var s=n.stack;this.componentDidCatch(n.value,{componentStack:s!==null?s:""})}),t}function wl(e,n,t){var i=e.pingCache;if(i===null){i=e.pingCache=new Bh;var r=new Set;i.set(n,r)}else r=i.get(n),r===void 0&&(r=new Set,i.set(n,r));r.has(t)||(r.add(t),e=nf.bind(null,e,n,t),n.then(e,e))}function bl(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function kl(e,n,t,i,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=ln(-1,1),n.tag=2,Sn(t,n,1))),t.lanes|=1),e)}var Uh=hn.ReactCurrentOwner,Te=!1;function ge(e,n,t,i){n.child=e===null?gd(n,null,t,i):Et(n,e.child,t,i)}function xl(e,n,t,i,r){t=t.render;var o=n.ref;return kt(n,r),i=ca(e,n,t,i,o,r),t=da(),e!==null&&!Te?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~r,pn(e,n,r)):(Q&&t&&Js(n),n.flags|=1,ge(e,n,i,r),n.child)}function Cl(e,n,t,i,r){if(e===null){var o=t.type;return typeof o=="function"&&!ba(o)&&o.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=o,zd(e,n,o,i,r)):(e=dr(t.type,null,i,n,n.mode,r),e.ref=n.ref,e.return=n,n.child=e)}if(o=e.child,!(e.lanes&r)){var s=o.memoizedProps;if(t=t.compare,t=t!==null?t:fi,t(s,i)&&e.ref===n.ref)return pn(e,n,r)}return n.flags|=1,e=En(o,i),e.ref=n.ref,e.return=n,n.child=e}function zd(e,n,t,i,r){if(e!==null){var o=e.memoizedProps;if(fi(o,i)&&e.ref===n.ref)if(Te=!1,n.pendingProps=i=o,(e.lanes&r)!==0)e.flags&131072&&(Te=!0);else return n.lanes=e.lanes,pn(e,n,r)}return ys(e,n,t,i,r)}function $d(e,n,t){var i=n.pendingProps,r=i.children,o=e!==null?e.memoizedState:null;if(i.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(mt,Ee),Ee|=t;else{if(!(t&1073741824))return e=o!==null?o.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,$(mt,Ee),Ee|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=o!==null?o.baseLanes:t,$(mt,Ee),Ee|=i}else o!==null?(i=o.baseLanes|t,n.memoizedState=null):i=t,$(mt,Ee),Ee|=i;return ge(e,n,r,t),n.child}function Hd(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function ys(e,n,t,i,r){var o=Pe(t)?Gn:ye.current;return o=Pt(n,o),kt(n,r),t=ca(e,n,t,i,o,r),i=da(),e!==null&&!Te?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~r,pn(e,n,r)):(Q&&i&&Js(n),n.flags|=1,ge(e,n,t,r),n.child)}function Il(e,n,t,i,r){if(Pe(t)){var o=!0;xr(n)}else o=!1;if(kt(n,r),n.stateNode===null)ar(e,n),_d(n,t,i),fs(n,t,i,r),i=!0;else if(e===null){var s=n.stateNode,a=n.memoizedProps;s.props=a;var l=s.context,c=t.contextType;typeof c=="object"&&c!==null?c=Oe(c):(c=Pe(t)?Gn:ye.current,c=Pt(n,c));var p=t.getDerivedStateFromProps,g=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function";g||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==i||l!==c)&&vl(n,s,i,c),gn=!1;var m=n.memoizedState;s.state=m,Pr(n,i,s,r),l=n.memoizedState,a!==i||m!==l||Se.current||gn?(typeof p=="function"&&(hs(n,t,p,i),l=n.memoizedState),(a=gn||gl(n,t,a,i,m,l,c))?(g||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(n.flags|=4194308)):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=i,n.memoizedState=l),s.props=i,s.state=l,s.context=c,i=a):(typeof s.componentDidMount=="function"&&(n.flags|=4194308),i=!1)}else{s=n.stateNode,wd(e,n),a=n.memoizedProps,c=n.type===n.elementType?a:Ue(n.type,a),s.props=c,g=n.pendingProps,m=s.context,l=t.contextType,typeof l=="object"&&l!==null?l=Oe(l):(l=Pe(t)?Gn:ye.current,l=Pt(n,l));var w=t.getDerivedStateFromProps;(p=typeof w=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==g||m!==l)&&vl(n,s,i,l),gn=!1,m=n.memoizedState,s.state=m,Pr(n,i,s,r);var d=n.memoizedState;a!==g||m!==d||Se.current||gn?(typeof w=="function"&&(hs(n,t,w,i),d=n.memoizedState),(c=gn||gl(n,t,c,i,m,d,l)||!1)?(p||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,d,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,d,l)),typeof s.componentDidUpdate=="function"&&(n.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),n.memoizedProps=i,n.memoizedState=d),s.props=i,s.state=d,s.context=l,i=c):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(n.flags|=1024),i=!1)}return gs(e,n,t,i,o,r)}function gs(e,n,t,i,r,o){Hd(e,n);var s=(n.flags&128)!==0;if(!i&&!s)return r&&cl(n,t,!1),pn(e,n,o);i=n.stateNode,Uh.current=n;var a=s&&typeof t.getDerivedStateFromError!="function"?null:i.render();return n.flags|=1,e!==null&&s?(n.child=Et(n,e.child,null,o),n.child=Et(n,null,a,o)):ge(e,n,a,o),n.memoizedState=i.state,r&&cl(n,t,!0),n.child}function Kd(e){var n=e.stateNode;n.pendingContext?ll(e,n.pendingContext,n.pendingContext!==n.context):n.context&&ll(e,n.context,!1),oa(e,n.containerInfo)}function Tl(e,n,t,i,r){return At(),Zs(r),n.flags|=256,ge(e,n,t,i),n.child}var vs={dehydrated:null,treeContext:null,retryLane:0};function ws(e){return{baseLanes:e,cachePool:null,transitions:null}}function Gd(e,n,t){var i=n.pendingProps,r=J.current,o=!1,s=(n.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(r&2)!==0),a?(o=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),$(J,r&1),e===null)return us(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(s=i.children,e=i.fallback,o?(i=n.mode,o=n.child,s={mode:"hidden",children:s},!(i&1)&&o!==null?(o.childLanes=0,o.pendingProps=s):o=Yr(s,i,0,null),e=Kn(e,i,t,null),o.return=n,e.return=n,o.sibling=e,n.child=o,n.child.memoizedState=ws(t),n.memoizedState=vs,e):ha(n,s));if(r=e.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return zh(e,n,s,i,a,r,t);if(o){o=i.fallback,s=n.mode,r=e.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(s&1)&&n.child!==r?(i=n.child,i.childLanes=0,i.pendingProps=l,n.deletions=null):(i=En(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?o=En(a,o):(o=Kn(o,s,t,null),o.flags|=2),o.return=n,i.return=n,i.sibling=o,n.child=i,i=o,o=n.child,s=e.child.memoizedState,s=s===null?ws(t):{baseLanes:s.baseLanes|t,cachePool:null,transitions:s.transitions},o.memoizedState=s,o.childLanes=e.childLanes&~t,n.memoizedState=vs,i}return o=e.child,e=o.sibling,i=En(o,{mode:"visible",children:i.children}),!(n.mode&1)&&(i.lanes=t),i.return=n,i.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=i,n.memoizedState=null,i}function ha(e,n){return n=Yr({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Ki(e,n,t,i){return i!==null&&Zs(i),Et(n,e.child,null,t),e=ha(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function zh(e,n,t,i,r,o,s){if(t)return n.flags&256?(n.flags&=-257,i=jo(Error(x(422))),Ki(e,n,s,i)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(o=i.fallback,r=n.mode,i=Yr({mode:"visible",children:i.children},r,0,null),o=Kn(o,r,s,null),o.flags|=2,i.return=n,o.return=n,i.sibling=o,n.child=i,n.mode&1&&Et(n,e.child,null,s),n.child.memoizedState=ws(s),n.memoizedState=vs,o);if(!(n.mode&1))return Ki(e,n,s,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,o=Error(x(419)),i=jo(o,i,void 0),Ki(e,n,s,i)}if(a=(s&e.childLanes)!==0,Te||a){if(i=ae,i!==null){switch(s&-s){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|s)?0:r,r!==0&&r!==o.retryLane&&(o.retryLane=r,un(e,r),Ge(i,e,r,-1))}return wa(),i=jo(Error(x(421))),Ki(e,n,s,i)}return r.data==="$?"?(n.flags|=128,n.child=e.child,n=tf.bind(null,e),r._reactRetry=n,null):(e=o.treeContext,je=Tn(r.nextSibling),Le=n,Q=!0,$e=null,e!==null&&(De[qe++]=on,De[qe++]=sn,De[qe++]=Vn,on=e.id,sn=e.overflow,Vn=n),n=ha(n,i.children),n.flags|=4096,n)}function Sl(e,n,t){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n),ps(e.return,n,t)}function Lo(e,n,t,i,r){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(o.isBackwards=n,o.rendering=null,o.renderingStartTime=0,o.last=i,o.tail=t,o.tailMode=r)}function Vd(e,n,t){var i=n.pendingProps,r=i.revealOrder,o=i.tail;if(ge(e,n,i.children,t),i=J.current,i&2)i=i&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Sl(e,t,n);else if(e.tag===19)Sl(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if($(J,i),!(n.mode&1))n.memoizedState=null;else switch(r){case"forwards":for(t=n.child,r=null;t!==null;)e=t.alternate,e!==null&&Ar(e)===null&&(r=t),t=t.sibling;t=r,t===null?(r=n.child,n.child=null):(r=t.sibling,t.sibling=null),Lo(n,!1,r,t,o);break;case"backwards":for(t=null,r=n.child,n.child=null;r!==null;){if(e=r.alternate,e!==null&&Ar(e)===null){n.child=r;break}e=r.sibling,r.sibling=t,t=r,r=e}Lo(n,!0,t,null,o);break;case"together":Lo(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function ar(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function pn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Yn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(x(153));if(n.child!==null){for(e=n.child,t=En(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=En(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function $h(e,n,t){switch(n.tag){case 3:Kd(n),At();break;case 5:bd(n);break;case 1:Pe(n.type)&&xr(n);break;case 4:oa(n,n.stateNode.containerInfo);break;case 10:var i=n.type._context,r=n.memoizedProps.value;$(Tr,i._currentValue),i._currentValue=r;break;case 13:if(i=n.memoizedState,i!==null)return i.dehydrated!==null?($(J,J.current&1),n.flags|=128,null):t&n.child.childLanes?Gd(e,n,t):($(J,J.current&1),e=pn(e,n,t),e!==null?e.sibling:null);$(J,J.current&1);break;case 19:if(i=(t&n.childLanes)!==0,e.flags&128){if(i)return Vd(e,n,t);n.flags|=128}if(r=n.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),$(J,J.current),i)break;return null;case 22:case 23:return n.lanes=0,$d(e,n,t)}return pn(e,n,t)}var Qd,bs,Yd,Jd;Qd=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};bs=function(){};Yd=function(e,n,t,i){var r=e.memoizedProps;if(r!==i){e=n.stateNode,$n(Ze.current);var o=null;switch(t){case"input":r=Uo(e,r),i=Uo(e,i),o=[];break;case"select":r=Z({},r,{value:void 0}),i=Z({},i,{value:void 0}),o=[];break;case"textarea":r=Ho(e,r),i=Ho(e,i),o=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=br)}Go(t,i);var s;t=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(s in a)a.hasOwnProperty(s)&&(t||(t={}),t[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ai.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(t||(t={}),t[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(t||(t={}),t[s]=l[s])}else t||(o||(o=[]),o.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(o=o||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(o=o||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ai.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&K("scroll",e),o||a===l||(o=[])):(o=o||[]).push(c,l))}t&&(o=o||[]).push("style",t);var c=o;(n.updateQueue=c)&&(n.flags|=4)}};Jd=function(e,n,t,i){t!==i&&(n.flags|=4)};function Ht(e,n){if(!Q)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function fe(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,i=0;if(n)for(var r=e.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=i,e.childLanes=t,n}function Hh(e,n,t){var i=n.pendingProps;switch(Xs(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return fe(n),null;case 1:return Pe(n.type)&&kr(),fe(n),null;case 3:return i=n.stateNode,jt(),G(Se),G(ye),aa(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&($i(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,$e!==null&&(As($e),$e=null))),bs(e,n),fe(n),null;case 5:sa(n);var r=$n(wi.current);if(t=n.type,e!==null&&n.stateNode!=null)Yd(e,n,t,i,r),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!i){if(n.stateNode===null)throw Error(x(166));return fe(n),null}if(e=$n(Ze.current),$i(n)){i=n.stateNode,t=n.type;var o=n.memoizedProps;switch(i[Je]=n,i[gi]=o,e=(n.mode&1)!==0,t){case"dialog":K("cancel",i),K("close",i);break;case"iframe":case"object":case"embed":K("load",i);break;case"video":case"audio":for(r=0;r<Yt.length;r++)K(Yt[r],i);break;case"source":K("error",i);break;case"img":case"image":case"link":K("error",i),K("load",i);break;case"details":K("toggle",i);break;case"input":Da(i,o),K("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!o.multiple},K("invalid",i);break;case"textarea":Wa(i,o),K("invalid",i)}Go(t,o),r=null;for(var s in o)if(o.hasOwnProperty(s)){var a=o[s];s==="children"?typeof a=="string"?i.textContent!==a&&(o.suppressHydrationWarning!==!0&&zi(i.textContent,a,e),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(o.suppressHydrationWarning!==!0&&zi(i.textContent,a,e),r=["children",""+a]):ai.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&K("scroll",i)}switch(t){case"input":Di(i),qa(i,o,!0);break;case"textarea":Di(i),Ra(i);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(i.onclick=br)}i=r,n.updateQueue=i,i!==null&&(n.flags|=4)}else{s=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Tc(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=s.createElement(t,{is:i.is}):(e=s.createElement(t),t==="select"&&(s=e,i.multiple?s.multiple=!0:i.size&&(s.size=i.size))):e=s.createElementNS(e,t),e[Je]=n,e[gi]=i,Qd(e,n,!1,!1),n.stateNode=e;e:{switch(s=Vo(t,i),t){case"dialog":K("cancel",e),K("close",e),r=i;break;case"iframe":case"object":case"embed":K("load",e),r=i;break;case"video":case"audio":for(r=0;r<Yt.length;r++)K(Yt[r],e);r=i;break;case"source":K("error",e),r=i;break;case"img":case"image":case"link":K("error",e),K("load",e),r=i;break;case"details":K("toggle",e),r=i;break;case"input":Da(e,i),r=Uo(e,i),K("invalid",e);break;case"option":r=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},r=Z({},i,{value:void 0}),K("invalid",e);break;case"textarea":Wa(e,i),r=Ho(e,i),K("invalid",e);break;default:r=i}Go(t,r),a=r;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];o==="style"?Ac(e,l):o==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Sc(e,l)):o==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&li(e,l):typeof l=="number"&&li(e,""+l):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(ai.hasOwnProperty(o)?l!=null&&o==="onScroll"&&K("scroll",e):l!=null&&Ws(e,o,l,s))}switch(t){case"input":Di(e),qa(e,i,!1);break;case"textarea":Di(e),Ra(e);break;case"option":i.value!=null&&e.setAttribute("value",""+jn(i.value));break;case"select":e.multiple=!!i.multiple,o=i.value,o!=null?gt(e,!!i.multiple,o,!1):i.defaultValue!=null&&gt(e,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=br)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return fe(n),null;case 6:if(e&&n.stateNode!=null)Jd(e,n,e.memoizedProps,i);else{if(typeof i!="string"&&n.stateNode===null)throw Error(x(166));if(t=$n(wi.current),$n(Ze.current),$i(n)){if(i=n.stateNode,t=n.memoizedProps,i[Je]=n,(o=i.nodeValue!==t)&&(e=Le,e!==null))switch(e.tag){case 3:zi(i.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&zi(i.nodeValue,t,(e.mode&1)!==0)}o&&(n.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[Je]=n,n.stateNode=i}return fe(n),null;case 13:if(G(J),i=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&je!==null&&n.mode&1&&!(n.flags&128))md(),At(),n.flags|=98560,o=!1;else if(o=$i(n),i!==null&&i.dehydrated!==null){if(e===null){if(!o)throw Error(x(318));if(o=n.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(x(317));o[Je]=n}else At(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;fe(n),o=!1}else $e!==null&&(As($e),$e=null),o=!0;if(!o)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(n.child.flags|=8192,n.mode&1&&(e===null||J.current&1?oe===0&&(oe=3):wa())),n.updateQueue!==null&&(n.flags|=4),fe(n),null);case 4:return jt(),bs(e,n),e===null&&mi(n.stateNode.containerInfo),fe(n),null;case 10:return ta(n.type._context),fe(n),null;case 17:return Pe(n.type)&&kr(),fe(n),null;case 19:if(G(J),o=n.memoizedState,o===null)return fe(n),null;if(i=(n.flags&128)!==0,s=o.rendering,s===null)if(i)Ht(o,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(s=Ar(e),s!==null){for(n.flags|=128,Ht(o,!1),i=s.updateQueue,i!==null&&(n.updateQueue=i,n.flags|=4),n.subtreeFlags=0,i=t,t=n.child;t!==null;)o=t,e=i,o.flags&=14680066,s=o.alternate,s===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return $(J,J.current&1|2),n.child}e=e.sibling}o.tail!==null&&ne()>Nt&&(n.flags|=128,i=!0,Ht(o,!1),n.lanes=4194304)}else{if(!i)if(e=Ar(s),e!==null){if(n.flags|=128,i=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Ht(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!Q)return fe(n),null}else 2*ne()-o.renderingStartTime>Nt&&t!==1073741824&&(n.flags|=128,i=!0,Ht(o,!1),n.lanes=4194304);o.isBackwards?(s.sibling=n.child,n.child=s):(t=o.last,t!==null?t.sibling=s:n.child=s,o.last=s)}return o.tail!==null?(n=o.tail,o.rendering=n,o.tail=n.sibling,o.renderingStartTime=ne(),n.sibling=null,t=J.current,$(J,i?t&1|2:t&1),n):(fe(n),null);case 22:case 23:return va(),i=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(n.flags|=8192),i&&n.mode&1?Ee&1073741824&&(fe(n),n.subtreeFlags&6&&(n.flags|=8192)):fe(n),null;case 24:return null;case 25:return null}throw Error(x(156,n.tag))}function Kh(e,n){switch(Xs(n),n.tag){case 1:return Pe(n.type)&&kr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return jt(),G(Se),G(ye),aa(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return sa(n),null;case 13:if(G(J),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(x(340));At()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return G(J),null;case 4:return jt(),null;case 10:return ta(n.type._context),null;case 22:case 23:return va(),null;case 24:return null;default:return null}}var Gi=!1,me=!1,Gh=typeof WeakSet=="function"?WeakSet:Set,P=null;function ft(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){ee(e,n,i)}else t.current=null}function ks(e,n,t){try{t()}catch(i){ee(e,n,i)}}var Pl=!1;function Vh(e,n){if(rs=gr,e=td(),Ys(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{t.nodeType,o.nodeType}catch{t=null;break e}var s=0,a=-1,l=-1,c=0,p=0,g=e,m=null;n:for(;;){for(var w;g!==t||r!==0&&g.nodeType!==3||(a=s+r),g!==o||i!==0&&g.nodeType!==3||(l=s+i),g.nodeType===3&&(s+=g.nodeValue.length),(w=g.firstChild)!==null;)m=g,g=w;for(;;){if(g===e)break n;if(m===t&&++c===r&&(a=s),m===o&&++p===i&&(l=s),(w=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=w}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(os={focusedElem:e,selectionRange:t},gr=!1,P=n;P!==null;)if(n=P,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,P=e;else for(;P!==null;){n=P;try{var d=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var b=d.memoizedProps,C=d.memoizedState,y=n.stateNode,f=y.getSnapshotBeforeUpdate(n.elementType===n.type?b:Ue(n.type,b),C);y.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var v=n.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(k){ee(n,n.return,k)}if(e=n.sibling,e!==null){e.return=n.return,P=e;break}P=n.return}return d=Pl,Pl=!1,d}function ri(e,n,t){var i=n.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&e)===e){var o=r.destroy;r.destroy=void 0,o!==void 0&&ks(n,t,o)}r=r.next}while(r!==i)}}function Vr(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var i=t.create;t.destroy=i()}t=t.next}while(t!==n)}}function xs(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function Xd(e){var n=e.alternate;n!==null&&(e.alternate=null,Xd(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Je],delete n[gi],delete n[ls],delete n[jh],delete n[Lh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Zd(e){return e.tag===5||e.tag===3||e.tag===4}function Al(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Zd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Cs(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=br));else if(i!==4&&(e=e.child,e!==null))for(Cs(e,n,t),e=e.sibling;e!==null;)Cs(e,n,t),e=e.sibling}function Is(e,n,t){var i=e.tag;if(i===5||i===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(Is(e,n,t),e=e.sibling;e!==null;)Is(e,n,t),e=e.sibling}var le=null,ze=!1;function mn(e,n,t){for(t=t.child;t!==null;)eu(e,n,t),t=t.sibling}function eu(e,n,t){if(Xe&&typeof Xe.onCommitFiberUnmount=="function")try{Xe.onCommitFiberUnmount(_r,t)}catch{}switch(t.tag){case 5:me||ft(t,n);case 6:var i=le,r=ze;le=null,mn(e,n,t),le=i,ze=r,le!==null&&(ze?(e=le,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):le.removeChild(t.stateNode));break;case 18:le!==null&&(ze?(e=le,t=t.stateNode,e.nodeType===8?Io(e.parentNode,t):e.nodeType===1&&Io(e,t),pi(e)):Io(le,t.stateNode));break;case 4:i=le,r=ze,le=t.stateNode.containerInfo,ze=!0,mn(e,n,t),le=i,ze=r;break;case 0:case 11:case 14:case 15:if(!me&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var o=r,s=o.destroy;o=o.tag,s!==void 0&&(o&2||o&4)&&ks(t,n,s),r=r.next}while(r!==i)}mn(e,n,t);break;case 1:if(!me&&(ft(t,n),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){ee(t,n,a)}mn(e,n,t);break;case 21:mn(e,n,t);break;case 22:t.mode&1?(me=(i=me)||t.memoizedState!==null,mn(e,n,t),me=i):mn(e,n,t);break;default:mn(e,n,t)}}function El(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new Gh),n.forEach(function(i){var r=rf.bind(null,e,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Be(e,n){var t=n.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var o=e,s=n,a=s;e:for(;a!==null;){switch(a.tag){case 5:le=a.stateNode,ze=!1;break e;case 3:le=a.stateNode.containerInfo,ze=!0;break e;case 4:le=a.stateNode.containerInfo,ze=!0;break e}a=a.return}if(le===null)throw Error(x(160));eu(o,s,r),le=null,ze=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){ee(r,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)nu(n,e),n=n.sibling}function nu(e,n){var t=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Be(n,e),Qe(e),i&4){try{ri(3,e,e.return),Vr(3,e)}catch(b){ee(e,e.return,b)}try{ri(5,e,e.return)}catch(b){ee(e,e.return,b)}}break;case 1:Be(n,e),Qe(e),i&512&&t!==null&&ft(t,t.return);break;case 5:if(Be(n,e),Qe(e),i&512&&t!==null&&ft(t,t.return),e.flags&32){var r=e.stateNode;try{li(r,"")}catch(b){ee(e,e.return,b)}}if(i&4&&(r=e.stateNode,r!=null)){var o=e.memoizedProps,s=t!==null?t.memoizedProps:o,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&o.type==="radio"&&o.name!=null&&Cc(r,o),Vo(a,s);var c=Vo(a,o);for(s=0;s<l.length;s+=2){var p=l[s],g=l[s+1];p==="style"?Ac(r,g):p==="dangerouslySetInnerHTML"?Sc(r,g):p==="children"?li(r,g):Ws(r,p,g,c)}switch(a){case"input":zo(r,o);break;case"textarea":Ic(r,o);break;case"select":var m=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!o.multiple;var w=o.value;w!=null?gt(r,!!o.multiple,w,!1):m!==!!o.multiple&&(o.defaultValue!=null?gt(r,!!o.multiple,o.defaultValue,!0):gt(r,!!o.multiple,o.multiple?[]:"",!1))}r[gi]=o}catch(b){ee(e,e.return,b)}}break;case 6:if(Be(n,e),Qe(e),i&4){if(e.stateNode===null)throw Error(x(162));r=e.stateNode,o=e.memoizedProps;try{r.nodeValue=o}catch(b){ee(e,e.return,b)}}break;case 3:if(Be(n,e),Qe(e),i&4&&t!==null&&t.memoizedState.isDehydrated)try{pi(n.containerInfo)}catch(b){ee(e,e.return,b)}break;case 4:Be(n,e),Qe(e);break;case 13:Be(n,e),Qe(e),r=e.child,r.flags&8192&&(o=r.memoizedState!==null,r.stateNode.isHidden=o,!o||r.alternate!==null&&r.alternate.memoizedState!==null||(ya=ne())),i&4&&El(e);break;case 22:if(p=t!==null&&t.memoizedState!==null,e.mode&1?(me=(c=me)||p,Be(n,e),me=c):Be(n,e),Qe(e),i&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(P=e,p=e.child;p!==null;){for(g=P=p;P!==null;){switch(m=P,w=m.child,m.tag){case 0:case 11:case 14:case 15:ri(4,m,m.return);break;case 1:ft(m,m.return);var d=m.stateNode;if(typeof d.componentWillUnmount=="function"){i=m,t=m.return;try{n=i,d.props=n.memoizedProps,d.state=n.memoizedState,d.componentWillUnmount()}catch(b){ee(i,t,b)}}break;case 5:ft(m,m.return);break;case 22:if(m.memoizedState!==null){Ll(g);continue}}w!==null?(w.return=m,P=w):Ll(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{r=g.stateNode,c?(o=r.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(a=g.stateNode,l=g.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Pc("display",s))}catch(b){ee(e,e.return,b)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(b){ee(e,e.return,b)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Be(n,e),Qe(e),i&4&&El(e);break;case 21:break;default:Be(n,e),Qe(e)}}function Qe(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(Zd(t)){var i=t;break e}t=t.return}throw Error(x(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(li(r,""),i.flags&=-33);var o=Al(e);Is(e,o,r);break;case 3:case 4:var s=i.stateNode.containerInfo,a=Al(e);Cs(e,a,s);break;default:throw Error(x(161))}}catch(l){ee(e,e.return,l)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Qh(e,n,t){P=e,tu(e)}function tu(e,n,t){for(var i=(e.mode&1)!==0;P!==null;){var r=P,o=r.child;if(r.tag===22&&i){var s=r.memoizedState!==null||Gi;if(!s){var a=r.alternate,l=a!==null&&a.memoizedState!==null||me;a=Gi;var c=me;if(Gi=s,(me=l)&&!c)for(P=r;P!==null;)s=P,l=s.child,s.tag===22&&s.memoizedState!==null?Nl(r):l!==null?(l.return=s,P=l):Nl(r);for(;o!==null;)P=o,tu(o),o=o.sibling;P=r,Gi=a,me=c}jl(e)}else r.subtreeFlags&8772&&o!==null?(o.return=r,P=o):jl(e)}}function jl(e){for(;P!==null;){var n=P;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:me||Vr(5,n);break;case 1:var i=n.stateNode;if(n.flags&4&&!me)if(t===null)i.componentDidMount();else{var r=n.elementType===n.type?t.memoizedProps:Ue(n.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var o=n.updateQueue;o!==null&&fl(n,o,i);break;case 3:var s=n.updateQueue;if(s!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}fl(n,s,t)}break;case 5:var a=n.stateNode;if(t===null&&n.flags&4){t=a;var l=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&pi(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}me||n.flags&512&&xs(n)}catch(m){ee(n,n.return,m)}}if(n===e){P=null;break}if(t=n.sibling,t!==null){t.return=n.return,P=t;break}P=n.return}}function Ll(e){for(;P!==null;){var n=P;if(n===e){P=null;break}var t=n.sibling;if(t!==null){t.return=n.return,P=t;break}P=n.return}}function Nl(e){for(;P!==null;){var n=P;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Vr(4,n)}catch(l){ee(n,t,l)}break;case 1:var i=n.stateNode;if(typeof i.componentDidMount=="function"){var r=n.return;try{i.componentDidMount()}catch(l){ee(n,r,l)}}var o=n.return;try{xs(n)}catch(l){ee(n,o,l)}break;case 5:var s=n.return;try{xs(n)}catch(l){ee(n,s,l)}}}catch(l){ee(n,n.return,l)}if(n===e){P=null;break}var a=n.sibling;if(a!==null){a.return=n.return,P=a;break}P=n.return}}var Yh=Math.ceil,Lr=hn.ReactCurrentDispatcher,fa=hn.ReactCurrentOwner,Re=hn.ReactCurrentBatchConfig,O=0,ae=null,te=null,de=0,Ee=0,mt=Mn(0),oe=0,Ci=null,Yn=0,Qr=0,ma=0,oi=null,Ie=null,ya=0,Nt=1/0,tn=null,Nr=!1,Ts=null,Pn=null,Vi=!1,kn=null,Fr=0,si=0,Ss=null,lr=-1,cr=0;function we(){return O&6?ne():lr!==-1?lr:lr=ne()}function An(e){return e.mode&1?O&2&&de!==0?de&-de:Fh.transition!==null?(cr===0&&(cr=_c()),cr):(e=z,e!==0||(e=window.event,e=e===void 0?16:Gc(e.type)),e):1}function Ge(e,n,t,i){if(50<si)throw si=0,Ss=null,Error(x(185));Pi(e,t,i),(!(O&2)||e!==ae)&&(e===ae&&(!(O&2)&&(Qr|=t),oe===4&&wn(e,de)),Ae(e,i),t===1&&O===0&&!(n.mode&1)&&(Nt=ne()+500,Hr&&Dn()))}function Ae(e,n){var t=e.callbackNode;Fp(e,n);var i=yr(e,e===ae?de:0);if(i===0)t!==null&&Ba(t),e.callbackNode=null,e.callbackPriority=0;else if(n=i&-i,e.callbackPriority!==n){if(t!=null&&Ba(t),n===1)e.tag===0?Nh(Fl.bind(null,e)):pd(Fl.bind(null,e)),Ah(function(){!(O&6)&&Dn()}),t=null;else{switch(Bc(i)){case 1:t=Us;break;case 4:t=Rc;break;case 16:t=mr;break;case 536870912:t=Oc;break;default:t=mr}t=du(t,iu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function iu(e,n){if(lr=-1,cr=0,O&6)throw Error(x(327));var t=e.callbackNode;if(xt()&&e.callbackNode!==t)return null;var i=yr(e,e===ae?de:0);if(i===0)return null;if(i&30||i&e.expiredLanes||n)n=Mr(e,i);else{n=i;var r=O;O|=2;var o=ou();(ae!==e||de!==n)&&(tn=null,Nt=ne()+500,Hn(e,n));do try{Zh();break}catch(a){ru(e,a)}while(!0);na(),Lr.current=o,O=r,te!==null?n=0:(ae=null,de=0,n=oe)}if(n!==0){if(n===2&&(r=Zo(e),r!==0&&(i=r,n=Ps(e,r))),n===1)throw t=Ci,Hn(e,0),wn(e,i),Ae(e,ne()),t;if(n===6)wn(e,i);else{if(r=e.current.alternate,!(i&30)&&!Jh(r)&&(n=Mr(e,i),n===2&&(o=Zo(e),o!==0&&(i=o,n=Ps(e,o))),n===1))throw t=Ci,Hn(e,0),wn(e,i),Ae(e,ne()),t;switch(e.finishedWork=r,e.finishedLanes=i,n){case 0:case 1:throw Error(x(345));case 2:_n(e,Ie,tn);break;case 3:if(wn(e,i),(i&130023424)===i&&(n=ya+500-ne(),10<n)){if(yr(e,0)!==0)break;if(r=e.suspendedLanes,(r&i)!==i){we(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=as(_n.bind(null,e,Ie,tn),n);break}_n(e,Ie,tn);break;case 4:if(wn(e,i),(i&4194240)===i)break;for(n=e.eventTimes,r=-1;0<i;){var s=31-Ke(i);o=1<<s,s=n[s],s>r&&(r=s),i&=~o}if(i=r,i=ne()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Yh(i/1960))-i,10<i){e.timeoutHandle=as(_n.bind(null,e,Ie,tn),i);break}_n(e,Ie,tn);break;case 5:_n(e,Ie,tn);break;default:throw Error(x(329))}}}return Ae(e,ne()),e.callbackNode===t?iu.bind(null,e):null}function Ps(e,n){var t=oi;return e.current.memoizedState.isDehydrated&&(Hn(e,n).flags|=256),e=Mr(e,n),e!==2&&(n=Ie,Ie=t,n!==null&&As(n)),e}function As(e){Ie===null?Ie=e:Ie.push.apply(Ie,e)}function Jh(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],o=r.getSnapshot;r=r.value;try{if(!Ve(o(),r))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function wn(e,n){for(n&=~ma,n&=~Qr,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ke(n),i=1<<t;e[t]=-1,n&=~i}}function Fl(e){if(O&6)throw Error(x(327));xt();var n=yr(e,0);if(!(n&1))return Ae(e,ne()),null;var t=Mr(e,n);if(e.tag!==0&&t===2){var i=Zo(e);i!==0&&(n=i,t=Ps(e,i))}if(t===1)throw t=Ci,Hn(e,0),wn(e,n),Ae(e,ne()),t;if(t===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,_n(e,Ie,tn),Ae(e,ne()),null}function ga(e,n){var t=O;O|=1;try{return e(n)}finally{O=t,O===0&&(Nt=ne()+500,Hr&&Dn())}}function Jn(e){kn!==null&&kn.tag===0&&!(O&6)&&xt();var n=O;O|=1;var t=Re.transition,i=z;try{if(Re.transition=null,z=1,e)return e()}finally{z=i,Re.transition=t,O=n,!(O&6)&&Dn()}}function va(){Ee=mt.current,G(mt)}function Hn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,Ph(t)),te!==null)for(t=te.return;t!==null;){var i=t;switch(Xs(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&kr();break;case 3:jt(),G(Se),G(ye),aa();break;case 5:sa(i);break;case 4:jt();break;case 13:G(J);break;case 19:G(J);break;case 10:ta(i.type._context);break;case 22:case 23:va()}t=t.return}if(ae=e,te=e=En(e.current,null),de=Ee=n,oe=0,Ci=null,ma=Qr=Yn=0,Ie=oi=null,zn!==null){for(n=0;n<zn.length;n++)if(t=zn[n],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,o=t.pending;if(o!==null){var s=o.next;o.next=r,i.next=s}t.pending=i}zn=null}return e}function ru(e,n){do{var t=te;try{if(na(),or.current=jr,Er){for(var i=X.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Er=!1}if(Qn=0,se=re=X=null,ii=!1,bi=0,fa.current=null,t===null||t.return===null){oe=1,Ci=n,te=null;break}e:{var o=e,s=t.return,a=t,l=n;if(n=de,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,p=a,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var w=bl(s);if(w!==null){w.flags&=-257,kl(w,s,a,o,n),w.mode&1&&wl(o,c,n),n=w,l=c;var d=n.updateQueue;if(d===null){var b=new Set;b.add(l),n.updateQueue=b}else d.add(l);break e}else{if(!(n&1)){wl(o,c,n),wa();break e}l=Error(x(426))}}else if(Q&&a.mode&1){var C=bl(s);if(C!==null){!(C.flags&65536)&&(C.flags|=256),kl(C,s,a,o,n),Zs(Lt(l,a));break e}}o=l=Lt(l,a),oe!==4&&(oe=2),oi===null?oi=[o]:oi.push(o),o=s;do{switch(o.tag){case 3:o.flags|=65536,n&=-n,o.lanes|=n;var y=Bd(o,l,n);hl(o,y);break e;case 1:a=l;var f=o.type,v=o.stateNode;if(!(o.flags&128)&&(typeof f.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Pn===null||!Pn.has(v)))){o.flags|=65536,n&=-n,o.lanes|=n;var k=Ud(o,a,n);hl(o,k);break e}}o=o.return}while(o!==null)}au(t)}catch(I){n=I,te===t&&t!==null&&(te=t=t.return);continue}break}while(!0)}function ou(){var e=Lr.current;return Lr.current=jr,e===null?jr:e}function wa(){(oe===0||oe===3||oe===2)&&(oe=4),ae===null||!(Yn&268435455)&&!(Qr&268435455)||wn(ae,de)}function Mr(e,n){var t=O;O|=2;var i=ou();(ae!==e||de!==n)&&(tn=null,Hn(e,n));do try{Xh();break}catch(r){ru(e,r)}while(!0);if(na(),O=t,Lr.current=i,te!==null)throw Error(x(261));return ae=null,de=0,oe}function Xh(){for(;te!==null;)su(te)}function Zh(){for(;te!==null&&!Ip();)su(te)}function su(e){var n=cu(e.alternate,e,Ee);e.memoizedProps=e.pendingProps,n===null?au(e):te=n,fa.current=null}function au(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Kh(t,n),t!==null){t.flags&=32767,te=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,te=null;return}}else if(t=Hh(t,n,Ee),t!==null){te=t;return}if(n=n.sibling,n!==null){te=n;return}te=n=e}while(n!==null);oe===0&&(oe=5)}function _n(e,n,t){var i=z,r=Re.transition;try{Re.transition=null,z=1,ef(e,n,t,i)}finally{Re.transition=r,z=i}return null}function ef(e,n,t,i){do xt();while(kn!==null);if(O&6)throw Error(x(327));t=e.finishedWork;var r=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var o=t.lanes|t.childLanes;if(Mp(e,o),e===ae&&(te=ae=null,de=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Vi||(Vi=!0,du(mr,function(){return xt(),null})),o=(t.flags&15990)!==0,t.subtreeFlags&15990||o){o=Re.transition,Re.transition=null;var s=z;z=1;var a=O;O|=4,fa.current=null,Vh(e,t),nu(t,e),bh(os),gr=!!rs,os=rs=null,e.current=t,Qh(t),Tp(),O=a,z=s,Re.transition=o}else e.current=t;if(Vi&&(Vi=!1,kn=e,Fr=r),o=e.pendingLanes,o===0&&(Pn=null),Ap(t.stateNode),Ae(e,ne()),n!==null)for(i=e.onRecoverableError,t=0;t<n.length;t++)r=n[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Nr)throw Nr=!1,e=Ts,Ts=null,e;return Fr&1&&e.tag!==0&&xt(),o=e.pendingLanes,o&1?e===Ss?si++:(si=0,Ss=e):si=0,Dn(),null}function xt(){if(kn!==null){var e=Bc(Fr),n=Re.transition,t=z;try{if(Re.transition=null,z=16>e?16:e,kn===null)var i=!1;else{if(e=kn,kn=null,Fr=0,O&6)throw Error(x(331));var r=O;for(O|=4,P=e.current;P!==null;){var o=P,s=o.child;if(P.flags&16){var a=o.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(P=c;P!==null;){var p=P;switch(p.tag){case 0:case 11:case 15:ri(8,p,o)}var g=p.child;if(g!==null)g.return=p,P=g;else for(;P!==null;){p=P;var m=p.sibling,w=p.return;if(Xd(p),p===c){P=null;break}if(m!==null){m.return=w,P=m;break}P=w}}}var d=o.alternate;if(d!==null){var b=d.child;if(b!==null){d.child=null;do{var C=b.sibling;b.sibling=null,b=C}while(b!==null)}}P=o}}if(o.subtreeFlags&2064&&s!==null)s.return=o,P=s;else e:for(;P!==null;){if(o=P,o.flags&2048)switch(o.tag){case 0:case 11:case 15:ri(9,o,o.return)}var y=o.sibling;if(y!==null){y.return=o.return,P=y;break e}P=o.return}}var f=e.current;for(P=f;P!==null;){s=P;var v=s.child;if(s.subtreeFlags&2064&&v!==null)v.return=s,P=v;else e:for(s=f;P!==null;){if(a=P,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Vr(9,a)}}catch(I){ee(a,a.return,I)}if(a===s){P=null;break e}var k=a.sibling;if(k!==null){k.return=a.return,P=k;break e}P=a.return}}if(O=r,Dn(),Xe&&typeof Xe.onPostCommitFiberRoot=="function")try{Xe.onPostCommitFiberRoot(_r,e)}catch{}i=!0}return i}finally{z=t,Re.transition=n}}return!1}function Ml(e,n,t){n=Lt(t,n),n=Bd(e,n,1),e=Sn(e,n,1),n=we(),e!==null&&(Pi(e,1,n),Ae(e,n))}function ee(e,n,t){if(e.tag===3)Ml(e,e,t);else for(;n!==null;){if(n.tag===3){Ml(n,e,t);break}else if(n.tag===1){var i=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Pn===null||!Pn.has(i))){e=Lt(t,e),e=Ud(n,e,1),n=Sn(n,e,1),e=we(),n!==null&&(Pi(n,1,e),Ae(n,e));break}}n=n.return}}function nf(e,n,t){var i=e.pingCache;i!==null&&i.delete(n),n=we(),e.pingedLanes|=e.suspendedLanes&t,ae===e&&(de&t)===t&&(oe===4||oe===3&&(de&130023424)===de&&500>ne()-ya?Hn(e,0):ma|=t),Ae(e,n)}function lu(e,n){n===0&&(e.mode&1?(n=Ri,Ri<<=1,!(Ri&130023424)&&(Ri=4194304)):n=1);var t=we();e=un(e,n),e!==null&&(Pi(e,n,t),Ae(e,t))}function tf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),lu(e,t)}function rf(e,n){var t=0;switch(e.tag){case 13:var i=e.stateNode,r=e.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(x(314))}i!==null&&i.delete(n),lu(e,t)}var cu;cu=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||Se.current)Te=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return Te=!1,$h(e,n,t);Te=!!(e.flags&131072)}else Te=!1,Q&&n.flags&1048576&&hd(n,Ir,n.index);switch(n.lanes=0,n.tag){case 2:var i=n.type;ar(e,n),e=n.pendingProps;var r=Pt(n,ye.current);kt(n,t),r=ca(null,n,i,e,r,t);var o=da();return n.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Pe(i)?(o=!0,xr(n)):o=!1,n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,ra(n),r.updater=Gr,n.stateNode=r,r._reactInternals=n,fs(n,i,e,t),n=gs(null,n,i,!0,o,t)):(n.tag=0,Q&&o&&Js(n),ge(null,n,r,t),n=n.child),n;case 16:i=n.elementType;e:{switch(ar(e,n),e=n.pendingProps,r=i._init,i=r(i._payload),n.type=i,r=n.tag=sf(i),e=Ue(i,e),r){case 0:n=ys(null,n,i,e,t);break e;case 1:n=Il(null,n,i,e,t);break e;case 11:n=xl(null,n,i,e,t);break e;case 14:n=Cl(null,n,i,Ue(i.type,e),t);break e}throw Error(x(306,i,""))}return n;case 0:return i=n.type,r=n.pendingProps,r=n.elementType===i?r:Ue(i,r),ys(e,n,i,r,t);case 1:return i=n.type,r=n.pendingProps,r=n.elementType===i?r:Ue(i,r),Il(e,n,i,r,t);case 3:e:{if(Kd(n),e===null)throw Error(x(387));i=n.pendingProps,o=n.memoizedState,r=o.element,wd(e,n),Pr(n,i,null,t);var s=n.memoizedState;if(i=s.element,o.isDehydrated)if(o={element:i,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},n.updateQueue.baseState=o,n.memoizedState=o,n.flags&256){r=Lt(Error(x(423)),n),n=Tl(e,n,i,t,r);break e}else if(i!==r){r=Lt(Error(x(424)),n),n=Tl(e,n,i,t,r);break e}else for(je=Tn(n.stateNode.containerInfo.firstChild),Le=n,Q=!0,$e=null,t=gd(n,null,i,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(At(),i===r){n=pn(e,n,t);break e}ge(e,n,i,t)}n=n.child}return n;case 5:return bd(n),e===null&&us(n),i=n.type,r=n.pendingProps,o=e!==null?e.memoizedProps:null,s=r.children,ss(i,r)?s=null:o!==null&&ss(i,o)&&(n.flags|=32),Hd(e,n),ge(e,n,s,t),n.child;case 6:return e===null&&us(n),null;case 13:return Gd(e,n,t);case 4:return oa(n,n.stateNode.containerInfo),i=n.pendingProps,e===null?n.child=Et(n,null,i,t):ge(e,n,i,t),n.child;case 11:return i=n.type,r=n.pendingProps,r=n.elementType===i?r:Ue(i,r),xl(e,n,i,r,t);case 7:return ge(e,n,n.pendingProps,t),n.child;case 8:return ge(e,n,n.pendingProps.children,t),n.child;case 12:return ge(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(i=n.type._context,r=n.pendingProps,o=n.memoizedProps,s=r.value,$(Tr,i._currentValue),i._currentValue=s,o!==null)if(Ve(o.value,s)){if(o.children===r.children&&!Se.current){n=pn(e,n,t);break e}}else for(o=n.child,o!==null&&(o.return=n);o!==null;){var a=o.dependencies;if(a!==null){s=o.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(o.tag===1){l=ln(-1,t&-t),l.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?l.next=l:(l.next=p.next,p.next=l),c.pending=l}}o.lanes|=t,l=o.alternate,l!==null&&(l.lanes|=t),ps(o.return,t,n),a.lanes|=t;break}l=l.next}}else if(o.tag===10)s=o.type===n.type?null:o.child;else if(o.tag===18){if(s=o.return,s===null)throw Error(x(341));s.lanes|=t,a=s.alternate,a!==null&&(a.lanes|=t),ps(s,t,n),s=o.sibling}else s=o.child;if(s!==null)s.return=o;else for(s=o;s!==null;){if(s===n){s=null;break}if(o=s.sibling,o!==null){o.return=s.return,s=o;break}s=s.return}o=s}ge(e,n,r.children,t),n=n.child}return n;case 9:return r=n.type,i=n.pendingProps.children,kt(n,t),r=Oe(r),i=i(r),n.flags|=1,ge(e,n,i,t),n.child;case 14:return i=n.type,r=Ue(i,n.pendingProps),r=Ue(i.type,r),Cl(e,n,i,r,t);case 15:return zd(e,n,n.type,n.pendingProps,t);case 17:return i=n.type,r=n.pendingProps,r=n.elementType===i?r:Ue(i,r),ar(e,n),n.tag=1,Pe(i)?(e=!0,xr(n)):e=!1,kt(n,t),_d(n,i,r),fs(n,i,r,t),gs(null,n,i,!0,e,t);case 19:return Vd(e,n,t);case 22:return $d(e,n,t)}throw Error(x(156,n.tag))};function du(e,n){return Wc(e,n)}function of(e,n,t,i){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function We(e,n,t,i){return new of(e,n,t,i)}function ba(e){return e=e.prototype,!(!e||!e.isReactComponent)}function sf(e){if(typeof e=="function")return ba(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Os)return 11;if(e===_s)return 14}return 2}function En(e,n){var t=e.alternate;return t===null?(t=We(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function dr(e,n,t,i,r,o){var s=2;if(i=e,typeof e=="function")ba(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case ot:return Kn(t.children,r,o,n);case Rs:s=8,r|=8;break;case Ro:return e=We(12,t,n,r|2),e.elementType=Ro,e.lanes=o,e;case Oo:return e=We(13,t,n,r),e.elementType=Oo,e.lanes=o,e;case _o:return e=We(19,t,n,r),e.elementType=_o,e.lanes=o,e;case bc:return Yr(t,r,o,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case vc:s=10;break e;case wc:s=9;break e;case Os:s=11;break e;case _s:s=14;break e;case yn:s=16,i=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return n=We(s,t,n,r),n.elementType=e,n.type=i,n.lanes=o,n}function Kn(e,n,t,i){return e=We(7,e,i,n),e.lanes=t,e}function Yr(e,n,t,i){return e=We(22,e,i,n),e.elementType=bc,e.lanes=t,e.stateNode={isHidden:!1},e}function No(e,n,t){return e=We(6,e,null,n),e.lanes=t,e}function Fo(e,n,t){return n=We(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function af(e,n,t,i,r){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ho(0),this.expirationTimes=ho(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ho(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ka(e,n,t,i,r,o,s,a,l){return e=new af(e,n,t,a,l),n===1?(n=1,o===!0&&(n|=8)):n=0,o=We(3,null,null,n),e.current=o,o.stateNode=e,o.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},ra(o),e}function lf(e,n,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rt,key:i==null?null:""+i,children:e,containerInfo:n,implementation:t}}function uu(e){if(!e)return Ln;e=e._reactInternals;e:{if(Zn(e)!==e||e.tag!==1)throw Error(x(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Pe(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(x(171))}if(e.tag===1){var t=e.type;if(Pe(t))return ud(e,t,n)}return n}function pu(e,n,t,i,r,o,s,a,l){return e=ka(t,i,!0,e,r,o,s,a,l),e.context=uu(null),t=e.current,i=we(),r=An(t),o=ln(i,r),o.callback=n??null,Sn(t,o,r),e.current.lanes=r,Pi(e,r,i),Ae(e,i),e}function Jr(e,n,t,i){var r=n.current,o=we(),s=An(r);return t=uu(t),n.context===null?n.context=t:n.pendingContext=t,n=ln(o,s),n.payload={element:e},i=i===void 0?null:i,i!==null&&(n.callback=i),e=Sn(r,n,s),e!==null&&(Ge(e,r,s,o),rr(e,r,s)),s}function Dr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Dl(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function xa(e,n){Dl(e,n),(e=e.alternate)&&Dl(e,n)}function cf(){return null}var hu=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ca(e){this._internalRoot=e}Xr.prototype.render=Ca.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(x(409));Jr(e,n,null,null)};Xr.prototype.unmount=Ca.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Jn(function(){Jr(null,e,null,null)}),n[dn]=null}};function Xr(e){this._internalRoot=e}Xr.prototype.unstable_scheduleHydration=function(e){if(e){var n=$c();e={blockedOn:null,target:e,priority:n};for(var t=0;t<vn.length&&n!==0&&n<vn[t].priority;t++);vn.splice(t,0,e),t===0&&Kc(e)}};function Ia(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Zr(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ql(){}function df(e,n,t,i,r){if(r){if(typeof i=="function"){var o=i;i=function(){var c=Dr(s);o.call(c)}}var s=pu(n,i,e,0,null,!1,!1,"",ql);return e._reactRootContainer=s,e[dn]=s.current,mi(e.nodeType===8?e.parentNode:e),Jn(),s}for(;r=e.lastChild;)e.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Dr(l);a.call(c)}}var l=ka(e,0,!1,null,null,!1,!1,"",ql);return e._reactRootContainer=l,e[dn]=l.current,mi(e.nodeType===8?e.parentNode:e),Jn(function(){Jr(n,l,t,i)}),l}function eo(e,n,t,i,r){var o=t._reactRootContainer;if(o){var s=o;if(typeof r=="function"){var a=r;r=function(){var l=Dr(s);a.call(l)}}Jr(n,s,e,r)}else s=df(t,n,e,r,i);return Dr(s)}Uc=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Qt(n.pendingLanes);t!==0&&(zs(n,t|1),Ae(n,ne()),!(O&6)&&(Nt=ne()+500,Dn()))}break;case 13:Jn(function(){var i=un(e,1);if(i!==null){var r=we();Ge(i,e,1,r)}}),xa(e,1)}};$s=function(e){if(e.tag===13){var n=un(e,134217728);if(n!==null){var t=we();Ge(n,e,134217728,t)}xa(e,134217728)}};zc=function(e){if(e.tag===13){var n=An(e),t=un(e,n);if(t!==null){var i=we();Ge(t,e,n,i)}xa(e,n)}};$c=function(){return z};Hc=function(e,n){var t=z;try{return z=e,n()}finally{z=t}};Yo=function(e,n,t){switch(n){case"input":if(zo(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var i=t[n];if(i!==e&&i.form===e.form){var r=$r(i);if(!r)throw Error(x(90));xc(i),zo(i,r)}}}break;case"textarea":Ic(e,t);break;case"select":n=t.value,n!=null&&gt(e,!!t.multiple,n,!1)}};Lc=ga;Nc=Jn;var uf={usingClientEntryPoint:!1,Events:[Ei,ct,$r,Ec,jc,ga]},Kt={findFiberByHostInstance:Un,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},pf={bundleType:Kt.bundleType,version:Kt.version,rendererPackageName:Kt.rendererPackageName,rendererConfig:Kt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:hn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Dc(e),e===null?null:e.stateNode},findFiberByHostInstance:Kt.findFiberByHostInstance||cf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Qi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Qi.isDisabled&&Qi.supportsFiber)try{_r=Qi.inject(pf),Xe=Qi}catch{}}Fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=uf;Fe.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ia(n))throw Error(x(200));return lf(e,n,null,t)};Fe.createRoot=function(e,n){if(!Ia(e))throw Error(x(299));var t=!1,i="",r=hu;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(r=n.onRecoverableError)),n=ka(e,1,!1,null,null,t,!1,i,r),e[dn]=n.current,mi(e.nodeType===8?e.parentNode:e),new Ca(n)};Fe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Dc(n),e=e===null?null:e.stateNode,e};Fe.flushSync=function(e){return Jn(e)};Fe.hydrate=function(e,n,t){if(!Zr(n))throw Error(x(200));return eo(null,e,n,!0,t)};Fe.hydrateRoot=function(e,n,t){if(!Ia(e))throw Error(x(405));var i=t!=null&&t.hydratedSources||null,r=!1,o="",s=hu;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(o=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),n=pu(n,null,e,1,t??null,r,!1,o,s),e[dn]=n.current,mi(e),i)for(e=0;e<i.length;e++)t=i[e],r=t._getVersion,r=r(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,r]:n.mutableSourceEagerHydrationData.push(t,r);return new Xr(n)};Fe.render=function(e,n,t){if(!Zr(n))throw Error(x(200));return eo(null,e,n,!1,t)};Fe.unmountComponentAtNode=function(e){if(!Zr(e))throw Error(x(40));return e._reactRootContainer?(Jn(function(){eo(null,null,e,!1,function(){e._reactRootContainer=null,e[dn]=null})}),!0):!1};Fe.unstable_batchedUpdates=ga;Fe.unstable_renderSubtreeIntoContainer=function(e,n,t,i){if(!Zr(t))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return eo(e,n,t,!1,i)};Fe.version="18.3.1-next-f1338f8080-20240426";function fu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(fu)}catch(e){console.error(e)}}fu(),fc.exports=Fe;var hf=fc.exports,Wl=hf;qo.createRoot=Wl.createRoot,qo.hydrateRoot=Wl.hydrateRoot;const h=(e,n,t)=>({kind:"key-facts",chapter:e,section:n,page:t,locator:`IF2 2026 Key Facts ch.${e} p.${t} — ${n}`}),F=(e,n)=>({kind:"study-text",chapter:1,section:e,page:n,locator:`IF2 2026 Study Text ch.1 p.${n} — ${e}`}),ff=(e,n)=>({kind:"syllabus",section:e,locator:`IF2 2026 syllabus ${e}`,note:n}),E=(e,n)=>({kind:"exam-guide",section:n,locator:`IF2 2026 Examination Guide specimen Q${e} (LO ${n})`}),mf=[{id:"m-compulsory",chapter:1,section:"Private motor insurance",conceptId:"motor-compulsory",title:"Compulsory motor insurance",kind:"rule",claim:"It is [[illegal to drive, or be in charge of, a vehicle on a public road]] unless a policy covers legal liability for injury to others and damage to their property.",extra:"Private motor insurance is the most significant compulsory insurance in the UK in terms of the number of people affected.",importance:"core",skill:"know",sources:[h(1,"Private motor insurance","5"),F("Introduction / Private motor","1/2")],prediction:"Why is motor insurance treated as compulsory in the UK?",teachBackCue:"In one sentence, when is it illegal to be in charge of a vehicle without insurance?",mcq:{stem:"A motor vehicle must be insured unless",options:["it is being kept in a garage and not driven on public roads","it is kept on a private driveway and is not driven on public roads","it is only driven on private roads and is not driven on public roads","a Statutory Off Road Notification declaration is made to the DVLA"],correct:3,whyWrong:["Keeping a vehicle in a garage does not by itself replace the need for insurance or a SORN.","A private driveway is not the SORN route described in the specimen item.","Use only on private roads is not the stated exception in the specimen item.","Correct: a SORN declaration to the DVLA is the route in the specimen question."]}},{id:"m-sorn-exam",chapter:1,section:"Private motor insurance",conceptId:"motor-compulsory",title:"SORN as the stated exception (exam guide)",kind:"rule",claim:"In the CII specimen paper, a motor vehicle must be insured unless [[a Statutory Off Road Notification (SORN) is made to the DVLA]].",importance:"core",skill:"know",sources:[E("6","1.1"),ff("1.1","Motor products")],mcq:{stem:"A motor vehicle must be insured unless",options:["it is being kept in a garage and not driven on public roads","it is kept on a private driveway and is not driven on public roads","it is only driven on private roads and is not driven on public roads","a Statutory Off Road Notification declaration is made to the Driver and Vehicle Licensing Agency (DVLA)"],correct:3,whyWrong:["Not the specimen exception.","Not the specimen exception.","Not the specimen exception.","This is the specimen key."]}},{id:"m-four-levels",chapter:1,section:"Standard policy cover",conceptId:"motor-cover-levels",title:"Four levels of private motor cover",kind:"cover",claim:"The four levels of private motor cover are [[Road Traffic Act only (RTA only)]], [[third party only (TPO)]], [[third party, fire and theft (TPFT)]] and [[comprehensive]].",extra:"Most insurers issue one standard form with numbered sections; the schedule identifies which sections apply. For practical purposes the lowest cover commonly offered is third party only, because RTA and TPO are now only marginally different.",importance:"core",skill:"know",sources:[h(1,"Standard policy cover","5"),F("A1 Standard policy cover","1/2")],confusedWith:["motor-rta","motor-tpo","motor-tpft","motor-comp"],prediction:"Name the four levels of private motor cover from minimum to widest."},{id:"m-rta-scope",chapter:1,section:"Road Traffic Act only",conceptId:"motor-rta",title:"RTA only: where it applies",kind:"rule",claim:"RTA only is the [[minimum cover required to comply with the Road Traffic Act 1988]] (as amended) and relates to use of a motor vehicle [[on a road or any public place]].",importance:"core",skill:"know",sources:[h(1,"Road Traffic Act only","5"),F("A1A Road Traffic Act only","1/2–1/3")],prerequisites:["motor-cover-levels"],confusedWith:["motor-tpo"]},{id:"m-rta-bi",chapter:1,section:"Road Traffic Act only",conceptId:"motor-rta",title:"RTA only: injury indemnity",kind:"limit",claim:"RTA only indemnifies for bodily injury or death caused to third parties, including passengers, [[unlimited in amount]].",importance:"core",skill:"know",sources:[h(1,"Road Traffic Act only","5"),F("A1A","1/3")]},{id:"m-rta-tppd",chapter:1,section:"Road Traffic Act only",conceptId:"motor-rta",title:"RTA only: property damage limit",kind:"limit",claim:"RTA only indemnifies for loss of or damage to third party property limited to [[£1.2 million]].",extra:"The study text records that the European Commission increased the EU minimum to €1.2 million on 1 January 2017, and UK legislation increased the RTA limit to £1.2 million from 31 December 2016.",importance:"core",skill:"know",sources:[h(1,"Road Traffic Act only","5"),F("A1A","1/2–1/3")],confusedWith:["motor-tpo","motor-commercial-tppd"]},{id:"m-rta-costs-emt",chapter:1,section:"Road Traffic Act only",conceptId:"motor-rta",title:"RTA only: costs and emergency treatment",kind:"cover",claim:"RTA only also indemnifies [[claimants’ costs and claim-handling expenses]] and covers [[emergency medical treatment and hospital charges]] specified in the RTA, which the policy must pay when demanded.",importance:"core",skill:"know",sources:[h(1,"Road Traffic Act only","5–6"),F("A1A","1/3")]},{id:"m-rta-eu",chapter:1,section:"Road Traffic Act only",conceptId:"motor-rta",title:"Third EU Motor Insurance Directive extras",kind:"rule",claim:"To comply with the Third EU Motor Insurance Directive, all policies must provide [[the greater of the visited EU country’s minimum cover and the home-country (UK RTA) minimum]], and cover [[liability to employees travelling as passengers in the course of employment, but not the driver]] (the employer’s liability to the driver falls under employers’ liability).",importance:"supporting",skill:"understand",sources:[h(1,"Road Traffic Act only","6"),F("A1A","1/3")],confusedWith:["el-legal-liability"]},{id:"m-tpo-extras",chapter:1,section:"Third party only (TPO)",conceptId:"motor-tpo",title:"What TPO adds to RTA",kind:"cover",claim:"TPO usually adds cover [[off road / not in a public place but within territorial limits]], a [[£20 million]] third party property damage limit for private cars, driving-other-cars indemnity (not all insurers), indemnity to permitted drivers/users unless named-driver restricted, indemnity to passengers/employers/partners, defence costs, and limited motoring-prosecution legal representation.",importance:"core",skill:"know",sources:[h(1,"Third party only (TPO)","6"),F("A1B Third party only","1/3")],prerequisites:["motor-rta"],confusedWith:["motor-rta","motor-tpft"],teachBackCue:"Name three things TPO usually adds that RTA only does not."},{id:"m-tpo-exclusions",chapter:1,section:"Third party only (TPO)",conceptId:"motor-tpo",title:"TPO third-party exclusions",kind:"exclusion",claim:"Specific third party exclusions include [[damage to property (including the vehicle) owned, held in trust, or in the custody/control of the person claiming indemnity]] and [[liability covered by any other insurance]] (especially driving another vehicle that has a more specific policy).",importance:"core",skill:"know",sources:[F("A1B","1/3")]},{id:"m-tpft",chapter:1,section:"Third party, fire and theft (TPFT)",conceptId:"motor-tpft",title:"TPFT own-vehicle cover",kind:"cover",claim:"TPFT adds, on top of TPO, repair cost or compensation if the insured’s vehicle is [[damaged by fire, lightning or explosion]], [[damaged during attempted theft or while stolen]] (some policies include taking without consent), or [[stolen and not recovered]].",extra:"Fire and theft cover specifically excludes loss of use.",importance:"core",skill:"know",sources:[h(1,"Third party, fire and theft (TPFT)","7"),F("A1C","1/4")],confusedWith:["motor-comp"]},{id:"m-comp",chapter:1,section:"Comprehensive",conceptId:"motor-comp",title:"Comprehensive as ‘all risks’ of own damage",kind:"cover",claim:"Comprehensive is the widest usual private motor cover: TPFT plus [[other accidental and malicious damage]] to the insured’s car, on an [['all risks' basis]] subject to specific exclusions.",extra:"Typical extras include personal accident cover, medical expenses, and personal belongings and clothing. Driving-other-cars under a comprehensive policy is still only third party — no cover for damage to the other vehicle being driven.",importance:"core",skill:"know",sources:[h(1,"Comprehensive","7–8"),F("A1D","1/4–1/5")],confusedWith:["motor-tpft"]},{id:"m-comp-excl",chapter:1,section:"Comprehensive",conceptId:"motor-comp",title:"Comprehensive own-damage exclusions",kind:"exclusion",claim:"Comprehensive typically excludes [[accessories/spares not on the vehicle or in the insured’s garage]], [[wear and tear and depreciation]], [[loss of use]] (unless a limited extra is granted), [[mechanical/electrical failure or breakdown]] (but collision damage caused by sudden brake failure is covered), and [[tyre damage from punctures or bursts]].",importance:"core",skill:"know",sources:[h(1,"Comprehensive","7"),F("A1D","1/4")]},{id:"m-young-excess",chapter:1,section:"Comprehensive",conceptId:"motor-comp",title:"Young or inexperienced drivers excess",kind:"rule",claim:"A [['young or inexperienced drivers' excess]] applies on top of any policy excess. ‘Inexperienced’ means holding a [[provisional licence]] or [[not having held a full licence for at least a year]]. Some insurers exclude driving-other-cars entirely for drivers under 25. An excess is [[the first amount of each and every claim the insured must bear]].",importance:"supporting",skill:"know",sources:[F("A1D","1/4")]},{id:"m-ncd",chapter:1,section:"No claims discount (NCD)",conceptId:"motor-ncd",title:"No claims discount",kind:"procedure",claim:"NCD and ‘no claims bonus’ are [[interchangeable]]. Illustrative discounts are about [[12% after one claim-free year]] up to [[50%+ after five or more]]. Insurers generally [[drop back two years]] after a claim. Protection (modest defined claims) or a ‘guaranteed’ discount after five years may be bought; this does [[not]] guarantee the underlying premium.",importance:"core",skill:"know",sources:[h(1,"No claims discount (NCD)","8"),F("A1E","1/5")]},{id:"m-glass-ncd",chapter:1,section:"Breakage of glass",conceptId:"motor-ncd",title:"Windscreen claims and NCD",kind:"rule",claim:"Glass breakage is standard on comprehensive policies (optional extra on non-comprehensive). A claim [[under this section alone does not affect NCD]].",importance:"core",skill:"know",sources:[h(1,"Breakage of glass","8–9"),F("A2A","1/5")]},{id:"m-uninsured-promise",chapter:1,section:"Uninsured driver promise",conceptId:"motor-uninsured-promise",title:"Uninsured driver promise",kind:"cover",claim:"On some comprehensive policies, if the other vehicle is uninsured, the extension usually protects [[NCD and the policy excess]] provided [[full details of the third party vehicle]] are given. It does [[not]] apply to [['hit and run' / untraced]] accidents.",importance:"supporting",skill:"know",sources:[h(1,"Uninsured driver promise","8"),F("A1F","1/5")]},{id:"m-foreign",chapter:1,section:"Foreign use",conceptId:"motor-foreign",title:"Foreign use and green cards",kind:"rule",claim:"UK policies must extend to [[the greater of visited-country minimum and home minimum]]. Matching full UK cover abroad usually needs [[notification and a continental-use extension]] (sometimes free for up to 30 days). A green card is an international certificate; from [[2 August 2021]] the UK participates in the Green Card Free Circulation Area, removing the need for green cards in listed European countries (many insurers still issued them until 2 September 2021 following MIB recommendation).",importance:"supporting",skill:"know",sources:[h(1,"Foreign use","10"),F("A2F","1/6")]},{id:"m-exclusions-rta-pay",chapter:1,section:"Exclusions",conceptId:"motor-exclusions",title:"RTA claims despite policy exclusions",kind:"rule",claim:"The Road Traffic Acts require an insurer to [[pay an RTA claim even if the policy wording excludes it]], so innocent victims are compensated; the insurer may [[recover its outlay from the insured]].",extra:"General exclusions include unlicensed drivers, use outside the certificate, contractual liability, war, radioactive contamination/nuclear assembly, riot and civil commotion in Northern Ireland for own damage, sonic bangs, and pollution unless from a single identifiable event. Unroadworthy use and licence conditions also appear.",importance:"core",skill:"understand",sources:[F("A3 Exclusions","1/8"),h(1,"Exclusions","14–15")]},{id:"m-use",chapter:1,section:"Use of the insured vehicle",conceptId:"motor-use",title:"Use as described in the certificate",kind:"exclusion",claim:"Liability is excluded while the vehicle is used [[for a purpose outside the description of use in the certificate of motor insurance]]. Peer-to-peer renting is usually excluded from personal policies. Informal car sharing may stay valid [[if no profit is made from the passenger contribution]], but commuting/business versus SDP use can change coverage.",importance:"supporting",skill:"understand",sources:[F("A3A Use of the insured vehicle","1/8")],scenario:{setup:"An insured gives a neighbour a lift to the same workplace and accepts a contribution that does not make a profit.",question:"Does the study text say a standard hire-and-reward exclusion necessarily voids the policy?",answer:"If no profit is made from the passenger contribution the policy should remain valid, but different work destinations or business-use issues can be more complex."}},{id:"m-bike",chapter:1,section:"Motorcycle insurance",conceptId:"motor-cycle",title:"Motorcycle vs private car comprehensive",kind:"distinction",claim:"‘Motorcycle’ includes [[any mechanically propelled cycle, including mopeds]]. Cover is [[specified motorcycle insurance]] for a particular machine. Differences versus private comprehensive: accessories/spares stolen [[only if the motorcycle is stolen at the same time]]; [[no personal accident benefits]] and [[no medical expenses beyond emergency treatment fees]] or personal effects.",importance:"core",skill:"know",sources:[h(1,"Motorcycle insurance","15"),F("B Motorcycle insurance","1/9")],confusedWith:["motor-comp"],mcq:{stem:"Under a motorcycle policy, accessories are only covered if stolen",options:["from a locked garage","from the motorcycle","using force and violence","with the motorcycle"],correct:3,whyWrong:["Garage theft of accessories alone is not the motorcycle rule.","Accessories stolen from the bike while it remains are not covered under the accidental damage difference stated.","Force and violence is a theft-policy idea, not this motorcycle accessories rule.","Correct: stolen with the motorcycle."]}},{id:"m-bike-tpo-emt",chapter:1,section:"Motorcycle insurance",conceptId:"motor-cycle",title:"TPO motorcycle includes emergency treatment",kind:"cover",claim:"Under a third party only motorcycle policy, [[emergency treatment fees]] form part of standard cover; clothing/personal effects, medical expenses and personal accident benefits do not.",importance:"core",skill:"know",sources:[F("Question 1.2 / B1","1/9–1/10")]},{id:"m-comm-scope",chapter:1,section:"Commercial motor insurance",conceptId:"motor-commercial",title:"What commercial motor covers — and does not",kind:"definition",claim:"Commercial motor concerns risks to the [[vehicles themselves]] while driven, parked, or carried by sea/air between UK parts. It does [[not]] cover goods carried; that is [[goods in transit]]. Main types: goods-carrying, passenger-carrying, agricultural/forestry, and special types (ambulances, cranes, fork-lifts).",importance:"core",skill:"know",sources:[h(1,"Commercial motor insurance","16"),F("C Commercial motor","1/10")]},{id:"m-comm-tppd",chapter:1,section:"Third party liability",conceptId:"motor-commercial-tppd",title:"Commercial third party property damage limits",kind:"limit",claim:"Death/bodily injury indemnity is [[unlimited]] for private and commercial motor. Private cars usually have [[£20 million]] TPPD; commercial is often about [[£5 million]], and general haulage may be as low as the [[£1.2 million]] compulsory minimum. Limits can be increased for extra premium.",extra:"The study text asks why a limit is needed: size, weight and cargo of some commercial vehicles could cause considerable damage. The specimen paper asks the minimum legal TPPD limit for commercial vehicles: £1,200,000.",importance:"core",skill:"know",sources:[F("C1A","1/11"),h(1,"Third party liability","17"),E("7","1.1")],confusedWith:["motor-rta","motor-tpo"],mcq:{stem:"What is the minimum legal limit of indemnity in respect of third party property damage under a commercial vehicle insurance policy?",options:["£100,000","£250,000","£500,000","£1,200,000"],correct:3,whyWrong:["Too low — not the RTA/commercial minimum in the materials.","Too low.","Too low.","Matches the £1.2 million RTA property damage minimum used for restricted commercial/haulage limits."]}},{id:"m-comm-omit",chapter:1,section:"Private motor policies only",conceptId:"motor-commercial",title:"Covers omitted from commercial motor",kind:"distinction",claim:"Commercial comprehensive usually omits [[driving other vehicles]] (vehicle range too wide) and [['personal benefits']] — personal accident, medical expenses, personal belongings. Loading/unloading third party cover and trailer rules are commercial-specific additions. Spare parts/accessories are covered on the vehicle, [[not while detached]] (unlike private motor garage cover).",importance:"core",skill:"know",sources:[F("C1B–C1D","1/11"),h(1,"Loss of or damage / Optional","18–19")],mcq:{stem:"What cover is omitted from a comprehensive commercial vehicle insurance policy which would be provided under a comprehensive private car insurance policy?",options:["Foreign use","Legal costs in defence of a claim","Personal accident benefits","Towing of a disabled vehicle"],correct:2,whyWrong:["Foreign use is not the omitted personal-benefits class.","Legal defence costs are part of commercial third party notes.","Correct: personal accident benefits are a private-motor personal benefit omitted commercially.","Towing/disabled vehicle notes exist in commercial trailer cover."]}},{id:"m-st-q11",chapter:1,section:"Comprehensive",conceptId:"motor-comp",title:"Breakdown recovery is not standard comprehensive",kind:"cover",claim:"Standard comprehensive private motor includes accidental damage, driver’s PA benefit, recovery after an accident, and third party liability. [[Recovery after breakdown]] is an optional extra, not standard.",importance:"supporting",skill:"know",sources:[F("Question 1.1","1/9"),F("A2J Breakdown cover","1/7")]},{id:"h-pas-nature",chapter:2,section:"Personal accident and sickness",conceptId:"health-pas",title:"PA & sickness is a benefit contract",kind:"definition",claim:"Personal accident and sickness is a relatively simple policy. Occupation is the [[main rating factor]]. It is [[not a contract of indemnity]]; it pays [[stated benefits]]. Insurers still try to avoid over-insurance. It is sold standalone and as an add-on.",importance:"core",skill:"know",sources:[h(2,"Personal accident and sickness insurance","17")],prediction:"Is personal accident insurance an indemnity policy? What is the main rating factor?"},{id:"h-death-12",chapter:2,section:"Death",conceptId:"health-pas-benefits",title:"Death time limit",kind:"rule",claim:"Insurers often stipulate that death must occur within [[twelve months]] of the accident for a death claim.",importance:"core",skill:"know",sources:[h(2,"Death","19"),E("12","1.1")],mcq:{stem:"In order for a death claim to be made under a personal accident insurance policy, death must usually occur within how many months of the accident?",options:["12 months","18 months","24 months","36 months"],correct:0,whyWrong:["Correct: twelve months is the usual stipulation in the key facts.","Longer than the usual key-facts period.","Used elsewhere (e.g. waiting to assess PTD), not the usual death window.","Not the usual death window."]}},{id:"h-capital",chapter:2,section:"Policy benefits",conceptId:"health-pas-benefits",title:"Capital vs weekly benefits",kind:"cover",claim:"[[Capital sums (lump sums)]] are paid for death and specified losses (sight/limbs). Temporary total/partial disablement pays [[weekly benefits]], often limited (e.g. 52 weeks). Permanent total disablement may wait [[12 or 24 months]] to be assessed. Permanent partial disablement is [[not standard]]. Travel PA pays a [[fixed benefit]] (specimen).",importance:"core",skill:"know",sources:[h(2,"Policy benefits","19–21"),E("14","1.1")]},{id:"h-sickness-deferred",chapter:2,section:"Sickness cover",conceptId:"health-pas",title:"Sickness waiting / deferred period",kind:"rule",claim:"Sickness cover generally excludes sickness contracted within an initial period, and weekly sickness claims typically [[do not pay the first days]] (key facts: if sickness continues beyond seven days the claim may then be paid), so the insurer covers new sickness arising after inception, not immediately preexisting onset.",importance:"supporting",skill:"understand",sources:[h(2,"Sickness cover","18–19")]},{id:"h-suicide",chapter:2,section:"Exclusions",conceptId:"health-pas",title:"Failed suicide and PAS",kind:"exclusion",claim:"A failed suicide attempt causing temporary partial disablement [[does not normally attract benefit]] under personal accident and sickness insurance.",importance:"core",skill:"know",sources:[E("18","1.1"),h(2,"Exclusions","22")],mcq:{stem:"A failed suicide attempt results in temporary partial disablement. What benefit, if any, can normally be claimed under a personal accident and sickness insurance policy?",options:["The cost of medical expenses","A fixed weekly benefit until recovery","A lump sum","No benefit can be claimed"],correct:3,whyWrong:["Medical expenses are not the usual PAS response to this excluded event.","Weekly TPD is not paid for this excluded cause.","Capital benefit is not paid for this excluded cause.","Correct: no benefit is normally payable."]}},{id:"h-medexp",chapter:2,section:"Medical expenses insurance",conceptId:"health-medexp",title:"Medical expenses / health care",kind:"cover",claim:"Medical expenses (health care) insurance pays specified treatment costs (hospital, specialist, extras). It generally does [[not]] pay [[long-term residential care]].",importance:"core",skill:"know",sources:[h(2,"Medical expenses insurance","22–24"),E("11","1.1")],mcq:{stem:"A medical expenses policy will generally NOT pay the cost of",options:["ambulance fees","anaesthetist’s fees","long-term residential care","surgical dressings"],correct:2,whyWrong:["Ambulance fees are typical acute treatment costs.","Anaesthetist’s fees are typical surgical costs.","Correct: long-term residential care is outside general medical expenses cover.","Dressings are typical treatment costs."]}},{id:"h-travel-pa",chapter:2,section:"Policy benefits",conceptId:"health-pas-benefits",title:"Travel personal accident is a fixed benefit",kind:"cover",claim:"Under a travel policy, a [[fixed benefit]] is paid under the [[personal accident]] section, not medical expenses, personal liability or possessions.",importance:"supporting",skill:"know",sources:[E("14","1.1")],mcq:{stem:"Under which section of a travel insurance policy would a fixed benefit be paid in the event of a claim?",options:["Medical expenses","Personal accident","Personal liability","Personal possessions"],correct:1,whyWrong:["Medical expenses reimburse costs, they are not the fixed-benefit PA section.","Correct.","Liability is indemnity to third parties.","Possessions are property, not a capital accident benefit."]}},{id:"p-why",chapter:3,section:"Introduction",conceptId:"package-idea",title:"Why package policies exist",kind:"definition",claim:"Insurers package covers where many insureds need the same combination; [[administration savings]] are passed on as [[reduced premium]] compared with buying each class separately.",importance:"core",skill:"understand",sources:[h(3,"Introduction","25")],prediction:"Why would an insurer sell household or shop covers as a package rather than separate policies?"},{id:"p-hh-settle",chapter:3,section:"Household insurance",conceptId:"hh-settlement",title:"Indemnity vs new for old",kind:"distinction",claim:"Household settlement is generally [[indemnity (market value, allowing for wear and tear)]] or [[new for old (reinstatement without deduction for wear and tear)]]. Some insurers barely offer indemnity. Buildings sums insured are typically reinstatement of the structure.",importance:"core",skill:"understand",sources:[h(3,"Household insurance","25–26")],confusedWith:[]},{id:"p-buildings-perils",chapter:3,section:"Building insurance",conceptId:"hh-buildings",title:"Core buildings perils",kind:"cover",claim:"Household buildings typically cover fire/lightning/explosion/earthquake; riot/civil commotion/strikes (wordings often exclude certain Northern Ireland risks); storm or flood (with specific exclusions); falling trees; escape of water; escape of oil; theft; impact; subsidence/heave/landslip; aerial collapse; accidental damage to drains/pipes/cables; glass and sanitary ware; plus fees and loss of rent as described.",importance:"core",skill:"know",sources:[h(3,"Building insurance","26–32")]},{id:"p-subsidence-xs",chapter:3,section:"Subsidence, ground heave or landslip",conceptId:"hh-buildings",title:"Subsidence excess",kind:"limit",claim:"Subsidence cover under household buildings normally carries a substantial excess of, for example, [[£1,000]] or more.",importance:"core",skill:"know",sources:[h(3,"Subsidence, ground heave or landslip","30"),E("15","1.1")],mcq:{stem:"What is the normal excess applicable to subsidence cover under a household buildings insurance policy?",options:["£250","£500","£750","£1,000"],correct:3,whyWrong:["Typical day-to-day excess territory, not the usual subsidence figure in the materials.","Still below the usual subsidence example.","Still below the usual subsidence example.","Correct: £1,000 (or more) is the stated example."]}},{id:"p-coastal",chapter:3,section:"Storm or flood",conceptId:"hh-buildings",title:"Coastal erosion not covered",kind:"exclusion",claim:"A standard household policy for a house near the sea would not normally cover [[coastal erosion]]. Storm, flood and heave may still be relevant perils depending on wording; the specimen excludes coastal erosion specifically.",importance:"core",skill:"know",sources:[E("16","1.1"),h(3,"Storm or flood / Subsidence","28–30")],mcq:{stem:"A standard household insurance policy for a house near the sea would NOT normally cover damage to the house arising from",options:["coastal erosion","ground heave","a hurricane force wind","tidal flooding"],correct:0,whyWrong:["Correct: coastal erosion is outside normal household cover.","Heave is a listed buildings peril (with a large excess).","Storm/wind is a standard peril.","Flood/tidal flooding is in the storm or flood family unless specifically excluded."]}},{id:"p-theft-unoccupied",chapter:3,section:"Theft or attempted theft",conceptId:"hh-buildings",title:"Unoccupied theft exclusion (household)",kind:"exclusion",claim:"Theft cover is usually excluded while premises are left [[unoccupied / insufficiently furnished]] for a defined period (wordings vary).",importance:"supporting",skill:"know",sources:[h(3,"Theft or attempted theft","29")]},{id:"p-ad-ext",chapter:3,section:"Accidental damage extension",conceptId:"hh-buildings",title:"Accidental damage is usually an extra",kind:"cover",claim:"Many insurers offer an [[accidental damage extension]] to buildings (e.g. drilling through a pipe). It is not the same as the named-perils core.",importance:"supporting",skill:"know",sources:[h(3,"Accidental damage extension","32")]},{id:"p-contents",chapter:3,section:"Contents insurance",conceptId:"hh-contents",title:"Contents: same perils, extra limits",kind:"cover",claim:"Contents perils broadly [[mirror buildings]]. There are [[single-article limits]] and high-value item rules. Automatic extras appear in many wordings; optional extras include personal possessions, money and credit cards, bicycles, freezer contents, caravans.",importance:"core",skill:"know",sources:[h(3,"Contents insurance","32–38")]},{id:"p-allrisks-away",chapter:3,section:"Personal possessions",conceptId:"hh-all-risks",title:"All risks usually means away from the risk address",kind:"definition",claim:"When a commercial (or household possessions) policy includes an all risks section, this usually means cover [[away from the risk address]] — not ‘no excess’, not electrical breakdown, not agreed value as the meaning of the phrase in the specimen item.",importance:"core",skill:"know",sources:[E("19","1.1"),h(3,"Personal possessions","36–37")],confusedWith:["prop-fire"],mcq:{stem:"When a commercial insurance policy includes an all risks section, this usually means that cover is provided",options:["away from the risk address","including electrical breakdown","on an agreed value basis","with no excess"],correct:0,whyWrong:["Correct for the specimen meaning of an all risks section.","Breakdown is typically excluded or separately engineered.","Agreed value is a settlement basis, not the meaning of all risks here.","Excesses still apply."]}},{id:"p-liability-hh",chapter:3,section:"Legal liability: building and contents",conceptId:"hh-liability",title:"Household liability sections",kind:"cover",claim:"Buildings liability includes occupiers’/owners’ liability and Defective Premises Act (and NI Order 1975) for former property. Contents includes personal liability for accidental injury (as defined) and property damage.",importance:"supporting",skill:"know",sources:[h(3,"Legal liability: building and contents","35–36")]},{id:"p-riot-property",chapter:3,section:"Riot, civil commotion",conceptId:"hh-buildings",title:"Riot damage class",kind:"cover",claim:"In certain areas of the UK, riot damage is usually covered under [[property]] insurance (not money, public liability or travel as the primary class).",importance:"supporting",skill:"know",sources:[E("13","1.1"),h(3,"Riot, civil commotion, strikes","27")],mcq:{stem:"In certain areas of the UK, riot damage is usually covered under which type of insurance policy?",options:["Money","Property","Public liability","Travel"],correct:1,whyWrong:["Money is a pecuniary/property subclass for cash etc., not the riot buildings/contents class.","Correct.","Public liability is third party injury/property, not the insured’s riot damage.","Travel is not the usual UK riot vehicle."]}},{id:"p-shop-glass",chapter:3,section:"Commercial packages",conceptId:"package-commercial",title:"Shop plate glass includes the frame in the specimen",kind:"example",claim:"If a shop policy includes plate glass and an employee breaks the window and wooden frame, the specimen key is that [[both the window and the wooden frame]] are covered.",importance:"supporting",skill:"apply",sources:[E("17","1.1")],mcq:{stem:"A shop owner has a commercial insurance policy which includes cover for plate glass. An employee accidentally breaks the shop window and wooden frame. Which of the damaged items, if either, is covered?",options:["Neither of them","The window only","The wooden frame only","Both of them"],correct:3,whyWrong:["The specimen does not treat this as uncovered accidental damage.","The key includes the frame as well.","The glass is also covered.","Correct: both."]}},{id:"pr-fire-base",chapter:4,section:"Fire and special perils insurance",conceptId:"prop-fire",title:"Standard fire as the base",kind:"definition",claim:"Unless packaged, a [[standard fire policy]] is the base, extended to [[special perils]] (and sometimes all risks). The proposer chooses the [[sum insured]]; the insurer rates.",importance:"core",skill:"know",sources:[h(4,"Fire and special perils insurance","47")]},{id:"pr-unoccupied",chapter:4,section:"Fire and special perils insurance",conceptId:"prop-fire",title:"Unoccupied commercial fire policy restrictions",kind:"exclusion",claim:"When a building becomes unoccupied as defined, cover will normally exclude theft, storm, escape of water and [[malicious damage]] (fire typically remains).",importance:"core",skill:"know",sources:[E("21","1.1")],mcq:{stem:"A building is covered under a fire and special perils insurance policy. When the building becomes unoccupied as defined in the policy, the cover will normally exclude theft, storm, escape of water and which other peril?",options:["Fire","Flood","Impact","Malicious damage"],correct:3,whyWrong:["Fire usually remains the core peril.","Flood is not the fourth named exclusion in the specimen.","Impact is not the fourth named exclusion in the specimen.","Correct: malicious damage."]}},{id:"pr-theft-holdup",chapter:4,section:"Theft insurance",conceptId:"prop-theft",title:"Theft and hold-up",kind:"definition",claim:"Theft wordings typically require [[forcible and violent]] entry/exit (to stop people hiding on premises). [[Hold-up]] is theft accompanied by assault. Underinsurance/average commonly applies. First-loss limits are often used.",importance:"core",skill:"know",sources:[h(4,"Theft insurance","54–58")]},{id:"pr-money-def",chapter:4,section:"Money insurance",conceptId:"prop-money",title:"What money insurance covers",kind:"definition",claim:"Money insurance is [['all risks']] on money. The specimen definition of money for this class is [[cash, cheques and postage stamps]] (not credit/debit cards in that item). Employee fraud is a [[fidelity / money]] issue: a theft policy does not provide that protection in the specimen comparison.",extra:"Typical limits differ by situation (e.g. an example of £500 for money left out of a safe on the premises). Credit cards are a noted extension, not standard.",importance:"core",skill:"know",sources:[h(4,"Money insurance","59–62"),E("20","1.1"),E("10","1.1")],confusedWith:["prop-theft"],mcq:{stem:"Money insurance provides cover for",options:["cash, cheques and credit and debit cards","cash, cheques and postage stamps","cash, postage stamps and credit and debit cards","cheques, postage stamps and credit and debit cards"],correct:1,whyWrong:["Credit/debit cards are not in the specimen money trio.","Correct.","Omits cheques; includes cards.","Omits cash; includes cards."]}},{id:"pr-money-vs-theft-fraud",chapter:4,section:"Money insurance",conceptId:"prop-money",title:"Employee fraud: money not theft",kind:"distinction",claim:"For theft of money due to employee fraud, [[only the money policy]] (not the theft policy) provides some protection in the specimen comparison.",importance:"core",skill:"understand",sources:[E("10","1.1")],mcq:{stem:"A policyholder is considering both theft and money insurance policies to protect himself against theft of money due to employee fraud. Which of these policies, if either, will provide some protection against this loss?",options:["Both policies","Only the theft policy","Only the money policy","Neither policy"],correct:2,whyWrong:["Theft insurance is not the specimen vehicle for employee fraud of money.","Opposite of the key.","Correct.","The money policy does give some protection in the specimen."]}},{id:"pr-glass",chapter:4,section:"Glass insurance",conceptId:"prop-glass",title:"Glass class",kind:"cover",claim:"Glass is not only plate glass; it covers destruction/damage to [[fixed glass]]. Often packaged. Standard practice excludes damage by [[fire, lightning]] (left to the fire policy). Commercial glass claims often use [[approved repairers]] (specimen).",importance:"supporting",skill:"know",sources:[h(4,"Glass insurance","58–59")]},{id:"pe-le-purpose",chapter:5,section:"Legal expenses insurance",conceptId:"pec-legal",title:"Purpose of legal expenses",kind:"definition",claim:"Legal expenses insurance indemnifies [[legal costs]] arising from specified disputes. Group/personal sections can include employment, personal, motor and conveyancing. Commercial sections include employment, criminal (including HSWA), property disputes, patents/IP — [[not public liability disputes]] (those belong on liability policies).",importance:"core",skill:"know",sources:[h(5,"Legal expenses insurance","63–66"),E("23","1.1")],mcq:{stem:"A commercial legal expenses insurance policy would NOT normally provide cover for",options:["employment disputes","patents and copyright disputes","property disputes","public liability disputes"],correct:3,whyWrong:["Employment is a listed commercial LE section.","Patents/IP is a listed option.","Property disputes are a listed option (not all insurers).","Correct: public liability disputes are outside commercial LE."]}},{id:"pe-bi-dims",chapter:5,section:"Business interruption insurance",conceptId:"pec-bi",title:"BI has two time dimensions",kind:"definition",claim:"Property covers [[direct material damage]]; BI covers [[consequential loss of income/increased cost of working]]. Cover has the [[maximum indemnity period]] chosen by the insured (from occurrence, for as long as the business is affected up to that maximum) and the [[sum insured]] basis (including declaration-linked). [[Turnover]] is total income from activities.",importance:"core",skill:"understand",sources:[h(5,"Business interruption insurance","66–70")],prediction:"If fire insurance rebuilds the shop, what still leaves the owner uninsured unless they buy something else?"},{id:"pe-bi-indem-period",chapter:5,section:"Basic features",conceptId:"pec-bi",title:"Indemnity period meaning",kind:"definition",claim:"Under BI, the indemnity period is the period [[for which the policy reimburses the insured in respect of a claim]] (not the waiting excess, not the unexpired policy year alone).",importance:"core",skill:"know",sources:[E("3","1.1"),h(5,"Basic features","67")],mcq:{stem:"Under a business interruption insurance policy, the indemnity period is the period of time",options:["after the date of any loss which is excluded in calculating the loss","for which the policy must be in force before a claim can be considered","for which the policy reimburses the insured in respect of a claim","from the date of loss to the next renewal date"],correct:2,whyWrong:["That describes a time excess/franchise idea, not the indemnity period.","That is a waiting/deferred inception idea.","Correct.","Renewal date does not define the indemnity period."]}},{id:"pe-mdw",chapter:5,section:"Material damage warranty",conceptId:"pec-bi",title:"Material damage proviso",kind:"rule",claim:"Virtually all BI policies require a [[material damage warranty/proviso]]: there must be a valid property (material damage) claim for an insured peril before BI responds.",importance:"core",skill:"understand",sources:[h(5,"Material damage warranty","69–70")]},{id:"pe-bi-questions",chapter:5,section:"Business interruption insurance",conceptId:"pec-bi",title:"BI proposal: reaction to a claim",kind:"procedure",claim:"Proposers for [[business interruption]] are usually asked how they would react in the event of a claim (continuity plans) — unlike the other classes in the specimen list.",importance:"supporting",skill:"know",sources:[E("22","1.1")],mcq:{stem:"Under which class of insurance are proposers usually asked questions at the proposal stage regarding how they would react in the event of a claim?",options:["Business interruption","Commercial vehicle","Employers’ liability","Public liability"],correct:0,whyWrong:["Correct.","Vehicle rating does not centre on post-loss trading reaction.","EL centres on employment/injury, not trading continuity questions.","PL centres on third party hazards."]}},{id:"l-el-comp",chapter:6,section:"Employers’ liability insurance",conceptId:"el-compulsory",title:"EL is compulsory (with motor TPL)",kind:"rule",claim:"Apart from third party motor, [[employers’ liability]] is the other major compulsory class. The Employers’ Liability (Compulsory Insurance) Act [[1969]] (and 1998 Regulations) require cover. 2008 amendment regulations (from 1 October 2008) changed certificate display rules; employers must still provide the certificate to employees and keep records. From April 2012 FCA rules require EL tracing/search participation as described in the key facts.",importance:"core",skill:"know",sources:[h(6,"Employers’ liability insurance","73–76")],prediction:"Besides motor third party, which liability class is compulsory for most UK employers?"},{id:"l-el-injury-only",chapter:6,section:"Standard policy cover",conceptId:"el-cover",title:"EL pays injury not property",kind:"cover",claim:"EL indemnifies the employer’s [[legal liability for bodily injury or disease to employees]] arising out of and in the course of employment in the trade or business. It is the class that provides injury claims but [[NOT property claims]] in the specimen comparison.",importance:"core",skill:"know",sources:[h(6,"Standard policy cover","76–78"),E("4","1.1")],confusedWith:["pl-cover","products-cover"],mcq:{stem:"Which class of insurance provides cover for injury claims but NOT property claims?",options:["Employers’ liability","Products liability","Public liability","Trustees’ indemnity"],correct:0,whyWrong:["Correct: EL is employee injury/disease, not third party property.","Products covers injury and damage caused by products.","Public liability covers injury and property.","Trustees’ indemnity is wrongful-act/financial, not this injury-only class."]}},{id:"l-el-rsi",chapter:6,section:"Standard policy cover",conceptId:"el-cover",title:"RSI example",kind:"example",claim:"A secretary with repetitive strain injury from working conditions that permanently prevents existing employment is compensated under the employer’s [[employers’ liability]] policy, not legal expenses, PI or public liability.",importance:"core",skill:"apply",sources:[E("25","1.1"),h(6,"Legal liability","76–77")],mcq:{stem:"A secretary develops repetitive strain injury caused by her working conditions which permanently prevents her from continuing her existing employment. Under which of her employer’s insurance policies could compensation be paid?",options:["Employers’ liability","Legal expenses","Professional indemnity","Public liability"],correct:0,whyWrong:["Correct: employee injury arising from work.","LE pays legal costs, not EL damages.","PI is professional services to clients.","PL is non-employee third parties."]}},{id:"l-el-employee",chapter:6,section:"Definition of employee",conceptId:"el-cover",title:"Definition of employee",kind:"definition",claim:"An employee is defined as [[any person under a contract of service or apprenticeship]] with the insured (wordings expand this). Injury must arise [[out of and in the course of employment]] and in connection with the [[trade or business]]. Cover is usually [[occurrence]] during the period of insurance for injury/disease caused then.",importance:"core",skill:"know",sources:[h(6,"Definition of employee","77–78")]},{id:"l-pl",chapter:6,section:"Public liability insurance",conceptId:"pl-cover",title:"Public liability is an open policy",kind:"definition",claim:"Public liability is an [[open policy]]: it covers legal liability for accidental injury and damage to third party property (plus consequential loss flowing from that damage; financial loss without damage is more limited). Typical limits might be [[£2 million]], with [[£10 million]] not uncommon. A hotel insuring third party injury and property claims needs [[public liability]].",importance:"core",skill:"know",sources:[h(6,"Public liability insurance","80–84"),E("34","1.1")],confusedWith:["el-cover","products-cover"],mcq:{stem:"A hotel owner wishing to insure his business against third party injury and property claims is most likely to require insurance covering",options:["employers’ liability","professional indemnity","public liability","trustees’ indemnity"],correct:2,whyWrong:["EL is employees, not hotel guests/public property.","PI is professional advice.","Correct.","Trustees’ indemnity is governance/wrongful acts."]}},{id:"l-products",chapter:6,section:"Product liability insurance",conceptId:"products-cover",title:"Products liability",kind:"cover",claim:"Products liability covers legal liability for [[bodily injury and property damage caused by products]]. It is often an [[extension to public liability]].",importance:"core",skill:"know",sources:[h(6,"Product liability insurance","84–85"),E("27","1.1")],mcq:{stem:"Products liability is often found as an extension to which type of insurance policy?",options:["Employers’ liability","Professional indemnity","Public liability","Trustees’ indemnity"],correct:2,whyWrong:["EL is employment injury.","PI is professional services, not product extensions.","Correct.","Trustees’ is a D&O-like internal liability."]}},{id:"l-do",chapter:6,section:"Directors’ and officers’ D&O",conceptId:"do-cover",title:"D&O claims-made and who is liable",kind:"rule",claim:"Directors may be [[personally responsible for negligence in running a limited company]]. D&O is typically [['claims made']]. Companies Act / 2004 audit act changes allowed companies to fund defence more readily. Pension Schemes Act 2021 introduced new criminal offences noted in the key facts.",importance:"core",skill:"know",sources:[h(6,"Directors’ and officers’ D&O","85–88"),E("24","1.1")],confusedWith:["pi-cover"],mcq:{stem:"Who may be held personally responsible for negligence in the running of a limited company?",options:["Auditors only","Company directors only","Ordinary shareholders only","Preferential shareholders only"],correct:1,whyWrong:["Auditors have their own PI exposure; the specimen key is directors.","Correct.","Shareholders are not personally running the company in this sense.","Same as ordinary shareholders for this item."]}},{id:"l-pi",chapter:6,section:"Professional indemnity",conceptId:"pi-cover",title:"Professional indemnity",kind:"cover",claim:"PI protects a professional against liability for [[professional negligence / wrongful professional services]]. Like D&O it is typically [[claims made]]. An architect’s PI claim is usually settled by [[payment to a third party]] (the client), not by cash to the insured as a first-party benefit.",importance:"core",skill:"know",sources:[h(6,"Professional indemnity","88–90"),E("26","1.1")],mcq:{stem:"A claim under an architect’s professional indemnity policy is usually settled by",options:["a cash payment to the insured","payment to the insured’s contractors","payment to the insurers’ contractor","payment to a third party"],correct:3,whyWrong:["PI is third-party liability, not a first-party purse to the architect.","Not the usual settlement description.","Not the usual settlement description.","Correct."]}},{id:"l-trustee",chapter:6,section:"Trustee insurance",conceptId:"trustee-cover",title:"Trustees’ indemnity",kind:"cover",claim:"A charity arranges trustees’ indemnity to protect against claims arising from [[personal liability]] of trustees (wrongful acts in governance), not employee injury or ordinary third party property damage.",importance:"core",skill:"know",sources:[h(6,"Charity trustees","91–92"),E("35","1.1")],mcq:{stem:"A charity arranges trustees’ indemnity cover in order to protect themselves against claims arising from",options:["injury to employees","injury to third parties","personal liability","third party property damage"],correct:2,whyWrong:["That is EL.","That is PL.","Correct.","That is PL/property."]}},{id:"l-ew",chapter:6,section:"Extended warranties",conceptId:"extended-warranty",title:"Extended warranty",kind:"cover",claim:"Extended warranty is personal cover for purchasers after the maker’s guarantee. Cover is typically [[free repair or replacement for defect]] after the original guarantee. Specimen: dishwasher defect after guarantee expiry, if paid for, is [[extended warranty]] not household contents, all risks or products liability. Cover often [[commences one year after the premium is paid]]. Typical sum insured example [[£2,500]] per period. Repairs often must be by approved agents.",importance:"core",skill:"know",sources:[h(6,"Extended warranties","94"),E("1","1.1"),E("2","1.1"),E("36","1.1")],mcq:{stem:"Under what type of insurance policy would an individual be able to claim for a defect that occurred with his dishwasher after the original guarantee expired, assuming he paid for such cover?",options:["All risks","Extended warranty","Household contents","Products liability"],correct:1,whyWrong:["All risks possessions still do not exist to insure a manufacturer defect after guarantee in this item.","Correct.","Contents does not exist to replace a guarantee for inherent defect in this item.","Products liability is the manufacturer/retailer’s third party liability, not the buyer’s warranty product."]}},{id:"l-ew-incept",chapter:6,section:"Extended warranties",conceptId:"extended-warranty",title:"EW inception delay",kind:"rule",claim:"Under an extended warranty, cover often commences [[one year after the premium is paid]].",importance:"core",skill:"know",sources:[E("2","1.1"),h(6,"Extended warranties","94")],mcq:{stem:"Under what type of insurance policy does cover often commence one year after the premium is paid?",options:["Business interruption","Directors’ and officers’ liability","Extended warranty","Professional indemnity"],correct:2,whyWrong:["BI follows material damage during the policy period.","D&O is claims-made during its period, not a one-year deferred consumer warranty.","Correct.","PI is claims-made professional liability."]}},{id:"l-cyber",chapter:6,section:"Cyber insurance",conceptId:"cyber-cover",title:"Cyber spans classes",kind:"definition",claim:"Cyber insurance [[spans property, pecuniary and liability]]. Traditional policies proved problematic for cyber; dedicated wordings cover first-party (systems, interruption, ransomware as described) and third-party (data/privacy, GDPR/DPA exposures) with important exclusions listed in the key facts.",importance:"supporting",skill:"know",sources:[h(6,"Cyber insurance","92–94")]}],an={1:{title:"Motor insurance",outcome:"1.1",examShare:"Largest product class inside LO 1 (~36 questions)",hold:"The exam lives on the ladder: RTA only, TPO, TPFT, comprehensive. Injury is unlimited at every rung; third-party property damage is not."},2:{title:"Health insurance",outcome:"1.1",examShare:"PA/sickness, medical expenses, travel PA",hold:"Personal accident pays a stated benefit. Medical expenses reimburses treatment. Occupation rates the accident element, not sickness."},3:{title:"Package policies",outcome:"1.1",examShare:"Household and commercial packages",hold:"A package is several covers in one document because the customers look alike. Keep buildings, contents and extras in separate boxes."},4:{title:"Property insurance",outcome:"1.1",examShare:"Fire, theft, glass, money",hold:"Name the peril before you name the policy. Fire, theft, glass and money answer different questions."},5:{title:"Pecuniary insurance",outcome:"1.1",examShare:"Legal expenses and business interruption",hold:"Pecuniary is money that is not the building. Legal expenses is the cost of disputes; BI is trading after insured damage, and it needs a material damage claim first."},6:{title:"Liability insurance",outcome:"1.1",examShare:"EL, PL, products, PI, D&O, trustees, EW, cyber",hold:"Ask three questions: who was hurt, was there property damage, and does the policy fire when the injury is caused or when the claim is made."}},yf=[{id:"m-comp-extras",chapter:1,section:"Comprehensive",conceptId:"motor-comp-benefits",title:"Typical comprehensive extras",kind:"cover",claim:"Comprehensive typically includes [[personal accident cover]], extra [[medical expenses]] (often about £250–£500 beyond RTA emergency treatment), and modest [[personal belongings and clothing]] (often around £250, sometimes £1,000).",importance:"core",skill:"know",sources:[h(1,"Comprehensive","8"),F("A1D","1/5")],prerequisites:["motor-comp"]},{id:"m-doc-third-party",chapter:1,section:"Comprehensive",conceptId:"motor-driving-other",title:"Driving other cars is third party only",kind:"rule",claim:"Even under a comprehensive private motor policy, [[driving other cars]] is only [[third party]] cover — there is [[no cover for damage to the vehicle being driven]].",importance:"core",skill:"understand",sources:[F("A1D","1/4")],prerequisites:["motor-comp"],confusedWith:["motor-comp"],teachBackCue:"If you have comprehensive cover and drive a friend’s car, what happens if you damage that car?"},{id:"m-ncd-protect",chapter:1,section:"No claims discount (NCD)",conceptId:"motor-ncd",title:"Protected vs guaranteed NCD",kind:"distinction",claim:"A [[protected]] NCD allows a modest defined number of claims without dropping the discount. A [['guaranteed' discount]] after say five claim-free years can be protected ‘for life’ at extra premium, but does [[not]] guarantee the premium from which the discount is taken.",importance:"supporting",skill:"understand",sources:[F("A1E","1/5"),h(1,"No claims discount (NCD)","8")]},{id:"m-young-drivers",chapter:1,section:"Young additional drivers",conceptId:"motor-young-drivers",title:"Young additional vs main driver",kind:"rule",claim:"An occasional young additional driver (say under 25) may be added for extra premium. If the young person is a [[main driver]] even without owning the car, the insurer [[rates on the young driver’s age and experience]], not the owner’s.",importance:"supporting",skill:"apply",sources:[h(1,"Young additional drivers","9"),F("A2C","1/5–1/6")],scenario:{setup:"A parent owns the car but their 21-year-old child is one of the main drivers.",question:"Whose age and experience does IF2 say the insurer uses to rate?",answer:"The young driver’s age and experience, not the owner’s."}},{id:"m-breakdown",chapter:1,section:"Breakdown cover",conceptId:"motor-breakdown",title:"Breakdown is usually extra",kind:"cover",claim:"Breakdown assistance (call-out, limited roadside labour, towing) is typically an [[optional extra for additional premium]], not standard comprehensive cover. Recovery after an [[accident]] is treated differently from recovery after [[breakdown]].",importance:"supporting",skill:"know",sources:[F("A2J","1/7"),F("Question 1.1","1/9")],confusedWith:["motor-comp"]},{id:"m-legal-exp-motor",chapter:1,section:"Motor legal expenses",conceptId:"motor-legal-expenses",title:"Motor legal expenses add-on",kind:"cover",claim:"Motor legal expenses (when the insured is [[not to blame]]) may pay lawyers’ costs up to say [[£100,000]] to recover financial losses (excess, travel) or injury compensation from the responsible person.",importance:"detail",skill:"know",sources:[h(1,"Motor legal expenses","12"),F("A2K","1/7")]},{id:"m-multi-car",chapter:1,section:"Multi car policies",conceptId:"motor-multi-car",title:"Multi-car policies",kind:"cover",claim:"Multi-car policies can include several vehicles (sometimes 5 or 6) [[registered at the same address]], comprehensive or TPFT as appropriate, usually with a premium saving and [[separate NCDs]] per vehicle.",importance:"supporting",skill:"know",sources:[h(1,"Multi car policies","13"),F("A2M","1/7")]},{id:"m-joint",chapter:1,section:"Joint policies",conceptId:"motor-joint",title:"Joint motor policies",kind:"rule",claim:"Joint names (e.g. spouses) may operate as if [[each had their own policy]] and treat the other as a [[third party]], so one joint insured can claim against the other if at fault. Driving-other-cars is often limited to one of them.",importance:"detail",skill:"understand",sources:[F("A2L","1/7")]},{id:"m-misfuel",chapter:1,section:"Misfuelling",conceptId:"motor-misfuel",title:"Misfuelling",kind:"cover",claim:"Misfuelling extensions address loss or damage from [[accidentally filling the insured vehicle with the incorrect type of fuel]].",importance:"detail",skill:"know",sources:[h(1,"Misfuelling","13"),F("A2N","1/7")]},{id:"m-exclusions-list",chapter:1,section:"Exclusions",conceptId:"motor-exclusions",title:"General motor exclusions",kind:"exclusion",claim:"General exclusions include [[unlicensed drivers]], [[use outside the certificate]], contractual liability, war, radioactive/nuclear, [[riot and civil commotion in Northern Ireland for own damage]], sonic bangs, and pollution unless from a [[single identifiable event]]. Unroadworthy condition is also typical.",importance:"core",skill:"know",sources:[F("A3","1/8"),h(1,"Exclusions","14–15")]},{id:"m-bike-mobility",chapter:1,section:"Optional extensions",conceptId:"motor-cycle",title:"Invalid carriages / mobility vehicles",kind:"rule",claim:"Class 3 invalid carriages, mobility scooters and powered wheelchairs can be insured under motorcycle-style specialised policies. Insurance is [[recommended but not required]] (particularly for class 3).",importance:"detail",skill:"know",sources:[F("B2 Invalid carriages","1/9")]},{id:"m-comm-load",chapter:1,section:"Third party liability",conceptId:"motor-commercial-loading",title:"Loading and unloading",kind:"cover",claim:"Commercial third party liabilities extend to accidents during [[loading or unloading]]. For the driver or attendant this can extend [[beyond the carriageway]].",importance:"supporting",skill:"know",sources:[F("C1A","1/11"),h(1,"Third party liability","17")],prerequisites:["motor-commercial"]},{id:"m-comm-trailers",chapter:1,section:"Trailers",conceptId:"motor-commercial-trailers",title:"Commercial trailers",kind:"cover",claim:"Towing of trailers is covered under [[third party liability]]. Articulated/non-articulated: third party while attached is standard; some policies give comprehensive. Disabled mechanically propelled vehicles on tow are usually [[TPO]] (no damage to the towed vehicle or its goods) though some insurers now offer comprehensive while attached.",importance:"supporting",skill:"know",sources:[F("C1C","1/11"),h(1,"Trailers","18")]},{id:"m-comm-spares",chapter:1,section:"Loss of or damage to the vehicle",conceptId:"motor-commercial",title:"Commercial spares only on the vehicle",kind:"distinction",claim:"Commercial comprehensive covers the vehicle and spares/accessories [[while on the vehicle]]. Unlike private motor, there is typically [[no cover while detached]] (private motor can cover them in the insured’s garage).",importance:"supporting",skill:"know",sources:[F("C1B","1/11")]},{id:"m-comm-ext-loss-use",chapter:1,section:"Optional extensions",conceptId:"motor-commercial-extensions",title:"Commercial optional extras",kind:"cover",claim:"Commercial options include increased TPPD, unusual PA/medical extras, belongings for long-distance drivers, windscreen, indemnity to hirers or principal, carnival floats, sheets and ropes (often locked compartment), loss of use up to [[80% of leasing/hire charges]], and tools in transit on comprehensive policies.",importance:"detail",skill:"know",sources:[F("C2","1/12")]},{id:"m-foreign-green",chapter:1,section:"Foreign use",conceptId:"motor-foreign",title:"Green card free circulation",kind:"rule",claim:"From [[2 August 2021]] the UK participates in the Green Card Free Circulation Area (EEA plus Andorra, Bosnia & Herzegovina, Serbia and Switzerland), removing the green-card requirement for those countries. Many insurers still issued cards until [[2 September 2021]] on MIB recommendation. Spanish bail bonds are no longer a legal requirement and most insurers have stopped them.",importance:"detail",skill:"know",sources:[F("A2F","1/6"),h(1,"Foreign use","10")]},{id:"h-not-indemnity",chapter:2,section:"Personal accident and sickness",conceptId:"health-pas",title:"Benefit not indemnity; occupation classes",kind:"definition",claim:"PA & sickness is a [[benefit]] contract, not indemnity. Occupation is the main rating factor for the [[accident]] element (typically four occupational classes), [[not for sickness]]. Weekly disablement is kept to no more than [[normal earnings]] so there is no inducement to stay off work; other policies must be declared.",importance:"core",skill:"understand",sources:[h(2,"Personal accident and sickness insurance","17–18")]},{id:"h-franchise",chapter:2,section:"Sickness cover",conceptId:"health-pas-franchise",title:"Seven-day time franchise",kind:"rule",claim:"Sickness weekly benefit is usually subject to a [[seven-day time franchise]]: under seven days, [[nothing]] is paid; if sickness continues beyond seven days the claim covers the [[entire period including the first seven days]]. A franchise is a threshold, not an amount deducted like an excess. Sickness contracted in the first [[21 days]] is generally excluded.",importance:"core",skill:"understand",sources:[h(2,"Sickness cover","18–19")],confusedWith:["motor-comp"],mcq:{stem:"A personal accident and sickness policy has a seven-day time franchise on sickness. The insured is ill for 10 days. What is normally paid?",options:["Nothing, because the first week is always excluded","Three days’ benefit only","Benefit for the entire ten days","A capital sum instead of weekly benefit"],correct:2,whyWrong:["That describes an excess/waiting period that is deducted, not a franchise that opens the whole period.","The franchise is not a simple three-day remainder.","Correct: once the seven-day threshold is passed, the whole period is covered.","Sickness TTD is weekly, not a capital sum."]}},{id:"h-ttd-weeks",chapter:2,section:"Temporary total disablement",conceptId:"health-pas-benefits",title:"TTD up to 104 weeks",kind:"limit",claim:"Temporary total disablement from usual occupation pays a weekly benefit (example [[£200]] per week) for a maximum of [[104 weeks]] (some insurers 52 weeks at a higher limit). Accident weekly benefit may also run up to 104 weeks. TPD (temporary partial) is accident-only, often about [[40%]] of TTD, example £100/week.",importance:"supporting",skill:"know",sources:[h(2,"Temporary total disablement","20–21")]},{id:"h-geo-age",chapter:2,section:"Limitations",conceptId:"health-pas-limits",title:"PAS geography and age",kind:"rule",claim:"Accident cover is usually [[worldwide]] (sometimes no benefit if residing outside the UK more than 180 consecutive days). Sickness is generally [[UK, Europe, USA, Canada, Australia and New Zealand]]. Typical inception ages: accident [[16–70]], sickness [[16–60]]. Family policies may include children (often 6 months–16, sometimes to 23 in full-time education) at lower benefits.",importance:"supporting",skill:"know",sources:[h(2,"Geographical limits / Age limits","21–22")]},{id:"h-pas-excl",chapter:2,section:"Exclusions",conceptId:"health-pas",title:"Typical PAS exclusions",kind:"exclusion",claim:"Typical exclusions include alcohol/drugs (unless medically supervised), [[self-inflicted]] injury, pre-existing physical defects before an accident, specified sports (aviation other than as passenger, motor cycling, polo, racing, winter sports, roped mountaineering) unless extra premium, childbirth/pregnancy/VD/AIDS, war, and sickness in the first 21 days.",importance:"core",skill:"know",sources:[h(2,"Exclusions","22")]},{id:"h-pmi-choice",chapter:2,section:"Medical expenses insurance",conceptId:"health-medexp",title:"Private medical / health care purpose",kind:"definition",claim:"Medical expenses (health care) insurance funds [[private treatment outside the NHS]], giving choice of specialist, hospital and timing. It is often arranged as an employer [[group]] scheme.",importance:"supporting",skill:"know",sources:[h(2,"Medical expenses insurance","22–23")]},{id:"p-homogeneity",chapter:3,section:"Introduction",conceptId:"package-idea",title:"Homogeneity of risks",kind:"definition",claim:"Packages are used where there is [[homogeneity of risks]] — many risks share similar characteristics — so claims costs are more predictable, wordings can be standardised, and a [[single premium]] covers all included classes, with savings passed to qualifying insureds.",importance:"core",skill:"understand",sources:[h(3,"Introduction","25")]},{id:"p-buildings-def",chapter:3,section:"Building insurance",conceptId:"hh-buildings",title:"What ‘buildings’ includes",kind:"definition",claim:"Household buildings means the main dwelling plus [[garages, sheds, greenhouses and other outbuildings]], swimming pools, tennis courts, walls, gates, fences and paths. The buildings sum insured should be the [[rebuilding cost when rebuilding is complete]].",importance:"core",skill:"know",sources:[h(3,"Building insurance","26")]},{id:"p-unoccupied-30",chapter:3,section:"Riot, civil commotion",conceptId:"hh-unoccupied",title:"Unoccupied / unfurnished 30 or 60 days",kind:"exclusion",claim:"Riot/malicious damage, escape of water/oil, theft and glass/sanitary breakage commonly exclude loss while [[unfurnished or unoccupied for more than 30 or 60 days]] in the period. Malicious damage usually needs an excess and [[police notified]].",importance:"core",skill:"know",sources:[h(3,"Riot / Theft / Escape of water","27–29")]},{id:"p-storm-excl",chapter:3,section:"Storm or flood",conceptId:"hh-storm",title:"Storm or flood exclusions",kind:"exclusion",claim:"Storm or flood specifically excludes damage by [[frost, subsidence, ground heave or landslip]] and damage to [[gates, fences or hedges]]. An excess always applies. Falling trees also exclude walls/gates/fences/hedges.",importance:"core",skill:"know",sources:[h(3,"Storm or flood","27")],confusedWith:["hh-buildings"]},{id:"p-theft-act",chapter:3,section:"Theft or attempted theft",conceptId:"hh-theft",title:"Household theft follows the Theft Act",kind:"definition",claim:"There is [[no special restriction]] on ‘theft’ in household wordings: insurers cover theft as in the [[Theft Act 1968]] — dishonest appropriation of property belonging to another with intent to permanently deprive.",importance:"supporting",skill:"know",sources:[h(3,"Theft or attempted theft","29")],confusedWith:["prop-theft"]},{id:"p-aerials",chapter:3,section:"Breakage or collapse of television or radio",conceptId:"hh-buildings",title:"Aerial collapse vs the aerial itself",kind:"distinction",claim:"Buildings cover damage to the building from collapse of TV/radio aerials, [[not damage to the aerial itself]] (that is normally [[contents]]).",importance:"supporting",skill:"know",sources:[h(3,"Breakage or collapse of television or radio","30")]},{id:"p-fees-rent",chapter:3,section:"Legal fees, architects’ and surveyors’ fees",conceptId:"hh-buildings",title:"Fees, debris, loss of rent",kind:"cover",claim:"Reasonable legal/architects’/surveyors’ fees for reinstatement, demolition, shoring and debris removal are covered; [[costs of preparing the claim]] are excluded. Loss of rent can include ground rent and alternative accommodation as worded.",importance:"supporting",skill:"know",sources:[h(3,"Legal fees / Loss of rent","29–30")]},{id:"p-possessions",chapter:3,section:"Personal possessions",conceptId:"hh-possessions",title:"Personal possessions all risks",kind:"cover",claim:"Personal possessions extensions cover specified or unspecified items [[away from the home]] on an all-risks basis, subject to single-article limits and often a requirement to specify high-value items.",importance:"core",skill:"know",sources:[h(3,"Personal possessions","36–37")],prerequisites:["hh-contents"]},{id:"p-travel",chapter:3,section:"Travel insurance",conceptId:"hh-travel",title:"Travel as a package",kind:"cover",claim:"Travel insurance is commonly a package of medical expenses, personal accident (fixed benefits), personal possessions, personal liability and cancellation/curtailment. PA pays a [[fixed benefit]]; medical expenses reimburse costs.",importance:"core",skill:"know",sources:[E("14","1.1"),h(3,"Travel insurance","40")]},{id:"p-shop-office",chapter:3,section:"Commercial packages",conceptId:"package-commercial",title:"Shop, office, tradesman, hotel packages",kind:"cover",claim:"Commercial packages exist for shopkeepers, offices, tradesmen and hotels, bundling property, money, glass, liability and often BI where the risk class is homogeneous enough to standardise.",importance:"supporting",skill:"know",sources:[h(3,"Commercial packages","41–46")]},{id:"p-pets-impact",chapter:3,section:"Impact/collision",conceptId:"hh-buildings",title:"Impact excesses and pets",kind:"exclusion",claim:"Impact cover includes aircraft, dropped articles, road vehicles or animals. There may be an excess for the [[insured’s or family’s vehicles or animals]]. Damage caused by [[pets]] is usually excluded.",importance:"detail",skill:"know",sources:[h(3,"Impact/collision","28")]},{id:"pr-special-perils",chapter:4,section:"Fire and special perils insurance",conceptId:"prop-fire",title:"Fire plus special perils",kind:"cover",claim:"A standard fire policy is the base unless packaged; [[special perils]] (and sometimes all risks) are added. The proposer sets the [[sum insured]]; the insurer rates.",importance:"core",skill:"know",sources:[h(4,"Fire and special perils insurance","47")]},{id:"pr-theft-force",chapter:4,section:"Theft insurance",conceptId:"prop-theft",title:"Forcible and violent entry",kind:"definition",claim:"Commercial theft wordings typically require [[forcible and violent]] entry or exit so people cannot hide on the premises and walk out. This is stricter than household theft under the Theft Act.",importance:"core",skill:"understand",sources:[h(4,"Theft insurance","54–55")],confusedWith:["hh-theft"],mcq:{stem:"Why do commercial theft policies usually require forcible and violent entry or exit?",options:["Because the Theft Act 1968 always requires force","To stop persons hiding on the premises and later walking out with goods","Because hold-up is otherwise uncovered","Because average cannot apply without force"],correct:1,whyWrong:["The Theft Act does not always require force; household cover follows that Act without the force condition.","Correct: the wording exists to eliminate hide-and-walk-out theft.","Hold-up is a separate assault-accompanied theft definition.","Average/underinsurance is a different mechanism."]}},{id:"pr-holdup",chapter:4,section:"Theft insurance",conceptId:"prop-theft",title:"Hold-up",kind:"definition",claim:"[[Hold-up]] is theft accompanied by [[assault]]. First-loss sums insured are common because a total loss of all stock by theft is unlikely.",importance:"supporting",skill:"know",sources:[h(4,"Theft insurance","55–58")]},{id:"pr-money-limits",chapter:4,section:"Limits of liability",conceptId:"prop-money",title:"Money out of a safe",kind:"limit",claim:"Money limits vary by situation. An example in the key facts is [[£500]] for money left [[out of a safe]] on the business premises. Credit cards are not in the standard money trio (cash, cheques, postage stamps).",importance:"core",skill:"know",sources:[h(4,"Limits of liability","62"),E("20","1.1")]},{id:"pr-glass-fire",chapter:4,section:"Glass insurance",conceptId:"prop-glass",title:"Glass excludes fire and lightning",kind:"exclusion",claim:"Glass covers destruction or damage to [[fixed glass]]. It is standard to exclude damage by [[fire and lightning]], leaving those to the fire policy.",importance:"supporting",skill:"know",sources:[h(4,"Glass insurance","58–59")]},{id:"pr-average",chapter:4,section:"Underinsurance",conceptId:"prop-theft",title:"Average on theft",kind:"rule",claim:"Theft policies, like many other property classes, commonly apply [[average]] if the sum insured is inadequate.",importance:"supporting",skill:"understand",sources:[h(4,"Underinsurance","57")]},{id:"pe-group-legal",chapter:5,section:"Group legal benefit policies",conceptId:"pec-legal-group",title:"Group legal benefit sections",kind:"cover",claim:"Group legal benefit (employees and immediate family) offers choosable sections: [[employment]], [[personal]], [[motor]] (defence not covered by ordinary motor), and [[conveyancing]] (legal costs of buying/selling a house). Limits are per claim, not an overall period limit.",importance:"core",skill:"know",sources:[h(5,"Group legal benefit policies","63–64")],prerequisites:["pec-legal"]},{id:"pe-comm-legal",chapter:5,section:"Commercial legal protection policies",conceptId:"pec-legal",title:"Commercial legal sections",kind:"cover",claim:"Commercial legal protection sections include employment (unfair dismissal/discrimination plus awards), criminal prosecution defence (often HSWA — costs not [[fines]]), property disputes, motor (ULR etc.), and patents/IP. It does [[not]] cover public liability disputes.",importance:"core",skill:"know",sources:[h(5,"Commercial legal protection policies","64–66"),E("23","1.1")]},{id:"pe-icw",chapter:5,section:"Extra costs",conceptId:"pec-bi",title:"Increased cost of working",kind:"cover",claim:"BI recognises extra expenses to keep the business going after insured damage ([[increased cost of working]]) as well as loss of [[turnover]]/gross profit, within the chosen maximum indemnity period.",importance:"core",skill:"understand",sources:[h(5,"Extra costs / Turnover","68–69")]},{id:"pe-declaration",chapter:5,section:"Basis of fixing sums insured",conceptId:"pec-bi-sum",title:"Declaration-linked BI",kind:"procedure",claim:"BI sums insured can be a projected figure or [[declaration-linked]], which reduces the need to project far ahead and adjusts with declarations of actual turnover/gross profit.",importance:"supporting",skill:"know",sources:[h(5,"Basis of fixing sums insured","67–69")],prerequisites:["pec-bi"]},{id:"l-el-trace",chapter:6,section:"Employers’ liability insurance",conceptId:"el-compulsory",title:"EL tracing and certificates",kind:"procedure",claim:"Long-tail industrial disease claims led to an EL tracing service (1999, replaced 2011). From April 2012 the FCA requires participation so EL policies can be found online. Employers must provide the [[EL certificate]] to employees; each employer has a unique [[ERN]]. The 2008 amendment regulations (from 1 October 2008) changed display rules.",importance:"supporting",skill:"know",sources:[h(6,"Employers’ liability insurance","73–76")]},{id:"l-el-occurrence",chapter:6,section:"Period of insurance",conceptId:"el-cover",title:"EL is typically occurrence-based",kind:"distinction",claim:"EL generally responds to injury or disease [[caused during the period of insurance]] (occurrence), whereas D&O and PI are typically [['claims made']].",importance:"core",skill:"understand",sources:[h(6,"Period of insurance","78"),h(6,"Directors’ and officers’ D&O","86")],confusedWith:["do-cover","pi-cover"]},{id:"l-pl-conseq",chapter:6,section:"Consequential loss",conceptId:"pl-cover",title:"PL consequential vs pure financial loss",kind:"distinction",claim:"Public liability covers physical injury and damage and [[consequential loss flowing from that damage]] (e.g. hire of a replacement car). Pure [[financial loss without]] material damage is more limited and not the core PL grant.",importance:"core",skill:"understand",sources:[h(6,"Consequential loss / Financial loss","81–82")]},{id:"l-pl-limit",chapter:6,section:"Limit of indemnity",conceptId:"pl-cover",title:"PL limits of indemnity",kind:"limit",claim:"PL limits are often [[£2 million]], with figures up to [[£10 million]] not uncommon, as a maximum following an occurrence as worded.",importance:"supporting",skill:"know",sources:[h(6,"Limit of indemnity","82")]},{id:"l-claims-made",chapter:6,section:"Directors’ and officers’ D&O",conceptId:"do-cover",title:"Claims-made trigger",kind:"definition",claim:"[['Claims made']] means the policy in force when the [[claim is made]] (not necessarily when the wrongful act occurred) is the one that responds, subject to retroactive dates and discovery extensions.",importance:"core",skill:"understand",sources:[h(6,"Standard policy cover","86–87")],confusedWith:["el-cover"]},{id:"l-pension-trustee",chapter:6,section:"Pension fund trustees",conceptId:"trustee-cover",title:"Pension fund trustees",kind:"cover",claim:"The Pensions Act 1995 and later rules impose duties on pension trustees. Trustee insurance covers internal [[wrongful acts]] in that role, limited by how ‘wrongful act’ is defined.",importance:"supporting",skill:"know",sources:[h(6,"Pension fund trustees","90–91")]},{id:"l-ew-approved",chapter:6,section:"Extended warranties",conceptId:"extended-warranty",title:"Approved repairers and sum insured",kind:"procedure",claim:"Extended warranty often requires repairs by [[approved agents]]. A typical sum insured example is [[£2,500]] per period for free repair or replacement after the maker’s guarantee.",importance:"supporting",skill:"know",sources:[h(6,"Extended warranties","94")]}],gf=[{id:"m-loss-of-use",chapter:1,section:"Loss of use",conceptId:"motor-loss-of-use",title:"Loss of use is excluded unless bought",kind:"exclusion",claim:"[[Loss of use]] is a specific exclusion under comprehensive motor cover, though some insurers will sell limited [[per-day]] cover for extra premium, and many will provide a replacement vehicle for a limited period.",importance:"supporting",skill:"know",sources:[h(1,"Loss of use","9"),h(1,"Comprehensive","7")],prerequisites:["motor-comp"],confusedWith:["motor-breakdown"],teachBackCue:"Is loss of use standard comprehensive cover?"},{id:"m-glass-ncd",chapter:1,section:"Breakage of glass",conceptId:"motor-glass",title:"Glass claims and NCD",kind:"rule",claim:"Glass breakage is [[standard under comprehensive]] and can be added to non-comprehensive for extra premium. A payment under this section [[alone does not affect NCD]].",importance:"core",skill:"understand",sources:[h(1,"Breakage of glass","8–9")],prerequisites:["motor-ncd"],confusedWith:["motor-ncd"]},{id:"m-elections",chapter:1,section:"Elections",conceptId:"motor-elections",title:"Election use of vehicles",kind:"rule",claim:"Using a vehicle for [[elections]] may fall outside normal [[social, domestic and pleasure]] use. Insurers do not usually charge extra except for [[parliamentary elections]].",importance:"detail",skill:"know",sources:[h(1,"Elections","10")],prerequisites:["motor-use"]},{id:"m-racing",chapter:1,section:"Racing, competitions, rallies and trials",conceptId:"motor-racing",title:"Rallies vs racing",kind:"distinction",claim:"[[Road safety rallies]] may be covered at no extra charge. Events involving [[racing]] are covered only by a few specialist insurers, and then usually for extra premium.",importance:"supporting",skill:"understand",sources:[h(1,"Racing, competitions, rallies and trials","11")],confusedWith:["motor-use"]},{id:"m-caravans",chapter:1,section:"Caravans and trailers",conceptId:"motor-caravans",title:"Caravans attached vs separate",kind:"cover",claim:"Insurers generally give [[third party]] cover for caravans or trailers [[while attached]] to the insured vehicle. Wider caravan cover is usually a [[separate non-motor policy]]; trailer comprehensive cover may be an extension.",importance:"supporting",skill:"know",sources:[h(1,"Caravans and trailers","11")],confusedWith:["motor-commercial-trailers"]},{id:"m-pa-ext",chapter:1,section:"Personal accident benefits",conceptId:"motor-pa-extension",title:"Motor personal accident extension",kind:"cover",claim:"The motor PA extension can increase [[capital (lump sum) benefits]] or add [[weekly benefits]] for the insured or spouse, and may include rehabilitation such as physiotherapy or MRI.",importance:"detail",skill:"know",sources:[h(1,"Personal accident benefits","9")],prerequisites:["motor-comp-benefits"],confusedWith:["health-pas"]},{id:"m-cycle-specified",chapter:1,section:"Motorcycle insurance",conceptId:"motor-cycle-specified",title:"Specified motorcycle insurance",kind:"definition",claim:"The single method of insuring motorcycles is [[specified motorcycle insurance]]: the driver is insured for a [[particular motorcycle]]. ‘Motorcycle’ includes mechanically propelled cycles such as mopeds.",importance:"core",skill:"know",sources:[h(1,"Motorcycle insurance","13")],prerequisites:["motor-cycle"]},{id:"h-benefit-not-indemnity",chapter:2,section:"Personal accident and sickness",conceptId:"health-pas-benefit",title:"PA is a benefit contract",kind:"distinction",claim:"A personal accident and sickness policy is [[not a contract of indemnity]]. It is a [[benefit policy]]: it pays a sum on a stated contingency, not measured by financial loss. Weekly benefit is still kept to around [[normal earnings]] so there is no inducement to stay off work.",extra:"Occupation is the main rating factor for the accident element, not for sickness. Insurers group occupations into four classes for accident risk.",importance:"core",skill:"understand",sources:[h(2,"Personal accident and sickness","17–18")],confusedWith:["health-medexp"],teachBackCue:"Why is PA/sickness not indemnity, yet weekly benefit is still capped near earnings?"},{id:"h-accident-def",chapter:2,section:"Accident cover",conceptId:"health-pas-accident",title:"Accident must be fortuitous",kind:"definition",claim:"Accident cover pays for accidental death or bodily injury from an [[identifiable, fortuitous]] cause, usually with a time limit from the accident to the specified event, and often [[independently of any other cause]].",importance:"core",skill:"understand",sources:[h(2,"Accident cover","18")],prerequisites:["health-pas"]},{id:"h-sickness-21",chapter:2,section:"Sickness cover",conceptId:"health-pas-sickness",title:"First 21 days of sickness",kind:"exclusion",claim:"Sickness cover generally excludes sickness [[contracted within the first 21 days]] of the policy, so the insurer is not paying for disease already incubating at inception. Weekly benefit can run up to [[104 weeks]] of total disablement from usual occupation.",importance:"core",skill:"know",sources:[h(2,"Sickness cover","19")],prerequisites:["health-pas-franchise"],confusedWith:["health-pas-franchise"]},{id:"h-ptd",chapter:2,section:"Permanent total disablement",conceptId:"health-ptd",title:"Permanent total disablement",kind:"definition",claim:"[[Permanent total disablement]] is usually a [[capital sum]] (IF2 illustrates say £20,000+), often not payable until [[12 or 24 months]] after the accident so permanence and totality can be judged. Less commonly a ten-year annuity is used.",importance:"core",skill:"know",sources:[h(2,"Permanent total disablement","18"),h(2,"Permanent total disablement","20")],confusedWith:["health-ppd","health-ttd"]},{id:"h-ppd",chapter:2,section:"Permanent partial disablement",conceptId:"health-ppd",title:"Permanent partial is not standard",kind:"distinction",claim:"[[Permanent partial disablement]] is [[not a standard]] PA benefit. When given, it pays for loss of specified parts of limbs (toes, fingers) at a smaller percentage than loss of a whole limb.",importance:"supporting",skill:"understand",sources:[h(2,"Permanent partial disablement","20")],confusedWith:["health-ptd"]},{id:"h-ttd",chapter:2,section:"Temporary total disablement",conceptId:"health-ttd",title:"Temporary total disablement",kind:"definition",claim:"[[Temporary total disablement]] is inability to engage in one’s [[usual occupation]] due to accident or sickness, paid as a [[weekly benefit]] (IF2 illustrates at least about £100 per week in related discussion of partial).",importance:"core",skill:"know",sources:[h(2,"Temporary total disablement","20")],confusedWith:["health-tpd","health-ptd"]},{id:"h-tpd",chapter:2,section:"Temporary partial disablement",conceptId:"health-tpd",title:"Temporary partial disablement",kind:"definition",claim:"[[Temporary partial disablement]] prevents attending to a [[substantial part]] of normal business due to [[accident]] (not sickness). Traditional weekly amount is about [[40% of TTD]], though a different figure can be requested if justified.",importance:"supporting",skill:"understand",sources:[h(2,"Temporary partial disablement","21")],confusedWith:["health-ttd","health-ppd"]},{id:"h-death-12",chapter:2,section:"Death",conceptId:"health-death-window",title:"Death within twelve months",kind:"rule",claim:"Insurers often require death to occur [[within twelve months]] of the event giving rise to the claim. Capital benefits can start from about [[£20,000]] in the Key Facts illustration.",importance:"core",skill:"know",sources:[h(2,"Death","19")],prerequisites:["health-pas-benefits"]},{id:"h-mei",chapter:2,section:"Medical expenses insurance",conceptId:"health-mei",title:"Medical expenses insurance vs NHS",kind:"definition",claim:"[[Medical expenses insurance]] (also called health care insurance) pays for [[private medical treatment outside the NHS]]. Inpatient cover typically includes hospital charges (theatre, dressings, consultations) and specialist fees (surgeons, anaesthetists).",importance:"core",skill:"know",sources:[h(2,"Medical expenses insurance","23")],confusedWith:["health-medexp"],teachBackCue:"How does MEI differ from the modest medical expenses add-on on a PA policy?"},{id:"h-geo",chapter:2,section:"Geographical limits",conceptId:"health-pas-geo",title:"Accident vs sickness geography",kind:"distinction",claim:"Accident cover is usually [[worldwide]] (sometimes restricted). Sickness cover is generally [[UK, Europe, USA, Canada, Australia and New Zealand]], extendable beyond those limits for extra premium.",importance:"supporting",skill:"know",sources:[h(2,"Geographical limits","21")],prerequisites:["health-pas-limits"]},{id:"p-acc-damage",chapter:3,section:"Accidental damage extension",conceptId:"hh-accidental-damage",title:"Household accidental damage extension",kind:"cover",claim:"Many insurers offer a household [[accidental damage]] extension at a higher rate, always with an excess of at least [[£100]] (often more). Example: drilling through a pipe.",importance:"supporting",skill:"know",sources:[h(3,"Accidental damage extension","30")],prerequisites:["hh-buildings"],confusedWith:["hh-all-risks"]},{id:"p-contents-limits",chapter:3,section:"Contents insurance",conceptId:"hh-contents-limits",title:"Contents single-article limits",kind:"rule",claim:"Contents perils largely match buildings, but there are [[limits on single articles of value]]. Specified high-value items taken away from the home are usually insured on an [[all risks]] basis with a separate sum insured above a threshold (IF2 illustrates e.g. £1,500).",importance:"core",skill:"understand",sources:[h(3,"Contents insurance","31"),h(3,"Personal possessions","33")],prerequisites:["hh-contents"],confusedWith:["hh-possessions"]},{id:"p-shop",chapter:3,section:"Commercial insurance",conceptId:"package-shop",title:"Shop and hotel packages",kind:"cover",claim:"Commercial packages are available for most [[shopkeepers and hoteliers]] and other specified trades. The [[fabric of the building]] is generally insured or rated [[separately]] because the package is geared to the business contents and liabilities, not the structure.",importance:"core",skill:"know",sources:[h(3,"Commercial insurance","43")],prerequisites:["package-commercial"]},{id:"p-travel-med",chapter:3,section:"Travel insurance",conceptId:"hh-travel-medical",title:"Travel medical and trip length",kind:"cover",claim:"Travel insurance commonly covers medical treatment, extra hotel/travelling expenses, bringing the patient home, and additional expenses of the party. A medical sum insured of [[£10 million]] is not uncommon. Single-trip cover is usually a maximum of [[three months]]; annual multi-trip exists for regular travellers.",importance:"supporting",skill:"know",sources:[h(3,"Travel insurance","39–40")],prerequisites:["hh-travel"]},{id:"pr-standard-fire",chapter:4,section:"Fire and special perils",conceptId:"prop-fire-wording",title:"DAMAGE in capital letters",kind:"definition",claim:"The ABI [[Standard Fire and Special Perils Policy (Material Damage)]] uses [[DAMAGE]] in capitals to mean loss or destruction of or damage to the property insured. Standard fire is a defined set of perils, not ‘anything that happens’.",importance:"core",skill:"understand",sources:[h(4,"Fire and special perils","47")],prerequisites:["prop-fire"],confusedWith:["prop-all-risks"]},{id:"pr-holdup",chapter:4,section:"Theft insurance",conceptId:"prop-holdup",title:"Hold-up vs forcible theft",kind:"distinction",claim:"[[Hold-up]] is theft accompanied by [[assault or violence, or the threat of it]], to the insured or employees, whether or not there is forcible entry. It is an [[extension]], not automatic in a forcible-and-violent theft wording.",importance:"core",skill:"understand",sources:[h(4,"Theft insurance","56")],prerequisites:["prop-theft"],confusedWith:["prop-theft"],scenario:{setup:"A shop assistant is threatened with a knife at the counter; the door was unlocked.",question:"Is this standard theft (force and violence to the premises) or hold-up?",answer:"Hold-up — violence or threat to people, irrespective of forcible entry."}},{id:"pr-all-risks",chapter:4,section:"All risks",conceptId:"prop-all-risks",title:"All risks vs named perils",kind:"distinction",claim:"The [[Standard All Risks Policy (Material Damage)]] covers [[accidental loss or destruction or damage]], subject to exclusions. Fire and special perils instead offers a [[choice of named perils]], each with its own exclusions.",importance:"core",skill:"understand",sources:[h(4,"All risks","53")],confusedWith:["prop-fire","hh-all-risks"],teachBackCue:"What is the structural difference between all risks and fire & special perils?"},{id:"pr-engineering",chapter:4,section:"Engineering",conceptId:"prop-engineering",title:"Engineering as a property class",kind:"cover",claim:"Engineering is treated as its own property class in the Key Facts map of chapter 4. Business interruption may be written on an engineering basis; some engineering perils are not usually available under ordinary material-damage fire wordings.",extra:"IF2 lists engineering alongside fire/special perils and all risks as a common BI policy type (chapter 5), and as a property heading in chapter 4.",importance:"supporting",skill:"know",sources:[h(4,"Engineering","47"),h(5,"Engineering","69–70")],prerequisites:["prop-fire"]},{id:"pr-money-pa",chapter:4,section:"Money insurance",conceptId:"prop-money-pa",title:"Money personal accident extension",kind:"cover",claim:"A typical money-policy extension is [[personal accident]] compensation for assault in connection with money. [[Credit cards]] are not covered by a standard money policy and need their own extension.",importance:"supporting",skill:"know",sources:[h(4,"Optional extensions","61")],prerequisites:["prop-money"],confusedWith:["health-pas"]},{id:"pr-money-7day",chapter:4,section:"Exclusions",conceptId:"prop-money-fidelity",title:"Employee dishonesty on money",kind:"exclusion",claim:"Money insurance typically excludes loss due to the [[dishonesty of an employee]] not discovered within [[seven days]]. That employee-fraud risk is the territory of [[fidelity]] cover, not the money all-risks section.",importance:"core",skill:"understand",sources:[h(4,"Exclusions","61")],prerequisites:["prop-money"],confusedWith:["pec-fidelity"]},{id:"pe-group-sections",chapter:5,section:"Group legal benefit policies",conceptId:"pec-legal-group-sections",title:"Four group legal sections",kind:"cover",claim:"Group legal benefit policies let the proposer choose among four sections: [[employment]], [[personal]], [[motor]], and [[conveyancing]] cover.",importance:"supporting",skill:"know",sources:[h(5,"Group legal benefit policies","64")],prerequisites:["pec-legal-group"]},{id:"pe-comm-legal",chapter:5,section:"Commercial legal protection policies",conceptId:"pec-legal-commercial",title:"Commercial legal sections",kind:"cover",claim:"Commercial legal protection typically offers five choosable sections including [[employment]] (unfair dismissal / discrimination defence and awards), [[criminal]] (including HSW), [[property disputes]], [[motor]], and [[patents/registered designs]] (not all insurers).",extra:"It does not cover disputes that are the subject of public liability, nor actions the insured pursues without reasonable prospects as the Key Facts limitations describe.",importance:"core",skill:"understand",sources:[h(5,"Commercial legal protection policies","65")],prerequisites:["pec-legal"],confusedWith:["pl-cover"]},{id:"pe-declaration",chapter:5,section:"Basis of fixing sums insured",conceptId:"pec-bi-declaration",title:"Declaration-linked BI",kind:"procedure",claim:"A [[declaration linked]] BI policy only requires an estimate for the forthcoming year. Insurers then apply a [[one-third uplift]] so the insured need not project as far ahead as a full indemnity-period multiple.",importance:"core",skill:"understand",sources:[h(5,"Basis of fixing sums insured","68")],prerequisites:["pec-bi-sum"],confusedWith:["pec-bi-sum"]},{id:"pe-turnover",chapter:5,section:"Turnover",conceptId:"pec-bi-turnover",title:"Turnover in BI",kind:"definition",claim:"[[Turnover]] is the total income arising from the activities of the business. BI has two dimensions: the [[maximum indemnity period]] chosen by the insured, and the sum insured built from turnover and standing charges.",importance:"core",skill:"know",sources:[h(5,"Turnover","67"),h(5,"Basic features","67")],prerequisites:["pec-bi"]},{id:"pe-fidelity",chapter:5,section:"Fidelity",conceptId:"pec-fidelity",title:"Fidelity guarantee",kind:"cover",claim:"[[Fidelity]] (fidelity guarantee) is the pecuniary class that responds to [[employee dishonesty]] / theft of money or stock by staff — the risk money policies typically exclude if not discovered quickly.",importance:"core",skill:"understand",sources:[h(5,"Fidelity","63")],confusedWith:["prop-money","prop-theft"],teachBackCue:"A cashier steals over months. Which IF2 class, not theft or money, is designed for that?"},{id:"pe-credit",chapter:5,section:"Credit insurance",conceptId:"pec-credit",title:"Credit insurance",kind:"cover",claim:"[[Credit insurance]] is a pecuniary class covering the insured against customers failing to pay trade debts — distinct from legal expenses (cost of pursuing rights) and from BI (loss of income after insured damage).",importance:"supporting",skill:"know",sources:[h(5,"Credit insurance","63")],confusedWith:["pec-legal","pec-bi"]},{id:"l-elto",chapter:6,section:"Employers’ liability insurance",conceptId:"el-elto",title:"ELTO replaced the EL service",kind:"procedure",claim:"The EL tracing service (1999) was replaced in [[2011]] by the [[Employers’ Liability Tracing Office (ELTO)]], an independent not-for-profit industry body with a database of EL policies for claimants. From April 2012 the FCA required relevant firms to use it.",importance:"supporting",skill:"know",sources:[h(6,"Employers’ liability insurance","74–75")],prerequisites:["el-compulsory"]},{id:"l-ern",chapter:6,section:"Employers’ liability insurance",conceptId:"el-ern",title:"Employer reference number",kind:"rule",claim:"Employers must give insurers their [[employer reference number (ERN)]]. Each ERN is unique; even if the employer moves tax office the historic ERN for a point in time is permanent. ELTO uses the ERN as the identifier; insurers must supply it to the ELD.",importance:"core",skill:"know",sources:[h(6,"Employers’ liability insurance","75")],prerequisites:["el-elto"]},{id:"l-employee-def",chapter:6,section:"Definition of employee",conceptId:"el-employee",title:"Who is an employee for EL",kind:"definition",claim:"An employee is [[any person under a contract of service or apprenticeship]] with the insured. Injury must arise [[out of and in the course of]] employment in the trade or business. Cover is typically [[occurrence]] during the period of insurance, not claims-made.",importance:"core",skill:"understand",sources:[h(6,"Definition of employee","76"),h(6,"Period of insurance","77")],prerequisites:["el-cover"],confusedWith:["do-cover"]},{id:"l-pl-conseq",chapter:6,section:"Public liability insurance",conceptId:"pl-consequential",title:"PL consequential and financial loss",kind:"cover",claim:"Public liability covers accidental injury and physical damage to third party property, plus [[consequential loss flowing from that damage]]. Separate [[financial loss]] cover (loss not following physical damage) is a narrower, often optional, idea — not the same as BI.",importance:"core",skill:"understand",sources:[h(6,"Consequential loss","80"),h(6,"Financial loss","80")],prerequisites:["pl-cover"],confusedWith:["pec-bi","products-cover"]},{id:"l-products-agg",chapter:6,section:"Product liability insurance",conceptId:"products-aggregate",title:"Products yearly aggregate",kind:"rule",claim:"Product liability usually specifies a [[yearly aggregate]] limit applying to all injury and damage in the period, often the same figure as any one occurrence. Sellers of goods (manufacturers, retailers) need this class.",importance:"core",skill:"know",sources:[h(6,"Product liability insurance","82")],prerequisites:["products-cover"]},{id:"l-pi-claims",chapter:6,section:"Professional indemnity",conceptId:"pi-claims-made",title:"PI is claims-made",kind:"rule",claim:"Professional indemnity, like D&O, is typically [[claims-made]]: it protects against civil liability for professional negligence when the claim is made, not when the advice was given, subject to retroactive dates.",importance:"core",skill:"understand",sources:[h(6,"Professional indemnity","88")],prerequisites:["pi-cover"],confusedWith:["el-cover","pl-cover"]},{id:"l-el-min-limit",chapter:6,section:"Employers’ liability insurance",conceptId:"el-compulsory",title:"EL statutory minimum and market practice",kind:"limit",claim:"The Employers’ Liability (Compulsory Insurance) Regulations [[1998]] raised the statutory minimum EL limit from £2 million to [[£5 million]]. In practice insurers have provided a [[£10 million]] limit since January [[1995]].",extra:"This is a different £10 million from public liability’s ‘not uncommon’ occurrence limit. EL is the compulsory class (with motor third party). PL is not.",importance:"core",skill:"know",sources:[h(6,"Employers’ liability insurance","73")],confusedWith:["pl-cover"],mcq:{stem:"What is the statutory minimum limit of indemnity under employers’ liability insurance following the 1998 Regulations, as stated in the IF2 Key Facts?",options:["£2 million","£5 million","£10 million","Unlimited"],correct:1,whyWrong:["That was the previous statutory floor, not the 1998 figure.","Correct: the 1998 Regulations raised the minimum from £2 million to £5 million.","Market practice since January 1995, not the statutory minimum.","EL is a limited class; injury indemnity is unlimited in motor, not here."]}},{id:"l-el-pure-accident",chapter:6,section:"Legal liability",conceptId:"el-cover",title:"EL pays legal liability, not every workplace accident",kind:"distinction",claim:"An EL policy indemnifies only the employer’s [[legal liability]] to pay damages. A ‘pure’ accident with [[no negligence]] is not an EL damages claim: the employee must look to [[personal accident and sickness]] or the social security system.",importance:"core",skill:"understand",sources:[h(6,"Legal liability","75")],confusedWith:["health-pas","pl-cover"],teachBackCue:"A workplace injury with no negligence — is that an EL claim in IF2?"},{id:"l-el-vicarious",chapter:6,section:"Legal liability",conceptId:"el-cover",title:"Vicarious liability",kind:"rule",claim:"The employer is liable for the negligence of employees arising [[in the course of their employment]]. This is termed [[vicarious liability]], including where a fellow employee of the victim committed the negligent act.",importance:"core",skill:"understand",sources:[h(6,"Damages","75–76")]},{id:"l-el-territorial",chapter:6,section:"Territorial limits",conceptId:"el-cover",title:"EL territorial limits",kind:"limit",claim:"EL usually requires the injury to be sustained in [[Great Britain, Northern Ireland, the Isle of Man or the Channel Islands]], or while [[temporarily outside]] those territories (sometimes restricted to [[non-manual]] workers).",importance:"supporting",skill:"know",sources:[h(6,"Territorial limits","77")]},{id:"l-el-few-exclusions",chapter:6,section:"Limitations",conceptId:"el-cover",title:"EL has very few standard exclusions",kind:"exclusion",claim:"There are [[very few standard exclusions]] in an EL policy, mainly because they are not permitted by the compulsory insurance legislation. There is not even a standard [[war risks]] exclusion. Cover may still be limited by [[trade clauses]] (restricting the business, excluding kinds of work, machines or processes).",importance:"core",skill:"understand",sources:[h(6,"Limitations","78")],confusedWith:["pl-cover"]},{id:"l-pl-exclusions",chapter:6,section:"Public liability insurance",conceptId:"pl-cover",title:"PL exclusions that name another class",kind:"exclusion",claim:"Because public liability is wider than EL, it lists exclusions including [[injury to employees]], [[product liability]], [[professional negligence]], contractual liability, cost of rectifying defective work, deliberate acts, [[motor vehicles]], vessels and craft, lifts/elevators/boilers, war risks and radioactive contamination.",extra:"Injury to employees is the waiter-not-guest trap. Product liability is often bought as an extension. Professional negligence is PI.",importance:"core",skill:"understand",sources:[h(6,"Exclusions","80")],confusedWith:["el-cover","products-cover","pi-cover"],mcq:{stem:"Which of the following is a standard public liability exclusion in the IF2 Key Facts, because it belongs to another compulsory class?",options:["Injury to members of the public","Injury to employees","Consequential loss flowing from damaged third-party property","Claimants’ costs and expenses"],correct:1,whyWrong:["Injury to the public is the open PL grant.","Correct: injury to employees is listed as a PL exclusion — that is EL.","PL covers consequential loss flowing from insured damage.","Claimants’ costs sit with the indemnity, as with EL."]}},{id:"l-pl-extensions",chapter:6,section:"Optional extensions",conceptId:"pl-cover",title:"Common PL optional extensions",kind:"cover",claim:"The two optional extensions most commonly provided on public liability are [[tenants’ liability]] and [[defective premises]].",importance:"supporting",skill:"know",sources:[h(6,"Optional extensions","80")]},{id:"l-products-when",chapter:6,section:"Product liability insurance",conceptId:"products-cover",title:"Products: injury during the period, not the supply date",kind:"rule",claim:"The injury or damage must occur [[during the period of insurance]], [[not necessarily]] when the goods or services were supplied. Financial loss is not usually covered unless it results from actual bodily injury or loss of or damage to property.",importance:"core",skill:"understand",sources:[h(6,"Standard policy cover","81")],confusedWith:["do-cover"],mcq:{stem:"Under a products liability policy as described in IF2, the injury or damage must occur",options:["when the goods were supplied, even if injury is years later","during the period of insurance, not necessarily when the goods were supplied","only after a claim is notified, because products is always claims-made","only if the buyer also holds extended warranty"],correct:1,whyWrong:["Key Facts separates the supply date from the injury date.","Correct.","Claims-made is the D&O / PI trigger, not the products wording here.","Extended warranty is the buyer’s defect product, not products liability."]}},{id:"l-products-exclusions",chapter:6,section:"Product liability insurance",conceptId:"products-cover",title:"Products extra exclusions",kind:"exclusion",claim:"A products liability policy takes the public liability exclusions and also excludes [[contractual liability]], [[damage to goods supplied]], [[faulty design or formula]], and [[unsuitability or failure to perform]].",importance:"supporting",skill:"know",sources:[h(6,"Exclusions","82")],confusedWith:["extended-warranty"]},{id:"l-do-two-covers",chapter:6,section:"Directors’ and officers’ D&O",conceptId:"do-cover",title:"D&O has two indemnities",kind:"cover",claim:"D&O has two elements: cover for directors and officers in their [[personal capacity]] when they cannot claim an indemnity from the company, and cover for the [[company]] where it is permitted to indemnify them (for example repayment of legal defence costs).",extra:"The Companies (Audit, Investigations and Community Enterprise) Act 2004 lets companies fund defence and indemnify certain third-party liabilities, but not the legal costs of an unsuccessful criminal defence or criminal fines and penalties.",importance:"core",skill:"understand",sources:[h(6,"Standard policy cover","84"),h(6,"Directors’ and officers’ D&O","83")]},{id:"l-do-pension-offence",chapter:6,section:"Directors’ and officers’ D&O",conceptId:"do-cover",title:"Pension Schemes Act 2021 offences",kind:"rule",claim:"The Pension Schemes Act [[2021]] introduced two new criminal offences relating to pension schemes. They can be committed by anyone, including a director or officer, and can lead to fines of up to [[£1 million]].",importance:"supporting",skill:"know",sources:[h(6,"Directors’ and officers’ D&O","83")]},{id:"l-do-exclusions",chapter:6,section:"Directors’ and officers’ D&O",conceptId:"do-cover",title:"D&O exclusions that name another class",kind:"exclusion",claim:"Typical D&O exclusions include prior notification, US/Canada jurisdiction clauses, [[bodily injury and property damage]], pollution, improper personal gain, fraud, [['insured v. insured']], [[breach of professional duty]] (usually PI), and fines, penalties and punitive damages.",importance:"core",skill:"understand",sources:[h(6,"Policy exclusions","85")],confusedWith:["pi-cover","pl-cover"]},{id:"l-pi-excludes-pl",chapter:6,section:"Professional indemnity",conceptId:"pi-cover",title:"PI is always claims-made and is not public liability",kind:"distinction",claim:"Professional indemnity policies, like D&O, are [[always]] on a [['claims made']] basis. Apart from excluding risks that are the subject of [[public liability]] and, possibly, claims arising outside the UK, a PI policy usually excludes [[dishonesty of the insured]].",importance:"core",skill:"understand",sources:[h(6,"Professional indemnity","85–86")],confusedWith:["pl-cover","do-cover"]},{id:"l-cyber-sides",chapter:6,section:"Cyber insurance",conceptId:"cyber-cover",title:"Cyber first-party and third-party",kind:"cover",claim:"Cyber policies may combine [[first party]] cover (the business’s own assets) and [[third party]] cover (the assets of others). Important exclusions include [[employers’ liability]] unless data-privacy obligations have not been met, [[products liability]], fines against the public interest, and a [[time excess]] on business income that can range from 12 to 168 hours.",importance:"supporting",skill:"know",sources:[h(6,"Summary of covers","90"),h(6,"Some important exclusions","90")],confusedWith:["el-cover","products-cover"]},{id:"l-ew-term",chapter:6,section:"Extended warranties",conceptId:"extended-warranty",title:"EW extends the maker’s twelve months, often to five years",kind:"rule",claim:"The manufacturer’s guarantee usually covers repairs or defects for [[twelve months]]. Extended warranty is a time extension: free repairs following electrical and mechanical defects for a period of up to [[five years]]. A typical sum insured is [[£2,500]] per period. Repairs must often be carried out by the [[supplier]].",extra:"Exclusions include failure to follow the manufacturer’s instructions, risks normally covered by household contents, war, and costs of repairs to bulbs, aerials, knobs and similar.",importance:"core",skill:"know",sources:[h(6,"Extended warranties","90–91")],confusedWith:["products-cover","hh-contents"]}],j=e=>e,vf=[j({id:"q-rta-tppd",chapter:1,lo:"1.1",conceptIds:["motor-rta"],factIds:["m-rta-tppd"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"What is the Road Traffic Act only limit for third party property damage?",options:["£1.2 million","£5 million","£20 million","Unlimited"],correct:0,whyCorrect:"RTA only TPPD is limited to £1.2 million in the IF2 materials.",whyWrong:["This is the RTA figure.","About the usual commercial motor TPPD illustration, not RTA.","Usual private TPO TPPD illustration.","Injury indemnity is unlimited, not property damage."],misconception:"motor-tpo",sources:[h(1,"Road Traffic Act only","5"),F("A1A","1/3")],examStyle:!0}),j({id:"q-tpo-20m",chapter:1,lo:"1.1",conceptIds:["motor-tpo","motor-rta"],factIds:["m-tpo-extras"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"Which figure is the usual private-car third party property damage limit under third party only cover, as stated in IF2?",options:["£1.2 million","£5 million","£20 million","Unlimited"],correct:2,whyCorrect:"TPO usually grants £20 million TPPD for private cars, far above the £1.2 million RTA minimum.",whyWrong:["That is the RTA / compulsory minimum, not typical TPO private-car TPPD.","A commercial motor illustration, not private TPO.","Correct.","Injury is unlimited; property damage is not."],misconception:"motor-rta",sources:[h(1,"Third party only (TPO)","6"),F("A1B","1/3")],examStyle:!0}),j({id:"q-doc-comp",chapter:1,lo:"1.1",conceptIds:["motor-driving-other","motor-comp"],factIds:["m-doc-third-party"],difficulty:3,kind:"scenario",cognitive:"application",stem:"Ayesha has comprehensive private motor insurance and borrows a neighbour’s car. She damages that car. What cover does IF2 say the driving-other-cars extension gives?",options:["Comprehensive own-damage on the borrowed car","Third party only — no cover for damage to the borrowed car","TPFT on the borrowed car","Whatever the neighbour’s policy would have paid"],correct:1,whyCorrect:"Driving other cars remains third party only, even on a comprehensive policy; there is no cover for damage to the vehicle being driven.",whyWrong:["Comprehensive does not travel with the driver onto someone else’s car for own damage.","Correct.","Fire and theft of the borrowed car is not granted by this extension.","The extension is defined by Ayesha’s policy, not the neighbour’s."],misconception:"motor-comp",sources:[F("A1D","1/4")],examStyle:!0}),j({id:"q-ncd-glass",chapter:1,lo:"1.1",conceptIds:["motor-ncd"],factIds:["m-glass-ncd"],difficulty:2,kind:"knowledge",cognitive:"understanding",stem:"A windscreen is replaced under the glass section of a comprehensive motor policy and no other claim is made. What happens to the no claims discount?",options:["It is reduced by two years","It is lost entirely","It is unaffected if the claim is under this section alone","It is protected only if a green card was issued"],correct:2,whyCorrect:"A claim under the glass section alone does not affect NCD.",whyWrong:["Two-year step-back is the usual rule for a general claim, not glass-alone.","Glass-alone does not wipe NCD.","Correct.","Green cards relate to foreign use, not NCD."],sources:[h(1,"Breakage of glass","8–9"),F("A2A","1/5")],examStyle:!0}),j({id:"q-hit-run",chapter:1,lo:"1.1",conceptIds:["motor-uninsured-promise"],factIds:["m-uninsured-promise"],difficulty:3,kind:"scenario",cognitive:"application",stem:"An uninsured-driver promise usually protects NCD and excess if the other vehicle’s details are given. When does IF2 say it will NOT apply?",options:["Where the accident is the insured’s fault","Where the other driver is comprehensively insured","Hit and run / untraced accidents where required details are unavailable","Where the claim is for windscreen glass only"],correct:2,whyCorrect:"The promise does not apply to hit and run / untraced accidents because the third-party vehicle details cannot be given.",whyWrong:["Fault of the insured is a different coverage question.","If the other driver is insured the promise is not the issue.","Correct.","Glass-alone is an NCD rule, not this promise."],sources:[h(1,"Uninsured driver promise","8"),F("A1F","1/5")],examStyle:!0}),j({id:"q-rta-pay-excluded",chapter:1,lo:"1.1",conceptIds:["motor-exclusions"],factIds:["m-exclusions-rta-pay"],difficulty:4,kind:"which-correct",cognitive:"understanding",stem:"Which statement about Road Traffic Act claims and policy exclusions is correct in IF2?",options:["If the policy excludes the use, the insurer may refuse the innocent third party","The insurer must pay an RTA claim even if the wording excludes it, and may recover from the insured","Exclusions never apply to own-damage claims in Northern Ireland","Unlicensed driving always prevents any payment to third parties"],correct:1,whyCorrect:"The Acts protect innocent victims: the insurer pays the RTA claim then may recover from the insured.",whyWrong:["The whole point of the RTA overlay is that innocent victims are still paid.","Correct.","Riot/civil commotion in NI is an own-damage market exclusion, not this rule.","RTA payment can still be required; recovery from the insured may follow."],sources:[F("A3","1/8")],examStyle:!0}),j({id:"q-bike-accessories",chapter:1,lo:"1.1",conceptIds:["motor-cycle"],factIds:["m-bike"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Under a motorcycle policy, accessories are only covered if stolen",options:["from a locked garage","from the motorcycle","using force and violence","with the motorcycle"],correct:3,whyCorrect:"Unlike private cars, motorcycle accessories/spares are covered for theft only if the motorcycle is stolen at the same time.",whyWrong:["Garage-only theft of accessories is the private-car idea, not the motorcycle difference.","Stolen from the bike while it remains is not covered under that difference.","Forcible and violent is a commercial theft wording idea.","Correct — stolen with the motorcycle."],examStyle:!0,sources:[F("B1","1/9"),E("8","1.1")]}),j({id:"q-comm-omit-pa",chapter:1,lo:"1.1",conceptIds:["motor-commercial"],factIds:["m-comm-omit"],difficulty:2,kind:"distinction",cognitive:"distinction",stem:"Which cover is omitted from a comprehensive commercial vehicle policy but provided under comprehensive private car insurance?",options:["Foreign use","Legal costs in defence of a claim","Personal accident benefits","Towing of a disabled vehicle"],correct:2,whyCorrect:"Personal accident (and other ‘personal benefits’) are omitted from standard commercial motor.",whyWrong:["Foreign use is not the omitted personal-benefits class.","Defence costs appear in commercial third party notes.","Correct.","Towing appears in commercial trailer notes."],examStyle:!0,sources:[F("C1D","1/11"),E("9","1.1")]}),j({id:"q-comm-min-tppd",chapter:1,lo:"1.1",conceptIds:["motor-commercial-tppd"],factIds:["m-comm-tppd"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"What is the minimum legal limit of indemnity for third party property damage under a commercial vehicle insurance policy?",options:["£100,000","£250,000","£500,000","£1,200,000"],correct:3,whyCorrect:"The specimen key is £1,200,000 — the RTA property-damage minimum also used for restricted haulage limits.",whyWrong:["Too low.","Too low.","Too low.","Correct."],examStyle:!0,sources:[E("7","1.1"),F("C1A","1/11")]}),j({id:"q-git-not-motor",chapter:1,lo:"1.1",conceptIds:["motor-commercial"],factIds:["m-comm-scope"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"Commercial motor insurance covers risks to the vehicles themselves. Cover for the goods they carry is",options:["included automatically on comprehensive commercial motor","a separate class: goods in transit","always added by the loading-and-unloading extension","treated as personal belongings"],correct:1,whyCorrect:"Goods carried are goods in transit, not commercial motor.",whyWrong:["Comprehensive commercial still concerns the vehicle, not cargo.","Correct.","Loading/unloading is third party injury/damage during those operations, not cargo insurance.","Personal belongings are a different extra."],sources:[h(1,"Commercial motor insurance","16"),F("C","1/10")],examStyle:!0}),j({id:"q-sorn",chapter:1,lo:"1.1",conceptIds:["motor-compulsory"],factIds:["m-sorn-exam"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"A motor vehicle must be insured unless",options:["it is being kept in a garage and not driven on public roads","it is kept on a private driveway and is not driven on public roads","it is only driven on private roads and is not driven on public roads","a Statutory Off Road Notification declaration is made to the DVLA"],correct:3,whyCorrect:"The specimen exception is a SORN declaration to the DVLA.",whyWrong:["Garage storage is not the specimen exception.","A driveway is not the specimen exception.","Private-road-only use is not the specimen exception.","Correct."],examStyle:!0,sources:[E("6","1.1")]}),j({id:"q-four-levels",chapter:1,lo:"1.1",conceptIds:["motor-cover-levels"],factIds:["m-four-levels"],difficulty:1,kind:"knowledge",cognitive:"recognition",stem:"Which sequence lists private motor cover from minimum to widest?",options:["TPO, RTA only, comprehensive, TPFT","RTA only, TPO, TPFT, comprehensive","TPFT, TPO, RTA only, comprehensive","Comprehensive, TPFT, TPO, RTA only"],correct:1,whyCorrect:"RTA only → TPO → TPFT → comprehensive.",whyWrong:["Mis-orders the minimum.","Correct.","Starts too high.","That is widest to narrowest."],sources:[h(1,"Standard policy cover","5"),F("A1","1/2")],examStyle:!0}),j({id:"q-tpft-vs-comp",chapter:1,lo:"1.1",conceptIds:["motor-tpft","motor-comp"],factIds:["m-comp"],difficulty:2,kind:"distinction",cognitive:"distinction",stem:"What is the main extra that comprehensive private motor adds over TPFT?",options:["Third party injury indemnity","Fire, lightning, explosion and theft of the insured’s car","Accidental and malicious damage to the insured’s car","Goods in transit"],correct:2,whyCorrect:"Comprehensive adds accidental and malicious own-damage on an all-risks-of-own-damage basis with listed exclusions.",whyWrong:["Already in RTA/TPO.","That is the TPFT extra over TPO.","Correct.","Not a motor own-damage extra."],misconception:"motor-tpft",sources:[h(1,"Comprehensive","7"),F("A1D","1/4")],examStyle:!0}),j({id:"q-young-rate",chapter:1,lo:"1.1",conceptIds:["motor-young-drivers"],factIds:["m-young-drivers"],difficulty:3,kind:"scenario",cognitive:"application",stem:"A 22-year-old does not own the family car but is one of the main drivers. How does IF2 say the insurer rates the risk?",options:["On the owner-parent’s age and experience","On the young driver’s age and experience","Always as named-driver only with no extra premium","As a commercial goods-carrying vehicle"],correct:1,whyCorrect:"If a young person is a main driver, rating follows their age and experience, not the owner’s.",whyWrong:["That would understate the risk IF2 describes.","Correct.","Occasional additional drivers may be added for extra premium; a main driver is rated as such.","Irrelevant class."],sources:[h(1,"Young additional drivers","9"),F("A2C","1/5–1/6")],examStyle:!0}),j({id:"q-load-unload",chapter:1,lo:"1.1",conceptIds:["motor-commercial-loading"],factIds:["m-comm-load"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"Under commercial motor third party cover, accidents during loading or unloading",options:["are never covered","are covered, and for the driver or attendant may extend beyond the carriageway","are covered only if goods in transit is also in force","are treated as employers’ liability only"],correct:1,whyCorrect:"C1A records loading/unloading third party cover, extending beyond the carriageway for driver/attendant.",whyWrong:["Opposite of the text.","Correct.","GIT is cargo; this is third party injury/damage during operations.","EL is employment injury, not this motor third party extension."],sources:[F("C1A","1/11")]}),j({id:"q-pas-benefit",chapter:2,lo:"1.1",conceptIds:["health-pas"],factIds:["h-not-indemnity"],difficulty:2,kind:"definition",cognitive:"understanding",stem:"A personal accident and sickness policy is best described as",options:["a contract of indemnity measured by financial loss","a benefit policy paying stated sums on named contingencies","a first-loss property policy","a claims-made liability policy"],correct:1,whyCorrect:"IF2: it is not indemnity; it is a benefit contract.",whyWrong:["The text contrasts PAS with indemnity.","Correct.","Wrong class.","Wrong class."],sources:[h(2,"Personal accident and sickness insurance","17")],examStyle:!0}),j({id:"q-death-12",chapter:2,lo:"1.1",conceptIds:["health-pas-benefits"],factIds:["h-death-12"],difficulty:1,kind:"knowledge",cognitive:"recognition",stem:"For a death claim under personal accident insurance, death must usually occur within how many months of the accident?",options:["12 months","18 months","24 months","36 months"],correct:0,whyCorrect:"Insurers often stipulate twelve months. (24 months appears as a PTD assessment wait, not the usual death window.)",whyWrong:["Correct.","Not the usual death window.","Used for assessing PTD, not the usual death claim window.","Not the usual death window."],examStyle:!0,sources:[h(2,"Death","19"),E("12","1.1")]}),j({id:"q-franchise",chapter:2,lo:"1.1",conceptIds:["health-pas-franchise"],factIds:["h-franchise"],difficulty:4,kind:"distinction",cognitive:"distinction",stem:"How does a seven-day time franchise on sickness benefit differ from an excess?",options:["A franchise is always deducted from the settlement; an excess is not","If the threshold is passed, the franchise claim includes the first seven days; an excess is deducted","They are interchangeable terms in IF2","A franchise applies only to capital sums"],correct:1,whyCorrect:"Key facts: franchises are thresholds; unlike excesses they are not simply deducted. Beyond seven days the whole period is paid.",whyWrong:["That reverses the distinction.","Correct.","IF2 distinguishes them.","The franchise discussed is on weekly sickness benefit."],sources:[h(2,"Sickness cover","18–19")],examStyle:!0}),j({id:"q-suicide",chapter:2,lo:"1.1",conceptIds:["health-pas"],factIds:["h-suicide"],difficulty:2,kind:"scenario",cognitive:"application",stem:"A failed suicide attempt causes temporary partial disablement. What benefit is normally payable under PAS?",options:["Medical expenses","Weekly benefit until recovery","A lump sum","No benefit"],correct:3,whyCorrect:"Specimen: no benefit is normally payable; self-inflicted injury is a typical exclusion.",whyWrong:["Not the usual PAS response here.","TTD/TPD is not paid for this excluded cause.","Capital benefit is not paid for this excluded cause.","Correct."],examStyle:!0,sources:[E("18","1.1"),h(2,"Exclusions","22")]}),j({id:"q-medexp-care",chapter:2,lo:"1.1",conceptIds:["health-medexp"],factIds:["h-medexp"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"A medical expenses policy will generally NOT pay the cost of",options:["ambulance fees","anaesthetist’s fees","long-term residential care","surgical dressings"],correct:2,whyCorrect:"Long-term residential care is outside general medical expenses cover in the specimen.",whyWrong:["Typical acute cost.","Typical surgical cost.","Correct.","Typical treatment cost."],examStyle:!0,sources:[E("11","1.1")]}),j({id:"q-travel-pa",chapter:2,lo:"1.1",conceptIds:["health-pas-benefits","hh-travel"],factIds:["h-travel-pa"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Under which section of a travel insurance policy would a fixed benefit be paid?",options:["Medical expenses","Personal accident","Personal liability","Personal possessions"],correct:1,whyCorrect:"PA pays a fixed/capital benefit; the others are indemnity or property.",whyWrong:["Reimburses costs.","Correct.","Third party indemnity.","Property."],examStyle:!0,sources:[E("14","1.1")]}),j({id:"q-occ-rate",chapter:2,lo:"1.1",conceptIds:["health-pas"],factIds:["h-not-indemnity"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"Occupation is the main rating factor for which element of personal accident and sickness insurance?",options:["Sickness only","The accident element, not sickness","Medical expenses only","Travel cancellation only"],correct:1,whyCorrect:"Occupation is the main rating factor for the personal accident element, not for sickness; occupations are grouped in four classes.",whyWrong:["Opposite of the key facts.","Correct.","PMI is a different product.","Not PAS rating."],sources:[h(2,"Personal accident and sickness insurance","17")],examStyle:!0}),j({id:"q-new-for-old",chapter:3,lo:"1.1",conceptIds:["hh-settlement"],factIds:["p-hh-settle"],difficulty:2,kind:"distinction",cognitive:"distinction",stem:"Under household ‘new for old’ (reinstatement) settlement, the insurer generally pays",options:["market value after wear and tear on all items","the full cost of replacing as new, with wear and tear still deducted for some items such as clothing and linen","agreed value only","first loss only"],correct:1,whyCorrect:"New for old pays replacement as new; wear and tear may still be deducted for clothing/linen, inadequate sums insured, or older property.",whyWrong:["That is indemnity/market value, now rarely chosen.","Correct.","Agreed value is not the household default described.","First loss is a commercial theft idea."],sources:[h(3,"Household insurance","25–26")],examStyle:!0}),j({id:"q-subsidence-xs",chapter:3,lo:"1.1",conceptIds:["hh-buildings"],factIds:["p-subsidence-xs"],difficulty:1,kind:"knowledge",cognitive:"recognition",stem:"What is the normal excess example given for subsidence cover under household buildings?",options:["£250","£500","£750","£1,000"],correct:3,whyCorrect:"A substantial excess of £1,000 or more (or a percentage of the sum insured) is always imposed.",whyWrong:["Day-to-day excess territory.","Still below the usual subsidence example.","Still below.","Correct."],examStyle:!0,sources:[h(3,"Subsidence, ground heave or landslip","30"),E("15","1.1")]}),j({id:"q-coastal",chapter:3,lo:"1.1",conceptIds:["hh-buildings"],factIds:["p-coastal"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"A standard household policy for a house near the sea would NOT normally cover damage arising from",options:["coastal erosion","ground heave","a hurricane force wind","tidal flooding"],correct:0,whyCorrect:"Coastal erosion is outside normal household cover in the specimen.",whyWrong:["Correct.","Heave is a listed peril with a large excess.","Storm/wind is a standard peril.","Flood family unless excluded."],examStyle:!0,sources:[E("16","1.1")]}),j({id:"q-storm-gates",chapter:3,lo:"1.1",conceptIds:["hh-storm"],factIds:["p-storm-excl"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"Storm or flood cover under household buildings specifically excludes damage to",options:["the main roof","gates, fences or hedges","underground drains","sanitary ware"],correct:1,whyCorrect:"Storm/flood excludes frost, subsidence/heave/landslip, and gates, fences or hedges. An excess always applies.",whyWrong:["Roofs are core storm subject-matter.","Correct.","Drains/pipes have their own accidental damage grant.","Glass/sanitary is another section."],sources:[h(3,"Storm or flood","27")],examStyle:!0}),j({id:"q-allrisks-away",chapter:3,lo:"1.1",conceptIds:["hh-all-risks"],factIds:["p-allrisks-away"],difficulty:2,kind:"definition",cognitive:"understanding",stem:"When a commercial policy includes an all risks section, this usually means cover is provided",options:["away from the risk address","including electrical breakdown","on an agreed value basis","with no excess"],correct:0,whyCorrect:"Specimen meaning: away from the risk address — not ‘no excess’ or breakdown.",whyWrong:["Correct.","Breakdown is typically excluded or engineered separately.","Settlement basis, not the meaning of all risks here.","Excesses still apply."],examStyle:!0,sources:[E("19","1.1")]}),j({id:"q-riot-prop",chapter:3,lo:"1.1",conceptIds:["hh-buildings"],factIds:["p-riot-property"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"In certain areas of the UK, riot damage is usually covered under which type of policy?",options:["Money","Property","Public liability","Travel"],correct:1,whyCorrect:"Specimen: property.",whyWrong:["Wrong class.","Correct.","Third party, not the insured’s riot damage.","Wrong class."],examStyle:!0,sources:[E("13","1.1")]}),j({id:"q-hh-theft-vs-comm",chapter:3,lo:"1.1",conceptIds:["hh-theft","prop-theft"],factIds:["p-theft-act","pr-theft-force"],difficulty:4,kind:"distinction",cognitive:"distinction",stem:"Which statement correctly distinguishes household theft from typical commercial theft wordings?",options:["Both always require forcible and violent entry","Household follows the Theft Act 1968 without a force condition; commercial theft usually requires forcible and violent entry or exit","Commercial theft follows the Theft Act only; household always needs hold-up","Neither ever covers attempted theft"],correct:1,whyCorrect:"Household: no special restriction, Theft Act 1968. Commercial: forcible and violent to stop hide-and-walk-out.",whyWrong:["Household does not impose that condition in the key facts.","Correct.","Reverses the classes.","Attempted theft is mentioned for household."],misconception:"prop-theft",sources:[h(3,"Theft or attempted theft","29"),h(4,"Theft insurance","54–55")],examStyle:!0}),j({id:"q-shop-glass",chapter:3,lo:"1.1",conceptIds:["package-commercial"],factIds:["p-shop-glass"],difficulty:2,kind:"scenario",cognitive:"application",stem:"An employee accidentally breaks a shop window and its wooden frame. The commercial policy includes plate glass. What is covered in the specimen?",options:["Neither","Window only","Frame only","Both"],correct:3,whyCorrect:"Specimen Q17: both the window and the wooden frame.",whyWrong:["Not the key.","Incomplete.","Incomplete.","Correct."],examStyle:!0,sources:[E("17","1.1")]}),j({id:"q-unoccupied-days",chapter:3,lo:"1.1",conceptIds:["hh-unoccupied"],factIds:["p-unoccupied-30"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"Household theft, escape of water and similar perils are commonly excluded while the building is unfurnished or unoccupied for more than",options:["7 days","14 days","30 or 60 days in the period of insurance","12 months"],correct:2,whyCorrect:"Wordings commonly use 30 or 60 days in any one insurance period.",whyWrong:["Too short for the stated household rule.","Too short.","Correct.","Far longer than the stated period."],sources:[h(3,"Theft or attempted theft","29")],examStyle:!0}),j({id:"q-rebuild-sum",chapter:3,lo:"1.1",conceptIds:["hh-buildings"],factIds:["p-buildings-def"],difficulty:2,kind:"definition",cognitive:"understanding",stem:"The buildings sum insured on a household policy should represent",options:["market value of the house including land","the rebuilding cost at the time rebuilding is complete","original purchase price","outstanding mortgage only"],correct:1,whyCorrect:"Key facts: rebuilding cost when rebuilding is complete.",whyWrong:["Land is not rebuilt.","Correct.","Historic price is not the measure.","Mortgage is not the measure."],sources:[h(3,"Household insurance","26")],examStyle:!0}),j({id:"q-unoccupied-malicious",chapter:4,lo:"1.1",conceptIds:["prop-fire"],factIds:["pr-unoccupied"],difficulty:3,kind:"knowledge",cognitive:"recognition",stem:"When a fire and special perils building becomes unoccupied as defined, cover normally excludes theft, storm, escape of water and which other peril?",options:["Fire","Flood","Impact","Malicious damage"],correct:3,whyCorrect:"Specimen: malicious damage. Fire typically remains.",whyWrong:["Fire usually remains.","Not the fourth named exclusion.","Not the fourth named exclusion.","Correct."],examStyle:!0,sources:[E("21","1.1")]}),j({id:"q-money-def",chapter:4,lo:"1.1",conceptIds:["prop-money"],factIds:["pr-money-def"],difficulty:2,kind:"definition",cognitive:"recognition",stem:"Money insurance provides cover for",options:["cash, cheques and credit and debit cards","cash, cheques and postage stamps","cash, postage stamps and credit and debit cards","cheques, postage stamps and credit and debit cards"],correct:1,whyCorrect:"Specimen trio: cash, cheques and postage stamps. Cards are a typical extension, not that item’s definition.",whyWrong:["Includes cards.","Correct.","Omits cheques.","Omits cash."],examStyle:!0,sources:[E("20","1.1")]}),j({id:"q-money-fraud",chapter:4,lo:"1.1",conceptIds:["prop-money","prop-theft"],factIds:["pr-money-vs-theft-fraud"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"For theft of money due to employee fraud, which policy provides some protection in the specimen comparison?",options:["Both theft and money","Only theft","Only money","Neither"],correct:2,whyCorrect:"Only the money policy in that comparison.",whyWrong:["Theft is not the vehicle.","Opposite of the key.","Correct.","Money does give some protection."],examStyle:!0,misconception:"prop-theft",sources:[E("10","1.1")]}),j({id:"q-force-why",chapter:4,lo:"1.1",conceptIds:["prop-theft"],factIds:["pr-theft-force"],difficulty:3,kind:"which-correct",cognitive:"understanding",stem:"Commercial theft policies usually require forcible and violent entry or exit in order to",options:["match the Theft Act 1968 exactly","stop persons hiding on the premises and later walking out with goods","convert theft into hold-up","disapply average"],correct:1,whyCorrect:"The key facts state this eliminates hide-and-walk-out theft.",whyWrong:["The Theft Act does not always require force.","Correct.","Hold-up is theft accompanied by assault — a different definition.","Average is underinsurance."],sources:[h(4,"Theft insurance","54–55")],examStyle:!0}),j({id:"q-holdup",chapter:4,lo:"1.1",conceptIds:["prop-theft"],factIds:["pr-holdup"],difficulty:2,kind:"definition",cognitive:"recognition",stem:"In theft insurance, hold-up means",options:["any theft after hours","theft accompanied by assault","theft of money from a bank night safe","forcible entry without violence to persons"],correct:1,whyCorrect:"Hold-up is defined as theft accompanied by assault.",whyWrong:["Too wide.","Correct.","A money-situation, not the definition.","Force to property is the entry condition, not hold-up."],sources:[h(4,"Theft insurance","55")],examStyle:!0}),j({id:"q-glass-fire-excl",chapter:4,lo:"1.1",conceptIds:["prop-glass"],factIds:["pr-glass-fire"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"A standalone glass policy standardly excludes damage caused by",options:["accidental breakage","malicious damage","fire and lightning","impact by a vehicle"],correct:2,whyCorrect:"Fire and lightning are left to the fire policy.",whyWrong:["Accidental breakage is the class.","Not the standard fire-policy carve-out.","Correct.","Not the stated standard exclusion."],sources:[h(4,"Glass insurance","58–59")],examStyle:!0}),j({id:"q-money-500",chapter:4,lo:"1.1",conceptIds:["prop-money"],factIds:["pr-money-limits"],difficulty:3,kind:"knowledge",cognitive:"recognition",stem:"The key facts give which example limit for money left out of a safe on the business premises?",options:["£50","£500","£5,000","Unlimited"],correct:1,whyCorrect:"An example of £500 is stated for money left out of a safe on the premises.",whyWrong:["Too low for the stated example.","Correct.","A different situation would use other limits.","Money is limited by situation."],sources:[h(4,"Limits of liability","62")],examStyle:!0}),j({id:"q-le-not-pl",chapter:5,lo:"1.1",conceptIds:["pec-legal"],factIds:["pe-le-purpose"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"A commercial legal expenses policy would NOT normally provide cover for",options:["employment disputes","patents and copyright disputes","property disputes","public liability disputes"],correct:3,whyCorrect:"PL disputes belong on liability policies, not commercial LE.",whyWrong:["Listed LE section.","Listed option.","Listed option (not all insurers).","Correct."],examStyle:!0,sources:[E("23","1.1"),h(5,"Commercial legal protection policies","64–66")]}),j({id:"q-bi-period",chapter:5,lo:"1.1",conceptIds:["pec-bi"],factIds:["pe-bi-indem-period"],difficulty:2,kind:"definition",cognitive:"understanding",stem:"Under business interruption insurance, the indemnity period is the period",options:["after the date of any loss which is excluded in calculating the loss","for which the policy must be in force before a claim can be considered","for which the policy reimburses the insured in respect of a claim","from the date of loss to the next renewal date"],correct:2,whyCorrect:"Specimen: the period for which the policy reimburses the insured.",whyWrong:["Time excess idea.","Deferred inception idea.","Correct.","Renewal does not define it."],examStyle:!0,sources:[E("3","1.1")]}),j({id:"q-mdw",chapter:5,lo:"1.1",conceptIds:["pec-bi"],factIds:["pe-mdw"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"A material damage warranty/proviso on a BI policy means",options:["BI pays even if the buildings policy is void","there must be a valid property (material damage) claim for an insured peril before BI responds","stock must be valued weekly","EL must be in force"],correct:1,whyCorrect:"Virtually all BI policies require a valid material damage claim first.",whyWrong:["Opposite.","Correct.","Unrelated.","Unrelated class."],sources:[h(5,"Material damage warranty","69–70")],examStyle:!0}),j({id:"q-bi-react",chapter:5,lo:"1.1",conceptIds:["pec-bi"],factIds:["pe-bi-questions"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Proposers are usually asked how they would react if a claim occurred under which class?",options:["Business interruption","Commercial vehicle","Employers’ liability","Public liability"],correct:0,whyCorrect:"Specimen Q22: business interruption (continuity).",whyWrong:["Correct.","Not centred on trading reaction.","Employment injury.","Third party hazards."],examStyle:!0,sources:[E("22","1.1")]}),j({id:"q-fines",chapter:5,lo:"1.1",conceptIds:["pec-legal"],factIds:["pe-comm-legal"],difficulty:4,kind:"which-correct",cognitive:"understanding",stem:"Commercial legal protection for criminal prosecution defence typically covers",options:["fines imposed on the company","defence costs (e.g. under HSWA), but not fines, because paying fines is against the public interest","public liability damages","the cost of rebuilding after fire"],correct:1,whyCorrect:"Key facts: costs, including an employee appearing in court, but not fines.",whyWrong:["Fines are not insured.","Correct.","That is PL, which LE excludes as disputes.","Property, not LE."],sources:[h(5,"Commercial legal protection policies","65")],examStyle:!0}),j({id:"q-group-conv",chapter:5,lo:"1.1",conceptIds:["pec-legal-group"],factIds:["pe-group-legal"],difficulty:3,kind:"knowledge",cognitive:"recognition",stem:"Conveyancing cover under a group legal benefit policy is for",options:["defending HSWA prosecutions","legal costs of buying and/or selling one’s house up to a specified limit","patents and copyright","employers’ liability injury claims"],correct:1,whyCorrect:"Group legal sections include conveyancing for house sale/purchase costs.",whyWrong:["Commercial criminal section.","Correct.","Commercial IP option.","EL."],sources:[h(5,"Group legal benefit policies","64")]}),j({id:"q-el-injury",chapter:6,lo:"1.1",conceptIds:["el-cover"],factIds:["l-el-injury-only"],difficulty:2,kind:"distinction",cognitive:"distinction",stem:"Which class provides cover for injury claims but NOT property claims?",options:["Employers’ liability","Products liability","Public liability","Trustees’ indemnity"],correct:0,whyCorrect:"EL is employee injury/disease, not third party property.",whyWrong:["Correct.","Products covers injury and damage caused by products.","PL covers injury and property.","Wrongful-act financial/governance."],examStyle:!0,sources:[E("4","1.1")]}),j({id:"q-rsi",chapter:6,lo:"1.1",conceptIds:["el-cover"],factIds:["l-el-rsi"],difficulty:2,kind:"scenario",cognitive:"application",stem:"A secretary develops RSI from working conditions which permanently prevents her existing employment. Which employer policy could pay compensation?",options:["Employers’ liability","Legal expenses","Professional indemnity","Public liability"],correct:0,whyCorrect:"Employee injury arising out of work is EL.",whyWrong:["Correct.","LE pays legal costs.","PI is professional services to clients.","PL is non-employee third parties."],examStyle:!0,sources:[E("25","1.1")]}),j({id:"q-hotel-pl",chapter:6,lo:"1.1",conceptIds:["pl-cover"],factIds:["l-pl"],difficulty:2,kind:"scenario",cognitive:"application",stem:"A hotel owner wants cover for third party injury and property claims. Which class is most likely required?",options:["Employers’ liability","Professional indemnity","Public liability","Trustees’ indemnity"],correct:2,whyCorrect:"Guests and public property damage are PL. Employees would be EL separately.",whyWrong:["Employees, not guests.","Advice to clients.","Correct.","Governance."],examStyle:!0,sources:[E("34","1.1")]}),j({id:"q-products-ext",chapter:6,lo:"1.1",conceptIds:["products-cover"],factIds:["l-products"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Products liability is often found as an extension to which policy?",options:["Employers’ liability","Professional indemnity","Public liability","Trustees’ indemnity"],correct:2,whyCorrect:"Specimen: extension to public liability.",whyWrong:["Employment injury.","Professional services.","Correct.","Trustees."],examStyle:!0,sources:[E("27","1.1")]}),j({id:"q-directors",chapter:6,lo:"1.1",conceptIds:["do-cover"],factIds:["l-do"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Who may be held personally responsible for negligence in the running of a limited company?",options:["Auditors only","Company directors only","Ordinary shareholders only","Preferential shareholders only"],correct:1,whyCorrect:"Specimen key: company directors.",whyWrong:["Own PI exposure; not this key.","Correct.","Not running the company in this sense.","Same as ordinary shareholders here."],examStyle:!0,sources:[E("24","1.1")]}),j({id:"q-pi-settle",chapter:6,lo:"1.1",conceptIds:["pi-cover"],factIds:["l-pi"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"A claim under an architect’s professional indemnity policy is usually settled by",options:["a cash payment to the insured","payment to the insured’s contractors","payment to the insurers’ contractor","payment to a third party"],correct:3,whyCorrect:"PI is third-party liability — typically payment to the client, not a first-party purse to the architect.",whyWrong:["Not first-party.","Not the usual description.","Not the usual description.","Correct."],examStyle:!0,sources:[E("26","1.1")]}),j({id:"q-trustee",chapter:6,lo:"1.1",conceptIds:["trustee-cover"],factIds:["l-trustee"],difficulty:2,kind:"scenario",cognitive:"application",stem:"A charity buys trustees’ indemnity to protect against claims arising from",options:["injury to employees","injury to third parties","personal liability","third party property damage"],correct:2,whyCorrect:"Specimen: personal liability of trustees (wrongful acts), not EL/PL.",whyWrong:["EL.","PL.","Correct.","PL/property."],examStyle:!0,sources:[E("35","1.1")]}),j({id:"q-ew-dishwasher",chapter:6,lo:"1.1",conceptIds:["extended-warranty"],factIds:["l-ew"],difficulty:2,kind:"scenario",cognitive:"application",stem:"After a dishwasher’s original guarantee expires, the owner paid for extra defect cover. Which product responds?",options:["All risks","Extended warranty","Household contents","Products liability"],correct:1,whyCorrect:"Specimen Q1: extended warranty, not contents or the manufacturer’s products liability.",whyWrong:["Not this defect-after-guarantee product.","Correct.","Contents does not replace a guarantee for inherent defect here.","The manufacturer/retailer’s third party liability, not the buyer’s warranty."],examStyle:!0,sources:[E("1","1.1"),h(6,"Extended warranties","94")]}),j({id:"q-ew-year",chapter:6,lo:"1.1",conceptIds:["extended-warranty"],factIds:["l-ew-incept"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Under what type of policy does cover often commence one year after the premium is paid?",options:["Business interruption","Directors’ and officers’ liability","Extended warranty","Professional indemnity"],correct:2,whyCorrect:"Specimen Q2: extended warranty, after the maker’s guarantee year.",whyWrong:["Follows MD during the period.","Claims-made during its period.","Correct.","Claims-made PI."],examStyle:!0,sources:[E("2","1.1")]}),j({id:"q-claims-made",chapter:6,lo:"1.1",conceptIds:["do-cover","el-cover"],factIds:["l-claims-made","l-el-occurrence"],difficulty:4,kind:"distinction",cognitive:"distinction",stem:"Which pair correctly matches trigger to class as described in IF2?",options:["EL — claims made; D&O — occurrence","EL — typically occurrence (caused during the period); D&O and PI — typically claims made","Public liability — claims made only; products — occurrence only","Extended warranty — claims made"],correct:1,whyCorrect:"EL: injury/disease caused during the period. D&O/PI: claims made.",whyWrong:["Reversed.","Correct.","Not the IF2 pairing asked here.","EW is a consumer defect product after a guarantee, not this trigger pair."],misconception:"el-cover",sources:[h(6,"Period of insurance","78"),h(6,"Standard policy cover","86–88")],examStyle:!0}),j({id:"q-pl-conseq",chapter:6,lo:"1.1",conceptIds:["pl-cover"],factIds:["l-pl-conseq"],difficulty:4,kind:"which-correct",cognitive:"understanding",stem:"Which statement about public liability is correct in IF2?",options:["It never covers any financial loss","It covers physical injury/damage and consequential loss flowing from that damage; pure financial loss without damage is more limited","It is the class that excludes all property claims","It is compulsory for all UK employers in the same way as EL"],correct:1,whyCorrect:"PL includes consequential loss from insured damage (e.g. hire car) but is not a pure financial-loss policy.",whyWrong:["Consequential loss from damage is covered.","Correct.","That is closer to EL’s injury-not-property point.","EL (and motor TPL) are the major compulsory classes described."],sources:[h(6,"Consequential loss / Financial loss","81–82")],examStyle:!0}),j({id:"q-cum-el-pl-guest",chapter:6,lo:"1.1",conceptIds:["el-cover","pl-cover"],factIds:["l-el-injury-only","l-pl"],difficulty:3,kind:"cumulative",cognitive:"application",stem:"A hotel chef burns a guest and, separately, a waiter (employee). Which pairing matches IF2?",options:["Guest — EL; waiter — PL","Guest — PL; waiter — EL","Both — products liability","Both — professional indemnity"],correct:1,whyCorrect:"Guests are third parties (PL). Employees injured arising out of work are EL.",whyWrong:["Reversed.","Correct.","Not a product defect.","Not professional advice."],sources:[h(6,"Public liability insurance","80"),h(6,"Employers’ liability insurance","76")],examStyle:!0}),j({id:"q-cum-ew-vs-contents",chapter:3,lo:"1.1",conceptIds:["extended-warranty","hh-contents"],factIds:["l-ew","p-contents"],difficulty:3,kind:"cumulative",cognitive:"distinction",stem:"Henry’s TV fails after 14 months. He bought extra cover for defects after the shop guarantee. The claim is considered under",options:["All risks","Extended warranty","Legal expenses","Products liability"],correct:1,whyCorrect:"Specimen Q36: extended warranty, not household all risks or the seller’s products liability.",whyWrong:["Possessions all risks is not this defect product.","Correct.","Costs of disputes, not the repair product.","Manufacturer/retailer liability."],examStyle:!0,sources:[E("36","1.1")]}),j({id:"q-inexperienced",chapter:1,lo:"1.1",conceptIds:["motor-comp"],factIds:["m-young-excess"],difficulty:3,kind:"definition",cognitive:"understanding",stem:"For the extra ‘young or inexperienced drivers’ excess, IF2 treats ‘inexperienced’ as",options:["any driver under 40","holding a provisional licence, or not having held a full licence for at least a year","anyone without a no claims discount","any additional named driver"],correct:1,whyCorrect:"Study text: provisional licence, or not having held a full licence for at least a year. The extra excess sits over any policy excess.",whyWrong:["Not the definition.","Correct.","NCD is separate.","Named drivers are not automatically ‘inexperienced’."],sources:[F("A1D","1/4")],examStyle:!0}),j({id:"q-ncd-stepback",chapter:1,lo:"1.1",conceptIds:["motor-ncd"],factIds:["m-ncd"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"After a claim, insurers generally reduce NCD entitlement by",options:["one week","dropping back two years","cancelling the policy","doubling the excess only"],correct:1,whyCorrect:"Generally drop back two years if a claim is made, unless protected.",whyWrong:["Not the stated step-back.","Correct.","Not the NCD rule.","Excess is a different lever."],sources:[h(1,"No claims discount (NCD)","8"),F("A1E","1/5")],examStyle:!0})],U=e=>e,wf=[U({id:"q-loss-of-use",chapter:1,lo:"1.1",conceptIds:["motor-loss-of-use"],factIds:["m-loss-of-use"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Under a standard comprehensive private motor policy, loss of use is",options:["included automatically with no excess","a specific exclusion, though limited cover or a courtesy car may be arranged","the same as breakdown recovery","paid as a capital sum like personal accident"],correct:1,whyCorrect:"Key Facts: loss of use is a comprehensive exclusion; some insurers sell limited per-day cover or provide a replacement vehicle for a limited period.",whyWrong:["It is excluded, not automatic.","Correct.","Breakdown is a different optional extra; accident recovery is treated differently again.","PA benefits are a different section."],misconception:"motor-breakdown",sources:[h(1,"Loss of use","9")],examStyle:!0}),U({id:"q-glass-ncd",chapter:1,lo:"1.1",conceptIds:["motor-glass","motor-ncd"],factIds:["m-glass-ncd"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"A comprehensive policy pays only for a broken windscreen. What happens to no claims discount?",options:["NCD is always lost","NCD drops back two years","A payment under the glass section alone does not affect NCD","NCD is protected only if the third party is identified"],correct:2,whyCorrect:"Glass as a standalone section payment does not affect NCD.",whyWrong:["That would be an ordinary damage claim, not glass-alone.","The usual NCD step-back after a claim, not glass-alone.","Correct.","That is the uninsured-driver promise, not glass."],misconception:"motor-ncd",sources:[h(1,"Breakage of glass","8–9")],examStyle:!0}),U({id:"q-specified-moto",chapter:1,lo:"1.1",conceptIds:["motor-cycle-specified"],factIds:["m-cycle-specified"],difficulty:2,kind:"definition",cognitive:"recognition",stem:"Specified motorcycle insurance means",options:["any motorcycle the insured happens to ride","the driver is insured for a particular motorcycle","cover for accessories even if the machine is not stolen","the same personal accident benefits as a private car"],correct:1,whyCorrect:"Key Facts: the single method is specified motorcycle insurance — a particular machine.",whyWrong:["That would be closer to ‘driving other cycles’, an optional extra.","Correct.","Motorcycle theft of accessories usually needs the machine stolen too.","Motorcycle comprehensive typically has no PA / medical expenses beyond RTA emergency treatment."],sources:[h(1,"Motorcycle insurance","13")],examStyle:!0}),U({id:"q-caravan-tp",chapter:1,lo:"1.1",conceptIds:["motor-caravans"],factIds:["m-caravans"],difficulty:3,kind:"scenario",cognitive:"application",stem:"A touring caravan is hit while hitched to the insured car. What cover do insurers generally provide under the motor policy?",options:["Full comprehensive on the caravan as if it were the car","Third party cover while it is attached","Household buildings cover","Goods in transit"],correct:1,whyCorrect:"Third party while attached; wider caravan cover is usually a separate non-motor policy.",whyWrong:["Comprehensive on the trailer is not automatic.","Correct.","Buildings cover the house, not a touring caravan on the road.","GIT is cargo, not the caravan itself."],sources:[h(1,"Caravans and trailers","11")],examStyle:!0}),U({id:"q-pas-not-indemnity",chapter:2,lo:"1.1",conceptIds:["health-pas-benefit"],factIds:["h-benefit-not-indemnity"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"Which statement about personal accident and sickness insurance is correct?",options:["It is a contract of indemnity measured by financial loss","It is a benefit policy, but weekly disablement benefit is still kept around normal earnings","Occupation is the main rating factor for the sickness section","It never appears as an add-on to travel, motor or household"],correct:1,whyCorrect:"PA/sickness is a benefit contract, not indemnity; weekly benefits are still kept near earnings to avoid staying off work.",whyWrong:["That is indemnity, which Key Facts expressly says this is not.","Correct.","Occupation is the main rating factor for the accident element, not sickness.","Key Facts says it is often an add-on to those products."],sources:[h(2,"Personal accident and sickness","17–18")],examStyle:!0}),U({id:"q-sickness-21",chapter:2,lo:"1.1",conceptIds:["health-pas-sickness"],factIds:["h-sickness-21"],difficulty:3,kind:"knowledge",cognitive:"recognition",stem:"Sickness cover generally excludes sickness contracted",options:["within the first 21 days of the policy","anywhere outside the insured’s home town","after 104 weeks of employment","unless an excess of £1,000 is paid"],correct:0,whyCorrect:"The 21-day waiting exclusion stops cover for disease already incubating at inception.",whyWrong:["Correct.","Geography is a different limitation.","104 weeks is the usual maximum weekly-benefit period, not an exclusion trigger.","That is a household subsidence-style excess, not PA sickness."],misconception:"health-pas-franchise",sources:[h(2,"Sickness cover","19")],examStyle:!0}),U({id:"q-franchise-vs-excess",chapter:2,lo:"1.1",conceptIds:["health-pas-franchise"],factIds:["h-sickness-21"],difficulty:4,kind:"distinction",cognitive:"distinction",stem:"A seven-day time franchise on sickness benefit means that if the insured is off for ten days",options:["the first seven days are always deducted like an excess","nothing is paid because ten days is still ‘short’","the whole ten days are paid, including the first seven, because the threshold was crossed","only capital benefits are paid"],correct:2,whyCorrect:"A franchise is a threshold. Once sickness lasts beyond seven days, the claim includes the initial seven days. An excess would deduct them.",whyWrong:["That describes an excess, which Key Facts contrasts with a franchise.","Under seven days would pay nothing; ten days crosses the threshold.","Correct.","This is weekly sickness benefit, not a capital sum."],sources:[h(2,"Sickness cover","19")],examStyle:!0}),U({id:"q-ptd-delay",chapter:2,lo:"1.1",conceptIds:["health-ptd"],factIds:["h-ptd"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Permanent total disablement compensation may be delayed because",options:["the insurer is waiting for the NHS to pay first","it can take 12 or 24 months to know the disablement is permanent and total","ELTO must be notified","a material damage proviso must be satisfied"],correct:1,whyCorrect:"Key Facts: PTD capital sum may wait 12 or 24 months to establish permanence and totality.",whyWrong:["MEI is about private treatment, not this delay.","Correct.","EL tracing is employers’ liability.","The material damage proviso is business interruption."],sources:[h(2,"Permanent total disablement","20")],examStyle:!0}),U({id:"q-ppd-not-standard",chapter:2,lo:"1.1",conceptIds:["health-ppd"],factIds:["h-ppd"],difficulty:2,kind:"which-correct",cognitive:"understanding",stem:"Which statement about permanent partial disablement is correct in IF2?",options:["It is a standard PA benefit at the same capital sum as PTD","It is not standard; when given it pays for specified parts of limbs at a smaller percentage","It is a weekly benefit for sickness only","It replaces employers’ liability"],correct:1,whyCorrect:"PPD is not standard; it is a scheduled-parts benefit when offered.",whyWrong:["PTD is the usual capital benefit, not PPD.","Correct.","That is closer to TTD/sickness weekly cover.","EL is a liability class."],sources:[h(2,"Permanent partial disablement","20")],examStyle:!0}),U({id:"q-tpd-accident",chapter:2,lo:"1.1",conceptIds:["health-tpd"],factIds:["h-tpd"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"Temporary partial disablement on a PA/sickness policy typically applies to",options:["sickness as well as accident, at 100% of TTD","accident only, traditionally about 40% of the TTD weekly amount","permanent loss of fingers only","private hospital theatre fees"],correct:1,whyCorrect:"TPD is accident (not sickness) and is traditionally about 40% of TTD.",whyWrong:["Sickness TPD is not the Key Facts wording.","Correct.","That is PPD territory.","That is medical expenses / MEI."],sources:[h(2,"Temporary partial disablement","21")],examStyle:!0}),U({id:"q-mei",chapter:2,lo:"1.1",conceptIds:["health-mei"],factIds:["h-mei"],difficulty:2,kind:"definition",cognitive:"recognition",stem:"Medical expenses insurance (health care insurance) is primarily designed to",options:["pay a weekly wage if the insured cannot work","fund private medical treatment outside the NHS","indemnify employers for employee injury","repair consumer goods after the maker’s guarantee"],correct:1,whyCorrect:"MEI is private treatment outside the NHS, including hospital and specialist fees.",whyWrong:["That is PA/sickness weekly benefit.","Correct.","That is employers’ liability.","That is extended warranty."],misconception:"health-medexp",sources:[h(2,"Medical expenses insurance","23")],examStyle:!0}),U({id:"q-hh-ad-ext",chapter:3,lo:"1.1",conceptIds:["hh-accidental-damage"],factIds:["p-acc-damage"],difficulty:2,kind:"scenario",cognitive:"application",stem:"A householder drills through a water pipe. Which household extension is designed for this kind of mishap?",options:["Subsidence, ground heave or landslip","Accidental damage extension","Legal expenses employment cover","Uninsured driver promise"],correct:1,whyCorrect:"Key Facts uses drilling through a pipe as the accidental-damage illustration, always with at least a £100 excess.",whyWrong:["A different buildings peril with a large excess.","Correct.","Pecuniary legal expenses.","Motor."],sources:[h(3,"Accidental damage extension","30")],examStyle:!0}),U({id:"q-shop-fabric",chapter:3,lo:"1.1",conceptIds:["package-shop"],factIds:["p-shop"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"In shopkeepers’ and hoteliers’ packages, the fabric of the building is generally",options:["the main thing the package is designed to cover","insured or rated separately because the package is geared to business contents and liabilities","covered only if the shop is unoccupied","replaced by employers’ liability"],correct:1,whyCorrect:"Packages for shops/hotels are geared to the business; building fabric is separate.",whyWrong:["Opposite of the Key Facts point.","Correct.","Unoccupancy restricts perils; it does not replace the rating split.","EL is a liability class."],sources:[h(3,"Commercial insurance","43")],examStyle:!0}),U({id:"q-holdup",chapter:4,lo:"1.1",conceptIds:["prop-holdup"],factIds:["pr-holdup"],difficulty:4,kind:"scenario",cognitive:"application",stem:"A thief threatens a cashier with a knife at an unlocked shop door. Cover for this is described in IF2 as",options:["standard theft, because there was violence","hold-up — assault or threat to people, whether or not entry was forcible","fidelity, because a staff member was present","public liability, because a visitor might have been hurt"],correct:1,whyCorrect:"Hold-up is theft with assault/violence/threat to people, irrespective of forcible entry. Standard theft often needs force and violence to the premises.",whyWrong:["Violence to a person is not the same as forcible entry to the building.","Correct.","Fidelity is employee dishonesty.","PL is legal liability to third parties, not the stolen till."],misconception:"prop-theft",sources:[h(4,"Theft insurance","56")],examStyle:!0}),U({id:"q-all-risks-named",chapter:4,lo:"1.1",conceptIds:["prop-all-risks"],factIds:["pr-all-risks"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"The structural difference between fire & special perils and all risks material-damage cover is that",options:["all risks lists named perils; fire lists accidents","fire & special perils offers a choice of named perils; all risks covers accidental loss/damage subject to exclusions","all risks never has exclusions","fire cover is claims-made"],correct:1,whyCorrect:"Named-perils vs accidental loss subject to exclusions is the ABI wording contrast in Key Facts.",whyWrong:["Reversed.","Correct.","All risks is still exclusion-driven.","Fire MD is occurrence/damage, not claims-made."],sources:[h(4,"All risks","53")],examStyle:!0}),U({id:"q-money-7day",chapter:4,lo:"1.1",conceptIds:["prop-money-fidelity","pec-fidelity"],factIds:["pr-money-7day"],difficulty:4,kind:"cumulative",cognitive:"distinction",stem:"Employee theft of money not discovered for two months is generally",options:["paid in full under money ‘all risks’","excluded from money (seven-day discovery) and is a fidelity risk","a standard theft (force and violence) claim","products liability"],correct:1,whyCorrect:"Money typically excludes employee dishonesty not found within seven days; fidelity is the pecuniary class for staff dishonesty.",whyWrong:["The seven-day discovery exclusion blocks this.","Correct.","No forcible entry is described.","Injury/damage from goods."],sources:[h(4,"Exclusions","61")],examStyle:!0}),U({id:"q-decl-linked",chapter:5,lo:"1.1",conceptIds:["pec-bi-declaration"],factIds:["pe-declaration"],difficulty:3,kind:"knowledge",cognitive:"understanding",stem:"On a declaration-linked business interruption policy the insured",options:["must project turnover for the full indemnity period plus a year","estimates the forthcoming year and insurers apply a one-third uplift","needs no sum insured because BI is a benefit policy","is covered only for engineering perils"],correct:1,whyCorrect:"Declaration-linked: estimate next year, one-third uplift, avoiding long projections.",whyWrong:["That difficulty is why declaration-linked exists.","Correct.","BI is indemnity-style interruption, not PA benefit.","Engineering is one BI type, not this rating method."],sources:[h(5,"Basis of fixing sums insured","68")],examStyle:!0}),U({id:"q-group-legal-4",chapter:5,lo:"1.1",conceptIds:["pec-legal-group-sections"],factIds:["pe-group-sections"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Which four sections can a proposer choose on a group legal benefit policy?",options:["Fire, theft, glass, money","Employment, personal, motor, conveyancing","EL, PL, products, D&O","RTA, TPO, TPFT, comprehensive"],correct:1,whyCorrect:"Key Facts lists those four group legal sections.",whyWrong:["Property classes.","Correct.","Liability classes.","Motor cover levels."],sources:[h(5,"Group legal benefit policies","64")],examStyle:!0}),U({id:"q-credit-vs-bi",chapter:5,lo:"1.1",conceptIds:["pec-credit","pec-bi"],factIds:["pe-credit"],difficulty:4,kind:"cumulative",cognitive:"distinction",stem:"A manufacturer’s largest customer simply will not pay an undisputed invoice. Which pecuniary class is designed for that?",options:["Business interruption after a fire","Credit insurance","Legal expenses motor cover","Household new-for-old"],correct:1,whyCorrect:"Credit insurance is trade-debt default. BI needs insured damage; legal expenses is cost of pursuing rights; new-for-old is household settlement.",whyWrong:["BI follows material damage.","Correct.","Motor legal expenses is a different section.","Household settlement basis."],sources:[h(5,"Credit insurance","63")],examStyle:!0}),U({id:"q-elto",chapter:6,lo:"1.1",conceptIds:["el-elto"],factIds:["l-elto"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"ELTO is",options:["the 1969 compulsory EL statute","the 2011 Employers’ Liability Tracing Office, holding a database of EL policies for claimants","the ABI fire wording","the Green Card Free Circulation Area"],correct:1,whyCorrect:"ELTO replaced the 1999 EL service in 2011 as an independent tracing database.",whyWrong:["That Act makes EL compulsory.","Correct.","Material damage wording.","Motor foreign use."],sources:[h(6,"Employers’ liability insurance","74–75")],examStyle:!0}),U({id:"q-ern",chapter:6,lo:"1.1",conceptIds:["el-ern"],factIds:["l-ern"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"The employer reference number (ERN) used by ELTO",options:["changes every time the employer moves tax office, so historic claims cannot be traced","is unique; the historic ERN for a point in time remains permanent","is the employee’s National Insurance number","is only required for public liability"],correct:1,whyCorrect:"ERN is unique and historically stable; insurers must supply it to the ELD.",whyWrong:["Key Facts says the historic ERN remains permanent.","Correct.","Different identifier.","This is an EL tracing requirement."],sources:[h(6,"Employers’ liability insurance","75")],examStyle:!0}),U({id:"q-el-vs-claims-made",chapter:6,lo:"1.1",conceptIds:["el-employee","pi-claims-made"],factIds:["l-employee-def","l-pi-claims"],difficulty:4,kind:"cumulative",cognitive:"distinction",stem:"Which pairing is consistent with IF2?",options:["Employers’ liability is typically claims-made; professional indemnity is occurrence","Employers’ liability typically responds to injury caused during the period (occurrence); professional indemnity is typically claims-made","Both EL and PI ignore when the injury or claim happens","Public liability never covers consequential loss from damaged property"],correct:1,whyCorrect:"EL: injury/disease caused during the period. PI (like D&O): claims-made.",whyWrong:["Reversed.","Correct.","Timing is the whole distinction.","PL does cover consequential loss flowing from physical damage."],sources:[h(6,"Period of insurance","77"),h(6,"Professional indemnity","88")],examStyle:!0}),U({id:"q-products-agg",chapter:6,lo:"1.1",conceptIds:["products-aggregate"],factIds:["l-products-agg"],difficulty:3,kind:"knowledge",cognitive:"recognition",stem:"Product liability wordings usually apply",options:["an unlimited indemnity like RTA injury","a yearly aggregate limit to all injury and damage in the period","cover only for the manufacturer, never a retailer","a seven-day time franchise"],correct:1,whyCorrect:"Yearly aggregate, often matching the any-one-occurrence figure.",whyWrong:["Injury unlimited is motor RTA, not products.","Correct.","Sellers of goods include retailers.","PA sickness franchise."],sources:[h(6,"Product liability insurance","82")],examStyle:!0}),U({id:"q-pl-financial",chapter:6,lo:"1.1",conceptIds:["pl-consequential"],factIds:["l-pl-conseq"],difficulty:4,kind:"distinction",cognitive:"distinction",stem:"A van hits a shopfront. The owner’s lost takings while the window is boarded are, in public liability terms,",options:["pure financial loss with no connection to damage, always excluded","consequential loss flowing from physical damage to third-party property, which PL typically covers","business interruption on the van driver’s own BI policy automatically","extended warranty"],correct:1,whyCorrect:"PL covers losses directly flowing from insured physical damage (Key Facts even uses hiring another car as an illustration). Pure financial loss without damage is a different, narrower idea.",whyWrong:["That would be pure financial loss, not loss following damage.","Correct.","The driver’s BI would need their own insured damage and a material-damage proviso — not this third-party shop.","Consumer goods after guarantee."],sources:[h(6,"Consequential loss","80")],examStyle:!0}),U({id:"q-travel-10m",chapter:3,lo:"1.1",conceptIds:["hh-travel-medical"],factIds:["p-travel-med"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Travel medical expenses in the Key Facts illustration are commonly around",options:["£250–£500 as on comprehensive motor","£10 million, with single-trip cover usually limited to about three months","the RTA emergency treatment fee only","new for old on buildings"],correct:1,whyCorrect:"£10 million is described as not uncommon; single-trip typically max three months.",whyWrong:["Motor comprehensive medical extras.","Correct.","Motor RTA.","Household settlement."],sources:[h(3,"Travel insurance","39–40")],examStyle:!0}),U({id:"q-el-min-limit",chapter:6,lo:"1.1",conceptIds:["el-compulsory"],factIds:["l-el-min-limit"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Following the 1998 Regulations, the statutory minimum employers’ liability limit of indemnity in the IF2 Key Facts is",options:["£2 million","£5 million","£10 million","Unlimited"],correct:1,whyCorrect:"1998 Regulations raised the statutory floor from £2 million to £5 million. £10 million is market practice since January 1995.",whyWrong:["Previous statutory floor.","Correct.","Practice since 1995, not the statute.","Motor injury is unlimited; EL is not."],sources:[h(6,"Employers’ liability insurance","73")],examStyle:!0}),U({id:"q-pl-excl-employees",chapter:6,lo:"1.1",conceptIds:["pl-cover","el-cover"],factIds:["l-pl-exclusions","l-el-injury-only"],difficulty:3,kind:"distinction",cognitive:"distinction",stem:"A public liability policy in the IF2 Key Facts excludes injury to employees because that risk is",options:["always uninsurable","employers’ liability","extended warranty","business interruption"],correct:1,whyCorrect:"PL is an open policy defined by exclusions; injury to employees is listed because EL is the employee-injury class.",whyWrong:["EL insures it, and is compulsory.","Correct.","Buyer’s defect cover after a guarantee.","Trading loss after material damage."],misconception:"el-cover",sources:[h(6,"Exclusions","80"),h(6,"Standard policy cover","76–78")],examStyle:!0}),U({id:"q-products-when",chapter:6,lo:"1.1",conceptIds:["products-cover"],factIds:["l-products-when"],difficulty:4,kind:"knowledge",cognitive:"understanding",stem:"Under products liability as described in IF2, when must the injury or damage occur?",options:["When the goods were supplied","During the period of insurance, not necessarily when the goods were supplied","Only when a claim is notified, because products is always claims-made","One year after the premium is paid"],correct:1,whyCorrect:"Key Facts: the injury or damage must occur during the period of insurance, not necessarily the supply of goods.",whyWrong:["Supply date is not the trigger here.","Correct.","Claims-made is D&O/PI.","That is the extended-warranty specimen timing."],sources:[h(6,"Standard policy cover","81")],examStyle:!0}),U({id:"q-ew-five",chapter:6,lo:"1.1",conceptIds:["extended-warranty"],factIds:["l-ew-term"],difficulty:2,kind:"knowledge",cognitive:"recognition",stem:"Extended warranty, in the IF2 Key Facts, is a time extension of the manufacturer’s usual twelve-month guarantee for free repairs for up to",options:["90 days","six months","five years","the lifetime of the product"],correct:2,whyCorrect:"Cover is for free repairs following electrical and mechanical defects for a period of up to five years.",whyWrong:["Too short.","Too short.","Correct.","Not how the Key Facts describe the term."],sources:[h(6,"Extended warranties","90–91")],examStyle:!0}),U({id:"q-do-two",chapter:6,lo:"1.1",conceptIds:["do-cover"],factIds:["l-do-two-covers"],difficulty:3,kind:"which-correct",cognitive:"understanding",stem:"Directors’ and officers’ insurance in IF2 has two elements. Which pairing is correct?",options:["First-party repair of the company’s plant, and products liability for goods sold","Cover for directors personally when they cannot claim from the company, and cover for the company where it may indemnify them","Employers’ liability for staff, and public liability for visitors","Occurrence cover only, with no claims-made wording"],correct:1,whyCorrect:"D&O: personal capacity of directors/officers, plus company reimbursement where the company may indemnify them. Basis of cover is claims-made.",whyWrong:["Those are property / products.","Correct.","EL and PL.","D&O is claims-made."],sources:[h(6,"Standard policy cover","84")],examStyle:!0})],Rl={"m-compulsory":"The specimen exception is a SORN to the DVLA. A garage or a private driveway is not that exception.","m-sorn-exam":"The specimen exception is a SORN to the DVLA. A garage or a private driveway is not that exception.","m-rta-scope":"RTA only is the legal minimum on a road or public place. Injury is unlimited; third-party property is not.","m-four-levels":"The exam lives on the ladder: RTA only, TPO, TPFT, comprehensive. Injury is unlimited at every rung; third-party property damage is not.","m-rta-tppd":"Injury is unlimited. Third-party property damage on RTA only is not — private car is £1.2 million.","m-tpo-extras":"TPO is not RTA-only. The usual extras are off-road, territorial limits, and £20 million TPPD for private cars.","m-tpft":"TPFT adds fire and theft of the insured car. It still does not pay accidental damage to that car.","m-comp":"Comprehensive is the step that adds accidental and malicious damage to the insured car.","h-pas-nature":"Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.","h-not-indemnity":"Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.","h-benefit-not-indemnity":"Personal accident pays a stated benefit on a contingency. That is not reimbursement of treatment.","pe-mdw":"Business interruption usually will not start without a valid material-damage claim. The building cover and the trading cover are different questions.","pe-bi-dims":"The indemnity period is how long BI reimburses the claim. It is not ‘until renewal’.","l-el-comp":"Ask three questions: who was hurt, was there property damage, and does the policy fire when the injury is caused or when the claim is made.","l-el-injury-only":"Who was hurt? An employee at work is employers’ liability. EL does not pay property claims.","l-el-rsi":"Who was hurt? A secretary’s RSI from working conditions is EL, not public liability or legal expenses.","l-pl":"Who was hurt? A guest or member of the public is public liability. An employee at work is not.","l-el-min-limit":"£5 million is the statutory EL floor. Insurers have written £10 million in practice. That is not public liability’s usual occurrence limit.","l-pl-exclusions":"Public liability is an open policy. The exclusions send the claim to someone else’s class.","l-el-occurrence":"When does the policy fire? EL cares when the injury was caused, not when someone later notifies.","l-claims-made":"When does the policy fire? Claims-made cares when the claim is made, not when the injury was caused.","l-pi-claims":"When does the policy fire? Professional indemnity is always claims-made.","l-ew":"The buyer paid for extra time after the maker’s guarantee. That is not products liability.","l-ew-term":"The buyer paid for extra time after the maker’s guarantee. That is not products liability.","l-products":"Products is injury or damage from goods supplied. It is not the buyer’s extended warranty."};function bf(e,n){return e.kind==="exclusion"?"trap":e.kind==="distinction"||e.kind==="example"?"why":n===0?"open":"fact"}function Ol(e){return e.replace(/\[\[(.+?)\]\]/g,"$1")}function mu(e,n){const t=n.replace(/\s+is\b.*/i,"").replace(/\s+[—–:].*/,"").trim();return t&&t.length<=42?t:e.replace(/-/g," ")}function kf(e,n){var o;const t=[],i=new Set,r=(s,a,l)=>{const c=`${s}::${a.slice(0,80)}`;i.has(c)||(i.add(c),t.push({title:s,body:a,sources:l}))};for(const s of e)if(s.kind==="exclusion"&&r("Exclusion",Ol(s.claim),s.sources),s.kind==="distinction"&&r("Easy mix-up",Ol(s.claim),s.sources),s.kind==="exclusion"||s.kind==="distinction")for(const a of s.confusedWith??[]){const l=mu(a,n[a]??a);r(`Not ${l}`,((o=s.extra)==null?void 0:o.trim())||`${s.title} is kept distinct from ${l}.`,s.sources)}return t.slice(0,3)}function yu(e,n,t){const i=new Set(n.map(o=>o.id)),r=new Set(n.map(o=>o.conceptId));if(i.has("m-four-levels")||r.has("motor-cover-levels"))return{caption:"Private motor cover compared (IF2 study text / key facts)",headers:["Level","Own vehicle","Third party injury","Third party property (private car)"],rows:[["RTA only","None","Unlimited","£1.2 million (minimum)"],["TPO","None","Unlimited","Usually £20 million"],["TPFT","Fire, lightning, explosion, theft","Unlimited","Usually £20 million"],["Comprehensive","Accidental & malicious damage (‘all risks’ of own damage, with exclusions)","Unlimited","Usually £20 million"]]};if(i.has("l-el-occurrence")||i.has("l-claims-made")||i.has("l-pi-claims")||i.has("l-employee-def"))return{caption:"When the policy fires (IF2 2026 Key Facts ch.6)",headers:["Trigger","Typical classes","What has to happen in the period"],rows:[["Occurrence","Employers’ liability (and injury/damage ‘caused’ / happening in the period)","The injury or disease is caused then — not when a claim is later notified"],["Claims-made","D&O, professional indemnity, pension-fund trustees","The claim is made / notified then, subject to retroactive dates and discovery extensions"]]};if(i.has("l-pl-exclusions"))return{caption:"Public liability is an open policy: the exclusions do the work (Key Facts ch.6)",headers:["PL exclusion","Usually someone else’s class"],rows:[["Injury to employees","Employers’ liability"],["Product liability","Products (often bought as a PL extension)"],["Professional negligence","Professional indemnity"],["Motor vehicles / vessels and craft","Motor (and equivalent craft covers)"]]};if(e===6&&(t===1||r.has("el-cover")||r.has("pl-cover")||r.has("products-cover")||r.has("pi-cover")||r.has("do-cover")))return{caption:"Liability family — who, what, which trigger (IF2 2026 Key Facts ch.6)",headers:["Class","Who is hurt / who sues","Property damage?","Trigger"],rows:[["Employers’ liability","Employees (contract of service or apprenticeship)","No — injury/disease only","Occurrence (caused during the period)"],["Public liability","Third parties, not employees","Yes, plus consequential loss from that damage","Happening during the period; open policy"],["Products liability","Customers and others, from goods supplied","Yes (injury and property)","Injury/damage during the period; yearly aggregate"],["Professional indemnity","Clients / the public, from professional duty","Injury, damage or financial loss from the advice","Always claims-made"],["D&O","Directors personally, and the company where it may indemnify them","Bodily injury and property damage are typical exclusions","Claims-made"],["Trustees’ indemnity","Trustees, for personal liability / wrongful acts","Injury and third-party property are other classes","Claims-made (pension trustees)"],["Extended warranty","The buyer, after the maker’s guarantee","First-party repair/replacement — not products liability","Time extension of the 12-month guarantee, often up to five years"]]};if(r.has("extended-warranty")||i.has("l-ew")||i.has("l-ew-term"))return{caption:"Buyer’s defect cover is not the manufacturer’s liability (Key Facts / specimen)",headers:["Situation","Class"],rows:[["Dishwasher/TV defect after the original guarantee, buyer paid for extra cover","Extended warranty"],["Injury or property damage caused by products","Products liability (often a public liability extension)"],["Household contents ‘all risks’ of possessions","Not a substitute for the maker’s guarantee in the specimen items"]]};if(i.has("h-pas-nature")||i.has("h-not-indemnity")||i.has("h-benefit-not-indemnity")||r.has("health-pas"))return{caption:"Benefit versus indemnity (IF2 2026 Key Facts ch.2)",headers:["Product","What it pays","Do not confuse with"],rows:[["Personal accident / sickness","A stated benefit on a contingency — not a contract of indemnity","Medical expenses (reimburses treatment)"],["Weekly disablement","Capped around normal earnings so there is no inducement to stay off work","An excess (a franchise is a threshold, not a deduction)"]]};if(i.has("pe-mdw")||e===5&&(r.has("pec-bi")||i.has("pe-bi-dims")))return{caption:"Material damage versus the trading loss (IF2 2026 Key Facts ch.5)",headers:["Class","What it pays","Exam latch"],rows:[["Property / material damage","Direct physical loss","The BI policy usually will not start without a valid MD claim"],["Business interruption","Loss of income / increased cost of working for the indemnity period","Indemnity period = how long the policy reimburses the claim, not ‘until renewal’"],["Legal expenses","Legal costs of specified disputes","Not public liability disputes"]]}}function xf(e){return an[e].hold}function Cf(e){const n=[],t=/\[\[(.+?)\]\]/g;let i;for(;i=t.exec(e);)n.push(i[1]);return n}function _l(e,n){if(Rl[e.id])return Rl[e.id];const t=(e.confusedWith??[]).map(i=>mu(i,n[i]??i));if(e.kind==="distinction")return t.length?`Hold the difference: ${e.title} is not ${t.join(" / ")}.`:"Hold the difference this card is for. The sourced line is the latch.";if(e.kind==="exclusion")return t.length?`This is an exclusion. The exam will offer ${t.join(" / ")} instead.`:"This is an exclusion — usually someone else’s class.";if(e.kind==="limit"){const i=Cf(e.claim)[0];return i?`One figure to keep: ${i}. Neighbouring classes use other numbers.`:an[e.chapter].hold}return t.length?`Easy mix-up with ${t.join(" / ")}. Keep this card on its own.`:an[e.chapter].hold}function If(e,n){return e!==6||n!==1?[]:[{title:"Guest vs employee",body:"Public liability excludes injury to employees. A hotel guest is PL. A waiter injured arising out of and in the course of employment is EL.",sources:[{kind:"key-facts",chapter:6,section:"Exclusions",page:"80",locator:"IF2 2026 Key Facts ch.6 p.80 — Exclusions"},{kind:"key-facts",chapter:6,section:"Standard policy cover",page:"76–78",locator:"IF2 2026 Key Facts ch.6 p.76–78 — Standard policy cover"}]},{title:"£5 million vs £10 million",body:"The 1998 Regulations set a statutory EL minimum of £5 million. Insurers have provided £10 million in practice since January 1995. That is not the same figure as public liability’s usual £2 million (up to £10 million not uncommon) occurrence limit.",sources:[{kind:"key-facts",chapter:6,section:"Employers’ liability insurance",page:"73",locator:"IF2 2026 Key Facts ch.6 p.73 — Employers’ liability insurance"},{kind:"key-facts",chapter:6,section:"Limit of indemnity",page:"80",locator:"IF2 2026 Key Facts ch.6 p.80 — Limit of indemnity"}]}]}const Tf=[{chapter:1,title:"Motor insurance",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:5,pdfPage:7,text:`1
Motor insurance
Private motor insurance
In terms of the number of people affected, private motor
insurance is the most significant compulsory insurance in the
UK. It is illegal to drive, or be in charge of, a vehicle on a
public road unless an insurance policy is in force to cover
legal liability for injury to others and damage to their property.
Standard policy cover
Road Traffic Act only
As its name implies, Road Traffic Act only (RTA only) is the
minimum cover required to comply with the Road Traffic Act
1988 as amended by later legislation.
RTA only cover relates to the use of a motor vehicle on a
road or any public place and provides:
• indemnity for bodily injury or death caused to third parties,
including passengers: unlimited in amount;
• indemnity for loss of or damage to property belonging to
third parties: limited to £1.2 million;
• indemnity for claimants’ costs and the expenses of
handling the claim; and
• cover for charges for any emergency medical treatment
and hospital charges arising out of the use of the vehicle.`},{printedPage:6,pdfPage:8,text:`The amount of these charges is specified in the RTA, and
the policy must provide for their payment when demanded.
In addition, in order to comply with the Third EU Motor
Insurance Directive, all policies must also provide:
• either the minimum cover required by the EU country
being visited or the minimum cover required by the country
where the vehicle is usually kept (RTA only cover in the
UK), whichever is greater; and
• cover for liability to persons in the employment of the
insured when travelling as passengers in the course of
employment, but not the driver. Any legal liability that
the employer has towards the driver is covered under an
employers’ liability policy.
Third party only (TPO)
In addition to providing RTA cover, third party only (TPO)
cover usually provides the following:
• Cover for vehicles while not on a road or in a public place
but remaining within the territorial limits.
• A limit of £20 million for third party property damage for
private car policies.
• Indemnity for accidents which occur whilst the insured is
driving a car (some also include a motorcycle) that does
not belong to them.
• Indemnity to anyone who is driving or using the vehicle
on the insured’s order or permission unless driving is
restricted to named individuals.
• Indemnity to passengers, employers or business partners,
should they be held responsible for an accident.
• Legal costs incurred in the defence of a claim.
• Limited cover for legal representation costs following a
prosecution for a motoring offence.`},{printedPage:7,pdfPage:9,text:`Third party, fire and theft (TPFT)
In addition to third party only cover just described, third
party, fire and theft (TPFT) cover includes the cost of
repairs or compensation to the insured if their vehicle is:
• damaged by fire, lightning or explosion;
• damaged either during attempted theft or while it is stolen
(some policies include taking without consent); or
• stolen and not recovered.
Comprehensive
The most common form of motor insurance cover is
comprehensive cover, offering the widest possible protection.
In addition to the cover granted by the third party, fire
and theft policy, the Comprehensive policy covers other
accidental and malicious damage to the insured’s car.
The cover granted is on the same basis as an ‘all risks’
policy, in that all loss or damage, however it occurs, is
covered subject to specific exclusions. These are:
• loss or damage to accessories and spare parts, unless on
the vehicle or in the insured’s garage;
• wear and tear and depreciation;
• loss of use (although some insurers now grant a limited
form of loss of use cover);
• mechanical and electrical failure or breakdown (although,
if an unexpected mechanical failure causes a collision –
say, the brakes fail – the resulting damage to the vehicle is
covered); and
• damage to tyres caused by road punctures or bursts.
1: Motor insurance 7`},{printedPage:8,pdfPage:10,text:`Comprehensive cover also typically includes the following
benefits:
• Personal accident cover.
• Medical expenses.
• Personal belongings and clothing.
No claims discount (NCD)
All insurers offer the incentive of a no claims discount
(NCD) as standard in their policy wordings. The terms ‘no
claims discount’ and ‘no claims bonus’ are interchangeable.
Rates vary considerably between insurers, but it would not be
unusual to find discounts of 12% for one year free of claims,
up 50% + for five years or more free of claims.
Uninsured driver promise
A number of insurers now offer cover under their
comprehensive policies for where the insured’s vehicle is
involved in an accident with a third party’s vehicle which
does not have motor insurance. Such accidents can often
involve a lengthy claim process and considerable expense.
This extension will usually protect the insured’s no claim
discount and from the application of their policy excess –
provided they can provide full details of the third party vehicle
involved. It will not apply to ‘hit and run’ accidents where the
third party cannot be traced and the required details are not
available.
Optional extensions
Breakage of glass
Cover for breakage of glass is included as standard in
a comprehensive policy. It may also be added to a non-
comprehensive policy, subject to an additional premium. The`},{printedPage:9,pdfPage:11,text:`important point about this cover is that a claim payment made
under this section alone does not affect the insured’s NCD.
Personal belongings and clothing
Cover for personal belongings and clothing is included
as standard in a comprehensive policy, but only for a
fairly modest sum. To increase the amount covered an
additional premium is charged. Many insurers now offer
specific ‘add-ons’ to cover a range of items, from child seats
and wheelchairs to entertainment and satellite navigation
systems.
Young additional drivers
A young driver (say, under 25), who is truly an occasional
additional driver to the main driver under the policy, may
be included under the main driver’s policy, subject to an
additional premium. If a young driver is the main driver (or
one of the main drivers) but does not own the car, the
insurer may grant cover, but will rate the risk on the basis
of the young driver’s age and experience rather than that of
the owner.
Loss of use
Although loss of use is a specific exclusion to the
comprehensive policy, some insurers are prepared to offer
such cover, limited to an amount per day and subject to an
additional premium. Most insurers will pay for a replacement
vehicle for a limited period while the insured’s vehicle is off
the road.
Personal accident benefits
This extension provides personal accident benefits in addition
to those provided as standard in the comprehensive policy.
For example, the extension may offer increased capital
benefits (i.e. lump sums) or the addition of weekly benefits
1: Motor insurance 9`},{printedPage:10,pdfPage:12,text:`for the insured or their spouse. This is now sometimes further
extended to include rehabilitation benefits such as specialist
medical care to help insureds return to health following injury,
e.g. physiotherapy, MRI scans and chiropractic treatments.
Foreign use
If a UK insured wishes to have the same cover under their
policy when driving abroad, they must notify their insurers
of the intention to drive their vehicle abroad. They must
ask for their policy to be extended to cover continental
use, which will often be subject to an additional premium.
However, some insurers provide free continental cover for up
to 30 days in any one period of insurance. Many insurers
issue a ‘green card’ for such trips. This is a recognised
international certificate and is always needed for travel in
foreign countries, with the exception of the following: the
EU member states, Croatia, Iceland, Norway, Switzerland,
Liechtenstein, Luxembourg and Andorra.
On the 30 June 2021, the European Commission announced
that the UK would be able to participate in the Green
Card Free Circulation Area (GCFA), which comprises all
30 European Economic Area (EEA) countries as well as
Andorra, Bosnia & Herzegovina, Serbia and Switzerland.
This took effect on the 2 August 2021 and will remove
the requirement for green cards to be issued for travel
within these countries. Following the MIB’s recommendation,
many insurers continued to issue green cards up until the
2 September 2021.
Elections
Motor vehicles are sometimes used in connection with
elections, which most insurers may not regard as normal
‘social, domestic and pleasure’ use. Insurers do not usually
charge an additional premium for such an extension, except
in the case of parliamentary elections.`},{printedPage:11,pdfPage:13,text:`Racing, competitions, rallies and trials
Events, such as road safety rallies, may be covered at
no additional charge. However, those involving racing are
covered by only a few specialist insurers, subject to an
additional premium.
Caravans and trailers
Insurers generally provide third party cover for caravans or
trailers while they are attached to the insured vehicle. If wider
cover is required, caravans are insured under separate non-
motor policies. Comprehensive cover for a trailer may be
provided as an extension to a private motor policy.
Breakdown cover
This extension is subject to an additional premium.
Motor legal expenses
This provides cover following a motor accident or incident
where the insured is not to blame. It provides cover up to
say, £100,000 to pay lawyers’ costs in assisting a claim
for financial losses (such as insured’s excess and travel
expenses) or compensation for personal injury from the
person who is responsible.
Joint policies
Insurers are occasionally asked to issue policies in joint
names, e.g. each spouse. Such an extension may or may
not be subject to an additional premium, depending on the
cover required and whether each of the joint insureds wishes
to have the benefit of the ‘driving other cars’ cover. This
benefit would usually either be deleted or stated to apply to
only one of the joint insured. Cover provides for the situation
where one of the joint insureds may have a claim against
the other. Effectively the policy operates as if each had their
1: Motor insurance 11`},{printedPage:12,pdfPage:14,text:`own policy and treats the other as a third party. This could
happen where one of the joint insureds is at fault and causes
an accident injuring the other. A claim can be made against
the negligent party.
Multi car policies
It is now common for households to have more than one
vehicle. A number of insurers offer a multi car policy, which
in some cases can include up to 5 or 6 vehicles. However,
they have to be registered at the same address. The policy
covers will be comprehensive or third party, fire and theft
as appropriate. There is usually a premium saving and most
insurers will guarantee separate no claim discounts for each
vehicle.
Misfuelling
Any loss or damage caused directly or indirectly as a result of
accidentally filling the insured vehicle with the incorrect type
of fuel.
Exclusions
In addition to the specific exclusions already discussed, there
are a number of general exclusions applicable to all sections
of the policy, including:
• driving by unlicensed drivers;
• use of the insured vehicle outside that permitted by the
policy;
• contractual liability;
• war risks;
• radioactive contamination and explosive nuclear assembly;
• riot and civil commotion in Northern Ireland, for own
damage cover;
• sonic bangs (i.e. pressure waves from sonic/supersonic
aircraft or other aerial device); and`},{printedPage:13,pdfPage:15,text:`• pollution and contamination unless arising from a single
identifiable event.
Motorcycle insurance
In insurance, the term ‘motorcycle’ includes any kind of cycle
propelled mechanically, including mopeds. Consequently,
there is a wide range of risk. Many of the considerations
for motorcycles are the same as for motor vehicles, both
being subject to the Road Traffic Act 1988. The options of the
different levels of cover are also the same and need not be
repeated here.
The single method of insuring motorcycles is specified
motorcycle insurance, where the driver is insured for a
particular motorcycle.
Standard policy cover
The format of the comprehensive motorcycle policy is much
the same as that of the private motor policy. Therefore, here
we only need to identify the main differences:
• the accidental damage section follows that for private
vehicles, except that it does not cover theft of accessories
or spare parts unless the motorcycle itself is stolen at the
same time;
• the liability section generally indemnifies the insured (or
their personal representatives in the event of the insured’s
death), others permitted to drive the motorcycle and
users of the motorcycle for social domestic and pleasure
purposes; and
• there are no personal accident benefits and no cover for
medical expenses (beyond emergency treatment fees) or
personal effects.
1: Motor insurance 13`},{printedPage:14,pdfPage:16,text:`Optional extensions
There are a number of optional extensions available, subject
to payment of additional premium:
• Trailers;
• Driving other cycles;
• More than one cycle insured; and
• Invalid carriages/mobility vehicles.
Commercial motor insurance
The main types of commercial vehicles are as follows:
• Goods-carrying vehicles.
• Passenger-carrying vehicles.
• Agricultural and forestry vehicles.
• Vehicles of special construction.
Commercial motor insurance is primarily concerned with
the risks which attach to the vehicles themselves while they
are being driven, left parked or being carried by sea or air
between different parts of the UK. Such cover does not
extend to any goods being carried by the vehicles: this
forms the subject of a separate class of insurance, known
as goods in transit.
Standard policy cover
Most insurers use the same standard policy wording for
all commercial motor insurances, irrespective of the type of
vehicle to be covered. This standard cover is then modified
as and where necessary, depending on the vehicle being
insured. Some insurers issue separate and specific policies
in respect of agricultural and forestry vehicles and certain
‘special types’. However, here we limit our discussion to the
standard commercial motor policy cover.`},{printedPage:15,pdfPage:17,text:`Third party liability
Private motor cover and commercial motor cover must
provide unlimited indemnity for death or bodily injury to third
parties. Whereas the private motor policy provides a £20
million limit of indemnity for third party property damage, the
commercial motor policy usually has a limit of, say, £5 million.
This may be more restricted for certain risks such as general
haulage, where the standard limit offered may be as low
as £1.2 million. Most insurers are prepared to increase the
limits, subject to an additional premium.
You should also be aware of the following points regarding
third party liability:
Loading or
unloading
Cover in respect of third party liabilities also
applies to accidents occurring during loading or
unloading the vehicle. In the case of the driver or
attendant this extends beyond the boundaries of
the carriageway.
Indemnity to
driver
Generally, anyone may drive the vehicle on the
order or with the permission of the insured.
Indemnity
to user
The insured may allow someone to use the vehicle
for social, domestic and/or pleasure purposes
(though they may not necessarily actually be
driving).
Indemnity to
passengers
This covers the liability of passengers for their
negligent acts.
Legal
expenses
As with private motor cover, commercial motor
insurance provides cover for certain legal costs.
Loss of or damage to the vehicle
This section covers any loss of or damage to the vehicle
and to its spare parts and accessories while they are on the
vehicle. In contrast to private motor cover, there is no cover
for spare parts and accessories while they are detached from
the vehicle.
1: Motor insurance 15`},{printedPage:16,pdfPage:18,text:`Trailers
Insurers cover the towing of trailers under the third party
liability section of the policy.
Optional extensions
Common optional extensions are identified below:
• third party property damage;
• medical expenses; personal accident benefits;
• personal belongings and clothing;
• windscreen/glass cover;
• indemnity to hirers;
• indemnity to principal;
• carnivals;
• sheets and ropes etc; and
• loss of use.
Limitations
Apart from the specific exclusions which relate to certain
sections within the policy, the commercial motor policy
incorporates a number of general exclusions. These
limitations are basically the same as those contained within
the private motor policy.
However, the exclusion of ‘use of the insured vehicle’ is
slightly different from that given in the private motor policy. It
states that the insurer is not liable if the vehicle is:
• used other than in accordance with the use stipulated in
the policy schedule; or
• engaged in racing, pace-making, reliability trials or speed
testing.`}]},{chapter:2,title:"Health insurance",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:17,pdfPage:19,text:`2
Health insurance
Personal accident and sickness
insurance
Personal accident and sickness insurance is a relatively
simple form of cover. As the name suggests, the sum insured
is paid if the insured suffers an accident or is off work due to
sickness. Such insurance is taken out on an annual basis.
The occupation of the proposer is the main rating factor
for the personal accident element, but not for sickness. The
general practice among insurers is to group occupation into
four main classes, imposing premiums according to the level
of accident/health risk involved.
A personal accident and sickness policy is not a contract
of indemnity: under a contract of indemnity, the amount
recoverable is measured by the extent of the insured’s
financial loss. Rather, a personal accident and sickness
policy is a benefit policy, i.e. a contract to pay a sum of
money in the event of a certain contingency, irrespective of
whether the insured sustains a direct financial loss. However,
cover is often available in ‘units’ (i.e. defined levels of cover),
the proposer being able to purchase as many units as
desired within financial and earning capabilities.
Although this is a benefit policy, insurers try to ensure
that any weekly benefit for disablement represents no more
than normal earnings. The reason for this is not that there`},{printedPage:18,pdfPage:20,text:`is any assumption that the insured will deliberately injure
themselves to obtain benefit, but that in the event of a
genuine claim, there may be an inducement to remain off
work if weekly benefits are too high. This is why insurers
ask a specific question on their proposal forms requiring the
proposer to declare any other policies that are in force. In this
way they can check that overall benefits from all policies are
set at realistic levels.
This type of insurance is available as a standalone policy, but
is often purchased as an ‘add-on’ to travel insurance, motor
insurance and household insurance.
Standard policy cover
Accident cover
The accident section of a standard personal accident and
sickness policy provides compensation in the event of
accidental death or bodily injury. But what do we mean by
the term ‘accidental’? There is no single standard definition,
but there are key elements in most insurers’ wordings. The
event must arise from an accident, in other words from an
identifiable cause, and must be fortuitous. There is a time
limit from the date of the accident to the specified event.
Some insurers have definitions that specify that the bodily
injury must result in death or disablement, independently of
any other cause.
Capital sums (i.e. lump sums) are paid in the event of death
or certain specified injuries. The policy usually provides a
weekly benefit of up to 104 weeks or compensation if the
insured is temporarily totally disabled due to an accident.
Some insurers offer reduced weekly benefits if the insured
is temporarily partially disabled. In the event of permanent
total disablement, either a capital sum or, less commonly, a
ten-year annuity is paid.`},{printedPage:19,pdfPage:21,text:`Sickness cover
The sickness section of a standard personal accident and
sickness policy provides a weekly benefit of up to 104
weeks if the insured is temporarily and totally disabled
from engaging in their usual occupation due to sickness or
disease.
The sickness benefit is usually subject to a time franchise,
which is generally seven days. This means that if the insured
is sick for less than seven days, no payment is made.
However, if sickness continues beyond seven days, the claim
covers the entire period of sickness, including the initial
seven days. Franchises operate as thresholds to determine
whether a claim is payable. Unlike excesses, they are not
simply deducted from a claim settlement figure.
Cover generally excludes sickness contracted within the
first 21 days of the commencement of the policy period.
This ensures that the insurer is only liable for sickness or
disease contracted after commencement of the policy and
not for sickness or disease that was contracted prior to
commencement, but has subsequently developed.
Policy benefits
Generally, many companies offer a range of benefit levels
(e.g. Silver, Gold, Platinum) on personal accident and
sickness policies which cover the following:
Death
Insurers often stipulate that death must occur within twelve
months of the event giving rise to the claim. Capital benefits
can start from £20,000 for a nominal monthly premium.
Total loss of (sight in) one or both eyes
Loss of eyes includes total and irrecoverable loss of sight,
so that claims are valid if vision is totally impaired in one
or both eyes. A typical capital sum payable is £20,000 with
2: Health insurance 19`},{printedPage:20,pdfPage:22,text:`a premium scale for increases in this benefit provided by
most insurers. The same sum is usually payable regardless
of whether sight is lost in one or both eyes. However, some
companies now offer an increased capital benefit where sight
in both eyes is affected.
Total loss of one or both limbs
Benefits are usually payable only if the event occurs within
a specified period (usually 12 or 24 months) of the accident
causing the injury. Some insurers include the loss of use of
limbs as standard. A typical capital sum payable is £20,000.
The benefit is a fixed sum, regardless of how many limbs
are lost. However, some companies now offer an increased
capital benefit where the use of both limbs has been lost.
Permanent total disablement
Compensation is usually in the form of a capital sum of, say,
£20,000 or more. Compensation may not be payable until
12 or 24 months after the accident, since it may take this
length of time to determine whether the disablement is both
permanent and total.
Permanent partial disablement
This is not a standard element of cover, but when insurers
provide this benefit, they do so on the basis of the loss of
specified parts of limbs, for example toes or fingers. The
percentage of the capital sum paid for such disabilities is on
a sliding scale and represents a smaller percentage than that
paid for the loss of an entire limb.
Temporary total disablement
This covers temporary total disablement from engaging
in one’s usual occupation due to accident or sickness.
Compensation is usually in the form of a weekly benefit,
e.g. £200 per week for a maximum of 104 weeks. Some
companies will offer higher limits, but for a lesser period of
52 weeks.`},{printedPage:21,pdfPage:23,text:`Temporary partial disablement
Temporary partial disablement means temporary disablement
that prevents the insured person from attending to a
substantial part of their normal business due to accident (this
does not apply to sickness). Compensation is in the form of a
weekly benefit of, say, at least £100 per week. Traditionally
this figure has been set at 40% of the temporary total
disablement amount, though there is nothing to prevent a
proposer requesting a different amount if this can be justified.
Medical expenses
This covers medical expenses necessarily incurred for
treatment following an accident. Medical expenses may be
defined as the cost of medical, surgical or other remedial
attention, treatment or appliances given or prescribed by a
qualified member of the medical profession and all hospital,
nursing home and ambulance charges.
Optional extensions
An additional benefit provided by some insurers is legal
expenses cover to pursue actions against negligent third
parties following bodily injury. Legal expenses are covered up
to, say, £15,000. Cover is very narrow since it only relates to
incidents involving bodily injury.
Limitations
Geographical limits
Cover for accidents is usually worldwide, though some
policies will not pay benefits if the insured resides outside
the UK for more than 180 consecutive days. Sickness cover
is generally restricted to the UK, Europe, USA, Canada,
Australia and New Zealand. Sickness cover may be extended
beyond these limits, subject to an additional premium.
2: Health insurance 21`},{printedPage:22,pdfPage:24,text:`Age limits
Specified age ranges apply to the inception of cover, the
most common being 16–70 years in respect of accident cover
and 16–60 years in respect of sickness cover. However, once
it has accepted a risk, an insurer will often extend these limits
for existing policyholders.
Family personal accident policies may also include children,
with age limits ranging from 6 months to 16 years. However,
the level of benefits provided is significantly less than those
provided for adults. Some policies will increase the age limit
for children up to age 23, but only if the ‘child’ is living
with, or is dependent on, the main policyholder when in full
time education.
Exclusions
Typical exclusions are:
• the insured being under the influence of, or being affected
by, alcohol or drugs, unless under medical supervision;
• self-inflicted injury or disease;
• physical defects or infirmity which existed prior to an
accident;
• the insured engaging in certain sports and pastimes,
although some insurers will cover them for an additional
premium, e.g. aviation (other than air travel in a fully
licensed passenger-carrying aircraft as a passenger),
motor cycling, polo, racing on horseback or on wheels,
winter sports or mountaineering involving the use of ropes
or guides;
• childbirth, pregnancy, venereal disease or AIDS;
• war risks; and
• sickness occurring within 21 days of the start of sickness
cover.`},{printedPage:23,pdfPage:25,text:`Medical expenses insurance
Medical expenses insurance (also known as health care
insurance) provides cover for individuals who seek private
medical treatment outside the NHS when they are ill. It gives
the individual greater choice of specialist consultant, hospital
and the timing of the treatment. It is often arranged on a
group basis by an employer on behalf of all employees
or certain groups of employees, in which case it is an
employment benefit.
Standard policy cover
Inpatients’ cover provides the following:
Hospital
charges
These include costs such as theatre fees, surgical
dressings and consultations.
Specialist
fees
These include surgeons’ and anaesthetists’ fees.
Additional
costs
These include ambulance fees and nursing fees.
Rather than optional extensions being available to add to
a standard policy, there is instead a range of standalone
policies offering differing levels of cover.
Usually, policies exclude payments that relate to medical
conditions for which the individual has received treatment
within the five years before applying to the insurer. Also, such
policies do not provide cover for long-term residential care.
2: Health insurance 23`},{printedPage:24,pdfPage:26,text:""}]},{chapter:3,title:"Package policies",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:25,pdfPage:27,text:`3
Package policies
Introduction
Many forms of insurance are required by both private
individuals and businesses and package policies include
within one policy document all the covers required by a
particular type of policyholder, whether an individual or a
business.
Insurers tend to produce package policies where there is
sufficient homogeneity of risks. Homogeneity of risks refers
to the situation where many risks share similar characteristics
and follow similar trends. As more and more risks display
similar characteristics, future claims costs become more
predictable. Thus, it makes administrative sense to issue
standardised wordings and charge a single premium for all
classes. Given the predictability and the savings created it
is not difficult to see why insurers favour this type of policy.
The savings are passed on in the form of reduced premium
levels, so for those risks meeting the acceptance criteria,
this acts as a great incentive for prospective policyholders to
insure in this way.`},{printedPage:26,pdfPage:28,text:`Household insurance
Probably the most valuable physical asset an individual will
own is their home, both building and contents. Those living
in rented accommodation will generally possess furniture and
other belongings that are exposed to risks such as fire and
theft. Therefore, there is a great need for insurance for such
assets. To cover such risks, household policies are issued,
covering buildings and/or contents against a wide range of
perils, including fire, additional perils and theft. Valuables and
personal effects are also covered, as is public liability, and a
number of optional extensions are available.
There are generally two options for settlement of household
claims where the item concerned is irreparable, namely the
following:
Indemnity (or market
value)
A deduction is made for wear and tear.
The amount paid is that required to
replace the item with a replacement of
the same age and in the same condition.
Nowadays this option is rarely chosen.
Some insurers do not even offer it as
an option.
New for old (or
reinstatement)
The full cost of replacing the item as
new is paid. Most insurers make a
deduction for wear and tear in certain
circumstances: such as claims for clothing
and household linen. A deduction may
also be made if the sum insured is
inadequate or for property over a certain
age (such as more than five years-old).
The sum insured on the buildings section of a household
policy should represent the rebuilding cost at the time the
rebuilding is complete.
These policies are often subject to either an overall excess
or to differing levels of excess for the different contingencies
covered.`},{printedPage:27,pdfPage:29,text:`Building insurance
Buildings, in respect of household insurance, may be defined
as the main structure of the private dwelling (house etc.)
and this includes garages, sheds, greenhouses and other
outbuildings. Swimming pools and tennis courts are also
included as are walls, gates, fences and paths.
The following cover is generally available in respect of
buildings:
Fire, lightning, explosion and earthquake
This cover is self-explanatory.
Riot, civil commotion, strikes, labour or
political disturbances, malicious damage or
vandalism
Although wordings vary, cover generally specifically excludes
loss or damage occurring while the building is unfurnished
or unoccupied for more than 30 or 60 days in any one
insurance period. Cover in respect of malicious damage is
usually subject to both an excess and to the police being
notified of the incident.
Storm or flood
Cover under this heading specifically excludes damage
caused by frost, subsidence, ground heave or landslip and
damage to gates, fences or hedges. Storm or flood cover is
always subject to an excess.
Falling trees or branches
Cover excludes damage to walls, gates, fences or hedges.
3: Package policies 27`},{printedPage:28,pdfPage:30,text:`Escape of water
This covers the bursting (e.g. as a result of freezing) or
overflowing of water tanks, apparatus or pipes, and includes
any fixed domestic water or heating installations, washing
machines and other domestic equipment. Cover specifically
excludes damage while the building is unfurnished or
unoccupied for more than a certain period, commonly 30
or 60 days in any one insurance period. An excess always
applies.
Escape of oil
Damage caused by escape of oil from any fixed oil-fired
heating system is covered. The unfurnished/unoccupancy
exclusion applies.
Theft or attempted theft
Cover is usually excluded while the premises are left
unfurnished or unoccupied for more than 30 or 60 days in
any one insurance period. There is no definition or other
restriction on the use of the term ‘theft’, so that insurers
cover theft as defined in the Theft Act 1968. The Act
states that a person is guilty of theft if they dishonestly
appropriate property belonging to another with the intention
of permanently depriving the owner of it.
Impact/collision
Cover is for impact or collision with aircraft or other aerial
devices, or with articles dropped therefrom, road vehicles, or
animals. There may be an excess imposed for the insured’s
or their family’s vehicles or animals. Damage caused by pets
is usually excluded.`},{printedPage:29,pdfPage:31,text:`Subsidence, ground heave or landslip
A substantial excess of, for example £1,000 or more, or
possibly a percentage of the sum insured is always imposed.
Breakage or collapse of television or radio
receiving aerials, aerial fittings and masts
This covers damage to the buildings caused by the collapse
of the aerials, but not damage to the aerial itself, which is
normally covered under the ‘contents’ section.
Accidental damage to drains, pipes, cables or
underground pipes
This covers accidental damage to water, oil, gas, sewage and
drainpipes, underground telephone, television and electricity
cables serving the building.
Accidental breakage of glass and sanitary
fixtures
This covers accidental breakage of fixed glass in windows,
doors, fanlights and skylights or greenhouses, conservatories
and verandas forming part of the building. It also covers
accidental breakage of fixed wash basins, cisterns, baths and
other sanitary fittings. The unfurnished/unoccupied exclusion
applies.
Legal fees, architects’ and surveyors’ fees,
cost of debris removal
This covers reasonable legal fees and architects’ and
surveyors’ fees necessarily incurred in the reinstatement of
the building following loss or damage. The costs of demolition
or shoring up the building and debris removal are also
covered. Cover excludes any costs involved in preparing the
insured’s claim.
3: Package policies 29`},{printedPage:30,pdfPage:32,text:`Loss of rent
Cover is given in respect of ground rent (amounts payable
by a leaseholder to the owner of the freehold) for a
maximum period of two years and loss of rent for any part
of the premises not occupied by the insured which has
become uninhabitable. It also covers the reasonable cost
of alternative but similar accommodation while the premises
are uninhabitable as a result of an insured peril. A limit
of 10–15% of the buildings sum insured usually applies,
although some insurers will offer ‘reasonable accommodation
expenses’ taking all of the circumstances of the claim into
account, including the individual’s needs, the length of time
for which accommodation is needed and the alternative (and
comparable costs of) accommodation available locally.
Accidental damage extension
Many insurers offer an accidental damage extension to
the household policy, subject to a higher premium rate and
always subject to an excess of at least £100 and often more.
Such cover would include, for example, drilling through a
pipe, hammering a nail through an electric wire or putting a
foot through a ceiling.
Contents insurance
Contents, in respect of household insurance, may be defined
as household goods and personal effects belonging to the
insured or a family member living in the property. This
includes cash and stamps (not part of a stamp collection) up
to, say, £500 in total and any fixtures and fittings belonging to
the insured are also covered. The schedule attached to the
policy will usually show the applicable limits.
The perils covered under the contents section are basically
the same as those covered under the buildings sections,`},{printedPage:31,pdfPage:33,text:`although there are certain minor differences which should
be noted.
Limits
There are limits on single articles of value and some insurers
limit the total amount of valuables.
Automatic cover
As well as the optional extensions that relate to the
household policy as a whole, the following elements of cover
are usually included automatically within the contents section
and are not subject to any additional premium:
• Temporary removal.
• Clothing and personal effects.
• Accidental breakage.
• Loss of rent.
Optional extensions
As well as the automatic cover, the contents section may
be extended to include the following, usually subject to the
payment of an additional premium:
• Accidental damage to entertainment equipment.
• Accidental damage while in the course of removal.
Other non-automatic policy extensions include loss of oil
or metered water from a fixed domestic water or heating
installation or washing machine; cost of replacing door locks
following theft of keys; and temporary increases in sums
insured at certain times of the year, e.g. Christmas. An
extension covering and the personal effects of children while
away at university/college is also often offered.
3: Package policies 31`},{printedPage:32,pdfPage:34,text:`Specific exclusions
Typical exclusions are as follows:
• property more specifically insured under another policy;
• deeds, bonds, bills of exchange, promissory notes,
cheques, securities, documents and manuscripts;
• medals and coins, unless specifically insured;
• motor vehicles; and
• livestock (other than horses).
Legal liability: building and contents
All household policies include specific liability cover as part of
the basic cover, as follows.
Buildings This section includes liability incurred by the
insured as owner of the property and liability
incurred under the Defective Premises Act 1972
(or the Defective Premises (Northern Ireland)
Order 1975) for faults in property formerly owned
and occupied by the insured.
Contents This section protects the interest of the insured as:
• occupier, rather than owner, of the property.
i.e. it covers liability incurred as occupier of
the property or any other premises used for
temporary holiday accommodation;
• a private individual for personal liability, in other
words, the liability does not need to be linked to
the occupation of property; and
• as an employer of domestic employees.
Cover is for legal liability for accidental injury (which
includes death or disease) and accidental damage to material
property. Indemnity is to the insured and all family members
permanently residing in the property. Cover applies anywhere
in the UK, not just within the property. A limit of indemnity,`},{printedPage:33,pdfPage:35,text:`usually £2 million, applies to any one claim. For employers’
legal responsibilities the limit is usually at least £10 million.
Optional extensions
Personal possessions
With the personal possessions extension, items like personal
jewellery, watches, cameras, laptops and tablets which
are regularly taken out of the property, including possible
overseas visits, can be covered on an all risks basis. Usually
such cover is only available in conjunction with contents
cover. Insurers will insist upon a separate sum insured for
specified items above a certain sum (for example, £1,500),
but will be happy to cover unspecified items subject to a limit
for any one item.
Specific exclusions for the section as a whole are as follows:
• wear and tear, depreciation etc;
• insects or vermin;
• corrosion, rot, mildew, fungus or atmospheric conditions;
• any process of heating, dyeing, alteration or repair;
• mechanical or electrical breakdown or derangement;
• scratching, denting, faulty workmanship/materials;
• official confiscation or detention; and
• deeds, bonds, documents etc.
Money and credit cards
Money
The money extension provides a form of ‘all risks’ cover
that is much wider than that included under the contents
section. ‘Money’ usually covers cash, cheques, postal orders,
bankers’ drafts and postage stamps/certificates, premium
bonds, luncheon vouchers, gift tokens and travel tickets.
Cover relates to accidental loss of money and a limit of
3: Package policies 33`},{printedPage:34,pdfPage:36,text:`indemnity of between £200–£500 applies, with an excess
often around £100. Specific exclusions may apply, including:
• shortages due to error/omission; and
• losses not reported to the police within 24 hours.
Cover is provided for financial loss following loss or theft of a
credit card and its subsequent misuse. A standard condition
is that any loss is reported to the card issuer and to the police
within 24 hours of discovery. Credit cards usually include
cheque cards, cash cards and charge cards, as well as credit
cards. Some insurers offer additional services to the basic
cover, such as emergency cash (a temporary measure) and
a card registration scheme. A limit of liability, typically £500,
applies.
Bicycles
Bicycles can be covered under most household policies in
the market, but many policies will apply a general limit of
between £500–£1,000 per bicycle unless the value of each
is specified.
Freezer contents
Cover applies for the deterioration of freezer contents due
to a change in temperature (e.g. following a power failure) or
contamination as a result of accidental escape of refrigerant
or refrigerant fumes. Some insurers provide cover against a
change in temperature from any cause, such as electrical
breakdown, or the cost of hiring alternative freezer space.
A limit of indemnity of, say, £1,000 is set by some insurers,
while others require the insured to set their own limit.`},{printedPage:35,pdfPage:37,text:`Caravans
Most insurers provide cover for caravans under the following
three sections:
• Caravan and equipment.
• Clothing and personal effects.
• Liability.
Cover applies anywhere in the UK, usually with an extension
for up to 30, 60 or 90 days while in Europe, including
short sea transit. Some policies also provide cover for post-
accident and recovery expenses and the cost of getting the
family home.
Small craft
Cover is usually provided under four sections, namely:
• accidental loss or damage to craft, machinery and
equipment;
• personal effects;
• salvage charges; and
• liability to third parties and passengers: with a limit of
indemnity of, say, £1 million.
Sports equipment
Cover is available for accidental loss of or damage to sports
equipment and specialist sports clothing owned by any
member of the insured household. Cover usually applies
anywhere in the British Isles and for a limited period (say,
60 days) worldwide in any one period of insurance.
3: Package policies 35`},{printedPage:36,pdfPage:38,text:`Personal accident, hospital cash benefit and
creditor insurance
Cover is available against the risk of personal accident
and/or sickness, redundancy or unemployment for the
insured and their family. Personal accident cover is subject to
the standard terms and conditions of the personal accident
and sickness policy. Cover is also available against the
inability to continue credit instalment payments or a mortgage
in the event of redundancy or unemployment. A set monthly
amount is covered, usually for a period of up to 24 months,
excluding the first month of any period.
Domestic animals
Cover is available for horses, ponies, domestic cats and dogs
as follows:
Horses and
ponies
Cover includes death from accident, sickness or
disease, economic slaughter and loss by theft
or straying. Cover may also include temporary
incapacity, veterinary fees, saddles, bridles or
other riding tack, third party liability, personal
accident to the rider and accidental damage to the
horsebox trailer.
Cats and dogs Cover includes veterinary fees, accidental death,
death from illness, loss by theft, kennel fees
while the owner is hospitalised, advertising and
reward, third party liability and holiday cancellation
following emergency surgery to the pet.
Legal expenses
The legal expenses extension provides cover for the
following costs:`},{printedPage:37,pdfPage:39,text:`Recovery
costs
for legal action taken to enforce the legal rights of
the insured against third parties.
Civil defence
costs
for the defence of certain types of civil claims not
covered by other forms of insurance.
Prosecution
defence costs
for the defence of certain criminal charges which
may arise from unwitting acts of the insured.
Employment
dispute costs
for the cost of protecting the insured’s rights as an
employee through the tribunal process.
The limit of liability is usually up to £50,000 for incurred costs
and expenses.
Specific exclusions are as follows:
• claims relating to events occurring outside the British Isles;
• fines and compensation payments;
• costs and expenses not agreed by the insurer; and
• claims arising out of the insured’s business, deliberate
or criminal act or omission, libel and slander, divorce or
matrimonial matters and disputes between landlord and
tenant.
Identity fraud
The identity fraud section of the policy provides cover for
expenses incurred by the insured in respect of:
• administration fees for reapplying for a loan that had
previously been refused as a result of incorrect data being
provided by a credit reference agency;
• attendant costs, such as loss of earnings arising from
taking time off work to attend meetings with financial
institutions and the police; and
• the cost of notarising necessary documentation.
3: Package policies 37`},{printedPage:38,pdfPage:40,text:`Personal cyber
Cyber crime is on the rise which means protecting one’s
personal data and privacy is now as vital as protecting
one’s home. Consequently, many household policies include
a section, either as standard or an optional extra, covering
cyber risks such as:
Cyber attack An attempt by cyber criminals, hackers
or other digital adversaries to access a
computer network or system, usually for the
purpose of altering, stealing, destroying or
exposing information.
Ransomware A type of malicious software (malware) that
threatens to publish or blocks access to data or
a computer system, usually by encrypting it, until
the victim pays a ransom to the attacker.
Identity theft When someone steals personal information
such as financial data, biographical details
and passwords.
Smart devices All of the everyday objects made intelligent with
advanced computing, including AI and machine
learning, and networked to form the internet of
things (IoT).
Exclusions
As well as the specific exclusions that we have considered
in relation to the various sections of the household
policy, the standard market exclusions of war, radioactive
contamination, sonic bangs and pollution also apply. In
addition, insurers generally impose a matching pairs or
matching items clause, which states that the insurer is not
liable for the cost of replacing any undamaged item that is
part of a set or suite or items of a uniform nature. This often
includes carpets and floor coverings where damage occurs to
an identifiable area. Market wordings vary.`},{printedPage:39,pdfPage:41,text:`As with motor insurance, this raises questions as to what
the standard household policy will cover. While the standard
policy will often provide a degree of cover for a guest and
their property, this would not normally apply to anyone paying
to stay in the property. Therefore, a paying guest would
affect the validity of the policy if not disclosed at inception.
The host may, therefore, wish to consider taking out a
specialist property owners or landlords insurance policy or
such insurance coverage as supplied by the online platform.
While these policies are outside the scope of this section,
underwriters and brokers need to be aware of the existence
of such transactions. They must ask appropriate questions
when household cover is requested to ensure all the
necessary material information is obtained at inception.
Travel insurance
Individuals travelling within the UK or abroad, whether on
holiday or on business, face a number of risks both before
and during the journey. Risks include cancellation charges,
injury, death, medical fees following illness, loss of personal
possessions and third party liability. Cover on a single-trip
basis is usually for a maximum period of three months,
although annual multi-trip policies are available for regular
travellers.
Standard policy cover
Most policies provide the following basic sections of cover.
There is no standard market wording for travel insurance
policies, with insurers often offering two or even three levels
of cover with different limits and premiums. Therefore, the
actual wordings and monetary limits quoted here should be
treated as indicative of the market.
3: Package policies 39`},{printedPage:40,pdfPage:42,text:`Personal accident benefits
A benefit of between £10,000 and £30,000 is usually
provided for death, loss of eyes or limbs, or permanent
total disablement following an accident. The death benefit
is usually reduced for children under 16 years. Some
insurers include weekly benefits for temporary total or partial
disablement.
Medical and associated expenses
Reasonably incurred medical expenses are covered in
respect of the following:
Reasonably incurred medical expenses are covered in
respect of:
• medical treatment;
• additional hotel/travelling expenses;
• additional cost of bringing home the patient; and
• additional expenses of those in the insured’s party.
A sum insured of £10 million is not uncommon, with some
covers now providing significantly more, e.g. for travel in
the USA. This may be limited to £1,000 for holidays in the
UK where National Health Service (NHS) treatment usually
applies. An excess of a relatively nominal amount, say, £35
usually applies to this section.
Loss of deposits
The loss of deposits section provides for reimbursement
of deposits and payments made for transport and
accommodation booked and not used by the insured due to
the necessary and unavoidable cancellation of the holiday or
journey as a result of causes beyond their control.
In all cases, cancellation must be a direct and necessary
consequence, and not merely due to a disinclination to travel`},{printedPage:41,pdfPage:43,text:`or as a result of financial difficulties. An excess of, say, £25
usually applies.
Baggage, personal effects and money
Baggage cover includes loss of or damage to personal
baggage, including clothing and personal effects. Some
insurers exclude losses of unattended baggage.
The sum insured is generally between £1,000 and £2,000,
with a single article limit of £250 and a limit on valuables of
between £200 and £500. An excess of, say, £35 is imposed.
Personal liability
The personal liability section covers an insured’s legal
liability for injury to third parties or accidental loss of or
damage to third party property. The limit of indemnity is
between £500,000 and £2 million.
Delayed baggage
Cover is for the cost of buying essential items of clothing
and toiletries required following the delay of baggage for
a certain period beyond the time at which it should have
arrived, usually twelve hours. The sum insured is usually
£50 per person, although some insurers provide cover up to
£100–£250.
Hospital cash benefits
The hospital cash benefits extension provides a daily
benefit of, say, £50 while the insured is confined to hospital,
subject to a limit of, say, £1,000.
Travel interruption
The travel interruption section covers the failure of public
transport to deliver the insured to the departure point on
either the outward or return journey in time to take the trip
3: Package policies 41`},{printedPage:42,pdfPage:44,text:`booked. The cost of additional accommodation and travel is
covered up to around £300 per person.
Travel delay
Delay of the aircraft, ship etc., in which the insured
has arranged travel, for at least twelve hours of original
departure time due to strike, industrial action, adverse
weather conditions, mechanical breakdown or structural
defect affecting the aircraft etc. is covered.
Optional extensions
Cover may be extended to cover:
• failure of tour organiser;
• lack of services or amenities;
• loss of passport; and
• legal expenses.
Exclusions
Apart from the specific exclusions already discussed, the
general exclusions within a typical policy are as follows:
• Death, bodily injury or sickness caused by unprescribed
drugs or intoxicants; due to insanity, pregnancy or
childbirth; consequent upon any physical or mental defect;
while taking part in certain hazardous activities; or as a
result of suicide or self-inflicted injury.
• Loss of luggage caused by confiscation; stamps,
manuscripts, documents; camping equipment; cash/
cheques unless reported to the police within 24 hours.
• Damage to fragile objects.
• Terrorism is a standard exclusion, although it may not
apply to claims made for emergency medical expenses
and under personal accident sections, providing the
disturbances were not taking place at the start of`},{printedPage:43,pdfPage:45,text:`the insured trip. It is important to ensure that any
country it is planned to visit, whether on business or
pleasure, is validated as safe to visit by the Foreign and
Commonwealth Office (FCO).
Commercial insurance
Package policies are available for most shopkeepers and
hoteliers as well as other specified trades. Generally
speaking, the fabric of the building is insured separately (or at
least rated separately) because the package arrangements
are geared towards the actual trade risk – most rating
structures for shopkeepers’ risks are geared to the contents
sum insured.
For a given trade (such as small hotels), the policy wording
will be tailored to that particular trade and often wider cover
may be provided.
Standard policy cover
Property covered
Almost everything in the trade premises or shop is covered,
including stock. In some cases, the sum insured for certain
goods, such as wines, spirits or cigarettes, is restricted.
Removal of such restrictions is possible, subject to an
additional premium. Many policies include, automatically,
additional specified amounts of cover (usually a percentage
increase) for seasonal increases in stock.
Fixtures and fittings and internal decorations for which the
insured is responsible as tenant are included, unless the
insured is the owner of the building. If the insured is the
owner, buildings insurance will be required, although as
we have noted some insurances can be extended to include
buildings cover.
3: Package policies 43`},{printedPage:44,pdfPage:46,text:`Risks covered
The risks covered are as follows:
• Fire and additional perils.
• Business interruption.
• Theft.
• Money.
• Glass.
• Assault.
• Goods in transit.
• Employers’ liability.
• Public liability.
• Product liability.
Optional extensions
• Refrigerated stock.
• Business ‘all risks’/extended theft.
• Legal expenses.
Data privacy and cyber risks
Given the increasing influence of the internet in business
and responsibility to comply with the UK’s data protection
legislation, more insurers are now providing cover for
potential cyber risks. Consequently, as well as providing
standalone covers, some insurers are now including a cyber
risk section within package policies for the SME market.
The specific covers on offer include:
• Cyber liability.
• Data breach expenses.
• Computer system damage, data, extra cost and business
income.
• Cyber crime.`},{printedPage:45,pdfPage:47,text:`Exclusions
Each specific section of cover within the policy has certain
exclusions.
3: Package policies 45`},{printedPage:46,pdfPage:48,text:""}]},{chapter:4,title:"Property insurance",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:47,pdfPage:49,text:`4
Property insurance
Fire and special perils insurance
Unless part of a package arrangement, a standard fire policy
is used as the basis for almost all business insurances. The
purpose of such a policy is to provide compensation to
the insured person or firm in the event of damage to the
property insured (i.e. buildings, stock and other contents).
In the commercial world, it is much more common to find
specified perils added to a fire policy. This means that the
cover is ‘built up’ to meet the insured’s requirements, rather
than pre-packaged as with household type policies. Wider
‘all risks’ cover is available, as we shall see later, and is
becoming increasingly popular.
Standard policy cover
The Association of British Insurers (ABI) issued
‘recommended’ wordings for fire and special perils, called
the Standard Fire and Special Perils Policy (Material
Damage). Within the recommended policy wording, the word
‘DAMAGE’ in capital letters means loss or destruction of or
damage to the property insured.
The standard fire cover is made up of three parts:`},{printedPage:48,pdfPage:50,text:`Fire The policy covers damage to property caused by
fire, excluding:
• explosion resulting from fire;
• earthquake or subterranean (below ground) fire;
and
• its own spontaneous fermentation (ignition) or
heating or its undergoing any heating process
or any process involving the application of heat.
The effect of the exclusion of spontaneous
fermentation is to exclude cover for the specific
item which ignites spontaneously, without external
cause but not the further effects of the fire;
for example, if the fire spreads to the insured’s
adjacent property.
Lightning Because lightning is listed as a separate peril, it
is unnecessary for fire damage to be involved:
all damage or destruction caused by lightning is
covered.
Explosion Damage caused by explosion is not fire damage.
However, limited explosion cover is provided
within the standard fire policy. This is restricted
to explosion of boilers or gas used for domestic
purposes only. ‘Domestic purposes’ has been
defined by the courts as purposes related to the
home, irrespective of the occupation of the actual
building. For example, a boiler used for supplying
hot water in a factory canteen or for a central
heating system is used for ‘domestic purposes’.
Optional extensions
The special perils for which cover is usually available may be
grouped under the following broad headings:
• Perils of a chemical type.
• Social perils.
• Perils of nature.
• Miscellaneous perils.`},{printedPage:49,pdfPage:51,text:`Explosion
The special perils section offers additional explosion
coverage, compared to the limited explosion cover given
under the standard fire section of the policy.
Explosion due to other causes is covered. These are
mainly those emanating from chemical reactions that produce
suddenly expanding gases. Flammable vapours and gases
are encountered in many industries, often being released
from solvents that are present in, for example, paints, sprays
and adhesives. In other industries, potentially explosive dusts
are used or produced as part of the manufacturing process,
examples being in the production of fertilisers and flour.
The bulk storage of cereals and sugar also gives rise to
explosion hazards.
Aircraft
Cover applies in respect of damage caused by the crashing
of an aircraft or other aerial device (for example, missiles,
rockets, spacecraft and satellites) or part of an aircraft or
aerial device. Cover includes damage by articles dropped
from aircraft. The ‘aircraft’ extension is concerned solely with
damage other than by fire (fire damage being covered under
the standard fire section of the policy). The sonic bangs
exclusion applies.
Riot and civil commotion
Two distinct types of cover are available. The first type
provides cover for fire as a result of riot or civil commotion.
However, it is rare for this narrow form of cover to be
requested. The second is a wider form of cover and includes
any damage caused by riot, civil commotion, strikers, locked-
out workers or persons taking part in labour disturbances or
malicious persons acting on behalf of or in connection with
any political organisation.
4: Property insurance 49`},{printedPage:50,pdfPage:52,text:`Malicious damage
Cover for damage caused by malicious persons is only
available as an extension of the riot cover. Cover is in respect
of malicious damage of any kind, extending the ‘political’
malicious damage to all malicious damage.
Earthquake
The standard fire section of the policy specifically excludes
fire caused by earthquake. However, the peril may be
included within the special perils section of the wording either
for shock risks only (which would be very unusual) or for fire
and shock risks.
Subterranean fire
Loss, destruction or damage caused by subterranean fire is
also excluded within the standard fire section. Again, this
peril, like earthquake, may be included as a special peril.
Spontaneous fermentation or heating
The exclusion of this peril in the standard fire section of
the policy applies only to property which itself spontaneously
ferments or heats: the resulting damage to other property
is covered.
Although requests for the extended cover are infrequent,
farmers will often need the cover for hayricks and crops
stored in bulk. The storage of property in bulk occasionally
gives rise to a request for the inclusion of this special peril.`},{printedPage:51,pdfPage:53,text:`Storm
This special peril specifically excludes damage:
• caused by the escape of water from the normal confines of
any natural or artificial water course, lake, reservoir, canal
or dam; and/or caused by inundation from the sea (this
would be ‘flood’ cover);
• resulting from a change in the water table level;
• caused by lightning, frost, subsidence, ground heave or
landslip; and
• to moveable property in the open, fences and gates.
Flood
Flood cover is only granted in conjunction with storm cover.
The insurance is then expressed as storm and flood cover
and the first exclusion identified above (i.e. damage caused
by the escape of water etc.) is omitted from the wording.
Escape of water
Cover applies in respect of damage following the escape of
water from tanks, apparatus or pipes. An excess of at least
£250 applies.
The special peril specifically excludes damage:
• by water discharged or leaking from any automatic
sprinkler installation (this is insurable as a special peril or
under a separate policy); and
• to any building that is empty or not in use.
Impact
Cover is restricted to losses resulting from vehicles or
animals owned or under the control of third parties (not the
insured) against whom the insured generally has a right
of recovery. Animals and vehicles owned by the insured,
4: Property insurance 51`},{printedPage:52,pdfPage:54,text:`occupiers of the premises and their employees are excluded.
Where requested, ‘own impact’ cover is available, subject
to an excess of at least £250. This extended cover is often
requested in an industrial situation where, say, a number of
fork-lift trucks are used in a factory.
Sprinkler leakage
The peril insured against is accidental escape of water from
any automatic sprinkler installation.
Subsidence, ground heave and landslip
Subsidence This is the movement of the land on which
the premises stand due to movements, falls
or changes in underground workings, such as
coal mines; movement of foundations made on
dissimilar types of soil, such as sand and clay,
which react differently to changes in moisture
content, causing movement; and/or other changes
in moisture content.
Ground heave This is what happens when ground previously
having a low moisture content is suddenly able to
absorb more moisture; for example, post-drought
conditions. The ground quickly takes up moisture,
swells and ground heave results.
Landslip This has been legally defined in Oddy v. Phoenix
Assurance Co. Ltd (1966) as ‘a small landslide.
It is a rapid downward movement under the
influence of gravity of a mass of rock or earth on
a slope.’ It may occur, for example, after prolonged
heavy rain on a sloping site.
The peril specifically excludes damage:
• to yards, car-parks, roads, pavements, walls, gates and
fences, unless the insured building is also affected;
• caused by or consisting of the normal settlement
of new structures; the settlement or movement of
made-up ground; coastal or river erosion; defective`},{printedPage:53,pdfPage:55,text:`design, workmanship or materials; fire, subterranean fire,
explosion, earthquake or the escape of water;
• which originated prior to inception of the policy; and
• resulting from demolition, construction, structural alteration
or repair of any property; or groundworks or excavation.
Exclusions
The exclusions are as follows:
• riot or civil commotion (although this exclusion may be
removed on payment of an additional premium);
• war risks;
• radioactive contamination/explosive nuclear assemblies;
• Northern Ireland excluded perils;
• terrorism;
• pollution or contamination;
• marine policies;
• ‘more specifically insured’ clauses; and
• ‘consequential loss’ exclusion, i.e. loss following and
consequent upon a loss proximately caused by an
insured peril.
All risks insurance
Standard policy cover
The ABI has also issued recommended wordings for all
risks property insurance, called the Standard All Risks Policy
(Material Damage). Whereas the fire and special perils
policy offers a choice of perils to be insured, each of which
has its own specific exclusions, the ‘all risks’ policy covers
‘accidental loss or destruction of or damage to the property
insured’. Therefore, all loss or destruction of, or damage
to, the property insured is recoverable, provided that it has
4: Property insurance 53`},{printedPage:54,pdfPage:56,text:`occurred accidentally so far as the insured is concerned,
and provided that the cause is not specifically excluded from
the policy.
There are no optional extensions to the policy as such: all
loss or destruction is covered unless specifically excluded or
restricted in some way.
Limitations
Exclusions
Those exclusions which are
absolute exclusions
These include war, nuclear
assemblies, terrorism, Northern
Ireland risks, pollution or
contamination, marine risk, specific
insurance, consequential loss (the
standard market exclusions) plus
certain ‘trade’ risks (such as faulty
workmanship).
Those exclusions which
relate to an aspect of
cover which can sometimes
be included in the policy,
but only with careful
underwriting
They are by no means
automatically insurable since they
are the gradually operating
exclusions such as corrosion, rust,
change in temperature, wind or rain
damage to moveable property in
the open and malicious damage
cover in respect of empty buildings.
This list also includes terrorism
in Great Britain. It is possible to
insure terrorism risks, usually on a
limited basis.
Those exclusions which
relate to an aspect of cover
which can be written into
the policy
This group includes money,
jewellery, glass, computers, goods
in transit, theft, subsidence, ground
heave and landslip.`},{printedPage:55,pdfPage:57,text:`Those exclusions which
relate to property or
risks which are more
appropriate to another class
of business and therefore
cannot be covered
This group includes motor vehicles,
watercraft, aircraft, livestock and
buildings in the course of erection.
Limits of liability
The ‘all risks’ policy contains references to limits of liability.
In very large insurances covering many premises, insurers
often cover the insurances of all property of one type
at all locations, provided that their total sum insured
(the maximum amount of the insurer’s liability under the
policy) at any one location does not exceed a pre-agreed
monetary limit.
Some perils may be insured on a first loss basis, whereby
the insured requests cover up to an amount significantly less
than the total value of property insured. They do this on the
grounds that total destruction by the perils insured is very
unlikely. Perils where this basis of cover is popular include
theft, storm, flood, sprinkler leakage and impact. Insurers
allow premium discounts for first loss cover only if the lower
figures actually reduce their exposure to loss.
Theft insurance
The Theft Act 1968 states that a person is guilty of
theft if they ‘dishonestly appropriate property belonging to
another with the intention of permanently depriving the other
of it’. This legal definition is, however, wider than that
which insurers are prepared to offer cover for, especially
for business premises, since the definition did not mention
any need for there to be force or violence in committing a
theft. This meant that shoplifting, for example, was ‘theft’;
and this kind of risk had traditionally been uninsurable.
To remedy this problem, insurers include in their business
4: Property insurance 55`},{printedPage:56,pdfPage:58,text:`premises cover a phrase to the effect that theft must include
force and violence, either in breaking into or out of the
insured premises. The word ‘violence’ here means violence
to property, not necessarily to the person, and does not need
to be excessive.
Standard policy cover
Although there is no ‘standard’ market wording for theft cover
(unlike fire and special perils cover and ‘all risk’ cover), in
practice wordings do not differ very much among insurers. A
typical policy incorporates the following wording:
Theft involving entry to or exit from the premises
by forcible and violent means.
However, if entry were gained by such means, cover would
apply if there was an element of force or violence used in
exiting the premises, such as forcing a locked door. Usually,
cover will apply if keys are obtained as a result of threats to
or force used against directors, employees or their families.
This eliminates the risk of persons hiding on the premises
and their subsequent escape, irrespective of whether the exit
was by forcible means.
Cover may also be extended to include the risk of hold-up.
Hold-up can be defined as theft accompanied by assault
or violence (or the threat of it) to the insured or their
employees, irrespective of whether forcible entry takes place.
In recent years, hold-up cover is often automatically included,
as increases in violent crime have led policyholders to
demand it.
Underinsurance
Theft policies, in common with many other property
insurances, rely upon the full value being declared. The
condition of average applies to theft policies, unless the`},{printedPage:57,pdfPage:59,text:`insurance is on a ‘first loss’ basis. The insured must choose
the first loss sum insured for such policies, but must also
declare the full value. Claim settlements are adjusted on the
basis of the full value at risk compared with the declared
full value.
Optional extensions
• Breakage of glass;
• Replacement of locks;
• Temporary removal; and
• Index linking.
The following three extensions of theft cover are available,
subject to careful underwriting and, usually, an additional
premium:
• Collusion.
• Extended or full theft.
• Robbery and aggravated burglary.
Exclusions
• Collusion. This can sometimes be a ‘buy-back’, as we’ve
just seen.
• Fire and explosion. The theft policy excludes fire and
explosion as they should be otherwise insured (i.e. under
the standard fire policy).
• Cash and bank notes etc. These are more properly
insured under a money policy.
• Livestock. Unless specifically included under the theft
policy, cover should be granted under a standard livestock
policy.
4: Property insurance 57`},{printedPage:58,pdfPage:60,text:`Limits of liability
Cover is often sought on a first loss basis because the
insured recognises that a potential thief will be selective
in what they steal. Insurers usually allow a small premium
discount for such cover provided that they are satisfied that
their true liability is potentially reduced.
Glass insurance
This class of property insurance is not restricted to plate
glass, but extends to include covers for practically all kinds
of fixed glass, such as sheet, silvered, wired and types of
ornamental lettered glass.
Standard policy cover
The standard policy covers destruction or damage to all fixed
glass. This includes windows, doors, fanlights, showcases,
mirrored glass and glazed partitions. Policies include cover
for the cost of boarding up damaged glass until replacement
can be effected. Cover is on an ‘all risks’ basis, although
damage by scratching or chipping is usually excluded. It
includes alarm foil applied to shop fronts and any lettering
or display on the glass. Damage to window frames is
also covered. Insurers always give themselves the options
of repair, replacement, reinstatement or cash settlements.
However, this class of business is almost invariably dealt
with by replacement. The insurer will have negotiated
favourable arrangements with one or more major national
glazing companies, who will board up and replace glass as
necessary.`},{printedPage:59,pdfPage:61,text:`Optional extensions
The following optional extensions may be added to the policy,
subject to additional premiums:
• damage to shopfront contents as a result of broken
glazing; and
• damage to washbasins and sanitary fittings in hairdressing
salons.
Limitations
It is standard practice to exclude damage by fire, lightning
and explosion. This is because these perils are more
appropriately covered under a standard fire policy. An excess
of, say, £50 is fairly standard in order to avoid claims for small
losses.
Money insurance
Money insurance is an important class of insurance in
view of money’s attractiveness and vulnerability to theft. The
definition of money varies between insurers. It is an extensive
list of items and always includes cash, bank and currency
notes, cheques, postal and money orders, postage stamps,
national insurance cards and luncheon vouchers.
Standard policy cover
Money insurance is on an ‘all risks’ basis, covering all risks
of loss or destruction of or damage to money in different
situations. Each of these has a separate policy limit. The
situations covered are as follows.
4: Property insurance 59`},{printedPage:60,pdfPage:62,text:`• In transit or being carried by the insured or their
employees.
• On the insured’s premises during business hours.
• In a bank night safe.
• In a locked safe or strongroom out of business hours (for
large amounts, insurers will wish to approve the safe).
• On the insured’s premises out of business hours and not in
a safe, but usually with a low limit, say £500.
• In the private residence of any principal or employee of an
insured company (again, with a low limit).
• In the custody of collectors or travellers while in transit,
usually with a time limit, say within 24 hours of collection.
• In the custody of a professional carrier or security
company.
Optional extensions
Typical extensions to the standard policy cover are as
follows.
Personal accident
assault
This cover is often bought where employees
are potentially exposed to robbery or
attempted robbery (i.e. personal assault).
It provides monetary compensation to any
victim. This extension also often includes
cover for damage to items of clothing and
personal effects. Insurers usually charge a
small additional premium for this extension,
although some may automatically include
such cover within the basic policy.
Credit cards Credit cards are not covered by a standard
money policy. Provision to cover the
fraudulent use by unauthorised persons can
be included by way of a policy extension.`},{printedPage:61,pdfPage:63,text:`Exclusions
Apart from the standard market exclusions (war, radioactive
contamination etc.), the main specific exclusions are:
• loss due to an error or omission in accounting/counting/
book-keeping;
• loss due to the dishonesty of an employee, not discovered
within seven days;
• loss, destruction or damage arising outside Great Britain,
Northern Ireland, the Isle of Man or the Channel Islands;
and
• loss resulting from the safe or strongroom being opened
by a key or by using the combination to a safe where
this has been left on the insured’s premises while closed
for business.
Limits of liability
The limits for different situations vary considerably. For
example, it would be unusual to find a limit of more than
£500 for money left out of a safe on the business premises
overnight, whereas a limit of £5,000 is not uncommon in
respect of money in transit.
4: Property insurance 61`},{printedPage:62,pdfPage:64,text:""}]},{chapter:5,title:"Pecuniary insurance",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:63,pdfPage:65,text:`5
Pecuniary insurance
Legal expenses insurance
The basic purpose of legal expenses insurance is to
provide indemnity for costs arising out of the need to seek
legal advice or to pursue or defend a civil action.
Standard policy cover
There are two main types of policy cover to consider;
namely group legal benefit policies and commercial legal
protection policies. Within both types of policy, insurers
provide cover under various headings, which describe the
circumstances in which the policy will respond. The proposer
can choose which to buy the covers that are appropriate to
them. Cover is limited to an amount per claim, though there is
no overall limit per policy period.
Group legal benefit policies
Group legal benefit policies are designed to operate on
behalf of a group of people, such as the employees of a
company, and the immediate family of each member. Where
cover is arranged by an employer, it is in the manner of an
employee benefit.`},{printedPage:64,pdfPage:66,text:`The four sections of the policy, from which the proposer may
choose cover, are:
Employment cover • Defence of any claim or legal
proceedings brought against a member
arising out of and in the course of their
employment.
• Defence and compensation awards
resulting from actions brought under
specified legislation, such as the
Equality Act 2010.
• Costs of claiming for compensation
arising out of the member’s employment,
such as wrongful dismissal, racial or
sexual discrimination or injury arising out
of employment.
Personal cover Cover the costs of pursuing personal rights
or defending a personal action against the
member.
Motor cover Covers the costs of defending claims arising
out of the ownership or use of a motor
vehicle (where not covered by an ordinary
motor policy).
Conveyancing
cover
Covers the legal costs involved in buying
and/or selling one’s house, up to a
specified limit.
Commercial legal protection policies
Commercial legal protection policies are designed to
cover firms or companies in their capacity as employers,
manufacturers, property owners, traders, or any other
capacity where their business activities may expose them to
litigation.`},{printedPage:65,pdfPage:67,text:`There are five main sections of the policy from which to
choose:
Employment cover Covers the costs of defending an action
by an employee against the firm for unfair
dismissal or racial or sexual discrimination,
plus awards made against the company if
the defence is unsuccessful.
Criminal
prosecution
defence cover
Covers the costs of defending an action
brought against the company, usually under
Health and Safety at Work legislation. It
includes costs incurred by an employee
appearing in court, but not the fines which
may be imposed (as this is against the
public interest).
Property disputes
cover
Covers costs incurred in disputes between,
for example, landlord and tenant involving
the possession of freehold or leasehold of
business premises.
Motor cover Covers costs incurred in:
• pursuing uninsured loss recoveries after
a motor accident;
• pursuing or defending actions brought
in connection with the purchase, sale,
lease, hire, service, test or repair of
vehicles where a dispute has arisen;
• pursuing damages following a road
accident; and
• defending motoring prosecutions.
Not all insurers offer this option. This may
be added as a section to a motor insurance
policy.
Patents, registered
designs, copyright
and trademarks
cover
Covers costs incurred in pursuing an action
against any person alleged to be guilty of
infringing the insured’s interest in patents,
registered designs etc.
5: Pecuniary insurance 65`},{printedPage:66,pdfPage:68,text:`Optional extensions
Many companies have an exposure to legal costs peculiar
to their particular type of business. Appropriate cover can be
made available to them, including cover for the cost of:
• defending libel and slander charges;
• involvement in public enquiries;
• investigations by professional bodies; and
• taxation proceedings, e.g. a dispute with HMRC following
a compliance check into PAYE and/or National Insurance
contributions, or over alleged VAT arrears.
Limitations
Commercial legal protection insurance does not cover any
legal action for which indemnity in respect of its costs
is recoverable elsewhere, such as under the insured’s
employers’ liability policy or public/product liability policy. It
is also usual for losses incurred prior to written acceptance of
the claim by the insurer to be excluded.
Cover is not provided where a legal action is pursued by
the insured against the advice of the insurer’s nominated
solicitor. This is an important proviso that applies to all types
of legal expenses insurance. It is designed to ensure that
an impartial view is taken regarding the likely success of the
action in order to protect the insurer from paying costs for
frivolous or unwinnable cases. The insured may otherwise
display a highly biased attitude if the decision were to remain
solely in their hands.
Business interruption insurance
In brief, property insurance covers the direct material or
physical loss following damage or destruction. On the other
hand, business interruption insurance covers the actual or`},{printedPage:67,pdfPage:69,text:`potential loss of earnings and additional expenses incurred
as a result of that material loss or damage.
Basic features
Business interruption cover has two dimensions: the
monetary amount that needs to be insured and the time
that the interruption will affect the business. Both of these
are defined in the policy. The time that the interruption will
affect the business is known as the indemnity period and is
defined as:
The period beginning with the occurrence and
ending not later than the Maximum Indemnity
Period thereafter, during which time the business
is affected by the interruption occasioned by the
damage.
The length of the maximum indemnity period is chosen by the
insured and defined in the policy schedule in terms of months
or years. A twelve month period is often selected, but a much
longer period may be required, depending upon the type of
business, type of customer, the need for specialist machinery
and other factors that may have an impact upon the firm’s
recovery to its expected trading position.
Turnover
Turnover is the total income arising from the activities of
the business. However, the insurance cover is not designed
to replace the whole of the turnover. We can see why by
breaking down the turnover into its constituent parts: costs
that are associated with the business and net profit. Costs
can be divided between those that vary in direct proportion to
the turnover (raw materials may fall into this category), and
those that do not vary in this way (such as rent, which will be
payable regardless of whether the business is functioning).
5: Pecuniary insurance 67`},{printedPage:68,pdfPage:70,text:`Basis of fixing sums insured
There are two methods used for fixing the sum insured
for a business interruption policy. The first involves taking
the projected turnover of the firm for forthcoming years and
assuming a ‘worst case’ scenario in terms of the timing of
a future loss. In other words, it is assumed that the claim
incident may arise on the last day of the period of insurance.
The interruption period would then begin and could last the
whole length of the indemnity period.
However, this method requires projections to be made into
the distant and, by definition, uncertain future. Insurers,
therefore, operate a system to deal with this. When, at the
end of the period of insurance, the actual gross profit is
known, the policyholder’s accountant provides this figure to
the insurer who will then allow a rebate of premium based
upon it. The policyholder is required to project figures initially,
but only ends up paying a premium based upon what actually
happens.
In recognition of the fact that making projections so far
into the future may be difficult, insurers offer a more
straightforward option known as a ‘Declaration linked’ policy.
With a declaration linked type of arrangement of cover the
policyholder is only required to estimate the figures for
the forthcoming year. Insurers then apply a one-third uplift
automatically to take account of any future growth in turnover.
Extra costs
Insurers also recognise the fact that certain expenses will
actually increase following loss or damage. New premises
may need to be rented, more staff employed, advertising may
be needed to reassure customers, some work may need to
be sub-contracted and so on. Cover is provided for such risks
so long as there is an equivalent saving in the claim that
would otherwise be paid. In other words, insurers will not give
a ‘blank cheque’ for money to be spent extravagantly. This`},{printedPage:69,pdfPage:71,text:`element of cover is known as increase in (or increased)
cost of working (ICOW) cover.
Material damage warranty
A requirement in virtually all business interruption policies is
that there must be a policy in place which covers the physical
damage leading to loss of earnings, before the business
interruption policy comes into operation. This requirement is
known as the material damage warranty.
Material damage warranty
This is now more commonly referred to as the material
damage proviso, although the term almost never appears
in policy wordings.
Standard policy cover, optional
extensions and limitations
The most common business interruption policies are:
Fire and special
perils ‘All risks’ Engineering
Fire and special perils
As well as producing a fire and special perils policy in respect
of material damage, the Association of British Insurers
(ABI) has also issued the Standard Fire and Special Perils
Policy (Business Interruption). The perils under the business
interruption wording may be divided into standard perils and
special perils, as with the material damage wording.
Standard perils
The standard perils covered by the business interruption
policy are the same as those covered by the material
5: Pecuniary insurance 69`},{printedPage:70,pdfPage:72,text:`damage policy. They are extended to include the explosion of
‘any other boilers or economisers on the premises’, i.e. ‘non-
domestic’ boilers, in addition to ‘domestic’ boilers as covered
in the material damage policy.
Special perils
The special perils for which cover is given under a
business interruption policy are, basically, the same as those
given under the material damage policy, with the same
specific exclusions.
However, the business interruption policy may be extended to
include six special perils, relating to engineering cover, that
are not usually capable of being covered under the material
damage policy.
All risks
The same standard policy cover and exclusions apply to the
business interruption policy as to the material damage policy.
This includes the extent to which some excluded perils may
be ‘bought back’. The terrorism exclusion (in Great Britain),
for example may be insured on the same basis as the
material damage risk.
Optional extensions
Extensions commonly found are as follows:
• Specified suppliers;
• Unspecified suppliers;
• Specified customers;
• Transit;
• Prevention of access;
• Public utilities; and
• Notifiable disease, vermin, defective sanitary
arrangements, murder and suicide.`},{printedPage:71,pdfPage:73,text:`Engineering
There is no standard policy cover, however the perils covered
usually fall under one of the following two headings:
• failure of the public supply of gas, electricity, water or
telecommunications at the supplier’s feed to the premises;
and
• sudden and unforeseen damage from any accidental
cause, not specifically excluded, to specified items of
machinery and plant.
5: Pecuniary insurance 71`},{printedPage:72,pdfPage:74,text:""}]},{chapter:6,title:"Liability insurance",source:"key-facts",edition:"IF2 2026 Key Facts",pages:[{printedPage:73,pdfPage:75,text:`6
Liability insurance
Employers’ liability insurance
Apart from third party motor risks, employers’ liability
is the only other major form of liability insurance that
is compulsory in the UK. The Employers’ Liability
(Compulsory Insurance) Act 1969 stipulates that employers
in Great Britain (with certain exceptions) must be
insured against liability for bodily injury or disease
sustained by their employees arising out of and in
the course of their employment in the business. An
employer was required to display a certificate of
insurance at each place of business to signify that it
was insured against legal liability for injury or disease
to their employees. However, the Employers’ Liability
(Compulsory Insurance) (Amendment) Regulations 2008
(effective 1 October 2008) removed this requirement. It is
now sufficient to have an electronic copy of the certificate, as
long as employees have reasonable access to it.
The provisions of the Employers’ Liability (Compulsory
Insurance) Act 1969 were extended by the Employers’
Liability (Compulsory Insurance) Regulations 1998. The
key extension increased the minimum limit that must apply
under an insurance policy from £2 million to £5 million. In
practice, insurers have provided a £10 million limit since
January 1995.`},{printedPage:74,pdfPage:76,text:`The effects of many industrial illnesses and some accidents
may take some time to materialise, often resulting in
difficulties ascertaining who might be held responsible and
liable for the subsequent employer’s liability claim.
The original company who employed the claimant at the
time the illness was contracted, or the accident occurred,
may have:
• changed insurers;
• been taken over by another and changed its name/insurer;
or
• ceased trading due to bankruptcy etc.
Similarly, the original insurer may have been taken over/
ceased trading.
To address this issue the EL service was set up in
1999. It was later replaced in 2011 by the Employers’
Liability Tracing Office (ELTO), which is an independent,
not-for-profit company set up by the insurance industry. It
was created to provide claimants and their representatives
with quick and easy access to a database of Employers’
Liability (EL) policies through an online enquiry facility. From
April 2012 the Financial Conduct Authority (FCA) made it
compulsory for all members of ELTO to provide details of
their employers’ liability policies, along with policy records
relating to historic covers triggered by claims to allow the
tracking of policies by claimants via the Employers’ Liability
Database (ELD).
The Financial Conduct Authority (FCA) requires all members
of ELTO to provide details of their employers liability policies,
along with policy records relating to historic covers triggered
by claims to allow the tracking of policies by claimants via the
Employers’ Liability Database (ELD).
In addition, all employers must provide their employers’
liability insurers with an employer reference number (ERN).`},{printedPage:75,pdfPage:77,text:`Each ERN is unique to the employer and will not be
replicated. Even if the employer is taken over, ceases trading
or moves tax office, the ERN for a specific point in time is
permanent. The ELTO has adopted the employer reference
number as the most effective unique identifier available. All
insurers must supply the ERN to the ELD.
Standard policy cover
Although wordings vary, all EL policies provide an indemnity
to the insured for legal liability for damages (including
claimants’ costs and expenses) in respect of bodily injury to
or death, disease or illness sustained by any person under a
contract of service or apprenticeship with the insured:
• caused during the period of insurance;
• arising out of and in the course of their employment by the
insured;
• in connection with the trade or business; and
• occurring within certain territorial limits.
Legal liability
The EL policy only indemnifies the insured in respect of their
legal liability to pay damages etc. There are many accidents
which are ‘pure’ accidents (i.e. not the result of negligence).
In these circumstances the employee must rely on personal
accident and sickness insurance or the social security system
to obtain benefits.
Damages
If a person suffers injury etc. as the result of their employer’s
negligence or breach of statutory duty, they will be entitled
to seek damages or compensation: compensation for any
expenses incurred, loss of earnings, possible loss of future
earnings, pain and suffering, and perhaps other items. This
applies equally where the actual act of negligence was
6: Liability insurance 75`},{printedPage:76,pdfPage:78,text:`perpetrated by a fellow employee of the victim. In law, the
employer is liable for the negligence of employees arising
in the course of their employment. This is termed vicarious
liability.
Claimants’ costs and expenses
Claims are settled out of court as far as possible to avoid
unnecessary legal costs. Claimants’ costs and expenses are
covered whether or not a claim ends up in court. These are
factual amounts paid or payable by the claimant to pursue
the claim. In the case of those claims that do reach the court,
the employer, if found liable, will usually have costs awarded
against them in addition to the compensatory award for the
injured person.
Definition of employee
An employee is defined as ‘any person who is under a
contract of service or apprenticeship’ with the insured. Most
policies extend the category of ‘direct’ employee to include,
for example, self-employed persons, hired persons and
students on work experience. The list of such persons is
extensive. The intention is to ensure that the insurer receives
an adequate premium by asking for a declaration of wages/
earnings for each category – this figure is used to fix and
adjust the premium.
Arising out of and in the course of
employment
The injury or disease must arise out of, and in the course of,
employment. As a simple example, when an employee enters
their employer’s premises for the purpose of going to work,
they are usually acting in the course of their employment
from the moment they pass through the ‘boundary gates’.
However, even this cannot be taken as an absolute`},{printedPage:77,pdfPage:79,text:`rule, especially during break periods. Activities outside the
insured’s premises will depend upon the circumstances.
Trade or business
The injury or disease etc., must arise in connection with the
trade or business. The insurer usually restricts cover to the
particular trade or activity for which the insured has paid
a premium. However, it is usual to extend cover to include
the ancillary activities of the insured that directly form a part
of the business; for example, services for the safety and
welfare of staff, such as first-aid facilities, canteens, private
fire brigades and private ambulance services and any private
work carried out for any director, partner or employee of
the company. It is important that the trade or business is
fully defined in the policy. This is to avoid problems with
claims that arise from work carried out that goes beyond the
business stated in the schedule.
Territorial limits
Territorial limits generally apply, although not all insurers
apply the same wordings. It is usual to stipulate that the
bodily injury etc. must be sustained:
• in Great Britain, Northern Ireland, the Isle of Man or
the Channel Islands (there may be specific mentions of
offshore installations within the Continental shelf around
these territories); or
• while temporarily outside these territories (sometimes
restricted to non-manual workers).
Period of insurance
Cover applies in respect of bodily injury or disease caused
during the period of insurance.
6: Liability insurance 77`},{printedPage:78,pdfPage:80,text:`Standard extensions
• Defence costs and expenses; and
• Additional persons insured.
Limitations
There are very few standard exclusions in an EL policy,
mainly because they are not permitted by the EL compulsory
insurance legislation. In fact, there is not even a standard war
risks exclusion.
However, cover may be limited by an insurer as part of the
underwriting process in terms of applying trade clauses:
• by restricting the definition of ‘business’;
• by excluding certain kinds of work; or
• by excluding certain machines and/or processes.
Public liability insurance
The public liability policy is an open policy in that, instead
of the scope of cover being specified by insured perils, it is
defined by the exclusion of specific perils.
Standard policy cover
A public liability policy provides an indemnity to the insured
for legal liability to third parties for damages (including
claimants’ costs and expenses) in respect of bodily injury,
death, disease or illness. It also provides cover for any loss
of, or damage to, property which happens in connection with
the business insured under the policy and occurring during
the period of insurance.`},{printedPage:79,pdfPage:81,text:`Accident
Some policies make reference to ‘accident’ in the policy
cover, as it is only intended to cover unexpected events.
They will use a phrase such as ‘accidental death of or bodily
injury to…’. Where the word ‘accident’ is not used, it is usual
to incorporate an exclusion for injury or damage which results
from a deliberate act or omission of the insured.
Injury to persons
‘Injury’ to persons relates to bodily injury or death, illness
or disease of any person. The term ‘bodily injury’ makes it
clear that there must be some form of physical or medical
impairment.
Loss of or damage to property
Most insurers insure only the risk of physical damage to
material property, excluding cover for intangibles (such as
copyrights, patents and trademarks) or indirect economic
loss. Liability for loss of property is also covered. For
example, an insured could be liable for the theft of customers’
goods from their premises or for employees’ belongings.
Consequential loss
The public liability policy also covers losses directly flowing
from accidents resulting in injury to persons or damage
to property. For example, if a builder negligently and
accidentally drops a roof tile, damaging the bodywork of a
car, they will be liable for the cost of repairing the damage.
They may also be liable for the cost of hiring another car
while the third party’s car is being repaired.
Financial loss
As well as providing consequential loss cover, public liability
policies may also provide a limited form of cover for ‘pure’
6: Liability insurance 79`},{printedPage:80,pdfPage:82,text:`financial loss; i.e. financial loss which a third party may be
able to claim even in the absence of injury to persons or
damage to property. The cover applies to premises for which
the insured still retains a liability but which may have been
sold or vacated.
Limit of indemnity
The maximum amount insurers are prepared to pay following
a claim is specified in the policy. Usually, this is a limit for
any one occurrence. Nowadays, the limit applied is usually
£2 million, although figures of up to £10 million are not
uncommon.
Optional extensions
The following two optional extensions are those most
commonly provided:
• Tenants’ liability; and
• Defective premises.
Exclusions
Because a public liability policy has a wider scope than an EL
policy, it contains a number of exclusions. The exclusions are
as follows:
• Injury to employees.
• Property belonging to the insured.
• Product liability.
• Contractual liability.
• Cost of rectifying defective work.
• Professional negligence.
• Deliberate acts.
• Motor vehicles.
• Vessels and craft.`},{printedPage:81,pdfPage:83,text:`• Lifts, elevators and boilers.
• War risks.
• Radioactive contamination.
Product liability insurance
All sellers of goods, whether they are manufacturers,
intermediaries or retailers, may incur liability to their
customers and others for injury, illness, loss or damage
arising from the supply of goods. This can occur through
inadequate design, faulty manufacture, misuse, inadequate
instruction, contamination or damage prior to supply.
Standard policy cover
The standard policy covers legal liability for bodily
injury or property damage, happening during the period
of insurance, which arises out of goods or products
manufactured, constructed, altered, repaired, serviced,
treated, sold, supplied or distributed by the insured.
The following points regarding cover should be noted:
• the policy covers consequential losses incurred by a third
party only if these flow directly from loss or damage for
which the insured is legally liable;
• financial loss is not usually covered unless resulting from
actual bodily injury or loss of or damage to property;
• the basic cover is usually dependent on an element of
accident, although wordings vary, and there must be injury
or damage which results from the supply of the product;
• the injury or damage must occur during the period of
insurance, not necessarily the supply of goods or services;
and
• product liability policies (or extensions) are subject to a
limit of indemnity chosen by the insured in the same way
as public liability policies.
6: Liability insurance 81`},{printedPage:82,pdfPage:84,text:`It is usual to specify a yearly aggregate limit of indemnity;
i.e. a limit applying to all injury and damage occurring during
any one period of insurance; usually the same figure as the
amount of any one occurrence.
Exclusions
A product liability policy is subject to the exclusions that apply
to a public liability policy, but also excludes the following:
• Contractual liability;
• Damage to goods supplied;
• Faulty design or formula; and
• Unsuitability or failure to perform.
Directors’ and officers’ D&O
insurance
At common law, a director’s primary duty is to the company
and not the shareholders of the company. The Companies
Act 2006 codified certain responsibilities of directors. They
are required to act honestly and in good faith, and carry out
their duties with reasonable care and skill. The Act imposes
responsibilities upon directors and officers not only to their
company, but also to shareholders, employees and creditors,
and of course to the public.
Directors now have statutory duties to:
• act within powers: acting within the company’s
constitution and properly exercising powers;
• promote the success of the company: this is for the
benefit of its members as a whole;
• exercise independent judgment;
• exercise reasonable care, skill and diligence;`},{printedPage:83,pdfPage:85,text:`• avoid conflicts of interest: directors must authorise
any individual director’s conflict of interests and may do
so, provided there is no conflict with the constitution of
the company;
• not accept benefits from third parties: unless unlikely to
give rise to a conflict of interests; and
• declare an interest in any proposed transaction with
the company: they must declare the nature and the extent
of that interest.
The Companies Act 1985 had imposed restrictions on the
indemnity that a company could make to its directors (a
fact which continues to influence policy wordings as we
shall see) but the position has changed. The Companies
(Audit, Investigations and Community Enterprise) Act
2004 allows companies to assist their directors financially
while litigation or other proceedings are going on. It also
permits them to indemnify their directors against certain
liabilities to third parties, even if the directors are at fault.
Companies may therefore choose to indemnify their directors
in respect of proceedings successfully brought by third
parties, including legal and financial costs. However, they
may not reimburse the legal costs of the unsuccessful
defence of criminal proceedings or criminal fines and
penalties.
The Pension Schemes Act 2021 introduced two new
criminal offences relating to pension schemes. These can be
committed by anyone, including a director or officer, and lead
to fines of up to £1 million.
6: Liability insurance 83`},{printedPage:84,pdfPage:86,text:`Standard policy cover
The two elements of cover are:
• cover for the directors and officers in their personal
capacity when they are unable to claim an indemnity from
the company; and
• cover to protect the company in circumstances where it is
permitted to indemnify the directors or officers, such as the
repayment of legal defence costs.
Key benefits provide cover for:
• allegations of involuntary, constructive or gross negligence,
manslaughter, or claims under health and safety
legislation;
• breach of trust, breach of duty, breach of warranty of
authority, defamation, negligence; and
• legal representation costs for individuals at other official
examinations, enquiries or investigations.
The basis of cover is ‘claims made’. This means that the
policy covers all claims notified to the insurer or the insured
during the period of insurance, no matter when the event
giving rise to the loss occurred.
Policy extensions
Insurers are willing to extend the time limit in which discovery
must be made. This would be in circumstances where a
director leaves the company but may still have ongoing
responsibility for incidents reported in the future.`},{printedPage:85,pdfPage:87,text:`Policy exclusions
The main exclusions and limitations are:
• prior notification: circumstances known (or which ought to
be known) prior to cover commencing;
• prior and pending litigation: similar to notification;
• a jurisdiction clause: this may state that English law will
apply and may exclude actions in the USA or Canada;
• bodily injury and property damage;
• pollution and contamination;
• claims based upon improper personal gain by a director;
• fraud or dishonesty of a director;
• ‘insured v. insured’: this is to avoid internal conflicts in the
organisation;
• breach of professional duty: usually covered under a
professional indemnity policy; and
• fines, penalties and punitive damages.
Professional indemnity
insurance
Professional indemnity insurance protects a professional
person against claims which might be made alleging that
injury or loss resulted from their actions or advice.
Standard policy cover
The standard policy covers the liability of members of a
profession for injury, damage or financial loss to clients or
the public as a result of a breach of their professional duty
or negligent acts, errors or omissions in their professional
capacity.
Professional indemnity policies, like directors’ and officers’
policies, are always on a ‘claims made’ basis.
6: Liability insurance 85`},{printedPage:86,pdfPage:88,text:`Optional extensions
The following extensions of cover are available.
• Continuation of cover beyond the date of cancellation in
the event of the firm being wound up. This is to allow
a period for claims to be made following negligent acts
committed prior to the closure of the firm.
• Liability for breach of warranty of authority, in case an
insured takes an action in good faith on behalf of a client
which they are, in fact, not authorised to do.
• Liability for financial loss caused by loss of documents.
• Collateral warranties.
• Cover for any other person or firm acting jointly with the
insured.
• Fidelity guarantee.
Exclusions
Apart from excluding risks that are the subject of public
liability insurance and, possibly, claims arising outside
the UK, a professional indemnity policy usually excludes
dishonesty of the insured.
Trustee insurance
Broadly speaking the need for this cover arises because,
although trustees are given certain powers, the law also
places duties upon trustees.`},{printedPage:87,pdfPage:89,text:`Pension fund trustees
The Pensions Act 1995 and subsequent regulations impose
a wide range of duties upon trustees. Individual trustees
may be held personally liable for their own (and fellow
trustees’) actions or failures to act. Trustees are also liable
to civil penalties imposed by The Pensions Regulator (TPR).
Trustees are expected to inform on any perceived irregularity
in the way the employer or its advisers carry out the duties
imposed them.
This insurance is specifically designed to cover internal
maladministration of a pension fund resulting in court
awards against trustees, losses to the pension fund
and the employer, plus defence costs. In common with
professional indemnity insurance, cover is always on a
‘claims made’ basis.
Exclusions
One of the principal limitations is the definition of the term
‘wrongful act’. Wordings vary, but in essence they relate to
breach or alleged breach of duty or trust; neglect; error or
omission and includes libel or slander. Principal exclusions
relate to bodily injury and property damage, pollution, fraud or
wilful act, and failure on the part of the employer to fund or
collect contributions.
Charity trustees
Under the terms of the Charities Act 1993 and the Trustee
Act 2000 clear responsibilities are given to trustees of
charities.
There will be a document setting out a charity’s purpose
and its administration. It may be a trust deed, constitution,
Memorandum and Articles of Association, Scheme of
Commissioners, conveyance or will. Duties may be imposed
by this document, or they may arise from the requirements
6: Liability insurance 87`},{printedPage:88,pdfPage:90,text:`of the law or from an order of the court or the Charity
Commissioners. Duties arising from law would include the
need to insure a motor vehicle owned by the charity for
third party risks. Employer’s liability insurance would also fall
under this heading.
Standard policy cover
Trustee indemnity insurance provides cover for trustees
against the risk of personal liability, whether to the charity or
a third party, arising from their breach of trust. Any personal
liability for their wrongful acts as a company’s directors or
officers is also covered.
Limitations
The Charity Commission states that trustee indemnity
insurance cannot as a matter of public policy provide
indemnity for:
• fines;
• the costs of unsuccessfully defending criminal
prosecutions for offences arising out of the fraud or
dishonesty or wilful or reckless misconduct of a trustee;
and
• liabilities to the charity arising from conduct which the
trustee knew, or must be assumed to have known, was
not in the interests of the charity, or which the trustee did
not care whether it was in the best interests of the charity
or not.`},{printedPage:89,pdfPage:91,text:`Cyber insurance
Cyber insurance encompasses property, pecuniary and
liability risks arising from cyber issues.
Although still in its relative infancy in the UK, cyber insurance
has seen rapid growth in recent years as increasing numbers
of nations, companies and individuals have come to realise
the risk inherent in conducting their respective business via
IT systems and the internet.
Companies are now increasingly preparing for the risk of
an active attack on a company’s system by third parties, to
observe, block, steal or actually destroy the company’s entire
IT system or network to gain competitive advantage, demand
ransom money, or as part of some form of political activism.
The UK Government and European Union also recognised
the increased risks to individuals’ personal details held by
companies which led to the introduction of the EU’s General
Data Protection Regulation (EU GDPR) and the UK’s Data
Protection Act 2018.
Coverage of cyber risks proved to be problematic under
conventional policies which were not designed to protect
against cyber risks. As a result of increasing threats from
cyber breaches some conventional policies have even
produced cyber exclusions.
There is as yet no standardisation of policy wordings.
However most cyber insurance policies will seek to cover
losses relating to damage to or loss of information from IT
systems and networks. In addition, policies will also offer
assistance with and management of the incident itself which
can be vital in dealing with resultant reputational damage or
regulatory enforcement.
6: Liability insurance 89`},{printedPage:90,pdfPage:92,text:`Summary of covers
Current policies may offer a combination of:
• first party insurance (covering a business’s own assets);
and
• third party insurance (covering the assets of others).
Some important exclusions
• Employers’ liability - unless any data privacy obligations
have not been met.
• Products liability.
• Fines and penalties where such would be against the
public interest.
• Time excess – loss of business income or extra cost
arising during the time excess period which can range from
12 hours to 168 hours in some covers.
Extended warranties
The personal insurance offered to purchasers of consumer
durables, usually electrical goods, is known as extended
warranty insurance.
The term ‘extended warranty’ refers to the fact that the
manufacturer’s own guarantee, or warranty, for an item
usually provides cover for repairs or defects for a period of
twelve months. Extended warranty insurance is effectively a
time extension of this warranty.
Standard policy cover
Cover offered under extended warranty insurance is for free
repairs following electrical and mechanical defects for a
period of up to five years. The cover is usually marketed by
retailers, although free cover is also now offered by some`},{printedPage:91,pdfPage:93,text:`major credit card companies when items, such as household
appliances, are purchased using their card.
A typical sum insured is £2,500 per period of insurance, for
replacement parts and/or labour. Some insurers state that if
the equipment is beyond economic repair within the first five
years from purchase date, they will replace it with the nearest
current equivalent model.
Exclusions
It is often a condition of the policy that repairs must be carried
out by the supplier of the equipment. Exclusions to extended
warranty insurance include:
• failure to comply with manufacturer’s instructions or
negligent handling;
• risks normally covered by a household contents policy;
• war etc.; and
• costs of repairs to bulbs, aerials, external wires, knobs,
handles, driving belts etc.
6: Liability insurance 91`},{printedPage:92,pdfPage:94,text:""}]}],Sf=[{chapter:1,title:"Motor insurance",source:"study-text",edition:"IF2 2026 Study Text extract (Chapter 1)",pages:[{printedPage:1,pdfPage:1,text:`1
Motor insurance
Contents Syllabus learning
outcomes
Introduction
A Private motor insurance 1.1
B Motorcycle insurance 1.1
C Commercial motor insurance 1.1
Key points
Question answers
Self-test questions
Learning objectives
After studying this chapter, you should be able to:
• list the main forms of motor insurance;
• describe the basic features of each type of motor insurance;
• outline the standard policy cover of various forms of motor insurance; and
• state the optional extensions to and limitations of various motor insurance policies.Chapter 1`},{printedPage:2,pdfPage:2,text:`Introduction
We start our consideration of the general insurance market by looking at the products
available. We begin by examining the most common compulsory insurance in the UK: the
requirement to insure liabilities incurred to third parties while driving a motor vehicle on
public roads. In this chapter we look at the different levels of cover provided by motor
insurance policies.
The minimum motor insurance prescribed by law covers the legal liability to pay damages
arising out of injury caused to any person (unlimited in amount) and the damage to the
property of others (subject to certain limits and exclusions).
For IF2 we will consider the following main classes of motor insurance:
• Private cars.
• Motorcycles.
• Commercial vehicles.
Key terms
This chapter features explanations of the following ideas:
Commercial motor
insuranceComprehensive No claims discount
(NCD)Road Traffic Act only
(RTA only)
Third party only
(TPO)Third party, fire and
theft (TPFT)
A Private motor insurance
In terms of the number of people affected, private motor insurance is the most significant
compulsory insurance in the UK. It is illegal to drive, or be in charge of, a vehicle on a public
road unless an insurance policy is in force to cover legal liability for injury to others and
damage to their property.
A1 Standard policy cover
There are four levels of cover available:
•Road Traffic Act only (RTA only) .
•Third party only (TPO) .
•Third party, fire and theft (TPFT) .
•Comprehensive .
Most insurers issue one standard form with individual sections numbered and a policy
schedule which identifies the sections applicable to the particular insurance. The same policy
form can then be used, whatever the level of cover chosen by the insured. For example, the
entire policy is used in the event of comprehensive cover, while a much smaller section of
the policy is used in the event of third party only cover. Let us now examine these different
levels of cover in more detail.
A1A Road Traffic Act only
As its name implies, Road Traffic Act only (RTA only) is the minimum cover required to
comply with the Road Traffic Act 1988 as amended by later legislation.
This minimum cover meets or exceeds the requirements of the current EU motor Directives,
in terms of the minimum specified amounts and scope of cover. These require that the
minimum amount of cover for damage to third party property be automatically adjusted
in line with inflation every five years. Consequently, the European Commission increased
the minimum limit to €1.2 million on 1 January 2017. In line with this change, the UK
Government passed legislation to increase the limit under the Road Traffic Act to £1.2 million
from 31 December 2016.
Chapter 11/2 IF2/July 2026 General insurance business`},{printedPage:3,pdfPage:3,text:`RTA only cover relates to the use of a motor vehicle on a road or any public place
and provides:
• indemnity for bodily injury or death caused to third parties, including passengers:
unlimited in amount;
• indemnity for loss of or damage to property belonging to third parties: limited to
£1.2 million ;
• indemnity for claimants’ costs and the expenses of handling the claim; and
• cover for charges for any emergency medical treatment and hospital charges arising out
of the use of the vehicle. The amount of these charges is specified in the RTA, and the
policy must provide for their payment when demanded.
In addition, in order to comply with the Third EU Motor Insurance Directive , all policies
must also provide:
• either the minimum cover required by the EU country being visited or the minimum cover
required by the country where the vehicle is usually kept (RTA only cover in the UK),
whichever is greater; and
• cover for liability to persons in the employment of the insured when travelling as
passengers in the course of employment, but not the driver. Any legal liability that the
employer has towards the driver is covered under an employers’ liability policy.
Very few RTA only policies have been issued since the introduction of compulsory third party
property damage under the 1988 Act, since this means that the difference in cover between
RTA only and third party is only very marginal. The additional requirements of the Fifth EU
Motor Insurance Directive brought the two levels of cover even nearer, meaning that for all
practical purposes, the lowest level of cover offered by insurers is third party only.
A1B Third party only (TPO)
In addition to providing RTA cover, third party only (TPO) cover usually provides
the following:
• Cover for vehicles while not on a road or in a public place but remaining within the
territorial limits (usually defined as anywhere in the UK, the Isle of Man or the Channel
Islands, though some insurers extend the full policy cover to the whole of the EU for a
limited time in any one period of insurance).
• A limit of £20 million for third party property damage for private car policies (i.e.
substantially increasing the £1.2 million minimum compulsory limit).
• Indemnity for accidents which occur while the insured is driving a car (some also include
a motorcycle) that does not belong to them. Not all insurers provide this cover: those that
do have agreed to introduce a market wording so the extension of cover is not used for
securing the release of vehicles seized by the police (since this could have the effect of
putting uninsured vehicles back on the road).
• Indemnity to anyone who is driving or using the vehicle on the insured’s order or
permission unless, as is very common, driving is restricted to named individuals or
spouse only.
• Indemnity to passengers, employers or business partners, should they be held
responsible for an accident.
• Legal costs incurred in the defence of a claim.
• Limited cover for legal representation costs following a prosecution for a motoring offence
that may give rise to a claim.
The specific exclusions that relate to third party liability are:
• Damage to property (including the vehicle) owned, held in trust by or in the custody or
control of any person claiming indemnity under the policy.
• Liability covered by any other insurance policy. This exclusion relates particularly to the
insured driving another car or motorcycle since cover may be provided under a more
specific policy covering the vehicle in question.Chapter 1Chapter 1 Motor insurance 1/3`},{printedPage:4,pdfPage:4,text:`A1C Third party, fire and theft (TPFT)
In addition to third party only cover just described, third party, fire and theft (TPFT) cover
includes the cost of repairs or compensation to the insured if their vehicle is:
• damaged by fire, lightning or explosion;
• damaged either during attempted theft or while it is stolen (some policies include taking
without consent); or
• stolen and not recovered.
Individuals who choose this level of cover usually do so because they do not wish to pay the
higher premium required for comprehensive cover, but still require some form of cover for
the major risks that they face. In addition to the two exclusions contained in third party only
cover, fire and theft cover specifically excludes ‘loss of use’; i.e. any payment the insured
may have to make, for example to use taxis, while their car is being repaired or recovered.
A1D Comprehensive
The most common form of motor insurance cover is comprehensive cover, offering the
widest possible protection. In addition to the cover granted by the third party, fire and theft
policy, the Comprehensive policy covers other accidental and malicious damage to the
insured’s car .
The cover granted is on the same basis as an ‘all risks’ policy, in that all loss or damage,
however it occurs, is covered subject to specific exclusions. These are:
• loss or damage to accessories and spare parts, unless on the vehicle or in the
insured’s garage;
• wear and tear and depreciation;
• loss of use (although some insurers now grant a limited form of loss of use cover);
Refer to
See Loss of use on page 1/6
• mechanical and electrical failure or breakdown (although, if an unexpected mechanical
failure causes a collision – say, the brakes fail – the resulting damage to the vehicle is
covered); and
• damage to tyres caused by road punctures or bursts.
Refer to
Third party policy covered in Third party only (TPO) on page 1/3
A comprehensive private motor policy usually provides cover for ‘driving other cars’ in the
same way as a third party policy. However, it is important to note that only third party cover is
granted for this extension, even under a comprehensive policy. There is no cover for damage
to the vehicle being driven.
A ‘young or inexperienced drivers’ excess applies. Insurers have a scale of extra excesses
that apply over and above any policy excess. The term ‘inexperienced’ means either holding
a provisional licence, or not having held a full licence for a period of at least a year. Some
insurers are now applying further restrictions to ‘young drivers’ by excluding this cover
entirely when the driver is under 25 years of age.
Remember, an excess is the first amount of each and every claim that the insured
must bear.Chapter 11/4 IF2/July 2026 General insurance business`},{printedPage:5,pdfPage:5,text:`Comprehensive cover also typically includes the following benefits:
Personal accident cover This provides certain benefits to the insured or spouse if they are seriously injured
as the result of an accident to any car they are driving or travelling in. Benefits are
usually capital sums and apply to specific injuries, such as the loss of a limb or
sight, with some insurers also providing a benefit for temporary total disablement.
See Personal accident benefits on page 1/6
Medical expenses Although emergency treatment cover is compulsory under the RTA, the
comprehensive policy includes additional medical expenses cover for the insured
or a passenger, subject to a limit of, say, £250 to £500
Personal belongings and
clothingA modest amount of cover is provided, usually around £250 although £1,000 is
not uncommon, to cover personal effects and clothing in the car that are lost or
damaged by accident, fire or theft
A1E No claims discount (NCD)
All insurers offer the incentive of a no claims discount (NCD) as standard in their policy
wordings. The terms ‘no claims discount’ and ‘no claims bonus’ are interchangeable. Rates
vary considerably between insurers, but it would not be unusual to find discounts of 12% for
one year free of claims, up 50% + for five years or more free of claims.
Generally, insurers will reduce the entitlement to an NCD by dropping back two years if a
claim is made. For a small additional cost, a full no claim discount may be ‘protected’, so
that a modest (defined) number of claims will not affect the level of discount. Certain insurers
offer a ‘guaranteed’ discount: once, say, five years claim-free driving has been achieved, the
bonus can be protected ‘for life’ at an extra premium. It must be noted, however, that while
the bonus is protected in this way, the insurer does not provide any guarantee regarding the
levels of premium from which the deduction is made.
A1F Uninsured driver promise
Refer to
See Uninsured drivers agreement on page 11/14 and Untraced drivers agreement on
page 11/15
A number of insurers now offer cover under their comprehensive policies for where the
insured’s vehicle is involved in an accident with a third party’s vehicle which does not have
motor insurance. Such accidents can often involve a lengthy claim process and considerable
expense. This extension will usually protect the insured’s no claim discount and from the
application of their policy excess – provided they can provide full details of the third party
vehicle involved. It will not apply to ‘hit and run’ accidents where the third party cannot be
traced and the required details are not available.
A2 Optional extensions
Insurers offer a number of optional extensions in addition to the standard policy cover.
A2A Breakage of glass
Cover for breakage of glass is included as standard in a comprehensive policy. It may also
be added to a non-comprehensive policy, subject to an additional premium. The important
point about this cover is that a claim payment made under this section alone does not affect
the insured’s NCD.
A2B Personal belongings and clothing
Cover for personal belongings and clothing is included as standard in a comprehensive
policy, but only for a fairly modest sum. To increase the amount covered an additional
premium is charged. Many insurers now offer specific ‘add-ons’ to cover a range of items,
from child seats and wheelchairs to entertainment and satellite navigation systems.
A2C Young additional drivers
A young driver (say, under 25), who is truly an occasional additional driver to the main driver
under the policy, may be included under the main driver’s policy, subject to an additional
premium. If a young driver is the main driver (or one of the main drivers) but does not ownChapter 1Chapter 1 Motor insurance 1/5`},{printedPage:6,pdfPage:6,text:`the car, the insurer may grant cover, but will rate the risk on the basis of the young driver’s
age and experience rather than that of the owner.
A2D Loss of use
Although loss of use is a specific exclusion to the comprehensive policy, some insurers are
prepared to offer such cover, limited to an amount per day and subject to an additional
premium. Most insurers will pay for a replacement vehicle for a limited period while the
insured’s vehicle is off the road.
In addition, some repair garages offer the use of an alternative vehicle while they hold
the customer’s vehicle for repair. These vehicles are commonly known as courtesy cars .
Insurers will insist that courtesy cars are available from their recommended repairers and
use this fact as a marketing tool for their own product. While courtesy cars are supposedly
offered ‘free of charge’, it should be noted that their cost is included in the charges made by
the repairing garage and, therefore, ultimately is a factor in the premium.
A2E Personal accident benefits
This extension provides personal accident benefits in addition to those provided as standard
in the comprehensive policy. For example, the extension may offer increased capital benefits
(i.e. lump sums) or the addition of weekly benefits for the insured or their spouse. This is
now sometimes further extended to include rehabilitation benefits such as specialist medical
care to help insureds return to health following injury, e.g. physiotherapy, MRI scans and
chiropractic treatments.
A2F Foreign use
Refer to
See also Road Traffic Act only on page 1/2
All policies issued in the UK (and any other country subject to the EU Directives) must
extend to provide either the minimum cover required by the country being visited or the
minimum cover required by the country where the vehicle is normally kept, whichever is
the greater.
If a UK insured wishes to have the same cover under their policy when driving abroad,
they must notify their insurers of the intention to drive their vehicle abroad. They must ask
for their policy to be extended to cover continental use, which will often be subject to an
additional premium. However, some insurers provide free continental cover for up to 30 days
in any one period of insurance. Many insurers issue a ‘green card’ for such trips. This is a
recognised international certificate and is always needed for travel in foreign countries, with
the exception of the following: the EU member states, Croatia, Iceland, Norway, Switzerland,
Liechtenstein, Luxembourg and Andorra.
On the 30 June 2021, the European Commission announced that the UK would be able
to participate in the Green Card Free Circulation Area (GCFA), which comprises all 30
European Economic Area (EEA) countries as well as Andorra, Bosnia & Herzegovina,
Serbia and Switzerland. This took effect on the 2 August 2021 and will remove the
requirement for green cards to be issued for travel within these countries. Following
the MIB’s recommendation, many insurers continued to issue green cards up until the
2 September 2021.
On the Web
Green card system explained on the MIB website: bit.ly/2yrObZX
For driving in Spain, a Spanish bail bond used to be required. This was an agreement
whereby the insurer would make a sum (usually up to £1,000) available to secure the
release of the policyholder or other driver from prison in Spain, if they were arrested
following a motoring accident. Any amounts paid by the insurer had to be repaid by the
policyholder. As this is no longer a legal requirement for Spain, most insurance companies
have stopped issuing them.
Chapter 11/6 IF2/July 2026 General insurance business`},{printedPage:7,pdfPage:7,text:`A2G Elections
Motor vehicles are sometimes used in connection with elections, which most insurers may
not regard as normal ‘social, domestic and pleasure’ use. Insurers do not usually charge an
additional premium for such an extension, except in the case of parliamentary elections.
A2H Racing, competitions, rallies and trials
Events, such as road safety rallies, may be covered at no additional charge. However,
those involving racing are covered by only a few specialist insurers, subject to an
additional premium.
A2I Caravans and trailers
Insurers generally provide third party cover for caravans or trailers while they are attached
to the insured vehicle. If wider cover is required, caravans are insured under separate
non-motor policies. Comprehensive cover for a trailer may be provided as an extension to a
private motor policy.
A2J Breakdown cover
Some insurers offer the facility in their comprehensive policies to call a control centre for
assistance. The insured pays for the labour and parts used when help arrives (unless the
breakdown is as a result of an accident covered under the policy). In addition, some insurers
provide cover for the cost of the call-out charge, an hour’s roadside repair labour and towing
the car to a garage.
This extension is subject to an additional premium.
A2K Motor legal expenses
This provides cover following a motor accident or incident where the insured is not to blame.
It provides cover up to say, £100,000 to pay lawyers’ costs in assisting a claim for financial
losses (such as insured’s excess and travel expenses) or compensation for personal injury
from the person who is responsible.
A2L Joint policies
Insurers are occasionally asked to issue policies in joint names, e.g. each spouse. Such
an extension may or may not be subject to an additional premium, depending on the cover
required and whether each of the joint insureds wishes to have the benefit of the ‘driving
other cars’ cover. This benefit would usually either be deleted or stated to apply to only one
of the joint insured. Cover provides for the situation where one of the joint insureds may have
a claim against the other. Effectively the policy operates as if each had their own policy and
treats the other as a third party. This could happen where one of the joint insureds is at fault
and causes an accident injuring the other. A claim can be made against the negligent party.
A2M Multi car policies
It is now common for households to have more than one vehicle. A number of insurers offer
a multi car policy, which in some cases can include up to 5 or 6 vehicles. However, they
have to be registered at the same address. The policy covers will be comprehensive or third
party, fire and theft as appropriate. There is usually a premium saving and most insurers will
guarantee separate no claim discounts for each vehicle.
A2N Misfuelling
Any loss or damage caused directly or indirectly as a result of accidentally filling the insured
vehicle with the incorrect type of fuel.
A3 Exclusions
Refer to
Use permitted by policy described in Use of the insured vehicle on page 1/8Chapter 1Chapter 1 Motor insurance 1/7`},{printedPage:8,pdfPage:8,text:`In addition to the specific exclusions already discussed, there are a number of general
exclusions applicable to all sections of the policy, including:
• driving by unlicensed drivers;
• use of the insured vehicle outside that permitted by the policy;
• contractual liability;
• war risks;
• radioactive contamination and explosive nuclear assembly;
• riot and civil commotion in Northern Ireland, for own damage cover;
• sonic bangs (i.e. pressure waves from sonic/supersonic aircraft or other aerial device);
and
• pollution and contamination unless arising from a single identifiable event.
Refer to
Market exclusions discussed in Market exclusions on page 10/5
Apart from ‘use of the insured vehicle’, the other limitations listed above are market
exclusions. There are usually other exclusions, such as using a vehicle in an unroadworthy
condition. In addition, in order to be indemnified, the driver must hold a licence to drive the
vehicle, or have held and not be disqualified from holding or obtaining such a licence. No
person will be indemnified if they know that the person driving the vehicle at the time does
not hold a licence.
However, the Road Traffic Acts state that an insurer must pay an RTA claim, even if the
policy wording states that it is excluded. This is because the Road Traffic Acts are designed
to ensure that innocent victims of road accidents are compensated. However, the insurer
is permitted to seek to recover its outlay from the insured. Policies invariably contain a
condition stating this to be the case.
A3A Use of the insured vehicle
The policy excludes liability for any accident, injury, loss or damage which occurs while the
vehicle is being used for a purpose outside the description of use in the certificate of motor
insurance. This is becoming a key issue, given the growth of the sharing economy, which
poses a problem for the provision of appropriate insurance.
New commercial business models mean that a vehicle can be used both for personal and
commercial purposes, e.g. the increasingly common practice of peer-to-peer car sharing
over the internet, by which owners rent out their vehicle while it is not in use. Personal car
insurance policies usually exclude peer-to-peer renting. New market platforms have found
a solution by issuing separate policies to cover the vehicle and the renter during the rental
period, which supersede the renter’s personal insurance, and which protects the vehicle
owner in the event of a loss.
Even informal car sharing, such as giving a neighbour a lift to work, is a sharing economy
activity and may be excluded from a standard motor policy under the hire and reward
exclusion, although if no profit is made from the passenger contribution the policy should
remain valid. However, more complex issues may arise if the neighbour(s) is taken to a
different work destination, e.g. under the cover for ‘commuting’ and ‘business use’ for the car
as compared to the standard ‘social, domestic and pleasure use’ cover.
From these examples you will see that even slight changes to circumstances can have a
direct impact on the actual policy coverage. Therefore, it is imperative that insurers ask the
appropriate questions when the request for cover is received.Chapter 11/8 IF2/July 2026 General insurance business`},{printedPage:9,pdfPage:9,text:`Question 1.1
Which of the following does not form part of the standard cover that is provided
under a comprehensive private motor insurance policy?
a.Accidental damage to the insured vehicle. □
b.Driver’s personal accident benefit. □
c.Recovery of a vehicle after breakdown. □
d.Recovery of a vehicle to a repairer after an accident. □
e.Third party liability cover in the event of an accident. □
B Motorcycle insurance
Refer to
Options for cover discussed in Standard policy cover on page 1/2
In insurance, the term ‘motorcycle’ includes any kind of cycle propelled mechanically,
including mopeds. Consequently, there is a wide range of risk. Many of the considerations
for motorcycles are the same as for motor vehicles, both being subject to the Road Traffic
Act 1988. The options of the different levels of cover are also the same and need not be
repeated here.
The single method of insuring motorcycles is specified motorcycle insurance , where the
driver is insured for a particular motorcycle.
B1 Standard policy cover
The format of the comprehensive motorcycle policy is much the same as that of the private
motor policy. Therefore, here we only need to identify the main differences:
• the accidental damage section follows that for private vehicles, except that it does not
cover theft of accessories or spare parts unless the motorcycle itself is stolen at the
same time;
• the liability section generally indemnifies the insured (or their personal representatives in
the event of the insured’s death), others permitted to drive the motorcycle and users of
the motorcycle for social domestic and pleasure purposes; and
• there are no personal accident benefits and no cover for medical expenses (beyond
emergency treatment fees) or personal effects.
B2 Optional extensions
There are a number of optional extensions available, subject to payment of
additional premium:
Trailers A solo motorcycle may have a particular type of trailer for which an additional premium
is required.
Riding other
motorcyclesThis is usually excluded where the motorcycle is of modest specification. However, it
may be added back at an additional premium, although this is being phased out as an
extension in common with private motor.
More than one cycle
insuredInsurers often allow a premium reduction if an individual insures more than one cycle
with the same insurer.
‘Invalid carriages’
(mobility vehicles)It has been possible to insure these under a motorcycle policy. Insurance is
recommended but not required (particularly for class 3 invalid carriages, mobility
scooters and powered wheelchairs). Specialised policies are available providing similar
cover for accidental damage, theft or loss, third party liability, personal accidents as well
as mobility scooter breakdown and recovery.
Chapter 1Chapter 1 Motor insurance 1/9`},{printedPage:10,pdfPage:10,text:`B3 Limitations
Refer to
As discussed in Exclusions on page 1/7
The policy exclusions, or limitations, of motorcycle insurance are the same as those for
private motor insurance.
Question 1.2
Under a third party only motorcycle policy, what cover is provided as standard?
a.Damage to clothing and personal effects. □
b.Emergency treatment fees. □
c.Medical expenses. □
d.Personal accident benefits. □
C Commercial motor insurance
The main types of commercial vehicles are as follows:
• Goods-carrying vehicles: these form the largest group of commercial vehicles.
• Passenger-carrying vehicles: hire cars, buses and coaches.
• Agricultural and forestry vehicles.
• Vehicles of special construction (known as ‘special types’): ambulances, cranes and
fork-lift trucks.
Commercial motor insurance is primarily concerned with the risks which attach to the
vehicles themselves while they are being driven, left parked or being carried by sea or air
between different parts of the UK. Such cover does not extend to any goods being carried
by the vehicles: this forms the subject of a separate class of insurance, known as goods
in transit .
In this section we outline the standard policy cover, optional extensions and limitations of
commercial motor insurance.
C1 Standard policy cover
Most insurers use the same standard policy wording for all commercial motor insurances,
irrespective of the type of vehicle to be covered. This standard cover is then modified as and
where necessary, depending on the vehicle being insured. Some insurers issue separate
and specific policies in respect of agricultural and forestry vehicles and certain ‘special
types’. However, here we limit our discussion to the standard commercial motor policy cover.
The range of cover available for commercial vehicles is the same as for private motors and
motorcycles, as already discussed. We will identify standard comprehensive policy cover
and identify the main differences between the commercial motor policy and the private
motor policy.
Chapter 11/10 IF2/July 2026 General insurance business`},{printedPage:11,pdfPage:11,text:`C1A Third party liability
Private motor cover and commercial motor cover must provide unlimited indemnity for death
or bodily injury to third parties. Whereas the private motor policy provides a £20 million limit
of indemnity for third party property damage, the commercial motor policy usually has a limit
of, say, £5 million. This may be more restricted for certain risks such as general haulage,
where the standard limit offered may be as low as £1.2 million. Most insurers are prepared to
increase the limits, subject to an additional premium.
Question 1.3
Why, do you think, is a limit of liability necessary?
You should also be aware of the following points regarding third party liability:
Loading or unloading Cover in respect of third party liabilities also applies to accidents occurring during
loading or unloading the vehicle. In the case of the driver or attendant this extends
beyond the boundaries of the carriageway.
Indemnity to driver Generally, anyone may drive the vehicle on the order or with the permission of
the insured.
Indemnity to user The insured may allow someone to use the vehicle for social, domestic and/or
pleasure purposes (though they may not necessarily actually be driving).
Indemnity to passengers This covers the liability of passengers for their negligent acts.
Legal expenses As with private motor cover, commercial motor insurance provides cover for certain
legal costs.
C1B Loss of or damage to the vehicle
This section covers any loss of or damage to the vehicle and to its spare parts and
accessories while they are on the vehicle. In contrast to private motor cover, there is no
cover for spare parts and accessories while they are detached from the vehicle.
C1C Trailers
Insurers cover the towing of trailers under the third party liability section of the policy.
It works as follows:
Articulated and non-
articulated vehiclesIt is now standard practice to include third party cover for trailers while attached to
the insured vehicle and some policies provide comprehensive cover
Disabled mechanically
propelled vehiclesIn most cases, third party only cover is given, so that there is no cover for damage to
the vehicle on tow or to any goods it is carrying. However, a number of insurers now
offer comprehensive cover to the broken-down vehicle while it is attached to another
vehicle for towing
C1D Private motor policies only
Certain cover given by a private motor policy is omitted from a commercial motor policy. This
is as follows:
Driving other vehicles Even in respect of goods-carrying vehicles, the range of vehicles is so extensive
that insurers do not want to encourage the insured or their employees to drive other
vehicles under their policy
‘Personal benefits’ Personal accident benefits, medical expenses, personal belongings and clothing are
not covered under a standard commercial motor policy
Chapter 1Chapter 1 Motor insurance 1/11`},{printedPage:12,pdfPage:12,text:`C2 Optional extensions
In addition to the extensions already mentioned, a number of other benefits may be added to
the standard policy, often subject to an additional premium. Common optional extensions are
identified below:
Third party property damage The stated policy limit can be increased, subject to an additional premium.
Medical expenses; personal
accident benefitsSome insurers will extend the policy to cover medical expenses and/or
personal accident benefits to the driver and/or passengers though requests
for this are unusual.
Personal belongings and
clothingThis item may be added to the policy, subject to an additional premium. The
reason for requesting its inclusion is that long-distance drivers might have
personal possessions in their vehicles and, therefore, require cover for them.
Windscreen/glass cover The insured can often negotiate an extension to the standard policy if it does
not already include windscreen cover or has only limited windscreen cover.
Indemnity to hirers Insurers can grant cover in one of two ways:
• without an additional premium – insurers will cover loss, damage or liability
arising from the negligence of the insured or their employees while the
vehicle is in the custody or control of a hirer; or
• subject to an additional premium – insurers will cover the hirer for loss,
damage or liability arising from their negligence or that of their employees.
Indemnity to principal This operates in much the same way as indemnity to hirers. The insured may
be using their vehicle in connection with some contract work and one of the
contract terms may require an indemnity to the other party.
Carnivals Flat-bed lorries tend to be used in carnivals as ‘floats’. Most insurers require
notification of such a risk and might impose an additional premium.
Sheets and ropes etc. Open lorries usually carry equipment, such as sheets and ropes, to secure
the load they are carrying. When not in use, such equipment is stored on the
vehicle itself. Therefore, the risk of theft is very high. Such an extension is
usually subject to an additional premium and on condition that such equipment
is kept in a locked compartment on the vehicle. This risk may be covered under
a goods in transit policy rather than a motor policy.
Loss of use This extension provides up to 80% of leasing or hire charges if the insured
is without their vehicle following accidental damage, fire or theft anywhere
in Great Britain and Western Europe. As with all extensions, an additional
premium is usually charged, with larger charges for cover in Western Europe
and for young drivers.
Loss of tools in transit This extension will usually only apply in comprehensive policies. Tools are
usually defined as:
• Non-powered hand tools for domestic DIY, gardening, or vehicle
maintenance activities.
• Where the vehicle is insured for business use as described on the
schedule, tools of trade reasonably associated with the insured’s declared
occupation.
C3 Limitations
Apart from the specific exclusions which relate to certain sections within the policy, the
commercial motor policy incorporates a number of general exclusions. These limitations are
basically the same as those contained within the private motor policy.
However, the exclusion of ‘ use of the insured vehicle ’ is slightly different from that given in
the private motor policy. It states that the insurer is not liable if the vehicle is:
• used other than in accordance with the use stipulated in the policy schedule; or
• engaged in racing, pace-making, reliability trials or speed testing.Chapter 11/12 IF2/July 2026 General insurance business`},{printedPage:13,pdfPage:13,text:`Key points
The main ideas covered by this chapter can be summarised as follows:
Private motor insurance
• The four levels of cover available are Road Traffic Act (RTA) only, third party only
(TPO), third party, fire and theft (TPFT) and comprehensive.
• The lowest, RTA only, offers the minimum cover required by the Road Traffic Act 1988
as amended by subsequent legislation.
• Comprehensive insurance offers the widest level of cover as, in addition to the cover
offered under the third party, fire and theft policy (cover for liabilities to third parties,
and damage/loss of the insured vehicle as a result of fire and theft) it also covers
accidental and malicious damage to the insured’s car.
• A number of optional extensions to the basic cover are available, e.g. personal
belongings and clothing cover, loss of use.
• A number of general and market exclusions apply to all sections of the policy, e.g.
driving without a licence.
Motorcycle insurance
• The term ‘motorcycle’ includes any kind of cycle propelled mechanically,
including mopeds.
• Insurance is under specified motorcycle policies and the driver is insured for a
particular motorcycle.
• The standard comprehensive policy cover is similar to that under a private motor
policy, with some differences relating to accidental damage, personal accident benefits
and liability.
• Optional extensions are available for extra premium.
Commercial motor insurance
• Commercial motor insurance is primarily concerned with the risks that attach to the
vehicles themselves while they are being driven, left parked or carried by sea or air,
and not with the goods being carried.
• Most insurers use the same standard wording regardless of the type of vehicle being
covered, amending it as necessary.
• The range of cover available is the same as for private motor.
• Third party cover is usually lower for commercial vehicles and certain other cover
applies which is specific to commercial vehicles, for example when loading or
unloading, or for trailers.
• As with private motor policies, optional extensions are available, often at an
additional premium.
Chapter 1Chapter 1 Motor insurance 1/13`},{printedPage:14,pdfPage:14,text:`Question answers
1.1 c. Recovery of a vehicle after breakdown.
1.2 b. Emergency treatment fees.
1.3 A limit is necessary because of the nature of some commercial vehicles which, due
to their size and weight and the type of property they may be carrying, could cause
considerable damage.
Chapter 11/14 IF2/July 2026 General insurance business`},{printedPage:15,pdfPage:15,text:`Self-test questions
1. What are the three main classes of motor insurance?
2. What is the minimum motor insurance cover required in order to comply with the
Road Traffic Act 1988 (as amended)?
3. What are the two specific exclusions in respect of third party liability?
4. What is the main difference between third party, fire and theft cover and
comprehensive cover?
5. What are five of the optional extensions to a comprehensive private motor policy?
6. What are the main differences between the standard comprehensive motor policy
and the standard comprehensive motorcycle policy?
7. What are the main groups of commercial vehicles?
8. Why is ‘driving other vehicles’ cover omitted from the commercial motor cover?
You will find the answers at the back of the bookChapter 1Chapter 1 Motor insurance 1/15`}]}],Bl={keyFacts:Tf,studyText:Sf},Pf={1:["Private motor insurance","Standard policy cover","Road Traffic Act only","Third party only (TPO)","Third party, fire and theft (TPFT)","Comprehensive","No claims discount (NCD)","Uninsured driver promise","Optional extensions","Breakage of glass","Personal belongings and clothing","Young additional drivers","Loss of use","Personal accident benefits","Foreign use","Elections","Racing, competitions, rallies and trials","Caravans and trailers","Breakdown cover","Motor legal expenses","Joint policies","Multi car policies","Misfuelling","Exclusions","Motorcycle insurance","Commercial motor insurance","Third party liability","Loss of or damage to the vehicle","Trailers","Limitations"],2:["Personal accident and sickness","Standard policy cover","Accident cover","Sickness cover","Policy benefits","Death","Total loss of (sight in) one or both eyes","Total loss of one or both limbs","Permanent total disablement","Permanent partial disablement","Temporary total disablement","Temporary partial disablement","Medical expenses","Optional extensions","Limitations","Geographical limits","Age limits","Exclusions","Medical expenses insurance"],3:["Introduction","Household insurance","Building insurance","Contents insurance","Personal possessions","Legal liability","Travel insurance","Commercial packages","Shopkeepers","Office","Tradesman","Hotel"],4:["Fire and special perils","Theft insurance","Glass insurance","Money insurance","All risks","Engineering"],5:["Legal expenses insurance","Business interruption insurance","Material damage warranty","Fidelity","Credit insurance"],6:["Employers’ liability insurance","Employers' liability insurance","Standard policy cover","Definition of employee","Public liability insurance","Product liability insurance","Directors’ and officers’ D&O","Professional indemnity","Trustee insurance","Cyber insurance","Extended warranties"]},Af=[{raw:"Introduction",as:"Private motor insurance"},{raw:"A Private motor insurance",as:"Private motor insurance"},{raw:"A1 Standard policy cover",as:"Standard policy cover"},{raw:"A1A Road Traffic Act only",as:"Road Traffic Act only"},{raw:"A1B Third party only (TPO)",as:"Third party only (TPO)"},{raw:"A1C Third party, fire and theft (TPFT)",as:"Third party, fire and theft (TPFT)"},{raw:"A1D Comprehensive",as:"Comprehensive"},{raw:"A1E No claims discount (NCD)",as:"No claims discount (NCD)"},{raw:"A1F Uninsured driver promise",as:"Uninsured driver promise"},{raw:"A2 Optional extensions",as:"Optional extensions"},{raw:"A2A Breakage of glass",as:"Breakage of glass"},{raw:"A2B Personal belongings and clothing",as:"Personal belongings and clothing"},{raw:"A2C Young additional drivers",as:"Young additional drivers"},{raw:"A2D Loss of use",as:"Loss of use"},{raw:"A2E Personal accident benefits",as:"Personal accident benefits"},{raw:"A2F Foreign use",as:"Foreign use"},{raw:"A2G Elections",as:"Elections"},{raw:"A2H Racing, competitions, rallies and trials",as:"Racing, competitions, rallies and trials"},{raw:"A2I Caravans and trailers",as:"Caravans and trailers"},{raw:"A2J Breakdown cover",as:"Breakdown cover"},{raw:"A2K Motor legal expenses",as:"Motor legal expenses"},{raw:"A2L Joint policies",as:"Joint policies"},{raw:"A2M Multi car policies",as:"Multi car policies"},{raw:"A2N Misfuelling",as:"Misfuelling"},{raw:"A3 Exclusions",as:"Exclusions"},{raw:"A3A Use of the insured vehicle",as:"Use of the insured vehicle"},{raw:"B Motorcycle insurance",as:"Motorcycle insurance"},{raw:"B1 Standard policy cover",as:"Motorcycle insurance"},{raw:"B2 Optional extensions",as:"Motorcycle insurance"},{raw:"B3 Limitations",as:"Motorcycle insurance"},{raw:"C Commercial motor insurance",as:"Commercial motor insurance"},{raw:"C1 Standard policy cover",as:"Commercial motor insurance"},{raw:"C1A Third party liability",as:"Third party liability"},{raw:"C1B Loss of or damage to the vehicle",as:"Loss of or damage to the vehicle"},{raw:"C1C Trailers",as:"Trailers"},{raw:"C1D Private motor policies only",as:"Private motor policies only"},{raw:"C2 Optional extensions",as:"Commercial motor insurance"},{raw:"C3 Limitations",as:"Limitations"}];let Mo=null;function Ul(e){return e.toLowerCase().replace(/[’']/g,"'").replace(/\(.*?\)/g," ").replace(/insurance$/i,"").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}function Ef(e,n){const t=Ul(e),i=Ul(n);if(!t||!i)return!1;if(t===i||t.startsWith(i)||i.startsWith(t))return!0;const r=new Set(t.split(" ").filter(a=>a.length>2)),o=i.split(" ").filter(a=>a.length>2);if(!o.length||!r.size)return!1;const s=o.filter(a=>r.has(a)).length;return s/o.length>=.8&&s>=2}function zl(e){return e.map(n=>n.text).join(`
`)}function $l(e,n){let t=e.replace(/\u00ad/g,"");return t=t.replace(/^Chapter 1\s*$/gm,""),t=t.replace(/Chapter 1\s*Chapter 1[^\n]*/g,`
`),t=t.replace(/Chapter 1\s*\d+\/\d+\s*IF2\/[^\n]*/g,`
`),t=t.replace(/Chapter 1\s*Motor insurance\s*\d+\/\d+/g,`
`),t=t.replace(/^\d+\s+IF2\/.*$/gm,""),t=t.replace(/^IF2\/\d{4}.*$/gm,""),t=t.replace(new RegExp(`^${n}:\\s+[^\\n]+\\s+\\d+\\s*$`,"gm"),""),t=t.replace(/^\d+\s+IF2\/July 2026.*$/gm,""),t=t.replace(/Contents Syllabus learning[\s\S]*?(?=\nIntroduction\n|\nA )/g,`
`),t=t.replace(/Learning objectives[\s\S]*?(?=\nIntroduction\n|\nA )/g,`
`),t=t.replace(/This chapter features explanations[\s\S]*?(?=\nA )/g,`
`),t=t.replace(/Key terms\n[\s\S]*?(?=\nA )/g,`
`),t=t.replace(/^[A-C](\d+[A-Z]?)?\s+[^\n]{1,70}\s+1\.1\s*/gm,""),t=t.replace(/^Key points\s*$/gm,""),t=t.replace(/Refer to\nSee[^\n]+(\n[^\n]+)?/g,`
`),t=t.replace(/On the Web\n[\s\S]*?(?=\n[A-Z])/g,`
`),t=t.replace(/Question \d+\.\d+\n[\s\S]*?(?=\n[A-C]\d|[A-Z][a-z]{3,})/g,`
`),t=t.replace(/Self-test questions[\s\S]*$/g,`
`),t=t.replace(/Question answers[\s\S]*?(?=Self-test|$)/g,`
`),t=t.replace(/Key points\nThe main ideas covered[\s\S]*?(?=Question answers|Self-test|$)/g,`
`),t=t.replace(/\s*•\s*/g,`
• `),t}function jf(e,n){const t=[n,n.replace(/\s*\(.*?\)\s*/g," ").replace(/\s+/g," ").trim()],i=[];for(const r of t){if(!r)continue;const o=new RegExp(`(?:^|\\n)\\s*${Lf(r)}\\s*(?:\\n|$)`,"i");let s=0;const a=e;for(;s<a.length;){const l=a.slice(s),c=o.exec(l);if(!c||c.index==null)break;const p=s+c.index+(c[0].startsWith(`
`)?1:0);i.includes(p)||i.push(p),s=p+r.length}}return i}function Lf(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/’/g,"[’']").replace(/'/g,"[’']")}function Hl(e,n){const t=[];for(const o of n)for(const s of jf(e,o.raw))t.push({heading:o.as,at:s,rawLen:o.raw.length});t.sort((o,s)=>o.at-s.at||s.rawLen-o.rawLen);const i=[];for(const o of t){const s=i[i.length-1];s&&Math.abs(o.at-s.at)<3||i.push(o)}const r=[];for(let o=0;o<i.length;o++){const s=i[o].at+i[o].rawLen,a=o+1<i.length?i[o+1].at:e.length,l=e.slice(s,a).trim().replace(/^(insurance|cover)\s+/i,"").trim(),c=r[r.length-1];c&&c.heading===i[o].heading?c.body=`${c.body}

${l}`.trim():r.push({heading:i[o].heading,body:l})}return r.filter(o=>o.body.replace(/\s+/g," ").length>40)}function Nf(e,n){return!e||!n||n.startsWith("•")||n.startsWith("- ")||e.startsWith("•")&&n.startsWith("•")?!1:e.startsWith("•")&&!/[.!?]$/.test(e)?!0:/^[A-Z][A-Za-z’']{0,28}$/.test(n)&&n.length<32?!1:!!(e.endsWith("-")&&/^[a-z]/.test(n)||e.startsWith("•")&&/^[a-z(]/.test(n)||/[.,;:]$/.test(e)&&!/^[A-Z]/.test(n)||!/[.!?]$/.test(e)&&/^[a-z(]/.test(n))}function Ff(e){const n=e.split(/\n/).map(i=>i.replace(/[ \t]+/g," ").trim()).filter(Boolean),t=[];for(const i of n){const r=t[t.length-1];r&&Nf(r,i)?r.endsWith("-")&&/^[a-z]/.test(i)?t[t.length-1]=r.slice(0,-1)+i:t[t.length-1]=`${r} ${i}`:t.push(i)}return t}function Kl(e){const n=Ff(e),t=[];let i=[],r=[];const o=()=>{const a=i.join(" ").replace(/\s+/g," ").trim();a&&t.push({body:a}),i=[]},s=()=>{r.length&&t.push({body:"",bullets:[...r]}),r=[]};for(const a of n){if(a.startsWith("•")||a.startsWith("- ")){o(),r.push(a.replace(/^•\s*|^-\s*/,"").replace(/;+\s*$/,"").trim());continue}r.length&&s(),/^(Remember,|Be aware|It is important)/i.test(a)||a.length>40||/[.!?]$/.test(a)||i.length&&i[i.length-1].length<80||o(),i.push(a)}return o(),s(),t.filter(a=>a.body&&a.body.length>1||a.bullets&&a.bullets.length)}function Mf(e){const n=["Third party only","Third party, fire and theft","No claims discount","Employers’ liability","Employers' liability","Public liability","Product liability","Directors’ and officers’","Extended warranty"];return[...Pf[e],...n].map(t=>({raw:t,as:t}))}function Df(){var i;const e=new Map,n=Bl.keyFacts;for(const r of n){const o=$l(zl(r.pages),r.chapter),a=Hl(o,Mf(r.chapter)).map(l=>{const c=Kl(l.body).filter(p=>{const g=(p.body||"").trim();return!(/1\.1/.test(g)&&g.length<160||/^Key points$/i.test(g))});return{heading:l.heading,chunks:c,text:c.map(p=>[p.body,...p.bullets??[]].filter(Boolean).join(" ")).join(" "),sources:[{kind:"key-facts",chapter:r.chapter,section:l.heading,locator:`IF2 2026 Key Facts ch.${r.chapter} — ${l.heading}`}]}});e.set(`kf:${r.chapter}`,a)}const t=(i=Bl.studyText)==null?void 0:i[0];if(t){const r=$l(zl(t.pages),1),s=Hl(r,Af).map(a=>{const l=Kl(a.body).filter(c=>{const p=(c.body||"").trim();return!(/1\.1/.test(p)&&p.length<160||/^Key points$/i.test(p))});return{heading:a.heading,chunks:l,text:l.map(c=>[c.body,...c.bullets??[]].filter(Boolean).join(" ")).join(" "),sources:[{kind:"study-text",chapter:1,section:a.heading,locator:`IF2 2026 Study Text ch.1 — ${a.heading}`}]}});e.set("st:1",s)}return e}function qf(){return Mo||(Mo=Df()),Mo}function Gl(e,n,t){var s;const i=e.filter(a=>Ef(a.heading,n));if(!i.length)return null;if(i.length===1)return i[0];const r=t.map(a=>a.claim.replace(/\[\[|\]\]/g,"").slice(0,48).toLowerCase()).filter(Boolean);return((s=i.map(a=>{const l=a.text.toLowerCase(),c=r.reduce((p,g)=>p+(l.includes(g.slice(0,24))?1:0),0)+a.text.length/4e3;return{m:a,score:c}}).sort((a,l)=>l.score-a.score)[0])==null?void 0:s.m)??i[0]}function Vl(e,n){const t=new Set(e.chunks.map(o=>{var s;return(o.body||((s=o.bullets)==null?void 0:s.join(" "))||"").slice(0,80)})),i=n.chunks.filter(o=>{var s;return!t.has((o.body||((s=o.bullets)==null?void 0:s.join(" "))||"").slice(0,80))}),r=i.length?[...e.chunks,...i]:e.chunks.length>=n.chunks.length?e.chunks:n.chunks;return{heading:e.heading,chunks:r,text:r.map(o=>[o.body,...o.bullets??[]].filter(Boolean).join(" ")).join(" "),sources:[...e.sources,...n.sources.filter(o=>!e.sources.some(s=>s.locator===o.locator))]}}function Wf(e,n,t=[]){const i=qf(),r=Gl(i.get(`kf:${e}`)??[],n,t),o=e===1?Gl(i.get("st:1")??[],n,t):null;return o&&r?o.text.length>=r.text.length?Vl(o,r):Vl(r,o):o??r}const ce=[...mf,...yf,...gf],gu=[...vf,...wf];function Es(e){const n=[],t=/\[\[(.+?)\]\]/g;let i;for(;i=t.exec(e);)n.push(i[1]);return n}function Do(e,n){const t=n.replace(/\[\[|\]\]/g,"").toLowerCase().replace(/\s+/g," ").trim();if(t.length<24)return e.includes(t);if(e.includes(t.slice(0,36)))return!0;const i=t.split(/[^a-z0-9£.]+/).filter(r=>r.length>4);return i.length?i.filter(r=>e.includes(r)).length/i.length>=.72:!1}function ve(e){return e.replace(/\[\[(.+?)\]\]/g,"$1")}function Rf(e){const n=Es(e);let t=0;return{prompt:e.replace(/\[\[(.+?)\]\]/g,()=>(t+=1,`[${t}]`)).replace(/\s+/g," ").trim(),answers:n}}function Of(e){return[ve(e.claim),e.extra].filter(Boolean).join(`

`)}function no(){const e=new Map;for(const n of ce){const t=e.get(n.conceptId),i=n.sources;t?(t.factIds.push(n.id),t.confusedWith=[...new Set([...t.confusedWith,...n.confusedWith??[]])],t.prerequisites=[...new Set([...t.prerequisites,...n.prerequisites??[]])],n.importance==="core"&&(t.importance="core"),t.sources=_f(t.sources,i)):e.set(n.conceptId,{id:n.conceptId,title:n.title,chapter:n.chapter,section:n.section,syllabusOutcomes:["1.1"],summary:ve(n.claim),importance:n.importance,prerequisites:n.prerequisites??[],confusedWith:n.confusedWith??[],factIds:[n.id],sources:i})}return[...e.values()]}function _f(e,n){const t=new Set(e.map(r=>r.locator)),i=[...e];for(const r of n)t.has(r.locator)||i.push(r);return i}function vu(){var i;const e=no(),n=new Map;for(const r of ce){const o=n.get(r.conceptId)??[];o.push(r),n.set(r.conceptId,o)}const t=[];for(const r of e){const o=n.get(r.id)??[],s=r.importance==="core"?3:r.importance==="supporting"?2:1;t.push({id:`unit-${r.id}`,chapter:r.chapter,title:r.title,conceptIds:[r.id],factIds:o.map(a=>a.id),load:Math.min(5,s+Math.min(2,o.length-1)),prerequisites:r.prerequisites.map(a=>`unit-${a}`),reading:o.map(a=>({heading:a.title,body:Of(a),sources:a.sources})),prediction:(i=o.find(a=>a.prediction))==null?void 0:i.prediction,comparisonTable:yu(r.chapter,o,0)})}return t.sort((r,o)=>{if(r.chapter!==o.chapter)return r.chapter-o.chapter;const s=ce.findIndex(l=>l.conceptId===r.conceptIds[0]),a=ce.findIndex(l=>l.conceptId===o.conceptIds[0]);return s-a})}function Bf(e,n,t){const i=n.toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");let r=`sec-${e}-${i||"section"}`,o=2;for(;t.has(r);)r=`sec-${e}-${i||"section"}-${o}`,o+=1;return t.add(r),r}function wu(){const e=[],n=new Map;for(const s of ce){const a=`${s.chapter}::${s.section}`,l=n.get(a);l==null?(n.set(a,e.length),e.push({chapter:s.chapter,title:s.section,facts:[s]})):e[l].facts.push(s)}const t={1:0,2:0,3:0,4:0,5:0,6:0};for(const s of e)t[s.chapter]+=1;const i={1:0,2:0,3:0,4:0,5:0,6:0},r=new Set,o={};for(const s of ce)o[s.conceptId]||(o[s.conceptId]=s.title);return e.map(s=>{i[s.chapter]+=1;const a=[...new Set(s.facts.map(m=>m.conceptId))],l=Wf(s.chapter,s.title,s.facts),c=_l(s.facts[0],o),p=[],g=()=>p.map(m=>`${m.body} ${(m.bullets??[]).join(" ")}`).join(" ").toLowerCase();return l!=null&&l.chunks.length&&l.chunks.forEach((m,w)=>{var d;p.push({heading:w===0?void 0:m.heading,body:m.body,bullets:m.bullets,sources:l.sources,role:w===0?"open":"fact",factId:(d=s.facts[Math.min(w,s.facts.length-1)])==null?void 0:d.id,hold:w===0?c:void 0})}),s.facts.forEach((m,w)=>{const d=ve(m.claim),b=g(),C=m.sources.some(f=>f.kind==="exam-guide");(!(l!=null&&l.chunks.length)||C||l.text.length<400&&!Do(b,d))&&!Do(b,d)&&p.push({body:d,sources:m.sources,role:bf(m,w),factId:m.id,hold:p.some(f=>f.hold)?void 0:_l(m,o)}),m.extra&&!(l&&l.text.length>500)&&!Do(g(),m.extra)&&p.push({body:m.extra,sources:m.sources,role:m.kind==="exclusion"?"trap":"why",factId:m.id})}),p.length?p[0].hold||(p[0].hold=c):p.push({body:ve(s.facts[0].claim),sources:s.facts[0].sources,role:"open",factId:s.facts[0].id,hold:c}),{id:Bf(s.chapter,s.title,r),chapter:s.chapter,chapterTitle:an[s.chapter].title,title:s.title,indexInChapter:i[s.chapter],sectionCountInChapter:t[s.chapter],conceptIds:a,factIds:s.facts.map(m=>m.id),lede:i[s.chapter]===1?xf(s.chapter):void 0,traps:[...If(s.chapter,i[s.chapter]),...kf(s.facts,o)].slice(0,4),reading:p,comparisonTable:yu(s.chapter,s.facts,i[s.chapter])}})}function Uf(e){return{id:e.id,chapter:e.chapter,title:e.title,conceptIds:e.conceptIds,factIds:e.factIds,load:Math.min(5,Math.max(1,e.conceptIds.length)),prerequisites:[],reading:e.reading.map(n=>({heading:n.heading||e.title,body:n.body,sources:n.sources,factId:n.factId,hold:n.hold})),comparisonTable:e.comparisonTable}}function zf(e){return{id:e.id,type:"mcq",conceptIds:e.conceptIds,factIds:e.factIds,skill:e.cognitive==="application"?"apply":e.cognitive==="understanding"||e.cognitive==="distinction"?"understand":"know",recognition:!0,prompt:e.stem,options:[...e.options],correctIndex:e.correct,expected:[e.options[e.correct]],rubric:e.whyCorrect,whyCorrect:e.whyCorrect,whyWrong:[...e.whyWrong],sources:e.sources,examStyle:e.examStyle,difficulty:e.difficulty,questionKind:e.kind,cognitive:e.cognitive,misconception:e.misconception,chapter:e.chapter,lo:e.lo,shuffle:!0}}function bu(){const e=gu.map(zf),n=new Set(e.map(i=>i.prompt.trim().toLowerCase()));for(const i of ce){const{prompt:r,answers:o}=Rf(i.claim);if(o.length&&(e.push({id:`cloze-${i.id}`,type:"cloze",conceptIds:[i.conceptId],factIds:[i.id],skill:i.skill,recognition:!1,prompt:`Reconstruct the missing IF2 point.

${r}`,expected:o,rubric:ve(i.claim),sources:i.sources,questionKind:"cloze",cognitive:"understanding",chapter:i.chapter,lo:"1.1"}),e.push({id:`recall-${i.id}`,type:"free-recall",conceptIds:[i.conceptId],factIds:[i.id],skill:i.skill,recognition:!1,prompt:`Without looking back: ${i.teachBackCue??`state the key rule for “${i.title}”.`}`,expected:o,rubric:ve(i.claim),sources:i.sources,questionKind:"production",cognitive:"understanding",chapter:i.chapter,lo:"1.1"})),i.prediction&&e.push({id:`pred-${i.id}`,type:"prediction",conceptIds:[i.conceptId],factIds:[i.id],skill:i.skill,recognition:!1,prompt:i.prediction,expected:o.length?o:[ve(i.claim)],rubric:ve(i.claim),sources:i.sources,questionKind:"production",chapter:i.chapter,lo:"1.1"}),i.teachBackCue&&e.push({id:`teach-${i.id}`,type:"teach-back",conceptIds:[i.conceptId],factIds:[i.id],skill:"understand",recognition:!1,prompt:i.teachBackCue,expected:o.length?o:[ve(i.claim)],rubric:ve(i.claim),sources:i.sources,questionKind:"production",chapter:i.chapter,lo:"1.1"}),i.mcq){const s=i.mcq.stem.trim().toLowerCase();n.has(s)||(n.add(s),e.push({id:`mcq-${i.id}`,type:"mcq",conceptIds:[i.conceptId],factIds:[i.id],skill:i.skill,recognition:!0,prompt:i.mcq.stem,options:[...i.mcq.options],correctIndex:i.mcq.correct,expected:[i.mcq.options[i.mcq.correct]],rubric:i.mcq.whyWrong[i.mcq.correct],whyCorrect:i.mcq.whyWrong[i.mcq.correct],whyWrong:[...i.mcq.whyWrong],sources:i.sources,examStyle:i.sources.some(a=>a.kind==="exam-guide"),questionKind:"knowledge",cognitive:"recognition",chapter:i.chapter,lo:"1.1",shuffle:!0})),e.push({id:`why-${i.id}`,type:"why-wrong",conceptIds:[i.conceptId],factIds:[i.id],skill:"understand",recognition:!1,prompt:`The question was: “${i.mcq.stem}”
A wrong option is: “${i.mcq.options.find((a,l)=>l!==i.mcq.correct)}”.
Why is that option wrong?`,expected:i.mcq.whyWrong.filter((a,l)=>l!==i.mcq.correct),rubric:i.mcq.whyWrong.filter((a,l)=>l!==i.mcq.correct).join(" / "),sources:i.sources,questionKind:"production",chapter:i.chapter,lo:"1.1"})}i.scenario&&e.push({id:`scen-${i.id}`,type:"scenario",conceptIds:[i.conceptId],factIds:[i.id],skill:"apply",recognition:!1,prompt:`${i.scenario.setup}

${i.scenario.question}`,expected:[i.scenario.answer],rubric:i.scenario.answer,sources:i.sources,questionKind:"production",cognitive:"application",chapter:i.chapter,lo:"1.1"}),i.kind==="exclusion"&&e.push({id:`err-${i.id}`,type:"error-correction",conceptIds:[i.conceptId],factIds:[i.id],skill:"understand",recognition:!1,prompt:`A colleague says: “${Kf(ve(i.claim))}”
Correct them in one or two sentences, from IF2.`,expected:Es(i.claim).length?Es(i.claim):[ve(i.claim)],rubric:ve(i.claim),sources:i.sources,questionKind:"production",chapter:i.chapter,lo:"1.1"})}return e.push({id:"compare-rta-tpo",type:"compare",conceptIds:["motor-rta","motor-tpo"],factIds:["m-rta-tppd","m-tpo-extras"],skill:"understand",recognition:!1,prompt:"Distinguish RTA only from third party only for a private car. Name at least two differences that IF2 treats as standard.",expected:["£1.2 million","£20 million","off road","territorial","driving other"],rubric:"TPO usually adds off-road/territorial cover, £20m TPPD for private cars (vs £1.2m RTA), driving-other-cars (often), wider insured persons and defence costs.",sources:ce.find(i=>i.id==="m-tpo-extras").sources,questionKind:"production",cognitive:"distinction",chapter:1,lo:"1.1"}),e.push({id:"compare-tpft-comp",type:"compare",conceptIds:["motor-tpft","motor-comp"],factIds:["m-tpft","m-comp"],skill:"understand",recognition:!1,prompt:"What is the main extra that comprehensive adds over TPFT?",expected:["accidental","malicious","all risks"],rubric:"Accidental and malicious damage to the insured’s car, on an all-risks-of-own-damage basis with listed exclusions.",sources:ce.find(i=>i.id==="m-comp").sources,questionKind:"production",chapter:1,lo:"1.1"}),e.push({id:"compare-el-pl",type:"distinction",conceptIds:["el-cover","pl-cover"],factIds:["l-el-injury-only","l-pl"],skill:"understand",recognition:!1,prompt:"A hotel chef burns a guest and, separately, a waiter. Which liability class responds to each, according to IF2?",expected:["public liability","employers’ liability","employee"],rubric:"Guest: public liability. Waiter/employee: employers’ liability.",sources:ce.find(i=>i.id==="l-pl").sources,questionKind:"production",cognitive:"distinction",chapter:6,lo:"1.1"}),e.push({id:"classify-product-family",type:"classify",conceptIds:["extended-warranty","hh-contents","products-cover"],factIds:["l-ew"],skill:"apply",recognition:!0,prompt:"A buyer’s TV fails 14 months after purchase. Which product is the claim considered under if they bought extra cover for defects after the guarantee?",options:["All risks","Extended warranty","Legal expenses","Products liability"],correctIndex:1,expected:["Extended warranty"],rubric:"Specimen Q36: extended warranty.",sources:ce.find(i=>i.id==="l-ew").sources,examStyle:!0,questionKind:"scenario",cognitive:"application",chapter:6,lo:"1.1",shuffle:!0}),e.push({id:"summary-motor-levels",type:"summary",conceptIds:["motor-cover-levels"],factIds:["m-four-levels"],skill:"understand",recognition:!1,prompt:"In one sentence, list the four private motor cover levels from narrowest to widest.",expected:["RTA","third party only","TPFT","comprehensive"],rubric:"RTA only, TPO, TPFT, comprehensive.",sources:ce.find(i=>i.id==="m-four-levels").sources,questionKind:"production",chapter:1,lo:"1.1"}),Hf(e,no(),ce)}function $f(e,n,t){const i=[...e.confusedWith.flatMap(o=>n.filter(s=>s.conceptId===o)),...n.filter(o=>o.conceptId!==e.id&&o.chapter===e.chapter),...n.filter(o=>o.conceptId!==e.id)],r=[];for(const o of i){const s=ku(ve(o.claim),140);if(!(!s||s===t||r.includes(s))&&(r.push(s),r.length===3))break}return r}function Hf(e,n,t){var o;const i=[],r=new Set(e.map(s=>s.prompt.trim().toLowerCase()));for(const s of n){const a=e.filter(c=>c.type==="mcq"&&c.conceptIds.includes(s.id)).length+i.filter(c=>c.conceptIds.includes(s.id)).length,l=t.filter(c=>c.conceptId===s.id);for(let c=a;c<2;c++){const p=l[c%Math.max(1,l.length)]??t.find(C=>C.conceptId===s.id);if(!p)continue;const g=ku(ve(p.claim),140),m=$f(s,t,g);if(m.length<3)continue;const w=c===0?`Which statement about “${s.title}” is correct according to the IF2 materials?`:`According to IF2, which of the following is true of ${s.title}?`,d=w.trim().toLowerCase(),b=r.has(d)?`${w} (${p.id})`:w;r.add(b.trim().toLowerCase()),i.push({id:`mcq-auto-${s.id}-${c}`,type:"mcq",conceptIds:[s.id],factIds:[p.id],skill:p.skill,recognition:!0,prompt:b,options:[g,m[0],m[1],m[2]],correctIndex:0,expected:[g],rubric:((o=p.sources[0])==null?void 0:o.locator)??g,whyCorrect:`${g} (${p.sources.map(C=>C.locator).join("; ")})`,whyWrong:["This is the sourced statement for this concept.",`A neighbouring IF2 claim (${m[0].slice(0,48)}…) — not this concept’s rule.`,`A neighbouring IF2 claim (${m[1].slice(0,48)}…) — not this concept’s rule.`,`A neighbouring IF2 claim (${m[2].slice(0,48)}…) — not this concept’s rule.`],sources:p.sources,questionKind:"which-correct",cognitive:"understanding",chapter:s.chapter,lo:"1.1",shuffle:!0,difficulty:2})}}return[...e,...i]}function ku(e,n){const t=e.replace(/\s+/g," ").trim();return t.length<=n?t:t.slice(0,n-1)+"…"}function Kf(e){return`This is never excluded and always paid in full: ${e.slice(0,140)}`}function Gf(){const e=no(),n=vu(),t=bu(),i=o=>ce.filter(s=>s.chapter===o).length,r=t.filter(o=>o.type==="mcq");return{facts:ce.length,concepts:e.length,units:n.length,sections:wu().length,items:t.length,mcq:r.length,examStyleMcq:r.filter(o=>o.examStyle).length,factsByChapter:{1:i(1),2:i(2),3:i(3),4:i(4),5:i(5),6:i(6)},conceptsByChapter:{1:e.filter(o=>o.chapter===1).length,2:e.filter(o=>o.chapter===2).length,3:e.filter(o=>o.chapter===3).length,4:e.filter(o=>o.chapter===4).length,5:e.filter(o=>o.chapter===5).length,6:e.filter(o=>o.chapter===6).length},chapters:an,syllabus:{outcome:"1.1",examQuestions:36,flexibility:"±2",assessment:"100 MCQs, 2 hours, English law, 2026 syllabus",outOfScope:"Chapters 7–13 / LOs 1.2–7 are not modelled in this build"}}}let Yi=null;function ue(){return Yi||(Yi={facts:ce,factById:Object.fromEntries(ce.map(e=>[e.id,e])),concepts:no(),units:vu(),sections:wu(),items:bu(),questions:gu,stats:Gf()},Yi)}function et(e){return{conceptId:e,exposures:0,successfulRetrievals:0,failedRetrievals:0,productionSuccesses:0,recognitionSuccesses:0,mcqAttempts:0,mcqCorrect:0,recallAttempts:0,recallCorrect:0,applicationAttempts:0,applicationCorrect:0,itemsAttempted:[],firstSeenAt:null,firstSuccessAt:null,explainedAt:null,partialFlags:0,confidentErrors:0,lastConfidence:null,lastOutcome:null,lastSeenAt:null,lastSuccessAt:null,lastFailAt:null,latenciesMs:[],confusedWithHits:{},estimatedMastery:0,accessibility:0,nextDueAt:null,intervalDays:0,successiveCriterionHits:0,delayedSuccesses:0}}function to(e,n){return{...et(n),...e,conceptId:n,itemsAttempted:(e==null?void 0:e.itemsAttempted)??[]}}function qr(){const e={};for(const n of ue().concepts)e[n.id]=et(n.id);return{version:2,createdAt:Date.now(),concepts:e,sessionCount:0,recentAccuracy:[],revealCountByFact:{},examReadiness:{"1.1":0},questionStats:{},examAttempts:[],seenFacts:{}}}function Vf(e,n){if(!e.lastSuccessAt)return 0;const t=(n-e.lastSuccessAt)/36e5;return e.accessibility*Math.exp(-t/18)}function Nn(e,n){const t=Vf(e,n),i=e.productionSuccesses,r=e.recognitionSuccesses,o=e.mcqCorrect,s=e.failedRetrievals,a=e.confidentErrors,l=e.successiveCriterionHits,c=e.delayedSuccesses,p=.28*Math.min(1,i/4)+.16*Math.min(1,r/6)+.18*Math.min(1,o/4)+.18*Math.min(1,l/3)+.12*Math.min(1,c/2)+.08*t,g=Math.min(.7,s*.05+a*.14+e.partialFlags*.03),m=Yf(p-g,0,1);return{...e,accessibility:t,estimatedMastery:m}}function xu(e,n){const t=Nn(to(e.concepts[n.conceptId],n.conceptId),n.now),i={...t};i.lastSeenAt=n.now,i.lastConfidence=n.confidence,i.latenciesMs=[...i.latenciesMs.slice(-20),n.latencyMs],i.exposures+=1,i.firstSeenAt||(i.firstSeenAt=n.now),n.item&&!i.itemsAttempted.includes(n.item.id)&&(i.itemsAttempted=[...i.itemsAttempted,n.item.id].slice(-40));const r=n.item,o=(r==null?void 0:r.type)==="mcq"||(r==null?void 0:r.type)==="classify",s=(r==null?void 0:r.cognitive)==="application"||(r==null?void 0:r.type)==="scenario"||(r==null?void 0:r.questionKind)==="scenario",a=(r==null?void 0:r.type)==="free-recall"||(r==null?void 0:r.type)==="teach-back"||(r==null?void 0:r.type)==="cloze"||(r==null?void 0:r.type)==="summary";o&&(i.mcqAttempts+=1),a&&(i.recallAttempts+=1),s&&(i.applicationAttempts+=1);const l=n.confidence>=4,c=n.confidence<=2;let p="gap";if(n.success)i.lastOutcome=n.partial?"partial":"success",i.successfulRetrievals+=1,i.lastSuccessAt=n.now,i.firstSuccessAt?n.now-i.firstSuccessAt>=12*36e5&&(i.delayedSuccesses+=1):i.firstSuccessAt=n.now,n.recognition?i.recognitionSuccesses+=1:i.productionSuccesses+=1,o&&(i.mcqCorrect+=1),a&&n.success&&(i.recallCorrect+=1),s&&(i.applicationCorrect+=1),i.accessibility=Math.min(1,.55+(n.recognition?.15:.35)),!n.recognition&&!n.partial&&(i.successiveCriterionHits+=1),o&&!n.partial&&(i.successiveCriterionHits+=0),n.partial&&(i.partialFlags+=1),c&&(p="low-confidence-error");else{i.lastOutcome="fail",i.failedRetrievals+=1,i.lastFailAt=n.now,i.successiveCriterionHits=0,i.accessibility=Math.max(0,i.accessibility*.4),n.confusedWith&&(i.confusedWithHits[n.confusedWith]=(i.confusedWithHits[n.confusedWith]??0)+1);const d=t.estimatedMastery>.55&&n.latencyMs<4e3&&!l;l?(p="confident-error",i.confidentErrors+=1):d?p="slip":n.confusedWith||r!=null&&r.misconception?p="misconception":p=c?"low-confidence-error":"gap"}let g=e.questionStats??{};if(r){const d=g[r.id]??{seen:0,correct:0};g={...g,[r.id]:{seen:d.seen+1,correct:d.correct+(n.success?1:0),lastAt:n.now,lastCorrect:n.success}}}const m={...e.concepts,[n.conceptId]:Nn(i,n.now)},w=[...e.recentAccuracy,n.success?1:0].slice(-12);return{model:{...e,concepts:m,recentAccuracy:w,questionStats:g},errorClass:p}}function Qf(e,n,t){const i=to(e.concepts[n],n),r={...i,exposures:i.exposures+1,lastSeenAt:t,firstSeenAt:i.firstSeenAt??t,explainedAt:i.explainedAt??t};return{...e,concepts:{...e.concepts,[n]:r}}}function io(e){const t=ue().concepts.filter(a=>a.importance==="core");if(!t.length)return 0;const i=(e.examAttempts??[]).slice(-3),r=i.length?i.reduce((a,l)=>a+l.correct/Math.max(1,l.n),0)/i.length:0;let o=0,s=0;for(const a of t){const l=Nn(to(e.concepts[a.id],a.id),Date.now()),c=Math.min(1,l.mcqCorrect/3),p=Math.min(1,l.delayedSuccesses/2),g=.45*c+.2*l.estimatedMastery+.15*p+.2*r;s+=g,o+=1}return o?s/o:0}function Yf(e,n,t){return Math.max(n,Math.min(t,e))}function Cu(e){const n=qr(),t={...n.concepts};for(const[i,r]of Object.entries(e.concepts??{}))t[i]=to(r,i);return{...n,...e,version:2,concepts:t,questionStats:e.questionStats??{},examAttempts:e.examAttempts??[],seenFacts:e.seenFacts??{}}}const Ql=864e5;function Jf(e,n=Date.now()){const t=e.exposures>0||!!e.firstSeenAt,i=t,r=!!e.explainedAt||e.exposures>0,o=e.successfulRetrievals+e.failedRetrievals>0,s=e.applicationAttempts>0,a=!!e.firstSuccessAt&&!!e.lastSuccessAt&&e.lastSuccessAt-e.firstSuccessAt>=12*36e5&&e.delayedSuccesses>0,l=e.mcqCorrect>0||e.recognitionSuccesses>0,c=e.recallCorrect>0||e.productionSuccesses>0,p=e.mcqCorrect>=2&&e.successiveCriterionHits>=1;return{encountered:t,introduced:i,explained:r,retrieved:o,applied:s,revisitedAfterDelay:a,recognized:l,explainedInOwnWords:c,mcqReady:p}}function Xf(e){return e.revisitedAfterDelay&&e.mcqReady?"Holds after a gap":e.applied&&e.recognized?"Can apply":e.explainedInOwnWords?"Can explain":e.recognized?"Can recognise":e.retrieved?"Attempted retrieval":e.explained?"Seen / explained":e.encountered?"Encountered":"Not yet in the journey"}function Zf(e,n,t,i,r=Date.now()){const o=new Map;for(const p of n)o.set(p.conceptId,(o.get(p.conceptId)??0)+1);const s=new Map;for(const p of t)if(p.type==="mcq")for(const g of p.conceptIds)s.set(g,(s.get(g)??0)+1);const a=e.map(p=>{const g=Nn(i.concepts[p.id]??et(p.id),r),m=Jf(g,r);return{id:p.id,title:p.title,chapter:p.chapter,factCount:o.get(p.id)??0,mcqCount:s.get(p.id)??0,flags:m,label:Xf(m),mastery:g.estimatedMastery,nextDueAt:g.nextDueAt}}),l=a.filter(p=>p.mcqCount<2),c=a.filter(p=>!p.flags.revisitedAfterDelay);return{conceptCount:a.length,missingMcq:l,unfinishedCount:c.length,journeyHoursEstimate:Math.round(a.length*.35),rows:a}}function em(e,n){if(!e.lastSuccessAt)return e.exposures?.7:1;const t=(n-e.lastSuccessAt)/Ql,i=e.nextDueAt?Math.max(0,(n-e.nextDueAt)/Ql):0;return Math.min(1,.2*t+.4*i+.25*e.confidentErrors+(1-e.estimatedMastery)*.3)}const Iu=864e5;function nm(e,n){const t={...e};if(!n.success)return n.errorClass==="confident-error"||n.errorClass==="misconception"?(t.intervalDays=.04,t.nextDueAt=n.now+40*60*1e3):n.errorClass==="slip"?(t.intervalDays=.3,t.nextDueAt=n.now+6*60*60*1e3):(t.intervalDays=.08,t.nextDueAt=n.now+2*60*60*1e3),t;const r=(e.lastSuccessAt?(n.now-e.lastSuccessAt)/6e4:999)<12,o=t.successiveCriterionHits,s=n.importance==="core"?.85:n.importance==="supporting"?1:1.15,a=n.recognition?.55:1;if(r&&o<2)return t.intervalDays=.01,t.nextDueAt=n.now+12*60*1e3,t;let l=.8;return o>=2&&(l=2),o>=3&&(l=6),t.estimatedMastery>.7&&o>=3&&(l=10),l*=s*a,t.confidentErrors>0&&(l*=.5),t.intervalDays=l,t.nextDueAt=n.now+l*Iu,t}function tm(e,n){const t=ue(),i=[];for(const r of t.concepts){const o=Nn(e.concepts[r.id]??et(r.id),n);if(o.exposures===0)continue;const s=o.nextDueAt!==null&&o.nextDueAt<=n,a=o.estimatedMastery>.2&&o.accessibility<.15&&o.lastSuccessAt&&n-o.lastSuccessAt>Iu;if(s||a||o.confidentErrors>0&&(o.nextDueAt??0)<=n){const l=r.importance==="core"?3:1,c=1-o.estimatedMastery+(o.confidentErrors?.4:0);i.push({id:r.id,score:l*c})}}return i.sort((r,o)=>o.score-r.score).map(r=>r.id)}function Wr(e,n){const{sections:t,concepts:i,factById:r}=ue(),o=Object.fromEntries(i.map(c=>[c.id,c])),s=c=>{var p;return(((p=e.seenFacts)==null?void 0:p[c])??0)>0},a=c=>{var p,g;return(((p=e.concepts[c])==null?void 0:p.estimatedMastery)??0)>=.25||(((g=e.concepts[c])==null?void 0:g.exposures)??0)>=1},l=(c,p)=>{for(const g of t.filter(m=>m.chapter===c)){const m=g.factIds.filter(d=>!s(d));if(!m.length)continue;if(p||m.every(d=>{var C,y;const b=(C=r[d])==null?void 0:C.conceptId;return(((y=o[b??""])==null?void 0:y.prerequisites)??[]).every(a)}))return g}return null};if(n)return l(n,!0);for(const c of[1,2,3,4,5,6]){const p=l(c,!1);if(p)return p}return null}function js(e,n){if(!e.nextDueAt)return"Not yet scheduled — still being encoded.";const t=Math.round((e.nextDueAt-n)/36e5);return e.successiveCriterionHits<2?`Returns soon (${t}h): only short-term accessibility so far, not successive relearning.`:e.confidentErrors?"Returns on a short leash because of a confident error — those traces are sticky if left.":`Next retrieval in about ${t} hours, scaled by demonstrated production success.`}function im(e,n=Math.random){const t=[...e];for(let i=t.length-1;i>0;i--){const r=Math.floor(n()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t}function Tu(e,n,t=Math.random){const i=e.map((o,s)=>({text:o,correct:s===n})),r=im(i,t);return{options:r.map(o=>o.text),correctIndex:r.findIndex(o=>o.correct)}}function rm(e,n,t=Date.now()){let r=ue().items.filter(d=>{var b;return d.type==="mcq"&&((b=d.options)==null?void 0:b.length)===4&&d.correctIndex!=null});if(n.mode==="chapter"&&n.chapter&&(r=r.filter(d=>d.chapter===n.chapter)),n.mode==="drill"){const d=Object.values(e.concepts).filter(C=>(C.mcqAttempts??0)>0&&C.mcqCorrect/Math.max(1,C.mcqAttempts)<.7).map(C=>C.conceptId),b=r.filter(C=>C.conceptIds.some(y=>d.includes(y)));b.length>=4&&(r=b)}const o=e.questionStats??{};r=[...r].sort((d,b)=>{const C=o[d.id],y=o[b.id],f=C?C.correct/C.seen:.5,v=y?y.correct/y.seen:.5,k=d.difficulty??2,I=b.difficulty??2;return k-I||f-v});const s=n.n??(n.mode==="full"?36:n.mode==="mixed"?12:n.mode==="chapter"?10:6),a=new Set,l=[],c=r.filter(d=>{var b;return(((b=o[d.id])==null?void 0:b.correct)??0)>0}),p=r.filter(d=>!o[d.id]||o[d.id].lastCorrect===!1),g=[],m=Math.max(c.length,p.length,r.length);for(let d=0;d<m;d++)p[d]&&g.push(p[d]),n.mode!=="drill"&&c[d]&&g.push(c[d]);const w=g.length?g:r;for(const d of w){const b=d.prompt.trim().toLowerCase();if(!a.has(b)&&(a.add(b),l.push(d),l.length>=s))break}for(;l.length<Math.min(s,r.length);){const d=r.find(b=>!l.includes(b));if(!d)break;l.push(d)}return l.map(d=>{const b=Tu(d.options,d.correctIndex);return{item:d,displayOptions:b.options,displayCorrect:b.correctIndex}})}function om(e,n){const t=rm(e,n);return{mode:n.mode,chapter:n.chapter,questions:t,answers:t.map(()=>null),current:0,startedAt:Date.now(),finished:!1}}function sm(e,n){const t={};let i=0;const r=Date.now();let o=e;n.questions.forEach((a,l)=>{const c=n.answers[l]===a.displayCorrect;c&&(i+=1);for(const p of a.item.conceptIds){const g=t[p]??{n:0,correct:0};g.n+=1,c&&(g.correct+=1),t[p]=g,o=xu(o,{conceptId:p,now:r,success:c,partial:!1,confidence:3,latencyMs:0,recognition:!0,item:a.item}).model}});const s={id:`exam-${n.startedAt}`,at:r,mode:n.mode,n:n.questions.length,correct:i,chapter:n.chapter,byConcept:t};return o={...o,examAttempts:[...o.examAttempts??[],s]},o={...o,examReadiness:{"1.1":io(o)}},{learner:o,attempt:s,byConcept:t}}function Yl(e,n,t=Date.now()){const r=ue().concepts.filter(s=>s.chapter===n);if(!r.length)return 0;let o=0;for(const s of r){const a=Nn(e.concepts[s.id]??et(s.id),t);o+=.6*Math.min(1,a.mcqCorrect/2)+.4*a.estimatedMastery}return o/r.length}const Ta="bf_isabella(2)+af_heart(1)",Ce={baseUrl:"http://127.0.0.1:8880",voice:Ta,langCode:"b",speed:.95},Jl=[{id:Ta,label:"Studio mix · British (Isabella + Heart)"},{id:"bf_isabella",label:"Isabella · British"},{id:"bf_alice",label:"Alice · British"},{id:"bf_emma",label:"Emma · British"},{id:"bf_lily",label:"Lily · British"},{id:"bm_george",label:"George · British"},{id:"bm_lewis",label:"Lewis · British"},{id:"bm_daniel",label:"Daniel · British"},{id:"af_heart",label:"Heart · American (highest fidelity; British phonemes still on)"},{id:"af_bella",label:"Bella · American"}],am=[Ta,"bf_isabella","af_heart","bf_emma"],Su="if2-kokoro-v1";function Li(e){return e.trim().replace(/\/+$/,"")||Ce.baseUrl}function ro(e){const n=typeof e=="number"?e:Number(e);return Number.isFinite(n)?Math.min(1.2,Math.max(.7,n)):Ce.speed}function Ii(){try{const e=localStorage.getItem(Su);if(!e)return{...Ce};const n=JSON.parse(e),t=n.voice==="bf_emma"&&!n.voiceLocked?Ce.voice:n.voice||Ce.voice;return{baseUrl:Li(n.baseUrl||Ce.baseUrl),voice:t,langCode:n.langCode||Ce.langCode,speed:ro(n.speed??Ce.speed)}}catch{return{...Ce}}}function Sa(e){try{localStorage.setItem(Su,JSON.stringify({baseUrl:Li(e.baseUrl),voice:e.voice||Ce.voice,langCode:e.langCode||Ce.langCode,speed:ro(e.speed)}))}catch{}}function lm(e){const n=Ii(),t=new URLSearchParams(e.startsWith("?")?e.slice(1):e),i={...n},r=t.get("kokoro")||t.get("voiceUrl");r&&(i.baseUrl=Li(r));const o=t.get("voice");o&&(i.voice=o);const s=t.get("lang");s&&(i.langCode=s);const a=t.get("speed");return a&&(i.speed=ro(a)),Sa(i),i}function cm(e){return e.filter(n=>n.kind!=="wait"&&n.text.trim()).map(n=>n.text.trim())}function dm(e,n=900){const t=[];let i="";for(const r of e){if(!i){i=r;continue}i.length+2+r.length<=n?i=`${i}

${r}`:(t.push(i),i=r)}return i&&t.push(i),t}function Pu(e){if(!e)return[];if(Array.isArray(e))return e.map(n=>typeof n=="string"?n:n==null?void 0:n.id).filter(n=>!!n);if(typeof e=="object"){const n=e;return Array.isArray(n.voices)?Pu(n.voices):Object.keys(n).filter(t=>t!=="voices")}return[]}async function Xl(e){const n=Li(e);try{const t=await fetch(`${n}/health`,{method:"GET"});if(!t.ok)return{ok:!1,error:`Kokoro /health returned ${t.status} at ${n}`}}catch(t){return{ok:!1,error:Au(n,t)}}try{const t=await fetch(`${n}/v1/audio/voices`,{method:"GET"});return t.ok?{ok:!0,voices:Pu(await t.json())}:{ok:!0,voices:[]}}catch{return{ok:!0,voices:[]}}}async function um(e,n){const t=Li(e.baseUrl),i=pm([e.voice||Ce.voice,...am]);let r="Kokoro speech failed.";for(const o of i){let s;try{s=await fetch(`${t}/v1/audio/speech`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"audio/mpeg,audio/*"},body:JSON.stringify({model:"kokoro",input:n,voice:o,response_format:"mp3",speed:ro(e.speed),lang_code:e.langCode||Ce.langCode})})}catch(l){throw new Error(Au(t,l))}if(s.ok)return s.blob();const a=await s.text().catch(()=>"");if(r=`Kokoro speech failed (${s.status}) ${a.slice(0,180)}`.trim(),!(s.status===404||s.status===422||s.status===400))throw new Error(r)}throw new Error(r)}function pm(e){return[...new Set(e.filter(Boolean))]}function Au(e,n){const t=typeof window<"u"&&window.location.protocol==="https:",i=e.startsWith("http://");if(t&&i)return`Browser blocked ${e} from this HTTPS page. Leave Docker on :8880, then paste an https:// tunnel (Cloudflare/Tailscale) here — or open IF2 from http://localhost on the same PC as Docker. Bookmark this tab with ?kokoro=https://….trycloudflare.com so the work PC finds the voice.`;const r=n instanceof Error?n.message:"network error";return`Cannot reach Kokoro at ${e} (${r}). Keep the GPU container on port 8880.`}const Pa="if2-conduct-learner-v2",Eu="if2-conduct-learner-v1",oo="if2-conduct-sessions-v1";function Jt(){try{const e=localStorage.getItem(Pa)||localStorage.getItem(Eu);return e?Cu(JSON.parse(e)):qr()}catch{return qr()}}function Ct(e){localStorage.setItem(Pa,JSON.stringify(e))}function Aa(){try{return JSON.parse(localStorage.getItem(oo)||"[]")}catch{return[]}}function ju(e){const n=Aa().filter(t=>t.id!==e.id);n.push(e),localStorage.setItem(oo,JSON.stringify(n.slice(-40)))}function hm(){localStorage.removeItem(Pa),localStorage.removeItem(Eu),localStorage.removeItem(oo)}function fm(){return{v:1,exportedAt:Date.now(),learner:Jt(),sessions:Aa(),kokoro:Ii()}}function mm(e){var n;try{const t=e;if(!t||t.v!==1||!t.learner)return{ok:!1,error:"Not an IF2 Conduct backup."};Ct(Cu(t.learner));const i=Array.isArray(t.sessions)?t.sessions:[];return localStorage.setItem(oo,JSON.stringify(i.slice(-40))),(n=t.kokoro)!=null&&n.baseUrl&&Sa(t.kokoro),{ok:!0}}catch{return{ok:!1,error:"Could not read that file."}}}function ym(){const e=new Blob([JSON.stringify(fm(),null,2)],{type:"application/json"}),n=URL.createObjectURL(e),t=document.createElement("a");t.href=n,t.download=`if2-conduct-progress-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(n)}function gm({learner:e,onStart:n,onReset:t,onExam:i,onImported:r}){const o=ue(),s=Date.now(),[a,l]=W.useState("map"),c=tm(e,s),p=io(e),g=W.useMemo(()=>Zf(o.concepts,o.facts,o.items,e,s),[e,o.concepts,o.facts,o.items,s]),m=Aa(),w=g.rows.filter(d=>d.flags.encountered).length;return u.jsxs("div",{className:"atlas",children:[u.jsx("p",{className:"kicker",children:"Progress map · not the study page"}),u.jsx("h2",{children:"Chapters 1–6 of IF2 (syllabus 1.1 products)."}),u.jsxs("p",{className:"lede",children:[o.stats.concepts," concepts · ",o.stats.facts," sourced claims · ",o.stats.sections," sections ·"," ",o.stats.mcq," multiple-choice items (",o.stats.examStyleMcq," exam-shaped). Study is read the book with Next. Check this when you want a question on that lesson. This map is for gaps, mix-ups and a backup if you switch computers."]}),u.jsxs("div",{className:"row",children:[u.jsx("button",{onClick:()=>n(),children:w?"Continue reading":"Start reading"}),u.jsx("button",{className:"ghost",onClick:i,children:"Exam practice"}),u.jsx("button",{className:"ghost",onClick:()=>ym(),children:"Export progress"}),u.jsxs("label",{className:"ghost",style:{display:"inline-flex",alignItems:"center",cursor:"pointer",padding:"0.85rem 1.2rem",borderRadius:999,border:"1px solid var(--line)"},children:["Import progress",u.jsx("input",{type:"file",accept:"application/json,.json",style:{display:"none"},onChange:d=>{var y;const b=(y=d.target.files)==null?void 0:y[0];if(d.target.value="",!b)return;const C=new FileReader;C.onload=()=>{try{const f=JSON.parse(String(C.result)),v=mm(f);if(!v.ok){window.alert(v.error);return}r==null||r()}catch{window.alert("Could not read that file.")}},C.readAsText(b)}})]}),u.jsx("button",{className:"ghost",onClick:t,children:"Reset learner"})]}),u.jsxs("p",{className:"meta",children:["Encountered ",w," of ",o.stats.concepts,". Still open in the journey: ",g.unfinishedCount,". Heuristic exam overlay 1.1: ",Math.round(p*100),". Due now: ",c.length,". Sessions: ",e.sessionCount,". Rough study depth: ",g.journeyHoursEstimate,"+ focused hours if you actually retrieve after delays. Progress stays in this browser — export a backup if you will study on another computer."]}),u.jsx("nav",{className:"view-nav",children:[["map","Curriculum map"],["outcomes","Learning outcome"],["graph","Dependencies"],["reviews","Spaced reviews"],["misconceptions","Mix-ups"],["readiness","Readiness"],["sessions","Sessions"],["questions","Question history"],["distinctions","Weak distinctions"]].map(([d,b])=>u.jsx("button",{className:a===d?"":"ghost",onClick:()=>l(d),children:b},d))}),a==="map"&&u.jsxs("div",{className:"grid",style:{marginTop:"1.4rem"},children:[u.jsx("div",{children:[1,2,3,4,5,6].map(d=>u.jsxs("section",{className:"chapter",children:[u.jsxs("h3",{style:{fontFamily:"var(--display)"},children:[d,". ",o.stats.chapters[d].title,u.jsxs("span",{className:"meta",children:[" ","· ",o.stats.conceptsByChapter[d]," concepts · ",o.stats.factsByChapter[d]," claims"]}),u.jsx("button",{className:"ghost",style:{marginLeft:"0.6rem",padding:"0.2rem 0.7rem"},onClick:()=>n(d),children:"Read"})]}),g.rows.filter(b=>b.chapter===d).map(b=>u.jsxs("div",{className:"concept-line",children:[u.jsxs("span",{children:[b.title,u.jsx("em",{className:"cov",children:b.label})]}),u.jsx("span",{className:b.mastery<.35?"bar warn-bar":"bar",children:u.jsx("i",{style:{width:`${Math.round(b.mastery*100)}%`}})})]},b.id))]},d))}),u.jsxs("aside",{children:[u.jsx("h3",{style:{fontFamily:"var(--display)"},children:"Coverage, not a score"}),u.jsx("p",{className:"note",children:"Each concept should be introduced, explained, retrieved, applied where the syllabus asks, then retrieved again after a delay. Recognition is not the same as explanation."}),u.jsxs("p",{className:"meta",children:[g.missingMcq.length," concepts still have fewer than two MCQs tagged — integrity tests watch this."]})]})]}),a==="outcomes"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Syllabus 1.1 — products in Chapters 1–6"}),u.jsx("p",{children:"Describe basic features and typical cover of motor, health, packaged, property, pecuniary and liability insurance. Chapter 7 (non-insurance services / 1.2) is out of this build."}),u.jsx("ul",{children:[1,2,3,4,5,6].map(d=>u.jsxs("li",{children:["Chapter ",d," (",o.stats.chapters[d].title,"): chapter readiness"," ",Math.round(Yl(e,d)*100)]},d))})]}),a==="graph"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Prerequisite edges"}),u.jsx("ul",{className:"graph-list",children:o.concepts.filter(d=>d.prerequisites.length||d.confusedWith.length).map(d=>u.jsxs("li",{children:[u.jsx("strong",{children:d.title}),d.prerequisites.length?` needs ${d.prerequisites.join(", ")}`:"",d.confusedWith.length?` · easily confused with ${d.confusedWith.join(", ")}`:""]},d.id))})]}),a==="reviews"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Upcoming retrievals"}),u.jsx("ul",{children:g.rows.filter(d=>d.nextDueAt).sort((d,b)=>(d.nextDueAt??0)-(b.nextDueAt??0)).slice(0,24).map(d=>{const b=Nn(e.concepts[d.id]??et(d.id),s);return u.jsxs("li",{children:[u.jsx("strong",{children:d.title}),u.jsxs("div",{className:"source",children:[js(b,s)," · forgetting risk ",Math.round(em(b,s)*100)]})]},d.id)})})]}),a==="misconceptions"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Mix-ups currently tracked"}),u.jsx("ul",{children:o.concepts.map(d=>({c:d,st:e.concepts[d.id]})).filter(d=>d.st&&(d.st.confidentErrors||Object.keys(d.st.confusedWithHits).length)).map(({c:d,st:b})=>u.jsxs("li",{children:[d.title,b.confidentErrors?` · ${b.confidentErrors} confident error(s)`:"",Object.keys(b.confusedWithHits).map(C=>` × ${C}`).join("")]},d.id))}),!o.concepts.some(d=>{var b;return(b=e.concepts[d.id])==null?void 0:b.confidentErrors})&&u.jsx("p",{className:"meta",children:"None yet. They appear when a high-certainty answer misses the sourced key."})]}),a==="readiness"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Chapter and examination overlay"}),u.jsx("p",{className:"note",children:"Mastery is delayed production plus more than one MCQ success. Exam-readiness is MCQ performance under that overlay — not a pass mark."}),u.jsx("ul",{children:[1,2,3,4,5,6].map(d=>u.jsxs("li",{children:["Ch ",d,": ",Math.round(Yl(e,d)*100)]},d))}),u.jsxs("p",{children:["LO 1.1 overlay: ",Math.round(p*100)]})]}),a==="sessions"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Previously completed sessions"}),u.jsx("ul",{children:m.length?m.slice().reverse().map(d=>u.jsxs("li",{children:[new Date(d.startedAt).toLocaleString()," · ",d.events.filter(b=>b.type==="graded").length," retrievals · ",d.adaptations.length," attention adaptations"]},d.id)):u.jsx("li",{children:"No closed sessions stored yet."})})]}),a==="questions"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Question history"}),u.jsx("ul",{children:Object.entries(e.questionStats??{}).sort((d,b)=>b[1].lastAt-d[1].lastAt).slice(0,40).map(([d,b])=>{const C=o.items.find(y=>y.id===d);return u.jsxs("li",{children:[((C==null?void 0:C.prompt)??d).slice(0,110)," — ",b.correct,"/",b.seen,b.lastCorrect?"":" · last miss"]},d)})}),(e.examAttempts??[]).length>0&&u.jsxs(u.Fragment,{children:[u.jsx("h3",{children:"Exam sets"}),u.jsx("ul",{children:e.examAttempts.map(d=>u.jsxs("li",{children:[d.mode," ",d.correct,"/",d.n," · ",new Date(d.at).toLocaleString()]},d.id))})]})]}),a==="distinctions"&&u.jsxs("section",{children:[u.jsx("h3",{children:"Pairs the materials treat as easy to confuse"}),u.jsx("ul",{children:o.concepts.filter(d=>d.confusedWith.length).map(d=>u.jsxs("li",{children:[d.title," ↔ ",d.confusedWith.join(", ")]},d.id))})]})]})}function vm({report:e,onAtlas:n,onAgain:t}){return u.jsx("div",{className:"stage",children:u.jsxs("article",{className:"card debrief",children:[u.jsx("p",{className:"kicker",children:"Session reconstructed"}),u.jsx("h2",{children:"Not a score. What you demonstrated."}),u.jsxs("section",{children:[u.jsx("h3",{children:"Demonstrably understood"}),u.jsx("ul",{children:e.understood.length?e.understood.map(i=>u.jsx("li",{children:i.title},i.id)):u.jsx("li",{children:"Nothing has survived production yet."})})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Still uncertain"}),u.jsx("ul",{children:e.uncertain.map(i=>u.jsxs("li",{children:[i.title," — ",i.why]},i.id))})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Misconceptions / mix-ups"}),u.jsx("ul",{children:e.misconceptions.length?e.misconceptions.map(i=>u.jsx("li",{children:i.title},i.id)):u.jsx("li",{children:"None flagged this session."})})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Confident errors"}),u.jsx("ul",{children:e.confidentErrors.length?e.confidentErrors.map(i=>u.jsx("li",{children:i.title},i.id)):u.jsx("li",{children:"None recorded."})})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Scheduled to return"}),u.jsx("ul",{children:e.reviews.map(i=>u.jsxs("li",{children:[i.title," — ",i.why]},i.id))})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Syllabus"}),u.jsx("p",{children:e.outcomes.join(" ")}),u.jsx("p",{className:"note",children:e.masteryVsExam})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Still on the journey"}),u.jsxs("p",{className:"note",children:[e.coverageRemaining," mapped concepts have not been encountered yet. One correct answer today does not retire a concept — it will return after a gap."]})]}),u.jsxs("section",{children:[u.jsx("h3",{children:"Why the next session does what it does"}),u.jsx("p",{className:"lede",children:e.nextFocus})]}),u.jsxs("div",{className:"row",children:[u.jsx("button",{onClick:t,children:"Continue reading"}),u.jsx("button",{className:"ghost",onClick:n,children:"Progress map"})]})]})})}function Lu({item:e,exam:n,onCommit:t}){const i=W.useMemo(()=>e.shuffle===!1&&e.options&&e.correctIndex!=null?{options:e.options,correctIndex:e.correctIndex}:Tu(e.options??[],e.correctIndex??0),[e.id,e.shuffle,e.options,e.correctIndex]),[r,o]=W.useState(null),[s,a]=W.useState(n?3:null),[l,c]=W.useState(!1);W.useEffect(()=>{o(null),a(n?3:null),c(!1)},[e.id,n]),W.useEffect(()=>{function w(d){if(l)return;const b={a:0,b:1,c:2,d:3,1:0,2:1,3:2,4:3},C=d.key.toLowerCase();C in b&&i.options[b[C]]&&o(b[C]),d.key==="Enter"&&r!=null&&(n||s!=null)&&p()}return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)});function p(){r==null||l||!n&&s==null||(c(!0),t(i.options[r],r,s??3))}const g=l&&!n,m=i.correctIndex;return u.jsxs("div",{children:[u.jsx("p",{className:"lede",children:e.prompt}),u.jsx("div",{className:"options mcq-options",children:i.options.map((w,d)=>{let b="";return r===d&&!g&&(b="selected"),g&&d===m&&(b="right"),g&&r===d&&d!==m&&(b="wrong"),u.jsxs("button",{className:`mcq-opt ${b}`,disabled:!!(l&&!n),onClick:()=>!l&&o(d),children:[u.jsx("span",{className:"letter",children:String.fromCharCode(65+d)}),w]},`${e.id}-${d}-${w.slice(0,24)}`)})}),!n&&!l&&u.jsxs(u.Fragment,{children:[u.jsx("p",{className:"meta",children:"How sure?"}),u.jsx("div",{className:"confidence",children:[1,2,3,4,5].map(w=>u.jsx("button",{"data-on":s===w?"1":"0",onClick:()=>a(w),children:w},w))})]}),!l&&u.jsx("div",{className:"row",children:u.jsx("button",{disabled:r==null||!n&&s==null,onClick:p,children:"Lock answer"})}),g&&r!=null&&u.jsxs("div",{className:"mcq-feedback",children:[u.jsx("p",{className:"lede",children:r===m?"That is the sourced key.":"Not the sourced key."}),u.jsxs("p",{children:[u.jsx("strong",{children:"Why the right one is right."})," ",e.whyCorrect??e.rubric]}),r!==m&&e.whyWrong&&u.jsxs("p",{children:[u.jsx("strong",{children:"Why yours is wrong."})," ",wm(e,i.options[r])]})]})]})}function wm(e,n){var r;const i=(e.options??[]).findIndex(o=>o===n);return i>=0&&((r=e.whyWrong)!=null&&r[i])?e.whyWrong[i]:"A plausible confusion, not the IF2-sourced answer."}function bm({learner:e,onLearner:n,onClose:t}){const[i,r]=W.useState(null),[o,s]=W.useState(null),a=ue();function l(p,g){s(null),r(om(e,{mode:p,chapter:g}))}if(o){const{attempt:p,byConcept:g}=o;return u.jsx("div",{className:"stage exam-stage",children:u.jsxs("article",{className:"card debrief",children:[u.jsx("p",{className:"kicker",children:"Exam practice reconstructed"}),u.jsxs("h2",{children:[p.correct," of ",p.n," in this set — not a predicted IF2 mark."]}),u.jsx("p",{className:"note",children:"Feedback was withheld on purpose. IF2 is 100 MCQs in two hours; this set trains recognition without immediate correction."}),u.jsx("ul",{children:Object.entries(g).map(([m,w])=>{var b;const d=((b=a.concepts.find(C=>C.id===m))==null?void 0:b.title)??m;return u.jsxs("li",{children:[d,": ",w.correct,"/",w.n]},m)})}),u.jsxs("div",{className:"row",children:[u.jsx("button",{onClick:()=>s(null),children:"Another set"}),u.jsx("button",{className:"ghost",onClick:t,children:"Back to the map"})]})]})})}if(!i)return u.jsx("div",{className:"stage exam-stage",children:u.jsxs("article",{className:"card",children:[u.jsx("p",{className:"kicker",children:"Examination practice · restrained"}),u.jsx("h2",{children:"Sit the question, then find out."}),u.jsx("p",{className:"lede",children:"Learning sessions explain. This room does not — until the set is finished. Mix of weaker and previously successful items, syllabus 1.1 products only. Four options; lock, then wait for the end of the set."}),u.jsxs("div",{className:"row",children:[u.jsx("button",{onClick:()=>l("drill"),children:"Short drill"}),u.jsx("button",{className:"ghost",onClick:()=>l("mixed"),children:"Mixed cumulative"}),u.jsx("button",{className:"ghost",onClick:()=>l("full"),children:"36-item LO1-shaped set"})]}),u.jsx("p",{className:"meta",children:"Chapter tests"}),u.jsx("div",{className:"row",children:[1,2,3,4,5,6].map(p=>u.jsxs("button",{className:"ghost",onClick:()=>l("chapter",p),children:["Ch ",p]},p))}),u.jsx("div",{className:"row",children:u.jsx("button",{className:"ghost",onClick:t,children:"Leave"})})]})});const c=i.questions[i.current];return u.jsx("div",{className:"stage exam-stage",children:u.jsxs("article",{className:"card",children:[u.jsxs("p",{className:"kicker",children:[i.mode," · ",i.current+1," / ",i.questions.length]}),u.jsx(Lu,{item:{...c.item,options:c.displayOptions,correctIndex:c.displayCorrect,shuffle:!1},exam:!0,onCommit:(p,g)=>{const m=[...i.answers];if(m[i.current]=g,i.current+1>=i.questions.length){const w={...i,answers:m},d=sm(e,w);Ct(d.learner),n(d.learner),r(null),s(d)}else r({...i,answers:m,current:i.current+1})}})]})})}function km(){return{idleMs:0,lastAnswerMs:null,rapidStreak:0,failStreak:0,revealStreak:0,rereadCount:0,accuracyWindow:[],clickBurst:0}}function xm(e,n,t,i){const r=[],o={...e,accuracyWindow:[...e.accuracyWindow,t?1:0].slice(-8)};o.lastAnswerMs=n,n<1100?(o.rapidStreak+=1,o.rapidStreak>=2&&r.push("rapid-answer"),o.rapidStreak>=3&&o.accuracyWindow.slice(-3).some(a=>a===0)&&r.push("guessing")):o.rapidStreak=0,t?o.failStreak=0:(o.failStreak+=1,o.failStreak>=2&&r.push("repeated-error")),o.revealStreak=0;const s=o.accuracyWindow;if(s.length>=6){const a=s.slice(0,3).reduce((c,p)=>c+p,0),l=s.slice(-3).reduce((c,p)=>c+p,0);a>=2&&l===0&&r.push("accuracy-drop")}return n>9e4&&r.push("slow-latency"),{att:o,signals:r}}function Cm(e,n){const t=[];return n>45e3&&t.push("inactivity"),{att:{...e,idleMs:n},signals:t}}function Im(e,n){const t=n>=6?["rapid-click"]:[];return{att:{...e,clickBurst:n},signals:t}}function Tm(e,n){return n&&e<=2||!n&&e>=4?"confidence-mismatch":null}const Sm=25;function Zl(e,n=Date.now(),t){const i=e??qr();return{learner:{...i,sessionCount:i.sessionCount+1},log:{id:`ses-${n}`,startedAt:n,events:[],decisions:[],adaptations:[]},queueHint:null,lastConceptIds:[],introducedThisSession:[],retrieveCount:0,startedAt:n,targetMs:Sm*60*1e3,preferredChapter:t==null?void 0:t.chapter,chapterPinned:!!(t!=null&&t.chapter),ownWords:!1}}function Ti(e){var n;return(n=ue().concepts.find(t=>t.id===e))==null?void 0:n.chapter}function Nu(e){return e.chapter??Ti(e.conceptIds[0]??"")}function ur(e){const n=e.preferredChapter;if(!n)return Wr(e.learner);const t=Wr(e.learner,n);return t||e.chapterPinned?t:Pm(e.learner,n)}function Pm(e,n){for(const t of[1,2,3,4,5,6]){if(t<=n)continue;const i=Wr(e,t);if(i)return i}return null}function ec(e,n=Date.now()){const t=ue();if(n-e.startedAt>e.targetMs&&e.retrieveCount>=4){const a=Rr(e,n);return{kind:"debrief",report:a,speech:tc(a)}}if(e.queueHint)return Am(e,e.queueHint,n,t);if(e.forceSectionId){const a=t.sections.find(l=>l.id===e.forceSectionId);if(e.forceSectionId=void 0,a)return He(e,n,"Opened a chosen book section",[`ch.${a.chapter} ${a.title}`],"read"),It(a,!1)}const i=e.lastConceptIds.find(a=>!e.preferredChapter||Ti(a)===e.preferredChapter);if(e.wantCheck){e.wantCheck=!1;const a=i??nc(e)[0],l=a&&ue().factById[a]?ue().factById[a].conceptId:i??t.concepts[0].id,c=Bn(t,l,e,{preferMcq:!0,avoidId:e.lastItemId,factIds:nc(e)});return He(e,n,"Check on the lesson just read, because the learner asked",[l],"retrieve"),yt(c,"encode")}const r=ur(e);if(r)return r.factIds.filter(l=>{var c;return!(((c=e.learner.seenFacts)==null?void 0:c[l])>0)}).length?(He(e,n,"Read the next book section",[`ch.${r.chapter} ${r.title}`],"read"),It(r,!1)):(He(e,n,"Re-read this heading — no quiz until asked",[`ch.${r.chapter} ${r.title}`],"read"),It(r,!1));const o=Object.values(e.learner.concepts).filter(a=>{if(a.exposures===0)return!1;const l=Ti(a.conceptId);return!(e.preferredChapter&&l&&l<e.preferredChapter)}).sort((a,l)=>a.estimatedMastery-l.estimatedMastery)[0];if(o&&e.retrieveCount>0){const a=Bn(t,o.conceptId,e,{preferMcq:!0,avoidId:e.lastItemId});return He(e,n,"Curriculum exhausted for new sections — successive relearning of weakest",[o.conceptId],"retrieve"),yt(a,"cumulative")}const s=Rr(e,n);return{kind:"debrief",report:s,speech:tc(s)}}function Am(e,n,t,i){if(e.log.adaptations.push({at:t,signal:n,action:Em(n)}),e.queueHint=null,n==="inactivity"||n==="reread-loop"||n==="slow-latency"){const o=ur(e)??i.sections.find(s=>s.chapter===e.preferredChapter)??i.sections[0];return He(e,t,"Stay on the book — no quiz until asked",[n],"read"),It(o,!1)}if(n==="rapid-answer"||n==="guessing"||n==="rapid-click"){const o=e.lastConceptIds[0],s=o?Bn(i,o,e,{preferMcq:!0,typeBias:["mcq"]}):Bn(i,ue().concepts[0].id,e,{preferMcq:!0});return He(e,t,"Guessing pattern → lock a slower MCQ",[n],"retrieve"),yt(s,"attention-switch")}if(n==="repeated-error"||n==="accuracy-drop"){const o=e.lastConceptIds[0],s=i.concepts.find(c=>c.id===o),a=s==null?void 0:s.confusedWith[0];if(a){const c=i.items.find(p=>(p.type==="mcq"||p.type==="distinction")&&p.conceptIds.includes(o)&&p.misconception)||Bn(i,o,e,{preferMcq:!0});return He(e,t,"Repeated error → distinction / misconception protocol",[n,a],"retrieve"),yt(c,"misconception")}const l=i.sections.find(c=>c.conceptIds.includes(o??"")&&(!e.preferredChapter||c.chapter===e.preferredChapter))??ur(e)??i.sections.find(c=>c.chapter===e.preferredChapter)??i.sections[0];return He(e,t,"Repeated error → shortened re-reading of this section",[n],"read"),It(l,!0)}if(n==="confidence-mismatch"){const o=t-6e5,s=[...e.lastConceptIds].reverse().find(a=>{if(e.preferredChapter&&Ti(a)!==e.preferredChapter)return!1;const l=e.learner.concepts[a];return(l==null?void 0:l.lastSeenAt)&&l.lastSeenAt<o})??e.lastConceptIds.find(a=>!e.preferredChapter||Ti(a)===e.preferredChapter);if(s){const a=Bn(i,s,e,{preferMcq:!0});return He(e,t,"Calibration issue → MCQ on an earlier concept",[n,s],"retrieve"),yt(a,"cumulative")}}if(n==="reveal-repeat"){const o=e.lastConceptIds[0]??i.concepts[0].id,s=Bn(i,o,e,{preferMcq:!0});return He(e,t,"Reveal loop → another MCQ without a peek",[n],"retrieve"),yt(s,"encode")}const r=ur(e)??i.sections.find(o=>o.chapter===e.preferredChapter)??i.sections[0];return It(r,!0)}function Em(e){switch(e){case"inactivity":return"Stay on the book — no quiz until asked";case"reread-loop":return"Stay on the same heading; no quiz until asked";case"rapid-answer":case"guessing":case"rapid-click":return"Slow the format: lock an MCQ rather than rapid tapping";case"repeated-error":case"accuracy-drop":return"Shorten exposition or force a distinction";case"confidence-mismatch":return"Retrieve something encoded earlier in the session";case"reveal-repeat":return"Cloze reconstruction without a peek";case"slow-latency":return"Concrete scenario, smaller unit"}}function Fu(e,n){return n?e?n>=e?n:e:n:e}function nc(e){var n;return((n=[...e.log.events].reverse().find(t=>t.type==="read"))==null?void 0:n.factIds)??[]}function jm(e,n){return n?e.reading.slice(0,1):e.reading}function Lm(e,n,t){const i=Uf(e),r=Ft(n.map(a=>a.factId).filter(a=>!!a)),o=ue(),s=Ft(r.map(a=>{var l;return(l=o.factById[a])==null?void 0:l.conceptId}).filter(a=>!!a));return{...i,conceptIds:s.length?s:e.conceptIds,factIds:t&&r.length?r:e.factIds.length?e.factIds:r,load:t?1:i.load,reading:n.map(a=>({heading:a.heading||e.title,body:a.body,bullets:a.bullets,sources:a.sources,factId:a.factId,hold:a.hold})),comparisonTable:t?void 0:e.comparisonTable}}function It(e,n){const t=jm(e,n),i=t.find(r=>r.hold)??t[0];return{kind:"read",unit:Lm(e,t,n),section:e,shortened:n,kernel:i,speech:Nm(e,t,i)}}function yt(e,n,t){return{kind:"retrieve",item:e,speech:[{kind:"ask",text:e.prompt,interruptible:!0}],mode:n}}function Bn(e,n,t,i){var p,g,m;let r=e.items.filter(w=>w.conceptIds.includes(n));if(t.preferredChapter){const w=r.filter(d=>Nu(d)===t.preferredChapter);w.length&&(r=w)}if((p=i.factIds)!=null&&p.length){const w=r.filter(b=>b.factIds.some(C=>i.factIds.includes(C))),d=w.filter(b=>{var C;return b.type==="mcq"&&((C=b.options)==null?void 0:C.length)===4});d.length?r=d:w.length&&!i.preferMcq&&(r=w)}if((g=i.typeBias)!=null&&g.length){const w=r.filter(d=>i.typeBias.includes(d.type));w.length&&(r=w)}if(t.ownWords&&i.preferProduction){const w=r.filter(d=>!d.recognition);w.length&&(r=w)}else{const w=r.filter(d=>{var b;return d.type==="mcq"&&((b=d.options)==null?void 0:b.length)===4});w.length&&(r=w)}r=r.filter(w=>w.id!==i.avoidId&&w.id!==t.lastItemId);const o=t.learner.questionStats??{},s=r.filter(w=>!o[w.id]||o[w.id].seen===0);if(s.length)r=s;else{const w=r.filter(d=>o[d.id]&&!o[d.id].lastCorrect);w.length&&(r=w)}r.length||(r=e.items.filter(w=>w.conceptIds.includes(n)&&w.type==="mcq")),r.length||(r=e.items.filter(w=>w.conceptIds.includes(n)));const a=(m=e.items.find(w=>w.id===t.lastItemId))==null?void 0:m.type,l=r.filter(w=>w.type!==a);return(l.length?l:r)[t.retrieveCount%Math.max(1,l.length?l.length:r.length)]??e.items[0]}function Nm(e,n,t){const i=t.hold||e.lede||"",r=[];i&&r.push({kind:"narrate",text:i,interruptible:!0});for(const o of n){o.heading&&o.heading!==e.title&&r.push({kind:"narrate",text:o.heading,interruptible:!0});for(const s of(o.body||"").split(/\n\n+/)){const a=s.trim();a&&r.push({kind:"narrate",text:a,interruptible:!0})}for(const s of o.bullets??[]){const a=s.trim();a&&r.push({kind:"narrate",text:a,interruptible:!0})}}return r}function tc(e){return[{kind:"narrate",text:`Session closed. Demonstrated: ${e.understood.map(n=>n.title).join(", ")||"nothing firmly yet"}. Next: ${e.nextFocus}`,interruptible:!0}]}function Fm(e,n,t=Date.now()){let i=e.learner;const r={...i.seenFacts};for(const o of n.factIds)r[o]=t;i={...i,seenFacts:r};for(const o of n.conceptIds){i=Qf(i,o,t);const s=i.concepts[o];s&&s.nextDueAt==null&&(i={...i,concepts:{...i.concepts,[o]:{...s,nextDueAt:t+12*60*1e3}}})}return e.log.events.push({at:t,type:"read",conceptIds:n.conceptIds,factIds:n.factIds,payload:{sectionId:n.id}}),{...e,learner:i,preferredChapter:Fu(e.preferredChapter,n.chapter),lastConceptIds:Ft([...n.conceptIds,...e.lastConceptIds]),introducedThisSession:Ft([...e.introducedThisSession,...n.conceptIds])}}function Mm(e,n,t,i,r,o=Date.now()){const s=qm(n,t),a={item:n,response:t,auto:s,latencyMs:i,revealed:r};return e.log.events.push({at:o,type:n.type==="prediction"?"predicted":"answered",conceptIds:n.conceptIds,factIds:n.factIds,itemId:n.id,payload:{response:t,latencyMs:i,revealed:r}}),{...e,pending:a,lastItemId:n.id}}function Mu(e,n=3,t=Date.now()){let i=e;return i.pending&&(i=Du(i,n,t)),{...i,log:{...i.log,endedAt:t}}}function Du(e,n,t=Date.now()){const i=e.pending;if(!i)return e;const{item:r,auto:o,latencyMs:s,revealed:a}=i;if(r.type==="prediction")return e.log.events.push({at:t,type:"graded",conceptIds:r.conceptIds,factIds:r.factIds,itemId:r.id,payload:{confidence:n,prediction:!0,score:o.score}}),{...e,pending:void 0,lastItemId:r.id,lastConceptIds:Ft([...r.conceptIds,...e.lastConceptIds])};let l=e.learner,c="gap";const p=o.success?void 0:Dm(r,i.response);for(const g of r.conceptIds){const m=xu(l,{conceptId:g,now:t,success:o.success,partial:o.partial,confidence:n,latencyMs:s,recognition:r.recognition,confusedWith:p??r.misconception,item:r});l=m.model,c=m.errorClass;const w=ue().concepts.find(b=>b.id===g),d=nm(l.concepts[g],{now:t,success:o.success,errorClass:c,importance:(w==null?void 0:w.importance)??"supporting",recognition:r.recognition});l={...l,concepts:{...l.concepts,[g]:d}}}if(a){const g={...l.revealCountByFact};for(const m of r.factIds)g[m]=(g[m]??0)+1;l={...l,revealCountByFact:g}}return l={...l,examReadiness:{"1.1":io(l)}},e.log.events.push({at:t,type:"graded",conceptIds:r.conceptIds,factIds:r.factIds,itemId:r.id,payload:{confidence:n,success:o.success,errorClass:c,score:o.score}}),{...e,learner:l,pending:void 0,retrieveCount:e.retrieveCount+1,lastConceptIds:Ft([...r.conceptIds,...e.lastConceptIds]),preferredChapter:Fu(e.preferredChapter,Nu(r))}}function Dm(e,n){var r;const t=ue(),i=n.toLowerCase();for(const o of e.conceptIds){const s=t.concepts.find(a=>a.id===o);for(const a of(s==null?void 0:s.confusedWith)??[]){const l=((r=t.concepts.find(c=>c.id===a))==null?void 0:r.title)??a;if(i.includes(a.replace(/-/g," "))||i.includes(l.toLowerCase().slice(0,12)))return a}}}function qm(e,n){var c;const t=Tt(n);if(e.options&&e.correctIndex!=null){const p=Wm(e.options,t),g=p===e.correctIndex;return{success:g,partial:!1,score:g?1:0,matched:g?[e.expected[0]]:[],missing:g?[]:[e.expected[0]],note:g?"Recognition match.":((c=e.whyWrong)==null?void 0:c[p])??"Not the sourced key."}}const i=e.expected.map(Tt).filter(Boolean);if(!i.length){const p=t.split(/\s+/).length>=8;return{success:p,partial:!p&&t.length>12,score:p?.6:.2,matched:[],missing:[],note:"Prediction captured — compare with the sourced reading next. This is encoding, not mastery."}}const r=i.filter(p=>Ji(t,p)),o=i.filter(p=>!Ji(t,p)),s=r.length/i.length,a=s>=.6,l=!a&&s>=.3;return{success:a,partial:l,score:s,matched:e.expected.filter((p,g)=>Ji(t,i[g])),missing:e.expected.filter((p,g)=>!Ji(t,i[g])),note:a?"Production overlapped the sourced kernels.":`Missing: ${o.slice(0,3).join("; ")||"the sourced point"}.`}}function Ji(e,n){const t=Tt(n);if(t.length<4)return e.includes(t);const i=t.split(/[^a-z0-9£.]+/).filter(o=>o.length>2),r=i.filter(o=>e.includes(o)).length;return e.includes(t)||i.length>0&&r/i.length>=.6}function Wm(e,n){const t=e.findIndex(r=>Tt(r)===n);if(t>=0)return t;const i=n.replace(/[.)\s]/g,"");if(/^[a-d]$/.test(i))return i.charCodeAt(0)-97;if(/^[1-4]$/.test(i))return Number(i)-1;if(/^[0-3]$/.test(i))return Number(i);if(n.length>8){const r=e.findIndex(o=>Tt(o).includes(n)||n.includes(Tt(o)));if(r>=0)return r}return-1}function Tt(e){return e.toLowerCase().replace(/[’']/g,"'").replace(/£/g,"£").replace(/,/g,"").replace(/\s+/g," ").trim()}function Ft(e){return[...new Set(e)]}function He(e,n,t,i,r){const o={at:n,reason:t,evidence:i,choice:r,layer:"pedagogical-decision"};e.log.decisions.push(o),e.log.events.push({at:n,type:"decision",payload:{reason:t,choice:r}})}function Rm(e){return{...e,wantCheck:!0}}function Om(e,n){return{...e,preferredChapter:n,chapterPinned:!0,forceSectionId:void 0,lastConceptIds:[],queueHint:null,pending:void 0,wantCheck:!1}}function Xi(e,n,t=Date.now()){return e.log.events.push({at:t,type:"signal",payload:{signal:n}}),{...e,queueHint:n}}function Rr(e,n=Date.now()){var w,d,b,C;const t=ue(),i=[],r=[],o=[],s=[],a=[],l=[];for(const y of e.log.events)if(y.type==="graded"&&((w=y.payload)==null?void 0:w.errorClass)==="confident-error"){const f=(d=y.conceptIds)==null?void 0:d[0];if(f&&!s.some(v=>v.id===f)){const v=((b=t.concepts.find(k=>k.id===f))==null?void 0:b.title)??f;s.push({id:f,title:v})}}for(const y of t.concepts){const f=Nn(e.learner.concepts[y.id]??et(y.id),n);if(!f.exposures)continue;const v=y.title;f.confidentErrors&&f.lastFailAt&&n-f.lastFailAt<24*36e5&&(s.some(k=>k.id===y.id)||s.push({id:y.id,title:v})),Object.keys(f.confusedWithHits).length&&o.push({id:y.id,title:v}),f.estimatedMastery>=.45&&f.productionSuccesses>0?i.push({id:y.id,title:v}):f.exposures&&r.push({id:y.id,title:v,why:js(f,n)}),f.nextDueAt&&(l.push({id:y.id,title:v,why:js(f,n)}),a.push({id:y.id,title:v,when:new Date(f.nextDueAt).toLocaleString()}))}const c=Wr(e.learner),p=c?`Chapter ${c.chapter} · ${c.title}`:void 0,g=(C=r[0])==null?void 0:C.title,m=p?`Read the next section: ${p}.`:g?`Questions are optional — Check this when you want one on ${g}.`:"Keep reading Chapters 1–6. Check this only when you want a question.";return{understood:i,uncertain:r,misconceptions:o,confidentErrors:s,deferred:a.slice(0,12),reviews:l.slice(0,12),outcomes:["1.1 Describe basic features and typical cover of general insurance products (Chs 1–6)"],nextFocus:m,examReadiness:io(e.learner),masteryVsExam:"Mastery is delayed production plus repeated retrieval. Exam-readiness is a separate overlay: syllabus 1.1 is ~36/100 of IF2. Coverage stages (seen / recognised / explained / applied / held after a gap) are not collapsed into one percentage.",coverageRemaining:Object.values(e.learner.concepts).filter(y=>y.exposures===0).length}}function _m(){const e=typeof Audio<"u"?new Audio:null;let n=null,t=[],i=0,r=!1,o="idle",s={},a=Ii();function l(m){var w;o=m,(w=s.onState)==null||w.call(s,m)}function c(){n&&(URL.revokeObjectURL(n),n=null)}function p(m=!0){m&&(i+=1),r=!1,t=[],e&&(e.pause(),e.removeAttribute("src"),e.load()),c(),l("idle")}async function g(m,w){var d,b;if(!(!e||w!==i)){if(m>=t.length){p(!1),(d=s.onEnd)==null||d.call(s);return}r=!1,l("loading");try{const C=await um(a,t[m]);if(w!==i||(c(),n=URL.createObjectURL(C),e.src=n,e.onended=()=>{w!==i||r||g(m+1,w)},await e.play(),w!==i))return;l("speaking")}catch(C){if(w!==i)return;const y=C instanceof Error?C.message:"Kokoro failed.";p(!1),(b=s.onError)==null||b.call(s,y)}}}return e&&(e.preload="auto"),{supported:!!e,status:()=>o,stop(){p(!0)},pause(){!e||o==="idle"||o==="loading"||(r=!0,e.pause(),l("paused"))},resume(){!e||!r||(r=!1,e.play().then(()=>l("speaking"),m=>{var w;return(w=s.onError)==null?void 0:w.call(s,m instanceof Error?m.message:"Could not resume.")}))},speak(m,w){var C,y;i+=1;const d=i;s=w??{},a=Ii(),r=!1;const b=cm(m);if(t=dm(b),!e){(C=s.onError)==null||C.call(s,"This browser cannot play audio.");return}if(!t.length){(y=s.onEnd)==null||y.call(s);return}g(0,d)}}}function Bm({listen:e,error:n,onPlay:t,onPause:i,onResume:r,onStop:o}){const[s,a]=W.useState(()=>Ii()),[l,c]=W.useState("unknown"),[p,g]=W.useState(!1);W.useEffect(()=>{let d=!0;return Xl(s.baseUrl).then(b=>{d&&c(b.ok?"up":"down")}),()=>{d=!1}},[s.baseUrl]);function m(d){if(Sa(d),a(d),!(typeof window>"u"))try{const b=new URL(window.location.href);d.baseUrl.startsWith("https://")?b.searchParams.set("kokoro",d.baseUrl):b.searchParams.delete("kokoro"),window.history.replaceState(null,"",b)}catch{}}const w=Jl.some(d=>d.id===s.voice);return u.jsxs("div",{className:"listen-wrap",children:[u.jsxs("div",{className:"listen-bar",role:"group","aria-label":"Read this section aloud",children:[e==="idle"&&u.jsx("button",{type:"button",onClick:t,children:"Listen"}),e==="loading"&&u.jsx("button",{type:"button",disabled:!0,children:"Asking Kokoro…"}),e==="speaking"&&u.jsx("button",{type:"button",className:"ghost",onClick:i,children:"Pause"}),e==="paused"&&u.jsx("button",{type:"button",onClick:r,children:"Resume"}),e!=="idle"&&u.jsx("button",{type:"button",className:"ghost",onClick:o,children:"Stop"}),u.jsx("button",{type:"button",className:"ghost",onClick:()=>g(d=>!d),children:"Voice"})]}),n&&u.jsx("p",{className:"note",children:n}),p&&u.jsxs("div",{className:"kokoro-settings",children:[u.jsxs("p",{className:"meta",style:{marginTop:0},children:["Leave the LOQ Docker on port 8880 all day. On the work PC, paste the"," ",u.jsx("code",{children:"https://….trycloudflare.com"})," tunnel and bookmark this tab — the address is stored as"," ",u.jsx("code",{children:"?kokoro="}),". Same words as the page. Default voice is a British studio mix (Isabella + Heart)."]}),u.jsxs("label",{children:["Kokoro URL",u.jsx("input",{value:s.baseUrl,onChange:d=>m({...s,baseUrl:d.target.value}),placeholder:Ce.baseUrl})]}),u.jsxs("label",{children:["Voice",u.jsxs("select",{value:s.voice,onChange:d=>m({...s,voice:d.target.value}),children:[!w&&u.jsx("option",{value:s.voice,children:s.voice}),Jl.map(d=>u.jsx("option",{value:d.id,children:d.label},d.id))]})]}),u.jsxs("label",{children:["English",u.jsxs("select",{value:s.langCode,onChange:d=>m({...s,langCode:d.target.value}),children:[u.jsx("option",{value:"b",children:"British (recommended for IF2)"}),u.jsx("option",{value:"a",children:"American"})]})]}),u.jsx("button",{type:"button",className:"ghost",onClick:()=>{Xl(s.baseUrl).then(d=>{c(d.ok?"up":"down"),d.ok?window.alert(`Kokoro is up. Voices: ${d.voices.slice(0,8).join(", ")||s.voice}`):window.alert(d.error)})},children:"Test connection"})]})]})}function Um({engine:e,setEngine:n,onEnded:t}){const[i,r]=W.useState(()=>ec(e)),[o,s]=W.useState(""),[a,l]=W.useState(null),[c,p]=W.useState(null),[g,m]=W.useState("idle"),[w,d]=W.useState(null),b=W.useRef(Date.now()),C=W.useRef(Date.now()),y=W.useRef(km()),f=W.useRef([]),v=W.useRef(e),k=W.useRef(i),I=W.useRef(g);v.current=e,k.current=i,I.current=g;const S=W.useMemo(()=>_m(),[]);W.useEffect(()=>(S.stop(),m("idle"),()=>S.stop()),[i,S]),W.useEffect(()=>{const A=()=>{C.current=Date.now()};window.addEventListener("pointerdown",A),window.addEventListener("keydown",A),window.addEventListener("scroll",A,!0);const B=window.setInterval(()=>{const H=Date.now()-C.current,{signals:Rn}=Cm(y.current,H),tt=I.current==="speaking"||I.current==="loading"||I.current==="paused";if(Rn.includes("inactivity")&&k.current.kind==="read"&&!tt){const Rt=Xi(v.current,"inactivity");n(Rt),N(Rt)}},4e3);return()=>{window.clearInterval(B),window.removeEventListener("pointerdown",A),window.removeEventListener("keydown",A),window.removeEventListener("scroll",A,!0)}},[n]);function L(){const A=Date.now();f.current=[...f.current.filter(H=>A-H<2e3),A];const{signals:B}=Im(y.current,f.current.length);if(B.length){const H=Xi(e,B[0]);n(H),N(H)}}function N(A=e){b.current=Date.now(),C.current=Date.now(),S.stop(),m("idle"),d(null);const B=ec(A);if(r(B),s(""),l(null),p(null),B.kind==="debrief"){const H=Mu(A);Ct(H.learner),ju(H.log),t(H)}}function V(A){let B=e;i.kind==="read"&&(B=Fm(B,i.unit)),A&&(B=Rm(B)),Ct(B.learner),n(B),N(B)}function q(A,B,H){const Rn=Date.now()-b.current;let tt=Mm(e,A,B,Rn,H);const Rt=tt.pending.auto,{att:qu,signals:Wu}=xm(y.current,Rn,Rt.success);y.current=qu;for(const Ru of Wu)tt=Xi(tt,Ru);p(Rt.note),n(tt)}function xe(){const A=a??3;if(!e.pending)return;const B=Tm(A,e.pending.auto.success);let H=Du(e,A);B&&(H=Xi(H,B)),Ct(H.learner),n(H),N(H)}function qn(A){const B=Om(e,A);n(B),N(B)}function Wn(){i.kind!=="read"&&i.kind!=="retrieve"||(d(null),m("loading"),S.speak(i.speech,{onState:m,onError:A=>{m("idle"),d(A)},onEnd:()=>m("idle")}))}function Ni(){S.pause(),m("paused")}function so(){S.resume(),m("speaking")}function Wt(){S.stop(),m("idle")}if(i.kind==="debrief")return null;const ie=i.kind==="retrieve"||i.kind==="predict"?i.item:null,T=!!(ie!=null&&ie.options&&ie.options.length===4&&ie.type!=="prediction"),D=!!(ie&&!T),M=i.kind==="read"?i.section:void 0,_=(M==null?void 0:M.chapter)??(ie==null?void 0:ie.chapter)??e.preferredChapter??1,Y=i.kind==="read"?i.kernel:void 0,nt=(Y==null?void 0:Y.hold)||(M==null?void 0:M.lede)||an[_].hold,en=(i.kind==="read"?i.unit.reading:[]).map(A=>`${A.body} ${(A.bullets??[]).join(" ")}`).join(" ").toLowerCase(),fn=i.kind==="read"?i.section.traps[0]:void 0,nn=!!(fn&&!en.includes(fn.body.slice(0,48).toLowerCase()));return u.jsx("div",{className:"stage quiet-stage",onClick:A=>{A.target.closest("button, textarea, input, label, nav, a")||L()},children:u.jsxs("article",{className:"card quiet-card",children:[u.jsx("div",{className:"chapter-pills",role:"navigation","aria-label":"Chapters",children:[1,2,3,4,5,6].map(A=>u.jsx("button",{type:"button",className:_===A?"":"ghost","data-on":_===A?"1":"0",onClick:()=>qn(A),title:an[A].title,children:A},A))}),i.kind==="read"&&Y&&u.jsxs(u.Fragment,{children:[u.jsxs("p",{className:"kicker",children:[_," · ",i.section.title]}),u.jsx("h2",{className:"hold",children:nt}),u.jsx("div",{className:"reading",children:i.unit.reading.map((A,B)=>{var H;return u.jsxs("section",{children:[A.heading&&A.heading!==i.section.title&&B>0?u.jsx("h3",{children:A.heading}):null,A.body?u.jsx("p",{children:A.body}):null,(H=A.bullets)!=null&&H.length?u.jsx("ul",{children:A.bullets.map(Rn=>u.jsx("li",{children:Rn},Rn.slice(0,48)))}):null]},`${A.factId??"p"}-${B}`)})}),i.unit.comparisonTable&&u.jsxs("table",{className:"table lesson-table",children:[u.jsx("caption",{children:i.unit.comparisonTable.caption}),u.jsx("thead",{children:u.jsx("tr",{children:i.unit.comparisonTable.headers.map(A=>u.jsx("th",{children:A},A))})}),u.jsx("tbody",{children:i.unit.comparisonTable.rows.map(A=>u.jsx("tr",{children:A.map((B,H)=>u.jsx("td",{children:B},`${H}-${B.slice(0,24)}`))},A.join("|")))})]}),nn&&fn&&u.jsxs("p",{className:"mixup",children:["Keep this apart. ",fn.body]}),u.jsx(Bm,{listen:g,error:w,onPlay:Wn,onPause:Ni,onResume:so,onStop:Wt}),u.jsxs("div",{className:"row",children:[u.jsx("button",{type:"button",onClick:()=>V(!1),children:"Next"}),u.jsx("button",{type:"button",className:"ghost quiet-check",onClick:()=>V(!0),children:"Check this"})]})]}),T&&ie&&u.jsxs(u.Fragment,{children:[u.jsxs("p",{className:"kicker",children:[_," · ",an[_].title]}),u.jsx(Lu,{item:ie,onCommit:(A,B,H)=>{l(H),q(ie,A,!1)}}),e.pending&&u.jsx("div",{className:"row",children:u.jsx("button",{type:"button",onClick:xe,children:"Continue"})})]}),D&&ie&&u.jsxs(u.Fragment,{children:[u.jsxs("p",{className:"kicker",children:[_," · ",an[_].title]}),u.jsx("h2",{className:"hold",children:ie.prompt}),u.jsx("textarea",{value:o,onChange:A=>s(A.target.value),placeholder:"From memory."}),!e.pending&&u.jsx("div",{className:"row",children:u.jsx("button",{type:"button",disabled:!o.trim(),onClick:()=>q(ie,o,!1),children:"Check this"})}),e.pending&&u.jsxs(u.Fragment,{children:[u.jsx("p",{className:"lede",children:c}),u.jsx("p",{className:"meta",children:"How sure?"}),u.jsx("div",{className:"confidence",children:[1,2,3,4,5].map(A=>u.jsx("button",{type:"button","data-on":a===A?"1":"0",onClick:()=>l(A),children:A},A))}),u.jsx("div",{className:"row",children:u.jsx("button",{type:"button",disabled:a==null,onClick:xe,children:"Continue"})})]})]})]})})}function zm(){const[e,n]=W.useState("focus"),[t,i]=W.useState(()=>Jt()),[r,o]=W.useState(()=>Zl(Jt())),[s,a]=W.useState(null),l=c=>{const p=Zl(t,Date.now(),c?{chapter:c}:void 0);o(p),n("focus")};return u.jsxs("div",{className:"app",children:[u.jsxs("header",{className:"topbar",children:[u.jsxs("h1",{className:"brand",children:["IF2 ",u.jsx("span",{children:"1–6"})]}),e==="focus"?u.jsx("nav",{children:u.jsx("button",{className:"ghost",onClick:()=>{if(!r)return;const c=Mu(r);Ct(c.learner),ju(c.log),i(c.learner),a(Rr(c)),n("debrief")},children:"End session"})}):u.jsxs("nav",{children:[u.jsx("button",{onClick:()=>l(),children:"Study"}),u.jsx("button",{className:e==="exam"?"":"ghost",onClick:()=>n("exam"),children:"Exam"}),u.jsx("button",{className:e==="atlas"?"":"ghost",onClick:()=>n("atlas"),children:"Map"})]})]}),e!=="focus"&&u.jsx("div",{className:"pulse"}),e==="atlas"&&u.jsx(gm,{learner:t,onStart:l,onExam:()=>n("exam"),onReset:()=>{hm(),i(Jt())},onImported:()=>i(Jt())}),e==="exam"&&u.jsx(bm,{learner:t,onLearner:i,onClose:()=>n("atlas")}),e==="focus"&&r&&u.jsx(Um,{engine:r,setEngine:c=>{o(c),i(c.learner)},onEnded:c=>{i(c.learner),a(Rr(c)),n("debrief")}}),e==="debrief"&&s&&u.jsx(vm,{report:s,onAtlas:()=>n("atlas"),onAgain:()=>l()})]})}typeof window<"u"&&lm(window.location.search);qo.createRoot(document.getElementById("root")).render(u.jsx(np.StrictMode,{children:u.jsx(zm,{})}));
