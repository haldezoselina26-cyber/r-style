/* ====================== R-Style camera v13: 300 Snapchat-style filters, one engine (WebGL + canvas) ====================== */
(function(){
/* keep the old simple filters for video calls only */
const OLD=FILTERS.filter(f=>!f.bx);window.CALLF=OLD;
const _fbi=filterById;filterById=function(k){return FILTERS.find(f=>f.k===k)||OLD.find(f=>f.k===k)||FILTERS[0];};
FILTERS.length=0;FILTERS.push({k:'none',n:'None',css:'none',cat:'all'});
})();

/* ---------- stickers (drawn on the face) ---------- */
Object.assign(OVL,{
 bearE:'<svg viewBox="0 0 120 40"><g fill="#8B5A2B"><circle cx="16" cy="22" r="16"/><circle cx="104" cy="22" r="16"/></g><g fill="#D9A877"><circle cx="16" cy="24" r="8"/><circle cx="104" cy="24" r="8"/></g></svg>',
 foxE:'<svg viewBox="0 0 120 50"><g fill="#E8762B"><path d="M6 48L18 2l26 34zM114 48L102 2 76 36z"/></g><g fill="#fff"><path d="M14 40l6-26 14 18zM106 40l-6-26-14 18z"/></g></svg>',
 koalaE:'<svg viewBox="0 0 120 46"><g fill="#8E8E96"><circle cx="18" cy="24" r="18"/><circle cx="102" cy="24" r="18"/></g><g fill="#E9E4EC"><circle cx="18" cy="26" r="10"/><circle cx="102" cy="26" r="10"/></g></svg>',
 wolfE:'<svg viewBox="0 0 120 50"><g fill="#5B5F66"><path d="M8 48L16 0l28 34zM112 48L104 0 76 34z"/></g><g fill="#C9CDD3"><path d="M16 40l4-28 14 18zM104 40l-4-28-14 18z"/></g></svg>',
 pandaE:'<svg viewBox="0 0 120 40"><g fill="#111"><circle cx="16" cy="22" r="16"/><circle cx="104" cy="22" r="16"/></g></svg>',
 deer:'<svg viewBox="0 0 140 70"><g stroke="#8B5A2B" stroke-width="6" stroke-linecap="round" fill="none"><path d="M40 68C34 46 26 34 12 22M30 46L14 44M24 34L22 14M100 68c6-22 14-34 28-46M110 46l16-2M116 34l2-20"/></g><g fill="#B5835A"><ellipse cx="44" cy="64" rx="12" ry="7" transform="rotate(-30 44 64)"/><ellipse cx="96" cy="64" rx="12" ry="7" transform="rotate(30 96 64)"/></g></svg>',
 deerN:'<svg viewBox="0 0 40 30"><ellipse cx="20" cy="15" rx="17" ry="12" fill="#4A2C1A"/><ellipse cx="14" cy="10" rx="5" ry="3" fill="#fff" opacity=".35"/></svg>',
 unicorn:'<svg viewBox="0 0 120 80"><defs><linearGradient id="ug" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFD1F0"/><stop offset=".5" stop-color="#C7B8FF"/><stop offset="1" stop-color="#FFF6B0"/></linearGradient></defs><path d="M60 0L72 66H48z" fill="url(#ug)" stroke="#E5B8E8" stroke-width="2"/><g stroke="#fff" stroke-width="2.5" opacity=".8"><path d="M52 50l16-6M54 36l13-5M56 22l9-4"/></g><g fill="#fff" stroke="#F3C6E8" stroke-width="2"><path d="M8 78L18 40l20 26zM112 78l-10-38-20 26z"/></g><g fill="#FFB3DA"><path d="M15 70l5-20 10 14zM105 70l-5-20-10 14z"/></g></svg>',
 fairyW:'<svg viewBox="0 0 160 70"><g opacity=".75" stroke="#fff" stroke-width="2"><path d="M80 40C60 0 14 0 8 22s34 30 72 18z" fill="#BDE8FF"/><path d="M80 40c20-40 66-40 72-18s-34 30-72 18z" fill="#FFC8EC"/><path d="M80 42C60 60 30 72 24 60s26-22 56-18z" fill="#E4D2FF"/><path d="M80 42c20 18 50 30 56 18s-26-22-56-18z" fill="#E4D2FF"/></g></svg>',
 angelW:'<svg viewBox="0 0 220 110"><g fill="#fff" stroke="#E5E7EB" stroke-width="2"><path d="M100 60C70 10 20 0 4 20c18 2 30 8 40 16-16 0-28 4-36 12 18 0 32 4 42 10-12 2-22 8-26 16 24-6 52-4 76-14z"/><path d="M120 60c30-50 80-60 96-40-18 2-30 8-40 16 16 0 28 4 36 12-18 0-32 4-42 10 12 2 22 8 26 16-24-6-52-4-76-14z"/></g></svg>',
 dragonW:'<svg viewBox="0 0 220 110"><g fill="#7A0F1E" stroke="#3B0710" stroke-width="2.5"><path d="M100 70L60 6 52 40 30 18 26 52 4 40l20 46 30-10 20 14z"/><path d="M120 70l40-64 8 34 22-22 4 34 22-12-20 46-30-10-20 14z"/></g><g stroke="#C0263A" stroke-width="2" fill="none"><path d="M60 6l-6 70M30 18l24 58M120 70l40-64M190 18l-24 58"/></g></svg>',
 leafC:'<svg viewBox="0 0 140 50"><path d="M8 44Q70 0 132 44" stroke="#2F7D32" stroke-width="3" fill="none"/><g fill="#43A047">'+[14,30,46,62,78,94,110,126].map((x,i)=>`<ellipse cx="${x}" cy="${[38,26,18,14,14,18,26,38][i]}" rx="9" ry="5" transform="rotate(${[-50,-35,-20,-6,6,20,35,50][i]} ${x} ${[38,26,18,14,14,18,26,38][i]})"/>`).join('')+'</g></svg>',
 lotusC:'<svg viewBox="0 0 140 50"><g fill="#F9A8D4" stroke="#EC4899" stroke-width="1.5">'+[22,46,70,94,118].map((x,i)=>{const y=[34,22,16,22,34][i];return `<path d="M${x} ${y+12}C${x-12} ${y} ${x-6} ${y-14} ${x} ${y-16}C${x+6} ${y-14} ${x+12} ${y} ${x} ${y+12}z"/><path d="M${x} ${y+12}C${x-18} ${y+6} ${x-16} ${y-4} ${x-10} ${y-6}M${x} ${y+12}C${x+18} ${y+6} ${x+16} ${y-4} ${x+10} ${y-6}" fill="#FBCFE8"/>`;}).join('')+'</g></svg>',
 crystalC:'<svg viewBox="0 0 120 56"><g stroke="#fff" stroke-width="1.5" opacity=".9"><path d="M10 54l6-26 8 26z" fill="#BAE6FD"/><path d="M28 54l8-38 10 38z" fill="#E0F2FE"/><path d="M50 54l10-52 10 52z" fill="#C7D2FE"/><path d="M74 54l10-38 8 38z" fill="#E0F2FE"/><path d="M96 54l8-26 6 26z" fill="#BAE6FD"/></g><path d="M6 54h108" stroke="#E0F2FE" stroke-width="4"/></svg>',
 diamondC:'<svg viewBox="0 0 120 60"><path d="M8 54L14 14l22 18L60 2l24 30 22-18 6 40z" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="2" stroke-linejoin="round"/><g fill="#60A5FA" stroke="#fff" stroke-width="1"><path d="M60 26l7 8-7 10-7-10z"/><path d="M34 36l5 6-5 7-5-7z"/><path d="M86 36l5 6-5 7-5-7z"/></g><path d="M8 54h104" stroke="#fff" stroke-width="5"/></svg>',
 starC:'<svg viewBox="0 0 140 50"><path d="M8 44Q70 6 132 44" stroke="#D4AF37" stroke-width="3" fill="none"/><g fill="#FCD34D" stroke="#B88A10" stroke-width="1">'+[[20,36,7],[44,22,9],[70,14,12],[96,22,9],[120,36,7]].map(([x,y,r])=>{let d='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.45:r;d+=(k?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+' '+(y+Math.sin(a)*rr).toFixed(1);}return `<path d="${d}z"/>`;}).join('')+'</g></svg>',
 lightsC:'<svg viewBox="0 0 140 50"><path d="M6 30Q70 -2 134 30" stroke="#3F3F46" stroke-width="2" fill="none"/>'+[14,32,50,70,90,108,126].map((x,i)=>{const y=30-24*Math.sin(Math.PI*(x-6)/128)+6;const c=['#F87171','#FBBF24','#34D399','#60A5FA','#F472B6','#FBBF24','#A78BFA'][i];return `<circle cx="${x}" cy="${y.toFixed(1)}" r="9" fill="${c}" opacity=".35"/><ellipse cx="${x}" cy="${y.toFixed(1)}" rx="3.5" ry="5" fill="${c}"/>`;}).join('')+'</svg>',
 laurel:'<svg viewBox="0 0 140 50"><g fill="#C9A227">'+Array.from({length:7},(_,i)=>{const a=Math.PI*(.95-i*.07),x=70+62*Math.cos(a),y=48-36*Math.sin(a);const b=Math.PI*(.05+i*.07),x2=70+62*Math.cos(b),y2=48-36*Math.sin(b);return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="8" ry="4" transform="rotate(${(-i*10-30)} ${x.toFixed(1)} ${y.toFixed(1)})"/><ellipse cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" rx="8" ry="4" transform="rotate(${(i*10+30)} ${x2.toFixed(1)} ${y2.toFixed(1)})"/>`;}).join('')+'</g></svg>',
 springC:'<svg viewBox="0 0 140 50"><path d="M8 40Q70 2 132 40" stroke="#65A30D" stroke-width="3" fill="none"/>'+[[14,36,'#FDE047'],[34,24,'#F472B6'],[56,16,'#93C5FD'],[78,15,'#FCA5A5'],[100,20,'#C4B5FD'],[122,32,'#FDE047']].map(([x,y,c])=>[0,72,144,216,288].map(a=>`<circle cx="${(x+6*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(y+6*Math.sin(a*Math.PI/180)).toFixed(1)}" r="4.5" fill="${c}"/>`).join('')+`<circle cx="${x}" cy="${y}" r="3.5" fill="#F59E0B"/>`).join('')+'</svg>',
 pearl:'<svg viewBox="0 0 30 30"><circle cx="15" cy="15" r="12" fill="#F8F4EC"/><circle cx="15" cy="15" r="12" fill="none" stroke="#E7DCC8" stroke-width="1.5"/><circle cx="11" cy="10" r="4" fill="#fff"/></svg>',
 tears:'<svg viewBox="0 0 120 40"><g fill="#BFE9FF" stroke="#fff" stroke-width="1.5"><path d="M22 4c-6 10-9 15-9 20a9 9 0 0 0 18 0c0-5-3-10-9-20z"/><path d="M98 4c-6 10-9 15-9 20a9 9 0 0 0 18 0c0-5-3-10-9-20z"/></g><g fill="#fff"><circle cx="19" cy="22" r="2.5"/><circle cx="95" cy="22" r="2.5"/></g></svg>',
 tongue:'<svg viewBox="0 0 40 40"><path d="M6 2h28v20a14 14 0 0 1-28 0z" fill="#F472B6"/><path d="M20 4v20" stroke="#DB2777" stroke-width="2"/></svg>',
 lace:'<svg viewBox="0 0 140 50"><path d="M4 18C20 2 56 6 70 18 84 6 120 2 136 18c-4 20-28 30-46 26-10-2-14-10-20-10s-10 8-20 10C32 48 8 38 4 18z" fill="#111" fill-opacity=".88"/><g fill="none" stroke="#555" stroke-width="1">'+Array.from({length:9},(_,i)=>`<circle cx="${14+i*14}" cy="${i%2?14:40}" r="4"/>`).join('')+'</g><g fill="#F5F5F5"><ellipse cx="40" cy="24" rx="16" ry="9"/><ellipse cx="100" cy="24" rx="16" ry="9"/></g></svg>',
 mystery:'<svg viewBox="0 0 140 70"><path d="M6 20C30 0 110 0 134 20c-2 22-16 40-40 42-10 0-16-8-24-8s-14 8-24 8C22 60 8 42 6 20z" fill="#F4F1EA" stroke="#C9C2B0" stroke-width="2"/><g fill="#111"><path d="M30 24q12-8 26 0-12 10-26 0z"/><path d="M84 24q14-8 26 0-14 10-26 0z"/></g><path d="M50 44q20 10 40 0" stroke="#B91C1C" stroke-width="3" fill="none"/></svg>',
 cyber:'<svg viewBox="0 0 140 60"><path d="M4 10h132l-8 26-30 18H42L12 36z" fill="#3F444C" stroke="#9AA3AF" stroke-width="2"/><g fill="#22D3EE"><path d="M24 20h34l-6 10H28z"/><path d="M82 20h34l-4 10H88z"/></g><g stroke="#22D3EE" stroke-width="1.5"><path d="M50 44h40M60 50h20"/></g></svg>',
 catMask:'<svg viewBox="0 0 140 56"><path d="M4 30L10 2l22 16C48 10 92 10 108 18L130 2l6 28c-4 16-26 24-44 20-10-2-14-10-22-10s-12 8-22 10C30 54 8 46 4 30z" fill="#1F1F23"/><g fill="#D4AF37">'+Array.from({length:22},(_,i)=>`<circle cx="${(10+((i*53)%120)).toFixed(0)}" cy="${(10+((i*29)%36)).toFixed(0)}" r="${1+(i%3)*.6}"/>`).join('')+'</g><g fill="#F5F5F5" fill-opacity=".05"><ellipse cx="44" cy="32" rx="15" ry="8"/><ellipse cx="96" cy="32" rx="15" ry="8"/></g></svg>',
 butterflyM:'<svg viewBox="0 0 160 70"><g stroke="#fff" stroke-width="1.5"><path d="M80 34C66 4 20 -4 8 16s20 40 72 18z" fill="#8B5CF6"/><path d="M80 34c14-30 60-38 72-18s-20 40-72 18z" fill="#EC4899"/><path d="M80 36C60 54 30 72 22 60s24-26 58-24z" fill="#60A5FA"/><path d="M80 36c20 18 50 36 58 24s-24-26-58-24z" fill="#F59E0B"/></g><g fill="#111" fill-opacity=".85"><ellipse cx="50" cy="28" rx="15" ry="9"/><ellipse cx="110" cy="28" rx="15" ry="9"/></g></svg>'});
const FXC={};
function stickerImg(k){if(k.startsWith('e:'))return null;return svgImg(k);}

/* ---------- filter list: [en, fr, he, emoji, spec] ---------- */
/* spec: b = skin / make-up / colors, fx = special effect, p = particles, s = face stickers, o = overlays */
const SPK=(n,m)=>({t:'spark',n,m:m||'float'});
const F300=[
/* 1-60 make-up & beauty */
['Perfect natural','Naturel parfait','מייק-אפ טבעי','✨',{b:{sm:.6,sk:.2,lip:'#C97B7B',la:.25,bl:'#F2A7A0',ba:.3,lash:.4}}],
['Porcelain glow','Éclat porcelaine','זוהר חרסינה','🤍',{b:{sm:.9,sk:.45,gl:.4,sa:.9}}],
['Long lashes','Longs cils','ריסים ארוכים','👁️',{b:{sm:.4,lash:1}}],
['Deep matte red','Rouge mat profond','אודם מט עמוק','💄',{b:{sm:.4,lip:'#7A1022',la:.75}}],
['Gold freckles','Taches dorées','נמשים מוזהבים','✨',{b:{sm:.4,frk:'#C9A227'}}],
['Soft contour','Contouring doux','קונטור עדין','🔆',{b:{sm:.5,co:.8,hl:.5}}],
['Sharp chin','Menton sculpté','סנטר חד','💎',{b:{sm:.5,sl:.45,jw:.6}}],
['Cat eyeliner','Eye-liner chat','אייליינר חתולי','🐱',{b:{sm:.4,ln:1}}],
['Glossy lips','Gloss brillant','גלוס מבריק','💋',{b:{sm:.4,lip:'#E07A8A',la:.35,gloss:1}}],
['Pink blush','Blush rose','סומק ורוד','🌸',{b:{sm:.4,bl:'#FF8FAB',ba:.6}}],
['Perfect brows','Sourcils parfaits','גבות מושלמות','〰️',{b:{sm:.4,bw:.7}}],
['Metallic eyes','Fard métallique','צלליות מטאליות','🪙',{b:{sm:.4,es:'#B08D57',ea:.55,mt:1}}],
['Bright under-eyes','Regard reposé','הבהרה מתחת לעיניים','☀️',{b:{sm:.5,uw:1}}],
['Sun-kissed','Bronzé soleil','שזוף שמש','🌞',{b:{sm:.5,wa:.6,co:.5,bl:'#D9774F',ba:.4,frk:'#8B5A2B'}}],
['No make-up','Sans maquillage','ללא איפור','🫧',{b:{sm:.5,sk:.15,lip:'#C98B8B',la:.15}}],
['Fuller lips','Lèvres pulpeuses','שפתיים מלאות','👄',{b:{sm:.4,lp:.5,lip:'#C9737E',la:.25}}],
['White liner','Liner blanc','אייליינר לבן','🤍',{b:{sm:.4,wl:1,ln:.4}}],
['Nose freckles','Taches de rousseur','נמשים על האף','🟤',{b:{sm:.3,frk:'#8B4A2B',frn:1.6}}],
['Matte skin','Teint mat','עור מט אחיד','🧴',{b:{sm:.85,sk:.15,ct:1.03,sa:.95}}],
['Beauty mark','Grain de beauté','נקודת חן','⚫',{b:{sm:.4,mole:1}}],
['Dramatic lashes','Cils XXL','ריסים דרמטיים','🖤',{b:{sm:.4,lash:1.6,ln:.6}}],
['Glitter lids','Paupières pailletées','צללית נצנצים','✨',{b:{sm:.4,es:'#E8C4A0',ea:.4,gs:1}}],
['Sparkling red','Rouge pailleté','אודם אדום נוצץ','❤️',{b:{sm:.4,lip:'#C8102E',la:.7,gloss:.6,lgs:1}}],
['Purple eyes','Yeux violets','עיניים סגולות','💜',{b:{sm:.4,es:'#6A3D9A',ea:.6,ln:.6}}],
['Warm peach','Pêche chaude','גוון אפרסק','🍑',{b:{sm:.5,wa:.35,bl:'#F4A28C',ba:.5,sh:'#a05040',hi:'#ffe0d0',st:.2}}],
['Slim nose','Nez affiné','אף עדין','👃',{b:{sm:.4,ns:.6,co:.3}}],
['Cheek highlight','Highlighter','היילייט בלחיים','🌟',{b:{sm:.5,hl:1}}],
['Porcelain doll','Poupée de porcelaine','בובת חרסינה','🎎',{b:{sm:1,sk:.5,ey:.2,sl:.2,bl:'#FFA5B5',ba:.5,lip:'#E2566F',la:.4,lash:.8}}],
['Double liner','Double liner','אייליינר כפול','🌈',{b:{sm:.4,dl:['#00B4D8','#F72585']}}],
['Blue lenses','Lentilles bleues','עדשות תכלת','🔵',{b:{sm:.4,ir:'#3FA9F5'}}],
['Green lenses','Lentilles vertes','עדשות ירוקות','🟢',{b:{sm:.4,ir:'#4CC38A'}}],
['Honey lenses','Lentilles miel','עדשות דבש','🍯',{b:{sm:.4,ir:'#C68A2E'}}],
['Grey lenses','Lentilles grises','עדשות אפורות','🩶',{b:{sm:.4,ir:'#A7B1BC'}}],
['90s look','Look années 90','מראה שנות ה-90','📼',{b:{sm:.4,lip:'#8B4A43',la:.5,ln:.5,ct:1.05,sa:.9,wa:.2,fa:.1,gr:.1}}],
['Glitter gloss','Gloss pailleté','גלוס נצנצים','💖',{b:{sm:.4,lip:'#F4B6C2',la:.2,gloss:1,lgs:1}}],
['Lifted mascara','Mascara recourbant','מסקרה מרימה','🪄',{b:{sm:.4,lash:1.2}}],
['Smoky eyes','Smoky eyes','סמוקי אייז','🖤',{b:{sm:.4,es:'#2B2B2B',ea:.7,ln:1}}],
['Matte powder','Poudre matifiante','פודרה מט','🧴',{b:{sm:.75,ct:1.02}}],
['Orange blush','Blush orangé','סומק כתמתם','🧡',{b:{sm:.4,bl:'#F28C5B',ba:.55}}],
['Ombre lips','Lèvres ombrées','שפתיים אומברה','👄',{b:{sm:.4,lip:'#F4A3B4',la:.35,om:'#9B111E'}}],
['Hollywood','Hollywood','זוהר הוליוודי','🎬',{b:{sm:.7,lip:'#B3122E',la:.6,ln:.9,lash:1,hl:.6,co:.4,wa:.15}}],
['Night glam','Soirée scintillante','איפור ערב נוצץ','🌙',{b:{sm:.6,es:'#3A2A4A',ea:.6,ln:1,lash:1,gs:1,lip:'#8B0A1A',la:.6}}],
['Defined eyes','Regard intense','מסגרת עיניים כהה','👁️',{b:{sm:.4,ln:1,ll:1}}],
['Flawless skin','Peau parfaite','החלקת עור מושלמת','✨',{b:{sm:1,sk:.3}}],
['Winter pale','Pâleur d\'hiver','גוון חורפי חיוור','❄️',{b:{sm:.6,sk:.35,sa:.8,wa:-.3,bl:'#F5B5C0',ba:.3}}],
['Natural flash','Flash naturel','פלאש טבעי','📸',{b:{sm:.5,br:.06,ct:1.1,sk:.3,vg:.2}}],
['Bold lips','Lèvres affirmées','שפתיים מודגשות','💋',{b:{sm:.4,lip:'#B5545C',la:.45,lp:.25}}],
['Old rose eyes','Rose ancien','ורוד עתיק','🌹',{b:{sm:.4,es:'#C48A9A',ea:.55,bl:'#E39B9B',ba:.35}}],
['Stars & freckles','Étoiles & taches','נמשים וכוכבים','⭐',{b:{sm:.4,frk:'#ffffff',frs:1}}],
['Festival glitter','Paillettes festival','נוצץ פסטיבלי','🎉',{b:{sm:.4,gs:1.5,fs:.6,es:'#B784A7',ea:.4}}],
['Soft face','Visage doux','פנים רכות','☁️',{b:{sm:.85,gl:.3,ct:.95,sl:.15}}],
['Eye shimmer','Regard lumineux','ברק סביב העיניים','💫',{b:{sm:.4,mt:1,uw:.4}}],
['Jawline','Mâchoire','הדגשת לסת','💪',{b:{sm:.4,jw:1,sl:.2}}],
['Dewy skin','Peau glowy','עור לחותי','💧',{b:{sm:.75,gl:.5,hl:.7,sk:.25}}],
['Copper eyes','Fard cuivré','צללית נחושת','🟠',{b:{sm:.4,es:'#B5651D',ea:.6,mt:.6}}],
['2000s brown','Brun années 2000','אודם חום 2000','🤎',{b:{sm:.4,lip:'#7A4E3B',la:.6}}],
['Diamond eyes','Yeux diamant','אבקת יהלומים','💎',{b:{sm:.4,es:'#D8E2F0',ea:.4,gs:1.5,mt:1}}],
['Luxury','Luxe','מראה יוקרתי','👑',{b:{sm:.75,sl:.2,hl:.6,co:.4,lip:'#A0524F',la:.4,ln:.6,lash:.8}}],
['Colored lashes','Cils colorés','ריסים צבעוניים','🩷',{b:{sm:.4,lash:1.3,lc:'#FF4FA3'}}],
['Face sculpt','Visage sculpté','עיצוב פנים','🗿',{b:{sm:.8,sl:.35,ey:.1,co:.5,ns:.3}}],
/* 61-120 light & mood */
['Golden hour','Heure dorée','שקיעה זהובה','🌅',{b:{wa:.8,sh:'#5a2a00',hi:'#ffd080',st:.35,gl:.3,sm:.3},o:['leakG']}],
['Candlelight','Lumière de bougie','אור נרות','🕯️',{b:{wa:.9,br:-.03,vg:.5,gl:.3,sh:'#3a1a00',hi:'#ffc070',st:.35},o:['candle']}],
['Sparkles','Paillettes','נצנצים מרחפים','✨',{p:[SPK(40)]}],
['Star dust','Poussière d\'étoiles','אבק כוכבים','🌠',{p:[SPK(36,'halo')]}],
['Ring light','Ring light','תאורת סטודיו','⭕',{b:{br:.05,sk:.4,sm:.6,ct:1.05},o:['ringEyes']}],
['Purple neon','Néon violet','ניאון סגול','💜',{b:{sh:'#300060',hi:'#c040ff',st:.5,ct:1.1},o:['neon:#B026FF']}],
['Pink neon','Néon rose','ניאון ורוד','💗',{b:{sh:'#400030',hi:'#ff40c0',st:.5,ct:1.1},o:['neon:#FF2E9A']}],
['Club flash','Flash de club','פלאש מועדון','📸',{b:{ct:1.3,br:.02,vg:.7,sa:1.1},o:['flash']}],
['Moonlight','Clair de lune','אור ירח','🌙',{b:{wa:-.8,br:-.04,sa:.7,vg:.5,sh:'#001030',hi:'#c0d8ff',st:.4}}],
['Direct flash','Flash direct','פלאש ישיר','⚡',{b:{br:.08,ct:1.25,vg:.35,sk:.2}}],
['Window light','Lumière de fenêtre','אור חלון','🪟',{b:{br:.04,ct:.95,wa:.2,gl:.3},o:['rays']}],
['Inner glow','Éclat intérieur','זוהר פנימי','🔮',{b:{sm:.6,gl:.6,sk:.4}}],
['Pink sunset','Coucher rose','שקיעה ורודה','🌇',{b:{sh:'#402060',hi:'#ffb0c0',st:.45,wa:.3}}],
['Sparkly eyes','Yeux qui brillent','ברק בעיניים','✨',{o:['eyeSpark']}],
['Disco','Disco','דיסקו','🪩',{b:{vg:.4},o:['disco']}],
['Sun rays','Rayons de soleil','קרני שמש','☀️',{b:{wa:.5},o:['rays']}],
['City bokeh','Bokeh de ville','בוקה עירוני','🌃',{b:{vg:.3},o:['bokeh']}],
['Pastel dream','Rêve pastel','חלום פסטל','🍭',{b:{br:.05,ct:.9,sa:.9,fa:.2,gl:.3,sh:'#a0c0ff',hi:'#ffd0f0',st:.35}}],
['Festival','Festival','פסטיבל','🎡',{o:['disco','bokeh'],p:[SPK(12)]}],
['Fairy glow','Lueur de fée','זוהר פיות','🧚',{b:{gl:.4},p:[{t:'firefly',n:30,m:'float'}]}],
['Future blue','Bleu futur','אור כחול עתידני','🔷',{b:{wa:-.7,sh:'#001040',hi:'#40c0ff',st:.5,ct:1.1}}],
['Movie light','Lumière cinéma','תאורת קולנוע','🎞️',{b:{sh:'#003040',hi:'#ffc080',st:.45,vg:.5,ct:1.12},o:['bars']}],
['Green neon','Néon vert','ניאון ירוק','💚',{b:{sh:'#002010',hi:'#40ff80',st:.5},o:['neon:#2BFF88']}],
['Warm & cool','Chaud & froid','חם על קריר','🌗',{b:{sh:'#003050',hi:'#ffb060',st:.55}}],
['Slow sparkles','Paillettes lentes','נצנצים איטיים','✨',{p:[{t:'spark',n:20,m:'float',v:.4}]}],
['Desert sunset','Coucher du désert','שקיעה במדבר','🏜️',{b:{wa:.7,sh:'#4a2000',hi:'#ffb060',st:.4},o:['leakG']}],
['Halo','Auréole','הילה זוהרת','😇',{s:[['halo','top',.85,0,-.5]],b:{gl:.3},p:[SPK(12,'halo')]}],
['Soft light','Lumière douce','תאורה רכה','🕊️',{b:{sm:.5,sk:.4,br:.03,gl:.2}}],
['Glitter snow','Neige pailletée','נצנצים כמו שלג','❄️',{p:[{t:'snowG',n:50,m:'fall'}]}],
['Sun on water','Reflets d\'eau','שמש על המים','🌊',{b:{wa:.2,sa:1.2},o:['caustics']}],
['Vignette','Vignette','תאורה ממוקדת','🎯',{b:{vg:1,ct:1.1}}],
['Color shift','Couleurs en mouvement','צבעים מתחלפים','🌈',{fx:30,fxa:1}],
['Dim romance','Romantique tamisé','רומנטי עמום','🥀',{b:{br:-.05,wa:.4,vg:.6,gl:.3,fa:.1}}],
['Lightning','Éclairs','ברקים ברקע','⚡',{o:['lightning']}],
['Flash on black','Flash fond noir','פלאש על רקע חשוך','🖤',{b:{ct:1.45,br:.02,vg:.8,sk:.3}}],
['Holiday lights','Guirlandes','אורות חג','🎄',{o:['bokehW']}],
['Spring sun','Soleil de printemps','שמש אביבית','🌷',{b:{br:.04,sa:1.15,ti:.15,wa:.2},o:['rays']}],
['Silk glow','Éclat de soie','זוהר משי','🎀',{b:{sm:.7,gl:.45,sk:.3,hl:.4}}],
['Lip glow','Lèvres lumineuses','זוהר על השפתיים','💋',{b:{sm:.3,lip:'#E8A0A8',la:.2,gloss:1,lgs:1}}],
['Half-face light','Demi-lumière','תאורה בחצי פנים','🌓',{o:['half']}],
['Far neons','Néons lointains','ניאונים ברקע','🏙️',{b:{ct:1.1},o:['bokehN']}],
['Easy flash','Flash facile','פלאש קליל','📷',{b:{br:.05,ct:1.12,sk:.2}}],
['White studio','Studio blanc','סטודיו לבן','🤍',{b:{br:.07,ct:1.05,sa:.9,sk:.3},o:['studio']}],
['Cozy glow','Douceur cocooning','זוהר ביתי','🏡',{b:{wa:.5,gl:.35,fa:.1,vg:.3}}],
['Orange sunset','Coucher orangé','שקיעה כתמתמה','🧡',{b:{wa:.7,sh:'#401000',hi:'#ff9040',st:.45}}],
['Cheek glitter','Joues pailletées','נצנצים על הלחיים','✨',{p:[{t:'spark',n:18,m:'cheeks',sz:.5}]}],
['Vivid night','Nuit saturée','לילה צבעוני','🌌',{b:{ct:1.2,sa:1.5,br:-.04,vg:.5}}],
['Spotlight','Projecteur','זרקור','🔦',{o:['spot']}],
['Cosmic','Cosmique','תאורה קוסמית','🪐',{b:{sh:'#100030',hi:'#c080ff',st:.4},o:['galaxy']}],
['Beach sunset','Coucher à la plage','שקיעה בחוף','🏖️',{b:{wa:.6,sh:'#203060',hi:'#ffb070',st:.45},o:['leakG']}],
['Y2K flash','Flash Y2K','פלאש Y2K','💿',{b:{br:.06,ct:1.15,sa:1.2,sh:'#4040ff',hi:'#ffc0ff',st:.25},p:[SPK(10,'twinkle')]}],
['Color halo','Halo coloré','הילה צבעונית','🌈',{o:['rgbHalo']}],
['Desk lamp','Lampe de bureau','מנורת שולחן','💡',{b:{wa:.7,vg:.7},o:['lamp']}],
['Cool focus','Froid intense','אור קריר','🧊',{b:{wa:-.5,vg:.6,ct:1.1}}],
['Crystal glow','Éclat cristal','זוהר קריסטלי','💎',{b:{gl:.5,sk:.3,sh:'#a0d0ff',hi:'#ffffff',st:.3},p:[SPK(15,'twinkle')]}],
['City morning','Matin en ville','בוקר עירוני','🏙️',{b:{br:.03,wa:.1,fa:.1,sa:.95},o:['rays']}],
['Motion sparkle','Éclats en mouvement','ברק בכל תנועה','💫',{p:[{t:'spark',n:25,m:'twinkle',v:2}]}],
['Soft shadows','Ombres douces','צלליות רכות','🌑',{b:{ct:1.25,sa:.85,vg:.55,br:-.03}}],
['Pastel magic','Magie pastel','זוהר פסטלי','🦄',{b:{sh:'#c0a0ff',hi:'#ffe0f0',st:.45,gl:.4,br:.04},p:[SPK(10)]}],
['Fluorescent','Fluorescent','פלורסנט','💡',{b:{wa:-.25,ti:.25,br:.04,ct:1.05},o:['flicker']}],
/* 121-180 cute */
['Cat ears','Oreilles de chat','אוזני חתול','🐱',{s:[['catE','top',1.1,0,-.18]]}],
['Black cat','Chat noir','חתול שחור','🐈‍⬛',{s:[['catE','top',1.1,0,-.18],['catW','nose',1,0,.06]]}],
['Bunny ears','Oreilles de lapin','אוזני ארנב','🐰',{s:[['bunny','top',.95,0,-.5]]}],
['Flower crown','Couronne de fleurs','כתר פרחים','🌺',{s:[['flowers','top',1.2,0,-.12]]}],
['Floating hearts','Cœurs flottants','לבבות מרחפים','💕',{p:[{t:'e:💖',n:8,m:'orbit'}]}],
['Glowing butterflies','Papillons lumineux','פרפרים זוהרים','🦋',{p:[{t:'e:🦋',n:6,m:'float'}],s:[['butterfly','top',.42,.38,-.12]]}],
['Teddy ears','Oreilles d\'ourson','אוזני דובון','🧸',{s:[['bearE','top',1.15,0,-.16]]}],
['Gold crown','Couronne d\'or','כתר זהב','👑',{s:[['crown','top',.85,0,-.32]],p:[SPK(8,'halo')]}],
['Anime eyes','Yeux manga','עיני אנימה','🥺',{b:{ey:.45,sm:.6,lash:.8},o:['animeEyes']}],
['Crystal tears','Larmes de cristal','דמעות קריסטל','💧',{s:[['tears','eyes',.95,0,.16]]}],
['Puppy','Chiot','כלבלב','🐶',{s:[['earsP','top',1.25,0,-.12],['noseP','nose',.3,0,.02],['tongue','mouth',.22,0,.1]]}],
['Star eyes','Yeux étoilés','כוכבים בעיניים','🤩',{o:['starEyes']}],
['Forehead pearl','Perle','פנינה על המצח','🦪',{s:[['pearl','top',.1,0,.08]]}],
['Fairy wings','Ailes de fée','כנפי פיות','🧚',{s:[['fairyW','ears',2.2,0,-.15]]}],
['Unicorn','Licorne','חד-קרן','🦄',{s:[['unicorn','top',1.1,0,-.42]]}],
['Little bee','Petite abeille','דבורה קטנה','🐝',{p:[{t:'e:🐝',n:1,m:'nose'}]}],
['Leaf crown','Couronne de feuilles','כתר עלים','🍃',{s:[['leafC','top',1.2,0,-.12]]}],
['Forest fairy','Fée de la forêt','פיית יער','🌿',{s:[['leafC','top',1.2,0,-.12]],b:{ti:.25,gl:.3},p:[{t:'firefly',n:20,m:'float'}]}],
['Cheek hearts','Cœurs sur les joues','לבבות על הלחיים','❤️',{s:[['e:❤️','cheekL',.12,0,0],['e:❤️','cheekR',.12,0,0]]}],
['Star freckles','Taches étoiles','נמשים כוכבים','⭐',{b:{frk:'#FFD700',frs:1}}],
['Fox ears','Oreilles de renard','אוזני שועל','🦊',{s:[['foxE','top',1.15,0,-.2]]}],
['Panda','Panda','פנדה','🐼',{s:[['pandaE','top',1.15,0,-.15]],b:{patch:1}}],
['Little clouds','Petits nuages','עננים קטנים','☁️',{p:[{t:'e:☁️',n:6,m:'orbit'}]}],
['Crystal crown','Couronne de cristal','כתר קריסטלים','🔮',{s:[['crystalC','top',.85,0,-.3]]}],
['Hair flowers','Fleurs dans les cheveux','פרחים בשיער','🌸',{s:[['e:🌸','top',.16,-.42,-.02],['e:🌼','top',.13,-.5,.12],['e:🌸','top',.16,.42,-.02],['e:🌼','top',.13,.5,.12]]}],
['Cat eyes','Yeux de chat','עיני חתול','😼',{b:{ey:.3,ln:1,lash:1,sm:.4}}],
['Cheek cherries','Cerises','דובדבנים על הלחיים','🍒',{s:[['e:🍒','cheekL',.14,0,0],['e:🍒','cheekR',.14,0,0]]}],
['Balloons','Ballons','בלונים','🎈',{p:[{t:'e:🎈',n:6,m:'rise',sz:1.4}]}],
['Lotus crown','Couronne de lotus','כתר לוטוס','🪷',{s:[['lotusC','top',1.1,0,-.16]]}],
['Sweet doll','Poupée douce','בובה מתוקה','🎀',{b:{sm:1,sk:.4,ey:.25,sl:.2,bl:'#FF9EB5',ba:.55,lip:'#F06292',la:.45,lash:1},s:[['bow','top',.42,-.32,-.1]]}],
['Angel wings','Ailes d\'ange','כנפי מלאך','👼',{s:[['angelW','ears',3,0,.1],['halo','top',.85,0,-.5]]}],
['Candy rain','Pluie de bonbons','סוכריות נופלות','🍬',{p:[{t:'e:🍬',n:12,m:'fall'},{t:'e:🍭',n:6,m:'fall'}]}],
['Mini unicorns','Mini licornes','חדי-קרן קטנים','🦄',{p:[{t:'e:🦄',n:6,m:'float'}]}],
['Magic bubbles','Bulles magiques','בועות סבון','🫧',{p:[{t:'bubble',n:20,m:'rise'}]}],
['Koala ears','Oreilles de koala','אוזני קואלה','🐨',{s:[['koalaE','top',1.3,0,-.12]]}],
['Chic tiger','Tigre chic','נמר אופנתי','🐯',{b:{paint:'#E07020',sm:.4}}],
['Diamond crown','Couronne de diamants','כתר יהלומים','💎',{s:[['diamondC','top',.85,0,-.32]],p:[SPK(10,'halo')]}],
['Healing hearts','Cœurs réparés','לבבות מתחברים','❤️‍🩹',{p:[{t:'heal',n:8,m:'orbit'}]}],
['Butterflies','Papillons','פרפרים צבעוניים','🦋',{p:[{t:'e:🦋',n:10,m:'orbit'}]}],
['Bees & flowers','Abeilles & fleurs','דבורים ופרחים','🌼',{p:[{t:'e:🐝',n:4,m:'float'},{t:'e:🌼',n:6,m:'float'}]}],
['Kitten on head','Chaton sur la tête','חתלתול על הראש','🐱',{s:[['e:🐱','top',.55,0,-.32]]}],
['Cheek rainbow','Arc-en-ciel','קשת על הלחי','🌈',{s:[['e:🌈','cheekR',.22,0,0]]}],
['Wildflower crown','Fleurs sauvages','כתר פרחי בר','🌼',{s:[['springC','top',1.2,0,-.14]]}],
['Flying kisses','Bisous volants','נשיקות באוויר','💋',{p:[{t:'e:💋',n:12,m:'float'}]}],
['Wolf ears','Oreilles de loup','אוזני זאב','🐺',{s:[['wolfE','top',1.15,0,-.2]]}],
['Shooting star','Étoile filante','כוכב נופל','🌠',{p:[{t:'shoot',n:2,m:'shoot'}],b:{vg:.3}}],
['Peeking teddy','Ourson coucou','דובון מציץ','🧸',{o:['teddy']}],
['Beating hearts','Cœurs battants','לבבות פועמים','💓',{p:[{t:'e:💗',n:12,m:'twinkle',v:2}]}],
['Greek laurel','Laurier grec','כתר עלים יווני','🏛️',{s:[['laurel','top',1.15,0,-.14]]}],
['Flower fairies','Fées des fleurs','פיות פרחים','🧚‍♀️',{p:[{t:'e:🧚‍♀️',n:5,m:'float'},{t:'e:🌸',n:6,m:'float'}]}],
['Cute deer','Faon','איילה חמודה','🦌',{s:[['deer','top',1.2,0,-.36],['deerN','nose',.3,0,.02]],b:{frk:'#C08050'}}],
['Falling petals','Pétales','עלי כותרת נופלים','🌸',{p:[{t:'e:🌸',n:22,m:'fall'}]}],
['Lights crown','Couronne lumineuse','כתר אורות','💡',{s:[['lightsC','top',1.15,0,-.16]]}],
['Diamond sparkle','Éclats de diamant','נצנצי יהלומים','💎',{p:[{t:'e:💎',n:12,m:'twinkle'}]}],
['Cool cat','Chat cool','חתול קוּל','😎',{s:[['catE','top',1.1,0,-.18],['catW','nose',1,0,.06],['sunglasses','eyes',1.05,0,.03]]}],
['Nose butterfly','Papillon sur le nez','פרפר על האף','🦋',{s:[['butterfly','nose',.35,0,-.08]]}],
['Spring crown','Couronne de printemps','כתר אביב','🌷',{s:[['flowers','top',1.2,0,-.12],['e:🌷','top',.18,.5,0]]}],
['Rising bubbles','Bulles blanches','בועות לבנות','⚪',{p:[{t:'bubbleW',n:25,m:'rise'}]}],
['Night unicorn','Licorne de nuit','חד-קרן בלילה','🌌',{s:[['unicorn','top',1.1,0,-.42]],b:{br:-.06,sh:'#200040',hi:'#c080ff',st:.5,vg:.5},p:[SPK(20)]}],
['Star crown','Couronne d\'étoiles','כתר כוכבים','⭐',{s:[['starC','top',1.15,0,-.16]]}],
/* 181-240 vintage & retro */
['Polaroid','Polaroid','פולארויד','🖼️',{b:{br:.04,ct:.92,sa:.95,wa:.3,fa:.22,vg:.25,gr:.1},o:['polaroid']}],
['Film frame','Pellicule','מסגרת פילם','🎞️',{b:{gr:.15},o:['film']}],
['Film grain','Grain','גרגור פילם','🌫️',{b:{gr:.4,fa:.05}}],
['Faded 80s','Délavé 80s','שנות ה-80 דהויות','📻',{b:{fa:.3,sa:.8,wa:.2,sh:'#304060',hi:'#ffd0b0',st:.3}}],
['VHS','VHS','VHS','📼',{fx:13,fxa:1,o:['vhs']}],
['Sepia','Sépia','ספיה','🟫',{b:{sa:.6,wa:.7,fa:.15,vg:.3,gr:.1}}],
['Light leak','Fuite de lumière','דליפת אור','🔥',{o:['leakG']}],
['Y2K','Y2K','Y2K','💿',{b:{br:.05,sa:1.2,sh:'#4040ff',hi:'#ffc0ff',st:.3},o:['dateO']}],
['Disposable','Jetable','מצלמה חד-פעמית','📷',{b:{br:.03,ct:1.15,sa:1.1,wa:.25,ti:.1,fa:.12,vg:.4,gr:.35},o:['dateO','flashY']}],
['Teal & orange','Teal & orange','כחול-כתום','🎬',{b:{sh:'#004050',hi:'#ffb060',st:.5}}],
['Retro pastel','Pastel rétro','פסטל רטרו','🍬',{b:{fa:.25,sa:.85,sh:'#80a0ff',hi:'#ffd0e0',st:.35}}],
['Date stamp','Date orange','חותמת תאריך','📅',{o:['dateO']}],
['Blur edges','Bords flous','קצוות מטושטשים','🌀',{fx:32,fxa:1}],
['Grunge','Grunge','גראנג\'','🖤',{b:{ct:1.25,sa:.6,br:-.05,gr:.35,vg:.6},o:['scratch']}],
['Faded neon','Néon délavé','ניאון דהוי','🌆',{b:{sh:'#400060',hi:'#40ffd0',st:.4,fa:.25}}],
['Old newspaper','Vieux journal','עיתון ישן','📰',{fx:12,fxa:1}],
['Dirty mirror','Miroir sale','מראה מלוכלכת','🪞',{b:{fa:.15},o:['dirt']}],
['Warm retro','Rétro chaud','רטרו חם','🍂',{b:{wa:.6,sh:'#401000',hi:'#ffc080',st:.35,fa:.15}}],
['Dark moon','Nuit lunaire','צילום באור ירח','🌑',{b:{br:-.08,wa:-.6,sa:.5,vg:.7}}],
['French retro','Rétro français','רטרו צרפתי','🥐',{b:{fa:.15,wa:.25,sa:.9,vg:.3,gr:.15,sh:'#3b2a4a',hi:'#ffe3c4',st:.25}}],
['90s home video','Vidéo maison 90s','וידאו ביתי 90s','📹',{fx:13,fxa:.6,b:{fa:.15},o:['camcorder']}],
['Pop art','Pop art','פופ ארט','🎨',{fx:24,fxa:1}],
['Scratched film','Film rayé','קווים שרוטים','〰️',{b:{gr:.2,sa:.8},o:['scratch']}],
['Classic B&W','Noir & blanc','שחור-לבן קלאסי','⚫',{b:{sa:0,ct:1.3,vg:.4}}],
['Grey blue','Gris bleu','אפרפר-כחול','🌧️',{b:{sa:.5,wa:-.4,br:-.03,fa:.1}}],
['Old bulbs','Vieilles ampoules','נורות להט','💡',{b:{wa:.8,vg:.6,gl:.3},o:['candle']}],
['California sun','Soleil de Californie','קליפורניה','🌴',{b:{wa:.45,sa:1.25,br:.04},o:['leakG']}],
['Old TV','Vieille télé','טלוויזיה ישנה','📺',{fx:14,fxa:1,o:['crt']}],
['Faded pastel','Pastel passé','פסטל דהוי','🩰',{b:{fa:.35,sa:.7,br:.04}}],
['Yellow flash','Flash jaune','ברק צהבהב','💛',{b:{wa:.4},o:['flashY']}],
['Camcorder','Caméscope','מצלמת וידאו','🎥',{fx:13,fxa:.8,o:['camcorder']}],
['Dark green','Vert sombre','ירוק מחתרתי','🟩',{b:{ti:.5,sa:.7,ct:1.2,vg:.5,gr:.2}}],
['Old album','Vieil album','אלבום ישן','📔',{b:{fa:.15,wa:.3},o:['album']}],
['American retro','Rétro américain','רטרו אמריקאי','🇺🇸',{b:{wa:.35,sa:1.1,ct:1.1,fa:.1,sh:'#203050',hi:'#ffe0a0',st:.3}}],
['Purple leak','Fuite violette','דליפת אור סגולה','💜',{o:['leakP']}],
['Old summer','Été d\'antan','קיץ ישן','🏝️',{b:{wa:.6,fa:.2,sa:1.05},o:['leakG']}],
['Lens flare','Reflet d\'objectif','כתמי שמש','🌞',{o:['flare']}],
['Paris romance','Paris romantique','וינטג\' פריזאי','🗼',{b:{br:.02,ct:1.05,sa:1.05,wa:.25,fa:.1,vg:.25,sh:'#3b2a4a',hi:'#ffe3c4',st:.25,gl:.3}}],
['Misty morning','Matin brumeux','בוקר ערפילי','🌫️',{b:{br:.04,fa:.2,sa:.8},o:['fog']}],
['70s hippie','Hippie 70s','שנות ה-70','☮️',{b:{wa:.5,sa:1.2,fa:.2,sh:'#406020',hi:'#ffd080',st:.35,gr:.15}}],
['Peeling colors','Couleurs écaillées','צבעים מתקלפים','🎨',{fx:24,fxa:.5,b:{fa:.3}}],
['Minimal retro','Rétro minimal','רטרו מינימליסטי','◽',{b:{sa:.75,fa:.15,ct:.95}}],
['Wet glass','Vitre mouillée','זכוכית רטובה','💧',{fx:20,fxa:1,o:['drops']}],
['Wood & gold','Bois & or','עץ וזהב','🪵',{b:{wa:.6,sh:'#3a2008',hi:'#ffd890',st:.4}}],
['Damaged film','Film abîmé','פילם פגום','🎞️',{b:{gr:.3},o:['scratch','leakG']}],
['English vintage','Vintage anglais','וינטג\' אנגלי','🫖',{b:{sa:.8,ti:.15,fa:.2,vg:.35,gr:.1}}],
['Dim & old','Ancien tamisé','תאורה עמומה','🕰️',{b:{br:-.06,fa:.25,vg:.55,sa:.8}}],
['80s pop','Pop 80s','פופ שנות ה-80','🕺',{b:{sa:1.4,ct:1.15,sh:'#4000a0',hi:'#ff60c0',st:.35}}],
['Digital zoom','Zoom numérique','זום דיגיטלי','🔍',{fx:10,fxa:.25,o:['zoomUI']}],
['Desert orange','Orange désert','כתום מדברי','🐪',{b:{wa:.75,sh:'#4a2000',hi:'#ffb050',st:.4}}],
['Yellowed photo','Photo jaunie','תמונה מצהיבה','📜',{b:{wa:.7,sa:.7,fa:.25,vg:.4},o:['yellow']}],
['Magazine','Magazine','מגזין רטרו','📖',{b:{ct:1.1},o:['mag']}],
['Retro club','Club rétro','מועדון רטרו','🪩',{b:{sh:'#300050',hi:'#ff3080',st:.5},o:['disco']}],
['Ornate mirror','Miroir orné','מראה מעוטרת','🪞',{o:['ornate']}],
['Burnt edges','Bords brûlés','קצוות שרופים','🔥',{b:{wa:.3,fa:.1},o:['burnt']}],
['Old winter','Hiver d\'antan','חורף ישן','⛄',{b:{wa:-.4,fa:.25,sa:.7},p:[{t:'snow',n:30,m:'fall'}]}],
['Night flash','Flash de nuit','פלאש צהוב בלילה','🌃',{b:{vg:.7,br:-.02},o:['flashY']}],
['Soft psychedelic','Psyché douce','פסיכדלי עדין','🍄',{fx:30,fxa:.4,b:{sa:1.3}}],
['Family album','Album de famille','אלבום משפחתי','👨‍👩‍👧',{b:{sa:.85,wa:.3,fa:.2},o:['album']}],
['Childhood','Souvenir d\'enfance','זיכרון ילדות','🧸',{fx:32,fxa:.6,b:{fa:.25,gl:.35,br:.04,sa:.9}}],
/* 241-300 trends & special effects */
['Cut cut','Cut cut','קאט קאט','✂️',{fx:31,fxa:1}],
['Collage','Collage','קולאז\' מרחף','🖼️',{o:['collage']}],
['Clones','Clones','כפילים','👯',{fx:19,fxa:1}],
['Fisheye','Fisheye','עין דג','🐟',{fx:1,fxa:1}],
['4 squares','4 carrés','פיצול ל-4','🔲',{fx:3,fxa:1}],
['Glitch','Glitch','גליץ\'','📟',{fx:2,fxa:1}],
['Laser scan','Scanner laser','סורק לייזר','🟥',{o:['scanner']}],
['X-ray','Rayons X','רנטגן','☠️',{fx:4,fxa:1}],
['Big head','Grosse tête','ראש ענק','🤯',{fx:5,fxa:1}],
['Stop motion','Stop motion','סטופ מושן','⏸️',{hold:.35}],
['Broken glass','Verre brisé','זכוכית שבורה','🔨',{o:['shatter']}],
['3D bubbles','Bulles 3D','בועות תלת-ממד','🫧',{p:[{t:'bubble',n:14,m:'rise',sz:2.2}]}],
['Music beat','Rythme','קצב מוזיקה','🎵',{fx:30,fxa:1,o:['flash']}],
['Silhouette','Silhouette','צללית','👤',{fx:18,fxa:1}],
['Fire crown','Couronne de feu','להבות סביב הראש','🔥',{p:[{t:'e:🔥',n:10,m:'halo',sz:1.2}]}],
['Electric','Électrique','ברקים חשמליים','⚡',{o:['lightning'],b:{sh:'#100030',hi:'#a0c0ff',st:.3}}],
['Hologram','Hologramme','הולוגרמה','🛸',{fx:17,fxa:1}],
['Laser eyes','Yeux laser','עיני לייזר','🔴',{o:['laserEyes']}],
['Dust away','Poussière','התפזרות לחלקיקים','🌪️',{fx:21,fxa:1,p:[{t:'dust',n:40,m:'drift'}]}],
['B&W switch','Bascule N&B','מעבר שחור-לבן','🔳',{fx:27,fxa:1}],
['Diamond face','Visage diamant','מסכת יהלומים','💎',{b:{fs:1.5,sm:.5}}],
['Heavy rain','Pluie battante','גשם שוטף','🌧️',{b:{br:-.04,sa:.8},o:['rain','drops']}],
['Slow snow','Neige douce','שלג יורד','🌨️',{p:[{t:'snow',n:50,m:'fall'}]}],
['Rainbow face','Visage arc-en-ciel','צבעי קשת על הפנים','🌈',{fx:16,fxa:1}],
['Waves','Vagues','עיוות גלים','🌊',{fx:6,fxa:1}],
['Lace mask','Masque de dentelle','מסכת תחרה','🎭',{s:[['lace','eyes',1.25,0,.02]],p:[{t:'spark',n:8,m:'face',sz:.5}]}],
['Prism','Prisme','פריזמה','🔺',{fx:8,fxa:1}],
['Ripple','Ondulation','גלי מים','💦',{fx:7,fxa:1}],
['Dragon wings','Ailes de dragon','כנפי דרקון','🐉',{s:[['dragonW','ears',3.2,0,.15]],b:{sh:'#200000',hi:'#ff9060',st:.3}}],
['Mystic fog','Brume mystique','ערפל מסתורי','🌫️',{b:{br:-.04,vg:.5},o:['fog']}],
['Energy orbs','Boules d\'énergie','כדורי אנרגיה','🔵',{p:[{t:'orb',n:4,m:'orbit'}]}],
['Mystery mask','Masque mystère','מסכה מסתורית','🎭',{s:[['mystery','eyes',1.3,0,.12]]}],
['Manga','Manga','פנים בסגנון מנגה','📚',{fx:11,fxa:1}],
['Cyber mask','Masque cyber','מסכת סייבר','🤖',{s:[['cyber','eyes',1.3,0,.05]],b:{sh:'#002030',hi:'#40e0ff',st:.4}}],
['Bass flash','Flash basse','פלאש עם באס','🔊',{fx:27,fxa:1,o:['flash']}],
['Confetti','Confettis','קונפטי','🎊',{p:[{t:'confetti',n:50,m:'fall'}]}],
['Disco balls','Boules disco','כדורי דיסקו','🪩',{p:[{t:'e:🪩',n:3,m:'orbit',sz:1.3}],o:['disco']}],
['Anime glow','Éclat anime','ברק אנימה בעיניים','✨',{b:{ey:.2,sm:.5},o:['eyeSpark','animeEyes']}],
['Glitter cat mask','Masque chat pailleté','מסכת חתול נוצצת','🐈',{s:[['catMask','eyes',1.3,0,-.02]]}],
['Cyberpunk','Cyberpunk','סייברפאנק','🌆',{b:{sh:'#002060',hi:'#ff3090',st:.55,ct:1.15,sa:1.2},o:['neon:#00E5FF']}],
['Live polaroid','Polaroid live','פולארויד חי','📸',{b:{wa:.2,fa:.15},o:['polaroid']}],
['City in eyes','Ville dans les yeux','עיר בעיניים','🌃',{o:['cityEyes']}],
['Color smoke','Fumée colorée','עשן צבעוני','💨',{o:['smoke']}],
['Cracked doll','Poupée fêlée','בובה נסדקת','🏺',{b:{sm:1,sk:.5},o:['cracks']}],
['Floating crown','Couronne flottante','כתר קריסטל מרחף','👑',{s:[['crystalC','top',.85,0,-.38,1]],p:[SPK(10,'halo')]}],
['Galaxy face','Visage galaxie','גלקסיה בפנים','🌌',{o:['galaxyFace']}],
['Planets','Planètes','כוכבי לכת','🪐',{p:[{t:'e:🪐',n:2,m:'orbit',sz:1.3},{t:'e:🌍',n:1,m:'orbit'},{t:'e:🌙',n:1,m:'orbit'}]}],
['Zoom blur','Zoom flou','טשטוש זום','💨',{fx:9,fxa:1}],
['Glitter tears','Larmes pailletées','דמעות נצנצים','😢',{s:[['tears','eyes',1.05,0,.18]],b:{gs:1}}],
['Butterfly mask','Masque papillon','מסכת פרפרים','🦋',{s:[['butterflyM','eyes',1.4,0,0]],p:[{t:'e:🦋',n:4,m:'float'}]}],
['Plastic frame','Cadre plastique','מסגרת פלסטיק','🧊',{o:['plastic']}],
['Neon caption','Texte néon','כיתוב ניאון','🔤',{o:['neonText']}],
['Ghost trail','Traînée fantôme','צללית באיחור','👻',{trail:.75}],
['Sci-fi HUD','HUD sci-fi','מסכת מדע בדיוני','🛰️',{o:['hud'],b:{sh:'#002030',hi:'#80ffff',st:.25}}],
['Giant bubbles','Bulles géantes','בועות ענקיות','🫧',{p:[{t:'bubble',n:6,m:'rise',sz:4}]}],
['Heart reveal','Ouverture cœur','מעבר בצורת לב','💗',{o:['heartOpen']}],
['Neon glasses','Lunettes néon','השתקפות ניאון','🕶️',{s:[['sunglasses','eyes',1.05,0,.03]],o:['glassNeon']}],
['Yellow lightning','Éclair jaune','ברק צהוב','🌩️',{o:['lightningY']}],
['TikTok purple','Violet TikTok','סגול טיקטוק','💜',{b:{sh:'#200040',hi:'#c040ff',st:.6,sa:1.2,ct:1.1,gl:.3}}],
['Final cut','Cut final','קאט-קאט זוהר','🌟',{fx:31,fxa:1,b:{gl:.5},p:[SPK(15)]}]];
const FXCATS=[['beauty','💄','Make-up'],['light','✨','Light'],['cute','🐰','Cute'],['retro','📼','Vintage'],['trend','🔥','Trends']];
(function(){const cats=['beauty','light','cute','retro','trend'];const T={'Light':['Lumière','זוהר ותאורה','إضاءة'],'Cute':['Mignon','חמוד','لطيف'],'Vintage':['Vintage','וינטג\'','قديم'],'Trends':['Tendances','טרנדים','ترندات']};
 F300.forEach(([en,fr,he,em,sp],i)=>{const cat=cats[Math.floor(i/60)];FILTERS.push({k:'fx'+(i+1),n:en,cat,em,bx:Object.assign({},BXD,sp.b||{}),sp,gold:(i%3===2)?1:0});T[en]=[fr,he,''];});
 ['fr','he','ar'].forEach((c,i)=>{for(const k in T)if(T[k][i])window.I18N[c][k]=T[k][i];});})();
BXCATS.length=0;FXCATS.forEach(c=>BXCATS.push(c));SNAP.cat='beauty';

/* ring button */
fcHTML=function(f,sel){const lock=f.gold&&!S.vip;if(f.k==='none')return `<button class="fc ${sel===f.k?'on':''}" data-f9="none" aria-label="${esc(fName(f))}">${SV(ICONS.none)}</button>`;
  if(!f.sp){const face=f.ov?(f.ov==='fdate'||f.ov==='flogo'?`<b>${f.ov==='fdate'?new Date().getDate():'R'}</b>`:OVL[f.ov]):'';return `<button class="fc ${sel===f.k?'on':''} ${lock?'lk':''}" data-f9="${f.k}" aria-label="${esc(fName(f))}" style="${f.sw?`background:${f.sw}`:''}">${face||''}${lock?`<span class="lkb">${SV(ICONS.lock)}</span>`:''}</button>`;}
  const b=f.bx;const c1=b.lip||b.es||b.ir||b.bl||b.hi||({light:'#FDE68A',cute:'#FBCFE8',retro:'#E7D3B0',trend:'#C4B5FD'}[f.cat])||'#F5D0C5';const c2=b.sh||b.lip||b.es||({light:'#F59E0B',cute:'#F472B6',retro:'#8B6B4F',trend:'#6D28D9'}[f.cat])||'#C98B7B';
  return `<button class="fc bxc ${sel===f.k?'on':''} ${lock?'lk':''}" data-f9="${f.k}" aria-label="${esc(fName(f))}" style="background:radial-gradient(circle at 35% 30%,${c1},${c2})"><span class="bxe">${f.em||''}</span>${lock?`<span class="lkb">${SV(ICONS.lock)}</span>`:''}</button>`;};
fringHTML=function(sel){const inSnap=$('#snap')?.classList.contains('on');let list=inSnap?FILTERS.filter(f=>f.k==='none'||f.cat===SNAP.cat):window.CALLF;if(!inSnap)list=list.filter(f=>f.k!=='bday'||isBday(me().birth));return list.map(f=>fcHTML(f,sel)).join('');};

/* ---------- WebGL: skin, shape and special effects ---------- */
const FX_FS=`precision highp float;varying vec2 v;uniform sampler2D T,M;uniform vec2 R;uniform float mir,has,sm,smR,br,ct,sa,wa,ti,fa,vg,gr,gl,sk,st,tm,FX,FXA,FR;uniform vec4 E1,E2,C1,C2,LP,NS;uniform vec2 CT;uniform vec3 SH,HI;
float rnd(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
vec3 hue(vec3 c,float h){vec3 k=vec3(.57735);float ca=cos(h);return c*ca+cross(k,c)*sin(h)+k*dot(k,c)*(1.-ca);}
vec3 tx(vec2 P){vec2 u=clamp(P/R,0.,1.);return texture2D(T,vec2(mir>.5?1.-u.x:u.x,u.y)).rgb;}
float lu(vec3 c){return dot(c,vec3(.299,.587,.114));}
vec2 eye(vec2 P,vec4 e){vec2 d=P-e.xy;float l=length(d);if(l<e.z&&e.w>0.){float k=1.-e.w*(1.-(l/e.z)*(l/e.z));P=e.xy+d*k;}return P;}
vec2 chk(vec2 P,vec4 c){float l=length(P-c.xy);if(l<c.z&&c.w>0.){float f=(1.-l/c.z);f=f*f*c.w;P+=(c.xy-CT)*f;}return P;}
vec2 bul(vec2 P,vec2 c,float r,float s){vec2 d=P-c;float l=length(d);if(l<r){P=c+d*pow(l/r,s);}return P;}
void main(){vec2 P=v*R;float t=tm;
 if(FX==1.)P=bul(P,R*.5,length(R)*.55,1.+FXA*.7);
 if(FX==5.&&has>.5)P=bul(P,CT,FR*1.7,1.+FXA*.8);
 if(FX==6.)P+=vec2(sin(v.y*20.+t*4.),sin(v.x*16.+t*3.))*R.x*.012*FXA;
 if(FX==7.){vec2 d=P-R*.5;float l=length(d);P+=d/(l+.001)*sin(l/R.x*60.-t*6.)*R.x*.006*FXA;}
 if(FX==3.)P=mod(P*2.,R);
 if(FX==19.)P.x=mod(P.x,R.x/3.)+R.x/3.;
 if(FX==14.){vec2 u=v*2.-1.;u*=1.+dot(u,u)*.08*FXA;P=(u*.5+.5)*R;}
 if(FX==31.){float k=mod(floor(t*1.6),4.);if(k==1.)P=R*.5+(P-R*.5)*.82;if(k==3.)P=R*.5+(P-R*.5)*.9+vec2(R.x*.02,0.);}
 if(FX==2.){float b=floor(v.y*24.)+floor(t*8.);float j=step(.82,rnd(vec2(b,floor(t*10.))));P.x+=j*(rnd(vec2(b,1.))-.5)*R.x*.1*FXA;}
 if(FX==13.)P.x+=(rnd(vec2(floor(v.y*160.),floor(t*20.)))-.5)*R.x*.005*FXA+sin(v.y*30.+t*5.)*R.x*.002;
 if(FX==20.)P+=(vec2(rnd(floor(v*vec2(30.,45.))),rnd(floor(v*vec2(30.,45.))+3.))-.5)*R.x*.02*FXA;
 if(has>.5){P=eye(P,E1);P=eye(P,E2);P=chk(P,C1);P=chk(P,C2);if(LP.w>0.)P=bul(P,LP.xy,LP.z,1.+LP.w);
  if(NS.w>0.){vec2 d=P-NS.xy;float l=length(d*vec2(1.,.55));if(l<NS.z)P.x=NS.x+d.x*(1.+NS.w*(1.-l/NS.z));}}
 if(FX==10.){float s=R.x/(70.-FXA*50.);P=(floor(P/s)+.5)*s;}
 vec2 tc=P;vec3 c=tx(tc);float m=has>.5?texture2D(M,v).r:0.;
 if(sm>0.&&m>.01){vec3 acc=c;float w=1.;for(int i=0;i<16;i++){float a=float(i)*2.39996;float r=smR*sqrt((float(i)+1.)/16.);vec3 q=tx(tc+vec2(cos(a),sin(a))*r);vec3 dq=q-c;float wt=exp(-dot(dq,dq)*30.);acc+=q*wt;w+=wt;}c=mix(c,acc/w,clamp(m*sm*1.1,0.,1.));}
 if(FX==8.||FX==2.){float o=R.x*.007*FXA*(FX==2.?1.+2.5*step(.75,rnd(vec2(floor(t*6.)))):1.);vec2 d=FX==8.?normalize(P-R*.5+.001)*o:vec2(o,0.);c.r=tx(P+d).r;c.b=tx(P-d).b;}
 if(FX==9.){vec3 a=c;vec2 d=P-(has>.5?CT:R*.5);for(int i=1;i<10;i++)a+=tx(P-d*float(i)*.013*FXA);c=a/10.;}
 if(FX==32.){float e=smoothstep(.22,.6,distance(v,vec2(.5)))*FXA;vec3 a=vec3(0.);for(int i=0;i<12;i++){float an=float(i)*.5236;a+=tx(P+vec2(cos(an),sin(an))*R.x*.025*e);}c=mix(c,a/12.,e);}
 c=mix(c,c+(1.-c)*.22,m*sk);
 c+=br;c=(c-.5)*ct+.5;float l=lu(c);c=mix(vec3(l),c,sa);c.r+=wa*.07;c.b-=wa*.07;c.g+=ti*.05;
 l=clamp(lu(c),0.,1.);c+=(SH-.5)*(1.-l)*st*.5+(HI-.5)*l*st*.5;c=c*(1.-fa*.22)+fa*.13;c+=gl*smoothstep(.55,1.,l)*.18;
 l=clamp(lu(c),0.,1.);
 if(FX==4.){c=vec3(1.-l)*vec3(.55,.85,1.15);}
 if(FX==11.||FX==25.){vec2 o=vec2(1.5);float e=abs(lu(tx(P+vec2(o.x,0.)))-lu(tx(P-vec2(o.x,0.))))+abs(lu(tx(P+vec2(0.,o.y)))-lu(tx(P-vec2(0.,o.y))));
   if(FX==11.){c=floor(c*4.+.3)/4.;c=mix(c,vec3(1.),.12);c*=1.-smoothstep(.06,.16,e*FXA);}else c=vec3(1.-smoothstep(.04,.14,e));}
 if(FX==12.){vec2 g=fract(v*R/7.)-.5;c=mix(vec3(.95,.93,.86),vec3(.08),step(length(g),(1.-l)*.62));}
 if(FX==16.&&has>.5){c=mix(c,c*.45+hue(vec3(1.,.15,.15),v.x*7.+v.y*3.+t*2.)*.65,m*.6*FXA);}
 if(FX==17.){c=vec3(.25,.95,1.)*(l*1.25+.05);c*=.72+.28*sin(v.y*R.y*.9+t*25.);c*=.85+.15*rnd(vec2(floor(t*12.)));}
 if(FX==18.){vec3 bg=hue(vec3(1.,.45,.12),v.y*2.2+t*.3);c=mix(vec3(.02),bg,smoothstep(.32,.58,l));}
 if(FX==21.){float n=rnd(floor(v*R/5.));float th=fract(t*.22)*1.8;float k=step(n,th-(1.-v.x)*1.2);c=mix(c,vec3(.04),k);}
 if(FX==24.){c=floor(c*3.+.5)/3.;c=mix(vec3(lu(c)),c,1.+.6*FXA);}
 if(FX==27.){if(mod(floor(t*2.5),2.)==1.){c=vec3(l);c=(c-.5)*1.4+.5;}}
 if(FX==30.){c=hue(c,t*1.5*FXA);c*=1.+.15*FXA*max(0.,sin(t*8.));}
 if(FX==31.){float k=mod(floor(t*1.6),4.);if(k==1.)c=vec3(l)*1.1;if(k==2.){c.r=tx(P+vec2(R.x*.012,0.)).r;c.b=tx(P-vec2(R.x*.012,0.)).b;}if(k==3.)c=hue(c,1.2);c+=vec3(.6)*max(0.,1.-fract(t*1.6)*6.)*.6;}
 if(FX==13.){c*=.92+.08*sin(v.y*R.y*1.5);c+=(rnd(v*R+t)-.5)*.08;}
 if(FX==14.){c*=.9+.1*sin(v.y*R.y*1.2);vec2 u=v*2.-1.;c*=1.-smoothstep(.75,1.25,length(u))*.8;}
 float d=distance(v,vec2(.5));c*=1.-vg*smoothstep(.3,.85,d)*.8;c+=gr*(rnd(v*R+t)-.5)*.12;
 gl_FragColor=vec4(clamp(c,0.,1.),1.);}`;
bxInit=function(){if(BX.ok!==null)return BX.ok;try{const cv=document.createElement('canvas');const gl=cv.getContext('webgl',{preserveDrawingBuffer:true,premultipliedAlpha:false,antialias:false});if(!gl)return BX.ok=false;
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o;};
  const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,BX_VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FX_FS));gl.linkProgram(pr);if(!gl.getProgramParameter(pr,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(pr));gl.useProgram(pr);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const a=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
  const mk=u=>{const t=gl.createTexture();gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,t);[gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T].forEach(w=>gl.texParameteri(gl.TEXTURE_2D,w,gl.CLAMP_TO_EDGE));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);return t;};
  BX.tex=mk(0);BX.mtex=mk(1);gl.uniform1i(gl.getUniformLocation(pr,'T'),0);gl.uniform1i(gl.getUniformLocation(pr,'M'),1);
  BX.U={};['R','mir','has','sm','smR','br','ct','sa','wa','ti','fa','vg','gr','gl','sk','st','tm','FX','FXA','FR','E1','E2','C1','C2','LP','NS','CT','SH','HI'].forEach(n=>BX.U[n]=gl.getUniformLocation(pr,n));
  BX.cv=cv;BX.gl=gl;BX.prog=pr;BX.mask=document.createElement('canvas');BX.mx=BX.mask.getContext('2d');return BX.ok=true;}catch(e){console.warn('fx',e);return BX.ok=false;}};
