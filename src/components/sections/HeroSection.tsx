import { ArrowUpRight } from 'lucide-react';
import { AnimatedCounter } from '../animations/AnimatedCounter';

interface HeroSectionProps {
  isGsapReady: boolean;
}

export function HeroSection({ isGsapReady }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 relative z-10">
          <div className={`transition-opacity duration-500 ${isGsapReady ? 'opacity-100' : 'opacity-0'}`}>
            <div className="hero-line w-fit overflow-hidden mb-8">
              <div className="inline-block px-3 py-1 border border-[#A08870]/40 text-[#A08870] text-[10px] font-bold tracking-[0.2em] uppercase">
                Consultoría de Alto Nivel
              </div>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.0] text-gray-900 mb-8 tracking-tight">
                <div className="hero-title-line">El arte de</div>
                <div className="hero-title-line">
                  <span className="italic text-gray-500 font-light">renacer</span> con
                </div>
                <div className="hero-title-line">autoridad.</div>
              </h1>
            </div>

            <div className="hero-desc max-w-xl border-l border-[#A08870] pl-6 ml-2">
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Transformamos crisis empresariales en legados sólidos. Metodología exclusiva para empresarias que
                integran facturación de alto nivel con una vida personal plena.
              </p>
            </div>

            <div className="hero-btn mt-12 flex flex-col sm:flex-row gap-6">
              <button className="group flex items-center gap-4 text-sm uppercase tracking-widest text-gray-900 border-b border-gray-900 pb-2 hover:text-[#A08870] hover:border-[#A08870] transition-all w-fit font-medium">
                Ver Caso de Estudio{' '}
                <ArrowUpRight
                  className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end items-end text-right relative z-10">
          <div className={`hero-stat mb-12 transition-opacity duration-500 ${isGsapReady ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-5xl font-light text-gray-900 mb-2 font-serif flex justify-end">
              <AnimatedCounter prefix="$" end={280} suffix="k" />
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Facturación Auditada 2024</div>
          </div>
          <div className={`hero-stat transition-opacity duration-500 ${isGsapReady ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-5xl font-light text-[#A08870] mb-2 font-serif flex justify-end">
              <AnimatedCounter end={1.7} suffix=" Años" />
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Tiempo de Reconstrucción</div>
          </div>
        </div>
      </div>
    </section>
  );
}
