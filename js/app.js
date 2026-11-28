{
const LF = window.L;

/* بيانات الدعم ورقم الواتساب (قيم مبدئية منفصلة للحوادث والدعم الفني) */
const SUPPORT_INFO = {
  version: 'v1.0',
  dispatchWhatsapp: '962795550194',
  supportWhatsapp: '962786660412',
  phoneDisplay: '0786660412',
  email: 'tech-support@roadguard-demo.jo'
};

const T = {
  ar: {
    login: 'تسجيل الدخول',
    more: 'اعرف أكثر ↓',
    empId: 'رقم الموظف',
    pass: 'كلمة السر',
    signIn: 'دخول',
    loginDemo: 'أدخل بيانات الموظف للمتابعة إلى غرفة العمليات.',
    logout: 'خروج',
    roleStaff: 'موظف طوارئ',
    soundOn: 'الصوت شغّال',
    soundOff: 'الصوت مكتوم',
    supportBtn: 'الدعم وحالة النظام',
    toolsMenu: 'الأدوات',
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
    camDemo: 'الكاميرا المحددة حالياً قيد المراقبة على CAM-01',
    vidLabel: 'مقطع الحادث',
    shotLabel: 'صورة لحظة الحادث',
    shotBtn: 'صورة وقت الحادث',
    vidBtn: 'رجوع للفيديو',
    replayBtn: 'إعادة من قبل الحادث',
    shotAlt: 'لقطة لحظة الحادث',
    tMap: 'الخريطة والطرق',
    tInc: 'الحوادث',
    tUp: 'تحليل تسجيل',
    upSubHint: 'تحقيق · فيديو مواطن · كاميرا غير مربوطة · تجربة كاميرا جديدة',
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
    startNav: 'ابدأ التوجيه وأرسل البلاغ',
    navMsg: 'تم تجهيز البلاغ للجهة المختصة',
    dispatchModalTitle: 'إرسال البلاغ للجهة المختصة',
    dispatchSendNow: 'إرسال البلاغ الآن',
    dispatchCopy: 'نسخ نص البلاغ',
    dispatchCopied: 'تم نسخ نص البلاغ',
    dispatchSentToast: 'تم إرسال البلاغ للجهة المختصة',
    unitRouteBadge: 'مسار التوجيه الميداني نحو موقع الحادث (صلاحية المسار فقط)',
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
    upTitle: 'تحليل تسجيل',
    upPick: 'اسحب فيديو هون أو اختاره',
    upHint: 'MP4 أو AVI · لتحقيق، فيديو مواطن، تسجيل كاميرا غير مربوطة، أو تجربة كاميرا جديدة',
    upBtn: 'اختار فيديو',
    upCamLbl: 'الكاميرا (اختياري)',
    upCamOptNone: 'غير محددة (تسجيل خارجي / مواطن)',
    upStartLbl: 'وقت بداية التسجيل (اختياري)',
    upStatusLbl: 'حالة التحليل',
    upWait: 'بالانتظار',
    upRun: 'جاري التحليل...',
    upDone: 'تم ✅',
    resConfirmed: 'تم اكتشاف حادث مؤكد',
    resPossible: 'حادث محتمل، يحتاج مراجعة',
    resNone: 'لم يتم اكتشاف حادث',
    upSummaryTitle: 'ملخص الحادث',
    upTimeLbl: 'الوقت',
    upTypeLbl: 'النوع',
    upSevLbl: 'الخطورة',
    upEvidLbl: 'الأدلة',
    upCarsLbl: 'عدد السيارات',
    upUnitsLbl: 'الوحدات المقترحة',
    upCrashImgLbl: 'صورة لحظة الحادث',
    upVlmLbl: 'شو شاف الذكاء الاصطناعي',
    upPlayClip: 'تشغيل المقطع',
    upOpenInc: 'فتح بصفحة الحوادث',
    upDeleteVid: 'حذف الفيديو',
    upVidDeleted: 'تم حذف الفيديو والنتيجة',
    sketchTitle: 'مخطط الحادث (الكروكا)',
    sketchDownload: 'تنزيل الكروكا (PNG)',
    sketchSaved: 'تم تنزيل الكروكا بصيغة PNG',
    sketchShowBtn: 'عرض الكروكة',
    foot: 'مشروع تخرج · جامعة آل البيت · عند توقف النظام: انتقل للمراقبة اليدوية للكاميرات وتواصل مع الدعم',
    helpCenterTitle: 'مركز المساعدة والدعم الفني',
    helpStatusText: 'حالة النظام: السيرفر متصل · محرك الذكاء الاصطناعي شغّال · الكاميرات المتصلة: 3/4',
    helpIssuesText: 'المشاكل والأعطال: في حال تأخر الكاميرا أو الخريطة أو توقف النظام، انتقل للمراقبة اليدوية للكاميرات وتواصل مع الدعم.',
    helpContactText: 'دعم المشاكل والأعطال (رقم عشوائي مبدئي): واتساب / هاتف 0786660412 · البريد: tech-support@roadguard-demo.jo · أوقات الدعم: يومياً 8:00 ص – 10:00 م',
    footReportTitle: 'الإبلاغ عن مشكلة (مسار الدعم الفني المنفصل عن بلاغات الحوادث)',
    footReportPh: 'اكتب وصف المشكلة باختصار (مثلاً: تأخر الكاميرا أو الخريطة)...',
    footShotLbl: 'صورة شاشة (اختياري)',
    footReportBtn: 'إرسال البلاغ',
    footIssueSubmitted: 'تم البلاغ عن مشكلتك وسوف تتلقى حل بأسرع وقت (رقم التذكرة: {ticket})',
    supTitle: 'الدعم الفني وحالة النظام',
    supLiveHead: 'حالة النظام (لايف)',
    supSrv: 'الاتصال بالسيرفر',
    supSrvVal: 'متصل (24ms)',
    supAi: 'محرك الذكاء الاصطناعي',
    supAiVal: 'شغّال · آخر فحص قبل {sec} ث',
    supCams: 'الكاميرات المتصلة',
    supSync: 'آخر تحديث للبيانات',
    supSyncVal: 'قبل {sec} ثواني',
    supContactHead: 'التواصل مع فريق الدعم التقني',
    supWaLabel: 'واتساب / هاتف الدعم:',
    supMailLabel: 'إيميل الدعم:',
    supHoursLabel: 'أوقات الدعم:',
    supHoursVal: 'يومياً 8:00 ص – 10:00 م (وطوارئ 24/7 أثناء التشغيل)',
    supStopWarn: 'عند توقف النظام: انتقل للمراقبة اليدوية للكاميرات وتواصل مع الدعم.',
    supGuideBtn: 'دليل الاستخدام (PDF)',
    supReportHead: 'إبلاغ عن مشكلة',
    supDescPh: 'اكتب وصف المشكلة باختصار (مثلاً: تأخر تحميل الكاميرا أو الخريطة)...',
    supShotLabel: 'إرفاق صورة شاشة (اختياري)',
    supAutoMeta: 'يُرفق تلقائياً مع البلاغ: نسخة النظام {ver} · الموظف: {emp} · الوقت: {time}',
    supSubmitBtn: 'حفظ وإرسال البلاغ للدعم',
    supSavedMsg: 'تم البلاغ عن مشكلتك وسوف تتلقى حل بأسرع وقت',
    types: ['تصادم جانبي', 'تصادم من الخلف', 'تصادم أمامي', 'انحراف عن الطريق', 'تصادم جانبي'],
    places: ['تقاطع وسط المدينة', 'شارع الجامعة', 'الدوار السابع', 'شارع الملكة رانيا', 'طريق المطار']
  },
  en: {
    login: 'Sign in',
    more: 'Learn more ↓',
    empId: 'Employee ID',
    pass: 'Password',
    signIn: 'Sign in',
    loginDemo: 'Enter staff credentials to access the operations room.',
    logout: 'Sign out',
    roleStaff: 'Emergency staff',
    soundOn: 'Sound on',
    soundOff: 'Muted',
    supportBtn: 'Support & Status',
    toolsMenu: 'Tools',
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
    camDemo: 'Selected feed is currently active on CAM-01',
    vidLabel: 'Accident clip',
    shotLabel: 'Frame at the crash',
    shotBtn: 'Frame at crash time',
    vidBtn: 'Back to video',
    replayBtn: 'Replay from before the crash',
    shotAlt: 'Frame at the moment of the crash',
    tMap: 'Map & routes',
    tInc: 'Incidents',
    tUp: 'Analyze recording',
    upSubHint: 'Investigation · Citizen clip · Unlinked camera · New camera test',
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
    startNav: 'Start navigation & dispatch',
    navMsg: 'Dispatch report prepared for the responder unit',
    dispatchModalTitle: 'Dispatch Report to Responder Unit',
    dispatchSendNow: 'Send Dispatch Now',
    dispatchCopy: 'Copy Dispatch Message',
    dispatchCopied: 'Dispatch message copied',
    dispatchSentToast: 'Dispatch report sent to responder unit',
    unitRouteBadge: 'Field navigation route to incident location (route access only)',
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
    upTitle: 'Analyze recording',
    upPick: 'Drop a video here or choose one',
    upHint: 'MP4 or AVI · for investigation, citizen clips, unlinked cameras, or testing a new camera',
    upBtn: 'Choose video',
    upCamLbl: 'Camera (optional)',
    upCamOptNone: 'Unspecified (external / citizen clip)',
    upStartLbl: 'Recording start time (optional)',
    upStatusLbl: 'Analysis status',
    upWait: 'Pending',
    upRun: 'Analyzing...',
    upDone: 'Done ✅',
    resConfirmed: 'Confirmed accident detected',
    resPossible: 'Possible accident, needs review',
    resNone: 'No accident detected',
    upSummaryTitle: 'Incident summary',
    upTimeLbl: 'Time',
    upTypeLbl: 'Type',
    upSevLbl: 'Severity',
    upEvidLbl: 'Evidence',
    upCarsLbl: 'Vehicles',
    upUnitsLbl: 'Suggested units',
    upCrashImgLbl: 'Crash frame',
    upVlmLbl: 'What AI saw',
    upPlayClip: 'Play clip',
    upOpenInc: 'Open in Incidents',
    upDeleteVid: 'Delete Video',
    upVidDeleted: 'Video and result removed',
    sketchTitle: 'Accident Sketch (Kroki)',
    sketchDownload: 'Download Sketch (PNG)',
    sketchSaved: 'Sketch downloaded as PNG',
    sketchShowBtn: 'View Sketch',
    foot: 'Graduation project · Al al-Bayt University · If system stops: switch to manual camera monitoring and contact support',
    helpCenterTitle: 'Help & Support Center',
    helpStatusText: 'System Status: Server connected · AI engine active · Connected cameras: 3/4',
    helpIssuesText: 'Issues & Downtime: If camera, map, or system stops, switch to manual camera monitoring and contact support.',
    helpContactText: 'Tech Support (placeholder): WhatsApp / Phone 0786660412 · Email: tech-support@roadguard-demo.jo · Hours: Daily 8:00 AM – 10:00 PM',
    footReportTitle: 'Report an Issue (Separate Tech Support Channel from Incident Dispatch)',
    footReportPh: 'Briefly describe the issue (e.g. camera or map delay)...',
    footShotLbl: 'Screenshot (optional)',
    footReportBtn: 'Submit Issue',
    footIssueSubmitted: 'Your issue has been reported and you will receive a solution as soon as possible (Ticket: {ticket})',
    supTitle: 'Technical Support & System Status',
    supLiveHead: 'System Status (Live)',
    supSrv: 'Server Connection',
    supSrvVal: 'Connected (24ms)',
    supAi: 'AI Detection Engine',
    supAiVal: 'Running · last check {sec}s ago',
    supCams: 'Connected Cameras',
    supSync: 'Last Data Update',
    supSyncVal: '{sec} seconds ago',
    supContactHead: 'Contact Technical Support Team',
    supWaLabel: 'WhatsApp / Phone:',
    supMailLabel: 'Support Email:',
    supHoursLabel: 'Support Hours:',
    supHoursVal: 'Daily 8:00 AM – 10:00 PM (24/7 emergency during operations)',
    supStopWarn: 'If the system stops: switch to manual camera monitoring and contact support.',
    supGuideBtn: 'User Guide (PDF)',
    supReportHead: 'Report an Issue',
    supDescPh: 'Briefly describe the issue (e.g. camera feed delay or map issue)...',
    supShotLabel: 'Attach screenshot (optional)',
    supAutoMeta: 'Auto-attached: System {ver} · Staff: {emp} · Time: {time}',
    supSubmitBtn: 'Save & Send Issue to Support',
    supSavedMsg: 'Your issue has been reported and you will receive a solution as soon as possible',
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
  if (!el) return;
  el.textContent = m;
  el.style.zIndex = '10000';
  el.classList.remove('hidden');
  clearTimeout(toast.h);
  toast.h = setTimeout(() => el.classList.add('hidden'), 3600);
};

/* modal visibility helper above Leaflet map */
const setModalVisible = (modal, visible) => {
  if (!modal) return;
  if (visible) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  } else {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
};

const applyModalOverlayStyle = (el) => {
  el.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:9999',
    'display:none',
    'align-items:center',
    'justify-content:center',
    'background:rgba(0,0,0,0.72)',
    'backdrop-filter:blur(4px)',
    'padding:16px'
  ].join(';');
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

/* Save issue locally with ticket ID & show immediate confirmation message */
const submitTechIssue = (desc, shotName) => {
  const ticket = 'TCK-' + String(Math.floor(1000 + Math.random() * 9000));
  const empName = sessionStorage.getItem('rg-emp') || 'STAFF-01';
  const nowIso = new Date().toLocaleString();
  const cleanShot = shotName || (L === 'ar' ? 'بدون مرفق' : 'No attachment');

  try {
    const list = JSON.parse(localStorage.getItem('rg-issues') || '[]');
    list.unshift({
      ticket,
      version: SUPPORT_INFO.version,
      staff: empName,
      time: nowIso,
      desc,
      screenshot: cleanShot
    });
    localStorage.setItem('rg-issues', JSON.stringify(list));
  } catch (err) {}

  const msg = t('footIssueSubmitted').replace('{ticket}', ticket);
  toast(msg);
  return ticket;
};

/* Move "upload" tab into Tools dropdown so main staff nav has only: live, map, incidents */
const organizeToolsMenu = () => {
  const uploadTabBtn = document.querySelector('[data-tab="upload"]');
  if (!uploadTabBtn) return;

  let toolsWrap = $('#toolsDropdownWrap');
  if (!toolsWrap) {
    toolsWrap = document.createElement('div');
    toolsWrap.id = 'toolsDropdownWrap';
    toolsWrap.style.cssText = 'position:relative;display:inline-block';

    const trigger = document.createElement('button');
    trigger.id = 'toolsMenuBtn';
    trigger.type = 'button';
    trigger.className = 'btn ghost';
    trigger.style.cssText = 'padding:8px 12px;font-size:13px';

    const menu = document.createElement('div');
    menu.id = 'toolsMenuPanel';
    menu.style.cssText = 'display:none;position:absolute;top:calc(100% + 6px);inset-inline-start:0;min-width:230px;background:#16161b;border:1px solid #2e2e38;border-radius:12px;padding:8px;z-index:2000;box-shadow:0 14px 36px rgba(0,0,0,0.6)';

    uploadTabBtn.parentElement.insertBefore(toolsWrap, uploadTabBtn);
    uploadTabBtn.className = 'btn ghost';
    uploadTabBtn.style.cssText = 'width:100%;justify-content:flex-start;text-align:start;padding:9px 12px;font-size:13px';
    menu.appendChild(uploadTabBtn);

    const subNote = document.createElement('div');
    subNote.id = 'toolsSubNote';
    subNote.style.cssText = 'padding:6px 12px 4px;font-size:11.5px;color:#a1a1aa;line-height:1.5';
    menu.appendChild(subNote);

    toolsWrap.appendChild(trigger);
    toolsWrap.appendChild(menu);

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const open = menu.style.display === 'block';
      menu.style.display = open ? 'none' : 'block';
    });

    document.addEventListener('click', e => {
      if (!toolsWrap.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  }

  const trigger = $('#toolsMenuBtn');
  if (trigger) {
    trigger.textContent = '🛠️ ' + t('toolsMenu') + ' ▾';
    const isUploadActive = location.hash.replace('#', '') === 'upload';
    trigger.setAttribute('aria-pressed', String(isUploadActive));
  }
  const subNote = $('#toolsSubNote');
  if (subNote) subNote.textContent = t('upSubHint');
  if (uploadTabBtn) uploadTabBtn.textContent = '🎬 ' + t('tUp');
};

/* Text-based Help & Support Center + inline issue report box at the bottom of the page */
const ensureFooterSupport = () => {
  $('#supportOpenBtn')?.remove();
  $$('.footer-support-btn').forEach(b => b.remove());
  $('#rgBottomSupBtn')?.remove();

  let bar = $('#rgBottomFooter');
  if (!bar) {
    bar = document.createElement('section');
    bar.id = 'rgBottomFooter';
    bar.setAttribute('aria-label', 'Help and Support');
    bar.style.cssText = [
      'max-width:1240px',
      'margin:24px auto 22px',
      'padding:18px 20px',
      'background:#121216',
      'border:1px solid #24242d',
      'border-radius:12px',
      'font-size:13px',
      'color:#b4b4be',
      'line-height:1.75'
    ].join(';');

    bar.innerHTML = `
      <div id="rgHelpTitle" style="font-weight:700;color:#f4f4f6;font-size:14px;margin-bottom:6px"></div>
      <div id="rgHelpStatus"></div>
      <div id="rgHelpIssues"></div>
      <div id="rgHelpContact" style="margin-bottom:14px"></div>
      <form id="rgFootIssueForm" style="padding-top:12px;border-top:1px solid #22222b">
        <div id="rgFootReportTitle" style="font-weight:700;color:#f4f4f6;font-size:13.5px;margin-bottom:8px"></div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
          <input id="rgFootIssueDesc" type="text" required style="flex:1 1 260px;background:#0d0d11;color:#fff;border:1px solid #2e2e38;border-radius:8px;padding:8px 11px;font-family:inherit;font-size:13px">
          <label id="rgFootShotLbl" for="rgFootIssueShot" style="font-size:12.5px;color:#a1a1aa"></label>
          <input id="rgFootIssueShot" type="file" accept="image/*" style="max-width:210px;font-size:12px;color:#cbd5e1">
          <button id="rgFootIssueBtn" type="submit" style="background:#1c1c24;color:#fff;border:1px solid #353542;border-radius:8px;padding:8px 14px;font-family:inherit;font-size:13px;cursor:pointer"></button>
        </div>
        <div id="rgFootIssueAck" style="display:none;margin-top:10px;padding:9px 12px;border-radius:8px;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.35);color:#86efac;font-size:13px"></div>
      </form>
    `;
    document.body.appendChild(bar);

    $('#rgFootIssueForm').addEventListener('submit', e => {
      e.preventDefault();
      const desc = $('#rgFootIssueDesc').value.trim();
      if (!desc) return;
      const shotName = $('#rgFootIssueShot').files?.[0]?.name || '';
      const ticket = submitTechIssue(desc, shotName);

      const ack = $('#rgFootIssueAck');
      if (ack) {
        ack.textContent = '✅ ' + t('footIssueSubmitted').replace('{ticket}', ticket);
        ack.style.display = 'block';
      }
      e.target.reset();
    });
  }

  $('#rgHelpTitle').textContent = t('helpCenterTitle');
  $('#rgHelpStatus').textContent = t('helpStatusText');
  $('#rgHelpIssues').textContent = t('helpIssuesText');
  $('#rgHelpContact').textContent = t('helpContactText');
  $('#rgFootReportTitle').textContent = t('footReportTitle');
  $('#rgFootIssueDesc').placeholder = t('footReportPh');
  $('#rgFootShotLbl').textContent = t('footShotLbl');
  $('#rgFootIssueBtn').textContent = t('footReportBtn');
};

const ensureHeaderActions = () => {
  organizeToolsMenu();
  ensureFooterSupport();

  const logoutBtn = $('#logout');
  if (!logoutBtn || !logoutBtn.parentElement) return;

  if (!$('#soundBtn')) {
    const btn = document.createElement('button');
    btn.id = 'soundBtn';
    btn.type = 'button';
    btn.className = 'btn ghost';
    btn.style.cssText = 'padding:8px 12px;font-size:13px';
    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      try { localStorage.setItem('rg-sound', soundOn ? '1' : '0'); } catch (e) {}
      updateHeaderButtons();
      if (soundOn) triggerSingleBeep(880, 0.14);
    });
    logoutBtn.parentElement.insertBefore(btn, logoutBtn);
  }
  updateHeaderButtons();
};

const updateHeaderButtons = () => {
  const btn = $('#soundBtn');
  if (btn) {
    btn.setAttribute('aria-pressed', String(soundOn));
    btn.textContent = (soundOn ? '🔔 ' : '🔕 ') + t(soundOn ? 'soundOn' : 'soundOff');
  }
  ensureFooterSupport();
  organizeToolsMenu();
};

/* start slideshow */
const TR = [[685,130,870,250,'ID 04'],[490,240,695,365,'ID 07'],[120,275,290,395,'ID 02'],[540,415,735,545,'ID 11'],[955,515,1165,645,'ID 09'],[395,610,620,760,'ID 05'],[1505,600,1730,740,'ID 12'],[2110,930,2365,1090,'ID 15'],[1265,1045,1535,1200,'ID 17']];
if ($('#tracks')) {
  $('#tracks').innerHTML = TR.map(([a,b,c,d,id]) => `<div class="tbox" style="left:${((a-220)/2137*100).toFixed(2)}%;top:${(b/1202*100).toFixed(2)}%;width:${((c-a)/2137*100).toFixed(2)}%;height:${((d-b)/1202*100).toFixed(2)}%"><b>${id}</b></div>`).join('') +
    `<div class="rbox" style="left:${(1065/2137*100).toFixed(2)}%;top:${(612/1202*100).toFixed(2)}%;width:${(250/2137*100).toFixed(2)}%;height:${(292/1202*100).toFixed(2)}%"><b data-t="ovDet"></b></div>`;
}

const slides = $$('.slide'), steps = $$('#story li');
let cur = 0, timer = null;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const show = i => {
  if (!slides.length) return;
  cur = i;
  slides.forEach((s, k) => {
    s.classList.toggle('on', k === i);
    if (k === i) {
      const im = s.querySelector('.kb');
      if (im) {
        im.style.animation = 'none';
        void im.offsetWidth;
        im.style.animation = '';
      }
    }
  });
  steps.forEach((li, k) => {
    li.className = k < i ? 'done' : k === i ? 'cur' : '';
    const u = li.querySelector('u');
    if (u) {
      u.style.animation = 'none';
      void u.offsetWidth;
      u.style.animation = '';
    }
  });
  clearTimeout(timer);
  if (!reduce) {
    timer = setTimeout(() => {
      if ($('#start') && !$('#start').classList.contains('hidden')) show((cur + 1) % slides.length);
    }, 6500);
  }
};
$('#story')?.addEventListener('click', e => {
  const b = e.target.closest('[data-go-s]');
  if (b) show(+b.dataset.goS);
});
$('#start')?.addEventListener('mousemove', e => {
  const st = $('#stage');
  if (!st) return;
  st.style.setProperty('--mx', ((e.clientX / innerWidth - .5) * -18).toFixed(1) + 'px');
  st.style.setProperty('--my', ((e.clientY / innerHeight - .5) * -12).toFixed(1) + 'px');
});
show(0);

/* live: risk classification + suggested units & ambulance count */
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

$('#units')?.addEventListener('click', e => {
  const b = e.target.closest('[data-u]');
  if (!b) return;
  units[b.dataset.u] = !units[b.dataset.u];
  drawUnits();
  drawQuickAdvice();
  drawSide();
});

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
  const mapEl = $('#map');
  if (mapEl) {
    mapEl.style.position = 'relative';
    mapEl.style.overflow = 'hidden';
    mapEl.style.borderRadius = '14px';
    if (!mapEl.style.minHeight) mapEl.style.minHeight = '420px';
  }
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
  if (!$('#stations') || !$('#routes')) return;
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
$('#stations')?.addEventListener('click', e => {
  const b = e.target.closest('[data-st]');
  if (!b) return;
  st = +b.dataset.st; sel = 0; R = routesFor(ST[st]);
  drawMap(); drawSide();
  if (map) map.fitBounds(LF.latLngBounds([ST[st].ll, INC_LL]).pad(.35));
});
$('#routes')?.addEventListener('click', e => {
  const b = e.target.closest('[data-r]');
  if (!b) return;
  sel = +b.dataset.r;
  drawMap(); drawSide();
});

/* Dispatch details (separate from tech support), restricted responder route link (?unit=1#map), Google Maps link */
const getUnitBreakdownAr = (ambCount) => {
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const parts = [];
  if (units.amb || ambCount > 0) {
    parts.push(ambCount >= 2 ? `${ambCount} سيارات إسعاف` : `سيارة إسعاف واحدة`);
  }
  if (units.fire || plan.recUnits.includes('fire')) {
    parts.push('دفاع مدني / إطفاء');
  }
  if (units.police || plan.recUnits.includes('police')) {
    parts.push('دورية شرطة');
  }
  return parts.length ? parts.join(' + ') : t(ST[st].n);
};

const getUnitBreakdownEn = (ambCount) => {
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const parts = [];
  if (units.amb || ambCount > 0) {
    parts.push(ambCount >= 2 ? `${ambCount} ambulances` : `1 ambulance`);
  }
  if (units.fire || plan.recUnits.includes('fire')) {
    parts.push('civil defense / fire unit');
  }
  if (units.police || plan.recUnits.includes('police')) {
    parts.push('police patrol');
  }
  return parts.length ? parts.join(' + ') : t(ST[st].n);
};

const buildUnitRouteUrl = () => {
  const base = `${location.origin}${location.pathname}`;
  const params = new URLSearchParams({
    unit: '1',
    st: String(st),
    r: String(sel),
    risk: String(currentCrash.risk),
    cars: String(currentCrash.cars)
  });
  return `${base}?${params.toString()}#map`;
};

const buildDispatchText = () => {
  const activeRoute = R[sel] || R[0];
  const plan = getPlanByRisk(currentCrash.risk, currentCrash.cars);
  const ambCount = units.amb ? Math.max(1, plan.ambCount) : 0;
  const etaMin = activeRoute ? Math.round(activeRoute.min) : 0;
  const distKm = activeRoute ? activeRoute.km.toFixed(1) : '0';
  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const googleMapUrl = `https://maps.google.com/?q=${INC_LL[0]},${INC_LL[1]}`;
  const responderRouteUrl = buildUnitRouteUrl();

  if (L === 'ar') {
    const unitDetails = getUnitBreakdownAr(ambCount);
    return [
      `بلاغ طوارئ عاجل — نظام ROADGUARD`,
      `الجهة المستهدفة: ${t(ST[st].n)} — التفاصيل: ${unitDetails}`,
      `الحادث والخطورة: ${t('incType')} · ${t(plan.sevKey)} (${currentCrash.risk}%)`,
      `الموقع: ${t('incPlace')}`,
      `نقطة الانطلاق: ${t(ST[st].p).replace('من: ', '')}`,
      `المسافة والوقت المتوقع: ${distKm} كم · ${etaMin} دقيقة`,
      `رابط توجيه المسار للوحدة الميدانية: ${responderRouteUrl}`,
      `رابط الموقع على الخريطة: ${googleMapUrl}`,
      `وقت البلاغ: ${nowStr}`
    ].join('\n');
  }

  const unitDetailsEn = getUnitBreakdownEn(ambCount);
  return [
    `URGENT DISPATCH — ROADGUARD AI`,
    `Target Unit: ${t(ST[st].n)} — Details: ${unitDetailsEn}`,
    `Incident & Severity: ${t('incType')} · ${t(plan.sevKey)} (${currentCrash.risk}%)`,
    `Location: ${t('incPlace')}`,
    `Origin: ${t(ST[st].p).replace('From: ', '')}`,
    `Distance & ETA: ${distKm} km · ${etaMin} min`,
    `Field Route Navigation Link: ${responderRouteUrl}`,
    `Map Location Link: ${googleMapUrl}`,
    `Time: ${nowStr}`
  ].join('\n');
};

const animateRouteCar = () => {
  if (!map || !rLayer?.sel || !car) return;
  const pts = rLayer.sel.getLatLngs();
  if (!pts.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    car.setLatLng(pts[pts.length - 1]);
    return;
  }
  const segs = [];
  let tot = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = pts[i - 1].distanceTo(pts[i]);
    segs.push(d);
    tot += d;
  }
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
};

