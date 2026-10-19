export type PlacementType = 'car-dashboard' | 'pooja-room' | 'office-desk';

export type MetalFinish = 
  | 'Solid Antique Brass'
  | 'Lost-Wax Bronze'
  | 'Panchaloha Bronze'
  | 'Burnished Matte Brass';

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verifiedPlacement: 'Car Dashboard' | 'Pooja Room' | 'Office Desk';
  comment: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  sanskritName?: string;
  deity: string;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  dimensions: {
    heightInches: number;
    heightCm: number;
    baseWidthCm: number;
    weightGrams: number;
  };
  placements: PlacementType[];
  primaryPlacement: PlacementType;
  material: MetalFinish;
  finishColorDescription: string;
  images: {
    primary: string;
    angle?: string;
    inSitu: string; // Dashboard, Mandir, or Desk context
    macroDetail?: string;
  };
  description: string;
  symbolism: string;
  craftsmanshipDetails: string;
  carDashboardNotes?: string;
  includesDashboardKit: boolean;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  reviews: CustomerReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  include3MMount: boolean;
  includeGiftBox: boolean;
  customEngraving?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string;
}

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'cod';

export interface Order {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  paymentReference: string;
  orderDate: string;
  estimatedDeliveryDate: string;
  status: 'confirmed' | 'dispatched' | 'in-transit' | 'delivered';
}
