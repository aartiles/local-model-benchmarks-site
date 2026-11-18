// A fifteen-pixel-tall view out to sea doubles as the shift's daylight gauge.
import {colours} from './index.js';
export function paintSky(canvas,t){
 const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
 const dusk=t>=85,night=t>=150;
 const rect=(x,y,width,height,index)=>{c.fillStyle=colours[index-1];c.fillRect(x,y,width,height);};
 rect(0,0,w,12,night?24:dusk?9:12);rect(0,7,w,5,night?2:dusk?11:13);
 if(night){for(let i=0;i<13;i++)rect(i*31%w,i*7%8,1,1,7);rect(115,2,4,4,7);rect(114,1,3,3,24);}
 else{let sy=1+Math.floor(t/17),sx=32+Math.floor(t*.5);rect(sx-2,sy,5,7,8);rect(sx-3,sy+1,7,5,8);}
 rect(0,12,w,3,night?17:18);for(let x=0;x<w;x+=17)rect(x,13,6,1,night?18:20);
 for(let x=2;x<28;x+=5)rect(x,9-(x*3%4),4,6+x*3%4,2);
 rect(19,3,2,8,2);rect(18,3,4,1,2);rect(119,11,12,1,1);rect(123,5,1,6,1);
}