const showDispatchModal = () => {
  let modal = $('#dispatchModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'dispatchModal';
    modal.className = 'modal hidden';
    applyModalOverlayStyle(modal);
    modal.innerHTML = `<div class="box" style="max-width:540px;width:100%;background:#16161b;border:1px solid #2e2e38;border-radius:16px;padding:20px;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,0.65)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px">
        <h3 id="dispTitle" style="font-size:20px;margin:0"></h3>
        <button type="button" class="btn ghost" id="closeDispModal" style="padding:6px 10px">✕</button>
      </div>
      <pre id="dispPreview" style="white-space:pre-line;font-family:inherit;background:#0e0e12;border:1px solid #2b2b33;border-radius:12px;padding:14px;font-size:14px;line-height:1.75;margin:0 0 14px;color:#f3f3f6"></pre>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a id="dispSendLink" target="_blank" rel="noopener" class="btn" style="flex:1;text-align:center;text-decoration:none"></a>
        <button type="button" id="dispCopyBtn" class="btn light"></button>
      </div>
    </div>`;
    document.body.appendChild(modal);
    $('#closeDispModal').addEventListener('click', () => setModalVisible(modal, false));
    modal.addEventListener('click', e => { if (e.target === modal) setModalVisible(modal, false); });
    $('#dispSendLink').addEventListener('click', () => {
      toast(t('dispatchSentToast'));
    });
    $('#dispCopyBtn').addEventListener('click', () => {
      const txt = $('#dispPreview').textContent;
      navigator.clipboard?.writeText(txt).catch(() => {});
      toast(t('dispatchCopied'));
    });
  }

  const msg = buildDispatchText();
  $('#dispTitle').textContent = t('dispatchModalTitle');
  $('#dispPreview').textContent = msg;
  const sendBtn = $('#dispSendLink');
  sendBtn.textContent = '🚨 ' + t('dispatchSendNow');
  sendBtn.href = `https://wa.me/${SUPPORT_INFO.dispatchWhatsapp}?text=${encodeURIComponent(msg)}`;
  $('#dispCopyBtn').textContent = t('dispatchCopy');
  setModalVisible(modal, true);
};

