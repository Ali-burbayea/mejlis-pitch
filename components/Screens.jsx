// Screens.jsx — Mejlis Field Booking
const { useState: uS, useEffect: uE } = React;

// ============== HOME ==============
function HomeScreen({ go, state, setState }) {
  return (
    <div className="screen">
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('ds/assets/pattern-zellige.svg')", backgroundSize: 220, opacity: 0.05, pointerEvents: 'none' }} />
      <header style={{ padding: '18px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>مساء الخير</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, marginTop: 2 }}>أهلاً، فهد</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--bg-surface)', border: '1px solid var(--border-1)', color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon name="bell" size={18}/>
            <span style={{ position: 'absolute', top: 8, insetInlineEnd: 8, width: 7, height: 7, background: 'var(--rose-500)', borderRadius: 999 }}/>
          </button>
        </div>
      </header>

      <div className="screen-scroll" style={{ position: 'relative' }}>
        {/* Location pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-1)', borderRadius: 999, marginBottom: 16 }}>
          <Icon name="pin" size={16} color="var(--accent)"/>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }}>الكويت · السالمية</span>
          <span style={{ marginInlineStart: 'auto', fontSize: 12, color: 'var(--fg-3)' }}>تغيير</span>
        </div>

        {/* Sport choice */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>اختر اللعبة</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {SPORTS.map(s => (
              <SportTile key={s.id} sport={s}
                selected={state.sport === s.id}
                onClick={() => setState(st => ({ ...st, sport: s.id }))} />
            ))}
          </div>
        </div>

        {/* Hero CTA */}
        <button onClick={() => go('list')}
          style={{
            width: '100%', textAlign: 'right', padding: 18,
            background: 'linear-gradient(135deg, var(--saffron-500) 0%, var(--saffron-700) 100%)',
            color: 'var(--midnight-950)',
            border: 'none', borderRadius: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: 'var(--glow-saffron)',
            marginBottom: 18,
          }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20 }}>احجز ملعبك الآن</div>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 2 }}>{FIELDS.filter(f => !state.sport || f.sport === state.sport).length.toLocaleString('ar-EG')} ملاعب قريبة منك</div>
          </div>
          <Icon name="chevL" size={22}/>
        </button>

        {/* Public game banner */}
        <button onClick={() => go('public')}
          style={{
            width: '100%', textAlign: 'right', padding: 14,
            background: 'var(--bg-surface)', border: '1px solid rgba(94,191,166,0.3)',
            borderRadius: 18, color: 'var(--fg-1)',
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22,
          }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--team-a-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-300)' }}>
            <Icon name="flame" size={22}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15 }}>انضم للعبة عامة</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>{PUBLIC_GAMES.length.toLocaleString('ar-EG')} لعبات تبحث عن لاعبين</div>
          </div>
          <Icon name="chevL" size={18} color="var(--fg-3)"/>
        </button>

        {/* Featured fields */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18 }}>قريب منك</div>
          <button onClick={() => go('list')} style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-latin)', fontWeight: 600 }}>عرض الكل</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FIELDS.filter(f => !state.sport || f.sport === state.sport).slice(0, 2).map(f => (
            <FieldCard key={f.id} field={f} onClick={() => { setState(s => ({ ...s, fieldId: f.id })); go('detail'); }} />
          ))}
        </div>
      </div>

      <TabBar active="home" onChange={(id) => { if (id === 'public') go('public'); else if (id === 'bookings') go('confirm'); else if (id === 'search') go('list'); }} />
    </div>
  );
}

