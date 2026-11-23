import { COMPANY_INFO } from '../data/synsolariseData';
import { SynsolariseLogo } from './SynsolariseLogo';

export function Footer() {
  return (
    <footer className="bg-[#08162B] text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="bg-white rounded-md p-1.5 shrink-0">
              <SynsolariseLogo size={30} />
            </div>
            <div>
              <a href="#top" className="font-display text-xl font-bold text-white tracking-tight">
                {COMPANY_INFO.name}
              </a>
              <p className="text-sm text-slate-300 mt-1">{COMPANY_INFO.tagline}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#accessories" className="hover:text-white transition-colors">
              Accessories
            </a>
            <a href="#brands" className="hover:text-white transition-colors">
              Brands
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name} · {COMPANY_INFO.owner} (
            {COMPANY_INFO.designation})
          </p>
          <p className="font-mono text-slate-300">
            {COMPANY_INFO.phoneDisplay} · {COMPANY_INFO.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
