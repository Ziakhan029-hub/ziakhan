/* Shared lesson data + card renderer for أكاديمية موسى */
(function(){
  // geometric glyphs (line art) keyed by shape
  const GLYPH = {
    trapezoid: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M16 56h48L52 24H28L16 56z"/><path d="M28 24 16 56M52 24l12 32" opacity=".45"/></svg>',
    rhombus: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 16 62 40 40 64 18 40z"/><path d="M18 40h44M40 16v48" opacity=".4"/></svg>',
    square: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="20" y="20" width="40" height="40" rx="2"/><path d="M20 20 60 60M60 20 20 60" opacity=".4"/></svg>',
    rect: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="14" y="26" width="52" height="28" rx="2"/><path d="M14 26 66 54" opacity=".4"/></svg>',
    parallelogram: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M26 54 38 26h28L54 54z"/><path d="M26 54 54 26" opacity=".4"/></svg>',
    polygon: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 14 64 32 55 60H25L16 32z"/></svg>',
    triangle: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M40 18 64 60H16z"/><path d="M40 18v42" opacity=".4"/></svg>',
    sigma: '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M58 20H24l18 20-18 20h34"/></svg>',
    curve: '<svg width="74" height="74" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 60h52M14 60V18" opacity=".45"/><path d="M16 56C30 56 30 22 64 22"/></svg>',
    induction: '<svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="22" cy="40" r="6"/><circle cx="40" cy="40" r="6"/><circle cx="58" cy="40" r="6"/><path d="M28 40h6M46 40h6" opacity=".5"/></svg>',
  };
  const PAIRS = {
    math:   ['#10B59F','#0B7E70'],
    geo:    ['#5B7CFA','#3B53C9'],
    phys:   ['#E0653C','#C2451E'],
    pro:    ['#8B5CF6','#6938C9'],
    tahsili:['#E0A24C','#C07F22'],
  };
  const SUBJ = {
    math:'الرياضيات', geo:'الهندسة', phys:'الفيزياء', pro:'احترافية', tahsili:'التحصيلي'
  };
  const GRADE_COL = {
    'أول ثانوي 2026': '#0EA88C',
    'ثالث ثانوي':     '#E0653C',
    'ثاني ثانوي':     '#5B7CFA',
    'أول ثانوي':      '#8B5CF6',
    'المرحلة الثانوية': '#E0A24C',
    'ثالث متوسط':     '#10B981',
  };
  const GRADE_PAIRS = {
    'أول ثانوي 2026': ['#0EA88C','#065E52'],
    'ثالث ثانوي':     ['#E0653C','#8B2500'],
    'ثاني ثانوي':     ['#5B7CFA','#2235A0'],
    'أول ثانوي':      ['#8B5CF6','#4A1A8C'],
    'المرحلة الثانوية': ['#E0A24C','#8C5A00'],
    'ثالث متوسط':     ['#10B981','#065E3C'],
  };
  window.GRADE_COL = GRADE_COL;

  window.LESSONS = [
    {t:'القطعة المتوسطة لشبه المنحرف', g:'trapezoid', s:'math', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٤:٢٠'},
    {t:'شبه المنحرف متطابق الساقين', g:'trapezoid', s:'math', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١١:٥٢'},
    {t:'الشروط الكافية للمعيّن', g:'rhombus', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'٠٩:٤٥'},
    {t:'المربع: حالة خاصة من المستطيل والمعيّن', g:'square', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٣:١٠'},
    {t:'المعيّن: حالة خاصة من متوازي الأضلاع', g:'rhombus', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٢:٣٨'},
    {t:'خصائص المستطيل', g:'rect', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٠:٢٢'},
    {t:'شروط متوازي الأضلاع', g:'parallelogram', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٥:٠٧'},
    {t:'قطرا متوازي الأضلاع', g:'parallelogram', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'٠٨:٤٩'},
    {t:'خصائص متوازي الأضلاع', g:'parallelogram', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٢:٠١'},
    {t:'مجموع قياسات الزوايا الخارجية للمضلّع', g:'polygon', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'٠٩:٣٣'},
    {t:'ما هو المضلّع ومجموع زواياه الداخلية', g:'polygon', s:'geo', lvl:'أول ثانوي', term:'الفصل الثاني', ago:'منذ يومين', dur:'١٤:٥٥'},
    {t:'قواعد المثلثات في اختبار التحصيلي', g:'triangle', s:'tahsili', lvl:'المرحلة الثانوية', term:'تجميعات وتمارين', ago:'منذ ٣ أيام', dur:'١٨:٣٠'},
    {t:'الأشكال الرباعية في اختبار التحصيلي', g:'square', s:'tahsili', lvl:'المرحلة الثانوية', term:'تجميعات وتمارين', ago:'منذ ٣ أيام', dur:'٢٠:١٢'},
    {t:'البرهان باستعمال مبدأ الاستقراء الرياضيّ', g:'induction', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٦:٤٠'},
    {t:'نظرية ذات الحدّين', g:'sigma', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٣:٢٧'},
    {t:'المتسلسلات الهندسية اللانهائية', g:'sigma', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٥:٠٩'},
    {t:'المتتابعات والمتسلسلات الهندسية', g:'sigma', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٧:٣٣'},
    {t:'المتتابعات والمتسلسلات الحسابية', g:'sigma', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٤:٠٢'},
    {t:'المتتابعات بوصفها دوالّ', g:'curve', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٥ أيام', dur:'١٢:٥٨'},
    {t:'حل المعادلات والمتباينات النسبية', g:'curve', s:'math', lvl:'ثاني ثانوي', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٩:١٥'},
    // ثالث ثانوي
    {t:'التفاضل: تعريف المشتقة والقواعد الأساسية', g:'curve', s:'math', lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ يوم', dur:'٢١:٠٤'},
    {t:'تطبيقات المشتقة: القيم العظمى والصغرى', g:'curve', s:'math', lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ يومين', dur:'١٨:٣٣'},
    {t:'مشتقات الدوال المثلثية', g:'curve', s:'math', lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ ٣ أيام', dur:'١٦:٥٩'},
    {t:'التكامل غير المحدود: التعريف والقواعد', g:'sigma', s:'math', lvl:'ثالث ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١٤:٤٧'},
    {t:'التكامل المحدود ونظرية الحساب الأساسية', g:'sigma', s:'math', lvl:'ثالث ثانوي', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'٢٠:١٢'},
    {t:'المثلث: نظرية جيب التمام', g:'triangle', s:'geo', lvl:'ثالث ثانوي', term:'الفصل الأول', ago:'منذ ٥ أيام', dur:'١٢:٣٠'},
    // أول ثانوي 2026
    {t:'الأعداد الحقيقية والعمليات عليها', g:'sigma', s:'math', lvl:'أول ثانوي 2026', term:'الفصل الأول', ago:'منذ يوم', dur:'١٣:١٥'},
    {t:'المعادلات الخطية بمتغيرين', g:'curve', s:'math', lvl:'أول ثانوي 2026', term:'الفصل الأول', ago:'منذ يومين', dur:'١٧:٠٢'},
    {t:'الدوال وتمثيلها البياني', g:'curve', s:'math', lvl:'أول ثانوي 2026', term:'الفصل الأول', ago:'منذ ٣ أيام', dur:'١٥:٤٤'},
    {t:'المثلثات المتطابقة: الحالات الأربع', g:'triangle', s:'geo', lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٣ أيام', dur:'١٩:٢٨'},
    {t:'متوازي الأضلاع: خصائص وإثباتات', g:'parallelogram', s:'geo', lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٤ أيام', dur:'١١:٥٥'},
    {t:'الإحصاء: المتوسط والوسيط والمنوال', g:'induction', s:'math', lvl:'أول ثانوي 2026', term:'الفصل الثاني', ago:'منذ ٥ أيام', dur:'١٤:٣٦'},
  ];

  window.lessonCard = function(L){
    const pair = PAIRS[L.s] || PAIRS.math;
    const gcol = GRADE_COL[L.lvl] || pair[0];
    const gp = GRADE_PAIRS[L.lvl];
    const tc1 = gp ? gp[0] : pair[0];
    const tc2 = gp ? gp[1] : pair[1];
    return `<a class="lesson" href="lesson.html" style="--ccol:var(--${L.s}); --tc1:${tc1}; --tc2:${tc2}; --gcol:${gcol}">
      <div class="thumb">
        <div class="paper"></div>
        <div class="glyph">${GLYPH[L.g]||GLYPH.triangle}</div>
        <div class="badge">${SUBJ[L.s]||''}</div>
        <div class="lvl">${L.dur}</div>
        <div class="play"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="body">
        <div class="tag"><span class="dot"></span>${L.lvl} · ${L.term}</div>
        <h3>${L.t}</h3>
        <div class="meta">
          <span class="m"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${L.ago}</span>
          <span class="m"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3v18l7-5 7 5V3z"/></svg>مجاني</span>
        </div>
      </div>
    </a>`;
  };
})();
