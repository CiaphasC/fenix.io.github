import { useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface UseHeaderScrollTransitionParams {
  isGsapReady: boolean;
  isIntroActive: boolean;
  headerRef: MutableRefObject<HTMLElement | null>;
}

/**
 * Mantiene el header visualmente integrado al hero en la parte superior.
 * Al superar un umbral de scroll, aparece una barra blanca con transición GSAP.
 */
export function useHeaderScrollTransition({
  isGsapReady,
  isIntroActive,
  headerRef,
}: UseHeaderScrollTransitionParams): void {
  const hasSolidBarRef = useRef(false);

  useLayoutEffect(() => {
    if (!isGsapReady || !headerRef.current || isIntroActive) {
      return;
    }

    const headerElement = headerRef.current;
    let activeTween: gsap.core.Tween | null = null;

    const animateHeaderBar = (showBar: boolean) => {
      if (showBar === hasSolidBarRef.current) {
        return;
      }

      hasSolidBarRef.current = showBar;
      activeTween?.kill();

      activeTween = gsap.to(headerElement, {
        backgroundColor: showBar ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0)',
        borderColor: showBar ? 'rgba(243,244,246,1)' : 'rgba(243,244,246,0)',
        backdropFilter: showBar ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: showBar ? 'blur(12px)' : 'blur(0px)',
        boxShadow: showBar ? '0 6px 20px rgba(17, 24, 39, 0.06)' : '0 0 0 rgba(17, 24, 39, 0)',
        duration: showBar ? 0.55 : 0.4,
        ease: showBar ? 'power3.out' : 'power2.inOut',
      });
    };

    gsap.set(headerElement, {
      autoAlpha: 1,
      y: 0,
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: 'rgba(243,244,246,0)',
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      boxShadow: '0 0 0 rgba(17, 24, 39, 0)',
      pointerEvents: 'auto',
    });

    animateHeaderBar(window.scrollY > 72);

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: () => ScrollTrigger.maxScroll(window) || 1,
      onUpdate: (self) => {
        animateHeaderBar(self.scroll() > 72);
      },
    });

    return () => {
      activeTween?.kill();
      scrollTrigger.kill();
    };
  }, [headerRef, isGsapReady, isIntroActive]);
}
