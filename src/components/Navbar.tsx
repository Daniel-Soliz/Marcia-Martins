import React, { useState } from 'react';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Navbar: React.FC = () => {
  const { clinicInfo, openBookingModal, setIsAdminOpen } = useClinic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Tratamentos', href: '#tratamentos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E9E1D8]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#inicio"
            className="group flex flex-col justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A47C]"
          >
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#2B2625] group-hover:text-[#8C6D46] transition-colors">
              Marcia Martins
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#8C6D46] font-medium -mt-1">
              Estética & Bem-Estar
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#685E5A] hover:text-[#2B2625] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C4A47C] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${clinicInfo.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-medium text-[#685E5A] hover:text-[#2B2625] transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C4A47C]" />
              <span className="whitespace-nowrap">{clinicInfo.telefone}</span>
            </a>
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#2B2625] hover:bg-[#3D3634] active:scale-[0.98] transition-all rounded-sm shadow-xs flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E7D7CE]" />
              <span className="whitespace-nowrap">Agendar Avaliação</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => openBookingModal()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2B2625] rounded-sm"
            >
              Agendar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2B2625] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A47C]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF8F5] border-b border-[#E9E1D8] px-5 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2B2625] py-2 border-b border-[#E9E1D8]/40"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3 text-sm font-semibold tracking-wider uppercase text-white bg-[#2B2625] rounded-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#E7D7CE]" />
              <span>Solicitar Agendamento</span>
            </button>
            <div className="flex justify-between items-center text-xs text-[#685E5A] pt-2">
              <span>{clinicInfo.telefone}</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="text-[#8C6D46] hover:underline"
              >
                Painel da Especialista
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
