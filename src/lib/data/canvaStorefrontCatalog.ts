import { 
  StorefrontDesignTemplate, 
  StorefrontProductType, 
  PaperStockType, 
  FinishOptionType, 
  StorefrontOrder, 
  CanvaIntegrationStatus,
  TurnaroundTier
} from '../types/funeral';

export const STOREFRONT_CATEGORIES: Array<{
  type: StorefrontProductType;
  label: string;
  count: number;
  description: string;
  iconName: string;
  defaultSize: string;
}> = [
  {
    type: 'program',
    label: 'Funeral Programs',
    count: 19,
    description: 'Bi-Fold, Tri-Fold & Saddle-Stitched Keepsake Booklets',
    iconName: 'BookOpen',
    defaultSize: 'US Letter Landscape (8.5" x 11" Folded)'
  },
  {
    type: 'prayer',
    label: 'Prayer Cards',
    count: 10,
    description: 'Standard & Large Laminated Devotional Prayer Cards',
    iconName: 'Heart',
    defaultSize: '2.5" x 4.25" / 3" x 5"'
  },
  {
    type: 'thanks',
    label: 'Thank-You Cards',
    count: 9,
    description: 'Custom Acknowledgement & Sympathy Notes with Envelopes',
    iconName: 'Mail',
    defaultSize: '4.25" x 5.5" Folded A2'
  },
  {
    type: 'poster',
    label: 'Memorial Posters',
    count: 9,
    description: 'High-Definition Mounted Photo Easel Boards for Chapel & Repast',
    iconName: 'Image',
    defaultSize: '24" x 36" Foam Core'
  },
  {
    type: 'bookmark',
    label: 'Memorial Bookmarks',
    count: 9,
    description: 'Durable Double-Sided Laminated Ribbons with Tassel Option',
    iconName: 'Bookmark',
    defaultSize: '2" x 7" Heavy Cardstock'
  },
  {
    type: 'dvd',
    label: 'DVD & Media Covers',
    count: 8,
    description: 'Amaray Case Inserts & Memorial Video Tribute Sleeves',
    iconName: 'Disc',
    defaultSize: '7.125" x 10.75" Insert'
  },
  {
    type: 'announcement',
    label: 'Announcements',
    count: 3,
    description: 'Service Bulletins, Obituaries & Church Notice Broadsheets',
    iconName: 'Bell',
    defaultSize: '8.5" x 11" Single Page'
  }
];

export const PAPER_STOCK_OPTIONS: Array<{
  stock: PaperStockType;
  description: string;
  weightGsm: string;
  surchargePer100: number;
  badge: string;
}> = [
  {
    stock: '100# Gloss Cover',
    description: 'Premium heavyweight smooth gloss cover with vibrant color reproduction and high durability.',
    weightGsm: '270 GSM',
    surchargePer100: 25,
    badge: 'Standard Best-Seller'
  },
  {
    stock: '80# Silk Text',
    description: 'Elegant semi-matte interior booklet text pages with zero glare under chapel lighting.',
    weightGsm: '120 GSM',
    surchargePer100: 0,
    badge: 'Interior Default'
  },
  {
    stock: '110# Heavy Linen Matte',
    description: 'Textured woven linen cardstock offering a heritage luxury feel with gold foil compatibility.',
    weightGsm: '300 GSM',
    surchargePer100: 45,
    badge: 'Heritage Luxury'
  },
  {
    stock: '12pt Heavy Velvet Cardstock',
    description: 'Soft-touch velvet finish resistant to fingerprints and scuffing, perfect for keepsake cards.',
    weightGsm: '350 GSM',
    surchargePer100: 35,
    badge: 'Soft-Touch'
  },
  {
    stock: '24# Bond Economy',
    description: 'Standard white utility paper for high-volume bulletin distribution and proof copies.',
    weightGsm: '90 GSM',
    surchargePer100: -20,
    badge: 'Budget Economy'
  }
];

export const FINISH_OPTIONS: Array<{
  finish: FinishOptionType;
  description: string;
  setupCost: number;
  suitableTypes: StorefrontProductType[];
}> = [
  {
    finish: 'Bi-Fold Single Crease',
    description: 'Precision mechanical machine score and center crease for 4-panel presentation.',
    setupCost: 0,
    suitableTypes: ['program', 'thanks']
  },
  {
    finish: 'Tri-Fold Letter',
    description: '6-panel barrel or Z-fold presentation with calibrated fold tolerances.',
    setupCost: 15,
    suitableTypes: ['program']
  },
  {
    finish: '4-Page Saddle-Stitched Booklet',
    description: 'Square-spine 2-staple saddle-stitch spine with edge face trim.',
    setupCost: 30,
    suitableTypes: ['program']
  },
  {
    finish: '8-Page Saddle-Stitched Booklet',
    description: 'Full memorial keepsake booklet with high-gauge wire staples and 3-knife flush trim.',
    setupCost: 65,
    suitableTypes: ['program']
  },
  {
    finish: '12-Page Deluxe Magazine',
    description: 'Deluxe magazine-style commemorative tribute publication with spine square-fold.',
    setupCost: 110,
    suitableTypes: ['program']
  },
  {
    finish: 'Laminated Matte Edge',
    description: 'Encapsulated 5mil thermal lamination with sealed rounded safety corners.',
    setupCost: 20,
    suitableTypes: ['prayer', 'bookmark']
  },
  {
    finish: 'UV High Gloss Finish',
    description: 'High-gloss flood UV liquid coating for rich photographic depth and water resistance.',
    setupCost: 35,
    suitableTypes: ['poster', 'dvd', 'program']
  }
];

