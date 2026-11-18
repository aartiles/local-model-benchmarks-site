// Each volume is written directly into a one-row, indexed slice sheet.
export const colours=['#192631','#293944','#42545a','#6e7772','#a79c85','#d4b992','#f6dfb2','#fff1cb','#833e40','#b65143','#e76e4c','#ff9d63','#f2be59','#9c684a','#bc855b','#744d42','#174e56','#267572','#41958b','#77b4a0','#36573f','#64804b','#9ba55b','#445064'];
export const C={ink:1,slate:2,road:3,stone:4,sand:5,cream:6,light:7,white:8,wine:9,red:10,tomato:11,peach:12,gold:13,umber:14,wood:15,shadow:16,deep:17,teal:18,sea:19,foam:20,pine:21,leaf:22,lime:23,blue:24};
export const models={};
export function volume(w,h,n){
 const stride=w*n, data=new Uint8Array(stride*h);
 function box(x,y,z,a,b,c,k){for(let j=Math.max(0,y);j<Math.min(h,b);j++)for(let i=Math.max(0,z);i<Math.min(n,c);i++)data.fill(k,j*stride+i*w+Math.max(0,x),j*stride+i*w+Math.min(w,a));}
 function oval(x,y,z,rx,ry,d,k){for(let j=0;j<h;j++){const t=1-((j-y)/ry)**2;if(t>=0){const dx=rx*Math.sqrt(t);box(Math.ceil(x-dx),j,z,Math.floor(x+dx)+1,j+1,z+d,k);}}}
 return {w,h,n,stride,data,box,oval};
}
const glyph={P:['110','101','110','100','100'],I:['111','010','010','010','111'],Z:['111','001','010','100','111'],A:['010','101','111','101','101'],B:['110','101','110','101','110'],R:['110','101','110','101','101'],L:['100','100','100','100','111'],D:['110','101','101','101','110'],O:['010','101','101','101','010'],F:['111','100','110','100','100']};
function house(id,w,h,n,wall,trim,roof,label,style){
 const m=models[id]=volume(w,h,n),b=m.box,H=n-10;
 b(2,3,0,w-2,h-4,H,wall);b(2,3,0,5,h-4,H,trim);b(1,2,0,w-1,h-3,2,4);
 for(let x=7;x<w-6;x+=10){b(x,h-5,4,x+6,h-3,13,16);b(x+1,h-4,5,x+5,h-3,12,17);b(x+3,h-4,6,x+4,h-3,11,20);b(x-1,h-4,3,x+7,h-2,5,trim);}
 b(w-14,h-4,1,w-7,h-2,13,1);b(w-12,h-3,2,w-8,h-2,11,14);
 for(let y=7;y<h-9;y+=10)b(w-2,y,6,w-1,y+5,13,17);
 b(0,1,H-2,w,h-2,H,trim);b(1,1,H,w-1,h-3,H+2,roof);
 if(style%2===0){for(let z=0;z<7;z++){const y=2+z*2;b(2,y,H+2+z,w-2,h-4-z*2,H+3+z,roof);for(let x=3+(z%2)*3;x<w-3;x+=8)b(x,y,H+2+z,x+1,h-4-z*2,H+3+z,trim);}}
 else {b(3,3,H+2,w-3,h-5,H+3,trim);b(6,7,H+3,16,15,H+6,4);for(let y=8;y<15;y+=2)b(7,y,H+6,15,y+1,H+7,2);b(w-16,6,H+3,w-8,14,H+5,roof);}
 if(label){
 let start=Math.floor((w-label.length*4)/2);b(start-3,h-3,16,start+label.length*4+2,h-1,23,1);
 [...label].forEach((l,i)=>glyph[l].forEach((row,r)=>[...row].forEach((v,j)=>{if(v==='1')b(start+i*4+j,h-3,21-r,start+i*4+j+1,h-1,22-r,7)})));
 }
 for(let x=4;x<w-4;x+=4){const c=(x/4)%2?trim:7;b(x,h-4,14,x+4,h-1,16,c);b(x,h-1,13,x+4,h,15,c);}
 if(id==='depot'){b(7,h-4,2,31,h,14,17);for(let z=3;z<14;z+=3)b(7,h-3,z,31,h,z+1,18);}
 if(id==='villa'){b(5,h-3,15,w-5,h-1,17,14);for(let x=6;x<w-5;x+=5)b(x,h-2,17,x+1,h,21,15);b(4,h-2,20,w-4,h,22,14);}
 if(id==='pizzeria'){b(8,7,H+3,14,14,n-1,10);b(7,6,n-2,15,15,n,9);b(9,8,n-1,13,12,n,1);}
 return m;
}
house('pizzeria',58,38,36,12,10,11,'PIZZA',0);
house('lido',48,34,35,6,18,19,'LIDO',1);
house('bar',45,36,36,15,9,10,'BAR',0);
house('villa',42,38,42,7,14,15,'',0);
house('depot',58,40,32,5,17,18,'',0);
house('florist',46,36,35,12,21,22,'FLORA',1);
function car(id,c,van){const m=models[id]=volume(25,13,van?13:10),b=m.box;
 for(const x of [4,18])for(const y of [0,10])b(x,y,0,x+4,y+3,4,1);
 b(1,1,2,24,12,5,2);b(0,2,4,25,11,6,c);b(2,1,5,23,12,7,c);b(5,2,7,17,11,9,17);
 b(6,2,9,van?18:14,11,m.n,c);for(const y of [2,9])b(23,y,4,25,y+2,6,8);
 b(1,2,5,2,4,7,11);b(2,1,5,22,2,6,van?6:11);
 b(15,3,8,17,10,10,24);b(16,3,8,17,6,10,20);
 if(van){b(5,1,6,15,2,12,7);b(6,1,8,13,2,10,10);b(6,3,12,14,10,13,6);}
 else b(7,3,9,13,10,10,12);}
