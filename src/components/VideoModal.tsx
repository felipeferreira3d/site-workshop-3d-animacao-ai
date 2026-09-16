import React from "react";
import { X, Play, Eye } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryVideoItem, StudentProject } from "../data/cinemaData";

export interface ModalVideoData {
  title: string;
  viewsBadge?: string;
  videoUrl: string;
  authorLabel?: string;
  testimonial?: string;
}

interface VideoModalProps {
  video?: GalleryVideoItem | StudentProject | ModalVideoData | null;
  project?: StudentProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, project, onClose }) => {
  const activeVideo = video || project;
  if (!activeVideo) return null;

  const getTitle = () => {
    if ('instagramHandle' in activeVideo && activeVideo.instagramHandle) return activeVideo.instagramHandle;
    if ('studentName' in activeVideo && activeVideo.studentName) return activeVideo.studentName;
    if ('title' in activeVideo && activeVideo.title) return activeVideo.title;
    if ('projectName' in activeVideo && (activeVideo as StudentProject).projectName) return (activeVideo as StudentProject).projectName;
    return "Vídeo do Aluno";
  };
  const title = getTitle();

  const author = 'authorLabel' in activeVideo ? activeVideo.authorLabel : undefined;
  const testimonial = 'testimonial' in activeVideo ? activeVideo.testimonial : undefined;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl bg-[#0d0d0d] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.2)] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 md:p-6 flex items-center justify-between border-b border-white/10 bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <div>
                <h3 className="text-sm md:text-base font-black uppercase text-white tracking-wider">{title}</h3>
                {author && (
                  <p className="text-[11px] text-zinc-400 font-medium">{author}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {'viewsBadge' in activeVideo && activeVideo.viewsBadge && (
                <span className="px-3.5 py-1.5 bg-cyan-950/80 border border-cyan-400/50 rounded-full font-bebas text-sm sm:text-base text-cyan-300 tracking-wider flex items-center gap-1.5">
                  <Eye size={14} className="text-cyan-400" />
                  {activeVideo.viewsBadge}
                </span>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Fechar vídeo"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          {/* Footer Action */}
          <div className="p-4 md:p-5 bg-[#080808] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {testimonial ? (
              <p className="text-xs md:text-sm text-zinc-300 italic max-w-xl">
                "{testimonial}"
              </p>
            ) : (
              <p className="text-xs text-zinc-400">
                Criado com pipeline profissional de Inteligência Artificial & 3D.
              </p>
            )}
            <a
              href="#inscricao"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase text-xs rounded-full transition-all tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.3)] text-center flex-shrink-0"
            >
              Quero Produzir Assim →
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

