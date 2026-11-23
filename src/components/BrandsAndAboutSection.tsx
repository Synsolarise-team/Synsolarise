import {
  BRANDS_SHOWCASE,
  COMPANY_INFO,
  WHY_CHOOSE_POINTS,
} from '../data/synsolariseData';
import { SynsolariseLogo } from './SynsolariseLogo';

export function BrandsAndAboutSection() {
  return (
    <>
      {/* Section: Our Brands & Technology */}
      <section id="brands" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-emerald-700 mb-2">
                Our Brands &amp; Technology
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Proven solar inverters, lithium storage, and PV modules we install and configure.
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Equipment brands listed represent hardware platforms our engineering team installs,
              configures, and commissions; no official dealership or exclusive partnership is
              claimed.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BRANDS_SHOWCASE.map((brand) => (
              <div
                key={brand.name}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-emerald-700 font-medium">{brand.domain}</p>
                  <h3 className="font-display text-2xl font-bold text-[#0B1F3A] tracking-tight mt-2">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mt-4 pt-4 border-t border-slate-100">
                  {brand.technologyNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Why Choose SYNSOLARISE & About Us */}
      <section id="about" className="bg-white border-b border-slate-200 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Us + Owner & Solar Consultant Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pb-14 border-b border-slate-200">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-emerald-700 mb-2">About SYNSOLARISE</p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                From solar planning to power generation—one accountable engineering team.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                SYNSOLARISE provides complete solar energy solutions, guiding clients from early
                site planning and electrical system design to equipment installation, inverter
                programming, commissioning, and ongoing technical support.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether powering a single family home with hybrid battery backup, eliminating
                export issues on a commercial plaza with CT zero-export control, or integrating
                high-capacity industrial inverters and AC/DC switchgear, our work prioritizes safe
                wiring, reliable performance, and long-term serviceability.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B1F3A] text-white rounded-xl p-6 sm:p-8 border border-[#0B1F3A]">
                <div className="flex items-center gap-4 pb-5 border-b border-slate-700/80">
                  <div className="bg-white rounded-lg p-2 shrink-0">
                    <SynsolariseLogo size={42} />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold tracking-tight">
                      {COMPANY_INFO.name}
                    </p>
                    <p className="text-xs text-emerald-300 mt-0.5">Future is Solar</p>
                  </div>
                </div>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs text-slate-400">Leadership &amp; Consultation</dt>
                    <dd className="text-base font-semibold text-white mt-0.5">
                      {COMPANY_INFO.owner}
                    </dd>
                    <dd className="text-xs text-emerald-300">{COMPANY_INFO.designation}</dd>
                  </div>
                  <div className="pt-3 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <dt className="text-xs text-slate-400">Phone / WhatsApp</dt>
                      <dd className="font-mono text-sm text-white mt-0.5 tabular-nums">
                        {COMPANY_INFO.phoneDisplay}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-400">Email</dt>
                      <dd className="font-mono text-sm text-white mt-0.5 break-all">
                        {COMPANY_INFO.email}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Why Choose SYNSOLARISE (All 9 Qualities) */}
          <div className="pt-14">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold text-emerald-700 mb-2">
                Why Choose SYNSOLARISE
              </p>
              <h3
                className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3A] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Nine engineering standards behind every solar installation.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_CHOOSE_POINTS.map((point) => (
                <article
                  key={point.number}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-6"
                >
                  <span className="font-mono text-sm font-semibold text-emerald-700 tabular-nums">
                    {point.number}
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#0B1F3A] mt-2">
                    {point.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">{point.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
