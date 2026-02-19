import { lazy, Suspense, useRef, useState } from 'react';
import { CurtainOverlay } from './components/layout/CurtainOverlay';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CallToActionSection } from './components/sections/CallToActionSection';
import { HeroSection } from './components/sections/HeroSection';
import { ManifestoSection } from './components/sections/ManifestoSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { GsapReadyProvider } from './context/GsapContext';
import { services } from './data/services';
import { useGsapSetup } from './hooks/useGsapSetup';
import { useMainIntroAnimation } from './hooks/useMainIntroAnimation';

const PremiumBackground = lazy(async () => {
  const module = await import('./components/background/PremiumBackground');
  return { default: module.PremiumBackground };
});

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const isGsapReady = useGsapSetup();

  useMainIntroAnimation({ isGsapReady, mainRef });

  return (
    <GsapReadyProvider ready={isGsapReady}>
      <div
        ref={mainRef}
        className="bg-white text-gray-900 font-sans min-h-screen selection:bg-[#E5D4C0] selection:text-gray-900 overflow-x-hidden"
      >
        <CurtainOverlay />
        <Suspense fallback={null}>
          <PremiumBackground />
        </Suspense>

        <Header isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((prev) => !prev)} />

        <main>
          <HeroSection isGsapReady={isGsapReady} />
          <ServicesSection items={services} />
          <ManifestoSection />
          <CallToActionSection />
        </main>

        <Footer />
      </div>
    </GsapReadyProvider>
  );
}
