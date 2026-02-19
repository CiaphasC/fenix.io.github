import { useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useHeaderScrollTransition } from '../../hooks/useHeaderScrollTransition';

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  isGsapReady: boolean;
  isIntroActive: boolean;
}

export function Header({ isMenuOpen, onToggleMenu, isGsapReady, isIntroActive }: HeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);

  useHeaderScrollTransition({
    isGsapReady,
    isIntroActive,
    headerRef,
  });

  return (
    <nav
      ref={headerRef}
      className="fixed top-0 w-full z-50 border-b border-transparent bg-transparent will-change-[background-color,backdrop-filter,border-color,box-shadow]"
    >
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
        <div className="nav-item text-2xl font-serif tracking-tight text-gray-900 cursor-pointer">
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

        <div className="flex items-center gap-6">
          <button className="nav-item hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-gray-900 text-white px-6 py-3 hover:bg-[#A08870] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            Agenda Privada
          </button>
          <button
            className="md:hidden text-gray-900"
            onClick={onToggleMenu}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
