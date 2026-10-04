import React from 'react';
import { Heart, Sparkles, Award, Compass, Flower2, Check } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const AboutSection: React.FC = () => {
  const { clinicInfo, openBookingModal } = useClinic();

  const pillars = [
    {
      title: 'Atendimento personalizado',
      description: 'Análise minuciosa de cada detalhe da sua pele e necessidades individuais.',
      icon: Compass
    },
    {
      title: 'Cuidado humanizado',
      description: 'Acolhimento com calma e atenção genuína desde o primeiro instante.',
      icon: Heart
    },
    {
      title: 'Produtos de qualidade',
      description: 'Uso exclusivo de cosméticos e ativos dermocosméticos seguros e de alta performance.',
      icon: Award
    },
    {
      title: 'Experiência individualizada',
      description: 'Ambiente silencioso, privativo e pensado nos mínimos detalhes para seu bem-estar.',
      icon: Flower2
    },
    {
      title: 'Resultados naturais',
      description: 'Harmonia, viço e jovialidade sem procedimentos agressivos ou artificiais.',
      icon: Sparkles
    }
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-[#F4EFEA]/70 border-y border-[#E9E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative max-w-md mx-auto">
              {/* Outer delicate frame */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#D9CCC0] rounded-xs -z-10" />

              <div className="relative rounded-xs overflow-hidden shadow-lg aspect-[4/5] bg-[#E9E1D8]">
                <img
                  src="/src/assets/images/marcia_martins_portrait_1791091540956.jpg"
                  alt="Márcia Martins - Especialista em Rejuvenescimento Natural"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2625]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="font-serif text-2xl font-medium tracking-wide">Márcia Martins</h3>
                  <p className="text-xs uppercase tracking-widest text-[#E7D7CE] mt-0.5">
                    {clinicInfo.posicionamento}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Text Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
              <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
              <span>Sobre a Profissional</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2625] font-normal leading-tight">
              Cuidado que começa pela escuta.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#685E5A] font-normal leading-relaxed">
              <p>
                Cada mulher possui necessidades, características e objetivos diferentes. Por isso, os tratamentos da Marcia Martins Estética são planejados de maneira personalizada, respeitando sua individualidade e buscando resultados naturais, harmônicos e responsáveis.
              </p>
              <p className="text-sm sm:text-base text-[#685E5A]/90">
                Márcia Martins atua com dedicação voltada ao cuidado da pele, corpo, beleza, autoestima e bem-estar feminino, criando uma atmosfera onde a saúde da pele caminha lado a lado com a tranquilidade da mente.
              </p>
            </div>

            {/* 5 Distinct Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`flex items-start gap-3 p-3.5 rounded-xs bg-white/60 border border-[#E9E1D8]/80 hover:bg-white transition-colors ${
                      idx === pillars.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="p-2 rounded-xs bg-[#FAF8F5] text-[#8C6D46] shrink-0 border border-[#E9E1D8]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2B2625]">{pillar.title}</h4>
                      <p className="text-xs text-[#685E5A] mt-0.5 leading-normal">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick appointment invite */}
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2B2625] hover:text-[#8C6D46] group transition-colors"
              >
                <span>Conheça a experiência Márcia Martins</span>
                <span className="w-8 h-[1px] bg-[#2B2625] group-hover:bg-[#8C6D46] group-hover:w-12 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
