import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export const InstagramSection: React.FC = () => {
  const { clinicInfo } = useClinic();

  const instagramPosts = [
    {
      id: 1,
      image: '/src/assets/images/facial_rejuvenation_1791091549942.jpg',
      caption: 'A importância de respeitar os limites e o ritmo natural da sua pele no rejuvenescimento.',
      likes: '84'
    },
    {
      id: 2,
      image: '/src/assets/images/hero_clinic_wellness_1791091531095.jpg',
      caption: 'Um refúgio de paz no coração da Freguesia do Ó para você recarregar suas energias.',
      likes: '112'
    },
    {
      id: 3,
      image: '/src/assets/images/body_drainage_1791091559498.jpg',
      caption: 'Drenagem Linfática: muito além da estética, um abraço de leveza para a sua saúde.',
      likes: '96'
    },
    {
      id: 4,
      image: '/src/assets/images/marcia_martins_portrait_1791091540956.jpg',
      caption: 'Cuidado humanizado e escuta com carinho. Cada mulher é única!',
      likes: '143'
    }
  ];

  return (
    <section className="py-20 bg-[#F4EFEA]/60 border-t border-[#E9E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D46] tracking-widest uppercase">
              <Instagram className="w-3.5 h-3.5 text-[#C4A47C]" />
              <span>Rede Social</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2625] font-normal tracking-tight">
              Acompanhe nosso trabalho
            </h2>
            <p className="text-sm text-[#685E5A]">
              Dicas de autocuidado, rotinas e os bastidores do nosso espaço no Instagram.
            </p>
          </div>

          <a
            href={`https://instagram.com/${clinicInfo.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#2B2625] bg-white border border-[#D9CCC0] hover:border-[#8C6D46] hover:bg-[#FAF8F5] transition-all rounded-xs shadow-xs self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-[#8C6D46]" />
            <span>@{clinicInfo.instagram}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#8C6D46]" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={`https://instagram.com/${clinicInfo.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square bg-[#E9E1D8] rounded-xs overflow-hidden block shadow-xs border border-[#E9E1D8]"
            >
              <img
                src={post.image}
                alt="Publicação Instagram Márcia Martins Estética"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-[#2B2625]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-[#E7D7CE]" />
                </div>
                <div>
                  <p className="text-[11px] line-clamp-3 leading-snug font-normal text-white">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#E7D7CE] mt-2">
                    <Heart className="w-3 h-3 fill-[#E7D7CE]" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
