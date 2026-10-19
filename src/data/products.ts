import { Product } from '../types';

import heroDashboardImg from '../assets/images/hero_brass_idols_dashboard_1792001807054.jpg';
import ganeshaBrassImg from '../assets/images/product_ganesha_brass_1792001807281.jpg';
import hanumanBronzeImg from '../assets/images/product_hanuman_bronze_1792001808134.jpg';
import shivaAdiyogiImg from '../assets/images/product_shiva_adiyogi_1792001809156.jpg';
import lakshmiBrassImg from '../assets/images/product_lakshmi_brass_1792001808893.jpg';

export const HERO_IMAGE = heroDashboardImg;

export const PRODUCTS: Product[] = [
  {
    id: 'ganesha-antique-brass-mini',
    name: 'Vighnaharta Ganesha in Abhaya Mudra',
    sanskritName: 'विघ्नहर्ता गणेश',
    deity: 'Lord Ganesha',
    tagline: 'Remover of Obstacles · Foremost Choice for Car Dashboards',
    price: 1499,
    originalPrice: 1999,
    rating: 4.95,
    reviewCount: 342,
    dimensions: {
      heightInches: 2.5,
      heightCm: 6.3,
      baseWidthCm: 4.8,
      weightGrams: 235
    },
    placements: ['car-dashboard', 'pooja-room', 'office-desk'],
    primaryPlacement: 'car-dashboard',
    material: 'Solid Antique Brass',
    finishColorDescription: 'Warm burnished golden brass with deep antique patina in crevices',
    images: {
      primary: ganeshaBrassImg,
      angle: ganeshaBrassImg,
      inSitu: heroDashboardImg,
      macroDetail: ganeshaBrassImg
    },
    description: 'Masterfully cast using traditional lost-wax casting, this compact Ganesha sits in the Abhaya Mudra (protective blessing). Engineered with an extra-wide lotus base and an optimized low center of gravity to remain rock-steady through sudden braking and sharp turns on automobile dashboards.',
    symbolism: 'Right hand raised in blessing (Abhaya) gives safe travels, the modak signifies inner sweetness, while the single tusk symbolizes overcoming dualities of life.',
    craftsmanshipDetails: 'Cast in 100% virgin bell-brass alloy (80% copper, 20% zinc). Finished with a heat-cured botanical protective micro-layer that will not oxidise under hot windshield sunlight.',
    carDashboardNotes: 'Comes pre-packed with 2x custom-cut high-temperature (up to 95°C) 3M automotive silicone adhesive discs. Leaves zero sticky residue on leather or soft-touch dashboard trims.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 24,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-1',
        author: 'Vikramaditya S.',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        date: 'March 2026',
        verifiedPlacement: 'Car Dashboard',
        comment: 'Placed this on my Scorpio-N dashboard. The 235g weight gives it serious heft, and the 3M silicone mount has held through 1,200 km of Western Ghats highway curves without moving a millimeter. Glare-free under afternoon sun.',
        helpfulCount: 48
      },
      {
        id: 'rev-2',
        author: 'Ananya Deshmukh',
        location: 'Pune, Maharashtra',
        rating: 5,
        date: 'February 2026',
        verifiedPlacement: 'Office Desk',
        comment: 'Sits right under my studio monitor. Handcrafted facial details on a miniature piece this size (barely 2.5 inches) are simply extraordinary. You can feel the real metal resonance.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'hanuman-panchmukhi-bronze-mini',
    name: 'Panchmukhi Hanuman Vijaya Murti',
    sanskritName: 'पंचमुखी हनुमान',
    deity: 'Lord Hanuman',
    tagline: 'Sovereign Protection & Courage for Highway Journeys',
    price: 1899,
    originalPrice: 2499,
    rating: 4.98,
    reviewCount: 288,
    dimensions: {
      heightInches: 2.8,
      heightCm: 7.1,
      baseWidthCm: 5.2,
      weightGrams: 280
    },
    placements: ['car-dashboard', 'pooja-room', 'office-desk'],
    primaryPlacement: 'car-dashboard',
    material: 'Lost-Wax Bronze',
    finishColorDescription: 'Rich antique bronze with subtle golden brass high-relief highlights',
    images: {
      primary: hanumanBronzeImg,
      angle: hanumanBronzeImg,
      inSitu: hanumanBronzeImg,
      macroDetail: hanumanBronzeImg
    },
    description: 'The supreme protector across all five directions (Hanuman, Narasimha, Garuda, Varaha, and Hayagriva). Cast in weighty lost-wax bronze with intricate multiple arms carrying the mace (gada), trident, and sacred weapons. Specifically designed for travelers seeking fearlessness and divine shield on roads.',
    symbolism: 'Panchmukhi signifies all-directional alertness and victory over malevolent energies. The kneeling posture conveys unmatched humility and infinite strength.',
    craftsmanshipDetails: 'Heavy bronze formulation incorporating copper, tin, and sacred zinc. Each face is individually hand-chiseled by generational temple sthapatis in Swamimalai.',
    carDashboardNotes: 'Weighted solid base (280 grams) prevents vibration wobble. Anti-glare matte bronze finish will not reflect distracting sun rays onto the car windshield.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 18,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-3',
        author: 'Col. Rajesh Sharma (Retd.)',
        location: 'Jaipur, Rajasthan',
        rating: 5,
        date: 'March 2026',
        verifiedPlacement: 'Car Dashboard',
        comment: 'Installed on our Fortuner dash for our Leh-Ladakh expedition. Rock solid stability, zero reflection on the glass, and looking at the five faces gives immense peace during treacherous night drives.',
        helpfulCount: 62
      },
      {
        id: 'rev-4',
        author: 'Pradeep Iyer',
        location: 'Chennai, Tamil Nadu',
        rating: 5,
        date: 'January 2026',
        verifiedPlacement: 'Pooja Room',
        comment: 'The micro-sculpting of all five divine faces is breathtaking for a 2.8-inch murti. The bronze patina looks like a centuries-old heirloom.',
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'shiva-adiyogi-matte-bronze-mini',
    name: 'Dhyanastha Shiva (The Meditative Ascetic)',
    sanskritName: 'ध्यानावस्थित शिव',
    deity: 'Lord Shiva',
    tagline: 'Deep Mindful Calm for High-Pressure Office Desks',
    price: 1699,
    originalPrice: 2199,
    rating: 4.92,
    reviewCount: 215,
    dimensions: {
      heightInches: 2.6,
      heightCm: 6.6,
      baseWidthCm: 5.5,
      weightGrams: 260
    },
    placements: ['office-desk', 'pooja-room', 'car-dashboard'],
    primaryPlacement: 'office-desk',
    material: 'Burnished Matte Brass',
    finishColorDescription: 'Dark basalt bronze tone with satin hand-burnished shoulders and crescent moon',
    images: {
      primary: shivaAdiyogiImg,
      angle: shivaAdiyogiImg,
      inSitu: shivaAdiyogiImg,
      macroDetail: shivaAdiyogiImg
    },
    description: 'Depicting Mahadeva in deep Samadhi with eyes gently half-closed, coiled serpent, rudraksha mala, and crescent moon in matted locks. Created to bring grounding stillness and clarity to workspaces, executive tables, and personal meditation corners.',
    symbolism: 'Represents the master of mind and senses, unwavering focus amidst chaos, and absolute stillness beyond duality.',
    craftsmanshipDetails: 'Features a scratch-resistant recessed bottom lined with archival black felt to protect executive wood, glass, and quartz desk surfaces.',
    carDashboardNotes: 'Can also be mounted on car dashboards with included heat-resistant 3M dual-lock pad.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 15,
    isBestSeller: false,
    reviews: [
      {
        id: 'rev-5',
        author: 'Dr. Siddharth Menon',
        location: 'Hyderabad, Telangana',
        rating: 5,
        date: 'February 2026',
        verifiedPlacement: 'Office Desk',
        comment: 'As a surgeon dealing with long hours, having this Adiyogi on my consultation desk creates an oasis of quiet. Solid weight, beautifully proportioned, matte finish does not attract fingerprint smudges.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'lakshmi-padmasana-brass-mini',
    name: 'Padmasana Mahalakshmi (Goddess of Abundance)',
    sanskritName: 'पद्मासना महालक्ष्मी',
    deity: 'Goddess Lakshmi',
    tagline: 'Auspicious Grace for Compact Pooja Altars & Cash Desks',
    price: 1599,
    originalPrice: 2099,
    rating: 4.96,
    reviewCount: 194,
    dimensions: {
      heightInches: 2.7,
      heightCm: 6.8,
      baseWidthCm: 4.6,
      weightGrams: 245
    },
    placements: ['pooja-room', 'office-desk', 'car-dashboard'],
    primaryPlacement: 'pooja-room',
    material: 'Solid Antique Brass',
    finishColorDescription: 'Lustrous golden yellow brass with warm hand-rubbed highlight polish',
    images: {
      primary: lakshmiBrassImg,
      angle: lakshmiBrassImg,
      inSitu: lakshmiBrassImg,
      macroDetail: lakshmiBrassImg
    },
    description: 'Seated gracefully upon a fully blossomed double lotus pedestal, holding twin lotuses with the right hand showering prosperity (Varada Mudra). Solid lost-wax casting that can endure daily water and milk abhisheka rituals without chemical erosion.',
    symbolism: 'Symbolizes the flow of both spiritual purity and material wealth, contentment, and harmonious sanctuary in homes and businesses.',
    craftsmanshipDetails: 'Abhisheka-proof virgin brass composition. Does not flake or turn green because no synthetic electroplated coats are used—only solid brass through and through.',
    carDashboardNotes: 'Compact footprint makes it ideal for compact car dashboards or pooja niches.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 22,
    isBestSeller: true,
    reviews: [
      {
        id: 'rev-6',
        author: 'Meenakshi Sundaram',
        location: 'Coimbatore, Tamil Nadu',
        rating: 5,
        date: 'March 2026',
        verifiedPlacement: 'Pooja Room',
        comment: 'Placed in our compact apartment mandir. We perform daily abhisheka with panchamrit and water; drying it with a soft cloth restores the radiant brass glow instantly. Truly pure metal.',
        helpfulCount: 42
      }
    ]
  },
  {
    id: 'balaji-tirupati-panchaloha-mini',
    name: 'Sri Venkateswara Tirupati Balaji',
    sanskritName: 'श्री वेंकटेश्वर बालाजी',
    deity: 'Lord Balaji',
    tagline: 'Divine Grace of the Kaliyuga Lord for Vehicle & Altar',
    price: 1999,
    originalPrice: 2699,
    rating: 4.97,
    reviewCount: 310,
    dimensions: {
      heightInches: 3.0,
      heightCm: 7.6,
      baseWidthCm: 4.2,
      weightGrams: 290
    },
    placements: ['car-dashboard', 'pooja-room', 'office-desk'],
    primaryPlacement: 'car-dashboard',
    material: 'Panchaloha Bronze',
    finishColorDescription: 'Sacred Panchaloha alloy with antique blackened crevices and gold-sheen ornaments',
    images: {
      primary: ganeshaBrassImg, // Fallback/companion image
      angle: ganeshaBrassImg,
      inSitu: heroDashboardImg,
      macroDetail: ganeshaBrassImg
    },
    description: 'Exquisite miniature of the Lord of the Seven Hills with the sacred Shanka, Chakra, Kati Hasta, and Varada blessing hands. The prominent Urdhva Pundra tilak is carefully hand-inlaid. Known to bestow sovereign protection and unexpected prosperity.',
    symbolism: 'The conch represents the cosmic sound of creation; the Sudarshana chakra destroys negative karmic patterns.',
    craftsmanshipDetails: 'Traditional Panchaloha formulation inspired by Chola-era metallurgy. Heavy weighted base keeps the tall silhouette completely stable.',
    carDashboardNotes: 'Weighted 290g base engineered specifically so that sudden acceleration does not tilt the 3-inch profile.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 12,
    isLimitedEdition: true,
    reviews: [
      {
        id: 'rev-7',
        author: 'K. S. Narayanan',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        date: 'March 2026',
        verifiedPlacement: 'Car Dashboard',
        comment: 'The posture and the Shanka-Chakra detailing on a 3-inch murti is supreme. Govinda Govinda! Blessed to have this on my car dashboard.',
        helpfulCount: 54
      }
    ]
  },
  {
    id: 'krishna-murlidhar-brass-mini',
    name: 'Murli Manohar Krishna on Kadamba Lotus',
    sanskritName: 'मुरली मनोहर कृष्ण',
    deity: 'Lord Krishna',
    tagline: 'Melody of Joy, Grace and Sweet Serenity',
    price: 1549,
    originalPrice: 1999,
    rating: 4.89,
    reviewCount: 168,
    dimensions: {
      heightInches: 2.7,
      heightCm: 6.9,
      baseWidthCm: 4.4,
      weightGrams: 220
    },
    placements: ['office-desk', 'pooja-room', 'car-dashboard'],
    primaryPlacement: 'office-desk',
    material: 'Solid Antique Brass',
    finishColorDescription: 'Luminous antique brass with peacock feather crown detail',
    images: {
      primary: lakshmiBrassImg,
      angle: lakshmiBrassImg,
      inSitu: heroDashboardImg,
      macroDetail: lakshmiBrassImg
    },
    description: 'Lord Krishna standing in the graceful Tribhanga posture, playing the divine flute. Brings an atmosphere of spontaneous joy, effortless creativity, and emotional equilibrium to any work desk or home mandir.',
    symbolism: 'Tribhanga posture signifies rhythmic harmony with the universe; the flute represents surrendering internal ego so divine breath can flow.',
    craftsmanshipDetails: 'Precision lost-wax cast with removable/fixed micro-flute in solid brass. Lined with protective velvet bottom pad.',
    carDashboardNotes: 'Compact and serene. Includes high-durability adhesive disc.',
    includesDashboardKit: true,
    inStock: true,
    stockCount: 19,
    reviews: [
      {
        id: 'rev-8',
        author: 'Tanvi Gokhale',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: 'January 2026',
        verifiedPlacement: 'Office Desk',
        comment: 'The gentle smile on Krishna’s face is so calming during hectic workdays. The brass quality is premium, not cheap hollow sheet metal.',
        helpfulCount: 23
      }
    ]
  }
];

export const PLACEMENT_SPECS = {
  'car-dashboard': {
    title: 'Car Dashboard Editions',
    shortTitle: 'Car Dashboard',
    tagline: 'Engineered for Highways, Bumps & Windshield Heat',
    heroTag: 'Anti-Topple Base · Zero Glare · Up to 95°C Heat-Resistant Mount',
    description: 'Automobile dashboards endure extreme thermal cycles and sudden inertial forces. Our car editions feature a low center of gravity, vibration-damping weighted solid metal, and include medical-grade 3M automotive silicone mounting pads that adhere securely without damaging fine leather or dashboard plastics.',
    features: [
      'Low center of gravity prevents tipping on sharp turns',
      'Solid bell brass/bronze won\'t melt, warp or discolor under windshield sun',
      'Anti-glare hand-burnished matte patina keeps driver vision clear',
      'Includes 2x heat-resistant 3M non-marking silicone mounting pads'
    ]
  },
  'pooja-room': {
    title: 'Pooja Mandir Editions',
    shortTitle: 'Pooja Room',
    tagline: 'Consecrated Proportions & Abhisheka Safe',
    heroTag: 'Agama Compliant · Abhisheka-Proof Solid Alloy · Heirloom Patina',
    description: 'Crafted according to Shilpa Shastra iconography for daily devotional rituals. Unlike hollow or resin-coated idols that erode when washed with milk or water, our solid metal alloys welcome panchamrit abhisheka and retain their deep sacred aura over generations.',
    features: [
      'Pure virgin bell-brass and bronze alloys (no toxic lead or cadmium)',
      '100% safe for daily water, milk, and kumkum abhisheka',
      'Traditional hand-chiseled facial features by hereditary sthapatis',
      'Compact scale fits sacred home altars and brass thalis perfectly'
    ]
  },
  'office-desk': {
    title: 'Office & Study Desk Editions',
    shortTitle: 'Office Desk',
    tagline: 'Mindful Serenity & Focus for Modern Workspaces',
    heroTag: 'Velvet Scratch-Free Base · Subdued Executive Elegance · Mindfulness Anchor',
    description: 'Designed to bring quiet spiritual grounding to contemporary workstations, creative studios, and executive desks. Weighted to double as a tactile contemplation anchor or paperweight, with archival velvet bottom pads.',
    features: [
      'Archival black velvet base protects polished wood, glass, and quartz',
      'Minimalist, understated silhouettes that harmonize with modern desk setups',
      'Substantial paperweight feel (220g - 290g) providing tactile grounding',
      'Deities chosen for focus, obstacle removal, and clear discernment'
    ]
  }
};
