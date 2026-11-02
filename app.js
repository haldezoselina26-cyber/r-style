'use strict';
/* ====================== DATA ====================== */
const LANGS=[{c:'en',n:'English'},{c:'fr',n:'Français'},{c:'he',n:'עברית',rtl:1},{c:'ar',n:'العربية',rtl:1},
  {c:'es',n:'Español'},{c:'pt',n:'Português'},{c:'it',n:'Italiano'},{c:'de',n:'Deutsch'},{c:'nl',n:'Nederlands'},{c:'ru',n:'Русский'},{c:'uk',n:'Українська'},{c:'pl',n:'Polski'},{c:'tr',n:'Türkçe'},
  {c:'fa',n:'فارسی',rtl:1},{c:'ur',n:'اردو',rtl:1},{c:'hi',n:'हिन्दी'},{c:'am',n:'አማርኛ'},{c:'sw',n:'Kiswahili'},{c:'id',n:'Bahasa Indonesia'},{c:'zh',n:'中文'},{c:'ja',n:'日本語'},{c:'ko',n:'한국어'}];
const SPEECH={en:'en-US',fr:'fr-FR',he:'he-IL',ar:'ar-SA',es:'es-ES',pt:'pt-BR',it:'it-IT',de:'de-DE',nl:'nl-NL',ru:'ru-RU',uk:'uk-UA',pl:'pl-PL',tr:'tr-TR',fa:'fa-IR',ur:'ur-PK',hi:'hi-IN',am:'am-ET',sw:'sw-KE',id:'id-ID',zh:'zh-CN',ja:'ja-JP',ko:'ko-KR'};
const STYLES=['Streetwear','Classic','Minimal','Chic','Sporty','Boho','Vintage','Modest','Elegant','Avant-garde'];
const USERS={
  u1:{name:'Maya Levi',handle:'maya.style',followers:18420,following:312,score:94,crown:true,color:'#E11D2E',bio:'Minimal chic · everyday looks'},
  u2:{name:'Noah Cohen',handle:'noah.fits',followers:9312,following:401,score:88,color:'#2563EB',bio:'Streetwear daily · sneakers'},
  u3:{name:'Lina Haddad',handle:'lina.vintage',followers:25110,following:198,score:96,crown:true,color:'#9333EA',bio:'Vintage finds & thrift flips'},
  u4:{name:'Yael Mizrahi',handle:'yael.modest',followers:7044,following:520,score:85,color:'#059669',bio:'Modest & elegant'},
  u5:{name:'Adam Sasson',handle:'adam.classic',followers:12890,following:233,score:90,color:'#D97706',bio:'Classic menswear · tailoring'},
  u6:{name:'Sara Ben-David',handle:'sara.boho',followers:5630,following:610,score:82,color:'#DB2777',bio:'Boho summer vibes'}
};
const TAKEN=new Set([...Object.values(USERS).map(u=>u.handle),'admin','rstyle','ruby','support','official']);
const GRADS=['linear-gradient(160deg,#4a0d16,#E11D2E 60%,#ff8a5b)','linear-gradient(160deg,#0f172a,#1e3a8a 55%,#38bdf8)','linear-gradient(160deg,#2e1065,#7e22ce 55%,#f0abfc)','linear-gradient(160deg,#052e16,#047857 55%,#a7f3d0)','linear-gradient(160deg,#451a03,#b45309 55%,#fde68a)','linear-gradient(160deg,#500724,#be185d 55%,#fbcfe8)','linear-gradient(160deg,#111,#3f3f46 55%,#a1a1aa)','linear-gradient(160deg,#164e63,#0e7490 55%,#fef3c7)'];
const SAMPLE_SHORTS=[
  {id:'x1',u:'u1',look:['🧥','👖','👟'],cap:'All-black minimal for the office 🖤 #minimal',likes:3412,g:0,score:91,contest:1,tags:['black wool coat','straight jeans','white sneakers']},
  {id:'x2',u:'u2',look:['🧢','👕','🩳','👟'],cap:'Weekend street fit 🔥 #streetwear',likes:1890,g:1,score:84,tags:['baseball cap','oversized tee','cargo shorts']},
  {id:'x3',u:'u3',look:['👒','👗','👡'],cap:'Thrifted 70s dress for 40 ₪ 😍 #vintage',likes:5120,g:2,score:93,contest:1,tags:['70s floral dress','straw hat','sandals']},
  {id:'x4',u:'u4',look:['🧣','🥻','👠'],cap:'Modest evening look for a wedding ✨',likes:2205,g:3,score:88,tags:['long satin dress','silk scarf','heels']},
  {id:'x5',u:'u5',look:['👔','🧥','👞'],cap:'Navy blazer, 3 ways — part 1 #classic',likes:2788,g:4,score:90,tags:['navy blazer','oxford shirt','leather shoes']},
  {id:'x6',u:'u6',look:['🌼','👚','👗','🩴'],cap:'Boho layers for the beach ☀️',likes:980,g:5,score:80,tags:['boho blouse','maxi skirt','flip flops']},
  {id:'x7',u:'u2',look:['🕶️','🧥','👖','🥾'],cap:'Rainy-day layering 🌧️',likes:1433,g:6,score:86,tags:['rain jacket','dark jeans','boots']},
  {id:'x8',u:'u1',look:['👜','👚','👖','👠'],cap:'Date night, no stress 💄 #chic',likes:4021,g:7,score:89,tags:['silk top','high waist jeans','black bag']}
];
const STORIES={u1:[{g:0,e:'👗',cap:'New dress!'},{g:7,e:'👠',cap:'Ready for tonight'}],u3:[{g:2,e:'🛍️',cap:'Thrift haul'},{g:4,e:'👒',cap:'This hat 😍'},{g:5,e:'🌸',cap:'Spring vibes'}],u2:[{g:1,e:'👟',cap:'New drop'}],u5:[{g:6,e:'👔',cap:'Office fit'},{g:4,e:'⌚',cap:'Details matter'}],u4:[{g:3,e:'🧕',cap:'Sunday look'}]};
const SAMPLE_WARDROBE=[
  {id:'s1',name:'White tee',cat:'Top',emoji:'👕',bg:'#e9eef5',color:'#f2f2f2',colorName:'white',warmth:'light'},
  {id:'s9',name:'Wool sweater',cat:'Top',emoji:'🧶',bg:'#f1e3dc',color:'#8a5a44',colorName:'brown',warmth:'warm'},
  {id:'s2',name:'Blue jeans',cat:'Bottom',emoji:'👖',bg:'#dbe7ff',color:'#3b5b92',colorName:'blue',warmth:'medium'},
  {id:'s7',name:'Denim shorts',cat:'Bottom',emoji:'🩳',bg:'#e2ecff',color:'#6b8fc7',colorName:'light blue',warmth:'light'},
  {id:'s3',name:'Red summer dress',cat:'Dress',emoji:'👗',bg:'#ffe1e4',color:'#d7263d',colorName:'red',warmth:'light',only:'woman'},
  {id:'s4',name:'White sneakers',cat:'Shoes',emoji:'👟',bg:'#eef0e4',color:'#f5f5f5',colorName:'white',warmth:'medium'},
  {id:'s8',name:'Sandals',cat:'Shoes',emoji:'🩴',bg:'#f6ecdf',color:'#c49a6c',colorName:'tan',warmth:'light'},
  {id:'s10',name:'Brown boots',cat:'Shoes',emoji:'🥾',bg:'#eadfd6',color:'#4a3426',colorName:'brown',warmth:'warm'},
  {id:'s5',name:'Trench coat',cat:'Outerwear',emoji:'🧥',bg:'#f3e8d6',color:'#b08d57',colorName:'beige',warmth:'warm'},
  {id:'s6',name:'Black bag',cat:'Accessory',emoji:'👜',bg:'#e7e7ea',color:'#222222',colorName:'black',warmth:'any'}
];
const CATS=['Top','Bottom','Dress','Shoes','Outerwear','Accessory'];
const W={hot:{e:'☀️',label:'Hot & sunny',t:31},mild:{e:'🌤️',label:'Mild',t:22},rain:{e:'🌧️',label:'Rainy',t:15},cold:{e:'❄️',label:'Cold',t:7}};
const REPLIES=['Love it 😍','Where did you buy that?','Send me a pic!','Haha yes 😂','That color is perfect on you','Let\'s go shopping this weekend?'];
const ACCENTS=['#D4A017','#E11D2E','#2563EB','#7C3AED','#DB2777','#059669','#D97706','#111111'];
const SKINS=['#f5d0b5','#e8b98f','#e0ac69','#c68642','#8d5524','#5c3a1e'];
const HAIRS=['#111111','#2b1b12','#6b3e26','#c9a15b','#e6d3a3','#b5322f','#8b5cf6'];
const EYES=['#3a2618','#1f6f8b','#3f7d3a','#5a5a5a'];
const ROOMS_FREE=['modern','beach'],ROOMS_ALL=['modern','beach','boutique','runway','paris','night','gold'];
const HS_FREE=['short','long'],HS_ALL=['short','long','ponytail','bun','curly','braids'];
const LIPS=['#c2185b','#e11d2e','#b5651d','#8e3b5b','#f08080'];
const RUBY_FREE=5;

/* ====================== STATE ====================== */
const KEY='rstyle_v3';
let S={lang:null,profile:null,vip:false,plan:'month',trialEnd:0,day:null,accent:'#E11D2E',sound:false,notif:{outfit:true,time:'07:30',msgs:true,contests:true},
  wardrobe:[],removed:[],fav:{},laundry:{},worn:{},saved:[],today:null,looks:[],weather:'mild',ruby:[],rubyDay:{d:'',n:0},
  likes:{},following:{},blocked:{},chats:{},groups:[],requests:[{id:'r1',name:'Dana K.',handle:'dana.k',color:'#0ea5e9',text:'Hi! Where is your jacket from? 😊'}],
  myStory:[],seen:{},posts:[],localComments:{},hiddenComments:{},avatar:{created:false,skin:'#c68642',hair:'#2b1b12',hairStyle:null,eyes:'#3a2618',body:'regular',height:1,room:'modern',wear:{}}};
try{const raw=localStorage.getItem(KEY);if(raw)S=Object.assign(S,JSON.parse(raw));}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){try{S.ruby=S.ruby.slice(-8);S.posts=S.posts.slice(-6);localStorage.setItem(KEY,JSON.stringify(S));}catch(_){}}}
for(const id in S.following){if(S.following[id]&&USERS[id])USERS[id].followers++;}

/* ====================== HELPERS ====================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function t(s,p){let r=((window.I18N||{})[S.lang]||{})[s]||s;if(p)for(const k in p)r=r.split('{'+k+'}').join(p[k]);return r;}
const fmt=n=>Number(n).toLocaleString(S.lang==='ar'?'ar-EG':'en-US');
const initials=n=>(n||'?').replace(/[^\p{L}\p{N} ]/gu,' ').trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()||'?';
const HEART='<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.1 5.2 3 1.6-1.9 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>';
function esc(s){const d=document.createElement('div');d.textContent=s==null?'':String(s);return d.innerHTML;}
function md(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/^#+\s*/gm,'');}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function daysAgo(ds){return Math.round((new Date(today())-new Date(ds))/864e5);}
function toast(msg){const el=$('#toast');el.textContent=String(msg).replace(/\p{Extended_Pictographic}\uFE0F?/gu,'').replace(/\s+/g,' ').trim();el.classList.add('show');clearTimeout(el._h);el._h=setTimeout(()=>el.classList.remove('show'),2400);}
function me(){return S.profile||{};}
function avHTML(u,size){const st=`width:${size}px;height:${size}px;font-size:${Math.round(size*.36)}px;`;
  if(u==='me'){const p=me();return p.photo?`<span class="av" style="${st}background-image:url(${p.photo})"></span>`:`<span class="av" style="${st}background:var(--accent)">${initials(p.username)}</span>`;}
  const x=USERS[u];return `<span class="av" style="${st}background:${x.color}">${initials(x.name)}${x.crown?'<span class="crown">👑</span>':''}</span>`;}