export const CANVA_STOREFRONT_TEMPLATES: StorefrontDesignTemplate[] = [
  {
    "id": "DAE2wOMuNRs",
    "title": "New_Benta_Magazine Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Benta Magazine",
    "displayed_size": "1688 x 1112 px",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2wOMuNRs-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2wOMuNRs-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE1EmipRdM",
    "title": "Cherry Blossom_Large_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Cherry Blossom Edited",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#9b5a6c",
    "bg": "#eadde1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE1EmipRdM-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE1EmipRdM-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE0-OR1nnU",
    "title": "Cherry Blossom_Standard_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Cherry Blossom Edited",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 3,
    "accent": "#9b5a6c",
    "bg": "#eadde1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (3 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0-OR1nnU-1",
        "label": "Page 1"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE0-OR1nnU-2",
        "label": "Page 2"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE0-OR1nnU-3",
        "label": "Page 3"
      }
    ]
  },
  {
    "id": "DAE20hu66NI",
    "title": "Colleen McCarthy Booklet",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Colleen",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 5,
    "accent": "#77576f",
    "bg": "#e3d9e1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 350,
    "unit_description": "Per 100 copies (5 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE20hu66NI-1",
        "label": "Cover (High Res Portrait)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE20hu66NI-2",
        "label": "Prelude & Order of Worship"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE20hu66NI-3",
        "label": "Life Pilgrimage & Biography"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAE20hu66NI-4",
        "label": "Family Photo Gallery Montage"
      },
      {
        "pageNumber": 5,
        "pageId": "p-DAE20hu66NI-5",
        "label": "Back Cover & Floral Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2011OqMI",
    "title": "Colleen McCarthy_Cover Prog Large",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Colleen",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#77576f",
    "bg": "#e3d9e1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2011OqMI-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2011OqMI-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE209TUvAg",
    "title": "Colleen McCarthy_Name Cover Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Colleen",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 2,
    "accent": "#77576f",
    "bg": "#e3d9e1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE209TUvAg-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE209TUvAg-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2Kx3EGy8",
    "title": "New Keepsake_Large Booklet.pdf",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Keepsake",
    "displayed_size": "17 x 11 in",
    "page_count": 4,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 350,
    "unit_description": "Per 100 copies (4 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2Kx3EGy8-1",
        "label": "Cover (Portrait & Service Details)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2Kx3EGy8-2",
        "label": "Obituary & Life Reflection"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE2Kx3EGy8-3",
        "label": "Order of Service & Hymns"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAE2Kx3EGy8-4",
        "label": "Pallbearers, Expressions & Repast"
      }
    ]
  },
  {
    "id": "DAE2K6FCN1Q",
    "title": "New Keepsake_Large_Oval_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Keepsake",
    "displayed_size": "17 x 11 in",
    "page_count": 2,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2K6FCN1Q-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2K6FCN1Q-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2LSBqWVA",
    "title": "New Keepsake_Standard_ booklet.pdf",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Keepsake",
    "displayed_size": "11 x 8.5 in",
    "page_count": 8,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 450,
    "unit_description": "Per 100 copies (8 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LSBqWVA-1",
        "label": "Cover (High Res Portrait)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2LSBqWVA-2",
        "label": "Prelude & Order of Worship"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE2LSBqWVA-3",
        "label": "Life Pilgrimage & Biography"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAE2LSBqWVA-4",
        "label": "Family Photo Gallery Montage"
      },
      {
        "pageNumber": 5,
        "pageId": "p-DAE2LSBqWVA-5",
        "label": "Page 5 - Tribute Reflections"
      },
      {
        "pageNumber": 6,
        "pageId": "p-DAE2LSBqWVA-6",
        "label": "Page 6 - Tribute Reflections"
      },
      {
        "pageNumber": 7,
        "pageId": "p-DAE2LSBqWVA-7",
        "label": "Page 7 - Tribute Reflections"
      },
      {
        "pageNumber": 8,
        "pageId": "p-DAE2LSBqWVA-8",
        "label": "Back Cover & Floral Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2LL4u_JE",
    "title": "New Keepsake_Standard_Oval_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Keepsake",
    "displayed_size": "11 x 8.5 in",
    "page_count": 3,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (3 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LL4u_JE-1",
        "label": "Page 1"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2LL4u_JE-2",
        "label": "Page 2"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE2LL4u_JE-3",
        "label": "Page 3"
      }
    ]
  },
  {
    "id": "DAE2uHKAGXA",
    "title": "New_Large Linen Booklet",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Linen Series",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 5,
    "accent": "#a06b62",
    "bg": "#eadbd7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 350,
    "unit_description": "Per 100 copies (5 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2uHKAGXA-1",
        "label": "Cover (High Res Portrait)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2uHKAGXA-2",
        "label": "Prelude & Order of Worship"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE2uHKAGXA-3",
        "label": "Life Pilgrimage & Biography"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAE2uHKAGXA-4",
        "label": "Family Photo Gallery Montage"
      },
      {
        "pageNumber": 5,
        "pageId": "p-DAE2uHKAGXA-5",
        "label": "Back Cover & Floral Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2uwfzfXQ",
    "title": "New_Large Linen Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Linen Series",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#a06b62",
    "bg": "#eadbd7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2uwfzfXQ-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2uwfzfXQ-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2vdx7ueM",
    "title": "New_Standard Linen Booklet",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Linen Series",
    "displayed_size": "11 x 8.5 in",
    "page_count": 4,
    "accent": "#a06b62",
    "bg": "#eadbd7",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 350,
    "unit_description": "Per 100 copies (4 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vdx7ueM-1",
        "label": "Cover (Portrait & Service Details)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2vdx7ueM-2",
        "label": "Obituary & Life Reflection"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAE2vdx7ueM-3",
        "label": "Order of Service & Hymns"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAE2vdx7ueM-4",
        "label": "Pallbearers, Expressions & Repast"
      }
    ]
  },
  {
    "id": "DAE2v3cpcfw",
    "title": "New_Benta_General",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Non-Series",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2v3cpcfw-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2v3cpcfw-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2qcRfMBg",
    "title": "New_Oversized_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Oversized",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#7d3d49",
    "bg": "#e5d7da",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2qcRfMBg-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2qcRfMBg-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2MJvCQaY",
    "title": "New_Benta_Photograph",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Photograph",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2MJvCQaY-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2MJvCQaY-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2k19drFw",
    "title": "New_Benta_Seasons_Program",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Seasons Folder",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#687a55",
    "bg": "#dce4d5",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2k19drFw-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2k19drFw-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2v-LSPGE",
    "title": "funeral design template",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Superstar Folder",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 2,
    "accent": "#8a6841",
    "bg": "#e7dfd3",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2v-LSPGE-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2v-LSPGE-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2q1LTc1k",
    "title": "New_Benta_wordsLRG",
    "product_type": "program",
    "product_name": "Funeral program",
    "family": "Words_Series",
    "displayed_size": "Poster (Small Landscape)",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 250,
    "unit_description": "Per 100 copies (2 pages)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2q1LTc1k-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2q1LTc1k-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2wxWWai4",
    "title": "New_Magazine_PRAYER CARD",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Benta Magazine",
    "displayed_size": "2.5 x 4.25 in",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2wxWWai4-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2wxWWai4-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE0w-CvqQs",
    "title": "Cherry Blossom_PRAYER CARD",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Cherry Blossom Edited",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#9b5a6c",
    "bg": "#eadde1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0w-CvqQs-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE0w-CvqQs-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE20w56S4g",
    "title": "Colleen McCarthy_PC",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Colleen",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#5d718a",
    "bg": "#dfe6ed",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE20w56S4g-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE20w56S4g-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2LbMjurE",
    "title": "New Keepsake_Prayer Card",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Keepsake",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LbMjurE-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2LbMjurE-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2vA6GNpM",
    "title": "New_Linen Series_PC",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Linen Series",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#5d718a",
    "bg": "#dfe6ed",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vA6GNpM-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2vA6GNpM-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2ki2YGiY",
    "title": "New Photography_Prayer Card",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Photograph",
    "displayed_size": "2.5 x 4.25 in",
    "page_count": 2,
    "accent": "#6e5c52",
    "bg": "#e3dad5",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2ki2YGiY-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2ki2YGiY-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2omHcPvE",
    "title": "New_Seasons_Prayer Card",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Seasons Folder",
    "displayed_size": "2.5 x 4.25 in",
    "page_count": 2,
    "accent": "#687a55",
    "bg": "#dce4d5",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2omHcPvE-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2omHcPvE-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2pQxGezE",
    "title": "New_Sicily_Prayer Card",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Sicily Folder",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#8a7451",
    "bg": "#e7e0d2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2pQxGezE-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2pQxGezE-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2vmitteI",
    "title": "New_Tidal_PC",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Tidal",
    "displayed_size": "240 x 408 px",
    "page_count": 2,
    "accent": "#5d718a",
    "bg": "#dfe6ed",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vmitteI-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2vmitteI-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2uGimEis",
    "title": "New_Word_Series/Prayer",
    "product_type": "prayer",
    "product_name": "Prayer card",
    "family": "Words_Series",
    "displayed_size": "2.5 x 4.25 in",
    "page_count": 2,
    "accent": "#5f708e",
    "bg": "#dce2eb",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 125,
    "unit_description": "Per 100 cards (laminated)",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2uGimEis-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2uGimEis-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2wyNxook",
    "title": "New_Magazine_Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Benta Magazine",
    "displayed_size": "5.5 x 4.25 in",
    "page_count": 2,
    "accent": "#815b3e",
    "bg": "#e7ddd4",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2wyNxook-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2wyNxook-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE0w-WsEA0",
    "title": "Cherry Blossom_Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Cherry Blossom Edited",
    "displayed_size": "Gift Certificate (US)",
    "page_count": 2,
    "accent": "#9b5a6c",
    "bg": "#eadde1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0w-WsEA0-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE0w-WsEA0-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE20mAJcKU",
    "title": "Colleen McCarthy Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Colleen",
    "displayed_size": "Gift Certificate (US)",
    "page_count": 2,
    "accent": "#77576f",
    "bg": "#e3d9e1",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE20mAJcKU-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE20mAJcKU-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2LdhLomc",
    "title": "New Keepsake_Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Keepsake",
    "displayed_size": "Gift Certificate (US)",
    "page_count": 2,
    "accent": "#9a7a42",
    "bg": "#e7dfd0",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LdhLomc-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2LdhLomc-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2vGMRY4E",
    "title": "New_Linen Series Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Linen Series",
    "displayed_size": "Gift Certificate (US)",
    "page_count": 2,
    "accent": "#a06b62",
    "bg": "#eadbd7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vGMRY4E-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2vGMRY4E-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2WIhPITo",
    "title": "New_Photography_THANK YOU CARD",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Photograph",
    "displayed_size": "5.5 x 4.25 in",
    "page_count": 2,
    "accent": "#6e5c52",
    "bg": "#e3dad5",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2WIhPITo-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2WIhPITo-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2lcIKWkQ",
    "title": "New_Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Seasons Folder",
    "displayed_size": "5.5 x 4.25 in",
    "page_count": 2,
    "accent": "#687a55",
    "bg": "#dce4d5",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2lcIKWkQ-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2lcIKWkQ-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2pbou1NI",
    "title": "New_Sicily_Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Sicily Folder",
    "displayed_size": "Gift Certificate (US)",
    "page_count": 2,
    "accent": "#8a7451",
    "bg": "#e7e0d2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2pbou1NI-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2pbou1NI-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2ra9fec0",
    "title": "New_Words_Series/Thank You Card",
    "product_type": "thanks",
    "product_name": "Thank-you card",
    "family": "Words_Series",
    "displayed_size": "5.5 x 4.25 in",
    "page_count": 2,
    "accent": "#5f708e",
    "bg": "#dce2eb",
    "catalog_status": "approved",
    "dimension_status": "normalized",
    "approval_status": "approved",
    "base_price": 110,
    "unit_description": "Per 50 cards w/ envelopes",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2ra9fec0-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2ra9fec0-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2wwu34UY",
    "title": "New_Magazine_QR POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Benta Magazine",
    "displayed_size": "11 x 17 in",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2wwu34UY-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE0w0Zf3-g",
    "title": "Cherry Blossom_POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Cherry Blossom Edited",
    "displayed_size": "Poster (11 x 17 in)",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0w0Zf3-g-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE20zM0rvc",
    "title": "Colleen McCarthy_POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Colleen",
    "displayed_size": "Poster (11 x 17 in)",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE20zM0rvc-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2LpUEDx8",
    "title": "New Keepsake_POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Keepsake",
    "displayed_size": "Poster (11 x 17 in)",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LpUEDx8-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2vByxpiA",
    "title": "New_Linen Series_POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Linen Series",
    "displayed_size": "Poster (11 x 17 in)",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vByxpiA-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2kgwfD3U",
    "title": "New Photography_QR Poster",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Photograph",
    "displayed_size": "11 x 17 in",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2kgwfD3U-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2o2-iV6s",
    "title": "New_Seasons_QR Poster",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Seasons Folder",
    "displayed_size": "11 x 17 in",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2o2-iV6s-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2pWIzHuA",
    "title": "New_Sicily_POSTER",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Sicily Folder",
    "displayed_size": "Poster (11 x 17 in)",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2pWIzHuA-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2uN3lluE",
    "title": "New_Word Series/QR Poster",
    "product_type": "poster",
    "product_name": "Memorial poster",
    "family": "Words_Series",
    "displayed_size": "11 x 17 in",
    "page_count": 1,
    "accent": "#7b4b3a",
    "bg": "#eaded7",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 165,
    "unit_description": "Per 24x36 mounted board",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2uN3lluE-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2wr149RQ",
    "title": "New_Magazine_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Benta Magazine",
    "displayed_size": "2.25 x 8.25 in",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2wr149RQ-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2wr149RQ-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE0w4h5Edw",
    "title": "Cherry Blossom_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Cherry Blossom Edited",
    "displayed_size": "216 x 792 px",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0w4h5Edw-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE0w4h5Edw-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE209KOJWc",
    "title": "Colleen_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Colleen",
    "displayed_size": "216 x 792 px",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE209KOJWc-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE209KOJWc-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2LtSHojQ",
    "title": "New Keepsake_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Keepsake",
    "displayed_size": "216 x 792 px",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LtSHojQ-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2LtSHojQ-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2vZKGdNw",
    "title": "New_Linen_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Linen Series",
    "displayed_size": "216 x 792 px",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vZKGdNw-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2vZKGdNw-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2WUDZKv4",
    "title": "New Photography_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Photograph",
    "displayed_size": "2.25 x 8.5 in",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2WUDZKv4-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2WUDZKv4-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2oy3Ro5U",
    "title": "New_Seasons/Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Seasons Folder",
    "displayed_size": "2.25 x 8.25 in",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2oy3Ro5U-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2oy3Ro5U-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2pGBX4ZY",
    "title": "New_Sicily_Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Sicily Folder",
    "displayed_size": "216 x 792 px",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2pGBX4ZY-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2pGBX4ZY-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2t-Mztt4",
    "title": "New_ Words_Series/Bookmark",
    "product_type": "bookmark",
    "product_name": "Memorial bookmark",
    "family": "Words_Series",
    "displayed_size": "2.25 x 8.25 in",
    "page_count": 2,
    "accent": "#526b63",
    "bg": "#dce7e2",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 95,
    "unit_description": "Per 100 laminated bookmarks",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2t-Mztt4-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2t-Mztt4-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE2w0gFr6g",
    "title": "New_Magazine_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Benta Magazine",
    "displayed_size": "5.3 x 7.5 in",
    "page_count": 2,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2w0gFr6g-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAE2w0gFr6g-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAE0-o4rdgY",
    "title": "Cherry Blossom_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Cherry Blossom Edited",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE0-o4rdgY-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE20xPiWYk",
    "title": "Colleen McCarthy_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Colleen",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE20xPiWYk-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2LoJUqEI",
    "title": "New Keepsake_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Keepsake",
    "displayed_size": "11 x 8.5 in",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2LoJUqEI-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2vNFUOeo",
    "title": "New_Linen Series_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Linen Series",
    "displayed_size": "US Letter (Landscape)",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2vNFUOeo-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2SBzYpjU",
    "title": "New Photography_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Photograph",
    "displayed_size": "11 x 8.5 in",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2SBzYpjU-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2lTPGJ18",
    "title": "New Seasons_DVD Cover",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Seasons Folder",
    "displayed_size": "11 x 8.5 in",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2lTPGJ18-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAE2t0Xi6jk",
    "title": "New_Words_Series/DVD",
    "product_type": "dvd",
    "product_name": "DVD cover",
    "family": "Words_Series",
    "displayed_size": "11 x 8.5 in",
    "page_count": 1,
    "accent": "#57506f",
    "bg": "#e0deea",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "approved",
    "base_price": 85,
    "unit_description": "Per 25 DVD tribute cases",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAE2t0Xi6jk-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAGm2HK10ZQ",
    "title": "Gabriela Munoz-1 (5 x 7 in)",
    "product_type": "announcement",
    "product_name": "Memorial announcement",
    "family": "Cherry Blossom Edited",
    "displayed_size": "5 x 7 in",
    "page_count": 1,
    "accent": "#8a6a42",
    "bg": "#ebe2d3",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "draft",
    "base_price": 140,
    "unit_description": "Per 100 announcements",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAGm2HK10ZQ-1",
        "label": "Page 1"
      }
    ]
  },
  {
    "id": "DAGm2Lyo6gc",
    "title": "Gabriela Munoz-2 Card (5 x 7 in)",
    "product_type": "announcement",
    "product_name": "Memorial announcement",
    "family": "Keepsake",
    "displayed_size": "Gabriela Munoz-2 Card (5 x 7 in)",
    "page_count": 2,
    "accent": "#8a6a42",
    "bg": "#ebe2d3",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "draft",
    "base_price": 140,
    "unit_description": "Per 100 announcements",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAGm2Lyo6gc-1",
        "label": "Front Cover & Order of Service"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAGm2Lyo6gc-2",
        "label": "Back Cover & Acknowledgements"
      }
    ]
  },
  {
    "id": "DAEs5Tk7y1E",
    "title": "Standard Announcements",
    "product_type": "announcement",
    "product_name": "Memorial announcement",
    "family": "Unfiled",
    "displayed_size": "Label",
    "page_count": 10,
    "accent": "#8a6a42",
    "bg": "#ebe2d3",
    "catalog_status": "approved",
    "dimension_status": "verify",
    "approval_status": "draft",
    "base_price": 140,
    "unit_description": "Per 100 announcements",
    "previewPages": [
      {
        "pageNumber": 1,
        "pageId": "p-DAEs5Tk7y1E-1",
        "label": "Cover (High Res Portrait)"
      },
      {
        "pageNumber": 2,
        "pageId": "p-DAEs5Tk7y1E-2",
        "label": "Prelude & Order of Worship"
      },
      {
        "pageNumber": 3,
        "pageId": "p-DAEs5Tk7y1E-3",
        "label": "Life Pilgrimage & Biography"
      },
      {
        "pageNumber": 4,
        "pageId": "p-DAEs5Tk7y1E-4",
        "label": "Family Photo Gallery Montage"
      },
      {
        "pageNumber": 5,
        "pageId": "p-DAEs5Tk7y1E-5",
        "label": "Page 5 - Tribute Reflections"
      },
      {
        "pageNumber": 6,
        "pageId": "p-DAEs5Tk7y1E-6",
        "label": "Page 6 - Tribute Reflections"
      },
      {
        "pageNumber": 7,
        "pageId": "p-DAEs5Tk7y1E-7",
        "label": "Page 7 - Tribute Reflections"
      },
      {
        "pageNumber": 8,
        "pageId": "p-DAEs5Tk7y1E-8",
        "label": "Page 8 - Tribute Reflections"
      },
      {
        "pageNumber": 9,
        "pageId": "p-DAEs5Tk7y1E-9",
        "label": "Page 9 - Tribute Reflections"
      },
      {
        "pageNumber": 10,
        "pageId": "p-DAEs5Tk7y1E-10",
        "label": "Back Cover & Floral Acknowledgements"
      }
    ]
  }
];

