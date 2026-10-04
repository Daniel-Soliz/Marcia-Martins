import React from 'react';
import { X, Clock, Check, Sparkles, AlertCircle, Calendar } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const TreatmentDetailModal: React.FC = () => {
  const {
    selectedTreatmentForDetail,
    closeTreatmentDetail,
    openBookingModal
  } = useClinic();

  if (!selectedTreatmentForDetail) return null;

  const t = selectedTreatmentForDetail;

  const handleBookThis = () => {
    closeTreatmentDetail();
    openBookingModal(t);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={closeTreatmentDetail}
    >
      <div
        className="bg-[#FAF8F5] max-w-2xl w-full rounded-xs shadow-2xl border border-[#D9CCC0] overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Header with close button */}
        <div className="relative aspect-[16/9] bg-[#E9E1D8]">
          <img
            src={t.imagem}
            alt={t.nome}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2625]/85 via-[#2B2625]/30 to-transparent" />

          <button
            onClick={closeTreatmentDetail}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#DFCAAB] font-medium">
              {t.categoria}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white leading-tight">
              {t.nome}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white border border-[#E9E1D8] rounded-xs text-xs text-[#2B2625]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8C6D46]" />
              <span>Duração estimada: <strong className="tabular-nums">{t.duracao}</strong></span>
            </div>
            {t.preco && (
              <div>
                <span>Investimento: <strong>{t.preco}</strong></span>
              </div>
            )}
          </div>

          {/* Detailed description */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
              Sobre o Tratamento
            </h4>
            <p className="text-sm text-[#685E5A] leading-relaxed">
              {t.descricaoCompleta || t.descricao}
            </p>
          </div>

          {/* Benefits */}
          {t.beneficios && t.beneficios.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-[#8C6D46] font-semibold">
                Principais Benefícios
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.beneficios.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2B2625] bg-white p-2.5 rounded-xs border border-[#E9E1D8]">
                    <Check className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {t.recomendacoes && (
            <div className="p-4 bg-[#F4EFEA] border border-[#E9E1D8] rounded-xs flex items-start gap-3 text-xs text-[#685E5A]">
              <AlertCircle className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B2625] block">Recomendações:</strong>
                <span>{t.recomendacoes}</span>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBookThis}
              className="flex-1 py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] transition-all rounded-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#E7D7CE]" />
              <span>Solicitar Agendamento deste Tratamento</span>
            </button>
            <button
              onClick={closeTreatmentDetail}
              className="py-3.5 px-6 text-xs font-medium text-[#2B2625] bg-white border border-[#D9CCC0] hover:bg-[#F4EFEA] transition-colors rounded-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
