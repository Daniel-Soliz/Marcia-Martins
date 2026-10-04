import React from 'react';
import { Star, MessageCircle, ArrowRight, ShieldCheck, Sparkles, Car, UserCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Hero: React.FC = () => {
  const { clinicInfo, getWhatsAppUrl, openBookingModal } = useClinic();

  const heroWhatsAppUrl = getWhatsAppUrl(
    'Olá, Márcia! Conheci seu trabalho pelo site e gostaria de saber mais sobre os tratamentos e agendar uma avaliação.'
  );

  return (
    <section id="inicio" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Subtle warm ambient background gradients */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E7D7CE]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-80 h-80 bg-[#DFCAAB]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Kicker without static pill enclosure */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#8C6D46] tracking-widest uppercase">
              <span className="w-6 h-[1px] bg-[#C4A47C]" />
              <span>{clinicInfo.posicionamento}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2B2625] font-normal leading-[1.12] tracking-tight [text-wrap:balance]">
              Realce sua beleza de <span className="italic font-light text-[#8C6D46]">forma natural</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#685E5A] font-normal leading-relaxed max-w-xl">
              Tratamentos personalizados para cuidar da sua pele, do seu corpo e da sua autoestima.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#2B2625] hover:bg-[#3E3735] active:scale-[0.99] transition-all rounded-xs shadow-md flex items-center justify-center gap-2.5 group"
              >
                <MessageCircle className="w-4 h-4 text-[#E7D7CE] group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap">Agendar minha avaliação</span>
              </a>

              <a
                href="#tratamentos"
                className="px-6 py-4 text-xs sm:text-sm font-medium text-[#2B2625] bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#D9CCC0] hover:border-[#8C6D46] active:scale-[0.99] transition-all rounded-xs flex items-center justify-center gap-2 group"
              >
                <span className="whitespace-nowrap">Conhecer tratamentos</span>
                <ArrowRight className="w-4 h-4 text-[#8C6D46] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Direct quick action reminder */}
            <p className="text-xs text-[#8C6D46] pt-1">
              Atendimento exclusivo com horário marcado na Freguesia do Ó, Zona Norte de SP.
            </p>
          </div>

          {/* Hero Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative delicate outline border */}
              <div className="absolute -top-3 -right-3 w-full h-full border border-[#D9CCC0] rounded-sm -z-10 hidden sm:block" />

              {/* Main Image Frame */}
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/5] bg-[#E9E1D8]">
                <img
                  src="/src/assets/images/hero_clinic_wellness_1791091531095.jpg"
                  alt="Espaço Marcia Martins Estética na Freguesia do Ó"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2625]/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Quote / Brand Statement */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-serif italic text-base sm:text-lg leading-snug drop-shadow-xs">
                    "{clinicInfo.fraseMarca}"
                  </p>
                  <p className="text-[11px] tracking-widest uppercase text-[#FAF8F5]/80 mt-1">
                    — {clinicInfo.profissional}
                  </p>
                </div>
              </div>

              {/* Google Review Floating Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm p-3.5 sm:p-4 rounded-xs border border-[#E9E1D8] shadow-lg max-w-[210px]">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-[#2B2625]">
                  5,0 no Google
                </div>
                <div className="text-[11px] text-[#685E5A]">
                  30 avaliações de clientes reais
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators below Hero */}
        <div className="mt-16 pt-8 border-t border-[#E9E1D8]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-4 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0">
                <Star className="w-4 h-4 fill-[#C4A47C] text-[#C4A47C]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B2625] tabular-nums">5,0 no Google</div>
                <div className="text-xs text-[#685E5A]">Avaliação máxima</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0">
                <Sparkles className="w-4 h-4 text-[#8C6D46]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B2625] tabular-nums">30+ Avaliações</div>
                <div className="text-xs text-[#685E5A]">100% de satisfação</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0">
                <UserCheck className="w-4 h-4 text-[#8C6D46]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B2625]">Atendimento Único</div>
                <div className="text-xs text-[#685E5A]">Totalmente personalizado</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#8C6D46]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B2625]">Especialista</div>
                <div className="text-xs text-[#685E5A]">Rejuvenescimento Natural</div>
              </div>
            </div>

            <div className="flex items-start gap-3 col-span-2 md:col-span-1">
              <div className="p-2 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0">
                <Car className="w-4 h-4 text-[#8C6D46]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B2625]">Estacionamento</div>
                <div className="text-xs text-[#685E5A]">Disponível no local</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
