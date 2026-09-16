/**
 * =========================================================================
 * LISTA CENTRALIZADA DE AFILIADOS — CINEMA COM IA
 * =========================================================================
 * Para adicionar um novo afiliado, basta adicionar um novo objeto nesta lista.
 * O sistema gera automaticamente:
 * 1. A rota individual: /#/slug (ex: /#/jose-carlos)
 * 2. O suporte a query param: /?ref=slug
 * 3. O cartão correspondente na Central de Afiliados (/afiliados)
 */

export interface Affiliate {
  id: string; // Slug principal para a URL (ex: 'jose-carlos')
  name: string; // Nome legível do afiliado
  checkoutUrl: string; // Link direto do checkout na Hotmart
  aliases?: string[]; // Outras variações aceitas na URL (ex: 'jose', 'josecarlos')
  notes?: string;
}

export const AFFILIATES_LIST: Affiliate[] = [
  {
    id: "jose-carlos",
    name: "José Carlos",
    checkoutUrl: "https://go.hotmart.com/M107384156T",
    aliases: ["jose", "josecarlos", "jose-carlos-hotmart"]
  },
  {
    id: "matheus-felipe",
    name: "Matheus Felipe",
    checkoutUrl: "https://go.hotmart.com/W107383780C?dp=1",
    aliases: ["matheus", "matheusfelipe", "matheus-felipe-hotmart"]
  },
  {
    id: "anderson-soares",
    name: "Anderson Soares",
    checkoutUrl: "https://go.hotmart.com/R107615479Q",
    aliases: ["anderson", "andersonsoares", "anderson-soares-hotmart"]
  },
  {
    id: "michel-mesquita",
    name: "Michel Mesquita",
    checkoutUrl: "https://go.hotmart.com/R107618095P",
    aliases: ["michel", "michelmesquita", "michel-mesquita-hotmart"]
  },
  {
    id: "arthur-cruvinel",
    name: "Arthur Cruvinel",
    checkoutUrl: "https://go.hotmart.com/B107629588F?dp=1",
    aliases: ["arthur", "arthurcruvinel", "arthur-cruvinel-hotmart"]
  },
  {
    id: "vinicius-vicente",
    name: "Vinicius Vicente",
    checkoutUrl: "https://go.hotmart.com/F107523234A",
    aliases: ["vinicius", "viniciusvicente", "vinicius-vicente-hotmart"]
  },
  {
    id: "aiala",
    name: "Aiala",
    checkoutUrl: "https://go.hotmart.com/H107614953W?dp=1",
    aliases: ["aiala-hotmart"]
  },
  {
    id: "henrique-morais",
    name: "Henrique Morais",
    checkoutUrl: "https://go.hotmart.com/C107605558P",
    aliases: ["henrique", "henriquemorais", "henrique-morais-hotmart"]
  },
  {
    id: "rodrigo-colaziol",
    name: "Rodrigo Colaziol",
    checkoutUrl: "https://go.hotmart.com/R107629763J",
    aliases: ["rodrigo", "rodrigocolaziol", "colaziol"]
  },
  {
    id: "joseph-daniels",
    name: "Joseph Daniels",
    checkoutUrl: "https://go.hotmart.com/J107623559J",
    aliases: ["joseph", "josephdaniels"]
  },
  {
    id: "renan-pontes",
    name: "Renan Pontes",
    checkoutUrl: "https://go.hotmart.com/E107605483S",
    aliases: ["renan", "renanpontes"]
  },
  {
    id: "gabriel-sodre",
    name: "Gabriel Sodré",
    checkoutUrl: "https://go.hotmart.com/B107607703W?dp=1",
    aliases: ["gabriel", "gabrielsodre", "sodre"]
  },
  {
    id: "hector-bernaud",
    name: "Hector Bernaud",
    checkoutUrl: "https://go.hotmart.com/U106821159M",
    aliases: ["hector", "hectorbernaud", "hector-hotmart"]
  },
  {
    id: "mailson-felicio",
    name: "Mailson Felício",
    checkoutUrl: "https://go.hotmart.com/N107631589K",
    aliases: ["mailson", "mailsonfelicio", "felicio"]
  },
  {
    id: "davi-silva",
    name: "Davi Silva",
    checkoutUrl: "https://go.hotmart.com/F107623072Q",
    aliases: ["davi", "davisilva"]
  },
  {
    id: "daniel-barbosa",
    name: "Daniel Barbosa",
    checkoutUrl: "https://go.hotmart.com/A107607201W",
    aliases: ["daniel", "danielbarbosa"]
  },
  {
    id: "yan-gama",
    name: "Yan Gama",
    checkoutUrl: "https://go.hotmart.com/O107632370U?dp=1",
    aliases: ["yan", "yangama"]
  },
  {
    id: "joao",
    name: "João",
    checkoutUrl: "https://pay.hotmart.com/L105489426U?sck=HOTMART_PRODUCT_PAGE&off=mlgsu0ic&hotfeature=32",
    aliases: ["joaohotmart"]
  }
];

export const DEFAULT_CHECKOUT_LINK = "https://pay.hotmart.com/P105490527D?checkoutMode=10";

export const RESERVED_PAGE_SLUGS = new Set([
  "",
  "/",
  "inicio",
  "inscricao",
  "alunos-em-cena",
  "sobre",
  "diferenciais",
  "modulos",
  "faq",
  "gringo",
  "gringo.exe",
  "mentoria-ruptura",
  "afiliados",
  "links",
  "links-afiliados",
  "workshop-cinema-ia",
  "pagina",
  "nova"
]);

