/* Mobile navigation chrome for أكاديمية موسى.
   Injects: off-canvas drawer, search sheet, bottom tab bar.
   Handles open/close, ESC, overlay tap, active-tab detection. */
(function(){
  const body = document.body;
  const page = (location.pathname.split('/').pop() || 'index.html');
  const isHome = page === '' || page === 'index.html';
  const isCat  = page === 'category.html';

  const I = {
    close:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    search:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/></svg>',
    grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    book:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>',
    compass:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
    atom:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>',
    award:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>',
    crown:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l4 5 5-7 5 7 4-5v11H3z"/></svg>',
  };

  const soc = (label,d)=>`<a class="soc" href="#" aria-label="${label}"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">${d}</svg></a>`;
  const SOCIALS =
    soc('YouTube','<path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5C.5 9.4.5 12 .5 12s0 2.6.5 4.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.5.5-4.5s0-2.6-.5-4.5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/>')+
    soc('TikTok','<path d="M16.6 5.8a4.8 4.8 0 0 1-3-1.8 4.7 4.7 0 0 1-.9-2.7h-3.2v13.1a2.6 2.6 0 1 1-1.9-2.5V6.5a5.8 5.8 0 1 0 5.1 5.7V8.3a8 8 0 0 0 4 1.1V6.2c-.1 0-.1 0-.2-.4z"/>')+
    soc('Instagram','<path d="M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zM17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm3.4 15A3.4 3.4 0 0 1 17 20.4H7A3.4 3.4 0 0 1 3.6 17V7A3.4 3.4 0 0 1 7 3.6h10A3.4 3.4 0 0 1 20.4 7zm-2.9-9.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>')+
    soc('WhatsApp','<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.7.7-.9 1.6-.6 2.6.5 1.6 1.6 3 3.1 3.9 2.1 1.3 2.6 1 3.1.9.5 0 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>');

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="drawer-overlay" data-close></div>
    <aside class="drawer" role="dialog" aria-label="القائمة">
      <div class="drawer-head">
        <img src="assets/logo-white.png" alt="أكاديمية موسى">
        <button class="drawer-close" data-close aria-label="إغلاق">${I.close}</button>
      </div>
      <nav class="drawer-nav">
        <a href="category.html">${I.book}الرياضيات</a>
        <a href="category.html">${I.compass}الهندسة</a>
        <a href="category.html">${I.atom}الفيزياء</a>
        <a href="category.html">${I.award}الدورات الاحترافية</a>
        <a href="category.html">${I.target}اختبار التحصيلي</a>
        <a class="paid" href="index.html#courses">${I.crown}المحتوى المدفوع</a>
      </nav>
      <div class="drawer-cta">
        <button class="btn btn-primary btn-block">ابدأ مجاناً</button>
        <button class="btn btn-block" style="color:#fff;background:rgba(255,255,255,.08)">تسجيل الدخول</button>
      </div>
      <div class="drawer-foot">
        <div style="font-size:12px;color:#9FB6B6;margin-bottom:12px;font-weight:600">تابعنا</div>
        <div class="socials">${SOCIALS}</div>
      </div>
    </aside>

    <div class="search-sheet" role="dialog" aria-label="بحث">
      <div class="ss-row">
        <form class="searchbar" onsubmit="return false">
          ${I.search}
          <input type="text" placeholder="ابحث عن درس أو موضوع…" aria-label="بحث">
          <button class="btn btn-primary" type="submit">بحث</button>
        </form>
        <button class="ss-close" data-close aria-label="إغلاق">${I.close}</button>
      </div>
      <div class="ss-sugg">
        <a href="category.html">التكامل</a>
        <a href="category.html">شبه المنحرف</a>
        <a href="category.html">المتتابعات</a>
        <a href="category.html">اختبار التحصيلي</a>
        <a href="category.html">متوازي الأضلاع</a>
      </div>
    </div>

    <nav class="bottom-nav" aria-label="تنقّل سريع">
      <a class="bn-item${isHome?' active':''}" href="index.html">${I.home}<span>الرئيسية</span></a>
      <a class="bn-item${isCat?' active':''}" href="category.html">${I.grid}<span>المواد</span></a>
      <div class="bn-fab"><button data-search aria-label="بحث">${I.search}</button></div>
      <a class="bn-item" href="category.html">${I.target}<span>التحصيلي</span></a>
      <button class="bn-item" data-menu>${I.menu}<span>المزيد</span></button>
    </nav>`;
  body.appendChild(wrap);

  function closeAll(){ body.classList.remove('menu-open','search-open','no-scroll'); }
  function openMenu(){ closeAll(); body.classList.add('menu-open','no-scroll'); }
  function openSearch(){
    closeAll(); body.classList.add('search-open','no-scroll');
    const inp = document.querySelector('.search-sheet input');
    if(inp) setTimeout(()=>inp.focus(), 240);
  }

  document.addEventListener('click', function(e){
    if(e.target.closest('[data-menu]')){ e.preventDefault(); openMenu(); return; }
    if(e.target.closest('[data-search]')){ e.preventDefault(); openSearch(); return; }
    if(e.target.closest('[data-close]') || e.target.classList.contains('drawer-overlay')){ closeAll(); return; }
    if(e.target.closest('.drawer-nav a')){ closeAll(); }
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeAll(); });
  document.addEventListener('submit', e=>{ if(e.target.closest('.searchbar')) e.preventDefault(); });
})();
