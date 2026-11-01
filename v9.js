'use strict';
/* ====================== v9: chat redesign, calls, filters, contact info, cube stories, Gold ad, Ruby modest ====================== */

/* ---------- icons ---------- */
Object.assign(ICONS,{
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
 video:'<rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3z"/>',
 micoff:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M4 3l16 18"/>',
 speaker:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
 flip:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><path d="M9 13a3 3 0 0 1 5-2.2M15 13a3 3 0 0 1-5 2.2"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 eyeoff:'<path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/><circle cx="12" cy="12" r="2.5"/><path d="M4 4l16 16"/>',
 timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
 palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>',
 download:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
 list:'<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
 export:'<path d="M12 15V4M7 9l5-5 5 5M5 14v6h14v-6"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
 block:'<circle cx="12" cy="12" r="8"/><path d="M6.5 6.5l11 11"/>',
 flag:'<path d="M5 21V4h11l-1.5 4L16 12H5"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 filters:'<circle cx="9" cy="10" r="5"/><circle cx="15" cy="10" r="5"/><circle cx="12" cy="15" r="5"/>',
 adduser:'<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3.4 3-5 6-5s5.4 1.6 6 5M18 8v6M15 11h6"/>',
 pin:'<path d="M9 3h6l-1 6 3 3H7l3-3zM12 12v9"/>',
 mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>',
 none:'<circle cx="12" cy="12" r="8"/><path d="M6.5 17.5l11-11"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>'
});
const HANG='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 14.5c4.8-4.7 13.2-4.7 18 0l-2.4 2.4-3.4-1.6V12.8a12 12 0 0 0-6.4 0v2.5l-3.4 1.6z"/></svg>';
const TICK1='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l4 4 8-10"/></svg>';
const TICK2='<svg viewBox="0 0 26 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 9l4 4 8-10"/><path d="M10 11l2 2 8-10"/></svg>';