/**
 * Função utilitária para buscar um afiliado por qualquer slug ou alias
 */
export function findAffiliate(key?: string | null): Affiliate | undefined {
  if (!key) return undefined;
  
  // Remove hash, query strings, barras iniciais/finais e espaços
  let raw = key.trim();
  if (raw.includes("?")) raw = raw.split("?")[0];
  if (raw.includes("#")) raw = raw.split("#")[0];
  raw = raw.replace(/^#\/?/, "").replace(/^\/+/, "").replace(/\/+$/, "").replace(/^@/, "");
  
  if (!raw || RESERVED_PAGE_SLUGS.has(raw.toLowerCase())) {
    return undefined;
  }

  const cleanKey = raw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  return AFFILIATES_LIST.find((aff) => {
    if (aff.id.toLowerCase() === cleanKey) return true;
    if (aff.aliases?.some((a) => a.toLowerCase() === cleanKey)) return true;
    // Comparações adicionais para compatibilidade
    const slugFromName = aff.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const compactedName = aff.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
    if (slugFromName === cleanKey || compactedName === cleanKey) return true;
    return false;
  });
}

const STORAGE_KEY = "cinema_com_ia_active_affiliate";

/**
 * Resolve o afiliado ativo verificando todas as fontes possíveis:
 * 1. Parâmetro de rota do React Router
 * 2. Hash da URL (ex: #/jose-carlos)
 * 3. Pathname da URL (ex: /jose-carlos)
 * 4. Query strings (ex: ?ref=jose-carlos ou #/?ref=jose-carlos)
 * 5. Armazenamento persistente (sessionStorage/localStorage) para não perder em scrolls ou navegações
 */
export function resolveActiveAffiliate(candidateParam?: string): Affiliate | undefined {
  if (typeof window === "undefined") {
    return findAffiliate(candidateParam);
  }

  // 1. Verificar candidato direto passado pela rota (useParams)
  if (candidateParam && !RESERVED_PAGE_SLUGS.has(candidateParam.toLowerCase())) {
    const matched = findAffiliate(candidateParam);
    if (matched) {
      try {
        sessionStorage.setItem(STORAGE_KEY, matched.id);
        localStorage.setItem(STORAGE_KEY, matched.id);
      } catch {
        // Ignora erros de storage em ambientes restritos
      }
      return matched;
    }
  }

  // 2. Verificar query string na URL principal (?ref= ou ?afiliado=)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryRef = searchParams.get("ref") || searchParams.get("afiliado") || searchParams.get("aff");
    if (queryRef) {
      const matched = findAffiliate(queryRef);
      if (matched) {
        sessionStorage.setItem(STORAGE_KEY, matched.id);
        localStorage.setItem(STORAGE_KEY, matched.id);
        return matched;
      }
    }
  } catch {}

  // 3. Verificar hash (ex: #/jose-carlos ou #/jose-carlos?ref=... ou #/?ref=jose-carlos)
  try {
    const hash = window.location.hash;
    if (hash) {
      // Caso tenha query dentro do hash (ex: #/?ref=...)
      if (hash.includes("?")) {
        const hashQuery = hash.split("?")[1];
        const hashParams = new URLSearchParams(hashQuery);
        const hashRef = hashParams.get("ref") || hashParams.get("afiliado");
        if (hashRef) {
          const matched = findAffiliate(hashRef);
          if (matched) {
            sessionStorage.setItem(STORAGE_KEY, matched.id);
            localStorage.setItem(STORAGE_KEY, matched.id);
            return matched;
          }
        }
      }

      // Segmento de rota dentro do hash (ex: #/jose-carlos)
      const cleanHashPath = hash.split("?")[0].replace(/^#\/?/, "").split("/")[0];
      if (cleanHashPath && !RESERVED_PAGE_SLUGS.has(cleanHashPath.toLowerCase())) {
        const matched = findAffiliate(cleanHashPath);
        if (matched) {
          sessionStorage.setItem(STORAGE_KEY, matched.id);
          localStorage.setItem(STORAGE_KEY, matched.id);
          return matched;
        }
      }
    }
  } catch {}

  // 4. Verificar pathname da URL (caso o lead entre sem hashtag: /jose-carlos)
  try {
    const pathname = window.location.pathname;
    if (pathname && pathname !== "/") {
      const cleanPath = pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/")[0];
      if (cleanPath && !RESERVED_PAGE_SLUGS.has(cleanPath.toLowerCase())) {
        const matched = findAffiliate(cleanPath);
        if (matched) {
          sessionStorage.setItem(STORAGE_KEY, matched.id);
          localStorage.setItem(STORAGE_KEY, matched.id);
          return matched;
        }
      }
    }
  } catch {}

  // 5. Se não encontrou na URL atual, mas o candidato for um slug reservado (como "inscricao"),
  // recupera da sessão para manter a comissão do afiliado
  try {
    const savedId = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (savedId) {
      const matched = findAffiliate(savedId);
      if (matched) return matched;
    }
  } catch {}

  return undefined;
}

/**
 * Mapa rápido de busca para lookup imediato
 */
export const AFFILIATE_LINKS_MAP: Record<string, string> = AFFILIATES_LIST.reduce((acc, aff) => {
  acc[aff.id] = aff.checkoutUrl;
  if (aff.aliases) {
    aff.aliases.forEach((alias) => {
      acc[alias] = aff.checkoutUrl;
    });
  }
  return acc;
}, {} as Record<string, string>);
