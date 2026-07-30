// Screen 8: Offer + Sales Page
const { useState: useStateO, useEffect: useEffectO } = React;

// ─────────────────────────────────────────────────────────────
// Screen 8: Oferta liberada
// ─────────────────────────────────────────────────────────────
function OfferScreen({ onClaim, onSeeSales, sec }) {
  useEffectO(() => {
    trackMetaEventOnce('ledebut_quiz_complete_tracked', 'CompleteRegistration', {
      content_name: 'Quiz Cachos Ledebut',
      content_category: 'quiz',
      product: 'Cachos 1L',
    });
  }, []);

  return (
    <div className="screen-enter">
      <TopBar progress={100} />
      <div style={{ padding: '18px 20px 28px' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <span className="chip">✓ Compatível com seu cabelo</span>
        </div>

        <h2 className="h2" style={{ textAlign: 'center', margin: '0 0 10px' }}>
          Acesso Liberado ao Creme Cachos<br/>direto da <span style={{ color: 'var(--green-600)' }}>FÁBRICA</span>!
        </h2>
        <p className="body" style={{ textAlign: 'center', margin: '0 0 6px' }}>
          Pelo seu resultado e pelo jeito que você gosta de usar, o <b>Creme Cachos 1L</b> é sim perfeito pra você.
        </p>
        <p className="body" style={{ textAlign: 'center', margin: '0 0 18px' }}>
          E como você mostrou que precisa do produto, liberamos a compra direto da fábrica com um super desconto: até <b style={{ color: 'var(--green-600)' }}>50% OFF</b>.
        </p>

        <button onClick={onSeeSales} className="btn-primary pulse" style={{ marginBottom: 16 }}>
          Quero a oferta da fábrica →
        </button>

        {/* Video block */}
        <VideoBlock src="public/video1.mp4" autoPlay />

        {/* Timer card */}
        <div style={{
          marginTop: 16, padding: 14,
          background: 'var(--warn-bg)', border: '1px solid var(--warn-bd)',
          borderRadius: 14, textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, color: 'var(--warn-fg)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
            Oferta por tempo limitado
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 32, fontWeight: 700, color: 'var(--warn-fg)', letterSpacing: '0.04em' }}>
            {formatMMSS(sec)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--warn-fg)', opacity: 0.85, marginTop: 2 }}>
            Depois desse tempo o desconto pode acabar
          </div>
        </div>

        {/* Bullets */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Hidratação profunda que dura a semana inteira',
            'Define o cacho sem deixar o cabelo pesado',
            'Controla o frizz mesmo em dias úmidos',
            'Rende muito — 1L para 4-6 meses de uso',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{
                flexShrink: 0, width: 20, height: 20, borderRadius: 999,
                background: 'var(--green-50)', color: 'var(--green-600)',
                display: 'grid', placeItems: 'center', marginTop: 1,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <span style={{ fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.45 }}>{t}</span>
            </div>
          ))}
        </div>

        <button onClick={onSeeSales} className="btn-primary" style={{ marginTop: 20 }}>
          Quero a oferta da fábrica →
        </button>
        <p className="small" style={{ textAlign: 'center', marginTop: 10 }}>
          🚚 Frete grátis sob consulta · 🛡️ Garantia 30 dias · 💳 Em até 12x
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sales Page (after offer)
// ─────────────────────────────────────────────────────────────
const ORDER_BUMP_CODE = 'CA9W3YSQ53';

function SalesPage({ onBack, onCheckout, sec }) {
  const sec1 = sec;
  const sec2 = sec;
  const [picked, setPicked] = useStateO('3un');
  const [stock] = useStateO(23);
  const [showBump, setShowBump] = useStateO(false);

  const checkoutUrls = {
    '1un': 'https://seguro.ledebut.com.br/r/9KYGYAMKZF:1',
    '2un': 'https://seguro.ledebut.com.br/r/9KYGYAMKZF:2',
    '3un': 'https://seguro.ledebut.com.br/r/9KYGYAMKZF:3',
  };

  const goCheckout = (withBump) => {
    trackMetaEvent('InitiateCheckout', {
      content_name: 'Cachos 1L',
      content_category: 'quiz',
      variant: picked,
      order_bump: withBump,
      currency: 'BRL',
    });

    const url = withBump
      ? `${checkoutUrls[picked]},${ORDER_BUMP_CODE}:1`
      : checkoutUrls[picked];

    setShowBump(false);
    window.open(appendTrackingParams(url), '_blank');
  };

  const acceptBump = () => goCheckout(true);
  const declineBump = () => goCheckout(false);

  const scrollToOffer = () => document.getElementById('oferta-section').scrollIntoView({ behavior: 'smooth' });

  const goWhatsapp = () => {
    const msg = encodeURIComponent('Oi, vim pelo quiz da Ledebut e quero garantir o Creme Cachos com preço de fábrica.');
    window.open(`https://wa.me/7183143408?text=${msg}`, '_blank');
  };

  return (
    <div className="screen-enter">
      <TopBar onBack={onBack} canBack />

      {/* Sticky stock alert */}
      <div style={{
        background: 'var(--ink-900)', color: 'white',
        padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, fontSize: 12, fontWeight: 600,
      }}>
        <span className="live-dot" style={{ background: '#fb923c', boxShadow: '0 0 0 0 rgba(251,146,60,.5)' }} />
        Apenas <b style={{ color: '#fbbf24' }}>{stock} unidades</b> liberadas com esse preço
      </div>

      {/* SEÇÃO 1: Oferta */}
      <div id="oferta-section" style={{ padding: '24px 20px', background: 'var(--ink-50)' }}>
        <div className="card" style={{ background: 'white', padding: 18, marginBottom: 16, position: 'relative' }}>
          <div style={{ fontSize: 11, color: 'var(--green-600)', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            ★ É febre entre cacheadas
          </div>
          <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, margin: 0, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>
            "É o creme que tá virando febre porque define sem pesar e deixa o cacho com cara de salão."
          </p>
        </div>

        <h3 className="h3" style={{ textAlign: 'center', margin: '0 0 4px' }}>
          Creme Cachos Profissional de 1 litro
        </h3>
        <p style={{ textAlign: 'center', fontSize: 14, margin: '0 0 16px', color: 'var(--ink-500)' }}>
          de <span style={{ textDecoration: 'line-through', color: 'var(--red)' }}>R$ 110,00</span> por apenas:
        </p>

        {/* Opções de oferta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <PricingOption
            picked={picked === '1un'}
            onPick={() => setPicked('1un')}
            imgSrc="public/product.webp"
            qty="1 Unidade"
            off="36% OFF"
            originalPrice="R$ 110,00"
            price="R$ 69,90"
            sub="Creme Cachos 1L"
          />
          <PricingOption
            picked={picked === '2un'}
            onPick={() => setPicked('2un')}
            imgSrc="public/product2.webp"
            qty="2 Unidades"
            off="45% OFF"
            originalPrice="R$ 110,00"
            price="R$ 59,99"
            priceSub="/un · total R$ 119,98"
            sub="2x Creme Cachos 1L"
          />
          <PricingOption
            picked={picked === '3un'}
            onPick={() => setPicked('3un')}
            imgSrc="public/product3.webp"
            qty="3 Unidades"
            off="45% OFF"
            originalPrice="R$ 110,00"
            price="R$ 59,99"
            priceSub="/un · total R$ 179,97"
            sub="3x Creme Cachos 1L · Frete grátis sob consulta"
            ribbon="MELHOR OFERTA"
          />
        </div>

        {/* Timer */}
        <div style={{
          marginTop: 16, padding: 12,
          background: 'var(--warn-bg)', border: '1px solid var(--warn-bd)',
          borderRadius: 12, textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, color: 'var(--warn-fg)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            ⏱ Oferta por tempo limitado
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: 'var(--warn-fg)' }}>
            {formatMMSS(sec1)}
          </div>
        </div>

        <button onClick={() => setShowBump(true)} className="btn-primary pulse" style={{ marginTop: 16 }}>
          Garantir oferta →
        </button>

        {/* Payment methods */}
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {['Pix', 'Boleto', 'Visa', 'Master', 'Elo', 'AmEx'].map(m => (
            <span key={m} style={{
              fontSize: 11, fontWeight: 600, color: 'var(--ink-500)',
              padding: '4px 10px', background: 'white',
              border: '1px solid var(--ink-200)', borderRadius: 6,
            }}>{m}</span>
          ))}
        </div>
        <p className="small" style={{ textAlign: 'center', marginTop: 8 }}>
          🚚 Frete grátis sob consulta no kit de 3 unidades
        </p>
      </div>

      {/* SEÇÃO 2: Foto + Vídeo + chamada */}
      <div style={{ padding: '28px 20px' }}>
        <h2 className="h2" style={{ textAlign: 'center', margin: '0 0 8px' }}>
          Resultado de salão em casa
        </h2>
        <p className="body" style={{ textAlign: 'center', margin: '0 0 16px' }}>
          Cachos definidos, hidratados e sem frizz — do jeito que você sempre quis, sem sair de casa.
        </p>
        <ImgPlaceholder src="public/photo6.webp" label="modelo cacheada segurando o Creme Cachos Ledebut" ratio="4/5" />

        <h2 className="h2" style={{ textAlign: 'center', margin: '24px 0 10px' }}>
          Garanta o seu <span style={{ color: 'var(--green-600)' }}>Creme Cachos</span> com preço de FÁBRICA
        </h2>
        <p className="body" style={{ textAlign: 'center', margin: '0 0 18px' }}>
          Faça parte das mais de <b>20mil cacheadas</b> que transformaram seus cachos com o Creme Cachos Profissional.
        </p>
        <VideoBlock src="public/video2.mp4" />
        <button onClick={scrollToOffer} className="btn-primary" style={{ marginTop: 18 }}>
          Quero garantir o desconto →
        </button>
      </div>

      {/* SEÇÃO 4: Depoimentos */}
      <div style={{ padding: '28px 20px', background: 'var(--ink-50)' }}>
        <div className="eyebrow" style={{ textAlign: 'center', marginBottom: 4 }}>O QUE ELAS ESTÃO FALANDO</div>
        <h3 className="h3" style={{ textAlign: 'center', margin: '0 0 18px' }}>+20mil cacheadas já transformaram seus cachos</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Testimonial
            name="Rafaela Oliveira"
            handle="@oliveiraffa"
            avatar="public/profile1.webp"
            text="Eu nunca tinha usado um produto profissional, achava que seria super caro! Muito bom vocês liberarem direto da fábrica, estou apaixonada pelo produto."
          />
          <Testimonial
            name="Anna Guedes"
            handle="@annaluzisaguedes"
            avatar="public/profile2.webp"
            text="Que produto maravilhoso! Rende muito, tô usando sempre e a cada uso parece que meus cachos ficam ainda mais lindos. Amando!"
          />
          <Testimonial
            name="Mariana Costa"
            handle="@mari.costa"
            avatar="public/profile3.webp"
            text="Comprei na dúvida e foi a melhor escolha. Definição que dura 3 dias sem retoque. Já tô comprando o segundo!"
          />
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 28 }}>
          <h3 className="h3" style={{ textAlign: 'center', margin: '0 0 12px' }}>Perguntas frequentes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <FAQ q="Funciona em todos os tipos de cacho?" a="Sim! O Creme Cachos foi desenvolvido para curvaturas 2A até 4C — onduladas, cacheadas e crespas." />
            <FAQ q="Em quanto tempo chega?" a="Enviamos em até 24h úteis. Entrega entre 3 e 7 dias úteis para todo o Brasil, com frete grátis sob consulta." />
            <FAQ q="E se eu não gostar?" a="Garantia de 7 dias. Não gostou, devolvemos seu dinheiro — sem pergunta." />
            <FAQ q="O produto pesa o cabelo?" a="Não. A fórmula é leve, define o cacho e dá maciez sem efeito pesado ou oleoso." />
          </div>
        </div>

        {/* Timer + final CTA */}
        <div style={{
          marginTop: 24, padding: 14,
          background: 'var(--warn-bg)', border: '1px solid var(--warn-bd)',
          borderRadius: 12, textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, color: 'var(--warn-fg)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            ⏱ Oferta por tempo limitado
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: 'var(--warn-fg)' }}>
            {formatMMSS(sec2)}
          </div>
        </div>

        <button onClick={scrollToOffer} className="btn-primary pulse" style={{ marginTop: 14 }}>
          Quero aproveitar a oferta →
        </button>
        <button onClick={goWhatsapp} style={{
          width: '100%', marginTop: 10, padding: '14px 18px',
          background: 'white', color: '#075e54',
          border: '1.5px solid #25d366', borderRadius: 999,
          fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1 2.7.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.4.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.3-1.3c1.4.7 3 1.1 4.7 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
          Falar no WhatsApp
        </button>

        <div style={{ marginTop: 24, padding: 14, background: 'white', border: '1px solid var(--ink-200)', borderRadius: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999, background: 'var(--green-50)',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Garantia incondicional de 7 dias</div>
            <div className="small">Não gostou em 7 dias? Devolvemos seu dinheiro — sem pergunta.</div>
          </div>
        </div>

        <p className="small" style={{ textAlign: 'center', marginTop: 28, color: 'var(--ink-400)' }}>
          © Ledebut · Compra 100% segura
        </p>
      </div>

      {showBump && (
        <OrderBumpModal onAccept={acceptBump} onDecline={declineBump} onClose={() => setShowBump(false)} />
      )}
    </div>
  );
}

function OrderBumpModal({ onAccept, onDecline, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="card pop-in" style={{ width: '100%', maxWidth: 380, padding: 20, position: 'relative' }}>

        <button onClick={onClose} aria-label="Fechar" style={{
          position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: 999,
          background: 'var(--ink-50)', display: 'grid', placeItems: 'center', color: 'var(--ink-700)', zIndex: 1,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <h3 className="h2" style={{ textAlign: 'center', margin: '0 28px 8px', color: 'var(--green-600)' }}>
          Combine com 44% OFF
        </h3>

        <p className="small" style={{ textAlign: 'center', margin: '0 0 14px' }}>
          Parabéns! Você desbloqueou um desconto extra no nosso Kit Cachos Completo:
        </p>

        <div style={{
          padding: '10px 12px', marginBottom: 16,
          background: 'var(--warn-bg)', border: '1px solid var(--warn-bd)',
          borderRadius: 10, display: 'flex', gap: 8, alignItems: 'flex-start', textAlign: 'left',
        }}>
          <span>🔔</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--warn-fg)', lineHeight: 1.4 }}>
            Essa oferta só aparece aqui e vai expirar quando você sair desta página
          </span>
        </div>

        <div style={{ border: '1px solid var(--ink-200)', borderRadius: 14, padding: 10, marginBottom: 14 }}>
          <ImgPlaceholder
            src="public/orderbump.webp"
            label="Kit Cachos Complementar"
            ratio="1/1"
            style={{ width: '100%', borderRadius: 10 }}
          />
        </div>

        <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3, marginBottom: 8 }}>
          Kit Cachos Complementar — Shampoo, Máscara e Reparador de Pontas
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 14, color: 'var(--ink-400)', textDecoration: 'line-through' }}>R$ 225,00</span>
          <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink-900)' }}>R$ 125,00</span>
          <span style={{
            background: 'var(--green-50)', color: 'var(--green-700)',
            padding: '2px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700,
          }}>-44%</span>
        </div>

        <p className="small" style={{ margin: '0 0 18px' }}>
          Rotina completa Ledebut pro cacho definido, nutrido e sem frizz: shampoo, máscara e reparador de pontas juntos pra cuidar do fio da raiz até a ponta.
        </p>

        <button onClick={onAccept} className="btn-primary pulse">
          FINALIZAR COM 44% OFF
        </button>
        <button onClick={onDecline} style={{
          width: '100%', marginTop: 10, padding: '13px 18px', textAlign: 'center',
          background: 'white', color: 'var(--ink-700)',
          border: '1.5px solid var(--ink-200)', borderRadius: 999,
          fontWeight: 700, fontSize: 13,
        }}>
          NÃO, OBRIGADO
        </button>
      </div>
    </div>
  );
}

function PricingOption({ picked, onPick, imgSrc, qty, off, originalPrice, price, priceSub, sub, ribbon }) {
  return (
    <button onClick={onPick} className={`card-option ${picked ? 'selected' : ''}`}
      style={{
        position: 'relative',
        background: 'white',
        border: '2px solid ' + (picked ? 'var(--green-500)' : 'var(--ink-200)'),
        borderRadius: 16, padding: '14px',
        display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
      }}>
      {ribbon && <span style={{
        position: 'absolute', top: -10, right: 12,
        background: 'var(--green-500)', color: 'white',
        fontSize: 10, fontWeight: 800, letterSpacing: '.08em',
        padding: '4px 10px', borderRadius: 999,
      }}>{ribbon}</span>}

      <span style={{
        width: 20, height: 20, borderRadius: 999, flexShrink: 0,
        border: picked ? '6px solid var(--green-500)' : '2px solid var(--ink-200)',
        background: 'white',
      }} />

      <img src={imgSrc} alt={qty} style={{
        width: 56, height: 56, objectFit: 'contain', flexShrink: 0, borderRadius: 8,
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>{qty}</span>
          <span style={{
            background: 'var(--green-50)', color: 'var(--green-700)',
            padding: '2px 7px', borderRadius: 999, fontSize: 11, fontWeight: 700,
          }}>{off}</span>
        </div>
        {originalPrice && (
          <div style={{ fontSize: 11, color: 'var(--ink-400)', textDecoration: 'line-through', marginTop: 1 }}>
            de {originalPrice}
          </div>
        )}
        <div className="small" style={{ marginTop: 2 }}>{sub}</div>
      </div>

      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink-900)' }}>{price}</div>
        {priceSub && <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>{priceSub}</div>}
      </div>
    </button>
  );
}

function Testimonial({ name, handle, text, avatar }) {
  return (
    <div className="card" style={{ background: 'white' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
        {avatar
          ? <img src={avatar} alt={name} style={{ width: 36, height: 36, borderRadius: 999, objectFit: 'cover', flexShrink: 0 }} />
          : <div style={{
              width: 36, height: 36, borderRadius: 999,
              background: 'linear-gradient(135deg, #f0abfc, #c084fc)',
              display: 'grid', placeItems: 'center', color: 'white', fontWeight: 700, fontSize: 14,
            }}>{name[0]}</div>
        }
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700, fontSize: 13 }}>
            {name}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e"><path d="M12 2L9.5 8.5 3 9l5 4.5L6.5 20 12 16.5 17.5 20 16 13.5 21 9l-6.5-.5z"/></svg>
          </div>
          <div className="small" style={{ marginTop: -1 }}>{handle}</div>
        </div>
        <div style={{ display: 'flex', gap: 1 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#facc15', fontSize: 13 }}>★</span>)}
        </div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: 0, color: 'var(--ink-700)' }}>"{text}"</p>
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useStateO(false);
  return (
    <div style={{
      background: 'white', border: '1px solid var(--ink-200)', borderRadius: 12, overflow: 'hidden',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 10,
        textAlign: 'left',
      }}>
        <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{q}</span>
        <span style={{
          width: 22, height: 22, borderRadius: 999, background: 'var(--ink-50)',
          display: 'grid', placeItems: 'center', flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-700)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </button>
      {open && (
        <div className="screen-enter" style={{ padding: '0 14px 14px', fontSize: 13.5, color: 'var(--ink-700)', lineHeight: 1.5 }}>{a}</div>
      )}
    </div>
  );
}

Object.assign(window, { OfferScreen, SalesPage });
