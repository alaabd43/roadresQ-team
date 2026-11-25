{
const LF = window.L;
const T = {
  ar: {
    login: 'تسجيل الدخول',
    more: 'اعرف أكثر ↓',
    empId: 'رقم الموظف',
    pass: 'كلمة السر',
    signIn: 'دخول',
    loginDemo: 'عرض تجريبي: اكتب أي إشي وادخل.',
    logout: 'خروج',
    roleStaff: 'موظف طوارئ',
    soundOn: 'الصوت شغّال',
    soundOff: 'الصوت مكتوم',
    kicker: 'نظام كشف الحوادث بالذكاء الاصطناعي',
    h1a: 'كل ثانية',
    h1b: 'بتفرق.',
    liveNow: '4 كاميرات مباشر',
    sy1: 'الكاميرات بتراقب',
    sy2: 'الذكاء الاصطناعي بيكتشف',
    sy3: 'البلاغ بيوصل',
    sy4: 'الإسعاف بأسرع طريق',
    ovDet: 'حادث مكتشف · 0.91',
    ovCrash: 'خطورة عالية · شرطة + إسعاف + دفاع مدني',
    ovEta: 'إسعاف · يوصل خلال 6 د',
    heroText: 'كاميرات الشوارع بتشوف الحادث لحظة ما يصير، والذكاء الاصطناعي بيحدد مكانه وخطورته، والطوارئ بتوصل من أسرع طريق.',
    enter: 'غرفة العمليات',
    tLive: 'الكاميرات المباشرة',
    aiOn: 'التحليل شغّال',
    camN0: 'وسط المدينة',
    camN1: 'شارع الجامعة',
    camN2: 'الدوار السابع',
    camN3: 'طريق المطار',
    camAlert: 'حادث!',
    camOk: 'سالك',
    camOff: 'غير متصلة',
    camDemo: 'بالعرض التجريبي بس CAM-01 شغّالة',
    vidLabel: 'مقطع الحادث',
    shotLabel: 'صورة لحظة الحادث',
    shotBtn: 'صورة وقت الحادث',
    vidBtn: 'رجوع للفيديو',
    replayBtn: 'إعادة من قبل الحادث',
    shotAlt: 'لقطة لحظة الحادث',
    tMap: 'الخريطة والطرق',
    tInc: 'الحوادث',
    tUp: 'تحليل فيديو',
    demo: '',
    liveTitle: 'حادث مكتشف الآن',
    incType: 'تصادم جانبي',
    incWhere: 'تقاطع وسط المدينة · عمّان',
    kTime: 'الوقت',
    kCam: 'الكاميرا',
    kCars: 'عدد السيارات',
    kSpeed: 'السرعة قبل الحادث',
    speedVal: 'حوالي 50 كم/س',
    unitsTitle: 'الجهات المقترحة',
    adviceLine: 'الخطورة {risk}% ({sevLabel}) · المقترح: {unitsText} ({amb} إسعاف)',
    police: 'شرطة',
    amb: 'إسعاف',
    fire: 'دفاع مدني',
    showRoute: 'شوف أسرع طريق للإسعاف',
    sev1: 'خفيف',
    sev2: 'متوسط',
    sev3: 'شديد',
    mapTitle: 'أسرع طريق للطوارئ',
    fromTitle: '',
    mapDispatchSummary: 'المقترح: {amb} إسعاف · المسار المختار: {eta} دقيقة',
    st0: 'إسعاف',
    st1: 'دفاع مدني',
    st2: 'شرطة',
    pl0: 'من: مستشفى البشير، عمّان (موقع تقريبي)',
    pl1: 'من: مركز دفاع مدني الزرقاء (موقع تقريبي)',
    pl2: 'من: شرطة المفرق (موقع تقريبي)',
    incPlace: 'أوتوستراد عمّان–الزرقاء',
    mapNote: '',
    routesTitle: 'الطرق المقترحة',
    fastest: 'الأسرع',
    alt: 'بديل',
    min: 'دقيقة',
    km: 'كم',
    jam: 'أزمة',
    startNav: 'ابدأ التوجيه',
    navMsg: 'الطريق انبعت للفريق (عرض تجريبي)',
    tr0: 'سالك',
    tr1: 'متوسط',
    tr2: 'أزمة',
    incident: 'الحادث',
    incTitle: 'سجل الحوادث',
    thTime: 'الوقت',
    thPlace: 'المكان',
    thType: 'النوع',
    thSev: 'الخطورة',
    thStatus: 'الحالة',
    stNew: 'جديد',
    stSent: 'تم الإرسال',
    stDone: 'انحل',
    upTitle: 'تحليل فيديو',
    upPick: 'اسحب فيديو هون أو اختاره',
    upHint: 'MP4 أو AVI · الموديل بيفحص كل فريم',
    upBtn: 'اختار فيديو',
    upRun: 'جاري التحليل…',
    upDone: 'خلص التحليل',
    upNote: 'هاي نتيجة تجريبية للشكل بس. النتيجة الحقيقية بتطلع لما نربط الموديل بالسيرفر.',
    upFound: 'حادث عند الثانية 7.5 · احتمال 0.87',
    foot: 'مشروع تخرج · جامعة آل البيت',
    types: ['تصادم جانبي', 'تصادم خلفي', 'تصادم أمامي', 'انحراف عن الطريق', 'تصادم جانبي'],
    places: ['تقاطع وسط المدينة', 'شارع الجامعة', 'الدوار السابع', 'شارع الملكة رانيا', 'طريق المطار']
  },
  en: {
    login: 'Sign in',
    more: 'Learn more ↓',
    empId: 'Employee ID',
    pass: 'Password',
    signIn: 'Sign in',
    loginDemo: 'Demo: type anything and sign in.',
    logout: 'Sign out',
    roleStaff: 'Emergency staff',
    soundOn: 'Sound on',
    soundOff: 'Muted',
    kicker: 'AI accident detection system',
    h1a: 'Every second',
    h1b: 'counts.',
    liveNow: '4 cameras live',
    sy1: 'Cameras watch',
    sy2: 'AI detects',
    sy3: 'Report goes out',
    sy4: 'Ambulance takes the fastest road',
    ovDet: 'Accident detected · 0.91',
    ovCrash: 'High severity · police + ambulance + civil defense',
    ovEta: 'Ambulance · arrives in 6 min',
    heroText: 'Street cameras see the crash the moment it happens. AI pinpoints where and how bad it is, and responders take the fastest road.',
    enter: 'Enter operations room',
    tLive: 'Live cameras',
    aiOn: 'analysis running',
    camN0: 'Downtown',
    camN1: 'University St.',
    camN2: '7th Circle',
    camN3: 'Airport Rd.',
    camAlert: 'accident!',
    camOk: 'clear',
    camOff: 'offline',
    camDemo: 'In this demo only CAM-01 is live',
    vidLabel: 'Accident clip',
    shotLabel: 'Frame at the crash',
    shotBtn: 'Frame at crash time',
    vidBtn: 'Back to video',
    replayBtn: 'Replay from before the crash',
    shotAlt: 'Frame at the moment of the crash',
    tMap: 'Map & routes',
    tInc: 'Incidents',
    tUp: 'Analyze video',
    demo: '',
    liveTitle: 'Accident detected now',
    incType: 'Side collision',
    incWhere: 'Downtown intersection · Amman',
    kTime: 'Time',
    kCam: 'Camera',
    kCars: 'Vehicles',
    kSpeed: 'Speed before crash',
    speedVal: 'about 50 km/h',
    unitsTitle: 'Suggested responders',
    adviceLine: 'Risk {risk}% ({sevLabel}) · Suggested: {unitsText} ({amb} ambulance)',
    police: 'Police',
    amb: 'Ambulance',
    fire: 'Civil defense',
    showRoute: 'Show fastest route for the ambulance',
    sev1: 'Minor',
    sev2: 'Moderate',
    sev3: 'Severe',
    mapTitle: 'Fastest route for responders',
    fromTitle: '',
    mapDispatchSummary: 'Suggested: {amb} ambulance(s) · Selected route: {eta} min',
    st0: 'Ambulance',
    st1: 'Civil defense',
    st2: 'Police',
    pl0: 'From: Al-Bashir Hospital, Amman (approx.)',
    pl1: 'From: Zarqa civil defense center (approx.)',
    pl2: 'From: Mafraq police (approx.)',
    incPlace: 'Amman–Zarqa highway',
    mapNote: '',
    routesTitle: 'Suggested routes',
    fastest: 'Fastest',
    alt: 'Alternative',
    min: 'min',
    km: 'km',
    jam: 'congested',
    startNav: 'Start navigation',
    navMsg: 'Route sent to the team (demo)',
    tr0: 'Clear',
    tr1: 'Moderate',
    tr2: 'Congested',
    incident: 'Accident',
    incTitle: 'Incident log',
    thTime: 'Time',
    thPlace: 'Place',
    thType: 'Type',
    thSev: 'Severity',
    thStatus: 'Status',
    stNew: 'New',
    stSent: 'Sent',
    stDone: 'Resolved',
    upTitle: 'Analyze a video',
    upPick: 'Drop a video here or choose one',
    upHint: 'MP4 or AVI · the model checks every frame',
    upBtn: 'Choose video',
    upRun: 'Analyzing…',
    upDone: 'Analysis finished',
    upNote: 'This is a demo result for the look only. The real result appears once the model is connected to the server.',
    upFound: 'Accident at 7.5 s · probability 0.87',
    foot: 'Graduation project · Al al-Bayt University',
    types: ['Side collision', 'Rear-end', 'Head-on', 'Ran off road', 'Side collision'],
    places: ['Downtown intersection', 'University St.', '7th Circle', 'Queen Rania St.', 'Airport Rd.']
  }
};

let L = 'ar';
try { L = localStorage.getItem('rg-lang') || 'ar'; } catch (e) {}
const t = k => T[L][k] ?? k;
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const toast = m => {
  const el = $('#toast');
  el.textContent = m;
  el.classList.remove('hidden');
  clearTimeout(toast.h);
  toast.h = setTimeout(() => el.classList.add('hidden'), 3200);
};

/* alert sound by severity (1 = minor, 2 = moderate, 3 = severe) */
let soundOn = true;
try {
  const savedSound = localStorage.getItem('rg-sound');
  if (savedSound !== null) soundOn = savedSound === '1';
} catch (e) {}

let audioCtx = null;
let ringTimeout = null;

const triggerSingleBeep = (freq = 920, dur = 0.16) => {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  } catch (e) {}
};