$('#goBtn')?.addEventListener('click', () => {
  toast(t('navMsg'));
  showDispatchModal();
  animateRouteCar();
});

/* Support & Live System Status Modal (uses separate supportWhatsapp & supportEmail) */
let lastDataSyncMs = Date.now();
const openUserGuidePdf = () => {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>دليل استخدام ROADGUARD</title>
  <style>body{font-family:Segoe UI,Tahoma,sans-serif;padding:32px;line-height:1.8;color:#111;max-width:760px;margin:auto}h1{color:#c91f26;border-bottom:2px solid #eee;padding-bottom:8px}h2{margin-top:22px;font-size:18px}.box{background:#f8f8fa;border-right:4px solid #c91f26;padding:12px 16px;margin:14px 0}</style>
  </head><body>
  <h1>دليل الاستخدام السريع — نظام ROADGUARD (${SUPPORT_INFO.version})</h1>
  <div class="box"><strong>إجراء الطوارئ عند توقف النظام:</strong> عند توقف النظام، انتقل فوراً للمراقبة اليدوية للكاميرات وتواصل مع فريق الدعم الفني.</div>
  <h2>1. مراقبة الكاميرات المباشرة</h2>
  <p>عند رصد حادث بواسطة الذكاء الاصطناعي، يصدر النظام تنبيهاً صوتياً حسب درجة الخطورة (رنة للخفيف، رنتان للمتوسط، 3 رنات للشديد) ويقترح الجهات المختصة وعدد سيارات الإسعاف تلقائياً.</p>
  <h2>2. الخريطة وأسرع طريق للطوارئ</h2>
  <p>اختر نقطة الانطلاق (إسعاف، دفاع مدني، شرطة) ثم اضغط على <strong>ابدأ التوجيه وأرسل البلاغ</strong> لتوليد البلاغ ورابط التوجيه للوحدة الميدانية ورابط الموقع على الخريطة.</p>
  <h2>3. الدعم الفني والإبلاغ عن الأعطال</h2>
  <p>واتساب / هاتف الدعم الفني: ${SUPPORT_INFO.phoneDisplay} · البريد الإلكتروني: ${SUPPORT_INFO.email}</p>
  <script>window.onload=function(){window.print();}</script>
  </body></html>`);
  win.document.close();
};

const openSupportModal = () => {
  let modal = $('#supportModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'supportModal';
    modal.className = 'modal hidden';
    applyModalOverlayStyle(modal);
    modal.innerHTML = `<div class="box" style="max-width:620px;width:100%;max-height:90vh;overflow-y:auto;background:#16161b;border:1px solid #2e2e38;border-radius:16px;padding:20px;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,0.65)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px">
        <h3 id="supModalTitle" style="font-size:21px;margin:0"></h3>
        <button type="button" class="btn ghost" id="closeSupModal" style="padding:6px 10px">✕</button>
      </div>

      <div style="background:#0e0e12;border:1px solid #2b2b34;border-radius:12px;padding:14px;margin-bottom:14px">
        <strong id="supLiveTitle" style="display:block;margin-bottom:10px;font-size:15px"></strong>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;font-size:13.5px">
          <div>🟢 <span id="supSrvLbl"></span>: <strong id="supSrvVal"></strong></div>
          <div>🟢 <span id="supAiLbl"></span>: <strong id="supAiVal"></strong></div>
          <div>📷 <span id="supCamsLbl"></span>: <strong id="supCamsVal"></strong></div>
          <div>🔄 <span id="supSyncLbl"></span>: <strong id="supSyncVal"></strong></div>
        </div>
      </div>

      <div style="background:#0e0e12;border:1px solid #2b2b34;border-radius:12px;padding:14px;margin-bottom:14px;font-size:14px;line-height:1.8">
        <strong id="supContactTitle" style="display:block;margin-bottom:6px;font-size:15px"></strong>
        <div>📱 <span id="supWaLbl"></span> <a id="supWaDirect" target="_blank" rel="noopener" style="color:#4ade80;font-weight:600;text-decoration:none">${SUPPORT_INFO.phoneDisplay}</a></div>
        <div>✉️ <span id="supMailLbl"></span> <a href="mailto:${SUPPORT_INFO.email}" style="color:#93c5fd;text-decoration:none">${SUPPORT_INFO.email}</a></div>
        <div>🕒 <span id="supHoursLbl"></span> <span id="supHoursVal"></span></div>
      </div>

      <div style="background:rgba(227,36,43,0.14);border:1px solid rgba(227,36,43,0.45);border-radius:12px;padding:12px 14px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
        <span id="supStopText" style="font-size:13.5px;font-weight:600;color:#fca5a5"></span>
        <button type="button" id="supGuideBtn" class="btn light" style="padding:7px 12px;font-size:13px"></button>
      </div>

      <form id="supReportForm" style="background:#0e0e12;border:1px solid #2b2b34;border-radius:12px;padding:14px">
        <strong id="supFormTitle" style="display:block;margin-bottom:8px;font-size:15px"></strong>
        <textarea id="supDesc" rows="3" required style="width:100%;background:#16161b;color:#fff;border:1px solid #333;border-radius:10px;padding:10px;font-family:inherit;font-size:14px;margin-bottom:10px"></textarea>
        <div style="margin-bottom:10px;font-size:13px">
          <label id="supShotLbl" for="supShot" style="display:block;margin-bottom:4px;color:#bbb"></label>
          <input id="supShot" type="file" accept="image/*" style="font-size:13px">
        </div>
        <div id="supMetaInfo" class="note" style="margin-bottom:12px;font-size:12.5px"></div>
        <button type="submit" id="supSubmitBtn" class="btn" style="width:100%"></button>
      </form>
    </div>`;
    document.body.appendChild(modal);

    $('#closeSupModal').addEventListener('click', () => setModalVisible(modal, false));
    modal.addEventListener('click', e => { if (e.target === modal) setModalVisible(modal, false); });
    $('#supGuideBtn').addEventListener('click', openUserGuidePdf);

    $('#supReportForm').addEventListener('submit', e => {
      e.preventDefault();
      const desc = $('#supDesc').value.trim();
      if (!desc) return;
      const shotName = $('#supShot').files?.[0]?.name || '';
      submitTechIssue(desc, shotName);
      e.target.reset();
    });
  }

  refreshSupportModal();
  setModalVisible(modal, true);
};

const refreshSupportModal = () => {
  const modal = $('#supportModal');
  if (!modal) return;
  const secAgo = Math.max(1, Math.floor((Date.now() - lastDataSyncMs) / 1000) % 60);
  const empName = sessionStorage.getItem('rg-emp') || 'STAFF-01';
  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  $('#supModalTitle').textContent = t('supTitle');
  $('#supLiveTitle').textContent = t('supLiveHead');
  $('#supSrvLbl').textContent = t('supSrv');
  $('#supSrvVal').textContent = t('supSrvVal');
  $('#supAiLbl').textContent = t('supAi');
  $('#supAiVal').textContent = t('supAiVal').replace('{sec}', secAgo);
  $('#supCamsLbl').textContent = t('supCams');
  $('#supCamsVal').textContent = '3 / 4';
  $('#supSyncLbl').textContent = t('supSync');
  $('#supSyncVal').textContent = t('supSyncVal').replace('{sec}', secAgo);

  $('#supContactTitle').textContent = t('supContactHead');
  $('#supWaLbl').textContent = t('supWaLabel');
  $('#supWaDirect').href = `https://wa.me/${SUPPORT_INFO.supportWhatsapp}`;
  $('#supMailLbl').textContent = t('supMailLabel');
  $('#supHoursLbl').textContent = t('supHoursLabel');
  $('#supHoursVal').textContent = t('supHoursVal');

  $('#supStopText').textContent = t('supStopWarn');
  $('#supGuideBtn').textContent = '📄 ' + t('supGuideBtn');

  $('#supFormTitle').textContent = t('supReportHead');
  $('#supDesc').placeholder = t('supDescPh');
  $('#supShotLbl').textContent = t('supShotLabel');
  $('#supMetaInfo').textContent = t('supAutoMeta')
    .replace('{ver}', SUPPORT_INFO.version)
    .replace('{emp}', empName)
    .replace('{time}', nowStr);
  $('#supSubmitBtn').textContent = t('supSubmitBtn');
};

/* Kroki renderer from kroki.vehicles[].path_px and kroki.impact_px */
const getKrokiByIncidentType = (ty = 0) => {
  if (ty === 1) {
    return {
      vehicles: [
        { id: 'V1', color: '#38bdf8', path_px: [[85, 136], [200, 136], [292, 136]] },
        { id: 'V2', color: '#f59e0b', path_px: [[470, 136], [385, 136], [322, 136]] }
      ],
      impact_px: [310, 136]
    };
  }
  if (ty === 2) {
    return {
      vehicles: [
        { id: 'V1', color: '#38bdf8', path_px: [[80, 118], [195, 126], [295, 134]] },
        { id: 'V2', color: '#f59e0b', path_px: [[530, 152], [415, 144], [325, 138]] }
      ],
      impact_px: [310, 136]
    };
  }
  if (ty === 3) {
    return {
      vehicles: [
        { id: 'V1', color: '#38bdf8', path_px: [[85, 136], [230, 136], [355, 86]] }
      ],
      impact_px: [355, 86]
    };
  }
  return {
    vehicles: [
      { id: 'V1', color: '#38bdf8', path_px: [[90, 84], [215, 112], [305, 136]] },
      { id: 'V2', color: '#f59e0b', path_px: [[485, 136], [395, 136], [325, 136]] }
    ],
    impact_px: [312, 136]
  };
};

const renderKrokiFromData = (canvas, kroki, crashTypeLabel) => {
  if (!canvas || !kroki) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0d1017';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#1d222e';
  ctx.fillRect(28, 62, w - 56, h - 122);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(28, 62, w - 56, h - 122);

  ctx.save();
  ctx.setLineDash([12, 10]);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(36, (62 + (h - 60)) / 2);
  ctx.lineTo(w - 36, (62 + (h - 60)) / 2);
  ctx.stroke();
  ctx.restore();

  const palette = ['#38bdf8', '#f59e0b', '#a78bfa', '#34d399'];

  (kroki.vehicles || []).forEach((v, idx) => {
    const pts = v.path_px || [];
    if (pts.length < 2) return;
    const col = v.color || palette[idx % palette.length];

    ctx.save();
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i][0], pts[i][1]);
    }
    ctx.stroke();

    const pPrev = pts[pts.length - 2];
    const pLast = pts[pts.length - 1];
    const ang = Math.atan2(pLast[1] - pPrev[1], pLast[0] - pPrev[0]);
    const head = 10;
    ctx.beginPath();
    ctx.moveTo(pLast[0], pLast[1]);
    ctx.lineTo(pLast[0] - head * Math.cos(ang - 0.45), pLast[1] - head * Math.sin(ang - 0.45));
    ctx.lineTo(pLast[0] - head * Math.cos(ang + 0.45), pLast[1] - head * Math.sin(ang + 0.45));
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(v.id || `V-${idx + 1}`, pts[0][0], Math.max(78, pts[0][1] - 8));
    ctx.restore();
  });

  if (Array.isArray(kroki.impact_px) && kroki.impact_px.length >= 2) {
    const [ix, iy] = kroki.impact_px;
    ctx.save();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ix, iy, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ix, iy, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(crashTypeLabel || '', w / 2, h - 18);
};