// ============== LIST ==============
function ListScreen({ go, state, setState }) {
  const [filter, setFilter] = uS(state.sport || 'all');
  const filtered = FIELDS.filter(f => filter === 'all' || f.sport === filter);
  return (
    <div className="screen">
      <TopHeader title="ملاعب قريبة" subtitle="السالمية · ٥ كم" onBack={() => go('home')}
        right={<button style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--bg-surface)', border: '1px solid var(--border-1)', color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="search" size={18}/>
        </button>} />

      {/* Filter pills */}
      <div style={{ padding: '4px 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[
          { id: 'all', label: 'الكل' },
          { id: 'football', label: 'كرة قدم' },
          { id: 'volley', label: 'كرة طائرة' },
        ].map(p => (
          <button key={p.id} onClick={() => setFilter(p.id)}
            style={{
              padding: '8px 16px', borderRadius: 999,
              background: filter === p.id ? 'var(--accent)' : 'var(--bg-surface)',
              color: filter === p.id ? 'var(--midnight-950)' : 'var(--fg-2)',
              border: '1px solid ' + (filter === p.id ? 'var(--accent)' : 'var(--border-1)'),
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
              whiteSpace: 'nowrap',
            }}>{p.label}</button>
        ))}
        <button style={{
          padding: '8px 16px', borderRadius: 999,
          background: 'var(--bg-surface)', color: 'var(--fg-2)',
          border: '1px solid var(--border-1)',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
        }}>السعر · الأقرب</button>
      </div>

      <div className="screen-scroll" style={{ paddingTop: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map(f => (
            <FieldCard key={f.id} field={f} onClick={() => { setState(s => ({ ...s, fieldId: f.id })); go('detail'); }} />
          ))}
        </div>
      </div>
      <TabBar active="search" onChange={(id) => { if (id === 'home') go('home'); else if (id === 'public') go('public'); }} />
    </div>
  );
}

