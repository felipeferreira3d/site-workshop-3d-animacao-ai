/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Cpu, 
  Headphones, 
  Monitor, 
  Play, 
  Pause,
  Zap,
  Mail,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Phone,
  Instagram,
  Youtube
} from "lucide-react";

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

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

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
              <div className="mb-2 lg:mb-6">
                <SectionLabel>
                  Workshop Intensivo <br className="md:hidden" />
                  <span className="hidden md:inline"> - </span>
                  1 Dia Inteiro
                </SectionLabel>
              </div>
              <h1 className="text-[32px] md:text-5xl lg:text-[72px] font-black leading-[1] lg:leading-[0.9] tracking-[-0.04em] mb-4 lg:mb-8 uppercase italic">
                CINEMA & <br />
                <span className="whitespace-nowrap">ANIMAÇÃO 3D</span> <br />
                <span className="text-cyan-400">COM IA</span>
              </h1>
              <p className="text-[14px] md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4 lg:mb-10 font-medium opacity-90">
                Qualquer pessoa consegue. Você vai sair daqui criando vídeos de cinema com Inteligência Artificial — e transformando isso em renda.
              </p>
            </motion.div>

            {/* Video Content - Order 2 on Mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group w-full order-2 lg:order-last"
            >
              <div className="aspect-[16/10] bg-zinc-900 border border-white/10 rounded-2xl lg:rounded-[40px] overflow-hidden relative shadow-2xl shadow-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-500">
                <video 
                  ref={videoRef}
                  src="https://i.imgur.com/NGIKeto.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />
                
                {/* Hover Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 lg:w-20 h-12 lg:h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                    {isPaused ? (
                      <Play className="text-white fill-white ml-1" size={24} />
                    ) : (
                      <Pause className="text-white fill-white" size={24} />
                    )}
                  </div>
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
                  className="w-full sm:w-auto px-6 lg:px-10 py-3 lg:py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-[12px] lg:text-sm rounded-full transition-all shadow-[0_10px_30px_rgba(34,211,238,0.2)] hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                >
                  <span className="whitespace-nowrap">Comprar Ingresso Lote 1</span>
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </a>
                
                {/* Sales Meter */}
                <div className="w-full lg:max-w-sm space-y-2 lg:space-y-3">
                  <div className="h-1.5 lg:h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "36%" }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                      className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.05em] text-white">
                    <span>36% dos ingressos vendidos no Lote 01</span>
                    <span className="text-cyan-400 animate-pulse italic font-black">Está esgotando rápido</span>
                  </div>
                </div>
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
                { id: "01", name: "Fundamentos", desc: "Panorama do mercado e ferramentas essenciais", tools: ["IA Overview", "Prompting"] },
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

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { name: "Seedance 2", desc: "Geração e edição de vídeo com IA (principal)", img: "https://i.imgur.com/kiu1Evz.jpeg" },
              { name: "Runway ML", desc: "VFX e edição avançada com IA", img: "https://i.imgur.com/zSVD4Ss.jpeg" },
              { name: "ElevenLabs", desc: "Geração de áudio, narração e voz com IA", img: "https://i.imgur.com/iwue41j.jpeg" },
              { name: "Topaz Video AI", desc: "Upscaling e melhoria de qualidade de vídeo", img: "https://i.imgur.com/IvNb6Wk.jpeg" },
              { name: "CapCut", desc: "Edição final e montagem dos vídeos", img: "https://i.imgur.com/lPAPDfm.jpeg" }
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
      <section id="inscricao" className="py-10 md:py-32 px-6 relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionLabel>Inscrição</SectionLabel>
          <h2 className="text-5xl md:text-[100px] font-black leading-[0.8] tracking-tighter mb-16 uppercase italic">
            INVISTA NO <br /> <span className="text-cyan-400">FUTURO</span>
          </h2>
          
          <div className="p-10 md:p-16 bg-zinc-900/40 border border-white/5 rounded-[32px] backdrop-blur-3xl relative">
             <div className="mb-10 text-center">
               <span className="px-8 py-3 bg-cyan-500 text-black text-xs font-black uppercase tracking-[0.2em] rounded-full inline-block mb-10">
                  Lote 01 • Aberto agora
               </span>
               <div className="flex flex-col items-center">
                 <p className="text-zinc-500 text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-6">Pagamento único de apenas</p>
                 <div className="flex justify-center items-center gap-3">
                    <span className="text-[60px] md:text-[110px] font-black leading-none tracking-[-0.05em] text-white italic">R$</span>
                    <span className="text-[100px] md:text-[180px] font-black leading-none tracking-[-0.05em] text-cyan-400 italic">47</span>
                    <span className="text-[60px] md:text-[110px] font-black leading-none tracking-[-0.05em] text-white italic">,00</span>
                  </div>
                </div>
             </div>
             
             <div className="max-w-md mx-auto">
                <button className="group w-full py-6 bg-white border-2 border-white hover:bg-cyan-400 hover:border-cyan-400 text-black text-xl font-black uppercase tracking-tighter rounded-full transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] hover:-translate-y-1 flex items-center justify-center gap-3">
                 GARANTIR MINHA VAGA
                 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
             </div>
             
              <p className="mt-12 text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">
               Vagas limitadas por turma para garantir suporte total.
             </p>
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
                  Cinema & Animação 3D com IA. O workshop que está democratizando a produção audiovisual de alta qualidade.
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
                        <Phone size={14} className="text-cyan-400" />
                        <span>WhatsApp</span>
                      </a>
                    </li>
                  </ul>
                </div>
             </div>
           </div>
           <div className="pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-700 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
             <p>Bench Park School. Todos os direitos reservados.</p>
             <div className="flex gap-6 md:gap-8">
               <a 
                 href="https://www.instagram.com/felipeferreira3d/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-zinc-300 transition-colors"
                 title="Instagram"
               >
                 <Instagram size={18} />
               </a>
               <a 
                 href="https://www.youtube.com/@FelipeBenchCanal" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="hover:text-zinc-300 transition-colors"
                 title="YouTube"
               >
                 <Youtube size={18} />
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