let FXCUR=null;
bxRender=function(src,W,H,mir,lm,b,tm){const gl=BX.gl,U=BX.U;const sp=(FXCUR&&FXCUR.sp)||{};if(BX.cv.width!==W||BX.cv.height!==H){BX.cv.width=W;BX.cv.height=H;}gl.viewport(0,0,W,H);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,BX.tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,src);
  let P=null,fw=0;gl.uniform4f(U.E1,0,0,0,0);gl.uniform4f(U.E2,0,0,0,0);gl.uniform4f(U.C1,0,0,0,0);gl.uniform4f(U.C2,0,0,0,0);gl.uniform4f(U.LP,0,0,0,0);gl.uniform4f(U.NS,0,0,0,0);
  if(lm){P=bxPts(lm,W,H,mir);fw=Math.hypot(P[454].x-P[234].x,P[454].y-P[234].y);bxMask(P,W,H,fw);gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,BX.mtex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,BX.mask);
    const e1=P[468]||{x:(P[33].x+P[133].x)/2,y:(P[33].y+P[133].y)/2},e2=P[473]||{x:(P[263].x+P[362].x)/2,y:(P[263].y+P[362].y)/2};
    gl.uniform4f(U.E1,e1.x,e1.y,fw*.13,b.ey*.35);gl.uniform4f(U.E2,e2.x,e2.y,fw*.13,b.ey*.35);
    const c1=P[172],c2=P[397],ct=P[1];const s=(b.sl||0)+(b.jw||0)*.15;gl.uniform4f(U.C1,c1.x,c1.y,fw*.38,s*.3);gl.uniform4f(U.C2,c2.x,c2.y,fw*.38,s*.3);gl.uniform2f(U.CT,ct.x,ct.y);
    const mo=P[13];if(b.lp)gl.uniform4f(U.LP,mo.x,mo.y,fw*.2,b.lp*.35);if(b.ns){const n=P[4];gl.uniform4f(U.NS,n.x,n.y,fw*.16,b.ns*.35);}}
  gl.uniform1f(U.has,lm?1:0);gl.uniform2f(U.R,W,H);gl.uniform1f(U.mir,mir?1:0);gl.uniform1f(U.smR,Math.max(2,(fw||W*.3)*.025));gl.uniform1f(U.tm,tm||0);gl.uniform1f(U.FR,fw*.6||W*.2);
  gl.uniform1f(U.FX,sp.fx||0);gl.uniform1f(U.FXA,sp.fxa==null?1:sp.fxa);
  ['sm','br','wa','ti','fa','vg','gr','gl','sk','st'].forEach(k=>gl.uniform1f(U[k],b[k]||0));gl.uniform1f(U.ct,b.ct||1);gl.uniform1f(U.sa,b.sa==null?1:b.sa);
  gl.uniform3fv(U.SH,hex3(b.sh||'#808080'));gl.uniform3fv(U.HI,hex3(b.hi||'#808080'));gl.drawArrays(gl.TRIANGLE_STRIP,0,4);return {P,fw};};