/* ---------- translations for the new texts (fr / he / ar; other languages are translated by Ruby) ---------- */
(function(){const T={
 'None':['Aucun','בלי','بدون'],'Vintage':['Vintage','וינטג\'','عتيق'],'B&W':['Noir & blanc','שחור-לבן','أبيض وأسود'],'Warm':['Chaud','חם','دافئ'],'Cool':['Froid','קר','بارد'],
 'Crown':['Couronne','כתר','تاج'],'Puppy':['Chiot','כלבלב','جرو'],'Hearts':['Cœurs','לבבות','قلوب'],'Sparkles':['Paillettes','נצנצים','لمعان'],'Glasses':['Lunettes','משקפיים','نظارات'],'Hat':['Chapeau','כובע','قبعة'],'Earrings':['Boucles d\'oreilles','עגילים','أقراط'],'Make-up':['Maquillage','איפור','مكياج'],'Date frame':['Cadre date','מסגרת תאריך','إطار التاريخ'],'R-Style frame':['Cadre R-Style','מסגרת R-Style','إطار R-Style'],
 'This filter is for Gold members':['Ce filtre est réservé aux membres Gold','הפילטר הזה רק למשתמשי Gold','هذا الفلتر لأعضاء Gold فقط'],
 'online':['en ligne','מחובר/ת','متصل'],
 'Calls are only between friends who follow each other.':['Les appels, c\'est seulement entre amis qui se suivent.','שיחות רק בין חברים שעוקבים אחד אחרי השני.','المكالمات فقط بين الأصدقاء الذين يتابعون بعضهم.'],
 'Calling…':['Appel…','מתקשר…','جارٍ الاتصال…'],
 'Mute':['Muet','השתק','كتم'],'Speaker':['Haut-parleur','רמקול','مكبر الصوت'],'Hang up':['Raccrocher','נתק','إنهاء'],'More':['Plus','עוד','المزيد'],
 'Video':['Vidéo','וידאו','فيديو'],'Add':['Ajouter','הוסף','إضافة'],'Filters':['Filtres','פילטרים','فلاتر'],'Report':['Signaler','דווח','إبلاغ'],
 'Swipe to change filter':['Glisse pour changer de filtre','החלק כדי להחליף פילטר','اسحب لتغيير الفلتر'],
 'Gold filter':['Filtre Gold','פילטר Gold','فلتر Gold'],
 'Up to 8 people · up to 32 when a Gold member starts the call':['Jusqu\'à 8 personnes · jusqu\'à 32 si un membre Gold lance l\'appel','עד 8 אנשים · עד 32 כשמשתמש Gold פותח את השיחה','حتى 8 أشخاص · حتى 32 عندما يبدأ عضو Gold المكالمة'],
 'Limit reached':['Limite atteinte','הגעת למקסימום','تم الوصول للحد'],
 'Add to the call':['Ajouter à l\'appel','הוסף לשיחה','أضف إلى المكالمة'],
 'Demo: real calls work in the iPhone app.':['Démo : les vrais appels marchent dans l\'app iPhone.','דמו: שיחות אמיתיות יעבדו באפליקציה לאייפון.','عرض: المكالمات الحقيقية تعمل في تطبيق الآيفون.'],
 'Call ended':['Appel terminé','השיחה הסתיימה','انتهت المكالمة'],
 'Gallery':['Galerie','גלריה','المعرض'],'Photo':['Photo','תמונה','صورة'],
 'View once':['Vue unique','צפייה אחת','عرض مرة واحدة'],
 'Send to {n}':['Envoyer à {n}','שלח ל-{n}','إرسال إلى {n}'],
 'Photo · view once':['Photo · vue unique','תמונה · צפייה אחת','صورة · عرض مرة واحدة'],
 'Opened':['Ouverte','נפתחה','تم فتحها'],
 'The camera opens in the iPhone app. Choose a photo from your gallery.':['La caméra s\'ouvre dans l\'app iPhone. Choisis une photo de ta galerie.','המצלמה נפתחת באפליקציה לאייפון. בחר תמונה מהגלריה.','الكاميرا تعمل في تطبيق الآيفون. اختر صورة من المعرض.'],
 'Sent':['Envoyé','נשלח','أُرسلت'],'Delivered':['Arrivé','הגיע','وصلت'],'Read':['Lu','נקרא','مقروءة'],
 'typing…':['écrit…','מקליד/ה…','يكتب…'],
 'Recording… tap to send':['Enregistrement… appuie pour envoyer','מקליט… לחץ כדי לשלוח','جارٍ التسجيل… اضغط للإرسال'],
 'doesn\'t see that you read it':['ne voit pas que tu as lu','לא רואה שקראת','لا يرى أنك قرأت'],
 '{n} new messages':['{n} nouveaux messages','{n} הודעות חדשות','{n} رسائل جديدة'],
 'Open':['Ouvrir','פתח','فتح'],'Mark as read':['Marquer comme lu','סמן כנקרא','تعليم كمقروء'],'Pin':['Épingler','הצמד','تثبيت'],'Unpin':['Désépingler','בטל הצמדה','إلغاء التثبيت'],'Silence':['Silencieux','השתק','كتم الإشعارات'],'Unmute':['Réactiver le son','בטל השתקה','إلغاء الكتم'],
 'Call':['Appeler','התקשר','اتصال'],'Search':['Rechercher','חיפוש','بحث'],
 'Media, links and docs':['Médias, liens et documents','מדיה, קישורים ומסמכים','الوسائط والروابط والمستندات'],
 'Starred messages':['Messages importants','הודעות שמורות','الرسائل المميزة'],
 'Notifications':['Notifications','התראות','الإشعارات'],
 'Chat theme':['Thème de la discussion','ערכת נושא לצ\'אט','سمة الدردشة'],
 'Save photos':['Enregistrer les photos','שמירת תמונות','حفظ الصور'],
 'Disappearing messages':['Messages éphémères','הודעות נעלמות','الرسائل المؤقتة'],
 'Off':['Désactivés','כבוי','إيقاف'],'24 hours':['24 heures','24 שעות','24 ساعة'],'7 days':['7 jours','7 ימים','7 أيام'],
 'Lock chat':['Verrouiller la discussion','נעילת צ\'אט','قفل الدردشة'],
 'Restricted chat':['Discussion restreinte','צ\'אט מוגבל','دردشة مقيدة'],
 'Encryption':['Chiffrement','הצפנה','التشفير'],'Messages protected':['Messages protégés','ההודעות מוגנות','الرسائل محمية'],
 'Contact details':['Détails du contact','פרטי איש הקשר','تفاصيل جهة الاتصال'],
 'On R-Style since {d}':['Sur R-Style depuis {d}','ב-R-Style מאז {d}','على R-Style منذ {d}'],
 '{n} groups in common':['{n} groupes en commun','{n} קבוצות משותפות','{n} مجموعات مشتركة'],
 'Only groups you are in too.':['Seulement les groupes où tu es aussi.','רק קבוצות שגם אתה בהן.','فقط المجموعات التي أنت فيها أيضًا.'],
 'No groups in common':['Aucun groupe en commun','אין קבוצות משותפות','لا توجد مجموعات مشتركة'],
 'Share contact':['Partager le contact','שתף איש קשר','مشاركة جهة الاتصال'],
 'Add to favorites':['Ajouter aux favoris','הוסף למועדפים','إضافة للمفضلة'],'Remove from favorites':['Retirer des favoris','הסר ממועדפים','إزالة من المفضلة'],
 'Add to a list':['Ajouter à une liste','הוסף לרשימה','إضافة إلى قائمة'],
 'Export chat':['Exporter la discussion','ייצוא הצ\'אט','تصدير الدردشة'],
 'Clear chat':['Effacer la discussion','מחק את הצ\'אט','مسح الدردشة'],
 'Block {n}':['Bloquer {n}','חסום את {n}','حظر {n}'],'Report {n}':['Signaler {n}','דווח על {n}','الإبلاغ عن {n}'],
 'Always a gradient: choose your color. Only for you and {n}.':['Toujours un dégradé, choisis ta couleur. Seulement pour toi et {n}.','תמיד דגרדה, בחר צבע. רק לך ול-{n}.','دائمًا تدرّج: اختر لونك. لك ولـ{n} فقط.'],
 'Apply':['Appliquer','החל','تطبيق'],
 'Classic':['Classique','קלאסי','كلاسيكي'],'Lavender':['Lavande','לבנדר','لافندر'],'Ocean':['Océan','אוקיינוס','محيط'],'Sunset':['Coucher de soleil','שקיעה','غروب'],'Forest':['Forêt','יער','غابة'],'Burgundy':['Bordeaux','בורדו','عنابي'],'Peach':['Pêche','אפרסק','خوخي'],'Night':['Nuit','לילה','ليل'],
 'No starred messages yet. Long-press a message to star it.':['Pas encore de messages importants. Appuie longtemps sur un message.','אין עדיין הודעות שמורות. לחץ לחיצה ארוכה על הודעה.','لا توجد رسائل مميزة بعد. اضغط مطولًا على رسالة.'],
 'Star':['Important','שמור','تمييز'],
 'No media yet':['Pas encore de médias','אין עדיין מדיה','لا توجد وسائط بعد'],
 'Chat cleared':['Discussion effacée','הצ\'אט נמחק','تم مسح الدردشة'],
 'Clear all messages with {n}?':['Effacer tous les messages avec {n} ?','למחוק את כל ההודעות עם {n}?','مسح كل الرسائل مع {n}؟'],
 'Your messages are protected. In the iPhone app, only you and {n} can read them.':['Tes messages sont protégés. Dans l\'app iPhone, seuls toi et {n} pourrez les lire.','ההודעות שלך מוגנות. באפליקציה לאייפון רק אתה ו-{n} תוכלו לקרוא אותן.','رسائلك محمية. في تطبيق الآيفون، أنت و{n} فقط يمكنكما قراءتها.'],
 'Locked chats open with Face ID in the iPhone app.':['Les discussions verrouillées s\'ouvrent avec Face ID dans l\'app iPhone.','צ\'אטים נעולים נפתחים עם Face ID באפליקציה לאייפון.','الدردشات المقفلة تفتح بـ Face ID في تطبيق الآيفون.'],
 'Restricted: {n} can\'t see when you\'re online or read their messages.':['Restreinte : {n} ne voit pas quand tu es en ligne ni quand tu lis.','מוגבל: {n} לא רואה מתי אתה מחובר או קורא.','مقيدة: لا يرى {n} متى تكون متصلًا أو تقرأ.'],
 'Friends':['Amis','חברים','أصدقاء'],'Family':['Famille','משפחה','العائلة'],'Style squad':['Team style','צוות סטייל','فريق الستايل'],
 'Added to {l}':['Ajouté à {l}','נוסף ל-{l}','أضيف إلى {l}'],
 'Chat exported':['Discussion exportée','הצ\'אט יוצא','تم تصدير الدردشة'],
 'Gold Style · sponsored':['Gold Style · sponsorisé','Gold Style · ממומן','Gold Style · إعلان'],
 'DAILY CHALLENGE':['DÉFI DU JOUR','אתגר היום','تحدي اليوم'],
 'Your friends are playing «{x}».':['Tes amies jouent au défi « {x} ».','החברים שלך משחקים באתגר «{x}».','أصدقاؤك يلعبون تحدي «{x}».'],
 'A theme every day chosen by Ruby. For Gold members.':['Un thème par jour choisi par Ruby. Réservé aux membres Gold.','נושא כל יום שרובי בוחרת. רק למשתמשי Gold.','موضوع كل يوم تختاره روبي. لأعضاء Gold.'],
 'Try Gold · 7 days free':['Essayer Gold · 7 jours offerts','נסה Gold · 7 ימים חינם','جرّب Gold · 7 أيام مجانًا'],
 'You can skip in {n}':['Tu pourras passer dans {n}','אפשר לדלג בעוד {n}','يمكنك التخطي بعد {n}'],
 'Swipe up to skip':['Glisse vers le haut pour passer','החלק למעלה כדי לדלג','اسحب للأعلى للتخطي'],
 'You wear mostly **long** clothes. Shall I keep this style?':['Tu portes surtout du **long**. Je garde ce style ?','את/ה לובש/ת בעיקר בגדים **ארוכים**. לשמור על הסגנון הזה?','ترتدي غالبًا ملابس **طويلة**. هل أحافظ على هذا الأسلوب؟'],
 'Yes':['Oui','כן','نعم'],'Sometimes':['Parfois','לפעמים','أحيانًا'],'No thanks':['Non merci','לא תודה','لا شكرًا'],
 'Noted! Changeable in Settings › My style.':['Noté ! Modifiable dans Réglages › Mon style.','רשמתי! אפשר לשנות בהגדרות › הסגנון שלי.','تم! يمكن تغييره في الإعدادات › أسلوبي.'],
 'My style':['Mon style','הסגנון שלי','أسلوبي'],'Modest outfits':['Tenues pudiques','לבוש צנוע','ملابس محتشمة'],
 'Always':['Toujours','תמיד','دائمًا'],'Never':['Jamais','אף פעם','أبدًا'],
 'Log out':['Se déconnecter','התנתק','تسجيل الخروج'],
 'Log out of R-Style?':['Se déconnecter de R-Style ?','להתנתק מ-R-Style?','تسجيل الخروج من R-Style؟'],
 'Accessory':['Accessoires','אביזרים','إكسسوارات'],
 'Silk scarf':['Foulard en soie','צעיף משי','وشاح حريري'],'Cap':['Casquette','כובע מצחייה','قبعة'],'Gold necklace':['Collier doré','שרשרת זהב','قلادة ذهبية'],'Sunglasses':['Lunettes de soleil','משקפי שמש','نظارات شمسية'],'Leather belt':['Ceinture en cuir','חגורת עור','حزام جلدي'],
 'Voice message':['Message vocal','הודעה קולית','رسالة صوتية'],
 'React':['Réagir','הגב','تفاعل'],
 'Gold member':['Membre Gold','חבר/ת Gold','عضو Gold']
};const L=['fr','he','ar'];window.I18N=window.I18N||{};L.forEach((c,i)=>{window.I18N[c]=window.I18N[c]||{};for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* ---------- small helpers ---------- */
const FRIENDS=new Set(['u1','u2','u3','u4','u5','u6']);
function isFriend(id){return FRIENDS.has(id)&&!S.blocked[id];}
function firstName(n){return String(n||'').split(' ')[0];}
function pop(){if(navigator.vibrate)try{navigator.vibrate(10);}catch(_){}
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const o=actx.createOscillator(),g=actx.createGain(),n=actx.currentTime;o.type='sine';o.frequency.setValueAtTime(520,n);o.frequency.exponentialRampToValueAtTime(1250,n+.07);g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.12,n+.015);g.gain.exponentialRampToValueAtTime(.0001,n+.13);o.connect(g).connect(actx.destination);o.start(n);o.stop(n+.15);}catch(_){}}
S.chatTheme=S.chatTheme||{};S.chatOpt=S.chatOpt||{};S.pins=S.pins||{};S.favChats=S.favChats||{};

/* ---------- chat themes (always a gradient) ---------- */
const THEMES=[['classic','Classic','#0B0B0D','#FFFFFF'],['lavender','Lavender','#4C1D95','#F9A8D4'],['ocean','Ocean','#0C4A6E','#7DD3FC'],['sunset','Sunset','#7F1D1D','#FDBA74'],['forest','Forest','#14532D','#BBF7D0'],['burgundy','Burgundy','#4A0E1C','#FDA4AF'],['peach','Peach','#9A3412','#FFEDD5'],['night','Night','#020617','#64748B'],['gold','Gold','#0B0B0D','#D4AF37']];
function roomGradient(id){const th=S.chatTheme[id];const T=THEMES.find(x=>x[0]===th);
  if(T)return `linear-gradient(180deg,${T[2]} 0%,${T[2]} 12%,${mix(T[2],T[3],.5)} 55%,${T[3]} 100%)`;
  if(S.vip)return 'linear-gradient(180deg,#000 0%,#0B0A08 30%,#2A2314 75%,#4A3B18 100%)';
  return isLight()?'linear-gradient(180deg,#0B0B0D 0%,#2E2E33 28%,#BDBDC3 62%,#FFFFFF 90%)':'linear-gradient(180deg,#000 0%,#1A1A1D 24%,#6E6E76 62%,#A8A8B0 100%)';}
function mix(a,b,k){const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('');}

/* ====================== ROOM ====================== */
function openRoom(id){if(USERS[id]&&S.blocked[id])return;seedChats();roomId=id;const r=roomInfo(id);
  const av=$('#roomAv');av.className='av'+(r.group?' grpAv':'');av.style.cssText='width:38px;height:38px;font-size:14px;'+(r.uid?`background:${USERS[id].color}`:r.av);av.innerHTML=r.group?SV(ICONS.group,'style="width:20px;height:20px;color:#fff"'):initials(r.name);
  $('#roomName').innerHTML=esc(r.name)+`<span class="sub">${r.group?(r.members.length+1)+' '+t('members'):(r.uid?t('online'):'')}</span>`;
  $('#roomBg').style.background=roomGradient(id);$('#micLock').hidden=true;
  show('room');renderMsgs();}
function msgBody(m){
  if(m.a!==undefined||m.voice){return `<span class="vmsg"><button class="vplay" data-play="${m.a?'1':''}" aria-label="Play">${SV('<path d="M7 4l13 8-13 8z" fill="currentColor"/>')}</button><span class="wave">${Array.from({length:22},(_,i)=>`<i style="height:${4+Math.round(Math.abs(Math.sin(i*1.7+((m.ts||1)%7)))*16)}px"></i>`).join('')}</span><small>${m.dur||'0:05'}</small></span>`;}
  if(m.sticker){const it=findItem(m.sticker);return `<div class="stk" ${it?itemPh(it):''}>${it?itemFace(it):''}</div>`;}
  if(m.img&&m.once){return `<button class="onceMsg" data-once="1"><span class="oc">1</span>${m.opened&&m.f!=='me'?t('Opened'):t('Photo · view once')}</button>`;}
  if(m.img)return `<img src="${m.img}" alt="">${m.filter?`<span class="ftag">${esc(m.filter)}</span>`:''}`;
  if(m.outfit){const its=m.outfit.map(findItem).filter(Boolean);return `<div class="card4">${its.slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div>${t('What do you think of this outfit?')}`;}
  if(m.short){const p=findPost(m.short);return `<b>Short</b> · ${p?esc(p.cap||''):''}`;}
  if(m.contact){const u=USERS[m.contact];return u?`<span class="ccard">${avHTML(m.contact,34)}<b>${esc(u.name)}<small>@${esc(u.handle)}</small></b></span>`:'';}
  return esc(m.t);}
let typingRoom=null;
function renderMsgs(){const box=$('#msgs');const r=roomInfo(roomId);const st=streakOf(roomId);const all=S.chats[roomId]||[];
  let h=`<div class="daytag">${t('Today')}</div>`;
  if(st)h+=`<div class="daytag"><span class="flame ${st.warn?'warn':''}" style="justify-content:center">${SV(ICONS.flame)}${t('{n}-day streak',{n:st.n})}</span></div>`;
  let lastMe=-1;all.forEach((m,k)=>{if(m.f==='me')lastMe=k;});
  all.forEach((m,k)=>{
    if(m.f==='sys'){h+=`<div class="daytag">${esc(m.t)}</div>`;return;}
    const cls='m '+(m.f==='me'?'me':'them')+(m.sticker?' sticker':'')+(m.rx&&m.rx.length?' hasrx':'')+(m.star?' starred':'')+(m.img&&!m.once?' pic':'');
    let inner='';if(r.group&&m.f!=='me'&&m.by)inner+=`<span class="from">${esc(USERS[m.by]?.name||'')}</span>`;
    inner+=msgBody(m);
    if(m.rx&&m.rx.length)inner+=`<span class="rx">${m.rx.map(x=>SV(ICONS[x])).join('')}</span>`;
    h+=`<div class="${cls}" data-k="${k}">${inner}</div>`;
    if(k===lastMe){const s=m.st||'read';h+=`<div class="mstat ${s}">${s==='sent'?TICK1:TICK2}<span>${t(s==='sent'?'Sent':s==='delivered'?'Delivered':'Read')}</span></div>`;}
  });
  if(typingRoom===roomId)h+=`<div class="m them typing"><i></i><i></i><i></i></div>`;
  box.innerHTML=h;box.scrollTop=box.scrollHeight;}
function flyLast(){const box=$('#msgs');const el=[...box.querySelectorAll('.m.me')].pop();const comp=$('#composer');if(!el||!comp||!el.animate)return;
  const a=el.getBoundingClientRect(),c=$('#msgInput').getBoundingClientRect();
  const dx=(c.left+20)-a.left,dy=(c.top)-a.top;
  el.animate([{transform:`translate(${dx}px,${dy}px) scale(.55)`,opacity:.3,borderRadius:'22px'},{transform:'translate(0,-6px) scale(1.04)',opacity:1,offset:.75},{transform:'none',opacity:1}],{duration:420,easing:'cubic-bezier(.2,.8,.25,1)'});}
function burstSend(){const b=$('#sendBtn');b.classList.remove('sendfx');void b.offsetWidth;b.classList.add('sendfx');setTimeout(()=>b.classList.remove('sendfx'),600);}
function pushMsg(id,m){seedChats();m.ts=m.ts||Date.now();if(m.f==='me')m.st='sent';(S.chats[id]=S.chats[id]||[]).push(m);if(m.f==='me')bumpStreak(id);save();
  const here=()=>current==='room'&&roomId===id;
  if(here()){renderMsgs();if(m.f==='me'){flyLast();burstSend();pop();}}
  const r=roomInfo(id);
  if(m.f==='me'){
    setTimeout(()=>{if(m.st==='sent'){m.st='delivered';save();if(here())renderMsgs();}},600);
    if(!r.dm&&!(S.chatOpt[id]||{}).restricted){
      setTimeout(()=>{m.st='read';typingRoom=id;save();if(here())renderMsgs();},1000);
      setTimeout(()=>{typingRoom=null;const by=r.group?pick(r.members):id;
        if((m.outfit||m.sticker||m.img)&&Math.random()<.85){m.rx=m.rx||[];if(!m.rx.length)m.rx.push(pick(['heart','flame','crown']));}
        S.chats[id].push({f:'them',by,t:pick(REPLIES),ts:Date.now(),read:here()});save();if(here())renderMsgs();else if(current==='chat')renderChatList();},2600);}
  }}
$('#composer').onsubmit=e=>{e.preventDefault();const inp=$('#msgInput');const tx=inp.value.trim();if(!tx)return;inp.value='';pushMsg(roomId,{f:'me',t:tx});};
$('#roomBack').onclick=()=>show('chat');
$('#roomWho').onclick=()=>openContact(roomId);
$('#callBtn').onclick=()=>startCall(roomId,false);
$('#videoBtn').onclick=()=>startCall(roomId,true);
$('#snapBtn').onclick=()=>openSnap(roomId);
/* message actions: long press / double tap */
(function(){const box=$('#msgs');let lt=0,lk=null,hold=null,held=false;
  const open=k=>{const m=(S.chats[roomId]||[])[k];if(!m||m.f==='sys')return;
    openSheet(`<h3>${t('React')}</h3><div class="rxbar">${['heart','flame','crown','star'].map(x=>`<button data-rx="${x}" aria-label="${x}">${SV(ICONS[x])}</button>`).join('')}</div><button class="srow" id="starMsg"><div class="l"><b>${t('Star')}</b></div><span>${m.star?'✓':''}</span></button>`);
    $('#sheet').querySelectorAll('[data-rx]').forEach(b=>b.onclick=()=>{m.rx=[b.dataset.rx];save();closeSheet();renderMsgs();});
    $('#starMsg').onclick=()=>{m.star=!m.star;save();closeSheet();renderMsgs();};};
  box.onpointerdown=e=>{const el=e.target.closest('.m');held=false;if(!el||el.classList.contains('typing'))return;hold=setTimeout(()=>{held=true;open(+el.dataset.k);},450);};
  box.onpointerup=e=>{clearTimeout(hold);if(held)return;const el=e.target.closest('.m');if(!el)return;
    if(e.target.closest('[data-once]')){openOnce(+el.dataset.k);return;}
    if(e.target.closest('.vplay')){playVoice(+el.dataset.k,e.target.closest('.vplay'));return;}
    const now=Date.now();if(now-lt<320&&lk===el.dataset.k){open(+el.dataset.k);lt=0;}else{lt=now;lk=el.dataset.k;}};
  box.onpointercancel=()=>clearTimeout(hold);box.onpointermove=e=>{if(Math.abs(e.movementY)>3)clearTimeout(hold);};})();
function playVoice(k,btn){const m=S.chats[roomId][k];if(m.a){try{const a=new Audio(m.a);a.play();}catch(_){}}
  const el=btn.closest('.m');el.classList.add('playing');setTimeout(()=>el.classList.remove('playing'),2200);}
function openOnce(k){const m=S.chats[roomId][k];if(!m)return;
  if(m.f==='me'){toast(t('Photo · view once'));return;}
  if(m.opened){toast(t('Opened'));return;}
  const v=document.createElement('div');v.className='onceView';v.innerHTML=`<img src="${m.img}" alt=""><span>${t('View once')}</span>`;$('#app').appendChild(v);v.onclick=()=>{v.remove();m.opened=true;delete m.img_;save();renderMsgs();};}

/* voice messages: for everyone */
let vrec=null,vchunks=[],vStart=0,vFake=null;
$('#micBtn').onclick=async()=>{
  const b=$('#micBtn');
  if(vFake){clearTimeout(vFake.t);const dur=Math.max(1,Math.round((Date.now()-vStart)/1000));vFake=null;b.classList.remove('recording');pushMsg(roomId,{f:'me',voice:1,dur:'0:'+String(dur).padStart(2,'0')});return;}
  if(vrec&&vrec.state==='recording'){vrec.stop();return;}
  vStart=Date.now();
  try{if(!navigator.mediaDevices||!window.MediaRecorder)throw 0;const st=await navigator.mediaDevices.getUserMedia({audio:true});vrec=new MediaRecorder(st);vchunks=[];vrec.ondataavailable=ev=>vchunks.push(ev.data);
    vrec.onstop=()=>{st.getTracks().forEach(x=>x.stop());b.classList.remove('recording');const dur=Math.max(1,Math.round((Date.now()-vStart)/1000));
      const fr=new FileReader();fr.onload=()=>pushMsg(roomId,{f:'me',a:fr.result,dur:'0:'+String(Math.min(59,dur)).padStart(2,'0')});fr.readAsDataURL(new Blob(vchunks,{type:vrec.mimeType}));};
    vrec.start();b.classList.add('recording');toast(t('Recording… tap to send'));
  }catch(err){/* demo: the frame blocks the microphone, we still show the voice message */
    vFake={t:setTimeout(()=>{if(vFake)$('#micBtn').click();},8000)};b.classList.add('recording');toast(t('Recording… tap to send'));}};

/* attach menu: photo now opens the Snapchat-like camera */
$('#attachBtn').onclick=()=>{openSheet(`<h3>${t('Send')}</h3>
  <button class="srow" id="atPhoto"><div class="l"><b>${t('Photo')}</b><small class="muted">${t('Photos are checked by AI to block inappropriate images')}</small></div></button>
  <button class="srow" id="atOutfit"><div class="l"><b>${t('Outfit from my wardrobe')}</b></div></button>
  <button class="srow" id="atSticker"><div class="l"><b>${t('Sticker of my clothes')}</b><small class="muted">${t('Turn any item of your wardrobe into a sticker')}</small></div></button>`);
  $('#atPhoto').onclick=()=>{closeSheet();openSnap(roomId);};
  $('#atOutfit').onclick=()=>{const opts=[...(S.today?.list||[]),...S.saved];if(!opts.length){toast(t('No outfits yet'));return;}
    setSheet(`<h3>${t('Choose an outfit')}</h3>${opts.map((o,k)=>`<button class="saved" style="width:100%;text-align:start" data-po="${k}"><b>${esc(o.title||t('Outfit'))}</b><div class="row4">${o.ids.map(findItem).filter(Boolean).slice(0,4).map(i=>`<div ${itemPh(i)}>${itemFace(i)}</div>`).join('')}</div></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-po]').forEach(b=>b.onclick=()=>{closeSheet();pushMsg(roomId,{f:'me',outfit:opts[+b.dataset.po].ids});});};
  $('#atSticker').onclick=()=>{const items=allItems();setSheet(`<h3>${t('Sticker of my clothes')}</h3><div class="wgrid" style="margin-top:12px">${items.map(i=>`<button class="item" data-stk="${i.id}"><div class="ph" ${itemPh(i)}>${itemFace(i)}</div><div class="meta"><b>${esc(i.name)}</b></div></button>`).join('')}</div>`);
    $('#sheet').querySelectorAll('[data-stk]').forEach(b=>b.onclick=()=>{closeSheet();pushMsg(roomId,{f:'me',sticker:b.dataset.stk});});};};

/* ====================== CHAT LIST: long-press peek, pins, Gold-only challenge ====================== */
function renderChallenge(){const box=$('#challenge');if(!S.vip){box.innerHTML='';return;}
  const c=challengeToday();const who=['u1','u3','u2'].filter(u=>!S.blocked[u]);
  box.innerHTML=`<div class="challenge"><div class="lbl"><b>${t('DAILY CHALLENGE')}</b><span>${t('Ends in {h} h',{h:hoursLeft()})}</span></div>
   <div><h3>${esc(t(c.theme))}</h3><p>${t('Theme chosen by Ruby · your friends vote')}</p></div>
   <div class="foot"><div class="stack"><span style="display:flex">${who.map(u=>avHTML(u,30)).join('')}</span>${t('{n} friends posted',{n:who.length})}</div>
   <button class="go ${c.joined?'done':''}" data-chal="1">${c.joined?t('Posted'):t('Join')}</button></div></div>`;}
const _renderChatList=renderChatList;
renderChatList=function(){_renderChatList();const box=$('#convs');
  const rows=[...box.querySelectorAll('.crow[data-room]')];const pinned=rows.filter(r=>S.pins[r.dataset.room]);
  pinned.reverse().forEach(r=>{r.classList.add('pinned');const rb=box.querySelector('.rubyRow');if(rb)rb.after(r);else box.prepend(r);});
  rows.forEach(r=>{const o=S.chatOpt[r.dataset.room]||{};if(o.muted)r.querySelector('.t b')?.insertAdjacentHTML('beforeend',` <span class="mutedIc">${SV(ICONS.mute)}</span>`);});};
(function(){const list=$('#clist');let hold=null,sx=0,sy=0,suppress=false;
  list.addEventListener('pointerdown',e=>{const r=e.target.closest('.crow[data-room]');if(!r)return;sx=e.clientX;sy=e.clientY;suppress=false;hold=setTimeout(()=>{suppress=true;openPeek(r.dataset.room,r);},430);});
  list.addEventListener('pointermove',e=>{if(hold&&(Math.abs(e.clientX-sx)>8||Math.abs(e.clientY-sy)>8)){clearTimeout(hold);hold=null;}});
  list.addEventListener('pointerup',()=>{clearTimeout(hold);hold=null;});list.addEventListener('pointercancel',()=>{clearTimeout(hold);hold=null;});
  list.addEventListener('contextmenu',e=>{if(e.target.closest('.crow'))e.preventDefault();});
  list.addEventListener('click',e=>{if(suppress){e.stopPropagation();e.preventDefault();suppress=false;}},true);})();
function openPeek(id,row){const r=roomInfo(id);const all=(S.chats[id]||[]).filter(m=>m.f!=='sys');const last=all.slice(-4);
  let unread=0;for(let i=all.length-1;i>=0&&all[i].f==='them'&&!all[i].read;i--)unread++;
  if(navigator.vibrate)try{navigator.vibrate(12);}catch(_){}
  const p=$('#peek');const o=S.chatOpt[id]||{};
  p.innerHTML=`<div class="pkBg"></div><div class="pkCard"><div class="pkHead">${r.uid?avHTML(r.uid,36):`<span class="av grpAv" style="width:36px;height:36px">${SV(ICONS.group,'style="width:18px;height:18px;color:#fff"')}</span>`}<span><b>${esc(r.name)}</b><small>${unread?t('{n} new messages',{n:unread}):''}</small></span></div>
    <div class="pkMsgs" style="background:${roomGradient(id)}">${last.map(m=>`<div class="m ${m.f==='me'?'me':'them'}">${m.img||m.sticker||m.outfit?previewV5(id,m):msgBody(m)}</div>`).join('')||`<div class="daytag">${t('Say hi')}</div>`}</div>
    <div class="pkNote">${SV(ICONS.eyeoff)}${esc(firstName(r.name))} ${t('doesn\'t see that you read it')}</div></div>
    <div class="pkMenu"><button data-pk="open">${t('Open')}${SV(ICONS.chat)}</button><button data-pk="read">${t('Mark as read')}${TICK2}</button><button data-pk="pin">${t(S.pins[id]?'Unpin':'Pin')}${SV(ICONS.pin)}</button><button data-pk="mute">${t(o.muted?'Unmute':'Silence')}${SV(ICONS.mute)}</button></div>`;
  p.classList.add('on');
  p.onclick=e=>{const b=e.target.closest('[data-pk]');if(!b){if(e.target.closest('.pkCard')){closePeek();markRead(id);openRoom(id);return;}closePeek();return;}
    const k=b.dataset.pk;closePeek();
    if(k==='open'){markRead(id);openRoom(id);}if(k==='read'){markRead(id);renderChatList();}
    if(k==='pin'){S.pins[id]=!S.pins[id];save();renderChatList();}
    if(k==='mute'){const x=S.chatOpt[id]=S.chatOpt[id]||{};x.muted=!x.muted;save();renderChatList();}};}
function closePeek(){$('#peek').classList.remove('on');}
function markRead(id){(S.chats[id]||[]).forEach(m=>{if(m.f==='them')m.read=true;});save();}
$('#clist').onclick=e=>{
  if(e.target.closest('[data-chal]')){if(challengeToday().joined)return;challengeMode=true;openPoster();return;}
  if(e.target.closest('#reqBar')){openRequests();return;}
  if(e.target.closest('[data-ruby]')){show('ruby');return;}
  const r=e.target.closest('[data-room]');if(r){markRead(r.dataset.room);openRoom(r.dataset.room);}};

/* ====================== CONTACT INFO (like WhatsApp) ====================== */
let ciId=null;
function ciRow(icon,label,right,attrs,cls){return `<button class="ciRow ${cls||''}" ${attrs||''}>${SV(ICONS[icon])}<span>${label}</span>${right||''}</button>`;}
function ciTog(on){return `<span class="toggle ${on?'on':''}"></span>`;}
function openContact(id){ciId=id;const r=roomInfo(id);const u=r.uid?USERS[r.uid]:null;const o=S.chatOpt[id]=S.chatOpt[id]||{};const chev=`<span class="chev">${SV(ICONS.chev)}</span>`;
  const msgs=S.chats[id]||[];const media=msgs.filter(m=>m.img&&!m.once);const stars=msgs.filter(m=>m.star).length;
  const common=r.uid?S.groups.filter(g=>!g.dm&&g.members.includes(r.uid)):[];
  const th=THEMES.find(x=>x[0]===S.chatTheme[id]);
  const dots=`<span class="ciDots">${THEMES.slice(0,4).map(x=>`<i style="background:linear-gradient(180deg,${x[2]},${x[3]})"></i>`).join('')}</span>`;
  const gold=u&&u.crown;
  $('#ciBody').innerHTML=`<div class="ciTop">${r.uid?`<span class="ciAv ${gold?'gring':''}">${avHTML(r.uid,108)}</span>`:`<span class="ciAv"><span class="av grpAv" style="width:108px;height:108px">${SV(ICONS.group,'style="width:46px;height:46px;color:#fff"')}</span></span>`}
     <h2>${esc(r.name)}</h2>${u?`<small class="muted">@${esc(u.handle)} · AI Style Score ${u.score}</small>`:`<small class="muted">${r.members.length+1} ${t('members')}</small>`}
     ${gold?`<span class="goldChip">${SV(ICONS.crown)}GOLD</span>`:''}</div>
   <div class="ciActs"><button data-ci="call">${SV(ICONS.phone)}${t('Call')}</button><button data-ci="video">${SV(ICONS.video)}${t('Video')}</button><button data-ci="search">${SV(ICONS.search)}${t('Search')}</button></div>
   <button class="ciCard ciMedia" data-ci="media"><span class="hd"><span>${t('Media, links and docs')}</span><span class="muted">${media.length} ${chev}</span></span>
     <span class="th">${media.slice(-4).map(m=>`<i style="background-image:url(${m.img})"></i>`).join('')||`<small class="muted">${t('No media yet')}</small>`}</span></button>
   <div class="ciCard">${ciRow('star',t('Starred messages'),`<span class="muted">${stars}</span>${chev}`,'data-ci="stars"')}
     ${ciRow('bell',t('Notifications'),ciTog(!o.muted),'data-ci="notif"')}
     ${ciRow('palette',t('Chat theme'),(th?`<span class="muted">${t(th[1])}</span>`:dots)+chev,'data-ci="theme"')}
     ${ciRow('download',t('Save photos'),ciTog(o.savePhotos!==false),'data-ci="savep"')}
     ${ciRow('timer',t('Disappearing messages'),`<span class="muted">${t(o.eph||'Off')}</span>${chev}`,'data-ci="eph"')}</div>
   <div class="ciCard">${ciRow('lock',t('Lock chat'),ciTog(!!o.locked),'data-ci="lock"')}
     ${ciRow('eyeoff',t('Restricted chat'),ciTog(!!o.restricted),'data-ci="restrict"')}
     ${ciRow('shield',t('Encryption'),`<span class="muted sm">${t('Messages protected')}</span>`,'data-ci="enc"')}</div>
   ${u?`<div class="ciCard ciInfo"><small>${t('Contact details').toUpperCase()}</small><b>${esc(t(u.bio))}</b><span class="muted">${t('On R-Style since {d}',{d:'2026'})}</span></div>
   <div class="ciSec">${common.length?t('{n} groups in common',{n:common.length}):t('No groups in common')}</div>
   ${common.length?`<div class="ciCard">${common.map(g=>`<button class="ciRow" data-cig="${g.id}"><span class="av grpAv" style="width:40px;height:40px">${SV(ICONS.group,'style="width:20px;height:20px;color:#fff"')}</span><span>${esc(g.name)}<small class="muted">${g.members.map(x=>firstName(USERS[x]?.name)).join(', ')}, ${t('You')}</small></span></button>`).join('')}</div>`:''}
   <div class="ciNote">${t('Only groups you are in too.')}</div>`:''}
   <div class="ciCard">${u?ciRow('share',t('Share contact'),'','data-ci="share"'):''}
     ${ciRow('heart',t(S.favChats[id]?'Remove from favorites':'Add to favorites'),'','data-ci="fav"')}
     ${ciRow('list',t('Add to a list'),'','data-ci="list"')}
     ${ciRow('export',t('Export chat'),'','data-ci="export"')}</div>
   <div class="ciCard danger">${ciRow('trash',t('Clear chat'),'','data-ci="clear"')}
     ${u?ciRow('block',t('Block {n}',{n:firstName(u.name)}),'','data-ci="block"')+ciRow('flag',t('Report {n}',{n:firstName(u.name)}),'','data-ci="report"'):''}</div>`;
  openOverlay('cinfo');}
$('#ciBack').onclick=()=>closeOverlay('cinfo');
$('#ciBody').onclick=e=>{const g=e.target.closest('[data-cig]');if(g){closeOverlay('cinfo');openRoom(g.dataset.cig);return;}
  const b=e.target.closest('[data-ci]');if(!b)return;const k=b.dataset.ci,id=ciId,r=roomInfo(id),o=S.chatOpt[id]=S.chatOpt[id]||{};const nm=firstName(r.name);
  const re=()=>{save();openContact(id);};
  if(k==='call'||k==='video'){closeOverlay('cinfo');startCall(id,k==='video');}
  if(k==='search'){openSheet(`<h3>${t('Search')}</h3><input class="field" id="ciQ" style="height:48px;font-size:15px;margin-top:10px" autocomplete="off"><div id="ciRes" style="margin-top:10px"></div>`);
    $('#ciQ').oninput=ev=>{const q=ev.target.value.trim().toLowerCase();const res=q?(S.chats[id]||[]).filter(m=>m.t&&m.t.toLowerCase().includes(q)):[];$('#ciRes').innerHTML=res.map(m=>`<div class="srow"><div class="l"><b>${esc(m.t)}</b><small class="muted">${m.f==='me'?t('You'):esc(nm)}</small></div></div>`).join('');};$('#ciQ').focus();}
  if(k==='media'){const media=(S.chats[id]||[]).filter(m=>m.img&&!m.once);openSheet(`<h3>${t('Media, links and docs')}</h3>${media.length?`<div class="vgrid" style="margin-top:10px">${media.map(m=>`<div style="background-image:url(${m.img})"></div>`).join('')}</div>`:`<p class="muted">${t('No media yet')}</p>`}`);}
  if(k==='stars'){const st=(S.chats[id]||[]).filter(m=>m.star);openSheet(`<h3>${t('Starred messages')}</h3>${st.length?st.map(m=>`<div class="srow"><div class="l"><b>${m.t?esc(m.t):previewV5(id,m)}</b><small class="muted">${m.f==='me'?t('You'):esc(nm)}</small></div>${SV(ICONS.star,'style="width:18px;height:18px;color:var(--accent)"')}</div>`).join(''):`<p class="muted">${t('No starred messages yet. Long-press a message to star it.')}</p>`}`);}
  if(k==='notif'){o.muted=!o.muted;re();}
  if(k==='savep'){o.savePhotos=o.savePhotos===false;re();}
  if(k==='lock'){o.locked=!o.locked;re();if(o.locked)toast(t('Locked chats open with Face ID in the iPhone app.'));}
  if(k==='restrict'){o.restricted=!o.restricted;re();if(o.restricted)toast(t('Restricted: {n} can\'t see when you\'re online or read their messages.',{n:nm}));}
  if(k==='enc'){openSheet(`<div style="text-align:center;padding:10px 0">${SV(ICONS.shield,'style="width:44px;height:44px;color:var(--accent)"')}<h3>${t('Encryption')}</h3><p class="muted">${t('Your messages are protected. In the iPhone app, only you and {n} can read them.',{n:esc(nm)})}</p></div>`);}
  if(k==='eph'){openSheet(`<h3>${t('Disappearing messages')}</h3>${['Off','24 hours','7 days'].map(x=>`<button class="srow" data-eph="${x}"><div class="l"><b>${t(x)}</b></div><span>${(o.eph||'Off')===x?'✓':''}</span></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-eph]').forEach(x=>x.onclick=()=>{o.eph=x.dataset.eph;closeSheet();re();});}
  if(k==='theme')openThemePicker(id);
  if(k==='share'){const u=r.uid;openSheet(`<h3>${t('Share contact')}</h3>${Object.keys(USERS).filter(x=>x!==u&&!S.blocked[x]).map(x=>`<button class="pick" data-shto="${x}">${avHTML(x,42)}<b>${USERS[x].name}</b><span>›</span></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-shto]').forEach(x=>x.onclick=()=>{pushMsg(x.dataset.shto,{f:'me',contact:u});closeSheet();toast(t('Sent ✓'));});}
  if(k==='fav'){S.favChats[id]=!S.favChats[id];re();}
  if(k==='list'){openSheet(`<h3>${t('Add to a list')}</h3>${['Friends','Family','Style squad'].map(l=>`<button class="srow" data-lst="${l}"><div class="l"><b>${t(l)}</b></div><span>${(o.list===l)?'✓':''}</span></button>`).join('')}`);
    $('#sheet').querySelectorAll('[data-lst]').forEach(x=>x.onclick=()=>{o.list=x.dataset.lst;save();closeSheet();toast(t('Added to {l}',{l:t(o.list)}));});}
  if(k==='export'){const txt=(S.chats[id]||[]).map(m=>(m.f==='me'?'@'+me().username:m.f==='sys'?'—':r.name)+': '+(m.t||previewV5(id,m))).join('\n');
    try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download='R-Style - '+r.name+'.txt';document.body.appendChild(a);a.click();a.remove();}catch(_){}toast(t('Chat exported'));}
  if(k==='clear'){openSheet(`<h3>${t('Clear chat')}</h3><p class="muted">${t('Clear all messages with {n}?',{n:esc(r.name)})}</p><button class="btn danger" id="clrYes" style="margin-top:12px">${t('Clear chat')}</button><button class="btn" id="clrNo" style="margin-top:6px">${t('Cancel')}</button>`);
    $('#clrYes').onclick=()=>{S.chats[id]=[];save();closeSheet();re();toast(t('Chat cleared'));};$('#clrNo').onclick=closeSheet;}
  if(k==='block'){const u=r.uid;S.blocked[u]=true;if(S.following[u])toggleFollow(u);save();closeOverlay('cinfo');show('chat');toast(t('{n} is blocked',{n:USERS[u].name}));}
  if(k==='report'){toast(t('Thanks — our team will review this account'));}
};
function openThemePicker(id){let sel=S.chatTheme[id]||null;const nm=firstName(roomInfo(id).name);
  const draw=()=>{openSheet(`<h3>${t('Chat theme')}</h3><p class="muted" style="margin:0;font-size:13px">${t('Always a gradient: choose your color. Only for you and {n}.',{n:esc(nm)})}</p>
    <div class="thGrid">${THEMES.map(x=>`<button data-th9="${x[0]}" class="${sel===x[0]?'on':''}"><span class="thsw" style="background:linear-gradient(180deg,${x[2]},${x[3]})"><i class="a"></i><i class="b"></i></span><small>${t(x[1])}</small></button>`).join('')}</div>
    <button class="btn primary" id="thApply" style="margin-top:14px">${t('Apply')}</button>`);
    $('#sheet').querySelectorAll('[data-th9]').forEach(b=>b.onclick=()=>{sel=b.dataset.th9;$('#sheet').querySelectorAll('[data-th9]').forEach(x=>x.classList.toggle('on',x===b));});
    $('#thApply').onclick=()=>{if(sel)S.chatTheme[id]=sel;save();closeSheet();$('#roomBg').style.background=roomGradient(id);openContact(id);};};draw();}

/* ====================== FILTERS (shared by calls + camera) ====================== */
const FILTERS=[
 {k:'none',n:'None',css:'none'},
 {k:'vintage',n:'Vintage',css:'sepia(.55) contrast(1.05) saturate(1.2)',sw:'#8B6B4F'},
 {k:'bw',n:'B&W',css:'grayscale(1) contrast(1.1)',sw:'#3F3F46'},
 {k:'warm',n:'Warm',css:'saturate(1.3) hue-rotate(-12deg) brightness(1.05)',sw:'#B45309'},
 {k:'cool',n:'Cool',css:'saturate(1.1) hue-rotate(18deg) brightness(1.02)',sw:'#0E7490'},
 {k:'crown',n:'Crown',ov:'crown'},{k:'puppy',n:'Puppy',ov:'puppy'},{k:'hearts',n:'Hearts',ov:'hearts'},{k:'sparkles',n:'Sparkles',ov:'sparkles'},
 {k:'glasses',n:'Glasses',ov:'glasses',gold:1},{k:'hat',n:'Hat',ov:'hat',gold:1},{k:'earrings',n:'Earrings',ov:'earrings',gold:1},{k:'makeup',n:'Make-up',ov:'makeup',gold:1},
 {k:'fdate',n:'Date frame',ov:'fdate',gold:1},{k:'flogo',n:'R-Style frame',ov:'flogo',gold:1}];
const OVL={
 crown:'<svg viewBox="0 0 120 60"><path d="M8 54L16 12l26 22L60 4l18 30 26-22 8 42z" fill="#F5C842" stroke="#B88A10" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="40" r="5" fill="#E11D2E"/></svg>',
 puppy:'<svg viewBox="0 0 120 90"><path d="M10 6l26 12-8 34zM110 6L84 18l8 34z" fill="#92400E"/><ellipse cx="60" cy="74" rx="11" ry="8" fill="#111"/></svg>',
 hearts:'<svg viewBox="0 0 120 60"><g fill="#F43F5E"><path d="M20 30s-12-7-12-15a7 7 0 0 1 12-4 7 7 0 0 1 12 4c0 8-12 15-12 15z"/><path d="M60 20s-10-6-10-12a6 6 0 0 1 10-3 6 6 0 0 1 10 3c0 6-10 12-10 12z"/><path d="M100 32s-12-7-12-15a7 7 0 0 1 12-4 7 7 0 0 1 12 4c0 8-12 15-12 15z"/></g></svg>',
 sparkles:'<svg viewBox="0 0 120 60"><g fill="#FDE68A"><path d="M20 10l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><path d="M95 6l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z"/><path d="M62 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/></g></svg>',
 glasses:'<svg viewBox="0 0 120 40"><g fill="#111"><rect x="8" y="6" width="44" height="28" rx="12"/><rect x="68" y="6" width="44" height="28" rx="12"/><rect x="50" y="14" width="20" height="5"/></g><path d="M16 12h12" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/></svg>',
 hat:'<svg viewBox="0 0 120 60"><path d="M4 50h112" stroke="#1F2937" stroke-width="8" stroke-linecap="round"/><path d="M28 50c0-28 10-44 32-44s32 16 32 44z" fill="#1F2937"/><path d="M28 40h64" stroke="#D4AF37" stroke-width="5"/></svg>',
 earrings:'<svg viewBox="0 0 120 50"><g fill="none" stroke="#D4AF37" stroke-width="4"><circle cx="12" cy="30" r="9"/><circle cx="108" cy="30" r="9"/></g><path d="M12 4v17M108 4v17" stroke="#D4AF37" stroke-width="3"/></svg>',
 makeup:'<svg viewBox="0 0 120 60"><ellipse cx="24" cy="30" rx="14" ry="8" fill="#FB7185" opacity=".45"/><ellipse cx="96" cy="30" rx="14" ry="8" fill="#FB7185" opacity=".45"/><path d="M44 50c10 6 22 6 32 0" stroke="#BE123C" stroke-width="6" fill="none" stroke-linecap="round"/></svg>'};
function filterById(k){return FILTERS.find(f=>f.k===k)||FILTERS[0];}
function fName(f){return t(f.n);}
function fringHTML(sel){return FILTERS.map(f=>{const lock=f.gold&&!S.vip;const face=f.ov?(f.ov==='fdate'||f.ov==='flogo'?`<b>${f.ov==='fdate'?new Date().getDate():'R'}</b>`:OVL[f.ov]):f.k==='none'?SV(ICONS.none):'';
  return `<button class="fc ${sel===f.k?'on':''} ${lock?'lk':''}" data-f9="${f.k}" aria-label="${esc(fName(f))}" style="${f.sw?`background:${f.sw}`:''}">${face}${lock?`<span class="lkb">${SV(ICONS.lock)}</span>`:''}</button>`;}).join('');}
function overlayHTML(k){const f=filterById(k);if(!f.ov)return '';
  if(f.ov==='fdate'){const d=new Date();return `<div class="ov ovDate"><b>${d.getDate()}</b><span>${d.toLocaleDateString(S.lang||'en',{month:'short'}).toUpperCase()} · ${W[S.weather].t}°</span></div>`;}
  if(f.ov==='flogo')return `<div class="ov ovLogo">${S.vip?'GOLD STYLE':'R-STYLE'}</div>`;
  return `<div class="ov ov-${f.ov}">${OVL[f.ov]}</div>`;}
function bindRing(ring,onPick){
  ring.onclick=e=>{const b=e.target.closest('[data-f9]');if(!b)return;const f=filterById(b.dataset.f9);
    if(f.gold&&!S.vip){toast(t('This filter is for Gold members'));return;}
    ring.querySelectorAll('.fc').forEach(x=>x.classList.toggle('on',x===b));b.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});onPick(f);};
  let tm=null;ring.onscroll=()=>{clearTimeout(tm);tm=setTimeout(()=>{const r=ring.getBoundingClientRect(),cx=r.left+r.width/2;let best=null,bd=1e9;
    ring.querySelectorAll('.fc').forEach(x=>{const q=x.getBoundingClientRect();const d=Math.abs(q.left+q.width/2-cx);if(d<bd){bd=d;best=x;}});
    if(best&&!best.classList.contains('on')){const f=filterById(best.dataset.f9);if(f.gold&&!S.vip)return;ring.querySelectorAll('.fc').forEach(x=>x.classList.toggle('on',x===best));onPick(f);}},140);};}

/* ====================== CALLS ====================== */
const CALL={id:null,video:false,t0:0,timer:0,muted:false,spk:false,menu:false,filters:false,filter:'none',people:[],stream:null,host:false};
function startCall(id,video){const r=roomInfo(id);
  if(r.uid&&!isFriend(r.uid)){toast(t('Calls are only between friends who follow each other.'));return;}
  if(r.dm){toast(t('Calls are only between friends who follow each other.'));return;}
  Object.assign(CALL,{id,video,t0:Date.now(),muted:false,spk:false,menu:false,filters:false,filter:'none',people:r.group?r.members.slice(0,callMax()-1):[r.uid],host:S.vip});
  $('#call').classList.add('on');renderCall();clearInterval(CALL.timer);CALL.timer=setInterval(()=>{const e=$('#callTime');if(e)e.textContent=callClock();},1000);
  if(video)camOn();}
function callMax(){return S.vip?32:8;}
function callClock(){const s=Math.floor((Date.now()-CALL.t0)/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
async function camOn(){try{if(!navigator.mediaDevices)throw 0;CALL.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});const v=$('#selfV');if(v){v.srcObject=CALL.stream;v.play().catch(()=>{});}}catch(_){CALL.stream=null;}}
function camOff(){if(CALL.stream){CALL.stream.getTracks().forEach(x=>x.stop());CALL.stream=null;}}
function endCall(){clearInterval(CALL.timer);camOff();$('#call').classList.remove('on');$('#call').innerHTML='';const id=CALL.id;CALL.id=null;
  if(id){const d=callClock();(S.chats[id]=S.chats[id]||[]).push({f:'sys',t:(CALL.video?t('Video'):t('Call'))+' · '+d});save();if(current==='room')renderMsgs();}toast(t('Call ended'));}
function tileHTML(uid){const u=USERS[uid];return `<div class="tile" style="background:${mix(u.color,'#000000',.45)}"><span class="ti">${initials(u.name)}</span><small>${esc(firstName(u.name))}</small></div>`;}
function renderCall(){const c=$('#call');const r=roomInfo(CALL.id);const group=CALL.people.length>1||r.group;const uid=r.uid;const u=uid?USERS[uid]:null;
  const gold=u&&u.crown;const fsel=filterById(CALL.filter);
  const btn=(id,icon,lbl,on,cls)=>`<button class="cbtn ${on?'on':''} ${cls||''}" id="${id}" aria-label="${lbl}">${icon}</button>`;
  let stage='';
  if(group){const all=[...CALL.people,'me'];
    stage=`<div class="cgrid n${Math.min(all.length,8)}">${all.map(p=>p==='me'?`<div class="tile me"><video id="selfV" autoplay muted playsinline style="filter:${fsel.css||'none'}"></video><span class="ti">${initials(me().username)}</span>${overlayHTML(CALL.filter)}<small>${t('You')}</small></div>`:tileHTML(p)).join('')}</div>`;}
  else if(CALL.video){stage=`<div class="remote" style="background:${mix(u.color,'#000000',.55)}"><span class="ti big">${initials(u.name)}</span></div>
      <div class="selfPip"><video id="selfV" autoplay muted playsinline style="filter:${fsel.css||'none'}"></video><span class="ti">${initials(me().username)}</span>${overlayHTML(CALL.filter)}</div>`;}
  else{stage=`<div class="voiceAv ${gold?'gring':''}">${avHTML(uid,150)}</div>`;}
  c.className='full on '+(CALL.video||group?'vid':'voice');
  c.innerHTML=`${stage}
   <div class="ctop"><b>${esc(group?r.name:u.name)}${gold?SV(ICONS.crown,'class="gc" fill="currentColor"'):''}</b><span id="callTime">${callClock()}</span>${group?`<small>${CALL.people.length+1} / ${CALL.host?32:8}</small>`:''}</div>
   ${CALL.filters?`<div class="fname">${esc(fName(fsel))}</div><div class="fring" id="callRing">${fringHTML(CALL.filter)}</div><div class="fhint">${t('Swipe to change filter')}</div>`:''}
   ${CALL.menu?`<div class="cmenu">${!CALL.video&&!group?`<button data-cm="video">${SV(ICONS.video)}${t('Video')}</button>`:''}<button data-cm="add">${SV(ICONS.adduser)}${t('Add')}</button>${CALL.video||group?`<button data-cm="filters" class="${CALL.filters?'on':''}">${SV(ICONS.filters)}${t('Filters')}</button><button data-cm="flip">${SV(ICONS.flip)}</button>`:''}<button data-cm="report">${SV(ICONS.flag)}${t('Report')}</button></div>`:''}
   <div class="cbar">${btn('cMute',SV(CALL.muted?ICONS.micoff:ICONS.mic),t('Mute'),CALL.muted)}${btn('cSpk',SV(ICONS.speaker),t('Speaker'),CALL.spk)}${btn('cEnd',HANG,t('Hang up'),false,'end')}${btn('cMore',SV(ICONS.plus),t('More'),CALL.menu)}</div>
   <div class="cdemo">${t('Demo: real calls work in the iPhone app.')}</div>`;
  hydrate(c);const v=$('#selfV');if(v&&CALL.stream){v.srcObject=CALL.stream;v.play().catch(()=>{});v.classList.add('live');}
  $('#cMute').onclick=()=>{CALL.muted=!CALL.muted;renderCall();};$('#cSpk').onclick=()=>{CALL.spk=!CALL.spk;renderCall();};
  $('#cEnd').onclick=endCall;$('#cMore').onclick=()=>{CALL.menu=!CALL.menu;renderCall();};
  c.querySelectorAll('[data-cm]').forEach(b=>b.onclick=()=>{const k=b.dataset.cm;
    if(k==='video'){CALL.video=true;CALL.menu=false;camOn();renderCall();}
    if(k==='filters'){CALL.filters=!CALL.filters;CALL.menu=false;renderCall();}
    if(k==='flip')toast(t('Demo: real calls work in the iPhone app.'));
    if(k==='report'){CALL.menu=false;renderCall();toast(t('Thanks — our team will review this account'));}
    if(k==='add')addToCall();});
  const ring=$('#callRing');if(ring){bindRing(ring,f=>{CALL.filter=f.k;const s=c.querySelector('.selfPip,.tile.me');if(s){s.querySelectorAll('.ov').forEach(x=>x.remove());s.insertAdjacentHTML('beforeend',overlayHTML(f.k));const vv=s.querySelector('video');if(vv)vv.style.filter=f.css||'none';}c.querySelector('.fname').textContent=fName(f);});
    const on=ring.querySelector('.fc.on');if(on)ring.scrollLeft=on.offsetLeft-ring.clientWidth/2+on.offsetWidth/2;}}
function addToCall(){const max=CALL.host?32:8;const can=Object.keys(USERS).filter(x=>isFriend(x)&&!CALL.people.includes(x));
  openSheet(`<h3>${t('Add to the call')}</h3><p class="muted" style="margin:0 0 6px;font-size:13px">${t('Up to 8 people · up to 32 when a Gold member starts the call')}</p>${can.map(x=>`<button class="pick" data-addc="${x}">${avHTML(x,42)}<b>${USERS[x].name}</b><span>${SV(ICONS.plus,'style="width:18px;height:18px"')}</span></button>`).join('')}`);
  $('#sheet').querySelectorAll('[data-addc]').forEach(b=>b.onclick=()=>{if(CALL.people.length+1>=max){toast(t('Limit reached')+' · '+max);return;}CALL.people.push(b.dataset.addc);CALL.menu=false;closeSheet();renderCall();});}

/* ====================== SNAP CAMERA (photo + filters + view once) ====================== */
const SNAP={to:null,stream:null,img:null,filter:'none',once:false};
async function openSnap(to){SNAP.to=to;SNAP.img=null;SNAP.filter='none';SNAP.once=false;$('#snap').classList.add('on');renderSnap();
  try{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)throw 0;SNAP.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});const v=$('#snapV');if(v){v.srcObject=SNAP.stream;await v.play().catch(()=>{});}renderSnap();}
  catch(_){SNAP.stream=null;renderSnap();}}
