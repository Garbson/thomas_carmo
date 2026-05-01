'use client';
import { useEffect, useRef } from 'react';

export default function Loader({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.classList.add('done');
      setTimeout(() => {
        ref.current && (ref.current.style.display = 'none');
        onDone?.();
      }, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      ref={ref}
      id="loader"
      className="fixed inset-0 bg-ink z-[9000] flex items-center justify-center flex-col"
    >
      <div className="loader-logo flex flex-col items-center gap-1">
        <span className="font-display text-creme font-light tracking-[0.12em]" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>
          Thomas Carmo
        </span>
        <span className="text-gold text-[11px] tracking-[0.35em] uppercase font-body">Consultor Imobiliário</span>
      </div>
      <div className="loader-bar w-40 h-px bg-white/10 overflow-hidden rounded mt-8 mb-4">
        <span />
      </div>
      <p className="loader-label text-[10px] tracking-[0.3em] uppercase text-creme/30 font-body">
        Litoral Catarinense
      </p>
    </div>
  );
}
