import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGsapReady } from '../../context/GsapContext';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/**
 * Contador animado activado por scroll.
 * El formato (entero o decimal) se deriva del valor final recibido.
 */
export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const isGsapReady = useGsapReady();

  useEffect(() => {
    if (!isGsapReady || !counterRef.current) {
      return;
    }

    const decimals = Number.isInteger(end) ? 0 : 1;

    gsap.fromTo(
      counterRef.current,
      { innerText: 0 },
      {
        innerText: end,
        duration,
        ease: 'power2.out',
        snap: { innerText: 0.1 },
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate(this: gsap.core.Tween) {
          const target = this.targets()[0] as HTMLElement;
          const value = Number.parseFloat(target.innerText);

          if (Number.isNaN(value)) {
            return;
          }

          target.innerText = `${prefix}${value.toFixed(decimals)}${suffix}`;
        },
      },
    );
  }, [duration, end, isGsapReady, prefix, suffix]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0
      {suffix}
    </span>
  );
}