const playAlertBySeverity = (sevLevel = 2) => {
  if (!soundOn) return;
  clearTimeout(ringTimeout);
  const count = sevLevel >= 3 ? 3 : sevLevel === 2 ? 2 : 1;
  const freq = sevLevel >= 3 ? 1120 : sevLevel === 2 ? 940 : 780;
  const gapMs = 360;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      if (soundOn) triggerSingleBeep(freq, 0.16);
    }, i * gapMs);
  }
};

const ensureSoundBtn = () => {
  if ($('#soundBtn')) return;
  const logoutBtn = $('#logout');
  if (!logoutBtn || !logoutBtn.parentElement) return;
  const btn = document.createElement('button');
  btn.id = 'soundBtn';
  btn.type = 'button';
  btn.className = 'btn ghost';
  btn.style.cssText = 'padding:8px 12px;font-size:13px';
  btn.addEventListener('click', () => {
    soundOn = !soundOn;
    try { localStorage.setItem('rg-sound', soundOn ? '1' : '0'); } catch (e) {}
    updateSoundBtn();
    if (soundOn) triggerSingleBeep(880, 0.14);
  });
  logoutBtn.parentElement.insertBefore(btn, logoutBtn);
  updateSoundBtn();
};

const updateSoundBtn = () => {
  const btn = $('#soundBtn');
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(soundOn));
  btn.textContent = (soundOn ? '🔔 ' : '🔕 ') + t(soundOn ? 'soundOn' : 'soundOff');
};

