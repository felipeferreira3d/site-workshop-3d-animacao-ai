import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { TextTestimonialItem, ViralPrintItem, InstructorResultItem } from "../data/cinemaData";

export interface GenericLightboxItem {
  id: string;
  avatarUrl?: string;
  imageUrl?: string;
  studentName?: string;
  authorName?: string;
  studentRole?: string;
  resultBadge?: string;
  viewsBadge?: string;
  testimonial?: string;
  course?: string;
  caption?: string;
}

interface ImageLightboxModalProps {
  items: Array<TextTestimonialItem | ViralPrintItem | InstructorResultItem | GenericLightboxItem>;
  currentIndex: number | null;
  themeColor?: "cyan" | "emerald";
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  items,
  currentIndex,
  themeColor = "cyan",
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Teclado: Escape para fechar, setas para navegar
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Trava scroll da página de fundo enquanto o lightbox estiver aberto
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  const isEmerald = themeColor === "emerald";

  // Derivações limpas de imagem, badge e textos
  const imageSrc = ('imageUrl' in currentItem && currentItem.imageUrl) 
    ? currentItem.imageUrl 
    : ('avatarUrl' in currentItem ? currentItem.avatarUrl : '');

  const badgeText = ('resultBadge' in currentItem && currentItem.resultBadge)
    ? currentItem.resultBadge
    : ('viewsBadge' in currentItem && currentItem.viewsBadge 
        ? currentItem.viewsBadge 
        : (isEmerald ? 'PROVA DE AUTORIDADE' : 'ALCANCE REAL'));

  const titleText = ('authorName' in currentItem && currentItem.authorName)
    ? currentItem.authorName
    : ('studentName' in currentItem && currentItem.studentName 
        ? currentItem.studentName 
        : (isEmerald ? 'Felipe Ferreira' : 'Print de Viralização'));

  const subtitleText = ('studentRole' in currentItem && currentItem.studentRole)
    ? currentItem.studentRole
    : ('course' in currentItem ? currentItem.course : (isEmerald ? 'Instrutor & Diretor VFX' : ''));

  const captionText = ('testimonial' in currentItem && currentItem.testimonial)
    ? currentItem.testimonial
    : ('caption' in currentItem ? currentItem.caption : '');

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Barra Superior com Informações e Botão Fechar */}
      <div 
        className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          {badgeText && (
            <div className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold ${
              isEmerald
                ? "bg-emerald-950/80 border border-emerald-400/50 text-emerald-300"
                : "bg-cyan-950/80 border border-cyan-400/50 text-cyan-300"
            }`}>
              {badgeText}
            </div>
          )}
          {titleText && (
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-white block leading-tight">{titleText}</span>
              {subtitleText && (
                <span className="text-[11px] text-zinc-400 font-mono">{subtitleText}</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Contador de Imagens */}
          <span className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {currentIndex + 1} / {items.length}
          </span>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 border border-white/10 active:scale-95 shadow-lg"
            aria-label="Fechar lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Botão Anterior */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.8)] group backdrop-blur-sm ${
            isEmerald ? "border-emerald-500/30 hover:border-emerald-400 text-emerald-300" : "border-white/15"
          }`}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={26} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Container Central com a Imagem em Alta Resolução */}
      <div 
        className="relative max-w-[94vw] max-h-[82vh] sm:max-h-[85vh] flex items-center justify-center p-2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={`Print ${currentIndex + 1}`}
          className={`max-w-full max-h-[80vh] sm:max-h-[84vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border shadow-[0_25px_60px_rgba(0,0,0,0.95)] select-none ${
            isEmerald ? "border-emerald-500/30" : "border-white/15"
          }`}
        />
      </div>

      {/* Botão Próximo */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.8)] group backdrop-blur-sm ${
            isEmerald ? "border-emerald-500/30 hover:border-emerald-400 text-emerald-300" : "border-white/15"
          }`}
          aria-label="Próxima foto"
        >
          <ChevronRight size={26} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Barra Inferior com Legenda */}
      {captionText && (
        <div 
          className="absolute bottom-0 inset-x-0 p-4 pb-6 sm:pb-6 flex items-center justify-center z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"
        >
          <div className="text-center max-w-xl px-4 pointer-events-auto">
            <p className="text-xs sm:text-sm text-zinc-300 italic line-clamp-2">
              "{captionText}"
            </p>
            {subtitleText && (
              <span className={`text-[11px] font-mono mt-1 block ${
                isEmerald ? "text-emerald-400" : "text-cyan-400"
              }`}>
                {titleText} · {subtitleText}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

