import Link from "next/link";
import { Sprout, Globe, Send, MessageCircle, Share2 } from "lucide-react";

const footerLinks = {
  Comprar: [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/catalogo?categoria=Verduras", label: "Verduras" },
    { href: "/catalogo?categoria=Frutas", label: "Frutas" },
    { href: "/catalogo?categoria=Granos", label: "Granos" },
  ],
  Agricultores: [
    { href: "/registro?rol=agricultor", label: "Regístrate" },
    { href: "/agricultor/panel", label: "Mi Panel" },
    { href: "#", label: "Requisitos" },
  ],
  Institucional: [
    { href: "/institucional", label: "Portal Institucional" },
    { href: "#", label: "Programa PAE" },
    { href: "#", label: "Licitaciones" },
  ],
  Empresa: [
    { href: "#", label: "Nosotros" },
    { href: "#", label: "Impacto Social" },
    { href: "#", label: "Prensa" },
    { href: "#", label: "Contacto" },
  ],
};

const socialIcons = [Globe, MessageCircle, Send, Share2];

export function Footer() {
  return (
    <footer className="bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sprout className="w-6 h-6 text-secondary-container" />
              <span className="font-epilogue font-bold text-xl">
                Agro<span className="text-secondary-container">Conecta</span>
              </span>
            </Link>
            <p className="text-inverse-on-surface/70 text-sm leading-relaxed max-w-xs">
              Conectamos agricultores colombianos con compradores que valoran la frescura,
              la trazabilidad y el comercio justo.
            </p>
            <p className="mt-4 text-secondary-container font-bold text-lg">
              82% va directo al agricultor.
            </p>
            <div className="flex gap-4 mt-6">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-inverse-on-surface/50 hover:text-secondary-container transition-colors"
                  aria-label="Red social"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-epilogue font-semibold text-sm uppercase tracking-widest mb-4 text-inverse-on-surface/50">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-inverse-on-surface/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-inverse-on-surface/40">
            © 2026 AgroConecta SAS. Bogotá, Colombia. NIT 901.234.567-8
          </p>
          <div className="flex gap-6">
            {["Términos", "Privacidad", "Cookies"].map((t) => (
              <a key={t} href="#" className="text-xs text-inverse-on-surface/40 hover:text-inverse-on-surface/70">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