car('hatch',12,false);car('panelvan',20,true);
{const m=models.scooter=volume(18,10,15),b=m.box;for(const x of [1,13])b(x,3,0,x+4,7,5,1);
 b(2,2,3,15,8,6,11);b(1,1,5,7,9,10,9);b(0,1,10,7,9,11,13);b(8,3,5,12,7,8,2);b(9,2,7,13,8,11,18);b(12,1,8,15,9,9,6);m.oval(11,4.5,11,3,3.5,3,7);b(13,3,11,15,7,13,2);b(15,4,6,17,6,8,8);b(2,2,10,4,7,11,11);b(9,4,13,13,6,15,11);}
{const m=models.palm=volume(31,31,36);for(let z=0;z<29;z++){let x=12+Math.floor(z/10);m.box(x,14,z,x+3,17,z+1,z%4===0?14:15);}
 for(let a=0;a<8;a++){for(let r=0;r<15;r++){let x=15+Math.round(Math.cos(a*.785+0.2)*r),y=15+Math.round(Math.sin(a*.785+0.2)*r),z=Math.round(29+4*Math.sin(r/14*Math.PI)-r/4),w=r>11?1:2;m.box(x-w,y-w,z,x+w+1,y+w+1,z+2,a%3===0?23:a%2?22:21);}}}
{const m=models.lamp=volume(10,8,25),b=m.box;b(2,3,0,6,7,3,2);b(3,4,2,5,6,23,2);b(3,3,22,9,6,24,2);b(6,2,20,10,7,22,13);b(6,2,22,10,7,24,2);}
{const m=models.crate=volume(11,11,9),b=m.box;b(0,0,0,11,11,8,14);for(let k=1;k<11;k+=3)b(k,0,8,k+2,11,9,15);for(let z of [1,6])b(0,0,z,11,11,z+1,16);}
{const m=models.boat=volume(34,15,12);for(let z=0;z<5;z++)m.oval(16,7,z,12+z,3+z,1,z<3?9:7);m.oval(16,7,5,13,5,1,14);m.box(10,3,6,19,12,10,18);m.box(9,2,10,20,13,12,7);}
{const m=models.planter=volume(15,13,12);m.box(0,0,0,15,13,4,14);m.oval(7,6,4,7,6,3,21);m.oval(7,6,7,6,5,3,22);for(let x of [4,9])m.oval(x,x-2,10,2,2,2,12);}
