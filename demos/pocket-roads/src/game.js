import {World} from './world.js';
import {MotorAudio} from './audio.js';
import {LENGTH,GATES,GOLD,SILVER,HALF_ROAD,obstacles,roadX,slope,curvature,clamp} from './route.js';

const $=id=>document.getElementById(id);
const get=(key,def)=>{try{const s=localStorage.getItem('pr.'+key);return s===null?def:JSON.parse(s)}catch{return def}};
const put=(key,v)=>{try{localStorage.setItem('pr.'+key,JSON.stringify(v))}catch{}};
const stored=get('anchor',null);
const valid=stored&&Number.isFinite(stored.x)&&Number.isFinite(stored.y);
const state={s:0,x:1.95,v:0,steer:0,brake:0,elapsed:0,launched:false,hits:0,gates:0,impactAge:1,wall:0,physical:valid&&get('physical',false),anchor:valid?{x:clamp(stored.x,.04,.96),y:clamp(stored.y,.12,.93)}:{x:.5,y:.72}};
const audio=new MotorAudio(get('sound',true));
const keys=new Set(),touch={steer:0,gas:0,brake:0};
let phase='ready',world=null,last=0,hudTime=0,noticeTimer,calReturn,calPrevious,modalKind,returnPhase,calPhysical;
const body=document.body,modal=$('modal');
const icons=(id,symbol)=>$(id).querySelector('use').setAttribute('href','#'+symbol);
const formatTime=t=>{const cs=Math.floor(t*100+.00001);return String(Math.floor(cs/6000)).padStart(2,'0')+':'+String(Math.floor(cs/100)%60).padStart(2,'0')+'.'+String(cs%100).padStart(2,'0')};
const keyForBest=()=>state.physical?'best.physical':'best.virtual';
const best=()=>{const n=get(keyForBest(),null);return Number.isFinite(n)&&n>0?n:null};
const notice=(msg,ms=2100)=>{clearTimeout(noticeTimer);$('notice').textContent=msg;$('notice').classList.toggle('show',!!msg);if(msg)noticeTimer=setTimeout(()=>$('notice').classList.remove('show'),ms)};
function setPhase(next){
  phase=next;body.dataset.state=phase;
  $('anchor').hidden=!(phase==='calibration'||phase==='ready'&&state.physical);
  if(!$('anchor').hidden)updateAnchor();
  body.classList.toggle('live',phase!=='ready'||state.physical);
  $('drive').querySelector('span').textContent=phase==='running'?'Pause':phase==='paused'?'Resume':phase==='finished'?'Run again':'Start run';
  icons('drive',phase==='running'?'pause':'flag');
  $('drive').disabled=phase==='calibration';$('status').textContent=phase==='running'?(state.launched?'STAGE LIVE':'AWAITING THROTTLE'):phase==='finished'?'STAGE COMPLETE':phase==='calibration'?'CALIBRATING':phase==='paused'?'ENGINE PAUSED':'SYSTEM READY';
  $('mode').textContent=state.physical?'PHYSICAL CAR':'VIRTUAL CAR';
  audio.update(state.v,0,phase==='running',0);
}
function soundUI(){
  $('audio').setAttribute('aria-pressed',audio.enabled);$('audio').setAttribute('aria-label',audio.enabled?'Mute sound':'Enable sound');
  $('audio').querySelector('span').textContent=audio.enabled?'Sound on':'Sound off';icons('audio',audio.enabled?'sound':'muted');
}
$('audio').onclick=()=>{audio.enabled=!audio.enabled;put('sound',audio.enabled);audio.unlock();soundUI();audio.update(state.v,0,phase==='running',0)};
soundUI();
const ns='http://www.w3.org/2000/svg';
function svg(name,attrs,parent){const node=document.createElementNS(ns,name);for(const [k,v] of Object.entries(attrs))node.setAttribute(k,v);parent.append(node);return node}
const trace=s=>[8+s/LENGTH*152,61-s/LENGTH*40-(roadX(s)-roadX(0))*.14];
const pts=[];for(let s=0;s<=LENGTH;s+=16)pts.push(trace(s).join(','));
svg('polyline',{points:pts.join(' '),stroke:'#16151b','stroke-width':4,fill:'none'},$('map-lines'));
svg('polyline',{points:pts.join(' '),stroke:'#f1916d','stroke-width':2,fill:'none'},$('map-lines'));
GATES.forEach((s,i)=>{const [x,y]=trace(s);svg(i===3?'rect':'circle',i===3?{x:x-2.5,y:y-2.5,width:5,height:5,fill:'#f5ede4',stroke:'none'}:{cx:x,cy:y,r:1.7,fill:'#ffcab0',stroke:'none'},$('map-lines'))});
const segments=['3,1 17,1 19,3 16,5 5,5 2,3','18,4 20,3 19,15 17,17 15,15 16,6','17,18 19,16 18,29 16,31 14,29 15,20','3,30 14,30 16,32 14,34 2,34 0,32','1,19 3,17 5,19 4,28 2,31 0,29','3,4 5,6 4,14 2,17 0,15 1,6','4,15 15,15 17,17 14,19 4,19 2,17'];
const digitMap=['abcdef','bc','abdeg','abcdg','bcfg','acdfg','acdefg','abc','abcdefg','abcdfg'];
const digits=Array.from({length:3},()=>{const el=svg('svg',{viewBox:'-1 0 23 35','aria-hidden':'true'},$('speed-num'));return segments.map(p=>svg('polygon',{points:p},el))});
let oldSpeed;
function hud(){
  const speed=String(Math.round(state.v*3.6)).padStart(3,'0');if(speed!==oldSpeed){
    digits.forEach((seg,i)=>seg.forEach((p,j)=>p.setAttribute('fill',digitMap[+speed[i]].includes('abcdefg'[j])?'#ff8750':'#4b352e')));
    $('speed-num').setAttribute('aria-label',Number(speed)+' kilometers per hour');oldSpeed=speed;
  }
  $('distance').textContent=(state.s/1000).toFixed(2);$('progress').style.width=state.s/LENGTH*100+'%';
  $('checkpoints').textContent=state.gates;Array.from($('gates').children).forEach((el,i)=>el.classList.toggle('done',i<state.gates));
  const time=formatTime(state.elapsed);$('time').innerHTML=time.slice(0,5)+'<span>'+time.slice(5)+'</span>';
  const [x,y]=trace(state.s);for(const id of ['position-ring','position']){$(id).setAttribute('cx',x);$(id).setAttribute('cy',y)}
}
function draw(dt=1){
  if(world)world.draw(state,dt);
}
function prepare(){
  if(world)return true;
  try{world=new World($('world'));draw();return true}catch(e){console.error(e);openInfo('graphics','Graphics unavailable','<p>This device could not start WebGL. Enable hardware acceleration in the browser and reload the stage.</p>');return false}
}
function reset(){
  Object.assign(state,{s:0,x:1.95,v:0,steer:0,brake:0,elapsed:0,launched:false,hits:0,gates:0,impactAge:1,wall:0});
  if(world)world.heading=null;obstacles.forEach(o=>o.cleared=false);hud();
}
function clearInput(){keys.clear();touch.steer=touch.gas=touch.brake=0;for(const id of ['steer-pad','pedal-pad'])$(id).querySelector('.knob').style.transform=''}
function start(){
  if(!prepare())return;
  reset();audio.unlock();audio.effect('start');setPhase('running');draw();notice('Hold gas to launch',2400);
}
function pause(){if(phase!=='running')return;clearInput();setPhase('paused');openInfo('pause','Run paused',records([['Distance',(state.s/1000).toFixed(2)+' km'],['Stage time',formatTime(state.elapsed)]]))}
function resume(){modal.close();clearInput();audio.unlock();setPhase('running');notice('')}
function restart(){modal.close();clearInput();start()}
function records(pairs){return pairs.map(([k,v])=>'<div class="record"><span>'+k+'</span><b>'+v+'</b></div>').join('')}
function openInfo(kind,title,html){
  modalKind=kind;$('modal-title').textContent=title;$('modal-body').innerHTML=html;const actions=$('modal-actions');actions.replaceChildren();
  const action=(label,fn,main=false)=>{const b=document.createElement('button');b.textContent=label;if(main)b.className='primary';b.onclick=fn;actions.append(b)};
  if(kind==='pause'){action('Resume run',resume,true);action('Restart stage',restart)}
  else if(kind==='finish'){action('Run again',restart,true);action('View course',()=>{modal.close();reset();setPhase('ready');draw()})}
  else action(kind==='help'?'Got it':'Close',closeDialog,true);
  if(!modal.open)modal.showModal();
}
function closeDialog(){
  if(modalKind==='pause'){resume();return}
  modal.close();
  if(modalKind==='help'&&returnPhase==='running'){clearInput();setPhase('running')}
}
$('close').onclick=closeDialog;
modal.addEventListener('cancel',e=>{e.preventDefault();closeDialog()});
$('guide').onclick=()=>{
  if(phase==='calibration')cancelCalibration();
  returnPhase=phase;if(phase==='running'){clearInput();setPhase('paused')}
  const record=best();
  openInfo('help','How to drive','<p>Race the 3.20 km pass through four checkpoints. Finish within 1:55 for gold or 2:15 for silver. Cones, barricades and guardrails cost speed and add two seconds per impact.</p><p><strong>Two thumbs</strong><br>Slide the left stick to steer. Hold the upper half of the right pad for gas or the lower half to brake.</p><p><strong>Keyboard</strong><br>Use WASD or the arrow keys. Escape pauses the run.</p><p><strong>Physical toy</strong><br>Choose Calibrate, mark the center of your toy on the road, then place it facing the top of the screen. The landscape moves beneath it.</p>'+(record?records([['Personal best',formatTime(record)]]):''));
};
$('drive').onclick=()=>{if(phase==='running')pause();else if(phase==='paused')resume();else if(phase!=='calibration')start()};
function updateAnchor(){const el=$('anchor');el.style.left=state.anchor.x*100+'%';el.style.top=state.anchor.y*100+'%'}
function enterCalibration(){
  if(phase==='calibration')return;if(!prepare())return;
  calReturn=phase;calPrevious={...state.anchor};calPhysical=state.physical;
  clearInput();state.physical=true;setPhase('calibration');$('cal-panel').hidden=false;$('anchor').hidden=false;updateAnchor();notice('');draw();
}
function leaveCalibration(){
  $('cal-panel').hidden=true;$('anchor').hidden=true;
  setPhase(calReturn==='running'?'paused':calReturn);draw();
  if(calReturn==='running')openInfo('pause','Run paused','<p>Resume when you are ready.</p>');
}
function cancelCalibration(){state.anchor=calPrevious;state.physical=calPhysical;leaveCalibration()}
$('calibrate').onclick=enterCalibration;$('cancel-cal').onclick=cancelCalibration;
$('save-anchor').onclick=()=>{put('anchor',state.anchor);put('physical',true);leaveCalibration();notice('Physical car calibrated')};
$('virtual').onclick=()=>{state.physical=false;put('physical',false);leaveCalibration();notice('Virtual car selected')};
const stage=$('stage');
function pickAnchor(e){
  const r=stage.getBoundingClientRect();
  state.anchor={x:clamp((e.clientX-r.left)/r.width,.04,.96),y:clamp((e.clientY-r.top)/r.height,.12,.93)};
  updateAnchor();draw();
}
let calPointer=null;
stage.addEventListener('pointerdown',e=>{if(phase==='calibration'&&!e.target.closest('#cal-panel')){calPointer=e.pointerId;stage.setPointerCapture(e.pointerId);pickAnchor(e)}});
stage.addEventListener('pointermove',e=>{if(phase==='calibration'&&e.pointerId===calPointer)pickAnchor(e)});
stage.addEventListener('lostpointercapture',e=>{if(e.pointerId===calPointer)calPointer=null});
function pad(id,isSteer){
  const el=$(id),knob=el.querySelector('.knob');let active=null;
  function move(e){
    const r=el.getBoundingClientRect(),v=isSteer?clamp((e.clientX-r.left-r.width/2)/(r.width*.39),-1,1):clamp((r.top+r.height/2-e.clientY)/(r.height*.39),-1,1);
    if(isSteer){touch.steer=v;knob.style.transform='translateX('+v*r.width*.18+'px)'}
    else{touch.gas=v>=-.12?Math.max(.56,v):0;touch.brake=v<-.12?Math.max(.5,-v):0;knob.style.transform='translateY('+(-touch.gas+touch.brake)*r.height*.17+'px)'}
  }
  el.addEventListener('pointerdown',e=>{
    if(active!==null||phase==='calibration'||modal.open)return;e.preventDefault();
    if(phase==='ready'&&!isSteer)start();
    if(phase!=='running'&&phase!=='ready')return;
    active=e.pointerId;el.setPointerCapture(active);audio.unlock();move(e);
  });
  el.addEventListener('pointermove',e=>{if(e.pointerId===active&&phase==='running')move(e)});
  const end=e=>{if(e.pointerId!==active)return;active=null;knob.style.transform='';if(isSteer)touch.steer=0;else touch.gas=touch.brake=0};
  for(const event of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(event,end);
}
pad('steer-pad',true);pad('pedal-pad',false);
const drivingKeys=['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
window.addEventListener('keydown',e=>{
  if(modal.open||e.metaKey||e.ctrlKey||e.altKey)return;
  if(e.code==='Escape'){if(phase==='calibration')cancelCalibration();else pause();return}
  if(!drivingKeys.includes(e.code)||phase==='calibration')return;e.preventDefault();if(phase==='ready'&&['KeyW','ArrowUp'].includes(e.code))start();keys.add(e.code);
});
window.addEventListener('keyup',e=>keys.delete(e.code));
function suspend(){clearInput();if(phase==='running')pause()}
window.addEventListener('blur',suspend);document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend()});
window.addEventListener('resize',()=>{if(world){world.resize();draw()}});
function impact(){
  state.v*=.43;state.elapsed+=2;state.hits++;state.impactAge=0;audio.effect('hit');
  $('flash').classList.remove('hit');void $('flash').offsetWidth;$('flash').classList.add('hit');notice('Impact   +2.00 s',1650);navigator.vibrate?.(70);
}
function finish(){
  const pb=best(),record=!pb||state.elapsed<pb;if(record)put(keyForBest(),state.elapsed);
  state.v=0;clearInput();setPhase('finished');hud();notice('');audio.effect('finish');
  openInfo('finish','Stage complete',records([['Medal',state.elapsed<=GOLD?'Gold':state.elapsed<=SILVER?'Silver':'Bronze'],['Stage time',formatTime(state.elapsed)],['Checkpoints','4 / 4'],['Impact penalties','+'+(state.hits*2).toFixed(2)+' s'],[record?'New personal best':'Personal best',formatTime(record?state.elapsed:pb)]]));
}
function step(dt){
  const left=keys.has('KeyA')||keys.has('ArrowLeft'),right=keys.has('KeyD')||keys.has('ArrowRight');
  const gas=Math.max(touch.gas,+(keys.has('KeyW')||keys.has('ArrowUp'))),brake=Math.max(touch.brake,+(keys.has('KeyS')||keys.has('ArrowDown')));
  state.impactAge=Math.min(1,state.impactAge+dt);
  state.brake=brake;state.steer+=(clamp(touch.steer+right-left,-1,1)-state.steer)*(1-Math.exp(-dt*7));
  if(gas&&!state.launched){state.launched=true;$('status').textContent='STAGE LIVE';notice('')}
  if(state.launched)state.elapsed+=dt;
  const rough=clamp((Math.abs(state.x)-4.2)/.7,0,1);
  state.v=clamp(state.v+dt*(gas*(8.6-.10*state.v)-brake*17-.6-.0029*state.v*state.v-rough*(2+state.v*.10)),0,39);
  const prev=state.s;state.s=Math.min(LENGTH,state.s+state.v*dt/Math.hypot(1,slope(state.s)));
  const drift=curvature(state.s)*state.v*state.v*.32;
  state.x+=dt*(state.steer*Math.min(state.v*.57,7.7)-drift);
  const edge=HALF_ROAD-.72;
  if(Math.abs(state.x)>=edge){state.x=clamp(state.x,-edge,edge);state.v=Math.max(0,state.v-state.v*.26*dt);if(state.wall<=0&&state.v>5){impact();state.wall=1}}
  else if(Math.abs(state.x)<edge-.22)state.wall=0;
  for(const o of obstacles){
    if(o.cleared||o.s<prev-2.2||o.s>state.s+1.9)continue;
    if(Math.abs(state.x-o.x)<(o.type==='barrier'?1.78:1.56)){o.cleared=true;impact()}
  }
  if(state.gates<4&&state.s>=GATES[state.gates]){state.gates++;if(state.gates===4){finish();return}audio.effect('gate');notice('Checkpoint '+state.gates+' / 4')}
  audio.update(state.v,gas,true,rough);
}
function frame(now){
  const elapsed=(now-(last||now))/1000,delta=Math.min(.16,elapsed);last=now;
  if(phase==='running'){
    if(state.launched)state.elapsed+=elapsed-delta;
    let left=delta;while(left>.00001&&phase==='running'){const dt=Math.min(left,1/60);step(dt);left-=dt}
    draw(delta);hudTime+=delta;if(hudTime>.045){hud();hudTime=0}
  }else if(world&&(phase==='calibration'||state.physical&&phase==='ready'))draw(delta);
  requestAnimationFrame(frame);
}
setPhase('ready');hud();if(state.physical&&!prepare()){state.physical=false;setPhase('ready')}requestAnimationFrame(frame);
