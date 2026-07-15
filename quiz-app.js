// Main app: state machine for the quiz flow
const { useState: useStateA, useEffect: useEffectA } = React;

const STEPS = ['welcome', 'q1', 'q2', 'q3', 'q4', 'loading', 'result', 'offer', 'sales'];

const TRACKING_STORAGE_KEY = 'ledebut_tracking_params';

function saveTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) return;

  try {
    localStorage.setItem(TRACKING_STORAGE_KEY, params.toString());
  } catch {}
}

function getSavedTrackingParams() {
  try {
    return new URLSearchParams(localStorage.getItem(TRACKING_STORAGE_KEY) || window.location.search);
  } catch {
    return new URLSearchParams(window.location.search);
  }
}

function appendTrackingParams(url) {
  const target = new URL(url, window.location.href);
  const params = getSavedTrackingParams();

  params.forEach((value, key) => {
    if (!target.searchParams.has(key)) target.searchParams.set(key, value);
  });

  return target.toString();
}

function trackMetaEvent(eventName, params = {}, options = {}) {
  if (typeof window.fbq !== 'function') return;
  window.fbq('track', eventName, params, options);
}

function trackMetaEventOnce(storageKey, eventName, params = {}, options = {}) {
  try {
    if (sessionStorage.getItem(storageKey)) return;
    sessionStorage.setItem(storageKey, '1');
  } catch {}

  trackMetaEvent(eventName, params, options);
}

// One URL per screen, so Clarity (and the browser back/forward buttons) can
// tell each step of the quiz apart as its own page.
const STEP_PATHS = {
  welcome: '/',
  q1: '/pergunta-1',
  q2: '/pergunta-2',
  q3: '/pergunta-3',
  q4: '/pergunta-4',
  loading: '/analisando',
  result: '/resultado',
  offer: '/oferta',
  sales: '/comprar',
};
const PATH_STEPS = Object.fromEntries(Object.entries(STEP_PATHS).map(([k, v]) => [v, k]));

const STEP_TITLES = {
  welcome: 'Quiz Cachos · Ledebut',
  q1: 'Pergunta 1 de 4 · Quiz Cachos',
  q2: 'Pergunta 2 de 4 · Quiz Cachos',
  q3: 'Pergunta 3 de 4 · Quiz Cachos',
  q4: 'Pergunta 4 de 4 · Quiz Cachos',
  loading: 'Analisando seu cabelo · Quiz Cachos',
  result: 'Seu resultado · Quiz Cachos',
  offer: 'Oferta liberada · Quiz Cachos',
  sales: 'Garanta seu Creme Cachos · Ledebut',
};

