/**
 * =========================================================================
 * CINEMA COM AI — DADOS & PLACEHOLDERS CUSTOMIZÁVEIS
 * =========================================================================
 * Edite os dados abaixo para atualizar:
 * 1. Prova Social & Autoridade do Instrutor (Print do Instagram e Números)
 * 2. Depoimentos em Texto (Foco em Resultados Concretos)
 * 3. Galeria Visual de Vídeos (Instrutor, Bench Park Studio e Alunos)
 * 4. Repescagem de Resultados (Quotes de Impacto antes do CTA)
 */

export interface StudentProject {
  id: string;
  studentName: string;
  projectName: string;
  courseTaken: string;
  viewsBadge: string;
  viewsCount: number;
  videoUrl: string;
  thumbnailUrl: string;
  testimonial: string;
  tags: string[];
}

/**
 * =========================================================================
 * ★ BLOCO 1 — AUTORIDADE / PROVA SOCIAL DO INSTRUTOR
 * =========================================================================
 * EDITE OS NÚMEROS REAIS E O PRINT DO INSTAGRAM AQUI:
 */
export interface InstructorAuthorityMetric {
  id: string;
  targetNumber: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

export interface InstructorAuthorityData {
  headline: string;
  subheadline: string;
  instagramHandle: string;
  instagramUrl: string;
  instagramFollowersCount: string;
  /* >>> VÍDEO DO BLOCO DE AUTORIDADE (16:9 - 1920x1080) <<< */
  /* Cole aqui a URL do arquivo de vídeo (mp4, webm ou stream) do instrutor */
  authorityVideoUrl: string;
  /* Imagem de capa / thumbnail do vídeo de autoridade */
  authorityThumbnailUrl: string;
  metrics: InstructorAuthorityMetric[];
}

/**
 * URL do vídeo principal de topo (Hero) e de autoridade
 * Arquivo MP4 direto hospedado no Imgur
 */
export const HERO_VIDEO_URL = "https://i.imgur.com/jsGkPjG.mp4";

export const INSTRUCTOR_AUTHORITY: InstructorAuthorityData = {
  headline: "NÃO É CURSO DE TEORIA.",
  subheadline: "Eu vivo disso todos os dias no mercado audiovisual.",
  instagramHandle: "@__theferreira",
  instagramUrl: "https://www.instagram.com/__theferreira/",
  // PLACEHOLDER: confirmar número real de seguidores/badge antes de publicar
  instagramFollowersCount: "+130 MIL SEGUIDORES",
  
  // ★ VÍDEO PRINCIPAL DE AUTORIDADE (16:9 / 1920x1080):
  // Reutiliza a mesma fonte/variável do vídeo principal do topo (Hero)
  authorityVideoUrl: HERO_VIDEO_URL,
  authorityThumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop",
  
  /* >>> NÚMEROS DE AUTORIDADE <<< */
  metrics: [
    {
      id: "seguidores",
      targetNumber: 130,
      prefix: "+",
      suffix: " MIL",
      label: "Seguidores no Instagram",
      description: "Audiência qualificada acompanhando bastidores"
    },
    {
      id: "anos",
      targetNumber: 11,
      prefix: "+",
      suffix: "",
      label: "Anos no Audiovisual & 3D",
      description: "Carreira construída em estúdios e direção"
    },
    {
      id: "clientes",
      targetNumber: 100,
      prefix: "+",
      suffix: "",
      label: "Marcas & Clientes Atendidos",
      description: "Campanhas, comerciais e projetos de TV"
    },
    {
      id: "views",
      targetNumber: 1,
      prefix: "+",
      suffix: "B",
      label: "Visualizações em Projetos",
      description: "Mais de 1 bilhão em alcance orgânico somado"
    }
  ]
};

/**
 * =========================================================================
 * ★ BLOCO 2 — DEPOIMENTOS (SOMENTE TEXTO / PROVA SOCIAL DE RESULTADOS)
 * =========================================================================
 * EDITE OS DEPOIMENTOS REAIS DE RESULTADOS AQUI:
 * (Foco em números reais: faturamento, viralização, tempo de aprendizado)
 */
export interface TextTestimonialItem {
  id: string;
  studentName: string;
  studentRole: string;
  avatarUrl: string;
  resultBadge: string; // Ex: "R$ 8.500 no 1º Contrato", "2.4M Views no Reels"
  testimonial: string;
  course: string;
}

export const TEXT_TESTIMONIALS: TextTestimonialItem[] = [
  {
    id: "01",
    studentName: "Marcos Ciacco",
    studentRole: "Artista 3D & Diretor de Animação IA",
    // Foto 1: https://imgur.com/XaFxjnP
    avatarUrl: "https://i.imgur.com/XaFxjnP.jpg",
    resultBadge: "VIROU REFERÊNCIA E FECHOU PROJETO COM O NEYMAR OFICIAL",
    testimonial: "Fiquei cerca de 6 meses sem receber propostas de trabalho em 3D. Apliquei o método do workshop e, dois dias depois, já tinha lançado meu primeiro curta autoral. A conta viralizou com milhões de views no Instagram e no mês seguinte fechei uma animação feita com IA para o perfil oficial do Neymar.",
    course: "Workshop Cinema & 3D com IA"
  },
  {
    id: "02",
    studentName: "Rafael Franca",
    studentRole: "Filmmaker & Criador Audiovisual",
    // Foto 2: https://imgur.com/DzcSPu3
    avatarUrl: "https://i.imgur.com/DzcSPu3.jpg",
    resultBadge: "NÍVEL ABSURDO DEPOIS DE COLOCAR A MÃO NA MASSA",
    testimonial: "Comprei o curso e só recentemente consegui parar a rotina corrida para colocar a mão na massa. Fiquei impressionado com o nível de resultado alcançado e já estou buscando novos trabalhos com o que aprendi depois de compartilhar o projeto no Reels.",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "03",
    // PLACEHOLDER: confirmar se este depoimento é duplicado do Card 2 ou substituir por outro.
    studentName: "Rafael Franca",
    studentRole: "Filmmaker & Motion Creator",
    // Foto 3: https://imgur.com/ZgT5fKn
    avatarUrl: "https://i.imgur.com/ZgT5fKn.jpg",
    resultBadge: "SALTO DE QUALIDADE & REPERCUSSÃO NO REELS",
    testimonial: "O salto de qualidade na entrega final é imediato. Ao publicar a peça nas redes, a repercussão com potenciais clientes foi instantânea — a metodologia acelera o que antes levava meses para estruturar.",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "04",
    // PLACEHOLDER: nome e resultado específico não identificados neste print — considerar substituir por depoimento mais completo.
    studentName: "Aluno da Comunidade",
    studentRole: "Membro da Comunidade Fechada",
    // Foto 4: https://imgur.com/1jwvExA
    avatarUrl: "https://i.imgur.com/1jwvExA.jpg",
    resultBadge: "REFERÊNCIA PARA A COMUNIDADE",
    testimonial: "Obrigado Felipão, tamo junto demais! Você é uma verdadeira inspiração para toda a comunidade que está desbravando o cinema e o 3D com IA.",
    course: "Workshop Cinema & 3D com IA"
  },
  {
    id: "05",
    studentName: "Pablo (PJ Arts)",
    studentRole: "Artista 3D & Criador 100% IA",
    // Foto 5: https://imgur.com/LeFKEOw
    avatarUrl: "https://i.imgur.com/LeFKEOw.jpg",
    resultBadge: "SAIU DO ZERO EM IA E JÁ FECHA PARCERIAS",
    testimonial: "Conheço o trabalho do Felipe há 5 anos no 3D, mas estava numa fase parada por falta de projetos. Comecei a trabalhar com IA em janeiro, usando o Seedance 2.0, fechei parcerias com outros criadores da comunidade e hoje atuo 100% com IA.",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "06",
    studentName: "Guilherme Carvalho",
    studentRole: "Diretor Criativo & Motion",
    // Foto 6: https://imgur.com/a1OfTCX
    avatarUrl: "https://i.imgur.com/a1OfTCX.jpg",
    resultBadge: "MAIS PROJETOS NA MESA — JÁ FORMALIZANDO CONTRATOS COM ADVOGADO",
    testimonial: "Depois de aplicar o método, passei a receber muito mais chamadas para novos projetos, a ponto de precisar contratar um advogado para formalizar e atualizar todos os contratos com os novos clientes.",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "07",
    // NOTA: Mesmo aluno do Card 6 (Guilherme Carvalho) — focando aqui especificamente na conquista do contrato internacional com a empresa de Lisboa.
    studentName: "Guilherme Carvalho",
    studentRole: "Diretor Criativo & Filmmaker IA",
    // Foto 7: https://imgur.com/QOlphgx
    avatarUrl: "https://i.imgur.com/QOlphgx.jpg",
    resultBadge: "EMPRESA DE LISBOA FECHOU SÉRIE DE VÍDEOS COM ELE",
    testimonial: "Recebi o contato direto de uma empresa de Lisboa interessada em produzir uma série de vídeos curtos de 30 segundos com os mascotes da marca. A visibilidade e alcance internacional vieram muito rápido.",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "08",
    // PLACEHOLDER: confirmar nome real deste aluno (aparece apenas o telefone no print)
    studentName: "Diretor Audiovisual",
    studentRole: "12 Anos no Mercado Audiovisual",
    // Foto 8: https://imgur.com/cljhpHn
    avatarUrl: "https://i.imgur.com/cljhpHn.jpg",
    resultBadge: "FATURANDO +R$ 15 MIL POR MÊS COM IA",
    testimonial: "Trabalho com audiovisual há 12 anos. Depois dos cursos do Felipe Ferreira, descobri uma nova forma de elevar o nível do meu trabalho. Hoje faturo mais de R$ 15 mil por mês com projetos feitos com IA e já virei referência na minha cidade.",
    course: "Cinema com AI — Formação Pro"
  }
];

/**
 * =========================================================================
 * ★ BLOCO 3 — GALERIA VISUAL DE TRABALHOS (SÓ VÍDEOS + VIEWS GIGANTE + TÍTULO)
 * =========================================================================
 * EDITE A LISTA DE VÍDEOS REAIS AQUI:
 * (Mistura projetos do instrutor, da Bench Park Studio e dos alunos)
 */
export interface GalleryVideoItem {
  id: string;
  instagramHandle: string; // Handle do Instagram do aluno (ex: @andrearienco)
  studentName?: string; // Nome ou @ para compatibilidade
  title?: string;
  viewsBadge?: string; // Opcional (removido desta lista conforme solicitado)
  viewsCount?: number;
  thumbnailUrl: string;
  videoUrl: string;
  authorLabel?: string;
}

export const GALLERY_VIDEOS: GalleryVideoItem[] = [
  {
    id: "v01",
    instagramHandle: "@andrearienco",
    studentName: "@andrearienco",
    title: "@andrearienco",
    thumbnailUrl: "https://i.imgur.com/6Va3K5jh.jpg",
    videoUrl: "https://i.imgur.com/6Va3K5j.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v02",
    instagramHandle: "@andyeffects",
    studentName: "@andyeffects",
    title: "@andyeffects",
    thumbnailUrl: "https://i.imgur.com/WyMuu20h.jpg",
    videoUrl: "https://i.imgur.com/WyMuu20.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v03",
    instagramHandle: "@Cedrimstudios.ia",
    studentName: "@Cedrimstudios.ia",
    title: "@Cedrimstudios.ia",
    thumbnailUrl: "https://i.imgur.com/HBWtBrMh.jpg",
    videoUrl: "https://i.imgur.com/HBWtBrM.mp4",
    authorLabel: "Aluno Pro"
  },

  {
    id: "v05",
    instagramHandle: "@guicarvalho.ia",
    studentName: "@guicarvalho.ia",
    title: "@guicarvalho.ia",
    thumbnailUrl: "https://i.imgur.com/rgPBqVqh.jpg",
    videoUrl: "https://i.imgur.com/rgPBqVq.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v06",
    instagramHandle: "@jhosuãlima",
    studentName: "@jhosuãlima",
    title: "@jhosuãlima",
    thumbnailUrl: "https://i.imgur.com/loVf2JOh.jpg",
    videoUrl: "https://i.imgur.com/loVf2JO.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v07",
    instagramHandle: "@mmenezes.lab",
    studentName: "@mmenezes.lab",
    title: "@mmenezes.lab",
    thumbnailUrl: "https://i.imgur.com/tECN6Jdh.jpg",
    videoUrl: "https://i.imgur.com/tECN6Jd.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v08",
    instagramHandle: "@quati_ai",
    studentName: "@quati_ai",
    title: "@quati_ai",
    thumbnailUrl: "https://i.imgur.com/M1pr4cxh.jpg",
    videoUrl: "https://i.imgur.com/M1pr4cx.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v09",
    instagramHandle: "@matheus.monteiro.ai",
    studentName: "@matheus.monteiro.ai",
    title: "@matheus.monteiro.ai",
    thumbnailUrl: "https://i.imgur.com/DgTOssIh.jpg",
    videoUrl: "https://i.imgur.com/DgTOssI.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v10",
    instagramHandle: "@heirafa",
    studentName: "@heirafa",
    title: "@heirafa",
    thumbnailUrl: "https://i.imgur.com/DE01Nish.jpg",
    videoUrl: "https://i.imgur.com/DE01Nis.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v11",
    instagramHandle: "@eoh_franca",
    studentName: "@eoh_franca",
    title: "@eoh_franca",
    thumbnailUrl: "https://i.imgur.com/t2y35Eoh.jpg",
    videoUrl: "https://i.imgur.com/t2y35Eo.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v12",
    instagramHandle: "@blockoutstudio / @rafaelmeneguzzo",
    studentName: "@blockoutstudio / @rafaelmeneguzzo",
    title: "@blockoutstudio / @rafaelmeneguzzo",
    thumbnailUrl: "https://i.imgur.com/JCbkslPh.jpg",
    videoUrl: "https://i.imgur.com/JCbkslP.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v13",
    instagramHandle: "@iaflowers01.0101",
    studentName: "@iaflowers01.0101",
    title: "@iaflowers01.0101",
    thumbnailUrl: "https://i.imgur.com/eZApvX7h.jpg",
    videoUrl: "https://i.imgur.com/eZApvX7.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v14",
    instagramHandle: "@saulo.f.padovan",
    studentName: "@saulo.f.padovan",
    title: "@saulo.f.padovan",
    thumbnailUrl: "https://i.imgur.com/i7mCSSsh.jpg",
    videoUrl: "https://i.imgur.com/i7mCSSs.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v15",
    instagramHandle: "@vepefilms",
    studentName: "@vepefilms",
    title: "@vepefilms",
    thumbnailUrl: "https://i.imgur.com/LG9CPaHh.jpg",
    videoUrl: "https://i.imgur.com/LG9CPaH.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v16",
    instagramHandle: "@andrearienco",
    studentName: "@andrearienco",
    title: "@andrearienco",
    thumbnailUrl: "https://i.imgur.com/YMQux0Lh.jpg",
    videoUrl: "https://i.imgur.com/YMQux0L.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v17",
    instagramHandle: "@saulo.f.padovan",
    studentName: "@saulo.f.padovan",
    title: "@saulo.f.padovan",
    thumbnailUrl: "https://i.imgur.com/YsRRpN5h.jpg",
    videoUrl: "https://i.imgur.com/YsRRpN5.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v18",
    instagramHandle: "@Cedrimstudios.ia",
    studentName: "@Cedrimstudios.ia",
    title: "@Cedrimstudios.ia",
    thumbnailUrl: "https://i.imgur.com/mT5SFAfh.jpg",
    videoUrl: "https://i.imgur.com/mT5SFAf.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v19",
    instagramHandle: "@mmenezes.lab",
    studentName: "@mmenezes.lab",
    title: "@mmenezes.lab",
    thumbnailUrl: "https://i.imgur.com/G3iFNfKh.jpg",
    videoUrl: "https://i.imgur.com/G3iFNfK.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v20",
    instagramHandle: "@quati_ai",
    studentName: "@quati_ai",
    title: "@quati_ai",
    thumbnailUrl: "https://i.imgur.com/JBscim5h.jpg",
    videoUrl: "https://i.imgur.com/JBscim5.mp4",
    authorLabel: "Aluno Pro"
  },
  {
    id: "v21",
    instagramHandle: "@andrearienco",
    studentName: "@andrearienco",
    title: "@andrearienco",
    thumbnailUrl: "https://i.imgur.com/Fm3Pn49h.jpg",
    videoUrl: "https://i.imgur.com/Fm3Pn49.mp4",
    authorLabel: "Aluno Pro"
  }
];

/**
 * =========================================================================
 * ★ BLOCO 4 — REPESCAGEM DE DEPOIMENTOS DE RESULTADO (QUOTES ANTES DO CTA)
 * =========================================================================
 * EDITE OS QUOTES CURTOS DE ALTO IMPACTO E AS FOTOS DOS ALUNOS AQUI:
 */
/**
 * =========================================================================
 * ★ BLOCO 4 — GALERIA DE PRINTS REAIS DE VIRALIZAÇÃO DOS ALUNOS
 * =========================================================================
 * 15 prints reais de viralização em carrossel horizontal contínuo (marquee)
 */
export interface ViralPrintItem {
  id: string;
  imageUrl: string;
  viewsBadge?: string;
  studentName?: string;
  caption?: string;
}

export const VIRAL_PRINTS_GALLERY: ViralPrintItem[] = [
  {
    id: "vp-01",
    // 1: https://imgur.com/sSa9q0B
    imageUrl: "https://i.imgur.com/sSa9q0B.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-02",
    // 2: https://imgur.com/Ag4vOf9
    imageUrl: "https://i.imgur.com/Ag4vOf9.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-03",
    // 3: https://imgur.com/CpXvwte
    imageUrl: "https://i.imgur.com/CpXvwte.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-04",
    // 4: https://imgur.com/NXKQFgi
    imageUrl: "https://i.imgur.com/NXKQFgi.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-05",
    // 5: https://imgur.com/r1ZOUni
    imageUrl: "https://i.imgur.com/r1ZOUni.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-06",
    // 6: https://imgur.com/i6NGEUX
    imageUrl: "https://i.imgur.com/i6NGEUX.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-07",
    // 7: https://imgur.com/Cy0eKqe
    imageUrl: "https://i.imgur.com/Cy0eKqe.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-08",
    // 8: https://imgur.com/IGuVLK6
    imageUrl: "https://i.imgur.com/IGuVLK6.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-09",
    // 9: https://imgur.com/vVn9W0p
    imageUrl: "https://i.imgur.com/vVn9W0p.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-10",
    // 10: https://imgur.com/C7yB7bD
    imageUrl: "https://i.imgur.com/C7yB7bD.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-11",
    // 11: https://imgur.com/thDDGyf
    imageUrl: "https://i.imgur.com/thDDGyf.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-12",
    // 12: https://imgur.com/GcVATfh
    imageUrl: "https://i.imgur.com/GcVATfh.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-13",
    // 13: https://imgur.com/Nvl4Cqk
    imageUrl: "https://i.imgur.com/Nvl4Cqk.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-14",
    // 14: https://imgur.com/mlyFhZz
    imageUrl: "https://i.imgur.com/mlyFhZz.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  },
  {
    id: "vp-15",
    // 15: https://imgur.com/O7kuIJC
    imageUrl: "https://i.imgur.com/O7kuIJC.jpg",
    viewsBadge: "VIRAL",
    studentName: "Aluno Pro",
    caption: "Print real de post viral e visualizações orgânicas"
  }
];

/**
 * =========================================================================
 * ★ BLOCO 5 — GALERIA DE RESULTADOS DO INSTRUTOR (PROVA DE AUTORIDADE)
 * =========================================================================
 * 12 prints reais de trabalhos, alcance e métricas do próprio Felipe Ferreira
 */
export interface InstructorResultItem {
  id: string;
  imageUrl: string;
  viewsBadge?: string;
  authorName?: string;
  caption?: string;
}

export const INSTRUCTOR_RESULTS_GALLERY: InstructorResultItem[] = [
  {
    id: "ir-01",
    // 1: https://imgur.com/LTZRaFG
    imageUrl: "https://i.imgur.com/LTZRaFG.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-02",
    // 2: https://imgur.com/fqGkqVp
    imageUrl: "https://i.imgur.com/fqGkqVp.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-03",
    // 3: https://imgur.com/BJW2I8c
    imageUrl: "https://i.imgur.com/BJW2I8c.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-04",
    // 4: https://imgur.com/qqlHraD
    imageUrl: "https://i.imgur.com/qqlHraD.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-05",
    // 5: https://imgur.com/OX2aD6s
    imageUrl: "https://i.imgur.com/OX2aD6s.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-06",
    // 6: https://imgur.com/6VchYtn
    imageUrl: "https://i.imgur.com/6VchYtn.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-07",
    // 7: https://imgur.com/rrQ5qUj
    imageUrl: "https://i.imgur.com/rrQ5qUj.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-08",
    // 8: https://imgur.com/hEF9z7h
    imageUrl: "https://i.imgur.com/hEF9z7h.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-09",
    // 9: https://imgur.com/NacArvd
    imageUrl: "https://i.imgur.com/NacArvd.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-10",
    // 10: https://imgur.com/qCP9gZC
    imageUrl: "https://i.imgur.com/qCP9gZC.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-11",
    // 11: https://imgur.com/G1kPqYe
    imageUrl: "https://i.imgur.com/G1kPqYe.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  },
  {
    id: "ir-12",
    // 12: https://imgur.com/IjsEUZQ
    imageUrl: "https://i.imgur.com/IjsEUZQ.jpg",
    viewsBadge: "AUTORIDADE",
    authorName: "Felipe Ferreira",
    caption: "Métricas e resultados reais em projetos de IA e Cinema"
  }
];

export interface ResultRecapQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
  resultTag: string; // Ex: "+R$ 14.200 FATURAMENTO", "CONTRATO INTERNACIONAL"
  /* Foto de perfil / avatar do aluno (URL ou import local). Substitua pelas fotos reais dos alunos */
  avatarUrl?: string;
  /* Curso / Formação realizada pelo aluno */
  course?: string;
}

export const RESULT_RECAP_QUOTES: ResultRecapQuote[] = [
  {
    id: "q1",
    quote: "Fechei R$ 14.000 em campanhas logo no primeiro mês. O método de pipeline híbrido entrega uma qualidade que cliente nenhum consegue recusar.",
    author: "Lucas Mendes",
    role: "Diretor & Aluno Pro",
    resultTag: "R$ 14.000 FATURADOS",
    // EDITE AQUI: Substitua pela foto real do aluno Lucas Mendes
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    course: "Cinema com AI — Formação Pro"
  },
  {
    id: "q2",
    quote: "Bati 2.4M no Reels com meu primeiro teaser e hoje atendo agências internacionais recebendo em dólar direto pela conta global.",
    author: "Camila Duarte",
    role: "Filmmaker",
    resultTag: "2.4M VIEWS & DÓLAR",
    // EDITE AQUI: Substitua pela foto real da aluna Camila Duarte
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    course: "Workshop Cinema & 3D com IA"
  },
  {
    id: "q3",
    quote: "Reduzi o tempo de produção de 30 dias para 4 dias. Aumentei minha margem de lucro em 400% no mesmo trimestre.",
    author: "Thiago Freitas",
    role: "Diretor de Comercial",
    resultTag: "+400% MARGEM DE LUCRO",
    // EDITE AQUI: Substitua pela foto real do aluno Thiago Freitas
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    course: "Workshop Cinema & 3D com IA"
  }
];


/**
 * Compatibilidade legada com projetos de alunos
 */
export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "00",
    studentName: "Lucas Mendes",
    projectName: "CYBER DISTRICT 2099",
    courseTaken: "Cinema com AI — Formação Pro",
    viewsBadge: "2.4M views",
    viewsCount: 2400000,
    videoUrl: "https://i.imgur.com/nifwdjL.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
    testimonial: "Eu nunca tinha dirigido uma cena de cinema. Em 3 semanas com o método, criei um teaser que viralizou no Reels com 2.4M e fechei meu primeiro contrato de R$ 8.500 com uma marca gringa.",
    tags: ["Seedance 2", "Blender", "ElevenLabs", "Kling 3"]
  },
  {
    id: "01",
    studentName: "Rafael Silveira",
    projectName: "CHRONOS // O ÚLTIMO FRAME",
    courseTaken: "Workshop Cinema & 3D com IA",
    viewsBadge: "1.8M views",
    viewsCount: 1800000,
    videoUrl: "https://i.imgur.com/CWvVZTZ.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
    testimonial: "O diferencial da Bench Park é que não é cursinho de 'gerar imagem bonita'. Aqui você aprende a pensar como diretor: enquadramento, iluminação, consistência de personagem e corte.",
    tags: ["Kling 3", "Topaz Video", "Runway Gen-3"]
  }
];

