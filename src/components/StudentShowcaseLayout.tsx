import React, { useState, useMemo, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Eye, Maximize2, Quote, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { StudentProject } from "../data/cinemaData";

interface StudentShowcaseLayoutProps {
  projects: StudentProject[];
  onOpenModal: (project: StudentProject) => void;
}

export const StudentShowcaseLayout: React.FC<StudentShowcaseLayoutProps> = ({
  projects,
  onOpenModal,
}) => {
  // Ordena os projetos automaticamente pelo número de views (maior para menor)
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => b.viewsCount - a.viewsCount);
  }, [projects]);

  // O card com maior número de views é o destaque inicial
  const [featuredId, setFeaturedId] = useState<string>(sortedProjects[0]?.id || "");

  // Garante que o featuredId exista se os projetos mudarem
  useEffect(() => {
    if (sortedProjects.length > 0 && !sortedProjects.some(p => p.id === featuredId)) {
      setFeaturedId(sortedProjects[0].id);
    }
  }, [sortedProjects, featuredId]);

  // Projeto atualmente em destaque
  const featuredProject = useMemo(() => {
    return sortedProjects.find((p) => p.id === featuredId) || sortedProjects[0];
  }, [sortedProjects, featuredId]);

  // Projetos minimizados (todos os outros ordenados por views)
  const minimizedProjects = useMemo(() => {
    return sortedProjects.filter((p) => p.id !== featuredProject?.id);
  }, [sortedProjects, featuredProject]);

  // Estado do player de vídeo no card em destaque
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Reinicia o player quando trocar o projeto em destaque
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [featuredId]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  if (!featuredProject) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* =========================================================================
            CARD EM DESTAQUE (À ESQUERDA COM 2 COLUNAS INTERNAS: VÍDEO VERTICAL 9:16 + INFOS)
            ========================================================================= */}
        <div className="lg:col-span-7 xl:col-span-7 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredProject.id}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group relative bg-[#0a0a0a] border border-cyan-400/30 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] shadow-cyan-500/10 flex flex-col md:flex-row items-stretch"
            >
              {/* -------------------------------------------------------------------
                  COLUNA ESQUERDA — VÍDEO EM PROPORÇÃO VERTICAL (9:16 ESTILO REELS)
                  ------------------------------------------------------------------- */}
              <div 
                className="relative w-full md:w-[45%] lg:w-[46%] aspect-[9/16] max-h-[580px] md:max-h-[640px] bg-neutral-950 overflow-hidden cursor-pointer group/player select-none flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10" 
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  src={featuredProject.videoUrl}
                  poster={featuredProject.thumbnailUrl}
                  playsInline
                  loop
                  muted={isMuted}
                  preload="metadata"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-105"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Overlay gradiente suave no topo e na base do vídeo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                {/* Topo do Vídeo: Badge de Destaque Principal + Formato Reels */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-cyan-400/40 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 shadow-md">
                    <Sparkles size={11} className="text-cyan-400 animate-pulse" />
                    <span>DESTAQUE</span>
                  </span>

                  <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md border border-white/15 rounded text-[9px] font-mono text-zinc-300 uppercase tracking-widest">
                    9:16 REEL
                  </span>
                </div>

                {/* Botão de Play Central se pausado */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.7)] backdrop-blur-md group-hover/player:scale-110 transition-all duration-300">
                      <Play size={26} className="fill-black translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Barra de Controles Inferior sobreposta ao vídeo */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-auto z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="px-2.5 sm:px-3 py-1.5 bg-black/80 hover:bg-black text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider rounded-md border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all hover:border-cyan-400"
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} className="fill-white" />}
                    <span>{isPlaying ? "Pausar" : "Preview"}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="p-1.5 bg-black/80 hover:bg-black text-white rounded-md border border-white/20 backdrop-blur-md transition-all hover:border-cyan-400"
                      title={isMuted ? "Ativar som" : "Desativar som"}
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-cyan-400" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(featuredProject);
                      }}
                      className="p-1.5 bg-black/80 hover:bg-black text-white rounded-md border border-white/20 backdrop-blur-md transition-all hover:border-cyan-400"
                      title="Abrir em tela cheia"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------
                  COLUNA DIREITA — INFORMAÇÕES DO VÍDEO (TÍTULO, VIEWS, DEPOIMENTO, AUTOR E TAGS)
                  ------------------------------------------------------------------- */}
              <div className="w-full md:w-[55%] lg:w-[54%] p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b md:bg-gradient-to-r from-[#0a0a0a] via-[#090909] to-[#040404]">
                
                {/* Topo: Título do Projeto e Badge de Views em Destaque */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400/80 font-bold">
                      CASE #{featuredProject.id} // VÍDEO VIRAL
                    </span>

                    {/* Badge de Views com Maior Impacto */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-950/90 border border-cyan-400/50 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                      <Eye size={15} className="text-cyan-400 animate-pulse" />
                      <span className="font-bebas text-lg sm:text-xl text-cyan-300 tracking-wider">
                        {featuredProject.viewsBadge}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-[0.9] drop-shadow-md">
                    {featuredProject.projectName}
                  </h3>
                </div>

                {/* Meio: Depoimento Completo do Aluno */}
                <div className="relative my-auto py-2">
                  <Quote className="text-cyan-400/20 absolute -top-2 -left-1 w-8 h-8 rotate-180" />
                  <p className="text-sm sm:text-base text-zinc-200 font-normal leading-relaxed pl-7 italic">
                    "{featuredProject.testimonial}"
                  </p>
                </div>

                {/* Base: Autor, Curso e Tags das Ferramentas */}
                <div className="pt-5 border-t border-white/10 space-y-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                      <span>{featuredProject.studentName}</span>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 font-medium tracking-wide">
                      {featuredProject.courseTaken}
                    </p>
                  </div>

                  {/* Tags das ferramentas */}
                  <div className="flex flex-wrap gap-1.5">
                    {featuredProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================================
            CARDS MINIMIZADOS (À DIREITA, ~35-40% DA LARGURA, EMPILHADOS VERTICALMENTE)
            ========================================================================= */}
        <div className="lg:col-span-5 xl:col-span-5 w-full space-y-3">
          
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              OUTROS TRABALHOS ({minimizedProjects.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
              Clique para destacar ↑
            </span>
          </div>

          {/* Coluna com Scroll Vertical */}
          <div className="space-y-3 max-h-[640px] lg:max-h-[690px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {minimizedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setFeaturedId(project.id)}
                className="group relative bg-[#0a0a0a]/90 hover:bg-neutral-900 border border-white/10 hover:border-cyan-400/70 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)] hover:-translate-y-0.5 flex items-center gap-3.5"
              >
                {/* Thumbnail Compacta com Botão de Play */}
                <div className="relative w-24 sm:w-28 h-16 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-950 border border-white/10 group-hover:border-cyan-400/40">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.projectName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Micro Botão Play sobreposto */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-cyan-400/90 text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play size={12} className="fill-black translate-x-0.5" />
                    </div>
                  </div>

                  {/* Número do card */}
                  <div className="absolute top-1 left-1.5 font-bebas text-xs text-white/70">
                    {project.id}
                  </div>
                </div>

                {/* Informações Compactas */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-bold text-xs sm:text-sm text-white uppercase tracking-tight truncate group-hover:text-cyan-300 transition-colors">
                        {project.projectName}
                      </h5>
                      
                      {/* Badge de Views Compacto */}
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-cyan-950/80 border border-cyan-400/30 rounded-full flex-shrink-0">
                        <Eye size={11} className="text-cyan-400" />
                        <span className="font-bebas text-xs text-cyan-300 tracking-wider">
                          {project.viewsBadge}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400 font-medium truncate">
                      {project.studentName} · <span className="text-zinc-500">{project.courseTaken}</span>
                    </p>
                  </div>

                  {/* Frase curta do depoimento / Tag */}
                  <div className="pt-1.5 flex items-center justify-between gap-2">
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 italic line-clamp-1">
                      "{project.testimonial.slice(0, 55)}..."
                    </p>
                    
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400/70 group-hover:text-cyan-300 flex-shrink-0 flex items-center gap-0.5">
                      <span>Destacar</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Estilo para custom scrollbar da coluna direita */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.25);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </div>
  );
};
