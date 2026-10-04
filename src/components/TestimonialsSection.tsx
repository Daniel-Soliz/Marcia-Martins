import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, clinicInfo } = useClinic();

  return (
    <section id="avaliacoes" className="py-20 lg:py-28 bg-[#F4EFEA]/80 border-t border-[#E9E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
            <span>Depoimentos Reais</span>
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2625] font-normal tracking-tight">
            O que nossas clientes dizem
          </h2>
          <p className="text-sm sm:text-base text-[#685E5A]">
            Experiências autênticas compartilhadas por quem viveu o cuidado, o acolhimento e a dedicação da Márcia Martins.
          </p>

          {/* Google Ratings Badge */}
          <div className="pt-3 inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-xs border border-[#E9E1D8] shadow-xs">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2B2625] font-medium">
              <span className="font-bold text-sm tabular-nums">5,0</span>
              <span>no Google</span>
              <span className="text-[#D9CCC0]">·</span>
              <span className="text-[#685E5A] tabular-nums">{clinicInfo.googleReviewsCount} avaliações</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="bg-white border border-[#E9E1D8] p-8 rounded-xs shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Top star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#E9E1D8] group-hover:text-[#C4A47C] transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#2B2625]/90 italic font-serif leading-relaxed">
                  "{item.texto}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 mt-6 border-t border-[#E9E1D8]/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E9E1D8] flex items-center justify-center text-[#8C6D46] font-medium text-xs">
                    G
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#2B2625]">
                      {item.nome || 'Cliente Verificada'}
                    </div>
                    <div className="text-[11px] text-[#685E5A] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{item.origem}</span>
                    </div>
                  </div>
                </div>

                {item.data && (
                  <span className="text-[11px] text-[#8C6D46] font-medium">
                    {item.data}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
