import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  Download,
  Mail,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import {
  ACCESSORIES_CATALOG,
  COMPANY_INFO,
  SOLAR_SERVICES,
  type SectorId,
} from '../data/synsolariseData';

interface ContactSectionProps {
  selectedSector: SectorId;
  onChangeSector: (sector: SectorId) => void;
  selectedServiceTitle: string;
  onChangeServiceTitle: (title: string) => void;
  selectedAccessoryIds: string[];
  onRemoveAccessory: (id: string) => void;
  onClearAccessories: () => void;
}

type FormMode = 'consultation' | 'inquiry';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

interface SubmittedReceipt {
  referenceId: string;
  mode: FormMode;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  sector: SectorId;
  serviceTitle: string;
  estimatedCapacity: string;
  accessories: string[];
  message: string;
  submittedAt: string;
}

export function ContactSection({
  selectedSector,
  onChangeSector,
  selectedServiceTitle,
  onChangeServiceTitle,
  selectedAccessoryIds,
  onRemoveAccessory,
  onClearAccessories,
}: ContactSectionProps) {
  const [formMode, setFormMode] = useState<FormMode>('consultation');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [estimatedCapacity, setEstimatedCapacity] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [receipt, setReceipt] = useState<SubmittedReceipt | null>(null);

  const selectedAccessories = ACCESSORIES_CATALOG.filter((item) =>
    selectedAccessoryIds.includes(item.id)
  );

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digitsOnly = phone.replace(/[^\d]/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (formMode === 'consultation' && location.trim().length < 2) {
      nextErrors.location = 'Please enter your city or project site location.';
    }
    if (formMode === 'inquiry' && message.trim().length < 8) {
      nextErrors.message = 'Please describe your solar inquiry or question.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const refNumber = `SYN-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceipt({
      referenceId: refNumber,
      mode: formMode,
      fullName: fullName.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim() || 'Not specified',
      sector: selectedSector,
      serviceTitle: selectedServiceTitle || 'Complete Solar System Installation',
      estimatedCapacity: estimatedCapacity.trim() || 'To be assessed',
      accessories: selectedAccessories.map((a) => `${a.name} (${a.ratingSpec})`),
      message: message.trim(),
      submittedAt: new Date().toLocaleString(),
    });
  };

  const buildWhatsappInquiryUrl = (data: SubmittedReceipt) => {
    const summaryText = [
      `Hello ${COMPANY_INFO.owner} (${COMPANY_INFO.name}),`,
      `Ref: ${data.referenceId} (${data.mode === 'consultation' ? 'Project Consultation' : 'Customer Inquiry'})`,
      `Name: ${data.fullName}${data.company ? ` - ${data.company}` : ''}`,
      `Phone: ${data.phone}`,
      `Location: ${data.location}`,
      `Sector: ${data.sector.toUpperCase()}`,
      `Service: ${data.serviceTitle}`,
      `System Size: ${data.estimatedCapacity}`,
      data.accessories.length > 0 ? `Accessories: ${data.accessories.join(', ')}` : '',
      data.message ? `Details: ${data.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `${COMPANY_INFO.whatsappHref}?text=${encodeURIComponent(summaryText)}`;
  };

  const handleDownloadSummary = () => {
    if (!receipt) return;
    const lines = [
      'SYNSOLARISE — SOLAR PROJECT & INQUIRY BRIEF',
      `Reference ID: ${receipt.referenceId}`,
      `Request Type: ${receipt.mode === 'consultation' ? 'Project Consultation Request' : 'Customer Inquiry'}`,
      `Date: ${receipt.submittedAt}`,
      '--------------------------------------------------',
      `Contact Person: ${receipt.fullName}${receipt.company ? ` (${receipt.company})` : ''}`,
      `Email: ${receipt.email}`,
      `Phone / WhatsApp: ${receipt.phone}`,
      `Site Location: ${receipt.location}`,
      `Project Sector: ${receipt.sector.toUpperCase()}`,
      `Requested Service: ${receipt.serviceTitle}`,
      `Estimated System Size: ${receipt.estimatedCapacity}`,
      '',
      'Selected Solar Accessories & Protection Equipment:',
      receipt.accessories.length > 0
        ? receipt.accessories.map((a, idx) => `  ${idx + 1}. ${a}`).join('\n')
        : '  Full standard AC/DC protection suite to be sized by SYNSOLARISE.',
      '',
      receipt.message ? `Notes / Question:\n${receipt.message}` : '',
      '--------------------------------------------------',
      `SYNSOLARISE · ${COMPANY_INFO.owner} (${COMPANY_INFO.designation})`,
      `Phone / WhatsApp: ${COMPANY_INFO.phoneDisplay} · Email: ${COMPANY_INFO.email}`,
    ].filter(Boolean);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${receipt.referenceId}_synsolarise_brief.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="bg-[#0B1F3A] text-slate-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact Desk & Quick Action Buttons */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-emerald-400 mb-2">Contact Us</p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Speak directly with our solar engineering consultant.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed mt-4">
              {COMPANY_INFO.tagline} Reach out by phone, WhatsApp, email, or submit your project
              consultation or general customer inquiry below.
            </p>

            {/* Contact Card */}
            <div className="mt-8 bg-slate-900/70 border border-slate-700/80 rounded-xl p-6 space-y-5">
              <div>
                <p className="font-display text-lg font-bold text-white">{COMPANY_INFO.name}</p>
                <p className="text-sm text-emerald-300 mt-0.5">
                  {COMPANY_INFO.owner} · {COMPANY_INFO.designation}
                </p>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/80 text-sm">
                <div>
                  <dt className="text-xs text-slate-400">Phone / WhatsApp</dt>
                  <dd className="font-mono text-white font-semibold mt-0.5 tabular-nums space-y-1">
                    <div>
                      <a
                        href={COMPANY_INFO.phoneHref}
                        className="hover:text-emerald-300 transition-colors"
                      >
                        {COMPANY_INFO.phoneDisplay}
                      </a>
                    </div>
                    <div>
                      <a
                        href={COMPANY_INFO.phoneHref2}
                        className="hover:text-emerald-300 transition-colors"
                      >
                        {COMPANY_INFO.phoneDisplay2}
                      </a>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">Email</dt>
                  <dd className="font-mono text-white font-medium mt-0.5 break-all">
                    {COMPANY_INFO.email}
                  </dd>
                </div>
              </dl>

              {/* Click-to-Call, Direct WhatsApp for both numbers, and Email Button */}
              <div className="pt-2 space-y-2.5">
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-[#0B1F3A] bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    Call {COMPANY_INFO.phoneDisplay}
                  </a>

                  <a
                    href={COMPANY_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={COMPANY_INFO.phoneHref2}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-[#0B1F3A] bg-white hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                    Call {COMPANY_INFO.phoneDisplay2}
                  </a>

                  <a
                    href={COMPANY_INFO.whatsappHref2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    WhatsApp {COMPANY_INFO.phoneDisplay2}
                  </a>

                  <a
                    href={COMPANY_INFO.emailHref}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Selected Accessories List */}
            <div className="mt-6 bg-slate-900/70 border border-slate-700/80 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-semibold text-white">
                  Selected Solar Accessories ({selectedAccessories.length})
                </h3>
                {selectedAccessories.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAccessories}
                    className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {selectedAccessories.length === 0 ? (
                <p className="text-sm text-slate-400 leading-relaxed">
                  Optional: select specific circuit breakers, SPDs, smart meters, or mounting
                  hardware in the Solar Accessories section to include them in your inquiry.
                </p>
              ) : (
                <ul className="divide-y divide-slate-800">
                  {selectedAccessories.map((item) => (
                    <li
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-slate-100 truncate">{item.name}</p>
                        <p className="font-mono text-xs text-slate-400 truncate">
                          {item.ratingSpec}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveAccessory(item.id)}
                        aria-label={`Remove ${item.name} from quote scope`}
                        className="w-8 h-8 inline-flex items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800 shrink-0 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Dual Tabbed Forms (Project Consultation Request Form & Customer Inquiry Form) */}
          <div className="lg:col-span-7">
            {receipt ? (
              <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-xs font-semibold text-emerald-800">
                      Reference {receipt.referenceId} · Submitted {receipt.submittedAt}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-[#0B1F3A] mt-1">
                      {receipt.mode === 'consultation'
                        ? 'Project consultation request prepared.'
                        : 'Customer inquiry prepared.'}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2">
                      Thank you, <span className="font-medium text-[#0B1F3A]">{receipt.fullName}</span>.
                      Send this verified brief directly to {COMPANY_INFO.owner} via WhatsApp or
                      download a copy for your records.
                    </p>
                  </div>
                </div>

                <dl className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Service Selected</dt>
                    <dd className="font-medium text-[#0B1F3A] mt-0.5">{receipt.serviceTitle}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Sector &amp; Estimated Capacity</dt>
                    <dd className="font-mono font-medium text-[#0B1F3A] mt-0.5 capitalize">
                      {receipt.sector} · {receipt.estimatedCapacity}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs text-slate-500">
                      Included Protection &amp; Accessories ({receipt.accessories.length})
                    </dt>
                    <dd className="text-slate-700 mt-1">
                      {receipt.accessories.length > 0
                        ? receipt.accessories.join(', ')
                        : 'Standard sector-matched AC/DC protection package'}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsappInquiryUrl(receipt)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Send Brief on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleDownloadSummary}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] text-sm font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Download Brief (.txt)
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setReceipt(null);
                      setFullName('');
                      setCompany('');
                      setEmail('');
                      setPhone('');
                      setLocation('');
                      setEstimatedCapacity('');
                      setMessage('');
                    }}
                    className="px-4 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-slate-900 rounded-md transition-colors cursor-pointer"
                  >
                    New Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200">
                {/* Switch Between Project Consultation Request Form and Customer Inquiry Form */}
                <div
                  role="tablist"
                  aria-label="Choose inquiry form type"
                  className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg mb-6"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'consultation'}
                    onClick={() => {
                      setFormMode('consultation');
                      setErrors({});
                    }}
                    className={`px-3 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                      formMode === 'consultation'
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-600 hover:text-[#0B1F3A]'
                    }`}
                  >
                    Project Consultation Request
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={formMode === 'inquiry'}
                    onClick={() => {
                      setFormMode('inquiry');
                      setErrors({});
                    }}
                    className={`px-3 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                      formMode === 'inquiry'
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-600 hover:text-[#0B1F3A]'
                    }`}
                  >
                    Customer Inquiry Form
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {formMode === 'consultation' && (
                    <>
                      {/* Sector Selector */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0B1F3A] mb-2">
                          Project Category
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['residential', 'commercial', 'industrial'] as SectorId[]).map(
                            (sector) => {
                              const active = selectedSector === sector;
                              return (
                                <button
                                  key={sector}
                                  type="button"
                                  onClick={() => onChangeSector(sector)}
                                  className={`px-3 py-2.5 min-h-[42px] text-sm font-medium rounded-md border capitalize transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                                    active
                                      ? 'bg-emerald-700 text-white border-emerald-700'
                                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {sector}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Service Selector */}
                      <div>
                        <label
                          htmlFor="service-select"
                          className="block text-sm font-semibold text-[#0B1F3A] mb-1.5"
                        >
                          Required Solar Service
                        </label>
                        <select
                          id="service-select"
                          value={selectedServiceTitle}
                          onChange={(e) => onChangeServiceTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                        >
                          {SOLAR_SERVICES.map((svc) => (
                            <option key={svc.id} value={svc.title}>
                              {svc.title}
                            </option>
                          ))}
                          <option value="Solar Accessories & Electrical Protection Supply">
                            Solar Accessories &amp; Electrical Protection Supply
                          </option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="full-name"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Full Name <span className="text-emerald-700">*</span>
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.fullName)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-700 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company-name"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Business / Plaza / Factory (Optional)
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Optional for residential"
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Email Address <span className="text-emerald-700">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                      {errors.email && <p className="text-xs text-red-700 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-slate-800 mb-1.5"
                      >
                        Phone / WhatsApp Number <span className="text-emerald-700">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX XXXXXXX"
                        aria-invalid={Boolean(errors.phone)}
                        className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                      />
                      {errors.phone && <p className="text-xs text-red-700 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {formMode === 'consultation' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="site-location"
                          className="block text-sm font-medium text-slate-800 mb-1.5"
                        >
                          City / Site Location <span className="text-emerald-700">*</span>
                        </label>
                        <input
                          id="site-location"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City & Area"
                          aria-invalid={Boolean(errors.location)}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                        />
                        {errors.location && (
                          <p className="text-xs text-red-700 mt-1">{errors.location}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="capacity-estimate"
                          className="block text-sm font-medium text-slate-800 mb-1.5"
                        >
                          Target System Size (kW)
                        </label>
                        <input
                          id="capacity-estimate"
                          type="text"
                          value={estimatedCapacity}
                          onChange={(e) => setEstimatedCapacity(e.target.value)}
                          placeholder="e.g. 10 kW, 50 kW, 100 kW"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="project-notes"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      {formMode === 'consultation'
                        ? 'Project Requirements / Load & Battery Details'
                        : 'Your Inquiry or Technical Question'}{' '}
                      {formMode === 'inquiry' && <span className="text-emerald-700">*</span>}
                    </label>
                    <textarea
                      id="project-notes"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        formMode === 'consultation'
                          ? 'Describe your monthly units, backup battery requirements, roof structure, or commissioning needs...'
                          : 'Ask about solar installation, inverter commissioning, troubleshooting, or electrical protection accessories...'
                      }
                      aria-invalid={Boolean(errors.message)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                    />
                    {errors.message && (
                      <p className="text-xs text-red-700 mt-1">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Direct consultation with {COMPANY_INFO.owner} ({COMPANY_INFO.designation}).
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                      {formMode === 'consultation'
                        ? 'Request Consultation'
                        : 'Submit Customer Inquiry'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
