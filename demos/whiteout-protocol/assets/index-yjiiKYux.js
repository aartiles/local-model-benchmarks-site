(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="169",dc=0,oo=1,fc=2,vl=1,xl=2,_i=3,Ii=0,Ae=1,ce=2,yi=0,Ki=1,li=2,lo=3,co=4,pc=5,Wi=100,mc=101,gc=102,_c=103,vc=104,xc=200,Mc=201,yc=202,Sc=203,Hr=204,Vr=205,Tc=206,bc=207,wc=208,Ec=209,Ac=210,Rc=211,Cc=212,Pc=213,Dc=214,Gr=0,Wr=1,Xr=2,Mn=3,qr=4,Yr=5,Kr=6,$r=7,Ml=0,Lc=1,Ic=2,Li=0,Uc=1,Nc=2,Fc=3,yl=4,Oc=5,zc=6,Bc=7,Sl=300,yn=301,Sn=302,jr=303,Zr=304,Ys=306,Ns=1e3,qi=1001,Qr=1002,Le=1003,kc=1004,ts=1005,ti=1006,sr=1007,Yi=1008,Si=1009,Tl=1010,bl=1011,Zn=1012,Pa=1013,$i=1014,ai=1015,oi=1016,Da=1017,La=1018,Tn=1020,wl=35902,El=1021,Al=1022,ni=1023,Rl=1024,Cl=1025,_n=1026,bn=1027,Ia=1028,Ua=1029,Pl=1030,Na=1031,Fa=1033,Rs=33776,Cs=33777,Ps=33778,Ds=33779,Jr=35840,ta=35841,ea=35842,ia=35843,na=36196,sa=37492,ra=37496,aa=37808,oa=37809,la=37810,ca=37811,ha=37812,ua=37813,da=37814,fa=37815,pa=37816,ma=37817,ga=37818,_a=37819,va=37820,xa=37821,Ls=36492,Ma=36494,ya=36495,Dl=36283,Sa=36284,Ta=36285,ba=36286,Hc=3200,Vc=3201,Ll=0,Gc=1,Di="",Be="srgb",Ui="srgb-linear",Oa="display-p3",Ks="display-p3-linear",Fs="linear",se="srgb",Os="rec709",zs="p3",Zi=7680,ho=519,Wc=512,Xc=513,qc=514,Il=515,Yc=516,Kc=517,$c=518,jc=519,wa=35044,Ul=35048,uo="300 es",vi=2e3,Bs=2001;class Rn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fo=1234567;const Yn=Math.PI/180,wn=180/Math.PI;function Cn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xe[n&255]+xe[n>>8&255]+xe[n>>16&255]+xe[n>>24&255]+"-"+xe[t&255]+xe[t>>8&255]+"-"+xe[t>>16&15|64]+xe[t>>24&255]+"-"+xe[e&63|128]+xe[e>>8&255]+"-"+xe[e>>16&255]+xe[e>>24&255]+xe[i&255]+xe[i>>8&255]+xe[i>>16&255]+xe[i>>24&255]).toLowerCase()}function we(n,t,e){return Math.max(t,Math.min(e,n))}function za(n,t){return(n%t+t)%t}function Zc(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Qc(n,t,e){return n!==t?(e-n)/(t-n):0}function Kn(n,t,e){return(1-e)*n+e*t}function Jc(n,t,e,i){return Kn(n,t,1-Math.exp(-e*i))}function th(n,t=1){return t-Math.abs(za(n,t*2)-t)}function eh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function ih(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function nh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function sh(n,t){return n+Math.random()*(t-n)}function rh(n){return n*(.5-Math.random())}function ah(n){n!==void 0&&(fo=n);let t=fo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function oh(n){return n*Yn}function lh(n){return n*wn}function ch(n){return(n&n-1)===0&&n!==0}function hh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function uh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function dh(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),m=r((i-t)/2),v=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*f,o*c);break;case"YZY":n.set(l*f,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*f,o*h,o*c);break;case"XZX":n.set(o*h,l*v,l*m,o*c);break;case"YXY":n.set(l*m,o*h,l*v,o*c);break;case"ZYZ":n.set(l*v,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function mn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Te(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const $n={DEG2RAD:Yn,RAD2DEG:wn,generateUUID:Cn,clamp:we,euclideanModulo:za,mapLinear:Zc,inverseLerp:Qc,lerp:Kn,damp:Jc,pingpong:th,smoothstep:eh,smootherstep:ih,randInt:nh,randFloat:sh,randFloatSpread:rh,seededRandom:ah,degToRad:oh,radToDeg:lh,isPowerOfTwo:ch,ceilPowerOfTwo:hh,floorPowerOfTwo:uh,setQuaternionFromProperEuler:dh,normalize:Te,denormalize:mn};class St{constructor(t=0,e=0){St.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(we(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,i,s,r,a,o,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],m=i[5],v=i[8],g=s[0],d=s[3],p=s[6],T=s[1],x=s[4],b=s[7],I=s[2],C=s[5],R=s[8];return r[0]=a*g+o*T+l*I,r[3]=a*d+o*x+l*C,r[6]=a*p+o*b+l*R,r[1]=c*g+h*T+u*I,r[4]=c*d+h*x+u*C,r[7]=c*p+h*b+u*R,r[2]=f*g+m*T+v*I,r[5]=f*d+m*x+v*C,r[8]=f*p+m*b+v*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,m=c*r-a*l,v=e*u+i*f+s*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return t[0]=u*g,t[1]=(s*c-h*i)*g,t[2]=(o*i-s*a)*g,t[3]=f*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=m*g,t[7]=(i*l-c*e)*g,t[8]=(a*e-i*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(rr.makeScale(t,e)),this}rotate(t){return this.premultiply(rr.makeRotation(-t)),this}translate(t,e){return this.premultiply(rr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const rr=new Nt;function Nl(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function fh(){const n=ks("canvas");return n.style.display="block",n}const po={};function Is(n){n in po||(po[n]=!0,console.warn(n))}function ph(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function mh(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function gh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const mo=new Nt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),go=new Nt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),On={[Ui]:{transfer:Fs,primaries:Os,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Be]:{transfer:se,primaries:Os,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ks]:{transfer:Fs,primaries:zs,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(go),fromReference:n=>n.applyMatrix3(mo)},[Oa]:{transfer:se,primaries:zs,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(go),fromReference:n=>n.applyMatrix3(mo).convertLinearToSRGB()}},_h=new Set([Ui,Ks]),$t={enabled:!0,_workingColorSpace:Ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!_h.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=On[t].toReference,s=On[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return On[n].primaries},getTransfer:function(n){return n===Di?Fs:On[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(On[t].luminanceCoefficients)}};function vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ar(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Qi;class vh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Qi===void 0&&(Qi=ks("canvas")),Qi.width=t.width,Qi.height=t.height;const i=Qi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ks("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=vn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(vn(e[i]/255)*255):e[i]=vn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xh=0;class Fl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=Cn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(or(s[a].image)):r.push(or(s[a]))}else r=or(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function or(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Mh=0;class Se extends Rn{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,i=qi,s=qi,r=ti,a=Yi,o=ni,l=Si,c=Se.DEFAULT_ANISOTROPY,h=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=Cn(),this.name="",this.source=new Fl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ns:t.x=t.x-Math.floor(t.x);break;case qi:t.x=t.x<0?0:1;break;case Qr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ns:t.y=t.y-Math.floor(t.y);break;case qi:t.y=t.y<0?0:1;break;case Qr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=Sl;Se.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,i=0,s=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],v=l[9],g=l[2],d=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(v-d)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(v+d)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,b=(m+1)/2,I=(p+1)/2,C=(h+f)/4,R=(u+g)/4,U=(v+d)/4;return x>b&&x>I?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=C/i,r=R/i):b>I?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=C/s,r=U/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=R/r,s=U/r),this.set(i,s,r,e),this}let T=Math.sqrt((d-v)*(d-v)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(d-v)/T,this.y=(u-g)/T,this.z=(f-h)/T,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yh extends Rn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Se(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fl(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ye extends yh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Ol extends Se{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sh extends Se{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Le,this.minFilter=Le,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ee{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[a+0],m=r[a+1],v=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=v,t[e+3]=g;return}if(u!==g||l!==f||c!==m||h!==v){let d=1-o;const p=l*f+c*m+h*v+u*g,T=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const I=Math.sqrt(x),C=Math.atan2(I,p*T);d=Math.sin(d*C)/I,o=Math.sin(o*C)/I}const b=o*T;if(l=l*d+f*b,c=c*d+m*b,h=h*d+v*b,u=u*d+g*b,d===1-o){const I=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=I,c*=I,h*=I,u*=I}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],m=r[a+2],v=r[a+3];return t[e]=o*v+h*u+l*m-c*f,t[e+1]=l*v+h*f+c*u-o*m,t[e+2]=c*v+h*m+o*f-l*u,t[e+3]=h*v-o*u-l*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),m=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*m*v,this._y=c*m*u-f*h*v,this._z=c*h*v+f*m*u,this._w=c*h*u-f*m*v;break;case"YXZ":this._x=f*h*u+c*m*v,this._y=c*m*u-f*h*v,this._z=c*h*v-f*m*u,this._w=c*h*u+f*m*v;break;case"ZXY":this._x=f*h*u-c*m*v,this._y=c*m*u+f*h*v,this._z=c*h*v+f*m*u,this._w=c*h*u-f*m*v;break;case"ZYX":this._x=f*h*u-c*m*v,this._y=c*m*u+f*h*v,this._z=c*h*v-f*m*u,this._w=c*h*u+f*m*v;break;case"YZX":this._x=f*h*u+c*m*v,this._y=c*m*u+f*h*v,this._z=c*h*v-f*m*u,this._w=c*h*u-f*m*v;break;case"XZY":this._x=f*h*u-c*m*v,this._y=c*m*u-f*h*v,this._z=c*h*v+f*m*u,this._w=c*h*u+f*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*i+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(t=0,e=0,i=0){w.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_o.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_o.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return lr.copy(this).projectOnVector(t),this.sub(lr)}reflect(t){return this.sub(lr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(we(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lr=new w,_o=new Ee;class si{constructor(t=new w(1/0,1/0,1/0),e=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,je):je.fromBufferAttribute(r,a),je.applyMatrix4(t.matrixWorld),this.expandByPoint(je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),es.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),es.copy(i.boundingBox)),es.applyMatrix4(t.matrixWorld),this.union(es)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,je),je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zn),is.subVectors(this.max,zn),Ji.subVectors(t.a,zn),tn.subVectors(t.b,zn),en.subVectors(t.c,zn),bi.subVectors(tn,Ji),wi.subVectors(en,tn),Fi.subVectors(Ji,en);let e=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Fi.z,Fi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Fi.z,0,-Fi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Fi.y,Fi.x,0];return!cr(e,Ji,tn,en,is)||(e=[1,0,0,0,1,0,0,0,1],!cr(e,Ji,tn,en,is))?!1:(ns.crossVectors(bi,wi),e=[ns.x,ns.y,ns.z],cr(e,Ji,tn,en,is))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const hi=[new w,new w,new w,new w,new w,new w,new w,new w],je=new w,es=new si,Ji=new w,tn=new w,en=new w,bi=new w,wi=new w,Fi=new w,zn=new w,is=new w,ns=new w,Oi=new w;function cr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Oi.fromArray(n,r);const o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),h=i.dot(Oi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Th=new si,Bn=new w,hr=new w;class Pn{constructor(t=new w,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Th.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bn.subVectors(t,this.center);const e=Bn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Bn,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bn.copy(t.center).add(hr)),this.expandByPoint(Bn.copy(t.center).sub(hr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new w,ur=new w,ss=new w,Ei=new w,dr=new w,rs=new w,fr=new w;class Ba{constructor(t=new w,e=new w(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ur.copy(t).add(e).multiplyScalar(.5),ss.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(ur);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ss),o=Ei.dot(this.direction),l=-Ei.dot(ss),c=Ei.lengthSq(),h=Math.abs(1-a*a);let u,f,m,v;if(h>0)if(u=a*l-o,f=a*o-l,v=r*h,u>=0)if(f>=-v)if(f<=v){const g=1/h;u*=g,f*=g,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-v?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=v?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ur).addScaledVector(ss,f),m}intersectSphere(t,e){ui.subVectors(t.center,this.origin);const i=ui.dot(this.direction),s=ui.dot(ui)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,i,s,r){dr.subVectors(e,t),rs.subVectors(i,t),fr.crossVectors(dr,rs);let a=this.direction.dot(fr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,t);const l=o*this.direction.dot(rs.crossVectors(Ei,rs));if(l<0)return null;const c=o*this.direction.dot(dr.cross(Ei));if(c<0||l+c>a)return null;const h=-o*Ei.dot(fr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vt{constructor(t,e,i,s,r,a,o,l,c,h,u,f,m,v,g,d){Vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,m,v,g,d)}set(t,e,i,s,r,a,o,l,c,h,u,f,m,v,g,d){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=m,p[7]=v,p[11]=g,p[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Vt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/nn.setFromMatrixColumn(t,0).length(),r=1/nn.setFromMatrixColumn(t,1).length(),a=1/nn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*u,v=o*h,g=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+v*c,e[5]=f-g*c,e[9]=-o*l,e[2]=g-f*c,e[6]=v+m*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,m=l*u,v=c*h,g=c*u;e[0]=f+g*o,e[4]=v*o-m,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=m*o-v,e[6]=g+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,m=l*u,v=c*h,g=c*u;e[0]=f-g*o,e[4]=-a*u,e[8]=v+m*o,e[1]=m+v*o,e[5]=a*h,e[9]=g-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,m=a*u,v=o*h,g=o*u;e[0]=l*h,e[4]=v*c-m,e[8]=f*c+g,e[1]=l*u,e[5]=g*c+f,e[9]=m*c-v,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,m=a*c,v=o*l,g=o*c;e[0]=l*h,e[4]=g-f*u,e[8]=v*u+m,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*u+v,e[10]=f-g*u}else if(t.order==="XZY"){const f=a*l,m=a*c,v=o*l,g=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+g,e[5]=a*h,e[9]=m*u-v,e[2]=v*u-m,e[6]=o*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bh,t,wh)}lookAt(t,e,i){const s=this.elements;return Oe.subVectors(t,e),Oe.lengthSq()===0&&(Oe.z=1),Oe.normalize(),Ai.crossVectors(i,Oe),Ai.lengthSq()===0&&(Math.abs(i.z)===1?Oe.x+=1e-4:Oe.z+=1e-4,Oe.normalize(),Ai.crossVectors(i,Oe)),Ai.normalize(),as.crossVectors(Oe,Ai),s[0]=Ai.x,s[4]=as.x,s[8]=Oe.x,s[1]=Ai.y,s[5]=as.y,s[9]=Oe.y,s[2]=Ai.z,s[6]=as.z,s[10]=Oe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],m=i[13],v=i[2],g=i[6],d=i[10],p=i[14],T=i[3],x=i[7],b=i[11],I=i[15],C=s[0],R=s[4],U=s[8],Y=s[12],_=s[1],M=s[5],A=s[9],P=s[13],D=s[2],O=s[6],k=s[10],q=s[14],H=s[3],J=s[7],it=s[11],pt=s[15];return r[0]=a*C+o*_+l*D+c*H,r[4]=a*R+o*M+l*O+c*J,r[8]=a*U+o*A+l*k+c*it,r[12]=a*Y+o*P+l*q+c*pt,r[1]=h*C+u*_+f*D+m*H,r[5]=h*R+u*M+f*O+m*J,r[9]=h*U+u*A+f*k+m*it,r[13]=h*Y+u*P+f*q+m*pt,r[2]=v*C+g*_+d*D+p*H,r[6]=v*R+g*M+d*O+p*J,r[10]=v*U+g*A+d*k+p*it,r[14]=v*Y+g*P+d*q+p*pt,r[3]=T*C+x*_+b*D+I*H,r[7]=T*R+x*M+b*O+I*J,r[11]=T*U+x*A+b*k+I*it,r[15]=T*Y+x*P+b*q+I*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],m=t[14],v=t[3],g=t[7],d=t[11],p=t[15];return v*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*m-i*l*m)+g*(+e*l*m-e*c*f+r*a*f-s*a*m+s*c*h-r*l*h)+d*(+e*c*u-e*o*m-r*a*u+i*a*m+r*o*h-i*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],m=t[11],v=t[12],g=t[13],d=t[14],p=t[15],T=u*d*c-g*f*c+g*l*m-o*d*m-u*l*p+o*f*p,x=v*f*c-h*d*c-v*l*m+a*d*m+h*l*p-a*f*p,b=h*g*c-v*u*c+v*o*m-a*g*m-h*o*p+a*u*p,I=v*u*l-h*g*l-v*o*f+a*g*f+h*o*d-a*u*d,C=e*T+i*x+s*b+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=T*R,t[1]=(g*f*r-u*d*r-g*s*m+i*d*m+u*s*p-i*f*p)*R,t[2]=(o*d*r-g*l*r+g*s*c-i*d*c-o*s*p+i*l*p)*R,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*m-i*l*m)*R,t[4]=x*R,t[5]=(h*d*r-v*f*r+v*s*m-e*d*m-h*s*p+e*f*p)*R,t[6]=(v*l*r-a*d*r-v*s*c+e*d*c+a*s*p-e*l*p)*R,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*m+e*l*m)*R,t[8]=b*R,t[9]=(v*u*r-h*g*r-v*i*m+e*g*m+h*i*p-e*u*p)*R,t[10]=(a*g*r-v*o*r+v*i*c-e*g*c-a*i*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*m-e*o*m)*R,t[12]=I*R,t[13]=(h*g*s-v*u*s+v*i*f-e*g*f-h*i*d+e*u*d)*R,t[14]=(v*o*s-a*g*s-v*i*l+e*g*l+a*i*d-e*o*d)*R,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*R,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,m=r*h,v=r*u,g=a*h,d=a*u,p=o*u,T=l*c,x=l*h,b=l*u,I=i.x,C=i.y,R=i.z;return s[0]=(1-(g+p))*I,s[1]=(m+b)*I,s[2]=(v-x)*I,s[3]=0,s[4]=(m-b)*C,s[5]=(1-(f+p))*C,s[6]=(d+T)*C,s[7]=0,s[8]=(v+x)*R,s[9]=(d-T)*R,s[10]=(1-(f+g))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=nn.set(s[0],s[1],s[2]).length();const a=nn.set(s[4],s[5],s[6]).length(),o=nn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Ze.copy(this);const c=1/r,h=1/a,u=1/o;return Ze.elements[0]*=c,Ze.elements[1]*=c,Ze.elements[2]*=c,Ze.elements[4]*=h,Ze.elements[5]*=h,Ze.elements[6]*=h,Ze.elements[8]*=u,Ze.elements[9]*=u,Ze.elements[10]*=u,e.setFromRotationMatrix(Ze),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=vi){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let m,v;if(o===vi)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Bs)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=vi){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,m=(i+s)*h;let v,g;if(o===vi)v=(a+r)*u,g=-2*u;else if(o===Bs)v=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const nn=new w,Ze=new Vt,bh=new w(0,0,0),wh=new w(1,1,1),Ai=new w,as=new w,Oe=new w,vo=new Vt,xo=new Ee;class Re{constructor(t=0,e=0,i=0,s=Re.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-we(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(we(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-we(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(we(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return vo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(vo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xo.setFromEuler(this),this.setFromQuaternion(xo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Re.DEFAULT_ORDER="XYZ";class ka{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Eh=0;const Mo=new w,sn=new Ee,di=new Vt,os=new w,kn=new w,Ah=new w,Rh=new Ee,yo=new w(1,0,0),So=new w(0,1,0),To=new w(0,0,1),bo={type:"added"},Ch={type:"removed"},rn={type:"childadded",child:null},pr={type:"childremoved",child:null};class ee extends Rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ee.DEFAULT_UP.clone();const t=new w,e=new Re,i=new Ee,s=new w(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Vt},normalMatrix:{value:new Nt}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return sn.setFromAxisAngle(t,e),this.quaternion.multiply(sn),this}rotateOnWorldAxis(t,e){return sn.setFromAxisAngle(t,e),this.quaternion.premultiply(sn),this}rotateX(t){return this.rotateOnAxis(yo,t)}rotateY(t){return this.rotateOnAxis(So,t)}rotateZ(t){return this.rotateOnAxis(To,t)}translateOnAxis(t,e){return Mo.copy(t).applyQuaternion(this.quaternion),this.position.add(Mo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(yo,t)}translateY(t){return this.translateOnAxis(So,t)}translateZ(t){return this.translateOnAxis(To,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?os.copy(t):os.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),kn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(kn,os,this.up):di.lookAt(os,kn,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),sn.setFromRotationMatrix(di),this.quaternion.premultiply(sn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bo),rn.child=t,this.dispatchEvent(rn),rn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ch),pr.child=t,this.dispatchEvent(pr),pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),di.multiply(t.parent.matrixWorld)),t.applyMatrix4(di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bo),rn.child=t,this.dispatchEvent(rn),rn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,t,Ah),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,Rh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),v=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}ee.DEFAULT_UP=new w(0,1,0);ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qe=new w,fi=new w,mr=new w,pi=new w,an=new w,on=new w,wo=new w,gr=new w,_r=new w,vr=new w,xr=new Jt,Mr=new Jt,yr=new Jt;class ei{constructor(t=new w,e=new w,i=new w){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Qe.subVectors(t,e),s.cross(Qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Qe.subVectors(s,e),fi.subVectors(i,e),mr.subVectors(t,e);const a=Qe.dot(Qe),o=Qe.dot(fi),l=Qe.dot(mr),c=fi.dot(fi),h=fi.dot(mr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(c*l-o*h)*f,v=(a*h-o*l)*f;return r.set(1-m-v,v,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,pi.x),l.addScaledVector(a,pi.y),l.addScaledVector(o,pi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return xr.setScalar(0),Mr.setScalar(0),yr.setScalar(0),xr.fromBufferAttribute(t,e),Mr.fromBufferAttribute(t,i),yr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(xr,r.x),a.addScaledVector(Mr,r.y),a.addScaledVector(yr,r.z),a}static isFrontFacing(t,e,i,s){return Qe.subVectors(i,e),fi.subVectors(t,e),Qe.cross(fi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Qe.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Qe.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ei.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ei.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return ei.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return ei.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ei.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;an.subVectors(s,i),on.subVectors(r,i),gr.subVectors(t,i);const l=an.dot(gr),c=on.dot(gr);if(l<=0&&c<=0)return e.copy(i);_r.subVectors(t,s);const h=an.dot(_r),u=on.dot(_r);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(an,a);vr.subVectors(t,r);const m=an.dot(vr),v=on.dot(vr);if(v>=0&&m<=v)return e.copy(r);const g=m*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),e.copy(i).addScaledVector(on,o);const d=h*v-m*u;if(d<=0&&u-h>=0&&m-v>=0)return wo.subVectors(r,s),o=(u-h)/(u-h+(m-v)),e.copy(s).addScaledVector(wo,o);const p=1/(d+g+f);return a=g*p,o=f*p,e.copy(i).addScaledVector(an,a).addScaledVector(on,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},ls={h:0,s:0,l:0};function Sr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Tt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Be){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=$t.workingColorSpace){if(t=za(t,1),e=we(e,0,1),i=we(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Sr(a,r,t+1/3),this.g=Sr(a,r,t),this.b=Sr(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=Be){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Be){const i=zl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vn(t.r),this.g=vn(t.g),this.b=vn(t.b),this}copyLinearToSRGB(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Be){return $t.fromWorkingColorSpace(Me.copy(this),t),Math.round(we(Me.r*255,0,255))*65536+Math.round(we(Me.g*255,0,255))*256+Math.round(we(Me.b*255,0,255))}getHexString(t=Be){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Me.copy(this),e);const i=Me.r,s=Me.g,r=Me.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Me.copy(this),e),t.r=Me.r,t.g=Me.g,t.b=Me.b,t}getStyle(t=Be){$t.fromWorkingColorSpace(Me.copy(this),t);const e=Me.r,i=Me.g,s=Me.b;return t!==Be?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ri),this.setHSL(Ri.h+t,Ri.s+e,Ri.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ri),t.getHSL(ls);const i=Kn(Ri.h,ls.h,e),s=Kn(Ri.s,ls.s,e),r=Kn(Ri.l,ls.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Me=new Tt;Tt.NAMES=zl;let Ph=0;class Dn extends Rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Ki,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Vr,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=Mn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ho,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(i.blending=this.blending),this.side!==Ii&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hr&&(i.blendSrc=this.blendSrc),this.blendDst!==Vr&&(i.blendDst=this.blendDst),this.blendEquation!==Wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Mn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ho&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class qe extends Dn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.combine=Ml,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fe=new w,cs=new St;class Ke{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=wa,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)cs.fromBufferAttribute(this,e),cs.applyMatrix3(t),this.setXY(e,cs.x,cs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix3(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)fe.fromBufferAttribute(this,e),fe.applyMatrix4(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)fe.fromBufferAttribute(this,e),fe.applyNormalMatrix(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)fe.fromBufferAttribute(this,e),fe.transformDirection(t),this.setXYZ(e,fe.x,fe.y,fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=mn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Te(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),i=Te(i,this.array),s=Te(s,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wa&&(t.usage=this.usage),t}}class Bl extends Ke{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class kl extends Ke{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class pe extends Ke{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Dh=0;const We=new Vt,Tr=new ee,ln=new w,ze=new si,Hn=new si,_e=new w;class Ve extends Rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nl(t)?kl:Bl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Nt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return We.makeRotationFromQuaternion(t),this.applyMatrix4(We),this}rotateX(t){return We.makeRotationX(t),this.applyMatrix4(We),this}rotateY(t){return We.makeRotationY(t),this.applyMatrix4(We),this}rotateZ(t){return We.makeRotationZ(t),this.applyMatrix4(We),this}translate(t,e,i){return We.makeTranslation(t,e,i),this.applyMatrix4(We),this}scale(t,e,i){return We.makeScale(t,e,i),this.applyMatrix4(We),this}lookAt(t){return Tr.lookAt(t),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ln).negate(),this.translate(ln.x,ln.y,ln.z),this}setFromPoints(t){const e=[];for(let i=0,s=t.length;i<s;i++){const r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(_e.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(_e),_e.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(_e)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(t){const i=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Hn.setFromBufferAttribute(o),this.morphTargetsRelative?(_e.addVectors(ze.min,Hn.min),ze.expandByPoint(_e),_e.addVectors(ze.max,Hn.max),ze.expandByPoint(_e)):(ze.expandByPoint(Hn.min),ze.expandByPoint(Hn.max))}ze.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)_e.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(_e));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)_e.fromBufferAttribute(o,c),l&&(ln.fromBufferAttribute(t,c),_e.add(ln)),s=Math.max(s,i.distanceToSquared(_e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ke(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<i.count;U++)o[U]=new w,l[U]=new w;const c=new w,h=new w,u=new w,f=new St,m=new St,v=new St,g=new w,d=new w;function p(U,Y,_){c.fromBufferAttribute(i,U),h.fromBufferAttribute(i,Y),u.fromBufferAttribute(i,_),f.fromBufferAttribute(r,U),m.fromBufferAttribute(r,Y),v.fromBufferAttribute(r,_),h.sub(c),u.sub(c),m.sub(f),v.sub(f);const M=1/(m.x*v.y-v.x*m.y);isFinite(M)&&(g.copy(h).multiplyScalar(v.y).addScaledVector(u,-m.y).multiplyScalar(M),d.copy(u).multiplyScalar(m.x).addScaledVector(h,-v.x).multiplyScalar(M),o[U].add(g),o[Y].add(g),o[_].add(g),l[U].add(d),l[Y].add(d),l[_].add(d))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let U=0,Y=T.length;U<Y;++U){const _=T[U],M=_.start,A=_.count;for(let P=M,D=M+A;P<D;P+=3)p(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const x=new w,b=new w,I=new w,C=new w;function R(U){I.fromBufferAttribute(s,U),C.copy(I);const Y=o[U];x.copy(Y),x.sub(I.multiplyScalar(I.dot(Y))).normalize(),b.crossVectors(C,Y);const M=b.dot(l[U])<0?-1:1;a.setXYZW(U,x.x,x.y,x.z,M)}for(let U=0,Y=T.length;U<Y;++U){const _=T[U],M=_.start,A=_.count;for(let P=M,D=M+A;P<D;P+=3)R(t.getX(P+0)),R(t.getX(P+1)),R(t.getX(P+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ke(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const s=new w,r=new w,a=new w,o=new w,l=new w,c=new w,h=new w,u=new w;if(t)for(let f=0,m=t.count;f<m;f+=3){const v=t.getX(f+0),g=t.getX(f+1),d=t.getX(f+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,d),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,d),o.add(h),l.add(h),c.add(h),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)_e.fromBufferAttribute(t,e),_e.normalize(),t.setXYZ(e,_e.x,_e.y,_e.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,v=0;for(let g=0,d=l.length;g<d;g++){o.isInterleavedBufferAttribute?m=l[g]*o.data.stride+o.offset:m=l[g]*h;for(let p=0;p<h;p++)f[v++]=c[m++]}return new Ke(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=t(f,i);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Eo=new Vt,zi=new Ba,hs=new Pn,Ao=new w,us=new w,ds=new w,fs=new w,br=new w,ps=new w,Ro=new w,ms=new w;class It extends ee{constructor(t=new Ve,e=new qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(br.fromBufferAttribute(u,t),a?ps.addScaledVector(br,h):ps.addScaledVector(br.sub(e),h))}e.add(ps)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hs.copy(i.boundingSphere),hs.applyMatrix4(r),zi.copy(t.ray).recast(t.near),!(hs.containsPoint(zi.origin)===!1&&(zi.intersectSphere(hs,Ao)===null||zi.origin.distanceToSquared(Ao)>(t.far-t.near)**2))&&(Eo.copy(r).invert(),zi.copy(t.ray).applyMatrix4(Eo),!(i.boundingBox!==null&&zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,zi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const d=f[v],p=a[d.materialIndex],T=Math.max(d.start,m.start),x=Math.min(o.count,Math.min(d.start+d.count,m.start+m.count));for(let b=T,I=x;b<I;b+=3){const C=o.getX(b),R=o.getX(b+1),U=o.getX(b+2);s=gs(this,p,t,i,c,h,u,C,R,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const v=Math.max(0,m.start),g=Math.min(o.count,m.start+m.count);for(let d=v,p=g;d<p;d+=3){const T=o.getX(d),x=o.getX(d+1),b=o.getX(d+2);s=gs(this,a,t,i,c,h,u,T,x,b),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const d=f[v],p=a[d.materialIndex],T=Math.max(d.start,m.start),x=Math.min(l.count,Math.min(d.start+d.count,m.start+m.count));for(let b=T,I=x;b<I;b+=3){const C=b,R=b+1,U=b+2;s=gs(this,p,t,i,c,h,u,C,R,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=d.materialIndex,e.push(s))}}else{const v=Math.max(0,m.start),g=Math.min(l.count,m.start+m.count);for(let d=v,p=g;d<p;d+=3){const T=d,x=d+1,b=d+2;s=gs(this,a,t,i,c,h,u,T,x,b),s&&(s.faceIndex=Math.floor(d/3),e.push(s))}}}}function Lh(n,t,e,i,s,r,a,o){let l;if(t.side===Ae?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Ii,o),l===null)return null;ms.copy(o),ms.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ms);return c<e.near||c>e.far?null:{distance:c,point:ms.clone(),object:n}}function gs(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,us),n.getVertexPosition(l,ds),n.getVertexPosition(c,fs);const h=Lh(n,t,e,i,us,ds,fs,Ro);if(h){const u=new w;ei.getBarycoord(Ro,us,ds,fs,u),s&&(h.uv=ei.getInterpolatedAttribute(s,o,l,c,u,new St)),r&&(h.uv1=ei.getInterpolatedAttribute(r,o,l,c,u,new St)),a&&(h.normal=ei.getInterpolatedAttribute(a,o,l,c,u,new w),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new w,materialIndex:0};ei.getNormal(us,ds,fs,f.normal),h.face=f,h.barycoord=u}return h}class re extends Ve{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;v("z","y","x",-1,-1,i,e,t,a,r,0),v("z","y","x",1,-1,i,e,-t,a,r,1),v("x","z","y",1,1,t,i,e,s,a,2),v("x","z","y",1,-1,t,i,-e,s,a,3),v("x","y","z",1,-1,t,e,i,s,r,4),v("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(c,3)),this.setAttribute("normal",new pe(h,3)),this.setAttribute("uv",new pe(u,2));function v(g,d,p,T,x,b,I,C,R,U,Y){const _=b/R,M=I/U,A=b/2,P=I/2,D=C/2,O=R+1,k=U+1;let q=0,H=0;const J=new w;for(let it=0;it<k;it++){const pt=it*M-P;for(let Xt=0;Xt<O;Xt++){const jt=Xt*_-A;J[g]=jt*T,J[d]=pt*x,J[p]=D,c.push(J.x,J.y,J.z),J[g]=0,J[d]=0,J[p]=C>0?1:-1,h.push(J.x,J.y,J.z),u.push(Xt/R),u.push(1-it/U),q+=1}}for(let it=0;it<U;it++)for(let pt=0;pt<R;pt++){const Xt=f+pt+O*it,jt=f+pt+O*(it+1),K=f+(pt+1)+O*(it+1),tt=f+(pt+1)+O*it;l.push(Xt,jt,tt),l.push(jt,K,tt),H+=6}o.addGroup(m,H,Y),m+=H,f+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function En(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function be(n){const t={};for(let e=0;e<n.length;e++){const i=En(n[e]);for(const s in i)t[s]=i[s]}return t}function Ih(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Hl(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const Hs={clone:En,merge:be};var Uh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ae extends Dn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uh,this.fragmentShader=Nh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=En(t.uniforms),this.uniformsGroups=Ih(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Vl extends ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Vt,this.projectionMatrix=new Vt,this.projectionMatrixInverse=new Vt,this.coordinateSystem=vi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new w,Co=new St,Po=new St;class ye extends Vl{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Yn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wn*2*Math.atan(Math.tan(Yn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,Co,Po),e.subVectors(Po,Co)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Yn*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const cn=-90,hn=1;class Fh extends ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ye(cn,hn,t,e);s.layers=this.layers,this.add(s);const r=new ye(cn,hn,t,e);r.layers=this.layers,this.add(r);const a=new ye(cn,hn,t,e);a.layers=this.layers,this.add(a);const o=new ye(cn,hn,t,e);o.layers=this.layers,this.add(o);const l=new ye(cn,hn,t,e);l.layers=this.layers,this.add(l);const c=new ye(cn,hn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===vi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Bs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,m),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Gl extends Se{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:yn,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Oh extends Ye{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Gl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ti}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new re(5,5,5),r=new ae({name:"CubemapFromEquirect",uniforms:En(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ae,blending:yi});r.uniforms.tEquirect.value=e;const a=new It(s,r),o=e.minFilter;return e.minFilter===Yi&&(e.minFilter=ti),new Fh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const wr=new w,zh=new w,Bh=new Nt;class Vi{constructor(t=new w(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=wr.subVectors(i,e).cross(zh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(wr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Bh.getNormalMatrix(t),s=this.coplanarPoint(wr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new Pn,_s=new w;class Ha{constructor(t=new Vi,e=new Vi,i=new Vi,s=new Vi,r=new Vi,a=new Vi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=vi){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],m=s[8],v=s[9],g=s[10],d=s[11],p=s[12],T=s[13],x=s[14],b=s[15];if(i[0].setComponents(l-r,f-c,d-m,b-p).normalize(),i[1].setComponents(l+r,f+c,d+m,b+p).normalize(),i[2].setComponents(l+a,f+h,d+v,b+T).normalize(),i[3].setComponents(l-a,f-h,d-v,b-T).normalize(),i[4].setComponents(l-o,f-u,d-g,b-x).normalize(),e===vi)i[5].setComponents(l+o,f+u,d+g,b+x).normalize();else if(e===Bs)i[5].setComponents(o,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(t){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476,Bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(_s.x=s.normal.x>0?t.max.x:t.min.x,_s.y=s.normal.y>0?t.max.y:t.min.y,_s.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wl(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function kh(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((m,v)=>m.start-v.start);let f=0;for(let m=1;m<u.length;m++){const v=u[f],g=u[m];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++f,u[f]=g)}u.length=f+1;for(let m=0,v=u.length;m<v;m++){const g=u[m];n.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Ie extends Ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,m=[],v=[],g=[],d=[];for(let p=0;p<h;p++){const T=p*f-a;for(let x=0;x<c;x++){const b=x*u-r;v.push(b,-T,0),g.push(0,0,1),d.push(x/o),d.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<o;T++){const x=T+c*p,b=T+c*(p+1),I=T+1+c*(p+1),C=T+1+c*p;m.push(x,b,C),m.push(b,I,C)}this.setIndex(m),this.setAttribute("position",new pe(v,3)),this.setAttribute("normal",new pe(g,3)),this.setAttribute("uv",new pe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ie(t.width,t.height,t.widthSegments,t.heightSegments)}}var Hh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vh=`#ifdef USE_ALPHAHASH
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
#endif`,Gh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yh=`#ifdef USE_AOMAP
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
#endif`,Kh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$h=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
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
#endif`,jh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tu=`#ifdef USE_IRIDESCENCE
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
#endif`,eu=`#ifdef USE_BUMPMAP
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
#endif`,iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,au=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ou=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
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
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,hu=`#define PI 3.141592653589793
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
} // validated`,uu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,du=`vec3 transformedNormal = objectNormal;
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
#endif`,fu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_u="gl_FragColor = linearToOutputTexel( gl_FragColor );",vu=`
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
}`,xu=`#ifdef USE_ENVMAP
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
#endif`,Mu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yu=`#ifdef USE_ENVMAP
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
#endif`,Su=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tu=`#ifdef USE_ENVMAP
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
#endif`,bu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Au=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ru=`#ifdef USE_GRADIENTMAP
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
}`,Cu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Du=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lu=`uniform bool receiveShadow;
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
#endif`,Iu=`#ifdef USE_ENVMAP
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
#endif`,Uu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ou=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zu=`PhysicalMaterial material;
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
#endif`,Bu=`struct PhysicalMaterial {
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
}`,ku=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,Hu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ku=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$u=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ju=`#if defined( USE_POINTS_UV )
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
#endif`,Zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ju=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,td=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ed=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,id=`#ifdef USE_MORPHTARGETS
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
#endif`,nd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ad=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ld=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cd=`#ifdef USE_NORMALMAP
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
#endif`,hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ud=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,md=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,gd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Md=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
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
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Td=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ed=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ad=`#ifdef USE_SKINNING
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
#endif`,Rd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cd=`#ifdef USE_SKINNING
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
#endif`,Pd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ld=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Id=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ud=`#ifdef USE_TRANSMISSION
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
#endif`,Nd=`#ifdef USE_TRANSMISSION
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
#endif`,Fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hd=`uniform sampler2D t2D;
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
}`,Vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`#include <common>
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
}`,Yd=`#if DEPTH_PACKING == 3200
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
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Kd=`#define DISTANCE
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
}`,$d=`#define DISTANCE
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
}`,jd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qd=`uniform float scale;
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
}`,Jd=`uniform vec3 diffuse;
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
}`,tf=`#include <common>
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
}`,ef=`uniform vec3 diffuse;
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
}`,nf=`#define LAMBERT
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
}`,sf=`#define LAMBERT
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
}`,rf=`#define MATCAP
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
}`,af=`#define MATCAP
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
}`,of=`#define NORMAL
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
}`,lf=`#define NORMAL
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
}`,cf=`#define PHONG
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
}`,hf=`#define PHONG
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
}`,uf=`#define STANDARD
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
}`,df=`#define STANDARD
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
}`,ff=`#define TOON
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
}`,pf=`#define TOON
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
}`,mf=`uniform float size;
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
}`,gf=`uniform vec3 diffuse;
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
}`,_f=`#include <common>
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
}`,vf=`uniform vec3 color;
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
}`,xf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,Mf=`uniform vec3 diffuse;
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
}`,Ut={alphahash_fragment:Hh,alphahash_pars_fragment:Vh,alphamap_fragment:Gh,alphamap_pars_fragment:Wh,alphatest_fragment:Xh,alphatest_pars_fragment:qh,aomap_fragment:Yh,aomap_pars_fragment:Kh,batching_pars_vertex:$h,batching_vertex:jh,begin_vertex:Zh,beginnormal_vertex:Qh,bsdfs:Jh,iridescence_fragment:tu,bumpmap_pars_fragment:eu,clipping_planes_fragment:iu,clipping_planes_pars_fragment:nu,clipping_planes_pars_vertex:su,clipping_planes_vertex:ru,color_fragment:au,color_pars_fragment:ou,color_pars_vertex:lu,color_vertex:cu,common:hu,cube_uv_reflection_fragment:uu,defaultnormal_vertex:du,displacementmap_pars_vertex:fu,displacementmap_vertex:pu,emissivemap_fragment:mu,emissivemap_pars_fragment:gu,colorspace_fragment:_u,colorspace_pars_fragment:vu,envmap_fragment:xu,envmap_common_pars_fragment:Mu,envmap_pars_fragment:yu,envmap_pars_vertex:Su,envmap_physical_pars_fragment:Iu,envmap_vertex:Tu,fog_vertex:bu,fog_pars_vertex:wu,fog_fragment:Eu,fog_pars_fragment:Au,gradientmap_pars_fragment:Ru,lightmap_pars_fragment:Cu,lights_lambert_fragment:Pu,lights_lambert_pars_fragment:Du,lights_pars_begin:Lu,lights_toon_fragment:Uu,lights_toon_pars_fragment:Nu,lights_phong_fragment:Fu,lights_phong_pars_fragment:Ou,lights_physical_fragment:zu,lights_physical_pars_fragment:Bu,lights_fragment_begin:ku,lights_fragment_maps:Hu,lights_fragment_end:Vu,logdepthbuf_fragment:Gu,logdepthbuf_pars_fragment:Wu,logdepthbuf_pars_vertex:Xu,logdepthbuf_vertex:qu,map_fragment:Yu,map_pars_fragment:Ku,map_particle_fragment:$u,map_particle_pars_fragment:ju,metalnessmap_fragment:Zu,metalnessmap_pars_fragment:Qu,morphinstance_vertex:Ju,morphcolor_vertex:td,morphnormal_vertex:ed,morphtarget_pars_vertex:id,morphtarget_vertex:nd,normal_fragment_begin:sd,normal_fragment_maps:rd,normal_pars_fragment:ad,normal_pars_vertex:od,normal_vertex:ld,normalmap_pars_fragment:cd,clearcoat_normal_fragment_begin:hd,clearcoat_normal_fragment_maps:ud,clearcoat_pars_fragment:dd,iridescence_pars_fragment:fd,opaque_fragment:pd,packing:md,premultiplied_alpha_fragment:gd,project_vertex:_d,dithering_fragment:vd,dithering_pars_fragment:xd,roughnessmap_fragment:Md,roughnessmap_pars_fragment:yd,shadowmap_pars_fragment:Sd,shadowmap_pars_vertex:Td,shadowmap_vertex:bd,shadowmask_pars_fragment:wd,skinbase_vertex:Ed,skinning_pars_vertex:Ad,skinning_vertex:Rd,skinnormal_vertex:Cd,specularmap_fragment:Pd,specularmap_pars_fragment:Dd,tonemapping_fragment:Ld,tonemapping_pars_fragment:Id,transmission_fragment:Ud,transmission_pars_fragment:Nd,uv_pars_fragment:Fd,uv_pars_vertex:Od,uv_vertex:zd,worldpos_vertex:Bd,background_vert:kd,background_frag:Hd,backgroundCube_vert:Vd,backgroundCube_frag:Gd,cube_vert:Wd,cube_frag:Xd,depth_vert:qd,depth_frag:Yd,distanceRGBA_vert:Kd,distanceRGBA_frag:$d,equirect_vert:jd,equirect_frag:Zd,linedashed_vert:Qd,linedashed_frag:Jd,meshbasic_vert:tf,meshbasic_frag:ef,meshlambert_vert:nf,meshlambert_frag:sf,meshmatcap_vert:rf,meshmatcap_frag:af,meshnormal_vert:of,meshnormal_frag:lf,meshphong_vert:cf,meshphong_frag:hf,meshphysical_vert:uf,meshphysical_frag:df,meshtoon_vert:ff,meshtoon_frag:pf,points_vert:mf,points_frag:gf,shadow_vert:_f,shadow_frag:vf,sprite_vert:xf,sprite_frag:Mf},st={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},ri={basic:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:be([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:be([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:be([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:be([st.points,st.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:be([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:be([st.common,st.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:be([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:be([st.sprite,st.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:be([st.common,st.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:be([st.lights,st.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};ri.physical={uniforms:be([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const vs={r:0,b:0,g:0},ki=new Re,yf=new Vt;function Sf(n,t,e,i,s,r,a){const o=new Tt(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function v(T){let x=T.isScene===!0?T.background:null;return x&&x.isTexture&&(x=(T.backgroundBlurriness>0?e:t).get(x)),x}function g(T){let x=!1;const b=v(T);b===null?p(o,l):b&&b.isColor&&(p(b,1),x=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,a):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function d(T,x){const b=v(x);b&&(b.isCubeTexture||b.mapping===Ys)?(h===void 0&&(h=new It(new re(1,1,1),new ae({name:"BackgroundCubeMaterial",uniforms:En(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ki.copy(x.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(yf.makeRotationFromEuler(ki)),h.material.toneMapped=$t.getTransfer(b.colorSpace)!==se,(u!==b||f!==b.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=b,f=b.version,m=n.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new It(new Ie(2,2),new ae({name:"BackgroundMaterial",uniforms:En(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=$t.getTransfer(b.colorSpace)!==se,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,f=b.version,m=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,x){T.getRGB(vs,Hl(n)),i.buffers.color.setClear(vs.r,vs.g,vs.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(T,x=1){o.set(T),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:g,addToRenderList:d}}function Tf(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(_,M,A,P,D){let O=!1;const k=u(P,A,M);r!==k&&(r=k,c(r.object)),O=m(_,P,A,D),O&&v(_,P,A,D),D!==null&&t.update(D,n.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,b(_,M,A,P),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return n.createVertexArray()}function c(_){return n.bindVertexArray(_)}function h(_){return n.deleteVertexArray(_)}function u(_,M,A){const P=A.wireframe===!0;let D=i[_.id];D===void 0&&(D={},i[_.id]=D);let O=D[M.id];O===void 0&&(O={},D[M.id]=O);let k=O[P];return k===void 0&&(k=f(l()),O[P]=k),k}function f(_){const M=[],A=[],P=[];for(let D=0;D<e;D++)M[D]=0,A[D]=0,P[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:A,attributeDivisors:P,object:_,attributes:{},index:null}}function m(_,M,A,P){const D=r.attributes,O=M.attributes;let k=0;const q=A.getAttributes();for(const H in q)if(q[H].location>=0){const it=D[H];let pt=O[H];if(pt===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(pt=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(pt=_.instanceColor)),it===void 0||it.attribute!==pt||pt&&it.data!==pt.data)return!0;k++}return r.attributesNum!==k||r.index!==P}function v(_,M,A,P){const D={},O=M.attributes;let k=0;const q=A.getAttributes();for(const H in q)if(q[H].location>=0){let it=O[H];it===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(it=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(it=_.instanceColor));const pt={};pt.attribute=it,it&&it.data&&(pt.data=it.data),D[H]=pt,k++}r.attributes=D,r.attributesNum=k,r.index=P}function g(){const _=r.newAttributes;for(let M=0,A=_.length;M<A;M++)_[M]=0}function d(_){p(_,0)}function p(_,M){const A=r.newAttributes,P=r.enabledAttributes,D=r.attributeDivisors;A[_]=1,P[_]===0&&(n.enableVertexAttribArray(_),P[_]=1),D[_]!==M&&(n.vertexAttribDivisor(_,M),D[_]=M)}function T(){const _=r.newAttributes,M=r.enabledAttributes;for(let A=0,P=M.length;A<P;A++)M[A]!==_[A]&&(n.disableVertexAttribArray(A),M[A]=0)}function x(_,M,A,P,D,O,k){k===!0?n.vertexAttribIPointer(_,M,A,D,O):n.vertexAttribPointer(_,M,A,P,D,O)}function b(_,M,A,P){g();const D=P.attributes,O=A.getAttributes(),k=M.defaultAttributeValues;for(const q in O){const H=O[q];if(H.location>=0){let J=D[q];if(J===void 0&&(q==="instanceMatrix"&&_.instanceMatrix&&(J=_.instanceMatrix),q==="instanceColor"&&_.instanceColor&&(J=_.instanceColor)),J!==void 0){const it=J.normalized,pt=J.itemSize,Xt=t.get(J);if(Xt===void 0)continue;const jt=Xt.buffer,K=Xt.type,tt=Xt.bytesPerElement,gt=K===n.INT||K===n.UNSIGNED_INT||J.gpuType===Pa;if(J.isInterleavedBufferAttribute){const ht=J.data,Dt=ht.stride,wt=J.offset;if(ht.isInstancedInterleavedBuffer){for(let zt=0;zt<H.locationSize;zt++)p(H.location+zt,ht.meshPerAttribute);_.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let zt=0;zt<H.locationSize;zt++)d(H.location+zt);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let zt=0;zt<H.locationSize;zt++)x(H.location+zt,pt/H.locationSize,K,it,Dt*tt,(wt+pt/H.locationSize*zt)*tt,gt)}else{if(J.isInstancedBufferAttribute){for(let ht=0;ht<H.locationSize;ht++)p(H.location+ht,J.meshPerAttribute);_.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ht=0;ht<H.locationSize;ht++)d(H.location+ht);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let ht=0;ht<H.locationSize;ht++)x(H.location+ht,pt/H.locationSize,K,it,pt*tt,pt/H.locationSize*ht*tt,gt)}}else if(k!==void 0){const it=k[q];if(it!==void 0)switch(it.length){case 2:n.vertexAttrib2fv(H.location,it);break;case 3:n.vertexAttrib3fv(H.location,it);break;case 4:n.vertexAttrib4fv(H.location,it);break;default:n.vertexAttrib1fv(H.location,it)}}}}T()}function I(){U();for(const _ in i){const M=i[_];for(const A in M){const P=M[A];for(const D in P)h(P[D].object),delete P[D];delete M[A]}delete i[_]}}function C(_){if(i[_.id]===void 0)return;const M=i[_.id];for(const A in M){const P=M[A];for(const D in P)h(P[D].object),delete P[D];delete M[A]}delete i[_.id]}function R(_){for(const M in i){const A=i[M];if(A[_.id]===void 0)continue;const P=A[_.id];for(const D in P)h(P[D].object),delete P[D];delete A[_.id]}}function U(){Y(),a=!0,r!==s&&(r=s,c(r.object))}function Y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:Y,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:g,enableAttribute:d,disableUnusedAttributes:T}}function bf(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v];e.update(m,i,1)}function l(c,h,u,f){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<c.length;v++)a(c[v],h[v],f[v]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let v=0;for(let g=0;g<u;g++)v+=h[g];for(let g=0;g<f.length;g++)e.update(v,i,f[g])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function wf(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==ni&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Si&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ai&&!U)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const R=t.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=v>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:d,maxAttributes:p,maxVertexUniforms:T,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:I,maxSamples:C}}function Ef(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Vi,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||s;return s=f,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,m){const v=u.clippingPlanes,g=u.clipIntersection,d=u.clipShadows,p=n.get(u);if(!s||v===null||v.length===0||r&&!d)r?h(null):c();else{const T=r?0:i,x=T*4;let b=p.clippingState||null;l.value=b,b=h(v,f,x,m);for(let I=0;I!==x;++I)b[I]=e[I];p.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,m,v){const g=u!==null?u.length:0;let d=null;if(g!==0){if(d=l.value,v!==!0||d===null){const p=m+g*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(d===null||d.length<p)&&(d=new Float32Array(p));for(let x=0,b=m;x!==g;++x,b+=4)a.copy(u[x]).applyMatrix4(T,o),a.normal.toArray(d,b),d[b+3]=a.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,d}}function Af(n){let t=new WeakMap;function e(a,o){return o===jr?a.mapping=yn:o===Zr&&(a.mapping=Sn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===jr||o===Zr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Oh(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Va extends Vl{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const gn=4,Do=[.125,.215,.35,.446,.526,.582],Xi=20,Er=new Va,Lo=new Tt;let Ar=null,Rr=0,Cr=0,Pr=!1;const Gi=(1+Math.sqrt(5))/2,un=1/Gi,Io=[new w(-Gi,un,0),new w(Gi,un,0),new w(-un,0,Gi),new w(un,0,Gi),new w(0,Gi,-un),new w(0,Gi,un),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Uo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Oo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ar,Rr,Cr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,xs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yn||t.mapping===Sn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ar=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ti,minFilter:ti,generateMipmaps:!1,type:oi,format:ni,colorSpace:Ui,depthBuffer:!1},s=No(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=No(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rf(r)),this._blurMaterial=Cf(r,t,e)}return s}_compileMaterial(t){const e=new It(this._lodPlanes[0],t);this._renderer.compile(e,Er)}_sceneToCubeUV(t,e,i,s){const o=new ye(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Lo),h.toneMapping=Li,h.autoClear=!1;const m=new qe({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),v=new It(new re,m);let g=!1;const d=t.background;d?d.isColor&&(m.color.copy(d),t.background=null,g=!0):(m.color.copy(Lo),g=!0);for(let p=0;p<6;p++){const T=p%3;T===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):T===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;xs(s,T*x,p>2?x:0,x,x),h.setRenderTarget(s),g&&h.render(v,o),h.render(t,o)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=d}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===yn||t.mapping===Sn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Oo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new It(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;xs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Er)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Io[(s-r-1)%Io.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new It(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Xi-1),g=r/v,d=isFinite(r)?1+Math.floor(h*g):Xi;d>Xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Xi}`);const p=[];let T=0;for(let R=0;R<Xi;++R){const U=R/g,Y=Math.exp(-U*U/2);p.push(Y),R===0?T+=Y:R<d&&(T+=2*Y)}for(let R=0;R<p.length;R++)p[R]=p[R]/T;f.envMap.value=t.texture,f.samples.value=d,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=v,f.mipInt.value=x-i;const b=this._sizeLods[s],I=3*b*(s>x-gn?s-x+gn:0),C=4*(this._cubeSize-b);xs(e,I,C,3*b,2*b),l.setRenderTarget(e),l.render(u,Er)}}function Rf(n){const t=[],e=[],i=[];let s=n;const r=n-gn+1+Do.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-gn?l=Do[a-n+gn-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,v=6,g=3,d=2,p=1,T=new Float32Array(g*v*m),x=new Float32Array(d*v*m),b=new Float32Array(p*v*m);for(let C=0;C<m;C++){const R=C%3*2/3-1,U=C>2?0:-1,Y=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];T.set(Y,g*v*C),x.set(f,d*v*C);const _=[C,C,C,C,C,C];b.set(_,p*v*C)}const I=new Ve;I.setAttribute("position",new Ke(T,g)),I.setAttribute("uv",new Ke(x,d)),I.setAttribute("faceIndex",new Ke(b,p)),t.push(I),s>gn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function No(n,t,e){const i=new Ye(n,t,e);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xs(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Cf(n,t,e){const i=new Float32Array(Xi),s=new w(0,1,0);return new ae({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Fo(){return new ae({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ga(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Oo(){return new ae({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ga(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Ga(){return`

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
	`}function Pf(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===jr||l===Zr,h=l===yn||l===Sn;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Uo(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Uo(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Df(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Is("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Lf(n,t,e,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const v in f.attributes)t.remove(f.attributes[v]);for(const v in f.morphAttributes){const g=f.morphAttributes[v];for(let d=0,p=g.length;d<p;d++)t.remove(g[d])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const v in f)t.update(f[v],n.ARRAY_BUFFER);const m=u.morphAttributes;for(const v in m){const g=m[v];for(let d=0,p=g.length;d<p;d++)t.update(g[d],n.ARRAY_BUFFER)}}function c(u){const f=[],m=u.index,v=u.attributes.position;let g=0;if(m!==null){const T=m.array;g=m.version;for(let x=0,b=T.length;x<b;x+=3){const I=T[x+0],C=T[x+1],R=T[x+2];f.push(I,C,C,R,R,I)}}else if(v!==void 0){const T=v.array;g=v.version;for(let x=0,b=T.length/3-1;x<b;x+=3){const I=x+0,C=x+1,R=x+2;f.push(I,C,C,R,R,I)}}else return;const d=new(Nl(f)?kl:Bl)(f,1);d.version=g;const p=r.get(u);p&&t.remove(p),r.set(u,d)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function If(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,m){n.drawElements(i,m,r,f*a),e.update(m,i,1)}function c(f,m,v){v!==0&&(n.drawElementsInstanced(i,m,r,f*a,v),e.update(m,i,v))}function h(f,m,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,f,0,v);let d=0;for(let p=0;p<v;p++)d+=m[p];e.update(d,i,1)}function u(f,m,v,g){if(v===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let p=0;p<f.length;p++)c(f[p]/a,m[p],g[p]);else{d.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,g,0,v);let p=0;for(let T=0;T<v;T++)p+=m[T];for(let T=0;T<g.length;T++)e.update(p,i,g[T])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Uf(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Nf(n,t,e){const i=new WeakMap,s=new Jt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let _=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",_)};var m=_;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,d=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let b=0;v===!0&&(b=1),g===!0&&(b=2),d===!0&&(b=3);let I=o.attributes.position.count*b,C=1;I>t.maxTextureSize&&(C=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const R=new Float32Array(I*C*4*u),U=new Ol(R,I,C,u);U.type=ai,U.needsUpdate=!0;const Y=b*4;for(let M=0;M<u;M++){const A=p[M],P=T[M],D=x[M],O=I*C*4*M;for(let k=0;k<A.count;k++){const q=k*Y;v===!0&&(s.fromBufferAttribute(A,k),R[O+q+0]=s.x,R[O+q+1]=s.y,R[O+q+2]=s.z,R[O+q+3]=0),g===!0&&(s.fromBufferAttribute(P,k),R[O+q+4]=s.x,R[O+q+5]=s.y,R[O+q+6]=s.z,R[O+q+7]=0),d===!0&&(s.fromBufferAttribute(D,k),R[O+q+8]=s.x,R[O+q+9]=s.y,R[O+q+10]=s.z,R[O+q+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:U,size:new St(I,C)},i.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let v=0;for(let d=0;d<c.length;d++)v+=c[d];const g=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Ff(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Xl extends Se{constructor(t,e,i,s,r,a,o,l,c,h=_n){if(h!==_n&&h!==bn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===_n&&(i=$i),i===void 0&&h===bn&&(i=Tn),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Le,this.minFilter=l!==void 0?l:Le,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ql=new Se,zo=new Xl(1,1),Yl=new Ol,Kl=new Sh,$l=new Gl,Bo=[],ko=[],Ho=new Float32Array(16),Vo=new Float32Array(9),Go=new Float32Array(4);function Ln(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Bo[s];if(r===void 0&&(r=new Float32Array(s),Bo[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function ge(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function $s(n,t){let e=ko[t];e===void 0&&(e=new Int32Array(t),ko[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Of(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function zf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;n.uniform2fv(this.addr,t),ge(e,t)}}function Bf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;n.uniform3fv(this.addr,t),ge(e,t)}}function kf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;n.uniform4fv(this.addr,t),ge(e,t)}}function Hf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,i))return;Go.set(i),n.uniformMatrix2fv(this.addr,!1,Go),ge(e,i)}}function Vf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,i))return;Vo.set(i),n.uniformMatrix3fv(this.addr,!1,Vo),ge(e,i)}}function Gf(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,i))return;Ho.set(i),n.uniformMatrix4fv(this.addr,!1,Ho),ge(e,i)}}function Wf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Xf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;n.uniform2iv(this.addr,t),ge(e,t)}}function qf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;n.uniform3iv(this.addr,t),ge(e,t)}}function Yf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;n.uniform4iv(this.addr,t),ge(e,t)}}function Kf(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function $f(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;n.uniform2uiv(this.addr,t),ge(e,t)}}function jf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;n.uniform3uiv(this.addr,t),ge(e,t)}}function Zf(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;n.uniform4uiv(this.addr,t),ge(e,t)}}function Qf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(zo.compareFunction=Il,r=zo):r=ql,e.setTexture2D(t||r,s)}function Jf(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Kl,s)}function tp(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||$l,s)}function ep(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Yl,s)}function ip(n){switch(n){case 5126:return Of;case 35664:return zf;case 35665:return Bf;case 35666:return kf;case 35674:return Hf;case 35675:return Vf;case 35676:return Gf;case 5124:case 35670:return Wf;case 35667:case 35671:return Xf;case 35668:case 35672:return qf;case 35669:case 35673:return Yf;case 5125:return Kf;case 36294:return $f;case 36295:return jf;case 36296:return Zf;case 35678:case 36198:case 36298:case 36306:case 35682:return Qf;case 35679:case 36299:case 36307:return Jf;case 35680:case 36300:case 36308:case 36293:return tp;case 36289:case 36303:case 36311:case 36292:return ep}}function np(n,t){n.uniform1fv(this.addr,t)}function sp(n,t){const e=Ln(t,this.size,2);n.uniform2fv(this.addr,e)}function rp(n,t){const e=Ln(t,this.size,3);n.uniform3fv(this.addr,e)}function ap(n,t){const e=Ln(t,this.size,4);n.uniform4fv(this.addr,e)}function op(n,t){const e=Ln(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function lp(n,t){const e=Ln(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function cp(n,t){const e=Ln(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function hp(n,t){n.uniform1iv(this.addr,t)}function up(n,t){n.uniform2iv(this.addr,t)}function dp(n,t){n.uniform3iv(this.addr,t)}function fp(n,t){n.uniform4iv(this.addr,t)}function pp(n,t){n.uniform1uiv(this.addr,t)}function mp(n,t){n.uniform2uiv(this.addr,t)}function gp(n,t){n.uniform3uiv(this.addr,t)}function _p(n,t){n.uniform4uiv(this.addr,t)}function vp(n,t,e){const i=this.cache,s=t.length,r=$s(e,s);me(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ql,r[a])}function xp(n,t,e){const i=this.cache,s=t.length,r=$s(e,s);me(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Kl,r[a])}function Mp(n,t,e){const i=this.cache,s=t.length,r=$s(e,s);me(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||$l,r[a])}function yp(n,t,e){const i=this.cache,s=t.length,r=$s(e,s);me(i,r)||(n.uniform1iv(this.addr,r),ge(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Yl,r[a])}function Sp(n){switch(n){case 5126:return np;case 35664:return sp;case 35665:return rp;case 35666:return ap;case 35674:return op;case 35675:return lp;case 35676:return cp;case 5124:case 35670:return hp;case 35667:case 35671:return up;case 35668:case 35672:return dp;case 35669:case 35673:return fp;case 5125:return pp;case 36294:return mp;case 36295:return gp;case 36296:return _p;case 35678:case 36198:case 36298:case 36306:case 35682:return vp;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return yp}}class Tp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=ip(e.type)}}class bp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sp(e.type)}}class wp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Dr=/(\w+)(\])?(\[|\.)?/g;function Wo(n,t){n.seq.push(t),n.map[t.id]=t}function Ep(n,t,e){const i=n.name,s=i.length;for(Dr.lastIndex=0;;){const r=Dr.exec(i),a=Dr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Wo(e,c===void 0?new Tp(o,n,t):new bp(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new wp(o),Wo(e,u)),e=u}}}class Us{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Ep(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Xo(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Ap=37297;let Rp=0;function Cp(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function Pp(n){const t=$t.getPrimaries($t.workingColorSpace),e=$t.getPrimaries(n);let i;switch(t===e?i="":t===zs&&e===Os?i="LinearDisplayP3ToLinearSRGB":t===Os&&e===zs&&(i="LinearSRGBToLinearDisplayP3"),n){case Ui:case Ks:return[i,"LinearTransferOETF"];case Be:case Oa:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function qo(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Cp(n.getShaderSource(t),a)}else return s}function Dp(n,t){const e=Pp(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Lp(n,t){let e;switch(t){case Uc:e="Linear";break;case Nc:e="Reinhard";break;case Fc:e="Cineon";break;case yl:e="ACESFilmic";break;case zc:e="AgX";break;case Bc:e="Neutral";break;case Oc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ms=new w;function Ip(){$t.getLuminanceCoefficients(Ms);const n=Ms.x.toFixed(4),t=Ms.y.toFixed(4),e=Ms.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Up(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qn).join(`
`)}function Np(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Fp(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function qn(n){return n!==""}function Yo(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ko(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Op=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(n){return n.replace(Op,Bp)}const zp=new Map;function Bp(n,t){let e=Ut[t];if(e===void 0){const i=zp.get(t);if(i!==void 0)e=Ut[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const kp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $o(n){return n.replace(kp,Hp)}function Hp(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function jo(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Vp(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vl?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===xl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===_i&&(t="SHADOWMAP_TYPE_VSM"),t}function Gp(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case yn:case Sn:t="ENVMAP_TYPE_CUBE";break;case Ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wp(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Sn:t="ENVMAP_MODE_REFRACTION";break}return t}function Xp(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ml:t="ENVMAP_BLENDING_MULTIPLY";break;case Lc:t="ENVMAP_BLENDING_MIX";break;case Ic:t="ENVMAP_BLENDING_ADD";break}return t}function qp(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function Yp(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Vp(e),c=Gp(e),h=Wp(e),u=Xp(e),f=qp(e),m=Up(e),v=Np(r),g=s.createProgram();let d,p,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(qn).join(`
`),d.length>0&&(d+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(qn).join(`
`),p.length>0&&(p+=`
`)):(d=[jo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qn).join(`
`),p=[jo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Li?"#define TONE_MAPPING":"",e.toneMapping!==Li?Ut.tonemapping_pars_fragment:"",e.toneMapping!==Li?Lp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,Dp("linearToOutputTexel",e.outputColorSpace),Ip(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qn).join(`
`)),a=Ea(a),a=Yo(a,e),a=Ko(a,e),o=Ea(o),o=Yo(o,e),o=Ko(o,e),a=$o(a),o=$o(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,d=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,p=["#define varying in",e.glslVersion===uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=T+d+a,b=T+p+o,I=Xo(s,s.VERTEX_SHADER,x),C=Xo(s,s.FRAGMENT_SHADER,b);s.attachShader(g,I),s.attachShader(g,C),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function R(M){if(n.debug.checkShaderErrors){const A=s.getProgramInfoLog(g).trim(),P=s.getShaderInfoLog(I).trim(),D=s.getShaderInfoLog(C).trim();let O=!0,k=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,I,C);else{const q=qo(s,I,"vertex"),H=qo(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+A+`
`+q+`
`+H)}else A!==""?console.warn("THREE.WebGLProgram: Program Info Log:",A):(P===""||D==="")&&(k=!1);k&&(M.diagnostics={runnable:O,programLog:A,vertexShader:{log:P,prefix:d},fragmentShader:{log:D,prefix:p}})}s.deleteShader(I),s.deleteShader(C),U=new Us(s,g),Y=Fp(s,g)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let Y;this.getAttributes=function(){return Y===void 0&&R(this),Y};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(g,Ap)),_},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Rp++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=I,this.fragmentShader=C,this}let Kp=0;class $p{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new jp(t),e.set(t,i)),i}}class jp{constructor(t){this.id=Kp++,this.code=t,this.usedTimes=0}}function Zp(n,t,e,i,s,r,a){const o=new ka,l=new $p,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,m=s.vertexTextures;let v=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(_){return c.add(_),_===0?"uv":`uv${_}`}function p(_,M,A,P,D){const O=P.fog,k=D.geometry,q=_.isMeshStandardMaterial?P.environment:null,H=(_.isMeshStandardMaterial?e:t).get(_.envMap||q),J=H&&H.mapping===Ys?H.image.height:null,it=g[_.type];_.precision!==null&&(v=s.getMaxPrecision(_.precision),v!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",v,"instead."));const pt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Xt=pt!==void 0?pt.length:0;let jt=0;k.morphAttributes.position!==void 0&&(jt=1),k.morphAttributes.normal!==void 0&&(jt=2),k.morphAttributes.color!==void 0&&(jt=3);let K,tt,gt,ht;if(it){const Pe=ri[it];K=Pe.vertexShader,tt=Pe.fragmentShader}else K=_.vertexShader,tt=_.fragmentShader,l.update(_),gt=l.getVertexShaderID(_),ht=l.getFragmentShaderID(_);const Dt=n.getRenderTarget(),wt=D.isInstancedMesh===!0,zt=D.isBatchedMesh===!0,Qt=!!_.map,Bt=!!_.matcap,L=!!H,Ue=!!_.aoMap,Ft=!!_.lightMap,Gt=!!_.bumpMap,At=!!_.normalMap,ie=!!_.displacementMap,Pt=!!_.emissiveMap,E=!!_.metalnessMap,y=!!_.roughnessMap,V=_.anisotropy>0,j=_.clearcoat>0,Q=_.dispersion>0,$=_.iridescence>0,xt=_.sheen>0,rt=_.transmission>0,ut=V&&!!_.anisotropyMap,Wt=j&&!!_.clearcoatMap,et=j&&!!_.clearcoatNormalMap,dt=j&&!!_.clearcoatRoughnessMap,Rt=$&&!!_.iridescenceMap,Ct=$&&!!_.iridescenceThicknessMap,ft=xt&&!!_.sheenColorMap,Ot=xt&&!!_.sheenRoughnessMap,Lt=!!_.specularMap,te=!!_.specularColorMap,N=!!_.specularIntensityMap,lt=rt&&!!_.transmissionMap,X=rt&&!!_.thicknessMap,Z=!!_.gradientMap,at=!!_.alphaMap,ct=_.alphaTest>0,kt=!!_.alphaHash,de=!!_.extensions;let Ce=Li;_.toneMapped&&(Dt===null||Dt.isXRRenderTarget===!0)&&(Ce=n.toneMapping);const qt={shaderID:it,shaderType:_.type,shaderName:_.name,vertexShader:K,fragmentShader:tt,defines:_.defines,customVertexShaderID:gt,customFragmentShaderID:ht,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:v,batching:zt,batchingColor:zt&&D._colorsTexture!==null,instancing:wt,instancingColor:wt&&D.instanceColor!==null,instancingMorph:wt&&D.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Dt===null?n.outputColorSpace:Dt.isXRRenderTarget===!0?Dt.texture.colorSpace:Ui,alphaToCoverage:!!_.alphaToCoverage,map:Qt,matcap:Bt,envMap:L,envMapMode:L&&H.mapping,envMapCubeUVHeight:J,aoMap:Ue,lightMap:Ft,bumpMap:Gt,normalMap:At,displacementMap:m&&ie,emissiveMap:Pt,normalMapObjectSpace:At&&_.normalMapType===Gc,normalMapTangentSpace:At&&_.normalMapType===Ll,metalnessMap:E,roughnessMap:y,anisotropy:V,anisotropyMap:ut,clearcoat:j,clearcoatMap:Wt,clearcoatNormalMap:et,clearcoatRoughnessMap:dt,dispersion:Q,iridescence:$,iridescenceMap:Rt,iridescenceThicknessMap:Ct,sheen:xt,sheenColorMap:ft,sheenRoughnessMap:Ot,specularMap:Lt,specularColorMap:te,specularIntensityMap:N,transmission:rt,transmissionMap:lt,thicknessMap:X,gradientMap:Z,opaque:_.transparent===!1&&_.blending===Ki&&_.alphaToCoverage===!1,alphaMap:at,alphaTest:ct,alphaHash:kt,combine:_.combine,mapUv:Qt&&d(_.map.channel),aoMapUv:Ue&&d(_.aoMap.channel),lightMapUv:Ft&&d(_.lightMap.channel),bumpMapUv:Gt&&d(_.bumpMap.channel),normalMapUv:At&&d(_.normalMap.channel),displacementMapUv:ie&&d(_.displacementMap.channel),emissiveMapUv:Pt&&d(_.emissiveMap.channel),metalnessMapUv:E&&d(_.metalnessMap.channel),roughnessMapUv:y&&d(_.roughnessMap.channel),anisotropyMapUv:ut&&d(_.anisotropyMap.channel),clearcoatMapUv:Wt&&d(_.clearcoatMap.channel),clearcoatNormalMapUv:et&&d(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&d(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&d(_.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&d(_.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&d(_.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&d(_.sheenRoughnessMap.channel),specularMapUv:Lt&&d(_.specularMap.channel),specularColorMapUv:te&&d(_.specularColorMap.channel),specularIntensityMapUv:N&&d(_.specularIntensityMap.channel),transmissionMapUv:lt&&d(_.transmissionMap.channel),thicknessMapUv:X&&d(_.thicknessMap.channel),alphaMapUv:at&&d(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(At||V),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!k.attributes.uv&&(Qt||at),fog:!!O,useFog:_.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:D.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Xt,morphTextureStride:jt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,decodeVideoTexture:Qt&&_.map.isVideoTexture===!0&&$t.getTransfer(_.map.colorSpace)===se,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ce,flipSided:_.side===Ae,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:de&&_.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&_.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return qt.vertexUv1s=c.has(1),qt.vertexUv2s=c.has(2),qt.vertexUv3s=c.has(3),c.clear(),qt}function T(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const A in _.defines)M.push(A),M.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(x(M,_),b(M,_),M.push(n.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function x(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function b(_,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.alphaToCoverage&&o.enable(20),_.push(o.mask)}function I(_){const M=g[_.type];let A;if(M){const P=ri[M];A=Hs.clone(P.uniforms)}else A=_.uniforms;return A}function C(_,M){let A;for(let P=0,D=h.length;P<D;P++){const O=h[P];if(O.cacheKey===M){A=O,++A.usedTimes;break}}return A===void 0&&(A=new Yp(n,M,_,r),h.push(A)),A}function R(_){if(--_.usedTimes===0){const M=h.indexOf(_);h[M]=h[h.length-1],h.pop(),_.destroy()}}function U(_){l.remove(_)}function Y(){l.dispose()}return{getParameters:p,getProgramCacheKey:T,getUniforms:I,acquireProgram:C,releaseProgram:R,releaseShaderCache:U,programs:h,dispose:Y}}function Qp(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Jp(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Zo(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Qo(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,m,v,g,d){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:m,groupOrder:v,renderOrder:u.renderOrder,z:g,group:d},n[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=m,p.groupOrder=v,p.renderOrder=u.renderOrder,p.z=g,p.group=d),t++,p}function o(u,f,m,v,g,d){const p=a(u,f,m,v,g,d);m.transmission>0?i.push(p):m.transparent===!0?s.push(p):e.push(p)}function l(u,f,m,v,g,d){const p=a(u,f,m,v,g,d);m.transmission>0?i.unshift(p):m.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Jp),i.length>1&&i.sort(f||Zo),s.length>1&&s.sort(f||Zo)}function h(){for(let u=t,f=n.length;u<f;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function tm(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Qo,n.set(i,[a])):s>=r.length?(a=new Qo,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function em(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new w,color:new Tt};break;case"SpotLight":e={position:new w,direction:new w,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new w,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new w,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new w,halfWidth:new w,halfHeight:new w};break}return n[t.id]=e,e}}}function im(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let nm=0;function sm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function rm(n){const t=new em,e=im(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new w);const s=new w,r=new Vt,a=new Vt;function o(c){let h=0,u=0,f=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let m=0,v=0,g=0,d=0,p=0,T=0,x=0,b=0,I=0,C=0,R=0;c.sort(sm);for(let Y=0,_=c.length;Y<_;Y++){const M=c[Y],A=M.color,P=M.intensity,D=M.distance,O=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=A.r*P,u+=A.g*P,f+=A.b*P;else if(M.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(M.sh.coefficients[k],P);R++}else if(M.isDirectionalLight){const k=t.get(M);if(k.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const q=M.shadow,H=e.get(M);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=M.shadow.matrix,T++}i.directional[m]=k,m++}else if(M.isSpotLight){const k=t.get(M);k.position.setFromMatrixPosition(M.matrixWorld),k.color.copy(A).multiplyScalar(P),k.distance=D,k.coneCos=Math.cos(M.angle),k.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),k.decay=M.decay,i.spot[g]=k;const q=M.shadow;if(M.map&&(i.spotLightMap[I]=M.map,I++,q.updateMatrices(M),M.castShadow&&C++),i.spotLightMatrix[g]=q.matrix,M.castShadow){const H=e.get(M);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.spotShadow[g]=H,i.spotShadowMap[g]=O,b++}g++}else if(M.isRectAreaLight){const k=t.get(M);k.color.copy(A).multiplyScalar(P),k.halfWidth.set(M.width*.5,0,0),k.halfHeight.set(0,M.height*.5,0),i.rectArea[d]=k,d++}else if(M.isPointLight){const k=t.get(M);if(k.color.copy(M.color).multiplyScalar(M.intensity),k.distance=M.distance,k.decay=M.decay,M.castShadow){const q=M.shadow,H=e.get(M);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,i.pointShadow[v]=H,i.pointShadowMap[v]=O,i.pointShadowMatrix[v]=M.shadow.matrix,x++}i.point[v]=k,v++}else if(M.isHemisphereLight){const k=t.get(M);k.skyColor.copy(M.color).multiplyScalar(P),k.groundColor.copy(M.groundColor).multiplyScalar(P),i.hemi[p]=k,p++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=st.LTC_FLOAT_1,i.rectAreaLTC2=st.LTC_FLOAT_2):(i.rectAreaLTC1=st.LTC_HALF_1,i.rectAreaLTC2=st.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==m||U.pointLength!==v||U.spotLength!==g||U.rectAreaLength!==d||U.hemiLength!==p||U.numDirectionalShadows!==T||U.numPointShadows!==x||U.numSpotShadows!==b||U.numSpotMaps!==I||U.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=g,i.rectArea.length=d,i.point.length=v,i.hemi.length=p,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=b+I-C,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=R,U.directionalLength=m,U.pointLength=v,U.spotLength=g,U.rectAreaLength=d,U.hemiLength=p,U.numDirectionalShadows=T,U.numPointShadows=x,U.numSpotShadows=b,U.numSpotMaps=I,U.numLightProbes=R,i.version=nm++)}function l(c,h){let u=0,f=0,m=0,v=0,g=0;const d=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){const x=c[p];if(x.isDirectionalLight){const b=i.directional[u];b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),u++}else if(x.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(d),b.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(d),m++}else if(x.isRectAreaLight){const b=i.rectArea[v];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(d),a.identity(),r.copy(x.matrixWorld),r.premultiply(d),a.extractRotation(r),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(d),f++}else if(x.isHemisphereLight){const b=i.hemi[g];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(d),g++}}}return{setup:o,setupView:l,state:i}}function Jo(n){const t=new rm(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function am(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Jo(n),t.set(s,[o])):r>=a.length?(o=new Jo(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class om extends Dn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class lm extends Dn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const cm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hm=`uniform sampler2D shadow_pass;
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
}`;function um(n,t,e){let i=new Ha;const s=new St,r=new St,a=new Jt,o=new om({depthPacking:Vc}),l=new lm,c={},h=e.maxTextureSize,u={[Ii]:Ae,[Ae]:Ii,[ce]:ce},f=new ae({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:cm,fragmentShader:hm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const v=new Ve;v.setAttribute("position",new Ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new It(v,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vl;let p=this.type;this.render=function(C,R,U){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;const Y=n.getRenderTarget(),_=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),A=n.state;A.setBlending(yi),A.buffers.color.setClear(1,1,1,1),A.buffers.depth.setTest(!0),A.setScissorTest(!1);const P=p!==_i&&this.type===_i,D=p===_i&&this.type!==_i;for(let O=0,k=C.length;O<k;O++){const q=C[O],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const J=H.getFrameExtents();if(s.multiply(J),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,H.mapSize.y=r.y)),H.map===null||P===!0||D===!0){const pt=this.type!==_i?{minFilter:Le,magFilter:Le}:{};H.map!==null&&H.map.dispose(),H.map=new Ye(s.x,s.y,pt),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const it=H.getViewportCount();for(let pt=0;pt<it;pt++){const Xt=H.getViewport(pt);a.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),A.viewport(a),H.updateMatrices(q,pt),i=H.getFrustum(),b(R,U,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===_i&&T(H,U),H.needsUpdate=!1}p=this.type,d.needsUpdate=!1,n.setRenderTarget(Y,_,M)};function T(C,R){const U=t.update(g);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ye(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(R,null,U,f,g,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(R,null,U,m,g,null)}function x(C,R,U,Y){let _=null;const M=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(M!==void 0)_=M;else if(_=U.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const A=_.uuid,P=R.uuid;let D=c[A];D===void 0&&(D={},c[A]=D);let O=D[P];O===void 0&&(O=_.clone(),D[P]=O,R.addEventListener("dispose",I)),_=O}if(_.visible=R.visible,_.wireframe=R.wireframe,Y===_i?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:u[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,U.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const A=n.properties.get(_);A.light=U}return _}function b(C,R,U,Y,_){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===_i)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);const P=t.update(C),D=C.material;if(Array.isArray(D)){const O=P.groups;for(let k=0,q=O.length;k<q;k++){const H=O[k],J=D[H.materialIndex];if(J&&J.visible){const it=x(C,J,Y,_);C.onBeforeShadow(n,C,R,U,P,it,H),n.renderBufferDirect(U,null,P,it,C,H),C.onAfterShadow(n,C,R,U,P,it,H)}}}else if(D.visible){const O=x(C,D,Y,_);C.onBeforeShadow(n,C,R,U,P,O,null),n.renderBufferDirect(U,null,P,O,C,null),C.onAfterShadow(n,C,R,U,P,O,null)}}const A=C.children;for(let P=0,D=A.length;P<D;P++)b(A[P],R,U,Y,_)}function I(C){C.target.removeEventListener("dispose",I);for(const U in c){const Y=c[U],_=C.target.uuid;_ in Y&&(Y[_].dispose(),delete Y[_])}}}const dm={[Gr]:Wr,[Xr]:Kr,[qr]:$r,[Mn]:Yr,[Wr]:Gr,[Kr]:Xr,[$r]:qr,[Yr]:Mn};function fm(n){function t(){let N=!1;const lt=new Jt;let X=null;const Z=new Jt(0,0,0,0);return{setMask:function(at){X!==at&&!N&&(n.colorMask(at,at,at,at),X=at)},setLocked:function(at){N=at},setClear:function(at,ct,kt,de,Ce){Ce===!0&&(at*=de,ct*=de,kt*=de),lt.set(at,ct,kt,de),Z.equals(lt)===!1&&(n.clearColor(at,ct,kt,de),Z.copy(lt))},reset:function(){N=!1,X=null,Z.set(-1,0,0,0)}}}function e(){let N=!1,lt=!1,X=null,Z=null,at=null;return{setReversed:function(ct){lt=ct},setTest:function(ct){ct?gt(n.DEPTH_TEST):ht(n.DEPTH_TEST)},setMask:function(ct){X!==ct&&!N&&(n.depthMask(ct),X=ct)},setFunc:function(ct){if(lt&&(ct=dm[ct]),Z!==ct){switch(ct){case Gr:n.depthFunc(n.NEVER);break;case Wr:n.depthFunc(n.ALWAYS);break;case Xr:n.depthFunc(n.LESS);break;case Mn:n.depthFunc(n.LEQUAL);break;case qr:n.depthFunc(n.EQUAL);break;case Yr:n.depthFunc(n.GEQUAL);break;case Kr:n.depthFunc(n.GREATER);break;case $r:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ct}},setLocked:function(ct){N=ct},setClear:function(ct){at!==ct&&(n.clearDepth(ct),at=ct)},reset:function(){N=!1,X=null,Z=null,at=null}}}function i(){let N=!1,lt=null,X=null,Z=null,at=null,ct=null,kt=null,de=null,Ce=null;return{setTest:function(qt){N||(qt?gt(n.STENCIL_TEST):ht(n.STENCIL_TEST))},setMask:function(qt){lt!==qt&&!N&&(n.stencilMask(qt),lt=qt)},setFunc:function(qt,Pe,ci){(X!==qt||Z!==Pe||at!==ci)&&(n.stencilFunc(qt,Pe,ci),X=qt,Z=Pe,at=ci)},setOp:function(qt,Pe,ci){(ct!==qt||kt!==Pe||de!==ci)&&(n.stencilOp(qt,Pe,ci),ct=qt,kt=Pe,de=ci)},setLocked:function(qt){N=qt},setClear:function(qt){Ce!==qt&&(n.clearStencil(qt),Ce=qt)},reset:function(){N=!1,lt=null,X=null,Z=null,at=null,ct=null,kt=null,de=null,Ce=null}}}const s=new t,r=new e,a=new i,o=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,f=[],m=null,v=!1,g=null,d=null,p=null,T=null,x=null,b=null,I=null,C=new Tt(0,0,0),R=0,U=!1,Y=null,_=null,M=null,A=null,P=null;const D=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,k=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(q)[1]),O=k>=1):q.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),O=k>=2);let H=null,J={};const it=n.getParameter(n.SCISSOR_BOX),pt=n.getParameter(n.VIEWPORT),Xt=new Jt().fromArray(it),jt=new Jt().fromArray(pt);function K(N,lt,X,Z){const at=new Uint8Array(4),ct=n.createTexture();n.bindTexture(N,ct),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let kt=0;kt<X;kt++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(lt,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,at):n.texImage2D(lt+kt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,at);return ct}const tt={};tt[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),tt[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),tt[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),gt(n.DEPTH_TEST),r.setFunc(Mn),Ft(!1),Gt(oo),gt(n.CULL_FACE),L(yi);function gt(N){c[N]!==!0&&(n.enable(N),c[N]=!0)}function ht(N){c[N]!==!1&&(n.disable(N),c[N]=!1)}function Dt(N,lt){return h[N]!==lt?(n.bindFramebuffer(N,lt),h[N]=lt,N===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=lt),N===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=lt),!0):!1}function wt(N,lt){let X=f,Z=!1;if(N){X=u.get(lt),X===void 0&&(X=[],u.set(lt,X));const at=N.textures;if(X.length!==at.length||X[0]!==n.COLOR_ATTACHMENT0){for(let ct=0,kt=at.length;ct<kt;ct++)X[ct]=n.COLOR_ATTACHMENT0+ct;X.length=at.length,Z=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,Z=!0);Z&&n.drawBuffers(X)}function zt(N){return m!==N?(n.useProgram(N),m=N,!0):!1}const Qt={[Wi]:n.FUNC_ADD,[mc]:n.FUNC_SUBTRACT,[gc]:n.FUNC_REVERSE_SUBTRACT};Qt[_c]=n.MIN,Qt[vc]=n.MAX;const Bt={[xc]:n.ZERO,[Mc]:n.ONE,[yc]:n.SRC_COLOR,[Hr]:n.SRC_ALPHA,[Ac]:n.SRC_ALPHA_SATURATE,[wc]:n.DST_COLOR,[Tc]:n.DST_ALPHA,[Sc]:n.ONE_MINUS_SRC_COLOR,[Vr]:n.ONE_MINUS_SRC_ALPHA,[Ec]:n.ONE_MINUS_DST_COLOR,[bc]:n.ONE_MINUS_DST_ALPHA,[Rc]:n.CONSTANT_COLOR,[Cc]:n.ONE_MINUS_CONSTANT_COLOR,[Pc]:n.CONSTANT_ALPHA,[Dc]:n.ONE_MINUS_CONSTANT_ALPHA};function L(N,lt,X,Z,at,ct,kt,de,Ce,qt){if(N===yi){v===!0&&(ht(n.BLEND),v=!1);return}if(v===!1&&(gt(n.BLEND),v=!0),N!==pc){if(N!==g||qt!==U){if((d!==Wi||x!==Wi)&&(n.blendEquation(n.FUNC_ADD),d=Wi,x=Wi),qt)switch(N){case Ki:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case li:n.blendFunc(n.ONE,n.ONE);break;case lo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case co:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case li:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case lo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case co:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}p=null,T=null,b=null,I=null,C.set(0,0,0),R=0,g=N,U=qt}return}at=at||lt,ct=ct||X,kt=kt||Z,(lt!==d||at!==x)&&(n.blendEquationSeparate(Qt[lt],Qt[at]),d=lt,x=at),(X!==p||Z!==T||ct!==b||kt!==I)&&(n.blendFuncSeparate(Bt[X],Bt[Z],Bt[ct],Bt[kt]),p=X,T=Z,b=ct,I=kt),(de.equals(C)===!1||Ce!==R)&&(n.blendColor(de.r,de.g,de.b,Ce),C.copy(de),R=Ce),g=N,U=!1}function Ue(N,lt){N.side===ce?ht(n.CULL_FACE):gt(n.CULL_FACE);let X=N.side===Ae;lt&&(X=!X),Ft(X),N.blending===Ki&&N.transparent===!1?L(yi):L(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),s.setMask(N.colorWrite);const Z=N.stencilWrite;a.setTest(Z),Z&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ie(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?gt(n.SAMPLE_ALPHA_TO_COVERAGE):ht(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(N){Y!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),Y=N)}function Gt(N){N!==dc?(gt(n.CULL_FACE),N!==_&&(N===oo?n.cullFace(n.BACK):N===fc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ht(n.CULL_FACE),_=N}function At(N){N!==M&&(O&&n.lineWidth(N),M=N)}function ie(N,lt,X){N?(gt(n.POLYGON_OFFSET_FILL),(A!==lt||P!==X)&&(n.polygonOffset(lt,X),A=lt,P=X)):ht(n.POLYGON_OFFSET_FILL)}function Pt(N){N?gt(n.SCISSOR_TEST):ht(n.SCISSOR_TEST)}function E(N){N===void 0&&(N=n.TEXTURE0+D-1),H!==N&&(n.activeTexture(N),H=N)}function y(N,lt,X){X===void 0&&(H===null?X=n.TEXTURE0+D-1:X=H);let Z=J[X];Z===void 0&&(Z={type:void 0,texture:void 0},J[X]=Z),(Z.type!==N||Z.texture!==lt)&&(H!==X&&(n.activeTexture(X),H=X),n.bindTexture(N,lt||tt[N]),Z.type=N,Z.texture=lt)}function V(){const N=J[H];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function xt(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function rt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Wt(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function et(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function dt(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ct(N){Xt.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),Xt.copy(N))}function ft(N){jt.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),jt.copy(N))}function Ot(N,lt){let X=l.get(lt);X===void 0&&(X=new WeakMap,l.set(lt,X));let Z=X.get(N);Z===void 0&&(Z=n.getUniformBlockIndex(lt,N.name),X.set(N,Z))}function Lt(N,lt){const Z=l.get(lt).get(N);o.get(lt)!==Z&&(n.uniformBlockBinding(lt,Z,N.__bindingPointIndex),o.set(lt,Z))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},H=null,J={},h={},u=new WeakMap,f=[],m=null,v=!1,g=null,d=null,p=null,T=null,x=null,b=null,I=null,C=new Tt(0,0,0),R=0,U=!1,Y=null,_=null,M=null,A=null,P=null,Xt.set(0,0,n.canvas.width,n.canvas.height),jt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:gt,disable:ht,bindFramebuffer:Dt,drawBuffers:wt,useProgram:zt,setBlending:L,setMaterial:Ue,setFlipSided:Ft,setCullFace:Gt,setLineWidth:At,setPolygonOffset:ie,setScissorTest:Pt,activeTexture:E,bindTexture:y,unbindTexture:V,compressedTexImage2D:j,compressedTexImage3D:Q,texImage2D:dt,texImage3D:Rt,updateUBOMapping:Ot,uniformBlockBinding:Lt,texStorage2D:Wt,texStorage3D:et,texSubImage2D:$,texSubImage3D:xt,compressedTexSubImage2D:rt,compressedTexSubImage3D:ut,scissor:Ct,viewport:ft,reset:te}}function tl(n,t,e,i){const s=pm(i);switch(e){case El:return n*t;case Rl:return n*t;case Cl:return n*t*2;case Ia:return n*t/s.components*s.byteLength;case Ua:return n*t/s.components*s.byteLength;case Pl:return n*t*2/s.components*s.byteLength;case Na:return n*t*2/s.components*s.byteLength;case Al:return n*t*3/s.components*s.byteLength;case ni:return n*t*4/s.components*s.byteLength;case Fa:return n*t*4/s.components*s.byteLength;case Rs:case Cs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ps:case Ds:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ta:case ia:return Math.max(n,16)*Math.max(t,8)/4;case Jr:case ea:return Math.max(n,8)*Math.max(t,8)/2;case na:case sa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case la:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ca:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ha:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ua:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case da:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case fa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case pa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ma:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ga:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case _a:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case va:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case xa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ls:case Ma:case ya:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Dl:case Sa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ta:case ba:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pm(n){switch(n){case Si:case Tl:return{byteLength:1,components:1};case Zn:case bl:case oi:return{byteLength:2,components:1};case Da:case La:return{byteLength:2,components:4};case $i:case Pa:case ai:return{byteLength:4,components:1};case wl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function mm(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(E,y){return m?new OffscreenCanvas(E,y):ks("canvas")}function g(E,y,V){let j=1;const Q=Pt(E);if((Q.width>V||Q.height>V)&&(j=V/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(j*Q.width),xt=Math.floor(j*Q.height);u===void 0&&(u=v($,xt));const rt=y?v($,xt):u;return rt.width=$,rt.height=xt,rt.getContext("2d").drawImage(E,0,0,$,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+xt+")."),rt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function d(E){return E.generateMipmaps&&E.minFilter!==Le&&E.minFilter!==ti}function p(E){n.generateMipmap(E)}function T(E,y,V,j,Q=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=y;if(y===n.RED&&(V===n.FLOAT&&($=n.R32F),V===n.HALF_FLOAT&&($=n.R16F),V===n.UNSIGNED_BYTE&&($=n.R8)),y===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&($=n.R8UI),V===n.UNSIGNED_SHORT&&($=n.R16UI),V===n.UNSIGNED_INT&&($=n.R32UI),V===n.BYTE&&($=n.R8I),V===n.SHORT&&($=n.R16I),V===n.INT&&($=n.R32I)),y===n.RG&&(V===n.FLOAT&&($=n.RG32F),V===n.HALF_FLOAT&&($=n.RG16F),V===n.UNSIGNED_BYTE&&($=n.RG8)),y===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&($=n.RG8UI),V===n.UNSIGNED_SHORT&&($=n.RG16UI),V===n.UNSIGNED_INT&&($=n.RG32UI),V===n.BYTE&&($=n.RG8I),V===n.SHORT&&($=n.RG16I),V===n.INT&&($=n.RG32I)),y===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&($=n.RGB8UI),V===n.UNSIGNED_SHORT&&($=n.RGB16UI),V===n.UNSIGNED_INT&&($=n.RGB32UI),V===n.BYTE&&($=n.RGB8I),V===n.SHORT&&($=n.RGB16I),V===n.INT&&($=n.RGB32I)),y===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&($=n.RGBA8UI),V===n.UNSIGNED_SHORT&&($=n.RGBA16UI),V===n.UNSIGNED_INT&&($=n.RGBA32UI),V===n.BYTE&&($=n.RGBA8I),V===n.SHORT&&($=n.RGBA16I),V===n.INT&&($=n.RGBA32I)),y===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),y===n.RGBA){const xt=Q?Fs:$t.getTransfer(j);V===n.FLOAT&&($=n.RGBA32F),V===n.HALF_FLOAT&&($=n.RGBA16F),V===n.UNSIGNED_BYTE&&($=xt===se?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(E,y){let V;return E?y===null||y===$i||y===Tn?V=n.DEPTH24_STENCIL8:y===ai?V=n.DEPTH32F_STENCIL8:y===Zn&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===$i||y===Tn?V=n.DEPTH_COMPONENT24:y===ai?V=n.DEPTH_COMPONENT32F:y===Zn&&(V=n.DEPTH_COMPONENT16),V}function b(E,y){return d(E)===!0||E.isFramebufferTexture&&E.minFilter!==Le&&E.minFilter!==ti?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function I(E){const y=E.target;y.removeEventListener("dispose",I),R(y),y.isVideoTexture&&h.delete(y)}function C(E){const y=E.target;y.removeEventListener("dispose",C),Y(y)}function R(E){const y=i.get(E);if(y.__webglInit===void 0)return;const V=E.source,j=f.get(V);if(j){const Q=j[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&U(E),Object.keys(j).length===0&&f.delete(V)}i.remove(E)}function U(E){const y=i.get(E);n.deleteTexture(y.__webglTexture);const V=E.source,j=f.get(V);delete j[y.__cacheKey],a.memory.textures--}function Y(E){const y=i.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let Q=0;Q<y.__webglFramebuffer[j].length;Q++)n.deleteFramebuffer(y.__webglFramebuffer[j][Q]);else n.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)n.deleteFramebuffer(y.__webglFramebuffer[j]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=E.textures;for(let j=0,Q=V.length;j<Q;j++){const $=i.get(V[j]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),a.memory.textures--),i.remove(V[j])}i.remove(E)}let _=0;function M(){_=0}function A(){const E=_;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),_+=1,E}function P(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function D(E,y){const V=i.get(E);if(E.isVideoTexture&&At(E),E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){const j=E.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{jt(V,E,y);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+y)}function O(E,y){const V=i.get(E);if(E.version>0&&V.__version!==E.version){jt(V,E,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+y)}function k(E,y){const V=i.get(E);if(E.version>0&&V.__version!==E.version){jt(V,E,y);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+y)}function q(E,y){const V=i.get(E);if(E.version>0&&V.__version!==E.version){K(V,E,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+y)}const H={[Ns]:n.REPEAT,[qi]:n.CLAMP_TO_EDGE,[Qr]:n.MIRRORED_REPEAT},J={[Le]:n.NEAREST,[kc]:n.NEAREST_MIPMAP_NEAREST,[ts]:n.NEAREST_MIPMAP_LINEAR,[ti]:n.LINEAR,[sr]:n.LINEAR_MIPMAP_NEAREST,[Yi]:n.LINEAR_MIPMAP_LINEAR},it={[Wc]:n.NEVER,[jc]:n.ALWAYS,[Xc]:n.LESS,[Il]:n.LEQUAL,[qc]:n.EQUAL,[$c]:n.GEQUAL,[Yc]:n.GREATER,[Kc]:n.NOTEQUAL};function pt(E,y){if(y.type===ai&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===ti||y.magFilter===sr||y.magFilter===ts||y.magFilter===Yi||y.minFilter===ti||y.minFilter===sr||y.minFilter===ts||y.minFilter===Yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,H[y.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,H[y.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,H[y.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,J[y.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,it[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Le||y.minFilter!==ts&&y.minFilter!==Yi||y.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(E,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Xt(E,y){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",I));const j=y.source;let Q=f.get(j);Q===void 0&&(Q={},f.set(j,Q));const $=P(y);if($!==E.__cacheKey){Q[$]===void 0&&(Q[$]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[$].usedTimes++;const xt=Q[E.__cacheKey];xt!==void 0&&(Q[E.__cacheKey].usedTimes--,xt.usedTimes===0&&U(y)),E.__cacheKey=$,E.__webglTexture=Q[$].texture}return V}function jt(E,y,V){let j=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=n.TEXTURE_3D);const Q=Xt(E,y),$=y.source;e.bindTexture(j,E.__webglTexture,n.TEXTURE0+V);const xt=i.get($);if($.version!==xt.__version||Q===!0){e.activeTexture(n.TEXTURE0+V);const rt=$t.getPrimaries($t.workingColorSpace),ut=y.colorSpace===Di?null:$t.getPrimaries(y.colorSpace),Wt=y.colorSpace===Di||rt===ut?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let et=g(y.image,!1,s.maxTextureSize);et=ie(y,et);const dt=r.convert(y.format,y.colorSpace),Rt=r.convert(y.type);let Ct=T(y.internalFormat,dt,Rt,y.colorSpace,y.isVideoTexture);pt(j,y);let ft;const Ot=y.mipmaps,Lt=y.isVideoTexture!==!0,te=xt.__version===void 0||Q===!0,N=$.dataReady,lt=b(y,et);if(y.isDepthTexture)Ct=x(y.format===bn,y.type),te&&(Lt?e.texStorage2D(n.TEXTURE_2D,1,Ct,et.width,et.height):e.texImage2D(n.TEXTURE_2D,0,Ct,et.width,et.height,0,dt,Rt,null));else if(y.isDataTexture)if(Ot.length>0){Lt&&te&&e.texStorage2D(n.TEXTURE_2D,lt,Ct,Ot[0].width,Ot[0].height);for(let X=0,Z=Ot.length;X<Z;X++)ft=Ot[X],Lt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,ft.width,ft.height,dt,Rt,ft.data):e.texImage2D(n.TEXTURE_2D,X,Ct,ft.width,ft.height,0,dt,Rt,ft.data);y.generateMipmaps=!1}else Lt?(te&&e.texStorage2D(n.TEXTURE_2D,lt,Ct,et.width,et.height),N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et.width,et.height,dt,Rt,et.data)):e.texImage2D(n.TEXTURE_2D,0,Ct,et.width,et.height,0,dt,Rt,et.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Lt&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,Ct,Ot[0].width,Ot[0].height,et.depth);for(let X=0,Z=Ot.length;X<Z;X++)if(ft=Ot[X],y.format!==ni)if(dt!==null)if(Lt){if(N)if(y.layerUpdates.size>0){const at=tl(ft.width,ft.height,y.format,y.type);for(const ct of y.layerUpdates){const kt=ft.data.subarray(ct*at/ft.data.BYTES_PER_ELEMENT,(ct+1)*at/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,ct,ft.width,ft.height,1,dt,kt,0,0)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,ft.width,ft.height,et.depth,dt,ft.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Ct,ft.width,ft.height,et.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?N&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,ft.width,ft.height,et.depth,dt,Rt,ft.data):e.texImage3D(n.TEXTURE_2D_ARRAY,X,Ct,ft.width,ft.height,et.depth,0,dt,Rt,ft.data)}else{Lt&&te&&e.texStorage2D(n.TEXTURE_2D,lt,Ct,Ot[0].width,Ot[0].height);for(let X=0,Z=Ot.length;X<Z;X++)ft=Ot[X],y.format!==ni?dt!==null?Lt?N&&e.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,ft.width,ft.height,dt,ft.data):e.compressedTexImage2D(n.TEXTURE_2D,X,Ct,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,ft.width,ft.height,dt,Rt,ft.data):e.texImage2D(n.TEXTURE_2D,X,Ct,ft.width,ft.height,0,dt,Rt,ft.data)}else if(y.isDataArrayTexture)if(Lt){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,lt,Ct,et.width,et.height,et.depth),N)if(y.layerUpdates.size>0){const X=tl(et.width,et.height,y.format,y.type);for(const Z of y.layerUpdates){const at=et.data.subarray(Z*X/et.data.BYTES_PER_ELEMENT,(Z+1)*X/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,dt,Rt,at)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,dt,Rt,et.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ct,et.width,et.height,et.depth,0,dt,Rt,et.data);else if(y.isData3DTexture)Lt?(te&&e.texStorage3D(n.TEXTURE_3D,lt,Ct,et.width,et.height,et.depth),N&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,dt,Rt,et.data)):e.texImage3D(n.TEXTURE_3D,0,Ct,et.width,et.height,et.depth,0,dt,Rt,et.data);else if(y.isFramebufferTexture){if(te)if(Lt)e.texStorage2D(n.TEXTURE_2D,lt,Ct,et.width,et.height);else{let X=et.width,Z=et.height;for(let at=0;at<lt;at++)e.texImage2D(n.TEXTURE_2D,at,Ct,X,Z,0,dt,Rt,null),X>>=1,Z>>=1}}else if(Ot.length>0){if(Lt&&te){const X=Pt(Ot[0]);e.texStorage2D(n.TEXTURE_2D,lt,Ct,X.width,X.height)}for(let X=0,Z=Ot.length;X<Z;X++)ft=Ot[X],Lt?N&&e.texSubImage2D(n.TEXTURE_2D,X,0,0,dt,Rt,ft):e.texImage2D(n.TEXTURE_2D,X,Ct,dt,Rt,ft);y.generateMipmaps=!1}else if(Lt){if(te){const X=Pt(et);e.texStorage2D(n.TEXTURE_2D,lt,Ct,X.width,X.height)}N&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Rt,et)}else e.texImage2D(n.TEXTURE_2D,0,Ct,dt,Rt,et);d(y)&&p(j),xt.__version=$.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function K(E,y,V){if(y.image.length!==6)return;const j=Xt(E,y),Q=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+V);const $=i.get(Q);if(Q.version!==$.__version||j===!0){e.activeTexture(n.TEXTURE0+V);const xt=$t.getPrimaries($t.workingColorSpace),rt=y.colorSpace===Di?null:$t.getPrimaries(y.colorSpace),ut=y.colorSpace===Di||xt===rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);const Wt=y.isCompressedTexture||y.image[0].isCompressedTexture,et=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let Z=0;Z<6;Z++)!Wt&&!et?dt[Z]=g(y.image[Z],!0,s.maxCubemapSize):dt[Z]=et?y.image[Z].image:y.image[Z],dt[Z]=ie(y,dt[Z]);const Rt=dt[0],Ct=r.convert(y.format,y.colorSpace),ft=r.convert(y.type),Ot=T(y.internalFormat,Ct,ft,y.colorSpace),Lt=y.isVideoTexture!==!0,te=$.__version===void 0||j===!0,N=Q.dataReady;let lt=b(y,Rt);pt(n.TEXTURE_CUBE_MAP,y);let X;if(Wt){Lt&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ot,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){X=dt[Z].mipmaps;for(let at=0;at<X.length;at++){const ct=X[at];y.format!==ni?Ct!==null?Lt?N&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,ct.width,ct.height,Ct,ct.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Ot,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,0,0,ct.width,ct.height,Ct,ft,ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at,Ot,ct.width,ct.height,0,Ct,ft,ct.data)}}}else{if(X=y.mipmaps,Lt&&te){X.length>0&&lt++;const Z=Pt(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ot,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){Lt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,dt[Z].width,dt[Z].height,Ct,ft,dt[Z].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,dt[Z].width,dt[Z].height,0,Ct,ft,dt[Z].data);for(let at=0;at<X.length;at++){const kt=X[at].image[Z].image;Lt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,kt.width,kt.height,Ct,ft,kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Ot,kt.width,kt.height,0,Ct,ft,kt.data)}}else{Lt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ct,ft,dt[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,Ct,ft,dt[Z]);for(let at=0;at<X.length;at++){const ct=X[at];Lt?N&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,0,0,Ct,ft,ct.image[Z]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,at+1,Ot,Ct,ft,ct.image[Z])}}}d(y)&&p(n.TEXTURE_CUBE_MAP),$.__version=Q.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function tt(E,y,V,j,Q,$){const xt=r.convert(V.format,V.colorSpace),rt=r.convert(V.type),ut=T(V.internalFormat,xt,rt,V.colorSpace);if(!i.get(y).__hasExternalTextures){const et=Math.max(1,y.width>>$),dt=Math.max(1,y.height>>$);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,ut,et,dt,y.depth,0,xt,rt,null):e.texImage2D(Q,$,ut,et,dt,0,xt,rt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,Q,i.get(V).__webglTexture,0,Ft(y)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,Q,i.get(V).__webglTexture,$),e.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(E,y,V){if(n.bindRenderbuffer(n.RENDERBUFFER,E),y.depthBuffer){const j=y.depthTexture,Q=j&&j.isDepthTexture?j.type:null,$=x(y.stencilBuffer,Q),xt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=Ft(y);Gt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt,$,y.width,y.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,$,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,$,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xt,n.RENDERBUFFER,E)}else{const j=y.textures;for(let Q=0;Q<j.length;Q++){const $=j[Q],xt=r.convert($.format,$.colorSpace),rt=r.convert($.type),ut=T($.internalFormat,xt,rt,$.colorSpace),Wt=Ft(y);V&&Gt(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,ut,y.width,y.height):Gt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,ut,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ut,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ht(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),D(y.depthTexture,0);const j=i.get(y.depthTexture).__webglTexture,Q=Ft(y);if(y.depthTexture.format===_n)Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(y.depthTexture.format===bn)Gt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Dt(E){const y=i.get(E),V=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const j=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=j}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ht(y.__webglFramebuffer,E)}else if(V){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=n.createRenderbuffer(),gt(y.__webglDepthbuffer[j],E,!1);else{const Q=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,$)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),gt(y.__webglDepthbuffer,E,!1);else{const j=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,Q)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(E,y,V){const j=i.get(E);y!==void 0&&tt(j.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Dt(E)}function zt(E){const y=E.texture,V=i.get(E),j=i.get(y);E.addEventListener("dispose",C);const Q=E.textures,$=E.isWebGLCubeRenderTarget===!0,xt=Q.length>1;if(xt||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=y.version,a.memory.textures++),$){V.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[rt]=[];for(let ut=0;ut<y.mipmaps.length;ut++)V.__webglFramebuffer[rt][ut]=n.createFramebuffer()}else V.__webglFramebuffer[rt]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)V.__webglFramebuffer[rt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(xt)for(let rt=0,ut=Q.length;rt<ut;rt++){const Wt=i.get(Q[rt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=n.createTexture(),a.memory.textures++)}if(E.samples>0&&Gt(E)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let rt=0;rt<Q.length;rt++){const ut=Q[rt];V.__webglColorRenderbuffer[rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[rt]);const Wt=r.convert(ut.format,ut.colorSpace),et=r.convert(ut.type),dt=T(ut.internalFormat,Wt,et,ut.colorSpace,E.isXRRenderTarget===!0),Rt=Ft(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,dt,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+rt,n.RENDERBUFFER,V.__webglColorRenderbuffer[rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),gt(V.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){e.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),pt(n.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let ut=0;ut<y.mipmaps.length;ut++)tt(V.__webglFramebuffer[rt][ut],E,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ut);else tt(V.__webglFramebuffer[rt],E,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);d(y)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let rt=0,ut=Q.length;rt<ut;rt++){const Wt=Q[rt],et=i.get(Wt);e.bindTexture(n.TEXTURE_2D,et.__webglTexture),pt(n.TEXTURE_2D,Wt),tt(V.__webglFramebuffer,E,Wt,n.COLOR_ATTACHMENT0+rt,n.TEXTURE_2D,0),d(Wt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let rt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(rt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(rt,j.__webglTexture),pt(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let ut=0;ut<y.mipmaps.length;ut++)tt(V.__webglFramebuffer[ut],E,y,n.COLOR_ATTACHMENT0,rt,ut);else tt(V.__webglFramebuffer,E,y,n.COLOR_ATTACHMENT0,rt,0);d(y)&&p(rt),e.unbindTexture()}E.depthBuffer&&Dt(E)}function Qt(E){const y=E.textures;for(let V=0,j=y.length;V<j;V++){const Q=y[V];if(d(Q)){const $=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,xt=i.get(Q).__webglTexture;e.bindTexture($,xt),p($),e.unbindTexture()}}}const Bt=[],L=[];function Ue(E){if(E.samples>0){if(Gt(E)===!1){const y=E.textures,V=E.width,j=E.height;let Q=n.COLOR_BUFFER_BIT;const $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xt=i.get(E),rt=y.length>1;if(rt)for(let ut=0;ut<y.length;ut++)e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ut=0;ut<y.length;ut++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),rt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);const Wt=i.get(y[ut]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Wt,0)}n.blitFramebuffer(0,0,V,j,0,0,V,j,Q,n.NEAREST),l===!0&&(Bt.length=0,L.length=0,Bt.push(n.COLOR_ATTACHMENT0+ut),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Bt.push($),L.push($),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),rt)for(let ut=0;ut<y.length;ut++){e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);const Wt=i.get(y[ut]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,xt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ut,n.TEXTURE_2D,Wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const y=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Ft(E){return Math.min(s.maxSamples,E.samples)}function Gt(E){const y=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function At(E){const y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function ie(E,y){const V=E.colorSpace,j=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||V!==Ui&&V!==Di&&($t.getTransfer(V)===se?(j!==ni||Q!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}function Pt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=A,this.resetTextureUnits=M,this.setTexture2D=D,this.setTexture2DArray=O,this.setTexture3D=k,this.setTextureCube=q,this.rebindTextures=wt,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Dt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Gt}function gm(n,t){function e(i,s=Di){let r;const a=$t.getTransfer(s);if(i===Si)return n.UNSIGNED_BYTE;if(i===Da)return n.UNSIGNED_SHORT_4_4_4_4;if(i===La)return n.UNSIGNED_SHORT_5_5_5_1;if(i===wl)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tl)return n.BYTE;if(i===bl)return n.SHORT;if(i===Zn)return n.UNSIGNED_SHORT;if(i===Pa)return n.INT;if(i===$i)return n.UNSIGNED_INT;if(i===ai)return n.FLOAT;if(i===oi)return n.HALF_FLOAT;if(i===El)return n.ALPHA;if(i===Al)return n.RGB;if(i===ni)return n.RGBA;if(i===Rl)return n.LUMINANCE;if(i===Cl)return n.LUMINANCE_ALPHA;if(i===_n)return n.DEPTH_COMPONENT;if(i===bn)return n.DEPTH_STENCIL;if(i===Ia)return n.RED;if(i===Ua)return n.RED_INTEGER;if(i===Pl)return n.RG;if(i===Na)return n.RG_INTEGER;if(i===Fa)return n.RGBA_INTEGER;if(i===Rs||i===Cs||i===Ps||i===Ds)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ds)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Jr||i===ta||i===ea||i===ia)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Jr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===na||i===sa||i===ra)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===na||i===sa)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ra)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===aa||i===oa||i===la||i===ca||i===ha||i===ua||i===da||i===fa||i===pa||i===ma||i===ga||i===_a||i===va||i===xa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===aa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===la)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ca)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ha)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ua)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===da)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ma)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ga)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_a)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===va)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ls||i===Ma||i===ya)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ls)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dl||i===Sa||i===Ta||i===ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ls)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Tn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class _m extends ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class xi extends ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vm={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const d=e.getJointPose(g,i),p=this._getHandJoint(c,g);d!==null&&(p.matrix.fromArray(d.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=d.radius),p.visible=d!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,v=.005;c.inputState.pinching&&f>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new xi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const xm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Mm=`
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

}`;class ym{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Se,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ae({vertexShader:xm,fragmentShader:Mm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new It(new Ie(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Sm extends Rn{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,v=null;const g=new ym,d=e.getContextAttributes();let p=null,T=null;const x=[],b=[],I=new St;let C=null;const R=new ye;R.layers.enable(1),R.viewport=new Jt;const U=new ye;U.layers.enable(2),U.viewport=new Jt;const Y=[R,U],_=new _m;_.layers.enable(1),_.layers.enable(2);let M=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let tt=x[K];return tt===void 0&&(tt=new Lr,x[K]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(K){let tt=x[K];return tt===void 0&&(tt=new Lr,x[K]=tt),tt.getGripSpace()},this.getHand=function(K){let tt=x[K];return tt===void 0&&(tt=new Lr,x[K]=tt),tt.getHandSpace()};function P(K){const tt=b.indexOf(K.inputSource);if(tt===-1)return;const gt=x[tt];gt!==void 0&&(gt.update(K.inputSource,K.frame,c||a),gt.dispatchEvent({type:K.type,data:K.inputSource}))}function D(){s.removeEventListener("select",P),s.removeEventListener("selectstart",P),s.removeEventListener("selectend",P),s.removeEventListener("squeeze",P),s.removeEventListener("squeezestart",P),s.removeEventListener("squeezeend",P),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",O);for(let K=0;K<x.length;K++){const tt=b[K];tt!==null&&(b[K]=null,x[K].disconnect(tt))}M=null,A=null,g.reset(),t.setRenderTarget(p),m=null,f=null,u=null,s=null,T=null,jt.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",P),s.addEventListener("selectstart",P),s.addEventListener("selectend",P),s.addEventListener("squeeze",P),s.addEventListener("squeezestart",P),s.addEventListener("squeezeend",P),s.addEventListener("end",D),s.addEventListener("inputsourceschange",O),d.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const tt={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Ye(m.framebufferWidth,m.framebufferHeight,{format:ni,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil})}else{let tt=null,gt=null,ht=null;d.depth&&(ht=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=d.stencil?bn:_n,gt=d.stencil?Tn:$i);const Dt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Dt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new Ye(f.textureWidth,f.textureHeight,{format:ni,type:Si,depthTexture:new Xl(f.textureWidth,f.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),jt.setContext(s),jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function O(K){for(let tt=0;tt<K.removed.length;tt++){const gt=K.removed[tt],ht=b.indexOf(gt);ht>=0&&(b[ht]=null,x[ht].disconnect(gt))}for(let tt=0;tt<K.added.length;tt++){const gt=K.added[tt];let ht=b.indexOf(gt);if(ht===-1){for(let wt=0;wt<x.length;wt++)if(wt>=b.length){b.push(gt),ht=wt;break}else if(b[wt]===null){b[wt]=gt,ht=wt;break}if(ht===-1)break}const Dt=x[ht];Dt&&Dt.connect(gt)}}const k=new w,q=new w;function H(K,tt,gt){k.setFromMatrixPosition(tt.matrixWorld),q.setFromMatrixPosition(gt.matrixWorld);const ht=k.distanceTo(q),Dt=tt.projectionMatrix.elements,wt=gt.projectionMatrix.elements,zt=Dt[14]/(Dt[10]-1),Qt=Dt[14]/(Dt[10]+1),Bt=(Dt[9]+1)/Dt[5],L=(Dt[9]-1)/Dt[5],Ue=(Dt[8]-1)/Dt[0],Ft=(wt[8]+1)/wt[0],Gt=zt*Ue,At=zt*Ft,ie=ht/(-Ue+Ft),Pt=ie*-Ue;if(tt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Pt),K.translateZ(ie),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Dt[10]===-1)K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const E=zt+ie,y=Qt+ie,V=Gt-Pt,j=At+(ht-Pt),Q=Bt*Qt/y*E,$=L*Qt/y*E;K.projectionMatrix.makePerspective(V,j,Q,$,E,y),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function J(K,tt){tt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(tt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let tt=K.near,gt=K.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(gt=g.depthFar)),_.near=U.near=R.near=tt,_.far=U.far=R.far=gt,(M!==_.near||A!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),M=_.near,A=_.far);const ht=K.parent,Dt=_.cameras;J(_,ht);for(let wt=0;wt<Dt.length;wt++)J(Dt[wt],ht);Dt.length===2?H(_,R,U):_.projectionMatrix.copy(R.projectionMatrix),it(K,_,ht)};function it(K,tt,gt){gt===null?K.matrix.copy(tt.matrixWorld):(K.matrix.copy(gt.matrixWorld),K.matrix.invert(),K.matrix.multiply(tt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=wn*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(K){l=K,f!==null&&(f.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(_)};let pt=null;function Xt(K,tt){if(h=tt.getViewerPose(c||a),v=tt,h!==null){const gt=h.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let ht=!1;gt.length!==_.cameras.length&&(_.cameras.length=0,ht=!0);for(let wt=0;wt<gt.length;wt++){const zt=gt[wt];let Qt=null;if(m!==null)Qt=m.getViewport(zt);else{const L=u.getViewSubImage(f,zt);Qt=L.viewport,wt===0&&(t.setRenderTargetTextures(T,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),t.setRenderTarget(T))}let Bt=Y[wt];Bt===void 0&&(Bt=new ye,Bt.layers.enable(wt),Bt.viewport=new Jt,Y[wt]=Bt),Bt.matrix.fromArray(zt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(zt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),wt===0&&(_.matrix.copy(Bt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ht===!0&&_.cameras.push(Bt)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const wt=u.getDepthInformation(gt[0]);wt&&wt.isValid&&wt.texture&&g.init(t,wt,s.renderState)}}for(let gt=0;gt<x.length;gt++){const ht=b[gt],Dt=x[gt];ht!==null&&Dt!==void 0&&Dt.update(ht,tt,c||a)}pt&&pt(K,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),v=null}const jt=new Wl;jt.setAnimationLoop(Xt),this.setAnimationLoop=function(K){pt=K},this.dispose=function(){}}}const Hi=new Re,Tm=new Vt;function bm(n,t){function e(d,p){d.matrixAutoUpdate===!0&&d.updateMatrix(),p.value.copy(d.matrix)}function i(d,p){p.color.getRGB(d.fogColor.value,Hl(n)),p.isFog?(d.fogNear.value=p.near,d.fogFar.value=p.far):p.isFogExp2&&(d.fogDensity.value=p.density)}function s(d,p,T,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(d,p):p.isMeshToonMaterial?(r(d,p),u(d,p)):p.isMeshPhongMaterial?(r(d,p),h(d,p)):p.isMeshStandardMaterial?(r(d,p),f(d,p),p.isMeshPhysicalMaterial&&m(d,p,b)):p.isMeshMatcapMaterial?(r(d,p),v(d,p)):p.isMeshDepthMaterial?r(d,p):p.isMeshDistanceMaterial?(r(d,p),g(d,p)):p.isMeshNormalMaterial?r(d,p):p.isLineBasicMaterial?(a(d,p),p.isLineDashedMaterial&&o(d,p)):p.isPointsMaterial?l(d,p,T,x):p.isSpriteMaterial?c(d,p):p.isShadowMaterial?(d.color.value.copy(p.color),d.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(d,p){d.opacity.value=p.opacity,p.color&&d.diffuse.value.copy(p.color),p.emissive&&d.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(d.map.value=p.map,e(p.map,d.mapTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,e(p.alphaMap,d.alphaMapTransform)),p.bumpMap&&(d.bumpMap.value=p.bumpMap,e(p.bumpMap,d.bumpMapTransform),d.bumpScale.value=p.bumpScale,p.side===Ae&&(d.bumpScale.value*=-1)),p.normalMap&&(d.normalMap.value=p.normalMap,e(p.normalMap,d.normalMapTransform),d.normalScale.value.copy(p.normalScale),p.side===Ae&&d.normalScale.value.negate()),p.displacementMap&&(d.displacementMap.value=p.displacementMap,e(p.displacementMap,d.displacementMapTransform),d.displacementScale.value=p.displacementScale,d.displacementBias.value=p.displacementBias),p.emissiveMap&&(d.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,d.emissiveMapTransform)),p.specularMap&&(d.specularMap.value=p.specularMap,e(p.specularMap,d.specularMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest);const T=t.get(p),x=T.envMap,b=T.envMapRotation;x&&(d.envMap.value=x,Hi.copy(b),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),d.envMapRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(Hi)),d.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=p.reflectivity,d.ior.value=p.ior,d.refractionRatio.value=p.refractionRatio),p.lightMap&&(d.lightMap.value=p.lightMap,d.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,d.lightMapTransform)),p.aoMap&&(d.aoMap.value=p.aoMap,d.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,d.aoMapTransform))}function a(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,p.map&&(d.map.value=p.map,e(p.map,d.mapTransform))}function o(d,p){d.dashSize.value=p.dashSize,d.totalSize.value=p.dashSize+p.gapSize,d.scale.value=p.scale}function l(d,p,T,x){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.size.value=p.size*T,d.scale.value=x*.5,p.map&&(d.map.value=p.map,e(p.map,d.uvTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,e(p.alphaMap,d.alphaMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest)}function c(d,p){d.diffuse.value.copy(p.color),d.opacity.value=p.opacity,d.rotation.value=p.rotation,p.map&&(d.map.value=p.map,e(p.map,d.mapTransform)),p.alphaMap&&(d.alphaMap.value=p.alphaMap,e(p.alphaMap,d.alphaMapTransform)),p.alphaTest>0&&(d.alphaTest.value=p.alphaTest)}function h(d,p){d.specular.value.copy(p.specular),d.shininess.value=Math.max(p.shininess,1e-4)}function u(d,p){p.gradientMap&&(d.gradientMap.value=p.gradientMap)}function f(d,p){d.metalness.value=p.metalness,p.metalnessMap&&(d.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,d.metalnessMapTransform)),d.roughness.value=p.roughness,p.roughnessMap&&(d.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,d.roughnessMapTransform)),p.envMap&&(d.envMapIntensity.value=p.envMapIntensity)}function m(d,p,T){d.ior.value=p.ior,p.sheen>0&&(d.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),d.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(d.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,d.sheenColorMapTransform)),p.sheenRoughnessMap&&(d.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,d.sheenRoughnessMapTransform))),p.clearcoat>0&&(d.clearcoat.value=p.clearcoat,d.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(d.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,d.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(d.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ae&&d.clearcoatNormalScale.value.negate())),p.dispersion>0&&(d.dispersion.value=p.dispersion),p.iridescence>0&&(d.iridescence.value=p.iridescence,d.iridescenceIOR.value=p.iridescenceIOR,d.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(d.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,d.iridescenceMapTransform)),p.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),p.transmission>0&&(d.transmission.value=p.transmission,d.transmissionSamplerMap.value=T.texture,d.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(d.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,d.transmissionMapTransform)),d.thickness.value=p.thickness,p.thicknessMap&&(d.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=p.attenuationDistance,d.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(d.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(d.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=p.specularIntensity,d.specularColor.value.copy(p.specularColor),p.specularColorMap&&(d.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,d.specularColorMapTransform)),p.specularIntensityMap&&(d.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,d.specularIntensityMapTransform))}function v(d,p){p.matcap&&(d.matcap.value=p.matcap)}function g(d,p){const T=t.get(p).light;d.referencePosition.value.setFromMatrixPosition(T.matrixWorld),d.nearDistance.value=T.shadow.camera.near,d.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function wm(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,x){const b=x.program;i.uniformBlockBinding(T,b)}function c(T,x){let b=s[T.id];b===void 0&&(v(T),b=h(T),s[T.id]=b,T.addEventListener("dispose",d));const I=x.program;i.updateUBOMapping(T,I);const C=t.render.frame;r[T.id]!==C&&(f(T),r[T.id]=C)}function h(T){const x=u();T.__bindingPointIndex=x;const b=n.createBuffer(),I=T.__size,C=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,I,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,b),b}function u(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const x=s[T.id],b=T.uniforms,I=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let C=0,R=b.length;C<R;C++){const U=Array.isArray(b[C])?b[C]:[b[C]];for(let Y=0,_=U.length;Y<_;Y++){const M=U[Y];if(m(M,C,Y,I)===!0){const A=M.__offset,P=Array.isArray(M.value)?M.value:[M.value];let D=0;for(let O=0;O<P.length;O++){const k=P[O],q=g(k);typeof k=="number"||typeof k=="boolean"?(M.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,A+D,M.__data)):k.isMatrix3?(M.__data[0]=k.elements[0],M.__data[1]=k.elements[1],M.__data[2]=k.elements[2],M.__data[3]=0,M.__data[4]=k.elements[3],M.__data[5]=k.elements[4],M.__data[6]=k.elements[5],M.__data[7]=0,M.__data[8]=k.elements[6],M.__data[9]=k.elements[7],M.__data[10]=k.elements[8],M.__data[11]=0):(k.toArray(M.__data,D),D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,A,M.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(T,x,b,I){const C=T.value,R=x+"_"+b;if(I[R]===void 0)return typeof C=="number"||typeof C=="boolean"?I[R]=C:I[R]=C.clone(),!0;{const U=I[R];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return I[R]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function v(T){const x=T.uniforms;let b=0;const I=16;for(let R=0,U=x.length;R<U;R++){const Y=Array.isArray(x[R])?x[R]:[x[R]];for(let _=0,M=Y.length;_<M;_++){const A=Y[_],P=Array.isArray(A.value)?A.value:[A.value];for(let D=0,O=P.length;D<O;D++){const k=P[D],q=g(k),H=b%I,J=H%q.boundary,it=H+J;b+=J,it!==0&&I-it<q.storage&&(b+=I-it),A.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),A.__offset=b,b+=q.storage}}}const C=b%I;return C>0&&(b+=I-C),T.__size=b,T.__cache={},this}function g(T){const x={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(x.boundary=4,x.storage=4):T.isVector2?(x.boundary=8,x.storage=8):T.isVector3||T.isColor?(x.boundary=16,x.storage=12):T.isVector4?(x.boundary=16,x.storage=16):T.isMatrix3?(x.boundary=48,x.storage=48):T.isMatrix4?(x.boundary=64,x.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),x}function d(T){const x=T.target;x.removeEventListener("dispose",d);const b=a.indexOf(x.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const T in s)n.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Em{constructor(t={}){const{canvas:e=fh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,d=null;const p=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Be,this.toneMapping=Li,this.toneMappingExposure=1;const x=this;let b=!1,I=0,C=0,R=null,U=-1,Y=null;const _=new Jt,M=new Jt;let A=null;const P=new Tt(0);let D=0,O=e.width,k=e.height,q=1,H=null,J=null;const it=new Jt(0,0,O,k),pt=new Jt(0,0,O,k);let Xt=!1;const jt=new Ha;let K=!1,tt=!1;const gt=new Vt,ht=new Vt,Dt=new w,wt=new Jt,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function Bt(){return R===null?q:1}let L=i;function Ue(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ca}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",at,!1),e.addEventListener("webglcontextcreationerror",ct,!1),L===null){const F="webgl2";if(L=Ue(F,S),L===null)throw Ue(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Ft,Gt,At,ie,Pt,E,y,V,j,Q,$,xt,rt,ut,Wt,et,dt,Rt,Ct,ft,Ot,Lt,te,N;function lt(){Ft=new Df(L),Ft.init(),Lt=new gm(L,Ft),Gt=new wf(L,Ft,t,Lt),At=new fm(L),Gt.reverseDepthBuffer&&At.buffers.depth.setReversed(!0),ie=new Uf(L),Pt=new Qp,E=new mm(L,Ft,At,Pt,Gt,Lt,ie),y=new Af(x),V=new Pf(x),j=new kh(L),te=new Tf(L,j),Q=new Lf(L,j,ie,te),$=new Ff(L,Q,j,ie),Ct=new Nf(L,Gt,E),et=new Ef(Pt),xt=new Zp(x,y,V,Ft,Gt,te,et),rt=new bm(x,Pt),ut=new tm,Wt=new am(Ft),Rt=new Sf(x,y,V,At,$,f,l),dt=new um(x,$,Gt),N=new wm(L,ie,Gt,At),ft=new bf(L,Ft,ie),Ot=new If(L,Ft,ie),ie.programs=xt.programs,x.capabilities=Gt,x.extensions=Ft,x.properties=Pt,x.renderLists=ut,x.shadowMap=dt,x.state=At,x.info=ie}lt();const X=new Sm(x,L);this.xr=X,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=Ft.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ft.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(O,k,!1))},this.getSize=function(S){return S.set(O,k)},this.setSize=function(S,F,G=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=S,k=F,e.width=Math.floor(S*q),e.height=Math.floor(F*q),G===!0&&(e.style.width=S+"px",e.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(O*q,k*q).floor()},this.setDrawingBufferSize=function(S,F,G){O=S,k=F,q=G,e.width=Math.floor(S*G),e.height=Math.floor(F*G),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(_)},this.getViewport=function(S){return S.copy(it)},this.setViewport=function(S,F,G,W){S.isVector4?it.set(S.x,S.y,S.z,S.w):it.set(S,F,G,W),At.viewport(_.copy(it).multiplyScalar(q).round())},this.getScissor=function(S){return S.copy(pt)},this.setScissor=function(S,F,G,W){S.isVector4?pt.set(S.x,S.y,S.z,S.w):pt.set(S,F,G,W),At.scissor(M.copy(pt).multiplyScalar(q).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(S){At.setScissorTest(Xt=S)},this.setOpaqueSort=function(S){H=S},this.setTransparentSort=function(S){J=S},this.getClearColor=function(S){return S.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(S=!0,F=!0,G=!0){let W=0;if(S){let z=!1;if(R!==null){const nt=R.texture.format;z=nt===Fa||nt===Na||nt===Ua}if(z){const nt=R.texture.type,ot=nt===Si||nt===$i||nt===Zn||nt===Tn||nt===Da||nt===La,mt=Rt.getClearColor(),vt=Rt.getClearAlpha(),bt=mt.r,Et=mt.g,Mt=mt.b;ot?(m[0]=bt,m[1]=Et,m[2]=Mt,m[3]=vt,L.clearBufferuiv(L.COLOR,0,m)):(v[0]=bt,v[1]=Et,v[2]=Mt,v[3]=vt,L.clearBufferiv(L.COLOR,0,v))}else W|=L.COLOR_BUFFER_BIT}F&&(W|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),G&&(W|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",at,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),ut.dispose(),Wt.dispose(),Pt.dispose(),y.dispose(),V.dispose(),$.dispose(),te.dispose(),N.dispose(),xt.dispose(),X.dispose(),X.removeEventListener("sessionstart",Ja),X.removeEventListener("sessionend",to),Ni.stop()};function Z(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function at(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=ie.autoReset,F=dt.enabled,G=dt.autoUpdate,W=dt.needsUpdate,z=dt.type;lt(),ie.autoReset=S,dt.enabled=F,dt.autoUpdate=G,dt.needsUpdate=W,dt.type=z}function ct(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function kt(S){const F=S.target;F.removeEventListener("dispose",kt),de(F)}function de(S){Ce(S),Pt.remove(S)}function Ce(S){const F=Pt.get(S).programs;F!==void 0&&(F.forEach(function(G){xt.releaseProgram(G)}),S.isShaderMaterial&&xt.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,G,W,z,nt){F===null&&(F=zt);const ot=z.isMesh&&z.matrixWorld.determinant()<0,mt=lc(S,F,G,W,z);At.setMaterial(W,ot);let vt=G.index,bt=1;if(W.wireframe===!0){if(vt=Q.getWireframeAttribute(G),vt===void 0)return;bt=2}const Et=G.drawRange,Mt=G.attributes.position;let Zt=Et.start*bt,ne=(Et.start+Et.count)*bt;nt!==null&&(Zt=Math.max(Zt,nt.start*bt),ne=Math.min(ne,(nt.start+nt.count)*bt)),vt!==null?(Zt=Math.max(Zt,0),ne=Math.min(ne,vt.count)):Mt!=null&&(Zt=Math.max(Zt,0),ne=Math.min(ne,Mt.count));const oe=ne-Zt;if(oe<0||oe===1/0)return;te.setup(z,W,mt,G,vt);let Ne,Yt=ft;if(vt!==null&&(Ne=j.get(vt),Yt=Ot,Yt.setIndex(Ne)),z.isMesh)W.wireframe===!0?(At.setLineWidth(W.wireframeLinewidth*Bt()),Yt.setMode(L.LINES)):Yt.setMode(L.TRIANGLES);else if(z.isLine){let yt=W.linewidth;yt===void 0&&(yt=1),At.setLineWidth(yt*Bt()),z.isLineSegments?Yt.setMode(L.LINES):z.isLineLoop?Yt.setMode(L.LINE_LOOP):Yt.setMode(L.LINE_STRIP)}else z.isPoints?Yt.setMode(L.POINTS):z.isSprite&&Yt.setMode(L.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)Yt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))Yt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const yt=z._multiDrawStarts,ve=z._multiDrawCounts,Kt=z._multiDrawCount,$e=vt?j.get(vt).bytesPerElement:1,ji=Pt.get(W).currentProgram.getUniforms();for(let Fe=0;Fe<Kt;Fe++)ji.setValue(L,"_gl_DrawID",Fe),Yt.render(yt[Fe]/$e,ve[Fe])}else if(z.isInstancedMesh)Yt.renderInstances(Zt,oe,z.count);else if(G.isInstancedBufferGeometry){const yt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ve=Math.min(G.instanceCount,yt);Yt.renderInstances(Zt,oe,ve)}else Yt.render(Zt,oe)};function qt(S,F,G){S.transparent===!0&&S.side===ce&&S.forceSinglePass===!1?(S.side=Ae,S.needsUpdate=!0,Jn(S,F,G),S.side=Ii,S.needsUpdate=!0,Jn(S,F,G),S.side=ce):Jn(S,F,G)}this.compile=function(S,F,G=null){G===null&&(G=S),d=Wt.get(G),d.init(F),T.push(d),G.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),S!==G&&S.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(d.pushLight(z),z.castShadow&&d.pushShadow(z))}),d.setupLights();const W=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const nt=z.material;if(nt)if(Array.isArray(nt))for(let ot=0;ot<nt.length;ot++){const mt=nt[ot];qt(mt,G,z),W.add(mt)}else qt(nt,G,z),W.add(nt)}),T.pop(),d=null,W},this.compileAsync=function(S,F,G=null){const W=this.compile(S,F,G);return new Promise(z=>{function nt(){if(W.forEach(function(ot){Pt.get(ot).currentProgram.isReady()&&W.delete(ot)}),W.size===0){z(S);return}setTimeout(nt,10)}Ft.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let Pe=null;function ci(S){Pe&&Pe(S)}function Ja(){Ni.stop()}function to(){Ni.start()}const Ni=new Wl;Ni.setAnimationLoop(ci),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(S){Pe=S,X.setAnimationLoop(S),S===null?Ni.stop():Ni.start()},X.addEventListener("sessionstart",Ja),X.addEventListener("sessionend",to),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(F),F=X.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,F,R),d=Wt.get(S,T.length),d.init(F),T.push(d),ht.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),jt.setFromProjectionMatrix(ht),tt=this.localClippingEnabled,K=et.init(this.clippingPlanes,tt),g=ut.get(S,p.length),g.init(),p.push(g),X.enabled===!0&&X.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&tr(nt,F,-1/0,x.sortObjects)}tr(S,F,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(H,J),Qt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Qt&&Rt.addToRenderList(g,S),this.info.render.frame++,K===!0&&et.beginShadows();const G=d.state.shadowsArray;dt.render(G,S,F),K===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,z=g.transmissive;if(d.setupLights(),F.isArrayCamera){const nt=F.cameras;if(z.length>0)for(let ot=0,mt=nt.length;ot<mt;ot++){const vt=nt[ot];io(W,z,S,vt)}Qt&&Rt.render(S);for(let ot=0,mt=nt.length;ot<mt;ot++){const vt=nt[ot];eo(g,S,vt,vt.viewport)}}else z.length>0&&io(W,z,S,F),Qt&&Rt.render(S),eo(g,S,F);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(x,S,F),te.resetDefaultState(),U=-1,Y=null,T.pop(),T.length>0?(d=T[T.length-1],K===!0&&et.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,p.pop(),p.length>0?g=p[p.length-1]:g=null};function tr(S,F,G,W){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||jt.intersectsSprite(S)){W&&wt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ht);const ot=$.update(S),mt=S.material;mt.visible&&g.push(S,ot,mt,G,wt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||jt.intersectsObject(S))){const ot=$.update(S),mt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),wt.copy(S.boundingSphere.center)):(ot.boundingSphere===null&&ot.computeBoundingSphere(),wt.copy(ot.boundingSphere.center)),wt.applyMatrix4(S.matrixWorld).applyMatrix4(ht)),Array.isArray(mt)){const vt=ot.groups;for(let bt=0,Et=vt.length;bt<Et;bt++){const Mt=vt[bt],Zt=mt[Mt.materialIndex];Zt&&Zt.visible&&g.push(S,ot,Zt,G,wt.z,Mt)}}else mt.visible&&g.push(S,ot,mt,G,wt.z,null)}}const nt=S.children;for(let ot=0,mt=nt.length;ot<mt;ot++)tr(nt[ot],F,G,W)}function eo(S,F,G,W){const z=S.opaque,nt=S.transmissive,ot=S.transparent;d.setupLightsView(G),K===!0&&et.setGlobalState(x.clippingPlanes,G),W&&At.viewport(_.copy(W)),z.length>0&&Qn(z,F,G),nt.length>0&&Qn(nt,F,G),ot.length>0&&Qn(ot,F,G),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function io(S,F,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[W.id]===void 0&&(d.state.transmissionRenderTarget[W.id]=new Ye(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?oi:Si,minFilter:Yi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const nt=d.state.transmissionRenderTarget[W.id],ot=W.viewport||_;nt.setSize(ot.z,ot.w);const mt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(P),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear(),Qt&&Rt.render(G);const vt=x.toneMapping;x.toneMapping=Li;const bt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),d.setupLightsView(W),K===!0&&et.setGlobalState(x.clippingPlanes,W),Qn(S,G,W),E.updateMultisampleRenderTarget(nt),E.updateRenderTargetMipmap(nt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let Mt=0,Zt=F.length;Mt<Zt;Mt++){const ne=F[Mt],oe=ne.object,Ne=ne.geometry,Yt=ne.material,yt=ne.group;if(Yt.side===ce&&oe.layers.test(W.layers)){const ve=Yt.side;Yt.side=Ae,Yt.needsUpdate=!0,no(oe,G,W,Ne,Yt,yt),Yt.side=ve,Yt.needsUpdate=!0,Et=!0}}Et===!0&&(E.updateMultisampleRenderTarget(nt),E.updateRenderTargetMipmap(nt))}x.setRenderTarget(mt),x.setClearColor(P,D),bt!==void 0&&(W.viewport=bt),x.toneMapping=vt}function Qn(S,F,G){const W=F.isScene===!0?F.overrideMaterial:null;for(let z=0,nt=S.length;z<nt;z++){const ot=S[z],mt=ot.object,vt=ot.geometry,bt=W===null?ot.material:W,Et=ot.group;mt.layers.test(G.layers)&&no(mt,F,G,vt,bt,Et)}}function no(S,F,G,W,z,nt){S.onBeforeRender(x,F,G,W,z,nt),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(x,F,G,W,S,nt),z.transparent===!0&&z.side===ce&&z.forceSinglePass===!1?(z.side=Ae,z.needsUpdate=!0,x.renderBufferDirect(G,F,W,z,S,nt),z.side=Ii,z.needsUpdate=!0,x.renderBufferDirect(G,F,W,z,S,nt),z.side=ce):x.renderBufferDirect(G,F,W,z,S,nt),S.onAfterRender(x,F,G,W,z,nt)}function Jn(S,F,G){F.isScene!==!0&&(F=zt);const W=Pt.get(S),z=d.state.lights,nt=d.state.shadowsArray,ot=z.state.version,mt=xt.getParameters(S,z.state,nt,F,G),vt=xt.getProgramCacheKey(mt);let bt=W.programs;W.environment=S.isMeshStandardMaterial?F.environment:null,W.fog=F.fog,W.envMap=(S.isMeshStandardMaterial?V:y).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,bt===void 0&&(S.addEventListener("dispose",kt),bt=new Map,W.programs=bt);let Et=bt.get(vt);if(Et!==void 0){if(W.currentProgram===Et&&W.lightsStateVersion===ot)return ro(S,mt),Et}else mt.uniforms=xt.getUniforms(S),S.onBeforeCompile(mt,x),Et=xt.acquireProgram(mt,vt),bt.set(vt,Et),W.uniforms=mt.uniforms;const Mt=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Mt.clippingPlanes=et.uniform),ro(S,mt),W.needsLights=hc(S),W.lightsStateVersion=ot,W.needsLights&&(Mt.ambientLightColor.value=z.state.ambient,Mt.lightProbe.value=z.state.probe,Mt.directionalLights.value=z.state.directional,Mt.directionalLightShadows.value=z.state.directionalShadow,Mt.spotLights.value=z.state.spot,Mt.spotLightShadows.value=z.state.spotShadow,Mt.rectAreaLights.value=z.state.rectArea,Mt.ltc_1.value=z.state.rectAreaLTC1,Mt.ltc_2.value=z.state.rectAreaLTC2,Mt.pointLights.value=z.state.point,Mt.pointLightShadows.value=z.state.pointShadow,Mt.hemisphereLights.value=z.state.hemi,Mt.directionalShadowMap.value=z.state.directionalShadowMap,Mt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Mt.spotShadowMap.value=z.state.spotShadowMap,Mt.spotLightMatrix.value=z.state.spotLightMatrix,Mt.spotLightMap.value=z.state.spotLightMap,Mt.pointShadowMap.value=z.state.pointShadowMap,Mt.pointShadowMatrix.value=z.state.pointShadowMatrix),W.currentProgram=Et,W.uniformsList=null,Et}function so(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Us.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ro(S,F){const G=Pt.get(S);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function lc(S,F,G,W,z){F.isScene!==!0&&(F=zt),E.resetTextureUnits();const nt=F.fog,ot=W.isMeshStandardMaterial?F.environment:null,mt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ui,vt=(W.isMeshStandardMaterial?V:y).get(W.envMap||ot),bt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Et=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Mt=!!G.morphAttributes.position,Zt=!!G.morphAttributes.normal,ne=!!G.morphAttributes.color;let oe=Li;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(oe=x.toneMapping);const Ne=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Yt=Ne!==void 0?Ne.length:0,yt=Pt.get(W),ve=d.state.lights;if(K===!0&&(tt===!0||S!==Y)){const Ge=S===Y&&W.id===U;et.setState(W,S,Ge)}let Kt=!1;W.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==ve.state.version||yt.outputColorSpace!==mt||z.isBatchedMesh&&yt.batching===!1||!z.isBatchedMesh&&yt.batching===!0||z.isBatchedMesh&&yt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&yt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&yt.instancing===!1||!z.isInstancedMesh&&yt.instancing===!0||z.isSkinnedMesh&&yt.skinning===!1||!z.isSkinnedMesh&&yt.skinning===!0||z.isInstancedMesh&&yt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&yt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&yt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&yt.instancingMorph===!1&&z.morphTexture!==null||yt.envMap!==vt||W.fog===!0&&yt.fog!==nt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==et.numPlanes||yt.numIntersection!==et.numIntersection)||yt.vertexAlphas!==bt||yt.vertexTangents!==Et||yt.morphTargets!==Mt||yt.morphNormals!==Zt||yt.morphColors!==ne||yt.toneMapping!==oe||yt.morphTargetsCount!==Yt)&&(Kt=!0):(Kt=!0,yt.__version=W.version);let $e=yt.currentProgram;Kt===!0&&($e=Jn(W,F,z));let ji=!1,Fe=!1,er=!1;const he=$e.getUniforms(),Ti=yt.uniforms;if(At.useProgram($e.program)&&(ji=!0,Fe=!0,er=!0),W.id!==U&&(U=W.id,Fe=!0),ji||Y!==S){Gt.reverseDepthBuffer?(gt.copy(S.projectionMatrix),mh(gt),gh(gt),he.setValue(L,"projectionMatrix",gt)):he.setValue(L,"projectionMatrix",S.projectionMatrix),he.setValue(L,"viewMatrix",S.matrixWorldInverse);const Ge=he.map.cameraPosition;Ge!==void 0&&Ge.setValue(L,Dt.setFromMatrixPosition(S.matrixWorld)),Gt.logarithmicDepthBuffer&&he.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&he.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),Y!==S&&(Y=S,Fe=!0,er=!0)}if(z.isSkinnedMesh){he.setOptional(L,z,"bindMatrix"),he.setOptional(L,z,"bindMatrixInverse");const Ge=z.skeleton;Ge&&(Ge.boneTexture===null&&Ge.computeBoneTexture(),he.setValue(L,"boneTexture",Ge.boneTexture,E))}z.isBatchedMesh&&(he.setOptional(L,z,"batchingTexture"),he.setValue(L,"batchingTexture",z._matricesTexture,E),he.setOptional(L,z,"batchingIdTexture"),he.setValue(L,"batchingIdTexture",z._indirectTexture,E),he.setOptional(L,z,"batchingColorTexture"),z._colorsTexture!==null&&he.setValue(L,"batchingColorTexture",z._colorsTexture,E));const ir=G.morphAttributes;if((ir.position!==void 0||ir.normal!==void 0||ir.color!==void 0)&&Ct.update(z,G,$e),(Fe||yt.receiveShadow!==z.receiveShadow)&&(yt.receiveShadow=z.receiveShadow,he.setValue(L,"receiveShadow",z.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ti.envMap.value=vt,Ti.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&F.environment!==null&&(Ti.envMapIntensity.value=F.environmentIntensity),Fe&&(he.setValue(L,"toneMappingExposure",x.toneMappingExposure),yt.needsLights&&cc(Ti,er),nt&&W.fog===!0&&rt.refreshFogUniforms(Ti,nt),rt.refreshMaterialUniforms(Ti,W,q,k,d.state.transmissionRenderTarget[S.id]),Us.upload(L,so(yt),Ti,E)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Us.upload(L,so(yt),Ti,E),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&he.setValue(L,"center",z.center),he.setValue(L,"modelViewMatrix",z.modelViewMatrix),he.setValue(L,"normalMatrix",z.normalMatrix),he.setValue(L,"modelMatrix",z.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ge=W.uniformsGroups;for(let nr=0,uc=Ge.length;nr<uc;nr++){const ao=Ge[nr];N.update(ao,$e),N.bind(ao,$e)}}return $e}function cc(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function hc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,F,G){Pt.get(S.texture).__webglTexture=F,Pt.get(S.depthTexture).__webglTexture=G;const W=Pt.get(S);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||Ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,F){const G=Pt.get(S);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,G=0){R=S,I=F,C=G;let W=!0,z=null,nt=!1,ot=!1;if(S){const vt=Pt.get(S);if(vt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(L.FRAMEBUFFER,null),W=!1;else if(vt.__webglFramebuffer===void 0)E.setupRenderTarget(S);else if(vt.__hasExternalTextures)E.rebindTextures(S,Pt.get(S.texture).__webglTexture,Pt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Mt=S.depthTexture;if(vt.__boundDepthTexture!==Mt){if(Mt!==null&&Pt.has(Mt)&&(S.width!==Mt.image.width||S.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(S)}}const bt=S.texture;(bt.isData3DTexture||bt.isDataArrayTexture||bt.isCompressedArrayTexture)&&(ot=!0);const Et=Pt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Et[F])?z=Et[F][G]:z=Et[F],nt=!0):S.samples>0&&E.useMultisampledRTT(S)===!1?z=Pt.get(S).__webglMultisampledFramebuffer:Array.isArray(Et)?z=Et[G]:z=Et,_.copy(S.viewport),M.copy(S.scissor),A=S.scissorTest}else _.copy(it).multiplyScalar(q).floor(),M.copy(pt).multiplyScalar(q).floor(),A=Xt;if(At.bindFramebuffer(L.FRAMEBUFFER,z)&&W&&At.drawBuffers(S,z),At.viewport(_),At.scissor(M),At.setScissorTest(A),nt){const vt=Pt.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,G)}else if(ot){const vt=Pt.get(S.texture),bt=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,vt.__webglTexture,G||0,bt)}U=-1},this.readRenderTargetPixels=function(S,F,G,W,z,nt,ot){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let mt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ot!==void 0&&(mt=mt[ot]),mt){At.bindFramebuffer(L.FRAMEBUFFER,mt);try{const vt=S.texture,bt=vt.format,Et=vt.type;if(!Gt.textureFormatReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Gt.textureTypeReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-W&&G>=0&&G<=S.height-z&&L.readPixels(F,G,W,z,Lt.convert(bt),Lt.convert(Et),nt)}finally{const vt=R!==null?Pt.get(R).__webglFramebuffer:null;At.bindFramebuffer(L.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(S,F,G,W,z,nt,ot){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let mt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ot!==void 0&&(mt=mt[ot]),mt){const vt=S.texture,bt=vt.format,Et=vt.type;if(!Gt.textureFormatReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Gt.textureTypeReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=S.width-W&&G>=0&&G<=S.height-z){At.bindFramebuffer(L.FRAMEBUFFER,mt);const Mt=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Mt),L.bufferData(L.PIXEL_PACK_BUFFER,nt.byteLength,L.STREAM_READ),L.readPixels(F,G,W,z,Lt.convert(bt),Lt.convert(Et),0);const Zt=R!==null?Pt.get(R).__webglFramebuffer:null;At.bindFramebuffer(L.FRAMEBUFFER,Zt);const ne=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await ph(L,ne,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Mt),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,nt),L.deleteBuffer(Mt),L.deleteSync(ne),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,F=null,G=0){S.isTexture!==!0&&(Is("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,S=arguments[1]);const W=Math.pow(2,-G),z=Math.floor(S.image.width*W),nt=Math.floor(S.image.height*W),ot=F!==null?F.x:0,mt=F!==null?F.y:0;E.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ot,mt,z,nt),At.unbindTexture()},this.copyTextureToTexture=function(S,F,G=null,W=null,z=0){S.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1],F=arguments[2],z=arguments[3]||0,G=null);let nt,ot,mt,vt,bt,Et;G!==null?(nt=G.max.x-G.min.x,ot=G.max.y-G.min.y,mt=G.min.x,vt=G.min.y):(nt=S.image.width,ot=S.image.height,mt=0,vt=0),W!==null?(bt=W.x,Et=W.y):(bt=0,Et=0);const Mt=Lt.convert(F.format),Zt=Lt.convert(F.type);E.setTexture2D(F,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const ne=L.getParameter(L.UNPACK_ROW_LENGTH),oe=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Ne=L.getParameter(L.UNPACK_SKIP_PIXELS),Yt=L.getParameter(L.UNPACK_SKIP_ROWS),yt=L.getParameter(L.UNPACK_SKIP_IMAGES),ve=S.isCompressedTexture?S.mipmaps[z]:S.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,ve.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ve.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,mt),L.pixelStorei(L.UNPACK_SKIP_ROWS,vt),S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,z,bt,Et,nt,ot,Mt,Zt,ve.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,z,bt,Et,ve.width,ve.height,Mt,ve.data):L.texSubImage2D(L.TEXTURE_2D,z,bt,Et,nt,ot,Mt,Zt,ve),L.pixelStorei(L.UNPACK_ROW_LENGTH,ne),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ne),L.pixelStorei(L.UNPACK_SKIP_ROWS,Yt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,yt),z===0&&F.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(S,F,G=null,W=null,z=0){S.isTexture!==!0&&(Is("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,S=arguments[2],F=arguments[3],z=arguments[4]||0);let nt,ot,mt,vt,bt,Et,Mt,Zt,ne;const oe=S.isCompressedTexture?S.mipmaps[z]:S.image;G!==null?(nt=G.max.x-G.min.x,ot=G.max.y-G.min.y,mt=G.max.z-G.min.z,vt=G.min.x,bt=G.min.y,Et=G.min.z):(nt=oe.width,ot=oe.height,mt=oe.depth,vt=0,bt=0,Et=0),W!==null?(Mt=W.x,Zt=W.y,ne=W.z):(Mt=0,Zt=0,ne=0);const Ne=Lt.convert(F.format),Yt=Lt.convert(F.type);let yt;if(F.isData3DTexture)E.setTexture3D(F,0),yt=L.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)E.setTexture2DArray(F,0),yt=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const ve=L.getParameter(L.UNPACK_ROW_LENGTH),Kt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),$e=L.getParameter(L.UNPACK_SKIP_PIXELS),ji=L.getParameter(L.UNPACK_SKIP_ROWS),Fe=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,oe.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oe.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,vt),L.pixelStorei(L.UNPACK_SKIP_ROWS,bt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Et),S.isDataTexture||S.isData3DTexture?L.texSubImage3D(yt,z,Mt,Zt,ne,nt,ot,mt,Ne,Yt,oe.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(yt,z,Mt,Zt,ne,nt,ot,mt,Ne,oe.data):L.texSubImage3D(yt,z,Mt,Zt,ne,nt,ot,mt,Ne,Yt,oe),L.pixelStorei(L.UNPACK_ROW_LENGTH,ve),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Kt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,$e),L.pixelStorei(L.UNPACK_SKIP_ROWS,ji),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Fe),z===0&&F.generateMipmaps&&L.generateMipmap(yt),At.unbindTexture()},this.initRenderTarget=function(S){Pt.get(S).__webglFramebuffer===void 0&&E.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),At.unbindTexture()},this.resetState=function(){I=0,C=0,R=null,At.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Oa?"display-p3":"srgb",e.unpackColorSpace=$t.workingColorSpace===Ks?"display-p3":"srgb"}}class Wa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Tt(t),this.density=e}clone(){return new Wa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class jl extends ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Re,this.environmentIntensity=1,this.environmentRotation=new Re,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Am extends Se{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Le,h=Le,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vs extends Ke{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const dn=new Vt,el=new Vt,ys=[],il=new si,Rm=new Vt,Vn=new It,Gn=new Pn;class Xa extends It{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Vs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Rm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,dn),il.copy(t.boundingBox).applyMatrix4(dn),this.boundingBox.union(il)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,dn),Gn.copy(t.boundingSphere).applyMatrix4(dn),this.boundingSphere.union(Gn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(Vn.geometry=this.geometry,Vn.material=this.material,Vn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gn.copy(this.boundingSphere),Gn.applyMatrix4(i),t.ray.intersectsSphere(Gn)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,dn),el.multiplyMatrices(i,dn),Vn.matrixWorld=el,Vn.raycast(t,ys);for(let a=0,o=ys.length;a<o;a++){const l=ys[a];l.instanceId=r,l.object=this,e.push(l)}ys.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Vs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Am(new Float32Array(s*this.count),s,this.count,Ia,ai));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Zl extends Dn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Gs=new w,Ws=new w,nl=new Vt,Wn=new Ba,Ss=new Pn,Ir=new w,sl=new w;class Cm extends ee{constructor(t=new Ve,e=new Zl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Gs.fromBufferAttribute(e,s-1),Ws.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Gs.distanceTo(Ws);t.setAttribute("lineDistance",new pe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ss.copy(i.boundingSphere),Ss.applyMatrix4(s),Ss.radius+=r,t.ray.intersectsSphere(Ss)===!1)return;nl.copy(s).invert(),Wn.copy(t.ray).applyMatrix4(nl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const m=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let g=m,d=v-1;g<d;g+=c){const p=h.getX(g),T=h.getX(g+1),x=Ts(this,t,Wn,l,p,T);x&&e.push(x)}if(this.isLineLoop){const g=h.getX(v-1),d=h.getX(m),p=Ts(this,t,Wn,l,g,d);p&&e.push(p)}}else{const m=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let g=m,d=v-1;g<d;g+=c){const p=Ts(this,t,Wn,l,g,g+1);p&&e.push(p)}if(this.isLineLoop){const g=Ts(this,t,Wn,l,v-1,m);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ts(n,t,e,i,s,r){const a=n.geometry.attributes.position;if(Gs.fromBufferAttribute(a,s),Ws.fromBufferAttribute(a,r),e.distanceSqToSegment(Gs,Ws,Ir,sl)>i)return;Ir.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ir);if(!(l<t.near||l>t.far))return{distance:l,point:sl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}class qa extends Se{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xe extends Ve{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let v=0;const g=[],d=i/2;let p=0;T(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new pe(u,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(m,2));function T(){const b=new w,I=new w;let C=0;const R=(e-t)/i;for(let U=0;U<=r;U++){const Y=[],_=U/r,M=_*(e-t)+t;for(let A=0;A<=s;A++){const P=A/s,D=P*l+o,O=Math.sin(D),k=Math.cos(D);I.x=M*O,I.y=-_*i+d,I.z=M*k,u.push(I.x,I.y,I.z),b.set(O,R,k).normalize(),f.push(b.x,b.y,b.z),m.push(P,1-_),Y.push(v++)}g.push(Y)}for(let U=0;U<s;U++)for(let Y=0;Y<r;Y++){const _=g[Y][U],M=g[Y+1][U],A=g[Y+1][U+1],P=g[Y][U+1];t>0&&(h.push(_,M,P),C+=3),e>0&&(h.push(M,A,P),C+=3)}c.addGroup(p,C,0),p+=C}function x(b){const I=v,C=new St,R=new w;let U=0;const Y=b===!0?t:e,_=b===!0?1:-1;for(let A=1;A<=s;A++)u.push(0,d*_,0),f.push(0,_,0),m.push(.5,.5),v++;const M=v;for(let A=0;A<=s;A++){const D=A/s*l+o,O=Math.cos(D),k=Math.sin(D);R.x=Y*k,R.y=d*_,R.z=Y*O,u.push(R.x,R.y,R.z),f.push(0,_,0),C.x=O*.5+.5,C.y=k*.5*_+.5,m.push(C.x,C.y),v++}for(let A=0;A<s;A++){const P=I+A,D=M+A;b===!0?h.push(D,D+1,P):h.push(D+1,D,P),U+=3}c.addGroup(p,U,b===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ya extends Xe{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ya(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ka extends Ve{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(T){const x=new w,b=new w,I=new w;for(let C=0;C<e.length;C+=3)m(e[C+0],x),m(e[C+1],b),m(e[C+2],I),l(x,b,I,T)}function l(T,x,b,I){const C=I+1,R=[];for(let U=0;U<=C;U++){R[U]=[];const Y=T.clone().lerp(b,U/C),_=x.clone().lerp(b,U/C),M=C-U;for(let A=0;A<=M;A++)A===0&&U===C?R[U][A]=Y:R[U][A]=Y.clone().lerp(_,A/M)}for(let U=0;U<C;U++)for(let Y=0;Y<2*(C-U)-1;Y++){const _=Math.floor(Y/2);Y%2===0?(f(R[U][_+1]),f(R[U+1][_]),f(R[U][_])):(f(R[U][_+1]),f(R[U+1][_+1]),f(R[U+1][_]))}}function c(T){const x=new w;for(let b=0;b<r.length;b+=3)x.x=r[b+0],x.y=r[b+1],x.z=r[b+2],x.normalize().multiplyScalar(T),r[b+0]=x.x,r[b+1]=x.y,r[b+2]=x.z}function h(){const T=new w;for(let x=0;x<r.length;x+=3){T.x=r[x+0],T.y=r[x+1],T.z=r[x+2];const b=d(T)/2/Math.PI+.5,I=p(T)/Math.PI+.5;a.push(b,1-I)}v(),u()}function u(){for(let T=0;T<a.length;T+=6){const x=a[T+0],b=a[T+2],I=a[T+4],C=Math.max(x,b,I),R=Math.min(x,b,I);C>.9&&R<.1&&(x<.2&&(a[T+0]+=1),b<.2&&(a[T+2]+=1),I<.2&&(a[T+4]+=1))}}function f(T){r.push(T.x,T.y,T.z)}function m(T,x){const b=T*3;x.x=t[b+0],x.y=t[b+1],x.z=t[b+2]}function v(){const T=new w,x=new w,b=new w,I=new w,C=new St,R=new St,U=new St;for(let Y=0,_=0;Y<r.length;Y+=9,_+=6){T.set(r[Y+0],r[Y+1],r[Y+2]),x.set(r[Y+3],r[Y+4],r[Y+5]),b.set(r[Y+6],r[Y+7],r[Y+8]),C.set(a[_+0],a[_+1]),R.set(a[_+2],a[_+3]),U.set(a[_+4],a[_+5]),I.copy(T).add(x).add(b).divideScalar(3);const M=d(I);g(C,_+0,T,M),g(R,_+2,x,M),g(U,_+4,b,M)}}function g(T,x,b,I){I<0&&T.x===1&&(a[x]=T.x-1),b.x===0&&b.z===0&&(a[x]=I/2/Math.PI+.5)}function d(T){return Math.atan2(T.z,-T.x)}function p(T){return Math.atan2(-T.y,Math.sqrt(T.x*T.x+T.z*T.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.vertices,t.indices,t.radius,t.details)}}class $a extends Ka{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new $a(t.radius,t.detail)}}class In extends Ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new w,f=new w,m=[],v=[],g=[],d=[];for(let p=0;p<=i;p++){const T=[],x=p/i;let b=0;p===0&&a===0?b=.5/e:p===i&&l===Math.PI&&(b=-.5/e);for(let I=0;I<=e;I++){const C=I/e;u.x=-t*Math.cos(s+C*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+C*r)*Math.sin(a+x*o),v.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),d.push(C+b,1-x),T.push(c++)}h.push(T)}for(let p=0;p<i;p++)for(let T=0;T<e;T++){const x=h[p][T+1],b=h[p][T],I=h[p+1][T],C=h[p+1][T+1];(p!==0||a>0)&&m.push(x,b,C),(p!==i-1||l<Math.PI)&&m.push(b,I,C)}this.setIndex(m),this.setAttribute("position",new pe(v,3)),this.setAttribute("normal",new pe(g,3)),this.setAttribute("uv",new pe(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ii extends Dn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ll,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Re,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class js extends ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ql extends js{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ur=new Vt,rl=new w,al=new w;class ja{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.map=null,this.mapPass=null,this.matrix=new Vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ha,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;rl.setFromMatrixPosition(t.matrixWorld),e.position.copy(rl),al.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(al),e.updateMatrixWorld(),Ur.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ur),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ur)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Pm extends ja{constructor(){super(new ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,i=wn*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Dm extends js{constructor(t,e,i=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.target=new ee,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Pm}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const ol=new Vt,Xn=new w,Nr=new w;class Lm extends ja{constructor(){super(new ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new St(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Xn.setFromMatrixPosition(t.matrixWorld),i.position.copy(Xn),Nr.copy(i.position),Nr.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Nr),i.updateMatrixWorld(),s.makeTranslation(-Xn.x,-Xn.y,-Xn.z),ol.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ol)}}class Fr extends js{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Lm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Im extends ja{constructor(){super(new Va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Aa extends js{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ee.DEFAULT_UP),this.updateMatrix(),this.target=new ee,this.shadow=new Im}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Um{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ll(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ll();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ll(){return performance.now()}const cl=new Vt;class Jl{constructor(t,e,i=0,s=1/0){this.ray=new Ba(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new ka,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return cl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cl),this}intersectObject(t,e=!0,i=[]){return Ra(t,this,i,e),i.sort(hl),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Ra(t[s],this,i,e);return i.sort(hl),i}}function hl(n,t){return n.distance-t.distance}function Ra(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)Ra(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);const tc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Un{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Nm=new Va(-1,1,1,-1,0,1);class Fm extends Ve{constructor(){super(),this.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pe([0,2,0,0,2,0],2))}}const Om=new Fm;class ec{constructor(t){this._mesh=new It(Om,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Nm)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class ic extends Un{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ae?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Hs.clone(t.uniforms),this.material=new ae({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new ec(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ul extends Un{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class zm extends Un{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Bm{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new St);this._width=i.width,this._height=i.height,e=new Ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:oi}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ic(tc),this.copyPass.material.blending=yi,this.clock=new Um}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ul!==void 0&&(a instanceof ul?i=!0:a instanceof zm&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new St);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class km extends Un{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Tt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const Hm={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Tt(0)},defaultOpacity:{value:0}},vertexShader:`

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

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class An extends Un{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new St(t.x,t.y):new St(256,256),this.clearColor=new Tt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ye(r,a,{type:oi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Ye(r,a,{type:oi});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const m=new Ye(r,a,{type:oi});m.texture.name="UnrealBloomPass.v"+u,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),r=Math.round(r/2),a=Math.round(a/2)}const o=Hm;this.highPassUniforms=Hs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ae({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new St(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=tc;this.copyUniforms=Hs.clone(h.uniforms),this.blendMaterial=new ae({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:li,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Tt,this.oldClearAlpha=1,this.basic=new qe,this.fsQuad=new ec(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new St(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=An.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=An.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ae({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new St(.5,.5)},direction:{value:new St(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new ae({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}An.BlurDirectionX=new St(1,0);An.BlurDirectionY=new St(0,1);class Vm extends Un{constructor(t,e){super(),this.getScene=t,this.getCamera=e,this.needsSwap=!1}render(t,e,i){const s=t.getRenderTarget(),r=t.autoClear;t.autoClear=!1,t.setRenderTarget(i),t.clearDepth(),t.render(this.getScene(),this.getCamera()),t.setRenderTarget(s),t.autoClear=r}}const Gm={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.55},uCA:{value:0},uMotion:{value:0},uGrain:{value:.045},uOverdrive:{value:0},uHitFlash:{value:0},uWhiteFlash:{value:0},uResolution:{value:new St(1,1)}},vertexShader:`
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uCA, uMotion, uGrain, uOverdrive, uHitFlash, uWhiteFlash;
    uniform vec2 uResolution;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    void main(){
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r = length(c);
      vec2 smear = c * uMotion * 0.035;
      vec2 ca = c * uCA * 0.010;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + smear + ca).r;
      col.g = texture2D(tDiffuse, uv + smear).g;
      col.b = texture2D(tDiffuse, uv + smear - ca).b;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      // teal/orange cinematic grade (G1)
      vec3 cool = vec3(0.90, 0.98, 1.14);
      vec3 warm = vec3(1.06, 0.99, 0.92);
      vec3 grade = mix(cool, warm, smoothstep(0.15, 0.75, l));
      col *= grade;
      // OVERDRIVE: punchier saturation + screen-edge glow (D2)
      col = mix(vec3(l), col, mix(1.0, 1.35, uOverdrive));
      col += uOverdrive * smoothstep(0.35, 0.75, r) * vec3(0.04, 0.16, 0.22);
      // damage red vignette
      col = mix(col, vec3(0.55, 0.03, 0.03) * max(l, 0.15), uHitFlash * smoothstep(0.22, 0.72, r));
      // vignette
      col *= 1.0 - uVignette * r * r * 1.1;
      // film grain (low)
      col += (hash(uv * uResolution + fract(uTime) * 137.0) - 0.5) * uGrain;
      // full-yard white flash (G8)
      col += vec3(uWhiteFlash);
      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `};class Wm{constructor(t){this.renderer=new Em({antialias:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.toneMapping=yl,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=xl,t.appendChild(this.renderer.domElement),this.camera=new ye(75,window.innerWidth/window.innerHeight,.06,400),this.quality="high",this._vmScene=null,this._vmCamera=null,this.composite=new ic(Gm),this._buildComposer(),window.addEventListener("resize",()=>this._resize())}_buildComposer(){const t=this.renderer.getSize(new St),e=this.renderer.getPixelRatio(),i=new Ye(t.x*e,t.y*e,{type:oi,samples:0});this.composer=new Bm(this.renderer,i),this.bloomPass=null,this.composer.addPass(this.composite),this.composite.renderToScreen=!0}attachWorld(t,e,i){this._vmScene=e,this._vmCamera=i,this.worldPass=new km(t,this.camera),this.vmPass=new Vm(()=>this._vmScene,()=>this._vmCamera),this.bloomPass=new An(new St(window.innerWidth,window.innerHeight),.55,.85,1.15),this.composer.insertPass(this.worldPass,0),this.composer.insertPass(this.bloomPass,1),this.composer.insertPass(this.vmPass,2),this.bloomPass.enabled=this.quality==="high"}setQuality(t){this.quality=t,this.bloomPass&&(this.bloomPass.enabled=t==="high"),this.renderer.shadowMap.enabled=t==="high",this.renderer.setPixelRatio(t==="high"?Math.min(window.devicePixelRatio,2):1),this.composite.uniforms.uGrain.value=t==="high"?.045:0,this._resize()}_resize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix();const i=this.renderer.getPixelRatio();this.composer.setSize(t*i,e*i),this.composite.uniforms.uResolution.value.set(t*i,e*i)}render(){this.composer.render()}setComposite(t,e){const i=this.composite.uniforms;i.uTime.value=t,e.ca!==void 0&&(i.uCA.value=e.ca),e.hit!==void 0&&(i.uHitFlash.value=e.hit),e.white!==void 0&&(i.uWhiteFlash.value=e.white),e.od!==void 0&&(i.uOverdrive.value=e.od),e.motion!==void 0&&(i.uMotion.value=e.motion)}}const Xm=49370;function dl(n){return function(){n|=0,n=n+1831565813|0;let t=Math.imul(n^n>>>15,1|n);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class qm{constructor(){this._seed=Xm,this._fn=dl(this._seed)}reseed(){this._fn=dl(this._seed)}rand(){return this._fn()}range(t,e){return t+(e-t)*this._fn()}int(t){return Math.floor(this._fn()*t)}pick(t){return t[Math.floor(this._fn()*t.length)]}sign(){return this._fn()<.5?-1:1}}const B=new qm,Or=`
  float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1,0)), c = hash21(i + vec2(0,1)), d = hash21(i + vec2(1,1));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++){ v += a * vnoise(p); p = p * 2.13 + 17.0; a *= 0.5; }
    return v;
  }
`,ke={uTime:{value:0},uAuroraTint:{value:new Tt(3111503)},uAuroraStrength:{value:.16}};function Ym(n){const t=new ae({side:Ae,depthWrite:!1,fog:!1,uniforms:{uTime:ke.uTime},vertexShader:`
      varying vec3 vDir;
      void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
    `,fragmentShader:`
      uniform float uTime; varying vec3 vDir;
      ${Or}
      void main(){
        float h = clamp(vDir.y, -0.1, 1.0);
        vec3 horizon = vec3(0.16, 0.22, 0.42);
        vec3 mid     = vec3(0.07, 0.10, 0.28);
        vec3 zenith  = vec3(0.03, 0.04, 0.13);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.35, h));
        col = mix(col, zenith, smoothstep(0.3, 0.9, h));
        // faint violet band
        col += vec3(0.10, 0.04, 0.12) * exp(-pow((h - 0.25) * 4.0, 2.0));
        // stars, upper sky only, gentle twinkle
        float st = step(0.9985, hash21(floor(vDir.xz * 350.0 + vDir.y * 90.0)));
        float tw = 0.6 + 0.4 * sin(uTime * 2.0 + hash21(floor(vDir.xy * 350.0)) * 40.0);
        col += st * tw * smoothstep(0.15, 0.5, h) * vec3(0.8, 0.85, 1.0) * 0.7;
        gl_FragColor = vec4(col, 1.0);
      }
    `}),e=new It(new In(320,32,20),t);e.name="skydome",n.add(e);const i=new xi;for(let s=0;s<3;s++){const r=new Ie(340,90,96,12),a=new ae({transparent:!0,blending:li,depthWrite:!1,fog:!1,side:ce,uniforms:{uTime:ke.uTime,uSeed:{value:B.range(0,100)},uHueA:{value:new Tt([3526778,4182192,9067744][s])},uHueB:{value:new Tt([1602765,5914576,3124842][s])},uStrength:{value:[.85,.6,.45][s]}},vertexShader:`
        uniform float uTime; uniform float uSeed;
        varying vec2 vUv; varying float vFog;
        ${Or}
        void main(){
          vUv = uv;
          vec3 p = position;
          float w = fbm(vec2(uv.x * 3.0 + uTime * 0.035 + uSeed, uSeed));
          p.y += sin(uv.x * 6.2831 * 1.5 + uTime * 0.22 + uSeed) * 9.0 + w * 22.0 - 11.0;
          p.x += sin(uv.y * 3.0 + uTime * 0.11 + uSeed * 2.0) * 6.0;
          p.z += fbm(vec2(uv.y * 2.0 + uTime * 0.05, uv.x * 4.0 + uSeed)) * 14.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vFog = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        uniform float uTime; uniform float uSeed; uniform float uStrength;
        uniform vec3 uHueA; uniform vec3 uHueB;
        varying vec2 vUv;
        ${Or}
        void main(){
          float n = fbm(vec2(vUv.x * 7.0 - uTime * 0.06 + uSeed, vUv.y * 2.5 + uTime * 0.02));
          float curtain = smoothstep(0.0, 0.35, vUv.y + (n - 0.5) * 0.3) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
          // vertical striations — the classic aurora "pipes"
          float pipes = pow(0.5 + 0.5 * sin(vUv.x * 190.0 + n * 14.0 + sin(uTime * 0.1 + uSeed) * 6.0), 6.0);
          float shimmer = 0.75 + 0.25 * sin(uTime * 0.7 + vUv.x * 20.0 + uSeed);
          vec3 col = mix(uHueA, uHueB, clamp(vUv.y * 1.4 + n * 0.3, 0.0, 1.0));
          float a = curtain * (0.35 + pipes * 0.65) * shimmer * uStrength;
          gl_FragColor = vec4(col * a * 1.6, a);
        }
      `}),o=new It(r,a),l=s/3*Math.PI*2+.6;o.position.set(Math.cos(l)*150,135+s*18,Math.sin(l)*150),o.lookAt(0,120,0),i.add(o)}return n.add(i),{update(s){ke.uTime.value=s;const r=Math.sin(s*.05)*.5+.5;ke.uAuroraTint.value.setHSL(.36+r*.06,.55,.28+r*.08),ke.uAuroraStrength.value=.1+r*.09}}}function bs(n,t){const e=Math.sin(n*12.9898+t*78.233+7.31)*43758.5453;return e-Math.floor(e)}function Km(n,t){let e=0,i=.5,s=n*.055,r=t*.055;for(let a=0;a<4;a++){const o=Math.floor(s),l=Math.floor(r),c=s-o,h=r-l,u=c*c*(3-2*c),f=h*h*(3-2*h);e+=i*(bs(o,l)*(1-u)*(1-f)+bs(o+1,l)*u*(1-f)+bs(o,l+1)*(1-u)*f+bs(o+1,l+1)*u*f),s=s*2.1+B.range(0,3),r=r*2.1+B.range(0,3),i*=.5}return e}function $m(n,t){return(Km(n,t)-.5)*.7}function nc(){const n=new ii({color:14674422,roughness:.88,metalness:0}),t={uTime:ke.uTime,uAuroraTint:ke.uAuroraTint,uAuroraStrength:ke.uAuroraStrength};return n.onBeforeCompile=e=>{Object.assign(e.uniforms,t),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPos;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vWPos; uniform float uTime; uniform vec3 uAuroraTint; uniform float uAuroraStrength;
        float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }`).replace("#include <opaque_fragment>",`#include <opaque_fragment>
        {
          float lum = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
          // wind-packed sparkle: view-dependent glints that shift as the camera moves
          vec2 cell = floor(vWPos.xz * 15.0);
          float id = hash21(cell);
          vec3 vd = normalize(vViewPosition);
          float ph = fract(id * 1.7 + dot(cell, vd.xz * 0.8) + uTime * 0.13 * id);
          float glint = pow(max(sin(ph * 6.2831853), 0.0), 64.0);
          glint *= smoothstep(0.22, 0.65, lum);
          gl_FragColor.rgb += glint * vec3(1.0, 0.97, 0.92) * 0.85;
          // aurora light subtly tinting the snowfield
          gl_FragColor.rgb += uAuroraTint * uAuroraStrength * smoothstep(0.08, 0.55, lum) * 0.30;
        }`)},n.userData.snowUniforms=t,n}function jm(n){const i=new Ie(150,150,150,150);i.rotateX(-Math.PI/2);const s=i.attributes.position;for(let o=0;o<s.count;o++){const l=s.getX(o),c=s.getZ(o);let h=$m(l,c);const u=Math.hypot(l,c);h*=$n.smoothstep(u,6,30),s.setY(o,h)}i.computeVertexNormals();const r=nc(),a=new It(i,r);return a.receiveShadow=!0,a.name="ground",a.userData.surface="snow",n.add(a),{mesh:a,material:r}}function Zm(n){const t=.55+.35*Math.sin(n*.23)*Math.sin(n*.11+1.3)+.12*Math.sin(n*1.9),e=Math.max(.15,t);return{x:.88*e,z:.34*e,s:e}}function xn(n,t,e,i=!0){const s=document.createElement("canvas");s.width=n,s.height=t;const r=s.getContext("2d");e(r,n,t);const a=new qa(s);return a.wrapS=a.wrapT=Ns,i&&(a.colorSpace=Be),a}function Xs(n,t,e,i){for(let s=0;s<t*e/8;s++){const r=Math.floor(B.range(60,200));n.fillStyle=`rgba(${r},${r},${r},${i})`,n.fillRect(B.range(0,t),B.range(0,e),B.range(1,4),B.range(1,4))}}function fn(n,t){const e=xn(256,256,(s,r,a)=>{s.fillStyle=n,s.fillRect(0,0,r,a),Xs(s,r,a,.1);for(let o=0;o<40;o++){s.strokeStyle=`rgba(255,255,255,${B.range(.04,.16)})`,s.lineWidth=B.range(.5,2),s.beginPath();const l=B.range(0,r),c=B.range(0,a);s.moveTo(l,c),s.lineTo(l+B.range(-40,40),c+B.range(-6,6)),s.stroke()}for(let o=0;o<12;o++)s.fillStyle=t,s.globalAlpha=B.range(.12,.35),s.beginPath(),s.ellipse(B.range(0,r),B.range(0,a),B.range(4,22),B.range(3,12),B.range(0,3),0,7),s.fill(),s.globalAlpha=1;s.fillStyle="rgba(0,0,0,0.35)";for(let o=8;o<r;o+=16)s.fillRect(o,4,3,3)}),i=xn(128,128,(s,r,a)=>{s.fillStyle="#999",s.fillRect(0,0,r,a),Xs(s,r,a,.5)},!1);return new ii({map:e,roughnessMap:i,roughness:.85,metalness:.35})}const Qm=(()=>{const n=xn(128,128,(t,e,i)=>{t.fillStyle="#7a5a38",t.fillRect(0,0,e,i);for(let s=0;s<24;s++)t.strokeStyle=`rgba(${B.int(2)?40:160},${40+B.range(0,40)},20,${B.range(.1,.35)})`,t.lineWidth=B.range(1,3),t.beginPath(),t.moveTo(0,B.range(0,i)),t.lineTo(e,B.range(0,i)),t.stroke();t.fillStyle="rgba(30,20,10,0.55)",t.fillRect(0,0,e,6),t.fillRect(0,i-6,e,6),t.fillRect(0,0,6,i),t.fillRect(e-6,0,6,i)});return new ii({map:n,roughness:.95,metalness:0})})();function Jm(){return new ae({transparent:!0,fog:!0,side:ce,uniforms:Object.assign({uTime:ke.uTime,fogColor:{value:new Tt(1845829)},fogDensity:{value:.0165}},ke),vertexShader:`
      varying vec3 vWPos; varying vec3 vN; varying float vFogDepth;
      void main(){
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWPos = wp.xyz;
        vN = normalize(mat3(modelMatrix) * normal);
        vec4 mv = viewMatrix * wp;
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform float uTime; uniform vec3 uAuroraTint;
      varying vec3 vWPos; varying vec3 vN; varying float vFogDepth;
      #ifdef USE_FOG
        uniform vec3 fogColor; uniform float fogDensity;
      #endif
      float h3(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float vn(vec3 p){
        vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(mix(h3(i), h3(i+vec3(1,0,0)), f.x), mix(h3(i+vec3(0,1,0)), h3(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(h3(i+vec3(0,0,1)), h3(i+vec3(1,0,1)), f.x), mix(h3(i+vec3(0,1,1)), h3(i+vec3(1,1,1)), f.x), f.y), f.z);
      }
      void main(){
        vec3 V = normalize(cameraPosition - vWPos);
        vec3 n = normalize(vN);
        float fres = pow(1.0 - abs(dot(V, n)), 2.2);
        float inner = vn(vWPos * 1.4 + vec3(0.0, uTime * 0.015, 0.0));
        float veins = pow(vn(vWPos * 3.1 + inner), 2.0);
        vec3 deep = vec3(0.04, 0.22, 0.42);
        vec3 shallow = vec3(0.52, 0.78, 0.96);
        vec3 col = mix(deep, shallow, clamp(n.y * 0.5 + 0.5 + (inner - 0.5) * 0.6, 0.0, 1.0));
        // fake inner translucency: light bleeding through the block
        col += veins * vec3(0.25, 0.65, 0.85) * 0.55;
        col += fres * vec3(0.45, 0.75, 1.0) * 0.5;
        col += uAuroraTint * 0.06 * inner;
        float sky = 0.45 + 0.55 * max(dot(n, normalize(vec3(-0.5, 0.9, -0.4))), 0.0);
        col *= sky;
        float a = 0.88;
        #ifdef USE_FOG
          float f = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
          col = mix(col, fogColor, f);
        #endif
        gl_FragColor = vec4(col, a);
      }
    `})}function ws(n,t){const e=new ae({side:ce,fog:!0,uniforms:{uTime:ke.uTime,uWind:{value:new St(.8,.3)},uPinLeft:{value:t?1:0},uImpulse:{value:new w(999,999,0)},uImpulseAge:{value:99},map:{value:n},fogColor:{value:new Tt(1845829)},fogDensity:{value:.0165}},vertexShader:`
      uniform float uTime; uniform vec2 uWind; uniform float uPinLeft;
      uniform vec3 uImpulse; uniform float uImpulseAge;
      varying vec2 vUv; varying vec3 vPos2; varying float vFogDepth;
      void main(){
        vUv = uv;
        vec3 p = position;
        float free = uPinLeft > 0.5 ? uv.x : 1.0;
        float gust = 0.55 + 0.45 * sin(uTime * 0.35 + 2.0);
        float w = sin(uv.x * 11.0 + uTime * 7.0) * 0.07 * free
                + sin(uv.y * 7.0 + uTime * 4.6) * 0.045 * free;
        p.z += (w + sin(uv.x * 42.0 + uTime * 24.0) * 0.018 * gust) * (0.4 + gust);
        // bullet hit ripple, decaying
        float id = distance(position.xy, uImpulse.xy);
        p.z += sin(id * 16.0 - uImpulseAge * 20.0) * exp(-id * 2.5) * exp(-uImpulseAge * 2.2) * 0.14;
        vPos2 = p;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vFogDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform sampler2D map; uniform float uTime;
      varying vec2 vUv; varying vec3 vPos2; varying float vFogDepth;
      #ifdef USE_FOG
        uniform vec3 fogColor; uniform float fogDensity;
      #endif
      void main(){
        vec4 tex = texture2D(map, vUv);
        vec3 n = normalize(cross(dFdx(vec3(vPos2.x, vPos2.y, vPos2.z)), dFdy(vec3(vPos2.x, vPos2.y, vPos2.z))));
        float lit = 0.55 + 0.45 * abs(dot(n, normalize(vec3(-0.3, 0.8, 0.5))));
        vec3 col = tex.rgb * lit;
        #ifdef USE_FOG
          float f = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
          col = mix(col, fogColor, f);
        #endif
        gl_FragColor = vec4(col, tex.a);
      }
    `});return e.extensions={derivatives:!0},e}function t0(n){const t=[],e=[],i=[],s=[],r=[],a=[],o=new xi;n.add(o);function l(A,P,D={}){A.castShadow=!D.noShadow,A.receiveShadow=!0,A.userData.surface=P,o.add(A),A.updateWorldMatrix(!0,!1);const O=new si().setFromObject(A),k={box:O,mesh:A,surface:P,shootThrough:D.shootThrough||null,mantle:O.max.y>=.5&&O.max.y<=1.6&&!D.noMantle?O.max.y:0,solid:D.solid!==!1};return t.push(k),D.noRaycast||e.push(A),k}const c=fn("#5a6068","rgba(120,60,30,0.4)");[[0,-30,62,1.4],[0,30,62,1.4],[-30,0,1.4,62],[30,0,1.4,62]].forEach(([A,P,D,O])=>{const k=new It(new re(D,2.2,O),c);k.position.set(A,1.1,P),l(k,"metal",{noMantle:!0})});const h=fn("#c8ccd4","rgba(90,100,120,0.3)"),u=xn(128,128,(A,P,D)=>{A.fillStyle="rgba(255,190,120,1)",A.fillRect(0,0,P,D);for(let O=0;O<900;O++)A.fillStyle=`rgba(235,245,255,${B.range(.25,.85)})`,A.beginPath(),A.arc(B.range(0,P),B.range(0,D),B.range(1,5),0,7),A.fill()});function f(A,P,D,O){const k=new It(new re(O,3.6,5),h);k.position.set(A,1.8,P),k.rotation.y=D,l(k,"module",{noMantle:!0});const q=new It(new re(O*.7,.35,3),c);q.position.set(A,3.85,P),q.rotation.y=D,o.add(q);const H=new w(0,0,2.55).applyAxisAngle(new w(0,1,0),D);for(let J=-1;J<=1;J++){const it=new It(new Ie(1.7,1.2),new qe({map:u,side:ce})),pt=new w(J*(O/3.2),0,0).applyAxisAngle(new w(0,1,0),D);it.position.set(A+H.x+pt.x,2,P+H.z+pt.z),it.rotation.y=D+(H.z>0?0:Math.PI),it.userData.surface="glass",it.userData.breakable=!0,it.userData.isWindow=!0,o.add(it),e.push(it),r.push(it)}}f(-24.5,-6,Math.PI/2,11),f(24.5,8,-Math.PI/2,11);const m=[fn("#a23c2a","rgba(40,20,10,0.5)"),fn("#2a4f8c","rgba(90,50,20,0.45)"),fn("#2e6b46","rgba(60,40,20,0.4)")];[[-8,-10,0],[-8,-6.6,0],[6,-8,Math.PI/2],[10.5,4,0],[-4.5,8.5,Math.PI/2],[15,-15,.44],[-15,16,.2],[2,16,0]].forEach((A,P)=>{const[D,O,k]=A,q=P===0||P===3;for(let H=0;H<(q?2:1);H++){const J=new It(new re(6.06,2.6,2.44),m[(P+H)%3]);if(J.position.set(D,1.3+H*2.6,O),J.rotation.y=k,l(J,"metal",{noMantle:H>0}),H===0){const it=new w(0,0,1.6).applyAxisAngle(new w(0,1,0),k);a.push({pos:new w(D+it.x,0,O+it.z),dir:it.clone().setY(0)}),a.push({pos:new w(D-it.x,0,O-it.z),dir:it.clone().negate().setY(0)})}}}),[[-2,-4,2],[5,6,1],[-12,4,3],[9,-3,1],[-6,14,2],[17,6,1]].forEach(([A,P,D])=>{for(let O=0;O<D;O++){const q=new It(new re(.9,.9,.9),Qm);q.position.set(A+B.range(-.12,.12),.9/2+O*.9,P+B.range(-.12,.12)),q.rotation.y=B.range(0,.5),l(q,"wood",{shootThrough:"wood"})}a.push({pos:new w(A+1.5,0,P),dir:new w(1,0,0)}),a.push({pos:new w(A-1.5,0,P),dir:new w(-1,0,0)})});const d=Jm();[[-16,8,2.2],[12.5,-6,1.8],[0,-17,2.6],[18,12,2],[-19,-16,2.4]].forEach(([A,P,D])=>{const O=new It(new $a(1,0),d);O.scale.set(D*1.15,D*.85,D),O.position.set(A,D*.62,P),O.rotation.y=B.range(0,Math.PI),O.userData.surface="ice",o.add(O),O.updateWorldMatrix(!0,!1),t.push({box:new si().setFromObject(O),mesh:O,surface:"ice",shootThrough:null,mantle:0,solid:!0}),e.push(O),a.push({pos:new w(A+D+1,0,P),dir:new w(1,0,0)})});const p=nc();for(let A=0;A<10;A++){const P=B.range(2,4.5),D=new It(new In(P,14,8,0,Math.PI*2,0,Math.PI/2),p);D.scale.y=B.range(.16,.3);const O=B.range(0,Math.PI*2),k=B.range(8,27);D.position.set(Math.cos(O)*k,-.1,Math.sin(O)*k),D.receiveShadow=!0,D.userData.surface="snow",o.add(D),e.push(D)}const T=0,x=-22,b=new It(new Xe(.12,.22,14,8),c);b.position.set(T,7,x),l(b,"metal",{noMantle:!0});for(let A=0;A<4;A++){const P=new It(new re(1.6-A*.3,.06,.06),c);P.position.set(T,10+A*1.1,x),o.add(P)}const I=[];for(let A=0;A<3;A++){const P=A*(Math.PI*2/3)+.5,D=new w(T+Math.cos(P)*6,.1,x+Math.sin(P)*6),O=new w(T,13.4,x),k=new Ve,q=14;k.setAttribute("position",new Ke(new Float32Array(q*3),3));const H=new Cm(k,new Zl({color:8950952}));H.frustumCulled=!1,o.add(H),I.push({line:H,top:O,anchor:D,N:q,phase:B.range(0,6)})}const C=xn(128,80,(A,P,D)=>{A.fillStyle="#c22a2a",A.fillRect(0,0,P,D),A.fillStyle="#e8e8e8",A.fillRect(0,D*.4,P,D*.2),A.fillStyle="#2a2a34",A.fillRect(P*.1,D*.1,P*.22,D*.22),Xs(A,P,D,.12)}),R=xn(128,128,(A,P,D)=>{A.fillStyle="#3f5548",A.fillRect(0,0,P,D),Xs(A,P,D,.25);for(let O=0;O<8;O++)A.fillStyle="rgba(20,25,20,0.4)",A.fillRect(B.range(0,P),B.range(0,D),B.range(6,20),3)});function U(A,P,D,O,k,q,H){const J=new It(new Ie(A,P,20,12),D);return J.position.copy(O),J.rotation.y=k,J.castShadow=!0,J.userData.surface="tarp",o.add(J),e.push(J),i.push({mesh:J,mat:D,pinLeft:q}),H&&t.push({box:new si().setFromObject(J),mesh:J,surface:"tarp",shootThrough:"tarp",mantle:0,solid:!1}),J}U(1.9,1.1,ws(C,!0),new w(T+.95,12.6,x),0,!0,!1),U(1.6,.95,ws(C,!0),new w(-24.5,4.6,-12.5),Math.PI/2,!0,!1),U(3.2,2.2,ws(R,!1),new w(-6,1.3,-8.2),.15,!1,!0),U(2.6,2,ws(R,!1),new w(8.2,1.2,5.6),1.2,!1,!0);const Y=fn("#b8342a","rgba(30,15,8,0.5)"),_=[[-6.4,-8.4],[7.8,-6.8],[11.8,5.4],[-3.2,10.2],[4.2,4.2],[-13.4,-12.6],[13.2,-13.2],[-10.2,12.8]],M=new Xe(.34,.34,.94,14);return _.forEach(([A,P])=>{const D=new It(M,Y);D.position.set(A,.47,P),D.rotation.y=B.range(0,3),D.castShadow=!0,D.receiveShadow=!0,D.userData.surface="metal",D.userData.drum=!0,o.add(D),e.push(D);const k={box:new si().setFromObject(D),mesh:D,surface:"metal",shootThrough:null,mantle:0,solid:!0,isDrum:!0};t.push(k),s.push({mesh:D,col:k,alive:!0,home:D.position.clone()})}),{group:o,colliders:t,raycastTargets:e,drums:s,windows:r,cloth:i,coverPoints:a,spawnPoints:[new w(-26,0,-26),new w(0,0,-27),new w(26,0,-26),new w(27,0,0),new w(26,0,26),new w(0,0,27),new w(-26,0,26),new w(-27,0,0)],impulseCloth(A){let P=null,D=3.5;for(const O of i){const k=O.mesh.worldToLocal(A.clone()),q=Math.hypot(k.x,k.y);q<D&&Math.abs(k.z)<1.2&&(D=q,P=O,O.mat.uniforms.uImpulse.value.set(k.x,k.y,0),O.mat.uniforms.uImpulseAge.value=0)}return P},breakWindow(A){return A.visible?(A.visible=!1,!0):!1},respawnDrums(){for(const A of s)A.alive=!0,A.mesh.visible=!0,A.mesh.position.copy(A.home),A.col.box.setFromObject(A.mesh)},killDrum(A){A.alive=!1,A.mesh.visible=!1,A.col.solid=!1},update(A,P){const D=Zm(A);for(const O of i)O.mat.uniforms.uWind.value.set(D.x,D.z),O.mat.uniforms.uImpulseAge.value<10&&(O.mat.uniforms.uImpulseAge.value+=P);for(const O of I){const k=O.line.geometry.attributes.position.array;for(let q=0;q<O.N;q++){const H=q/(O.N-1),J=Math.sin(H*Math.PI)*.9,it=Math.sin(A*(3+O.phase)+H*6)*.14*D.s*Math.sin(H*Math.PI);k[q*3]=O.top.x+(O.anchor.x-O.top.x)*H+it,k[q*3+1]=O.top.y+(O.anchor.y-O.top.y)*H-J+it*.4,k[q*3+2]=O.top.z+(O.anchor.z-O.top.z)*H+it*.6}O.line.geometry.attributes.position.needsUpdate=!0}}}}function e0(n){const t=new Ql(4612236,9414856,.7);n.add(t);const e=new Aa(11060462,1.1);e.position.set(16,24,34),e.castShadow=!0,e.shadow.mapSize.set(2048,2048),e.shadow.camera.left=-46,e.shadow.camera.right=46,e.shadow.camera.top=46,e.shadow.camera.bottom=-46,e.shadow.camera.far=140,e.shadow.bias=-8e-4,e.shadow.normalBias=.02,e.shadow.radius=4,n.add(e);const i=[],s=[{x:-16,z:-14,tx:-4,tz:-4},{x:16,z:-12,tx:4,tz:-2},{x:-12,z:14,tx:-2,tz:4},{x:14,z:13,tx:3,tz:3}],r=new ii({color:3817801,roughness:.7,metalness:.6});s.forEach((l,c)=>{const h=new xi,u=new It(new Xe(.09,.13,8.4,8),r);u.position.y=4.2,u.castShadow=!0;const f=new It(new re(.55,.3,.4),r);f.position.set(0,8.3,0),h.add(u,f),h.position.set(l.x,0,l.z),n.add(h);const m=new Dm(16763024,120,42,.62,.55,1.6);m.position.set(l.x,8.25,l.z);const v=new ee;v.position.set(l.tx,0,l.tz),n.add(v),m.target=v,n.add(m),i.push({spot:m,tgt:v,base:new w(l.tx,0,l.tz),phase:c*1.7})}),[[-24,2.2,-6,0],[24,2.2,8,1]].forEach(l=>{const c=new Fr(16756832,8,14,2);c.position.set(l[0],l[1],l[2]),n.add(c)});const a=new Fr(16767400,0,14,2);a.castShadow=!1,n.add(a);const o=new Fr(16744496,0,34,1.8);return n.add(o),n.fog=new Wa(1845829,.0165),{key:e,hemi:t,floods:i,muzzleLight:a,boomLight:o,update(l){i.forEach(c=>{c.tgt.position.x=c.base.x+Math.sin(l*.4+c.phase)*1.1,c.tgt.position.z=c.base.z+Math.cos(l*.31+c.phase*2)*1.1,c.spot.intensity=120+Math.sin(l*7.3+c.phase)*5+Math.sin(l*1.7)*8})}}}const i0=`
  varying vec3 vWPos; varying vec3 vN; varying float vY;
  void main(){
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWPos = wp.xyz; vN = normalize(mat3(modelMatrix) * normal); vY = uv.y;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,n0=`
  uniform float uTime; uniform float uIntensity; uniform vec3 uColor; uniform float uHeight;
  varying vec3 vWPos; varying vec3 vN; varying float vY;
  float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  void main(){
    vec3 V = normalize(cameraPosition - vWPos);
    float rim = 1.0 - abs(dot(V, normalize(vN)));
    float grad = pow(vY, 1.6);                 // brighter near the lamp
    float flick = 0.9 + 0.1 * sin(uTime * 9.0 + floor(vWPos.xz * 2.0).x);
    float a = pow(rim, 2.2) * grad * uIntensity * flick * 0.35;
    gl_FragColor = vec4(uColor * a * 1.4, a);
  }
`;function s0(n,t,e){const i=[],s=new w(0,-1,0);return t.forEach(r=>{const l=new Ya(5.4,8.6,28,1,!0);l.translate(0,-8.6/2,0);const c=new ae({uniforms:{uTime:ke.uTime,uIntensity:{value:1},uColor:{value:new Tt(16750144)},uHeight:{value:8.6}},vertexShader:i0,fragmentShader:n0,transparent:!0,blending:li,depthWrite:!1,side:ce}),h=new It(l,c);h.position.copy(r.spot.position),h.frustumCulled=!1,n.add(h),i.push({cone:h,mat:c,f:r,dir:new w})}),{update(r){for(const a of i)if(a.dir.copy(a.f.tgt.position).sub(a.cone.position).normalize(),a.cone.quaternion.setFromUnitVectors(s,a.dir),a.mat.uniforms.uIntensity.value=.7+Math.sin(r*.9+a.f.phase)*.15,e&&B.rand()<.5){const o=a.cone.position,l=B.range(.15,.9),c=a.f.tgt.position;e.spawn($n.lerp(o.x,c.x,l)+B.range(-1.5,1.5)*l,$n.lerp(o.y,.2,l)+B.range(-.4,.4),$n.lerp(o.z,c.z,l)+B.range(-1.5,1.5)*l,B.range(-.2,.2),B.range(-.15,.1),B.range(-.2,.2),B.range(4,8),.05,0)}}}}const r0=`
  attribute vec3 iPos; attribute vec3 iVel;
  attribute float iStart; attribute float iLife; attribute float iSize; attribute float iSeed; attribute float iGrav;
  uniform float uTime; uniform vec3 uCamRight; uniform vec3 uCamUp;
  uniform vec3 uPlayerPos; uniform float uWrap; uniform float uDrag;
  varying vec2 vUv; varying float vP; varying float vFogDepth;
  void main(){
    float age = uTime - iStart;
    if (age < 0.0 || age > iLife || iSize <= 0.0) {
      gl_Position = vec4(4.0, 4.0, 4.0, 1.0);
      vP = -1.0; vUv = vec2(0.0); vFogDepth = 0.0; return;
    }
    vP = age / iLife;
    float k = uDrag;
    vec3 disp = iVel * (1.0 - exp(-k * age)) / k;
    vec3 vnow = iVel * exp(-k * age);
    vec3 wpos = vec3(iPos.x + disp.x, iPos.y + disp.y + 0.5 * iGrav * age * age, iPos.z + disp.z);
    #ifdef BOUNCE
      if (iGrav < 0.0) {
        float tb = (-vnow.y - sqrt(max(vnow.y * vnow.y + 2.0 * iGrav * (iPos.y - 0.03), 0.0))) / iGrav;
        if (tb > 0.0 && tb < age) {
          float t2 = age - tb;
          float vb = (vnow.y + iGrav * tb) * 0.38;
          wpos.y = abs(vb * t2 + 0.5 * iGrav * t2 * t2) + 0.03;
          float xzr = exp(-k * tb) * 0.55;
          wpos.x = iPos.x + iVel.x * (1.0 - exp(-k * tb)) / k + iVel.x * xzr * t2;
          wpos.z = iPos.z + iVel.z * (1.0 - exp(-k * tb)) / k + iVel.z * xzr * t2;
          vnow = vec3(iVel.x * xzr, vb + iGrav * t2, iVel.z * xzr);
        }
      }
    #endif
    #ifdef WRAP
      wpos.xz = uPlayerPos.xz + mod(wpos.xz - uPlayerPos.xz + uWrap * 0.5, uWrap) - uWrap * 0.5;
      wpos.y = 0.2 + mod(wpos.y, 5.5);
      vnow = iVel;
    #endif
    float sz = iSize * mix(0.35, 1.0, min(vP * 6.0, 1.0)) * (1.0 - vP * vP * 0.7);
    vec4 mv;
    #ifdef STRETCH
      mv = viewMatrix * vec4(wpos, 1.0);
      vec3 vv = (viewMatrix * vec4(vnow, 0.0)).xyz;
      float sp = length(vv);
      vec2 dir = sp > 0.001 ? normalize(vv.xy) : vec2(1.0, 0.0);
      float len = sz * (1.0 + min(sp * 0.09, 7.0));
      vec2 off = dir * (position.y * len) + vec2(dir.y, -dir.x) * (position.x * sz);
      mv.xy += off;
    #else
      vec3 world = wpos + uCamRight * (position.x * sz) + uCamUp * (position.y * sz);
      mv = viewMatrix * vec4(world, 1.0);
    #endif
    vUv = uv;
    vFogDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`,a0=`
  uniform vec3 uColA; uniform vec3 uColB; uniform float uAlpha; uniform float uTime;
  uniform vec3 uFogColor; uniform float uFogDensity;
  varying vec2 vUv; varying float vP; varying float vFogDepth;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main(){
    if (vP < 0.0) discard;
    vec2 d = vUv - 0.5;
    #ifdef SPARK
      float r = abs(d.y) * 2.0 + pow(abs(d.x) * 2.0, 3.0);
    #else
      float r = length(d) * 2.0;
    #endif
    float a = smoothstep(1.0, 0.5, r);
    a *= a;
    a *= uAlpha * (1.0 - smoothstep(0.5, 1.0, vP));
    vec3 col = mix(uColA, uColB, vP);
    col *= 0.85 + 0.3 * hash(floor(vUv * 32.0) + floor(uTime * 11.0));
    float f = 1.0 - exp(-uFogDensity * uFogDensity * vFogDepth * vFogDepth);
    #ifdef ADD
      a *= (1.0 - f);
    #else
      col = mix(col, uFogColor, f * 0.85);
    #endif
    if (a < 0.004) discard;
    gl_FragColor = vec4(col, a);
  }
`;class mi{constructor(t,e){const{count:i,drag:s=2.2,additive:r=!0,stretch:a=!1,wrap:o=!1,bounce:l=!1,spark:c=!1,colorA:h=16777215,colorB:u=16777215,alpha:f=.6,sizeScale:m=1,wrapSize:v=40}=e;this.count=i,this.cursor=0;const g=new Ie(1,1),d=b=>{const I=new Vs(new Float32Array(i*b),b);return I.setUsage(Ul),I};g.setAttribute("iPos",d(3)),g.setAttribute("iVel",d(3)),g.setAttribute("iStart",d(1)),g.setAttribute("iLife",d(1)),g.setAttribute("iSize",d(1)),g.setAttribute("iSeed",d(1)),g.setAttribute("iGrav",d(1));const p={};a&&(p.STRETCH=!0),o&&(p.WRAP=!0),l&&(p.BOUNCE=!0),r&&(p.ADD=!0),c&&(p.SPARK=!0),this.uniforms={uTime:{value:0},uCamRight:{value:new w(1,0,0)},uCamUp:{value:new w(0,1,0)},uPlayerPos:{value:new w},uWrap:{value:v},uDrag:{value:s},uColA:{value:new Tt(h)},uColB:{value:new Tt(u)},uAlpha:{value:f},uFogColor:{value:new Tt(1845829)},uFogDensity:{value:.0165}};const T=new ae({defines:p,uniforms:this.uniforms,vertexShader:r0,fragmentShader:a0,transparent:!0,blending:r?li:Ki,depthWrite:!1});this.mesh=new Xa(g,T,i),this.mesh.frustumCulled=!1,this.mesh.instanceMatrix.setUsage(wa);const x=new Vt;for(let b=0;b<i;b++)this.mesh.setMatrixAt(b,x);this.mesh.instanceMatrix.needsUpdate=!0,t.add(this.mesh),this.geo=g,this.sizeScale=m,this.additive=r,this.live=0}spawn(t,e,i,s,r,a,o,l,c=0){const h=this.geo,u=this.cursor;this.cursor=(this.cursor+1)%this.count,h.getAttribute("iPos").setXYZ(u,t,e,i),h.getAttribute("iVel").setXYZ(u,s,r,a),h.getAttribute("iStart").setX(u,this.uniforms.uTime.value),h.getAttribute("iLife").setX(u,o),h.getAttribute("iSize").setX(u,l*this.sizeScale),h.getAttribute("iSeed").setX(u,u*7919%1e3/1e3),h.getAttribute("iGrav").setX(u,c);for(const f of["iPos","iVel","iStart","iLife","iSize","iSeed","iGrav"])h.getAttribute(f).needsUpdate=!0;this.live++}burst(t,e,i,s,r,a=-6,o=1){for(let l=0;l<e;l++){const c=B.rand()*Math.PI*2,h=B.rand()*Math.PI*.5,u=i*(.4+B.rand()*.8);this.spawn(t.x,t.y,t.z,Math.cos(c)*Math.cos(h)*u,Math.sin(h)*u*o+.5,Math.sin(c)*Math.cos(h)*u,s*(.6+B.rand()*.7),r*(.6+B.rand()*.8),a)}}update(t,e){this.uniforms.uTime.value=t;const i=e.matrixWorld.elements;this.uniforms.uCamRight.value.set(i[0],i[1],i[2]),this.uniforms.uCamUp.value.set(i[4],i[5],i[6]),this.uniforms.uPlayerPos.value.copy(e.position)}}const o0=`
  attribute vec3 iA; attribute vec3 iB;
  attribute float iStart; attribute float iLife; attribute float iSeed;
  uniform float uTime;
  varying vec2 vUv; varying float vP; varying float vHead;
  void main(){
    float age = uTime - iStart;
    if (age < 0.0 || age > iLife || iLife <= 0.0) {
      gl_Position = vec4(4.0, 4.0, 4.0, 1.0); vUv = vec2(0.0); vP = -1.0; vHead = 0.0; return;
    }
    vP = age / iLife;
    vec4 va = viewMatrix * vec4(iA, 1.0);
    vec4 vb = viewMatrix * vec4(iB, 1.0);
    vec3 d = normalize(vb.xyz - va.xyz);
    vec3 n = normalize(cross(d, vec3(0.0, 0.0, 1.0)) + vec3(0.0, 0.001, 0.0));
    float along = position.x + 0.5;
    vec3 p = mix(va.xyz, vb.xyz, along) + n * position.y * (0.035 + 0.02 * (1.0 - vP));
    vUv = vec2(along, position.y + 0.5);
    vHead = min(vP * 3.0, 1.0); // dart travels the line fast
    gl_Position = projectionMatrix * vec4(p, 1.0);
  }
`,l0=`
  uniform vec3 uCoreCol; uniform vec3 uGlowCol;
  varying vec2 vUv; varying float vP; varying float vHead;
  void main(){
    if (vP < 0.0) discard;
    float across = abs(vUv.y - 0.5) * 2.0;
    float core = pow(max(1.0 - across, 0.0), 6.0);
    float glow = pow(max(1.0 - across, 0.0), 1.6) * 0.35;
    // trailing fade behind the dart head + whole-line flash that dies out
    float behind = smoothstep(vHead - 0.55, vHead, vUv.x) * step(vUv.x, vHead + 0.02);
    float flash = (1.0 - vP) * (1.0 - vP) * 0.35;
    float a = (core * (behind + flash) + glow * (behind * 0.7 + flash));
    vec3 col = mix(uGlowCol, uCoreCol, core);
    if (a < 0.004) discard;
    gl_FragColor = vec4(col * a * 2.2, a);
  }
`;class c0{constructor(t,e=48){this.cap=e,this.cursor=0,this.active=0;const i=new Ie(1,1),s=o=>{const l=new Vs(new Float32Array(e*o),o);return l.setUsage(Ul),l};i.setAttribute("iA",s(3)),i.setAttribute("iB",s(3)),i.setAttribute("iStart",s(1)),i.setAttribute("iLife",s(1)),i.setAttribute("iSeed",s(1)),this.uniforms={uTime:{value:0},uCoreCol:{value:new Tt(16774880)},uGlowCol:{value:new Tt(16751168)}};const r=new ae({uniforms:this.uniforms,vertexShader:o0,fragmentShader:l0,transparent:!0,blending:li,depthWrite:!1,side:ce});this.mesh=new Xa(i,r,e),this.mesh.frustumCulled=!1;const a=new Vt;for(let o=0;o<e;o++)this.mesh.setMatrixAt(o,a);this.mesh.instanceMatrix.needsUpdate=!0,t.add(this.mesh),this.geo=i,this._spawnT=0}setGlow(t){this.uniforms.uCoreCol.value.set(t?14221311:16774880),this.uniforms.uGlowCol.value.set(t?4249855:16751168)}spawn(t,e,i){const s=this.geo,r=this.cursor;this.cursor=(this.cursor+1)%this.cap,s.getAttribute("iA").setXYZ(r,t.x,t.y,t.z),s.getAttribute("iB").setXYZ(r,e.x,e.y,e.z),s.getAttribute("iStart").setX(r,i+B.range(0,.004)),s.getAttribute("iLife").setX(r,.09),s.getAttribute("iSeed").setX(r,B.rand());for(const a of["iA","iB","iStart","iLife","iSeed"])s.getAttribute(a).needsUpdate=!0;this._spawnT=i}update(t){this.uniforms.uTime.value=t}}function Es(n){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");n(e);const i=new qa(t);return i.colorSpace=Be,i}function h0(){const n=Es(s=>{const r=s.createRadialGradient(64,64,2,64,64,40);r.addColorStop(0,"rgba(10,12,16,1)"),r.addColorStop(.45,"rgba(24,28,36,0.9)"),r.addColorStop(.6,"rgba(225,238,250,0.85)"),r.addColorStop(1,"rgba(225,238,250,0)"),s.fillStyle=r,s.fillRect(0,0,128,128);for(let a=0;a<14;a++){const o=B.range(0,6.28),l=B.range(28,52);s.fillStyle="rgba(200,220,240,0.5)",s.beginPath(),s.arc(64+Math.cos(o)*l,64+Math.sin(o)*l,B.range(1,3),0,7),s.fill()}}),t=[];for(let s=0;s<3;s++)t.push(Es(r=>{r.fillStyle="rgba(120,8,14,0.95)",r.beginPath(),r.ellipse(64,64,B.range(20,34),B.range(16,30),B.range(0,3),0,7),r.fill();for(let a=0;a<18;a++){const o=B.range(0,6.28),l=B.range(20,58);r.fillStyle=`rgba(${100+B.int(60)},6,10,${B.range(.5,.95)})`,r.beginPath(),r.ellipse(64+Math.cos(o)*l,64+Math.sin(o)*l,B.range(2,10),B.range(2,7),o,0,7),r.fill()}for(let a=0;a<40;a++){const o=B.range(0,6.28),l=B.range(30,62);r.fillStyle=`rgba(150,10,16,${B.range(.3,.8)})`,r.fillRect(64+Math.cos(o)*l,64+Math.sin(o)*l,B.range(1,3),B.range(1,3))}}));const e=Es(s=>{const r=s.createRadialGradient(64,64,4,64,64,60);r.addColorStop(0,"rgba(8,6,6,0.95)"),r.addColorStop(.5,"rgba(20,14,10,0.7)"),r.addColorStop(.75,"rgba(60,40,20,0.35)"),r.addColorStop(1,"rgba(60,40,20,0)"),s.fillStyle=r,s.fillRect(0,0,128,128)}),i=Es(s=>{s.strokeStyle="rgba(230,245,255,0.9)";for(let r=0;r<7;r++){const a=r/7*6.28+B.range(-.3,.3);s.lineWidth=B.range(1,3),s.beginPath(),s.moveTo(64,64);let o=64,l=64;for(let c=0;c<4;c++)o+=Math.cos(a+B.range(-.4,.4))*B.range(8,18),l+=Math.sin(a+B.range(-.4,.4))*B.range(8,18),s.lineTo(o,l);s.stroke()}s.fillStyle="rgba(10,30,50,0.6)",s.beginPath(),s.arc(64,64,10,0,7),s.fill()});return{hole:n,blood:t,scorch:e,crack:i}}class u0{constructor(t,e=240){this.cap=e,this.cursor=0,this.used=0,this.textures=h0(),this.mats={},this.mats.hole=new qe({map:this.textures.hole,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:ce}),this.mats.scorch=new qe({map:this.textures.scorch,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:ce}),this.mats.crack=new qe({map:this.textures.crack,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:ce}),this.bloodMats=this.textures.blood.map(i=>new qe({map:i,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:ce})),this.geo=new Ie(1,1),this.pool=[];for(let i=0;i<e;i++){const s=new It(this.geo,this.mats.hole);s.visible=!1,s.userData._life=0,t.add(s),this.pool.push(s)}this._up=new w(0,1,0),this._q=new Ee}spawn(t,e,i,s,r={}){const a=this.pool[this.cursor];this.cursor=(this.cursor+1)%this.cap,a.visible||this.used++,a.visible=!0,t==="blood"?a.material=this.bloodMats[(r.variant??B.int(3))%3]:a.material=this.mats[t],a.position.copy(e).addScaledVector(i,.015),this._q.setFromUnitVectors(this._up,i),a.quaternion.copy(this._q),a.rotateZ(B.range(0,Math.PI*2));const o=s*B.range(.8,1.3);return a.scale.set(o,o,1),t==="blood"&&(a.scale.y=o*B.range(.7,1)),a.userData._life=r.life||0,a}trail(t){return this.spawn("blood",t,this._up,.5,{variant:B.int(3),life:6})}clearAll(){for(const t of this.pool)t.visible=!1,t.userData._life=0;this.used=0,this.cursor=0}update(t){for(const e of this.pool)e.visible&&e.userData._life>0&&(e.userData._life-=t,e.userData._life<=0&&(e.visible=!1,this.used=Math.max(0,this.used-1)))}}class d0{constructor(t,e=36,i={}){this.cap=e,this.cursor=0,this.hooks=i;const s=new Xe(.011,.012,.038,8),r=new ii({color:14197322,metalness:.95,roughness:.25,emissive:6697728,emissiveIntensity:.5});this.mesh=new Xa(s,r,e),this.mesh.castShadow=!1,this.mesh.frustumCulled=!1,t.add(this.mesh),this.s=[];for(let a=0;a<e;a++)this.s.push({alive:!1,t:0,pos:new w,vel:new w,quat:new Ee,spin:new w,rested:!1,steamed:!1,bounced:!1,mat4:new Vt});this._m=new Vt,this._e=new Re,this._v=new w,this._zero=new Vt().makeScale(0,0,0),this.active=0}spawn(t,e,i,s){const r=this.s[this.cursor];this.cursor=(this.cursor+1)%this.cap,r.alive=!0,r.t=0,r.rested=!1,r.steamed=!1,r.bounced=!1,r.pos.copy(t),r.vel.copy(e).multiplyScalar(B.range(2.2,3.4)).addScaledVector(i,B.range(1.4,2.4)).addScaledVector(s,B.range(-.6,.4)),r.spin.set(B.range(-14,14),B.range(-14,14),B.range(-14,14)),this.active=this.s.reduce((a,o)=>a+(o.alive?1:0),0)}update(t){let e=0;for(let i=0;i<this.cap;i++){const s=this.s[i];if(!s.alive){this.mesh.setMatrixAt(i,this._zero);continue}if(e++,s.t+=t,!s.rested){s.vel.y-=9.8*t,s.pos.addScaledVector(s.vel,t);const a=this._m.makeRotationFromEuler(this._e.set(s.spin.x*t,s.spin.y*t,s.spin.z*t));if(s.quat.premultiply(a),s.pos.y<.015){if(s.pos.y=.015,!s.bounced&&Math.abs(s.vel.y)>.8&&this.hooks.onTinkle){const o=this.hooks.camPos?this.hooks.camPos():s.pos;this.hooks.onTinkle(s.pos,$n.clamp(1-s.pos.distanceTo(o)/24,.05,1)),s.bounced=!0}s.vel.y=-s.vel.y*.35,s.vel.x*=.6,s.vel.z*=.6,s.spin.multiplyScalar(.5),Math.abs(s.vel.y)<.5&&(s.rested=!0,s.quat.setFromEuler(this._e.set(Math.PI/2,B.rand()*6.28,0)),this.hooks.onHardLand&&this.hooks.onHardLand(s.pos))}}if(s.rested&&!s.steamed&&this.hooks.onSteam&&(s.steamed=!0,this.hooks.onSteam(s.pos)),s.t>10){s.alive=!1,this.mesh.setMatrixAt(i,this._zero);continue}const r=s.t>9?Math.max(0,10-s.t):1;this._m.compose(s.pos,s.quat,this._v.set(r,r,r)),this.mesh.setMatrixAt(i,this._m)}this.active=e,this.mesh.instanceMatrix.needsUpdate=!0}clear(){for(const t of this.s)t.alive=!1;this.active=0}}const _t=(n,t,e)=>n<t?t:n>e?e:n,Je=(n,t,e)=>n+(t-n)*e,Mi=n=>1-Math.pow(1-n,3),jn=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,fl=n=>1+2.70158*Math.pow(n-1,3)+1.70158*Math.pow(n-1,2);function De(n,t,e,i){const s=n+(t-n)*(1-Math.exp(-e*i));return Number.isFinite(s)?s:t}class gi{constructor(t=0,e=180,i=22){this.value=t,this.target=t,this.vel=0,this.stiffness=e,this.damping=i}set(t){this.value=t,this.vel=0,this.target=t}impulse(t){this.vel+=t}update(t){(!Number.isFinite(this.value)||!Number.isFinite(this.vel))&&(this.value=this.target,this.vel=0);const e=-this.stiffness*(this.value-this.target)-this.damping*this.vel;return this.vel+=e*t,this.value+=this.vel*t,Number.isFinite(this.value)||(this.value=this.target,this.vel=0),this.value}}const f0=`
  uniform float uA; varying vec2 vUv;
  void main(){
    float r = length(vUv - 0.5) * 2.0;
    float ring = smoothstep(0.92, 1.0, r) * smoothstep(1.0, 0.98, r);
    float glow = smoothstep(0.6, 1.0, r) * 0.25;
    float a = (ring + glow) * uA;
    vec3 col = mix(vec3(0.7, 0.85, 1.0), vec3(1.0, 0.75, 0.45), 0.35);
    gl_FragColor = vec4(col * a * 1.8, a);
  }
`;class p0{constructor(t,e,i,s,r){this.fields=e,this.decals=i,this.audio=s,this.game=r,this.rings=[];for(let a=0;a<4;a++){const o=new ae({uniforms:{uA:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:f0,transparent:!0,blending:li,depthWrite:!1,side:ce}),l=new It(new Ie(1,1),o);l.rotation.x=-Math.PI/2,l.visible=!1,t.add(l),this.rings.push({mesh:l,mat:o,t:0,active:!1})}this.cores=[];for(let a=0;a<4;a++){const o=new It(new In(1,12,10),new qe({color:16763e3,transparent:!0,opacity:0}));o.visible=!1,t.add(o),this.cores.push({mesh:o,t:0,active:!1})}this._pending=[]}explode(t,e=!0){const i=this.fields;this.game.whiteFlash(.85),this.game.boomLight(t);const s=this.game.camera.position.distanceTo(t);s<18&&this.game.controller.shakeNear(t,_t(1.6*(1-s/18),.3,1.6)),this.audio.playExplosion(t,s);const r=this.cores.find(o=>!o.active)||this.cores[0];r.active=!0,r.t=0,r.mesh.visible=!0,r.mesh.position.copy(t).setY(t.y+.7);for(let o=0;o<26;o++){const l=B.rand()*Math.PI*2,c=B.range(2,7);i.fire.spawn(t.x,t.y+.6,t.z,Math.cos(l)*c,B.range(3,8),Math.sin(l)*c,B.range(.5,1.1),B.range(.5,1.2),-3.5)}const a=this.rings.find(o=>!o.active)||this.rings[0];a.active=!0,a.t=0,a.mesh.visible=!0,a.mesh.position.set(t.x,.12,t.z);for(let o=0;o<30;o++){const l=o/30*Math.PI*2;i.powder.spawn(t.x,.15,t.z,Math.cos(l)*B.range(9,15),B.range(.5,2),Math.sin(l)*B.range(9,15),B.range(.7,1.2),.3,-1.5)}for(let o=0;o<24;o++){const l=B.rand()*Math.PI*2;i.sparks.spawn(t.x,t.y+.5,t.z,Math.cos(l)*B.range(5,13),B.range(3,9),Math.sin(l)*B.range(5,13),B.range(.6,1.3),.06,-15)}this.decals.spawn("scorch",t.clone().setY(.02),new w(0,1,0),4.2,{life:0});for(let o=0;o<8;o++){const l=B.rand()*Math.PI*2;i.debris.spawn(t.x,t.y+.6,t.z,Math.cos(l)*B.range(3,8),B.range(4,9),Math.sin(l)*B.range(3,8),B.range(1.2,2.2),.12,-12)}if(this.game.explosionImpulse(t,9,26),e)for(const o of this.game.props.drums){if(!o.alive)continue;const l=o.mesh.position.distanceTo(t);l<7&&this._pending.push({at:this.game.time.t+.12+l*.03,pos:o.mesh.position.clone(),drum:o})}}update(t,e){for(const i of this.rings){if(!i.active)continue;i.t+=t;const s=_t(i.t/.65,0,1),r=Mi(s)*14+.5;i.mesh.scale.set(r,r,1),i.mat.uniforms.uA.value=(1-s)*(1-s)*.9,s>=1&&(i.active=!1,i.mesh.visible=!1)}for(const i of this.cores){if(!i.active)continue;i.t+=t;const s=_t(i.t/.45,0,1),r=.4+Mi(s)*2.6;i.mesh.scale.set(r,r*(1-s*.3),r),i.mesh.material.opacity=(1-s)*.95,i.mesh.material.color.setHSL(.09-s*.05,1,.75-s*.3),s>=1&&(i.active=!1,i.mesh.visible=!1)}for(let i=this._pending.length-1;i>=0;i--)if(e>=this._pending[i].at){const s=this._pending[i];this._pending.splice(i,1),s.drum.alive&&this.game.drumExplode(s.drum)}}clearPending(){this._pending.length=0}}class m0{constructor(t,e,i,s){this.f=t,this.decals=e,this.props=i,this.audio=s,this._n=new w}impact(t,e,i,s,r=1){const a=this.f;switch(i){case"snow":case"ground":a.powder.burst(t,10,3.2*r,.7,.16,-2.5,1.4),a.powder.spawn(t.x,t.y+.1,t.z,s.x*-.4,.6,s.z*-.4,.9,.22,-.8),this.decals.spawn("hole",t,e,.34),this.audio.playImpactSnow(B.range(.6,1)*r);break;case"metal":{const o=Math.round(14*r);for(let l=0;l<o;l++){const c=B.rand()*Math.PI*2,h=B.range(3,8);a.sparks.spawn(t.x,t.y,t.z,Math.cos(c)*h+s.x*2,B.range(1,5),Math.sin(c)*h+s.z*2,B.range(.4,.9),.05,-14)}a.smoke.spawn(t.x,t.y+.05,t.z,s.x*.3,.5,s.z*.3,1.2,.12,-.2),this.decals.spawn("hole",t,e,.2),this.audio.playImpactMetal(B.range(.5,1)*r);break}case"wood":{for(let o=0;o<10;o++)a.debris.spawn(t.x,t.y,t.z,s.x*B.range(1,3)+B.range(-2,2),B.range(1,4),s.z*B.range(1,3)+B.range(-2,2),B.range(.5,1),.06,-12);this.decals.spawn("hole",t,e,.24),this.audio.playImpactWood(B.range(.5,1)*r);break}case"ice":{for(let o=0;o<12;o++)a.chips.spawn(t.x,t.y,t.z,B.range(-3,3),B.range(1,5),B.range(-3,3),B.range(.6,1.2),.07,-10);this.decals.spawn("crack",t,e,.5),this.audio.playImpactIce(B.range(.5,1)*r);break}case"tarp":{a.debris.burst(t,6,1.6,.8,.07,-2),this.props.impulseCloth(t),this.audio.playImpactCanvas(r);break}case"glass":{this.audio.playGlassBreak();for(let o=0;o<26;o++)a.shards.spawn(t.x,t.y,t.z,s.x*B.range(.5,2)+B.range(-1.5,1.5),B.range(-.5,2),s.z*B.range(.5,2)+B.range(-1.5,1.5),B.range(.8,1.6),.09,-11);break}case"module":case"flesh":default:a.powder.burst(t,6,2.2,.5,.12,-3),this.decals.spawn("hole",t,e,.22),this.audio.playImpactSnow(.5*r);break}}}class g0{constructor(){this.keys={},this.pressed={},this.released={},this.dx=0,this.dy=0,this.lmb=!1,this.rmb=!1,this.lmbPressed=!1,this.rmbPressed=!1,this.rmbReleased=!1,this.locked=!1,this.lockError=!1,this.onPointerLockLost=null,this._lastShift=0,this._shiftDouble=!1,this._lastQ=0,this._qDouble=!1,this._lastW=0,this.enabled=!0,window.addEventListener("keydown",t=>this._key(t,!0)),window.addEventListener("keyup",t=>this._key(t,!1)),window.addEventListener("mousedown",t=>{this.locked&&(t.button===0&&(this.lmb=!0,this.lmbPressed=!0),t.button===2&&(this.rmb=!0,this.rmbPressed=!0))}),window.addEventListener("mouseup",t=>{t.button===0&&(this.lmb=!1),t.button===2&&(this.rmb=!1,this.rmbReleased=!0)}),window.addEventListener("mousemove",t=>{this.locked&&(this.dx+=t.movementX,this.dy+=t.movementY)}),window.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("pointerlockchange",()=>{const t=this.locked;this.locked=document.pointerLockElement!=null,t&&!this.locked&&this.enabled&&this.onPointerLockLost&&this.onPointerLockLost(),this.locked||(this.lmb=!1,this.rmb=!1,this.keys={})}),document.addEventListener("pointerlockerror",()=>{this.lockError=!0,this.locked=!1}),window.addEventListener("blur",()=>{this.keys={},this.lmb=!1,this.rmb=!1})}_key(t,e){if(t.code==="Backquote"&&t.preventDefault(),!(t.repeat&&e))if(e){if(t.code==="ShiftLeft"){const i=performance.now();i-this._lastShift<260&&(this._shiftDouble=!0),this._lastShift=i}if(t.code==="KeyQ"){const i=performance.now();i-this._lastQ<260&&(this._qDouble=!0),this._lastQ=i}this.keys[t.code]=!0,this.pressed[t.code]||(this.pressed[t.code]=!0)}else delete this.keys[t.code],this.released[t.code]=!0}requestLock(t){if(t.requestPointerLock)try{const e=t.requestPointerLock();e&&e.catch&&e.catch(()=>{})}catch{}}down(t){return!!this.keys[t]}pressedEdge(t){return!!this.pressed[t]}releasedEdge(t){return!!this.released[t]}consumeShiftDouble(){const t=this._shiftDouble;return this._shiftDouble=!1,t}consumeQDouble(){const t=this._qDouble;return this._qDouble=!1,t}endFrame(){this.dx=0,this.dy=0,this.pressed={},this.released={},this.lmbPressed=!1,this.rmbPressed=!1,this.rmbReleased=!1}}class _0{constructor(){this.dt=0,this.rawDt=0,this.t=0,this.realT=0,this.timeScale=1,this._hitstop=0,this.overdrive=0,this.killcam=0}hitstop(t,e=.1){this._hitstop=Math.max(this._hitstop,t),this._hitstopScale=e}startOverdrive(t){this.overdrive=t}startKillcam(t){this.killcam=t}get overdriveActive(){return this.overdrive>0}get killcamActive(){return this.killcam>0}update(t){t=_t(t,0,.05),this.rawDt=t;let e=1;this._hitstop>0&&(e=this._hitstopScale,this._hitstop-=t),this.overdrive>0&&(this.overdrive-=t),this.killcam>0&&(e*=.3,this.killcam-=t),this.timeScale=e,this.dt=t*e,this.t+=this.dt,this.realT+=t}reset(){this._hitstop=0,this.overdrive=0,this.killcam=0,this.timeScale=1,this.t=0,this.realT=0}}class v0{constructor(){this.el=document.getElementById("debug-overlay"),this.visible=!1,this._acc=0,this.el.style.display="none"}toggle(){this.visible=!this.visible,this.el.style.display=this.visible?"block":"none"}update(t,e){this.visible&&(this._acc+=t,!(this._acc<.25)&&(this._acc=0,this.el.textContent=`WHITEOUT DEBUG  seed 0x${(e.seed>>>0).toString(16).toUpperCase()}
fps ${e.fps.toFixed(0)}  frame ${e.frameMs.toFixed(2)}ms  dt ${e.dt.toFixed(3)}  scale ${e.timeScale.toFixed(2)}
draw calls ${e.calls}  tris ${e.tris}
particles ${e.particles}/${e.particleCap}  ragdolls ${e.ragdolls}/${e.ragdollCap}  ai ${e.ai}/${e.aiCap}
decals ${e.decals}/${e.decalCap}  shells ${e.shells}/${e.shellCap}  tracers ${e.tracers}/${e.tracerCap}
pool util: fx ${(e.poolFx*100).toFixed(0)}%  decals ${(e.poolDecal*100).toFixed(0)}%  dmg ${(e.poolDmg*100).toFixed(0)}%`))}}function pn(n,t=.45,e=.8){return new ii({color:n,roughness:t,metalness:e})}class x0{constructor(){this.scene=new jl,this.camera=new ye(55,1,.01,12),this.scene.add(this.camera),this.group=new xi,this.camera.add(this.group);const t=new Ql(10467549,1317932,2.6),e=new Aa(14674687,4.5);e.position.set(.5,1.6,-.4);const i=new Aa(16756848,1.4);i.position.set(1.2,.4,-.6),this.camera.add(t,e,i);const s=pn(6975608,.42,.35),r=pn(3816770,.5,.4),a=pn(4869719,.75,.15),o=pn(3356220,.9,.05),l=(m,v,g,d,p,T)=>{const x=new It(m,v);return x.position.set(g,d,p),x.name=T,this.group.add(x),x};this.parts={},this.parts.receiver=l(new re(.075,.1,.4),s,0,0,-.16,"receiver"),this.parts.stock=l(new re(.06,.11,.3),a,0,.005,.19,"stock"),this.parts.stockPad=l(new re(.065,.13,.05),r,0,.005,.345,"stockPad"),this.parts.grip=l(new re(.05,.13,.06),a,0,-.1,-.02,"grip"),this.parts.handguard=l(new re(.065,.075,.3),r,0,-.008,-.5,"handguard"),this.parts.rail=l(new re(.04,.02,.5),s,0,.058,-.3,"rail"),this.parts.barrel=l(new Xe(.016,.019,.3,10),s,0,.008,-.78,"barrel"),this.parts.barrel.rotation.x=Math.PI/2,this.parts.flashHider=l(new Xe(.022,.02,.07,10),r,0,.008,-.94,"flashHider"),this.parts.flashHider.rotation.x=Math.PI/2,this.parts.mag=l(new re(.045,.19,.09),a,0,-.13,-.14,"mag"),this.parts.mag.rotation.x=.12,this.parts.magNew=new It(new re(.045,.19,.09),a),this.parts.magNew.name="magNew",this.parts.magNew.visible=!1,this.group.add(this.parts.magNew),this.parts.charging=new It(new re(.055,.025,.09),s),this.parts.charging.position.set(.02,.062,-.02),this.parts.charging.name="charging",this.group.add(this.parts.charging),this.parts.handF=l(new re(.07,.1,.16),o,-.01,-.075,-.52,"handFront"),this.parts.handR=l(new re(.07,.11,.09),o,.005,-.115,-.01,"handRear");const c=pn(1842464,.35,.9);this.parts.opticTube=l(new Xe(.036,.036,.13,20,1,!0),c,0,.075,-.165,"opticTube"),this.parts.opticTube.rotation.x=Math.PI/2,this.parts.opticHood=l(new Xe(.042,.038,.03,20,1,!0),c,0,.075,-.235,"opticHood"),this.parts.opticHood.rotation.x=Math.PI/2;const h=new It(new Xe(.033,.033,.12,20),new qe({color:8956671,transparent:!0,opacity:.05,depthWrite:!1}));h.rotation.x=Math.PI/2,h.position.set(0,.075,-.165),h.name="glass",this.group.add(h),this.dot=new It(new In(.0028,8,8),new qe({color:16720418,transparent:!0,opacity:0})),this.dot.position.set(0,.075,-.226),this.dot.name="dot",this.group.add(this.dot),this.rearSightAnchor=new ee,this.rearSightAnchor.position.set(0,.075,-.1),this.group.add(this.rearSightAnchor),this.frontSightAnchor=new ee,this.frontSightAnchor.position.set(0,.075,-.226),this.group.add(this.frontSightAnchor),this.muzzleAnchor=new ee,this.muzzleAnchor.position.set(0,.008,-.98),this.group.add(this.muzzleAnchor),this.shellPort=new ee,this.shellPort.position.set(.045,.03,-.1),this.group.add(this.shellPort);const u=document.createElement("canvas");u.width=u.height=128;{const m=u.getContext("2d"),v=m.createRadialGradient(64,64,2,64,64,60);v.addColorStop(0,"rgba(255,255,240,1)"),v.addColorStop(.25,"rgba(255,220,130,0.9)"),v.addColorStop(.6,"rgba(255,130,30,0.35)"),v.addColorStop(1,"rgba(255,80,10,0)"),m.fillStyle=v,m.beginPath();for(let g=0;g<8;g++){const d=g/8*Math.PI*2,p=g%2?26:62;m[g?"lineTo":"moveTo"](64+Math.cos(d)*p,64+Math.sin(d)*p)}m.closePath(),m.fill(),m.fillStyle=v,m.beginPath(),m.arc(64,64,30,0,7),m.fill()}const f=new qa(u);f.colorSpace=Be,this.flash=new It(new Ie(.5,.5),new qe({map:f,transparent:!0,blending:li,depthWrite:!1,side:ce})),this.flash.position.copy(this.muzzleAnchor.position),this.flash.visible=!1,this.group.add(this.flash),this.shimmerMat=new ae({transparent:!0,depthWrite:!1,blending:li,side:ce,uniforms:{uTime:{value:0},uAmt:{value:0}},vertexShader:`
        uniform float uTime; varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,fragmentShader:`
        uniform float uTime; uniform float uAmt; varying vec2 vUv;
        void main(){
          if (uAmt < 0.01) discard;
          float x = vUv.x;
          float wob = sin(x * 30.0 + uTime * 14.0) * 0.5 + sin(x * 53.0 - uTime * 9.0) * 0.5;
          float a = pow(1.0 - vUv.y, 2.0) * smoothstep(0.12, 0.0, abs(vUv.y - 0.06 + wob * 0.03)) * 0.12 * uAmt;
          vec3 col = mix(vec3(1.0, 0.75, 0.45), vec3(0.8, 0.9, 1.0), vUv.y);
          gl_FragColor = vec4(col * a, a);
        }
      `}),this.shimmer=new It(new Ie(.5,.16),this.shimmerMat),this.shimmer.position.set(0,.1,-.75),this.shimmer.rotation.x=-.12,this.group.add(this.shimmer),this.hipPos=new w(.185,-.155,-.28),this.hipQuat=new Ee().setFromEuler(new Re(.1,-.16,.14)),this.adsPos=new w,this.adsQuat=new Ee,this.adsT=0,this.kick={x:0,y:0,z:0,pitch:0,yaw:0},this.bobPhase=0,this.sway={x:0,y:0},this.flashT=0,this.heat=0,this.reloadAnim={active:!1,t:0,dur:2,tactical:!1,aborted:!1,ejected:!1,slammed:!1,ejectedMag:null},this.inspectT=-1,this._tmpQ=new Ee,this._tmpQ2=new Ee,this._tmpV=new w,this._tmpV2=new w,this._e=new Re,this._ejectV=new w,this.solveADS()}solveADS(){const t=this.rearSightAnchor.position,e=this.frontSightAnchor.position,i=this._tmpV.copy(e).sub(t).normalize(),s=new w(0,0,-1),r=this._tmpQ.setFromUnitVectors(i,s),a=this._tmpV2.set(0,1,0).applyQuaternion(r),o=Math.atan2(a.x,a.y),l=new Ee().setFromAxisAngle(s,-o);this.adsQuat.copy(l).multiply(r);const c=t.clone().applyQuaternion(this.adsQuat);this.adsPos.set(-c.x,-c.y,-.1-c.z)}fire(){this.flashT=.045,this.flash.visible=!0,this.flash.rotation.z=B.range(0,Math.PI*2);const t=B.range(.8,1.25);this.flash.scale.set(t,t,t),this.heat=_t(this.heat+.16,0,1)}startReload(t,e){this.reloadAnim.active=!0,this.reloadAnim.t=0,this.reloadAnim.dur=t,this.reloadAnim.tactical=e,this.reloadAnim.aborted=!1,this.reloadAnim.ejected=!1,this.reloadAnim.slammed=!1,this.reloadAnim.ejectedMag||(this.reloadAnim.ejectedMag=new It(new re(.045,.19,.09),pn(2237482,.75,.15)),this.scene.add(this.reloadAnim.ejectedMag)),this.reloadAnim.ejectedMag.visible=!1,this.parts.magNew.visible=!1,this.parts.mag.visible=!0,this.parts.charging.position.z=-.02}cancelReload(){this.reloadAnim.active&&(this.reloadAnim.aborted=!0,this.reloadAnim.t=this.reloadAnim.dur*.75)}startInspect(){this.inspectT<0&&(this.inspectT=0)}update(t,e,i){const s=i.adsTarget;this.adsT=Je(this.adsT,s,1-Math.exp(-14*t));const r=jn(_t(this.adsT,0,1));this.flashT>0&&(this.flashT-=t,this.flashT<=0&&(this.flash.visible=!1)),this.heat=Math.max(0,this.heat-t*.1),this.shimmerMat.uniforms.uAmt.value=this.heat*(.55+.45*Math.sin(e*30))*.9,this.shimmerMat.uniforms.uTime.value=e,this.shimmer.visible=this.heat>.02,this.sway.x=Je(this.sway.x,_t(-i.lookDX*.004,-.03,.03),1-Math.exp(-9*t)),this.sway.y=Je(this.sway.y,_t(-i.lookDY*.004,-.025,.025),1-Math.exp(-9*t)),i.moveSpeed>.6&&(this.bobPhase+=t*(i.sprint?11:6.5)*_t(i.moveSpeed/5,.4,1.6));const o=i.adsTarget>.5?.008:1;Math.sin(this.bobPhase)*.012*o*(i.tac?2.2:1),Math.abs(Math.sin(this.bobPhase*.5))*.01*o;const l=Math.exp(-9*t);this.kick.x*=l,this.kick.y*=l,this.kick.z*=l,this.kick.pitch*=l,this.kick.yaw*=l;const c=this._tmpV.copy(this.hipPos).lerp(this.adsPos,r),h=this._tmpQ.copy(this.hipQuat).slerp(this.adsQuat,r),u={x:0,y:0,z:0,rx:0,ry:0,rz:0},f=_t((i.moveSpeed-4.2)/3,0,1)*(1-r);if(u.y-=f*.05,u.rx+=f*.18,u.rz-=f*.1,i.tac&&f>.4){const d=Math.sin(this.bobPhase*1);u.x+=d*.05,u.y-=Math.abs(d)*.03,u.rz+=d*.12}const m=(1-_t(i.moveSpeed/3,0,1))*(1-r*.85);if(u.x+=Math.sin(e*1.4)*.004*m,u.y+=Math.sin(e*2.1)*.003*m,u.rz+=(i.sliding?.28:0)*(1-r*.6),u.rx+=i.crouch?.05:0,u.y-=i.landingDip*.05,u.rx+=i.landingDip*.15,i.mantleT>=0){const d=Math.sin(_t(i.mantleT,0,1)*Math.PI);u.y-=d*.35,u.rx+=d*1.2}u.rz+=i.lean*.35,u.x+=i.lean*.04,i.wallBump!==0&&(u.x-=i.wallBump*.06),u.x+=this.kick.x,u.y+=this.kick.y,u.z+=this.kick.z,u.rx+=this.kick.pitch,u.ry+=this.kick.yaw,u.x+=this.sway.x*(1-r),u.y+=this.sway.y*(1-r);let v=0;const g=this.reloadAnim;if(g.active){g.t+=t;const d=_t(g.t/g.dur,0,1),p=g.tactical?.3:.34,T=.62;if(v=d<.08?Mi(d/.08):d>.9?Mi((1-d)/.1):1,g.aborted&&(v*=Mi(_t((g.dur-g.t)/.2,0,1))),u.y-=.1*v,u.x-=.06*v,u.rz+=.45*v,u.rx+=.25*v,d<p&&(this.parts.mag.position.y=-.13-zr(d/p)*.06),d>=p&&!g.ejected&&(g.ejected=!0,this.parts.mag.visible=!1,g.ejectedMag.visible=!0,g.ejectedMag.position.copy(this.parts.mag.position),g.ejectedMag.rotation.set(.12,0,0),this._ejectV.set(-.5,.4,.25),g.ejectedMag.userData.t=0),d>p&&d<T){const x=(d-p)/(T-p);this.parts.magNew.visible=!0;const b=Mi(_t(x/.75,0,1));this.parts.magNew.position.set(Je(-.22,0,b),Je(-.45,-.13,b),-.14),this.parts.magNew.rotation.x=Je(.5,.12,b),x>=.75&&!g.slammed&&(g.slammed=!0,this.kick.pitch-=.1,this.kick.y-=.02),x>=1&&(this.parts.mag.visible=!0)}if(d>=T&&!g.tactical){this.parts.magNew.visible=!1;const x=(d-T)/(1-T),b=x<.4?zr(x/.4):1-fl(_t((x-.4)/.6,0,1));this.parts.charging.position.z=-.02+b*.09,x>.95&&(this.parts.charging.position.z=-.02)}if(d>=1&&(g.active=!1,g.slammed=!1,this.parts.mag.position.y=-.13,this.parts.magNew.visible=!1,this.parts.charging.position.z=-.02),g.ejectedMag.visible){const x=g.ejectedMag.userData.t=(g.ejectedMag.userData.t||0)+t;g.ejectedMag.position.x-=this._ejectV.x*t,g.ejectedMag.position.y-=this._ejectV.y*t*(1-Math.min(x*1.2,.6)),g.ejectedMag.position.z+=this._ejectV.z*t,g.ejectedMag.rotation.z+=t*6,g.ejectedMag.rotation.x+=t*3,x>.9&&(g.ejectedMag.visible=!1)}}else this.parts.mag.position.y=-.13,this.parts.magNew.visible=!1,this.parts.charging.position.z=-.02;if(this.inspectT>=0){this.inspectT+=t;const d=this.inspectT/2.2;if(d>=1)this.inspectT=-1;else{const p=Math.sin(_t(d,0,1)*Math.PI),T=jn(_t(d/.3,0,1))*(d>.75?1-jn((d-.75)/.25):1);u.y-=.06*p,u.x-=.05*p,u.ry+=T*.9,u.rx-=T*.35,u.rz+=p*.25;const x=_t((d-.45)/.15,0,1);x>0&&x<1&&(this.parts.charging.position.z=-.02+(x<.5?zr(x*2):1-fl((x-.5)*2))*.09)}}c.x+=u.x,c.y+=u.y,c.z+=u.z,this._e.set(u.rx,u.ry,u.rz),h.multiply(this._tmpQ2.setFromEuler(this._e)),this.group.position.copy(c),this.group.quaternion.copy(h),this.dot.material.opacity=r*.95,this.dot.visible=r>.02,this.camera.position.copy(i.camPos),this.camera.quaternion.copy(i.camQuat),this.camera.updateMatrixWorld()}worldMuzzle(t){return this.group.updateMatrixWorld(),t.copy(this.muzzleAnchor.position).applyMatrix4(this.group.matrixWorld)}worldShellPort(t){return this.group.updateMatrixWorld(),t.copy(this.shellPort.position).applyMatrix4(this.group.matrixWorld)}}function zr(n){return n*n}const As=1.66,M0=1.05,y0=.85,le=.38,pl=.55;class S0{constructor(t,e,i,s){this.camera=t,this.input=e,this.world=i,this.audio=s,this.pos=new w(0,0,6),this.vel=new w,this.yaw=0,this.pitch=0,this.recoilPitch=0,this.recoilYaw=0,this.crouching=!1,this.sprinting=!1,this.tac=!1,this.tacT=0,this.sliding=!1,this.slideT=0,this.airborne=!1,this.fallVel=0,this.mantleT=-1,this._mantle=null,this.lean=0,this.leanTarget=0,this.autoLean=0,this.eyeH=As,this.landingDip=new gi(0,160,18),this.reloadRoll=new gi(0,60,10),this.wallBump=0,this.firingT=0,this.adsE=0,this._shakeP=[new gi(0,130,11),new gi(0,130,11),new gi(0,130,11)],this._shakeR=[new gi(0,90,9),new gi(0,90,9),new gi(0,90,9)],this._fovKick=new gi(0,90,10),this.health=100,this.godMode=!1,this.dead=!1,this.lastHurt=-99,this.onDeath=null,this.onDamageDir=null,this.onSlide=null,this._wish=new w,this._fwd=new w,this._right=new w,this._dir=new w,this._ray=new Jl,this._e=new Re(0,0,0,"YXZ"),this.sensitivity=.0021}reset(){this.pos.set(0,0,6),this.vel.set(0,0,0),this.yaw=0,this.pitch=0,this.recoilPitch=0,this.recoilYaw=0,this.crouching=this.sliding=this.sprinting=this.tac=!1,this.airborne=!1,this.mantleT=-1,this._mantle=null,this.health=100,this.dead=!1,this.lastHurt=-99,this.lean=0,this.leanTarget=0,this.autoLean=0;for(const t of this._shakeP)t.set(0);for(const t of this._shakeR)t.set(0);this._fovKick.set(0),this.landingDip.set(0)}addRecoil(t,e){this.recoilPitch+=t,this.recoilYaw+=e}shakeFire(){this._shakeR[0].impulse(.6),this._shakeP[1].impulse(.4)}shakeNear(t,e=1){const i=this._dir.copy(this.pos).sub(t).normalize();this._shakeP[0].impulse(i.x*6*e),this._shakeP[1].impulse(4*e),this._shakeP[2].impulse(i.z*6*e),this._shakeR[2].impulse(2.5*e),this._fovKick.impulse(2.2*e)}shakeHit(t){const e=this._dir.copy(this.pos).sub(t).normalize();this._shakeP[0].impulse(e.x*11),this._shakeP[2].impulse(e.z*11),this._shakeR[0].impulse(_t(-e.z,-1,1)*4),this._shakeR[1].impulse(3),this._fovKick.impulse(6)}fovKick(t){this._fovKick.impulse(t)}takeDamage(t,e,i){return this.godMode||this.dead?!1:(this.health=_t(this.health-t,0,100),this.lastHurt=i,this.shakeHit(e),this.onDamageDir&&this.onDamageDir(e),this.health<=0&&(this.dead=!0,this.onDeath&&this.onDeath()),!0)}get regenActive(){return!this.dead&&this.health<100&&this._tNow-this.lastHurt>4}get moveState(){return this.mantleT>=0?"mantle":this.sliding?"slide":this.airborne?"air":this.tac?"tac":this.sprinting?"sprint":this.crouching?"crouch":"ground"}update(t,e,i){this._tNow=e;const s=this.input;this.adsE=i;const r=this.sensitivity*Je(1,.55,i);this.yaw-=s.dx*r,this.pitch-=s.dy*r,this.pitch=_t(this.pitch,-Math.PI/2+.02,Math.PI/2-.02),this.recoilPitch=De(this.recoilPitch,0,7.5,t),this.recoilYaw=De(this.recoilYaw,0,7.5,t);const a=this._fwd.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),o=this._right.set(-a.z,0,a.x),l=this._wish.set(0,0,0);s.down("KeyW")&&l.add(a),s.down("KeyS")&&l.sub(a),s.down("KeyD")&&l.add(o),s.down("KeyA")&&l.sub(o);const c=l.lengthSq()>0;c&&l.normalize();const h=s.down("ShiftLeft")&&c&&(s.down("KeyW")||l.dot(a)>.3)&&!i;s.consumeShiftDouble()&&c&&(this.tacT=3,this.audio.playTacSprint()),this.tac=this.tacT>0,this.tac&&(this.tacT-=t),this.sprinting=h,this.sprinting&&(this.crouching=!1);const u=s.down("ControlLeft");if(s.pressedEdge("ControlLeft")&&((this.sprinting||this.tac)&&!this.airborne?this._startSlide():this.sprinting||(this.crouching=!0)),!u&&this.crouching&&!this.sliding&&(this._headBlocked(this.pos.y+As+.1)||(this.crouching=!1)),!u&&this.sliding&&this.slideT>.35&&this._endSlide(),this.sliding){this.slideT+=t;const M=Math.hypot(this.vel.x,this.vel.z);(M<2.4||this.slideT>1.5||this._touchingWall())&&this._endSlide(),this.onSlide&&this.slideT<1.35&&this.onSlide(this.pos,M,t),this.vel.x=De(this.vel.x,0,1.15,t),this.vel.z=De(this.vel.z,0,1.15,t)}s.pressedEdge("KeyE")&&!this.sliding&&!this.airborne&&this._tryMantle(),s.pressedEdge("Space")&&(this.sliding?(this._endSlide(!0),this.vel.y=5.1,this.vel.x*=.85,this.vel.z*=.85,this.airborne=!0,this.audio.playJump()):!this.airborne&&!this._tryMantle()&&(this.vel.y=5.4,this.airborne=!0,this.crouching=!1,this.audio.playJump()));let f=this.crouching?2.6:this.tac?9.3:this.sprinting?7.8:5.3;if(i>.5&&(f*=.55),!this.sliding){if(this.mantleT<0){const M=this.airborne?2.6:this.crouching?7:11,A=c?l.x*f:0,P=c?l.z*f:0,D=(this.airborne?.32:1)*M;this.vel.x=De(this.vel.x,A,this.airborne?D:M,t),this.vel.z=De(this.vel.z,P,this.airborne?D:M,t)}}this.airborne?this.vel.y-=16.5*t:this._mantle||(this.vel.y=0),this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.pos.y+=this.vel.y*t;let m=0;const v=this.pos.y;for(const M of this.world.colliders){if(!M.solid)continue;const A=M.box;_t(this.pos.x,A.min.x-le,A.max.x+le),_t(this.pos.z,A.min.z-le,A.max.z+le);const P=this.pos.x>A.min.x-le&&this.pos.x<A.max.x+le,D=this.pos.z>A.min.z-le&&this.pos.z<A.max.z+le;if(!(!P||!D)&&(A.max.y<=v+pl&&A.max.y>m&&this.vel.y<=.1&&(m=Math.max(m,A.max.y)),A.max.y>v+pl)){const O=Math.abs(this.pos.x-(A.min.x-le)),k=Math.abs(this.pos.x-(A.max.x+le)),q=Math.abs(this.pos.z-(A.min.z-le)),H=Math.abs(this.pos.z-(A.max.z+le)),J=Math.min(O,k,q,H);J===O?this.pos.x=A.min.x-le:J===k?this.pos.x=A.max.x+le:J===q?this.pos.z=A.min.z-le:this.pos.z=A.max.z+le,this.sliding&&(J===q||J===H)&&(this.slideT=Math.max(this.slideT,.4))}}if(this.pos.x=_t(this.pos.x,-28.5,28.5),this.pos.z=_t(this.pos.z,-28.5,28.5),this.pos.y<=m){if(this.airborne){const M=Math.min(Math.abs(this.vel.y),14);this.landingDip.impulse(-M*2.2),this.shakeNear(this._dir.copy(this.pos),M/10),this.audio.playLand(M/14),this.onLandPuff&&M>3&&this.onLandPuff(this.pos,M)}this.pos.y=m,this.vel.y=0,this.airborne=!1}else this.pos.y>m+.001&&this.vel.y<=0&&!this._mantle&&(this.airborne=!0);if(this.landingDip.target=0,this.landingDip.update(t),this.landingDip.value=De(this.landingDip.value,0,6,t),this._mantle){const M=this._mantle;M.t+=t;const P=_t(M.t/.38,0,1);this.pos.x=Je(M.from.x,M.to.x,jn(P)),this.pos.z=Je(M.from.z,M.to.z,jn(P));const D=P>=.45?Mi((P-.45)/.55):0;this.pos.y=Je(M.from.y,M.h,Mi(_t(P/.5,0,1)))+D*.1-(P>.9?(P-.9)*1:0),this.mantleT=P,P>=1&&(this._mantle=null,this.mantleT=-1,this.landingDip.impulse(-4),this.airborne=!1)}else this.mantleT>=0&&(this.mantleT=-1);let g=0;s.down("KeyQ")&&(g=1),s.down("KeyE")&&(g=-1),g===0&&Math.abs(this.autoLean)>.01&&(g=this.autoLean),this.leanTarget=g,this.lean=De(this.lean,this.leanTarget,12,t),this._wallBumpCheck(o);const d=this.sliding?y0:this.crouching?M0:As;this.eyeH=De(this.eyeH,d,this.sliding?14:11,t),this.landingDip.value=_t(this.landingDip.value,-1.2,1.2);const p=this.landingDip.value,T=this.pos.y+this.eyeH+p*.12;let x=0,b=0,I=0;for(let M=0;M<3;M++){const A=this._shakeP[M];A.update(t),A.value=_t(A.value,-.5,.5)}for(const M of this._shakeR)M.update(t),M.value=_t(M.value,-.5,.5);x=this._shakeP[0].value*.02,b=this._shakeP[1].value*.02,I=this._shakeP[2].value*.02,this.firingT>0&&this.firingT;const C=this.lean*.32,R=this._right;this.camera.position.set(this.pos.x+x+R.x*C,T+b+p*.05,this.pos.z+I+R.z*C);const U=this.lean*.13+(this.sliding?.1:0)+this._shakeR[2].value*.01+this.reloadRoll.value*.5;this._e.set(this.pitch+this.recoilPitch+this._shakeR[0].value*.008+p*.03,this.yaw+this.recoilYaw+this._shakeR[1].value*.008,U),this.camera.quaternion.setFromEuler(this._e,"YXZ"),this.camera.updateMatrixWorld(),this._fovKick.update(t);const Y=(this.sprinting?5:0)+(this.tac?7:0),_=Je(75+Y+this._fovKick.value,55,i);this.camera.fov=De(this.camera.fov,_,12,t),Math.abs(this.camera.fov-_)<.001&&(this.camera.fov=_),this.camera.updateProjectionMatrix(),this.regenActive&&(this.health=De(this.health,100,14,t)),this.firingT>0&&(this.firingT=Math.max(0,this.firingT-t*3))}_startSlide(){this.sliding=!0,this.slideT=0,this.crouching=!0;const t=Math.hypot(this.vel.x,this.vel.z),e=this._dir.set(this.vel.x,0,this.vel.z);e.lengthSq()<.01&&e.copy(this._fwd.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw))),e.normalize();const i=Math.max(t,8.2);this.vel.x=e.x*i,this.vel.z=e.z*i,this.tac=!1,this.tacT=0,this.sprinting=!1,this.audio.playSlideStart(),this.onSlide&&this.onSlide(this.pos,i,.12),this._fovKick.impulse(2.5)}_endSlide(t=!1){this.sliding&&(this.sliding=!1,this.slideT=0,t||(this.vel.x*=.4,this.vel.z*=.4))}_touchingWall(){const t=this._fwd.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw));return this._rayHit(this.pos.clone().setY(this.pos.y+.5),t,.7)!==null}_headBlocked(t){for(const e of this.world.colliders){if(!e.solid)continue;const i=e.box;if(this.pos.x>i.min.x-le*.6&&this.pos.x<i.max.x+le*.6&&this.pos.z>i.min.z-le*.6&&this.pos.z<i.max.z+le*.6&&i.min.y<t&&i.max.y>t)return!0}return!1}_tryMantle(){if(this.airborne||this.sliding)return!1;const t=this._fwd.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw));for(const e of this.world.colliders){if(!e.solid||!e.mantle)continue;const i=e.box,s=this.pos.x+t.x*(le+.35),r=this.pos.z+t.z*(le+.35);if(s<i.min.x-.2||s>i.max.x+.2||r<i.min.z-.2||r>i.max.z+.2)continue;const a=i.max.y;if(a<.5||a>1.6||this._headBlocked(a+As+.1))continue;const o=new w(_t(s,i.min.x+.45,i.max.x-.45)+t.x*.5,0,_t(r,i.min.z+.45,i.max.z-.45)+t.z*.5);return this._mantle={t:0,h:a,from:this.pos.clone(),to:new w(o.x,a,o.z)},this.mantleT=0,this.crouching=!1,this.audio.playMantle(),!0}return!1}_wallBumpCheck(t){const e=this._dir.copy(this.camera.position),i=this._rayHit(e,t.clone().multiplyScalar(-1),.55),s=this._rayHit(e,t,.55),r=i?1:s?-1:0;this.wallBump=De(this.wallBump,r,10,.016)}_rayHit(t,e,i){this._ray.set(t,e.normalize()),this._ray.far=i;const s=this._ray.intersectObjects(this.world.raycastTargets,!1);return s.length?s[0]:null}getAimDir(t){return t.set(0,0,-1).applyQuaternion(this.camera.quaternion)}}const T0=700,Pi=30,b0=60/T0;class w0{constructor(t,e,i,s,r){this.input=t,this.controller=e,this.vm=i,this.audio=s,this.game=r,this.mag=Pi,this.fireT=0,this.reloading=!1,this.reloadT=0,this.reloadDur=2,this.reloadTactical=!1,this.bloom=0,this.heat=0,this.shotsFired=0,this.shotsHit=0,this.pattern=[];for(let a=0;a<Pi;a++){const o=Math.min(a/12,1),l=.006+o*.011+B.range(-.0015,.0015),c=a<3?B.range(-.002,.002):Math.sin(a*1.31)*.005*(.4+o);this.pattern.push({p:l,y:c})}this.patternIdx=0,this._dir=new w,this._right=new w,this._up=new w}reset(){this.mag=Pi,this.fireT=0,this.reloading=!1,this.bloom=0,this.heat=0,this.patternIdx=0,this.shotsFired=0,this.shotsHit=0,this.vm.reloadAnim.active=!1}get isReloading(){return this.reloading}update(t,e,i,s){this.fireT-=t,this.heat=Math.max(0,this.heat-t*.08),this.bloom=Math.max(0,this.bloom-t*(i>.5?2.4:1.4)),this.reloading?((this.controller.sprinting||this.controller.tac)&&this._abortReload(),this.reloadT+=t,this.reloadT>=this.reloadDur&&this._finishReload()):this.input.pressedEdge("KeyR")&&this.startReload(i),s&&!this.reloading&&this.input.lmb&&this.fireT<=0&&(this.mag<=0?(this.input.lmbPressed&&(this.audio.playDryFire(),this.game.notifyDryFire()),this.fireT=.2):this._fire(i,e))}_fire(t,e){this.controller.godMode?this.mag=Pi:this.mag--,this.fireT=b0,this.shotsFired++,this.bloom=_t(this.bloom+.13,0,1.6),this.heat=_t(this.heat+.05,0,1),this.vm.heat=this.heat,this.controller.firingT=1;const i=this.pattern[this.patternIdx%Pi];this.patternIdx++;const s=E0(t),r=this.controller.crouching?.75:1,a=this.patternIdx===1?1.8:1;this.controller.addRecoil(i.p*s*r*a,i.y*s*r),this.vm.kick.z+=.045*a,this.vm.kick.pitch-=.09*a,this.vm.kick.x+=i.y*8,this.vm.fire();const o=.03*(1-t)+.0035*t,l=_t(Math.hypot(this.controller.vel.x,this.controller.vel.z)/8,0,1)*(1-t)*.02,c=(o+this.bloom*.02+l)*(this.controller.crouching?.7:1)*(this.game.overdriveActive?.6:1);this.controller.getAimDir(this._dir);const h=B.rand()*Math.PI*2,u=Math.sqrt(B.rand())*c;this._right.set(1,0,0).applyQuaternion(this.controller.camera.quaternion),this._up.set(0,1,0).applyQuaternion(this.controller.camera.quaternion),this._dir.addScaledVector(this._right,Math.cos(h)*u).addScaledVector(this._up,Math.sin(h)*u).normalize(),this.game.fireBullet(this._dir,t),this.audio.playShot(t),this.game.onPlayerShot()}startReload(t){if(this.mag>=Pi)return;const e=this.game.overdriveActive;this.reloadTactical=this.mag>0,this.reloadDur=e?1.4:2,this.reloading=!0,this.reloadT=0,this.patternIdx=0,this.vm.startReload(this.reloadDur,this.reloadTactical),this.audio.playReloadStart(this.reloadTactical,e),this.game.notifyReload();const i=this.reloadDur;this.audio.playMagRelease(i*.3,e),this.audio.playMagInsert(i*.62+i*.13,e),this.reloadTactical||this.audio.playChargeRack(i*.86,e)}_finishReload(){this.reloading=!1,this.mag=(this.reloadTactical,Pi),this.audio.playReloadDone(this.reloadTactical)}_abortReload(){this.reloading=!1,this.vm.cancelReload(),this.audio.playReloadAbort()}registerHit(){this.shotsHit++}get accuracy(){return this.shotsFired?this.shotsHit/this.shotsFired:0}}function E0(n){return 1-n*.45}const A0=8,ml=4.5,R0=1.4;class C0{constructor(t,e){this.scene=t,this.hooks=e,this.pieces=[],this.t=0,this.done=!1,this._q=new Ee,this._e=new Re,this._v=new w,this._v2=new w}spawnFrom(t,e,i){const s=[t.parts.torso,t.parts.head,t.parts.armL,t.parts.armR,t.parts.legL,t.parts.legR,t.parts.vest].filter(Boolean);this.anchor=t.parts.torso;for(const o of s){o.updateWorldMatrix(!0,!1);const l=new w,c=new Ee,h=new w;o.matrixWorld.decompose(l,c,h),t.group.remove(o),this.scene.add(o),this.pieces.push({mesh:o,worldPos:l,worldQuat:c,off:o===t.parts.torso?new w(0,0,0):l.clone().sub(t.parts.torso.matrixWorld?this._torsoPos(t):l),vel:new w,angVel:new w,isTorso:o===t.parts.torso,lag:o===t.parts.head?26:16})}const r=this.pieces.find(o=>o.isTorso),a=i?7.5:4.5;return r.vel.copy(e).multiplyScalar(a*B.range(.8,1.2)),r.vel.y=B.range(2.5,i?7:4.5),r.angVel.set(B.range(-8,8),B.range(-6,6),B.range(-8,8)),this.hooks.onImpact,this}_torsoPos(t){return t.parts.torso.getWorldPosition(new w)}update(t){this.t+=t;const e=this.t>ml?_t((this.t-ml)/R0,0,1):0,i=this.pieces.find(r=>r.isTorso);if(!i){this.done=!0;return}i.vel.y-=18*t,i.worldPos.addScaledVector(i.vel,t);const s=this._q.setFromEuler(this._e.set(i.angVel.x*t,i.angVel.y*t,i.angVel.z*t));i.worldQuat.multiply(s),i.worldPos.y<.32&&(i.worldPos.y=.32,Math.abs(i.vel.y)>1.2&&this.hooks.onBodyImpact&&this.hooks.onBodyImpact(i.worldPos,Math.abs(i.vel.y)/10),i.vel.y=-i.vel.y*.28,i.vel.x*=.72,i.vel.z*=.72,i.angVel.multiplyScalar(.6)),i.angVel.multiplyScalar(Math.exp(-1.6*t)),e>0&&(i.worldPos.y-=e*e*2.2*t*10),i.mesh.position.copy(i.worldPos),i.mesh.quaternion.copy(i.worldQuat),i.mesh.scale.y=1-e;for(const r of this.pieces){if(r.isTorso)continue;const a=this._v.copy(r.off).applyQuaternion(i.worldQuat).add(i.worldPos),o=1-Math.exp(-r.lag*t);r.worldPos.lerp(a,o*(1-e)),r.worldQuat.slerp(i.worldQuat,o*.8),r.mesh.position.copy(r.worldPos),r.mesh.quaternion.copy(r.worldQuat),r.mesh.scale.y=1-e}e>=1&&(this.done=!0)}dispose(t){for(const e of this.pieces)t.remove(e.mesh);this.pieces.length=0}}class P0{constructor(t,e={}){this.scene=t,this.hooks=e,this.active=[]}spawn(t,e,i){this.active.length>=A0&&this.active.shift().dispose(this.scene);const s=new C0(this.scene,this.hooks).spawnFrom(t,e,i);return this.active.push(s),s}update(t){for(let e=this.active.length-1;e>=0;e--){const i=this.active[e];i.update(t),i.done&&(i.dispose(this.scene),this.active.splice(e,1))}}clear(){for(const t of this.active)t.dispose(this.scene);this.active.length=0}impulseNear(t,e,i){for(const s of this.active){const r=s.pieces.find(o=>o.isTorso);if(!r)continue;const a=r.worldPos.distanceTo(t);if(a<e){const o=this._v2.copy(r.worldPos).sub(t),l=i*(1-a/e);o.y=Math.max(o.y,.4),o.normalize(),r.vel.addScaledVector(o,l),r.angVel.x+=B.range(-1,1)*l*1.5,r.angVel.y+=B.range(-1,1)*l*1.5,r.angVel.z+=B.range(-1,1)*l*1.5}}}get count(){return this.active.length}}class D0{constructor(t){this.game=t,this.wave=0,this.queue=[],this.spawnT=0,this.active=!1}start(t){this.wave=t,this.queue.length=0;const e=Math.min(4+t*2,20),i=_t(.3+t*.04,0,.55);for(let s=0;s<e;s++){let r;t>=3&&s%6===5?r="heavy":B.rand()<i?r="gunner":r="rusher",this.queue.push(r)}this.active=!0,this.spawnT=.6}update(t,e){if(!this.active)return;const i=this.game;if(this.queue.length){if(this.spawnT-=t,this.spawnT<=0){const s=this.queue.shift(),a=i.world.spawnPoints[B.int(i.world.spawnPoints.length)].clone();a.x+=B.range(-2,2),a.z+=B.range(-2,2),i.spawnEnemy(s,a,e),this.spawnT=Math.max(.35,1.5-this.wave*.12)*B.range(.6,1.4)}}else i.enemies.length===0&&(this.active=!1,i.waveCleared(this.wave))}get remaining(){return this.queue.length+this.game.enemies.length}get count(){return this.queue.length+this.game.enemies.length}}function L0(n){const e=new Float32Array(1024);for(let i=0;i<1024;i++){const s=i/1023*2-1;e[i]=Math.tanh(s*n)/Math.tanh(n)}return e}class I0{constructor(){this.ctx=null,this._hbT=0,this.danger=0,this._muffle=0}init(){if(this.ctx)return;const t=window.AudioContext||window.webkitAudioContext;this.ctx=new t,this.ctx.resume().catch(()=>{});const e=this.ctx;this.master=e.createGain(),this.master.gain.value=.8,this.clip=e.createWaveShaper(),this.clip.curve=L0(2.2),this.clip.oversample="4x",this.muffleFilter=e.createBiquadFilter(),this.muffleFilter.type="lowpass",this.muffleFilter.frequency.value=2e4,this.master.connect(this.muffleFilter),this.muffleFilter.connect(this.clip),this.clip.connect(e.destination),this.sfxBus=e.createGain(),this.sfxBus.gain.value=1,this.sfxBus.connect(this.master);const i=e.createBuffer(1,e.sampleRate,e.sampleRate),s=i.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=Math.random()*2-1;this.noise=i,this._startAmbient()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}_noiseSrc(){const t=this.ctx.createBufferSource();return t.buffer=this.noise,t.loop=!0,t}_env(t,e,i,s,r){t.gain.setValueAtTime(1e-4,e),t.gain.linearRampToValueAtTime(i,e+s),t.gain.exponentialRampToValueAtTime(1e-4,e+s+r)}_panner(t){const e=this.ctx.createStereoPanner();return e.pan.value=_t(t||0,-1,1),e}_playNoise({t0:t=null,dur:e=.2,peak:i=.5,attack:s=.001,filter:r="highpass",freq:a=800,q:o=.8,rate:l=1,pan:c=0,dest:h=null}){if(!this.ctx)return;t=t??this.ctx.currentTime;const u=this._noiseSrc();u.playbackRate.value=l;const f=this.ctx.createBiquadFilter();f.type=r,f.frequency.value=a,f.Q.value=o;const m=this.ctx.createGain();this._env(m,t,i,s,e);const v=this._panner(c);return u.connect(f),f.connect(m),m.connect(v),v.connect(h||this.sfxBus),u.start(t),u.stop(t+s+e+.05),{s:u,f,g:m}}_playTone({t0:t=null,dur:e=.2,peak:i=.4,attack:s=.002,type:r="sine",freq:a=220,slide:o=0,pan:l=0,dest:c=null}){if(!this.ctx)return;t=t??this.ctx.currentTime;const h=this.ctx.createOscillator();h.type=r,h.frequency.setValueAtTime(a,t),o&&h.frequency.exponentialRampToValueAtTime(Math.max(20,a+o),t+e);const u=this.ctx.createGain();this._env(u,t,i,s,e);const f=this._panner(l);return h.connect(u),u.connect(f),f.connect(c||this.sfxBus),h.start(t),h.stop(t+s+e+.05),h}_spatial(t){if(!this.ctx||!t||!this._cam)return{gain:1,pan:0};const e=t.distanceTo(this._cam),i=_t(1-e/42,.04,1);let s=0;if(this._camRight){const r=this._tmp.copy(t).sub(this._cam);s=_t(r.dot(this._camRight)/Math.max(1,r.length())*.8,-1,1)}return{gain:i*i,pan:s}}setListener(t){if(!this.ctx)return;this._cam=t.position;const e=t.matrixWorld.elements;this._camRight||(this._camRight=new w,this._tmp=new w),this._camRight.set(e[0],e[1],e[2])}playShot(t){if(!this.ctx)return;const e=this.ctx.currentTime;this._playNoise({t0:e,dur:.06,peak:.85,filter:"highpass",freq:2400,rate:1.6,attack:5e-4}),this._playTone({t0:e,dur:.13,peak:.9,type:"sine",freq:130,slide:-90}),this._playTone({t0:e,dur:.05,peak:.5,type:"square",freq:900,slide:-600}),this._playNoise({t0:e+.02,dur:.22,peak:.1*(1-t*.5),filter:"bandpass",freq:700,q:.6})}playDryFire(){this._playNoise({dur:.04,peak:.35,filter:"highpass",freq:3200,rate:2})}playEnemyReport(t){const e=this._spatial(t),i=this.ctx.currentTime;this._playNoise({t0:i,dur:.09,peak:.5*e.gain,filter:"bandpass",freq:1600,q:.9,pan:e.pan}),this._playTone({t0:i,dur:.1,peak:.35*e.gain,type:"sine",freq:100,slide:-60,pan:e.pan})}playNearMiss(t){const e=this._spatial(t);this._playNoise({dur:.05,peak:.5*e.gain,filter:"bandpass",freq:3800,q:2.2,rate:1.8,pan:e.pan})}playHitTick(t){const e=this.ctx.currentTime;this._playNoise({t0:e,dur:.03,peak:t?.001:.4,filter:"highpass",freq:t?100:2600,rate:2}),t?(this._playTone({t0:e,dur:.12,peak:.55,type:"sine",freq:190,slide:-120}),this._playNoise({t0:e,dur:.08,peak:.3,filter:"lowpass",freq:900})):this._playTone({t0:e,dur:.04,peak:.25,type:"square",freq:1800,slide:300})}playHeadshot(){this._playTone({dur:.09,peak:.6,type:"sine",freq:320,slide:-260}),this._playNoise({dur:.14,peak:.5,filter:"bandpass",freq:1200,q:1.4})}playImpactSnow(t=1){this._playNoise({dur:.08,peak:.22*t,filter:"lowpass",freq:1400,rate:.7})}playImpactMetal(t=1){const e=this._spatial(this._lastImpactPos);this._playNoise({dur:.06,peak:.4*t*e.gain,filter:"bandpass",freq:4200,q:1.5,rate:1.4,pan:e.pan}),this._playTone({dur:.05,peak:.2*t*e.gain,type:"square",freq:2400,slide:-1400,pan:e.pan})}playImpactWood(t=1){this._playNoise({dur:.07,peak:.35*t,filter:"bandpass",freq:700,q:1.2})}playImpactIce(t=1){this._playNoise({dur:.1,peak:.3*t,filter:"highpass",freq:3e3,rate:1.7}),this._playTone({dur:.15,peak:.12*t,type:"sine",freq:2600,slide:-800})}playImpactCanvas(t=1){this._playNoise({dur:.09,peak:.25*t,filter:"bandpass",freq:500,q:.5,rate:.6})}playGlassBreak(){const t=this.ctx?this.ctx.currentTime:0;if(this.ctx){this._playNoise({t0:t,dur:.35,peak:.5,filter:"highpass",freq:2200,rate:1.3});for(let e=0;e<5;e++)this._playTone({t0:t+e*.03+Math.random()*.04,dur:.12,peak:.08,type:"triangle",freq:1800+Math.random()*2600,slide:-400})}}setImpactPos(t){this._lastImpactPos=t}playFleshHit(t=1,e=!1){this._playNoise({dur:e?.12:.06,peak:(e?.55:.3)*t,filter:"bandpass",freq:e?500:900,q:1.1,rate:.8}),this._playTone({dur:.05,peak:.25*t,type:"sine",freq:220,slide:-120}),e&&this._playNoise({dur:.2,peak:.3,filter:"lowpass",freq:700,rate:.5})}playBodyFall(t=1){const e=this._spatial(this._lastImpactPos);this._playNoise({dur:.15,peak:.3*t*(e.gain||1),filter:"lowpass",freq:500,rate:.5,pan:e.pan})}playExplosion(t,e){if(!this.ctx)return;const i=this.ctx.currentTime,s=_t(1-e/45,.12,1);this._playTone({t0:i,dur:.7,peak:.95*s,type:"sine",freq:70,slide:-55}),this._playNoise({t0:i,dur:.5,peak:.7*s,filter:"lowpass",freq:900,rate:.5}),this._playNoise({t0:i+.01,dur:.12,peak:.6*s,filter:"highpass",freq:3e3}),this._playNoise({t0:i+.15,dur:.9,peak:.18*s,filter:"bandpass",freq:300,q:.4,rate:.4})}playDebris(t){const e=this._spatial(t);this._playNoise({dur:.25,peak:.2*e.gain,filter:"bandpass",freq:1800,q:.8,rate:1.2,pan:e.pan})}playPlateFly(){this._playTone({dur:.08,peak:.3,type:"square",freq:1400,slide:-900}),this._playNoise({dur:.1,peak:.25,filter:"highpass",freq:4e3,rate:2})}playJump(){this._playNoise({dur:.08,peak:.12,filter:"lowpass",freq:900,rate:.6})}playLand(t=.5){this._playNoise({dur:.12,peak:.25*t,filter:"lowpass",freq:600,rate:.5}),this._playTone({dur:.08,peak:.2*t,type:"sine",freq:60})}playSlideStart(){this._playNoise({dur:.9,peak:.3,filter:"bandpass",freq:2600,q:.7,rate:.9}),this._playNoise({dur:.7,peak:.2,filter:"lowpass",freq:700,rate:.4})}playTacSprint(){this._playNoise({dur:.15,peak:.15,filter:"bandpass",freq:1200,q:1,rate:1.4})}playRusherCharge(){this._playNoise({dur:.5,peak:.22,filter:"bandpass",freq:320,q:.7,rate:.5}),this._playTone({dur:.4,peak:.15,type:"sawtooth",freq:90,slide:60})}playMeleeHit(){this._playNoise({dur:.12,peak:.5,filter:"lowpass",freq:900,rate:.6}),this._playTone({dur:.15,peak:.4,type:"sine",freq:85,slide:-50})}playEnemyWeaponReady(){this._playNoise({dur:.05,peak:.18,filter:"highpass",freq:2600,rate:1.3}),this._playTone({dur:.04,peak:.1,type:"square",freq:1500,slide:-500})}playMantle(){this._playNoise({dur:.1,peak:.2,filter:"lowpass",freq:800,rate:.7})}playBreath(){this._playNoise({dur:.35,peak:.05,filter:"bandpass",freq:500,q:.5,rate:.4})}playReloadStart(){}playMagRelease(t=0,e=!1){const i=(this.ctx?this.ctx.currentTime:0)+t;this._playNoise({t0:i,dur:.05,peak:.35,filter:"highpass",freq:3e3,rate:e?1.3:1}),this._playTone({t0:i,dur:.04,peak:.2,type:"square",freq:700,slide:-300})}playMagInsert(t=0,e=!1){const i=(this.ctx?this.ctx.currentTime:0)+t;this._playTone({t0:i,dur:.09,peak:.5,type:"sine",freq:110,slide:-60}),this._playNoise({t0:i,dur:.06,peak:.3,filter:"bandpass",freq:1500,q:1.2,rate:e?1.3:1})}playChargeRack(t=0,e=!1){const i=(this.ctx?this.ctx.currentTime:0)+t;this._playNoise({t0:i,dur:.04,peak:.4,filter:"highpass",freq:4e3,rate:e?1.35:1.15}),this._playNoise({t0:i+.05,dur:.05,peak:.4,filter:"highpass",freq:2800,rate:e?1.35:1.15})}playReloadAbort(){this._playNoise({dur:.05,peak:.2,filter:"highpass",freq:2500})}playReloadDone(){this._playTone({dur:.05,peak:.15,type:"square",freq:1200,slide:400})}playShellTinkle(t,e=1){const i=this._spatial(t),s=this.ctx?this.ctx.currentTime:0;for(let r=0;r<2;r++)this._playTone({t0:s+r*.05,dur:.09,peak:.1*e*i.gain,type:"triangle",freq:3200+r*900,slide:-1200,pan:i.pan})}playShellSteam(){this._playNoise({dur:.4,peak:.05,filter:"highpass",freq:1800,rate:.5})}playPlayerHurt(){this._playTone({dur:.15,peak:.4,type:"sine",freq:160,slide:-100}),this._playNoise({dur:.1,peak:.3,filter:"bandpass",freq:400,q:.8})}playMultikill(t){if(!this.ctx)return;const e=this.ctx.currentTime,i=[440,550,660][Math.min(t,2)]||740;for(let s=0;s<3;s++)this._playTone({t0:e+s*.07,dur:.18,peak:.22,type:"square",freq:i*(1+s*.33)})}playOverdrive(){if(!this.ctx)return;const t=this.ctx.currentTime;this._playTone({t0:t,dur:.8,peak:.3,type:"sawtooth",freq:110,slide:330}),this._playNoise({t0:t,dur:.6,peak:.25,filter:"bandpass",freq:900,q:.6,rate:1.5})}playWaveBanner(){const t=this.ctx?this.ctx.currentTime:0;this._playTone({t0:t,dur:.4,peak:.3,type:"triangle",freq:330,slide:110}),this._playNoise({t0:t,dur:.25,peak:.2,filter:"lowpass",freq:2e3,rate:.8})}setDanger(t){this.danger=_t(t,0,1)}setMuffle(t){this.ctx&&(this._muffle=t,this.muffleFilter.frequency.setTargetAtTime(2e4-t*15500,this.ctx.currentTime,.25))}_startAmbient(){const t=this.ctx,e=this._noiseSrc(),i=t.createBiquadFilter();i.type="bandpass",i.frequency.value=600,i.Q.value=.4;const s=t.createGain();s.gain.value=.05;const r=t.createOscillator();r.frequency.value=.07;const a=t.createGain();a.gain.value=.035,r.connect(a),a.connect(s.gain),e.connect(i),i.connect(s),s.connect(this.master),e.start(),r.start(),this._windGain=s;const o=t.createOscillator();o.type="sawtooth",o.frequency.value=49;const l=t.createOscillator();l.type="sine",l.frequency.value=98.5;const c=t.createBiquadFilter();c.type="lowpass",c.frequency.value=160;const h=t.createGain();h.gain.value=.028,o.connect(c),l.connect(c),c.connect(h),h.connect(this.master),o.start(),l.start()}update(t,e){if(this.ctx){if(this.danger>.35&&(this._hbT-=t,this._hbT<=0)){const i=1.15-this.danger*.55;this._hbT=i;const s=this.ctx.currentTime;this._playTone({t0:s,dur:.1,peak:.28*this.danger,type:"sine",freq:55,slide:-25}),this._playTone({t0:s+.16,dur:.12,peak:.2*this.danger,type:"sine",freq:50,slide:-22})}this._windGain&&this._windGain.gain.setTargetAtTime(.04+.03*Math.max(0,Math.sin(e*.23)),this.ctx.currentTime,.5)}}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend().catch(()=>{})}applyMuffle(){this.setMuffle(this.danger*.8)}}const gl=16;class U0{constructor(t){this.audio=t,this.bus=null,this.step=0,this.nextT=0,this.intensity=.35,this.targetIntensity=.35,this.breakMode=!0,this.overdrive=!1,this.bpm=96}init(){if(this.bus)return;const t=this.audio.ctx;this.bus=t.createGain(),this.bus.gain.value=1e-4,this.bus.connect(this.audio.master),this.nextT=t.currentTime+.1}setWave(t){this.bpm=92+Math.min(t,8)*4}setIntensity(t){this.targetIntensity=_t(t,0,1)}setBreak(t){this.breakMode=t}duck(){if(!this.bus)return;const t=this.audio.ctx.currentTime;this.bus.gain.cancelScheduledValues(t),this.bus.gain.setValueAtTime(this.bus.gain.value,t),this.bus.gain.linearRampToValueAtTime(this._level()*.55,t+.03),this.bus.gain.linearRampToValueAtTime(this._level(),t+.28)}_level(){return this.breakMode?.05:.03+this.intensity*.13}update(t){if(!this.bus)return;const e=this.audio.ctx;this.intensity+=(this.targetIntensity-this.intensity)*(1-Math.exp(-1.5*t));const i=60/this.bpm/4;for(;this.nextT<e.currentTime+.12;)this._schedule(this.step,this.nextT),this.step=(this.step+1)%gl,this.nextT+=i;this.bus.gain.setTargetAtTime(this._level(),e.currentTime,.15)}_schedule(t,e){const i=this.audio,s=this.intensity,r=Math.floor(t/gl);if(t%8===0){const o=[[110,164.8,220],[98,146.8,196],[87.3,130.8,174.6],[103.8,155.6,207.6]][r%4];for(const l of o)i._playTone({t0:e,dur:1.6,peak:.05,type:"triangle",freq:l*2,dest:this.bus})}if(!this.breakMode){if(s>.25&&(t===0||t===8||s>.6&&t===12)&&i._playTone({t0:e,dur:.16,peak:.5*s,type:"sine",freq:52,slide:-30,dest:this.bus}),s>.4&&t%2===1&&i._playNoise({t0:e,dur:.03,peak:.06*s,filter:"highpass",freq:7e3,rate:2,dest:this.bus}),s>.55){const o=[0,0,3,0,5,0,3,0][t%8];if(t%2===0){const l=55*Math.pow(2,o/12);i._playTone({t0:e,dur:.14,peak:.22*s,type:"sawtooth",freq:l,dest:this.bus})}}this.overdrive&&(t===2||t===6||t===10||t===14)&&i._playTone({t0:e,dur:.1,peak:.14,type:"square",freq:440*Math.pow(2,t/2%3/4),dest:this.bus})}}}const Ht=n=>document.getElementById(n);function N0(){const n=Ht("hud");n.dataset.built||(n.dataset.built="1",n.innerHTML=`
    <div id="vignette"></div>
    <div id="lowhp"></div>
    <div id="flash"></div>
    <div id="crosshair">
      <div id="ch-t" class="ch-line"></div>
      <div id="ch-b" class="ch-line"></div>
      <div id="ch-l" class="ch-line"></div>
      <div id="ch-r" class="ch-line"></div>
      <div id="ch-dot"></div>
    </div>
    <div id="hitmarker"><span></span><span></span><span></span><span></span></div>
    <div id="dmg-dirs"></div>
    <div id="hitnums"></div>
    <div id="top-left">
      <div id="wave">WAVE 1</div>
      <div id="wave-sub">0 HOSTILES</div>
    </div>
    <div id="top-right">
      <div id="score">0</div>
      <div id="score-sub">x1.0</div>
    </div>
    <div id="killfeed"></div>
    <div id="multikill"></div>
    <div id="center"><div id="center-msg"></div><div id="center-sub"></div></div>
    <div id="bottom-left">
      <div id="hp-row"><div id="hp-bar-wrap"><div id="hp-bar"></div></div><div id="hp">100</div></div>
      <div id="combo"></div>
    </div>
    <div id="bottom-right">
      <div id="ammo">30</div>
      <div id="ammo-sub">∞ RESERVE</div>
    </div>
    <div id="overdrive"><div id="od-bar-wrap"><div id="od-bar"></div></div><div id="od-label">OVERDRIVE [Q]</div></div>
    <div id="prompt"></div>
    <div id="stats"></div>
    <div id="adsdiag"></div>`)}class F0{constructor(){N0(),this.root=Ht("hud"),this.ch={t:Ht("ch-t"),b:Ht("ch-b"),l:Ht("ch-l"),r:Ht("ch-r"),dot:Ht("ch-dot")},this.el={ammo:Ht("ammo"),ammoSub:Ht("ammo-sub"),hp:Ht("hp"),hpBar:Ht("hp-bar"),wave:Ht("wave"),waveSub:Ht("wave-sub"),score:Ht("score"),scoreSub:Ht("score-sub"),combo:Ht("combo"),od:Ht("overdrive"),odBar:Ht("od-bar"),odLabel:Ht("od-label"),killfeed:Ht("killfeed"),multikill:Ht("multikill"),dmgDirs:Ht("dmg-dirs"),vignette:Ht("vignette"),lowhp:Ht("lowhp"),prompt:Ht("prompt"),center:Ht("center"),centerMsg:Ht("center-msg"),centerSub:Ht("center-sub"),hit:Ht("hitmarker"),flash:Ht("flash"),stats:Ht("stats"),adsdiag:Ht("adsdiag"),hitnums:Ht("hitnums")},this._hitT=0,this._nums=[],this._numPool=[],this._feed=[],this._centerT=0;for(let t=0;t<14;t++){const e=document.createElement("div");e.className="hitnum",e.style.display="none",this.el.hitnums.appendChild(e),this._numPool.push(e)}}setSpread(t){const e=5+t;this.ch.t.style.transform=`translate(-50%, calc(-50% - ${e+7}px))`,this.ch.b.style.transform=`translate(-50%, calc(-50% + ${e+7}px))`,this.ch.l.style.transform=`translate(calc(-50% - ${e+7}px), -50%)`,this.ch.r.style.transform=`translate(calc(-50% + ${e+7}px), -50%)`}setHostile(t){const e=t?"#ff3344":"#ffffff";for(const i of["t","b","l","r"])this.ch[i].style.background=e;this.ch.dot.style.background=e}setAdsFade(t){this.root.style.setProperty("--ch-scale",String(1-t*.55)),this.ch.t.parentElement.style.opacity=String(1-t*.85)}setAmmo(t){this.el.ammo.textContent=t,this.el.ammo.classList.toggle("low",t<=7)}setHP(t){this.el.hp.textContent=Math.ceil(t),this.el.hpBar.style.width=t+"%",this.el.hpBar.classList.toggle("crit",t<30)}setWave(t,e){this.el.wave.textContent="WAVE "+t,this.el.waveSub.textContent=e+" HOSTILES"}setScore(t,e){this.el.score.textContent=t.toLocaleString(),this.el.scoreSub.textContent="x"+e.toFixed(1)}setCombo(t,e){this.el.combo.textContent=t,this.el.combo.classList.toggle("show",e)}setOverdrive(t,e){this.el.odBar.style.width=t*100+"%",this.el.od.classList.toggle("armed",e),this.el.od.classList.toggle("active",t>=1)}showHit(t){this.el.hit.className="hitmarker show "+(t==="kill"?"kill":t==="head"?"head":""),this._hitT=.18}showDamageNumber(t,e,i,s,r){const a=this._numPool.find(o=>o.style.display==="none");a&&(a.textContent=s?i+"!":i,a.className="hitnum show"+(s?" head":"")+(r?" kill":""),a.style.display="block",this._nums.push({d:a,x:t+(Math.random()*24-12),y:e,t:0,vy:-46}))}showKill(t,e,i,s){const r=document.createElement("div");r.className="feed-item"+(i?" head":""),r.innerHTML=(i?"<b>HEADSHOT</b> ":"")+t+" <span>+"+e+(s>1?" x"+s.toFixed(1):"")+"</span>",this.el.killfeed.appendChild(r),this._feed.push({d:r,t:0}),this._feed.length>5&&this._feed.shift().d.remove()}showMultikill(t){this.el.multikill.textContent=t,this.el.multikill.classList.add("show"),setTimeout(()=>this.el.multikill.classList.remove("show"),1400)}showCenter(t,e,i=2.5){this.el.centerMsg.textContent=t,this.el.centerSub.textContent=e||"",this.el.center.classList.add("show"),this._centerT=i}hideCenter(){this.el.center.classList.remove("show"),this._centerT=0}setPrompt(t){this.el.prompt.textContent=t||"",this.el.prompt.classList.toggle("show",!!t)}setDamageDirs(t){const e=this.el.dmgDirs;for(;e.children.length<t.length;){const i=document.createElement("div");i.className="dmg-arc",e.appendChild(i)}for(let i=0;i<e.children.length;i++)i<t.length?(e.children[i].style.display="block",e.children[i].style.transform=`translate(-50%,-50%) rotate(${t[i].a*180/Math.PI}deg)`,e.children[i].style.opacity=String(t[i].op??1)):e.children[i].style.display="none"}setVignette(t){this.el.vignette.style.opacity=String(Math.min(1,t)),this.el.lowhp.classList.toggle("on",t>.55)}flashWhite(t){this.el.flash.style.opacity=String(t)}setStats(t){this.el.stats.style.display=t.show?"block":"none",t.show&&(this.el.stats.textContent=`FPS ${t.fps} | draws ${t.draws} | tris ${t.tris} | enemies ${t.enemies} | ragdolls ${t.ragdolls} | parts ${t.particles}`)}setAdsDiag(t){if(!t){this.el.adsdiag.style.display="none";return}this.el.adsdiag.style.display="block",this.el.adsdiag.textContent=t.join(`
`)}update(t){this._hitT>0&&(this._hitT-=t,this._hitT<=0&&(this.el.hit.className="hitmarker")),this._centerT>0&&(this._centerT-=t,this._centerT<=0&&this.el.center.classList.remove("show"));for(const e of this._feed)e.t+=t,e.d.style.opacity=String(Math.max(0,1-Math.max(0,e.t-2.2)/.8)),e.t>3.2&&e.d.remove();this._feed=this._feed.filter(e=>e.t<=3.2);for(let e=this._nums.length-1;e>=0;e--){const i=this._nums[e];i.t+=t,i.vy+=60*t,i.y+=i.vy*t,i.d.style.transform=`translate(-50%,-50%) translate(${i.x}px, ${i.y}px) scale(${1-i.t*.25})`,i.d.style.opacity=String(Math.max(0,1-i.t/.9)),i.t>.9&&(i.d.style.display="none",this._nums.splice(e,1))}this.el.flash.style.transition="opacity 90ms linear"}}const Br=n=>document.getElementById(n);function O0(n){const t=Br("start-screen");return t.innerHTML=`
    <h1>WHITEOUT</h1>
    <h2>PROTOCOL // STATION K-7 // SECTOR 4</h2>
    <div class="controls">
      <div><b>WASD</b> move &nbsp; <b>SHIFT</b> sprint &nbsp; <b>DBL-SHIFT</b> tactical sprint</div>
      <div><b>CTRL</b> crouch / slide &nbsp; <b>SPACE</b> jump &nbsp; <b>E</b> mantle vault</div>
      <div><b>Q / E</b> lean &nbsp; <b>DBL-Q</b> activate OVERDRIVE &nbsp; <b>R</b> reload</div>
      <div><b>LMB</b> fire &nbsp; <b>RMB</b> aim down sights &nbsp; <b>I</b> inspect weapon</div>
      <div><b>T</b> ADS self-test &nbsp; <b>&grave;</b> debug overlay &nbsp; <b>ESC</b> pause</div>
    </div>
    <div>
      <button id="btn-start">DEPLOY</button>
      <button id="btn-god" class="ghost">GOD MODE</button>
    </div>
    <div class="fine">HOSTILES INBOUND — SURVIVE THE WAVES</div>`,{show(){t.classList.remove("hidden")},hide(){t.classList.add("hidden")},bind(){Br("btn-start").addEventListener("click",()=>n(!1)),Br("btn-god").addEventListener("click",()=>n(!0))}}}const z0=new w;function B0(n,t,e){let i=0;for(const s of e){if(!s.solid)continue;const r=s.box,a=n.x>r.min.x-t&&n.x<r.max.x+t,o=n.z>r.min.z-t&&n.z<r.max.z+t;if(!a||!o)continue;if(r.max.y<=n.y+.5){i=Math.max(i,r.max.y);continue}const l=Math.abs(n.x-(r.min.x-t)),c=Math.abs(n.x-(r.max.x+t)),h=Math.abs(n.z-(r.min.z-t)),u=Math.abs(n.z-(r.max.z+t)),f=Math.min(l,c,h,u);f===l?n.x=r.min.x-t:f===c?n.x=r.max.x+t:f===h?n.z=r.min.z-t:n.z=r.max.z+t}return n.y<i&&(n.y=i),i}function k0(n,t,e,i){const s=z0.subVectors(t,n),r=s.length();if(r<.001)return!0;e.set(n,s.normalize()),e.far=r-.3;const a=e.intersectObjects(i,!1);for(const o of a)if(!o.object.userData.shootThrough)return!1;return!0}const kr={rusher:{hp:50,speed:5,color:3351594,melee:15},gunner:{hp:70,speed:3,color:2304563,dmg:8},heavy:{hp:70,armor:120,speed:2.1,color:1909289,dmg:13}};let H0=0;class V0{constructor(t,e,i,s,r){this.id=H0++,this.world=e,this.game=i,this.type=s;const a=kr[s];this.spec=a,this.hp=a.hp,this.armor=a.armor||0,this.alive=!0,this.rushT=0,this.flank=!1,this.group=new xi,this.group.position.copy(r),this.group.position.y=0,this.yaw=Math.atan2(-r.x,-r.z),this.velY=0,this.phase=B.range(0,6.28),this.state="advance",this._stuckT=0,this._stuckDir=1,this._ppx=void 0,this._ppz=void 0,this.cover=null,this.peekT=B.range(.5,1.5),this.reactT=0,this.burst=[],this.seenPlayer=!1,this.lastSeen=0,this.woundedTrailT=0,this.lungeT=-1,this._scratch=new w,this._scratch2=new w,this._scratch3=new w,this._muzzleW=new w;const o=new ii({color:a.color,roughness:.85,metalness:.1}),l=new ii({color:1316636,roughness:.9}),c=new ii({color:14540253,emissive:10070783,emissiveIntensity:.9,roughness:.4}),h=(u,f,m,v,g,d,p,T,x=this.group)=>{const b=new It(new re(u,f,m),p);return b.position.set(v,g,d),b.castShadow=!0,b.name=T,b.userData.enemy=this,b.userData.part=T,b.userData.base=b.position.clone(),b.userData.flinch=new w,x.add(b),b};if(this.parts={},this.parts.torso=h(.46,.62,.28,0,1.18,0,o,"torso"),this.parts.head=h(.22,.24,.22,0,1.66,0,l,"head"),this.parts.head.userData.headshot=!0,this.parts.armL=h(.13,.56,.15,-.31,1.16,0,o,"armL"),this.parts.armR=h(.13,.56,.15,.31,1.16,0,o,"armR"),this.parts.legL=h(.16,.82,.18,-.13,.44,0,l,"legL"),this.parts.legR=h(.16,.82,.18,.13,.44,0,l,"legR"),this.parts.vest=h(.48,.34,.3,0,1.28,0,l,"vest"),h(.06,.05,.02,-.12,1.4,.16,c,"stripL"),h(.06,.05,.02,.12,1.4,.16,c,"stripR"),h(.1,.04,.02,0,1.78,.115,c,"stripH"),this.gun=h(.07,.09,.5,.34,1.05,-.28,l,"gun"),this.muzzle=new ee,this.muzzle.position.set(0,0,-.55),this.gun.add(this.muzzle),s==="rusher"&&h(.04,.4,.04,.36,1.3,-.35,new ii({color:10475752,roughness:.3,metalness:.6}),"axe",this.parts.armR).position.set(0,-.35,-.1),this.plates=[],s==="heavy")for(let u=0;u<4;u++){const f=h(.2,.18,.05,u%2?.12:-.12,1.2+(u<2?.1:-.1),u<2?.18:-.18,new ii({color:3949131,roughness:.55,metalness:.7}),"plate"+u);this.plates.push(f)}this.hitMeshes=[this.parts.torso,this.parts.head,this.parts.armL,this.parts.armR,this.parts.legL,this.parts.legR,this.parts.vest,...this.plates].filter(Boolean),t.add(this.group)}get pos(){return this.group.position}get eyePos(){return this._scratch2.set(this.pos.x,this.pos.y+1.6,this.pos.z)}hit(t,e,i){if(!this.alive)return{killed:!1,absorbed:!0};const s=!!t.userData.headshot;let r=e,a=!1;if(s&&(r*=2),this.armor>0&&!s){const o=this.armor;this.armor-=r,a=!0,r=0;const l=Math.floor((kr.heavy.armor-o)/30),c=Math.min(this.plates.length,Math.floor((kr.heavy.armor-Math.max(this.armor,0))/30));for(let h=l;h<c;h++)this.plates[h].visible&&(this.plates[h].visible=!1,this.game.plateFlyOff(this.plates[h],i));if(this.armor<=0){this.armor=0;for(const h of this.plates)h.visible=!1}}return this.hp-=r,t.userData.flinch.add(i).multiplyScalar(s?.09:.05),t.userData.flinch.y=Math.max(t.userData.flinch.y,.02),(r>=30||s)&&this.parts.torso.userData.flinch.add(i).multiplyScalar(.12),this.hp<=0?(this.alive=!1,{killed:!0,headshot:s,absorbed:!1}):(this.hp<this.spec.hp*.45&&!a&&this._trail(e,i,s,t),{killed:!1,headshot:s,absorbed:a})}_trail(t,e,i,s){const r=this._hitPoint||this.eyePos;this.game.spawnBloodHit(r,e,i,s),this.woundedTrailT<=0&&(this.woundedTrailT=.35,this.game.bloodTrail(this.pos))}setHitPoint(t){this._hitPoint=t.clone()}update(t,e,i){if(!this.alive)return;this.woundedTrailT-=t;for(const g of this.hitMeshes){const d=g.userData.flinch;d.multiplyScalar(Math.exp(-8*t)),d.lengthSq()>1e-4?g.position.copy(g.userData.base).add(d):g.position.copy(g.userData.base)}const s=this._scratch.copy(i.pos).sub(this.pos);s.y=0;const r=s.length(),a=s.x/(r||1),o=s.z/(r||1),l=k0(this.eyePos,i.camera.position,this.game.raycaster,this.world.raycastTargets);l&&(this.seenPlayer||(this.reactT=B.range(.35,.85)),this.seenPlayer=!0,this.lastSeen=e),this.reactT>0&&(this.reactT-=t),this.rushT>0&&(this.rushT-=t);const c=i.health<40||i.weapon.isReloading||this.rushT>0;let h=this.spec.speed*(this.game.overdriveActive,1),u=null;if(this.type==="rusher")u=this.flank?this._flankPoint(i):this._scratch2.copy(i.pos),r<2.7&&this.lungeT<0&&this.reactT<=0&&(this.lungeT=0,this.game.audio.playRusherCharge()),this.lungeT>=0&&this._lunge(t,i,e);else if(this.type==="gunner")if(c||this.state==="rush")this.state="rush",u=this.flank?this._flankPoint(i):this._scratch2.copy(i.pos).addScaledVector(this._scratch3.set(a,0,o),-3.5);else{this.cover||(this.cover=this.world.coverPoints[B.int(this.world.coverPoints.length)]);const g=this.cover.pos,d=this._scratch2.copy(g).sub(this.pos);d.y=0,d.length()>.6?(u=g,this.state="advance"):this.state="hold"}else u=this._scratch2.copy(i.pos).addScaledVector(this._scratch3.set(a,0,o),-6.5),r<14&&this.reactT<=0&&l&&this._fireBurst(e,3);if(this.type==="gunner"&&this.state==="hold"){this.peekT-=t;const g=this.cover?this.cover.dir:this._scratch2.set(0,0,1),d=_t(Math.sin((e+this.id)*.9)*1.4,0,1);this.pos.x+=(this.cover.pos.x+g.x*.9*d-this.pos.x)*(1-Math.exp(-6*t)),this.pos.z+=(this.cover.pos.z+g.z*.9*d-this.pos.z)*(1-Math.exp(-6*t)),this._face(i,t,6),this.peekT<=0&&l&&this.reactT<=0&&r<26&&(this._fireBurst(e,2+B.int(2)),this.peekT=B.range(1.6,2.8)*(c?.55:1)),h=0}if(this._ppx!==void 0&&this._stuckT<=0){const g=Math.hypot(this.pos.x-this._ppx,this.pos.z-this._ppz);u&&this.lungeT<0&&g<.03&&r>2.5&&(this._stuckT=1.1,this._stuckDir=B.rand()<.5?1:-1)}if(this._ppx=this.pos.x,this._ppz=this.pos.z,this._stuckT>0&&(this._stuckT-=t,u&&this.lungeT<0)){const g=u.x-this.pos.x,d=u.z-this.pos.z,p=Math.hypot(g,d)||1;this.pos.x+=-d/p*h*.95*t*this._stuckDir,this.pos.z+=g/p*h*.95*t*this._stuckDir}if(u&&this.lungeT<0){const g=this._scratch2.copy(u).sub(this.pos);g.y=0,g.length()>.5&&(g.normalize(),this.pos.x+=g.x*h*t,this.pos.z+=g.z*h*t,this._face(i,t,5))}B0(this.pos,.42,this.world.colliders),this.pos.y=Math.max(this.pos.y,0),this.pos.y>.01&&(this.velY-=16*t),this.pos.y=Math.max(0,this.pos.y+this.velY*t);for(const g of this.game.enemies){if(g===this||!g.alive)continue;const d=this.pos.x-g.pos.x,p=this.pos.z-g.pos.z,T=d*d+p*p;if(T<.81&&T>1e-4){const x=1/Math.sqrt(T);this.pos.x+=d*x*(.9-Math.sqrt(T))*.6,this.pos.z+=p*x*(.9-Math.sqrt(T))*.6}}this.pos.x=_t(this.pos.x,-28,28),this.pos.z=_t(this.pos.z,-28,28);const f=Math.hypot(this.pos.x-(this._lastX??this.pos.x),this.pos.z-(this._lastZ??this.pos.z))/Math.max(t,.001);this._lastX=this.pos.x,this._lastZ=this.pos.z;const m=_t(f/4,0,1);this.phase+=t*(4+f*1.4);const v=Math.sin(this.phase*3);this.parts.legL.rotation.x=v*.7*m,this.parts.legR.rotation.x=-v*.7*m,this.parts.armL.rotation.x=-v*.5*m,this.lungeT<0&&(this.parts.armR.rotation.x=v*.5*m-.3),this.parts.torso.rotation.x=.06*m+Math.sin(this.phase*6)*.01,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.phase*3))*.03*m,this.group.rotation.y=this.yaw;for(let g=this.burst.length-1;g>=0;g--)e>=this.burst[g].at&&(this._shoot(this.burst[g].spread),this.burst.splice(g,1))}_face(t,e,i){const s=t.pos.x-this.pos.x,r=t.pos.z-this.pos.z;let o=Math.atan2(-s,-r)-this.yaw;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;this.yaw+=o*(1-Math.exp(-i*e))}_flankPoint(t){const e=t.yaw+Math.PI+(this.id%2?.9:-.9);return this._scratch2.set(_t(t.pos.x-Math.sin(e)*-8,-26,26),0,_t(t.pos.z-Math.cos(e)*-8,-26,26))}_lunge(t,e,i){this.lungeT+=t;const s=this.parts.armR;if(this.lungeT<.45)s.rotation.x=-Mi(this.lungeT/.45)*2.2,this.pos.x+=Math.sin(this.yaw)*-1.5*t,this.pos.z+=Math.cos(this.yaw)*-1.5*t;else if(this.lungeT<.6)s.rotation.x=G0(s.rotation.x,.6,(this.lungeT-.45)/.15),this.pos.x-=Math.sin(this.yaw)*5*t,this.pos.z-=Math.cos(this.yaw)*5*t;else{if(s.rotation.x=.6,this.lungeT>.6&&this.lungeT<.75){const r=this._scratch.copy(e.pos).sub(this.pos);r.y=0,r.length()<2.3&&this.game.hitPlayer(this.pos,this.spec.melee,.55)&&this.game.audio.playMeleeHit()}this.lungeT>1.4&&(this.lungeT=-1,s.rotation.x=-.3)}}_fireBurst(t,e){for(let i=0;i<e;i++)this.burst.push({at:t+i*.14,spread:this.type==="heavy"?.05:.07});this.game.audio.playEnemyWeaponReady?.()}_shoot(t){const e=this.muzzle.getWorldPosition(this._muzzleW),i=this._scratch.copy(this.game.camera.position),s=this._scratch2.copy(i).sub(e).normalize();s.x+=B.range(-t,t),s.y+=B.range(-t,t)*.6,s.z+=B.range(-t,t),s.normalize(),this.game.enemyBullet(e,s,this)}}function G0(n,t,e){return n+(t-n)*_t(e,0,1)}const W0=180/Math.PI;function X0(n){const{vm:t,controller:e,hud:i,camera:s}=n,r=["— ADS SELF-TEST (A4) —"];let a=!0;const o=new w,l=new w,c=new w,h=new w,u=new Ee,f=n._vmCtx,m=f.adsTarget,v=t.adsT;f.adsTarget=1,t.adsT=1,t.update(.05,n.time.t,f),t.group.updateMatrixWorld(!0),t.camera.updateMatrixWorld(!0);for(const C of[75,65,55]){s.fov=C,s.updateProjectionMatrix(),s.getWorldQuaternion(u),t.group.updateMatrixWorld(!0),t.rearSightAnchor.getWorldPosition(o),t.frontSightAnchor.getWorldPosition(l);const R=l.clone().sub(o).normalize();h.set(0,0,-1).applyQuaternion(u);const U=Math.acos(Math.min(1,R.dot(h)))*W0*60,Y=l.clone().project(t.camera),_=(Y.x*.5+.5)*window.innerWidth,M=(Y.y*-.5+.5)*window.innerHeight,A=Math.hypot(_-window.innerWidth/2,M-window.innerHeight/2),P=U<6&&A<1.5;P||(a=!1),r.push(`FOV ${C}°: sight∥center-ray ${U.toFixed(2)}'  dot dev ${A.toFixed(2)}px  [${P?"PASS":"FAIL"}]`)}t.rearSightAnchor.getWorldPosition(o);const g=u.clone().invert(),d=o.clone().sub(s.position).applyQuaternion(g),p=-d.z,T=p>=.08&&p<=.12,x=Math.hypot(d.x,d.y),b=t.frontSightAnchor.position.y>t.parts.barrel.position.y+.04,I=c.copy(t.muzzleAnchor.position).sub(t.rearSightAnchor.position).normalize().dot(l.copy(t.frontSightAnchor.position).sub(t.rearSightAnchor.position).normalize())>.985;return(!T||x>.002||!b||!I)&&(a=!1),r.push(`eye relief ${(p*100).toFixed(1)} cm (want 8–12) [${T?"PASS":"FAIL"}]`),r.push(`rear anchor lateral ${(x*1e3).toFixed(2)} mm (want <2) [${x<=.002?"PASS":"FAIL"}]`),r.push(`sight line clears barrel top [${b?"PASS":"FAIL"}]`),r.push(`muzzle collinear with sight axis [${I?"PASS":"FAIL"}]`),r.push(a?"RESULT: ALL CHECKS PASS":"RESULT: FAILURES — see above"),f.adsTarget=m,t.adsT=v,s.fov=75,s.updateProjectionMatrix(),i.setAdsDiag(r),n._diagT=8,{lines:r,pass:a}}const q0=40,Y0={rusher:100,gunner:120,heavy:300},K0=150;class $0{constructor(t){this.d=t;const{gfx:e,world:i,input:s,time:r,hud:a,audio:o,music:l,controller:c,vm:h,weapon:u,fields:f,tracers:m,decals:v,shells:g,explosions:d,impacts:p,ragdolls:T,waves:x,lighting:b}=t;this.gfx=e,this.world=i,this.input=s,this.time=r,this.hud=a,this.audio=o,this.music=l,this.controller=c,this.vm=h,this.weapon=u,this.fields=f,this.tracers=m,this.decals=v,this.shells=g,this.explosions=d,this.impacts=p,this.ragdolls=T,this.waves=x,this.lighting=b,this.camera=e.camera,this.scene=e.worldScene,this.enemies=[],this.state="menu",this.score=0,this.mult=1,this.combo=0,this.comboT=0,this.odMeter=0,this.odActive=!1,this.whiteFlash=0,this.hitFlash=0,this.ca=0,this.motion=0,this.breakT=0,this.killStamps=[],this.dmgDirs=[],this._diagT=0,this._hostileT=0,this._lastAmmo=-1,this._lastHp=-1,this._slidePuffT=0,this.raycaster=new Jl,this._targets=[],this._targetsDirty=!0,this._v1=new w,this._v2=new w,this._v3=new w,this._endV=new w,this._campRef={x:0,z:0,t:0},this._muzzle=new w,this._camRight=new w,this._camUp=new w,this._camFwd=new w,this._vmCtx={adsTarget:0,moveSpeed:0,sprint:!1,tac:!1,sliding:!1,crouch:!1,airborne:!1,mantleT:-1,lean:0,camQuat:this.camera.quaternion,camPos:this.camera.position,lookDX:0,lookDY:0,landingDip:0,wallBump:0},c.onDeath=()=>this.die(),c.onDamageDir=I=>this.addDamageDir(I),c.onSlide=(I,C,R)=>this._slidePuff(I,C,R),c.onLandPuff=(I,C)=>{this.fields.powder.burst(this._v1.set(I.x,.06,I.z),Math.round(C),2.6,.6,.2,-1.6)},g.hooks.camPos=()=>this.camera.position,g.hooks.onTinkle=(I,C)=>this.audio.playShellTinkle(I,C),g.hooks.onSteam=I=>{this.fields.smoke.spawn(I.x,I.y+.02,I.z,0,.5,0,1.4,.06,-.1),this.audio.playShellSteam()},T.hooks.onBodyImpact=(I,C)=>{this.audio.setImpactPos(I),this.audio.playBodyFall(C),this.fields.powder.burst(this._v1.copy(I).setY(.1),Math.round(4+C*8),2.2,.6,.18,-2),C>.25&&this.decals.spawn("blood",this._v1.copy(I).setY(.02),this._v2.set(0,1,0),.6,{life:8})}}get overdriveActive(){return this.odActive}get t(){return this.time.t}start(t){this.audio.init(),this.music.init(),this.controller.godMode=!!t,this.hud.hideCenter(),this.state="playing",this.waves.start(1),this.hud.showCenter("WAVE 1","HOSTILES INBOUND",2.2),this.audio.playWaveBanner(),this.input.requestLock(this.gfx.renderer.domElement)}pause(){this.state!=="playing"&&this.state!=="break"||(this._prevState=this.state,this.state="paused",this.audio.suspend(),this.hud.setPrompt("PAUSED — CLICK TO RESUME"))}resume(){this.state==="paused"&&(this.state=this._prevState||"playing",this.audio.resume(),this.input.requestLock(this.gfx.renderer.domElement),this.hud.setPrompt(""))}die(){this.state="dead",this.odActive=!1,document.exitPointerLock&&document.exitPointerLock(),this.hud.showCenter("YOU ARE DEAD",`FINAL SCORE ${this.score.toLocaleString()} — PRESS R TO REDEPLOY`,999),this.hud.setVignette(1),this.audio.playPlayerHurt(),this.music.setIntensity(.1)}restart(){B.reseed();for(const t of this.enemies)this.scene.remove(t.group);this.enemies.length=0,this._targetsDirty=!0,this.ragdolls.clear(),this.decals.clearAll(),this.shells.clear(),this.explosions.clearPending(),this.world.respawnDrums();for(const t of this.world.windows)t.visible=!0;this.time.reset(),this.controller.reset(),this.weapon.reset(),this.score=0,this.mult=1,this.combo=0,this.comboT=0,this.odMeter=0,this.odActive=!1,this.whiteFlash=0,this.hitFlash=0,this.ca=0,this.dmgDirs.length=0,this.killStamps.length=0,this.tracers.setGlow(!1),this.music.overdrive=!1,this.music.setBreak(!1),this.music.setWave(1),this.hud.setVignette(0),this.hud.hideCenter(),this.state="playing",this.waves.start(1),this.hud.showCenter("WAVE 1","REDEPLOYED",2.2),this.audio.playWaveBanner(),this.input.requestLock(this.gfx.renderer.domElement)}frame(t){this.time.update(t);const e=this.time.dt,i=this.time.t,s=this.input;if(s.pressedEdge("Backquote")&&this.d.debug&&this.d.debug.toggle(),s.pressedEdge("KeyT")&&X0(this),this._diagT>0&&(this._diagT-=t,this._diagT<=0&&this.hud.setAdsDiag(null)),this.hud.update(t),this.state==="paused"){this.gfx.renderer.domElement.clicked,s.endFrame(),this.gfx.setComposite(this.time.realT,{white:0,hit:0,od:0,motion:0,ca:0}),this.gfx.render();return}if(this.state==="menu"){this._updateWorld(0,this.time.realT),s.endFrame(),this.gfx.setComposite(this.time.realT,{}),this.gfx.render();return}const r=this.state==="playing"||this.state==="break",a=r&&s.rmb&&!this.controller.sliding?1:0;this._ads=De(this._ads??0,a,16,e);const o=_t(this._ads,0,1),l=this.controller.pos;Math.hypot(l.x-this._campRef.x,l.z-this._campRef.z)<1.2?this._campT=(this._campT||0)+e:(this._campT=0,this._campRef.x=l.x,this._campRef.z=l.z),r?(s.consumeQDouble()&&this.odMeter>=1&&!this.odActive&&this._activateOverdrive(),this.controller.update(e,i,o),this.weapon.update(e,i,o,this.state==="playing"),s.pressedEdge("KeyI")&&this.vm.startInspect()):this.state==="dead"&&(this.controller.update(e,i,0),s.pressedEdge("KeyR")&&this.restart()),this.state==="playing"&&this.waves.update(e,i),this.state==="break"&&(this.breakT-=e,this.breakT<=0&&(this.state="playing",this.waves.start(this.waves.wave+1),this.music.setBreak(!1),this.music.setWave(this.waves.wave),this.hud.showCenter("WAVE "+this.waves.wave,"HOSTILES INBOUND",2.2),this.audio.playWaveBanner()));for(let f=this.enemies.length-1;f>=0;f--)this.enemies[f].update(e,i,this.controller);this.odActive&&this.time.overdrive<=0&&(this.odActive=!1,this.odMeter=0,this.tracers.setGlow(!1),this.music.overdrive=!1),this.comboT>0&&(this.comboT-=e,this.comboT<=0&&(this.combo=0,this.mult=1,this.hud.setCombo("",!1)));for(let f=this.dmgDirs.length-1;f>=0;f--)this.dmgDirs[f].t+=t,this.dmgDirs[f].t>1.4&&this.dmgDirs.splice(f,1);this._updateWorld(e,i);const c=this._vmCtx;c.adsTarget=o,c.moveSpeed=Math.hypot(this.controller.vel.x,this.controller.vel.z),c.sprint=this.controller.sprinting,c.tac=this.controller.tac,c.sliding=this.controller.sliding,c.crouch=this.controller.crouching,c.airborne=this.controller.airborne,c.mantleT=this.controller.mantleT,c.lean=this.controller.lean,c.landingDip=this.controller.landingDip.value,c.wallBump=this.controller.wallBump,c.lookDX=s.dx,c.lookDY=s.dy,this.vm.update(e,i,c),this.lighting.muzzleLight.intensity*=Math.exp(-34*e),this.lighting.boomLight.intensity*=Math.exp(-9*e),this._hudFrame(e,o),this.audio.setListener(this.camera),this.audio.update(t,this.time.realT),this.audio.setDanger(1-this.controller.health/100),this.audio.applyMuffle();const h=this.state==="break"?.15:_t(.3+this.enemies.length/14+this.waves.wave*.04,0,1);this.music.setIntensity(this.state==="break"?.2:h),this.music.overdrive=this.odActive,this.music.update(t),this.whiteFlash*=Math.exp(-26*t),this.hitFlash=_t(this.hitFlash-t*1.6,0,1),this.ca=Math.max(this.ca*Math.exp(-6*t),this.hitFlash*.5);const u=Math.min(Math.abs(s.dx)/40,1);this.motion=De(this.motion,u,12,t),this.odActive||_t(this.odMeter,0,1)*.25,this.gfx.setComposite(i,{ca:this.ca+(this.odActive?.3:0),hit:this.hitFlash*.9+(this.controller.health<30?.12+Math.sin(i*5)*.04:0),white:this.whiteFlash,od:this.odActive?1:0,motion:this.motion}),this.gfx.render(),s.endFrame()}_hudFrame(t,e){const i=this.hud;this.weapon.mag!==this._lastAmmo&&(i.setAmmo(this.weapon.mag),this._lastAmmo=this.weapon.mag);const s=Math.ceil(this.controller.health);s!==this._lastHp&&(i.setHP(this.controller.health),this._lastHp=s),i.setWave(this.waves.wave,this.waves.remaining),i.setScore(this.score,this.mult),i.setOverdrive(this.odActive?this.time.overdrive/6:this.odMeter,this.odMeter>=1&&!this.odActive),i.setSpread(this.weapon.bloom*26+(this.controller.sprinting?14:0)+(this.controller.airborne?10:0)),i.setAdsFade(e),i.setDamageDirs(this.dmgDirs.map(o=>{const l=1-o.t/1.4;return{a:o.a,op:l*l}})),this.combo>=2?i.setCombo(`x${this.combo} STREAK — ${Math.round(this.comboT*10)/10}s`,!0):i.setCombo("",!1);let r="";if(this.weapon.mag===0&&!this.weapon.isReloading&&this.state==="playing"?r="R TO RELOAD":this.odMeter>=1&&!this.odActive?r="DOUBLE-TAP Q — OVERDRIVE":this.controller.mantleT<0&&this.controller.wallBump!==0&&(r=""),i.setPrompt(r),this._hostileT-=t,this._hostileT<=0&&this.state==="playing"){this._hostileT=.08,this._rebuildTargets(!0),this.raycaster.set(this.camera.position,this.controller.getAimDir(this._v1)),this.raycaster.far=60;const o=this.raycaster.intersectObjects(this._enemyOnly,!1);i.setHostile(o.length>0)}const a=this.d.debug;if(a&&a.visible){const o=this.gfx.renderer.info;i.setStats({show:!0,fps:Math.round(1/Math.max(this.time.rawDt,.001)),draws:o.render.calls,tris:o.render.triangles,enemies:this.enemies.length,ragdolls:this.ragdolls.count,particles:this.fields.powder.live+this.fields.sparks.live+this.fields.bloodMist.live+this.fields.debris.live}),a.update(this.time.rawDt,{state:this.state,wave:this.waves.wave,queue:this.waves.queue.length,timeScale:this.time.timeScale.toFixed(2),seed:"0xC0DA",pos:`${this.controller.pos.x.toFixed(1)},${this.controller.pos.y.toFixed(1)},${this.controller.pos.z.toFixed(1)}`,move:this.controller.moveState,ads:e.toFixed(2)})}else i.setStats({show:!1})}_updateWorld(t,e){ke.uTime.value=e,this.world.update(e,t),this.lighting.update(e),this.d.volumetric&&this.d.volumetric.update(e);for(const i in this.fields)this.fields[i].update(e,this.camera);this.tracers.update(e),this.decals.update(t),this.shells.update(t),this.explosions.update(t,e),this.ragdolls.update(t)}_rebuildTargets(t=!1){if(t){this._enemyOnly=this._enemyOnly||[];const e=this._enemyOnly;e.length=0;for(const i of this.enemies)for(const s of i.hitMeshes)e.push(s);return}if(this._targetsDirty){const e=this._targets;e.length=0;for(const i of this.world.raycastTargets)e.push(i);for(const i of this.enemies)for(const s of i.hitMeshes)e.push(s);this._targetsDirty=!1}}fireBullet(t,e){if(this.state!=="playing")return;this.scene.updateMatrixWorld(),this._rebuildTargets();const i=this.camera.position;this.raycaster.set(i,t),this.raycaster.far=90;const s=this.raycaster.intersectObjects(this._targets,!1),r=this.vm.worldMuzzle(this._muzzle);this.lighting.muzzleLight.position.copy(r),this.lighting.muzzleLight.intensity=12,this._camRight.setFromMatrixColumn(this.camera.matrixWorld,0),this._camUp.setFromMatrixColumn(this.camera.matrixWorld,1),this._camFwd.set(0,0,-1).applyQuaternion(this.camera.quaternion),this.shells.spawn(this.vm.worldShellPort(this._v3),this._camRight,this._camUp,this._camFwd),this.fields.smoke.spawn(r.x,r.y,r.z,this._camFwd.x*2,.4,this._camFwd.z*2,.5,.09,-.3),this.controller.shakeFire(),this.music.duck();let a=this._endV.copy(t).multiplyScalar(60).add(i),o=q0,l=0,c=!1;for(const h of s){const u=h.object,f=u.userData.enemy;if(f&&f.alive){this._damageEnemy(f,u,h.point,t,o),a.copy(h.point),c=!0;break}if(u.userData.drum){const g=this.world.drums.find(d=>d.mesh===u);g&&g.alive&&this.drumExplode(g),a.copy(h.point),c=!0;break}const m=u.userData.shootThrough||(u.userData.isWindow?"glass":null);if(m&&l<2){l++;const g=this._v2.copy(h.point);m==="glass"?this.world.breakWindow(u)&&this.impacts.impact(g,h.face?this._v3.copy(h.face.normal).transformDirection(u.matrixWorld):this._camFwd,"glass",t):this.impacts.impact(g,h.face?this._v3.copy(h.face.normal).transformDirection(u.matrixWorld):this._camFwd,m,t,.7),o*=.55;continue}const v=h.face?this._v3.copy(h.face.normal).transformDirection(u.matrixWorld):this._camFwd.negate();a.copy(h.point),this.audio.setImpactPos(h.point),this.impacts.impact(h.point,v,u.userData.surface||"module",t),c=!0;break}if(!c)for(const h of this.enemies){const u=this._v2.copy(h.pos);u.y+=1.1;const f=this._v3.copy(u).sub(i).dot(t);if(f<=0)continue;if(this._v1.copy(t).multiplyScalar(f).add(i).distanceTo(u)<.9){this.audio.playNearMiss(u);break}}this.tracers.spawn(r,a,this.time.t)}_damageEnemy(t,e,i,s,r){this.weapon.registerHit(),t.setHitPoint(i);const a=t.hit(e,r,s);if(a.absorbed)this.audio.playImpactMetal(.7);else{const l=Math.round(_t(r/8,3,9));this.fields.bloodMist.burst(i,l,3.4,.55,.09,-7,1),this.fields.bloodMist.burst(i,3,1.6,.8,.05,-3,.4),this.audio.playFleshHit(_t(r/40,.4,1),a.headshot),this.decals.spawn("blood",this._v1.copy(i).setY(.02),this._v2.set(0,1,0),.42,{life:10})}const o=this._project(i);return this.hud.showDamageNumber(o.x,o.y,Math.round(a.absorbed?0:r),a.headshot,a.killed),a.killed?(this.killEnemy(t,a.headshot,s,i),!0):(this.hud.showHit((a.absorbed,"hit")),this.audio.playHitTick(!1),!1)}killEnemy(t,e,i,s){const r=this.enemies.indexOf(t);r>=0&&(this.enemies.splice(r,1),this.scene.remove(t.group),this._targetsDirty=!0),this.fields.bloodMist.burst(s,16,5.5,.7,.11,-6,1),e&&this.fields.bloodMist.burst(s,22,7,.8,.08,-5,.6),this.ragdolls.spawn(t,i,e||this.odActive),this.decals.spawn("blood",this._v1.copy(s).setY(.02),this._v2.set(0,1,0),e?.9:.55,{life:12}),this.combo++,this.comboT=3,this.mult=Math.min(1+Math.floor(this.combo/2)*.5,4);const a=(Y0[t.type]||100)+(e?K0:0),o=Math.round(a*this.mult);this.score+=o,this.hud.showKill(t.type.toUpperCase(),o,e,this.mult),this.hud.showHit(e?"head":"kill"),this.audio.playHitTick(!0),e&&this.audio.playHeadshot(),this.time.hitstop(e?.09:.06,.1),this.controller.fovKick(e?3:1.6),this.odActive||(this.odMeter=_t(this.odMeter+.34,0,1));const l=this.time.realT;for(this.killStamps.push(l);l-this.killStamps[0]>1.2;)this.killStamps.shift();const c=this.killStamps.length;c===2?this._multikill("DOUBLE KILL"):c===3?this._multikill("TRIPLE KILL"):c>=4&&c===this.killStamps.length&&this._multikill(`${c} KILL SPREE`),this.waves.queue.length===0&&this.enemies.length===0&&this.time.startKillcam(.9)}_multikill(t){this.hud.showMultikill(t),this.audio.playMultikill(Math.min(t.length%3,2))}_project(t){const e=this._v1.copy(t).project(this.camera);return{x:(e.x*.5+.5)*window.innerWidth,y:(e.y*-.5+.5)*window.innerHeight}}enemyBullet(t,e,i){this.audio.playEnemyReport(t),this.scene.updateMatrixWorld(),this._rebuildTargets(),this.raycaster.set(t,e),this.raycaster.far=70;const s=this.raycaster.intersectObjects(this._targets.filter(f=>!f.userData.enemy),!1);let r=70,a=null;for(const f of s)if(!(f.object.userData.shootThrough||f.object.userData.isWindow)){r=f.distance,a=f;break}const o=this._v1.copy(this.camera.position);o.y-=.45;const l=this._v2.copy(o).sub(t).projectOnVector(e),c=l.length()*Math.sign(l.dot(e)),h=this._v3.copy(e).multiplyScalar(c).add(t).distanceTo(o);let u=!1;if(c>.5&&c<r&&h<.52&&(u=!0),u){const f=i.spec.dmg||8;this.controller.takeDamage(f,t,this.time.realT)&&(this.hitFlash=1,this.audio.playPlayerHurt(),this.ca=Math.max(this.ca,.8)),this.tracers.spawn(t,this.camera.position,this.time.t)}else{const f=a?a.point:this._v1.copy(e).multiplyScalar(Math.min(r,50)).add(t);c>0&&h<1.4&&c<r&&this.audio.playNearMiss(o),this.tracers.spawn(t,f,this.time.t),a&&(this.audio.setImpactPos(a.point),this.impacts.impact(a.point,a.face?this._v2.copy(a.face.normal).transformDirection(a.object.matrixWorld):e.clone().negate(),a.object.userData.surface||"module",e,.6))}}hitPlayer(t,e,i){return this.controller.godMode||B.rand()>i?!1:this.controller.takeDamage(e,t,this.time.realT)?(this.hitFlash=1,this.audio.playPlayerHurt(),!0):!1}spawnEnemy(t,e,i){const s=new V0(this.scene,this.world,this,t,e);return t==="gunner"&&this._campT>6&&B.rand()<.5&&(s.flank=!0),this.enemies.push(s),this._targetsDirty=!0,s}waveCleared(t){this.state="break",this.breakT=6,this.music.setBreak(!0),this.world.respawnDrums(),this.hud.showCenter("WAVE "+t+" SECURED","REGROUP — NEXT WAVE INBOUND",3),this.score+=250*t,this.hud.showKill("WAVE BONUS",250*t,!1,1)}drumExplode(t){t.alive&&(this.world.killDrum(t),this.explosions.explode(t.mesh.position.clone(),!0))}explosionImpulse(t,e,i){for(let r=this.enemies.length-1;r>=0;r--){const a=this.enemies[r],o=this._v1.copy(a.pos);o.y+=1;const l=o.distanceTo(t);if(l<e){const c=this._v2.copy(o).sub(t).normalize(),h=Math.round(130*(1-l/e));a.armor=0;for(const u of a.plates)u.visible=!1;a.hp-=h,a.setHitPoint(o),a.parts.torso.userData.flinch.addScaledVector(c,.2),a.hp<=0?(a.alive=!1,this.killEnemy(a,!1,c,o),this.hud.showDamageNumber(this._project(o).x,this._project(o).y,h,!1,!0)):this.hud.showDamageNumber(this._project(o).x,this._project(o).y,h,!1,!1)}}this.ragdolls.impulseNear(t,e,i*.5);const s=this.camera.position.distanceTo(t);s<e*1.4&&this.controller.shakeNear(t,_t(1.4*(1-s/(e*1.4)),.2,1.4))}plateFlyOff(t,e){this.fields.debris.burst(this._v1.copy(t.getWorldPosition(this._v2)),6,3,.8,.09,-9),this.audio.playPlateFly()}spawnBloodHit(t,e,i,s){this.fields.bloodMist.burst(t,i?14:6,i?6:3,.5,.08,-7)}bloodTrail(t){this.decals.trail(this._v1.copy(t).setY(.02))}notifyReload(){this._pressureEnemies(2.2)}notifyDryFire(){this._pressureEnemies(3.5)}_pressureEnemies(t){for(const e of this.enemies)e.rushT=Math.max(e.rushT,t)}onPlayerShot(){}_activateOverdrive(){this.odActive=!0,this.time.startOverdrive(6),this.tracers.setGlow(!0),this.music.overdrive=!0,this.audio.playOverdrive(),this.hud.showCenter("OVERDRIVE","KILL CHAIN ENGAGED",1.4),this.controller.fovKick(6)}addDamageDir(t){const e=this._v1.copy(t).sub(this.camera.position),i=this._v2.setFromMatrixColumn(this.camera.matrixWorld,0),s=this._v3.set(0,0,-1).applyQuaternion(this.camera.quaternion),r=Math.atan2(e.dot(i),-e.dot(s));this.dmgDirs.push({a:r,t:0}),this.dmgDirs.length>6&&this.dmgDirs.shift()}whiteFlash(t){this.whiteFlash=Math.max(this.whiteFlash,t)}boomLight(t){this.lighting.boomLight.position.copy(t).setY(t.y+1),this.lighting.boomLight.intensity=220}_slidePuff(t,e,i){if(this._slidePuffT-=i,this._slidePuffT<=0&&e>3){this._slidePuffT=.03;const s=Math.round(_t(e*.8,2,7));this.fields.powder.burst(this._v1.set(t.x,.1,t.z),s,e*.5,.7,.22,-1.8,.5)}}}const j0=document.getElementById("app"),Nn=new Wm(j0),ue=new jl;Nn.worldScene=ue;Nn.camera=new ye(75,window.innerWidth/window.innerHeight,.06,400);Ym(ue);const Z0=jm(ue),Zs=t0(ue);Zs.raycastTargets.push(Z0.mesh);const sc=e0(ue),Qs=new g0,Q0=new _0,J0=new v0,Fn=new I0,tg=new U0(Fn),eg=new F0,Js={powder:new mi(ue,{count:900,drag:2.6,additive:!1,colorA:16054783,colorB:12111071,alpha:.55}),sparks:new mi(ue,{count:700,drag:1.6,additive:!0,stretch:!0,bounce:!0,spark:!0,colorA:16773312,colorB:16738832,alpha:.95}),bloodMist:new mi(ue,{count:420,drag:2.4,additive:!1,bounce:!0,colorA:10099236,colorB:3934736,alpha:.9}),debris:new mi(ue,{count:420,drag:1.8,additive:!1,bounce:!0,colorA:8018488,colorB:3811864,alpha:.9}),chips:new mi(ue,{count:380,drag:1.6,additive:!0,bounce:!0,colorA:14218492,colorB:5220568,alpha:.9}),shards:new mi(ue,{count:300,drag:1.4,additive:!0,bounce:!0,colorA:16769200,colorB:9484504,alpha:.85}),smoke:new mi(ue,{count:300,drag:1.1,additive:!1,colorA:10134706,colorB:5923954,alpha:.22}),fire:new mi(ue,{count:520,drag:2,additive:!0,colorA:16771248,colorB:16734744,alpha:.9}),motes:new mi(ue,{count:500,drag:.2,additive:!0,wrap:!0,wrapSize:36,colorA:13625588,colorB:9417944,alpha:.3})},ig=new c0(ue),Za=new u0(ue),ng=new d0(ue,36,{}),sg=s0(ue,sc.floods,Js.motes),qs=new x0,Qa=new S0(Nn.camera,Qs,Zs,Fn),rg=new P0(ue,{}),ag=new m0(Js,Za,Zs,Fn),He=new $0({gfx:Nn,world:Zs,input:Qs,time:Q0,hud:eg,audio:Fn,music:tg,controller:Qa,vm:qs,fields:Js,tracers:ig,decals:Za,shells:ng,lighting:sc,volumetric:sg,debug:J0,ragdolls:rg,impacts:ag}),rc=new w0(Qs,Qa,qs,Fn,He);He.weapon=rc;Qa.weapon=rc;const og=new p0(ue,Js,Za,Fn,He),lg=new D0(He);He.explosions=og;He.waves=lg;Nn.attachWorld(ue,qs.scene,qs.camera);const ac=O0(n=>{ac.hide(),He.start(n)});ac.bind();Qs.onPointerLockLost=()=>{(He.state==="playing"||He.state==="break")&&He.pause()};Nn.renderer.domElement.addEventListener("click",()=>{He.state==="paused"&&He.resume()});window.addEventListener("error",n=>console.warn("runtime error:",n.message));let _l=performance.now();function oc(n){const t=Math.min((n-_l)/1e3,.1);_l=n,He.frame(t),requestAnimationFrame(oc)}requestAnimationFrame(oc);
