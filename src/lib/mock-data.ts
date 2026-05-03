import type { User, Farmer, Product, Order } from "./types";

// ─── Farmers ──────────────────────────────────────────────────────────────────

export const mockFarmers: Farmer[] = [
  {
    id: "farmer-1",
    name: "Carlos Muñoz",
    avatar: "https://i.pravatar.cc/150?u=carlos-munoz",
    region: "Valle de Tenza",
    department: "Boyacá",
    bio: "Agricultor de tercera generación en el Valle de Tenza. Cultivo papa criolla, zanahoria y remolacha en 8 hectáreas con prácticas de agricultura sostenible certificadas por GlobalGAP.",
    quote: "Cada cosecha es un regalo de la tierra. Mi familia lleva 60 años sembrando con respeto.",
    certifications: [
      { type: "GlobalGAP", issueDate: "2024-03-01", expiryDate: "2026-03-01", status: "ACTIVE" },
      { type: "ICA", issueDate: "2024-06-15", expiryDate: "2025-06-15", status: "RENEWAL_NEEDED" },
    ],
    sustainabilityRank: "Gold",
    complianceStatus: "RENEWAL_NEEDED",
    totalSales: 128500000,
    activeProducts: 5,
    joinedDate: "2023-02-10",
    phone: "+57 310 456 7890",
    email: "carlos.munoz@agroconecta.co",
  },
  {
    id: "farmer-2",
    name: "María Ospina",
    avatar: "https://i.pravatar.cc/150?u=maria-ospina",
    region: "Oriente Antioqueño",
    department: "Antioquia",
    bio: "Productora de tomate chonto y pimentón en invernadero. Certificada en Fair Trade desde 2022. Trabajo con 12 familias de la vereda La Esperanza.",
    quote: "El comercio justo no es solo un certificado, es una filosofía de vida.",
    certifications: [
      { type: "FairTrade", issueDate: "2022-08-01", expiryDate: "2026-08-01", status: "ACTIVE" },
      { type: "GlobalGAP", issueDate: "2023-11-01", expiryDate: "2025-11-01", status: "ACTIVE" },
      { type: "INVIMA", issueDate: "2024-01-15", expiryDate: "2027-01-15", status: "ACTIVE" },
    ],
    sustainabilityRank: "Gold",
    complianceStatus: "ACTIVE",
    totalSales: 87300000,
    activeProducts: 4,
    joinedDate: "2022-11-20",
    phone: "+57 311 234 5678",
    email: "maria.ospina@agroconecta.co",
  },
  {
    id: "farmer-3",
    name: "Jesús Hernández",
    avatar: "https://i.pravatar.cc/150?u=jesus-hernandez",
    region: "Sabana de Bogotá",
    department: "Cundinamarca",
    bio: "Productor de hortalizas de hoja (espinaca, lechuga, acelga) en cultivo hidropónico. Proveedor certificado para hospitales y colegios del programa PAE.",
    quote: "La tecnología al servicio del campo colombiano. Hidropónico pero con alma campesina.",
    certifications: [
      { type: "ICA", issueDate: "2024-09-01", expiryDate: "2026-09-01", status: "ACTIVE" },
      { type: "INVIMA", issueDate: "2023-05-20", expiryDate: "2025-05-20", status: "RENEWAL_NEEDED" },
    ],
    sustainabilityRank: "Silver",
    complianceStatus: "RENEWAL_NEEDED",
    totalSales: 54200000,
    activeProducts: 3,
    joinedDate: "2023-08-05",
    phone: "+57 312 876 5432",
    email: "jesus.hernandez@agroconecta.co",
  },
  {
    id: "farmer-4",
    name: "Ana Lucía Ramírez",
    avatar: "https://i.pravatar.cc/150?u=ana-ramirez",
    region: "Eje Cafetero",
    department: "Risaralda",
    bio: "Productora de aguacate Hass y maracuyá orgánico. Premio Nacional de Agricultura Sostenible 2024. Exporta el 30% de su producción a mercados europeos.",
    quote: "Lo orgánico no es una moda, es el futuro de nuestra tierra.",
    certifications: [
      { type: "Orgánico", issueDate: "2023-04-01", expiryDate: "2026-04-01", status: "ACTIVE" },
      { type: "GlobalGAP", issueDate: "2024-02-15", expiryDate: "2027-02-15", status: "ACTIVE" },
      { type: "FairTrade", issueDate: "2024-07-01", expiryDate: "2027-07-01", status: "ACTIVE" },
    ],
    sustainabilityRank: "Gold",
    complianceStatus: "ACTIVE",
    totalSales: 213600000,
    activeProducts: 6,
    joinedDate: "2022-06-18",
    phone: "+57 313 567 8901",
    email: "ana.ramirez@agroconecta.co",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    slug: "papa-criolla-boyaca",
    name: "Papa Criolla Boyacá",
    category: "Tubérculos",
    price: 3200,
    institutionalPrice: 2600,
    minimumLot: 50,
    unit: "kg",
    description:
      "Papa criolla de primera calidad cultivada en las laderas del Valle de Tenza, Boyacá. Ideal para ajiaco, papas chorreadas y frituras. Cosechada en los últimos 3 días.",
    images: [
      "https://images.unsplash.com/photo-1518977676405-d9a72e2fc2dd?w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    ],
    farmerId: "farmer-1",
    farmer: mockFarmers[0],
    lotNumber: "LOT-2026-0501-PC",
    harvestDate: "2026-05-01",
    freshnessScore: 97,
    certifications: ["GlobalGAP"],
    inStock: true,
    featured: true,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-05-01", location: "Valle de Tenza, Boyacá", responsible: "Carlos Muñoz", notes: "Cosecha manual, selección en campo" },
      { stage: "empaque", date: "2026-05-02", location: "Centro de Acopio Tenza", responsible: "Cooperativa Valle Verde", notes: "Clasificación por tamaño, lavado y empaque en mallas de 5kg" },
      { stage: "envio", date: "2026-05-02", location: "Carretera Bogotá-Tenza", responsible: "Logística AgroConecta", notes: "Transporte refrigerado 4°C" },
      { stage: "llegada", date: "2026-05-03", location: "Centro de Distribución Bogotá", responsible: "AgroConecta", notes: "Control de calidad y despacho a compradores" },
    ],
    volumePrices: [
      { minKg: 1, maxKg: 9, pricePerKg: 3200, label: "Detalle" },
      { minKg: 10, maxKg: 49, pricePerKg: 2900, label: "Mayorista" },
      { minKg: 50, pricePerKg: 2600, label: "Institucional" },
    ],
  },
  {
    id: "prod-2",
    slug: "tomate-chonto-antioquia",
    name: "Tomate Chonto Invernadero",
    category: "Verduras",
    price: 4800,
    institutionalPrice: 3900,
    minimumLot: 100,
    unit: "kg",
    description:
      "Tomate chonto cultivado en invernadero con control fitosanitario certificado. Maduración natural sin etileno. Calibre uniforme, ideal para procesamiento y consumo en fresco.",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=800&q=80",
    ],
    farmerId: "farmer-2",
    farmer: mockFarmers[1],
    lotNumber: "LOT-2026-0430-TC",
    harvestDate: "2026-04-30",
    freshnessScore: 94,
    certifications: ["FairTrade", "GlobalGAP", "INVIMA"],
    inStock: true,
    featured: true,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-04-30", location: "La Esperanza, Oriente Antioqueño", responsible: "María Ospina", notes: "Cosecha en madurez comercial 3/4" },
      { stage: "empaque", date: "2026-04-30", location: "Invernadero La Esperanza", responsible: "Cooperativa FairTrade Antioquia" },
      { stage: "envio", date: "2026-05-01", location: "Medellín - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-05-02", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
    volumePrices: [
      { minKg: 1, maxKg: 9, pricePerKg: 4800, label: "Detalle" },
      { minKg: 10, maxKg: 99, pricePerKg: 4200, label: "Mayorista" },
      { minKg: 100, pricePerKg: 3900, label: "Institucional" },
    ],
  },
  {
    id: "prod-3",
    slug: "aguacate-hass-organico",
    name: "Aguacate Hass Orgánico",
    category: "Frutas",
    price: 8500,
    institutionalPrice: 7200,
    minimumLot: 20,
    unit: "kg",
    description:
      "Aguacate Hass orgánico certificado del Eje Cafetero. Cero pesticidas, cero fertilizantes químicos. Cosechado en punto óptimo de madurez. Premio Nacional Agricultura Sostenible 2024.",
    images: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80",
      "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=800&q=80",
    ],
    farmerId: "farmer-4",
    farmer: mockFarmers[3],
    lotNumber: "LOT-2026-0428-AH",
    harvestDate: "2026-04-28",
    freshnessScore: 91,
    certifications: ["Orgánico", "GlobalGAP", "FairTrade"],
    inStock: true,
    featured: true,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-04-28", location: "Finca La Orgánica, Risaralda", responsible: "Ana Lucía Ramírez", notes: "Cosecha manual por calibre" },
      { stage: "empaque", date: "2026-04-29", location: "Empacadora Orgánica Pereira", responsible: "Ana Lucía Ramírez" },
      { stage: "envio", date: "2026-04-29", location: "Pereira - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-04-30", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
    volumePrices: [
      { minKg: 1, maxKg: 19, pricePerKg: 8500, label: "Detalle" },
      { minKg: 20, pricePerKg: 7200, label: "Institucional" },
    ],
  },
  {
    id: "prod-4",
    slug: "espinaca-hidroponica",
    name: "Espinaca Hidropónica",
    category: "Verduras",
    price: 5600,
    institutionalPrice: 4500,
    minimumLot: 30,
    unit: "kg",
    description:
      "Espinaca hidropónica cultivada sin suelo en la Sabana de Bogotá. Sin tierra, sin pesticidas, lavada y lista para consumo. Certificada para el programa PAE.",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80",
      "https://images.unsplash.com/photo-1599342901394-38de0060b5c5?w=800&q=80",
    ],
    farmerId: "farmer-3",
    farmer: mockFarmers[2],
    lotNumber: "LOT-2026-0502-ES",
    harvestDate: "2026-05-02",
    freshnessScore: 99,
    certifications: ["ICA"],
    inStock: true,
    featured: false,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-05-02", location: "Invernadero Hidropónico Sabana", responsible: "Jesús Hernández", notes: "Corte manual con tijeras estériles" },
      { stage: "empaque", date: "2026-05-02", location: "Planta de Procesamiento Facatativá", responsible: "Jesús Hernández", notes: "Lavado en agua potable con ozono" },
      { stage: "envio", date: "2026-05-02", location: "Facatativá - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-05-03", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
    volumePrices: [
      { minKg: 1, maxKg: 29, pricePerKg: 5600, label: "Detalle" },
      { minKg: 30, pricePerKg: 4500, label: "Institucional (PAE)" },
    ],
  },
  {
    id: "prod-5",
    slug: "zanahoria-baby-boyaca",
    name: "Zanahoria Baby",
    category: "Verduras",
    price: 3800,
    institutionalPrice: 3100,
    minimumLot: 40,
    unit: "kg",
    description:
      "Zanahoria baby cosechada en el Valle de Tenza antes de completar su madurez. Sabor dulce y textura crujiente. Ideal para snacks, ensaladas y cocinas institucionales.",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80",
    ],
    farmerId: "farmer-1",
    farmer: mockFarmers[0],
    lotNumber: "LOT-2026-0430-ZB",
    harvestDate: "2026-04-30",
    freshnessScore: 95,
    certifications: ["GlobalGAP"],
    inStock: true,
    featured: false,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-04-30", location: "Valle de Tenza, Boyacá", responsible: "Carlos Muñoz" },
      { stage: "empaque", date: "2026-05-01", location: "Centro de Acopio Tenza", responsible: "Cooperativa Valle Verde" },
      { stage: "envio", date: "2026-05-01", location: "Tenza - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-05-02", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
  },
  {
    id: "prod-6",
    slug: "maracuya-organico",
    name: "Maracuyá Orgánico",
    category: "Frutas",
    price: 6200,
    institutionalPrice: 5100,
    minimumLot: 25,
    unit: "kg",
    description:
      "Maracuyá orgánico del Eje Cafetero con altísimo contenido de jugo. Libre de agroquímicos. Certificado Orgánico y FairTrade. Perfecto para jugos, cócteles y postres.",
    images: [
      "https://images.unsplash.com/photo-1604495772376-9657f0035f0e?w=800&q=80",
    ],
    farmerId: "farmer-4",
    farmer: mockFarmers[3],
    lotNumber: "LOT-2026-0429-MO",
    harvestDate: "2026-04-29",
    freshnessScore: 93,
    certifications: ["Orgánico", "FairTrade"],
    inStock: true,
    featured: false,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-04-29", location: "Finca La Orgánica, Risaralda", responsible: "Ana Lucía Ramírez" },
      { stage: "empaque", date: "2026-04-30", location: "Empacadora Orgánica Pereira", responsible: "Ana Lucía Ramírez" },
      { stage: "envio", date: "2026-04-30", location: "Pereira - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-05-01", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
  },
  {
    id: "prod-7",
    slug: "frijol-cargamanto-boyaca",
    name: "Fríjol Cargamanto",
    category: "Granos",
    price: 9800,
    institutionalPrice: 8200,
    minimumLot: 50,
    unit: "kg",
    description:
      "Fríjol cargamanto rojo de Boyacá, el más apreciado en la gastronomía colombiana. Cosechado y secado artesanalmente. Libre de fumigantes post-cosecha.",
    images: [
      "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=800&q=80",
    ],
    farmerId: "farmer-1",
    farmer: mockFarmers[0],
    lotNumber: "LOT-2026-0425-FC",
    harvestDate: "2026-04-25",
    freshnessScore: 88,
    certifications: ["GlobalGAP"],
    inStock: true,
    featured: false,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-04-25", location: "Valle de Tenza, Boyacá", responsible: "Carlos Muñoz" },
      { stage: "empaque", date: "2026-04-27", location: "Bodega Artesanal Tenza", responsible: "Carlos Muñoz", notes: "Secado natural 3 días, selección manual" },
      { stage: "envio", date: "2026-04-28", location: "Tenza - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-04-29", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
  },
  {
    id: "prod-8",
    slug: "pimenton-rojo-antioquia",
    name: "Pimentón Rojo Invernadero",
    category: "Verduras",
    price: 7200,
    institutionalPrice: 5800,
    minimumLot: 60,
    unit: "kg",
    description:
      "Pimentón rojo maduro del Oriente Antioqueño, cultivado en invernadero certificado FairTrade. Calibre jumbo, piel brillante y sabor dulce intenso. Sin pesticidas post-cosecha.",
    images: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80",
    ],
    farmerId: "farmer-2",
    farmer: mockFarmers[1],
    lotNumber: "LOT-2026-0501-PR",
    harvestDate: "2026-05-01",
    freshnessScore: 96,
    certifications: ["FairTrade", "GlobalGAP"],
    inStock: true,
    featured: true,
    traceabilityChain: [
      { stage: "cosecha", date: "2026-05-01", location: "La Esperanza, Oriente Antioqueño", responsible: "María Ospina" },
      { stage: "empaque", date: "2026-05-01", location: "Invernadero La Esperanza", responsible: "Cooperativa FairTrade Antioquia" },
      { stage: "envio", date: "2026-05-02", location: "Medellín - Bogotá", responsible: "Logística AgroConecta" },
      { stage: "llegada", date: "2026-05-03", location: "Centro de Distribución Bogotá", responsible: "AgroConecta" },
    ],
    volumePrices: [
      { minKg: 1, maxKg: 9, pricePerKg: 7200, label: "Detalle" },
      { minKg: 10, maxKg: 59, pricePerKg: 6400, label: "Mayorista" },
      { minKg: 60, pricePerKg: 5800, label: "Institucional" },
    ],
  },
];

// ─── Users ────────────────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  {
    id: "user-comprador-1",
    name: "Laura Gómez",
    email: "comprador@demo.co",
    password: "demo123",
    role: "comprador",
    avatar: "https://i.pravatar.cc/150?u=laura-gomez",
    phone: "+57 300 123 4567",
  },
  {
    id: "user-agricultor-1",
    name: "Carlos Muñoz",
    email: "agricultor@demo.co",
    password: "demo123",
    role: "agricultor",
    avatar: "https://i.pravatar.cc/150?u=carlos-munoz",
    phone: "+57 310 456 7890",
  },
  {
    id: "user-institucion-1",
    name: "Roberto Cárdenas",
    email: "institucion@demo.co",
    password: "demo123",
    role: "institucion",
    avatar: "https://i.pravatar.cc/150?u=roberto-cardenas",
    phone: "+57 320 987 6543",
    nit: "900.123.456-7",
    institutionName: "Colegio Distrital Los Pinos",
  },
  {
    id: "user-admin-1",
    name: "Sofía Vargas",
    email: "admin@demo.co",
    password: "demo123",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=sofia-vargas",
    phone: "+57 315 246 8013",
  },
];

