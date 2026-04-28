// Atoms.jsx — booking app shared components
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Data ----------
const SPORTS = [
  { id: 'football', en: 'Football', ar: 'كرة قدم', sub: '٥ × ٥ · فوتسال', icon: 'football' },
  { id: 'volley',   en: 'Volleyball', ar: 'كرة طائرة', sub: '٦ × ٦ · داخلي', icon: 'volley' },
];

const FIELDS = [
  {
    id: 'f1', sport: 'football',
    name: 'ملعب الديوانية',
    nameEn: 'Al-Diwaniya Pitch',
    area: 'السالمية',
    areaEn: 'Salmiya',
    rating: 4.8, reviews: 214,
    distance: 1.2,
    price: 18,
    surface: 'عشب صناعي',
    indoor: false,
    capacity: '٥ × ٥',
    open: '٤م – ٢ص',
    amenities: ['وقوف', 'دش', 'مكيّف', 'كرات'],
    nextSlot: '٧:٠٠ م',
    slotsLeft: 4,
    hue: 'saffron',
  },
  {
    id: 'f2', sport: 'volley',
    name: 'صالة الخليج',
    nameEn: 'Gulf Indoor Arena',
    area: 'حولي',
    areaEn: 'Hawalli',
    rating: 4.9, reviews: 132,
    distance: 2.4,
    price: 22,
    surface: 'باركيه',
    indoor: true,
    capacity: '٦ × ٦',
    open: '٥م – ١٢ص',
    amenities: ['تكييف', 'دش', 'وقوف', 'شبكة احتياط'],
    nextSlot: '٨:٣٠ م',
    slotsLeft: 2,
    hue: 'teal',
  },
  {
    id: 'f3', sport: 'football',
    name: 'ملعب الشعب',
    nameEn: 'Sha\'ab Stadium',
    area: 'الشعب',
    areaEn: 'Sha\'ab',
    rating: 4.6, reviews: 318,
    distance: 3.8,
    price: 14,
    surface: 'عشب طبيعي',
    indoor: false,
    capacity: '٧ × ٧',
    open: '٣م – ١ص',
    amenities: ['وقوف', 'كافيه', 'كرات'],
    nextSlot: '٩:٠٠ م',
    slotsLeft: 6,
    hue: 'rose',
  },
  {
    id: 'f4', sport: 'volley',
    name: 'نادي الجابرية',
    nameEn: 'Jabriya Club',
    area: 'الجابرية',
    areaEn: 'Jabriya',
    rating: 4.7, reviews: 89,
    distance: 4.5,
    price: 16,
    surface: 'مطاطي',
    indoor: true,
    capacity: '٦ × ٦',
    open: '٦م – ١١م',
    amenities: ['تكييف', 'دش', 'مدرّب'],
    nextSlot: '٧:٣٠ م',
    slotsLeft: 1,
    hue: 'saffron',
  },
];

const TIME_SLOTS = [
  { t: '٤:٠٠', tag: 'متاح', state: 'free' },
  { t: '٥:٠٠', tag: 'متاح', state: 'free' },
  { t: '٦:٠٠', tag: 'محجوز', state: 'taken' },
  { t: '٧:٠٠', tag: 'متاح', state: 'free' },
  { t: '٨:٠٠', tag: 'لعبة عامة', state: 'public', joined: 6, total: 10 },
  { t: '٩:٠٠', tag: 'متاح', state: 'free' },
  { t: '١٠:٠٠', tag: 'محجوز', state: 'taken' },
  { t: '١١:٠٠', tag: 'متاح', state: 'free' },
  { t: '١٢:٠٠', tag: 'لعبة عامة', state: 'public', joined: 4, total: 12 },
  { t: '١:٠٠', tag: 'متاح', state: 'free' },
];

const PUBLIC_GAMES = [
  { id: 'p1', sport: 'football', field: 'ملعب الديوانية', area: 'السالمية', when: 'اليوم · ٨:٠٠ م', joined: 6, total: 10, level: 'متوسط', host: 'فهد ع.', price: 3 },
  { id: 'p2', sport: 'volley',   field: 'صالة الخليج',  area: 'حولي',     when: 'اليوم · ١٠:٠٠ م', joined: 8, total: 12, level: 'مبتدئ', host: 'ندى س.', price: 2 },
  { id: 'p3', sport: 'football', field: 'ملعب الشعب',   area: 'الشعب',    when: 'غداً · ٧:٠٠ م', joined: 4, total: 10, level: 'متقدم', host: 'يوسف خ.', price: 3 },
  { id: 'p4', sport: 'volley',   field: 'نادي الجابرية', area: 'الجابرية', when: 'غداً · ٩:٠٠ م', joined: 9, total: 12, level: 'متوسط', host: 'منى ر.', price: 2 },
];