/* ---------- canvas layer: make-up, eyes, stickers, particles, overlays ---------- */
const rr=(i,k)=>{const s=Math.sin(i*127.1+k*311.7)*43758.5453;return s-Math.floor(s);};
function star4(x,cx,cy,r){x.moveTo(cx,cy-r);x.quadraticCurveTo(cx,cy,cx+r,cy);x.quadraticCurveTo(cx,cy,cx,cy+r);x.quadraticCurveTo(cx,cy,cx-r,cy);x.quadraticCurveTo(cx,cy,cx,cy-r);}
function star5(x,cx,cy,r){for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,q=k%2?r*.45:r;k?x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q):x.moveTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q);}x.closePath();}
function heartP(x,cx,cy,r){x.moveTo(cx,cy+r*.9);x.bezierCurveTo(cx-r*1.4,cy,cx-r*.9,cy-r*1.1,cx,cy-r*.35);x.bezierCurveTo(cx+r*.9,cy-r*1.1,cx+r*1.4,cy,cx,cy+r*.9);}
function fxPts(P,fw){const a=P[33],b=P[263];const l=a.x<b.x?a:b,r=a.x<b.x?b:a;const roll=Math.atan2(r.y-l.y,r.x-l.x);
  return {P,fw,roll,top:P[10],forehead:P[151],eyes:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},nose:P[1],mouth:P[13],lip:{x:(P[1].x+P[13].x)/2,y:(P[1].y+P[13].y)/2},ears:{x:(P[234].x+P[454].x)/2,y:(P[234].y+P[454].y)/2},chin:P[152],cheekL:P[50],cheekR:P[280],irisA:P[468]||a,irisB:P[473]||b};}
