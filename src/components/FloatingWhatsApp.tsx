import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const FloatingWhatsApp: React.FC = () => {
  const { getWhatsAppUrl, clinicInfo } = useClinic();
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = getWhatsAppUrl(
    'Olá, Márcia! Conheci seu trabalho pelo site e gostaria de informações sobre os tratamentos.'
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {/* Optional dismissible floating greeting */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-[#2B2625] px-3.5 py-2 rounded-xs shadow-lg border border-[#E9E1D8] text-xs animate-in fade-in slide-in-from-bottom-2">
          <span>Dúvidas ou agendamentos? Fale com a <strong>Márcia</strong></span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#685E5A] hover:text-[#2B2625] p-0.5 ml-1"
            aria-label="Fechar balão"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com Márcia Martins pelo WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 relative"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10 group-hover:opacity-0" />
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </div>
  );
};
