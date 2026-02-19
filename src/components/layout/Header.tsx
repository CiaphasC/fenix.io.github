import { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useHeaderScrollTransition } from '../../hooks/useHeaderScrollTransition';

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  isGsapReady: boolean;
  isIntroActive: boolean;
}

export function Header({
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  isGsapReady,
  isIntroActive,
}: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  useHeaderScrollTransition({
    isGsapReady,
    isIntroActive,
    isMenuOpen,
    headerRef,
    shellRef,
    brandRef,
    ctaRef,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches && isMenuOpen) {
        onCloseMenu();
      }
    };

    mediaQuery.addEventListener('change', handleBreakpoint);
    return () => {
      mediaQuery.removeEventListener('change', handleBreakpoint);
    };
  }, [isMenuOpen, onCloseMenu]);

  return (
    <nav
      ref={headerRef}
      className="fixed top-0 w-full z-50 border-b border-transparent bg-transparent shadow-none will-change-[background-color,backdrop-filter,border-color,box-shadow]"
    >
      <div
        ref={shellRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 py-[18px] md:py-8 flex justify-between items-center"
      >
        <div
          ref={brandRef}
          className="nav-item text-2xl font-serif tracking-tight text-gray-900 cursor-pointer origin-left transform scale-[1.05] md:scale-[1.45] will-change-transform"
        >
          FENIX<span className="text-[#A08870] font-light">360</span>
        </div>

        <div className="hidden md:flex gap-10 text-xs font-medium tracking-[0.15em] text-gray-500 uppercase">
          <a href="#manifiesto" className="nav-item hover:text-gray-900 transition-colors">
            Manifiesto
          </a>
          <a href="#trayectoria" className="nav-item hover:text-gray-900 transition-colors">
            Trayectoria
          </a>
          <a href="#consultoria" className="nav-item hover:text-gray-900 transition-colors">
            Consultoría
          </a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            ref={ctaRef}
            className="nav-item hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-6 py-3 hover:bg-[#A08870] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Agenda Privada
          </button>
          <button className="nav-item md:hidden text-[10px] font-bold uppercase tracking-wider bg-gray-900 text-white px-3 py-2 hover:bg-[#A08870] transition-colors">
            Agenda
          </button>
          <button
            className="md:hidden text-gray-900"
            onClick={onToggleMenu}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-white/95 backdrop-blur-xl border-t border-gray-100">
          <div className="flex flex-col gap-3 text-xs font-medium tracking-[0.15em] text-gray-600 uppercase">
            <a href="#manifiesto" className="py-2 hover:text-gray-900 transition-colors" onClick={onCloseMenu}>
              Manifiesto
            </a>
            <a href="#trayectoria" className="py-2 hover:text-gray-900 transition-colors" onClick={onCloseMenu}>
              Trayectoria
            </a>
            <a href="#consultoria" className="py-2 hover:text-gray-900 transition-colors" onClick={onCloseMenu}>
              Consultoría
            </a>
          </div>
          <button className="mt-4 w-full text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-4 py-3 hover:bg-[#A08870] transition-colors">
            Agenda Privada
          </button>
        </div>
      </div>
    </nav>
  );
}