const showIncidentSketchModal = r => {
  let modal = $('#sketchModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sketchModal';
    modal.className = 'modal hidden';
    applyModalOverlayStyle(modal);
    modal.innerHTML = `<div class="box" style="max-width:680px;width:100%;background:#16161b;border:1px solid #2e2e38;border-radius:16px;padding:20px;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,0.65)">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px">
        <h3 style="font-size:19px;margin:0">${t('sketchTitle')}</h3>
        <div style="display:flex;gap:8px;align-items:center">
          <button type="button" class="btn light" id="incSketchDlBtn" style="padding:6px 11px;font-size:12.5px">⬇ ${t('sketchDownload')}</button>
          <button type="button" class="btn ghost" id="closeSketchModal" style="padding:6px 10px">✕</button>
        </div>
      </div>
      <div class="note" id="incSketchMeta" style="margin-bottom:10px"></div>
      <canvas id="incSketchCanvas" width="620" height="260" style="width:100%;max-height:260px;border-radius:10px;border:1px solid #282c38;display:block"></canvas>
    </div>`;
    document.body.appendChild(modal);
    $('#closeSketchModal').addEventListener('click', () => setModalVisible(modal, false));
    modal.addEventListener('click', e => { if (e.target === modal) setModalVisible(modal, false); });
    $('#incSketchDlBtn').addEventListener('click', () => {
      const cvs = $('#incSketchCanvas');
      if (!cvs) return;
      const a = document.createElement('a');
      a.download = `kroki-incident-${Date.now()}.png`;
      a.href = cvs.toDataURL('image/png');
      a.click();
      toast(t('sketchSaved'));
    });
  }

  const krokiData = r.kroki || getKrokiByIncidentType(r.ty);
  $('#incSketchMeta').textContent = `${T[L].places[r.pl]} · ${r.t}`;
  renderKrokiFromData($('#incSketchCanvas'), krokiData, T[L].types[r.ty]);
  setModalVisible(modal, true);
};