function closeSnap(){if(SNAP.stream){SNAP.stream.getTracks().forEach(x=>x.stop());SNAP.stream=null;}$('#snap').classList.remove('on');$('#snap').innerHTML='';}
function renderSnap(){const s=$('#snap');const f=filterById(SNAP.filter);const r=roomInfo(SNAP.to);
  const media=SNAP.img?`<img class="sbase" src="${SNAP.img}" style="filter:${f.css||'none'}" alt="">`:SNAP.stream?`<video id="snapV" class="sbase mirror" autoplay muted playsinline style="filter:${f.css||'none'}"></video>`:`<div class="sbase empty"><p>${t('The camera opens in the iPhone app. Choose a photo from your gallery.')}</p></div>`;
  s.innerHTML=`${media}<div class="sov">${overlayHTML(SNAP.filter)}</div>
   <button class="sx" id="snapX" aria-label="Close">${SV(ICONS.x)}</button>
   <button class="sonce ${SNAP.once?'on':''}" id="snapOnce"><span class="oc">1</span>${t('View once')}</button>
   <div class="fname">${esc(fName(f))}</div>
   ${SNAP.img?`<div class="ssend"><button class="sretake" id="snapRetake" aria-label="Retake">${SV(ICONS.x)}</button><button class="sgo" id="snapGo">${t('Send to {n}',{n:esc(firstName(r.name))})} ${SV('<path d="M4 12l16-8-6 16-2.5-6.5z"/>')}</button></div>
     <div class="fring snapRing" id="snapRing">${fringHTML(SNAP.filter)}</div>`
   :`<div class="fring snapRing withShutter" id="snapRing">${fringHTML(SNAP.filter)}</div><button class="shut" id="snapShut" aria-label="Take photo"></button>
     <div class="smodes"><button id="snapGal">${t('Gallery')}</button><span class="on">${t('Photo')}</span></div>`}`;
  const v=$('#snapV');if(v&&SNAP.stream){v.srcObject=SNAP.stream;v.play().catch(()=>{});}
  $('#snapX').onclick=closeSnap;$('#snapOnce').onclick=()=>{SNAP.once=!SNAP.once;$('#snapOnce').classList.toggle('on',SNAP.once);};
  const ring=$('#snapRing');bindRing(ring,ff=>{SNAP.filter=ff.k;const base=s.querySelector('.sbase');if(base&&base.style)base.style.filter=ff.css||'none';s.querySelector('.sov').innerHTML=overlayHTML(ff.k);s.querySelector('.fname').textContent=fName(ff);});
  const on=ring.querySelector('.fc.on');if(on)ring.scrollLeft=on.offsetLeft-ring.clientWidth/2+on.offsetWidth/2;
  const sh=$('#snapShut');if(sh)sh.onclick=async()=>{if(SNAP.stream&&v&&v.videoWidth){const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;const x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(v,0,0);SNAP.img=c.toDataURL('image/jpeg',.88);if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();}
    else{const fl=await pickFile('image/*',true);if(fl){SNAP.img=await downscale(await readFile(fl),1000,.85);renderSnap();}}};
  const g=$('#snapGal');if(g)g.onclick=async()=>{const fl=await pickFile('image/*');if(fl){SNAP.img=await downscale(await readFile(fl),1000,.85);if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();}};
  const rt=$('#snapRetake');if(rt)rt.onclick=()=>openSnap(SNAP.to);
  const go=$('#snapGo');if(go)go.onclick=sendSnap;}
