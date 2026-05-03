"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CreditCard, Truck, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { formatCOP } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const DELIVERY_FEE = 15000;
const FREE_DELIVERY_THRESHOLD = 200000;

const CITIES = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Armenia", "Ibagué"];

type Step = "entrega" | "pago";

interface DeliveryForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  notes: string;
}

interface PaymentForm {
  method: "card" | "transfer" | "pse";
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

const emptyDelivery: DeliveryForm = { name: "", email: "", phone: "", address: "", city: "", department: "", notes: "" };
const emptyPayment: PaymentForm = { method: "card", cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("entrega");
  const [delivery, setDelivery] = useState<DeliveryForm>({
    ...emptyDelivery,
    name: user?.name ?? "",
    email: user?.email ?? "",
  });
  const [payment, setPayment] = useState<PaymentForm>(emptyPayment);
  const [loading, setLoading] = useState(false);

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  function handleDeliverySubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("pago");
  }

  async function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push("/pedido/confirmacion?numero=AGR-2026-00487");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-on-surface-variant">Tu carrito está vacío.</p>
        <Link href="/catalogo" className="text-primary underline text-sm">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/carrito" className="text-primary hover:text-primary/80">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2 flex-1">
            {(["entrega", "pago"] as Step[]).map((s, i) => {
              const done = step === "pago" && s === "entrega";
              const active = step === s;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                      done
                        ? "bg-primary text-on-primary"
                        : active
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface-variant"
                    )}
                  >
                    {done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn("text-sm font-medium capitalize", active ? "text-on-surface" : "text-on-surface-variant")}>
                    {s === "entrega" ? "Entrega" : "Pago"}
                  </span>
                  {i < 1 && <ChevronRight className="w-4 h-4 text-on-surface-variant mx-1" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "entrega" ? (
              <form onSubmit={handleDeliverySubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                  <h2 className="font-epilogue font-bold text-xl text-on-surface">Información de entrega</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      Nombre completo *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={delivery.name}
                      onChange={(e) => setDelivery((d) => ({ ...d, name: e.target.value }))}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      Correo electrónico *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={delivery.email}
                      onChange={(e) => setDelivery((d) => ({ ...d, email: e.target.value }))}
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      Teléfono *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={delivery.phone}
                      onChange={(e) => setDelivery((d) => ({ ...d, phone: e.target.value }))}
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                      Ciudad *
                    </Label>
                    <Select required value={delivery.city} onValueChange={(v) => v && setDelivery((d) => ({ ...d, city: v }))}>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Selecciona tu ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Dirección de entrega *
                  </Label>
                  <Input
                    id="address"
                    required
                    value={delivery.address}
                    onChange={(e) => setDelivery((d) => ({ ...d, address: e.target.value }))}
                    placeholder="Calle 123 # 45-67, Apt 8"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                    Instrucciones especiales
                  </Label>
                  <Input
                    id="notes"
                    value={delivery.notes}
                    onChange={(e) => setDelivery((d) => ({ ...d, notes: e.target.value }))}
                    placeholder="Portera, nombre en el interfón, horario preferido..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary text-on-primary hover:bg-primary/90 font-bold gap-2 h-12">
                  Continuar al pago
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="font-epilogue font-bold text-xl text-on-surface">Método de pago</h2>
                </div>

                {/* Payment method selector */}
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { value: "card", label: "Tarjeta" },
                    { value: "transfer", label: "Transferencia" },
                    { value: "pse", label: "PSE" },
                  ] as { value: PaymentForm["method"]; label: string }[]).map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setPayment((p) => ({ ...p, method: m.value }))}
                      className={cn(
                        "border rounded-md p-3 text-sm font-medium transition-colors text-center",
                        payment.method === m.value
                          ? "border-primary bg-primary-container text-on-primary-container"
                          : "border-outline-variant text-on-surface-variant hover:bg-surface-container"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {payment.method === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cardNumber" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                        Número de tarjeta *
                      </Label>
                      <Input
                        id="cardNumber"
                        required
                        value={payment.cardNumber}
                        onChange={(e) => setPayment((p) => ({ ...p, cardNumber: e.target.value }))}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cardName" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                        Nombre en la tarjeta *
                      </Label>
                      <Input
                        id="cardName"
                        required
                        value={payment.cardName}
                        onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))}
                        placeholder="NOMBRE APELLIDO"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="cardExpiry" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                          Vencimiento *
                        </Label>
                        <Input
                          id="cardExpiry"
                          required
                          value={payment.cardExpiry}
                          onChange={(e) => setPayment((p) => ({ ...p, cardExpiry: e.target.value }))}
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cardCvv" className="text-xs font-semibold text-on-surface-variant uppercase tracking-wide">
                          CVV *
                        </Label>
                        <Input
                          id="cardCvv"
                          required
                          value={payment.cardCvv}
                          onChange={(e) => setPayment((p) => ({ ...p, cardCvv: e.target.value }))}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method === "transfer" && (
                  <div className="bg-surface-container-low rounded-md p-4 space-y-2 text-sm">
                    <p className="font-semibold text-on-surface">Datos bancarios AgroConecta</p>
                    <div className="text-on-surface-variant space-y-1">
                      <p>Banco: Bancolombia</p>
                      <p>Cuenta Corriente: 123-456789-00</p>
                      <p>NIT: 901.234.567-8</p>
                    </div>
                    <p className="text-xs text-on-surface-variant/70">Envía el comprobante a pagos@agroconecta.co</p>
                  </div>
                )}

                {payment.method === "pse" && (
                  <div className="bg-surface-container-low rounded-md p-4 text-sm text-on-surface-variant">
                    <p>Serás redirigido a la plataforma PSE de tu banco para completar el pago.</p>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep("entrega")}
                    className="text-sm text-on-surface-variant hover:text-on-surface underline"
                  >
                    ← Volver a entrega
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-bold gap-2 h-12"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Procesando…
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Confirmar pedido · {formatCOP(total)}
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-on-surface-variant text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Transacción segura con cifrado SSL 256-bit
                </p>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-surface-container-low border border-outline-variant rounded-md p-5 space-y-4">
              <h3 className="font-epilogue font-bold text-on-surface">Tu pedido</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded shrink-0 overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-on-surface truncate">{item.product.name}</p>
                      <p className="text-[10px] text-on-surface-variant">{item.quantity} kg</p>
                      <p className="text-xs font-bold text-primary">{formatCOP(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-on-surface">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Envío</span>
                  <span className={deliveryFee === 0 ? "text-primary font-semibold" : "text-on-surface"}>
                    {deliveryFee === 0 ? "GRATIS" : formatCOP(deliveryFee)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-on-surface">
                  <span>Total</span>
                  <span className="text-primary text-lg">{formatCOP(total)}</span>
                </div>
              </div>
            </div>

            {step === "pago" && (
              <div className="bg-surface-container-low border border-outline-variant rounded-md p-4 space-y-1">
                <p className="text-xs font-semibold text-on-surface">Entrega en</p>
                <p className="text-sm text-on-surface">{delivery.address}</p>
                <p className="text-xs text-on-surface-variant">{delivery.city} · {delivery.phone}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