/* incidents */
const INCS = [
  { t: '14:32', ty: 0, pl: 0, sv: 2, st: 'stNew', kroki: getKrokiByIncidentType(0) },
  { t: '13:05', ty: 1, pl: 1, sv: 1, st: 'stSent', kroki: getKrokiByIncidentType(1) },
  { t: '11:48', ty: 2, pl: 2, sv: 3, st: 'stSent', kroki: getKrokiByIncidentType(2) },
  { t: '09:20', ty: 3, pl: 3, sv: 2, st: 'stDone', kroki: getKrokiByIncidentType(3) },
  { t: '08:02', ty: 4, pl: 4, sv: 1, st: 'stDone', kroki: getKrokiByIncidentType(4) }
];
let isel = 0;
const drawInc = () => {
  if (!$('#incRows') || !$('#incDetail')) return;
  $('#incRows').innerHTML = INCS.map((r, k) => `<tr data-i="${k}" tabindex="0" aria-selected="${k === isel}"><td class="t">${r.t}</td><td>${T[L].places[r.pl]}</td><td>${T[L].types[r.ty]}</td><td><span class="chip sev${r.sv}">${t('sev' + r.sv)}</span></td><td class="hide-sm">${t(r.st)}</td></tr>`).join('');
  const r = INCS[isel];
  $('#incDetail').innerHTML = `<div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 style="font-size:24px">${T[L].types[r.ty]}</h3><div class="note" style="margin-top:4px">${T[L].places[r.pl]} · ${r.t}</div></div><span class="chip sev${r.sv}">${t('sev' + r.sv)}</span></div>
  <div class="media" id="incMedia"><video id="incVid" src="assets/video/cam01.mp4" muted loop playsinline controls preload="metadata"></video><img id="incShot" src="assets/img/crash_frame.jpg" alt="${t('shotAlt')}" class="hidden"><div class="hud" style="top:10px;left:10px" id="incLabel">${t('vidLabel')}</div></div>
  <div class="mbtns"><button class="btn" type="button" id="shotBtn">${t('shotBtn')}</button><button class="btn light" type="button" id="replayBtn">${t('replayBtn')}</button><button class="btn ghost" type="button" id="incSketchBtn" style="border:1px solid #3f3f46">📐 ${t('sketchShowBtn')}</button></div>`;
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
  $('#incSketchBtn')?.addEventListener('click', () => showIncidentSketchModal(r));
};
$('#incRows')?.addEventListener('click', e => { const tr = e.target.closest('[data-i]'); if (!tr) return; isel = +tr.dataset.i; drawInc(); });
$('#incRows')?.addEventListener('keydown', e => { if (e.key === 'Enter') { const tr = e.target.closest('[data-i]'); if (tr) { isel = +tr.dataset.i; drawInc(); } } });

