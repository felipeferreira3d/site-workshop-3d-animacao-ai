/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from "react";
import { HashRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Monitor, 
  Play, 
  Pause, 
  Zap,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Instagram,
  Youtube,
  Users,
  TrendingUp,
  Eye,
  Sparkles,
  Award,
  Film,
  Layers,
  ShieldCheck,
  Menu,
  X,
  Terminal,
  FileText,
  Check,
  Shield
} from "lucide-react";

import { 
  HERO_VIDEO_URL,
  STUDENT_PROJECTS, 
  TOTAL_STUDENT_VIEWS_LABEL, 
  METRICS_DATA, 
  DIFFERENTIALS_DATA, 
  COURSE_MODULES, 
  FAQ_ITEMS, 
  MARQUEE_KEYWORDS,
  StudentProject 
} from "./data/cinemaData";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { StudentVideoCard } from "./components/StudentVideoCard";
import { StudentShowcaseLayout } from "./components/StudentShowcaseLayout";
import { VideoModal } from "./components/VideoModal";
import { SocialProofSection } from "./components/SocialProofSection";
import { 
  findAffiliate, 
  DEFAULT_CHECKOUT_LINK, 
  AFFILIATES_LIST, 
  Affiliate 
} from "./data/affiliatesData";
import { AffiliatesDirectoryPage } from "./components/AffiliatesDirectoryPage";

// --- Configuration & Constants ---
// A lista completa e centralizada de afiliados fica em: src/data/affiliatesData.ts

// --- Sub-components ---

