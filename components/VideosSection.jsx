'use client';
import { useEffect, useRef } from 'react';

const VIDEOS = [
  { src: '/videos/video_thomas_01.mp4', label: 'Conheça o mercado' },
  { src: '/videos/video_thomas.mp4',    label: 'Por que investir aqui' },
];

export default function VideosSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.videos-header > *', {
          y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#videos', start: 'top 85%', once: true },
        });
        gsap.from('.video-card', {
          y: 40, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.video-grid', start: 'top 88%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="videos" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-3">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">

        <div className="videos-header text-center mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-navy-mid mb-5">
            Conteúdo
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-4"
              style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
            Assista e <em className="italic text-gold">Saiba Mais</em>
          </h2>
          <p className="text-base leading-relaxed text-muted max-w-[540px] mx-auto">
            Entenda por que Itapema e Porto Belo são as melhores escolhas para o seu próximo investimento.
          </p>
        </div>

        {/* Portrait videos side by side, centered */}
        <div className="video-grid flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
          {VIDEOS.map(({ src, label }) => (
            <div
              key={src}
              className="video-card flex flex-col items-center gap-4 w-full sm:w-auto"
            >
              {/* Label above */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted">{label}</span>
              </div>

              {/* Video container — portrait 9:16 */}
              <div className="relative w-[260px] sm:w-[240px] md:w-[280px] lg:w-[300px] rounded-2xl overflow-hidden border-2 border-ink/10 shadow-[0_16px_48px_rgba(0,0,0,.15)] bg-black">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full block"
                  style={{ aspectRatio: '9/16' }}
                >
                  <source src={src} type="video/mp4" />
                  Seu navegador não suporta vídeo.
                </video>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
