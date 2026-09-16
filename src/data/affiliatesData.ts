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
    id: "hector",
    name: "Hector",
    checkoutUrl: "https://pay.hotmart.com/P105490527D?sck=HOTMART_PRODUCT_PAGE&off=iu9mfsa8&hotfeature=32",
    aliases: ["hector-hotmart"]
  },
  {
    id: "joao",
    name: "João",
    checkoutUrl: "https://pay.hotmart.com/L105489426U?sck=HOTMART_PRODUCT_PAGE&off=mlgsu0ic&hotfeature=32",
    aliases: ["joaohotmart"]
  }
];

export const DEFAULT_CHECKOUT_LINK = "https://pay.hotmart.com/P105490527D?checkoutMode=10";

/**
 * Função utilitária para buscar um afiliado por qualquer slug ou alias
 */
export function findAffiliate(key?: string | null): Affiliate | undefined {
  if (!key) return undefined;
  const cleanKey = key.trim().toLowerCase().replace(/^@/, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
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