/* recording analysis ("تحليل تسجيل") with top upload fields & 4 ordered parts below */
let activeVideoUrl = null;
let lastAnalysisData = null;

const formatDisplayTime = (timeS, startTimeStr) => {
  if (startTimeStr && /^\d{2}:\d{2}(:\d{2})?$/.test(startTimeStr.trim())) {
    const parts = startTimeStr.trim().split(':').map(Number);
    const baseSec = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    const total = Math.max(0, Math.round(baseSec + timeS));
    const hh = String(Math.floor(total / 3600) % 24).padStart(2, '0');
    const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const ss = String(total % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
  return L === 'ar' ? `الثانية ${timeS}` : `${timeS} s`;
};

const ensureUploadControlsAndSections = () => {
  const secUp = $('#v-upload');
  const dropZone = secUp?.querySelector('.drop');
  const stateBox = $('#upState');
  if (!secUp || !dropZone || !stateBox) return null;

  if (!$('#upMetaInputs')) {
    const metaBox = document.createElement('div');
    metaBox.id = 'upMetaInputs';
    metaBox.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:14px;background:#141419;border:1px solid #282832;border-radius:12px;padding:12px';
    metaBox.innerHTML = `
      <div>
        <label id="lblUpCam" for="upCamSel" style="display:block;font-size:12.5px;color:#cbd5e1;margin-bottom:5px"></label>
        <select id="upCamSel" style="width:100%;background:#0d0d11;color:#fff;border:1px solid #33333d;border-radius:8px;padding:8px 10px;font-family:inherit;font-size:13.5px">
          <option value=""></option>
          <option value="CAM-01">CAM-01 · ${t('camN0')}</option>
          <option value="CAM-02">CAM-02 · ${t('camN1')}</option>
          <option value="CAM-03">CAM-03 · ${t('camN2')}</option>
          <option value="CAM-04">CAM-04 · ${t('camN3')}</option>
        </select>
      </div>
      <div>
        <label id="lblUpStart" for="upStartTime" style="display:block;font-size:12.5px;color:#cbd5e1;margin-bottom:5px"></label>
        <input id="upStartTime" type="time" step="1" style="width:100%;background:#0d0d11;color:#fff;border:1px solid #33333d;border-radius:8px;padding:8px 10px;font-family:inherit;font-size:13.5px">
      </div>
    `;
    dropZone.parentElement.insertBefore(metaBox, dropZone);
  }

  $('#lblUpCam').textContent = t('upCamLbl');
  const camSel = $('#upCamSel');
  if (camSel && camSel.options[0]) camSel.options[0].textContent = t('upCamOptNone');
  $('#lblUpStart').textContent = t('upStartLbl');

  let outWrap = $('#upFourPartsWrap');
  if (!outWrap) {
    outWrap = document.createElement('div');
    outWrap.id = 'upFourPartsWrap';
    outWrap.style.cssText = 'margin-top:16px;display:none';
    stateBox.parentElement.insertBefore(outWrap, stateBox.nextSibling);
  }
  return outWrap;
};

const renderFourPartsResult = (data) => {
  const wrap = ensureUploadControlsAndSections();
  if (!wrap) return;
  wrap.style.display = 'block';

  const outcome = data.outcome || 'confirmed';
  const bannerCfg = outcome === 'confirmed'
    ? { icon: '🔴', label: t('resConfirmed'), bg: 'rgba(239,68,68,0.16)', border: '#ef4444', boxCol: '#ef4444' }
    : outcome === 'possible'
      ? { icon: '🟠', label: t('resPossible'), bg: 'rgba(249,115,22,0.16)', border: '#f97316', boxCol: '#f97316' }
      : { icon: '🟢', label: t('resNone'), bg: 'rgba(34,197,94,0.16)', border: '#22c55e', boxCol: '#38bdf8' };

  const involvedCount = Math.max(1, Math.min(2, Number(data.vehicles) || 2));
  const boxes = [
    { id: 'V1', x: 24, y: 46, w: 18, h: 22, color: outcome === 'none' ? '#38bdf8' : bannerCfg.boxCol },
    { id: 'V2', x: 48, y: 44, w: 19, h: 24, color: involvedCount >= 2 && outcome !== 'none' ? bannerCfg.boxCol : '#38bdf8' }
  ];

  const timeDisplay = formatDisplayTime(data.time_s, data.startTime);

  wrap.innerHTML = `
    <!-- 1. شريط النتيجة (فوق، كبير) -->
    <div style="background:${bannerCfg.bg};border:1.5px solid ${bannerCfg.border};border-radius:14px;padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div style="font-size:21px;font-weight:800;color:#fff">${bannerCfg.icon} ${bannerCfg.label}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button type="button" id="upDeleteBtn" class="btn ghost" style="border:1px solid #3f3f46;padding:7px 12px;font-size:13px">${t('upDeleteVid')}</button>
      </div>
    </div>

    <!-- 2. الفيديو بعد التحليل -->
    <div style="background:#141419;border:1px solid #282832;border-radius:14px;padding:14px;margin-bottom:16px">
      <div style="position:relative;border-radius:10px;overflow:hidden;background:#09090c;border:1px solid #262630;max-height:360px">
        <video id="upAnalyzedVideo" src="${data.videoUrl}" controls autoplay muted loop playsinline style="width:100%;max-height:360px;object-fit:contain;display:block"></video>
        <div style="position:absolute;inset:0;pointer-events:none">
          ${boxes.map(b => `<div style="position:absolute;left:${b.x}%;top:${b.y}%;width:${b.w}%;height:${b.h}%;border:2.5px solid ${b.color};border-radius:6px;background:rgba(0,0,0,0.12)">
            <span style="position:absolute;top:-20px;inset-inline-start:0;background:${b.color};color:#000;font-weight:700;font-size:11px;padding:1px 6px;border-radius:4px">${b.id}</span>
          </div>`).join('')}
        </div>
      </div>
      <div style="margin-top:10px;font-weight:700;font-size:15px;color:#fca5a5;font-family:monospace">ACCIDENT at ${data.time_s} s</div>
    </div>

    <!-- 3. بطاقة الحادث -->
    <div style="background:#141419;border:1px solid #282832;border-radius:14px;padding:16px;margin-bottom:16px">
      <h3 style="font-size:17px;margin:0 0 12px">${t('upSummaryTitle')}</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;font-size:14px;line-height:1.65">
        <div><span class="note">${t('upTimeLbl')}:</span> <strong>${timeDisplay}</strong></div>
        <div><span class="note">${t('upTypeLbl')}:</span> <strong>${data.crash_type}</strong></div>
        <div><span class="note">${t('upSevLbl')}:</span> <strong>${data.severity}</strong></div>
        <div><span class="note">${t('upEvidLbl')}:</span> ${data.evidence.map(ev => `<span class="chip" style="background:#252530;color:#f8fafc;margin-inline-end:4px">${ev}</span>`).join('')}</div>
        <div><span class="note">${t('upCarsLbl')}:</span> <strong>${data.vehicles}</strong></div>
        <div><span class="note">${t('upUnitsLbl')}:</span> <strong>${data.units}</strong></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:14px;padding-top:14px;border-top:1px solid #262630;align-items:start">
        <div>
          <span class="note" style="display:block;margin-bottom:6px">${t('upCrashImgLbl')}:</span>
          <img src="${data.crash_image}" alt="${t('shotAlt')}" style="width:100%;max-height:170px;object-fit:cover;border-radius:10px;border:1px solid #2c2c38">
        </div>
        <div>
          <span class="note" style="display:block;margin-bottom:6px">${t('upVlmLbl')}:</span>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#e2e8f0">${data.vlm_reason}</p>
        </div>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <button type="button" id="upPlayClipBtn" class="btn light">${t('upPlayClip')} (${data.clip_start_s}s – ${data.clip_end_s}s)</button>
        <button type="button" id="upOpenIncBtn" class="btn">${t('upOpenInc')}</button>
      </div>
    </div>

    <!-- 4. مخطط الحادث (الكروكا) -->
    <div style="background:#141419;border:1px solid #282832;border-radius:14px;padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <h3 style="font-size:17px;margin:0">${t('sketchTitle')}</h3>
        <button type="button" id="upKrokiDlBtn" class="btn light" style="padding:6px 12px;font-size:13px">⬇ ${t('sketchDownload')}</button>
      </div>
      <canvas id="upKrokiCanvas" width="640" height="270" style="width:100%;max-height:270px;border-radius:10px;border:1px solid #262630;display:block"></canvas>
    </div>
  `;

  renderKrokiFromData($('#upKrokiCanvas'), data.kroki, data.crash_type);

  $('#upPlayClipBtn')?.addEventListener('click', () => {
    const vid = $('#upAnalyzedVideo');
    if (!vid) return;
    vid.currentTime = Math.max(0, Number(data.clip_start_s) || 0);
    vid.play().catch(() => {});
    const stopAt = Number(data.clip_end_s) || 0;
    if (stopAt > data.clip_start_s) {
      const onTime = () => {
        if (vid.currentTime >= stopAt) {
          vid.pause();
          vid.removeEventListener('timeupdate', onTime);
        }
      };
      vid.addEventListener('timeupdate', onTime);
    }
  });

  $('#upOpenIncBtn')?.addEventListener('click', () => {
    INCS.unshift({
      t: timeDisplay,
      ty: 1,
      pl: 0,
      sv: 3,
      st: 'stNew',
      kroki: data.kroki
    });
    isel = 0;
    location.hash = 'incidents';
    setTab('incidents');
  });

  $('#upKrokiDlBtn')?.addEventListener('click', () => {
    const cvs = $('#upKrokiCanvas');
    if (!cvs) return;
    const a = document.createElement('a');
    a.download = `kroki-${Date.now()}.png`;
    a.href = cvs.toDataURL('image/png');
    a.click();
    toast(t('sketchSaved'));
  });

  $('#upDeleteBtn')?.addEventListener('click', () => {
    clearRecordingAnalysis(true);
  });
};

const clearRecordingAnalysis = (notify = true) => {
  const wrap = $('#upFourPartsWrap');
  const vid = $('#upAnalyzedVideo');
  if (vid) {
    try { vid.pause(); vid.removeAttribute('src'); vid.load(); } catch (e) {}
  }
  if (activeVideoUrl) {
    try { URL.revokeObjectURL(activeVideoUrl); } catch (e) {}
    activeVideoUrl = null;
  }
  if (wrap) {
    wrap.innerHTML = '';
    wrap.style.display = 'none';
  }
  if ($('#upState')) $('#upState').innerHTML = '';
  if ($('#file')) $('#file').value = '';
  lastAnalysisData = null;
  if (notify) toast(t('upVidDeleted'));
};

const runUpload = f => {
  const box = $('#upState');
  if (!box) return;
  clearRecordingAnalysis(false);
  ensureUploadControlsAndSections();

  const camVal = $('#upCamSel')?.value || '';
  const startVal = $('#upStartTime')?.value || '';
  activeVideoUrl = URL.createObjectURL(f);

  box.innerHTML = `<strong>${f.name}</strong><div class="note" style="margin:6px 0 10px">${t('upStatusLbl')}: ${t('upWait')}</div>`;

  setTimeout(() => {
    if (!$('#upState')) return;
    box.innerHTML = `<strong>${f.name}</strong><div class="note" style="margin:6px 0 10px">${t('upStatusLbl')}: ${t('upRun')}</div><div class="prog"><i id="pg"></i></div>`;
    let p = 0;
    const h = setInterval(() => {
      p += 12;
      if ($('#pg')) $('#pg').style.width = Math.min(p, 100) + '%';
      if (p >= 100) {
        clearInterval(h);
        playAlertBySeverity(3);
        box.innerHTML = `<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="note">${t('upStatusLbl')}:</span><span class="chip sev3">${t('upDone')}</span><strong>${f.name}</strong>${camVal ? `<span class="note">· ${camVal}</span>` : ''}</div>`;

        lastAnalysisData = {
          videoUrl: activeVideoUrl,
          outcome: 'confirmed',
          time_s: 2.5,
          startTime: startVal,
          crash_type: T[L].types[1],
          severity: t('sev3'),
          evidence: ['ضرر', 'قطع على الأرض', 'دخان'],
          vehicles: 2,
          units: `2 ${t('amb')} · ${t('fire')} · ${t('police')}`,
          crash_image: 'assets/img/crash_frame.jpg',
          vlm_reason: 'Vehicle 1 hits the rear of vehicle 2 at speed causing sudden deceleration and visible impact.',
          clip_start_s: 1.0,
          clip_end_s: 5.0,
          kroki: getKrokiByIncidentType(1)
        };

        renderFourPartsResult(lastAnalysisData);
      }
    }, 90);
  }, 350);
};

$('#file')?.addEventListener('change', e => { if (e.target.files[0]) runUpload(e.target.files[0]); });
const drop = $('.drop');
if (drop) {
  drop.addEventListener('dragover', e => e.preventDefault());
  drop.addEventListener('drop', e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) runUpload(f); });
}