// ---------- Icons ----------
const Icon = ({ name, size = 20, color = 'currentColor', stroke = 2 }) => {
  const paths = {
    arrow: <path d="M5 12h14M5 12l6-6M5 12l6 6"/>,
    arrowR: <path d="M19 12H5M19 12l-6-6M19 12l-6 6"/>,
    pin: <><path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
    star: <path d="M12 2l2.9 6.4 7.1.7-5.4 4.7 1.7 6.9L12 17l-6.3 3.7 1.7-6.9L2 9.1l7.1-.7L12 2z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    car: <><path d="M5 17H3a1 1 0 0 1-1-1v-3l2-5a2 2 0 0 1 2-1.4h10a2 2 0 0 1 2 1.4l2 5v3a1 1 0 0 1-1 1h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    shower: <><path d="M4 4h6a4 4 0 0 1 4 4v3"/><path d="M14 14v.01M11 16v.01M17 16v.01M14 18v.01M11 20v.01M17 20v.01M14 22v.01"/><circle cx="14" cy="11" r="3"/></>,
    snow: <><path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5"/></>,
    ball: <><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5 7c2 2 5 3 7 3s5-1 7-3M5 17c2-2 5-3 7-3s5 1 7 3"/></>,
    chevR: <path d="M9 6l6 6-6 6"/>,
    chevL: <path d="M15 6l-6 6 6 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    check: <path d="M20 6L9 17l-5-5"/>,
    bell: <><path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2v1h16v-1z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    home: <><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    flame: <path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4-1 3 1 4 2 3 0-2-1-4 1-10z"/>,
    football: <><circle cx="12" cy="12" r="9"/><path d="M12 3l3.5 5.5L12 12l-3.5-3.5z"/><path d="M12 12l3.5 3.5L12 21l-3.5-5.5z"/><path d="M3 12l5.5-3.5L12 12l-3.5 3.5z"/><path d="M12 12l3.5-3.5L21 12l-5.5 3.5z"/></>,
    volley: <><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18M3 12c4-2 8-2 12 0M5 6c3 1 7 4 9 9M5 18c3-1 7-4 9-9"/></>,
    coffee: <><path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><path d="M17 10h2a3 3 0 0 1 0 6h-2"/><path d="M7 4v2M11 4v2M15 4v2"/></>,
    share: <><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.5 10.5l7-3M8.5 13.5l7 3"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
};

// ---------- Buttons ----------
function PrimaryBtn({ children, onClick, disabled, style }) {
  return <button className="btn-primary" onClick={onClick} disabled={disabled} style={style}>{children}</button>;
}
function GhostBtn({ children, onClick, style }) {
  return <button className="btn-ghost" onClick={onClick} style={style}>{children}</button>;
}

// ---------- Sport tile ----------
function SportTile({ sport, selected, onClick }) {
  return (
    <button onClick={onClick}
      style={{
        textAlign: 'right', padding: 18, width: '100%',
        background: selected ? 'var(--bg-raised)' : 'var(--bg-surface)',
        borderRadius: 22,
        boxShadow: selected ? 'var(--glow-saffron)' : 'inset 0 0 0 1px var(--border-1)',
        color: 'var(--fg-1)',
        transition: 'all 220ms var(--ease-out)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: selected ? 'var(--accent)' : 'var(--accent-soft)',
        color: selected ? 'var(--midnight-950)' : 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={sport.icon} size={28} stroke={2} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: selected ? 'var(--accent)' : 'var(--fg-1)' }}>{sport.ar}</div>
        <div style={{ fontFamily: 'var(--font-latin)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>{sport.en}</div>
        <div style={{ fontSize: 13, color: 'var(--fg-2)', marginTop: 8 }}>{sport.sub}</div>
      </div>
    </button>
  );
}

// ---------- Field illustration (geometric placeholder) ----------
function FieldArt({ sport, hue = 'saffron', height = 130 }) {
  const colors = {
    saffron: { a: '#E9A21B', b: '#6E4806' },
    teal:    { a: '#1F8C76', b: '#06342B' },
    rose:    { a: '#D33F5C', b: '#571423' },
  };
  const c = colors[hue];
  return (
    <div style={{
      height, borderRadius: 18, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${c.b} 0%, var(--midnight-800) 100%)`,
    }}>
      <svg viewBox="0 0 300 130" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {sport === 'football' ? (
          <g stroke={c.a} strokeWidth="1.5" fill="none" opacity="0.85">
            <rect x="20" y="20" width="260" height="90" rx="2"/>
            <line x1="150" y1="20" x2="150" y2="110"/>
            <circle cx="150" cy="65" r="18"/>
            <rect x="20" y="40" width="36" height="50"/>
            <rect x="244" y="40" width="36" height="50"/>
            <circle cx="150" cy="65" r="2" fill={c.a}/>
          </g>
        ) : (
          <g stroke={c.a} strokeWidth="1.5" fill="none" opacity="0.85">
            <rect x="30" y="25" width="240" height="80" rx="2"/>
            <line x1="150" y1="10" x2="150" y2="120" strokeDasharray="3 3"/>
            <line x1="90" y1="25" x2="90" y2="105"/>
            <line x1="210" y1="25" x2="210" y2="105"/>
            <circle cx="150" cy="65" r="3" fill={c.a}/>
          </g>
        )}
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 80% 20%, ${c.a}26, transparent 60%)`,
      }}/>
    </div>
  );
}

// ---------- Field card ----------
function FieldCard({ field, onClick, compact }) {
  return (
    <button onClick={onClick}
      style={{
        textAlign: 'right', width: '100%', padding: 14,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-1)',
        borderRadius: 22,
        color: 'var(--fg-1)',
        display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'all 220ms var(--ease-out)',
      }}>
      <FieldArt sport={field.sport} hue={field.hue} height={compact ? 110 : 140} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 19, lineHeight: 1.15 }}>{field.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--saffron-300)' }}>
            <Icon name="star" size={14} stroke={0} color="var(--saffron-300)" />
            <span className="tabular" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>{field.rating}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--fg-3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={14}/> {field.area}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="tabular eastern">
            {field.distance.toLocaleString('ar-EG')} كم
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {field.indoor ? <><Icon name="snow" size={14}/> داخلي</> : <>مفتوح</>}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="chip" style={{ background: 'var(--accent-soft)', color: 'var(--saffron-300)', border: '1px solid rgba(246,196,83,0.3)' }}>
              <Icon name="clock" size={11}/> {field.nextSlot}
            </span>
            <span style={{ fontSize: 12, color: field.slotsLeft <= 2 ? 'var(--rose-300)' : 'var(--fg-3)' }}>
              {field.slotsLeft <= 2 ? `باقي ${field.slotsLeft.toLocaleString('ar-EG')} فقط` : `${field.slotsLeft.toLocaleString('ar-EG')} فترات`}
            </span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span className="tabular" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--accent)' }}>
              {field.price.toLocaleString('ar-EG')}
            </span>
            <span style={{ fontFamily: 'var(--font-latin)', fontSize: 11, color: 'var(--fg-3)', marginInlineStart: 4 }}>د.ك / ساعة</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ---------- Slot button ----------
