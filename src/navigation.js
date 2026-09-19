const slides=[...document.querySelectorAll('.slide')];let idx=0,step=0;
const count=()=>Math.max(0,...[...slides[idx].querySelectorAll('.fragment')].map(e=>+e.dataset.step));
function paint(){slides.forEach((s,i)=>{s.classList.toggle('active',i===idx);if(i!==idx)s.querySelectorAll('video').forEach(v=>v.pause());});slides[idx].querySelectorAll('.fragment').forEach(e=>e.classList.toggle('revealed',+e.dataset.step<=step));document.querySelector('#cur').textContent=idx+1;document.querySelector('#tot').textContent=slides.length;document.querySelector('#progress').style.width=((idx+1)/slides.length*100)+'%';slides[idx].querySelector('.build-count').textContent=count()?'BUILD '+step+' / '+count():'';history.replaceState(null,'','#'+(idx+1));}
window.goSlide=(n,all=true)=>{idx=Math.max(0,Math.min(slides.length-1,n-1));step=all?count():0;paint();};
function next(){if(step<count())step++;else if(idx<slides.length-1){idx++;step=0;}paint();}
function prev(){if(step>0)step--;else if(idx>0){idx--;step=count();}paint();}
function fit(){document.querySelector('#canvas').style.transform='translate(-50%,-50%) scale('+Math.min(innerWidth/1280,innerHeight/720)+')';}
function full(){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen();}
const box=document.querySelector('#lightbox');const close=()=>box.classList.remove('open');
document.querySelectorAll('.paperfig img').forEach(el=>el.onclick=()=>{document.querySelector('#lightbox-img').src=el.src;box.classList.add('open');});box.onclick=close;
document.querySelectorAll('.play-video').forEach(b=>b.onclick=()=>{const v=slides[idx].querySelector('video');v.paused?v.play():v.pause();});
document.querySelector('#next').onclick=next;document.querySelector('#prev').onclick=prev;document.querySelector('#full').onclick=full;document.querySelector('#all').onclick=()=>{step=count();paint();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();return;}if(box.classList.contains('open')||['VIDEO','BUTTON','A','INPUT'].includes(e.target.tagName))return;if(['ArrowRight','ArrowDown',' ','PageDown'].includes(e.key)){e.preventDefault();next();}else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev();}else if(e.key==='Home')window.goSlide(1,false);else if(e.key==='End')window.goSlide(slides.length);else if(e.key.toLowerCase()==='a'){step=count();paint();}else if(e.key.toLowerCase()==='f')full();else if(e.key.toLowerCase()==='v'){const v=slides[idx].querySelector('video');if(v)v.paused?v.play():v.pause();}});
addEventListener('resize',fit);addEventListener('hashchange',()=>window.goSlide(Number(location.hash.slice(1))||1,false));fit();window.goSlide(Number(location.hash.slice(1))||1,false);
