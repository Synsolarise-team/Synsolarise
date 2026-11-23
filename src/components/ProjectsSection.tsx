import { useMemo, useState } from 'react';
import { Maximize2, Play, X } from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  PROJECT_CASES,
  type GalleryCategory,
  type ProjectCase,
  type SectorId,
} from '../data/synsolariseData';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  onRequestSimilarProject?: (sector: SectorId) => void;
}

export function ProjectsSection({ onRequestSimilarProject }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [mediaIndexByProject, setMediaIndexByProject] = useState<Record<string, number>>({});
  const [inspectedProject, setInspectedProject] = useState<ProjectCase | null>(null);
  const [modalMediaIndex, setModalMediaIndex] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECT_CASES;
    return PROJECT_CASES.filter(
      (project) =>
        project.primaryCategory === activeCategory || project.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const getMediaIndex = (projectId: string) => mediaIndexByProject[projectId] ?? 0;

  const handleOpenProject = (project: ProjectCase) => {
    setInspectedProject(project);
    setModalMediaIndex(getMediaIndex(project.id));
  };

  return (
    <section id="projects" className="bg-slate-50 border-b border-slate-200 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Provenance Explanation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-700 mb-2">
              Our Projects &amp; Installation Gallery
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Project portfolio across residential, commercial, and industrial solar systems.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mt-3">
              Each entry details the client&apos;s needs, solution provided, system size (kW), and
              estimated annual energy production (kWh). Actual SYNSOLARISE site photos and video
              are labeled separately from illustrative sample photography.
            </p>
          </div>
        </div>

        {/* All 8 Gallery Category Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects and installation gallery by category"
          className="mt-6 flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-lg"
        >
          {GALLERY_CATEGORIES.map((category) => {
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
                    : 'text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-base font-semibold text-[#0B1F3A]">
              No projects currently listed under this filter
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#0B1F3A] rounded-md cursor-pointer"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              const activeIdx = getMediaIndex(project.id);
              const activeMedia = project.media[activeIdx] ?? project.media[0];
              const isFeaturedWide = filteredProjects.length % 2 === 1 && idx === 0;
              const isRealSite = project.provenance === 'Actual Synsolarise Site';

              return (
                <article
                  key={project.id}
                  className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between ${
                    isFeaturedWide ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div
                    className={
                      isFeaturedWide ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch' : ''
                    }
                  >
                    {/* Media Stage with Multi-Stage / Before-After Switcher & Enlarge Button */}
                    <div
                      className={`flex flex-col bg-[#0B1F3A] border-b border-slate-200 ${
                        isFeaturedWide ? 'lg:col-span-6 lg:border-b-0 lg:border-r' : ''
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full flex-1 bg-[#0B1F3A] overflow-hidden group">
                        {activeMedia.type === 'video' ? (
                          <video
                            key={activeMedia.src}
                            src={activeMedia.src}
                            controls
                            playsInline
                            preload="metadata"
                            aria-label={activeMedia.alt}
                            className="w-full h-full object-contain bg-[#0B1F3A]"
                          />
                        ) : (
                          <ResilientImage
                            src={activeMedia.src}
                            alt={activeMedia.alt}
                            fallbackTitle={project.title}
                            className="w-full h-full object-cover"
                          />
                        )}

                        {activeMedia.type === 'image' && (
                          <button
                            type="button"
                            onClick={() => handleOpenProject(project)}
                            aria-label={`Enlarge photograph for ${project.title}`}
                            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B1F3A]/85 hover:bg-[#0B1F3A] rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                          >
                            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                            Enlarge
                          </button>
                        )}
                      </div>

                      {project.media.length > 1 && (
                        <div className="bg-slate-50 border-t border-slate-200 px-3 py-2 flex flex-wrap items-center gap-1.5">
                          {project.media.map((item, mediaIdx) => {
                            const isMediaActive = mediaIdx === activeIdx;
                            return (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() =>
                                  setMediaIndexByProject((prev) => ({
                                    ...prev,
                                    [project.id]: mediaIdx,
                                  }))
                                }
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                                  isMediaActive
                                    ? 'bg-[#0B1F3A] text-white'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {item.type === 'video' && (
                                  <Play className="w-3 h-3" aria-hidden="true" />
                                )}
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Engineering Brief & Quantified Metrics */}
                    <div
                      className={`p-6 sm:p-7 flex flex-col justify-between ${
                        isFeaturedWide ? 'lg:col-span-6' : ''
                      }`}
                    >
                      <div>
                        {/* Quiet Unboxed Metadata Line with Clear Provenance Distinction */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                          <span
                            className={`font-semibold ${
                              isRealSite ? 'text-emerald-700' : 'text-slate-700'
                            }`}
                          >
                            {project.provenance}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{project.sector}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.location}</span>
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0B1F3A]">
                          {project.title}
                        </h3>

                        {/* System Size (kW) & Estimated Annual Energy Production (kWh) */}
                        <dl className="grid grid-cols-2 gap-4 mt-5 py-4 border-y border-slate-200">
                          <div>
                            <dt className="text-xs text-slate-500">System Size (kW)</dt>
                            <dd className="font-mono text-xl font-semibold text-[#0B1F3A] mt-0.5 tabular-nums">
                              {project.systemSizeKw}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-slate-500">Est. Annual Production (kWh)</dt>
                            <dd className="font-mono text-xl font-semibold text-emerald-700 mt-0.5 tabular-nums">
                              {project.annualProductionKwh}
                            </dd>
                          </div>
                        </dl>

                        {/* Client Needs & Solution Provided */}
                        <div className="mt-5 space-y-3 text-sm leading-relaxed">
                          <div>
                            <p className="text-xs font-semibold text-[#0B1F3A]">Client&apos;s Needs</p>
                            <p className="text-slate-600 mt-0.5">{project.clientNeeds}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#0B1F3A]">
                              Solution Provided
                            </p>
                            <p className="text-slate-700 mt-0.5">{project.solutionProvided}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-xs text-slate-600 tabular-nums">
                          {project.commissioningHighlight}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-semibold text-[#0B1F3A] bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                        >
                          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          Enlarge &amp; Details
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Enlargeable Lightbox Gallery & Case Study Modal */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/80"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">
                  <span
                    className={`font-semibold ${
                      inspectedProject.provenance === 'Actual Synsolarise Site'
                        ? 'text-emerald-700'
                        : 'text-slate-700'
                    }`}
                  >
                    {inspectedProject.provenance}
                  </span>{' '}
                  · <span className="capitalize">{inspectedProject.sector}</span> ·{' '}
                  {inspectedProject.location}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-xl sm:text-2xl font-bold text-[#0B1F3A] mt-0.5"
                >
                  {inspectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close installation gallery"
                className="w-10 h-10 inline-flex items-center justify-center rounded-md text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="rounded-lg overflow-hidden border border-slate-200 bg-[#0B1F3A]">
                {(() => {
                  const current =
                    inspectedProject.media[modalMediaIndex] ?? inspectedProject.media[0];
                  return current.type === 'video' ? (
                    <video
                      key={current.src}
                      src={current.src}
                      controls
                      playsInline
                      className="w-full max-h-[480px] object-contain bg-[#0B1F3A]"
                    />
                  ) : (
                    <ResilientImage
                      src={current.src}
                      alt={current.alt}
                      fallbackTitle={inspectedProject.title}
                      className="w-full max-h-[480px] object-contain bg-[#0B1F3A]"
                    />
                  );
                })()}
              </div>

              {inspectedProject.media.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  {inspectedProject.media.map((item, idx) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setModalMediaIndex(idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                        idx === modalMediaIndex
                          ? 'bg-[#0B1F3A] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {item.type === 'video' && <Play className="w-3.5 h-3.5" aria-hidden="true" />}
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <dt className="text-xs text-slate-500">System Size</dt>
                  <dd className="font-mono text-lg font-semibold text-[#0B1F3A] mt-0.5 tabular-nums">
                    {inspectedProject.systemSizeKw}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Est. Annual Production</dt>
                  <dd className="font-mono text-lg font-semibold text-emerald-700 mt-0.5 tabular-nums">
                    {inspectedProject.annualProductionKwh}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Configuration Highlight</dt>
                  <dd className="font-mono text-sm font-medium text-slate-900 mt-1 tabular-nums">
                    {inspectedProject.commissioningHighlight}
                  </dd>
                </div>
              </dl>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#0B1F3A] mb-1.5">Client&apos;s Needs</h4>
                  <p className="text-slate-600">{inspectedProject.clientNeeds}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0B1F3A] mb-1.5">Solution Provided</h4>
                  <p className="text-slate-700">{inspectedProject.solutionProvided}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-[#0B1F3A] mb-2">
                  Equipment &amp; Electrical Protection Deployed
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {inspectedProject.equipmentDeployed.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInspectedProject(null)}
                  className="px-4 py-2.5 min-h-[40px] text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
                >
                  Close
                </button>
                {onRequestSimilarProject && (
                  <button
                    type="button"
                    onClick={() => {
                      const sector = inspectedProject.sector;
                      setInspectedProject(null);
                      onRequestSimilarProject(sector);
                    }}
                    className="px-4 py-2.5 min-h-[40px] text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md cursor-pointer"
                  >
                    Request Similar System Quote
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
