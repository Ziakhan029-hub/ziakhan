/* Shared lesson data + card renderer for أكاديمية موسى — sourced from moosa.tv/ar */
(function(){
  const GLYPH = {
    trapezoid:    '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M16 56h48L52 24H28L16 56z"/><path d="M28 24 16 56M52 24l12 32" opacity=".45"/></svg>',
    rhombus:      '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 16 62 40 40 64 18 40z"/><path d="M18 40h44M40 16v48" opacity=".4"/></svg>',
    square:       '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="20" y="20" width="40" height="40" rx="2"/><path d="M20 20 60 60M60 20 20 60" opacity=".4"/></svg>',
    rect:         '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="14" y="26" width="52" height="28" rx="2"/><path d="M14 26 66 54" opacity=".4"/></svg>',
    parallelogram:'<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M26 54 38 26h28L54 54z"/><path d="M26 54 54 26" opacity=".4"/></svg>',
    polygon:      '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 14 64 32 55 60H25L16 32z"/></svg>',
    triangle:     '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 18 64 60H16z"/><path d="M40 18v42" opacity=".4"/></svg>',
    sigma:        '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M58 20H24l18 20-18 20h34"/></svg>',
    curve:        '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 60h52M14 60V18" opacity=".45"/><path d="M16 56C30 56 30 22 64 22"/></svg>',
    induction:    '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="22" cy="40" r="6"/><circle cx="40" cy="40" r="6"/><circle cx="58" cy="40" r="6"/><path d="M28 40h6M46 40h6" opacity=".5"/></svg>',
    gear:         '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><circle cx="40" cy="40" r="10"/><path d="M40 18v8M40 54v8M18 40h8M54 40h8M24.7 24.7l5.6 5.6M49.7 49.7l5.6 5.6M24.7 55.3l5.6-5.6M49.7 30.3l5.6-5.6" opacity=".7"/></svg>',
    circuit:      '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 40h10M54 40h10M26 40v-14h28v14"/><rect x="26" y="40" width="28" height="14" rx="2"/><circle cx="33" cy="47" r="2" fill="currentColor" stroke="none" opacity=".6"/><circle cx="40" cy="47" r="2" fill="currentColor" stroke="none" opacity=".6"/><circle cx="47" cy="47" r="2" fill="currentColor" stroke="none" opacity=".6"/></svg>',
    building:     '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M18 62V26l22-8v44"/><path d="M40 62V38l22-6v30"/><path d="M14 62h52" opacity=".6"/><rect x="24" y="34" width="6" height="6" rx="1" opacity=".5"/><rect x="35" y="34" width="6" height="6" rx="1" opacity=".5"/><rect x="24" y="46" width="6" height="6" rx="1" opacity=".5"/><rect x="35" y="46" width="6" height="6" rx="1" opacity=".5"/></svg>',
    database:     '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="40" cy="24" rx="20" ry="7"/><path d="M20 24v12c0 3.87 8.95 7 20 7s20-3.13 20-7V24"/><path d="M20 36v12c0 3.87 8.95 7 20 7s20-3.13 20-7V36" opacity=".6"/></svg>',
    plane:        '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 42l8-4 32-18 4 4-22 20 2 14-8-2-4-10-10-2-2-2z"/><path d="M54 20 36 40" opacity=".4"/></svg>',
    api:          '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="18" y="28" width="44" height="24" rx="4"/><path d="M28 40h24M28 34h10M28 46h16" opacity=".6"/></svg>',
    pmp:          '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 20h32a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z"/><path d="M30 36l6 6 14-12" opacity=".7"/></svg>',
    momentum:     '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="28" cy="40" r="10"/><path d="M38 40h18M50 33l6 7-6 7" opacity=".8"/></svg>',
  };

  const PAIRS = {
    math:    ['#6B7280','#374151'],
    geo:     ['#5B7CFA','#3B53C9'],
    phys:    ['#E0653C','#C2451E'],
    pro:     ['#8B5CF6','#6938C9'],
    tahsili: ['#E0A24C','#C07F22'],
  };
  const SUBJ = {
    math:'الرياضيات', geo:'الهندسة', phys:'الفيزياء', pro:'احترافية', tahsili:'التحصيلي'
  };
  const GRADE_COL = {
    'أول ثانوي 2026':      '#0EA88C',
    'ثالث ثانوي':          '#E0653C',
    'ثاني ثانوي':          '#5B7CFA',
    'أول ثانوي':           '#8B5CF6',
    'المرحلة الثانوية':    '#E0A24C',
    'ثالث متوسط':          '#10B981',
    'الدورات الاحترافية':  '#8B5CF6',
    'هندسة احترافية':      '#5B7CFA',
  };
  const GRADE_PAIRS = {
    'أول ثانوي 2026':      ['#0EA88C','#065E52'],
    'ثالث ثانوي':          ['#E0653C','#8B2500'],
    'ثاني ثانوي':          ['#5B7CFA','#2235A0'],
    'أول ثانوي':           ['#8B5CF6','#4A1A8C'],
    'المرحلة الثانوية':    ['#E0A24C','#8C5A00'],
    'ثالث متوسط':          ['#10B981','#065E3C'],
    'الدورات الاحترافية':  ['#8B5CF6','#4A1A8C'],
    'هندسة احترافية':      ['#5B7CFA','#2235A0'],
  };
  window.GRADE_COL = GRADE_COL;

  window.LESSONS = [
    /* ── أول ثانوي 2026 · الفصل الثاني · الأشكال الهندسية ── */
    {t:'القطعة المتوسطة لشبه المنحرف',           g:'trapezoid',     s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٤:٢٠'},
    {t:'شبه المنحرف متطابق الساقين',              g:'trapezoid',     s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١١:٥٢'},
    {t:'الشروط الكافية للمعيّن',                  g:'rhombus',       s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'٠٩:٤٥', href:'lesson-shurut-muayyan.html'},
    {t:'المربع: حالة خاصة من المستطيل والمعيّن',  g:'square',        s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٣:١٠'},
    {t:'المعيّن: حالة خاصة من متوازي الأضلاع',   g:'rhombus',       s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٢:٣٨'},
    {t:'خصائص المستطيل',                          g:'rect',          s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٠:٢٢'},
    {t:'شروط متوازي الأضلاع',                     g:'parallelogram', s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٥:٠٧'},
    {t:'قطرا متوازي الأضلاع',                     g:'parallelogram', s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'٠٨:٤٩'},
    {t:'خصائص متوازي الأضلاع',                    g:'parallelogram', s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٢:٠١'},
    {t:'مجموع قياسات الزوايا الخارجية للمضلّع',   g:'polygon',       s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'٠٩:٣٣'},
    {t:'ما هو المضلّع ومجموع زواياه الداخلية',    g:'polygon',       s:'geo',    lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٤:٥٥'},

    /* ── ثاني ثانوي · الفصل الثاني · رياضيات ── */
    {t:'البرهان باستعمال مبدأ الاستقراء الرياضيّ', g:'induction',    s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٦:٤٠'},
    {t:'نظرية ذات الحدّين',                        g:'sigma',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٣:٢٧'},
    {t:'المتسلسلات الهندسية اللانهائية',           g:'sigma',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٥:٠٩'},
    {t:'المتتابعات والمتسلسلات الهندسية',          g:'sigma',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٧:٣٣'},
    {t:'المتتابعات والمتسلسلات الحسابية',          g:'sigma',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٤:٠٢'},
    {t:'المتتابعات بوصفها دوالّ',                  g:'curve',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٥ أيام', dur:'١٢:٥٨'},
    {t:'حل المعادلات والمتباينات النسبية',         g:'curve',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٩:١٥'},
    {t:'دوال التغيَّر',                            g:'curve',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١١:٤٠'},
    {t:'تمثيل الدوالّ النسبية بيانيًّا',           g:'curve',         s:'math',   lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٥ أيام', dur:'١٦:٢٢'},

    /* ── ثالث ثانوي · رياضيات وهندسة ── */
    {t:'التفاضل: تعريف المشتقة والقواعد الأساسية',  g:'curve',        s:'math',   lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ يوم',    dur:'٢١:٠٤'},
    {t:'تطبيقات المشتقة: القيم العظمى والصغرى',     g:'curve',        s:'math',   lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ يومين',  dur:'١٨:٣٣'},
    {t:'مشتقات الدوال المثلثية',                    g:'curve',        s:'math',   lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ ٣ أيام', dur:'١٦:٥٩'},
    {t:'التكامل غير المحدود: التعريف والقواعد',     g:'sigma',        s:'math',   lvl:'ثالث ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٤:٤٧'},
    {t:'التكامل المحدود ونظرية الحساب الأساسية',    g:'sigma',        s:'math',   lvl:'ثالث ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'٢٠:١٢'},
    {t:'المثلث: نظرية جيب التمام',                 g:'triangle',     s:'geo',    lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ ٥ أيام', dur:'١٢:٣٠'},

    /* ── اختبار التحصيلي ── */
    {t:'قواعد المثلثات في اختبار التحصيلي',         g:'triangle',     s:'tahsili', lvl:'المرحلة الثانوية', term:'تجميعات وتمارين', ago:'منذ ٣ أيام', dur:'١٨:٣٠'},
    {t:'الأشكال الرباعية في اختبار التحصيلي',       g:'square',       s:'tahsili', lvl:'المرحلة الثانوية', term:'تجميعات وتمارين', ago:'منذ ٣ أيام', dur:'٢٠:١٢'},

    /* ── هندسة احترافية — مفاهيم أساسية ── */
    {t:'ما هو الزخم (Momentum)؟',                   g:'momentum',     s:'pro',    lvl:'هندسة احترافية', term:'هندسة ميكانيكية', ago:'منذ ٤ أيام', dur:'٠٨:٢٠'},
    {t:'ما هو العزم (Torque) في الحركة الدورانية؟', g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'هندسة ميكانيكية', ago:'منذ ٣ أيام', dur:'١٠:١٥'},
    {t:'أساسيات الستاتيكا والمفاهيم المفقودة',      g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'هندسة ميكانيكية', ago:'منذ ٤ أيام', dur:'١٢:٤٠'},
    {t:'ما هي قواعد البيانات العلائقية SQL؟',        g:'database',     s:'pro',    lvl:'هندسة احترافية', term:'هندسة كمبيوتر',  ago:'منذ ٣ أيام', dur:'٠٩:٥٠'},
    {t:'ما هو الـ API ولماذا يتكرر في عالم البزنس؟', g:'api',         s:'pro',    lvl:'هندسة احترافية', term:'هندسة كمبيوتر',  ago:'منذ ٥ أيام', dur:'٠٧:٣٥'},
    {t:'ما هي هندسة الطيران؟',                      g:'plane',        s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٥ أيام', dur:'٠٦:١٨'},
    {t:'ما هي الهندسة الطبية؟',                     g:'pmp',          s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ أسبوع',  dur:'٠٥:٤٥'},
    {t:'ما هي الهندسة المدنية؟',                    g:'building',     s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٣ أيام', dur:'٠٦:٣٠'},
    {t:'ما هي هندسة البترول؟',                      g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ أسبوعين', dur:'٠٧:٠٠'},
    {t:'ما هي هندسة الكمبيوتر؟',                   g:'circuit',      s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٥ أيام', dur:'٠٦:٥٥'},
    {t:'ما هي الهندسة الكيميائية؟',                 g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٥ أيام', dur:'٠٥:٢٠'},
    {t:'ما هي الهندسة الصناعية؟',                   g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ أسبوعين', dur:'٠٦:١٠'},
    {t:'ما هي الهندسة الميكانيكية؟',                g:'gear',         s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٥ أيام', dur:'٠٧:٢٥'},
    {t:'ما هي الهندسة الكهربائية؟',                 g:'circuit',      s:'pro',    lvl:'هندسة احترافية', term:'تعرّف على التخصصات', ago:'منذ ٥ أيام', dur:'٠٦:٤٥'},

    /* ── دورة إدارة المشاريع PMP ── */
    {t:'لماذا نحتاج شهادة وتخصص في إدارة المشاريع؟', g:'pmp',        s:'pro',    lvl:'الدورات الاحترافية', term:'مبادئ إدارة المشاريع', ago:'منذ ٣ أيام', dur:'١٢:٠٠'},
    {t:'إدارة التكامل — Integration Management',       g:'pmp',        s:'pro',    lvl:'الدورات الاحترافية', term:'مبادئ إدارة المشاريع', ago:'منذ ٤ أيام', dur:'١٥:٣٠'},
    {t:'إدارة أصحاب المصلحة — Stakeholder Management', g:'pmp',        s:'pro',    lvl:'الدورات الاحترافية', term:'مبادئ إدارة المشاريع', ago:'منذ ٤ أيام', dur:'١٤:٢٠'},
    {t:'إدارة الاتصالات — Communications Management',  g:'pmp',        s:'pro',    lvl:'الدورات الاحترافية', term:'مبادئ إدارة المشاريع', ago:'منذ أسبوع',  dur:'١٣:٤٥'},
    {t:'إدارة الموارد — Resource Management',          g:'pmp',        s:'pro',    lvl:'الدورات الاحترافية', term:'مبادئ إدارة المشاريع', ago:'منذ ٤ أيام', dur:'١٦:١٠'},
  ];

  window.lessonCard = function(L){
    const pair       = PAIRS[L.s] || PAIRS.math;
    const gcol       = GRADE_COL[L.lvl] || pair[0];
    const gp         = GRADE_PAIRS[L.lvl];
    const tc1        = gp ? gp[0] : pair[0];
    const tc2        = gp ? gp[1] : pair[1];
    const gradeUrl   = 'category.html?grade=' + encodeURIComponent(L.lvl);
    const subjectUrl = 'category.html?subject=' + L.s;
    const stopNav    = "event.stopPropagation();event.preventDefault();";
    return `<a class="lesson" href="${L.href || 'lesson.html'}" style="--ccol:var(--${L.s}); --tc1:${tc1}; --tc2:${tc2}; --gcol:${gcol}">
      <div class="thumb">
        <div class="paper"></div>
        <div class="glyph">${GLYPH[L.g] || GLYPH.triangle}</div>
        <span class="badge" onclick="${stopNav}location.href='${subjectUrl}'" style="cursor:pointer" title="عرض كل دروس ${SUBJ[L.s]||''}">${SUBJ[L.s] || ''}</span>
        <div class="lvl">${L.dur}</div>
        <div class="play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="body">
        <div class="tag">
          <span class="dot"></span>
          <span onclick="${stopNav}location.href='${gradeUrl}'" style="cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px" title="عرض كل دروس ${L.lvl}">${L.lvl}</span>
           · ${L.term}
        </div>
        <h3>${L.t}</h3>
        <div class="meta">
          <span class="m"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${L.ago}</span>
          <span class="m"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3v18l7-5 7 5V3z"/></svg>مجاني</span>
        </div>
      </div>
    </a>`;
  };
})();
