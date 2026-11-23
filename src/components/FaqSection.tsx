import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type FaqCategory,
} from '../data/synsolariseData';

interface FaqSectionProps {
  onAskQuestion: () => void;
}

export function FaqSection({ onAskQuestion }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('All');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const visibleFaqs = useMemo(() => {
    if (activeCategory === 'All') return FAQ_ITEMS;
    return FAQ_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading, Category Tabs & Direct Consultation Link */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-emerald-700 mb-2">
              Frequently Asked Questions
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Answers on solar installation, net metering, and system maintenance.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-4">
              Clear technical guidance on how SYNSOLARISE plans, protects, commissions, and
              maintains residential, commercial, and industrial solar power systems.
            </p>

            {/* Interactive Category Filter */}
            <div
              role="tablist"
              aria-label="Filter frequently asked questions"
              className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-lg"
            >
              {FAQ_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategory(category);
                      const firstMatch =
                        category === 'All'
                          ? FAQ_ITEMS[0]
                          : FAQ_ITEMS.find((item) => item.category === category);
                      if (firstMatch) setOpenId(firstMatch.id);
                    }}
                    className={`px-3 py-2 min-h-[38px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Need site-specific advice for your roof, load, or inverter?
              </p>
              <button
                type="button"
                onClick={onAskQuestion}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm self-start sm:self-auto"
              >
                Ask Our Consultant
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Accessible Accordion */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {visibleFaqs.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="px-6 py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => handleToggle(item.id)}
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                  >
                    <div>
                      <span className="block text-xs font-medium text-emerald-700 mb-1">
                        {item.category}
                      </span>
                      <span className="font-display text-base sm:text-lg font-semibold text-[#0B1F3A]">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-panel-${item.id}`}
                      className="mt-3 pr-8 text-sm sm:text-base text-slate-600 leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
