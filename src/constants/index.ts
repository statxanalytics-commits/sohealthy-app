export const Colors = {
  pine: '#1B3F2F',
  pine2: '#2a5a45',
  alabaster: '#ECEFE8',
  aloe: '#71B5A2',
  goji: '#B74949',
  turmeric: '#D58D3C',
  white: '#FFFFFF',
  border: '#D5DDD0',
  surface: '#F5F7F2',
  muted: '#6B7F72',
  mutedLight: 'rgba(107,127,114,0.5)',
  pineLight: 'rgba(27,63,47,0.08)',
  aloeLight: 'rgba(113,181,162,0.15)',
  overlay: 'rgba(27,63,47,0.6)',
}

export const Fonts = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semiBold: 'DMSans_600SemiBold',
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
}

// Product images from sohealthy.al CDN
export const ProductImages: Record<string, string> = {
  'detox-shot': 'https://sohealthy.al/wp-content/uploads/2022/04/upscalemedia-transformed-2.png',
  'detox-2': 'https://sohealthy.al/wp-content/uploads/2024/08/upscalemedia-transformed.png',
  'green-shot': 'https://sohealthy.al/wp-content/uploads/2024/09/upscalemedia-transformed-5.png',
  'berry-bliss': 'https://sohealthy.al/wp-content/uploads/2024/08/upscalemedia-transformed-4.png',
  'g1': 'https://sohealthy.al/wp-content/uploads/2026/05/upscalemedia-transformed-2.png',
  'nf01': 'https://sohealthy.al/wp-content/uploads/2026/05/upscalemedia-transformed-3.png',
  'metabolic': 'https://sohealthy.al/wp-content/uploads/2026/05/upscalemedia-transformed-4.png',
  'aloe-shot': 'https://sohealthy.al/wp-content/uploads/2026/05/upscalemedia-transformed-5.png',
}

export const LOGO = 'https://sohealthy.al/wp-content/uploads/2026/01/icon-light-scaled.jpeg'

// Product config — notification times and guide content
export const PRODUCTS: Record<string, {
  name: string
  slug: string
  notif_time_1: string
  notif_time_2?: string
  notif_message_1: string
  notif_message_2?: string
  storage: string
  how: string
  when: string
  combo?: string
  plan_days?: number
  icon: string
}> = {
  'detox-shot': {
    name: 'Detox Shot',
    slug: 'detox-shot',
    notif_time_1: '07:00',
    notif_message_1: 'Koha për Detox Shot 🌿 — stomak bosh, 15 min para mëngjesit',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: 'Çdo mëngjes stomak bosh, 15–20 min para ngrënies',
    combo: 'Detox mëngjes + Green Shot 20 min para drekës',
    icon: '🌿',
  },
  'detox-2': {
    name: 'Detox 2.0',
    slug: 'detox-2',
    notif_time_1: '07:00',
    notif_message_1: 'Detox 2.0 — stomak bosh, tunde mirë para se ta pish! ⚡',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: 'Çdo mëngjes stomak bosh, 15–20 min para ngrënies',
    icon: '⚡',
  },
  'green-shot': {
    name: 'Green Shot',
    slug: 'green-shot',
    notif_time_1: '12:30',
    notif_message_1: 'Green Shot 💚 — 20 min para drekës!',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: '20 min para drekës',
    icon: '💚',
  },
  'berry-bliss': {
    name: 'Berry Bliss',
    slug: 'berry-bliss',
    notif_time_1: '07:00',
    notif_message_1: 'Berry Bliss 🫐 — stomak bosh çdo mëngjes!',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: 'Çdo mëngjes stomak bosh',
    icon: '🫐',
  },
  'aloe-shot': {
    name: 'Aloe Shot',
    slug: 'aloe-shot',
    notif_time_1: '07:00',
    notif_message_1: 'Aloe Shot 🌵 — stomak bosh çdo mëngjes!',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: 'Çdo mëngjes stomak bosh',
    icon: '🌵',
  },
  'metabolic-shot': {
    name: 'Metabolic Shot',
    slug: 'metabolic-shot',
    notif_time_1: '07:15',
    notif_message_1: 'Metabolic Shot ⚡ — stomak bosh çdo mëngjes!',
    storage: 'Ruaje në frigorifer, 2–6°C. Pas hapjes konsumoje brenda ditës.',
    how: '1 shishe 50ml — tunde mirë para se ta pish',
    when: 'Çdo mëngjes stomak bosh',
    icon: '🔥',
  },
  'g1': {
    name: 'G1 Sachet',
    slug: 'g1',
    notif_time_1: '07:30',
    notif_message_1: 'G1 — mëngjesi yt 💚 — 1 qeskë në 250ml ujë',
    storage: 'Vend i thatë dhe i freskët — jo në frigorifer.',
    how: '1 qeskë në 250ml ujë — tunde mirë në shaker',
    when: 'Çdo mëngjes, si zëvendësim i mëngjesit',
    plan_days: 14,
    icon: '🌿',
  },
  'fiber-plus': {
    name: 'Fiber+',
    slug: 'fiber-plus',
    notif_time_1: '09:00',
    notif_message_1: 'Fiber+ 🌾 — 1 qeskë në 250ml ujë, 1 orë para ose pas ngrënies',
    storage: 'Vend i thatë dhe i freskët — jo në frigorifer.',
    how: '1 qeskë në 250ml ujë',
    when: '1 orë para ose pas ngrënies',
    icon: '🌾',
  },
  'nf01': {
    name: 'NF-01',
    slug: 'nf01',
    notif_time_1: '20:00',
    notif_message_1: 'NF-01 — darkën e ke gati 🌙 — zëvendëso darkën',
    storage: 'Vend i thatë dhe i freskët — jo në frigorifer.',
    how: '1 qeskë në 250ml ujë — zëvendëso darkën',
    when: 'Darkë — në vend të vaktit të darkës',
    plan_days: 14,
    icon: '🌙',
  },
  'green-organics': {
    name: 'Green Organics',
    slug: 'green-organics',
    notif_time_1: '07:00',
    notif_time_2: '19:30',
    notif_message_1: 'Green Sunrise ☀️ — zëvendëso mëngjesin, 300-400ml ujë + shaker',
    notif_message_2: 'Reds 🌙 — zëvendëso darkën, 300-400ml ujë + shaker',
    storage: 'Vend i thatë dhe i freskët — jo në frigorifer.',
    how: 'Green Sunrise: 300-400ml ujë + shaker (mëngjes). Reds: 300-400ml ujë + shaker (darkë)',
    when: 'Green Sunrise zëvendëson mëngjesin, Reds zëvendëson darkën',
    icon: '🌱',
  },
}

// Vercel API endpoints (existing backends)
export const API = {
  scanner: 'https://project-iaeqw.vercel.app/api/analyze',
  diet: 'https://sohealthy-diet.vercel.app/api/generate-diet',
  dietValidate: 'https://sohealthy-diet.vercel.app/api/validate-code',
  quiz: 'https://sohealthy.al/quiz',
  challenge: 'https://index-blush-phi.vercel.app',
  calculator: 'https://kalkulatori-zeta.vercel.app',
  bodyCalc: 'https://llogaritje-trupi.vercel.app',
}
