import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginRegistered = false;

/**
 * Registra plugins GSAP una sola vez y expone un estado de disponibilidad
 * para sincronizar animaciones de entrada de forma segura.
 */
export function useGsapSetup(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!pluginRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      pluginRegistered = true;
    }

    setIsReady(true);
  }, []);

  return isReady;
}
