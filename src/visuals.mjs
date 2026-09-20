export const results=[
 ['Hammer','Claw','Swing down',[100,100,100,100,100]],['Hammer','Claw','Swing side',[100,100,77.5,100,100]],['Hammer','Mallet','Swing down',[100,100,33.3,100,88.9]],['Hammer','Mallet','Swing side',[65.6,81.3,100,78.1,62.5]],
 ['Marker','Sharpie','Draw smile',[100,100,100,100,0]],['Marker','Sharpie','Write C',[100,100,100,32,56]],['Marker','Staples','Draw smile',[100,53.1,100,100,100]],['Marker','Staples','Write C',[31,0,100,100,100]],
 ['Eraser','Handle','Wipe smile',[100,100,100,100,100]],['Eraser','Handle','Wipe C',[100,100,100,100,100]],['Eraser','Flat','Wipe smile',[100,100,100,100,100]],['Eraser','Flat','Wipe C',[100,100,100,100,100]],
 ['Brush','Blue','Sweep forward',[47.8,47.8,40,60,60]],['Brush','Blue','Sweep right',[100,100,100,100,100]],['Brush','Red','Sweep forward',[100,100,13.5,100,100]],['Brush','Red','Sweep right',[43.2,62.2,100,42.2,59.5]],
 ['Spatula','Spoon','Serve plate',[100,76.5,100,48.5,100]],['Spatula','Spoon','Flip over',[77.5,100,100,100,100]],['Spatula','Flat','Serve plate',[100,75,78.1,56.3,78.1]],['Spatula','Flat','Flip over',[0,52.2,0,78.3,100]],
 ['Screwdriver','Long','Spin vertical',[20.9,72.1,53.5,74.4,58.1]],['Screwdriver','Long','Spin horizontal',[48.4,86.7,83.3,3.3,86.7]],['Screwdriver','Short','Spin vertical',[15.4,61.5,12.8,100,0]],['Screwdriver','Short','Spin horizontal',[100,100,100,77.8,0]]
];
export const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
export function simPipeline(){return svg(
 txt(30,30,'SIMULATION ONLY',15,T)+rect(30,60,290,140)+txt(175,101,'Parallel environments',25,T,'middle')+txt(175,139,'Tool geometry + physics',20,M,'middle')+txt(175,172,'Random pose goals',20,M,'middle')+
 line(335,129,445,129,T,true)+txt(390,105,'state',17,M,'middle')+
 rect(465,65,265,130)+txt(597,110,'LSTM actor',27,T,'middle')+txt(597,149,'Limited observations',21,M,'middle')+txt(597,179,'With noise and delay',18,M,'middle')+
 `<path d="M597 207V247H175V214" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+txt(377,280,'Joint targets change contacts and tool motion',20,M,'middle')+
 g(rect(830,65,260,130,'#f1f5f3')+txt(960,110,'Asymmetric critic',24,T,'middle')+txt(960,149,'Clean simulator state',20,M,'middle')+
 `<path d="M175 55V43H960V55" fill="none" stroke="${T}" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#arr)"/>`+
 txt(720,328,'SAPG updates the policy using simulated experience',22,T,'middle')+txt(720,362,'Critic supports training only',20,M,'middle'),1),390);}

export function memory(){let s=txt(28,22,'THE SAME RECURRENT NETWORK AT EVERY CONTROL STEP',15,M);[190,550,910].forEach((x,i)=>{
 const step=i===0?'t − 1':i===1?'t':'t + 1';
 const recurrent=i===1?'hₜ₋₁, cₜ₋₁':'hₜ, cₜ';
 const cell=txt(x,59,'Observation x'+['ₜ₋₁','ₜ','ₜ₊₁'][i],21,T,'middle')+line(x,72,x,92,T,true)+rect(x-105,103,210,70)+txt(x,133,'LSTM [1024]',23,T,'middle')+txt(x,159,'time '+step,16,M,'middle')+
 line(x,180,x,199,T,true)+txt(x+23,194,'MLP',15,M)+txt(x,229,'Action a'+['ₜ₋₁','ₜ','ₜ₊₁'][i],21,T,'middle');
 s+=i?g(cell+line(x-240,138,x-121,138,T,true)+txt(x-181,116,recurrent,17,M,'middle'),i):cell;
 });
 return svg(s,245);}

