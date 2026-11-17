import * as T from '../vendor/three.module.min.js';
import {LENGTH,GATES,GALLERY,HALF_ROAD,obstacles,roadX,roadY,slope,point,seeded} from './route.js';
import {buildCar} from './car.js';

const loader=new T.TextureLoader();
function texture(name,repeat=false){
  const tex=loader.load(new URL('../assets/'+name,import.meta.url).href);
  if(repeat)tex.wrapS=tex.wrapT=T.RepeatWrapping;
  return tex;
}
function canvasMap(w,h,draw){
  const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'));
  const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;return tex;
}
function strip(start,end,offsets,getVertex){
  const p=[],uv=[],colors=[],indices=[];
  let row=0;
  for(let s=start;s<=end;s+=4,row++){
    offsets.forEach((off,i)=>{
      const [v,col]=getVertex(s,off,i);p.push(...v);uv.push(off,s);if(col)colors.push(...col);
      if(row&&i){const n=row*offsets.length+i,a=n-offsets.length;indices.push(a-1,a,n-1,a,n,n-1)}
    });
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
  if(colors.length)g.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  g.setIndex(indices);g.computeVertexNormals();return g;
}
function signMaterial(line1,line2,color){
  return new T.MeshBasicMaterial({map:canvasMap(512,160,c=>{
    c.fillStyle='#272934';c.fillRect(0,0,512,160);c.fillStyle=color;c.fillRect(0,0,512,6);c.fillRect(0,154,512,6);
    c.textAlign='center';c.font='bold 58px sans-serif';c.fillText(line1,256,77);c.font='30px monospace';c.fillText(line2,256,124);
  }),side:T.DoubleSide});
}
const roadVertex='varying vec2 v; void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const roadFragment=`
uniform sampler2D grain;
uniform float travel,carX,showCar,brake;
uniform vec2 gallery;
varying vec2 v;
float line(float d,float w){float aa=clamp(fwidth(d)*.65,.018,.20);return 1.-smoothstep(w-aa,w+aa,abs(d));}
void main(){
  float x=v.x,s=v.y,dist=s-travel;
  vec3 n=texture2D(grain,vec2(x*.19,s*.115)).rgb;
  float broad=texture2D(grain,vec2(x*.033,s*.012)).g;
  float wet=smoothstep(.18,.82,.6*n.b+.4*broad);
  float sparkle=(n.r-.45)*.065;
  vec3 asphalt=mix(vec3(.075,.082,.112),vec3(.146,.151,.197),wet)+sparkle;
  float wear=exp(-pow((abs(abs(x)-2.5)-.82)*2.2,2.));
  asphalt+=wear*.014;
  float reflect=(.04+.12*wet)*smoothstep(-5.,85.,dist)*(.35+.65*n.b);
  asphalt+=vec3(.64,.45,.48)*reflect;
  float paint=max(line(abs(x)-4.87,.075),line(x,.083)*smoothstep(.3,.65,mod(s,10.))* (1.-smoothstep(5.1,5.5,mod(s,10.))));
  vec3 color=mix(asphalt,vec3(.56,.55,.60)*(.58+.55*n.r),paint);
  float dx=x-carX,cone=1.-smoothstep(2.,3.1+max(dist,0.)*.22,abs(dx));
  float beam=smoothstep(.5,5.,dist)*(1.-smoothstep(8.,55.,dist))*cone;
  float shelter=smoothstep(gallery.x-2.,gallery.x+1.,s)*(1.-smoothstep(gallery.y-1.,gallery.y+2.,s));
  color*=1.-.53*shelter;
  float lamp=pow(max(0.,cos((s-gallery.x)*.3927)),5.)*exp(-abs(x-3.)*.5);
  color+=shelter*lamp*vec3(.25,.134,.061)*(.45+n.r);
  color+=vec3(.19,.179,.145)*beam*(.45+n.r);
  float tail=exp(-abs(abs(dx)-.72)*3.)*smoothstep(1.,2.2,-dist)*exp(-max(0.,-dist-2.)*.48);
  color+=vec3(.74,.042,.029)*tail*(.24+wet+n.r*.4)*showCar*(1.+brake);
  float shadow=exp(-pow(dx/.98,4.)-pow(dist/2.2,4.));color*=1.-.74*shadow*showCar;
  color=mix(color,vec3(.18,.19,.27),smoothstep(65.,540.,dist)*.91);
  gl_FragColor=vec4(color,1.);
}`;
export class World{
  constructor(host){
    this.host=host;
    this.renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
    const r=this.renderer;r.setClearColor(0,0);r.setPixelRatio(Math.min(devicePixelRatio,1.65));host.appendChild(r.domElement);
    this.scene=new T.Scene();this.scene.fog=new T.FogExp2(0x36374f,.0035);
    this.camera=new T.PerspectiveCamera(54,1,.16,720);
    this.scene.add(new T.HemisphereLight(0xffe2df,0x455075,1.95));
    const light=new T.DirectionalLight(0xffdcba,2.05);light.position.set(-30,49,-70);this.scene.add(light);
    const rim=new T.DirectionalLight(0xabbcfa,1.0);rim.position.set(7,8,16);this.scene.add(rim);
    const skyMap=texture('alpine-sky.webp');skyMap.colorSpace=T.SRGBColorSpace;
    skyMap.wrapS=T.MirroredRepeatWrapping;
    this.sky=new T.Mesh(new T.SphereGeometry(600,48,24),new T.ShaderMaterial({
      side:T.BackSide,depthWrite:false,uniforms:{sky:{value:skyMap}},
      vertexShader:'varying vec3 direction; void main(){direction=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:`uniform sampler2D sky; varying vec3 direction; void main(){
        vec3 d=normalize(direction);
        vec2 uv=vec2(.50+atan(d.x,-d.z)/2.25,.18+asin(d.y)*2.15);
        vec3 c=texture2D(sky,uv).rgb;
        c=mix(c,vec3(.012,.014,.034),smoothstep(.98,1.6,uv.y));
        gl_FragColor=vec4(c,1.);
        #include <colorspace_fragment>
      }`
    }));
    this.sky.renderOrder=-5;this.scene.add(this.sky);
    const env=texture('alpine-sky.webp');env.colorSpace=T.SRGBColorSpace;env.mapping=T.EquirectangularReflectionMapping;
    this.scene.environment=env;this.scene.environmentIntensity=.5;
    this.car=buildCar();this.scene.add(this.car);
    this.proxy=new T.Vector3();this.target=new T.Vector3();
    this.chunks=[];this.overhead=[];
    const grain=texture('road-grain.webp',true);grain.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy());
    this.road=new T.ShaderMaterial({uniforms:{gallery:{value:new T.Vector2(...GALLERY)},grain:{value:grain},travel:{value:0},carX:{value:0},showCar:{value:1},brake:{value:0}},vertexShader:roadVertex,fragmentShader:roadFragment,side:T.DoubleSide});
    this.terrain=new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide});
    this.terrain.onBeforeCompile=shader=>{
      shader.uniforms.grain={value:grain};
      shader.vertexShader='varying vec2 groundUV;\n'+shader.vertexShader.replace('#include <uv_vertex>','#include <uv_vertex>\n groundUV=uv;');
      shader.fragmentShader='uniform sampler2D grain; varying vec2 groundUV;\n'+shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n vec3 n=texture2D(grain,groundUV*.23).rgb;diffuseColor.rgb*=.35+1.45*n.r*n.g+.55*texture2D(grain,groundUV*.06).b;');
    };
    this.plants=[0,1,2].map(i=>{
      const map=texture('spruce-'+i+'.webp');map.colorSpace=T.SRGBColorSpace;
      return new T.MeshBasicMaterial({map,alphaTest:.36,side:T.DoubleSide,color:0xbab9cf});
    });
    const box=new T.BoxGeometry(1,1,1);
    const tree=new T.PlaneGeometry(1,1);tree.translate(0,.5,0);
    const metal=new T.MeshStandardMaterial({color:0x646773,metalness:.45,roughness:.55});
    const black=new T.MeshStandardMaterial({color:0x282831,roughness:.85});
    const orange=new T.MeshStandardMaterial({color:0xe56c2b,roughness:.75});
    const white=new T.MeshStandardMaterial({color:0xe7e0cd,roughness:.7});
    const glow=new T.MeshBasicMaterial({color:0xffad57});
    const face=new T.MeshBasicMaterial({map:canvasMap(256,64,c=>{
      c.fillStyle='#dbb89c';c.fillRect(0,0,256,64);c.fillStyle='#a34029';
      for(let i=-65;i<256;i+=60){c.beginPath();c.moveTo(i,64);c.lineTo(i+36,0);c.lineTo(i+66,0);c.lineTo(i+30,64);c.fill()}
    })});
    const chevron=new T.MeshBasicMaterial({map:canvasMap(128,85,c=>{
      c.fillStyle='#202129';c.fillRect(0,0,128,85);c.fillStyle='#f1b477';c.beginPath();c.moveTo(12,8);c.lineTo(61,8);c.lineTo(111,42);c.lineTo(61,77);c.lineTo(12,77);c.lineTo(63,42);c.fill();
    }),side:T.DoubleSide});
    const cone=new T.ConeGeometry(1,1,12),band=new T.CylinderGeometry(.42,.61,1,12);
    const plane=new T.PlaneGeometry(1,1);
    const rock=new T.IcosahedronGeometry(1,0),stone=new T.MeshStandardMaterial({color:0x383743,roughness:.96,flatShading:true});
    const concrete=new T.MeshStandardMaterial({color:0x57525b,roughness:.94});
    const timber=new T.MeshStandardMaterial({color:0x493a36,roughness:.96});
    const windowLight=new T.MeshBasicMaterial({color:0xffba73});
    const roof=new T.ConeGeometry(1,1,4);roof.rotateY(Math.PI/4);
    // Each chunk batches its repeated scenery and can be culled as one group.
    for(let start=-160;start<LENGTH+480;start+=160){
      const end=start+160,group=new T.Group();this.scene.add(group);this.chunks.push({start,end,group});
      group.add(new T.Mesh(strip(start,end,[-HALF_ROAD,0,HALF_ROAD],(s,x)=>[point(s,x)]),this.road));
      const rng=seeded(13091+start);
      const batches=new Map(),dummy=new T.Object3D();
      const add=(key,geo,mat,pos,size,yaw=0)=>{
        if(!batches.has(key))batches.set(key,{geo,mat,matrix:[]});
        dummy.position.set(...pos);dummy.scale.set(...size);dummy.rotation.set(0,yaw,0);dummy.updateMatrix();batches.get(key).matrix.push(dummy.matrix.clone());
      };
      const ground=(s,x)=>{
        const a=Math.abs(x)-HALF_ROAD;
        if(a<1.9)return -.09;
        const side=x<0?-1:1;
        return -.09+(a-1.9)*((x<0?-.36:.19)+.10*Math.sin(s/85+side*2)+.17*Math.cos(s/139+side))+.7*Math.sin(a*.27+s*.09)*Math.min(1,(a-1.9)/8);
      };
      for(const side of [-1,1]){
        const offsets=[HALF_ROAD,6.6,9,14,23,40,67,92].map(x=>x*side);
        group.add(new T.Mesh(strip(start,end,offsets,(s,x,i)=>{
          const k=.7+.18*Math.sin(s*.17+x*5)+.12*Math.sin(s*.056-x*.52);
          const c=i<2?[.027,.025,.033]:[.011,.014,.019];
          return [point(s,x,ground(s,x)),c.map(n=>n*k)];
        }),this.terrain));
        for(let s=start;s<end;s+=4){
          const a=point(s,side*5.85,.69),b=point(s+4,side*5.85,.69);
          const v=new T.Vector3(...b).sub(new T.Vector3(...a)),mid=a.map((n,i)=>(n+b[i])/2);
          for(const h of [0,.12]){const pos=[mid[0],mid[1]+h,mid[2]];add('rail',box,metal,pos,[.105,.10,v.length()+.06],Math.atan2(-v.x,-v.z))}
          const yaw=-Math.atan(slope(s));
          add('posts',box,metal,point(s,side*5.91,.35),[.12,.84,.15],yaw);
          if(s%16===0){
            add('marker',box,black,point(s,side*5.86,.91),[.18,.33,.12],yaw);
            add('glow',box,glow,point(s,side*5.86,1.02),[.12,.10,.14],yaw);
          }
        }
        for(let n=0;n<90;n++){
          const s=start+rng()*160,x=side*(5.42+rng()*10),size=.05+rng()**3*.85;
          add('stones',rock,stone,point(s,x,ground(s,x)+size*.08),[size*1.5,size*.67,size*1.2],rng()*6);
        }
        for(let n=0;n<112;n++){
          const s=start+rng()*160,x=side*(7.7+Math.pow(rng(),1.4)*72),h=4+rng()*13;
          const i=Math.floor(rng()*3);add('tree'+i,tree,this.plants[i],point(s,x,ground(s,x)-.16),[h*(.43+rng()*.19),h,1],-Math.atan(slope(s))+(rng()-.5)*.42);
        }
      }
      for(let s=start+40;s<end;s+=80){
        const bend=slope(s+22)-slope(s-22);
        if(Math.abs(bend)<.14)continue;
        const side=-Math.sign(bend);
        for(let j=0;j<3;j++){
          const at=s+j*8,x=side*6.15,yaw=-Math.atan(slope(at));
          add('signpost',box,metal,point(at,x,.91),[.09,1.85,.09],yaw);
          add('chevron',plane,chevron,point(at-.12,x,1.62),[Math.sign(bend)*1.14,.76,1],yaw);
        }
      }
      for(const s of [655,1108,2590,2850]){
        if(s<start||s>=end)continue;
        const side=1,x=13.2,y=ground(s,x),yaw=-Math.atan(slope(s));
        add('chalet',box,timber,point(s,x,y+1.55),[5.2,3.1,4.8],yaw);
        add('chalet-roof',roof,black,point(s,x,y+4.0),[4.35,2.4,4.12],yaw);
        add('chimney',box,concrete,point(s+.6,x+1.1,y+4.25),[.52,1.55,.6],yaw);
        for(let j=-1;j<=1;j++)add('windows',box,windowLight,point(s-2.45,x+j*1.42,y+1.8),[.55,.72,.065],yaw);
        for(let j=-1;j<=1;j++)add('window-side',box,windowLight,point(s+j*1.25,x-side*2.65,y+1.7),[.055,.72,.48],yaw);
      }
      // An open-sided avalanche gallery breaks up the wooded middle sector.
      for(let s=GALLERY[0];s<GALLERY[1];s+=4){
        if(s<start||s>=end)continue;
        const yaw=-Math.atan(slope(s)),length=4.08*Math.hypot(1,slope(s));
        add('gallery-wall',box,concrete,point(s+2,6.6,2.6),[.55,5.3,length],yaw);
        add('canopy',box,concrete,point(s+2,0,5.55),[13.9,.58,length+.14],yaw);
        if((s-GALLERY[0])%8===0)add('gallery-post',box,concrete,point(s,-6.45,2.65),[.48,5.35,.58],yaw);
        if((s-GALLERY[0])%16===0)add('gallery-lamp',box,windowLight,point(s,6.29,3.9),[.17,.25,1.2],yaw);
      }
      for(const o of obstacles.filter(o=>o.s>=start&&o.s<end)){
        const yaw=-Math.atan(slope(o.s));
        if(o.type==='cones'){
          for(let i=-1;i<=1;i++){
            const x=o.x+i*.64,s=o.s+Math.abs(i)*.27;
            add('bases',box,black,point(s,x,.055),[.46,.11,.46],yaw);
            add('cones',cone,orange,point(s,x,.46),[.215,.87,.215],yaw);
            add('bands',band,white,point(s,x,.45),[.217,.17,.217],yaw);
          }
        }else{
          for(const side of [-1,1])add('legs',box,black,point(o.s,o.x+side*.74,.32),[.14,.64,.54],yaw);
          add('barriers',box,face,point(o.s,o.x,.76),[2.12,.56,.2],yaw);
          for(const side of [-1,1])add('glow',box,glow,point(o.s,o.x+side*.85,1.09),[.12,.14,.12],yaw);
        }
      }
      for(const [i,s] of GATES.entries())if(s>=start&&s<end){
        const mat=signMaterial(i===3?'FINISH':'CHECKPOINT',(i+1)+' / 4',i===3?'#ffe0aa':'#ffab74');
        for(const side of [-1,1]){
          const yaw=-Math.atan(slope(s));add('gate',box,white,point(s,side*5.32,1.9),[.14,3.8,.14],yaw);
          add('gate'+i,plane,mat,point(s-.14,side*5.32,3.35),[3.25,1.02,1],yaw);
        }
        for(let n=0;n<24;n++)for(let j=0;j<2;j++)if((n+j)%2===0)add('finishpaint',box,white,point(s+j*.4,(n-11.5)*.41,.017),[.41,.015,.4],-Math.atan(slope(s)));
      }
      for(const [key,{geo,mat,matrix}] of batches){
        const mesh=new T.InstancedMesh(geo,mat,matrix.length);matrix.forEach((m,i)=>mesh.setMatrixAt(i,m));group.add(mesh);if(key==='canopy')this.overhead.push(mesh);
      }
    }
    this.heading=null;this.resize();
  }
  resize(){const {width,height}=this.host.getBoundingClientRect();this.w=Math.max(1,width);this.h=Math.max(1,height);this.camera.aspect=this.w/this.h;this.renderer.setSize(this.w,this.h,false)}
  draw(state,dt){
    const {s,x,physical,anchor,steer,brake}=state,car=this.car,cam=this.camera;
    const yaw=-Math.atan(slope(s)),wanted=yaw-steer*.09;
    this.heading=this.heading===null?wanted:this.heading+(wanted-this.heading)*(1-Math.exp(-dt*7));
    car.visible=!physical;car.userData.lampPower.value=1+brake*1.8;car.rotation.y=yaw-steer*.115;car.rotation.z=-steer*.017;
    const p=point(s,x,.025);car.position.set(...p);
    const aim=this.heading,back=physical?6.1:8.2,high=physical?8.8:3.0;
    cam.position.set(p[0]+Math.sin(aim)*back,p[1]+high,p[2]+Math.cos(aim)*back);
    this.target.set(p[0]-Math.sin(aim)*20,p[1]+(physical?-5:1.3),p[2]-Math.cos(aim)*20);
    cam.lookAt(this.target);
    if(!physical&&state.impactAge<.42)cam.rotateZ(Math.sin(state.impactAge*52)*Math.exp(-state.impactAge*10)*.025);
    cam.updateProjectionMatrix();cam.updateMatrixWorld();
    this.proxy.set(...p);this.proxy.y+=physical?0:.48;this.proxy.project(cam);
    const ax=physical?anchor.x:.5,ay=physical?anchor.y:.735;
    cam.projectionMatrix.elements[8]+=this.proxy.x-(ax*2-1);
    cam.projectionMatrix.elements[9]+=this.proxy.y-(1-ay*2);
    cam.projectionMatrixInverse.copy(cam.projectionMatrix).invert();
    this.sky.position.copy(cam.position);
    for(const roof of this.overhead)roof.visible=!physical;
    for(const c of this.chunks)c.group.visible=c.end>s-27&&c.start<s+460;
    const u=this.road.uniforms;u.travel.value=s;u.carX.value=x;u.showCar.value=physical?0:1;u.brake.value=brake;
    this.renderer.render(this.scene,cam);
  }
}