function irisR(P,c,e){const q=P[c+1];return q?Math.hypot(q.x-P[c].x,q.y-P[c].y):Math.hypot(P[e[0]].x-P[e[8]].x,P[e[0]].y-P[e[8]].y)*.22;}
function eyeClip(x,P,idx,fn){x.save();x.beginPath();bxPath(x,P,idx);x.clip();fn();x.restore();}
function fxMakeup(x,P,fw,b,t){bxMakeup(x,P,fw,b);if(!P)return;const mid=(a,c,k)=>({x:a.x+(c.x-a.x)*k,y:a.y+(c.y-a.y)*k});
  if(b.jw){softFill(x,fw*.05,'#5a3a2a',.25*b.jw,'multiply',()=>{const j=[132,58,172,136,150,149,176,148,152,377,400,378,379,365,397,288,361];x.moveTo(P[j[0]].x,P[j[0]].y);j.forEach(i=>x.lineTo(P[i].x,P[i].y));j.slice().reverse().forEach(i=>x.lineTo(P[i].x+(P[1].x-P[i].x)*.12,P[i].y+(P[1].y-P[i].y)*.12));x.closePath();});}
  if(b.ns){softFill(x,fw*.03,'#6b4433',.2*b.ns,'multiply',()=>{[[193,245],[417,465]].forEach(([u,d])=>{x.moveTo(P[u].x,P[u].y);x.lineTo(P[d].x,P[d].y);x.lineTo(P[d].x+fw*.015,P[d].y);x.lineTo(P[u].x+fw*.015,P[u].y);x.closePath();});});}
  if(b.uw){[[145,1],[374,1]].forEach(([i])=>softFill(x,fw*.05,'#fff3e6',.3*b.uw,'screen',()=>{x.ellipse(P[i].x,P[i].y+fw*.05,fw*.08,fw*.03,0,0,7);}));}
  if(b.patch){[P[468]||P[159],P[473]||P[386]].forEach(q=>softFill(x,fw*.06,'#000',.75,'multiply',()=>{x.ellipse(q.x,q.y+fw*.01,fw*.13,fw*.1,-.3,0,7);}));}
  if(b.paint){x.save();x.globalAlpha=.55;x.strokeStyle=b.paint;x.lineCap='round';x.lineWidth=fw*.025;[[234,1],[454,-1]].forEach(([i,s])=>{for(let k=0;k<3;k++){const o=P[i];x.beginPath();x.moveTo(o.x+s*fw*.02,o.y-fw*.06+k*fw*.07);x.quadraticCurveTo(o.x+s*fw*.12,o.y-fw*.04+k*fw*.07,o.x+s*fw*.2,o.y-fw*.08+k*fw*.07);x.stroke();}});
    const f=P[151];for(let k=-1;k<=1;k++){x.beginPath();x.moveTo(f.x+k*fw*.08,f.y-fw*.06);x.lineTo(f.x+k*fw*.05,f.y+fw*.02);x.stroke();}x.restore();}
  if(b.frk){const n=Math.round(22*(b.frn||1));const c=P[195]||P[1];for(let i=0;i<n;i++){const side=i%2?1:-1;const px=c.x+side*fw*(.04+rr(i,1)*.2),py=c.y+fw*(-.06+rr(i,2)*.12);const s=fw*(.004+rr(i,3)*.005)*(b.frs?2.2:1);
      x.save();x.globalAlpha=b.frs?.95:.45;x.fillStyle=b.frk;x.beginPath();b.frs?star5(x,px,py,s):x.arc(px,py,s,0,7);x.fill();x.restore();}}
  if(b.mole){const q=P[61];x.save();x.globalAlpha=.8;x.fillStyle='#2a1810';x.beginPath();x.arc(q.x-fw*.04,q.y-fw*.05,fw*.009,0,7);x.fill();x.restore();}
  if(b.ll){[[33,7,163,144,145,153,154,155,133],[263,249,390,373,374,380,381,382,362]].forEach(l=>{x.save();x.globalAlpha=.7*b.ll;x.strokeStyle='#160f0c';x.lineWidth=fw*.006;x.lineCap='round';x.beginPath();l.forEach((i,k)=>k?x.lineTo(P[i].x,P[i].y+fw*.003):x.moveTo(P[i].x,P[i].y+fw*.003));x.stroke();x.restore();});}
  if(b.wl){[[33,7,163,144,145,153,154,155,133],[263,249,390,373,374,380,381,382,362]].forEach(l=>{x.save();x.globalAlpha=.8;x.strokeStyle='#ffffff';x.lineWidth=fw*.006;x.lineCap='round';x.beginPath();l.forEach((i,k)=>k?x.lineTo(P[i].x,P[i].y):x.moveTo(P[i].x,P[i].y));x.stroke();x.restore();});}
  if(b.dl){[LMK.lidL,LMK.lidR].forEach(lid=>b.dl.forEach((c,j)=>{x.save();x.globalAlpha=.9;x.strokeStyle=c;x.lineCap='round';x.lineWidth=fw*.007;x.beginPath();lid.forEach((i,k)=>{const yy=P[i].y-fw*(.004+j*.011);k?x.lineTo(P[i].x,yy):x.moveTo(P[i].x,yy);});x.stroke();x.restore();}));}
  if(b.lash){[[LMK.lidL,468],[LMK.lidR,473]].forEach(([lid,ic])=>{const c=P[ic]||P[lid[4]];x.save();x.strokeStyle=b.lc||'#0d0806';x.lineCap='round';x.lineWidth=fw*.0045;x.globalAlpha=.9;
      for(let k=1;k<lid.length-1;k++){const p=P[lid[k]];const dx=p.x-c.x,dy=p.y-c.y,dl=Math.hypot(dx,dy)||1;const L=fw*.035*b.lash*(.6+.5*Math.sin(k/lid.length*Math.PI));x.beginPath();x.moveTo(p.x,p.y);x.quadraticCurveTo(p.x+dx/dl*L*.6,p.y+dy/dl*L*.6-L*.25,p.x+dx/dl*L,p.y+dy/dl*L-L*.5);x.stroke();}x.restore();});}
  if(b.mt){[LMK.lidL,LMK.lidR].forEach(lid=>{const q=P[lid[4]];softFill(x,fw*.03,'#fff2d6',.35*b.mt,'screen',()=>{x.ellipse(q.x,q.y-fw*.025,fw*.05,fw*.02,0,0,7);});});}
  if(b.gs){[LMK.lidL,LMK.lidR].forEach((lid,j)=>{for(let i=0;i<Math.round(10*b.gs);i++){const p=P[lid[1+Math.floor(rr(i,j+5)*(lid.length-2))]];const tw=.5+.5*Math.sin(t*6+i*1.7);x.save();x.globalAlpha=.9*tw;x.fillStyle=i%3?'#fff':'#FFE7A3';x.beginPath();star4(x,p.x+(rr(i,9)-.5)*fw*.02,p.y-fw*(.005+rr(i,7)*.03),fw*(.006+rr(i,8)*.008));x.fill();x.restore();}});}
  if(b.lgs){for(let i=0;i<14;i++){const p=P[LMK.lipO[Math.floor(rr(i,3)*LMK.lipO.length)]];const m=P[13];const q={x:p.x+(m.x-p.x)*.35,y:p.y+(m.y-p.y)*.35};const tw=.5+.5*Math.sin(t*7+i*2.1);x.save();x.globalAlpha=.9*tw;x.fillStyle='#fff';x.beginPath();star4(x,q.x,q.y,fw*(.004+rr(i,4)*.006));x.fill();x.restore();}}
  if(b.om){softFill(x,fw*.02,b.om,.55,'multiply',()=>{bxPath(x,P,LMK.lipI);});}
  if(b.fs){const o=LMK.oval.map(i=>P[i]);let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;o.forEach(p=>{x0=Math.min(x0,p.x);x1=Math.max(x1,p.x);y0=Math.min(y0,p.y);y1=Math.max(y1,p.y);});
    x.save();x.beginPath();bxPath(x,P,LMK.oval);x.clip();for(let i=0;i<Math.round(60*b.fs);i++){const px=x0+rr(i,11)*(x1-x0),py=y0+rr(i,12)*(y1-y0);const tw=.4+.6*Math.abs(Math.sin(t*4+i));x.globalAlpha=.85*tw;x.fillStyle=['#fff','#E0F2FE','#FCE7F3','#FEF3C7'][i%4];x.beginPath();star4(x,px,py,fw*(.004+rr(i,13)*.01));x.fill();}x.restore();}
  if(b.ir){[[468,LMK.eyeL],[473,LMK.eyeR]].forEach(([c,e])=>{if(!P[c])return;const r=irisR(P,c,e);eyeClip(x,P,e,()=>{const g=x.createRadialGradient(P[c].x,P[c].y,r*.3,P[c].x,P[c].y,r);g.addColorStop(0,b.ir);g.addColorStop(.85,b.ir);g.addColorStop(1,'rgba(0,0,0,.6)');
      x.globalCompositeOperation='color';x.globalAlpha=.85;x.fillStyle=g;x.beginPath();x.arc(P[c].x,P[c].y,r,0,7);x.fill();x.globalCompositeOperation='screen';x.globalAlpha=.3;x.fillStyle=b.ir;x.beginPath();x.arc(P[c].x,P[c].y,r*.9,0,7);x.fill();
      x.globalCompositeOperation='source-over';x.globalAlpha=.75;x.fillStyle='#000';x.beginPath();x.arc(P[c].x,P[c].y,r*.36,0,7);x.fill();x.globalAlpha=.85;x.fillStyle='#fff';x.beginPath();x.arc(P[c].x-r*.35,P[c].y-r*.35,r*.14,0,7);x.fill();});});}}
