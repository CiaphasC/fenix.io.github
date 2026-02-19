import { useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseHeaderScrollTransitionParams {
  isGsapReady: boolean;
  isIntroActive: boolean;
  isMenuOpen: boolean;
  headerRef: MutableRefObject<HTMLElement | null>;
  shellRef: MutableRefObject<HTMLDivElement | null>;
  brandRef: MutableRefObject<HTMLDivElement | null>;
  ctaRef: MutableRefObject<HTMLButtonElement | null>;
}

/**
 * Replica el comportamiento del header del prototipo:
 * integrado al hero al inicio (más aire y marca destacada) y
 * compacto con barra blanca al hacer scroll.
 */
export function useHeaderScrollTransition({
  isGsapReady,
  isIntroActive,
  isMenuOpen,
  headerRef,
  shellRef,
  brandRef,
  ctaRef,
}: UseHeaderScrollTransitionParams): void {
  const isCompactRef = useRef<boolean | null>(null);

  useLayoutEffect(() => {
    if (
      !isGsapReady ||
      !headerRef.current ||
      !shellRef.current ||
      !brandRef.current ||
      isIntroActive
    ) {
      return;
    }

    const headerElement = headerRef.current;
    const shellElement = shellRef.current;
    const brandElement = brandRef.current;
    const ctaElement = ctaRef.current;
    let activeTimeline: gsap.core.Timeline | null = null;
    let resizeTimeoutId: number | null = null;

    const getResponsiveTokens = () => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;

      return {
        expandedPaddingY: isDesktop ? 32 : 18,
        compactPaddingY: isDesktop ? 12 : 10,
        expandedBrandScale: isDesktop ? 1.45 : 1.05,
        compactBrandScale: isDesktop ? 0.9 : 0.95,
      };
    };

    const applyState = (isCompact: boolean, immediate = false) => {
      if (isCompactRef.current === isCompact && !immediate) {
        return;
      }

      isCompactRef.current = isCompact;
      activeTimeline?.kill();
      const tokens = getResponsiveTokens();

      const containerVars = {
        backgroundColor: isCompact ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0)',
        borderColor: isCompact ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)',
        backdropFilter: isCompact ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: isCompact ? 'blur(20px)' : 'blur(0px)',
        boxShadow: isCompact ? '0 6px 20px rgba(17, 24, 39, 0.08)' : '0 0 0 rgba(17, 24, 39, 0)',
      };

      const shellVars = {
        paddingTop: isCompact ? tokens.compactPaddingY : tokens.expandedPaddingY,
        paddingBottom: isCompact ? tokens.compactPaddingY : tokens.expandedPaddingY,
      };

      const brandVars = {
        scale: isCompact ? tokens.compactBrandScale : tokens.expandedBrandScale,
      };

      const ctaVars = {
        backgroundColor: isCompact ? '#A08870' : '#111827',
      };

      if (immediate) {
        gsap.set(headerElement, {
          autoAlpha: 1,
          y: 0,
          pointerEvents: 'auto',
          ...containerVars,
        });
        gsap.set(shellElement, shellVars);
        gsap.set(brandElement, brandVars);
        if (ctaElement) {
          gsap.set(ctaElement, ctaVars);
        }
        return;
      }

      activeTimeline = gsap.timeline({
        defaults: {
          duration: isCompact ? 0.7 : 0.6,
          ease: 'power3.out',
        },
      });

      activeTimeline
        .to(headerElement, containerVars, 0)
        .to(shellElement, shellVars, 0)
        .to(brandElement, brandVars, 0);

      if (ctaElement) {
        activeTimeline.to(ctaElement, ctaVars, 0);
      }
    };

    applyState(window.scrollY > 50 || isMenuOpen, true);

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window) || 1,
      onUpdate: (self) => {
        applyState(self.scroll() > 50 || isMenuOpen);
      },
    });

    const handleResize = () => {
      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
      }

      resizeTimeoutId = window.setTimeout(() => {
        const shouldCompact = (window.scrollY > 50 || isMenuOpen) && !isIntroActive;
        applyState(shouldCompact, true);
      }, 120);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      activeTimeline?.kill();
      scrollTrigger.kill();
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
      }
    };
  }, [brandRef, ctaRef, headerRef, isGsapReady, isIntroActive, isMenuOpen, shellRef]);
}
