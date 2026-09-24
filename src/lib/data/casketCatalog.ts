// ============================================================================
// MASTER UNIFIED CASKET & MERCHANDISE CATALOG
// Connects Batesville Casket Company & Milso Industry into BFH Contract Engine
// Provides automatic pricing, material specs, and formatted display options
// ============================================================================

import { BATESVILLE_CASKETS, BatesvilleCasketItem } from './batesvilleCatalog';
import { MILSO_CASKETS, MilsoCasketItem } from './milsoCatalog';

export { BATESVILLE_CASKETS, MILSO_CASKETS };
export type { BatesvilleCasketItem, MilsoCasketItem };

export type ManufacturerFilter = 'all' | 'batesville' | 'milso';

export interface UnifiedMerchandiseItem {
  id: string;
  supplier: 'Batesville Casket Company' | 'Milso Industry';
  modelCodeOrNumber: string;
  nameOrDescription: string;
  material: string;
  interior: string;
  price: number;
  displayText: string;
  category: string;
  productType: string;
  availability?: string;
}

// Convert Batesville items to unified interface
const normalizedBatesville: UnifiedMerchandiseItem[] = BATESVILLE_CASKETS.map((b) => ({
  id: b.id,
  supplier: 'Batesville Casket Company',
  modelCodeOrNumber: b.itemNumber,
  nameOrDescription: b.productDescription,
  material: b.materialSpeciesOrGauge,
  interior: b.interiorSummary,
  price: b.proposedDisplayPrice,
  displayText: b.displayText, // Milso: Item Name, Current Price | Batesville: Item number, Product Description, Proposed Display Price
  category: b.materialGroup,
  productType: b.productType,
  availability: b.availabilityStatus
}));

// Convert Milso items to unified interface
const normalizedMilso: UnifiedMerchandiseItem[] = MILSO_CASKETS.map((m) => ({
  id: m.id,
  supplier: 'Milso Industry',
  modelCodeOrNumber: m.itemCode,
  nameOrDescription: m.itemName,
  material: `${m.category} (${m.exteriorFinish})`,
  interior: m.interiorMaterial,
  price: m.currentPrice,
  displayText: m.displayText, // Milso: Item Name, Current Price | Batesville: Item number, Product Description, Proposed Display Price
  category: m.category,
  productType: m.productType,
  availability: 'Standard Delivery'
}));

export const ALL_UNIFIED_MERCHANDISE: UnifiedMerchandiseItem[] = [
  ...normalizedBatesville,
  ...normalizedMilso
];

// Helper functions for filtering and searching
export function getMerchandiseByManufacturer(
  manufacturer: ManufacturerFilter,
  typeFilter: 'all' | 'casket' | 'urn' = 'all'
): UnifiedMerchandiseItem[] {
  let items = ALL_UNIFIED_MERCHANDISE;
  if (manufacturer === 'batesville') {
    items = items.filter((i) => i.supplier === 'Batesville Casket Company');
  } else if (manufacturer === 'milso') {
    items = items.filter((i) => i.supplier === 'Milso Industry');
  }

  if (typeFilter === 'casket') {
    items = items.filter((i) => i.productType !== 'urn_keepsake' && i.productType !== 'accessory');
  } else if (typeFilter === 'urn') {
    items = items.filter((i) => i.productType === 'urn_keepsake' || i.category.toLowerCase().includes('urn'));
  }

  return items;
}

export function searchMerchandise(
  query: string,
  manufacturer: ManufacturerFilter = 'all',
  typeFilter: 'all' | 'casket' | 'urn' = 'all'
): UnifiedMerchandiseItem[] {
  const list = getMerchandiseByManufacturer(manufacturer, typeFilter);
  if (!query || !query.trim()) return list;

  const q = query.toLowerCase().trim();
  return list.filter((item) =>
    item.nameOrDescription.toLowerCase().includes(q) ||
    item.modelCodeOrNumber.toLowerCase().includes(q) ||
    item.material.toLowerCase().includes(q) ||
    item.interior.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.displayText.toLowerCase().includes(q)
  );
}