/* start slideshow */
const TR = [[685,130,870,250,'ID 04'],[490,240,695,365,'ID 07'],[120,275,290,395,'ID 02'],[540,415,735,545,'ID 11'],[955,515,1165,645,'ID 09'],[395,610,620,760,'ID 05'],[1505,600,1730,740,'ID 12'],[2110,930,2365,1090,'ID 15'],[1265,1045,1535,1200,'ID 17']];
$('#tracks').innerHTML = TR.map(([a,b,c,d,id]) => `<div class="tbox" style="left:${((a-220)/2137*100).toFixed(2)}%;top:${(b/1202*100).toFixed(2)}%;width:${((c-a)/2137*100).toFixed(2)}%;height:${((d-b)/1202*100).toFixed(2)}%"><b>${id}</b></div>`).join('') +
  `<div class="rbox" style="left:${(1065/2137*100).toFixed(2)}%;top:${(612/1202*100).toFixed(2)}%;width:${(250/2137*100).toFixed(2)}%;height:${(292/1202*100).toFixed(2)}%"><b data-t="ovDet"></b></div>`;

const slides = $$('.slide'), steps = $$('#story li');
let cur = 0, timer = null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const show = i => {
  cur = i;
  slides.forEach((s, k) => {
    s.classList.toggle('on', k === i);
    if (k === i) {
      const im = s.querySelector('.kb');
      im.style.animation = 'none';
      void im.offsetWidth;
      im.style.animation = '';
    }
  });
  steps.forEach((li, k) => {
    li.className = k < i ? 'done' : k === i ? 'cur' : '';
    const u = li.querySelector('u');
    u.style.animation = 'none';
    void u.offsetWidth;
    u.style.animation = '';
  });
  clearTimeout(timer);
  if (!reduce) {
    timer = setTimeout(() => {
      if (!$('#start').classList.contains('hidden')) show((cur + 1) % slides.length);
    }, 6500);
  }
};
$('#story').addEventListener('click', e => {
  const b = e.target.closest('[data-go-s]');
  if (b) show(+b.dataset.goS);
});
$('#start').addEventListener('mousemove', e => {
  const st = $('#stage');
  st.style.setProperty('--mx', ((e.clientX / innerWidth - .5) * -18).toFixed(1) + 'px');
  st.style.setProperty('--my', ((e.clientY / innerHeight - .5) * -12).toFixed(1) + 'px');
});
show(0);

