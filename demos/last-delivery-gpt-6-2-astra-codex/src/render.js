import {models,colours} from './models/index.js';
import {phase} from './game.js';
const shifts={afternoon:[1,1,1],dusk:[.91,.75,.81],night:[.55,.60,.78]};
export function palette(stage){return ['#000000',...colours.map((hex,i)=>{let a=shifts[stage];if([7,12].includes(i)&&stage!=='afternoon')a=[1,1,1];return '#'+a.map((v,j)=>Math.round(parseInt(hex.slice(j*2+1,j*2+3),16)*v).toString(16).padStart(2,'0')).join('');})];}
export const squash=.74,spacing=1;
export function stack(m,angle,s=squash,space=spacing){
 const c=Math.cos(angle),u=Math.sin(angle),w=Math.ceil(Math.abs(m.w*c)+Math.abs(m.h*u)-1e-8),h=Math.ceil(Math.abs(m.w*u)+Math.abs(m.h*c)-1e-8),sh=Math.max(1,Math.round(h*s)),H=sh+Math.round((m.n-1)*space);
 const data=new Uint8Array(w*H),lookup=new Int32Array(w*sh);
 for(let j=0;j<sh;j++)for(let i=0;i<w;i++){let x=i+.5-w/2,y=Math.floor((j+.5)*h/sh)+.5-h/2,ix=Math.floor(x*c+y*u+m.w/2),iy=Math.floor(-x*u+y*c+m.h/2);lookup[j*w+i]=ix>=0&&ix<m.w&&iy>=0&&iy<m.h?iy*m.stride+ix:-1;}
 for(let z=0;z<m.n;z++){const base=(H-sh-Math.round(z*space))*w;for(let i=0;i<lookup.length;i++)if(lookup[i]>=0){let k=m.data[lookup[i]+z*m.w];if(k)data[base+i]=k;}}
 return {w,h:H,foot:sh,data};
}
export function projection(x,y,camera){return [Math.round(x*Math.cos(camera)+y*Math.sin(camera)),Math.round((-x*Math.sin(camera)+y*Math.cos(camera))*squash)];}
export function sorted(objects,angle){return objects.slice().sort((a,b)=>projection(a.x,a.y,angle)[1]-projection(b.x,b.y,angle)[1]);}
const GW=832,GH=320,gx=416,gy=208;
function terrain(x,y){
 const t=(x+448)%112,v=(y+200)%100,hash=Math.abs(Math.imul(x,1021)^Math.imul(y,3571)), water=y>68||x>389||x< -389;
 if(water){if(y>67&&y<72&&Math.abs(x)<389)return y%3===0?7:20;return ((x+Math.floor(y/7)*17)%56<14&&y%9===0)?20:((x+y*5)%88<34&&y%7<2)?19:18;}
 if(x>180&&y>33)return (x%6===0||y%21===0)?14:(hash%27===0?14:15);
 if(x< -180&&(y>14&&y<35||x> -258&&x< -244&&y<0&&y> -100))return y%5===0?6:4;
 if(v<13||v>87||Math.abs(t-56)<13){
 if((v===0&&t%24<12&&Math.abs(t-56)>23)||(t===56&&v%24<11&&Math.min(v,100-v)>23))return 5;
 if((Math.abs(t-56)===17||Math.abs(t-56)===18||Math.abs(t-56)===21)&&Math.min(v,100-v)<10&&v%5<3)return 6;
 return hash%323===0?4:3;}
 if(v===13||v===87||Math.abs(t-56)===13)return 7;
 if(y>47&&x<180)return y%10===0?5:hash%93===0?6:5;
 if(x< -185&&v>35&&v<74)return hash%17===0?22:23;
 return y%9===0||(x+(Math.floor(y/9)%2)*8)%17===0?5:6;
}
const ground=Uint8Array.from({length:GW*GH},(_,i)=>terrain(i%GW-gx,Math.floor(i/GW)-gy));
export class View{
 constructor(canvas){this.cv=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.cache=new Map();}
 draw(g,opts={}){
 const {cv,ctx}=this,W=cv.width,H=cv.height,camera=g.camera,p=g.p,title=g.mode==='title',cx=opts.x??(title?82:p.x),cy=opts.y??(title?4:p.y),a=title?-.22:camera,co=Math.cos(a),si=Math.sin(a),stage=phase(g);
 if(!this.img||this.img.width!==W||this.img.height!==H){this.img=ctx.createImageData(W,H);this.out=new Uint32Array(this.img.data.buffer);this.pix=new Uint8Array(W*H);}
 if(this.stage!==stage){this.stage=stage;this.pal=palette(stage).map(h=>{let k=parseInt(h.slice(1),16);return (0xff000000|((k&255)<<16)|(k&65280)|(k>>16))>>>0;});}
 const pix=this.pix,mx=Math.floor(W/2),my=Math.floor(H*.58);
 for(let j=0,idx=0;j<H;j++){let y=(j-my)/squash,wx=cx-mx*co-y*si+gx,wy=cy-mx*si+y*co+gy;
 for(let i=0;i<W;i++,idx++,wx+=co,wy+=si){let ix=Math.floor(wx),iy=Math.floor(wy);pix[idx]=ix>=0&&ix<GW&&iy>=0&&iy<GH?ground[iy*GW+ix]:(iy>=GH||ix<0||ix>=GW?18:22);}}
 const project=(x,y)=>{let [dx,dy]=projection(x-cx,y-cy,a);return [mx+dx,my+dy];};
 const dot=(x,y,k)=>{if(x>=0&&x<W&&y>=0&&y<H)pix[y*W+x]=k;};
 const oval=(x,y,rx,ry,k,pattern=1)=>{for(let dy=-ry;dy<=ry;dy++){let r=Math.round(rx*Math.sqrt(1-(dy/ry)**2));for(let dx=-r;dx<=r;dx++)if((dx+dy)%pattern===0)dot(x+dx,y+dy,k);}};
 const all=[...g.town,...g.cars,{...p,type:'scooter'}].map(o=>{let [x,y]=project(o.x,o.y);return {o,x,y};}).filter(v=>v.x> -50&&v.x<W+50&&v.y> -24&&v.y<H+75).sort((l,r)=>l.y-r.y);
 for(const {o,x,y} of all){let m=models[o.type];oval(x-5,y+1,Math.max(4,m.w>>1),Math.max(2,m.h>>2),o.type==='boat'?17:4,2);
 if(stage!=='afternoon'){if(o.type==='lamp')oval(x,y,15,7,13,2);if(o.speed){for(let t=5;t<22;t+=2){let [lx,ly]=project(o.x+Math.cos(o.a)*t,o.y+Math.sin(o.a)*t);oval(lx,ly,3+(t>>3),2,13,2);}}}}
 for(const pos of g.tracks){let [x,y]=project(...pos);dot(x,y,2);dot(x+1,y,2);}
 for(const d of g.dust){let [x,y]=project(d.x,d.y);dot(x,y-Math.floor((.4-d.t)*10),6);}
 for(const d of [ {x:0,y:0},...g.jobs.map(o=>o.dest)]){const [x,y]=project(d.x,d.y);for(let i=0;i<44;i++){let v=i*Math.PI/22;dot(x+Math.round(14*Math.cos(v)),y+Math.round(8*Math.sin(v)),d.x===0&&d.y===0?12:13);}}
 for(const {o,x,y} of all){const angle=o.a-a,key=o.type+'|'+angle;let sp=this.cache.get(key);if(!sp){sp=stack(models[o.type],angle);if(this.cache.size>320)this.cache.clear();this.cache.set(key,sp);}
 const left=x-Math.floor(sp.w/2),top=y-Math.floor(sp.foot/2)-(sp.h-sp.foot);
 for(let j=Math.max(0,-top);j<Math.min(sp.h,H-top);j++){let off=(top+j)*W+left;for(let i=Math.max(0,-left);i<Math.min(sp.w,W-left);i++){let col=sp.data[j*sp.w+i];if(col)pix[off+i]=col;}}
 }
 this.arrows=[];if(!title){for(const [idx,o] of (g.jobs.length?g.jobs:[{dest:{x:0,y:0}}]).entries()){let [x,y]=project(o.dest.x,o.dest.y);let dx=x-mx,dy=y-my,scale=Math.min(1,(mx-12)/Math.max(1,Math.abs(dx)),(dy<0?my-15:H-my-12)/Math.max(1,Math.abs(dy)));
 let ex=Math.round(mx+dx*scale),ey=Math.round(my+dy*scale);if(scale<1){let ang=Math.atan2(dy,dx);for(let b=0;b<7;b++)for(let n=-b;n<=b;n++){dot(Math.round(ex-b*Math.cos(ang)-n*.65*Math.sin(ang)),Math.round(ey-b*Math.sin(ang)+n*.65*Math.cos(ang)),13);}}
 else if(Math.hypot(dx,dy)>22){for(let b=0;b<5;b++)for(let n=-b;n<=b;n++)dot(ex+n,ey-7-b,13);}
 this.arrows.push({x:ex,y:ey,idx});}}
 for(let i=0;i<pix.length;i++)this.out[i]=this.pal[pix[i]];ctx.putImageData(this.img,0,0);
 }
}
