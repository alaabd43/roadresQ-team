{
const LF=window.L;
const T={
ar:{login:'تسجيل الدخول',report:'قدّم بلاغ',more:'اعرف أكثر ↓',
howT:'من الكاميرا للإسعاف، بدون ولا مكالمة',howP:'النظام بيشتغل لحاله على كاميرات الشوارع، والموظف بس بيأكد.',
h1:'الكاميرا بتلقط',h1p:'كاميرا ثابتة على التقاطع بتتابع كل سيارة: مكانها وسرعتها وحركتها.',
h2:'الذكاء الاصطناعي بيكتشف',h2p:'الموديل بيلاحظ الفرملة المفاجئة والتلامس والوقوف. بتجارب المحاكاة، التنبيه بيطلع بالعادة بأقل من ثانية بعد الحادث.',
h3:'بيقيّم الخطورة',h3p:'من السرعة وعدد السيارات ونوع التصادم، وبيقترح شرطة أو إسعاف أو دفاع مدني.',
h4:'أسرع طريق',h4p:'الخريطة بتحسب أسرع طريق وأقلّه أزمة من أقرب مركز للحادث.',
whoT:'مين بيستعمل ROADGUARD؟',whoStaff:'موظف طوارئ',whoCit:'مواطن',
staffH:'غرفة العمليات',sf1:'بث مباشر من الكاميرات مع تنبيه فوري',sf2:'تأكيد البلاغ أو رفضه بكبسة',sf3:'توجيه الفرق من أسرع طريق',sf4:'فيديو الحادث والكروكا الرقمية',staffBtn:'دخول الموظفين',
citH:'بلّغ عن حادث شفته',cf1:'صورة أو فيديو مع موقعك بالزبط',cf2:'تابع بلاغك لحظة بلحظة',cf3:'تنبيه إذا في حادث على طريقك',cf4:'كروكا وتقرير جاهز للتأمين بالحوادث الخفيفة',
whyT:'ليش تبلّغ من هون، مش بس 911؟',whyP:'911 مكالمة صوت بس. البلاغ من الموقع بيعطي الطوارئ إشي ما بتعطيه المكالمة.',
whyNote:'الموقع ما بيلغي 911، بيكمّله. بالحالات الخطيرة ارفع التلفون ورن 911 كمان.',
w1h:'صورة بتحكي أكثر',w1p:'المسعف بيشوف شو صار قبل ما يوصل: كم سيارة، في نار، في ناس محصورين.',
w2h:'موقعك بالزبط',w2p:'الموقع بيتبعت تلقائياً، بدل ما توصف الشارع وانت متوتر.',
w3h:'أقل بلاغات كاذبة',w3p:'الذكاء الاصطناعي بيفحص الصورة، وبيقارنها مع أقرب كاميرا، وحسابك موثّق برقم تلفونك.',
w4h:'بلاغ صامت',w4p:'إذا ما بتقدر تحكي، أو عندك إعاقة سمعية، بتبلّغ كتابة وصورة.',
w5h:'بتتابع بلاغك',w5p:'بتعرف إنه البلاغ وصل، ومين جاي، وبعد كم دقيقة.',
w6h:'تقرير الحادث إلك',w6p:'بالحوادث الخفيفة بتاخذ الكروكا والتقرير على حسابك، وبتكمّل طريقك.',
ctaT:'شفت حادث؟ ثانية وحدة بتفرق.',
empId:'رقم الموظف',pass:'كلمة السر',phone:'رقم الهاتف',otp:'رمز التحقق',sendOtp:'ابعت الرمز',otpMsg:'بالعرض التجريبي ما في رسالة حقيقية. اكتب أي رمز.',signIn:'دخول',
whyLogin:'التسجيل برقم التلفون بيخلي البلاغ موثّق، وبيقلل البلاغات الكاذبة.',loginDemo:'عرض تجريبي: اكتب أي إشي وادخل.',logout:'خروج',roleStaff:'موظف طوارئ',roleCit:'مواطن',tRep:'بلاغ جديد',
repT:'بلاغ عن حادث',rq1:'شو صار؟',rq2:'صوّر الحادث',rq2b:'ارفع صورة أو فيديو',rq2c:'من الكاميرا أو من الاستوديو',rq3:'الموقع',locVal:'موقعك الحالي: تقاطع وسط المدينة، عمّان (تجريبي)',
rq4:'في إشي من هدول؟',rq5:'وصف قصير (اختياري)',rSend:'ابعت البلاغ',call911:'بالحالات الخطيرة رن كمان على 911.',
types2:['تصادم سيارات','دهس','انقلاب','حريق سيارة'],flags:['في مصابين','ناس محصورين','دخان أو نار','الطريق مسكّر'],
trackT:'حالة بلاغك',trackEmpty:'لما تبعت البلاغ، بتتابعه من هون.',
tk:['تم استلام البلاغ','الذكاء الاصطناعي بيفحص الصورة','تم التأكيد: بتطابق كاميرا CAM-01 القريبة','الإسعاف بالطريق · يوصل خلال 6 دقايق'],
aidT:'لحد ما توصل الطوارئ',aid:['ابعد عن السيارات وخليك على الرصيف','لا تحرّك المصاب إلا إذا في نار','شغّل الإشارات الرباعية إذا انت بسيارتك'],
repSent:'انبعت البلاغ (عرض تجريبي)',needType:'اختار شو صار أول',kicker:'نظام كشف الحوادث بالذكاء الاصطناعي',h1a:'كل ثانية',h1b:'بتفرق.',liveNow:'4 كاميرات مباشر',sy1:'الكاميرات بتراقب',sy2:'الذكاء الاصطناعي بيكتشف',sy3:'البلاغ بيوصل',sy4:'الإسعاف بأسرع طريق',ovDet:'حادث مكتشف · 0.91',ovCrash:'خطورة عالية · شرطة + إسعاف + دفاع مدني',ovEta:'إسعاف · يوصل خلال 6 د',heroText:'كاميرات الشوارع بتشوف الحادث لحظة ما يصير، والذكاء الاصطناعي بيحدد مكانه وخطورته، والطوارئ بتوصل من أسرع طريق.',enter:'غرفة العمليات',seeMap:'شوف الخريطة',s1:'كشف تلقائي من كاميرات الشوارع',s2:'تقييم الخطورة واقتراح الجهات',s3:'أسرع طريق وأقل أزمة للطوارئ',
tLive:'الكاميرات المباشرة',aiOn:'التحليل شغّال',camN0:'وسط المدينة',camN1:'شارع الجامعة',camN2:'الدوار السابع',camN3:'طريق المطار',camAlert:'حادث!',camOk:'سالك',camOff:'غير متصلة',camDemo:'بالعرض التجريبي بس CAM-01 شغّالة',vidLabel:'مقطع الحادث',shotLabel:'صورة لحظة الحادث',shotBtn:'صورة وقت الحادث',vidBtn:'رجوع للفيديو',replayBtn:'إعادة من قبل الحادث',shotAlt:'لقطة لحظة الحادث',tMap:'الخريطة والطرق',tInc:'الحوادث',tUp:'تحليل فيديو',demo:'بيانات تجريبية للعرض',liveTitle:'حادث مكتشف الآن',probTitle:'احتمال الحادث مع الوقت',probNote:'الخط المتقطع = حد التنبيه',
incType:'تصادم جانبي',incWhere:'تقاطع وسط المدينة · عمّان',kTime:'الوقت',kCam:'الكاميرا',kCars:'عدد السيارات',kSpeed:'السرعة قبل الحادث',speedVal:'حوالي 50 كم/س',unitsTitle:'الجهات المقترحة',police:'شرطة',amb:'إسعاف',fire:'دفاع مدني',send:'إرسال البلاغ',falseAlarm:'إنذار غلط',showRoute:'شوف أسرع طريق للإسعاف',
sent:'تم إرسال البلاغ إلى: ',sentDemo:' (عرض تجريبي)',falseMsg:'تم تسجيله كإنذار غلط، وبيساعد بتحسين الموديل (عرض تجريبي)',noUnits:'اختار جهة وحدة على الأقل',
sev1:'خفيف',sev2:'متوسط',sev3:'شديد',l1h:'كروكا رقمية',l1p:'التقرير بيطلع فوراً، والسواقين بيكمّلوا طريقهم بدل ما يسكّروا الشارع.',l2h:'شرطة + إسعاف',l2p:'تصادم واضح. البلاغ بيروح مع الموقع ولقطة قبل الحادث وبعده.',l3h:'شرطة + إسعاف + دفاع مدني',l3p:'سرعة عالية، أو أكثر من سيارتين، أو دخان ونار بالصورة.',
mapTitle:'أسرع طريق للطوارئ',fromTitle:'من وين بتطلع الطوارئ؟',st0:'إسعاف',st1:'دفاع مدني',st2:'شرطة',pl0:'من: مستشفى البشير، عمّان (موقع تقريبي)',pl1:'من: مركز دفاع مدني الزرقاء (موقع تقريبي)',pl2:'من: شرطة المفرق (موقع تقريبي)',incPlace:'أوتوستراد عمّان–الزرقاء',mapNote:'خريطة الأردن الحقيقية (الطرق الرئيسية من Natural Earth). الزحمة تجريبية.',routesTitle:'الطرق المقترحة',fastest:'الأسرع',alt:'بديل',min:'دقيقة',km:'كم',jam:'أزمة',startNav:'ابدأ التوجيه',navMsg:'الطريق انبعت للفريق (عرض تجريبي)',tr0:'سالك',tr1:'متوسط',tr2:'أزمة',incident:'الحادث',
incTitle:'سجل الحوادث',thTime:'الوقت',thPlace:'المكان',thType:'النوع',thSev:'الخطورة',thStatus:'الحالة',stNew:'جديد',stSent:'تم الإرسال',stDone:'انحل',kroki:'الكروكا الرقمية',pdf:'تحميل التقرير PDF',pdfMsg:'بالموقع الحقيقي بينزل التقرير PDF (عرض تجريبي)',qr:'امسح الرمز لتحميل التقرير',
upTitle:'تحليل فيديو',upPick:'اسحب فيديو هون أو اختاره',upHint:'MP4 أو AVI · الموديل بيفحص كل فريم',upBtn:'اختار فيديو',upRun:'جاري التحليل…',upDone:'خلص التحليل',upNote:'هاي نتيجة تجريبية للشكل بس. النتيجة الحقيقية بتطلع لما نربط الموديل بالسيرفر.',upFound:'حادث عند الثانية 7.5 · احتمال 0.87',foot:'مشروع تخرج · جامعة آل البيت',
types:['تصادم جانبي','تصادم خلفي','تصادم أمامي','انحراف عن الطريق','تصادم جانبي'],places:['تقاطع وسط المدينة','شارع الجامعة','الدوار السابع','شارع الملكة رانيا','طريق المطار']},
en:{login:'Sign in',report:'Report an accident',more:'Learn more ↓',
howT:'From camera to ambulance, without a single call',howP:'The system runs on its own on street cameras; staff only confirm.',
h1:'The camera sees',h1p:'A fixed camera at the junction tracks every car: where it is, how fast, how it moves.',
h2:'AI detects',h2p:'The model notices hard braking, contact and sudden stops. In our simulation tests the alert usually comes under a second after the crash.',
h3:'It rates severity',h3p:'From speed, number of cars and crash type, it suggests police, ambulance or civil defense.',
h4:'Fastest road',h4p:'The map finds the fastest, least congested road from the nearest station.',
whoT:'Who uses ROADGUARD?',whoStaff:'Emergency staff',whoCit:'Citizen',
staffH:'Operations room',sf1:'Live camera feeds with instant alerts',sf2:'Confirm or reject a report in one click',sf3:'Send teams by the fastest road',sf4:'Accident video and digital sketch',staffBtn:'Staff sign in',
citH:'Report an accident you saw',cf1:'Photo or video with your exact location',cf2:'Follow your report live',cf3:'Alerts about accidents on your route',cf4:'A sketch and report for insurance in minor crashes',
whyT:'Why report here, not only 911?',whyP:'911 is voice only. A report from the site gives responders what a call cannot.',
whyNote:'The site does not replace 911, it adds to it. In serious cases, call 911 too.',
w1h:'A photo says more',w1p:'Paramedics see what happened before they arrive: how many cars, fire, people trapped.',
w2h:'Your exact location',w2p:'Location is sent automatically, instead of describing the street under stress.',
w3h:'Fewer false reports',w3p:'AI checks the photo and compares it with the nearest camera, and your account is verified by phone.',
w4h:'Silent report',w4p:'If you cannot speak, or have a hearing impairment, report with text and a photo.',
w5h:'Follow your report',w5p:'You know it arrived, who is coming and in how many minutes.',
w6h:'Your accident report',w6p:'In minor crashes you get the sketch and report in your account and drive on.',
ctaT:'Saw an accident? One second matters.',
empId:'Employee ID',pass:'Password',phone:'Phone number',otp:'Verification code',sendOtp:'Send code',otpMsg:'Demo: no real message is sent. Type any code.',signIn:'Sign in',
whyLogin:'Signing in with your phone makes the report verified and cuts false reports.',loginDemo:'Demo: type anything and sign in.',logout:'Sign out',roleStaff:'Emergency staff',roleCit:'Citizen',tRep:'New report',
repT:'Report an accident',rq1:'What happened?',rq2:'Photograph it',rq2b:'Upload a photo or video',rq2c:'From the camera or gallery',rq3:'Location',locVal:'Your location: downtown intersection, Amman (demo)',
rq4:'Any of these?',rq5:'Short description (optional)',rSend:'Send report',call911:'In serious cases, also call 911.',
types2:['Car collision','Pedestrian hit','Rollover','Car fire'],flags:['Injured people','People trapped','Smoke or fire','Road blocked'],
trackT:'Your report status',trackEmpty:'Send a report and follow it here.',
tk:['Report received','AI is checking the photo','Confirmed: matches nearby camera CAM-01','Ambulance on the way · 6 min away'],
aidT:'Until help arrives',aid:['Move away from the cars, stay on the pavement','Do not move the injured unless there is fire','Turn on hazard lights if you are in your car'],
repSent:'Report sent (demo)',needType:'Pick what happened first',kicker:'AI accident detection system',h1a:'Every second',h1b:'counts.',liveNow:'4 cameras live',sy1:'Cameras watch',sy2:'AI detects',sy3:'Report goes out',sy4:'Ambulance takes the fastest road',ovDet:'Accident detected · 0.91',ovCrash:'High severity · police + ambulance + civil defense',ovEta:'Ambulance · arrives in 6 min',heroText:'Street cameras see the crash the moment it happens. AI pinpoints where and how bad it is, and responders take the fastest road.',enter:'Enter operations room',seeMap:'View the map',s1:'Automatic detection from street cameras',s2:'Severity rating and suggested responders',s3:'Fastest, least congested route',
tLive:'Live cameras',aiOn:'analysis running',camN0:'Downtown',camN1:'University St.',camN2:'7th Circle',camN3:'Airport Rd.',camAlert:'accident!',camOk:'clear',camOff:'offline',camDemo:'In this demo only CAM-01 is live',vidLabel:'Accident clip',shotLabel:'Frame at the crash',shotBtn:'Frame at crash time',vidBtn:'Back to video',replayBtn:'Replay from before the crash',shotAlt:'Frame at the moment of the crash',tMap:'Map & routes',tInc:'Incidents',tUp:'Analyze video',demo:'Demo data',liveTitle:'Accident detected now',probTitle:'Crash probability over time',probNote:'Dashed line = alert threshold',
incType:'Side collision',incWhere:'Downtown intersection · Amman',kTime:'Time',kCam:'Camera',kCars:'Vehicles',kSpeed:'Speed before crash',speedVal:'about 50 km/h',unitsTitle:'Suggested responders',police:'Police',amb:'Ambulance',fire:'Civil defense',send:'Send report',falseAlarm:'False alarm',showRoute:'Show fastest route for the ambulance',
sent:'Report sent to: ',sentDemo:' (demo)',falseMsg:'Marked as a false alarm; it helps improve the model (demo)',noUnits:'Pick at least one responder',
sev1:'Minor',sev2:'Moderate',sev3:'Severe',l1h:'Digital accident sketch',l1p:'The report is ready instantly, so drivers move on instead of blocking the road.',l2h:'Police + ambulance',l2p:'A clear collision. The report carries the location and frames before and after.',l3h:'Police + ambulance + civil defense',l3p:'High speed, more than two vehicles, or smoke and fire in the frame.',
mapTitle:'Fastest route for responders',fromTitle:'Where do responders leave from?',st0:'Ambulance',st1:'Civil defense',st2:'Police',pl0:'From: Al-Bashir Hospital, Amman (approx.)',pl1:'From: Zarqa civil defense center (approx.)',pl2:'From: Mafraq police (approx.)',incPlace:'Amman–Zarqa highway',mapNote:'Real map of Jordan (main roads from Natural Earth). Traffic is demo data.',routesTitle:'Suggested routes',fastest:'Fastest',alt:'Alternative',min:'min',km:'km',jam:'congested',startNav:'Start navigation',navMsg:'Route sent to the team (demo)',tr0:'Clear',tr1:'Moderate',tr2:'Congested',incident:'Accident',
incTitle:'Incident log',thTime:'Time',thPlace:'Place',thType:'Type',thSev:'Severity',thStatus:'Status',stNew:'New',stSent:'Sent',stDone:'Resolved',kroki:'Digital accident sketch',pdf:'Download PDF report',pdfMsg:'The live site will download the PDF report (demo)',qr:'Scan to download the report',
upTitle:'Analyze a video',upPick:'Drop a video here or choose one',upHint:'MP4 or AVI · the model checks every frame',upBtn:'Choose video',upRun:'Analyzing…',upDone:'Analysis finished',upNote:'This is a demo result for the look only. The real result appears once the model is connected to the server.',upFound:'Accident at 7.5 s · probability 0.87',foot:'Graduation project · Al al-Bayt University',
types:['Side collision','Rear-end','Head-on','Ran off road','Side collision'],places:['Downtown intersection','University St.','7th Circle','Queen Rania St.','Airport Rd.']}
};
let L='ar';try{L=localStorage.getItem('rg-lang')||'ar'}catch(e){}
const t=k=>T[L][k]??k;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const toast=m=>{const el=$('#toast');el.textContent=m;el.classList.remove('hidden');clearTimeout(toast.h);toast.h=setTimeout(()=>el.classList.add('hidden'),3200)};

/* start slideshow */
const TR=[[685,130,870,250,'ID 04'],[490,240,695,365,'ID 07'],[120,275,290,395,'ID 02'],[540,415,735,545,'ID 11'],[955,515,1165,645,'ID 09'],[395,610,620,760,'ID 05'],[1505,600,1730,740,'ID 12'],[2110,930,2365,1090,'ID 15'],[1265,1045,1535,1200,'ID 17']];
$('#tracks').innerHTML=TR.map(([a,b,c,d,id])=>`<div class="tbox" style="left:${((a-220)/2137*100).toFixed(2)}%;top:${(b/1202*100).toFixed(2)}%;width:${((c-a)/2137*100).toFixed(2)}%;height:${((d-b)/1202*100).toFixed(2)}%"><b>${id}</b></div>`).join('')+`<div class="rbox" style="left:${(1065/2137*100).toFixed(2)}%;top:${(612/1202*100).toFixed(2)}%;width:${(250/2137*100).toFixed(2)}%;height:${(292/1202*100).toFixed(2)}%"><b data-t="ovDet"></b></div>`;
const slides=$$('.slide'),steps=$$('#story li');let cur=0,timer=null;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const show=i=>{cur=i;slides.forEach((s,k)=>{s.classList.toggle('on',k===i);if(k===i){const im=s.querySelector('.kb');im.style.animation='none';void im.offsetWidth;im.style.animation=''}});
steps.forEach((li,k)=>{li.className=k<i?'done':k===i?'cur':'';const u=li.querySelector('u');u.style.animation='none';void u.offsetWidth;u.style.animation=''});
clearTimeout(timer);if(!reduce)timer=setTimeout(()=>{if(!$('#start').classList.contains('hidden'))show((cur+1)%slides.length)},6500)};
$('#story').addEventListener('click',e=>{const b=e.target.closest('[data-go-s]');if(b)show(+b.dataset.goS)});
$('#start').addEventListener('mousemove',e=>{const st=$('#stage');st.style.setProperty('--mx',((e.clientX/innerWidth-.5)*-18).toFixed(1)+'px');st.style.setProperty('--my',((e.clientY/innerHeight-.5)*-12).toFixed(1)+'px')});
show(0);

/* live: units + probability chart */
const units={police:true,amb:true,fire:false};
const drawUnits=()=>{$('#units').innerHTML=['police','amb','fire'].map(u=>`<button type="button" class="unit" data-u="${u}" aria-pressed="${units[u]}">${units[u]?'✓ ':''}${t(u)}</button>`).join('')};
$('#units').addEventListener('click',e=>{const b=e.target.closest('[data-u]');if(!b)return;units[b.dataset.u]=!units[b.dataset.u];drawUnits()});
$('#sendBtn').addEventListener('click',()=>{const on=Object.keys(units).filter(u=>units[u]).map(t);toast(on.length?t('sent')+on.join('، ')+t('sentDemo'):t('noUnits'))});
$('#falseBtn').addEventListener('click',()=>toast(t('falseMsg')));
const P=[.03,.03,.04,.05,.04,.06,.05,.07,.08,.07,.09,.12,.15,.22,.38,.61,.79,.87,.85,.83,.8,.78,.74,.7,.66];
const prob=$('#prob');
const drawProb=()=>{const W=prob.clientWidth,H=prob.clientHeight;if(!W)return;const px=i=>16+i*(W-32)/(P.length-1),py=v=>H-18-v*(H-30);
const line=P.map((v,i)=>`${i?'L':'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join('');
prob.innerHTML=`<path d="${line} L${px(P.length-1)} ${H-18} L16 ${H-18}Z" fill="#e3242b22"/><path d="${line}" fill="none" stroke="#E3242B" stroke-width="3"/><line x1="16" x2="${W-16}" y1="${py(.55)}" y2="${py(.55)}" stroke="#fff" stroke-opacity=".6" stroke-dasharray="6 6"/><text x="${L==='ar'?W-18:18}" y="${py(.55)-8}" fill="#A8A5A1" font-size="12" text-anchor="${L==='ar'?'end':'start'}">0.55</text><circle cx="${px(17)}" cy="${py(.87)}" r="6" fill="#fff"/><text x="16" y="${H-2}" fill="#A8A5A1" font-size="12" direction="ltr">0 s</text><text x="${W-16}" y="${H-2}" fill="#A8A5A1" font-size="12" text-anchor="end" direction="ltr">12 s</text>`};
const roP=new ResizeObserver(drawProb);roP.observe(prob);

/* map: real Jordan (Natural Earth) + Dijkstra on the road network */
const G=window.JORDAN_GEO;
const N=G.nodes,EG=G.edges,ADJ=N.map(()=>[]);EG.forEach((e,i)=>{ADJ[e[0]].push([e[1],i]);ADJ[e[1]].push([e[0],i])});
const SPD=[100,70],TF=[1,1.4,2.4],TC=['#2FBF71','#F07A1A','#E3242B'],TD=['','10 6','4 6'];
const hav=(a,b)=>{const r=Math.PI/180,d1=(b[0]-a[0])*r,d2=(b[1]-a[1])*r,x=Math.sin(d1/2)**2+Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(d2/2)**2;return 12742*Math.asin(Math.sqrt(x))};
const snap=ll=>{let bi=0,bd=1e9;N.forEach((n,i)=>{if(!G.comp[i])return;const d=hav(ll,n);if(d<bd){bd=d;bi=i}});return bi};
const emin=e=>e[4]/SPD[e[2]]*60*TF[e[3]];
const INC_LL=[32.0255,36.0215];const INCN=snap(INC_LL);
const ST=[{n:'st0',p:'pl0',ll:[31.9437,35.9330],ic:'M12 5v14M5 12h14'},{n:'st1',p:'pl1',ll:[32.0640,36.0890],ic:'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6 1 1 2 2 3 2 0-2-1-4 0-6z'},{n:'st2',p:'pl2',ll:[32.3420,36.2080],ic:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'}];
ST.forEach(o=>o.node=snap(o.ll));
const dijk=(s,g,pen)=>{const d=new Float64Array(N.length).fill(1e9),pv=new Int32Array(N.length).fill(-1),pe=new Int32Array(N.length).fill(-1),done=new Uint8Array(N.length);d[s]=0;
for(;;){let u=-1,b=1e9;for(let i=0;i<N.length;i++)if(!done[i]&&d[i]<b){b=d[i];u=i}if(u<0||u===g)break;done[u]=1;for(const[v,ei]of ADJ[u]){const w=emin(EG[ei])*(pen.get(ei)||1);if(d[u]+w<d[v]){d[v]=d[u]+w;pv[v]=u;pe[v]=ei}}}
const path=[g],es=[];let k=g;while(pv[k]>=0){es.unshift(pe[k]);k=pv[k];path.unshift(k)}return{path,es}};
const routesFor=o=>{const out=[],pen=new Map();for(let r=0;r<4&&out.length<3;r++){const res=dijk(o.node,INCN,pen);const sig=res.es.join('-');if(res.es.length&&!out.some(x=>x.sig===sig)){const km=res.es.reduce((a,e)=>a+EG[e][4],0)+hav(o.ll,N[o.node])+hav(INC_LL,N[INCN]);const min=res.es.reduce((a,e)=>a+emin(EG[e]),0)+(hav(o.ll,N[o.node])+hav(INC_LL,N[INCN]))/30*60;const jam=res.es.filter(e=>EG[e][3]===2).reduce((a,e)=>a+EG[e][4],0)/Math.max(.01,res.es.reduce((a,e)=>a+EG[e][4],0));out.push({...res,sig,km,min,jam})}res.es.forEach(e=>pen.set(e,(pen.get(e)||1)*3))}return out.sort((a,b)=>a.min-b.min)};
let st=0,sel=0,R=routesFor(ST[0]),map=null,rLayer=null,stLayer=null,car=null,anim=null;
const initMap=()=>{if(map)return;map=LF.map('map',{preferCanvas:true,zoomSnap:.25,minZoom:6.5,maxZoom:13,maxBounds:[[28.4,33.6],[34.2,40.4]],attributionControl:true});
map.fitBounds([[31.75,35.75],[32.45,36.35]]);map.attributionControl.setPrefix(false).addAttribution('Natural Earth');
LF.geoJSON(G.countries,{style:f=>f.properties.a3==='JOR'?{color:'#4a4a52',weight:1.5,fillColor:'#18181c',fillOpacity:1}:{color:'#26262b',weight:1,fillColor:'#111114',fillOpacity:1},interactive:false}).addTo(map);
LF.geoJSON(G.gov,{style:{color:'#2c2c33',weight:1,dashArray:'3 4',fill:false},interactive:false}).addTo(map);
map.createPane('labels');map.getPane('labels').style.zIndex=450;map.getPane('labels').style.pointerEvents='none';
G.gov.features.forEach(f=>{const n=f.properties.en;if(n==='Amman'||n==='Zarqa')return;LF.marker(f.properties.lab,{pane:'labels',icon:LF.divIcon({className:'',html:`<span class="lab gov" data-ar="${f.properties.ar}" data-en="${n}">${L_lang()==='ar'?f.properties.ar:n}</span>`,iconSize:[0,0]})}).addTo(map)});
const rr=LF.canvas({padding:.5});EG.forEach(e=>{LF.polyline([N[e[0]],N[e[1]]],{renderer:rr,color:'#2c2c31',weight:e[2]?4:6,interactive:false}).addTo(map)});
EG.forEach(e=>{LF.polyline([N[e[0]],N[e[1]]],{renderer:rr,color:TC[e[3]],weight:e[2]?1.6:2.4,opacity:.8,dashArray:TD[e[3]]||null,interactive:false}).addTo(map)});
G.cities.forEach(c=>{LF.circleMarker(c.ll,{radius:4,color:'#fff',weight:1.5,fillColor:'#111',fillOpacity:1,interactive:false}).addTo(map);LF.marker(c.ll,{pane:'labels',icon:LF.divIcon({className:'',html:`<span class="lab city" data-ar="${c.ar}" data-en="${c.en}" style="position:relative;left:8px;top:-8px">${L_lang()==='ar'?c.ar:c.en}</span>`,iconSize:[0,0]})}).addTo(map)});
LF.marker(INC_LL,{zIndexOffset:1000,icon:LF.divIcon({className:'',html:'<div class="inc blink"></div>',iconSize:[22,22],iconAnchor:[11,11]})}).bindTooltip(()=>t('incident')+' · '+t('incPlace'),{permanent:true,direction:'top',offset:[0,-14],className:'tip'}).addTo(map);
stLayer=LF.layerGroup().addTo(map);rLayer=LF.layerGroup().addTo(map);drawMap()};
const L_lang=()=>L_;let L_='ar';
const drawMap=()=>{if(!map)return;L_=L;document.querySelectorAll('#map .lab').forEach(el=>el.textContent=el.dataset[L]);rLayer.clearLayers();stLayer.clearLayers();
R.forEach((r,k)=>{if(k!==sel)LF.polyline(r.path.map(i=>N[i]),{color:'#fff',opacity:.35,weight:5}).on('click',()=>{sel=k;drawMap();drawSide()}).addTo(rLayer)});
const r=R[sel],ll=[ST[st].ll,...r.path.map(i=>N[i]),INC_LL];LF.polyline(ll,{color:'#000',weight:12,opacity:.6,interactive:false}).addTo(rLayer);rLayer.sel=LF.polyline(ll,{color:'#fff',weight:6,interactive:false}).addTo(rLayer);
ST.forEach((o,k)=>LF.marker(o.ll,{zIndexOffset:900,icon:LF.divIcon({className:'',html:`<div class="pin ${k===st?'on':''}"><svg viewBox="0 0 24 24" fill="none" stroke="${k===st?'#E3242B':'#fff'}" stroke-width="2.4"><path d="${o.ic}"/></svg></div>`,iconSize:[34,34],iconAnchor:[17,17]})}).bindTooltip(t(o.p),{direction:'top',offset:[0,-16],className:'tip'}).on('click',()=>{st=k;sel=0;R=routesFor(ST[st]);drawMap();drawSide()}).addTo(stLayer));
car=LF.circleMarker(ST[st].ll,{radius:8,color:'#E3242B',weight:4,fillColor:'#fff',fillOpacity:1}).addTo(rLayer)};
const drawSide=()=>{$('#stations').innerHTML=ST.map((o,k)=>`<button type="button" data-st="${k}" aria-pressed="${k===st}">${t(o.n)}</button>`).join('');
$('#routes').innerHTML=`<p class="note" style="margin:0 0 10px">${t(ST[st].p)}</p>`+R.map((r,k)=>`<button type="button" class="route" data-r="${k}" aria-pressed="${k===sel}"><span class="chip ${k===0?'sev1':''}" style="${k?'border:1px solid #444':''}">${k===0?t('fastest'):t('alt')}</span><span><strong>${r.km.toFixed(1)} ${t('km')}</strong> <small>· ${Math.round(r.jam*100)}% ${t('jam')}</small><span class="bar"><i style="width:${Math.max(4,Math.round(r.jam*100))}%;background:${r.jam>.4?'#E3242B':r.jam>.15?'#F07A1A':'#2FBF71'}"></i></span></span><span class="eta">${Math.round(r.min)} <small style="font-size:14px">${t('min')}</small></span></button>`).join('')};
$('#stations').addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;st=+b.dataset.st;sel=0;R=routesFor(ST[st]);drawMap();drawSide();if(map)map.fitBounds(LF.latLngBounds([ST[st].ll,INC_LL]).pad(.35))});
$('#routes').addEventListener('click',e=>{const b=e.target.closest('[data-r]');if(!b)return;sel=+b.dataset.r;drawMap();drawSide()});
$('#goBtn').addEventListener('click',()=>{toast(t('navMsg'));if(!map||!rLayer.sel)return;const pts=rLayer.sel.getLatLngs();if(matchMedia('(prefers-reduced-motion: reduce)').matches){car.setLatLng(pts[pts.length-1]);return}
const segs=[];let tot=0;for(let i=1;i<pts.length;i++){const d=pts[i-1].distanceTo(pts[i]);segs.push(d);tot+=d}cancelAnimationFrame(anim);const t0=performance.now(),dur=5000;
const step=n=>{let k=Math.min(1,(n-t0)/dur)*tot,i=0;while(i<segs.length-1&&k>segs[i]){k-=segs[i];i++}const f=segs[i]?Math.min(1,k/segs[i]):1,a=pts[i],b=pts[i+1]||a;car.setLatLng([a.lat+(b.lat-a.lat)*f,a.lng+(b.lng-a.lng)*f]);if(n-t0<dur)anim=requestAnimationFrame(step)};anim=requestAnimationFrame(step)});

/* incidents */
const INCS=[{t:'14:32',ty:0,pl:0,sv:2,st:'stNew'},{t:'13:05',ty:1,pl:1,sv:1,st:'stSent'},{t:'11:48',ty:2,pl:2,sv:3,st:'stSent'},{t:'09:20',ty:3,pl:3,sv:2,st:'stDone'},{t:'08:02',ty:4,pl:4,sv:1,st:'stDone'}];
let isel=0;
const qr=()=>{let s='';for(let y=0;y<11;y++)for(let x=0;x<11;x++){const f=(x<3&&y<3)||(x>7&&y<3)||(x<3&&y>7);if(f?!(x%2===1&&y%2===1&&(x===1||x===9)&&(y===1||y===9)):((x*7+y*13+x*y)%3===0))s+=`<rect x="${x*8}" y="${y*8}" width="8" height="8"/>`}return `<svg width="88" height="88" viewBox="0 0 88 88" role="img" aria-label="QR"><rect width="88" height="88" fill="#fff"/><g fill="#111">${s}</g></svg>`};
const drawInc=()=>{$('#incRows').innerHTML=INCS.map((r,k)=>`<tr data-i="${k}" tabindex="0" aria-selected="${k===isel}"><td class="t">${r.t}</td><td>${T[L].places[r.pl]}</td><td>${T[L].types[r.ty]}</td><td><span class="chip sev${r.sv}">${t('sev'+r.sv)}</span></td><td class="hide-sm">${t(r.st)}</td></tr>`).join('');
const r=INCS[isel];$('#incDetail').innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 style="font-size:24px">${T[L].types[r.ty]}</h3><div class="note" style="margin-top:4px">${T[L].places[r.pl]} · ${r.t}</div></div><span class="chip sev${r.sv}">${t('sev'+r.sv)}</span></div>
<div class="media" id="incMedia"><video id="incVid" src="assets/video/cam01.mp4" muted loop playsinline controls preload="metadata"></video><img id="incShot" src="assets/img/crash_frame.jpg" alt="${t('shotAlt')}" class="hidden"><div class="hud" style="top:10px;left:10px" id="incLabel">${t('vidLabel')}</div></div>
<div class="mbtns"><button class="btn" type="button" id="shotBtn">${t('shotBtn')}</button><button class="btn light" type="button" id="replayBtn">${t('replayBtn')}</button></div>
<strong style="display:block;margin:18px 0 10px">${t('kroki')}</strong>
<svg viewBox="0 0 520 260" style="width:100%;height:auto;display:block;background:#ffffff06;border-radius:14px" role="img" aria-label="${t('kroki')}"><rect x="0" y="100" width="520" height="60" fill="#2c2c31"/><rect x="230" y="0" width="60" height="260" fill="#2c2c31"/><line x1="0" y1="130" x2="520" y2="130" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="10 8"/><line x1="260" y1="0" x2="260" y2="260" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="10 8"/><path d="M60 145 L200 142" stroke="#fff" stroke-width="2" stroke-dasharray="4 5"/><rect x="200" y="134" width="42" height="20" fill="#fff"/><path d="M272 240 L272 170" stroke="#E3242B" stroke-width="2" stroke-dasharray="4 5"/><rect x="262" y="146" width="20" height="40" fill="#E3242B"/><circle cx="252" cy="150" r="17" fill="none" stroke="#F5C842" stroke-width="2.5"/><text x="64" y="128" font-size="13" fill="#fff" direction="ltr">A · 38 km/h</text><text x="290" y="232" font-size="13" fill="#FF5A5F" direction="ltr">B · 52 km/h</text></svg>
<div style="display:flex;gap:16px;align-items:center;margin-top:18px;flex-wrap:wrap">${qr()}<div style="flex:1;display:flex;flex-direction:column;gap:10px"><span class="note">${t('qr')}</span><button class="btn" type="button" id="pdfBtn">${t('pdf')}</button></div></div>`;
$('#pdfBtn').addEventListener('click',()=>toast(t('pdfMsg')));
const v=$('#incVid'),sh=$('#incShot'),lb=$('#incLabel');
$('#shotBtn').addEventListener('click',()=>{const showing=!sh.classList.contains('hidden');sh.classList.toggle('hidden',showing);v.classList.toggle('hidden',!showing);if(!showing){v.pause();lb.textContent=t('shotLabel')+' · '+r.t+':07';$('#shotBtn').textContent=t('vidBtn')}else{lb.textContent=t('vidLabel');$('#shotBtn').textContent=t('shotBtn');v.play().catch(()=>{})}});
$('#replayBtn').addEventListener('click',()=>{sh.classList.add('hidden');v.classList.remove('hidden');lb.textContent=t('vidLabel');$('#shotBtn').textContent=t('shotBtn');try{v.currentTime=Math.max(0,(v.duration||5)-3.5)}catch(e){}v.play().catch(()=>{})})};
$('#incRows').addEventListener('click',e=>{const tr=e.target.closest('[data-i]');if(!tr)return;isel=+tr.dataset.i;drawInc()});
$('#incRows').addEventListener('keydown',e=>{if(e.key==='Enter'){const tr=e.target.closest('[data-i]');if(tr){isel=+tr.dataset.i;drawInc()}}});

/* upload */
const runUpload=f=>{const box=$('#upState');box.innerHTML=`<strong>${f.name}</strong><div class="note" style="margin:6px 0 10px">${t('upRun')}</div><div class="prog"><i id="pg"></i></div>`;let p=0;const h=setInterval(()=>{p+=7;$('#pg').style.width=Math.min(p,100)+'%';if(p>=100){clearInterval(h);box.innerHTML=`<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="chip sev3">${t('upDone')}</span><strong>${t('upFound')}</strong></div><p class="note" style="margin-top:10px">${t('upNote')}</p><button class="btn" type="button" data-go="live" style="margin-top:8px">${t('tLive')}</button>`}},120)};
$('#file').addEventListener('change',e=>{if(e.target.files[0])runUpload(e.target.files[0])});
const drop=$('.drop');drop.addEventListener('dragover',e=>e.preventDefault());drop.addEventListener('drop',e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)runUpload(f)});

