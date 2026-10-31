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
      btn.disabled=false;if(error){$('#emailErr').textContent=t('Could not send the link. Wait a minute and try again.');renderStep();return;}
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
  const unknown=Object.keys(by).filter(id=>!USERS[id]).map(uuidOf);if(unknown.length){const {data:ps}=await SB.from('profiles').select('*').in('id',unknown);(ps||[]).forEach(addReal);}}
function toLocal(m){const mine=m.sender===ME_ID;return {f:mine?'me':'them',t:m.body,ts:Date.parse(m.created_at),dbid:m.id,st:mine?(m.read_at?'read':'delivered'):undefined,read:!mine&&!!m.read_at};}
function listen(){if(SBchan)SB.removeChannel(SBchan);
  SBchan=SB.channel('msgs-'+ME_ID)
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'messages',filter:`receiver=eq.${ME_ID}`},async p=>{const m=p.new;const id=rid(m.sender);
      if(!USERS[id]){const {data}=await SB.from('profiles').select('*').eq('id',m.sender).maybeSingle();if(data)addReal(data);}
      const a=S.chats[id]=S.chats[id]||[];if(a.some(x=>x.dbid===m.id))return;const here=current==='room'&&roomId===id;
      a.push(Object.assign(toLocal(m),{read:here}));save();if(here){renderMsgs();markReadReal(id);}else if(current==='chat')renderChatList();
      if(navigator.vibrate)try{navigator.vibrate(15);}catch(_){}})
   .on('postgres_changes',{event:'UPDATE',schema:'public',table:'messages',filter:`sender=eq.${ME_ID}`},p=>{const m=p.new;const a=S.chats[rid(m.receiver)]||[];const x=a.find(y=>y.dbid===m.id);
      if(x&&m.read_at){x.st='read';save();if(current==='room'&&roomId===rid(m.receiver))renderMsgs();}})
   .subscribe();}
async function markReadReal(id){const u=uuidOf(id);if(!u)return;await SB.from('messages').update({read_at:new Date().toISOString()}).eq('sender',u).eq('receiver',ME_ID).is('read_at',null);}

/* ---------- sending to a real friend ---------- */
function hookPush(){const _push=pushMsg;
  pushMsg=function(id,m){const u=uuidOf(id);if(!u)return _push(id,m);
    if(!m.t){toast(t('For now, only text messages with real friends.'));return;}
    m.ts=Date.now();m.st='sent';(S.chats[id]=S.chats[id]||[]).push(m);bumpStreak(id);save();
    if(current==='room'&&roomId===id){renderMsgs();flyLast();burstSend();pop();}
    SB.from('messages').insert({receiver:u,body:m.t}).select().single().then(({data,error})=>{
      if(error){m.st='sent';m.failed=true;toast(error.code==='42501'?t('You can only write to friends who follow you back.'):t('Not sent. Check your internet.'));}
      else{m.dbid=data.id;m.st='delivered';}save();if(current==='room'&&roomId===id)renderMsgs();});};
  const _open=openRoom;openRoom=function(id){_open(id);if(uuidOf(id))markReadReal(id);};}

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
