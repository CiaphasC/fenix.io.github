# FENIX360 - React + TypeScript

Implementación modular del contenido original de `prueba.html` en una arquitectura React moderna, manteniendo el diseño visual y las animaciones.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js
- Lucide React

## Estructura de carpetas

```text
src/
  components/
    animations/
      AnimatedCounter.tsx
      Reveal.tsx
    background/
      PremiumBackground.tsx
    layout/
      CurtainOverlay.tsx
      Header.tsx
      Footer.tsx
    sections/
      HeroSection.tsx
      ServicesSection.tsx
      ManifestoSection.tsx
      CallToActionSection.tsx
  context/
    GsapContext.tsx
  data/
    services.ts
  hooks/
    useGsapSetup.ts
    useMainIntroAnimation.ts
  styles/
    globals.css
  types/
    content.ts
  App.tsx
  main.tsx
```

## Criterios de arquitectura aplicados

- Separación por responsabilidad: layout, secciones, animaciones, hooks y datos en módulos distintos.
- DRY: lógica de aparición por scroll centralizada en `Reveal`; contador animado reusable en `AnimatedCounter`.
- Estado mínimo: `App` solo coordina estado de UI global (`isMenuOpen`) y readiness de GSAP.
- Datos desacoplados: servicios en `data/services.ts` tipados con `ServiceItem`.
- Composición: `App` compone módulos de alto nivel sin lógica visual embebida.
- Ciclo de vida controlado: Three.js y GSAP limpian listeners/recursos al desmontar.

## Principales patrones

- Presentational + Container: `App` orquesta; componentes de sección renderizan UI.
- Custom Hooks: inicialización de GSAP y timeline principal extraídos a hooks.
- Context API: `GsapReadyContext` evita prop drilling para componentes animados.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```