function SlotButton({ slot, selected, onClick }) {
  const taken = slot.state === 'taken';
  const pub = slot.state === 'public';
  return (
    <button onClick={onClick} disabled={taken}
      style={{
        padding: '10px 4px', borderRadius: 14,
        background: selected ? 'var(--accent)' : taken ? 'transparent' : pub ? 'var(--team-a-soft)' : 'var(--bg-surface)',
        color: selected ? 'var(--midnight-950)' : taken ? 'var(--fg-3)' : pub ? 'var(--teal-300)' : 'var(--fg-1)',
        border: taken ? '1px dashed var(--border-1)' : '1px solid ' + (selected ? 'var(--accent)' : pub ? 'rgba(94,191,166,0.4)' : 'var(--border-1)'),
        opacity: taken ? 0.5 : 1,
        textDecoration: taken ? 'line-through' : 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        transition: 'all 140ms var(--ease-out)',
      }}>
      <span className="tabular eastern" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>{slot.t}</span>
      <span style={{ fontSize: 10, opacity: 0.85 }}>
        {pub ? `${slot.joined.toLocaleString('ar-EG')}/${slot.total.toLocaleString('ar-EG')}` : taken ? 'محجوز' : 'متاح'}
      </span>
    </button>
  );
}

// ---------- Bottom tab nav (visual only) ----------
function TabBar({ active = 'home', onChange = () => {} }) {
  const items = [
    { id: 'home', icon: 'home', label: 'الرئيسية' },
    { id: 'search', icon: 'search', label: 'بحث' },
    { id: 'public', icon: 'flame', label: 'لعبات' },
    { id: 'bookings', icon: 'calendar', label: 'حجوزاتي' },
    { id: 'profile', icon: 'user', label: 'حسابي' },
  ];
  return (
    <div style={{
      display: 'flex', borderTop: '1px solid var(--border-1)',
      background: 'rgba(11,15,26,0.85)', backdropFilter: 'blur(14px)',
      padding: '8px 4px 12px',
    }}>
      {items.map(it => {
        const sel = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '6px 2px',
              color: sel ? 'var(--accent)' : 'var(--fg-3)',
            }}>
            <Icon name={it.icon} size={20} stroke={sel ? 2.4 : 1.8} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: sel ? 700 : 500, fontSize: 10 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------- Top header ----------
function TopHeader({ title, subtitle, onBack, right }) {
  return (
    <header style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 40, height: 40, borderRadius: 999,
          background: 'var(--bg-surface)', border: '1px solid var(--border-1)',
          color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="chevR" size={18} />
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 19, letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {right}
    </header>
  );
}

Object.assign(window, {
  SPORTS, FIELDS, TIME_SLOTS, PUBLIC_GAMES,
  Icon, PrimaryBtn, GhostBtn,
  SportTile, FieldArt, FieldCard, SlotButton, TabBar, TopHeader,
});