async function composeSnap(){const f=filterById(SNAP.filter);const im=new Image();await new Promise(r=>{im.onload=r;im.onerror=r;im.src=SNAP.img;});
  const W0=Math.min(900,im.width||900),H0=Math.round(W0*(im.height||1200)/(im.width||900));const c=document.createElement('canvas');c.width=W0;c.height=H0;const x=c.getContext('2d');
  try{x.filter=f.css&&f.css!=='none'?f.css:'none';}catch(_){}x.drawImage(im,0,0,W0,H0);x.filter='none';
  if(f.ov&&OVL[f.ov]){const svg=OVL[f.ov].replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');const o=new Image();await new Promise(r=>{o.onload=r;o.onerror=r;o.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
    const w=W0*.5,h=w*(o.height/o.width||.5);const y={crown:.08,puppy:.06,hat:.04,hearts:.06,sparkles:.06,glasses:.3,earrings:.42,makeup:.4}[f.ov]||.1;try{x.drawImage(o,(W0-w)/2,H0*y,w,h);}catch(_){}}
  if(f.ov==='fdate'){const d=new Date();x.fillStyle='#fff';x.beginPath();x.roundRect?x.roundRect(W0-150,24,126,84,20):x.rect(W0-150,24,126,84);x.fill();x.fillStyle='#111';x.font='800 40px Inter,system-ui';x.textAlign='center';x.fillText(String(d.getDate()),W0-87,72);x.font='700 16px Inter,system-ui';x.fillText(d.toLocaleDateString(S.lang||'en',{month:'short'}).toUpperCase()+' · '+W[S.weather].t+'°',W0-87,96);}
  if(f.ov==='flogo'){x.fillStyle='rgba(255,255,255,.9)';x.font='800 26px Inter,system-ui';x.fillText(S.vip?'GOLD STYLE':'R-STYLE',28,H0-30);}
  return c.toDataURL('image/jpeg',.8);}
async function sendSnap(){const go=$('#snapGo');go.disabled=true;go.innerHTML='<span class="spin"></span>';
  let img=SNAP.img;try{img=await composeSnap();}catch(_){}
  if(AI&&AI_IMG){try{const r=await AI.json(`Does this image contain nudity, sexual content, graphic violence or gore? It will be sent in a chat on an app used by teenagers. Return JSON only: {"safe":true|false}`,{images:[dataUrlToBlob(img)],modelTier:'quick'});
    if(r&&r.safe===false){closeSnap();openSheet(`<div class="verdict bad"><span></span><span><b>${t('Photo blocked')}</b><br>${t('This image is not allowed on R-Style.')}</span></div>`);return;}}catch(_){}}
  const f=filterById(SNAP.filter);const to=SNAP.to,once=SNAP.once;closeSnap();
  pushMsg(to,{f:'me',img:await downscale(img,560,.78),once,filter:f.k!=='none'?fName(f):null});}

/* ====================== STORIES: cube between friends ====================== */
let cubeDir=0;
const _next=next,_prevSeg=prevSeg;
next=function(){const list=segs(ST.owners[ST.o]);if(ST.s>=list.length-1&&ST.o<ST.owners.length-1)cubeDir=1;_next();};
prevSeg=function(){if(ST.s===0&&ST.o>0)cubeDir=-1;_prevSeg();};
const _loadSeg=loadSeg;
loadSeg=function(){const b=$('#stBody');let ghost=null;
  if(cubeDir&&b&&b.animate){ghost=b.cloneNode(true);ghost.id='';ghost.classList.add('cubeOut');b.parentNode.insertBefore(ghost,b);}
  _loadSeg();
  if(ghost){const d=cubeDir;const opt={duration:520,easing:'cubic-bezier(.45,.05,.3,1)',fill:'both'};
    ghost.style.transformOrigin=d>0?'right center':'left center';b.style.transformOrigin=d>0?'left center':'right center';
    const a=ghost.animate([{transform:'translateX(0) rotateY(0deg)'},{transform:`translateX(${d>0?'-100%':'100%'}) rotateY(${d>0?-90:90}deg)`}],opt);
    const k=b.animate([{transform:`translateX(${d>0?'100%':'-100%'}) rotateY(${d>0?90:-90}deg)`},{transform:'translateX(0) rotateY(0deg)'}],opt);
    ST.paused=true;a.onfinish=()=>{ghost.remove();};k.onfinish=()=>{k.cancel();b.style.transformOrigin='';ST.paused=false;ST.last=performance.now();};}
  cubeDir=0;};

/* ====================== SHORTS: Gold ad every few posts for free users (skip after 3 s) ====================== */
const _feedList=feedList;
feedList=function(){const l=_feedList();if(S.vip||l.length<7)return l;const out=[];l.forEach((p,i)=>{out.push(p);if(i>=5&&(i-5)%7===0&&i<l.length-1)out.push({id:'__ad'+i,ad:true});});return out;};
const _renderFeed=renderFeed;
renderFeed=function(){_renderFeed();const c=challengeToday();
  $$('#feed .short').forEach(el=>{if(!String(el.dataset.id).startsWith('__ad'))return;
    el.className='short adShort';el.innerHTML=`<div class="adGlow"></div><span class="adTag">${SV(ICONS.crown,'fill="currentColor"')}${t('Gold Style · sponsored')}</span>
      <div class="adLooks">${['u3','u1','u2'].map((u,i)=>`<span style="background:${GRADS[(i*3)%GRADS.length]}">${ic(['dress','top','outer'][i])}</span>`).join('')}</div>
      <div class="adTxt"><small>${t('DAILY CHALLENGE')}</small><b>${t('Your friends are playing «{x}».',{x:esc(t(c.theme))})}</b><p>${t('A theme every day chosen by Ruby. For Gold members.')}</p></div>
      <button class="adGo" data-adgo="1">${t('Try Gold · 7 days free')}</button><div class="adSkip"><span>${t('You can skip in {n}',{n:'<i>3</i>'})}</span></div>`;});
  hydrate($('#feed'));watchAds();};
let adObs=null;const adSeen=new Set();
function watchAds(){if(adObs)adObs.disconnect();if(!('IntersectionObserver' in window))return;const feed=$('#feed');
  adObs=new IntersectionObserver(es=>es.forEach(en=>{const el=en.target;const id=el.dataset.id;if(!en.isIntersecting||en.intersectionRatio<.85||adSeen.has(id))return;adSeen.add(id);
    feed.classList.add('locked');let n=3;const sk=el.querySelector('.adSkip');
    const tick=()=>{if(n<=0){feed.classList.remove('locked');sk.innerHTML=`<span>${t('Swipe up to skip')}</span>`;sk.classList.add('done');return;}sk.innerHTML=`<span>${t('You can skip in {n}',{n:`<i>${n}</i>`})}</span>`;n--;setTimeout(tick,1000);};tick();}),{root:feed,threshold:[.85]});
  feed.querySelectorAll('.adShort').forEach(el=>adObs.observe(el));}
document.addEventListener('click',e=>{if(e.target.closest('[data-adgo]'))openVip('shorts');});

/* ====================== RUBY: short answers, bigger text, modest styles ====================== */
const RUBY9=RUBY.replace('Keep answers under 110 words, max 1 emoji.','Keep answers SHORT: 2 short sentences, under 40 words, max 1 emoji.')+` You know modest dress codes (Jewish tzniut, Muslim hijab, Christian, Sikh, Hindu and others) and respect them; never guess or mention someone's religion.`;
const _userCtx=userCtx;
userCtx=function(){let c=_userCtx();if(S.modest==='always')c+='\nThe user dresses modestly: ONLY suggest covered outfits (long skirts or loose trousers, long sleeves, high neckline; respect headwear).';else if(S.modest==='sometimes')c+='\nThe user sometimes dresses modestly: offer a covered option when relevant.';return c;};
const MODEST_RX=/(long|maxi|longue|ארוכ|طويل|abaya|hijab|tichel|foulard|scarf|kippa|כיפה|מטפחת|حجاب|skirt|jupe|חצאית|تنورة)/i;
function modestSignal(){const p=me();if((p.styles||[]).includes('Modest'))return true;const it=S.wardrobe;if(it.length<3)return false;const m=it.filter(i=>MODEST_RX.test(i.name)).length;const shortish=it.filter(i=>/short|mini|crop|קצר|قصير/i.test(i.name)).length;return m>=3&&m>it.length*.5&&!shortish;}
const _renderRuby=renderRuby;
renderRuby=function(){
  if(!S.modestAsked&&modestSignal()&&!S.ruby.some(m=>m.modestQ)){S.ruby.push({role:'assistant',text:t('You wear mostly **long** clothes. Shall I keep this style?'),modestQ:1});save();}
  _renderRuby();
  const q=S.ruby.findIndex(m=>m.modestQ);
  if(q>=0&&!S.modestAsked){const box=$('#rubyMsgs');box.insertAdjacentHTML('beforeend',`<div class="mq">${[['always','Yes'],['sometimes','Sometimes'],['no','No thanks']].map(([k,l])=>`<button data-mq="${k}">${t(l)}</button>`).join('')}</div>`);box.scrollTop=box.scrollHeight;}};
$('#rubyMsgs').addEventListener('click',e=>{const b=e.target.closest('[data-mq]');if(!b)return;S.modest=b.dataset.mq;S.modestAsked=true;
  S.ruby.push({role:'user',text:b.textContent});S.ruby.push({role:'assistant',text:t('Noted! Changeable in Settings › My style.')});S.today=null;S.week=null;save();renderRuby();});
/* Ruby uses the short prompt */
$('#rubyForm').onsubmit=async e=>{e.preventDefault();if(rubyBusy)return;
  const inp=$('#rubyInput');const text=inp.value.trim();if(!text&&!rubyImg)return;
  if(!AI){toast(t('Ruby works when the app is opened in Claude.'));return;}
  if(rubyLeft()<=0){toast(t('No free questions left today'));openVip('ruby');return;}
  const img=rubyImg;rubyImg=null;inp.value='';
  S.ruby.push({role:'user',text:text||'…',img:img?await downscale(img,360,.7):null});if(!S.vip)S.rubyDay.n++;save();renderRuby();
  const box=$('#rubyMsgs');const d=document.createElement('div');d.className='m them';d.innerHTML='<span class="spin"></span>';box.appendChild(d);box.scrollTop=box.scrollHeight;
  rubyBusy=true;$('#rubySend').disabled=true;
  const hist=S.ruby.filter(m=>!m.modestQ).slice(-10).map(m=>({role:m.role,content:m.text+(m.img?' [photo attached]':'')}));while(hist.length&&hist[0].role!=='user')hist.shift();
  hist[0]={role:'user',content:`${RUBY9}\n\n${userCtx()}\n\n---\n${hist[0].content}`};
  try{const opts={cache:false,onText:({text})=>{d.innerHTML=md(text);box.scrollTop=box.scrollHeight;}};if(img&&AI_IMG)opts.images=[dataUrlToBlob(img)];
    const r=await AI(hist,opts);S.ruby.push({role:'assistant',text:r.text||'…'});if(S.ruby.length>40)S.ruby=S.ruby.slice(-40);save();
  }catch(err){d.textContent=aiErr(err);if(!S.vip)S.rubyDay.n=Math.max(0,S.rubyDay.n-1);S.ruby.pop();save();}
  rubyBusy=false;$('#rubySend').disabled=false;if(current==='ruby')renderRuby();};

/* ====================== WARDROBE: accessories (incl. head accessories) ====================== */
[{id:'s11',name:'Silk scarf',cat:'Accessory',bg:'#f6f1ea',color:'#c8a27a',colorName:'beige',warmth:'any'},
 {id:'s12',name:'Cap',cat:'Accessory',bg:'#ececef',color:'#111111',colorName:'black',warmth:'any'},
 {id:'s13',name:'Gold necklace',cat:'Accessory',bg:'#fbf5e6',color:'#d4af37',colorName:'gold',warmth:'any'},
 {id:'s14',name:'Sunglasses',cat:'Accessory',bg:'#ececef',color:'#1f1f1f',colorName:'black',warmth:'any'},
 {id:'s15',name:'Leather belt',cat:'Accessory',bg:'#eadfd6',color:'#5b3a23',colorName:'brown',warmth:'any'}].forEach(x=>{if(!SAMPLE_WARDROBE.some(y=>y.id===x.id))SAMPLE_WARDROBE.push(x);});
/* translate sample item names */
const _allItems=allItems;allItems=function(){return _allItems().map(i=>i.id&&i.id.startsWith('s')&&window.I18N&&(window.I18N[S.lang]||{})[i.name]?Object.assign({},i,{name:t(i.name)}):i);};

/* ====================== SETTINGS: visible log out + my style ====================== */
const _renderSettings=renderSettings;
renderSettings=function(){_renderSettings();const body=$('#setBody');
  const old=$('#logout');if(old)old.closest('.srow').remove();
  const act=[...body.querySelectorAll('.sect')].find(x=>x.textContent===t('Account actions'));
  const style=`<div class="sect">${t('My style')}</div><div class="srow"><div class="l"><b>${t('Modest outfits')}</b></div><select class="sel" id="selModest">${[['no','Never'],['sometimes','Sometimes'],['always','Always']].map(([k,l])=>`<option value="${k}" ${(S.modest||'no')===k?'selected':''}>${t(l)}</option>`).join('')}</select></div>`;
  if(act)act.insertAdjacentHTML('beforebegin',style);
  const del=$('#delAcc');del.insertAdjacentHTML('beforebegin',`<button class="btn sm logoutBtn" id="logout9">${t('Log out')}</button>`);
  $('#selModest').onchange=e=>{S.modest=e.target.value;S.modestAsked=true;S.today=null;S.week=null;save();};
  $('#logout9').onclick=()=>{openSheet(`<h3>${t('Log out of R-Style?')}</h3><button class="btn primary" id="loYes" style="margin-top:12px">${t('Log out')}</button><button class="btn" id="loNo" style="margin-top:6px">${t('Cancel')}</button>`);
    $('#loYes').onclick=()=>{S.profile=null;save();location.reload();};$('#loNo').onclick=closeSheet;};};

/* perks list: voice messages are for everyone now; daily challenge is Gold */
(function(){const _applyLang=applyLang;applyLang=function(){_applyLang();$('#vipList').innerHTML=[['avatar','Full 3D avatar: all rooms, hairstyles, makeup and moves'],['calendar','Ruby plans your whole week'],['trend','Monthly trend report'],['bag','What\'s missing in my wardrobe'],['sparkle','Unlimited Ruby'],['flame','DAILY CHALLENGE'],['filters','Gold filter'],['crown','Gold profile + crown'],['trophy','Monthly contests']].map(([e,s])=>`<li>${ic(e)}${t(s)}</li>`).join('');};})();

/* scrolling areas for new screens */
document.addEventListener('touchmove',e=>{if(e.target.closest('#ciBody,.fring,.thGrid,#peek .pkMsgs'))e.stopPropagation();},{capture:true,passive:true});

/* ---------- start v9 ---------- */
document.querySelectorAll('i[data-ic]').forEach(el=>{el.innerHTML=SV(ICONS[el.dataset.ic]||ICONS.star);});applyLang();if(current)show(current);

/* ====================== v9.2: open chat = small dot that grows; close = shrinks back to a dot ====================== */
let roomOrigin=null;
function rowDot(id){const el=document.querySelector(`.crow[data-room="${CSS.escape(id)}"] .av`);if(!el)return null;const r=el.getBoundingClientRect(),a=$('#app').getBoundingClientRect();if(!r.width)return null;return {x:r.left-a.left+r.width/2,y:r.top-a.top+r.height/2};}
const _openRoom9=openRoom;
openRoom=function(id){const from=current==='chat'?rowDot(id):null;_openRoom9(id);const room=$('#room');
  roomOrigin=from||{x:$('#app').clientWidth/2,y:$('#app').clientHeight/2};
  if(room.animate){const {x,y}=roomOrigin;room.animate([{clipPath:`circle(6px at ${x}px ${y}px)`},{clipPath:`circle(150% at ${x}px ${y}px)`}],{duration:560,easing:'cubic-bezier(.6,0,.25,1)'});}};
function closeRoom(){const room=$('#room');const id=roomId;
  room.classList.add('closing');show('chat');const to=rowDot(id)||roomOrigin||{x:$('#app').clientWidth/2,y:$('#app').clientHeight/2};
  if(!room.animate){room.classList.remove('closing');return;}
  const a=room.animate([{clipPath:`circle(150% at ${to.x}px ${to.y}px)`,opacity:1},{clipPath:`circle(7px at ${to.x}px ${to.y}px)`,opacity:1,offset:.82},{clipPath:`circle(0px at ${to.x}px ${to.y}px)`,opacity:0}],{duration:430,easing:'cubic-bezier(.4,0,.2,1)'});
  a.onfinish=()=>room.classList.remove('closing');}
$('#roomBack').onclick=closeRoom;
/* ads in Shorts: rare (after 6 looks, then every 15) */
feedList=function(){const l=_feedList();if(S.vip||l.length<7)return l;const out=[];l.forEach((p,i)=>{out.push(p);if(i>=5&&(i-5)%15===0&&i<l.length-1)out.push({id:'__ad'+i,ad:true});});return out;};
/* swipe the chat sideways (left or right) to leave it */
(function(){const room=$('#room');let x0=null,y0=0,dx=0,horiz=null;
  room.addEventListener('touchstart',e=>{if(e.target.closest('.composer,input,.roomHead button'))return;const t0=e.touches[0];x0=t0.clientX;y0=t0.clientY;dx=0;horiz=null;},{passive:true});
  room.addEventListener('touchmove',e=>{if(x0==null)return;const t0=e.touches[0];dx=t0.clientX-x0;const dy=t0.clientY-y0;
    if(horiz===null&&(Math.abs(dx)>10||Math.abs(dy)>10))horiz=Math.abs(dx)>Math.abs(dy)*1.3;
    if(horiz){room.style.transform=`translateX(${dx*.85}px)`;room.style.transition='none';}},{passive:true});
  room.addEventListener('touchend',()=>{if(x0==null)return;x0=null;
    if(horiz&&Math.abs(dx)>80){slideOut(dx);}
    else{room.style.transition='transform .25s';room.style.transform='';setTimeout(()=>room.style.transition='',260);}});})();

/* swipe exit = page change: the chat leaves on one side, the list comes in from the other side */
function slideOut(dx){const room=$('#room');const dir=dx>0?1:-1;const W=$('#app').clientWidth;
  room.classList.add('closing');room.style.transform='';show('chat');const list=$('#chat');
  if(!room.animate){room.classList.remove('closing');return;}
  const opt={duration:340,easing:'cubic-bezier(.25,.8,.3,1)',fill:'both'};
  const a=room.animate([{transform:`translateX(${dx*.85}px)`},{transform:`translateX(${dir*W}px)`}],opt);
  const b=list.animate([{transform:`translateX(${-dir*W}px)`},{transform:'translateX(0)'}],opt);
  a.onfinish=()=>{room.classList.remove('closing');a.cancel();};b.onfinish=()=>b.cancel();}

