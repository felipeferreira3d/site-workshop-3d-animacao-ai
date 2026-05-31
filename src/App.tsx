/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { HashRouter as Router, Routes, Route, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ReactPlayer from "react-player";
import { 
  CheckCircle2, 
  Cpu, 
  Headphones, 
  Monitor, 
  Play, 
  Pause,
  Zap,
  Calendar,
  Mail,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Phone,
  Instagram,
  Youtube,
  VolumeX,
  Users,
  TrendingUp,
  Terminal,
  Download,
  Globe,
  Briefcase,
  Check,
  X,
  Shield,
  FileText
} from "lucide-react";

// --- Configuration & Constants ---

const AFFILIATE_LINKS: Record<string, string> = {
  "joao": "https://pay.hotmart.com/L105489426U?sck=HOTMART_PRODUCT_PAGE&off=mlgsu0ic&hotfeature=32&_gl=1*11s8iwq*_gcl_au*MTIzMjY4MDg2NS4xNzc3NDM1NTk2*FPAU*MTIzMjY4MDg2NS4xNzc3NDM1NTk2*_ga*MTc3MDM1MDE0MS4xNzUwNjQ0MTM4*_ga_GQH2V1F11Q*czE3NzgwODU3ODQkbzU2MCRnMSR0MTc3ODA4NTk3MyRqNTkkbDAkaDcwNzUxMjIyOQ..&bid=1778087392906",
  "hector": "https://pay.hotmart.com/P105490527D?sck=HOTMART_PRODUCT_PAGE&off=iu9mfsa8&hotfeature=32&_gl=1*1kcw6rk*_gcl_au*MTUxODkwNTM5MS4xNzc3MDQxNzA5*_ga*MTA3NzkxMDMwMy4xNzU3MzM1Nzcz*_ga_GQH2V1F11Q*czE3Nzk3MjE1MDIkbzcyJGcxJHQxNzc5NzIzMjc2JGo2MCRsMCRoNzA3NTQ5Nzgz",
  // Adicione novos afiliados aqui: "nome": "link_do_checkout"
};

const DEFAULT_CHECKOUT_LINK = "https://pay.hotmart.com/Y106072864A?checkoutMode=10";

// --- Components ---

const Marquee = ({ children, speed = "40s", className = "py-4 md:py-8" }: { children: React.ReactNode, speed?: string, className?: string }) => {
  return (
    <div className={`relative flex overflow-x-hidden border-y border-white/10 bg-black ${className}`}>
      <div className="whitespace-nowrap flex animate-marquee" style={{ animationDuration: speed }}>
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

const Logo = ({ className = "h-8 md:h-10" }: { className?: string }) => {
  const [error, setError] = React.useState(false);
  
  if (error) {
    return (
      <div className="flex flex-col items-start leading-none font-black uppercase italic tracking-tighter shrink-0 select-none">
        <span className="text-[6px] md:text-[8px] text-zinc-500 mb-0.5 tracking-[0.2em]">Workshop</span>
        <div className="flex items-center gap-1 text-[10px] md:text-lg">
           <span className="text-white">CINEMA &</span>
           <span className="text-cyan-400">ANIMAÇÃO 3D</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src="https://i.imgur.com/akhQQzp.png" 
      alt="Workshop Logo" 
      className={`${className} w-auto object-contain cursor-pointer`}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center mb-6">
    <span className="text-[12px] font-black tracking-[0.3em] uppercase text-cyan-400/80">
      {children}
    </span>
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-black/80">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center md:justify-between">
      <div className="flex items-center gap-1">
        <Logo />
      </div>
      <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
        <a href="#proposta" className="hover:text-white transition-colors">A Revolução</a>
        <a href="#plano" className="hover:text-white transition-colors">Conteúdo</a>
        <a href="#ferramentas" className="hover:text-white transition-colors">Ferramentas</a>
      </div>
    </div>
  </nav>
);

// --- Sections ---

function WorkshopPage() {
  const { affiliateId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [checkoutLink, setCheckoutLink] = React.useState(DEFAULT_CHECKOUT_LINK);
  
  // Lógica de Afiliados integrada com Router
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref')?.toLowerCase();
    
    // Agora usamos o affiliateId capturado pela rota dinâmica /:affiliateId
    // ou o parâmetro ?ref= no link normal
    const affiliateKey = refParam || affiliateId?.toLowerCase();
    
    if (affiliateKey && AFFILIATE_LINKS[affiliateKey]) {
      console.log(`Afiliado detectado: ${affiliateKey}`);
      setCheckoutLink(AFFILIATE_LINKS[affiliateKey]);
    } else {
      setCheckoutLink(DEFAULT_CHECKOUT_LINK);
    }
  }, [affiliateId]);
  
  // Lógica de Vendas Automática (80h por lote) - Sincronizada Globalmente
  const [salesData, setSalesData] = React.useState({ progress: 75, lot: 3 });

  React.useEffect(() => {
    const EIGHTY_HOURS_MS = 80 * 60 * 60 * 1000;
    // Data de referência recalculada para que em 02/05 as 22:16 o lote seja 3 com 75% (220h decorridas)
    const BASE_START_TIME = new Date("2026-04-23T18:16:46Z").getTime();
    
    const updateProgress = () => {
      const now = Date.now();
      const diff = now - BASE_START_TIME;
      
      // Quantos lotes de 80h já se passaram desde a data base
      const lotIndex = Math.floor(diff / EIGHTY_HOURS_MS);
      const currentLot = 1 + lotIndex;
      
      // Progresso dentro do lote atual
      const timeInCurrentLot = diff % EIGHTY_HOURS_MS;
      let progress = (timeInCurrentLot / EIGHTY_HOURS_MS) * 100;

      // Se por algum motivo o cálculo der negativo (antes da data base), resetamos
      if (diff < 0) {
        setSalesData({ progress: 0, lot: 1 });
        return;
      }

      setSalesData({ 
        progress: Math.min(Math.max(progress, 0), 99.9),
        lot: currentLot 
      });
    };

    updateProgress();
    const timer = setInterval(updateProgress, 10000); 
    return () => clearInterval(timer);
  }, []);

  const handleVideoClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPaused(false);
      if (playerRef.current) {
        playerRef.current.seekTo(0);
      }
    } else {
      setIsPaused(prev => !prev);
    }
  };

  const Player = ReactPlayer as any;

  const toolLogos = [
    "https://i.imgur.com/e6VnIx1.png",
    "https://i.imgur.com/d6kDq3N.png",
    "https://i.imgur.com/ZeFeklB.png",
    "https://i.imgur.com/CopEyzX.png",
    "https://i.imgur.com/5T8YDpA.png",
    "https://i.imgur.com/AcH7T5x.png",
    "https://i.imgur.com/pFAfIjC.png",
    "https://i.imgur.com/FFH2of5.png",
    "https://i.imgur.com/lKV4OIv.png",
    "https://i.imgur.com/LHRtNPE.png",
    "https://i.imgur.com/TkMkyhF.png",
    "https://i.imgur.com/LvxUeZ8.png",
  ];

  const videos = [
    "https://i.imgur.com/nifwdjL.mp4",
    "https://i.imgur.com/CWvVZTZ.mp4",
    "https://i.imgur.com/0bhoa3c.mp4",
    "https://i.imgur.com/zOUAHo9.mp4",
    "https://i.imgur.com/ClkvkKC.mp4",
    "https://i.imgur.com/Y4WK1zY.mp4",
    "https://i.imgur.com/0boDPNw.mp4",
    "https://i.imgur.com/kAGA888.mp4",
    "https://i.imgur.com/TpzJ9nG.mp4",
    "https://i.imgur.com/CqlAlQ7.mp4",
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans selection:bg-cyan-500 selection:text-black antialiased">
      <Navbar />

      {/* SEÇÃO 1 — Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 lg:pt-32 pb-12 lg:pb-24 px-4 md:px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 scale-110">
          <img 
            src="https://i.imgur.com/2LHG5N2.jpg" 
            alt="Cinema background" 
            className="w-full h-full object-cover opacity-20 blur-md"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.3fr] gap-4 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left w-full lg:order-1"
            >
              <div className="mb-6 lg:mb-12 flex flex-col items-center lg:items-start gap-4">
                <SectionLabel>
                  Workshop Intensivo / Gravação
                </SectionLabel>

                <div className="flex items-center gap-3 md:gap-5">
                  <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-500" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-500" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-500" />
                    <div className="w-full h-full bg-cyan-500 flex items-center justify-center">
                      <Zap size={18} className="text-black fill-black" />
                    </div>
                  </div>
                  <div className="text-white text-[15px] md:text-[20px] font-black tracking-wider uppercase flex items-center gap-2 md:gap-3 whitespace-nowrap">
                    <span>10 HORAS DE CONTEÚDO PRÁTICO</span>
                  </div>
                </div>
              </div>
              <h1 className="text-[32px] md:text-5xl lg:text-[72px] font-black leading-[1] lg:leading-[0.9] tracking-[-0.04em] mb-4 lg:mb-8 uppercase italic">
                CINEMA, ANIMAÇÃO <br />
                <span className="text-cyan-400">E RENDA COM IA</span>
              </h1>
              <p className="text-[14px] md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4 lg:mb-10 font-medium opacity-90">
                Qualquer pessoa consegue. Você vai sair daqui criando vídeos de cinema com Inteligência Artificial e transformando isso em renda.
              </p>
            </motion.div>

            {/* Video Content - Order 2 on Mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group w-full order-2 lg:order-last"
            >
              <div className="aspect-video bg-zinc-900 border border-white/10 rounded-2xl lg:rounded-[40px] overflow-hidden relative shadow-2xl shadow-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-500">
                <div className="w-full h-full transition-all duration-700 blur-0 scale-100 opacity-100">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/mf8aIsWQbBQ?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=mf8aIsWQbBQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* CTA Content - Order 3 on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full order-3 lg:col-start-1 lg:row-start-2 lg:mt-[-80px]"
            >
              <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-8 mt-2 lg:mt-0">
                <a 
                  href="#inscricao" 
                  className="w-full sm:w-auto px-5 lg:px-8 py-2.5 lg:py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-[10px] lg:text-xs rounded-full transition-all shadow-[0_10px_30px_rgba(34,211,238,0.2)] hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                >
                  <span className="whitespace-nowrap">Comprar Workshop</span>
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee 1 */}
      <Marquee>
        {videos.map((src, idx) => (
          <div key={idx} className="mx-3 w-[250px] md:w-[320px] aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-neutral-900 transition-shadow hover:shadow-2xl hover:shadow-cyan-500/10">
            <video 
              src={src} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-80 transition-opacity hover:opacity-100" 
            />
          </div>
        ))}
      </Marquee>

      {/* SEÇÃO 2 — Proposta de Valor */}
      <section id="proposta" className="pt-6 md:pt-24 pb-10 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-24">
            <SectionLabel>A Revolução</SectionLabel>
            <h2 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic">
              PODER DE HOLLYWOOD <br /> AO SEU ALCANCE
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="grid sm:grid-cols-2 gap-4">
               {[
                { title: "Produção Pro", desc: "Crie vídeos profissionais do zero, sem precisar de equipamentos caros.", img: "https://i.imgur.com/POgHQw2.jpeg" },
                { title: "Seedance 2", desc: "Domine a ferramenta de IA que está mudando a forma de fazer vídeos no mundo.", img: "https://i.imgur.com/g4V7iCs.jpeg" },
                { title: "VFX Sem PC", desc: "Aplique efeitos visuais incríveis direto pelo navegador, sem instalar nada.", img: "https://i.imgur.com/p3aMCeB.jpeg" },
                { title: "Portfólio Elite", desc: "Monte uma vitrine de projetos que atrai clientes e gera contratos.", img: "https://i.imgur.com/hPfQWoE.jpeg" }
              ].map((item, i) => (
                <div key={i} className="relative aspect-square sm:aspect-auto p-8 rounded-3xl overflow-hidden bg-zinc-900/40 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center mb-6 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2 italic text-white">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900/20 border border-white/5 rounded-[40px] overflow-hidden p-8 flex items-center justify-center relative group min-h-[500px]">
              <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
              <video 
                src="https://i.imgur.com/wC7XKIR.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover rounded-2xl transition-all duration-700" 
              />
              <div className="absolute bottom-12 left-12 right-12 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl transition-all group-hover:translate-y-[-10px]">
                <p className="text-sm font-bold italic text-zinc-300">"A IA não vai substituir o diretor, ela vai permitir que o diretor tenha o poder de um estúdio inteiro."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — Plano de Aula */}
      <section id="plano" className="py-10 md:py-32 px-6 bg-neutral-900/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">
            <div>
              <SectionLabel>Conteúdo</SectionLabel>
              <h2 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter uppercase italic mb-5 lg:mb-10">
                PLANO <br /> DE <br /> <span className="text-cyan-400">AULA</span>
              </h2>
              <p className="text-zinc-500 text-xl font-medium max-w-sm leading-tight">
                Do zero ao nível profissional em apenas um dia intensivo explorando as fronteiras da Inteligência Artificial.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: "01", name: "Fundamentos e Making Of de Projetos Profissionais", desc: "Panorama do mercado e ferramentas essenciais", tools: ["IA Overview", "Prompting"] },
                { id: "02", name: "Criação", desc: "Mão na massa com prompts e fluxos de geração", tools: ["Seedance 2", "Kling 3", "Claude", "ChatGPT", "Vosy", "Freepik", "Core AI"] },
                { id: "03", name: "VFX & 3D", desc: "Efeitos cinematográficos e animações avançadas", tools: ["Runway", "Kling"] },
                { id: "04", name: "Mercado", desc: "Precificação, prospecção e montagem de portfólio", tools: ["Business", "Portfolio"] }
              ].map((modulo) => (
                <div key={modulo.id} className="group flex items-start gap-6 py-4 lg:py-8 border-b border-white/5 hover:border-cyan-500/20 transition-all">
                  <span className="text-2xl font-black text-zinc-800 group-hover:text-cyan-400/20 transition-colors italic shrink-0">{modulo.id}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 italic group-hover:text-cyan-400 transition-colors">{modulo.name}</h3>
                    <p className="text-zinc-500 text-sm font-medium mb-4">{modulo.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {modulo.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500">{t}</span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="text-zinc-800 group-hover:text-cyan-400 transition-colors mt-1" size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — Ferramentas */}
      <section id="ferramentas" className="py-10 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-end mb-12 lg:mb-24">
            <div className="lg:w-1/2">
              <SectionLabel>Elite Stack</SectionLabel>
              <h2 className="text-5xl md:text-[80px] font-black leading-[0.8] tracking-tighter uppercase italic">
                FERRAMENTAS <br />
                <span className="text-cyan-400">DE NOVA GERAÇÃO</span>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-zinc-500 text-lg font-medium max-w-md leading-relaxed mb-8">
                Domine as ferramentas que vão te ajudar a criar vídeos de nível profissional e que estão mudando a indústria do cinema, redes sociais e publicidade.
              </p>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-400/5 border border-cyan-400/20 rounded-full">
                <Zap className="text-cyan-400" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Toolkit Exclusivo Incluído</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: "Seedance 2", desc: "Geração e edição de vídeo com IA (principal)", img: "https://i.imgur.com/kiu1Evz.jpeg" },
              { name: "Runway ML", desc: "VFX e edição avançada com IA", img: "https://i.imgur.com/zSVD4Ss.jpeg" },
              { name: "ElevenLabs", desc: "Geração de áudio, narração e voz com IA", img: "https://i.imgur.com/iwue41j.jpeg" },
              { name: "Topaz Video AI", desc: "Upscaling e melhoria de qualidade de vídeo", img: "https://i.imgur.com/IvNb6Wk.jpeg" },
              { name: "CapCut", desc: "Edição final e montagem dos vídeos", img: "https://i.imgur.com/lPAPDfm.jpeg" },
              { name: "Vosu", desc: "Automação de workflows | Conecta e automatiza processos", img: "https://i.imgur.com/mECh3xU.jpeg" },
              { name: "Claude", desc: "IA para texto e raciocínio | Analisa e gera conteúdo", img: "https://i.imgur.com/4I9zStg.jpeg" },
              { name: "Freepik", desc: "Criação visual | Biblioteca de assets e imagens IA", img: "https://i.imgur.com/9JDo9rl.jpeg" }
            ].map((tool, i) => (
              <div key={i} className="group relative aspect-[4/5] md:aspect-[4/6] bg-zinc-900 rounded-[16px] md:rounded-[24px] overflow-hidden border border-white/5 hover:border-cyan-500/40 transition-all">
                <div className="absolute inset-0 z-0">
                  <img 
                    src={tool.img} 
                    alt={tool.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 z-10">
                  <h3 className="text-sm md:text-lg font-black uppercase italic tracking-tighter text-white mb-1 md:mb-2 leading-none">{tool.name}</h3>
                  <p className="text-[7px] md:text-[9px] font-bold text-zinc-400 uppercase leading-tight">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-24">
          <p className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-zinc-600 mb-6 md:mb-12 px-6">Integrado com as melhores IAs do mundo</p>
          <Marquee speed="20s" className="py-1 md:py-4">
            {toolLogos.map((logo, idx) => (
              <div key={idx} className="mx-0 md:mx-0.5 h-6 md:h-[60px] flex items-center justify-center shrink-0 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                <img src={logo} alt="Tool logo" className="h-full w-auto object-contain scale-90 md:scale-110" referrerPolicy="no-referrer" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* SEÇÃO - COMUNIDADE NO WHATSAPP */}
      <section className="py-16 md:py-28 px-6 bg-zinc-950 border-t border-b border-white/5 relative overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#25D366]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-12 right-12 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Informativo */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full">
                <MessageSquare className="text-[#25D366]" size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">NETWORK ULTRA EXCLUSIVO</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase italic text-white">
                A COMUNIDADE QUE <br />
                <span className="text-[#25D366]">GERA RESULTADOS</span>
              </h2>
              
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                Mais do que um treinamento, o Workshop te dá acesso direto a um grupo fechado no <strong className="text-white font-bold">WhatsApp com mais de 800 profissionais e membros ativos</strong>. 
                Uma comunidade extremamente engajada focada em compartilhar soluções práticas, tendências em alta, networking real e ideias para viralizar e fechar novos negócios.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
                <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="text-[#25D366]" size={20} />
                    <h4 className="font-bold uppercase tracking-tight text-white text-xs">Viralização Coletiva</h4>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    Temos membros ativos no grupo que ultrapassaram a impressionante marca de <strong>100 milhões de visualizações</strong> aplicando nossos conceitos e de forma orgânica.
                  </p>
                </div>

                <div className="p-4 bg-zinc-900/40 border border-[#25D366]/20 bg-[#25D366]/5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-[#25D366]" size={20} />
                    <h4 className="font-bold uppercase tracking-tight text-white text-xs">Suporte e Clientes</h4>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                    A galera se apoia diariamente. Membros que criaram seus primeiros vídeos de IA já estão fechando clientes, emitindo propostas e recebendo pagamentos em <strong>Dólar</strong> e em <strong>Real</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual de Comunidade */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm p-8 bg-[#0a0f0d] border border-green-500/20 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(37,211,102,0.05)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col items-center text-center">
                  {/* WhatsApp Big Styled Icon */}
                  <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mb-6 shadow-[0_10px_32px_rgba(37,211,102,0.3)]">
                    <MessageSquare size={38} className="text-black fill-black" />
                  </div>
                  
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#25D366] mb-1">Membros Ativos</span>
                  <div className="text-3xl sm:text-4xl font-black italic tracking-tight text-white mb-2 whitespace-nowrap">+800 MEMBROS</div>
                  <p className="text-xs text-zinc-400 font-medium max-w-[240px] leading-relaxed mb-6">
                    Fechados no mesmo ecossistema, faturando e recebendo pagamentos em <span className="text-white font-bold">Dólar ($)</span> e <span className="text-white font-bold">Real (R$)</span>.
                  </p>

                  {/* Avatar pile or visual simulation */}
                  <div className="flex items-center -space-x-3 mb-2">
                    {[
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
                    ].map((avatar, idx) => (
                      <div key={idx} className="w-9 h-9 rounded-full border-2 border-[#0a0f0d] overflow-hidden bg-zinc-800">
                        <img src={avatar} alt={`User ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="w-9 h-9 rounded-full border-2 border-[#0a0f0d] bg-[#25D366] flex items-center justify-center text-[10px] font-black text-black">
                      +800
                    </div>
                  </div>
                  
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Conexão Global 24/7</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="py-10 md:py-48 px-6 bg-cyan-400 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-10 lg:gap-24 text-center md:text-left">
            <div className="space-y-6 lg:space-y-12">
              <h2 className="text-[28px] md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
                O QUE VOCÊ <br className="hidden md:block" /> PRECISA
              </h2>
              <div className="space-y-4 lg:space-y-6 flex flex-col items-center md:items-start">
                 <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group">
                   <Monitor size={32} className="md:w-8 md:h-8 mb-2 md:mb-0" />
                   <span className="font-black text-xl md:text-3xl uppercase tracking-tighter leading-tight">
                     APENAS COMPUTADOR <br /> COM ACESSO À INTERNET
                   </span>
                 </div>
                 <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-60">
                   Não precisa de mais nada. <br className="block md:hidden" /> O resto é com a gente.
                 </p>
              </div>
            </div>
            <div className="space-y-6 lg:space-y-12 mt-4 md:mt-0">
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.8] text-black/30">ZERO <br className="hidden md:block" /> BARREIRAS</h2>
              <div className="space-y-3 lg:space-y-4 flex flex-col items-center md:items-start">
                 <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-black/5 rounded-full mb-2 lg:mb-8">
                   <CheckCircle2 size={18} className="md:w-6 md:h-6 text-black/80" />
                   <span className="font-black uppercase text-[10px] md:text-xl tracking-widest text-black/60">Livre de Complicações:</span>
                 </div>
                 <div className="w-full max-w-[280px] md:max-w-none space-y-2 lg:space-y-0">
                   {[
                    "Experiência prévia com edição",
                    "Conhecimento técnico de IA",
                    "Equipamentos caros",
                    "Softwares complexos"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-center md:justify-start gap-3 lg:gap-4 py-2 md:py-4 border-b border-black/10 last:border-0 md:last:border-b">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full shrink-0 hidden md:block" />
                      <div className="relative">
                        <span className="font-bold text-[10px] md:text-xl uppercase tracking-tight opacity-40 whitespace-nowrap">{item}</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[110%] h-[1px] bg-red-600 origin-center md:origin-left" />
                      </div>
                    </div>
                  ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee 2 */}
      <Marquee>
        {videos.slice().reverse().map((src, idx) => (
          <div key={idx} className="mx-3 w-[250px] md:w-[320px] aspect-video rounded-xl overflow-hidden grayscale border border-white/5 shrink-0">
            <video 
              src={src} 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-all hover:grayscale-0" 
            />
          </div>
        ))}
      </Marquee>

      {/* SEÇÃO 6 — Preço / CTA */}
      <section id="inscricao" className="pt-6 pb-10 md:pt-12 md:pb-32 px-6 relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionLabel>Inscrição</SectionLabel>
          <h2 className="text-5xl md:text-[80px] lg:text-[100px] font-black leading-[0.85] tracking-tighter mb-16 uppercase italic">
            CRIE FILMES E <br /> <span className="text-cyan-400">MONETIZE COM IA</span>
          </h2>
          
          <div className="p-10 md:p-16 bg-zinc-900/40 border border-white/5 rounded-[32px] backdrop-blur-3xl relative">
             <div className="mb-10 text-center">
               <span className="px-8 py-3 bg-cyan-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-full inline-block mb-10">
                  Acesso Vitalício à Gravação
               </span>
               <div className="flex flex-col items-center">
                 <p className="text-zinc-500 text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-2">Investimento Único</p>
                 <span className="text-[18px] md:text-[24px] font-bold text-zinc-500 line-through tracking-wider italic mb-4">
                   De R$ 297,00
                 </span>
                 <div className="flex justify-center items-center gap-3">
                    <span className="text-[60px] md:text-[110px] font-black leading-none tracking-[-0.05em] text-white italic">R$</span>
                    <span className="text-[100px] md:text-[180px] font-black leading-none tracking-[-0.05em] text-cyan-400 italic">237</span>
                    <span className="text-[60px] md:text-[110px] font-black leading-none tracking-[-0.05em] text-white italic">,00</span>
                  </div>
                </div>
             </div>
             
              <div className="max-w-md mx-auto">
                <a 
                  href={checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full py-6 bg-white border-2 border-white hover:bg-cyan-400 hover:border-cyan-400 text-black text-xl font-black uppercase tracking-tighter rounded-full transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] hover:-translate-y-1 flex items-center justify-center gap-3 text-center"
                >
                  COMPRAR WORKSHOP
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
             
           </div>
        </div>
      </section>

      {/* SEÇÃO 7 — Rodapé */}
      <footer className="py-8 md:py-16 px-6 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-20 mb-10 md:mb-16 text-center md:text-left">
             <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-center md:justify-start">
                  <Logo className="h-10 md:h-12" />
                </div>
                <p className="text-zinc-500 text-base md:text-lg font-medium max-w-sm italic mx-auto md:mx-0">
                  O workshop que vai te transformar em um diretor de Cinema, em apenas um dia
                </p>
             </div>
             <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                <div className="space-y-4 md:space-y-6 flex flex-col items-center md:items-start">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Contato</p>
                  <ul className="space-y-4 text-sm font-bold uppercase tracking-tight text-white/60">
                    <li>
                      <a 
                        href="https://wa.me/5522992453276" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-cyan-400 transition-colors flex items-center justify-center md:justify-start gap-2"
                      >
                        <MessageSquare size={20} className="text-cyan-400" />
                        <span>WhatsApp</span>
                      </a>
                    </li>
                  </ul>
                </div>
             </div>
           </div>
           <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-700 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
             <p>Bench Park School. Todos os direitos reservados.</p>
             <div className="flex gap-6 md:gap-8 items-center">
               <a 
                 href="https://www.instagram.com/__theferreira/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-zinc-300 transition-colors"
                 title="Instagram"
               >
                 <Instagram size={24} />
               </a>
               <a 
                 href="https://www.youtube.com/@FelipeBenchCanal" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-zinc-300 transition-colors"
                 title="YouTube"
               >
                 <Youtube size={24} />
               </a>
             </div>
           </div>
        </div>
      </footer>

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

// --- Novas Páginas (Exemplos) ---
const MentoriaRupturaPage = () => {
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
              href="https://wa.me/5522992453276?text=Oi%20Felipe,%20quero%20entrar%20na%20mentoria%20mas%20estou%20com%20d%C3%BAvidas." 
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
               Uma masterclass de 2–3 horas — ao vivo, gravada, direto ao ponto.
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
             <span>Data: 21 de Junho, às 20h30</span>
             <span>•</span>
             <span>Aula completa + Gravada</span>
             <span>•</span>
             <span>VAGAS LIMITADAS PARA AO VIVO</span>
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
                 <strong className="text-[#DFB956] underline underline-offset-4 decoration-2">Gringo.exe</strong> é uma masterclass ao vivo para freelancers criativos brasileiros que querem fechar clientes internacionais — videomakers, editores, criadores de conteúdo, social media, motion designers.
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
                 { file: "Gringo.exe", tag: "MASTERCLASS", desc: "A masterclass ao vivo com replay permanente" },
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
             MASTERCLASS AO VIVO COM REPLAY PERMANENTE + ACESSO COMPLETO
           </p>

           {/* Price Tag Box */}
           <div className="max-w-md mx-auto p-10 bg-black border border-zinc-900 rounded-[32px] shadow-2xl relative mb-8">
             <div className="absolute top-4 right-4 bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-mono px-2 py-0.5 rounded font-black uppercase tracking-wider">
               OFERTA DE LANÇAMENTO
             </div>

             <div className="space-y-4">
               <span className="text-[#666] text-base line-through tracking-wider block font-mono">
                 De R$ 197,50
               </span>
               <div className="flex justify-center items-baseline gap-2">
                 <span className="text-lg text-zinc-400 font-mono">R$</span>
                 <span className="text-6xl md:text-7xl font-black italic tracking-[-0.05em] text-[#DFB956]">147</span>
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
                 [ EXECUTAR AGORA — R$ 147 ]
               </a>
             </div>

             <div className="mt-6 font-mono text-[10px] text-zinc-650 space-y-1">
               <p>Vagas limitadas para a sessão ao vivo</p>
               <p>VITALICIO: Replay permanente para todos os inscritos</p>
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


const NewPagePlaceholder = () => (
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
            className="absolute bottom-12 left-0 w-64 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden"
          >
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3 px-2">Suas Rotas Ativas:</p>
            <div className="flex flex-col gap-1">
              <a href="#/" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col">
                <span className="font-bold">Principal</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/</span>
              </a>
              <a href="#/joao" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col border-t border-white/5">
                <span className="font-bold">Check-out João</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/joao</span>
              </a>
              <a href="#/hector" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col border-t border-white/5">
                <span className="font-bold">Check-out Hector</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/hector</span>
              </a>
              <a href="#/pagina/nova" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col border-t border-white/5">
                <span className="font-bold">Exemplo Nova Página</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/pagina/nova</span>
              </a>
              <a href="#/mentoria-ruptura" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col border-t border-white/5">
                <span className="font-bold">Mentoria Ruptura</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/mentoria-ruptura</span>
              </a>
              <a href="#/workshop-cinema-ia" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 rounded-lg text-sm text-white flex flex-col border-t border-white/5">
                <span className="font-bold text-cyan-400">Workshop Cinema IA</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/workshop-cinema-ia</span>
              </a>
              <a href="#/gringo.exe" onClick={() => setIsOpen(false)} className="p-3 hover:bg-white/5 bg-[#DFB956]/5 border border-[#DFB956]/10 rounded-lg text-sm text-white flex flex-col border-t">
                <span className="font-bold text-[#DFB956]">Gringo.exe 🌟</span>
                <span className="text-[10px] text-zinc-500">benchparkschool.com/#/gringo.exe</span>
              </a>
            </div>
            <p className="mt-4 text-[9px] text-cyan-500/50 italic px-2">Clique para trocar a visualização no editor →</p>
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
        
        {/* Novas Rotas Gringo.exe */}
        <Route path="/gringo" element={<GringoExePage />} />
        <Route path="/gringo.exe" element={<GringoExePage />} />
        
        {/* Rota de Afiliado (Subdiretório) */}
        <Route path="/:affiliateId" element={<WorkshopPage />} />
        
        {/* Exemplo de Página Nova em outro Subdiretório */}
        <Route path="/pagina/nova" element={<NewPagePlaceholder />} />

        {/* Nova Página de Mentoria Ruptura */}
        <Route path="/mentoria-ruptura" element={<MentoriaRupturaPage />} />

        {/* Duplicata para /workshop-cinema-ia */}
        <Route path="/workshop-cinema-ia" element={<WorkshopPage />} />
      </Routes>
      
      {/* Navegador flutuante apenas para facilitar a edição */}
      <DevNav />
    </Router>
  );
}
