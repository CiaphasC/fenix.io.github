export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 bg-white text-gray-500 text-xs relative z-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif text-gray-900 font-bold">FENIX360 &copy; 2026</div>
        <div className="flex gap-8 uppercase tracking-wider font-medium">
          <a href="#" className="hover:text-gray-900 transition-colors">
            Legal
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Linkedin
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
