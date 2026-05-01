'use client';
import { useEffect, useRef } from 'react';
import { WaIcon } from './Icons';

const WA = 'https://wa.me/554789095599';

export default function CtaBand() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.cta-inner > *', {
          y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '#cta-band', start: 'top 80%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="cta-band" ref={sectionRef} className="relative py-[clamp(80px,12vw,160px)] overflow-hidden bg-ink">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/40 via-ink to-ink-2" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy-lt/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* Decorative orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-navy opacity-20 blur-[120px] pointer-events-none" />

      <div className="cta-inner relative z-10 max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] text-center">
        <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
          Investimento
        </p>
        <h2 className="font-display font-light text-creme leading-[1.15] tracking-tight max-w-[700px] mx-auto mb-4"
            style={{ fontSize: 'clamp(28px,4vw,56px)' }}>
          A transformação que torna Itapema e Porto Belo{' '}
          <em className="italic text-gold">referências de investimento</em>
        </h2>
        <p className="text-creme/55 text-base mb-10 max-w-[520px] mx-auto leading-relaxed">
          Pronto para investir no litoral catarinense? Entre em contato e descubra as melhores oportunidades disponíveis.
        </p>
        <a href={WA} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2.5 bg-navy text-creme text-sm font-medium tracking-wide px-10 py-5 rounded-lg border border-navy-mid transition-all hover:bg-navy-mid hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(30,58,95,.5)]">
          <WaIcon size={20} />
          Fale comigo agora
        </a>
      </div>
    </section>
  );
}
