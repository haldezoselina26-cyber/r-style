'use strict';
/* ====================== v10: real server (Supabase) — only on the real website ====================== */
const SB_URL='https://gnctjjexhzeavxnpbckm.supabase.co',SB_KEY='sb_publishable_kQ6kHtZNjnyFpjonIuwABg_IYeH4qQW';
let SB=null,ME_ID=null,SBchan=null;
const REAL=/github\.io$/.test(location.hostname)||!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
(function(){const T={
 'Sending…':['Envoi…','שולח…','جارٍ الإرسال…'],
 'Check your mailbox (and spam). The code can take 1 minute.':['Regarde tes mails (et les spams). Le code peut prendre 1 minute.','תבדוק את המייל (וגם בספאם). הקוד יכול לקחת דקה.','تحقق من بريدك (والرسائل غير المرغوبة). قد يستغرق الرمز دقيقة.'],
 'Could not send the code. Wait a minute and try again.':['Impossible d\'envoyer le code. Attends une minute et réessaie.','לא הצלחנו לשלוח קוד. חכה דקה ונסה שוב.','تعذر إرسال الرمز. انتظر دقيقة وحاول مجددًا.'],
 'On R-Style':['Sur R-Style','ב-R-Style','على R-Style'],
 'For now, only text messages with real friends.':['Pour l\'instant, seulement des messages texte avec les vrais amis.','בינתיים רק הודעות טקסט עם חברים אמיתיים.','حاليًا رسائل نصية فقط مع الأصدقاء الحقيقيين.'],
 'You can only write to friends who follow you back.':['Tu peux écrire seulement aux amis qui te suivent aussi.','אפשר לכתוב רק לחברים שעוקבים אחריך בחזרה.','يمكنك الكتابة فقط للأصدقاء الذين يتابعونك.'],
 'Not sent. Check your internet.':['Pas envoyé. Vérifie ta connexion.','לא נשלח. תבדוק את האינטרנט.','لم يُرسل. تحقق من الإنترنت.'],
 'Welcome back {u}!':['Re-bonjour {u} !','ברוך שובך {u}!','مرحبًا بعودتك {u}!'],
 'Could not send the link. Wait a minute and try again.':['Impossible d\'envoyer le lien. Attends une minute et réessaie.','לא הצלחנו לשלוח קישור. חכה דקה ונסה שוב.','تعذر إرسال الرابط. انتظر دقيقة وحاول مجددًا.'],
 'Too many e-mails were sent. Try again in 1 hour.':['Trop d\'e-mails envoyés. Réessaie dans 1 heure.','נשלחו יותר מדי מיילים. נסה שוב בעוד שעה.','تم إرسال رسائل كثيرة. حاول بعد ساعة.'],
 'Allow the microphone to send a real voice message.':['Autorise le micro pour envoyer un vrai message vocal.','תאשר את המיקרופון כדי לשלוח הודעה קולית אמיתית.','اسمح للميكروفون بإرسال رسالة صوتية حقيقية.'],
 'For now, only text, photos and voice with real friends.':['Pour l\'instant : texte, photos et vocaux avec les vrais amis.','בינתיים: טקסט, תמונות והקלטות עם חברים אמיתיים.','حاليًا: نص وصور ورسائل صوتية مع الأصدقاء الحقيقيين.'],
 'New link sent':['Nouveau lien envoyé','נשלח קישור חדש','تم إرسال رابط جديد'],
 'We sent a link to {e}. Open it on this phone.':['On a envoyé un lien à {e}. Ouvre-le sur ce téléphone.','שלחנו קישור ל-{e}. תפתח אותו בטלפון הזה.','أرسلنا رابطًا إلى {e}. افتحه على هذا الهاتف.'],
 'Check your mailbox (and spam). It can take 1 minute.':['Regarde tes mails (et les spams). Ça peut prendre 1 minute.','תבדוק את המייל (וגם בספאם). זה יכול לקחת דקה.','تحقق من بريدك (والرسائل غير المرغوبة). قد يستغرق دقيقة.'],
 'Waiting for the link…':['En attente du lien…','מחכה לקישור…','بانتظار الرابط…']
};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

function loadSB(){return new Promise(res=>{if(window.supabase)return res(true);const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';s.onload=()=>res(!!window.supabase);s.onerror=()=>res(false);document.head.appendChild(s);});}
const rid=uuid=>'r_'+uuid,uuidOf=id=>String(id).startsWith('r_')?id.slice(2):null;
function addReal(p){const id=rid(p.id);if(!USERS[id])USERS[id]={name:p.username,handle:p.username,followers:0,following:0,score:'—',color:p.color||'#555',bio:'',real:true};if(p.bday)USERS[id].birth='2000-'+p.bday;return id;}

/* ---------- sign-up with a real e-mail code ---------- */
function bindRealSignup(){
  const prevNext=$('#suNext').onclick;
  $('#suNext').onclick=async function(){
    if(!validate())return;const btn=$('#suNext');
    if(step===0){btn.disabled=true;btn.textContent=t('Sending…');
      const {error}=await SB.auth.signInWithOtp({email:D.email,options:{shouldCreateUser:true,emailRedirectTo:location.origin+location.pathname}});
      btn.disabled=false;if(error){const rl=/rate|limit|429/i.test((error.message||'')+(error.status||''));$('#emailErr').textContent=rl?t('Too many e-mails were sent. Try again in 1 hour.'):t('Could not send the link. Wait a minute and try again.')+' ('+(error.message||error.status||'')+')';renderStep();return;}
      try{localStorage.setItem('rstyle_pending_email',D.email);}catch(_){}
      step=1;renderStep();linkWait();return;}
    if(step===1){btn.disabled=true;
      const {data,error}=await SB.auth.verifyOtp({email:D.email,token:D.code,type:'email'});btn.disabled=false;
      if(error||!data.session){$('#codeErr').textContent=t('Wrong code. Check it and try again.');renderStep();return;}
      ME_ID=data.session.user.id;
      const {data:prof}=await SB.from('profiles').select('*').eq('id',ME_ID).maybeSingle();
      if(prof){/* returning user on a new phone */S.profile=Object.assign({email:D.email,verified:true,gender:'woman',age:16,styles:['Chic'],private:true,joined:today()},S.profile||{},{username:prof.username,uid:ME_ID});save();applyTheme();await afterLogin();show('home');toast(t('Welcome back {u}!',{u:'@'+prof.username}));return;}
      step=2;renderStep();return;}
    if(step===2){btn.disabled=true;const {data:hit}=await SB.from('profiles').select('id').eq('username',D.user).maybeSingle();btn.disabled=false;
      if(hit){$('#userMsg').textContent=t('@{u} is already taken',{u:D.user});$('#userMsg').className='err';return;}}
    if(step===NSTEPS-1){prevNext();if(S.profile&&ME_ID){S.profile.uid=ME_ID;save();
        await SB.from('profiles').upsert({id:ME_ID,username:S.profile.username,color:'#E11D2E',bday:S.profile.birth?S.profile.birth.slice(5,10):null});await afterLogin();}return;}
    prevNext();};
  $('#resend').onclick=async()=>{await SB.auth.signInWithOtp({email:D.email,options:{shouldCreateUser:true,emailRedirectTo:location.origin+location.pathname}});toast(t('New link sent'));};
  const _rs=renderStep;renderStep=function(){_rs();if(step===1){$('#suCode').style.display='none';$('#codeSub').textContent=t('We sent a link to {e}. Open it on this phone.',{e:D.email});$('#codeDemo').innerHTML=`<span class="muted">${t('Check your mailbox (and spam). It can take 1 minute.')}</span>`;$('#suNext').disabled=true;$('#suNext').textContent=t('Waiting for the link…');}else $('#suCode').style.display='';};
}

let waitT=null;
function linkWait(){clearInterval(waitT);waitT=setInterval(async()=>{if(current!=='signup'||step!==1){clearInterval(waitT);return;}const {data:{session}}=await SB.auth.getSession();if(session){clearInterval(waitT);await signedIn(session);}},2500);}
async function signedIn(session){ME_ID=session.user.id;D.email=session.user.email||D.email;
  const {data:prof}=await SB.from('profiles').select('*').eq('id',ME_ID).maybeSingle();
  if(prof){S.profile=Object.assign({email:D.email,verified:true,gender:'woman',age:16,styles:['Chic'],private:true,joined:today()},S.profile||{},{username:prof.username,uid:ME_ID});if(prof.bday&&!S.profile.birth)S.profile.birth='2000-'+prof.bday;save();applyTheme();await afterLogin();show('home');toast(t('Welcome back {u}!',{u:'@'+prof.username}));return;}
  if(current!=='signup')startSignup();$('#suEmail').value=D.email;step=2;renderStep();toast('✅ '+t('Email verified'));}

/* ---------- load friends + messages, live updates ---------- */
async function afterLogin(){if(!ME_ID)return;
  const [{data:mine},{data:fans}]=await Promise.all([SB.from('follows').select('followee').eq('follower',ME_ID),SB.from('follows').select('follower').eq('followee',ME_ID)]);
  const ids=[...new Set([...(mine||[]).map(x=>x.followee),...(fans||[]).map(x=>x.follower)])];
  if(ids.length){const {data:ps}=await SB.from('profiles').select('*').in('id',ids);(ps||[]).forEach(addReal);}
  Object.keys(S.following).forEach(k=>{if(k.startsWith('r_'))delete S.following[k];});
  (mine||[]).forEach(x=>{S.following[rid(x.followee)]=true;});
  S.realFans={};(fans||[]).forEach(x=>{S.realFans[rid(x.follower)]=true;});
  await syncMessages();listen();save();if(current==='chat')renderChat();}
async function syncMessages(){const {data}=await SB.from('messages').select('*').or(`sender.eq.${ME_ID},receiver.eq.${ME_ID}`).order('created_at',{ascending:true}).limit(1000);
  const by={};(data||[]).forEach(m=>{const other=m.sender===ME_ID?m.receiver:m.sender;const id=rid(other);(by[id]=by[id]||[]).push(toLocal(m));});
  Object.keys(S.chats).forEach(k=>{if(k.startsWith('r_'))delete S.chats[k];});Object.assign(S.chats,by);
  try{await signAll(Object.values(by).flat());}catch(_){}
  const unknown=Object.keys(by).filter(id=>!USERS[id]).map(uuidOf);if(unknown.length){const {data:ps}=await SB.from('profiles').select('*').in('id',unknown);(ps||[]).forEach(addReal);}}
function toLocal(m){const mine=m.sender===ME_ID;const x={f:mine?'me':'them',ts:Date.parse(m.created_at),dbid:m.id,st:mine?(m.read_at?'read':'delivered'):undefined,read:!mine&&!!m.read_at};
  const k=m.kind||'text';if(k==='text')x.t=m.body;else if(k==='voice'){x.voice=1;x.dur=m.body||'0:05';x.media=m.media;}else if(k==='video'){x.isVid=1;x.vid='';x.dur=m.body||'';x.media=m.media;}else{x.media=m.media;x.once=k==='once';x.filter=x.once?null:m.body;x.img=x.once&&!m.media?'':(x.img||'');if(x.once&&!m.media)x.opened=true;}return x;}
async function signAll(list){const need=list.filter(x=>x.media&&!x.url);if(!need.length)return;
  const {data}=await SB.storage.from('chat').createSignedUrls(need.map(x=>x.media),3600*6);(data||[]).forEach((d,i)=>{const x=need[i];if(d&&d.signedUrl){x.url=d.signedUrl;if(x.voice)x.a=d.signedUrl;else if(x.isVid)x.vid=d.signedUrl;else x.img=d.signedUrl;}});}
function listen(){if(SBchan)SB.removeChannel(SBchan);
  SBchan=SB.channel('msgs-'+ME_ID)
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:`receiver=eq.${ME_ID}`},async p=>{const m=p.new;const id=rid(m.sender);
      if(!USERS[id]){const {data}=await SB.from('profiles').select('*').eq('id',m.sender).maybeSingle();if(data)addReal(data);}
      S.realFans=S.realFans||{};S.realFans[id]=true;const a=S.chats[id]=S.chats[id]||[];if(a.some(x=>x.dbid===m.id))return;const here=current==='room'&&roomId===id;
      if(TYroom===id){clearTimeout(TYoff);typingRoom=null;}const loc=Object.assign(toLocal(m),{read:here});try{await signAll([loc]);}catch(_){}a.push(loc);save();if(here){renderMsgs();markReadReal(id);}else if(current==='chat')renderChatList();
      if(navigator.vibrate)try{navigator.vibrate(15);}catch(_){}})
   .on('postgres_changes',{event:'UPDATE',schema:'public',table:'messages',filter:`sender=eq.${ME_ID}`},p=>{const m=p.new;const a=S.chats[rid(m.receiver)]||[];const x=a.find(y=>y.dbid===m.id);
      if(x&&(m.kind==='once')&&!m.media){x.opened=true;}
      if(x&&m.read_at){x.st='read';save();if(current==='room'&&roomId===rid(m.receiver))renderMsgs();}})
   .subscribe();}
async function markReadReal(id){const u=uuidOf(id);if(!u)return;await SB.from('messages').update({read_at:new Date().toISOString()}).eq('sender',u).eq('receiver',ME_ID).is('read_at',null);}

/* ---------- sending to a real friend ---------- */
function hookPush(){const _push=pushMsg;
  pushMsg=function(id,m){const u=uuidOf(id);if(!u)return _push(id,m);
    if(!m.t&&!m.img&&!m.a&&!m.vid){toast(m.voice?t('Allow the microphone to send a real voice message.'):t('For now, only text, photos and voice with real friends.'));return;}
    m.ts=Date.now();m.st='sent';(S.chats[id]=S.chats[id]||[]).push(m);bumpStreak(id);save();
    if(current==='room'&&roomId===id){renderMsgs();flyLast();burstSend();pop();}
    (async()=>{let row={receiver:u,body:m.t,kind:'text'};
      if(m.vid&&m.vidBlob){const blob=m.vidBlob;if(blob.size>50*1024*1024)return {error:{code:'big'}};const ext=/mp4|quicktime/.test(blob.type)?'mp4':'webm';const path=`${ME_ID}/${u}/${Date.now()}.${ext}`;
        const up=await SB.storage.from('chat').upload(path,blob,{contentType:blob.type||'video/mp4'});if(up.error)return {error:up.error};m.media=path;delete m.vidBlob;row={receiver:u,kind:'video',media:path,body:m.dur||null};}
      else if(m.img||m.a){const blob=dataUrlToBlob(m.img||m.a);const ext=m.a?((blob.type.includes('mp4')||blob.type.includes('aac'))?'m4a':'webm'):'jpg';const path=`${ME_ID}/${u}/${Date.now()}.${ext}`;
        const up=await SB.storage.from('chat').upload(path,blob,{contentType:blob.type||'application/octet-stream'});if(up.error)return {error:up.error};
        m.media=path;row=m.a?{receiver:u,kind:'voice',media:path,body:m.dur||null}:{receiver:u,kind:m.once?'once':'image',media:path,body:m.filter||null};}
      return SB.from('messages').insert(row).select().single();})().then(({data,error})=>{
      if(error){m.st='sent';m.failed=true;toast(error.code==='42501'?t('You can only write to friends who follow you back.'):error.code==='big'?t('This video is too big (max 50 MB).'):t('Not sent. Check your internet.'));}
      else{m.dbid=data.id;m.st='delivered';}save();if(current==='room'&&roomId===id)renderMsgs();});};
  const _open=openRoom;openRoom=function(id){_open(id);if(uuidOf(id))markReadReal(id);};
  const _once=openOnce;openOnce=function(k){const id=roomId;const m=(S.chats[id]||[])[k];_once(k);
    if(uuidOf(id)&&m&&m.f!=='me'&&m.once&&m.media&&m.dbid){const path=m.media;const done=()=>{SB.storage.from('chat').remove([path]).then(()=>SB.from('messages').update({media:null,read_at:new Date().toISOString()}).eq('id',m.dbid));m.media=null;m.img='';save();};
      const v=document.querySelector('.onceView');if(v){const c=v.onclick;v.onclick=()=>{c&&c();done();};}else done();}};}

/* ---------- follow / unfollow real people ---------- */
function hookFollow(){const _tf=toggleFollow;
  toggleFollow=function(uid){const u=uuidOf(uid);if(!u)return _tf(uid);const on=!S.following[uid];S.following[uid]=on;save();
    (on?SB.from('follows').insert({follower:ME_ID,followee:u}):SB.from('follows').delete().eq('follower',ME_ID).eq('followee',u)).then(()=>{});
    $$(`[data-follow="${uid}"],[data-rfo="${uid}"]`).forEach(b=>{b.classList.toggle('on',on);b.textContent=on?t('Followed'):t('Follow');});
    if(on&&(S.realFans||{})[uid])toast(t('You are now friends with {n}: you can call them',{n:USERS[uid].name}));};
  const _isF=isFriend;isFriend=function(id){if(uuidOf(id))return !!S.following[id]&&!!(S.realFans||{})[id];return _isF(id);};}

/* ---------- search real people ---------- */
let searchTok=0;
function hookSearch(){const _rcl=renderChatList;
  renderChatList=function(){_rcl();const q=($('#chatSearch').value||'').trim().toLowerCase().replace(/^@/,'');if(q.length<2||!ME_ID)return;const tok=++searchTok;
    SB.from('profiles').select('*').ilike('username','%'+q.replace(/[%_]/g,'')+'%').neq('id',ME_ID).limit(20).then(({data})=>{if(tok!==searchTok)return;const box=$('#convs');box.querySelector('.realPpl')?.remove();
      const list=(data||[]).map(p=>{const id=addReal(p);const on=!!S.following[id];return `<div class="ppl"><button class="pplWho" data-room="${id}"><span class="av" style="width:46px;height:46px;font-size:16px;background:${p.color||'#555'}">${initials(p.username)}</span><span><b>@${esc(p.username)}</b><small>${t('On R-Style')}</small></span></button><button class="chip ${on?'':'on'}" data-rfo="${id}">${on?t('Followed'):t('Follow')}</button></div>`;}).join('');
      box.insertAdjacentHTML('afterbegin',`<div class="realPpl"><div class="pplHead">${t('On R-Style')}</div>${list||`<p class="muted" style="text-align:center">${t('No results.')}</p>`}</div>`);});};
  $('#convs').addEventListener('click',e=>{const f=e.target.closest('[data-rfo]');if(f){e.stopPropagation();toggleFollow(f.dataset.rfo);}},true);
  $('#chatSearch').oninput=()=>renderChatList();}

/* ---------- log out ---------- */
function hookLogout(){document.addEventListener('click',e=>{if(e.target.closest('#loYes')&&SB){try{SB.auth.signOut();}catch(_){}}},true);}

/* ---------- start ---------- */
(async()=>{if(!REAL)return;if(!(await loadSB()))return;
  SB=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}});
  bindRealSignup();hookPush();hookFollow();hookSearch();hookLogout();
  const {data:{session}}=await SB.auth.getSession();
  if(session){ME_ID=session.user.id;if(S.profile&&(!S.profile.uid||S.profile.uid===ME_ID)){S.profile.uid=ME_ID;save();await afterLogin();}else{await signedIn(session);}
    if(location.hash.includes('access_token'))history.replaceState(null,'',location.pathname);}
  else if(S.profile&&!S.profile.uid){/* account made before the server: sign in again with a real code */S.profile=null;save();applyTheme();show('splash');}
  SB.auth.onAuthStateChange((ev,s)=>{if(ev==='SIGNED_OUT'){ME_ID=null;}});
})();