function drawSticker(x,pts,part,t){const [k,a,w,dx,dy,bob]=part;const A=pts[a]||pts.top;const c=Math.cos(pts.roll),s=Math.sin(pts.roll);const ox=dx*pts.fw,oy=(dy+(bob?Math.sin(t*2.2)*.03:0))*pts.fw;
  const px=A.x+ox*c-oy*s,py=A.y+ox*s+oy*c,W=w*pts.fw;x.save();x.translate(px,py);x.rotate(pts.roll);
  if(k.startsWith('e:')){x.font=`${Math.round(W)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(k.slice(2),0,0);}
  else{const o=svgImg(k);if(o.complete&&o.naturalWidth){const h=W*o._r;x.drawImage(o,-W/2,-h/2,W,h);}}x.restore();}
function emoji(x,e,px,py,s,rot){x.save();x.translate(px,py);if(rot)x.rotate(rot);x.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillText(e,0,0);x.restore();}
function drawParticles(x,W,H,pts,sp,t){const fw=pts?pts.fw:W*.35;const ctr=pts?pts.top:{x:W/2,y:H*.3};const U=Math.min(W,H);
  (sp.p||[]).forEach((q,qi)=>{const sz=(q.sz||1);const v=q.v||1;for(let i=0;i<q.n;i++){const s1=rr(i,qi*7+1),s2=rr(i,qi*7+2),s3=rr(i,qi*7+3);let px,py,rot=0,al=1;const tt=t*v;
    if(q.m==='fall'){px=s1*W+Math.sin(tt*1.3+i)*U*.03;py=((s2+tt*(.08+s3*.08))%1.1-.05)*H;rot=Math.sin(tt+i)*.6;}
    else if(q.m==='rise'){px=s1*W+Math.sin(tt*1.1+i)*U*.04;py=(1.05-((s2+tt*(.06+s3*.06))%1.1))*H;}
    else if(q.m==='drift'){px=((s1+tt*(.05+s3*.05))%1)*W;py=s2*H+Math.sin(tt+i)*U*.03;al=.6;}
    else if(q.m==='orbit'||q.m==='halo'){const R=q.m==='halo'?fw*.62:fw*.95;const a=s1*6.283+tt*(.6+s3*.3)*(i%2?1:-1)*.8;const cy=q.m==='halo'?ctr.y-fw*.08:(pts?pts.eyes.y-fw*.1:H*.35);px=(pts?pts.eyes.x:W/2)+Math.cos(a)*R;py=cy+Math.sin(a)*R*(q.m==='halo'?.32:.8);al=q.m==='halo'?(.5+.5*Math.sin(a)):1;}
    else if(q.m==='twinkle'){px=s1*W;py=s2*H;al=Math.max(0,Math.sin(tt*3+i*2.3));}
    else if(q.m==='cheeks'&&pts){const c=i%2?pts.cheekL:pts.cheekR;px=c.x+(s1-.5)*fw*.22;py=c.y+(s2-.5)*fw*.16;al=.4+.6*Math.abs(Math.sin(tt*4+i));}
    else if(q.m==='face'&&pts){px=pts.eyes.x+(s1-.5)*fw*1.1;py=pts.eyes.y+(s2-.4)*fw*.9;al=Math.abs(Math.sin(tt*3+i));}
    else if(q.m==='nose'&&pts){const a=tt*2.2+i*3;px=pts.nose.x+Math.cos(a)*fw*.3;py=pts.nose.y+Math.sin(a*1.3)*fw*.15;rot=Math.cos(a)*.3;}
    else if(q.m==='shoot'){const ph=(tt*.35+s1)%1;px=W*(1.1-ph*1.4)+s2*W*.2;py=H*(.05+ph*.5)+s3*H*.1;al=ph<.9?1:0;}
    else{px=s1*W+Math.sin(tt*.7+i*1.3)*U*.08;py=s2*H+Math.cos(tt*.6+i)*U*.08;rot=Math.sin(tt+i)*.4;}
    if(px==null)continue;const S=U*.05*sz*(.7+s3*.6);x.save();x.globalAlpha=Math.max(0,Math.min(1,al));
    const T=q.t;if(T.startsWith('e:'))emoji(x,T.slice(2),px,py,S,rot);
    else if(T==='heal')emoji(x,Math.floor(tt*1.2+i)%2?'❤️':'💔',px,py,S);
    else if(T==='spark'){x.fillStyle=i%3?'#fff':'#FFE08A';x.shadowColor='#fff';x.shadowBlur=S*.4;x.beginPath();star4(x,px,py,S*.32*(.5+.5*Math.abs(Math.sin(tt*3+i))));x.fill();}
    else if(T==='snow'||T==='snowG'){x.fillStyle='#fff';x.globalAlpha*=.85;x.beginPath();x.arc(px,py,S*.12,0,7);x.fill();if(T==='snowG'&&i%3===0){x.fillStyle='#FFE08A';x.beginPath();star4(x,px,py,S*.28);x.fill();}}
    else if(T.startsWith('bubble')){const r=S*.4;const g=x.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(.7,T==='bubbleW'?'rgba(255,255,255,.25)':'rgba(180,220,255,.12)');g.addColorStop(1,T==='bubbleW'?'rgba(255,255,255,.7)':'rgba(255,180,240,.55)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill();}
    else if(T==='firefly'){const g=x.createRadialGradient(px,py,0,px,py,S*.35);g.addColorStop(0,'rgba(255,250,200,.95)');g.addColorStop(1,'rgba(255,220,120,0)');x.globalAlpha*=.5+.5*Math.sin(tt*3+i);x.fillStyle=g;x.beginPath();x.arc(px,py,S*.35,0,7);x.fill();}
    else if(T==='confetti'){x.translate(px,py);x.rotate(tt*3+i);x.fillStyle=['#F43F5E','#F59E0B','#10B981','#3B82F6','#A855F7','#EC4899'][i%6];x.fillRect(-S*.12,-S*.06,S*.24,S*.12);}
    else if(T==='orb'){const g=x.createRadialGradient(px,py,0,px,py,S*.7);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.3,['rgba(80,200,255,.9)','rgba(200,90,255,.9)','rgba(80,255,170,.9)','rgba(255,120,80,.9)'][i%4]);g.addColorStop(1,'rgba(0,0,0,0)');x.globalCompositeOperation='screen';x.fillStyle=g;x.beginPath();x.arc(px,py,S*.7,0,7);x.fill();}
    else if(T==='dust'){x.fillStyle='rgba(60,50,40,.7)';x.fillRect(px,py,S*.06,S*.06);}
    else if(T==='shoot'){x.globalCompositeOperation='screen';const g=x.createLinearGradient(px,py,px+U*.25,py-U*.12);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.strokeStyle=g;x.lineWidth=S*.08;x.beginPath();x.moveTo(px,py);x.lineTo(px+U*.25,py-U*.12);x.stroke();emoji(x,'⭐',px,py,S*.5);}
    x.restore();}});}
function fxOverlays(x,W,H,pts,sp,t,src){const U=Math.min(W,H);const fw=pts?pts.fw:W*.35;
  const grad=(cx,cy,r,c0,c1)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,c0);g.addColorStop(1,c1);return g;};
  (sp.o||[]).forEach(o=>{const [k,arg]=o.split(':');x.save();
   if(k==='leakG'||k==='leakP'){x.globalCompositeOperation='screen';const cs=k==='leakG'?['rgba(255,140,40,.55)','rgba(255,60,90,.4)']:['rgba(160,60,255,.5)','rgba(60,120,255,.4)'];
     x.fillStyle=grad(W*(.05+.1*Math.sin(t*.4)),H*.2,U*.8,cs[0],'rgba(0,0,0,0)');x.fillRect(0,0,W,H);x.fillStyle=grad(W*.95,H*(.75+.1*Math.cos(t*.3)),U*.7,cs[1],'rgba(0,0,0,0)');x.fillRect(0,0,W,H);}
   else if(k==='candle'){x.globalCompositeOperation='soft-light';x.globalAlpha=.25+.08*Math.sin(t*13)+.05*Math.sin(t*7.3);x.fillStyle='#ff9a3c';x.fillRect(0,0,W,H);}
   else if(k==='ringEyes'&&pts){[[468,LMK.eyeL],[473,LMK.eyeR]].forEach(([c,e])=>{if(!pts.P[c])return;const r=irisR(pts.P,c,e);x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=r*.12;x.beginPath();x.arc(pts.P[c].x,pts.P[c].y,r*.55,0,7);x.stroke();});}
   else if(k==='neon'){x.globalCompositeOperation='screen';const g=x.createLinearGradient(0,0,W,0);g.addColorStop(0,arg);g.addColorStop(.35,'rgba(0,0,0,0)');g.addColorStop(.65,'rgba(0,0,0,0)');g.addColorStop(1,arg==='#00E5FF'?'#FF2E9A':'#2E6BFF');x.globalAlpha=.45;x.fillStyle=g;x.fillRect(0,0,W,H);}
   else if(k==='flash'){const a=Math.pow(Math.max(0,Math.sin(t*3.2)),24);x.globalAlpha=a*.7;x.fillStyle='#fff';x.fillRect(0,0,W,H);}
   else if(k==='rays'){x.globalCompositeOperation='screen';for(let i=0;i<5;i++){const xx=W*(.1+i*.2+.03*Math.sin(t*.5+i));const g=x.createLinearGradient(xx,0,xx+W*.25,H);g.addColorStop(0,'rgba(255,240,200,.35)');g.addColorStop(1,'rgba(255,240,200,0)');x.fillStyle=g;x.beginPath();x.moveTo(xx,0);x.lineTo(xx+W*.06,0);x.lineTo(xx+W*.4,H);x.lineTo(xx+W*.22,H);x.closePath();x.fill();}}
   else if(k==='eyeSpark'&&pts){[468,473].forEach((c,j)=>{const p=pts.P[c];if(!p)return;const r=fw*.035*(.6+.4*Math.abs(Math.sin(t*3+j)));x.fillStyle='#fff';x.shadowColor='#fff';x.shadowBlur=r;x.beginPath();star4(x,p.x-fw*.012,p.y-fw*.012,r);x.fill();});}
   else if(k==='animeEyes'&&pts){[[468,LMK.eyeL],[473,LMK.eyeR]].forEach(([c,e])=>{const p=pts.P[c];if(!p)return;const r=irisR(pts.P,c,e);eyeClip(x,pts.P,e,()=>{x.fillStyle='rgba(255,255,255,.95)';x.beginPath();x.ellipse(p.x-r*.35,p.y-r*.4,r*.3,r*.22,-.5,0,7);x.fill();x.beginPath();x.arc(p.x+r*.3,p.y+r*.3,r*.12,0,7);x.fill();x.globalCompositeOperation='screen';x.globalAlpha=.35;x.fillStyle='#8EC5FF';x.beginPath();x.arc(p.x,p.y+r*.4,r*.6,0,7);x.fill();});});}
   else if(k==='starEyes'&&pts){[[468,LMK.eyeL],[473,LMK.eyeR]].forEach(([c,e])=>{const p=pts.P[c];if(!p)return;const r=irisR(pts.P,c,e);eyeClip(x,pts.P,e,()=>{x.fillStyle='#FFD43B';x.beginPath();star5(x,p.x,p.y,r*1.05*(.85+.15*Math.sin(t*5)));x.fill();x.fillStyle='#fff';x.beginPath();star4(x,p.x-r*.3,p.y-r*.3,r*.3);x.fill();});});}
   else if(k==='disco'){x.globalCompositeOperation='screen';for(let i=0;i<6;i++){const a=t*(.7+i*.13)+i;x.fillStyle=grad(W*(.5+.45*Math.cos(a)),H*(.5+.4*Math.sin(a*1.3)),U*.35,['rgba(255,40,140,.5)','rgba(40,160,255,.5)','rgba(80,255,120,.45)','rgba(255,220,40,.45)','rgba(170,60,255,.5)','rgba(255,90,40,.45)'][i],'rgba(0,0,0,0)');x.fillRect(0,0,W,H);}}
   else if(k==='bokeh'||k==='bokehW'||k==='bokehN'){x.globalCompositeOperation='screen';const pal=k==='bokehW'?['255,200,90','255,120,80','255,230,150','120,220,140','255,90,90']:k==='bokehN'?['255,40,160','40,200,255','150,80,255','255,220,40']:['255,210,150','150,190,255','255,150,200','255,255,220'];
     for(let i=0;i<16;i++){const px=rr(i,1)*W+Math.sin(t*.3+i)*U*.02,py=rr(i,2)*H*.75,r=U*(.03+rr(i,3)*.07);x.fillStyle=grad(px,py,r,`rgba(${pal[i%pal.length]},.5)`,`rgba(${pal[i%pal.length]},0)`);x.beginPath();x.arc(px,py,r,0,7);x.fill();}}
   else if(k==='caustics'){x.globalCompositeOperation='screen';x.strokeStyle='rgba(200,240,255,.22)';x.lineWidth=U*.01;for(let i=0;i<8;i++){x.beginPath();for(let s=0;s<=20;s++){const xx=s/20*W,yy=H*(.1+i*.12)+Math.sin(s*.9+t*2+i)*U*.03;s?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.stroke();}}
   else if(k==='lightning'||k==='lightningY'){const ph=(t*.7)%1;if(ph<.18){const seed=Math.floor(t*.7);x.globalAlpha=.25*(1-ph/.18);x.fillStyle=k==='lightningY'?'#fff3b0':'#dfe8ff';x.fillRect(0,0,W,H);x.globalAlpha=1-ph/.18;x.strokeStyle=k==='lightningY'?'#FFE14D':'#E8F0FF';x.shadowColor=x.strokeStyle;x.shadowBlur=U*.03;x.lineWidth=U*.012;
       for(let b=0;b<2;b++){let px=W*(.15+.7*rr(seed,b+1)),py=0;x.beginPath();x.moveTo(px,py);while(py<H*.75){py+=H*.06;px+=(rr(seed+py,b)-.5)*W*.12;x.lineTo(px,py);}x.stroke();}}}
   else if(k==='half'){const g=x.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.48,'rgba(0,0,0,.1)');g.addColorStop(.62,'rgba(0,0,0,.75)');g.addColorStop(1,'rgba(0,0,0,.85)');x.globalCompositeOperation='multiply';x.fillStyle=g;x.fillRect(0,0,W,H);}
   else if(k==='studio'){x.globalCompositeOperation='screen';const g=x.createRadialGradient(W/2,H*.4,U*.35,W/2,H*.4,U*1.1);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.55)');x.fillStyle=g;x.fillRect(0,0,W,H);}
   else if(k==='spot'){const c=pts?pts.eyes:{x:W/2,y:H*.4};const g=x.createRadialGradient(c.x,c.y,fw*.7,c.x,c.y,fw*1.8);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.88)');x.fillStyle=g;x.fillRect(0,0,W,H);}
   else if(k==='galaxy'){x.globalCompositeOperation='screen';x.fillStyle=grad(W*.2,H*.25,U*.7,'rgba(120,40,255,.45)','rgba(0,0,0,0)');x.fillRect(0,0,W,H);x.fillStyle=grad(W*.85,H*.7,U*.7,'rgba(255,60,180,.35)','rgba(0,0,0,0)');x.fillRect(0,0,W,H);for(let i=0;i<60;i++){x.globalAlpha=.4+.6*Math.abs(Math.sin(t*2+i));x.fillStyle='#fff';x.fillRect(rr(i,4)*W,rr(i,5)*H,1.6,1.6);}}
   else if(k==='rgbHalo'){x.globalCompositeOperation='screen';const c=pts?{x:pts.eyes.x,y:pts.eyes.y}:{x:W/2,y:H*.4};['rgba(255,60,60,.4)','rgba(60,255,120,.4)','rgba(60,120,255,.4)'].forEach((col,i)=>{x.strokeStyle=col;x.lineWidth=U*.025;x.beginPath();x.arc(c.x+Math.cos(t*2+i*2.1)*U*.01,c.y-fw*.1,fw*(.85+i*.05),0,7);x.stroke();});}
   else if(k==='lamp'){x.globalCompositeOperation='screen';x.fillStyle=grad(W*.15,H*.1,U*.9,'rgba(255,190,90,.6)','rgba(0,0,0,0)');x.fillRect(0,0,W,H);}
   else if(k==='flicker'){if(rr(Math.floor(t*12),3)>.85){x.globalAlpha=.25;x.fillStyle='#000';x.fillRect(0,0,W,H);}}
   else if(k==='bars'){x.fillStyle='#000';x.fillRect(0,0,W,H*.11);x.fillRect(0,H*.89,W,H*.11);}
   else if(k==='teddy'){emoji(x,'🧸',W*.16,H*(.93-.04*Math.abs(Math.sin(t*1.5))),U*.32,.25);}
   else if(k==='polaroid'){const b=U*.045;x.fillStyle='#fbfaf6';x.fillRect(0,0,W,b);x.fillRect(0,0,b,H);x.fillRect(W-b,0,b,H);x.fillRect(0,H-b*5,W,b*5);x.fillStyle='#555';x.font=`${Math.round(U*.045)}px "Marker Felt","Comic Sans MS",cursive`;x.fillText('R-Style ♡',b*1.5,H-b*2);}
   else if(k==='film'){const b=W*.07;x.fillStyle='#111';x.fillRect(0,0,b,H);x.fillRect(W-b,0,b,H);x.fillStyle='#eee';const off=(t*40)%(H*.06);for(let y=-H*.06+off;y<H;y+=H*.06){x.fillRect(b*.3,y,b*.4,H*.03);x.fillRect(W-b*.7,y,b*.4,H*.03);}x.fillStyle='#E8A33D';x.font=`700 ${Math.round(U*.025)}px monospace`;x.fillText('KODAK 400  ▸ 24',b*1.2,H-U*.03);}
   else if(k==='vhs'){x.fillStyle='#fff';x.shadowColor='#000';x.shadowBlur=4;x.font=`700 ${Math.round(U*.05)}px "VT323","Courier New",monospace`;x.fillText('PLAY ▶',U*.06,U*.1);const d=new Date();x.fillText('SP',W-U*.16,U*.1);
     x.fillText(`${String(Math.floor(t/60)%60).padStart(2,'0')}:${String(Math.floor(t)%60).padStart(2,'0')}:${String(Math.floor(t*30)%30).padStart(2,'0')}`,U*.06,H-U*.12);x.fillText(d.toLocaleDateString('en',{month:'short',day:'2-digit',year:'numeric'}).toUpperCase(),U*.06,H-U*.05);}
   else if(k==='dateO'){const d=new Date();x.font=`700 ${Math.round(U*.055)}px "Courier New",monospace`;x.fillStyle='#FF8A1F';x.shadowColor='#FF5A00';x.shadowBlur=U*.012;x.textAlign='right';x.fillText(`'${String(d.getFullYear()).slice(2)} ${String(d.getMonth()+1).padStart(2,'0')} ${String(d.getDate()).padStart(2,'0')}`,W-U*.06,H-U*.08);}
   else if(k==='scratch'){x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=1;const s=Math.floor(t*12);for(let i=0;i<4;i++){if(rr(s,i)>.5)continue;const xx=rr(s,i+9)*W;x.beginPath();x.moveTo(xx,0);x.lineTo(xx+(rr(s,i+3)-.5)*20,H);x.stroke();}x.fillStyle='rgba(30,25,20,.5)';for(let i=0;i<10;i++){x.fillRect(rr(s,i+20)*W,rr(s,i+30)*H,2+rr(s,i)*3,2+rr(s,i+1)*3);}}
   else if(k==='dirt'){x.globalCompositeOperation='multiply';for(let i=0;i<9;i++){x.fillStyle=grad(rr(i,41)*W,rr(i,42)*H,U*(.08+rr(i,43)*.15),'rgba(120,110,100,.35)','rgba(255,255,255,0)');x.fillRect(0,0,W,H);}}
   else if(k==='camcorder'){x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=U*.006;const m=U*.06,L=U*.08;[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+sy*L);x.lineTo(a,b);x.lineTo(a+sx*L,b);x.stroke();});
     if(Math.floor(t*2)%2){x.fillStyle='#ff2a2a';x.beginPath();x.arc(m+U*.06,m+U*.07,U*.016,0,7);x.fill();}x.fillStyle='#fff';x.font=`700 ${Math.round(U*.04)}px monospace`;x.fillText('REC',m+U*.09,m+U*.085);x.fillText('▮▮▮▯',W-m-U*.2,m+U*.085);}
   else if(k==='crt'){x.strokeStyle='#0a0a0a';x.lineWidth=U*.08;x.beginPath();x.roundRect?x.roundRect(0,0,W,H,U*.12):x.rect(0,0,W,H);x.stroke();}
   else if(k==='flashY'){x.globalCompositeOperation='screen';x.fillStyle=grad(W/2,H*.4,U*.8,'rgba(255,240,170,.35)','rgba(0,0,0,0)');x.fillRect(0,0,W,H);}
   else if(k==='album'){const b=U*.06;x.fillStyle='#efe6d2';x.fillRect(0,0,W,b);x.fillRect(0,0,b,H);x.fillRect(W-b,0,b,H);x.fillRect(0,H-b,W,b);x.fillStyle='rgba(230,215,170,.85)';[[b*.4,b*.2,.6],[W-b*3.4,H-b*1.4,.6]].forEach(([a,c,r])=>{x.save();x.translate(a+b*1.5,c+b*.6);x.rotate(r);x.fillRect(-b*1.6,-b*.4,b*3.2,b*.8);x.restore();});}
   else if(k==='yellow'){x.globalCompositeOperation='multiply';x.fillStyle='rgba(255,230,160,.5)';x.fillRect(0,0,W,H);}
   else if(k==='mag'){x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.4)';x.shadowBlur=10;x.textAlign='center';x.font=`700 ${Math.round(W*.15)}px Georgia,serif`;x.fillText('R-STYLE',W/2,W*.17);x.font=`600 ${Math.round(W*.03)}px Inter,system-ui`;x.fillText(new Date().toLocaleDateString(S.lang||'en',{month:'long',year:'numeric'}).toUpperCase(),W/2,W*.22);x.textAlign='left';x.font=`italic ${Math.round(W*.055)}px Georgia,serif`;x.fillText(t2('The look of the day'),W*.06,H*.82);}
   else if(k==='ornate'){x.strokeStyle='#D4AF37';x.lineWidth=U*.025;x.strokeRect(U*.03,U*.03,W-U*.06,H-U*.06);x.lineWidth=U*.006;x.strokeRect(U*.06,U*.06,W-U*.12,H-U*.12);x.fillStyle='#D4AF37';[[U*.045,U*.045],[W-U*.045,U*.045],[U*.045,H-U*.045],[W-U*.045,H-U*.045]].forEach(([a,b])=>{x.beginPath();x.arc(a,b,U*.03,0,7);x.fill();});}
   else if(k==='burnt'){x.globalCompositeOperation='multiply';for(let i=0;i<14;i++){const e=i%4;const px=e===0?0:e===1?W:rr(i,51)*W,py=e===2?0:e===3?H:rr(i,52)*H;x.fillStyle=grad(e<2?px:px,e>=2?py:rr(i,53)*H,U*(.15+rr(i,54)*.2),'rgba(60,25,5,.95)','rgba(255,255,255,0)');x.fillRect(0,0,W,H);}}
   else if(k==='fog'){x.globalCompositeOperation='screen';for(let i=0;i<7;i++){x.fillStyle=grad(((rr(i,61)+t*.02*(i%2?1:-1))%1+1)%1*W,H*(.3+rr(i,62)*.7),U*(.3+rr(i,63)*.3),'rgba(255,255,255,.28)','rgba(255,255,255,0)');x.fillRect(0,0,W,H);}}
   else if(k==='drops'){for(let i=0;i<26;i++){const px=rr(i,71)*W,py=rr(i,72)*H,r=U*(.008+rr(i,73)*.02);x.fillStyle='rgba(255,255,255,.18)';x.beginPath();x.arc(px,py,r,0,7);x.fill();x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(px-r*.35,py-r*.35,r*.25,0,7);x.fill();}}
   else if(k==='rain'){x.strokeStyle='rgba(220,230,255,.45)';x.lineWidth=1.5;for(let i=0;i<70;i++){const px=rr(i,81)*W,py=((rr(i,82)+t*(1.2+rr(i,83)))%1)*H;x.beginPath();x.moveTo(px,py);x.lineTo(px-U*.01,py+U*.06);x.stroke();}}
   else if(k==='collage'&&src){[[.18,.2,-.18],[.82,.25,.15],[.75,.78,-.1]].forEach(([a,b,r],i)=>{const w=W*.3,h=w*H/W;x.save();x.translate(W*a,H*b+Math.sin(t*1.5+i)*U*.015);x.rotate(r+Math.sin(t+i)*.04);x.fillStyle='#fff';x.shadowColor='rgba(0,0,0,.35)';x.shadowBlur=10;x.fillRect(-w/2-6,-h/2-6,w+12,h+22);x.shadowBlur=0;x.drawImage(src,-w/2,-h/2,w,h);x.restore();});}
   else if(k==='scanner'){const c=pts?pts.eyes:{x:W/2,y:H*.4};const yy=c.y-fw*.7+((t*.6)%1)*fw*1.6;x.globalCompositeOperation='screen';const g=x.createLinearGradient(0,yy-U*.04,0,yy+U*.04);g.addColorStop(0,'rgba(255,0,40,0)');g.addColorStop(.5,'rgba(255,40,60,.9)');g.addColorStop(1,'rgba(255,0,40,0)');x.fillStyle=g;x.fillRect(0,yy-U*.04,W,U*.08);x.fillStyle='rgba(255,60,80,.12)';x.fillRect(0,0,W,yy);}
   else if(k==='shatter'){const c={x:W*.62,y:H*.42};x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=1.6;for(let i=0;i<14;i++){const a=i/14*6.283+rr(i,91)*.3;let px=c.x,py=c.y;x.beginPath();x.moveTo(px,py);for(let s=0;s<4;s++){px+=Math.cos(a+(rr(i,s)-.5)*.5)*U*.15;py+=Math.sin(a+(rr(i,s+5)-.5)*.5)*U*.15;x.lineTo(px,py);}x.stroke();}
     for(let ring=1;ring<4;ring++){x.beginPath();for(let i=0;i<=14;i++){const a=i/14*6.283;const r=U*.06*ring*(1+rr(i,ring)*.4);i?x.lineTo(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r):x.moveTo(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r);}x.stroke();}}
   else if(k==='laserEyes'&&pts){x.globalCompositeOperation='screen';[468,473].forEach((c,j)=>{const p=pts.P[c];if(!p)return;const dir=j===0?-1:1;const ex=p.x+dir*W*.8,ey=p.y+H*.12;const w=fw*.05*(.8+.2*Math.sin(t*20));
       x.strokeStyle='rgba(255,30,30,.85)';x.shadowColor='#ff2020';x.shadowBlur=fw*.08;x.lineWidth=w;x.lineCap='round';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(ex,ey);x.stroke();x.strokeStyle='rgba(255,230,230,.95)';x.lineWidth=w*.3;x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(p.x,p.y,fw*.03,0,7);x.fill();});}
   else if(k==='cityEyes'&&pts){[[468,LMK.eyeL],[473,LMK.eyeR]].forEach(([c,e])=>{const p=pts.P[c];if(!p)return;const r=irisR(pts.P,c,e);eyeClip(x,pts.P,e,()=>{const g=x.createLinearGradient(p.x,p.y-r,p.x,p.y+r);g.addColorStop(0,'#FF2E9A');g.addColorStop(.5,'#7C3AED');g.addColorStop(1,'#00E5FF');x.globalCompositeOperation='color';x.globalAlpha=.9;x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,r,0,7);x.fill();
       x.globalCompositeOperation='screen';x.globalAlpha=.8;x.fillStyle='#FFE08A';for(let i=0;i<6;i++){x.fillRect(p.x-r*.8+i*r*.27,p.y+r*.1-rr(i,5)*r*.5,r*.15,r*.6);}});});}
   else if(k==='smoke'){x.globalCompositeOperation='screen';for(let i=0;i<8;i++){const a=t*.25+i;x.fillStyle=grad(W*(.5+.5*Math.sin(a*.9+i)),H*(.95-((t*.05+rr(i,99))%1)*1.1),U*(.25+rr(i,98)*.2),['rgba(255,60,180,.38)','rgba(80,140,255,.38)','rgba(255,200,40,.32)','rgba(140,60,255,.38)'][i%4],'rgba(0,0,0,0)');x.fillRect(0,0,W,H);}}
   else if(k==='cracks'&&pts){x.strokeStyle='rgba(70,50,40,.55)';x.lineWidth=1.2;[[151,.0],[50,1],[280,2]].forEach(([i,s])=>{let p={...pts.P[i]};x.beginPath();x.moveTo(p.x,p.y);for(let k2=0;k2<6;k2++){p.x+=(rr(k2,s*3+1)-.5)*fw*.08;p.y+=rr(k2,s*3+2)*fw*.05;x.lineTo(p.x,p.y);}x.stroke();});}
   else if(k==='galaxyFace'&&pts){x.save();x.beginPath();bxPath(x,pts.P,LMK.oval);x.clip();x.globalCompositeOperation='overlay';const g=x.createLinearGradient(pts.top.x-fw*.5,pts.top.y,pts.chin.x+fw*.5,pts.chin.y);g.addColorStop(0,'rgba(90,40,255,.75)');g.addColorStop(.5,'rgba(255,50,170,.65)');g.addColorStop(1,'rgba(40,180,255,.7)');x.fillStyle=g;x.fillRect(0,0,W,H);
     x.globalCompositeOperation='screen';for(let i=0;i<50;i++){x.globalAlpha=.5+.5*Math.abs(Math.sin(t*2+i));x.fillStyle='#fff';const px=pts.eyes.x+(rr(i,6)-.5)*fw,py=pts.eyes.y+(rr(i,7)-.4)*fw*1.2;x.fillRect(px,py,2,2);}x.restore();}
   else if(k==='plastic'){const b=U*.05;x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=b;x.beginPath();x.roundRect?x.roundRect(b/2,b/2,W-b,H-b,U*.08):x.rect(b/2,b/2,W-b,H-b);x.stroke();x.globalCompositeOperation='screen';x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=U*.008;x.beginPath();x.moveTo(b*1.4,H*.25);x.lineTo(b*1.4,b*1.4);x.lineTo(W*.3,b*1.4);x.stroke();}
   else if(k==='neonText'){const y=H*.16+Math.sin(t*1.5)*U*.015;x.textAlign='center';x.font=`italic 800 ${Math.round(U*.11)}px "Snell Roundhand","Brush Script MT",cursive`;x.shadowColor='#FF2E9A';x.shadowBlur=U*.04;x.fillStyle='#FFE4F3';x.fillText(S.vip?'Gold Style ✨':'R-Style ✨',W/2,y);x.shadowBlur=U*.015;x.fillText(S.vip?'Gold Style ✨':'R-Style ✨',W/2,y);}
   else if(k==='hud'){const c=pts?pts.eyes:{x:W/2,y:H*.4};x.strokeStyle='rgba(80,240,255,.9)';x.fillStyle='rgba(80,240,255,.9)';x.lineWidth=U*.004;const r=fw*.75;x.beginPath();x.arc(c.x,c.y,r,t%6.28,t%6.28+4.5);x.stroke();x.beginPath();x.arc(c.x,c.y,r*1.12,-(t*.7)%6.28,-(t*.7)%6.28+2.5);x.stroke();
     x.font=`600 ${Math.round(U*.028)}px monospace`;['SCAN ▸ OK','STYLE 98%','ID: '+(me().username||'USER').toUpperCase(),'MOOD: ✦ GLOW'].forEach((s,i)=>x.fillText(s,U*.05,H*.62+i*U*.04));x.fillRect(c.x+r*.9,c.y-1,U*.08,2);}
   else if(k==='heartOpen'){const ph=(t*.45)%1;const r=U*(.05+ph*1.3);if(ph<.95){x.fillStyle='rgba(0,0,0,.92)';x.beginPath();x.rect(0,0,W,H);heartP(x,W/2,H*.45,r);x.fill('evenodd');}}
   else if(k==='glassNeon'&&pts){x.globalCompositeOperation='screen';[468,473].forEach((c,j)=>{const p=pts.P[c];if(!p)return;const g=x.createLinearGradient(p.x-fw*.1,p.y-fw*.06,p.x+fw*.1,p.y+fw*.06);g.addColorStop(0,'rgba(255,40,160,.55)');g.addColorStop(1,'rgba(40,200,255,.55)');x.fillStyle=g;x.beginPath();x.ellipse(p.x,p.y+fw*.02,fw*.11,fw*.07,0,0,7);x.fill();});}
   else if(k==='zoomUI'){x.fillStyle='#fff';x.font=`700 ${Math.round(U*.045)}px Inter,system-ui`;x.fillText('×4.0',U*.06,U*.1);x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=2;x.strokeRect(W/2-U*.12,H*.4-U*.12,U*.24,U*.24);}
   x.restore();});}
