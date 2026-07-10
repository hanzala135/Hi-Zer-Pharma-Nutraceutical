import { useState } from "react";
import {
  Search, ShoppingCart, Menu, X, ChevronRight, Package, Truck, Shield,
  Plus, Minus, Trash2, Upload, Check, Phone, MapPin, Users, ShoppingBag,
  AlertTriangle, Settings, LogOut, Edit, Trash, FileText, Tag, TrendingUp,
  Award, Circle, LayoutDashboard,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "home" | "shop" | "product" | "cart" | "checkout" | "tracking" | "about";
type AdminPage = "dashboard" | "products" | "add-product" | "categories" | "orders" | "customers" | "settings";

interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  rx: boolean;
  inStock: boolean;
  stock: number;
  image: string;
  description: string;
  dosage: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Brand data ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "General", icon: "🏥" },
  { name: "Female Infertility", icon: "🌸" },
  { name: "Male Infertility", icon: "💙" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "Nutritional", icon: "🌿" },
  { name: "Gynae & Obstetrics", icon: "🤰" },
  { name: "Skin", icon: "✨" },
  { name: "Obesity", icon: "💪" },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "OvaBoost PCOS Support",
    category: "Female Infertility",
    subcategory: "PCOS",
    price: 2800,
    discountPrice: 2400,
    rx: false,
    inStock: true,
    stock: 45,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    description: "A clinically formulated supplement to support hormonal balance and reproductive health in women with PCOS. Contains myo-inositol, alpha-lipoic acid, and chromium.",
    dosage: "Take 2 capsules daily with meals.",
  },
  {
    id: 2,
    name: "FertiMax Male Support",
    category: "Male Infertility",
    subcategory: "Sperm Health",
    price: 3200,
    discountPrice: 2800,
    rx: false,
    inStock: true,
    stock: 32,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop",
    description: "Advanced formula to support male reproductive health, sperm count, and motility. Contains CoQ10, zinc, selenium, and L-carnitine.",
    dosage: "Dissolve 1 sachet daily in 200ml water.",
  },
  {
    id: 3,
    name: "OsteoFlex Plus",
    category: "Orthopedic",
    subcategory: "Joint Support",
    price: 1800,
    rx: false,
    inStock: true,
    stock: 78,
    image: "https://images.unsplash.com/photo-1607619662634-3ac55ec0e216?w=400&h=400&fit=crop",
    description: "Comprehensive joint and bone support formula with glucosamine, chondroitin, and vitamin D3 for improved mobility.",
    dosage: "Take 3 tablets daily with meals.",
  },
  {
    id: 4,
    name: "Clomiphene 50mg",
    category: "Female Infertility",
    subcategory: "Hormone Balance",
    price: 1200,
    discountPrice: 1000,
    rx: true,
    inStock: true,
    stock: 20,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop",
    description: "Prescription ovulation induction therapy for women experiencing anovulatory infertility. Requires valid prescription.",
    dosage: "As prescribed by your physician. Typically 50mg daily for 5 days.",
  },
  {
    id: 5,
    name: "SlimPro Metabolic Blend",
    category: "Obesity",
    subcategory: "Weight Management",
    price: 2200,
    discountPrice: 1900,
    rx: false,
    inStock: true,
    stock: 56,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Scientifically formulated metabolic support blend with green tea extract, CLA, and B-complex to aid healthy weight management.",
    dosage: "Take 2 capsules 30 minutes before meals.",
  },
  {
    id: 6,
    name: "VitaGlow Skin Complex",
    category: "Skin",
    subcategory: "Anti-aging",
    price: 3500,
    discountPrice: 3000,
    rx: false,
    inStock: true,
    stock: 41,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop",
    description: "Premium skin health supplement with marine collagen, vitamins C, E, and biotin for radiant, youthful skin.",
    dosage: "Take 2 capsules daily with water.",
  },
  {
    id: 7,
    name: "OmegaMax 3-6-9",
    category: "Nutritional",
    subcategory: "Essential Fatty Acids",
    price: 1600,
    rx: false,
    inStock: true,
    stock: 92,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=entropy",
    description: "Triple omega complex sourced from cold-pressed flaxseed, sunflower, and fish oil — supporting cardiovascular and brain health.",
    dosage: "Take 2 softgels daily with food.",
  },
  {
    id: 8,
    name: "PreNatal Complete",
    category: "Gynae & Obstetrics",
    subcategory: "Prenatal",
    price: 2600,
    discountPrice: 2300,
    rx: false,
    inStock: false,
    stock: 0,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop&crop=entropy",
    description: "Complete prenatal nutrition with methylfolate, iron bisglycinate, DHA, and 25 essential vitamins and minerals.",
    dosage: "Take 1 tablet daily as directed.",
  },
];

const ORDERS = [
  { id: "#HZ-2024-001", customer: "Fatima Ali", amount: 4800, status: "Delivered", date: "Dec 1, 2024", items: 2 },
  { id: "#HZ-2024-002", customer: "Ahmed Raza", amount: 2800, status: "Processing", date: "Dec 3, 2024", items: 1 },
  { id: "#HZ-2024-003", customer: "Sara Khan", amount: 7200, status: "Shipped", date: "Dec 4, 2024", items: 3 },
  { id: "#HZ-2024-004", customer: "Usman Tariq", amount: 1800, status: "Received", date: "Dec 5, 2024", items: 1 },
  { id: "#HZ-2024-005", customer: "Aisha Malik", amount: 5100, status: "Processing", date: "Dec 6, 2024", items: 2 },
];

