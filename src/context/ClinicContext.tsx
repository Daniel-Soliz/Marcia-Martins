import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClinicInfo,
  Treatment,
  Testimonial,
  GalleryItem,
  AppointmentRequest,
  AppointmentStatus
} from '../types';
import {
  INITIAL_CLINIC_INFO,
  INITIAL_TREATMENTS,
  INITIAL_TESTIMONIALS,
  INITIAL_GALLERY,
  INITIAL_APPOINTMENTS
} from '../data/initialData';

interface ClinicContextType {
  clinicInfo: ClinicInfo;
  updateClinicInfo: (info: Partial<ClinicInfo>) => void;
  treatments: Treatment[];
  addTreatment: (treatment: Omit<Treatment, 'id' | 'slug'>) => void;
  updateTreatment: (id: string, data: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'data'>) => void;
  updateGalleryItem: (id: string, data: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  appointments: AppointmentRequest[];
  createAppointmentRequest: (data: Omit<AppointmentRequest, 'id' | 'created_at' | 'status'>) => AppointmentRequest;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;
  isBookingModalOpen: boolean;
  openBookingModal: (treatment?: Treatment) => void;
  closeBookingModal: () => void;
  selectedTreatmentForBooking: Treatment | null;
  selectedTreatmentForDetail: Treatment | null;
  openTreatmentDetail: (treatment: Treatment) => void;
  closeTreatmentDetail: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  getWhatsAppUrl: (customMessage?: string) => string;
  generateBookingWhatsAppMessage: (data: Omit<AppointmentRequest, 'id' | 'created_at' | 'status'>) => string;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLINIC: 'mm_clinic_info_v1',
  TREATMENTS: 'mm_treatments_v1',
  TESTIMONIALS: 'mm_testimonials_v1',
  GALLERY: 'mm_gallery_v1',
  APPOINTMENTS: 'mm_appointments_v1'
};

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLINIC);
      return saved ? JSON.parse(saved) : INITIAL_CLINIC_INFO;
    } catch {
      return INITIAL_CLINIC_INFO;
    }
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TREATMENTS);
      return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
    } catch {
      return INITIAL_TREATMENTS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : INITIAL_GALLERY;
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  // UI state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<Treatment | null>(null);
  const [selectedTreatmentForDetail, setSelectedTreatmentForDetail] = useState<Treatment | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLINIC, JSON.stringify(clinicInfo));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [clinicInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TREATMENTS, JSON.stringify(treatments));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [treatments]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [appointments]);

  const updateClinicInfo = (info: Partial<ClinicInfo>) => {
    setClinicInfo(prev => ({ ...prev, ...info }));
  };

  const addTreatment = (treatmentData: Omit<Treatment, 'id' | 'slug'>) => {
    const slug = treatmentData.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newTreatment: Treatment = {
      ...treatmentData,
      id: `treat-${Date.now()}`,
      slug
    };
    setTreatments(prev => [newTreatment, ...prev]);
  };

  const updateTreatment = (id: string, data: Partial<Treatment>) => {
    setTreatments(prev =>
      prev.map(t => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTreatment = (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: `test-${Date.now()}`,
      data: testimonialData.data || 'Recentemente'
    };
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const updateTestimonial = (id: string, data: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'data'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
      data: new Date().getFullYear().toString()
    };
    setGallery(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => {
    setGallery(prev =>
      prev.map(g => (g.id === id ? { ...g, ...data } : g))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const createAppointmentRequest = (
    data: Omit<AppointmentRequest, 'id' | 'created_at' | 'status'>
  ): AppointmentRequest => {
    const newAppointment: AppointmentRequest = {
      ...data,
      id: `req-${Date.now()}`,
      status: 'pendente',
      created_at: new Date().toISOString()
    };
    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const openBookingModal = (treatment?: Treatment) => {
    if (treatment) {
      setSelectedTreatmentForBooking(treatment);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openTreatmentDetail = (treatment: Treatment) => {
    setSelectedTreatmentForDetail(treatment);
  };

  const closeTreatmentDetail = () => {
    setSelectedTreatmentForDetail(null);
  };

  const getWhatsAppUrl = (customMessage?: string) => {
    const phone = clinicInfo.whatsapp.replace(/\D/g, '') || '5511989871538';
    const message = customMessage || 'Olá, Márcia! Conheci seu trabalho pelo site e gostaria de saber mais sobre os tratamentos e agendar uma avaliação.';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const generateBookingWhatsAppMessage = (
    data: Omit<AppointmentRequest, 'id' | 'created_at' | 'status'>
  ) => {
    return `Olá, Márcia! Gostaria de solicitar um agendamento.

Nome: ${data.cliente_nome}
Tratamento: ${data.tratamento}
Data: ${data.data}
Horário: ${data.horario}
Telefone: ${data.cliente_telefone}${data.observacao ? `\nObservação: ${data.observacao}` : ''}`;
  };

  return (
    <ClinicContext.Provider
      value={{
        clinicInfo,
        updateClinicInfo,
        treatments,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        appointments,
        createAppointmentRequest,
        updateAppointmentStatus,
        deleteAppointment,
        isBookingModalOpen,
        openBookingModal,
        closeBookingModal,
        selectedTreatmentForBooking,
        selectedTreatmentForDetail,
        openTreatmentDetail,
        closeTreatmentDetail,
        isAdminOpen,
        setIsAdminOpen,
        getWhatsAppUrl,
        generateBookingWhatsAppMessage
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
