import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Eye, Sparkles, Maximize2, Quote } from "lucide-react";
import { motion } from "motion/react";
import { StudentProject } from "../data/cinemaData";

interface StudentVideoCardProps {
  project: StudentProject;
  index: number;
  onOpenModal?: (project: StudentProject) => void;
}

export const StudentVideoCard: React.FC<StudentVideoCardProps> = ({ project, index, onOpenModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Bar with Number & Project Badge */}
      <div className="p-4 md:p-6 pb-3 flex items-center justify-between border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="font-bebas text-2xl md:text-3xl text-zinc-600 group-hover:text-cyan-400 transition-colors italic tracking-wider">
            {project.id}
          </span>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors truncate max-w-[180px] md:max-w-[240px]">
            {project.projectName}
          </span>
        </div>

        {/* Views Badge - Destaque Tipográfico & Visual Forte */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/80 border border-cyan-400/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.25)]">
          <Eye size={13} className="text-cyan-400 animate-pulse" />
          <span className="font-bebas text-sm md:text-base text-cyan-300 tracking-wider">
            {project.viewsBadge}
          </span>
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-neutral-950 overflow-hidden cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.thumbnailUrl}
          playsInline
          loop
          muted={isMuted}
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Center Play Button if paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan-400/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.6)] backdrop-blur-sm group-hover:scale-110 transition-transform">
              <Play size={24} className="fill-black translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Video Controls Bar on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="px-2.5 py-1 bg-black/70 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10 backdrop-blur-md flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="fill-white" />}
            <span>{isPlaying ? "Pausar" : "Assistir"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 bg-black/70 hover:bg-black text-white rounded-md border border-white/10 backdrop-blur-md transition-colors"
              title={isMuted ? "Ativar som" : "Desativar som"}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-cyan-400" />}
            </button>

            {onOpenModal && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
                className="p-1.5 bg-black/70 hover:bg-black text-white rounded-md border border-white/10 backdrop-blur-md transition-colors"
                title="Expandir vídeo"
              >
                <Maximize2 size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Student Details & Testimonial */}
      <div className="p-5 md:p-6 space-y-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505] flex-1 flex flex-col justify-between">
        {/* Testimonial Quote */}
        <div className="relative">
          <Quote className="text-cyan-400/20 absolute -top-1 -left-1 w-6 h-6 rotate-180" />
          <p className="text-xs md:text-sm text-zinc-300 font-normal leading-relaxed pl-5 italic">
            "{project.testimonial}"
          </p>
        </div>

        {/* Student Name & Course info */}
        <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <span>{project.studentName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </h4>
            <span className="text-[10px] md:text-xs text-zinc-500 font-medium tracking-wide">
              {project.courseTaken}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-wider text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
