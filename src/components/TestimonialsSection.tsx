import { ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  onShareFeedback: () => void;
}

interface TestimonialSlot {
  id: string;
  sectorLabel: string;
  placeholderNotice: string;
  quotePlaceholder: string;
  attributionPlaceholder: string;
}

const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  {
    id: 'testimonial-residential-slot',
    sectorLabel: 'Residential Solar Installation',
    placeholderNotice: 'Client Feedback Placeholder',
    quotePlaceholder:
      'Placeholder for verified residential customer feedback covering system planning, L2 or rooftop mounting cleanliness, hybrid battery backup performance, and handover support.',
    attributionPlaceholder: 'Verified Client Name · City (Pending Client Submission)',
  },
  {
    id: 'testimonial-commercial-slot',
    sectorLabel: 'Commercial Solar & Zero Export',
    placeholderNotice: 'Client Feedback Placeholder',
    quotePlaceholder:
      'Placeholder for verified commercial client feedback covering daytime load reduction, smart meter and CT zero-export commissioning, and AC/DC switchgear reliability.',
    attributionPlaceholder: 'Commercial Facility Contact · City (Pending Client Submission)',
  },
  {
    id: 'testimonial-industrial-slot',
    sectorLabel: 'Industrial & High-Voltage ESS',
    placeholderNotice: 'Client Feedback Placeholder',
    quotePlaceholder:
      'Placeholder for verified industrial project feedback covering high-capacity inverter commissioning, high-voltage battery integration, changeover protection, and technical support.',
    attributionPlaceholder: 'Industrial Plant Engineer · City (Pending Client Submission)',
  },
];

export function TestimonialsSection({ onShareFeedback }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="bg-white border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-700 mb-2">
              Customer Testimonials
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Verified client feedback from SYNSOLARISE installations.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-3">
              We publish only genuine, permission-approved customer reviews. The placeholders below
              are reserved for verified residential, commercial, and industrial client feedback.
            </p>
          </div>

          <button
            type="button"
            onClick={onShareFeedback}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-[#0B1F3A] bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0 self-start lg:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            Submit Client Feedback
            <ArrowRight className="w-4 h-4 text-emerald-700" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIAL_SLOTS.map((slot) => (
            <article
              key={slot.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-emerald-700">{slot.sectorLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{slot.placeholderNotice}</span>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-600 leading-relaxed italic">
                  &ldquo;{slot.quotePlaceholder}&rdquo;
                </blockquote>
              </div>

              <p className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                {slot.attributionPlaceholder}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