// ─── Orders ───────────────────────────────────────────────────────────────────

export const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "AGC-2026-00001",
    type: "individual",
    status: "entregado",
    userId: "user-comprador-1",
    user: mockUsers[0],
    items: [
      { productId: "prod-1", product: mockProducts[0], quantity: 5, unitPrice: 3200 },
      { productId: "prod-3", product: mockProducts[2], quantity: 2, unitPrice: 8500 },
    ],
    subtotal: 33000,
    deliveryFee: 8000,
    total: 41000,
    paymentMethod: "nequi",
    deliveryAddress: { street: "Cra 15 #85-20", city: "Bogotá", department: "Cundinamarca" },
    deliveryDate: "2026-04-28",
    createdAt: "2026-04-26T10:30:00Z",
  },
  {
    id: "order-2",
    orderNumber: "AGC-2026-00002",
    type: "institucional",
    status: "en_camino",
    userId: "user-institucion-1",
    user: mockUsers[2],
    items: [
      { productId: "prod-4", product: mockProducts[3], quantity: 80, unitPrice: 4500 },
      { productId: "prod-5", product: mockProducts[4], quantity: 60, unitPrice: 3100 },
    ],
    subtotal: 546000,
    deliveryFee: 0,
    total: 546000,
    paymentMethod: "pse",
    deliveryAddress: { street: "Av. Boyacá #12-30", city: "Bogotá", department: "Cundinamarca" },
    deliveryDate: "2026-05-04",
    createdAt: "2026-05-02T09:00:00Z",
    purchaseOrderNumber: "PO-2026-0312",
    institutionId: "user-institucion-1",
  },
  {
    id: "order-3",
    orderNumber: "AGC-2026-00003",
    type: "individual",
    status: "confirmado",
    userId: "user-comprador-1",
    user: mockUsers[0],
    items: [
      { productId: "prod-2", product: mockProducts[1], quantity: 3, unitPrice: 4800 },
      { productId: "prod-8", product: mockProducts[7], quantity: 2, unitPrice: 7200 },
    ],
    subtotal: 28800,
    deliveryFee: 8000,
    total: 36800,
    paymentMethod: "tarjeta",
    deliveryAddress: { street: "Cra 15 #85-20", city: "Bogotá", department: "Cundinamarca" },
    deliveryDate: "2026-05-05",
    createdAt: "2026-05-03T14:15:00Z",
  },
  {
    id: "order-4",
    orderNumber: "AGC-2026-00004",
    type: "institucional",
    status: "pendiente",
    userId: "user-institucion-1",
    user: mockUsers[2],
    items: [
      { productId: "prod-1", product: mockProducts[0], quantity: 200, unitPrice: 2600 },
      { productId: "prod-7", product: mockProducts[6], quantity: 100, unitPrice: 8200 },
    ],
    subtotal: 1340000,
    deliveryFee: 0,
    total: 1340000,
    paymentMethod: "pse",
    deliveryAddress: { street: "Av. Boyacá #12-30", city: "Bogotá", department: "Cundinamarca" },
    deliveryDate: "2026-05-08",
    createdAt: "2026-05-03T16:45:00Z",
    purchaseOrderNumber: "PO-2026-0318",
    institutionId: "user-institucion-1",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return mockProducts;
  return mockProducts.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}

export function getOrdersByUserId(userId: string): Order[] {
  return mockOrders.filter((o) => o.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getFarmerById(id: string): Farmer | undefined {
  return mockFarmers.find((f) => f.id === id);
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