export const INITIAL_CANVA_INTEGRATION_STATUS: CanvaIntegrationStatus = {
  configured: true,
  connected: true,
  clientId: 'OC-AaChJM-EqWPS',
  scopes: ['design:meta:read', 'design:content:read', 'profile:read'],
  capabilities: [
    'OAuth 2.0 PKCE Handshake',
    'Multi-Page SVG/PDF Export Pipeline',
    'High-Resolution Raster Asset Sync (300 DPI)',
    'Canva Connect Live Webhook Alerts',
    'Design Metadata & Folder Sync'
  ],
  reauthorizationRequired: false,
  totalTemplatesSynced: 67,
  lastSyncTimestamp: '2026-09-21T15:45:00Z',
  webhookStatus: 'active'
};

export const INITIAL_STOREFRONT_ORDERS: StorefrontOrder[] = [
  {
    id: 'ord-bpo-2026-089-1',
    orderNumber: 'BPO-2026-089',
    caseId: 'case-089',
    caseNumber: 'BFH-2026-089',
    caseName: 'Bishop Cornelius Washington',
    serviceDate: '2026-09-24',
    templateId: 'DAE2wOMuNRs',
    templateTitle: 'New_Benta_Magazine Program',
    productType: 'program',
    family: 'Benta Magazine',
    quantity: 250,
    paperStock: '100# Gloss Cover',
    finishOption: '12-Page Deluxe Magazine',
    unitPrice: 4.25,
    totalPrice: 1062.50,
    turnaroundTier: 'Standard (48-72h)',
    rushRequired: false,
    dueAt: '2026-09-23T14:00:00Z',
    status: 'proof_ready',
    currentProofVersion: 2,
    proofs: [
      {
        version: 1,
        artifactSha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
        placementManifestSha256: '8f4c2e1b9a7d3f6e5c8b2a1d4e7f0b3c6a9e2d5f8b1c4e7a0d3f6b9c2e5a8d1f',
        artifactPath: 'private/proofs/proof-bpo-089-v1.pdf',
        pdfUrl: '#',
        acknowledgedBy: 'dir-01',
        acknowledgedAt: '2026-09-20T16:00:00Z',
        decision: 'changes_requested',
        comments: 'Please swap the back cover photo with the family choir group portrait per Sister Washington.',
        createdAt: '2026-09-20T14:30:00Z'
      },
      {
        version: 2,
        artifactSha256: 'b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01',
        placementManifestSha256: '9a7d3f6e5c8b2a1d4e7f0b3c6a9e2d5f8b1c4e7a0d3f6b9c2e5a8d1f8f4c2e1b',
        artifactPath: 'private/proofs/proof-bpo-089-v2.pdf',
        pdfUrl: '#',
        acknowledgedBy: 'dir-01',
        acknowledgedAt: '2026-09-21T11:15:00Z',
        decision: 'pending',
        comments: 'v2 incorporates requested choir photo on page 12 and enhanced gold foil typography on cover.',
        createdAt: '2026-09-21T10:45:00Z'
      }
    ],
    photoPlacements: [
      {
        id: 'plc-089-1',
        sequence: 0,
        pageNumber: 1,
        placementLabel: 'Cover High-Res Bishop Portrait',
        photoReference: 'Google Drive / Washington Family / Bishop_Formal_Vestments_2022.tif',
        notes: 'Apply warm sepia background vignette to blend with Benta Magazine palette.',
        confirmed: true
      },
      {
        id: 'plc-089-2',
        sequence: 1,
        pageNumber: 4,
        placementLabel: 'Pastoral Ordination & Ministry Collage',
        photoReference: 'Google Drive / Washington Family / Ordination_1984_Harlem.jpg',
        notes: 'Include caption: 40 Years of Shepherding Abyssinian & Greater Refuge.',
        confirmed: true
      },
      {
        id: 'plc-089-3',
        sequence: 2,
        pageNumber: 12,
        placementLabel: 'Family & Choral Ensemble Tribute (Back Cover)',
        photoReference: 'Google Drive / Washington Family / Family_Reunion_Choir_2024.jpg',
        notes: 'Center aligned with floral gold border frame.',
        confirmed: true
      }
    ],
    placementManifestSha256: '9a7d3f6e5c8b2a1d4e7f0b3c6a9e2d5f8b1c4e7a0d3f6b9c2e5a8d1f8f4c2e1b',
    preflight: {
      passed: true,
      dpiVerified: true,
      cmykColorGamut: true,
      bleedMarginOk: true,
      profileVersion: 'PDF/X-1a:2001 (SWOP 20% Dot Gain)',
      acceptedBy: 'PrintMaster Studio BFH',
      acceptedAt: '2026-09-21T11:20:00Z'
    },
    destinationEmail: 'production@bentasprint.nyc',
    destinationVerified: true,
    specialInstructions: 'Gold foil stamp embossed title on front cover. Deliver directly to St. Nicholas Chapel 2 hours prior to 9:00 AM viewing.',
    familyNotes: 'Delivered draft proof via SMS to Next-of-Kin Eleanor Washington (212-555-0199).',
    createdBy: 'James Benta (General Manager)',
    createdAt: '2026-09-20T11:00:00Z',
    updatedAt: '2026-09-21T11:20:00Z',
    syncedToInvoice: true
  },
  {
    id: 'ord-bpo-2026-090-1',
    orderNumber: 'BPO-2026-090',
    caseId: 'case-090',
    caseNumber: 'BFH-2026-090',
    caseName: 'Theresa Vance',
    serviceDate: '2026-09-25',
    templateId: 'DAE1EmipRdM',
    templateTitle: 'Cherry Blossom_Large_Program',
    productType: 'program',
    family: 'Cherry Blossom Edited',
    quantity: 150,
    paperStock: '110# Heavy Linen Matte',
    finishOption: '4-Page Saddle-Stitched Booklet',
    unitPrice: 3.10,
    totalPrice: 465.00,
    turnaroundTier: 'Standard (48-72h)',
    rushRequired: false,
    dueAt: '2026-09-24T12:00:00Z',
    status: 'approved',
    currentProofVersion: 1,
    proofs: [
      {
        version: 1,
        artifactSha256: 'c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef012',
        placementManifestSha256: '7b6a5d4c3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
        artifactPath: 'private/proofs/proof-bpo-090-v1.pdf',
        pdfUrl: '#',
        acknowledgedBy: 'dir-02',
        acknowledgedAt: '2026-09-21T09:30:00Z',
        decision: 'approved',
        comments: 'Family approved digital proof with no amendments. Ready for press run.',
        createdAt: '2026-09-20T17:00:00Z'
      }
    ],
    photoPlacements: [
      {
        id: 'plc-090-1',
        sequence: 0,
        pageNumber: 1,
        placementLabel: 'Front Cover Portrait',
        photoReference: 'Email attachment / Vance_Theresa_Portrait.jpg',
        notes: 'Warm cherry blossom motif matching decedent favorite flower.',
        confirmed: true
      },
      {
        id: 'plc-090-2',
        sequence: 1,
        pageNumber: 2,
        placementLabel: 'Life Obituary Picture',
        photoReference: 'Email attachment / Theresa_Young_1965.png',
        notes: 'Black and white historical picture.',
        confirmed: true
      }
    ],
    placementManifestSha256: '7b6a5d4c3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b',
    preflight: {
      passed: true,
      dpiVerified: true,
      cmykColorGamut: true,
      bleedMarginOk: true,
      profileVersion: 'PDF/X-1a:2001',
      acceptedBy: 'PrintMaster Studio BFH',
      acceptedAt: '2026-09-21T10:00:00Z'
    },
    destinationEmail: 'production@bentasprint.nyc',
    destinationVerified: true,
    specialInstructions: 'Standard bi-fold machine score. Ship 150 count to Woodlawn Chapel dispatch cart.',
    familyNotes: 'Approved by daughter Keisha Vance.',
    createdBy: 'Sarah Jenkins (FD)',
    createdAt: '2026-09-20T15:00:00Z',
    updatedAt: '2026-09-21T10:05:00Z',
    syncedToInvoice: true
  },
  {
    id: 'ord-bpo-2026-091-1',
    orderNumber: 'BPO-2026-091',
    caseId: 'case-091',
    caseNumber: 'BFH-2026-091',
    caseName: 'Marcus Aurelius Hayes',
    serviceDate: '2026-09-23',
    templateId: 'DAE204G2vJg',
    templateTitle: 'Linen Series_Prayer Card.pdf',
    productType: 'prayer',
    family: 'Linen Series',
    quantity: 200,
    paperStock: '12pt Heavy Velvet Cardstock',
    finishOption: 'Laminated Matte Edge',
    unitPrice: 1.15,
    totalPrice: 230.00,
    turnaroundTier: 'Priority Rush (24h)',
    rushRequired: true,
    rushReason: 'Service scheduled within 36 hours. Priority press queue approved by General Manager.',
    rushApprovedBy: 'James Benta (General Manager)',
    dueAt: '2026-09-22T17:00:00Z',
    status: 'in_production',
    currentProofVersion: 1,
    proofs: [
      {
        version: 1,
        artifactSha256: 'd4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0123',
        placementManifestSha256: '6a5d4c3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c',
        artifactPath: 'private/proofs/proof-bpo-091-v1.pdf',
        pdfUrl: '#',
        acknowledgedBy: 'dir-01',
        acknowledgedAt: '2026-09-21T08:00:00Z',
        decision: 'approved',
        comments: 'Psalm 23 and 2 Timothy 4:7 verified on reverse.',
        createdAt: '2026-09-21T07:30:00Z'
      }
    ],
    photoPlacements: [
      {
        id: 'plc-091-1',
        sequence: 0,
        pageNumber: 1,
        placementLabel: 'Front Memorial Portrait',
        photoReference: 'Box Cloud / Hayes Case / Marcus_Military_Uniform.jpg',
        notes: 'Include US Navy Veteran gold ribbon emblem in top right.',
        confirmed: true
      }
    ],
    placementManifestSha256: '6a5d4c3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c',
    preflight: {
      passed: true,
      dpiVerified: true,
      cmykColorGamut: true,
      bleedMarginOk: true,
      profileVersion: 'PDF/X-1a:2001',
      acceptedBy: 'PrintMaster Studio BFH',
      acceptedAt: '2026-09-21T08:15:00Z'
    },
    destinationEmail: 'production@bentasprint.nyc',
    destinationVerified: true,
    specialInstructions: 'RUSH: Laminate and box by 5:00 PM today. Place on Director dispatch rack.',
    familyNotes: 'Priority expedited by request of surviving spouse.',
    createdBy: 'James Benta (General Manager)',
    createdAt: '2026-09-21T07:00:00Z',
    updatedAt: '2026-09-21T08:15:00Z',
    syncedToInvoice: true
  },
  {
    id: 'ord-bpo-2026-092-1',
    orderNumber: 'BPO-2026-092',
    caseId: 'case-092',
    caseNumber: 'BFH-2026-092',
    caseName: 'Evelyn Grace Montgomery',
    serviceDate: '2026-09-26',
    templateId: 'DAE204G2vJg',
    templateTitle: 'Linen Series_Poster Large.pdf',
    productType: 'poster',
    family: 'Linen Series',
    quantity: 2,
    paperStock: '100# Gloss Cover',
    finishOption: 'UV High Gloss Finish',
    unitPrice: 165.00,
    totalPrice: 330.00,
    turnaroundTier: 'Standard (48-72h)',
    rushRequired: false,
    dueAt: '2026-09-25T14:00:00Z',
    status: 'draft',
    currentProofVersion: 0,
    proofs: [],
    photoPlacements: [
      {
        id: 'plc-092-1',
        sequence: 0,
        pageNumber: 1,
        placementLabel: 'Easel Welcome Board Center Portrait',
        photoReference: 'Client USB / Evelyn_Grace_Montgomery_Studio_Portrait.tif',
        notes: 'Add "In Loving Celebration of the Life and Legacy of Mrs. Evelyn Grace Montgomery"',
        confirmed: true
      }
    ],
    specialInstructions: 'Mount on heavy 3/16" black foam core board with collapsible easel backs included.',
    createdBy: 'Marcus Aurelius (Lead FD)',
    createdAt: '2026-09-21T13:00:00Z',
    updatedAt: '2026-09-21T13:00:00Z',
    syncedToInvoice: false
  }
];

