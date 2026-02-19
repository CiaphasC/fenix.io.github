import { Clock } from 'lucide-react';
import { Reveal } from '../animations/Reveal';

export function ManifestoSection() {
  return (
    <section id="manifiesto" className="relative z-10 border-t border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-[600px] lg:h-auto bg-gray-100 overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 z-10" />

          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[80%] h-[80%] border border-gray-400 rounded-full animate-spin-slow"></div>
            <div className="absolute w-[60%] h-[60%] border border-gray-400 rounded-full animate-reverse-spin"></div>
          </div>

          <div className="absolute bottom-12 left-12 z-20 max-w-md">
            <Reveal direction="x" distance={-30}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#A08870]"></div>
                <span className="text-[#A08870] text-xs font-bold uppercase tracking-widest">La Fundadora</span>
              </div>
              <blockquote className="text-2xl font-serif text-gray-900 leading-relaxed italic">
                "No construimos empresas para sobrevivir. Construimos para trascender a la quiebra y al tiempo."
              </blockquote>
            </Reveal>
          </div>
        </div>

        <div className="py-24 px-12 lg:px-24 flex flex-col justify-center bg-white">
          <Reveal direction="y">
            <h2 className="text-4xl md:text-5xl font-serif mb-12 text-gray-900">
              Resiliencia <br />
              <span className="text-[#A08870] italic">Operativa</span>.
            </h2>
          </Reveal>

          <div className="space-y-8 text-gray-600 font-light text-lg leading-relaxed">
            <Reveal delay={0.1}>
              <p>
                El 2024 cerró con éxito. El 2025 trajo el silencio. En el mundo corporativo, la fragilidad es el costo
                oculto del crecimiento rápido.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Mi retorno no fue casualidad. Fue ingeniería. A los 45 años, con la complejidad de la maternidad y el
                matrimonio, rediseñé no solo mi modelo de negocio, sino mi modelo de vida.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="pt-8 border-t border-gray-100 mt-8">
                <div className="flex items-center gap-4 text-gray-900 mb-2">
                  <Clock size={18} className="text-[#A08870]" />
                  <span className="font-serif text-xl">1 Año 7 Meses</span>
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                  Tiempo récord de recuperación total
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
