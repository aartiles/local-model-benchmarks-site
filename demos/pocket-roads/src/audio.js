export class MotorAudio {
  constructor(enabled){this.enabled=enabled;this.ctx=null}
  unlock(){
    if(!this.enabled)return;
    try{
      if(!this.ctx){
        this.ctx=new (window.AudioContext||window.webkitAudioContext)();
        const c=this.ctx;this.out=c.createGain();this.out.gain.value=.42;this.out.connect(c.destination);
        this.motor=c.createGain();this.motor.gain.value=0;
        this.filter=c.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=260;
        this.filter.connect(this.motor);this.motor.connect(this.out);
        this.oscs=['sawtooth','triangle'].map((wave,i)=>{const o=c.createOscillator();o.type=wave;o.frequency.value=38*(1+i*.5);o.connect(this.filter);o.start();return o});
        const buf=c.createBuffer(1,c.sampleRate,c.sampleRate);const arr=buf.getChannelData(0);
        for(let i=0;i<arr.length;i++)arr[i]=Math.random()*2-1;
        this.noise=buf;this.air=c.createGain();this.air.gain.value=0;
        const wind=c.createBufferSource(),f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=1250;wind.buffer=buf;wind.loop=true;wind.connect(f);f.connect(this.air);this.air.connect(this.out);wind.start();
      }
      if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});
    }catch{/* Audio is optional on devices with an unavailable audio session. */}
  }
  update(v,gas,active,rough){
    if(!this.ctx)return;
    const t=this.ctx.currentTime,on=active&&this.enabled,gear=Math.floor(v/8.5),freq=33+v*1.25+(v-gear*8.5)*4+gas*7;
    this.oscs.forEach((o,i)=>o.frequency.setTargetAtTime(freq*(1+i*.503),t,.07));
    this.filter.frequency.setTargetAtTime(190+v*7+gas*155,t,.1);
    this.motor.gain.setTargetAtTime(on?.065+gas*.042:0,t,.075);this.air.gain.setTargetAtTime(on?(v/38)*(.047+rough*.10):0,t,.08);
  }
  effect(type){
    if(!this.enabled||!this.ctx)return;
    const c=this.ctx,t=c.currentTime;
    if(type==='hit'){
      const n=c.createBufferSource(),g=c.createGain(),f=c.createBiquadFilter();n.buffer=this.noise;f.frequency.value=650;n.connect(f);f.connect(g);g.connect(this.out);g.gain.setValueAtTime(.46,t);g.gain.exponentialRampToValueAtTime(.001,t+.31);n.start();n.stop(t+.33);return;
    }
    const notes=type==='finish'?[392,494,587,784]:type==='gate'?[494,740]:[165,247];
    notes.forEach((freq,i)=>{const o=c.createOscillator(),g=c.createGain(),at=t+i*.10;o.type='sine';o.frequency.value=freq;o.connect(g);g.connect(this.out);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.16,at+.013);g.gain.exponentialRampToValueAtTime(.0001,at+.21);o.start(at);o.stop(at+.23)});
  }
}
