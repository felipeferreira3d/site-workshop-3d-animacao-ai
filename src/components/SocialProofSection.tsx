import React, { useState } from "react";
import { 
  ArrowRight, 
  Eye, 
  Quote,
  ZoomIn
} from "lucide-react";
import { 
  INSTRUCTOR_AUTHORITY, 
  TEXT_TESTIMONIALS, 
  GALLERY_VIDEOS, 
  VIRAL_PRINTS_GALLERY,
  INSTRUCTOR_RESULTS_GALLERY,
  GalleryVideoItem
} from "../data/cinemaData";
import { AnimatedCounter } from "./AnimatedCounter";
import { VideoModal } from "./VideoModal";
import { ImageLightboxModal } from "./ImageLightboxModal";

export const SocialProofSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideoItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedViralIndex, setSelectedViralIndex] = useState<number | null>(null);
  const [selectedInstructorIndex, setSelectedInstructorIndex] = useState<number | null>(null);

  // Padrão de proporções e alturas do mosaico contínuo (Largo + Quadrado/Compacto perfeitamente alinhados)
  const getMosaicCardLayout = (index: number) => {
    const pattern = [
      "md:col-span-7 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-5 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-5 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-7 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-6 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-6 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-8 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]",
      "md:col-span-4 h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[500px]"
    ];
    return pattern[index % pattern.length];
  };

  return (
    <section id="alunos-em-cena" className="py-20 md:py-32 bg-[#040404] text-white relative overflow-hidden">
      
      {/* Glows sutis de fundo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* =========================================================================
          ★ PARTE 1 — CONTAINER PADRÃO: BLOCO DE AUTORIDADE + HEADER DO MOSAICO
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-24 md:space-y-36">

        {/* =========================================================================
            ★ BLOCO 1 — AUTORIDADE / PROVA SOCIAL DO INSTRUTOR
            (Vídeo 16:9 Centralizado + Faixa Horizontal de Métricas)
            ========================================================================= */}
        <div id="bloco-autoridade" className="space-y-12 md:space-y-16">
          
          {/* Header do Bloco 1 */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
              {INSTRUCTOR_AUTHORITY.headline} <span className="text-cyan-400">{INSTRUCTOR_AUTHORITY.subheadline}</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-normal">
              Antes de ensinar, eu construí uma carreira dirigindo filmes, criando 3D e atendendo marcas de ponta no Brasil e no exterior.
            </p>
          </div>

          {/* 1. VÍDEO CENTRALIZADO NO TOPO DO BLOCO (16:9 EM AUTOPLAY & LOOP) */}
          <div className="max-w-5xl mx-auto w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-400/40 bg-black aspect-video w-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center group/player transition-all">
              {INSTRUCTOR_AUTHORITY.authorityVideoUrl.includes("youtube.com") || INSTRUCTOR_AUTHORITY.authorityVideoUrl.includes("youtu.be") || INSTRUCTOR_AUTHORITY.authorityVideoUrl.includes("streamable.com") ? (
                <iframe
                  src={
                    INSTRUCTOR_AUTHORITY.authorityVideoUrl.includes("streamable.com") && !INSTRUCTOR_AUTHORITY.authorityVideoUrl.includes("/e/")
                      ? INSTRUCTOR_AUTHORITY.authorityVideoUrl.replace("streamable.com/", "streamable.com/e/") + "?autoplay=1&muted=1&loop=1"
                      : INSTRUCTOR_AUTHORITY.authorityVideoUrl
                  }
                  title="Vídeo de Autoridade - Cinema com AI"
                  className="w-full h-full object-cover rounded-3xl"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={INSTRUCTOR_AUTHORITY.authorityVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover rounded-3xl"
                />
              )}
              
              {/* Overlay decorativo sutil na base do vídeo */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* 2. FAIXA HORIZONTAL DE MÉTRICAS LOGO ABAIXO DO VÍDEO */}
          <div className="space-y-8 bg-[#090909] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Título da Faixa de Métricas */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">MÉTRICAS CONSOLIDADAS</span>
              <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mt-1">
                RESULTADOS QUE CHANCELAM O MÉTODO
              </h3>
            </div>

            {/* Grid Horizontal com os 4 Cards de Números Lado a Lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {INSTRUCTOR_AUTHORITY.metrics.map((metric) => (
                <div 
                  key={metric.id}
                  className="p-5 sm:p-6 bg-[#121212] border border-white/10 hover:border-cyan-400/40 rounded-2xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="font-bebas text-4xl sm:text-5xl text-cyan-400 leading-none mb-2 group-hover:scale-105 transition-transform origin-left">
                      <AnimatedCounter 
                        value={metric.targetNumber}
                        decimals={metric.decimals}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                      {metric.label}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Card de Fechamento do Bloco: Fundador da Bench Park Studio */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-center gap-3 max-w-3xl mx-auto">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
              <p className="text-xs sm:text-sm text-zinc-300">
                <strong className="text-white">Fundador da Bench Park Studio:</strong> Trabalhos premiados e campanhas veiculadas para grandes marcas globais.
              </p>
            </div>

          </div>

        </div>

        {/* =========================================================================
            ★ HEADER DO BLOCO: ALUNOS EM CENA
            ========================================================================= */}
        <div id="bloco-galeria-videos" className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
            ALUNOS EM <span className="text-cyan-400">CENA</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-normal">
            Trabalhos produzidos por quem começou do zero. Assista aos curtas, teasers e comerciais criados com o pipeline completo.
          </p>
        </div>

      </div>

      {/* =========================================================================
          ★ PARTE 2 — MOSAICO FULL-BLEED (LARGURA TOTAL DA TELA / ZERO GUTTER)
          (Cards colados uns nos outros, alternando formatos Largos e Quadrados/Compactos)
          ========================================================================= */}
      <div className="w-full mt-10 md:mt-14 bg-black overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 w-full">
          {GALLERY_VIDEOS.map((video, idx) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`${getMosaicCardLayout(idx)} relative overflow-hidden group cursor-pointer bg-black transition-all duration-300`}
            >
              {/* Elemento de Vídeo Direto em Autoplay e Loop Contínuo */}
              <video 
                src={video.videoUrl} 
                poster={video.thumbnailUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 block"
              />
              
              {/* Gradiente Escuro na Base para Alto Contraste */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

              {/* Tag / Role no Canto Superior Direito */}
              {video.authorLabel && (
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 pointer-events-none">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-mono uppercase font-bold text-zinc-300">
                    {video.authorLabel}
                  </span>
                </div>
              )}

              {/* Informações do Card na Base: @ do Instagram do Aluno em Destaque */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-20 flex flex-col justify-end pointer-events-none">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
                      <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-bold">
                        Aluno Pro
                      </span>
                    </div>
                    <h3 className="font-bebas text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight drop-shadow-lg group-hover:text-cyan-300 transition-colors break-words">
                      {video.instagramHandle || video.studentName}
                    </h3>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-white/10 group-hover:bg-cyan-400 group-hover:text-black text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider rounded-lg transition-all group-hover:translate-x-1 shrink-0 backdrop-blur-md border border-white/10 pointer-events-auto">
                    <span>ASSISTIR</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          ★ PARTE 3 — CONTAINER PADRÃO: DEPOIMENTOS DE RESULTADO + REPESCAGEM + CTA
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 mt-24 md:mt-36 space-y-24 md:space-y-36">

        {/* =========================================================================
            ★ DEPOIMENTOS (MOSAICO EQUILIBRADO DE PROVA SOCIAL E RESULTADOS)
            (8 depoimentos com fotos reais e variação harmoniosa de proporção/layout)
            ========================================================================= */}
        <div id="bloco-depoimentos" className="space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
              QUEM APLICOU O MÉTODO, <span className="text-cyan-400">COLHEU RESULTADOS</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-normal">
              Sem enrolação: relatos reais de alunos sobre contratos fechados, faturamento acelerado e visualizações orgânicas.
            </p>
          </div>

          {/* Mosaico Equilibrado com os 8 Cards de Depoimento */}
          <div className="grid grid-cols-12 gap-5 sm:gap-6">
            {TEXT_TESTIMONIALS.map((item, idx) => {
              // Lógica de layout proporcional do mosaico (cards largos, compactos e destaque)
              const isWideCard = idx === 0 || idx === 6;
              const isFullWidthCard = idx === 7;
              
              let spanClass = "col-span-12 md:col-span-6 lg:col-span-4";
              if (idx === 0) spanClass = "col-span-12 lg:col-span-7";
              else if (idx === 1) spanClass = "col-span-12 lg:col-span-5";
              else if (idx === 5) spanClass = "col-span-12 lg:col-span-5";
              else if (idx === 6) spanClass = "col-span-12 lg:col-span-7";
              else if (idx === 7) spanClass = "col-span-12";

              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`${spanClass} cursor-pointer group bg-gradient-to-b from-[#111] to-[#080808] border border-white/10 hover:border-cyan-400/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)] relative overflow-hidden`}
                >
                  {isFullWidthCard ? (
                    // Card 8: Layout Horizontal Destaque de Largura Total
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="px-3.5 py-1.5 bg-cyan-950/80 border border-cyan-400/40 rounded-full font-mono text-xs font-bold text-cyan-300 tracking-wide">
                            {item.resultBadge}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                            Case Internacional
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed italic">
                          "{item.testimonial}"
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0 lg:pl-8 lg:border-l border-white/10 shrink-0 w-full lg:w-auto">
                        <div className="flex items-center gap-4">
                          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/40 shadow-lg flex-shrink-0 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all">
                            <img 
                              src={item.avatarUrl} 
                              alt={item.studentName}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <ZoomIn size={18} className="text-cyan-300 drop-shadow" />
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">{item.studentName}</h4>
                            <p className="text-xs text-zinc-400">{item.studentRole}</p>
                            <span className="text-[11px] font-mono text-cyan-400/90 block mt-0.5">{item.course}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 group-hover:bg-cyan-400/10 border border-white/10 group-hover:border-cyan-400/40 rounded-lg text-[10px] font-mono text-cyan-300 uppercase tracking-wider transition-colors shrink-0">
                          <ZoomIn size={13} />
                          <span className="hidden sm:inline">Ver Print</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Cards 1 a 7: Estrutura Vertical Harmoniosa com Proporção Equilibrada
                    <>
                      <div className="space-y-4">
                        {/* Topo: Badge de Resultado + Ícone de Citação / Zoom */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1.5 bg-cyan-950/80 border border-cyan-400/40 rounded-full font-mono text-xs font-bold text-cyan-300 tracking-wide">
                            {item.resultBadge}
                          </span>
                          <div className="flex items-center gap-1 text-zinc-500 group-hover:text-cyan-400 transition-colors">
                            <ZoomIn size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Quote size={18} className="text-zinc-600 group-hover:hidden" />
                          </div>
                        </div>

                        {/* Texto do Depoimento */}
                        <p className={`text-zinc-300 leading-relaxed italic ${isWideCard ? 'text-sm sm:text-base text-zinc-200' : 'text-xs sm:text-sm'}`}>
                          "{item.testimonial}"
                        </p>
                      </div>

                      {/* Autor do Depoimento com Foto Real e Textos Empilhados */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 flex-shrink-0 shadow-md group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all">
                            <img 
                              src={item.avatarUrl} 
                              alt={item.studentName}
                              className={`${isWideCard ? 'w-13 h-13 sm:w-14 sm:h-14' : 'w-11 h-11 sm:w-12 sm:h-12'} object-cover group-hover:scale-105 transition-transform duration-500`}
                            />
                            <div className="absolute inset-0 bg-cyan-950/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <ZoomIn size={14} className="text-cyan-300 drop-shadow" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white leading-snug truncate group-hover:text-cyan-300 transition-colors">{item.studentName}</h4>
                            <p className="text-[11px] text-zinc-400 truncate">{item.studentRole}</p>
                            <span className="text-[10px] font-mono text-cyan-400/80 block mt-0.5 truncate">{item.course}</span>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white/5 group-hover:bg-cyan-400/10 border border-white/10 group-hover:border-cyan-400/40 rounded-lg text-[9px] font-mono text-cyan-300 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <span>PRINT</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            ★ BLOCO 4 — GALERIA DE PRINTS REAIS DE VIRALIZAÇÃO DOS ALUNOS
            (Mosaico fixo e estático em grid de alta legibilidade, preservando proporções reais em Azul Ciano)
            ========================================================================= */}
        <div id="bloco-repescagem" className="space-y-10 md:space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              PROVA SOCIAL // ALCANCE REAL
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              ALUNOS QUE EXPLODIRAM NAS REDES
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Prints reais de posts, reels e vídeos de alunos que alcançaram centenas de milhares e milhões de visualizações aplicando o método.
            </p>
          </div>

          {/* Mosaico Fixo / Grid Estático com Proporções Reais das Imagens e Alta Legibilidade */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {VIRAL_PRINTS_GALLERY.map((print, idx) => (
              <div
                key={`viral-grid-${print.id}`}
                onClick={() => setSelectedViralIndex(idx)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/70 bg-[#0d0d0d] shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all duration-300 group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Ver print de viralização ${idx + 1}`}
              >
                {/* Imagem em proporção natural sem recorte para máxima nitidez e leitura */}
                <div className="relative w-full bg-[#080808]">
                  <img
                    src={print.imageUrl}
                    alt={`Print de viralização ${idx + 1}`}
                    className="w-full h-auto block object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradiente suave no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                {/* Botão de Zoom Flutuante no Topo */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="p-2 rounded-full bg-black/85 backdrop-blur-md border border-cyan-400/50 text-cyan-300 shadow-md">
                    <ZoomIn size={16} />
                  </div>
                </div>

                {/* Barra Inferior de Identificação do Card */}
                <div className="p-3.5 bg-gradient-to-r from-[#111] via-[#0c0c0c] to-[#111] border-t border-white/5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 bg-black/70 border border-white/10 rounded-full font-mono text-[10px] text-zinc-300">
                    {idx + 1} / {VIRAL_PRINTS_GALLERY.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-cyan-950/90 border border-cyan-400/50 rounded-full text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider group-hover:bg-cyan-900 transition-colors">
                      Ver Print
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Principal de Conversão com Tom Azul / Ciano Neon */}
          <div className="text-center pt-2">
            <div className="inline-flex flex-col items-center gap-4">
              <a 
                href="#inscricao" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-5 bg-cyan-400 hover:bg-cyan-300 text-black font-bebas text-2xl tracking-[0.08em] rounded-full uppercase transition-all shadow-[0_10px_40px_rgba(34,211,238,0.35)] hover:-translate-y-1 flex items-center gap-3 group cursor-pointer"
              >
                <span>Quero ser o próximo case</span>
                <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </a>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Acesso imediato à gravação e comunidade fechada
              </span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            ★ BLOCO 5 — SEÇÃO: MEUS RESULTADOS (PROVA DE AUTORIDADE)
            (Mosaico fixo e estático em grid de alta legibilidade, preservando proporções reais em Verde Esmeralda)
            ========================================================================= */}
        <div id="bloco-meus-resultados" className="space-y-10 md:space-y-12 pt-8 sm:pt-12 border-t border-white/5">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              PROVA DE AUTORIDADE // TRABALHOS PRÓPRIOS
            </span>
            <h3 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              MEUS <span className="text-emerald-400">RESULTADOS</span>
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Métricas reais de alcance, campanhas comerciais e números gerados nas produções autorais e profissionais de Felipe Ferreira.
            </p>
          </div>

          {/* Mosaico Fixo / Grid Estático com Proporções Reais das Imagens e Alta Legibilidade */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {INSTRUCTOR_RESULTS_GALLERY.map((print, idx) => (
              <div
                key={`inst-grid-${print.id}`}
                onClick={() => setSelectedInstructorIndex(idx)}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/70 bg-[#0d0d0d] shadow-lg hover:shadow-[0_0_30px_rgba(52,211,153,0.25)] transition-all duration-300 group cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Ver print de autoridade ${idx + 1}`}
              >
                {/* Imagem em proporção natural sem recorte para máxima nitidez e leitura */}
                <div className="relative w-full bg-[#080808]">
                  <img
                    src={print.imageUrl}
                    alt={`Print de autoridade ${idx + 1}`}
                    className="w-full h-auto block object-contain group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay gradiente suave no hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                {/* Botão de Zoom Flutuante no Topo */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="p-2 rounded-full bg-black/85 backdrop-blur-md border border-emerald-400/50 text-emerald-300 shadow-md">
                    <ZoomIn size={16} />
                  </div>
                </div>

                {/* Barra Inferior de Identificação do Card */}
                <div className="p-3.5 bg-gradient-to-r from-[#111] via-[#0c0c0c] to-[#111] border-t border-white/5 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 bg-black/70 border border-white/10 rounded-full font-mono text-[10px] text-zinc-300">
                    {idx + 1} / {INSTRUCTOR_RESULTS_GALLERY.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-emerald-950/90 border border-emerald-400/50 rounded-full text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider group-hover:bg-emerald-900 transition-colors">
                      Ver Print
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Modal de Vídeo */}
      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />

      {/* Lightbox 1: Depoimentos Escritos / Text Testimonials */}
      <ImageLightboxModal
        items={TEXT_TESTIMONIALS}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNavigate={(newIndex) => setSelectedImageIndex(newIndex)}
      />

      {/* Lightbox 2: Galeria de Prints de Viralização dos Alunos (Azul/Ciano) */}
      <ImageLightboxModal
        items={VIRAL_PRINTS_GALLERY}
        currentIndex={selectedViralIndex}
        themeColor="cyan"
        onClose={() => setSelectedViralIndex(null)}
        onNavigate={(newIndex) => setSelectedViralIndex(newIndex)}
      />

      {/* Lightbox 3: Galeria de Resultados do Instrutor (Verde/Esmeralda) */}
      <ImageLightboxModal
        items={INSTRUCTOR_RESULTS_GALLERY}
        currentIndex={selectedInstructorIndex}
        themeColor="emerald"
        onClose={() => setSelectedInstructorIndex(null)}
        onNavigate={(newIndex) => setSelectedInstructorIndex(newIndex)}
      />

    </section>
  );
};
