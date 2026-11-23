import { useMemo, useState } from 'react';
import { Check, Plus, Search, X } from 'lucide-react';
import {
  ACCESSORIES_CATALOG,
  ACCESSORY_CATEGORIES,
  GENERATED_IMAGES,
  type AccessoryCategory,
  type AccessoryItem,
} from '../data/synsolariseData';
import { ResilientImage } from './ResilientImage';

interface AccessoriesCatalogProps {
  selectedAccessoryIds: string[];
  onToggleAccessory: (id: string) => void;
  onProceedToQuote: () => void;
}

export function AccessoriesCatalog({
  selectedAccessoryIds,
  onToggleAccessory,
  onProceedToQuote,
}: AccessoriesCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<AccessoryCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedItem, setInspectedItem] = useState<AccessoryItem | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ACCESSORIES_CATALOG.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.ratingSpec.toLowerCase().includes(query) ||
        item.standard.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="accessories" className="bg-white border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Intro + Technical Panel Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pb-12 border-b border-slate-200">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700 mb-2">
                Solar Accessories &amp; Electrical Equipment
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Complete AC &amp; DC protection, metering, cabling, and mounting equipment.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                Reliable solar generation depends on properly rated electrical protection. We
                supply, install, and integrate all essential solar accessories—from AC/DC circuit
                breakers, SPDs, and distribution boxes to smart meters, earthing, and mounting
                structures.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div>
                <p className="font-mono text-sm font-semibold text-[#0B1F3A]">
                  17 Certified Equipment &amp; Safety Lines
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Inspect technical specifications or select items to include in your quote request.
                </p>
              </div>
              <div className="flex sm:justify-end items-center">
                {selectedAccessoryIds.length > 0 ? (
                  <button
                    type="button"
                    onClick={onProceedToQuote}
                    className="px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 tabular-nums"
                  >
                    Review {selectedAccessoryIds.length} Selected in Quote
                  </button>
                ) : (
                  <p className="text-sm text-slate-500">
                    Click &ldquo;Add to Quote&rdquo; on any accessory below.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]">
              <ResilientImage
                src={GENERATED_IMAGES.distributionPanel}
                alt="Pre-wired solar AC and DC distribution box showing DC isolators, MCBs, MCCB, surge protection devices, and smart meter"
                fallbackTitle="AC & DC Electrical Protection Panel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="pt-8 pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter solar accessories by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg"
          >
            {ACCESSORY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 min-h-[38px] text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                    isActive
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SPD, MCCB, CT, cable..."
              aria-label="Search solar accessories and electrical protection equipment"
              className="w-full pl-9 pr-3 py-2 min-h-[42px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
            />
          </div>
        </div>

        {/* Equipment Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-10 text-center">
            <p className="text-base font-semibold text-[#0B1F3A]">
              No matching electrical accessories found
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Clear the search filter or select &ldquo;All&rdquo; to view all 17 equipment lines.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0B1F3A] hover:bg-slate-900 rounded-md transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isSelected = selectedAccessoryIds.includes(item.id);
              return (
                <article
                  key={item.id}
                  className={`bg-slate-50 rounded-lg border p-6 flex flex-col justify-between transition-colors duration-150 ${
                    isSelected ? 'border-emerald-700 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{item.standard}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#0B1F3A]">
                      {item.name}
                    </h3>

                    <p className="font-mono text-xs font-medium text-emerald-800 mt-1.5 tabular-nums">
                      {item.ratingSpec}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mt-3">{item.summary}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectedItem(item)}
                      className="text-xs font-semibold text-[#0B1F3A] hover:text-emerald-700 underline underline-offset-4 decoration-slate-300 hover:decoration-emerald-700 py-1.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                    >
                      View Specifications
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleAccessory(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                        isSelected
                          ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                          : 'bg-white text-[#0B1F3A] border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          Added to Quote
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          Add to Quote
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Specification Detail Modal */}
      {inspectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spec-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/65"
          onClick={() => setInspectedItem(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  {inspectedItem.category} ·{' '}
                  <span className="font-mono">{inspectedItem.standard}</span>
                </p>
                <h3
                  id="spec-modal-title"
                  className="font-display text-2xl font-bold text-[#0B1F3A] mt-1"
                >
                  {inspectedItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                aria-label="Close specifications"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-mono text-sm font-medium text-emerald-800 mt-2 tabular-nums">
              {inspectedItem.ratingSpec}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed mt-4">{inspectedItem.summary}</p>

            <div className="mt-5 pt-5 border-t border-slate-200">
              <p className="text-xs font-semibold text-[#0B1F3A] mb-1">System Integration Role</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {inspectedItem.integrationRole}
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-200">
              <p className="text-xs font-semibold text-[#0B1F3A] mb-3">Technical Parameters</p>
              <dl className="divide-y divide-slate-100 border border-slate-200 rounded-md">
                {inspectedItem.keySpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 px-3.5 py-2.5 text-sm"
                  >
                    <dt className="text-slate-600">{spec.label}</dt>
                    <dd className="font-mono font-medium text-[#0B1F3A] tabular-nums text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInspectedItem(null)}
                className="px-4 py-2.5 min-h-[40px] text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleAccessory(inspectedItem.id);
                  setInspectedItem(null);
                }}
                className="px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors cursor-pointer"
              >
                {selectedAccessoryIds.includes(inspectedItem.id)
                  ? 'Remove from Quote'
                  : 'Add to Quote Scope'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
