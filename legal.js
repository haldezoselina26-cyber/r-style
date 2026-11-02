/* R-Style legal pages: privacy.html and terms.html share this file. */
const CONTACT = ''; // official R-Style email, added when it exists
const UPDATED = { he: '3 בנובמבר 2026', fr: '3 novembre 2026', en: 'November 3, 2026' };
const contactLine = {
  he: 'בתוך האפליקציה: כפתור הדיווח על משתמש או על פוסט.' + (CONTACT ? ` במייל: ${CONTACT}` : ''),
  fr: 'Dans l\'appli : le bouton Signaler sur un utilisateur ou une publication.' + (CONTACT ? ` Par e-mail : ${CONTACT}` : ''),
  en: 'In the app: the Report button on a user or a post.' + (CONTACT ? ` By email: ${CONTACT}` : ''),
};

const PAGES = {
  privacy: {
    he: { dir: 'rtl', title: 'מדיניות פרטיות', s: [
      ['מי אנחנו', 'R-Style היא אפליקציית אופנה: ארון בגדים דיגיטלי, רובי (סטייליסטית AI), שורטס וצ\'אט עם חברים. המדיניות הזאת מסבירה איזה מידע נאסף, למה, ומה הזכויות שלך.'],
      ['איזה מידע אנחנו אוספים', '• מייל, שם משתמש ותאריך לידה (כדי ליצור חשבון ולוודא גיל 13 ומעלה).\n• תמונת פרופיל, תמונות של בגדים, לוקים ואווטאר.\n• פוסטים, תגובות, לייקים, עוקבים, חסימות ודיווחים.\n• הודעות בצ\'אט: טקסט, הקלטות קוליות, תמונות וסרטונים.\n• שיחות עם רובי ו"זיכרון" קצר של דברים חשובים (למשל השפה או הסגנון שאהבת).\n• העדפות: שפה, צבעים, הגדרות, ומנוי Gold.\nאנחנו לא אוספים מיקום, אנשי קשר או מידע פיננסי (התשלום נעשה דרך אפל).'],
      ['למה אנחנו משתמשים במידע', 'רק כדי שהאפליקציה תעבוד: להציג את הארון שלך, לתת המלצות לבוש, להראות פוסטים, לשלוח הודעות לחברים, ולשמור על בטיחות. אין פרסומות לפי מידע אישי ואין מעקב.'],
      ['בינה מלאכותית', 'השאלות לרובי והתמונות שאת שולחת אליה נשלחות ל-Google Gemini כדי לקבל תשובה. תמונות שמתפרסמות (פוסטים, צ\'אט, תמונת פרופיל) נבדקות אוטומטית כדי לחסום תוכן לא מתאים.'],
      ['איפה המידע נשמר', 'המידע נשמר בשרתי Supabase באירופה (פריז). ההעברה מוצפנת. רק את (ומי שבחרת לשתף איתו) רואה את התוכן הפרטי שלך.'],
      ['עם מי משתפים', 'אנחנו לא מוכרים מידע. משתפים רק עם ספקים שמפעילים את השירות: Supabase (שרת), Google Gemini (AI), Apple (תשלום והתראות). פוסטים בשורטס גלויים למשתמשים אחרים, אלא אם החשבון פרטי.'],
      ['בטיחות ובני נוער', 'האפליקציה מגיל 13. הודעות אפשריות רק בין חברים שעוקבים זה אחר זה. אפשר לחסום, לדווח ולהפוך את החשבון לפרטי. דיווחים נבדקים ותוכן מזיק נמחק.'],
      ['כמה זמן שומרים', 'כל עוד החשבון קיים. ההודעות עם רובי נמחקות מהמסך כל שעה. כשמוחקים את החשבון, כל המידע נמחק מהשרת.'],
      ['הזכויות שלך', 'אפשר לראות ולשנות את הפרטים שלך בהגדרות, ולמחוק את החשבון בלחיצה אחת: הגדרות ← מחיקת החשבון. לכל שאלה או בקשה אפשר לפנות אלינו.'],
      ['יצירת קשר', '__CONTACT__'],
    ] },
    fr: { dir: 'ltr', title: 'Politique de confidentialité', s: [
      ['Qui sommes-nous', 'R-Style est une appli de mode : garde-robe numérique, Ruby (styliste IA), Shorts et chat entre amis. Cette politique explique quelles données sont collectées, pourquoi, et quels sont tes droits.'],
      ['Données collectées', '• E-mail, nom d\'utilisateur et date de naissance (pour créer le compte et vérifier l\'âge de 13 ans minimum).\n• Photo de profil, photos de vêtements, looks et avatar.\n• Publications, commentaires, likes, abonnements, blocages et signalements.\n• Messages du chat : texte, vocaux, photos et vidéos.\n• Conversations avec Ruby et une courte « mémoire » des choses importantes (par exemple la langue ou le style préféré).\n• Préférences : langue, couleurs, réglages et abonnement Gold.\nNous ne collectons ni localisation, ni contacts, ni données bancaires (le paiement passe par Apple).'],
      ['Utilisation', 'Uniquement pour faire fonctionner l\'appli : afficher ta garde-robe, proposer des tenues, montrer les publications, envoyer les messages à tes amis et assurer la sécurité. Pas de publicité ciblée, pas de suivi.'],
      ['Intelligence artificielle', 'Les questions et photos envoyées à Ruby sont transmises à Google Gemini pour obtenir une réponse. Les photos publiées (posts, chat, photo de profil) sont vérifiées automatiquement pour bloquer les contenus inappropriés.'],
      ['Stockage', 'Les données sont stockées chez Supabase en Europe (Paris). Les échanges sont chiffrés. Ton contenu privé n\'est visible que par toi et les personnes avec qui tu le partages.'],
      ['Partage', 'Nous ne vendons aucune donnée. Seuls les prestataires qui font tourner le service y ont accès : Supabase (serveur), Google Gemini (IA), Apple (paiement et notifications). Les Shorts sont visibles par les autres utilisateurs, sauf compte privé.'],
      ['Sécurité et ados', 'L\'appli est réservée aux 13 ans et plus. Les messages ne sont possibles qu\'entre amis qui se suivent mutuellement. Tu peux bloquer, signaler et passer ton compte en privé. Les signalements sont examinés et les contenus nuisibles supprimés.'],
      ['Durée de conservation', 'Tant que le compte existe. La conversation avec Ruby s\'efface de l\'écran toutes les heures. À la suppression du compte, toutes les données sont effacées du serveur.'],
      ['Tes droits', 'Tu peux voir et modifier tes informations dans les Réglages et supprimer ton compte en un clic : Réglages › Supprimer mon compte. Pour toute question ou demande, contacte-nous.'],
      ['Contact', '__CONTACT__'],
    ] },
    en: { dir: 'ltr', title: 'Privacy Policy', s: [
      ['Who we are', 'R-Style is a fashion app: a digital wardrobe, Ruby (an AI stylist), Shorts and chat with friends. This policy explains what data is collected, why, and what your rights are.'],
      ['Data we collect', '• Email, username and date of birth (to create your account and check you are 13 or older).\n• Profile photo, photos of clothes, looks and avatar.\n• Posts, comments, likes, follows, blocks and reports.\n• Chat messages: text, voice notes, photos and videos.\n• Conversations with Ruby and a short "memory" of important things (for example your language or favorite style).\n• Preferences: language, colors, settings and Gold subscription.\nWe do not collect location, contacts or payment details (payment goes through Apple).'],
      ['How we use it', 'Only to make the app work: show your wardrobe, suggest outfits, show posts, deliver messages to your friends and keep everyone safe. No targeted ads, no tracking.'],
      ['Artificial intelligence', 'Questions and photos you send to Ruby are sent to Google Gemini to get an answer. Published photos (posts, chat, profile photo) are checked automatically to block inappropriate content.'],
      ['Where data is stored', 'Data is stored with Supabase in Europe (Paris). Connections are encrypted. Your private content is only visible to you and the people you share it with.'],
      ['Sharing', 'We never sell data. Only the providers that run the service have access: Supabase (server), Google Gemini (AI), Apple (payments and notifications). Shorts are visible to other users unless your account is private.'],
      ['Safety and teens', 'The app is for ages 13 and up. Messages are only possible between friends who follow each other. You can block, report and make your account private. Reports are reviewed and harmful content is removed.'],
      ['How long we keep data', 'As long as your account exists. The Ruby conversation is cleared from the screen every hour. When you delete your account, all your data is deleted from the server.'],
      ['Your rights', 'You can view and change your information in Settings and delete your account in one tap: Settings › Delete my account. For any question or request, contact us.'],
      ['Contact', '__CONTACT__'],
    ] },
  },
  terms: {
    he: { dir: 'rtl', title: 'תנאי שימוש', s: [
      ['הסכמה', 'השימוש ב-R-Style אומר שאת/ה מסכים/ה לתנאים האלה ולמדיניות הפרטיות.'],
      ['גיל', 'צריך להיות בן/בת 13 ומעלה. מתחת לגיל 18 מומלץ להשתמש עם הסכמה של הורה.'],
      ['החשבון שלך', 'שומרים על פרטי ההתחברות בסוד. אסור להתחזות לאדם אחר. אפשר למחוק את החשבון בכל זמן בהגדרות.'],
      ['מה אסור לפרסם', '• תוכן מיני, אלים, מפחיד או שנאה.\n• הצקות, בריונות או לחץ על משתמשים אחרים.\n• מידע אישי של אחרים (כתובת, טלפון, בית ספר).\n• תמונות של אנשים בלי רשותם, או תוכן שמפר זכויות יוצרים.\n• ספאם, הונאות או פרסומות.\nתוכן כזה יימחק, והחשבון יכול להיחסם.'],
      ['התוכן שלך', 'התמונות והפוסטים שלך שייכים לך. כשמפרסמים בשורטס, נותנים ל-R-Style רשות להציג אותם בתוך האפליקציה. מחיקת פוסט או חשבון מסירה אותם.'],
      ['רובי והמלצות AI', 'ההמלצות של רובי ו-AI Style Score הם רעיונות בשביל הכיף, ולא תמיד מדויקים. הם לא עצה מקצועית.'],
      ['Gold Style', 'מנוי של 10 ₪ לחודש, עם 7 ימי ניסיון חינם. התשלום והביטול נעשים דרך חשבון Apple ID, ואפשר לבטל בכל זמן. החיוב מתחדש אוטומטית עד הביטול.'],
      ['שינויים ושירות', 'אנחנו יכולים לעדכן את האפליקציה ואת התנאים. על שינוי חשוב נודיע באפליקציה. השירות ניתן "כמו שהוא", ואנחנו עושים הכול כדי שיעבוד טוב.'],
      ['יצירת קשר', '__CONTACT__'],
    ] },
    fr: { dir: 'ltr', title: 'Conditions d\'utilisation', s: [
      ['Acceptation', 'En utilisant R-Style, tu acceptes ces conditions et la politique de confidentialité.'],
      ['Âge', 'Il faut avoir au moins 13 ans. Avant 18 ans, il est conseillé d\'utiliser l\'appli avec l\'accord d\'un parent.'],
      ['Ton compte', 'Garde tes identifiants secrets. Il est interdit de se faire passer pour quelqu\'un d\'autre. Tu peux supprimer ton compte à tout moment dans les Réglages.'],
      ['Contenus interdits', '• Contenu sexuel, violent, choquant ou haineux.\n• Harcèlement, moqueries ou pression sur d\'autres utilisateurs.\n• Informations personnelles d\'autres personnes (adresse, téléphone, école).\n• Photos de personnes sans leur accord, ou contenu qui viole des droits d\'auteur.\n• Spam, arnaques ou publicités.\nCes contenus sont supprimés et le compte peut être bloqué.'],
      ['Ton contenu', 'Tes photos et publications t\'appartiennent. En publiant dans les Shorts, tu autorises R-Style à les afficher dans l\'appli. Supprimer une publication ou le compte les retire.'],
      ['Ruby et l\'IA', 'Les conseils de Ruby et l\'AI Style Score sont des idées pour s\'amuser et ne sont pas toujours exacts. Ce ne sont pas des conseils professionnels.'],
      ['Gold Style', 'Abonnement à 10 ₪/mois avec 7 jours d\'essai gratuit. Paiement et résiliation via ton identifiant Apple, annulable à tout moment. Le renouvellement est automatique jusqu\'à l\'annulation.'],
      ['Changements et service', 'Nous pouvons mettre à jour l\'appli et ces conditions. Les changements importants seront annoncés dans l\'appli. Le service est fourni « tel quel » et nous faisons tout pour qu\'il fonctionne bien.'],
      ['Contact', '__CONTACT__'],
    ] },
    en: { dir: 'ltr', title: 'Terms of Use', s: [
      ['Agreement', 'By using R-Style you agree to these terms and to the privacy policy.'],
      ['Age', 'You must be 13 or older. Under 18, we recommend using the app with a parent\'s permission.'],
      ['Your account', 'Keep your login details secret. Do not pretend to be someone else. You can delete your account at any time in Settings.'],
      ['Not allowed', '• Sexual, violent, shocking or hateful content.\n• Harassment, bullying or pressuring other users.\n• Other people\'s personal information (address, phone, school).\n• Photos of people without their permission, or content that infringes copyright.\n• Spam, scams or ads.\nSuch content is removed and the account may be blocked.'],
      ['Your content', 'Your photos and posts belong to you. When you post in Shorts, you allow R-Style to show them inside the app. Deleting a post or your account removes them.'],
      ['Ruby and AI', 'Ruby\'s suggestions and the AI Style Score are ideas for fun and are not always accurate. They are not professional advice.'],
      ['Gold Style', 'A subscription of 10 ₪/month with a 7-day free trial. Payment and cancellation go through your Apple ID, and you can cancel anytime. It renews automatically until cancelled.'],
      ['Changes and service', 'We may update the app and these terms. Important changes will be announced in the app. The service is provided "as is" and we do our best to keep it working well.'],
      ['Contact', '__CONTACT__'],
    ] },
  },
};

