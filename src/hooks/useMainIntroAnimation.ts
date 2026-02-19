import { useLayoutEffect, type MutableRefObject } from 'react';
import { gsap } from 'gsap';

interface UseMainIntroAnimationParams {
  isGsapReady: boolean;
  mainRef: MutableRefObject<HTMLDivElement | null>;
}

/**
 * Timeline principal: cortina de entrada + secuencia del hero.
 * Se encapsula en un hook para mantener el componente App limpio.
 */
export function useMainIntroAnimation({
  isGsapReady,
  mainRef,
}: UseMainIntroAnimationParams): void {
  useLayoutEffect(() => {
    if (!isGsapReady || !mainRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .to('.curtain-text', {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        })
        .to('.curtain-text', {
          opacity: 0,
          y: -20,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.in',
        })
        .to('.curtain-panel', {
          height: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power4.inOut',
        })
        .from(
          '.nav-item',
          {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.8',
        )
        .from(
          '.hero-line',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'expo.out',
          },
          '-=0.6',
        )
        .from(
          '.hero-title-line',
          {
            y: 100,
            opacity: 0,
            rotateX: -20,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
          },
          '-=0.7',
        )
        .from(
          '.hero-desc',
          {
            x: -20,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.8',
        )
        .from(
          '.hero-btn',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.8',
        )
        .from(
          '.hero-stat',
          {
            opacity: 0,
            x: 20,
            stagger: 0.2,
            duration: 1,
          },
          '-=1',
        );
    }, mainRef);

    return () => {
      context.revert();
    };
  }, [isGsapReady, mainRef]);
}