/* ====================== v11: real Shorts, likes, comments, reports ====================== */
let REALPOSTS=[],postsAt=0,postsBusy=false;
(function(){const T={'Report this post':['Signaler ce post','דווח על הפוסט','الإبلاغ عن المنشور'],'Delete my post':['Supprimer mon post','מחק את הפוסט שלי','حذف منشوري'],
 'Post deleted':['Post supprimé','הפוסט נמחק','تم حذف المنشور'],'Thanks, our team will check it.':['Merci, notre équipe va vérifier.','תודה, הצוות שלנו יבדוק.','شكرًا، سيتحقق فريقنا.'],
 'Uploading…':['Envoi…','מעלה…','جارٍ الرفع…'],'This video is too big (max 50 MB).':['Cette vidéo est trop lourde (max 50 Mo).','הסרטון גדול מדי (עד 50MB).','الفيديو كبير جدًا (حد أقصى 50 ميغابايت).'],
 'Sign in to publish.':['Connecte-toi pour publier.','תתחבר כדי לפרסם.','سجّل الدخول للنشر.'],'Delete':['Supprimer','מחק','حذف']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
async function loadPosts(force){if(!SB||!ME_ID||postsBusy)return;if(!force&&Date.now()-postsAt<30000)return;postsBusy=true;
  try{const {data:posts}=await SB.from('posts').select('*').order('created_at',{ascending:false}).limit(60);
    const ids=[...new Set((posts||[]).map(p=>p.author))];if(ids.length){const {data:ps}=await SB.from('profiles').select('*').in('id',ids);(ps||[]).forEach(p=>{if(p.id!==ME_ID)addReal(p);});}
    const pids=(posts||[]).map(p=>p.id);const {data:lk}=pids.length?await SB.from('likes').select('post,liker').in('post',pids):{data:[]};
    const {data:cm}=pids.length?await SB.from('comments').select('post').in('post',pids):{data:[]};
    const {data:urls}=(posts||[]).length?await SB.storage.from('posts').createSignedUrls(posts.map(p=>p.media),3600*6):{data:[]};
    REALPOSTS=(posts||[]).map((p,i)=>{const url=(urls||[])[i]?.signedUrl||'';const mine=p.author===ME_ID;const likes=(lk||[]).filter(x=>x.post===p.id);
      const iLike=likes.some(x=>x.liker===ME_ID);const id='db'+p.id;S.likes[id]=iLike;
      return {id,dbid:p.id,author:p.author,u:mine?null:rid(p.author),mine,by:mine?me().username:undefined,img:p.kind==='video'?null:url,video:p.kind==='video'?url:null,cap:p.caption||'',likes:likes.length-(iLike?1:0),score:null,tags:[],ts:Date.parse(p.created_at),ncom:(cm||[]).filter(x=>x.post===p.id).length,real:true};});
    postsAt=Date.now();}catch(e){}postsBusy=false;}
/* feed = real posts first, then the examples */
const _feedList11=feedList;
feedList=function(){const base=_feedList11();if(!REALPOSTS.length)return base;const real=REALPOSTS.filter(p=>!(p.u&&S.blocked[p.u])&&(feedMode==='foryou'||p.mine||(p.u&&S.following[p.u])));return [...real,...base.filter(p=>!(p.mine&&p.dbid))];};
const _findPost11=findPost;findPost=function(id){return REALPOSTS.find(x=>x.id===id)||_findPost11(id);};
const _subVideos=subVideos;
subVideos=function(){const fol=REALPOSTS.filter(p=>p.u&&S.following[p.u]&&!S.blocked[p.u]&&(!subSel||p.u===subSel));return [...fol,..._subVideos()].sort((a,b)=>(b.ts||0)-(a.ts||0));};
const _renderFeed11=renderFeed;
renderFeed=function(){_renderFeed11();
  $$('#feed .vcell').forEach(c=>{const p=subList[+c.dataset.vi];if(p&&p.real){c.style.background=`#222 url(${p.img||''}) center/cover`;c.querySelector('.vl').innerHTML=p.video?SV(ICONS.play):'';}});
  $$('#feed .short').forEach(el=>{const p=REALPOSTS.find(x=>x.id===el.dataset.id);if(!p)return;const rail=el.querySelector('.rail');if(!rail||rail.querySelector('[data-pmore]'))return;
    const cb=rail.querySelector('[data-comments] span');if(cb&&p.ncom)cb.textContent=fmt(p.ncom);
    rail.insertAdjacentHTML('beforeend',`<button data-pmore="${p.id}" aria-label="More">${SV(p.mine?ICONS.trash:ICONS.flag)}<span>${p.mine?t('Delete'):t('Report')}</span></button>`);});
  if(REAL&&ME_ID&&Date.now()-postsAt>30000)loadPosts().then(()=>{if(current==='shorts')_rerender();});};
function _rerender(){const sc=$('#feed').scrollTop;renderFeed();$('#feed').scrollTop=sc;}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-pmore]');if(!b)return;e.stopPropagation();const p=REALPOSTS.find(x=>x.id===b.dataset.pmore);if(!p)return;
  if(p.mine){openSheet(`<h3>${t('Delete my post')}</h3><button class="btn danger" id="pdY" style="margin-top:12px">${t('Delete')}</button><button class="btn" id="pdN" style="margin-top:6px">${t('Cancel')}</button>`);
    $('#pdN').onclick=closeSheet;$('#pdY').onclick=async()=>{closeSheet();const {data:row}=await SB.from('posts').select('media').eq('id',p.dbid).maybeSingle();await SB.from('posts').delete().eq('id',p.dbid);if(row)await SB.storage.from('posts').remove([row.media]);
      REALPOSTS=REALPOSTS.filter(x=>x!==p);S.posts=S.posts.filter(x=>x.dbid!==p.dbid);save();_rerender();toast(t('Post deleted'));};}
  else{openSheet(`<h3>${t('Report this post')}</h3>${['Not about style','Inappropriate','Bullying','Spam'].map(r=>`<button class="srow" data-rr="${r}"><div class="l"><b>${t(r)}</b></div></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-rr]').forEach(x=>x.onclick=async()=>{closeSheet();await SB.from('reports').insert({target_type:'post',target_id:String(p.dbid),reason:x.dataset.rr});REALPOSTS=REALPOSTS.filter(y=>y!==p);_rerender();toast(t('Thanks, our team will check it.'));});}},true);
/* likes */
document.addEventListener('click',e=>{const b=e.target.closest('[data-like]');if(!b||!SB||!ME_ID)return;const id=b.dataset.like;const p=REALPOSTS.find(x=>x.id===id);if(!p)return;
  setTimeout(()=>{if(S.likes[id])SB.from('likes').insert({post:p.dbid}).then(()=>{});else SB.from('likes').delete().eq('post',p.dbid).eq('liker',ME_ID).then(()=>{});},0);},true);
const _dblLike=dblLike;dblLike=function(sl,x,y){const id=sl.dataset.id;const was=!!S.likes[id];_dblLike(sl,x,y);const p=REALPOSTS.find(q=>q.id===id);if(p&&!was&&SB)SB.from('likes').insert({post:p.dbid}).then(()=>{});};
/* publish for real */
const _publish=publish;
publish=async function(media,cap){if(!(REAL&&SB))return _publish(media,cap);if(!ME_ID){toast(t('Sign in to publish.'));return;}
  const v=$('#pVerdict');$('#pGo').disabled=true;
  if(AI&&AI_IMG){try{const r=await AI.json(`You moderate posts for a fashion app for teenagers. Image + caption "${cap.replace(/"/g,"'")}". Return JSON only: {"style_related":true,"safe":true,"reason":""}`,{images:[dataUrlToBlob(media.img)]});
    if(!r.style_related||!r.safe){v.innerHTML=`<div class="verdict bad"><span></span><span><b>${t('Not published')}</b><br>${esc(r.reason||'')}</span></div>`;$('#pGo').disabled=false;return;}}catch(_){}}
  v.innerHTML=`<div class="why"><span class="spin"></span><span>${t('Uploading…')}</span></div>`;
  try{let blob,kind='image',ext='jpg';if(media.video){blob=await (await fetch(media.video)).blob();kind='video';ext=(blob.type.includes('quicktime')?'mov':'mp4');if(blob.size>50*1024*1024){v.innerHTML=`<div class="verdict bad"><span></span><span>${t('This video is too big (max 50 MB).')}</span></div>`;$('#pGo').disabled=false;return;}}else blob=dataUrlToBlob(media.img);
    const path=`${ME_ID}/${Date.now()}.${ext}`;const up=await SB.storage.from('posts').upload(path,blob,{contentType:blob.type||(kind==='video'?'video/mp4':'image/jpeg')});if(up.error)throw up.error;
    const {data,error}=await SB.from('posts').insert({media:path,kind,caption:cap.slice(0,300)}).select().single();if(error)throw error;
    S.posts.unshift({id:'db'+data.id,dbid:data.id,by:me().username,img:media.img,video:media.video||null,cap,likes:0,ts:Date.now()});save();
    if(challengeMode){S.challenge.joined=true;save();}challengeMode=false;contestMode=false;
    v.innerHTML=`<div class="verdict good"><span></span><span><b>${t('Published!')}</b></span></div>`;await loadPosts(true);setTimeout(()=>{closeSheet();feedMode='foryou';show('shorts');},700);
  }catch(e){v.innerHTML=`<div class="verdict bad"><span></span><span>${t('Not sent. Check your internet.')}</span></div>`;$('#pGo').disabled=false;}};
/* comments for real posts */
const _openComments=openComments;
openComments=function(id){const p=REALPOSTS.find(x=>x.id===id);if(!p||!SB)return _openComments(id);
  openSheet(`<h3>${t('Comments')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Be kind ✨ Ruby removes hurtful comments.')}</p>
    <div class="cmtList" id="cmtList"><div class="muted" style="padding:16px 0"><span class="spin"></span></div></div>
    <form class="cmtBar" id="cmtForm"><input id="cmtIn" maxlength="300" placeholder="${t('Add a comment…')}" autocomplete="off"><button class="cb send" aria-label="Post">${SV('<path d="M4 12l16-8-6 16-2.5-6.5z"/>')}</button></form>`);
  const load=async()=>{const {data}=await SB.from('comments').select('*').eq('post',p.dbid).order('created_at',{ascending:true}).limit(300);
    const ids=[...new Set((data||[]).map(c=>c.author))];const names={};if(ids.length){const {data:ps}=await SB.from('profiles').select('id,username,color').in('id',ids);(ps||[]).forEach(x=>names[x.id]=x);}
    const box=$('#cmtList');if(!box)return;const list=(data||[]).filter(c=>!S.hiddenComments['c'+c.id]&&!S.blocked[rid(c.author)]);p.ncom=list.length;
    box.innerHTML=list.length?list.map(c=>{const n=names[c.author]||{username:'?',color:'#555'};const mine=c.author===ME_ID;return `<div class="cmt"><span class="av" style="background:${n.color||'#555'}">${initials(n.username)}</span><div class="tx"><b>@${esc(n.username)}</b>${esc(c.body)}</div><button class="rep" data-cact="${c.id}" data-mine="${mine?1:''}">${mine?t('Delete'):t('Report')}</button></div>`;}).join('')
      :`<div class="muted" style="padding:18px 0;text-align:center">${t('No comments yet. Be the first! 🎉')}</div>`;box.scrollTop=box.scrollHeight;};
  load();
  $('#cmtList').onclick=async e=>{const b=e.target.closest('[data-cact]');if(!b)return;const cid=+b.dataset.cact;
    if(b.dataset.mine){await SB.from('comments').delete().eq('id',cid);}else{await SB.from('reports').insert({target_type:'comment',target_id:String(cid),reason:'comment'});S.hiddenComments['c'+cid]=true;save();toast(t('Thanks, comment reported and hidden'));}load();};
  $('#cmtForm').onsubmit=async e=>{e.preventDefault();const inp=$('#cmtIn');const text=inp.value.trim();if(!text)return;inp.disabled=true;
    if(AI){try{const r=await AI.json(`Is this comment on a fashion app for teenagers insulting, harassing, sexual, hateful or bullying? Comment: "${text.replace(/"/g,"'")}". Return JSON only: {"ok":true|false}`,{modelTier:'quick'});if(r&&r.ok===false){inp.disabled=false;toast(t('Ruby blocked this comment — please be kind.'));return;}}catch(_){}}
    const {error}=await SB.from('comments').insert({post:p.dbid,body:text.slice(0,300)});inp.disabled=false;if(error){toast(t('Not sent. Check your internet.'));return;}inp.value='';load();};};
/* private account → server */
const _renderSettings11=renderSettings;renderSettings=function(){_renderSettings11();const tg=$('#tgPriv');if(tg&&SB&&ME_ID){const old=tg.onclick;tg.onclick=()=>{old();SB.from('profiles').update({private:!!S.profile.private}).eq('id',ME_ID).then(()=>{});};}};
/* load posts after login */
(function(){const _after=afterLogin;afterLogin=async function(){await _after();await loadPosts(true);if(current==='shorts')_rerender();};})();

/* ====================== v12: profile photos on the server ====================== */
const _addReal12=addReal;addReal=function(p){const id=_addReal12(p);if(USERS[id]){USERS[id].photo=p.photo||null;USERS[id].name=p.username||USERS[id].name;USERS[id].handle=p.username||USERS[id].handle;}return id;};
const _avHTML12=avHTML;avHTML=function(u,size){const x=USERS[u];if(u!=='me'&&x&&x.photo){const st=`width:${size}px;height:${size}px;font-size:${Math.round(size*.36)}px;`;return `<span class="av" style="${st}background:#333 center/cover;background-image:url(${x.photo})">${x.crown?'<span class="crown">👑</span>':''}</span>`;}return _avHTML12(u,size);};
async function pushPhoto(){if(!SB||!ME_ID)return;const ph=me().photo||null;if(S.photoSynced===ph)return;const {error}=await SB.from('profiles').update({photo:ph}).eq('id',ME_ID);if(!error){S.photoSynced=ph;save();}}
(function(){const _after=afterLogin;afterLogin=async function(){await _after();pushPhoto();};})();
const _save12=save;save=function(){_save12();if(SB&&ME_ID&&S.photoSynced!==(me().photo||null)){clearTimeout(save._pt);save._pt=setTimeout(pushPhoto,800);}};
/* refresh friends' photos/names every time the chat list opens (max once a minute) */
let profAt=0;async function refreshProfiles(){if(!SB||!ME_ID||Date.now()-profAt<60000)return;profAt=Date.now();const ids=Object.keys(USERS).map(uuidOf).filter(Boolean);if(!ids.length)return;
  const {data}=await SB.from('profiles').select('*').in('id',ids);let ch=false;(data||[]).forEach(p=>{const u=USERS[rid(p.id)];if(u&&(u.photo||null)!==(p.photo||null)){ch=true;}addReal(p);});if(ch&&current==='chat')renderChatList();}
const _renderChat12=renderChat;renderChat=function(){_renderChat12.apply(this,arguments);refreshProfiles();};

/* ====================== v13: real "is typing…" bubble between friends ====================== */
let TYch=null,TYroom=null,TYoff=0,TYsent=0;
function tyName(a,b){return 'ty-'+[a,b].sort().join('-');}
function tyShow(on){const id=TYroom;if(!id||current!=='room'||roomId!==id)return;const was=typingRoom===id;typingRoom=on?id:(typingRoom===id?null:typingRoom);
  const sub=$('#roomName .sub');if(sub)sub.textContent=on?t('typing…'):t('online');
  if(was!==on){renderMsgs();const b=$('#msgs');if(b)b.scrollTop=b.scrollHeight;}}
function tyJoin(id){tyLeave();const u=uuidOf(id);if(!SB||!ME_ID||!u)return;TYroom=id;
  TYch=SB.channel(tyName(ME_ID,u),{config:{broadcast:{self:false}}})
   .on('broadcast',{event:'typing'},({payload})=>{if(!payload||payload.from!==u)return;clearTimeout(TYoff);if(payload.on){tyShow(true);TYoff=setTimeout(()=>tyShow(false),4000);}else tyShow(false);})
   .subscribe();}
function tyLeave(){if(TYch){try{TYsend(false);SB.removeChannel(TYch);}catch(_){}}TYch=null;if(TYroom&&typingRoom===TYroom)typingRoom=null;TYroom=null;clearTimeout(TYoff);}
function TYsend(on){if(!TYch)return;try{TYch.send({type:'broadcast',event:'typing',payload:{from:ME_ID,on}});}catch(_){}}
$('#msgInput').addEventListener('input',()=>{if(!TYch)return;const has=!!$('#msgInput').value.trim();if(!has){TYsent=0;TYsend(false);return;}if(Date.now()-TYsent>2000){TYsent=Date.now();TYsend(true);}});
$('#composer').addEventListener('submit',()=>{TYsent=0;TYsend(false);});
(function(){const _o=openRoom;openRoom=function(id){const r=_o.apply(this,arguments);if(uuidOf(id))tyJoin(id);else tyLeave();return r;};
 const _c=closeRoom;closeRoom=function(){tyLeave();return _c.apply(this,arguments);};})();

/* ====================== v14: Ruby + all AI features with Gemini (Supabase Edge Function "ruby") ====================== */
function blobToDataUrl(b){return new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.onerror=()=>r(null);fr.readAsDataURL(b);});}
async function gemCall(body){const {data,error}=await SB.functions.invoke('ruby',{body});if(error)throw error;if(!data||data.error){const e=new Error((data&&data.error)||'AI error');if(data&&data.status===429)e.code='rate_limited';throw e;}return data;}
function makeGemini(){const G=async function(msgs,opts={}){const image=opts.images&&opts.images[0]?await blobToDataUrl(opts.images[0]):null;
    const d=await gemCall({messages:(msgs||[]).map(m=>({role:m.role,content:typeof m.content==='string'?m.content:JSON.stringify(m.content)})),image});const text=d.text||'';if(opts.onText)try{opts.onText({text});}catch(_){}return {text};};
  G.json=async(prompt,opts={})=>{const image=opts.images&&opts.images[0]?await blobToDataUrl(opts.images[0]):null;const d=await gemCall({messages:[{role:'user',content:prompt}],image,json:true});
    const s=String(d.text||'').trim().replace(/^```(json)?/i,'').replace(/```$/,'').trim();try{return JSON.parse(s);}catch(_){const m=s.match(/\{[\s\S]*\}/);if(m)return JSON.parse(m[0]);throw new Error('Bad AI answer');}};
  G.limits=async()=>({images:true});G.gemini=true;return G;}
function enableGemini(){if(!REAL||!SB||!ME_ID||(AI&&AI.gemini))return;AI=makeGemini();AI_IMG=true;}
(function(){const _after=afterLogin;afterLogin=async function(){await _after();enableGemini();};})();

/* ====================== v15: block + report saved on the server ====================== */
let blkSynced=null;
async function pullBlocks(){if(!SB||!ME_ID)return;const {data,error}=await SB.from('blocks').select('blocked').eq('blocker',ME_ID);if(error)return;
  Object.keys(S.blocked).forEach(k=>{if(k.startsWith('r_')&&!blkSynced)delete S.blocked[k];});(data||[]).forEach(b=>{S.blocked[rid(b.blocked)]=true;});
  blkSynced=new Set(Object.keys(S.blocked).filter(k=>k.startsWith('r_')&&S.blocked[k]));save();if(current==='chat')renderChatList();}
async function pushBlocks(){if(!SB||!ME_ID||!blkSynced)return;const now=new Set(Object.keys(S.blocked).filter(k=>k.startsWith('r_')&&S.blocked[k]));
  const add=[...now].filter(k=>!blkSynced.has(k)),del=[...blkSynced].filter(k=>!now.has(k));if(!add.length&&!del.length)return;blkSynced=now;
  if(add.length)await SB.from('blocks').insert(add.map(k=>({blocked:uuidOf(k)})));
  for(const k of del)await SB.from('blocks').delete().eq('blocker',ME_ID).eq('blocked',uuidOf(k));
  if(add.length&&current==='shorts')_rerender();}
const _save15=save;save=function(){_save15();if(blkSynced){clearTimeout(save._bt);save._bt=setTimeout(pushBlocks,500);}};
(function(){const _after=afterLogin;afterLogin=async function(){await _after();await pullBlocks();};})();
document.addEventListener('click',e=>{if(!SB||!ME_ID)return;let id=null,why='profile';
  if(e.target.closest('#repU'))id=profId;else if(e.target.closest('[data-ci="report"]')){id=roomInfo(ciId).uid;why='chat';}else if(e.target.closest('[data-cm="report"]')&&CALL.id){id=roomInfo(CALL.id).uid;why='call';}
  const u=id&&uuidOf(id);if(u)SB.from('reports').insert({target_type:'user',target_id:u,reason:why}).then(()=>{});},true);

/* ====================== v16: automatic AI check of photos (profile photo + video messages) ====================== */
(function(){const T={'This photo is not allowed on R-Style.':['Cette photo n\'est pas autorisée sur R-Style.','התמונה הזאת לא מותרת ב-R-Style.','هذه الصورة غير مسموح بها على R-Style.'],'Checking…':['Vérification…','בודק…','جارٍ التحقق…']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
async function aiSafe(dataUrl){if(!AI||!AI_IMG||!dataUrl)return true;try{const r=await AI.json('Does this image contain nudity, sexual content, graphic violence, gore, drugs, weapons or hateful symbols? It is for an app used by teenagers. Return JSON only: {"safe":true|false}',{images:[dataUrlToBlob(dataUrl)]});return !(r&&r.safe===false);}catch(_){return true;}}
/* profile photo: checked before it is saved on the server */
const _pushPhoto16=pushPhoto;pushPhoto=async function(){const ph=me().photo||null;if(ph&&S.photoSynced!==ph&&!(await aiSafe(ph))){S.profile.photo=null;save();toast(t('This photo is not allowed on R-Style.'));if(typeof renderMe==='function')try{renderMe();}catch(_){}return;}return _pushPhoto16();};
/* video messages: one image of the video is checked before sending */
const PUSHW=[];PUSHW.push(function(){const _pushMsg16=pushMsg;pushMsg=function(id,m){if(m&&m.f==='me'&&m.vid&&!m._ok&&AI&&AI_IMG){(async()=>{toast(t('Checking…'));const fr=await videoFrame(m.vid);if(fr&&!(await aiSafe(fr.img))){openSheet(`<div class="verdict bad"><span></span><span><b>${t('Photo blocked')}</b><br>${t('This image is not allowed on R-Style.')}</span></div>`);return;}m._ok=1;_pushMsg16(id,m);})();return;}return _pushMsg16(id,m);};});

/* ====================== v17: delete account for real (Edge Function "delete-account") ====================== */
document.addEventListener('click',async e=>{const b=e.target.closest('#delYes');if(!b||!SB||!ME_ID)return;e.stopImmediatePropagation();e.preventDefault();
  b.disabled=true;b.innerHTML='<span class="spin"></span>';
  try{const {data,error}=await SB.functions.invoke('dynamic-action',{body:{}});if(error||!data||!data.ok)throw error||new Error(data&&data.error);
    try{await SB.auth.signOut();}catch(_){}Object.keys(localStorage).forEach(k=>{if(/^rstyle|^sb-/.test(k))localStorage.removeItem(k);});location.reload();
  }catch(_){b.disabled=false;b.textContent=t('Yes, delete everything');toast(t('Not sent. Check your internet.'));}},true);

/* ====================== v18: REAL voice + video calls between friends (WebRTC, signaling over Supabase Realtime) ====================== */
(function(){const T={'Calling…':['Appel…','מתקשר…','جارٍ الاتصال…'],'Connecting…':['Connexion…','מתחבר…','جارٍ الربط…'],'Ringing…':['Ça sonne…','מצלצל…','يرن…'],
 'No answer':['Pas de réponse','אין תשובה','لا رد'],'Call declined':['Appel refusé','השיחה נדחתה','تم رفض المكالمة'],'Incoming call':['Appel entrant','שיחה נכנסת','مكالمة واردة'],
 'Incoming video call':['Appel vidéo entrant','שיחת וידאו נכנסת','مكالمة فيديو واردة'],'Accept':['Accepter','ענה','رد'],'Decline':['Refuser','דחה','رفض'],
 'Allow the camera and microphone to call.':['Autorise la caméra et le micro pour appeler.','אפשר גישה למצלמה ולמיקרופון כדי להתקשר.','اسمح بالكاميرا والميكروفون للاتصال.'],
 'Connection failed. Try again on Wi-Fi.':['Connexion impossible. Réessaie en Wi-Fi.','החיבור נכשל. נסה שוב ב-Wi-Fi.','فشل الاتصال. حاول مرة أخرى عبر Wi-Fi.'],
 'Group calls with real friends are coming soon.':['Les appels de groupe arrivent bientôt.','שיחות קבוצתיות יגיעו בקרוב.','المكالمات الجماعية قريبًا.']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`
#call video.rv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000}
#call .cstat{position:absolute;top:calc(env(safe-area-inset-top) + 92px);left:0;right:0;text-align:center;color:rgba(255,255,255,.85);font-size:15px;z-index:3}
#inc{position:fixed;inset:0;z-index:100001;background:linear-gradient(180deg,#141418,#2a2a30);color:#fff;display:none;flex-direction:column;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top) + 70px) 30px calc(env(safe-area-inset-bottom) + 60px)}
#inc.on{display:flex}#inc .who{display:flex;flex-direction:column;align-items:center;text-align:center}#inc .who b{display:block;font-size:30px;margin-top:18px}#inc .who small{opacity:.7;font-size:15px}
#inc .ring{animation:incP 1.4s infinite;border-radius:50%}@keyframes incP{0%{box-shadow:0 0 0 0 rgba(255,255,255,.35)}100%{box-shadow:0 0 0 34px rgba(255,255,255,0)}}
#inc .btns{display:flex;gap:80px}#inc .btns button{width:74px;height:74px;border-radius:50%;border:0;color:#fff;display:grid;place-items:center;cursor:pointer}#inc .btns svg{width:32px;height:32px}
#inc .no{background:#E5202E}#inc .yes{background:#22C55E}#inc .lb{display:block;text-align:center;font-size:13px;margin-top:8px;opacity:.8}`;document.head.appendChild(css);
 const d=document.createElement('div');d.id='inc';document.body.appendChild(d);})();
const RC={pc:null,peer:null,id:null,callId:null,local:null,remote:null,role:null,timer:0,connected:false,pendingIce:[],inbox:null,out:{}};
const ICE=[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302']}];
function rcOut(uid){if(RC.out[uid])return RC.out[uid];const ch=SB.channel('call-'+uid,{config:{broadcast:{self:false}}});RC.out[uid]=new Promise(res=>{ch.subscribe(st=>{if(st==='SUBSCRIBED')res(ch);});setTimeout(()=>res(ch),4000);});return RC.out[uid];}
async function rcSend(uid,msg){const payload=Object.assign({from:ME_ID,callId:RC.callId},msg);try{const ch=await rcOut(uid);await ch.send({type:'broadcast',event:'sig',payload});}catch(_){}}
function rcListen(){if(!SB||!ME_ID||RC.inbox)return;RC.inbox=SB.channel('call-'+ME_ID,{config:{broadcast:{self:false}}}).on('broadcast',{event:'sig'},({payload})=>rcOnSig(payload)).subscribe();}
function rcStatus(txt){CALL.status=txt;const e=$('#call .cstat');if(e)e.textContent=txt||'';}
function rcRemoteVideo(){const st=$('#call .remote,#call .voiceAv');if(!RC.remote)return;
  if(CALL.video){let v=$('#call video.rv');if(!v&&st){st.insertAdjacentHTML('afterbegin','<video class="rv" autoplay playsinline></video>');v=$('#call video.rv');}if(v&&v.srcObject!==RC.remote){v.srcObject=RC.remote;v.play().catch(()=>{});}}
  let a=$('#rcAudio');if(!a){a=document.createElement('audio');a.id='rcAudio';a.autoplay=true;a.setAttribute('playsinline','');document.body.appendChild(a);}if(a.srcObject!==RC.remote){a.srcObject=RC.remote;a.play().catch(()=>{});}
  if(CALL.video){const v=$('#call video.rv');if(v)v.muted=true;}}
async function gumSafe(video){const md=navigator.mediaDevices;if(!md||!md.getUserMedia)throw new Error('NoMedia');
  try{if(navigator.audioSession)navigator.audioSession.type='play-and-record';}catch(_){}
  try{if(SNAP&&SNAP.stream){SNAP.stream.getTracks().forEach(x=>x.stop());SNAP.stream=null;}}catch(_){}
  try{return await md.getUserMedia({audio:true,video:video?{facingMode:'user'}:false});}
  catch(e1){/* some iPads refuse camera+mic together: ask one by one and join them */
    const a=await md.getUserMedia({audio:true});if(!video)return a;
    try{const v=await md.getUserMedia({video:{facingMode:'user'}});v.getVideoTracks().forEach(tr=>a.addTrack(tr));}catch(e2){CALL.video=false;}return a;}}
async function rcMedia(video){RC.local=await gumSafe(video);CALL.stream=RC.local;return RC.local;}
function rcPC(){const pc=new RTCPeerConnection({iceServers:ICE});RC.pc=pc;RC.remote=new MediaStream();
  pc.onicecandidate=e=>{if(e.candidate)rcSend(RC.peer,{t:'ice',c:e.candidate.toJSON?e.candidate.toJSON():e.candidate});};
  pc.ontrack=e=>{e.streams[0]?e.streams[0].getTracks().forEach(tr=>{if(!RC.remote.getTracks().includes(tr))RC.remote.addTrack(tr);}):RC.remote.addTrack(e.track);if(e.track.kind==='video'&&!CALL.video){CALL.video=true;renderCall();}rcRemoteVideo();if(e.track.kind==='audio'&&typeof vwStart==='function')vwStart(RC.remote);};
  pc.onconnectionstatechange=()=>{const s=pc.connectionState;if(s==='connected'&&!RC.connected){RC.connected=true;CALL.t0=Date.now();rcStatus('');clearTimeout(RC.timer);}
    if(s==='failed'){toast(t('Connection failed. Try again on Wi-Fi.'));rcHang(true);}if(s==='disconnected'){setTimeout(()=>{if(RC.pc===pc&&pc.connectionState==='disconnected')rcHang(true);},6000);}};
  RC.local.getTracks().forEach(tr=>pc.addTrack(tr,RC.local));return pc;}
async function rcFlushIce(){const L=RC.pendingIce.splice(0);for(const c of L){try{await RC.pc.addIceCandidate(c);}catch(_){}}}
async function rcOffer(){const o=await RC.pc.createOffer();await RC.pc.setLocalDescription(o);rcSend(RC.peer,{t:'offer',sdp:RC.pc.localDescription.toJSON?RC.pc.localDescription.toJSON():RC.pc.localDescription,video:CALL.video});}

/* v18.1 permission helper: one button to allow camera + microphone, with simple help if Safari blocked it */
(function(){const T={'Allow camera and microphone':['Autoriser caméra et micro','אפשר מצלמה ומיקרופון','السماح بالكاميرا والميكروفون'],
 'R-Style needs your microphone (and camera for video) to call your friends.':['R-Style a besoin du micro (et de la caméra pour la vidéo) pour appeler tes amis.','R-Style צריכה את המיקרופון (ואת המצלמה לשיחת וידאו) כדי להתקשר לחברים.','يحتاج R-Style إلى الميكروفون (والكاميرا للفيديو) للاتصال بأصدقائك.'],
 'Still blocked? In Safari tap “aA” next to the address → Website Settings → Camera and Microphone → Allow. Then come back and tap the button again.':['Toujours bloqué ? Dans Safari touche « aA » à côté de l’adresse → Réglages du site web → Caméra et Micro → Autoriser. Puis reviens et appuie encore sur le bouton.','עדיין חסום? בספארי לחץ על "aA" ליד הכתובת ← הגדרות אתר ← מצלמה ומיקרופון ← אפשר. אחר כך חזור ולחץ שוב על הכפתור.','ما زال محظورًا؟ في Safari اضغط على «aA» بجانب العنوان ← إعدادات الموقع ← الكاميرا والميكروفون ← سماح. ثم عد واضغط الزر مرة أخرى.']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
function askPerm(video,onOk,onNo){let tries=0;openSheet(`<h3>🎙️${video?' 📷':''} ${t('Allow camera and microphone')}</h3><p class="muted" style="margin:6px 0 0">${t('R-Style needs your microphone (and camera for video) to call your friends.')}</p>
  <button class="btn primary" id="permGo" style="margin-top:14px">${t('Allow camera and microphone')}</button><p class="muted" id="permHelp" style="display:none;margin:12px 0 0;font-size:13px;line-height:1.5"></p><button class="btn" id="permNo" style="margin-top:8px">${t('Cancel')}</button>`);
  $('#permNo').onclick=()=>{closeSheet();onNo&&onNo();};
  $('#permGo').onclick=async()=>{tries++;try{const st=await gumSafe(!!video);st.getTracks().forEach(x=>x.stop());closeSheet();onOk();}
    catch(err){const h=$('#permHelp');if(h){h.style.display='block';h.textContent=t('Still blocked? In Safari tap “aA” next to the address → Website Settings → Camera and Microphone → Allow. Then come back and tap the button again.')+' ('+((err&&err.name)||'error')+': '+((err&&err.message)||'')+' · v40)';}}};}
/* outgoing */
const _startCall18=startCall;
startCall=async function(id,video){const u=uuidOf(roomInfo(id).uid||id);if(!(REAL&&SB&&ME_ID&&u))return _startCall18(id,video);
  if(!isFriend(rid(u))){toast(t('Calls are only between friends who follow each other.'));return;}if(RC.pc){return;}
  try{await rcMedia(video);}catch(_){askPerm(video,()=>startCall(id,video));return;}
  RC.peer=u;RC.id=rid(u);RC.role='caller';RC.connected=false;RC.callId='c'+Date.now()+Math.random().toString(36).slice(2,6);RC.pendingIce=[];
  Object.assign(CALL,{id:rid(u),video,t0:Date.now(),muted:false,spk:false,menu:false,filters:false,filter:'none',people:[rid(u)],host:S.vip,real:true});
  $('#call').classList.add('on');renderCall();clearInterval(CALL.timer);CALL.timer=setInterval(()=>{const e=$('#callTime');if(e)e.textContent=RC.connected?callClock():'';},1000);
  rcStatus(t('Calling…'));rcPC();rcSend(u,{t:'invite',video,name:me().username});
  RC.timer=setTimeout(()=>{if(!RC.connected){toast(t('No answer'));rcHang(false);}},40000);};
/* incoming */
function rcShowIncoming(p){const id=rid(p.from);const u=USERS[id]||{name:p.name||'?'};const d=$('#inc');
  d.innerHTML=`<div class="who"><span class="ring" style="display:inline-block">${USERS[id]?avHTML(id,120):''}</span><b>${esc(u.name)}</b><small>${p.video?t('Incoming video call'):t('Incoming call')}</small></div>
   <div class="btns"><div><button class="no" id="incNo" aria-label="${t('Decline')}">${HANG}</button><span class="lb">${t('Decline')}</span></div><div><button class="yes" id="incYes" aria-label="${t('Accept')}">${SV(p.video?ICONS.video:ICONS.phone)}</button><span class="lb">${t('Accept')}</span></div></div>`;
  d.classList.add('on');try{navigator.vibrate&&navigator.vibrate([400,200,400,200,400]);}catch(_){}
  $('#incNo').onclick=()=>{d.classList.remove('on');rcSend(p.from,{t:'decline'});RC.callId=null;};
  $('#incYes').onclick=async()=>{d.classList.remove('on');try{await rcMedia(p.video);}catch(_){askPerm(p.video,()=>{d.classList.add('on');$('#incYes').click();},()=>rcSend(p.from,{t:'decline'}));return;}
    RC.peer=p.from;RC.id=id;RC.role='callee';RC.connected=false;RC.pendingIce=[];
    Object.assign(CALL,{id,video:!!p.video,t0:Date.now(),muted:false,spk:false,menu:false,filters:false,filter:'none',people:[id],host:false,real:true});
    $('#call').classList.add('on');renderCall();clearInterval(CALL.timer);CALL.timer=setInterval(()=>{const e=$('#callTime');if(e)e.textContent=RC.connected?callClock():'';},1000);
    rcStatus(t('Connecting…'));rcPC();rcSend(p.from,{t:'accept'});};
  clearTimeout(RC.incT);RC.incT=setTimeout(()=>{if(d.classList.contains('on')){d.classList.remove('on');}},40000);}
async function rcOnSig(p){if(!p||!p.from)return;
  if(p.t==='invite'){if(p.callId&&p.callId===RC.callId&&$('#inc').classList.contains('on'))return;if(RC.pc||!isFriend(rid(p.from))||S.blocked[rid(p.from)]){rcSend(p.from,{t:'decline',callId:p.callId});return;}RC.callId=p.callId;
    if(!USERS[rid(p.from)]){const {data}=await SB.from('profiles').select('*').eq('id',p.from).maybeSingle();if(data)addReal(data);}rcShowIncoming(p);return;}
  if(p.callId!==RC.callId)return;
  if(p.t==='end'){$('#inc').classList.remove('on');if(RC.pc)rcHang(false,true);return;}
  if(p.t==='decline'){toast(t('Call declined'));rcHang(false,true);return;}
  if(!RC.pc||p.from!==RC.peer)return;
  if(p.t==='accept'){rcStatus(t('Connecting…'));await rcOffer();}
  else if(p.t==='offer'){if(p.video&&!CALL.video){CALL.video=true;renderCall();}await RC.pc.setRemoteDescription(p.sdp);await rcFlushIce();const a=await RC.pc.createAnswer();await RC.pc.setLocalDescription(a);rcSend(RC.peer,{t:'answer',sdp:RC.pc.localDescription.toJSON?RC.pc.localDescription.toJSON():RC.pc.localDescription});}
  else if(p.t==='answer'){await RC.pc.setRemoteDescription(p.sdp);await rcFlushIce();}
  else if(p.t==='ice'){if(RC.pc.remoteDescription){try{await RC.pc.addIceCandidate(p.c);}catch(_){}}else RC.pendingIce.push(p.c);}}
function rcHang(notify,fromPeer){clearTimeout(RC.timer);if(RC.peer&&!fromPeer)rcSend(RC.peer,{t:'end'});try{RC.pc&&RC.pc.close();}catch(_){}
  if(RC.local)RC.local.getTracks().forEach(tr=>tr.stop());RC.pc=null;RC.local=null;RC.remote=null;const a=$('#rcAudio');if(a){a.srcObject=null;}
  CALL.stream=null;const was=RC.connected;RC.connected=false;RC.callId=null;RC.peer=null;if(CALL.id)_endCall18();}
const _endCall18=endCall;endCall=function(){if(RC.pc||RC.callId){rcHang(false);return;}return _endCall18();};
/* call screen: real status, real mute, real camera on/off, no demo text */
const _renderCall18=renderCall;renderCall=function(){_renderCall18();if(!CALL.real)return;const c=$('#call');
  c.querySelector('.cdemo')?.remove();if(!c.querySelector('.cstat'))c.insertAdjacentHTML('beforeend',`<div class="cstat">${esc(CALL.status||'')}</div>`);
  const te=$('#callTime');if(te)te.textContent=RC.connected?callClock():'';
  if(RC.local){RC.local.getAudioTracks().forEach(tr=>tr.enabled=!CALL.muted);}
  const v=$('#selfV');if(v&&RC.local&&RC.local.getVideoTracks().length){v.srcObject=RC.local;v.muted=true;v.classList.add('live');v.play().catch(()=>{});}
  rcRemoteVideo();
  const mu=$('#cMute');if(mu)mu.onclick=()=>{CALL.muted=!CALL.muted;renderCall();};
  const sp=$('#cSpk');if(sp)sp.onclick=()=>{CALL.spk=!CALL.spk;renderCall();};
  c.querySelectorAll('[data-cm="add"]').forEach(b=>b.onclick=()=>toast(t('Group calls with real friends are coming soon.')));
  c.querySelectorAll('[data-cm="video"]').forEach(b=>b.onclick=async()=>{CALL.menu=false;try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});const tr=s.getVideoTracks()[0];RC.local.addTrack(tr);RC.pc.addTrack(tr,RC.local);CALL.video=true;renderCall();await rcOffer();}catch(_){toast(t('Allow the camera and microphone to call.'));}});
  c.querySelectorAll('[data-cm="flip"]').forEach(b=>b.onclick=async()=>{try{const cur=RC.local.getVideoTracks()[0];const mode=(cur&&cur.getSettings().facingMode)==='user'?'environment':'user';const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:mode}});const nt=s.getVideoTracks()[0];
    const snd=RC.pc.getSenders().find(x=>x.track&&x.track.kind==='video');if(snd)await snd.replaceTrack(nt);if(cur){RC.local.removeTrack(cur);cur.stop();}RC.local.addTrack(nt);renderCall();}catch(_){}});};
const _camOn18=camOn;camOn=async function(){if(CALL.real)return;return _camOn18();};
(function(){const _after=afterLogin;afterLogin=async function(){await _after();rcListen();};})();
window.addEventListener('pagehide',()=>{if(RC.pc)rcHang(false);});

/* ====================== v18.2 call design A (incoming) + D (in call) ====================== */
(function(){const css=document.createElement('style');css.textContent=`
#inc{background:linear-gradient(180deg,#0B0B0D 0%,#1A0B0E 55%,#2A0E13 100%)!important;justify-content:flex-start!important;padding:calc(env(safe-area-inset-top) + 64px) 24px 0!important}
#inc::before{content:"";position:absolute;inset:0;background:radial-gradient(90% 60% at 50% 30%,rgba(225,29,46,.33),transparent 70%);pointer-events:none}
#inc .lab{position:relative;font-size:13px;letter-spacing:3px;color:rgba(255,255,255,.6);font-weight:600;text-align:center}
#inc .avw{position:relative;width:170px;height:170px;margin:70px auto 0}
#inc .avw i{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(255,255,255,.33);animation:incR 2s ease-out infinite}#inc .avw i+i{animation-delay:.7s}
#inc .avw .av{position:relative;width:170px!important;height:170px!important;font-size:60px!important;box-shadow:0 20px 60px rgba(225,29,46,.4)}
@keyframes incR{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.9);opacity:0}}
#inc .nm{position:relative;text-align:center;margin-top:30px}#inc .nm b{display:block;font-size:34px;font-weight:800}#inc .nm small{display:block;font-size:15px;color:rgba(255,255,255,.65);margin-top:6px}
#inc .qa{position:relative;display:flex;justify-content:center;margin-top:22px}#inc .qa button{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,.75);background:none;border:0}
#inc .qa span{width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center;color:#fff}#inc .qa svg{width:22px;height:22px}
#inc .sl{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 70px);left:0;right:0;display:flex;justify-content:center;gap:110px}
#inc .sb.yes,#inc .sb.no{background:none!important;width:auto!important;height:auto!important;border-radius:0!important}#inc .sb{display:flex;flex-direction:column;align-items:center;gap:6px;color:rgba(255,255,255,.7);touch-action:none;user-select:none;-webkit-user-select:none}
#inc .sb .ch{display:block;width:16px;height:10px;opacity:0;animation:incU 1.4s ease-in-out infinite}#inc .sb .ch:nth-child(2){animation-delay:.18s}#inc .sb .ch:nth-child(3){animation-delay:.36s}
@keyframes incU{0%{transform:translateY(8px);opacity:0}50%{opacity:1}100%{transform:translateY(-8px);opacity:0}}
#inc .sb .k{width:78px;height:78px;border-radius:50%;display:grid;place-items:center;color:#fff;margin-top:4px;transition:transform .25s}#inc .sb.drag .k{transition:none}
#inc .sb .k svg{width:32px;height:32px}#inc .sb.yes .k{background:#22C55E;box-shadow:0 10px 30px rgba(34,197,94,.47)}#inc .sb.no .k{background:#EF4444;box-shadow:0 10px 30px rgba(239,68,68,.47)}
#inc .sb b{font-size:13px;color:#fff;margin-top:6px;font-weight:600}
#inc .hint{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 30px);left:0;right:0;text-align:center;font-size:12px;color:rgba(255,255,255,.55)}
/* in call (D) */
#call.voice{background:linear-gradient(180deg,#0B0B0D,#1C0B0F)!important}
#call.voice::before{content:"";position:absolute;inset:0;background:radial-gradient(80% 50% at 50% 35%,rgba(225,29,46,.4),transparent 70%);pointer-events:none}
#call .voiceAv{top:30%!important;padding:0!important;background:none!important}
#call .voiceAv::before{content:"";position:absolute;inset:-18px;border-radius:50%;background:conic-gradient(#E11D2E,#F472B6,#E11D2E);opacity:.35;filter:blur(14px)}
#call .voiceAv .av{position:relative;width:190px!important;height:190px!important;font-size:66px!important;border:5px solid rgba(255,255,255,.15)!important}
#call .cwave{position:absolute;top:calc(30% + 230px);left:0;right:0;display:flex;justify-content:center;gap:5px;height:40px;align-items:center;z-index:2}
#call .cwave i{display:block;width:5px;height:40px;border-radius:3px;background:#fff;opacity:.8;animation:cw .9s ease-in-out infinite}
@keyframes cw{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
#call .cbar{left:22px!important;right:22px!important;bottom:calc(env(safe-area-inset-bottom) + 30px)!important;height:84px;border-radius:42px;background:rgba(20,20,24,.55);-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,.12);justify-content:space-around!important;align-items:center;gap:0!important;padding:0 8px}
#call .cbtn{width:56px!important;height:56px!important;background:rgba(255,255,255,.14)!important}#call .cbtn.on{background:#fff!important}
#call .cbtn.end{width:64px!important;height:64px!important;background:#EF4444!important}`;document.head.appendChild(css);})();
const CHV='<svg class="ch" viewBox="0 0 16 10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l6-6 6 6"/></svg>';
function slideUp(el,onDone){const k=el.querySelector('.k');let y0=null,dy=0;
  el.onpointerdown=e=>{e.preventDefault();y0=e.clientY;dy=0;el.classList.add('drag');try{el.setPointerCapture(e.pointerId);}catch(_){}};
  el.onpointermove=e=>{if(y0===null)return;dy=Math.min(0,e.clientY-y0);k.style.transform=`translateY(${Math.max(dy,-140)}px)`;};
  const up=()=>{if(y0===null)return;y0=null;el.classList.remove('drag');if(dy<-90){k.style.transform='translateY(-160px) scale(.6)';k.style.opacity='0';setTimeout(onDone,120);}else k.style.transform='';};
  el.onpointerup=up;el.onpointercancel=up;}
const _rcShowIncoming=rcShowIncoming;
rcShowIncoming=function(p){_rcShowIncoming(p);const d=$('#inc');const id=rid(p.from);const u=USERS[id]||{name:p.name||'?',handle:p.name||''};
  const yes=$('#incYes').onclick,no=$('#incNo').onclick;
  d.innerHTML=`<div class="lab">R-STYLE</div>
   <div class="avw"><i></i><i></i>${USERS[id]?avHTML(id,170):''}</div>
   <div class="nm"><b>${esc(u.name)}</b><small>@${esc(u.handle||u.name)} · ${p.video?t('Incoming video call'):t('Incoming call')}…</small></div>
   <div class="qa"><button id="incMsg"><span>${SV('<path d="M4 5h16v11H9l-5 4z"/>')}</span>${t('Message')}</button></div>
   <div class="sl"><div class="sb yes" id="incYesS">${CHV}${CHV}${CHV}<div class="k">${SV(p.video?ICONS.video:ICONS.phone)}</div><b>${t('Accept')}</b></div>
     <div class="sb no" id="incNoS">${CHV}${CHV}${CHV}<div class="k">${HANG}</div><b>${t('Decline')}</b></div></div>
   <div class="hint">${t('Press the button and slide up')}</div>
   <button id="incYes" hidden></button><button id="incNo" hidden></button>`;
  $('#incYes').onclick=yes;$('#incNo').onclick=no;
  slideUp($('#incYesS'),()=>$('#incYes').click());slideUp($('#incNoS'),()=>$('#incNo').click());
  $('#incMsg').onclick=()=>{no&&no();show('chat');openRoom(id);};};
(function(){const T={'Press the button and slide up':['Appuie sur le bouton et glisse vers le haut','לוחצים על הכפתור ומחליקים למעלה','اضغط على الزر واسحب للأعلى']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
const _renderCall182=renderCall;renderCall=function(){_renderCall182();const c=$('#call');if(c.classList.contains('voice')&&!c.querySelector('.cwave'))c.insertAdjacentHTML('beforeend',`<div class="cwave">${Array.from({length:13},(_,i)=>`<i style="animation-delay:${(i*.09).toFixed(2)}s"></i>`).join('')}</div>`);};

/* ====================== v18.3 waveform follows the real voice ====================== */
(function(){const css=document.createElement('style');css.textContent=`#call .cwave i{animation:none!important;transform:scaleY(.12);transition:transform .08s linear}#call.demo .cwave i{animation:cw .9s ease-in-out infinite!important}`;document.head.appendChild(css);})();
let VW={ctx:null,an:null,src:null,raf:0,stream:null};
function vwStop(){cancelAnimationFrame(VW.raf);try{VW.src&&VW.src.disconnect();}catch(_){}VW.src=null;VW.stream=null;}
function vwLoop(){const bars=$$('#call .cwave i');if(!bars.length||!VW.an){VW.raf=requestAnimationFrame(vwLoop);return;}
  const d=new Uint8Array(VW.an.frequencyBinCount);VW.an.getByteFrequencyData(d);const n=bars.length,mid=(n-1)/2;
  bars.forEach((b,i)=>{const band=Math.floor(2+Math.abs(i-mid)*2.2);const v=(d[band]||0)/255;const s=Math.max(.12,Math.min(1,v*1.6));b.style.transform=`scaleY(${s.toFixed(2)})`;});
  VW.raf=requestAnimationFrame(vwLoop);}
function vwStart(stream){if(!stream||!stream.getAudioTracks().length)return;if(VW.stream===stream&&VW.src)return;vwStop();
  try{const A=window.AudioContext||window.webkitAudioContext;VW.ctx=VW.ctx||new A();if(VW.ctx.state==='suspended')VW.ctx.resume();
    VW.an=VW.ctx.createAnalyser();VW.an.fftSize=64;VW.an.smoothingTimeConstant=.6;VW.src=VW.ctx.createMediaStreamSource(stream);VW.src.connect(VW.an);VW.stream=stream;vwLoop();}catch(_){}}
const _renderCall183=renderCall;renderCall=function(){_renderCall183();const c=$('#call');c.classList.toggle('demo',!CALL.real);if(CALL.real&&RC.remote)vwStart(RC.remote);};
const _rcHang183=rcHang;rcHang=function(){vwStop();return _rcHang183.apply(this,arguments);};

/* ====================== v19: calls reach friends even when the app is closed (Web Push) ====================== */
(function(){const T={'Get calls even when R-Style is closed':['Reçois les appels même quand R-Style est fermée','קבל שיחות גם כש-R-Style סגורה','تلقَّ المكالمات حتى عندما يكون R-Style مغلقًا'],
 'Turn on notifications':['Activer les notifications','הפעל התראות','تفعيل الإشعارات'],'Not now':['Plus tard','לא עכשיו','ليس الآن'],
 'On iPhone, first add R-Style to your home screen: tap Share (the square with an arrow) → “Add to Home Screen”, then open R-Style from the new icon.':['Sur iPhone, ajoute d’abord R-Style à l’écran d’accueil : touche Partager (le carré avec la flèche) → « Sur l’écran d’accueil », puis ouvre R-Style depuis la nouvelle icône.','באייפון, קודם מוסיפים את R-Style למסך הבית: לחץ על שיתוף (הריבוע עם החץ) ← "הוסף למסך הבית", ואז פתח את R-Style מהאייקון החדש.','على iPhone، أضف R-Style أولًا إلى الشاشة الرئيسية: اضغط مشاركة ← «إضافة إلى الشاشة الرئيسية»، ثم افتح R-Style من الأيقونة الجديدة.'],
 'Notifications are on ✅':['Notifications activées ✅','ההתראות הופעלו ✅','تم تفعيل الإشعارات ✅'],'is calling you':['t’appelle','מתקשר/ת אליך','يتصل بك']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
const PUSH_FN='push';let SWREG=null;
function b64u(s){const p='='.repeat((4-s.length%4)%4);const b=atob((s+p).replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(b,c=>c.charCodeAt(0));}
async function swReady(){if(SWREG)return SWREG;if(!('serviceWorker' in navigator))return null;try{SWREG=await navigator.serviceWorker.register('sw.js');await navigator.serviceWorker.ready;}catch(_){SWREG=null;}return SWREG;}
async function pushSubscribe(){const reg=await swReady();if(!reg||!reg.pushManager)return false;
  const {data}=await SB.functions.invoke(PUSH_FN,{body:{action:'key'}});if(!data||!data.key)return false;
  let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(data.key)});
  const j=sub.toJSON();await SB.from('push_subs').upsert({endpoint:j.endpoint,sub:j});S.pushOn=true;save();return true;}
function isIOS(){return /iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);}
function standalone(){return window.navigator.standalone===true||matchMedia('(display-mode: standalone)').matches;}
function askPush(force){if(!REAL||!SB||!ME_ID)return;const can='Notification' in window&&'PushManager' in window;
  if(!force&&(S.pushAsked&&Date.now()-S.pushAsked<3*86400000))return;if(can&&Notification.permission==='granted'){pushSubscribe();return;}if(can&&Notification.permission==='denied'&&!force)return;
  S.pushAsked=Date.now();save();
  const needHome=isIOS()&&!standalone();
  openSheet(`<h3>🔔 ${t('Get calls even when R-Style is closed')}</h3>${needHome?`<p class="muted" style="margin:8px 0 0;line-height:1.5">${t('On iPhone, first add R-Style to your home screen: tap Share (the square with an arrow) → “Add to Home Screen”, then open R-Style from the new icon.')}</p>`:
    `<button class="btn primary" id="pushGo" style="margin-top:14px">${t('Turn on notifications')}</button>`}<button class="btn" id="pushNo" style="margin-top:8px">${t('Not now')}</button>`);
  $('#pushNo').onclick=closeSheet;const g=$('#pushGo');if(g)g.onclick=async()=>{try{const r=await Notification.requestPermission();if(r==='granted'&&await pushSubscribe())toast(t('Notifications are on ✅'));}catch(_){}closeSheet();};}
async function pushCall(u,video){try{await SB.functions.invoke(PUSH_FN,{body:{to:u,call:true,video,text:(me().username||'')+' '+t('is calling you')}});}catch(_){}}
(function(){const _after=afterLogin;afterLogin=async function(){await _after();swReady();setTimeout(()=>askPush(false),4000);};})();
/* the caller keeps ringing: invite again every 3 s (so a friend who opens the app from the notification still gets the call) */
const _startCall19=startCall;startCall=async function(id,video){await _startCall19(id,video);if(!(RC.pc&&RC.role==='caller'&&RC.peer))return;const u=RC.peer,cid=RC.callId;pushCall(u,video);
  clearInterval(RC.reinv);RC.reinv=setInterval(()=>{if(!RC.pc||RC.callId!==cid||RC.accepted||RC.connected){clearInterval(RC.reinv);return;}rcSend(u,{t:'invite',video,name:me().username});},3000);};
const _rcOnSig19=rcOnSig;rcOnSig=async function(p){if(p&&p.t==='accept'&&p.callId===RC.callId){RC.accepted=true;clearInterval(RC.reinv);}if(p&&p.t==='decline'&&p.callId===RC.callId)clearInterval(RC.reinv);return _rcOnSig19(p);};
const _rcHang19=rcHang;rcHang=function(){clearInterval(RC.reinv);RC.accepted=false;return _rcHang19.apply(this,arguments);};

/* ====================== v19.1 message notifications + clear AI errors ====================== */
async function pushText(u,text){try{await SB.functions.invoke(PUSH_FN,{body:{to:u,text:String(text||'').slice(0,100)}});}catch(_){}}
PUSHW.push(function(){const _p=pushMsg;pushMsg=function(id,m){const r=_p.apply(this,arguments);const u=uuidOf(id);
  if(u&&m&&m.f==='me'&&SB&&ME_ID){const prev=m.t||(m.vid?'🎬 '+t('Video message'):m.a||m.voice?'🎙️ '+t('Voice message'):m.img?'📷 '+t('Photo'):'');const cid=setInterval(()=>{if(m.dbid){clearInterval(cid);pushText(u,prev);}if(m.failed)clearInterval(cid);},700);setTimeout(()=>clearInterval(cid),30000);}
  return r;};});
const _aiErr191=aiErr;aiErr=function(e){if(AI&&AI.gemini){const m=String((e&&(e.message||e.error))||e||'');
  if(/quota|429|rate|RESOURCE_EXHAUSTED/i.test(m))return t('Ruby is busy right now. Try again in a minute.');return t('Ruby could not answer. Please try again.')+' ('+m.slice(0,140)+')';}return _aiErr191(e);};
const _gemCall191=gemCall;gemCall=async function(body){try{return await _gemCall191(body);}catch(e){let msg=e&&e.message||String(e);try{if(e&&e.context&&e.context.json){const j=await e.context.json();msg=(j&&(j.error||j.message))||msg;}}catch(_){}const er=new Error(msg);if(e&&e.code)er.code=e.code;throw er;}};

/* ====================== v20: REAL stories between friends (24 h, Supabase) ====================== */
let storiesAt=0,storiesBusy=false;
async function pushStories(){if(!SB||!ME_ID)return;const day=Date.now()-86400000;
  for(const x of S.myStory){if(x.sid||x.up||!x.img||(x.ts||0)<day)continue;x.up=1;
    try{const path=`${ME_ID}/${x.ts||Date.now()}.jpg`;const up=await SB.storage.from('stories').upload(path,dataUrlToBlob(x.img),{contentType:'image/jpeg',upsert:true});if(up.error)throw up.error;
      const {data,error}=await SB.from('stories').insert({media:path}).select().single();if(error)throw error;x.sid=data.id;}catch(_){}delete x.up;}
  _save20();}
async function loadStories(force){if(!SB||!ME_ID||storiesBusy)return;if(!force&&Date.now()-storiesAt<60000)return;storiesBusy=true;
  try{const since=new Date(Date.now()-86400000).toISOString();const {data}=await SB.from('stories').select('*').gt('created_at',since).order('created_at',{ascending:true}).limit(200);
    const rows=(data||[]).filter(r=>r.author!==ME_ID&&!S.blocked[rid(r.author)]);const {data:urls}=rows.length?await SB.storage.from('stories').createSignedUrls(rows.map(r=>r.media),3600*6):{data:[]};
    Object.keys(STORIES).forEach(k=>{if(k.startsWith('r_'))delete STORIES[k];});
    const unknown=[...new Set(rows.map(r=>r.author))].filter(a=>!USERS[rid(a)]);if(unknown.length){const {data:ps}=await SB.from('profiles').select('*').in('id',unknown);(ps||[]).forEach(addReal);}
    rows.forEach((r,i)=>{const u=(urls||[])[i];if(!u||!u.signedUrl||!USERS[rid(r.author)])return;(STORIES[rid(r.author)]=STORIES[rid(r.author)]||[]).push({img:u.signedUrl,ts:Date.parse(r.created_at),sid:r.id});});
    /* new story since last time = show the ring again */
    Object.keys(STORIES).forEach(k=>{if(!k.startsWith('r_'))return;const last=STORIES[k][STORIES[k].length-1];if(S.seen[k]&&S.seenAt&&S.seenAt[k]&&last.ts>S.seenAt[k])delete S.seen[k];});
    storiesAt=Date.now();if(current==='chat')renderStoryRow();}catch(_){}storiesBusy=false;}
/* real story owners first, then the examples */
const _storyOwners20=storyOwners;storyOwners=function(){const o=_storyOwners20();const real=o.filter(k=>k.startsWith('r_')),rest=o.filter(k=>!k.startsWith('r_'));return rest[0]==='me'?['me',...real,...rest.slice(1)]:[...real,...rest];};
const _renderStoryRow20=renderStoryRow;renderStoryRow=function(){_renderStoryRow20();
  $$('[data-story^="r_"]').forEach(b=>{const id=b.dataset.story;const inn=b.querySelector('.in');if(inn&&USERS[id]&&USERS[id].photo){inn.style.background=`#333 center/cover url(${USERS[id].photo})`;inn.textContent='';}});
  const row=$('[data-story]')&&$('[data-story]').parentElement;if(row){const mine=row.querySelector('#myStoryBtn');[...row.querySelectorAll('[data-story^="r_"]')].reverse().forEach(b=>mine?mine.after(b):row.prepend(b));}};
/* show the real photo in the story viewer */
const _segs20=segs;segs=function(owner){if(String(owner).startsWith('r_'))return (STORIES[owner]||[]).map(x=>({img:x.img,real:true,ts:x.ts,g:0,e:'',cap:''}));return _segs20(owner);};
const _loadSeg20=loadSeg;loadSeg=function(){_loadSeg20();const owner=ST.owners[ST.o];if(!String(owner).startsWith('r_'))return;const seg=(STORIES[owner]||[])[ST.s];if(!seg)return;
  const b=$('#stBody');b.style.cssText=`background:#000 url(${seg.img}) center/contain no-repeat`;b.textContent='';$('#stCap').textContent='';S.seenAt=S.seenAt||{};S.seenAt[owner]=Date.now();};
const _save20=save;save=function(){_save20();if(SB&&ME_ID&&S.myStory&&S.myStory.some(x=>!x.sid&&!x.up&&x.img)){clearTimeout(save._st);save._st=setTimeout(pushStories,600);}};
(function(){const _after=afterLogin;afterLogin=async function(){await _after();pushStories();loadStories(true);};})();
const _renderChat20=renderChat;renderChat=function(){_renderChat20.apply(this,arguments);loadStories(false);};

/* ====================== v21: REAL group calls (up to 8, every phone connects to every phone) ====================== */
(function(){const T={'Add a friend':['Ajouter un ami','הוסף חבר','أضف صديقًا'],'Group call':['Appel de groupe','שיחה קבוצתית','مكالمة جماعية'],'left the call':['a quitté l’appel','יצא/ה מהשיחה','غادر المكالمة'],'joined':['a rejoint','הצטרף/ה','انضم'],
 'Max 8 people in a call':['8 personnes maximum par appel','עד 8 אנשים בשיחה','8 أشخاص كحد أقصى']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#call .tile video.gv{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000}#call .tile .lvl{position:absolute;inset:0;border-radius:18px;box-shadow:inset 0 0 0 3px #22C55E;opacity:0;transition:opacity .15s;pointer-events:none}`;document.head.appendChild(css);})();
const GC={on:false,id:null,video:false,members:new Set(),peers:{}};
function gcPeer(u){if(GC.peers[u])return GC.peers[u];const pc=new RTCPeerConnection({iceServers:ICE});const P={pc,stream:new MediaStream(),pend:[],offered:false};GC.peers[u]=P;
  if(RC.local)RC.local.getTracks().forEach(tr=>pc.addTrack(tr,RC.local));
  pc.onicecandidate=e=>{if(e.candidate)gcSend(u,{t:'gice',c:e.candidate.toJSON?e.candidate.toJSON():e.candidate});};
  pc.ontrack=e=>{(e.streams[0]?e.streams[0].getTracks():[e.track]).forEach(tr=>{if(!P.stream.getTracks().includes(tr))P.stream.addTrack(tr);});gcAudio(u);gcTiles();};
  pc.onconnectionstatechange=()=>{if(pc.connectionState==='failed'||pc.connectionState==='closed')gcDrop(u,false);};return P;}
function gcSend(u,m){const payload=Object.assign({from:ME_ID,callId:GC.id},m);(async()=>{try{const ch=await rcOut(u);await ch.send({type:'broadcast',event:'sig',payload});}catch(_){}})();}
async function gcOffer(u){const P=gcPeer(u);if(P.offered)return;P.offered=true;const o=await P.pc.createOffer();await P.pc.setLocalDescription(o);gcSend(u,{t:'goffer',sdp:P.pc.localDescription.toJSON?P.pc.localDescription.toJSON():P.pc.localDescription});}
function gcMeet(u){if(u===ME_ID||!GC.on)return;GC.members.add(u);gcPeer(u);if(ME_ID<u)gcOffer(u);gcSync();}
function gcAudio(u){const P=GC.peers[u];if(!P)return;let a=document.getElementById('ga_'+u);if(!a){a=document.createElement('audio');a.id='ga_'+u;a.autoplay=true;a.setAttribute('playsinline','');document.body.appendChild(a);}if(a.srcObject!==P.stream){a.srcObject=P.stream;a.play().catch(()=>{});}}
function gcDrop(u,notify){const P=GC.peers[u];if(!P)return;try{P.pc.close();}catch(_){}delete GC.peers[u];GC.members.delete(u);const a=document.getElementById('ga_'+u);if(a)a.remove();
  if(notify!==false&&USERS[rid(u)])toast(firstName(USERS[rid(u)].name)+' '+t('left the call'));gcSync();if(GC.on&&!Object.keys(GC.peers).length&&!(RC.pc&&RC.connected))rcHang(false);}
async function gcEnsure(list){const miss=list.filter(u=>!USERS[rid(u)]);if(!miss.length)return;miss.forEach(u=>addReal({id:u,username:'…',color:'#555'}));try{const {data}=await SB.from('profiles').select('*').in('id',miss);(data||[]).forEach(p=>{delete USERS[rid(p.id)];addReal(p);});}catch(_){}if(GC.on)renderCall();}
function gcSync(){if(!GC.on)return;gcEnsure([...GC.members].filter(u=>u!==ME_ID));CALL.people=[...GC.members].filter(u=>u!==ME_ID).map(rid);CALL.group=true;renderCall();}
function gcTiles(){if(!GC.on)return;const tiles=$$('#call .cgrid .tile:not(.me)');CALL.people.forEach((id,i)=>{const u=uuidOf(id);const tile=tiles[i];if(!tile)return;
  let st=null;if(u===RC.peer&&RC.remote)st=RC.remote;else if(GC.peers[u])st=GC.peers[u].stream;if(!st)return;
  if(st.getVideoTracks().length){let v=tile.querySelector('video.gv');if(!v){tile.insertAdjacentHTML('afterbegin','<video class="gv" autoplay playsinline muted></video>');v=tile.querySelector('video.gv');}if(v.srcObject!==st){v.srcObject=st;v.play().catch(()=>{});}}});}
/* start: turn the current 1-to-1 call into a group by adding a friend */
function gcFromRC(){if(GC.on)return;GC.on=true;GC.id=RC.callId;GC.video=CALL.video;GC.members=new Set([ME_ID,RC.peer]);GC.peers={};}
function gcAddPicker(){const inCall=new Set([...GC.members,RC.peer].filter(Boolean));const can=Object.keys(USERS).filter(id=>uuidOf(id)&&isFriend(id)&&!inCall.has(uuidOf(id))&&!S.blocked[id]);
  openSheet(`<h3>${t('Add a friend')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('Max 8 people in a call')}</p>${can.map(x=>`<button class="pick" data-gadd="${x}">${avHTML(x,42)}<b>${esc(USERS[x].name)}</b><span>${SV(ICONS.plus,'style="width:18px;height:18px"')}</span></button>`).join('')||`<p class="muted">${t('No results.')}</p>`}`);
  $('#sheet').querySelectorAll('[data-gadd]').forEach(b=>b.onclick=()=>{const u=uuidOf(b.dataset.gadd);if((GC.on?GC.members.size:2)>=8){toast(t('Max 8 people in a call'));return;}closeSheet();
    gcFromRC();GC.members.add(u);const members=[...GC.members];members.forEach(m=>{if(m!==ME_ID&&m!==u)gcSend(m,{t:'gadd',members});});
    gcSend(u,{t:'ginvite',members,video:CALL.video,name:me().username});pushCall(u,CALL.video);CALL.menu=false;gcSync();});}
const _renderCall21=renderCall;renderCall=function(){_renderCall21();if(!CALL.real)return;const c=$('#call');
  c.querySelectorAll('[data-cm="add"]').forEach(b=>b.onclick=()=>gcAddPicker());if(GC.on){gcTiles();if(CALL.people.length>1){const tb=c.querySelector('.ctop b');if(tb)tb.textContent=t('Group call');const sm=c.querySelector('.ctop small');if(sm){sm.setAttribute('dir','ltr');sm.textContent=(CALL.people.length+1)+' / 8';}}}};
/* signals */
const _rcOnSig21=rcOnSig;rcOnSig=async function(p){if(!p||!p.t||p.t[0]!=='g')return _rcOnSig21(p);
  if(p.t==='ginvite'){if(RC.pc||GC.on){gcSend(p.from,{t:'gbusy',callId:p.callId});return;}if(p.callId===RC.callId&&$('#inc').classList.contains('on'))return;RC.callId=p.callId;
    if(!USERS[rid(p.from)]){const {data}=await SB.from('profiles').select('*').eq('id',p.from).maybeSingle();if(data)addReal(data);}
    rcShowIncoming(Object.assign({},p,{t:'invite'}));
    $('#incYes').onclick=async()=>{$('#inc').classList.remove('on');try{await rcMedia(p.video);}catch(_){askPerm(p.video,()=>{$('#inc').classList.add('on');$('#incYes').click();});return;}
      GC.on=true;GC.id=p.callId;GC.video=!!p.video;GC.members=new Set(p.members);GC.peers={};RC.callId=p.callId;
      Object.assign(CALL,{id:rid(p.from),video:!!p.video,t0:Date.now(),muted:false,spk:false,menu:false,filters:false,filter:'none',people:[],host:false,real:true});RC.connected=true;
      $('#call').classList.add('on');gcSync();clearInterval(CALL.timer);CALL.timer=setInterval(()=>{const e=$('#callTime');if(e)e.textContent=callClock();},1000);
      p.members.forEach(m=>{if(m!==ME_ID)gcSend(m,{t:'gjoin',members:p.members});});};
    return;}
  if(p.callId!==GC.id&&p.callId!==RC.callId)return;
  if(p.t==='gadd'){gcFromRC();(p.members||[]).forEach(m=>{if(m!==ME_ID)GC.members.add(m);});gcSync();return;}
  if(!GC.on)return;
  if(p.t==='gjoin'){if(p.from===RC.peer)return;gcSend(p.from,{t:'ghere'});gcMeet(p.from);if(USERS[rid(p.from)])toast(firstName(USERS[rid(p.from)].name)+' '+t('joined'));return;}
  if(p.t==='ghere'){gcMeet(p.from);return;}
  if(p.t==='gleave'){gcDrop(p.from);return;}
  const P=gcPeer(p.from);
  if(p.t==='goffer'){await P.pc.setRemoteDescription(p.sdp);for(const c of P.pend.splice(0)){try{await P.pc.addIceCandidate(c);}catch(_){}}const a=await P.pc.createAnswer();await P.pc.setLocalDescription(a);gcSend(p.from,{t:'ganswer',sdp:P.pc.localDescription.toJSON?P.pc.localDescription.toJSON():P.pc.localDescription});}
  else if(p.t==='ganswer'){await P.pc.setRemoteDescription(p.sdp);for(const c of P.pend.splice(0)){try{await P.pc.addIceCandidate(c);}catch(_){}}}
  else if(p.t==='gice'){if(P.pc.remoteDescription){try{await P.pc.addIceCandidate(p.c);}catch(_){}}else P.pend.push(p.c);}};
/* in a group, "end" from the first friend only means they left */
const _rcOnSig21b=rcOnSig;rcOnSig=async function(p){if(GC.on&&p&&p.t==='end'&&p.from===RC.peer){try{RC.pc&&RC.pc.close();}catch(_){}RC.pc=null;RC.remote=null;const a=$('#rcAudio');if(a)a.srcObject=null;GC.members.delete(p.from);
    if(USERS[rid(p.from)])toast(firstName(USERS[rid(p.from)].name)+' '+t('left the call'));if(!Object.keys(GC.peers).length){rcHang(false,true);return;}gcSync();return;}return _rcOnSig21b(p);};
const _rcHang21=rcHang;rcHang=function(notify,fromPeer){if(GC.on){Object.keys(GC.peers).forEach(u=>{gcSend(u,{t:'gleave'});try{GC.peers[u].pc.close();}catch(_){}const a=document.getElementById('ga_'+u);if(a)a.remove();});
    GC.on=false;GC.peers={};GC.members=new Set();CALL.group=false;CALL.people=[];if(!RC.pc&&!RC.callId){_endCall18();return;}}return _rcHang21.apply(this,arguments);};
/* the first friend's tile also shows their video */
const _rcRemoteVideo21=rcRemoteVideo;rcRemoteVideo=function(){if(GC.on&&CALL.people.length>1){gcTiles();let a=$('#rcAudio');if(RC.remote){if(!a){a=document.createElement('audio');a.id='rcAudio';a.autoplay=true;a.setAttribute('playsinline','');document.body.appendChild(a);}if(a.srcObject!==RC.remote){a.srcObject=RC.remote;a.play().catch(()=>{});}}return;}return _rcRemoteVideo21();};

/* ====================== v22: write to anyone → it arrives as a message request; accept = become friends ====================== */
(function(){const T={'Request sent ✉️ They will see it in their message requests.':['Demande envoyée ✉️ Elle apparaîtra dans ses demandes de messages.','הבקשה נשלחה ✉️ היא תופיע אצלו/ה בבקשות ההודעות.','تم إرسال الطلب ✉️ سيظهر في طلبات الرسائل.'],
 'You can send photos, videos and voice messages after they accept.':['Tu pourras envoyer photos, vidéos et vocaux quand la personne aura accepté.','אפשר יהיה לשלוח תמונות, סרטונים והקלטות אחרי שיאשרו.','يمكنك إرسال الصور والفيديو والرسائل الصوتية بعد القبول.'],
 'Waiting for {n} to accept':['En attente que {n} accepte','מחכים ש{n} יאשר/תאשר','بانتظار قبول {n}'],'Max 3 messages before they accept.':['3 messages maximum avant qu’elle accepte.','עד 3 הודעות לפני האישור.','3 رسائل كحد أقصى قبل القبول.'],
 'wants to be your friend':['veut être ton ami(e)','רוצה להיות חבר/ה שלך','يريد أن يكون صديقك']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#room .reqNote{position:absolute;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top) + 74px);z-index:3;background:rgba(0,0,0,.55);color:#fff;font-size:12px;font-weight:600;padding:6px 12px;border-radius:14px;white-space:nowrap}`;document.head.appendChild(css);})();
function realReqs(){const out=[];for(const id in S.chats){if(!uuidOf(id)||S.blocked[id]||(S.reqHidden||{})[id])continue;if(S.following[id])continue;const a=S.chats[id]||[];if(!a.some(m=>m.f==='them'))continue;out.push(id);}return out;}
/* sender: first message = follow + request (text only) */
PUSHW.push(function(){const _p=pushMsg;pushMsg=function(id,m){const u=uuidOf(id);if(u&&m&&m.f==='me'&&!isFriend(id)){
    if(!m.t){toast(t('You can send photos, videos and voice messages after they accept.'));return;}
    const mine=(S.chats[id]||[]).filter(x=>x.f==='me').length;if(mine>=3){toast(t('Max 3 messages before they accept.'));return;}
    if(!S.following[id]){toggleFollow(id);setTimeout(()=>_p.call(this,id,m),600);if(!mine)toast(t('Request sent ✉️ They will see it in their message requests.'));return;}}
  return _p.apply(this,arguments);};});
/* room: small note while waiting */
(function(){const _o=openRoom;openRoom=function(id){const r=_o.apply(this,arguments);$('#room .reqNote')?.remove();if(uuidOf(id)&&!isFriend(id)&&S.following[id])$('#room').insertAdjacentHTML('beforeend',`<div class="reqNote">⏳ ${esc(t('Waiting for {n} to accept',{n:firstName(USERS[id].name)}))}</div>`);return r;};})();
/* receiver: requests are not in the normal list, they are behind the "Message requests" bar */
const _renderChatList22=renderChatList;renderChatList=function(){_renderChatList22();const q=($('#chatSearch')?.value||'').trim();const reqs=realReqs();
  reqs.forEach(id=>$(`#convs .crow[data-room="${id}"]`)?.remove());
  const total=reqs.length+(S.requests||[]).length;let bar=$('#reqBar');
  if(total&&!q){if(!bar){$('#convs').insertAdjacentHTML('afterbegin',`<button class="reqLine" id="reqBar"><span>${t('Message requests')}</span><span>${total}</span></button>`);}else{const n=bar.querySelectorAll('span');if(n[1])n[1].textContent=total;}}};
openRequests=function(){const reqs=realReqs();
  openSheet(`<h3>📨 ${t('Message requests')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('They can\'t see if you read it until you accept.')}</p>
   ${reqs.map(id=>{const u=USERS[id];const a=S.chats[id]||[];const last=[...a].reverse().find(m=>m.f==='them');return `<div class="pick">${avHTML(id,42)}<b>${esc(u.name)}<br><small class="muted" style="font-weight:500">${esc(last&&last.t||t('wants to be your friend'))}</small></b><button class="chip on" data-racc="${id}">${t('Accept')}</button><button class="chip" data-rdec="${id}">✕</button></div>`;}).join('')}
   ${(S.requests||[]).map(r=>`<div class="pick"><span class="av" style="width:42px;height:42px;background:${r.color}">${initials(r.name)}</span><b>${esc(r.name)}<br><small class="muted" style="font-weight:500">${esc(r.text)}</small></b><button class="chip on" data-acc="${r.id}">${t('Accept')}</button><button class="chip" data-dec="${r.id}">✕</button></div>`).join('')}
   ${!reqs.length&&!(S.requests||[]).length?`<p class="muted">${t('No requests.')}</p>`:''}`);
  $('#sheet').querySelectorAll('[data-racc]').forEach(b=>b.onclick=()=>{const id=b.dataset.racc;if(!S.following[id])toggleFollow(id);S.realFans=S.realFans||{};S.realFans[id]=true;save();closeSheet();openRoom(id);toast(t('You are now friends with {n}: you can call them',{n:USERS[id].name}));});
  $('#sheet').querySelectorAll('[data-rdec]').forEach(b=>b.onclick=()=>{S.reqHidden=S.reqHidden||{};S.reqHidden[b.dataset.rdec]=true;save();closeSheet();renderChatList();toast(t('Request deleted'));});
  $('#sheet').querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{const r=S.requests.find(x=>x.id===b.dataset.acc);S.requests=S.requests.filter(x=>x!==r);const gid='q'+r.id;S.groups.push({id:gid,name:r.name,members:[],dm:true,color:r.color});S.chats[gid]=[{f:'them',t:r.text}];save();closeSheet();openRoom(gid);});
  $('#sheet').querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{S.requests=S.requests.filter(x=>x.id!==b.dataset.dec);save();closeSheet();renderChatList();toast(t('Request deleted'));});};
/* a friend request accepted on the other phone → we become friends live */
(function(){const _after=afterLogin;afterLogin=async function(){await _after();try{SB.channel('fol-'+ME_ID).on('postgres_changes',{event:'INSERT',schema:'public',table:'follows',filter:`followee=eq.${ME_ID}`},p=>{const id=rid(p.new.follower);S.realFans=S.realFans||{};S.realFans[id]=true;save();if(current==='chat')renderChatList();if(current==='room'&&roomId===id){$('#room .reqNote')?.remove();}}).subscribe();}catch(_){}};})();

/* install the send-message extensions after the server hook (hookPush runs when Supabase is ready) */
const _hookPushW=hookPush;hookPush=function(){_hookPushW();PUSHW.forEach(f=>f());};

/* ====================== v23: clean "product photo" for each scanned piece of clothing ====================== */
(function(){const T={'Ruby is making clean photos of your clothes…':['Ruby prépare des photos propres de tes vêtements…','רובי מכינה תמונות נקיות של הבגדים…','روبي تجهز صورًا نظيفة لملابسك…'],
 '✨ Ruby will cut out each piece and put it on a clean white background.':['✨ Ruby va découper chaque vêtement et le mettre sur un fond blanc propre.','✨ רובי תגזור כל בגד ותשים אותו על רקע לבן ונקי.','✨ ستقص روبي كل قطعة وتضعها على خلفية بيضاء نظيفة.']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#sheet .gem.why{display:none}`;document.head.appendChild(css);})();
let recSrc=null,recBoxesP=null;
const _recognize23=recognize;recognize=async function(src){recSrc=await downscale(src,1100,.9);recBoxesP=null;await _recognize23.apply(this,arguments);
  if(recs&&recs.length&&AI&&AI_IMG){const list=recs.map((r,i)=>`${i}: ${r.name} (${r.cat}, ${r.colorName||''})`).join('; ');
    recBoxesP=AI.json(`Find each of these clothing items in the photo and give a tight bounding box around the whole piece. Items: ${list}. Return JSON only: {"boxes":[{"i":0,"box_2d":[ymin,xmin,ymax,xmax]}]} with coordinates from 0 to 1000.`,{images:[dataUrlToBlob(recSrc)]})
      .then(v=>{(v&&v.boxes||[]).forEach(b=>{const r=recs[+b.i];if(r&&Array.isArray(b.box_2d)&&b.box_2d.length===4)r.box=b.box_2d.map(Number);});}).catch(()=>{});
    const s=$('#sheet');if(s&&!s.querySelector('.cleanHint'))s.querySelector('#recSave')?.insertAdjacentHTML('beforebegin',`<div class="why cleanHint"><span></span><span>${t('✨ Ruby will cut out each piece and put it on a clean white background.')}</span></div>`);}};
function loadImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src;});}
async function productPhoto(src,box){const im=await loadImg(src);if(!im)return null;const W=im.width,H=im.height;
  let [y0,x0,y1,x1]=box&&box.length===4?box:[0,0,1000,1000];if(y1<=y0||x1<=x0)[y0,x0,y1,x1]=[0,0,1000,1000];
  const pad=.05;let sx=Math.max(0,(x0/1000-pad)*W),sy=Math.max(0,(y0/1000-pad)*H),ex=Math.min(W,(x1/1000+pad)*W),ey=Math.min(H,(y1/1000+pad)*H);const cw=ex-sx,ch=ey-sy;
  const sc=Math.min(1,520/Math.max(cw,ch));const w=Math.max(8,Math.round(cw*sc)),h=Math.max(8,Math.round(ch*sc));
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(im,sx,sy,cw,ch,0,0,w,h);
  const d=x.getImageData(0,0,w,h),p=d.data;
  /* background colour = average of the border pixels */
  let br=0,bg=0,bb=0,n=0;const add=(i)=>{br+=p[i];bg+=p[i+1];bb+=p[i+2];n++;};for(let i=0;i<w;i++){add(i*4);add(((h-1)*w+i)*4);}for(let j=0;j<h;j++){add(j*w*4);add((j*w+w-1)*4);}br/=n;bg/=n;bb/=n;
  /* remove everything connected to the border that looks like the background */
  const thr=46,mask=new Uint8Array(w*h),st=[];const dist=i=>{const k=i*4;return Math.abs(p[k]-br)+Math.abs(p[k+1]-bg)+Math.abs(p[k+2]-bb);};
  for(let i=0;i<w;i++){st.push(i,(h-1)*w+i);}for(let j=0;j<h;j++){st.push(j*w,j*w+w-1);}
  while(st.length){const i=st.pop();if(mask[i])continue;if(dist(i)>thr*3)continue;mask[i]=1;const xx=i%w,yy=(i/w)|0;if(xx>0)st.push(i-1);if(xx<w-1)st.push(i+1);if(yy>0)st.push(i-w);if(yy<h-1)st.push(i+w);}
  let kept=0;for(let i=0;i<w*h;i++){if(mask[i])p[i*4+3]=0;else kept++;}
  /* if almost nothing (or everything) was kept, the background was too busy: keep the plain crop */
  const okCut=false&&kept>w*h*.12&&kept<w*h*.97;if(okCut){/* soften the edge */for(let i=0;i<w*h;i++){if(mask[i])continue;const xx=i%w,yy=(i/w)|0;let e=0;if(xx>0&&mask[i-1])e++;if(xx<w-1&&mask[i+1])e++;if(yy>0&&mask[i-w])e++;if(yy<h-1&&mask[i+w])e++;if(e)p[i*4+3]=255-e*45;}x.putImageData(d,0,0);}
  else{c.getContext('2d').drawImage(im,sx,sy,cw,ch,0,0,w,h);}
  /* final catalog photo: 600×800, white, centred, soft shadow, a bit brighter */
  const o=document.createElement('canvas');o.width=600;o.height=800;const ox=o.getContext('2d');ox.fillStyle='#ffffff';ox.fillRect(0,0,600,800);
  const s2=Math.min(520/w,700/h);const dw=w*s2,dh=h*s2,dx=(600-dw)/2,dy=(800-dh)/2;
  if(okCut){ox.save();ox.shadowColor='rgba(0,0,0,.18)';ox.shadowBlur=28;ox.shadowOffsetY=14;}
  try{ox.filter='brightness(1.05) contrast(1.07) saturate(1.05)';}catch(_){}
  if(!okCut){ox.save();ox.beginPath();if(ox.roundRect)ox.roundRect(dx,dy,dw,dh,22);else ox.rect(dx,dy,dw,dh);ox.clip();}
  ox.drawImage(c,dx,dy,dw,dh);ox.restore();try{ox.filter='none';}catch(_){}
  return o.toDataURL('image/jpeg',.86);}
/* Gold: real AI product photo when the image model is switched on (falls back to the free version) */
async function aiProductPhoto(src,rec){if(!(AI&&AI.gemini))return null;try{const d=await gemCall({image:src,messages:[{role:'user',content:`Create a clean e-commerce product photo of ONLY the ${rec.name} (${rec.cat}, ${rec.colorName||''}) from this picture: flat front view, no person, no hanger, pure white background, soft studio light, same colours and details. Return only the image.`}],imageOut:true});
  return d&&typeof d.image==='string'&&d.image.startsWith('data:image')?d.image:null;}catch(_){return null;}}
document.addEventListener('click',async e=>{const b=e.target.closest('#recSave');if(!b||!recSrc||b.dataset.busy)return;e.stopImmediatePropagation();e.preventDefault();b.dataset.busy='1';
  b.innerHTML=`<span class="spin"></span> ${t('Ruby is making clean photos of your clothes…')}`;try{if(recBoxesP)await Promise.race([recBoxesP,new Promise(r=>setTimeout(r,12000))]);}catch(_){}
  let a=0,m=[];for(const r of recs.filter(r=>r.on)){if(r.match&&r.same){m.push(r.match);continue;}
    let img=null;const crop=await productPhoto(recSrc,r.box);img=(await aiProductPhoto(recSrc,r))||crop||recImg;
    S.wardrobe.unshift({id:'w'+Date.now()+a,name:r.name,cat:r.cat,img:await downscale(img,600,.85),color:r.color,colorName:r.colorName,warmth:r.warmth,style:r.style,occasion:r.occasion});a++;}
  if(m.length)markWorn(m);S.today=null;save();closeSheet();wCat='All';wTab='items';$$('[data-wt]').forEach(x=>x.classList.toggle('on',x.dataset.wt==='items'));show('wardrobe');toast(t('Added {a} · worn today {b}',{a,b:m.length}));recSrc=null;},true);

/* ====================== v24: SIMPLER — fewer buttons: extra actions live behind one "•••" button ====================== */
(function(){const T={'More':['Plus','עוד','المزيد'],'Save this outfit':['Enregistrer la tenue','שמור את הלוק','احفظ الإطلالة'],'See it on my avatar':['Voir sur mon avatar','הצג על האווטאר שלי','اعرضه على الأفاتار'],
 'Send to a friend':['Envoyer à un ami','שלח לחבר','أرسل إلى صديق'],'Ruby\'s score':['Score de Ruby','הציון של רובי','تقييم روبي'],'Moves':['Mouvements','תנועות','حركات']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`
#feed .rail [data-sendshort],#feed .rail [data-why],#feed .rail [data-pmore]{display:none!important}
#feed .rail .moreBtn svg{width:30px;height:30px}
.acts [data-save],.acts [data-onav]{display:none!important}
.acts .moreAct{flex:0 0 52px!important}
.animBar>button[data-anim]{display:none!important}.animBar.open>button[data-anim]{display:grid!important;place-items:center}
.animBar .animMain{width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:grid;place-items:center}
.animBar .animMain svg{width:20px;height:20px}.animBar.open .animMain{background:var(--accent)}`;document.head.appendChild(css);})();
const DOTS='<circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/>';
function actionSheet(title,rows){openSheet(`<h3>${title}</h3>${rows.map((r,i)=>`<button class="srow" data-act="${i}"><div class="l"><b>${r[0]}</b></div></button>`).join('')}`);
  $('#sheet').querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>{const r=rows[+b.dataset.act];closeSheet();setTimeout(r[1],60);});}
/* Shorts: like · comment · ••• */
const _renderFeed24=renderFeed;renderFeed=function(){_renderFeed24.apply(this,arguments);
  $$('#feed .short').forEach(el=>{const rail=el.querySelector('.rail');if(!rail||rail.querySelector('.moreBtn'))return;rail.insertAdjacentHTML('beforeend',`<button class="moreBtn" aria-label="${t('More')}">${SV(DOTS)}<span>${t('More')}</span></button>`);});};
document.addEventListener('click',e=>{const b=e.target.closest('#feed .moreBtn');if(!b)return;e.stopPropagation();const rail=b.closest('.rail');const hid=s=>rail.querySelector(s);const rows=[];
  if(hid('[data-sendshort]'))rows.push(['📤 '+t('Send to a friend'),()=>hid('[data-sendshort]').click()]);
  if(hid('[data-why]'))rows.push(['💎 '+t('Ruby\'s score'),()=>hid('[data-why]').click()]);
  const pm=hid('[data-pmore]');if(pm)rows.push([(pm.textContent.trim()===t('Delete')?'🗑️ ':'🚩 ')+pm.textContent.trim(),()=>pm.click()]);
  actionSheet(t('More'),rows);},true);
/* Home look card: "Wear today" + ••• */
function addMoreActs(){$$('.acts').forEach(a=>{if(a.querySelector('.moreAct')||!a.querySelector('[data-save]'))return;a.insertAdjacentHTML('beforeend',`<button class="moreAct" aria-label="${t('More')}">${SV(DOTS)}</button>`);});}
new MutationObserver(()=>addMoreActs()).observe(document.body,{childList:true,subtree:true});addMoreActs();
document.addEventListener('click',e=>{const b=e.target.closest('.acts .moreAct');if(!b)return;e.stopPropagation();const a=b.closest('.acts');const rows=[];
  const sv=a.querySelector('[data-save]'),av=a.querySelector('[data-onav]');if(sv)rows.push(['🔖 '+t('Save this outfit'),()=>sv.click()]);if(av)rows.push(['🧍 '+t('See it on my avatar'),()=>av.click()]);actionSheet(t('More'),rows);},true);
/* Avatar moves: one button opens the 3 moves */
(function(){const bar=$('#animBar');if(!bar)return;const fix=()=>{if(!bar.querySelector('.animMain'))bar.insertAdjacentHTML('afterbegin',`<button class="animMain" aria-label="${t('Moves')}">${SV('<path d="M8 5l11 7-11 7z" fill="currentColor"/>')}</button>`);};
  new MutationObserver(fix).observe(bar,{childList:true});fix();
  bar.addEventListener('click',e=>{if(e.target.closest('.animMain')){bar.classList.toggle('open');e.stopPropagation();return;}if(e.target.closest('[data-anim]'))setTimeout(()=>bar.classList.remove('open'),300);},true);})();
/* home: Ruby is already first in Messages → no extra button at the top */
(function(){const css=document.createElement('style');css.textContent='#rubyBtn{display:none!important}';document.head.appendChild(css);})();

/* v24.1 Messages: no buttons in the header (search bar always there), no streak counters in the list, camera inside "+" */
(function(){const css=document.createElement('style');css.textContent=`
#chat .top #searchBtn,#chat .top #newGroup{display:none!important}
#chat #searchBox{display:flex!important}
#convs .crow .meta .flame{display:none!important}
#composer #snapBtn{display:none!important}`;document.head.appendChild(css);
 const sb=$('#searchBox');if(sb)sb.hidden=false;
 /* "New group" moves into the attach menu? No: it goes to the long-press on the title → keep it reachable from the search bar */
 const box=$('#searchBox');if(box&&!box.querySelector('.ngBtn')){box.insertAdjacentHTML('beforeend',`<button type="button" class="ngBtn" aria-label="${t('New group')}" style="border:0;background:none;color:var(--muted);display:grid;place-items:center;padding:0 2px">${SV(ICONS.group,'style="width:20px;height:20px"')}</button>`);box.querySelector('.ngBtn').onclick=e=>{e.preventDefault();$('#newGroup').click();};}})();

/* v24.2 red dot on Messages = only REAL unread messages or real message requests (not the examples) */
function realUnread(){let n=0;for(const id in S.chats){if(!uuidOf(id)||S.blocked[id])continue;const a=S.chats[id]||[];const m=a[a.length-1];if(m&&m.f==='them'&&!m.read)n++;}return n;}
function fixChatDot(){if(!(REAL&&ME_ID))return;const d=$('#chatDot');if(!d)return;const n=realUnread()+realReqs().length;d.hidden=!n;if(n)d.textContent='';}
setInterval(fixChatDot,800);

/* ====================== v25: real accounts only see real people ====================== */
function purgeDemo(){if(!REAL)return;
  Object.keys(USERS).forEach(k=>{if(!k.startsWith('r_'))delete USERS[k];});
  if(typeof DIRECTORY==='object')Object.keys(DIRECTORY).forEach(k=>delete DIRECTORY[k]);
  SAMPLE_SHORTS.length=0;Object.keys(STORIES).forEach(k=>{if(!k.startsWith('r_'))delete STORIES[k];});
  ['following','likes'].forEach(f=>Object.keys(S[f]||{}).forEach(k=>{if(f==='following'&&!k.startsWith('r_'))delete S[f][k];}));
  Object.keys(S.chats||{}).forEach(k=>{if(!k.startsWith('r_')&&!k.startsWith('G_'))delete S.chats[k];});
  S.groups=(S.groups||[]).filter(g=>String(g.id).startsWith('G_'));S.requests=[];S.streaks={};S.seedFollow=true;S.adopted={};save();}
purgeDemo();
seedChats=function(){if(!REAL){Object.keys(USERS).forEach((id,k)=>{if(!S.chats[id])S.chats[id]=[{f:'them',t:['Hey! Loved your last look 🔥','Are you joining the contest?','That jacket 😍','Hi!','Send me your outfit for tonight','Thanks for the follow!'][k%6]}];});}
  S.groups.forEach(g=>{if(!S.chats[g.id])S.chats[g.id]=[];});};
if(REAL&&current&&S.profile){try{show(current);}catch(_){}}

/* ---------- real counts on profiles ---------- */
async function realCount(tbl,col,val){try{const r=await SB.from(tbl).select(col,{count:'exact',head:true}).eq(col==='id'?'author':col,val);return r.count??(r.data||[]).length;}catch(_){return null;}}
const _renderMe25=renderMe;renderMe=function(){_renderMe25();if(!(REAL&&ME_ID))return;const st=$$('#meBody .meStats b');if(st.length<3)return;
  st[0].textContent=REALPOSTS.filter(p=>p.mine).length||S.posts.length;st[1].textContent=fmt(Object.keys(S.realFans||{}).length);st[2].textContent=fmt(Object.keys(S.following).filter(k=>S.following[k]&&k.startsWith('r_')).length);
  realCount('posts','id',ME_ID).then(n=>{if(n!=null&&st[0].isConnected)st[0].textContent=n;});};
const _openProfile25=openProfile;openProfile=function(id){const u=uuidOf(id);if(!u||!USERS[id])return _openProfile25(id);
  const tmp={id:'tmp_'+id,u:id,g:0,look:[''],likes:0};SAMPLE_SHORTS.push(tmp);try{_openProfile25(id);}finally{SAMPLE_SHORTS.splice(SAMPLE_SHORTS.indexOf(tmp),1);}
  const posts=REALPOSTS.filter(p=>p.author===u);const grid=$('#profBody .vgrid');
  if(grid)grid.innerHTML=posts.length?posts.map(p=>p.video?`<div data-pv="${p.id}" style="background:#111"><video src="${p.video}#t=0.1" muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"></video><span>▶ ${fmt(p.likes+(S.likes[p.id]?1:0))}</span></div>`:`<div data-pv="${p.id}" style="background:#222 center/cover url(${p.img})"><span>♥ ${fmt(p.likes+(S.likes[p.id]?1:0))}</span></div>`).join(''):`<p class="muted" style="grid-column:1/-1;text-align:center;padding:30px">${t('No posts yet')}</p>`;
  const st=$$('#profBody .stats b');if(st.length>=3){st[0].textContent=posts.length;st[1].textContent='…';st[2].textContent='…';
    realCount('posts','id',u).then(n=>{if(n!=null)st[0].textContent=n;});}
  const sc=$('#profBody .aiscore i');if(sc)sc.textContent='—';const bd=$('#profBody .badges');if(bd)bd.innerHTML='';};
document.addEventListener('click',e=>{const b=e.target.closest('#profBody [data-pv]');if(!b)return;const i=feedList().findIndex(p=>p.id===b.dataset.pv);closeOverlay('profile');show('shorts');if(i>=0)setTimeout(()=>{const el=$$('#feed .short')[i];if(el)el.scrollIntoView();},150);});

/* ====================== v26: wardrobe, looks, avatar and settings saved on the server ====================== */
const UD_KEYS=['wardrobe','removed','fav','laundry','worn','saved','looks','avatar','day','accent','sound','notif','modest','modestAsked','chatTheme','chatOpt','pins','favChats','home','week','trend','vip','plan','trialEnd','paid','lang','weather'];
let udT=null,udBusy=false,udReady=false;
function udHash(s){let h=s.length;for(let i=0;i<s.length;i+=53)h=(h*31+s.charCodeAt(i))|0;return (h>>>0).toString(36)+s.length.toString(36);}
async function udUpImg(o){const img=o&&o.img;if(!img||!String(img).startsWith('data:'))return o&&o.imgRef?o.imgRef:null;const h=udHash(img);if(o.imgRef&&o.imgH===h)return o.imgRef;
  const path=`${ME_ID}/${h}.jpg`;const up=await SB.storage.from('closet').upload(path,dataUrlToBlob(img),{contentType:'image/jpeg'});
  if(up.error&&!/exist|duplicate|409/i.test((up.error.message||'')+(up.error.statusCode||'')))throw up.error;o.imgRef=path;o.imgH=h;return path;}
async function udPush(){if(!(REAL&&SB&&ME_ID&&udReady)||udBusy)return;udBusy=true;
  try{const d={};UD_KEYS.forEach(k=>{if(S[k]!==undefined)d[k]=S[k];});
    for(const k of ['wardrobe','looks']){d[k]=[];for(const o of (S[k]||[])){const ref=await udUpImg(o);const c=Object.assign({},o);delete c.img;delete c.imgH;c.imgRef=ref;d[k].push(c);}}
    const p=Object.assign({},S.profile||{});delete p.photo;delete p.uid;delete p.email;d.profile=p;
    const now=new Date().toISOString();const {error}=await SB.from('user_data').upsert({id:ME_ID,data:d,updated_at:now});if(!error){S.udAt=now;try{localStorage.setItem(KEY,JSON.stringify(S));}catch(_){}}}
  catch(e){console.warn('udPush',e);}udBusy=false;}
async function udImg(path){try{const {data}=await SB.storage.from('closet').download(path);if(!data)return null;return await new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.onerror=()=>r(null);f.readAsDataURL(data);});}catch(_){return null;}}
async function udRestore(){if(!(REAL&&SB&&ME_ID))return;
  try{const {data:row,error}=await SB.from('user_data').select('*').eq('id',ME_ID).maybeSingle();if(error){udReady=true;return;}
    if(row&&row.data&&(!S.udAt||Date.parse(row.updated_at)>Date.parse(S.udAt)+1000)){const d=row.data;
      for(const k of ['wardrobe','looks'])if(Array.isArray(d[k])){for(const o of d[k]){if(o.imgRef){o.img=await udImg(o.imgRef);if(o.img)o.imgH=udHash(o.img);}}d[k]=d[k].filter(o=>o.img||k==='wardrobe');}
      UD_KEYS.forEach(k=>{if(d[k]!==undefined)S[k]=d[k];});
      if(d.profile&&S.profile){const keep={username:S.profile.username,uid:S.profile.uid,email:S.profile.email,photo:S.profile.photo};S.profile=Object.assign({},S.profile,d.profile,keep);}
      S.udAt=row.updated_at;S.today=null;try{localStorage.setItem(KEY,JSON.stringify(S));}catch(_){}
      applyTheme();applyLang();if(current&&!['lang','signup','splash'].includes(current))show(current);}
    udReady=true;if(!row)udPush();}catch(e){udReady=true;}}
const _save26=save;save=function(){_save26();if(REAL&&ME_ID&&udReady){clearTimeout(udT);udT=setTimeout(udPush,6000);}};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&udT){clearTimeout(udT);udT=null;udPush();}});

/* ====================== v27: real group chats ====================== */
let GCH=null;
const gid=id=>String(id).startsWith('G_')?id.slice(2):null;
function gToLocal(m){const mine=m.sender===ME_ID;const x={f:m.kind==='sys'?'sys':mine?'me':'them',by:mine?undefined:rid(m.sender),ts:Date.parse(m.created_at),dbid:m.id,st:mine?'delivered':undefined,read:mine};
  const k=m.kind||'text';if(k==='text'||k==='sys')x.t=m.body;else if(k==='voice'){x.voice=1;x.dur=m.body||'0:05';x.media=m.media;}else if(k==='video'){x.isVid=1;x.vid='';x.dur=m.body||'';x.media=m.media;}else{x.media=m.media;x.img='';x.filter=m.body;}return x;}
async function gSign(list){const need=list.filter(x=>x.media&&!x.url);if(!need.length)return;const {data}=await SB.storage.from('groups').createSignedUrls(need.map(x=>x.media),3600*6);
  (data||[]).forEach((d,i)=>{const x=need[i];if(d&&d.signedUrl){x.url=d.signedUrl;if(x.voice)x.a=d.signedUrl;else if(x.isVid)x.vid=d.signedUrl;else x.img=d.signedUrl;}});}
async function gLoad(){if(!(REAL&&SB&&ME_ID))return;
  try{const {data:mm,error}=await SB.from('group_members').select('group_id').eq('member',ME_ID);if(error)return;const ids=(mm||[]).map(x=>x.group_id);
    const keep=S.groups.filter(g=>!String(g.id).startsWith('G_'));if(!ids.length){S.groups=keep;save();return;}
    const [{data:gs},{data:mem},{data:msgs}]=await Promise.all([SB.from('groups').select('*').in('id',ids),SB.from('group_members').select('*').in('group_id',ids),SB.from('group_messages').select('*').in('group_id',ids).order('created_at',{ascending:true}).limit(1500)]);
    await gcEnsure([...new Set((mem||[]).map(x=>x.member).filter(u=>u!==ME_ID))]);
    S.groups=[...keep,...(gs||[]).map(g=>({id:'G_'+g.id,name:g.name,owner:g.owner,members:(mem||[]).filter(x=>x.group_id===g.id&&x.member!==ME_ID).map(x=>rid(x.member)),real:true}))];
    const by={};(msgs||[]).forEach(m=>{(by['G_'+m.group_id]=by['G_'+m.group_id]||[]).push(gToLocal(m));});
    for(const g of S.groups){if(!g.real)continue;const old=S.chats[g.id]||[];const fresh=by[g.id]||[];old.forEach(o=>{const f=fresh.find(x=>x.dbid===o.dbid);if(f&&o.read)f.read=true;});
      const pend=old.filter(o=>!o.dbid&&o.f==='me');S.chats[g.id]=[...fresh,...pend];}
    try{await gSign(Object.values(by).flat());}catch(_){}save();gListen();if(current==='chat')renderChatList();else if(current==='room'&&gid(roomId))renderMsgs();}catch(e){console.warn('gLoad',e);}}
function gListen(){if(GCH)SB.removeChannel(GCH);
  GCH=SB.channel('groups-'+ME_ID)
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'group_messages'},async p=>{const m=p.new;if(m.sender===ME_ID)return;const id='G_'+m.group_id;if(!S.groups.some(g=>g.id===id)){gLoad();return;}
      const a=S.chats[id]=S.chats[id]||[];if(a.some(x=>x.dbid===m.id))return;await gcEnsure([m.sender]);const here=current==='room'&&roomId===id;const loc=Object.assign(gToLocal(m),{read:here});try{await gSign([loc]);}catch(_){}a.push(loc);save();
      if(here)renderMsgs();else if(current==='chat')renderChatList();fixChatDot();if(navigator.vibrate)try{navigator.vibrate(15);}catch(_){}})
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'group_members',filter:`member=eq.${ME_ID}`},()=>gLoad())
   .subscribe();}
function gSend(id,m){const g=gid(id);m.ts=Date.now();m.st='sent';(S.chats[id]=S.chats[id]||[]).push(m);save();
  if(current==='room'&&roomId===id){renderMsgs();try{flyLast();burstSend();pop();}catch(_){}}
  (async()=>{let row={group_id:g,kind:'text',body:m.t};
    if(m.vid&&m.vidBlob){const blob=m.vidBlob;if(blob.size>50*1024*1024)return {error:{code:'big'}};const ext=/mp4|quicktime/.test(blob.type)?'mp4':'webm';const path=`${g}/${ME_ID}/${Date.now()}.${ext}`;
      const up=await SB.storage.from('groups').upload(path,blob,{contentType:blob.type||'video/mp4'});if(up.error)return {error:up.error};m.media=path;delete m.vidBlob;row={group_id:g,kind:'video',media:path,body:m.dur||null};}
    else if(m.img||m.a){const blob=dataUrlToBlob(m.img||m.a);const ext=m.a?((blob.type.includes('mp4')||blob.type.includes('aac'))?'m4a':'webm'):'jpg';const path=`${g}/${ME_ID}/${Date.now()}.${ext}`;
      const up=await SB.storage.from('groups').upload(path,blob,{contentType:blob.type||'application/octet-stream'});if(up.error)return {error:up.error};m.media=path;row=m.a?{group_id:g,kind:'voice',media:path,body:m.dur||null}:{group_id:g,kind:'image',media:path,body:m.filter||null};}
    else if(!m.t)return {error:{code:'empty'}};
    return SB.from('group_messages').insert(row).select().single();})().then(({data,error})=>{
    if(error){m.failed=true;toast(error.code==='big'?t('This video is too big (max 50 MB).'):t('Not sent. Check your internet.'));}
    else{m.dbid=data.id;m.st='delivered';const gr=S.groups.find(x=>x.id===id);const prev=m.t||(m.vid?'🎬 '+t('Video message'):m.a?'🎙️ '+t('Voice message'):'📷 '+t('Photo'));
      if(gr)gr.members.forEach(u=>{const uu=uuidOf(u);if(uu)pushText(uu,(gr.name+': '+prev));});}
    save();if(current==='room'&&roomId===id)renderMsgs();});}
PUSHW.unshift(function(){const _p=pushMsg;pushMsg=function(id,m){if(gid(id)&&m&&m.f==='me')return gSend(id,m);return _p.apply(this,arguments);};});
function realFriends(){return Object.keys(USERS).filter(u=>u.startsWith('r_')&&!S.blocked[u]&&S.following[u]&&(S.realFans||{})[u]);}
async function gCreate(name,members){const {data:g,error}=await SB.from('groups').insert({name}).select().single();if(error||!g){toast(t('Not sent. Check your internet.'));return null;}
  const {error:e1}=await SB.from('group_members').insert({group_id:g.id,member:ME_ID});if(e1){toast(t('Not sent. Check your internet.'));return null;}
  await SB.from('group_members').insert(members.map(u=>({group_id:g.id,member:uuidOf(u)})));
  await SB.from('group_messages').insert({group_id:g.id,kind:'sys',body:t('{n} created the group',{n:'@'+me().username})});
  await gLoad();return 'G_'+g.id;}
document.addEventListener('click',e=>{if(!(REAL&&ME_ID&&SB))return;if(!e.target.closest('#newGroup'))return;e.stopImmediatePropagation();e.preventDefault();
  const fr=realFriends();const sel=new Set();
  if(!fr.length){openSheet(`<h3>👥 ${t('New group')}</h3><p class="muted" style="text-align:center;padding:16px 0">${t('Add friends first: a group is only with friends who follow you back.')}</p>`);return;}
  openSheet(`<h3>👥 ${t('New group')}</h3><input class="field" id="gName" maxlength="40" placeholder="${t('Group name')}" style="height:48px;font-size:15px;margin:10px 0"><div>${fr.map(u=>`<button class="pick" data-gm="${u}">${avHTML(u,42)}<b>${esc(USERS[u].name)}</b><span class="check"></span></button>`).join('')}</div><button class="btn primary" id="gGo" style="margin-top:12px">${t('Create group')}</button>`);
  $('#sheet').querySelectorAll('[data-gm]').forEach(b=>b.onclick=()=>{const u=b.dataset.gm;sel.has(u)?sel.delete(u):sel.add(u);const c=b.querySelector('.check');c.classList.toggle('on',sel.has(u));c.textContent=sel.has(u)?'✓':'';});
  $('#gGo').onclick=async()=>{const name=$('#gName').value.trim();if(!name||sel.size<1){toast(t('Add a name and at least 1 friend'));return;}if(sel.size>30){toast(t('Max 30 people'));return;}
    $('#gGo').disabled=true;const id=await gCreate(name,[...sel]);closeSheet();if(id)openRoom(id);};},true);
async function gLeave(id){const g=gid(id);if(!g)return;await SB.from('group_members').delete().eq('group_id',g).eq('member',ME_ID);S.groups=S.groups.filter(x=>x.id!==id);delete S.chats[id];save();try{closeRoom();}catch(_){}show('chat');toast(t('You left the group'));}
const _realUnread27=realUnread;realUnread=function(){let n=_realUnread27();for(const id in S.chats){if(!gid(id))continue;const a=S.chats[id]||[];const m=a[a.length-1];if(m&&m.f==='them'&&!m.read)n++;}return n;};
const _afterLogin25=afterLogin;afterLogin=async function(){await _afterLogin25();udRestore();gLoad();i18nAfterLogin();};

/* ====================== v28: every language, translated once by Ruby and shared ====================== */
async function i18nFetch(c){if(!SB||c==='en')return 0;let n=0;window.I18N[c]=window.I18N[c]||{};
  try{for(let from=0;from<6000;from+=1000){const {data,error}=await SB.from('i18n').select('k,v').eq('lang',c).range(from,from+999);if(error||!data)break;data.forEach(r=>{if(!(r.k in window.I18N[c])){window.I18N[c][r.k]=r.v;n++;}});if(data.length<1000)break;}
    if(n)try{localStorage.setItem('rstyle_i18n_'+c,JSON.stringify(window.I18N[c]));}catch(_){}}catch(_){}return n;}
const _translateKeys28=translateKeys;translateKeys=async function(c,keys,onProgress,par){const before=new Set(Object.keys(window.I18N[c]||{}));await _translateKeys28(c,keys,onProgress,par);
  if(!(SB&&ME_ID))return;const rows=keys.filter(k=>!before.has(k)&&window.I18N[c][k]).map(k=>({lang:c,k,v:window.I18N[c][k]}));
  for(let i=0;i<rows.length;i+=200)try{await SB.from('i18n').upsert(rows.slice(i,i+200),{onConflict:'lang,k',ignoreDuplicates:true});}catch(_){}};
setLanguage=async function(c){
  if(c!=='en'&&!langComplete(c)){loadCachedLang(c);
    if(!langComplete(c)){for(let i=0;i<15&&!SB&&REAL;i++)await new Promise(r=>setTimeout(r,200));await i18nFetch(c);}
    if(!langComplete(c)&&AI){const ok=await translateTo(c);if(ok==='cancel')return false;}}
  S.lang=c;save();applyLang();if(current&&!['lang','signup'].includes(current))show(current);return true;};
async function i18nAfterLogin(){const c=S.lang;if(!c||c==='en'||langComplete(c))return;await i18nFetch(c);applyLang();
  if(!langComplete(c)){for(let i=0;i<20&&!(AI&&AI.gemini);i++)await new Promise(r=>setTimeout(r,500));if(AI)translateTo(c);}
  else if(current&&!['lang','signup'].includes(current))show(current);}
(async()=>{if(!REAL||!S.lang||S.lang==='en'||langComplete(S.lang))return;for(let i=0;i<25&&!SB;i++)await new Promise(r=>setTimeout(r,200));if(await i18nFetch(S.lang)){applyLang();if(current&&!['lang','signup'].includes(current))show(current);}})();
(function(){const T={'No posts yet':['Pas encore de posts','עדיין אין פוסטים','لا توجد منشورات بعد'],
 'Add friends first: a group is only with friends who follow you back.':['Ajoute d\'abord des amis : un groupe, c\'est seulement avec des amis qui te suivent aussi.','קודם תוסיף חברים: קבוצה היא רק עם חברים שעוקבים גם אחריך.','أضف أصدقاء أولاً: المجموعة فقط مع أصدقاء يتابعونك أيضاً.'],
 'Add a name and at least 1 friend':['Ajoute un nom et au moins 1 ami','תוסיף שם ולפחות חבר אחד','أضف اسماً وصديقاً واحداً على الأقل'],
 'Max 30 people':['30 personnes maximum','מקסימום 30 אנשים','30 شخصاً كحد أقصى'],'You left the group':['Tu as quitté le groupe','יצאת מהקבוצה','غادرت المجموعة'],'Leave group':['Quitter le groupe','לצאת מהקבוצה','مغادرة المجموعة']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
const _openContact27=openContact;openContact=function(id){_openContact27(id);if(!gid(id))return;const d=$('#ciBody .ciCard.danger');if(d&&!d.querySelector('[data-gleave]'))d.insertAdjacentHTML('beforeend',ciRow('export',t('Leave group'),'','data-gleave="1"'));
  const g=S.groups.find(x=>x.id===id);const top=$('#ciBody .ciTop small');if(g&&top)top.textContent=[me().username,...g.members.map(u=>USERS[u]?.name||'')].filter(Boolean).join(', ');};
document.addEventListener('click',e=>{if(!e.target.closest('[data-gleave]'))return;e.stopPropagation();const id=ciId;closeOverlay('cinfo');gLeave(id);},true);
const _avHTML25=avHTML;avHTML=function(u,size){if(u!=='me'&&!USERS[u])return `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size*.36)}px;background:#555">?</span>`;return _avHTML25(u,size);};
const _renderChallenge25=renderChallenge;renderChallenge=function(){if(REAL){const b=$('#challenge');if(b)b.innerHTML='';return;}return _renderChallenge25();};

/* ====================== v29: no filters at all; "+" → Camera or Photos (gallery) ====================== */
(function(){FT.failed=true;SNAP.filter='none';CALL.filter='none';
 const css=document.createElement('style');css.textContent=`#snap #snapRing,#snap .bxTabs,#snap .fname,#snap .trk,#snap .bxOut,#call #callRing,#call .fhint,#call .fname,.cmenu [data-cm="filters"]{display:none!important}`;document.head.appendChild(css);
 const _o=openSnap;openSnap=function(to){const r=_o(to);SNAP.filter='none';return r;};
 const T={'Camera':['Caméra','מצלמה','الكاميرا'],'Photos':['Photos','תמונות','الصور'],'Take a photo or a video':['Prendre une photo ou une vidéo','לצלם תמונה או וידאו','التقاط صورة أو فيديو'],'From your gallery':['Depuis ta galerie','מהגלריה שלך','من معرض الصور']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
async function openGallerySend(to){const fl=await pickFile('image/*,video/*');if(!fl)return;SNAP.to=to;SNAP.filter='none';SNAP.once=false;SNAP.img=null;SNAP.vid=null;SNAP.vidBlob=null;SNAP.raw=null;
  if(fl.type.startsWith('video')){const url=URL.createObjectURL(fl);const fr=await videoFrame(url);if(fr&&fr.dur>61){toast(t('Video is too long (max 60 s)'));return;}if(fl.size>50*1024*1024){toast(t('This video is too big (max 50 MB).'));return;}
    SNAP.vidBlob=fl;SNAP.vid=url;SNAP.vidDur=fr?fmtSec(fr.dur):'';}else SNAP.img=await downscale(await readFile(fl),1000,.85);
  $('#snap').classList.add('on');renderSnap();}
document.addEventListener('click',e=>{if(!e.target.closest('#attachBtn'))return;setTimeout(()=>{const ph=$('#atPhoto');if(!ph||$('#atGal'))return;
  ph.querySelector('b').textContent='📷 '+t('Camera');const sm=ph.querySelector('small');if(sm)sm.textContent=t('Take a photo or a video');
  ph.insertAdjacentHTML('afterend',`<button class="srow" id="atGal"><div class="l"><b>🖼️ ${t('Photos')}</b><small class="muted">${t('From your gallery')}</small></div></button>`);
  $('#atGal').onclick=()=>{const to=roomId;closeSheet();openGallerySend(to);};},0);});

/* ====================== v30: smoother app ====================== */
/* 1. save to the phone at most every 0.4 s (big wardrobe photos made every save slow) */
(function(){const _sv=save;let T=null,off=false;
 save=function(){if(off||T)return;T=setTimeout(()=>{T=null;if(!off)_sv();},400);};
 const flush=()=>{if(T){clearTimeout(T);T=null;if(!off)_sv();}};window.saveNow=flush;
 addEventListener('pagehide',flush);addEventListener('beforeunload',flush);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flush();});
 const _rm=Storage.prototype.removeItem;Storage.prototype.removeItem=function(k){if(k===KEY){off=true;if(T){clearTimeout(T);T=null;}}return _rm.call(this,k);};})();
/* 2. wardrobe photos: decode each big photo once (blob link instead of a huge text in every card) */
(function(){const C=new Map();const blobOf=d=>{if(!d||!String(d).startsWith('data:'))return d;let u=C.get(d);if(!u){try{u=URL.createObjectURL(dataUrlToBlob(d));C.set(d,u);}catch(_){return d;}}return u;};
 const _ph=itemPh;itemPh=function(it){if(it&&it.img&&String(it.img).startsWith('data:'))return `style="background-image:url(${blobOf(it.img)})"`;return _ph(it);};window.blobOf=blobOf;})();
/* 3. Shorts: only the video on screen plays */
(function(){let io=null;function watch(){const feed=$('#feed');if(!feed||!('IntersectionObserver' in window))return;if(io)io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(en=>{const v=en.target;if(en.isIntersecting&&en.intersectionRatio>.6&&current==='shorts'){v.preload='auto';const p=v.play();if(p&&p.catch)p.catch(()=>{});}else{try{v.pause();}catch(_){}}}),{root:feed,threshold:[0,.6]});
  feed.querySelectorAll('video.bg').forEach((v,i)=>{v.removeAttribute('autoplay');v.autoplay=false;if(i>1)v.preload='metadata';try{if(i>0)v.pause();}catch(_){}io.observe(v);});}
 const _rf=renderFeed;renderFeed=function(){const r=_rf.apply(this,arguments);watch();return r;};
 const _sh=show;show=function(id){if(id!=='shorts')$$('#feed video').forEach(v=>{try{v.pause();}catch(_){}});return _sh.apply(this,arguments);};})();
/* 4. long chats: only the last 60 messages are drawn, "earlier messages" loads more */
window.MSG_LIM={};
document.addEventListener('click',e=>{const b=e.target.closest('#msgs .moreMsgs');if(!b)return;const box=$('#msgs');const oh=box.scrollHeight,ot=box.scrollTop;MSG_LIM[roomId]=(MSG_LIM[roomId]||60)+60;renderMsgs();box.scrollTop=box.scrollHeight-oh+ot;});
(function(){const _or=openRoom;openRoom=function(id){MSG_LIM[id]=60;return _or.apply(this,arguments);};
 const css=document.createElement('style');css.textContent=`
#msgs .moreMsgs{display:block;margin:8px auto 4px;border:0;border-radius:14px;padding:7px 14px;font:600 12.5px Inter,system-ui;background:var(--card2);color:var(--fg)}
#convs .crow{content-visibility:auto;contain-intrinsic-size:auto 72px}
.wgrid .item,.ogrid>*{content-visibility:auto;contain-intrinsic-size:auto 200px}
html{-webkit-tap-highlight-color:transparent}
button,a,.crow,.fc,.item{touch-action:manipulation}
#feed{overscroll-behavior:contain}#msgs,#convs,.pscroll{overscroll-behavior-y:contain;-webkit-overflow-scrolling:touch}`;document.head.appendChild(css);
 const T={'Earlier messages':['Messages précédents','הודעות קודמות','رسائل سابقة']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
/* 5. nav pill: measure once per frame (no double layout on every screen change) */
(function(){const mp=window.movePill;if(!mp)return;let q=0;window.movePill=function(){if(q)return;q=requestAnimationFrame(()=>{q=0;mp();});};movePill=window.movePill;})();
/* 6. camera: nothing to draw any more (no filters) */
bxLoop=function(){cancelAnimationFrame(BX.raf);BX.raf=0;const o=$('#snap .bxOut');if(o)o.remove();};

/* ====================== v31: Shorts subscriptions are separate from friends + account search in Shorts ====================== */
S.subs=S.subs||{};
function isSub(id){return !!(S.subs||{})[id];}
followBtn=function(uid){const on=isSub(uid);return `<button class="follow ${on?'on':''}" data-subu="${uid}">${on?t('Subscribed'):t('Subscribe')}</button>`;};
async function toggleSub(uid){const on=!isSub(uid);S.subs[uid]=on;if(!on)delete S.subs[uid];save();
  $$(`[data-subu="${uid}"]`).forEach(b=>{b.classList.toggle('on',on);b.textContent=on?t('Subscribed'):t('Subscribe');});
  const u=uuidOf(uid);if(REAL&&SB&&ME_ID&&u){const r=on?await SB.from('subs').insert({follower:ME_ID,followee:u}):await SB.from('subs').delete().eq('follower',ME_ID).eq('followee',u);if(r&&r.error&&!/duplicate/i.test(r.error.message||''))console.warn('subs',r.error);}
  if(current==='shorts'&&feedMode==='following')renderFeed();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-subu]');if(!b)return;e.stopPropagation();e.preventDefault();toggleSub(b.dataset.subu);},true);
/* the "Subscriptions" tab, its circles and its videos use subscriptions, not friends */
(function(){const swap=fn=>function(){const f=S.following;S.following=S.subs||{};try{return fn.apply(this,arguments);}finally{S.following=f;}};
 renderFeed=swap(renderFeed);renderSubs=swap(renderSubs);subVideos=swap(subVideos);})();
async function loadSubs(){if(!(REAL&&SB&&ME_ID))return;try{const {data,error}=await SB.from('subs').select('followee').eq('follower',ME_ID);if(error)return;
  const ids=(data||[]).map(x=>x.followee);S.subs={};ids.forEach(u=>S.subs[rid(u)]=true);const miss=ids.filter(u=>!USERS[rid(u)]);if(miss.length){const {data:ps}=await SB.from('profiles').select('*').in('id',miss);(ps||[]).forEach(addReal);}
  save();if(current==='shorts')renderFeed();}catch(_){}}
{const _al31=afterLogin;afterLogin=async function(){await _al31();loadSubs();};}
/* counts: subscribers / subscriptions */
{const _pr31=openProfile;openProfile=function(id){_pr31(id);const u=uuidOf(id);if(!u||!REAL||!SB)return;const st=$$('#profBody .stats b');const lb=$$('#profBody .stats small');if(st.length<3)return;
  if(lb[1])lb[1].textContent=t('Subscribers');if(lb[2])lb[2].textContent=t('Subscriptions');st[1].textContent='…';st[2].textContent='…';
  realCount('subs','followee',u).then(n=>{st[1].textContent=n==null?'—':fmt(n);});realCount('subs','follower',u).then(n=>{st[2].textContent=n==null?'—':fmt(n);});};}
{const _rm31=renderMe;renderMe=function(){_rm31();const st=$$('#meBody .meStats b'),lb=$$('#meBody .meStats small');if(st.length<3)return;if(lb[1])lb[1].textContent=t('Subscribers');if(lb[2])lb[2].textContent=t('Subscriptions');
  st[2].textContent=fmt(Object.keys(S.subs||{}).length);if(REAL&&SB&&ME_ID)realCount('subs','followee',ME_ID).then(n=>{if(n!=null&&st[1].isConnected)st[1].textContent=fmt(n);});else st[1].textContent='0';};}
/* search accounts from Shorts */
(function(){const top=$('.shortsTop');if(top&&!$('#shSearch')){top.insertAdjacentHTML('afterbegin',`<button class="shSearch" id="shSearch" aria-label="${t('Search accounts')}">${SV(ICONS.search)}</button>`);}
 const css=document.createElement('style');css.textContent=`.shortsTop .shSearch{position:absolute;inset-inline-start:14px;width:38px;height:38px;border-radius:50%;background:#ffffff26;color:#fff;display:grid;place-items:center;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:0}
.shortsTop .shSearch svg{width:20px;height:20px}
.accRes{display:flex;flex-direction:column;gap:2px;margin-top:10px;max-height:58vh;overflow:auto}
.accRow{display:flex;align-items:center;gap:12px;padding:8px 2px;border:0;background:none;color:var(--fg);text-align:start;width:100%}
.accRow .who{flex:1;display:flex;flex-direction:column;min-width:0}.accRow .who b{font-size:15px}.accRow .who small{color:var(--muted);font-size:12.5px}
.accRow .follow{flex:none}`;document.head.appendChild(css);
 const T={'Subscribe':['S\'abonner','הירשם','اشتراك'],'Subscribed':['Abonné','רשום','مشترك'],'Subscribers':['Abonnés','מנויים','المشتركون'],'Subscriptions':['Abonnements','מינויים','الاشتراكات'],
  'Search accounts':['Rechercher des comptes','חיפוש חשבונות','ابحث عن حسابات'],'Search a @username':['Cherche un @pseudo','חפש @שם משתמש','ابحث عن @اسم'],'No results.':['Aucun résultat.','אין תוצאות.','لا نتائج.']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 let tok=0;const row=id=>{const u=USERS[id];return `<div class="accRow" data-acc="${id}">${avHTML(id,46)}<span class="who"><b>@${esc(u.handle||u.name)}</b><small>${esc(u.name||'')}</small></span>${followBtn(id)}</div>`;};
 async function run(q){const box=$('#accRes');if(!box)return;const my=++tok;q=q.trim().replace(/^@/,'');if(!q){box.innerHTML='';return;}
   let ids=[];if(REAL&&SB&&ME_ID){const {data}=await SB.from('profiles').select('*').ilike('username','%'+q.replace(/[%_]/g,'')+'%').neq('id',ME_ID).limit(25);if(my!==tok)return;(data||[]).forEach(p=>ids.push(addReal(p)));}
   else ids=Object.keys(USERS).filter(id=>(USERS[id].handle+' '+USERS[id].name).toLowerCase().includes(q.toLowerCase()));
   ids=ids.filter(id=>!S.blocked[id]);box.innerHTML=ids.length?ids.map(row).join(''):`<p class="muted" style="text-align:center;padding:18px">${t('No results.')}</p>`;}
 document.addEventListener('click',e=>{if(!e.target.closest('#shSearch'))return;openSheet(`<h3>${t('Search accounts')}</h3><input class="field" id="accQ" type="search" autocomplete="off" placeholder="${t('Search a @username')}" style="height:46px;font-size:15px;margin-top:10px"><div class="accRes" id="accRes"></div>`);
   const i=$('#accQ');let d=null;i.oninput=()=>{clearTimeout(d);d=setTimeout(()=>run(i.value),250);};setTimeout(()=>i.focus(),150);
   $('#accRes').onclick=ev=>{if(ev.target.closest('[data-subu]'))return;const r=ev.target.closest('[data-acc]');if(!r)return;closeSheet();openProfile(r.dataset.acc);};});})();

/* ====================== v32: WhatsApp-style message menu (long press): emojis, reply, forward, copy, info, star, edit, delete, translate ====================== */
(function(){
 const T={'Reply':['Répondre','השב','رد'],'Forward':['Transférer','העבר','إعادة توجيه'],'Copy':['Copier','העתק','نسخ'],'Info':['Infos','מידע','معلومات'],'Star':['Important','חשוב','مهم'],'Unstar':['Plus important','בטל חשוב','إزالة المهم'],
  'Edit':['Modifier','ערוך','تعديل'],'Delete':['Supprimer','מחק','حذف'],'More':['Plus','עוד','المزيد'],'Translate':['Traduire','תרגם','ترجمة'],'Back':['Retour','חזרה','رجوع'],
  'Delete for me':['Supprimer pour moi','מחק אצלי','حذف لدي'],'Delete for everyone':['Supprimer pour tous','מחק אצל כולם','حذف لدى الجميع'],'This message was deleted':['Ce message a été supprimé','ההודעה נמחקה','تم حذف هذه الرسالة'],
  'Edited':['Modifié','נערך','معدّل'],'Copied':['Copié','הועתק','تم النسخ'],'Forward to…':['Transférer à…','העבר אל…','إعادة توجيه إلى…'],'Forwarded':['Transféré','הועבר','تمت إعادة التوجيه'],
  'Message info':['Infos du message','מידע על ההודעה','معلومات الرسالة'],'Sent':['Envoyé','נשלח','أُرسلت'],'Delivered':['Distribué','נמסר','وصلت'],'Read':['Lu','נקרא','قُرئت'],
  'Editing':['Modification','עריכה','تعديل'],'You':['Toi','את/ה','أنت'],'Translating…':['Traduction…','מתרגם…','جارٍ الترجمة…'],'Translation needs Ruby (log in).':['La traduction a besoin de Ruby (connecte-toi).','התרגום צריך את רובי (צריך להתחבר).','الترجمة تحتاج روبي (سجّل الدخول).'],
  'Message not changed. Check your internet.':['Message non modifié. Vérifie ta connexion.','ההודעה לא שונתה. בדוק את האינטרנט.','لم تُعدّل الرسالة. تحقق من الإنترنت.'],'Translated':['Traduit','תורגם','مترجم']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`
#mmenu{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.35);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);display:flex;flex-direction:column;justify-content:center;padding:20px 14px;animation:mmIn .18s ease-out}
@keyframes mmIn{from{opacity:0}to{opacity:1}}
#mmenu .mmw{display:flex;flex-direction:column;gap:10px;max-height:100%;}
#mmenu.me .mmw{align-items:flex-end}#mmenu.them .mmw{align-items:flex-start}
#mmenu .emo{display:flex;gap:4px;background:var(--card);border-radius:30px;padding:6px 8px;box-shadow:0 8px 30px rgba(0,0,0,.25);animation:mmPop .22s cubic-bezier(.2,1.4,.4,1)}
@keyframes mmPop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
#mmenu .emo button{border:0;background:none;font-size:27px;width:42px;height:42px;border-radius:50%;line-height:1;transition:transform .12s}
#mmenu .emo button:active{transform:scale(1.3)}#mmenu .emo button.on{background:var(--card2)}
#mmenu .emo .plus{font-size:22px;color:var(--muted);background:var(--card2)}
#mmenu .bub{max-width:78%;pointer-events:none}
#mmenu .bub .m{margin:0;max-width:100%;animation:none}
#mmenu .list{background:var(--card);border-radius:16px;min-width:230px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.25);animation:mmPop .22s cubic-bezier(.2,1.2,.4,1)}
#mmenu .list button{display:flex;width:100%;align-items:center;justify-content:space-between;gap:16px;padding:12px 16px;border:0;background:none;color:var(--fg);font:500 15.5px Inter,system-ui;text-align:start}
#mmenu .list button+button{border-top:1px solid var(--line)}#mmenu .list button svg{width:20px;height:20px;flex:none}
#mmenu .list button.red{color:#EF4444}
.emoGrid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;margin-top:12px;max-height:46vh;overflow:auto}.emoGrid button{border:0;background:none;font-size:28px;padding:4px}
#msgs .m .rq{display:block;border-inline-start:3px solid var(--accent);background:rgba(0,0,0,.08);border-radius:8px;padding:5px 8px;margin:-2px -2px 6px;font-size:12.5px;line-height:1.3;max-width:260px}
#msgs .m.me .rq{background:rgba(255,255,255,.18)}#msgs .m .rq b{display:block;font-size:12px;opacity:.9}#msgs .m .rq span{display:block;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#msgs .m .edt{font-size:10.5px;opacity:.6;margin-inline-start:6px}
#msgs .m .trl{display:block;margin-top:6px;padding-top:6px;border-top:1px solid rgba(127,127,127,.3);font-size:13.5px;opacity:.9}#msgs .m .trl small{display:block;font-size:10.5px;opacity:.6}
#msgs .m.hasemo{margin-bottom:18px;position:relative}#msgs .m .emob{position:absolute;bottom:-14px;inset-inline-end:8px;background:var(--card);border:2px solid var(--bg);border-radius:12px;padding:1px 5px;font-size:14px;line-height:1.3;box-shadow:0 1px 4px rgba(0,0,0,.15);color:var(--fg)}
#msgs .m.them .emob{inset-inline-end:auto;inset-inline-start:8px}
#msgs .m.del{opacity:.7;font-style:italic}
#replyBar{display:flex;align-items:center;gap:10px;background:var(--card);border-inline-start:4px solid var(--accent);border-radius:12px;padding:8px 10px;margin:0 0 6px;font-size:13px}
#replyBar .t{flex:1;min-width:0}#replyBar .t b{display:block;font-size:12.5px;color:var(--accent)}#replyBar .t span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--muted)}
#replyBar button{border:0;background:none;color:var(--muted);width:28px;height:28px;display:grid;place-items:center}#replyBar svg{width:18px;height:18px}`;document.head.appendChild(css);})();
const EMO6=['❤️','👍','😂','😮','😢','🙏'];
const EMOALL='😀 😃 😄 😁 😆 🥹 😅 🤣 😊 😇 🙂 😉 😍 🥰 😘 😋 😛 😜 🤪 😎 🤩 🥳 😏 😒 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤯 😳 🥵 🥶 😱 😨 🤗 🤔 🫣 🤭 🤫 😶 😐 😬 🙄 😴 🤤 😷 🤒 🤠 👻 💀 👽 🤖 💩 😺 😻 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 ❣️ 💔 ❤️‍🔥 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💯 ✨ 🔥 ⭐ 🌟 💫 🎉 🎊 👑 💎 👗 👠 👜 👟 🧢 🕶️ 💄 💅 👌 ✌️ 🤞 🤟 👏 🙌 👐 🤝 💪 👀'.split(' ');
let REPLY=null,EDIT=null;
const mmPrev=m=>m.del?t('This message was deleted'):m.t?m.t:m.vid||m.isVid?'🎬 '+t('Video message'):m.a||m.voice?'🎙️ '+t('Voice message'):m.img?'📷 '+t('Photo'):m.outfit?'👗 '+t('Outfit'):'…';
const whoOf=m=>m.f==='me'?t('You'):(USERS[m.by||roomId]?.name||'');
function mmClose(){const o=$('#mmenu');if(o)o.remove();}
function mmOpen(k){const all=S.chats[roomId]||[];const m=all[k];if(!m||m.f==='sys'||m.del)return;mmClose();if(navigator.vibrate)try{navigator.vibrate(12);}catch(_){}
  const mine=m.f==='me';const el=document.querySelector(`#msgs .m[data-k="${k}"]`);const ov=document.createElement('div');ov.id='mmenu';ov.className=mine?'me':'them';
  const real=!!uuidOf(roomId);const canEdit=mine&&m.t&&!m.img&&!m.a&&!m.voice&&(!m.ts||Date.now()-m.ts<15*60*1000);
  const I=d=>SV(d);const ico={reply:'<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 5 5v6"/>',fwd:'<path d="M15 14l5-5-5-5"/><path d="M20 9H9a5 5 0 0 0-5 5v6"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
   info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',star:'<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
   more:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',tr:'<path d="M4 5h9M8 3v2c0 4-2 7-5 9M6 9c1 2 3 4 6 5"/><path d="M13 21l4-10 4 10M14.5 17h5"/>',back:'<path d="M15 5l-7 7 7 7"/>'};
  const row=(id,label,icon,red)=>`<button data-mm="${id}" class="${red?'red':''}"><span>${label}</span>${I(ico[icon])}</button>`;
  const main=()=>row('reply',t('Reply'),'reply')+row('fwd',t('Forward'),'fwd')+(m.t?row('copy',t('Copy'),'copy'):'')+(mine?row('info',t('Info'),'info'):'')+row('star',t(m.star?'Unstar':'Star'),'star')+(canEdit?row('edit',t('Edit'),'edit'):'')+row('del',t('Delete'),'trash',1)+(m.t?row('more',t('More'),'more'):'');
  const myE=m.myRx||'';
  ov.innerHTML=`<div class="mmw"><div class="emo">${EMO6.map(e=>`<button data-e="${e}" class="${myE===e?'on':''}">${e}</button>`).join('')}<button class="plus" data-e="+">＋</button></div><div class="bub">${el?el.outerHTML:''}</div><div class="list">${main()}</div></div>`;
  document.body.appendChild(ov);
  ov.onclick=async e=>{const eb=e.target.closest('[data-e]');const mb=e.target.closest('[data-mm]');
    if(eb){if(eb.dataset.e==='+'){mmClose();openSheet(`<h3>${t('React')}</h3><div class="emoGrid">${EMOALL.map(x=>`<button data-eg="${x}">${x}</button>`).join('')}</div>`);$('#sheet').querySelectorAll('[data-eg]').forEach(b=>b.onclick=()=>{closeSheet();setReact(k,b.dataset.eg);});return;}
      mmClose();setReact(k,eb.dataset.e===myE?'':eb.dataset.e);return;}
    if(!mb){if(!e.target.closest('.list,.emo'))mmClose();return;}
    const a=mb.dataset.mm;
    if(a==='more'){ov.querySelector('.list').innerHTML=row('tr',t('Translate'),'tr')+row('back',t('Back'),'back');return;}
    if(a==='back'){ov.querySelector('.list').innerHTML=main();return;}
    mmClose();
    if(a==='reply'){REPLY={k,dbid:m.dbid,who:whoOf(m),text:mmPrev(m)};drawReplyBar();setTimeout(()=>$('#msgInput')&&$('#msgInput').focus(),50);}
    else if(a==='copy'){try{await navigator.clipboard.writeText(m.t||'');toast(t('Copied'));}catch(_){const ta=document.createElement('textarea');ta.value=m.t||'';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast(t('Copied'));}catch(__){}ta.remove();}}
    else if(a==='star'){m.star=!m.star;save();renderMsgs();}
    else if(a==='info'){const d=m.ts?new Date(m.ts):null;const fmtD=x=>x?x.toLocaleString(S.lang||'en',{dateStyle:'medium',timeStyle:'short'}):'—';const st=m.st||'sent';
      openSheet(`<h3>${t('Message info')}</h3><div class="srow"><div class="l"><b>${esc(mmPrev(m))}</b></div></div><div class="srow"><div class="l"><b>✓ ${t('Sent')}</b><small class="muted">${fmtD(d)}</small></div></div><div class="srow"><div class="l"><b>✓✓ ${t('Delivered')}</b><small class="muted">${st==='sent'?'—':fmtD(d)}</small></div></div><div class="srow"><div class="l"><b style="color:#38bdf8">✓✓ ${t('Read')}</b><small class="muted">${st==='read'?(m.readAt?fmtD(new Date(m.readAt)):'✓'):'—'}</small></div></div>`);}
    else if(a==='edit'){EDIT={k};REPLY=null;drawReplyBar();const i=$('#msgInput');i.value=m.t;i.dispatchEvent(new Event('input',{bubbles:true}));setTimeout(()=>{i.focus();i.setSelectionRange(i.value.length,i.value.length);},50);}
    else if(a==='del'){const delAll=mine&&(!m.ts||Date.now()-m.ts<48*3600*1000);openSheet(`<h3>${t('Delete')}?</h3>${delAll?`<button class="btn primary" id="delAll" style="margin-top:12px;background:#EF4444;border-color:#EF4444">${t('Delete for everyone')}</button>`:''}<button class="btn" id="delMe" style="margin-top:8px">${t('Delete for me')}</button>`);
      $('#delMe').onclick=()=>{closeSheet();all.splice(k,1);save();renderMsgs();};
      const da=$('#delAll');if(da)da.onclick=async()=>{closeSheet();const was=Object.assign({},m);m.del=true;delete m.t;delete m.img;delete m.a;delete m.vid;m.voice=0;m.isVid=0;save();renderMsgs();
        if(real&&m.dbid&&SB){const {error}=await SB.from('messages').delete().eq('id',m.dbid);if(was.media)SB.storage.from('chat').remove([was.media]).then(()=>{});if(error)console.warn(error);}
        else if(gid(roomId)&&m.dbid&&SB){SB.from('group_messages').delete().eq('id',m.dbid).then(()=>{});}};}
    else if(a==='fwd'){const ids=[...new Set([...S.groups.map(g=>g.id),...Object.keys(S.chats)])].filter(id=>id!==roomId&&!S.blocked[id]&&(USERS[id]||S.groups.find(g=>g.id===id)));
      openSheet(`<h3>${t('Forward to…')}</h3><div>${ids.map(id=>{const r=roomInfo(id);return `<button class="pick" data-fw="${id}">${USERS[id]?avHTML(id,42):`<span class="av grpAv" style="width:42px;height:42px">${SV(ICONS.group,'style="width:20px;height:20px;color:#fff"')}</span>`}<b>${esc(r.name)}</b></button>`;}).join('')}</div>`);
      $('#sheet').querySelectorAll('[data-fw]').forEach(b=>b.onclick=async()=>{closeSheet();const to=b.dataset.fw;const n={f:'me'};
        if(m.t)n.t=m.t;else if(m.img){let src=m.img;if(!String(src).startsWith('data:'))try{const bl=await (await fetch(src)).blob();src=await blobToDataUrl(bl);}catch(_){}n.img=src;}else if(m.outfit)n.outfit=m.outfit;else if(m.a){let src=m.a;if(!String(src).startsWith('data:'))try{src=await blobToDataUrl(await (await fetch(src)).blob());}catch(_){}n.a=src;n.voice=1;n.dur=m.dur;}else{toast(t('For now, only text, photos and voice with real friends.'));return;}
        n.fwd=1;pushMsg(to,n);toast(t('Forwarded'));});}
    else if(a==='tr'){if(!AI){toast(t('Translation needs Ruby (log in).'));return;}const L=(LANGS.find(l=>l.c===(S.lang||'en'))||{n:'English'}).n;m.tr='…';renderMsgs();
      try{const r=await AI.json(`Translate this chat message into ${L}. Keep emojis. Return JSON only: {"t":"..."}\nMessage: ${JSON.stringify(m.t)}`);m.tr=String(r&&r.t||'').slice(0,2000)||null;}catch(_){m.tr=null;}save();renderMsgs();}};}
function drawReplyBar(){let b=$('#replyBar');const c=$('#composer');if(!c)return;if(!REPLY&&!EDIT){if(b)b.remove();return;}
  if(!b){b=document.createElement('div');b.id='replyBar';c.parentNode.insertBefore(b,c);}
  const m=EDIT?(S.chats[roomId]||[])[EDIT.k]:null;b.innerHTML=`<span class="t"><b>${EDIT?t('Editing'):esc(REPLY.who)}</b><span>${esc(EDIT?(m&&m.t||''):REPLY.text)}</span></span><button aria-label="Close">${SV(ICONS.x)}</button>`;
  b.querySelector('button').onclick=()=>{if(EDIT){const i=$('#msgInput');i.value='';i.dispatchEvent(new Event('input',{bubbles:true}));}REPLY=null;EDIT=null;drawReplyBar();};}
async function setReact(k,e){const m=(S.chats[roomId]||[])[k];if(!m)return;m.myRx=e||null;save();renderMsgs();
  if(uuidOf(roomId)&&m.dbid&&SB){const col=m.f==='me'?'rx_s':'rx_r';SB.from('messages').update({[col]:e||null}).eq('id',m.dbid).then(({error})=>{if(error)console.warn(error);});}}
/* replace the old long-press menu */
(function(){const box=$('#msgs');let hold=null,held=false,sx=0,sy=0;
 box.onpointerdown=e=>{const el=e.target.closest('.m');held=false;sx=e.clientX;sy=e.clientY;if(!el||el.classList.contains('typing')||e.target.closest('.moreMsgs'))return;hold=setTimeout(()=>{held=true;mmOpen(+el.dataset.k);},420);};
 box.onpointermove=e=>{if(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)clearTimeout(hold);};
 box.onpointercancel=()=>clearTimeout(hold);
 const _up=box.onpointerup;box.onpointerup=e=>{clearTimeout(hold);if(held){held=false;return;}const el=e.target.closest('.m');if(!el)return;
   if(e.target.closest('[data-once]')){openOnce(+el.dataset.k);return;}if(e.target.closest('.vplay')){playVoice(+el.dataset.k,e.target.closest('.vplay'));return;}};
 box.addEventListener('contextmenu',e=>{if(e.target.closest('.m'))e.preventDefault();});
 const st=document.createElement('style');st.textContent='#msgs .m{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}';document.head.appendChild(st);})();
/* draw quotes, "edited", reactions, translations, deleted */
{const _rm32=renderMsgs;renderMsgs=function(){_rm32.apply(this,arguments);const all=S.chats[roomId]||[];
  $$('#msgs .m[data-k]').forEach(el=>{const m=all[+el.dataset.k];if(!m)return;
    if(m.del){el.classList.add('del');el.innerHTML=`🚫 ${t('This message was deleted')}`;return;}
    let q=m.reply;if(!q&&m.replyTo){const o=all.find(x=>x.dbid===m.replyTo);if(o)q={who:whoOf(o),text:mmPrev(o)};}
    if(q)el.insertAdjacentHTML('afterbegin',`<span class="rq"><b>${esc(q.who)}</b><span>${esc(q.text)}</span></span>`);
    if(m.fwd)el.insertAdjacentHTML('afterbegin',`<span class="rq" style="border:0;background:none;padding:0;margin:0 0 4px;font-style:italic;opacity:.7">↪ ${t('Forwarded')}</span>`);
    if(m.edited)el.insertAdjacentHTML('beforeend',`<span class="edt">${t('Edited')}</span>`);
    if(m.tr)el.insertAdjacentHTML('beforeend',`<span class="trl"><small>${t('Translated')}</small>${m.tr==='…'?t('Translating…'):esc(m.tr)}</span>`);
    const em=[m.theirRx,m.myRx].filter(Boolean);if(em.length){el.classList.add('hasemo');el.insertAdjacentHTML('beforeend',`<span class="emob">${em.join('')}${em.length===2&&em[0]===em[1]?' 2':''}</span>`);}});};}
/* sending: reply and edit */
function wrap32(){const _p=pushMsg;if(_p._w32)return;const w=function(id,m){
  if(m&&m.f==='me'&&EDIT&&id===roomId&&m.t&&!m._x){const old=(S.chats[id]||[])[EDIT.k];EDIT=null;drawReplyBar();if(!old)return;
    old.t=m.t;old.edited=true;save();renderMsgs();if(uuidOf(id)&&old.dbid&&SB)SB.from('messages').update({body:m.t,edited:true}).eq('id',old.dbid).then(({error})=>{if(error)toast(t('Message not changed. Check your internet.'));});return;}
  if(m&&m.f==='me'&&REPLY&&id===roomId&&!m._x){m.reply={who:REPLY.who,text:REPLY.text};const rd=REPLY.dbid;REPLY=null;drawReplyBar();
    if(rd&&uuidOf(id)){m.replyTo=rd;const cid=setInterval(()=>{if(m.dbid){clearInterval(cid);SB.from('messages').update({reply_to:rd}).eq('id',m.dbid).then(()=>{});}if(m.failed)clearInterval(cid);},600);setTimeout(()=>clearInterval(cid),30000);}}
  if(m)m._x=1;return _p.apply(this,arguments);};w._w32=1;pushMsg=w;}
wrap32();PUSHW.push(wrap32);
{const _or32=openRoom;openRoom=function(id){REPLY=null;EDIT=null;const r=_or32.apply(this,arguments);drawReplyBar();return r;};}
/* server: read the new fields, live edits / reactions / deletions */
{const _tl=toLocal;toLocal=function(m){const x=_tl(m);const mine=m.sender===ME_ID;if(m.edited)x.edited=true;if(m.reply_to)x.replyTo=m.reply_to;x.myRx=(mine?m.rx_s:m.rx_r)||null;x.theirRx=(mine?m.rx_r:m.rx_s)||null;if(m.read_at)x.readAt=Date.parse(m.read_at);return x;};}
function findDb(id){for(const k in S.chats){const a=S.chats[k]||[];const i=a.findIndex(x=>x.dbid===id);if(i>=0)return {room:k,m:a[i],i};}return null;}
let MXCH=null;function listen32(){if(!(SB&&ME_ID))return;if(MXCH)SB.removeChannel(MXCH);
  const upd=p=>{const n=p.new;const f=findDb(n.id);if(!f)return;const m=f.m;const mine=n.sender===ME_ID;
    if(!mine&&n.body!=null&&(n.kind||'text')==='text'&&m.t!==n.body){m.t=n.body;}if(n.edited)m.edited=true;if(n.reply_to)m.replyTo=n.reply_to;m.myRx=(mine?n.rx_s:n.rx_r)||null;m.theirRx=(mine?n.rx_r:n.rx_s)||null;if(n.read_at)m.readAt=Date.parse(n.read_at);
    save();if(current==='room'&&roomId===f.room)renderMsgs();};
  MXCH=SB.channel('msgx-'+ME_ID).on('postgres_changes',{event:'UPDATE',schema:'public',table:'messages',filter:`receiver=eq.${ME_ID}`},upd).on('postgres_changes',{event:'UPDATE',schema:'public',table:'messages',filter:`sender=eq.${ME_ID}`},upd)
   .on('postgres_changes',{event:'DELETE',schema:'public',table:'messages'},p=>{const id=p.old&&p.old.id;if(!id)return;const f=findDb(id);if(!f||f.m.del)return;const m=f.m;m.del=true;delete m.t;delete m.img;delete m.a;delete m.vid;m.voice=0;m.isVid=0;save();if(current==='room'&&roomId===f.room)renderMsgs();else if(current==='chat')renderChatList();})
   .subscribe();}
{const _al32=afterLogin;afterLogin=async function(){await _al32();listen32();};}

/* ====================== v33: Ruby answers fast (streamed word by word) ====================== */
async function gemStream(body,onText){const {data:{session}}=await SB.auth.getSession();if(!session)throw new Error('Not signed in');
  const r=await fetch(SB_URL+'/functions/v1/ruby',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+session.access_token,apikey:SB_KEY},body:JSON.stringify(Object.assign({},body,{stream:true}))});
  const ct=r.headers.get('content-type')||'';if(ct.includes('application/json')){const d=await r.json();if(d.error){const e=new Error(d.error);if(d.status===429)e.code='rate_limited';throw e;}if(onText)onText({text:d.text||''});return d.text||'';}
  if(!r.ok||!r.body)throw new Error('AI error '+r.status);const rd=r.body.getReader(),dec=new TextDecoder();let text='',last=0;
  for(;;){const {done,value}=await rd.read();if(done)break;text+=dec.decode(value,{stream:true});const now=performance.now();if(onText&&now-last>50){last=now;try{onText({text});}catch(_){}}}
  if(onText)try{onText({text});}catch(_){}return text;}
{const _mg=makeGemini;makeGemini=function(){const G0=_mg();const G=async function(msgs,opts={}){if(!opts.onText)return G0(msgs,opts);
    const image=opts.images&&opts.images[0]?await blobToDataUrl(opts.images[0]):null;const body={messages:(msgs||[]).map(m=>({role:m.role,content:typeof m.content==='string'?m.content:JSON.stringify(m.content)})),image};
    try{const text=await gemStream(body,opts.onText);return {text};}catch(e){if(e.code==='rate_limited')throw e;return G0(msgs,opts);}};
  Object.assign(G,G0);G.json=G0.json;G.limits=G0.limits;G.gemini=true;return G;};
 if(AI&&AI.gemini){AI=null;enableGemini();}}
/* v33.1 keep Ruby awake: a tiny call when the app opens and when Ruby is opened (no waiting on the first question) */
let rubyWarmAt=0;function rubyWarm(){if(!(REAL&&SB&&ME_ID))return;if(Date.now()-rubyWarmAt<4*60*1000)return;rubyWarmAt=Date.now();fetch(SB_URL+'/functions/v1/ruby',{method:'POST',headers:{'Content-Type':'application/json',apikey:SB_KEY},body:'{"warm":true}'}).catch(()=>{});}
{const _al331=afterLogin;afterLogin=async function(){await _al331();rubyWarm();};const _sh331=show;show=function(id){const r=_sh331.apply(this,arguments);if(id==='ruby')rubyWarm();return r;};
 document.addEventListener('focusin',e=>{if(e.target&&e.target.id==='rubyInput')rubyWarm();});}
/* version label at the bottom of Settings (to check the phone has the newest app) */
{const _rs34=renderSettings;renderSettings=function(){_rs34.apply(this,arguments);const b=$('#setBody');if(b&&!b.querySelector('.appVer')){const v=(document.querySelector('script[src*="v10.js"]')?.getAttribute('src')||'').split('v=')[1]||'?';b.insertAdjacentHTML('beforeend',`<p class="appVer muted" style="text-align:center;font-size:12px;margin:18px 0 8px">R-Style · version ${esc(v)}</p>`);}};}

/* ====================== v36: creator account (badge, Gold forever, reports space) ====================== */
let STAFF=new Set();const isStaff=id=>STAFF.has(id);
(function(){const T={'Creator':['Créatrice','יוצרת','المبتكِرة'],'Creator space':['Espace créatrice','מרחב היוצרת','مساحة المبتكِرة'],'Reports from users':['Signalements des utilisateurs','דיווחים של משתמשים','بلاغات المستخدمين'],
  'No reports 🎉':['Aucun signalement 🎉','אין דיווחים 🎉','لا بلاغات 🎉'],'Delete the post':['Supprimer le post','מחק את הפוסט','حذف المنشور'],'Delete the comment':['Supprimer le commentaire','מחק את התגובה','حذف التعليق'],'Done':['Fait','בוצע','تم'],'Post':['Post','פוסט','منشور'],'Comment':['Commentaire','תגובה','تعليق'],'User':['Utilisateur','משתמש','مستخدم'],'Open profile':['Voir le profil','פתח פרופיל','فتح الملف']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`.creatorChip{display:inline-flex;align-items:center;gap:4px;background:linear-gradient(90deg,#E11D2E,#D4AF37);color:#fff;font:700 12px Inter,system-ui;padding:4px 10px;border-radius:12px;margin:6px 4px 0}
.vcheck{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#1D9BF0;color:#fff;font-size:11px;font-weight:800;vertical-align:-3px;margin-inline-start:4px}`;document.head.appendChild(css);})();
async function loadStaff(){if(!(REAL&&SB))return;try{const {data,error}=await SB.from('staff').select('user_id');if(error)return;STAFF=new Set((data||[]).map(x=>rid(x.user_id)));
  if(ME_ID&&STAFF.has(rid(ME_ID))){S.creator=true;if(!S.vip){S.vip=true;S.paid=true;S.trialEnd=0;save();applyTheme();}}else if(S.creator){S.creator=false;save();}
  if(current==='me')renderMe();}catch(_){}}
{const _al36=afterLogin;afterLogin=async function(){await _al36();loadStaff();};}
/* Gold can't be switched off by mistake on the creator account */
{const _rs36=renderSettings;renderSettings=function(){_rs36.apply(this,arguments);if(!S.creator)return;const vo=$('#vipOff');if(vo)vo.closest('.srow')?.remove();const b=$('#setBody');if(!b||b.querySelector('#creatorSpace'))return;
  (b.querySelector('.appVer')||b.lastElementChild).insertAdjacentHTML('beforebegin',`<button class="srow" id="creatorSpace" style="width:100%;text-align:start"><div class="l"><b>👑 ${t('Creator space')}</b><small class="muted">${t('Reports from users')}</small></div></button>`);$('#creatorSpace').onclick=openCreatorSpace;};}
const _mebadge=()=>`<span class="creatorChip">✨ ${t('Creator')} <span class="vcheck">✓</span></span>`;
{const _rm36=renderMe;renderMe=function(){_rm36.apply(this,arguments);if(!S.creator)return;const h=$('#meHandle');if(h&&!h.querySelector('.vcheck'))h.insertAdjacentHTML('beforeend','<span class="vcheck">✓</span>');const top=$('#meBody .meTop > div');if(top&&!top.querySelector('.creatorChip'))top.insertAdjacentHTML('beforeend',_mebadge());};}
{const _op36=openProfile;openProfile=function(id){_op36.apply(this,arguments);if(!isStaff(id))return;const h=$('#profBody .phead h2');if(h&&!h.querySelector('.vcheck'))h.insertAdjacentHTML('beforeend','<span class="vcheck">✓</span>');const sc=$('#profBody .aiscore');if(sc&&!$('#profBody .creatorChip'))sc.insertAdjacentHTML('afterend',_mebadge());};}
/* blue check next to the creator's name in Shorts */
{const _rf36=renderFeed;renderFeed=function(){const r=_rf36.apply(this,arguments);if(STAFF.size)$$('#feed .short').forEach(el=>{const p=REALPOSTS.find(x=>x.id===el.dataset.id);if(p&&p.u&&isStaff(p.u)){const n=el.querySelector('.who b, .by b, .uname, .meta b');if(n&&!n.querySelector('.vcheck'))n.insertAdjacentHTML('beforeend','<span class="vcheck">✓</span>');}});return r;};}
async function openCreatorSpace(){openSheet(`<h3>👑 ${t('Creator space')}</h3><p class="muted">${t('Reports from users')}</p><div id="repList" style="margin-top:10px"><span class="spin"></span></div>`);
  const {data,error}=await SB.from('reports').select('*').order('created_at',{ascending:false}).limit(60);const box=$('#repList');if(!box)return;
  if(error){box.textContent=error.message;return;}if(!data||!data.length){box.innerHTML=`<p style="text-align:center;padding:18px">${t('No reports 🎉')}</p>`;return;}
  box.innerHTML=data.map(r=>`<div class="srow" style="align-items:flex-start;gap:10px"><div class="l"><b>${r.target_type==='post'?'🎬 '+t('Post'):r.target_type==='comment'?'💬 '+t('Comment'):'👤 '+t('User')} · ${esc(r.reason||'')}</b><small class="muted">${new Date(r.created_at).toLocaleString(S.lang||'en',{dateStyle:'short',timeStyle:'short'})}</small></div>
    ${r.target_type==='post'?`<button class="btn sm" data-rdel="post" data-id="${esc(r.target_id)}">${t('Delete the post')}</button>`:r.target_type==='comment'?`<button class="btn sm" data-rdel="comment" data-id="${esc(r.target_id)}">${t('Delete the comment')}</button>`:`<button class="btn sm" data-rprof="${esc(r.target_id)}">${t('Open profile')}</button>`}</div>`).join('');
  box.onclick=async e=>{const d=e.target.closest('[data-rdel]');const pr=e.target.closest('[data-rprof]');
    if(d){d.disabled=true;const tb=d.dataset.rdel==='post'?'posts':'comments';const {error}=await SB.from(tb).delete().eq('id',+d.dataset.id);d.textContent=error?error.message:'✓ '+t('Done');if(!error&&tb==='posts'){REALPOSTS=REALPOSTS.filter(p=>String(p.dbid)!==d.dataset.id);}}
    if(pr){const u=pr.dataset.rprof;const {data}=await SB.from('profiles').select('*').eq('id',u).maybeSingle();if(data){closeSheet();openProfile(addReal(data));}}};}

async function pinOf(v){if(/^\d{6}$/.test(v))return v;const h=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('rstyle:'+v)));const n=((h[0]<<24)>>>0)+(h[1]<<16)+(h[2]<<8)+h[3];return String(n%1000000).padStart(6,'0');}
/* ====================== v38: "I already have an account" → ID + verification code (creator) ====================== */
(function(){const T={'I already have an account':['J\'ai déjà un compte','כבר יש לי חשבון','لدي حساب بالفعل'],'Your ID':['Ton identifiant','המזהה שלך','معرّفك'],'Continue':['Continuer','המשך','متابعة'],
  'Verification code':['Code de vérification','קוד אימות','رمز التحقق'],'Check':['Valider','אישור','تأكيد'],'Wrong code.':['Code incorrect.','קוד שגוי.','رمز خاطئ.'],'Checking…':['Vérification…','בודק…','جارٍ التحقق…'],
  'Use your e-mail to log in.':['Utilise ton e-mail pour te connecter.','התחבר עם המייל שלך.','استخدم بريدك لتسجيل الدخول.']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const box=$('#emailErr');if(!box||$('#haveAcc'))return;
 box.insertAdjacentHTML('afterend',`<button type="button" id="haveAcc" style="border:0;background:none;color:var(--accent);font:700 15px Inter,system-ui;text-decoration:underline;margin-top:14px;padding:6px 0;display:block" data-t="I already have an account"></button>`);applyLang();
 document.addEventListener('click',e=>{if(!e.target.closest('#haveAcc'))return;let id='';
  const step1=()=>{openSheet(`<h3>${t('I already have an account')}</h3><input class="field" id="accId" autocomplete="off" autocapitalize="off" placeholder="${t('Your ID')}" style="height:48px;margin-top:12px"><button class="btn primary" id="accNext" style="margin-top:12px">${t('Continue')}</button><div class="err" id="accErr"></div>`);
    setTimeout(()=>$('#accId').focus(),100);$('#accNext').onclick=()=>{const v=$('#accId').value.trim();if(v.includes('@')){closeSheet();$('#suEmail').value=v;$('#suEmail').dispatchEvent(new Event('input',{bubbles:true}));toast(t('Use your e-mail to log in.'));return;}
      if(!/^[A-Za-z0-9]{4,32}$/.test(v)){$('#accErr').textContent=t('Wrong code.');return;}id=v;step2();};};
  const step2=()=>{setSheet(`<h3>${t('Verification code')}</h3><input class="field code" id="accCode" inputmode="numeric" autocomplete="one-time-code" placeholder="•••" style="height:52px;margin-top:12px;text-align:center;letter-spacing:6px;font-size:22px"><button class="btn primary" id="accGo" style="margin-top:12px">${t('Check')}</button><div class="err" id="accErr"></div>`);
    setTimeout(()=>$('#accCode').focus(),100);$('#accGo').onclick=async()=>{const c=$('#accCode').value.trim();const er=$('#accErr');if(!c){er.textContent=t('Wrong code.');return;}if(!SB){er.textContent='…';return;}
      er.textContent=t('Checking…');$('#accGo').disabled=true;const r=await SB.functions.invoke('pin-login',{body:{pin:await pinOf(id+'|'+c)}});$('#accGo').disabled=false;const d=r.data;
      if(r.error||!d||d.error||!d.access_token){let why=(d&&d.error)||'';if(!why&&r.error){try{const j=await r.error.context.json();why=j.error||j.message||'';}catch(_){why=r.error.message||'';}}er.textContent=t('Wrong code.')+(why&&!/Wrong/.test(why)?' ('+why+')':'');return;}
      const {data:s2,error:e3}=await SB.auth.setSession({access_token:d.access_token,refresh_token:d.refresh_token});if(e3||!s2.session){er.textContent=t('Wrong code.');return;}closeSheet();await signedIn(s2.session);};};
  step1();});})();
/* v39: my username always follows the server (renamed accounts) */
{const _al39=afterLogin;afterLogin=async function(){await _al39();try{const {data}=await SB.from('profiles').select('username').eq('id',ME_ID).maybeSingle();if(data&&data.username&&S.profile&&S.profile.username!==data.username){S.profile.username=data.username;save();if(current==='me')renderMe();if(current==='home')show('home');}}catch(_){}};}

/* ====================== v40: change username in Settings + profile photo full screen ====================== */
(function(){const T={'Change username':['Changer de nom d\'utilisateur','שינוי שם משתמש','تغيير اسم المستخدم'],'3 to 20: letters, numbers, . and _':['3 à 20 : lettres, chiffres, . et _','3 עד 20: אותיות באנגלית, מספרים, . ו-_','3 إلى 20: أحرف وأرقام و . و _'],
  '@{u} is already taken':['@{u} est déjà pris','@{u} כבר תפוס','@{u} مستخدم بالفعل'],'Saved ✅':['Enregistré ✅','נשמר ✅','تم الحفظ ✅'],'Edit':['Modifier','ערוך','تعديل']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#photoFull{position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,.92);display:grid;place-items:center;animation:mmIn .18s ease-out}
#photoFull img{max-width:100%;max-height:100%;object-fit:contain}#photoFull .big{width:70vw;max-width:340px;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;color:#fff;font:800 28vw/1 Inter,system-ui}
#photoFull .x{position:absolute;top:calc(env(safe-area-inset-top) + 14px);right:14px;width:42px;height:42px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;display:grid;place-items:center}#photoFull .x svg{width:20px;height:20px}
#meBody .meTop .av,#profBody .phead .av{cursor:zoom-in}`;document.head.appendChild(css);})();
{const _rs40=renderSettings;renderSettings=function(){_rs40.apply(this,arguments);const ph=$('#edPhoto');if(!ph||$('#edUser'))return;
  ph.insertAdjacentHTML('beforebegin',`<button class="chip" id="edUser" style="margin-inline-end:6px">✏️ ${t('Edit')}</button>`);
  $('#edUser').onclick=()=>{openSheet(`<h3>✏️ ${t('Change username')}</h3><div style="display:flex;align-items:center;gap:6px;margin-top:12px"><b style="font-size:18px">@</b><input class="field" id="newUser" value="${esc(me().username||'')}" autocapitalize="off" autocomplete="off" maxlength="20" style="height:48px;flex:1"></div><small class="muted">${t('3 to 20: letters, numbers, . and _')}</small><button class="btn primary" id="newUserGo" style="margin-top:12px">${t('Save')}</button><div class="err" id="newUserErr"></div>`);
    $('#newUserGo').onclick=async()=>{const er=$('#newUserErr');const u=$('#newUser').value.trim().toLowerCase().replace(/^@/,'');if(!/^[a-z0-9._]{3,20}$/.test(u)){er.textContent=t('3 to 20: letters, numbers, . and _');return;}
      if(u===me().username){closeSheet();return;}const b=$('#newUserGo');b.disabled=true;
      if(REAL&&SB&&ME_ID){const {data:hit}=await SB.from('profiles').select('id').eq('username',u).maybeSingle();if(hit&&hit.id!==ME_ID){b.disabled=false;er.textContent=t('@{u} is already taken',{u});return;}
        const {error}=await SB.from('profiles').update({username:u}).eq('id',ME_ID);b.disabled=false;if(error){er.textContent=/duplicate|unique/i.test(error.message)?t('@{u} is already taken',{u}):error.message;return;}}
      else if(Object.values(USERS).some(x=>x.handle===u)){b.disabled=false;er.textContent=t('@{u} is already taken',{u});return;}
      S.profile.username=u;save();closeSheet();renderSettings();renderMe();toast(t('Saved ✅'));};};};}
document.addEventListener('click',e=>{const a=e.target.closest('#meBody .meTop .av, #profBody .phead .av');if(!a)return;e.stopPropagation();
  const bg=(a.style.backgroundImage||getComputedStyle(a).backgroundImage||'');const m=bg.match(/url\(["']?(.*?)["']?\)/);const w=document.createElement('div');w.id='photoFull';
  w.innerHTML=(m?`<img src="${m[1]}" alt="">`:`<div class="big" style="background:${a.style.background||getComputedStyle(a).backgroundColor}">${esc(a.textContent.trim())}</div>`)+`<button class="x" aria-label="Close">${SV(ICONS.x)}</button>`;
  w.onclick=()=>w.remove();document.body.appendChild(w);},true);

/* ====================== v41: welcome video after sign-up, then optional detailed tutorial ====================== */
(function(){const T={'Skip':['Passer','דלג','تخطي'],'Tap for sound':['Touche pour le son','לחצו לקול','اضغط للصوت'],'Did you understand everything?':['Tu as tout compris ?','הבנת הכול?','هل فهمت كل شيء؟'],
  'Show me in detail':['Montre-moi en détail','תראו לי בפירוט','أرني بالتفصيل'],'Yes, let\'s go!':['Oui, c\'est parti !','כן, יאללה!','نعم، هيا!'],'Welcome video':['Vidéo de présentation','סרטון הסבר','فيديو الترحيب'],
  'Watch how R-Style works again':['Revoir comment marche R-Style','לראות שוב איך R-Style עובד','شاهد مرة أخرى كيف يعمل R-Style'],'Detailed tutorial with the real buttons':['Tutoriel détaillé avec les vrais boutons','הדרכה מפורטת עם הכפתורים האמיתיים','شرح مفصّل بالأزرار الحقيقية'],'Tutorial':['Tutoriel','הדרכה','شرح']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#guideV{position:fixed;inset:0;z-index:99990;background:#000;display:flex;align-items:center;justify-content:center;animation:mmIn .25s ease-out}
#guideV video{width:100%;height:100%;object-fit:contain;background:#000}
#guideV .gx{position:absolute;top:calc(env(safe-area-inset-top) + 14px);right:14px;border:0;border-radius:18px;padding:8px 14px;background:rgba(255,255,255,.2);color:#fff;font:600 14px Inter,system-ui;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#guideV .gs{position:absolute;bottom:calc(env(safe-area-inset-bottom) + 30px);left:50%;transform:translateX(-50%);border:0;border-radius:22px;padding:10px 18px;background:#fff;color:#111;font:700 14px Inter,system-ui}
#guideV .gskip{position:absolute;top:calc(env(safe-area-inset-top) + 14px);left:14px;display:flex;gap:8px}#guideV .gskip button{border:0;border-radius:18px;padding:8px 12px;background:rgba(255,255,255,.2);color:#fff;font:700 14px Inter,system-ui;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#guideV .gend{position:absolute;inset:0;background:rgba(0,0,0,.72);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;text-align:center;color:#fff;animation:mmIn .25s}
#guideV .gend h3{font:800 24px Inter,system-ui;margin:0 0 6px}#guideV .gend button{width:min(320px,90%);border:0;border-radius:16px;padding:15px;font:700 16px Inter,system-ui}
#guideV .gend .y{background:var(--accent);color:#fff}#guideV .gend .n{background:rgba(255,255,255,.16);color:#fff}`;document.head.appendChild(css);})();
function playGuide(src,onEnd){const old=$('#guideV');if(old)old.remove();const w=document.createElement('div');w.id='guideV';
  w.innerHTML=`<video src="${src}" playsinline preload="auto" controls></video><button class="gx">${t('Skip')} ✕</button><div class="gskip"><button data-gs="-10">⏪ 10</button><button data-gs="10">10 ⏩</button></div>`;document.body.appendChild(w);const v=w.querySelector('video');
  w.querySelectorAll('[data-gs]').forEach(x=>x.onclick=e=>{e.stopPropagation();v.currentTime=Math.max(0,Math.min((v.duration||0)-0.2,v.currentTime+(+x.dataset.gs)));});
  const done=()=>{try{v.pause();}catch(_){}onEnd&&onEnd(w);};w.querySelector('.gx').onclick=done;v.onended=done;
  v.muted=false;const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{v.muted=true;v.play().catch(()=>{});const s=document.createElement('button');s.className='gs';s.textContent='🔊 '+t('Tap for sound');s.onclick=()=>{v.muted=false;s.remove();};w.appendChild(s);});
  v.onclick=()=>{if(v.muted){v.muted=false;w.querySelector('.gs')?.remove();}};return w;}
function playIntro(){S.introSeen=true;save();playGuide('promo/intro.mp4',w=>{const e=document.createElement('div');e.className='gend';
  e.innerHTML=`<h3>${t('Did you understand everything?')}</h3><button class="n">✅ ${t('Yes, let\'s go!')}</button><button class="y">🎬 ${t('Show me in detail')}</button>`;w.appendChild(e);w.querySelector('.gx')?.remove();w.querySelector('.gskip')?.remove();w.querySelector('.gs')?.remove();
  e.querySelector('.n').onclick=()=>w.remove();e.querySelector('.y').onclick=()=>{w.remove();playGuide('promo/tutorial.mp4',w2=>w2.remove());};});}
{const _sh41=show;show=function(id){const r=_sh41.apply(this,arguments);
  if(id==='home'&&S.profile&&!S.introSeen&&!$('#guideV')){const j=Date.parse(S.profile.joined||'');if(!isNaN(j)&&Date.now()-j<3*864e5)setTimeout(()=>{if(current==='home'&&!S.introSeen)playIntro();},700);else{S.introSeen=true;save();}}return r;};}
{const _rs41=renderSettings;renderSettings=function(){_rs41.apply(this,arguments);const b=$('#setBody');if(!b||b.querySelector('#gIntro'))return;
  const html=`<div class="sect">${t('Tutorial')}</div><button class="srow" id="gIntro" style="width:100%;text-align:start"><div class="l"><b>🎬 ${t('Welcome video')}</b><small class="muted">${t('Watch how R-Style works again')}</small></div></button><button class="srow" id="gTut" style="width:100%;text-align:start"><div class="l"><b>📱 ${t('Tutorial')}</b><small class="muted">${t('Detailed tutorial with the real buttons')}</small></div></button>`;
  const anchor=b.querySelector('#creatorSpace')||b.querySelector('.appVer');if(anchor)anchor.insertAdjacentHTML('beforebegin',html);else b.insertAdjacentHTML('beforeend',html);
  $('#gIntro').onclick=()=>playIntro();$('#gTut').onclick=()=>playGuide('promo/tutorial.mp4',w=>w.remove());};}
(function(){const T={'Black & gold app':['Appli noir et or','אפליקציה בשחור וזהב','تطبيق بالأسود والذهبي'],'Gold colors, white & gold mode, accent colors':['Couleurs or, mode blanc et or, couleurs d\'accent','צבעי זהב, מצב לבן-זהב וצבעי הדגשה','ألوان ذهبية، وضع أبيض وذهبي، ألوان مميزة'],'Black & gold app, white & gold mode':['Appli noir et or, mode blanc et or','אפליקציה בשחור-זהב, מצב לבן-זהב','تطبيق أسود وذهبي، وضع أبيض وذهبي']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* ====================== v42: Ruby clears the chat every hour but remembers the important things ====================== */
UD_KEYS.push('rubyMem');
const RUBY_HOUR=60*60*1000;let rubyMemBusy=false;
{const _uc42=userCtx;userCtx=function(){let c=_uc42();const m=(S.rubyMem||[]).filter(Boolean);if(m.length)c+='\nThings you remember about the user (always follow them):\n- '+m.join('\n- ');return c;};}
async function rubyRemember(){const conv=(S.ruby||[]).filter(m=>!m.err&&!m.modestQ&&m.text).map(m=>(m.role==='user'?'User: ':'Ruby: ')+m.text).join('\n').slice(-6000);if(!conv)return true;
  const old=(S.rubyMem||[]).join('\n- ');
  const p=`You are the memory of Ruby, a fashion stylist assistant. Here is what you already remember:\n- ${old||'(nothing)'}\n\nHere is the last conversation:\n${conv}\n\nReturn ONLY a JSON array of short strings (max 15) with everything important to remember for the future: the user's instructions (e.g. language to speak, tone), tastes, sizes, colors, plans and looks chosen for later, important events. Keep the old memories that are still true, remove ones replaced by new ones. Write each item in the user's language. No small talk.`;
  try{const r=await AI([{role:'user',content:p}],{cache:false});const s=String(r&&r.text||'');const j=s.slice(s.indexOf('['),s.lastIndexOf(']')+1);const a=JSON.parse(j);
    if(Array.isArray(a)){S.rubyMem=a.map(x=>String(x).slice(0,200)).filter(Boolean).slice(0,15);return true;}}catch(e){console.warn('rubyMem',e);}return false;}
async function rubyHourly(){if(rubyMemBusy||typeof rubyBusy!=='undefined'&&rubyBusy)return;const real=(S.ruby||[]).filter(m=>!m.modestQ);
  if(!real.length){if(S.rubyStart){S.rubyStart=0;save();}return;}
  if(!S.rubyStart){S.rubyStart=Date.now();save();return;}
  const age=Date.now()-S.rubyStart;if(age<RUBY_HOUR)return;
  rubyMemBusy=true;let ok=!AI?false:await rubyRemember();rubyMemBusy=false;
  if(!ok&&age<3*RUBY_HOUR)return;
  S.ruby=[];S.rubyStart=0;save();if(typeof udSched==='function')udSched();if(current==='ruby'){renderRuby();toast('🧹 '+t('New conversation — Ruby remembers the important things'));}}
setInterval(rubyHourly,60*1000);
{const _sh42=show;show=function(id){const r=_sh42.apply(this,arguments);if(id==='ruby')rubyHourly();return r;};}
{const f=$('#rubyForm');if(f&&f.onsubmit){const _os42=f.onsubmit;f.onsubmit=async function(e){if(!S.rubyStart)S.rubyStart=Date.now();return _os42.call(this,e);};}}
(function(){const k='New conversation — Ruby remembers the important things';const v=['Nouvelle conversation — Ruby se souvient des choses importantes','שיחה חדשה — רובי זוכרת את הדברים החשובים','محادثة جديدة — روبي تتذكر الأشياء المهمة'];['fr','he','ar'].forEach((c,i)=>{if(window.I18N&&window.I18N[c])window.I18N[c][k]=v[i];});})();

/* ====================== v43: privacy policy and terms of use in Settings ====================== */
{const _rs43=renderSettings;renderSettings=function(){_rs43.apply(this,arguments);const b=$('#setBody');if(!b||b.querySelector('#legalP'))return;
  const l=['he','fr'].includes(S.lang)?S.lang:'en';
  const html=`<div class="sect">${t('Legal')}</div><a class="srow" id="legalP" href="privacy.html?l=${l}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><div class="l"><b>🔒 ${t('Privacy policy')}</b></div><span class="muted">›</span></a><a class="srow" id="legalT" href="terms.html?l=${l}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><div class="l"><b>📄 ${t('Terms of use')}</b></div><span class="muted">›</span></a>`;
  const anchor=b.querySelector('#creatorSpace')||b.querySelector('.appVer');if(anchor)anchor.insertAdjacentHTML('beforebegin',html);else b.insertAdjacentHTML('beforeend',html);};}
(function(){const T={'Legal':['Mentions légales','מסמכים משפטיים','قانوني'],'Privacy policy':['Politique de confidentialité','מדיניות פרטיות','سياسة الخصوصية'],'Terms of use':['Conditions d\'utilisation','תנאי שימוש','شروط الاستخدام']};['fr','he','ar'].forEach((c,i)=>{if(window.I18N&&window.I18N[c])for(const k in T)window.I18N[c][k]=T[k][i];});})();
