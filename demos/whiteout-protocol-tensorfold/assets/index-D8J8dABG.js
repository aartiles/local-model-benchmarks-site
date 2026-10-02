var gc=Object.defineProperty;var _c=(s,t,e)=>t in s?gc(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var rs=(s,t,e)=>_c(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rr="165",vc=0,Ra=1,xc=2,vl=1,xl=2,di=3,Di=0,Ie=1,Ne=2,mi=0,gi=1,Qe=2,Pa=3,La=4,Mc=5,Yi=100,yc=101,Sc=102,wc=103,bc=104,Tc=200,Ec=201,Ac=202,Cc=203,ia=204,na=205,Rc=206,Pc=207,Lc=208,Dc=209,Uc=210,Ic=211,Nc=212,Fc=213,Oc=214,zc=0,Bc=1,kc=2,Gs=3,Hc=4,Vc=5,Gc=6,Wc=7,Ml=0,Xc=1,qc=2,Pi=0,Yc=1,$c=2,Kc=3,yl=4,jc=5,Zc=6,Qc=7,Sl=300,Rn=301,Pn=302,sa=303,ra=304,ar=306,Ws=1e3,Ki=1001,aa=1002,Fe=1003,Jc=1004,as=1005,Ke=1006,pr=1007,ji=1008,Ui=1009,th=1010,eh=1011,Xs=1012,wl=1013,Ln=1014,fi=1015,Li=1016,bl=1017,Tl=1018,Dn=1020,ih=35902,nh=1021,sh=1022,ni=1023,rh=1024,ah=1025,En=1026,Un=1027,El=1028,Al=1029,oh=1030,Cl=1031,Rl=1033,mr=33776,gr=33777,_r=33778,vr=33779,Da=35840,Ua=35841,Ia=35842,Na=35843,Fa=36196,Oa=37492,za=37496,Ba=37808,ka=37809,Ha=37810,Va=37811,Ga=37812,Wa=37813,Xa=37814,qa=37815,Ya=37816,$a=37817,Ka=37818,ja=37819,Za=37820,Qa=37821,xr=36492,Ja=36494,to=36495,lh=36283,eo=36284,io=36285,no=36286,ch=3200,hh=3201,Pl=0,uh=1,Ri="",He="srgb",Ii="srgb-linear",ua="display-p3",or="display-p3-linear",qs="linear",ie="srgb",Ys="rec709",$s="p3",nn=7680,so=519,dh=512,fh=513,ph=514,Ll=515,mh=516,gh=517,_h=518,vh=519,oa=35044,Qn=35048,ro="300 es",pi=2e3,Ks=2001;class Fn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const n=this._listeners[t];if(n!==void 0){const r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ao=1234567;const Jn=Math.PI/180,es=180/Math.PI;function _i(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ee[s&255]+Ee[s>>8&255]+Ee[s>>16&255]+Ee[s>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[i&255]+Ee[i>>8&255]+Ee[i>>16&255]+Ee[i>>24&255]).toLowerCase()}function De(s,t,e){return Math.max(t,Math.min(e,s))}function da(s,t){return(s%t+t)%t}function xh(s,t,e,i,n){return i+(s-t)*(n-i)/(e-t)}function Mh(s,t,e){return s!==t?(e-s)/(t-s):0}function ts(s,t,e){return(1-e)*s+e*t}function yh(s,t,e,i){return ts(s,t,1-Math.exp(-e*i))}function Sh(s,t=1){return t-Math.abs(da(s,t*2)-t)}function wh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function bh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Th(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Eh(s,t){return s+Math.random()*(t-s)}function Ah(s){return s*(.5-Math.random())}function Ch(s){s!==void 0&&(ao=s);let t=ao+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rh(s){return s*Jn}function Ph(s){return s*es}function Lh(s){return(s&s-1)===0&&s!==0}function Dh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Uh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ih(s,t,e,i,n){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),m=r((i-t)/2),g=a((i-t)/2);switch(n){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*m,o*c);break;case"YXY":s.set(l*m,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function je(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function jt(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const oo={DEG2RAD:Jn,RAD2DEG:es,generateUUID:_i,clamp:De,euclideanModulo:da,mapLinear:xh,inverseLerp:Mh,lerp:ts,damp:yh,pingpong:Sh,smoothstep:wh,smootherstep:bh,randInt:Th,randFloat:Eh,randFloatSpread:Ah,seededRandom:Ch,degToRad:Rh,radToDeg:Ph,isPowerOfTwo:Lh,ceilPowerOfTwo:Dh,floorPowerOfTwo:Uh,setQuaternionFromProperEuler:Ih,normalize:jt,denormalize:je};class mt{constructor(t=0,e=0){mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dt{constructor(t,e,i,n,r,a,o,l,c){Dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c)}set(t,e,i,n,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],m=i[5],g=i[8],_=n[0],p=n[3],d=n[6],y=n[1],v=n[4],S=n[7],P=n[2],E=n[5],A=n[8];return r[0]=a*_+o*y+l*P,r[3]=a*p+o*v+l*E,r[6]=a*d+o*S+l*A,r[1]=c*_+h*y+u*P,r[4]=c*p+h*v+u*E,r[7]=c*d+h*S+u*A,r[2]=f*_+m*y+g*P,r[5]=f*p+m*v+g*E,r[8]=f*d+m*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,m=c*r-a*l,g=e*u+i*f+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(n*c-h*i)*_,t[2]=(o*i-n*a)*_,t[3]=f*_,t[4]=(h*e-n*l)*_,t[5]=(n*r-o*e)*_,t[6]=m*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Mr.makeScale(t,e)),this}rotate(t){return this.premultiply(Mr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Mr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Mr=new Dt;function Dl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function js(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Nh(){const s=js("canvas");return s.style.display="block",s}const lo={};function fa(s){s in lo||(lo[s]=!0,console.warn(s))}function Fh(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const co=new Dt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ho=new Dt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),os={[Ii]:{transfer:qs,primaries:Ys,toReference:s=>s,fromReference:s=>s},[He]:{transfer:ie,primaries:Ys,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[or]:{transfer:qs,primaries:$s,toReference:s=>s.applyMatrix3(ho),fromReference:s=>s.applyMatrix3(co)},[ua]:{transfer:ie,primaries:$s,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ho),fromReference:s=>s.applyMatrix3(co).convertLinearToSRGB()}},Oh=new Set([Ii,or]),Zt={enabled:!0,_workingColorSpace:Ii,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Oh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const i=os[t].toReference,n=os[e].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return os[s].primaries},getTransfer:function(s){return s===Ri?qs:os[s].transfer}};function An(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function yr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let sn;class zh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{sn===void 0&&(sn=js("canvas")),sn.width=t.width,sn.height=t.height;const i=sn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=sn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=js("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=An(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(An(e[i]/255)*255):e[i]=An(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bh=0;class Ul{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=_i(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Sr(n[a].image)):r.push(Sr(n[a]))}else r=Sr(n);i.url=r}return e||(t.images[this.uuid]=i),i}}function Sr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?zh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let kh=0;class Ce extends Fn{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,i=Ki,n=Ki,r=Ke,a=ji,o=ni,l=Ui,c=Ce.DEFAULT_ANISOTROPY,h=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=_i(),this.name="",this.source=new Ul(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ws:t.x=t.x-Math.floor(t.x);break;case Ki:t.x=t.x<0?0:1;break;case aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ws:t.y=t.y-Math.floor(t.y);break;case Ki:t.y=t.y<0?0:1;break;case aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=Sl;Ce.DEFAULT_ANISOTROPY=1;class ne{constructor(t=0,e=0,i=0,n=1){ne.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,S=(m+1)/2,P=(d+1)/2,E=(h+f)/4,A=(u+_)/4,I=(g+p)/4;return v>S&&v>P?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=E/i,r=A/i):S>P?S<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(S),i=E/n,r=I/n):P<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(P),i=A/r,n=I/r),this.set(i,n,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-_)/y,this.z=(f-h)/y,this.w=Math.acos((c+m+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hh extends Fn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ne(0,0,t,e),this.scissorTest=!1,this.viewport=new ne(0,0,t,e);const n={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ce(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,n=t.textures.length;i<n;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ul(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Je extends Hh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Il extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vh extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ge{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==m||h!==g){let p=1-o;const d=l*f+c*m+h*g+u*_,y=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const P=Math.sqrt(v),E=Math.atan2(P,d*y);p=Math.sin(p*E)/P,o=Math.sin(o*E)/P}const S=o*y;if(l=l*p+f*S,c=c*p+m*S,h=h*p+g*S,u=u*p+_*S,p===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*m-c*f,t[e+1]=l*g+h*f+c*u-o*m,t[e+2]=c*g+h*m+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),f=l(i/2),m=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-n)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-c)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-n)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+n*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*n+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=n*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,i=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(uo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(uo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-r*n),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return wr.copy(this).projectOnVector(t),this.sub(wr)}reflect(t){return this.sub(wr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wr=new T,uo=new ge;class xi{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,qe):qe.fromBufferAttribute(r,a),qe.applyMatrix4(t.matrixWorld),this.expandByPoint(qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,qe),qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bn),cs.subVectors(this.max,Bn),rn.subVectors(t.a,Bn),an.subVectors(t.b,Bn),on.subVectors(t.c,Bn),yi.subVectors(an,rn),Si.subVectors(on,an),zi.subVectors(rn,on);let e=[0,-yi.z,yi.y,0,-Si.z,Si.y,0,-zi.z,zi.y,yi.z,0,-yi.x,Si.z,0,-Si.x,zi.z,0,-zi.x,-yi.y,yi.x,0,-Si.y,Si.x,0,-zi.y,zi.x,0];return!br(e,rn,an,on,cs)||(e=[1,0,0,0,1,0,0,0,1],!br(e,rn,an,on,cs))?!1:(hs.crossVectors(yi,Si),e=[hs.x,hs.y,hs.z],br(e,rn,an,on,cs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const oi=[new T,new T,new T,new T,new T,new T,new T,new T],qe=new T,ls=new xi,rn=new T,an=new T,on=new T,yi=new T,Si=new T,zi=new T,Bn=new T,cs=new T,hs=new T,Bi=new T;function br(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Bi.fromArray(s,r);const o=n.x*Math.abs(Bi.x)+n.y*Math.abs(Bi.y)+n.z*Math.abs(Bi.z),l=t.dot(Bi),c=e.dot(Bi),h=i.dot(Bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Gh=new xi,kn=new T,Tr=new T;class Ji{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Gh.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;kn.subVectors(t,this.center);const e=kn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(kn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Tr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(kn.copy(t.center).add(Tr)),this.expandByPoint(kn.copy(t.center).sub(Tr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new T,Er=new T,us=new T,wi=new T,Ar=new T,ds=new T,Cr=new T;class lr{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Er.copy(t).add(e).multiplyScalar(.5),us.copy(e).sub(t).normalize(),wi.copy(this.origin).sub(Er);const r=t.distanceTo(e)*.5,a=-this.direction.dot(us),o=wi.dot(this.direction),l=-wi.dot(us),c=wi.lengthSq(),h=Math.abs(1-a*a);let u,f,m,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Er).addScaledVector(us,f),m}intersectSphere(t,e){li.subVectors(t.center,this.origin);const i=li.dot(this.direction),n=li.dot(li)-i*i,r=t.radius*t.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,n=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,n=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,i,n,r){Ar.subVectors(e,t),ds.subVectors(i,t),Cr.crossVectors(Ar,ds);let a=this.direction.dot(Cr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wi.subVectors(this.origin,t);const l=o*this.direction.dot(ds.crossVectors(wi,ds));if(l<0)return null;const c=o*this.direction.dot(Ar.cross(wi));if(c<0||l+c>a)return null;const h=-o*wi.dot(Cr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,i,n,r,a,o,l,c,h,u,f,m,g,_,p){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,l,c,h,u,f,m,g,_,p)}set(t,e,i,n,r,a,o,l,c,h,u,f,m,g,_,p){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=n,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/ln.setFromMatrixColumn(t,0).length(),r=1/ln.setFromMatrixColumn(t,1).length(),a=1/ln.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-m,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wh,t,Xh)}lookAt(t,e,i){const n=this.elements;return Be.subVectors(t,e),Be.lengthSq()===0&&(Be.z=1),Be.normalize(),bi.crossVectors(i,Be),bi.lengthSq()===0&&(Math.abs(i.z)===1?Be.x+=1e-4:Be.z+=1e-4,Be.normalize(),bi.crossVectors(i,Be)),bi.normalize(),fs.crossVectors(Be,bi),n[0]=bi.x,n[4]=fs.x,n[8]=Be.x,n[1]=bi.y,n[5]=fs.y,n[9]=Be.y,n[2]=bi.z,n[6]=fs.z,n[10]=Be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],m=i[13],g=i[2],_=i[6],p=i[10],d=i[14],y=i[3],v=i[7],S=i[11],P=i[15],E=n[0],A=n[4],I=n[8],b=n[12],x=n[1],R=n[5],B=n[9],k=n[13],W=n[2],Y=n[6],G=n[10],K=n[14],V=n[3],st=n[7],ut=n[11],ft=n[15];return r[0]=a*E+o*x+l*W+c*V,r[4]=a*A+o*R+l*Y+c*st,r[8]=a*I+o*B+l*G+c*ut,r[12]=a*b+o*k+l*K+c*ft,r[1]=h*E+u*x+f*W+m*V,r[5]=h*A+u*R+f*Y+m*st,r[9]=h*I+u*B+f*G+m*ut,r[13]=h*b+u*k+f*K+m*ft,r[2]=g*E+_*x+p*W+d*V,r[6]=g*A+_*R+p*Y+d*st,r[10]=g*I+_*B+p*G+d*ut,r[14]=g*b+_*k+p*K+d*ft,r[3]=y*E+v*x+S*W+P*V,r[7]=y*A+v*R+S*Y+P*st,r[11]=y*I+v*B+S*G+P*ut,r[15]=y*b+v*k+S*K+P*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],g=t[3],_=t[7],p=t[11],d=t[15];return g*(+r*l*u-n*c*u-r*o*f+i*c*f+n*o*m-i*l*m)+_*(+e*l*m-e*c*f+r*a*f-n*a*m+n*c*h-r*l*h)+p*(+e*c*u-e*o*m-r*a*u+i*a*m+r*o*h-i*c*h)+d*(-n*o*h-e*l*u+e*o*f+n*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],g=t[12],_=t[13],p=t[14],d=t[15],y=u*p*c-_*f*c+_*l*m-o*p*m-u*l*d+o*f*d,v=g*f*c-h*p*c-g*l*m+a*p*m+h*l*d-a*f*d,S=h*_*c-g*u*c+g*o*m-a*_*m-h*o*d+a*u*d,P=g*u*l-h*_*l-g*o*f+a*_*f+h*o*p-a*u*p,E=e*y+i*v+n*S+r*P;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=y*A,t[1]=(_*f*r-u*p*r-_*n*m+i*p*m+u*n*d-i*f*d)*A,t[2]=(o*p*r-_*l*r+_*n*c-i*p*c-o*n*d+i*l*d)*A,t[3]=(u*l*r-o*f*r-u*n*c+i*f*c+o*n*m-i*l*m)*A,t[4]=v*A,t[5]=(h*p*r-g*f*r+g*n*m-e*p*m-h*n*d+e*f*d)*A,t[6]=(g*l*r-a*p*r-g*n*c+e*p*c+a*n*d-e*l*d)*A,t[7]=(a*f*r-h*l*r+h*n*c-e*f*c-a*n*m+e*l*m)*A,t[8]=S*A,t[9]=(g*u*r-h*_*r-g*i*m+e*_*m+h*i*d-e*u*d)*A,t[10]=(a*_*r-g*o*r+g*i*c-e*_*c-a*i*d+e*o*d)*A,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*m-e*o*m)*A,t[12]=P*A,t[13]=(h*_*n-g*u*n+g*i*f-e*_*f-h*i*p+e*u*p)*A,t[14]=(g*o*n-a*_*n-g*i*l+e*_*l+a*i*p-e*o*p)*A,t[15]=(a*u*n-h*o*n+h*i*l-e*u*l-a*i*f+e*o*f)*A,this}scale(t){const e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,m=r*h,g=r*u,_=a*h,p=a*u,d=o*u,y=l*c,v=l*h,S=l*u,P=i.x,E=i.y,A=i.z;return n[0]=(1-(_+d))*P,n[1]=(m+S)*P,n[2]=(g-v)*P,n[3]=0,n[4]=(m-S)*E,n[5]=(1-(f+d))*E,n[6]=(p+y)*E,n[7]=0,n[8]=(g+v)*A,n[9]=(p-y)*A,n[10]=(1-(f+_))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let r=ln.set(n[0],n[1],n[2]).length();const a=ln.set(n[4],n[5],n[6]).length(),o=ln.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),t.x=n[12],t.y=n[13],t.z=n[14],Ye.copy(this);const c=1/r,h=1/a,u=1/o;return Ye.elements[0]*=c,Ye.elements[1]*=c,Ye.elements[2]*=c,Ye.elements[4]*=h,Ye.elements[5]*=h,Ye.elements[6]*=h,Ye.elements[8]*=u,Ye.elements[9]*=u,Ye.elements[10]*=u,e.setFromRotationMatrix(Ye),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,n,r,a,o=pi){const l=this.elements,c=2*r/(e-t),h=2*r/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n);let m,g;if(o===pi)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ks)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=pi){const l=this.elements,c=1/(e-t),h=1/(i-n),u=1/(a-r),f=(e+t)*c,m=(i+n)*h;let g,_;if(o===pi)g=(a+r)*u,_=-2*u;else if(o===Ks)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ln=new T,Ye=new Wt,Wh=new T(0,0,0),Xh=new T(1,1,1),bi=new T,fs=new T,Be=new T,fo=new Wt,po=new ge;class Te{constructor(t=0,e=0,i=0,n=Te.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],f=n[6],m=n[10];switch(e){case"XYZ":this._y=Math.asin(De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-De(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(De(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return fo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(fo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return po.setFromEuler(this),this.setFromQuaternion(po,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Te.DEFAULT_ORDER="XYZ";class pa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let qh=0;const mo=new T,cn=new ge,ci=new Wt,ps=new T,Hn=new T,Yh=new T,$h=new ge,go=new T(1,0,0),_o=new T(0,1,0),vo=new T(0,0,1),xo={type:"added"},Kh={type:"removed"},hn={type:"childadded",child:null},Rr={type:"childremoved",child:null};class re extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=_i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=re.DEFAULT_UP.clone();const t=new T,e=new Te,i=new ge,n=new T(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Dt}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=re.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cn.setFromAxisAngle(t,e),this.quaternion.multiply(cn),this}rotateOnWorldAxis(t,e){return cn.setFromAxisAngle(t,e),this.quaternion.premultiply(cn),this}rotateX(t){return this.rotateOnAxis(go,t)}rotateY(t){return this.rotateOnAxis(_o,t)}rotateZ(t){return this.rotateOnAxis(vo,t)}translateOnAxis(t,e){return mo.copy(t).applyQuaternion(this.quaternion),this.position.add(mo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(go,t)}translateY(t){return this.translateOnAxis(_o,t)}translateZ(t){return this.translateOnAxis(vo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ps.copy(t):ps.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Hn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Hn,ps,this.up):ci.lookAt(ps,Hn,this.up),this.quaternion.setFromRotationMatrix(ci),n&&(ci.extractRotation(n.matrixWorld),cn.setFromRotationMatrix(ci),this.quaternion.premultiply(cn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(xo),hn.child=t,this.dispatchEvent(hn),hn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kh),Rr.child=t,this.dispatchEvent(Rr),Rr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(xo),hn.child=t,this.dispatchEvent(hn),hn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hn,t,Yh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hn,$h,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++){const r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++){const o=n[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}re.DEFAULT_UP=new T(0,1,0);re.DEFAULT_MATRIX_AUTO_UPDATE=!0;re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $e=new T,hi=new T,Pr=new T,ui=new T,un=new T,dn=new T,Mo=new T,Lr=new T,Dr=new T,Ur=new T;class Ze{constructor(t=new T,e=new T,i=new T){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),$e.subVectors(t,e),n.cross($e);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){$e.subVectors(n,e),hi.subVectors(i,e),Pr.subVectors(t,e);const a=$e.dot($e),o=$e.dot(hi),l=$e.dot(Pr),c=hi.dot(hi),h=hi.dot(Pr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(t,e,i,n,r,a,o,l){return this.getBarycoord(t,e,i,n,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static isFrontFacing(t,e,i,n){return $e.subVectors(i,e),hi.subVectors(t,e),$e.cross(hi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $e.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),$e.cross(hi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,r=this.c;let a,o;un.subVectors(n,i),dn.subVectors(r,i),Lr.subVectors(t,i);const l=un.dot(Lr),c=dn.dot(Lr);if(l<=0&&c<=0)return e.copy(i);Dr.subVectors(t,n);const h=un.dot(Dr),u=dn.dot(Dr);if(h>=0&&u<=h)return e.copy(n);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(un,a);Ur.subVectors(t,r);const m=un.dot(Ur),g=dn.dot(Ur);if(g>=0&&m<=g)return e.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(dn,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Mo.subVectors(r,n),o=(u-h)/(u-h+(m-g)),e.copy(n).addScaledVector(Mo,o);const d=1/(p+_+f);return a=_*d,o=f*d,e.copy(i).addScaledVector(un,a).addScaledVector(dn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},ms={h:0,s:0,l:0};function Ir(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Mt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,n=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Zt.toWorkingColorSpace(this,n),this}setHSL(t,e,i,n=Zt.workingColorSpace){if(t=da(t,1),e=De(e,0,1),i=De(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Ir(a,r,t+1/3),this.g=Ir(a,r,t),this.b=Ir(a,r,t-1/3)}return Zt.toWorkingColorSpace(this,n),this}setStyle(t,e=He){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const i=Nl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Zt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(De(Ae.r*255,0,255))*65536+Math.round(De(Ae.g*255,0,255))*256+Math.round(De(Ae.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Ae.copy(this),e);const i=Ae.r,n=Ae.g,r=Ae.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=He){Zt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,i=Ae.g,n=Ae.b;return t!==He?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(ms);const i=ts(Ti.h,ms.h,e),n=ts(Ti.s,ms.s,e),r=ts(Ti.l,ms.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Mt;Mt.NAMES=Nl;let jh=0;class Ni extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=_i(),this.name="",this.type="Material",this.blending=gi,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ia,this.blendDst=na,this.blendEquation=Yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=so,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nn,this.stencilZFail=nn,this.stencilZPass=nn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gi&&(i.blending=this.blending),this.side!==Di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ia&&(i.blendSrc=this.blendSrc),this.blendDst!==na&&(i.blendDst=this.blendDst),this.blendEquation!==Yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==so&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==nn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==nn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class vi extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Te,this.combine=Ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new T,gs=new mt;class Se{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=oa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return fa("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)gs.fromBufferAttribute(this,e),gs.applyMatrix3(t),this.setXY(e,gs.x,gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=je(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=jt(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=je(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=je(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=je(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=je(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array),n=jt(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==oa&&(t.usage=this.usage),t}}class Fl extends Se{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Ol extends Se{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ue extends Se{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Zh=0;const Ge=new Wt,Nr=new re,fn=new T,ke=new xi,Vn=new xi,ye=new T;class we extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=_i(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dl(t)?Ol:Fl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Dt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ge.makeRotationFromQuaternion(t),this.applyMatrix4(Ge),this}rotateX(t){return Ge.makeRotationX(t),this.applyMatrix4(Ge),this}rotateY(t){return Ge.makeRotationY(t),this.applyMatrix4(Ge),this}rotateZ(t){return Ge.makeRotationZ(t),this.applyMatrix4(Ge),this}translate(t,e,i){return Ge.makeTranslation(t,e,i),this.applyMatrix4(Ge),this}scale(t,e,i){return Ge.makeScale(t,e,i),this.applyMatrix4(Ge),this}lookAt(t){return Nr.lookAt(t),Nr.updateMatrix(),this.applyMatrix4(Nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fn).negate(),this.translate(fn.x,fn.y,fn.z),this}setFromPoints(t){const e=[];for(let i=0,n=t.length;i<n;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const r=e[i];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const i=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Vn.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(ke.min,Vn.min),ke.expandByPoint(ye),ye.addVectors(ke.max,Vn.max),ke.expandByPoint(ye)):(ke.expandByPoint(Vn.min),ke.expandByPoint(Vn.max))}ke.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ye.fromBufferAttribute(o,c),l&&(fn.fromBufferAttribute(t,c),ye.add(fn)),n=Math.max(n,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Se(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<i.count;I++)o[I]=new T,l[I]=new T;const c=new T,h=new T,u=new T,f=new mt,m=new mt,g=new mt,_=new T,p=new T;function d(I,b,x){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,b),u.fromBufferAttribute(i,x),f.fromBufferAttribute(r,I),m.fromBufferAttribute(r,b),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),m.sub(f),g.sub(f);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(R),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(R),o[I].add(_),o[b].add(_),o[x].add(_),l[I].add(p),l[b].add(p),l[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let I=0,b=y.length;I<b;++I){const x=y[I],R=x.start,B=x.count;for(let k=R,W=R+B;k<W;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new T,S=new T,P=new T,E=new T;function A(I){P.fromBufferAttribute(n,I),E.copy(P);const b=o[I];v.copy(b),v.sub(P.multiplyScalar(P.dot(b))).normalize(),S.crossVectors(E,b);const R=S.dot(l[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,R)}for(let I=0,b=y.length;I<b;++I){const x=y[I],R=x.start,B=x.count;for(let k=R,W=R+B;k<W;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Se(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const n=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);n.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)n.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[m++]}return new Se(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=t(f,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(n[l]=h,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const n=t.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yo=new Wt,ki=new lr,_s=new Ji,So=new T,pn=new T,mn=new T,gn=new T,Fr=new T,vs=new T,xs=new mt,Ms=new mt,ys=new mt,wo=new T,bo=new T,To=new T,Ss=new T,ws=new T;class bt extends re{constructor(t=new we,e=new vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(r&&o){vs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Fr.fromBufferAttribute(u,t),a?vs.addScaledVector(Fr,h):vs.addScaledVector(Fr.sub(e),h))}e.add(vs)}return e}raycast(t,e){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(r),ki.copy(t.ray).recast(t.near),!(_s.containsPoint(ki.origin)===!1&&(ki.intersectSphere(_s,So)===null||ki.origin.distanceToSquared(So)>(t.far-t.near)**2))&&(yo.copy(r).invert(),ki.copy(t.ray).applyMatrix4(yo),!(i.boundingBox!==null&&ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ki)))}_computeIntersections(t,e,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],y=Math.max(p.start,m.start),v=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let S=y,P=v;S<P;S+=3){const E=o.getX(S),A=o.getX(S+1),I=o.getX(S+2);n=bs(this,d,t,i,c,h,u,E,A,I),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const y=o.getX(p),v=o.getX(p+1),S=o.getX(p+2);n=bs(this,a,t,i,c,h,u,y,v,S),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],y=Math.max(p.start,m.start),v=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let S=y,P=v;S<P;S+=3){const E=S,A=S+1,I=S+2;n=bs(this,d,t,i,c,h,u,E,A,I),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=p.materialIndex,e.push(n))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const y=p,v=p+1,S=p+2;n=bs(this,a,t,i,c,h,u,y,v,S),n&&(n.faceIndex=Math.floor(p/3),e.push(n))}}}}function Qh(s,t,e,i,n,r,a,o){let l;if(t.side===Ie?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,t.side===Di,o),l===null)return null;ws.copy(o),ws.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ws);return c<e.near||c>e.far?null:{distance:c,point:ws.clone(),object:s}}function bs(s,t,e,i,n,r,a,o,l,c){s.getVertexPosition(o,pn),s.getVertexPosition(l,mn),s.getVertexPosition(c,gn);const h=Qh(s,t,e,i,pn,mn,gn,Ss);if(h){n&&(xs.fromBufferAttribute(n,o),Ms.fromBufferAttribute(n,l),ys.fromBufferAttribute(n,c),h.uv=Ze.getInterpolation(Ss,pn,mn,gn,xs,Ms,ys,new mt)),r&&(xs.fromBufferAttribute(r,o),Ms.fromBufferAttribute(r,l),ys.fromBufferAttribute(r,c),h.uv1=Ze.getInterpolation(Ss,pn,mn,gn,xs,Ms,ys,new mt)),a&&(wo.fromBufferAttribute(a,o),bo.fromBufferAttribute(a,l),To.fromBufferAttribute(a,c),h.normal=Ze.getInterpolation(Ss,pn,mn,gn,wo,bo,To,new T),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new T,materialIndex:0};Ze.getNormal(pn,mn,gn,u.normal),h.face=u}return h}class Rt extends we{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,r,4),g("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(u,2));function g(_,p,d,y,v,S,P,E,A,I,b){const x=S/A,R=P/I,B=S/2,k=P/2,W=E/2,Y=A+1,G=I+1;let K=0,V=0;const st=new T;for(let ut=0;ut<G;ut++){const ft=ut*R-k;for(let Ct=0;Ct<Y;Ct++){const qt=Ct*x-B;st[_]=qt*y,st[p]=ft*v,st[d]=W,c.push(st.x,st.y,st.z),st[_]=0,st[p]=0,st[d]=E>0?1:-1,h.push(st.x,st.y,st.z),u.push(Ct/A),u.push(1-ut/I),K+=1}}for(let ut=0;ut<I;ut++)for(let ft=0;ft<A;ft++){const Ct=f+ft+Y*ut,qt=f+ft+Y*(ut+1),X=f+(ft+1)+Y*(ut+1),J=f+(ft+1)+Y*ut;l.push(Ct,qt,J),l.push(qt,X,J),V+=6}o.addGroup(m,V,b),m+=V,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function In(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Le(s){const t={};for(let e=0;e<s.length;e++){const i=In(s[e]);for(const n in i)t[n]=i[n]}return t}function Jh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function zl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const Zs={clone:In,merge:Le};var tu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class se extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tu,this.fragmentShader=eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=In(t.uniforms),this.uniformsGroups=Jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Bl extends re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new T,Eo=new mt,Ao=new mt;class Ue extends Bl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=es*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Jn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return es*2*Math.atan(Math.tan(Jn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z)}getViewSize(t,e){return this.getViewBounds(t,Eo,Ao),e.subVectors(Ao,Eo)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Jn*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _n=-90,vn=1;class iu extends re{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ue(_n,vn,t,e);n.layers=this.layers,this.add(n);const r=new Ue(_n,vn,t,e);r.layers=this.layers,this.add(r);const a=new Ue(_n,vn,t,e);a.layers=this.layers,this.add(a);const o=new Ue(_n,vn,t,e);o.layers=this.layers,this.add(o);const l=new Ue(_n,vn,t,e);l.layers=this.layers,this.add(l);const c=new Ue(_n,vn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===pi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,r),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(u,f,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class kl extends Ce{constructor(t,e,i,n,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Rn,super(t,e,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nu extends Je{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new kl(n,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Rt(5,5,5),r=new se({name:"CubemapFromEquirect",uniforms:In(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ie,blending:mi});r.uniforms.tEquirect.value=e;const a=new bt(n,r),o=e.minFilter;return e.minFilter===ji&&(e.minFilter=Ke),new iu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,n){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}}const Or=new T,su=new T,ru=new Dt;class Xi{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Or.subVectors(i,e).cross(su.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Or),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||ru.getNormalMatrix(t),n=this.coplanarPoint(Or).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hi=new Ji,Ts=new T;class ma{constructor(t=new Xi,e=new Xi,i=new Xi,n=new Xi,r=new Xi,a=new Xi){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=pi){const i=this.planes,n=t.elements,r=n[0],a=n[1],o=n[2],l=n[3],c=n[4],h=n[5],u=n[6],f=n[7],m=n[8],g=n[9],_=n[10],p=n[11],d=n[12],y=n[13],v=n[14],S=n[15];if(i[0].setComponents(l-r,f-c,p-m,S-d).normalize(),i[1].setComponents(l+r,f+c,p+m,S+d).normalize(),i[2].setComponents(l+a,f+h,p+g,S+y).normalize(),i[3].setComponents(l-a,f-h,p-g,S-y).normalize(),i[4].setComponents(l-o,f-u,p-_,S-v).normalize(),e===pi)i[5].setComponents(l+o,f+u,p+_,S+v).normalize();else if(e===Ks)i[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(t){return Hi.center.set(0,0,0),Hi.radius=.7071067811865476,Hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Ts.x=n.normal.x>0?t.max.x:t.min.x,Ts.y=n.normal.y>0?t.max.y:t.min.y,Ts.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Ts)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Hl(){let s=null,t=!1,e=null,i=null;function n(r,a){e(r,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function au(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=s.createBuffer();s.bindBuffer(l,f),s.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l._updateRange,f=l.updateRanges;if(s.bindBuffer(c,o),u.count===-1&&f.length===0&&s.bufferSubData(c,0,h),f.length!==0){for(let m=0,g=f.length;m<g;m++){const _=f[m];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}class ri extends we{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=t/o,f=e/l,m=[],g=[],_=[],p=[];for(let d=0;d<h;d++){const y=d*f-a;for(let v=0;v<c;v++){const S=v*u-r;g.push(S,-y,0),_.push(0,0,1),p.push(v/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<o;y++){const v=y+c*d,S=y+c*(d+1),P=y+1+c*(d+1),E=y+1+c*d;m.push(v,S,E),m.push(S,P,E)}this.setIndex(m),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ri(t.width,t.height,t.widthSegments,t.heightSegments)}}var ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,cu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,du=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mu=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,gu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Mu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Au=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ru=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( batchId );
	vColor.xyz *= batchingColor.xyz;
#endif`,Pu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Du=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Iu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ou="gl_FragColor = linearToOutputTexel( gl_FragColor );",zu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Bu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$u=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ku=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ju=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ju=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,td=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ed=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ad=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,od=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ld=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ud=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,md=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_d=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Md=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Td=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ad=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ld=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Id=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Od=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Gd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$d=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ef=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,df=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ff=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,mf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_f=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ef=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Df=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,If=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ff=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lt={alphahash_fragment:ou,alphahash_pars_fragment:lu,alphamap_fragment:cu,alphamap_pars_fragment:hu,alphatest_fragment:uu,alphatest_pars_fragment:du,aomap_fragment:fu,aomap_pars_fragment:pu,batching_pars_vertex:mu,batching_vertex:gu,begin_vertex:_u,beginnormal_vertex:vu,bsdfs:xu,iridescence_fragment:Mu,bumpmap_pars_fragment:yu,clipping_planes_fragment:Su,clipping_planes_pars_fragment:wu,clipping_planes_pars_vertex:bu,clipping_planes_vertex:Tu,color_fragment:Eu,color_pars_fragment:Au,color_pars_vertex:Cu,color_vertex:Ru,common:Pu,cube_uv_reflection_fragment:Lu,defaultnormal_vertex:Du,displacementmap_pars_vertex:Uu,displacementmap_vertex:Iu,emissivemap_fragment:Nu,emissivemap_pars_fragment:Fu,colorspace_fragment:Ou,colorspace_pars_fragment:zu,envmap_fragment:Bu,envmap_common_pars_fragment:ku,envmap_pars_fragment:Hu,envmap_pars_vertex:Vu,envmap_physical_pars_fragment:Ju,envmap_vertex:Gu,fog_vertex:Wu,fog_pars_vertex:Xu,fog_fragment:qu,fog_pars_fragment:Yu,gradientmap_pars_fragment:$u,lightmap_pars_fragment:Ku,lights_lambert_fragment:ju,lights_lambert_pars_fragment:Zu,lights_pars_begin:Qu,lights_toon_fragment:td,lights_toon_pars_fragment:ed,lights_phong_fragment:id,lights_phong_pars_fragment:nd,lights_physical_fragment:sd,lights_physical_pars_fragment:rd,lights_fragment_begin:ad,lights_fragment_maps:od,lights_fragment_end:ld,logdepthbuf_fragment:cd,logdepthbuf_pars_fragment:hd,logdepthbuf_pars_vertex:ud,logdepthbuf_vertex:dd,map_fragment:fd,map_pars_fragment:pd,map_particle_fragment:md,map_particle_pars_fragment:gd,metalnessmap_fragment:_d,metalnessmap_pars_fragment:vd,morphinstance_vertex:xd,morphcolor_vertex:Md,morphnormal_vertex:yd,morphtarget_pars_vertex:Sd,morphtarget_vertex:wd,normal_fragment_begin:bd,normal_fragment_maps:Td,normal_pars_fragment:Ed,normal_pars_vertex:Ad,normal_vertex:Cd,normalmap_pars_fragment:Rd,clearcoat_normal_fragment_begin:Pd,clearcoat_normal_fragment_maps:Ld,clearcoat_pars_fragment:Dd,iridescence_pars_fragment:Ud,opaque_fragment:Id,packing:Nd,premultiplied_alpha_fragment:Fd,project_vertex:Od,dithering_fragment:zd,dithering_pars_fragment:Bd,roughnessmap_fragment:kd,roughnessmap_pars_fragment:Hd,shadowmap_pars_fragment:Vd,shadowmap_pars_vertex:Gd,shadowmap_vertex:Wd,shadowmask_pars_fragment:Xd,skinbase_vertex:qd,skinning_pars_vertex:Yd,skinning_vertex:$d,skinnormal_vertex:Kd,specularmap_fragment:jd,specularmap_pars_fragment:Zd,tonemapping_fragment:Qd,tonemapping_pars_fragment:Jd,transmission_fragment:tf,transmission_pars_fragment:ef,uv_pars_fragment:nf,uv_pars_vertex:sf,uv_vertex:rf,worldpos_vertex:af,background_vert:of,background_frag:lf,backgroundCube_vert:cf,backgroundCube_frag:hf,cube_vert:uf,cube_frag:df,depth_vert:ff,depth_frag:pf,distanceRGBA_vert:mf,distanceRGBA_frag:gf,equirect_vert:_f,equirect_frag:vf,linedashed_vert:xf,linedashed_frag:Mf,meshbasic_vert:yf,meshbasic_frag:Sf,meshlambert_vert:wf,meshlambert_frag:bf,meshmatcap_vert:Tf,meshmatcap_frag:Ef,meshnormal_vert:Af,meshnormal_frag:Cf,meshphong_vert:Rf,meshphong_frag:Pf,meshphysical_vert:Lf,meshphysical_frag:Df,meshtoon_vert:Uf,meshtoon_frag:If,points_vert:Nf,points_frag:Ff,shadow_vert:Of,shadow_frag:zf,sprite_vert:Bf,sprite_frag:kf},nt={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},ii={basic:{uniforms:Le([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Le([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Le([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Le([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Le([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Mt(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Le([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Le([nt.points,nt.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Le([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Le([nt.common,nt.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Le([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Le([nt.sprite,nt.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distanceRGBA:{uniforms:Le([nt.common,nt.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distanceRGBA_vert,fragmentShader:Lt.distanceRGBA_frag},shadow:{uniforms:Le([nt.lights,nt.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};ii.physical={uniforms:Le([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};const Es={r:0,b:0,g:0},Vi=new Te,Hf=new Wt;function Vf(s,t,e,i,n,r,a){const o=new Mt(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const S=g(y);S===null?d(o,l):S&&S.isColor&&(d(S,1),v=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(y,v){const S=g(v);S&&(S.isCubeTexture||S.mapping===ar)?(h===void 0&&(h=new bt(new Rt(1,1,1),new se({name:"BackgroundCubeMaterial",uniforms:In(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),Vi.copy(v.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hf.makeRotationFromEuler(Vi)),h.material.toneMapped=Zt.getTransfer(S.colorSpace)!==ie,(u!==S||f!==S.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,f=S.version,m=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new bt(new ri(2,2),new se({name:"BackgroundMaterial",uniforms:In(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(S.colorSpace)!==ie,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,m=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,v){y.getRGB(Es,zl(s)),i.buffers.color.setClear(Es.r,Es.g,Es.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(y,v=1){o.set(y),l=v,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(o,l)},render:_,addToRenderList:p}}function Gf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=f(null);let r=n,a=!1;function o(x,R,B,k,W){let Y=!1;const G=u(k,B,R);r!==G&&(r=G,c(r.object)),Y=m(x,k,B,W),Y&&g(x,k,B,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,S(x,R,B,k),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return s.createVertexArray()}function c(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function u(x,R,B){const k=B.wireframe===!0;let W=i[x.id];W===void 0&&(W={},i[x.id]=W);let Y=W[R.id];Y===void 0&&(Y={},W[R.id]=Y);let G=Y[k];return G===void 0&&(G=f(l()),Y[k]=G),G}function f(x){const R=[],B=[],k=[];for(let W=0;W<e;W++)R[W]=0,B[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:k,object:x,attributes:{},index:null}}function m(x,R,B,k){const W=r.attributes,Y=R.attributes;let G=0;const K=B.getAttributes();for(const V in K)if(K[V].location>=0){const ut=W[V];let ft=Y[V];if(ft===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor)),ut===void 0||ut.attribute!==ft||ft&&ut.data!==ft.data)return!0;G++}return r.attributesNum!==G||r.index!==k}function g(x,R,B,k){const W={},Y=R.attributes;let G=0;const K=B.getAttributes();for(const V in K)if(K[V].location>=0){let ut=Y[V];ut===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor));const ft={};ft.attribute=ut,ut&&ut.data&&(ft.data=ut.data),W[V]=ft,G++}r.attributes=W,r.attributesNum=G,r.index=k}function _(){const x=r.newAttributes;for(let R=0,B=x.length;R<B;R++)x[R]=0}function p(x){d(x,0)}function d(x,R){const B=r.newAttributes,k=r.enabledAttributes,W=r.attributeDivisors;B[x]=1,k[x]===0&&(s.enableVertexAttribArray(x),k[x]=1),W[x]!==R&&(s.vertexAttribDivisor(x,R),W[x]=R)}function y(){const x=r.newAttributes,R=r.enabledAttributes;for(let B=0,k=R.length;B<k;B++)R[B]!==x[B]&&(s.disableVertexAttribArray(B),R[B]=0)}function v(x,R,B,k,W,Y,G){G===!0?s.vertexAttribIPointer(x,R,B,W,Y):s.vertexAttribPointer(x,R,B,k,W,Y)}function S(x,R,B,k){_();const W=k.attributes,Y=B.getAttributes(),G=R.defaultAttributeValues;for(const K in Y){const V=Y[K];if(V.location>=0){let st=W[K];if(st===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(st=x.instanceColor)),st!==void 0){const ut=st.normalized,ft=st.itemSize,Ct=t.get(st);if(Ct===void 0)continue;const qt=Ct.buffer,X=Ct.type,J=Ct.bytesPerElement,pt=X===s.INT||X===s.UNSIGNED_INT||st.gpuType===wl;if(st.isInterleavedBufferAttribute){const ot=st.data,Ft=ot.stride,Ut=st.offset;if(ot.isInstancedInterleavedBuffer){for(let Gt=0;Gt<V.locationSize;Gt++)d(V.location+Gt,ot.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Gt=0;Gt<V.locationSize;Gt++)p(V.location+Gt);s.bindBuffer(s.ARRAY_BUFFER,qt);for(let Gt=0;Gt<V.locationSize;Gt++)v(V.location+Gt,ft/V.locationSize,X,ut,Ft*J,(Ut+ft/V.locationSize*Gt)*J,pt)}else{if(st.isInstancedBufferAttribute){for(let ot=0;ot<V.locationSize;ot++)d(V.location+ot,st.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let ot=0;ot<V.locationSize;ot++)p(V.location+ot);s.bindBuffer(s.ARRAY_BUFFER,qt);for(let ot=0;ot<V.locationSize;ot++)v(V.location+ot,ft/V.locationSize,X,ut,ft*J,ft/V.locationSize*ot*J,pt)}}else if(G!==void 0){const ut=G[K];if(ut!==void 0)switch(ut.length){case 2:s.vertexAttrib2fv(V.location,ut);break;case 3:s.vertexAttrib3fv(V.location,ut);break;case 4:s.vertexAttrib4fv(V.location,ut);break;default:s.vertexAttrib1fv(V.location,ut)}}}}y()}function P(){I();for(const x in i){const R=i[x];for(const B in R){const k=R[B];for(const W in k)h(k[W].object),delete k[W];delete R[B]}delete i[x]}}function E(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const B in R){const k=R[B];for(const W in k)h(k[W].object),delete k[W];delete R[B]}delete i[x.id]}function A(x){for(const R in i){const B=i[R];if(B[x.id]===void 0)continue;const k=B[x.id];for(const W in k)h(k[W].object),delete k[W];delete B[x.id]}}function I(){b(),a=!0,r!==n&&(r=n,c(r.object))}function b(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:E,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function Wf(s,t,e){let i;function n(c){i=c}function r(c,h){s.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<u;m++)this.render(c[m],h[m]);else{f.multiDrawArraysWEBGL(i,c,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];e.update(m,i,1)}}function l(c,h,u,f){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<f.length;_++)e.update(g,i,f[_])}}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xf(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(E){return!(E!==ni&&i.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const A=E===Li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Ui&&i.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==fi&&!A)}function l(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),d=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=m>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:d,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:S,maxSamples:P}}function qf(s){const t=this;let e=null,i=0,n=!1,r=!1;const a=new Xi,o=new Dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||n;return n=f,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,d=s.get(u);if(!n||g===null||g.length===0||r&&!p)r?h(null):c();else{const y=r?0:i,v=y*4;let S=d.clippingState||null;l.value=S,S=h(g,f,v,m);for(let P=0;P!==v;++P)S[P]=e[P];d.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const d=m+_*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<d)&&(p=new Float32Array(d));for(let v=0,S=m;v!==_;++v,S+=4)a.copy(u[v]).applyMatrix4(y,o),a.normal.toArray(p,S),p[S+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Yf(s){let t=new WeakMap;function e(a,o){return o===sa?a.mapping=Rn:o===ra&&(a.mapping=Pn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===sa||o===ra)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new nu(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",n),e(c.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class ga extends Bl{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Tn=4,Co=[.125,.215,.35,.446,.526,.582],$i=20,zr=new ga,Ro=new Mt;let Br=null,kr=0,Hr=0,Vr=!1;const qi=(1+Math.sqrt(5))/2,xn=1/qi,Po=[new T(-qi,xn,0),new T(qi,xn,0),new T(-xn,0,qi),new T(xn,0,qi),new T(0,qi,-xn),new T(0,qi,xn),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class Lo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100){Br=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,n,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Br,kr,Hr),this._renderer.xr.enabled=Vr,t.scissorTest=!1,As(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rn||t.mapping===Pn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Br=this._renderer.getRenderTarget(),kr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),Vr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:Li,format:ni,colorSpace:Ii,depthBuffer:!1},n=Do(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Do(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$f(r)),this._blurMaterial=Kf(r,t,e)}return n}_compileMaterial(t){const e=new bt(this._lodPlanes[0],t);this._renderer.compile(e,zr)}_sceneToCubeUV(t,e,i,n){const o=new Ue(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ro),h.toneMapping=Pi,h.autoClear=!1;const m=new vi({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new bt(new Rt,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(Ro),_=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):y===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const v=this._cubeSize;As(n,y*v,d>2?v:0,v,v),h.setRenderTarget(n),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Rn||t.mapping===Pn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Io()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uo());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new bt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;As(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,zr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let r=1;r<n;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Po[(n-r-1)%Po.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",r),this._halfBlur(a,t,i,i,n,"longitudinal",r)}_halfBlur(t,e,i,n,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new bt(this._lodPlanes[n],c),f=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*$i-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):$i;p>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$i}`);const d=[];let y=0;for(let A=0;A<$i;++A){const I=A/_,b=Math.exp(-I*I/2);d.push(b),A===0?y+=b:A<p&&(y+=2*b)}for(let A=0;A<d.length;A++)d[A]=d[A]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const S=this._sizeLods[n],P=3*S*(n>v-Tn?n-v+Tn:0),E=4*(this._cubeSize-S);As(e,P,E,3*S,2*S),l.setRenderTarget(e),l.render(u,zr)}}function $f(s){const t=[],e=[],i=[];let n=s;const r=s-Tn+1+Co.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);e.push(o);let l=1/o;a>s-Tn?l=Co[a-s+Tn-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,d=1,y=new Float32Array(_*g*m),v=new Float32Array(p*g*m),S=new Float32Array(d*g*m);for(let E=0;E<m;E++){const A=E%3*2/3-1,I=E>2?0:-1,b=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];y.set(b,_*g*E),v.set(f,p*g*E);const x=[E,E,E,E,E,E];S.set(x,d*g*E)}const P=new we;P.setAttribute("position",new Se(y,_)),P.setAttribute("uv",new Se(v,p)),P.setAttribute("faceIndex",new Se(S,d)),t.push(P),n>Tn&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Do(s,t,e){const i=new Je(s,t,e);return i.texture.mapping=ar,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function As(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function Kf(s,t,e){const i=new Float32Array($i),n=new T(0,1,0);return new se({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Uo(){return new se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Io(){return new se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function _a(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jf(s){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===sa||l===ra,h=l===Rn||l===Pn;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Lo(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&n(m)?(e===null&&(e=new Lo(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Zf(s){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&fa("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Qf(s,t,e,i){const n={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete n[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return n[f.id]===!0||(f.addEventListener("dispose",a),n[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)t.update(_[p],s.ARRAY_BUFFER)}}function c(u){const f=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const y=m.array;_=m.version;for(let v=0,S=y.length;v<S;v+=3){const P=y[v+0],E=y[v+1],A=y[v+2];f.push(P,E,E,A,A,P)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,S=y.length/3-1;v<S;v+=3){const P=v+0,E=v+1,A=v+2;f.push(P,E,E,A,A,P)}}else return;const p=new(Dl(f)?Ol:Fl)(f,1);p.version=_;const d=r.get(u);d&&t.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Jf(s,t,e){let i;function n(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,m){s.drawElements(i,m,r,f*a),e.update(m,i,1)}function c(f,m,g){g!==0&&(s.drawElementsInstanced(i,m,r,f*a,g),e.update(m,i,g))}function h(f,m,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<g;p++)this.render(f[p]/a,m[p]);else{_.multiDrawElementsWEBGL(i,m,0,r,f,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];e.update(p,i,1)}}function u(f,m,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)c(f[d]/a,m[d],_[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,_,0,g);let d=0;for(let y=0;y<g;y++)d+=m[y];for(let y=0;y<_.length;y++)e.update(d,i,_[y])}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tp(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function ep(s,t,e){const i=new WeakMap,n=new ne;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let x=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",x)};var m=x;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let P=o.attributes.position.count*S,E=1;P>t.maxTextureSize&&(E=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const A=new Float32Array(P*E*4*u),I=new Il(A,P,E,u);I.type=fi,I.needsUpdate=!0;const b=S*4;for(let R=0;R<u;R++){const B=d[R],k=y[R],W=v[R],Y=P*E*4*R;for(let G=0;G<B.count;G++){const K=G*b;g===!0&&(n.fromBufferAttribute(B,G),A[Y+K+0]=n.x,A[Y+K+1]=n.y,A[Y+K+2]=n.z,A[Y+K+3]=0),_===!0&&(n.fromBufferAttribute(k,G),A[Y+K+4]=n.x,A[Y+K+5]=n.y,A[Y+K+6]=n.z,A[Y+K+7]=0),p===!0&&(n.fromBufferAttribute(W,G),A[Y+K+8]=n.x,A[Y+K+9]=n.y,A[Y+K+10]=n.z,A[Y+K+11]=W.itemSize===4?n.w:1)}}f={count:u,texture:I,size:new mt(P,E)},i.set(o,f),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function ip(s,t,e,i){let n=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(n.get(u)!==c&&(t.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;n.get(f)!==c&&(f.update(),n.set(f,c))}return u}function a(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Vl extends Ce{constructor(t,e,i,n,r,a,o,l,c,h=En){if(h!==En&&h!==Un)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===En&&(i=Ln),i===void 0&&h===Un&&(i=Dn),super(null,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Gl=new Ce,Wl=new Vl(1,1);Wl.compareFunction=Ll;const Xl=new Il,ql=new Vh,Yl=new kl,No=[],Fo=[],Oo=new Float32Array(16),zo=new Float32Array(9),Bo=new Float32Array(4);function On(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let r=No[n];if(r===void 0&&(r=new Float32Array(n),No[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function _e(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function ve(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function cr(s,t){let e=Fo[t];e===void 0&&(e=new Int32Array(t),Fo[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function np(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function sp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2fv(this.addr,t),ve(e,t)}}function rp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;s.uniform3fv(this.addr,t),ve(e,t)}}function ap(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4fv(this.addr,t),ve(e,t)}}function op(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,i))return;Bo.set(i),s.uniformMatrix2fv(this.addr,!1,Bo),ve(e,i)}}function lp(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,i))return;zo.set(i),s.uniformMatrix3fv(this.addr,!1,zo),ve(e,i)}}function cp(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(_e(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,i))return;Oo.set(i),s.uniformMatrix4fv(this.addr,!1,Oo),ve(e,i)}}function hp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2iv(this.addr,t),ve(e,t)}}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3iv(this.addr,t),ve(e,t)}}function fp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4iv(this.addr,t),ve(e,t)}}function pp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function mp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;s.uniform2uiv(this.addr,t),ve(e,t)}}function gp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;s.uniform3uiv(this.addr,t),ve(e,t)}}function _p(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;s.uniform4uiv(this.addr,t),ve(e,t)}}function vp(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?Wl:Gl;e.setTexture2D(t||r,n)}function xp(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||ql,n)}function Mp(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Yl,n)}function yp(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Xl,n)}function Sp(s){switch(s){case 5126:return np;case 35664:return sp;case 35665:return rp;case 35666:return ap;case 35674:return op;case 35675:return lp;case 35676:return cp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return yp}}function wp(s,t){s.uniform1fv(this.addr,t)}function bp(s,t){const e=On(t,this.size,2);s.uniform2fv(this.addr,e)}function Tp(s,t){const e=On(t,this.size,3);s.uniform3fv(this.addr,e)}function Ep(s,t){const e=On(t,this.size,4);s.uniform4fv(this.addr,e)}function Ap(s,t){const e=On(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Cp(s,t){const e=On(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Rp(s,t){const e=On(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Pp(s,t){s.uniform1iv(this.addr,t)}function Lp(s,t){s.uniform2iv(this.addr,t)}function Dp(s,t){s.uniform3iv(this.addr,t)}function Up(s,t){s.uniform4iv(this.addr,t)}function Ip(s,t){s.uniform1uiv(this.addr,t)}function Np(s,t){s.uniform2uiv(this.addr,t)}function Fp(s,t){s.uniform3uiv(this.addr,t)}function Op(s,t){s.uniform4uiv(this.addr,t)}function zp(s,t,e){const i=this.cache,n=t.length,r=cr(e,n);_e(i,r)||(s.uniform1iv(this.addr,r),ve(i,r));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Gl,r[a])}function Bp(s,t,e){const i=this.cache,n=t.length,r=cr(e,n);_e(i,r)||(s.uniform1iv(this.addr,r),ve(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||ql,r[a])}function kp(s,t,e){const i=this.cache,n=t.length,r=cr(e,n);_e(i,r)||(s.uniform1iv(this.addr,r),ve(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Yl,r[a])}function Hp(s,t,e){const i=this.cache,n=t.length,r=cr(e,n);_e(i,r)||(s.uniform1iv(this.addr,r),ve(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Xl,r[a])}function Vp(s){switch(s){case 5126:return wp;case 35664:return bp;case 35665:return Tp;case 35666:return Ep;case 35674:return Ap;case 35675:return Cp;case 35676:return Rp;case 5124:case 35670:return Pp;case 35667:case 35671:return Lp;case 35668:case 35672:return Dp;case 35669:case 35673:return Up;case 5125:return Ip;case 36294:return Np;case 36295:return Fp;case 36296:return Op;case 35678:case 36198:case 36298:case 36306:case 35682:return zp;case 35679:case 36299:case 36307:return Bp;case 35680:case 36300:case 36308:case 36293:return kp;case 36289:case 36303:case 36311:case 36292:return Hp}}class Gp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Sp(e.type)}}class Wp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Vp(e.type)}}class Xp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(t,e[o.id],i)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function ko(s,t){s.seq.push(t),s.map[t.id]=t}function qp(s,t,e){const i=s.name,n=i.length;for(Gr.lastIndex=0;;){const r=Gr.exec(i),a=Gr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){ko(e,c===void 0?new Gp(o,s,t):new Wp(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new Xp(o),ko(e,u)),e=u}}}class ks{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=t.getActiveUniform(e,n),a=t.getUniformLocation(e,r.name);qp(r,a,this)}}setValue(t,e,i,n){const r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,r=t.length;n!==r;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Ho(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const Yp=37297;let $p=0;function Kp(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function jp(s){const t=Zt.getPrimaries(Zt.workingColorSpace),e=Zt.getPrimaries(s);let i;switch(t===e?i="":t===$s&&e===Ys?i="LinearDisplayP3ToLinearSRGB":t===Ys&&e===$s&&(i="LinearSRGBToLinearDisplayP3"),s){case Ii:case or:return[i,"LinearTransferOETF"];case He:case ua:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function Vo(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),n=s.getShaderInfoLog(t).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+n+`

`+Kp(s.getShaderSource(t),a)}else return n}function Zp(s,t){const e=jp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Qp(s,t){let e;switch(t){case Yc:e="Linear";break;case $c:e="Reinhard";break;case Kc:e="OptimizedCineon";break;case yl:e="ACESFilmic";break;case Zc:e="AgX";break;case Qc:e="Neutral";break;case jc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Jp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jn).join(`
`)}function tm(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function em(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(t,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function jn(s){return s!==""}function Go(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wo(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const im=/^[ \t]*#include +<([\w\d./]+)>/gm;function la(s){return s.replace(im,sm)}const nm=new Map;function sm(s,t){let e=Lt[t];if(e===void 0){const i=nm.get(t);if(i!==void 0)e=Lt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return la(e)}const rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xo(s){return s.replace(rm,am)}function am(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function qo(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function om(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===vl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===xl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===di&&(t="SHADOWMAP_TYPE_VSM"),t}function lm(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Rn:case Pn:t="ENVMAP_TYPE_CUBE";break;case ar:t="ENVMAP_TYPE_CUBE_UV";break}return t}function cm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Pn:t="ENVMAP_MODE_REFRACTION";break}return t}function hm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ml:t="ENVMAP_BLENDING_MULTIPLY";break;case Xc:t="ENVMAP_BLENDING_MIX";break;case qc:t="ENVMAP_BLENDING_ADD";break}return t}function um(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function dm(s,t,e,i){const n=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=om(e),c=lm(e),h=cm(e),u=hm(e),f=um(e),m=Jp(e),g=tm(r),_=n.createProgram();let p,d,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jn).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jn).join(`
`),d.length>0&&(d+=`
`)):(p=[qo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jn).join(`
`),d=[qo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?Lt.tonemapping_pars_fragment:"",e.toneMapping!==Pi?Qp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,Zp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(jn).join(`
`)),a=la(a),a=Go(a,e),a=Wo(a,e),o=la(o),o=Go(o,e),o=Wo(o,e),a=Xo(a),o=Xo(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",e.glslVersion===ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=y+p+a,S=y+d+o,P=Ho(n,n.VERTEX_SHADER,v),E=Ho(n,n.FRAGMENT_SHADER,S);n.attachShader(_,P),n.attachShader(_,E),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function A(R){if(s.debug.checkShaderErrors){const B=n.getProgramInfoLog(_).trim(),k=n.getShaderInfoLog(P).trim(),W=n.getShaderInfoLog(E).trim();let Y=!0,G=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,P,E);else{const K=Vo(n,P,"vertex"),V=Vo(n,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+K+`
`+V)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||W==="")&&(G=!1);G&&(R.diagnostics={runnable:Y,programLog:B,vertexShader:{log:k,prefix:p},fragmentShader:{log:W,prefix:d}})}n.deleteShader(P),n.deleteShader(E),I=new ks(n,_),b=em(n,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=n.getProgramParameter(_,Yp)),x},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$p++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=E,this}let fm=0;class pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new mm(t),e.set(t,i)),i}}class mm{constructor(t){this.id=fm++,this.code=t,this.usedTimes=0}}function gm(s,t,e,i,n,r,a){const o=new pa,l=new pm,c=new Set,h=[],u=n.logarithmicDepthBuffer,f=n.vertexTextures;let m=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,x,R,B,k){const W=B.fog,Y=k.geometry,G=b.isMeshStandardMaterial?B.environment:null,K=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),V=K&&K.mapping===ar?K.image.height:null,st=g[b.type];b.precision!==null&&(m=n.getMaxPrecision(b.precision),m!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",m,"instead."));const ut=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ft=ut!==void 0?ut.length:0;let Ct=0;Y.morphAttributes.position!==void 0&&(Ct=1),Y.morphAttributes.normal!==void 0&&(Ct=2),Y.morphAttributes.color!==void 0&&(Ct=3);let qt,X,J,pt;if(st){const Qt=ii[st];qt=Qt.vertexShader,X=Qt.fragmentShader}else qt=b.vertexShader,X=b.fragmentShader,l.update(b),J=l.getVertexShaderID(b),pt=l.getFragmentShaderID(b);const ot=s.getRenderTarget(),Ft=k.isInstancedMesh===!0,Ut=k.isBatchedMesh===!0,Gt=!!b.map,U=!!b.matcap,Vt=!!K,kt=!!b.aoMap,ae=!!b.lightMap,St=!!b.bumpMap,Xt=!!b.normalMap,Ot=!!b.displacementMap,Pt=!!b.emissiveMap,pe=!!b.metalnessMap,C=!!b.roughnessMap,M=b.anisotropy>0,H=b.clearcoat>0,j=b.dispersion>0,Z=b.iridescence>0,Q=b.sheen>0,xt=b.transmission>0,rt=M&&!!b.anisotropyMap,at=H&&!!b.clearcoatMap,It=H&&!!b.clearcoatNormalMap,tt=H&&!!b.clearcoatRoughnessMap,_t=Z&&!!b.iridescenceMap,zt=Z&&!!b.iridescenceThicknessMap,Et=Q&&!!b.sheenColorMap,lt=Q&&!!b.sheenRoughnessMap,Nt=!!b.specularMap,Ht=!!b.specularColorMap,de=!!b.specularIntensityMap,L=xt&&!!b.transmissionMap,ct=xt&&!!b.thicknessMap,q=!!b.gradientMap,$=!!b.alphaMap,it=b.alphaTest>0,At=!!b.alphaHash,Yt=!!b.extensions;let fe=Pi;b.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(fe=s.toneMapping);const xe={shaderID:st,shaderType:b.type,shaderName:b.name,vertexShader:qt,fragmentShader:X,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:m,batching:Ut,batchingColor:Ut&&k._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&k.instanceColor!==null,instancingMorph:Ft&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Ii,alphaToCoverage:!!b.alphaToCoverage,map:Gt,matcap:U,envMap:Vt,envMapMode:Vt&&K.mapping,envMapCubeUVHeight:V,aoMap:kt,lightMap:ae,bumpMap:St,normalMap:Xt,displacementMap:f&&Ot,emissiveMap:Pt,normalMapObjectSpace:Xt&&b.normalMapType===uh,normalMapTangentSpace:Xt&&b.normalMapType===Pl,metalnessMap:pe,roughnessMap:C,anisotropy:M,anisotropyMap:rt,clearcoat:H,clearcoatMap:at,clearcoatNormalMap:It,clearcoatRoughnessMap:tt,dispersion:j,iridescence:Z,iridescenceMap:_t,iridescenceThicknessMap:zt,sheen:Q,sheenColorMap:Et,sheenRoughnessMap:lt,specularMap:Nt,specularColorMap:Ht,specularIntensityMap:de,transmission:xt,transmissionMap:L,thicknessMap:ct,gradientMap:q,opaque:b.transparent===!1&&b.blending===gi&&b.alphaToCoverage===!1,alphaMap:$,alphaTest:it,alphaHash:At,combine:b.combine,mapUv:Gt&&_(b.map.channel),aoMapUv:kt&&_(b.aoMap.channel),lightMapUv:ae&&_(b.lightMap.channel),bumpMapUv:St&&_(b.bumpMap.channel),normalMapUv:Xt&&_(b.normalMap.channel),displacementMapUv:Ot&&_(b.displacementMap.channel),emissiveMapUv:Pt&&_(b.emissiveMap.channel),metalnessMapUv:pe&&_(b.metalnessMap.channel),roughnessMapUv:C&&_(b.roughnessMap.channel),anisotropyMapUv:rt&&_(b.anisotropyMap.channel),clearcoatMapUv:at&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:It&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:tt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:zt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:lt&&_(b.sheenRoughnessMap.channel),specularMapUv:Nt&&_(b.specularMap.channel),specularColorMapUv:Ht&&_(b.specularColorMap.channel),specularIntensityMapUv:de&&_(b.specularIntensityMap.channel),transmissionMapUv:L&&_(b.transmissionMap.channel),thicknessMapUv:ct&&_(b.thicknessMap.channel),alphaMapUv:$&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Xt||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(Gt||$),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:k.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Ct,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&R.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:Gt&&b.map.isVideoTexture===!0&&Zt.getTransfer(b.map.colorSpace)===ie,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ne,flipSided:b.side===Ie,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Yt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Yt&&b.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return xe.vertexUv1s=c.has(1),xe.vertexUv2s=c.has(2),xe.vertexUv3s=c.has(3),c.clear(),xe}function d(b){const x=[];if(b.shaderID?x.push(b.shaderID):(x.push(b.customVertexShaderID),x.push(b.customFragmentShaderID)),b.defines!==void 0)for(const R in b.defines)x.push(R),x.push(b.defines[R]);return b.isRawShaderMaterial===!1&&(y(x,b),v(x,b),x.push(s.outputColorSpace)),x.push(b.customProgramCacheKey),x.join()}function y(b,x){b.push(x.precision),b.push(x.outputColorSpace),b.push(x.envMapMode),b.push(x.envMapCubeUVHeight),b.push(x.mapUv),b.push(x.alphaMapUv),b.push(x.lightMapUv),b.push(x.aoMapUv),b.push(x.bumpMapUv),b.push(x.normalMapUv),b.push(x.displacementMapUv),b.push(x.emissiveMapUv),b.push(x.metalnessMapUv),b.push(x.roughnessMapUv),b.push(x.anisotropyMapUv),b.push(x.clearcoatMapUv),b.push(x.clearcoatNormalMapUv),b.push(x.clearcoatRoughnessMapUv),b.push(x.iridescenceMapUv),b.push(x.iridescenceThicknessMapUv),b.push(x.sheenColorMapUv),b.push(x.sheenRoughnessMapUv),b.push(x.specularMapUv),b.push(x.specularColorMapUv),b.push(x.specularIntensityMapUv),b.push(x.transmissionMapUv),b.push(x.thicknessMapUv),b.push(x.combine),b.push(x.fogExp2),b.push(x.sizeAttenuation),b.push(x.morphTargetsCount),b.push(x.morphAttributeCount),b.push(x.numDirLights),b.push(x.numPointLights),b.push(x.numSpotLights),b.push(x.numSpotLightMaps),b.push(x.numHemiLights),b.push(x.numRectAreaLights),b.push(x.numDirLightShadows),b.push(x.numPointLightShadows),b.push(x.numSpotLightShadows),b.push(x.numSpotLightShadowsWithMaps),b.push(x.numLightProbes),b.push(x.shadowMapType),b.push(x.toneMapping),b.push(x.numClippingPlanes),b.push(x.numClipIntersection),b.push(x.depthPacking)}function v(b,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.skinning&&o.enable(4),x.morphTargets&&o.enable(5),x.morphNormals&&o.enable(6),x.morphColors&&o.enable(7),x.premultipliedAlpha&&o.enable(8),x.shadowMapEnabled&&o.enable(9),x.doubleSided&&o.enable(10),x.flipSided&&o.enable(11),x.useDepthPacking&&o.enable(12),x.dithering&&o.enable(13),x.transmission&&o.enable(14),x.sheen&&o.enable(15),x.opaque&&o.enable(16),x.pointsUvs&&o.enable(17),x.decodeVideoTexture&&o.enable(18),x.alphaToCoverage&&o.enable(19),b.push(o.mask)}function S(b){const x=g[b.type];let R;if(x){const B=ii[x];R=Zs.clone(B.uniforms)}else R=b.uniforms;return R}function P(b,x){let R;for(let B=0,k=h.length;B<k;B++){const W=h[B];if(W.cacheKey===x){R=W,++R.usedTimes;break}}return R===void 0&&(R=new dm(s,x,b,r),h.push(R)),R}function E(b){if(--b.usedTimes===0){const x=h.indexOf(b);h[x]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:S,acquireProgram:P,releaseProgram:E,releaseShaderCache:A,programs:h,dispose:I}}function _m(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function i(r,a,o){s.get(r)[a]=o}function n(){s=new WeakMap}return{get:t,remove:e,update:i,dispose:n}}function vm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Yo(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function $o(){const s=[];let t=0;const e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u,f,m,g,_,p){let d=s[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=p),t++,d}function o(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?i.push(d):m.transparent===!0?n.push(d):e.push(d)}function l(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?i.unshift(d):m.transparent===!0?n.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||vm),i.length>1&&i.sort(f||Yo),n.length>1&&n.sort(f||Yo)}function h(){for(let u=t,f=s.length;u<f;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:o,unshift:l,finish:h,sort:c}}function xm(){let s=new WeakMap;function t(i,n){const r=s.get(i);let a;return r===void 0?(a=new $o,s.set(i,[a])):n>=r.length?(a=new $o,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Mm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new Mt};break;case"SpotLight":e={position:new T,direction:new T,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":e={color:new Mt,position:new T,halfWidth:new T,halfHeight:new T};break}return s[t.id]=e,e}}}function ym(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Sm=0;function wm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function bm(s){const t=new Mm,e=ym(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new T);const n=new T,r=new Wt,a=new Wt;function o(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let m=0,g=0,_=0,p=0,d=0,y=0,v=0,S=0,P=0,E=0,A=0;c.sort(wm);for(let b=0,x=c.length;b<x;b++){const R=c[b],B=R.color,k=R.intensity,W=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=B.r*k,u+=B.g*k,f+=B.b*k;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],k);A++}else if(R.isDirectionalLight){const G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,V=e.get(R);V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=Y,i.directionalShadowMatrix[m]=R.shadow.matrix,y++}i.directional[m]=G,m++}else if(R.isSpotLight){const G=t.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(B).multiplyScalar(k),G.distance=W,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[_]=G;const K=R.shadow;if(R.map&&(i.spotLightMap[P]=R.map,P++,K.updateMatrices(R),R.castShadow&&E++),i.spotLightMatrix[_]=K.matrix,R.castShadow){const V=e.get(R);V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,i.spotShadow[_]=V,i.spotShadowMap[_]=Y,S++}_++}else if(R.isRectAreaLight){const G=t.get(R);G.color.copy(B).multiplyScalar(k),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=G,p++}else if(R.isPointLight){const G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const K=R.shadow,V=e.get(R);V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=R.shadow.matrix,v++}i.point[g]=G,g++}else if(R.isHemisphereLight){const G=t.get(R);G.skyColor.copy(R.color).multiplyScalar(k),G.groundColor.copy(R.groundColor).multiplyScalar(k),i.hemi[d]=G,d++}}p>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const I=i.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==d||I.numDirectionalShadows!==y||I.numPointShadows!==v||I.numSpotShadows!==S||I.numSpotMaps!==P||I.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=p,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=S+P-E,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=A,I.directionalLength=m,I.pointLength=g,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=d,I.numDirectionalShadows=y,I.numPointShadows=v,I.numSpotShadows=S,I.numSpotMaps=P,I.numLightProbes=A,i.version=Sm++)}function l(c,h){let u=0,f=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const v=c[d];if(v.isDirectionalLight){const S=i.directional[u];S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),u++}else if(v.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),n.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),m++}else if(v.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),a.identity(),r.copy(v.matrixWorld),r.premultiply(p),a.extractRotation(r),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:i}}function Ko(s){const t=new bm(s),e=[],i=[];function n(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Tm(s){let t=new WeakMap;function e(n,r=0){const a=t.get(n);let o;return a===void 0?(o=new Ko(s),t.set(n,[o])):r>=a.length?(o=new Ko(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class Em extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Am extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Cm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Pm(s,t,e){let i=new ma;const n=new mt,r=new mt,a=new ne,o=new Em({depthPacking:hh}),l=new Am,c={},h=e.maxTextureSize,u={[Di]:Ie,[Ie]:Di,[Ne]:Ne},f=new se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:Cm,fragmentShader:Rm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new we;g.setAttribute("position",new Se(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new bt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vl;let d=this.type;this.render=function(E,A,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const b=s.getRenderTarget(),x=s.getActiveCubeFace(),R=s.getActiveMipmapLevel(),B=s.state;B.setBlending(mi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=d!==di&&this.type===di,W=d===di&&this.type!==di;for(let Y=0,G=E.length;Y<G;Y++){const K=E[Y],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;n.copy(V.mapSize);const st=V.getFrameExtents();if(n.multiply(st),r.copy(V.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/st.x),n.x=r.x*st.x,V.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/st.y),n.y=r.y*st.y,V.mapSize.y=r.y)),V.map===null||k===!0||W===!0){const ft=this.type!==di?{minFilter:Fe,magFilter:Fe}:{};V.map!==null&&V.map.dispose(),V.map=new Je(n.x,n.y,ft),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const ut=V.getViewportCount();for(let ft=0;ft<ut;ft++){const Ct=V.getViewport(ft);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),B.viewport(a),V.updateMatrices(K,ft),i=V.getFrustum(),S(A,I,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===di&&y(V,I),V.needsUpdate=!1}d=this.type,p.needsUpdate=!1,s.setRenderTarget(b,x,R)};function y(E,A){const I=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Je(n.x,n.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(A,null,I,f,_,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(A,null,I,m,_,null)}function v(E,A,I,b){let x=null;const R=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)x=R;else if(x=I.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,k=A.uuid;let W=c[B];W===void 0&&(W={},c[B]=W);let Y=W[k];Y===void 0&&(Y=x.clone(),W[k]=Y,A.addEventListener("dispose",P)),x=Y}if(x.visible=A.visible,x.wireframe=A.wireframe,b===di?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=s.properties.get(x);B.light=I}return x}function S(E,A,I,b,x){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===di)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);const k=t.update(E),W=E.material;if(Array.isArray(W)){const Y=k.groups;for(let G=0,K=Y.length;G<K;G++){const V=Y[G],st=W[V.materialIndex];if(st&&st.visible){const ut=v(E,st,b,x);E.onBeforeShadow(s,E,A,I,k,ut,V),s.renderBufferDirect(I,null,k,ut,E,V),E.onAfterShadow(s,E,A,I,k,ut,V)}}}else if(W.visible){const Y=v(E,W,b,x);E.onBeforeShadow(s,E,A,I,k,Y,null),s.renderBufferDirect(I,null,k,Y,E,null),E.onAfterShadow(s,E,A,I,k,Y,null)}}const B=E.children;for(let k=0,W=B.length;k<W;k++)S(B[k],A,I,b,x)}function P(E){E.target.removeEventListener("dispose",P);for(const I in c){const b=c[I],x=E.target.uuid;x in b&&(b[x].dispose(),delete b[x])}}}function Lm(s){function t(){let L=!1;const ct=new ne;let q=null;const $=new ne(0,0,0,0);return{setMask:function(it){q!==it&&!L&&(s.colorMask(it,it,it,it),q=it)},setLocked:function(it){L=it},setClear:function(it,At,Yt,fe,xe){xe===!0&&(it*=fe,At*=fe,Yt*=fe),ct.set(it,At,Yt,fe),$.equals(ct)===!1&&(s.clearColor(it,At,Yt,fe),$.copy(ct))},reset:function(){L=!1,q=null,$.set(-1,0,0,0)}}}function e(){let L=!1,ct=null,q=null,$=null;return{setTest:function(it){it?pt(s.DEPTH_TEST):ot(s.DEPTH_TEST)},setMask:function(it){ct!==it&&!L&&(s.depthMask(it),ct=it)},setFunc:function(it){if(q!==it){switch(it){case zc:s.depthFunc(s.NEVER);break;case Bc:s.depthFunc(s.ALWAYS);break;case kc:s.depthFunc(s.LESS);break;case Gs:s.depthFunc(s.LEQUAL);break;case Hc:s.depthFunc(s.EQUAL);break;case Vc:s.depthFunc(s.GEQUAL);break;case Gc:s.depthFunc(s.GREATER);break;case Wc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}q=it}},setLocked:function(it){L=it},setClear:function(it){$!==it&&(s.clearDepth(it),$=it)},reset:function(){L=!1,ct=null,q=null,$=null}}}function i(){let L=!1,ct=null,q=null,$=null,it=null,At=null,Yt=null,fe=null,xe=null;return{setTest:function(Qt){L||(Qt?pt(s.STENCIL_TEST):ot(s.STENCIL_TEST))},setMask:function(Qt){ct!==Qt&&!L&&(s.stencilMask(Qt),ct=Qt)},setFunc:function(Qt,ti,ei){(q!==Qt||$!==ti||it!==ei)&&(s.stencilFunc(Qt,ti,ei),q=Qt,$=ti,it=ei)},setOp:function(Qt,ti,ei){(At!==Qt||Yt!==ti||fe!==ei)&&(s.stencilOp(Qt,ti,ei),At=Qt,Yt=ti,fe=ei)},setLocked:function(Qt){L=Qt},setClear:function(Qt){xe!==Qt&&(s.clearStencil(Qt),xe=Qt)},reset:function(){L=!1,ct=null,q=null,$=null,it=null,At=null,Yt=null,fe=null,xe=null}}}const n=new t,r=new e,a=new i,o=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],m=null,g=!1,_=null,p=null,d=null,y=null,v=null,S=null,P=null,E=new Mt(0,0,0),A=0,I=!1,b=null,x=null,R=null,B=null,k=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,G=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=G>=1):K.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=G>=2);let V=null,st={};const ut=s.getParameter(s.SCISSOR_BOX),ft=s.getParameter(s.VIEWPORT),Ct=new ne().fromArray(ut),qt=new ne().fromArray(ft);function X(L,ct,q,$){const it=new Uint8Array(4),At=s.createTexture();s.bindTexture(L,At),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Yt=0;Yt<q;Yt++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,$,0,s.RGBA,s.UNSIGNED_BYTE,it):s.texImage2D(ct+Yt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,it);return At}const J={};J[s.TEXTURE_2D]=X(s.TEXTURE_2D,s.TEXTURE_2D,1),J[s.TEXTURE_CUBE_MAP]=X(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[s.TEXTURE_2D_ARRAY]=X(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),J[s.TEXTURE_3D]=X(s.TEXTURE_3D,s.TEXTURE_3D,1,1),n.setClear(0,0,0,1),r.setClear(1),a.setClear(0),pt(s.DEPTH_TEST),r.setFunc(Gs),St(!1),Xt(Ra),pt(s.CULL_FACE),kt(mi);function pt(L){c[L]!==!0&&(s.enable(L),c[L]=!0)}function ot(L){c[L]!==!1&&(s.disable(L),c[L]=!1)}function Ft(L,ct){return h[L]!==ct?(s.bindFramebuffer(L,ct),h[L]=ct,L===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ct),L===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function Ut(L,ct){let q=f,$=!1;if(L){q=u.get(ct),q===void 0&&(q=[],u.set(ct,q));const it=L.textures;if(q.length!==it.length||q[0]!==s.COLOR_ATTACHMENT0){for(let At=0,Yt=it.length;At<Yt;At++)q[At]=s.COLOR_ATTACHMENT0+At;q.length=it.length,$=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,$=!0);$&&s.drawBuffers(q)}function Gt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const U={[Yi]:s.FUNC_ADD,[yc]:s.FUNC_SUBTRACT,[Sc]:s.FUNC_REVERSE_SUBTRACT};U[wc]=s.MIN,U[bc]=s.MAX;const Vt={[Tc]:s.ZERO,[Ec]:s.ONE,[Ac]:s.SRC_COLOR,[ia]:s.SRC_ALPHA,[Uc]:s.SRC_ALPHA_SATURATE,[Lc]:s.DST_COLOR,[Rc]:s.DST_ALPHA,[Cc]:s.ONE_MINUS_SRC_COLOR,[na]:s.ONE_MINUS_SRC_ALPHA,[Dc]:s.ONE_MINUS_DST_COLOR,[Pc]:s.ONE_MINUS_DST_ALPHA,[Ic]:s.CONSTANT_COLOR,[Nc]:s.ONE_MINUS_CONSTANT_COLOR,[Fc]:s.CONSTANT_ALPHA,[Oc]:s.ONE_MINUS_CONSTANT_ALPHA};function kt(L,ct,q,$,it,At,Yt,fe,xe,Qt){if(L===mi){g===!0&&(ot(s.BLEND),g=!1);return}if(g===!1&&(pt(s.BLEND),g=!0),L!==Mc){if(L!==_||Qt!==I){if((p!==Yi||v!==Yi)&&(s.blendEquation(s.FUNC_ADD),p=Yi,v=Yi),Qt)switch(L){case gi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qe:s.blendFunc(s.ONE,s.ONE);break;case Pa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case gi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qe:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Pa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}d=null,y=null,S=null,P=null,E.set(0,0,0),A=0,_=L,I=Qt}return}it=it||ct,At=At||q,Yt=Yt||$,(ct!==p||it!==v)&&(s.blendEquationSeparate(U[ct],U[it]),p=ct,v=it),(q!==d||$!==y||At!==S||Yt!==P)&&(s.blendFuncSeparate(Vt[q],Vt[$],Vt[At],Vt[Yt]),d=q,y=$,S=At,P=Yt),(fe.equals(E)===!1||xe!==A)&&(s.blendColor(fe.r,fe.g,fe.b,xe),E.copy(fe),A=xe),_=L,I=!1}function ae(L,ct){L.side===Ne?ot(s.CULL_FACE):pt(s.CULL_FACE);let q=L.side===Ie;ct&&(q=!q),St(q),L.blending===gi&&L.transparent===!1?kt(mi):kt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),n.setMask(L.colorWrite);const $=L.stencilWrite;a.setTest($),$&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Pt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?pt(s.SAMPLE_ALPHA_TO_COVERAGE):ot(s.SAMPLE_ALPHA_TO_COVERAGE)}function St(L){b!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),b=L)}function Xt(L){L!==vc?(pt(s.CULL_FACE),L!==x&&(L===Ra?s.cullFace(s.BACK):L===xc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ot(s.CULL_FACE),x=L}function Ot(L){L!==R&&(Y&&s.lineWidth(L),R=L)}function Pt(L,ct,q){L?(pt(s.POLYGON_OFFSET_FILL),(B!==ct||k!==q)&&(s.polygonOffset(ct,q),B=ct,k=q)):ot(s.POLYGON_OFFSET_FILL)}function pe(L){L?pt(s.SCISSOR_TEST):ot(s.SCISSOR_TEST)}function C(L){L===void 0&&(L=s.TEXTURE0+W-1),V!==L&&(s.activeTexture(L),V=L)}function M(L,ct,q){q===void 0&&(V===null?q=s.TEXTURE0+W-1:q=V);let $=st[q];$===void 0&&($={type:void 0,texture:void 0},st[q]=$),($.type!==L||$.texture!==ct)&&(V!==q&&(s.activeTexture(q),V=q),s.bindTexture(L,ct||J[L]),$.type=L,$.texture=ct)}function H(){const L=st[V];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function j(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function rt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function It(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function zt(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Et(L){Ct.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),Ct.copy(L))}function lt(L){qt.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),qt.copy(L))}function Nt(L,ct){let q=l.get(ct);q===void 0&&(q=new WeakMap,l.set(ct,q));let $=q.get(L);$===void 0&&($=s.getUniformBlockIndex(ct,L.name),q.set(L,$))}function Ht(L,ct){const $=l.get(ct).get(L);o.get(ct)!==$&&(s.uniformBlockBinding(ct,$,L.__bindingPointIndex),o.set(ct,$))}function de(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},V=null,st={},h={},u=new WeakMap,f=[],m=null,g=!1,_=null,p=null,d=null,y=null,v=null,S=null,P=null,E=new Mt(0,0,0),A=0,I=!1,b=null,x=null,R=null,B=null,k=null,Ct.set(0,0,s.canvas.width,s.canvas.height),qt.set(0,0,s.canvas.width,s.canvas.height),n.reset(),r.reset(),a.reset()}return{buffers:{color:n,depth:r,stencil:a},enable:pt,disable:ot,bindFramebuffer:Ft,drawBuffers:Ut,useProgram:Gt,setBlending:kt,setMaterial:ae,setFlipSided:St,setCullFace:Xt,setLineWidth:Ot,setPolygonOffset:Pt,setScissorTest:pe,activeTexture:C,bindTexture:M,unbindTexture:H,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:_t,texImage3D:zt,updateUBOMapping:Nt,uniformBlockBinding:Ht,texStorage2D:It,texStorage3D:tt,texSubImage2D:Q,texSubImage3D:xt,compressedTexSubImage2D:rt,compressedTexSubImage3D:at,scissor:Et,viewport:lt,reset:de}}function Dm(s,t,e,i,n,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return m?new OffscreenCanvas(C,M):js("canvas")}function _(C,M,H){let j=1;const Z=pe(C);if((Z.width>H||Z.height>H)&&(j=H/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Q=Math.floor(j*Z.width),xt=Math.floor(j*Z.height);u===void 0&&(u=g(Q,xt));const rt=M?g(Q,xt):u;return rt.width=Q,rt.height=xt,rt.getContext("2d").drawImage(C,0,0,Q,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+Q+"x"+xt+")."),rt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps&&C.minFilter!==Fe&&C.minFilter!==Ke}function d(C){s.generateMipmap(C)}function y(C,M,H,j,Z=!1){if(C!==null){if(s[C]!==void 0)return s[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Q=M;if(M===s.RED&&(H===s.FLOAT&&(Q=s.R32F),H===s.HALF_FLOAT&&(Q=s.R16F),H===s.UNSIGNED_BYTE&&(Q=s.R8)),M===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(Q=s.R8UI),H===s.UNSIGNED_SHORT&&(Q=s.R16UI),H===s.UNSIGNED_INT&&(Q=s.R32UI),H===s.BYTE&&(Q=s.R8I),H===s.SHORT&&(Q=s.R16I),H===s.INT&&(Q=s.R32I)),M===s.RG&&(H===s.FLOAT&&(Q=s.RG32F),H===s.HALF_FLOAT&&(Q=s.RG16F),H===s.UNSIGNED_BYTE&&(Q=s.RG8)),M===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(Q=s.RG8UI),H===s.UNSIGNED_SHORT&&(Q=s.RG16UI),H===s.UNSIGNED_INT&&(Q=s.RG32UI),H===s.BYTE&&(Q=s.RG8I),H===s.SHORT&&(Q=s.RG16I),H===s.INT&&(Q=s.RG32I)),M===s.RGB&&H===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),M===s.RGBA){const xt=Z?qs:Zt.getTransfer(j);H===s.FLOAT&&(Q=s.RGBA32F),H===s.HALF_FLOAT&&(Q=s.RGBA16F),H===s.UNSIGNED_BYTE&&(Q=xt===ie?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function v(C,M){let H;return C?M===null||M===Ln||M===Dn?H=s.DEPTH24_STENCIL8:M===fi?H=s.DEPTH32F_STENCIL8:M===Xs&&(H=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ln||M===Dn?H=s.DEPTH_COMPONENT24:M===fi?H=s.DEPTH_COMPONENT32F:M===Xs&&(H=s.DEPTH_COMPONENT16),H}function S(C,M){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Fe&&C.minFilter!==Ke?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function P(C){const M=C.target;M.removeEventListener("dispose",P),A(M),M.isVideoTexture&&h.delete(M)}function E(C){const M=C.target;M.removeEventListener("dispose",E),b(M)}function A(C){const M=i.get(C);if(M.__webglInit===void 0)return;const H=C.source,j=f.get(H);if(j){const Z=j[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(C),Object.keys(j).length===0&&f.delete(H)}i.remove(C)}function I(C){const M=i.get(C);s.deleteTexture(M.__webglTexture);const H=C.source,j=f.get(H);delete j[M.__cacheKey],a.memory.textures--}function b(C){const M=i.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Z=0;Z<M.__webglFramebuffer[j].length;Z++)s.deleteFramebuffer(M.__webglFramebuffer[j][Z]);else s.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)s.deleteFramebuffer(M.__webglFramebuffer[j]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=C.textures;for(let j=0,Z=H.length;j<Z;j++){const Q=i.get(H[j]);Q.__webglTexture&&(s.deleteTexture(Q.__webglTexture),a.memory.textures--),i.remove(H[j])}i.remove(C)}let x=0;function R(){x=0}function B(){const C=x;return C>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+n.maxTextures),x+=1,C}function k(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function W(C,M){const H=i.get(C);if(C.isVideoTexture&&Ot(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){const j=C.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{qt(H,C,M);return}}e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+M)}function Y(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){qt(H,C,M);return}e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+M)}function G(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){qt(H,C,M);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+M)}function K(C,M){const H=i.get(C);if(C.version>0&&H.__version!==C.version){X(H,C,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+M)}const V={[Ws]:s.REPEAT,[Ki]:s.CLAMP_TO_EDGE,[aa]:s.MIRRORED_REPEAT},st={[Fe]:s.NEAREST,[Jc]:s.NEAREST_MIPMAP_NEAREST,[as]:s.NEAREST_MIPMAP_LINEAR,[Ke]:s.LINEAR,[pr]:s.LINEAR_MIPMAP_NEAREST,[ji]:s.LINEAR_MIPMAP_LINEAR},ut={[dh]:s.NEVER,[vh]:s.ALWAYS,[fh]:s.LESS,[Ll]:s.LEQUAL,[ph]:s.EQUAL,[_h]:s.GEQUAL,[mh]:s.GREATER,[gh]:s.NOTEQUAL};function ft(C,M){if(M.type===fi&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Ke||M.magFilter===pr||M.magFilter===as||M.magFilter===ji||M.minFilter===Ke||M.minFilter===pr||M.minFilter===as||M.minFilter===ji)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,V[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,V[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,V[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,st[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,st[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,ut[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Fe||M.minFilter!==as&&M.minFilter!==ji||M.type===fi&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,n.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Ct(C,M){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",P));const j=M.source;let Z=f.get(j);Z===void 0&&(Z={},f.set(j,Z));const Q=k(M);if(Q!==C.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Z[Q].usedTimes++;const xt=Z[C.__cacheKey];xt!==void 0&&(Z[C.__cacheKey].usedTimes--,xt.usedTimes===0&&I(M)),C.__cacheKey=Q,C.__webglTexture=Z[Q].texture}return H}function qt(C,M,H){let j=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=s.TEXTURE_3D);const Z=Ct(C,M),Q=M.source;e.bindTexture(j,C.__webglTexture,s.TEXTURE0+H);const xt=i.get(Q);if(Q.version!==xt.__version||Z===!0){e.activeTexture(s.TEXTURE0+H);const rt=Zt.getPrimaries(Zt.workingColorSpace),at=M.colorSpace===Ri?null:Zt.getPrimaries(M.colorSpace),It=M.colorSpace===Ri||rt===at?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let tt=_(M.image,!1,n.maxTextureSize);tt=Pt(M,tt);const _t=r.convert(M.format,M.colorSpace),zt=r.convert(M.type);let Et=y(M.internalFormat,_t,zt,M.colorSpace,M.isVideoTexture);ft(j,M);let lt;const Nt=M.mipmaps,Ht=M.isVideoTexture!==!0,de=xt.__version===void 0||Z===!0,L=Q.dataReady,ct=S(M,tt);if(M.isDepthTexture)Et=v(M.format===Un,M.type),de&&(Ht?e.texStorage2D(s.TEXTURE_2D,1,Et,tt.width,tt.height):e.texImage2D(s.TEXTURE_2D,0,Et,tt.width,tt.height,0,_t,zt,null));else if(M.isDataTexture)if(Nt.length>0){Ht&&de&&e.texStorage2D(s.TEXTURE_2D,ct,Et,Nt[0].width,Nt[0].height);for(let q=0,$=Nt.length;q<$;q++)lt=Nt[q],Ht?L&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,lt.width,lt.height,_t,zt,lt.data):e.texImage2D(s.TEXTURE_2D,q,Et,lt.width,lt.height,0,_t,zt,lt.data);M.generateMipmaps=!1}else Ht?(de&&e.texStorage2D(s.TEXTURE_2D,ct,Et,tt.width,tt.height),L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,tt.width,tt.height,_t,zt,tt.data)):e.texImage2D(s.TEXTURE_2D,0,Et,tt.width,tt.height,0,_t,zt,tt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ht&&de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Et,Nt[0].width,Nt[0].height,tt.depth);for(let q=0,$=Nt.length;q<$;q++)if(lt=Nt[q],M.format!==ni)if(_t!==null)if(Ht){if(L)if(M.layerUpdates.size>0){for(const it of M.layerUpdates){const At=lt.width*lt.height;e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,it,lt.width,lt.height,1,_t,lt.data.slice(At*it,At*(it+1)),0,0)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,lt.width,lt.height,tt.depth,_t,lt.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,Et,lt.width,lt.height,tt.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?L&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,lt.width,lt.height,tt.depth,_t,zt,lt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,q,Et,lt.width,lt.height,tt.depth,0,_t,zt,lt.data)}else{Ht&&de&&e.texStorage2D(s.TEXTURE_2D,ct,Et,Nt[0].width,Nt[0].height);for(let q=0,$=Nt.length;q<$;q++)lt=Nt[q],M.format!==ni?_t!==null?Ht?L&&e.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,lt.width,lt.height,_t,lt.data):e.compressedTexImage2D(s.TEXTURE_2D,q,Et,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?L&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,lt.width,lt.height,_t,zt,lt.data):e.texImage2D(s.TEXTURE_2D,q,Et,lt.width,lt.height,0,_t,zt,lt.data)}else if(M.isDataArrayTexture)if(Ht){if(de&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ct,Et,tt.width,tt.height,tt.depth),L)if(M.layerUpdates.size>0){let q;switch(zt){case s.UNSIGNED_BYTE:switch(_t){case s.ALPHA:q=1;break;case s.LUMINANCE:q=1;break;case s.LUMINANCE_ALPHA:q=2;break;case s.RGB:q=3;break;case s.RGBA:q=4;break;default:throw new Error(`Unknown texel size for format ${_t}.`)}break;case s.UNSIGNED_SHORT_4_4_4_4:case s.UNSIGNED_SHORT_5_5_5_1:case s.UNSIGNED_SHORT_5_6_5:q=1;break;default:throw new Error(`Unknown texel size for type ${zt}.`)}const $=tt.width*tt.height*q;for(const it of M.layerUpdates)e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,it,tt.width,tt.height,1,_t,zt,tt.data.slice($*it,$*(it+1)));M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,tt.width,tt.height,tt.depth,_t,zt,tt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,tt.width,tt.height,tt.depth,0,_t,zt,tt.data);else if(M.isData3DTexture)Ht?(de&&e.texStorage3D(s.TEXTURE_3D,ct,Et,tt.width,tt.height,tt.depth),L&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,tt.width,tt.height,tt.depth,_t,zt,tt.data)):e.texImage3D(s.TEXTURE_3D,0,Et,tt.width,tt.height,tt.depth,0,_t,zt,tt.data);else if(M.isFramebufferTexture){if(de)if(Ht)e.texStorage2D(s.TEXTURE_2D,ct,Et,tt.width,tt.height);else{let q=tt.width,$=tt.height;for(let it=0;it<ct;it++)e.texImage2D(s.TEXTURE_2D,it,Et,q,$,0,_t,zt,null),q>>=1,$>>=1}}else if(Nt.length>0){if(Ht&&de){const q=pe(Nt[0]);e.texStorage2D(s.TEXTURE_2D,ct,Et,q.width,q.height)}for(let q=0,$=Nt.length;q<$;q++)lt=Nt[q],Ht?L&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,_t,zt,lt):e.texImage2D(s.TEXTURE_2D,q,Et,_t,zt,lt);M.generateMipmaps=!1}else if(Ht){if(de){const q=pe(tt);e.texStorage2D(s.TEXTURE_2D,ct,Et,q.width,q.height)}L&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t,zt,tt)}else e.texImage2D(s.TEXTURE_2D,0,Et,_t,zt,tt);p(M)&&d(j),xt.__version=Q.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function X(C,M,H){if(M.image.length!==6)return;const j=Ct(C,M),Z=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+H);const Q=i.get(Z);if(Z.version!==Q.__version||j===!0){e.activeTexture(s.TEXTURE0+H);const xt=Zt.getPrimaries(Zt.workingColorSpace),rt=M.colorSpace===Ri?null:Zt.getPrimaries(M.colorSpace),at=M.colorSpace===Ri||xt===rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);const It=M.isCompressedTexture||M.image[0].isCompressedTexture,tt=M.image[0]&&M.image[0].isDataTexture,_t=[];for(let $=0;$<6;$++)!It&&!tt?_t[$]=_(M.image[$],!0,n.maxCubemapSize):_t[$]=tt?M.image[$].image:M.image[$],_t[$]=Pt(M,_t[$]);const zt=_t[0],Et=r.convert(M.format,M.colorSpace),lt=r.convert(M.type),Nt=y(M.internalFormat,Et,lt,M.colorSpace),Ht=M.isVideoTexture!==!0,de=Q.__version===void 0||j===!0,L=Z.dataReady;let ct=S(M,zt);ft(s.TEXTURE_CUBE_MAP,M);let q;if(It){Ht&&de&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Nt,zt.width,zt.height);for(let $=0;$<6;$++){q=_t[$].mipmaps;for(let it=0;it<q.length;it++){const At=q[it];M.format!==ni?Et!==null?Ht?L&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,0,0,At.width,At.height,Et,At.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,Nt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,0,0,At.width,At.height,Et,lt,At.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it,Nt,At.width,At.height,0,Et,lt,At.data)}}}else{if(q=M.mipmaps,Ht&&de){q.length>0&&ct++;const $=pe(_t[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ct,Nt,$.width,$.height)}for(let $=0;$<6;$++)if(tt){Ht?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,_t[$].width,_t[$].height,Et,lt,_t[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Nt,_t[$].width,_t[$].height,0,Et,lt,_t[$].data);for(let it=0;it<q.length;it++){const Yt=q[it].image[$].image;Ht?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,0,0,Yt.width,Yt.height,Et,lt,Yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,Nt,Yt.width,Yt.height,0,Et,lt,Yt.data)}}else{Ht?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Et,lt,_t[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Nt,Et,lt,_t[$]);for(let it=0;it<q.length;it++){const At=q[it];Ht?L&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,0,0,Et,lt,At.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,it+1,Nt,Et,lt,At.image[$])}}}p(M)&&d(s.TEXTURE_CUBE_MAP),Q.__version=Z.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function J(C,M,H,j,Z,Q){const xt=r.convert(H.format,H.colorSpace),rt=r.convert(H.type),at=y(H.internalFormat,xt,rt,H.colorSpace);if(!i.get(M).__hasExternalTextures){const tt=Math.max(1,M.width>>Q),_t=Math.max(1,M.height>>Q);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?e.texImage3D(Z,Q,at,tt,_t,M.depth,0,xt,rt,null):e.texImage2D(Z,Q,at,tt,_t,0,xt,rt,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),Xt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Z,i.get(H).__webglTexture,0,St(M)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,Z,i.get(H).__webglTexture,Q),e.bindFramebuffer(s.FRAMEBUFFER,null)}function pt(C,M,H){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){const j=M.depthTexture,Z=j&&j.isDepthTexture?j.type:null,Q=v(M.stencilBuffer,Z),xt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=St(M);Xt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt,Q,M.width,M.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,Q,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Q,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,xt,s.RENDERBUFFER,C)}else{const j=M.textures;for(let Z=0;Z<j.length;Z++){const Q=j[Z],xt=r.convert(Q.format,Q.colorSpace),rt=r.convert(Q.type),at=y(Q.internalFormat,xt,rt,Q.colorSpace),It=St(M);H&&Xt(M)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,It,at,M.width,M.height):Xt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,It,at,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,at,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);const j=i.get(M.depthTexture).__webglTexture,Z=St(M);if(M.depthTexture.format===En)Xt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(M.depthTexture.format===Un)Xt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Ft(C){const M=i.get(C),H=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ot(M.__webglFramebuffer,C)}else if(H){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]=s.createRenderbuffer(),pt(M.__webglDepthbuffer[j],C,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=s.createRenderbuffer(),pt(M.__webglDepthbuffer,C,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(C,M,H){const j=i.get(C);M!==void 0&&J(j.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&Ft(C)}function Gt(C){const M=C.texture,H=i.get(C),j=i.get(M);C.addEventListener("dispose",E);const Z=C.textures,Q=C.isWebGLCubeRenderTarget===!0,xt=Z.length>1;if(xt||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=M.version,a.memory.textures++),Q){H.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[rt]=[];for(let at=0;at<M.mipmaps.length;at++)H.__webglFramebuffer[rt][at]=s.createFramebuffer()}else H.__webglFramebuffer[rt]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let rt=0;rt<M.mipmaps.length;rt++)H.__webglFramebuffer[rt]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(xt)for(let rt=0,at=Z.length;rt<at;rt++){const It=i.get(Z[rt]);It.__webglTexture===void 0&&(It.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&Xt(C)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let rt=0;rt<Z.length;rt++){const at=Z[rt];H.__webglColorRenderbuffer[rt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[rt]);const It=r.convert(at.format,at.colorSpace),tt=r.convert(at.type),_t=y(at.internalFormat,It,tt,at.colorSpace,C.isXRRenderTarget===!0),zt=St(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,zt,_t,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+rt,s.RENDERBUFFER,H.__webglColorRenderbuffer[rt])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),pt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Q){e.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),ft(s.TEXTURE_CUBE_MAP,M);for(let rt=0;rt<6;rt++)if(M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)J(H.__webglFramebuffer[rt][at],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,at);else J(H.__webglFramebuffer[rt],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);p(M)&&d(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let rt=0,at=Z.length;rt<at;rt++){const It=Z[rt],tt=i.get(It);e.bindTexture(s.TEXTURE_2D,tt.__webglTexture),ft(s.TEXTURE_2D,It),J(H.__webglFramebuffer,C,It,s.COLOR_ATTACHMENT0+rt,s.TEXTURE_2D,0),p(It)&&d(s.TEXTURE_2D)}e.unbindTexture()}else{let rt=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(rt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(rt,j.__webglTexture),ft(rt,M),M.mipmaps&&M.mipmaps.length>0)for(let at=0;at<M.mipmaps.length;at++)J(H.__webglFramebuffer[at],C,M,s.COLOR_ATTACHMENT0,rt,at);else J(H.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,rt,0);p(M)&&d(rt),e.unbindTexture()}C.depthBuffer&&Ft(C)}function U(C){const M=C.textures;for(let H=0,j=M.length;H<j;H++){const Z=M[H];if(p(Z)){const Q=C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,xt=i.get(Z).__webglTexture;e.bindTexture(Q,xt),d(Q),e.unbindTexture()}}}const Vt=[],kt=[];function ae(C){if(C.samples>0){if(Xt(C)===!1){const M=C.textures,H=C.width,j=C.height;let Z=s.COLOR_BUFFER_BIT;const Q=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=i.get(C),rt=M.length>1;if(rt)for(let at=0;at<M.length;at++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let at=0;at<M.length;at++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),rt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[at]);const It=i.get(M[at]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,It,0)}s.blitFramebuffer(0,0,H,j,0,0,H,j,Z,s.NEAREST),l===!0&&(Vt.length=0,kt.length=0,Vt.push(s.COLOR_ATTACHMENT0+at),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Vt.push(Q),kt.push(Q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,kt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Vt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),rt)for(let at=0;at<M.length;at++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,xt.__webglColorRenderbuffer[at]);const It=i.get(M[at]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,It,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function St(C){return Math.min(n.maxSamples,C.samples)}function Xt(C){const M=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ot(C){const M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Pt(C,M){const H=C.colorSpace,j=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Ii&&H!==Ri&&(Zt.getTransfer(H)===ie?(j!==ni||Z!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function pe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=R,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=G,this.setTextureCube=K,this.rebindTextures=Ut,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Xt}function Um(s,t){function e(i,n=Ri){let r;const a=Zt.getTransfer(n);if(i===Ui)return s.UNSIGNED_BYTE;if(i===bl)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Tl)return s.UNSIGNED_SHORT_5_5_5_1;if(i===ih)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===th)return s.BYTE;if(i===eh)return s.SHORT;if(i===Xs)return s.UNSIGNED_SHORT;if(i===wl)return s.INT;if(i===Ln)return s.UNSIGNED_INT;if(i===fi)return s.FLOAT;if(i===Li)return s.HALF_FLOAT;if(i===nh)return s.ALPHA;if(i===sh)return s.RGB;if(i===ni)return s.RGBA;if(i===rh)return s.LUMINANCE;if(i===ah)return s.LUMINANCE_ALPHA;if(i===En)return s.DEPTH_COMPONENT;if(i===Un)return s.DEPTH_STENCIL;if(i===El)return s.RED;if(i===Al)return s.RED_INTEGER;if(i===oh)return s.RG;if(i===Cl)return s.RG_INTEGER;if(i===Rl)return s.RGBA_INTEGER;if(i===mr||i===gr||i===_r||i===vr)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_r)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Da||i===Ua||i===Ia||i===Na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Da)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ua)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Fa||i===Oa||i===za)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Fa||i===Oa)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ba||i===ka||i===Ha||i===Va||i===Ga||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Ka||i===ja||i===Za||i===Qa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ba)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Va)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ga)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ya)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$a)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ka)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ja)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Za)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qa)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xr||i===Ja||i===to)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===xr)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===to)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===lh||i===eo||i===io||i===no)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===xr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===no)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Dn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}class Im extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Oe extends re{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nm={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,i),d=this._getHandJoint(c,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nm)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Oe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Fm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Om=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class zm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const n=new Ce,r=t.properties.get(n);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new se({vertexShader:Fm,fragmentShader:Om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new bt(new ri(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}}class Bm extends Fn{constructor(t,e){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,g=null;const _=new zm,p=e.getContextAttributes();let d=null,y=null;const v=[],S=[],P=new mt;let E=null;const A=new Ue;A.layers.enable(1),A.viewport=new ne;const I=new Ue;I.layers.enable(2),I.viewport=new ne;const b=[A,I],x=new Im;x.layers.enable(1),x.layers.enable(2);let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=v[X];return J===void 0&&(J=new Wr,v[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=v[X];return J===void 0&&(J=new Wr,v[X]=J),J.getGripSpace()},this.getHand=function(X){let J=v[X];return J===void 0&&(J=new Wr,v[X]=J),J.getHandSpace()};function k(X){const J=S.indexOf(X.inputSource);if(J===-1)return;const pt=v[J];pt!==void 0&&(pt.update(X.inputSource,X.frame,c||a),pt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",W),n.removeEventListener("inputsourceschange",Y);for(let X=0;X<v.length;X++){const J=S[X];J!==null&&(S[X]=null,v[X].disconnect(J))}R=null,B=null,_.reset(),t.setRenderTarget(d),m=null,f=null,u=null,n=null,y=null,qt.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(d=t.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",W),n.addEventListener("inputsourceschange",Y),p.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(P),n.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(n,e,J),n.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Je(m.framebufferWidth,m.framebufferHeight,{format:ni,type:Ui,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,pt=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,J=p.stencil?Un:En,pt=p.stencil?Dn:Ln);const Ft={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(n,e),f=u.createProjectionLayer(Ft),n.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Je(f.textureWidth,f.textureHeight,{format:ni,type:Ui,depthTexture:new Vl(f.textureWidth,f.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),qt.setContext(n),qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function Y(X){for(let J=0;J<X.removed.length;J++){const pt=X.removed[J],ot=S.indexOf(pt);ot>=0&&(S[ot]=null,v[ot].disconnect(pt))}for(let J=0;J<X.added.length;J++){const pt=X.added[J];let ot=S.indexOf(pt);if(ot===-1){for(let Ut=0;Ut<v.length;Ut++)if(Ut>=S.length){S.push(pt),ot=Ut;break}else if(S[Ut]===null){S[Ut]=pt,ot=Ut;break}if(ot===-1)break}const Ft=v[ot];Ft&&Ft.connect(pt)}}const G=new T,K=new T;function V(X,J,pt){G.setFromMatrixPosition(J.matrixWorld),K.setFromMatrixPosition(pt.matrixWorld);const ot=G.distanceTo(K),Ft=J.projectionMatrix.elements,Ut=pt.projectionMatrix.elements,Gt=Ft[14]/(Ft[10]-1),U=Ft[14]/(Ft[10]+1),Vt=(Ft[9]+1)/Ft[5],kt=(Ft[9]-1)/Ft[5],ae=(Ft[8]-1)/Ft[0],St=(Ut[8]+1)/Ut[0],Xt=Gt*ae,Ot=Gt*St,Pt=ot/(-ae+St),pe=Pt*-ae;J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(pe),X.translateZ(Pt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const C=Gt+Pt,M=U+Pt,H=Xt-pe,j=Ot+(ot-pe),Z=Vt*U/M*C,Q=kt*U/M*C;X.projectionMatrix.makePerspective(H,j,Z,Q,C,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function st(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;_.texture!==null&&(X.near=_.depthNear,X.far=_.depthFar),x.near=I.near=A.near=X.near,x.far=I.far=A.far=X.far,(R!==x.near||B!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),R=x.near,B=x.far,A.near=R,A.far=B,I.near=R,I.far=B,A.updateProjectionMatrix(),I.updateProjectionMatrix(),X.updateProjectionMatrix());const J=X.parent,pt=x.cameras;st(x,J);for(let ot=0;ot<pt.length;ot++)st(pt[ot],J);pt.length===2?V(x,A,I):x.projectionMatrix.copy(A.projectionMatrix),ut(X,x,J)};function ut(X,J,pt){pt===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(pt.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=es*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ft=null;function Ct(X,J){if(h=J.getViewerPose(c||a),g=J,h!==null){const pt=h.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let ot=!1;pt.length!==x.cameras.length&&(x.cameras.length=0,ot=!0);for(let Ut=0;Ut<pt.length;Ut++){const Gt=pt[Ut];let U=null;if(m!==null)U=m.getViewport(Gt);else{const kt=u.getViewSubImage(f,Gt);U=kt.viewport,Ut===0&&(t.setRenderTargetTextures(y,kt.colorTexture,f.ignoreDepthValues?void 0:kt.depthStencilTexture),t.setRenderTarget(y))}let Vt=b[Ut];Vt===void 0&&(Vt=new Ue,Vt.layers.enable(Ut),Vt.viewport=new ne,b[Ut]=Vt),Vt.matrix.fromArray(Gt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Gt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(U.x,U.y,U.width,U.height),Ut===0&&(x.matrix.copy(Vt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ot===!0&&x.cameras.push(Vt)}const Ft=n.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const Ut=u.getDepthInformation(pt[0]);Ut&&Ut.isValid&&Ut.texture&&_.init(t,Ut,n.renderState)}}for(let pt=0;pt<v.length;pt++){const ot=S[pt],Ft=v[pt];ot!==null&&Ft!==void 0&&Ft.update(ot,J,c||a)}ft&&ft(X,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const qt=new Hl;qt.setAnimationLoop(Ct),this.setAnimationLoop=function(X){ft=X},this.dispose=function(){}}}const Gi=new Te,km=new Wt;function Hm(s,t){function e(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,zl(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function n(p,d,y,v,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,S)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,y,v):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,e(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Ie&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,e(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Ie&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,e(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,e(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const y=t.get(d),v=y.envMap,S=y.envMapRotation;v&&(p.envMap.value=v,Gi.copy(S),Gi.x*=-1,Gi.y*=-1,Gi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Gi.y*=-1,Gi.z*=-1),p.envMapRotation.value.setFromMatrix4(km.makeRotationFromEuler(Gi)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,y,v){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*y,p.scale.value=v*.5,d.map&&(p.map.value=d.map,e(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,e(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,e(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,y){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ie&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const y=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Vm(s,t,e,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const S=v.program;i.uniformBlockBinding(y,S)}function c(y,v){let S=n[y.id];S===void 0&&(g(y),S=h(y),n[y.id]=S,y.addEventListener("dispose",p));const P=v.program;i.updateUBOMapping(y,P);const E=t.render.frame;r[y.id]!==E&&(f(y),r[y.id]=E)}function h(y){const v=u();y.__bindingPointIndex=v;const S=s.createBuffer(),P=y.__size,E=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,P,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,S),S}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=n[y.id],S=y.uniforms,P=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let E=0,A=S.length;E<A;E++){const I=Array.isArray(S[E])?S[E]:[S[E]];for(let b=0,x=I.length;b<x;b++){const R=I[b];if(m(R,E,b,P)===!0){const B=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let Y=0;Y<k.length;Y++){const G=k[Y],K=_(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,B+W,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,R.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(y,v,S,P){const E=y.value,A=v+"_"+S;if(P[A]===void 0)return typeof E=="number"||typeof E=="boolean"?P[A]=E:P[A]=E.clone(),!0;{const I=P[A];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return P[A]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function g(y){const v=y.uniforms;let S=0;const P=16;for(let A=0,I=v.length;A<I;A++){const b=Array.isArray(v[A])?v[A]:[v[A]];for(let x=0,R=b.length;x<R;x++){const B=b[x],k=Array.isArray(B.value)?B.value:[B.value];for(let W=0,Y=k.length;W<Y;W++){const G=k[W],K=_(G),V=S%P;V!==0&&P-V<K.boundary&&(S+=P-V),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=K.storage}}}const E=S%P;return E>0&&(S+=P-E),y.__size=S,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function d(){for(const y in n)s.deleteBuffer(n[y]);a=[],n={},r={}}return{bind:l,update:c,dispose:d}}class Gm{constructor(t={}){const{canvas:e=Nh(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const d=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=Pi,this.toneMappingExposure=1;const v=this;let S=!1,P=0,E=0,A=null,I=-1,b=null;const x=new ne,R=new ne;let B=null;const k=new Mt(0);let W=0,Y=e.width,G=e.height,K=1,V=null,st=null;const ut=new ne(0,0,Y,G),ft=new ne(0,0,Y,G);let Ct=!1;const qt=new ma;let X=!1,J=!1;const pt=new Wt,ot=new T,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ut=!1;function Gt(){return A===null?K:1}let U=i;function Vt(w,N){return e.getContext(w,N)}try{const w={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rr}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",q,!1),e.addEventListener("webglcontextcreationerror",$,!1),U===null){const N="webgl2";if(U=Vt(N,w),U===null)throw Vt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let kt,ae,St,Xt,Ot,Pt,pe,C,M,H,j,Z,Q,xt,rt,at,It,tt,_t,zt,Et,lt,Nt,Ht;function de(){kt=new Zf(U),kt.init(),lt=new Um(U,kt),ae=new Xf(U,kt,t,lt),St=new Lm(U),Xt=new tp(U),Ot=new _m,Pt=new Dm(U,kt,St,Ot,ae,lt,Xt),pe=new Yf(v),C=new jf(v),M=new au(U),Nt=new Gf(U,M),H=new Qf(U,M,Xt,Nt),j=new ip(U,H,M,Xt),_t=new ep(U,ae,Pt),at=new qf(Ot),Z=new gm(v,pe,C,kt,ae,Nt,at),Q=new Hm(v,Ot),xt=new xm,rt=new Tm(kt),tt=new Vf(v,pe,C,St,j,f,l),It=new Pm(v,j,ae),Ht=new Vm(U,Xt,ae,St),zt=new Wf(U,kt,Xt),Et=new Jf(U,kt,Xt),Xt.programs=Z.programs,v.capabilities=ae,v.extensions=kt,v.properties=Ot,v.renderLists=xt,v.shadowMap=It,v.state=St,v.info=Xt}de();const L=new Bm(v,U);this.xr=L,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const w=kt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=kt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(w){w!==void 0&&(K=w,this.setSize(Y,G,!1))},this.getSize=function(w){return w.set(Y,G)},this.setSize=function(w,N,O=!0){if(L.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=w,G=N,e.width=Math.floor(w*K),e.height=Math.floor(N*K),O===!0&&(e.style.width=w+"px",e.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(Y*K,G*K).floor()},this.setDrawingBufferSize=function(w,N,O){Y=w,G=N,K=O,e.width=Math.floor(w*O),e.height=Math.floor(N*O),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(x)},this.getViewport=function(w){return w.copy(ut)},this.setViewport=function(w,N,O,z){w.isVector4?ut.set(w.x,w.y,w.z,w.w):ut.set(w,N,O,z),St.viewport(x.copy(ut).multiplyScalar(K).round())},this.getScissor=function(w){return w.copy(ft)},this.setScissor=function(w,N,O,z){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,N,O,z),St.scissor(R.copy(ft).multiplyScalar(K).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(w){St.setScissorTest(Ct=w)},this.setOpaqueSort=function(w){V=w},this.setTransparentSort=function(w){st=w},this.getClearColor=function(w){return w.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(w=!0,N=!0,O=!0){let z=0;if(w){let F=!1;if(A!==null){const et=A.texture.format;F=et===Rl||et===Cl||et===Al}if(F){const et=A.texture.type,ht=et===Ui||et===Ln||et===Xs||et===Dn||et===bl||et===Tl,dt=tt.getClearColor(),gt=tt.getClearAlpha(),wt=dt.r,Tt=dt.g,yt=dt.b;ht?(m[0]=wt,m[1]=Tt,m[2]=yt,m[3]=gt,U.clearBufferuiv(U.COLOR,0,m)):(g[0]=wt,g[1]=Tt,g[2]=yt,g[3]=gt,U.clearBufferiv(U.COLOR,0,g))}else z|=U.COLOR_BUFFER_BIT}N&&(z|=U.DEPTH_BUFFER_BIT),O&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",q,!1),e.removeEventListener("webglcontextcreationerror",$,!1),xt.dispose(),rt.dispose(),Ot.dispose(),pe.dispose(),C.dispose(),j.dispose(),Nt.dispose(),Ht.dispose(),Z.dispose(),L.dispose(),L.removeEventListener("sessionstart",ti),L.removeEventListener("sessionend",ei),Fi.stop()};function ct(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=Xt.autoReset,N=It.enabled,O=It.autoUpdate,z=It.needsUpdate,F=It.type;de(),Xt.autoReset=w,It.enabled=N,It.autoUpdate=O,It.needsUpdate=z,It.type=F}function $(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function it(w){const N=w.target;N.removeEventListener("dispose",it),At(N)}function At(w){Yt(w),Ot.remove(w)}function Yt(w){const N=Ot.get(w).programs;N!==void 0&&(N.forEach(function(O){Z.releaseProgram(O)}),w.isShaderMaterial&&Z.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,O,z,F,et){N===null&&(N=Ft);const ht=F.isMesh&&F.matrixWorld.determinant()<0,dt=dc(w,N,O,z,F);St.setMaterial(z,ht);let gt=O.index,wt=1;if(z.wireframe===!0){if(gt=H.getWireframeAttribute(O),gt===void 0)return;wt=2}const Tt=O.drawRange,yt=O.attributes.position;let $t=Tt.start*wt,oe=(Tt.start+Tt.count)*wt;et!==null&&($t=Math.max($t,et.start*wt),oe=Math.min(oe,(et.start+et.count)*wt)),gt!==null?($t=Math.max($t,0),oe=Math.min(oe,gt.count)):yt!=null&&($t=Math.max($t,0),oe=Math.min(oe,yt.count));const le=oe-$t;if(le<0||le===1/0)return;Nt.setup(F,z,dt,O,gt);let ze,Kt=zt;if(gt!==null&&(ze=M.get(gt),Kt=Et,Kt.setIndex(ze)),F.isMesh)z.wireframe===!0?(St.setLineWidth(z.wireframeLinewidth*Gt()),Kt.setMode(U.LINES)):Kt.setMode(U.TRIANGLES);else if(F.isLine){let vt=z.linewidth;vt===void 0&&(vt=1),St.setLineWidth(vt*Gt()),F.isLineSegments?Kt.setMode(U.LINES):F.isLineLoop?Kt.setMode(U.LINE_LOOP):Kt.setMode(U.LINE_STRIP)}else F.isPoints?Kt.setMode(U.POINTS):F.isSprite&&Kt.setMode(U.TRIANGLES);if(F.isBatchedMesh)F._multiDrawInstances!==null?Kt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances):Kt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)Kt.renderInstances($t,le,F.count);else if(O.isInstancedBufferGeometry){const vt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Re=Math.min(O.instanceCount,vt);Kt.renderInstances($t,le,Re)}else Kt.render($t,le)};function fe(w,N,O){w.transparent===!0&&w.side===Ne&&w.forceSinglePass===!1?(w.side=Ie,w.needsUpdate=!0,ns(w,N,O),w.side=Di,w.needsUpdate=!0,ns(w,N,O),w.side=Ne):ns(w,N,O)}this.compile=function(w,N,O=null){O===null&&(O=w),p=rt.get(O),p.init(N),y.push(p),O.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==O&&w.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const z=new Set;return w.traverse(function(F){const et=F.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const dt=et[ht];fe(dt,O,F),z.add(dt)}else fe(et,O,F),z.add(et)}),y.pop(),p=null,z},this.compileAsync=function(w,N,O=null){const z=this.compile(w,N,O);return new Promise(F=>{function et(){if(z.forEach(function(ht){Ot.get(ht).currentProgram.isReady()&&z.delete(ht)}),z.size===0){F(w);return}setTimeout(et,10)}kt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let xe=null;function Qt(w){xe&&xe(w)}function ti(){Fi.stop()}function ei(){Fi.start()}const Fi=new Hl;Fi.setAnimationLoop(Qt),typeof self<"u"&&Fi.setContext(self),this.setAnimationLoop=function(w){xe=w,L.setAnimationLoop(w),w===null?Fi.stop():Fi.start()},L.addEventListener("sessionstart",ti),L.addEventListener("sessionend",ei),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),L.enabled===!0&&L.isPresenting===!0&&(L.cameraAutoUpdate===!0&&L.updateCamera(N),N=L.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,N,A),p=rt.get(w,y.length),p.init(N),y.push(p),pt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),qt.setFromProjectionMatrix(pt),J=this.localClippingEnabled,X=at.init(this.clippingPlanes,J),_=xt.get(w,d.length),_.init(),d.push(_),L.enabled===!0&&L.isPresenting===!0){const et=v.xr.getDepthSensingMesh();et!==null&&hr(et,N,-1/0,v.sortObjects)}hr(w,N,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(V,st),Ut=L.enabled===!1||L.isPresenting===!1||L.hasDepthSensing()===!1,Ut&&tt.addToRenderList(_,w),this.info.render.frame++,X===!0&&at.beginShadows();const O=p.state.shadowsArray;It.render(O,w,N),X===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=_.opaque,F=_.transmissive;if(p.setupLights(),N.isArrayCamera){const et=N.cameras;if(F.length>0)for(let ht=0,dt=et.length;ht<dt;ht++){const gt=et[ht];ba(z,F,w,gt)}Ut&&tt.render(w);for(let ht=0,dt=et.length;ht<dt;ht++){const gt=et[ht];wa(_,w,gt,gt.viewport)}}else F.length>0&&ba(z,F,w,N),Ut&&tt.render(w),wa(_,w,N);A!==null&&(Pt.updateMultisampleRenderTarget(A),Pt.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(v,w,N),Nt.resetDefaultState(),I=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],X===!0&&at.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function hr(w,N,O,z){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)O=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||qt.intersectsSprite(w)){z&&ot.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pt);const ht=j.update(w),dt=w.material;dt.visible&&_.push(w,ht,dt,O,ot.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||qt.intersectsObject(w))){const ht=j.update(w),dt=w.material;if(z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ot.copy(w.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),ot.copy(ht.boundingSphere.center)),ot.applyMatrix4(w.matrixWorld).applyMatrix4(pt)),Array.isArray(dt)){const gt=ht.groups;for(let wt=0,Tt=gt.length;wt<Tt;wt++){const yt=gt[wt],$t=dt[yt.materialIndex];$t&&$t.visible&&_.push(w,ht,$t,O,ot.z,yt)}}else dt.visible&&_.push(w,ht,dt,O,ot.z,null)}}const et=w.children;for(let ht=0,dt=et.length;ht<dt;ht++)hr(et[ht],N,O,z)}function wa(w,N,O,z){const F=w.opaque,et=w.transmissive,ht=w.transparent;p.setupLightsView(O),X===!0&&at.setGlobalState(v.clippingPlanes,O),z&&St.viewport(x.copy(z)),F.length>0&&is(F,N,O),et.length>0&&is(et,N,O),ht.length>0&&is(ht,N,O),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function ba(w,N,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[z.id]===void 0&&(p.state.transmissionRenderTarget[z.id]=new Je(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Li:Ui,minFilter:ji,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const et=p.state.transmissionRenderTarget[z.id],ht=z.viewport||x;et.setSize(ht.z,ht.w);const dt=v.getRenderTarget();v.setRenderTarget(et),v.getClearColor(k),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),Ut?tt.render(O):v.clear();const gt=v.toneMapping;v.toneMapping=Pi;const wt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),p.setupLightsView(z),X===!0&&at.setGlobalState(v.clippingPlanes,z),is(w,O,z),Pt.updateMultisampleRenderTarget(et),Pt.updateRenderTargetMipmap(et),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let yt=0,$t=N.length;yt<$t;yt++){const oe=N[yt],le=oe.object,ze=oe.geometry,Kt=oe.material,vt=oe.group;if(Kt.side===Ne&&le.layers.test(z.layers)){const Re=Kt.side;Kt.side=Ie,Kt.needsUpdate=!0,Ta(le,O,z,ze,Kt,vt),Kt.side=Re,Kt.needsUpdate=!0,Tt=!0}}Tt===!0&&(Pt.updateMultisampleRenderTarget(et),Pt.updateRenderTargetMipmap(et))}v.setRenderTarget(dt),v.setClearColor(k,W),wt!==void 0&&(z.viewport=wt),v.toneMapping=gt}function is(w,N,O){const z=N.isScene===!0?N.overrideMaterial:null;for(let F=0,et=w.length;F<et;F++){const ht=w[F],dt=ht.object,gt=ht.geometry,wt=z===null?ht.material:z,Tt=ht.group;dt.layers.test(O.layers)&&Ta(dt,N,O,gt,wt,Tt)}}function Ta(w,N,O,z,F,et){w.onBeforeRender(v,N,O,z,F,et),w.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(v,N,O,z,w,et),F.transparent===!0&&F.side===Ne&&F.forceSinglePass===!1?(F.side=Ie,F.needsUpdate=!0,v.renderBufferDirect(O,N,z,F,w,et),F.side=Di,F.needsUpdate=!0,v.renderBufferDirect(O,N,z,F,w,et),F.side=Ne):v.renderBufferDirect(O,N,z,F,w,et),w.onAfterRender(v,N,O,z,F,et)}function ns(w,N,O){N.isScene!==!0&&(N=Ft);const z=Ot.get(w),F=p.state.lights,et=p.state.shadowsArray,ht=F.state.version,dt=Z.getParameters(w,F.state,et,N,O),gt=Z.getProgramCacheKey(dt);let wt=z.programs;z.environment=w.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(w.isMeshStandardMaterial?C:pe).get(w.envMap||z.environment),z.envMapRotation=z.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,wt===void 0&&(w.addEventListener("dispose",it),wt=new Map,z.programs=wt);let Tt=wt.get(gt);if(Tt!==void 0){if(z.currentProgram===Tt&&z.lightsStateVersion===ht)return Aa(w,dt),Tt}else dt.uniforms=Z.getUniforms(w),w.onBuild(O,dt,v),w.onBeforeCompile(dt,v),Tt=Z.acquireProgram(dt,gt),wt.set(gt,Tt),z.uniforms=dt.uniforms;const yt=z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(yt.clippingPlanes=at.uniform),Aa(w,dt),z.needsLights=pc(w),z.lightsStateVersion=ht,z.needsLights&&(yt.ambientLightColor.value=F.state.ambient,yt.lightProbe.value=F.state.probe,yt.directionalLights.value=F.state.directional,yt.directionalLightShadows.value=F.state.directionalShadow,yt.spotLights.value=F.state.spot,yt.spotLightShadows.value=F.state.spotShadow,yt.rectAreaLights.value=F.state.rectArea,yt.ltc_1.value=F.state.rectAreaLTC1,yt.ltc_2.value=F.state.rectAreaLTC2,yt.pointLights.value=F.state.point,yt.pointLightShadows.value=F.state.pointShadow,yt.hemisphereLights.value=F.state.hemi,yt.directionalShadowMap.value=F.state.directionalShadowMap,yt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,yt.spotShadowMap.value=F.state.spotShadowMap,yt.spotLightMatrix.value=F.state.spotLightMatrix,yt.spotLightMap.value=F.state.spotLightMap,yt.pointShadowMap.value=F.state.pointShadowMap,yt.pointShadowMatrix.value=F.state.pointShadowMatrix),z.currentProgram=Tt,z.uniformsList=null,Tt}function Ea(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=ks.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Aa(w,N){const O=Ot.get(w);O.outputColorSpace=N.outputColorSpace,O.batching=N.batching,O.batchingColor=N.batchingColor,O.instancing=N.instancing,O.instancingColor=N.instancingColor,O.instancingMorph=N.instancingMorph,O.skinning=N.skinning,O.morphTargets=N.morphTargets,O.morphNormals=N.morphNormals,O.morphColors=N.morphColors,O.morphTargetsCount=N.morphTargetsCount,O.numClippingPlanes=N.numClippingPlanes,O.numIntersection=N.numClipIntersection,O.vertexAlphas=N.vertexAlphas,O.vertexTangents=N.vertexTangents,O.toneMapping=N.toneMapping}function dc(w,N,O,z,F){N.isScene!==!0&&(N=Ft),Pt.resetTextureUnits();const et=N.fog,ht=z.isMeshStandardMaterial?N.environment:null,dt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ii,gt=(z.isMeshStandardMaterial?C:pe).get(z.envMap||ht),wt=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Tt=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),yt=!!O.morphAttributes.position,$t=!!O.morphAttributes.normal,oe=!!O.morphAttributes.color;let le=Pi;z.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(le=v.toneMapping);const ze=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Kt=ze!==void 0?ze.length:0,vt=Ot.get(z),Re=p.state.lights;if(X===!0&&(J===!0||w!==b)){const Ve=w===b&&z.id===I;at.setState(z,w,Ve)}let Jt=!1;z.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==Re.state.version||vt.outputColorSpace!==dt||F.isBatchedMesh&&vt.batching===!1||!F.isBatchedMesh&&vt.batching===!0||F.isBatchedMesh&&vt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&vt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&vt.instancing===!1||!F.isInstancedMesh&&vt.instancing===!0||F.isSkinnedMesh&&vt.skinning===!1||!F.isSkinnedMesh&&vt.skinning===!0||F.isInstancedMesh&&vt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&vt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&vt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&vt.instancingMorph===!1&&F.morphTexture!==null||vt.envMap!==gt||z.fog===!0&&vt.fog!==et||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==at.numPlanes||vt.numIntersection!==at.numIntersection)||vt.vertexAlphas!==wt||vt.vertexTangents!==Tt||vt.morphTargets!==yt||vt.morphNormals!==$t||vt.morphColors!==oe||vt.toneMapping!==le||vt.morphTargetsCount!==Kt)&&(Jt=!0):(Jt=!0,vt.__version=z.version);let ai=vt.currentProgram;Jt===!0&&(ai=ns(z,N,F));let ss=!1,Oi=!1,ur=!1;const Me=ai.getUniforms(),Mi=vt.uniforms;if(St.useProgram(ai.program)&&(ss=!0,Oi=!0,ur=!0),z.id!==I&&(I=z.id,Oi=!0),ss||b!==w){Me.setValue(U,"projectionMatrix",w.projectionMatrix),Me.setValue(U,"viewMatrix",w.matrixWorldInverse);const Ve=Me.map.cameraPosition;Ve!==void 0&&Ve.setValue(U,ot.setFromMatrixPosition(w.matrixWorld)),ae.logarithmicDepthBuffer&&Me.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Me.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),b!==w&&(b=w,Oi=!0,ur=!0)}if(F.isSkinnedMesh){Me.setOptional(U,F,"bindMatrix"),Me.setOptional(U,F,"bindMatrixInverse");const Ve=F.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),Me.setValue(U,"boneTexture",Ve.boneTexture,Pt))}F.isBatchedMesh&&(Me.setOptional(U,F,"batchingTexture"),Me.setValue(U,"batchingTexture",F._matricesTexture,Pt),Me.setOptional(U,F,"batchingColorTexture"),F._colorsTexture!==null&&Me.setValue(U,"batchingColorTexture",F._colorsTexture,Pt));const dr=O.morphAttributes;if((dr.position!==void 0||dr.normal!==void 0||dr.color!==void 0)&&_t.update(F,O,ai),(Oi||vt.receiveShadow!==F.receiveShadow)&&(vt.receiveShadow=F.receiveShadow,Me.setValue(U,"receiveShadow",F.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Mi.envMap.value=gt,Mi.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(Mi.envMapIntensity.value=N.environmentIntensity),Oi&&(Me.setValue(U,"toneMappingExposure",v.toneMappingExposure),vt.needsLights&&fc(Mi,ur),et&&z.fog===!0&&Q.refreshFogUniforms(Mi,et),Q.refreshMaterialUniforms(Mi,z,K,G,p.state.transmissionRenderTarget[w.id]),ks.upload(U,Ea(vt),Mi,Pt)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ks.upload(U,Ea(vt),Mi,Pt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Me.setValue(U,"center",F.center),Me.setValue(U,"modelViewMatrix",F.modelViewMatrix),Me.setValue(U,"normalMatrix",F.normalMatrix),Me.setValue(U,"modelMatrix",F.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ve=z.uniformsGroups;for(let fr=0,mc=Ve.length;fr<mc;fr++){const Ca=Ve[fr];Ht.update(Ca,ai),Ht.bind(Ca,ai)}}return ai}function fc(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function pc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,N,O){Ot.get(w.texture).__webglTexture=N,Ot.get(w.depthTexture).__webglTexture=O;const z=Ot.get(w);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,N){const O=Ot.get(w);O.__webglFramebuffer=N,O.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,O=0){A=w,P=N,E=O;let z=!0,F=null,et=!1,ht=!1;if(w){const gt=Ot.get(w);gt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(U.FRAMEBUFFER,null),z=!1):gt.__webglFramebuffer===void 0?Pt.setupRenderTarget(w):gt.__hasExternalTextures&&Pt.rebindTextures(w,Ot.get(w.texture).__webglTexture,Ot.get(w.depthTexture).__webglTexture);const wt=w.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(ht=!0);const Tt=Ot.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Tt[N])?F=Tt[N][O]:F=Tt[N],et=!0):w.samples>0&&Pt.useMultisampledRTT(w)===!1?F=Ot.get(w).__webglMultisampledFramebuffer:Array.isArray(Tt)?F=Tt[O]:F=Tt,x.copy(w.viewport),R.copy(w.scissor),B=w.scissorTest}else x.copy(ut).multiplyScalar(K).floor(),R.copy(ft).multiplyScalar(K).floor(),B=Ct;if(St.bindFramebuffer(U.FRAMEBUFFER,F)&&z&&St.drawBuffers(w,F),St.viewport(x),St.scissor(R),St.setScissorTest(B),et){const gt=Ot.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,gt.__webglTexture,O)}else if(ht){const gt=Ot.get(w.texture),wt=N||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,gt.__webglTexture,O||0,wt)}I=-1},this.readRenderTargetPixels=function(w,N,O,z,F,et,ht){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=Ot.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){St.bindFramebuffer(U.FRAMEBUFFER,dt);try{const gt=w.texture,wt=gt.format,Tt=gt.type;if(!ae.textureFormatReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-z&&O>=0&&O<=w.height-F&&U.readPixels(N,O,z,F,lt.convert(wt),lt.convert(Tt),et)}finally{const gt=A!==null?Ot.get(A).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(w,N,O,z,F,et,ht){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=Ot.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){St.bindFramebuffer(U.FRAMEBUFFER,dt);try{const gt=w.texture,wt=gt.format,Tt=gt.type;if(!ae.textureFormatReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=w.width-z&&O>=0&&O<=w.height-F){const yt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,yt),U.bufferData(U.PIXEL_PACK_BUFFER,et.byteLength,U.STREAM_READ),U.readPixels(N,O,z,F,lt.convert(wt),lt.convert(Tt),0),U.flush();const $t=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);await Fh(U,$t,4);try{U.bindBuffer(U.PIXEL_PACK_BUFFER,yt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,et)}finally{U.deleteBuffer(yt),U.deleteSync($t)}return et}}finally{const gt=A!==null?Ot.get(A).__webglFramebuffer:null;St.bindFramebuffer(U.FRAMEBUFFER,gt)}}},this.copyFramebufferToTexture=function(w,N=null,O=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,w=arguments[1]);const z=Math.pow(2,-O),F=Math.floor(w.image.width*z),et=Math.floor(w.image.height*z),ht=N!==null?N.x:0,dt=N!==null?N.y:0;Pt.setTexture2D(w,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,ht,dt,F,et),St.unbindTexture()},this.copyTextureToTexture=function(w,N,O=null,z=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,w=arguments[1],N=arguments[2],F=arguments[3]||0,O=null);let et,ht,dt,gt,wt,Tt;O!==null?(et=O.max.x-O.min.x,ht=O.max.y-O.min.y,dt=O.min.x,gt=O.min.y):(et=w.image.width,ht=w.image.height,dt=0,gt=0),z!==null?(wt=z.x,Tt=z.y):(wt=0,Tt=0);const yt=lt.convert(N.format),$t=lt.convert(N.type);Pt.setTexture2D(N,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const oe=U.getParameter(U.UNPACK_ROW_LENGTH),le=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ze=U.getParameter(U.UNPACK_SKIP_PIXELS),Kt=U.getParameter(U.UNPACK_SKIP_ROWS),vt=U.getParameter(U.UNPACK_SKIP_IMAGES),Re=w.isCompressedTexture?w.mipmaps[F]:w.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,Re.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Re.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,dt),U.pixelStorei(U.UNPACK_SKIP_ROWS,gt),w.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,wt,Tt,et,ht,yt,$t,Re.data):w.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,wt,Tt,Re.width,Re.height,yt,Re.data):U.texSubImage2D(U.TEXTURE_2D,F,wt,Tt,yt,$t,Re),U.pixelStorei(U.UNPACK_ROW_LENGTH,oe),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,Kt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,vt),F===0&&N.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(w,N,O=null,z=null,F=0){w.isTexture!==!0&&(console.warn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,w=arguments[2],N=arguments[3],F=arguments[4]||0);let et,ht,dt,gt,wt,Tt,yt,$t,oe;const le=w.isCompressedTexture?w.mipmaps[F]:w.image;O!==null?(et=O.max.x-O.min.x,ht=O.max.y-O.min.y,dt=O.max.z-O.min.z,gt=O.min.x,wt=O.min.y,Tt=O.min.z):(et=le.width,ht=le.height,dt=le.depth,gt=0,wt=0,Tt=0),z!==null?(yt=z.x,$t=z.y,oe=z.z):(yt=0,$t=0,oe=0);const ze=lt.convert(N.format),Kt=lt.convert(N.type);let vt;if(N.isData3DTexture)Pt.setTexture3D(N,0),vt=U.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)Pt.setTexture2DArray(N,0),vt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const Re=U.getParameter(U.UNPACK_ROW_LENGTH),Jt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),ai=U.getParameter(U.UNPACK_SKIP_PIXELS),ss=U.getParameter(U.UNPACK_SKIP_ROWS),Oi=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,le.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,le.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,gt),U.pixelStorei(U.UNPACK_SKIP_ROWS,wt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Tt),w.isDataTexture||w.isData3DTexture?U.texSubImage3D(vt,F,yt,$t,oe,et,ht,dt,ze,Kt,le.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(vt,F,yt,$t,oe,et,ht,dt,ze,le.data):U.texSubImage3D(vt,F,yt,$t,oe,et,ht,dt,ze,Kt,le),U.pixelStorei(U.UNPACK_ROW_LENGTH,Re),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Jt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ai),U.pixelStorei(U.UNPACK_SKIP_ROWS,ss),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Oi),F===0&&N.generateMipmaps&&U.generateMipmap(vt),St.unbindTexture()},this.initRenderTarget=function(w){Ot.get(w).__webglFramebuffer===void 0&&Pt.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Pt.setTextureCube(w,0):w.isData3DTexture?Pt.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Pt.setTexture2DArray(w,0):Pt.setTexture2D(w,0),St.unbindTexture()},this.resetState=function(){P=0,E=0,A=null,St.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ua?"display-p3":"srgb",e.unpackColorSpace=Zt.workingColorSpace===or?"display-p3":"srgb"}}class Qs{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Mt(t),this.density=e}clone(){return new Qs(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jo extends re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Te,this.environmentIntensity=1,this.environmentRotation=new Te,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Wm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=oa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=_i()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return fa("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_i()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new T;class Js{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=je(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=jt(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=je(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=je(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=je(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=je(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array),n=jt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),i=jt(i,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new Se(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Js(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class va extends Ni{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Mn;const Gn=new T,yn=new T,Sn=new T,wn=new mt,Wn=new mt,$l=new Wt,Cs=new T,Xn=new T,Rs=new T,Zo=new mt,Xr=new mt,Qo=new mt;class Kl extends re{constructor(t=new va){if(super(),this.isSprite=!0,this.type="Sprite",Mn===void 0){Mn=new we;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Wm(e,5);Mn.setIndex([0,1,2,0,2,3]),Mn.setAttribute("position",new Js(i,3,0,!1)),Mn.setAttribute("uv",new Js(i,2,3,!1))}this.geometry=Mn,this.material=t,this.center=new mt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yn.setFromMatrixScale(this.matrixWorld),$l.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Sn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yn.multiplyScalar(-Sn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;Ps(Cs.set(-.5,-.5,0),Sn,a,yn,n,r),Ps(Xn.set(.5,-.5,0),Sn,a,yn,n,r),Ps(Rs.set(.5,.5,0),Sn,a,yn,n,r),Zo.set(0,0),Xr.set(1,0),Qo.set(1,1);let o=t.ray.intersectTriangle(Cs,Xn,Rs,!1,Gn);if(o===null&&(Ps(Xn.set(-.5,.5,0),Sn,a,yn,n,r),Xr.set(0,1),o=t.ray.intersectTriangle(Cs,Rs,Xn,!1,Gn),o===null))return;const l=t.ray.origin.distanceTo(Gn);l<t.near||l>t.far||e.push({distance:l,point:Gn.clone(),uv:Ze.getInterpolation(Gn,Cs,Xn,Rs,Zo,Xr,Qo,new mt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ps(s,t,e,i,n,r){wn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(Wn.x=r*wn.x-n*wn.y,Wn.y=n*wn.x+r*wn.y):Wn.copy(wn),s.copy(t),s.x+=Wn.x,s.y+=Wn.y,s.applyMatrix4($l)}class Xm extends Ce{constructor(t=null,e=1,i=1,n,r,a,o,l,c=Fe,h=Fe,u,f){super(null,a,o,l,c,h,n,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jo extends Se{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const bn=new Wt,tl=new Wt,Ls=[],el=new xi,qm=new Wt,qn=new bt,Yn=new Ji;class jl extends bt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Jo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,qm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,bn),el.copy(t.boundingBox).applyMatrix4(bn),this.boundingBox.union(el)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,bn),Yn.copy(t.boundingSphere).applyMatrix4(bn),this.boundingSphere.union(Yn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(qn.geometry=this.geometry,qn.material=this.material,qn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yn.copy(this.boundingSphere),Yn.applyMatrix4(i),t.ray.intersectsSphere(Yn)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,bn),tl.multiplyMatrices(i,bn),qn.matrixWorld=tl,qn.raycast(t,Ls);for(let a=0,o=Ls.length;a<o;a++){const l=Ls[a];l.instanceId=r,l.object=this,e.push(l)}Ls.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Jo(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xm(new Float32Array(n*this.count),n,this.count,El,fi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Zl extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tr=new T,er=new T,il=new Wt,$n=new lr,Ds=new Ji,qr=new T,nl=new T;class Ym extends re{constructor(t=new we,e=new Zl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)tr.fromBufferAttribute(e,n-1),er.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=tr.distanceTo(er);t.setAttribute("lineDistance",new ue(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(n),Ds.radius+=r,t.ray.intersectsSphere(Ds)===!1)return;il.copy(n).invert(),$n.copy(t.ray).applyMatrix4(il);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const d=h.getX(_),y=h.getX(_+1),v=Us(this,t,$n,l,d,y);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),d=Us(this,t,$n,l,_,p);d&&e.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=c){const d=Us(this,t,$n,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=Us(this,t,$n,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Us(s,t,e,i,n,r){const a=s.geometry.attributes.position;if(tr.fromBufferAttribute(a,n),er.fromBufferAttribute(a,r),e.distanceSqToSegment(tr,er,qr,nl)>i)return;qr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(qr);if(!(l<t.near||l>t.far))return{distance:l,point:nl.clone().applyMatrix4(s.matrixWorld),index:n,face:null,faceIndex:null,object:s}}class $m extends Ni{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const sl=new Wt,ca=new lr,Is=new Ji,Ns=new T;class Ql extends re{constructor(t=new we,e=new $m){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Is.copy(i.boundingSphere),Is.applyMatrix4(n),Is.radius+=r,t.ray.intersectsSphere(Is)===!1)return;sl.copy(n).invert(),ca.copy(t.ray).applyMatrix4(sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=c.getX(g);Ns.fromBufferAttribute(u,p),rl(Ns,p,l,n,t,e,this)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=f,_=m;g<_;g++)Ns.fromBufferAttribute(u,g),rl(Ns,g,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function rl(s,t,e,i,n,r,a){const o=ca.distanceSqToPoint(s);if(o<e){const l=new T;ca.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}class Jl extends Ce{constructor(t,e,i,n,r,a,o,l,c){super(t,e,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class si extends we{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const _=[],p=i/2;let d=0;y(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(f,3)),this.setAttribute("uv",new ue(m,2));function y(){const S=new T,P=new T;let E=0;const A=(e-t)/i;for(let I=0;I<=r;I++){const b=[],x=I/r,R=x*(e-t)+t;for(let B=0;B<=n;B++){const k=B/n,W=k*l+o,Y=Math.sin(W),G=Math.cos(W);P.x=R*Y,P.y=-x*i+p,P.z=R*G,u.push(P.x,P.y,P.z),S.set(Y,A,G).normalize(),f.push(S.x,S.y,S.z),m.push(k,1-x),b.push(g++)}_.push(b)}for(let I=0;I<n;I++)for(let b=0;b<r;b++){const x=_[b][I],R=_[b+1][I],B=_[b+1][I+1],k=_[b][I+1];h.push(x,R,k),h.push(R,B,k),E+=6}c.addGroup(d,E,0),d+=E}function v(S){const P=g,E=new mt,A=new T;let I=0;const b=S===!0?t:e,x=S===!0?1:-1;for(let B=1;B<=n;B++)u.push(0,p*x,0),f.push(0,x,0),m.push(.5,.5),g++;const R=g;for(let B=0;B<=n;B++){const W=B/n*l+o,Y=Math.cos(W),G=Math.sin(W);A.x=b*G,A.y=p*x,A.z=b*Y,u.push(A.x,A.y,A.z),f.push(0,x,0),E.x=Y*.5+.5,E.y=G*.5*x+.5,m.push(E.x,E.y),g++}for(let B=0;B<n;B++){const k=P+B,W=R+B;S===!0?h.push(W,W+1,k):h.push(W+1,W,k),I+=3}c.addGroup(d,I,S===!0?1:2),d+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new si(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xa extends si{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new xa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ma extends we{constructor(t=[],e=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:n};const r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(r.slice(),3)),this.setAttribute("uv",new ue(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const v=new T,S=new T,P=new T;for(let E=0;E<e.length;E+=3)m(e[E+0],v),m(e[E+1],S),m(e[E+2],P),l(v,S,P,y)}function l(y,v,S,P){const E=P+1,A=[];for(let I=0;I<=E;I++){A[I]=[];const b=y.clone().lerp(S,I/E),x=v.clone().lerp(S,I/E),R=E-I;for(let B=0;B<=R;B++)B===0&&I===E?A[I][B]=b:A[I][B]=b.clone().lerp(x,B/R)}for(let I=0;I<E;I++)for(let b=0;b<2*(E-I)-1;b++){const x=Math.floor(b/2);b%2===0?(f(A[I][x+1]),f(A[I+1][x]),f(A[I][x])):(f(A[I][x+1]),f(A[I+1][x+1]),f(A[I+1][x]))}}function c(y){const v=new T;for(let S=0;S<r.length;S+=3)v.x=r[S+0],v.y=r[S+1],v.z=r[S+2],v.normalize().multiplyScalar(y),r[S+0]=v.x,r[S+1]=v.y,r[S+2]=v.z}function h(){const y=new T;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const S=p(y)/2/Math.PI+.5,P=d(y)/Math.PI+.5;a.push(S,1-P)}g(),u()}function u(){for(let y=0;y<a.length;y+=6){const v=a[y+0],S=a[y+2],P=a[y+4],E=Math.max(v,S,P),A=Math.min(v,S,P);E>.9&&A<.1&&(v<.2&&(a[y+0]+=1),S<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function m(y,v){const S=y*3;v.x=t[S+0],v.y=t[S+1],v.z=t[S+2]}function g(){const y=new T,v=new T,S=new T,P=new T,E=new mt,A=new mt,I=new mt;for(let b=0,x=0;b<r.length;b+=9,x+=6){y.set(r[b+0],r[b+1],r[b+2]),v.set(r[b+3],r[b+4],r[b+5]),S.set(r[b+6],r[b+7],r[b+8]),E.set(a[x+0],a[x+1]),A.set(a[x+2],a[x+3]),I.set(a[x+4],a[x+5]),P.copy(y).add(v).add(S).divideScalar(3);const R=p(P);_(E,x+0,y,R),_(A,x+2,v,R),_(I,x+4,S,R)}}function _(y,v,S,P){P<0&&y.x===1&&(a[v]=y.x-1),S.x===0&&S.z===0&&(a[v]=P/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function d(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.vertices,t.indices,t.radius,t.details)}}class ir extends Ma{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ir(t.radius,t.detail)}}class ya extends we{constructor(t=.5,e=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/n,m=new T,g=new mt;for(let _=0;_<=n;_++){for(let p=0;p<=i;p++){const d=r+p/i*a;m.x=u*Math.cos(d),m.y=u*Math.sin(d),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<n;_++){const p=_*(i+1);for(let d=0;d<i;d++){const y=d+p,v=y,S=y+i+1,P=y+i+2,E=y+1;o.push(v,S,E),o.push(S,P,E)}}this.setIndex(o),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(c,3)),this.setAttribute("uv",new ue(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ya(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class nr extends we{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new T,f=new T,m=[],g=[],_=[],p=[];for(let d=0;d<=i;d++){const y=[],v=d/i;let S=0;d===0&&a===0?S=.5/e:d===i&&l===Math.PI&&(S=-.5/e);for(let P=0;P<=e;P++){const E=P/e;u.x=-t*Math.cos(n+E*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(n+E*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(E+S,1-v),y.push(c++)}h.push(y)}for(let d=0;d<i;d++)for(let y=0;y<e;y++){const v=h[d][y+1],S=h[d][y],P=h[d+1][y],E=h[d+1][y+1];(d!==0||a>0)&&m.push(v,S,E),(d!==i-1||l<Math.PI)&&m.push(S,P,E)}this.setIndex(m),this.setAttribute("position",new ue(g,3)),this.setAttribute("normal",new ue(_,3)),this.setAttribute("uv",new ue(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ce extends Ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pl,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Te,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sa extends re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Mt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class tc extends Sa{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Mt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Yr=new Wt,al=new T,ol=new T;class ec{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ma,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new ne(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;al.setFromMatrixPosition(t.matrixWorld),e.position.copy(al),ol.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ol),e.updateMatrixWorld(),Yr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Yr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Yr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ll=new Wt,Kn=new T,$r=new T;class Km extends ec{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new mt(4,2),this._viewportCount=6,this._viewports=[new ne(2,1,1,1),new ne(0,1,1,1),new ne(3,1,1,1),new ne(1,1,1,1),new ne(3,0,1,1),new ne(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Kn.setFromMatrixPosition(t.matrixWorld),i.position.copy(Kn),$r.copy(i.position),$r.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt($r),i.updateMatrixWorld(),n.makeTranslation(-Kn.x,-Kn.y,-Kn.z),ll.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ll)}}class Hs extends Sa{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Km}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class jm extends ec{constructor(){super(new ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sr extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(re.DEFAULT_UP),this.updateMatrix(),this.target=new re,this.shadow=new jm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Zm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=cl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=cl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function cl(){return(typeof performance>"u"?Date:performance).now()}const hl=new Wt;class ic{constructor(t,e,i=0,n=1/0){this.ray=new lr(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return hl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(hl),this}intersectObject(t,e=!0,i=[]){return ha(t,this,i,e),i.sort(ul),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)ha(t[n],this,i,e);return i.sort(ul),i}}function ul(s,t){return s.distance-t.distance}function ha(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ha(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rr);const te={seed:49370,player:{eyeStand:1.62,eyeCrouch:1.05,eyeSlide:.78,heightStand:1.8,heightCrouch:1.15,radius:.34,walk:3.2,sprint:4.6,tacSprint:5.9,slideMin:5.4,accelGround:12,accelAir:5.5,friction:10,jumpVel:4.3,gravity:11.5,health:100,regenDelay:4,regenRate:34,tacWindow:.18},weapon:{rpm:700,magSize:30,reloadTime:2,reloadOverdrive:1.4,damage:34,headMult:2,tracers:!0,eyeRelief:.1,fovHip:75,fovAds:55,adsTime:.15},camera:{near:.1,far:400,vmNear:.01,vmFov:60,vmFar:3,shakeMicro:.35,shakeExplosion:1.6,shakeDamage:1.2},world:{size:64,snowCount:1600,fogDensity:.011,quality:{high:{dpr:2,snow:1600,bloom:1,cones:!0},low:{dpr:1,snow:500,bloom:0,cones:!1}}},fx:{particleBudget:900,decalCap:220,ragdollCap:6,tracerPool:48,shellPool:24},enemies:{maxActive:{early:5,late:9},spawnPerimeter:8,wave:s=>({count:4+s*3,rusher:Math.min(10,2+s),gunner:s>=2?Math.min(7,s-1):0,heavy:s>=3?Math.min(4,Math.floor((s-1)/2)):0}),hp:{rusher:34,gunner:70,heavy:220},speed:{rusher:3.4,gunner:2.6,heavy:1.7},damage:{rusher:16,gunner:9,heavy:14}},action:{comboWindow:4,overdriveKills:5,overdriveDur:6,overdriveCooldown:18,scoreKill:100,scoreHead:200,scoreWave:500},audio:{master:.85}},nc=49370;class Qm{constructor(t=nc){this.seed=t>>>0,this.s=this.seed}next(){this.s=this.s+1831565813|0;let t=Math.imul(this.s^this.s>>>15,1|this.s);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return Math.floor(t+(e-t+1)*this.next())}pick(t){return t[this.int(0,t.length-1)]}gauss(){return(this.next()+this.next()+this.next())/1.5-1}reset(){this.s=this.seed}}const D=new Qm(nc),Bt=(s,t,e)=>s<t?t:s>e?e:s,Qi=(s,t,e)=>s+(t-s)*e,Fs=s=>1-Math.pow(1-s,3),Vs=s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,Xe=(s,t,e,i)=>Qi(s,t,1-Math.exp(-e*i));class he{constructor(t=0,e=120,i=1){this.v=t,this.target=t,this.vel=0,this.k=e,this.zeta=i}set(t,e=0){this.v=t,this.target=t,this.vel=e}kick(t){this.vel+=t}update(t){(!isFinite(this.v)||!isFinite(this.vel))&&(this.v=this.target,this.vel=0),t=Math.min(Math.max(t,0),.1);const e=Math.sqrt(this.k),i=.5/(2*this.zeta*e+e),n=Math.min(16,Math.max(1,Math.ceil(t/i))),r=t/n;for(let a=0;a<n;a++){const o=this.k*(this.target-this.v)-2*this.zeta*e*this.vel;this.vel+=o*r,this.v+=this.vel*r}return isFinite(this.v)||(this.v=this.target,this.vel=0),this.v}}function Kr(s,t,e){return e===void 0?s>=t?1:s<=0?0:s/t:s>=e?1:s<=t?0:(s-t)/(e-t)}function tn(s){const t=document.createElement("canvas");return t.width=t.height=s,[t,t.getContext("2d")]}function en(s,t=!0){const e=new Jl(s);return t&&(e.colorSpace=He),e.wrapS=e.wrapT=Ws,e}function Zn(s="#2b2e33"){const[t,e]=tn(256);e.fillStyle=s,e.fillRect(0,0,256,256);for(let i=0;i<90;i++){const n=D.range(0,256),r=D.range(10,140),a=D.range(0,256);e.strokeStyle=`rgba(${D.int(120,200)}, ${D.int(120,190)}, ${D.int(130,200)}, ${D.range(.02,.09)})`,e.lineWidth=D.range(.5,2.5),e.beginPath(),e.moveTo(a,n),e.lineTo(a+r,n+D.range(-6,6)),e.stroke()}for(let i=0;i<24;i++)e.fillStyle=`rgba(190, 200, 210, ${D.range(.05,.2)})`,e.beginPath(),e.arc(D.range(0,256),D.range(0,256),D.range(2,14),0,7),e.fill();e.fillStyle="rgba(0,0,0,0.18)";for(let i=8;i<256;i+=16)e.fillRect(i,0,2,256);return en(t)}function sc(){const[s,t]=tn(128);for(let e=0;e<8;e++)t.fillStyle=`hsl(${D.int(25,34)}, ${D.int(28,45)}%, ${D.int(30,48)}%)`,t.fillRect(0,e*16,128,15),t.strokeStyle="rgba(0,0,0,0.4)",t.strokeRect(.5,e*16+.5,127,15);for(let e=0;e<40;e++){t.strokeStyle=`rgba(60, 40, 20, ${D.range(.1,.3)})`;const i=D.range(0,128);t.beginPath(),t.moveTo(0,i),t.lineTo(128,i+D.range(-3,3)),t.stroke()}return en(s)}function Jm(){const[s,t]=tn(32),e=t.createRadialGradient(16,16,1,16,16,15);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.4,"rgba(255,60,40,0.9)"),e.addColorStop(1,"rgba(255,40,20,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),en(s)}function t0(){const[s,t]=tn(64),e=t.createRadialGradient(32,32,2,32,32,30);return e.addColorStop(0,"rgba(255,255,255,0.85)"),e.addColorStop(.55,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),en(s)}function e0(){const[s,t]=tn(128);for(let e=0;e<60;e++){const i=D.range(0,6.3),n=D.range(2,34),r=64+Math.cos(i)*D.range(0,30),a=64+Math.sin(i)*D.range(0,30),o=t.createRadialGradient(r,a,0,r,a,n);o.addColorStop(0,`rgba(10, 8, 6, ${D.range(.15,.4)})`),o.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=o,t.fillRect(0,0,128,128)}return en(s)}function dl(s=0){const[t,e]=tn(128),i=14+s*10;for(let n=0;n<i;n++){const r=D.range(0,Math.PI*2),a=D.range(0,40+s*12),o=64+Math.cos(r)*a,l=64+Math.sin(r)*a,c=D.range(2,9+s*3),h=e.createRadialGradient(o,l,0,o,l,c);h.addColorStop(0,`rgba(122, 8, 14, ${D.range(.7,.95)})`),h.addColorStop(.7,"rgba(90, 5, 10, 0.55)"),h.addColorStop(1,"rgba(30, 8, 8, 0)"),e.fillStyle=h,e.beginPath(),e.arc(o,l,c,0,7),e.fill()}return en(t)}function jr(){const[s,t]=tn(64),e=t.createRadialGradient(32,32,1,32,32,20);return e.addColorStop(0,"rgba(8,8,8,0.9)"),e.addColorStop(.25,"rgba(30,28,25,0.7)"),e.addColorStop(.5,"rgba(120,110,95,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),en(s)}const rc=[];for(let s=0;s<7;s++)rc.push({x:D.range(-26,26),z:D.range(-26,26),r:D.range(4,10),h:D.range(.25,.8),ph:D.range(0,6.28)});function be(s,t){let e=0;for(const i of rc){const n=s-i.x,r=t-i.z;e+=i.h*Math.exp(-(n*n+r*r)/(i.r*i.r))}return e+=.05*Math.sin(s*1.7+1.3)*Math.sin(t*1.9+2.1)*Math.sin((s+t)*.6+i0(s,t)),e}function i0(s,t){return .35*Math.sin(s*.8)*Math.sin(t*.7)}class n0{constructor(t){this.game=t,this.scene=t.scene,this.colliders=[],this.shootables=[],this.drums=[],this.windows=[],this.coverPoints=[],this.wind={x:.55,z:.25,gust:0,t:0},this.windSprings={x:new he(.55,2,1),z:new he(.25,2,1),gust:new he(0,3,1)},this.floodlights=[],this._t=0,this._build()}_build(){this._sky(),this._ground(),this._containers(),this._crates(),this._drums(),this._ice(),this._modules(),this._masts(),this._floodlights(),this._flags();const t=new tc(7177396,4608619,.85);this.scene.add(t),this.hemi=t;const e=new sr(10335464,1.2);e.position.set(-30,26,-18),e.castShadow=!0,e.shadow.mapSize.set(2048,2048);const i=42;e.shadow.camera.left=-i,e.shadow.camera.right=i,e.shadow.camera.top=i,e.shadow.camera.bottom=-i,e.shadow.camera.far=120,e.shadow.bias=-8e-4,this.scene.add(e),this.keyLight=e,this.auroraTint=new sr(4173450,.3),this.auroraTint.position.set(10,40,5),this.scene.add(this.auroraTint)}_sky(){const t=new nr(280,32,20),e=new se({side:Ie,depthWrite:!1,fog:!1,uniforms:{uTime:{value:0}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        varying vec3 vP; uniform float uTime;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        void main() {
          vec3 d = normalize(vP);
          float h = clamp(d.y, -0.08, 1.0);
          // deep blue-violet dusk; brighter at horizon, NEVER black (Section 1)
          vec3 zen = vec3(0.075, 0.10, 0.20);
          vec3 mid = vec3(0.13, 0.16, 0.30);
          vec3 hor = vec3(0.36, 0.28, 0.34);
          vec3 col = mix(mid, zen, smoothstep(0.12, 0.75, h));
          col = mix(hor, col, smoothstep(-0.05, 0.16, h));
          // faint warm western afterglow
          float w = pow(max(0.0, dot(d, normalize(vec3(-0.6, 0.12, -0.75)))), 3.0);
          col += vec3(0.22, 0.10, 0.05) * w * smoothstep(0.0, 0.3, h);
          // sparse dim stars up high
          if (h > 0.18) {
            vec2 sp = d.xz / (d.y + 0.2) * 90.0;
            float st = step(0.9975, hash(floor(sp))) * smoothstep(0.18, 0.5, h);
            col += vec3(0.6, 0.7, 0.9) * st * 0.5;
          }
          gl_FragColor = vec4(col, 1.0);
        }`}),i=new bt(t,e);i.frustumCulled=!1,this.scene.add(i),this.skyMat=e,this.auroraMats=[];for(let n=0;n<3;n++){const a=70+n*26,o=new ri(340,a,64,1),l=o.attributes.position;for(let u=0;u<l.count;u++){const f=l.getX(u);l.setZ(u,Math.sin(f/340*Math.PI)*90-120),l.setY(u,l.getY(u)+78+n*22)}const c=new se({side:Ne,transparent:!0,depthWrite:!1,blending:Qe,fog:!1,uniforms:{uTime:{value:0},uSeed:{value:n*37.7},uWind:{value:.4},uColorA:{value:new Mt(.1,.85,.45)},uColorB:{value:new Mt(.15,.35,.85)},uColorC:{value:new Mt(.65,.2,.75)}},vertexShader:`
          varying vec2 vUv; varying float vX;
          void main(){ vUv = uv; vX = uv.x; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
          uniform float uTime; uniform float uSeed; uniform float uWind;
          uniform vec3 uColorA; uniform vec3 uColorB; uniform vec3 uColorC;
          varying vec2 vUv; varying float vX;
          // value noise + fbm — smooth gradients, no banding (G1)
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43741.5453); }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
          }
          float fbm(vec2 p){
            float a = 0.5, s = 0.0;
            for (int k = 0; k < 5; k++) { s += a * noise(p); p *= 2.03; a *= 0.5; }
            return s;
          }
          void main() {
            float t = uTime * (0.05 + uWind * 0.12);
            vec2 q = vec2(vUv.x * 6.0 - t, vUv.y * 1.6);
            float curl = fbm(q + fbm(q * 1.7 + uSeed + t * 0.7) * 1.8 + uSeed);
            float bands = smoothstep(0.25, 0.75, curl);
            float edges = smoothstep(0.0, 0.25, vUv.x) * (1.0 - smoothstep(0.75, 1.0, vUv.x));
            float bottom = smoothstep(0.0, 0.55, vUv.y);
            float top = 1.0 - smoothstep(0.55, 1.0, vUv.y);
            float a = bands * edges * bottom * top;
            // fold: brighten the lower edge of curtains (green) upper goes violet
            vec3 col = mix(uColorA, uColorB, smoothstep(0.1, 0.8, vUv.y));
            col = mix(col, uColorC, smoothstep(0.55, 1.0, vUv.y) * 0.7);
            col *= 1.2 + 0.8 * sin(vX * 9.0 + uTime * 0.4 + uSeed);
            gl_FragColor = vec4(col * a * 1.15, a);
          }`}),h=new bt(o,c);h.rotation.y=D.range(0,Math.PI*2),h.position.y=n*4,h.renderOrder=-10,this.scene.add(h),this.auroraMats.push(c),(this.auroraMeshes??(this.auroraMeshes=[])).push(h)}}_ground(){const t=this.game.cfg.world.size,e=new ri(t*1.9,t*1.9,120,120);e.rotateX(-Math.PI/2);const i=e.attributes.position;for(let a=0;a<i.count;a++)i.setY(a,be(i.getX(a),i.getZ(a)));e.computeVertexNormals();const n=new ce({color:14674165,roughness:.92,metalness:0});n.onBeforeCompile=a=>{a.uniforms.uTime={value:0},a.uniforms.uCam={value:new T},a.uniforms.uPools={value:Array.from({length:8},()=>new T(1e5,0,1e5))},a.uniforms.uPoolN={value:0},n.userData.shaderUniforms=a.uniforms,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
          uniform vec3 uCam; uniform float uTime;
          varying vec3 vWPos; varying vec2 vUvw;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
          vWPos = worldPosition.xyz;`),/vWPos = worldPosition/.test(a.vertexShader)||(a.vertexShader=a.vertexShader.replace("void main() {",`void main() {
 vWPos = (modelMatrix * vec4(transformed,1.0)).xyz;`)),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
          uniform float uTime; uniform vec3 uCam;
          uniform vec3 uPools[8]; uniform int uPoolN;
          varying vec3 vWPos;
          float sHash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43741.5453); }
          float sNoise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(sHash(i), sHash(i+vec2(1,0)), f.x), mix(sHash(i+vec2(0,1)), sHash(i+vec2(1,1)), f.x), f.y);
          }`),a.fragmentShader=a.fragmentShader.replace("#include <dithering_fragment>",`
          {
            float streaks = sNoise(vWPos.xz * vec2(0.7, 2.2)) * 0.5 + sNoise(vWPos.xz * vec2(1.6, 4.8) + vec2(3.7, 8.1)) * 0.5;
            outgoingLight *= mix(0.86, 1.06, streaks);
            // light pools from floodlights
            float pool = 0.0;
            for (int i = 0; i < 8; i++) {
              if (i >= uPoolN) break;
              pool += exp(-length(vWPos.xz - uPools[i].xz) / 7.0);
            }
            pool = clamp(pool, 0.0, 1.0);
            // SPARKLE: fine glints, shifts with camera so they shimmer as you move (G6)
            vec2 sp = (vWPos.xz + uCam.xz * 0.9) * 9.0;
            float cell = sHash(floor(sp));
            vec2 f = fract(sp) - 0.5;
            float glint = smoothstep(0.42, 0.0, length(f)) * step(0.992, cell);
            glint *= 0.5 + 0.5 * sin(uTime * 3.0 + cell * 40.0);
            outgoingLight += vec3(1.0, 0.98, 0.92) * glint * (0.5 + pool * 2.2) * 1.5;
            outgoingLight += vec3(0.35, 0.3, 0.28) * pool * 0.16; // warm pool base
          }
          #include <dithering_fragment>`)};const r=new bt(e,n);r.receiveShadow=!0,r.name="ground",this.scene.add(r),this.ground=r,this.groundMat=n,this.shootables.push(r),this._groundReady=!0}_addColliderBox(t,e=0){const i=new xi().setFromObject(t);i.expandByScalar(e),this.colliders.push({type:"box",min:i.min.clone(),max:i.max.clone()})}_containers(){const t=Zn("#3d5a63"),e=Zn("#6b4a3a"),i=Zn("#4a5560"),n=[{p:[-14,-12],ry:.3,tex:t},{p:[13,-15],ry:-1.2,tex:e},{p:[-19,8],ry:1.6,tex:i},{p:[18,10],ry:.8,tex:t},{p:[2,-20],ry:0,tex:e},{p:[-6,20],ry:-.7,tex:i},{p:[24,-4],ry:1.3,tex:t},{p:[-24,-2],ry:-1.9,tex:e}],r=new Rt(6,2.6,2.44);for(const a of n){const o=new ce({map:a.tex,bumpMap:a.tex,bumpScale:.6,roughness:.5,metalness:.7,color:16777215}),l=new bt(r,o);l.position.set(a.p[0],1.3+be(a.p[0],a.p[1])*.5,a.p[1]),l.rotation.y=a.ry,l.castShadow=l.receiveShadow=!0,l.name="container",l.userData.kind="container",this.scene.add(l),this._addColliderBox(l,.05),this.shootables.push(l);const c=new T(Math.cos(a.ry+Math.PI/2),0,-Math.sin(a.ry+Math.PI/2));for(const h of[-1,1])this.coverPoints.push(new T(l.position.x+c.x*1.6*h+D.range(-1,1),0,l.position.z+c.z*1.6*h+D.range(-1,1)))}}_crates(){const t=sc(),e=new Rt(1.1,1.1,1.1),i=new ce({map:t,roughness:.85}),n=[{p:[-8,-6],n:3},{p:[8,4],n:2},{p:[-3,12],n:2},{p:[14,16],n:3},{p:[-16,-18],n:2},{p:[4,-9],n:1}];for(const r of n)for(let a=0;a<r.n;a++){const o=new bt(e,i);o.position.set(r.p[0]+D.range(-.15,.15),.55+a*1.1+be(r.p[0],r.p[1])*.5,r.p[1]+D.range(-.15,.15)),o.rotation.y=D.range(-.2,.2),o.castShadow=o.receiveShadow=!0,o.name="crate",o.userData.kind="crate",this.scene.add(o),this.shootables.push(o),a===r.n-1&&this._addColliderBox(o,.05)}this.crateMat=i}_drums(){this.drumGeo=new si(.42,.42,.95,14);const t=n=>{const r=document.createElement("canvas");r.width=r.height=64;const a=r.getContext("2d");a.fillStyle=n,a.fillRect(0,0,64,64),a.fillStyle="rgba(0,0,0,0.45)",a.fillRect(0,8,64,6),a.fillRect(0,50,64,6);const o=new Jl(r);return o.colorSpace=He,new ce({map:o,roughness:.45,metalness:.7})},e=[t("#a33d2e"),t("#a33d2e"),t("#7a6a35"),t("#41586e"),t("#a33d2e"),t("#7a6a35")],i=[[-10,-15],[-9.2,-14.2],[-10.8,-13.4],[15.5,12.5],[16.3,13.4],[15,13.5],[-20,-14],[19,-8]];for(let n=0;n<i.length;n++){const[r,a]=i[n],o=new bt(this.drumGeo,e[n%e.length].clone());o.position.set(r,.48+be(r,a),a),o.castShadow=o.receiveShadow=!0,o.name="drum",o.userData.kind="drum",o.userData.hp=26,o.userData.alive=!0,this.scene.add(o),this.drums.push(o);const l=new xi().setFromObject(o);this.colliders.push({type:"cyl",x:r,z:a,r:.45,y0:0,y1:l.max.y}),this.shootables.push(o)}}setupWaveDrums(){const t=[[-10,-15],[-9.2,-14.2],[-10.8,-13.4],[15.5,12.5],[16.3,13.4],[-20,-14],[19,-8],[-4,-16],[10,21],[-21,18]];for(const i of this.drums)i.visible=!1,i.userData.alive=!1;for(const i of this.colliders)i.type==="cyl"&&(i.active=!1);const e=[];for(;e.length<5;){const i=D.int(0,t.length-1);e.includes(i)||e.push(i)}e.forEach((i,n)=>{const[r,a]=t[i],o=this.drums[n];o.visible=!0,o.userData.alive=!0,o.userData.hp=26,o.position.set(r,.48+be(r,a),a),o.rotation.set(0,0,0);const l=this.colliders.find(c=>c.type==="cyl"&&Math.abs(c.x-r)<.01&&Math.abs(c.z-a)<.01);l&&(l.active=!0)})}_ice(){const t=new Rt(1,1,1),e=new se({transparent:!0,uniforms:{uTime:{value:0},uColorDeep:{value:new Mt(.02,.1,.22)},uColorShallow:{value:new Mt(.35,.62,.85)},uColorRim:{value:new Mt(.75,.9,1)}},vertexShader:`
        varying vec3 vN; varying vec3 vV; varying vec3 vL; varying vec3 vObj;
        void main(){
          vObj = position;
          vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vV = normalize(-mv.xyz);
          vL = mv.xyz;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uColorDeep; uniform vec3 uColorShallow; uniform vec3 uColorRim; uniform float uTime;
        varying vec3 vN; varying vec3 vV; varying vec3 vL; varying vec3 vObj;
        float hash(vec3 p){ return fract(sin(dot(p, vec3(12.9,78.2,45.7))) * 43758.5); }
        void main(){
          float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.5);
          // fake inner volume: brighter deep-blue core, pale edges
          float depth = clamp(0.5 + vObj.y * 0.6 + hash(floor(vObj * 7.0)) * 0.25, 0.0, 1.0);
          vec3 col = mix(uColorDeep, uColorShallow, depth);
          col = mix(col, uColorRim, fres);
          // internal fracture streaks
          float fr = hash(floor(vObj * vec3(3.0, 9.0, 3.0)) + floor(uTime * 0.01));
          col += uColorRim * smoothstep(0.93, 1.0, fr) * 0.5;
          gl_FragColor = vec4(col, 0.93);
        }`}),i=[{p:[22,-18],s:[3.2,2.6,3.4]},{p:[-23,20],s:[2.6,2.1,2.9]},{p:[6,22],s:[2.2,1.6,2.4]}];for(const n of i){const r=new bt(t,e);r.scale.set(...n.s),r.position.set(n.p[0],n.s[1]/2+be(n.p[0],n.p[1])*.4,n.p[1]),r.rotation.set(D.range(-.08,.08),D.range(0,3),D.range(-.08,.08)),r.name="ice",r.userData.kind="ice",this.scene.add(r),this._addColliderBox(r,.1),this.shootables.push(r),r.geometry=t.clone();const a=r.geometry.attributes.position;for(let o=0;o<a.count;o++)a.setX(o,a.getX(o)+a.getY(o)*.12);r.geometry.computeVertexNormals()}this.iceMat=e}_modules(){const t=new ce({map:Zn("#8d95a3"),color:12568274,roughness:.55,metalness:.6}),e=[{p:[-12,26],ry:.1},{p:[16,26],ry:-.15},{p:[26,22],ry:-1.4}];for(const i of e){const n=new Oe,r=new bt(new Rt(10,3.2,4.4),t);r.position.y=1.6,r.castShadow=r.receiveShadow=!0,r.name="module",r.userData.kind="module",n.add(r);const a=new Rt(1.4,.8,.02),o=new ce({color:3351057,emissive:16757084,emissiveIntensity:1.6,roughness:.4});for(let c=-2;c<=2;c++){const h=new bt(a,o.clone());h.position.set(c*1.8,1.7,2.21),h.name="window",h.userData.kind="window",h.userData.broken=!1,n.add(h),this.windows.push(h),this.shootables.push(h)}const l=new bt(new Rt(10.4,.2,4.8),t);l.position.y=3.3,l.castShadow=!0,n.add(l),n.position.set(i.p[0],be(i.p[0],i.p[1])*.3,i.p[1]),n.rotation.y=i.ry,this.scene.add(n),this._addColliderBox(r,.1),this.shootables.push(r)}}_masts(){const t=new ce({color:5594214,roughness:.5,metalness:.8}),e=[{p:[-26,-24],h:9},{p:[26,-24],h:9}],i=new Zl({color:8952234,transparent:!0,opacity:.7});this.ants=[];for(const n of e){const r=new bt(new si(.07,.1,n.h,8),t);r.position.set(n.p[0],n.h/2,n.p[1]),r.castShadow=!0,r.name="mast",r.userData.kind="mast",this.scene.add(r),this.shootables.push(r),this.colliders.push({type:"cyl",x:n.p[0],z:n.p[1],r:.25,y0:0,y1:n.h});const a=new Oe;a.position.copy(r.position);for(let l=0;l<4;l++){const c=l*Math.PI/2+.6,h=[new T(0,n.h*.85,0),new T(Math.cos(c)*4,0,Math.sin(c)*4)],u=new we().setFromPoints(h);a.add(new Ym(u,i))}const o=new bt(new nr(.09,8,8),new vi({color:16720418}));o.position.y=n.h*.86,a.add(o),this.scene.add(a),this.ants.push({group:a,phase:D.range(0,6.28)})}}_floodlights(){const t=new ce({color:3817286,roughness:.5,metalness:.8}),e=[[-6,-20],[10,14],[-18,-6],[22,4]];for(let i=0;i<e.length;i++){const[n,r]=e[i],a=new Oe,o=new bt(new si(.08,.12,7,8),t);o.position.y=3.5,o.castShadow=!0,a.add(o);const l=new bt(new Rt(.5,.2,.3),new ce({color:546,emissive:16760954,emissiveIntensity:2.5}));l.position.set(0,6.8,.35),l.rotation.x=-.65,a.add(l);const c=new Hs(16757611,26,26,2);c.position.set(0,6.6,.5),a.add(c);const h=new xa(3.4,7.5,24,1,!0),u=new se({transparent:!0,depthWrite:!1,blending:Qe,side:Ne,fog:!1,uniforms:{uTime:{value:0},uWind:{value:.5},uSeed:{value:i*17.3},uSnow:{value:.35}},vertexShader:`
          varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){
            vUv = uv;
            vN = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position,1.0);
            vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,fragmentShader:`
          uniform float uTime; uniform float uWind; uniform float uSeed; uniform float uSnow;
          varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43741.5); }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
          }
          void main(){
            float fade = pow(1.0 - vUv.y, 1.6);          // bright at source
            float rim = pow(abs(dot(normalize(vN), normalize(vV))), 0.55); // soft edge
            // blowing snow streaks inside the beam (G4)
            vec2 q = vec2(vUv.x * 4.0 + uTime * uWind * 1.6 + uSeed, vUv.y * 9.0 - uTime * 1.2);
            float streak = noise(q) * 0.6 + noise(q * 2.3 + 7.0) * 0.4;
            float a = fade * (0.16 + 0.5 * rim * streak * uSnow) * 0.55;
            gl_FragColor = vec4(vec3(1.0, 0.72, 0.42) * a, a);
          }`}),f=new bt(h,u);f.position.set(0,2.9,.4),f.rotation.x=Math.PI/2-.65,f.renderOrder=40,a.add(f),a.position.set(n,be(n,r)*.4,r),a.rotation.y=Math.atan2(-n,-r),this.scene.add(a),this.floodlights.push({group:a,light:c,cone:u,phase:D.range(0,6.28),baseX:n,baseZ:r})}this._groundPoolsPending=!0}_flags(){const t=new ce({color:6712952,roughness:.5,metalness:.7});this.clothMats=[];const e=[{p:[-2,-22],c:2250120},{p:[20,-10],c:8925986},{p:[-22,14],c:3368516}];for(let i=0;i<e.length;i++){const n=e[i],r=new bt(new si(.04,.05,3.4,6),t);r.position.set(n.p[0],1.7,n.p[1]),r.castShadow=!0,this.scene.add(r);const a=new ri(1.1,.66,16,8),o=new se({side:Ne,fog:!1,uniforms:{uTime:{value:0},uWind:{value:.5},uSeed:{value:i*9.1},uColor:{value:new Mt(n.c)},uKick:{value:0}},vertexShader:`
          uniform float uTime; uniform float uWind; uniform float uSeed; uniform float uKick;
          varying vec2 vUv;
          void main(){
            vUv = uv;
            vec3 p = position;
            float w = uv.x; // 0 at pole
            float amp = (0.05 + 0.35 * w) * (0.4 + uWind) + uKick * w * w;
            float wave = sin(uv.x * 9.0 - uTime * (3.0 + uWind * 5.0) + uSeed) * amp;
            p.z += wave;
            p.y += sin(uv.x * 5.0 + uTime * 2.0 + uSeed) * 0.05 * w - w * w * 0.12 * uWind;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }`,fragmentShader:`
          uniform vec3 uColor; uniform float uTime; varying vec2 vUv;
          void main(){
            vec3 col = uColor * (0.75 + 0.25 * sin(vUv.x * 20.0 + uTime));
            gl_FragColor = vec4(col, 1.0);
          }`}),l=new bt(a,o);l.position.set(n.p[0]+.58,3.1,n.p[1]),l.rotation.y=D.range(0,3),this.scene.add(l),this.clothMats.push({mat:o,pole:r,phase:D.range(0,6)})}}update(t){this._t+=t;const e=this._t,i=this.windSprings,n=.5+.5*Math.sin(e*.11+1.7)*Math.sin(e*.031),r=Bt(Math.sin(e*.017)*.5+.5,0,1);i.x.target=.6+r*1.4+Math.sin(e*.5)*.15,i.z.target=.3*Math.sin(e*.07)+r*.5,i.gust.target=n*(.5+r),i.x.update(t),i.z.update(t),i.gust.update(t),this.wind.x=i.x.v,this.wind.z=i.z.v,this.wind.gust=i.gust.v;for(const l of this.clothMats)l.mat.uniforms.uTime.value=e,l.mat.uniforms.uWind.value=this.wind.gust,l.mat.uniforms.uKick.value=Xe(l.mat.uniforms.uKick.value,0,2.5,t);for(const l of this.floodlights){const c=Math.sin(e*.9+l.phase)*.012*(.3+this.wind.gust);l.group.rotation.z=c,l.group.rotation.x=Math.cos(e*.7+l.phase)*.01*(.3+this.wind.gust),l.light.intensity=24+Math.sin(e*2.2+l.phase)*3*(.4+this.wind.gust),l.cone.uniforms.uTime.value=e,l.cone.uniforms.uWind.value=.4+this.wind.gust,l.cone.uniforms.uSnow.value=.25+this.wind.gust*.8}for(let l=0;l<this.auroraMats.length;l++){const c=this.auroraMats[l];c.uniforms.uTime.value=e,c.uniforms.uWind.value=.3+this.wind.gust*.5}this.auroraMeshes&&this.auroraMeshes.forEach((l,c)=>{l.rotation.y+=t*(.004+.002*c)});const a=Math.sin(e*.02);this.auroraTint.intensity=.16+.1*Math.max(0,a),this.auroraTint.color.setHSL(.42+a*.04,.7,.45),this.skyMat.uniforms.uTime.value=e,this.iceMat&&(this.iceMat.uniforms.uTime.value=e);for(const l of this.ants)l.group.rotation.z=Math.sin(e*1.3+l.phase)*.01*(.4+this.wind.gust),l.group.rotation.x=Math.cos(e*1.1+l.phase)*.008*(.4+this.wind.gust);const o=this.groundMat.userData.shaderUniforms;o&&(this._groundPoolsPending&&(this.floodlights.forEach((l,c)=>o.uPools.value[c]?.set(l.baseX,0,l.baseZ)),o.uPoolN.value=this.floodlights.length,this._groundPoolsPending=!1),o.uTime.value=e,o.uCam.value.copy(this.game.camera.position))}kickCloth(t,e=1){for(const i of this.clothMats){const n=i.pole.position.distanceTo(t);n<6&&(i.mat.uniforms.uKick.value=Math.max(i.mat.uniforms.uKick.value,e*(1-n/6)*2))}}}class s0{constructor(t){this.game=t;const e=1600;this.N=e,this.pts=new Float32Array(e*3),this.sizes=new Float32Array(e),this.depths=new Float32Array(e),this.seed=new Float32Array(e*2);for(let r=0;r<e;r++)this._respawn(r,!0),this.sizes[r]=.5+Math.pow(D.next(),2.2)*2.4,this.depths[r]=D.next(),this.seed[r*2]=D.range(0,100),this.seed[r*2+1]=D.range(0,100);const i=new we;i.setAttribute("position",new Se(this.pts,3)),i.setAttribute("aSize",new Se(this.sizes,1)),i.setAttribute("aDepth",new Se(this.depths,1));const n=new se({uniforms:{uPixelScale:{value:1},uGust:{value:0}},vertexShader:`
        attribute float aSize; attribute float aDepth;
        uniform float uPixelScale;
        varying float vA;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float dist = -mv.z;
          gl_PointSize = aSize * uPixelScale * (0.5 + aDepth) / max(1.0, dist);
          vA = smoothstep(1.2, 3.0, dist) * (0.35 + aDepth * 0.65);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vA;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          float a = smoothstep(0.5, 0.05, length(c)) * vA;
          gl_FragColor = vec4(0.92, 0.96, 1.0, a * 0.85);
        }`,transparent:!0,depthWrite:!1,blending:gi});this.mat=n,this.points=new Ql(i,n),this.points.frustumCulled=!1,this.points.renderOrder=200,t.scene.add(this.points)}_respawn(t,e=!1){const i=this.game.camera.position,n=38,r=this.pts;if(e){r[t*3]=D.range(-30,30),r[t*3+1]=D.range(0,14),r[t*3+2]=D.range(-30,30);return}r[t*3]=i.x+D.range(-n,n),r[t*3+1]=i.y+D.range(2,16),r[t*3+2]=i.z+D.range(-n,n)}setPixelScale(t){this.mat.uniforms.uPixelScale.value=t}update(t,e,i){const n=this.game.wind;this.mat.uniforms.uGust.value=n.gust;const r=n.gust,a=n.x*(1.2+r*2.4),o=n.z*(1.2+r*2.4),l=1.5+r*1.2,c=this.pts;for(let h=0;h<this.N;h++){const u=.4+this.depths[h]*1.1,f=Math.sin(e*(1.2+this.depths[h])+this.seed[h*2])*.4;c[h*3]+=(a*u+f)*t,c[h*3+1]-=l*u*t,c[h*3+2]+=(o*u+Math.cos(e*(.9+this.depths[h])+this.seed[h*2+1])*.4)*t,(c[h*3+1]<i.y-4||Math.abs(c[h*3]-i.x)>38||Math.abs(c[h*3+2]-i.z)>38)&&this._respawn(h)}this.points.geometry.attributes.position.needsUpdate=!0}}class Os{constructor(t,e,i,n,r={}){this.mesh=new jl(i,n,e),this.mesh.instanceMatrix.setUsage(Qn),this.mesh.frustumCulled=!1,this.mesh.count=0,t.add(this.mesh),this.count=e,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.size=new Float32Array(e),this.spin=new Float32Array(e*3),this.rot=new Float32Array(e*3),this.gravity=r.gravity??0,this.bounce=r.bounce??0,this.drag=r.drag??0,this.onLand=r.onLand??null,this.cur=0,this.active=0,this._landed=new Uint8Array(e),this._zero=new Wt().makeScale(0,0,0),this._m=new Wt,this._q=new ge,this._s=new T,this._p=new T,this._e=new Te}spawn(t,e,i,n,r,a,o,l){const c=this.cur;this.cur=(this.cur+1)%this.count,this.pos.set([t,e,i],c*3),this.vel.set([n,r,a],c*3),this.life[c]=o,this.maxLife[c]=o,this.size[c]=l,this.rot[c*3]=D.range(0,6),this.rot[c*3+1]=D.range(0,6),this.rot[c*3+2]=D.range(0,6),this.spin.set([D.range(-8,8),D.range(-8,8),D.range(-8,8)],c*3)}get activeCount(){let t=0;for(let e=0;e<this.count;e++)this.life[e]>0&&t++;return t}update(t,e,i){let n=0;const r=this._m,a=this._q,o=this._s,l=this._p,c=this._e;for(let h=0;h<this.count;h++){if(this.life[h]<=0)continue;this.life[h]-=t;const u=h*3;if(this.life[h]<=0)continue;this.vel[u]+=(e*1.5-this.vel[u]*this.drag)*t,this.vel[u+1]+=(-this.gravity-this.vel[u+1]*this.drag)*t,this.vel[u+2]+=(i*1.5-this.vel[u+2]*this.drag)*t,this.pos[u]+=this.vel[u]*t,this.pos[u+1]+=this.vel[u+1]*t,this.pos[u+2]+=this.vel[u+2]*t;const f=be(this.pos[u],this.pos[u+2]),m=this.vel[u+1];this.pos[u+1]<f+.01&&m<0?(this.bounce>0&&-m>.8?(this.pos[u+1]=f+.01,this.vel[u+1]*=-this.bounce,this.vel[u]*=.6,this.vel[u+2]*=.6):(this.pos[u+1]=f+.01,this.vel[u+1]=0,this.vel[u]*=.8,this.vel[u+2]*=.8),this.onLand&&!this._landed[h]&&(this._landed[h]=1,this.onLand(this.pos[u],this.pos[u+1],this.pos[u+2]))):this.vel[u+1]>.1&&(this._landed[h]=0),this.rot[u]+=this.spin[u]*t,this.rot[u+1]+=this.spin[u+1]*t,this.rot[u+2]+=this.spin[u+2]*t,c.set(this.rot[u],this.rot[u+1],this.rot[u+2]),a.setFromEuler(c);const g=Bt(this.life[h]/this.maxLife[h],0,1);o.setScalar(this.size[h]*(.3+.7*g)),l.set(this.pos[u],this.pos[u+1],this.pos[u+2]),r.compose(l,a,o),this.mesh.setMatrixAt(n,r),n++}for(let h=n;h<this.count;h++)this.mesh.setMatrixAt(h,this._zero);this.mesh.count=this.count,this.mesh.instanceMatrix.needsUpdate=!0,this.active=n}reset(){this.life.fill(0),this.mesh.count=0,this.active=0,this.cur=0}dispose(t){t.remove(this.mesh),this.mesh.dispose()}}class Zr{constructor(t,e,i,n,r,a={}){this.count=e;const o=new we;o.setAttribute("position",new Se(new Float32Array(e*3),3).setUsage(Qn)),o.setAttribute("aLife",new Se(new Float32Array(e),1).setUsage(Qn)),o.setAttribute("aSize",new Se(new Float32Array(e),1).setUsage(Qn));const l=new se({transparent:!0,depthWrite:!1,blending:a.blend??gi,uniforms:{uSize:{value:i},uColor:{value:new Mt(n)},uOpacity:{value:r},uPixelScale:{value:1}},vertexShader:`
        attribute float aLife; attribute float aSize;
        uniform float uSize; uniform float uPixelScale;
        varying float vLife; varying float vSize;
        void main(){
          vLife = aLife; vSize = aSize;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aLife > 0.0 ? uSize * (1.0 + (1.0 - aLife) * aSize * 2.0) * uPixelScale * (160.0 / max(0.1, -mv.z)) : 0.0;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uColor; uniform float uOpacity;
        varying float vLife; varying float vSize;
        void main(){
          if (vLife <= 0.0) discard;
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.08, d) * vLife * uOpacity;
          gl_FragColor = vec4(uColor, a);
        }`});this.points=new Ql(o,l),this.points.frustumCulled=!1,t.add(this.points),this.pos=o.attributes.position.array,this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.grow=new Float32Array(e),this.sizeAttr=o.attributes.aSize.array,this.cur=0,this.active=0,this.gravity=a.gravity??0,this.drag=a.drag??0}spawn(t,e,i,n,r,a,o,l=1){const c=this.cur;this.cur=(this.cur+1)%this.count,this.pos.set([t,e,i],c*3),this.vel.set([n,r,a],c*3),this.life[c]=o,this.maxLife[c]=o,this.grow[c]=l}update(t,e,i){const n=this.pos,r=this.points.geometry.attributes;for(let o=0;o<this.count;o++){if(this.life[o]<=0){r.aLife.array[o]=0;continue}this.life[o]-=t;const l=o*3;if(this.life[o]<=0){r.aLife.array[o]=0;continue}this.vel[l]+=(e*2-this.vel[l]*this.drag)*t,this.vel[l+1]+=(-this.gravity-this.vel[l+1]*this.drag)*t,this.vel[l+2]+=(i*2-this.vel[l+2]*this.drag)*t,n[l]+=this.vel[l]*t,n[l+1]+=this.vel[l+1]*t,n[l+2]+=this.vel[l+2]*t,r.aLife.array[o]=this.life[o]/this.maxLife[o]}let a=0;for(let o=0;o<this.count;o++)this.life[o]>0&&a++;this.active=a,r.position.needsUpdate=!0,r.aLife.needsUpdate=!0}reset(){this.life.fill(0)}dispose(t){t.remove(this.points),this.points.geometry.dispose(),this.points.material.dispose()}}class r0{constructor(t){this.game=t;const e=t.scene;this._dummy=new re;const i=new ir(.016,0),n=new vi({color:16762477,blending:Qe,transparent:!0,depthWrite:!1});this.sparkPool=new Os(e,220,i,n,{gravity:9,bounce:.35,drag:.6});const r=new ir(.02,0),a=new vi({color:9374226});this.blood=new Os(e,160,r,a,{gravity:11,bounce:.25,drag:.8,onLand:(g,_,p)=>{this.decals&&this.decals.decalBlood(g,_,p,.35,.5)}});const o=new Rt(.05,.05,.05),l=new vi({color:9080729});this.debris=new Os(e,200,o,l,{gravity:9.5,bounce:.4,drag:.4}),this._debTint=new Mt;const c=new Rt(.012,.012,.03),h=new ce({color:13214247,metalness:.9,roughness:.3});this.shells=new Os(e,24,c,h,{gravity:9.8,bounce:.3,drag:.5,onLand:(g,_,p)=>{this.steamPuff(ac(g,_,p)),this.game.audio.tinkle(.15)}}),this.smoke=new Zr(e,220,.34,10134189,.34,{drag:2.2,gravity:-.35}),this.fireSmoke=new Zr(e,120,.5,2762276,.5,{drag:1.4,gravity:-1.2}),this.powder=new Zr(e,220,.09,15266047,.85,{drag:3.5,gravity:1.2,blend:gi}),this.tracers=[];const u=new ri(1,.02);u.translate(.5,0,0);for(let g=0;g<t.cfg.fx.tracerPool;g++){const _=new se({transparent:!0,depthWrite:!1,blending:Qe,side:Ne,uniforms:{uLife:{value:0},uColor:{value:new Mt(1,.85,.55)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
          uniform float uLife; uniform vec3 uColor; varying vec2 vUv;
          void main(){
            float core = smoothstep(0.5, 0.0, abs(vUv.y - 0.5)) * 1.6 + smoothstep(0.18, 0.0, abs(vUv.y - 0.5)) * 2.0;
            float tail = smoothstep(0.0, 1.0, vUv.x);
            gl_FragColor = vec4(uColor * core, (0.25 + 0.75 * tail) * uLife);
          }`}),p=new bt(u,_),d=new bt(u,_),y=new Oe;y.add(p,d),y.visible=!1,e.add(y),this.tracers.push({group:y,mat:_,life:0,max:1})}this.fireballs=[];const f=t0();for(let g=0;g<8;g++){const _=new va({map:f,color:16754237,blending:Qe,depthWrite:!1,transparent:!0}),p=new Kl(_);p.visible=!1,e.add(p),this.fireballs.push({s:p,mat:_,life:0,max:1})}this.rings=[];const m=new ya(.86,1,40);for(let g=0;g<5;g++){const _=new se({transparent:!0,depthWrite:!1,blending:Qe,side:Ne,uniforms:{uLife:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
          uniform float uLife; varying vec2 vUv;
          void main(){
            float d = length(vUv - 0.5) * 2.0;
            float a = smoothstep(1.0, 0.55, d) * smoothstep(0.2, 0.75, d) * uLife;
            gl_FragColor = vec4(vec3(1.0, 0.85, 0.6) * (1.2 + uLife), a * 0.8);
          }`}),p=new bt(m,_);p.visible=!1,e.add(p),this.rings.push({m:p,mat:_,life:0,max:.6})}this.muzzleLight=new Hs(16761722,0,14,2),e.add(this.muzzleLight),this.boomLight=new Hs(16751165,0,30,2),this.boomLight2=new Hs(16751165,0,30,2),e.add(this.boomLight,this.boomLight2),this.decals=new a0(t),this._muzzleFlash=null}tracer(t,e,i=null,n=!1){const r=this.tracers.find(l=>l.life<=0)??this.tracers[0];r.life=1,r.max=n?.16:.09;const a=new T().copy(e).sub(t),o=a.length();a.normalize(),r.group.visible=!0,r.group.position.copy(t),r.group.scale.set(o,1,1),r.group.lookAt(e),i&&r.mat.uniforms.uColor.value.set(i)}muzzleFX(t,e){this.muzzleLight.position.copy(t),this.muzzleLight.intensity=22;const i=this.game.wind;for(let n=0;n<3;n++)this.smoke.spawn(t.x+D.range(-.02,.02),t.y+D.range(0,.05),t.z+D.range(-.02,.02),e.x*1.5+D.gauss()*.4+i.x*.4,D.range(.2,.6)+i.z*.2,e.z*1.5+D.gauss()*.4+i.z*.4,D.range(.7,1.3),2.5)}shellEject(t,e,i){const n=i||new T().crossVectors(e,new T(0,1,0)).normalize();this.shells.spawn(t.x,t.y,t.z,n.x*D.range(1.5,2.6)+e.x,D.range(1.2,2.2)-e.y*.4,n.z*D.range(1.5,2.6)+e.z,D.range(1.6,2.4),1)}impactPowder(t,e){const i=this.game.wind,n=8+Math.floor(D.range(0,6));for(let r=0;r<n;r++){const a=D.range(0,Math.PI*2);this.powder.spawn(t.x,t.y+.02,t.z,Math.cos(a)*D.range(.5,2.2)+e.x*1.5+i.x*.8,D.range(.6,2.4)+e.y*1.5,Math.sin(a)*D.range(.5,2.2)+e.z*1.5+i.z*.8,D.range(.5,1.1),3)}e.y>.5&&this.decals.hole(t,e,.5,"dark")}sparks(t,e,i=10,n=16762477){for(let r=0;r<i;r++){const a=D.range(0,Math.PI*2),o=D.range(1.5,5);this.sparkPool.spawn(t.x,t.y,t.z,e.x*D.range(.5,3)+Math.cos(a)*o,e.y*D.range(.5,3)+Math.abs(Math.sin(a))*o*.7,e.z*D.range(.5,3)+Math.sin(a)*o,D.range(.25,.7),D.range(.5,1.4))}}woodSplinters(t,e){for(let i=0;i<7;i++){const n=D.range(0,Math.PI*2);this.debris.spawn(t.x,t.y,t.z,e.x*2+Math.cos(n)*D.range(1,3),e.y*2+Math.abs(Math.sin(n))*2,e.z*2+Math.sin(n)*D.range(1,3),D.range(.5,1),D.range(.6,1.6))}this.powder.spawn(t.x,t.y,t.z,e.x,.4,e.z,.4,2)}iceChips(t,e){for(let i=0;i<9;i++){const n=D.range(0,Math.PI*2);this.debris.spawn(t.x,t.y,t.z,e.x*2+Math.cos(n)*D.range(1.5,4),e.y*2+Math.abs(Math.sin(n))*2.5,e.z*2+Math.sin(n)*D.range(1.5,4),D.range(.6,1.1),D.range(.5,1.3))}this.decals.hole(t,e,.4,"ice")}bloodSpray(t,e,i,n=1,r=!1){const a=r?2.2:1,o=Math.floor(6*n*a),l=e;for(let c=0;c<o;c++){const h=D.range(0,Math.PI*2),u=D.range(1.2,4.5)*a*.8;this.blood.spawn(t.x+D.gauss()*.04,t.y+D.gauss()*.04,t.z+D.gauss()*.04,l.x*1.2+Math.cos(h)*u+i.x*1.5,l.y*1.2+Math.abs(Math.sin(h))*u*.6+i.y*1.5,l.z*1.2+Math.sin(h)*u+i.z*1.5,D.range(.35,.9),D.range(.6,1.6)*(r?1.4:1))}this.smoke.spawn(t.x,t.y,t.z,i.x,i.y,i.z,.35,1.6)}glassShards(t,e,i=!0){for(let n=0;n<10;n++){const r=D.range(0,Math.PI*2);this.debris.spawn(t.x,t.y,t.z,Math.cos(r)*D.range(1,3.5)+e.x,Math.sin(r)*D.range(.5,2.5)+e.y,Math.sin(r)*D.range(1,3.5)+e.z,D.range(.5,1.1),D.range(.7,1.6))}i&&this.fireSmoke.spawn(t.x,t.y,t.z,0,.5,0,.5,2)}tarpRip(t){this.powder.spawn(t.x,t.y,t.z,0,1.5,0,.5,4),this.powder.spawn(t.x,t.y,t.z,1.5,1,.5,.5,3)}explosion(t){const e=(this._boomIdx=((this._boomIdx??0)+1)%2)===0?this.boomLight:this.boomLight2;e.position.set(t.x,t.y+.8,t.z),e.intensity=260,e.life=.5;for(let n=0;n<3;n++){const r=this.fireballs.find(a=>a.life<=0)??this.fireballs[0];r.life=1,r.max=.5+D.range(0,.3),r.s.position.set(t.x+D.range(-.3,.3),t.y+D.range(.2,.8)+n*.3,t.z+D.range(-.3,.3)),r.s.scale.setScalar(1.2+n*.5),r.s.visible=!0,r.mat.color.setHSL(.08-n*.02,1,.55)}const i=this.rings.find(n=>n.life<=0)??this.rings[0];i.life=1,i.max=.6,i.m.position.set(t.x,t.y+.15,t.z),i.m.rotation.set(-Math.PI/2,0,0),i.m.visible=!0;for(let n=0;n<14;n++){const r=D.range(0,Math.PI*2);this.powder.spawn(t.x,t.y+.1,t.z,Math.cos(r)*D.range(4,9),D.range(.5,2.5),Math.sin(r)*D.range(4,9),D.range(.4,.9),3)}this.sparksBurst(t,22,16765066);for(let n=0;n<10;n++){const r=D.range(0,Math.PI*2);this.debris.spawn(t.x,t.y+.3,t.z,Math.cos(r)*D.range(2,6),D.range(2,6),Math.sin(r)*D.range(2,6),D.range(.8,1.6),D.range(.8,1.8))}for(let n=0;n<8;n++)this.fireSmoke.spawn(t.x,t.y+1,t.z,D.gauss(),D.range(1,2.5),D.gauss(),D.range(1.2,2.2),3.5);this.decals.scorch(t),this.game.post.setFlash(1),this.game.applyShake("explosion")}sparksBurst(t,e,i){for(let n=0;n<e;n++){const r=D.range(0,Math.PI*2),a=D.range(0,1.2);this.sparkPool.spawn(t.x,t.y+.2,t.z,Math.cos(r)*Math.cos(a)*D.range(3,8),Math.sin(a)*D.range(2,7),Math.sin(r)*Math.cos(a)*D.range(3,8),D.range(.4,1.1),D.range(.6,1.6))}}steamPuff(t){this.smoke.spawn(t.x,t.y+.05,t.z,D.gauss()*.3,D.range(.3,.7),D.gauss()*.3,.8,2.2)}breathFog(t,e){const i=this.game.wind;this.smoke.spawn(t.x+e.x*.4,t.y+e.y*.35+.05,t.z+e.z*.4,i.x*.5,.15,i.z*.5,1.4,2)}setMuzzleFlash(t){this._muzzleFlash=t}update(t,e){const i=this.game.wind;this.sparkPool.update(t,i.x,i.z),this.blood.update(t,i.x,i.z),this.debris.update(t,i.x,i.z),this.shells.update(t,i.x*.5,i.z*.5),this.smoke.update(t,i.x,i.z),this.fireSmoke.update(t,i.x,i.z),this.powder.update(t,i.x,i.z),this.decals.update(e);for(const n of this.tracers){if(n.life<=0){n.group.visible&&(n.group.visible=!1);continue}n.life-=t/n.max,n.mat.uniforms.uLife.value=Math.max(0,n.life),n.life<=0&&(n.group.visible=!1)}for(const n of this.fireballs)n.life<=0||(n.life-=t/n.max,n.s.scale.multiplyScalar(1+t*2.2),n.mat.opacity=Math.max(0,n.life),n.life<=0&&(n.s.visible=!1));for(const n of this.rings){if(n.life<=0)continue;n.life-=t/n.max;const r=1+(1-n.life)*7;n.m.scale.set(r,r,r),n.mat.uniforms.uLife.value=n.life*n.life,n.life<=0&&(n.m.visible=!1)}this.muzzleLight.intensity=Math.max(0,this.muzzleLight.intensity-t*500),this.boomLight.intensity>0&&(this.boomLight.intensity=Math.max(0,this.boomLight.intensity-t*600)),this.boomLight2.intensity>0&&(this.boomLight2.intensity=Math.max(0,this.boomLight2.intensity-t*600))}reset(){for(const t of[this.sparkPool,this.blood,this.debris,this.shells])t.reset();this.smoke.reset(),this.fireSmoke.reset(),this.powder.reset();for(const t of this.tracers)t.life=0,t.group.visible=!1;for(const t of this.fireballs)t.life=0,t.s.visible=!1;for(const t of this.rings)t.life=0,t.m.visible=!1;this.muzzleLight.intensity=0,this.boomLight.intensity=0,this.boomLight2.intensity=0,this.decals.clear()}totalParticles(){return this.sparkPool.active+this.blood.active+this.debris.active+this.shells.active+this.smoke.active+this.fireSmoke.active+this.powder.active}}class a0{constructor(t){this.scene=t.scene,this.budget=t.cfg.fx.decalCap;const e=new ri(1,1);e.rotateX(-Math.PI/2),this.types={blood:{mat:this._mat(dl(1),-1.5),next:0},hole:{mat:this._mat(jr(),-2),next:0},ice:{mat:this._mat(jr(),-2,10475775),next:0},scorch:{mat:this._mat(e0(),-1),next:0},dark:{mat:this._mat(jr(),-1.5,5593696),next:0},pool:{mat:this._mat(dl(2),-1),next:0}};for(const i of Object.keys(this.types)){const n=this.types[i];n.mesh=new jl(e,n.mat,this.budget),n.mesh.instanceMatrix.setUsage(Qn),n.mesh.frustumCulled=!1,n.mesh.count=0,this.scene.add(n.mesh),n.count=0,n._m=new Wt,n._q=new ge,n._up=new T,n._n=new T,n._s=new T}this._dummy=new re}_mat(t,e,i=null){const n=new vi({map:t,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:e,polygonOffsetUnits:-1});return i&&n.color.set(i),n}add(t,e,i,n,r=0){const a=this.types[t];if(!a)return;const o=a.next++,l=o%this.budget,c=a._q.setFromUnitVectors(a._up.set(0,1,0),a._n.copy(i).normalize()),h=a._s.setScalar(Math.max(.05,n));this._dummy.position.copy(e).addScaledVector(i,.012+o%5*.0015),this._dummy.rotation.set(0,r,0),this._dummy.quaternion.copy(c).multiply(this._dummy.quaternion),this._dummy.scale.copy(h),this._dummy.updateMatrix(),a.mesh.setMatrixAt(l,this._dummy.matrix),a.count=Math.min(this.budget,a.next),a.mesh.count=a.count,a.mesh.instanceMatrix.needsUpdate=!0}blood(t,e,i,n=.6,r=null){this.add("blood",{x:t,y:e,z:i},r??{x:0,y:1,z:0},n,D.range(0,6))}decalBlood(t,e,i,n=.5,r=1){this.add("blood",ac(t,e,i),o0,n,D.range(0,6))}hole(t,e,i,n="hole"){this.add(n,t,e,i,D.range(0,6))}scorch(t){this.add("scorch",t,{x:0,y:1,z:0},2.4+D.range(0,1.2),D.range(0,6))}pool(t,e){this.add("pool",t,e,1.2+D.range(0,.8),D.range(0,6))}clear(){for(const t of Object.keys(this.types)){const e=this.types[t];e.count=0,e.next=0,e.mesh.count=0,e.mesh.instanceMatrix.needsUpdate=!0}}update(){}count(){let t=0;for(const e of Object.keys(this.types))t+=this.types[e].count;return t}}const ac=(s,t,e)=>({x:s,y:t,z:e}),o0={x:0,y:1,z:0};class l0{constructor(t){this.game=t,this.ctx=null,this.ready=!1}init(){if(this.ready)return;const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e;const i=e.createGain();i.gain.value=.85;const n=e.createWaveShaper(),r=new Float32Array(1024);for(let o=0;o<1024;o++){const l=o/511.5-1;r[o]=Math.tanh(l*2.2)/Math.tanh(2.2)}n.curve=r,i.connect(n).connect(e.destination),this.master=i;const a=o=>{const l=e.createGain();return l.gain.value=o,l.connect(i),l};this.sfx=a(.9),this.musicBus=a(.5),this.ambientBus=a(.5),this._noiseBuf=this._makeNoise(2),this.ready=!0,this._wind(),this._generator(),this._hbTimer=0}_makeNoise(t){const e=this.ctx,i=e.createBuffer(1,e.sampleRate*t,e.sampleRate),n=i.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=Math.random()*2-1;return i}_noiseSource(t,e,i){const n=this.ctx,r=n.createBufferSource();r.buffer=this._noiseBuf,r.loop=!0;const a=n.createBiquadFilter();a.type=e,a.frequency.value=i;const o=n.createGain();return o.gain.value=t,r.connect(a).connect(o),{src:r,f:a,g:o}}_wind(){const{ctx:t}=this,{src:e,f:i,g:n}=this._noiseSource(0,"lowpass",400);n.connect(this.ambientBus),e.start(),this._windG=n,this._windF=i}_generator(){const{ctx:t}=this,e=t.createOscillator();e.type="sawtooth",e.frequency.value=55;const i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=160;const n=t.createGain();n.gain.value=.016,e.connect(i).connect(n).connect(this.ambientBus),e.start()}resume(){this.ctx?.state==="suspended"&&this.ctx.resume()}suspend(){this.ctx?.state==="running"&&this.ctx.suspend()}setWind(t,e){if(!this.ready)return;const i=this.ctx.currentTime;this._windG.gain.setTargetAtTime(.05+t*.14,i,.4),this._windF.frequency.setTargetAtTime(300+t*900,i,.4)}_tone(t,e,i,n,r,a,o=0){const l=this.ctx,c=l.currentTime+o,h=l.createOscillator();h.type=t,h.frequency.setValueAtTime(Math.max(1,e),c),i!==e&&h.frequency.exponentialRampToValueAtTime(Math.max(1,i),c+n);const u=l.createGain();u.gain.setValueAtTime(r,c),u.gain.exponentialRampToValueAtTime(8e-4,c+n),h.connect(u).connect(a||this.sfx),h.start(c),h.stop(c+n+.02)}_noise(t,e,i,n,r=1,a,o=0){const l=this.ctx,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this._noiseBuf;const u=l.createBiquadFilter();u.type=i,u.frequency.value=n,u.Q.value=r;const f=l.createGain();f.gain.setValueAtTime(e,c),f.gain.exponentialRampToValueAtTime(8e-4,c+t),h.connect(u).connect(f).connect(a||this.sfx),h.start(c),h.stop(c+t+.02)}gunshot(t=0){if(!this.ready)return;const e=1-t*.75;this._noise(.03,.5*e,"highpass",2500),this._tone("sine",110,32,.13,.9*e),this._noise(.3,.12*e,"lowpass",900),this.game.music?.duck(.6,.25)}enemyShot(t){if(!this.ready)return;const e=(1-t)*.8;e<=.05||(this._noise(.04,.3*e,"highpass",3e3),this._tone("triangle",180,60,.1,.4*e),this._noise(.25,.1*e,"lowpass",800))}nearMiss(t){if(!this.ready)return;const e=1-t*1.2;e<=0||(this._noise(.12,.4*e,"highpass",1400),this._tone("sine",700*(1-t*.5),120,.1,.25*e))}hitTick(t=!1){this.ready&&this._tone("square",t?1250:850,t?1250:800,.05,t?.3:.22)}killThock(){this.ready&&(this._tone("square",220,140,.06,.3),this._tone("sine",90,50,.16,.5))}dryFire(){this.ready&&(this._noise(.02,.35,"highpass",3500),this._tone("square",1600,1200,.03,.18))}reloadStart(t){this.ready&&(this._tone("square",900,500,.05,.25,this.sfx,0),t&&this._tone("square",700,450,.05,.2,this.sfx,.12),this._noise(.08,.2,"bandpass",2e3,3,this.sfx,.16))}magSlam(){this.ready&&(this._tone("sine",130,60,.08,.6),this._noise(.05,.4,"lowpass",500))}chargeRack(){this.ready&&(this._tone("square",1100,900,.04,.2),this._tone("square",900,700,.05,.2,this.sfx,.09))}reloadEnd(){this.ready&&this._tone("square",1300,1e3,.04,.22)}whoosh(t=1){this.ready&&this._noise(.18,.12*t,"bandpass",900,1.5)}jump(){this.ready&&this._noise(.12,.14,"lowpass",700)}land(t){this.ready&&(this._tone("sine",90,40,.12,.5*t),this._noise(.15,.25*t,"lowpass",500))}slide(t=!0){this.ready&&t&&this._noise(.7,.22,"highpass",1800,.5)}explosion(t=0){if(!this.ready)return;const e=Math.max(.2,1-t*.55);this._noise(.9,.8*e,"lowpass",300+(1-t)*600),this._tone("sine",100,28,.5,.9*e),this._noise(.25,.5*e,"highpass",1200),this._noise(1.4,.2*e,"bandpass",2400,2,this.sfx,.15)}glass(){if(this.ready)for(let t=0;t<4;t++)this._noise(.1,.18,"highpass",5e3+D.range(0,3e3),4,this.sfx,D.range(0,.2))}tinkle(t=.3){this.ready&&this._tone("sine",D.range(2800,4200),0,.08,t*.5)}multikill(t){if(!this.ready)return;const e=320+t*40;this._tone("sawtooth",e,e*1.5,.16,.3),this._tone("sawtooth",e*1.25,e*1.75,.16,.2,this.sfx,.08)}waveStart(){this.ready&&(this._tone("sine",220,110,.5,.4),this._tone("sawtooth",110,110,.7,.12,this.sfx,.1))}overdrive(){if(this.ready)for(let t=0;t<5;t++)this._tone("sawtooth",400+t*120,800+t*140,.25,.16,this.sfx,t*.06)}flinch(){this.ready&&this._noise(.08,.3,"lowpass",300)}armorBreak(){this.ready&&(this._noise(.1,.4,"bandpass",1500,3),this._tone("square",300,100,.12,.3))}heartbeat(t,e){if(this.ready&&!(t>30)&&(this._hbTimer-=e,this._hbTimer<=0)){const i=1.2-(30-t)*.02;this._hbTimer=Math.max(.45,i);const n=.25+(30-t)*.008;this._tone("sine",55,40,.14,n),this._tone("sine",50,38,.12,n*.7,this.sfx,.25)}}}class c0{constructor(t,e){this.game=t,this.audio=e,this.step=0,this.bpm=92,this.intensity=0,this.level=0,this._nextNote=0,this._timer=null,this._duckGain=null,this._duck=1,this._started=!1,this._padNodes=[]}start(){this._started||!this.audio.ready||(this._started=!0,this._duckGain=this.audio.ctx.createGain(),this._duckGain.gain.value=1,this._duckGain.connect(this.audio.musicBus),this._nextNote=this.audio.ctx.currentTime+.1,this._timer=setInterval(()=>this._schedule(),50),this._pad())}stop(){this._started=!1,this._timer&&clearInterval(this._timer),this._timer=null;for(const t of this._padNodes)try{t.stop()}catch{}this._padNodes=[]}_pad(){const t=this.audio.ctx,e=t.createGain();e.gain.value=.05;const i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=400;const n=[55,82.4,110.5];for(const r of n)for(const a of[-6,6]){const o=t.createOscillator();o.type="sawtooth",o.frequency.value=r,o.detune.value=a,o.connect(i),o.start(),this._padNodes.push(o)}i.connect(e).connect(this._duckGain),this._padGain=e}duck(t=.6,e=.3){if(!this._duckGain||!this.audio.ready)return;const i=this.audio.ctx.currentTime,n=this._duckGain.gain;n.cancelScheduledValues(i),n.setTargetAtTime(t,i,.03),n.setTargetAtTime(1,i+e,.15)}update(t){const e=this.game;if(!this._started)return;const i=e.enemies?e.enemies.activeCount():0;let n=.15;e.state==="playing"&&(n=Math.min(1,.25+(e.waveNumber-1)*.09+i*.05+(e.action.overdriveActive?.3:0)+(e.action.combo>=3?.15:0))),this.bpm=92+this.level*34,this.level+=(n-this.level)*Math.min(1,t*.8)}_schedule(){const t=this.audio.ctx,e=60/this.bpm/4;for(;this._nextNote<t.currentTime+.12;)this._playStep(this.step,this._nextNote),this._nextNote+=e,this.step=(this.step+1)%32}_playStep(t,e){const i=this.audio.ctx,n=this._duckGain,r=this.level,a=Math.floor(t/8)%2;if(this._padGain&&this._padGain.gain.setTargetAtTime(.04+r*.045,e,.5),r>.25&&t%2===1){const o=i.createOscillator();o.type="sawtooth";const l=[55,55,58.3,55,55,51.9,55,49];o.frequency.value=l[(Math.floor(t/2)+a*3)%8]*(a===1?.5:1);const c=i.createBiquadFilter();c.type="lowpass",c.frequency.value=220+r*500;const h=i.createGain();h.gain.setValueAtTime(.16*r,e),h.gain.exponentialRampToValueAtTime(.001,e+.16),o.connect(c).connect(h).connect(n),o.start(e),o.stop(e+.2)}if(r>.45&&(t%4===0||t%4===2&&r>.75)){const o=i.createOscillator();o.type="sine",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(38,e+.12);const l=i.createGain();l.gain.setValueAtTime(.5*Math.min(1,r+.2),e),l.gain.exponentialRampToValueAtTime(.001,e+.22),o.connect(l).connect(n),o.start(e),o.stop(e+.25)}if(r>.6&&t%2===1&&D.next()>.35){const o=i.createBufferSource();o.buffer=this.audio._noiseBuf;const l=i.createBiquadFilter();l.type="highpass",l.frequency.value=8e3;const c=i.createGain();c.gain.setValueAtTime(.08*r,e),c.gain.exponentialRampToValueAtTime(.001,e+.04),o.connect(l).connect(c).connect(n),o.start(e,D.range(0,1)),o.stop(e+.06)}}}const h0=new T(0,1,0),fl=new T(0,0,-1),zs=new T,Qr=new ge,pl=new ge,u0=new T(0,0,1),Wi=new T;function d0(s,t,e,i=.1,n=0){Jr.copy(s.rearSightAnchor.position),zs.copy(s.frontSightAnchor.position).sub(s.rearSightAnchor.position).normalize(),zs.lengthSq()<1e-8&&zs.copy(fl),Qr.setFromUnitVectors(zs,fl),Wi.copy(h0).applyQuaternion(Qr),Wi.z=0,Wi.lengthSq()<1e-8&&Wi.set(0,1,0),Wi.normalize();let r=Math.atan2(Wi.x,Wi.y);return r>Math.PI&&(r-=Math.PI*2),pl.setFromAxisAngle(u0,-r+n),e.copy(pl).multiply(Qr),Jr.applyQuaternion(e),t.set(0,0,-i).sub(Jr),{pos:t,quat:e}}const Jr=new T,ml=new Wt,Ai=new ne,We=new T;function Bs(s,t,e,i){return ml.copy(t.projectionMatrix).multiply(t.matrixWorldInverse),Ai.set(s.x,s.y,s.z,1).applyMatrix4(ml),Ai.w<=1e-6||Ai.z/Ai.w>1?!1:(i.x=(Ai.x/Ai.w*.5+.5)*e.width,i.y=(-Ai.y/Ai.w*.5+.5)*e.height,!0)}function f0(s){const{camera:t,viewport:e,fov:i,log:n=console.log}=s,r=s.weapon.root??s.weapon;t.fov=i,t.updateProjectionMatrix(),t.updateMatrixWorld(!0),r.updateMatrixWorld(!0);const a=e.width/2,o=e.height/2,l=[],c=new T;t.getWorldPosition(c);const h=new T(0,0,-1).applyQuaternion(t.quaternion).normalize(),u=new ic(c,h,.1,600);u.camera=t;const f=u.intersectObject(s.raycastScene??t.parent?.scene??s.scene,!0).filter(V=>!V.object.userData.noGunRay);let m=!1;const g=new Ue(t.fov,t.aspect,.01,1e6);if(g.position.copy(c),g.quaternion.copy(t.quaternion),g.updateMatrixWorld(!0),f.length)if(Bs(f[0].point,g,e,We)){const V=Math.hypot(We.x-a,We.y-o);m=V<=1;const st=f[0].point;n(`[ADS-TEST fov=${i}] 1. ray alignment: real hit (${st.x.toFixed(2)},${st.y.toFixed(2)},${st.z.toFixed(2)}) → screen (${We.x.toFixed(1)}, ${We.y.toFixed(1)}), ${V.toFixed(2)}px → ${m?"PASS":"FAIL"}`)}else n(`[ADS-TEST fov=${i}] 1. ray alignment: FAIL (hit behind camera)`);else We.copy(c).addScaledVector(h,100),Bs(We,g,e,We),m=Math.hypot(We.x-a,We.y-o)<=1,n(`[ADS-TEST fov=${i}] 1. ray alignment (no hit, virtual 100 m): (${We.x.toFixed(1)}, ${We.y.toFixed(1)}) → ${m?"PASS":"FAIL"}`);const _=new T,p=new T,d=new T,y=new T;r.frontSightAnchor.getWorldPosition(_),r.rearSightAnchor.getWorldPosition(p);const v=Bs(_,t,e,d),S=Bs(p,t,e,y);let P=!1;if(v&&S){const V=Math.hypot(d.x-a,d.y-o),st=Math.hypot(y.x-a,y.y-o),ut=Math.hypot(d.x-y.x,d.y-y.y);P=V<=2&&st<=2&&ut<=2,n(`[ADS-TEST fov=${i}] 2. sight projection: front ${V.toFixed(2)}px, rear ${st.toFixed(2)}px, sep ${ut.toFixed(2)}px → ${P?"PASS":"FAIL"}`)}else n(`[ADS-TEST fov=${i}] 2. sight projection: FAIL (anchor behind camera) ${v?"front":""}${S?" rear":""}`);const E=new T;r.rearSightAnchor.getWorldPosition(E);const A=h,I=c,b=Math.max(0,A.dot(E.clone().sub(I))),x=Math.tan(oo.degToRad(8));let R=null,B=!1,k=0;const W=new T,Y=new T;r.traverse(V=>{if(!V.isMesh||!V.geometry?.getAttribute("position"))return;const st=V.geometry.getAttribute("position"),ut=V.userData.part??"weapon";for(let ft=0;ft<st.count;ft++){W.fromBufferAttribute(st,ft).applyMatrix4(V.matrixWorld),Y.copy(W).sub(I);const Ct=A.dot(Y);if(ut.startsWith("stock")&&Ct<=0&&(B=!0),Ct>0&&Ct<b-1e-4){const qt=Math.sqrt(Math.max(0,Y.lengthSq()-Ct*Ct));if(qt/Ct<x){const X=oo.radToDeg(Math.atan2(qt,Ct));(!R||X<R.deg)&&(R={name:ut,deg:X})}}k++}});const G=!!B&&!R;n(R?`[ADS-TEST fov=${i}] 3. clearance: FAIL — part "${R.name}" at ${R.deg.toFixed(2)}° (< 8°)`:B?`[ADS-TEST fov=${i}] 3. sight-line clearance: ${k} vertices clear of ±8° cone, stock behind → PASS`:`[ADS-TEST fov=${i}] 3. clearance: FAIL — stock not behind camera`);const K=m&&P&&G;return n(`[ADS-TEST fov=${i}] TOTAL: ${K?"PASS":"FAIL"}`),l.push({fov:i,pass:K}),{pass:K,results:l}}class p0{constructor(t){this.game=t,this.cfg=t.cfg.weapon,this.root=new Oe,this.root.name="viewmodel",this._build(),this.rearSightAnchor=new re,this.rearSightAnchor.position.set(0,.075,.065),this.frontSightAnchor=new re,this.frontSightAnchor.position.set(0,.075,-.05),this.muzzleAnchor=new re,this.muzzleAnchor.position.set(0,.01,-.585),this.root.add(this.rearSightAnchor,this.frontSightAnchor,this.muzzleAnchor),this.root.rearSightAnchor=this.rearSightAnchor,this.root.frontSightAnchor=this.frontSightAnchor,this.root.muzzleAnchor=this.muzzleAnchor,this.poseAds={pos:new T,quat:new ge},d0(this.root,this.poseAds.pos,this.poseAds.quat,this.cfg.eyeRelief,0);const e=(i,n,r,a=-.1,o=.05,l=.07)=>({pos:new T(i,n,r),quat:new ge().setFromEuler(new Te(a,o,l,"XYZ"))});this.poses={stand:e(.17,-.13,-.12),crouch:e(.15,-.155,-.11,-.13,.05,.06),tac:e(.03,-.16,-.15,-.05,0,.11),slide:e(.2,-.175,-.09,-.16,.05,.15),wall:e(.23,-.12,-.11,-.18,.38,.18)},this.adsT=0,this.adsTarget=0,this.mag=this.cfg.magSize,this.reserve=1/0,this.reloading=!1,this.inspecting=!1,this.fireCooldown=0,this.dryClickTimer=0,this.heat=0,this.recoilPattern=this._buildPattern(),this.shotIndex=0,this._basePos=new T,this._baseQuat=new ge,this._offPos=new T,this._offQuat=new ge,this._outPos=new T,this._outQuat=new ge,this._adsBlendPos=new T,this._adsBlendQuat=new ge,this.kickZ=new he(0,320,1.1),this.kickX=new he(0,260,1),this.kickY=new he(0,260,1),this.swayX=new he(0,60,1),this.swayY=new he(0,60,1),this.swayZ=new he(0,60,1),this.bobPhase=0,this.reloadT=0,this.inspectT=0,this.landDip=new he(0,160,1.4),this._reloadTime=this.cfg.reloadTime,this._reloadTactical=!1}_buildPattern(){const t=[];for(let e=0;e<32;e++){const i=1+e*.16;t.push({pitch:(.011+.004*D.range(0,1))*i,yaw:.006*D.gauss()*(e%4<2?1:-1)*(.7+e*.05)})}return t}_build(){const t=new ce({map:Zn("#2b2e33"),roughness:.55,metalness:.75}),e=new ce({color:1908516,roughness:.6,metalness:.6}),i=new ce({map:sc(),roughness:.8,metalness:0}),n=(h,u,f,m,g,_=0,p=0,d=0,y="body")=>{const v=new bt(h,u);return v.position.set(f,m,g),v.rotation.set(_,p,d),v.userData.part=y,this.root.add(v),v};n(new Rt(.07,.075,.26),t,0,.008,.03,0,0,0,"receiver"),n(new Rt(.022,.016,.05),e,0,.055,-.045,0,0,0,"optic"),n(new Rt(.022,.016,.05),e,0,.055,.045,0,0,0,"optic");const r=n(new si(.024,.024,.13,12).rotateX(Math.PI/2),e,0,.062,0,0,0,0,"optic");r.material=new ce({color:1316378,roughness:.35,metalness:.8});const a=new vi({color:8956671,transparent:!0,opacity:.14,depthWrite:!1});n(new Rt(.02,.02,.001),a,0,.062,.062,0,0,0,"optic"),n(new Rt(.02,.02,.001),a,0,.062,-.052,0,0,0,"optic");const o=new Kl(new va({map:Jm(),color:16726832,blending:Qe,depthWrite:!1}));o.scale.setScalar(.0045),o.position.set(0,.062,-.05),o.userData.part="optic",this.root.add(o),this.dot=o,n(new si(.013,.013,.27,10).rotateX(Math.PI/2),t,0,.01,-.4,0,0,0,"barrel"),this.muzzleBrake=n(new si(.019,.015,.07,10).rotateX(Math.PI/2),new ce({color:2566704,roughness:.4,metalness:.85,emissive:0}),0,.01,-.565,0,0,0,"barrel"),n(new Rt(.062,.062,.22),t,0,-.004,-.19,0,0,0,"handguard"),n(new Rt(.05,.07,.18),e,0,.004,.24,0,0,0,"stock"),n(new Rt(.056,.115,.035),e,0,-.002,.352,0,0,0,"stock"),n(new Rt(.036,.09,.045),i,0,-.062,.085,.25,0,0,"grip"),this.magMesh=n(new Rt(.05,.16,.075),e,0,-.115,0,.2,0,0,"mag"),n(new Rt(.04,.08,.045),i,0,-.055,-.21,-.15,0,0,"grip"),this.chargingHandle=n(new Rt(.016,.012,.05),t,0,.052,.145,0,0,0,"receiver");const l=new ce({color:2895670,roughness:.9,metalness:0});n(new Rt(.06,.075,.11),l,0,-.052,.085,.3,0,-.1,"hand").scale.set(1,1,1),n(new Rt(.055,.07,.11),l,0,-.045,-.205,-.25,0,.1,"hand"),this.magSpare=n(new Rt(.05,.16,.075),e,-.16,-.34,-.05,0,0,0,"mag"),this.magSpare.visible=!1,this.magEject=this.magMesh.clone(),this.magEject.visible=!1,this.root.add(this.magEject),this.shimmer=this._makeShimmer(),this.shimmerMat=this.shimmer.material,this.root.add(this.shimmer)}_makeShimmer(){const t=new ri(.16,.34,1,1),e=new se({transparent:!0,depthWrite:!1,blending:Qe,uniforms:{uTime:{value:0},uHeat:{value:0}},vertexShader:`
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.x += sin(uTime * 9.0 + position.y * 30.0) * 0.004 * smoothstep(0.2, 1.0, uv.y);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,fragmentShader:`
        uniform float uTime; uniform float uHeat;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43741.5); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
          return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
        }
        void main() {
          vec2 q = vUv * vec2(3.0, 7.0);
          q.y -= uTime * 2.2;
          float n = noise(q) * 0.6 + noise(q * 2.1 + 13.7) * 0.4;
          float a = n * uHeat * 0.5 * smoothstep(0.0, 0.35, vUv.y) * (1.0 - smoothstep(0.6, 1.0, vUv.y));
          a *= 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 37.0 + vUv.x * 20.0));
          gl_FragColor = vec4(vec3(1.0, 0.95, 0.88) * a, a);
        }`}),i=new bt(t,e);return i.position.set(0,.05,-.42),i.renderOrder=50,i.visible=!1,i}setAds(t){this.adsTarget=t?1:0}get reloadingNow(){return this.reloading}get inspectingNow(){return this.inspecting}startReload(){return this.reloading||this.inspecting||this.mag>=this.cfg.magSize?!1:(this._reloadTactical=this.mag>0,this._reloadTime=this.game.action.overdriveActive?this.cfg.reloadOverdrive:this.cfg.reloadTime,this.reloading=!0,this.reloadT=0,this.magSpare.visible=!0,this.magSpare.position.set(-.17,-.36,-.05),this.magEject.visible=this.mag===0,this.magEject.visible&&(this.magEject.position.copy(this.magMesh.position),this._ejectVel=new T(-2.2,.6,-1.2),this._ejectSpin=new T(D.range(-8,8),D.range(-8,8),D.range(-8,8))),this.game.audio.reloadStart(this._reloadTactical),!0)}tryFire(){if(this.reloading||this.inspecting||this.fireCooldown>0)return null;if(this.mag<=0)return this.dryClickTimer-=this.game.dtSim,this.dryClickTimer<=0&&(this.dryClickTimer=.3,this.game.audio.dryFire(),this.game.enemies.onPlayerDryFire(),this.startReload()),null;const t=60/this.cfg.rpm;this.fireCooldown=t,this.mag--,this.heat=Bt(this.heat+.055,0,1);const e=this.shotIndex%30===0?1.7:1,i=this.recoilPattern[this.shotIndex%this.recoilPattern.length];return this.shotIndex++,this.kickZ.kick(.05*e),this.kickX.kick(-.09*e),this.kickY.kick(.05*D.gauss()*e),this.game.applyRecoil(i.pitch*e,i.yaw*e),this.mag===0&&this.startReload(),i}update(t,e){const i=t,{crouch:n,slide:r,tac:a,sprint:o,moving:l,mouseVel:c,wallBump:h,lean:u}=e;this.fireCooldown=Math.max(0,this.fireCooldown-i),this.heat=Math.max(0,this.heat-.3*i),this.shimmerMat.uniforms.uHeat.value=this.heat,this.shimmerMat.uniforms.uTime.value=this.game.time,this.shimmer.visible=this.heat>.15,this.muzzleBrake.material.emissive.setRGB(this.heat*.5,this.heat*.15,0),this.dot.material.color.setRGB(1,.2+this.heat*.5,.16);const f=this.adsT,m=this.adsTarget;if(Math.abs(m-this.adsT)>1e-4){const d=m>this.adsT?1:-1;this.adsT=Bt(this.adsT+d*i/this.cfg.adsTime,0,1)}else this.adsT=m;this.adsEase=Vs(this.adsT),f<.001&&this.adsT>=.001&&this.game.audio.whoosh(.5),f>.999&&this.adsT<=.999&&this.game.audio.whoosh(.35);const g=this.root.parent?r?this.poses.slide:a?this.poses.tac:h?this.poses.wall:n?this.poses.crouch:this.poses.stand:this.poses.stand;if(this._basePos.copy(g.pos),this._baseQuat.copy(g.quat),this._offPos.set(0,0,0),this._offQuat.identity(),l&&!n&&!r){const d=e.speed,y=Bt((d-.5)/5,0,1.2);this.bobPhase+=i*d*2.2;const v=Math.sin(this.bobPhase*2)*.008*y,S=Math.sin(this.bobPhase)*.006*y;this._offPos.x+=S,this._offPos.y+=v,this._offQuat.setFromEuler(new Te(Math.sin(this.bobPhase*2)*.01*y,Math.sin(this.bobPhase)*.008*y,0))}a&&l&&(this._offPos.y-=Math.max(0,Math.sin(this.bobPhase*2))*.02,this._offPos.z-=.015);const _=.05*(1-this.adsEase*.92);if(this.swayX.target=Bt(c.y*_,-.05,.05),this.swayY.target=Bt(c.x*_,-.05,.05),this.swayZ.target=-u*.18,this.swayX.update(i),this.swayY.update(i),this.swayZ.update(i),this._offQuat.multiply(new ge().setFromEuler(new Te(this.swayX.v,this.swayY.v,this.swayZ.v,"XYZ"))),this.kickX.update(i),this.kickY.update(i),this.kickZ.update(i),this._offPos.z+=this.kickZ.v*.4,this._offPos.y+=this.kickX.v*.35,this._offQuat.multiply(new ge().setFromEuler(new Te(this.kickX.v,this.kickY.v,0,"XYZ"))),this.landDip.update(i),this._offPos.y+=this.landDip.v,Math.abs(u)>.02&&this._offQuat.multiply(new ge().setFromAxisAngle(new T(0,0,1),-u*.22)),this.reloading){const d=this._reloadTime;this.reloadT+=i;const y=this.reloadT,v=Kr(y,d*.35),S=Kr(y,d*.35,d*.8),P=Kr(y,d*.2,d),E=Math.sin(Fs(v)*Math.PI)*-.05,A=Fs(v)*-.28;if(this._offPos.y+=E,this._offQuat.multiply(new ge().setFromAxisAngle(new T(0,0,1),A*.6)),this.game.addTempRoll(A*.35*(1-S)*-1,i),this.magEject.visible?(this._ejectVel.y-=9.8*i,this.magEject.position.addScaledVector(this._ejectVel,i),this.magEject.rotation.x+=this._ejectSpin.x*i,this.magEject.rotation.y+=this._ejectSpin.y*i,this.magEject.position.x<-.5&&(this.magEject.visible=!1)):this.magMesh.position.y=-.115+Fs(v)*-.03+Fs(S)*.03,this.magSpare.visible){const I=Vs(Bt((y-d*.25)/(d*.55),0,1));this.magSpare.position.set(Qi(-.17,this.magMesh.position.x,I),Qi(-.36,this.magMesh.position.y,I)-.02*Math.max(0,1-I*3),Qi(-.05,this.magMesh.position.z,I)),I>=1&&!this._magSlammed&&(this._magSlammed=!0,this.game.audio.magSlam(),this.kickZ.kick(.02),this.magMesh.visible=!0,this.magSpare.visible=!1)}if(this._reloadTactical)this.chargingHandle.position.z=.145;else{const I=Vs(P);this.chargingHandle.position.z=.145+Math.sin(I*Math.PI)*.035,P>=1&&!this._handleFlicked&&(this._handleFlicked=!0,this.game.audio.chargeRack())}y>=d&&(this.reloading=!1,this._magSlammed=!1,this._handleFlicked=!1,this.mag=this.cfg.magSize,this.magMesh.position.set(0,-.115,0),this.magEject.visible=!1,this.magSpare.visible=!1,this.game.audio.reloadEnd())}if(this.inspecting){this.inspectT+=i;const d=Bt(this.inspectT/1.4,0,1),y=Math.sin(d*Math.PI);this._offQuat.multiply(new ge().setFromEuler(new Te(-.3*y,.55*y,-.25*y,"XYZ"))),this._offPos.x+=-.05*y,this._offPos.z+=-.03*y,this.chargingHandle.position.z=.145+(d>.55?Math.sin((d-.55)/.45*Math.PI)*.04:0),d>=1&&(this.inspecting=!1,this.chargingHandle.position.z=.145)}e.inspectPressed&&!this.inspecting&&!this.reloading&&(this.inspecting=!0,this.inspectT=0,this.game.audio.chargeRack()),this._outPos.copy(this._basePos).add(this._offPos),this._outQuat.copy(this._baseQuat).multiply(this._offQuat);const p=this.adsEase;p>1e-4&&(this._adsBlendPos.copy(this.poseAds.pos).addScaledVector(this._offPos,1-p*.8),this._outPos.lerp(this._adsBlendPos,p),this._adsBlendQuat.copy(this.poseAds.quat).multiply(this._offQuat),this._outQuat.slerp(this._adsBlendQuat,p)),this.root.position.copy(this._outPos),this.root.quaternion.copy(this._outQuat)}registerLanding(t){this.landDip.kick(-.09*t)}reset(){this.mag=this.cfg.magSize,this.reloading=!1,this.inspecting=!1,this.fireCooldown=0,this.adsT=0,this.adsTarget=0,this.heat=0,this.shotIndex=0,this.kickX.set(0),this.kickY.set(0),this.kickZ.set(0),this.swayX.set(0),this.swayY.set(0),this.swayZ.set(0),this.landDip.set(0),this.root.position.copy(this.poses.stand.pos),this.root.quaternion.copy(this.poses.stand.quat),this.magMesh.visible=!0,this.magMesh.position.set(0,-.115,0),this.magEject.visible=!1,this.magSpare.visible=!1,this.chargingHandle.position.z=.145}}const ta=new ce({color:1119516,emissive:10474751,emissiveIntensity:1.6}),Zi=new ce({color:1514274,roughness:.85,metalness:.15}),Cn=new ce({color:2304565,roughness:.8,metalness:.2}),gl=new ce({color:3752526,roughness:.4,metalness:.8}),oc=new ce({color:13215370,roughness:.8});function m0(s=!1){const t=new Oe,e=s?1.25:1,i=new Oe,n=new bt(new Rt(.42*e,.52*e,.26*e),Zi);n.position.y=1.12*e,n.castShadow=!0,i.add(n);const r=new bt(new Rt(.05,.3,.01),ta);r.position.set(-.22*e,1.15*e,.13*e);const a=r.clone();a.position.x=.22*e;const o=new bt(new Rt(.3,.05,.01),ta);o.position.set(0,.92*e,.135*e),i.add(r,a,o);const l=new bt(new Rt(.2*e,.22*e,.2*e),oc);l.name="head",l.position.y=1.56*e,l.castShadow=!0;const c=new bt(new Rt(.26*e,.1*e,.26*e),Cn);c.name="helmet",c.position.y=1.68*e;const h=new bt(new Rt(.18*e,.05,.02),ta);h.name="visor",h.position.set(0,1.58*e,.11*e),i.add(l,c,h);const u=new Rt(.11*e,.55*e,.11*e),f=(v,S)=>{const P=new Oe,E=new bt(u,Zi);return E.position.y=-.24*e,E.castShadow=!0,P.add(E),P.position.set(v*.28*e,1.38*e,0),P},m=f(-1),g=f(1);i.add(m,g);const _=new Rt(.14*e,.62*e,.14*e),p=v=>{const S=new Oe,P=new bt(_,Cn);return P.position.y=-.31*e,P.castShadow=!0,S.add(P),S.position.set(v*.12*e,.62*e,0),S},d=p(-1),y=p(1);return t.add(i,d,y),{g:t,torso:i,head:l,armL:m,armR:g,legL:d,legR:y,s:e}}class g0{constructor(t){this.scene=t,this.parts=[];for(let e=0;e<7;e++){const i=new Rt(.2,.2,.2),n=new bt(i,Zi);n.visible=!1,t.add(n),this.parts.push({mesh:n,pos:new T,vel:new T})}this.alive=!1}activate(t,e,i){this.alive=!0,this.life=7,[{o:[0,1.55,0],s:.2,c:oc},{o:[0,1.1,0],s:.34,c:Zi},{o:[-.3,1.3,0],s:.16,c:Zi},{o:[.3,1.3,0],s:.16,c:Zi},{o:[-.12,.5,0],s:.2,c:Cn},{o:[.12,.5,0],s:.2,c:Cn},{o:[0,1.7,0],s:.16,c:Cn}].forEach((r,a)=>{const o=this.parts[a];o.mesh.material=r.c,o.mesh.scale.set(r.s*i,r.s*i,r.s*i),o.pos.set(t.x+r.o[0]*i+D.gauss()*.05,t.y+r.o[1]*i,t.z+r.o[2]*i),o.vel.set(e.x*D.range(.5,1.2)+D.range(-1.5,1.5),Math.abs(e.y)*.5+D.range(1,3.5),e.z*D.range(.5,1.2)+D.range(-1.5,1.5)),o.mesh.position.copy(o.pos),o.mesh.visible=!0})}update(t){if(!this.alive)return;this.life-=t;const e=this.life<2?(2-this.life)/2:0;for(const i of this.parts){i.vel.y-=10*t,i.pos.addScaledVector(i.vel,t);const n=be(i.pos.x,i.pos.z);i.pos.y<n+.1&&(i.pos.y=n+.1,Math.abs(i.vel.y)>1?i.vel.y*=-.25:i.vel.y=0,i.vel.x*=.85,i.vel.z*=.85),i.pos.y=Math.max(i.pos.y,n-e*.5),i.mesh.position.copy(i.pos),i.mesh.rotation.x+=i.vel.y*t*.5,i.mesh.rotation.z+=i.vel.x*t*.5,i.mesh.scale.multiplyScalar(1-e*t*.3)}if(this.life<=0){this.alive=!1;for(const i of this.parts)i.mesh.visible=!1;this.game.enemies.ragdollPool.push(this)}}dispose(){for(const t of this.parts)this.scene.remove(t.mesh)}}class _0{constructor(t,e,i){this.game=t,this.type=e;const n=t.cfg.enemies;if(this.hp=n.hp[e],this.maxHp=this.hp,this.speed=n.speed[e]*D.range(.85,1.15),this.alive=!0,this.pos=i.clone(),this.pos.y=0,this.vel=new T,this.heading=0,this.fl={x:new he(0,100,1.2),z:new he(0,100,1.2),y:new he(0,90,1.2)},this.coverPoint=null,this.reactTimer=D.range(.25,.7),this.attackCd=D.range(.6,1.4),this.losTimer=0,this.hasLOS=!1,this.burst=0,this.burstCd=0,this.bloodTrailT=0,this.animT=D.range(0,6),this.lungeT=-1,this.lungeDir=new T,this.plates=[],e==="heavy")for(let r=0;r<3;r++)this.plates.push({hp:45,broken:!1});this._build()}_build(){const t=this.type==="heavy",e=m0(t);if(this.group=e.g,this.torso=e.torso,this.s=e.s,this.legL=e.legL,this.legR=e.legR,this.armL=e.armL,this.armR=e.armR,this.type==="rusher"){const i=new Oe,n=new bt(new Rt(.04,.6,.04),Cn);n.position.y=-.3;const r=new bt(new Rt(.16,.22,.03),gl);r.position.set(.09,-.55,0),r.rotation.z=.5,i.add(n,r),i.position.set(.3*this.s,1.3*this.s,.1),this.torso.add(i),this.axe=i}else{const i=new bt(new Rt(this.type==="heavy"?.12:.07,this.type==="heavy"?.14:.09,.55),Zi);i.position.set(this.type==="heavy"?0:.22*this.s,1.2*this.s,.25*this.s),this.torso.add(i),this.gun=i}this.plateMeshes=[],this.type==="heavy"&&[{p:[0,1.18,.14],r:[0,0,0]},{p:[-.24,1.15,.1],r:[0,.3,0]},{p:[.24,1.15,.1],r:[0,-.3,0]}].forEach((n,r)=>{const a=new bt(new Rt(.3*this.s,.4*this.s,.05),gl);a.position.set(...n.p),a.rotation.set(...n.r),this.torso.add(a),this.plateMeshes.push({m:a,i:r})}),this.head=e.head,this.headBuf=new T,this.group.traverse(i=>{i.userData.enemyRef=this}),this.group.position.copy(this.pos),this.game.scene.add(this.group)}get headWorld(){return this.head.getWorldPosition(this.headBuf)}get muzzleWorld(){return this.gun?this.gun.localToWorld(new T(0,0,.28)):this.torso.localToWorld(new T(0,1.2,.3))}hit(t,e,i,n,r){if(!this.alive)return{killed:!1,headshot:!1,blocked:!1};if(this.type==="heavy"&&this.plates.some(o=>!o.broken)&&!r){const o=this.plates.find(l=>!l.broken);if(o.hp-=t,o.hp<=0){o.broken=!0;const l=this.plateMeshes.find(c=>c.i===this.plates.indexOf(o));if(l){l.m.visible=!1;const c=l.m.getWorldPosition(new T);this.game.fx.debris.spawn(c.x,c.y,c.z,n.x*3+D.gauss(),2+D.range(0,2),n.z*3+D.gauss(),1.2,2),this.game.fx.sparksBurst(c,8,11197934),this.game.audio.armorBreak()}}return this.fl.z.kick(n.x*.25),{killed:!1,headshot:!1,blocked:!0}}this.hp-=t;const a=.5*(r?1.5:1);return this.fl.x.kick(-n.x*a),this.fl.z.kick(-n.z*a),this.fl.y.kick(-Math.abs(n.y)*.3),this.game.audio.flinch(),this.game.fx.bloodSpray(e,i,n,r?1.8:1,r),this.hp<=0?(this.die(n),{killed:!0,headshot:r}):{killed:!1,headshot:r}}die(t){this.alive=!1;const e=this.pos,i=this.game.enemies,n=i.ragdolls.filter(a=>a.alive);n.length>=i.cfg.fx.ragdollCap&&(n[0].life=Math.min(n[0].life,.01));const r=i.ragdollPool.length?i.ragdollPool.pop():new g0(this.game.scene);r.game=this.game,r.activate(new T(e.x,e.y+.9,e.z),t,this.s),i.ragdolls.push(r),this.game.fx.decals.pool(new T(e.x,be(e.x,e.z)+.02,e.z),{x:0,y:1,z:0}),this.group.visible=!1,i.scene.remove(this.group),this.game.fx.bloodSpray(new T(e.x,e.y+1.2,e.z),{x:0,y:1,z:0},t,2.5,!0)}onPlayerDryFire(){this.aggroT=3}update(t,e,i,n){if(!this.alive)return;const r=this.game.cfg.enemies;this.animT+=t,this.aggroT=Math.max(0,(this.aggroT??0)-t);const a=new T().copy(e).sub(this.pos);a.y=0;const o=a.length();if(a.normalize(),this.losTimer-=t,this.losTimer<=0){this.losTimer=.18;const d=new T(this.pos.x,this.pos.y+1.5*this.s,this.pos.z),v=new T(e.x,e.y+1.2,e.z).clone().sub(d),S=v.length();v.normalize();const P=this.game.raycaster;P.set(d,v);const E=P.intersectObjects(this.game.solids,!1);this.hasLOS=!E.length||E[0].distance>S-.4}if(this.type==="rusher"){if(this.lungeT<0&&o<9&&this.hasLOS&&this.attackCd<=0&&(this.lungeT=0),this.lungeT>=0){if(this.lungeT<.5&&this.lungeDir.copy(a),this.lungeT+=t,this.lungeT>.5&&this.lungeT<1.05){this.pos.addScaledVector(this.lungeDir,8.5*t);const d=Math.hypot(this.pos.x-e.x,this.pos.z-e.z);this.lungeT>.6&&this.lungeT<.8&&d<1.7&&(this.lungeT=.81),(this.lungeT===.81||this.lungeT>.8&&this.lungeT<.82)&&this.game.damagePlayer(r.damage.rusher,this.pos,{kind:"melee"})}this.lungeT>=1.05&&(this.lungeT=-1,this.attackCd=2.2)}}else this.type==="gunner"?(o>6&&!i&&!n&&(!this.coverPoint||this.coverPoint.distanceTo(e)<8)&&(this.coverPoint=this.game.enemies.findCover(this.pos,e)),(i||n)&&(this.coverPoint=null),this.hasLOS&&o<34?(this.reactTimer-=t,this.reactTimer<=0&&(this.attackCd-=t,this.attackCd<=0&&(this.burst>0?(this.burstCd-=t,this.burstCd<=0&&(this.burst--,this.burstCd=.11,this._fire(e,o))):(this.burst=3,this._fire(e,o),this.reactTimer=D.range(.5,1.1)*(i?.4:1))))):this.reactTimer=Math.max(this.reactTimer,.35)):this.type==="heavy"&&(this.attackCd-=t,this.hasLOS&&o<26&&this.attackCd<=0&&(this._fire(e,o,!0),this.attackCd=D.range(1.6,2.4)));let l=a;if(this.type!=="rusher"&&this.coverPoint&&o>6){const d=new T().copy(this.coverPoint).sub(this.pos);d.length()>1&&(l=d.normalize())}const c=(i||n||(this.aggroT??0)>0)&&this.lungeT<0,h=this.speed*(c?1.35:1)*(o>1.4?1:0)*(this.lungeT>=0?0:1),u=new T().copy(l).multiplyScalar(h);for(const d of this.game.env.colliders){const y=d.type==="box"?(d.min.x+d.max.x)/2:d.x,v=d.type==="box"?(d.min.z+d.max.z)/2:d.z,S=this.pos.x-y,P=this.pos.z-v,E=(d.type==="box"?Math.max(d.max.x-d.min.x,d.max.z-d.min.z)*.5:d.r)+.7,A=S*S+P*P;if(A<E*E){const I=Math.sqrt(A)||1;u.x+=S/I*this.speed*1.5,u.z+=P/I*this.speed*1.5}}const f=this.type==="rusher"?8:5;this.vel.x=Xe(this.vel.x,u.x,f,t),this.vel.z=Xe(this.vel.z,u.z,f,t),this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.pos.x=Bt(this.pos.x,-30,30),this.pos.z=Bt(this.pos.z,-30,30),this._collide(),this.pos.y=Xe(this.pos.y,be(this.pos.x,this.pos.z),12,t);let g=Math.atan2(this.vel.x,this.vel.z)-this.heading;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;this.heading+=g*Math.min(1,t*7),this.fl.x.update(t),this.fl.y.update(t),this.fl.z.update(t),this.group.position.copy(this.pos),this.group.rotation.y=this.heading+this.fl.z.v,this.torso.rotation.x=this.fl.y.v*.4-(this.lungeT>0&&this.lungeT<.5?.3:0),this.torso.rotation.z=this.fl.x.v*.5,this.torso.position.y=this.fl.y.v*-.15;const _=this.vel.length()>.5,p=_?Math.sin(this.animT*(this.speed>3?9:6.5))*.55:0;if(this.legL.rotation.x=p,this.legR.rotation.x=-p,this.armL.rotation.x=-p*.8,this.gun&&(this.armR.rotation.x=-.9),this.axe){const d=this.lungeT>=0&&this.lungeT<.5?this.lungeT/.5:this.lungeT>=.5?1-Math.min(1,(this.lungeT-.5)/.55):0;this.axe.rotation.x=-2.2*Math.sin(d*Math.PI*.5),this.axe.rotation.z=-1.2*Math.sin(d*Math.PI*.5)}if(this.hp<this.maxHp*.45&&_&&(this.bloodTrailT-=t,this.bloodTrailT<=0)){this.bloodTrailT=.22;const d=new T().copy(this.vel).normalize().multiplyScalar(-.35);this.game.fx.decals.blood(this.pos.x+d.x,be(this.pos.x,this.pos.z)+.02,this.pos.z+d.z,D.range(.25,.5))}}_fire(t,e,i=!1){const n=this.muzzleWorld,r=this.game.cfg.enemies;let a=(i?.5:.6)*Bt(1.6-e/26,.15,1);this.game.movement.crouch&&(a*=.5);const o=D.next()<a,l=new T(t.x,t.y+1.2,t.z);if(o)this.game.fx.tracer(n,l,6739455),this.game.audio.enemyShot(Bt(e/40,0,1)),this.game.damagePlayer(r.damage[this.type],this.pos,{kind:"bullet"});else{const c=l.clone().add(new T(D.gauss()*1.2,D.gauss()*.8,D.gauss()*1.2));this.game.fx.tracer(n,c,6739455),this.game.audio.nearMiss(Bt(e/20,0,1))}this.game.fx.muzzleFX(n,new T(0,1,0))}_collide(){const t=.3*this.s;for(const e of this.game.env.colliders)if(e.type==="box"){if(this.pos.y>e.max.y)continue;const i=Bt(this.pos.x,e.min.x,e.max.x),n=Bt(this.pos.z,e.min.z,e.max.z),r=this.pos.x-i,a=this.pos.z-n,o=r*r+a*a;if(o<t*t){const l=Math.sqrt(o)||.001;this.pos.x=i+r/l*t,this.pos.z=n+a/l*t}}else if(e.active!==!1){const i=this.pos.x-e.x,n=this.pos.z-e.z,r=t+e.r,a=i*i+n*n;if(a<r*r&&this.pos.y<e.y1){const o=Math.sqrt(a)||.001;this.pos.x=e.x+i/o*r,this.pos.z=e.z+n/o*r}}}dispose(){this.game.scene.remove(this.group)}}class v0{constructor(t){this.game=t,this.scene=t.scene,this.cfg=t.cfg,this.list=[],this.ragdolls=[],this.ragdollPool=[]}activeCount(){let t=0;for(const e of this.list)e.alive&&t++;return t}findCover(t){let e=null,i=1e9;for(const n of this.game.env.coverPoints){const r=n.distanceTo(t);r>3&&r<18&&r<i&&(i=r,e=n)}return e}spawn(t,e){const i=new _0(this.game,t,e);return this.list.push(i),i}onPlayerDryFire(){for(const t of this.list)t.alive&&t.onPlayerDryFire()}update(t,e){for(const r of this.ragdolls)r.update(t);const i=this.game.weapon.reloadingNow||this.game.input.key("KeyR"),n=this.game.health<40;for(let r=this.list.length-1;r>=0;r--){const a=this.list[r];a.update(t,e,i,n),a.alive||(a.dispose(),this.list.splice(r,1))}}reset(){for(const t of this.list)t.dispose();this.list.length=0;for(const t of this.ragdolls)t.dispose();this.ragdolls.length=0;for(const t of this.ragdollPool)t.dispose();this.ragdollPool.length=0}}class x0{constructor(t){this.game=t,this.pos=new T(0,0,6),this.pos.y=be(0,6),this.vel=new T,this.grounded=!0,this.crouch=!1,this.crouchT=0,this.sprinting=!1,this.tac=!1,this.tacTimer=0,this.sliding=!1,this.slideT=0,this.lean=0,this.leanSpring=new he(0,90,1),this.landDip=new he(0,150,1.3),this.fallPeak=0,this.bobPhase=0,this.speed=0,this.moveInput=new T,this._wasSprinting=!1,this._sprintFovKick=new he(0,60,1),this._slideDir=new T(0,0,-1)}get eyeHeight(){const t=this.game.cfg.player;return this.sliding?t.eyeSlide:t.eyeStand-(t.eyeStand-t.eyeCrouch)*Vs(this.crouchT)}update(t,e){const i=this.game.cfg.player,n=e;let r=0,a=0;n.key("KeyW")&&(a-=1),n.key("KeyS")&&(a+=1),n.key("KeyA")&&(r-=1),n.key("KeyD")&&(r+=1);const o=Math.hypot(r,a);o>1&&(r/=o,a/=o),this.moveInput.set(r,0,a);const l=n.key("ShiftLeft")||n.key("ShiftRight"),c=n.key("ControlLeft")||n.key("ControlRight"),h=c&&!l&&!this.sliding;h!==this.crouch&&(this.crouch=h,this.crouchT=0),this.crouchT=Bt(this.crouchT+(this.crouch?t/.2:-t/.2),0,1),c&&(this.sprinting||this.sliding)&&this.speed>i.walk*.8&&!this.sliding&&this.grounded&&(this.sliding=!0,this.slideT=0,this._slideDir.copy(this.vel).normalize(),this.vel.length()<i.slideMin&&this.vel.multiplyScalar(i.slideMin/Math.max(.1,this.vel.length())),this.game.audio.slide(!0)),n.consumeTac()&&this.grounded&&(this.tac=!0,this.tacTimer=0),this.tac&&(!l||!this.moving)&&(this.tacTimer+=t),this.tacTimer>1.2&&(this.tac=!1),l||(this.tac=!1);const u=o>.1;this.moving=u,this.sprinting=l&&u&&!this.crouch&&!this.sliding&&this.grounded,this.sprinting&&!this._wasSprinting&&this._sprintFovKick.kick(5),!this.sprinting&&!this.tac&&(this._sprintFovKick.target=0),this._wasSprinting=this.sprinting,this._sprintFovKick.update(t),this.sliding&&(this.slideT+=t,this.vel.multiplyScalar(Math.exp(-1.1*t)),(this.slideT>1.3||this.vel.length()<i.walk*.7)&&(this.sliding=!1));let f;this.sliding?f=this.vel.length():this.tac?f=i.tacSprint*(u?1:0):this.sprinting?f=i.sprint*(u?1:0):f=(this.crouch?i.walk*.5:i.walk)*(u?1:0);const m=this.game.cameraYaw,g=Math.sin(m),_=Math.cos(m),p=new T(-g,0,-_),d=new T(_,0,-g),y=new T().addScaledVector(p,-a).addScaledVector(d,r);y.lengthSq()>1e-5&&y.normalize().multiplyScalar(f),this.sliding&&y.copy(this._slideDir).multiplyScalar(this.vel.length());const v=this.grounded?this.sliding?2:i.accelGround:i.accelAir;this.vel.x=Xe(this.vel.x,y.x,v,t),this.vel.z=Xe(this.vel.z,y.z,v,t),n.key("Space")&&this.grounded&&(this.vel.y=i.jumpVel,this.grounded=!1,this.fallPeak=0,this.game.audio.jump()),this.grounded||(this.vel.y-=i.gravity*t,this.vel.y<-this.fallPeak&&(this.fallPeak=-this.vel.y)),this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.pos.y+=this.vel.y*t;const S=be(this.pos.x,this.pos.z);if(this.pos.y<=S&&this.vel.y<=0){if(this.pos.y=S,!this.grounded){const E=Bt(this.fallPeak/8,0,1);this.game.audio.land(.3+E),this.game.applyShake("land",E),this.game.weapon.registerLanding(E),this.landDip.kick(-.12*E),E>.25&&this.game.fx.impactPowder(new T(this.pos.x,S,this.pos.z),{x:0,y:1,z:0}),this.fallPeak=0}this.vel.y=0,this.grounded=!0}else this.pos.y>S+.05&&(this.grounded=!1);this._collide(),this.pos.x=Bt(this.pos.x,-31,31),this.pos.z=Bt(this.pos.z,-31,31);let P=0;if(n.key("KeyQ")&&(P=-1),n.key("KeyE")&&(P=1),this.leanSpring.target=P*(this.sliding?.4:1),this.leanSpring.update(t),this.lean=this.leanSpring.v,this.landDip.update(t),this.speed=Math.hypot(this.vel.x,this.vel.z),this.speed>.5&&this.grounded&&(this.bobPhase+=this.speed*t*2.1),this._breathT=(this._breathT??0)-t,this._breathT<=0&&this.speed<1&&this.game.wind.gust<.3&&this.game.state==="playing"){this._breathT=2.8;const E=this.game.camera,A=new T(0,0,-1).applyQuaternion(E.quaternion);this.game.fx.breathFog(E.position,A)}return{moving:u,speed:this.speed}}_collide(){const t=this.game.cfg.player.radius*(this.crouch?.8:1),e=this.crouch?1.15:1.8,i=this.pos.y;for(const n of this.game.env.colliders)if(n.type==="box"){if(i+e<n.min.y||i>n.max.y)continue;const r=Bt(this.pos.x,n.min.x,n.max.x),a=Bt(this.pos.z,n.min.z,n.max.z),o=this.pos.x-r,l=this.pos.z-a,c=o*o+l*l;if(c<t*t){const h=Math.sqrt(c)||.001;this.pos.x=r+o/h*t,this.pos.z=a+l/h*t,Math.abs(this.vel.x)>3&&(this.vel.x*=.6),Math.abs(this.vel.z)>3&&(this.vel.z*=.6)}}else if(n.active!==!1){if(i+e<n.y0||i>n.y1)continue;const r=this.pos.x-n.x,a=this.pos.z-n.z,o=t+n.r,l=r*r+a*a;if(l<o*o){const c=Math.sqrt(l)||.001;this.pos.x=n.x+r/c*o,this.pos.z=n.z+a/c*o}}}reset(){this.pos.set(0,0,6),this.pos.y=be(0,6),this.vel.set(0,0,0),this.crouch=!1,this.crouchT=0,this.sprinting=!1,this.tac=!1,this.sliding=!1,this.leanSpring.set(0),this.landDip.set(0),this.grounded=!0,this.speed=0}}const lc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class zn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const M0=new ga(-1,1,1,-1,0,1);class y0 extends we{constructor(){super(),this.setAttribute("position",new ue([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ue([0,2,0,0,2,0],2))}}const S0=new y0;class cc{constructor(t){this._mesh=new bt(S0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,M0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class hc extends zn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Zs.clone(t.uniforms),this.material=new se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new cc(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _l extends zn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const n=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class w0 extends zn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class b0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new mt);this._width=i.width,this._height=i.height,e=new Je(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Li}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hc(lc),this.copyPass.material.blending=mi,this.clock=new Zm}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}_l!==void 0&&(a instanceof _l?i=!0:a instanceof w0&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new mt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class T0 extends zn{constructor(t,e,i=null,n=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Mt}render(t,e,i){const n=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=n}}const E0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Mt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Nn extends zn{constructor(t,e,i,n){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=n,this.resolution=t!==void 0?new mt(t.x,t.y):new mt(256,256),this.clearColor=new Mt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Je(r,a,{type:Li}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Je(r,a,{type:Li});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const m=new Je(r,a,{type:Li});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}const o=E0;this.highPassUniforms=Zs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new se({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new mt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=lc;this.copyUniforms=Zs.clone(h.uniforms),this.blendMaterial=new se({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Qe,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Mt,this.oldClearAlpha=1,this.basic=new vi,this.fsQuad=new cc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(i,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,n),this.renderTargetsVertical[r].setSize(i,n),this.separableBlurMaterials[r].uniforms.invSize.value=new mt(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(t,e,i,n,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Nn.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Nn.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new se({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new mt(.5,.5)},direction:{value:new mt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new se({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Nn.BlurDirectionX=new mt(1,0);Nn.BlurDirectionY=new mt(0,1);class A0 extends zn{constructor(t,e,i){super(),this.needsSwap=!1,this.needsClear=!1,this.clear=!1,this._renderer=t,this._scene=e,this._camera=i,this.enabled=!0}render(t,e,i){const n=this.renderToScreen?null:i,r=t.getRenderTarget();t.setRenderTarget(n);const a=t.autoClear;t.autoClear=!1,t.render(this._scene,this._camera),t.autoClear=a,t.setRenderTarget(r)}}class C0{constructor(t){this.game=t;const e=t.renderer;this.composer=new b0(e),this.renderPass=new T0(t.scene,t.camera),this.composer.addPass(this.renderPass),this.vmPass=new A0(e,t.vmScene,t.vmCamera),this.composer.addPass(this.vmPass),this.bloom=new Nn(new mt(innerWidth,innerHeight),.55,.75,.62),this.composer.addPass(this.bloom),this.finalMat=new se({uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.42},uCA:{value:0},uGrain:{value:.035},uDamage:{value:0},uDamageDir:{value:new mt(0,0)},uOverdrive:{value:0},uFlash:{value:0},uRes:{value:new mt(innerWidth,innerHeight)}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse;
        uniform float uTime; uniform float uVignette; uniform float uCA; uniform float uGrain;
        uniform float uDamage; uniform vec2 uDamageDir; uniform float uOverdrive; uniform float uFlash;
        uniform vec2 uRes;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        void main(){
          vec2 uv = vUv;
          vec2 d = uv - 0.5;
          float r2 = dot(d, d);
          // chromatic aberration on damage/impact (G3)
          float ca = uCA * (0.35 + r2 * 2.2);
          vec3 col;
          col.r = texture2D(tDiffuse, uv + d * ca).r;
          col.g = texture2D(tDiffuse, uv).g;
          col.b = texture2D(tDiffuse, uv - d * ca).b;
          // teal-orange grade (G1): lift shadows toward teal, warm highlights
          vec3 lo = vec3(0.03, 0.045, 0.06), hi = vec3(0.02, 0.01, 0.0);
          col = mix(col, col + (lo + hi), smoothstep(1.0, 0.1, r2) * 0.25 + 0.1);
          col = pow(col, vec3(0.98, 1.0, 1.04)); // subtle blue push
          // vignette
          col *= 1.0 - uVignette * smoothstep(0.15, 0.75, length(d) * 1.4);
          // directional damage vignette (U2)
          float dmgDot = dot(normalize(d + vec2(1e-6)), uDamageDir);
          col += vec3(0.62, 0.02, 0.03) * uDamage * smoothstep(0.0, 0.9, dmgDot) * smoothstep(0.1, 0.85, length(d));
          // overdrive: cyan edge glow (D2)
          col += vec3(0.1, 0.7, 0.85) * uOverdrive * 0.25 * smoothstep(0.2, 0.75, length(d));
          // film grain, dialed low (G3)
          col += (hash(uv * uRes.xy * 0.5 + uTime * 60.0) - 0.5) * uGrain;
          // 1-2 frame white flash on big events (G8)
          col = mix(col, vec3(1.15), uFlash);
          gl_FragColor = vec4(col, 1.0);
        }`}),this.finalPass=new hc(this.finalMat,"tDiffuse"),this.composer.addPass(this.finalPass),this.u=this.finalPass.uniforms,this._damage=0,this._damageDir=new mt(0,1),this._over=0,this._flash=0,this._ca=0,this.quality="high"}setQuality(t){this.quality=t;const e=t==="high";this.bloom.enabled=e,this.finalPass.enabled=e,e?this.game.renderer.setPixelRatio(Math.min(devicePixelRatio,2)):this.game.renderer.setPixelRatio(1),this.game.renderer.setSize(innerWidth,innerHeight),this.composer.setPixelRatio(Math.min(devicePixelRatio,e?2:1)),this.composer.setSize(innerWidth,innerHeight)}damage(t,e){this._damage=1;const i=Math.hypot(t,e)||1;this._damageDir.set(t/i,e/i)}setCA(t){this._ca=Math.max(this._ca,t)}setFlash(t){this._flash=Math.max(this._flash,t*.85)}setOverdrive(t){this._over=t}resize(t,e){this.composer.setSize(t,e),this.u.uRes.value.set(t,e)}update(t,e,i){const n=this.u;n.uTime.value=e,this._damage=Math.max(0,this._damage-t*1.6),this._ca=Math.max(0,this._ca-t*3.5),this._flash=Math.max(0,this._flash-t*9),n.uDamage.value=this._damage,n.uCA.value=this._ca*.012,n.uFlash.value=this._flash;const r=i?1:0;this._over+=(r-this._over)*Math.min(1,t*6),n.uOverdrive.value=this._over,this.setOverdrive(this._over)}}class R0{constructor(t){this.game=t;const e=this.root=document.createElement("div");e.id="hud",e.innerHTML=`
      <style>
        #hud{position:fixed;inset:0;pointer-events:none;font-family:ui-monospace,Menlo,Consolas,monospace;color:#cfe4f2;user-select:none}
        #hud .big{font-size:28px;letter-spacing:2px}
        #cross{position:absolute;left:50%;top:50%;width:0;height:0}
        #cross i{position:absolute;background:#cfe4f2;opacity:.9;box-shadow:0 0 4px rgba(160,220,255,.6)}
        #cross .t{left:-1px;top:-10px;width:2px;height:7px}
        #cross .b{left:-1px;top:3px;width:2px;height:7px}
        #cross .l{left:-10px;top:-1px;width:7px;height:2px}
        #cross .r{left:3px;top:-1px;width:7px;height:2px}
        #hud.aiming #cross i{opacity:.25}
        #hud.aiming #cross.pts .l,#hud.aiming #cross.pts .r{display:none}
        #hitmark{position:absolute;left:50%;top:50%;width:22px;height:22px;transform:translate(-50%,-50%) rotate(45deg);opacity:0;transition:opacity .18s}
        #hitmark i{position:absolute;background:#fff}
        #hitmark .a{left:0;top:9px;width:8px;height:3px}#hitmark .b2{left:14px;top:9px;width:8px;height:3px}
        #hitmark .c{left:9px;top:0;width:3px;height:8px}#hitmark .d{left:9px;top:14px;width:3px;height:8px}
        #hitmark.kill{background:radial-gradient(circle,rgba(255,90,60,.8),transparent 60%)}
        #hitmark.kill i{background:#ff6a4a}
        #damagering{position:absolute;left:50%;top:50%;width:200px;height:200px;transform:translate(-50%,-50%)}
        #damagering svg{width:100%;height:100%;opacity:0;transition:opacity .25s}
        #ammoBox{position:absolute;right:5.5vw;bottom:7vh;text-align:right}
        #ammo{font-size:40px;font-weight:700;letter-spacing:3px}
        #ammo .mag{font-size:20px;color:#7fa8c0}
        #hpWrap{position:absolute;left:5.5vw;bottom:7vh;width:220px}
        #hpBar{height:8px;background:rgba(20,40,55,.7);border:1px solid rgba(140,200,235,.35)}
        #hpFill{height:100%;background:linear-gradient(90deg,#3ec9a7,#7fe3c0);width:100%;transition:width .12s}
        #hpLbl{font-size:11px;letter-spacing:3px;margin-top:6px;color:#8fb4c9}
        #statebox{position:absolute;left:5.5vw;top:6vh;font-size:12px;letter-spacing:2px;color:#8fb4c9}
        #scorebox{position:absolute;right:5.5vw;top:6vh;text-align:right;font-size:12px;letter-spacing:2px;color:#8fb4c9}
        #score{font-size:22px;color:#dceaf5}
        #combo{position:absolute;left:50%;top:16vh;transform:translateX(-50%);text-align:center;font-size:15px;letter-spacing:2px;opacity:0}
        #combo .n{font-size:24px;color:#ffd27f}
        #combo.hot .n{color:#ff8a5a;text-shadow:0 0 12px rgba(255,120,60,.7)}
        #overdrive{position:absolute;left:50%;top:21vh;transform:translateX(-50%);width:220px;height:5px;background:rgba(30,60,80,.5);opacity:0}
        #overdrive .f{height:100%;background:linear-gradient(90deg,#35d0ff,#7ff7d8);width:0%}
        #overdrive.on{opacity:1;box-shadow:0 0 18px rgba(80,220,255,.5)}
        #killfeed{position:absolute;right:5.5vw;top:14vh;display:flex;flex-direction:column;align-items:flex-end;gap:4px;font-size:12px}
        #killfeed div{opacity:.95;background:rgba(10,25,35,.45);padding:3px 8px;border-right:2px solid #ff8a5a}
        #banner{position:absolute;left:50%;top:34vh;transform:translate(-50%,-50%);text-align:center;opacity:0;transition:opacity .3s}
        #banner .t1{font-size:15px;letter-spacing:8px;color:#8fd4ff}
        #banner .t2{font-size:34px;letter-spacing:6px;margin-top:6px}
        #banner .t3{font-size:12px;letter-spacing:3px;margin-top:8px;color:#8fb4c9}
        #tally{position:absolute;right:5.5vw;top:30vh;min-width:210px;background:rgba(8,18,26,.62);border:1px solid rgba(120,190,230,.25);padding:14px 18px;font-size:12px;letter-spacing:1px;display:none}
        #tally h3{font-size:13px;letter-spacing:4px;margin:0 0 8px;color:#8fd4ff}
        #tally .row{display:flex;justify-content:space-between;gap:24px;margin:3px 0;color:#c3d9e8}
        #tally .row b{color:#eef6fb}
        #tally .best{margin-top:8px;border-top:1px solid rgba(120,190,230,.2);padding-top:8px;display:flex;justify-content:space-between;color:#ffd27f}
        #prompt{position:absolute;left:50%;bottom:16vh;transform:translateX(-50%);font-size:13px;letter-spacing:4px;color:#cfe4f2;background:rgba(8,18,26,.5);padding:8px 18px;opacity:0;transition:opacity .2s}
        #dmgnums{position:absolute;inset:0;overflow:hidden}
        .dnum{position:absolute;font-size:13px;font-weight:700;color:#ffe9c9;letter-spacing:1px;transition:transform .7s,opacity .7s;transform:translate(-50%,0)}
        .dnum.head{color:#ff8a5a;font-size:15px}
        #screens{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 30%,rgba(6,14,22,.55),rgba(4,9,15,.88));z-index:10;pointer-events:auto;font-family:ui-monospace,Menlo,monospace}
        #screens .card{text-align:center;color:#cfe4f2}
        #screens h1{font-size:30px;letter-spacing:14px;margin:0 0 6px;color:#eaf6ff}
        #screens .sub{letter-spacing:4px;color:#8fd4ff;margin-bottom:26px}
        #screens .keys{display:grid;grid-template-columns:auto auto;gap:6px 18px;font-size:12px;color:#9db8cc;text-align:left}
        #screens .keys b{color:#dceaf5;font-weight:600}
        #screens .go{margin-top:30px;font-size:16px;letter-spacing:6px;color:#ffd27f;animation:pulse 1.6s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
      </style>
      <div id="cross"><i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i></div>
      <div id="hitmark"><i class="a"></i><i class="b2"></i><i class="c"></i><i class="d"></i></div>
      <div id="damagering"><svg viewBox="0 0 200 200"><path id="arc" d="M100,10 L100,12 A88,88 0 0,1 112,11 L112,10 Z" fill="rgba(255,60,40,.8)"/></svg></div>
      <div id="ammoBox"><div id="ammo">30 <span class="mag">/ ∞</span></div></div>
      <div id="hpWrap"><div id="hpBar"><div id="hpFill"></div></div><div id="hpLbl">VITALS</div></div>
      <div id="statebox">STANDBY</div>
      <div id="scorebox"><div>SCORE</div><div id="score">0</div><div id="wave">WAVE —</div></div>
      <div id="combo"><div>COMBO ×<span class="n">0</span></div></div>
      <div id="overdrive"><div class="f"></div></div>
      <div id="killfeed"></div>
      <div id="banner"></div>
      <div id="tally"></div>
      <div id="prompt"></div>
      <div id="dmgnums"></div>
    `,document.body.appendChild(e),this.$=i=>e.querySelector(i),this.els={cross:this.$("#cross"),hitmark:this.$("#hitmark"),arc:this.$("#arc"),ring:this.$("#damagering"),ammo:this.$("#ammo"),hp:this.$("#hpFill"),state:this.$("#statebox"),score:this.$("#score"),wave:this.$("#wave"),combo:this.$("#combo"),comboN:this.$("#combo .n"),over:this.$("#overdrive"),overF:this.$("#overdrive .f"),feed:this.$("#killfeed"),banner:this.$("#banner"),tally:this.$("#tally"),prompt:this.$("#prompt"),dmg:this.$("#dmgnums")},this._crossT=0,this.screens=document.createElement("div"),this.screens.id="screens",document.body.appendChild(this.screens)}setAmmo(t,e,i){this.els.ammo.innerHTML=`<span class="mag">${i?"":t}</span> / ${e}${i?'<div style="font-size:11px;letter-spacing:3px;color:#ffd27f">RECHARGING</div>':""}`}setHealth(t,e){this.els.hp.style.width=Bt(t/e,0,1)*100+"%",this.els.hp.style.background=t/e<.3?"linear-gradient(90deg,#c0392b,#e74c3c)":"linear-gradient(90deg,#3ec9a7,#7fe3c0)"}setState(t){this.els.state.textContent=t}setScore(t){this.els.score.textContent=t}setWave(t){this.els.wave.textContent=t>0?`WAVE ${t}`:"WAVE —"}setAiming(t){this.root.classList.toggle("aiming",t)}setCross(t,e,i,n){const r=this.els.cross;r.classList.toggle("pts",i);const o=({tac:3.2,sprint:5,crouch:2,slide:7,stand:3}[t]??3)+e*26+(i?-1.5:0),l=Math.max(2.5,o*2.4);r.querySelectorAll("i").forEach((c,h)=>{c.style.cssText=h===0?`left:-1px;top:${-l}px;width:2px;height:6px;background:#cfe4f2;opacity:.9`:h===1?`left:-1px;top:${l-6}px;width:2px;height:6px;background:#cfe4f2;opacity:.9`:h===2?`left:${-l}px;top:-1px;width:6px;height:2px;background:#cfe4f2;opacity:.9`:`left:${l-6}px;top:-1px;width:6px;height:2px;background:#cfe4f2;opacity:.9`})}hitmark(t){const e=this.els.hitmark;e.classList.toggle("kill",!!t),e.style.opacity=1,clearTimeout(this._hmT),this._hmT=setTimeout(()=>{e.style.opacity=0,e.classList.remove("kill")},110)}damageDir(t){const e=this.ringSvg??(this.ringSvg=this.els.ring.querySelector("svg"));e.style.opacity=1;const i=t-Math.PI/2,n=88,r=.55,a=_=>[100+Math.cos(_)*n,100+Math.sin(_)*n],[o,l]=a(i-r),[c,h]=a(i-r*.2),[u,f]=a(i+r*.2),[m,g]=a(i+r);this.els.arc.setAttribute("d",`M${o},${l} L${c},${h} A${n},${n} 0 0,1 ${u},${f} L${m},${g} Z`),e.setAttribute("transform",`rotate(${t*180/Math.PI} 100 100)`),clearTimeout(this._ringT),this._ringT=setTimeout(()=>{e.style.opacity=0},550)}combo(t,e){if(t<=1){this.els.combo.style.opacity=0;return}this.els.combo.style.opacity=1,this.els.comboN.textContent=t,this.els.combo.classList.toggle("hot",t>=4)}overdrive(t,e){this.els.over.classList.toggle("on",!!e||t>.02),this.els.overF.style.width=t*100+"%"}feed(t,e="#ff8a5a"){const i=document.createElement("div");for(i.textContent=t,i.style.borderRightColor=e,this.els.feed.prepend(i);this.els.feed.children.length>5;)this.els.feed.lastChild.remove();setTimeout(()=>{i.style.transition="opacity 1s",i.style.opacity=0,setTimeout(()=>i.remove(),1e3)},3500)}banner(t,e,i,n=2.6){const r=this.els.banner;r.innerHTML=`<div class="t1">${t}</div><div class="t2">${e}</div>${i?`<div class="t3">${i}</div>`:""}`,r.style.opacity=1,clearTimeout(this._bT),this._bT=setTimeout(()=>{r.style.opacity=0},n*1e3)}tally(t){const e=this.els.tally;e.style.display="block",e.innerHTML=`<h3>WAVE ${t.wave} CLEARED</h3>
      <div class="row"><span>ELIMINATIONS</span><b>${t.kills}</b></div>
      <div class="row"><span>HEADSHOTS</span><b>${t.heads}</b></div>
      <div class="row"><span>ACCURACY</span><b>${t.acc}%</b></div>
      <div class="row"><span>WAVE TIME</span><b>${t.time}s</b></div>
      <div class="row"><span>DAMAGE TAKEN</span><b>${t.dmg}</b></div>
      <div class="best"><span>NEW BEST WAVE: ${t.best}</span><b>${t.bestScore}</b></div>`,clearTimeout(this._tT),this._tT=setTimeout(()=>{e.style.display="none"},5e3)}prompt(t,e=!0){this.els.prompt.textContent=t,this.els.prompt.style.opacity=e?1:0}dmgNums(t){if(!t.length)return;const e=innerWidth,i=innerHeight;for(const n of t){if(n.x<-50||n.x>e+50||n.y<-50||n.y>i+50)continue;const r=document.createElement("div");r.className="dnum"+(n.head?" head":""),r.textContent=n.val,r.style.left=n.x+"px",r.style.top=n.y+"px",r.style.opacity=1,this.els.dmg.appendChild(r),requestAnimationFrame(()=>{r.style.transform=`translate(-50%,-${24+Math.random()*14}px) rotate(${(Math.random()-.5)*14}deg)`,r.style.opacity=0}),setTimeout(()=>r.remove(),750)}}showStart(){this.screens.style.display="flex",this.screens.innerHTML=`<div class="card">
      <h1>WHITEOUT</h1>
      <div class="sub">PROTOCOL — SATELLITE YARD, GRID 7</div>
      <div class="keys">
        <b>WASD / mouse</b><span>move / aim</span>
        <b>Shift</b><span>sprint</span><b>double-tap Shift</b><span>tactical sprint</span>
        <b>Ctrl</b><span>crouch</span><b>Ctrl + sprint</b><span>slide (Space = slide-jump)</span>
        <b>RMB</b><span>ADS</span><b>Q / E</b><span>lean</span>
        <b>R</b><span>reload</span><b>F</b><span>inspect</span>
        <b>T</b><span>ADS self-test</span><b>\` (backtick)</b><span>debug overlay</span>
        <b>K6</b><span>restart run</span>
      </div>
      <div class="go">CLICK TO DEPLOY — WEATHER IS TURNING</div>
    </div>`}showDeath(t){this.screens.style.display="flex",this.screens.innerHTML=`<div class="card">
      <h1>SIGNAL LOST</h1>
      <div class="sub">the yard goes quiet</div>
      <div class="keys" style="justify-content:center">
        <b>WAVES</b><span>${t.wave}</span><b>SCORE</b><span>${t.score}</span>
        <b>ELIMS</b><span>${t.kills}</span><b>BEST COMBO</b><span>×${t.combo}</span>
      </div>
      <div class="go">K6 — RESTART PROTOCOL</div>
    </div>`}hideScreens(){this.screens.style.display="none"}}class P0{constructor(t){rs(this,"fps",0);rs(this,"ms",0);this.game=t,this.on=!1,this.el=document.createElement("div"),this.el.style.cssText="position:fixed;left:12px;top:12px;z-index:20;font:11px ui-monospace,Menlo,monospace;color:#8fe8b8;background:rgba(5,15,10,.8);padding:10px 12px;display:none;white-space:pre;letter-spacing:1px;pointer-events:none;border:1px solid rgba(120,255,190,.25)",document.body.appendChild(this.el)}toggle(){this.on=!this.on,this.el.style.display=this.on?"block":"none"}update(t){if(!this.on)return;this.fps=this.fps*.95+1/Math.max(1e-4,t)*.05,this.ms=this.ms*.95+t*1e3*.05;const e=this.game,i=["sparks","blood","debris","shells","smoke","fireSmoke","powder"].map(r=>`${r}:${e.fx[r]?.active??0}/${e.fx[r]?.count??0}`).join("  "),n=e.fx.tracers.filter(r=>r.life>0).length;this.el.textContent=`FPS ${this.fps.toFixed(0)}   FRAME ${this.ms.toFixed(1)}ms
DRAW ${e.renderer.info.render.calls}  TRI ${(e.renderer.info.render.triangles/1e3).toFixed(0)}k
TIME ${e.timescale.scale.toFixed(2)}x  Q:${e.post.quality}
SEED 0xC0DA  WIND ${e.wind.gust.toFixed(2)}
${i}
TRACERS ${n}  ENEMIES ${e.enemies.activeCount()}`}}class L0{constructor(){this.scale=1,this.mods=[]}push(t,e,i){if(!isFinite(t)||!isFinite(e))return;t=Bt(t,.05,1);let n=this.mods.find(r=>r.tag===i);n||(n={tag:i,target:t,time:0,duration:e,priority:i,dying:!1},this.mods.push(n)),n.target=t,n.time=0,n.duration=Math.max(n.duration,e),n.dying=!1}hitStop(t=.1,e=.09){this.push(t,e,30)}overdrive(t=.85,e=6){this.push(t,e,10)}killCam(t=.4,e=1.5){this.push(t,e,20)}update(t){t=Math.min(Math.max(t,0),.1);let e=1,i=-1,n=!1;for(let a=this.mods.length-1;a>=0;a--){const o=this.mods[a];if(o.time+=t,o.time>=o.duration){this.mods.splice(a,1);continue}(!n||o.priority>i)&&(e=o.target,i=o.priority),n=!0}const r=e<this.scale?18:5;return this.scale=Xe(this.scale,e,r,t),isFinite(this.scale)||(this.scale=1),this.scale}reset(){this.mods.length=0,this.scale=1}get active(){return this.mods.length>0}}class D0{constructor(t){this.game=t,this.keys=new Set,this.mouseDX=0,this.mouseDY=0,this.mouseL=!1,this.mouseR=!1,this.locked=!1,this._shiftTimes=[],this._handlers=[],this.tacQueued=!1,this.mantleQueued=!1}_on(t,e,i,n){e.addEventListener(t,i,n),this._handlers.push([t,e,i,n])}attach(){const t=this.game.dom,e=document;this._on("keydown",e,i=>{if(!i.repeat){if(this.keys.add(i.code),i.code==="ShiftLeft"||i.code==="ShiftRight"){const n=performance.now();this._shiftTimes=this._shiftTimes.filter(r=>n-r<1e4),this._shiftTimes.length&&n-this._shiftTimes[this._shiftTimes.length-1]<this.game.cfg.player.tacWindow&&(this.tacQueued=!0),this._shiftTimes.push(n)}i.code==="KeyT"&&this.game.runAdsSelfTest(),i.code==="Backquote"&&this.game.debugOverlay.toggle()}},{passive:!0}),this._on("keyup",e,i=>{this.keys.delete(i.code),i.code==="Space"&&(this.mantleQueued=!1)},{passive:!0}),this._on("mousedown",t,i=>{i.button===0&&(this.mouseL=!0),i.button===2&&(this.mouseR=!0)}),this._on("mouseup",t,i=>{i.button===0&&(this.mouseL=!1),i.button===2&&(this.mouseR=!1)}),this._on("contextmenu",t,i=>i.preventDefault()),this._on("mousemove",e,i=>{if(!this.locked)return;const n=.0021;this.mouseDX+=i.movementX*n,this.mouseDY+=i.movementY*n},{passive:!0}),this._on("pointerlockchange",e,()=>{this.locked=e.pointerLockElement===t,this.locked?this.game.onPointerLocked():this.game.onPointerUnlocked()}),this._on("pointerlockerror",e,()=>this.game.onPointerUnlocked())}detach(){for(const[t,e,i,n]of this._handlers)e.removeEventListener(t,i,n);this._handlers.length=0,this.keys.clear(),this.mouseL=this.mouseR=!1}drainMouse(){const t=this.mouseDX,e=this.mouseDY;return this.mouseDX=this.mouseDY=0,{dx:t,dy:e}}key(t){return this.keys.has(t)}consumeTac(){const t=this.tacQueued;return this.tacQueued=!1,t}requestLock(){try{this.game.dom.requestPointerLock?.()?.catch?.(()=>{})}catch{}}}const ea=new T(0,1,0),ee=new T,Ci=new T,U0=new T;class I0{constructor(t){rs(this,"_tick",t=>{requestAnimationFrame(this._tick);const e=Bt((t-this._last)/1e3,0,.1);this._last=t,this._fpsEma=Xe(this._fpsEma,1/Math.max(1e-4,e),2,e);const i=this.timescale.update(e);this.dtSim=e*i,(this.state==="playing"||this.state==="dying")&&!this.paused?this._update(e):this._idleUpdate(e),this._syncVm(),this.post.update(e,this.time,this.action.overdriveActive),this.post.composer.render(),this.debugOverlay.update(e),this._autoQuality(e)});this.dom=t,this.cfg=te,this.rng=D,this.time=0,this.dtSim=0,this.state="menu",this.paused=!1,this.waveNumber=0,this.god=!1,this.scene=new jo,this.scene.background=new Mt(659480),this.scene.fog=new Qs(2372679,te.world.fogDensity);const e=innerWidth/innerHeight;this.camera=new Ue(te.weapon.fovHip,e,te.camera.near,te.camera.far),this.vmScene=new jo,this.vmScene.fog=new Qs(1053981,.5);{const i=new tc(7109269,1712169,1.1);i.position.set(0,1,0),this.vmScene.add(i);const n=new sr(16767392,2.3);n.position.set(.6,.9,1.4),this.vmScene.add(n);const r=new sr(4163327,.9);r.position.set(-.8,.2,.6),this.vmScene.add(r)}this.vmCamera=new Ue(te.camera.vmFov,e,te.camera.vmNear,te.camera.vmFar),this.renderer=new Gm({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.outputColorSpace=He,this.renderer.toneMapping=yl,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=xl,this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),this.renderer.setSize(innerWidth,innerHeight),this.env=new n0(this),this.wind=this.env.wind,this.snow=new s0(this),this.fx=new r0(this),this.audio=new l0(this),this.music=new c0(this,this.audio),this.enemies=new v0(this),this.movement=new x0(this),this.weapon=new p0(this),this.vmScene.add(this.vmCamera),this.vmCamera.add(this.weapon.root),this.hud=new R0(this),this.debugOverlay=new P0(this),this.timescale=new L0,this.post=new C0(this),this.input=new D0(this),this.raycaster=new ic,this.raycaster.far=120,this.solids=[],this.health=te.player.health,this.regenTimer=0,this.action={combo:0,comboTimer:0,bestCombo:0,score:0,kills:0,overdriveCharge:0,overdriveActive:!1,overdriveTimer:0,recentKills:[],shotsFired:0,shotsHit:0,waveKills:0,waveHeads:0,waveDmg:0,waveTime:0},this._bestWave=0,this._bestScore=0,this.cameraYaw=0,this.cameraPitch=-.05,this.mouseVel={x:0,y:0},this.recPitch=new he(0,64,1),this.recYaw=new he(0,64,1),this.recRoll=new he(0,64,1),this._fovKick=new he(0,40,1),this._dmgRoll=new he(0,60,1.2),this._tempRoll=0,this._slideCant=new he(0,30,1.1),this._sprintKick=0,this._shakes=[],this.waveState="break",this.waveT=2.5,this.waveQueue=[],this.spawnT=0,this._killcam=null,this._lastKill=null,this._dmgNums=[],this.input.attach(),this._onKeyDown=i=>{i.code==="Digit6"&&this.startRun(),i.code==="F11"&&(this.god=!this.god)},document.addEventListener("keydown",this._onKeyDown),this._onVis=()=>{document.hidden&&this.state==="playing"&&!this.paused&&this.setPaused(!0)},document.addEventListener("visibilitychange",this._onVis),this._onResize=()=>this._resize(),addEventListener("resize",this._onResize),this._onDocClick=()=>{this.state==="menu"||this.state==="dead"?this.startRun():this.state==="playing"&&!this.input.locked&&this.input.requestLock()},document.addEventListener("click",this._onDocClick),this._resize(),this.hud.showStart(),this._last=performance.now(),this._fpsEma=60,this._lowTimer=0,requestAnimationFrame(this._tick)}applyRecoil(t,e){this.recPitch.kick(t*16),this.recYaw.kick(-e*16)}addTempRoll(t){this._tempRoll=Bt(this._tempRoll+t,-.22,.22)}applyShake(t,e=1){const i=(t==="explosion"?te.camera.shakeExplosion:t==="damage"?te.camera.shakeDamage:t==="land"?.2:te.camera.shakeMicro)*e;this._shakes.push({t:0,amp:i,f:[D.range(18,30),D.range(12,20),D.range(26,40)],p:[D.range(0,6.3),D.range(0,6.3),D.range(0,6.3)],decay:t==="explosion"?2:3.4}),this._shakes.length>6&&this._shakes.shift()}_sprintFov(){return this._sprintKick=Xe(this._sprintKick,this.movement.sprinting||this.movement.tac?5:0,8,this._lastDt),this._sprintKick}_updateCamera(t){const e=this.movement,i=this.weapon.adsEase;this._lastDt=t,this.recPitch.update(t),this.recYaw.update(t),this.recRoll.update(t),this._fovKick.update(t),this._dmgRoll.update(t),this._tempRoll=Xe(this._tempRoll,0,6,t),this._slideCant.target=e.sliding?.34:0,this._slideCant.update(t);const n=Bt(1-e.speed/3,0,1),r=this.time*2.1,a=Math.sin(r*.7+2)*.0012*n;let o=0,l=0,c=0,h=0;if(e.grounded&&e.speed>.5&&!e.crouch&&!e.sliding){const v=Bt(e.speed/5,0,1.25)*(1-i*.9);o=Math.sin(e.bobPhase)*.013*v,l=Math.sin(e.bobPhase*2)*.017*v,c=Math.sin(e.bobPhase*2)*.005*v,h=Math.sin(e.bobPhase)*.008*v}let u=0,f=0,m=0,g=0,_=0;for(let v=this._shakes.length-1;v>=0;v--){const S=this._shakes[v];if(S.t+=t,S.t>1.6){this._shakes.splice(v,1);continue}const P=S.amp*Math.exp(-S.decay*S.t);u+=Math.sin(S.t*S.f[0]+S.p[0])*P*.02,f+=Math.sin(S.t*S.f[1]+S.p[1])*P*.015,m+=Math.sin(S.t*S.f[2]+S.p[2])*P*.02,g+=Math.sin(S.t*S.f[1]*.8+S.p[1]+1)*P*.01,_+=Math.sin(S.t*S.f[0]*.6+S.p[0])*P*.012}const p=this.camera.position;p.set(e.pos.x+o+u,e.pos.y+e.eyeHeight+e.landDip.v+l+f,e.pos.z+m);const d=new Te(this.cameraPitch+this.recPitch.v+g+a+c,this.cameraYaw+this.recYaw.v+u*.4,-e.lean*.07+this._dmgRoll.v+this._tempRoll+this._slideCant.v*(e.sliding?1:0)+_+h,"YXZ");this.camera.quaternion.setFromEuler(d);const y=Qi(te.weapon.fovHip,te.weapon.fovAds,i)+this._sprintFov()+this._fovKick.v;if(Math.abs(this.camera.fov-y)>.01&&(this.camera.fov=y,this.camera.updateProjectionMatrix()),this.camera.updateMatrixWorld(),this._killcam){const v=this._killcam;v.t+=t;const S=v.a0+v.t*1.5;p.set(v.cx+Math.cos(S)*v.r,v.cy+2.6,v.cz+Math.sin(S)*v.r),this.camera.lookAt(v.cx,v.cy+1.1,v.cz),v.t>=v.dur&&(this._killcam=null)}}_syncVm(){const t=this.camera,e=this.vmCamera;e.position.copy(t.position),e.quaternion.copy(t.quaternion),e.updateMatrixWorld(!0),this.weapon.root.updateWorldMatrix(!0,!0)}_spread(){const t=this.action,e=this.weapon.adsEase;let i=.0075;return i*=Qi(1,.36,e),this.movement.crouch&&(i*=.55),this.movement.sliding&&(i*=2.1),this.movement.sprinting&&(i*=1.55),this.movement.grounded||(i*=1.7),i+=this.weapon.heat*.016*(1-e*.6),t.overdriveActive&&(i*=.75),i}_targets(){const t=[];for(const e of this.env.shootables)e.visible!==!1&&e.userData.alive!==!1&&(e.userData.kind==="window"&&e.userData.broken||t.push(e));for(const e of this.enemies.list)e.alive&&t.push(e.group);return t}_rebuildSolids(){this.solids.length=0;for(const t of this.env.shootables)t.name!=="ground"&&(t.userData.kind==="window"&&t.userData.broken||t.userData.alive!==!1&&this.solids.push(t))}_fireBullet(){const t=this.action;t.shotsFired++;const e=this.camera;e.getWorldDirection(ee);const i=this._spread();ee.x+=D.gauss()*i,ee.y+=D.gauss()*i,ee.z+=D.gauss()*i*.5,ee.normalize(),this.raycaster.set(e.position,ee);let n=this.raycaster.intersectObjects(this._targets(),!0),r=te.weapon.damage,a=!1;if(n.length&&n[0].object.userData.kind==="crate"){a=!0,this._crateHit(n[0]),r*=.5,Ci.copy(n[0].point).addScaledVector(ee,.03),this.raycaster.set(Ci,ee);const c=n[0];n=this.raycaster.intersectObjects(this._targets(),!0).filter(h=>h.object!==c.object)}let o;if(n.length){const c=n[0];o=c.point,t.shotsHit++,this._applyHit(c,ee,r,a)}else{o=e.position.clone().addScaledVector(ee,80);let c=e.position.y;for(let h=2;h<90;h+=2){Ci.copy(e.position).addScaledVector(ee,h);const u=be(Ci.x,Ci.z);if(Ci.y<=u){c>u+.15&&(o.copy(Ci),o.y=u,this.fx.impactPowder(o,ea));break}c=Ci.y}}const l=this.weapon.muzzleAnchor.getWorldPosition(U0);this.fx.tracer(l,o),this.fx.muzzleFX(l,ee),this.fx.shellEject(l,ee),this.fx.muzzleLight.intensity=18,this.audio.gunshot(0),this.music.duck(.55,.3)}_crateHit(t){const e=t.face?t.face.normal.clone().transformDirection(t.object.matrixWorld):ea.clone();this.fx.woodSplinters(t.point,e),this.audio.tinkle(.3)}_applyHit(t,e,i,n){const r=t.object,a=t.face?t.face.normal.clone().transformDirection(r.matrixWorld):ea.clone(),o=r.userData.kind,l=r.userData.enemyRef,c=this.fx;if(l&&l.alive){let h=["head","helmet","visor"].includes(r.name);!h&&t.point.distanceTo(l.headWorld)<.22&&(h=!0),h&&(i*=te.weapon.headMult);const u=l.hit(i,t.point,a,e,h);this._queueDmgNum(t.point,Math.round(i),h,!0),u.killed?this._onKill(l,h):this.audio.hitTick(h);return}switch(o){case"drum":n||(r.userData.hp-=i,c.sparks(t.point,a,8,16765066),r.userData.hp<=0&&this._explodeDrum(r));break;case"ice":c.iceChips(t.point,a),this.audio.glass();break;case"window":r.userData.broken?c.sparks(t.point,a,4,8952234):(r.userData.broken=!0,r.material.emissiveIntensity=.12,r.material.color.set(1119002),c.glassShards(t.point,a,!0),this.audio.glass());break;case"crate":this._crateHit(t);break;case"ground":c.impactPowder(t.point,a);break;default:c.sparks(t.point,a,7),o!=="module"&&c.decals.hole(t.point,a,.22,"dark"),this.audio.tinkle(.25)}}_explodeDrum(t){t.userData.alive=!1,t.visible=!1;const e=this.env.colliders.find(a=>a.type==="cyl"&&Math.abs(a.x-t.position.x)<.01&&Math.abs(a.z-t.position.z)<.01);e&&(e.active=!1);const i=t.position.clone();this.fx.explosion(i);const n=i.distanceTo(this.movement.pos);this.audio.explosion(Bt(n/30,0,1)),this.applyShake("explosion",Bt(1-n/24,.2,1)),this.timescale.hitStop(.3,.12);for(const a of this.enemies.list){if(!a.alive)continue;const o=a.pos.distanceTo(i);if(o<4){const l=ee.copy(a.pos).sub(i).normalize().multiplyScalar(12*(1-o/4));a.hp-=90*(1-o/4.5),a.hp<=0?a.die(l):(a.fl.y.kick(4),a.fl.x.kick(l.x))}}const r=Math.hypot(t.position.x-this.movement.pos.x,t.position.z-this.movement.pos.z);r<5&&this.damagePlayer(26*(1-r/5.5),t.position,{kind:"explosion"}),this.action.score+=25}damagePlayer(t,e,i){if(this.god||this.state!=="playing")return;this.health=Math.max(0,this.health-t),this.regenTimer=te.player.regenDelay,this.action.waveDmg+=t,ee.copy(e).sub(this.camera.position);const n=Math.atan2(ee.x,ee.z)-this.cameraYaw+Math.PI;this.hud.damageDir(n);const r=Math.hypot(ee.x,ee.z)||1;this.post.damage(ee.x/r,-ee.z/r),this._dmgRoll.kick(Bt(ee.x/r,-1,1)*.05*(i.kind==="melee"?1.4:1)),this._fovKick.kick(3),this.applyShake("damage",i.kind==="melee"?1.2:.7),this.post.setCA(.6),this.health<=0&&this._die()}_die(){this.state="dying",this.timescale.push(.12,1.4,50),document.exitPointerLock?.(),setTimeout(()=>{if(this.state!=="dying")return;this.state="dead";const t=this.action;this.hud.showDeath({wave:this.waveNumber,score:t.score,kills:t.kills,combo:t.bestCombo}),this.music.stop()},1400)}_updateRegen(t){this.state==="playing"&&(this.regenTimer-=t,this.regenTimer<=0&&this.health>0&&this.health<te.player.health&&(this.health=Math.min(te.player.health,this.health+te.player.regenRate*t)))}_updateAction(t){const e=this.action;e.combo>0&&(e.comboTimer-=t,e.comboTimer<=0&&(e.combo=0)),e.overdriveActive?(e.overdriveTimer-=t,e.overdriveTimer<=0&&(e.overdriveActive=!1,e.overdriveCharge=0)):e.overdriveCharge=Math.max(0,e.overdriveCharge-t*.015),e.recentKills=e.recentKills.filter(i=>this.time-i<2.5)}_onKill(t,e){const i=this.action,n=this.cfg.action;i.kills++,i.waveKills++,e&&i.waveHeads++,i.combo++,i.bestCombo=Math.max(i.bestCombo,i.combo),i.comboTimer=n.comboWindow*(i.overdriveActive?1.2:1),i.recentKills.push(this.time);let r=e?n.scoreHead:n.scoreKill;i.overdriveActive&&(r*=2),i.score+=r,i.recentKills.length>=3&&(i.score+=150,this.audio.multikill(i.recentKills.length)),i.overdriveCharge=Math.min(1,i.overdriveCharge+1/n.overdriveKills),i.overdriveCharge>=1&&!i.overdriveActive&&this._enterOverdrive(),this.timescale.hitStop(e?.07:.13,e?.11:.08),this.hud.hitmark(e);const a=t.type==="rusher"?"RUSHER":t.type==="gunner"?"GUNNER":"HEAVY";this.hud.feed(`${a} — ${e?"HEADSHOT":"ELIMINATED"}`),this._lastKill={pos:t.pos.clone(),isHead:e}}_enterOverdrive(){const t=this.action;t.overdriveActive=!0,t.overdriveTimer=this.cfg.action.overdriveDur,this.timescale.overdrive(.82,t.overdriveTimer),this.audio.overdrive(),this.hud.banner("SYSTEMS UNBOUND","OVERDRIVE"),this.post.setCA(.4)}_updateWaves(t){if(this.state!=="playing")return;const e=this.action,i=this.cfg.enemies;switch(this.waveState){case"break":{this.waveT-=t,this.waveT<=0&&this._startWave(this.waveNumber+1);break}case"combat":{e.waveTime+=t;const n=Math.round(Qi(i.maxActive.early,i.maxActive.late,Bt((this.waveNumber-1)/8,0,1)));for(this.spawnT-=t;this.waveQueue.length&&this.enemies.activeCount()<n&&this.spawnT<=0;){const r=this.waveQueue.shift(),a=D.range(0,Math.PI*2),o=D.range(11,24),l=Bt(this.movement.pos.x+Math.cos(a)*o,-29,29),c=Bt(this.movement.pos.z+Math.sin(a)*o,-29,29);this.enemies.spawn(r,new T(l,0,c)),this.spawnT=Bt(2.4-this.waveNumber*.14,.6,2.4)*D.range(.7,1.3)}!this.waveQueue.length&&this.enemies.activeCount()===0&&(this.waveState="clear",this.waveT=0,this._killcam=this._lastKill?{cx:this._lastKill.pos.x,cy:this._lastKill.pos.y,cz:this._lastKill.pos.z,t:0,a0:D.range(0,6),r:5.5,dur:1.7}:null,this.timescale.killCam(.35,1.7));break}case"clear":{if(this.waveT+=t,this.waveT>1.9){e.score+=this.cfg.action.scoreWave*this.waveNumber;const n=e.shotsFired?Math.min(100,Math.round(e.shotsHit/e.shotsFired*100)):0;this.hud.tally({wave:this.waveNumber,kills:e.waveKills,heads:e.waveHeads,acc:n,time:Math.round(e.waveTime),dmg:Math.round(e.waveDmg),best:this._bestWave,bestScore:this._bestScore}),this.waveState="tally",this.waveT=0}break}case"tally":{this.waveT+=t,this.waveT>3.4&&(this.fx.decals.clear(),this._bestWave=this.waveNumber,this._bestScore=e.score,this.env.setupWaveDrums(),this.health=Math.min(te.player.health,this.health+30),this.weapon.mag=te.weapon.magSize,this.weapon.reloading=!1,e.waveKills=0,e.waveHeads=0,e.waveDmg=0,e.waveTime=0,this.waveState="break",this.waveT=3);break}}}_startWave(t){this.waveNumber=t;const e=te.enemies.wave(t),i=[];for(let n=0;n<e.heavy;n++)i.push("heavy");for(let n=0;n<e.gunner;n++)i.push("gunner");for(;i.length<e.count;)i.push("rusher");for(let n=i.length-1;n>0;n--){const r=Math.floor(D.next()*(n+1));[i[n],i[r]]=[i[r],i[n]]}this.waveQueue=i,this.spawnT=1.2,this.waveState="combat",this.env.setupWaveDrums(),this.hud.setWave(t),this.hud.banner("WAVE "+t,`${i.length} HOSTILES INBOUND`),this.audio.waveStart(),this._lastKill=null}_queueDmgNum(t,e,i,n){!n||e<1||(ee.copy(t).project(this.camera),!(ee.z>1)&&this._dmgNums.push({x:(ee.x*.5+.5)*innerWidth,y:(-ee.y*.5+.5)*innerHeight,val:e,head:i}))}_updateHud(){const t=this.action,e=this.movement,i=this.weapon;this.hud.setAiming(i.adsEase>.5),this.hud.setCross(e.sliding?"slide":e.tac?"tac":e.sprinting?"sprint":e.crouch?"crouch":"stand",i.heat,i.adsEase>.5,e.crouch),this.hud.setAmmo(i.mag,i.reserve===1/0?"∞":i.reserve,i.reloadingNow),this.hud.setHealth(this.health,te.player.health),this.hud.setScore(t.score),this.hud.setState(this.state==="dead"?"SIGNAL LOST":this.state!=="playing"?"STANDBY":e.sliding?"SLIDING":e.tac?"TACTICAL":e.sprinting?"SPRINT":e.crouch?"CROUCH":i.adsEase>.5?"ADS":t.overdriveActive?"OVERDRIVE":"STANDARD"),this.hud.combo(t.combo),this.hud.overdrive(t.overdriveActive?t.overdriveTimer/this.cfg.action.overdriveDur:t.overdriveCharge,t.overdriveActive),this._dmgNums.length&&(this.hud.dmgNums(this._dmgNums),this._dmgNums.length=0)}startRun(){this.reset(),this.state="playing",this.paused=!1,this.audio.init(),this.audio.resume(),this.music.start(),this.hud.hideScreens(),this.input.requestLock(),this.hud.setWave(0)}onPointerLocked(){this.state==="playing"&&(this.paused=!1,this.audio.resume())}onPointerUnlocked(){this.state==="playing"&&this.setPaused(!0)}setPaused(t){this.paused=t,t?(this.hud.prompt("PAUSED — CLICK TO RESUME"),this.audio.suspend()):(this.hud.prompt(""),this._last=performance.now())}reset(){D.reset(),this.health=te.player.health,this.regenTimer=0,this.cameraYaw=0,this.cameraPitch=-.05,this._shakes.length=0,this._tempRoll=0,this._fovKick.set(0),this._dmgRoll.set(0),this._sprintKick=0,this.movement.reset(),this.weapon.reset(),this.weapon.setAds(!1),this.enemies.reset(),this.fx.reset(),this.timescale.reset();const t=this.action;t.combo=0,t.comboTimer=0,t.bestCombo=0,t.score=0,t.kills=0,t.overdriveCharge=0,t.overdriveActive=!1,t.overdriveTimer=0,t.recentKills.length=0,t.shotsFired=0,t.shotsHit=0,t.waveKills=0,t.waveHeads=0,t.waveDmg=0,t.waveTime=0,this._bestWave=0,this._bestScore=0,this.waveNumber=0,this.waveState="break",this.waveT=2.2,this.waveQueue.length=0,this._killcam=null;for(const e of this.env.windows)e.userData.broken=!1,e.material.emissiveIntensity=1.6,e.material.color.set(3351057);this.env.setupWaveDrums(),this.time=0}runAdsSelfTest(){this.weapon.reloading=!1,this.weapon.inspecting=!1,this.weapon.reloadT=0,this.weapon.inspectT=0;for(const e of[this.weapon.landDip,this.weapon.swayX,this.weapon.swayY,this.weapon.swayZ])e&&(e.v=0,e.dv=0);for(const e of[this.recPitch,this.recYaw,this.recRoll,this._fovKick,this._dmgRoll,this._slideCant])e.v=0,e.dv=0;this._tempRoll=0,this.weapon.setAds(!0),this.weapon.adsT=1,this.weapon.adsEase=1,this.weapon.update(1/60,{crouch:!1,slide:!1,tac:!1,sprint:!1,moving:!1,speed:0,mouseVel:{x:0,y:0},wallBump:!1,lean:0,inspectPressed:!1}),this._syncVm();let t=!0;for(const e of[75,65,55]){const i=f0({camera:this.vmCamera,weapon:this.weapon,viewport:{width:innerWidth,height:innerHeight},fov:e,raycastScene:this.scene,log:n=>console.log(n)});t=t&&i.pass}this.vmCamera.fov=te.camera.vmFov,this.vmCamera.updateProjectionMatrix(),this.weapon.setAds(this.input.mouseR),console.log(`[ADS-TEST] TOTAL: ${t?"PASS":"FAIL"}`),this.hud.banner("SELF-TEST",t?"ADS GEOMETRY PASS":"ADS GEOMETRY FAIL")}_resize(){const t=innerWidth,e=innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.vmCamera.aspect=t/e,this.vmCamera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.post.resize(t,e);const i=this.renderer.domElement.height/1080;for(const n of[this.fx.smoke,this.fx.fireSmoke,this.fx.powder])n.points.material.uniforms.uPixelScale.value=i;this.snow.setPixelScale(26*i)}_autoQuality(t){this.post.quality==="high"&&(this._fpsEma<45?this._lowTimer+=t:this._lowTimer=Math.max(0,this._lowTimer-t*2),this._lowTimer>4&&(this.post.setQuality("low"),this.snow.points.geometry.setDrawRange(0,500),this.hud.banner("","QUALITY: LOW (AUTO)"),this._lowTimer=-999))}_update(t){const e=this.dtSim;this.time+=e;const i=this.input,{dx:n,dy:r}=i.drainMouse();this.cameraYaw-=n,this.cameraPitch=Bt(this.cameraPitch-r,-1.35,1.35),this.mouseVel.x=Xe(this.mouseVel.x,n,18,t),this.mouseVel.y=Xe(this.mouseVel.y,r,18,t);const a=this.movement.update(t,i);i.key("KeyR")&&!this.weapon.reloadingNow&&this.weapon.mag<this.cfg.weapon.magSize&&this.weapon.startReload(),this.state==="playing"&&this.weapon.setAds(i.mouseR),this.weapon.update(t,{crouch:this.movement.crouch,slide:this.movement.sliding,tac:this.movement.tac,sprint:this.movement.sprinting,moving:a.moving,speed:this.movement.speed,mouseVel:this.mouseVel,wallBump:!1,lean:this.movement.lean,inspectPressed:i.key("KeyF")}),i.mouseL&&this.state==="playing"&&this.weapon.tryFire()&&this._fireBullet(),this._updateCamera(t),this._rebuildSolids(),this.enemies.update(e,this.movement.pos),this.env.update(e),this.fx.update(e,t),this.snow.update(t,this.time,this.camera.position),this.audio.setWind(this.wind.gust,t),this.audio.heartbeat(this.health,t),this.music.update(t),this._updateRegen(e),this._updateAction(e),this._updateWaves(e),this._updateHud()}_idleUpdate(t){this.time+=t,this._rebuildSolids(),this.env.update(t),this.fx.update(t,t),this.snow.update(t,this.time,this.camera.position),this.audio.setWind(this.wind.gust,t),this._updateCamera(t),this.state==="menu"&&(this.cameraYaw+=t*.02),this.hud.setHealth(this.health,te.player.health)}dispose(){cancelAnimationFrame(this._tick),this.input.detach(),document.removeEventListener("keydown",this._onKeyDown),document.removeEventListener("click",this._onDocClick),document.removeEventListener("visibilitychange",this._onVis),removeEventListener("resize",this._onResize),this.enemies.reset(),this.fx.reset(),this.renderer.dispose()}}const N0=document.getElementById("scene");let uc;try{uc=new I0(N0)}catch(s){window.__bootErr=s,console.error("WHITEOUT: boot failed",s);const t=document.createElement("pre");throw t.style.cssText="position:fixed;inset:0;margin:0;padding:24px;color:#ff6a5a;background:#0a0507;font:12px/1.5 ui-monospace,monospace;z-index:99;overflow:auto;white-space:pre-wrap",t.textContent=`BOOT FAILED

`+(s.stack||s.message),document.body.appendChild(t),s}console.log("%cWHITEOUT PROTOCOL","color:#8fe8b8;font-size:14px;font-weight:bold");console.log("three r"+rr);window.__game=uc;
