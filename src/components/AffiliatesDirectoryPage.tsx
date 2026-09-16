import React, { useState } from "react";
import { 
  Users, 
  ExternalLink, 
  Copy, 
  Check, 
  Search, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  Link2
} from "lucide-react";
import { AFFILIATES_LIST, Affiliate } from "../data/affiliatesData";

export const AffiliatesDirectoryPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedHotmartId, setCopiedHotmartId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getProductionUrl = (aff: Affiliate) => {
    return `https://www.benchparkschool.com/#/${aff.id}`;
  };

  const getLocalUrl = (aff: Affiliate) => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${window.location.pathname}#/${aff.id}`;
    }
    return `https://www.benchparkschool.com/#/${aff.id}`;
  };

  const handleCopyProduction = (aff: Affiliate) => {
    const url = getProductionUrl(aff);
    navigator.clipboard.writeText(url);
    setCopiedId(aff.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyHotmart = (aff: Affiliate) => {
    navigator.clipboard.writeText(aff.checkoutUrl);
    setCopiedHotmartId(aff.id);
    setTimeout(() => {
      setCopiedHotmartId(null);
    }, 2000);
  };

  const filteredAffiliates = AFFILIATES_LIST.filter((aff) => {
    const search = searchTerm.toLowerCase();
    return (
      aff.name.toLowerCase().includes(search) ||
      aff.id.toLowerCase().includes(search) ||
      aff.checkoutUrl.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500 selection:text-black pb-24">
      {/* Header da Página */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a 
              href="#/" 
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Voltar ao Site</span>
            </a>
            <div className="flex items-center gap-2">
              <span className="font-bebas text-2xl tracking-wider text-white">CINEMA COM</span>
              <span className="font-bebas text-2xl tracking-wider text-cyan-400">IA</span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Central de Afiliados</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-cyan-950/60 border border-cyan-400/30 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-cyan-300">
                {AFFILIATES_LIST.length} Afiliados Ativos
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero da Central */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cyan-950/80 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-mono">
            <Users size={14} />
            <span>PAINEL DE GERENCIAMENTO & LINKS</span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-[0.9]">
            Links de Afiliados <br />
            <span className="text-cyan-400">Cinema com IA</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Cada link abaixo direciona para a página completa do site, configurando automaticamente o botão de matrícula para o checkout Hotmart do respectivo afiliado.
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-zinc-900/80 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <div className="text-xs font-mono text-zinc-500 sm:ml-auto">
            Exibindo {filteredAffiliates.length} de {AFFILIATES_LIST.length} afiliados
          </div>
        </div>

        {/* Grid de Cards de Afiliados */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAffiliates.map((aff) => {
            const prodUrl = getProductionUrl(aff);
            const localUrl = getLocalUrl(aff);
            const isCopied = copiedId === aff.id;
            const isHotmartCopied = copiedHotmartId === aff.id;

            return (
              <div 
                key={aff.id}
                className="p-5 sm:p-6 bg-zinc-950/80 border border-white/10 hover:border-cyan-400/40 rounded-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow de hover sutil */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-400/10 transition-all" />

                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Ativo</span>
                      </div>
                      <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                        {aff.name}
                      </h3>
                    </div>

                    <span className="px-2.5 py-1 bg-zinc-900 border border-white/10 rounded-lg text-[11px] font-mono text-cyan-400">
                      #{aff.id}
                    </span>
                  </div>

                  {/* Campo com o link oficial gerado */}
                  <div className="space-y-1.5 mt-4">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      <span>Link Oficial da Página:</span>
                      <span className="text-zinc-500">benchparkschool.com</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-black/80 border border-cyan-500/30 rounded-lg text-xs font-mono text-zinc-300 overflow-hidden">
                      <Link2 size={14} className="text-cyan-400 shrink-0" />
                      <span className="truncate select-all text-cyan-300 font-medium">
                        {prodUrl}
                      </span>
                    </div>
                  </div>

                  {/* Hotmart Destination */}
                  <div className="mt-3 p-2 bg-zinc-900/60 border border-white/5 rounded-lg text-[11px] font-mono text-zinc-400 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="text-zinc-500">Hotmart: </span>
                      <a 
                        href={aff.checkoutUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-300 hover:text-cyan-400 underline"
                      >
                        {aff.checkoutUrl}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopyHotmart(aff)}
                      title="Copiar Checkout Hotmart"
                      className="px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 rounded text-zinc-300 shrink-0"
                    >
                      {isHotmartCopied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                {/* Ações */}
                <div className="pt-5 mt-5 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleCopyProduction(aff)}
                    className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isCopied 
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                        : "bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={16} />
                        <span>Link Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copiar Link Completo</span>
                      </>
                    )}
                  </button>

                  <a
                    href={localUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-white/10 hover:border-cyan-400/30 cursor-pointer"
                  >
                    <span>Testar</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Informativo para Adicionar Novos */}
        <div className="mt-12 p-6 sm:p-8 bg-zinc-950 border border-white/10 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-950/80 border border-cyan-400/30 rounded-xl text-cyan-400 shrink-0">
              <Sparkles size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-bebas text-xl sm:text-2xl text-white tracking-wide">
                Como adicionar novos afiliados ao sistema?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl">
                O projeto utiliza um arquivo central em <code className="px-1.5 py-0.5 bg-black border border-white/10 rounded text-cyan-300 font-mono text-xs">src/data/affiliatesData.ts</code>. Sempre que você receber novos afiliados com seus links da Hotmart, basta adicionar um novo item com o <strong className="text-white">nome</strong> e o <strong className="text-white">link de checkout</strong>. O sistema gera automaticamente a rota direta, suporta parâmetros como <code className="px-1.5 py-0.5 bg-black border border-white/10 rounded text-cyan-300 font-mono text-xs">?ref=nome</code> e atualiza esta lista instantaneamente.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
