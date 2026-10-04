import { ClinicInfo, Treatment, Testimonial, GalleryItem, AppointmentRequest } from '../types';

export const INITIAL_CLINIC_INFO: ClinicInfo = {
  nomeComercial: 'Marcia Martins Estética',
  profissional: 'Márcia Martins',
  posicionamento: 'Especialista em Rejuvenescimento Natural',
  fraseMarca: 'Tratamentos personalizados que cuidam da pele, do corpo e da mulher em você!',
  whatsapp: '5511989871538',
  telefone: '(11) 98987-1538',
  instagram: 'esteticamarciamartins',
  endereco: 'Rua Estevão Furquim, 400B',
  bairro: 'Vila São Vicente',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '02733-000',
  regiao: 'Freguesia do Ó / Zona Norte de São Paulo',
  googleRating: 5.0,
  googleReviewsCount: 30,
  estacionamento: true,
  horariosDisponiveis: [
    '09:00',
    '10:30',
    '13:30',
    '15:00',
    '16:30',
    '18:00'
  ]
};

export const INITIAL_TREATMENTS: Treatment[] = [
  {
    id: 'rejuvenescimento-natural',
    nome: 'Protocolo Rejuvenescimento Natural',
    slug: 'rejuvenescimento-natural',
    categoria: 'Rejuvenescimento Natural',
    descricao: 'Estímulo biológico ao tônus e vitalidade da pele com resultados sutis, elegantes e sem perder a naturalidade da sua expressão.',
    descricaoCompleta: 'O Protocolo de Rejuvenescimento Natural da Márcia Martins é desenvolvido para restaurar a firmeza, o viço e a elasticidade da pele sem procedimentos invasivos ou artificiais. Unindo massagens miofaciais relaxantes, drenagem suave e ativos biocompatíveis de alta qualidade, promovemos um efeito lifting natural e descanso visível nas linhas de expressão.',
    imagem: '/src/assets/images/facial_rejuvenation_1791091549942.jpg',
    beneficios: [
      'Estímulo natural da síntese de colágeno e elastina',
      'Harmonização das linhas de expressão sem artificialismo',
      'Aumento da oxigenação dos tecidos faciais',
      'Pele radiante, hidratada e com viço renovado'
    ],
    duracao: '75 min',
    preco: 'Sob consulta após avaliação',
    ativo: true,
    destaque: true,
    recomendacoes: 'Evitar exposição solar direta logo após a sessão e manter a hidratação diária da pele.'
  },
  {
    id: 'drenagem-linfatica',
    nome: 'Drenagem Linfática Especializada',
    slug: 'drenagem-linfatica-especializada',
    categoria: 'Drenagem',
    descricao: 'Método completo com conhecimentos integrados de várias áreas, aliviando o inchaço, desintoxicando e promovendo leveza imediata.',
    descricaoCompleta: 'Drenagem com metodologia exclusiva desenvolvida pela Márcia Martins, elogiada pelas clientes por unir técnicas clássicas e integrativas. Estimula com precisão o sistema linfático, alivia a retenção hídrica, elimina toxinas e proporciona um relaxamento físico e mental incomparável.',
    imagem: '/src/assets/images/body_drainage_1791091559498.jpg',
    beneficios: [
      'Alívio imediato da sensação de peso e inchaço',
      'Melhora da microcirculação sanguínea e linfática',
      'Aceleração da eliminação de líquidos retidos',
      'Sensação de leveza corporal e bem-estar profundo'
    ],
    duracao: '60 min',
    preco: 'Sob consulta após avaliação',
    ativo: true,
    destaque: true,
    recomendacoes: 'Ingerir água em abundância antes e depois da sessão para potencializar a drenagem de toxinas.'
  },
  {
    id: 'limpeza-facial-profunda',
    nome: 'Limpeza de Pele Profunda & Nutrição',
    slug: 'limpeza-de-pele-profunda',
    categoria: 'Tratamentos Faciais',
    descricao: 'Higienização meticulosa com extração delicada, assepsia, desintoxicação e reposição de nutrientes essenciais para a pele.',
    descricaoCompleta: 'Um cuidado essencial realizado com todo o conforto e técnicas que minimizam o desconforto. Inclui higienização com ativos calmantes, emoliência controlada, extração cuidadosa de impurezas, alta frequência para assepsia e máscara nutritiva calmante adaptada ao seu fototipo e sensibilidade.',
    imagem: '/src/assets/images/hero_clinic_wellness_1791091531095.jpg',
    beneficios: [
      'Desobstrução e refinamento dos poros',
      'Remoção de impurezas e células mortas sem agredir',
      'Controle do excesso de oleosidade e brilho indesejado',
      'Preparação da pele para absorver melhor os cosméticos'
    ],
    duracao: '90 min',
    preco: 'Sob consulta após avaliação',
    ativo: true,
    destaque: true,
    recomendacoes: 'Não utilizar maquiagem pesada ou ácidos nas primeiras 24 horas após o procedimento.'
  },
  {
    id: 'cuidados-corporais-relax',
    nome: 'Cuidado Corporal & Alívio Tensional',
    slug: 'cuidados-corporais-relax',
    categoria: 'Cuidados Corporais',
    descricao: 'Protocolo corporal relaxante e modelador com manobras personalizadas para aliviar a sobrecarga da rotina e restaurar o equilíbrio.',
    descricaoCompleta: 'Uma sessão pensada para a mulher contemporânea que precisa de um momento de pausa, acolhimento e cuidado com o corpo. Unindo técnicas manuais descontraturantes e modeladoras a óleos botânicos puros, devolve a fluidez corporal e a sensação revigorante.',
    imagem: '/src/assets/images/clinic_space_ambiance_1791091568762.jpg',
    beneficios: [
      'Redução de tensões musculares acumuladas no dia a dia',
      'Melhora da textura e hidratação da pele do corpo',
      'Sensação revigorante de equilíbrio e leveza',
      'Acolhimento humanizado em ambiente silencioso e privativo'
    ],
    duracao: '60 min',
    preco: 'Sob consulta após avaliação',
    ativo: true,
    destaque: false,
    recomendacoes: 'Recomenda-se usar roupas confortáveis no dia da sessão.'
  },
  {
    id: 'avaliacao-individualizada',
    nome: 'Avaliação Estética Individualizada',
    slug: 'avaliacao-estetica-individualizada',
    categoria: 'Protocolos Personalizados',
    descricao: 'A consulta inicial onde a Márcia escuta seus objetivos e analisa as características da sua pele para definir o protocolo ideal.',
    descricaoCompleta: 'Toda transformação segura e eficiente começa pela escuta atenta. Na avaliação personalizada, a Márcia analisa seu histórico, estilo de vida, expectativas e características da sua pele para planejar um tratamento sob medida, sem excessos e com foco em resultados naturais e duradouros.',
    imagem: '/src/assets/images/marcia_martins_portrait_1791091540956.jpg',
    beneficios: [
      'Escuta atenta e diagnóstico estético individual',
      'Definição do protocolo mais adequado para seu objetivo',
      'Orientação de cuidados diários em casa (home care)',
      'Total transparência e respeito à sua individualidade'
    ],
    duracao: '45 min',
    preco: 'Consulte condições de cortesia',
    ativo: true,
    destaque: true,
    recomendacoes: 'Venha preferencialmente com a pele limpa ou traga os cosméticos que já utiliza na sua rotina diária.'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'depoimento-1',
    nome: 'Cliente Verificada no Google',
    texto: 'O trabalho da Marcia é uma experiência que vale muito a pena ser vivida. O lugar está novinho em folha, super lindo e acolhedor. A Marcia é uma pessoa e uma profissional maravilhosa, que cuida de tudo nos mínimos detalhes.',
    rating: 5,
    origem: 'Google Avaliações',
    data: 'Recentemente',
    destaque: true
  },
  {
    id: 'depoimento-2',
    nome: 'Cliente Verificada no Google',
    texto: 'Márcia, além de muito competente e profissional, utiliza produtos de extrema qualidade. Confio nela como profissional ética e eficiente.',
    rating: 5,
    origem: 'Google Avaliações',
    data: 'Recentemente',
    destaque: true
  },
  {
    id: 'depoimento-3',
    nome: 'Cliente Verificada no Google',
    texto: 'Nunca havia feito uma drenagem como a que ela faz. Completa, com conhecimentos de várias áreas que tornam essa experiência um diferencial.',
    rating: 5,
    origem: 'Google Avaliações',
    data: 'Recentemente',
    destaque: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'galeria-1',
    titulo: 'Sala de Atendimento Privativa',
    descricao: 'Ambiente planejado para tranquilidade, conforto e higiene absoluta.',
    imagem: '/src/assets/images/hero_clinic_wellness_1791091531095.jpg',
    categoria: 'Espaço',
    ativo: true,
    data: '2026'
  },
  {
    id: 'galeria-2',
    titulo: 'Rejuvenescimento Natural em Prática',
    descricao: 'Cuidado delicado e cosméticos de excelência em cada toque.',
    imagem: '/src/assets/images/facial_rejuvenation_1791091549942.jpg',
    categoria: 'Procedimentos',
    ativo: true,
    data: '2026'
  },
  {
    id: 'galeria-3',
    titulo: 'Drenagem Linfática Completa',
    descricao: 'Método integrativo para relaxamento e redução imediata de inchaço.',
    imagem: '/src/assets/images/body_drainage_1791091559498.jpg',
    categoria: 'Procedimentos',
    ativo: true,
    data: '2026'
  },
  {
    id: 'galeria-4',
    titulo: 'Recepção Acolhedora',
    descricao: 'Lounge aconchegante para que você se sinta em casa desde a chegada.',
    imagem: '/src/assets/images/clinic_space_ambiance_1791091568762.jpg',
    categoria: 'Espaço',
    ativo: true,
    data: '2026'
  }
];

