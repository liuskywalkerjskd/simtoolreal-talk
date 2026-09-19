export const results=[
 ['Hammer','Claw','Swing down',[100,100,100,100,100]],['Hammer','Claw','Swing side',[100,100,77.5,100,100]],['Hammer','Mallet','Swing down',[100,100,33.3,100,88.9]],['Hammer','Mallet','Swing side',[65.6,81.3,100,78.1,62.5]],
 ['Marker','Sharpie','Draw smile',[100,100,100,100,0]],['Marker','Sharpie','Write C',[100,100,100,32,56]],['Marker','Staples','Draw smile',[100,53.1,100,100,100]],['Marker','Staples','Write C',[31,0,100,100,100]],
 ['Eraser','Handle','Wipe smile',[100,100,100,100,100]],['Eraser','Handle','Wipe C',[100,100,100,100,100]],['Eraser','Flat','Wipe smile',[100,100,100,100,100]],['Eraser','Flat','Wipe C',[100,100,100,100,100]],
 ['Brush','Blue','Sweep forward',[47.8,47.8,40,60,60]],['Brush','Blue','Sweep right',[100,100,100,100,100]],['Brush','Red','Sweep forward',[100,100,13.5,100,100]],['Brush','Red','Sweep right',[43.2,62.2,100,42.2,59.5]],
 ['Spatula','Spoon','Serve plate',[100,76.5,100,48.5,100]],['Spatula','Spoon','Flip over',[77.5,100,100,100,100]],['Spatula','Flat','Serve plate',[100,75,78.1,56.3,78.1]],['Spatula','Flat','Flip over',[0,52.2,0,78.3,100]],
 ['Screwdriver','Long','Spin vertical',[20.9,72.1,53.5,74.4,58.1]],['Screwdriver','Long','Spin horizontal',[48.4,86.7,83.3,3.3,86.7]],['Screwdriver','Short','Spin vertical',[15.4,61.5,12.8,100,0]],['Screwdriver','Short','Spin horizontal',[100,100,100,77.8,0]]
];
export const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
const T='#1d7d76',M='#6c7474',S='#e8f5f3',W='#af673d';
const txt=(x,y,t,size=22,c='#1a1a1a',anchor='start')=>`<text x="${x}" y="${y}" fill="${c}" font-size="${size}" text-anchor="${anchor}">${t}</text>`;
const rect=(x,y,w,h,fill=S,stroke='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="${stroke}"/>`;
const line=(x,y,x2,y2,c=T,arrow=false)=>`<path d="M${x},${y} L${x2},${y2}" fill="none" stroke="${c}" stroke-width="2.4" ${arrow?'marker-end="url(#arr)"':''}/>`;
const g=(s,n)=>`<g class="fragment" data-step="${n}">${s}</g>`;
let visualNumber=0;
const svg=(s,h=360)=>{const id='arrow-'+(++visualNumber);return `<svg class="visual" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 ${h}" role="img"><defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${T}"/></marker></defs>${s.replaceAll('url(#arr)',`url(#${id})`)}</svg>`;};
const hammer=(x,y,angle=0,scale=1,color=T)=>`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})"><rect x="-8" y="-5" width="16" height="95" rx="5" fill="${color}"/><rect x="-32" y="-21" width="64" height="30" rx="4" fill="${color}"/></g>`;
const axis=(x,y,a=0)=>`<g transform="translate(${x} ${y}) rotate(${a})">${line(0,0,42,0,'#b06b50')}${line(0,0,0,-40,'#2ba39b')}${line(0,0,-23,22,'#5d79b7')}${txt(47,6,'x',14,'#b06b50')}${txt(-3,-46,'y',14,T)}${txt(-34,35,'z',14,'#5d79b7')}</g>`;
export function pose(){return svg(
 txt(35,30,'A task becomes an ordered set of rigid-object configurations',23,M)+
 hammer(175,214,-90,1.2)+axis(175,214)+txt(170,355,'g¹  Lift',23,T,'middle')+
 g(line(285,200,410,115,T,true)+hammer(480,143,-25,1.2)+axis(480,143,-25)+txt(485,355,'g²  Reorient',23,T,'middle'),1)+
 g(line(590,130,730,210,T,true)+hammer(825,210,30,1.2)+axis(825,210,30)+txt(830,355,'g³  Swing',23,T,'middle'),2)+
 txt(1030,140,'3D',35,T,'middle')+txt(1030,170,'position',18,M,'middle')+txt(1030,236,'3D',35,T,'middle')+txt(1030,266,'orientation',18,M,'middle'),385);}
export function reduction(){return svg(
 txt(60,35,'TASK SPECIFICATION',16,M)+txt(60,90,'Human tool motion',30)+txt(60,128,'Object pose waypoints',22,T)+
 g(rect(415,48,300,120)+txt(565,93,'Reusable goal-reaching',25,T,'middle')+txt(565,129,'RL policy',25,T,'middle')+line(300,110,398,110,T,true),1)+
 g(line(730,110,818,110,T,true)+txt(850,83,'ROBOT EXECUTION',16,M)+txt(850,122,'Arm + hand actions',24),2)+
 line(65,206,1055,206,'#d6e5e1')+txt(60,254,'Specify where the tool goes',23,T)+txt(630,254,'Learn how this robot moves it',23,T)+
 txt(60,294,'Human-to-robot task description',19,M)+txt(630,294,'Contacts and regrasping emerge from RL',19,M),330);}
export function primitives(){let s=txt(35,30,'One structural prior, many physical instances',23,M);for(let i=0;i<8;i++){const x=75+i*135,w=12+(i%3)*8,h=80+(i%4)*14;s+=`<g transform="translate(${x},150)">${rect(-w/2,0,w,h,'#c7a77b')}${rect(-18-i%3*11,-25,36+i%3*22,28+i%2*22,'#9ba3a5')}${i===2?'<rect x="-22" y="-5" width="44" height="120" fill="none" stroke="#2ba39b" stroke-width="2" stroke-dasharray="6 5"/>':''}</g>`;}s+=txt(70,327,'Geometry',23,T)+txt(70,359,'Shape + size',19,M)+txt(400,327,'Mass distribution',23,T)+txt(400,359,'Handle / head densities',19,M)+txt(780,327,'Shared policy inputs',23,T)+txt(780,359,'Pose + grasp-region box',19,M);return svg(s,395);}
export function training(){return svg(
 rect(35,35,295,112)+txt(182,80,'Procedural primitives',24,T,'middle')+txt(182,116,'Geometry + density variation',18,M,'middle')+
 rect(35,205,295,112)+txt(182,250,'Random pose goals',24,T,'middle')+txt(182,286,'First far, then locally perturbed',18,M,'middle')+
 g(line(348,89,455,172,T,true)+line(348,262,455,184,T,true)+rect(475,104,260,148)+txt(605,156,'Physics simulation',25,T,'middle')+txt(605,197,'SAPG training',23,T,'middle'),1)+
 g(line(749,177,830,177,T,true)+rect(850,104,235,148)+txt(967,157,'One LSTM policy',25,T,'middle')+txt(967,197,'No test-tool training',18,M,'middle'),2),355);}
export function loop(){return svg(
 rect(35,40,270,110)+txt(170,82,'Current object pose',23,T,'middle')+txt(170,119,'RGB-D tracking at 30 Hz',18,M,'middle')+
 rect(35,225,270,105)+txt(170,268,'Goal waypoint gᵏ',24,T,'middle')+txt(170,302,'Human video sampled at 3 Hz',17,M,'middle')+
 line(322,95,435,171,T,true)+line(322,275,435,195,T,true)+rect(450,125,240,100)+txt(570,165,'LSTM policy',26,T,'middle')+txt(570,200,'Robot state + grasp box',17,M,'middle')+
 line(708,175,800,175,T,true)+rect(818,120,270,110)+txt(953,166,'29 joint targets',26,T,'middle')+txt(953,203,'Control at 60 Hz',20,M,'middle')+
 g(`<path d="M950 240V353H570V239" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+txt(762,387,'Physical feedback',19,M,'middle'),1)+
 g(txt(52,370,'Advance only after reaching gᵏ',20,T),2),420);}
export function performance(){const cats=[...new Set(results.map(r=>r[0]))];let s=txt(170,27,'Mean Task Progress (%)',20,M);for(let v=0;v<=100;v+=25){s+=line(190+v*7.9,42,190+v*7.9,365,'#e0e9e6')+txt(190+v*7.9,397,''+v,17,M,'middle');}cats.forEach((c,i)=>{const a=mean(results.filter(r=>r[0]===c).flatMap(r=>r[3])),y=55+i*51;s+=txt(160,y+23,c,22,'#1a1a1a','end')+rect(190,y,a*7.9,31,c==='Screwdriver'?'#9ab4af':'#2ba39b')+txt(205+a*7.9,y+24,a.toFixed(1),21,T);});return svg(s,420);}
export function failures(){const data=[['Pose tracking loss',43.7,T],['Object drops',34.5,'#71aba2'],['Incomplete rotation',18.2,'#9eb4ae'],['Grasp failure',3.6,'#c5d0cd']];let s='',offset=25;data.forEach(([n,v,c])=>{const width=v*10.6;s+=rect(offset,30,width,80,c);offset+=width;});data.forEach(([n,v,c],i)=>{const y=170+i*52;s+=rect(25,y-18,19,19,c)+txt(61,y,n,24)+txt(555,y,v+'%',27,T,'end');});s+=txt(705,197,'43.7%',67,T)+txt(705,238,'of observed failures',22,M)+txt(705,285,'Perception is a system bottleneck',22,T);return svg(s,385);}
export function hybrid(){return svg(
 txt(40,25,'PROPOSED EXTENSION',15,W)+rect(35,58,270,124,'#f7eee7')+txt(170,101,'Lightweight VLM',25,W,'middle')+txt(170,139,'Tool / grasp region / subgoal',18,M,'middle')+
 line(324,120,428,120,T,true)+rect(446,58,295,124)+txt(593,101,'Geometry + state estimator',22,T,'middle')+txt(593,139,'Metric pose + confidence',18,M,'middle')+
 line(760,120,821,120,T,true)+rect(840,58,245,124)+txt(962,101,'Goal-conditioned RL',23,T,'middle')+txt(962,139,'Fast physical control',18,M,'middle')+
 g(line(593,265,593,203,T,true)+txt(595,310,'RGB-D, multi-view or tactile evidence',22,T,'middle')+txt(595,345,'Ground the semantic proposal in measurable state',20,M,'middle'),1),380);}
export function baseline(){let s='';const rows=[['No initial tool rotation',98,61,8.1],['90° tool rotation required',82.7,10.8,0]];rows.forEach((r,j)=>{s+=txt(30,30+j*180,r[0],22,T);r.slice(1).forEach((v,i)=>{const y=52+j*180+i*43;s+=txt(250,y+22,['SimToolReal','Fixed grasp','Retargeting'][i],19,M,'end')+rect(275,y,v*7.1,26,[T,'#9eb4ae','#c0c8c6'][i])+txt(290+v*7.1,y+21,v.toFixed(1)+'%',20,T);});});return svg(s,365);}
