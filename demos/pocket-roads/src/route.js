export const LENGTH = 3200;
export const GATES = [800, 1600, 2400, LENGTH];
export const GOLD = 115;
export const SILVER = 135;
export const GALLERY = [1720, 1792];
export const HALF_ROAD = 5.15;
export const roadX = s => 40*Math.sin(s/105) + 18*Math.sin(s/58+.6) + 74*Math.sin(s/242-.7);
export const slope = s => 40/105*Math.cos(s/105) + 18/58*Math.cos(s/58+.6) + 74/242*Math.cos(s/242-.7);
export const roadY = s => 3.4*Math.sin(s/135) + 1.1*Math.sin(s/61);
export const curvature = s => (Math.atan(slope(s+1))-Math.atan(slope(s-1)))/2;
export const clamp = (n,a,b) => Math.min(b,Math.max(a,n));
export function point(s, offset=0, lift=0) {
  const a=Math.atan(slope(s));
  return [roadX(s)+offset*Math.cos(a),roadY(s)+lift,-s+offset*Math.sin(a)];
}
export function seeded(seed) {
  return () => { seed=(Math.imul(seed,1664525)+1013904223)>>>0; return seed/4294967296; };
}
const rng=seeded(407);
export const obstacles=[];
for(let s=120;s<LENGTH-70;s+=75+rng()*66){
  if(GATES.some(g=>Math.abs(s-g)<45))continue;
  const lane=rng()>.5?1:-1;
  obstacles.push({s,x:lane*(1.2+rng()*1.9),type:rng()>.42?'cones':'barrier',cleared:false});
}
