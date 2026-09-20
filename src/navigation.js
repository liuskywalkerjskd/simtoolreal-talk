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
let activeVideo=null;
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>{activeVideo=v;slides[idx].querySelectorAll('video').forEach(other=>{if(other!==v)other.pause();});}));
function toggleVideo(v){if(!v)return;activeVideo=v;if(v.paused)v.play().catch(()=>{});else v.pause();}
document.querySelectorAll('.play-video').forEach(b=>b.onclick=()=>toggleVideo(b.closest('.media-item')?.querySelector('video')||slides[idx].querySelector('video')));
document.querySelector('#next').onclick=next;document.querySelector('#prev').onclick=prev;document.querySelector('#full').onclick=full;document.querySelector('#all').onclick=()=>{step=count();paint();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();return;}if(box.classList.contains('open')||['VIDEO','INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(['BUTTON','A'].includes(e.target.tagName)&&[' ','Enter'].includes(e.key))return;if(['ArrowRight','ArrowDown',' ','PageDown'].includes(e.key)){e.preventDefault();next();}else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();prev();}else if(e.key==='Home')window.goSlide(1,false);else if(e.key==='End')window.goSlide(slides.length);else if(e.key.toLowerCase()==='a'){step=count();paint();}else if(e.key.toLowerCase()==='f')full();else if(e.key.toLowerCase()==='v')toggleVideo(slides[idx].contains(activeVideo)?activeVideo:slides[idx].querySelector('video'));});
addEventListener('resize',fit);addEventListener('hashchange',()=>window.goSlide(Number(location.hash.slice(1))||1,false));fit();window.goSlide(Number(location.hash.slice(1))||1,false);