function readFile(f){return new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f);});}
function downscale(src,max,q){return new Promise(r=>{const im=new Image();im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',q));};im.onerror=()=>r(src);im.src=src;});}
function avgColor(src){return new Promise(r=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');const w=im.width,h=im.height;x.drawImage(im,w*.33,h*.33,w*.34,h*.34,0,0,8,8);const d=x.getImageData(0,0,8,8).data;let R=0,G=0,B=0;for(let i=0;i<d.length;i+=4){R+=d[i];G+=d[i+1];B+=d[i+2];}const n=d.length/4;r('#'+[R,G,B].map(v=>Math.round(v/n).toString(16).padStart(2,'0')).join(''));};im.onerror=()=>r('#888888');im.src=src;});}
function pickFile(accept,capture){return new Promise(res=>{const i=document.createElement('input');i.type='file';i.accept=accept||'image/*';if(capture)i.setAttribute('capture','environment');i.style.display='none';
  i.onchange=()=>{res(i.files&&i.files[0]||null);i.remove();};document.body.appendChild(i);i.click();});}
function dataUrlToBlob(u){const [h,b]=u.split(',');const mime=(h.match(/data:(.*?);/)||[])[1]||'image/jpeg';const bin=atob(b);const arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return new Blob([arr],{type:mime});}
function videoFrame(url){return new Promise(r=>{const v=document.createElement('video');v.muted=true;v.playsInline=true;v.src=url;v.onloadeddata=()=>{v.currentTime=Math.min(1,(v.duration||2)/2);};v.onseeked=()=>{const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);r({img:c.toDataURL('image/jpeg',.8),dur:v.duration});};v.onerror=()=>r(null);});}

/* ---- feel: press sound + haptic ---- */
let actx=null;
document.addEventListener('pointerdown',e=>{
  if(!e.target.closest('button'))return;
  if(navigator.vibrate)try{navigator.vibrate(6);}catch(_){}
  if(!S.sound)return;
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain();o.type='sine';o.frequency.value=1400;g.gain.setValueAtTime(.08,actx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.05);o.connect(g).connect(actx.destination);o.start();o.stop(actx.currentTime+.06);}catch(_){}
},{passive:true});

/* ====================== AI (Ruby) & shared DB ====================== */
let AI=null,AI_IMG=false,DB=null,sharedPosts=[];
(async()=>{
  if(!window.claude||!window.claude.use)return;
  try{AI=await window.claude.use('sample');if(AI){try{AI_IMG=!!(await AI.limits()).images;}catch(e){AI_IMG=false;}}}catch(e){AI=null;}
  try{DB=await window.claude.use('db');}catch(e){DB=null;}
  if(DB){try{DB.collection('posts').orderBy('ts','desc').limit(30).onSnapshot(s=>{sharedPosts=s.docs.map(d=>({...d.data(),id:d.id,shared:true}));},()=>{});}catch(e){}}
})();
function aiErr(e){const c=e&&e.code;if(c==='rate_limited')return t('Ruby is busy right now. Try again in a minute.');if(c==='not_granted'||c==='capability_disabled')return t('AI is not available in this window.');return t('Ruby could not answer. Please try again.');}
function langName(){return (LANGS.find(l=>l.c===S.lang)||LANGS[0]).n;}
function userCtx(){
  const p=me(),w=W[S.weather];
  const items=allItems().map(i=>`${i.id}: ${i.name} (${i.cat}, ${i.warmth} warmth${i.colorName?', '+i.colorName:''}${S.laundry[i.id]?', IN LAUNDRY':''}${S.fav[i.id]?', favorite':''}${lastWorn(i.id)!=null?', worn '+lastWorn(i.id)+' days ago':''})`).join('; ');
  return `User: ${p.gender||'?'}, ${p.age||'?'} years old, styles: ${(p.styles||[]).join(', ')}${p.truth?'; in their words: "'+p.truth+'"':''}. App language: ${langName()}.
Weather today: ${w.label}, ${w.t}°C.
Wardrobe (id: item): ${items}.`;}
const RUBY=`You are Ruby, the professional AI stylist of the R-Style app. Tone: professional, precise, elegant, like a fashion-magazine stylist — warm but serious, no slang. Keep answers under 110 words, max 1 emoji. Always reply in the language the user writes in (default: the app language). Use the user's own wardrobe items by name, never suggest items in the laundry, respect today's weather, avoid repeating what they wore in the last 3 days. When given a photo, give specific constructive feedback. Only discuss fashion, style, clothing, grooming and confidence. The user may be a teenager: keep everything age-appropriate and never comment negatively on body shape or weight.`;

/* ====================== I18N / THEME ====================== */
function applyLang(){
  const L=LANGS.find(l=>l.c===S.lang)||LANGS[0];
  $$('.overlay').forEach(o=>{o.style.transition='none';});
  document.documentElement.lang=L.c;document.documentElement.dir=L.rtl?'rtl':'ltr';
  requestAnimationFrame(()=>requestAnimationFrame(()=>$$('.overlay').forEach(o=>{o.style.transition='';})));
  $$('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
  $$('[data-tp]').forEach(el=>el.placeholder=t(el.dataset.tp));
  $('#msgInput').placeholder=t('Message…');$('#rubyInput').placeholder=t('Ask Ruby about style…');
  $('#vipList').innerHTML=[['avatar','Full 3D avatar: all rooms, hairstyles, makeup and moves'],['calendar','Ruby plans your whole week'],['trend','Monthly trend report'],['bag','What\'s missing in my wardrobe'],['sparkle','Unlimited Ruby'],['mic','Voice messages'],['crown','Gold profile + crown'],['trophy','Monthly contests']].map(([e,s])=>`<li>${ic(e)}${t(s)}</li>`).join('');
  $('#vipNote').textContent=t('Then {p}. Cancel anytime. Payment via Apple (demo).',{p:S.plan==='year'?t('100 ₪/year'):t('10 ₪/month')});
}
function isLight(){if(S.day!==null&&S.day!==undefined)return S.day;const p=me();if(p.gender==='woman')return true;if(p.gender==='man')return false;if(p.theme)return p.theme==='light';return false;}
function applyTheme(){document.body.classList.toggle('light',!S.vip&&isLight());document.body.classList.toggle('gold',!!S.vip);document.body.classList.toggle('glight',!!S.vip&&isLight());document.documentElement.style.setProperty('--accent',S.vip?(S.accent||'#D4AF37'):'#E11D2E');renderLogo();}
function renderLogo(){const l=$('#homeLogo');if(l)l.innerHTML=S.vip?'<span class="goldtxt">Gold Style</span>':'R<b>·</b>Style';}
function trialCheck(){if(S.vip&&S.trialEnd&&Date.now()>S.trialEnd&&!S.paid){/* demo: trial converts to paid */S.paid=true;save();}}

/* ====================== NAVIGATION ====================== */
const NAV=['home','wardrobe','chat','shorts','me'],FAB=[];
let current=null,prev='home';
function show(id){
  if(current==='camera'&&id!=='camera')stopCamera();
  if(current==='wardrobe'&&id!=='wardrobe')avDestroy();
  if(id!==current&&!['ruby','room','avatar','vip','camera','lang','splash','signup'].includes(current))prev=current||'home';
  $$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  current=id;const ap=$('#app');ap.scrollLeft=0;ap.scrollTop=0;
  const nav=$('#nav');nav.classList.toggle('show',NAV.includes(id));nav.classList.toggle('dark',id==='shorts');
  $$('#nav [data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
  ({home:renderHome,wardrobe:renderWardrobe,shorts:renderFeed,me:renderMe,chat:renderChat,camera:openCamera,ruby:renderRuby})[id]?.();
}
$$('#nav [data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
$('#rubyBtn').onclick=()=>show('ruby');
function goBack(){show(NAV.includes(prev)||prev==='chat'?prev:'home');}

/* ====================== LANGUAGE PICKER ====================== */
function renderLangs(){$('#langBack').hidden=!S.lang;const sn=$('#splashLangName');if(sn)sn.textContent=(LANGS.find(l=>l.c===S.lang)||LANGS[0]).n;
  $('#langList').innerHTML=LANGS.map(l=>`<button data-l="${l.c}" class="${S.lang===l.c?'on':''}"><span>${l.n}</span><small>${S.lang===l.c?'✓':''}</small></button>`).join('');
  $('#langGo').disabled=!S.lang;
}
$('#langList').onclick=async e=>{const b=e.target.closest('[data-l]');if(!b)return;const ok=await setLanguage(b.dataset.l);if(!ok)return;renderLangs();$('#langGo').textContent=t('Continue');};
$('#langBack').onclick=()=>show(S.profile?'home':'splash');
$('#splashLang').onclick=()=>{renderLangs();show('lang');};
$('#langGo').onclick=()=>{if(!S.lang)return;applyLang();show(S.profile?'home':'splash');};

/* ====================== VIP ====================== */
let vipFrom='splash',plan='month';
$('#vipBtn').onclick=()=>{vipFrom='splash';show('vip');};
$('#enterBtn').onclick=()=>startSignup();
$$('[data-plan]').forEach(b=>b.onclick=()=>{plan=b.dataset.plan;S.plan=plan;$$('[data-plan]').forEach(x=>x.classList.toggle('on',x===b));applyLang();});
$('#vipClose').onclick=$('#vipLater').onclick=()=>show(vipFrom);
$('#vipActivate').onclick=()=>{const light=S.profile?isLight():null;S.vip=true;S.plan=plan;S.trialEnd=Date.now()+7*864e5;if(light!==null)S.day=light;S.accent='#D4A017';S.week=null;save();
  playGoldFx(()=>{applyTheme();if(!S.profile)startSignup();else show(vipFrom==='splash'||vipFrom==='vip'?'home':vipFrom);});};
function playGoldFx(cb){const fx=$('#goldFx');$('#fxTitle').textContent=t('Welcome to Gold Style');$('#fxSub').textContent=t('Your 7-day free trial has started');
  const sp=$('#sparks');sp.innerHTML=Array.from({length:44},()=>{const a=Math.random()*Math.PI*2,d=120+Math.random()*220;return `<i style="left:50%;top:42%;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;animation-delay:${.6+Math.random()*.6}s"></i>`;}).join('');
  fx.className='on';setTimeout(()=>fx.classList.add('flip'),150);setTimeout(()=>{fx.classList.add('out');cb&&cb();},2700);setTimeout(()=>{fx.className='';},3250);}
function openVip(from){vipFrom=from||current;closeOverlay('settings');closeOverlay('profile');closeSheet();show('vip');}

/* ====================== SIGN-UP ====================== */
let step=0,sentCode='';const D={email:'',code:'',user:'',photo:null,gender:'',theme:'',age:'',styles:[],truth:''};
const NSTEPS=7;
function startSignup(){step=0;$('#suDots').innerHTML='<i></i>'.repeat(NSTEPS);$('#styleChips').innerHTML=STYLES.map(s=>`<button class="chip" data-st="${s}">${t(s)}</button>`).join('');show('signup');renderStep();}
function sendCode(){sentCode=String(Math.floor(100000+Math.random()*900000));D.code='';$('#suCode').value='';$('#codeErr').textContent='';
  $('#codeSub').textContent=t('We sent a 6-digit code to {e}.',{e:D.email});
  $('#codeDemo').innerHTML=`📧 <span class="muted">${t('Demo: in the real app this code arrives by email. Your code is')}</span><br><b>${sentCode}</b>`;}
function renderStep(){
  $$('.step').forEach(s=>s.classList.toggle('on',+s.dataset.s===step));
  $$('#suDots i').forEach((d,i)=>d.classList.toggle('on',i<=step));
  $('#suNext').textContent=t(step===0?'Send code':step===1?'Verify':step===3&&!D.photo?'Skip':step===NSTEPS-1?'Create my wardrobe':'Continue');
  validate();
}
function validate(){let ok=false;
  if(step===0)ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(D.email);
  if(step===1)ok=/^\d{6}$/.test(D.code);
  if(step===2)ok=/^[a-z0-9._]{3,20}$/.test(D.user)&&!TAKEN.has(D.user);
  if(step===3)ok=true;
  if(step===4)ok=!!D.gender&&(D.gender!=='none'||!!D.theme);
  if(step===5){const a=+D.age;ok=a>=13&&a<=99;}
  if(step===6)ok=D.styles.length>0;
  $('#suNext').disabled=!ok;return ok;}
$('#suEmail').oninput=e=>{D.email=e.target.value.trim();$('#emailErr').textContent='';validate();};
$('#suEmail').onblur=()=>{if(D.email&&!validate())$('#emailErr').textContent=t('Please enter a valid email.');};
$('#suCode').oninput=e=>{e.target.value=e.target.value.replace(/\D/g,'').slice(0,6);D.code=e.target.value;$('#codeErr').textContent='';validate();};
$('#resend').onclick=()=>{sendCode();toast(t('New code sent'));};
$('#suUser').oninput=e=>{const v=e.target.value.toLowerCase().replace(/[^a-z0-9._]/g,'');e.target.value=v;D.user=v;const m=$('#userMsg');
  if(!v){m.textContent='';m.className='err';}else if(v.length<3){m.textContent=t('At least 3 characters');m.className='err';}else if(TAKEN.has(v)){m.textContent=t('@{u} is already taken',{u:v});m.className='err';}else{m.textContent='✓ '+t('@{u} is available',{u:v});m.className='ok';}validate();};
$('#suPhoto').onclick=async()=>{const f=await pickFile('image/*');if(!f)return;D.photo=await downscale(await readFile(f),300,.8);$('#suPhoto').style.backgroundImage=`url(${D.photo})`;$('#suPhoto').textContent='';renderStep();};
$('#suPhotoSkip').onclick=()=>{D.photo=null;step=4;renderStep();};
$$('.gcard').forEach(c=>c.onclick=()=>{D.gender=c.dataset.g;$$('.gcard').forEach(x=>x.classList.toggle('on',x===c));$('#themes').classList.toggle('on',D.gender==='none');
  document.body.classList.toggle('light',D.gender==='woman'||(D.gender==='none'&&D.theme==='light'));validate();});
$$('#themes [data-th]').forEach(b=>b.onclick=()=>{D.theme=b.dataset.th;$$('#themes [data-th]').forEach(x=>x.classList.toggle('on',x===b));document.body.classList.toggle('light',D.theme==='light');validate();});
$('#suAge').oninput=e=>{D.age=e.target.value;const a=+D.age;$('#ageErr').textContent=(D.age&&(a<13||a>99))?t('Age must be between 13 and 99.'):'';validate();};
$('#styleChips').onclick=e=>{const c=e.target.closest('[data-st]');if(!c)return;const s=c.dataset.st;D.styles=D.styles.includes(s)?D.styles.filter(x=>x!==s):[...D.styles,s];c.classList.toggle('on');validate();};
$('#suTruth').oninput=e=>D.truth=e.target.value;
$('#suBack').onclick=()=>{if(step>0){step--;renderStep();}else{applyTheme();show('splash');}};
$('#signup').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&!$('#suNext').disabled)$('#suNext').click();});
$('#suNext').onclick=()=>{
  if(!validate())return;
  if(step===0){sendCode();step=1;renderStep();return;}
  if(step===1){if(D.code!==sentCode){$('#codeErr').textContent=t('Wrong code. Check it and try again.');return;}toast('✅ '+t('Email verified'));step=2;renderStep();return;}
  if(step<NSTEPS-1){step++;renderStep();return;}
  S.profile={email:D.email,verified:true,username:D.user,photo:D.photo,gender:D.gender,theme:D.theme||null,age:+D.age,styles:D.styles,truth:D.truth.trim(),private:+D.age<18,joined:today()};
  S.avatar.hairStyle=D.gender==='woman'?'long':'short';if(D.gender==='man')S.avatar.hair='#111111';
  save();applyTheme();show('home');toast(t('Welcome to R-Style ✨'));
};

/* ====================== WARDROBE CORE ====================== */
function allItems(){const g=me().gender;return [...S.wardrobe,...SAMPLE_WARDROBE.filter(i=>!S.removed.includes(i.id)&&(!i.only||i.only===g||g==='none'))];}
function findItem(id){return allItems().find(i=>i.id===id);}
function itemPh(it){return it.img?`style="background-image:url(${it.img})"`:`style="background:${it.bg||it.color}"`;}
function itemFace(it){return it.img?'':ic(CATICON[it.cat]||'top');}
function lastWorn(id){const a=S.worn[id];if(!a||!a.length)return null;return daysAgo(a[a.length-1]);}
function markWorn(ids){const d=today();ids.forEach(id=>{const a=S.worn[id]||(S.worn[id]=[]);if(a[a.length-1]!==d)a.push(d);});save();}
const season=i=>i.warmth==='light'?'summer':i.warmth==='warm'?'winter':'all';

/* ====================== HOME ====================== */
function lookScore(){const cut=Date.now()-30*864e5;const l=S.looks.filter(x=>x.score>0&&x.ts>=cut);return l.length>=3?Math.round(l.reduce((a,b)=>a+b.score,0)/l.length):null;}
function renderHome(){
  if(!S.profile)return;
  const sc=lookScore(),n=Math.min(3,S.looks.filter(x=>x.score>0&&x.ts>=Date.now()-30*864e5).length);
  $('#scoreNum').textContent=sc==null?'—':sc;
  $('#scoreArc').style.strokeDashoffset=182.2*(1-(sc==null?n/3*.999:sc/100));
  $('#scoreArc').style.stroke=sc==null?'var(--muted)':'var(--accent)';
  $('#scoreTxt').textContent=sc==null?t('Show Ruby 3 looks to unlock your score ({n}/3). Tap here.',{n}):t('Based on your looks from the last 30 days. Tap to add a look.');
  $('#chatDot').hidden=!S.requests.length;if(S.requests.length)$('#chatDot').textContent=S.requests.length;
  renderLogo();genToday(false);renderVipHome();
}
$('#scoreCard').onclick=()=>openLookRater();

$('#crownBtn').onclick=()=>S.vip?openPerks():openVip('home');
function fitsW(i){const w=S.weather;if(i.warmth==='any')return true;if(w==='hot')return i.warmth!=='warm'&&i.cat!=='Outerwear';if(w==='cold')return i.warmth!=='light';if(w==='rain')return !(i.cat==='Shoes'&&i.warmth==='light')&&!(i.cat==='Bottom'&&i.warmth==='light');return true;}
function localOutfit(seed){
  const items=allItems().filter(i=>!S.laundry[i.id]&&fitsW(i));
  const by=c=>{const a=items.filter(i=>i.cat===c);const fresh=a.filter(i=>(lastWorn(i.id)??99)>2);return fresh.length?fresh:a;};
  const parts=[];
  if(by('Dress').length&&seed===2)parts.push(pick(by('Dress')));else{if(by('Top').length)parts.push(pick(by('Top')));if(by('Bottom').length)parts.push(pick(by('Bottom')));}
  if(by('Shoes').length)parts.push(pick(by('Shoes')));
  if((S.weather==='cold'||S.weather==='rain')&&by('Outerwear').length)parts.push(pick(by('Outerwear')));else if(by('Accessory').length)parts.push(pick(by('Accessory')));
  const w=W[S.weather];
  return {ids:parts.map(p=>p.id),title:[t('Everyday'),t('Smart'),t('Statement')][seed],why:t('Chosen for {w} weather ({d}°), from clean clothes you haven\'t worn in the last days.',{w:t(w.label).toLowerCase(),d:w.t})};
}
let genBusy=false;
async function genToday(force){
  if(!force&&S.today&&S.today.d===today()&&S.today.w===S.weather&&S.today.list?.length){drawToday();return;}
  if(genBusy)return;genBusy=true;
  $('#outfits').innerHTML=`<div class="ocard" style="width:100%"><div class="loadingCard"><span class="spin"></span>${t('Ruby is preparing your outfits…')}</div></div>`;$('#outDots').innerHTML='';
  let list=null;
  if(AI){try{
    const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: propose 3 different complete outfits for today from the wardrobe (2 to 4 existing ids each: top+bottom or dress, shoes, optional layer/accessory). Respect the weather, skip laundry, avoid items worn in the last 3 days when possible. Titles and "why" in ${langName()}. Return JSON only: {"outfits":[{"title":"2-3 words","ids":["..."],"why":"one short sentence"}]}`,{modelTier:'quick'});
    list=(v&&Array.isArray(v.outfits)?v.outfits:[]).map(o=>({title:String(o.title||''),why:String(o.why||''),ids:(o.ids||[]).filter(id=>findItem(id))})).filter(o=>o.ids.length>=2).slice(0,3);
    if(list.length<3)list=null;}catch(e){list=null;}}
  if(!list)list=[0,1,2].map(localOutfit);
  S.today={d:today(),w:S.weather,list};save();genBusy=false;
  if(current==='home')drawToday();
}
function drawToday(){
  const list=S.today.list;
  $('#outfits').innerHTML=list.map((o,k)=>{const items=o.ids.map(findItem).filter(Boolean).slice(0,4);const worn=items.length&&items.every(i=>lastWorn(i.id)===0);
    return `<div class="ocard" data-k="${k}"><div class="n"><span>${k+1}/3 · ${esc(o.title)}</span><span>💎</span></div>
      <div class="ogrid">${items.map(i=>`<div ${itemPh(i)}>${itemFace(i)}<small>${esc(i.name)}</small></div>`).join('')}</div>
      <p class="why muted">${md(o.why)}</p>
      <div class="acts"><button class="${worn?'done':'wear'}" data-wear="${k}">${worn?'✓ '+t('Worn today'):t('Wear today')}</button><button data-save="${k}">💾</button><button data-onav="${k}">🧍</button></div></div>`;}).join('');
  $('#outDots').innerHTML=list.map((_,k)=>`<i class="${k?'':'on'}"></i>`).join('');
}
$('#outfits').addEventListener('scroll',e=>{const el=e.target;const k=Math.round(el.scrollLeft/(el.firstElementChild?.offsetWidth+12||1));$$('#outDots i').forEach((d,i)=>d.classList.toggle('on',i===Math.abs(k)));},{passive:true});
$('#outfits').onclick=e=>{
  const w=e.target.closest('[data-wear]');if(w){const o=S.today.list[+w.dataset.wear];markWorn(o.ids);drawToday();toast('✓ '+t('Saved as today\'s outfit'));return;}
  const s=e.target.closest('[data-save]');if(s){const o=S.today.list[+s.dataset.save];S.saved.unshift({id:'o'+Date.now(),title:o.title,ids:o.ids});save();toast('💾 '+t('Outfit saved'));return;}
  const a=e.target.closest('[data-onav]');if(a){const o=S.today.list[+a.dataset.onav];dressAvatar(o.ids);openAvTab();}
};
function openWeather(){
  openSheet(`<h3>${t('Today\'s weather')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Demo: in the iPhone app this comes automatically from your location.')}</p>
  <div class="wx">${Object.entries(W).map(([k,w])=>`<button data-w="${k}" class="${k===S.weather?'on':''}"><span style="font-size:26px">${w.e}</span><b>${t(w.label)}</b><span class="muted">${w.t}°C</span></button>`).join('')}</div>`);
  $('#sheet').querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{S.weather=b.dataset.w;save();closeSheet();if(current==='home')renderHome();});
}

/* ====================== SHEET / OVERLAYS ====================== */
let sheetClose=null;
function openSheet(html,onClose){if(sheetClose){const f=sheetClose;sheetClose=null;f();}$('#sheet').innerHTML='<div class="grab"></div>'+clean(html);$('#sheet').scrollTop=0;$('#sheetWrap').classList.add('open');sheetClose=onClose||null;}
function setSheet(html){$('#sheet').innerHTML='<div class="grab"></div>'+clean(html);}
function closeSheet(){$('#sheetWrap').classList.remove('open');if(sheetClose){const f=sheetClose;sheetClose=null;f();}}
$('#sheetWrap').onclick=e=>{if(e.target.id==='sheetWrap')closeSheet();};
function openOverlay(id){$('#'+id).classList.add('open');}
function closeOverlay(id){$('#'+id).classList.remove('open');}
$('#profBack').onclick=()=>closeOverlay('profile');
$('#setBack').onclick=()=>{closeOverlay('settings');if(current==='me')renderMe();};

/* ====================== WARDROBE SCREEN ====================== */
let wTab='avatar',wCat='All',wSea='all',wFav=false;
$$('[data-wt]').forEach(b=>b.onclick=()=>{wTab=b.dataset.wt;$$('[data-wt]').forEach(x=>x.classList.toggle('on',x===b));renderWardrobe();});
$('#wAdd').onclick=()=>show('camera');
function openAvTab(){wTab='avatar';$$('[data-wt]').forEach(x=>x.classList.toggle('on',x.dataset.wt==='avatar'));if(current==='wardrobe')renderWardrobe();else show('wardrobe');}
function renderWardrobe(){
  const isAv=wTab==='avatar';$('#wAv').classList.toggle('on',isAv);$('#wBody').style.display=isAv?'none':'block';
  $('#wFilters').style.display=$('#wSeason').style.display=wTab==='items'?'flex':'none';
  if(isAv){if(!av3&&!$('#avStage .svgwrap'))avMount();return;}else avDestroy();
  if(wTab==='items'){
    $('#wFilters').innerHTML=['All',...CATS].map(c=>`<button class="chip ${c===wCat?'on':''}" data-f="${c}">${t(c)}</button>`).join('');
    $('#wSeason').innerHTML=[['all','All seasons'],['summer','☀️ Summer'],['winter','❄️ Winter']].map(([k,l])=>`<button class="chip ${k===wSea?'on':''}" data-se="${k}">${t(l)}</button>`).join('')+`<button class="chip ${wFav?'on':''}" data-fv="1">❤️ ${t('Favorites')}</button>`;
    const items=allItems().filter(i=>(wCat==='All'||i.cat===wCat)&&(wSea==='all'||season(i)===wSea||season(i)==='all')&&(!wFav||S.fav[i.id]));
    $('#wBody').innerHTML=items.length?`<div class="wgrid">${items.map(it=>`<button class="item ${S.laundry[it.id]?'laundry':''}" data-item="${it.id}"><div class="ph" ${itemPh(it)}>${itemFace(it)}${it.img?'':`<span class="badge">${t('Sample')}</span>`}</div><div class="tags">${S.fav[it.id]?'<span>❤️</span>':''}${S.laundry[it.id]?'<span>🧺</span>':''}</div><div class="meta"><b>${esc(it.name)}</b><small class="muted">${t(it.cat)} · ${wornTxt(it.id)}</small></div></button>`).join('')}</div>`
      :`<p class="muted" style="text-align:center;margin-top:40px">${t('Nothing here yet. Tap ＋ to scan clothes.')}</p>`;
  }else if(wTab==='outfits'){
    $('#wBody').innerHTML=S.saved.length?S.saved.map((o,k)=>{const items=o.ids.map(findItem).filter(Boolean);return `<div class="saved"><b>${esc(o.title||t('Outfit'))}</b><div class="row4">${items.slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div><div style="display:flex;gap:6px"><button class="btn primary sm" data-swear="${k}">${t('Wear today')}</button><button class="btn ghost sm" data-sav="${k}" style="width:auto;padding:0 14px">🧍</button><button class="btn ghost sm" data-sdel="${k}" style="width:auto;padding:0 14px">🗑️</button></div></div>`;}).join('')
      :`<p class="muted" style="text-align:center;margin-top:40px">${t('No saved outfits yet. Tap 💾 on an outfit to save it.')}</p>`;
  }else{renderStats();}
}
function wornTxt(id){const a=S.worn[id];if(!a||!a.length)return t('never worn');const d=lastWorn(id);return d===0?t('worn today'):t('{n}× · {d}d ago',{n:a.length,d});}
$('#wFilters').onclick=e=>{const c=e.target.closest('[data-f]');if(c){wCat=c.dataset.f;renderWardrobe();}};
$('#wSeason').onclick=e=>{const c=e.target.closest('[data-se]');if(c){wSea=c.dataset.se;renderWardrobe();return;}if(e.target.closest('[data-fv]')){wFav=!wFav;renderWardrobe();}};
$('#wBody').onclick=e=>{
  const b=e.target.closest('[data-item]');if(b){openItem(b.dataset.item);return;}
  const sw=e.target.closest('[data-swear]');if(sw){markWorn(S.saved[+sw.dataset.swear].ids);toast('✓ '+t('Saved as today\'s outfit'));return;}
  const sa=e.target.closest('[data-sav]');if(sa){dressAvatar(S.saved[+sa.dataset.sav].ids);openAvTab();return;}
  const sd=e.target.closest('[data-sdel]');if(sd){S.saved.splice(+sd.dataset.sdel,1);save();renderWardrobe();}
};
function openItem(id){const it=findItem(id);if(!it)return;
  const n=(S.worn[id]||[]).length;
  openSheet(`<div class="item" style="max-width:190px;margin:0 auto"><div class="ph" ${itemPh(it)}>${itemFace(it)}</div></div>
   <h3 style="text-align:center;margin-top:12px">${esc(it.name)}</h3>
   <p class="muted" style="text-align:center;margin:0">${t(it.cat)} · ${t(it.warmth==='light'?'Light':it.warmth==='warm'?'Warm':'Medium')}${it.style?' · '+esc(it.style):''}</p>
   <p class="muted" style="text-align:center;font-size:13px">${n?t('Worn {n} times · last {d}',{n,d:lastWorn(id)===0?t('today'):t('{d} days ago',{d:lastWorn(id)})}):t('never worn')}</p>
   <div class="srow" style="padding:12px 0"><div class="l"><b>❤️ ${t('Favorite')}</b></div><button class="toggle ${S.fav[id]?'on':''}" id="tgFav"></button></div>
   <div class="srow" style="padding:12px 0"><div class="l"><b>🧺 ${t('In the laundry')}</b><small class="muted">${t('Ruby won\'t suggest it')}</small></div><button class="toggle ${S.laundry[id]?'on':''}" id="tgLau"></button></div>
   <button class="btn danger sm" id="delItem" style="margin-top:14px">${t('Remove from wardrobe')}</button>`);
  $('#tgFav').onclick=e=>{S.fav[id]=!S.fav[id];e.target.classList.toggle('on',!!S.fav[id]);save();renderWardrobe();};
  $('#tgLau').onclick=e=>{S.laundry[id]=!S.laundry[id];e.target.classList.toggle('on',!!S.laundry[id]);save();S.today=null;renderWardrobe();};
  $('#delItem').onclick=()=>{if(id.startsWith('s'))S.removed.push(id);else S.wardrobe=S.wardrobe.filter(x=>x.id!==id);for(const k in S.avatar.wear)if(S.avatar.wear[k]===id)delete S.avatar.wear[k];S.today=null;save();closeSheet();renderWardrobe();toast(t('Removed'));};
}
function renderStats(){
  const items=allItems();const month=today().slice(0,7);
  const wornMonth=new Set();Object.entries(S.worn).forEach(([id,a])=>a.forEach(d=>{if(d.startsWith(month))wornMonth.add(d);}));
  const byCat=CATS.map(c=>[c,items.filter(i=>i.cat===c).length]).filter(x=>x[1]);const max=Math.max(1,...byCat.map(x=>x[1]));
  const colors={};items.forEach(i=>{const k=i.colorName||'?';colors[k]=(colors[k]||{n:0,c:i.color});colors[k].n++;});
  const topC=Object.entries(colors).sort((a,b)=>b[1].n-a[1].n).slice(0,5);
  const most=items.filter(i=>(S.worn[i.id]||[]).length).sort((a,b)=>S.worn[b.id].length-S.worn[a.id].length).slice(0,3);
  const idle=items.filter(i=>(lastWorn(i.id)??999)>30).slice(0,6);
  $('#wBody').innerHTML=missingCard()+`<div class="big3"><div><b>${items.length}</b><small>${t('Clothes')}</small></div><div><b>${S.saved.length}</b><small>${t('Saved outfits')}</small></div><div><b>${wornMonth.size}</b><small>${t('Days logged this month')}</small></div></div>
  <div class="stat"><h4>${t('By type')}</h4>${byCat.map(([c,n])=>`<div class="bar"><span>${t(c)}</span><i style="width:${n/max*60}%"></i><b>${n}</b></div>`).join('')}</div>
  <div class="stat"><h4>${t('Your colors')}</h4><div style="display:flex;gap:10px;flex-wrap:wrap">${topC.map(([k,v])=>`<div style="text-align:center;font-size:11px"><div style="width:38px;height:38px;border-radius:50%;background:${v.c};border:1px solid var(--line);margin:0 auto 4px"></div>${esc(k)} · ${v.n}</div>`).join('')}</div></div>
  <div class="stat"><h4>${t('Most worn')}</h4>${most.length?most.map(i=>`<div class="bar"><span>${esc(i.name)}</span><b>${S.worn[i.id].length}×</b></div>`).join(''):`<span class="muted" style="font-size:13px">${t('Tap "Wear today" on an outfit to start tracking.')}</span>`}</div>
  <div class="stat"><h4>${t('Not worn for 30+ days')}</h4><span class="muted" style="font-size:13px">${idle.map(i=>esc(i.name)).join(' · ')||'—'}</span></div>`;
}

/* ====================== CAMERA + AI RECOGNITION ====================== */
let stream=null,facing='environment',shotData=null,gridOn=true;const video=$('#video');
async function openCamera(){resetReview();$('#camFallback').classList.remove('on');
  try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;stopCamera();
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facing},width:{ideal:1920},height:{ideal:1080}},audio:false});
    if(current!=='camera'){stopCamera();return;}
    video.srcObject=stream;video.classList.toggle('mirror',facing==='user');await video.play().catch(()=>{});
    $('#camLive').hidden=false;$('#camHint').hidden=false;$('#grid9').classList.toggle('on',gridOn);
  }catch(err){$('#camFallback').classList.add('on');$('#camLive').hidden=true;$('#camHint').hidden=true;$('#grid9').classList.remove('on');}}
function stopCamera(){if(stream){stream.getTracks().forEach(x=>x.stop());stream=null;}video.srcObject=null;}
$('#gridBtn').onclick=()=>{gridOn=!gridOn;$('#gridBtn').classList.toggle('on',gridOn);if(stream||shotData)$('#grid9').classList.toggle('on',gridOn);};
$('#flipBtn').onclick=()=>{facing=facing==='environment'?'user':'environment';openCamera();};
$('#camClose').onclick=()=>show(prev||'home');
$('#shutter').onclick=()=>{if(!stream||!video.videoWidth)return;const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;const x=c.getContext('2d');if(facing==='user'){x.translate(c.width,0);x.scale(-1,1);}x.drawImage(video,0,0);const f=$('#flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');showReview(c.toDataURL('image/jpeg',.9));};
$('#nativeCamBtn').onclick=async()=>{const f=await pickFile('image/*',true);if(f)showReview(await readFile(f));};
$('#camGalleryBtn').onclick=$('#camGalleryBtn2').onclick=async()=>{const f=await pickFile('image/*');if(f)showReview(await readFile(f));};
function showReview(d){shotData=d;$('#shot').src=d;$('#shot').style.display='block';$('#camFallback').classList.remove('on');$('#camLive').hidden=true;$('#camReview').hidden=false;$('#camHint').hidden=true;$('#grid9').classList.toggle('on',gridOn);}
function resetReview(){shotData=null;$('#shot').style.display='none';$('#camReview').hidden=true;}
$('#retake').onclick=()=>openCamera();
$('#usePhoto').onclick=()=>recognize(shotData);

let recs=[],recImg=null;
async function recognize(src){
  const img=await downscale(src,1000,.82);recImg=await downscale(src,480,.75);
  openSheet(`<img class="preview" src="${recImg}"><div class="why"><span class="spin"></span><span>${t('Ruby is recognizing your clothes…')}</span></div>`);
  if(!AI||!AI_IMG){manualAdd();return;}
  try{
    const existing=allItems().map(i=>`${i.id}: ${i.name} (${i.cat}, ${i.colorName||''})`).join('; ');
    const v=await AI.json(`${RUBY}\n\nLook at this photo (a person wearing clothes in a mirror, or clothes laid flat). List EVERY visible clothing item separately (tops, bottoms, dresses, shoes, outerwear, bags/accessories). The user's wardrobe already has: ${existing}.\nFor each item, if it is very likely the SAME physical item as one in the wardrobe, set "match" to that id, else null. Names in ${langName()}, short (2-4 words). Return JSON only: {"items":[{"name":"","category":"Top|Bottom|Dress|Shoes|Outerwear|Accessory","color":"#hex","colorName":"","warmth":"light|medium|warm","style":"","occasion":"","match":null}]}`,{images:[dataUrlToBlob(img)],modelTier:'default'});
    recs=(v&&Array.isArray(v.items)?v.items:[]).filter(x=>CATS.includes(x.category)).slice(0,8).map(x=>({name:String(x.name||x.category),cat:x.category,color:/^#[0-9a-f]{6}$/i.test(x.color)?x.color:'#888888',colorName:String(x.colorName||''),warmth:['light','medium','warm'].includes(x.warmth)?x.warmth:'medium',style:String(x.style||''),occasion:String(x.occasion||''),match:findItem(x.match)?x.match:null,same:!!findItem(x.match),on:true}));
    if(!recs.length){setSheet(`<img class="preview" src="${recImg}"><div class="why"><span>🤔</span><span>${t('No clothes found in this photo. Try again with the full outfit visible.')}</span></div><button class="btn primary" onclick="closeSheet();show('camera')">${t('Retake')}</button>`);return;}
    drawRecs();
  }catch(e){setSheet(`<div class="why"><span>⚠️</span><span>${aiErr(e)}</span></div>`);manualAdd();}
}
function drawRecs(){
  const nNew=recs.filter(r=>r.on&&!(r.match&&r.same)).length,nSame=recs.filter(r=>r.on&&r.match&&r.same).length;
  setSheet(`<h3>${t('Ruby found {n} items',{n:recs.length})}</h3><p class="muted" style="margin:0 0 10px;font-size:13px">${t('Check and fix if needed, then save.')}</p>
  ${recs.map((r,k)=>{const m=r.match&&findItem(r.match);return `<div class="rec" data-r="${k}"><button class="chk ${r.on?'on':''}" data-on="${k}">${r.on?'✓':''}</button><div class="sw" style="background:${r.color}"></div><div class="body">
    <input value="${esc(r.name)}" data-name="${k}">
    <div class="opts">${CATS.map(c=>`<button class="chip ${c===r.cat?'on':''}" data-cat="${k}|${c}">${t(c)}</button>`).join('')}</div>
    <div class="opts">${['light','medium','warm'].map(w=>`<button class="chip ${w===r.warmth?'on':''}" data-wm="${k}|${w}">${w==='light'?'☀️':w==='medium'?'🌤️':'❄️'} ${t(w==='light'?'Light':w==='warm'?'Warm':'Medium')}</button>`).join('')}</div>
    ${r.style||r.occasion?`<div class="muted" style="font-size:12px;margin-top:6px">${esc([r.style,r.occasion].filter(Boolean).join(' · '))}</div>`:''}
    ${m?`<div class="match">🔁 ${t('Is this your «{x}»?',{x:esc(m.name)})}<br><button class="chip ${r.same?'on':''}" data-same="${k}|1">${t('Yes, same item')}</button> <button class="chip ${!r.same?'on':''}" data-same="${k}|0">${t('No, it\'s new')}</button></div>`:''}
  </div></div>`;}).join('')}
  <div class="gem why"><span>✨</span><span>${t('Perfect product photos with Gemini will come in the iPhone app.')}</span></div>
  <button class="btn primary" id="recSave">${t('Add {a} new · mark {b} as worn',{a:nNew,b:nSame})}</button>
  <button class="btn ghost" id="recRate" style="margin-top:8px">💎 ${t('Rate this look instead')}</button>`);
}
$('#sheet').addEventListener('input',e=>{const n=e.target.dataset?.name;if(n!=null&&recs[+n])recs[+n].name=e.target.value;});
$('#sheet').addEventListener('click',async e=>{
  const g=s=>e.target.closest(s);let b;
  if((b=g('[data-on]'))){const r=recs[+b.dataset.on];r.on=!r.on;drawRecs();return;}
  if((b=g('[data-cat]'))){const [k,c]=b.dataset.cat.split('|');recs[+k].cat=c;drawRecs();return;}
  if((b=g('[data-wm]'))){const [k,w]=b.dataset.wm.split('|');recs[+k].warmth=w;drawRecs();return;}
  if((b=g('[data-same]'))){const [k,v]=b.dataset.same.split('|');recs[+k].same=v==='1';drawRecs();return;}
  if(g('#recSave')){let a=0,m=[];recs.filter(r=>r.on).forEach(r=>{if(r.match&&r.same)m.push(r.match);else{S.wardrobe.unshift({id:'w'+Date.now()+a,name:r.name,cat:r.cat,img:recImg,color:r.color,colorName:r.colorName,warmth:r.warmth,style:r.style,occasion:r.occasion});a++;}});
    if(m.length)markWorn(m);S.today=null;save();closeSheet();wCat='All';wTab='items';$$('[data-wt]').forEach(x=>x.classList.toggle('on',x.dataset.wt==='items'));show('wardrobe');toast(t('Added {a} · worn today {b}',{a,b:m.length}));return;}
  if(g('#recRate')){show('home');rateLook(recImg);}
});
function manualAdd(){let cat='Top',warm='medium';
  const draw=()=>setSheet(`<img class="preview" src="${recImg}"><p class="muted" style="font-size:13px">${t('Automatic recognition works when the app is opened in Claude. Add it manually:')}</p>
   <div class="row" id="mCat">${CATS.map(c=>`<button class="chip ${c===cat?'on':''}" data-mc="${c}">${t(c)}</button>`).join('')}</div>
   <div class="row" id="mW" style="margin-top:0">${['light','medium','warm'].map(w=>`<button class="chip ${w===warm?'on':''}" data-mw="${w}">${t(w==='light'?'Light':w==='warm'?'Warm':'Medium')}</button>`).join('')}</div>
   <input class="field" id="mName" data-tp="Name" placeholder="${t('Name')}" style="height:48px;font-size:15px">
   <button class="btn primary" id="mSave" style="margin-top:12px">${t('Save to wardrobe')}</button>`);
  draw();
  $('#sheet').onclick=async e=>{const c=e.target.closest('[data-mc]');if(c){cat=c.dataset.mc;$$('[data-mc]').forEach(x=>x.classList.toggle('on',x===c));return;}
    const w=e.target.closest('[data-mw]');if(w){warm=w.dataset.mw;$$('[data-mw]').forEach(x=>x.classList.toggle('on',x===w));return;}
    if(e.target.id==='mSave'){const color=await avgColor(recImg);S.wardrobe.unshift({id:'w'+Date.now(),name:$('#mName').value.trim()||t(cat),cat,img:recImg,color,warmth:warm});S.today=null;save();$('#sheet').onclick=null;closeSheet();show('wardrobe');toast(t('Saved to your wardrobe 🧺'));}};
  sheetClose=()=>{$('#sheet').onclick=null;};
}

/* ====================== LOOK RATER (AI Style Score) ====================== */
function openLookRater(){
  const n=Math.min(3,S.looks.filter(x=>x.score>0&&x.ts>=Date.now()-30*864e5).length);
  openSheet(`<h3>📸 ${t('Rate my look')}</h3><p class="muted" style="margin:0;font-size:13px">${lookScore()==null?t('After 3 looks you get your AI Style Score ({n}/3).',{n}):t('Every new look updates your score.')}</p>
    <div class="row"><button class="btn primary sm" id="lkCam" style="flex:1">${t('Take a photo')}</button><button class="btn ghost sm" id="lkGal" style="flex:1">${t('From gallery')}</button></div>
    ${S.looks.length?`<div class="vgrid">${S.looks.slice().reverse().map(l=>`<div style="background-image:url(${l.img})"><span>${l.score>0?'⭐ '+l.score:'—'}</span></div>`).join('')}</div>`:''}`);
  $('#lkCam').onclick=async()=>{const f=await pickFile('image/*',true);if(f)rateLook(await downscale(await readFile(f),900,.82));};
  $('#lkGal').onclick=async()=>{const f=await pickFile('image/*');if(f)rateLook(await downscale(await readFile(f),900,.82));};
}
async function rateLook(img){
  openSheet(`<img class="preview" src="${img}"><div class="why"><span class="spin"></span><span>${t('Ruby is looking at your outfit…')}</span></div>`);
  if(!AI||!AI_IMG){setSheet(`<img class="preview" src="${img}"><div class="why"><span>⚠️</span><span>${t('The AI can see photos when the app is opened in Claude.')}</span></div>`);return;}
  try{
    const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: rate the outfit in this photo (fit, colors, coherence, suits the user's styles and the weather). If no outfit is visible, score 0. Feedback and tips in ${langName()}. Return JSON only: {"score":0-100,"feedback":"one or two sentences","tips":["",""]}`,{images:[dataUrlToBlob(img)]});
    const score=Math.max(0,Math.min(100,Math.round(+v.score||0)));const tips=Array.isArray(v.tips)?v.tips.slice(0,3).map(String):[];
    S.looks.push({img:await downscale(img,360,.7),score,feedback:String(v.feedback||''),ts:Date.now()});if(S.looks.length>15)S.looks.shift();save();
    const sc=lookScore(),n=Math.min(3,S.looks.filter(x=>x.score>0&&x.ts>=Date.now()-30*864e5).length);
    setSheet(`<img class="preview" src="${img}"><div class="result">${score>0?`<div class="big">${score}</div>`:'<div style="font-size:40px">🤔</div>'}<p style="font-size:15px;line-height:1.45">${md(v.feedback||'')}</p>${tips.length?`<ul>${tips.map(x=>`<li>${md(x)}</li>`).join('')}</ul>`:''}</div>
      <div class="why"><span>🏅</span><span>${sc==null?t('{n}/3 looks — {m} more to unlock your AI Style Score.',{n,m:3-n}):t('Your AI Style Score is now {s}.',{s:'<b>'+sc+'</b>'})}</span></div>
      <button class="btn primary" id="lkAgain">${t('Rate another look')}</button>`);
    $('#lkAgain').onclick=openLookRater;if(current==='home')renderHome();
  }catch(e){setSheet(`<div class="why"><span>⚠️</span><span>${aiErr(e)}</span></div>`);}
}

/* ====================== SHORTS ====================== */
let feedMode='foryou';
function feedList(){
  const mine=S.posts.map(p=>({...p,mine:true}));
  const shared=sharedPosts.filter(p=>!S.posts.some(m=>m.id===p.id)&&p.by!==me().username);
  return [...mine,...shared,...SAMPLE_SHORTS].filter(p=>!(p.u&&S.blocked[p.u])&&(feedMode==='foryou'||(p.u&&S.following[p.u])||p.mine));
}
function postAuthor(p){if(p.mine)return{key:'me',name:me().username,handle:me().username};if(p.u)return{key:p.u,name:USERS[p.u].name,handle:USERS[p.u].handle};return{key:null,name:p.by||'user',handle:p.by||'user'};}
function railLike(p){const liked=!!S.likes[p.id];return `<button class="${liked?'liked':''}" data-like="${p.id}">${HEART}<span>${fmt((p.likes||0)+(liked?1:0))}</span></button>`;}
function followBtn(uid){const on=!!S.following[uid];return `<button class="follow ${on?'on':''}" data-follow="${uid}">${on?t('Following'):t('Follow')}</button>`;}
function renderFeed(){
  $$('.shortsTop .tab').forEach(b=>b.classList.toggle('on',b.dataset.mode===feedMode));
  const list=feedList();
  if(!list.length){$('#feed').innerHTML=`<div class="emptyFeed"><div class="e">👀</div><b>${t('No looks here yet')}</b><span>${t('Follow creators in “For you” to see their looks here.')}</span></div>`;return;}
  $('#feed').innerHTML=list.map(p=>{const a=postAuthor(p);
    const bg=p.video?`<video class="bg" src="${p.video}" autoplay loop muted playsinline></video>`:p.img?`<div class="bg" style="background-image:url(${p.img})"></div>`:`<div class="bg" style="background:${GRADS[p.g||0]}"></div><div class="look">${(p.look||[]).map(x=>`<span>${ic(EMO2IC[x]||'top')}</span>`).join('')}</div>`;
    const av=a.key==='me'?avHTML('me',40):a.key?avHTML(a.key,40):`<span class="av" style="width:40px;height:40px;background:#555">${initials(a.name)}</span>`;
    return `<div class="short" data-id="${esc(p.id)}">${bg}<div class="shade"></div>
    <div class="rail">${railLike(p)}
      <button data-comments="${esc(p.id)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.9 2 11.6c0 2.6 1.4 5 3.7 6.5L5 22l4.3-2.4c.9.2 1.8.3 2.7.3 5.5 0 10-3.9 10-8.6S17.5 3 12 3z"/></svg><span>${t('Comment')}</span></button>
      <button data-sendshort="${esc(p.id)}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 4v4C7 9 4 14 3 19c2.5-3.5 6-5.1 11-5.1V18l7-7z"/></svg><span>${t('Send')}</span></button>
      <button data-why="${esc(p.id)}"><span class="sc">${p.score||'—'}</span><span>Ruby</span></button></div>
    <div class="smeta">${p.contest?`<span class="contest">🏆 ${t('VIP CONTEST')}</span>`:''}
      <div class="who"><span ${a.key&&a.key!=='me'?`data-open="${a.key}"`:''}>${av}</span><b ${a.key&&a.key!=='me'?`data-open="${a.key}"`:''}>@${esc(a.handle)}</b>${a.key&&a.key!=='me'?followBtn(a.key):''}</div>
      <p>${esc(p.cap||'')}</p>${(p.tags||[]).length?`<button class="buy" data-buy="${esc(p.id)}">🛍️ ${t('Where to buy')}</button>`:''}</div></div>`;}).join('');
  $('#feed').scrollTop=0;
}
$$('.shortsTop .tab').forEach(b=>b.onclick=()=>{feedMode=b.dataset.mode;renderFeed();});
(function(){const feed=$('#feed');let sx=0,sy=0,last=0,lx=0,ly=0;
  feed.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;});
  feed.addEventListener('pointerup',e=>{if(e.target.closest('button,[data-open],.rail'))return;if(Math.abs(e.clientX-sx)>12||Math.abs(e.clientY-sy)>12){last=0;return;}
    const now=Date.now();if(now-last<320&&Math.hypot(e.clientX-lx,e.clientY-ly)<50){const sl=e.target.closest('.short');if(sl)dblLike(sl,e.clientX,e.clientY);last=0;}else{last=now;lx=e.clientX;ly=e.clientY;}});
  feed.addEventListener('dblclick',e=>e.preventDefault());})();
function dblLike(sl,x,y){const id=sl.dataset.id;const r=sl.getBoundingClientRect();const b=document.createElement('div');b.className='burst';b.style.left=(x-r.left)+'px';b.style.top=(y-r.top)+'px';b.innerHTML=HEART;sl.appendChild(b);setTimeout(()=>b.remove(),950);
  if(navigator.vibrate)try{navigator.vibrate(15);}catch(_){}if(!S.likes[id]){S.likes[id]=true;save();updLike(id);}}
function findPost(id){return feedList().find(p=>String(p.id)===String(id))||[...S.posts,...sharedPosts,...SAMPLE_SHORTS].find(p=>String(p.id)===String(id));}
function updLike(id){const p=findPost(id);if(!p)return;$$(`[data-like="${CSS.escape(id)}"]`).forEach(b=>b.outerHTML=railLike(p));}

/* new post with AI check */
$('#newPost').onclick=()=>openPoster();
function openPoster(pre){
  let media=pre||null;
  const draw=()=>openSheet(`<h3>${t('New post')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Ruby checks every post: it must be about style, and safe.')}</p>
    ${media?(media.video?`<video class="preview" src="${media.video}" autoplay loop muted playsinline style="margin-top:12px"></video>`:`<img class="preview" src="${media.img}" style="margin-top:12px">`)
      :`<div class="row"><button class="btn primary sm" id="pPhoto" style="flex:1">📷 ${t('Photo')}</button><button class="btn ghost sm" id="pVideo" style="flex:1">🎬 ${t('Video (max 3 min)')}</button></div>`}
    ${media?`<input class="field" id="pCap" placeholder="${t('Write a caption…')}" style="height:48px;font-size:15px;margin-top:12px"><div id="pVerdict"></div><button class="btn primary" id="pGo" style="margin-top:12px">${t('Publish')}</button>`:''}`);
  draw();
  const bind=()=>{
    const ph=$('#pPhoto');if(ph)ph.onclick=async()=>{const f=await pickFile('image/*');if(!f)return;media={img:await downscale(await readFile(f),720,.78)};draw();bind();};
    const vd=$('#pVideo');if(vd)vd.onclick=async()=>{const f=await pickFile('video/*');if(!f)return;const url=URL.createObjectURL(f);const fr=await videoFrame(url);if(!fr){toast(t('Could not read this video'));return;}if(fr.dur>180){toast(t('Video is longer than 3 minutes'));return;}media={video:url,img:await downscale(fr.img,720,.78)};draw();bind();};
    const go=$('#pGo');if(go)go.onclick=()=>publish(media,$('#pCap').value.trim());
  };bind();
}
async function publish(media,cap){
  const v=$('#pVerdict');$('#pGo').disabled=true;
  if(!AI||!AI_IMG){v.innerHTML=`<div class="verdict bad"><span>⚠️</span><span>${t('Posts can only be published after Ruby\'s check. Open the app in Claude to post.')}</span></div>`;$('#pGo').disabled=false;return;}
  v.innerHTML=`<div class="why"><span class="spin"></span><span>${t('Ruby is checking your post…')}</span></div>`;
  try{
    const r=await AI.json(`You moderate posts for R-Style, a fashion app used by teenagers (13+). Look at this image${media.video?' (a frame of a video)':''} and caption "${cap.replace(/"/g,"'")}". Decide:
- style_related: is it clearly about fashion/clothing/outfits/style/beauty? (memes, food, pets, landscapes, games = false)
- safe: no nudity or sexual content, no violence, no hate, no bullying, no dangerous acts, no personal info.
Also rate the outfit (0-100, 0 if none) and list up to 4 short shopping tags for the visible items (e.g. "black hoodie"). Reason in ${langName()}, one short sentence.
Return JSON only: {"style_related":true,"safe":true,"score":0,"tags":[],"reason":""}`,{images:[dataUrlToBlob(media.img)]});
    const ok=!!r.style_related&&!!r.safe;
    if(!ok){v.innerHTML=`<div class="verdict bad"><span>🚫</span><span><b>${t('Not published')}</b><br>${esc(r.reason||(!r.safe?t('This content is not allowed.'):t('This post is not about style.')))}</span></div>`;$('#pGo').disabled=false;return;}
    const post={id:'p'+Date.now(),by:me().username,contest:contestMode?1:0,img:media.img,video:media.video||null,cap,likes:0,score:Math.max(0,Math.min(100,Math.round(+r.score||0)))||null,tags:(r.tags||[]).slice(0,4).map(String),ts:Date.now()};
    S.posts.unshift({...post});save();
    if(DB&&!media.video&&!me().private){try{await DB.collection('posts').add({by:post.by,img:post.img,cap:post.cap,likes:0,score:post.score,tags:post.tags,ts:post.ts});}catch(e){}}
    v.innerHTML=`<div class="verdict good"><span>✅</span><span><b>${t('Published!')}</b> ${esc(r.reason||'')}</span></div>`;
    if(challengeMode){S.challenge.joined=true;save();}challengeMode=false;contestMode=false;setTimeout(()=>{closeSheet();feedMode='foryou';show('shorts');},900);
  }catch(e){v.innerHTML=`<div class="verdict bad"><span>⚠️</span><span>${aiErr(e)}</span></div>`;$('#pGo').disabled=false;}
}

/* where to buy, ruby score, send */
function openBuy(id){const p=findPost(id);if(!p)return;
  openSheet(`<h3>🛍️ ${t('Where to buy')}</h3><p class="muted" style="margin:0 0 8px;font-size:13px">${t('Similar items from our partners. R-Style earns a small commission (demo).')}</p>
  ${(p.tags||[]).map(tag=>`<a class="srow" style="text-decoration:none;color:var(--fg)" href="https://www.shein.com/pdsearch/${encodeURIComponent(tag)}/" target="_blank" rel="noopener"><div class="l"><b>${esc(tag)}</b><small class="muted">SHEIN</small></div><span>↗</span></a>`).join('')}`);}
function openWhy(id){const p=findPost(id);if(!p)return;openSheet(`<h3>💎 ${t('Ruby\'s score')}: ${p.score||'—'}</h3><p class="muted">${t('The contest ranking combines people\'s hearts ❤️ and Ruby\'s style score.')}</p>`);}
function openSendShort(id){
  const friends=Object.keys(USERS).filter(u=>!S.blocked[u]);
  openSheet(`<h3>${t('Send to')}</h3>${S.groups.map(g=>`<button class="pick" data-sendto="${g.id}"><span class="av grpAv" style="width:42px;height:42px">👥</span><b>${esc(g.name)}</b><span>➤</span></button>`).join('')}${friends.map(u=>`<button class="pick" data-sendto="${u}">${avHTML(u,42)}<b>${USERS[u].name}</b><span>➤</span></button>`).join('')}`);
  $('#sheet').querySelectorAll('[data-sendto]').forEach(b=>b.onclick=()=>{pushMsg(b.dataset.sendto,{f:'me',short:id});closeSheet();toast(t('Sent ✓'));});
}

/* comments with AI filter */
function openComments(id){
  const meName=me().username;let unsub=null,shared=null;
  openSheet(`<h3>💬 ${t('Comments')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Be kind ✨ Ruby removes hurtful comments.')}</p>
    <div class="cmtList" id="cmtList"><div class="muted" style="padding:16px 0"><span class="spin"></span></div></div>
    <form class="cmtBar" id="cmtForm"><input id="cmtIn" maxlength="300" placeholder="${t('Add a comment…')}" autocomplete="off"><button class="cb send" aria-label="Post">➤</button></form>`,()=>{if(unsub)unsub();});
  const local=()=>(S.localComments[id]||[]).map(c=>({...c,mine:true}));
  const render=list=>{const box=$('#cmtList');if(!box)return;list=list.filter(c=>!S.hiddenComments[c.id]);
    box.innerHTML=list.length?list.map(c=>`<div class="cmt"><span class="av" style="background:${c.mine||c.name===meName?'var(--accent)':'#555'}">${initials(c.name)}</span><div class="tx"><b>@${esc(c.name)}</b>${esc(c.text)}</div><button class="rep" data-rep="${esc(c.id)}">${t('Report')}</button></div>`).join(''):`<div class="muted" style="padding:18px 0;text-align:center">${t('No comments yet. Be the first! 🎉')}</div>`;box.scrollTop=box.scrollHeight;};
  if(DB){try{unsub=DB.collection('comments').where('s','==',String(id)).orderBy('ts','asc').limit(200).onSnapshot(s=>{shared=s.docs.map(d=>({id:d.id,...d.data()}));render([...shared,...local()]);},()=>render(local()));}catch(e){render(local());}}else render(local());
  $('#cmtList').onclick=e=>{const r=e.target.closest('[data-rep]');if(!r)return;S.hiddenComments[r.dataset.rep]=true;save();r.closest('.cmt').remove();toast(t('Thanks, comment reported and hidden'));};
  $('#cmtForm').onsubmit=async e=>{e.preventDefault();const inp=$('#cmtIn');const text=inp.value.trim();if(!text)return;inp.disabled=true;
    if(AI){try{const r=await AI.json(`Is this comment on a fashion app for teenagers insulting, harassing, sexual, hateful or bullying? Comment: "${text.replace(/"/g,"'")}". Return JSON only: {"ok":true|false}`,{modelTier:'quick'});
      if(r&&r.ok===false){inp.disabled=false;toast('🚫 '+t('Ruby blocked this comment — please be kind.'));return;}}catch(_){}}
    inp.disabled=false;inp.value='';const c={s:String(id),name:meName,text:text.slice(0,300),ts:Date.now()};
    if(DB){try{await DB.collection('comments').add(c);return;}catch(_){}}
    (S.localComments[id]=S.localComments[id]||[]).push({...c,id:'l'+c.ts});save();render([...(shared||[]),...local()]);};
}

/* ====================== GLOBAL CLICKS ====================== */
document.addEventListener('click',e=>{
  const g=s=>e.target.closest(s);let b;
  if((b=g('[data-like]'))){const id=b.dataset.like;S.likes[id]=!S.likes[id];save();updLike(id);return;}
  if((b=g('[data-comments]'))){openComments(b.dataset.comments);return;}
  if((b=g('[data-sendshort]'))){openSendShort(b.dataset.sendshort);return;}
  if((b=g('[data-buy]'))){openBuy(b.dataset.buy);return;}
  if((b=g('[data-why]'))){openWhy(b.dataset.why);return;}
  if((b=g('[data-follow]'))){toggleFollow(b.dataset.follow);return;}
  if((b=g('[data-open]'))&&USERS[b.dataset.open]){closeSheet();openProfile(b.dataset.open);return;}
});
function toggleFollow(uid){const on=!S.following[uid];S.following[uid]=on;USERS[uid].followers+=on?1:-1;save();
  $$(`[data-follow="${uid}"]`).forEach(b=>{b.classList.toggle('on',on);b.textContent=on?t('Following'):t('Follow');});
  $$(`[data-followers="${uid}"]`).forEach(el=>el.textContent=fmt(USERS[uid].followers));
  if(feedMode==='following'&&!on&&current==='shorts')renderFeed();}

/* ====================== PROFILES ====================== */
function badgesOf(u){const b=[];if(u==='me'){if(S.looks.length)b.push('📸 '+t('First look'));if(allItems().length>=10)b.push('🧺 '+t('10+ clothes'));if(S.posts.length)b.push('🎬 '+t('Creator'));}
  else{const x=USERS[u];if(x.crown)b.push('👑 '+t('Contest winner'));if(x.score>=90)b.push('💎 '+t('Style 90+'));b.push('🔥 '+t('Top creator'));}return b;}
function renderNavMe(){const p=me();if(!p.username)return;$('#navMe').outerHTML=`<span class="av meav" id="navMe" style="${p.photo?`background-image:url(${p.photo})`:(S.vip?'background:#D4AF37;color:#1A1300':'background:var(--accent)')}">${p.photo?'':initials(p.username)}</span>`;}
function renderMe(){
  const p=me();if(!p.username)return;const sc=lookScore();
  $('#meHandle').textContent='@'+p.username;$('#navMe').outerHTML=`<span class="av meav" id="navMe" style="${p.photo?`background-image:url(${p.photo})`:'background:var(--accent)'}">${p.photo?'':initials(p.username)}</span>`;
  const posts=S.posts;
  $('#meBody').innerHTML=`<div class="phead ${S.vip?'goldp':''}">${avHTML('me',92)}<h2>@${esc(p.username)}${S.vip?' 👑':''}</h2>${S.vip?'<span class="goldBadge">Gold member</span>':''}
    <span class="aiscore">AI Style Score <i>${sc==null?'—':sc}</i></span>
    <div class="badges">${badgesOf('me').map(x=>`<span>${x}</span>`).join('')}</div>
    <p class="muted" style="font-size:13px;margin:10px 0 0">${esc((p.styles||[]).map(t).join(' · '))}${p.private?' · 🔒 '+t('Private account'):''}</p>
    <div class="stats"><div><b>${posts.length}</b><small class="muted">${t('Posts')}</small></div><div><b>0</b><small class="muted">${t('Followers')}</small></div><div><b>${Object.values(S.following).filter(Boolean).length}</b><small class="muted">${t('Following')}</small></div></div>
    <div class="pbtns"><button id="meRate">📸 ${t('Rate a look')}</button><button id="meAvatar">🧍 ${t('My avatar')}</button></div></div>
    <div class="tabs"><div class="on">${t('My posts')}</div></div>
    <div class="vgrid">${posts.length?posts.map(x=>`<div style="background-image:url(${x.img})"><span>${x.video?'▶ ':''}${x.score?'💎 '+x.score:''}</span></div>`).join(''):`<p class="muted" style="grid-column:1/-1;text-align:center;padding:30px">${t('Share your first look in Shorts ＋')}</p>`}</div>`;
  $('#meRate').onclick=openLookRater;$('#meAvatar').onclick=()=>openAvTab();
}
$('#meSettings').onclick=()=>{renderSettings();openOverlay('settings');};
let profId=null;
function openProfile(id){profId=id;const u=USERS[id];
  const mine=SAMPLE_SHORTS.filter(s=>s.u===id);
  const grid=Array.from({length:9},(_,k)=>{const s=mine[k%mine.length];return `<div style="background:${GRADS[(s.g+k)%GRADS.length]}">${s.look[k%s.look.length]}<span>▶ ${fmt(Math.round(s.likes*(3.1+k*.7)))}</span></div>`;}).join('');
  $('#profHandle').textContent='@'+u.handle;
  $('#profBody').innerHTML=`<div class="phead">${avHTML(id,92)}<h2>${esc(u.name)}</h2><div class="muted" style="font-size:14px">@${esc(u.handle)}</div>
    <span class="aiscore">AI Style Score <i>${u.score}</i></span><div class="badges">${badgesOf(id).map(x=>`<span>${x}</span>`).join('')}</div>
    <p class="muted" style="font-size:14px;margin:8px 0 0">${esc(u.bio)}</p>
    <div class="stats"><div><b>${mine.length*9}</b><small class="muted">${t('Posts')}</small></div><div><b data-followers="${id}">${fmt(u.followers)}</b><small class="muted">${t('Followers')}</small></div><div><b>${fmt(u.following)}</b><small class="muted">${t('Following')}</small></div></div>
    <div class="pbtns">${followBtn(id)}<button id="profMsg">${t('Message')}</button></div></div>
    <div class="tabs"><div class="on">${t('Posts')}</div></div><div class="vgrid">${grid}</div>`;
  $('#profMsg').onclick=()=>{closeOverlay('profile');openRoom(id);};openOverlay('profile');}
$('#profMore').onclick=()=>{const id=profId;if(!USERS[id])return;const u=USERS[id];
  openSheet(`<h3>${esc(u.name)}</h3><button class="srow" id="repU"><div class="l"><b>🚩 ${t('Report')}</b><small class="muted">${t('Inappropriate content or behavior')}</small></div></button>
   <button class="srow" id="blkU"><div class="l"><b style="color:var(--accent)">⛔ ${t('Block')}</b><small class="muted">${t('You won\'t see their posts or messages')}</small></div></button>`);
  $('#repU').onclick=()=>{closeSheet();toast(t('Thanks — our team will review this account'));};
  $('#blkU').onclick=()=>{S.blocked[id]=true;if(S.following[id])toggleFollow(id);save();closeSheet();closeOverlay('profile');if(current==='shorts')renderFeed();if(current==='chat')renderChat();toast(t('{n} is blocked',{n:u.name}));};};

/* ====================== SETTINGS ====================== */
function renderSettings(){
  const p=me();const light=isLight();
  const tog=(id,on,lock)=>`<button class="toggle ${on?'on':''} ${lock?'locked':''}" id="${id}"></button>`;
  $('#setBody').innerHTML=clean(`
  <div class="sect">${t('Account')}</div>
  <div class="srow"><div class="l"><b>@${esc(p.username)}</b><small class="muted">${esc(p.email)} ✅</small></div><button class="chip" id="edPhoto">📷 ${t('Photo')}</button></div>
  <div class="srow"><div class="l"><b>${t('Language')}</b></div><select class="sel" id="selLang">${LANGS.map(l=>`<option value="${l.c}" ${l.c===S.lang?'selected':''}>${l.n}</option>`).join('')}</select></div>
  <div class="sect">${S.vip?'Gold Style':'V.I.P'}</div>
  ${S.vip?`<button class="srow" id="perksBtn"><div class="l"><b class="goldtxt" style="font-size:17px">👑 Gold Style</b><small class="muted">${t('See all your Gold benefits')}</small></div><span>›</span></button>`:''}
  <div class="srow"><div class="l"><b>${S.vip?'👑 '+t('VIP active'):t('Free plan')}</b><small class="muted">${S.vip?(S.trialEnd>Date.now()?t('Free trial until {d}',{d:new Date(S.trialEnd).toLocaleDateString()}):(S.plan==='year'?t('100 ₪/year'):t('10 ₪/month'))):t('7 days free, then 10 ₪/month')}</small></div>${S.vip?`<button class="chip" id="vipOff">${t('Cancel')}</button>`:`<button class="chip on" id="vipGo">${t('Try free')}</button>`}</div>
  <div class="sect">${t('Appearance')}</div>
  <div class="srow"><div class="l"><b>${t('Day Mode')}</b><small class="muted">${t('Light theme for the whole app')}</small></div>${tog('tgDay',light,false)}</div>
  <div class="srow" style="flex-direction:column;align-items:flex-start"><div class="l"><b>🎨 ${t('Accent color')} ${S.vip?'':'👑'}</b></div><div class="colors">${ACCENTS.map(c=>`<button data-ac="${c}" class="${(S.vip?S.accent:'#E11D2E')===c?'on':''}" style="background:${c}"></button>`).join('')}</div></div>
  <div class="srow"><div class="l"><b>🔊 ${t('Button sounds')}</b></div>${tog('tgSound',S.sound)}</div>
  <div class="sect">${t('Notifications')}</div>
  <div class="srow"><div class="l"><b>☀️ ${t('Morning outfit')}</b><small class="muted">${t('Every day at')} <select class="sel" id="selTime">${['06:30','07:00','07:30','08:00','08:30'].map(x=>`<option ${x===S.notif.time?'selected':''}>${x}</option>`).join('')}</select></small></div>${tog('tgN1',S.notif.outfit)}</div>
  <div class="srow"><div class="l"><b>💬 ${t('New messages')}</b></div>${tog('tgN2',S.notif.msgs)}</div>
  <div class="srow"><div class="l"><b>🏆 ${t('Contests & results')}</b></div>${tog('tgN3',S.notif.contests)}</div>
  <div class="sect">${t('Privacy & safety')}</div>
  <div class="srow"><div class="l"><b>🔒 ${t('Private account')}</b><small class="muted">${t('Only approved followers see your posts')}</small></div>${tog('tgPriv',p.private)}</div>
  <div class="srow"><div class="l"><b>${t('Blocked users')}</b><small class="muted">${Object.values(S.blocked).filter(Boolean).length}</small></div><button class="chip" id="unblock">${t('Unblock all')}</button></div>
  <div class="srow"><div class="l"><b>${t('Weather for outfits')}</b><small class="muted">${W[S.weather].e} ${t(W[S.weather].label)} (demo)</small></div><button class="chip" id="setWx">${t('Change')}</button></div>
  <div class="sect">${t('Account actions')}</div>
  <div class="srow"><div class="l"><b>${t('Log out')}</b></div><button class="chip" id="logout">${t('Log out')}</button></div>
  <div style="padding:18px 18px calc(env(safe-area-inset-bottom) + 24px)"><button class="btn danger sm" id="delAcc">${t('Delete my account')}</button></div>`);
  const vipOnly=f=>()=>{if(!S.vip){toast('👑 '+t('VIP feature'));openVip(current);return;}f();};
  const tgd=$('#tgDay');if(tgd)tgd.onclick=()=>{S.day=!isLight();save();applyTheme();renderSettings();};
  $$('[data-ac]').forEach(b=>b.onclick=vipOnly(()=>{S.accent=b.dataset.ac;save();applyTheme();renderSettings();}));
  $('#tgSound').onclick=()=>{S.sound=!S.sound;save();renderSettings();};
  $('#tgN1').onclick=()=>{S.notif.outfit=!S.notif.outfit;save();renderSettings();};
  $('#tgN2').onclick=()=>{S.notif.msgs=!S.notif.msgs;save();renderSettings();};
  $('#tgN3').onclick=()=>{S.notif.contests=!S.notif.contests;save();renderSettings();};
  $('#selTime').onchange=e=>{S.notif.time=e.target.value;save();toast(t('Morning outfit at {x}',{x:e.target.value}));};
  $('#tgPriv').onclick=()=>{S.profile.private=!S.profile.private;save();renderSettings();};
  $('#selLang').onchange=async e=>{const ok=await setLanguage(e.target.value);if(ok){S.today=null;S.week=null;S.trend=null;save();}renderSettings();};
  $('#unblock').onclick=()=>{S.blocked={};save();renderSettings();toast(t('Everyone unblocked'));};
  $('#setWx').onclick=openWeather;
  $('#edPhoto').onclick=async()=>{const f=await pickFile('image/*');if(!f)return;S.profile.photo=await downscale(await readFile(f),300,.8);save();renderSettings();renderMe();};
  const vg=$('#vipGo');if(vg)vg.onclick=()=>openVip(current);const pb=$('#perksBtn');if(pb)pb.onclick=()=>{closeOverlay('settings');openPerks();};
  const vo=$('#vipOff');if(vo)vo.onclick=()=>{S.vip=false;S.trialEnd=0;save();applyTheme();renderSettings();renderMe();toast(t('VIP cancelled'));};
  $('#logout').onclick=()=>{S.profile=null;save();location.reload();};
  $('#delAcc').onclick=()=>{openSheet(`<h3>${t('Delete your account?')}</h3><p class="muted">${t('Your wardrobe, looks, posts, chats and avatar will be erased. This cannot be undone.')}</p><button class="btn primary" id="delYes" style="margin-top:12px">${t('Yes, delete everything')}</button><button class="btn" id="delNo" style="margin-top:6px">${t('Cancel')}</button>`);
    $('#delYes').onclick=()=>{try{localStorage.removeItem(KEY);}catch(_){}location.reload();};$('#delNo').onclick=closeSheet;};
}

/* ====================== CHAT ====================== */
let roomId=null;
function seedChats(){Object.keys(USERS).forEach((id,k)=>{if(!S.chats[id])S.chats[id]=[{f:'them',t:['Hey! Loved your last look 🔥','Are you joining the contest?','That jacket 😍','Hi!','Send me your outfit for tonight','Thanks for the follow!'][k]}];});S.groups.forEach(g=>{if(!S.chats[g.id])S.chats[g.id]=[];});}

function renderChat(){seedChats();renderStoryRow();renderChatList();}
function storyOwners(){const o=[];if(S.myStory.length)o.push('me');Object.keys(STORIES).forEach(u=>{if(!S.blocked[u])o.push(u);});return o;}
function renderStoryRow(){
  const mine=S.myStory.length;
  let h=`<button class="story" id="myStoryBtn"><div class="ring ${mine?'':'none'}"><div class="in" style="${mine?`background-image:url(${S.myStory[S.myStory.length-1].img})`:'background:var(--card2);color:var(--muted)'}">${mine?'':'＋'}${mine?'<span class="plus">+</span>':''}</div></div><span>${t('My Story')}</span></button>`;
  Object.keys(STORIES).filter(u=>!S.blocked[u]).forEach(u=>{const x=USERS[u];h+=`<button class="story" data-story="${u}"><div class="ring ${S.seen[u]?'seen':''}"><div class="in" style="background:${x.color}">${initials(x.name)}</div></div><span>${x.name.split(' ')[0]}</span></button>`;});
  $('#storyRow').innerHTML=h;
}
$('#storyRow').onclick=async e=>{
  if(e.target.closest('#myStoryBtn')){
    if(!S.myStory.length||e.target.closest('.plus')){const f=await pickFile('image/*');if(!f)return;S.myStory.push({img:await downscale(await readFile(f),900,.8),ts:Date.now()});if(S.myStory.length>6)S.myStory.shift();save();renderStoryRow();openStories('me');toast(t('Added to your story'));}
    else openStories('me');return;}
  const s=e.target.closest('[data-story]');if(s)openStories(s.dataset.story);
};
function renderChatList(){
  const q=($('#chatSearch').value||'').trim().toLowerCase();
  let h='';
  if(S.requests.length&&!q)h+=`<button class="reqBar" id="reqBar"><span>📨 ${t('Message requests')}</span><span class="chip on" style="padding:3px 10px">${S.requests.length}</span></button>`;
  const rows=[];
  S.groups.forEach(g=>{if(!q||g.name.toLowerCase().includes(q))rows.push({id:g.id,name:g.name,av:g.dm?`<span class="av" style="width:52px;height:52px;font-size:19px;background:${g.color}">${initials(g.name)}</span>`:`<span class="av grpAv" style="width:52px;height:52px">👥</span>`});});
  Object.entries(USERS).forEach(([id,u])=>{if(!S.blocked[id]&&(!q||u.name.toLowerCase().includes(q)||u.handle.includes(q)))rows.push({id,name:u.name,av:avHTML(id,52)});});
  h+=rows.map(r=>{const a=S.chats[r.id]||[];const m=a[a.length-1];return `<button class="crow" data-room="${r.id}">${r.av}<span class="t"><b>${esc(r.name)}</b><small class="muted">${m?(m.f==='me'?t('You')+': ':'')+preview(m):t('Say hi 👋')}</small></span></button>`;}).join('');
  $('#clist').innerHTML=h||`<p class="muted" style="text-align:center;margin-top:40px">${t('No results.')}</p>`;
}
function preview(m){return m.a?'🎙️ '+t('Voice message'):m.img?'📷 '+t('Photo'):m.outfit?'👗 '+t('Outfit'):m.short?'🎬 Short':esc(m.t||'');}
$('#chatSearch').oninput=renderChatList;
$('#clist').onclick=e=>{if(e.target.closest('#reqBar')){openRequests();return;}const r=e.target.closest('[data-room]');if(r)openRoom(r.dataset.room);};
function openRequests(){
  openSheet(`<h3>📨 ${t('Message requests')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('They can\'t see if you read it until you accept.')}</p>
  ${S.requests.map(r=>`<div class="pick"><span class="av" style="width:42px;height:42px;background:${r.color}">${initials(r.name)}</span><b>${esc(r.name)}<br><small class="muted" style="font-weight:500">${esc(r.text)}</small></b><button class="chip on" data-acc="${r.id}">${t('Accept')}</button><button class="chip" data-dec="${r.id}">✕</button></div>`).join('')||`<p class="muted">${t('No requests.')}</p>`}`);
  $('#sheet').querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{const r=S.requests.find(x=>x.id===b.dataset.acc);S.requests=S.requests.filter(x=>x!==r);const gid='q'+r.id;S.groups.push({id:gid,name:r.name,members:[],dm:true,color:r.color});S.chats[gid]=[{f:'them',t:r.text}];save();closeSheet();openRoom(gid);});
  $('#sheet').querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{S.requests=S.requests.filter(x=>x.id!==b.dataset.dec);save();closeSheet();renderChatList();toast(t('Request deleted'));});
}
$('#newGroup').onclick=()=>{const sel=new Set();
  const draw=()=>{openSheet(`<h3>👥 ${t('New group')}</h3><input class="field" id="gName" placeholder="${t('Group name')}" style="height:48px;font-size:15px;margin:10px 0"><div>${Object.keys(USERS).filter(u=>!S.blocked[u]).map(u=>`<button class="pick" data-gm="${u}">${avHTML(u,42)}<b>${USERS[u].name}</b><span class="check ${sel.has(u)?'on':''}">${sel.has(u)?'✓':''}</span></button>`).join('')}</div><button class="btn primary" id="gGo" style="margin-top:12px">${t('Create group')}</button>`);
    $('#sheet').querySelectorAll('[data-gm]').forEach(b=>b.onclick=()=>{const u=b.dataset.gm;sel.has(u)?sel.delete(u):sel.add(u);const c=b.querySelector('.check');c.classList.toggle('on',sel.has(u));c.textContent=sel.has(u)?'✓':'';});
    $('#gGo').onclick=()=>{const name=$('#gName').value.trim();if(!name||sel.size<2){toast(t('Add a name and at least 2 friends'));return;}const g={id:'g'+Date.now(),name,members:[...sel]};S.groups.push(g);S.chats[g.id]=[{f:'sys',t:t('{n} created the group',{n:'@'+me().username})}];save();closeSheet();openRoom(g.id);};};draw();};
function roomInfo(id){const g=S.groups.find(x=>x.id===id);if(g)return{name:g.name,group:!g.dm,members:g.members,av:g.dm?`background:${g.color}`:'',dm:g.dm};const u=USERS[id];return{name:u.name,group:false,members:[id],uid:id};}
function openRoom(id){if(USERS[id]&&S.blocked[id])return;seedChats();roomId=id;const r=roomInfo(id);
  const av=$('#roomAv');av.className='av'+(r.group?' grpAv':'');av.style.cssText='width:38px;height:38px;font-size:14px;'+(r.uid?`background:${USERS[id].color}`:r.av);av.textContent=r.group?'👥':initials(r.name);
  $('#roomName').innerHTML=esc(r.name)+(r.group?`<span class="sub">${r.members.length+1} ${t('members')}</span>`:'');$('#roomName').dataset.open=r.uid||'';av.dataset.open=r.uid||'';
  $('#micLock').hidden=S.vip;show('room');renderMsgs();}
$('#roomBack').onclick=()=>show('chat');
function renderMsgs(){const box=$('#msgs');box.innerHTML=`<div class="daytag">${t('Today')}</div>`;const r=roomInfo(roomId);
  (S.chats[roomId]||[]).forEach(m=>{const d=document.createElement('div');
    if(m.f==='sys'){d.className='daytag';d.textContent=m.t;box.appendChild(d);return;}
    d.className='m '+(m.f==='me'?'me':'them');
    if(r.group&&m.f!=='me'&&m.by)d.innerHTML=`<span class="from">${esc(USERS[m.by]?.name||'')}</span>`;
    if(m.a){const a=document.createElement('audio');a.controls=true;a.src=m.a;d.appendChild(a);}
    else if(m.img){d.insertAdjacentHTML('beforeend',`<img src="${m.img}">`);}
    else if(m.outfit){const its=m.outfit.map(findItem).filter(Boolean);d.insertAdjacentHTML('beforeend',`<div class="card4">${its.slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div>${t('What do you think of this outfit?')}`);}
    else if(m.short){const p=findPost(m.short);d.insertAdjacentHTML('beforeend',`🎬 <b>${p?esc(p.cap||'Short'):'Short'}</b>`);}
    else d.insertAdjacentHTML('beforeend',esc(m.t));
    box.appendChild(d);});box.scrollTop=box.scrollHeight;}
function pushMsg(id,m){seedChats();(S.chats[id]=S.chats[id]||[]).push(m);save();if(current==='room'&&roomId===id)renderMsgs();
  const r=roomInfo(id);if(m.f==='me'&&!r.dm){setTimeout(()=>{const by=r.group?pick(r.members):id;(S.chats[id]).push({f:'them',by,t:pick(REPLIES)});save();if(current==='room'&&roomId===id)renderMsgs();},1300);}}
$('#composer').onsubmit=e=>{e.preventDefault();const inp=$('#msgInput');const tx=inp.value.trim();if(!tx)return;inp.value='';pushMsg(roomId,{f:'me',t:tx});};
$('#attachBtn').onclick=()=>{openSheet(`<h3>${t('Send')}</h3><button class="srow" id="atPhoto"><div class="l"><b>📷 ${t('Photo from gallery')}</b><small class="muted">${t('Photos are checked by AI to block inappropriate images')}</small></div></button><button class="srow" id="atOutfit"><div class="l"><b>👗 ${t('Outfit from my wardrobe')}</b></div></button>`);
  $('#atPhoto').onclick=async()=>{const f=await pickFile('image/*');if(!f)return;const img=await downscale(await readFile(f),800,.8);setSheet(`<img class="preview" src="${img}"><div class="why"><span class="spin"></span><span>${t('Checking the photo…')}</span></div>`);
    if(AI&&AI_IMG){try{const r=await AI.json(`Does this image contain nudity, sexual content, graphic violence or gore? It will be sent in a chat on an app used by teenagers. Return JSON only: {"safe":true|false}`,{images:[dataUrlToBlob(img)],modelTier:'quick'});
      if(r&&r.safe===false){setSheet(`<div class="verdict bad"><span>🚫</span><span><b>${t('Photo blocked')}</b><br>${t('This image is not allowed on R-Style.')}</span></div>`);return;}}catch(_){}}
    closeSheet();pushMsg(roomId,{f:'me',img:await downscale(img,500,.75)});};
  $('#atOutfit').onclick=()=>{const opts=[...(S.today?.list||[]),...S.saved];if(!opts.length){toast(t('No outfits yet'));return;}
    setSheet(`<h3>👗 ${t('Choose an outfit')}</h3>${opts.map((o,k)=>`<button class="saved" style="width:100%;text-align:start" data-po="${k}"><b>${esc(o.title||t('Outfit'))}</b><div class="row4">${o.ids.map(findItem).filter(Boolean).slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-po]').forEach(b=>b.onclick=()=>{closeSheet();pushMsg(roomId,{f:'me',outfit:opts[+b.dataset.po].ids});});};};
let rec=null,chunks=[];
$('#micBtn').onclick=async()=>{if(!S.vip){toast('🎙️ '+t('Voice messages are a VIP feature'));return;}
  if(rec&&rec.state==='recording'){rec.stop();return;}
  try{const st=await navigator.mediaDevices.getUserMedia({audio:true});rec=new MediaRecorder(st);chunks=[];rec.ondataavailable=ev=>chunks.push(ev.data);
    rec.onstop=()=>{st.getTracks().forEach(x=>x.stop());$('#micBtn').classList.remove('recording');pushMsg(roomId,{f:'me',a:URL.createObjectURL(new Blob(chunks,{type:rec.mimeType}))});};
    rec.start();$('#micBtn').classList.add('recording');toast(t('Recording… tap again to send'));}catch(err){toast(t('The microphone works in the iPhone app'));}};

/* ====================== STORIES (Instagram-like) ====================== */
const ST={owners:[],o:0,s:0,el:0,last:0,paused:false,raf:0,dur:5000};
function segs(owner){return owner==='me'?S.myStory.map(x=>({img:x.img})):STORIES[owner];}
function openStories(owner){ST.owners=storyOwners();ST.o=Math.max(0,ST.owners.indexOf(owner));ST.s=0;$('#story').classList.add('open');loadSeg();cancelAnimationFrame(ST.raf);ST.last=performance.now();ST.raf=requestAnimationFrame(tick);}
function closeStories(){cancelAnimationFrame(ST.raf);$('#story').classList.remove('open','hold');if(current==='chat')renderStoryRow();}
function loadSeg(){const owner=ST.owners[ST.o];const list=segs(owner);ST.el=0;
  $('#stBars').innerHTML=list.map((_,i)=>`<i><b style="width:${i<ST.s?100:0}%"></b></i>`).join('');
  const seg=list[ST.s],b=$('#stBody');
  if(owner==='me'){$('#stAv').outerHTML=avHTML('me',34).replace('class="av"','class="av" id="stAv"');$('#stName').textContent=t('My Story');b.style.cssText=`background:#000 url(${seg.img}) center/contain no-repeat`;b.textContent='';$('#stCap').textContent='';}
  else{const u=USERS[owner];$('#stAv').outerHTML=avHTML(owner,34).replace('class="av"','class="av" id="stAv"');$('#stName').textContent=u.name;b.style.cssText=`background:${GRADS[seg.g]}`;b.textContent=seg.e;$('#stCap').textContent=t(seg.cap);S.seen[owner]=true;save();}
  $('#stTime').textContent=`${ST.s+1}/${list.length}`;}
function tick(now){const dt=now-ST.last;ST.last=now;if(!ST.paused){ST.el+=dt;const bar=$$('#stBars i b')[ST.s];if(bar)bar.style.width=Math.min(100,ST.el/ST.dur*100)+'%';if(ST.el>=ST.dur){next();}}ST.raf=requestAnimationFrame(tick);}
function next(){const list=segs(ST.owners[ST.o]);if(ST.s<list.length-1){ST.s++;loadSeg();return;}if(ST.o<ST.owners.length-1){ST.o++;ST.s=0;loadSeg();return;}closeStories();}
function prevSeg(){if(ST.s>0){ST.s--;loadSeg();return;}if(ST.o>0){ST.o--;ST.s=segs(ST.owners[ST.o]).length-1;loadSeg();return;}ST.el=0;}
(function(){const el=$('#story');let x0,y0,t0,holdT,moved=false,dy=0;
  el.addEventListener('pointerdown',e=>{if(e.target.closest('#stClose'))return;x0=e.clientX;y0=e.clientY;t0=Date.now();moved=false;dy=0;holdT=setTimeout(()=>{ST.paused=true;el.classList.add('hold');},180);});
  el.addEventListener('pointermove',e=>{if(x0==null)return;dy=e.clientY-y0;if(Math.abs(dy)>10||Math.abs(e.clientX-x0)>10)moved=true;if(dy>0)$('#stBody').style.transform=`translateY(${dy*.6}px) scale(${1-dy/1500})`;});
  el.addEventListener('pointerup',e=>{if(x0==null)return;clearTimeout(holdT);const held=ST.paused;ST.paused=false;el.classList.remove('hold');$('#stBody').style.transform='';
    if(dy>90){x0=null;closeStories();return;}
    if(!held&&!moved&&Date.now()-t0<300){const w=el.clientWidth;const rtl=document.documentElement.dir==='rtl';const right=e.clientX>w/3;(rtl?!right:right)?next():prevSeg();}x0=null;});
  el.addEventListener('pointercancel',()=>{clearTimeout(holdT);ST.paused=false;el.classList.remove('hold');x0=null;});
  $('#stClose').onclick=closeStories;})();

/* ====================== RUBY ====================== */
let rubyImg=null,rubyBusy=false;
function rubyLeft(){if(S.vip)return Infinity;if(S.rubyDay.d!==today())S.rubyDay={d:today(),n:0};return Math.max(0,RUBY_FREE-S.rubyDay.n);}
$('#rubyBack').onclick=()=>goBack();
function speak(text){if(!('speechSynthesis' in window)){toast(t('Voice is not available here'));return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text.replace(/\*\*/g,''));u.lang=SPEECH[S.lang]||'en-US';u.rate=1;speechSynthesis.speak(u);}
function renderRuby(){
  const box=$('#rubyMsgs');box.innerHTML='';
  const add=(role,text,img)=>{const d=document.createElement('div');d.className='m '+(role==='user'?'me':'them');if(img)d.insertAdjacentHTML('beforeend',`<img src="${img}">`);const s=document.createElement('span');s.innerHTML=md(text);d.appendChild(s);
    if(role!=='user'){const b=document.createElement('button');b.className='speak';b.textContent='🔊 '+t('Listen');b.onclick=()=>speak(text);d.appendChild(document.createElement('br'));d.appendChild(b);}box.appendChild(d);};
  add('assistant',t('Hello @{u}. I\'m Ruby, your personal stylist. I know your style and your wardrobe. Ask me what to wear, or send me a photo of your look.',{u:me().username}));
  S.ruby.forEach(m=>add(m.role,m.text,m.img));box.scrollTop=box.scrollHeight;
  const left=rubyLeft();
  $('#rubyQuota').innerHTML=(S.vip?'👑 '+t('VIP · unlimited Ruby'):(left>0?t('{n} free questions left today',{n:left}):t('No free questions left today'))+` · <a href="#" id="rqVip">${t('Unlimited with VIP')}</a>`)+(AI?'':'<br>⚠️ '+t('Ruby works when the app is opened in Claude.'));
  const rq=$('#rqVip');if(rq)rq.onclick=e=>{e.preventDefault();openVip('ruby');};
  $('#rubySugg').innerHTML=S.ruby.length?'':['What should I wear today?','Outfit for a party tonight','Which colors suit me?','Rate my look 📸'].map(x=>`<button class="chip" data-sg="${x}">${t(x)}</button>`).join('');
  $('#rubyAttach').hidden=!rubyImg;if(rubyImg)$('#rubyAttImg').src=rubyImg;
}
$('#rubySugg').onclick=e=>{const b=e.target.closest('[data-sg]');if(!b)return;if(/📸/.test(b.dataset.sg)){$('#rubyPhoto').click();return;}$('#rubyInput').value=t(b.dataset.sg);$('#rubyForm').requestSubmit();};
$('#rubyPhoto').onclick=async()=>{const f=await pickFile('image/*');if(!f)return;rubyImg=await downscale(await readFile(f),800,.8);renderRuby();if(!$('#rubyInput').value)$('#rubyInput').value=t('What do you think of this look?');};
$('#rubyAttX').onclick=()=>{rubyImg=null;renderRuby();};
$('#rubyForm').onsubmit=async e=>{e.preventDefault();if(rubyBusy)return;
  const inp=$('#rubyInput');const text=inp.value.trim();if(!text&&!rubyImg)return;
  if(!AI){toast(t('Ruby works when the app is opened in Claude.'));return;}
  if(rubyLeft()<=0){toast(t('No free questions left today'));openVip('ruby');return;}
  const img=rubyImg;rubyImg=null;inp.value='';
  S.ruby.push({role:'user',text:text||'…',img:img?await downscale(img,360,.7):null});if(!S.vip)S.rubyDay.n++;save();renderRuby();
  const box=$('#rubyMsgs');const d=document.createElement('div');d.className='m them';d.innerHTML='<span class="spin"></span>';box.appendChild(d);box.scrollTop=box.scrollHeight;
  rubyBusy=true;$('#rubySend').disabled=true;
  const hist=S.ruby.slice(-10).map(m=>({role:m.role,content:m.text+(m.img?' [photo attached]':'')}));while(hist.length&&hist[0].role!=='user')hist.shift();
  hist[0]={role:'user',content:`${RUBY}\n\n${userCtx()}\n\n---\n${hist[0].content}`};
  try{const opts={cache:false,onText:({text})=>{d.innerHTML=md(text);box.scrollTop=box.scrollHeight;}};if(img&&AI_IMG)opts.images=[dataUrlToBlob(img)];
    const r=await AI(hist,opts);S.ruby.push({role:'assistant',text:r.text||'…'});if(S.ruby.length>40)S.ruby=S.ruby.slice(-40);save();
  }catch(err){d.textContent=aiErr(err);if(!S.vip)S.rubyDay.n=Math.max(0,S.rubyDay.n-1);S.ruby.pop();save();}
  rubyBusy=false;$('#rubySend').disabled=false;if(current==='ruby')renderRuby();};

/* ====================== AVATAR ====================== */
let av3=null,avTab='clothes';
function avCfg(){const a=S.avatar;const wear={};for(const k in a.wear){const it=findItem(a.wear[k]);if(it)wear[k]={color:it.color||'#888',warmth:it.warmth,name:it.name};}
  const g=S.vip;const hs=a.hairStyle||(me().gender==='woman'?'long':'short');return {gender:me().gender==='woman'?'woman':'man',skin:a.skin,hair:a.hair,hairStyle:g||HS_FREE.includes(hs)?hs:'long',eyes:a.eyes,body:a.body,height:a.height,room:g||ROOMS_FREE.includes(a.room)?a.room:'modern',wear,interactive:true,makeup:g?{lips:a.lips||null,blush:!!a.blush}:null,freckles:g&&!!a.freckles,glasses:g&&!!a.glasses,earrings:g&&!!a.earrings,rack:allItems().filter(i=>i.cat!=='Shoes'&&i.cat!=='Accessory').map(i=>i.color).slice(0,8)};}
function dressAvatar(ids){S.avatar.wear={};(ids||[]).forEach(id=>{const i=findItem(id);if(i)S.avatar.wear[i.cat]=id;});save();}
function avRefresh(){if(av3)av3.set(avCfg());else drawSvgAvatar();}
function avDestroy(){if(av3){av3.destroy();av3=null;}const w=$('#avStage .svgwrap');if(w)w.remove();}
function avMount(){
  avDestroy();const st=$('#avStage');st.querySelectorAll('canvas').forEach(x=>x.remove());
  $('#avHint').textContent=t('Drag to turn 360°');
  try{if(!window.Avatar3D||!window.THREE)throw 0;av3=window.Avatar3D.mount(st,avCfg());}catch(e){av3=null;drawSvgAvatar();}
  renderAnimBar();renderAvTab();
  if(!S.avatar.created)setTimeout(()=>{if(current==='wardrobe'&&wTab==='avatar'&&!S.avatar.created)setupAvatar();},400);
}
let avAnim='idle';
function renderAnimBar(){$('#animBar').innerHTML=[['walk','🚶'],['pose','💃'],['spin','🔄']].map(([k,e])=>`<button data-anim="${k}" class="${avAnim===k?'on':''}" aria-label="${k}">${e}${S.vip?'':'<span class="k">👑</span>'}</button>`).join('');}
$('#animBar').addEventListener('click',e=>{const b=e.target.closest('[data-anim]');if(!b)return;if(!S.vip){toast('👑 '+t('Moves are a Gold feature'));openVip('wardrobe');return;}
  const k=b.dataset.anim;avAnim=avAnim===k&&k!=='spin'?'idle':k;if(av3)av3.play(avAnim);if(k==='spin')avAnim='idle';renderAnimBar();});
function drawSvgAvatar(){const st=$('#avStage');let w=st.querySelector('.svgwrap');if(!w){w=document.createElement('div');w.className='svgwrap';st.prepend(w);}
  const c=avCfg(),col=k=>c.wear[k]?.color;w.innerHTML=`<svg viewBox="0 0 200 400"><circle cx="100" cy="58" r="28" fill="${c.skin}"/><rect x="68" y="96" width="64" height="112" rx="16" fill="${col('Top')||col('Dress')||c.skin}"/><rect x="76" y="200" width="48" height="150" rx="10" fill="${col('Bottom')||col('Dress')||c.skin}"/><ellipse cx="88" cy="358" rx="15" ry="8" fill="${col('Shoes')||c.skin}"/><ellipse cx="112" cy="358" rx="15" ry="8" fill="${col('Shoes')||c.skin}"/><path d="M72 54 Q72 28 100 28 Q128 28 128 54Z" fill="${c.hair}"/></svg>`;}
$$('[data-at]').forEach(b=>b.onclick=()=>{avTab=b.dataset.at;$$('[data-at]').forEach(x=>x.classList.toggle('on',x===b));renderAvTab();});
function renderAvTab(){const a=S.avatar;let h='';
  if(avTab==='clothes'){
    h+=`<button class="btn primary sm" id="avDress" style="margin-top:10px">✨ ${t('Dress me for today')}</button>`;
    CATS.forEach(c=>{const items=allItems().filter(i=>i.cat===c);if(!items.length)return;
      h+=`<div class="slot"><h4><span>${t(c)}</span></h4><div class="opts"><button class="opt none ${!a.wear[c]?'on':''}" data-wear="${c}" data-id="">${t('None')}</button>${items.map(i=>`<button class="opt ${a.wear[c]===i.id?'on':''}" data-wear="${c}" data-id="${i.id}" ${itemPh(i)}>${itemFace(i)}</button>`).join('')}</div></div>`;});
  }else if(avTab==='look'){
    h+=`<button class="btn ghost sm" id="avSelfie" style="margin-top:10px">🤳 ${t('Recreate from a selfie')}</button>`;
    h+=`<div class="slot"><h4>${t('Skin')}</h4><div class="opts">${SKINS.map(c=>`<button class="sw ${a.skin===c?'on':''}" data-skin="${c}" style="background:${c}"></button>`).join('')}</div></div>`;
    h+=`<div class="slot"><h4>${t('Hair color')}</h4><div class="opts">${HAIRS.map(c=>`<button class="sw ${a.hair===c?'on':''}" data-hair="${c}" style="background:${c}"></button>`).join('')}</div></div>`;
    h+=`<div class="slot"><h4>${t('Hairstyle')}</h4><div class="opts">${HS_ALL.map(s=>{const lk=!S.vip&&!HS_FREE.includes(s);return `<button class="opt optw ${(a.hairStyle||'')===s?'on':''} ${lk?'lockd':''}" data-hs="${s}">${t({short:'Short',long:'Long',bun:'Bun',curly:'Curly',ponytail:'Ponytail',braids:'Braids'}[s])}</button>`;}).join('')}</div></div>`;
    h+=`<div class="slot"><h4><span>${t('Face details')}</span>${S.vip?'':'<span class="goldBadge">👑 Gold</span>'}</h4><div class="opts">${LIPS.map(c=>`<button class="sw ${a.lips===c?'on':''}" data-lips="${c}" style="background:${c}"></button>`).join('')}</div>
      <div class="opts" style="margin-top:8px">${[['blush','🌸 '+t('Blush')],['freckles','✨ '+t('Freckles')],['glasses','👓 '+t('Glasses')],['earrings','💛 '+t('Earrings')]].map(([k,l])=>`<button class="opt optw ${a[k]?'on':''} ${S.vip?'':'lockd'}" data-fd="${k}">${l}</button>`).join('')}</div></div>`;
    h+=`<div class="slot"><h4>${t('Eyes')}</h4><div class="opts">${EYES.map(c=>`<button class="sw ${a.eyes===c?'on':''}" data-eyes="${c}" style="background:${c}"></button>`).join('')}</div></div>`;
    h+=`<div class="slot"><h4>${t('Body')}</h4><div class="opts">${['slim','regular','curvy'].map(s=>`<button class="opt optw ${a.body===s?'on':''}" data-body="${s}">${t({slim:'Slim',regular:'Regular',curvy:'Curvy'}[s])}</button>`).join('')}</div></div>`;
    h+=`<div class="slot"><h4><span>${t('Height')}</span></h4><input type="range" id="avH" min="0.92" max="1.08" step="0.01" value="${a.height}"></div>`;
  }else{
    h+=`<div class="slot"><h4>${t('Dressing room')}</h4><div class="opts" style="flex-wrap:wrap">${ROOMS_ALL.map(r=>{const lock=!S.vip&&!ROOMS_FREE.includes(r);return `<button class="opt optw ${a.room===r?'on':''} ${lock?'lockd':''}" data-room="${r}">${t({modern:'Modern',beach:'Beach',boutique:'Boutique',runway:'Runway',paris:'Paris',night:'Night',gold:'Gold Lounge'}[r])}</button>`;}).join('')}</div></div>${S.vip?'':`<button class="lockrow" id="avGoGold">👑 ${t('Gold unlocks all rooms, hairstyles, face details and moves.')}</button>`}`;
  }
  $('#avSlots').innerHTML=h;
}
$('#avSlots').addEventListener('click',async e=>{const g=s=>e.target.closest(s);let b;const a=S.avatar;
  if(g('#avDress')){const o=S.today?.list?.[0]||localOutfit(0);dressAvatar(o.ids);}
  else if(g('#avSelfie')){setupAvatar(true);return;}
  else if((b=g('[data-wear]'))){const c=b.dataset.wear,id=b.dataset.id;if(id){a.wear[c]=id;if(c==='Dress'){delete a.wear.Top;delete a.wear.Bottom;}if(c==='Top'||c==='Bottom')delete a.wear.Dress;}else delete a.wear[c];}
  else if(g('#avGoGold')){openVip('wardrobe');return;}
  else if((b=g('[data-skin]')))a.skin=b.dataset.skin;else if((b=g('[data-hair]')))a.hair=b.dataset.hair;
  else if((b=g('[data-hs]'))){if(!S.vip&&!HS_FREE.includes(b.dataset.hs)){toast('👑 '+t('Gold feature'));openVip('wardrobe');return;}a.hairStyle=b.dataset.hs;}
  else if((b=g('[data-lips]'))){if(!S.vip){openVip('wardrobe');return;}a.lips=a.lips===b.dataset.lips?null:b.dataset.lips;}
  else if((b=g('[data-fd]'))){if(!S.vip){openVip('wardrobe');return;}a[b.dataset.fd]=!a[b.dataset.fd];}
  else if((b=g('[data-eyes]')))a.eyes=b.dataset.eyes;else if((b=g('[data-body]')))a.body=b.dataset.body;
  else if((b=g('[data-room]'))){if(!S.vip&&!ROOMS_FREE.includes(b.dataset.room)){toast('👑 '+t('Gold feature'));openVip('wardrobe');return;}a.room=b.dataset.room;}
  else return;
  save();avRefresh();const y=$('#avSlots').scrollTop;renderAvTab();$('#avSlots').scrollTop=y;});
$('#avSlots').addEventListener('input',e=>{if(e.target.id==='avH'){S.avatar.height=+e.target.value;save();avRefresh();}});
function shareAvatar(){let img=null;try{img=av3?av3.snapshot():null;}catch(_){}if(!img){toast(t('Sharing works with the 3D avatar'));return;}openPoster({img});}
function setupAvatar(again){
  openSheet(`<h3>🧍 ${t('Create your avatar')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Take a selfie: Ruby picks your skin tone, hair and eyes. You can adjust everything after.')}</p>
    <button class="btn primary" id="avFromSelfie" style="margin-top:14px">🤳 ${t('From a selfie')}</button><button class="btn ghost" id="avManual" style="margin-top:8px">${t('I\'ll build it myself')}</button><div id="avRes"></div>`);
  $('#avManual').onclick=()=>{S.avatar.created=true;save();closeSheet();avTab='look';$$('[data-at]').forEach(x=>x.classList.toggle('on',x.dataset.at==='look'));renderAvTab();};
  $('#avFromSelfie').onclick=async()=>{const f=await pickFile('image/*',true);if(!f)return;const img=await downscale(await readFile(f),700,.82);
    if(!AI||!AI_IMG){$('#avRes').innerHTML=`<div class="why"><span>⚠️</span><span>${t('The AI can see photos when the app is opened in Claude.')}</span></div>`;return;}
    $('#avRes').innerHTML=`<div class="why"><span class="spin"></span><span>${t('Ruby is creating your avatar…')}</span></div>`;
    try{const v=await AI.json(`From this selfie, estimate avatar settings. Return JSON only: {"skin":"#hex skin tone","hair":"#hex hair color","hairStyle":"short|long|bun|curly","eyes":"#hex eye color"}`,{images:[dataUrlToBlob(img)],modelTier:'quick'});
      const hx=x=>/^#[0-9a-f]{6}$/i.test(x);const a=S.avatar;if(hx(v.skin))a.skin=v.skin;if(hx(v.hair))a.hair=v.hair;if(hx(v.eyes))a.eyes=v.eyes;if(['short','long','bun','curly'].includes(v.hairStyle))a.hairStyle=v.hairStyle;
      a.created=true;save();avRefresh();closeSheet();renderAvTab();toast('✨ '+t('Your avatar is ready'));}catch(e){$('#avRes').innerHTML=`<div class="why"><span>⚠️</span><span>${aiErr(e)}</span></div>`;}};
}


/* ====================== GOLD (VIP) FEATURES ====================== */
const EVENTS=['Normal day','School / work','Party','Wedding','Sport','Date','Trip'];
function mondayOf(d){const x=new Date(d);const k=(x.getDay()+6)%7;x.setDate(x.getDate()-k);return x.toISOString().slice(0,10);}
function weekDates(){const m=new Date(mondayOf(today()));return Array.from({length:7},(_,i)=>{const d=new Date(m);d.setDate(m.getDate()+i);return d.toISOString().slice(0,10);});}
let weekBusy=false;
async function ensureWeek(force){
  const start=mondayOf(today());
  if(!force&&S.week&&S.week.start===start&&S.week.days?.length===7)return;
  if(weekBusy)return;weekBusy=true;
  const dates=weekDates();const ev=(S.week&&S.week.start===start)?S.week.days.map(d=>d.event):dates.map(()=> 'Normal day');
  let days=null;
  if(AI){try{const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: plan one outfit per day for this week (Monday to Sunday) from the wardrobe. Events per day: ${ev.map((e,i)=>dates[i]+': '+e).join('; ')}. Avoid repeating the same top or bottom on consecutive days, skip laundry, assume similar weather. Titles in ${langName()}. Return JSON only: {"days":[{"title":"2-3 words","ids":["..."]}]} with exactly 7 entries.`,{modelTier:'quick'});
    days=(v&&Array.isArray(v.days)?v.days:[]).slice(0,7).map((d,i)=>({date:dates[i],event:ev[i],title:String(d.title||''),ids:(d.ids||[]).filter(id=>findItem(id))}));if(days.length<7||days.some(d=>d.ids.length<2))days=null;}catch(e){days=null;}}
  if(!days)days=dates.map((d,i)=>{const o=localOutfit(i%3);return{date:d,event:ev[i],title:o.title,ids:o.ids};});
  S.week={start,days};save();weekBusy=false;if(current==='home')renderVipHome();
}
function renderVipHome(){
  const box=$('#vipHome');if(!box)return;if(!S.vip){box.innerHTML='';return;}
  const month=new Date().toLocaleDateString(S.lang==='he'?'he-IL':S.lang==='ar'?'ar':S.lang||'en',{month:'long'});
  if(!S.week||S.week.start!==mondayOf(today())){box.innerHTML=`<div class="vhRow"><span>📅 ${t('Your week by Ruby')}</span><span class="goldBadge">Gold</span></div><div class="weekRow"><div class="wday" style="flex:1;padding:12px"><span class="spin"></span></div></div>`;ensureWeek();}
  else{const td=today();
    box.innerHTML=`<div class="vhRow"><span>📅 ${t('Your week by Ruby')}</span><span class="goldBadge">Gold</span></div><div class="weekRow">${S.week.days.map((d,i)=>{const it=d.ids.map(findItem).filter(Boolean);const wd=new Date(d.date).toLocaleDateString(S.lang==='he'?'he-IL':S.lang==='ar'?'ar':S.lang||'en',{weekday:'short'});
      return `<button class="wday ${d.date===td?'today':''}" data-day="${i}">${esc(wd)}<span class="ic">${it.slice(0,2).map(x=>x.img?'🧥':x.emoji||'👕').join('')}</span><small>${d.event!=='Normal day'?esc(t(d.event)):esc(d.title)}</small></button>`;}).join('')}</div>`;}
  box.innerHTML+=`<button class="trendCard" id="trendCard"><span style="font-size:22px">📈</span><b>${t('Ruby\'s trends')} · ${esc(month)}<small>${t('Your monthly style report')}</small></b><span>›</span></button>`;
}
$('#vipHome').addEventListener('click',e=>{const d=e.target.closest('[data-day]');if(d){openDay(+d.dataset.day);return;}if(e.target.closest('#trendCard'))openTrend();});
function openDay(i){const d=S.week.days[i];const items=d.ids.map(findItem).filter(Boolean);
  const wd=new Date(d.date).toLocaleDateString(S.lang==='he'?'he-IL':S.lang==='ar'?'ar':S.lang||'en',{weekday:'long',day:'numeric',month:'long'});
  openSheet(`<h3>📅 ${esc(wd)}</h3><p class="muted" style="margin:0;font-size:13px">${esc(d.title)}</p>
   <div class="ogrid" style="grid-template-columns:repeat(${Math.min(4,items.length)},1fr);height:150px;margin:12px 0">${items.map(i=>`<div ${itemPh(i)}>${itemFace(i)}<small>${esc(i.name)}</small></div>`).join('')}</div>
   <b style="font-size:14px">${t('What\'s happening that day?')}</b><div class="row">${EVENTS.map(ev=>`<button class="chip ${ev===d.event?'on':''}" data-ev="${ev}">${t(ev)}</button>`).join('')}</div>
   <div style="display:flex;gap:8px"><button class="btn primary sm" id="dayNew">↻ ${t('Another outfit')}</button><button class="btn ghost sm" id="dayAv">🧍</button></div>`);
  $('#sheet').querySelectorAll('[data-ev]').forEach(b=>b.onclick=()=>{d.event=b.dataset.ev;save();regenDay(i);});
  $('#dayNew').onclick=()=>regenDay(i);$('#dayAv').onclick=()=>{dressAvatar(d.ids);closeSheet();openAvTab();};
}
async function regenDay(i){const d=S.week.days[i];setSheet(`<div class="why"><span class="spin"></span><span>${t('Ruby is preparing your outfits…')}</span></div>`);
  let o=null;if(AI){try{const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: one outfit for ${d.date}, occasion: ${d.event}. Different from: ${d.ids.join(',')}. Title in ${langName()}. Return JSON only: {"title":"","ids":["..."]}`,{modelTier:'quick'});const ids=(v.ids||[]).filter(id=>findItem(id));if(ids.length>=2)o={title:String(v.title||''),ids};}catch(_){}}
  if(!o)o=localOutfit(Math.floor(Math.random()*3));d.title=o.title;d.ids=o.ids;save();renderVipHome();openDay(i);}
/* trends */
$('#trendBack').onclick=()=>closeOverlay('trend');
async function openTrend(){if(!S.vip){openVip(current);return;}openOverlay('trend');const m=today().slice(0,7);const body=$('#trendBody');
  if(S.trend&&S.trend.m===m&&S.trend.lang===S.lang){drawTrend(S.trend.data);return;}
  body.innerHTML=`<div class="why" style="margin:18px"><span class="spin"></span><span>${t('Ruby is writing your report…')}</span></div>`;
  let data=null;if(AI){try{const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: write this month's personal style report (month: ${m}). Suggest 5 style directions that suit the season and the user's styles. Do NOT invent news, brands or statistics; these are your stylist picks. For each, explain how to wear it with the user's OWN items (by name). Everything in ${langName()}. Return JSON only: {"title":"","intro":"one or two sentences","trends":[{"name":"","color":"#hex","why":"one sentence","how":"one sentence with their items"}]}`);
    if(v&&Array.isArray(v.trends)&&v.trends.length)data={title:String(v.title||''),intro:String(v.intro||''),trends:v.trends.slice(0,6).map(x=>({name:String(x.name||''),color:/^#[0-9a-f]{6}$/i.test(x.color)?x.color:'#d4a017',why:String(x.why||''),how:String(x.how||'')}))};}catch(_){}}
  if(!data)data={title:t('Ruby\'s picks this month'),intro:t('Five style directions chosen for your wardrobe and the season.'),trends:[
    {name:t('Smart layering'),color:'#b08d57',why:t('A light layer makes any outfit look finished.'),how:t('Try your Trench coat over the White tee.')},
    {name:t('Tone on tone'),color:'#3b5b92',why:t('One color from head to toe looks taller and elegant.'),how:t('Blue jeans with a blue or white top.')},
    {name:t('Warm browns'),color:'#8a5a44',why:t('Brown and beige are soft and easy to match.'),how:t('Wool sweater with Brown boots.')},
    {name:t('Clean sneakers'),color:'#f2f2f2',why:t('White sneakers make classic pieces feel young.'),how:t('Wear them with your most formal outfit.')},
    {name:t('One statement piece'),color:'#d7263d',why:t('One bold item, everything else simple.'),how:t('A red piece with black and white basics.')}]};
  S.trend={m,lang:S.lang,data};save();drawTrend(data);}
function drawTrend(d){$('#trendBody').innerHTML=`<div class="mag"><div class="cover"><span class="goldBadge">Gold · ${esc(today().slice(0,7))}</span><h1 class="goldtxt">${esc(d.title)}</h1><p>${esc(d.intro)}</p></div>
  ${d.trends.map((x,i)=>`<div class="tr"><div class="sw" style="background:${x.color}"></div><div><h3>${i+1}. ${esc(x.name)}</h3><p class="muted">${esc(x.why)}</p><div class="how">👗 ${esc(x.how)}</div></div></div>`).join('')}</div>`;}
/* what's missing */
function missingCard(){return S.vip?`<div class="missing"><h4><span>🛍️ ${t('What\'s missing in my wardrobe')}</span><span class="goldBadge">Gold</span></h4><p class="muted" style="margin:0 0 10px;font-size:13px">${t('Ruby finds the few pieces that would create the most new outfits.')}</p><button class="btn primary sm" id="missBtn">💎 ${t('Ask Ruby')}</button></div>`
  :`<button class="missing" id="missLock" style="width:100%;text-align:start"><h4><span>🛍️ ${t('What\'s missing in my wardrobe')}</span><span class="goldBadge">👑 Gold</span></h4><p class="muted" style="margin:0;font-size:13px">${t('Ruby finds the few pieces that would create the most new outfits.')}</p></button>`;}
$('#wBody').addEventListener('click',e=>{if(e.target.closest('#missBtn'))openMissing();if(e.target.closest('#missLock'))openVip('wardrobe');});
async function openMissing(){openSheet(`<h3>🛍️ ${t('What\'s missing in my wardrobe')}</h3><div class="why"><span class="spin"></span><span>${t('Ruby is studying your wardrobe…')}</span></div>`);
  let list=null;if(AI){try{const v=await AI.json(`${RUBY}\n\n${userCtx()}\n\nTask: suggest the 3 to 5 items missing from this wardrobe that would unlock the most new outfits for the user's styles. For each: a short name, why (one sentence), how many new outfits it unlocks (number), and a short English shopping search query. Names and why in ${langName()}. Return JSON only: {"items":[{"name":"","why":"","unlocks":0,"search":""}]}`);
    list=(v&&Array.isArray(v.items)?v.items:[]).slice(0,5).map(x=>({name:String(x.name||''),why:String(x.why||''),unlocks:Math.max(1,Math.round(+x.unlocks||3)),search:String(x.search||x.name||'')}));if(!list.length)list=null;}catch(_){}}
  if(!list){const it=allItems(),has=c=>it.some(i=>i.cat===c);list=[];
    if(!has('Outerwear'))list.push({name:t('Light jacket'),why:t('Finishes every outfit on cooler days.'),unlocks:8,search:'light jacket'});
    if(it.filter(i=>i.cat==='Top').length<4)list.push({name:t('Basic black tee'),why:t('Goes with everything you own.'),unlocks:6,search:'black basic t-shirt'});
    if(it.filter(i=>i.cat==='Bottom').length<3)list.push({name:t('Beige trousers'),why:t('A neutral bottom doubles your combinations.'),unlocks:7,search:'beige trousers'});
    list.push({name:t('White sneakers'),why:t('The most versatile shoe.'),unlocks:5,search:'white sneakers'});}
  setSheet(`<h3>🛍️ ${t('What\'s missing in my wardrobe')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('Similar items from our partners. R-Style earns a small commission (demo).')}</p>
   ${list.map(x=>`<div class="perk"><span class="e">🛍️</span><div><b>${esc(x.name)}</b><small>${esc(x.why)} · +${x.unlocks} ${t('outfits')}</small></div><a class="go" href="https://www.shein.com/pdsearch/${encodeURIComponent(x.search)}/" target="_blank" rel="noopener">SHEIN ↗</a></div>`).join('')}`);}
/* perks */
function openPerks(){
  const P=[['🧍','Full 3D avatar','All rooms, hairstyles, face details and moves',()=>{closeSheet();openAvTab();}],
    ['📅','Weekly plan','Ruby plans an outfit for each day',()=>{closeSheet();show('home');}],
    ['📈','Monthly trends','Your personal style report',()=>{closeSheet();openTrend();}],
    ['🛍️','What\'s missing','The pieces that unlock the most outfits',()=>{closeSheet();openMissing();}],
    ['💎','Unlimited Ruby','Ask as much as you want',()=>{closeSheet();show('ruby');}],
    ['🎙️','Voice messages','In all your chats',()=>{closeSheet();show('chat');}],
    ['🏆','Monthly contest','Win the crown on your profile',()=>openContest()],
    ['✨','Gold profile','Gold frame and badge',()=>{closeSheet();show('me');}],
    ['🎨','Day Mode & colors','In settings',()=>{closeSheet();renderSettings();openOverlay('settings');}]];
  openSheet(`<div style="text-align:center"><h2 class="goldtxt" style="margin:0;font-size:30px">Gold Style</h2><p class="muted" style="margin:4px 0 8px;font-size:13px">${S.trialEnd>Date.now()?t('Free trial until {d}',{d:new Date(S.trialEnd).toLocaleDateString()}):(S.plan==='year'?t('100 ₪/year'):t('10 ₪/month'))}</p></div>
   ${P.map((p,i)=>`<button class="perk" data-perk="${i}"><span class="e">${p[0]}</span><div><b>${t(p[1])}</b><small>${t(p[2])}</small></div><span class="go">${t('Open')} ›</span></button>`).join('')}`);
  $('#sheet').querySelectorAll('[data-perk]').forEach(b=>b.onclick=()=>P[+b.dataset.perk][3]());
}
function openContest(){if(!S.vip){openVip(current);return;}
  const rank=Object.entries(USERS).filter(([id])=>!S.blocked[id]).sort((a,b)=>b[1].score-a[1].score);
  const mine=S.posts.filter(p=>p.contest);
  openSheet(`<h3>🏆 ${t('Monthly Style Contest')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('Hearts ❤️ + Ruby\'s score. The winner gets the crown 👑 on their profile.')}</p>
   ${rank.map(([id,u],i)=>`<button class="lb" data-open="${id}"><span class="n">${i+1}</span>${avHTML(id,40)}<b>${u.name}</b><span>${u.score}</span></button>`).join('')}
   ${mine.length?`<p class="muted" style="font-size:13px">${t('Your entries')}: ${mine.length}</p>`:''}
   <button class="btn goldbtn" id="joinC" style="margin-top:14px">${t('Join with a look')}</button>`);
  $('#joinC').onclick=()=>{closeSheet();contestMode=true;openPoster();};}
let contestMode=false;

/* ====================== MISC ====================== */
document.addEventListener('gesturestart',e=>e.preventDefault());
document.addEventListener('touchmove',e=>{if(!e.target.closest('#feed,.wbody,.pscroll,.clist,.msgs,#sheet,.filters,#vip,.slots,.opts,.sugg,.outfits,.storyRow,.langs,.step,#avStage'))e.preventDefault();},{passive:false});

/* ====================== v5: ICONS ====================== */
const SV=(d,extra='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
const ICONS={
 home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 hanger:'<path d="M12 7a2 2 0 1 1 2-2M12 7v2l9 7.5a1.5 1.5 0 0 1-1 2.5H4a1.5 1.5 0 0 1-1-2.5L12 9"/>',
 chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z"/>',
 play:'<rect x="5" y="2.5" width="14" height="19" rx="4"/><path d="m10.5 9.5 4 2.5-4 2.5z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z"/>',
 crown:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>',
 group:'<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5M18 8v6M15 11h6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
 bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
 avatar:'<circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 10.5h8M12 15l-3 6M12 15l3 6"/>',
 camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 9"/>',
 heart:'<path d="M12 20s-7-4.4-9-8.8C1.6 8 3.6 4.5 7 4.5c2 0 3.4 1 5 2.8 1.6-1.8 3-2.8 5-2.8 3.4 0 5.4 3.5 4 6.7-2 4.4-9 8.8-9 8.8z"/>',
 flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.5 2 3 0-3-1-5.5.5-8z"/>',
 trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
 bag:'<path d="M6 7h12l-1 14H7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
 trophy:'<path d="M8 4h8v4a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 12v4M9 20h6l-1-4h-4z"/>',
 calendar:'<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 chev:'<path d="M9 6l6 6-6 6"/>',
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5"/>',
 walk:'<circle cx="13" cy="4" r="2"/><path d="M10 21l2-7 3 3v5M8 10l4-3 3 3 3 1M12 14l-1-5"/>',
 pose:'<circle cx="12" cy="4" r="2"/><path d="M12 7v7M12 9l-4 3M12 9l3 2 1-3M12 14l-3 7M12 14l3 7"/>',
 spin:'<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>',
 share:'<path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 sticker:'<path d="M14 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h7l7-7V7a4 4 0 0 0-4-4z"/><path d="M14 21v-4a3 3 0 0 1 3-3h4"/>',
 top:'<path d="M8 4l-4 3 2 3 2-1v11h8V9l2 1 2-3-4-3c-.5 1.5-2 2.5-4 2.5S8.5 5.5 8 4z"/>',
 bottom:'<path d="M7 3h10l1 18h-4l-2-11-2 11H6z"/>',
 dress:'<path d="M9 3h6l-1 5 4 13H6l4-13z"/>',
 shoes:'<path d="M3 16c0-2 1-4 2-5l3 2c2 1 5 1 7 1l5 1c1 0 1.5 1 1.5 2v1H3z"/>',
 outer:'<path d="M8 3l-4 3v14h5V9M16 3l4 3v14h-5V9M8 3l4 5 4-5"/>',
 acc:'<path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 face:'<circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8.5 14.5c1.8 2 5.2 2 7 0"/>',
 room:'<path d="M4 20V8l8-5 8 5v12M9 20v-6h6v6"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>'
};
function ic(n,cls=''){return `<i data-ic="${n}" class="${cls}">${SV(ICONS[n]||ICONS.star)}</i>`;}
const CATICON={Top:'top',Bottom:'bottom',Dress:'dress',Shoes:'shoes',Outerwear:'outer',Accessory:'acc'};
const EMO2IC={'👕':'top','👚':'top','👔':'top','🧥':'outer','👖':'bottom','🩳':'bottom','👗':'dress','🥻':'dress','👟':'shoes','👡':'shoes','👠':'shoes','👞':'shoes','🥾':'shoes','🩴':'shoes','👜':'acc','🧢':'acc','👒':'acc','🕶️':'acc','🧣':'acc','🌼':'sparkle'};
function clean(h){return String(h).replace(/>(\s*)(?:\p{Extended_Pictographic}️?\s*)+/gu,'>$1').replace(/'(?:\p{Extended_Pictographic}️?\s*)+/gu,"'");}
function hydrate(root){(root||document).querySelectorAll('i[data-ic]:empty').forEach(el=>{el.innerHTML=SV(ICONS[el.dataset.ic]||ICONS.star);});}

/* ====================== v5: HOME ====================== */
function renderHome(){
  if(!S.profile)return;
  const sc=lookScore(),n=Math.min(3,S.looks.filter(x=>x.score>0&&x.ts>=Date.now()-30*864e5).length);
  $('#scoreNum').textContent=sc==null?'—':sc;
  $('#scoreArc').style.strokeDashoffset=182.2*(1-(sc==null?n/3*.999:sc/100));
  $('#scoreArc').style.stroke=sc==null?'var(--muted)':(S.vip?'#D4AF37':'var(--accent)');
  $('#scoreTxt').textContent=sc==null?t('Show Ruby 3 looks to unlock your score ({n}/3). Tap here.',{n}):t('Based on your looks from the last 30 days. Tap to add a look.');
  $('#chatDot').hidden=!(S.requests.length||chatUnread());
  renderLogo();
  $('#todayWrap').style.display=S.vip?'none':'flex';$('#vipHome').style.display=S.vip?'flex':'none';renderNavMe();
  if(S.vip){renderVipHome();}else{$('#vipHome').innerHTML='';genToday(false);}
}
function greetLine(){const h=new Date().getHours();return h<12?t('Good morning'):h<18?t('Hello'):t('Good evening');}
function drawToday(){
  const list=S.today.list,w=W[S.weather],p=me();
  $('#outfits').innerHTML=list.map((o,k)=>{const items=o.ids.map(findItem).filter(Boolean).slice(0,4);const worn=items.length&&items.every(i=>lastWorn(i.id)===0);
    return `<div class="ocard" data-k="${k}">
      <div class="greet"><div><b>${greetLine()} ${esc(p.username)}</b><small>${k===0?t('Here is your look for today'):esc(o.title)} · ${w.t}°, ${t(w.label).toLowerCase()}</small></div><span class="k">${k+1} / ${list.length}</span></div>
      <div class="ogrid">${items.map(i=>`<div ${itemPh(i)}>${itemFace(i)}<small>${esc(i.name)}</small></div>`).join('')}</div>
      <p class="why muted">${md(o.why)}</p>
      <div class="acts"><button class="${worn?'done':'wear'}" data-wear="${k}">${worn?t('Worn today'):t('Wear today')}</button><button data-save="${k}" aria-label="${t('Save')}">${SV(ICONS.bookmark)}</button><button data-onav="${k}" aria-label="${t('My avatar')}">${SV(ICONS.avatar)}</button></div></div>`;}).join('');
  $('#outDots').innerHTML=list.map((_,k)=>`<i class="${k?'':'on'}"></i>`).join('');
}
function renderVipHome(){
  const box=$('#vipHome');if(!box)return;
  if(!S.week||S.week.start!==mondayOf(today())){box.innerHTML=`<div class="todayBig"><div class="loadingCard"><span class="spin"></span>${t('Ruby is preparing your outfits…')}</div></div>`;ensureWeek();return;}
  const td=today(),idx=Math.max(0,S.week.days.findIndex(d=>d.date===td)),d=S.week.days[idx],items=d.ids.map(findItem).filter(Boolean).slice(0,3),w=W[S.weather];
  const worn=items.length&&items.every(i=>lastWorn(i.id)===0);
  const loc=S.lang==='he'?'he-IL':S.lang==='ar'?'ar':S.lang||'en';
  const rest=[];for(let k=1;k<=6;k++){const j=(idx+k)%7;rest.push(j);}
  const month=new Date().toLocaleDateString(loc,{month:'long'});
  box.innerHTML=`<div class="vhRow"><span>${t('Your week by Ruby')}</span><small>${t('Today')}</small></div>
   <div class="todayBig"><div class="greet" style="display:flex;flex-direction:column;gap:3px"><b style="font-size:21px;letter-spacing:-.4px">${greetLine()} ${esc(me().username)}</b><small class="muted" style="font-size:13px">${esc(d.title)} · ${w.t}°, ${t(w.label).toLowerCase()}</small></div>
    <div class="g3">${items.map(i=>`<div ${itemPh(i)}>${itemFace(i)}<small>${esc(i.name)}</small></div>`).join('')}</div>
    <button class="wearBtn ${worn?'done':''}" data-wearday="${idx}">${worn?t('Worn today'):t('Wear today')}</button></div>
   <div class="week6">${rest.map(j=>{const x=S.week.days[j];const wd=new Date(x.date).toLocaleDateString(loc,{weekday:'short'});return `<button data-day="${j}"><b>${esc(wd)}</b><span>${x.event!=='Normal day'?esc(t(x.event)):esc(x.title)}</span></button>`;}).join('')}</div>
   <button class="trendCard" id="trendCard">${SV(ICONS.trend)}<b>${t('Ruby\'s trends')} · ${esc(month)}<small>${t('Your monthly style report')}</small></b>${SV(ICONS.chev,'style="width:18px;height:18px;color:var(--muted)"')}</button>`;
}
$('#vipHome').addEventListener('click',e=>{const b=e.target.closest('[data-wearday]');if(!b)return;const d=S.week.days[+b.dataset.wearday];markWorn(d.ids);renderVipHome();toast(t('Saved as today\'s outfit'));});

/* ====================== v5: WARDROBE ====================== */
function renderWardrobe(){
  if(wTab==='stats')wTab='avatar';
  $$('[data-wt]').forEach(x=>x.classList.toggle('on',x.dataset.wt===wTab));
  const isAv=wTab==='avatar';$('#wAv').classList.toggle('on',isAv);$('#wBody').style.display=isAv?'none':'block';
  $('#wFilters').style.display=$('#wSeason').style.display=wTab==='items'?'flex':'none';
  if(isAv){if(!av3&&!$('#avStage .svgwrap'))avMount();else renderAvTab();return;}else avDestroy();
  if(wTab==='items'){
    $('#wFilters').innerHTML=['All',...CATS].map(c=>`<button class="chip ${c===wCat?'on':''}" data-f="${c}">${t(c)}</button>`).join('');
    $('#wSeason').innerHTML=[['all','All seasons'],['summer','Summer'],['winter','Winter']].map(([k,l])=>`<button class="chip ${k===wSea?'on':''}" data-se="${k}">${t(l)}</button>`).join('')+`<button class="chip ${wFav?'on':''}" data-fv="1">${t('Favorites')}</button>`;
    const items=allItems().filter(i=>(wCat==='All'||i.cat===wCat)&&(wSea==='all'||season(i)===wSea||season(i)==='all')&&(!wFav||S.fav[i.id]));
    $('#wBody').innerHTML=items.length?`<div class="wgrid">${items.map(it=>`<button class="item ${S.laundry[it.id]?'laundry':''}" data-item="${it.id}"><div class="ph" ${itemPh(it)}>${itemFace(it)}</div><div class="tags">${S.fav[it.id]?`<span>${SV(ICONS.heart,'style="width:13px;height:13px;color:#fff"')}</span>`:''}</div><div class="meta"><b>${esc(it.name)}</b><small class="muted">${t(it.cat)} · ${wornTxt(it.id)}${S.laundry[it.id]?' · '+t('In the laundry'):''}</small></div></button>`).join('')}</div>`
      :`<p class="muted" style="text-align:center;margin-top:40px">${t('Nothing here yet. Tap ＋ to scan clothes.')}</p>`;
  }else{
    $('#wBody').innerHTML=S.saved.length?S.saved.map((o,k)=>{const items=o.ids.map(findItem).filter(Boolean);return `<div class="saved"><b>${esc(o.title||t('Outfit'))}</b><div class="row4">${items.slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div><div style="display:flex;gap:6px"><button class="btn primary sm" data-swear="${k}">${t('Wear today')}</button><button class="btn ghost sm" data-sav="${k}" style="width:auto;padding:0 14px">${SV(ICONS.avatar,'style="width:18px;height:18px"')}</button><button class="btn ghost sm" data-sdel="${k}" style="width:auto;padding:0 14px">${t('Remove')}</button></div></div>`;}).join('')
      :`<p class="muted" style="text-align:center;margin-top:40px">${t('No saved outfits yet. Tap the bookmark on an outfit to save it.')}</p>`;
  }
}
/* avatar chips */
let avCat='Top';
function renderAnimBar(){$('#animBar').innerHTML=[['walk','walk'],['pose','pose'],['spin','spin']].map(([k,e])=>`<button data-anim="${k}" class="${avAnim===k?'on':''}" aria-label="${k}">${SV(ICONS[e])}${S.vip?'':`<span class="k">${SV(ICONS.crown,'style="width:11px;height:11px;color:#D4AF37"')}</span>`}</button>`).join('');}
function renderAvTab(){
  const a=S.avatar;const cats=CATS.filter(c=>allItems().some(i=>i.cat===c));
  const chips=[...cats.map(c=>[c,t(c)]),['Look',t('Look')],['Room',t('Room')]];
  $('#avChips').innerHTML=chips.map(([k,l])=>`<button class="chip ${avCat===k?'on':''}" data-avc="${k}">${l}</button>`).join('')+`<button class="chip" id="avShareChip">${SV(ICONS.share)}${t('Share')}</button>`;
  let h='';
  if(CATS.includes(avCat)){const items=allItems().filter(i=>i.cat===avCat);
    h=`<div class="tileRow"><button class="opt none ${!a.wear[avCat]?'on':''}" data-wear="${avCat}" data-id="">${t('None')}</button>${items.map(i=>`<button class="opt ${a.wear[avCat]===i.id?'on':''}" data-wear="${avCat}" data-id="${i.id}" ${itemPh(i)} aria-label="${esc(i.name)}">${itemFace(i)}</button>`).join('')}</div>
      <button class="btn ghost sm" id="avDress" style="margin-top:10px">${t('Dress me for today')}</button>`;}
  else if(avCat==='Look'){avTab='look';const keep=avTab;h=lookHTML();}
  else {h=roomHTML();}
  $('#avSlots').innerHTML=h;
}
function lookHTML(){const a=S.avatar;let h='';
  h+=`<button class="btn ghost sm" id="avSelfie" style="margin-top:8px">${t('Recreate from a selfie')}</button>`;
  h+=`<div class="slot"><h4>${t('Skin')}</h4><div class="opts">${SKINS.map(c=>`<button class="sw ${a.skin===c?'on':''}" data-skin="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div></div>`;
  h+=`<div class="slot"><h4>${t('Hair color')}</h4><div class="opts">${HAIRS.map(c=>`<button class="sw ${a.hair===c?'on':''}" data-hair="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div></div>`;
  h+=`<div class="slot"><h4>${t('Hairstyle')}</h4><div class="opts">${HS_ALL.map(s=>{const lk=!S.vip&&!HS_FREE.includes(s);return `<button class="opt optw ${(a.hairStyle||'')===s?'on':''} ${lk?'lockd':''}" data-hs="${s}">${t({short:'Short',long:'Long',bun:'Bun',curly:'Curly',ponytail:'Ponytail',braids:'Braids'}[s])}</button>`;}).join('')}</div></div>`;
  h+=`<div class="slot"><h4><span>${t('Face details')}</span>${S.vip?'':'<span class="goldBadge">Gold</span>'}</h4><div class="opts">${LIPS.map(c=>`<button class="sw ${a.lips===c?'on':''}" data-lips="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div>
    <div class="opts" style="margin-top:8px">${[['blush','Blush'],['freckles','Freckles'],['glasses','Glasses'],['earrings','Earrings']].map(([k,l])=>`<button class="opt optw ${a[k]?'on':''} ${S.vip?'':'lockd'}" data-fd="${k}">${t(l)}</button>`).join('')}</div></div>`;
  h+=`<div class="slot"><h4>${t('Eyes')}</h4><div class="opts">${EYES.map(c=>`<button class="sw ${a.eyes===c?'on':''}" data-eyes="${c}" style="background:${c}" aria-label="${c}"></button>`).join('')}</div></div>`;
  h+=`<div class="slot"><h4>${t('Body')}</h4><div class="opts">${['slim','regular','curvy'].map(s=>`<button class="opt optw ${a.body===s?'on':''}" data-body="${s}">${t({slim:'Slim',regular:'Regular',curvy:'Curvy'}[s])}</button>`).join('')}</div></div>`;
  h+=`<div class="slot"><h4><span>${t('Height')}</span></h4><input type="range" id="avH" min="0.92" max="1.08" step="0.01" value="${a.height}" aria-label="${t('Height')}"></div>`;
  return h;}
function roomHTML(){const a=S.avatar;return `<div class="slot"><h4>${t('Dressing room')}</h4><div class="opts" style="flex-wrap:wrap">${ROOMS_ALL.map(r=>{const lock=!S.vip&&!ROOMS_FREE.includes(r);return `<button class="opt optw ${a.room===r?'on':''} ${lock?'lockd':''}" data-room="${r}">${t({modern:'Modern',beach:'Beach',boutique:'Boutique',runway:'Runway',paris:'Paris',night:'Night',gold:'Gold Lounge'}[r])}</button>`;}).join('')}</div></div>${S.vip?'':`<button class="lockrow" id="avGoGold">${t('Gold unlocks all rooms, hairstyles, face details and moves.')}</button>`}`;}
$('#avChips').addEventListener('click',e=>{if(e.target.closest('#avShareChip')){shareAvatar();return;}const b=e.target.closest('[data-avc]');if(!b)return;avCat=b.dataset.avc;renderAvTab();});

/* ====================== v5: CHAT (challenge, streaks, reactions, stickers) ====================== */
const CHALLENGES=['All in white','Total black','One bold color','Vintage vibes','Sporty chic','Monochrome','Layers','Your comfiest look','Denim on denim','Elegant evening'];
let challengeMode=false;
function challengeToday(){const d=today();if(!S.challenge||S.challenge.d!==d){const k=Math.floor(new Date(d)/864e5)%CHALLENGES.length;S.challenge={d,theme:CHALLENGES[k],joined:false};save();}return S.challenge;}
function hoursLeft(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);return Math.max(1,Math.ceil((m-n)/36e5));}
function yesterday(){const d=new Date(today());d.setDate(d.getDate()-1);return d.toISOString().slice(0,10);}
function seedStreaks(){if(S.streaks)return;S.streaks={u1:{n:27,last:today()},u3:{n:9,last:today()},u2:{n:4,last:yesterday()}};}
function streakOf(id){seedStreaks();const s=S.streaks[id];if(!s)return null;if(s.last!==today()&&s.last!==yesterday())return null;return {n:s.n,warn:s.last===yesterday()};}
function bumpStreak(id){seedStreaks();const s=S.streaks[id]||{n:0,last:''};if(s.last===today())return;s.n=s.last===yesterday()?s.n+1:1;s.last=today();S.streaks[id]=s;}
function chatUnread(){return Object.values(S.chats||{}).some(a=>a.length&&a[a.length-1].f==='them'&&!a[a.length-1].read);}
function renderChat(){seedChats();seedStreaks();renderChallenge();renderStoryRow();renderChatList();}
function renderChallenge(){const c=challengeToday();const who=['u1','u3','u2'].filter(u=>!S.blocked[u]);
  $('#challenge').innerHTML=`<div class="challenge"><div class="lbl"><b>${t('DAILY CHALLENGE')}</b><span>${t('Ends in {h} h',{h:hoursLeft()})}</span></div>
   <div><h3>${esc(t(c.theme))}</h3><p>${t('Theme chosen by Ruby · your friends vote')}</p></div>
   <div class="foot"><div class="stack"><span style="display:flex">${who.map(u=>avHTML(u,30)).join('')}</span>${t('{n} friends posted',{n:who.length})}</div>
   <button class="go ${c.joined?'done':''}" data-chal="1">${c.joined?t('Posted'):t('Join')}</button></div></div>`;}
function renderChatList(){
  const q=($('#chatSearch').value||'').trim().toLowerCase();let h='';
  if(S.requests.length&&!q)h+=`<button class="reqLine" id="reqBar"><span>${t('Message requests')}</span><span>${S.requests.length}</span></button>`;
  const lastR=S.ruby[S.ruby.length-1];
  if(!q||'ruby'.includes(q))h+=`<button class="crow rubyRow" data-ruby="1"><span class="av" style="width:52px;height:52px">${SV(ICONS.sparkle)}</span><span class="t"><b>${t('Ruby · your stylist')}</b><small class="muted">${lastR?esc(lastR.text).slice(0,70):t('Ask me what to wear today')}</small></span></button>`;
  const rows=[];
  S.groups.forEach(g=>{if(!q||g.name.toLowerCase().includes(q))rows.push({id:g.id,name:g.name,av:g.dm?`<span class="av" style="width:52px;height:52px;font-size:19px;background:${g.color}">${initials(g.name)}</span>`:`<span class="av grpAv" style="width:52px;height:52px">${SV(ICONS.group,'style="width:24px;height:24px;color:#fff"')}</span>`});});
  Object.entries(USERS).forEach(([id,u])=>{if(!S.blocked[id]&&(!q||u.name.toLowerCase().includes(q)||u.handle.includes(q)))rows.push({id,name:u.name,av:avHTML(id,52)});});
  rows.sort((a,b)=>(streakOf(b.id)?.n||0)-(streakOf(a.id)?.n||0));
  h+=rows.map(r=>{const a=S.chats[r.id]||[];const m=a[a.length-1];const st=streakOf(r.id);const unread=m&&m.f==='them'&&!m.read;
    let pv=m?previewV5(r.id,m):t('Say hi');if(st&&st.warn)pv=t('Your streak ends tonight, send a message');
    return `<button class="crow" data-room="${r.id}">${r.av}<span class="t"><b>${esc(r.name)}</b><small class="${unread||(st&&st.warn)?'strong':'muted'}">${pv}</small></span><span class="meta">${st?`<span class="flame ${st.warn?'warn':''}">${SV(ICONS.flame)}${st.n}</span>`:''}${unread?'<span class="udot"></span>':''}</span></button>`;}).join('');
  $('#convs').innerHTML=h||`<p class="muted" style="text-align:center;margin-top:40px">${t('No results.')}</p>`;
}
function previewV5(id,m){const who=m.f==='me'?t('You')+': ':'';
  if(m.f==='me'&&m.rx&&m.rx.length){const r=roomInfo(id);return t('{n} reacted to your message',{n:esc((r.name||'').split(' ')[0])});}
  if(m.sticker)return who+t('Sticker');if(m.a)return who+t('Voice message');if(m.img)return who+t('Photo');if(m.outfit)return who+t('Outfit');if(m.short)return who+'Short';if(m.f==='sys')return esc(m.t);return who+esc(m.t||'');}
$('#clist').onclick=e=>{
  if(e.target.closest('[data-chal]')){if(challengeToday().joined)return;challengeMode=true;openPoster();return;}
  if(e.target.closest('#reqBar')){openRequests();return;}
  if(e.target.closest('[data-ruby]')){show('ruby');return;}
  const r=e.target.closest('[data-room]');if(r){const a=S.chats[r.dataset.room]||[];if(a.length)a[a.length-1].read=true;save();openRoom(r.dataset.room);}
};
$('#searchBtn').onclick=()=>{const b=$('#searchBox');b.hidden=!b.hidden;if(!b.hidden)$('#chatSearch').focus();else{$('#chatSearch').value='';renderChatList();}};
$('#chatSearch').oninput=renderChatList;
function pushMsg(id,m){seedChats();(S.chats[id]=S.chats[id]||[]).push(m);if(m.f==='me')bumpStreak(id);save();if(current==='room'&&roomId===id)renderMsgs();
  const r=roomInfo(id);if(m.f==='me'&&!r.dm){setTimeout(()=>{const by=r.group?pick(r.members):id;
    if((m.outfit||m.sticker||m.img)&&Math.random()<.85){m.rx=m.rx||[];if(!m.rx.length)m.rx.push(pick(['heart','flame','crown']));}
    S.chats[id].push({f:'them',by,t:pick(REPLIES)});save();if(current==='room'&&roomId===id)renderMsgs();},1300);}}
function renderMsgs(){const box=$('#msgs');box.innerHTML=`<div class="daytag">${t('Today')}</div>`;const r=roomInfo(roomId);const st=streakOf(roomId);
  if(st)box.insertAdjacentHTML('beforeend',`<div class="daytag"><span class="flame ${st.warn?'warn':''}" style="justify-content:center">${SV(ICONS.flame)}${t('{n}-day streak',{n:st.n})}</span></div>`);
  (S.chats[roomId]||[]).forEach((m,k)=>{const d=document.createElement('div');
    if(m.f==='sys'){d.className='daytag';d.textContent=m.t;box.appendChild(d);return;}
    d.className='m '+(m.f==='me'?'me':'them')+(m.sticker?' sticker':'')+(m.rx&&m.rx.length?' hasrx':'');d.dataset.k=k;
    if(r.group&&m.f!=='me'&&m.by)d.innerHTML=`<span class="from">${esc(USERS[m.by]?.name||'')}</span>`;
    if(m.a){const a=document.createElement('audio');a.controls=true;a.src=m.a;d.appendChild(a);}
    else if(m.sticker){const it=findItem(m.sticker);d.insertAdjacentHTML('beforeend',`<div class="stk" ${it?itemPh(it):''}>${it?itemFace(it):''}</div>`);}
    else if(m.img){d.insertAdjacentHTML('beforeend',`<img src="${m.img}" alt="">`);}
    else if(m.outfit){const its=m.outfit.map(findItem).filter(Boolean);d.insertAdjacentHTML('beforeend',`<div class="card4">${its.slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div>${t('What do you think of this outfit?')}`);}
    else if(m.short){const p=findPost(m.short);d.insertAdjacentHTML('beforeend',`<b>Short</b> · ${p?esc(p.cap||''):''}`);}
    else d.insertAdjacentHTML('beforeend',esc(m.t));
    if(m.rx&&m.rx.length)d.insertAdjacentHTML('beforeend',`<span class="rx">${m.rx.map(x=>SV(ICONS[x])).join('')}</span>`);
    box.appendChild(d);});box.scrollTop=box.scrollHeight;}
(function(){return;let lt=0,lk=null,hold=null;const box=$('#msgs');
  const open=k=>{const m=S.chats[roomId][k];if(!m||m.f==='sys')return;
    openSheet(`<h3>${t('React')}</h3><div class="rxbar">${['heart','flame','crown','star'].map(x=>`<button data-rx="${x}" aria-label="${x}">${SV(ICONS[x])}</button>`).join('')}</div>`);
    $('#sheet').querySelectorAll('[data-rx]').forEach(b=>b.onclick=()=>{m.rx=[b.dataset.rx];save();closeSheet();renderMsgs();});};
  box.addEventListener('pointerdown',e=>{const el=e.target.closest('.m');if(!el)return;hold=setTimeout(()=>open(+el.dataset.k),450);});
  box.addEventListener('pointerup',e=>{clearTimeout(hold);const el=e.target.closest('.m');if(!el)return;const now=Date.now();if(now-lt<320&&lk===el.dataset.k){open(+el.dataset.k);lt=0;}else{lt=now;lk=el.dataset.k;}});
  box.addEventListener('pointercancel',()=>clearTimeout(hold));})();
$('#attachBtn').onclick=()=>{openSheet(`<h3>${t('Send')}</h3>
  <button class="srow" id="atPhoto"><div class="l"><b>${t('Photo from gallery')}</b><small class="muted">${t('Photos are checked by AI to block inappropriate images')}</small></div></button>
  <button class="srow" id="atOutfit"><div class="l"><b>${t('Outfit from my wardrobe')}</b></div></button>
  <button class="srow" id="atSticker"><div class="l"><b>${t('Sticker of my clothes')}</b><small class="muted">${t('Turn any item of your wardrobe into a sticker')}</small></div></button>`);
  $('#atPhoto').onclick=async()=>{const f=await pickFile('image/*');if(!f)return;const img=await downscale(await readFile(f),800,.8);setSheet(`<img class="preview" src="${img}"><div class="why"><span class="spin"></span><span>${t('Checking the photo…')}</span></div>`);
    if(AI&&AI_IMG){try{const r=await AI.json(`Does this image contain nudity, sexual content, graphic violence or gore? It will be sent in a chat on an app used by teenagers. Return JSON only: {"safe":true|false}`,{images:[dataUrlToBlob(img)],modelTier:'quick'});
      if(r&&r.safe===false){setSheet(`<div class="verdict bad"><span></span><span><b>${t('Photo blocked')}</b><br>${t('This image is not allowed on R-Style.')}</span></div>`);return;}}catch(_){}}
    closeSheet();pushMsg(roomId,{f:'me',img:await downscale(img,500,.75)});};
  $('#atOutfit').onclick=()=>{const opts=[...(S.today?.list||[]),...S.saved];if(!opts.length){toast(t('No outfits yet'));return;}
    setSheet(`<h3>${t('Choose an outfit')}</h3>${opts.map((o,k)=>`<button class="saved" style="width:100%;text-align:start" data-po="${k}"><b>${esc(o.title||t('Outfit'))}</b><div class="row4">${o.ids.map(findItem).filter(Boolean).slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-po]').forEach(b=>b.onclick=()=>{closeSheet();pushMsg(roomId,{f:'me',outfit:opts[+b.dataset.po].ids});});};
  $('#atSticker').onclick=()=>{const items=allItems();setSheet(`<h3>${t('Sticker of my clothes')}</h3><div class="wgrid" style="margin-top:12px">${items.map(i=>`<button class="item" data-stk="${i.id}"><div class="ph" ${itemPh(i)}>${itemFace(i)}</div><div class="meta"><b>${esc(i.name)}</b></div></button>`).join('')}</div>`);
    $('#sheet').querySelectorAll('[data-stk]').forEach(b=>b.onclick=()=>{closeSheet();pushMsg(roomId,{f:'me',sticker:b.dataset.stk});});};};

/* ====================== v5: PROFILE ====================== */
function statsHTML(){
  const items=allItems();const month=today().slice(0,7);const wornMonth=new Set();Object.values(S.worn).forEach(a=>a.forEach(d=>{if(d.startsWith(month))wornMonth.add(d);}));
  const byCat=CATS.map(c=>[c,items.filter(i=>i.cat===c).length]).filter(x=>x[1]);const max=Math.max(1,...byCat.map(x=>x[1]));
  const colors={};items.forEach(i=>{const k=i.colorName||'?';colors[k]=(colors[k]||{n:0,c:i.color});colors[k].n++;});const topC=Object.entries(colors).sort((a,b)=>b[1].n-a[1].n).slice(0,5);
  const most=items.filter(i=>(S.worn[i.id]||[]).length).sort((a,b)=>S.worn[b.id].length-S.worn[a.id].length).slice(0,3);const idle=items.filter(i=>(lastWorn(i.id)??999)>30).slice(0,6);
  return `<h3>${t('My wardrobe')}</h3><div class="big3" style="margin-top:12px"><div><b>${items.length}</b><small>${t('Clothes')}</small></div><div><b>${S.saved.length}</b><small>${t('Saved outfits')}</small></div><div><b>${wornMonth.size}</b><small>${t('Days logged this month')}</small></div></div>
  <div class="stat"><h4>${t('By type')}</h4>${byCat.map(([c,n])=>`<div class="bar"><span>${t(c)}</span><i style="width:${n/max*60}%"></i><b>${n}</b></div>`).join('')}</div>
  <div class="stat"><h4>${t('Your colors')}</h4><div style="display:flex;gap:10px;flex-wrap:wrap">${topC.map(([k,v])=>`<div style="text-align:center;font-size:11px"><div style="width:38px;height:38px;border-radius:50%;background:${v.c};border:1px solid var(--line);margin:0 auto 4px"></div>${esc(k)} · ${v.n}</div>`).join('')}</div></div>
  <div class="stat"><h4>${t('Most worn')}</h4>${most.length?most.map(i=>`<div class="bar"><span>${esc(i.name)}</span><b>${S.worn[i.id].length}×</b></div>`).join(''):`<span class="muted" style="font-size:13px">${t('Tap "Wear today" on an outfit to start tracking.')}</span>`}</div>
  <div class="stat"><h4>${t('Not worn for 30+ days')}</h4><span class="muted" style="font-size:13px">${idle.map(i=>esc(i.name)).join(' · ')||'—'}</span></div>`;}
function renderMe(){
  const p=me();if(!p.username)return;const sc=lookScore();
  $('#meHandle').innerHTML='@'+esc(p.username)+(S.vip?` ${SV(ICONS.crown,'style="width:18px;height:18px;color:#D4AF37;vertical-align:-2px" fill="#D4AF37"')}`:'');
  renderNavMe();
  const items=allItems().length,month=today().slice(0,7);const days=new Set();Object.values(S.worn).forEach(a=>a.forEach(d=>{if(d.startsWith(month))days.add(d);}));
  $('#meBody').innerHTML=`<div class="meTop ${S.vip?'goldp':''}">${avHTML('me',80)}<div>
      ${S.vip?'<span class="memberTag">GOLD</span>':''}
      <div class="meStats" style="margin-top:${S.vip?8:0}px"><div><b>${S.posts.length}</b><small>${t('Posts')}</small></div><div><b>0</b><small>${t('Followers')}</small></div><div><b>${Object.values(S.following).filter(Boolean).length}</b><small>${t('Following')}</small></div></div>
      <span class="scorePill">AI Style Score <i>${sc==null?'—':sc}</i></span></div></div>
    ${S.vip?`<div class="linkList">
      <button data-ml="trend">${SV(ICONS.trend)}<span style="flex:1">${t('Monthly trends')}</span><span class="chev">${SV(ICONS.chev)}</span></button>
      <button data-ml="missing">${SV(ICONS.bag)}<span style="flex:1">${t('What\'s missing in my wardrobe')}</span><span class="chev">${SV(ICONS.chev)}</span></button>
      <button data-ml="contest">${SV(ICONS.trophy)}<span style="flex:1">${t('Monthly contest')}</span><span class="chev">${SV(ICONS.chev)}</span></button>
      <button data-ml="perks">${SV(ICONS.crown)}<span style="flex:1">${t('All my Gold benefits')}</span><span class="chev">${SV(ICONS.chev)}</span></button></div>`
    :`<button class="goldBanner" data-ml="gold">${SV(ICONS.crown)}<span style="flex:1"><b>${t('Discover Gold Style')}</b><small>${t('7 days free · full avatar, Ruby\'s week')}</small></span>${SV(ICONS.chev,'style="width:18px;height:18px;color:var(--muted)"')}</button>`}
    <div class="secTitle"><span>${t('My wardrobe')}</span><button data-ml="stats">${t('See all')}</button></div>
    <div class="mini3"><div><b>${items}</b><small>${t('Clothes')}</small></div><div><b>${S.saved.length}</b><small>${t('Outfits')}</small></div><div><b>${days.size}</b><small>${t('Days logged')}</small></div></div>
    <div class="secTitle"><span>${t('My posts')}</span><button data-ml="rate">${t('Rate a look')}</button></div>
    <div class="vgrid" style="padding:0 18px">${S.posts.length?S.posts.map(x=>`<div style="background-image:url(${x.img});border-radius:10px"><span>${x.score?'Ruby '+x.score:''}</span></div>`).join(''):`<p class="muted" style="grid-column:1/-1;text-align:center;padding:30px">${t('Share your first look in Shorts ＋')}</p>`}</div>`;
}
$('#meBody').addEventListener('click',e=>{const b=e.target.closest('[data-ml]');if(!b)return;const k=b.dataset.ml;
  if(k==='trend')openTrend();if(k==='missing')openMissing();if(k==='contest')openContest();if(k==='perks')openPerks();if(k==='gold')openVip('me');if(k==='rate')openLookRater();
  if(k==='stats'){openSheet(statsHTML()+missingCard());}});
$('#sheet').addEventListener('click',e=>{if(e.target.closest('#missBtn'))openMissing();if(e.target.closest('#missLock'))openVip(current);});
function openPerks(){
  const P=[['avatar','Full 3D avatar','All rooms, hairstyles, face details and moves',()=>{closeSheet();openAvTab();}],
    ['calendar','Weekly plan','Ruby plans an outfit for each day',()=>{closeSheet();show('home');}],
    ['trend','Monthly trends','Your personal style report',()=>{closeSheet();openTrend();}],
    ['bag','What\'s missing','The pieces that unlock the most outfits',()=>{closeSheet();openMissing();}],
    ['sparkle','Unlimited Ruby','Ask as much as you want',()=>{closeSheet();show('ruby');}],
    ['palette','Black & gold app','Gold colors, white & gold mode, accent colors',()=>{closeSheet();openOverlay('settings');renderSettings();}],
    ['crown','Gold profile','Gold frame and badge',()=>{closeSheet();show('me');}]];
  openSheet(`<div style="text-align:center"><h2 class="goldtxt" style="margin:0;font-size:30px">Gold Style</h2><p class="muted" style="margin:4px 0 8px;font-size:13px">${S.trialEnd>Date.now()?t('Free trial until {d}',{d:new Date(S.trialEnd).toLocaleDateString()}):(S.plan==='year'?t('100 ₪/year'):t('10 ₪/month'))}</p></div>
   ${P.map((p,i)=>`<button class="perk" data-perk="${i}"><span class="e">${SV(ICONS[p[0]])}</span><div><b>${t(p[1])}</b><small>${t(p[2])}</small></div><span class="go">${t('Open')}</span></button>`).join('')}`);
  $('#sheet').querySelectorAll('[data-perk]').forEach(b=>b.onclick=()=>P[+b.dataset.perk][3]());
}


/* ====================== v6: ALL LANGUAGES (Ruby translates the whole app once, then it's saved) ====================== */
const I18N_KEEP=['R-Style','Gold Style','Ruby','AI Style Score','Shorts','SHEIN','Gold','VIP','R·Style'];
function langComplete(c){if(c==='en')return true;const base=(window.I18N||{}).fr||{};const d=(window.I18N||{})[c];if(!d)return false;return Object.keys(base).every(k=>k in d);}
function langReady(c){if(c==='en')return true;const d=(window.I18N||{})[c];return !!d&&priorityKeys().every(k=>k in d);}
function loadCachedLang(c){try{const raw=localStorage.getItem('rstyle_i18n_'+c);if(raw){window.I18N[c]=Object.assign(JSON.parse(raw),window.I18N[c]||{});}}catch(_){}}
function langOverlay(on,pct,name){let o=$('#langFx');if(!o){o=document.createElement('div');o.id='langFx';$('#app').appendChild(o);}
  o.className=on?'on':'';if(on)o.innerHTML=`<div class="lfx"><div class="lfxIc">${SV(ICONS.sparkle)}</div><b>${esc(name)}</b><p>${pct<100?'Ruby…':'✓'}</p><div class="lbar"><i style="width:${pct}%"></i></div><button class="lcancel" id="langCancelBtn">Cancel · Annuler · ביטול · إلغاء</button></div>`;const cb=$('#langCancelBtn');if(cb)cb.onclick=()=>{langCancel=true;langOverlay(false);};}
function priorityKeys(){const set=new Set();document.querySelectorAll('[data-t],[data-tp]').forEach(el=>{const k=el.dataset.t||el.dataset.tp;if(k)set.add(k);});
  ['Continue','Send code','Verify','Skip','Create my wardrobe','Message…','Ask Ruby about style…','Good morning','Hello','Good evening','Here is your look for today','Wear today','Worn today','Save','My avatar','Show Ruby 3 looks to unlock your score ({n}/3). Tap here.','Based on your looks from the last 30 days. Tap to add a look.','Ruby is preparing your outfits…','Your week by Ruby','Today','Ruby\'s trends','Your monthly style report','Mild','Hot & sunny','Rainy','Cold','Welcome to R-Style ✨','Email verified','Woman','Man','Prefer not to say','We sent a 6-digit code to {e}.','Demo: in the real app this code arrives by email. Your code is','Please enter a valid email.','Wrong code. Check it and try again.','At least 3 characters','@{u} is already taken','@{u} is available','Age must be between 13 and 99.',...STYLES].forEach(k=>set.add(k));
  return [...set];}
let bgTranslating=null,langCancel=false;
async function translateKeys(c,keys,onProgress,par){const L=LANGS.find(l=>l.c===c);const chunks=[];for(let i=0;i<keys.length;i+=40)chunks.push(keys.slice(i,i+40));let done=0;
  const work=async ch=>{if(langCancel&&onProgress)return;const obj={};ch.forEach(k=>obj[k]=k);
    for(let attempt=0;attempt<2;attempt++){try{
      const v=await AI.json(`Translate the VALUES of this JSON object from English into ${L.n} (language code "${c}") for the user interface of a fashion app used by teenagers. Short, natural, friendly UI wording. Keep every {placeholder} exactly as written. Do not translate these names: ${I18N_KEEP.join(', ')}. Keep emojis, symbols (₪, ·, ×, %) and numbers. Return JSON only: the same keys with translated values.\n\n${JSON.stringify(obj)}`,{modelTier:'quick'});
      if(v&&typeof v==='object'){ch.forEach(k=>{const x=v[k];if(typeof x==='string'&&x.trim()&&(k.match(/\{\w+\}/g)||[]).every(ph=>x.includes(ph)))window.I18N[c][k]=x;});break;}}catch(e){if(e&&e.code==='rate_limited')await new Promise(r=>setTimeout(r,1500));}}
    done+=ch.length;onProgress&&onProgress(done/keys.length);};
  for(let i=0;i<chunks.length;i+=par)await Promise.all(chunks.slice(i,i+par).map(work));
  try{localStorage.setItem('rstyle_i18n_'+c,JSON.stringify(window.I18N[c]));}catch(_){}}
async function translateTo(c){
  const L=LANGS.find(l=>l.c===c);const base=window.I18N.fr;window.I18N[c]=window.I18N[c]||{};
  const todo=Object.keys(base).filter(k=>!(k in window.I18N[c]));if(!todo.length)return true;
  for(let i=0;i<30&&!AI;i++)await new Promise(r=>setTimeout(r,200));
  if(!AI)return false;
  const pri=priorityKeys().filter(k=>todo.includes(k));const rest=todo.filter(k=>!pri.includes(k));
  langCancel=false;
  if(pri.length){langOverlay(true,5,L.n);await translateKeys(c,pri,f=>{if(!langCancel)langOverlay(true,Math.max(5,Math.round(f*100)),L.n);},pri.length);if(langCancel){langOverlay(false);return 'cancel';}langOverlay(true,100,L.n);setTimeout(()=>langOverlay(false),250);}
  if(rest.length){bgTranslating=c;translateKeys(c,rest,null,4).then(()=>{bgTranslating=null;if(S.lang===c){applyLang();if(current&&!['lang','signup'].includes(current))show(current);}});}
  return true;
}
async function setLanguage(c){
  if(c!=='en'&&!langComplete(c)){loadCachedLang(c);
    if(!langComplete(c)){const ok=await translateTo(c);if(ok==='cancel')return false;
      if(!ok&&!langReady(c)){toast('This language needs Ruby: open the app in Claude.');return false;}}}
  S.lang=c;save();applyLang();if(current&&!['lang','signup'].includes(current))show(current);return true;
}

/* ====================== START ====================== */
hydrate();if(S.lang){loadCachedLang(S.lang);if(!langComplete(S.lang))setTimeout(()=>{if(S.lang&&!langComplete(S.lang))translateTo(S.lang);},1500);}trialCheck();applyTheme();applyLang();renderLangs();
if(!S.lang)show('lang');else show(S.profile?'home':'splash');
if(S.profile)renderMe();