/* nav bar: the dark circle slides from one button to the other */
(function(){const nav=$('#nav');const pill=document.createElement('span');pill.className='npill';nav.prepend(pill);
  let shown=false;
  window.movePill=function(){const on=nav.querySelector('button.on');if(!nav.classList.contains('show')||!on){pill.style.opacity=0;shown=false;return;}
    const x=on.offsetLeft,w=on.offsetWidth;if(!shown){pill.style.transition='none';}
    pill.style.width=w+'px';pill.style.transform=`translateX(${x}px)`;pill.style.opacity=1;
    if(!shown){void pill.offsetWidth;pill.style.transition='';shown=true;}};
  const _show=show;show=function(id){if(NAV.includes(id)){nav.classList.add('show');$$('#nav [data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===id));movePill();}try{_show(id);}finally{movePill();}};
  window.addEventListener('resize',()=>{shown=false;movePill();});
  movePill();})();

/* ====================== v9.5: friends can call; Subscriptions row like YouTube ====================== */
/* friends = people you follow (they follow back in the demo). Your first friends are seeded once. */
if(!S.seedFollow){['u1','u2','u3'].forEach(u=>{if(!S.following[u]){S.following[u]=true;USERS[u].followers++;}});S.seedFollow=true;save();}
isFriend=function(id){return !!USERS[id]&&!!S.following[id]&&!S.blocked[id];};
const _toggleFollow=toggleFollow;
toggleFollow=function(uid){_toggleFollow(uid);if(S.following[uid])toast(t('You are now friends with {n}: you can call them',{n:firstName(USERS[uid].name)}));if(current==='shorts'&&feedMode==='following')renderSubs();};
/* subscriptions row */
let subSel=null;
const _feedList95=feedList;
feedList=function(){let l=_feedList95();if(feedMode==='following'){l=l.filter(p=>!p.ad);if(subSel)l=l.filter(p=>p.u===subSel);}return l;};
function renderSubs(){const row=$('#subsRow');const subs=Object.keys(USERS).filter(u=>S.following[u]&&!S.blocked[u]);
  row.hidden=feedMode!=='following';if(row.hidden)return;
  if(subSel&&!subs.includes(subSel))subSel=null;
  row.innerHTML=`<button class="sub all ${subSel?'':'on'}" data-sub=""><span class="ring"><span class="in">${SV(ICONS.group)}</span></span><small>${t('All')}</small></button>`+
    subs.map(u=>`<button class="sub ${subSel===u?'on':''}" data-sub="${u}"><span class="ring">${avHTML(u,52)}</span><small>${esc(firstName(USERS[u].name))}</small></button>`).join('')+
    (subs.length?'':`<span class="subsEmpty">${t('Follow creators in “For you” to see their looks here.')}</span>`);}
$('#subsRow').onclick=e=>{const b=e.target.closest('[data-sub]');if(!b)return;subSel=b.dataset.sub||null;renderFeed();};
const _renderFeed95=renderFeed;
renderFeed=function(){_renderFeed95();renderSubs();$('#feed').classList.toggle('withSubs',feedMode==='following');};
(function(){const T={'All':['Tous','הכל','الكل'],'You are now friends with {n}: you can call them':['Tu es ami avec {n} : tu peux l\'appeler','את/ה חבר/ה של {n}: אפשר להתקשר','أنت الآن صديق {n}: يمكنك الاتصال به']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* ====================== v9.6: Subscriptions = grid of small videos (like YouTube), tap a circle = that person's videos, newest first ====================== */
let subView='grid',subList=[],subStart=0;
function subVideos(){const subs=Object.keys(USERS).filter(u=>S.following[u]&&!S.blocked[u]&&(!subSel||u===subSel));const out=[];
  subs.forEach((u,ui)=>{const base=SAMPLE_SHORTS.filter(s=>s.u===u);if(!base.length)return;const n=subSel?9:5;
    for(let k=0;k<n;k++){const b=base[k%base.length];out.push(Object.assign({},b,{id:b.id+'~'+k,g:(b.g+k)%GRADS.length,look:b.look.slice(k%2).concat(b.look.slice(0,k%2)),likes:Math.round(b.likes*(1-k*.08)),ts:Date.now()-((ui*5+k*9+1)*3.3)*36e5}));}});
  return out.sort((a,b)=>b.ts-a.ts);}
function ago(ts){const h=Math.max(1,Math.round((Date.now()-ts)/36e5));return h<24?t('{n} h ago',{n:h}):t('{n} d ago',{n:Math.round(h/24)});}
const _feedList96=feedList;
feedList=function(){if(feedMode==='following'){return subView==='play'?subList.slice(subStart):[];}return _feedList96();};
const _renderFeed96=renderFeed;
renderFeed=function(){const feed=$('#feed');
  if(feedMode==='following'&&subView==='grid'){$$('.shortsTop .tab').forEach(b=>b.classList.toggle('on',b.dataset.mode===feedMode));renderSubs();
    subList=subVideos();feed.classList.add('gridMode');feed.classList.remove('withSubs');
    const who=subSel?USERS[subSel]:null;
    feed.innerHTML=`<div class="subHead"><b>${who?esc(who.name):t('All my subscriptions')}</b><small>${t('Newest first')}</small></div>`+
      (subList.length?`<div class="vgrid9">${subList.map((p,i)=>`<button class="vcell" data-vi="${i}" style="background:${GRADS[p.g||0]}"><span class="vt">${ago(p.ts)}</span><span class="vl">${(p.look||[]).slice(0,3).map(x=>ic(EMO2IC[x]||'top')).join('')}</span><span class="vb">${who?'':avHTML(p.u,22)}<span>${SV(ICONS.play)}${fmt(p.likes)}</span></span></button>`).join('')}</div>`
      :`<div class="emptyFeed"><b>${t('No looks here yet')}</b><span>${t('Follow creators in “For you” to see their looks here.')}</span></div>`);
    feed.scrollTop=0;return;}
  feed.classList.remove('gridMode');_renderFeed96();
  if(feedMode==='following'&&subView==='play'){$('#subsRow').hidden=true;feed.classList.remove('withSubs');
    if(!$('#subBack')){$('#shorts').insertAdjacentHTML('beforeend',`<button class="subBack" id="subBack" aria-label="Back">${SV('<path d="M15 5l-7 7 7 7"/>')}</button>`);$('#subBack').onclick=()=>{subView='grid';renderFeed();};}
    $('#subBack').hidden=false;}else{const sb=$('#subBack');if(sb)sb.hidden=true;}};
$('#feed').addEventListener('click',e=>{const c=e.target.closest('[data-vi]');if(!c)return;subStart=+c.dataset.vi;subView='play';renderFeed();});
$('#subsRow').onclick=e=>{const b=e.target.closest('[data-sub]');if(!b)return;subSel=b.dataset.sub||null;subView='grid';renderFeed();};
$$('.shortsTop .tab').forEach(b=>b.addEventListener('click',()=>{subView='grid';}, true));
(function(){const T={'All my subscriptions':['Tous mes abonnements','כל המנויים שלי','كل اشتراكاتي'],'Newest first':['Du plus récent au plus ancien','מהחדש לישן','الأحدث أولًا'],'{n} h ago':['il y a {n} h','לפני {n} שע\'','قبل {n} س'],'{n} d ago':['il y a {n} j','לפני {n} ימים','قبل {n} ي']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* v9.7: Ruby = 7 free questions a day (unlimited in Gold) */
const RUBY_FREE9=7;
rubyLeft=function(){if(S.vip)return Infinity;if(S.rubyDay.d!==today())S.rubyDay={d:today(),n:0};return Math.max(0,RUBY_FREE9-S.rubyDay.n);};

/* ====================== v9.8: search people (not only your chats) ====================== */
const DIRECTORY={
  d1:{name:'Tamar Katz',handle:'tamar.k',followers:3210,following:180,score:87,color:'#0EA5E9',bio:'Minimal & beige',look:['👚','👖','👟']},
  d2:{name:'Omar Haddad',handle:'omar.fits',followers:8420,following:240,score:89,color:'#16A34A',bio:'Street & sneakers',look:['🧢','👕','👟']},
  d3:{name:'Léa Martin',handle:'lea.paris',followers:15400,following:310,score:93,color:'#BE185D',bio:'Parisian chic',look:['🧥','👗','👠']},
  d4:{name:'Daniel Levy',handle:'dan.classic',followers:2210,following:95,score:84,color:'#7C3AED',bio:'Smart casual',look:['👔','👖','👞']},
  d5:{name:'Noa Ben Ami',handle:'noa.modest',followers:6120,following:400,score:90,color:'#D97706',bio:'Modest & elegant',look:['🧣','🥻','👡']},
  d6:{name:'Yasmine Saleh',handle:'yasmine.style',followers:11900,following:260,score:91,color:'#DB2777',bio:'Colorful everyday looks',look:['👚','👗','👟']}};
function adoptUser(id){if(USERS[id]||!DIRECTORY[id])return;const d=DIRECTORY[id];USERS[id]={name:d.name,handle:d.handle,followers:d.followers,following:d.following,score:d.score,color:d.color,bio:d.bio};
  if(!SAMPLE_SHORTS.some(s=>s.u===id))SAMPLE_SHORTS.push({id:'x_'+id,u:id,look:d.look,cap:d.bio,likes:Math.round(d.followers/6),g:Object.keys(DIRECTORY).indexOf(id)%GRADS.length,score:d.score,tags:[]});
  (S.adopted=S.adopted||{})[id]=true;save();}
Object.keys(S.adopted||{}).forEach(adoptUser);
const _renderChatList98=renderChatList;
renderChatList=function(){_renderChatList98();const q=($('#chatSearch').value||'').trim().toLowerCase().replace(/^@/,'');if(!q)return;
  const all={...DIRECTORY,...USERS};const hits=Object.keys(all).filter(id=>!S.blocked[id]&&(all[id].name.toLowerCase().includes(q)||all[id].handle.includes(q)));
  const box=$('#convs');box.insertAdjacentHTML('beforeend',`<div class="pplHead">${t('People')}</div>`+(hits.length?hits.map(id=>{const u=all[id];const on=!!S.following[id];
    return `<div class="ppl"><button class="pplWho" data-pp="${id}"><span class="av" style="width:46px;height:46px;font-size:16px;background:${u.color}">${initials(u.name)}</span><span><b>${esc(u.name)}</b><small>@${esc(u.handle)} · ${fmt(u.followers)} ${t('Followers')}</small></span></button><button class="chip ${on?'':'on'}" data-ppf="${id}">${on?t('Followed'):t('Follow')}</button></div>`;}).join(''):`<p class="muted" style="text-align:center">${t('No results.')}</p>`));
  const nr=box.querySelector(':scope > p.muted');if(nr&&hits.length&&!box.querySelector('.crow'))nr.remove();};
$('#convs').addEventListener('click',e=>{const f=e.target.closest('[data-ppf]');if(f){e.stopPropagation();const id=f.dataset.ppf;adoptUser(id);toggleFollow(id);renderChatList();return;}
  const w=e.target.closest('[data-pp]');if(w){e.stopPropagation();adoptUser(w.dataset.pp);openProfile(w.dataset.pp);}},true);
$('#chatSearch').setAttribute('placeholder',t('Search a name or @username'));
(function(){const T={'Followed':['Abonné','עוקב/ת','متابَع'],'People':['Personnes','אנשים','أشخاص'],'Search a name or @username':['Cherche un nom ou un @pseudo','חפש שם או @שם משתמש','ابحث عن اسم أو @اسم مستخدم']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
$('#chatSearch').oninput=()=>renderChatList();

/* ====================== v9.9: birthday instead of age ====================== */
ICONS.cake='<path d="M4 21h16v-7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M4 16c1.5 1 3 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0M12 12V8M8 12V9M16 12V9"/><path d="M12 5.5c.8 0 1.2-.7 1.2-1.3S12 2 12 2s-1.2 1.6-1.2 2.2.4 1.3 1.2 1.3z"/>';
function ageFrom(b){if(!b)return NaN;const d=new Date(b),n=new Date();let a=n.getFullYear()-d.getFullYear();const m=n.getMonth()-d.getMonth();if(m<0||(m===0&&n.getDate()<d.getDate()))a--;return a;}
function mmdd(b){return b?String(b).slice(5,10):'';}
function isBday(b){return !!b&&mmdd(b)===today().slice(5,10);}
/* sign-up: date of birth */
$('#suAge').oninput=e=>{D.birth=e.target.value;const a=ageFrom(D.birth);D.age=isNaN(a)?'':String(a);$('#ageErr').textContent=(D.birth&&(a<13||a>99))?t('You must be 13 or older.'):'';validate();};
(function(){const old=$('#suNext').onclick;$('#suNext').onclick=function(){old();if(S.profile&&D.birth&&!S.profile.birth){S.profile.birth=D.birth;S.profile.age=ageFrom(D.birth);save();bdayCheck();}};})();
/* demo: one friend has a birthday today */
USERS.u3.birth='2010-'+today().slice(5,10);
function friendBday(id){const u=USERS[id];return u&&isBday(u.birth);}
/* birthday gift */
function bdayCheck(){const p=me();if(!p.username)return;
  if(S.bdayVip&&S.bdayVip!==today()){S.vip=false;S.bdayVip=null;save();applyTheme();}
  if(!isBday(p.birth))return;
  if(!S.vip){S.vip=true;S.bdayVip=today();if(!S.accent||S.accent==='#E11D2E')S.accent='#D4AF37';save();applyTheme();}
  if(S.bdayShown!==today()){S.bdayShown=today();save();setTimeout(showBday,600);}}
function showBday(){const gift=S.bdayVip===today()?t('Your gift: Gold Style all day long!'):t('Your gift: a birthday filter and a cake badge on your profile.');
  const fx=document.createElement('div');fx.id='bdayFx';fx.innerHTML=`<div class="bconf">${Array.from({length:40},(_,i)=>`<i style="left:${Math.random()*100}%;animation-delay:${Math.random()*1.2}s;background:${['#E11D2E','#D4AF37','#7C3AED','#0EA5E9','#16A34A'][i%5]}"></i>`).join('')}</div>
    <div class="bcard">${SV(ICONS.cake)}<h2>${t('Happy birthday {u}!',{u:'@'+esc(me().username)})}</h2><p>${gift}</p><button class="btn primary" id="bdayOk">${t('Thank you!')}</button></div>`;
  $('#app').appendChild(fx);$('#bdayOk').onclick=()=>{fx.remove();if(current)show(current);};}
/* cake badge on my profile + friends' rows */
const _renderMe99=renderMe;renderMe=function(){_renderMe99();if(isBday(me().birth))$('#meHandle').insertAdjacentHTML('beforeend',` <span class="cakeB">${SV(ICONS.cake)}</span>`);};
const _renderChatList99=renderChatList;renderChatList=function(){_renderChatList99();$$('#convs .crow[data-room]').forEach(r=>{if(friendBday(r.dataset.room)){const b=r.querySelector('.t b');if(b&&!b.querySelector('.cakeB'))b.insertAdjacentHTML('beforeend',` <span class="cakeB">${SV(ICONS.cake)}</span>`);const sm=r.querySelector('.t small');if(sm){sm.textContent=t('Birthday today! Wish them a happy birthday');sm.className='strong';}}});};
/* birthday filter (on your birthday) */
FILTERS.push({k:'bday',n:'Birthday',ov:'bday'});
OVL.bday='<svg viewBox="0 0 120 70"><g><ellipse cx="22" cy="22" rx="12" ry="15" fill="#E11D2E"/><path d="M22 37v30" stroke="#fff" stroke-width="1.5"/><ellipse cx="98" cy="20" rx="12" ry="15" fill="#D4AF37"/><path d="M98 35v30" stroke="#fff" stroke-width="1.5"/><ellipse cx="60" cy="14" rx="10" ry="13" fill="#7C3AED"/><path d="M60 27v20" stroke="#fff" stroke-width="1.5"/></g></svg>';
const _fringHTML=fringHTML;fringHTML=function(sel){let h=_fringHTML(sel);if(!isBday(me().birth))h=h.replace(/<button class="fc[^"]*" data-f9="bday"[\s\S]*?<\/button>/,'');return h;};
/* contact info: birthday (day + month only) */
const _openContact99=openContact;openContact=function(id){_openContact99(id);const u=USERS[roomInfo(id).uid];if(u&&u.birth){const d=new Date('2000-'+mmdd(u.birth));$('#ciBody .ciInfo')?.insertAdjacentHTML('beforeend',`<span class="muted">${SV(ICONS.cake,'style="width:14px;height:14px;vertical-align:-2px"')} ${d.toLocaleDateString(S.lang||'en',{day:'numeric',month:'long'})}</span>`);}};
/* settings: add birthday if missing (existing accounts) */
const _renderSettings99=renderSettings;renderSettings=function(){_renderSettings99();const p=me();const acc=$('#setBody .srow');
  if(acc)acc.insertAdjacentHTML('afterend',`<div class="srow"><div class="l"><b>${t('Birthday')}</b>${p.birth?`<small class="muted">${new Date(p.birth).toLocaleDateString(S.lang||'en',{day:'numeric',month:'long',year:'numeric'})}</small>`:''}</div>${p.birth?'':`<input type="date" id="setBirth" class="sel">`}</div>`);
  const sb=$('#setBirth');if(sb)sb.onchange=e=>{const a=ageFrom(e.target.value);if(isNaN(a)||a<13||a>99){toast(t('You must be 13 or older.'));return;}S.profile.birth=e.target.value;S.profile.age=a;save();renderSettings();bdayCheck();};};
/* real subscription replaces the birthday day */
(function(){const b=$('#vipActivate');const old=b.onclick;b.onclick=function(){S.bdayVip=null;old();};})();
(function(){const T={'When is your birthday?':['C\'est quand ton anniversaire ?','מתי יום ההולדת שלך?','متى عيد ميلادك؟'],'You must be 13 or older. On your birthday you get a surprise.':['Tu dois avoir 13 ans ou plus. Le jour de ton anniversaire, tu as une surprise.','צריך להיות בן/בת 13 ומעלה. ביום ההולדת מחכה לך הפתעה.','يجب أن يكون عمرك 13 عامًا أو أكثر. في عيد ميلادك تنتظرك مفاجأة.'],
 'You must be 13 or older.':['Tu dois avoir 13 ans ou plus.','צריך להיות בן/בת 13 ומעלה.','يجب أن يكون عمرك 13 عامًا أو أكثر.'],'Birthday':['Anniversaire','יום הולדת','عيد الميلاد'],
 'Happy birthday {u}!':['Joyeux anniversaire {u} !','יום הולדת שמח {u}!','عيد ميلاد سعيد {u}!'],'Thank you!':['Merci !','תודה!','شكرًا!'],
 'Your gift: Gold Style all day long!':['Ton cadeau : Gold Style toute la journée !','המתנה שלך: Gold Style כל היום!','هديتك: Gold Style طوال اليوم!'],
 'Your gift: a birthday filter and a cake badge on your profile.':['Ton cadeau : un filtre anniversaire et un badge gâteau sur ton profil.','המתנה שלך: פילטר יום הולדת ותג עוגה בפרופיל.','هديتك: فلتر عيد ميلاد وشارة كعكة في ملفك.'],
 'Birthday today! Wish them a happy birthday':['C\'est son anniversaire ! Souhaite-lui','יום הולדת היום! תאחל/י מזל טוב','عيد ميلاده اليوم! هنّئه']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
applyLang();bdayCheck();if(current)show(current);

/* v10.1 voice like WhatsApp: hold to record, release to send, slide up to lock, slide sideways to cancel */
(function(){const T={'Slide to cancel':['Glisse pour annuler','החלק לביטול','اسحب للإلغاء'],'Hold to record':['Maintiens pour enregistrer','החזק כדי להקליט','اضغط مطولاً للتسجيل']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`
#micBtn{touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
.composer{position:relative}.composer.floating{position:absolute}
#recBar{position:absolute;inset:0;z-index:4;display:flex;align-items:center;gap:10px;padding:0 64px 0 16px;border-radius:inherit;background:inherit;font-size:15px;color:inherit;pointer-events:none}
[dir=rtl] #recBar{padding:0 16px 0 64px}
#recBar .rd{width:10px;height:10px;border-radius:50%;background:#E5202E;animation:recBl 1s infinite}
#recBar .tm{font-variant-numeric:tabular-nums;min-width:38px}#recBar .hint{flex:1;text-align:center;opacity:.6;transition:transform .05s}
#recBar.locked{pointer-events:auto}#recBar.locked .hint{display:none}
#recBar .rb{display:none;border:0;background:none;color:inherit;font-size:15px;padding:8px;cursor:pointer;width:40px;height:40px}#recBar .rb svg{width:22px;height:22px}#recBar .rb.del{margin-inline-start:auto;margin-inline-end:52px}#recBar.locked .rb{display:block}
#recBar .rb.go{position:absolute;right:6px;width:44px;height:44px;border-radius:50%;background:#E5202E;color:#fff;display:none}[dir=rtl] #recBar .rb.go{right:auto;left:6px}#recBar.locked .rb.go{display:grid;place-items:center}
#recLock{position:absolute;z-index:5;bottom:64px;width:40px;height:76px;border-radius:20px;background:rgba(255,255,255,.9);color:#111;box-shadow:0 6px 20px rgba(0,0,0,.18);display:flex;flex-direction:column;align-items:center;justify-content:space-around;font-size:16px;transition:transform .05s}
#recLock .ar{font-size:12px;opacity:.6;animation:recUp 1.2s infinite}
#micBtn.recording{position:relative;z-index:6;transform:scale(1.5);background:#E5202E!important;color:#fff!important;border-radius:50%}
@keyframes recBl{50%{opacity:.2}}@keyframes recUp{0%{transform:translateY(6px);opacity:0}50%{opacity:1}100%{transform:translateY(-6px);opacity:0}}`;document.head.appendChild(css);})();
(function(){const mic=$('#micBtn');mic.onclick=null;
 let R=null;/* {rec,st,chunks,fake,start,timer,x0,y0,locked,done} */
 const rtl=()=>document.documentElement.dir==='rtl';
 const fmtD=s=>'0:'+String(Math.min(59,s)).padStart(2,'0');
 function ui(){const comp=mic.closest('.composer');comp.insertAdjacentHTML('beforeend',`<div id="recBar"><span class="rd"></span><span class="tm">0:00</span><span class="hint">‹ ${t('Slide to cancel')}</span><button class="rb del" type="button">${SV(ICONS.trash||'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>')}</button><button class="rb go" type="button">${SV('<path d="M4 12l16-8-6 16-2.5-6.5z"/>')}</button></div>`);
   const r=mic.getBoundingClientRect(),c=comp.getBoundingClientRect();comp.insertAdjacentHTML('beforeend',`<div id="recLock" style="left:${r.left-c.left+r.width/2-20}px">🔓<span class="ar">▲</span></div>`);
   const bg=getComputedStyle(comp).backgroundColor.match(/[\d.]+/g)||[255,255,255];const lum=(+bg[0]+ +bg[1]+ +bg[2])/3;const bar=$('#recBar');bar.style.background=lum>128?'#F4F4F6':'#1C1C1E';bar.style.color=lum>128?'#111114':'#fff';
   $('#recBar .del').onclick=()=>finish(false);$('#recBar .go').onclick=()=>finish(true);}
 function clearUi(){$('#recBar')?.remove();$('#recLock')?.remove();mic.classList.remove('recording');}
 async function begin(e){if(R)return;R={start:Date.now(),x0:e.clientX,y0:e.clientY,locked:false,done:false,chunks:[]};ui();mic.classList.add('recording');try{navigator.vibrate&&navigator.vibrate(20);}catch(_){}
   R.timer=setInterval(()=>{if(!R)return;const s=Math.floor((Date.now()-R.start)/1000);const tm=$('#recBar .tm');if(tm)tm.textContent=fmtD(s);if(s>=59)finish(true);},250);
   const cur=R;try{if(!navigator.mediaDevices||!window.MediaRecorder)throw 0;const st=await navigator.mediaDevices.getUserMedia({audio:true});
     if(R!==cur||cur.done){st.getTracks().forEach(x=>x.stop());return;}
     cur.st=st;cur.rec=new MediaRecorder(st);cur.rec.ondataavailable=ev=>cur.chunks.push(ev.data);cur.rec.start();}catch(_){cur.fake=true;}}
 function finish(send){if(!R||R.done)return;const cur=R;cur.done=true;R=null;clearInterval(cur.timer);clearUi();
   const dur=Math.max(1,Math.round((Date.now()-cur.start)/1000));
   if(send&&Date.now()-cur.start<700){send=false;toast('🎙️ '+t('Hold to record'));}
   const room=roomId;
   if(cur.rec&&cur.rec.state==='recording'){cur.rec.onstop=()=>{cur.st.getTracks().forEach(x=>x.stop());if(!send)return;const fr=new FileReader();fr.onload=()=>pushMsg(room,{f:'me',a:fr.result,dur:fmtD(dur)});fr.readAsDataURL(new Blob(cur.chunks,{type:cur.rec.mimeType}));};cur.rec.stop();}
   else{if(cur.st)cur.st.getTracks().forEach(x=>x.stop());if(send)pushMsg(room,{f:'me',voice:1,dur:fmtD(dur)});}}
 mic.addEventListener('pointerdown',e=>{e.preventDefault();try{mic.setPointerCapture(e.pointerId);}catch(_){}begin(e);});
 mic.addEventListener('pointermove',e=>{if(!R||R.locked)return;const dx=(e.clientX-R.x0)*(rtl()?-1:1),dy=e.clientY-R.y0;
   const h=$('#recBar .hint'),lk=$('#recLock');if(h)h.style.transform=`translateX(${Math.min(0,dx)*(rtl()?-1:1)}px)`;if(lk)lk.style.transform=`translateY(${Math.min(0,dy)}px)`;
   if(dx<-110){finish(false);return;}
   if(dy<-70){R.locked=true;$('#recBar').classList.add('locked');$('#recLock')?.remove();mic.classList.remove('recording');try{navigator.vibrate&&navigator.vibrate(15);}catch(_){}}});
 const up=()=>{if(R&&!R.locked)finish(true);};mic.addEventListener('pointerup',up);mic.addEventListener('pointercancel',()=>{if(R&&!R.locked)finish(false);});
 mic.addEventListener('contextmenu',e=>e.preventDefault());
 const _close=closeRoom;closeRoom=function(){if(R)finish(false);return _close.apply(this,arguments);};})();

/* v10.2 WhatsApp layout: one round button: mic when empty, send arrow when typing */
(function(){const css=document.createElement('style');css.textContent=`
#composer.empty #sendBtn{display:none}#composer:not(.empty) #micBtn{display:none}
#composer.empty #micBtn{width:44px;height:44px;border-radius:50%;background:var(--accent,#E5202E);color:#fff}
#composer.empty #micBtn svg{width:22px;height:22px}`;document.head.appendChild(css);
 const inp=$('#msgInput'),c=$('#composer');const upd=()=>c.classList.toggle('empty',!inp.value.trim());
 inp.addEventListener('input',upd);c.addEventListener('submit',()=>setTimeout(upd,0));
 const _o=openRoom;openRoom=function(){const r=_o.apply(this,arguments);inp.value=inp.value||'';upd();return r;};upd();})();

/* v10.3 voice playback: play/pause + light moving along the wave */
(function(){const css=document.createElement('style');css.textContent=`
.m.playing .wave i{animation:none}
.wave{position:relative}.wave i{transition:opacity .15s,box-shadow .15s}
.vmsg.vp .wave i{opacity:.35}.vmsg.vp .wave i.on{opacity:1}
.vmsg.vp .wave i.hd{opacity:1;box-shadow:0 0 8px 2px currentColor;transform:scaleY(1.25)}
.wave .glow{position:absolute;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:currentColor;box-shadow:0 0 12px 4px currentColor;pointer-events:none;opacity:0;transition:opacity .2s}
.vmsg.vp .wave .glow{opacity:.9}`;document.head.appendChild(css);})();
let VP=null;const PLAY_SV='<path d="M7 4l13 8-13 8z" fill="currentColor"/>',PAUSE_SV='<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor"/>';
const secOf=d=>{const p=String(d||'0:05').split(':');return Math.max(1,(+p[0]||0)*60+(+p[1]||0));};
function vpEl(){if(!VP)return null;if(VP.el&&VP.el.isConnected)return VP.el;const m=document.querySelector(`#msgs .m[data-k="${VP.k}"] .vmsg`);VP.el=m;if(m){VP.label=m.querySelector('small').textContent;}return m;}
function vpPaint(p,pos){const v=vpEl();if(!v)return;v.classList.add('vp');const b=v.querySelector('.vplay');const want=SV(VP.paused?PLAY_SV:PAUSE_SV);if(b.dataset.st!==String(VP.paused)){b.innerHTML=want;b.dataset.st=String(VP.paused);}
  const w=v.querySelector('.wave');let g=w.querySelector('.glow');if(!g){w.insertAdjacentHTML('beforeend','<span class="glow"></span>');g=w.querySelector('.glow');}
  const bars=[...w.querySelectorAll('i')];const n=p*bars.length;bars.forEach((x,i)=>{x.classList.toggle('on',i<n);x.classList.toggle('hd',i===Math.floor(n));});
  g.style.left=(p*w.clientWidth)+'px';v.querySelector('small').textContent='0:'+String(Math.min(59,Math.floor(pos))).padStart(2,'0');}
function stopVoice(){if(!VP)return;cancelAnimationFrame(VP.raf);try{VP.audio&&VP.audio.pause();}catch(_){}const v=vpEl();const label=VP.label;VP=null;
  if(v){v.classList.remove('vp');const b=v.querySelector('.vplay');b.innerHTML=SV(PLAY_SV);delete b.dataset.st;v.querySelectorAll('.wave i').forEach(i=>i.classList.remove('on','hd'));v.querySelector('.glow')?.remove();if(label)v.querySelector('small').textContent=label;}}
function vpTick(){if(!VP||VP.paused)return;const a=VP.audio;const D=(a&&isFinite(a.duration)&&a.duration>0)?a.duration:VP.dur;
  const pos=a&&!a.paused&&a.currentTime>0?a.currentTime:(performance.now()-VP.t0)/1000;VP.pos=pos;const p=Math.min(1,pos/D);vpPaint(p,pos);
  if(p>=1){stopVoice();return;}VP.raf=requestAnimationFrame(vpTick);}
playVoice=function(k,btn){const m=S.chats[roomId][k];
  if(VP&&VP.k===k&&VP.room===roomId){VP.el=btn.closest('.vmsg');if(VP.paused){VP.paused=false;VP.t0=performance.now()-VP.pos*1000;if(VP.audio)VP.audio.play().catch(()=>{});vpTick();}
    else{VP.paused=true;cancelAnimationFrame(VP.raf);if(VP.audio)VP.audio.pause();vpPaint(Math.min(1,VP.pos/VP.dur),VP.pos);}return;}
  stopVoice();let audio=null;if(m.a){try{audio=new Audio(m.a);audio.play().catch(()=>{});}catch(_){audio=null;}}
  const v=btn.closest('.vmsg');VP={k,room:roomId,el:v,audio,dur:secOf(m.dur),pos:0,t0:performance.now(),paused:false,label:v.querySelector('small').textContent};vpTick();};
(function(){const _c=closeRoom;closeRoom=function(){stopVoice();return _c.apply(this,arguments);};})();

/* v10.4 simple birthday: day / month / year menus instead of the calendar */
(function(){const T={'Day':['Jour','יום','اليوم'],'Month':['Mois','חודש','الشهر'],'Year':['Année','שנה','السنة']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`.bdSel{display:flex;gap:8px}.bdSel select{flex:1;min-width:0;height:54px;border-radius:14px;border:1.5px solid var(--line);background:var(--card);color:var(--fg);font-size:17px;padding:0 10px;-webkit-appearance:none;appearance:none;text-align:center;text-align-last:center}.bdSel select.m{flex:1.6}`;document.head.appendChild(css);
 const inp=$('#suAge');inp.type='hidden';
 const wrap=document.createElement('div');wrap.className='bdSel';inp.after(wrap);
 function build(){const loc={fr:'fr-FR',he:'he-IL',ar:'ar'}[S.lang]||'en-US';const y0=new Date().getFullYear();const cur=(inp.value||'').split('-');
   const mon=Array.from({length:12},(_,i)=>new Intl.DateTimeFormat(loc,{month:'long'}).format(new Date(2000,i,1)));
   wrap.innerHTML=`<select class="d" aria-label="${t('Day')}"><option value="">${t('Day')}</option>${Array.from({length:31},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}</select>
   <select class="m" aria-label="${t('Month')}"><option value="">${t('Month')}</option>${mon.map((m,i)=>`<option value="${i+1}">${m}</option>`).join('')}</select>
   <select class="y" aria-label="${t('Year')}"><option value="">${t('Year')}</option>${Array.from({length:88},(_,i)=>y0-12-i).map(y=>`<option value="${y}">${y}</option>`).join('')}</select>`;
   if(cur.length===3){wrap.querySelector('.y').value=+cur[0];wrap.querySelector('.m').value=+cur[1];wrap.querySelector('.d').value=+cur[2];}
   wrap.onchange=()=>{const d=wrap.querySelector('.d').value,m=wrap.querySelector('.m').value,y=wrap.querySelector('.y').value;
     if(d&&m&&y){const last=new Date(+y,+m,0).getDate();const dd=Math.min(+d,last);if(dd!==+d)wrap.querySelector('.d').value=dd;inp.value=`${y}-${String(m).padStart(2,'0')}-${String(dd).padStart(2,'0')}`;}else inp.value='';
     inp.dispatchEvent(new Event('input'));};}
 build();const _rs=renderStep;renderStep=function(){const r=_rs.apply(this,arguments);build();return r;};})();

/* ====================== v10.5 MORE FILTERS + FACE TRACKING ====================== */
(function(){const T={'Glow':['Éclat','זוהר','توهج'],'Pink':['Rose','ורוד','وردي'],'Film':['Film','פילם','فيلم'],'Pop':['Pop','פופ','بوب'],'Dreamy':['Rêve','חלומי','حالم'],'Golden hour':['Heure dorée','שעת זהב','الساعة الذهبية'],'Ice':['Glace','קרח','جليد'],
 'Bunny':['Lapin','ארנב','أرنب'],'Cat':['Chat','חתול','قطة'],'Flower crown':['Couronne de fleurs','זר פרחים','تاج الزهور'],'Mustache':['Moustache','שפם','شارب'],'Heart eyes':['Yeux cœurs','עיני לב','عيون القلوب'],'Halo':['Auréole','הילה','هالة'],'Horns':['Cornes','קרניים','قرون'],'Clown nose':['Nez de clown','אף ליצן','أنف المهرج'],'Butterfly':['Papillon','פרפר','فراشة'],
 'Sunglasses':['Lunettes de soleil','משקפי שמש','نظارات شمسية'],'Beret':['Béret','ברט','بيريه'],'Cap':['Casquette','כובע מצחייה','قبعة'],'Tiara':['Diadème','נזר','تاج صغير'],'Bow':['Nœud','פפיון','فيونكة'],'Lipstick':['Rouge à lèvres','שפתון','أحمر شفاه'],'Freckles':['Taches de rousseur','נמשים','نمش'],'Necklace':['Collier','שרשרת','قلادة'],
 'Polaroid frame':['Cadre Polaroid','מסגרת פולארויד','إطار بولارويد'],'Magazine frame':['Cadre magazine','מסגרת מגזין','إطار مجلة']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
const FLOWERS=(()=>{let g='';const xs=[14,36,58,82,104,126],ys=[34,22,16,16,22,34],cs=['#F472B6','#FDE68A','#F9A8D4','#C4B5FD','#FDE68A','#F472B6'];xs.forEach((x,i)=>{const y=ys[i];for(let a=0;a<5;a++){const r=a*72*Math.PI/180;g+=`<circle cx="${(x+7*Math.cos(r)).toFixed(1)}" cy="${(y+7*Math.sin(r)).toFixed(1)}" r="5.5" fill="${cs[i]}"/>`;}g+=`<circle cx="${x}" cy="${y}" r="4" fill="#F59E0B"/>`;});return `<svg viewBox="0 0 140 50"><path d="M8 40Q70 0 132 40" stroke="#16A34A" stroke-width="3" fill="none"/>${g}</svg>`;})();
Object.assign(OVL,{
 earsP:'<svg viewBox="0 0 120 50"><path d="M10 4l26 12-8 34zM110 4L84 16l8 34z" fill="#92400E"/></svg>',
 noseP:'<svg viewBox="0 0 40 30"><ellipse cx="20" cy="15" rx="18" ry="13" fill="#111"/><ellipse cx="14" cy="10" rx="5" ry="3" fill="#fff" opacity=".35"/></svg>',
 bunny:'<svg viewBox="0 0 120 80"><g fill="#fff" stroke="#e5e5e5" stroke-width="2"><ellipse cx="38" cy="40" rx="14" ry="38" transform="rotate(-12 38 40)"/><ellipse cx="82" cy="40" rx="14" ry="38" transform="rotate(12 82 40)"/></g><g fill="#F9A8D4"><ellipse cx="38" cy="44" rx="7" ry="28" transform="rotate(-12 38 44)"/><ellipse cx="82" cy="44" rx="7" ry="28" transform="rotate(12 82 44)"/></g></svg>',
 catE:'<svg viewBox="0 0 120 50"><path d="M14 48L22 4l26 30zM106 48L98 4 72 34z" fill="#111"/><path d="M22 40l4-26 14 16zM98 40l-4-26-14 16z" fill="#F9A8D4"/></svg>',
 catW:'<svg viewBox="0 0 120 40"><ellipse cx="60" cy="14" rx="7" ry="5" fill="#F472B6"/><g stroke="#111" stroke-width="2" stroke-linecap="round"><path d="M44 18L6 10M44 22H4M44 26L6 34M76 18l38-8M76 22h40M76 26l38 8"/></g></svg>',
 flowers:FLOWERS,
 mustache:'<svg viewBox="0 0 120 40"><path d="M60 14c-8-10-22-12-34-4-8 6-16 8-24 4 4 12 18 20 34 16 12-3 20-10 24-14 4 4 12 11 24 14 16 4 30-4 34-16-8 4-16 2-24-4-12-8-26-6-34 4z" fill="#3B2314"/></svg>',
 hearteyes:'<svg viewBox="0 0 120 40"><g fill="#F43F5E"><path d="M30 36S10 24 10 13a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 11-20 23-20 23z"/><path d="M90 36S70 24 70 13a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 11-20 23-20 23z"/></g></svg>',
 halo:'<svg viewBox="0 0 120 40"><ellipse cx="60" cy="20" rx="52" ry="13" fill="none" stroke="#FDE68A" stroke-width="7"/><ellipse cx="60" cy="20" rx="52" ry="13" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/></svg>',
 horns:'<svg viewBox="0 0 120 50"><path d="M20 48C10 30 12 12 24 2c-2 14 4 26 16 34zM100 48c10-18 8-36-4-46 2 14-4 26-16 34z" fill="#DC2626"/></svg>',
 clown:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#EF4444"/><circle cx="13" cy="13" r="5" fill="#fff" opacity=".55"/></svg>',
 butterfly:'<svg viewBox="0 0 60 50"><g fill="#A78BFA"><path d="M30 25C20 2 2 4 4 18s16 12 26 7zM30 25c10-23 28-21 26-7s-16 12-26 7z"/></g><g fill="#F0ABFC"><path d="M30 27C22 44 8 46 8 36s12-12 22-9zM30 27c8 17 22 19 22 9s-12-12-22-9z"/></g><rect x="28.5" y="12" width="3" height="28" rx="1.5" fill="#1F2937"/></svg>',
 sunglasses:'<svg viewBox="0 0 120 40"><path d="M6 8h46c0 16-6 28-22 28S6 24 6 8zM68 8h46c0 16-8 28-24 28S68 24 68 8z" fill="#1F2937" fill-opacity=".92" stroke="#D4AF37" stroke-width="2.5"/><path d="M52 12q8-5 16 0" stroke="#D4AF37" stroke-width="3" fill="none"/></svg>',
 beret:'<svg viewBox="0 0 120 60"><ellipse cx="66" cy="34" rx="54" ry="22" fill="#B91C1C"/><path d="M14 44q50 16 104-2" stroke="#7F1D1D" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="62" y="6" width="6" height="10" rx="3" fill="#7F1D1D"/></svg>',
 cap:'<svg viewBox="0 0 120 60"><path d="M18 46c0-26 18-40 42-40s42 14 42 40z" fill="#111827"/><path d="M14 46h92c8 0 14 4 14 8H6c0-4 2-8 8-8z" fill="#111827"/><text x="60" y="38" text-anchor="middle" font-size="16" font-weight="800" fill="#D4AF37" font-family="Inter,system-ui">R</text></svg>',
 tiara:'<svg viewBox="0 0 120 40"><path d="M6 36Q60 18 114 36L104 22 92 28 82 10 70 24 60 4 50 24 38 10 28 28 16 22z" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1.5"/><circle cx="60" cy="14" r="4" fill="#60A5FA"/><circle cx="38" cy="18" r="3" fill="#F472B6"/><circle cx="82" cy="18" r="3" fill="#F472B6"/></svg>',
 bow:'<svg viewBox="0 0 60 36"><path d="M30 18L4 4v28zM30 18L56 4v28z" fill="#F472B6"/><circle cx="30" cy="18" r="6" fill="#DB2777"/></svg>',
 lipstick:'<svg viewBox="0 0 60 26"><path d="M2 12C10 4 20 2 30 8 40 2 50 4 58 12 50 22 40 25 30 25S10 22 2 12z" fill="#BE123C"/><path d="M4 12q26 6 52 0" stroke="#881337" stroke-width="1.5" fill="none"/></svg>',
 freckles:'<svg viewBox="0 0 120 30"><g fill="#92400E" opacity=".55"><circle cx="16" cy="10" r="2"/><circle cx="24" cy="16" r="1.6"/><circle cx="12" cy="20" r="1.8"/><circle cx="30" cy="9" r="1.4"/><circle cx="104" cy="10" r="2"/><circle cx="96" cy="16" r="1.6"/><circle cx="108" cy="20" r="1.8"/><circle cx="90" cy="9" r="1.4"/></g></svg>',
 necklace:'<svg viewBox="0 0 120 50"><path d="M8 4Q60 70 112 4" stroke="#D4AF37" stroke-width="3" fill="none"/><path d="M60 36l7 7-7 7-7-7z" fill="#60A5FA" stroke="#D4AF37" stroke-width="2"/></svg>',
 cat:'<svg viewBox="0 0 120 90"><path d="M14 40L22 4l26 30zM106 40L98 4 72 34z" fill="#111"/><ellipse cx="60" cy="66" rx="7" ry="5" fill="#F472B6"/><g stroke="#111" stroke-width="2"><path d="M44 70L6 62M44 74H4M76 70l38-8M76 74h40"/></g></svg>'});
/* where each piece goes on the face. a=anchor, w=width (× face width), dx/dy=offset (× face width) */
const FACE={crown:[['crown','top',.85,0,-.32]],puppy:[['earsP','top',1.25,0,-.12],['noseP','nose',.3,0,.02]],hearts:[['hearts','top',1.2,0,-.45]],sparkles:[['sparkles','top',1.3,0,-.3]],
 glasses:[['glasses','eyes',1.0,0,0]],hat:[['hat','top',1.25,0,-.42]],earrings:[['earrings','ears',1.25,0,.32]],makeup:[['makeup','nose',.95,0,.22]],bday:[['bday','top',1.4,0,-.6]],
 bunny:[['bunny','top',.95,0,-.5]],cat:[['catE','top',1.1,0,-.18],['catW','nose',1.0,0,.06]],flowers:[['flowers','top',1.2,0,-.12]],mustache:[['mustache','lip',.55,0,0]],hearteyes:[['hearteyes','eyes',.9,0,.02]],
 halo:[['halo','top',.85,0,-.5]],horns:[['horns','top',1.0,0,-.2]],clown:[['clown','nose',.3,0,0]],butterfly:[['butterfly','top',.42,.38,-.12]],
 sunglasses:[['sunglasses','eyes',1.05,0,.03]],beret:[['beret','top',1.2,.06,-.28]],cap:[['cap','top',1.3,0,-.3]],tiara:[['tiara','top',.75,0,-.14]],bow:[['bow','top',.42,-.32,-.1]],
 lipstick:[['lipstick','mouth',.42,0,.01]],freckles:[['freckles','nose',.95,0,-.02]],necklace:[['necklace','chin',1.0,0,.42]]};
/* new filters: colors + funny = free, fashion + frames = Gold */
const _iNone=FILTERS.findIndex(f=>f.k==='crown');
FILTERS.splice(_iNone,0,{k:'glow',n:'Glow',css:'brightness(1.12) saturate(1.15) contrast(.95)',sw:'#F59E0B'},{k:'pink',n:'Pink',css:'sepia(.25) saturate(1.6) hue-rotate(-30deg)',sw:'#EC4899'},
 {k:'film',n:'Film',css:'contrast(1.2) saturate(.8) sepia(.2)',sw:'#57534E'},{k:'pop',n:'Pop',css:'saturate(2) contrast(1.1)',sw:'#7C3AED'},{k:'dreamy',n:'Dreamy',css:'brightness(1.1) saturate(1.3) contrast(.9)',sw:'#A78BFA'},
 {k:'golden',n:'Golden hour',css:'sepia(.35) saturate(1.5) brightness(1.08)',sw:'#D97706'},{k:'ice',n:'Ice',css:'saturate(.7) hue-rotate(160deg) brightness(1.08)',sw:'#38BDF8'});
const _iGl=FILTERS.findIndex(f=>f.k==='glasses');
FILTERS.splice(_iGl,0,{k:'bunny',n:'Bunny',ov:'bunny'},{k:'cat',n:'Cat',ov:'cat'},{k:'flowers',n:'Flower crown',ov:'flowers'},{k:'mustache',n:'Mustache',ov:'mustache'},{k:'hearteyes',n:'Heart eyes',ov:'hearteyes'},
 {k:'halo',n:'Halo',ov:'halo'},{k:'horns',n:'Horns',ov:'horns'},{k:'clown',n:'Clown nose',ov:'clown'},{k:'butterfly',n:'Butterfly',ov:'butterfly'});
const _iFd=FILTERS.findIndex(f=>f.k==='fdate');
FILTERS.splice(_iFd,0,{k:'sunglasses',n:'Sunglasses',ov:'sunglasses',gold:1},{k:'beret',n:'Beret',ov:'beret',gold:1},{k:'cap',n:'Cap',ov:'cap',gold:1},{k:'tiara',n:'Tiara',ov:'tiara',gold:1},{k:'bow',n:'Bow',ov:'bow',gold:1},
 {k:'lipstick',n:'Lipstick',ov:'lipstick',gold:1},{k:'freckles',n:'Freckles',ov:'freckles',gold:1},{k:'necklace',n:'Necklace',ov:'necklace',gold:1});
FILTERS.push({k:'fpola',n:'Polaroid frame',ov:'fpola',gold:1},{k:'fmag',n:'Magazine frame',ov:'fmag',gold:1});
OVL.fpola='<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1.5" fill="#fff"/><rect x="7" y="5" width="10" height="10" fill="#9CA3AF"/></svg>';OVL.fmag='<svg viewBox="0 0 24 24"><text x="12" y="17" text-anchor="middle" font-size="16" font-weight="700" font-family="Georgia,serif" fill="#fff">M</text></svg>';
const _ovl105=overlayHTML;overlayHTML=function(k){const f=filterById(k);
  if(f.ov==='fpola')return '<div class="ov ovPola"></div>';
  if(f.ov==='fmag'){const d=new Date();return `<div class="ov ovMag"><b>R-STYLE</b><span>${d.toLocaleDateString(S.lang||'en',{month:'long',year:'numeric'}).toUpperCase()}</span><i>${esc(t('The look of the day'))}</i></div>`;}
  if(f.ov&&!/^(crown|puppy|hearts|sparkles|glasses|hat|earrings|makeup|bday|fdate|flogo)$/.test(f.ov))return `<div class="ov ov-${f.ov}" style="top:10%;width:66%">${OVL[f.ov]}</div>`;
  return _ovl105(k);};
(function(){const css=document.createElement('style');css.textContent=`
.ovPola{left:0!important;transform:none!important;inset:0;border:16px solid #fff;border-bottom-width:84px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
#snap .ovPola,#snap .ovMag{position:fixed;width:auto!important}
.ovMag{left:0!important;transform:none!important;inset:0;display:flex;flex-direction:column;align-items:center;padding-top:40px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.35)}
.ovMag b{font-family:Georgia,'Times New Roman',serif;font-size:58px;letter-spacing:4px;line-height:1}.ovMag span{font-size:11px;letter-spacing:3px;margin-top:6px}.ovMag i{position:absolute;bottom:200px;left:22px;font-family:Georgia,serif;font-size:22px;font-style:italic;max-width:60%}
.fc .fpI{width:26px;height:30px;border:3px solid #fff;border-bottom-width:9px;border-radius:2px}
.trk{position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden}.trk .tp{position:absolute;left:0;top:0;transform-origin:50% 50%;will-change:transform}.trk .tp svg{display:block;width:100%;height:auto}
.tracking .ov:not(.ovDate):not(.ovLogo):not(.ovPola):not(.ovMag){display:none}
.ftLoad{position:absolute;top:calc(env(safe-area-inset-top) + 64px);left:50%;transform:translateX(-50%);z-index:6;background:rgba(0,0,0,.55);color:#fff;font-size:12px;padding:6px 12px;border-radius:14px;display:flex;gap:6px;align-items:center}`;document.head.appendChild(css);
 const T={'The look of the day':['Le look du jour','הלוק של היום','إطلالة اليوم'],'Loading face filters…':['Chargement des filtres visage…','טוען פילטרים לפנים…','جارٍ تحميل فلاتر الوجه…']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* ---- face tracking (MediaPipe Face Landmarker, loaded only when a camera opens) ---- */
const FT={lm:null,loading:null,failed:false,raf:0,sm:null,ts:0};
const MP_VER='0.10.3',MP_BASE='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@'+MP_VER;
function ftLoad(){if(FT.lm)return Promise.resolve(FT.lm);if(FT.loading)return FT.loading;
  FT.loading=(async()=>{const m=await import(MP_BASE);const V=m.FaceLandmarker?m:(m.default||m);const fs=await V.FilesetResolver.forVisionTasks(MP_BASE+'/wasm');
    const opt=d=>({baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:d},runningMode:'VIDEO',numFaces:1});
    try{FT.lm=await V.FaceLandmarker.createFromOptions(fs,opt('GPU'));}catch(_){FT.lm=await V.FaceLandmarker.createFromOptions(fs,opt('CPU'));}return FT.lm;})()
    .catch(e=>{FT.failed=true;FT.loading=null;throw e;});return FT.loading;}
function ftDetect(src){if(!FT.lm)return null;try{FT.ts=Math.max(FT.ts+1,performance.now());const r=FT.lm.detectForVideo(src,FT.ts);return r&&r.faceLandmarks&&r.faceLandmarks[0]||null;}catch(_){return null;}}
/* key points from 478 landmarks, in pixels, using a mapper (x,y normalized → screen) */
function facePts(lm,map){const P=i=>map(lm[i].x,lm[i].y);let a=P(33),b=P(263);if(a.x>b.x){const c=a;a=b;b=c;}
  const roll=Math.atan2(b.y-a.y,b.x-a.x);const e1=P(234),e2=P(454);const fw=Math.hypot(e2.x-e1.x,e2.y-e1.y);const nose=P(1),mouth=P(13);
  return {roll,fw,top:P(10),eyes:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},nose,mouth,lip:{x:(nose.x+mouth.x)/2,y:(nose.y+mouth.y)/2},ears:{x:(e1.x+e2.x)/2,y:(e1.y+e2.y)/2},chin:P(152)};}
function partBox(pts,part){const [svg,a,w,dx,dy]=part;const A=pts[a];const c=Math.cos(pts.roll),s=Math.sin(pts.roll);
  const ox=dx*pts.fw,oy=dy*pts.fw;return {svg,x:A.x+ox*c-oy*s,y:A.y+ox*s+oy*c,w:w*pts.fw,rot:pts.roll};}
function smooth(pts){if(!FT.sm){FT.sm=pts;return pts;}const k=.55,o=FT.sm,L=(p,q)=>({x:q.x+(p.x-q.x)*k,y:q.y+(p.y-q.y)*k});const r={roll:o.roll+(pts.roll-o.roll)*k,fw:o.fw+(pts.fw-o.fw)*k};
  for(const n of ['top','eyes','nose','mouth','lip','ears','chin'])r[n]=L(pts[n],o[n]);FT.sm=r;return r;}
function coverMap(el,vw,vh,mirror){const cw=el.clientWidth,ch=el.clientHeight;const sc=Math.max(cw/vw,ch/vh);const ox=(cw-vw*sc)/2,oy=(ch-vh*sc)/2;
  return (x,y)=>{let px=x*vw*sc+ox;if(mirror)px=cw-px;return {x:px,y:y*vh*sc+oy};};}
function drawParts(layer,parts){const have=[...layer.children];parts.forEach((p,i)=>{let el=have[i];if(!el||el.dataset.s!==p.svg){el=document.createElement('div');el.className='tp';el.dataset.s=p.svg;el.innerHTML=OVL[p.svg]||'';if(have[i])have[i].replaceWith(el);else layer.appendChild(el);}
   el.style.width=p.w+'px';el.style.transform=`translate(${p.x}px,${p.y}px) translate(-50%,-50%) rotate(${p.rot}rad)`;});
  for(let i=parts.length;i<layer.children.length;)layer.children[i].remove();}
function ftTarget(){if($('#snap')?.classList.contains('on')){const box=$('#snap');const src=box.querySelector('#snapV')||box.querySelector('img.sbase');return src?{box,src,k:SNAP.filter,still:src.tagName==='IMG',mirror:src.tagName==='VIDEO'}:null;}
  if($('#call')?.classList.contains('on')){const v=$('#selfV');if(v&&CALL.stream)return {box:v.parentElement,src:v,k:CALL.filter,mirror:true};}return null;}
function ftLoop(){cancelAnimationFrame(FT.raf);const tg=ftTarget();if(!tg){FT.raf=0;FT.sm=null;return;}
  const parts=FACE[tg.k];let layer=tg.box.querySelector(':scope > .trk');
  if(!parts||!FT.lm){if(layer)layer.innerHTML='';tg.box.classList.remove('tracking');FT.raf=requestAnimationFrame(ftLoop);return;}
  if(!layer){layer=document.createElement('div');layer.className='trk';tg.box.appendChild(layer);}tg.box.classList.add('tracking');
  const src=tg.src;const vw=src.videoWidth||src.naturalWidth,vh=src.videoHeight||src.naturalHeight;
  if(vw&&vh&&(!tg.still||!SNAP.face||SNAP.faceFor!==src.src)){const lm=ftDetect(src);if(tg.still){SNAP.face=lm;SNAP.faceFor=src.src;}
    FT.last=tg.still?null:lm;if(lm){const pts=tg.still?facePts(lm,coverMap(src,vw,vh,false)):smooth(facePts(lm,coverMap(src,vw,vh,tg.mirror)));drawParts(layer,parts.map(p=>partBox(pts,p)));}else{layer.innerHTML='';FT.sm=null;}}
  if(!parts)FT.last=null;
  else if(tg.still&&SNAP.face){drawParts(layer,parts.map(p=>partBox(facePts(SNAP.face,coverMap(src,vw,vh,false)),p)));}
  FT.raf=requestAnimationFrame(ftLoop);}
function ftStart(box){if(FT.failed){return;}if(!FT.lm&&box&&!box.querySelector('.ftLoad')){box.insertAdjacentHTML('beforeend',`<div class="ftLoad"><span class="spin"></span>${t('Loading face filters…')}</div>`);}
  ftLoad().then(()=>{document.querySelectorAll('.ftLoad').forEach(x=>x.remove());if(!FT.raf)ftLoop();}).catch(()=>{document.querySelectorAll('.ftLoad').forEach(x=>x.remove());});if(FT.lm&&!FT.raf)ftLoop();}
const _renderSnap105=renderSnap;renderSnap=function(){_renderSnap105();const s=$('#snap');if(!SNAP.img){SNAP.face=null;}ftStart(s);};
const _renderCall105=renderCall;renderCall=function(){_renderCall105();if(CALL.video||CALL.people.length>1)ftStart($('#call'));};
const _camOn105=camOn;camOn=async function(){await _camOn105();ftStart($('#call'));};
/* photo sent with the filter at the right place on the face */
const _compose105=composeSnap;composeSnap=async function(){const f=filterById(SNAP.filter);const parts=FACE[f.k];
  if(f.ov==='fpola'||f.ov==='fmag'){const base=await _compose105();const im=new Image();await new Promise(r=>{im.onload=r;im.onerror=r;im.src=base;});const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
    if(f.ov==='fpola'){const b=Math.round(c.width*.045);x.fillStyle='#fff';x.fillRect(0,0,c.width,b);x.fillRect(0,0,b,c.height);x.fillRect(c.width-b,0,b,c.height);x.fillRect(0,c.height-b*5,c.width,b*5);}
    else{x.fillStyle='#fff';x.textAlign='center';x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=12;x.font=`700 ${Math.round(c.width*.15)}px Georgia,serif`;x.fillText('R-STYLE',c.width/2,c.width*.17);x.font=`600 ${Math.round(c.width*.028)}px Inter,system-ui`;x.fillText(new Date().toLocaleDateString(S.lang||'en',{month:'long',year:'numeric'}).toUpperCase(),c.width/2,c.width*.22);x.textAlign='start';x.font=`italic ${Math.round(c.width*.055)}px Georgia,serif`;x.fillText(t('The look of the day'),c.width*.06,c.height*.82);}
    return c.toDataURL('image/jpeg',.8);}
  if(!parts||!FT.lm)return _compose105();
  const im=new Image();await new Promise(r=>{im.onload=r;im.onerror=r;im.src=SNAP.img;});const lm=SNAP.faceFor===SNAP.img&&SNAP.face?SNAP.face:ftDetect(im);if(!lm)return _compose105();
  const W0=Math.min(900,im.width||900),H0=Math.round(W0*(im.height||1200)/(im.width||900));const c=document.createElement('canvas');c.width=W0;c.height=H0;const x=c.getContext('2d');
  try{x.filter=f.css&&f.css!=='none'?f.css:'none';}catch(_){}x.drawImage(im,0,0,W0,H0);x.filter='none';
  const pts=facePts(lm,(a,b)=>({x:a*W0,y:b*H0}));
  for(const p of parts.map(q=>partBox(pts,q))){const svg=(OVL[p.svg]||'').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');const o=new Image();await new Promise(r=>{o.onload=r;o.onerror=r;o.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
    const vb=(svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)||[0,120,60]);const h=p.w*(+vb[2])/(+vb[1]);x.save();x.translate(p.x,p.y);x.rotate(p.rot);try{x.drawImage(o,-p.w/2,-h/2,p.w,h);}catch(_){}x.restore();}
  return c.toDataURL('image/jpeg',.8);};


/* ====================== v10.6 VIDEO MESSAGES (camera with filters + gallery) ====================== */
(function(){const T={'Video':['Vidéo','וידאו','فيديو'],'Tap to record · max 60 s':['Appuie pour filmer · max 60 s','לחץ כדי לצלם · עד 60 שניות','اضغط للتسجيل · 60 ث كحد أقصى'],'Video message':['Message vidéo','הודעת וידאו','رسالة فيديو'],
 'Video is too long (max 60 s)':['Vidéo trop longue (max 60 s)','הסרטון ארוך מדי (עד 60 שניות)','الفيديو طويل جدًا (60 ث كحد أقصى)'],'This video is too big (max 50 MB).':['Cette vidéo est trop lourde (max 50 Mo).','הסרטון גדול מדי (עד 50MB).','الفيديو كبير جدًا (حد أقصى 50 ميغابايت).']};
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`
#snap .shut.vid{border-color:#fff;background:transparent}#snap .shut.vid::after{content:"";position:absolute;inset:8px;border-radius:50%;background:#E5202E;transition:all .2s}
#snap .shut.vid.rec::after{inset:22px;border-radius:8px}#snap .shut.vid.rec{border-color:#E5202E;animation:recPulse 1s infinite}
@keyframes recPulse{50%{box-shadow:0 0 0 10px rgba(229,32,46,.25)}}
#snap .rtime{position:absolute;top:calc(env(safe-area-inset-top) + 22px);left:50%;transform:translateX(-50%);z-index:6;background:#E5202E;color:#fff;font-weight:700;font-size:14px;padding:5px 12px;border-radius:14px;font-variant-numeric:tabular-nums}
#snap .smodes button,#snap .smodes span{background:none;border:0;color:#fff;font:inherit;padding:0 0 2px;cursor:pointer}
#snap video.sbase.pv{transform:none}
.m.pic .vthumb{position:relative;display:block}.m .vthumb video{display:block;width:220px;max-width:62vw;border-radius:16px;background:#000;aspect-ratio:3/4;object-fit:cover}
.m .vthumb .pl{position:absolute;inset:0;display:grid;place-items:center}.m .vthumb .pl i{width:46px;height:46px;border-radius:50%;background:rgba(0,0,0,.45);display:grid;place-items:center;color:#fff;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
.m .vthumb .pl svg{width:20px;height:20px;margin-left:3px}.m .vthumb small{position:absolute;left:8px;bottom:8px;color:#fff;font-size:11px;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.6)}
.vidView{position:fixed;inset:0;z-index:9999;background:#000;display:grid;place-items:center}.vidView video{width:100%;height:100%;object-fit:contain}
.vidView .x{position:absolute;top:calc(env(safe-area-inset-top) + 14px);right:14px;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.18);color:#fff;display:grid;place-items:center;z-index:2;border:0}.vidView .x svg{width:20px;height:20px}`;document.head.appendChild(css);})();
SNAP.mode='photo';
const fmtSec=s=>'0:'+String(Math.min(59,Math.max(0,Math.floor(s)))).padStart(2,'0');
function vidMime(){const L=['video/mp4;codecs=avc1','video/mp4','video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm'];if(!window.MediaRecorder)return '';for(const m of L){try{if(MediaRecorder.isTypeSupported(m))return m;}catch(_){}}return '';}
const SVGIMG={};function svgImg(k){if(SVGIMG[k])return SVGIMG[k];const svg=(OVL[k]||'').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');const o=new Image();o.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);const vb=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)||[0,120,60];o._r=(+vb[2])/(+vb[1]);return SVGIMG[k]=o;}
/* record: draw camera + filter + face pieces on a canvas, record the canvas (+ microphone) */
async function startVidRec(){const v=$('#snapV');if(!v||!v.videoWidth){toast(t('The camera opens in the iPhone app. Choose a photo from your gallery.'));return;}
  const W0=Math.min(720,v.videoWidth),H0=Math.round(W0*v.videoHeight/v.videoWidth);const c=document.createElement('canvas');c.width=W0;c.height=H0;const x=c.getContext('2d');
  let mic=null;try{mic=await navigator.mediaDevices.getUserMedia({audio:true});}catch(_){}
  const REC={c,x,mic,chunks:[],t0:Date.now(),raf:0};SNAP.rec=REC;
  const draw=()=>{if(SNAP.rec!==REC)return;const f=filterById(SNAP.filter);x.save();x.translate(W0,0);x.scale(-1,1);try{x.filter=f.css&&f.css!=='none'?f.css:'none';}catch(_){}x.drawImage(v,0,0,W0,H0);x.restore();x.filter='none';
    const parts=FACE[f.k];if(parts&&FT.last){const pts=facePts(FT.last,(a,b)=>({x:W0-a*W0,y:b*H0}));for(const p of parts.map(q=>partBox(pts,q))){const o=svgImg(p.svg);if(o.complete&&o.naturalWidth!==0||o.complete){const h=p.w*o._r;x.save();x.translate(p.x,p.y);x.rotate(p.rot);try{x.drawImage(o,-p.w/2,-h/2,p.w,h);}catch(_){}x.restore();}}}
    const tm=$('#snap .rtime');const sec=(Date.now()-REC.t0)/1000;if(tm)tm.textContent=fmtSec(sec);if(sec>=60){stopVidRec();return;}REC.raf=requestAnimationFrame(draw);};draw();
  let stream;try{stream=c.captureStream(30);}catch(_){stream=SNAP.stream.clone();}
  if(mic)mic.getAudioTracks().forEach(tr=>stream.addTrack(tr));
  const mime=vidMime();try{REC.mr=mime?new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:2500000}):new MediaRecorder(stream);}catch(_){REC.mr=new MediaRecorder(stream);}
  REC.mr.ondataavailable=e=>{if(e.data&&e.data.size)REC.chunks.push(e.data);};
  REC.mr.onstop=()=>{cancelAnimationFrame(REC.raf);if(mic)mic.getTracks().forEach(tr=>tr.stop());const blob=new Blob(REC.chunks,{type:(REC.mr.mimeType||mime||'video/webm').split(';')[0]});
    SNAP.vidBlob=blob;SNAP.vid=URL.createObjectURL(blob);SNAP.vidDur=fmtSec((Date.now()-REC.t0)/1000);SNAP.rec=null;if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();};
  REC.mr.start(250);const sh=$('#snapShut');if(sh)sh.classList.add('rec');$('#snap').insertAdjacentHTML('beforeend','<div class="rtime">0:00</div>');
  const ring=$('#snapRing');if(ring)ring.style.visibility='hidden';}
function stopVidRec(){const R=SNAP.rec;if(!R||!R.mr||R.mr.state==='inactive')return;try{R.mr.stop();}catch(_){}}
const _openSnap106=openSnap;openSnap=function(to){SNAP.vid=null;SNAP.vidBlob=null;SNAP.rec=null;return _openSnap106(to);};
const _closeSnap106=closeSnap;closeSnap=function(){if(SNAP.rec){const R=SNAP.rec;SNAP.rec=null;try{R.mr.onstop=null;R.mr.stop();}catch(_){}cancelAnimationFrame(R.raf);if(R.mic)R.mic.getTracks().forEach(tr=>tr.stop());}return _closeSnap106();};
const _renderSnap106=renderSnap;renderSnap=function(){const s=$('#snap');
  if(SNAP.vid){const r=roomInfo(SNAP.to);s.innerHTML=`<video class="sbase pv" src="${SNAP.vid}" autoplay loop playsinline></video>
     <button class="sx" id="snapX" aria-label="Close">${SV(ICONS.x)}</button>
     <div class="ssend"><button class="sretake" id="snapRetake" aria-label="Retake">${SV(ICONS.x)}</button><button class="sgo" id="snapGo">${t('Send to {n}',{n:esc(firstName(r.name))})} ${SV('<path d="M4 12l16-8-6 16-2.5-6.5z"/>')}</button></div>`;
    $('#snapX').onclick=closeSnap;$('#snapRetake').onclick=()=>{const m=SNAP.mode;openSnap(SNAP.to).then(()=>{});SNAP.mode=m;};
    $('#snapGo').onclick=()=>{const to=SNAP.to;const m={f:'me',vid:SNAP.vid,vidBlob:SNAP.vidBlob,dur:SNAP.vidDur||''};SNAP.vid=null;closeSnap();pushMsg(to,m);};return;}
  _renderSnap106();
  const md=s.querySelector('.smodes');if(md&&!SNAP.img){const on=SNAP.mode;md.innerHTML=`<button id="snapGal">${t('Gallery')}</button><button data-sm="photo" class="${on==='photo'?'on':''}">${t('Photo')}</button><button data-sm="video" class="${on==='video'?'on':''}">${t('Video')}</button>`;
    md.querySelectorAll('[data-sm]').forEach(b=>b.onclick=()=>{SNAP.mode=b.dataset.sm;renderSnap();});
    $('#snapGal').onclick=async()=>{if(SNAP.mode==='video'){const fl=await pickFile('video/*');if(!fl)return;const url=URL.createObjectURL(fl);const fr=await videoFrame(url);
        if(fr&&fr.dur>61){toast(t('Video is too long (max 60 s)'));return;}if(fl.size>50*1024*1024){toast(t('This video is too big (max 50 MB).'));return;}
        if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}SNAP.vidBlob=fl;SNAP.vid=url;SNAP.vidDur=fr?fmtSec(fr.dur):'';renderSnap();return;}
      const fl=await pickFile('image/*');if(fl){SNAP.img=await downscale(await readFile(fl),1000,.85);if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();}};
    const sh=$('#snapShut');if(sh&&SNAP.mode==='video'){sh.classList.add('vid');sh.setAttribute('aria-label',t('Video'));sh.onclick=()=>{if(SNAP.rec)stopVidRec();else startVidRec();};
      const fn=s.querySelector('.fname');if(fn&&!SNAP.stream)fn.textContent=t('Tap to record · max 60 s');}}};
/* chat bubble + full-screen player */
const _msgBody106=msgBody;msgBody=function(m){if(m.vid!==undefined||m.isVid){if(!m.vid)return `<span class="muted">${t('Video message')}…</span>`;
  return `<span class="vthumb" data-vid="1"><video src="${m.vid}#t=0.1" preload="metadata" muted playsinline></video><span class="pl"><i>${SV('<path d="M7 4l13 8-13 8z" fill="currentColor"/>')}</i></span>${m.dur?`<small>${esc(m.dur)}</small>`:''}</span>`;}return _msgBody106(m);};
const _renderMsgs106=renderMsgs;renderMsgs=function(){_renderMsgs106();$$('#msgs .m').forEach(el=>{if(el.querySelector('.vthumb'))el.classList.add('pic');});};
document.addEventListener('click',e=>{const v=e.target.closest('#msgs .vthumb');if(!v)return;const el=v.closest('.m');const m=(S.chats[roomId]||[])[+el.dataset.k];if(!m||!m.vid)return;
  const w=document.createElement('div');w.className='vidView';w.innerHTML=`<video src="${m.vid}" autoplay controls playsinline></video><button class="x" aria-label="Close">${SV(ICONS.x)}</button>`;document.body.appendChild(w);w.querySelector('.x').onclick=()=>w.remove();},true);
/* don't keep big video files in the phone memory (only the link) */
const _save106=save;save=function(){const strip=[];for(const id in S.chats)(S.chats[id]||[]).forEach(m=>{if(m.vidBlob){strip.push([m,m.vidBlob]);delete m.vidBlob;}});_save106();strip.forEach(([m,b])=>{if(!m.media)m.vidBlob=b;});};

/* v10.7 chat list: the person you talked to last is at the top */
(function(){const lastTs=id=>{const a=S.chats[id]||[];for(let i=a.length-1;i>=0;i--){if(a[i].ts)return a[i].ts;}return a.length?1:0;};
 const _r=renderChatList;renderChatList=function(){_r.apply(this,arguments);const box=$('#convs');if(!box)return;
  const rows=[...box.querySelectorAll(':scope > .crow[data-room]')];if(rows.length<2)return;const anchor=document.createComment('rows');rows[0].before(anchor);
  rows.map((el,i)=>({el,i,ts:lastTs(el.dataset.room)})).sort((a,b)=>(b.ts-a.ts)||(a.i-b.i)).reverse().forEach(o=>anchor.after(o.el));anchor.remove();};})();

/* v10.8 back button uses the latest closeRoom; keyboard: composer + typing bubble stay just above the keyboard */
$('#roomBack').onclick=()=>closeRoom();
(function(){const vv=window.visualViewport;if(!vv)return;const css=document.createElement('style');css.textContent=`#room .composer.floating{bottom:calc(var(--kb,0px) + env(safe-area-inset-bottom) + 14px);transition:bottom .15s}#room.kbOpen .composer.floating{bottom:calc(var(--kb,0px) + 8px)}#room .msgs{padding-bottom:calc(var(--kb,0px) + env(safe-area-inset-bottom) + 96px)}`;document.head.appendChild(css);
 const upd=()=>{const kb=Math.max(0,window.innerHeight-vv.height-vv.offsetTop);const room=$('#room');const open=kb>80;room.style.setProperty('--kb',(open?kb:0)+'px');room.classList.toggle('kbOpen',open);
   if(open){window.scrollTo(0,0);const b=$('#msgs');if(b)b.scrollTop=b.scrollHeight;}};
 vv.addEventListener('resize',upd);vv.addEventListener('scroll',upd);$('#msgInput').addEventListener('focus',()=>setTimeout(upd,300));$('#msgInput').addEventListener('blur',()=>setTimeout(upd,300));})();

/* v10.9 camera like Snapchat: tap = photo, hold = video, small gallery button next to the shutter */
(function(){const T={'Tap for photo · hold for video':['Appuie : photo · Maintiens : vidéo','לחיצה: תמונה · החזקה: וידאו','اضغط: صورة · اضغط مطولًا: فيديو'],'Allow the camera in Settings':['Autorise la caméra dans les Réglages','אפשר גישה למצלמה בהגדרות','اسمح بالوصول إلى الكاميرا من الإعدادات']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});
 const css=document.createElement('style');css.textContent=`#snap .sgal{position:absolute;left:22px;bottom:calc(env(safe-area-inset-bottom) + 28px);width:44px;height:44px;border-radius:14px;border:2px solid #fff;background:rgba(0,0,0,.3) center/cover;z-index:5;display:grid;place-items:center;color:#fff}
#snap .sgal svg{width:22px;height:22px}#snap .shint{position:absolute;left:0;right:0;bottom:calc(env(safe-area-inset-bottom) + 44px);text-align:center;color:#fff;font-size:12px;font-weight:600;opacity:.85;z-index:5;text-shadow:0 1px 4px rgba(0,0,0,.4)}
#snap .shut.holding{transform:translateX(-50%) scale(1.15);transition:transform .2s}`;document.head.appendChild(css);})();
function snapPhoto(){const v=$('#snapV');if(!v||!v.videoWidth)return false;const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;const x=c.getContext('2d');x.translate(c.width,0);x.scale(-1,1);x.drawImage(v,0,0);
  SNAP.img=c.toDataURL('image/jpeg',.88);if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();return true;}
async function snapEnsureCam(){if(SNAP.stream)return true;try{SNAP.stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});renderSnap();return true;}catch(_){toast(t('Allow the camera in Settings'));return false;}}
const _renderSnap109=renderSnap;renderSnap=function(){_renderSnap109();const s=$('#snap');if(SNAP.img||SNAP.vid)return;
  s.querySelector('.smodes')?.remove();const fn=s.querySelector('.fname');if(fn&&fn.textContent===t('Tap to record · max 60 s'))fn.textContent=fName(filterById(SNAP.filter));
  s.insertAdjacentHTML('beforeend',`<button class="sgal" id="snapGal2" aria-label="${t('Gallery')}">${SV('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>')}</button><div class="shint">${t('Tap for photo · hold for video')}</div>`);
  $('#snapGal2').onclick=async()=>{const fl=await pickFile('image/*,video/*');if(!fl)return;
    if(fl.type.startsWith('video')){const url=URL.createObjectURL(fl);const fr=await videoFrame(url);if(fr&&fr.dur>61){toast(t('Video is too long (max 60 s)'));return;}if(fl.size>50*1024*1024){toast(t('This video is too big (max 50 MB).'));return;}
      if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}SNAP.vidBlob=fl;SNAP.vid=url;SNAP.vidDur=fr?fmtSec(fr.dur):'';renderSnap();return;}
    SNAP.img=await downscale(await readFile(fl),1000,.85);if(SNAP.stream){SNAP.stream.getTracks().forEach(z=>z.stop());SNAP.stream=null;}renderSnap();};
  const sh=$('#snapShut');if(!sh)return;sh.onclick=null;sh.classList.remove('vid');sh.style.touchAction='none';let hold=null,held=false;
  sh.onpointerdown=async e=>{e.preventDefault();try{sh.setPointerCapture(e.pointerId);}catch(_){}held=false;if(!SNAP.stream){await snapEnsureCam();return;}
    hold=setTimeout(()=>{held=true;sh.classList.add('vid','holding');startVidRec();},350);};
  sh.onpointerup=()=>{clearTimeout(hold);sh.classList.remove('holding');if(held){stopVidRec();held=false;return;}if(SNAP.stream)snapPhoto();};
  sh.onpointercancel=()=>{clearTimeout(hold);if(held){stopVidRec();held=false;}};sh.oncontextmenu=e=>e.preventDefault();};

/* v11.0 opening intro (like a movie studio logo): original R-Style animation + original sound, every time the app opens */
(function(){if(/[?&]nointro/.test(location.search))return;
 const GOLD=(()=>{try{const x=JSON.parse(localStorage.getItem('rstyle_v3')||'{}');return !!(x.vip||(x.bdayVip&&x.bdayVip===new Date().toISOString().slice(0,10)));}catch(_){return false}})();
 const css=document.createElement('style');css.textContent=`
#rsIntro{position:fixed;inset:0;z-index:100000;background:#000;display:grid;place-items:center;overflow:hidden;cursor:pointer;transition:opacity .45s}
#rsIntro.out{opacity:0;pointer-events:none}
#rsIntro .wrap{position:relative;display:flex;align-items:center;font:900 50px/1 Inter,-apple-system,system-ui,sans-serif;letter-spacing:2px;color:#fff}
#rsIntro .r{display:inline-block;color:#E11D2E;font-size:112px;text-shadow:0 0 30px rgba(225,29,46,.9),0 0 90px rgba(225,29,46,.6);transform:scale(3.2);opacity:0;animation:rsR 1.1s cubic-bezier(.2,.9,.2,1) .15s forwards}
#rsIntro .rest{display:inline-block;overflow:hidden;max-width:0;white-space:nowrap;animation:rsRest .6s cubic-bezier(.3,.8,.2,1) 1.15s forwards}
#rsIntro .rest span{display:inline-block;transform:translateX(-30px);opacity:0;animation:rsTxt .5s ease-out 1.25s forwards}
#rsIntro .beam{position:absolute;left:50%;top:50%;width:2px;height:140vh;background:linear-gradient(180deg,transparent,#E11D2E 40%,#ff6b75 50%,#E11D2E 60%,transparent);transform-origin:center;opacity:0;filter:blur(1px)}
#rsIntro .beam:nth-child(1){animation:rsBeam 1.2s ease-out .25s forwards;--rot:-18deg}#rsIntro .beam:nth-child(2){animation:rsBeam 1.2s ease-out .32s forwards;--rot:12deg}
#rsIntro .beam:nth-child(3){animation:rsBeam 1.2s ease-out .4s forwards;--rot:-6deg}#rsIntro .beam:nth-child(4){animation:rsBeam 1.2s ease-out .47s forwards;--rot:24deg}
#rsIntro .flash{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(225,29,46,.55),transparent 55%);opacity:0;animation:rsFlash 1.4s ease-out 1.0s forwards}
#rsIntro .tagline{position:absolute;bottom:22%;left:0;right:0;text-align:center;color:rgba(255,255,255,.75);font:600 15px/1.4 Inter,system-ui;letter-spacing:6px;opacity:0;animation:rsTag .6s ease-out 1.7s forwards}
@keyframes rsR{0%{transform:scale(3.2);opacity:0;filter:blur(12px)}60%{opacity:1;filter:blur(0)}100%{transform:scale(1);opacity:1}}
@keyframes rsRest{to{max-width:300px}}@keyframes rsTxt{to{transform:none;opacity:1}}
@keyframes rsBeam{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--rot)) scaleY(.1)}40%{opacity:.9}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--rot)) scaleY(1.2) translateX(140px)}}
@keyframes rsFlash{0%{opacity:0}25%{opacity:1}100%{opacity:.25}}@keyframes rsTag{to{opacity:1}}
#rsIntro.gold .r{color:#E8C25A;text-shadow:0 0 30px rgba(232,194,90,.9),0 0 90px rgba(212,175,55,.6)}#rsIntro.gold .rest span{background:linear-gradient(180deg,#FFF1C1,#D4AF37 55%,#9C7A1E);-webkit-background-clip:text;background-clip:text;color:transparent}#rsIntro.gold .beam{background:linear-gradient(180deg,transparent,#D4AF37 40%,#FFE9A8 50%,#D4AF37 60%,transparent)}#rsIntro.gold .flash{background:radial-gradient(circle at 50% 50%,rgba(212,175,55,.55),transparent 55%)}#rsIntro.gold .tagline{color:#E8C25A}#rsIntro .gl{position:absolute;width:6px;height:6px;border-radius:50%;background:#FFE9A8;box-shadow:0 0 8px 2px #D4AF37;opacity:0;animation:rsGl 1.2s ease-out forwards}@keyframes rsGl{0%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:scale(1.2)}100%{opacity:0;transform:translateY(40px) scale(.4)}}#rsIntro.wait .gl{display:none}
#rsIntro.wait *{animation-play-state:paused!important}#rsIntro .tap{position:absolute;bottom:14%;left:0;right:0;text-align:center;color:#fff;font:700 17px Inter,system-ui;opacity:0;transition:opacity .3s}#rsIntro.wait .tap{opacity:.9;animation:rsPulse 1.4s ease-in-out infinite!important;animation-play-state:running!important}#rsIntro.wait .r{opacity:.7;transform:scale(1);filter:none}@keyframes rsPulse{50%{opacity:.35}}`;document.head.appendChild(css);
 const el=document.createElement('div');el.id='rsIntro';if(GOLD)el.classList.add('gold');
 el.innerHTML='<i class="beam"></i><i class="beam"></i><i class="beam"></i><i class="beam"></i><div class="flash"></div><div class="wrap" dir="ltr"><span class="r">'+(GOLD?'G':'R')+'</span><span class="rest"><span>-STYLE</span></span></div><div class="tagline">'+(GOLD?'GOLD STYLE':'STYLE · AI · FRIENDS')+'</div><div class="tap">'+({he:'לחצו כדי להיכנס',fr:'Touche pour entrer',ar:'اضغط للدخول'}[(()=>{try{return JSON.parse(localStorage.getItem('rstyle_v3')||'{}').lang}catch(_){return ''}})()]||'Tap to enter')+'</div>';
 if(GOLD){let h='';for(let i=0;i<46;i++)h+=`<i class="gl" style="left:${10+Math.random()*80}%;top:${28+Math.random()*44}%;animation-delay:${1+Math.random()*1.7}s"></i>`;el.insertAdjacentHTML('beforeend',h);}
 document.body.appendChild(el);
 /* original sound: deep "boom" + bright rising chord (made with Web Audio, no music files) */
 let played=false;
 /* the sound is drawn into a small WAV file first, then played with a normal <audio> (works on iPhone, even in silent mode) */
 function design(c,t,gold){const out=c.createGain();out.gain.value=gold?.6:.62;
   /* reverb made from a short noise tail */
   const rv=c.createConvolver(),L=Math.floor(c.sampleRate*1.8),ir=c.createBuffer(2,L,c.sampleRate);for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<L;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/L,2.6);}rv.buffer=ir;
   const wet=c.createGain();wet.gain.value=.35;out.connect(c.destination);out.connect(rv);rv.connect(wet).connect(c.destination);
   const env=(g,t0,a,peak,dec)=>{g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(peak,t0+a);g.gain.exponentialRampToValueAtTime(.0005,t0+a+dec);};
   /* 1. soft deep hit */
   const k=c.createOscillator(),kg=c.createGain();k.type='sine';k.frequency.setValueAtTime(gold?98:92,t);k.frequency.exponentialRampToValueAtTime(40,t+.6);env(kg,t,.01,.9,1.1);k.connect(kg).connect(out);k.start(t);k.stop(t+1.3);
   /* 2. rising swell */
   const sw=c.createOscillator(),sf=c.createBiquadFilter(),sg=c.createGain();sw.type='sawtooth';sw.frequency.value=gold?155.56:146.83;sf.type='lowpass';sf.frequency.setValueAtTime(200,t);sf.frequency.exponentialRampToValueAtTime(2400,t+1);sg.gain.setValueAtTime(0,t);sg.gain.linearRampToValueAtTime(.09,t+.9);sg.gain.exponentialRampToValueAtTime(.0005,t+1.25);sw.connect(sf).connect(sg).connect(out);sw.start(t);sw.stop(t+1.3);
   /* 3. warm pad chord */
   const root=gold?311.13:293.66;const chord=gold?[0.5,1,1.26,1.5,1.89,2.52]:[0.5,1,1.25,1.5,1.88,2.25];
   chord.forEach((m,j)=>{[-6,6].forEach(det=>{const o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type=j<2?'triangle':'sawtooth';o.frequency.value=root*m;o.detune.value=det;f.type='lowpass';f.frequency.value=gold?2600:1800;
     g.gain.setValueAtTime(0,t+.95);g.gain.linearRampToValueAtTime(j<2?.05:.022,t+1.25);g.gain.setValueAtTime(j<2?.05:.022,t+2.1);g.gain.exponentialRampToValueAtTime(.0005,t+3.2);o.connect(f).connect(g).connect(out);o.start(t+.95);o.stop(t+3.3);});});
   /* 4. bell melody */
   const notes=gold?[[2,1.0],[2.52,1.12],[3,1.24],[3.78,1.36],[4,1.5],[5.04,1.7]]:[[2,1.0],[2.5,1.13],[3,1.26],[4,1.42],[3.75,1.62]];
   notes.forEach(([m,dl])=>{const f0=root*m;[[1,.12],[2.01,.04],[3.02,.02]].forEach(([h,vol])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f0*h;env(g,t+dl,.005,vol,gold?1.4:1.1);o.connect(g).connect(out);o.start(t+dl);o.stop(t+dl+1.6);});});
   /* 5. sparkle */
   const nb=c.createBuffer(1,Math.floor(c.sampleRate*1.2),c.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=(Math.random()*2-1)*Math.pow(1-i/nd.length,4);const ns=c.createBufferSource();ns.buffer=nb;const hf=c.createBiquadFilter();hf.type='highpass';hf.frequency.value=6000;const ngn=c.createGain();ngn.gain.value=gold?.12:.07;ns.connect(hf).connect(ngn).connect(out);ns.start(t+.98);
   /* 6. Gold only: glitter (lots of tiny bright pings) */
   if(gold){let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
     for(let i=0;i<70;i++){const dl=1.0+rnd()*1.9,f0=3000+rnd()*6000,o=c.createOscillator(),g=c.createGain(),pn=c.createStereoPanner?c.createStereoPanner():null;o.type='sine';o.frequency.value=f0;
       env(g,t+dl,.002,.018+rnd()*.025,.12+rnd()*.25);if(pn){pn.pan.value=rnd()*2-1;o.connect(g).connect(pn).connect(out);}else o.connect(g).connect(out);o.start(t+dl);o.stop(t+dl+.45);}}}
 function toWav(ab){const ch=ab.getChannelData(0),sr=ab.sampleRate,len=ch.length,buf=new ArrayBuffer(44+len*2),v=new DataView(buf);const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
   w(0,'RIFF');v.setUint32(4,36+len*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,len*2,true);
   for(let i=0;i<len;i++){const x=Math.max(-1,Math.min(1,ch[i]));v.setInt16(44+i*2,x*32767,true);}return new Blob([buf],{type:'audio/wav'});}
 const audio=new Audio();window.__rsAudio=audio;audio.preload='auto';audio.setAttribute('playsinline','');
 try{const O=window.OfflineAudioContext||window.webkitOfflineAudioContext;const oc=new O(1,32000*3.6,32000);design(oc,0.02,GOLD);const pr=oc.startRendering();
   const fin=ab=>{audio.src=URL.createObjectURL(toWav(ab));audio.load();};if(pr&&pr.then)pr.then(fin);else oc.oncomplete=e=>fin(e.renderedBuffer);}catch(_){}
 function sound(){if(played)return;played=true;try{const p=audio.play();if(p&&p.catch)p.catch(()=>{});}catch(_){}}
 let done=false;const finish=()=>{if(done)return;done=true;try{if(navigator.audioSession)navigator.audioSession.type='auto';}catch(_){}el.classList.add('out');setTimeout(()=>el.remove(),500);};
 const go=()=>{el.classList.remove('wait');sound();setTimeout(finish,2900);};
 const native=!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
 if(native)setTimeout(go,300);else el.classList.add('wait');
 el.addEventListener('click',()=>{if(el.classList.contains('wait'))go();else finish();});})();

/* v11.1 missing translations */
(function(){const T={'Chosen for {w} weather ({d}°), from clean clothes you haven\'t worn in the last days.':['Choisi pour un temps {w} ({d}°), avec des vêtements propres que tu n’as pas portés ces derniers jours.','נבחר למזג אוויר {w} ({d}°), מבגדים נקיים שלא לבשת בימים האחרונים.','اختير لطقس {w} ({d}°)، من ملابس نظيفة لم ترتدها في الأيام الأخيرة.']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();

/* v11.2 clearer Home icon in the bottom bar: a real little house (roof, chimney, door, window) */
ICONS.home='<path d="M3 11.2 12 3.6l9 7.6"/><path d="M5.2 9.6V20.4h13.6V9.6"/><path d="M10 20.4v-5.2a2 2 0 0 1 4 0v5.2"/><path d="M16.2 5.9V3.6h2v4"/>';
(function(){const css=document.createElement('style');css.textContent=`#nav [data-go="home"].on svg path:nth-child(2){fill:currentColor;fill-opacity:.18}#nav [data-go="home"] svg{width:26px;height:26px}`;document.head.appendChild(css);
 $$('i[data-ic="home"]').forEach(el=>{el.innerHTML=SV(ICONS.home);});})();