// ============== DETAIL ==============
function DetailScreen({ go, state, setState }) {
  const field = FIELDS.find(f => f.id === state.fieldId) || FIELDS[0];
  return (
    <div className="screen">
      {/* Hero */}
      <div style={{ position: 'relative' }}>
        <FieldArt sport={field.sport} hue={field.hue} height={220} />
        <button onClick={() => go('list')} style={{
          position: 'absolute', top: 16, insetInlineEnd: 16, width: 40, height: 40, borderRadius: 999,
          background: 'rgba(11,15,26,0.7)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-1)',
          color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><Icon name="chevR" size={18}/></button>
        <button style={{
          position: 'absolute', top: 16, insetInlineStart: 16, width: 40, height: 40, borderRadius: 999,
          background: 'rgba(11,15,26,0.7)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-1)',
          color: 'var(--fg-1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}><Icon name="share" size={16}/></button>
      </div>

      <div className="screen-scroll" style={{ paddingTop: 18 }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, lineHeight: 1.15 }}>{field.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, fontSize: 13, color: 'var(--fg-3)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="pin" size={13}/> {field.area}</span>
              <span className="tabular eastern">{field.distance.toLocaleString('ar-EG')} كم</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--saffron-300)' }}>
                <Icon name="star" size={13} stroke={0} color="var(--saffron-300)"/>
                <span className="tabular">{field.rating}</span>
                <span style={{ color: 'var(--fg-3)' }}>({field.reviews.toLocaleString('ar-EG')})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Specs row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {[
            { label: 'سطح', value: field.surface },
            { label: 'حجم', value: field.capacity },
            { label: 'دوام', value: field.open },
          ].map((s,i) => (
            <div key={i} style={{ padding: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-1)', borderRadius: 14 }}>
              <div style={{ fontSize: 10, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginTop: 4, color: 'var(--fg-1)' }} className="eastern">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Amenities */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>الخدمات</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {field.amenities.map(a => {
              const ico = a.includes('وقوف') ? 'car' : a.includes('دش') ? 'shower' : a.includes('مكيّف') || a.includes('تكييف') ? 'snow' : a.includes('كافيه') ? 'coffee' : 'check';
              return (
                <span key={a} className="chip" style={{ background: 'var(--bg-surface)', color: 'var(--fg-2)', border: '1px solid var(--border-1)', fontSize: 12, padding: '6px 12px' }}>
                  <Icon name={ico} size={13}/>{a}
                </span>
              );
            })}
          </div>
        </div>

        {/* Date strip */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>اختر التاريخ</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { d: '٢٨', day: 'اليوم', month: 'أبريل', sel: true },
              { d: '٢٩', day: 'الثلاثاء', month: 'أبريل' },
              { d: '٣٠', day: 'الأربعاء', month: 'أبريل' },
              { d: '١', day: 'الخميس', month: 'مايو' },
              { d: '٢', day: 'الجمعة', month: 'مايو' },
              { d: '٣', day: 'السبت', month: 'مايو' },
            ].map((d,i) => (
              <button key={i} style={{
                minWidth: 64, padding: '10px 8px', borderRadius: 14,
                background: d.sel ? 'var(--accent)' : 'var(--bg-surface)',
                color: d.sel ? 'var(--midnight-950)' : 'var(--fg-1)',
                border: '1px solid ' + (d.sel ? 'var(--accent)' : 'var(--border-1)'),
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.75 }}>{d.day}</span>
                <span className="eastern" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18 }}>{d.d}</span>
                <span style={{ fontSize: 9, opacity: 0.65 }}>{d.month}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="screen-pad" style={{ paddingTop: 12, borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>السعر يبدأ من</div>
            <div>
              <span className="tabular" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: 'var(--accent)' }}>{field.price.toLocaleString('ar-EG')}</span>
              <span style={{ fontFamily: 'var(--font-latin)', fontSize: 12, color: 'var(--fg-3)', marginInlineStart: 4 }}>د.ك / ساعة</span>
            </div>
          </div>
          <div style={{ flex: 1, marginInlineStart: 14 }}>
            <PrimaryBtn onClick={() => go('slots')}>اختر الوقت</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== SLOTS ==============
function SlotsScreen({ go, state, setState }) {
  const field = FIELDS.find(f => f.id === state.fieldId) || FIELDS[0];
  const [selected, setSelected] = uS(state.slots || []);
  const [size, setSize] = uS(state.teamSize || (field.sport === 'football' ? 5 : 6));

  const toggle = (idx) => {
    setSelected(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      return [...prev, idx].sort((a,b) => a-b);
    });
  };

  const total = selected.length * field.price;

  return (
    <div className="screen">
      <TopHeader title={field.name} subtitle="اليوم · ٢٨ أبريل" onBack={() => go('detail')} />

      <div className="screen-scroll">
        {/* Team size */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 10 }}>حجم الفريق</div>
          <div style={{ display: 'inline-flex', padding: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-1)', borderRadius: 999, gap: 0 }}>
            {(field.sport === 'football' ? [5, 7, 11] : [4, 6, 9]).map(n => (
              <button key={n} onClick={() => setSize(n)}
                style={{
                  padding: '10px 18px', borderRadius: 999,
                  background: size === n ? 'var(--accent)' : 'transparent',
                  color: size === n ? 'var(--midnight-950)' : 'var(--fg-2)',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
                }}>
                <span className="eastern">{n.toLocaleString('ar-EG')}</span> × <span className="eastern">{n.toLocaleString('ar-EG')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time slots grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-latin)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>الفترات المتاحة</div>
            <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>اختر ساعة أو أكثر</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {TIME_SLOTS.map((s, i) => (
              <SlotButton key={i} slot={s} selected={selected.includes(i)} onClick={() => s.state !== 'taken' && toggle(i)} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: 'var(--fg-3)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--accent)'}}/> مختار
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--teal-500)'}}/> لعبة عامة
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--fg-3)', opacity: 0.5}}/> محجوز
            </span>
          </div>
        </div>

        {/* Note */}
        {selected.length > 0 && (
          <div className="fade-up" style={{ marginTop: 18, padding: 14, background: 'var(--accent-soft)', border: '1px solid rgba(246,196,83,0.3)', borderRadius: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--saffron-300)', fontWeight: 600, fontFamily: 'var(--font-latin)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>اخترت</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginTop: 4 }} className="eastern">
              {selected.map(i => TIME_SLOTS[i].t).join(' · ')} · <span>{selected.length.toLocaleString('ar-EG')} ساعات</span>
            </div>
          </div>
        )}
      </div>

      <div className="screen-pad" style={{ paddingTop: 12, borderTop: '1px solid var(--border-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>المجموع</div>
          <div className="tabular eastern" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: 'var(--accent)' }}>
            {total.toLocaleString('ar-EG')} <span style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 400, marginInlineStart: 2 }}>د.ك</span>
          </div>
        </div>
        <PrimaryBtn disabled={selected.length === 0} onClick={() => { setState(s => ({ ...s, slots: selected, teamSize: size, total })); go('confirm'); }}>
          {selected.length === 0 ? 'اختر فترة لإكمال الحجز' : 'تأكيد الحجز'}
        </PrimaryBtn>
      </div>
    </div>
  );
}

// ============== CONFIRMATION ==============
function ConfirmScreen({ go, state, setState }) {
  const field = FIELDS.find(f => f.id === state.fieldId) || FIELDS[0];
  const slots = (state.slots || [3]).map(i => TIME_SLOTS[i]?.t).filter(Boolean);
  const total = state.total ?? field.price;

  return (
    <div className="screen" style={{ background: 'var(--bg-canvas)' }}>
      <div className="screen-scroll" style={{ paddingTop: 28 }}>
        {/* Success badge */}
        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: 'var(--olive-500)', color: 'var(--cream-50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 8px rgba(123,139,61,0.18)',
          }}>
            <Icon name="check" size={36} stroke={3}/>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 26, marginTop: 18 }}>تم الحجز</div>
          <div style={{ fontFamily: 'var(--font-latin)', fontSize: 13, color: 'var(--fg-3)', marginTop: 4 }}>Booking confirmed</div>
        </div>

        {/* Receipt card on cream paper */}
        <div style={{ background: 'var(--bg-paper)', color: 'var(--fg-on-paper)', borderRadius: 24, padding: 22, position: 'relative' }}>
          {/* Notch holes */}
          <div style={{ position: 'absolute', top: -10, insetInlineStart: 24, width: 20, height: 20, borderRadius: 999, background: 'var(--bg-canvas)' }}/>
          <div style={{ position: 'absolute', top: -10, insetInlineEnd: 24, width: 20, height: 20, borderRadius: 999, background: 'var(--bg-canvas)' }}/>

          <div style={{ fontSize: 11, color: 'var(--fg-on-paper-3)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-latin)', fontWeight: 600 }}>إيصال الحجز · MJ-٧٤٢١</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, lineHeight: 1.2, marginTop: 8 }}>{field.name}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-on-paper-2)', marginTop: 2 }}>{field.area} · {field.surface}</div>

          <div style={{ borderTop: '1px dashed rgba(17,22,38,0.2)', margin: '16px 0' }}/>

          {[
            { label: 'التاريخ', value: 'الإثنين · ٢٨ أبريل' },
            { label: 'الوقت', value: slots.join(' · ') },
            { label: 'المدة', value: `${(state.slots?.length || 1).toLocaleString('ar-EG')} ساعات` },
            { label: 'الفريق', value: `${(state.teamSize || 5).toLocaleString('ar-EG')} × ${(state.teamSize || 5).toLocaleString('ar-EG')}` },
          ].map((r,i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ fontSize: 12, color: 'var(--fg-on-paper-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'var(--font-latin)' }}>{r.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14 }} className="eastern">{r.value}</span>
            </div>
          ))}

          <div style={{ borderTop: '1px dashed rgba(17,22,38,0.2)', margin: '14px 0' }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, color: 'var(--fg-on-paper-2)' }}>المدفوع</span>
            <div className="eastern">
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28 }}>{total.toLocaleString('ar-EG')}</span>
              <span style={{ fontFamily: 'var(--font-latin)', fontSize: 12, color: 'var(--fg-on-paper-3)', marginInlineStart: 4 }}>د.ك</span>
            </div>
          </div>

          {/* Barcode-ish */}
          <div style={{ marginTop: 14, height: 40, display: 'flex', gap: 2, alignItems: 'center' }}>
            {Array.from({length: 38}).map((_,i) => (
              <span key={i} style={{ flex: 1, height: i % 5 === 0 ? '100%' : i % 3 === 0 ? '70%' : '85%', background: 'var(--midnight-900)', opacity: i % 7 === 0 ? 0.3 : 1 }}/>
            ))}
          </div>
        </div>

        {/* Open in maps + share */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
          <button style={{ flex: 1, padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-1)', color: 'var(--fg-1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>
            <Icon name="pin" size={16}/> الموقع
          </button>
          <button style={{ flex: 1, padding: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-1)', color: 'var(--fg-1)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 }}>
            <Icon name="share" size={16}/> شارك
          </button>
        </div>
      </div>

      <div className="screen-pad" style={{ paddingTop: 8 }}>
        <PrimaryBtn onClick={() => go('home')}>تمام</PrimaryBtn>
      </div>
    </div>
  );
}

