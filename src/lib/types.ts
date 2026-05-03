export type UserRole = "comprador" | "agricultor" | "institucion" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  nit?: string;
  institutionName?: string;
  phone?: string;
}

export type CertificationType = "GlobalGAP" | "FairTrade" | "ICA" | "INVIMA" | "Orgánico";
export type ComplianceStatus = "ACTIVE" | "RENEWAL_NEEDED" | "EXPIRED";
export type SustainabilityRank = "Bronze" | "Silver" | "Gold";

export interface Certification {
  type: CertificationType;
  issueDate: string;
  expiryDate: string;
  status: ComplianceStatus;
  documentUrl?: string;
}

export interface Farmer {
  id: string;
  name: string;
  avatar: string;
  region: string;
  department: string;
  bio: string;
  quote: string;
  certifications: Certification[];
  sustainabilityRank: SustainabilityRank;
  complianceStatus: ComplianceStatus;
  totalSales: number;
  activeProducts: number;
  joinedDate: string;
  phone: string;
  email: string;
}

export type ProductCategory = "Verduras" | "Frutas" | "Granos" | "Tubérculos" | "Hierbas" | "Hortalizas" | "Lácteos";

export interface TraceabilityStep {
  stage: "cosecha" | "empaque" | "envio" | "llegada";
  date: string;
  location: string;
  responsible: string;
  notes?: string;
}

export interface VolumePrice {
  minKg: number;
  maxKg?: number;
  pricePerKg: number;
  label: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  institutionalPrice?: number;
  minimumLot: number;
  unit: string;
  description: string;
  images: string[];
  farmerId: string;
  farmer: Farmer;
  lotNumber: string;
  harvestDate: string;
  freshnessScore: number;
  certifications: CertificationType[];
  inStock: boolean;
  featured: boolean;
  traceabilityChain: TraceabilityStep[];
  volumePrices?: VolumePrice[];
  weight?: number;
}

export type OrderStatus =
  | "pendiente"
  | "confirmado"
  | "en_camino"
  | "entregado"
  | "cancelado";
export type OrderType = "individual" | "institucional";
export type PaymentMethod = "tarjeta" | "pse" | "nequi";

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  street: string;
  city: string;
  department: string;
  postalCode?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: OrderStatus;
  userId: string;
  user: User;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  deliveryDate: string;
  createdAt: string;
  purchaseOrderNumber?: string;
  institutionId?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  deliveryDate: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardHolder?: string;
}