const LABELS = { he: ['עדכון אחרון', 'מדיניות פרטיות', 'תנאי שימוש'], fr: ['Dernière mise à jour', 'Confidentialité', 'Conditions'], en: ['Last updated', 'Privacy', 'Terms'] };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function render(lang) {
  const page = document.body.dataset.page, p = PAGES[page][lang], L = LABELS[lang];
  document.documentElement.lang = lang; document.documentElement.dir = p.dir; document.title = 'R-Style · ' + p.title;
  document.querySelectorAll('.langs button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  document.getElementById('doc').innerHTML = `<h1>${esc(p.title)}</h1><p class="up">${L[0]}: ${UPDATED[lang]}</p>` +
    p.s.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t === '__CONTACT__' ? contactLine[lang] : t).replace(/\n/g, '<br>')}</p>`).join('') +
    `<p class="links"><a href="privacy.html?l=${lang}">${L[1]}</a> · <a href="terms.html?l=${lang}">${L[2]}</a></p>`;
}
const q = new URLSearchParams(location.search).get('l');
const nav = (navigator.language || 'en').slice(0, 2);
let cur = ['he', 'fr', 'en'].includes(q) ? q : ['he', 'fr'].includes(nav) ? nav : 'en';
document.querySelectorAll('.langs button').forEach(b => b.onclick = () => { cur = b.dataset.l; render(cur); });
render(cur);