/**
 * =========================================================================
 * TOTAL AGREGADO DE VISUALIZAÇÕES
 * =========================================================================
 */
export const TOTAL_STUDENT_VIEWS_LABEL = "+12.4 MILHÕES";
export const TOTAL_STUDENT_VIEWS_NUMERIC = 12.4;

/**
 * =========================================================================
 * BARRA DE MÉTRICAS EM DESTAQUE (CONTADOR ANIMADO)
 * =========================================================================
 */
export interface MetricItem {
  id: string;
  targetNumber: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

export const METRICS_DATA: MetricItem[] = [
  {
    id: "alunos",
    targetNumber: 5,
    prefix: "+",
    suffix: " MIL",
    label: "Alunos do Audiovisual",
    description: "Mais de 5 mil alunos e criadores formados"
  },
  {
    id: "marcas",
    targetNumber: 100,
    prefix: "+",
    suffix: "",
    label: "Grandes Marcas",
    description: "Mais de 100 grandes marcas atendidas"
  },
  {
    id: "estudios",
    targetNumber: 100,
    prefix: "+",
    suffix: "",
    label: "Estúdios",
    description: "Mais de 100 estúdios e produtoras"
  },
  {
    id: "views",
    targetNumber: 1,
    prefix: "+",
    suffix: "B",
    label: "Views Orgânicas em Projetos",
    description: "Mais de 1 bilhão de visualizações em projetos"
  }
];

/**
 * =========================================================================
 * DIFERENCIAIS ("POR QUE ESTUDAR AQUI" / CADA IMAGEM TEM UM PROPÓSITO)
 * =========================================================================
 */
export interface DifferentialItem {
  number: string;
  title: string;
  headline: string;
  description: string;
  tag: string;
}

export const DIFFERENTIALS_DATA: DifferentialItem[] = [
  {
    number: "001",
    title: "Pipeline Híbrido 3D + IA",
    headline: "Controle total, zero aleatoriedade",
    description: "Não dependa da sorte de um prompt. Integre câmeras virtuais e blockout no Blender com modelos neurais para ditar enquadramento, perspectiva e luz com precisão milimétrica.",
    tag: "DIREÇÃO TÉCNICA"
  },
  {
    number: "002",
    title: "Linguagem & Direção de Cena",
    headline: "Pense e dirija como diretor",
    description: "Decupagem profissional de roteiros, storyboards em frames cinematográficos, escolha de lentes anamórficas, profundidade de campo e ritmo de montagem cena a cena.",
    tag: "STORYTELLING PRO"
  },
  {
    number: "003",
    title: "Comunidade com +1.000 Criadores",
    headline: "Ecossistema diário de negócios",
    description: "Acesso direto ao grupo exclusivo de alunos e profissionais no WhatsApp com mais de 1.000 membros. Compartilhamento diário de novas técnicas, vagas de freela, análise de projetos e parcerias reais.",
    tag: "NETWORKING ATIVO"
  },
  {
    number: "004",
    title: "Monetização & Contratos Globais",
    headline: "Fature no Brasil e no exterior",
    description: "Método comprovado para precificar comerciais com IA, montar um portfólio de alto ticket, prospectar marcas e estruturar recebimento internacional em Dólar e Euro.",
    tag: "RESULTADO REAL"
  }
];

/**
 * =========================================================================
 * MÓDULOS DO CURSO (ACORDEÃO NUMERADO 01 - 06)
 * =========================================================================
 */
export interface CourseModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  tools: string[];
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: "01",
    title: "Fundamentos da Direção & Storyboard com IA",
    subtitle: "Da ideia ao roteiro decupado em frames cinematográficos",
    description: "Domine a gramática visual do cinema adaptada para IA: escala de planos, enquadramentos, direção de arte, psicologia das cores e criação de storyboards prontos para aprovação.",
    topics: [
      "Linguagem cinematográfica, enquadramentos e composição",
      "Decupagem de roteiros e direção de arte com IA",
      "Geração de concept art e storyboards hiper-realistas",
      "Criação de bíblia visual e consistência de personagens"
    ],
    tools: ["Claude 3.5", "ChatGPT", "Midjourney v6", "Freepik AI"]
  },
  {
    id: "02",
    title: "Engenharia de Prompt Avançada & Consistência",
    subtitle: "Como manter personagem, iluminação e ambiente em múltiplos takes",
    description: "O núcleo da produção audiovisual com IA: técnicas avançadas de consistência de personagens, controle de iluminação dramática de três pontos e movimentos de câmera precisos.",
    topics: [
      "Fórmulas estruturadas de prompts para cinematografia",
      "Consistência facial, figurino e identidade visual em tomadas contínuas",
      "Controle de iluminação (Key, Fill, Rim Light e volumétrica)",
      "Comandos e parâmetros de câmera: Pan, Tilt, Dolly, Drone e Orbit"
    ],
    tools: ["Seedance 2", "Kling 3", "Midjourney v6", "ControlNet"]
  },
  {
    id: "03",
    title: "Ferramentas de Nova Geração & Vídeo Generativo",
    subtitle: "Domine os motores de IA de vídeo que lideram o mercado mundial",
    description: "Imersão prática nos principais motores de geração e animação de vídeo por IA, eliminando distorções de movimento e garantindo fluidez cinematográfica.",
    topics: [
      "Seedance 2: Geração de cenas complexas e controle de movimento",
      "Kling 3: Cinemática hiper-realista e física natural de tecidos e fluidos",
      "Runway Gen-3 Alpha: Motion Brush, controle de câmera e VFX",
      "Topaz Video AI: Upscale 4K, interpolação de frames e remoção de ruído"
    ],
    tools: ["Seedance 2", "Kling 3", "Runway Gen-3", "Topaz Video AI"]
  },
  {
    id: "04",
    title: "Pipeline Híbrido: 3D, CGI e IA Generativa",
    subtitle: "Integrando Blender e câmeras virtuais ao motor neural",
    description: "A técnica utilizada pelos principais estúdios: montar blockouts 3D simples no Blender e usar modelos de IA para renderizar com fotorrealismo, mantendo controle total da cena.",
    topics: [
      "Blockout 3D no Blender e posicionamento de câmeras virtuais",
      "Mapas de profundidade (Depth), Normal Maps e ControlNet",
      "Composição e integração de elementos 3D em cenas geradas",
      "Construção de cenários complexos e cenografia virtual"
    ],
    tools: ["Blender", "ControlNet", "ComfyUI", "Photoshop AI"]
  },
  {
    id: "05",
    title: "Sonoplastia, Vozes Neurais e Pós-Produção",
    subtitle: "Trilhas sonoras, foley realista, clonagem vocal e montagem",
    description: "O áudio representa 50% do impacto cinematográfico. Aprenda a gerar vozes neurais expressivas, criar efeitos sonoros (SFX/Foley) com IA e finalizar a montagem com color grading.",
    topics: [
      "Vozes ultrarrealistas e clonagem vocal expressiva no ElevenLabs",
      "Geração de efeitos sonoros (SFX) e Foley cinematográfico com IA",
      "Color grading, aplicação de LUTs e correção tonal profissional",
      "Montagem rítmica e sound design avançado no DaVinci Resolve / Premiere / CapCut"
    ],
    tools: ["ElevenLabs", "Suno / Udio", "CapCut Pro", "DaVinci Resolve"]
  },
  {
    id: "06",
    title: "Monetização, Portfólio de Elite e Mercado Global",
    subtitle: "Como vender projetos de 4 a 5 dígitos para marcas no Brasil e no exterior",
    description: "O playbook comercial de posicionamento e vendas: modelos de propostas, contratos de prestação de serviços, precificação de comerciais e recebimento internacional em moeda forte.",
    topics: [
      "Estruturação de portfólio cinematográfico para clientes de alto ticket",
      "Modelos de propostas comerciais e contratos jurídicos de produção",
      "Estratégia de distribuição e alcance orgânico para atração de clientes",
      "Configuração de pagamentos internacionais em Dólar e Euro"
    ],
    tools: ["Modelos de Contratos", "Templates de Proposta", "Stripe / Nomad"]
  }
];