// ============== PUBLIC GAMES ==============
function PublicScreen({ go, state, setState }) {
  return (
    <div className="screen">
      <TopHeader title="لعبات عامة" subtitle="انضم لمجموعة قريبة منك" onBack={() => go('home')} />

      <div className="screen-scroll">
        {/* Sport tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[{ id: 'all', label: 'الكل' }, { id: 'football', label: 'كرة قدم' }, { id: 'volley', label: 'كرة طائرة' }].map(t => (
            <button key={t.id}
              style={{
                flex: 1, padding: '10px',
                background: t.id === 'all' ? 'var(--bg-raised)' : 'var(--bg-surface)',
                border: '1px solid ' + (t.id === 'all' ? 'var(--border-strong)' : 'var(--border-1)'),
                borderRadius: 14, color: 'var(--fg-1)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
              }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PUBLIC_GAMES.map(g => {
            const pct = (g.joined / g.total) * 100;
            const sportData = SPORTS.find(s => s.id === g.sport);
            const teamColor = g.sport === 'football' ? 'var(--saffron-300)' : 'var(--teal-300)';
            const teamSoft = g.sport === 'football' ? 'var(--accent-soft)' : 'var(--team-a-soft)';
            return (
              <div key={g.id} style={{ padding: 16, background: 'var(--bg-surface)', border: '1px solid var(--border-1)', borderRadius: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: teamSoft, color: teamColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={sportData.icon} size={24}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>{g.field}</div>
                      <span className="chip" style={{ background: teamSoft, color: teamColor, border: '1px solid ' + teamColor, fontSize: 10 }}>{g.level}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 3 }}>{g.area} · {g.when}</div>
                  </div>
                </div>

                {/* Players progress */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-2)', fontSize: 12 }}>
                      <Icon name="users" size={13}/>
                      <span className="eastern"><span style={{ color: teamColor, fontWeight: 700 }}>{g.joined.toLocaleString('ar-EG')}</span> / {g.total.toLocaleString('ar-EG')} لاعب</span>
                    </div>
                    <div className="eastern" style={{ fontSize: 11, color: 'var(--fg-3)' }}>المنظّم: {g.host}</div>
                  </div>
                  <div style={{ height: 6, background: 'var(--midnight-800)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: teamColor, borderRadius: 999, transition: 'width 360ms var(--ease-out)' }}/>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
                  <div className="eastern">
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--accent)' }}>{g.price.toLocaleString('ar-EG')}</span>
                    <span style={{ fontSize: 11, color: 'var(--fg-3)', marginInlineStart: 4 }}>د.ك / لاعب</span>
                  </div>
                  <button style={{
                    padding: '10px 18px', borderRadius: 999,
                    background: g.joined >= g.total ? 'var(--bg-raised)' : 'var(--accent)',
                    color: g.joined >= g.total ? 'var(--fg-3)' : 'var(--midnight-950)',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13,
                  }}>{g.joined >= g.total ? 'ممتلئ' : 'انضم'}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TabBar active="public" onChange={(id) => { if (id === 'home') go('home'); else if (id === 'search') go('list'); }} />
    </div>
  );
}

Object.assign(window, { HomeScreen, ListScreen, DetailScreen, SlotsScreen, ConfirmScreen, PublicScreen });
