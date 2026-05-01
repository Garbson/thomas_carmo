'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from './Icons';

const SERVICES = [
  {
    title: 'Curadoria & Tecnologia',
    desc: 'Utilizamos inteligência de dados para selecionar apenas imóveis com comprovado potencial de valorização, garantindo segurança e retorno no seu investimento.',
    featured: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Alta Valorização',
    desc: 'Itapema e Porto Belo são as cidades com maior valorização imobiliária do litoral brasileiro. Em média, os imóveis crescem acima de 20% ao ano, superando outras regiões.',
    featured: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Segurança & Assessoria',
    desc: 'Do pré-lançamento ao pós-venda, você conta com assessoria personalizada em cada etapa — com transparência, segurança jurídica e suporte completo.',
    featured: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

function ServiceCard({ title, desc, featured, icon, mobile = false }) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-500
        ${mobile
          ? 'flex-shrink-0 snap-center w-[82vw] p-8'
          : 'svc-card group p-[clamp(28px,3vw,40px)] hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,.4)]'}
        ${featured
          ? 'bg-navy border-navy-lt/50 hover:border-navy-lt'
          : 'bg-ink-2 border-white/[0.06] hover:border-navy/40'}
      `}
    >
      {!mobile && (
        <div className="scard-bg absolute inset-0 bg-gradient-to-br from-navy/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
      )}

      <div className={`
        relative w-14 h-14 rounded-xl flex items-center justify-center mb-6
        ${!mobile && 'transition-all group-hover:scale-105'}
        ${featured ? 'bg-navy-mid/60 text-gold' : `bg-navy/20 text-navy-lt ${!mobile && 'group-hover:bg-navy/40'}`}
      `}>
        {icon}
      </div>

      <h3 className="relative font-display text-2xl font-normal text-creme mb-3.5 leading-snug">{title}</h3>
      <p className="relative text-sm leading-[1.75] text-creme/50 mb-7">{desc}</p>

      <div className={`relative ${!mobile && 'transition-transform duration-300 group-hover:translate-x-1.5'} ${featured ? 'text-gold' : 'text-navy-lt'}`}>
        <ArrowIcon size={20} />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.section-header-srv > *', {
          y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#diferenciais', start: 'top 85%', once: true },
        });
        gsap.from('.svc-card', {
          y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.svc-mobile-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    setActiveCard(Math.round(track.scrollLeft / cardW));
  };

  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.svc-mobile-card');
    if (!cards[idx]) return;
    cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveCard(idx);
  };

  return (
    <section id="diferenciais" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-ink overflow-hidden">

      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="section-header-srv text-center mb-10 md:mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            Diferenciais
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-creme"
              style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
            Por que investir com Thomas Carmo?
          </h2>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-[clamp(20px,5vw,80px)]"
        >
          {SERVICES.map(({ title, desc, featured, icon }) => (
            <div key={title} className="svc-mobile-card snap-center flex-shrink-0 w-[82vw]">
              <ServiceCard title={title} desc={desc} featured={featured} icon={icon} mobile />
            </div>
          ))}
          <div className="flex-shrink-0 w-[9vw]" aria-hidden />
        </div>
        <div className="flex justify-center gap-2.5 mt-7">
          {SERVICES.map((_, i) => (
            <button key={i} onClick={() => scrollTo(i)} aria-label={`diferencial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCard ? 'w-8 bg-gold' : 'w-2.5 bg-white/25 hover:bg-white/45'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="svc-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ title, desc, featured, icon }) => (
            <ServiceCard key={title} title={title} desc={desc} featured={featured} icon={icon} />
          ))}
        </div>
      </div>

    </section>
  );
}
