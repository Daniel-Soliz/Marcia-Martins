import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, FileText, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    treatments,
    selectedTreatmentForBooking,
    clinicInfo,
    createAppointmentRequest,
    generateBookingWhatsAppMessage
  } = useClinic();

  const [tratamentoNome, setTratamentoNome] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [observacao, setObservacao] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [formError, setFormError] = useState('');

  // Prepopulate treatment if passed
  useEffect(() => {
    if (selectedTreatmentForBooking) {
      setTratamentoNome(selectedTreatmentForBooking.nome);
    } else if (treatments.length > 0 && !tratamentoNome) {
      setTratamentoNome(treatments[0].nome);
    }
  }, [selectedTreatmentForBooking, treatments]);

  // Set default min date to today
  const today = new Date().toISOString().split('T')[0];

  // Auto-mask Brazilian phone: (11) 98987-1538
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setTelefone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!nome.trim()) {
      setFormError('Por favor, informe seu nome.');
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe um número de telefone com DDD válido.');
      return;
    }

    if (!data) {
      setFormError('Por favor, selecione uma data preferencial.');
      return;
    }

    if (!horario) {
      setFormError('Por favor, selecione um horário preferencial.');
      return;
    }

    // Format human readable date: e.g. 06/10/2026
    const [year, month, day] = data.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // 1. Record in application state / storage
    createAppointmentRequest({
      cliente_nome: nome.trim(),
      cliente_telefone: telefone,
      tratamento: tratamentoNome || 'Avaliação Personalizada',
      data: formattedDate,
      horario,
      observacao: observacao.trim() || undefined
    });

    // 2. Prepare structured WhatsApp message
    const msg = generateBookingWhatsAppMessage({
      cliente_nome: nome.trim(),
      cliente_telefone: telefone,
      tratamento: tratamentoNome || 'Avaliação Personalizada',
      data: formattedDate,
      horario,
      observacao: observacao.trim() || undefined
    });

    const clinicWhatsApp = clinicInfo.whatsapp.replace(/\D/g, '') || '5511989871538';
    const waUrl = `https://wa.me/${clinicWhatsApp}?text=${encodeURIComponent(msg)}`;
    setWhatsappLink(waUrl);
    setSubmitted(true);

    // Open WhatsApp in new tab automatically
    window.open(waUrl, '_blank');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormError('');
    setNome('');
    setTelefone('');
    setObservacao('');
    setData('');
    setHorario('');
    closeBookingModal();
  };

  if (!isBookingModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-[#FAF8F5] max-w-xl w-full rounded-xs shadow-2xl border border-[#D9CCC0] overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2B2625] text-white p-6 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-normal">
              Solicitação de Agendamento
            </h3>
            <p className="text-xs text-[#E9E1D8]/80 mt-0.5">
              {clinicInfo.nomeComercial} · Freguesia do Ó
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-[#E9E1D8] hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Clarification Notice */}
        <div className="bg-[#F4EFEA] border-b border-[#E9E1D8] px-6 py-3 flex items-start gap-2.5 text-xs text-[#685E5A]">
          <AlertCircle className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
          <span>
            Esta é uma <strong>solicitação de agendamento</strong>. Seus dados serão enviados para o WhatsApp da Márcia para confirmação do horário ideal.
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl text-[#2B2625]">
                Solicitação enviada com sucesso!
              </h4>

              <p className="text-sm text-[#685E5A] max-w-md mx-auto leading-relaxed">
                Os dados do seu agendamento foram registrados e a conversa com a <strong>Márcia Martins</strong> foi aberta no WhatsApp.
              </p>

              <div className="bg-white border border-[#E9E1D8] p-4 rounded-xs text-left text-xs text-[#2B2625] space-y-1.5 max-w-md mx-auto">
                <div><strong>Cliente:</strong> {nome}</div>
                <div><strong>Tratamento:</strong> {tratamentoNome}</div>
                <div><strong>Data & Horário:</strong> {data.split('-').reverse().join('/')} às {horario}</div>
                <div><strong>Telefone:</strong> {telefone}</div>
                {observacao && <div><strong>Observação:</strong> {observacao}</div>}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                {whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20BD5A] transition-colors rounded-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reabrir WhatsApp</span>
                  </a>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 text-xs font-medium text-[#2B2625] bg-[#FAF8F5] border border-[#D9CCC0] hover:bg-[#F4EFEA] transition-colors rounded-xs"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                  {formError}
                </div>
              )}

              {/* 1. Escolher Tratamento */}
              <div>
                <label className="block text-xs font-medium text-[#2B2625] mb-1">
                  1. Escolha o tratamento desejado:
                </label>
                <select
                  value={tratamentoNome}
                  onChange={e => setTratamentoNome(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                >
                  {treatments.filter(t => t.ativo).map(t => (
                    <option key={t.id} value={t.nome}>
                      {t.nome} ({t.categoria} · {t.duracao})
                    </option>
                  ))}
                  <option value="Avaliação Personalizada com a Márcia">
                    Avaliação Personalizada com a Márcia (Recomendado para primeira visita)
                  </option>
                </select>
              </div>

              {/* 2 & 3. Data e Horário */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B2625] mb-1">
                    2. Data de preferência:
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={today}
                      value={data}
                      onChange={e => setData(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B2625] mb-1">
                    3. Horário de preferência:
                  </label>
                  <select
                    value={horario}
                    onChange={e => setHorario(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                  >
                    <option value="">Selecione um horário...</option>
                    {clinicInfo.horariosDisponiveis.map(h => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4 & 5. Nome e Telefone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B2625] mb-1">
                    4. Seu nome completo:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ex: Ana Silva"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B2625] mb-1">
                    5. Telefone / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 90000-0000"
                    value={telefone}
                    onChange={handlePhoneChange}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                  />
                </div>
              </div>

              {/* 6. Observação opcional */}
              <div>
                <label className="block text-xs font-medium text-[#2B2625] mb-1">
                  6. Observações ou dúvidas (opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Primeira vez na clínica, tenho sensibilidade na pele..."
                  value={observacao}
                  onChange={e => setObservacao(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C] resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] active:scale-[0.99] transition-all rounded-xs shadow-md flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#E7D7CE] group-hover:scale-110 transition-transform" />
                  <span>Enviar Solicitação pelo WhatsApp</span>
                </button>
                <p className="text-[11px] text-[#685E5A] text-center mt-2">
                  Ao clicar, você será direcionada para o WhatsApp oficial da Márcia para finalizar a confirmação.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