const t2=s=>t(s);
/* everything after the WebGL picture */
function fxPost(x,W,H,P,fw,f,tm,src){const sp=f.sp||{};let pts=null;if(P){pts=fxPts(P,fw);}fxMakeup(x,P,fw,f.bx,tm);
  if(pts)(sp.s||[]).forEach(p=>drawSticker(x,pts,p,tm));drawParticles(x,W,H,pts,sp,tm);fxOverlays(x,W,H,pts,sp,tm,src);}

/* live loop (replaces the v12 one) */
let FXHOLD=0,FXTRAIL=null;
bxLoop=function(){cancelAnimationFrame(BX.raf);BX.raf=0;const s=$('#snap');const out=s&&s.querySelector('.bxOut');const v=$('#snapV');if(!out||!v)return;const f=filterById(SNAP.filter);FXCUR=f;const on=bxActive();out.style.visibility=on?'visible':'hidden';
  if(on&&v.videoWidth){const sp=f.sp||{};const now=performance.now();if(sp.hold&&now-FXHOLD<sp.hold*1000){BX.raf=requestAnimationFrame(bxLoop);return;}FXHOLD=now;
    const W=Math.min(960,v.videoWidth),H=Math.round(W*v.videoHeight/v.videoWidth);let lm=null;if(FT.lm){const r=ftDetect(v);if(r)lm=bxSmooth(r);else BX.sm=null;}const tm=(now/1000)%1000;
    const {P,fw}=bxRender(v,W,H,true,lm,f.bx,tm);if(out.width!==W||out.height!==H){out.width=W;out.height=H;}const x=out.getContext('2d');x.globalCompositeOperation='source-over';x.globalAlpha=1;
    if(sp.trail){if(!FXTRAIL||FXTRAIL.width!==W){FXTRAIL=document.createElement('canvas');FXTRAIL.width=W;FXTRAIL.height=H;}const tx2=FXTRAIL.getContext('2d');tx2.globalAlpha=1-sp.trail*.6;tx2.drawImage(BX.cv,0,0);x.drawImage(FXTRAIL,0,0);x.globalAlpha=.55;x.drawImage(BX.cv,0,0);x.globalAlpha=1;}
    else x.drawImage(BX.cv,0,0);fxPost(x,W,H,P,fw,f,tm,BX.cv);}
  BX.raf=requestAnimationFrame(bxLoop);};
bxStill=async function(dataUrl,f){if(!bxInit())return dataUrl;FXCUR=f;const im=new Image();await new Promise(r=>{im.onload=r;im.onerror=r;im.src=dataUrl;});if(!im.width)return dataUrl;
  const W=Math.min(1200,im.width),H=Math.round(W*im.height/im.width);let lm=null;if(FT.lm||!FT.failed){try{await ftLoad();lm=ftDetect(im);}catch(_){}}
  const tm=1.3;const {P,fw}=bxRender(im,W,H,false,lm,f.bx,tm);const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(BX.cv,0,0);fxPost(x,W,H,P,fw,f,tm,BX.cv);return c.toDataURL('image/jpeg',.9);};
/* the last filter used stays selected; start on the first tab */
(function(){const css=document.createElement('style');css.textContent=`#snap .fname{max-width:80%;left:50%;transform:translateX(-50%);text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`;document.head.appendChild(css);
 const T={'Make-up':['Maquillage','איפור','مكياج']};['fr','he','ar'].forEach((c,i)=>{for(const k in T)window.I18N[c][k]=T[k][i];});})();
