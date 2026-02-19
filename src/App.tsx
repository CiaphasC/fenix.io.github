import { lazy, Suspense, useCallback, useRef, useState } from 'react';
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
import { useScrollLock } from './hooks/useScrollLock';

const PremiumBackground = lazy(async () => {
  const module = await import('./components/background/PremiumBackground');
  return { default: module.PremiumBackground };
});

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const isGsapReady = useGsapSetup();
  const handleCurtainComplete = useCallback(() => {
    setIsIntroActive(false);
  }, []);

  useMainIntroAnimation({
    isGsapReady,
    mainRef,
    onCurtainComplete: handleCurtainComplete,
  });
  useScrollLock(isIntroActive);

  return (
    <GsapReadyProvider ready={isGsapReady}>
      <div
        ref={mainRef}
        className="bg-white text-gray-900 font-sans min-h-screen selection:bg-[#E5D4C0] selection:text-gray-900 overflow-x-hidden"
      >
        <CurtainOverlay isActive={isIntroActive} />
        <Suspense fallback={null}>
          <PremiumBackground />
        </Suspense>

        <Header
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
          isGsapReady={isGsapReady}
          isIntroActive={isIntroActive}
        />

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
