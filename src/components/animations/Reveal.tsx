import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useGsapReady } from '../../context/GsapContext';

type RevealDirection = 'y' | 'x' | '-x';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
}

/**
 * Wrapper de aparición progresiva con ScrollTrigger.
 * Estandariza patrones de reveal para todas las secciones.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'y',
  distance = 50,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isGsapReady = useGsapReady();

  useLayoutEffect(() => {
    if (!isGsapReady || !elementRef.current) {
      return;
    }

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay,
    };

    if (direction === 'y') {
      fromVars.y = distance;
    }

    if (direction === 'x') {
      fromVars.x = distance;
    }

    if (direction === '-x') {
      fromVars.x = -distance;
    }

    const context = gsap.context(() => {
      if (!elementRef.current) {
        return;
      }

      gsap.fromTo(elementRef.current, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      context.revert();
    };
  }, [delay, direction, distance, isGsapReady]);

  return (
    <div ref={elementRef} className={`${className} ${!isGsapReady ? 'opacity-0' : ''}`}>
      {children}
    </div>
  );
}