const CUSTOMERS = [
  { id: 1, name: "Fatima Ali", email: "fatima.ali@gmail.com", phone: "0300-1234567", orders: 5, spent: 14200 },
  { id: 2, name: "Ahmed Raza", email: "ahmed.raza@yahoo.com", phone: "0311-9876543", orders: 2, spent: 5600 },
  { id: 3, name: "Sara Khan", email: "sara.khan@outlook.com", phone: "0321-4567890", orders: 8, spent: 22400 },
  { id: 4, name: "Usman Tariq", email: "usman.t@gmail.com", phone: "0333-2345678", orders: 1, spent: 1800 },
  { id: 5, name: "Aisha Malik", email: "aisha.m@gmail.com", phone: "0345-6789012", orders: 4, spent: 10200 },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────

const fmt = (n: number) => `Rs. ${n.toLocaleString()}`;

const ff = { fontFamily: "Manrope, sans-serif" };
const fs = { fontFamily: "Fraunces, serif" };

function RxBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#b4502a]/10 text-[#b4502a] border border-[#b4502a]/20">
      Rx
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Shipped: "bg-teal-50 text-teal-700 border-teal-200",
    Received: "bg-gray-50 text-gray-600 border-gray-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? map.Received}`} style={ff}>
      {status}
    </span>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ variant = "teal" }: { variant?: "teal" | "white" }) {
  const main = variant === "white" ? "text-white" : "text-[#0c3f35]";
  const sub = variant === "white" ? "text-[#7dd3bd]" : "text-[#28a869]";
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <span className={`text-[22px] font-bold tracking-tight ${main}`} style={fs}>Hi-Zer</span>
      <span className={`text-[9px] font-semibold tracking-[0.18em] uppercase ${sub}`} style={ff}>Pharma & Nutraceutical</span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ page, onNav, cartCount }: { page: Page; onNav: (p: Page) => void; cartCount: number }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Shop", page: "shop" },
    { label: "Categories", page: "shop" },
    { label: "About", page: "about" },
    { label: "Contact", page: "about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf7]/96 backdrop-blur-md border-b border-[#0c3f35]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <button onClick={() => onNav("home")} className="flex-shrink-0">
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <button
                key={l.label}
                onClick={() => onNav(l.page)}
                className={`text-sm font-medium transition-colors ${page === l.page ? "text-[#0c3f35]" : "text-[#0c1a16]/55 hover:text-[#0c3f35]"}`}
                style={ff}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearch(s => !s)}
              className="p-2.5 rounded-full text-[#0c1a16]/55 hover:text-[#0c3f35] hover:bg-[#0c3f35]/5 transition-colors"
            >
              <Search size={19} />
            </button>
            <button
              onClick={() => onNav("cart")}
              className="relative p-2.5 rounded-full text-[#0c1a16]/55 hover:text-[#0c3f35] hover:bg-[#0c3f35]/5 transition-colors"
            >
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#28a869] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2.5 rounded-full text-[#0c1a16]/55" onClick={() => setOpen(o => !o)}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {search && (
          <div className="pb-4">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0c1a16]/35" />
              <input
                autoFocus
                placeholder="Search products, health concerns..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#0c3f35]/12 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/30"
                style={ff}
              />
            </div>
          </div>
        )}

        {open && (
          <div className="md:hidden border-t border-[#0c3f35]/8 py-3 space-y-0.5">
            {links.map(l => (
              <button
                key={l.label}
                onClick={() => { onNav(l.page); setOpen(false); }}
                className="flex w-full items-center py-2.5 px-1 text-sm font-medium text-[#0c1a16]/65 hover:text-[#0c3f35] transition-colors"
                style={ff}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer className="bg-[#0c3f35] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo variant="white" />
            <p className="text-white/55 text-sm leading-relaxed mt-5 mb-6 max-w-xs" style={ff}>
              Premium pharmaceutical and nutraceutical products — pharmacist-reviewed and delivered with care to your door.
            </p>
            <div className="space-y-2.5 text-sm text-white/55" style={ff}>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 text-[#7dd3bd] flex-shrink-0" />
                <span>Plot No. 246, F Block, Sabzazar, Multan Road, Lahore</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#7dd3bd]" />
                <span>0321 4544343</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#7dd3bd] mb-4" style={ff}>Quick Links</h4>
            <ul className="space-y-2.5" style={ff}>
              {[
                { label: "Shop All", page: "shop" as Page },
                { label: "About Us", page: "about" as Page },
                { label: "Contact", page: "about" as Page },
                { label: "Track Order", page: "tracking" as Page },
              ].map(item => (
                <li key={item.label}>
                  <button onClick={() => onNav(item.page)} className="text-sm text-white/55 hover:text-white transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#7dd3bd] mb-4" style={ff}>Health Concerns</h4>
            <ul className="space-y-2.5" style={ff}>
              {CATEGORIES.slice(0, 5).map(c => (
                <li key={c.name}>
                  <button onClick={() => onNav("shop")} className="text-sm text-white/55 hover:text-white transition-colors">{c.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35" style={ff}>© 2024 Hi-Zer Pharma & Nutraceutical. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/35" style={ff}>
            <button className="hover:text-white/60 transition-colors">Privacy Policy</button>
            <button className="hover:text-white/60 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product, onNav, onAdd,
}: {
  product: Product;
  onNav: (p: Page, prod?: Product) => void;
  onAdd: (p: Product) => void;
}) {
  const price = product.discountPrice ?? product.price;
  const discount = product.discountPrice ? Math.round((1 - product.discountPrice / product.price) * 100) : 0;

  return (
    <div className="group bg-white rounded-2xl border border-[#0c3f35]/8 overflow-hidden hover:shadow-xl hover:shadow-[#0c3f35]/6 hover:border-[#0c3f35]/18 transition-all duration-300">
      <div className="relative bg-[#eef4f1] aspect-square overflow-hidden cursor-pointer" onClick={() => onNav("product", product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.rx && <RxBadge />}
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#b4502a] text-white">
              {discount}% OFF
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#0c1a16]/50" style={ff}>Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] text-[#28a869] font-bold uppercase tracking-wider mb-1" style={ff}>{product.category}</p>
        <h3
          className="text-sm font-semibold text-[#0c1a16] mb-3 leading-snug cursor-pointer hover:text-[#0c3f35] transition-colors"
          style={ff}
          onClick={() => onNav("product", product)}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-[#0c3f35] text-base" style={ff}>{fmt(price)}</span>
          {product.discountPrice && (
            <span className="text-sm text-[#0c1a16]/35 line-through" style={ff}>{fmt(product.price)}</span>
          )}
        </div>
        <button
          onClick={() => product.inStock && onAdd(product)}
          disabled={!product.inStock}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
            product.inStock
              ? "bg-[#0c3f35] text-white hover:bg-[#0c3f35]/88 active:scale-[0.97]"
              : "bg-[#0c1a16]/6 text-[#0c1a16]/30 cursor-not-allowed"
          }`}
          style={ff}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onNav, onAdd }: { onNav: (p: Page, prod?: Product) => void; onAdd: (p: Product) => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c3f35 0%, #155e4a 60%, #0c3f35 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[#28a869]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-[#7dd3bd]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 bg-white/10 text-[#7dd3bd] text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-7"
                style={ff}
              >
                <span className="w-1.5 h-1.5 bg-[#7dd3bd] rounded-full" />
                Pharmacist Verified · Clinically Tested
              </div>
              <h1 className="text-4xl md:text-[52px] font-bold text-white leading-[1.12] mb-6 tracking-tight" style={fs}>
                Science-backed nutrition for a healthier tomorrow
              </h1>
              <p className="text-white/65 text-lg leading-relaxed mb-9" style={ff}>
                Premium pharmaceutical and nutraceutical products, reviewed by certified pharmacists and delivered securely to your door.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNav("shop")}
                  className="px-8 py-3.5 bg-[#28a869] text-white rounded-xl font-semibold hover:bg-[#28a869]/90 active:scale-95 transition-all shadow-lg shadow-[#28a869]/25"
                  style={ff}
                >
                  Shop Products
                </button>
                <button
                  onClick={() => onNav("shop")}
                  className="px-8 py-3.5 bg-white/10 text-white rounded-xl font-semibold border border-white/18 hover:bg-white/18 transition-all"
                  style={ff}
                >
                  Explore Concerns
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=620&h=500&fit=crop"
                  alt="Healthcare professional"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c3f35]/50 to-transparent rounded-3xl" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#28a869]/12 rounded-xl flex items-center justify-center">
                  <Check size={17} className="text-[#28a869]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0c1a16]" style={ff}>10,000+ Customers</p>
                  <p className="text-[11px] text-[#0c1a16]/45" style={ff}>Trusted nationwide</p>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2380b8]/10 rounded-xl flex items-center justify-center">
                  <Shield size={17} className="text-[#2380b8]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0c1a16]" style={ff}>200+ Products</p>
                  <p className="text-[11px] text-[#0c1a16]/45" style={ff}>Certified & verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-[#0c3f35]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Award size={19} className="text-[#0c3f35]" />, title: "Pharmacist Reviewed", desc: "Every product verified" },
              { icon: <Shield size={19} className="text-[#0c3f35]" />, title: "Verified Products", desc: "Authentic & certified" },
              { icon: <Truck size={19} className="text-[#0c3f35]" />, title: "Secure Delivery", desc: "Tracked & insured" },
              { icon: <Package size={19} className="text-[#0c3f35]" />, title: "Discreet Packaging", desc: "Privacy guaranteed" },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0c3f35]/6 rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0c1a16]" style={ff}>{item.title}</p>
                  <p className="text-xs text-[#0c1a16]/45" style={ff}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-bold text-[#28a869] uppercase tracking-[0.18em] mb-2" style={ff}>Health Categories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c1a16]" style={fs}>Shop by Concern</h2>
          </div>
          <button onClick={() => onNav("shop")} className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#0c3f35] hover:gap-2 transition-all" style={ff}>
            View all <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat.name}
              onClick={() => onNav("shop")}
              className="group bg-white rounded-2xl border border-[#0c3f35]/8 p-5 text-left hover:border-[#0c3f35]/22 hover:shadow-md hover:shadow-[#0c3f35]/5 transition-all"
            >
              <div className="text-2xl mb-3">{cat.icon}</div>
              <h3 className="text-sm font-semibold text-[#0c1a16] group-hover:text-[#0c3f35] transition-colors leading-snug" style={ff}>
                {cat.name}
              </h3>
              <div className="mt-2 flex items-center gap-0.5 text-xs text-[#0c1a16]/35" style={ff}>
                Shop <ChevronRight size={11} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20" style={{ background: "#f4f8f5" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold text-[#28a869] uppercase tracking-[0.18em] mb-2" style={ff}>Our Range</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0c1a16]" style={fs}>Featured Products</h2>
            </div>
            <button onClick={() => onNav("shop")} className="hidden md:flex items-center gap-1 text-sm font-semibold text-[#0c3f35] hover:gap-2 transition-all" style={ff}>
              View all <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onNav={onNav} onAdd={onAdd} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "200+", label: "Certified Products" },
            { value: "24h", label: "Fast Delivery" },
            { value: "15+", label: "Healthcare Experts" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl md:text-5xl font-bold text-[#0c3f35] mb-2" style={fs}>{s.value}</p>
              <p className="text-sm text-[#0c1a16]/50 font-medium" style={ff}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: "linear-gradient(110deg, #28a869 0%, #0c3f35 100%)" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={fs}>
            Find the right healthcare solution for you
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto text-base" style={ff}>
            Browse our complete pharmacist-reviewed range across all health categories.
          </p>
          <button
            onClick={() => onNav("shop")}
            className="px-10 py-4 bg-white text-[#0c3f35] rounded-xl font-bold hover:bg-white/92 active:scale-95 transition-all shadow-xl shadow-black/10"
            style={ff}
          >
            Shop Now
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Shop Page ────────────────────────────────────────────────────────────────

function ShopPage({ onNav, onAdd }: { onNav: (p: Page, prod?: Product) => void; onAdd: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");

  const shown = PRODUCTS
    .filter(p => {
      const q = query.toLowerCase();
      const matchQ = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchC = cat === "All" || p.category === cat;
      return matchQ && matchC;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
      if (sort === "price-desc") return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0c1a16]" style={fs}>All Products</h1>
        <p className="text-[#0c1a16]/45 mt-1 text-sm" style={ff}>{shown.length} products available</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0c1a16]/35" />
          <input
            type="text"
            placeholder="Search products or health concerns..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#0c3f35]/12 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25"
            style={ff}
          />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#0c3f35]/12 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25"
          style={ff}
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...CATEGORIES.map(c => c.name)].map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              cat === c
                ? "bg-[#0c3f35] text-white shadow-sm"
                : "bg-white border border-[#0c3f35]/12 text-[#0c1a16]/55 hover:border-[#0c3f35]/25"
            }`}
            style={ff}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shown.map(p => <ProductCard key={p.id} product={p} onNav={onNav} onAdd={onAdd} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-[#0c1a16]/35" style={ff}>
          <p className="text-lg font-medium mb-1">No products found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      )}
    </div>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────

function ProductDetailPage({ product, onNav, onAdd }: { product: Product; onNav: (p: Page) => void; onAdd: (p: Product) => void }) {
  const [qty, setQty] = useState(1);
  const price = product.discountPrice ?? product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => onNav("shop")}
        className="flex items-center gap-1.5 text-sm text-[#0c1a16]/45 hover:text-[#0c3f35] mb-8 transition-colors"
        style={ff}
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div className="bg-[#eef4f1] rounded-3xl overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-[11px] font-bold text-[#28a869] uppercase tracking-[0.18em] mb-2" style={ff}>
            {product.category} · {product.subcategory}
          </p>
          <div className="flex items-start gap-3 mb-5">
            <h1 className="text-3xl font-bold text-[#0c1a16] leading-tight" style={fs}>{product.name}</h1>
            {product.rx && <div className="mt-1"><RxBadge /></div>}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-[#0c3f35]" style={ff}>{fmt(price)}</span>
            {product.discountPrice && (
              <span className="text-lg text-[#0c1a16]/35 line-through" style={ff}>{fmt(product.price)}</span>
            )}
            {product.discountPrice && (
              <span className="text-xs font-bold text-white bg-[#b4502a] px-2 py-0.5 rounded">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="text-[#0c1a16]/65 leading-relaxed mb-6 text-sm" style={ff}>{product.description}</p>

          <div className="bg-[#f0f5f3] rounded-xl p-4 mb-5">
            <p className="text-[10px] font-bold text-[#0c3f35] uppercase tracking-[0.16em] mb-1" style={ff}>Recommended Dosage</p>
            <p className="text-sm text-[#0c1a16]/65" style={ff}>{product.dosage}</p>
          </div>

          {product.rx && (
            <div className="bg-[#b4502a]/6 border border-[#b4502a]/18 rounded-xl p-4 mb-5 flex gap-3">
              <AlertTriangle size={17} className="text-[#b4502a] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-[#b4502a]" style={ff}>Prescription Required Before Purchase</p>
                <p className="text-xs text-[#b4502a]/75 mt-0.5 leading-relaxed" style={ff}>
                  This product is a prescription medicine. You will be required to upload a valid prescription at checkout.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-5 mb-7">
            <span className="text-sm font-medium text-[#0c1a16]/55" style={ff}>Quantity</span>
            <div className="flex items-center border border-[#0c3f35]/15 rounded-xl">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 hover:text-[#0c3f35] transition-colors">
                <Minus size={13} />
              </button>
              <span className="text-sm font-bold w-7 text-center" style={ff}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 hover:text-[#0c3f35] transition-colors">
                <Plus size={13} />
              </button>
            </div>
            <span className="text-xs text-[#0c1a16]/35" style={ff}>
              {product.inStock ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <button
            onClick={() => { for (let i = 0; i < qty; i++) onAdd(product); onNav("cart"); }}
            disabled={!product.inStock}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all active:scale-[0.98] ${
              product.inStock ? "bg-[#0c3f35] text-white hover:bg-[#0c3f35]/88 shadow-lg shadow-[#0c3f35]/15" : "bg-[#0c1a16]/8 text-[#0c1a16]/30 cursor-not-allowed"
            }`}
            style={ff}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

function CartPage({ cart, onNav, onUpdate }: { cart: CartItem[]; onNav: (p: Page) => void; onUpdate: (id: number, q: number) => void }) {
  const subtotal = cart.reduce((s, i) => s + (i.product.discountPrice ?? i.product.price) * i.quantity, 0);
  const delivery = subtotal >= 5000 ? 0 : 200;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#0c1a16] mb-8" style={fs}>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingCart size={44} className="text-[#0c1a16]/18 mx-auto mb-4" />
          <p className="font-medium text-[#0c1a16]/45 mb-6" style={ff}>Your cart is empty</p>
          <button
            onClick={() => onNav("shop")}
            className="px-8 py-3 bg-[#0c3f35] text-white rounded-xl font-semibold hover:bg-[#0c3f35]/88"
            style={ff}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {cart.map(item => {
              const price = item.product.discountPrice ?? item.product.price;
              return (
                <div key={item.product.id} className="flex gap-4 bg-white rounded-2xl border border-[#0c3f35]/8 p-4">
                  <div
                    className="w-20 h-20 bg-[#eef4f1] rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => onNav("product")}
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-[#28a869] font-bold uppercase tracking-wider" style={ff}>{item.product.category}</p>
                        <p className="text-sm font-semibold text-[#0c1a16]" style={ff}>{item.product.name}</p>
                        {item.product.rx && <div className="mt-1"><RxBadge /></div>}
                      </div>
                      <button
                        onClick={() => onUpdate(item.product.id, 0)}
                        className="text-[#0c1a16]/25 hover:text-red-500 flex-shrink-0 p-1 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#0c3f35]/12 rounded-lg">
                        <button onClick={() => onUpdate(item.product.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:text-[#0c3f35] transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-bold w-6 text-center" style={ff}>{item.quantity}</span>
                        <button onClick={() => onUpdate(item.product.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:text-[#0c3f35] transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-bold text-[#0c3f35] text-sm" style={ff}>{fmt(price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6 h-fit">
            <h2 className="text-lg font-bold text-[#0c1a16] mb-5" style={fs}>Order Summary</h2>
            <div className="space-y-3 text-sm mb-5" style={ff}>
              <div className="flex justify-between text-[#0c1a16]/55">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#0c1a16]/55">
                <span>Delivery fee</span>
                <span>{delivery === 0 ? <span className="text-[#28a869] font-medium">Free</span> : fmt(delivery)}</span>
              </div>
              <div className="border-t border-[#0c3f35]/8 pt-3 flex justify-between font-bold text-[#0c1a16]">
                <span>Total</span>
                <span>{fmt(subtotal + delivery)}</span>
              </div>
            </div>
            {subtotal < 5000 && (
              <p className="text-xs text-[#28a869] font-medium mb-4" style={ff}>
                Add {fmt(5000 - subtotal)} more for free delivery
              </p>
            )}
            <button
              onClick={() => onNav("checkout")}
              className="w-full py-3.5 bg-[#0c3f35] text-white rounded-xl font-semibold hover:bg-[#0c3f35]/88 active:scale-[0.98] transition-all shadow-md shadow-[#0c3f35]/15"
              style={ff}
            >
              Proceed to Checkout
            </button>
            <button onClick={() => onNav("shop")} className="w-full mt-3 py-2.5 text-sm text-[#0c1a16]/45 hover:text-[#0c3f35] transition-colors" style={ff}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────

function CheckoutPage({ onNav, hasRx }: { onNav: (p: Page) => void; hasRx: boolean }) {
  const [pay, setPay] = useState<"cod" | "card">("cod");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-[#28a869]/12 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={26} className="text-[#28a869]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#0c1a16] mb-2" style={fs}>Order Placed!</h2>
        <p className="text-sm text-[#0c1a16]/55 mb-1" style={ff}>Order <span className="font-semibold text-[#0c1a16]">#HZ-2024-006</span> confirmed.</p>
        <p className="text-xs text-[#0c1a16]/40 mb-8" style={ff}>A confirmation will be sent via SMS shortly.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => onNav("tracking")} className="px-6 py-3 bg-[#0c3f35] text-white rounded-xl font-semibold" style={ff}>Track Order</button>
          <button onClick={() => onNav("home")} className="px-6 py-3 border border-[#0c3f35]/15 rounded-xl font-semibold text-[#0c1a16]/65" style={ff}>Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[#0c1a16] mb-8" style={fs}>Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          {/* Info */}
          <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6">
            <h2 className="font-bold text-[#0c1a16] mb-4" style={ff}>Personal Information</h2>
            <div className="grid grid-cols-2 gap-3">
              {["First Name", "Last Name", "Email", "Phone Number"].map(f => (
                <input
                  key={f}
                  placeholder={f}
                  className={`${f === "Email" || f === "Phone Number" ? "col-span-2" : ""} px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25`}
                  style={ff}
                />
              ))}
            </div>
          </div>
          {/* Address */}
          <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6">
            <h2 className="font-bold text-[#0c1a16] mb-4" style={ff}>Delivery Address</h2>
            <div className="space-y-3">
              <input placeholder="Street Address" className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25" style={ff} />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="City" className="px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25" style={ff} />
                <input placeholder="Province" className="px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25" style={ff} />
              </div>
            </div>
          </div>
          {/* Payment */}
          <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6">
            <h2 className="font-bold text-[#0c1a16] mb-4" style={ff}>Payment Method</h2>
            <div className="space-y-2.5">
              {[
                { id: "cod", label: "Cash on Delivery", icon: "💵" },
                { id: "card", label: "Card Payment", icon: "💳" },
              ].map(m => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    pay === m.id ? "border-[#0c3f35] bg-[#0c3f35]/3" : "border-[#0c3f35]/12 hover:border-[#0c3f35]/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === m.id}
                    onChange={() => setPay(m.id as "cod" | "card")}
                    className="accent-[#0c3f35]"
                  />
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-sm font-medium text-[#0c1a16]" style={ff}>{m.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* RX Upload */}
          {hasRx && (
            <div className="bg-[#b4502a]/5 border border-[#b4502a]/18 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={15} className="text-[#b4502a]" />
                <h2 className="font-bold text-[#b4502a] text-sm" style={ff}>Prescription Upload Required</h2>
              </div>
              <p className="text-xs text-[#b4502a]/70 mb-4 leading-relaxed" style={ff}>
                Your cart contains prescription-required items. Upload a valid prescription to proceed.
              </p>
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#b4502a]/25 rounded-xl p-6 cursor-pointer hover:bg-[#b4502a]/5 transition-colors">
                <Upload size={18} className="text-[#b4502a]/55" />
                <span className="text-sm text-[#b4502a]/70 font-semibold" style={ff}>Upload Prescription</span>
                <span className="text-xs text-[#b4502a]/40" style={ff}>JPG, PNG, or PDF · max 10 MB</span>
                <input type="file" className="hidden" />
              </label>
            </div>
          )}
        </div>
        <div>
          <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6 sticky top-24">
            <h2 className="font-bold text-[#0c1a16] mb-4" style={ff}>Order Summary</h2>
            <div className="text-sm space-y-2.5 mb-5" style={ff}>
              <div className="flex justify-between text-[#0c1a16]/55"><span>Subtotal</span><span>Rs. 5,200</span></div>
              <div className="flex justify-between text-[#0c1a16]/55"><span>Delivery</span><span className="text-[#28a869] font-medium">Free</span></div>
              <div className="border-t border-[#0c3f35]/8 pt-3 flex justify-between font-bold text-[#0c1a16] text-base">
                <span>Total</span><span>Rs. 5,200</span>
              </div>
            </div>
            <button
              onClick={() => setDone(true)}
              className="w-full py-4 bg-[#0c3f35] text-white rounded-xl font-bold hover:bg-[#0c3f35]/88 active:scale-[0.98] transition-all shadow-md shadow-[#0c3f35]/15"
              style={ff}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Order Tracking ───────────────────────────────────────────────────────────

function OrderTrackingPage() {
  const steps = [
    { label: "Order Received", desc: "Dec 4, 2024 · 2:30 PM", done: true },
    { label: "Processing", desc: "Dec 4, 2024 · 4:15 PM — Being prepared", done: true },
    { label: "Shipped", desc: "Dec 5, 2024 · 9:00 AM · TCS Express", done: true },
    { label: "Delivered", desc: "Expected Dec 6, 2024", done: false },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-[#0c1a16] mb-1" style={fs}>Order Tracking</h1>
      <p className="text-[#0c1a16]/45 mb-8 text-sm" style={ff}>Order #HZ-2024-003 · Sara Khan</p>

      <div className="bg-white rounded-2xl border border-[#0c3f35]/8 p-8">
        <div className="relative">
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[#0c3f35]/8" />
          <div className="space-y-9">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-start gap-5 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all ${
                  step.done
                    ? "bg-[#28a869] border-[#28a869] shadow-md shadow-[#28a869]/25"
                    : "bg-white border-[#0c3f35]/15"
                }`}>
                  {step.done
                    ? <Check size={15} className="text-white" strokeWidth={2.5} />
                    : <Circle size={14} className="text-[#0c1a16]/20" />
                  }
                </div>
                <div className="pt-1.5">
                  <p className={`text-sm font-bold ${step.done ? "text-[#0c1a16]" : "text-[#0c1a16]/35"}`} style={ff}>{step.label}</p>
                  <p className="text-xs text-[#0c1a16]/40 mt-0.5" style={ff}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div>
      <section style={{ background: "#eef4f1" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[11px] font-bold text-[#28a869] uppercase tracking-[0.18em] mb-3" style={ff}>Our Story</p>
              <h1 className="text-4xl font-bold text-[#0c1a16] mb-6 leading-tight" style={fs}>
                Bringing premium healthcare closer to every home
              </h1>
              <p className="text-[#0c1a16]/60 leading-relaxed mb-4 text-sm" style={ff}>
                Hi-Zer Pharma & Nutraceutical was founded with a singular mission: to make science-backed, pharmacist-reviewed healthcare products accessible to every Pakistani household.
              </p>
              <p className="text-[#0c1a16]/60 leading-relaxed text-sm" style={ff}>
                We work with certified pharmaceutical manufacturers and clinical nutritionists to curate a range that meets the highest standards of safety, efficacy, and purity.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=620&h=420&fit=crop"
                alt="Hi-Zer team"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-[#0c1a16] mb-4" style={fs}>Our Mission</h2>
          <p className="text-[#0c1a16]/55 leading-relaxed text-sm" style={ff}>
            To empower individuals with trusted, clinically verified pharmaceutical and nutraceutical products — bridging the gap between professional healthcare guidance and everyday wellness.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Clinical Verification", desc: "Every product is reviewed by our certified pharmacist team before it reaches our customers.", icon: "🔬" },
            { title: "Nationwide Delivery", desc: "Secure, tracked shipping across Pakistan — Lahore, Karachi, Islamabad, and beyond.", icon: "🇵🇰" },
            { title: "Patient Privacy", desc: "Discreet packaging and strict data privacy — especially for sensitive health categories.", icon: "🔒" },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl border border-[#0c3f35]/8 p-6">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-[#0c1a16] mb-2" style={ff}>{item.title}</h3>
              <p className="text-sm text-[#0c1a16]/55 leading-relaxed" style={ff}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#eef4f1" }} className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0c1a16] mb-7" style={fs}>Get in Touch</h2>
              <div className="space-y-5" style={ff}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0c3f35]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#0c3f35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0c1a16]">Address</p>
                    <p className="text-sm text-[#0c1a16]/55 mt-0.5">Plot No. 246, F Block, Sabzazar,<br />Multan Road, Lahore</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#0c3f35]/8 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#0c3f35]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0c1a16]">Phone</p>
                    <p className="text-sm text-[#0c1a16]/55 mt-0.5">0321 4544343</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#0c3f35]/8">
              <h3 className="font-bold text-[#0c1a16] mb-4" style={ff}>Send a Message</h3>
              <div className="space-y-3">
                <input placeholder="Your Name" className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25" style={ff} />
                <input placeholder="Email Address" className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25" style={ff} />
                <textarea placeholder="Your message..." rows={4} className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#0c3f35]/8 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a869]/25 resize-none" style={ff} />
                <button className="w-full py-3 bg-[#0c3f35] text-white rounded-xl font-semibold hover:bg-[#0c3f35]/88 active:scale-[0.98] transition-all" style={ff}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN SECTION — accessed only via /admin path
// ═══════════════════════════════════════════════════════════════════════════════

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center mb-3">
            <span className="text-xl font-bold text-[#0c3f35]" style={fs}>Hi-Zer</span>
            <span className="text-[9px] font-semibold tracking-[0.18em] text-[#28a869] uppercase" style={ff}>Pharma & Nutraceutical</span>
          </div>
          <br />
          <span className="inline-block bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full" style={ff}>Admin Panel</span>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={ff}>Sign In</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider" style={ff}>Email</label>
              <input type="email" defaultValue="admin@hi-zer.com" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider" style={ff}>Password</label>
                <button className="text-xs text-[#0c3f35] hover:underline" style={ff}>Forgot password?</button>
              </div>
              <input type="password" defaultValue="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rem" defaultChecked className="accent-[#0c3f35]" />
              <label htmlFor="rem" className="text-sm text-gray-500" style={ff}>Remember me</label>
            </div>
            <button
              onClick={onLogin}
              className="w-full py-3 bg-[#0c3f35] text-white rounded-lg font-semibold hover:bg-[#0c3f35]/88 active:scale-[0.98] transition-all"
              style={ff}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLayout({ children, page, onPage, onLogout }: { children: React.ReactNode; page: AdminPage; onPage: (p: AdminPage) => void; onLogout: () => void }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { id: "products", label: "Products", icon: <ShoppingBag size={16} /> },
    { id: "categories", label: "Categories", icon: <Tag size={16} /> },
    { id: "orders", label: "Orders", icon: <FileText size={16} /> },
    { id: "customers", label: "Customers", icon: <Users size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];
  const active = page === "add-product" ? "products" : page;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-100">
          <span className="text-[17px] font-bold text-[#0c3f35]" style={fs}>Hi-Zer</span>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5" style={ff}>Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-2.5 space-y-0.5">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => onPage(item.id as AdminPage)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === item.id
                  ? "bg-[#0c3f35] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
              style={ff}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-2.5 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
            style={ff}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-7">
        <h1 className="text-xl font-bold text-gray-900" style={ff}>Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5" style={ff}>Friday, December 6, 2024</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Total Orders", value: "247", sub: "+12% this month", icon: <FileText size={16} />, col: "text-blue-600 bg-blue-50" },
          { label: "Revenue", value: "Rs. 4.8L", sub: "+8.3% this month", icon: <TrendingUp size={16} />, col: "text-emerald-600 bg-emerald-50" },
          { label: "Products", value: "84", sub: "3 added this week", icon: <ShoppingBag size={16} />, col: "text-teal-600 bg-teal-50" },
          { label: "Low Stock Alerts", value: "6", sub: "Needs attention", icon: <AlertTriangle size={16} />, col: "text-orange-600 bg-orange-50" },
        ].map(w => (
          <div key={w.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${w.col}`}>{w.icon}</div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5" style={ff}>{w.value}</p>
            <p className="text-xs text-gray-400" style={ff}>{w.label}</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1" style={ff}>{w.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-sm" style={ff}>Recent Orders</h2>
            <button className="text-xs text-[#0c3f35] font-semibold" style={ff}>View all</button>
          </div>
          <div className="divide-y divide-gray-50">
            {ORDERS.map(o => (
              <div key={o.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate" style={ff}>{o.customer}</p>
                  <p className="text-xs text-gray-400 mt-0.5" style={ff}>{o.id} · {o.date}</p>
                </div>
                <div className="text-right flex-shrink-0 space-y-1">
                  <p className="text-sm font-bold text-gray-900" style={ff}>Rs. {o.amount.toLocaleString()}</p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-sm" style={ff}>Low Stock Products</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {PRODUCTS.filter(p => p.stock < 30).map(p => (
              <div key={p.id} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate" style={ff}>{p.name}</p>
                  <p className="text-xs text-gray-400" style={ff}>{p.category}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  p.stock === 0 ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                }`} style={ff}>
                  {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminProducts({ onPage }: { onPage: (p: AdminPage) => void }) {
  const [q, setQ] = useState("");
  const rows = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={ff}>Products</h1>
          <p className="text-xs text-gray-400 mt-0.5" style={ff}>{PRODUCTS.length} total products</p>
        </div>
        <button
          onClick={() => onPage("add-product")}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0c3f35] text-white rounded-lg text-sm font-semibold hover:bg-[#0c3f35]/88 active:scale-[0.97] transition-all"
          style={ff}
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="relative w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18"
              style={ff}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["Product", "Category", "Price", "Stock", "Rx", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900" style={ff}>{p.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500" style={ff}>{p.category}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-900" style={ff}>
                    {fmt(p.discountPrice ?? p.price)}
                    {p.discountPrice && <span className="ml-1.5 text-xs text-gray-400 line-through font-normal">{fmt(p.price)}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      p.stock === 0 ? "bg-red-50 text-red-600" :
                      p.stock < 30 ? "bg-orange-50 text-orange-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`} style={ff}>
                      {p.stock === 0 ? "Out of stock" : `${p.stock} units`}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {p.rx ? <span className="text-xs font-bold text-[#b4502a]">Rx</span> : <span className="text-xs text-gray-300">—</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-[#0c3f35] hover:bg-[#0c3f35]/5 rounded-lg transition-colors"><Edit size={13} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AddProductForm({ onBack }: { onBack: () => void }) {
  const [rx, setRx] = useState(false);

  return (
    <div className="p-8 max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 mb-6 transition-colors" style={ff}>
        ← Back to Products
      </button>
      <h1 className="text-xl font-bold text-gray-900 mb-6" style={ff}>Add Product</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Product Name</label>
            <input placeholder="e.g. OvaBoost PCOS Support" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Description</label>
            <textarea rows={3} placeholder="Product description..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18 resize-none" style={ff} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Category</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18 bg-white" style={ff}>
              {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Subcategory</label>
            <input placeholder="e.g. PCOS" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Price (Rs.)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Discount Price (Rs.)</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Stock Quantity</label>
            <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c3f35]/18" style={ff} />
          </div>
          <div className="flex items-center gap-3 self-end pb-0.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider" style={ff}>Prescription Required</span>
            <button
              onClick={() => setRx(!rx)}
              className={`relative w-11 h-6 rounded-full transition-colors ${rx ? "bg-[#0c3f35]" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${rx ? "translate-x-5" : ""}`} />
            </button>
            {rx && <span className="text-xs font-bold text-[#b4502a]">Rx</span>}
          </div>
          <div className="col-span-2">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5" style={ff}>Product Image</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-[#0c3f35]/30 hover:bg-gray-50 transition-colors">
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-500" style={ff}>Upload Image</span>
              <span className="text-xs text-gray-400" style={ff}>PNG, JPG up to 5 MB</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
          <button onClick={onBack} className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50" style={ff}>Cancel</button>
          <button className="px-5 py-2.5 rounded-lg bg-[#0c3f35] text-white text-sm font-semibold hover:bg-[#0c3f35]/88 active:scale-[0.97] transition-all" style={ff}>Save Product</button>
        </div>
      </div>
    </div>
  );
}

function AdminCategories() {
  const tree = [
    { name: "Female Infertility", subs: ["PCOS", "Hormone Balance", "Fallopian Support"] },
    { name: "Male Infertility", subs: ["Sperm Health", "Testosterone Support"] },
    { name: "Orthopedic", subs: ["Joint Support", "Bone Health", "Post-Surgery Recovery"] },
    { name: "Nutritional", subs: ["Essential Fatty Acids", "Vitamins & Minerals", "Protein"] },
    { name: "Skin", subs: ["Anti-aging", "Acne Management", "Brightening"] },
    { name: "Obesity", subs: ["Weight Management", "Metabolism", "Appetite Control"] },
    { name: "Gynae & Obstetrics", subs: ["Prenatal", "Postnatal", "Menopause"] },
    { name: "General", subs: ["Immunity", "Energy & Vitality", "Gut Health"] },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900" style={ff}>Categories</h1>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0c3f35] text-white rounded-lg text-sm font-semibold" style={ff}>
          <Plus size={15} /> Add Category
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {tree.map(cat => (
          <div key={cat.name} className="p-4.5 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-sm font-bold text-gray-900" style={ff}>{cat.name}</p>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-[#0c3f35] rounded-lg transition-colors"><Edit size={12} /></button>
                <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash size={12} /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-3">
              {cat.subs.map(sub => (
                <span key={sub} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600" style={ff}>
                  → {sub}
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><X size={9} /></button>
                </span>
              ))}
              <button className="px-2.5 py-1 border border-dashed border-gray-200 rounded-lg text-xs text-gray-400 hover:border-[#0c3f35]/35 hover:text-[#0c3f35] transition-colors" style={ff}>
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminOrders() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6" style={ff}>Orders</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["Order ID", "Customer", "Amount", "Items", "Status", "Date", ""].map(h => (
                  <th key={h + Math.random()} className="text-left px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ORDERS.map(o => (
                <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-mono text-gray-500 text-xs">{o.id}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900" style={ff}>{o.customer}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900" style={ff}>Rs. {o.amount.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={ff}>{o.items}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-3.5 text-sm text-gray-400" style={ff}>{o.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-[#0c3f35] font-bold hover:underline" style={ff}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminCustomers() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold text-gray-900 mb-6" style={ff}>Customers</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/60">
                {["Customer", "Email", "Phone", "Orders", "Total Spent"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider" style={ff}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CUSTOMERS.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0c3f35]/10 flex items-center justify-center text-xs font-bold text-[#0c3f35]" style={ff}>
                        {c.name.charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-gray-900" style={ff}>{c.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={ff}>{c.email}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={ff}>{c.phone}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900" style={ff}>{c.orders}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900" style={ff}>Rs. {c.spent.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6" style={ff}>Settings</h1>
      <div className="space-y-3">
        {[
          { title: "Store Settings", desc: "Name, logo, contact details, and business hours" },
          { title: "Delivery Rules", desc: "Zones, fees, minimum order thresholds, and free delivery rules" },
          { title: "Admin Users", desc: "Manage staff accounts and access to this panel" },
          { title: "Roles & Permissions", desc: "Define what each staff role can view and edit" },
        ].map(item => (
          <button
            key={item.title}
            className="w-full bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between hover:border-gray-200 hover:shadow-sm transition-all text-left"
          >
            <div>
              <p className="text-sm font-bold text-gray-900" style={ff}>{item.title}</p>
              <p className="text-xs text-gray-400 mt-0.5" style={ff}>{item.desc}</p>
            </div>
            <ChevronRight size={15} className="text-gray-400 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const isAdmin =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/admin") || window.location.hash === "#/admin");

  // Storefront state
  const [sfPage, setSfPage] = useState<Page>("home");
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Admin state
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminPage, setAdminPage] = useState<AdminPage>("dashboard");

  function navTo(page: Page, prod?: Product) {
    setSfPage(page);
    if (prod) setProduct(prod);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(p: Product) {
    setCart(prev => {
      const ex = prev.find(i => i.product.id === p.id);
      if (ex) return prev.map(i => i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product: p, quantity: 1 }];
    });
  }

  function updateCart(id: number, qty: number) {
    setCart(prev => qty <= 0 ? prev.filter(i => i.product.id !== id) : prev.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  }

  // ── Admin branch ──
  if (isAdmin) {
    if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;
    return (
      <AdminLayout page={adminPage} onPage={setAdminPage} onLogout={() => setLoggedIn(false)}>
        {adminPage === "dashboard" && <AdminDashboard />}
        {adminPage === "products" && <AdminProducts onPage={setAdminPage} />}
        {adminPage === "add-product" && <AddProductForm onBack={() => setAdminPage("products")} />}
        {adminPage === "categories" && <AdminCategories />}
        {adminPage === "orders" && <AdminOrders />}
        {adminPage === "customers" && <AdminCustomers />}
        {adminPage === "settings" && <AdminSettings />}
      </AdminLayout>
    );
  }

  // ── Storefront branch ──
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const hasRx = cart.some(i => i.product.rx);

  return (
    <div className="min-h-screen bg-[#fbfaf7]" style={{ scrollbarWidth: "none" }}>
      <Navbar page={sfPage} onNav={navTo} cartCount={cartCount} />
      {sfPage === "home" && <HomePage onNav={navTo} onAdd={addToCart} />}
      {sfPage === "shop" && <ShopPage onNav={navTo} onAdd={addToCart} />}
      {sfPage === "product" && product && <ProductDetailPage product={product} onNav={navTo} onAdd={addToCart} />}
      {sfPage === "cart" && <CartPage cart={cart} onNav={navTo} onUpdate={updateCart} />}
      {sfPage === "checkout" && <CheckoutPage onNav={navTo} hasRx={hasRx} />}
      {sfPage === "tracking" && <OrderTrackingPage />}
      {sfPage === "about" && <AboutPage />}
      <Footer onNav={navTo} />
    </div>
  );
}
