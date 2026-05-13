// Screens 1-7: welcome, 4 questions, loading, result
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ─────────────────────────────────────────────────────────────
// Screen 1: Welcome / Acesso liberado
// ─────────────────────────────────────────────────────────────
function WelcomeScreen({ onStart }) {
  const [proofIdx, setProofIdx] = useStateS(0);
  const proofs = [
    { name: 'Vania', city: 'Campinas, SP', when: 'agora há pouco' },
    { name: 'Letícia', city: 'Salvador, BA', when: 'há 2 minutos' },
    { name: 'Camila', city: 'Curitiba, PR', when: 'há 5 minutos' },
    { name: 'Juliana', city: 'Recife, PE', when: 'há 7 minutos' },
  ];
  useEffectS(() => {
    const id = setInterval(() => setProofIdx(i => (i + 1) % proofs.length), 3200);
    return () => clearInterval(id);
  }, []);
  const p = proofs[proofIdx];

  return (
    <div className="screen-enter">
      <TopBar />
      <div style={{ padding: '20px 20px 28px' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <span className="chip">
            <span style={{ width: 6, height: 6, background: 'var(--green-500)', borderRadius: 999 }} />
            Liberação direto da fábrica
          </span>
        </div>

        <h1 className="h1" style={{ textAlign: 'center', margin: 0, marginBottom: 8 }}>
          Acesso <span style={{ color: 'var(--green-600)' }}>LIBERADO</span><br/>direto à Fábrica
        </h1>
        <p className="body" style={{ textAlign: 'center', margin: '0 0 18px' }}>
          Você ganhou um acesso exclusivo ao <b>Creme Cachos Profissional 1L</b> com até <b>50% OFF</b>.
        </p>

        <ImgPlaceholder src="public/photo1.jpeg" label="modelo cacheada segurando o Creme Cachos Ledebut 1L" ratio="4/5" />

        <div style={{ marginTop: 18 }}>
          <p className="body" style={{ margin: '0 0 6px', color: 'var(--ink-900)', fontWeight: 600 }}>
            Antes de liberar o desconto, precisamos saber se o Creme Cachos é mesmo o produto certo pra você.
          </p>
          <p className="small" style={{ margin: 0 }}>
            Podemos te conhecer melhor? Leva <b>menos de 1 minuto</b>. ⏱️
          </p>
        </div>

        {/* Social proof card */}
        <div className="card pop-in" key={proofIdx} style={{
          marginTop: 18,
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--ink-50)', borderColor: 'var(--ink-100)'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: 'linear-gradient(135deg, #22c55e, #15803d)', color: 'white',
            display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0,
          }}>{p.name[0]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>
              <b>{p.name}</b> de {p.city} acabou de comprar
            </div>
            <div className="small" style={{ marginTop: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="live-dot" /> {p.when}
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', background: '#fff7ed',
          border: '1px solid #fed7aa', borderRadius: 12,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>
          <span style={{ fontSize: 13, color: '#9a3412', fontWeight: 600 }}>
            Restam apenas <b>23 ofertas</b> disponíveis hoje
          </span>
        </div>

        <button onClick={onStart} className="btn-primary pulse" style={{ marginTop: 18 }}>
          Quero descobrir meu cabelo →
        </button>

        <p className="small" style={{ textAlign: 'center', margin: '12px 0 0' }}>
          🔒 Suas respostas ficam protegidas. Sem spam.
        </p>

        {/* Trust badges */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { t: '+20mil', s: 'cacheadas' },
            { t: '4.9 ★', s: 'avaliação' },
            { t: 'Direto', s: 'da fábrica' },
          ].map((b, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '10px 6px',
              background: 'var(--ink-50)', borderRadius: 12,
            }}>
              <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink-900)' }}>{b.t}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{b.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Question screen wrapper
// ─────────────────────────────────────────────────────────────
function QuestionScreen({ progress, onBack, eyebrow, title, subtitle, imgLabel, imgSrc, imgRatio, options, value, onPick, footnote }) {
  return (
    <div className="screen-enter">
      <TopBar progress={progress} onBack={onBack} canBack={!!onBack} />
      <div style={{ padding: '18px 20px 28px' }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>
        <h2 className="h2" style={{ margin: '0 0 6px' }}>{title}</h2>
        {subtitle && <p className="body" style={{ margin: '0 0 14px' }}>{subtitle}</p>}

        {imgLabel && <div style={{ marginBottom: 16 }}>
          <ImgPlaceholder src={imgSrc} label={imgLabel} ratio={imgRatio || '16/9'} />
        </div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {options.map(opt => (
            <RadioCard
              key={opt.value}
              selected={value === opt.value}
              onClick={() => onPick(opt.value)}
              leadingIcon={opt.icon}
              sub={opt.sub}
            >{opt.label}</RadioCard>
          ))}
        </div>

        {footnote && <p className="small" style={{ textAlign: 'center', marginTop: 16 }}>{footnote}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 6: Loading
// ─────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [pct, setPct] = useStateS(0);
  const [msgIdx, setMsgIdx] = useStateS(0);
  const messages = [
    'Lendo suas respostas...',
    'Analisando o seu tipo de cabelo...',
    'Cruzando com +20.000 perfis...',
    'Montando sua recomendação...',
  ];

  useEffectS(() => {
    const dur = 4200;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const e = Math.min(1, (t - start) / dur);
      const p = Math.floor(e * 100);
      setPct(p);
      setMsgIdx(Math.min(messages.length - 1, Math.floor(e * messages.length)));
      if (e < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="screen-enter">
      <TopBar progress={60 + (pct * 0.3)} />
      <div style={{ padding: '60px 20px 40px', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Carregando...</div>
        <div className="ring" style={{ '--p': pct, margin: '0 auto 22px' }}>
          <div className="pct">{pct}%</div>
        </div>
        <h3 className="h3" style={{ margin: '0 0 6px' }}>Estamos analisando o seu tipo de cabelo</h3>
        <p className="body" style={{ margin: '0 0 22px', minHeight: 24 }}>
          <span key={msgIdx} className="pop-in" style={{ display: 'inline-block' }}>{messages[msgIdx]}</span>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 320, margin: '0 auto', textAlign: 'left' }}>
          {[
            'Curvatura analisada',
            'Espessura calculada',
            'Rotina identificada',
            'Recomendação personalizada',
          ].map((t, i) => {
            const done = pct >= (i + 1) * 25;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px',
                background: done ? 'var(--green-50)' : 'var(--ink-50)',
                border: '1px solid ' + (done ? 'var(--green-100)' : 'var(--ink-100)'),
                borderRadius: 10,
                transition: 'all .3s',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                  background: done ? 'var(--green-500)' : 'var(--ink-200)',
                  display: 'grid', placeItems: 'center', color: 'white',
                }}>
                  {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: done ? 'var(--green-700)' : 'var(--ink-500)' }}>{t}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Screen 7: Result
// ─────────────────────────────────────────────────────────────
function ResultScreen({ answers, onContinue }) {
  // Animate gauges in
  const [poros, setPoros] = useStateS(0);
  const [frizz, setFrizz] = useStateS(0);
  useEffectS(() => {
    const targetP = 80, targetF = 75;
    const start = performance.now(); const dur = 1100;
    let raf;
    const tick = (t) => {
      const e = Math.min(1, (t - start) / dur);
      const ease = 1 - Math.pow(1 - e, 3);
      setPoros(Math.round(targetP * ease));
      setFrizz(Math.round(targetF * ease));
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Personalize result text based on answers
  const incomodo = answers.incomodo;
  const diagnostico = {
    frizz: 'Seu cabelo tá pedindo controle de frizz + selagem da cutícula.',
    ressecado: 'Seu cabelo tá pedindo hidratação profunda + reposição de água nos fios.',
    'sem-definicao': 'Seu cabelo tá pedindo definição + maciez sem efeito pesado.',
    'tudo-isso': 'Seu cabelo tá pedindo hidratação + maciez + controle de frizz ao mesmo tempo.',
  }[incomodo] || 'Seu cabelo tá pedindo hidratação + maciez.';

  return (
    <div className="screen-enter">
      <TopBar progress={92} />
      <div style={{ padding: '18px 20px 28px' }}>
        <div className="eyebrow" style={{ marginBottom: 8, color: 'var(--green-600)' }}>✓ Análise concluída</div>
        <h2 className="h2" style={{ margin: '0 0 8px' }}>Já temos seu resultado.</h2>
        <p className="body" style={{ margin: '0 0 6px' }}>
          {diagnostico} Ele resseca depois que seca e perde brilho.
        </p>
        <p className="body" style={{ margin: '0 0 18px' }}>
          O que funciona melhor é um <b>creme que hidrata, deixa o cacho macio e não mela</b>.
        </p>

        {/* Diagnóstico cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <Gauge label="Porosidade dos fios" value={poros} color="#15803d" />
          <Gauge label="Nível do frizz" value={frizz} color="#ea580c" />
        </div>

        {/* Evolução */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Evolução prevista</span>
            <span className="chip">com Creme Cachos 1L</span>
          </div>
          <EvolutionChart />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-500)', marginTop: 6, fontWeight: 600 }}>
            <span>Ressecado</span>
            <span>Atual</span>
            <span style={{ color: 'var(--green-600)' }}>Hidratado ✨</span>
          </div>
        </div>

        {/* Alerta */}
        <div style={{
          marginTop: 14,
          padding: '12px 14px',
          background: 'var(--warn-bg)', border: '1px solid var(--warn-bd)',
          color: 'var(--warn-fg)',
          borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div style={{ fontSize: 13, lineHeight: 1.45 }}>
            <b>Alerta!</b> Um creme de pentear após a lavagem ajuda a manter os fios hidratados ao longo da semana.
          </div>
        </div>

        {/* Recomendado */}
        <div style={{ marginTop: 16, padding: 14, background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 14 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Recomendado para você</div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <ImgPlaceholder src="public/produto.webp" label="produto" ratio="1/1" style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 10 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Creme Cachos Profissional 1L</div>
              <div className="small" style={{ marginTop: 2 }}>Hidratação · Maciez · Definição · Anti-frizz</div>
            </div>
          </div>
        </div>

        <button onClick={onContinue} className="btn-primary" style={{ marginTop: 20 }}>
          Quero um produto que funciona →
        </button>
        <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>
          Sua oferta está reservada por <b>5 minutos</b>.
        </p>
      </div>
    </div>
  );
}

function Gauge({ label, value, color }) {
  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color }}>{value}</span>
        <span style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 600 }}>%</span>
      </div>
      <div style={{ height: 6, background: 'var(--ink-100)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 999, transition: 'width .1s' }} />
      </div>
    </div>
  );
}

function EvolutionChart() {
  // 3 points: ressecado (low), atual (mid), hidratado (high)
  return (
    <svg width="100%" viewBox="0 0 320 110" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="evogradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[20, 50, 80].map((y,i) => <line key={i} x1="0" y1={y} x2="320" y2={y} stroke="#f1f5f9" strokeWidth="1" />)}
      {/* Area */}
      <path d="M 20 85 Q 100 70 160 55 T 300 18 L 300 100 L 20 100 Z" fill="url(#evogradient)" />
      {/* Line */}
      <path d="M 20 85 Q 100 70 160 55 T 300 18"
        fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray="600" strokeDashoffset="600"
        style={{ animation: 'draw 1.2s .2s cubic-bezier(.2,.7,.2,1) forwards' }} />
      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
      {/* Points */}
      <circle cx="20" cy="85" r="5" fill="white" stroke="#dc2626" strokeWidth="2.5" />
      <circle cx="160" cy="55" r="5" fill="white" stroke="#f59e0b" strokeWidth="2.5" />
      <circle cx="300" cy="18" r="7" fill="#15803d" stroke="white" strokeWidth="3" />
      {/* Labels at points */}
      <text x="20" y="105" fontSize="10" fill="#dc2626" fontWeight="700" textAnchor="middle">×</text>
      <text x="160" y="40" fontSize="10" fill="#f59e0b" fontWeight="700" textAnchor="middle">você</text>
      <text x="295" y="10" fontSize="10" fill="#15803d" fontWeight="800" textAnchor="end">+86%</text>
    </svg>
  );
}

Object.assign(window, { WelcomeScreen, QuestionScreen, LoadingScreen, ResultScreen });
