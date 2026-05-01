'use client';
import { useState, useEffect } from 'react';
import { WaIcon } from './Icons';

const WA = 'https://wa.me/554789095599';

const NAV_ITEMS = [
  { label: 'Sobre',         href: '#sobre' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Galeria',      href: '#galeria' },
  { label: 'Plantas',      href: '#plantas' },
  { label: 'Contato',      href: '#contato' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-300 ${
          scrolled
            ? 'bg-ink shadow-[0_1px_0_rgba(255,255,255,.05)] py-3.5'
            : 'bg-ink shadow-[0_1px_0_rgba(255,255,255,.04)] py-[22px]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] flex items-center gap-10">
          {/* Logo */}
          <a href="#" className="flex flex-col flex-shrink-0 group">
            <span className="font-display text-creme font-light text-[18px] leading-tight tracking-[0.06em] group-hover:text-gold transition-colors">
              Thomas Carmo
            </span>
            <span className="text-[10px] text-creme/45 tracking-[0.22em] uppercase">Consultor Imobiliário</span>
          </a>

          {/* Nav */}
          <nav className="hidden lg:flex gap-9 ml-auto">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={href} href={href} onClick={(e) => scrollTo(e, href)}
                 className="nav-link relative text-[13px] text-creme/70 hover:text-creme transition-colors tracking-wide">
                {label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center ml-6 flex-shrink-0">
            <a href={WA} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-xs font-medium tracking-wider bg-creme text-ink px-[18px] py-[9px] rounded-lg transition-all hover:bg-creme-2 hover:-translate-y-px">
              <WaIcon size={14} />
              Fale comigo
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden ml-auto flex flex-col gap-[5px] p-1 w-[30px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-ink z-[700] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="text-center">
          <nav className="flex flex-col gap-7 mb-10">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={href} href={href} onClick={(e) => scrollTo(e, href)}
                 className="font-display text-[clamp(32px,6vw,44px)] font-light text-creme hover:text-gold transition-colors tracking-wide">
                {label}
              </a>
            ))}
          </nav>
          <a href={WA} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2.5 bg-navy text-creme text-sm font-medium tracking-wider px-7 py-3.5 rounded-lg border border-navy-mid">
            <WaIcon size={18} />
            Fale comigo no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