/* cameras + clock */
let cam = 0;
const CAMS = [{ id: 'CAM-01', on: 1 }, { id: 'CAM-02', on: 1 }, { id: 'CAM-03', on: 1 }, { id: 'CAM-04', on: 0 }];
const drawCams = () => {
  if (!$('#cams')) return;
  $('#cams').innerHTML = CAMS.map((c, k) => `<button type="button" class="cam" data-cam="${k}" aria-pressed="${k === cam}"><span class="dot ${c.on ? '' : 'off'} ${k === 0 ? 'blink' : ''}"></span><span>${c.id}<small>${t('camN' + k)} · ${c.on ? (k === 0 ? t('camAlert') : t('camOk')) : t('camOff')}</small></span></button>`).join('');
};
$('#cams')?.addEventListener('click', e => {
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
  if ($('#clock')) $('#clock').textContent = d.toISOString().slice(0, 10) + ' · ' + d.toTimeString().slice(0, 8);
  if ($('#supportModal') && !$('#supportModal').classList.contains('hidden')) {
    refreshSupportModal();
  }
}, 1000);

/* responder-only route view when opened via ?unit=1#map */
const urlParams = new URLSearchParams(location.search);
const isUnitRouteMode = urlParams.get('unit') === '1';

const applyUnitRestrictedView = () => {
  if (!isUnitRouteMode) return;
  $$('[data-tab]').forEach(b => {
    if (b.dataset.tab !== 'map') b.style.display = 'none';
  });
  $('#toolsDropdownWrap')?.style.setProperty('display', 'none');
  $('#logout')?.style.setProperty('display', 'none');
  $('#soundBtn')?.style.setProperty('display', 'none');
  $$('[data-lang]').forEach(b => { b.style.display = 'none'; });

  if (!$('#unitModeBanner') && $('#v-map')) {
    const banner = document.createElement('div');
    banner.id = 'unitModeBanner';
    banner.style.cssText = 'background:#16161b;border:1px solid #2e2e38;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:13.5px;color:#e4e4e7';
    banner.textContent = t('unitRouteBadge');
    $('#v-map').prepend(banner);
  }
};

