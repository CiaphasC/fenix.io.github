import { ChevronRight } from 'lucide-react';
import { Reveal } from '../animations/Reveal';

export function CallToActionSection() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 bg-gray-50 border-t border-gray-100 text-center relative z-10">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#A08870] to-transparent mx-auto mb-12 opacity-50"></div>
          <p className="text-lg sm:text-xl md:text-3xl font-serif text-gray-800 leading-relaxed mb-10 sm:mb-12 italic">
            "Liderar es asumir responsabilidad antes que reconocimiento. Es tomar decisiones difíciles hoy para
            construir el futuro que quieres liderar mañana."
          </p>
          <button className="text-xs font-bold uppercase tracking-[0.2em] text-[#A08870] hover:text-gray-900 transition-colors flex items-center justify-center gap-2 mx-auto group">
            Iniciar Conversación{' '}
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
