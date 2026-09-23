export type FloralCategory = 'casket_spray' | 'wreath' | 'standing_spray' | 'basket';


export type FloralSize = 'small' | 'medium' | 'large';

export interface BFHFloralProduct {
  code: string;
  name: string;
  category: FloralCategory;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  pricing: {
    small: number;
    medium: number;
    large: number;
  };
  dimensions: {
    small: string;
    medium: string;
    large: string;
  };
}

export const BFH_FLORAL_CATEGORIES: Array<{ id: FloralCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All Floral Categories (24)' },
  { id: 'casket_spray', label: 'Casket Sprays (Small $300 / Med $350 / Lrg $400)' },
  { id: 'wreath', label: 'Standing Wreaths & Tribute Circles' },
  { id: 'standing_spray', label: 'Standing Easel Sprays & Fans' },
  { id: 'basket', label: 'Altar Baskets & Pedestal Tributes' }
];

export const BFH_FLORAL_CATALOG: BFHFloralProduct[] = [
  // 1. Casket Sprays (Standardized BFH Casket Spray Pricing: Small $300, Med $350, Lrg $400)
  {
    code: 'BFH-CC-005',
    name: 'Spring Pastel Garden Casket Spray',
    category: 'casket_spray',
    categoryLabel: 'Casket Spray',
    description: 'Delicate and warm full casket spray featuring blush pink roses, soft yellow snapdragons, lavender blooms, and satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_005.jpg',
    pricing: { small: 300, medium: 350, large: 400 },
    dimensions: { small: '36" Half Casket', medium: '48" Full Casket', large: '60" Grand Full Casket' }
  },
  {
    code: 'BFH-CC-009',
    name: 'Tangerine Sunset & Oriental Lily Casket Spray',
    category: 'casket_spray',
    categoryLabel: 'Casket Spray',
    description: 'Warm and radiant casket spray with vivid tangerine roses, fragrant white oriental lilies, and rich emerald foliage.',
    imageUrl: '/images/florals/bfh_cc_009.jpg',
    pricing: { small: 300, medium: 350, large: 400 },
    dimensions: { small: '36" Half Casket', medium: '48" Full Casket', large: '60" Grand Full Casket' }
  },
  {
    code: 'BFH-CC-0016',
    name: 'Grand Rose & Carnation Pink Casket Blanket',
    category: 'casket_spray',
    categoryLabel: 'Casket Spray',
    description: 'Luxurious casket spray of premium pink roses, carnations, white snapdragons, and grand satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_0016.jpg',
    pricing: { small: 300, medium: 350, large: 400 },
    dimensions: { small: '36" Half Casket', medium: '48" Full Casket', large: '60" Grand Full Casket' }
  },

  // 2. Standing Wreaths & Tribute Circles
  {
    code: 'BFH-CC-001',
    name: 'Patriotic Tricolor Standing Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Vibrant standing wreath composed of red, white, and royal blue roses with custom tricolor ribbon sash.',
    imageUrl: '/images/florals/bfh_cc_001.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0002',
    name: 'Crimson & Pearl Rose Devotion Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Lush round standing wreath featuring deep red and white roses with baby\'s breath and crimson satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_0002.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0003',
    name: 'Royal Sapphire Blue Rose Standing Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Regal solid arrangement of deep royal blue roses with lush fern accents and royal blue ribbon sash.',
    imageUrl: '/images/florals/bfh_cc_0003.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-006',
    name: 'Solid Crimson Red Rose Tribute Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Solid full ring of premium crimson roses framed with emerald palm foliage and custom gold-embossed ribbon.',
    imageUrl: '/images/florals/bfh_cc_006.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-008',
    name: 'Royal Blue & Ivory Peace Standing Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Two-tone standing tribute wreath of royal blue roses and ivory spray blossoms with personalized white ribbon.',
    imageUrl: '/images/florals/bfh_cc_008.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0010',
    name: 'Eternal Indigo & White Devotion Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Dense circular wreath of deep indigo blue roses paired with white blooms and "To Our Beloved" sash.',
    imageUrl: '/images/florals/bfh_cc_0010.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0011',
    name: 'Lavender Orchid & Stargazer Mother\'s Tribute',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Exquisite standing wreath with pink stargazers, dendrobium orchids, and purple blooms with "Beloved Mother" ribbon.',
    imageUrl: '/images/florals/bfh_cc_0011.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0012',
    name: 'Sapphire & Gardenia Standing Circle',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Full circular wreath composed of brilliant sapphire blue roses and white gardenia-style blossoms.',
    imageUrl: '/images/florals/bfh_cc_0012.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0013',
    name: 'Royal Azure Oval Standing Tribute',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Oval standing wreath featuring ivory roses surrounded by an azure blue rose rim and royal blue ribbon.',
    imageUrl: '/images/florals/bfh_cc_0013.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0014',
    name: 'Pure White Rose & Emerald Honor Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Dense wreath of pure white roses and emerald greens with custom green ribbon ("Beloved Son And Brother").',
    imageUrl: '/images/florals/bfh_cc_0014.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0017',
    name: 'Bright Citrus Orange & Blue Blossom Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Vivid and celebratory tribute wreath with bright orange gerberas, blue blossoms, and orange satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_0017.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0018',
    name: 'Heavenly Blue & Ivory Rose Standing Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Soothing standing wreath of white roses, soft baby blue petals, and powder blue satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_0018.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0019',
    name: 'Golden Peach Rose Celebration Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Warm and elegant standing wreath of peach and champagne roses accented by a golden satin bow.',
    imageUrl: '/images/florals/bfh_cc_0019.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0020',
    name: 'Sunrise Gold, Azure & Lily Tribute Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Multi-tonal wreath with yellow roses, white lilies, and cobalt blue blossoms with blue ribbon.',
    imageUrl: '/images/florals/bfh_cc_0020.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0022',
    name: 'Burgundy Velvet & Baby\'s Breath Standing Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Rich deep burgundy roses clustered with delicate baby\'s breath and crimson ribbon.',
    imageUrl: '/images/florals/bfh_cc_0022.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0023',
    name: 'Majestic Purple & Lavender Garden Wreath',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Rich tapestry of purple tea roses, lavender blooms, pink accents, and rose-pink satin ribbon.',
    imageUrl: '/images/florals/bfh_cc_0023.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },
  {
    code: 'BFH-CC-0024',
    name: 'Imperial Grand Red Rose Wreath on Palm Fronds',
    category: 'wreath',
    categoryLabel: 'Standing Wreath',
    description: 'Full circle of 100+ crimson roses layered against a sunburst of emerald palm fronds with red ribbon.',
    imageUrl: '/images/florals/bfh_cc_0024.jpg',
    pricing: { small: 250, medium: 325, large: 395 },
    dimensions: { small: '20" Wreath on 54" Easel', medium: '24" Wreath on 60" Easel', large: '30" Deluxe on 66" Easel' }
  },

  // 3. Standing Sprays & Fans
  {
    code: 'BFH-CC-007',
    name: 'Sunshine Serenity Fan Spray',
    category: 'standing_spray',
    categoryLabel: 'Standing Spray',
    description: 'Uplifting standing spray of vibrant yellow gerbera daisies, white snapdragons, lilies, and yellow/white ribbon.',
    imageUrl: '/images/florals/bfh_cc_007.jpg',
    pricing: { small: 225, medium: 295, large: 375 },
    dimensions: { small: '36" Fan on 54" Easel', medium: '42" Fan on 60" Easel', large: '48" Grand on 66" Easel' }
  },
  {
    code: 'BFH-CC-0015',
    name: 'Graceful White Lily & Rose Fan Spray',
    category: 'standing_spray',
    categoryLabel: 'Standing Spray',
    description: 'Classic funeral standing spray with white oriental lilies, white roses, and emerald palm fronds.',
    imageUrl: '/images/florals/bfh_cc_0015.jpg',
    pricing: { small: 225, medium: 295, large: 375 },
    dimensions: { small: '36" Fan on 54" Easel', medium: '42" Fan on 60" Easel', large: '48" Grand on 66" Easel' }
  },
  {
    code: 'BFH-CC-0021',
    name: 'Blush Rose & White Lily Standing Spray',
    category: 'standing_spray',
    categoryLabel: 'Standing Spray',
    description: 'Delicate fan-shaped standing spray of pink roses, white lilies, snapdragons, and pink ribbon.',
    imageUrl: '/images/florals/bfh_cc_0021.jpg',
    pricing: { small: 225, medium: 295, large: 375 },
    dimensions: { small: '36" Fan on 54" Easel', medium: '42" Fan on 60" Easel', large: '48" Grand on 66" Easel' }
  },

  // 4. Baskets & Altar Tributes
  {
    code: 'BFH-CC-004',
    name: 'Crimson Radiance Standing Pedestal Basket (BFH-BASK-011)',
    category: 'basket',
    categoryLabel: 'Altar Basket',
    description: 'Classic red roses, white gladioli accents, and lush greenery with bold red ribbon for altar presentation.',
    imageUrl: '/images/florals/bfh_cc_004.jpg',
    pricing: { small: 175, medium: 225, large: 295 },
    dimensions: { small: '28" High Basket', medium: '36" High Pedestal Basket', large: '44" Grand Altar Basket' }
  }
];

export function getFloralByCode(code: string): BFHFloralProduct | undefined {
  return BFH_FLORAL_CATALOG.find(f => f.code.toLowerCase() === code.toLowerCase());
}

export function calculateFloralPrice(code: string, size: FloralSize): number {
  const item = getFloralByCode(code);
  if (!item) return 300;
  return item.pricing[size] || item.pricing.medium;
}
