import {Game,phase,targets,clockTime,timeTip} from './game.js';
import {paintSky} from './models/sky.js';
import {View} from './render.js';
const $=id=>document.getElementById(id),g=window.__game=new Game(Number(new URLSearchParams(location.search).get('seed')||431)),keys=new Set(),view=new View($('world')),perf=window.frameCosts=[];
let lastMode='',lastHUD=-1,last=0,ctxSound;
function beep(){if(!ctxSound||g.muted)return;const o=ctxSound.createOscillator(),v=ctxSound.createGain();o.type='triangle';o.frequency.value=g.notice.startsWith('BUMP')?120:620;o.connect(v);v.connect(ctxSound.destination);v.gain.setValueAtTime(.045,ctxSound.currentTime);v.gain.exponentialRampToValueAtTime(.001,ctxSound.currentTime+.16);o.start();o.stop(ctxSound.currentTime+.16);}
function enter(){if(!ctxSound&&window.AudioContext)ctxSound=new AudioContext();g.enter();}
$('go').onclick=$('continue').onclick=enter;
onkeydown=e=>{if(!['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','Escape','KeyP','KeyM','KeyR','KeyQ','KeyE','KeyW','KeyA','KeyS','KeyD'].includes(e.code))return;e.preventDefault();keys.add(e.code);if(e.repeat)return;if(e.code==='Enter')enter();if(['KeyP','Escape'].includes(e.code)&&['play','pause'].includes(g.mode))g.enter();if(e.code==='KeyR'){keys.clear();g.reset();}if(e.code==='KeyM')g.muted=!g.muted;};
onkeyup=e=>keys.delete(e.code);onblur=()=>{keys.clear();if(g.mode==='play')g.mode='pause';};
function size(){let el=$('scene'),w=el.clientWidth,h=el.clientHeight,z=w<500?2:w<900?3:3;let cv=$('world');cv.width=Math.ceil(w/z);cv.height=Math.ceil(h/z);cv.style.width=cv.width*z+'px';cv.style.height=cv.height*z+'px';}
new ResizeObserver(size).observe($('scene'));
function layout(){const title=g.mode==='title';for(let id of ['paper','postcard','titlefoot'])$(id).hidden=!title;$('hud').hidden=title;
 $('railL').textContent=title?'RIDER HANDBOOK':'SHIFT 0'+g.shift+'   /   '+['CENTRE','HARBOUR','HILL'][g.shift-1]+' DISPATCH';
 $('railR').textContent=title?'PORTO SOLE   /   ITALIA':'PORTO SOLE   /   RIDER 01';
 $('note').textContent=title?'PORTO SOLE COURIER CO.   •   EST. 1986':'Stop inside the gold ring to deliver. Return to Forno Rosso for fresh orders.';
 const dlg=$('dialog');dlg.hidden=['title','play'].includes(g.mode);
 if(!dlg.hidden){let [tag,name,desc,button]=({
 pause:['RIDER BREAK','On a break.','Your shift clock is paused.','Back to the streets'],
 defeat:['SHIFT REPORT  /  TARGET MISSED','Nightfall.','You earned €'+g.tips+' of €'+targets[g.shift-1]+'. The oven is ready for another try.','Retry this shift'],
 summary:['SHIFT REPORT  /  TARGET MET','Shift complete.','You earned €'+g.tips+' across '+g.count+' deliveries. The '+(g.shift===1?'harbour':'hill')+' route opens tomorrow.','Begin next shift'],
 victory:['FINAL SHIFT  /  TARGET MET','Town favourite.','Three districts served. You closed the last shift with €'+g.tips+' in tips.','Return to title']})[g.mode];
 $('dialogTag').textContent=tag;$('dialogTitle').textContent=name;$('dialogText').textContent=desc;$('continue').innerHTML=button+' <kbd>ENTER ↵</kbd>';}
 size();}
function hud(){paintSky($('sky'),g.time);if(g.mode!=='title')$('railL').textContent='SHIFT 0'+g.shift+'   /   '+['CENTRE','HARBOUR','HILL'][g.shift-1]+' DISPATCH';let district=g.p.x>=180?'Harbour':g.p.x<=-180?'Hill':'Centre';$('sceneTag').lastElementChild.textContent=g.mode==='title'?'PORTO SOLE':district.toUpperCase();$('mute').textContent=g.muted?'Unmute':'Mute';$('toast').textContent=g.mode==='play'&&g.flash>0?g.notice:'';
 $('clock').textContent=clockTime(g);$('light').textContent=phase(g).toUpperCase();$('load').textContent='ORDER BAG   '+g.jobs.length+'/3';$('jobs').innerHTML=g.jobs.map(o=>'<div>'+o.dest.name+'<span>'+Math.round(o.quality)+'% · €'+timeTip(o)+'</span></div>').join('')||'Forno Rosso · '+g.ready.length+' ready';$('tips').textContent='€'+g.tips+' / '+targets[g.shift-1];$('count').textContent=g.count+' DELIVERED';$('drift').textContent=Math.round(g.meter*100)+'%';document.querySelector('.meter i').style.width=g.meter*100+'%';
 const c=$('map').getContext('2d');c.fillStyle='#192631';c.fillRect(0,0,100,29);c.fillStyle='#6e7772';for(let y of [8,20])c.fillRect(2,y,96,1);for(let x=0;x<100;x+=14)c.fillRect(x,8,1,13);
 function blip(x,y,color){c.fillStyle=color;c.fillRect(49+Math.round(x/8),19+Math.round(y*.12),3,3);}blip(0,0,'#e76e4c');for(let o of g.jobs)blip(o.dest.x,o.dest.y,'#f2be59');blip(g.p.x,g.p.y,'#fff1cb');}
function frame(t){const start=performance.now(),flash=g.flash;g.update(Math.min(.05,(t-last)/1000),keys);last=t;if(flash<g.flash)beep();if(lastMode!==g.mode){lastMode=g.mode;layout();lastHUD=-1;}if(lastHUD<0||t-lastHUD>100){hud();lastHUD=t;}view.draw(g);if(g.mode==='play'){perf.push(performance.now()-start);if(perf.length>1200)perf.shift();}requestAnimationFrame(frame);}
requestAnimationFrame(frame);
