/* R-Style 3D avatar v4 — stylized (Pixar-like) character with jointed limbs, face details,
   hairstyles, makeup, accessories, dressing rooms and animations.
   window.Avatar3D.mount(el,cfg) -> {set(cfg), play(name), snapshot(), destroy()} */
(function(){
  const ROOMS={
    modern:{bg:'#eceef2',floor:'#d9dce2',wall:'#f6f7f9',rack:'#9aa0a8',light:'#ffffff',rug:'#ffffff'},
    beach:{bg:'#9fd6f2',floor:'#ecd9b0',wall:'#bfe6f7',rack:'#b98a57',light:'#fff6dd',rug:'#ffffff',sun:true},
    boutique:{bg:'#2a2118',floor:'#5b4632',wall:'#efe3cf',rack:'#d4af37',light:'#ffe2b0',rug:'#7a1f2b'},
    runway:{bg:'#07070a',floor:'#16161c',wall:'#0d0d12',rack:'#3a3a44',light:'#ffffff',rug:'#e11d2e',spot:true},
    paris:{bg:'#f3dfe4',floor:'#e9c9d2',wall:'#fbeef1',rack:'#c9a24b',light:'#fff1f4',rug:'#ffffff'},
    night:{bg:'#120a24',floor:'#1c1236',wall:'#170d2e',rack:'#8b5cf6',light:'#c7b8ff',rug:'#e11d2e',neon:true},
    gold:{bg:'#0d0a04',floor:'#1a1408',wall:'#120e06',rack:'#d4a017',light:'#ffe6a8',rug:'#d4a017',spot:true}
  };
  function shade(hex,amt){let c=(hex||'#888888').replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');const n=parseInt(c,16);let r=(n>>16)+amt,g=((n>>8)&255)+amt,b=(n&255)+amt;r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b));return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}

  function mount(el,cfg){
    const T=window.THREE;if(!T)throw new Error('three missing');
    const renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
    renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
    renderer.domElement.style.cssText='width:100%;height:100%;display:block;touch-action:none';el.appendChild(renderer.domElement);
    const scene=new T.Scene();
    const camera=new T.PerspectiveCamera(30,1,.1,100);
    camera.position.set(0,1.12,4.1);camera.lookAt(0,1.0,0);
    let roomG=new T.Group(),lightsG=new T.Group(),person=new T.Group();scene.add(roomG,lightsG,person);
    let J={};let cur=cfg,alive=true,raf=0,t0=performance.now();
    let rot=0,target=0,dragging=false,lastX=0,idle=0,anim=cfg.anim||'idle',animT=0;

    const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7,metalness:0},o));
    const B=(c)=>new T.MeshBasicMaterial({color:c});
    function mesh(g,m,x=0,y=0,z=0,cast=true){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;return o;}
    function cap(r,l,m,x,y,z,rz=0,rx=0){const o=mesh(new T.CapsuleGeometry(r,l,10,20),m,x,y,z);o.rotation.z=rz;o.rotation.x=rx;return o;}
    function sph(r,m,x,y,z,sx=1,sy=1,sz=1,seg=28){const o=mesh(new T.SphereGeometry(r,seg,Math.round(seg*.75)),m,x,y,z);o.scale.set(sx,sy,sz);return o;}
    function lathe(points,m,sz=.68){const g=new T.LatheGeometry(points.map(p=>new T.Vector2(p[0],p[1])),48);m.side=T.DoubleSide;const o=mesh(g,m);o.scale.z=sz;return o;}
    const PROF={
      man:[[.001,0],[.14,0],[.16,.06],[.152,.16],[.148,.26],[.162,.38],[.19,.5],[.198,.56],[.15,.62],[.001,.635]],
      woman:[[.001,0],[.152,0],[.172,.07],[.152,.17],[.118,.28],[.136,.4],[.156,.5],[.16,.56],[.116,.62],[.001,.635]]
    };
    const scaled=(prof,s,a=-1,b=9)=>prof.filter(p=>p[1]>=a&&p[1]<=b&&(p[0]>.01||a<0)).map(p=>[p[0]*s,p[1]]);

    function buildRoom(){
      scene.remove(roomG);roomG=new T.Group();scene.add(roomG);scene.remove(lightsG);lightsG=new T.Group();scene.add(lightsG);
      const R=ROOMS[cur.room]||ROOMS.modern;scene.background=new T.Color(R.bg);scene.fog=new T.Fog(R.bg,6,14);
      const floor=mesh(new T.CircleGeometry(7,64),M(R.floor,{roughness:R.spot?.22:.9,metalness:R.spot?.35:0}),0,0,0,false);floor.rotation.x=-Math.PI/2;roomG.add(floor);
      roomG.add(mesh(new T.CylinderGeometry(5,5,5,64,1,true,Math.PI*.7,Math.PI*.6),M(R.wall,{side:T.BackSide,roughness:1}),0,2.5,1.2,false));
      roomG.add(mesh(new T.CylinderGeometry(.66,.66,.012,56),M(R.rug,{roughness:.95,metalness:cur.room==='gold'?.6:0}),0,.006,0,false));
      if(R.spot)roomG.add(mesh(new T.BoxGeometry(1.1,.01,7),M(cur.room==='gold'?'#2a210c':'#1f1f28',{roughness:.2,metalness:.5}),0,.004,-2,false));
      if(R.sun)roomG.add(mesh(new T.SphereGeometry(.5,24,16),B('#ffe08a'),2.2,3.2,-3.6,false));
      if(R.neon){roomG.add(mesh(new T.TorusGeometry(1.2,.025,12,80),B('#e11d2e'),0,1.25,-1.6,false));roomG.add(mesh(new T.TorusGeometry(1.32,.012,12,80),B('#8b5cf6'),0,1.25,-1.62,false));}
      const cols=(cur.rack&&cur.rack.length?cur.rack:['#e9e9ee','#3b5b92','#b08d57','#d7263d','#222','#8a5a44']);
      [-1,1].forEach((side,si)=>{const g=new T.Group();g.position.set(side*1.45,0,-.55);g.rotation.y=-side*.55;const rm=M(R.rack,{metalness:.75,roughness:.28});
        const bar=mesh(new T.CylinderGeometry(.015,.015,1.3,12),rm,0,1.62,0);bar.rotation.z=Math.PI/2;g.add(bar);
        g.add(mesh(new T.CylinderGeometry(.018,.018,1.62,12),rm,-.64,.81,0));g.add(mesh(new T.CylinderGeometry(.018,.018,1.62,12),rm,.64,.81,0));g.add(mesh(new T.BoxGeometry(1.4,.03,.36),rm,0,.02,0));
        for(let i=0;i<6;i++){const c=cols[(i+si*3)%cols.length];const x=-.52+i*.21;g.add(mesh(new T.TorusGeometry(.03,.006,6,16,Math.PI),rm,x,1.6,0));
          const cl=mesh(new T.BoxGeometry(.19,.62,.05),M(c,{roughness:.85}),x,1.24,0);cl.rotation.y=.25*((i%2)?1:-1);g.add(cl);const sh=mesh(new T.BoxGeometry(.27,.1,.06),M(c,{roughness:.85}),x,1.52,0);sh.rotation.y=cl.rotation.y;g.add(sh);}
        roomG.add(g);});
      roomG.add(mesh(new T.BoxGeometry(.9,1.9,.04),M('#cfd8e3',{metalness:.9,roughness:.08}),0,.98,-1.9,false));
      roomG.add(mesh(new T.BoxGeometry(.98,1.98,.03),M(R.rack,{metalness:.6,roughness:.35}),0,.98,-1.93,false));
      if(!scene.userData.env){try{const pm=new T.PMREMGenerator(renderer);const es=new T.Scene();es.background=new T.Color('#888888');
        const add=(c,x,y,z,sx,sy)=>{const m=new T.Mesh(new T.PlaneGeometry(sx,sy),new T.MeshBasicMaterial({color:c,side:T.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);es.add(m);};
        add('#ffffff',0,6,0,6,6);add('#fff1e0',5,2,4,4,4);add('#dfe8ff',-5,2,-3,4,4);add('#ffffff',0,1,-6,6,3);
        scene.userData.env=pm.fromScene(es,.04).texture;pm.dispose();}catch(_){}}
      scene.environment=scene.userData.env||null;
      lightsG.add(new T.HemisphereLight(R.light,shade(R.floor,-40),R.spot?.35:.6));
      const key=new T.DirectionalLight(R.light,1.6);key.position.set(1.6,3.4,3);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-2,right:2,top:3,bottom:-1});key.shadow.radius=4;key.shadow.bias=-.0004;key.shadow.normalBias=.03;lightsG.add(key);
      const fill=new T.DirectionalLight('#ffffff',.55);fill.position.set(-2,1.6,2.5);lightsG.add(fill);
      const rim=new T.DirectionalLight('#ffffff',.8);rim.position.set(-1.5,2.6,-2.5);lightsG.add(rim);
      if(R.spot){const sp=new T.SpotLight(R.light,30,8,.45,.6);sp.position.set(0,4.2,1.2);sp.target.position.set(0,.9,0);sp.castShadow=true;sp.shadow.bias=-.0004;sp.shadow.normalBias=.03;lightsG.add(sp,sp.target);}
    }

    function buildPerson(){
      scene.remove(person);person=new T.Group();scene.add(person);J={};
      const c=cur,wm=c.gender==='woman',bw={slim:.92,regular:1,curvy:1.1}[c.body]||1;
      const skinC=c.skin||'#c68642',sk=M(skinC,{roughness:.5}),hairM=M(c.hair||'#2b1b12',{roughness:.55,metalness:.05});
      const prof=PROF[wm?'woman':'man'],w=c.wear||{},col=i=>(i&&i.color)||'#888888';
      const cm=(i,o)=>M(col(i),Object.assign({roughness:.82},o||{}));
      const body=new T.Group();person.add(body);J.body=body;
      // torso
      const torso=lathe(scaled(prof,bw),sk);torso.position.y=.88;body.add(torso);
      body.add(cap(.05,.05,sk,0,1.56,0));
      // ===== head v5: Pixar-like proportions (big head, big expressive eyes, soft skin) =====
      const G=!!c.gold;
      const skP=new T.MeshPhysicalMaterial({color:skinC,roughness:.52,sheen:G?.6:.35,sheenRoughness:.6,sheenColor:new T.Color('#ff9f8a'),clearcoat:G?.08:0,clearcoatRoughness:.6});
      const head=new T.Group();head.position.set(0,1.70,0);head.scale.setScalar(1.22);body.add(head);J.head=head;
      head.add(sph(.132,skP,0,.01,0,1,1.06,1.02,G?64:44));
      head.add(sph(.105,skP,0,-.05,.02,1.02,.92,1,G?48:32));           // jaw + cheeks volume
      [-1,1].forEach(s=>head.add(sph(.05,skP,s*.062,-.04,.075,1,.85,.8,24))); // round cheeks
      [-1,1].forEach(s=>{const e=sph(.028,skP,s*.131,-.006,-.005,.55,1,.9,16);head.add(e);head.add(sph(.012,M(shade(skinC,-25),{roughness:.6}),s*.137,-.006,.002,.4,.7,.6,10));});
      // eyes
      const white=new T.MeshPhysicalMaterial({color:'#fbfbf8',roughness:.12,clearcoat:1,clearcoatRoughness:.05});
      const eyeC=c.eyes||'#5b3a24',irisOut=M(shade(eyeC,-45),{roughness:.2}),irisIn=new T.MeshPhysicalMaterial({color:shade(eyeC,25),roughness:.1,clearcoat:1});
      const pupil=B('#060606'),hi=B('#ffffff'),lash=M('#181010',{roughness:.5}),lidM=skP;
      [-1,1].forEach(s=>{const ex=s*.05,ey=.012,ez=.1;
        head.add(sph(.043,white,ex,ey,ez,1,1.1,.62,32));
        head.add(sph(.031,irisOut,ex+s*-.002,ey-.002,ez+.021,1,1.08,.45,28));
        head.add(sph(.026,irisIn,ex+s*-.002,ey-.002,ez+.024,1,1.08,.42,28));
        head.add(sph(.0135,pupil,ex+s*-.002,ey-.002,ez+.03,1,1.05,.35,16));
        head.add(sph(.0075,hi,ex+.012,ey+.013,ez+.034,1,1,.4,10));
        head.add(sph(.0035,hi,ex-.009,ey-.012,ez+.034,1,1,.4,8));
        const lt=mesh(new T.TorusGeometry(.043,wm?.0055:.0042,8,24,Math.PI*.95),lash,ex,ey+.004,ez+.008,false);lt.rotation.set(-.55,0,Math.PI*.025);lt.scale.set(1.02,1.05,1);head.add(lt);
        if(wm){for(let k=0;k<3;k++){const l=mesh(new T.BoxGeometry(.0035,.016,.003),lash,ex+s*(.03+k*.006),ey+.03-k*.006,ez+.016,false);l.rotation.z=-s*(.5+k*.25);head.add(l);}}
        // eyebrow: soft curved tube
        const bc=new T.CatmullRomCurve3([new T.Vector3(ex-s*.03,ey+.052,ez+.02),new T.Vector3(ex,ey+.066,ez+.025),new T.Vector3(ex+s*.036,ey+.056,ez+.012)]);
        head.add(mesh(new T.TubeGeometry(bc,16,wm?.0055:.0085,8,false),hairM,0,0,0,false));});
      // nose
      head.add(sph(.022,skP,0,-.03,.13,1,.9,1,20));head.add(sph(.012,skP,0,-.012,.128,.8,1.6,.8,12));
      [-1,1].forEach(s=>head.add(sph(.009,skP,s*.016,-.036,.123,1,.8,.9,10)));
      // smile
      const lipC=(c.makeup&&c.makeup.lips)||shade(skinC,-38);
      const sc=new T.CatmullRomCurve3([new T.Vector3(-.036,-.068,.112),new T.Vector3(-.018,-.081,.122),new T.Vector3(0,-.084,.125),new T.Vector3(.018,-.081,.122),new T.Vector3(.036,-.068,.112)]);
      head.add(mesh(new T.TubeGeometry(sc,24,.0055,8,false),M(lipC,{roughness:.35}),0,0,0,false));
      const lc=new T.CatmullRomCurve3([new T.Vector3(-.014,-.094,.12),new T.Vector3(0,-.097,.121),new T.Vector3(.014,-.094,.12)]);
      head.add(mesh(new T.TubeGeometry(lc,12,.006,8,false),M(shade(lipC,12),{roughness:.4}),0,0,0,false));
      // soft blush (always a little, more with make-up)
      const bl=new T.MeshStandardMaterial({color:'#ff7f86',transparent:true,opacity:(c.makeup&&c.makeup.blush)?.38:.16,roughness:.9,depthWrite:false});
      [-1,1].forEach(s=>head.add(sph(.03,bl,s*.074,-.036,.104,1,.7,.35,14)));
      if(c.freckles){const fm=M(shade(skinC,-55));for(let i=0;i<12;i++){const s=i%2?1:-1;head.add(sph(.0028,fm,s*(.035+((i*37)%10)/200),-.025+((i*13)%7)/250,.125,1,1,.4,6));}}
      if(c.glasses){const gm=M('#1c1c1c',{metalness:.6,roughness:.3});[-1,1].forEach(s=>{head.add(mesh(new T.TorusGeometry(.047,.0045,8,28),gm,s*.05,.01,.142,false));head.add(mesh(new T.BoxGeometry(.004,.004,.13),gm,s*.1,.014,.08,false));});head.add(mesh(new T.BoxGeometry(.022,.004,.004),gm,0,.018,.145,false));
        const lens=new T.MeshStandardMaterial({color:'#9fc3ff',transparent:true,opacity:.15,roughness:.05});[-1,1].forEach(s=>head.add(mesh(new T.CircleGeometry(.045,24),lens,s*.05,.01,.144,false)));}
      if(c.earrings){const gm=M('#d4a017',{metalness:.9,roughness:.2});[-1,1].forEach(s=>head.add(sph(.011,gm,s*.134,-.04,.008,1,1,1,12)));}
      // hair: soft volume made of clumps (more detail for Gold)
      const hs=c.hairStyle||(wm?'long':'short');
      const hM=new T.MeshPhysicalMaterial({color:c.hair||'#2b1b12',roughness:.5,sheen:.8,sheenColor:new T.Color(shade(c.hair||'#2b1b12',70)),sheenRoughness:.35});
      const hM2=new T.MeshPhysicalMaterial({color:shade(c.hair||'#2b1b12',14),roughness:.5,sheen:.8,sheenColor:new T.Color(shade(c.hair||'#2b1b12',80)),sheenRoughness:.35});
      const capH=mesh(new T.SphereGeometry(.146,G?64:44,24,0,Math.PI*2,0,Math.PI*.46),hM,0,.02,-.012);capH.scale.set(1.05,1.08,1.08);capH.rotation.x=-.38;head.add(capH);
      head.add(sph(.14,hM,0,.0,-.055,1.05,1.05,.92,G?40:28));                       // back volume
      [-1,1].forEach(s=>head.add(sph(.06,hM,s*.118,.03,-.015,.55,1.15,1,20)));     // sides over the ears
      if(hs!=='short'&&hs!=='curly'){
        const f1=sph(.08,hM2,-.03,.1,.085,1.35,.5,.45,G?32:22);f1.rotation.set(1.0,0,.32);head.add(f1);
        const f2=sph(.062,hM,.055,.108,.078,1.25,.48,.45,G?28:20);f2.rotation.set(1.0,0,-.4);head.add(f2);
        if(G){const f3=sph(.04,hM2,-.085,.075,.06,1.2,.5,.7,16);f3.rotation.z=.9;head.add(f3);}}
      else{const f=sph(.075,hM2,.01,.112,.07,1.45,.5,.6,G?32:22);f.rotation.x=.9;head.add(f);
        if(G)[-1,1].forEach(s=>{const t=sph(.035,hM,s*.05,.135,.07,1.2,.7,1,14);t.rotation.z=s*.4;head.add(t);});}
      if(hs==='long'){const back=cap(.135,.3,hM,0,-.2,-.065);back.scale.set(1.06,1,.52);head.add(back);[-1,1].forEach(s=>{for(let k=0;k<(G?3:2);k++){const lk=cap(.034,.26,k%2?hM2:hM,s*(.118+k*.012),-.19-k*.02,-.03-k*.02);lk.rotation.z=s*(.1+k*.06);head.add(lk);}});}
      if(hs==='ponytail'){head.add(sph(.025,M('#d4a017',{metalness:.6}),0,.03,-.155,1,1,1,12));const pt=cap(.052,.26,hM,0,-.11,-.2);pt.rotation.x=.28;head.add(pt);head.add(sph(.05,hM2,0,-.27,-.235,1,1.2,1,16));}
      if(hs==='bun'){head.add(sph(.068,hM,0,.16,-.07,1,.9,1,28));head.add(sph(.03,hM2,.03,.19,-.05,1,1,1,12));}
      if(hs==='curly'){for(let i=0;i<(G?44:28);i++){const a=i/(G?44:28)*Math.PI*2,r=.13+Math.sin(i*2.3)*.01;head.add(sph(.043,i%2?hM:hM2,Math.cos(a)*r,.06+Math.sin(i*1.7)*.05,Math.sin(a)*r*.95-.02,1,1,1,12));}}
      if(hs==='braids'){[-1,1].forEach(s=>{for(let k=0;k<7;k++)head.add(sph(.03-k*.0018,k%2?hM:hM2,s*.1,-.08-k*.05,-.02+k*.006,1,1.15,1,12));});}
      J.hairM=hM;
      // arms (pivots at shoulders)
      const sx=.205*bw;
      ['L','R'].forEach((n,i)=>{const s=i?1:-1;const p=new T.Group();p.position.set(s*(sx+.012),1.43,0);body.add(p);J['arm'+n]=p;
        p.add(cap(.044*bw,.24,sk,0,-.14,0));p.add(cap(.038*bw,.24,sk,s*.015,-.43,.01));
        const hand=sph(.042,sk,s*.018,-.6,.015,.8,1.2,.62,16);p.add(hand);p.rotation.z=s*.06;});
      // legs (pivots at hips)
      ['L','R'].forEach((n,i)=>{const s=i?1:-1;const p=new T.Group();p.position.set(s*.082*bw,.88,0);body.add(p);J['leg'+n]=p;
        p.add(cap(.074*bw,.3,sk,0,-.21,0));p.add(cap(.054*bw,.32,sk,0,-.58,0));p.add(mesh(new T.BoxGeometry(.085,.05,.2),sk,0,-.85,.04));});
      // ---- clothes ----
      const hasTop=!!w.Top,hasBot=!!w.Bottom,hasDress=!!w.Dress;
      if(!hasDress&&!hasTop){const u=lathe(scaled(prof,bw*1.04,.3,.6).concat([[.001,.62]]),M('#d4d7dd'));u.position.y=.88;body.add(u);}
      if(!hasDress&&!hasBot){const b=lathe([[.001,-.02],[.16*bw,-.02],[.17*bw,.07],[.155*bw,.15],[.001,.15]].map(p=>[p[0]*1.04,p[1]]),M('#9aa0a6'));b.position.y=.86;body.add(b);}
      if(hasBot){const it=w.Bottom,m=cm(it),lt=it.warmth==='light';
        const hip=lathe([[.001,-.04],[.165*bw,-.04],[.176*bw,.07],[.158*bw,.17],[.001,.17]].map(p=>[p[0]*1.05,p[1]]),m);hip.position.y=.86;body.add(hip);
        ['L','R'].forEach(n=>{const p=J['leg'+n];p.add(cap(.083*bw,lt?.12:.3,m,0,lt?-.14:-.21,0));if(!lt)p.add(cap(.066*bw,.32,m,0,-.58,0));});}
      if(hasDress){const it=w.Dress,m=cm(it,{roughness:.7});const pts=[[.3*bw,-.5],[.25*bw,-.28],[.2*bw,-.06]].concat(scaled(prof,bw*1.05,0,.58)).concat([[.001,.6]]);const d=lathe(pts,m,.74);d.position.y=.88;body.add(d);}
      if(hasTop){const it=w.Top,m=cm(it),lng=it.warmth!=='light';const t=lathe([[.192*bw,-.035],[.19*bw,.01]].concat(scaled(prof,bw*1.08,.04,.6)).concat([[.001,.625]]),m,.72);t.position.y=.88;body.add(t);
        ['L','R'].forEach((n,i)=>{const s=i?1:-1;const p=J['arm'+n];p.add(cap(.054*bw,lng?.24:.1,m,0,lng?-.14:-.08,0));if(lng)p.add(cap(.047*bw,.22,m,s*.015,-.41,.01));});}
      if(w.Outerwear){const it=w.Outerwear,m=cm(it,{roughness:.68});const o=lathe([[.21*bw,-.3],[.19*bw,-.1]].concat(scaled(prof,bw*1.15,0,.6)).concat([[.001,.63]]),m,.78);o.position.y=.88;body.add(o);
        const btn=M(shade(col(it),-60));for(let k=0;k<3;k++)body.add(sph(.009,btn,0,1.3-k*.12,.138*bw,1,1,1,8));
        ['L','R'].forEach((n,i)=>{const s=i?1:-1;const p=J['arm'+n];p.add(cap(.064*bw,.25,m,0,-.14,0));p.add(cap(.056*bw,.23,m,s*.015,-.42,.01));});}
      if(w.Shoes){const it=w.Shoes,m=cm(it,{roughness:.45}),bt=it.warmth==='warm',sand=it.warmth==='light';
        ['L','R'].forEach(n=>{const p=J['leg'+n];p.add(mesh(new T.BoxGeometry(.1,sand?.025:.07,.23),m,0,sand?-.865:-.845,.045));if(!sand)p.add(mesh(new T.BoxGeometry(.104,.018,.235),M(shade(col(it),-50)),0,-.871,.045));if(bt)p.add(cap(.065*bw,.16,m,0,-.68,0));});}
      if(w.Accessory){const it=w.Accessory,m=cm(it,{roughness:.4});const p=J.armR;p.add(mesh(new T.BoxGeometry(.2,.15,.07),m,.06,-.55,.02));p.add(mesh(new T.TorusGeometry(.07,.008,8,24,Math.PI),m,.06,-.48,.02));}
      const hgt=c.height||1;person.scale.set(hgt,hgt,hgt);
    }

    function resize(){const w=el.clientWidth||300,h=el.clientHeight||300;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
    const ro=new ResizeObserver(resize);ro.observe(el);resize();
    const cvs=renderer.domElement;
    cvs.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;idle=0;cvs.setPointerCapture(e.pointerId);});
    cvs.addEventListener('pointermove',e=>{if(!dragging)return;target+=(e.clientX-lastX)*.012;lastX=e.clientX;});
    const up=()=>{dragging=false;idle=0;};cvs.addEventListener('pointerup',up);cvs.addEventListener('pointercancel',up);

    function pose(t){
      const a=J;if(!a.armL)return;
      const ease=(x,y,k)=>x+(y-x)*k;
      let aL=0,aR=0,lL=0,lR=0,zL=-.06,zR=.06,hy=0,bob=0,headZ=0,hipZ=0,pz=0;
      if(anim==='walk'){const p=t*5.2;aL=Math.sin(p)*.38;aR=-aL;lL=-Math.sin(p)*.42;lR=-lL;bob=Math.abs(Math.cos(p))*.025;hipZ=Math.sin(p)*.04;pz=Math.sin(t*.9)*.35;}
      else if(anim==='pose'){zL=-.06;zR=.75;aR=-.2;lL=.08;lR=-.12;hipZ=.07;headZ=-.12;}
      else{aL=Math.sin(t*1.2)*.03;aR=-aL;}
      const k=.15;
      a.armL.rotation.x=ease(a.armL.rotation.x,aL,k);a.armR.rotation.x=ease(a.armR.rotation.x,aR,k);
      a.armL.rotation.z=ease(a.armL.rotation.z,zL,k);a.armR.rotation.z=ease(a.armR.rotation.z,zR,k);
      a.legL.rotation.x=ease(a.legL.rotation.x,lL,k);a.legR.rotation.x=ease(a.legR.rotation.x,lR,k);
      a.body.position.y=ease(a.body.position.y,bob+Math.sin(t*2)*.003,k);a.body.rotation.z=ease(a.body.rotation.z,hipZ,k);
      a.head.rotation.z=ease(a.head.rotation.z,headZ,k);person.position.z=ease(person.position.z,pz,.05);
    }
    function loop(now){if(!alive)return;raf=requestAnimationFrame(loop);const t=(now-t0)/1000;
      if(anim==='spin'){animT+=1/60;target=animT/2*Math.PI*2;if(animT>=2){anim='idle';animT=0;target=0;rot=rot%(Math.PI*2);}}
      else{idle+=1/60;if(!dragging&&idle>3&&anim!=='walk')target+=.003;}
      rot+=(target-rot)*.12;person.rotation.y=rot;pose(t);renderer.render(scene,camera);}
    buildRoom();buildPerson();raf=requestAnimationFrame(loop);
    return{
      set(n){const rc=n.room!==cur.room||JSON.stringify(n.rack)!==JSON.stringify(cur.rack);cur=n;if(rc)buildRoom();buildPerson();},
      play(name){anim=name;animT=0;if(name==='walk'||name==='spin'){target=Math.round(rot/(Math.PI*2))*Math.PI*2;rot=target;}},
      snapshot(){renderer.render(scene,camera);return cvs.toDataURL('image/jpeg',.85);},
      destroy(){alive=false;cancelAnimationFrame(raf);ro.disconnect();renderer.dispose();cvs.remove();}
    };
  }
  window.Avatar3D={mount,ROOMS:Object.keys(ROOMS)};
})();
