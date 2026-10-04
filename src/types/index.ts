export type TreatmentCategory =
  | 'Rejuvenescimento Natural'
  | 'Tratamentos Faciais'
  | 'Cuidados Corporais'
  | 'Drenagem'
  | 'Protocolos Personalizados';

export interface Treatment {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  descricaoCompleta: string;
  imagem: string;
  beneficios: string[];
  duracao: string;
  preco?: string;
  ativo: boolean;
  destaque: boolean;
  categoria: TreatmentCategory;
  recomendacoes?: string;
}

export type AppointmentStatus = 'pendente' | 'confirmado' | 'concluido' | 'cancelado';

export interface AppointmentRequest {
  id: string;
  cliente_nome: string;
  cliente_telefone: string;
  tratamento: string;
  data: string;
  horario: string;
  observacao?: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface Testimonial {
  id: string;
  nome?: string;
  texto: string;
  rating: number;
  origem: string;
  data?: string;
  destaque?: boolean;
}

export interface GalleryItem {
  id: string;
  titulo: string;
  descricao?: string;
  imagem: string;
  categoria: string;
  ativo: boolean;
  data: string;
}

export interface ClinicInfo {
  nomeComercial: string;
  profissional: string;
  posicionamento: string;
  fraseMarca: string;
  whatsapp: string;
  telefone: string;
  instagram: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  regiao: string;
  googleRating: number;
  googleReviewsCount: number;
  estacionamento: boolean;
  horariosDisponiveis: string[];
}
