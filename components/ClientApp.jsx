'use client';
import { useCallback, useState } from 'react';
import Loader          from './Loader';
import Header          from './Header';
import HeroSection     from './HeroSection';
import StatsSection    from './StatsSection';
import AboutSection    from './AboutSection';
import ServicesSection from './ServicesSection';
import GallerySection  from './GallerySection';
import VideosSection   from './VideosSection';
import PlantasSection  from './PlantasSection';
import CtaBand         from './CtaBand';
import ContactSection  from './ContactSection';
import Footer          from './Footer';
import FloatWA         from './FloatWA';

export default function ClientApp() {
  const [loaded, setLoaded] = useState(false);
  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onDone={onLoaderDone} />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <VideosSection />
        <PlantasSection />
        <CtaBand />
        <ContactSection />
      </main>
      <Footer />
      <FloatWA />
    </>
  );
}
