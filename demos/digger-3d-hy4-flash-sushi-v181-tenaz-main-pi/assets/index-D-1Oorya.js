(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const se=1,Ie=15,Xe=10,fl=3.2,an=13723362,un={emerald:25,emeraldChain:250,chainBase:250,goldBag:500,enemy:250,projectileKill:250,bagCrush:250,cherry:1e3,bonusKill:200,extraLife:2e4},Mt=.45,Es=Object.freeze({col:13,row:1}),xc=Object.freeze([{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}]);const Mo="187",Nu=0,dl=1,Uu=2,fr=1,Fu=2,fs=3,di=0,nn=1,yn=2,fi=0,ps=1,Ta=2,pl=3,ml=4,Ou=5,Fi=100,Bu=101,zu=102,Gu=103,ku=104,Hu=200,Vu=201,Wu=202,Xu=203,Sc=204,Mc=205,qu=206,$u=207,Yu=208,Ku=209,Zu=210,Ju=211,Qu=212,ju=213,eh=214,Aa=0,Ra=1,Ca=2,bs=3,Pa=4,La=5,Da=6,Ia=7,yc=0,th=1,nh=2,Gn=0,yo=1,Eo=2,bo=3,wo=4,To=5,Ao=6,Ro=7,Ec=300,ki=301,ws=302,$r=303,Yr=304,Na=1e3,zn=1001,Ua=1002,Ft=1003,ih=1004,Fs=1005,Jt=1006,Kr=1007,Qn=1008,fn=1009,bc=1010,wc=1011,Ts=1012,Co=1013,Dn=1014,bn=1015,sn=1016,Po=1017,Lo=1018,Hi=1020,Tc=35902,Ac=35899,Rc=1021,Cc=1022,Ln=1023,ni=1026,jn=1027,Do=1028,Io=1029,pi=1030,No=1031,Uo=1033,dr=33776,pr=33777,mr=33778,gr=33779,Fa=35840,Oa=35841,Ba=35842,za=35843,Ga=36196,ka=37492,Ha=37496,Va=37488,Wa=37489,Ar=37490,Xa=37491,qa=37808,$a=37809,Ya=37810,Ka=37811,Za=37812,Ja=37813,Qa=37814,ja=37815,eo=37816,to=37817,no=37818,io=37819,so=37820,ro=37821,ao=36492,oo=36494,lo=36495,co=36283,uo=36284,Rr=36285,ho=36286,sh=3200,fo=0,rh=1,Jn="",hn="srgb",Cr="srgb-linear",Pr="linear",rt="srgb",Zr=7680,ah=519,oh=512,lh=513,ch=514,Pc=515,uh=516,hh=517,Lc=518,Dc=519,fh=35044,ns=35048,gl="300 es",wn=2e3,As=2001;function dh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ph(){const i=Lr("canvas");return i.style.display="block",i}const _l={};function vl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ic(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Fe(...i){i=Ic(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function nt(...i){i=Ic(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function _r(...i){const e=i.join(" ");e in _l||(_l[e]=!0,Fe(...i))}function mh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const gh={[Aa]:Aa,[Ca]:Da,[Pa]:Pa,[bs]:La,[Ra]:Ra,[Da]:Ca,[Ia]:Ia,[La]:bs};class gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let xl=1234567;const ms=Math.PI/180,Rs=180/Math.PI;function $i(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Fo(i,e){return(i%e+e)%e}function _h(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function vh(i,e,t){return i!==e?(t-i)/(e-i):0}function gs(i,e,t){return(1-t)*i+t*e}function xh(i,e,t,n){return gs(i,e,1-Math.exp(-t*n))}function Sh(i,e=1){return e-Math.abs(Fo(i,e*2)-e)}function Mh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function yh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Eh(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bh(i,e){return i+Math.random()*(e-i)}function wh(i){return i*(.5-Math.random())}function Th(i){i!==void 0&&(xl=i);let e=xl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ah(i){return i*ms}function Rh(i){return i*Rs}function Ch(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Ph(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Nc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Lh(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),d=a((e+n)/2),h=r((e-n)/2),u=a((e-n)/2),m=r((n-e)/2),f=a((n-e)/2);switch(s){case"XYX":i.set(o*d,l*h,l*u,o*c);break;case"YZY":i.set(l*u,o*d,l*h,o*c);break;case"ZXZ":i.set(l*h,l*u,o*d,o*c);break;case"XZX":i.set(o*d,l*f,l*m,o*c);break;case"YXY":i.set(l*m,o*d,l*f,o*c);break;case"ZYZ":i.set(l*f,l*m,o*d,o*c);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Oo(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Uc(i,e){if(e.constructor===Float32Array)return i;const t=Oo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Fc(i,e){if(e.constructor===Float32Array)return i;const t=Oo(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Os={DEG2RAD:ms,RAD2DEG:Rs,generateUUID:$i,clamp:Ze,euclideanModulo:Fo,mapLinear:_h,inverseLerp:vh,lerp:gs,damp:xh,pingpong:Sh,smoothstep:Mh,smootherstep:yh,randInt:Eh,randFloat:bh,randFloatSpread:wh,seededRandom:Th,degToRad:Ah,radToDeg:Rh,isPowerOfTwo:Ch,ceilPowerOfTwo:Ph,floorPowerOfTwo:Nc,setQuaternionFromProperEuler:Lh,normalize:Fc,denormalize:Uc};class Oe{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3],u=r[a+0],m=r[a+1],f=r[a+2],x=r[a+3];if(h!==x||l!==u||c!==m||d!==f){let v=l*u+c*m+d*f+h*x;v<0&&(u=-u,m=-m,f=-f,x=-x,v=-v);let _=1-o;if(v<.9995){const M=Math.acos(v),A=Math.sin(M);_=Math.sin(_*M)/A,o=Math.sin(o*M)/A,l=l*_+u*o,c=c*_+m*o,d=d*_+f*o,h=h*_+x*o}else{l=l*_+u*o,c=c*_+m*o,d=d*_+f*o,h=h*_+x*o;const M=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=M,c*=M,d*=M,h*=M}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],d=n[s+3],h=r[a],u=r[a+1],m=r[a+2],f=r[a+3];return e[t]=o*f+d*h+l*m-c*u,e[t+1]=l*f+d*u+c*h-o*m,e[t+2]=c*f+d*m+o*u-l*h,e[t+3]=d*f-o*h-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(s/2),h=o(r/2),u=l(n/2),m=l(s/2),f=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*m*f,this._y=c*m*h-u*d*f,this._z=c*d*f+u*m*h,this._w=c*d*h-u*m*f;break;case"YXZ":this._x=u*d*h+c*m*f,this._y=c*m*h-u*d*f,this._z=c*d*f-u*m*h,this._w=c*d*h+u*m*f;break;case"ZXY":this._x=u*d*h-c*m*f,this._y=c*m*h+u*d*f,this._z=c*d*f+u*m*h,this._w=c*d*h-u*m*f;break;case"ZYX":this._x=u*d*h-c*m*f,this._y=c*m*h+u*d*f,this._z=c*d*f-u*m*h,this._w=c*d*h+u*m*f;break;case"YZX":this._x=u*d*h+c*m*f,this._y=c*m*h+u*d*f,this._z=c*d*f-u*m*h,this._w=c*d*h-u*m*f;break;case"XZY":this._x=u*d*h-c*m*f,this._y=c*m*h-u*d*f,this._z=c*d*f+u*m*h,this._w=c*d*h+u*m*f;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=n+o+h;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(d-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-n*c,this._z=r*d+a*c+n*l-s*o,this._w=a*d-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),d=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*d,this.y=n+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jr.copy(this).projectOnVector(e),this.sub(Jr)}reflect(e){return this.sub(Jr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jr=new W,Sl=new Yi;class Ge{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],d=n[4],h=n[7],u=n[2],m=n[5],f=n[8],x=s[0],v=s[3],_=s[6],M=s[1],A=s[4],y=s[7],w=s[2],E=s[5],p=s[8];return r[0]=a*x+o*M+l*w,r[3]=a*v+o*A+l*E,r[6]=a*_+o*y+l*p,r[1]=c*x+d*M+h*w,r[4]=c*v+d*A+h*E,r[7]=c*_+d*y+h*p,r[2]=u*x+m*M+f*w,r[5]=u*v+m*A+f*E,r[8]=u*_+m*y+f*p,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-n*r*d+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,m=c*r-a*l,f=t*h+n*u+s*m;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/f;return e[0]=h*x,e[1]=(s*c-d*n)*x,e[2]=(o*n-s*a)*x,e[3]=u*x,e[4]=(d*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=m*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return _r("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qr.makeScale(e,t)),this}rotate(e){return _r("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qr.makeRotation(-e)),this}translate(e,t){return _r("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qr=new Ge,Ml=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),yl=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dh(){const i={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===rt&&(s.r=kn(s.r),s.g=kn(s.g),s.b=kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(s.r=Bi(s.r),s.g=Bi(s.g),s.b=Bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Jn?Pr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cr]:{primaries:e,whitePoint:n,transfer:Pr,toXYZ:Ml,fromXYZ:yl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Ml,fromXYZ:yl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const Ke=Dh();function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xi;class Ih{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{xi===void 0&&(xi=Lr("canvas")),xi.width=e.width,xi.height=e.height;const s=xi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(kn(t[n]/255)*255):t[n]=kn(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Nh=0;class Bo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jr(s[a].image)):r.push(jr(s[a]))}else r=jr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function jr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ih.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Uh=0;const ea=new W;class Vt extends gi{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=zn,s=zn,r=Jt,a=Qn,o=Ln,l=fn,c=Vt.DEFAULT_ANISOTROPY,d=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=$i(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ec)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Na:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Na:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=Ec;Vt.DEFAULT_ANISOTROPY=1;class bt{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],m=l[5],f=l[9],x=l[2],v=l[6],_=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-x)<.01&&Math.abs(f-v)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+x)<.1&&Math.abs(f+v)<.1&&Math.abs(c+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,y=(m+1)/2,w=(_+1)/2,E=(d+u)/4,p=(h+x)/4,S=(f+v)/4;return A>y&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=E/n,r=p/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=E/s,r=S/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=p/r,s=S/r),this.set(n,s,r,t),this}let M=Math.sqrt((v-f)*(v-f)+(h-x)*(h-x)+(u-d)*(u-d));return Math.abs(M)<.001&&(M=1),this.x=(v-f)/M,this.y=(h-x)/M,this.z=(u-d)/M,this.w=Math.acos((c+m+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fh extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Vt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Bo(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends Fh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Oc extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class ot{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,d,h,u,m,f,x,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,d,h,u,m,f,x,v)}set(e,t,n,s,r,a,o,l,c,d,h,u,m,f,x,v){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=s,_[1]=r,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=d,_[10]=h,_[14]=u,_[3]=m,_[7]=f,_[11]=x,_[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),a=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const u=a*d,m=a*h,f=o*d,x=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=m+f*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=f+m*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*d,m=l*h,f=c*d,x=c*h;t[0]=u+x*o,t[4]=f*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=m*o-f,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*d,m=l*h,f=c*d,x=c*h;t[0]=u-x*o,t[4]=-a*h,t[8]=f+m*o,t[1]=m+f*o,t[5]=a*d,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*d,m=a*h,f=o*d,x=o*h;t[0]=l*d,t[4]=f*c-m,t[8]=u*c+x,t[1]=l*h,t[5]=x*c+u,t[9]=m*c-f,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,m=a*c,f=o*l,x=o*c;t[0]=l*d,t[4]=x-u*h,t[8]=f*h+m,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=m*h+f,t[10]=u-x*h}else if(e.order==="XZY"){const u=a*l,m=a*c,f=o*l,x=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+x,t[5]=a*d,t[9]=m*h-f,t[2]=f*h-m,t[6]=o*d,t[10]=x*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bh,e,zh)}lookAt(e,t,n){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),Xn.crossVectors(n,on),Xn.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),Xn.crossVectors(n,on)),Xn.normalize(),Bs.crossVectors(on,Xn),s[0]=Xn.x,s[4]=Bs.x,s[8]=on.x,s[1]=Xn.y,s[5]=Bs.y,s[9]=on.y,s[2]=Xn.z,s[6]=Bs.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],d=n[1],h=n[5],u=n[9],m=n[13],f=n[2],x=n[6],v=n[10],_=n[14],M=n[3],A=n[7],y=n[11],w=n[15],E=s[0],p=s[4],S=s[8],I=s[12],T=s[1],D=s[5],U=s[9],R=s[13],L=s[2],P=s[6],C=s[10],z=s[14],Y=s[3],q=s[7],te=s[11],oe=s[15];return r[0]=a*E+o*T+l*L+c*Y,r[4]=a*p+o*D+l*P+c*q,r[8]=a*S+o*U+l*C+c*te,r[12]=a*I+o*R+l*z+c*oe,r[1]=d*E+h*T+u*L+m*Y,r[5]=d*p+h*D+u*P+m*q,r[9]=d*S+h*U+u*C+m*te,r[13]=d*I+h*R+u*z+m*oe,r[2]=f*E+x*T+v*L+_*Y,r[6]=f*p+x*D+v*P+_*q,r[10]=f*S+x*U+v*C+_*te,r[14]=f*I+x*R+v*z+_*oe,r[3]=M*E+A*T+y*L+w*Y,r[7]=M*p+A*D+y*P+w*q,r[11]=M*S+A*U+y*C+w*te,r[15]=M*I+A*R+y*z+w*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],m=e[14],f=e[3],x=e[7],v=e[11],_=e[15],M=l*m-c*u,A=o*m-c*h,y=o*u-l*h,w=a*m-c*d,E=a*u-l*d,p=a*h-o*d;return t*(x*M-v*A+_*y)-n*(f*M-v*w+_*E)+s*(f*A-x*w+_*p)-r*(f*y-x*E+v*p)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-n*(r*d-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],m=e[11],f=e[12],x=e[13],v=e[14],_=e[15],M=t*o-n*a,A=t*l-s*a,y=t*c-r*a,w=n*l-s*o,E=n*c-r*o,p=s*c-r*l,S=d*x-h*f,I=d*v-u*f,T=d*_-m*f,D=h*v-u*x,U=h*_-m*x,R=u*_-m*v,L=M*R-A*U+y*D+w*T-E*I+p*S;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return e[0]=(o*R-l*U+c*D)*P,e[1]=(s*U-n*R-r*D)*P,e[2]=(x*p-v*E+_*w)*P,e[3]=(u*E-h*p-m*w)*P,e[4]=(l*T-a*R-c*I)*P,e[5]=(t*R-s*T+r*I)*P,e[6]=(v*y-f*p-_*A)*P,e[7]=(d*p-u*y+m*A)*P,e[8]=(a*U-o*T+c*S)*P,e[9]=(n*T-t*U-r*S)*P,e[10]=(f*E-x*y+_*M)*P,e[11]=(h*y-d*E-m*M)*P,e[12]=(o*I-a*D-l*S)*P,e[13]=(t*D-n*I+s*S)*P,e[14]=(x*A-f*w-v*M)*P,e[15]=(d*w-h*A+u*M)*P,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+n,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,m=r*d,f=r*h,x=a*d,v=a*h,_=o*h,M=l*c,A=l*d,y=l*h,w=n.x,E=n.y,p=n.z;return s[0]=(1-(x+_))*w,s[1]=(m+y)*w,s[2]=(f-A)*w,s[3]=0,s[4]=(m-y)*E,s[5]=(1-(u+_))*E,s[6]=(v+M)*E,s[7]=0,s[8]=(f+A)*p,s[9]=(v-M)*p,s[10]=(1-(u+x))*p,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Si.set(s[0],s[1],s[2]).length();const o=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);const c=1/a,d=1/o,h=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=d,vn.elements[5]*=d,vn.elements[6]*=d,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=wn,l=!1){const c=this.elements,d=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),m=(n+s)/(n-s);let f,x;if(l)f=r/(a-r),x=a*r/(a-r);else if(o===wn)f=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===As)f=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=wn,l=!1){const c=this.elements,d=2/(t-e),h=2/(n-s),u=-(t+e)/(t-e),m=-(n+s)/(n-s);let f,x;if(l)f=1/(a-r),x=a/(a-r);else if(o===wn)f=-2/(a-r),x=-(a+r)/(a-r);else if(o===As)f=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=f,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Si=new W,vn=new ot,Bh=new W(0,0,0),zh=new W(1,1,1),Xn=new W,Bs=new W,on=new W,El=new ot,bl=new Yi;class ii{constructor(e=0,t=0,n=0,s=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bl.setFromEuler(this),this.setFromQuaternion(bl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gh=0;const wl=new W,Mi=new Yi,Nn=new ot,zs=new W,is=new W,kh=new W,Hh=new Yi,Tl=new W(1,0,0),Al=new W(0,1,0),Rl=new W(0,0,1),Cl={type:"added"},Vh={type:"removed"},yi={type:"childadded",child:null},ta={type:"childremoved",child:null};class Nt extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new W,t=new ii,n=new Yi,s=new W(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new Ge}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(Tl,e)}rotateY(e){return this.rotateOnAxis(Al,e)}rotateZ(e){return this.rotateOnAxis(Rl,e)}translateOnAxis(e,t){return wl.copy(e).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Tl,e)}translateY(e){return this.translateOnAxis(Al,e)}translateZ(e){return this.translateOnAxis(Rl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zs.copy(e):zs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(is,zs,this.up):Nn.lookAt(zs,is,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cl),yi.child=e,this.dispatchEvent(yi),yi.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vh),ta.child=e,this.dispatchEvent(ta),ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cl),yi.child=e,this.dispatchEvent(yi),yi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,e,kh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,Hh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),m=a(e.animations),f=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),f.length>0&&(n.nodes=f)}return n.object=s,n;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Nt.DEFAULT_UP=new W(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ct extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wh={type:"move"};class na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ct,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ct,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ct,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const v=t.getJointPose(x,n),_=this._getHandJoint(c,x);v!==null&&(_.matrix.fromArray(v.transform.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=v.radius),_.visible=v!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),m=.02,f=.005;c.inputState.pinching&&u>m+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ct;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qn={h:0,s:0,l:0},Gs={h:0,s:0,l:0};function ia(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=Fo(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ia(a,r,e+1/3),this.g=ia(a,r,e),this.b=ia(a,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){const n=zc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=kn(e.r),this.g=kn(e.g),this.b=kn(e.b),this}copyLinearToSRGB(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Ke.workingToColorSpace(kt.copy(this),e),Math.round(Ze(kt.r*255,0,255))*65536+Math.round(Ze(kt.g*255,0,255))*256+Math.round(Ze(kt.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(kt.copy(this),t);const n=kt.r,s=kt.g,r=kt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=hn){Ke.workingToColorSpace(kt.copy(this),e);const t=kt.r,n=kt.g,s=kt.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(qn),this.setHSL(qn.h+e,qn.s+t,qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qn),e.getHSL(Gs);const n=gs(qn.h,Gs.h,t),s=gs(qn.s,Gs.s,t),r=gs(qn.l,Gs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new ke;ke.NAMES=zc;class zo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ke(e),this.near=t,this.far=n}clone(){return new zo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xh extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xn=new W,Un=new W,sa=new W,Fn=new W,Ei=new W,bi=new W,Pl=new W,ra=new W,aa=new W,oa=new W,la=new bt,ca=new bt,ua=new bt;class En{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){xn.subVectors(s,t),Un.subVectors(n,t),sa.subVectors(e,t);const a=xn.dot(xn),o=xn.dot(Un),l=xn.dot(sa),c=Un.dot(Un),d=Un.dot(sa),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const u=1/h,m=(c*l-o*d)*u,f=(a*d-o*l)*u;return r.set(1-m-f,f,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return la.setScalar(0),ca.setScalar(0),ua.setScalar(0),la.fromBufferAttribute(e,t),ca.fromBufferAttribute(e,n),ua.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(la,r.x),a.addScaledVector(ca,r.y),a.addScaledVector(ua,r.z),a}static isFrontFacing(e,t,n,s){return xn.subVectors(n,t),Un.subVectors(e,t),xn.cross(Un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),xn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return En.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ei.subVectors(s,n),bi.subVectors(r,n),ra.subVectors(e,n);const l=Ei.dot(ra),c=bi.dot(ra);if(l<=0&&c<=0)return t.copy(n);aa.subVectors(e,s);const d=Ei.dot(aa),h=bi.dot(aa);if(d>=0&&h<=d)return t.copy(s);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0&&l-d>0)return a=l/(l-d),t.copy(n).addScaledVector(Ei,a);oa.subVectors(e,r);const m=Ei.dot(oa),f=bi.dot(oa);if(f>=0&&m<=f)return t.copy(r);const x=m*c-l*f;if(x<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(bi,o);const v=d*f-m*h;if(v<=0&&h-d>=0&&m-f>=0)return Pl.subVectors(r,s),o=(h-d)/(h-d+(m-f)),t.copy(s).addScaledVector(Pl,o);const _=1/(v+x+u);return a=x*_,o=u*_,t.copy(n).addScaledVector(Ei,a).addScaledVector(bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _i{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Sn):Sn.fromBufferAttribute(r,a),Sn.applyMatrix4(e.matrixWorld),this.expandByPoint(Sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ks.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ks.copy(n.boundingBox)),ks.applyMatrix4(e.matrixWorld),this.union(ks)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Sn),Sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ss),Hs.subVectors(this.max,ss),wi.subVectors(e.a,ss),Ti.subVectors(e.b,ss),Ai.subVectors(e.c,ss),$n.subVectors(Ti,wi),Yn.subVectors(Ai,Ti),li.subVectors(wi,Ai);let t=[0,-$n.z,$n.y,0,-Yn.z,Yn.y,0,-li.z,li.y,$n.z,0,-$n.x,Yn.z,0,-Yn.x,li.z,0,-li.x,-$n.y,$n.x,0,-Yn.y,Yn.x,0,-li.y,li.x,0];return!ha(t,wi,Ti,Ai,Hs)||(t=[1,0,0,0,1,0,0,0,1],!ha(t,wi,Ti,Ai,Hs))?!1:(Vs.crossVectors($n,Yn),t=[Vs.x,Vs.y,Vs.z],ha(t,wi,Ti,Ai,Hs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(On),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const On=[new W,new W,new W,new W,new W,new W,new W,new W],Sn=new W,ks=new _i,wi=new W,Ti=new W,Ai=new W,$n=new W,Yn=new W,li=new W,ss=new W,Hs=new W,Vs=new W,ci=new W;function ha(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);const o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),l=e.dot(ci),c=t.dot(ci),d=n.dot(ci);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const At=new W,Ws=new Oe;let qh=0;class ti extends gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=fh,this.updateRanges=[],this.gpuType=bn,this.version=0,this._normalizationScale=e!==void 0?Oo(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ws.fromBufferAttribute(this,t),Ws.applyMatrix3(e),this.setXY(t,Ws.x,Ws.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Uc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Fc(e,this.array)}}class Gc extends ti{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kc extends ti{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends ti{constructor(e,t,n){super(new Float32Array(e),t,n)}}const $h=new _i,rs=new W,fa=new W;class Ki{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$h.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rs.subVectors(e,this.center);const t=rs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(rs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rs.copy(e.center).add(fa)),this.expandByPoint(rs.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Yh=0;const mn=new ot,da=new Nt,Ri=new W,ln=new _i,as=new _i,It=new W;class jt extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dh(e)?kc:Gc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return da.lookAt(e),da.updateMatrix(),this.applyMatrix4(da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];as.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(ln.min,as.min),ln.expandByPoint(It),It.addVectors(ln.max,as.max),ln.expandByPoint(It)):(ln.expandByPoint(as.min),ln.expandByPoint(as.max))}ln.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)It.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(It));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)It.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),It.add(Ri)),s=Math.max(s,n.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ti(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new W,l[I]=new W;const d=new W,h=new W,u=new W,m=new Oe,f=new Oe,x=new Oe,v=new W,_=new W;function M(I,T,D){c[I]=c[T]=c[D]=1,d.fromBufferAttribute(n,I),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,D),m.fromBufferAttribute(r,I),f.fromBufferAttribute(r,T),x.fromBufferAttribute(r,D),h.sub(d),u.sub(d),f.sub(m),x.sub(m);const U=1/(f.x*x.y-x.x*f.y);isFinite(U)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(u,-f.y).multiplyScalar(U),_.copy(u).multiplyScalar(f.x).addScaledVector(h,-x.x).multiplyScalar(U),o[I].add(v),o[T].add(v),o[D].add(v),l[I].add(_),l[T].add(_),l[D].add(_))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let I=0,T=A.length;I<T;++I){const D=A[I],U=D.start,R=D.count;for(let L=U,P=U+R;L<P;L+=3)M(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const y=new W,w=new W,E=new W,p=new W;function S(I){E.fromBufferAttribute(s,I),p.copy(E);const T=o[I];y.copy(T),y.sub(E.multiplyScalar(E.dot(T))).normalize(),w.crossVectors(p,T);const U=w.dot(l[I])<0?-1:1;a.setXYZW(I,y.x,y.y,y.z,U)}for(let I=0,T=n.count;I<T;++I)c[I]&&S(I);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ti(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const s=new W,r=new W,a=new W,o=new W,l=new W,c=new W,d=new W,h=new W;if(e)for(let u=0,m=e.count;u<m;u+=3){const f=e.getX(u+0),x=e.getX(u+1),v=e.getX(u+2);s.fromBufferAttribute(t,f),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,v),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),o.add(d),l.add(d),c.add(d),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let u=0,m=t.count;u<m;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let m=0,f=0;for(let x=0,v=l.length;x<v;x++){o.isInterleavedBufferAttribute?m=l[x]*o.data.stride+o.offset:m=l[x]*d;for(let _=0;_<d;_++)u[f++]=c[m++]}return new ti(u,d,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],m=e(u,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const m=c[h];d.push(m.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let u=0,m=h.length;u<m;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pa=new W,Kh=new W,Zh=new Ge;class Zn{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=pa.subVectors(n,t).cross(Kh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(pa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zh.getNormalMatrix(e),s=this.coplanarPoint(pa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Jh=0;class Zi extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=ps,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sc,this.blendDst=Mc,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ke(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zr,this.stencilZFail=Zr,this.stencilZPass=Zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Zn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Bn=new W,ma=new W,Xs=new W,qs=new W;class Hc{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ma.copy(e).add(t).multiplyScalar(.5),Xs.copy(t).sub(e).normalize(),qs.copy(this.origin).sub(ma);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Xs),o=qs.dot(this.direction),l=-qs.dot(Xs),c=qs.lengthSq(),d=Math.abs(1-a*a);let h,u,m,f;if(d>0)if(h=a*l-o,u=a*o-l,f=r*d,h>=0)if(u>=-f)if(u<=f){const x=1/d;h*=x,u*=x,m=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*l)+c;else u<=-f?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+u*(u+2*l)+c):u<=f?(h=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),m=-h*h+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ma).addScaledVector(Xs,u),m}intersectSphere(e,t){if(e.radius<0)return null;Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,h=e.x-a.x,u=e.y-a.y,m=e.z-a.z,f=t.x-a.x,x=t.y-a.y,v=t.z-a.z,_=n.x-a.x,M=n.y-a.y,A=n.z-a.z,y=Math.abs(l),w=Math.abs(c),E=Math.abs(d);let p,S,I,T,D,U,R,L,P,C,z,Y;if(y>=w&&y>=E?(I=l,U=h,P=f,Y=_,l>=0?(p=c,S=d,T=u,D=m,R=x,L=v,C=M,z=A):(p=d,S=c,T=m,D=u,R=v,L=x,C=A,z=M)):w>=E?(I=c,U=u,P=x,Y=M,c>=0?(p=d,S=l,T=m,D=h,R=v,L=f,C=A,z=_):(p=l,S=d,T=h,D=m,R=f,L=v,C=_,z=A)):(I=d,U=m,P=v,Y=A,d>=0?(p=l,S=c,T=h,D=u,R=f,L=x,C=_,z=M):(p=c,S=l,T=u,D=h,R=x,L=f,C=M,z=_)),I===0)return null;const q=p/I,te=S/I,oe=1/I,_e=T-q*U,Re=D-te*U,ie=R-q*P,B=L-te*P,ee=C-q*Y,Me=z-te*Y,ce=ee*B-Me*ie,Ce=_e*Me-Re*ee,st=ie*Re-B*_e;if(s){if(ce<0||Ce<0||st<0)return null}else if((ce<0||Ce<0||st<0)&&(ce>0||Ce>0||st>0))return null;const Ae=ce+Ce+st;if(Ae===0)return null;const Je=oe*(ce*U+Ce*P+st*Y);return(Ae>0?Je<0:Je>0)?null:this.at(Je/Ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt extends Zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ll=new ot,ui=new Hc,$s=new Ki,Dl=new W,Ys=new W,Ks=new W,Zs=new W,ga=new W,Js=new W,Il=new W,Qs=new W;class Ne extends Nt{constructor(e=new jt,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(ga.fromBufferAttribute(h,e),a?Js.addScaledVector(ga,d):Js.addScaledVector(ga.sub(t),d))}t.add(Js)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere),$s.applyMatrix4(r),ui.copy(e.ray).recast(e.near),!($s.containsPoint(ui.origin)===!1&&(ui.intersectSphere($s,Dl)===null||ui.origin.distanceToSquared(Dl)>(e.far-e.near)**2))&&(Ll.copy(r).invert(),ui.copy(e.ray).applyMatrix4(Ll),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ui)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let f=0,x=u.length;f<x;f++){const v=u[f],_=a[v.materialIndex],M=Math.max(v.start,m.start),A=Math.min(o.count,Math.min(v.start+v.count,m.start+m.count));for(let y=M,w=A;y<w;y+=3){const E=o.getX(y),p=o.getX(y+1),S=o.getX(y+2);s=js(this,_,e,n,c,d,h,E,p,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{const f=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let v=f,_=x;v<_;v+=3){const M=o.getX(v),A=o.getX(v+1),y=o.getX(v+2);s=js(this,a,e,n,c,d,h,M,A,y),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let f=0,x=u.length;f<x;f++){const v=u[f],_=a[v.materialIndex],M=Math.max(v.start,m.start),A=Math.min(l.count,Math.min(v.start+v.count,m.start+m.count));for(let y=M,w=A;y<w;y+=3){const E=y,p=y+1,S=y+2;s=js(this,_,e,n,c,d,h,E,p,S),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=v.materialIndex,t.push(s))}}else{const f=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let v=f,_=x;v<_;v+=3){const M=v,A=v+1,y=v+2;s=js(this,a,e,n,c,d,h,M,A,y),s&&(s.faceIndex=Math.floor(v/3),t.push(s))}}}}function Qh(i,e,t,n,s,r,a,o){let l;if(e.side===nn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===di,o),l===null)return null;Qs.copy(o),Qs.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Qs);return c<t.near||c>t.far?null:{distance:c,point:Qs.clone(),object:i}}function js(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Ys),i.getVertexPosition(l,Ks),i.getVertexPosition(c,Zs);const d=Qh(i,e,t,n,Ys,Ks,Zs,Il);if(d){const h=new W;En.getBarycoord(Il,Ys,Ks,Zs,h),s&&(d.uv=En.getInterpolatedAttribute(s,o,l,c,h,new Oe)),r&&(d.uv1=En.getInterpolatedAttribute(r,o,l,c,h,new Oe)),a&&(d.normal=En.getInterpolatedAttribute(a,o,l,c,h,new W),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new W,materialIndex:0};En.getNormal(Ys,Ks,Zs,u.normal),d.face=u,d.barycoord=h}return d}class Vc extends Vt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Ft,d=Ft,h,u){super(null,a,o,l,c,d,s,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nl extends ti{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ci=new ot,Ul=new ot,er=[],Fl=new _i,jh=new ot,os=new Ne,ls=new Ki;class Pi extends Ne{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new _i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),Fl.copy(e.boundingBox).applyMatrix4(Ci),this.boundingBox.union(Fl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),ls.copy(e.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ls)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ls.copy(this.boundingSphere),ls.applyMatrix4(n),e.ray.intersectsSphere(ls)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ci),Ul.multiplyMatrices(n,Ci),os.matrixWorld=Ul,os.raycast(e,er);for(let a=0,o=er.length;a<o;a++){const l=er[a];l.instanceId=r,l.object=this,t.push(l)}er.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Nl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vc(new Float32Array(s*this.count),s,this.count,Do,bn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const hi=new Ki,ef=new Oe(.5,.5),tr=new W;class Cs{constructor(e=new Zn,t=new Zn,n=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],m=r[7],f=r[8],x=r[9],v=r[10],_=r[11],M=r[12],A=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-a,m-d,_-f,w-M).normalize(),s[1].setComponents(c+a,m+d,_+f,w+M).normalize(),s[2].setComponents(c+o,m+h,_+x,w+A).normalize(),s[3].setComponents(c-o,m-h,_-x,w-A).normalize(),n)s[4].setComponents(l,u,v,y).normalize(),s[5].setComponents(c-l,m-u,_-v,w-y).normalize();else if(s[4].setComponents(c-l,m-u,_-v,w-y).normalize(),t===wn)s[5].setComponents(c+l,m+u,_+v,w+y).normalize();else if(t===As)s[5].setComponents(l,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(e){hi.center.set(0,0,0);const t=ef.distanceTo(e.center);return hi.radius=.7071067811865476+t,hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(tr.x=s.normal.x>0?e.max.x:e.min.x,tr.y=s.normal.y>0?e.max.y:e.min.y,tr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Ol=new ot;class Go{constructor(){this.coordinateSystem=wn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];Ol.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Cs),n[s].setFromProjectionMatrix(Ol,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Cs),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new Go().copy(this)}}class vr extends Zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dr=new W,Ir=new W,Bl=new ot,cs=new Hc,nr=new Ki,_a=new W,zl=new W;class va extends Nt{constructor(e=new jt,t=new vr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Dr.fromBufferAttribute(t,s-1),Ir.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Dr.distanceTo(Ir);e.setAttribute("lineDistance",new gt(n,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(s),nr.radius+=r,e.ray.intersectsSphere(nr)===!1)return;Bl.copy(s).invert(),cs.copy(e.ray).applyMatrix4(Bl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,u=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let x=m,v=f-1;x<v;x+=c){const _=d.getX(x),M=d.getX(x+1),A=ir(this,e,cs,l,_,M,x);A&&t.push(A)}if(this.isLineLoop){const x=d.getX(f-1),v=d.getX(m),_=ir(this,e,cs,l,x,v,f-1);_&&t.push(_)}}else{const m=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let x=m,v=f-1;x<v;x+=c){const _=ir(this,e,cs,l,x,x+1,x);_&&t.push(_)}if(this.isLineLoop){const x=ir(this,e,cs,l,f-1,m,f-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ir(i,e,t,n,s,r,a){const o=i.geometry.attributes.position;if(Dr.fromBufferAttribute(o,s),Ir.fromBufferAttribute(o,r),t.distanceSqToSegment(Dr,Ir,_a,zl)>n)return;_a.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_a);if(!(c<e.near||c>e.far))return{distance:c,point:zl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Wc extends Vt{constructor(e=[],t=ki,n,s,r,a,o,l,c,d){super(e,t,n,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tf extends Vt{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vi extends Vt{constructor(e,t,n=Dn,s,r,a,o=Ft,l=Ft,c,d=ni,h=1){if(d!==ni&&d!==jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,s,r,a,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Xc extends Vi{constructor(e,t=Dn,n=ki,s,r,a=Ft,o=Ft,l,c=ni){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,n,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class qc extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class St extends jt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],d=[],h=[];let u=0,m=0;f("z","y","x",-1,-1,n,t,e,a,r,0),f("z","y","x",1,-1,n,t,-e,a,r,1),f("x","z","y",1,1,e,n,t,s,a,2),f("x","z","y",1,-1,e,n,-t,s,a,3),f("x","y","z",1,-1,e,t,n,s,r,4),f("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(h,2));function f(x,v,_,M,A,y,w,E,p,S,I){const T=y/p,D=w/S,U=y/2,R=w/2,L=E/2,P=p+1,C=S+1;let z=0,Y=0;const q=new W;for(let te=0;te<C;te++){const oe=te*D-R;for(let _e=0;_e<P;_e++){const Re=_e*T-U;q[x]=Re*M,q[v]=oe*A,q[_]=L,c.push(q.x,q.y,q.z),q[x]=0,q[v]=0,q[_]=E>0?1:-1,d.push(q.x,q.y,q.z),h.push(_e/p),h.push(1-te/S),z+=1}}for(let te=0;te<S;te++)for(let oe=0;oe<p;oe++){const _e=u+oe+P*te,Re=u+oe+P*(te+1),ie=u+(oe+1)+P*(te+1),B=u+(oe+1)+P*te;l.push(_e,Re,B),l.push(Re,ie,B),Y+=6}o.addGroup(m,Y,I),m+=Y,u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new St(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class mi extends jt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],u=[],m=[];let f=0;const x=[],v=n/2;let _=0;M(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(d),this.setAttribute("position",new gt(h,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(m,2));function M(){const y=new W,w=new W;let E=0;const p=(t-e)/n;for(let S=0;S<=r;S++){const I=[],T=S/r,D=T*(t-e)+e;for(let U=0;U<=s;U++){const R=U/s,L=R*l+o,P=Math.sin(L),C=Math.cos(L);w.x=D*P,w.y=-T*n+v,w.z=D*C,h.push(w.x,w.y,w.z),y.set(P,p,C).normalize(),u.push(y.x,y.y,y.z),m.push(R,1-T),I.push(f++)}x.push(I)}for(let S=0;S<s;S++)for(let I=0;I<r;I++){const T=x[I][S],D=x[I+1][S],U=x[I+1][S+1],R=x[I][S+1];(e>0||I!==0)&&(d.push(T,D,R),E+=3),(t>0||I!==r-1)&&(d.push(D,U,R),E+=3)}c.addGroup(_,E,0),_+=E}function A(y){const w=f,E=new Oe,p=new W;let S=0;const I=y===!0?e:t,T=y===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,v*T,0),u.push(0,T,0),m.push(.5,.5),f++;const D=f;for(let U=0;U<=s;U++){const L=U/s*l+o,P=Math.cos(L),C=Math.sin(L);p.x=I*C,p.y=v*T,p.z=I*P,h.push(p.x,p.y,p.z),u.push(0,T,0),E.x=P*.5+.5,E.y=C*.5*T+.5,m.push(E.x,E.y),f++}for(let U=0;U<s;U++){const R=w+U,L=D+U;y===!0?d.push(L,L+1,R):d.push(L+1,L,R),S+=3}c.addGroup(_,S,y===!0?1:2),_+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends mi{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class zr extends jt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),d(),this.setAttribute("position",new gt(r,3)),this.setAttribute("normal",new gt(r.slice(),3)),this.setAttribute("uv",new gt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const A=new W,y=new W,w=new W;for(let E=0;E<t.length;E+=3)m(t[E+0],A),m(t[E+1],y),m(t[E+2],w),l(A,y,w,M)}function l(M,A,y,w){const E=w+1,p=[];for(let S=0;S<=E;S++){p[S]=[];const I=M.clone().lerp(y,S/E),T=A.clone().lerp(y,S/E),D=E-S;for(let U=0;U<=D;U++)U===0&&S===E?p[S][U]=I:p[S][U]=I.clone().lerp(T,U/D)}for(let S=0;S<E;S++)for(let I=0;I<2*(E-S)-1;I++){const T=Math.floor(I/2);I%2===0?(u(p[S][T+1]),u(p[S+1][T]),u(p[S][T])):(u(p[S][T+1]),u(p[S+1][T+1]),u(p[S+1][T]))}}function c(M){const A=new W;for(let y=0;y<r.length;y+=3)A.x=r[y+0],A.y=r[y+1],A.z=r[y+2],A.normalize().multiplyScalar(M),r[y+0]=A.x,r[y+1]=A.y,r[y+2]=A.z}function d(){const M=new W;for(let A=0;A<r.length;A+=3){M.x=r[A+0],M.y=r[A+1],M.z=r[A+2];const y=v(M)/2/Math.PI+.5,w=_(M)/Math.PI+.5;a.push(y,1-w)}f(),h()}function h(){for(let M=0;M<a.length;M+=6){const A=a[M+0],y=a[M+2],w=a[M+4],E=Math.max(A,y,w),p=Math.min(A,y,w);E>.9&&p<.1&&(A<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function m(M,A){const y=M*3;A.x=e[y+0],A.y=e[y+1],A.z=e[y+2]}function f(){const M=new W,A=new W,y=new W,w=new W,E=new Oe,p=new Oe,S=new Oe;for(let I=0,T=0;I<r.length;I+=9,T+=6){M.set(r[I+0],r[I+1],r[I+2]),A.set(r[I+3],r[I+4],r[I+5]),y.set(r[I+6],r[I+7],r[I+8]),E.set(a[T+0],a[T+1]),p.set(a[T+2],a[T+3]),S.set(a[T+4],a[T+5]),w.copy(M).add(A).add(y).divideScalar(3);const D=v(w);x(E,T+0,M,D),x(p,T+2,A,D),x(S,T+4,y,D)}}function x(M,A,y,w){w<0&&M.x===1&&(a[A]=M.x-1),y.x===0&&y.z===0&&(a[A]=w/2/Math.PI+.5)}function v(M){return Math.atan2(M.z,-M.x)}function _(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.vertices,e.indices,e.radius,e.detail)}}class Ps extends zr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ps(e.radius,e.detail)}}class Ji extends zr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ji(e.radius,e.detail)}}class Qi extends jt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,d=l+1,h=e/o,u=t/l,m=[],f=[],x=[],v=[];for(let _=0;_<d;_++){const M=_*u-a;for(let A=0;A<c;A++){const y=A*h-r;f.push(y,-M,0),x.push(0,0,1),v.push(A/o),v.push(1-_/l)}}for(let _=0;_<l;_++)for(let M=0;M<o;M++){const A=M+c*_,y=M+c*(_+1),w=M+1+c*(_+1),E=M+1+c*_;m.push(A,y,E),m.push(y,w,E)}this.setIndex(m),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class ko extends jt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let h=e;const u=(t-e)/s,m=new W,f=new Oe;for(let x=0;x<=s;x++){for(let v=0;v<=n;v++){const _=r+v/n*a;m.x=h*Math.cos(_),m.y=h*Math.sin(_),l.push(m.x,m.y,m.z),c.push(0,0,1),f.x=(m.x/t+1)/2,f.y=(m.y/t+1)/2,d.push(f.x,f.y)}h+=u}for(let x=0;x<s;x++){const v=x*(n+1);for(let _=0;_<n;_++){const M=_+v,A=M,y=M+n+1,w=M+n+2,E=M+1;o.push(A,y,E),o.push(y,w,E)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ko(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pn extends jt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const d=[],h=new W,u=new W,m=[],f=[],x=[],v=[];for(let _=0;_<=n;_++){const M=[],A=_/n,y=a+A*o,w=e*Math.cos(y),E=Math.sqrt(e*e-w*w);let p=0;_===0&&a===0?p=.5/t:_===n&&l===Math.PI&&(p=-.5/t);for(let S=0;S<=t;S++){const I=S/t,T=s+I*r;h.x=-E*Math.cos(T),h.y=w,h.z=E*Math.sin(T),f.push(h.x,h.y,h.z),u.copy(h).normalize(),x.push(u.x,u.y,u.z),v.push(I+p,1-A),M.push(c++)}d.push(M)}for(let _=0;_<n;_++)for(let M=0;M<t;M++){const A=d[_][M+1],y=d[_][M],w=d[_+1][M],E=d[_+1][M+1];(_!==0||a>0)&&m.push(A,y,E),(_!==n-1||l<Math.PI)&&m.push(y,w,E)}this.setIndex(m),this.setAttribute("position",new gt(f,3)),this.setAttribute("normal",new gt(x,3)),this.setAttribute("uv",new gt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Wi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Gl(s))s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Gl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Kt(i){const e={};for(let t=0;t<i.length;t++){const n=Wi(i[t]);for(const s in n)e[s]=n[s]}return e}function Gl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function nf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $c(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const Ls={clone:Wi,merge:Kt};var sf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends Zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sf,this.fragmentShader=rf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wi(e.uniforms),this.uniformsGroups=nf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new ke().setHex(s.value);break;case"v2":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new W().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ot().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Yc extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xt extends Zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fo,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class af extends Zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class of extends Zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ho extends Nt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const xa=new ot,kl=new W,Hl=new W;class Kc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cs,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;kl.setFromMatrixPosition(e.matrixWorld),t.position.copy(kl),Hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hl),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(xa,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===As||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sr=new W,rr=new Yi,An=new W;class Zc extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(sr,rr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(sr,rr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(sr,rr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new W,Vl=new Oe,Wl=new Oe;class gn extends Zc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z)}getViewSize(e,t){return this.getViewBounds(e,Vl,Wl),t.subVectors(Wl,Vl)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ms*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lf extends Kc{constructor(){super(new gn(90,1,.5,500)),this.isPointLightShadow=!0}}class _s extends Ho{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Vo extends Zc{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cf extends Kc{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xl extends Ho{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new cf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class uf extends Ho{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Li=-90,Di=1;class po extends Nt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(Li,Di,e,t);s.layers=this.layers,this.add(s);const r=new gn(Li,Di,e,t);r.layers=this.layers,this.add(r);const a=new gn(Li,Di,e,t);a.layers=this.layers,this.add(a);const o=new gn(Li,Di,e,t);o.layers=this.layers,this.add(o);const l=new gn(Li,Di,e,t);l.layers=this.layers,this.add(l);const c=new gn(Li,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===As)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,s),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,m),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class hf extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class ff{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=df.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function df(){this._document.hidden===!1&&this.reset()}function ql(i,e,t,n){const s=pf(n);switch(t){case Rc:return i*e;case Do:return i*e/s.components*s.byteLength;case Io:return i*e/s.components*s.byteLength;case pi:return i*e*2/s.components*s.byteLength;case No:return i*e*2/s.components*s.byteLength;case Cc:return i*e*3/s.components*s.byteLength;case Ln:return i*e*4/s.components*s.byteLength;case Uo:return i*e*4/s.components*s.byteLength;case dr:case pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case za:return Math.max(i,16)*Math.max(e,8)/4;case Fa:case Ba:return Math.max(i,8)*Math.max(e,8)/2;case Ga:case ka:case Va:case Wa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ha:case Ar:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $a:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case eo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case no:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case io:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case so:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ro:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ao:case oo:case lo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case co:case uo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Rr:case ho:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pf(i){switch(i){case fn:case bc:return{byteLength:1,components:1};case Ts:case wc:case sn:return{byteLength:2,components:1};case Po:case Lo:return{byteLength:2,components:4};case Dn:case Co:case bn:return{byteLength:4,components:1};case Tc:case Ac:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mo}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mo);function Jc(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function mf(i){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const d=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,d);else{h.sort((m,f)=>m.start-f.start);let u=0;for(let m=1;m<h.length;m++){const f=h[u],x=h[m];x.start<=f.start+f.count+1?f.count=Math.max(f.count,x.start+x.count-f.start):(++u,h[u]=x)}h.length=u+1;for(let m=0,f=h.length;m<f;m++){const x=h[m];i.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var gf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_f=`#ifdef USE_ALPHAHASH
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
#endif`,vf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yf=`#ifdef USE_AOMAP
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
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bf=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,wf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cf=`#ifdef USE_IRIDESCENCE
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
#endif`,Pf=`#ifdef USE_BUMPMAP
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
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zf=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Gf=`vec3 transformedNormal = objectNormal;
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
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xf="gl_FragColor = linearToOutputTexel( gl_FragColor );",qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$f=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nd=`#ifdef USE_GRADIENTMAP
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
}`,id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ad=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,od=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,ld=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,dd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pd=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,md=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_d=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,vd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Md=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wd=`#if defined( USE_POINTS_UV )
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
#endif`,Td=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ad=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cd=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`#ifdef USE_MORPHTARGETS
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
#endif`,Dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bd=`#ifdef USE_NORMALMAP
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
#endif`,zd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$d=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,np=`#ifdef USE_SKINNING
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
#endif`,ip=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sp=`#ifdef USE_SKINNING
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
#endif`,rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,op=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cp=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,up=`#ifdef USE_TRANSMISSION
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,pp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gp=`uniform sampler2D t2D;
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`#include <common>
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
}`,yp=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ep=`#define DISTANCE
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
}`,bp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`uniform float scale;
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
}`,Rp=`uniform vec3 diffuse;
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
}`,Cp=`#include <common>
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
}`,Pp=`uniform vec3 diffuse;
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
}`,Lp=`#define LAMBERT
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
}`,Dp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Ip=`#define MATCAP
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
}`,Np=`#define MATCAP
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
}`,Up=`#define NORMAL
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
}`,Fp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Op=`#define PHONG
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
}`,Bp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,zp=`#define STANDARD
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
}`,Gp=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,kp=`#define TOON
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
}`,Hp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,Vp=`uniform float size;
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
}`,Wp=`uniform vec3 diffuse;
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
}`,Xp=`#include <common>
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
}`,qp=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,$p=`uniform float rotation;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:gf,alphahash_pars_fragment:_f,alphamap_fragment:vf,alphamap_pars_fragment:xf,alphatest_fragment:Sf,alphatest_pars_fragment:Mf,aomap_fragment:yf,aomap_pars_fragment:Ef,batching_pars_vertex:bf,batching_vertex:wf,begin_vertex:Tf,beginnormal_vertex:Af,bsdfs:Rf,iridescence_fragment:Cf,bumpmap_pars_fragment:Pf,clipping_planes_fragment:Lf,clipping_planes_pars_fragment:Df,clipping_planes_pars_vertex:If,clipping_planes_vertex:Nf,color_fragment:Uf,color_pars_fragment:Ff,color_pars_vertex:Of,color_vertex:Bf,common:zf,defaultnormal_vertex:Gf,displacementmap_pars_vertex:kf,displacementmap_vertex:Hf,emissivemap_fragment:Vf,emissivemap_pars_fragment:Wf,colorspace_fragment:Xf,colorspace_pars_fragment:qf,envmap_fragment:$f,envmap_common_pars_fragment:Yf,envmap_pars_fragment:Kf,envmap_pars_vertex:Zf,envmap_physical_pars_fragment:od,envmap_vertex:Jf,fog_vertex:Qf,fog_pars_vertex:jf,fog_fragment:ed,fog_pars_fragment:td,gradientmap_pars_fragment:nd,lightmap_pars_fragment:id,lights_lambert_fragment:sd,lights_lambert_pars_fragment:rd,lights_pars_begin:ad,lights_toon_fragment:ld,lights_toon_pars_fragment:cd,lights_phong_fragment:ud,lights_phong_pars_fragment:hd,lights_physical_fragment:fd,lights_physical_pars_fragment:dd,lights_fragment_begin:pd,lights_fragment_maps:md,lights_fragment_end:gd,lightprobes_pars_fragment:_d,logdepthbuf_fragment:vd,logdepthbuf_pars_fragment:xd,logdepthbuf_pars_vertex:Sd,logdepthbuf_vertex:Md,map_fragment:yd,map_pars_fragment:Ed,map_particle_fragment:bd,map_particle_pars_fragment:wd,metalnessmap_fragment:Td,metalnessmap_pars_fragment:Ad,morphinstance_vertex:Rd,morphcolor_vertex:Cd,morphnormal_vertex:Pd,morphtarget_pars_vertex:Ld,morphtarget_vertex:Dd,normal_fragment_begin:Id,normal_fragment_maps:Nd,normal_pars_fragment:Ud,normal_pars_vertex:Fd,normal_vertex:Od,normalmap_pars_fragment:Bd,clearcoat_normal_fragment_begin:zd,clearcoat_normal_fragment_maps:Gd,clearcoat_pars_fragment:kd,iridescence_pars_fragment:Hd,opaque_fragment:Vd,packing:Wd,premultiplied_alpha_fragment:Xd,project_vertex:qd,dithering_fragment:$d,dithering_pars_fragment:Yd,roughnessmap_fragment:Kd,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Jd,shadowmap_pars_vertex:Qd,shadowmap_vertex:jd,shadowmask_pars_fragment:ep,skinbase_vertex:tp,skinning_pars_vertex:np,skinning_vertex:ip,skinnormal_vertex:sp,specularmap_fragment:rp,specularmap_pars_fragment:ap,tonemapping_fragment:op,tonemapping_pars_fragment:lp,transmission_fragment:cp,transmission_pars_fragment:up,uv_pars_fragment:hp,uv_pars_vertex:fp,uv_vertex:dp,worldpos_vertex:pp,background_vert:mp,background_frag:gp,backgroundCube_vert:_p,backgroundCube_frag:vp,cube_vert:xp,cube_frag:Sp,depth_vert:Mp,depth_frag:yp,distance_vert:Ep,distance_frag:bp,equirect_vert:wp,equirect_frag:Tp,linedashed_vert:Ap,linedashed_frag:Rp,meshbasic_vert:Cp,meshbasic_frag:Pp,meshlambert_vert:Lp,meshlambert_frag:Dp,meshmatcap_vert:Ip,meshmatcap_frag:Np,meshnormal_vert:Up,meshnormal_frag:Fp,meshphong_vert:Op,meshphong_frag:Bp,meshphysical_vert:zp,meshphysical_frag:Gp,meshtoon_vert:kp,meshtoon_frag:Hp,points_vert:Vp,points_frag:Wp,shadow_vert:Xp,shadow_frag:qp,sprite_vert:$p,sprite_frag:Yp},xe={common:{diffuse:{value:new ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ke(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Pn={basic:{uniforms:Kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ke(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new ke(0)},specular:{value:new ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Kt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Kt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new ke(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Kt([xe.points,xe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Kt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Kt([xe.common,xe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Kt([xe.sprite,xe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Kt([xe.common,xe.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Kt([xe.lights,xe.fog,{color:{value:new ke(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Pn.physical={uniforms:Kt([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ke(0)},specularColor:{value:new ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ar={r:0,b:0,g:0},Kp=new ot,Qc=new Ge;Qc.set(-1,0,0,0,1,0,0,0,1);function Zp(i,e,t,n,s,r){const a=new ke(0);let o=s===!0?0:1,l,c,d=null,h=0,u=null;function m(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){const y=M.backgroundBlurriness>0;A=e.get(A,y)}return A}function f(M){let A=!1;const y=m(M);y===null?v(a,o):y&&y.isColor&&(v(y,1),A=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,A){const y=m(A);y&&y.isCubeTexture?(c===void 0&&(c=new Ne(new St(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:Wi(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,p){this.matrixWorld.copyPosition(p.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Kp.makeRotationFromEuler(A.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Qc),c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==rt,(d!==y||h!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ne(new Qi(2,2),new dn({name:"BackgroundMaterial",uniforms:Wi(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(y.colorSpace)!==rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function v(M,A){M.getRGB(ar,$c(i)),t.buffers.color.setClear(ar.r,ar.g,ar.b,A,r)}function _(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,A=1){a.set(M),o=A,v(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,v(a,o)},render:f,addToRenderList:x,dispose:_}}function Jp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(D,U,R,L,P){let C=!1;const z=h(D,L,R,U);r!==z&&(r=z,c(r.object)),C=m(D,L,R,P),C&&f(D,L,R,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(C||a)&&(a=!1,y(D,U,R,L),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function d(D){return i.deleteVertexArray(D)}function h(D,U,R,L){const P=L.wireframe===!0;let C=n[U.id];C===void 0&&(C={},n[U.id]=C);const z=D.isInstancedMesh===!0?D.id:0;let Y=C[z];Y===void 0&&(Y={},C[z]=Y);let q=Y[R.id];q===void 0&&(q={},Y[R.id]=q);let te=q[P];return te===void 0&&(te=u(l()),q[P]=te),te}function u(D){const U=[],R=[],L=[];for(let P=0;P<t;P++)U[P]=0,R[P]=0,L[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:R,attributeDivisors:L,object:D,attributes:{},index:null}}function m(D,U,R,L){const P=r.attributes,C=U.attributes;let z=0;const Y=R.getAttributes();for(const q in Y)if(Y[q].location>=0){const oe=P[q];let _e=C[q];if(_e===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor)),oe===void 0||oe.attribute!==_e||_e&&oe.data!==_e.data)return!0;z++}return r.attributesNum!==z||r.index!==L}function f(D,U,R,L){const P={},C=U.attributes;let z=0;const Y=R.getAttributes();for(const q in Y)if(Y[q].location>=0){let oe=C[q];oe===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor));const _e={};_e.attribute=oe,oe&&oe.data&&(_e.data=oe.data),P[q]=_e,z++}r.attributes=P,r.attributesNum=z,r.index=L}function x(){const D=r.newAttributes;for(let U=0,R=D.length;U<R;U++)D[U]=0}function v(D){_(D,0)}function _(D,U){const R=r.newAttributes,L=r.enabledAttributes,P=r.attributeDivisors;R[D]=1,L[D]===0&&(i.enableVertexAttribArray(D),L[D]=1),P[D]!==U&&(i.vertexAttribDivisor(D,U),P[D]=U)}function M(){const D=r.newAttributes,U=r.enabledAttributes;for(let R=0,L=U.length;R<L;R++)U[R]!==D[R]&&(i.disableVertexAttribArray(R),U[R]=0)}function A(D,U,R,L,P,C,z){z===!0?i.vertexAttribIPointer(D,U,R,P,C):i.vertexAttribPointer(D,U,R,L,P,C)}function y(D,U,R,L){x();const P=L.attributes,C=R.getAttributes(),z=U.defaultAttributeValues;for(const Y in C){const q=C[Y];if(q.location>=0){let te=P[Y];if(te===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(te=D.instanceColor)),te!==void 0){const oe=te.normalized,_e=te.itemSize,Re=e.get(te);if(Re===void 0)continue;const ie=Re.buffer,B=Re.type,ee=Re.bytesPerElement,Me=B===i.INT||B===i.UNSIGNED_INT||te.gpuType===Co;if(te.isInterleavedBufferAttribute){const ce=te.data,Ce=ce.isInterleavedBuffer===!0?ce.stride:ce.itemSize,st=te.offset;if(ce.isInstancedInterleavedBuffer||ce.isInstancedBufferAttribute){for(let Ae=0;Ae<q.locationSize;Ae++)_(q.location+Ae,ce.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ae=0;Ae<q.locationSize;Ae++)v(q.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Ae=0;Ae<q.locationSize;Ae++)A(q.location+Ae,_e/q.locationSize,B,oe,Ce*ee,(st+_e/q.locationSize*Ae)*ee,Me)}else{if(te.isInstancedBufferAttribute){for(let ce=0;ce<q.locationSize;ce++)_(q.location+ce,te.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ce=0;ce<q.locationSize;ce++)v(q.location+ce);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let ce=0;ce<q.locationSize;ce++)A(q.location+ce,_e/q.locationSize,B,oe,_e*ee,_e/q.locationSize*ce*ee,Me)}}else if(z!==void 0){const oe=z[Y];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(q.location,oe);break;case 3:i.vertexAttrib3fv(q.location,oe);break;case 4:i.vertexAttrib4fv(q.location,oe);break;default:i.vertexAttrib1fv(q.location,oe)}}}}M()}function w(){I();for(const D in n){const U=n[D];for(const R in U){const L=U[R];for(const P in L){const C=L[P];for(const z in C)d(C[z].object),delete C[z];delete L[P]}}delete n[D]}}function E(D){if(n[D.id]===void 0)return;const U=n[D.id];for(const R in U){const L=U[R];for(const P in L){const C=L[P];for(const z in C)d(C[z].object),delete C[z];delete L[P]}}delete n[D.id]}function p(D){for(const U in n){const R=n[U];for(const L in R){const P=R[L];if(P[D.id]===void 0)continue;const C=P[D.id];for(const z in C)d(C[z].object),delete C[z];delete P[D.id]}}}function S(D){for(const U in n){const R=n[U],L=D.isInstancedMesh===!0?D.id:0,P=R[L];if(P!==void 0){for(const C in P){const z=P[C];for(const Y in z)d(z[Y].object),delete z[Y];delete P[C]}delete R[L],Object.keys(R).length===0&&delete n[U]}}}function I(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:T,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:p,initAttributes:x,enableAttribute:v,disableUnusedAttributes:M}}function Qp(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let u=0;for(let m=0;m<d;m++)u+=c[m];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function jp(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const p=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(p){return!(p!==Ln&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(p){const S=p===sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==fn&&p!==bn&&!S&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(p){if(p==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Fe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&h===!1;t.reversedDepthBuffer===!0&&h===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&h===!0&&Fe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:f,maxTextureSize:x,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:y,maxSamples:w,samples:E}}function em(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Zn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const m=h.length!==0||u||n!==0||s;return s=u,n=h.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,m){const f=h.clippingPlanes,x=h.clipIntersection,v=h.clipShadows,_=i.get(h);if(!s||f===null||f.length===0||r&&!v)r?d(null):c();else{const M=r?0:n,A=M*4;let y=_.clippingState||null;l.value=y,y=d(f,u,A,m);for(let w=0;w!==A;++w)y[w]=t[w];_.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,m,f){const x=h!==null?h.length:0;let v=null;if(x!==0){if(v=l.value,f!==!0||v===null){const _=m+x*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(v===null||v.length<_)&&(v=new Float32Array(_));for(let A=0,y=m;A!==x;++A,y+=4)a.copy(h[A]).applyMatrix4(M,o),a.normal.toArray(v,y),v[y+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,v}}class Wo extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Wc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new St(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:fi});r.uniforms.tEquirect.value=t;const a=new Ne(s,r),o=t.minFilter;return t.minFilter===Qn&&(t.minFilter=Jt),new po(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const $l=256,tm=3,nm=20,jc=256,eu=16,im=3,sm=new W,rm=new ke;class Nr{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new po(1,10,null),this._boxMesh=new Ne(new St(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=sm}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const h=l.autoClear,u=l.autoClearColor,m=l.autoClearDepth,f=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(rm));const v=new po(n,s,d);return v.position.copy(o),v.update(l,e),l.autoClear=h,l.autoClearColor=u,l.autoClearDepth=m,l.autoClearStencil=f,e.background=x,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max($l,Nc(e))}_fromTexture(e,t){e.mapping===ki||e.mapping===ws?this._setSize(e.image.length===0?$l:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=Yl(e,!1,!1),n=Math.log2(e)-tm;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Yl(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===ki||e.mapping===ws?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Kl()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=am(),this._integrationMaterial=om());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/eu);for(let a=0;a<=n;a++){const o=Nr.lodToRoughness(a,n);if(a>n-im)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(jc*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=lm());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function Yl(i,e,t){return new Wo(i,{minFilter:Qn,generateMipmaps:e,type:sn,colorSpace:Cr,depthBuffer:t})}function Is(i,e,t){return new dn({name:i,uniforms:e,vertexShader:We.cube_vert,fragmentShader:t,side:nn,blending:fi,depthTest:!1,depthWrite:!1})}function am(){return Is("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${jc}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function om(){return Is("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:eu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function lm(){return Is("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${nm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Kl(){return Is("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Zl(){return Is("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function cm(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){const m=u.mapping;if(m===$r||m===Yr)if(e.has(u)){const f=e.get(u).texture;return o(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const x=new Wo(f.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const m=u.mapping,f=m===$r||m===Yr,x=m===ki||m===ws;if(f||x){let v=t.get(u);const _=v!==void 0?v.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==_)return n===null&&(n=new Nr(i)),v=f?n.fromEquirectangular(u,v):n.fromCubemap(u,v),v.texture.pmremVersion=u.pmremVersion,t.set(u,v),v.texture;if(v!==void 0)return v.texture;{const M=u.image;return f&&M&&M.height>0||x&&M&&l(M)?(n===null&&(n=new Nr(i)),v=f?n.fromEquirectangular(u):n.fromCubemap(u),v.texture.pmremVersion=u.pmremVersion,t.set(u,v),u.addEventListener("dispose",d),v.texture):null}}}return u}function o(u,m){return m===$r?u.mapping=ki:m===Yr&&(u.mapping=ws),u}function l(u){let m=0;const f=6;for(let x=0;x<f;x++)u[x]!==void 0&&m++;return m===f}function c(u){const m=u.target;m.removeEventListener("dispose",c);const f=e.get(m);f!==void 0&&(e.delete(m),f.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const f=t.get(m);f!==void 0&&(t.delete(m),f.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function um(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&_r("WebGLRenderer: "+n+" extension not supported."),s}}}function hm(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(f=>delete s[f]);function o(f){l(f.target)}function l(f){f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",o),delete s[f.id],a.unregister(f);const x=r.get(f);x&&(e.remove(x),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function c(f,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function d(f){const x=f.attributes;for(const v in x)e.update(x[v],i.ARRAY_BUFFER)}function h(f){const x=f.index,v=f.attributes.position;let _=0;if(v===void 0)return;const M=x!==null?x.array.length:v.array.length/3-1,A=v.count>=65535?kc:Gc,y=new A(Math.ceil(M/3)*6,1),w=y.array;if(x!==null){const p=x.array;_=x.version;for(let S=0,I=0;S<M;S+=3){const T=p[S+0],D=p[S+1],U=p[S+2];w[I++]=T,w[I++]=D,w[I++]=D,w[I++]=U,w[I++]=U,w[I++]=T}}else{_=v.version;for(let p=0,S=0;p<M;p+=3){const I=p+0,T=p+1,D=p+2;w[S++]=I,w[S++]=T,w[S++]=T,w[S++]=D,w[S++]=D,w[S++]=I}}y.version=_;const E=r.get(f);E&&e.remove(E),r.set(f,y)}function u(f){const x=r.get(f);if(x){const v=f.index;v!==null&&x.version<v.version&&h(f)}else h(f);return r.get(f)}function m(){for(const f in s){const x=s[f].deref();x!==void 0&&l(x)}}return{get:c,update:d,getWireframeAttribute:u,dispose:m}}function fm(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,u){i.drawElements(n,u,r,h*a),t.update(u,n,1)}function c(h,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,h*a,m),t.update(u,n,m))}function d(h,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,h,0,m);let x=0;for(let v=0;v<m;v++)x+=u[v];t.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function dm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function pm(i,e,t){const n=new WeakMap,s=new bt;function r(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(o);if(u===void 0||u.count!==h){let T=function(){S.dispose(),n.delete(o),o.removeEventListener("dispose",T)};var m=T;u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),x===!0&&(y=2),v===!0&&(y=3);let w=o.attributes.position.count*y,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const p=new Float32Array(w*E*4*h),S=new Oc(p,w,E,h);S.type=bn,S.needsUpdate=!0;const I=y*4;for(let D=0;D<h;D++){const U=_[D],R=M[D],L=A[D],P=w*E*4*D;for(let C=0;C<U.count;C++){const z=C*I;f===!0&&(s.fromBufferAttribute(U,C),p[P+z+0]=s.x,p[P+z+1]=s.y,p[P+z+2]=s.z,p[P+z+3]=0),x===!0&&(s.fromBufferAttribute(R,C),p[P+z+4]=s.x,p[P+z+5]=s.y,p[P+z+6]=s.z,p[P+z+7]=0),v===!0&&(s.fromBufferAttribute(L,C),p[P+z+8]=s.x,p[P+z+9]=s.y,p[P+z+10]=s.z,p[P+z+11]=L.itemSize===4?s.w:1)}}u={count:h,texture:S,size:new Oe(w,E)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];const x=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function mm(i,e,t,n,s){let r=new WeakMap;function a(c){const d=s.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return u}function o(){r=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const gm={[yo]:"LINEAR_TONE_MAPPING",[Eo]:"REINHARD_TONE_MAPPING",[bo]:"CINEON_TONE_MAPPING",[wo]:"ACES_FILMIC_TONE_MAPPING",[Ao]:"AGX_TONE_MAPPING",[Ro]:"NEUTRAL_TONE_MAPPING",[To]:"CUSTOM_TONE_MAPPING"};function _m(i,e,t,n,s,r){const a=new rn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const d=new jt;d.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new gt([0,2,0,0,2,0],2));const h=new Yc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ne(d,h),m=new Vo(-1,1,1,-1,0,1);let f=null,x=null,v=!1,_,M=null,A=[],y=!1;this.setSize=function(w,E){a.setSize(w,E),o!==null&&o.setSize(w,E),l!==null&&l.setSize(w,E);for(let p=0;p<A.length;p++){const S=A[p];S.setSize&&S.setSize(w,E)}},this.setEffects=function(w){A=w,y=A.length>0&&A[0].isRenderPass===!0;const E=a.width,p=a.height;A.length>0&&o===null&&(o=new rn(E,p,{type:sn,depthBuffer:!1,stencilBuffer:!1}),l=new rn(E,p,{type:sn,depthBuffer:!1,stencilBuffer:!1}));const S=s===!0&&A.some(I=>I.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new Vi(E,p),r===!0&&(c.format=jn,c.type=Hi)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let I=0;I<A.length;I++){const T=A[I];T.setSize&&T.setSize(E,p),S&&T.needsDepthTexture===!0&&T.setDepthTexture&&T.setDepthTexture(c)}},this.begin=function(w,E){if(v||w.toneMapping===Gn&&A.length===0)return!1;if(M=E,E!==null){const p=E.width,S=E.height;(a.width!==p||a.height!==S)&&this.setSize(p,S)}return y===!1&&w.setRenderTarget(a),_=w.toneMapping,w.toneMapping=Gn,!0},this.hasRenderPass=function(){return y},this.end=function(w,E){w.toneMapping=_,v=!0;let p=a,S=o;for(let I=0;I<A.length;I++){const T=A[I];T.enabled!==!1&&(T.render(w,S,p,E),T.needsSwap!==!1&&(p=S,S=S===o?l:o))}if(f!==w.outputColorSpace||x!==w.toneMapping){f=w.outputColorSpace,x=w.toneMapping,h.defines={},Ke.getTransfer(f)===rt&&(h.defines.SRGB_TRANSFER="");const I=gm[x];I&&(h.defines[I]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=p.texture,w.setRenderTarget(M),w.render(u,m),M=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),d.dispose(),h.dispose()}}const tu=new Vt,nu=new Vi(1,1),iu=new Xc(1),su=new Oc,ru=new Oh,au=new Wc,Jl=[],Ql=[],jl=new Float32Array(16),ec=new Float32Array(9),tc=new Float32Array(4);function ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Jl[s];if(r===void 0&&(r=new Float32Array(s),Jl[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ct(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Gr(i,e){let t=Ql[e];t===void 0&&(t=new Int32Array(e),Ql[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function vm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2fv(this.addr,e),Pt(t,e)}}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;i.uniform3fv(this.addr,e),Pt(t,e)}}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4fv(this.addr,e),Pt(t,e)}}function ym(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;tc.set(n),i.uniformMatrix2fv(this.addr,!1,tc),Pt(t,n)}}function Em(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;ec.set(n),i.uniformMatrix3fv(this.addr,!1,ec),Pt(t,n)}}function bm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;jl.set(n),i.uniformMatrix4fv(this.addr,!1,jl),Pt(t,n)}}function wm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2iv(this.addr,e),Pt(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3iv(this.addr,e),Pt(t,e)}}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4iv(this.addr,e),Pt(t,e)}}function Cm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;i.uniform2uiv(this.addr,e),Pt(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;i.uniform3uiv(this.addr,e),Pt(t,e)}}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;i.uniform4uiv(this.addr,e),Pt(t,e)}}function kr(i){return i.version===0&&(i.compareFunction=Dc,i.needsUpdate=!0),i}function Im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=kr(nu):r=tu,t.setTexture2D(e||r,s)}function Nm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ru,s)}function Um(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=kr(iu):r=au,t.setTextureCube(e||r,s)}function Fm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||su,s)}function Om(i){switch(i){case 5126:return vm;case 35664:return xm;case 35665:return Sm;case 35666:return Mm;case 35674:return ym;case 35675:return Em;case 35676:return bm;case 5124:case 35670:return wm;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}function Bm(i,e){i.uniform1fv(this.addr,e)}function zm(i,e){const t=ji(e,this.size,2);i.uniform2fv(this.addr,t)}function Gm(i,e){const t=ji(e,this.size,3);i.uniform3fv(this.addr,t)}function km(i,e){const t=ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Hm(i,e){const t=ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vm(i,e){const t=ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wm(i,e){const t=ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xm(i,e){i.uniform1iv(this.addr,e)}function qm(i,e){i.uniform2iv(this.addr,e)}function $m(i,e){i.uniform3iv(this.addr,e)}function Ym(i,e){i.uniform4iv(this.addr,e)}function Km(i,e){i.uniform1uiv(this.addr,e)}function Zm(i,e){i.uniform2uiv(this.addr,e)}function Jm(i,e){i.uniform3uiv(this.addr,e)}function Qm(i,e){i.uniform4uiv(this.addr,e)}function jm(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=kr(nu):a=tu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function eg(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ru,r[a])}function tg(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=kr(iu):a=au;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function ng(i,e,t){const n=this.cache,s=e.length,r=Gr(t,s);Ct(n,r)||(i.uniform1iv(this.addr,r),Pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||su,r[a])}function ig(i){switch(i){case 5126:return Bm;case 35664:return zm;case 35665:return Gm;case 35666:return km;case 35674:return Hm;case 35675:return Vm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return qm;case 35668:case 35672:return $m;case 35669:case 35673:return Ym;case 5125:return Km;case 36294:return Zm;case 36295:return Jm;case 36296:return Qm;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ng}}class sg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Om(t.type)}}class rg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ig(t.type)}}class ag{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function nc(i,e){i.seq.push(e),i.map[e.id]=e}function og(i,e,t){const n=i.name,s=n.length;for(Sa.lastIndex=0;;){const r=Sa.exec(n),a=Sa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){nc(t,c===void 0?new sg(o,i,e):new rg(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new ag(o),nc(t,h)),t=h}}}class xr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);og(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function ic(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const lg=37297;let cg=0;function ug(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const sc=new Ge;function hg(i){Ke._getMatrix(sc,Ke.workingColorSpace,i);const e=`mat3( ${sc.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Pr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function rc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ug(i.getShaderSource(e),o)}else return r}function fg(i,e){const t=hg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const dg={[yo]:"Linear",[Eo]:"Reinhard",[bo]:"Cineon",[wo]:"ACESFilmic",[Ao]:"AgX",[Ro]:"Neutral",[To]:"Custom"};function pg(i,e){const t=dg[e];return t===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const or=new W;function mg(){Ke.getLuminanceCoefficients(or);const i=or.x.toFixed(4),e=or.y.toFixed(4),t=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ds).join(`
`)}function _g(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ds(i){return i!==""}function ac(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function oc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xg=/^[ \t]*#include +<([\w\d./]+)>/gm;function mo(i){return i.replace(xg,Sg)}function Sg(i,e){const t=We[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return mo(t)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(i){return i.replace(Mg,yg)}function yg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Eg={[fr]:"SHADOWMAP_TYPE_PCF",[fs]:"SHADOWMAP_TYPE_VSM"};function bg(i){return Eg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wg={[ws]:"ENVMAP_MODE_REFRACTION"};function Tg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":wg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ag={[yc]:"ENVMAP_BLENDING_MULTIPLY",[th]:"ENVMAP_BLENDING_MIX",[nh]:"ENVMAP_BLENDING_ADD"};function Rg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ag[i.combine]||"ENVMAP_BLENDING_NONE"}function Cg(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=bg(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=Tg(t),h=Rg(t),u=gg(t),m=_g(r),f=s.createProgram();let x,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ds).join(`
`),x.length>0&&(x+=`
`),v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ds).join(`
`),v.length>0&&(v+=`
`)):(x=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ds).join(`
`),v=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gn?"#define TONE_MAPPING":"",t.toneMapping!==Gn?We.tonemapping_pars_fragment:"",t.toneMapping!==Gn?pg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,fg("linearToOutputTexel",t.outputColorSpace),mg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ds).join(`
`)),a=mo(a),a=ac(a,t),a=oc(a,t),o=mo(o),o=ac(o,t),o=oc(o,t),a=lc(a),o=lc(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,v=["#define varying in",t.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=_+x+a,A=_+v+o,y=ic(s,s.VERTEX_SHADER,M),w=ic(s,s.FRAGMENT_SHADER,A);s.attachShader(f,y),s.attachShader(f,w),t.index0AttributeName!==void 0?s.bindAttribLocation(f,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(f,0,"position"),s.linkProgram(f);function E(T){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(f)||"",U=s.getShaderInfoLog(y)||"",R=s.getShaderInfoLog(w)||"",L=D.trim(),P=U.trim(),C=R.trim();let z=!0,Y=!0;if(s.getProgramParameter(f,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,f,y,w);else{const q=rc(s,y,"vertex"),te=rc(s,w,"fragment");nt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(f,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+L+`
`+q+`
`+te)}else L!==""?Fe("WebGLProgram: Program Info Log:",L):(P===""||C==="")&&(Y=!1);Y&&(T.diagnostics={runnable:z,programLog:L,vertexShader:{log:P,prefix:x},fragmentShader:{log:C,prefix:v}})}s.deleteShader(y),s.deleteShader(w),p=new xr(s,f),S=vg(s,f)}let p;this.getUniforms=function(){return p===void 0&&E(this),p};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(f,lg)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(f),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=f,this.vertexShader=y,this.fragmentShader=w,this}let Pg=0;class Lg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Dg(e),t.set(e,n)),n}}class Dg{constructor(e){this.id=Pg++,this.code=e,this.usedTimes=0}}function Ig(i){return i===pi||i===Ar||i===Rr}function Ng(i,e,t,n,s,r){const a=new Bc,o=new Lg,l=new Set,c=[],d=new Map,h=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(p){return l.add(p),p===0?"uv":`uv${p}`}function f(p,S,I,T,D,U){const R=T.fog,L=D.geometry,P=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?T.environment:null,C=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,z=e.get(p.envMap||P,C),Y=u[p.type];let q=n.precision;p.precision!==null&&(q=n.getMaxPrecision(p.precision),q!==p.precision&&Fe("WebGLProgram.getParameters:",p.precision,"not supported, using",q,"instead."));const te=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,oe=te!==void 0?te.length:0;let _e=0;L.morphAttributes.position!==void 0&&(_e=1),L.morphAttributes.normal!==void 0&&(_e=2),L.morphAttributes.color!==void 0&&(_e=3);let Re,ie,B,ee;if(Y){const ve=Pn[Y];Re=ve.vertexShader,ie=ve.fragmentShader}else{Re=p.vertexShader,ie=p.fragmentShader;const ve=o.getVertexShaderStage(p),at=o.getFragmentShaderStage(p);o.update(p,ve,at),B=ve.id,ee=at.id}const Me=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),Ce=D.isInstancedMesh===!0,st=D.isBatchedMesh===!0,Ae=!!p.map,Je=!!p.matcap,et=!!z,Be=et&&z.isPMREMTexture===!0,_t=!!p.aoMap,ut=!!p.lightMap,qe=!!p.bumpMap&&p.wireframe===!1,Qe=!!p.normalMap,Xt=!!p.displacementMap,wt=!!p.emissiveMap,Ot=!!p.metalnessMap,qt=!!p.roughnessMap,en=p.anisotropy>0,H=p.clearcoat>0,tn=p.diffuseRoughness>0,dt=p.dispersion>0,ht=p.retroreflectivity>0,me=p.iridescence>0,yt=p.sheen>0,Le=p.transmission>0,Pe=en&&!!p.anisotropyMap,N=H&&!!p.clearcoatMap,g=H&&!!p.clearcoatNormalMap,F=H&&!!p.clearcoatRoughnessMap,V=tn&&!!p.diffuseRoughnessMap,k=me&&!!p.iridescenceMap,re=me&&!!p.iridescenceThicknessMap,le=yt&&!!p.sheenColorMap,K=yt&&!!p.sheenRoughnessMap,J=!!p.specularMap,Q=!!p.specularColorMap,O=!!p.specularIntensityMap,ne=Le&&!!p.transmissionMap,j=Le&&!!p.thicknessMap,fe=!!p.gradientMap,he=!!p.alphaMap,de=p.alphaTest>0,Te=!!p.alphaHash,Ve=!!p.extensions;let ue=Gn;p.toneMapped&&(Me===null||Me.isXRRenderTarget===!0)&&(ue=i.toneMapping);const De=Be?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,He={shaderID:Y,shaderType:p.type,shaderName:p.name,vertexShader:Re,fragmentShader:ie,defines:p.defines,customVertexShaderID:B,customFragmentShaderID:ee,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:q,batching:st,batchingColor:st&&D._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&D.instanceColor!==null,instancingMorph:Ce&&D.morphTexture!==null,outputColorSpace:Me===null?i.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:Ae,matcap:Je,envMap:et,envMapMode:et&&z.mapping,envMapPMREM:Be,envMapMaxLod:Be?De.length-1:null,envMapSize:Be?De[0].width:null,aoMap:_t,lightMap:ut,bumpMap:qe,normalMap:Qe,displacementMap:Xt,emissiveMap:wt,normalMapObjectSpace:Qe&&p.normalMapType===rh,normalMapTangentSpace:Qe&&p.normalMapType===fo,packedNormalMap:Qe&&p.normalMapType===fo&&Ig(p.normalMap.format),metalnessMap:Ot,roughnessMap:qt,anisotropy:en,anisotropyMap:Pe,clearcoat:H,clearcoatMap:N,clearcoatNormalMap:g,clearcoatRoughnessMap:F,diffuseRoughness:tn,diffuseRoughnessMap:V,dispersion:dt,retroreflection:ht,iridescence:me,iridescenceMap:k,iridescenceThicknessMap:re,sheen:yt,sheenColorMap:le,sheenRoughnessMap:K,specularMap:J,specularColorMap:Q,specularIntensityMap:O,transmission:Le,transmissionMap:ne,thicknessMap:j,gradientMap:fe,opaque:p.transparent===!1&&p.blending===ps&&p.alphaToCoverage===!1,alphaMap:he,alphaTest:de,alphaHash:Te,combine:p.combine,mapUv:Ae&&m(p.map.channel),aoMapUv:_t&&m(p.aoMap.channel),lightMapUv:ut&&m(p.lightMap.channel),bumpMapUv:qe&&m(p.bumpMap.channel),normalMapUv:Qe&&m(p.normalMap.channel),displacementMapUv:Xt&&m(p.displacementMap.channel),emissiveMapUv:wt&&m(p.emissiveMap.channel),metalnessMapUv:Ot&&m(p.metalnessMap.channel),roughnessMapUv:qt&&m(p.roughnessMap.channel),anisotropyMapUv:Pe&&m(p.anisotropyMap.channel),clearcoatMapUv:N&&m(p.clearcoatMap.channel),clearcoatNormalMapUv:g&&m(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:F&&m(p.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:V&&m(p.diffuseRoughnessMap.channel),iridescenceMapUv:k&&m(p.iridescenceMap.channel),iridescenceThicknessMapUv:re&&m(p.iridescenceThicknessMap.channel),sheenColorMapUv:le&&m(p.sheenColorMap.channel),sheenRoughnessMapUv:K&&m(p.sheenRoughnessMap.channel),specularMapUv:J&&m(p.specularMap.channel),specularColorMapUv:Q&&m(p.specularColorMap.channel),specularIntensityMapUv:O&&m(p.specularIntensityMap.channel),transmissionMapUv:ne&&m(p.transmissionMap.channel),thicknessMapUv:j&&m(p.thicknessMap.channel),alphaMapUv:he&&m(p.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Qe||en),vertexNormals:!!L.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(Ae||he),fog:!!R,useFog:p.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||L.attributes.normal===void 0&&Qe===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ce,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:_e,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:U.filter(ve=>ve.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:p.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:Ae&&p.map.isVideoTexture===!0&&Ke.getTransfer(p.map.colorSpace)===rt,decodeVideoTextureEmissive:wt&&p.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(p.emissiveMap.colorSpace)===rt,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===yn,flipSided:p.side===nn,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:Ve&&p.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&p.extensions.multiDraw===!0||st)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return He.vertexUv1s=l.has(1),He.vertexUv2s=l.has(2),He.vertexUv3s=l.has(3),l.clear(),He}function x(p){const S=[];if(p.shaderID?S.push(p.shaderID):(S.push(p.customVertexShaderID),S.push(p.customFragmentShaderID)),p.defines!==void 0)for(const I in p.defines)S.push(I),S.push(p.defines[I]);return p.isRawShaderMaterial===!1&&(v(S,p),_(S,p),S.push(i.outputColorSpace)),S.push(p.customProgramCacheKey),S.join()}function v(p,S){p.push(S.precision),p.push(S.outputColorSpace),p.push(S.envMapMode),p.push(S.envMapPMREM),p.push(S.envMapMaxLod),p.push(S.envMapSize),p.push(S.mapUv),p.push(S.alphaMapUv),p.push(S.lightMapUv),p.push(S.aoMapUv),p.push(S.bumpMapUv),p.push(S.normalMapUv),p.push(S.displacementMapUv),p.push(S.emissiveMapUv),p.push(S.metalnessMapUv),p.push(S.roughnessMapUv),p.push(S.anisotropyMapUv),p.push(S.clearcoatMapUv),p.push(S.clearcoatNormalMapUv),p.push(S.clearcoatRoughnessMapUv),p.push(S.diffuseRoughnessMapUv),p.push(S.iridescenceMapUv),p.push(S.iridescenceThicknessMapUv),p.push(S.sheenColorMapUv),p.push(S.sheenRoughnessMapUv),p.push(S.specularMapUv),p.push(S.specularColorMapUv),p.push(S.specularIntensityMapUv),p.push(S.transmissionMapUv),p.push(S.thicknessMapUv),p.push(S.combine),p.push(S.fogExp2),p.push(S.sizeAttenuation),p.push(S.morphTargetsCount),p.push(S.numSunLights),p.push(S.numDirLights),p.push(S.numPointLights),p.push(S.numSpotLights),p.push(S.numSpotLightMaps),p.push(S.numHemiLights),p.push(S.numRectAreaLights),p.push(S.numSunLightShadows),p.push(S.numDirLightShadows),p.push(S.numPointLightShadows),p.push(S.numSpotLightShadows),p.push(S.numSpotLightShadowsWithMaps),p.push(S.numLightProbes),p.push(S.numLightProbeGrids),p.push(S.shadowMapType),p.push(S.toneMapping),p.push(S.numClippingPlanes),p.push(S.numClipIntersection),p.push(S.depthPacking)}function _(p,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),p.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),p.push(a.mask)}function M(p){const S=u[p.type];let I;if(S){const T=Pn[S];I=Ls.clone(T.uniforms)}else I=p.uniforms;return I}function A(p,S){let I=d.get(S);return I!==void 0?++I.usedTimes:(I=new Cg(i,S,p,s),c.push(I),d.set(S,I)),I}function y(p){if(--p.usedTimes===0){const S=c.indexOf(p);c[S]=c[c.length-1],c.pop(),d.delete(p.cacheKey),p.destroy()}}function w(p){o.remove(p)}function E(){o.dispose()}return{getParameters:f,getProgramCacheKey:x,getUniforms:M,acquireProgram:A,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:E}}function Ug(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Fg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function uc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,f,x,v,_){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:m,material:f,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:v,group:_},i[e]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=f,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=v,M.group=_),e++,M}function l(u,m,f,x,v,_,M){M.reversedDepth===!0&&(v=-v);const A=o(u,m,f,x,v,_);f.transmission>0?n.push(A):f.transparent===!0?s.push(A):t.push(A)}function c(u,m,f,x,v,_){const M=o(u,m,f,x,v,_);f.transmission>0?n.unshift(M):f.transparent===!0?s.unshift(M):t.unshift(M)}function d(u,m){t.length>1&&t.sort(u||Fg),n.length>1&&n.sort(m||uc),s.length>1&&s.sort(m||uc)}function h(){for(let u=e,m=i.length;u<m;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:h,sort:d}}function Og(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hc,i.set(n,[a])):s>=r.length?(a=new hc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Bg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new ke};break;case"SpotLight":t={position:new W,direction:new W,color:new ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new ke,groundColor:new ke};break;case"RectAreaLight":t={color:new ke,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function zg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Gg=0;function kg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Hg(i){const e=new Bg,t=zg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new W);const s=new W,r=new ot,a=new ot;function o(c){let d=0,h=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let m=0,f=0,x=0,v=0,_=0,M=0,A=0,y=0,w=0,E=0,p=0,S=0,I=0,T=0;c.sort(kg);for(let U=0,R=c.length;U<R;U++){const L=c[U],P=L.color,C=L.intensity,z=L.distance;let Y=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===pi?Y=L.shadow.map.texture:Y=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)d+=P.r*C,h+=P.g*C,u+=P.b*C;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],C);T++}else if(L.isSunLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,oe=t.get(L);oe.shadowIntensity=te.intensity,oe.shadowBias=te.bias,oe.shadowNormalBias=te.normalBias,oe.shadowRadius=te.radius,oe.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[f]=oe,n.sunShadowMap[f]=Y;const _e=te.getViewportCount();for(let Re=0;Re<_e;Re++)n.sunShadowMatrix[x+Re]=te.getMatrix(Re),n.sunShadowCascade[x+Re]=te._cascadeData[Re];x+=_e,f++}n.sun[m]=q,m++}else if(L.isDirectionalLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,oe=t.get(L);oe.shadowIntensity=te.intensity,oe.shadowBias=te.bias,oe.shadowNormalBias=te.normalBias,oe.shadowRadius=te.radius,oe.shadowMapSize=te.mapSize,n.directionalShadow[v]=oe,n.directionalShadowMap[v]=Y,n.directionalShadowMatrix[v]=L.shadow.matrix,w++}n.directional[v]=q,v++}else if(L.isSpotLight){const q=e.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(P).multiplyScalar(C),q.distance=z,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[M]=q;const te=L.shadow;if(L.map&&(n.spotLightMap[S]=L.map,S++,te.updateMatrices(L),L.castShadow&&I++),n.spotLightMatrix[M]=te.matrix,L.castShadow){const oe=t.get(L);oe.shadowIntensity=te.intensity,oe.shadowBias=te.bias,oe.shadowNormalBias=te.normalBias,oe.shadowRadius=te.radius,oe.shadowMapSize=te.mapSize,n.spotShadow[M]=oe,n.spotShadowMap[M]=Y,p++}M++}else if(L.isRectAreaLight){const q=e.get(L);q.color.copy(P).multiplyScalar(C),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[A]=q,A++}else if(L.isPointLight){const q=e.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const te=L.shadow,oe=t.get(L);oe.shadowIntensity=te.intensity,oe.shadowBias=te.bias,oe.shadowNormalBias=te.normalBias,oe.shadowRadius=te.radius,oe.shadowMapSize=te.mapSize,oe.shadowCameraNear=te.camera.near,oe.shadowCameraFar=te.camera.far,n.pointShadow[_]=oe,n.pointShadowMap[_]=Y,n.pointShadowMatrix[_]=L.shadow.matrix,E++}n.point[_]=q,_++}else if(L.isHemisphereLight){const q=e.get(L);q.skyColor.copy(L.color).multiplyScalar(C),q.groundColor.copy(L.groundColor).multiplyScalar(C),n.hemi[y]=q,y++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const D=n.hash;(D.sunLength!==m||D.directionalLength!==v||D.pointLength!==_||D.spotLength!==M||D.rectAreaLength!==A||D.hemiLength!==y||D.numSunShadows!==f||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==p||D.numSpotMaps!==S||D.numLightProbes!==T)&&(n.sun.length=m,n.directional.length=v,n.spot.length=M,n.rectArea.length=A,n.point.length=_,n.hemi.length=y,n.sunShadow.length=f,n.sunShadowMap.length=f,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=p,n.spotShadowMap.length=p,n.spotLightMatrix.length=p+S-I,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=T,D.sunLength=m,D.directionalLength=v,D.pointLength=_,D.spotLength=M,D.rectAreaLength=A,D.hemiLength=y,D.numSunShadows=f,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=p,D.numSpotMaps=S,D.numLightProbes=T,n.version=Gg++)}function l(c,d){let h=0,u=0,m=0,f=0,x=0,v=0;const _=d.matrixWorldInverse;for(let M=0,A=c.length;M<A;M++){const y=c[M];if(y.isSunLight){const w=n.sun[h];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(_),h++}else if(y.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(_),u++}else if(y.isSpotLight){const w=n.spot[f];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(_),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(_),f++}else if(y.isRectAreaLight){const w=n.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(_),a.identity(),r.copy(y.matrixWorld),r.premultiply(_),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const w=n.point[m];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(_),m++}else if(y.isHemisphereLight){const w=n.hemi[v];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(_),v++}}}return{setup:o,setupView:l,state:n}}function fc(i){const e=new Hg(i),t=[],n=[],s=[];function r(h){d.camera=h,t.length=0,n.length=0,s.length=0}function a(h){h.isLightProbeGrid?s.push(h):t.push(h)}function o(h){n.push(h)}function l(){e.setup(t),s.sort((h,u)=>h.priority-u.priority||h.id-u.id)}function c(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Vg(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new fc(i),e.set(s,[o])):r>=a.length?(o=new fc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,qg=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],$g=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],dc=new ot,us=new W,Ma=new W;function Yg(i,e,t){let n=new Cs;const s=new Oe,r=new Oe,a=new bt,o=new af,l=new of,c={},d=t.maxTextureSize,h={[di]:nn,[nn]:di,[yn]:yn},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:Wg,fragmentShader:Xg}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const f=new jt;f.setAttribute("position",new ti(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ne(f,u),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fr;let _=this.type;this.render=function(E,p,S){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||E.length===0)return;this.type===Fu&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fr);const I=i.getRenderTarget(),T=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(fi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const R=_!==this.type;R&&p.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(P=>P.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,P=E.length;L<P;L++){const C=E[L],z=C.shadow;if(z===void 0){Fe("WebGLShadowMap:",C,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const Y=z.getFrameExtents();s.multiply(Y),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/Y.x),s.x=r.x*Y.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/Y.y),s.y=r.y*Y.y,z.mapSize.y=r.y));const q=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=q,z.map===null||R===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===fs){if(C.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new rn(s.x,s.y,{format:pi,type:sn,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),z.map.texture.name=C.name+".shadowMap",z.map.depthTexture=new Vi(s.x,s.y,bn),z.map.depthTexture.name=C.name+".shadowMapDepth",z.map.depthTexture.format=ni,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ft,z.map.depthTexture.magFilter=Ft}else C.isPointLight?(z.map=new Wo(s.x),z.map.depthTexture=new Xc(s.x,Dn)):(z.map=new rn(s.x,s.y),z.map.depthTexture=new Vi(s.x,s.y,Dn)),z.map.depthTexture.name=C.name+".shadowMap",z.map.depthTexture.format=ni,this.type===fr?(z.map.depthTexture.compareFunction=q?Lc:Pc,z.map.depthTexture.minFilter=Jt,z.map.depthTexture.magFilter=Jt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ft,z.map.depthTexture.magFilter=Ft);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==s.x||z.map.height!==s.y)&&z.map.setSize(s.x,s.y);const te=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();C.isPointLight!==!0&&z.updateMatrices(C,S);const oe=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:S.layers;for(let _e=0;_e<te;_e++){const Re=z.getCamera(_e);if(C.isPointLight){const ie=z.camera,B=z.matrix,ee=C.distance||ie.far;ee!==ie.far&&(ie.far=ee,ie.updateProjectionMatrix()),us.setFromMatrixPosition(C.matrixWorld),ie.position.copy(us),Ma.copy(ie.position),Ma.add(qg[_e]),ie.up.copy($g[_e]),ie.lookAt(Ma),ie.updateMatrixWorld(),B.makeTranslation(-us.x,-us.y,-us.z),dc.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),z._frustum.setFromProjectionMatrix(dc,ie.coordinateSystem,ie.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,_e),i.clear();else{_e===0&&(i.setRenderTarget(z.map),i.clear());const ie=z.getViewport(_e);a.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),U.viewport(a)}n=z.getFrustum(_e),y(p,S,Re,C,oe,this.type)}z.isPointLightShadow!==!0&&this.type===fs&&M(z,S),z.needsUpdate=!1}_=this.type,v.needsUpdate=!1,i.setRenderTarget(I,T,D)};function M(E,p){const S=e.update(x);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null?E.mapPass=new rn(s.x,s.y,{format:pi,type:sn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(p,null,S,u,x,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value.set(E.map.width,E.map.height),m.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(p,null,S,m,x,null)}function A(E,p,S,I){let T=null;const D=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)T=D;else if(T=S.isPointLight===!0?l:o,i.localClippingEnabled&&p.clipShadows===!0&&Array.isArray(p.clippingPlanes)&&p.clippingPlanes.length!==0||p.displacementMap&&p.displacementScale!==0||p.alphaMap&&p.alphaTest>0||p.map&&p.alphaTest>0||p.alphaToCoverage===!0){const U=T.uuid,R=p.uuid;let L=c[U];L===void 0&&(L={},c[U]=L);let P=L[R];P===void 0&&(P=T.clone(),L[R]=P,p.addEventListener("dispose",w)),T=P}if(T.visible=p.visible,T.wireframe=p.wireframe,I===fs?T.side=p.shadowSide!==null?p.shadowSide:p.side:T.side=p.shadowSide!==null?p.shadowSide:h[p.side],T.alphaMap=p.alphaMap,T.alphaTest=p.alphaToCoverage===!0?.5:p.alphaTest,T.map=p.map,T.clipShadows=p.clipShadows,T.clippingPlanes=p.clippingPlanes,T.clipIntersection=p.clipIntersection,T.displacementMap=p.displacementMap,T.displacementScale=p.displacementScale,T.displacementBias=p.displacementBias,T.wireframeLinewidth=p.wireframeLinewidth,T.linewidth=p.linewidth,S.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const U=i.properties.get(T);U.light=S}return T}function y(E,p,S,I,T,D){if(E.visible===!1)return;if(E.layers.test(T)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===fs)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const L=e.update(E),P=E.material;if(Array.isArray(P)){const C=L.groups;for(let z=0,Y=C.length;z<Y;z++){const q=C[z],te=P[q.materialIndex];if(te&&te.visible){const oe=A(E,te,I,D);E.onBeforeShadow(i,E,p,S,L,oe,q),i.renderBufferDirect(S,null,L,oe,E,q),E.onAfterShadow(i,E,p,S,L,oe,q)}}}else if(P.visible){const C=A(E,P,I,D);E.onBeforeShadow(i,E,p,S,L,C,null),i.renderBufferDirect(S,null,L,C,E,null),E.onAfterShadow(i,E,p,S,L,C,null)}}const R=E.children;for(let L=0,P=R.length;L<P;L++)y(R[L],p,S,I,T,D)}function w(E){E.target.removeEventListener("dispose",w);for(const S in c){const I=c[S],T=E.target.uuid;T in I&&(I[T].dispose(),delete I[T])}}}function Kg(i,e){function t(){let O=!1;const ne=new bt;let j=null;const fe=new bt(0,0,0,0);return{setMask:function(he){j!==he&&!O&&(i.colorMask(he,he,he,he),j=he)},setLocked:function(he){O=he},setClear:function(he,de,Te,Ve,ue){ue===!0&&(he*=Ve,de*=Ve,Te*=Ve),ne.set(he,de,Te,Ve),fe.equals(ne)===!1&&(i.clearColor(he,de,Te,Ve),fe.copy(ne))},reset:function(){O=!1,j=null,fe.set(-1,0,0,0)}}}function n(){let O=!1,ne=!1,j=null,fe=null,he=null;return{setReversed:function(de){if(ne!==de){const Te=e.get("EXT_clip_control");de?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),ne=de;const Ve=he;he=null,this.setClear(Ve)}},getReversed:function(){return ne},setTest:function(de){de?ce(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(de){j!==de&&!O&&(i.depthMask(de),j=de)},setFunc:function(de){if(ne&&(de=gh[de]),fe!==de){switch(de){case Aa:i.depthFunc(i.NEVER);break;case Ra:i.depthFunc(i.ALWAYS);break;case Ca:i.depthFunc(i.LESS);break;case bs:i.depthFunc(i.LEQUAL);break;case Pa:i.depthFunc(i.EQUAL);break;case La:i.depthFunc(i.GEQUAL);break;case Da:i.depthFunc(i.GREATER);break;case Ia:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=de}},setLocked:function(de){O=de},setClear:function(de){he!==de&&(he=de,ne&&(de=1-de),i.clearDepth(de))},reset:function(){O=!1,j=null,fe=null,he=null,ne=!1}}}function s(){let O=!1,ne=null,j=null,fe=null,he=null,de=null,Te=null,Ve=null,ue=null;return{setTest:function(De){O||(De?ce(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(De){ne!==De&&!O&&(i.stencilMask(De),ne=De)},setFunc:function(De,He,ve){(j!==De||fe!==He||he!==ve)&&(i.stencilFunc(De,He,ve),j=De,fe=He,he=ve)},setOp:function(De,He,ve){(de!==De||Te!==He||Ve!==ve)&&(i.stencilOp(De,He,ve),de=De,Te=He,Ve=ve)},setLocked:function(De){O=De},setClear:function(De){ue!==De&&(i.clearStencil(De),ue=De)},reset:function(){O=!1,ne=null,j=null,fe=null,he=null,de=null,Te=null,Ve=null,ue=null}}}const r=new t,a=new n,o=new s;let l={};const c=new WeakMap;let d={},h={},u={},m=new WeakMap,f=[],x=null,v=!1,_=null,M=null,A=null,y=null,w=null,E=null,p=null,S=new ke(0,0,0),I=0,T=!1,D=null,U=null,R=null,L=null,P=null;const C=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Y=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(q)[1]),z=Y>=1):q.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),z=Y>=2);let te=null,oe={};const _e=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),ie=new bt().fromArray(_e),B=new bt().fromArray(Re);function ee(O,ne,j,fe){const he=new Uint8Array(4),de=i.createTexture();i.bindTexture(O,de),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Te=0;Te<j;Te++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,he):i.texImage2D(ne+Te,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,he);return de}const Me={};Me[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(i.DEPTH_TEST),a.setFunc(bs),qe(!1),Qe(dl),ce(i.CULL_FACE),_t(fi);function ce(O){d[O]!==!0&&(i.enable(O),d[O]=!0)}function Ce(O){d[O]!==!1&&(i.disable(O),d[O]=!1)}function st(O,ne){return u[O]!==ne?(i.bindFramebuffer(O,ne),u[O]=ne,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ne),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ae(O,ne){let j=f,fe=!1;if(O){j=m.get(ne),j===void 0&&(j=[],m.set(ne,j));const he=O.textures;if(j.length!==he.length||j[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Te=he.length;de<Te;de++)j[de]=i.COLOR_ATTACHMENT0+de;j.length=he.length,fe=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,fe=!0);fe&&i.drawBuffers(j)}function Je(O){return x!==O?(i.useProgram(O),x=O,!0):!1}const et={[Fi]:i.FUNC_ADD,[Bu]:i.FUNC_SUBTRACT,[zu]:i.FUNC_REVERSE_SUBTRACT};et[Gu]=i.MIN,et[ku]=i.MAX;const Be={[Hu]:i.ZERO,[Vu]:i.ONE,[Wu]:i.SRC_COLOR,[Sc]:i.SRC_ALPHA,[Zu]:i.SRC_ALPHA_SATURATE,[Yu]:i.DST_COLOR,[qu]:i.DST_ALPHA,[Xu]:i.ONE_MINUS_SRC_COLOR,[Mc]:i.ONE_MINUS_SRC_ALPHA,[Ku]:i.ONE_MINUS_DST_COLOR,[$u]:i.ONE_MINUS_DST_ALPHA,[Ju]:i.CONSTANT_COLOR,[Qu]:i.ONE_MINUS_CONSTANT_COLOR,[ju]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(O,ne,j,fe,he,de,Te,Ve,ue,De){if(O===fi){v===!0&&(Ce(i.BLEND),v=!1);return}if(v===!1&&(ce(i.BLEND),v=!0),O!==Ou){if(O!==_||De!==T){if((M!==Fi||w!==Fi)&&(i.blendEquation(i.FUNC_ADD),M=Fi,w=Fi),De)switch(O){case ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ta:i.blendFunc(i.ONE,i.ONE);break;case pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ml:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:nt("WebGLState: Invalid blending: ",O);break}else switch(O){case ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ta:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case pl:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ml:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",O);break}A=null,y=null,E=null,p=null,S.set(0,0,0),I=0,_=O,T=De}return}he=he||ne,de=de||j,Te=Te||fe,(ne!==M||he!==w)&&(i.blendEquationSeparate(et[ne],et[he]),M=ne,w=he),(j!==A||fe!==y||de!==E||Te!==p)&&(i.blendFuncSeparate(Be[j],Be[fe],Be[de],Be[Te]),A=j,y=fe,E=de,p=Te),(Ve.equals(S)===!1||ue!==I)&&(i.blendColor(Ve.r,Ve.g,Ve.b,ue),S.copy(Ve),I=ue),_=O,T=!1}function ut(O,ne){O.side===yn?Ce(i.CULL_FACE):ce(i.CULL_FACE);let j=O.side===nn;ne&&(j=!j),qe(j),O.blending===ps&&O.transparent===!1?_t(fi):_t(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const fe=O.stencilWrite;o.setTest(fe),fe&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),wt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(O){D!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),D=O)}function Qe(O){O!==Nu?(ce(i.CULL_FACE),O!==U&&(O===dl?i.cullFace(i.BACK):O===Uu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),U=O}function Xt(O){O!==R&&(z&&i.lineWidth(O),R=O)}function wt(O,ne,j){O?(ce(i.POLYGON_OFFSET_FILL),(L!==ne||P!==j)&&(L=ne,P=j,a.getReversed()&&(ne=-ne,j=-j),i.polygonOffset(ne,j))):Ce(i.POLYGON_OFFSET_FILL)}function Ot(O){O?ce(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function qt(O){O===void 0&&(O=i.TEXTURE0+C-1),te!==O&&(i.activeTexture(O),te=O)}function en(O,ne,j){j===void 0&&(te===null?j=i.TEXTURE0+C-1:j=te);let fe=oe[j];fe===void 0&&(fe={type:void 0,texture:void 0},oe[j]=fe),(fe.type!==O||fe.texture!==ne)&&(te!==j&&(i.activeTexture(j),te=j),i.bindTexture(O,ne||Me[O]),fe.type=O,fe.texture=ne)}function H(){const O=oe[te];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function tn(){try{i.compressedTexImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function dt(){try{i.compressedTexImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function ht(){try{i.texSubImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function me(){try{i.texSubImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function yt(){try{i.compressedTexSubImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function Le(){try{i.compressedTexSubImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function Pe(){try{i.texStorage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function N(){try{i.texStorage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function g(){try{i.texImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function F(){try{i.texImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function V(O){return h[O]!==void 0?h[O]:i.getParameter(O)}function k(O,ne){h[O]!==ne&&(i.pixelStorei(O,ne),h[O]=ne)}function re(O){ie.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),ie.copy(O))}function le(O){B.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),B.copy(O))}function K(O,ne){let j=c.get(ne);j===void 0&&(j=new WeakMap,c.set(ne,j));let fe=j.get(O);fe===void 0&&(fe=i.getUniformBlockIndex(ne,O.name),i.uniformBlockBinding(ne,fe,fe),j.set(O,fe))}function J(O,ne,j){const he=c.get(ne).get(O);l[he]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,he,j),l[he]=j)}function Q(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},h={},te=null,oe={},u={},l={},m=new WeakMap,f=[],x=null,v=!1,_=null,M=null,A=null,y=null,w=null,E=null,p=null,S=new ke(0,0,0),I=0,T=!1,D=null,U=null,R=null,L=null,P=null,ie.set(0,0,i.canvas.width,i.canvas.height),B.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:Ce,bindFramebuffer:st,drawBuffers:Ae,useProgram:Je,setBlending:_t,setMaterial:ut,setFlipSided:qe,setCullFace:Qe,setLineWidth:Xt,setPolygonOffset:wt,setScissorTest:Ot,activeTexture:qt,bindTexture:en,unbindTexture:H,compressedTexImage2D:tn,compressedTexImage3D:dt,texImage2D:g,texImage3D:F,pixelStorei:k,getParameter:V,updateUBOMapping:K,uniformBlockBinding:J,texStorage2D:Pe,texStorage3D:N,texSubImage2D:ht,texSubImage3D:me,compressedTexSubImage2D:yt,compressedTexSubImage3D:Le,scissor:re,viewport:le,reset:Q}}function Zg(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Oe,d=new WeakMap,h=new Set;let u;const m=new WeakMap,f=new Set,x=new FinalizationRegistry(N=>f.delete(N));let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(N,g){return v?new OffscreenCanvas(N,g):Lr("canvas")}function M(N,g,F){let V=1;const k=Pe(N);if((k.width>F||k.height>F)&&(V=F/Math.max(k.width,k.height)),V<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const re=Math.floor(V*k.width),le=Math.floor(V*k.height);u===void 0&&(u=_(re,le));const K=g?_(re,le):u;return K.width=re,K.height=le,K.getContext("2d").drawImage(N,0,0,re,le),Fe("WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+re+"x"+le+")."),K}else return"data"in N&&Fe("WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),N;return N}function A(N){return N.generateMipmaps}function y(N){i.generateMipmap(N)}function w(N){return N.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?i.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(N,g,F,V,k,re=!1){if(N!==null){if(i[N]!==void 0)return i[N];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let le;V&&(le=e.get("EXT_texture_norm16"),le||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=g;if(g===i.RED&&(F===i.FLOAT&&(K=i.R32F),F===i.HALF_FLOAT&&(K=i.R16F),F===i.UNSIGNED_BYTE&&(K=i.R8),F===i.UNSIGNED_SHORT&&le&&(K=le.R16_EXT),F===i.SHORT&&le&&(K=le.R16_SNORM_EXT)),g===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(K=i.R8UI),F===i.UNSIGNED_SHORT&&(K=i.R16UI),F===i.UNSIGNED_INT&&(K=i.R32UI),F===i.BYTE&&(K=i.R8I),F===i.SHORT&&(K=i.R16I),F===i.INT&&(K=i.R32I)),g===i.RG&&(F===i.FLOAT&&(K=i.RG32F),F===i.HALF_FLOAT&&(K=i.RG16F),F===i.UNSIGNED_BYTE&&(K=i.RG8),F===i.UNSIGNED_SHORT&&le&&(K=le.RG16_EXT),F===i.SHORT&&le&&(K=le.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(K=i.RG8UI),F===i.UNSIGNED_SHORT&&(K=i.RG16UI),F===i.UNSIGNED_INT&&(K=i.RG32UI),F===i.BYTE&&(K=i.RG8I),F===i.SHORT&&(K=i.RG16I),F===i.INT&&(K=i.RG32I)),g===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(K=i.RGB8UI),F===i.UNSIGNED_SHORT&&(K=i.RGB16UI),F===i.UNSIGNED_INT&&(K=i.RGB32UI),F===i.BYTE&&(K=i.RGB8I),F===i.SHORT&&(K=i.RGB16I),F===i.INT&&(K=i.RGB32I)),g===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),F===i.UNSIGNED_INT&&(K=i.RGBA32UI),F===i.BYTE&&(K=i.RGBA8I),F===i.SHORT&&(K=i.RGBA16I),F===i.INT&&(K=i.RGBA32I)),g===i.RGB&&(F===i.UNSIGNED_SHORT&&le&&(K=le.RGB16_EXT),F===i.SHORT&&le&&(K=le.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),g===i.RGBA){const J=re?Pr:Ke.getTransfer(k);F===i.FLOAT&&(K=i.RGBA32F),F===i.HALF_FLOAT&&(K=i.RGBA16F),F===i.UNSIGNED_BYTE&&(K=J===rt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&le&&(K=le.RGBA16_EXT),F===i.SHORT&&le&&(K=le.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function p(N,g){let F;return N?g===null||g===Dn||g===Hi?F=i.DEPTH24_STENCIL8:g===bn?F=i.DEPTH32F_STENCIL8:g===Ts&&(F=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Dn||g===Hi?F=i.DEPTH_COMPONENT24:g===bn?F=i.DEPTH_COMPONENT32F:g===Ts&&(F=i.DEPTH_COMPONENT16),F}function S(N,g){return A(N)===!0||N.isFramebufferTexture&&N.minFilter!==Ft&&N.minFilter!==Jt?Math.log2(Math.max(g.width,g.height))+1:N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?g.mipmaps.length:1}function I(N){const g=new WeakRef(N);n.get(N).__ref=g,f.add(g),x.register(N,g,g)}function T(N){const g=n.get(N).__ref;g!==void 0&&(f.delete(g),x.unregister(g))}function D(N){R(N.target)}function U(N){L(N.target)}function R(N){N.removeEventListener("dispose",D),T(N),C(N),N.isVideoTexture&&d.delete(N),N.isHTMLTexture&&h.delete(N)}function L(N){N.removeEventListener("dispose",U),T(N),Y(N)}function P(){for(const N of f){const g=N.deref();g!==void 0&&(g.isRenderTarget===!0?L(g):R(g))}f.clear(),h.clear()}function C(N){const g=n.get(N);if(g.__webglInit===void 0)return;const F=N.source,V=m.get(F);if(V){const k=V[g.__cacheKey];k.usedTimes--,k.usedTimes===0&&z(N),Object.keys(V).length===0&&m.delete(F)}n.remove(N)}function z(N){const g=n.get(N);i.deleteTexture(g.__webglTexture);const F=N.source,V=m.get(F);delete V[g.__cacheKey],a.memory.textures--}function Y(N){const g=n.get(N);g.__depthDisposeCallback&&g.__depthDisposeCallback();const F=N.depthTexture;if(F&&F.renderTarget===N&&R(F),N.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(g.__webglFramebuffer[k]))for(let re=0;re<g.__webglFramebuffer[k].length;re++)i.deleteFramebuffer(g.__webglFramebuffer[k][re]);else i.deleteFramebuffer(g.__webglFramebuffer[k]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[k])}else{if(Array.isArray(g.__webglFramebuffer))for(let k=0;k<g.__webglFramebuffer.length;k++)i.deleteFramebuffer(g.__webglFramebuffer[k]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let k=0;k<g.__webglColorRenderbuffer.length;k++)g.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[k]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const V=N.textures;for(let k=0,re=V.length;k<re;k++){const le=n.get(V[k]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(V[k])}n.remove(N)}let q=0;function te(){q=0}function oe(){return q}function _e(N){q=N}function Re(){const N=q;return N>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+(N+1)+" texture units while this GPU supports only "+s.maxTextures),q+=1,N}function ie(N){const g=[];return g.push(N.wrapS),g.push(N.wrapT),g.push(N.wrapR||0),g.push(N.magFilter),g.push(N.minFilter),g.push(N.anisotropy),g.push(N.internalFormat),g.push(N.format),g.push(N.type),g.push(N.generateMipmaps),g.push(N.mipmapsAutoUpdate),g.push(N.premultiplyAlpha),g.push(N.flipY),g.push(N.unpackAlignment),g.push(N.colorSpace),g.join()}function B(N,g){const F=n.get(N);if(N.isVideoTexture&&yt(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&F.__version!==N.version){const V=N.image;if(V===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(F,N,g);return}}else N.isExternalTexture&&(F.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+g)}function ee(N,g){const F=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&F.__version!==N.version){ut(F,N,g);return}else N.isExternalTexture&&(F.__webglTexture=N.sourceTexture?N.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+g)}function Me(N,g){const F=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&F.__version!==N.version){ut(F,N,g);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+g)}function ce(N,g){const F=n.get(N);if(N.version>0&&F.__version!==N.version){qe(F,N,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+g)}const Ce={[Na]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},st={[Ft]:i.NEAREST,[ih]:i.NEAREST_MIPMAP_NEAREST,[Fs]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[Kr]:i.LINEAR_MIPMAP_NEAREST,[Qn]:i.LINEAR_MIPMAP_LINEAR},Ae={[oh]:i.NEVER,[Dc]:i.ALWAYS,[lh]:i.LESS,[Pc]:i.LEQUAL,[ch]:i.EQUAL,[Lc]:i.GEQUAL,[uh]:i.GREATER,[hh]:i.NOTEQUAL};function Je(N,g){if(g.type===bn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Jt||g.magFilter===Kr||g.magFilter===Fs||g.magFilter===Qn||g.minFilter===Jt||g.minFilter===Kr||g.minFilter===Fs||g.minFilter===Qn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(N,i.TEXTURE_WRAP_S,Ce[g.wrapS]),i.texParameteri(N,i.TEXTURE_WRAP_T,Ce[g.wrapT]),(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)&&i.texParameteri(N,i.TEXTURE_WRAP_R,Ce[g.wrapR]),i.texParameteri(N,i.TEXTURE_MAG_FILTER,st[g.magFilter]),i.texParameteri(N,i.TEXTURE_MIN_FILTER,st[g.minFilter]),g.compareFunction&&(i.texParameteri(N,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(N,i.TEXTURE_COMPARE_FUNC,Ae[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ft||g.minFilter!==Fs&&g.minFilter!==Qn||g.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(N,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function et(N,g){let F=!1;N.__webglInit===void 0&&(N.__webglInit=!0,g.addEventListener("dispose",D),I(g));const V=g.source;let k=m.get(V);k===void 0&&(k={},m.set(V,k));const re=ie(g);if(re!==N.__cacheKey){k[re]===void 0&&(k[re]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),k[re].usedTimes++;const le=k[N.__cacheKey];le!==void 0&&(k[N.__cacheKey].usedTimes--,le.usedTimes===0&&z(g)),N.__cacheKey=re,N.__webglTexture=k[re].texture}return F}function Be(N,g,F){return Math.floor(Math.floor(N/F)/g)}function _t(N,g,F,V){const re=N.updateRanges;if(re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,F,V,g.data);else{re.sort((O,ne)=>O.start-ne.start);let le=0;for(let O=1;O<re.length;O++){const ne=re[le],j=re[O],fe=ne.start+ne.count,he=Be(j.start,g.width,4),de=Be(ne.start,g.width,4);j.start<=fe+1&&he===de&&Be(j.start+j.count-1,g.width,4)===he?ne.count=Math.max(ne.count,j.start+j.count-ne.start):(++le,re[le]=j)}re.length=le+1;const K=t.getParameter(i.UNPACK_ROW_LENGTH),J=t.getParameter(i.UNPACK_SKIP_PIXELS),Q=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let O=0,ne=re.length;O<ne;O++){const j=re[O],fe=Math.floor(j.start/4),he=Math.ceil(j.count/4),de=fe%g.width,Te=Math.floor(fe/g.width),Ve=he,ue=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,de),t.pixelStorei(i.UNPACK_SKIP_ROWS,Te),t.texSubImage2D(i.TEXTURE_2D,0,de,Te,Ve,ue,F,V,g.data)}N.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,K),t.pixelStorei(i.UNPACK_SKIP_PIXELS,J),t.pixelStorei(i.UNPACK_SKIP_ROWS,Q)}}function ut(N,g,F){let V=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=i.TEXTURE_3D);const k=et(N,g),re=g.source;t.bindTexture(V,N.__webglTexture,i.TEXTURE0+F);const le=n.get(re);if(re.version!==le.__version||k===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){const ue=Ke.getPrimaries(Ke.workingColorSpace),De=g.colorSpace===Jn?null:Ke.getPrimaries(g.colorSpace),He=g.colorSpace===Jn||ue===De?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,He)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let J=M(g.image,!1,s.maxTextureSize);J=Le(g,J);const Q=r.convert(g.format,g.colorSpace),O=r.convert(g.type);let ne=E(g.internalFormat,Q,O,g.normalized,g.colorSpace,g.isVideoTexture);Je(V,g);let j;const fe=g.mipmaps,he=g.isVideoTexture!==!0,de=le.__version===void 0||k===!0,Te=re.dataReady,Ve=S(g,J);if(g.isDepthTexture)ne=p(g.format===jn,g.type),de&&(he?t.texStorage2D(i.TEXTURE_2D,1,ne,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ne,J.width,J.height,0,Q,O,null));else if(g.isDataTexture)if(fe.length>0){he&&de&&t.texStorage2D(i.TEXTURE_2D,Ve,ne,fe[0].width,fe[0].height);for(let ue=0,De=fe.length;ue<De;ue++)j=fe[ue],he?Te&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,j.width,j.height,Q,O,j.data):t.texImage2D(i.TEXTURE_2D,ue,ne,j.width,j.height,0,Q,O,j.data);g.generateMipmaps=!1}else he?(de&&t.texStorage2D(i.TEXTURE_2D,Ve,ne,J.width,J.height),Te&&_t(g,J,Q,O)):t.texImage2D(i.TEXTURE_2D,0,ne,J.width,J.height,0,Q,O,J.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){he&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ve,ne,fe[0].width,fe[0].height,J.depth);for(let ue=0,De=fe.length;ue<De;ue++)if(j=fe[ue],g.format!==Ln)if(Q!==null)if(he){if(Te)if(g.layerUpdates.size>0){const He=ql(j.width,j.height,g.format,g.type);for(const ve of g.layerUpdates){const at=j.data.subarray(ve*He/j.data.BYTES_PER_ELEMENT,(ve+1)*He/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,ve,j.width,j.height,1,Q,at)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,j.width,j.height,J.depth,Q,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ue,ne,j.width,j.height,J.depth,0,j.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else he?Te&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ue,0,0,0,j.width,j.height,J.depth,Q,O,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ue,ne,j.width,j.height,J.depth,0,Q,O,j.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{he&&de&&t.texStorage2D(i.TEXTURE_2D,Ve,ne,fe[0].width,fe[0].height);for(let ue=0,De=fe.length;ue<De;ue++)j=fe[ue],g.format!==Ln?Q!==null?he?Te&&t.compressedTexSubImage2D(i.TEXTURE_2D,ue,0,0,j.width,j.height,Q,j.data):t.compressedTexImage2D(i.TEXTURE_2D,ue,ne,j.width,j.height,0,j.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):he?Te&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,j.width,j.height,Q,O,j.data):t.texImage2D(i.TEXTURE_2D,ue,ne,j.width,j.height,0,Q,O,j.data)}else if(g.isDataArrayTexture)if(he){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ve,ne,J.width,J.height,J.depth),Te)if(g.layerUpdates.size>0){const ue=ql(J.width,J.height,g.format,g.type);for(const De of g.layerUpdates){const He=J.data.subarray(De*ue/J.data.BYTES_PER_ELEMENT,(De+1)*ue/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,De,J.width,J.height,1,Q,O,He)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,Q,O,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ne,J.width,J.height,J.depth,0,Q,O,J.data);else if(g.isData3DTexture)he?(de&&t.texStorage3D(i.TEXTURE_3D,Ve,ne,J.width,J.height,J.depth),Te&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,Q,O,J.data)):t.texImage3D(i.TEXTURE_3D,0,ne,J.width,J.height,J.depth,0,Q,O,J.data);else if(g.isFramebufferTexture){if(de)if(he)t.texStorage2D(i.TEXTURE_2D,Ve,ne,J.width,J.height);else{let ue=J.width,De=J.height;for(let He=0;He<Ve;He++)t.texImage2D(i.TEXTURE_2D,He,ne,ue,De,0,Q,O,null),ue>>=1,De>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){const ue=i.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),J.parentNode!==ue){ue.appendChild(J),h.add(g),ue.onpaint=De=>{const He=De.changedElements;for(const ve of h)He.includes(ve.image)&&(ve.needsUpdate=!0)},ue.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{const He=i.RGBA,ve=i.RGBA,at=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,He,ve,at,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(fe.length>0){if(he&&de){const ue=Pe(fe[0]);t.texStorage2D(i.TEXTURE_2D,Ve,ne,ue.width,ue.height)}for(let ue=0,De=fe.length;ue<De;ue++)j=fe[ue],he?Te&&t.texSubImage2D(i.TEXTURE_2D,ue,0,0,Q,O,j):t.texImage2D(i.TEXTURE_2D,ue,ne,Q,O,j);g.generateMipmaps=!1}else if(he){if(de){const ue=Pe(J);t.texStorage2D(i.TEXTURE_2D,Ve,ne,ue.width,ue.height)}Te&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q,O,J)}else t.texImage2D(i.TEXTURE_2D,0,ne,Q,O,J);A(g)&&g.mipmapsAutoUpdate===!0&&y(V),le.__version=re.version,g.onUpdate&&g.onUpdate(g)}N.__version=g.version}function qe(N,g,F){if(g.image.length!==6)return;const V=et(N,g),k=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+F);const re=n.get(k);if(k.version!==re.__version||V===!0){t.activeTexture(i.TEXTURE0+F);const le=Ke.getPrimaries(Ke.workingColorSpace),K=g.colorSpace===Jn?null:Ke.getPrimaries(g.colorSpace),J=g.colorSpace===Jn||le===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const Q=g.isCompressedTexture||g.image[0].isCompressedTexture,O=g.image[0]&&g.image[0].isDataTexture,ne=[];for(let ve=0;ve<6;ve++)!Q&&!O?ne[ve]=M(g.image[ve],!0,s.maxCubemapSize):ne[ve]=O?g.image[ve].image:g.image[ve],ne[ve]=Le(g,ne[ve]);const j=ne[0],fe=r.convert(g.format,g.colorSpace),he=r.convert(g.type);let de=E(g.internalFormat,fe,he,g.normalized,g.colorSpace);const Te=g.isVideoTexture!==!0,Ve=re.__version===void 0||V===!0,ue=k.dataReady;let De=S(g,j);Je(i.TEXTURE_CUBE_MAP,g);let He;if(g.isDepthTexture){if(de=p(g.format===jn,g.type),Ve)if(Te)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,de,j.width,j.height);else for(let ve=0;ve<6;ve++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,j.width,j.height,0,fe,he,null)}else if(Q){Te&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,De,de,j.width,j.height);for(let ve=0;ve<6;ve++){He=ne[ve].mipmaps;for(let at=0;at<He.length;at++){const Lt=He[at];g.format!==Ln?fe!==null?Te?ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at,0,0,Lt.width,Lt.height,fe,Lt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at,de,Lt.width,Lt.height,0,Lt.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Te?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at,0,0,Lt.width,Lt.height,fe,he,Lt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at,de,Lt.width,Lt.height,0,fe,he,Lt.data)}}}else{if(He=g.mipmaps,Te&&Ve){He.length>0&&De++;const ve=Pe(ne[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,De,de,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(O){Te?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,ne[ve].width,ne[ve].height,fe,he,ne[ve].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,ne[ve].width,ne[ve].height,0,fe,he,ne[ve].data);for(let at=0;at<He.length;at++){const Vn=He[at].image[ve].image;Te?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at+1,0,0,Vn.width,Vn.height,fe,he,Vn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at+1,de,Vn.width,Vn.height,0,fe,he,Vn.data)}}else{Te?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,fe,he,ne[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,de,fe,he,ne[ve]);for(let at=0;at<He.length;at++){const Lt=He[at];Te?ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at+1,0,0,fe,he,Lt.image[ve]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ve,at+1,de,fe,he,Lt.image[ve])}}}A(g)&&g.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),re.__version=k.version,g.onUpdate&&g.onUpdate(g)}N.__version=g.version}function Qe(N,g,F,V,k,re){const le=r.convert(F.format,F.colorSpace),K=r.convert(F.type),J=E(F.internalFormat,le,K,F.normalized,F.colorSpace),Q=n.get(g),O=n.get(F);if(O.__renderTarget=g,!Q.__hasExternalTextures){const ne=Math.max(1,g.width>>re),j=Math.max(1,g.height>>re);k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?t.texImage3D(k,re,J,ne,j,g.depth,0,le,K,null):t.texImage2D(k,re,J,ne,j,0,le,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,N),me(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,k,O.__webglTexture,0,ht(g)):(k===i.TEXTURE_2D||k>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,k,O.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(N,g,F){if(i.bindRenderbuffer(i.RENDERBUFFER,N),g.depthBuffer){const V=g.depthTexture,k=V&&V.isDepthTexture?V.type:null,re=p(g.stencilBuffer,k),le=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;me(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(g),re,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(g),re,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,re,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,N)}else{const V=g.textures;for(let k=0;k<V.length;k++){const re=V[k],le=r.convert(re.format,re.colorSpace),K=r.convert(re.type),J=E(re.internalFormat,le,K,re.normalized,re.colorSpace);me(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht(g),J,g.width,g.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht(g),J,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,J,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(N,g,F){const V=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,N),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const k=n.get(g.depthTexture);k.__renderTarget=g;const re=V?g.depthTexture.image[0]:g.depthTexture.image;(!k.__webglTexture||re.width!==g.width||re.height!==g.height)&&(re.width=g.width,re.height=g.height,g.depthTexture.needsUpdate=!0),V?ce(g.depthTexture,0):B(g.depthTexture,0);const le=k.__webglTexture,K=ht(g),J=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,Q=g.depthTexture.format===jn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===ni)me(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,J,le,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,Q,J,le,0);else if(g.depthTexture.format===jn)me(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,J,le,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,Q,J,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ot(N){const g=n.get(N),F=N.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==N.depthTexture){const V=N.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){const k=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",k)};V.addEventListener("dispose",k),g.__depthDisposeCallback=k}g.__boundDepthTexture=V}if(N.depthTexture&&!g.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)wt(g.__webglFramebuffer[V],N,V);else N.texture.mipmaps.length>0?wt(g.__webglFramebuffer[0],N,0):wt(g.__webglFramebuffer,N,0);else if(F){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=i.createRenderbuffer(),Xt(g.__webglDepthbuffer[V],N,!1);else{const k=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,k,i.RENDERBUFFER,re)}}else if(N.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Xt(g.__webglDepthbuffer,N,!1);else{const k=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,k,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qt(N,g,F){const V=n.get(N);g!==void 0&&Qe(V.__webglFramebuffer,N,N.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Ot(N)}function en(N){const g=N.texture,F=n.get(N),V=n.get(g);N.addEventListener("dispose",U),I(N);const k=N.textures,re=N.isWebGLCubeRenderTarget===!0,le=k.length>1;if(le||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=g.version,a.memory.textures++),re){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(g.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let J=0;J<g.mipmaps.length;J++)F.__webglFramebuffer[K][J]=i.createFramebuffer()}else F.__webglFramebuffer[K]=i.createFramebuffer()}else{if(g.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<g.mipmaps.length;K++)F.__webglFramebuffer[K]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(le)for(let K=0,J=k.length;K<J;K++){const Q=n.get(k[K]);Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture(),a.memory.textures++)}if(N.samples>0&&me(N)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<k.length;K++){const J=k[K];F.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[K]);const Q=r.convert(J.format,J.colorSpace),O=r.convert(J.type),ne=E(J.internalFormat,Q,O,J.normalized,J.colorSpace,N.isXRRenderTarget===!0),j=ht(N);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,ne,N.width,N.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,F.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),N.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(F.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Je(i.TEXTURE_CUBE_MAP,g);for(let K=0;K<6;K++)if(g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)Qe(F.__webglFramebuffer[K][J],N,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else Qe(F.__webglFramebuffer[K],N,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);A(g)?y(i.TEXTURE_CUBE_MAP):g.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,g.mipmaps.length-1),t.unbindTexture()}else if(le){for(let K=0,J=k.length;K<J;K++){const Q=k[K],O=n.get(Q);let ne=i.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ne=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,O.__webglTexture),Je(ne,Q),Qe(F.__webglFramebuffer,N,Q,i.COLOR_ATTACHMENT0+K,ne,0),A(Q)&&y(ne)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(K=N.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,V.__webglTexture),Je(K,g),g.mipmaps.length>0)for(let J=0;J<g.mipmaps.length;J++)Qe(F.__webglFramebuffer[J],N,g,i.COLOR_ATTACHMENT0,K,J);else Qe(F.__webglFramebuffer,N,g,i.COLOR_ATTACHMENT0,K,0);A(g)?y(K):g.mipmaps.length>0&&i.texParameteri(K,i.TEXTURE_MAX_LEVEL,g.mipmaps.length-1),t.unbindTexture()}N.depthBuffer&&Ot(N)}function H(N){const g=N.textures;for(let F=0,V=g.length;F<V;F++){const k=g[F];if(A(k)&&k.mipmapsAutoUpdate===!0){const re=w(N),le=n.get(k).__webglTexture;t.bindTexture(re,le),y(re),t.unbindTexture()}}}const tn=[];function dt(N){if(N.samples>0){if(me(N)===!1){const g=N.textures,F=N.width,V=N.height;let k=i.COLOR_BUFFER_BIT;const re=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(N),K=g.length>1;if(K)for(let Q=0;Q<g.length;Q++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),N.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Q=0;Q<g.length;Q++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(k|=i.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(k|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[Q]);const O=n.get(g[Q]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,F,V,0,0,F,V,k,i.NEAREST),l===!0&&(tn.length=0,tn.push(i.COLOR_ATTACHMENT0+Q),N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&tn.push(re),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let Q=0;Q<g.length;Q++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,le.__webglColorRenderbuffer[Q]);const O=n.get(g[Q]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.storeMultisampledDepthBuffer===!1&&l){const g=N.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function ht(N){return Math.min(s.maxSamples,N.samples)}function me(N){const g=n.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function yt(N){const g=a.render.frame;d.get(N)!==g&&(d.set(N,g),N.update())}function Le(N,g){const F=N.colorSpace,V=N.format,k=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||F!==Cr&&F!==Jn&&(Ke.getTransfer(F)===rt?(V!==Ln||k!==fn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",F)),g}function Pe(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=Re,this.resetTextureUnits=te,this.getTextureUnits=oe,this.setTextureUnits=_e,this.setTexture2D=B,this.setTexture2DArray=ee,this.setTexture3D=Me,this.setTextureCube=ce,this.rebindTextures=qt,this.setupRenderTarget=en,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=me,this.dispose=P}function Jg(i,e){function t(n,s=Jn){let r;const a=Ke.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Po)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ac)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===bc)return i.BYTE;if(n===wc)return i.SHORT;if(n===Ts)return i.UNSIGNED_SHORT;if(n===Co)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===sn)return i.HALF_FLOAT;if(n===Rc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===Ln)return i.RGBA;if(n===ni)return i.DEPTH_COMPONENT;if(n===jn)return i.DEPTH_STENCIL;if(n===Do)return i.RED;if(n===Io)return i.RED_INTEGER;if(n===pi)return i.RG;if(n===No)return i.RG_INTEGER;if(n===Uo)return i.RGBA_INTEGER;if(n===dr||n===pr||n===mr||n===gr)if(a===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fa||n===Oa||n===Ba||n===za)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Fa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===ka||n===Ha||n===Va||n===Wa||n===Ar||n===Xa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ga||n===ka)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ha)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Va)return r.COMPRESSED_R11_EAC;if(n===Wa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ar)return r.COMPRESSED_RG11_EAC;if(n===Xa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===$a||n===Ya||n===Ka||n===Za||n===Ja||n===Qa||n===ja||n===eo||n===to||n===no||n===io||n===so||n===ro)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$a)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ka)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Za)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ja)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===eo)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===to)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===no)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===io)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===so)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ro)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ao||n===oo||n===lo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ao)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===lo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===co||n===uo||n===Rr||n===ho)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===co)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Rr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ho)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Qg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jg=`
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

}`;class e0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new qc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new dn({vertexShader:Qg,fragmentShader:jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ne(new Qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t0 extends gi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,m=null,f=null;const x=typeof XRWebGLBinding<"u",v=new e0,_={},M=t.getContextAttributes();let A=null,y=null;const w=[],E=[],p=new Oe;let S=null,I=null;const T=new gn;T.viewport=new bt;const D=new gn;D.viewport=new bt;const U=[T,D],R=new hf;let L=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let B=w[ie];return B===void 0&&(B=new na,w[ie]=B),B.getTargetRaySpace()},this.getControllerGrip=function(ie){let B=w[ie];return B===void 0&&(B=new na,w[ie]=B),B.getGripSpace()},this.getHand=function(ie){let B=w[ie];return B===void 0&&(B=new na,w[ie]=B),B.getHandSpace()};function C(ie){const B=E.indexOf(ie.inputSource);if(B===-1)return;const ee=w[B];ee!==void 0&&(ee.update(ie.inputSource,ie.frame,c||a),ee.dispatchEvent({type:ie.type,data:ie.inputSource}))}function z(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",Y);for(let ie=0;ie<w.length;ie++){const B=E[ie];B!==null&&(E[ie]=null,w[ie].disconnect(B))}L=null,P=null,v.reset();for(const ie in _)delete _[ie];if(e.setRenderTarget(A),m=null,u=null,h=null,s=null,y=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(p.width,p.height,!1),I!==null){const ie=I.camera;ie.fov=I.fov,ie.zoom=I.zoom,ie.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",z),s.addEventListener("inputsourceschange",Y),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(p),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Me=null,ce=null;M.depth&&(ce=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?jn:ni,Me=M.stencil?Hi:Dn);const Ce={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(Ce),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new rn(u.textureWidth,u.textureHeight,{format:Ln,type:fn,depthTexture:new Vi(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new rn(m.framebufferWidth,m.framebufferHeight,{format:Ln,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Re.setContext(s),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(ie){for(let B=0;B<ie.removed.length;B++){const ee=ie.removed[B],Me=E.indexOf(ee);Me>=0&&(E[Me]=null,w[Me].disconnect(ee))}for(let B=0;B<ie.added.length;B++){const ee=ie.added[B];let Me=E.indexOf(ee);if(Me===-1){for(let Ce=0;Ce<w.length;Ce++)if(Ce>=E.length){E.push(ee),Me=Ce;break}else if(E[Ce]===null){E[Ce]=ee,Me=Ce;break}if(Me===-1)break}const ce=w[Me];ce&&ce.connect(ee)}}function q(ie,B){B===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(B.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;let B=ie.near,ee=ie.far;v.texture!==null&&(v.depthNear>0&&(B=v.depthNear),v.depthFar>0&&(ee=v.depthFar)),R.near=D.near=T.near=B,R.far=D.far=T.far=ee,(L!==R.near||P!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),L=R.near,P=R.far),R.layers.mask=ie.layers.mask|6,T.layers.mask=R.layers.mask&-5,D.layers.mask=R.layers.mask&-3;const Me=ie.parent,ce=R.cameras;q(R,Me);for(let Ce=0;Ce<ce.length;Ce++)q(ce[Ce],Me);R.projectionMatrix.copy(T.projectionMatrix),R.projectionMatrixInverse.copy(T.projectionMatrixInverse),I===null&&ie.isPerspectiveCamera&&(I={camera:ie,fov:ie.fov,zoom:ie.zoom}),te(ie,R,Me)};function te(ie,B,ee){ee===null?ie.matrix.copy(B.matrixWorld):(ie.matrix.copy(ee.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(B.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(B.projectionMatrix),ie.projectionMatrixInverse.copy(B.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Rs*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(ie){l=ie,u!==null&&(u.fixedFoveation=ie),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ie)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(R)},this.getCameraTexture=function(ie){return _[ie]};let oe=null;function _e(ie,B){if(d=B.getViewerPose(c||a),f=B,d!==null){const ee=d.views;m!==null&&(e.setRenderTargetFramebuffer(y,m.framebuffer),e.setRenderTarget(y));let Me=!1;ee.length!==R.cameras.length&&(R.cameras.length=0,Me=!0);for(let Ae=0;Ae<ee.length;Ae++){const Je=ee[Ae];let et=null;if(m!==null)et=m.getViewport(Je);else{const _t=h.getViewSubImage(u,Je);et=_t.viewport,Ae===0&&(e.setRenderTargetTextures(y,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(y))}let Be=U[Ae];Be===void 0&&(Be=new gn,Be.layers.enable(Ae),Be.viewport=new bt,U[Ae]=Be),Be.matrix.fromArray(Je.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Je.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(et.x,et.y,et.width,et.height),Ae===0&&(R.matrix.copy(Be.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Me===!0&&R.cameras.push(Be)}const ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=n.getBinding();const Ae=h.getDepthInformation(ee[0]);Ae&&Ae.isValid&&Ae.texture&&v.init(Ae,s.renderState)}if(ce&&ce.includes("camera-access")&&x){e.state.unbindTexture(),h=n.getBinding();for(let Ae=0;Ae<ee.length;Ae++){const Je=ee[Ae].camera;if(Je){let et=_[Je];et||(et=new qc,_[Je]=et);const Be=h.getCameraImage(Je);et.sourceTexture=Be}}}}for(let ee=0;ee<w.length;ee++){const Me=E[ee],ce=w[ee];Me!==null&&ce!==void 0&&ce.update(Me,B,c||a)}oe&&oe(ie,B),B.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:B}),f=null}const Re=new Jc;Re.setAnimationLoop(_e),this.setAnimationLoop=function(ie){oe=ie},this.dispose=function(){}}}const n0=new ot,ou=new Ge;ou.set(-1,0,0,0,1,0,0,0,1);function i0(i,e){function t(v,_){v.matrixAutoUpdate===!0&&v.updateMatrix(),_.value.copy(v.matrix)}function n(v,_){_.color.getRGB(v.fogColor.value,$c(i)),_.isFog?(v.fogNear.value=_.near,v.fogFar.value=_.far):_.isFogExp2&&(v.fogDensity.value=_.density)}function s(v,_,M,A,y){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?r(v,_):_.isMeshLambertMaterial?(r(v,_),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(r(v,_),h(v,_)):_.isMeshPhongMaterial?(r(v,_),d(v,_),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(r(v,_),u(v,_),_.isMeshPhysicalMaterial&&m(v,_,y)):_.isMeshMatcapMaterial?(r(v,_),f(v,_)):_.isMeshDepthMaterial?r(v,_):_.isMeshDistanceMaterial?(r(v,_),x(v,_)):_.isMeshNormalMaterial?r(v,_):_.isLineBasicMaterial?(a(v,_),_.isLineDashedMaterial&&o(v,_)):_.isPointsMaterial?l(v,_,M,A):_.isSpriteMaterial?c(v,_):_.isShadowMaterial?(v.color.value.copy(_.color),v.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(v,_){v.opacity.value=_.opacity,_.color&&v.diffuse.value.copy(_.color),_.emissive&&v.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.bumpMap&&(v.bumpMap.value=_.bumpMap,t(_.bumpMap,v.bumpMapTransform),v.bumpScale.value=_.bumpScale,_.side===nn&&(v.bumpScale.value*=-1)),_.normalMap&&(v.normalMap.value=_.normalMap,t(_.normalMap,v.normalMapTransform),v.normalScale.value.copy(_.normalScale),_.side===nn&&v.normalScale.value.negate()),_.displacementMap&&(v.displacementMap.value=_.displacementMap,t(_.displacementMap,v.displacementMapTransform),v.displacementScale.value=_.displacementScale,v.displacementBias.value=_.displacementBias),_.emissiveMap&&(v.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,v.emissiveMapTransform)),_.specularMap&&(v.specularMap.value=_.specularMap,t(_.specularMap,v.specularMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest);const M=e.get(_),A=M.envMap,y=M.envMapRotation;A&&(v.envMap.value=A,v.envMapRotation.value.setFromMatrix4(n0.makeRotationFromEuler(y)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(ou),v.reflectivity.value=_.reflectivity,v.ior.value=_.ior,v.refractionRatio.value=_.refractionRatio),_.lightMap&&(v.lightMap.value=_.lightMap,v.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,v.lightMapTransform)),_.aoMap&&(v.aoMap.value=_.aoMap,v.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,v.aoMapTransform))}function a(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform))}function o(v,_){v.dashSize.value=_.dashSize,v.totalSize.value=_.dashSize+_.gapSize,v.scale.value=_.scale}function l(v,_,M,A){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.size.value=_.size*M,v.scale.value=A*.5,_.map&&(v.map.value=_.map,t(_.map,v.uvTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function c(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.rotation.value=_.rotation,_.map&&(v.map.value=_.map,t(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,t(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function d(v,_){v.specular.value.copy(_.specular),v.shininess.value=Math.max(_.shininess,1e-4)}function h(v,_){_.gradientMap&&(v.gradientMap.value=_.gradientMap)}function u(v,_){v.metalness.value=_.metalness,_.metalnessMap&&(v.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,v.metalnessMapTransform)),v.roughness.value=_.roughness,_.roughnessMap&&(v.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,v.roughnessMapTransform)),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)}function m(v,_,M){v.ior.value=_.ior,_.diffuseRoughness>0&&(v.diffuseRoughness.value=_.diffuseRoughness,_.diffuseRoughnessMap&&(v.diffuseRoughnessMap.value=_.diffuseRoughnessMap,t(_.diffuseRoughnessMap,v.diffuseRoughnessMapTransform))),_.sheen>0&&(v.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),v.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(v.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,v.sheenColorMapTransform)),_.sheenRoughnessMap&&(v.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,v.sheenRoughnessMapTransform))),_.clearcoat>0&&(v.clearcoat.value=_.clearcoat,v.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(v.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,v.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(v.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===nn&&v.clearcoatNormalScale.value.negate())),_.dispersion>0&&(v.dispersion.value=_.dispersion),_.retroreflectivity>0&&(v.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(v.iridescence.value=_.iridescence,v.iridescenceIOR.value=_.iridescenceIOR,v.iridescenceThicknessMinimum.value=_.iridescenceThicknessMinimum,v.iridescenceThicknessMaximum.value=_.iridescenceThicknessMaximum,_.iridescenceMap&&(v.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,v.iridescenceMapTransform)),_.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),_.transmission>0&&(v.transmission.value=_.transmission,v.transmissionSamplerMap.value=M.texture,v.transmissionSamplerSize.value.set(M.width,M.height),_.transmissionMap&&(v.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,v.transmissionMapTransform)),v.thickness.value=_.thickness,_.thicknessMap&&(v.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=_.attenuationDistance,v.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(v.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(v.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=_.specularIntensity,v.specularColor.value.copy(_.specularColor),_.specularColorMap&&(v.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,v.specularColorMapTransform)),_.specularIntensityMap&&(v.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,v.specularIntensityMapTransform))}function f(v,_){_.matcap&&(v.matcap.value=_.matcap)}function x(v,_){const M=e.get(_).light;v.referencePosition.value.setFromMatrixPosition(M.matrixWorld),v.nearDistance.value=M.shadow.camera.near,v.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function s0(i,e,t,n){let s={},r={};function a(M,A){const y=A.program;n.uniformBlockBinding(M,y,s[M.id])}function o(M,A){let y=s[M.id];y===void 0&&(f(M),y=l(M),s[M.id]=y,M.addEventListener("dispose",v));const w=A.program;n.updateUBOMapping(M,w);const E=e.render.frame;r[M.id]!==E&&(c(M),r[M.id]=E)}function l(M){const A=i.createBuffer(),y=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,y,w),i.bindBuffer(i.UNIFORM_BUFFER,null),A}function c(M){const A=s[M.id],y=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let E=0,p=y.length;E<p;E++){const S=y[E];if(Array.isArray(S))for(let I=0,T=S.length;I<T;I++)d(S[I],E,I,w);else d(S,E,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,A,y,w){if(u(M,A,y,w)===!0){const E=M.__offset,p=M.value;if(Array.isArray(p)){let S=0;for(let I=0;I<p.length;I++){const T=p[I],D=x(T,!0);h(T,M.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else h(p,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,M.__data)}}function h(M,A,y){typeof M=="number"||typeof M=="boolean"?A[y]=M:M.isMatrix3?(A[y]=M.elements[0],A[y+1]=M.elements[1],A[y+2]=M.elements[2],A[y+3]=0,A[y+4]=M.elements[3],A[y+5]=M.elements[4],A[y+6]=M.elements[5],A[y+7]=0,A[y+8]=M.elements[6],A[y+9]=M.elements[7],A[y+10]=M.elements[8],A[y+11]=0):ArrayBuffer.isView(M)?A.set(M.subarray(0,A.length-y),y):M.toArray(A,y)}function u(M,A,y,w){const E=M.value,p=A+"_"+y;if(Array.isArray(E)){w[p]===void 0&&(w[p]=[]);const S=w[p];let I=!1;for(let T=0;T<E.length;T++)m(E[T],S,T)===!0&&(I=!0);return I}return m(E,w,p)}function m(M,A,y){if(A[y]===void 0)return typeof M=="number"||typeof M=="boolean"?A[y]=M:ArrayBuffer.isView(M)?A[y]=M.slice():A[y]=M.clone(),!0;{const w=A[y];if(typeof M=="number"||typeof M=="boolean"){if(w!==M)return A[y]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(w.equals(M)===!1)return w.copy(M),!0}}return!1}function f(M){const A=M.uniforms;let y=0;const w=16;for(let p=0,S=A.length;p<S;p++){const I=Array.isArray(A[p])?A[p]:[A[p]];for(let T=0,D=I.length;T<D;T++){const U=I[T],R=Array.isArray(U.value)?U.value:[U.value],L=Array.isArray(A[p])||Array.isArray(U.value);let P=y;for(let z=0,Y=R.length;z<Y;z++){const q=R[z],te=x(q,L),oe=y%w,_e=oe%te.boundary,Re=oe+_e;y+=_e,Re!==0&&w-Re<te.storage&&(y+=w-Re),z===0&&(P=y),y+=te.storage}const C=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new C((y-P)/Float32Array.BYTES_PER_ELEMENT),U.__offset=P}}const E=y%w;return E>0&&(y+=w-E),M.__size=y,M.__cache={},this}function x(M,A){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=16,y.storage=48):M.isMatrix4?(y.boundary=16,y.storage=64):M.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(y.boundary=16,y.storage=M.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",M),A===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function v(M){const A=M.target;A.removeEventListener("dispose",v),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function _(){for(const M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:_}}const r0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rn=null;function a0(){return Rn===null&&(Rn=new Vc(r0,16,16,pi,sn),Rn.name="DFG_LUT",Rn.minFilter=Jt,Rn.magFilter=Jt,Rn.wrapS=zn,Rn.wrapT=zn,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}class o0{constructor(e={}){const{canvas:t=ph(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:m=fn}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const x=m,v=new Set([Uo,No,Io]),_=new Set([fn,Dn,Ts,Hi,Po,Lo]),M=new Uint32Array(4),A=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]};let w=null,E=null;const p=[],S=[];let I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let D=!1,U=null,R=null,L=null,P=null;this._outputColorSpace=hn;let C=0,z=0,Y=null,q=-1,te=null;const oe=new bt,_e=new bt;let Re=null;const ie=new ke(0);let B=0,ee=t.width,Me=t.height,ce=1,Ce=null,st=null;const Ae=new bt(0,0,ee,Me),Je=new bt(0,0,ee,Me);let et=!1;const Be=new Cs,_t=new Go;let ut=!1,qe=!1;const Qe=new ot,Xt=new W,wt=new bt,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function en(){return Y===null?ce:1}let H=n;function tn(b,G){return t.getContext(b,G)}let dt,ht,me,yt,Le,Pe,N,g,F,V,k,re,le,K,J,Q,O,ne,j,fe,he,de,Te;try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mo}`),t.addEventListener("webglcontextlost",De,!1),t.addEventListener("webglcontextrestored",He,!1),t.addEventListener("webglcontextcreationerror",ve,!1),H===null){const G="webgl2";if(H=tn(G,b),H===null)throw tn(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(b){throw t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",He,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),nt("WebGLRenderer: "+b.message),b}function Ve(){dt=new um(H),dt.init(),he=new Jg(H,dt),ht=new jp(H,dt,e,he),me=new Kg(H,dt),ht.reversedDepthBuffer&&u&&me.buffers.depth.setReversed(!0),R=H.createFramebuffer(),L=H.createFramebuffer(),P=H.createFramebuffer(),yt=new dm(H),Le=new Ug,Pe=new Zg(H,dt,me,Le,ht,he,yt),N=new cm(T),g=new mf(H),de=new Jp(H,g),F=new hm(H,g,yt,de),V=new mm(H,F,g,de,yt),ne=new pm(H,ht,Pe),J=new em(Le),k=new Ng(T,N,dt,ht,de,J),re=new i0(T,Le),le=new Og,K=new Vg(dt),O=new Zp(T,N,me,V,f,l),Q=new Yg(T,V,ht),Te=new s0(H,yt,ht,me),j=new Qp(H,dt,yt),fe=new fm(H,dt,yt),yt.programs=k.programs,T.capabilities=ht,T.extensions=dt,T.properties=Le,T.renderLists=le,T.shadowMap=Q,T.state=me,T.info=yt}x!==fn&&(I=new _m(x,t.width,t.height,o,s,r));const ue=new t0(T,H);this.xr=ue,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const b=dt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=dt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(b){b!==void 0&&(ce=b,this.setSize(ee,Me,!1))},this.getSize=function(b){return b.set(ee,Me)},this.setSize=function(b,G,Z=!0){if(ue.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ee=b,Me=G,t.width=Math.floor(b*ce),t.height=Math.floor(G*ce),Z===!0&&(t.style.width=b+"px",t.style.height=G+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(ee*ce,Me*ce).floor()},this.setDrawingBufferSize=function(b,G,Z){ee=b,Me=G,ce=Z,t.width=Math.floor(b*Z),t.height=Math.floor(G*Z),this.setViewport(0,0,b,G)},this.setEffects=function(b){if(x===fn){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let G=0;G<b.length;G++)if(b[G].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(oe)},this.getViewport=function(b){return b.copy(Ae)},this.setViewport=function(b,G,Z,X){b.isVector4?Ae.set(b.x,b.y,b.z,b.w):Ae.set(b,G,Z,X),me.viewport(oe.copy(Ae).multiplyScalar(en()).round())},this.getScissor=function(b){return b.copy(Je)},this.setScissor=function(b,G,Z,X){b.isVector4?Je.set(b.x,b.y,b.z,b.w):Je.set(b,G,Z,X),me.scissor(_e.copy(Je).multiplyScalar(en()).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(b){me.setScissorTest(et=b)},this.setOpaqueSort=function(b){Ce=b},this.setTransparentSort=function(b){st=b},this.getClearColor=function(b){return b.copy(O.getClearColor())},this.setClearColor=function(){O.setClearColor(...arguments)},this.getClearAlpha=function(){return O.getClearAlpha()},this.setClearAlpha=function(){O.setClearAlpha(...arguments)},this.clear=function(b=!0,G=!0,Z=!0){let X=0;if(b){let $=!1;if(Y!==null){const ge=Y.texture.format;$=v.has(ge)}if($){const ge=Y.texture.type,ye=_.has(ge),pe=O.getClearColor(),Se=O.getClearAlpha(),we=pe.r,ze=pe.g,$e=pe.b;ye?(M[0]=we,M[1]=ze,M[2]=$e,M[3]=Se,H.clearBufferuiv(H.COLOR,0,M)):(A[0]=we,A[1]=ze,A[2]=$e,A[3]=Se,H.clearBufferiv(H.COLOR,0,A))}else X|=H.COLOR_BUFFER_BIT}G&&(X|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(X|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&H.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),U=b},this.dispose=function(){t.removeEventListener("webglcontextlost",De,!1),t.removeEventListener("webglcontextrestored",He,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),O.dispose(),le.dispose(),K.dispose(),Pe.dispose(),Le.dispose(),N.dispose(),V.dispose(),F.dispose(),de.dispose(),Te.dispose(),k.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",nl),ue.removeEventListener("sessionend",il),ri.stop()};function De(b){b.preventDefault(),vl("WebGLRenderer: Context Lost."),D=!0}function He(){vl("WebGLRenderer: Context Restored."),D=!1;const b=yt.autoReset,G=Q.enabled,Z=Q.autoUpdate,X=Q.needsUpdate,$=Q.type;Ve(),yt.autoReset=b,Q.enabled=G,Q.autoUpdate=Z,Q.needsUpdate=X,Q.type=$}function ve(b){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function at(b){const G=b.target;G.removeEventListener("dispose",at),Lt(G)}function Lt(b){Vn(b),Le.remove(b)}function Vn(b){const G=Le.get(b).programs;G!==void 0&&(G.forEach(function(Z){k.releaseProgram(Z)}),b.isShaderMaterial&&k.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,Z,X,$,ge){G===null&&(G=Ot);const ye=$.isMesh&&$.matrixWorld.determinantAffine()<0,pe=Lu(b,G,Z,X,$);me.setMaterial(X,ye);let Se=Z.index,we=1;if(X.wireframe===!0){if(Se=F.getWireframeAttribute(Z),Se===void 0)return;we=2}const ze=Z.drawRange,$e=Z.attributes.position;let Ee=ze.start*we,Ye=(ze.start+ze.count)*we;ge!==null&&(Ee=Math.max(Ee,ge.start*we),Ye=Math.min(Ye,(ge.start+ge.count)*we)),Se!==null?(Ee=Math.max(Ee,0),Ye=Math.min(Ye,Se.count)):$e!=null&&(Ee=Math.max(Ee,0),Ye=Math.min(Ye,$e.count));const Tt=Ye-Ee;if(Tt<0||Tt===1/0)return;de.setup($,X,pe,Z,Se);let pt,ft=j;if(Se!==null&&(pt=g.get(Se),ft=fe,ft.setIndex(pt)),$.isMesh)X.wireframe===!0?(me.setLineWidth(X.wireframeLinewidth*en()),ft.setMode(H.LINES)):ft.setMode(H.TRIANGLES);else if($.isLine){let Bt=X.linewidth;Bt===void 0&&(Bt=1),me.setLineWidth(Bt*en()),$.isLineSegments?ft.setMode(H.LINES):$.isLineLoop?ft.setMode(H.LINE_LOOP):ft.setMode(H.LINE_STRIP)}else $.isPoints?ft.setMode(H.POINTS):$.isSprite&&ft.setMode(H.TRIANGLES);if($.isBatchedMesh)if(dt.get("WEBGL_multi_draw"))ft.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Bt=$._multiDrawStarts,be=$._multiDrawCounts,$t=$._multiDrawCount,tt=Se?g.get(Se).bytesPerElement:1,ai=Le.get(X).currentProgram.getUniforms();for(let zt=0;zt<$t;zt++)ai.setValue(H,"_gl_DrawID",zt),ft.render(Bt[zt]/tt,be[zt])}else if($.isInstancedMesh)ft.renderInstances(Ee,Tt,$.count);else if(Z.isInstancedBufferGeometry){const Bt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,be=Math.min(Z.instanceCount,Bt);ft.renderInstances(Ee,Tt,be)}else ft.render(Ee,Tt)};function tl(b,G,Z,X){U!==null&&b.isNodeMaterial&&U.setObject(X,b),ut===!0&&J.setState(b,Z,!1),b.transparent===!0&&b.side===yn&&b.forceSinglePass===!1?(b.side=nn,b.needsUpdate=!0,ts(b,G,X),b.side=di,b.needsUpdate=!0,ts(b,G,X),b.side=yn):ts(b,G,X)}this.compile=function(b,G,Z=null){Z===null&&(Z=b),U!==null&&U.renderStart(b,G,Z),E=K.get(Z),E.init(G),S.push(E),Z.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),b!==Z&&b.traverseVisible(function($){$.isLight&&$.layers.test(G.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),qe=this.localClippingEnabled,ut=J.init(this.clippingPlanes,qe),ut===!0&&J.setGlobalState(this.clippingPlanes,G),U!==null&&Q.render(E.state.shadowsArray,Z,G);const X=new Set;return b.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const ge=$.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){const pe=ge[ye];tl(pe,Z,G,$),X.add(pe)}else tl(ge,Z,G,$),X.add(ge)}),E=S.pop(),U!==null&&U.renderEnd(),X},this.compileAsync=function(b,G,Z=null){const X=this.compile(b,G,Z);return new Promise($=>{function ge(){if(X.forEach(function(ye){const Se=Le.get(ye).currentProgram;(Se===void 0||Se.isReady())&&X.delete(ye)}),X.size===0){$(b);return}setTimeout(ge,10)}dt.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Xr=null;function Cu(b){Xr&&Xr(b)}function nl(){ri.stop()}function il(){ri.start()}const ri=new Jc;ri.setAnimationLoop(Cu),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(b){Xr=b,ue.setAnimationLoop(b),b===null?ri.stop():ri.start()},ue.addEventListener("sessionstart",nl),ue.addEventListener("sessionend",il),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(b,G);const Z=ue.enabled===!0&&ue.isPresenting===!0,X=I!==null&&(Y===null||Z)&&I.begin(T,Y);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(G),G=ue.getCamera()),b.isScene===!0&&b.onBeforeRender(T,b,G,Y),E=K.get(b,S.length),E.init(G),E.state.textureUnits=Pe.getTextureUnits(),S.push(E),Qe.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),G.isArrayCamera?_t.setFromArrayCamera(G):Be.setFromProjectionMatrix(Qe,wn,G.reversedDepth),qe=this.localClippingEnabled,ut=J.init(this.clippingPlanes,qe),w=le.get(b,p.length),w.init(),p.push(w),this.info.render.frame++,ue.enabled===!0&&ue.isPresenting===!0){const ye=T.xr.getDepthSensingMesh();ye!==null&&qr(ye,G,-1/0,T.sortObjects)}qr(b,G,0,T.sortObjects),w.finish(),U!==null&&U.updateLights(E.state.lightsArray),T.sortObjects===!0&&w.sort(Ce,st),qt=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,qt&&O.addToRenderList(w,b),this.info.autoReset===!0&&this.info.reset(),ut===!0&&J.beginShadows();const $=E.state.shadowsArray;if(Q.render($,b,G),ut===!0&&J.endShadows(),(X&&I.hasRenderPass())===!1){const ye=w.opaque,pe=w.transmissive;if(E.setupLights(),G.isArrayCamera){const Se=G.cameras;if(pe.length>0)for(let we=0,ze=Se.length;we<ze;we++){const $e=Se[we];rl(ye,pe,b,$e)}qt&&O.render(b);for(let we=0,ze=Se.length;we<ze;we++){const $e=Se[we];sl(w,b,$e,$e.viewport)}}else pe.length>0&&rl(ye,pe,b,G),qt&&O.render(b),sl(w,b,G)}Y!==null&&z===0&&(Pe.updateMultisampleRenderTarget(Y),Pe.updateRenderTargetMipmap(Y)),X&&I.end(T),b.isScene===!0&&b.onAfterRender(T,b,G),de.resetDefaultState(),q=-1,te=null,S.pop(),S.length>0?(E=S[S.length-1],Pe.setTextureUnits(E.state.textureUnits),ut===!0&&J.setGlobalState(T.clippingPlanes,E.state.camera)):E=null,p.pop(),p.length>0?w=p[p.length-1]:w=null,U!==null&&U.renderEnd()};function qr(b,G,Z,X){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){const ye=G.isArrayCamera?_t:Be;if(!b.frustumCulled||b.intersectsFrustum(ye)){X&&wt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Qe);const pe=V.update(b),Se=b.material;Se.visible&&w.push(b,pe,Se,Z,wt.z,null,G)}}else if(b.isMesh||b.isLine||b.isPoints){const ye=G.isArrayCamera?_t:Be;if(!b.frustumCulled||b.intersectsFrustum(ye)){const pe=V.update(b),Se=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),wt.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),wt.copy(pe.boundingSphere.center)),wt.applyMatrix4(b.matrixWorld).applyMatrix4(Qe)),Array.isArray(Se)){const we=pe.groups;for(let ze=0,$e=we.length;ze<$e;ze++){const Ee=we[ze],Ye=Se[Ee.materialIndex];Ye&&Ye.visible&&w.push(b,pe,Ye,Z,wt.z,Ee,G)}}else Se.visible&&w.push(b,pe,Se,Z,wt.z,null,G)}}}const ge=b.children;for(let ye=0,pe=ge.length;ye<pe;ye++)qr(ge[ye],G,Z,X)}function sl(b,G,Z,X){const{opaque:$,transmissive:ge,transparent:ye}=b;E.setupLightsView(Z),ut===!0&&J.setGlobalState(T.clippingPlanes,Z),X&&me.viewport(oe.copy(X)),$.length>0&&Ns($,G,Z),ge.length>0&&Ns(ge,G,Z),ye.length>0&&Ns(ye,G,Z),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function rl(b,G,Z,X){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[X.id]===void 0){const Ee=dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[X.id]=new rn(1,1,{generateMipmaps:!0,type:Ee?sn:fn,minFilter:Qn,samples:Math.max(4,ht.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const ge=E.state.transmissionRenderTarget[X.id],ye=X.viewport||oe;ge.setSize(ye.z*T.transmissionResolutionScale,ye.w*T.transmissionResolutionScale);const pe=T.getRenderTarget(),Se=T.getActiveCubeFace(),we=T.getActiveMipmapLevel();T.setRenderTarget(ge),T.getClearColor(ie),B=T.getClearAlpha(),B<1&&T.setClearColor(16777215,.5),T.clear(),qt&&O.render(Z);const ze=T.toneMapping;T.toneMapping=Gn;const $e=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),E.setupLightsView(X),ut===!0&&J.setGlobalState(T.clippingPlanes,X),Ns(b,Z,X),Pe.updateMultisampleRenderTarget(ge),Pe.updateRenderTargetMipmap(ge),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ye=0,Tt=G.length;Ye<Tt;Ye++){const pt=G[Ye],{object:ft,geometry:Bt,material:be,group:$t}=pt;if(be.side===yn&&ft.layers.test(X.layers)){const tt=be.side;be.side=nn,be.needsUpdate=!0,al(ft,Z,X,Bt,be,$t),be.side=tt,be.needsUpdate=!0,Ee=!0}}Ee===!0&&(Pe.updateMultisampleRenderTarget(ge),Pe.updateRenderTargetMipmap(ge))}T.setRenderTarget(pe,Se,we),T.setClearColor(ie,B),$e!==void 0&&(X.viewport=$e),T.toneMapping=ze}function Ns(b,G,Z){const X=G.isScene===!0?G.overrideMaterial:null;for(let $=0,ge=b.length;$<ge;$++){const ye=b[$],{object:pe,geometry:Se,group:we}=ye;let ze=ye.material;ze.allowOverride===!0&&X!==null&&(ze=X),pe.layers.test(Z.layers)&&al(pe,G,Z,Se,ze,we)}}function al(b,G,Z,X,$,ge){U!==null&&$.isNodeMaterial&&U.setObject(b,$),b.onBeforeRender(T,G,Z,X,$,ge),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),$.onBeforeRender(T,G,Z,X,b,ge),$.transparent===!0&&$.side===yn&&$.forceSinglePass===!1?($.side=nn,$.needsUpdate=!0,T.renderBufferDirect(Z,G,X,$,b,ge),$.side=di,$.needsUpdate=!0,T.renderBufferDirect(Z,G,X,$,b,ge),$.side=yn):T.renderBufferDirect(Z,G,X,$,b,ge),b.onAfterRender(T,G,Z,X,$,ge)}function ol(b){let G=0;for(const Z of b)Z.texture!==null&&G++;return G}function ts(b,G,Z){G.isScene!==!0&&(G=Ot);const X=Le.get(b),$=E.state.lights,ge=E.state.shadowsArray,ye=$.state.version,pe=k.getParameters(b,$.state,ge,G,Z,E.state.lightProbeGridArray),Se=k.getProgramCacheKey(pe);let we=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?G.environment:null,X.fog=G.fog;const ze=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=N.get(b.envMap||X.environment,ze),X.envMapRotation=X.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,we===void 0&&(b.addEventListener("dispose",at),we=new Map,X.programs=we,X.programVariants=new Map);let $e=we.get(Se);if($e!==void 0){if(X.currentProgram===$e&&X.lightsStateVersion===ye)return cl(b,pe),$e}else pe.uniforms=k.getUniforms(b),U!==null&&b.isNodeMaterial&&U.build(b,Z,pe),b.onBeforeCompile(pe,T),$e=k.acquireProgram(pe,Se),we.set(Se,$e),X.uniforms=pe.uniforms;const Ee=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ee.clippingPlanes=J.uniform),cl(b,pe),X.needsLights=Iu(b),X.lightsStateVersion=ye,X.needsLights&&(Ee.ambientLightColor.value=$.state.ambient,Ee.lightProbe.value=$.state.probe,Ee.sunLights.value=$.state.sun,Ee.sunLightShadows.value=$.state.sunShadow,Ee.directionalLights.value=$.state.directional,Ee.directionalLightShadows.value=$.state.directionalShadow,Ee.spotLights.value=$.state.spot,Ee.spotLightShadows.value=$.state.spotShadow,Ee.rectAreaLights.value=$.state.rectArea,Ee.ltc_1.value=$.state.rectAreaLTC1,Ee.ltc_2.value=$.state.rectAreaLTC2,Ee.pointLights.value=$.state.point,Ee.pointLightShadows.value=$.state.pointShadow,Ee.hemisphereLights.value=$.state.hemi,Ee.sunShadowMatrix.value=$.state.sunShadowMatrix,Ee.sunShadowCascade.value=$.state.sunShadowCascade,Ee.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ee.spotLightMatrix.value=$.state.spotLightMatrix,Ee.spotLightMap.value=$.state.spotLightMap,Ee.pointShadowMatrix.value=$.state.pointShadowMatrix),X.numLightProbeGrids=ol(E.state.lightProbeGridArray),X.currentProgram=$e,X.uniformsList=null,$e}function Pu(b,G,Z,X,$){const ge=Le.get(b),ye=ge.currentProgram.id+","+X+","+$;let pe=ge.programVariants.get(ye);return pe===void 0?(pe=ts(b,G,Z),ge.programVariants.set(ye,pe)):(ge.currentProgram=pe,ge.uniformsList=null,ge.outputColorSpace=X,ge.toneMapping=$),pe}function ll(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=xr.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function cl(b,G){const Z=Le.get(b);Z.outputColorSpace=G.outputColorSpace,Z.batching=G.batching,Z.batchingColor=G.batchingColor,Z.instancing=G.instancing,Z.instancingColor=G.instancingColor,Z.instancingMorph=G.instancingMorph,Z.skinning=G.skinning,Z.morphTargets=G.morphTargets,Z.morphNormals=G.morphNormals,Z.morphColors=G.morphColors,Z.morphTargetsCount=G.morphTargetsCount,Z.numClippingPlanes=G.numClippingPlanes,Z.numIntersection=G.numClipIntersection,Z.vertexAlphas=G.vertexAlphas,Z.vertexTangents=G.vertexTangents,Z.toneMapping=G.toneMapping}function Lu(b,G,Z,X,$){G.isScene!==!0&&(G=Ot),Pe.resetTextureUnits();const ge=G.fog,ye=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?G.environment:null,pe=Y===null?T.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ke.workingColorSpace,Se=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,we=N.get(X.envMap||ye,Se),ze=X.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,$e=!!Z.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ee=!!Z.morphAttributes.position,Ye=!!Z.morphAttributes.normal,Tt=!!Z.morphAttributes.color;let pt=Gn;X.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(pt=T.toneMapping);const ft=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Bt=ft!==void 0?ft.length:0,be=Le.get(X),$t=E.state.lights;if(ut===!0&&(qe===!0||b!==te)){const vt=b===te&&X.id===q;J.setState(X,b,vt)}let tt=!1,ai=!1;X.version===be.__version?be.needsLights&&be.lightsStateVersion!==$t.state.version||$.isBatchedMesh&&be.batching===!1||!$.isBatchedMesh&&be.batching===!0||$.isBatchedMesh&&be.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&be.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&be.instancing===!1||!$.isInstancedMesh&&be.instancing===!0||$.isSkinnedMesh&&be.skinning===!1||!$.isSkinnedMesh&&be.skinning===!0||$.isInstancedMesh&&be.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&be.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&be.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&be.instancingMorph===!1&&$.morphTexture!==null||be.envMap!==we||X.fog===!0&&be.fog!==ge||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==J.numPlanes||be.numIntersection!==J.numIntersection)||be.vertexAlphas!==ze||be.vertexTangents!==$e||be.morphTargets!==Ee||be.morphNormals!==Ye||be.morphColors!==Tt||be.morphTargetsCount!==Bt||be.numLightProbeGrids!==ol(E.state.lightProbeGridArray)?tt=!0:(be.outputColorSpace!==pe||be.toneMapping!==pt)&&(ai=!0):(tt=!0,be.__version=X.version);let zt=be.currentProgram;(tt===!0||ai===!0)&&(zt=ai===!0?Pu(X,G,$,pe,pt):ts(X,G,$),U&&X.isNodeMaterial&&U.onUpdateProgram(X,zt,be));let Us=!1,Wn=!1,oi=!1;const je=zt.getUniforms(),Ut=be.uniforms;if(me.useProgram(zt.program)&&(Us=!0,Wn=!0,oi=!0),X.id!==q&&(q=X.id,Wn=!0),Us||te!==b){me.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),je.setValue(H,"projectionMatrix",b.projectionMatrix),je.setValue(H,"viewMatrix",b.matrixWorldInverse);const Dt=je.map.cameraPosition;Dt!==void 0&&Dt.setValue(H,Xt.setFromMatrixPosition(b.matrixWorld)),ht.logarithmicDepthBuffer&&je.setValue(H,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&je.setValue(H,"isOrthographic",b.isOrthographicCamera===!0),te!==b&&(te=b,Wn=!0,oi=!0)}if(be.needsLights&&($t.state.sunShadowMap.length>0&&je.setValue(H,"sunShadowMap",$t.state.sunShadowMap,Pe),$t.state.directionalShadowMap.length>0&&je.setValue(H,"directionalShadowMap",$t.state.directionalShadowMap,Pe),$t.state.spotShadowMap.length>0&&je.setValue(H,"spotShadowMap",$t.state.spotShadowMap,Pe),$t.state.pointShadowMap.length>0&&je.setValue(H,"pointShadowMap",$t.state.pointShadowMap,Pe)),$.isSkinnedMesh){je.setOptional(H,$,"bindMatrix"),je.setOptional(H,$,"bindMatrixInverse");const vt=$.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),je.setValue(H,"boneTexture",vt.boneTexture,Pe))}$.isBatchedMesh&&(je.setOptional(H,$,"batchingTexture"),je.setValue(H,"batchingTexture",$._matricesTexture,Pe),je.setOptional(H,$,"batchingIdTexture"),je.setValue(H,"batchingIdTexture",$._indirectTexture,Pe),je.setOptional(H,$,"batchingColorTexture"),$._colorsTexture!==null&&je.setValue(H,"batchingColorTexture",$._colorsTexture,Pe));const _n=Z.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&ne.update($,Z,zt),(Wn||be.receiveShadow!==$.receiveShadow)&&(be.receiveShadow=$.receiveShadow,je.setValue(H,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&G.environment!==null&&(Ut.envMapIntensity.value=G.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=a0()),Wn){if(je.setValue(H,"toneMappingExposure",T.toneMappingExposure),be.needsLights&&Du(Ut,oi),ge&&X.fog===!0&&re.refreshFogUniforms(Ut,ge),re.refreshMaterialUniforms(Ut,X,ce,Me,E.state.transmissionRenderTarget[b.id]),be.needsLights&&be.numLightProbeGrids>0){const vt=y;let Dt=0;for(const In of E.state.lightProbeGridArray)In.texture!==null&&(vt.textures[Dt]=In.texture,vt.min[Dt]=In.boundingBox.min,vt.max[Dt]=In.boundingBox.max,vt.resolution[Dt]=In.resolution,Dt++);for(const In in vt)vt[In].length=Dt;Ut.probesSH.value=vt.textures,Ut.probesMin.value=vt.min,Ut.probesMax.value=vt.max,Ut.probesResolution.value=vt.resolution}xr.upload(H,ll(be),Ut,Pe)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(xr.upload(H,ll(be),Ut,Pe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&je.setValue(H,"center",$.center),je.setValue(H,"modelViewMatrix",$.modelViewMatrix),je.setValue(H,"normalMatrix",$.normalMatrix),je.setValue(H,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){const vt=X.uniformsGroups;for(let Dt=0,In=vt.length;Dt<In;Dt++){const hl=vt[Dt];Te.update(hl,zt),Te.bind(hl,zt)}}return zt}function Du(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.sunLights.needsUpdate=G,b.sunLightShadows.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function Iu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(b,G,Z){const X=Le.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Le.get(b.texture).__webglTexture=G,Le.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:Z,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,G){const Z=Le.get(b);Z.__webglFramebuffer=G,Z.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,Z=0){Y=b,C=G,z=Z;let X=null,$=!1,ge=!1;if(b){const pe=Le.get(b);if(pe.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(H.FRAMEBUFFER,pe.__webglFramebuffer),oe.copy(b.viewport),_e.copy(b.scissor),Re=b.scissorTest,me.viewport(oe),me.scissor(_e),me.setScissorTest(Re),q=-1;return}else if(pe.__webglFramebuffer===void 0)Pe.setupRenderTarget(b);else if(pe.__hasExternalTextures)Pe.rebindTextures(b,Le.get(b.texture).__webglTexture,Le.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ze=b.depthTexture;if(pe.__boundDepthTexture!==ze){if(ze!==null&&Le.has(ze)&&(b.width!==ze.image.width||b.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Pe.setupDepthRenderbuffer(b)}}const Se=b.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(ge=!0);const we=Le.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(we[G])?X=we[G][Z]:X=we[G],$=!0):b.samples>0&&Pe.useMultisampledRTT(b)===!1?X=Le.get(b).__webglMultisampledFramebuffer:Array.isArray(we)?X=we[Z]:X=we,oe.copy(b.viewport),_e.copy(b.scissor),Re=b.scissorTest}else oe.copy(Ae).multiplyScalar(ce).floor(),_e.copy(Je).multiplyScalar(ce).floor(),Re=et;if(Z!==0&&(X=R),me.bindFramebuffer(H.FRAMEBUFFER,X)&&me.drawBuffers(b,X),me.viewport(oe),me.scissor(_e),me.setScissorTest(Re),$){const pe=Le.get(b.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,pe.__webglTexture,Z)}else if(ge){const pe=G;for(let Se=0;Se<b.textures.length;Se++){const we=Le.get(b.textures[Se]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Se,we.__webglTexture,Z,pe)}}else if(b!==null&&Z!==0){const pe=Le.get(b.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,pe.__webglTexture,Z)}q=-1};function ul(b){const G=Le.get(b);return(G.__readFormat!==b.format||G.__readType!==b.type)&&(G.__readFormat=b.format,G.__readType=b.type,G.__formatReadable=ht.textureFormatReadable(b.format),G.__typeReadable=ht.textureTypeReadable(b.type)),G}this.readRenderTargetPixels=function(b,G,Z,X,$,ge,ye,pe=0){if(!(b&&b.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(Se=Se[ye],Array.isArray(Se)&&(Se=Se[0])),Se){me.bindFramebuffer(H.FRAMEBUFFER,Se);try{const we=b.textures[pe],ze=we.format,$e=we.type;b.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+pe);const Ee=ul(we);if(Ee.__formatReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-X&&Z>=0&&Z<=b.height-$&&H.readPixels(G,Z,X,$,he.convert(ze),he.convert($e),ge)}finally{const we=Y!==null?Le.get(Y).__webglFramebuffer:null;me.bindFramebuffer(H.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(b,G,Z,X,$,ge,ye,pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ye!==void 0&&(Se=Se[ye],Array.isArray(Se)&&(Se=Se[0])),Se)if(G>=0&&G<=b.width-X&&Z>=0&&Z<=b.height-$){me.bindFramebuffer(H.FRAMEBUFFER,Se);const we=b.textures[pe],ze=we.format,$e=we.type;b.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+pe);const Ee=ul(we);if(Ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Ye),H.bufferData(H.PIXEL_PACK_BUFFER,ge.byteLength,H.STREAM_READ),H.readPixels(G,Z,X,$,he.convert(ze),he.convert($e),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const Tt=Y!==null?Le.get(Y).__webglFramebuffer:null;me.bindFramebuffer(H.FRAMEBUFFER,Tt);const pt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await mh(H,pt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Ye),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,ge),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(Ye),H.deleteSync(pt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,G=null,Z=0){const X=Math.pow(2,-Z),$=Math.floor(b.image.width*X),ge=Math.floor(b.image.height*X),ye=G!==null?G.x:0,pe=G!==null?G.y:0;Pe.setTexture2D(b,0),H.copyTexSubImage2D(H.TEXTURE_2D,Z,0,0,ye,pe,$,ge),me.unbindTexture()},this.copyTextureToTexture=function(b,G,Z=null,X=null,$=0,ge=0){let ye,pe,Se,we,ze,$e,Ee,Ye,Tt;const pt=b.isCompressedTexture?b.mipmaps[ge]:b.image;if(Z!==null)ye=Z.max.x-Z.min.x,pe=Z.max.y-Z.min.y,Se=Z.isBox3?Z.max.z-Z.min.z:1,we=Z.min.x,ze=Z.min.y,$e=Z.isBox3?Z.min.z:0;else{const je=Math.pow(2,-$);ye=Math.floor(pt.width*je),pe=Math.floor(pt.height*je),b.isDataArrayTexture?Se=pt.depth:b.isData3DTexture?Se=Math.floor(pt.depth*je):Se=1,we=0,ze=0,$e=0}X!==null?(Ee=X.x,Ye=X.y,Tt=X.z):(Ee=0,Ye=0,Tt=0);const ft=he.convert(G.format),Bt=he.convert(G.type);let be;G.isData3DTexture?(Pe.setTexture3D(G,0),be=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Pe.setTexture2DArray(G,0),be=H.TEXTURE_2D_ARRAY):(Pe.setTexture2D(G,0),be=H.TEXTURE_2D),me.activeTexture(H.TEXTURE0),me.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),me.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),me.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const $t=me.getParameter(H.UNPACK_ROW_LENGTH),tt=me.getParameter(H.UNPACK_IMAGE_HEIGHT),ai=me.getParameter(H.UNPACK_SKIP_PIXELS),zt=me.getParameter(H.UNPACK_SKIP_ROWS),Us=me.getParameter(H.UNPACK_SKIP_IMAGES);me.pixelStorei(H.UNPACK_ROW_LENGTH,pt.width),me.pixelStorei(H.UNPACK_IMAGE_HEIGHT,pt.height),me.pixelStorei(H.UNPACK_SKIP_PIXELS,we),me.pixelStorei(H.UNPACK_SKIP_ROWS,ze),me.pixelStorei(H.UNPACK_SKIP_IMAGES,$e);const Wn=b.isDataArrayTexture||b.isData3DTexture,oi=G.isDataArrayTexture||G.isData3DTexture;if(b.isDepthTexture){const je=Le.get(b),Ut=Le.get(G),_n=Le.get(je.__renderTarget),vt=Le.get(Ut.__renderTarget);me.bindFramebuffer(H.READ_FRAMEBUFFER,_n.__webglFramebuffer),me.bindFramebuffer(H.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Dt=0;Dt<Se;Dt++)Wn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Le.get(b).__webglTexture,$,$e+Dt),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Le.get(G).__webglTexture,ge,Tt+Dt)),H.blitFramebuffer(we,ze,we+ye,ze+pe,Ee,Ye,Ee+ye,Ye+pe,H.DEPTH_BUFFER_BIT,H.NEAREST);me.bindFramebuffer(H.READ_FRAMEBUFFER,null),me.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if($!==0||b.isRenderTargetTexture||Le.has(b)){const je=Le.get(b),Ut=Le.get(G);me.bindFramebuffer(H.READ_FRAMEBUFFER,L),me.bindFramebuffer(H.DRAW_FRAMEBUFFER,P);for(let _n=0;_n<Se;_n++)Wn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,je.__webglTexture,$,$e+_n):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,je.__webglTexture,$),oi?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ut.__webglTexture,ge,Tt+_n):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ut.__webglTexture,ge),$!==0?H.blitFramebuffer(we,ze,we+ye,ze+pe,Ee,Ye,Ee+ye,Ye+pe,H.COLOR_BUFFER_BIT,H.NEAREST):oi?H.copyTexSubImage3D(be,ge,Ee,Ye,Tt+_n,we,ze,ye,pe):H.copyTexSubImage2D(be,ge,Ee,Ye,we,ze,ye,pe);me.bindFramebuffer(H.READ_FRAMEBUFFER,null),me.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else oi?b.isDataTexture||b.isData3DTexture?H.texSubImage3D(be,ge,Ee,Ye,Tt,ye,pe,Se,ft,Bt,pt.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(be,ge,Ee,Ye,Tt,ye,pe,Se,ft,pt.data):H.texSubImage3D(be,ge,Ee,Ye,Tt,ye,pe,Se,ft,Bt,pt):b.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,ge,Ee,Ye,ye,pe,ft,Bt,pt.data):b.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,ge,Ee,Ye,pt.width,pt.height,ft,pt.data):H.texSubImage2D(H.TEXTURE_2D,ge,Ee,Ye,ye,pe,ft,Bt,pt);me.pixelStorei(H.UNPACK_ROW_LENGTH,$t),me.pixelStorei(H.UNPACK_IMAGE_HEIGHT,tt),me.pixelStorei(H.UNPACK_SKIP_PIXELS,ai),me.pixelStorei(H.UNPACK_SKIP_ROWS,zt),me.pixelStorei(H.UNPACK_SKIP_IMAGES,Us),ge===0&&G.generateMipmaps===!0&&G.mipmapsAutoUpdate===!0&&H.generateMipmap(be),me.unbindTexture()},this.initRenderTarget=function(b){Le.get(b).__webglFramebuffer===void 0&&Pe.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Pe.setTextureCube(b,0):b.isData3DTexture?Pe.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Pe.setTexture2DArray(b,0):Pe.setTexture2D(b,0),me.unbindTexture()},this.resetState=function(){C=0,z=0,Y=null,me.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}function l0(i){const e=new o0({antialias:!0,powerPreference:"high-performance"});e.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),e.setClearColor(329484,1),e.outputColorSpace=hn,i.appendChild(e.domElement);const t=()=>{const n=Math.max(1,i.clientWidth),s=Math.max(1,i.clientHeight);e.setSize(n,s,!1)};return t(),window.addEventListener("resize",t),{renderer:e,resize:t}}function c0(){const i=new Xh;i.background=new ke(395536),i.fog=new zo(395536,48,90);const e=new uf(7902904,1.15),t=new Xl(16767392,2.8);t.position.set(-8,16,10),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.left=-12,t.shadow.camera.right=12,t.shadow.camera.top=12,t.shadow.camera.bottom=-12;const n=new Xl(6004694,.65);n.position.set(9,7,-12);const s=new _s(2424716,1.1,9);s.position.set(-3,2.2,1);const r=new _s(16761402,.9,8);r.position.set(3,2,-1);const a=new _s(16722518,.75,9);a.position.set(Ie*se/2-1,2.4,-Xe*se/2+1),i.add(e,t,n,s,r,a);const o=new ct;o.position.set(-14*se/2,0,-9*se/2),i.add(o);const l=new Ne(new St(Ie*se+.4,fl,Xe*se+.4),new xt({color:3810325,roughness:1,emissive:853506}));l.position.set((Ie-1)*se/2,-fl/2-.85,(Xe-1)*se/2),l.receiveShadow=!0,o.add(l);const c=[e,t,n,s,r,a];return{scene:i,board:o,lightingSnapshot(){const d=[],h=[];let u=0;return i.traverse(m=>{m.castShadow&&m.isMesh&&d.push(m.name||m.type),m.receiveShadow&&m.isMesh&&h.push(m.name||m.type),m.isLight&&m.castShadow&&u++}),{ambient:{color:e.color.getHex(),intensity:e.intensity},digger:{color:t.color.getHex(),intensity:t.intensity},rim:{color:n.color.getHex(),intensity:n.intensity},emerald:{color:s.color.getHex(),intensity:s.intensity,glowIntensity:s.intensity},gold:{color:r.color.getHex(),intensity:r.intensity,glowIntensity:r.intensity},hostile:{color:a.color.getHex(),intensity:a.intensity},shadows:{enabled:t.castShadow,casters:d,receivers:h,effectCount:u,totalLights:c.length},fog:!!i.fog,background:i.background instanceof ke?i.background.getHex():void 0}}}}function u0(){const i=new gn(42,1,.1,200),e=Os.degToRad(40),t=Os.degToRad(52),n=30,s=Math.sin(t)*n,r=Math.sin(e)*Math.cos(t)*n,a=Math.cos(e)*Math.cos(t)*n,o=new W(0,-.2,0);i.position.set(r,s,a),i.lookAt(o);let l=0,c=1,d=0,h=0,u=0;const m=1;return{camera:i,get shakeAmount(){return l},get zoom(){return c},resize:f=>{i.aspect=Math.max(.1,f),i.updateProjectionMatrix()},shake(f){l=Math.min(.6,Math.max(l,Math.max(0,f)))},pulse(f){d=Math.min(.08,Math.max(d,Math.abs(f)))},settle(){h=Math.min(.04,Math.max(h,.03)),d=Math.min(.08,Math.max(d,.015))},update(f){u+=f*40,l=Math.max(0,l-f*3.5);const x=l;return i.position.set(r+Math.sin(u)*x*.35,s+Math.sin(u*1.3)*x*.25,a+Math.cos(u*.9)*x*.35),i.lookAt(o),d=Math.max(0,d-f*.9),h=Math.max(0,h-f*.5),c=m+d*.5+h*.5,i.zoom=c,i.updateProjectionMatrix(),l},snapshot(){i.updateMatrixWorld();const f=Ie*se/2,x=Xe*se/2;let v=1/0,_=-1/0,M=1/0,A=-1/0;for(const w of[-f,f])for(const E of[-x,x]){const p=new W(w,0,E).project(i);v=Math.min(v,p.x),_=Math.max(_,p.x),M=Math.min(M,p.y),A=Math.max(A,p.y)}const y=v>-1&&_<1&&M>-1&&A<1;return{yaw:Os.radToDeg(e),pitch:Os.radToDeg(t),distance:n,orbitEnabled:!1,shake:l,zoom:m+d*.5+h*.5,settle:h,framing:{allVisible:y,margin:Math.max(0,Math.min(1-Math.max(Math.abs(v),Math.abs(_)),1-Math.max(Math.abs(M),Math.abs(A)))),bounds:{minX:v,maxX:_,minY:M,maxY:A}}}}}}const Sr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class es{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const h0=new Vo(-1,1,1,-1,0,1);class f0 extends jt{constructor(){super(),this.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}}const d0=new f0;class Xo{constructor(e){this._mesh=new Ne(d0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,h0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class lu extends es{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof dn?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ls.clone(e.uniforms),this.material=new dn({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Xo(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class pc extends es{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class p0 extends es{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class m0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Oe);this._width=n.width,this._height=n.height,t=new rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new lu(Sr),this.copyPass.material.blending=fi,this.timer=new ff}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}pc!==void 0&&(a instanceof pc?n=!0:a instanceof p0&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class g0 extends es{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new ke}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const _0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ke(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Xi extends es{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new Oe(e.x,e.y):new Oe(256,256),this.clearColor=new ke(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new rn(r,a,{type:sn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new rn(r,a,{type:sn,depthBuffer:!1});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const u=new rn(r,a,{type:sn,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+d,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const o=_0;this.highPassUniforms=Ls.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new dn({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Oe(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ls.clone(Sr.uniforms),this.blendMaterial=new dn({uniforms:this.copyUniforms,vertexShader:Sr.vertexShader,fragmentShader:Sr.fragmentShader,premultipliedAlpha:!0,blending:Ta,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new ke,this._oldClearAlpha=1,this._basic=new Qt,this._fsQuad=new Xo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Oe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Xi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Xi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<e;a+=2){const o=t[a],l=a+1<e?t[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new dn({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Oe(.5,.5)},direction:{value:new Oe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new dn({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Xi.BlurDirectionX=new Oe(1,0);Xi.BlurDirectionY=new Oe(0,1);const lr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class v0 extends es{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ls.clone(lr.uniforms),this.material=new Yc({name:lr.name,uniforms:this.uniforms,vertexShader:lr.vertexShader,fragmentShader:lr.fragmentShader}),this._fsQuad=new Xo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===rt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===yo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Eo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===bo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ao?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ro?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===To&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const x0={name:"VignetteShader",uniforms:{tDiffuse:{value:null},offset:{value:1},darkness:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float offset;
		uniform float darkness;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			// Eskil's vignette

			vec4 texel = texture2D( tDiffuse, vUv );
			vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
			gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );

		}`};function S0(i,e,t){const n=new m0(i);n.addPass(new g0(e,t));const s=new Xi(new Oe(1,1),.42,.35,.82);n.addPass(s);const r=new lu(x0);r.uniforms.offset.value=1.05,r.uniforms.darkness.value=.9,n.addPass(r),n.addPass(new v0);let a=!0;return{render(){a?n.render():i.render(e,t)},setEnabled(o){a=!!o},resize(o,l){n.setSize(Math.max(1,o),Math.max(1,l)),s.setSize(Math.max(1,o),Math.max(1,l))},snapshot(){return{enabled:a,passes:a?["render","bloom","vignette","output"]:[],bloomStrength:s.strength,bloomThreshold:s.threshold,vignetteDarkness:r.uniforms.darkness.value}},dispose(){n.dispose()}}}function cu(i){const e=i>>>0;let t=e;const n=()=>{t=t+1831565813>>>0;let s=t;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296};return{get seed(){return e},next:n,int(s){return s<=0?0:Math.floor(n()*s)%s},range(s,r){return s+n()*(r-s)},chance(s){return n()<s},pick(s){if(s.length===0)throw new Error("rng.pick: empty array");return s[Math.floor(n()*s.length)]},reset(s){t=(s===void 0?e:s)>>>0},fork(s){let r=(e^Math.imul(s>>>0,2654435769))>>>0;return r=Math.imul(r^r>>>16,2246822507)>>>0,r=Math.imul(r^r>>>13,3266489909)>>>0,cu((r^r>>>16)>>>0)},state(){return t>>>0}}}function qo(i=an){return cu(i)}const Ue=qo(an);function Ur(i=an){Ue.reset(i)}function M0(){const i=new Map;return{on(e,t){let n=i.get(e);return n||(n=new Set,i.set(e,n)),n.add(t),()=>this.off(e,t)},off(e,t){i.get(e)?.delete(t)},emit(e,t){const n=i.get(e);if(n)for(const s of[...n])s(t)},clear(){i.clear()}}}function Hr(i){return{phase:"title",level:i.level,score:0,highScore:0,lives:3,bonus:0,bonusActive:!1,chain:0,extraLifeThreshold:2e4,enemyQuota:i.enemyQuota,spawnedEnemies:0,aliveEnemies:0,remainingEmeralds:0,weaponCooldown:0,difficulty:{...i},tick:0,paused:!1,debug:!1,seed:an}}function zi(i,e,t){Ur(an),i.phase="playing",i.level=e.level,i.difficulty={...e},i.enemyQuota=e.enemyQuota,i.spawnedEnemies=0,i.aliveEnemies=0,i.remainingEmeralds=t,i.bonus=0,i.bonusActive=!1,i.chain=0,i.weaponCooldown=0,i.paused=!1,i.tick=0,i.seed=an}function y0(i){return JSON.stringify({phase:i.phase,level:i.level,score:i.score,lives:i.lives,bonus:i.bonus,bonusActive:i.bonusActive,chain:i.chain,enemyQuota:i.enemyQuota,spawnedEnemies:i.spawnedEnemies,aliveEnemies:i.aliveEnemies,remainingEmeralds:i.remainingEmeralds,weaponCooldown:i.weaponCooldown,difficulty:i.difficulty,tick:i.tick,paused:i.paused,seed:i.seed})}function E0(i,e){const t=Math.floor(i.score/2e4);i.score+=e,i.score>i.highScore&&(i.highScore=i.score);const n=Math.floor(i.score/2e4),s=Math.max(0,n-t);return i.lives+=s,i.extraLifeThreshold=(n+1)*2e4,s>0}const Mr=1,yr=4,Gi=1/0;function mt(i,e){return i>=0&&i<Ie&&e>=0&&e<Xe}function Rt(i,e){return e*Ie+i}function Ht(i){switch(i){case"up":return{dx:0,dy:-1};case"down":return{dx:0,dy:1};case"left":return{dx:-1,dy:0};case"right":return{dx:1,dy:0}}}function go(i,e){const{dx:t,dy:n}=Ht(e);return{col:i.col+t,row:i.row+n}}class vi{cols=Ie;rows=Xe;cells;constructor(){this.cells=[],this.clear()}clear(){this.cells=[];for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++)this.cells.push({col:t,row:e,solid:!0,excavated:!1,emerald:!1,bag:!1,cost:yr})}get(e,t){if(!mt(e,t))throw new Error(`Grid.get out of bounds (${e},${t})`);return this.cells[Rt(e,t)]}at(e){return this.get(e.col,e.row)}isSolid(e,t){return!mt(e,t)||this.cells[Rt(e,t)].solid}isExcavated(e,t){return mt(e,t)&&this.cells[Rt(e,t)].excavated}hasEmerald(e,t){return mt(e,t)&&this.cells[Rt(e,t)].emerald}hasBag(e,t){return mt(e,t)&&this.cells[Rt(e,t)].bag}setSolid(e,t,n){if(!mt(e,t))return;const s=this.cells[Rt(e,t)];s.solid=n,s.excavated=!n,s.cost=n?yr:Mr}setEmerald(e,t,n){mt(e,t)&&(this.cells[Rt(e,t)].emerald=n)}setBag(e,t,n){mt(e,t)&&(this.cells[Rt(e,t)].bag=n)}excavate(e,t){if(!mt(e,t))return!1;const n=this.cells[Rt(e,t)];return n.solid?(n.solid=!1,n.excavated=!0,n.cost=Mr,!0):!1}collectEmerald(e,t){return this.hasEmerald(e,t)?(this.cells[Rt(e,t)].emerald=!1,!0):!1}emeraldCount(){let e=0;for(const t of this.cells)t.emerald&&e++;return e}bagCount(){let e=0;for(const t of this.cells)t.bag&&e++;return e}excavatedCount(){let e=0;for(const t of this.cells)t.excavated&&e++;return e}canTraverseTunnel(e,t){return mt(e,t)&&this.cells[Rt(e,t)].excavated}travelCost(e,t,n){return mt(e,t)?this.cells[Rt(e,t)].solid?n?yr:Gi:Mr:Gi}neighbours(e,t){const n=[];for(const s of xc){const r=e.col+s.dx,a=e.row+s.dy;mt(r,a)&&this.travelCost(r,a,t)!==Gi&&n.push({col:r,row:a})}return n}visualPosition(e,t){return{x:e*se,z:t*se}}emeraldPositions(){const e=[];for(const t of this.cells)t.emerald&&e.push({col:t.col,row:t.row});return e}emeraldClusters(){const e=new Set;let t=0;for(const n of this.cells){if(!n.emerald||e.has(Rt(n.col,n.row)))continue;t++;const s=[{col:n.col,row:n.row}];for(e.add(Rt(n.col,n.row));s.length;){const r=s.pop();for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])for(let l=1;l<=2;l++){const c=r.col+a*l,d=r.row+o*l;if(!mt(c,d))break;const h=Rt(c,d);if(!e.has(h)&&this.cells[h].emerald){if(l===2&&!this.cells[Rt(r.col+a,r.row+o)].emerald)break;e.add(h),s.push({col:c,row:d})}}}}return t}snapshot(){const e=[];for(const t of this.cells)e.push(t.bag?"B":t.emerald?"E":t.excavated?".":"#");return e.join("")}clone(){const e=new vi;return e.cells=this.cells.map(t=>({...t})),e}}function b0(i){if(i.length!==Ie)throw new Error(`level row must be ${Ie} chars, got ${i.length}: ${i}`);return i.split("")}function hs(i){if(i.length!==Xe)throw new Error(`level needs ${Xe} rows, got ${i.length}`);return i.map(e=>b0(e).join(""))}const Er=[{id:1,name:"First Descent",layout:hs(["#############X#","###########...#","##EE##EE#.###E#","##########.####","#P.........####","##.###B###.####","##E####..##E###","##.##.E.##.####","##.........####","###############"]),playerStart:{col:1,row:4},enemyEntry:{col:13,row:0},enemyQuota:6,maxActiveEnemies:3,spawnDelay:3.2,enemySpeed:2.4,hobbinChance:.12,projectileCooldown:3,bonusDuration:14},{id:2,name:"Crossroads",layout:hs(["#############X#","###########..##","##E##.###E#.###","###..#...#..###","#P...#.B.#...##","###..####.#..##","##E#.##E##.#E##","###.........###","###.##.###.####","###############"]),playerStart:{col:1,row:4},enemyEntry:{col:13,row:0},enemyQuota:8,maxActiveEnemies:3,spawnDelay:2.9,enemySpeed:2.6,hobbinChance:.16,projectileCooldown:3.2,bonusDuration:13},{id:3,name:"Bag Trap",layout:hs(["#############X#","###########...#","##E##.###E#.###","###..#...#..###","#P...#.B.#...##","###..#####..###","##E#.#.....#E##","###....#####.##","###.##.###.####","###############"]),playerStart:{col:1,row:4},enemyEntry:{col:13,row:0},enemyQuota:10,maxActiveEnemies:4,spawnDelay:2.5,enemySpeed:2.8,hobbinChance:.22,projectileCooldown:3.5,bonusDuration:12},{id:4,name:"Deep Shafts",layout:hs(["#############X#","###########...#","#E#.##E##.###E#","#..##..##.##..#","#..#B#.#.##.#.#","#P.##.#.#B#.#.#","#..##.#..##..##","#E....#...#..E#","#..####.####.##","###############"]),playerStart:{col:1,row:5},enemyEntry:{col:13,row:0},enemyQuota:13,maxActiveEnemies:5,spawnDelay:2.1,enemySpeed:3,hobbinChance:.3,projectileCooldown:4,bonusDuration:10.5},{id:5,name:"The Vault",layout:hs(["#############X#","###########...#","#E#E#E##.##E#E#","#.#.#.##.##.#.#","#.#.B#.B..#.#.#","#P..##.###..#.#","#.#.#.##.##.#.#","#E#...##..#.#E#","#.####.##.###.#","###############"]),playerStart:{col:1,row:5},enemyEntry:{col:13,row:0},enemyQuota:16,maxActiveEnemies:6,spawnDelay:1.8,enemySpeed:3.3,hobbinChance:.38,projectileCooldown:4.5,bonusDuration:9}];function w0(i){if(i==="#"||i==="."||i==="E"||i==="B"||i==="P"||i==="X")return i;throw new Error(`unknown level marker: ${i}`)}function $o(i){const e=Er[(i-1)%Er.length],t=Math.floor((i-1)/Er.length);return t===0?e:{...e,id:i,name:`${e.name} +${t}`,enemyQuota:e.enemyQuota+t*4,maxActiveEnemies:Math.min(8,e.maxActiveEnemies+t),spawnDelay:Math.max(1.2,e.spawnDelay-t*.2),enemySpeed:Math.min(4,e.enemySpeed+t*.15),hobbinChance:Math.min(.6,e.hobbinChance+t*.05),projectileCooldown:Math.min(5,e.projectileCooldown+t*.2),bonusDuration:Math.max(6,e.bonusDuration-t*.5)}}function Mn(i){const e=$o(i);return{level:i,enemyQuota:e.enemyQuota,maxActiveEnemies:e.maxActiveEnemies,spawnDelay:e.spawnDelay,enemySpeed:e.enemySpeed,hobbinChance:e.hobbinChance,projectileCooldown:e.projectileCooldown,bonusDuration:e.bonusDuration}}function vs(i){const e=$o(i),t=new vi,n=[];for(let o=0;o<Xe;o++)for(let l=0;l<Ie;l++)n.push(t.get(l,o));let s=e.playerStart,r=e.enemyEntry;const a=e.layout.join("");for(let o=0;o<a.length;o++){const l=o%Ie,c=Math.floor(o/Ie),d=w0(a[o]),h=n[o];switch(d){case"#":h.solid=!0,h.excavated=!1,h.cost=4;break;case".":case"P":case"X":h.solid=!1,h.excavated=!0,h.cost=1,d==="P"&&(s={col:l,row:c}),d==="X"&&(r={col:l,row:c});break;case"E":h.solid=!0,h.excavated=!1,h.emerald=!0,h.cost=4;break;case"B":if(h.solid=!1,h.excavated=!0,h.bag=!0,h.cost=1,c+1>=Xe||a[(c+1)*Ie+l]!=="#")throw new Error(`bag at ${l},${c} has no earth support`);break}}if(a.includes("X")||(r={...Es}),!mt(r.col,r.row))throw new Error("invalid enemy entry");return t.setSolid(r.col,r.row,!1),{level:i,grid:t,playerStart:s,enemyEntry:r,difficulty:Mn(i),emeraldCount:t.emeraldCount(),bagCount:t.bagCount(),snapshot:t.snapshot()}}function uu(i,e){let t=(an^Math.imul(i+1,73244475)^Math.imul(e+1,668265263))>>>0;return t=Math.imul(t^t>>>16,2146121005)>>>0,t=Math.imul(t^t>>>15,2221713035)>>>0,((t^t>>>16)>>>0)/4294967296}function T0(i){return`${i.layout.join("")}|${i.playerStart.col},${i.playerStart.row}|${i.enemyQuota}|${i.maxActiveEnemies}|${i.spawnDelay}|${i.enemySpeed}|${i.hobbinChance}|${i.projectileCooldown}|${i.bonusDuration}`}function A0(i){let e=0;for(let t=0;t<Xe-1;t++)for(let n=0;n<Ie;n++)i.hasBag(n,t)&&i.isSolid(n,t+1)&&t>0&&i.isSolid(n,t-1)&&e++;return e}function ei(i,e){return i.col===e.col&&i.row===e.row}function R0(i,e){return Math.abs(i.col-e.col)+Math.abs(i.row-e.row)===1}function hu(i){return mt(i.col,i.row)}function C0(i,e){return!(!e&&i.solid)}function P0(i,e){return i.find(t=>ei(t,e))}function L0(i,e,t){return e.col!==t.col&&e.row!==t.row?[]:i.filter(n=>e.col===t.col?n.col===e.col&&n.row>=Math.min(e.row,t.row)&&n.row<=Math.max(e.row,t.row):n.row===e.row&&n.col>=Math.min(e.col,t.col)&&n.col<=Math.max(e.col,t.col))}function fu(i,e,t){if(!hu(e))return!0;const n=i.get(e.col,e.row);return!!(n.solid||t&&n.bag)}function du(i,e){const t=[];for(let n=1;n<=e;n++)t.push({col:i.col,row:i.row+n});return t}const Yo=2.6,cr=1e-6;class Fr{col;row;frac=0;direction="right";visualDirection="right";turnEase=0;buffered=null;moving=!1;digging=!1;alive=!0;dugThisTick=[];constructor(e){this.col=e.col,this.row=e.row}reset(e){this.col=e.col,this.row=e.row,this.frac=0,this.direction="right",this.visualDirection="right",this.turnEase=0,this.buffered=null,this.moving=!1,this.digging=!1,this.alive=!0,this.dugThisTick.length=0}get x(){return(this.col+this.frac*Ht(this.direction).dx)*se}get z(){return(this.row+this.frac*Ht(this.direction).dy)*se}get y(){return Mt}get targetCell(){if(this.frac<.5)return{col:this.col,row:this.row};const e=Ht(this.direction);return{col:this.col+e.dx,row:this.row+e.dy}}setDirection(e){if(e===this.direction)return;const t=Ht(this.direction),n=Ht(e),s=t.dx!==n.dx;if(this.frac<cr){this.canEnter(e)?this.applyDirection(e):s&&(this.buffered=e);return}s&&(this.buffered=e)}canEnter(e){const t=go({col:this.col,row:this.row},e);return mt(t.col,t.row)}applyDirection(e){e!==this.direction&&(this.visualDirection=this.direction,this.turnEase=1),this.direction=e,this.buffered=null}canTurnHere(e,t){const n=go({col:this.col,row:this.row},t);return mt(n.col,n.row)?!e.isSolid(n.col,n.row):!1}update(e,t){if(this.dugThisTick.length=0,!this.alive||e<=0){this.moving=!1,this.digging=!1;return}this.turnEase>0&&(this.turnEase=Math.max(0,this.turnEase-e*6)),this.turnEase===0&&(this.visualDirection=this.direction);let n=Yo*e;if(this.moving=!1,this.digging=!1,this.buffered&&this.frac<cr&&this.canTurnHere(t,this.buffered)){const r=this.buffered;this.applyDirection(r)}let s=0;for(;n>cr&&s++<8;){const r=Ht(this.direction),a={col:this.col+r.dx,row:this.row+r.dy};if(!mt(a.col,a.row)){if(this.buffered&&this.canEnter(this.buffered)){this.applyDirection(this.buffered);continue}this.frac=0;break}const o=t.isSolid(a.col,a.row);o&&t.excavate(a.col,a.row)&&this.dugThisTick.push({col:a.col,row:a.row});const l=1-this.frac;if(n<l-cr){this.frac+=n,n=0,this.moving=!0,this.digging=o;break}n-=l,this.col=a.col,this.row=a.row,this.frac=0,this.moving=!0,this.digging=o,this.buffered&&this.canTurnHere(t,this.buffered)&&this.applyDirection(this.buffered)}}snapshot(){return{col:this.col,row:this.row,frac:this.frac,x:this.x,z:this.z,y:this.y,direction:this.direction,visualDirection:this.visualDirection,turnEase:this.turnEase,moving:this.moving,digging:this.digging,buffered:this.buffered,alive:this.alive}}}function Ko(i){return new Fr(i)}const Tn=Object.freeze({emerald:un.emerald,emeraldChain:un.emeraldChain,chainBase:un.chainBase,goldBag:un.goldBag,projectileKill:un.projectileKill,bagCrush:un.bagCrush,cherry:un.cherry,bonusKill:un.bonusKill,extraLife:un.extraLife});function br(){return{count:0,bonusPoints:0,lastBonus:!1}}function Hn(i){i.count=0,i.lastBonus=!1}function si(i,e,t=0){const n=i.score;let s=0;const r=Math.floor(n/Tn.extraLife);i.score+=e;const a=Math.floor(i.score/Tn.extraLife);return s=Math.max(0,a-r),i.lives+=s,i.extraLifeThreshold=(a+1)*Tn.extraLife,i.score>i.highScore&&(i.highScore=i.score),{points:e,score:i.score,extraLife:s>0,chain:t,bonus:0}}function pu(i,e,t,n){e.count++,e.lastBonus=!1;let s=Tn.emerald,r=0;e.count%8===0&&(r=Tn.emeraldChain,s+=r,e.bonusPoints+=r,e.lastBonus=!0);const a=si(i,s,e.count);return a.bonus=r,a}function D0(i){Hn(i)}function I0(i,e){return Hn(e),si(i,Tn.goldBag,0)}function N0(i,e){return Hn(e),si(i,Tn.projectileKill,0)}function mu(i,e){return Hn(e),si(i,Tn.bagCrush,0)}function gu(i,e){return Hn(e),si(i,Tn.cherry,0)}function _o(i,e,t){Hn(e);const n=Math.max(1,Math.floor(t)),s=Tn.bonusKill*Math.pow(2,n-1);return si(i,s,0)}const U0=8,_u=Object.freeze(Object.defineProperty({__proto__:null,CHAIN_LENGTH:U0,SCORE_RULES:Tn,addScoreWithBonus:si,breakChain:D0,collectEmerald:pu,createChainState:br,resetChain:Hn,scoreBagCrush:mu,scoreBonusKill:_o,scoreCherry:gu,scoreGoldBag:I0,scoreProjectileKill:N0},Symbol.toStringTag,{value:"Module"})),Vr=Object.freeze(["RESTING","PUSHING","WOBBLING","FALLING","LANDING","BROKEN","COLLECTIBLE"]),vu=.22,F0=.5,O0=.8,vo=.6,wr=.18,Zo=50,xs=45,xu=14;function Or(i,e){return{col:i,row:e,state:"COLLECTIBLE",value:un.goldBag,playerOnly:!0}}function ya(i,e,t){return t+1<Xe&&i.isSolid(e,t+1)}function B0(i){if(!i||typeof i!="object")return null;const e=i.kind;return e==="player"||e==="nobbin"||e==="hobbins"?e:null}function Oi(i){const e=[];for(let h=0;h<i.rows;h++)for(let u=0;u<i.cols;u++)i.hasBag(u,h)&&e.push({col:u,row:h});let t=1,n=[];const s=h=>({id:t++,col:h.col,row:h.row,state:"RESTING",stateTime:0,visualOffset:0,visualShake:0,visualTilt:0,visualCompression:0,fallRows:0,fallVelocity:0,fallProgress:0,origin:{...h}}),r=(h,u)=>{h.state=u,h.stateTime=0},a=()=>{t=1,n=e.map(h=>s(h))};a();const o=(h,u,m,f)=>!(!mt(h,u)||i.isSolid(h,u)||i.hasEmerald(h,u)||i.hasBag(h,u)||n.some(x=>x!==m&&x.col===h&&x.row===u&&x.state!=="BROKEN"&&x.state!=="COLLECTIBLE")||f?.player&&ei(f.player,{col:h,row:u})||f?.enemies?.some(x=>ei(x,{col:h,row:u}))||f?.bags?.some(x=>ei(x,{col:h,row:u}))),l=h=>{r(h,"FALLING"),h.fallVelocity=0,h.fallProgress=0,h.fallRows=0},c=(h,u)=>{const m=h.fallRows>=2;if(m){r(h,"BROKEN");const f=Math.min(Xe-1,h.row+1),x={col:h.col,row:f},v={type:"break",col:h.col,row:h.row,hitStop:Zo,shake:1,fragments:12,nuggets:6,dust:14,flash:!0,metallic:!0,goldCell:x};u.events.push(v)}else r(h,"LANDING");u.landed.push({col:h.col,row:h.row,broken:m,fallRows:h.fallRows}),u.events.push({type:"land",col:h.col,row:h.row,strength:m?1:.5}),m?i.setBag(h.col,h.row,!1):i.setBag(h.col,h.row,!0)},d={bags:()=>n,bagAt:(h,u)=>n.find(m=>m.state!=="BROKEN"&&m.state!=="COLLECTIBLE"&&m.col===h&&m.row===u),assertExclusive:()=>{if(!n.every(u=>Vr.includes(u.state))||new Set(n.map(u=>u.id)).size!==n.length)return!1;const h=n.map(u=>`${u.col},${u.row}`);return new Set(h).size===h.length},tryPush(h,u,m,f){if(m!=="left"&&m!=="right")return{ok:!1,reason:"horizontal-only"};const x=d.bagAt(h,u);if(!x||x.state!=="RESTING")return{ok:!1,reason:"not-resting"};const v=h+(m==="right"?1:-1);return o(v,u,x,f)?(i.setBag(h,u,!1),x.col=v,x.row=u,i.setBag(v,u,!0),r(x,"PUSHING"),x.visualOffset=m==="right"?-1:1,{ok:!0}):{ok:!1,reason:"blocked"}},update(h,u){const m={crushes:[],events:[],landed:[]};if(!(h>0))return m;const f=u===void 0?[]:Array.isArray(u)?u:[u];for(const x of n)switch(x.stateTime+=h,x.state){case"RESTING":{ya(i,x.col,x.row)||(r(x,"WOBBLING"),x.visualShake=0,x.visualCompression=0,x.visualTilt=0,m.events.push({type:"wobble",col:x.col,row:x.row,strength:.4}));break}case"PUSHING":{const v=Math.min(1,x.stateTime/vu),_=v*v*(3-2*v);x.visualOffset=-Math.sign(x.visualOffset)*(1-_)||0,x.visualCompression=Math.sin(v*Math.PI)*.35,x.visualShake=Math.sin(v*Math.PI*4)*.05,x.visualTilt=Math.sin(v*Math.PI)*.12,v>=1&&(x.visualOffset=0,x.visualCompression=0,x.visualShake=0,x.visualTilt=0,r(x,ya(i,x.col,x.row)?"RESTING":"WOBBLING"));break}case"WOBBLING":{const v=Math.min(1,x.stateTime/vo);x.visualShake=Math.sin(v*Math.PI*14)*.13*(1-v*.3),x.visualTilt=Math.sin(v*Math.PI*10)*.18,x.visualCompression=Math.sin(v*Math.PI)*.3+.08,Math.floor(x.stateTime/.12)>Math.floor((x.stateTime-h)/.12)&&m.events.push({type:"wobble",col:x.col,row:x.row,strength:.3+.4*(1-v)}),(x.stateTime>=vo||v>=1)&&(l(x),m.events.push({type:"fall",col:x.col,row:x.row,strength:.6}));break}case"FALLING":{for(x.fallVelocity+=xu*h,x.fallProgress+=x.fallVelocity*h;x.fallProgress>=1&&x.row+1<Xe&&!i.isSolid(x.col,x.row+1);){i.setBag(x.col,x.row,!1),x.row+=1,x.fallRows+=1,x.fallProgress-=1,m.events.push({type:"fall",col:x.col,row:x.row,strength:Math.min(1,.3+x.fallVelocity/20)});const _=du({col:x.col,row:x.row-1},1);for(const M of _)for(const A of f){const y=B0(A);if(!y||!ei(A,M))continue;const w=un.bagCrush;m.crushes.push({kind:y,col:M.col,row:M.row,score:w}),m.events.push({type:"crush",kind:y,col:M.col,row:M.row,score:w,hitStop:xs})}}x.visualCompression=Math.min(.4,x.fallProgress*.25),x.visualShake=x.fallProgress*.04,(x.row+1>=Xe||i.isSolid(x.col,x.row+1))&&(x.fallProgress=0,c(x,m));break}case"LANDING":{x.visualCompression=Math.max(0,.45*(1-x.stateTime/wr)),x.visualShake=Math.sin(x.stateTime*30)*.04*Math.max(0,1-x.stateTime/wr),x.stateTime>=wr&&(x.visualCompression=0,x.visualShake=0,r(x,"RESTING"));break}}return m},refreshSupport(){for(const h of n)h.state==="RESTING"&&!ya(i,h.col,h.row)&&r(h,"WOBBLING")},reset:a,clear(){n=[],t=1},snapshot(){return n.map(h=>`${h.id}:${h.state}:${h.col},${h.row}:${h.fallRows}`).join("|")}};return d}const z0=Object.freeze(Object.defineProperty({__proto__:null,BAG_GRID_COLS:Ie,BAG_STATES:Vr,BREAK_HIT_STOP_MS:Zo,CRUSH_HIT_STOP_MS:xs,GRAVITY:xu,LANDING_DURATION:wr,PUSH_DURATION:vu,WOBBLE_DURATION:vo,WOBBLE_MAX:O0,WOBBLE_MIN:F0,createBagManager:Oi,createGoldBagDrop:Or},Symbol.toStringTag,{value:"Module"})),Su=6.5,Mu=4,yu=250,G0=["up","down","left","right"];function Eu(i,e){let t=[],n=0,s=Math.max(.5,e),r=1,a=null;const o=(l,c)=>l>=0&&l<Ie&&c>=0&&c<Xe;return{cooldown:()=>n,duration:()=>s,ready:()=>n<=0,setCooldownDuration(l){s=Math.max(.5,l),n>s&&(n=s)},fire(l,c,d){if(n>0)return{ok:!1,reason:"cooldown"};if(!G0.includes(c)||!o(l.col,l.row))return{ok:!1};const h={id:r++,col:l.col,row:l.row,progress:0,direction:c,speed:Su,life:Mu};return t=[h],n=s,{ok:!0,projectile:h}},step(l,c){const d={events:[],killed:[]};if(n>0&&(n=Math.max(0,n-l)),t.length===0||l<=0)return d;const h=t[0],u=Ht(h.direction);let m=h.speed*l,f=0;for(;m>0&&f++<8;){const x={col:h.col+u.dx,row:h.row+u.dy},v=c.find(A=>A.col===x.col&&A.row===x.row),_=fu(i,x,!0);if(v||_){const A=o(x.col,x.row)?i.get(x.col,x.row):null,y=v?"enemy":A?A.bag?"bag":"solid":"boundary",w=y==="enemy"?yu:0,E={col:h.col,row:h.row,direction:h.direction,reason:y,target:v,score:w};return d.events.push(E),a=E,v&&d.killed.push(v),t=[],h.life=0,d}const M=1-h.progress;if(m<M?(h.progress+=m,m=0):(m-=M,h.col=x.col,h.row=x.row,h.progress=0),h.life-=l,h.life<=0)return t=[],d}return d},projectiles:()=>t,reset(){t=[],n=0,a=null},lastImpact:()=>a}}const k0=Object.freeze(Object.defineProperty({__proto__:null,PROJECTILE_KILL_SCORE:yu,PROJECTILE_LIFETIME:Mu,PROJECTILE_SPEED:Su,createProjectileManager:Eu},Symbol.toStringTag,{value:"Module"}));function H0(i){const e=["up","down","left","right"],t=Math.floor(i*e.length)%e.length;return e.slice(t).concat(e.slice(0,t))}function qi(i,e,t,n,s=0){if(!mt(e.col,e.row)||!mt(t.col,t.row))return[];const r=Rt(e.col,e.row),a=Rt(t.col,t.row);if(r===a)return[];if(!n&&i.travelCost(e.col,e.row,!1)===Gi)return[];if(!n&&i.travelCost(t.col,t.row,!1)===Gi)return[];const o=Ie*Xe,l=new Int32Array(o).fill(-1),c=new Float64Array(o).fill(1/0),d=[];let h=0;c[r]=0,d.push(r);const u=H0(s);for(;h<d.length;){const x=d[h++],v=x%Ie,_=Math.floor(x/Ie);for(const M of u){const A=Ht(M),y=v+A.dx,w=_+A.dy;if(!mt(y,w))continue;const E=i.travelCost(y,w,n);if(E===Gi)continue;const p=Rt(y,w),S=c[x]+E;S>=c[p]||(c[p]=S,l[p]=x,d.push(p))}}if(l[a]<0)return[];const m=[];let f=a;for(;f!==r;)if(m.push({col:f%Ie,row:Math.floor(f/Ie),cost:c[f]}),f=l[f],f<0)return[];return m.reverse(),m}function bu(i,e,t,n={}){return qi(i,e,t,n.allowEarth===!0,n.variation??0)}function Jo(i,e){for(const t of xc)if(i.col+t.dx===e.col&&i.row+t.dy===e.row)return t.dx===0?t.dy<0?"up":"down":t.dx<0?"left":"right";return null}const V0={findRoute:qi,routeTo:bu,directionBetween:Jo},W0=Object.freeze(Object.defineProperty({__proto__:null,directionBetween:Jo,findRoute:qi,pathfinding:V0,routeTo:bu},Symbol.toStringTag,{value:"Module"})),Ss=2.4,Qo=.35,Ds=.45;function Ms(i,e,t){let n=[],s=1,r=0,a=[],o=[];const l=()=>{r++;for(const u of n)u.route=[],u.routeVersion=r,u.routeTimer=0},c=u=>{u.kind="hobbin",u.transformPause=Ds,u.speed=Math.min(u.speed*1.05,Ss*1.2),u.route=[],u.routeTimer=0,r++,u.routeVersion=r;const m={id:u.id,col:u.col,row:u.row,kind:"hobbin"};return o.push(m),m},d=(u,m)=>{const f=(i.cols??Ie)-1,x=(i.rows??Xe)-1,v=[{col:0,row:0},{col:f,row:0},{col:0,row:x},{col:f,row:x}];return v.sort((_,M)=>{const A=Math.abs(_.col-m.col)+Math.abs(_.row-m.row);return Math.abs(M.col-m.col)+Math.abs(M.row-m.row)-A}),v[0]},h=(u,m)=>{const f=u.kind==="hobbin",x={col:u.col,row:u.row},v=u.mode==="frightened"?d(u,m):mt(m.col,m.row)?m:t,_=e.next();u.route=qi(i,x,v,f,_),u.routeTimer=Qo,u.routeVersion=r};return{addEnemy(u,m,f){if(!mt(m.col,m.row))throw new Error(`enemy spawn out of bounds (${m.col},${m.row})`);const x={id:s++,kind:u,mode:"normal",col:m.col,row:m.row,progress:0,direction:"left",speed:f??(u==="hobbin"?Ss*.9:Ss),route:[],routeVersion:-1,routeTimer:0,alive:!0,transformPause:0};return n.push(x),h(x,t),r++,x},removeEnemy(u){const m=n.length;return n=n.filter(f=>f.id!==u),n.length<m},invalidateRoutes:l,routeVersion:()=>r,checkTransformation(u){return e.next()<Math.max(0,Math.min(1,u))},transform(u){const m=n.find(f=>f.id===u&&f.kind==="nobbin");return m?c(m)&&m:null},transformEnemy(u){const m=n.find(f=>f.id===u&&f.kind==="nobbin");return m?c(m):null},digEvents(){const u=a;return a=[],u},transformEvents(){const u=o;return o=[],u},setFrightened(u){for(const m of n)m.mode=u?"frightened":"normal",u&&(m.route=[],m.routeTimer=0)},frightenedIds(){return n.filter(u=>u.mode==="frightened").map(u=>u.id)},step(u,m){if(u<=0)return[];for(const x of n){if(!x.alive)continue;if(x.transformPause>0){x.transformPause=Math.max(0,x.transformPause-u);continue}x.routeTimer-=u,(x.route.length===0||x.routeTimer<=0)&&h(x,m);let v=x.speed*u,_=0;for(;v>0&&_++<4;){const M=x.route[0];if(!M)break;const A=x.kind==="hobbin";if(!mt(M.col,M.row)||i.travelCost(M.col,M.row,A)===1/0){h(x,m);break}const y=Jo({col:x.col,row:x.row},M);if(!y){h(x,m);break}x.direction=y;const w=i.isSolid(M.col,M.row);if(w&&x.kind==="hobbin"){const p=i.hasEmerald(M.col,M.row);i.excavate(M.col,M.row),p&&i.collectEmerald(M.col,M.row),a.push({id:x.id,col:M.col,row:M.row,emerald:p,kind:"hobbin"})}const E=Ht(y);if(v<1-x.progress)x.progress+=v,v=0;else if(v-=1-x.progress,x.col+=E.dx,x.row+=E.dy,x.progress=0,x.route.shift(),x.col===m.col&&x.row===m.row){x.route=[];break}if(w&&x.kind==="hobbin"){l();break}}}const f=a;return a=[],f},enemies:()=>n,reset(){n=[],s=1,r=0,a=[],o=[]},snapshot(){return{routeVersion:r,enemies:n.map(u=>({id:u.id,kind:u.kind,mode:u.mode,col:u.col,row:u.row,progress:u.progress,direction:u.direction,speed:u.speed,routeVersion:u.routeVersion,alive:u.alive,transformPause:u.transformPause,route:u.route.map(m=>({col:m.col,row:m.row}))}))}}}}const X0={createEnemyManager:Ms,NOBBIN_SPEED:Ss,ROUTE_REFRESH_SECONDS:Qo,TRANSFORMATION_PAUSE:Ds},wu=Object.freeze(Object.defineProperty({__proto__:null,NOBBIN_SPEED:Ss,ROUTE_REFRESH_SECONDS:Qo,TRANSFORMATION_PAUSE:Ds,createEnemyManager:Ms,enemies:X0},Symbol.toStringTag,{value:"Module"}));function ys(i,e,t,n=Es){let s=[],r=0,a=0,o=1,l=!1,c=!1;const d=()=>{const h=t.chance(e.hobbinChance)?"hobbin":"nobbin",u={id:o++,kind:h,col:n.col,row:n.row,speed:e.enemySpeed*(h==="hobbin"?.95:1)};return s.push(u),r++,u};return{step(h){const u=[];if(h<=0)return u;for(a+=h;a>=e.spawnDelay&&r<e.enemyQuota&&s.length<e.maxActiveEnemies;)a-=e.spawnDelay,u.push(d());return(r>=e.enemyQuota||s.length>=e.maxActiveEnemies)&&(a=Math.min(a,e.spawnDelay)),u},removeEnemy(h){const u=s.length;return s=s.filter(m=>m.id!==h),s.length<u},entities:()=>s,aliveEnemies:()=>s.length,spawnedEnemies:()=>r,enemyQuota:()=>e.enemyQuota,snapshot(){return{level:e.level,aliveEnemies:s.length,spawnedEnemies:r,enemyQuota:e.enemyQuota,maxActiveEnemies:e.maxActiveEnemies,spawnDelay:e.spawnDelay,timer:a,remainingQuota:Math.max(0,e.enemyQuota-r)}},cherry(){return{available:r>=e.enemyQuota&&!l,col:n.col,row:n.row,collected:l,justAppeared:!1}},cherryJustAppeared(){const h=r>=e.enemyQuota&&!l,u=h&&!c;return c=h,u},collectCherry(){return r<e.enemyQuota||l?!1:(l=!0,!0)},setSpawnedCountForTest(h){r=Math.max(0,Math.min(e.enemyQuota,Math.floor(h))),c=r>=e.enemyQuota},clearActiveForTest(){s=[]},reset(){s=[],r=0,a=0,o=1,l=!1,c=!1}}}const q0={createSpawner:ys},Tu=Object.freeze(Object.defineProperty({__proto__:null,createSpawner:ys,spawning:q0},Symbol.toStringTag,{value:"Module"}));function $0(){if(window.__diggerSim)return;const i={constants:Object.freeze({CELL_SIZE:se,GRID_COLS:Ie,GRID_ROWS:Xe,SCORE:un,SEED:an,ENEMY_ENTRY:Es}),createRng:qo,resetRng:Ur,rng:Ue,seed:an,createGameState:Hr,resetLevelState:zi,snapshotState:y0,addScore:E0,createEventBus:M0,Grid:vi,inBounds:mt,neighbour:go,directionDelta:Ht,TUNNEL_COST:Mr,EARTH_COST:yr,LEVELS:Er,definitionFor:$o,difficultyFor:Mn,loadLevel:vs,levelSignature:T0,bagCrushOpportunities:A0,decorationVariation:uu,sameCell:ei,adjacent:R0,insideBoard:hu,cellPassable:C0,occupantAt:P0,occupantsBetween:L0,projectileBlocked:fu,crushPath:du,Player:Fr,createPlayer:Ko,PLAYER_SPEED:Yo,scoring:_u,bags:z0,projectiles:k0,pathfinding:W0,enemies:wu,spawning:Tu,cherry:{entry:Es}};Object.defineProperty(window,"__diggerSim",{value:Object.freeze(i),configurable:!1})}const Y0={ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down",ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right"};class K0{pending=null;pendingFire=!1;pressed=new Set;toggles=new Set;handlers=[];installed=!1;listenerCount=0;install(){if(this.installed)return;this.installed=!0;const e=n=>{const s=Y0[n.code];s&&(this.pending=s,n.preventDefault()),!n.repeat&&((n.code==="Space"||n.code==="KeyF")&&(this.pendingFire=!0),(n.code==="KeyM"||n.code==="KeyP")&&this.toggles.add(n.code),this.pressed.add(n.code))},t=n=>{this.pressed.delete(n.code)};window.addEventListener("keydown",e),window.addEventListener("keyup",t),this.listenerCount=2,this.handlers.push(e,t)}dispose(){if(this.installed){for(const e of this.handlers)window.removeEventListener("keydown",e);for(const e of this.handlers)window.removeEventListener("keyup",e);this.handlers.length=0,this.installed=!1,this.listenerCount=0,this.pending=null,this.pendingFire=!1,this.pressed.clear()}}takeDirection(){const e=this.pending;return this.pending=null,e}takeFire(){const e=this.pendingFire;return this.pendingFire=!1,e}takeToggle(e){return this.toggles.has(e)?(this.toggles.delete(e),!0):!1}peekDirection(){return this.pending}isDown(e){return this.pressed.has(e)}snapshot(){return{direction:this.pending,fire:this.pressed.has("Space")||this.pressed.has("KeyF"),pause:this.pressed.has("KeyP"),mute:this.pressed.has("KeyM"),debug:this.pressed.has("Backquote")||this.pressed.has("`"),selfTest:this.pressed.has("KeyT"),start:this.pressed.has("Enter")}}clear(){this.pending=null,this.pendingFire=!1,this.toggles.clear(),this.pressed.clear()}}function Z0(i=!0){const e=new K0;return i&&e.install(),e}const Yt=new ot().makeScale(0,0,0);function cn(i,e,t){return uu(i*17+t,e*29+t*7)}function Au(){const i=new ct,e=Ie*Xe,t=new Nt,n=new ke,s=new St(se*.98,se*.8,se*.98),r=s.getAttribute("position"),a=[];for(let T=0;T<r.count;T++){const D=r.getY(T),U=D>.3?1:D<-.3?.55:.72;a.push(U,U,U)}s.setAttribute("color",new gt(a,3));const o=new xt({color:16777215,vertexColors:!0,roughness:.94,metalness:.02}),l=new Pi(s,o,e);l.instanceMatrix.setUsage(ns),l.castShadow=!0,l.receiveShadow=!0;for(let T=0;T<Xe;T++)for(let D=0;D<Ie;D++){const U=T*Ie+D,R=cn(D,T,1),L=cn(D,T,2);t.position.set(D*se,-.4+R*.08,T*se),t.rotation.set(0,(R-.5)*.06,0);const P=.9+R*.15,C=.82+L*.32,z=.9+L*.15;t.scale.set(P,C,z),t.updateMatrix(),l.setMatrixAt(U,t.matrix),n.setHSL(.05+R*.05,.42+L*.2,.22+R*.16),l.setColorAt(U,n)}l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),i.add(l);const c=new St(se*.97,.06,se*.97),d=new xt({color:1774352,roughness:1}),h=new Pi(c,d,e);h.instanceMatrix.setUsage(ns),h.receiveShadow=!0;for(let T=0;T<Xe;T++)for(let D=0;D<Ie;D++){const U=T*Ie+D,R=cn(D,T,3);t.position.set(D*se,-.03,T*se),t.rotation.set(0,0,0),t.scale.set(1,1,1),t.updateMatrix(),h.setMatrixAt(U,t.matrix),n.setHSL(.07,.3,.08+R*.06),h.setColorAt(U,n)}h.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0),i.add(h);const u=new Ps(.055,0),m=new xt({color:5521452,roughness:1}),f=new Pi(u,m,e*2);let x=0;for(let T=0;T<Xe;T++)for(let D=0;D<Ie;D++)for(let U=0;U<2;U++){const R=cn(D,T,10+U);t.position.set(D*se+(R-.5)*.7,.01,T*se+(cn(D,T,20+U)-.5)*.7),t.rotation.set(R*3,R*5,R*2);const L=.7+R*.8;t.scale.set(L,L*.6,L),t.updateMatrix(),f.setMatrixAt(x++,t.matrix)}f.instanceMatrix.needsUpdate=!0,i.add(f);const v=new Ps(.2,0),_=new xt({color:7168597,roughness:1,flatShading:!0}),M=new Pi(v,_,e);M.instanceMatrix.setUsage(ns);for(let T=0;T<e;T++)M.setMatrixAt(T,Yt);i.add(M);const A=new Ji(.28,0),y=new xt({color:2490264,emissive:691274,emissiveIntensity:1.6,roughness:.18,metalness:.2,flatShading:!0}),w=new Pi(A,y,e);w.instanceMatrix.setUsage(ns),w.castShadow=!0;const E=new pn(.34,10,8),p=new xt({color:16763210,emissive:5911552,roughness:.5,metalness:.35,flatShading:!0}),S=new Pi(E,p,e);S.instanceMatrix.setUsage(ns),S.castShadow=!0;for(let T=0;T<e;T++)w.setMatrixAt(T,Yt),S.setMatrixAt(T,Yt);return i.add(w,S),{group:i,earth:l,floors:h,earthInstances:e,floorInstances:e,sync:T=>{for(let D=0;D<Xe;D++)for(let U=0;U<Ie;U++){const R=D*Ie+U,L=T.get(U,D),P=cn(U,D,1),C=cn(U,D,2);if(L.solid){t.position.set(U*se,-.4+P*.08,D*se),t.rotation.set(0,(P-.5)*.06,0),t.scale.set(.9+P*.15,.82+C*.32,.9+C*.15),t.updateMatrix(),l.setMatrixAt(R,t.matrix),h.setMatrixAt(R,Yt);for(let z=0;z<2;z++)f.setMatrixAt(R*2+z,Yt)}else{l.setMatrixAt(R,Yt);const z=cn(U,D,3);t.position.set(U*se,-.03,D*se),t.rotation.set(0,0,0),t.scale.set(1,1,1),t.updateMatrix(),h.setMatrixAt(R,t.matrix),n.setHSL(.07,.3,.08+z*.06),h.setColorAt(R,n);for(let Y=0;Y<2;Y++){const q=cn(U,D,10+Y);t.position.set(U*se+(q-.5)*.7,.01,D*se+(cn(U,D,20+Y)-.5)*.7),t.rotation.set(q*3,q*5,q*2);const te=.7+q*.8;t.scale.set(te,te*.6,te),t.updateMatrix(),f.setMatrixAt(R*2+Y,t.matrix)}}}for(let D=0;D<Xe;D++)for(let U=0;U<Ie;U++){const R=D*Ie+U,L=T.get(U,D);if(M.setMatrixAt(R,Yt),w.setMatrixAt(R,Yt),S.setMatrixAt(R,Yt),L.solid){const P=cn(U,D,31);P>.72&&(t.position.set(U*se+(P-.7)*.5,.02+P*.04,D*se+(cn(U,D,37)-.5)*.5),t.rotation.set(P*4,P*6,P*2),t.scale.setScalar(.6+P*.9),t.updateMatrix(),M.setMatrixAt(R,t.matrix))}L.emerald&&(t.position.set(U*se,.42,D*se),t.rotation.set(0,cn(U,D,41)*6,0),t.scale.setScalar(.9),t.updateMatrix(),w.setMatrixAt(R,t.matrix)),L.bag&&(t.position.set(U*se,.4,D*se),t.rotation.set(0,0,0),t.scale.set(1,1.15,1),t.updateMatrix(),S.setMatrixAt(R,t.matrix))}l.instanceMatrix.needsUpdate=!0,h.instanceMatrix.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,M.instanceMatrix.needsUpdate=!0,w.instanceMatrix.needsUpdate=!0,S.instanceMatrix.needsUpdate=!0,h.instanceColor&&(h.instanceColor.needsUpdate=!0)},hideEmerald(T,D){w.setMatrixAt(D*Ie+T,Yt),w.instanceMatrix.needsUpdate=!0},hideBag(T,D){S.setMatrixAt(D*Ie+T,Yt),S.instanceMatrix.needsUpdate=!0},excavate(T,D){const U=D*Ie+T;M.setMatrixAt(U,Yt),w.setMatrixAt(U,Yt),S.setMatrixAt(U,Yt),M.instanceMatrix.needsUpdate=!0,w.instanceMatrix.needsUpdate=!0,S.instanceMatrix.needsUpdate=!0,l.setMatrixAt(D*Ie+T,Yt),l.instanceMatrix.needsUpdate=!0,h.setMatrixAt(D*Ie+T,(t.position.set(T*se,-.03,D*se),t.rotation.set(0,0,0),t.scale.set(1,1,1),t.updateMatrix(),t.matrix.clone())),h.instanceMatrix.needsUpdate=!0},dispose(){s.dispose(),o.dispose(),c.dispose(),d.dispose(),u.dispose(),m.dispose(),v.dispose(),_.dispose(),A.dispose(),y.dispose(),E.dispose(),p.dispose()}}}function Cn(i,e=0,t=.5,n=.2){return new xt({color:i,emissive:e,roughness:t,metalness:n})}function J0(i){switch(i){case"up":return Math.PI;case"down":return 0;case"left":return Math.PI/2;case"right":return-Math.PI/2;default:return 0}}function Q0(i,e){let t=e-i;for(;t>Math.PI;)t-=Math.PI*2;for(;t<-Math.PI;)t+=Math.PI*2;return t}function Ru(){const i=new ct;let e=0;const t=new ct;i.add(t);const n=new Ne(new St(.9,.55,.72),Cn(16761374,7029248,.45,.3));n.position.y=.06,t.add(n),e++;const s=new Ne(new St(.62,.34,.56),Cn(16747039,4857856,.5,.25));s.position.set(0,.38,-.02),t.add(s),e++;const r=new ct;r.position.set(0,.02,-.42),t.add(r);const a=new Ne(new Br(.28,.5,8),Cn(14540253,2236962,.35,.7));a.rotation.x=-Math.PI/2,a.position.z=-.2,r.add(a),e++;const o=new Ne(new St(.16,.1,.4),Cn(10066329,1118481,.4,.6));o.position.set(-.24,-.08,-.18),r.add(o),e++;const l=o.clone();l.position.x=.24,r.add(l),e++;const c=new mi(.26,.26,.16,12),d=Cn(2236962,0,.85,.1),h=new Ne(c,d);h.rotation.z=Math.PI/2,h.position.set(-.52,-.18,.08),t.add(h),e++;const u=new Ne(c,d);u.rotation.z=Math.PI/2,u.position.set(.52,-.18,.08),t.add(u),e++;const m=new St(.18,.05,.05),f=Cn(16756768,4465152,.5),x=new Ne(m,f);x.position.set(-.61,-.18,.08),t.add(x),e++;const v=x.clone();v.position.x=.61,t.add(v),e++;const _=new Ne(new pn(.14,12,8),Cn(16774320,16763972,.2,0));_.position.set(0,.32,-.34),t.add(_),e++;const M=new _s(16768392,1.4,4);M.position.copy(_.position),t.add(M),e++;const A=new Ne(new mi(.08,.1,.32,8),Cn(4473924,0,.8));A.position.set(.25,.55,.2),t.add(A),e++;const y=new Ne(new pn(.2,10,8),new Qt({color:12580095,transparent:!0,opacity:0}));y.position.set(0,.18,-.7),t.add(y),e++;let w=0,E=0;return{group:i,partCount:e,update:(S,I,T)=>{i.position.set(S.x,Mt+.15,S.z),w=Math.max(0,w-T*5),E=Math.max(0,E-T*6),y.material.opacity=w,y.scale.setScalar(.6+w*.9),r.position.z=-.42+(S.digging?Math.sin(I*20)*.06:0)+E*.18,t.position.z=E*.12;const D=J0(S.visualDirection);i.rotation.y+=Q0(i.rotation.y,D)*Math.min(1,T*12);const U=S.moving?1:0,R=S.digging?2.4:1;h.rotation.y+=T*U*R*8,u.rotation.y+=T*U*R*8,r.rotation.z=Math.sin(I*(S.digging?26:8))*(S.digging?.28:.05)*U,r.position.z=-.42+(S.digging?Math.sin(I*20)*.06:0)+E*.18,o.position.x=-.24+Math.sin(I*18)*(S.digging?.07:.01),l.position.x=.24-Math.sin(I*18)*(S.digging?.07:.01),M.intensity=1.4+(S.digging?Math.sin(I*30)*.5:0),t.position.y=Math.sin(I*7)*.015*U,t.position.z=E*.12,A.scale.y=1+Math.sin(I*9)*.12*U},get muzzleFlash(){return w},set muzzleFlash(S){w=Math.max(0,Math.min(1,S))},get recoil(){return E},set recoil(S){E=Math.max(0,Math.min(1,S))}}}function j0(i=24){const e=new ct,t=[],n=new St(.78,.62,.68),s=new St(.3,.1,.26);for(let a=0;a<i;a++){const o=new ct,l=new Ne(n,Cn(10246946,3479552,.85,.05));l.position.y=.31,o.add(l);const c=new Ne(s,Cn(16765770,16754688,.2,.7));c.position.set(0,.64,-.05),o.add(c),o.visible=!1,e.add(o),t.push({root:o,body:l,glint:c})}const r=a=>{const o=a.visualShake;return new W(o,0,o*.6)};return{group:e,leatherFragments:12,goldNuggets:6,sync(a,o){const l=a.bags();for(let c=0;c<t.length;c++){const d=t[c],h=l[c];if(!h||h.state==="BROKEN"||h.state==="COLLECTIBLE"){d.root.visible=!1;continue}d.root.visible=!0;const u=r(h);d.root.position.set(h.col*se+h.visualOffset+u.x,Mt+(h.state==="FALLING"?-h.fallProgress:0),h.row*se+u.z);const m=h.state==="RESTING"?Math.sin(o*2+h.id)*.02:0;d.root.rotation.set(h.visualTilt,0,h.visualTilt*.5),d.body.scale.set(1+h.visualCompression*.5,1-h.visualCompression,1+h.visualCompression*.5),d.body.position.y=.31-h.visualCompression*.15+m;const f=h.state==="WOBBLING"?.6+Math.sin(o*18)*.4:.35;d.glint.material.emissiveIntensity=f}},dispose(){n.dispose(),s.dispose();for(const a of t)a.body.material.dispose(),a.glint.material.dispose()}}}function e_(i=4){const e=new ct,t=new pn(.16,10,8),n=new St(.1,.1,.55),s=[];for(let h=0;h<i;h++){const u=new ct,m=new Ne(t,new Qt({color:14679039}));m.scale.set(1,1,1.7);const f=new Ne(n,new Qt({color:4839167,transparent:!0,opacity:.65}));f.position.z=.35,u.add(m,f),u.visible=!1,e.add(u),s.push({root:u,core:m,trail:f})}const r=new ko(.15,.5,12),a=[];for(let h=0;h<6;h++){const u=new Ne(r,new Qt({color:9431551,transparent:!0,opacity:.9,side:yn}));u.visible=!1,e.add(u),a.push({mesh:u,life:0})}let o=0,l=0,c=0;const d={up:Math.PI,down:0,left:Math.PI/2,right:-Math.PI/2};return{group:e,get visibleBolts(){return l},sync(h,u){c+=Math.max(0,u),l=Math.min(h.length,s.length);for(let m=0;m<s.length;m++){const f=s[m],x=h[m];if(!x){f.root.visible=!1;continue}const v=Ht(x.direction);f.root.visible=!0,f.root.position.set((x.col+v.dx*x.progress)*se,Mt,(x.row+v.dy*x.progress)*se),f.root.rotation.y=d[x.direction]??0,f.trail.scale.z=.8+Math.sin(c*16)*.2}},impact(h,u){const m=a[o++%a.length];m.mesh.position.set(h*se,Mt,u*se),m.mesh.rotation.x=-Math.PI/2,m.mesh.scale.setScalar(.6),m.mesh.visible=!0,m.life=.35,m.mesh.material.opacity=.9},update(h){for(const u of a)if(!(u.life<=0)){if(u.life-=h,u.life<=0){u.mesh.visible=!1;continue}u.mesh.scale.setScalar(.6+(.35-u.life)*3),u.mesh.material.opacity=u.life/.35*.9}}}}function t_(i=12){const e=new ct,t=new Ji(.42,0),n=new Ps(.35,0),s=new Br(.18,.42,5),r=new pn(.1,8,6),a=new St(.1,.3,.1),o=new pn(.055,6,5),l=9412748,c=9117474,d=2672878,h=1333968,u={nobbinColor:l,hobbinColor:c,nobbinClawScale:.6,hobbinClawScale:1.5,nobbinEyeGlow:.2,hobbinEyeGlow:1.4,frightenedColor:d,frightenedEyeScale:1.9,frightLegRate:20},m=[];for(let E=0;E<i;E++){const p=new Ne(t,new Qt({color:16773280,transparent:!0,opacity:0}));p.visible=!1,p.position.y=Mt+.2,e.add(p),m.push({mesh:p,life:0})}let f=0,x=0;const v=[];for(let E=0;E<i;E++){const p=new ct,S=new Ne(n,new xt({color:d,emissive:h,emissiveIntensity:.7,roughness:.7,transparent:!0,opacity:1}));S.position.y=Mt+.1,p.add(S);for(const I of[-1,1]){const T=new Ne(r,new Qt({color:14220287,transparent:!0,opacity:1}));T.position.set(I*.14,Mt+.34,-.26),T.scale.setScalar(u.frightenedEyeScale),p.add(T)}p.visible=!1,e.add(p),v.push({group:p,body:S,life:0,maxLife:.35})}const _=[];for(let E=0;E<i;E++){const p=new ct,S=new Ne(n,new xt({color:l,emissive:0,roughness:.85}));S.position.y=Mt+.1,p.add(S);const I=[];for(const R of[-1,1]){const L=new Ne(s,new xt({color:l,roughness:.7}));L.position.set(R*.42,Mt+.05,.1),L.rotation.z=R*.6,L.scale.setScalar(u.nobbinClawScale),p.add(L),I.push(L)}const T=[];for(const R of[-1,1]){const L=new Ne(a,new xt({color:4209204,roughness:.9}));L.position.set(R*.2,Mt-.16,0),p.add(L),T.push(L)}const D=[];for(const R of[-1,1]){const L=new Ne(r,new Qt({color:16771488}));L.position.set(R*.14,Mt+.34,-.26),p.add(L),D.push(L)}const U=[];for(let R=0;R<3;R++){const L=new Ne(o,new Qt({color:10417407,transparent:!0,opacity:.85}));L.position.set(R===0?-.34:.34,Mt+.36+R*.09,.08),L.visible=!1,p.add(L),U.push(L)}p.visible=!1,e.add(p),_.push({group:p,body:S,claws:I,eyes:D,legs:T,sweat:U,squash:0,pop:0,legPhase:0,glance:0,kind:"nobbin",mode:"normal"})}let M=0,A=8,y=0;const w=(E,p,S)=>{const I=p==="hobbin",T=S==="frightened",D=E.body.material,U=T?d:I?c:l;D.color.setHex(U),D.emissive.setHex(T?h:0),D.emissiveIntensity=T?.7:0;const R=I?u.hobbinClawScale:u.nobbinClawScale,L=I?u.hobbinEyeGlow:u.nobbinEyeGlow;for(const C of E.claws){C.scale.setScalar(R);const z=C.material;z.color.setHex(T?h:U),z.emissive.setHex(T?h:0),z.emissiveIntensity=T?.6:0}const P=T?u.frightenedEyeScale:1;for(const C of E.eyes)C.scale.setScalar(P),C.material.color.setRGB(Math.min(1,.6+L*.3),Math.min(1,.5+L*.25),.2);E.kind=p,E.mode=S};return{group:e,get flashes(){return f},get transformSquash(){return M},get deathPops(){return x},get sweatParticles(){return y},get legRate(){return A},style:()=>({...u}),snapshot:()=>[..._.filter(E=>E.group.visible).map(E=>({kind:E.kind,mode:E.mode,bodyColor:E.body.material.color.getHex(),clawScale:E.claws[0].scale.x,eyeScale:E.eyes[0].scale.x,legSwing:E.legs[0].rotation.x,sweat:E.sweat.filter(p=>p.visible).length,squash:E.squash,pop:E.pop,y:E.group.position.y,yaw:E.group.rotation.y,detached:!1})),...v.filter(E=>E.group.visible).map(E=>({kind:"pop",mode:"frightened",bodyColor:E.body.material.color.getHex(),clawScale:0,eyeScale:u.frightenedEyeScale,legSwing:0,sweat:0,squash:0,pop:E.life/E.maxLife,y:E.group.position.y,yaw:E.group.rotation.y,detached:!0}))],flash(E,p){const S=m.find(I=>I.life<=0)||m[0];S.mesh.position.x=E*se,S.mesh.position.z=p*se,S.mesh.visible=!0,S.life=.4,f++},transformFx(E,p){const S=_.find(I=>I.group.visible&&Math.abs(I.group.position.x-E*se)<.1&&Math.abs(I.group.position.z-p*se)<.1)||_[0];S.squash=1,M=1},deathPop(E,p){const S=_.find(U=>U.group.visible&&Math.abs(U.group.position.x-E*se)<.1&&Math.abs(U.group.position.z-p*se)<.1);S&&(S.pop=1);const I=v.find(U=>U.life<=0)||v[0],T=I.body.material,D=S&&S.body.material;T.color.setHex(D?D.color.getHex():d),T.emissive.setHex(D?D.emissive.getHex():h),I.group.position.set(E*se,0,p*se),I.group.visible=!0,I.life=I.maxLife,I.body.scale.setScalar(1),x++},sync(E,p){A=8,y=0;for(let S=0;S<_.length;S++){const I=_[S],T=E[S];if(!T){I.group.visible=!1;continue}I.group.visible=!0,I.group.position.x=T.col*se,I.group.position.z=T.row*se;const D=T.mode==="frightened"?"frightened":"normal";w(I,T.kind==="hobbin"?"hobbin":"nobbin",D);const U=I.kind==="hobbin",R=D==="frightened",L=U?1:.25,P=R?u.frightLegRate:8;A=P,I.legPhase+=(R?1:1/60)*P/60;for(let C=0;C<I.legs.length;C++)I.legs[C].rotation.x=Math.sin(I.legPhase+C*Math.PI)*(R?.9:.4);I.group.position.y=Math.sin(p*8+S)*.06*L,I.body.rotation.y=Math.sin(p*6+S)*.15*L,I.glance=R?Math.max(0,Math.sin(p*3+S)):0,I.group.rotation.y=I.glance*.6;for(let C=0;C<I.sweat.length;C++){const z=I.sweat[C];z.visible=R,R&&(z.position.y=Mt+.36+C*.09+Math.sin(p*7+C)*.05,y++)}if(I.squash>0){const C=1+Math.sin((1-I.squash)*Math.PI)*.4;I.body.scale.set(C,2-C,C)}else if(I.pop>0){const C=I.pop;I.body.scale.set(1+C*.3,1+C*.8,1+C*.3),I.group.position.y+=C*.4}else I.body.scale.setScalar(1);T.transformPause>0&&(I.squash=1)}},update(E){for(const p of m)p.life<=0||(p.life-=E,p.mesh.material.opacity=Math.max(0,p.life/.4),p.mesh.scale.setScalar(1+(.4-p.life)*1.5),p.life<=0&&(p.mesh.visible=!1));M>0&&(M=Math.max(0,M-E/Ds));for(const p of _)p.squash>0&&(p.squash=Math.max(0,p.squash-E/Ds)),p.pop>0&&(p.pop=Math.max(0,p.pop-E/.35));for(const p of v){if(p.life<=0)continue;if(p.life=Math.max(0,p.life-E),p.life<=0){p.group.visible=!1;continue}const S=p.life/p.maxLife;p.body.scale.set(1+S*.4,1+S*1.2,1+S*.4),p.group.position.y=(1-S)*.5,p.group.rotation.y=(1-S)*.5;const I=p.body.material;I.opacity=S}}}}function n_(i){const e=new ct;e.position.set(i.col*se,0,i.row*se);const t=new Ne(new mi(.52,.52,.16,12,1,!1,0,Math.PI),new xt({color:459785,roughness:1,emissive:65539}));t.rotation.set(Math.PI/2,0,0),t.position.set(0,Mt+.16,.18),e.add(t);const n=new xt({color:6962974,roughness:.95}),s=new Ne(new St(1.3,.16,.22),n);s.position.set(0,Mt+.72,.18),e.add(s);const r=[];for(const f of[-1,1]){const x=new Ne(new St(.15,.8,.22),n);x.position.set(f*.6,Mt+.34,.18),e.add(x),r.push(x)}const a=new xt({color:16724e3,emissive:16711680,emissiveIntensity:2}),o=new Ne(new pn(.13,10,8),a);o.position.set(0,Mt+.9,.18),e.add(o);const l=new _s(16724e3,1.2,3);l.position.copy(o.position),e.add(l);const c=new pn(.12,6,5),d=[];for(let f=0;f<6;f++){const x=new Ne(c,new xt({color:10125924,roughness:1,transparent:!0,opacity:.45}));x.position.set((f-2.5)*.18,Mt+.1,.4+f%2*.2),x.visible=!1,e.add(x),d.push(x)}const h=Ue.fork(333569);let u=0,m=0;return{group:e,get dustPuffs(){return d.filter(f=>f.visible).length},snapshot:()=>({mouth:t.visible,mouthColor:t.material.color.getHex(),posts:r.length,lintel:s.visible,lamp:o.visible,lampColor:a.color.getHex(),lampEmissive:a.emissiveIntensity,light:l.visible,dustPool:d.length,col:i.col,row:i.row,worldX:e.position.x,worldZ:e.position.z}),update(f){if(u+=f,u>=.9){u-=.9;const x=d[m++%d.length];x.visible=!0,x.material.opacity=.45,x.position.set((h.next()-.5)*.9,Mt+.2,.35)}for(const x of d){if(!x.visible)continue;x.position.y+=f*.4,x.position.x+=f*.25;const v=x.material;v.opacity-=f*.35,v.opacity<=0&&(x.visible=!1)}a.emissiveIntensity=1.4+Math.sin(u*6)*.6}}}function i_(i=12){const e=new ct,t=[];for(let r=0;r<i;r++){const a=document.createElement("canvas");a.width=256,a.height=64;const o=new tf(a);o.minFilter=Jt;const l=new Qt({map:o,transparent:!0,opacity:1,depthWrite:!1,side:yn}),c=new Ne(new Qi(1.4,.35),l);c.visible=!1,e.add(c),t.push({mesh:c,material:l,texture:o,life:0,maxLife:1,active:!1,baseY:0})}let n=0,s=0;return{group:e,get activeCount(){return s},show(r,a,o,l){const c=t[n++%i];c.active&&s--;const d=c.texture.image,h=d.getContext("2d");h&&(h.clearRect(0,0,d.width,d.height),h.font="bold 40px monospace",h.textAlign="center",h.textBaseline="middle",h.lineWidth=6,h.strokeStyle=l?"#ffcc00":"#004411",h.strokeText(r,128,32),h.fillStyle=l?"#ffee44":"#66ffbb",h.fillText(r,128,32),c.texture.needsUpdate=!0,c.mesh.position.set(a,.8,o),c.mesh.rotation.set(0,0,0),c.mesh.scale.setScalar(l?1.3:1),c.baseY=.8,c.maxLife=l?1.6:1.1,c.life=c.maxLife,c.material.opacity=1,c.mesh.visible=!0,c.active=!0,s++)},update(r){if(!(r<=0))for(const a of t){if(!a.active)continue;if(a.life-=r,a.life<=0){a.active=!1,a.mesh.visible=!1,s--;continue}const o=1-a.life/a.maxLife,l=1-Math.pow(1-o,3);a.mesh.position.y=a.baseY+l*1.1,a.mesh.scale.setScalar(1.1-l*.35),a.material.opacity=o>.65?(1-o)/.35:1,a.mesh.rotation.z=Math.sin(o*Math.PI*2)*.04}},clear(){for(const r of t)r.active=!1,r.mesh.visible=!1;s=0}}}const mc=180;function s_(){const i=Ue.fork(333570),e=new ct,t=[],n=new St(.14,.12,.14),s=[9067058,7029288,10513212,5255196];for(let R=0;R<mc;R++){const L=new xt({color:s[R%s.length],roughness:1,transparent:!0,opacity:1}),P=new Ne(n,L);P.visible=!1,e.add(P),t.push({mesh:P,vx:0,vy:0,vz:0,rx:0,ry:0,life:0,maxLife:1,active:!1})}let r=0,a=0,o=0;const l=new St(.1,.1,.1),c=48,d=[];for(let R=0;R<c;R++){const L=new xt({color:R%3===0?12255192:R%3===1?3538842:52326,emissive:695370,emissiveIntensity:2,roughness:.3,transparent:!0,opacity:1}),P=new Ne(l,L);P.visible=!1,e.add(P),d.push({mesh:P,vx:0,vy:0,vz:0,life:0,maxLife:1,active:!1})}let h=0,u=0,m=0,f=0,x=0,v=0;const _=new pn(.06,6,5),M=[];for(let R=0;R<24;R++){const L=new Ne(_,new xt({color:11072767,emissive:3381708,emissiveIntensity:1.2,transparent:!0,opacity:1}));L.visible=!1,e.add(L),M.push({mesh:L,vx:0,vy:0,vz:0,life:0,maxLife:1,active:!1})}const A=new St(.09,.09,.09),y=[];for(let R=0;R<24;R++){const L=new Ne(A,new xt({color:R%2?10482943:16777215,emissive:3324415,emissiveIntensity:2,transparent:!0,opacity:1}));L.visible=!1,e.add(L),y.push({mesh:L,vx:0,vy:0,vz:0,life:0,maxLife:1,active:!1})}const w=new St(.16,.1,.14),E=new Ji(.12,0),p=[],S=[],I=(R,L,P,C)=>{for(let z=0;z<16;z++){const Y=new Ne(R,new xt({color:L,emissive:P,roughness:L===16765770?.25:.9,metalness:L===16765770?.7:0,transparent:!0,opacity:1}));Y.visible=!1,e.add(Y),C.push({mesh:Y,vx:0,vy:0,vz:0,life:0,maxLife:1,active:!1})}};I(w,10246946,2757632,p),I(E,16765770,16754688,S);const T=(R,L,P,C,z,Y)=>{R.mesh.position.set(L,.45,P),R.mesh.rotation.set(Ue.next()*6,C,Ue.next()*6),R.vx=Math.cos(C)*z,R.vz=Math.sin(C)*z,R.vy=Y+Ue.next()*1.5,R.maxLife=.6+Ue.next()*.5,R.life=R.maxLife,R.active=!0,R.mesh.visible=!0,R.mesh.material.opacity=1},D=(R,L,P,C,z,Y,q)=>{R.mesh.position.set(L,P,C),R.mesh.rotation.set(Ue.next()*6,Ue.next()*6,Ue.next()*6),R.mesh.scale.setScalar(.7+Ue.next()*.7),R.vx=z,R.vy=Y,R.vz=q,R.rx=(Ue.next()-.5)*12,R.ry=(Ue.next()-.5)*12,R.maxLife=.35+Ue.next()*.35,R.life=R.maxLife,R.active=!0,R.mesh.visible=!0,R.mesh.material.opacity=1,a++},U=(R,L,P,C,z)=>{const Y=-P,q=-C;for(let te=0;te<z;te++){const oe=t[r++%mc];oe.active&&a--;const _e=(Ue.next()-.5)*1.4,Re=-q*_e,ie=Y*_e;D(oe,R+(Ue.next()-.5)*.4,.3+Ue.next()*.3,L+(Ue.next()-.5)*.4,Y*(1.5+Ue.next()*2)+Re,1.2+Ue.next()*2.2,q*(1.5+Ue.next()*2)+ie)}};return{group:e,get activeCount(){return a},get sparkleCount(){return o},dirtBurst(R,L,P,C,z=8){U(R,L,P,C,z)},get leatherFragments(){return u},get goldNuggets(){return m},get impactBursts(){return f},get transformBursts(){return x},get sweatParticles(){return v},sweatBurst(R,L){for(let P=0;P<3;P++){const C=M[(P+(R*7+L*11|0))%M.length];C.active&&v--,C.mesh.position.set(R+(i.next()-.5)*.4,Mt+.5,L+.25),C.mesh.scale.setScalar(.8+i.next()*.5),C.vx=(i.next()-.5)*.4,C.vy=.5+i.next(),C.vz=.2,C.maxLife=.5+i.next()*.3,C.life=C.maxLife,C.active=!0,C.mesh.visible=!0,C.mesh.material.opacity=1,v++}},hobbinTransform(R,L){U(R,L,0,0,14),x++},projectileImpact(R,L){for(let P=0;P<12;P++){const C=y[P%y.length];C.active&&f--;const z=P/12*Math.PI*2,Y=1.5+Ue.next()*2.5;C.mesh.position.set(R,Mt,L),C.mesh.rotation.set(Ue.next()*6,Ue.next()*6,Ue.next()*6),C.mesh.scale.setScalar(.8+Ue.next()*.8),C.vx=Math.cos(z)*Y,C.vy=.6+Ue.next()*2,C.vz=Math.sin(z)*Y,C.maxLife=.25+Ue.next()*.3,C.life=C.maxLife,C.active=!0,C.mesh.visible=!0,C.mesh.material.opacity=1,f++}},bagBreak(R,L){for(let P=0;P<12;P++){const C=p[P%p.length];C.active&&u--,T(C,R,L,P/12*Math.PI*2,2.5+Ue.next()*2,2+Ue.next()*2),u++}for(let P=0;P<6;P++){const C=S[P%S.length];C.active&&m--,T(C,R,L,P/6*Math.PI*2+.3,1.8+Ue.next()*1.5,2.6+Ue.next()*2),m++}for(let P=0;P<14;P++){const C=P/14*Math.PI*2;U(R+Math.cos(C)*.35,L+Math.sin(C)*.35,0,0,1)}},bagDust(R,L,P){U(R,L,0,0,P?8:4)},emeraldSparkle(R,L,P){const C=P?24:10;for(let z=0;z<C;z++){const Y=d[h++%c];Y.active&&o--;const q=Ue.next()*Math.PI*2,te=(P?2.4:1.3)+Ue.next()*(P?3:1.5);Y.mesh.position.set(R+(Ue.next()-.5)*.2,.4+Ue.next()*.3,L+(Ue.next()-.5)*.2),Y.mesh.rotation.set(Ue.next()*6,Ue.next()*6,Ue.next()*6),Y.mesh.scale.setScalar((P?1.4:.9)+Ue.next()*.6),Y.vx=Math.cos(q)*te,Y.vy=1.5+Ue.next()*(P?3.5:2),Y.vz=Math.sin(q)*te,Y.maxLife=.45+Ue.next()*(P?.6:.35),Y.life=Y.maxLife,Y.active=!0,Y.mesh.visible=!0,Y.mesh.material.opacity=1,o++}},update(R){if(R<=0)return;const L=(P,C,z)=>{for(const Y of P)if(Y.active){if(Y.life-=R,Y.life<=0){Y.active=!1,Y.mesh.visible=!1,z(C()-1);continue}Y.vy-=9*R,Y.mesh.position.x+=Y.vx*R,Y.mesh.position.y+=Y.vy*R,Y.mesh.position.z+=Y.vz*R,Y.mesh.rotation.x+=R*7,Y.mesh.rotation.y+=R*5,Y.mesh.material.opacity=Y.life/Y.maxLife}};L(p,()=>u,P=>{u=P}),L(S,()=>m,P=>{m=P});for(const P of y)if(P.active){if(P.life-=R,P.life<=0){P.active=!1,P.mesh.visible=!1,f--;continue}P.vy-=7*R,P.mesh.position.x+=P.vx*R,P.mesh.position.y+=P.vy*R,P.mesh.position.z+=P.vz*R,P.mesh.material.opacity=P.life/P.maxLife}for(const P of d)if(P.active){if(P.life-=R,P.life<=0){P.active=!1,P.mesh.visible=!1,o--;continue}P.vy-=7*R,P.mesh.position.x+=P.vx*R,P.mesh.position.y+=P.vy*R,P.mesh.position.z+=P.vz*R,P.mesh.rotation.x+=R*8,P.mesh.rotation.y+=R*6,P.mesh.material.opacity=P.life/P.maxLife}for(const P of M)if(P.active){if(P.life-=R,P.life<=0){P.active=!1,P.mesh.visible=!1,v--;continue}P.mesh.position.x+=P.vx*R,P.mesh.position.y+=P.vy*R,P.mesh.position.z+=P.vz*R,P.mesh.material.opacity=P.life/P.maxLife}for(const P of t)if(P.active){if(P.life-=R,P.life<=0){P.active=!1,P.mesh.visible=!1,a--;continue}P.vy-=9.8*R,P.mesh.position.x+=P.vx*R,P.mesh.position.y+=P.vy*R,P.mesh.position.z+=P.vz*R,P.mesh.position.y<.05&&(P.mesh.position.y=.05,P.vy*=-.3,P.vx*=.7,P.vz*=.7),P.mesh.rotation.x+=P.rx*R,P.mesh.rotation.y+=P.ry*R,P.mesh.material.opacity=P.life/P.maxLife}},clear(){for(const R of t)R.active=!1,R.mesh.visible=!1;for(const R of d)R.active=!1,R.mesh.visible=!1;for(const R of p)R.active=!1,R.mesh.visible=!1;for(const R of S)R.active=!1,R.mesh.visible=!1;for(const R of y)R.active=!1,R.mesh.visible=!1;for(const R of M)R.active=!1,R.mesh.visible=!1;a=0,v=0,o=0,u=0,m=0,f=0,x=0}}}const r_=["driving","digging","emerald","emeraldBonus","bagPush","bagWobble","bagFall","bagImpact","bagBreak","goldPickup","fire","recharge","enemyKill","enemyCrush","hobbinTransform","playerDeath","cherry","cherryAppear","bonusStart","bonusEat","bonusEnd","extraLife","levelComplete"],a_={driving:[{freq:90,endFreq:105,duration:.22,type:"square",volume:.025},{freq:45,duration:.22,type:"triangle",volume:.02}],digging:[{freq:180,endFreq:70,duration:.14,type:"sawtooth",volume:.045},{freq:620,duration:.06,type:"square",volume:.025,noise:!0}],emerald:[{freq:660,endFreq:990,duration:.08,type:"square",volume:.05}],emeraldBonus:[{freq:523,duration:.11,type:"square",volume:.075},{freq:659,duration:.11,type:"square",volume:.075,delay:.1},{freq:784,duration:.11,type:"square",volume:.075,delay:.2},{freq:988,duration:.11,type:"square",volume:.08,delay:.3},{freq:1319,duration:.22,type:"square",volume:.09,delay:.4},{freq:1568,duration:.16,type:"triangle",volume:.05,delay:.46}],bagPush:[{freq:180,endFreq:90,duration:.18,type:"sawtooth",volume:.09},{freq:310,endFreq:220,duration:.12,type:"square",volume:.035,delay:.04}],bagWobble:[{freq:150,endFreq:110,duration:.1,type:"triangle",volume:.05}],bagFall:[{freq:220,endFreq:60,duration:.22,type:"sawtooth",volume:.08}],bagImpact:[{freq:120,endFreq:45,duration:.16,type:"square",volume:.12},{freq:70,endFreq:40,duration:.2,type:"triangle",volume:.08},{freq:900,duration:.08,type:"square",volume:.04,noise:!0}],bagBreak:[{freq:1250,endFreq:300,duration:.35,type:"square",volume:.09},{freq:1850,endFreq:400,duration:.28,type:"triangle",volume:.06,delay:.02},{freq:640,endFreq:180,duration:.4,type:"sawtooth",volume:.07,delay:.05},{freq:2400,duration:.3,type:"square",volume:.05,noise:!0}],goldPickup:[{freq:880,endFreq:1320,duration:.12,type:"square",volume:.07},{freq:1320,endFreq:1760,duration:.1,type:"triangle",volume:.05,delay:.08}],fire:[{freq:1480,endFreq:320,duration:.16,type:"sawtooth",volume:.08},{freq:2400,endFreq:900,duration:.1,type:"square",volume:.035,delay:.02}],recharge:[{freq:330,endFreq:660,duration:.1,type:"triangle",volume:.05},{freq:660,duration:.1,type:"square",volume:.035,delay:.09}],enemyKill:[{freq:520,endFreq:120,duration:.22,type:"square",volume:.08},{freq:780,endFreq:180,duration:.16,type:"triangle",volume:.05,delay:.03}],enemyCrush:[{freq:220,endFreq:55,duration:.3,type:"sawtooth",volume:.1},{freq:1e3,duration:.12,type:"square",volume:.05,noise:!0}],hobbinTransform:[{freq:140,endFreq:55,duration:.36,type:"sawtooth",volume:.11},{freq:260,endFreq:90,duration:.26,type:"square",volume:.06,delay:.04}],playerDeath:[{freq:420,endFreq:60,duration:.5,type:"sawtooth",volume:.1}],cherry:[{freq:780,endFreq:1560,duration:.14,type:"square",volume:.07},{freq:1170,endFreq:1760,duration:.12,type:"triangle",volume:.05,delay:.08}],cherryAppear:[{freq:520,endFreq:880,duration:.18,type:"triangle",volume:.05}],bonusStart:[{freq:330,endFreq:660,duration:.25,type:"square",volume:.06},{freq:440,endFreq:880,duration:.3,type:"triangle",volume:.05,delay:.1}],bonusEat:[{freq:990,endFreq:1980,duration:.1,type:"square",volume:.07}],bonusEnd:[{freq:660,endFreq:220,duration:.25,type:"triangle",volume:.05}],extraLife:[{freq:659,duration:.1,type:"square",volume:.08},{freq:880,duration:.1,type:"square",volume:.08,delay:.1},{freq:1175,duration:.2,type:"square",volume:.08,delay:.2}],projectileFire:[{freq:1480,endFreq:320,duration:.16,type:"sawtooth",volume:.08}],projectileImpact:[{freq:900,endFreq:120,duration:.14,type:"square",volume:.09}],bonusKill:[{freq:990,endFreq:1980,duration:.1,type:"square",volume:.07}],hobbinDig:[{freq:210,endFreq:70,duration:.14,type:"sawtooth",volume:.05}],levelComplete:[{freq:523,duration:.12,type:"square",volume:.07},{freq:659,duration:.12,type:"square",volume:.07,delay:.12},{freq:784,duration:.22,type:"square",volume:.08,delay:.24}]},o_=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]],l_=[[72,76,79],[74,77,81],[76,79,83],[72,76,79]],ur=[72,76,79,84],Ea=i=>440*Math.pow(2,(i-69)/12);function c_(){let i=null,e=null,t=null;const n=[];let s=!1,r=!1,a="normal",o=0,l=0,c=null,d=0,h=0,u=0;const m=()=>{if(!i||e)return;e=i.createGain(),e.gain.value=s||r?0:.5,e.connect(i.destination);const w=Math.floor(i.sampleRate*.5);t=i.createBuffer(1,w,i.sampleRate);const E=t.getChannelData(0);let p=13723362;for(let S=0;S<w;S++)p=Math.imul(p,1664525)+1013904223>>>0,E[S]=p/4294967295*2-1},f=()=>{if(i){i.state==="suspended"&&i.resume().catch(()=>{});return}const w=typeof window<"u"?window.AudioContext||window.webkitAudioContext:void 0;if(w)try{i=new w,m(),i.state==="suspended"&&i.resume().catch(()=>{})}catch{i=null,e=null}},x=()=>a==="bonus"?220:a==="victory"?180:120,v=(w,E)=>{if(!i||!e||!t)return;const p=i.currentTime+(w.delay||0),S=w.duration,I=Math.min(.2,w.volume*Math.max(.1,E));if(w.noise){const U=i.createBufferSource();U.buffer=t;const R=i.createBiquadFilter();R.type="highpass",R.frequency.value=500;const L=i.createGain();L.gain.setValueAtTime(I,p),L.gain.exponentialRampToValueAtTime(1e-4,p+S),U.connect(R).connect(L).connect(e),U.start(p),U.stop(p+S+.01);return}const T=i.createOscillator(),D=i.createGain();T.type=w.type||"square",T.frequency.setValueAtTime(w.freq,p),w.endFreq&&w.endFreq!==w.freq&&T.frequency.exponentialRampToValueAtTime(Math.max(20,w.endFreq),p+S),D.gain.setValueAtTime(I,p),D.gain.exponentialRampToValueAtTime(1e-4,p+S),T.connect(D).connect(e),T.start(p),T.stop(p+S+.01)},_=(w,E=1)=>{if(n.push(w),!(s||r||!i||!e)){for(const p of a_[w]||[])v(p,E);w==="emeraldBonus"&&(u=performance.now()+600)}},M=()=>{if(!i||!e||s||r)return;const w=60/x(),E=h%4;if(a==="victory"){const T=ur[h%ur.length];v({freq:Ea(T),duration:w*.7,type:"square",volume:.08},1),c=T,l++;return}const p=a==="bonus"?l_:o_,S=p[Math.floor(h/4)%p.length],I=Ea(S[0]-12);if(v({freq:I,duration:w*.7,type:"triangle",volume:.055},1),E===0||E===2||a==="bonus"||A()>.5){const T=S[(E+1)%S.length];v({freq:Ea(T),duration:w*.35,type:"square",volume:.04},1),c=T}(E===0||E===2)&&v({freq:1800,duration:.04,type:"square",volume:.025,noise:!0},1),l++},A=()=>Math.min(1,o/6),y=()=>{if(!i||!e)return;const w=s||r?0:.5;e.gain.setTargetAtTime(w,i.currentTime,.02)};return{unlock:f,play:_,played:()=>n.slice(),clearLog:()=>{n.length=0},setMuted(w){s=!!w,y()},toggleMute(){return s=!s,y(),s},isMuted:()=>s,setPaused(w){r=!!w,y(),i&&!r&&i.state==="suspended"&&i.resume().catch(()=>{})},setMusicMode(w){w!==a&&(a=w,h=0,d=0,w==="victory"&&_("levelComplete"))},setEnemyCount(w){o=Math.max(0,Math.floor(w))},tick(w){if(r||s||!i)return;d+=Math.max(0,w);const E=60/x();for(a==="victory"&&h>=ur.length&&(a="normal",h=0);d>=E/2;)d-=E/2,M(),h++,a==="victory"&&h>=ur.length&&(a="normal",h=0)},snapshot(){return{unlocked:!!i,contextState:i?i.state:"uninitialized",muted:s,ducked:r||s,running:!!i&&!r&&!s,mode:a,tempo:x(),intensity:A(),notes:l,sounds:r_.slice(),lastNote:c,flourish:performance.now()<u}},dispose(){i&&i.close().catch(()=>{}),i=null,e=null,t=null,n.length=0}}}function u_(i){try{const t=(i??(typeof localStorage<"u"?localStorage:void 0))?.getItem("digger3d.highScore"),n=Number(t);return Number.isFinite(n)&&n>0?Math.floor(n):0}catch{return 0}}function h_(i,e,t){const n=new ct;n.position.set(-14*se/2,0,-9*se/2),i.add(n);const s=vs(1),r=s.grid;let a=new Fr(s.playerStart);const o=Au();n.add(o.group);const l=Ru();n.add(l.group);const c=i_();n.add(c.group);const d=s_();n.add(d.group);const h=j0();n.add(h.group);const u=e_();n.add(u.group);const m=t_();n.add(m.group);const f=n_(s.enemyEntry);n.add(f.group);let x=Oi(r),v=[];const _=c_(),M=(g,F=1)=>_.play(g,F),A=(g,F=0)=>{const V=C.lives,k=si(C,g,F);return C.lives>V&&M("extraLife"),k};let y=[],w=Eu(r,Mn(1).projectileCooldown),E=[],p=Ms(r,Ue,s.playerStart),S=ys(r,Mn(1),Ue,s.enemyEntry),I=null,T=0,D=0;const U=new ct,R=new Ne(new pn(.22,12,8),new xt({color:16720452,emissive:8917282,roughness:.4}));R.position.y=.3;const L=new Ne(new mi(.025,.025,.18,6),new xt({color:3843658}));L.position.y=.52,U.add(R,L),U.visible=!1,n.add(U),o.sync(r);const P=Z0(!0),C=Hr(Mn(1));zi(C,Mn(1),s.emeraldCount);let z=br(),Y=0,q=0,te=0,oe=!1,_e=0;const Re=g=>{_e=g/1e3},ie=.85;let B=0,ee=0;const Me=1.25;let ce=0,Ce="",st=!1,Ae=!0,Je=null;const et=()=>Je??C.level,Be=()=>Mn(et()),_t=()=>{C.highScore>0&&t?.persistHighScore?.(C.highScore)},ut=(g,F)=>{const V=C.score,k=C.lives,re=vs(g);for(let le=0;le<Xe;le++)for(let K=0;K<Ie;K++)Object.assign(r.get(K,le),re.grid.get(K,le));zi(C,Mn(g),re.emeraldCount),C.level=g,C.score=V,C.lives=k,z=br(),x=Oi(r),v=[],y=[],E=[],w.reset(),T=0,D=0,U.visible=!1,Ur(),p=Ms(r,Ue,re.playerStart),S=ys(r,Mn(g),Ue,re.enemyEntry),a.reset(re.playerStart),Pe.player=a,o.sync(r),h.sync(x,performance.now()/1e3),e?.settle(),e?.update(1/60)},qe=()=>{B>0||ce>0||!a.alive||(a.alive=!1,C.lives=Math.max(0,C.lives-1),B=ie,ee=0,a.moving=!1,a.digging=!1,d.bagDust(a.x,a.z,!0),M("playerDeath"),Re(xs),e?.shake(.55))},Qe=()=>{if(B=0,ee=0,C.lives<=0){C.phase="game-over",_t(),t?.showOverlay?.("game-over",{level:C.level,score:C.score,lives:C.lives,highScore:C.highScore});return}ut(C.level)},Xt=g=>{if(C.phase!=="playing"||B>0||ce>0)return!1;const F=r.emeraldCount()===0,V=S.spawnedEnemies()>=S.enemyQuota()&&S.aliveEnemies()===0;return g==="emeralds"&&!F||g==="quota"&&!V?!1:(ce=Me,Ce=g,C.phase="level-complete",C.remainingEmeralds=r.emeraldCount(),M("levelComplete"),_.setMusicMode("victory"),e?.pulse(.05),t?.showOverlay?.("level-complete",{level:C.level,score:C.score,lives:C.lives,highScore:C.highScore}),!0)},wt=g=>{if(ce<=0||(ce=Math.max(0,ce-g),ce>0))return;const F=C.level+1;Ce="",t?.showOverlay?.("hidden"),ut(F)};let Ot="HIGH";const qt=()=>C.phase!=="playing"||B>0||!a.alive||!w.fire(a.targetCell,a.direction,E).ok?!1:(l.muzzleFlash=1,l.recoil=1,M("projectileFire"),!0),en=g=>{const F=w.step(g,E);for(const V of F.events)u.impact(V.col,V.row),d.projectileImpact(V.col*se,V.row*se),M("projectileImpact"),e?.shake(V.reason==="enemy"?.12:.05),V.reason==="enemy"&&(A(V.score,0),M("enemyKill"),m.flash(V.col,V.row),c.show(`+${V.score}`,V.col*se,V.row*se,!1));for(const V of F.killed)E=E.filter(k=>k!==V);u.sync(w.projectiles(),g)},H=g=>{const F=g.col*se,V=g.row*se;d.hobbinTransform(F,V),m.transformFx(g.col,g.row),M("hobbinTransform"),e?.shake(.1),I={colorChanged:!0,squashStretch:!0,brightEyes:!0,largerClaws:!0,dirtBurst:!0,aggressiveSound:!0,col:g.col,row:g.row,id:g.id}},tn=()=>{T=Be().bonusDuration,D=0,C.bonusActive=!0,C.bonus=T,p.setFrightened(!0),_.setMusicMode("bonus"),M("bonusStart"),e?.pulse(.03)},dt=()=>{T=0,D=0,C.bonusActive=!1,C.bonus=0,p.setFrightened(!1),_.setMusicMode("normal"),Hn(z),C.chain=0,M("bonusEnd")},ht=()=>{const g=S.cherry();if(!g.available||!S.collectCherry())return!1;U.visible=!1;const F=gu(C,z);return C.chain=0,c.show(`+${F.points}`,g.col*se,g.row*se,!0),d.emeraldSparkle(g.col*se,g.row*se,!0),M("cherry"),tn(),!0},me=g=>{C.bonusActive&&(T=Math.max(0,T-g),C.bonus=T,T===0&&dt())},yt=(g,F,V,k,re)=>{const le=g*se,K=F*se;o.hideEmerald(g,F),d.emeraldSparkle(le,K,k),c.show(k?`+${re} CHAIN!`:`+${re}`,le,K,k),k&&(Y++,q=.35)},Le=(g,F)=>{if(!r.hasEmerald(g,F))return{ok:!1,score:C.score,chain:z.count,bonus:0,remaining:C.remainingEmeralds,popup:!1,particles:!1,flourish:!1,flash:!1};r.collectEmerald(g,F),C.remainingEmeralds=r.emeraldCount();const V=pu(C,z),k=z.lastBonus;return yt(g,F,V.bonus,k,V.points),M("emerald",k?1.4:1),k&&M("emeraldBonus"),{ok:!0,score:C.score,chain:z.count,bonus:V.bonus,remaining:C.remainingEmeralds,popup:!0,particles:!0,flourish:k,flash:k}},Pe={group:n,grid:r,player:a,input:P,state:C,start(){r.clear();const g=vs(et());for(let F=0;F<Xe;F++)for(let V=0;V<Ie;V++)Object.assign(r.get(V,F),g.grid.get(V,F));a=new Fr(g.playerStart),Pe.player=a,C.score=0,C.lives=3,C.extraLifeThreshold=2e4,zi(C,Be(),g.emeraldCount),z=br(),x=Oi(r),v=[],y=[],E=[],w.reset(),T=0,D=0,U.visible=!1,Ur(),p=Ms(r,Ue,g.playerStart),S=ys(r,Be(),Ue,g.enemyEntry),w.setCooldownDuration(Be().projectileCooldown),Ae=!0,l.muzzleFlash=0,l.recoil=0,_.clearLog(),o.sync(r),d.clear(),c.clear(),Y=0,q=0,_e=0,B=0,ee=0,ce=0,Ce="",C.tick=0,I=null,l.group.rotation.z=0,e?.settle(),e?.update(1/60)},restart(){Pe.start(),P.clear()},step(g){const F=P.takeDirection();if(F&&a.setDirection(F),(P.takeFire()||P.isDown("Space")||P.isDown("KeyF"))&&qt(),w.ready()&&!Ae&&M("recharge"),Ae=w.ready(),B>0){B=Math.max(0,B-g),ee+=g*14,B===0&&Qe();return}if(ce>0){wt(g);return}if(C.phase==="game-over")return;if(C.tick++,_e>0){_e=Math.max(0,_e-g);return}if(a.alive&&a.frac<.02){const Q=Ht(a.direction);if(Q.dy===0&&Q.dx!==0){const O={col:a.col+Q.dx,row:a.row},ne=x.bagAt(O.col,O.row);if(ne&&ne.state==="RESTING"){const j={player:{col:a.col,row:a.row},enemies:y};x.tryPush(O.col,O.row,Q.dx>0?"right":"left",j).ok&&(d.bagDust(O.col*se,O.row*se,!1),M("bagPush"),e?.shake(.06))}}}a.update(g,r),a.moving&&C.tick%18===0&&M("driving"),a.digging&&C.tick%7===0&&M("digging");for(const Q of a.dugThisTick)M("digging"),o.excavate(Q.col,Q.row),d.dirtBurst(Q.col*se,Q.row*se,Ht(a.direction).dx,Ht(a.direction).dy);const k=a.targetCell;r.hasEmerald(k.col,k.row)&&(Le(k.col,k.row),Xt("emeralds")),me(g),C.chain=z.count;const re=S.step(g);if(S.cherryJustAppeared()){const Q=S.cherry();U.position.set(Q.col*se,0,Q.row*se),U.visible=!0,M("cherryAppear")}for(const Q of re)p.addEnemy(Q.kind,{col:Q.col,row:Q.row},Q.speed);a.dugThisTick.length>0&&p.invalidateRoutes();const le=Be().hobbinChance;for(const Q of p.enemies())if(Q.kind==="nobbin"&&p.checkTransformation(le)){const O=p.transformEnemy(Q.id);O&&H(O)}const K=p.step(g,k);for(const Q of K){o.excavate(Q.col,Q.row);const O=Ht(p.enemies().find(ne=>ne.id===Q.id)?.direction??"right");d.dirtBurst(Q.col*se,Q.row*se,O.dx,O.dy,10),M("hobbinDig"),Q.emerald&&(C.remainingEmeralds=r.emeraldCount(),c.show("GEM LOST",Q.col*se,Q.row*se,!1),Xt("emeralds")),p.invalidateRoutes()}for(const Q of p.transformEvents())H(Q);const J=S.cherry();if(J.available&&J.col===k.col&&J.row===k.row&&ht(),!C.bonusActive&&C.phase==="playing"&&B===0){for(const Q of p.enemies())if(Q.col===k.col&&Q.row===k.row){qe();break}}if(C.bonusActive)for(const Q of[...p.enemies()]){if(Q.col!==k.col||Q.row!==k.row)continue;const O=++D,ne=_o(C,z,O);C.chain=0,p.removeEnemy(Q.id),S.removeEnemy(Q.id),c.show(`+${ne.points}`,Q.col*se,Q.row*se,!0),d.emeraldSparkle(Q.col*se,Q.row*se,!0),m.deathPop(Q.col,Q.row),d.sweatBurst(Q.col*se,Q.row*se),M("bonusEat"),e?.shake(.1)}N(g),en(g),S.spawnedEnemies()>=S.enemyQuota()&&S.aliveEnemies()===0&&Xt("quota");for(let Q=v.length-1;Q>=0;Q--){const O=v[Q];O.col===k.col&&O.row===k.row&&(A(O.value,0),c.show(`+${O.value}`,O.col*se,O.row*se,!0),d.emeraldSparkle(O.col*se,O.row*se,!0),M("goldPickup"),v.splice(Q,1))}},setDirection(g){a.setDirection(g)},playerSnapshot(){return{...a.snapshot(),speed:Yo}},gridSnapshot(){return r.snapshot()},excavatedCount(){return r.excavatedCount()},earthVisible(g){const F=new ot;return o.earth.getMatrixAt(g,F),F.elements[0]!==0||F.elements[5]!==0},scoreSnapshot(){return{score:C.score,highScore:C.highScore,lives:C.lives,chain:z.count,bonusPoints:z.bonusPoints,remainingEmeralds:C.remainingEmeralds,extraLifeThreshold:C.extraLifeThreshold}},emeraldPositions(){return r.emeraldPositions()},remainingEmeralds(){return r.emeraldCount()},collectEmeraldAt(g,F){return Le(g,F)},resetChain(g){Hn(z)},bagPositions(){return x.bags().map(g=>({col:g.col,row:g.row,state:g.state}))},bagSnapshots(){return x.bags().map(g=>({id:g.id,col:g.col,row:g.row,state:g.state,visualOffset:g.visualOffset,visualShake:g.visualShake,visualTilt:g.visualTilt,visualCompression:g.visualCompression,fallRows:g.fallRows}))},tryPushBag(g,F,V){const k=x.tryPush(g,F,V);return k.ok&&(d.bagDust(g*se,F*se,!1),e?.shake(.08)),k.ok},testBagCrush(g){if(g==="player")return qe(),{ok:!0,score:0};const F=mu(C,z);return Re(xs),e?.shake(.28),M("bagImpact"),d.bagDust(2*se,4*se,!0),{ok:!0,score:F.points}},testPlayerCrush(){return qe(),{ok:!0,score:0}},testBagBreak(){return Re(Zo),e?.shake(.5),e?.pulse(.04),d.bagBreak(3*se,5*se),M("bagBreak"),q=.22,v.push(Or(3,6)),{ok:!0,score:0}},setupBagFixture(g,F,V,k,re){for(let K=0;K<r.rows;K++)for(let J=0;J<r.cols;J++)r.setSolid(J,K,!1),r.setBag(J,K,!1),r.setEmerald(J,K,!1);r.setSolid(g.col,g.row+1,F),r.setBag(g.col,g.row,!0),x=Oi(r);const le=k||{col:g.col-1,row:g.row};a.reset(le),Pe.player=a,a.direction=re||"right",y=(V||[]).map(K=>({...K})),v=[],o.sync(r),h.sync(x,performance.now()/1e3)},setEnemyOccupants(g){y=g.map(F=>({...F}))},setupTacticalBagFixture(){const g=r.rows,F=r.cols;for(let V=1;V<g-3;V++)for(let k=1;k<F-1;k++){if(!r.hasBag(k,V))continue;const re={col:k,row:V+1},le=[{col:k,row:V+1},{col:k,row:V+2}],K=V+3;if(!r.isSolid(re.col,re.row)||r.isSolid(le[1].col,le[1].row)||!r.isSolid(k,K))continue;r.setSolid(re.col,re.row,!1),o.excavate(re.col,re.row),a.reset({col:1,row:4}),Pe.player=a,a.direction="right",y=[{kind:"nobbin",col:le[0].col,row:le[0].row},{kind:"hobbins",col:le[1].col,row:le[1].row}],o.sync(r),h.sync(x,performance.now()/1e3);const J=x.bagAt(k,V);return{ok:!0,bag:{col:k,row:V},support:re,shaft:le,id:J?J.id:-1}}return null},playSound(g){M(g)},unlockAudio(){_.unlock()},audioPlayed(){return _.played()},clearAudioLog(){_.clearLog()},audioSnapshot(){return _.snapshot()},setMusicMode(g){_.setMusicMode(g)},setEnemyCountForAudio(g){_.setEnemyCount(g)},setAudioPaused(g){_.setPaused(g)},toggleMute(){return _.toggleMute()},setMutedForTestHook(g){_.setMuted(g)},tickAudio(g){_.tick(g)},testBagCollectGold(){const g=v[0];if(!g)return null;const F=C.score,V=A(g.value,0);return v.shift(),M("goldPickup"),c.show(`+${g.value}`,g.col*se,g.row*se,!0),{ok:!0,score:V.score-F}},hitStop(){return _e*1e3},hitStopTick(g){_e=Math.max(0,_e-g)},cameraTick(g){e?.update(g)},cameraZoom(){return e?.zoom??1},projectileSnapshots(){return w.projectiles().map(g=>({id:g.id,col:g.col,row:g.row,progress:g.progress,direction:g.direction,speed:g.speed,life:g.life}))},weaponHud(){const g=w.cooldown(),F=w.duration(),V=g<=0?1:Math.max(0,Math.min(1,1-g/F));return{text:g<=0?"READY":`CHARGING ${Math.round(V*100)}%`,ready:g<=0,ratio:V,duration:F,remaining:g}},fireProjectile:qt,lastProjectileImpact(){const g=w.lastImpact();return g?{...g}:null},enemySnapshot(){const g=p.snapshot();return{...g,enemies:g.enemies.map(F=>({...F}))}},spawnerSnapshot(){return{...S.snapshot()}},setupEnemyFixture(g="nobbin",F){p.reset();const V=F||s.enemyEntry;p.addEnemy(g,V)},setupEnemyContactFixture(){const g={...a.targetCell};return r.setSolid(g.col,g.row,!1),p.reset(),p.addEnemy("nobbin",g,0),{...g}},forceHobbinTransformation(){const g=p.enemies().find(V=>V.kind==="nobbin");if(!g)return!1;const F=p.transformEnemy(g.id);return F?(H(F),!0):!1},hobbinTransformFx(){return I?{...I}:null},hobbinViewStyle(){return m.style()},enemyVisualSnapshot(){return{style:m.style(),enemies:m.snapshot(),portal:f.snapshot(),dustPuffs:f.dustPuffs,sweatParticles:m.sweatParticles+d.sweatParticles,legRate:m.legRate,deathPops:m.deathPops,transformSquash:m.transformSquash,particleSweat:d.sweatParticles}},cherrySnapshot(){const g=S.cherry();return{available:g.available,col:g.col,row:g.row,collected:g.collected}},bonusSnapshot(){return{active:C.bonusActive,remaining:T,duration:Be().bonusDuration,tier:D,chain:z.count,enemiesFleeing:p.frightenedIds().length>0&&C.bonusActive,frightened:p.frightenedIds(),hud:C.bonusActive?"BONUS":""}},setupSpawnerFixture(g){S.reset(),S.setSpawnedCountForTest(g),U.position.set(s.enemyEntry.col*se,0,s.enemyEntry.row*se),U.visible=S.cherry().available},stepSpawnerFor(g){const F=S.step(g);for(const V of F)p.addEnemy(V.kind,{col:V.col,row:V.row},V.speed);if(S.cherryJustAppeared()){const V=S.cherry();U.position.set(V.col*se,0,V.row*se),U.visible=!0}},setupCherryCollectionFixture(){const g=S.cherry();a.reset({col:g.col,row:g.row}),Pe.player=a,U.position.set(g.col*se,0,g.row*se),U.visible=g.available},collectCherryByPlayer(){ht()},setupFrightFixture(){p.reset(),p.addEnemy("nobbin",{col:5,row:4},1.4),p.addEnemy("hobbin",{col:7,row:4},1.4)},setupBonusKillFixture(){p.reset();for(let g=0;g<5;g++)p.addEnemy("nobbin",{col:3+g,row:4},1.4);T=Be().bonusDuration,C.bonusActive=!0,C.bonus=T,p.setFrightened(!0)},frightenEnemies(){T=Be().bonusDuration,C.bonusActive=!0,C.bonus=T,p.setFrightened(!0),e?.pulse(.03)},tickBonus(g){me(g)},killFrightenedEnemy(){const g=p.enemies().find(k=>k.mode==="frightened");if(!g)return null;const F=++D,V=_o(C,z,F);return C.chain=0,p.removeEnemy(g.id),S.removeEnemy(g.id),c.show(`+${V.points}`,g.col*se,g.row*se,!0),m.deathPop(g.col,g.row),d.sweatBurst(g.col*se,g.row*se),M("bonusEat"),{points:V.points,tier:F,score:C.score}},setupHobbinDigFixture(g,F){for(let V=0;V<r.rows;V++)for(let k=0;k<r.cols;k++)r.setSolid(k,V,V!==F.row),r.setEmerald(k,V,!1),r.setBag(k,V,!1);r.setSolid(F.col,F.row,!0),r.setEmerald(F.col,F.row,!0),C.remainingEmeralds=r.emeraldCount(),a.reset({col:F.col+1,row:F.row}),Pe.player=a,p.reset(),p.addEnemy("hobbin",g,3),o.sync(r),d.clear()},isSolidAt(g,F){return r.isSolid(g,F)},isEmeraldAt(g,F){return r.hasEmerald(g,F)},setupProjectileFixture(g,F,V,k){for(let re=0;re<r.rows;re++)for(let le=0;le<r.cols;le++)r.setSolid(le,re,!1),r.setBag(le,re,!1),r.setEmerald(le,re,!1);a.reset(g),a.direction=F,Pe.player=a,E=(V||[]).map(re=>({...re})),w.reset(),k==="solid"&&r.setSolid(g.col+3,g.row,!0),k==="bag"&&r.setBag(g.col+3,g.row,!0),o.sync(r)},setLevelForTest(g){Je=Math.max(1,Math.floor(g))},testEnemyContact(){return!a.alive||B>0||C.phase!=="playing"?{ok:!1,score:0}:C.bonusActive?{ok:!1,score:0}:(qe(),{ok:!0,score:0})},forceLevelComplete(g){if(C.phase!=="playing")return{ok:!1,reason:""};if(g==="emeralds"){for(let V=0;V<Xe;V++)for(let k=0;k<Ie;k++)r.setEmerald(k,V,!1);C.remainingEmeralds=0,o.sync(r)}else S.setSpawnedCountForTest(S.enemyQuota()),S.clearActiveForTest(),p.reset();const F=Xt(g);return{ok:F,reason:F?g:""}},setHighScoreForTest(g){C.highScore=Math.max(0,Math.floor(g))},setQualityForTest(g){Ot=g;const F=Ot!=="LOW";return t?.setPostFxEnabled?.(F),{enabled:F}},deathSnapshot(){return{active:B>0,timer:B,lives:C.lives,phase:C.phase,spin:ee}},lifecycleSnapshot(){return{phase:C.phase,level:C.level,score:C.score,lives:C.lives,highScore:C.highScore,tick:C.tick,remainingEmeralds:r.emeraldCount(),playerAlive:a.alive,completeTimer:ce,completeReason:Ce}},setSimulationPaused(g){st=g},isSimulationPaused(){return st},visualSnapshot(){return{clock:te,frozen:oe}},renderStats(){return{earthInstances:o.earthInstances,tunnelFloorInstances:o.floorInstances,diggerParts:l.partCount,hasParticles:!!d.group&&d.group.children.length>0,activeParticles:d.activeCount,emeraldSparkles:d.sparkleCount,activePopups:c.activeCount,playerAlive:a.alive,playerDeathSpin:ee,deathActive:B>0,flourishes:Y,flashing:q>0,chain:z.count,cameraShake:(e?.shakeAmount??0)>.01,flash:q>0,leatherFragments:d.leatherFragments,goldNuggets:d.goldNuggets,bagCount:x.bags().length,goldDrops:v.length,hitStopMs:_e*1e3,seed:an,difficulty:Mn(1),projectileVisible:u.visibleBolts>0,muzzleFlash:l.muzzleFlash>.05,recoil:l.recoil>.05,impactBursts:d.impactBursts,enemyFlashes:m.flashes,transformBursts:d.transformBursts,transformSquash:m.transformSquash,sweatParticles:d.sweatParticles,deathPops:m.deathPops,postFxEnabled:Ot!=="LOW",levelCompleteActive:ce>0,levelCompleteReason:Ce}},dispose(){P.dispose(),o.dispose(),h.dispose(),i.remove(n),t?.showOverlay?.("hidden")}};function N(g){const F=[{...a.targetCell,kind:"player"},...y],V=x.update(g,F);for(const k of V.crushes)k.kind!=="player"?(A(250,z.count),M("enemyCrush"),M("bagImpact"),Re(xs),e?.shake(.16),c.show(`+${k.score}`,k.col*se,k.row*se,!1)):qe();for(const k of V.events)if(k.type==="break"){const re=k;Re(re.hitStop),e?.shake(re.shake*.5),e?.pulse(.04),d.bagBreak(re.col*se,re.row*se),M("bagBreak"),q=.22,v.push(Or(re.goldCell.col,re.goldCell.row))}else k.type==="wobble"?(d.bagDust(k.col*se,k.row*se,!1),M("bagWobble",k.strength)):k.type==="fall"?M("bagFall",k.strength):k.type==="land"&&(d.bagDust(k.col*se,k.row*se,!0),M("bagImpact",k.strength));for(const k of V.crushes)k.kind!=="player"&&(y=y.filter(re=>!(re.col===k.col&&re.row===k.row)));h.sync(x,performance.now()/1e3),o.sync(r)}return{game:Pe,animate(g,F=!1){const V=F?0:.016666666666666666;te+=V,oe=F,V>0&&q>0&&(q=Math.max(0,q-V));const k=a.snapshot();l.update(k,te,V),B>0?(l.group.rotation.y=ee,l.group.rotation.z=Math.sin(ee*2)*.2):l.group.rotation.z=0,c.update(V),d.update(V),u.update(V),m.sync(p.enemies(),te/1e3),m.update(V),f.update(V),h.sync(x,te/1e3)}}}function Ii(i){return document.getElementById(i)}function f_(){const i=Ii("score"),e=Ii("high-score"),t=Ii("level"),n=Ii("lives"),s=Ii("weapon"),r=Ii("bonus");let a={text:"READY",ready:!0,ratio:1,duration:3,remaining:0},o=0,l=0,c=0,d=0;const h=u=>String(Math.floor(u)).padStart(6,"0");return{update(u){if(i){if(u.score!==d&&(u.score-d>=500&&(c=performance.now()+420),d=u.score,l=u.score),o!==l){const f=l-o;o+=f>30?Math.ceil(f*.28):Math.sign(f)*Math.min(Math.abs(f),4),Math.abs(l-o)<1&&(o=l)}const m=performance.now()<c;i.textContent=h(o),i.classList.toggle("punch",m)}if(e&&(e.textContent=h(u.highScore)),t&&(t.textContent=String(u.level)),n&&(n.textContent=String(u.lives)),r){const m=r.closest(".hud-block");m&&m.classList.toggle("hidden",!u.bonus),r.textContent=u.bonus?`BONUS x2 ${Math.ceil(u.bonusTime)}s`:""}a=u.weapon,s&&(s.textContent=a.text,s.classList.toggle("charging",!a.ready),s.style.setProperty("--charge",`${Math.round(a.ratio*100)}%`),s.setAttribute("aria-label",`Weapon ${a.text}`))},weapon:()=>a}}function Ni(i){return String(i??"")}function d_(i){let e="title",t="",n=null;const s={};i&&(t=i.innerHTML,i.querySelectorAll("[data-toggle]").forEach(l=>{const c=l.dataset.toggle;c&&(s[c]=l.textContent?.trim()||"")}));const r=l=>{if(e="hidden",!i)return;i.hidden=!1,n&&(i.removeEventListener("click",n),n=null);const c=document.createElement("pre");c.dataset.selfTests="true",c.style.cssText="max-height:82vh;overflow:auto;margin:0;padding:16px;font:12px/1.45 monospace;white-space:pre-wrap;text-align:left;color:#ffe9a8;",c.textContent=l.join(`
`),i.innerHTML="",i.appendChild(c)},a=()=>{!i||e!=="title"||i.querySelectorAll("[data-toggle]").forEach(l=>{const c=l.dataset.toggle;c&&s[c]&&(l.textContent=s[c])})},o=(l,c)=>{if(e=l,!i)return;if(l==="hidden"){i.hidden=!0,i.innerHTML="";return}if(i.hidden=!1,n&&(i.removeEventListener("click",n),n=null),l==="title"){i.innerHTML=t,a();return}const d=c||{level:1,score:0,lives:3,highScore:0},h=l==="pause"?'<h2>PAUSED</h2><p class="prompt">PRESS P TO RESUME</p>':l==="level-complete"?`<h2>LEVEL COMPLETE</h2><p class="summary">LEVEL ${Ni(d.level)} CLEARED</p><p class="summary">SCORE ${Ni(d.score).padStart(6,"0")} &nbsp; LIVES ${Ni(d.lives)}</p><p class="prompt">PREPARING NEXT LEVEL...</p>`:`<h2 class="game-over">GAME OVER</h2><p class="summary">SCORE ${Ni(d.score).padStart(6,"0")}</p><p class="summary">LEVEL REACHED ${Ni(d.level)}</p><p class="summary">HIGH SCORE ${Ni(d.highScore).padStart(6,"0")}</p><p class="prompt">PRESS ENTER TO RESTART</p>`;i.innerHTML=`<div class="panel state-panel" data-overlay="${l}">${h}</div>`};return{root:i,show:o,current:()=>e,toggleStates:()=>({...s}),restoreTitle(){o("title")},showSelfTests:r,dispose(){i&&n&&i.removeEventListener("click",n),n=null}}}const Et={col:11,row:4},hr=1,ba=Et.col-.55,wa=6.2,Tr=.55,xo=.7,p_=1.1,gc=.6+Tr+xo+p_;function _c(i,e,t){return{col:Math.floor(i),row:Et.row,frac:i-Math.floor(i),x:i,z:Et.row,y:.45,direction:"right",visualDirection:"right",turnEase:0,moving:!t,digging:t,buffered:null,alive:!0}}function m_(){const i=new ct;i.position.set(-14*se/2,0,-9*se/2),i.visible=!0;const e=Au();i.add(e.group);const t=Ru();i.add(t.group);const n=[],s=new Ji(.09,0),r=new Qt({color:12124111,transparent:!0,opacity:.9});for(let M=0;M<8;M++){const A=new Ne(s,r);A.visible=!1,i.add(A),n.push(A)}const a=new vi,o=vs(1);for(let M=0;M<Xe;M++)for(let A=0;A<Ie;A++)Object.assign(a.get(A,M),o.grid.get(A,M));const l=a.get(Et.col,Et.row);l.solid=!0,l.excavated=!1,l.emerald=!0,l.cost=4,e.sync(a);let c=!1,d=0,h=0,u="drive",m=!1,f=!1,x=0;d=0,m=!1,f=!1,u="drive",l.solid=!0,l.excavated=!1,l.emerald=!0,l.cost=4,e.sync(a);const _=M=>{if(!c)return;h++,d+=Math.max(0,Math.min(M,.1)),d>=gc&&(d-=gc);let A=hr;const y=(ba-hr)/wa;d<y?(u="drive",A+=d*wa):m&&d<y+Tr?(u="dig",A=ba+Math.sin((d-y)*22)*.035):(A=ba+.25,f&&(u=d<y+Tr+xo?"gem":"hold")),d>=y&&!m&&(m=!0,u="dig",a.excavate(Et.col,Et.row),e.excavate(Et.col,Et.row)),m&&!f&&d>=y+Tr&&(f=!0,x=d,u="gem",a.collectEmerald(Et.col,Et.row),e.hideEmerald(Et.col,Et.row)),d<y&&(m=!1,f=!1,u="drive",a.get(Et.col,Et.row).solid=!0,a.get(Et.col,Et.row).excavated=!1,a.get(Et.col,Et.row).emerald=!0,e.sync(a),A=hr+d*wa),t.update(_c(A,d,u==="dig"||u==="gem"),d,M);for(let w=0;w<n.length;w++){const E=n[w];if(!f||u==="hold"||u==="drive"){E.visible=!1;continue}const p=Math.max(0,d-x),S=w/n.length*Math.PI*2+p*3,I=.28+p*.85;E.visible=p<xo+.2,E.position.set((Et.col-(Ie-1)/2)*se+Math.cos(S)*I,.45+Math.sin(S*1.7)*.15,(Et.row-(Xe-1)/2)*se+Math.sin(S)*I),E.scale.setScalar(Math.max(.1,1-p*2))}};return t.update(_c(hr,0,!1),0,1/60),{group:i,get visible(){return i.visible},tick:_,setActive(M){if(c=!!M,i.visible=c,!c)for(const A of n)A.visible=!1},snapshot(){const M=t.group.position;return{active:c,visible:i.visible,frame:h,phase:u,diggerX:M.x,diggerZ:M.z,excavated:m,gemCollected:f}},dispose(){e.dispose(),s.dispose(),r.dispose()}}}function Ui(i,e,t=.16){return new W((i-(Ie-1)/2)*se,t,(e-(Xe-1)/2)*se)}function g_(i){const e=document.getElementById("debug"),t=new ct;t.name="debug-grid",t.visible=!1,i.add(t);let n=!1,s=0,r={};const a=new ct,o=new ct,l=new ct,c=new ct,d=new ct;t.add(a,o,l,c,d);const h=new pn(.055,6,4),u=new St(.86,.02,.86),m=new Qi(.88,.88),f=new Qt({color:3895162,transparent:!0,opacity:.16,depthWrite:!1}),x=new Qt({color:2807462,transparent:!0,opacity:.1,depthWrite:!1}),v=new Qt({color:10479871}),_=new vr({color:4184260,transparent:!0,opacity:.32}),M=new vr({color:15770186,transparent:!0,opacity:.32}),A=new vr({color:16737620}),y=p=>{for(const S of p.children.slice())p.remove(S),(S instanceof va||S instanceof Ne)&&S.geometry.dispose()},w=p=>{y(a),y(o),y(l),y(c),y(d);for(let S=0;S<Xe;S++)for(let I=0;I<Ie;I++){const T=Ui(I,S),D=new Ne(h,v);if(D.position.copy(Ui(I,S,.3)),a.add(D),(p.cells[S*Ie+I]||"#")==="#"){const C=new Ne(u,f);C.position.copy(Ui(I,S,.22)),o.add(C)}else{const C=new Ne(m,x);C.rotation.x=-Math.PI/2,C.position.copy(Ui(I,S,.19)),l.add(C)}const R=T,L=p.tunnel[S*Ie+I]===!0,P=[];I+1<Ie&&P.push([I+1,S]),S+1<Xe&&P.push([I,S+1]);for(const[C,z]of P){const Y=p.tunnel[z*Ie+C]===!0,q=new va(new jt().setFromPoints([R,Ui(C,z)]),L&&Y?_:M);c.add(q)}}for(const S of p.paths){if(S.length<2)continue;const I=S.map(T=>Ui(T.col,T.row,.34));d.add(new va(new jt().setFromPoints(I),A))}};return{toggle(){return s++,n=!n,t.visible=n,e&&(e.hidden=!n),n},visible:()=>n,update(p,S){const I=S.info.render;let T=0;i.traverseVisible(D=>{D instanceof Ne&&T++}),r={fps:Number(p.fps.toFixed(1)),frameMs:Number(p.frameMs.toFixed(2)),drawCalls:I.calls,meshes:T,particles:p.particles,seed:`0x${an.toString(16).toUpperCase()}`,level:p.level,playerCol:p.playerCol,playerRow:p.playerRow,playerDirection:p.playerDirection,playerState:p.playerState,remainingEmeralds:p.remainingEmeralds,enemiesAlive:p.enemiesAlive,spawned:p.spawned,quota:p.quota,nobbins:p.nobbins,hobbins:p.hobbins,weaponCooldown:Number(p.weaponCooldown.toFixed(3)),bonusTime:Number(p.bonusTime.toFixed(2)),bags:p.bags.map(D=>({...D})),gameState:p.gameState,grid:{visible:n,cells:Ie*Xe,centers:t.children[0].children.length,solid:t.children[1].children.length,excavated:t.children[2].children.length,edges:t.children[3].children.length,earthEdges:t.children[3].children.filter(D=>D.material===M).length,cellStates:p.cells,paths:p.paths.map(D=>D.map(U=>({...U})))}},n&&(w(p),e&&(e.textContent=[`fps ${r.fps}  frameMs ${r.frameMs}`,`drawCalls ${r.drawCalls}  meshes ${r.meshes}  particles ${r.particles}`,`seed ${r.seed}  level ${r.level}  gameState ${r.gameState}`,`playerCol ${r.playerCol}  playerRow ${r.playerRow}  playerDirection ${r.playerDirection}  playerState ${r.playerState}`,`remainingEmeralds ${r.remainingEmeralds}  enemiesAlive ${r.enemiesAlive}  spawned ${r.spawned}  quota ${r.quota}  nobbins ${r.nobbins}  hobbins ${r.hobbins}`,`weaponCooldown ${r.weaponCooldown}  bonusTime ${r.bonusTime}`,`bags ${JSON.stringify(r.bags)}`,`grid cells ${Ie*Xe} visible ${n}`].join(`
`)))},snapshot:()=>({...r,visible:n,toggleCount:s}),dispose(){y(a),y(o),y(l),y(c),y(d),i.remove(t),h.dispose(),u.dispose(),m.dispose(),f.dispose(),x.dispose(),v.dispose(),_.dispose(),M.dispose(),A.dispose()}}}const Zt={createRng:qo,createGameState:Hr,resetLevelState:zi,difficultyFor:Mn,scoring:_u,enemies:wu,spawning:Tu,constants:{ENEMY_ENTRY:Es}};function ae(i,e,...t){const n=i.game[e];if(typeof n!="function")throw new Error(`missing game hook ${e}`);return n(...t)}function it(i,e){return{ok:i,detail:e}}function So(i,e,t=1/60){const n=Math.max(1,Math.round(e/t));for(let s=0;s<n;s++)ae(i,"step",t);return n}function Wt(i){ae(i,"setSimulationPaused",!0),ae(i,"restart")}function jo(){const i=new vi;for(let e=0;e<i.rows;e++)for(let t=0;t<i.cols;t++)i.setSolid(t,e,!1);return i}const lt=[];lt.push({name:"Coordinate separation",fn:i=>{Wt(i);const e=ae(i,"playerSnapshot"),t=ae(i,"gridSnapshot"),n=i.visualOffset(3,2,-4),s=ae(i,"playerSnapshot"),r=ae(i,"gridSnapshot");i.visualOffset(0,0,0);const a=ei(e,s);return it(n.meshMoved===!0&&e.x===s.x&&e.z===s.z&&e.col===s.col&&e.row===s.row&&e.frac===s.frac&&t===r&&a===!0,`logical=${s.col},${s.row},frac=${s.frac.toFixed(3)} meshMoved=${n.meshMoved} gridStable=${t===r}`)}});lt.push({name:"Digging",fn:i=>{const e=jo();e.setSolid(3,2,!0),e.setSolid(2,2,!1);const t=Ko({col:2,row:2}),n=qi(e,{col:2,row:2},{col:3,row:2},!1);t.setDirection("right");for(let r=0;r<30;r++)t.update(1/60,e);const s=qi(e,{col:2,row:2},{col:3,row:2},!1);return it(!e.isSolid(3,2)&&e.isExcavated(3,2)&&e.get(3,2).cost===1&&n.length===0&&s.some(r=>r.col===3&&r.row===2)&&t.col>=3,`cell=${e.isSolid(3,2)?"solid":"excavated"} routeBefore=${n.length} routeAfter=${s.length}`)}});lt.push({name:"Buffered turn",fn:i=>{const e=jo(),t=Ko({col:2,row:2});t.setDirection("right"),t.update(1/60,e),t.setDirection("up");const n=t.snapshot().direction;for(let r=0;r<90;r++)t.update(1/60,e);const s=t.snapshot();return it(n==="right"&&s.direction==="up"&&s.row<2,`buffered=${n} final=${s.direction} row=${s.row}`)}});lt.push({name:"Emerald",fn:i=>{Wt(i),ae(i,"resetChain");const e=ae(i,"emeraldPositions")[0],t=ae(i,"scoreSnapshot").score,n=ae(i,"remainingEmeralds"),s=ae(i,"collectEmeraldAt",e.col,e.row),r=ae(i,"scoreSnapshot").score;return it(s.ok===!0&&r-t===25&&n-1===ae(i,"remainingEmeralds")&&!ae(i,"isEmeraldAt",e.col,e.row),`gem=${e.col},${e.row} delta=${r-t} remaining=${ae(i,"remainingEmeralds")}`)}});lt.push({name:"Emerald chain",fn:i=>{Wt(i),ae(i,"resetChain");const e=ae(i,"emeraldPositions").slice(0,8),t=ae(i,"scoreSnapshot").score;let n=0;for(const r of e)n+=ae(i,"collectEmeraldAt",r.col,r.row).bonus;const s=ae(i,"scoreSnapshot");return it(e.length===8&&n===250&&s.chain===8&&s.bonusPoints===250&&s.score-t===450,`gems=${e.length} bonus=${n} scoreDelta=${s.score-t}`)}});function Wr(i,e,t){const n=jo();n.setSolid(i,e,!1);for(let s=e+1;s<t;s++)n.setSolid(i,s,!1);return n.setSolid(i,t,!0),n.setBag(i,e,!0),{grid:n,manager:Oi(n)}}lt.push({name:"Bag unsupported",fn:i=>{const{grid:e,manager:t}=Wr(4,2,4),n=new Set;n.add(t.bags()[0].state),t.update(1/60,[]),n.add(t.bags()[0].state),e.setSolid(4,3,!1);for(let s=0;s<45&&(t.update(1/60,[]),n.add(t.bags()[0].state),!(t.bags()[0].state==="BROKEN"||t.bags()[0].state==="RESTING"));s++);return it(n.has("RESTING")&&n.has("WOBBLING")&&n.has("FALLING")&&Vr.includes(t.bags()[0].state),`states=${Array.from(n).join(">")}`)}});lt.push({name:"One-row fall",fn:i=>{const e=Wr(5,2,4);e.grid.setSolid(5,3,!1);let t=[];for(let s=0;s<120;s++){const r=e.manager.update(.016666666666666666,[]);if(r.landed.length){t=r.landed;break}}const n=e.manager.bags()[0];return it(t.length===1&&t[0].fallRows===1&&t[0].broken===!1&&n.state!=="BROKEN"&&e.grid.hasBag(5,3),`fallRows=${t[0]?.fallRows} broken=${t[0]?.broken} state=${n.state}`)}});lt.push({name:"Multi-row fall",fn:i=>{const{grid:e,manager:t}=Wr(6,1,4);e.setSolid(6,2,!1),e.setSolid(6,3,!1);let n=[];for(let r=0;r<180;r++){const a=t.update(.016666666666666666,[]);if(a.landed.length){n=a.landed;break}}const s=Or(6,4);return it(n.length===1&&n[0].fallRows>=2&&n[0].broken===!0&&t.bags()[0].state==="BROKEN"&&s.state==="COLLECTIBLE"&&s.value===500&&s.playerOnly===!0&&!e.hasBag(6,4),`fallRows=${n[0]?.fallRows} broken=${n[0]?.broken} gold=${s.value}`)}});lt.push({name:"Enemy crush",fn:i=>{Wt(i),ae(i,"setupBagFixture",{col:7,row:2},!1,[{kind:"nobbin",col:7,row:3}],{col:6,row:2},"up");const e=ae(i,"scoreSnapshot").score;for(let n=0;n<120&&(ae(i,"step",1/60),ae(i,"scoreSnapshot").score===e);n++);const t=ae(i,"scoreSnapshot").score;return it(t-e===250,`scoreDelta=${t-e}`)}});lt.push({name:"Player crush",fn:i=>{Wt(i),ae(i,"setupBagFixture",{col:8,row:2},!1,void 0,{col:8,row:3},"down"),ae(i,"setSolidForTest",7,3,!0),ae(i,"setSolidForTest",9,3,!0),ae(i,"setSolidForTest",8,4,!0);const e=ae(i,"scoreSnapshot");for(let n=0;n<120&&(ae(i,"step",1/60),!(ae(i,"scoreSnapshot").lives<e.lives));n++);const t=ae(i,"scoreSnapshot");return it(t.lives===e.lives-1&&t.score===e.score,`lives=${e.lives}->${t.lives} scoreDelta=${t.score-e.score}`)}});lt.push({name:"Bag state exclusivity",fn:i=>{const{grid:e,manager:t}=Wr(9,2,4);e.setSolid(9,3,!1);let n=t.assertExclusive(),s=0,r=t.bags()[0].state;for(let a=0;a<180;a++){t.update(1/60,[]),n=n&&t.assertExclusive();const o=t.bags()[0];if(Vr.includes(o.state)||(n=!1),o.state!==r&&(s++,r=o.state),o.state==="RESTING"&&s>1)break}return it(n&&s>=3,`exclusive=${n} transitions=${s}`)}});lt.push({name:"Projectile direction",fn:i=>{Wt(i),ae(i,"setupProjectileFixture",{col:2,row:2},"right"),ae(i,"fireProjectile");const e=ae(i,"projectileSnapshots")[0];So(i,.15);const t=ae(i,"projectileSnapshots")[0]||e;return it(e&&e.direction==="right"&&t.direction==="right"&&t.row===2&&t.col>=e.col&&t.progress>=0,`dir=${t?.direction} col=${e?.col}->${t?.col} row=${t?.row}`)}});lt.push({name:"Projectile hit",fn:i=>{Wt(i),ae(i,"setupProjectileFixture",{col:2,row:2},"right",[{kind:"nobbin",col:4,row:2}]);const e=ae(i,"scoreSnapshot").score;ae(i,"fireProjectile");let t=null;for(let s=0;s<90&&(ae(i,"step",1/60),t=ae(i,"lastProjectileImpact"),!t);s++);const n=ae(i,"scoreSnapshot").score;return it(!!t&&t.reason==="enemy"&&t.score===250&&n-e===250&&ae(i,"projectileSnapshots").length===0&&ae(i,"weaponHud").ready===!1,`impact=${t?.reason} delta=${n-e} bolts=${ae(i,"projectileSnapshots").length}`)}});lt.push({name:"Cooldown",fn:i=>{Wt(i),ae(i,"setupProjectileFixture",{col:2,row:2},"right");const e=ae(i,"fireProjectile"),t=ae(i,"fireProjectile"),n=ae(i,"weaponHud");return it(e===!0&&t===!1&&n.ready===!1&&ae(i,"projectileSnapshots").length===1&&n.remaining>0,`fired=${e} again=${t} bolts=${ae(i,"projectileSnapshots").length} remaining=${n.remaining.toFixed(2)}`)}});function el(i){const e=new vi;for(let n=0;n<e.rows;n++)for(let s=0;s<e.cols;s++)e.setSolid(s,n,!1);const t=Zt.enemies.createEnemyManager(e,Zt.createRng(13723362),i);return{grid:e,manager:t}}lt.push({name:"Nobbin tunnel constraint",fn:()=>{const i=el({col:5,row:4});if(!i)return it(!1,"production enemy manager unavailable");const{grid:e,manager:t}=i;for(let a=0;a<e.rows;a++)a!==0&&e.setSolid(4,a,!0);const n=t.addEnemy("nobbin",{col:2,row:4},2.4);let s=!1,r=!1;for(let a=0;a<300;a++){t.step(1/60,{col:7,row:4});const o=[{col:n.col,row:n.row},...n.route];for(const l of o)e.isSolid(l.col,l.row)&&(s=!0);n.col>4&&(r=!0)}return it(!s&&r,`solidCellsOnPath=${s} crossedWall=${r} end=${n.col},${n.row}`)}});lt.push({name:"Nobbin dynamic path",fn:()=>{const i=el({col:8,row:4});if(!i)return it(!1,"production enemy manager unavailable");const{grid:e,manager:t}=i;for(let l=0;l<e.rows;l++)l!==8&&e.setSolid(4,l,!0);const n=t.addEnemy("nobbin",{col:2,row:4},2.4);t.step(1/60,{col:8,row:4});const s=n.route.map(l=>`${l.col},${l.row}`).join(" "),r=n.route.some(l=>l.col===4&&l.row===8);e.setSolid(4,4,!1),t.invalidateRoutes(),t.step(1/60,{col:8,row:4});const a=n.route.map(l=>`${l.col},${l.row}`).join(" "),o=n.route.some(l=>l.col===4&&l.row===4);return it(r&&o&&s!==a,`detour=${r} shortcut=${o} before=${s} after=${a}`)}});lt.push({name:"Hobbin digging",fn:()=>{const i=el({col:5,row:4});if(!i)return it(!1,"production enemy manager unavailable");const{grid:e,manager:t}=i;for(let a=1;a<e.rows;a++)e.setSolid(3,a,!0);e.setEmerald(3,4,!0);const n=t.addEnemy("hobbin",{col:2,row:4},3),s=e.isSolid(3,4);let r=!1;for(let a=0;a<120&&(t.step(.016666666666666666,{col:6,row:4}).some(l=>l.col===3&&l.row===4)&&(r=!0),!(!e.isSolid(3,4)&&n.col>3));a++);return it(s&&r&&!e.isSolid(3,4)&&e.isExcavated(3,4)&&n.col>3,`solidBefore=${s} digEvent=${r} excavated=${e.isExcavated(3,4)} enemyCol=${n.col}`)}});lt.push({name:"Enemy quota",fn:()=>{const i=Zt.difficultyFor(1),e=Zt.createRng(13723362),t=Zt.spawning.createSpawner({isSolid:()=>!1},i,e);for(let s=0;s<4e3;s++){for(const r of t.entities())t.removeEnemy(r.id);t.step(1/60)}const n=t.snapshot();return it(n.spawnedEnemies===n.enemyQuota&&n.aliveEnemies<=n.maxActiveEnemies&&n.remainingQuota===0,`spawned=${n.spawnedEnemies} quota=${n.enemyQuota} active=${n.aliveEnemies}`)}});lt.push({name:"Cherry condition",fn:()=>{const i=Zt.difficultyFor(1),e=Zt.createRng(13723362),t=Zt.spawning.createSpawner({isSolid:()=>!1},i,e),n=t.cherry();t.clearActiveForTest();const s=t.cherry();t.setSpawnedCountForTest(i.enemyQuota-1);const r=t.cherry();t.setSpawnedCountForTest(i.enemyQuota);const a=t.cherry(),o=Zt.constants.ENEMY_ENTRY;return it(!n.available&&!s.available&&!r.available&&a.available&&a.col===o.col&&a.row===o.row&&!a.collected&&t.collectCherry()&&t.cherry().collected,`before=${n.available} empty=${s.available} nearly=${r.available} reached=${a.available}`)}});lt.push({name:"Bonus activation",fn:i=>{Wt(i);const e=ae(i,"spawnerSnapshot").enemyQuota;ae(i,"setupSpawnerFixture",e);const t=ae(i,"cherrySnapshot");ae(i,"setupCherryCollectionFixture"),ae(i,"collectCherryByPlayer");const n=ae(i,"bonusSnapshot");ae(i,"setupFrightFixture"),ae(i,"frightenEnemies");const s=ae(i,"bonusSnapshot"),r=ae(i,"scoreSnapshot").lives,a=ae(i,"testEnemyContact"),o=ae(i,"scoreSnapshot").lives;return it(t.available&&n.active&&n.remaining>0&&s.enemiesFleeing===!0&&a.ok===!1&&o===r,`cherry=${t.available} bonus=${s.active} remaining=${s.remaining} fleeing=${s.enemiesFleeing} contact=${a.ok} lives=${r}->${o}`)}});lt.push({name:"Bonus enemy scoring",fn:i=>{Wt(i),ae(i,"setupBonusKillFixture");const e=[];for(let s=0;s<4;s++){const r=ae(i,"killFrightenedEnemy");e.push(r?r.points:-1)}const t=ae(i,"scoreSnapshot").score,n=[200,400,800,1600];return it(JSON.stringify(e)===JSON.stringify(n)&&t===3e3,`points=${e.join("/")} score=${t}`)}});lt.push({name:"Bonus expiry",fn:i=>{Wt(i),ae(i,"setupBonusKillFixture");const e=ae(i,"bonusSnapshot").duration;ae(i,"tickBonus",e+.1);const t=ae(i,"bonusSnapshot");ae(i,"setupEnemyContactFixture");const n=ae(i,"scoreSnapshot").lives,s=ae(i,"testEnemyContact"),r=ae(i,"scoreSnapshot").lives;return it(!t.active&&t.remaining===0&&t.enemiesFleeing===!1&&s.ok===!0&&r===n-1,`active=${t.active} remaining=${t.remaining} contact=${s.ok} lives=${n}->${r}`)}});lt.push({name:"Completion via emeralds",fn:i=>{Wt(i);const e=ae(i,"spawnerSnapshot"),t=ae(i,"emeraldPositions").length,n=ae(i,"forceLevelComplete","emeralds"),s=ae(i,"lifecycleSnapshot");return it(t>0&&e.spawnedEnemies<e.enemyQuota&&n.ok&&n.reason==="emeralds"&&s.phase==="level-complete"&&s.completeReason==="emeralds"&&s.remainingEmeralds===0,`gems=${t} spawned=${e.spawnedEnemies}/${e.enemyQuota} phase=${s.phase} reason=${s.completeReason}`)}});lt.push({name:"Completion via enemies",fn:i=>{Wt(i);const e=ae(i,"emeraldPositions").length,t=ae(i,"forceLevelComplete","quota"),n=ae(i,"lifecycleSnapshot"),s=ae(i,"spawnerSnapshot");return it(e>0&&n.remainingEmeralds>0&&t.ok&&t.reason==="quota"&&n.phase==="level-complete"&&n.completeReason==="quota"&&s.spawnedEnemies===s.enemyQuota&&s.aliveEnemies===0,`gems=${n.remainingEmeralds} phase=${n.phase} reason=${n.completeReason} alive=${s.aliveEnemies}`)}});lt.push({name:"Extra life",fn:()=>{const i=Hr(Zt.difficultyFor(1));zi(i,Zt.difficultyFor(1),8);const e=i.lives,t=Zt.scoring.addScoreWithBonus(i,19999,0),n=Zt.scoring.addScoreWithBonus(i,1,0),s=Zt.scoring.addScoreWithBonus(i,1e3,0),r=Zt.scoring.addScoreWithBonus(i,19e3,0);return it(t.extraLife===!1&&n.extraLife===!0&&s.extraLife===!1&&r.extraLife===!0&&i.lives===e+2&&i.score===4e4,`lives=${e}->${i.lives} score=${i.score} events=${t.extraLife}/${n.extraLife}/${s.extraLife}/${r.extraLife}`)}});lt.push({name:"Pause",fn:async i=>{Wt(i);const e=ae(i,"spawnerSnapshot").enemyQuota;ae(i,"setupSpawnerFixture",e),ae(i,"setupCherryCollectionFixture"),ae(i,"collectCherryByPlayer"),ae(i,"setupProjectileFixture",{col:2,row:2},"right"),ae(i,"fireProjectile"),ae(i,"setupBagFixture",{col:4,row:2},!1),ae(i,"startForSelfTest");try{const t=()=>({tick:Number(ae(i,"lifecycleSnapshot").tick),weapon:Number(ae(i,"weaponHud").remaining),bonus:Number(ae(i,"bonusSnapshot").remaining),bag:String(ae(i,"bagSnapshots")[0]?.state)}),n=ae(i,"bonusSnapshot").active===!0,s=t().weapon>0,r=m=>new Promise(f=>setTimeout(f,m));ae(i,"setSimulationPaused",!0);const a=t(),o=Number(ae(i,"frameStepCount"));await r(140);const l=t(),c=Number(ae(i,"frameStepCount"))===o,d=l.tick===a.tick&&l.weapon===a.weapon&&l.bonus===a.bonus&&l.bag===a.bag;ae(i,"setSimulationPaused",!1);for(let m=0;m<60;m++)ae(i,"stepLiveFrame",1/60);const h=t(),u=h.tick>l.tick&&h.weapon<l.weapon&&h.bonus<l.bonus&&h.bag!==l.bag;return ae(i,"setSimulationPaused",!0),it(n&&s&&c&&d&&u,`liveBonus=${n} charging=${s} pausedFrames=${c} frozen=${d} resumed=${u}`)}finally{ae(i,"setSimulationPaused",!1),ae(i,"stopForSelfTest")}}});lt.push({name:"Determinism",fn:i=>{const e=()=>(Wt(i),ae(i,"setDirection","right"),So(i,.5),ae(i,"setDirection","down"),So(i,.5),{player:ae(i,"playerSnapshot"),grid:ae(i,"gridSnapshot"),score:ae(i,"scoreSnapshot"),enemies:ae(i,"enemySnapshot"),spawner:ae(i,"spawnerSnapshot")}),t=e(),n=e();return it(JSON.stringify(t)===JSON.stringify(n),`match=${JSON.stringify(t)===JSON.stringify(n)}`)}});lt.push({name:"Visual independence",fn:i=>{Wt(i);const e={player:ae(i,"playerSnapshot"),grid:ae(i,"gridSnapshot"),enemies:ae(i,"enemySnapshot")},t=i.visualOffset(2,-3,4),n={player:ae(i,"playerSnapshot"),grid:ae(i,"gridSnapshot"),enemies:ae(i,"enemySnapshot")};i.visualOffset(0,0,0);const s=JSON.stringify(e)===JSON.stringify(n);return it(t.meshMoved===!0&&s&&ei(e.player,n.player),`meshMoved=${t.meshMoved} logicalStable=${s}`)}});function __(i){const e=lt.slice();let t=[],n=[],s="";const r=o=>{const l=o.filter(h=>h.status==="FAIL"),d=[`SELF TEST — SEED 0x${an.toString(16).toUpperCase()} — ${o.length} TESTS`,...o.map(h=>`${String(h.id).padStart(2,"0")}. ${h.name}: ${h.status}${h.detail?` — ${h.detail}`:""}`)];return d.push(l.length?`${l.length} FAILED`:`${o.length}/${o.length} PASS`),d.join(`
`)};return{register:(o,l)=>(e.push({name:o,fn:l}),e.length),run:async()=>{const o=ae(i,"isSimulationPaused"),l=console.log,c=[];console.log=(...d)=>{c.push(d.map(String).join(" "))};try{t=[];for(let d=0;d<e.length;d++){const h=e[d];let u;try{const m=await h.fn(i);u={id:d+1,name:h.name,status:m.ok?"PASS":"FAIL",detail:m.detail}}catch(m){u={id:d+1,name:h.name,status:"FAIL",detail:m instanceof Error?m.message:String(m)}}t.push(u),console.log(`${String(u.id).padStart(2,"0")}. ${u.name}: ${u.status}${u.detail?` — ${u.detail}`:""}`)}return s=r(t),i.report(s.split(`
`)),console.log(s.split(`
`).slice(-1)[0]),n=c.slice(),t}finally{console.log=l,ae(i,"setSimulationPaused",o)}},results:()=>t.slice(),output:()=>s,consoleLines:()=>n.slice(),format:r}}function vc(){if(window.__diggerBooted)return;window.__diggerBooted=!0;const i=document.getElementById("stage"),e=document.getElementById("overlay");if(!i)throw new Error("missing #stage mount");const t=document.getElementById("seed");t&&(t.textContent=`0x${an.toString(16).toUpperCase()}`);const{renderer:n}=l0(i),{scene:s,lightingSnapshot:r}=c0(),a=u0(),o=S0(n,s,a.camera),l=f_(),c=g_(s),d=d_(e),h=m_();s.add(h.group);const u=()=>u_(),m=B=>{try{localStorage.setItem("digger3d.highScore",String(B))}catch{}},{game:f,animate:x}=h_(s,a,{showOverlay:(B,ee)=>d.show(B,ee),persistHighScore:m,setPostFxEnabled:B=>o.setEnabled(B)});f.group.visible=!1,h.setActive(!0),f.state.highScore=u(),a.resize(Math.max(1,i.clientWidth)/Math.max(1,i.clientHeight));const v=()=>{a.resize(Math.max(1,i.clientWidth)/Math.max(1,i.clientHeight)),o.resize(Math.max(1,i.clientWidth),Math.max(1,i.clientHeight))};v(),window.addEventListener("resize",v);const _={crt:!0,fx:!0,sound:!0};let M;const A=B=>{B==="crt"&&document.body.classList.toggle("crt",_.crt),B==="fx"&&o.setEnabled(_.fx),B==="sound"&&f.setMutedForTestHook(!_.sound),M(B)};M=B=>{const ee=document.querySelector(`[data-toggle="${B}"]`);ee&&(ee.textContent=B==="fx"?_.fx?"HIGH":"LOW":_[B]?"ON":"OFF")},document.querySelectorAll("[data-toggle]").forEach(B=>{const ee=B.dataset.toggle;ee in _&&B.addEventListener("click",()=>{_[ee]=!_[ee],A(ee)})});for(const B of Object.keys(_))A(B);const y={value:!1};let w=!1;const E=.1,p=1/60,S={frames:0,maxRawDelta:0,maxClampedDelta:0},I=()=>({...S}),T=()=>{S.frames=0,S.maxRawDelta=0,S.maxClampedDelta=0},D=B=>{w=B,f.setAudioPaused(B),B?d.show("pause"):f.state.phase==="playing"&&d.show("hidden")},U=()=>{f.unlockAudio(),y.value?f.state.phase==="game-over"&&f.restart():(y.value=!0,f.start()),d.show("hidden"),h.setActive(!1),f.group.visible=!0};let R=null;const L=f.group.children[1],P=L?L.position.clone():null,C=(B,ee,Me)=>{L&&P&&L.position.set(P.x+B,P.y+ee,P.z+Me);const ce=f.playerSnapshot();return{meshMoved:!!L&&L.position.distanceTo(P)>.001,mesh:L?{x:L.position.x,y:L.position.y,z:L.position.z}:null,logical:{col:ce.col,row:ce.row,frac:ce.frac},grid:f.gridSnapshot()}},Y=__({get sim(){return typeof window>"u"?void 0:window.__diggerSim},game:{restart:()=>f.restart(),step:B=>f.step(B),setDirection:B=>f.setDirection(B),setSimulationPaused:B=>f.setSimulationPaused(B),isSimulationPaused:()=>f.isSimulationPaused(),playerSnapshot:()=>f.playerSnapshot(),gridSnapshot:()=>f.gridSnapshot(),setSolidForTest:(B,ee,Me)=>f.grid.setSolid(B,ee,Me),emeraldPositions:()=>f.emeraldPositions(),remainingEmeralds:()=>f.remainingEmeralds(),collectEmeraldAt:(B,ee)=>f.collectEmeraldAt(B,ee),isEmeraldAt:(B,ee)=>f.isEmeraldAt(B,ee),resetChain:()=>f.resetChain(),scoreSnapshot:()=>f.scoreSnapshot(),bagSnapshots:()=>f.bagSnapshots(),setupBagFixture:(B,ee,Me,ce,Ce)=>f.setupBagFixture(B,ee,Me,ce,Ce),setupProjectileFixture:(B,ee,Me)=>f.setupProjectileFixture(B,ee,Me),fireProjectile:()=>f.fireProjectile(),projectileSnapshots:()=>f.projectileSnapshots(),lastProjectileImpact:()=>f.lastProjectileImpact(),weaponHud:()=>f.weaponHud(),enemySnapshot:()=>f.enemySnapshot(),setupEnemyFixture:(B,ee)=>f.setupEnemyFixture(B,ee),spawnerSnapshot:()=>f.spawnerSnapshot(),setupSpawnerFixture:B=>f.setupSpawnerFixture(B),stepSpawnerFor:B=>f.stepSpawnerFor(B),cherrySnapshot:()=>f.cherrySnapshot(),setupCherryCollectionFixture:()=>f.setupCherryCollectionFixture(),collectCherryByPlayer:()=>f.collectCherryByPlayer(),bonusSnapshot:()=>f.bonusSnapshot(),setupBonusKillFixture:()=>f.setupBonusKillFixture(),killFrightenedEnemy:()=>f.killFrightenedEnemy(),tickBonus:B=>f.tickBonus(B),setupEnemyContactFixture:()=>f.setupEnemyContactFixture(),testEnemyContact:()=>f.testEnemyContact(),setupFrightFixture:()=>f.setupFrightFixture(),frightenEnemies:()=>f.frightenEnemies(),setupHobbinDigFixture:(B,ee)=>f.setupHobbinDigFixture(B,ee),isSolidAt:(B,ee)=>f.isSolidAt(B,ee),lifecycleSnapshot:()=>f.lifecycleSnapshot(),forceLevelComplete:B=>f.forceLevelComplete(B),stepLiveFrame:B=>Re(B),frameStepCount:()=>_e,startForSelfTest:()=>{y.value=!0,d.show("hidden"),h.setActive(!1),f.group.visible=!0},stopForSelfTest:()=>{y.value=!1,h.setActive(!0),f.group.visible=!1,d.restoreTitle()}},visualOffset:C,report:B=>d.showSelfTests(B)});new URLSearchParams(location.search).has("test")&&(Object.defineProperty(window,"__diggerConstants",{value:Object.freeze({CELL_SIZE:se,GRID_COLS:Ie,GRID_ROWS:Xe,SCORE:un,SEED:an}),configurable:!1}),$0(),Object.defineProperty(window,"__diggerGame",{value:Object.freeze({start:()=>U(),restart:()=>{f.restart(),U()},isStarted:()=>y.value,overlayHidden:()=>!e||e.hidden,step:B=>{y.value&&f.step(B)},setDirection:B=>f.setDirection(B),playerSnapshot:()=>f.playerSnapshot(),gridSnapshot:()=>f.gridSnapshot(),excavatedCount:()=>f.excavatedCount(),earthVisible:B=>f.earthVisible(B),renderStats:()=>f.renderStats(),visualSnapshot:()=>f.visualSnapshot(),scoreSnapshot:()=>f.scoreSnapshot(),emeraldPositions:()=>f.emeraldPositions(),remainingEmeralds:()=>f.remainingEmeralds(),collectEmeraldAt:(B,ee)=>f.collectEmeraldAt(B,ee),resetChain:B=>f.resetChain(),bagPositions:()=>f.bagPositions(),bagSnapshots:()=>f.bagSnapshots(),tryPushBag:(B,ee,Me)=>f.tryPushBag(B,ee,Me),testBagCrush:B=>f.testBagCrush(B),testPlayerCrush:()=>f.testPlayerCrush(),testBagBreak:()=>f.testBagBreak(),testBagCollectGold:()=>f.testBagCollectGold(),setupBagFixture:(B,ee,Me,ce,Ce)=>f.setupBagFixture(B,ee,Me,ce,Ce),setEnemyOccupants:B=>f.setEnemyOccupants(B),setupTacticalBagFixture:()=>f.setupTacticalBagFixture(),playSound:B=>f.playSound(B),unlockAudio:()=>f.unlockAudio(),audioPlayed:()=>f.audioPlayed(),clearAudioLog:()=>f.clearAudioLog(),audioSnapshot:()=>f.audioSnapshot(),setMusicMode:B=>f.setMusicMode(B),setEnemyCountForAudio:B=>f.setEnemyCountForAudio(B),setAudioPaused:B=>f.setAudioPaused(B),isAudioPaused:()=>w,tickAudio:B=>f.tickAudio(B),toggleMute:()=>f.toggleMute(),setMuted:B=>f.setMutedForTestHook(B),togglePause:()=>D(!w),hitStop:()=>f.hitStop(),hitStopTick:B=>f.hitStopTick(B),cameraTick:B=>f.cameraTick(B),cameraZoom:()=>f.cameraZoom(),cameraSnapshot:()=>a.snapshot(),lightingSnapshot:()=>r(),postFxSnapshot:()=>o.snapshot(),cameraEffect:(B,ee)=>{B==="shake"?a.shake(ee):a.pulse(ee)},projectileSnapshots:()=>f.projectileSnapshots(),weaponHud:()=>f.weaponHud(),fireProjectile:()=>f.fireProjectile(),lastProjectileImpact:()=>f.lastProjectileImpact(),enemySnapshot:()=>f.enemySnapshot(),spawnerSnapshot:()=>f.spawnerSnapshot(),setupEnemyFixture:(B,ee)=>f.setupEnemyFixture(B,ee),setupEnemyContactFixture:()=>f.setupEnemyContactFixture(),forceHobbinTransformation:()=>f.forceHobbinTransformation(),hobbinTransformFx:()=>f.hobbinTransformFx(),hobbinViewStyle:()=>f.hobbinViewStyle(),enemyVisualSnapshot:()=>f.enemyVisualSnapshot(),cameraCloseup:(B,ee)=>{R=B===void 0||ee===void 0?null:{col:B,row:ee}},cherrySnapshot:()=>f.cherrySnapshot(),bonusSnapshot:()=>f.bonusSnapshot(),setupSpawnerFixture:B=>f.setupSpawnerFixture(B),stepSpawnerFor:B=>f.stepSpawnerFor(B),setupCherryCollectionFixture:()=>f.setupCherryCollectionFixture(),collectCherryByPlayer:()=>f.collectCherryByPlayer(),setupFrightFixture:()=>f.setupFrightFixture(),frightenEnemies:()=>f.frightenEnemies(),tickBonus:B=>f.tickBonus(B),setupBonusKillFixture:()=>f.setupBonusKillFixture(),killFrightenedEnemy:()=>f.killFrightenedEnemy(),setupHobbinDigFixture:(B,ee)=>f.setupHobbinDigFixture(B,ee),isSolidAt:(B,ee)=>f.isSolidAt(B,ee),isEmeraldAt:(B,ee)=>f.isEmeraldAt(B,ee),setupProjectileFixture:(B,ee,Me,ce)=>f.setupProjectileFixture(B,ee,Me,ce),setLevelForTest:B=>f.setLevelForTest(B),setQualityForTest:B=>f.setQualityForTest(B),deathSnapshot:()=>f.deathSnapshot(),lifecycleSnapshot:()=>f.lifecycleSnapshot(),testEnemyContact:()=>f.testEnemyContact(),forceLevelComplete:B=>f.forceLevelComplete(B),setHighScoreForTest:B=>f.setHighScoreForTest(B),debugSnapshot:()=>c.snapshot(),debugToggleCount:()=>c.snapshot().toggleCount,sceneChildCount:()=>s.children.length,overlayKind:()=>d.current(),titleSnapshot:()=>({kind:d.current(),text:document.getElementById("overlay")?.innerText||"",toggles:{..._,labels:d.toggleStates()},crt:document.body.classList.contains("crt")}),attractSnapshot:()=>h.snapshot(),setSimulationPaused:B=>f.setSimulationPaused(B),isSimulationPaused:()=>f.isSimulationPaused(),inputListenerCount:()=>f.input.listenerCount,runSelfTests:async()=>(await Y.run()).map(B=>({...B})),selfTestResults:()=>Y.results().map(B=>({...B})),selfTestOutput:()=>Y.output(),selfTestConsole:()=>Y.consoleLines(),frameDeltaSnapshot:I,resetFrameDeltaForTest:T,setDiggerVisualOffsetForTest:C}),configurable:!1})),e&&e.addEventListener("click",B=>{B.target.tagName!=="BUTTON"&&U()}),window.addEventListener("keydown",B=>{B.key==="Enter"&&U(),(B.code==="Backquote"||B.key==="`")&&!B.repeat&&c.toggle(),(B.code==="KeyT"||B.key.toLowerCase()==="t")&&!B.repeat&&Y.run()});const q=performance.now();let te=q,oe=16.7,_e=0;const Re=B=>{if(!w&&!f.isSimulationPaused()){_e++,f.step(B);const ee=f.enemySnapshot().enemies;f.setEnemyCountForAudio(Array.isArray(ee)?ee.length:0),f.tickAudio(1/60)}},ie=()=>{const B=performance.now(),ee=Math.max(0,B-te)/1e3,Me=Math.min(ee,E);S.frames++,S.maxRawDelta=Math.max(S.maxRawDelta,ee),S.maxClampedDelta=Math.max(S.maxClampedDelta,Me);const ce=(B-q)/1e3;oe=oe*.85+Math.min(ee*1e3,E*1e3)*.15,te=B,f.input.takeToggle("KeyM")&&f.toggleMute(),f.input.takeToggle("KeyP")&&D(!w),y.value&&Re(Math.min(Me,p)),y.value&&x(ce,w),y.value||h.tick(1/60),l.update({score:f.state.score,highScore:Math.max(f.state.highScore,u()),level:f.state.level,lives:f.state.lives,bonus:f.state.bonusActive,bonusTime:f.bonusSnapshot().remaining,weapon:f.weaponHud()});const Ce=f.weaponHud(),st=f.playerSnapshot(),Ae=f.enemySnapshot(),Je=f.spawnerSnapshot(),et=f.bonusSnapshot(),Be=f.renderStats(),_t=Array.isArray(Ae.enemies)?Ae.enemies:[],ut=f.gridSnapshot();if(c.update({fps:oe>0?1e3/oe:0,frameMs:oe,drawCalls:n.info.render.calls,particles:Number(Be.activeParticles)||0,level:f.state.level,playerCol:Number(st.col)||0,playerRow:Number(st.row)||0,playerDirection:String(st.direction),playerState:st.alive?st.digging?"digging":st.moving?"moving":"idle":"dead",remainingEmeralds:f.remainingEmeralds(),enemiesAlive:_t.filter(qe=>qe.alive!==!1).length,spawned:Number(Je.spawnedEnemies)||0,quota:Number(Je.enemyQuota)||0,nobbins:_t.filter(qe=>qe.kind==="nobbin"&&qe.alive!==!1).length,hobbins:_t.filter(qe=>qe.kind==="hobbin"&&qe.alive!==!1).length,weaponCooldown:Ce.remaining,bonusTime:Number(et.remaining)||0,bags:f.bagPositions(),gameState:String(f.lifecycleSnapshot().phase),cells:typeof ut=="string"?ut:"",tunnel:Array.from({length:Ie*Xe},(qe,Qe)=>(typeof ut=="string"?ut[Qe]:"#")!=="#"),paths:_t.filter(qe=>qe.alive!==!1).map(qe=>Array.isArray(qe.route)?qe.route.map(Qe=>({col:Qe.col,row:Qe.row})):[])},n),R){const qe=(R.col-(Ie-1)/2)*se,Qe=(R.row-(Xe-1)/2)*se;a.camera.position.set(qe+2.2,3.6,Qe+3.4),a.camera.lookAt(qe,.3,Qe)}else a.update(w?0:1/60);o.render()};n.setAnimationLoop(ie)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vc,{once:!0}):vc();
