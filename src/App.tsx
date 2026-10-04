import React from 'react';
import { ClinicProvider, useClinic } from './context/ClinicContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { CustomEvaluationSection } from './components/CustomEvaluationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResultsGallerySection } from './components/ResultsGallerySection';
import { InstagramSection } from './components/InstagramSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { AdminPanel } from './components/AdminPanel';

const MainContent: React.FC = () => {
  const { isAdminOpen } = useClinic();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2B2625] selection:bg-[#E7D7CE] selection:text-[#2B2625] overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <TreatmentsSection />
        <CustomEvaluationSection />
        <TestimonialsSection />
        <ResultsGallerySection />
        <InstagramSection />
        <LocationContactSection />
      </main>

      <Footer />

      {/* Floating Interactive Elements */}
      <FloatingWhatsApp />
      <BookingModal />
      <TreatmentDetailModal />

      {/* Administrative Panel (Overlay / Protected Screen) */}
      {isAdminOpen && <AdminPanel />}
    </div>
  );
};

export default function App() {
  return (
    <ClinicProvider>
      <MainContent />
    </ClinicProvider>
  );
}
