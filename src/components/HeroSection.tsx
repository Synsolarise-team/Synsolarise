import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import {
  COMPANY_INFO,
  GENERATED_IMAGES,
  HERO_CAPABILITIES,
} from '../data/synsolariseData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export function HeroSection({ onRequestQuote, onExploreServices }: HeroSectionProps) {
  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Main Heading, Tagline, Introduction & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <p className="text-sm font-semibold text-emerald-700 tracking-tight mb-3">
                SYNSOLARISE · Residential · Commercial · Industrial
              </p>

              <h1
                className="font-display font-bold text-[#0B1F3A] tracking-tight leading-[1.08] mb-4"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                  textWrap: 'balance',
                }}
              >
                Complete Solar Energy Solutions.
              </h1>

              <p className="font-display text-lg sm:text-xl font-semibold text-emerald-800 mb-5">
                {COMPANY_INFO.tagline}
              </p>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl mb-8">
                SYNSOLARISE is a professional solar installation and electrical engineering company
                delivering residential, commercial, and industrial solar systems—covering planning,
                inverter and high-voltage battery integration, zero-export control, AC/DC protection,
                commissioning, and ongoing technical support.
              </p>

              {/* Primary Consultation Action + Direct WhatsApp & Click-to-Call */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-slate-900 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  Request Consultation
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp {COMPANY_INFO.phoneDisplay}
                </a>

                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-[#0B1F3A] bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <Phone className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  Call Now
                </a>
              </div>
            </div>

            <div className="mt-10 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>On-Grid</span>
                <span aria-hidden="true">·</span>
                <span>Hybrid</span>
                <span aria-hidden="true">·</span>
                <span>Zero Export</span>
                <span aria-hidden="true">·</span>
                <span>High Voltage Storage</span>
                <span aria-hidden="true">·</span>
                <span>AC/DC Protection</span>
              </div>
              <button
                type="button"
                onClick={onExploreServices}
                className="font-semibold text-[#0B1F3A] hover:text-emerald-700 underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
              >
                Explore All 9 Services
              </button>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 Architectural Solar Banner */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-[#0B1F3A] aspect-video lg:aspect-auto lg:h-full min-h-[290px]">
              <ResilientImage
                src={GENERATED_IMAGES.hero}
                alt="Commercial and industrial rooftop solar system installation with anodized mounting structures and galvanized conduit"
                fallbackTitle="SYNSOLARISE Solar Installation Banner"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/25 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <p className="font-mono text-xs text-emerald-300">
                  Planning · System Design · Installation · Commissioning
                </p>
                <p className="text-sm sm:text-base font-medium text-slate-100 mt-1">
                  Residential rooftops, commercial buildings, and industrial solar power plants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Capability Strip Below Hero Split */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERO_CAPABILITIES.map((item) => (
            <div key={item.value} className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-bold text-[#0B1F3A]">
                {item.value}
              </span>
              <span className="text-sm text-slate-600 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
