import React from 'react';
import { MapPin, Phone, Instagram, Car, MessageCircle, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const LocationContactSection: React.FC = () => {
  const { clinicInfo, getWhatsAppUrl } = useClinic();

  const fullAddress = `${clinicInfo.endereco}, ${clinicInfo.bairro}, ${clinicInfo.cidade} - ${clinicInfo.uf}, CEP ${clinicInfo.cep}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Rua Estevão Furquim, 400B, Vila São Vicente, São Paulo - SP'
  )}`;
  const contactWhatsAppUrl = getWhatsAppUrl(
    'Olá, Márcia! Gostaria de tirar algumas dúvidas e obter informações sobre o endereço e atendimento da clínica.'
  );

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
            <span>Localização & Contato</span>
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2625] font-normal tracking-tight">
            Venha viver essa experiência.
          </h2>
          <p className="text-sm sm:text-base text-[#685E5A]">
            Um refúgio de tranquilidade na Zona Norte de São Paulo, preparado com carinho para acolher você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white border border-[#E9E1D8] p-8 sm:p-10 rounded-xs shadow-xs flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#2B2625] font-normal">
                  {clinicInfo.nomeComercial}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium mt-1">
                  {clinicInfo.regiao}
                </p>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#2B2625]">{clinicInfo.endereco}</div>
                  <div className="text-[#685E5A]">{clinicInfo.bairro}</div>
                  <div className="text-[#685E5A]">{clinicInfo.cidade} - {clinicInfo.uf}</div>
                  <div className="text-xs text-[#8C6D46] mt-0.5">CEP {clinicInfo.cep}</div>
                </div>
              </div>

              {/* Parking highlight */}
              <div className="flex items-center gap-4 p-3 bg-[#FAF8F5] rounded-xs border border-[#E9E1D8]">
                <div className="p-2 rounded-xs bg-white text-[#8C6D46] shadow-xs">
                  <Car className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-[#2B2625]">Estacionamento disponível</span>
                  <p className="text-[#685E5A]">Praticidade e comodidade na sua visita</p>
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#2B2625]">Telefone / WhatsApp</div>
                  <div className="text-[#685E5A] tabular-nums">{clinicInfo.telefone}</div>
                  <div className="text-xs text-[#8C6D46] mt-0.5">Atendimento personalizado com horário marcado</div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xs bg-[#F4EFEA] text-[#8C6D46] shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#2B2625]">Instagram Oficial</div>
                  <a
                    href={`https://instagram.com/${clinicInfo.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8C6D46] hover:underline"
                  >
                    @{clinicInfo.instagram}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#E9E1D8] space-y-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] active:scale-[0.99] transition-all rounded-xs text-center flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#E7D7CE]" />
                <span>Como chegar</span>
              </a>

              <a
                href={contactWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-medium tracking-wide text-[#2B2625] bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#D9CCC0] hover:border-[#8C6D46] transition-all rounded-xs text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#8C6D46]" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="lg:col-span-7 bg-white border border-[#E9E1D8] rounded-xs overflow-hidden shadow-xs relative min-h-[420px] flex flex-col">
            <div className="p-4 bg-[#F4EFEA] border-b border-[#E9E1D8] flex items-center justify-between text-xs text-[#685E5A]">
              <span className="font-medium text-[#2B2625]">Freguesia do Ó · Vila São Vicente · São Paulo</span>
              <span className="text-[#8C6D46]">Zona Norte SP</span>
            </div>

            <iframe
              title="Localização Marcia Martins Estética"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3658.9184561081395!2d-46.70200842378877!3d-23.493902978848416!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x94cef843bc407b77%3A0x600f91ef5220c5d7!2sR.%20Estev%C3%A3o%20Furquim%2C%20400b%20-%20Vila%20S%C3%A3o%20Vicente%20(Zona%20Norte)%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002733-000!5e0!3m2!1spt-BR!2sbr!4v1711200000000!5m2!1spt-BR!2sbr"
              className="w-full flex-1 border-0 min-h-[360px]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
