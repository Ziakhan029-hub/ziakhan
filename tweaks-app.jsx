/* Tweaks panel for أكاديمية موسى homepage.
   Renders ONLY the panel; applies choices to <html> data-attrs / CSS vars
   so the static HTML content stays directly-editable. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#11B5A0",
  "hero": "بطل واسع",
  "showStats": true,
  "showTracks": true
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#11B5A0": "teal",
  "#2E72E6": "blue",
  "#6D5BF0": "indigo",
  "#D98E2B": "gold"
};
const HERO_MAP = {
  "بطل واسع": "centered",
  "موسّط": "minimal",
  "مضغوط": "compact"
};

function TweaksApp(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(()=>{
    const html = document.documentElement;
    html.setAttribute('data-accent', ACCENT_MAP[t.accent] || 'teal');
    html.setAttribute('data-hero', HERO_MAP[t.hero] || 'centered');
    const stats = document.querySelector('[data-stats]');
    if(stats) stats.style.display = t.showStats ? '' : 'none';
    const tracks = document.querySelector('.tracks');
    if(tracks) tracks.style.display = t.showTracks ? '' : 'none';
  }, [t]);

  return (
    <TweaksPanel title="تعديلات">
      <TweakSection label="الهوية اللونية" />
      <TweakColor label="اللون الأساسي" value={t.accent}
        options={["#11B5A0","#2E72E6","#6D5BF0","#D98E2B"]}
        onChange={(v)=>setTweak('accent', v)} />

      <TweakSection label="تخطيط الواجهة" />
      <TweakRadio label="نمط البطل" value={t.hero}
        options={["بطل واسع","موسّط","مضغوط"]}
        onChange={(v)=>setTweak('hero', v)} />
      <TweakToggle label="إظهار الإحصائيات" value={t.showStats}
        onChange={(v)=>setTweak('showStats', v)} />
      <TweakToggle label="إظهار مسارات الدروس" value={t.showTracks}
        onChange={(v)=>setTweak('showTracks', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
