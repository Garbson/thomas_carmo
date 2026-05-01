'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { WaIcon, PinIcon } from './Icons';

const WA = 'https://wa.me/554789095599';

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.about-photo', {
          y: 30, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#sobre', start: 'top 85%', once: true },
        });
        gsap.from('.about-text > *', {
          y: 30, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#sobre', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-3">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,7vw,100px)] items-center max-w-[580px] lg:max-w-none mx-auto">

          {/* Photo */}
          <div className="about-photo relative order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/thomas.png"
                alt="Thomas Carmo – Consultor Imobiliário"
                width={560} height={747}
                className="w-full aspect-[3/4] object-cover object-top rounded-2xl brightness-95 saturate-90"
                loading="lazy"
              />
              <div className="hidden sm:block absolute top-5 left-[-20px] right-5 bottom-[-20px] border border-navy/30 rounded-2xl pointer-events-none -z-10" />
              <div className="absolute bottom-[-20px] right-0 sm:right-[-10px] bg-navy text-creme text-xs tracking-wide px-[18px] py-3 rounded-lg flex items-center gap-2 shadow-[0_8px_32px_rgba(30,58,95,.5)]">
                <PinIcon size={14} />
                Itapema & Porto Belo, SC
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text order-1 lg:order-2 flex flex-col gap-0">
            <p className="section-tag flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-navy-mid mb-5">
              Sobre mim
            </p>
            <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-7"
                style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
              Especialista em investimentos no litoral de Santa Catarina
            </h2>
            <p className="text-[15px] leading-[1.75] text-muted mb-4">
              Com mais de 10 anos de atuação no mercado imobiliário do litoral catarinense, auxiliei centenas de investidores a encontrar oportunidades reais de valorização em Itapema e Porto Belo.
            </p>
            <p className="text-[15px] leading-[1.75] text-muted mb-4">
              Nossas propriedades passam por uma criteriosa curadoria, garantindo não apenas segurança no investimento, mas também retornos consistentes e previsíveis — apenas imóveis com comprovado potencial de crescimento.
            </p>
            <p className="text-[15px] leading-[1.75] text-muted mb-9">
              Combinando tecnologia, inteligência de mercado e assessoria personalizada, ofereço a melhor experiência para quem deseja investir com segurança no litoral mais valorizado do Brasil.
            </p>
            <a href={WA} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2.5 self-start bg-navy text-creme text-sm font-medium tracking-wide px-7 py-3.5 rounded-lg border border-navy-mid transition-all hover:bg-navy-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,58,95,.4)]">
              <WaIcon size={18} />
              Conversar agora
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
