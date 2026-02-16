import React from 'react';
import { TopoBackground } from './components/TopoBackground';
import { HERO_DATA } from './constants';
import { Mail } from 'lucide-react';

function App() {
  const is404 = typeof window !== 'undefined' && (window as any).__IS_404__ === true;

  return (
    <div className="relative min-h-screen bg-gis-bg flex flex-col items-center justify-center overflow-hidden font-sans p-4">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TopoBackground />
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-white/30 backdrop-blur-sm rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] px-10 py-7 md:py-16 md:px-12 text-center border border-white/60">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 md:w-24 md:h-24 text-gis-topo">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 15 L15 85 L85 85 Z" />
              <path d="M50 35 L30 75 L70 75 Z" />
            </svg>
          </div>
        </div>

        {is404 ? (
          <>
            <h1 className="text-4xl md:text-6xl font-bold text-gis-text tracking-tight mb-10">
              404 Page not found
            </h1>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#2D7A73] text-white font-semibold rounded hover:bg-[#23605a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-lg"
            >
              Go to main page
            </a>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-8xl font-bold text-gis-text tracking-tighter mb-6">
              gispro.me
            </h1>

            <div className="flex items-center justify-center gap-6 mb-12 opacity-70">
              <div className="h-px w-12 md:w-32 bg-stone-500"></div>
              <p className="font-serif italic text-xl md:text-3xl text-stone-700">
                coming soon
              </p>
              <div className="h-px w-12 md:w-32 bg-stone-500"></div>
            </div>

            <a
              href={`mailto:${HERO_DATA.email}`}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#2D7A73] text-white font-semibold rounded hover:bg-[#23605a] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-lg"
            >
              <Mail className="w-5 h-5" />
              <span>Hire a GIS Pro</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
