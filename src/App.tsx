/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AccessoriesCatalog } from './components/AccessoriesCatalog';
import { BrandsAndAboutSection } from './components/BrandsAndAboutSection';
import { FaqSection } from './components/FaqSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { SOLAR_SERVICES, type SectorId } from './data/synsolariseData';

export default function App() {
  const [selectedSector, setSelectedSector] = useState<SectorId>('residential');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>(
    SOLAR_SERVICES[0].title
  );
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleAccessory = (id: string) => {
    setSelectedAccessoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    if (serviceTitle.toLowerCase().includes('commercial')) {
      setSelectedSector('commercial');
    } else if (serviceTitle.toLowerCase().includes('industrial')) {
      setSelectedSector('industrial');
    } else if (serviceTitle.toLowerCase().includes('residential')) {
      setSelectedSector('residential');
    }
    scrollToSection('contact');
  };

  const handleSelectSectorForQuote = (sector: SectorId) => {
    setSelectedSector(sector);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onRequestQuote={() => scrollToSection('contact')} />

      <main className="flex-1">
        <HeroSection
          onRequestQuote={() => scrollToSection('contact')}
          onExploreServices={() => scrollToSection('services')}
        />

        <ServicesSection onRequestService={handleRequestService} />

        <AccessoriesCatalog
          selectedAccessoryIds={selectedAccessoryIds}
          onToggleAccessory={handleToggleAccessory}
          onProceedToQuote={() => scrollToSection('contact')}
        />

        <BrandsAndAboutSection />

        <FaqSection onAskQuestion={() => scrollToSection('contact')} />

        <ProjectsSection onRequestSimilarProject={handleSelectSectorForQuote} />

        <TestimonialsSection onShareFeedback={() => scrollToSection('contact')} />

        <ContactSection
          selectedSector={selectedSector}
          onChangeSector={setSelectedSector}
          selectedServiceTitle={selectedServiceTitle}
          onChangeServiceTitle={setSelectedServiceTitle}
          selectedAccessoryIds={selectedAccessoryIds}
          onRemoveAccessory={(id) =>
            setSelectedAccessoryIds((prev) => prev.filter((item) => item !== id))
          }
          onClearAccessories={() => setSelectedAccessoryIds([])}
        />
      </main>

      <Footer />

      <CookieBanner />
    </div>
  );
}