/**
 * =========================================================================
 * FAQ (PERGUNTAS FREQUENTES)
 * =========================================================================
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Preciso ter experiência prévia com cinema, 3D ou edição de vídeo?",
    answer: "Não. A formação foi construída do absoluto zero até o nível profissional de mercado. Nós ensinamos tanto os fundamentos de linguagem cinematográfica quanto o passo a passo prático de cada software e ferramenta de IA, com metodologia direta e sem enrolação."
  },
  {
    question: "Preciso de um computador gamer caro ou placa de vídeo potente?",
    answer: "Não! A grande maioria das ferramentas de IA generativa de vídeo e imagem (como Seedance, Kling, Runway, Midjourney e ElevenLabs) roda 100% na nuvem através do próprio navegador. Qualquer computador ou notebook com acesso estável à internet é suficiente para acompanhar e produzir os projetos."
  },
  {
    question: "Como funciona o acesso às aulas e à gravação?",
    answer: "O seu acesso é imediato e vitalício. Assim que o pagamento for confirmado, você recebe por e-mail os dados de acesso à plataforma com todas as gravações em alta definição (1080p/4K), materiais de apoio, prompts estruturados e links dos toolkits exclusivos."
  },
  {
    question: "Como funciona a comunidade e o grupo exclusivo no WhatsApp?",
    answer: "Ao entrar no treinamento, você ganha acesso instantâneo ao nosso grupo fechado com mais de 800 alunos e profissionais do audiovisual. Lá compartilhamos atualizações de novas IAs em primeira mão, análises de cena, oportunidades de freelas e parcerias em projetos reais."
  },
  {
    question: "O curso oferece certificado de conclusão?",
    answer: "Sim! Ao concluir a trilha de aulas e o projeto prático final, você pode emitir seu certificado oficial de conclusão emitido pela Bench Park School, validando suas competências em Direção e Produção Audiovisual com IA."
  },
  {
    question: "E se eu tiver dúvidas durante o treinamento?",
    answer: "Você conta com canal direto de suporte, tira-dúvidas dentro da área de membros e o apoio em tempo real de toda a comunidade no WhatsApp, onde instrutores e alunos veteranos respondem diariamente."
  },
  {
    question: "Quais são as formas de pagamento disponíveis?",
    answer: "Você pode se inscrever via Cartão de Crédito (em até 12x), Pix (com liberação imediata), boleto bancário ou através de cartões internacionais."
  }
];

/**
 * =========================================================================
 * MARQUEE KEYWORDS (FAIXA DINÂMICA DE PALAVRAS-CHAVE)
 * =========================================================================
 */
export const MARQUEE_KEYWORDS = [
  "CINEMA COM IA",
  "DIREÇÃO EM CADA FRAME",
  "PIPELINE HÍBRIDO 3D",
  "SEEDANCE 2",
  "KLING 3",
  "RUNWAY GEN-3",
  "STORYBOARD NEURAL",
  "CONSISTÊNCIA DE CENA",
  "ELEVENLABS AUDIO",
  "VFX SEM PLACA CARA",
  "BLENDER & CONTROLNET",
  "MONETIZAÇÃO EM DÓLAR",
  "BENCH PARK SCHOOL"
];
