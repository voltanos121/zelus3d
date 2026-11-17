(() => {
 const btn=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
 if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn.setAttribute('aria-expanded','false')}))}
 const items=document.querySelectorAll('.reveal');
 if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('visible'));
 const mount=document.getElementById('three-scene');if(!mount)return;
 import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js').then(T=>{
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.1,100);camera.position.z=5;
  const renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setSize(mount.clientWidth,mount.clientHeight);mount.appendChild(renderer.domElement);
  scene.add(new T.AmbientLight(0xffffff,1.3));const light=new T.PointLight(0xffc34f,35,20);light.position.set(2,3,4);scene.add(light);
  const group=new T.Group(),geo=new T.BoxGeometry(1.65,1.65,1.65);
  group.add(new T.Mesh(geo,new T.MeshStandardMaterial({color:0x9c7027,metalness:.9,roughness:.22,transparent:true,opacity:.18})));
  group.add(new T.LineSegments(new T.EdgesGeometry(geo),new T.LineBasicMaterial({color:0xffd36b})));
  const inner=new T.Mesh(new T.OctahedronGeometry(.72),new T.MeshStandardMaterial({color:0xe6ad38,metalness:.9,roughness:.2,wireframe:true}));group.add(inner);
  const ring=new T.Mesh(new T.TorusGeometry(1.45,.012,8,120),new T.MeshBasicMaterial({color:0xf3c45c}));ring.rotation.x=Math.PI/2.6;group.add(ring);scene.add(group);
  let drag=false,x=0,y=0,tx=.35,ty=.55;mount.addEventListener('pointerdown',e=>{drag=true;x=e.clientX;y=e.clientY;mount.setPointerCapture(e.pointerId)});mount.addEventListener('pointermove',e=>{if(!drag)return;ty+=(e.clientX-x)*.009;tx+=(e.clientY-y)*.009;x=e.clientX;y=e.clientY});['pointerup','pointercancel'].forEach(ev=>mount.addEventListener(ev,()=>drag=false));
  const resize=()=>{const w=mount.clientWidth,h=mount.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};new ResizeObserver(resize).observe(mount);
  mount.dataset.ready='true';const render=()=>{requestAnimationFrame(render);if(!drag)ty+=.003;group.rotation.x+=(tx-group.rotation.x)*.05;group.rotation.y+=(ty-group.rotation.y)*.05;inner.rotation.y+=.006;renderer.render(scene,camera)};render();
 }).catch(()=>{mount.style.display='none'});
})();