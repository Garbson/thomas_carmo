'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const IMAGES = [
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-2.png',
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-3.png',
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-4.png',
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-5.png',
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-7.png',
  'https://selcor.com.br/wp-content/uploads/2025/02/Prancheta-8.png',
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.gallery-header > *', {
          y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#galeria', start: 'top 85%', once: true },
        });
        gsap.from('.gallery-item', {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 88%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="galeria" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-2 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">

        <div className="gallery-header text-center mb-12">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-navy-mid mb-5">
            Lançamentos
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-4"
              style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
            Galeria de <em className="italic text-gold">Empreendimentos</em>
          </h2>
          <p className="text-base leading-relaxed text-muted max-w-[540px] mx-auto">
            Estilo e design em total convivência com o melhor do litoral catarinense.
          </p>
        </div>

        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map((src, i) => (
            <button
              key={src}
              className="gallery-item group relative overflow-hidden rounded-xl aspect-[4/3] bg-black/5 cursor-zoom-in"
              onClick={() => setLightbox(i)}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image
                src={src}
                alt={`Empreendimento ${i + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9500] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Fechar"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={IMAGES[lightbox]}
              alt={`Empreendimento ${lightbox + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length); }}
            aria-label="Anterior"
          >‹</button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % IMAGES.length); }}
            aria-label="Próxima"
          >›</button>
        </div>
      )}
    </section>
  );
}
