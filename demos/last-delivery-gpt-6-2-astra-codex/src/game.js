import {models} from './models/index.js';
export const duration=200, targets=[36,58,78];
export function rng(seed){return ()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
export const stops=[
 ['Forno Rosso',0,0,'pizzeria',1],['Lido Club',112,0,'lido',1],['Bar Alba',-112,0,'bar',1],['Casa Rosa',0,-100,'villa',1],['Port Office',224,0,'depot',2],['Marina Bar',336,0,'bar',2],['Net Loft',224,-100,'lido',2],['Flora Market',-224,0,'florist',3],['Villa Sole',-336,-100,'villa',3],['Garden House',-224,-100,'villa',3]
].map(([name,x,y,type,district])=>({name,x,y,type,district}));
export function makeTown(seed){
 const random=rng(seed),objects=[],add=(type,x,y,a=0)=>objects.push({type,x,y,a});
 stops.forEach(d=>add(d.type,d.x,d.y-28));
 for(let x=-336;x<=336;x+=112){
 if(!stops.some(d=>d.x===x&&d.y===-100))add(x<0?'villa':'depot',x,-128);
 add('lamp',x+34,13);add('palm',x-34,25+random()*6);add('planter',x-30,-16);
 if(x>=224){add('boat',x-13,84,0.1);add('crate',x+12,51);add('crate',x+23,52);}
 else {add(x<0?'planter':'palm',x+20,60);add('planter',x-14,56);}
 }
 return objects;
}
export const phase=g=>g.time<85?'afternoon':g.time<150?'dusk':'night';
export const clockTime=g=>{const min=17*60+40+Math.floor(g.time*1.25);return Math.floor(min/60)+':'+String(min%60).padStart(2,'0');};
export const timeTip=(order)=>Math.max(4,Math.ceil(24-order.age*.18));
export const qualityTip=o=>Math.round(timeTip(o)*o.quality/100);
const lane=[[-168,9],[168,9],[168,-93],[-168,-93]];
const lengths=[336,102,336,102],perimeter=876;
function pose(t){let p=(t%perimeter+perimeter)%perimeter,i=0;while(i<3&&p>=lengths[i])p-=lengths[i++];let a=lane[i],b=lane[(i+1)%4],r=p/lengths[i];return {x:a[0]+(b[0]-a[0])*r,y:a[1]+(b[1]-a[1])*r,a:Math.atan2(b[1]-a[1],b[0]-a[0])};}
export class Game{
 constructor(seed=431){this.seed=seed;this.reset();}
 reset(){this.shift=1;this.muted=false;this.town=makeTown(this.seed);this.start();this.mode='title';}
 start(){this.random=rng(this.seed+this.shift);this.mode='play';this.p={x:0,y:0,a:0,v:0,heading:0};this.camera=0;this.time=0;this.tips=0;this.count=0;this.meter=0;this.cool=0;this.jobs=[];this.ready=[];this.nextOrder=8;this.serial=0;this.events=[];this.tracks=[];this.dust=[];this.receipt=null;this.notice='';this.flash=0;this.cars=Array.from({length:5},(_,i)=>{let t=i*156+this.random()*35;return {t,speed:18+this.random()*12,type:i%2?'panelvan':'hatch',...pose(t)};});this.spawn();this.pickup();}
 spawn(){const pool=stops.filter((d,i)=>i&&d.district<=this.shift);
 const options=pool.filter(d=>![...this.jobs,...this.ready].some(o=>o.dest===d));
 if(!options.length||this.ready.length>=3)return;
 let dest=this.serial===0?(this.shift===1?stops[1]:pool.find(d=>d.district===this.shift)):options[Math.floor(this.random()*options.length)];
 this.ready.push({id:++this.serial,dest,age:0,quality:100});}
 pickup(){while(this.ready.length&&this.jobs.length<3)this.jobs.push(this.ready.shift());}
 hit(){this.p.v=0;if(this.cool<=0){this.jobs.forEach(o=>o.quality=Math.max(0,o.quality-16));this.cool=1;this.signal('BUMP  /  Check your cargo');}}
 signal(msg){this.notice=msg;this.flash=2.4;this.events.push(msg);if(this.events.length>8)this.events.shift();}
 deliver(o){let bonus=this.meter>=1?8:0,tip=qualityTip(o)+bonus;this.tips+=tip;this.count++;this.receipt={name:o.dest.name,tip,bonus};this.jobs.splice(this.jobs.indexOf(o),1);if(bonus)this.meter=0;this.signal('DELIVERED   +€'+tip+(bonus?'   /   Drift bonus':''));}
 finish(){this.mode=this.tips<targets[this.shift-1]?'defeat':this.shift===3?'victory':'summary';}
 enter(){if(this.mode==='title'||this.mode==='defeat')this.start();else if(this.mode==='summary'){this.shift++;this.start();}else if(this.mode==='victory')this.reset();else this.mode=this.mode==='pause'?'play':'pause';}
 update(dt,k){
 if(this.mode!=='play')return;this.time+=dt;if(this.time>=duration){this.time=duration;this.finish();return;}
 this.camera+=((k.has('KeyE')?1:0)-(k.has('KeyQ')?1:0))*dt*1.55;
 this.cool-=dt;this.flash-=dt;this.jobs.forEach(o=>o.age+=dt);if(this.time>=this.nextOrder){this.spawn();this.nextOrder+=14;}
 const p=this.p,steer=Number(k.has('KeyD')||k.has('ArrowRight'))-Number(k.has('KeyA')||k.has('ArrowLeft')),brake=k.has('Space'),gas=k.has('KeyW')||k.has('ArrowUp'),back=k.has('KeyS')||k.has('ArrowDown');
 const drift=brake&&steer&&p.v>27;
 p.v+=((gas?62:0)-(back?58:0))*dt;
 const drag=(drift?32:brake?125:gas||back?5:40)*dt;
 p.v=Math.sign(p.v)*Math.max(0,Math.abs(p.v)-drag);p.v=Math.max(-31,Math.min(80,p.v));
 p.a+=steer*dt*(drift?3.3:2.6)*Math.min(1,Math.abs(p.v)/10)*Math.sign(p.v);
 const diff=p.a-p.heading;p.heading+=Math.atan2(Math.sin(diff),Math.cos(diff))*Math.min(1,dt*(drift?2.4:13));
 if(drift){this.meter=Math.min(1,this.meter+dt*.33);this.tracks.push([p.x,p.y]);if(this.tracks.length>550)this.tracks.shift();}
 if(Math.abs(p.v)>15&&Math.floor(this.time*16)!==Math.floor((this.time-dt)*16))this.dust.push({x:p.x-7*Math.cos(p.heading),y:p.y-7*Math.sin(p.heading),t:.4});
 this.dust=this.dust.filter(d=>(d.t-=dt)>0);
 const nx=Math.min(389,Math.max(-389,p.x+Math.cos(p.heading)*p.v*dt)),ny=Math.max(-162,Math.min(p.x>=180?60:67,p.y+Math.sin(p.heading)*p.v*dt));
 const solid=this.town.some(o=>{if(!['pizzeria','lido','bar','depot','florist','villa','crate','planter','palm','lamp'].includes(o.type))return false;let m=models[o.type],thin=o.type==='palm'||o.type==='lamp';return Math.abs(nx-o.x)<(thin?3:m.w/2+1)&&Math.abs(ny-o.y)<(thin?3:m.h/2+1);});
 if(solid)this.hit();else{p.x=nx;p.y=ny;}
 for(let i=0;i<this.cars.length;i++){let c=this.cars[i],gap=(this.cars[(i+1)%this.cars.length].t-c.t+perimeter)%perimeter;if(gap>32)c.t=(c.t+dt*c.speed)%perimeter;Object.assign(c,pose(c.t));if(Math.abs((p.x-c.x)*Math.cos(c.a)+(p.y-c.y)*Math.sin(c.a))<17&&Math.abs((p.y-c.y)*Math.cos(c.a)-(p.x-c.x)*Math.sin(c.a))<8&&this.cool<=0)this.hit();}
 if((p.x>180&&p.y>34||p.x< -180&&(p.y>14&&p.y<35||p.x> -258&&p.x< -244&&p.y<0&&p.y> -100))&&Math.abs(p.v)>8)this.jobs.forEach(o=>o.quality=Math.max(0,o.quality-dt*2.8));
 if(Math.abs(p.v)<9){for(const o of [...this.jobs])if(Math.hypot(p.x-o.dest.x,p.y-o.dest.y)<17)this.deliver(o);if(Math.hypot(p.x,p.y)<17)this.pickup();}
 }
}
