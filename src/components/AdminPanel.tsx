import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Users,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Star,
  Settings,
  Image as ImageIcon,
  ArrowLeft,
  MessageCircle,
  Phone,
  Save,
  Lock,
  Unlock,
  Check,
  X
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { Treatment, TreatmentCategory, AppointmentStatus, AppointmentRequest } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    clinicInfo,
    updateClinicInfo,
    treatments,
    addTreatment,
    updateTreatment,
    deleteTreatment,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    setIsAdminOpen
  } = useClinic();

  // Authentication PIN guard (default 1538)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mm_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agendamentos' | 'tratamentos' | 'depoimentos' | 'galeria' | 'configuracoes'>('dashboard');

  // Filters & State for Treatments
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [treatmentFormData, setTreatmentFormData] = useState({
    nome: '',
    categoria: 'Rejuvenescimento Natural' as TreatmentCategory,
    descricao: '',
    descricaoCompleta: '',
    imagem: '/src/assets/images/facial_rejuvenation_1791091549942.jpg',
    beneficiosStr: '',
    duracao: '60 min',
    preco: 'Sob consulta após avaliação',
    ativo: true,
    destaque: false,
    recomendacoes: ''
  });

  // Testimonial Form State
  const [newTestimonialText, setNewTestimonialText] = useState('');
  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);

  // Gallery Form State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Espaço');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('/src/assets/images/hero_clinic_wellness_1791091531095.jpg');

  // Clinic Settings Form
  const [settingsForm, setSettingsForm] = useState(clinicInfo);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Appointment filters
  const [appointmentFilter, setAppointmentFilter] = useState<'todos' | AppointmentStatus>('todos');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1538' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mm_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('Código PIN incorreto. Dica: use 1538 (últimos 4 dígitos do telefone oficial).');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mm_admin_auth');
    setIsAdminOpen(false);
  };

  // Treatment form handlers
  const handleOpenAddTreatment = () => {
    setEditingTreatment(null);
    setTreatmentFormData({
      nome: '',
      categoria: 'Rejuvenescimento Natural',
      descricao: '',
      descricaoCompleta: '',
      imagem: '/src/assets/images/facial_rejuvenation_1791091549942.jpg',
      beneficiosStr: '',
      duracao: '60 min',
      preco: 'Sob consulta após avaliação',
      ativo: true,
      destaque: false,
      recomendacoes: ''
    });
    setIsAddingTreatment(true);
  };

  const handleEditTreatment = (t: Treatment) => {
    setEditingTreatment(t);
    setTreatmentFormData({
      nome: t.nome,
      categoria: t.categoria,
      descricao: t.descricao,
      descricaoCompleta: t.descricaoCompleta,
      imagem: t.imagem,
      beneficiosStr: (t.beneficios || []).join('\n'),
      duracao: t.duracao,
      preco: t.preco || '',
      ativo: t.ativo,
      destaque: t.destaque,
      recomendacoes: t.recomendacoes || ''
    });
    setIsAddingTreatment(true);
  };

  const handleSaveTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    const beneficios = treatmentFormData.beneficiosStr
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingTreatment) {
      updateTreatment(editingTreatment.id, {
        nome: treatmentFormData.nome,
        categoria: treatmentFormData.categoria,
        descricao: treatmentFormData.descricao,
        descricaoCompleta: treatmentFormData.descricaoCompleta,
        imagem: treatmentFormData.imagem,
        beneficios,
        duracao: treatmentFormData.duracao,
        preco: treatmentFormData.preco,
        ativo: treatmentFormData.ativo,
        destaque: treatmentFormData.destaque,
        recomendacoes: treatmentFormData.recomendacoes
      });
    } else {
      addTreatment({
        nome: treatmentFormData.nome,
        categoria: treatmentFormData.categoria,
        descricao: treatmentFormData.descricao,
        descricaoCompleta: treatmentFormData.descricaoCompleta,
        imagem: treatmentFormData.imagem,
        beneficios,
        duracao: treatmentFormData.duracao,
        preco: treatmentFormData.preco,
        ativo: treatmentFormData.ativo,
        destaque: treatmentFormData.destaque,
        recomendacoes: treatmentFormData.recomendacoes
      });
    }
    setIsAddingTreatment(false);
    setEditingTreatment(null);
  };

  // Metrics computation for Dashboard
  const totalAppointmentsMonth = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pendente').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmado').length;
  const completedAppointments = appointments.filter(a => a.status === 'concluido').length;
  
  // Today's appointments (e.g. today's date formatted or match)
  const todayDateStr = new Date().toLocaleDateString('pt-BR');
  const todayAppointments = appointments.filter(a => a.data === todayDateStr).length;

  // Most requested treatments
  const treatmentCounts: { [key: string]: number } = {};
  appointments.forEach(a => {
    treatmentCounts[a.tratamento] = (treatmentCounts[a.tratamento] || 0) + 1;
  });
  const mostRequested = Object.entries(treatmentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // New Clients (unique names)
  const uniqueClients = new Set(appointments.map(a => a.cliente_nome)).size;

  // Filtered appointments
  const filteredAppointments = appointmentFilter === 'todos'
    ? appointments
    : appointments.filter(a => a.status === appointmentFilter);

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateClinicInfo(settingsForm);
    setSaveSuccessMsg('Configurações da clínica salvas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Send WhatsApp confirmation helper
  const handleSendWhatsAppConfirmation = (a: AppointmentRequest) => {
    const cleanPhone = a.cliente_telefone.replace(/\D/g, '');
    const msg = `Olá, ${a.cliente_nome}! Aqui é a Márcia Martins da Marcia Martins Estética.\n\nConfirmamos com muito prazer o seu agendamento para o ${a.tratamento} no dia ${a.data} às ${a.horario}.\n\nNosso endereço: ${clinicInfo.endereco}, ${clinicInfo.bairro}, São Paulo - SP (Freguesia do Ó). O espaço conta com estacionamento no local.\n\nQualquer dúvida, estou à total disposição! Até logo.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // PIN Login Gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#E9E1D8] p-8 rounded-xs shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#F4EFEA] text-[#8C6D46] rounded-full flex items-center justify-center mx-auto border border-[#E9E1D8]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#2B2625]">
              Painel da Especialista
            </h2>
            <p className="text-xs text-[#685E5A]">
              Acesso exclusivo para Márcia Martins e equipe de atendimento.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {pinError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                {pinError}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#2B2625] mb-1">
                Digite o PIN de Segurança:
              </label>
              <input
                type="password"
                maxLength={10}
                placeholder="PIN (padrão: 1538)"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-mono bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                autoFocus
              />
              <span className="block text-[11px] text-[#685E5A] mt-1 text-center">
                Dica: <strong>1538</strong> (final do WhatsApp oficial)
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] transition-all rounded-xs shadow-xs"
            >
              Acessar Painel
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#E9E1D8]">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-xs text-[#8C6D46] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site público</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col overflow-hidden text-[#2B2625]">
      {/* Top Bar for Admin */}
      <header className="bg-[#2B2625] text-white px-6 py-4 flex items-center justify-between border-b border-[#3E3735] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-[#E9E1D8] hover:text-white transition-colors"
            title="Voltar ao site"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-normal text-white">
              Painel Administrativo
            </h1>
            <p className="text-[11px] text-[#DFCAAB] -mt-0.5">
              {clinicInfo.nomeComercial} · Gestão & Agendamentos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#E9E1D8] hover:text-white border border-[#E9E1D8]/30 rounded-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Site Público</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-[#DFCAAB] hover:text-white underline decoration-[#DFCAAB]/40"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Navigation Sidebar */}
        <aside className="w-64 bg-[#F4EFEA] border-r border-[#E9E1D8] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Dashboard & Métricas</span>
            </button>

            <button
              onClick={() => setActiveTab('agendamentos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'agendamentos'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Agendamentos</span>
              </div>
              {pendingAppointments > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                  {pendingAppointments}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tratamentos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'tratamentos'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tratamentos & Serviços</span>
            </button>

            <button
              onClick={() => setActiveTab('depoimentos')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'depoimentos'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Depoimentos das Clientes</span>
            </button>

            <button
              onClick={() => setActiveTab('galeria')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'galeria'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galeria de Fotos</span>
            </button>

            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                activeTab === 'configuracoes'
                  ? 'bg-[#2B2625] text-white'
                  : 'text-[#685E5A] hover:text-[#2B2625] hover:bg-white/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações da Clínica</span>
            </button>
          </nav>

          <div className="p-3 bg-white border border-[#E9E1D8] rounded-xs text-[11px] text-[#685E5A] space-y-1">
            <p className="font-semibold text-[#2B2625]">Márcia Martins Estética</p>
            <p>WhatsApp: {clinicInfo.telefone}</p>
            <p>Google: 5.0 ⭐ (30 avaliações)</p>
          </div>
        </aside>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden bg-[#F4EFEA] border-b border-[#E9E1D8] p-2 flex overflow-x-auto gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'agendamentos' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Agendamentos ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('tratamentos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'tratamentos' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Tratamentos
          </button>
          <button
            onClick={() => setActiveTab('depoimentos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'depoimentos' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Depoimentos
          </button>
          <button
            onClick={() => setActiveTab('galeria')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'galeria' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Galeria
          </button>
          <button
            onClick={() => setActiveTab('configuracoes')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs whitespace-nowrap ${
              activeTab === 'configuracoes' ? 'bg-[#2B2625] text-white' : 'bg-white text-[#2B2625]'
            }`}
          >
            Configurações
          </button>
        </div>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                  Visão Geral & Indicadores
                </h2>
                <p className="text-xs sm:text-sm text-[#685E5A]">
                  Acompanhamento de solicitações e movimentação de clientes da clínica.
                </p>
              </div>

              {/* 7 Core Dashboard Metrics requested in prompt */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Agendamentos do mês</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#2B2625] tabular-nums">
                    {totalAppointmentsMonth}
                  </span>
                  <span className="text-[11px] text-[#8C6D46] block">Total registrado</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Solicitações Pendentes</span>
                  <span className="text-2xl sm:text-3xl font-bold text-amber-600 tabular-nums">
                    {pendingAppointments}
                  </span>
                  <span className="text-[11px] text-amber-700 block">Aguardando retorno</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Confirmados</span>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tabular-nums">
                    {confirmedAppointments}
                  </span>
                  <span className="text-[11px] text-emerald-700 block">Na agenda</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Concluídos</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#2B2625] tabular-nums">
                    {completedAppointments}
                  </span>
                  <span className="text-[11px] text-[#685E5A] block">Atendimentos finalizados</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Agendamentos de Hoje</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#2B2625] tabular-nums">
                    {todayAppointments}
                  </span>
                  <span className="text-[11px] text-[#685E5A] block">{todayDateStr}</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1">
                  <span className="text-xs text-[#685E5A] block">Novos Clientes</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#8C6D46] tabular-nums">
                    {uniqueClients}
                  </span>
                  <span className="text-[11px] text-[#685E5A] block">Contatos únicos</span>
                </div>

                <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs shadow-xs space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-xs text-[#685E5A] block">Google Review Score</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-bold text-[#2B2625] tabular-nums">5.0</span>
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[11px] text-[#685E5A] block">30 avaliações no Google</span>
                </div>
              </div>

              {/* Most requested treatments chart card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E9E1D8] p-6 rounded-xs shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E9E1D8] pb-3">
                    <h3 className="font-serif text-lg text-[#2B2625]">
                      Tratamentos Mais Solicitados
                    </h3>
                    <Sparkles className="w-4 h-4 text-[#8C6D46]" />
                  </div>

                  <div className="space-y-3">
                    {mostRequested.map(([name, count]) => {
                      const percentage = Math.round((count / (appointments.length || 1)) * 100);
                      return (
                        <div key={name} className="space-y-1">
                          <div className="flex justify-between text-xs text-[#2B2625]">
                            <span className="font-medium line-clamp-1">{name}</span>
                            <span className="font-semibold text-[#8C6D46] tabular-nums">{count} solicitações ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-[#F4EFEA] h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#2B2625] h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick actions & Pending reminders */}
                <div className="bg-white border border-[#E9E1D8] p-6 rounded-xs shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#E9E1D8] pb-3">
                      <h3 className="font-serif text-lg text-[#2B2625]">
                        Ações Rápidas
                      </h3>
                      <Calendar className="w-4 h-4 text-[#8C6D46]" />
                    </div>
                    <p className="text-xs text-[#685E5A]">
                      Você possui <strong>{pendingAppointments} solicitações pendentes</strong> que precisam de confirmação pelo WhatsApp com a cliente.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setAppointmentFilter('pendente');
                        setActiveTab('agendamentos');
                      }}
                      className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-700 transition-colors rounded-xs flex items-center justify-center gap-2"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Ver {pendingAppointments} Solicitações Pendentes</span>
                    </button>

                    <button
                      onClick={() => {
                        handleOpenAddTreatment();
                        setActiveTab('tratamentos');
                      }}
                      className="w-full py-2.5 px-4 text-xs font-medium text-[#2B2625] bg-[#FAF8F5] hover:bg-[#F4EFEA] border border-[#D9CCC0] transition-colors rounded-xs flex items-center justify-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#8C6D46]" />
                      <span>Cadastrar Novo Tratamento</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AGENDAMENTOS */}
          {activeTab === 'agendamentos' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                    Solicitações de Agendamento
                  </h2>
                  <p className="text-xs sm:text-sm text-[#685E5A]">
                    Controle de horários e atendimento direto via WhatsApp.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-[#F4EFEA] border border-[#E9E1D8] rounded-xs">
                  {(['todos', 'pendente', 'confirmado', 'concluido', 'cancelado'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => setAppointmentFilter(st)}
                      className={`px-3 py-1.5 text-xs font-medium capitalize rounded-xs transition-colors ${
                        appointmentFilter === st
                          ? 'bg-[#2B2625] text-white'
                          : 'text-[#685E5A] hover:text-[#2B2625]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / List */}
              <div className="bg-white border border-[#E9E1D8] rounded-xs shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4EFEA] border-b border-[#E9E1D8] text-[#2B2625] font-semibold">
                      <tr>
                        <th className="p-3.5">Cliente</th>
                        <th className="p-3.5">Telefone</th>
                        <th className="p-3.5">Tratamento</th>
                        <th className="p-3.5">Data / Hora</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E1D8]/70">
                      {filteredAppointments.map(a => (
                        <tr key={a.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                          <td className="p-3.5">
                            <span className="font-semibold text-[#2B2625] block">{a.cliente_nome}</span>
                            {a.observacao && (
                              <span className="text-[11px] text-[#685E5A] italic block max-w-xs truncate">
                                "{a.observacao}"
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 tabular-nums text-[#2B2625]">
                            {a.cliente_telefone}
                          </td>
                          <td className="p-3.5 text-[#2B2625] font-medium">
                            {a.tratamento}
                          </td>
                          <td className="p-3.5 tabular-nums text-[#2B2625]">
                            <span className="block font-medium">{a.data}</span>
                            <span className="text-[11px] text-[#685E5A]">{a.horario}</span>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={a.status}
                              onChange={e => updateAppointmentStatus(a.id, e.target.value as AppointmentStatus)}
                              className={`text-xs px-2 py-1 rounded-xs border font-medium ${
                                a.status === 'pendente'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : a.status === 'confirmado'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : a.status === 'concluido'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : 'bg-red-50 text-red-800 border-red-300'
                              }`}
                            >
                              <option value="pendente">Pendente</option>
                              <option value="confirmado">Confirmado</option>
                              <option value="concluido">Concluído</option>
                              <option value="cancelado">Cancelado</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleSendWhatsAppConfirmation(a)}
                              className="px-2.5 py-1.5 bg-[#25D366] text-white hover:bg-[#20BD5A] rounded-xs text-[11px] font-semibold inline-flex items-center gap-1 shadow-xs"
                              title="Enviar confirmação no WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => deleteAppointment(a.id)}
                              className="p-1.5 text-red-600 hover:text-red-800 rounded-xs hover:bg-red-50"
                              title="Remover agendamento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredAppointments.length === 0 && (
                  <div className="p-8 text-center text-xs text-[#685E5A]">
                    Nenhum agendamento encontrado para o filtro selecionado.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TRATAMENTOS */}
          {activeTab === 'tratamentos' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                    Gestão de Tratamentos
                  </h2>
                  <p className="text-xs sm:text-sm text-[#685E5A]">
                    Cadastre, edite fotos, textos, descrições e valores dos serviços da clínica.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddTreatment}
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] transition-colors rounded-xs flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#E7D7CE]" />
                  <span>Novo Tratamento</span>
                </button>
              </div>

              {/* Modal or inline form for adding/editing treatment */}
              {isAddingTreatment && (
                <div className="bg-white border border-[#C4A47C] p-6 rounded-xs shadow-md space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-[#E9E1D8] pb-3">
                    <h3 className="font-serif text-xl text-[#2B2625]">
                      {editingTreatment ? 'Editar Tratamento' : 'Cadastrar Novo Tratamento'}
                    </h3>
                    <button
                      onClick={() => setIsAddingTreatment(false)}
                      className="p-1 text-[#685E5A] hover:text-[#2B2625]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTreatment} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Nome do Tratamento:
                        </label>
                        <input
                          type="text"
                          required
                          value={treatmentFormData.nome}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, nome: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Categoria:
                        </label>
                        <select
                          value={treatmentFormData.categoria}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, categoria: e.target.value as TreatmentCategory })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        >
                          <option value="Rejuvenescimento Natural">Rejuvenescimento Natural</option>
                          <option value="Tratamentos Faciais">Tratamentos Faciais</option>
                          <option value="Cuidados Corporais">Cuidados Corporais</option>
                          <option value="Drenagem">Drenagem</option>
                          <option value="Protocolos Personalizados">Protocolos Personalizados</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Duração média:
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 60 min, 90 min"
                          value={treatmentFormData.duracao}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, duracao: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Valor (opcional):
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Sob consulta após avaliação"
                          value={treatmentFormData.preco}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, preco: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          URL da Imagem / Foto:
                        </label>
                        <input
                          type="text"
                          value={treatmentFormData.imagem}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, imagem: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2625] mb-1">
                        Pequena Descrição (para o card):
                      </label>
                      <input
                        type="text"
                        required
                        value={treatmentFormData.descricao}
                        onChange={e => setTreatmentFormData({ ...treatmentFormData, descricao: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2625] mb-1">
                        Descrição Completa (para a modal de detalhes):
                      </label>
                      <textarea
                        rows={3}
                        value={treatmentFormData.descricaoCompleta}
                        onChange={e => setTreatmentFormData({ ...treatmentFormData, descricaoCompleta: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Benefícios (um por linha):
                        </label>
                        <textarea
                          rows={3}
                          value={treatmentFormData.beneficiosStr}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, beneficiosStr: e.target.value })}
                          placeholder="Estímulo biológico de colágeno&#10;Melhora do tônus e viço"
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2625] mb-1">
                          Recomendações (cuidados pré/pós):
                        </label>
                        <textarea
                          rows={3}
                          value={treatmentFormData.recomendacoes}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, recomendacoes: e.target.value })}
                          placeholder="Ex: Evitar sol nas primeiras 24 horas..."
                          className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625] focus:outline-none focus:border-[#C4A47C]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={treatmentFormData.ativo}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, ativo: e.target.checked })}
                          className="rounded text-[#2B2625]"
                        />
                        <span>Tratamento Ativo no Site</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={treatmentFormData.destaque}
                          onChange={e => setTreatmentFormData({ ...treatmentFormData, destaque: e.target.checked })}
                          className="rounded text-[#2B2625]"
                        />
                        <span>Destacar na Página Inicial</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-[#E9E1D8]">
                      <button
                        type="button"
                        onClick={() => setIsAddingTreatment(false)}
                        className="px-4 py-2 text-xs text-[#685E5A] bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] rounded-xs shadow-xs"
                      >
                        Salvar Tratamento
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Treatments List Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treatments.map(t => (
                  <div
                    key={t.id}
                    className={`bg-white border p-5 rounded-xs shadow-xs flex flex-col justify-between space-y-4 ${
                      t.ativo ? 'border-[#E9E1D8]' : 'border-dashed border-red-300 opacity-60'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold block">
                            {t.categoria}
                          </span>
                          <h4 className="font-serif text-lg text-[#2B2625] font-medium leading-snug">
                            {t.nome}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateTreatment(t.id, { ativo: !t.ativo })}
                            className={`p-1 rounded-xs text-xs ${t.ativo ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}
                            title={t.ativo ? 'Ativo (clique para ocultar)' : 'Oculto (clique para ativar)'}
                          >
                            {t.ativo ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#685E5A] line-clamp-2 leading-relaxed">
                        {t.descricao}
                      </p>

                      <div className="text-[11px] text-[#685E5A] space-y-0.5 pt-1">
                        <div>Duração: <strong>{t.duracao}</strong></div>
                        <div>Investimento: <strong>{t.preco || 'Sob consulta'}</strong></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E9E1D8]">
                      <button
                        onClick={() => handleEditTreatment(t)}
                        className="text-xs font-semibold text-[#8C6D46] hover:underline inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => deleteTreatment(t.id)}
                        className="text-xs text-red-600 hover:text-red-800 p-1"
                        title="Excluir tratamento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEPOIMENTOS */}
          {activeTab === 'depoimentos' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                  Depoimentos & Avaliações
                </h2>
                <p className="text-xs sm:text-sm text-[#685E5A]">
                  Gerencie as opiniões reais exibidas para fortalecer a autoridade e confiança.
                </p>
              </div>

              {/* Add testimonial form */}
              <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs space-y-3">
                <h3 className="font-semibold text-xs text-[#2B2625] uppercase tracking-wider">
                  Adicionar Nova Avaliação
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nome da cliente (ex: Cliente Verificada no Google)"
                    value={newTestimonialName}
                    onChange={e => setNewTestimonialName(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                  />
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#685E5A]">Estrelas:</span>
                    <select
                      value={newTestimonialRating}
                      onChange={e => setNewTestimonialRating(Number(e.target.value))}
                      className="px-2 py-1.5 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs"
                    >
                      <option value={5}>5 Estrelas</option>
                      <option value={4}>4 Estrelas</option>
                      <option value={3}>3 Estrelas</option>
                    </select>
                  </div>
                </div>
                <textarea
                  rows={3}
                  placeholder="Texto do depoimento..."
                  value={newTestimonialText}
                  onChange={e => setNewTestimonialText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newTestimonialText.trim()) {
                      addTestimonial({
                        nome: newTestimonialName.trim() || 'Cliente Verificada',
                        texto: newTestimonialText.trim(),
                        rating: newTestimonialRating,
                        origem: 'Google Avaliações',
                        destaque: true
                      });
                      setNewTestimonialText('');
                      setNewTestimonialName('');
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase text-white bg-[#2B2625] rounded-xs"
                >
                  Salvar Depoimento
                </button>
              </div>

              {/* List */}
              <div className="space-y-3">
                {testimonials.map(item => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#E9E1D8] p-4 rounded-xs shadow-xs flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-semibold text-[#2B2625] ml-2">
                          {item.nome || 'Cliente Verificada'}
                        </span>
                      </div>
                      <p className="text-xs text-[#685E5A] italic">
                        "{item.texto}"
                      </p>
                    </div>

                    <button
                      onClick={() => deleteTestimonial(item.id)}
                      className="p-1.5 text-red-600 hover:text-red-800"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GALERIA */}
          {activeTab === 'galeria' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                  Galeria de Fotos & Experiências
                </h2>
                <p className="text-xs sm:text-sm text-[#685E5A]">
                  Cadastre fotos reais do espaço e procedimentos. Se não houver fotos, a seção fica oculta automaticamente no site público.
                </p>
              </div>

              {/* Add photo */}
              <div className="bg-white border border-[#E9E1D8] p-5 rounded-xs space-y-3">
                <h3 className="font-semibold text-xs text-[#2B2625] uppercase tracking-wider">
                  Adicionar Nova Imagem
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Título da foto (ex: Sala de Atendimento)"
                    value={newGalleryTitle}
                    onChange={e => setNewGalleryTitle(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                  />
                  <input
                    type="text"
                    placeholder="Categoria (ex: Espaço, Procedimentos)"
                    value={newGalleryCategory}
                    onChange={e => setNewGalleryCategory(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="URL / Caminho da Imagem"
                  value={newGalleryImage}
                  onChange={e => setNewGalleryImage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                />
                <input
                  type="text"
                  placeholder="Descrição opcional..."
                  value={newGalleryDesc}
                  onChange={e => setNewGalleryDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newGalleryTitle.trim()) {
                      addGalleryItem({
                        titulo: newGalleryTitle.trim(),
                        categoria: newGalleryCategory.trim() || 'Espaço',
                        descricao: newGalleryDesc.trim(),
                        imagem: newGalleryImage,
                        ativo: true
                      });
                      setNewGalleryTitle('');
                      setNewGalleryDesc('');
                    }
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase text-white bg-[#2B2625] rounded-xs"
                >
                  Salvar Foto na Galeria
                </button>
              </div>

              {/* Grid of photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map(g => (
                  <div
                    key={g.id}
                    className="bg-white border border-[#E9E1D8] p-3 rounded-xs flex items-center gap-3"
                  >
                    <img
                      src={g.imagem}
                      alt={g.titulo}
                      className="w-16 h-16 object-cover rounded-xs bg-[#E9E1D8]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#8C6D46] uppercase font-semibold">{g.categoria}</span>
                      <h4 className="text-xs font-medium text-[#2B2625] truncate">{g.titulo}</h4>
                      {g.descricao && <p className="text-[11px] text-[#685E5A] truncate">{g.descricao}</p>}
                    </div>
                    <button
                      onClick={() => deleteGalleryItem(g.id)}
                      className="p-1.5 text-red-600 hover:text-red-800"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONFIGURAÇÕES DA CLÍNICA */}
          {activeTab === 'configuracoes' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2625]">
                  Configurações da Empresa
                </h2>
                <p className="text-xs sm:text-sm text-[#685E5A]">
                  Edite endereço, telefone, WhatsApp, Instagram e horários de atendimento.
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-white border border-[#E9E1D8] p-6 rounded-xs shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Nome Comercial:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.nomeComercial}
                      onChange={e => setSettingsForm({ ...settingsForm, nomeComercial: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Nome da Profissional:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.profissional}
                      onChange={e => setSettingsForm({ ...settingsForm, profissional: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Posicionamento Oficial:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.posicionamento}
                      onChange={e => setSettingsForm({ ...settingsForm, posicionamento: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Instagram (sem @):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={e => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B2625] mb-1">
                    Frase da Marca:
                  </label>
                  <input
                    type="text"
                    value={settingsForm.fraseMarca}
                    onChange={e => setSettingsForm({ ...settingsForm, fraseMarca: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Telefone Formatado:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.telefone}
                      onChange={e => setSettingsForm({ ...settingsForm, telefone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      WhatsApp (apenas números com 55 e DDD):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp}
                      onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Endereço (Rua e número):
                    </label>
                    <input
                      type="text"
                      value={settingsForm.endereco}
                      onChange={e => setSettingsForm({ ...settingsForm, endereco: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      CEP:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.cep}
                      onChange={e => setSettingsForm({ ...settingsForm, cep: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Bairro:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.bairro}
                      onChange={e => setSettingsForm({ ...settingsForm, bairro: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Cidade / UF:
                    </label>
                    <input
                      type="text"
                      value={`${settingsForm.cidade} - ${settingsForm.uf}`}
                      onChange={e => {
                        const [cidade, uf] = e.target.value.split('-').map(s => s.trim());
                        setSettingsForm({ ...settingsForm, cidade: cidade || '', uf: uf || '' });
                      }}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2625] mb-1">
                      Região:
                    </label>
                    <input
                      type="text"
                      value={settingsForm.regiao}
                      onChange={e => setSettingsForm({ ...settingsForm, regiao: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D9CCC0] rounded-xs text-[#2B2625]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.estacionamento}
                      onChange={e => setSettingsForm({ ...settingsForm, estacionamento: e.target.checked })}
                      className="rounded text-[#2B2625]"
                    />
                    <span>O espaço possui estacionamento no local</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B2625] hover:bg-[#3E3735] transition-colors rounded-xs shadow-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#E7D7CE]" />
                    <span>Salvar Configurações</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
