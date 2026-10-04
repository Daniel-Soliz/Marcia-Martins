import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { GalleryItem } from '../types';

export const ResultsGallerySection: React.FC = () => {
  const { gallery } = useClinic();
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const activeGallery = gallery.filter(item => item.ativo);

  // Automatically hide section if no items are registered
  if (activeGallery.length === 0) {
    return null;
  }

  return (
    <section id="resultados" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
            <span>Espaço & Cuidados</span>
            <span className="w-5 h-[1.5px] bg-[#C4A47C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2625] font-normal tracking-tight">
            Resultados e experiências
          </h2>
          <p className="text-sm sm:text-base text-[#685E5A]">
            Conheça o ambiente planejado para o seu conforto e momentos de tranquilidade na clínica.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative bg-[#E9E1D8] rounded-xs overflow-hidden aspect-[4/3] cursor-pointer shadow-xs border border-[#E9E1D8] hover:border-[#C4A47C] transition-all"
            >
              <img
                src={item.imagem}
                alt={item.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <div className="p-1.5 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#DFCAAB] font-medium">
                    {item.categoria}
                  </span>
                  <h4 className="font-serif text-base font-medium leading-snug mt-0.5 text-white">
                    {item.titulo}
                  </h4>
                  {item.descricao && (
                    <p className="text-[11px] text-[#FAF8F5]/80 line-clamp-1 mt-0.5">
                      {item.descricao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FAF8F5] rounded-xs overflow-hidden shadow-2xl border border-[#D9CCC0]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Fechar visualização"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] bg-black">
              <img
                src={activeItem.imagem}
                alt={activeItem.titulo}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-[#FAF8F5]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium">
                  {activeItem.categoria}
                </span>
                <span className="text-xs text-[#685E5A]">{activeItem.data}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2B2625] font-normal">
                {activeItem.titulo}
              </h3>
              {activeItem.descricao && (
                <p className="text-sm text-[#685E5A] leading-relaxed">
                  {activeItem.descricao}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