/* cameras + clock */
let cam=0;const CAMS=[{id:'CAM-01',on:1},{id:'CAM-02',on:1},{id:'CAM-03',on:1},{id:'CAM-04',on:0}];
const drawCams=()=>{$('#cams').innerHTML=CAMS.map((c,k)=>`<button type="button" class="cam" data-cam="${k}" aria-pressed="${k===cam}"><span class="dot ${c.on?'':'off'} ${k===0?'blink':''}"></span><span>${c.id}<small>${t('camN'+k)} · ${c.on?(k===0?t('camAlert'):t('camOk')):t('camOff')}</small></span></button>`).join('')};
$('#cams').addEventListener('click',e=>{const b=e.target.closest('[data-cam]');if(!b)return;const k=+b.dataset.cam;if(k!==0){toast(t('camDemo'));return}cam=k;drawCams()});
setInterval(()=>{const d=new Date();$('#clock').textContent=d.toISOString().slice(0,10)+' · '+d.toTimeString().slice(0,8)},1000);
/* landing why cards */
const drawWhy=()=>{$('#why').innerHTML=[1,2,3,4,5,6].map(i=>`<div class="why"><h3>${t('w'+i+'h')}</h3><p>${t('w'+i+'p')}</p></div>`).join('')};
/* login + roles */
let role=null;try{role=sessionStorage.getItem('rg-role')}catch(e){}
let want='staff';
const openLogin=r=>{want=r;$('#login').classList.remove('hidden');setSeg();setTimeout(()=>$('#loginForm input').focus(),50)};
const setSeg=()=>{$$('[data-role]').forEach(b=>b.setAttribute('aria-selected',b.dataset.role===want));$('#fStaff').classList.toggle('hidden',want!=='staff');$('#fCit').classList.toggle('hidden',want!=='citizen')};
$$('[data-role]').forEach(b=>b.addEventListener('click',()=>{want=b.dataset.role;setSeg()}));
$('#closeLogin').addEventListener('click',()=>$('#login').classList.add('hidden'));
$('#login').addEventListener('click',e=>{if(e.target.id==='login')$('#login').classList.add('hidden')});
addEventListener('keydown',e=>{if(e.key==='Escape')$('#login').classList.add('hidden')});
$('#sendOtp').addEventListener('click',()=>toast(t('otpMsg')));
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();role=want;try{sessionStorage.setItem('rg-role',role)}catch(x){}$('#login').classList.add('hidden');e.target.reset();location.hash=role==='staff'?'live':'report';route()});
$('#logout').addEventListener('click',()=>{role=null;try{sessionStorage.removeItem('rg-role')}catch(x){}location.hash='start'});
/* citizen report */
let rtype=-1;const rflags=new Set();let sent=false,stage=0,stTimer=null;
const drawRep=()=>{$('#rtype').innerHTML=T[L].types2.map((x,k)=>`<button type="button" class="unit" data-rt="${k}" aria-pressed="${k===rtype}">${x}</button>`).join('');
$('#rflags').innerHTML=T[L].flags.map((x,k)=>`<button type="button" class="unit" data-rf="${k}" aria-pressed="${rflags.has(k)}">${rflags.has(k)?'✓ ':''}${x}</button>`).join('');
const now=new Date();$('#track').innerHTML=sent?T[L].tk.map((x,k)=>`<li class="${k<stage?'ok':k===stage?'now':''}"><span>${x}${k<=stage?`<small>${now.toTimeString().slice(0,5)}</small>`:''}</span></li>`).join(''):`<li><span>${t('trackEmpty')}</span></li>`;
$('#aid').innerHTML=`<strong>${t('aidT')}</strong><ul>${T[L].aid.map(x=>`<li>${x}</li>`).join('')}</ul>`};
$('#rtype').addEventListener('click',e=>{const b=e.target.closest('[data-rt]');if(b){rtype=+b.dataset.rt;drawRep()}});
$('#rflags').addEventListener('click',e=>{const b=e.target.closest('[data-rf]');if(b){const k=+b.dataset.rf;rflags.has(k)?rflags.delete(k):rflags.add(k);drawRep()}});
$('#rfile').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const u=URL.createObjectURL(f),p=$('#rprev');p.classList.remove('hidden');p.innerHTML=f.type.startsWith('video')?`<video src="${u}" controls muted playsinline></video>`:`<img src="${u}" alt="">`});
$('#repForm').addEventListener('submit',e=>{e.preventDefault();if(rtype<0){toast(t('needType'));return}sent=true;stage=0;drawRep();toast(t('repSent'));clearInterval(stTimer);stTimer=setInterval(()=>{stage++;drawRep();if(stage>=3)clearInterval(stTimer)},1800)});
/* i18n + routing */
const apply=()=>{document.documentElement.lang=L;document.documentElement.dir=L==='ar'?'rtl':'ltr';
$$('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
$$('[data-lang]').forEach(b=>{b.textContent=L==='ar'?'EN':'عربي';b.setAttribute('aria-label',L==='ar'?'Switch to English':'التحويل للعربي')});
$('#feedVid').setAttribute('aria-label',L==='ar'?'بث كاميرا التقاطع':'Intersection camera feed');
drawUnits();drawCams();drawWhy();drawRep();drawProb();drawMap();drawSide();drawInc()};
document.addEventListener('click',e=>{const l=e.target.closest('[data-lang]');if(l){L=L==='ar'?'en':'ar';try{localStorage.setItem('rg-lang',L)}catch(x){}apply();return}
const lg=e.target.closest('[data-login]');if(lg){openLogin(lg.dataset.login);return}
const g=e.target.closest('[data-go],[data-tab]');if(g){location.hash=g.dataset.go||g.dataset.tab}});
const VIEWS=['live','map','incidents','upload','report'];
const route=()=>{const h=location.hash.slice(1);let v=VIEWS.includes(h)?h:'start';
if(v!=='start'&&!role){openLogin(v==='report'?'citizen':'staff');v='start'}
if(role==='citizen'&&v!=='start'&&v!=='report')v='report';
$$('[data-tab]').forEach(b=>b.classList.toggle('hidden',role==='citizen'?b.dataset.tab!=='report':b.dataset.tab==='report'));
$('#roleBadge').textContent=role?(role==='staff'?t('roleStaff'):t('roleCit')):'';$('#start').classList.toggle('hidden',v!=='start');$('#app').classList.toggle('hidden',v==='start');
VIEWS.forEach(x=>$('#v-'+x).classList.toggle('hidden',x!==v));$$('[data-tab]').forEach(b=>b.setAttribute('aria-current',b.dataset.tab===v));window.scrollTo(0,0);if(v!=='start')drawProb();if(v==='map'){initMap();setTimeout(()=>map.invalidateSize(),50)}};
addEventListener('hashchange',route);apply();route();
}