/* live: risk classification + suggested units & ambulance count */
// TODO BACKEND: ربط هذه القيم بمخرجات موديل الكشف لكل كاميرا
const currentCrash = { risk: 87, cars: 2 };
const units = { police: true, amb: true, fire: false };

const getPlanByRisk = (risk, cars) => {
  if (risk >= 75 || cars >= 3) {
    return { sevLevel: 3, sevKey: 'sev3', recUnits: ['police', 'amb', 'fire'], ambCount: cars >= 3 ? cars : 2 };
  }
  if (risk >= 40) {
    return { sevLevel: 2, sevKey: 'sev2', recUnits: ['police', 'amb'], ambCount: 1 };
  }
  return { sevLevel: 1, sevKey: 'sev1', recUnits: ['police'], ambCount: 0 };
};

const syncPlanFromRisk = () => {
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  units.police = plan.recUnits.includes('police');
  units.amb = plan.recUnits.includes('amb');
  units.fire = plan.recUnits.includes('fire');

  if ($('#carsVal')) $('#carsVal').textContent = String(currentCrash.cars);
  const badge = $('#sevBadge');
  if (badge) {
    badge.className = `chip sev${plan.sevLevel}`;
    badge.textContent = t(plan.sevKey);
  }
  return plan;
};

const drawUnits = () => {
  if (!$('#units')) return;
  $('#units').innerHTML = ['police', 'amb', 'fire'].map(u => `<button type="button" class="unit" data-u="${u}" aria-pressed="${units[u]}">${units[u] ? '✓ ' : ''}${t(u)}</button>`).join('');
};

const drawQuickAdvice = () => {
  const el = $('#quickAdvice');
  if (!el) return;
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const activeUnits = ['police', 'amb', 'fire'].filter(u => units[u]).map(t);
  const unitsText = activeUnits.length ? activeUnits.join(' + ') : t('police');
  const ambCount = units.amb ? Math.max(1, plan.ambCount) : 0;
  el.textContent = t('adviceLine')
    .replace('{risk}', currentCrash.risk)
    .replace('{sevLabel}', t(plan.sevKey))
    .replace('{unitsText}', unitsText)
    .replace('{amb}', ambCount);
};

if ($('#units')) {
  $('#units').addEventListener('click', e => {
    const b = e.target.closest('[data-u]');
    if (!b) return;
    units[b.dataset.u] = !units[b.dataset.u];
    drawUnits();
    drawQuickAdvice();
    drawSide();
  });
}

