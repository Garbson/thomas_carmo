'use client';
import { WaIcon, IgIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-ink pt-16">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] pb-12 border-b border-white/[0.06] flex flex-wrap gap-10 justify-between items-start">

        {/* Brand */}
        <div className="max-w-sm">
          <p className="font-display text-creme text-xl font-light tracking-wide mb-1">Thomas Carmo</p>
          <p className="text-[11px] text-gold tracking-[0.2em] uppercase mb-3">Consultor Imobiliário</p>
          <p className="text-creme/40 text-xs leading-snug">
            Especialista em investimentos de alta valorização no litoral catarinense — Itapema & Porto Belo, SC.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3">
          {[
            { label: 'Sobre',         href: '#sobre' },
            { label: 'Diferenciais', href: '#diferenciais' },
            { label: 'Galeria',      href: '#galeria' },
            { label: 'Plantas',      href: '#plantas' },
            { label: 'Contato',      href: '#contato' },
          ].map(({ label, href }) => (
            <a key={href} href={href} className="text-creme/50 hover:text-creme text-xs transition-colors">
              {label}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-3 items-center">
          {[
            { href: 'https://wa.me/554789095599', Icon: WaIcon, label: 'WhatsApp' },
            { href: 'https://instagram.com/thomascarmo_imoveis', Icon: IgIcon, label: 'Instagram' },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
               className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-creme/50 hover:text-creme hover:border-white/30 hover:-translate-y-0.5 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="py-5 text-center">
        <p className="text-creme/25 text-xs">
          © {year} Thomas Carmo – Consultor Imobiliário. Todos os direitos reservados.
        </p>
        <a
          href="https://wa.me/5568992490198"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 text-[11px] text-creme/20 hover:text-creme/40 transition-colors"
        >
          Desenvolvido por GS Solutions
        </a>
      </div>
    </footer>
  );
}
