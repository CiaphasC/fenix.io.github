import { useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { gsap } from 'gsap';

interface UseMainIntroAnimationParams {
  isGsapReady: boolean;
  mainRef: MutableRefObject<HTMLDivElement | null>;
  onCurtainComplete?: () => void;
}

/**
 * Timeline principal: cortina de entrada + secuencia del hero.
 * Se encapsula en un hook para mantener el componente App limpio.
 */
export function useMainIntroAnimation({
  isGsapReady,
  mainRef,
  onCurtainComplete,
}: UseMainIntroAnimationParams): void {
  const hasStartedRef = useRef(false);

  useLayoutEffect(() => {
    if (!isGsapReady || !mainRef.current || hasStartedRef.current) {
      return;
    }
    hasStartedRef.current = true;

    const context = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .to('.curtain-text', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
        .to('.curtain-text', {
          opacity: 0,
          y: -20,
          duration: 0.35,
          delay: 0.15,
          ease: 'power2.in',
        })
        .to('.curtain-panel', {
          height: 0,
          duration: 0.95,
          stagger: 0.08,
          ease: 'power4.inOut',
        })
        .call(() => {
          onCurtainComplete?.();
        })
        .from(
          '.nav-item',
          {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.5',
        )
        .from(
          '.hero-line',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.6,
            ease: 'expo.out',
          },
          '-=0.45',
        )
        .from(
          '.hero-title-line',
          {
            y: 100,
            opacity: 0,
            rotateX: -20,
            duration: 0.95,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.5',
        )
        .from(
          '.hero-desc',
          {
            x: -20,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
          },
          '-=0.6',
        )
        .from(
          '.hero-btn',
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            ease: 'back.out(1.7)',
          },
          '-=0.55',
        )
        .from(
          '.hero-stat',
          {
            opacity: 0,
            x: 20,
            stagger: 0.15,
            duration: 0.75,
          },
          '-=0.8',
        );
    }, mainRef);

    return () => {
      context.revert();
    };
  }, [isGsapReady, mainRef, onCurtainComplete]);
}