/* map: real Jordan (Natural Earth) + Dijkstra on the road network */
const G = window.JORDAN_GEO;
const N = G.nodes, EG = G.edges, ADJ = N.map(() => []);
EG.forEach((e, i) => { ADJ[e[0]].push([e[1], i]); ADJ[e[1]].push([e[0], i]); });
const SPD = [100, 70], TF = [1, 1.4, 2.4], TC = ['#2FBF71', '#F07A1A', '#E3242B'], TD = ['', '10 6', '4 6'];
const hav = (a, b) => {
  const r = Math.PI / 180, d1 = (b[0] - a[0]) * r, d2 = (b[1] - a[1]) * r;
  const x = Math.sin(d1 / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(d2 / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};
const snap = ll => {
  let bi = 0, bd = 1e9;
  N.forEach((n, i) => { if (!G.comp[i]) return; const d = hav(ll, n); if (d < bd) { bd = d; bi = i; } });
  return bi;
};
const emin = e => e[4] / SPD[e[2]] * 60 * TF[e[3]];
const INC_LL = [32.0255, 36.0215];
const INCN = snap(INC_LL);
const ST = [
  { n: 'st0', p: 'pl0', ll: [31.9437, 35.9330], ic: 'M12 5v14M5 12h14' },
  { n: 'st1', p: 'pl1', ll: [32.0640, 36.0890], ic: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6 1 1 2 2 3 2 0-2-1-4 0-6z' },
  { n: 'st2', p: 'pl2', ll: [32.3420, 36.2080], ic: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z' }
];
ST.forEach(o => o.node = snap(o.ll));
const dijk = (s, g, pen) => {
  const d = new Float64Array(N.length).fill(1e9), pv = new Int32Array(N.length).fill(-1), pe = new Int32Array(N.length).fill(-1), done = new Uint8Array(N.length);
  d[s] = 0;
  for (;;) {
    let u = -1, b = 1e9;
    for (let i = 0; i < N.length; i++) if (!done[i] && d[i] < b) { b = d[i]; u = i; }
    if (u < 0 || u === g) break;
    done[u] = 1;
    for (const [v, ei] of ADJ[u]) {
      const w = emin(EG[ei]) * (pen.get(ei) || 1);
      if (d[u] + w < d[v]) { d[v] = d[u] + w; pv[v] = u; pe[v] = ei; }
    }
  }
  const path = [g], es = [];
  let k = g;
  while (pv[k] >= 0) { es.unshift(pe[k]); k = pv[k]; path.unshift(k); }
  return { path, es };
};
const routesFor = o => {
  const out = [], pen = new Map();
  for (let r = 0; r < 4 && out.length < 3; r++) {
    const res = dijk(o.node, INCN, pen);
    const sig = res.es.join('-');
    if (res.es.length && !out.some(x => x.sig === sig)) {
      const km = res.es.reduce((a, e) => a + EG[e][4], 0) + hav(o.ll, N[o.node]) + hav(INC_LL, N[INCN]);
      const min = res.es.reduce((a, e) => a + emin(EG[e]), 0) + (hav(o.ll, N[o.node]) + hav(INC_LL, N[INCN])) / 30 * 60;
      const jam = res.es.filter(e => EG[e][3] === 2).reduce((a, e) => a + EG[e][4], 0) / Math.max(.01, res.es.reduce((a, e) => a + EG[e][4], 0));
      out.push({ ...res, sig, km, min, jam });
    }
    res.es.forEach(e => pen.set(e, (pen.get(e) || 1) * 3));
  }
  return out.sort((a, b) => a.min - b.min);
};

let st = 0, sel = 0, R = routesFor(ST[0]), map = null, rLayer = null, stLayer = null, car = null, anim = null;
let L_ = 'ar';
const L_lang = () => L_;

const initMap = () => {
  if (map) return;
  map = LF.map('map', { preferCanvas: true, zoomSnap: .25, minZoom: 6.5, maxZoom: 13, maxBounds: [[28.4, 33.6], [34.2, 40.4]], attributionControl: true });
  map.fitBounds([[31.75, 35.75], [32.45, 36.35]]);
  map.attributionControl.setPrefix(false).addAttribution('Natural Earth');
  LF.geoJSON(G.countries, { style: f => f.properties.a3 === 'JOR' ? { color: '#4a4a52', weight: 1.5, fillColor: '#18181c', fillOpacity: 1 } : { color: '#26262b', weight: 1, fillColor: '#111114', fillOpacity: 1 }, interactive: false }).addTo(map);
  LF.geoJSON(G.gov, { style: { color: '#2c2c33', weight: 1, dashArray: '3 4', fill: false }, interactive: false }).addTo(map);
  map.createPane('labels');
  map.getPane('labels').style.zIndex = 450;
  map.getPane('labels').style.pointerEvents = 'none';
  G.gov.features.forEach(f => {
    const n = f.properties.en;
    if (n === 'Amman' || n === 'Zarqa') return;
    LF.marker(f.properties.lab, { pane: 'labels', icon: LF.divIcon({ className: '', html: `<span class="lab gov" data-ar="${f.properties.ar}" data-en="${n}">${L_lang() === 'ar' ? f.properties.ar : n}</span>`, iconSize: [0, 0] }) }).addTo(map);
  });
  const rr = LF.canvas({ padding: .5 });
  EG.forEach(e => { LF.polyline([N[e[0]], N[e[1]]], { renderer: rr, color: '#2c2c31', weight: e[2] ? 4 : 6, interactive: false }).addTo(map); });
  EG.forEach(e => { LF.polyline([N[e[0]], N[e[1]]], { renderer: rr, color: TC[e[3]], weight: e[2] ? 1.6 : 2.4, opacity: .8, dashArray: TD[e[3]] || null, interactive: false }).addTo(map); });
  G.cities.forEach(c => {
    LF.circleMarker(c.ll, { radius: 4, color: '#fff', weight: 1.5, fillColor: '#111', fillOpacity: 1, interactive: false }).addTo(map);
    LF.marker(c.ll, { pane: 'labels', icon: LF.divIcon({ className: '', html: `<span class="lab city" data-ar="${c.ar}" data-en="${c.en}" style="position:relative;left:8px;top:-8px">${L_lang() === 'ar' ? c.ar : c.en}</span>`, iconSize: [0, 0] }) }).addTo(map);
  });
  LF.marker(INC_LL, { zIndexOffset: 1000, icon: LF.divIcon({ className: '', html: '<div class="inc blink"></div>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).bindTooltip(() => t('incident') + ' · ' + t('incPlace'), { permanent: true, direction: 'top', offset: [0, -14], className: 'tip' }).addTo(map);
  stLayer = LF.layerGroup().addTo(map);
  rLayer = LF.layerGroup().addTo(map);
  drawMap();
};

const drawMap = () => {
  if (!map) return;
  L_ = L;
  document.querySelectorAll('#map .lab').forEach(el => el.textContent = el.dataset[L]);
  rLayer.clearLayers();
  stLayer.clearLayers();
  R.forEach((r, k) => {
    if (k !== sel) LF.polyline(r.path.map(i => N[i]), { color: '#fff', opacity: .35, weight: 5 }).on('click', () => { sel = k; drawMap(); drawSide(); }).addTo(rLayer);
  });
  const r = R[sel], ll = [ST[st].ll, ...r.path.map(i => N[i]), INC_LL];
  LF.polyline(ll, { color: '#000', weight: 12, opacity: .6, interactive: false }).addTo(rLayer);
  rLayer.sel = LF.polyline(ll, { color: '#fff', weight: 6, interactive: false }).addTo(rLayer);
  ST.forEach((o, k) => LF.marker(o.ll, { zIndexOffset: 900, icon: LF.divIcon({ className: '', html: `<div class="pin ${k === st ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="${k === st ? '#E3242B' : '#fff'}" stroke-width="2.4"><path d="${o.ic}"/></svg></div>`, iconSize: [34, 34], iconAnchor: [17, 17] }) }).bindTooltip(t(o.p), { direction: 'top', offset: [0, -16], className: 'tip' }).on('click', () => { st = k; sel = 0; R = routesFor(ST[st]); drawMap(); drawSide(); }).addTo(stLayer));
  car = LF.circleMarker(ST[st].ll, { radius: 8, color: '#E3242B', weight: 4, fillColor: '#fff', fillOpacity: 1 }).addTo(rLayer);
};

const drawSide = () => {
  const activeRoute = R[sel] || R[0];
  const etaMin = activeRoute ? Math.round(activeRoute.min) : 0;
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const ambCount = units.amb ? Math.max(1, plan.ambCount) : 0;
  const fromHead = t('fromTitle') ? `<strong data-t="fromTitle">${t('fromTitle')}</strong>` : '';

  $('#stations').innerHTML = fromHead + ST.map((o, k) => `<button type="button" data-st="${k}" aria-pressed="${k === st}">${t(o.n)}</button>`).join('');
  $('#routes').innerHTML =
    `<p class="note" style="margin:0 0 6px">${t(ST[st].p)}</p>` +
    `<p class="note" style="margin:0 0 10px;color:#fff">${t('mapDispatchSummary').replace('{amb}', ambCount).replace('{eta}', etaMin)}</p>` +
    R.map((r, k) => `<button type="button" class="route" data-r="${k}" aria-pressed="${k === sel}"><span class="chip ${k === 0 ? 'sev1' : ''}" style="${k ? 'border:1px solid #444' : ''}">${k === 0 ? t('fastest') : t('alt')}</span><span><strong>${r.km.toFixed(1)} ${t('km')}</strong> <small>· ${Math.round(r.jam * 100)}% ${t('jam')}</small><span class="bar"><i style="width:${Math.max(4, Math.round(r.jam * 100))}%;background:${r.jam > .4 ? '#E3242B' : r.jam > .15 ? '#F07A1A' : '#2FBF71'}"></i></span></span><span class="eta">${Math.round(r.min)} <small style="font-size:14px">${t('min')}</small></span></button>`).join('');
};
$('#stations').addEventListener('click', e => {
  const b = e.target.closest('[data-st]');
  if (!b) return;
  st = +b.dataset.st; sel = 0; R = routesFor(ST[st]);
  drawMap(); drawSide();
  if (map) map.fitBounds(LF.latLngBounds([ST[st].ll, INC_LL]).pad(.35));
});
$('#routes').addEventListener('click', e => {
  const b = e.target.closest('[data-r]');
  if (!b) return;
  sel = +b.dataset.r;
  drawMap(); drawSide();
});
$('#goBtn').addEventListener('click', () => {
  const activeRoute = R[sel] || R[0];
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const ambCount = units.amb ? Math.max(1, plan.ambCount) : 0;

  /*
    TODO BACKEND:
    إرسال أمر التوجيه إلى الباك-إند وقاعدة البيانات:
    fetch('/api/dispatch/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        station_key: ST[st].n,
        ambulances_count: ambCount,
        eta_minutes: activeRoute ? Math.round(activeRoute.min) : null,
        distance_km: activeRoute ? Number(activeRoute.km.toFixed(1)) : null
      })
    });
  */

  toast(t('navMsg'));
  if (!map || !rLayer.sel) return;
  const pts = rLayer.sel.getLatLngs();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { car.setLatLng(pts[pts.length - 1]); return; }
  const segs = [];
  let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = pts[i - 1].distanceTo(pts[i]); segs.push(d); tot += d; }
  cancelAnimationFrame(anim);
  const t0 = performance.now(), dur = 5000;
  const step = n => {
    let k = Math.min(1, (n - t0) / dur) * tot, i = 0;
    while (i < segs.length - 1 && k > segs[i]) { k -= segs[i]; i++; }
    const f = segs[i] ? Math.min(1, k / segs[i]) : 1, a = pts[i], b = pts[i + 1] || a;
    car.setLatLng([a.lat + (b.lat - a.lat) * f, a.lng + (b.lng - a.lng) * f]);
    if (n - t0 < dur) anim = requestAnimationFrame(step);
  };
  anim = requestAnimationFrame(step);
});

/* incidents */
// TODO BACKEND: جلب سجل الحوادث من قاعدة البيانات عبر API الموظفين الموثّق
const INCS = [
  { t: '14:32', ty: 0, pl: 0, sv: 2, st: 'stNew' },
  { t: '13:05', ty: 1, pl: 1, sv: 1, st: 'stSent' },
  { t: '11:48', ty: 2, pl: 2, sv: 3, st: 'stSent' },
  { t: '09:20', ty: 3, pl: 3, sv: 2, st: 'stDone' },
  { t: '08:02', ty: 4, pl: 4, sv: 1, st: 'stDone' }
];
let isel = 0;
const drawInc = () => {
  $('#incRows').innerHTML = INCS.map((r, k) => `<tr data-i="${k}" tabindex="0" aria-selected="${k === isel}"><td class="t">${r.t}</td><td>${T[L].places[r.pl]}</td><td>${T[L].types[r.ty]}</td><td><span class="chip sev${r.sv}">${t('sev' + r.sv)}</span></td><td class="hide-sm">${t(r.st)}</td></tr>`).join('');
  const r = INCS[isel];
  $('#incDetail').innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 style="font-size:24px">${T[L].types[r.ty]}</h3><div class="note" style="margin-top:4px">${T[L].places[r.pl]} · ${r.t}</div></div><span class="chip sev${r.sv}">${t('sev' + r.sv)}</span></div>
  <div class="media" id="incMedia"><video id="incVid" src="assets/video/cam01.mp4" muted loop playsinline controls preload="metadata"></video><img id="incShot" src="assets/img/crash_frame.jpg" alt="${t('shotAlt')}" class="hidden"><div class="hud" style="top:10px;left:10px" id="incLabel">${t('vidLabel')}</div></div>
  <div class="mbtns"><button class="btn" type="button" id="shotBtn">${t('shotBtn')}</button><button class="btn light" type="button" id="replayBtn">${t('replayBtn')}</button></div>`;
  const v = $('#incVid'), sh = $('#incShot'), lb = $('#incLabel');
  $('#shotBtn').addEventListener('click', () => {
    const showing = !sh.classList.contains('hidden');
    sh.classList.toggle('hidden', showing);
    v.classList.toggle('hidden', !showing);
    if (!showing) { v.pause(); lb.textContent = t('shotLabel') + ' · ' + r.t + ':07'; $('#shotBtn').textContent = t('vidBtn'); }
    else { lb.textContent = t('vidLabel'); $('#shotBtn').textContent = t('shotBtn'); v.play().catch(() => {}); }
  });
  $('#replayBtn').addEventListener('click', () => {
    sh.classList.add('hidden'); v.classList.remove('hidden'); lb.textContent = t('vidLabel'); $('#shotBtn').textContent = t('shotBtn');
    try { v.currentTime = Math.max(0, (v.duration || 5) - 3.5); } catch (e) {}
    v.play().catch(() => {});
  });
};
$('#incRows').addEventListener('click', e => { const tr = e.target.closest('[data-i]'); if (!tr) return; isel = +tr.dataset.i; drawInc(); });
$('#incRows').addEventListener('keydown', e => { if (e.key === 'Enter') { const tr = e.target.closest('[data-i]'); if (tr) { isel = +tr.dataset.i; drawInc(); } } });

/* upload */
const runUpload = f => {
  const box = $('#upState');
  box.innerHTML = `<strong>${f.name}</strong><div class="note" style="margin:6px 0 10px">${t('upRun')}</div><div class="prog"><i id="pg"></i></div>`;
  let p = 0;
  const h = setInterval(() => {
    p += 7;
    $('#pg').style.width = Math.min(p, 100) + '%';
    if (p >= 100) {
      clearInterval(h);
      playAlertBySeverity(3);
      box.innerHTML = `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="chip sev3">${t('upDone')}</span><strong>${t('upFound')}</strong></div><p class="note" style="margin-top:10px">${t('upNote')}</p><button class="btn" type="button" data-go="live" style="margin-top:8px">${t('tLive')}</button>`;
    }
  }, 120);
};
$('#file').addEventListener('change', e => { if (e.target.files[0]) runUpload(e.target.files[0]); });
const drop = $('.drop');
drop.addEventListener('dragover', e => e.preventDefault());
drop.addEventListener('drop', e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) runUpload(f); });

/* cameras + clock */
let cam = 0;
const CAMS = [{ id: 'CAM-01', on: 1 }, { id: 'CAM-02', on: 1 }, { id: 'CAM-03', on: 1 }, { id: 'CAM-04', on: 0 }];
const drawCams = () => {
  $('#cams').innerHTML = CAMS.map((c, k) => `<button type="button" class="cam" data-cam="${k}" aria-pressed="${k === cam}"><span class="dot ${c.on ? '' : 'off'} ${k === 0 ? 'blink' : ''}"></span><span>${c.id}<small>${t('camN' + k)} · ${c.on ? (k === 0 ? t('camAlert') : t('camOk')) : t('camOff')}</small></span></button>`).join('');
};
$('#cams').addEventListener('click', e => {
  const b = e.target.closest('[data-cam]');
  if (!b) return;
  const k = +b.dataset.cam;
  if (k !== 0) { toast(t('camDemo')); return; }
  cam = k; drawCams();
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  playAlertBySeverity(plan.sevLevel);
});
setInterval(() => {
  const d = new Date();
  $('#clock').textContent = d.toISOString().slice(0, 10) + ' · ' + d.toTimeString().slice(0, 8);
}, 1000);

/* staff login (جاهز للربط بالباك-إند وقاعدة البيانات) */
let role = null;
try { role = sessionStorage.getItem('rg-role'); } catch (e) {}

const openLogin = () => {
  $('#login').classList.remove('hidden');
  setTimeout(() => $('#loginForm input').focus(), 50);
};
$$('[data-login="staff"]').forEach(b => b.addEventListener('click', openLogin));
$('#closeLogin').addEventListener('click', () => $('#login').classList.add('hidden'));
$('#login').addEventListener('click', e => { if (e.target.id === 'login') $('#login').classList.add('hidden'); });
addEventListener('keydown', e => { if (e.key === 'Escape') $('#login').classList.add('hidden'); });

$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const empVal = e.target.emp?.value?.trim() || '';
  const pwVal = e.target.pw?.value || '';

  /*
    TODO BACKEND:
    استبدلي هذا الجزء بطلب fetch حقيقي إلى الباك-إند وقاعدة البيانات:
    const res = await fetch('/api/staff/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employee_id: empVal, password: pwVal })
    });
    if (!res.ok) { toast('رقم الموظف أو كلمة المرور غير صحيحة'); return; }
    const data = await res.json();
    sessionStorage.setItem('rg-token', data.token);
  */

  if (!empVal || !pwVal) return;
  role = 'staff';
  try { sessionStorage.setItem('rg-role', role); } catch (x) {}
  $('#login').classList.add('hidden');
  e.target.reset();
  location.hash = 'live';
  route();
});

$('#logout').addEventListener('click', () => {
  role = null;
  try { sessionStorage.removeItem('rg-role'); sessionStorage.removeItem('rg-token'); } catch (x) {}
  location.hash = 'start';
  route();
});

/* navigation & language */
const tabs = $$('[data-tab]'), secs = $$('main > section');
let lastAlertTab = null;
const setTab = name => {
  tabs.forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === name));
  secs.forEach(s => s.classList.toggle('hidden', s.id !== 'v-' + name));
  if (name === 'map') { initMap(); drawMap(); drawSide(); if (map) setTimeout(() => map.invalidateSize(), 60); }
  if (name === 'incidents') drawInc();
  if (name === 'live') {
    drawCams();
    const plan = syncPlanFromRisk();
    drawUnits();
    drawQuickAdvice();
    if (lastAlertTab !== 'live') {
      playAlertBySeverity(plan.sevLevel);
      lastAlertTab = 'live';
    }
  } else if (name !== 'live') {
    lastAlertTab = name;
  }
};
tabs.forEach(b => b.addEventListener('click', () => { location.hash = b.dataset.tab; setTab(b.dataset.tab); }));
document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) { location.hash = go.dataset.go; setTab(go.dataset.go); }
});

const applyLang = () => {
  document.documentElement.lang = L;
  document.documentElement.dir = L === 'ar' ? 'rtl' : 'ltr';
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  $$('[data-lang]').forEach(b => { b.textContent = L === 'ar' ? 'EN' : 'AR'; });
  $('#roleBadge').textContent = t('roleStaff');
  ensureSoundBtn();
  updateSoundBtn();
  drawCams(); syncPlanFromRisk(); drawUnits(); drawQuickAdvice(); drawInc(); drawSide(); drawMap();
};
$$('[data-lang]').forEach(b => b.addEventListener('click', () => {
  L = L === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('rg-lang', L); } catch (e) {}
  applyLang();
}));

const route = () => {
  const h = (location.hash || '#start').replace('#', '');
  if (['live', 'map', 'incidents', 'upload'].includes(h)) {
    if (!role) {
      $('#start').classList.remove('hidden');
      $('#app').classList.add('hidden');
      openLogin();
      return;
    }
    $('#start').classList.add('hidden');
    $('#app').classList.remove('hidden');
    ensureSoundBtn();
    setTab(h);
  } else {
    $('#app').classList.add('hidden');
    $('#start').classList.remove('hidden');
    show(0);
  }
};
addEventListener('hashchange', route);
applyLang();
route();
}