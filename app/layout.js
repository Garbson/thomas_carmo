import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Thomas Carmo | Consultor Imobiliário – Litoral Catarinense',
  description: 'Especialista em investimentos imobiliários no litoral de Santa Catarina. Lançamentos exclusivos em Itapema e Porto Belo com alta valorização.',
  keywords: 'corretor imóveis Itapema, Porto Belo, Santa Catarina, lançamentos, investimento imobiliário, Thomas Carmo',
  icons: {
    icon: '/images/icon.png',
  },
  openGraph: {
    title: 'Thomas Carmo | Investimentos Imobiliários',
    description: 'A maior valorização do litoral catarinense. Assessoria personalizada em Itapema e Porto Belo.',
    images: ['/images/thomas.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-creme-3 text-text overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
