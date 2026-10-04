import React, { useState } from 'react';
import { Instagram, Phone, MapPin, Heart, Shield, Lock, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const Footer: React.FC = () => {
  const { clinicInfo, setIsAdminOpen } = useClinic();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="bg-[#2B2625] text-[#FAF8F5] pt-16 pb-12 border-t border-[#3D3634]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl font-normal tracking-tight text-white block">
                {clinicInfo.nomeComercial}
              </span>
              <span className="text-[11px] tracking-widest uppercase text-[#DFCAAB] font-medium block mt-0.5">
                {clinicInfo.posicionamento}
              </span>
            </div>

            <p className="text-xs text-[#E9E1D8]/80 leading-relaxed font-light italic">
              "{clinicInfo.fraseMarca}"
            </p>

            <div className="pt-2 text-xs text-[#E9E1D8]/70 space-y-1">
              <p>Profissional: {clinicInfo.profissional}</p>
              <p>Atendimento exclusivo com hora marcada.</p>
              <p>Espaço com estacionamento no local.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#DFCAAB]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-[#E9E1D8]/80">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre a Márcia
                </a>
              </li>
              <li>
                <a href="#tratamentos" className="hover:text-white transition-colors">
                  Tratamentos
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-white transition-colors">
                  Avaliações no Google (5.0)
                </a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-white transition-colors">
                  Resultados & Experiências
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Localização & Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Details */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#DFCAAB]">
              Endereço & Atendimento
            </h4>
            <div className="space-y-2 text-xs text-[#E9E1D8]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFCAAB] shrink-0 mt-0.5" />
                <span>
                  {clinicInfo.endereco} · {clinicInfo.bairro}
                  <br />
                  {clinicInfo.cidade} - {clinicInfo.uf} · CEP {clinicInfo.cep}
                  <br />
                  <span className="text-[#DFCAAB] text-[11px]">{clinicInfo.regiao}</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#DFCAAB] shrink-0" />
                <span className="tabular-nums">{clinicInfo.telefone}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#DFCAAB] shrink-0" />
                <a
                  href={`https://instagram.com/${clinicInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-white/30"
                >
                  @{clinicInfo.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9E1D8]/60">
          <p>
            © {new Date().getFullYear()} {clinicInfo.nomeComercial}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white transition-colors"
            >
              Política de Privacidade
            </button>

            <span>·</span>

            {/* Subtle Specialist Access */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-[#DFCAAB] hover:text-white transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Painel Administrativo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 text-[#2B2625]"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="bg-[#FAF8F5] max-w-lg w-full p-6 sm:p-8 rounded-xs shadow-xl border border-[#D9CCC0] space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E9E1D8] pb-3">
              <h3 className="font-serif text-xl font-normal text-[#2B2625]">
                Política de Privacidade
              </h3>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1 text-[#685E5A] hover:text-[#2B2625]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-[#685E5A] space-y-3 leading-relaxed max-h-96 overflow-y-auto pr-1">
              <p>
                A <strong>{clinicInfo.nomeComercial}</strong> preza pela privacidade e proteção dos dados de todas as suas clientes e visitantes.
              </p>
              <p>
                Os dados fornecidos no formulário de solicitação de agendamento (como nome, telefone e observações) destinam-se exclusivamente para contato direto via WhatsApp entre a profissional Márcia Martins e a cliente, para confirmação de horários e esclarecimento de dúvidas.
              </p>
              <p>
                Nenhuma informação pessoal é vendida, repassada a terceiros ou utilizada para envio de mensagens promocionais indesejadas (spam).
              </p>
              <p>
                Em caso de dúvidas sobre o tratamento de seus dados, sinta-se à vontade para entrar em contato pelo WhatsApp oficial: {clinicInfo.telefone}.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] rounded-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