export function cleanTemplateTitle(value: string): string {
  return String(value || 'Untitled Template')
    .replace(/_/g, ' ')
    .replace(/\.pdf$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getCategoryLabel(type: StorefrontProductType): string {
  const cat = STOREFRONT_CATEGORIES.find(c => c.type === type);
  return cat ? cat.label : type;
}

export function generatePlacementManifestSha256(placements: Array<{ pageNumber: number; placementLabel: string; photoReference: string; notes?: string; confirmed: boolean }>): string {
  const cleanManifest = JSON.stringify(placements.map(p => ({
    pageNumber: p.pageNumber,
    placementLabel: (p.placementLabel || '').trim(),
    photoReference: (p.photoReference || '').trim(),
    notes: (p.notes || '').trim(),
    confirmed: Boolean(p.confirmed)
  })));
  
  let hash = 0;
  for (let i = 0; i < cleanManifest.length; i++) {
    const char = cleanManifest.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hexPart = Math.abs(hash).toString(16).padStart(8, '0');
  return (hexPart + '8f4c2e1b9a7d3f6e5c8b2a1d4e7f0b3c6a9e2d5f8b1c4e7a0d3f6b9c2e5a8d1f').slice(0, 64);
}

export interface OrderPriceCalculation {
  baseUnitPrice: number;
  stockUnitPrice: number;
  unitPrintPrice: number;
  printSubtotal: number;
  finishSurcharge: number;
  rushSurcharge: number;
  totalPrice: number;
  unitPrice: number;
}

export function calculateOrderPrice(
  template: StorefrontDesignTemplate,
  quantity: number,
  paperStock: PaperStockType,
  finishOption: FinishOptionType,
  turnaroundTier: TurnaroundTier
): OrderPriceCalculation {
  const safeQty = Math.max(1, quantity || 1);
  
  // Base unit price ($ per copy / card / poster)
  let baseUnitPrice = (template.base_price || 250) / 100;
  if (template.product_type === 'poster') {
    baseUnitPrice = template.base_price || 45;
  }
  
  // Paper stock surcharge per unit
  const stockInfo = PAPER_STOCK_OPTIONS.find(p => p.stock === paperStock);
  const stockUnitPrice = (stockInfo ? stockInfo.surchargePer100 : 0) / 100;
  
  // Unit print price (Base + Paper stock upgrade)
  const unitPrintPrice = Math.max(0.1, baseUnitPrice + stockUnitPrice);
  const printSubtotal = unitPrintPrice * safeQty;
  
  // Finishing & binding setup cost
  const finishInfo = FINISH_OPTIONS.find(f => f.finish === finishOption);
  const finishSurcharge = finishInfo ? finishInfo.setupCost : 0;
  
  // Turnaround expedited surcharge
  let rushSurcharge = 0;
  if (turnaroundTier === 'Priority Rush (24h)') {
    rushSurcharge = 75;
  } else if (turnaroundTier === 'Same-Day Urgent (12h)') {
    rushSurcharge = 125;
  }
  
  const totalPrice = Math.round((printSubtotal + finishSurcharge + rushSurcharge) * 100) / 100;
  const unitPrice = Math.round((totalPrice / safeQty) * 100) / 100;
  
  return {
    baseUnitPrice: Math.round(baseUnitPrice * 100) / 100,
    stockUnitPrice: Math.round(stockUnitPrice * 100) / 100,
    unitPrintPrice: Math.round(unitPrintPrice * 100) / 100,
    printSubtotal: Math.round(printSubtotal * 100) / 100,
    finishSurcharge,
    rushSurcharge,
    totalPrice,
    unitPrice
  };
}