/* staff login */
let role = null;
try { role = sessionStorage.getItem('rg-role'); } catch (e) {}

const openLogin = () => {
  $('#login')?.classList.remove('hidden');
  setTimeout(() => $('#loginForm input')?.focus(), 50);
};
$$('[data-login="staff"]').forEach(b => b.addEventListener('click', openLogin));
$('#closeLogin')?.addEventListener('click', () => $('#login')?.classList.add('hidden'));
$('#login')?.addEventListener('click', e => { if (e.target.id === 'login') $('#login').classList.add('hidden'); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    $('#login')?.classList.add('hidden');
    setModalVisible($('#dispatchModal'), false);
    setModalVisible($('#supportModal'), false);
    setModalVisible($('#sketchModal'), false);
    const mp = $('#toolsMenuPanel');
    if (mp) mp.style.display = 'none';
  }
});

$('#loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const empVal = e.target.emp?.value?.trim() || '';
  const pwVal = e.target.pw?.value || '';

  if (!empVal || !pwVal) return;
  role = 'staff';
  try {
    sessionStorage.setItem('rg-role', role);
    sessionStorage.setItem('rg-emp', empVal);
  } catch (x) {}
  $('#login')?.classList.add('hidden');
  e.target.reset();
  location.hash = 'live';
  route();
});

$('#logout')?.addEventListener('click', () => {
  role = null;
  try {
    sessionStorage.removeItem('rg-role');
    sessionStorage.removeItem('rg-emp');
    sessionStorage.removeItem('rg-token');
  } catch (x) {}
  location.hash = 'start';
  route();
});

/* navigation & language */
const tabs = $$('[data-tab]'), secs = $$('main > section');
let lastAlertTab = null;
const setTab = name => {
  if (isUnitRouteMode) name = 'map';
  tabs.forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === name));
  secs.forEach(s => s.classList.toggle('hidden', s.id !== 'v-' + name));
  const mp = $('#toolsMenuPanel');
  if (mp) mp.style.display = 'none';
  updateHeaderButtons();

  if (name === 'upload' && !isUnitRouteMode) {
    ensureUploadControlsAndSections();
    if (lastAnalysisData) renderFourPartsResult(lastAnalysisData);
  }
  if (name === 'map') {
    if (isUnitRouteMode) {
      const qSt = +urlParams.get('st');
      const qR = +urlParams.get('r');
      const qRisk = +urlParams.get('risk');
      const qCars = +urlParams.get('cars');
      if (!Number.isNaN(qRisk) && qRisk > 0) currentCrash.risk = qRisk;
      if (!Number.isNaN(qCars) && qCars > 0) currentCrash.cars = qCars;
      if (!Number.isNaN(qSt) && ST[qSt]) {
        st = qSt;
        R = routesFor(ST[st]);
      }
      if (!Number.isNaN(qR) && R[qR]) {
        sel = qR;
      }
    }
    initMap();
    drawMap();
    drawSide();
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
        if (isUnitRouteMode) {
          map.fitBounds(LF.latLngBounds([ST[st].ll, INC_LL]).pad(.35));
          animateRouteCar();
        }
      }, 60);
    }
    applyUnitRestrictedView();
  }
  if (name === 'incidents' && !isUnitRouteMode) drawInc();
  if (name === 'live' && !isUnitRouteMode) {
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
tabs.forEach(b => b.addEventListener('click', () => {
  if (isUnitRouteMode) return;
  location.hash = b.dataset.tab;
  setTab(b.dataset.tab);
}));
document.addEventListener('click', e => {
  const go = e.target.closest('[data-go]');
  if (go) {
    if (isUnitRouteMode) return;
    location.hash = go.dataset.go;
    setTab(go.dataset.go);
  }
});

const applyLang = () => {
  document.documentElement.lang = L;
  document.documentElement.dir = L === 'ar' ? 'rtl' : 'ltr';
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  $$('[data-lang]').forEach(b => { b.textContent = L === 'ar' ? 'EN' : 'AR'; });
  if ($('#roleBadge')) $('#roleBadge').textContent = t('roleStaff');
  ensureHeaderActions();
  ensureUploadControlsAndSections();
  if (lastAnalysisData) {
    lastAnalysisData.crash_type = T[L].types[1];
    lastAnalysisData.severity = t('sev3');
    lastAnalysisData.units = `2 ${t('amb')} · ${t('fire')} · ${t('police')}`;
    renderFourPartsResult(lastAnalysisData);
  }
  updateHeaderButtons();
  refreshSupportModal();
  drawCams(); syncPlanFromRisk(); drawUnits(); drawQuickAdvice(); drawInc(); drawSide(); drawMap();
  applyUnitRestrictedView();
};
$$('[data-lang]').forEach(b => b.addEventListener('click', () => {
  L = L === 'ar' ? 'en' : 'ar';
  try { localStorage.setItem('rg-lang', L); } catch (e) {}
  applyLang();
}));

const route = () => {
  if (isUnitRouteMode) {
    $('#start')?.classList.add('hidden');
    $('#app')?.classList.remove('hidden');
    ensureFooterSupport();
    setTab('map');
    return;سس
  }

  const h = (location.hash || '#start').replace('#', '');
  if (['live', 'map', 'incidents', 'upload'].includes(h)) {
    if (!role) {
      $('#start')?.classList.remove('hidden');
      $('#app')?.classList.add('hidden');
      openLogin();
      return;
    }
    $('#start')?.classList.add('hidden');
    $('#app')?.classList.remove('hidden');
    ensureHeaderActions();
    setTab(h);
  } else {
    $('#app')?.classList.add('hidden');
    $('#start')?.classList.remove('hidden');
    show(0);
  }
};
addEventListener('hashchange', route);
applyLang();
route();
}