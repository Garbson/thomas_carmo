'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PLANTAS = [
  { src: 'https://admin.dallo.com.br/uploads/plant/74/63e52795eed1b8.88662023.jpg', alt: 'Planta 1' },
  { src: 'https://admin.dallo.com.br/uploads/plant/76/63e52ab027f201.56833273.jpg', alt: 'Planta 2' },
  { src: 'https://admin.dallo.com.br/uploads/plant/73/63e4ff63ba2894.91144102.jpg', alt: 'Planta 3' },
  { src: 'https://admin.dallo.com.br/uploads/plant/75/63e5286b63db56.66728504.jpg', alt: 'Planta 4' },
  { src: 'https://admin.dallo.com.br/uploads/plant/89/664f38f0317bf8.58788370.jpg', alt: 'Planta 5' },
  { src: 'https://onlifeflamengo.com.br/wp-content/uploads/2023/10/planta6.jpg',    alt: 'Planta 6' },
];

export default function PlantasSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.plantas-header > *', {
          y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#plantas', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  const prev = () => setActive((active - 1 + PLANTAS.length) % PLANTAS.length);
  const next = () => setActive((active + 1) % PLANTAS.length);

  return (
    <section id="plantas" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-3">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">

        <div className="plantas-header text-center mb-12">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-navy-mid mb-5">
            Plantas
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-4"
              style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
            Plantas dos <em className="italic text-gold">Empreendimentos</em>
          </h2>
          <p className="text-base leading-relaxed text-muted max-w-[540px] mx-auto">
            Conheça os detalhes de cada empreendimento e encontre o imóvel ideal para o seu investimento.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/5 shadow-[0_20px_60px_rgba(0,0,0,.12)]">
            {PLANTAS.map(({ src, alt }, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>
            ))}

            {/* Nav buttons */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/50 text-creme border border-white/20 text-xl flex items-center justify-center hover:bg-ink/70 transition-colors backdrop-blur-sm"
              aria-label="Anterior"
            >‹</button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/50 text-creme border border-white/20 text-xl flex items-center justify-center hover:bg-ink/70 transition-colors backdrop-blur-sm"
              aria-label="Próxima"
            >›</button>

            {/* Counter */}
            <div className="absolute top-3 right-3 bg-ink/60 text-creme text-xs tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">
              {active + 1} / {PLANTAS.length}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {PLANTAS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-navy' : 'w-2.5 bg-black/20 hover:bg-black/35'
                }`}
                aria-label={`planta ${i + 1}`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="hidden md:flex gap-3 mt-4 justify-center">
            {PLANTAS.map(({ src, alt }, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === active ? 'border-gold scale-105' : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <Image src={src} alt={alt} fill className="object-cover" loading="lazy" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
