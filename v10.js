'use strict';
/* ====================== v10: real server (Supabase) — only on the real website ====================== */
const SB_URL='https://gnctjjexhzeavxnpbckm.supabase.co',SB_KEY='sb_publishable_kQ6kHtZNjnyFpjonIuwABg_IYeH4qQW';
let SB=null,ME_ID=null,SBchan=null;
const REAL=/github\.io$/.test(location.hostname);
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
      const a=S.chats[id]=S.chats[id]||[];if(a.some(x=>x.dbid===m.id))return;const here=current==='room'&&roomId===id;
      const loc=Object.assign(toLocal(m),{read:here});try{await signAll([loc]);}catch(_){}a.push(loc);save();if(here){renderMsgs();markReadReal(id);}else if(current==='chat')renderChatList();
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
    if(on)toast(t('You are now friends with {n}: you can call them',{n:USERS[uid].name}));};
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
