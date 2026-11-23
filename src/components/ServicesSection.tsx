import { useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  GENERATED_IMAGES,
  SERVICE_CATEGORY_GROUPS,
  SOLAR_SERVICES,
  type ServiceCategoryGroup,
} from '../data/synsolariseData';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  onRequestService: (serviceTitle: string) => void;
}

export function ServicesSection({ onRequestService }: ServicesSectionProps) {
  const [activeGroup, setActiveGroup] = useState<ServiceCategoryGroup>('All');

  const visibleServices = useMemo(() => {
    if (activeGroup === 'All') return SOLAR_SERVICES;
    return SOLAR_SERVICES.filter((service) => service.group === activeGroup);
  }, [activeGroup]);

  return (
    <section id="services" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Visual Commissioning Carrier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-10 border-b border-slate-200">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-2">Our Solar Services</p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                End-to-end solar engineering, storage, protection, and commissioning.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mt-4 max-w-2xl">
                From residential rooftop setups and commercial hybrid systems to industrial power
                plants, zero-export controls, and high-voltage lithium battery banks—SYNSOLARISE
                handles every technical phase.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter solar services"
              className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg self-start"
            >
              {SERVICE_CATEGORY_GROUPS.map((group) => {
                const isActive = activeGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveGroup(group)}
                    className={`px-3 py-2 min-h-[38px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white aspect-[4/3] lg:aspect-auto lg:h-full min-h-[240px]">
              <ResilientImage
                src={GENERATED_IMAGES.commissioning}
                alt="SYNSOLARISE engineers performing solar inverter commissioning and electrical protection testing"
                fallbackTitle="Solar Inverter Installation & Commissioning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Services Grid (A through I) */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-emerald-700/40 transition-colors duration-150"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-mono font-semibold text-emerald-700">{service.code}</span>
                  <span className="truncate">{service.group}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#0B1F3A]">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2.5">{service.summary}</p>

                <ul className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check
                        className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onRequestService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                >
                  Inquire About {service.title}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