export function deployment(){return svg(
 txt(25,25,'SETUP FOR A NEW TOOL / DEMONSTRATION',15,T)+
 rect(25,50,245,92)+txt(147,85,'Human RGB-D video',22,T,'middle')+txt(147,119,'One demonstrated motion',17,M,'middle')+
 line(283,96,325,96,T,true)+rect(340,50,310,92)+txt(495,85,'Prompted SAM 2 + SAM 3D',22,T,'middle')+txt(495,119,'Metric mesh + grasp box',18,M,'middle')+
 line(662,96,704,96,T,true)+rect(720,50,370,92)+txt(905,85,'FoundationPose on the video',22,T,'middle')+txt(905,119,'Sequence of 6D goal poses',19,M,'middle')+
 g(txt(25,217,'ONLINE EXECUTION',15,T)+rect(25,245,345,106)+txt(197,282,'Live RGB-D + object mesh',22,T,'middle')+txt(197,318,'FoundationPose: current tool pose',19,M,'middle')+
 line(385,299,487,299,T,true)+rect(505,245,270,106)+txt(640,282,'Frozen LSTM policy',25,T,'middle')+txt(640,318,'Proprioception + grasp box',18,M,'middle')+
 `<path d="M905 154V192H640V235" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+txt(808,181,'Current goal',17,M)+
 line(788,299,845,299,T,true)+rect(860,245,230,106)+txt(975,287,'Arm + hand',25,T,'middle')+txt(975,321,'60 Hz control',19,M,'middle')+
 `<path d="M975 362V404H197V363" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+txt(580,437,'Physical feedback supplies the next observation',20,M,'middle'),1),465);}
// Three-phase overview: task specification and feedback condition a fixed actor.
export function architecture(){return svg(
 rect(25,10,1065,112,'#f1f5f3')+txt(45,38,'1  TRAIN ONCE IN SIMULATION',15,T)+
 txt(45,80,'Primitive tools + random goals',23)+line(375,74,434,74,T,true)+
 txt(455,80,'Physics + RL',24,T)+line(640,74,735,74,T,true)+txt(755,80,'Reusable LSTM policy',24,T)+
 g(txt(25,174,'2  SPECIFY A NEW TASK',15,T)+txt(25,214,'Human RGB-D demonstration',25)+
 txt(25,251,'Grasp box + 6D pose waypoints',21,M)+
 `<path d="M420 238H540V345H555" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+
 txt(595,212,'Perception supplies geometry',21,T)+txt(595,246,'The mesh supports live pose tracking',21,M),1)+
 g(txt(25,310,'3  EXECUTE IN A CLOSED LOOP',15,T)+
 rect(25,335,365,72)+txt(207,365,'Live tool pose + robot state',22,T,'middle')+txt(207,391,'Tracking and proprioception',17,M,'middle')+
 line(405,371,555,371,T,true)+rect(570,335,250,72)+txt(695,365,'Fixed LSTM actor',24,T,'middle')+txt(695,391,'Current goal + grasp box',17,M,'middle')+
 line(835,371,905,371,T,true)+rect(920,335,170,72)+txt(1005,365,'Arm + hand',23,T,'middle')+txt(1005,391,'29 joint targets',17,M,'middle')+
 `<path d="M995 104H1100V286H695V325" fill="none" stroke="${T}" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#arr)"/>`+txt(857,275,'Policy weights',17,M)+
 `<path d="M1005 414V436H207V414" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+txt(604,460,'Physical feedback',18,M,'middle'),2),480);}

export function controller(){return svg(
 txt(25,28,'OBSERVATIONS',15,M)+
 ['Robot proprioception','Current tool pose','Grasp-region box','Current goal pose'].map((s,i)=>rect(25,52+i*71,300,53)+txt(45,86+i*71,s,22,T)).join('')+
 `<path d="M345 78H382V293M345 150H382M345 221H382M345 292H382M382 185H439" fill="none" stroke="${T}" stroke-width="2.4" marker-end="url(#arr)"/>`+
 rect(455,110,235,150)+txt(572,157,'LSTM',35,T,'middle')+txt(572,197,'Recurrent memory',21,M,'middle')+txt(572,233,'Partial observations',18,M,'middle')+
 g(line(705,185,755,185,T,true)+rect(770,130,120,110)+txt(830,193,'MLP',29,T,'middle')+
 line(905,185,960,185,T,true)+txt(1030,167,'29 joint',23,T,'middle')+txt(1030,201,'targets',23,T,'middle')+txt(1030,238,'60 Hz',21,M,'middle'),1)+
 txt(455,334,'No image encoder in the deployed motor policy',22,T)+txt(455,367,'Visual modules estimate the state before control',20,M),400);}
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
 txt(60,35,'TASK SPECIFICATION',16,M)+txt(60,90,'Human tool motion',30)+txt(60,128,'6D pose waypoints',22,T)+
 g(rect(415,48,300,120)+txt(565,93,'Reusable goal-reaching',25,T,'middle')+txt(565,129,'RL policy',25,T,'middle')+line(300,110,398,110,T,true),1)+
 g(line(730,110,818,110,T,true)+txt(850,83,'ROBOT EXECUTION',16,M)+txt(850,122,'Arm + hand actions',24),2)+
 line(65,206,1055,206,'#d6e5e1')+txt(60,254,'Specify where the tool goes',23,T)+txt(630,254,'Learn how this robot moves it',23,T)+
 txt(60,294,'3D position + 3D orientation',19,M)+txt(630,294,'Contacts and regrasping emerge from RL',19,M),330);}
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