function App() {
  const [step, setStep] = useStateA(() => PATH_STEPS[window.location.pathname] || 'welcome');
  const [answers, setAnswers] = useStateA({
    curvatura: null, espessura: null, frequencia: null, incomodo: null,
  });
  const sec = useCountdown(14 * 60 + 33);

  useEffectA(() => {
    saveTrackingParams();
  }, []);

  // Persist for refresh
  useEffectA(() => {
    try {
      if (PATH_STEPS[window.location.pathname]) return;
      const saved = JSON.parse(localStorage.getItem('ledebut-quiz') || 'null');
      if (saved) { setStep(saved.step); setAnswers(saved.answers); }
    } catch {}
  }, []);
  useEffectA(() => {
    localStorage.setItem('ledebut-quiz', JSON.stringify({ step, answers }));
  }, [step, answers]);

  // Keep the URL (and Clarity's page tracking) in sync with the current screen.
  useEffectA(() => {
    const path = STEP_PATHS[step] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ step }, '', path);
    }
    document.title = STEP_TITLES[step] || STEP_TITLES.welcome;
    if (typeof window.clarity === 'function') {
      window.clarity('set', 'quiz_step', step);
    }
  }, [step]);

  // Support the browser's back/forward buttons.
  useEffectA(() => {
    const onPopState = () => {
      const matched = PATH_STEPS[window.location.pathname];
      if (matched) setStep(matched);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll to top on step change
  useEffectA(() => {
    const root = document.getElementById('root');
    if (root) root.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [step]);

  const setAnswer = (k, v) => {
    setAnswers(a => ({ ...a, [k]: v }));
    // Auto-advance
    setTimeout(() => {
      const order = ['q1', 'q2', 'q3', 'q4'];
      const i = order.indexOf(step);
      if (i >= 0 && i < order.length - 1) setStep(order[i + 1]);
      else if (step === 'q4') setStep('loading');
    }, 220);
  };

  const prev = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };

  const progressFor = {
    welcome: null,
    q1: 12, q2: 30, q3: 48, q4: 66,
    loading: null, result: null, offer: null, sales: null,
  }[step];

  if (step === 'welcome') return <WelcomeScreen onStart={() => setStep('q1')} sec={sec} />;

  if (step === 'q1') return (
    <QuestionScreen
      progress={12}
      onBack={prev}
      eyebrow="Pergunta 1 de 4"
      title="Qual é o seu tipo de curvatura?"
      subtitle="Seu cabelo é mais..."
      imgLabel="mulheres com cabelos cacheados, crespos e ondulados"
      imgSrc="public/photo4.webp"
      imgRatio="16/9"
      value={answers.curvatura}
      onPick={(v) => setAnswer('curvatura', v)}
      options={[
        { value: '4', label: 'Crespo', sub: '4A — 4C', icon: <CurlIcon type="crespo" /> },
        { value: '3', label: 'Cacheado', sub: '3A — 3C', icon: <CurlIcon type="cacheado" /> },
        { value: '2', label: 'Ondulado', sub: '2A — 2C', icon: <CurlIcon type="ondulado" /> },
        { value: '1', label: 'Liso', sub: '1A — 1C', icon: <CurlIcon type="liso" /> },
      ]}
      footnote="Não sei meu tipo · descobrir depois"
    />
  );

  if (step === 'q2') return (
    <QuestionScreen
      progress={30}
      onBack={prev}
      eyebrow="Pergunta 2 de 4"
      title="Seu fio é mais fino ou mais grosso?"
      imgLabel="close em cabelo cacheado com uma mão segurando uma mecha"
      imgSrc="public/photo2.webp"
      imgRatio="16/9"
      value={answers.espessura}
      onPick={(v) => setAnswer('espessura', v)}
      options={[
        { value: 'fino', label: 'Fino', sub: 'pesa fácil com produto' },
        { value: 'medio', label: 'Médio', sub: 'aguenta bem cremes leves' },
        { value: 'grosso', label: 'Grosso', sub: 'aguenta mais cremes e produtos' },
      ]}
    />
  );

  if (step === 'q3') return (
    <QuestionScreen
      progress={48}
      onBack={prev}
      eyebrow="Pergunta 3 de 4"
      title="Com que frequência você lava (shampoo) na semana?"
      subtitle="A lavagem é importante, mas retira a hidratação natural dos fios — que precisa ser reposta."
      imgLabel="mulher lavando o cabelo no banho"
      imgSrc="public/photo3.webp"
      imgRatio="16/9"
      value={answers.frequencia}
      onPick={(v) => setAnswer('frequencia', v)}
      options={[
        { value: 'todos', label: 'Todos os dias' },
        { value: '3-mais', label: 'Mais de 3 vezes na semana' },
        { value: '3-menos', label: 'Menos de 3 vezes na semana' },
      ]}
    />
  );

  if (step === 'q4') return (
    <QuestionScreen
      progress={66}
      onBack={prev}
      eyebrow="Pergunta 4 de 4"
      title="O que te incomoda hoje no seu cabelo?"
      subtitle="Quando seca, o que no seu cabelo te deixa mais chateada?"
      imgLabel="três mulheres com expressão de dúvida sobre o cabelo"
      imgSrc="public/photo7.webp"
      imgRatio="16/9"
      value={answers.incomodo}
      onPick={(v) => setAnswer('incomodo', v)}
      options={[
        { value: 'frizz', label: 'Frizz', sub: 'cabelo arrepiado, sem controle' },
        { value: 'ressecado', label: 'Ressecado', sub: 'fios duros, sem brilho' },
        { value: 'sem-definicao', label: 'Sem definição', sub: 'cacho murcho, perde forma' },
        { value: 'tudo-isso', label: 'Tudo isso', sub: 'um pouco de cada coisa' },
      ]}
    />
  );

  if (step === 'loading') return <LoadingScreen onDone={() => setStep('result')} />;
  if (step === 'result')  return <ResultScreen answers={answers} onContinue={() => setStep('offer')} />;
  if (step === 'offer')   return <OfferScreen onClaim={() => setStep('sales')} onSeeSales={() => setStep('sales')} sec={sec} />;
  if (step === 'sales')   return <SalesPage onBack={() => setStep('offer')} onCheckout={() => alert('→ ir para checkout/oferta/WhatsApp')} sec={sec} />;

  return null;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
