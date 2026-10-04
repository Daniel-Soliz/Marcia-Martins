import React, { useState } from 'react';
import { Clock, Check, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Treatment, TreatmentCategory } from '../types';

export const TreatmentsSection: React.FC = () => {
  const { treatments, openTreatmentDetail, openBookingModal } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories: string[] = [
    'Todos',
    'Rejuvenescimento Natural',
    'Tratamentos Faciais',
    'Cuidados Corporais',
    'Drenagem',
    'Protocolos Personalizados'
  ];

  const activeTreatments = treatments.filter(t => t.ativo);

  const filteredTreatments = selectedCategory === 'Todos'
    ? activeTreatments
    : activeTreatments.filter(t => t.categoria === selectedCategory);

  return (
    <section id="tratamentos" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
            <span>Cuidado Especializado</span>
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2625] font-normal tracking-tight">
            Tratamentos pensados para você
          </h2>
          <p className="text-sm sm:text-base text-[#685E5A]">
            Protocolos planejados para promover saúde, viço, rejuvenescimento e relaxamento, respeitando sempre sua individualidade.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-12 p-1.5 bg-[#F4EFEA] border border-[#E9E1D8] rounded-xs max-w-4xl mx-auto">
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium tracking-wide transition-all rounded-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2B2625] text-white shadow-xs'
                    : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map(treatment => (
            <div
              key={treatment.id}
              className="group bg-white border border-[#E9E1D8] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C4A47C] hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Image Slot with Fallback Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E9E1D8]">
                  <img
                    src={treatment.imagem}
                    alt={treatment.nome}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed category label */}
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-[#2B2625] rounded-xs border border-[#E9E1D8]">
                    {treatment.categoria}
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium text-white rounded-xs flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#E7D7CE]" />
                    <span className="tabular-nums">{treatment.duracao}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2625] font-normal leading-snug group-hover:text-[#8C6D46] transition-colors">
                    {treatment.nome}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#685E5A] line-clamp-3 leading-relaxed">
                    {treatment.descricao}
                  </p>

                  {/* Key Benefits Preview */}
                  {treatment.beneficios && treatment.beneficios.length > 0 && (
                    <div className="pt-2 border-t border-[#E9E1D8]/60 space-y-1.5">
                      {treatment.beneficios.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#2B2625]/85">
                          <Check className="w-3.5 h-3.5 text-[#8C6D46] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openTreatmentDetail(treatment)}
                    className="py-2.5 px-3 text-xs font-medium text-[#2B2625] bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#D9CCC0] rounded-xs text-center transition-colors"
                  >
                    Saiba mais
                  </button>
                  <button
                    onClick={() => openBookingModal(treatment)}
                    className="py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3D3634] rounded-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3 h-3 text-[#E7D7CE]" />
                    <span>Agendar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTreatments.length === 0 && (
          <div className="text-center py-12 bg-[#F4EFEA]/50 rounded-xs border border-[#E9E1D8]">
            <p className="text-sm text-[#685E5A]">Nenhum tratamento ativo encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
};
