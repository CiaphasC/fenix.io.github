export function CurtainOverlay() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center">
      <div className="curtain-panel absolute inset-0 bg-[#1a1a1a] z-20 flex items-center justify-center">
        <h1 className="curtain-text text-4xl md:text-6xl font-serif text-[#A08870] opacity-0 translate-y-10 tracking-widest">
          FENIX<span className="font-light text-white">360</span>
        </h1>
      </div>
      <div className="curtain-panel absolute inset-0 bg-[#A08870] z-10" />
    </div>
  );
}
