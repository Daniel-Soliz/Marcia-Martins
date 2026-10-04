import React from 'react';
import { Calendar, Sparkles, MessageCircle, HeartHandshake } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const CustomEvaluationSection: React.FC = () => {
  const { openBookingModal, getWhatsAppUrl } = useClinic();

  const evalWhatsAppUrl = getWhatsAppUrl(
    'Olá, Márcia! Gostaria de agendar uma avaliação personalizada para entender o melhor protocolo para a minha pele.'
  );

  return (
    <section className="relative py-20 lg:py-24 bg-[#2B2625] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-0 w-96 h-96 bg-[#8C6D46]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-0 w-80 h-80 bg-[#C4A47C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#DFCAAB] tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#DFCAAB]" />
          <span>Atendimento Exclusivo</span>
          <Sparkles className="w-3.5 h-3.5 text-[#DFCAAB]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight [text-wrap:balance]">
          Seu cuidado começa com uma <span className="italic text-[#DFCAAB]">avaliação personalizada</span>.
        </h2>

        <p className="text-base sm:text-lg text-[#E9E1D8] font-normal leading-relaxed max-w-2xl mx-auto">
          Entendemos seus objetivos, rotina e características para definir o protocolo mais adequado e seguro para você. Resultados harmônicos nascem da atenção e do respeito à sua beleza única.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#2B2625] bg-[#E7D7CE] hover:bg-white active:scale-[0.99] transition-all rounded-xs shadow-md flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4 text-[#8C6D46] group-hover:scale-110 transition-transform" />
            <span>Quero agendar minha avaliação</span>
          </button>

          <a
            href={evalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 text-xs sm:text-sm font-medium tracking-wide text-[#FAF8F5] border border-[#E9E1D8]/40 hover:border-[#DFCAAB] hover:text-white transition-all rounded-xs flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#DFCAAB]" />
            <span>Tirar dúvidas pelo WhatsApp</span>
          </a>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E9E1D8]/80">
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-[#DFCAAB]" />
            Escuta individual
          </span>
          <span>·</span>
          <span>Ambiente tranquilo e reservado</span>
          <span>·</span>
          <span>Freguesia do Ó com estacionamento</span>
        </div>
      </div>
    </section>
  );
};