const Marquee = ({ children, speed = "35s", className = "py-4 md:py-6" }: { children: React.ReactNode, speed?: string, className?: string }) => {
  return (
    <div className={`relative flex overflow-x-hidden border-y border-white/10 bg-black ${className}`}>
      <div className="whitespace-nowrap flex animate-marquee shrink-0 items-center" style={{ animationDuration: speed }}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

const Logo = ({ className = "h-8 md:h-9" }: { className?: string }) => {
  return (
    <a href="#inicio" className="flex items-center gap-1.5 leading-none select-none group">
      <span className="font-bebas text-2xl md:text-3xl text-white tracking-wider group-hover:text-cyan-300 transition-colors">CINEMA COM</span>
      <span className="font-bebas text-2xl md:text-3xl text-cyan-400 tracking-wider">IA</span>
    </a>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-cyan-950/60 border border-cyan-400/30 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    <span className="text-[10px] md:text-[11px] font-black tracking-[0.25em] uppercase text-cyan-300">
      {children}
    </span>
  </div>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
          <a href="#inicio" className="hover:text-cyan-400 transition-colors">Início</a>
          <a href="#alunos-em-cena" className="hover:text-cyan-400 text-cyan-300 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            Alunos em Cena
          </a>
          <a href="#sobre" className="hover:text-cyan-400 transition-colors">Sobre</a>
          <a href="#diferenciais" className="hover:text-cyan-400 transition-colors">Diferenciais</a>
          <a href="#modulos" className="hover:text-cyan-400 transition-colors">Módulos</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a 
            href="#inscricao" 
            className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bebas text-sm tracking-[0.1em] rounded uppercase transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Matrícula</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Mobile Burger */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4"
          >
            <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest text-white/70">
              <a href="#inicio" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 py-1">Início</a>
              <a href="#alunos-em-cena" onClick={() => setMobileOpen(false)} className="text-cyan-400 py-1">★ Alunos em Cena</a>
              <a href="#sobre" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 py-1">Sobre a Metodologia</a>
              <a href="#diferenciais" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 py-1">Diferenciais</a>
              <a href="#modulos" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 py-1">Módulos do Curso</a>
              <a href="#faq" onClick={() => setMobileOpen(false)} className="hover:text-cyan-400 py-1">Dúvidas Frequentes</a>
            </div>
            <a 
              href="#inscricao" 
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 bg-cyan-400 text-black font-bebas text-lg tracking-wider rounded-full uppercase shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Garantir Minha Vaga
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Main Page Component ---

function CinemaComAIPage() {
  const { affiliateId } = useParams();
  const [checkoutLink, setCheckoutLink] = useState(DEFAULT_CHECKOUT_LINK);
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>("01");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  React.useEffect(() => {
    document.title = "CINEMA COM IA";
  }, []);

  // Lógica de Afiliados integrada com Router e Query Params
  React.useEffect(() => {
    let candidate = affiliateId;
    if (!candidate) {
      const searchParams = new URLSearchParams(window.location.search);
      candidate = searchParams.get('ref') || undefined;
    }
    if (!candidate && window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      const hashParams = new URLSearchParams(hashQuery);
      candidate = hashParams.get('ref') || undefined;
    }

    const matchedAffiliate = findAffiliate(candidate);
    if (matchedAffiliate) {
      setCheckoutLink(matchedAffiliate.checkoutUrl);
    } else {
      setCheckoutLink(DEFAULT_CHECKOUT_LINK);
    }
  }, [affiliateId]);

  return (
    <div id="inicio" className="bg-[#050505] text-white font-sans selection:bg-cyan-500 selection:text-black antialiased relative">
      <Navbar />

      {/* =========================================================================
          SEÇÃO 1 — HERO FULL-BLEED (100VH) ESTILO CINEMATOGRÁFICO
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] flex flex-col justify-end overflow-hidden">
        {/* VÍDEO DE FUNDO EM TELA CHEIA (FULL-BLEED 100% VIEWPORT COM CORES E CONTRASTE ORIGINAIS NÍTIDOS) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none scale-105"
          />
          
          {/* Transição limpa e sutil na base do vídeo para o fundo, sem degradê atrás do texto */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
        </div>

        {/* BASE: TÍTULO GIGANTE, SUBHEADLINE E BOTÕES DE AÇÃO */}
        <div className="relative z-20 pb-12 md:pb-16 pt-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-end">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            
            {/* Bloco de Título e Subheadline */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl space-y-4"
            >
              {/* Título Principal Gigante Sem Degradê */}
              <h1 className="font-bebas font-black uppercase text-white tracking-tight leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-[6.5vw] select-none [text-shadow:_0_3px_20px_rgba(0,0,0,0.9)]">
                VÍDEOS CINEMATOGRÁFICOS, <br />
                <span className="text-cyan-400">VIRAIS E QUE GERAM RENDA</span>
              </h1>

              {/* Subheadline com sombra sutil para legibilidade em qualquer frame de fundo */}
              <p className="text-white sm:text-zinc-100 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-normal pt-1 [text-shadow:_0_2px_14px_rgba(0,0,0,0.95),_0_1px_4px_rgba(0,0,0,1)]">
                Direção de cena, consistência e pós-produção audiovisual com inteligência artificial e 3D. O método prático para produzir filmes, animações e comerciais de alto impacto sem câmera cara ou estúdio milionário.
              </p>

              {/* Três botões de ação lado a lado */}
              <div className="pt-3 flex flex-wrap items-center gap-3 md:gap-4">
                {/* Botão 1: VER ALUNOS EM CENA ↓ */}
                <a 
                  href="#alunos-em-cena"
                  className="px-5 sm:px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-all shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:-translate-y-0.5 flex items-center gap-2 group/b1"
                >
                  <span>VER ALUNOS EM CENA</span>
                  <ArrowDown size={15} className="group-hover/b1:translate-y-0.5 transition-transform" />
                </a>

                {/* Botão 2: GARANTIR VAGA ↓ */}
                <a 
                  href="#inscricao"
                  className="px-5 sm:px-6 py-3.5 bg-black/70 hover:bg-black/90 border border-white/30 hover:border-cyan-400 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-all backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 flex items-center gap-2 group/b2"
                >
                  <span>GARANTIR VAGA</span>
                  <ArrowDown size={15} className="group-hover/b2:translate-y-0.5 transition-transform" />
                </a>

                {/* Botão 3: INSTAGRAM ↗ */}
                <a 
                  href="https://www.instagram.com/__theferreira/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-3.5 bg-black/70 hover:bg-black/90 border border-white/30 hover:border-cyan-400 text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase rounded-md transition-all backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 flex items-center gap-2 group/b3"
                >
                  <span>INSTAGRAM</span>
                  <ArrowUpRight size={15} className="group-hover/b3:translate-x-0.5 group-hover/b3:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Indicador de Scroll "ROLE" no canto inferior direito */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex flex-col items-center gap-2 text-zinc-400 pb-2 select-none"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] rotate-180 text-zinc-400">
                ROLE
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-cyan-400" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 2 — BARRA DE NÚMEROS EM DESTAQUE (CONTADOR ANIMADO)
          ========================================================================= */}
      <section className="py-12 md:py-16 bg-neutral-950 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {METRICS_DATA.map((item) => (
              <div key={item.id} className="text-center lg:text-left space-y-1 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/20 transition-all">
                <div className="font-bebas text-4xl sm:text-5xl md:text-6xl text-cyan-400 leading-none">
                  <AnimatedCounter 
                    value={item.targetNumber} 
                    decimals={item.decimals} 
                    prefix={item.prefix} 
                    suffix={item.suffix} 
                  />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">
                  {item.label}
                </h3>
                <p className="text-[10px] md:text-xs text-zinc-400 leading-tight">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ★ SEÇÃO 3 — PROVA SOCIAL & AUTORIDADE ("ALUNOS EM CENA")
          (4 Blocos Estruturados: Autoridade, Depoimentos, Vídeos, Repescagem)
          ========================================================================= */}
      <SocialProofSection />


      {/* =========================================================================
          SEÇÃO 4 — SOBRE / METODOLOGIA ("POR TRÁS DOS FRAMES") + LOGOS DE CLIENTES
          ========================================================================= */}
      <section id="sobre" className="py-20 md:py-32 px-6 md:px-8 border-t border-white/10 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual de Produção / Foto de Destaque */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Direção e Produção Audiovisual"
                  className="w-full aspect-[4/5] object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">Método Exclusivo</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold italic text-white">
                    "Aqui você produz do zero à entrega final. Da concepção do roteiro à renderização em 4K."
                  </p>
                </div>
              </div>
            </div>

            {/* Texto Institucional / Metodologia */}
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel>POR TRÁS DOS FRAMES</SectionLabel>

              <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight uppercase italic text-white">
                NÃO É TEORIA GENÉRICA. <br />
                <span className="text-cyan-400">É EXECUÇÃO DE ESTÚDIO.</span>
              </h2>

              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-normal">
                O maior erro de quem tenta criar com inteligência artificial é tratar prompts como uma roleta-russa de resultados aleatórios. No <strong>CINEMA COM AI</strong>, você aprende o mesmo pipeline de direção e pós-produção executado nos projetos da <strong>Bench Park Studio</strong>:
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">Pipeline Híbrido Sem Gargalos</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Integração direta entre modelagem e câmeras virtuais em 3D (Blender), motores generativos de vídeo (Seedance 2, Kling 3, Runway Gen-3) e sonoplastia neural com ElevenLabs.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Film size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-tight">Direção & Linguagem de Cinema</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Enquadramentos precisos, iluminação dramática de três pontos, lentes anamórficas e continuidade visual entre tomadas — você no controle de cada frame, sem depender do acaso.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 5 — DIFERENCIAIS ("POR QUE ESTUDAR AQUI" / GRID NUMERADO 001-004)
          ========================================================================= */}
      <section id="diferenciais" className="py-20 md:py-32 px-6 md:px-8 bg-neutral-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel>DIFERENCIAIS EXCLUSIVOS</SectionLabel>
              <h2 className="font-bebas text-5xl sm:text-7xl font-black leading-[0.9] tracking-tight uppercase italic text-white">
                CADA IMAGEM TEM <br />
                <span className="text-cyan-400">UM PROPÓSITO</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
              Quatro pilares práticos que transformam prompts aleatórios em produções cinematográficas com valor real de mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIFFERENTIALS_DATA.map((diff) => (
              <div 
                key={diff.number}
                className="p-8 rounded-3xl bg-[#080808] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-bebas text-4xl text-zinc-700 group-hover:text-cyan-400 transition-colors italic">
                      {diff.number}
                    </span>
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                      {diff.tag}
                    </span>
                  </div>

                  <h3 className="font-bebas text-2xl md:text-3xl uppercase tracking-tight text-white mb-2 italic">
                    {diff.title}
                  </h3>

                  <p className="text-xs font-bold text-cyan-400/90 uppercase tracking-wide mb-3">
                    {diff.headline}
                  </p>

                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                    {diff.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-zinc-600 group-hover:text-cyan-400 transition-colors">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Metodologia Validada</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 6 — MÓDULOS / "O QUE VOCÊ VAI APRENDER" (ACORDEÃO NUMERADO 01-06)
          ========================================================================= */}
      <section id="modulos" className="py-20 md:py-32 px-6 md:px-8 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Header */}
            <div className="lg:col-span-5 sticky top-28">
              <SectionLabel>TRILHA COMPLETA</SectionLabel>
              <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl leading-[0.88] tracking-tight uppercase italic text-white mb-6">
                O QUE VOCÊ <br />
                <span className="text-cyan-400">VAI APRENDER</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-8">
                6 módulos com foco 100% prático. Você constrói seu projeto cinematográfico etapa por etapa: da concepção e storyboard até a renderização 4K e venda comercial.
              </p>
              
              <div className="p-6 bg-zinc-950 border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-cyan-400 font-bebas text-xl">
                  <Award size={24} />
                  <span>Certificado & Toolkit Incluídos</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Acesso aos prompts estruturados, templates de propostas comerciais, guias de lentes cinematográficas e certificado oficial de conclusão.
                </p>
              </div>
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {COURSE_MODULES.map((modulo) => {
                const isExpanded = expandedModule === modulo.id;

                return (
                  <div 
                    key={modulo.id}
                    className={`border rounded-2xl md:rounded-3xl transition-all duration-300 overflow-hidden ${
                      isExpanded 
                        ? "bg-zinc-950 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.1)]" 
                        : "bg-zinc-900/30 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => setExpandedModule(isExpanded ? null : modulo.id)}
                      className="w-full p-6 md:p-8 flex items-center justify-between text-left gap-4"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className={`font-bebas text-3xl md:text-4xl italic transition-colors ${isExpanded ? "text-cyan-400" : "text-zinc-600"}`}>
                          {modulo.id}
                        </span>
                        <div>
                          <h3 className="font-bebas text-xl md:text-2xl uppercase tracking-tight text-white italic">
                            {modulo.title}
                          </h3>
                          <p className="text-xs text-zinc-400 font-medium">
                            {modulo.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isExpanded ? "bg-cyan-400 text-black rotate-180" : "bg-white/5 text-white/70"
                      }`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-white/5 space-y-4"
                        >
                          <p className="text-xs md:text-sm text-zinc-300 pt-4 leading-relaxed">
                            {modulo.description}
                          </p>

                          {/* Topics List */}
                          <div className="space-y-2 pt-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Conteúdo Prático:</span>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {modulo.topics.map((topic, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tools */}
                          <div className="flex flex-wrap items-center gap-2 pt-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold mr-2">Ferramentas:</span>
                            {modulo.tools.map((t, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase text-zinc-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 7 — COMUNIDADE NO WHATSAPP (+800 MEMBROS ATIVOS)
          ========================================================================= */}
      <section className="py-16 md:py-28 px-6 bg-zinc-950 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full">
                <MessageSquare className="text-[#25D366]" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">NETWORK ULTRA EXCLUSIVO</span>
              </div>
              
              <h2 className="font-bebas text-5xl md:text-7xl font-black leading-[0.9] tracking-tight uppercase italic text-white">
                A COMUNIDADE QUE <br />
                <span className="text-[#25D366]">GERA RESULTADOS</span>
              </h2>
              
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                Mais do que um treinamento gravado, o <strong>CINEMA COM AI</strong> te conecta diretamente a um grupo fechado no <strong className="text-white">WhatsApp com mais de 1.000 membros ativos</strong>. Trocas diárias de novas IAs, parcerias em jobs reais e estratégias para viralizar e fechar clientes no Brasil e no exterior.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-left">
                <div className="p-4 bg-zinc-900/60 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="text-[#25D366]" size={18} />
                    <h4 className="font-bold uppercase text-xs text-white">Viralização Coletiva</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Membros ativos que ultrapassaram <strong>milhões de visualizações</strong> aplicando nossos conceitos de narrativa e edição.
                  </p>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-[#25D366]/20 rounded-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="text-[#25D366]" size={18} />
                    <h4 className="font-bold uppercase text-xs text-white">Jobs em Dólar e Real</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Alunos fechando contratos internacionais de produção de vídeos, recebendo em <strong>Dólar ($)</strong> e em <strong>Real (R$)</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm p-8 bg-[#0a0f0d] border border-green-500/20 rounded-[32px] overflow-hidden text-center shadow-[0_20px_50px_rgba(37,211,102,0.08)]">
                <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_10px_32px_rgba(37,211,102,0.35)]">
                  <MessageSquare size={38} className="text-black fill-black" />
                </div>
                
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#25D366] block mb-1">Membros Ativos</span>
                <div className="font-bebas text-4xl sm:text-5xl italic tracking-tight text-white mb-2">+1.000 MEMBROS</div>
                <p className="text-xs text-zinc-400 max-w-[240px] mx-auto leading-relaxed mb-6">
                  Ecossistema fechado de apoio, feedbacks de cena e parcerias comerciais.
                </p>

                <div className="flex items-center justify-center -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                  ].map((avatar, idx) => (
                    <div key={idx} className="w-9 h-9 rounded-full border-2 border-[#0a0f0d] overflow-hidden bg-zinc-800">
                      <img src={avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full border-2 border-[#0a0f0d] bg-[#25D366] flex items-center justify-center text-[10px] font-black text-black">
                    +1.000
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 8 — FAQ (PERGUNTAS FREQUENTES EM ACORDEÃO)
          ========================================================================= */}
      <section id="faq" className="py-20 md:py-32 px-6 md:px-8 bg-[#030303] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16 space-y-3">
            <SectionLabel>TIRA-DÚVIDAS</SectionLabel>
            <h2 className="font-bebas text-5xl sm:text-7xl font-black tracking-tight uppercase italic text-white">
              COMO <span className="text-cyan-400">FUNCIONA</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto">
              Respostas diretas para as dúvidas mais comuns antes de garantir sua vaga.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isExpanded = expandedFaq === index;

              return (
                <div 
                  key={index}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "bg-zinc-950 border-cyan-400/40" 
                      : "bg-zinc-900/30 border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm md:text-base font-bold text-white uppercase tracking-tight">
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isExpanded ? "bg-cyan-400 text-black rotate-180" : "bg-white/5 text-white/70"
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-0 border-t border-white/5"
                      >
                        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 9 — CTA FINAL DE CONVERSÃO / INSCRIÇÃO
          (ESTILO "O PRÓXIMO FRAME QUE NINGUÉM ESQUECE")
          ========================================================================= */}
      <section id="inscricao" className="py-20 md:py-32 px-6 md:px-8 bg-black relative overflow-hidden border-t border-white/10">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          
          <SectionLabel>MATRÍCULA ABERTA // LOTE ESPECIAL</SectionLabel>

          <h2 className="font-bebas text-5xl sm:text-7xl md:text-[90px] font-black leading-[0.88] tracking-tight uppercase italic text-white">
            O PRÓXIMO FRAME QUE <br />
            <span className="text-cyan-400">NINGUÉM ESQUECE</span>
          </h2>

          <p className="text-sm md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Pare de assistir de fora enquanto o mercado audiovisual se transforma. Domine as ferramentas certas, crie seu portfólio cinematográfico e comece a monetizar agora.
          </p>

          {/* Pricing Box */}
          <div className="p-8 md:p-14 bg-zinc-950/80 border border-cyan-500/30 rounded-[32px] backdrop-blur-2xl relative shadow-[0_0_60px_rgba(34,211,238,0.15)] max-w-2xl mx-auto">
            
            <div className="inline-block px-5 py-2 bg-cyan-400 text-black font-bebas text-sm tracking-[0.15em] uppercase rounded-full mb-8 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Acesso Vitalício + Gravações + Grupo VIP WhatsApp
            </div>

            <div className="flex flex-col items-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                Investimento Promocional
              </span>
              <span className="text-base font-bold text-zinc-400 line-through italic mb-2">
                De R$ 297,00
              </span>
              <div className="flex items-baseline justify-center gap-1 font-bebas">
                <span className="text-4xl md:text-5xl text-white italic">R$</span>
                <span className="text-7xl md:text-9xl text-cyan-400 italic leading-none">197</span>
                <span className="text-3xl md:text-4xl text-white italic">,00</span>
              </div>
              <span className="text-xs text-zinc-400 mt-2 font-medium">
                ou em até 12x no cartão de crédito
              </span>
            </div>

            {/* Button */}
            <div className="space-y-4">
              <a 
                href={checkoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 bg-cyan-400 hover:bg-cyan-300 text-black font-bebas text-2xl tracking-[0.1em] rounded-full uppercase transition-all shadow-[0_10px_40px_rgba(34,211,238,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 text-center"
              >
                <span>Garantir Vaga Agora</span>
                <ArrowRight size={22} />
              </a>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-wider text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  Pagamento Seguro
                </span>
                <span>•</span>
                <span>Acesso Imediato</span>
                <span>•</span>
                <span>7 Dias de Garantia</span>
              </div>
            </div>

            {/* WhatsApp Link Direto */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-zinc-400">
              <span>Dúvidas na matrícula? Fale direto no WhatsApp:</span>
              <a 
                href="https://wa.me/5522992824984?text=Oi,%20tenho%20dúvidas%20sobre%20o%20CINEMA%20COM%20AI." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline font-bold"
              >
                (22) 99282-4984 →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 9.5 — CTA WHATSAPP // CONVERSA SOBRE SUA CARREIRA
          (Posicionada após o preço e antes da barra de texto animada)
          ========================================================================= */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-[#040605] border-t border-white/10 relative overflow-hidden">
        {/* Glow sutil verde de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#25D366]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full">
            <MessageSquare className="text-[#25D366]" size={15} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#25D366]">ATENDIMENTO DIRETO & CARREIRA</span>
          </div>

          <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.9]">
            PRECISA DE ALGO MAIS AVANÇADO <br />
            <span className="text-[#25D366]">OU TEM ALGUMA PERGUNTA?</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Você precisa de uma pergunta? Você precisa de algo mais avançado? Me chame no WhatsApp. No WhatsApp vamos conversar um pouco sobre a sua carreira.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/5522992824984?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20e%20conversar%20um%20pouco%20sobre%20minha%20carreira." 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bebas text-2xl tracking-wider uppercase rounded-full transition-all shadow-[0_0_35px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(37,211,102,0.5)] flex items-center gap-3 group"
            >
              <MessageSquare size={22} className="fill-black text-black group-hover:scale-110 transition-transform" />
              <span>Me Chame no WhatsApp</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 pt-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>(22) 99282-4984 • Atendimento direto no WhatsApp</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO 10 — FOOTER & MARQUEE KEYWORDS
          ========================================================================= */}
      <footer className="bg-[#020202] border-t border-white/10">
        
        {/* Marquee de Palavras-Chave */}
        <Marquee speed="30s" className="py-4 bg-black border-b border-white/10">
          {MARQUEE_KEYWORDS.map((word, i) => (
            <div key={i} className="mx-6 flex items-center gap-4">
              <span className="font-bebas text-lg md:text-xl text-zinc-400 uppercase tracking-widest hover:text-cyan-400 transition-colors">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
            </div>
          ))}
        </Marquee>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12 text-center md:text-left">
            
            <div className="space-y-3">
              <Logo />
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                Plataforma e treinamento intensivo de cinema, direção de cena e pipeline híbrido de IA generativa com 3D.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center md:items-start">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Atendimento</span>
                <p>
                  <a 
                    href="https://wa.me/5522992824984" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare size={14} className="text-cyan-400" />
                    <span>WhatsApp: (22) 99282-4984</span>
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">Redes Oficiais</span>
                <div className="flex gap-4 items-center">
                  <a 
                    href="https://www.instagram.com/__theferreira/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center hover:text-cyan-400 transition-colors"
                    title="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="https://www.youtube.com/@FelipeBenchCanal" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center hover:text-cyan-400 transition-colors"
                    title="YouTube"
                  >
                    <Youtube size={16} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Oficial */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[11px] text-zinc-400 font-mono">
            <p>© 2026 CINEMA COM IA</p>
            <p className="text-zinc-400">Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Vídeo Interativo dos Alunos */}
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>
    </div>
  );
}

// Alias for backwards-compatibility with existing routes
const WorkshopPage = CinemaComAIPage;

// --- Novas Páginas (Exemplos) ---
const MentoriaRupturaPage = () => {
  React.useEffect(() => {
    document.title = "Mentoria Ruptura | Felipe Bench";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] font-dm selection:bg-[#00e5ff] selection:text-black antialiased relative overflow-hidden">
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[1000] opacity-30 mix-blend-soft-light">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")` 
          }}
        />
      </div>

      <div className="max-w-[720px] mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section className="pt-20 pb-8 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#00e5ff] mb-5"
          >
            Programas de Mentoria — Felipe Bench
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(52px,10vw,88px)] leading-[0.95] tracking-[0.02em] mb-6 uppercase"
          >
            MEUS PROGRAMAS<br />DE <span className="text-[#00e5ff]">MENTORIA</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg font-light text-[#aaa] max-w-[520px] mx-auto leading-[1.7]"
          >
            Você já tem o conhecimento.<br />
            Falta transformar isso em <strong className="text-[#f5f5f0] font-medium italic">cliente, projeto</strong> e <strong className="text-[#f5f5f0] font-medium italic">dinheiro na conta.</strong>
          </motion.p>
        </section>

        <hr className="border-t border-[#222] mt-4 mb-10 md:mb-16" />

        {/* PROBLEMA */}
        <div className="mb-12 md:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-5"
          >
            O problema que você evita olhar
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(32px,6vw,48px)] tracking-[0.03em] mb-4 leading-[1.05] uppercase"
          >
            VOCÊ JÁ SABE.<br />O MERCADO NÃO SABE DISSO.
          </motion.h2>
          <div className="space-y-4 text-base font-light text-[#bbb] leading-[1.8]">
            <p>Você trabalha com IA. Entrega resultado. Seu cliente volta, indica, elogia.</p>
            <p>Mas no fim do mês, o número na conta não reflete o que você sabe fazer.</p>
            <p>
              Não é falta de habilidade. É falta de <span className="text-[#00e5ff] font-normal">posicionamento, precificação e fechamento.</span> Tem gente com metade do seu conhecimento faturando três vezes mais — porque sabe aparecer, sabe cobrar e sabe fechar.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border-l-[3px] border-[#00e5ff] p-5 md:p-6 my-8 bg-[#00e5ff]/[0.03]"
            >
              <p className="text-lg italic text-[#f5f5f0] leading-[1.6]">
                "O problema não é o que você sabe. É o que você não está convertendo em dinheiro."
              </p>
            </motion.div>

            <p>
              Em 2026, o mercado de IA está cheio de gente que <strong className="text-white font-medium italic">sabe usar a ferramenta.</strong> O que separa quem fatura de quem fica estagnado é uma coisa só: <span className="text-[#00e5ff] font-normal">quem construiu uma operação real em cima disso.</span>
            </p>
            <p>Criei dois programas para resolver exatamente isso.</p>
          </div>
        </div>

        <hr className="border-t border-[#222] my-10 md:my-16" />

        {/* OS PROGRAMAS */}
        <div className="mb-12 md:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-5"
          >
            Os programas
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(44px,8vw,56px)] tracking-[0.03em] mb-4 uppercase"
          >
            RUPTURA
          </motion.h2>
          <p className="text-base font-light text-[#bbb] mb-10 italic">
            Dois modelos de acompanhamento. Uma única entrega: <span className="text-[#00e5ff] font-normal">sua carreira em IA funcionando como operação.</span>
          </p>

          <div className="grid md:grid-cols-2 gap-x-4 gap-y-12">
            {/* GRUPO */}
            <div className="flex flex-col">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] h-24 mb-3 rounded-[4px] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.imgur.com/sNn9HZo.png" 
                  alt="Ruptura Coletiva Logo" 
                  className="w-full h-full object-cover opacity-60" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                whileHover={{ borderColor: "#444" }}
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[4px] p-7 relative group transition-colors flex-1"
              >
                <div className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-[#888] bg-white/[0.05] px-2 py-1 rounded-[2px] uppercase">GRUPO</div>
                <p className="font-bebas text-3xl tracking-wider mb-1 leading-none uppercase">RUPTURA<br />COLETIVA</p>
                <span className="inline-block text-[10px] tracking-widest uppercase text-[#888] border border-[#333] px-2.5 py-1 rounded-[2px] mb-4 italic">3 meses</span>
                <div className="text-[11px] tracking-widest uppercase mb-5">
                  <span className="text-[#888] line-through mr-3">20 vagas</span>
                  <span className="text-[#00e5ff] font-medium animate-pulse">16 restando</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Encontros quinzenais ao vivo via Zoom",
                    "Microfone aberto — você fala, traz seu caso",
                    "Análise individual da sua carreira em cada sessão",
                    "Grupo fechado — não entra ninguém no meio do ciclo",
                    "Foco total em fechamento de projetos",
                    "O que um aprende, o grupo inteiro absorve"
                  ].map((item, i) => (
                    <li key={i} className="text-[13px] font-light text-[#999] border-b border-[#222] pb-2 flex gap-2.5 last:border-0">
                      <span className="text-[#00e5ff] shrink-0">—</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* INDIVIDUAL */}
            <div className="flex flex-col">
              <div className="bg-[#1a1a1a] border border-[#00e5ff]/20 h-24 mb-3 rounded-[4px] flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.imgur.com/8koPlhI.png" 
                  alt="Ruptura Individual Logo" 
                  className="w-full h-full object-cover opacity-80" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div 
                whileHover={{ borderColor: "#444" }}
                className="bg-[#1a1a1a] border border-[#00e5ff] rounded-[4px] p-7 relative group transition-colors shadow-[0_0_30px_rgba(0,229,255,0.05)] flex-1"
              >
                <div className="absolute top-3 right-3 text-[9px] font-medium tracking-[0.15em] text-[#00e5ff] bg-[#00e5ff]/[0.1] px-2 py-1 rounded-[2px] uppercase">INDIVIDUAL</div>
                <p className="font-bebas text-3xl tracking-wider mb-1 leading-none uppercase">RUPTURA<br />INDIVIDUAL</p>
                <span className="inline-block text-[10px] tracking-widest uppercase text-[#888] border border-[#333] px-2.5 py-1 rounded-[2px] mb-4 italic">3 meses</span>
                <div className="text-[11px] tracking-widest uppercase mb-5">
                  <span className="text-[#888] line-through mr-3">3 vagas</span>
                  <span className="text-[#00e5ff] font-medium animate-pulse">1 restando</span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Acesso direto a mim, livre demanda",
                    "Análise e fechamento de clientes ao vivo",
                    "Revisão de propostas antes de você enviar",
                    "Estratégia de precificação personalizada",
                    "Construção de perfil e posicionamento",
                    "WhatsApp + Zoom, sem hora marcada obrigatória"
                  ].map((item, i) => (
                    <li key={i} className="text-[13px] font-light text-[#999] border-b border-[#222] pb-2 flex gap-2.5 last:border-0">
                      <span className="text-[#00e5ff] shrink-0">—</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

        </div>

        <hr className="border-t border-[#222] my-10 md:my-16" />

        {/* O QUE É ENTREGUE */}
        <div className="mb-12 md:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-5"
          >
            O que você constrói aqui dentro
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(32px,6vw,48px)] tracking-[0.03em] mb-4 uppercase leading-none"
          >
            ISSO NÃO É<br />MAIS UM CURSO.
          </motion.h2>
          <div className="space-y-4 text-base font-light text-[#bbb] leading-[1.8]">
            <p>
              Não tem slide, não tem módulo que você nunca termina, não tem grupo de WhatsApp com 500 pessoas mandando gif de motivação.
            </p>
            <p>
              É acompanhamento real, com <strong className="text-white font-medium italic">análise do seu caso, do seu mercado, dos seus clientes.</strong>
            </p>
            <p>Se você entrar e executar, sai com tudo isso funcionando:</p>

            <ul className="mt-8 space-y-0 text-sm font-light">
              {[
                { bold: "Posicionamento que vende sozinho.", text: "Você para de se explicar e começa a ser escolhido." },
                { bold: "Precificação sem medo.", text: "Saber exatamente quanto cobrar, como justificar e como defender o preço." },
                { bold: "Fechamento de clientes.", text: "O script, a lógica, a abordagem — trabalhados no seu caso real." },
                { bold: "Proposta que converte.", text: "Revisão direta antes de você enviar, com feedback específico." },
                { bold: "Marca pessoal em IA que atrai projeto.", text: "Perfil, narrativa e conteúdo alinhados com o que você quer vender." },
                { bold: "Uma operação, não um freela.", text: "Caixa previsível, cliente recorrente, agenda no controle." }
              ].map((item, i) => (
                <li key={i} className="py-2.5 border-b border-[#1e1e1e] flex gap-3 items-start last:border-0 leading-relaxed">
                  <span className="text-[#00e5ff] mt-0.5">→</span>
                  <span><strong className="text-white font-medium">{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-[#222] my-10 md:my-16" />

        {/* PARA QUEM É / NÃO É */}
        <div className="mb-12 md:mb-20 space-y-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-5"
          >
            Para quem é
          </motion.p>
          
          <div className="bg-[#1a1a1a] border border-[#222] rounded-[4px] p-8">
            <h3 className="font-bebas text-[22px] tracking-wider mb-5 uppercase text-white">PARA QUEM É</h3>
            <ul className="space-y-0">
              {[
                "Você trabalha com IA — produção de vídeo, conteúdo, automação — e trava na hora de cobrar o que vale.",
                "Você fecha projeto, entrega bem, mas vive começando do zero todo mês.",
                "Você sabe que está abaixo do seu potencial e está cansado de saber disso.",
                "Você quer construir uma carreira real em IA, não depender de um emprego ou de um único cliente grande.",
                "Você está pronto para executar — não precisa de mais conteúdo, precisa de direção."
              ].map((item, i) => (
                <li key={i} className="py-2.5 border-b border-[#1e1e1e] flex gap-3 items-start text-[14px] font-light text-[#bbb] last:border-0 leading-relaxed">
                  <span className="text-[#00e5ff] mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#222] rounded-[4px] p-6">
            <h3 className="font-bebas text-xl tracking-wider mb-4 uppercase text-[#888]">PARA QUEM NÃO É</h3>
            <ul className="space-y-0">
              {[
                "Quem ainda não tem nenhuma experiência prática com IA",
                "Quem busca motivação, atalho ou fórmula mágica",
                "Quem não está disposto a agir entre os encontros"
              ].map((item, i) => (
                <li key={i} className="py-2.5 border-b border-[#1a1a1a] flex gap-3 items-start text-[14px] font-light text-[#666] last:border-0 leading-tight">
                  <span className="text-[#444] mt-0.5">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-[#222] my-10 md:my-16" id="investimento" />

        {/* INVESTIMENTO (bottom section with boxes/links) */}
        <div className="mb-12 md:mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888] mb-5"
          >
            Invista no seu próximo nível
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bebas text-[clamp(44px,8vw,56px)] tracking-[0.03em] mb-10 uppercase text-center"
          >
            INVESTIMENTO
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GRUPO BOTTOM */}
            <motion.div 
              whileHover={{ borderColor: "#444" }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-[4px] p-8 relative flex flex-col justify-between"
            >
              <div>
                <p className="font-bebas text-3xl tracking-wider mb-1 leading-none uppercase">RUPTURA<br />COLETIVA</p>
                <div className="text-[11px] tracking-widest uppercase mb-8 flex gap-3">
                  <span className="text-[#888] line-through">20 vagas</span>
                  <span className="text-[#00e5ff] font-medium">16 restando</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#222]">
                <span className="text-4xl font-bebas text-white block mb-6 italic tracking-wider">R$ 997,00</span>
                <a 
                  href="https://pay.hotmart.com/S105755446Y" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full py-4 bg-[#00e5ff] text-black text-center font-bebas text-lg tracking-[0.08em] uppercase rounded-[2px] transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_10px_20px_rgba(0,229,255,0.1)]"
                >
                  QUERO UMA VAGA
                </a>
              </div>
            </motion.div>

            {/* INDIVIDUAL BOTTOM */}
            <motion.div 
              whileHover={{ borderColor: "#444" }}
              className="bg-[#1a1a1a] border border-[#00e5ff] rounded-[4px] p-8 relative flex flex-col justify-between shadow-[0_0_40px_rgba(0,229,255,0.07)]"
            >
              <div>
                <p className="font-bebas text-3xl tracking-wider mb-1 leading-none uppercase">RUPTURA<br />INDIVIDUAL</p>
                <div className="text-[11px] tracking-widest uppercase mb-8 flex gap-3">
                  <span className="text-[#888] line-through">3 vagas</span>
                  <span className="text-[#00e5ff] font-medium">1 restando</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#222]">
                <span className="text-4xl font-bebas text-white block mb-6 italic tracking-wider">R$ 3.500,00</span>
                <a 
                  href="https://pay.hotmart.com/H105755158P" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full py-4 bg-[#00e5ff] text-black text-center font-bebas text-lg tracking-[0.08em] uppercase rounded-[2px] transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_10px_30px_rgba(0,229,255,0.2)]"
                >
                  GARANTIR EXCLUSIVIDADE
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <hr className="border-t border-[#222] my-10 md:my-16" />

        {/* COMO ENTRAR */}
        <div className="mb-20">
          <div className="bg-[#00e5ff]/[0.04] border border-[#00e5ff]/[0.15] rounded-[4px] p-8 mb-10">
            <h3 className="font-bebas text-2xl tracking-wider mb-4 uppercase text-white">QUERO ENTRAR, MAS TENHO DÚVIDA</h3>
            <div className="text-[15px] font-light text-[#aaa] leading-[1.8] space-y-3">
              <p>Me chama no WhatsApp. Eu analiso o seu caso pessoalmente e explico qual dos dois programas faz mais sentido para onde você está agora.</p>
              <p>
                <strong className="text-white font-medium italic">Sem call de vendas. Sem follow-up. Sem time comercial.</strong><br />
                Eu vou falar com você diretamente.
              </p>
              <p>Clique abaixo só se você tem interesse real, tem caixa disponível e está pronto para tomar a decisão.</p>
            </div>
          </div>

          <div className="text-center pb-10">
            <a 
              href="https://wa.me/5522992824984?text=Oi%20Felipe,%20quero%20entrar%20na%20mentoria%20mas%20estou%20com%20d%C3%BAvidas." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-[#00e5ff] text-black font-bebas text-lg tracking-[0.08em] px-12 py-5 rounded-[2px] uppercase transition-all hover:opacity-90 hover:translate-y-[-1px] shadow-[0_10px_30px_rgba(0,229,255,0.2)]"
            >
              QUERO ENTRAR
            </a>
            <br />
            <a href="#/mentoria-ruptura" className="inline-block mt-4 text-[#888] text-[13px] font-light border-b border-[#333] pb-0.5 hover:text-white hover:border-[#666] transition-colors leading-none tracking-tight">
               ver os programas novamente
            </a>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] py-8 text-center bg-[#0a0a0a] relative z-10">
        <p className="text-[11px] text-[#444] tracking-[0.05em] uppercase font-medium">
          © 2026 — Bench Park · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};


// --- Gringo.exe Sales Page ---
const GringoExePage = () => {
  React.useEffect(() => {
    document.title = "Gringo.exe";
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f0] font-sans antialiased selection:bg-[#DFB956] selection:text-black relative">
       {/* Top grid background */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
       
       {/* Background ambient glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DFB956]/5 rounded-full blur-[120px] pointer-events-none" />

       {/* HEADER/TICKER */}
       <div className="border-b border-[#222] bg-black/60 backdrop-blur-md sticky top-0 z-[50]">
         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <div className="flex items-center gap-2 font-mono text-sm tracking-tight">
             <Terminal size={14} className="text-[#DFB956]" />
             <span className="font-bold text-white uppercase tracking-wider">GRINGO.EXE</span>
             <span className="text-[#666] hidden sm:inline">- v1.0.4_stable</span>
           </div>
           <div className="flex items-center gap-4">
             <span className="hidden md:inline text-xs text-[#aaa] font-semibold tracking-wider font-mono uppercase bg-zinc-900 px-3 py-1 border border-zinc-800 rounded">
               Status: [ ONLINE & PRONTO_PARA_EXECUTAR ]
             </span>
             <a 
               href="#checkout-gringo" 
                onClick={(e) => { e.preventDefault(); document.getElementById('checkout-gringo')?.scrollIntoView({ behavior: 'smooth' }); }} 
               className="bg-[#DFB956] text-black font-black uppercase text-[10px] sm:text-xs tracking-wider px-4 py-2 hover:bg-[#eec66c] transition-colors rounded-[2px]"
             >
               Executar o Método
             </a>
           </div>
         </div>
       </div>

       {/* SEÇÃO 01 — HERO */}
       <section className="relative px-6 pt-12 md:pt-20 pb-8 overflow-hidden">
         <div className="max-w-4xl mx-auto text-center relative z-10">
           
           <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DFB956]/10 border border-[#DFB956]/20 rounded-sm mb-8 font-mono text-xs text-[#DFB956] tracking-widest uppercase">
             <span>SÉRIE ESPECIAL .EXE PARA ARTISTAS, CRIATIVOS & CREATORS</span>
           </div>

           {/* BIG MAIN TITLE */}
           <h1 className="text-6xl sm:text-7xl md:text-[110px] font-black tracking-tighter leading-[0.85] text-white uppercase italic mb-8 select-none">
             GRINGO<span className="text-[#DFB956] font-mono">.exe</span>
           </h1>

           {/* SUBHEAD HOOK (white callout) */}
           <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-800/80 rounded-[4px] p-6 mb-8 text-center shadow-2xl">
             <p className="text-lg md:text-2xl font-bold tracking-tight text-white leading-normal uppercase">
               Execute o método. Feche o trampo. Receba em dólar.
             </p>
           </div>

           {/* SUBHEADLINE (short text explanation) */}
           <div className="max-w-2xl mx-auto mb-12 space-y-4">
             <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
               Você já tem o trabalho. Falta o método para vender para quem paga em dólar.
             </p>
             <p className="text-[#DFB956] text-xs md:text-sm font-bold uppercase tracking-widest font-mono bg-[#DFB956]/5 border border-[#DFB956]/15 py-2 px-4 rounded inline-block">
               Uma masterclass de 3 horas — gravada, vitalícia, direto ao ponto.
             </p>
           </div>

           {/* CTA BUTTON */}
           <div className="max-w-md mx-auto mb-4">
             <a 
               href="#checkout-gringo"
                onClick={(e) => { e.preventDefault(); document.getElementById('checkout-gringo')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="block w-full py-5 bg-[#DFB956] hover:bg-[#eec66c] text-black font-black uppercase text-sm sm:text-base tracking-[0.2em] transition-all hover:scale-[1.01] rounded-[4px] shadow-[0_20px_50px_rgba(223,185,86,0.15)] text-center cursor-pointer"
             >
               [ QUERO EXECUTAR O GRINGO.EXE ]
             </a>
           </div>

                       {/* UNDER CARD DETAILS */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[#666] font-mono text-[10px] md:text-xs uppercase tracking-wider mb-4 animate-pulse">
              <span>Aula completa de 3H</span>
              <span>•</span>
              <span>Acesso Vitalício + Gravação Completa</span>
            </div>
         </div>
       </section>

       {/* SEÇÃO 02 — O PROBLEMA */}
       <section className="py-12 md:py-14 px-6 bg-black border-t border-[#111]">
         <div className="max-w-3xl mx-auto">
           {/* Alert Card Box */}
           <div className="p-8 md:p-12 bg-zinc-950/40 border border-[#d14b4b]/20 hover:border-[#d14b4b]/40 rounded-xl relative overflow-hidden transition-all duration-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#d14b4b]/5 rounded-full blur-3xl pointer-events-none" />
             
             <div className="space-y-6 md:space-y-8 text-center text-zinc-300 font-medium flex flex-col items-center">
               <p className="text-lg md:text-xl leading-relaxed">
                 Você tenta vender para gringo, cria perfil no Upwork, bota preço baixo pra competir — <strong className="text-white">e não fecha nada.</strong>
               </p>
               
               <p className="text-lg md:text-xl leading-relaxed">
                 Ou pior: fecha um trampo, recebe uma vez, e <strong className="text-white">não sabe como repetir.</strong>
               </p>

               <div className="pt-6 border-t border-zinc-900/60 w-full flex flex-col items-center justify-center gap-4 text-center">
                 <p className="text-[#d14b4b] font-black text-xl italic uppercase tracking-tight">
                   O problema não é o seu trabalho. É que você não tem um sistema.
                 </p>
                 <span className="font-mono text-[10px] text-zinc-600 uppercase bg-zinc-900/60 px-3 py-1 rounded">BLOCKING_ERROR</span>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* SEÇÃO 03 — A VIRADA */}
       <section className="py-12 md:py-16 px-6 relative bg-zinc-950 border-t border-b border-[#111] overflow-hidden">
         <div className="absolute inset-0 bg-[#DFB956]/[0.01] pointer-events-none" />
         <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
           <div className="py-4">
             <h2 className="text-2xl sm:text-3xl md:text-5xl font-black italic tracking-tight text-white leading-tight uppercase px-4">
               "O mercado internacional não é mais difícil. <span className="text-[#DFB956]">É diferente</span>. 
               <br />
               E diferente tem método."
             </h2>
           </div>
         </div>
       </section>

       {/* SEÇÃO 04 — O QUE É O GRINGO.EXE */}
       <section className="py-12 md:py-14 px-6 bg-black">
         <div className="max-w-4xl mx-auto">
           <div className="p-8 md:p-14 bg-zinc-950 border border-zinc-900 rounded-[24px] relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#DFB956]/5 rounded-full blur-3xl pointer-events-none" />
             
             <div className="space-y-8 text-zinc-300 font-medium">
               <div className="flex items-center gap-3">
                 <Terminal className="text-[#DFB956]" size={20} />
                 <h3 className="font-mono font-bold text-white uppercase tracking-wider text-sm">GringoCore_Service_Module</h3>
               </div>
               
               <p className="text-lg md:text-2xl leading-relaxed text-white font-bold">
                 <strong className="text-[#DFB956] underline underline-offset-4 decoration-2">gringo.exe</strong> é uma masterclass completa de 3H para freelancers criativos brasileiros que querem fechar clientes internacionais — videomakers, editores, criadores de conteúdo, social media, motion designers.
               </p>
               
               <p className="text-base md:text-lg leading-relaxed text-zinc-400">
                 Você aprende onde estão os clientes, como chegar até eles, como propor em inglês sem ser fluente, como fechar, assinar e receber. <span className="text-[#DFB956]">Tudo em uma sessão. Tudo com sistema.</span>
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* SEÇÃO 05 — IA.CORE */}
       <section id="iacore" className="py-12 md:py-14 px-6 bg-zinc-950 border-t border-b border-[#111] relative">
         <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mt-4">
               IA.core
             </h2>
             <p className="text-[#DFB956] text-xs font-mono font-bold uppercase tracking-widest mt-2">
               A IA NÃO É O PRODUTO. É A VANTAGEM COMPETITIVA.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mb-16">
             <div className="p-8 bg-zinc-900/40 border border-zinc-800/70 rounded-2xl flex flex-col justify-between">
               <div>
                 <span className="text-[#d14b4b] font-mono text-[10px] uppercase font-bold tracking-wider block mb-3"># Realidade Do Mercado</span>
                 <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-semibold">
                   A maioria dos freelancers brasileiros ainda prospecta no manual — mensagem por mensagem, proposta do zero, portfólio estático.
                 </p>
               </div>
               <span className="font-mono text-zinc-600 text-[10px] uppercase tracking-tight mt-6 block border-t border-zinc-900/40 pt-4">Processo MANUAL (Desatualizado)</span>
             </div>

             <div className="p-8 bg-black border border-[#DFB956]/10 rounded-2xl flex flex-col justify-between shadow-[0_10px_30px_rgba(223,185,86,0.02)]">
               <div>
                 <span className="text-[#DFB956] font-mono text-[10px] uppercase font-bold tracking-wider block mb-3"># Engine Gringo.exe</span>
                 <p className="text-white text-sm md:text-base leading-relaxed font-semibold">
                   No Gringo.exe você aprende a usar IA do jeito que profissionais de alto nível já usam: para criar, prospectar e fechar mais rápido — com mais qualidade e menos esforço.
                 </p>
               </div>
               <span className="font-mono text-[#DFB956] text-[10px] uppercase tracking-tight mt-6 block border-t border-zinc-900 pt-4">Processo GRINGO.EXE (Escalável & Inteligente)</span>
             </div>
           </div>

           {/* WHAT YOU WILL LEARN WITH IA */}
           <div className="space-y-4 max-w-4xl mx-auto">
             <h3 className="font-mono text-center font-bold text-white uppercase text-xs tracking-wider mb-6">
               O QUE VOCÊ VAI APRENDER A FAZER COM IA:
             </h3>

             <div className="divide-y divide-zinc-900 border-y border-zinc-900 bg-black rounded-lg overflow-hidden">
               {[
                 { action: "→ Pesquisa de clientes", desc: "Mapear empresas e criadores internacionais que contratam o seu perfil" },
                 { action: "→ DNA de marca", desc: "Analisar o trabalho do cliente antes de abrir conversa e usar isso na abordagem" },
                 { action: "→ Proposta personalizada", desc: "Gerar propostas em inglês adaptadas ao contexto de cada cliente em minutos" },
                 { action: "→ Revisão de comunicação", desc: "Escrever e-mails, follow-ups e mensagens profissionais sem depender de inglês fluente" },
                 { action: "→ Criação de portfólio", desc: "Estruturar como apresentar seu trabalho para o mercado internacional" }
               ].map((item, idx) => (
                 <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-zinc-900/40 transition-colors gap-2 text-left">
                   <span className="font-mono text-sm font-bold text-[#DFB956]">{item.action}</span>
                   <span className="text-zinc-400 text-xs md:text-sm">{item.desc}</span>
                 </div>
               ))}
             </div>
           </div>

           {/* IA SEÇÃO FINISH */}
           <div className="max-w-2xl mx-auto text-center mt-12 bg-zinc-900/40 p-6 rounded-lg border border-zinc-800">
             <p className="text-sm md:text-base text-zinc-300 font-bold italic">
               "O gringo não sabe que você usou IA. Ele só sabe que você pareceu mais profissional que os outros."
             </p>
           </div>
         </div>
       </section>

       {/* SEÇÃO 06 — O QUE VOCÊ INSTALA */}
       <section className="py-12 md:py-14 px-6 bg-black relative">
         <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mt-4">
               O que você instala
             </h2>
             <p className="text-zinc-500 font-mono text-[10px] uppercase mt-2">
               Entregáveis com nomes exclusivos do universo .exe
             </p>
           </div>

           {/* DIRECTORY LIST - TABLE */}
           <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
             <div className="p-4 bg-zinc-900/40 border-b border-zinc-900 flex justify-between items-center px-6">
               <span className="font-mono text-xs text-[#aaa] font-bold">DIRECTORY: C:/Gringo_System/Install_Files</span>
               <span className="font-mono text-[10px] text-zinc-600 bg-black px-2 py-0.5 rounded">6 FILES FOUND</span>
             </div>

             <div className="divide-y divide-zinc-900">
               {[
                 { file: "Gringo.exe", tag: "MASTERCLASS", desc: "A masterclass de 3H com acesso vitalício" },
                 { file: "Proposal.exe", tag: "IA AGENT", desc: "Agente de IA que gera sua proposta em inglês em menos de 3 minutos. Você preenche em português. Ele entrega pronto para enviar." },
                 { file: "Contract.protocol", tag: "PROTOCOL", desc: "Template de contrato profissional em inglês. Editável. Pronto para assinar digitalmente no mesmo dia." },
                 { file: "Dollar.config", tag: "CONFIG", desc: "Planilha que calcula quanto você deve cobrar em dólar com base no seu custo de vida, câmbio atual e tipo de projeto." },
                 { file: "Outreach.bat", tag: "BATCH SCRIPT", desc: "Scripts de abordagem prontos para LinkedIn e Instagram. Cold messages que geram resposta." },
                 { file: "Gringo.protocol", tag: "PDF MAP", desc: "PDF entregue na compra — antes da aula. O mapa completo do sistema: mindset, mercado, linguagem e ferramentas. Execute antes de instalar." }
               ].map((item, idx) => (
                 <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between hover:bg-zinc-900/30 transition-colors gap-4 text-left">
                   <div className="md:w-1/3 flex items-start gap-4">
                     <div className="w-10 h-10 bg-[#DFB956]/10 border border-[#DFB956]/20 rounded flex items-center justify-center text-[#DFB956] shrink-0">
                       <FileText size={18} />
                     </div>
                     <div>
                       <h4 className="font-mono text-lg font-bold text-[#DFB956]">{item.file}</h4>
                       <span className="font-mono text-[9px] text-[#aaa] bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded uppercase font-semibold">{item.tag}</span>
                     </div>
                   </div>
                   <div className="md:w-2/3">
                     <p className="text-zinc-350 text-sm leading-relaxed font-medium">{item.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </section>

       {/* SEÇÃO 07 — PARA QUEM É */}
       <section className="py-12 md:py-14 px-6 bg-zinc-950 border-t border-b border-[#111]">
         <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mt-4">
               INCLUSÃO E EXCLUSÃO CLARAS
             </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
             {/* SIM CARD */}
             <div className="p-8 bg-black border border-[#DFB956]/20 rounded-2xl flex flex-col justify-between text-left">
               <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFB956]/10 border border-[#DFB956]/30 text-[#DFB956] rounded-full mb-6 font-mono text-xs font-bold uppercase">
                   <Check size={14} />
                   <span>✓ É PRA VOCÊ SE...</span>
                 </div>

                 <ul className="space-y-4 text-zinc-300 text-sm font-medium">
                   <li className="flex items-start gap-3">
                     <span className="text-[#DFB956] font-bold mt-0.5">•</span>
                     <span>Você produz qualquer coisa criativa no digital (vídeo, edição, motion, conteúdo, design, copy)</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-[#DFB956] font-bold mt-0.5">•</span>
                     <span>Você quer uma fonte de renda em dólar mas não sabe por onde começar</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-[#DFB956] font-bold mt-0.5">•</span>
                     <span>Você tentou e não fechou — e quer entender o que falhou</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-[#DFB956] font-bold mt-0.5">•</span>
                     <span>Você já fechou alguns trampos gringos e quer um sistema para escalar</span>
                   </li>
                 </ul>
               </div>
               
               <span className="font-mono text-zinc-650 text-[10px] uppercase block border-t border-zinc-900 pt-6 mt-8">VERIFICAÇÃO DE PERFIL: COMPATÍVEL</span>
             </div>

             {/* NÃO CARD */}
             <div className="p-8 bg-black border border-[#d14b4b]/20 rounded-2xl flex flex-col justify-between text-left">
               <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d14b4b]/10 border border-[#d14b4b]/30 text-[#d14b4b] rounded-full mb-6 font-mono text-xs font-bold uppercase">
                   <X size={14} />
                   <span>✗ NÃO É PRA VOCÊ SE...</span>
                 </div>

                 <ul className="space-y-4 text-zinc-300 text-sm font-medium">
                   <li className="flex items-start gap-3">
                     <span className="text-[#d14b4b] font-bold mt-0.5">•</span>
                     <span>Você quer fórmula mágica sem agir</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-[#d14b4b] font-bold mt-0.5">•</span>
                     <span>Você não tem nenhum produto criativo para vender</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <span className="text-[#d14b4b] font-bold mt-0.5">•</span>
                     <span>Você não está disposto a adaptar sua comunicação para um cliente estrangeiro</span>
                   </li>
                 </ul>
               </div>

               <span className="font-mono text-zinc-650 text-[10px] uppercase block border-t border-zinc-900 pt-6 mt-8">VERIFICAÇÃO DE PERFIL: INCOMPATÍVEL</span>
             </div>
           </div>
         </div>
       </section>

       {/* SEÇÃO 08 — SOCIAL.PROOF */}
       <section className="py-12 md:py-14 px-6 bg-black">
         <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mt-4">
               Quem já opera no sistema
             </h2>
           </div>

           {/* MESSAGES PRESET GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
             {[
               { id: "PRINT 1", user: "Thiago G. • Motion Designer", msg: "Consegui meu primeiro cliente gringo de motion design pelo LinkedIn! Fechei $1.500 no mês. A IA ajudou demais no e-mail de contato do DNA de Marca que você explicou." },
               { id: "PRINT 2", user: "Mariana L. • Editora", msg: "Rodei o Outreach.bat de manhã pra 10 criadores de conteúdo do YouTube US. 4 me responderam. Já agendei call com 2 deles pro fechamento. O sistema de prospecção do gringo é incrível!" },
               { id: "PRINT 3", user: "Lucas F. • Video Creator", msg: "O Proposal.exe salvou minha vida ontem. Em menos de 5 minutos gerei uma proposta pra um canal gringo de vlogs e o cara aceitou sem pestanejar!" },
               { id: "PRINT 4", user: "Vitor M. • Freelancer", msg: "Contrato com o Contract.protocol passou liso, assinado. Pagamento em dólar limpo direto na Payoneer. Sensacional!" },
               { id: "PRINT 5", user: "Renata S. • Artista 3D", msg: "Gente, fechei um contrato de artista 3D recebendo em dólar fixo mensal com o método. Sem falar inglês super fluente, só usei a IA de revisão e deu super certo!" }
             ].map((print, idx) => (
               <div key={idx} className="p-6 bg-zinc-950 border border-zinc-900 rounded-xl flex flex-col justify-between hover:border-zinc-800 transition-colors relative overflow-hidden text-left">
                 <div className="absolute top-0 right-0 p-2 text-[8px] font-mono font-bold text-[#666] bg-zinc-900 rounded-bl">{print.id}</div>
                 <div className="space-y-4">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full bg-[#DFB956]/10 border border-[#DFB956]/20 flex items-center justify-center text-[10px] font-bold text-[#DFB956]">
                       {print.user[0]}
                     </div>
                     <div>
                       <h5 className="text-xs font-bold text-white">{print.user}</h5>
                       <span className="text-[9px] text-[#666] font-mono uppercase">Membro Ativo</span>
                     </div>
                   </div>
                   <p className="text-xs md:text-sm text-zinc-400 font-medium leading-relaxed italic">
                     "{print.msg}"
                   </p>
                 </div>
                 <div className="mt-4 pt-4 border-t border-zinc-900/40 flex items-center justify-between text-[10px] font-mono text-zinc-650">
                   <span>Comments.approved</span>
                 </div>
               </div>
             ))}
             {/* Placeholder card explaining real conversion */}
             <div className="p-6 bg-[#DFB956]/5 border border-dashed border-[#DFB956]/30 rounded-xl flex flex-col justify-center items-center text-center gap-2">
               <Shield className="text-[#DFB956] mb-2" size={24} />
               <h5 className="font-mono text-xs font-bold text-[#DFB956] uppercase tracking-wider">ECOSSISTEMA INTEGRADO</h5>
               <p className="text-[11px] text-zinc-500 leading-relaxed font-semibold">
                 Comunidade de membros ativos ajudando uns aos outros a fechar, revisar e receber contratos em moeda forte.
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* SEÇÃO 09 — OFERTA + CTA */}
       <section id="checkout-gringo" className="py-12 md:py-16 px-6 bg-zinc-950 border-t border-[#111] relative overflow-hidden">
         {/* Background glow bottom */}
         <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#DFB956]/5 rounded-full blur-[140px] pointer-events-none" />

         <div className="max-w-4xl mx-auto text-center relative z-10">
           
           
           <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase mt-4 mb-2">
             GRINGO<span className="text-[#DFB956] font-mono">.exe</span>
           </h2>
           <p className="text-[#DFB956] text-xs font-mono font-bold uppercase tracking-widest bg-[#DFB956]/5 border border-[#DFB956]/15 inline-block py-1.5 px-3 rounded mb-12">
             MASTERCLASS COMPLETA DE 3H + ACESSO VITALÍCIO & ENTREGÁVEIS
           </p>

           {/* Price Tag Box */}
           <div className="max-w-md mx-auto p-10 bg-black border border-zinc-900 rounded-[32px] shadow-2xl relative mb-8">
             <div className="absolute top-4 right-4 bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider">
               OFERTA DE LANÇAMENTO
             </div>

             <div className="space-y-4 text-center">
                <span className="text-[#666] text-lg md:text-xl line-through tracking-wider block font-mono text-center">
                  De R$ 297,00
                </span>
               <div className="flex justify-center items-baseline gap-2">
                 <span className="text-lg text-zinc-400 font-mono">R$</span>
                 <span className="text-6xl md:text-7xl font-black italic tracking-[-0.05em] text-[#DFB956]">197</span>
               </div>
               <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block pt-2 border-t border-zinc-900">
                 Investimento Único · Sem mensalidades
               </span>
             </div>

             <div className="mt-8">
               <a 
                 href="https://pay.hotmart.com/Y106072864A?checkoutMode=10"
                 className="block w-full py-5 bg-[#DFB956] hover:bg-[#eec66c] text-black font-black uppercase tracking-[0.2em] rounded-xl text-xs sm:text-sm shadow-[0_15px_40px_rgba(223,185,86,0.15)] transition-all hover:scale-[1.02] cursor-pointer"
               >
                 [ EXECUTAR AGORA — R$ 197 ]
               </a>
             </div>

             <div className="mt-6 font-mono text-[10px] text-zinc-650 space-y-1">
               <p>Acesso instantâneo e vitalício à gravação e arquivos</p>
               <p>VITALÍCIO: Assista e use os arquivos quando e onde quiser</p>
             </div>
           </div>

           <a 
             href="#/" 
             className="inline-block text-[#666] hover:text-white font-mono text-xs uppercase tracking-wider transition-colors border-b border-zinc-805 pb-1 mt-6"
           >
             ← Voltar ao início do workshop
           </a>

         </div>
       </section>

       {/* FOOTER */}
       <footer className="border-t border-[#111] py-12 text-center bg-black relative z-10">
         <p className="text-[11px] text-zinc-600 tracking-[0.05em] uppercase font-mono">
           © 2026 — Gringo.exe · Bench Park · Todos os direitos reservados
         </p>
       </footer>

    </div>
  );
};


const NewPagePlaceholder = () => {
  React.useEffect(() => {
    document.title = "Página Exclusiva";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl bg-zinc-900/50 p-12 rounded-[40px] border border-white/5 backdrop-blur-3xl"
      >
        <h1 className="text-5xl font-black mb-6 tracking-tighter italic">PÁGINA EXCLUSIVA</h1>
        <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
          Este é um exemplo de como você pode criar um <span className="text-cyan-400 font-bold">subdiretório</span> totalmente novo. 
          Tudo que você editar neste componente aparecerá apenas nesta URL.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#/" className="px-8 py-4 bg-white text-black font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-cyan-400 transition-colors">Voltar Início</a>
          <a href="#/joao" className="px-8 py-4 bg-zinc-800 text-white font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-zinc-700 transition-colors">Ver Link João</a>
          <a href="#/hector" className="px-8 py-4 bg-zinc-800 text-white font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-zinc-700 transition-colors">Ver Link Hector</a>
        </div>
      </motion.div>
    </div>
  );
};

// --- Auxiliar de Navegação (Apenas para Desenvolvimento) ---
const DevNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // Mostra se for ambiente dev OU se tiver o parâmetro ?edit=true na URL
    if ((import.meta as any).env?.DEV || params.get('edit') === 'true') {
      setShouldShow(true);
    }
  }, []);
  
  if (!shouldShow) return null;
  
  return (
    <div className="fixed bottom-6 left-6 z-[100] font-sans">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all shadow-2xl"
      >
        {isOpen ? "FECHAR NAV" : "EXPLORAR PÁGINAS"}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, transform: "translateY(10px) scale(0.95)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(10px) scale(0.95)" }}
            className="absolute bottom-12 left-0 w-72 max-h-[80vh] flex flex-col bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest px-1">Navegador do Projeto</p>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                {AFFILIATES_LIST.length} Afiliados
              </span>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto pr-1">
              {/* Central de Afiliados */}
              <a 
                href="#/afiliados" 
                onClick={() => setIsOpen(false)} 
                className="p-3 bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg text-sm text-white flex flex-col transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Central de Afiliados ★</span>
                  <span className="text-[9px] font-mono bg-cyan-400 text-black px-1.5 py-0.2 rounded font-bold">NOVO</span>
                </div>
                <span className="text-[10px] text-cyan-200/70">Gerenciar todos os links</span>
              </a>

              <a href="#/" onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col">
                <span className="font-bold">Página Principal</span>
                <span className="text-[10px] text-zinc-500">/#/</span>
              </a>

              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider px-2 pt-2 pb-1">
                Páginas Individuais de Afiliados:
              </p>
              
              <div className="max-h-44 overflow-y-auto space-y-1 pr-1 border-l border-white/5 pl-2">
                {AFFILIATES_LIST.map((aff) => (
                  <a 
                    key={aff.id}
                    href={`#/${aff.id}`} 
                    onClick={() => setIsOpen(false)} 
                    className="p-2 hover:bg-white/5 rounded-md text-xs text-white flex items-center justify-between group"
                  >
                    <span className="font-medium group-hover:text-cyan-300 transition-colors">{aff.name}</span>
                    <span className="text-[9px] font-mono text-zinc-500">/{aff.id}</span>
                  </a>
                ))}
              </div>

              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider px-2 pt-3 pb-1 border-t border-white/5">
                Outros Projetos:
              </p>
              <a href="#/gringo.exe" onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/5 bg-[#DFB956]/5 border border-[#DFB956]/10 rounded-lg text-xs text-white flex flex-col">
                <span className="font-bold text-[#DFB956]">Gringo.exe 🌟</span>
                <span className="text-[10px] text-zinc-500">/#/gringo.exe</span>
              </a>
              <a href="#/mentoria-ruptura" onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/5 rounded-lg text-xs text-white flex flex-col">
                <span className="font-bold">Mentoria Ruptura</span>
                <span className="text-[10px] text-zinc-500">/#/mentoria-ruptura</span>
              </a>
            </div>
            <p className="mt-3 text-[9px] text-cyan-500/60 italic px-1 pt-2 border-t border-white/5">
              Clique para testar cada página de afiliado →
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Router Principal ---
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página Principal */}
        <Route path="/" element={<WorkshopPage />} />

        {/* Central e Catálogo Geral de Afiliados */}
        <Route path="/afiliados" element={<AffiliatesDirectoryPage />} />
        <Route path="/links" element={<AffiliatesDirectoryPage />} />
        <Route path="/links-afiliados" element={<AffiliatesDirectoryPage />} />
        
        {/* Novas Rotas Gringo.exe */}
        <Route path="/gringo" element={<GringoExePage />} />
        <Route path="/gringo.exe" element={<GringoExePage />} />
        
        {/* Nova Página de Mentoria Ruptura */}
        <Route path="/mentoria-ruptura" element={<MentoriaRupturaPage />} />

        {/* Duplicata para /workshop-cinema-ia */}
        <Route path="/workshop-cinema-ia" element={<WorkshopPage />} />

        {/* Exemplo de Página Nova em outro Subdiretório */}
        <Route path="/pagina/nova" element={<NewPagePlaceholder />} />

        {/* Rota Dinâmica de Afiliado (Subdiretório: ex /#/jose-carlos, /#/matheus-felipe, etc.) */}
        <Route path="/:affiliateId" element={<WorkshopPage />} />
      </Routes>
      
      {/* Navegador flutuante apenas para facilitar a edição */}
      <DevNav />
    </Router>
  );
}
