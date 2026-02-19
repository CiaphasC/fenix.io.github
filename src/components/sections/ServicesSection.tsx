import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../animations/Reveal';
import type { ServiceItem } from '../../types/content';

interface ServicesSectionProps {
  items: ReadonlyArray<ServiceItem>;
}

export function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section id="consultoria" className="py-24 md:py-32 px-4 sm:px-6 border-t border-gray-100 bg-white relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900">Soluciones Ejecutivas</h2>
            <a
              href="#"
              className="hidden md:block text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors font-medium"
            >
              Explorar todos los servicios &rarr;
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-100">
          {items.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1} className="h-full">
              <div className="group relative p-8 sm:p-10 border-r border-b border-gray-100 hover:bg-gray-50 transition-colors duration-500 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xs font-mono text-gray-400">{service.id}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight size={18} className="text-[#A08870]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif text-gray-900 mb-4 group-hover:text-[#A08870] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{service.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