export const INITIAL_APPOINTMENTS: AppointmentRequest[] = [
  {
    id: 'req-1',
    cliente_nome: 'Fernanda Carvalho',
    cliente_telefone: '(11) 99872-3411',
    tratamento: 'Protocolo Rejuvenescimento Natural',
    data: '2026-10-06',
    horario: '10:30',
    observacao: 'Gostaria de conhecer o protocolo de rejuvenescimento para linhas de expressão.',
    status: 'confirmado',
    created_at: '2026-10-02T14:20:00Z'
  },
  {
    id: 'req-2',
    cliente_nome: 'Patrícia Alcantara',
    cliente_telefone: '(11) 98114-5590',
    tratamento: 'Drenagem Linfática Especializada',
    data: '2026-10-07',
    horario: '15:00',
    observacao: 'Sinto muita retenção nas pernas após o trabalho.',
    status: 'pendente',
    created_at: '2026-10-03T18:45:00Z'
  },
  {
    id: 'req-3',
    cliente_nome: 'Juliana Mendes',
    cliente_telefone: '(11) 97320-1188',
    tratamento: 'Avaliação Estética Individualizada',
    data: '2026-10-08',
    horario: '09:00',
    observacao: 'Primeira vez na clínica, indicação de amiga.',
    status: 'pendente',
    created_at: '2026-10-03T20:10:00Z'
  },
  {
    id: 'req-4',
    cliente_nome: 'Renata Silveira',
    cliente_telefone: '(11) 98452-9012',
    tratamento: 'Limpeza de Pele Profunda & Nutrição',
    data: '2026-10-01',
    horario: '13:30',
    observacao: 'Pele mista com tendência a oleosidade.',
    status: 'concluido',
    created_at: '2026-09-28T11:15:00Z'
  }
];
