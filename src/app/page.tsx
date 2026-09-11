"use client";

import { useState } from "react";
import {
  Bell,
  Boxes,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  PackageCheck,
  Pencil,
  Plus,
  Search,
  Settings,
  Send,
  ShoppingBag,
  Trash2,
  Truck,
  Users,
  X,
} from "lucide-react";

type Language = "ja" | "en" | "th";
type Module = "dashboard" | "customers" | "products" | "quotes" | "orders" | "shipping" | "settings";

const copy = {
  ja: {
    greeting: "おはようございます、Gaiaさん", subtitle: "今日の営業チームの状況をご確認ください。", dashboard: "ダッシュボード", customers: "顧客管理", products: "商品管理", quotes: "見積管理", orders: "受注管理", shipping: "出荷管理", settings: "設定", workspace: "営業管理", addCustomer: "顧客を追加", revenue: "今月の売上", revenueDelta: "先月比 +18.6%", activeDeals: "進行中の案件", newCustomers: "新規顧客", pendingQuotes: "保留中の見積", target: "月間売上目標", targetText: "目標達成まであと ¥520,000", pipeline: "営業パイプライン", pipelineSub: "担当者別の案件状況", recent: "最近のアクティビティ", recentSub: "チームからの最新情報", viewAll: "すべて見る", company: "会社名", owner: "担当者", value: "金額", stage: "ステージ", negotiation: "交渉中", proposal: "提案済み", won: "受注", closed: "成約済み", activity1: "Nova Retailとの商談を受注", activity2: "Mango Houseを新規顧客として追加", activity3: "見積ステータスを更新", quick: "クイックアクセス", manage: "業務をすばやく開始", search: "検索...", language: "言語", help: "ヘルプセンター", salesTarget: "売上目標", month: "2026年9月", live: "ライブデータ", welcome: "PKSIAM Sales Deskへようこそ", login: "ログイン", loginNote: "社内アカウントで続行してください", email: "メールアドレス", password: "パスワード", signIn: "ログインする", demo: "デモモードで続行", loginError: "デモモードでログインしました", moduleNote: "このモジュールの概要を準備中です。", newItem: "新規作成"
  },
  en: {
    greeting: "Good morning, Gaia", subtitle: "Here is your sales team's pulse for today.", dashboard: "Dashboard", customers: "Customers", products: "Products", quotes: "Quotes", orders: "Orders", shipping: "Shipping", settings: "Settings", workspace: "Sales operations", addCustomer: "Add customer", revenue: "Monthly revenue", revenueDelta: "+18.6% vs last month", activeDeals: "Active deals", newCustomers: "New customers", pendingQuotes: "Pending quotes", target: "Monthly sales target", targetText: "¥520,000 remaining to target", pipeline: "Sales pipeline", pipelineSub: "Deal progress by owner", recent: "Recent activity", recentSub: "Latest updates from your team", viewAll: "View all", company: "Company", owner: "Owner", value: "Value", stage: "Stage", negotiation: "Negotiating", proposal: "Proposal sent", won: "Won", closed: "Closed", activity1: "closed a deal with Nova Retail", activity2: "added Mango House as a new customer", activity3: "updated a quote status", quick: "Quick access", manage: "Start a task quickly", search: "Search...", language: "Language", help: "Help center", salesTarget: "Sales target", month: "September 2026", live: "Live data", welcome: "Welcome to PKSIAM Sales Desk", login: "Sign in", loginNote: "Continue with your internal account", email: "Email address", password: "Password", signIn: "Sign in", demo: "Continue in demo mode", loginError: "Signed in with demo mode", moduleNote: "An overview for this module is being prepared.", newItem: "Create new"
  },
  th: {
    greeting: "สวัสดีตอนเช้า Gaia", subtitle: "ดูภาพรวมของทีมขายสำหรับวันนี้", dashboard: "แดชบอร์ด", customers: "ลูกค้า", products: "สินค้า", quotes: "ใบเสนอราคา", orders: "คำสั่งซื้อ", shipping: "การจัดส่ง", settings: "ตั้งค่า", workspace: "การขาย", addCustomer: "เพิ่มลูกค้า", revenue: "ยอดขายเดือนนี้", revenueDelta: "+18.6% จากเดือนที่แล้ว", activeDeals: "ดีลที่กำลังดำเนินการ", newCustomers: "ลูกค้าใหม่", pendingQuotes: "ใบเสนอราคาที่รอดำเนินการ", target: "เป้าหมายยอดขายรายเดือน", targetText: "เหลืออีก ¥520,000 ถึงเป้าหมาย", pipeline: "ไปป์ไลน์การขาย", pipelineSub: "สถานะดีลแยกตามผู้รับผิดชอบ", recent: "กิจกรรมล่าสุด", recentSub: "อัปเดตล่าสุดจากทีม", viewAll: "ดูทั้งหมด", company: "บริษัท", owner: "ผู้รับผิดชอบ", value: "มูลค่า", stage: "สถานะ", negotiation: "กำลังเจรจา", proposal: "ส่งข้อเสนอแล้ว", won: "ชนะดีล", closed: "ปิดดีลแล้ว", activity1: "ปิดดีลกับ Nova Retail", activity2: "เพิ่ม Mango House เป็นลูกค้าใหม่", activity3: "อัปเดตสถานะใบเสนอราคา", quick: "เข้าถึงด่วน", manage: "เริ่มงานได้อย่างรวดเร็ว", search: "ค้นหา...", language: "ภาษา", help: "ศูนย์ช่วยเหลือ", salesTarget: "เป้าหมายยอดขาย", month: "กันยายน 2026", live: "ข้อมูลสด", welcome: "ยินดีต้อนรับสู่ PKSIAM Sales Desk", login: "เข้าสู่ระบบ", loginNote: "ดำเนินการต่อด้วยบัญชีภายใน", email: "อีเมล", password: "รหัสผ่าน", signIn: "เข้าสู่ระบบ", demo: "ดำเนินการต่อในโหมดสาธิต", loginError: "เข้าสู่ระบบด้วยโหมดสาธิตแล้ว", moduleNote: "กำลังเตรียมภาพรวมสำหรับโมดูลนี้", newItem: "สร้างใหม่"
  },
};

const navItems: { key: Module; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", icon: LayoutDashboard }, { key: "customers", icon: Users }, { key: "products", icon: Boxes }, { key: "quotes", icon: FileText }, { key: "orders", icon: ShoppingBag }, { key: "shipping", icon: Truck },
];

const activities = ["activity1", "activity2", "activity3"] as const;

type Customer = {
  id: number;
  companyName: string;
  contactName: string;
  language: Language;
  telephone: string;
  email: string;
  billingAddress: string;
  shippingAddress: string;
  paymentTerms: string;
  salesperson: string;
  notes: string;
  active: boolean;
};

type CustomerForm = Omit<Customer, "id" | "active">;

type Product = {
  id: number;
  sku: string;
  nameJa: string;
  nameEn: string;
  nameTh: string;
  unit: string;
  defaultPrice: string;
  taxRate: string;
  stock: string;
  storageType: string;
  countryOfOrigin: string;
  active: boolean;
};

type ProductForm = Omit<Product, "id" | "active">;

type OrderLine = {
  id: number;
  productId: number;
  quantity: number;
};

type Shipment = {
  id: number;
  customer: string;
  carrier: "Yamato" | "Sagawa" | "Japan Post" | "Other";
  trackingNumber: string;
  shippingAddress: string;
  shippingDate: string;
  requestedDeliveryDate: string;
  status: "Pending" | "Ready" | "Shipped" | "Delivered";
};

const emptyCustomer: CustomerForm = {
  companyName: "",
  contactName: "",
  language: "en",
  telephone: "",
  email: "",
  billingAddress: "",
  shippingAddress: "",
  paymentTerms: "",
  salesperson: "",
  notes: "",
};

const initialCustomers: Customer[] = [
  { id: 1, companyName: "Nova Retail", contactName: "Kanya T.", language: "th", telephone: "+66 2 555 0182", email: "kanya@novaretail.co.th", billingAddress: "88 Sukhumvit Rd, Bangkok", shippingAddress: "Warehouse 3, Samut Prakan", paymentTerms: "Net 30", salesperson: "Gaia S.", notes: "CRM integration renewal", active: true },
  { id: 2, companyName: "Mango House", contactName: "Pim N.", language: "en", telephone: "+66 81 443 2901", email: "pim@mangohouse.co.th", billingAddress: "12 Nimman Rd, Chiang Mai", shippingAddress: "12 Nimman Rd, Chiang Mai", paymentTerms: "50% upfront", salesperson: "Kanya T.", notes: "Annual contract", active: true },
  { id: 3, companyName: "Siam Logistics", contactName: "Wichai S.", language: "ja", telephone: "+66 2 101 7744", email: "wichai@siamlogistics.co.th", billingAddress: "41 Rama IX Rd, Bangkok", shippingAddress: "41 Rama IX Rd, Bangkok", paymentTerms: "Net 45", salesperson: "Gaia S.", notes: "Fleet management", active: false },
];

const emptyProduct: ProductForm = { sku: "", nameJa: "", nameEn: "", nameTh: "", unit: "pcs", defaultPrice: "", taxRate: "7", stock: "0", storageType: "Ambient", countryOfOrigin: "Thailand" };

const initialProducts: Product[] = [
  { id: 1, sku: "PK-COF-001", nameJa: "タイコーヒー", nameEn: "Thai Coffee", nameTh: "กาแฟไทย", unit: "bag", defaultPrice: "280.00", taxRate: "7", stock: "240", storageType: "Ambient", countryOfOrigin: "Thailand", active: true },
  { id: 2, sku: "PK-TEA-014", nameJa: "ジャスミン茶", nameEn: "Jasmine Tea", nameTh: "ชามะลิ", unit: "box", defaultPrice: "145.00", taxRate: "7", stock: "86", storageType: "Ambient", countryOfOrigin: "Thailand", active: true },
  { id: 3, sku: "PK-MNG-022", nameJa: "マンゴーピューレ", nameEn: "Mango Puree", nameTh: "มะม่วงบด", unit: "kg", defaultPrice: "190.00", taxRate: "0", stock: "0", storageType: "Chilled", countryOfOrigin: "Thailand", active: false },
];

const initialShipments: Shipment[] = [
  { id: 1, customer: "Nova Retail", carrier: "Yamato", trackingNumber: "YT-TH-884201", shippingAddress: "Warehouse 3, Samut Prakan", shippingDate: "2026-09-12", requestedDeliveryDate: "2026-09-14", status: "Ready" },
  { id: 2, customer: "Mango House", carrier: "Japan Post", trackingNumber: "", shippingAddress: "12 Nimman Rd, Chiang Mai", shippingDate: "", requestedDeliveryDate: "2026-09-16", status: "Pending" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ja");
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const t = copy[language];

  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600); };
  const moduleLabel = t[activeModule];

  if (!loggedIn) {
    return <main className="login-page"><div className="login-art"><div className="brand-mark">PK<span>S</span></div><div className="login-art-copy"><p>PKSIAM / SALES OPERATIONS</p><h1>{t.welcome}</h1><span>One clear view of every customer, quote, order, and delivery.</span></div><div className="art-grid" /></div><div className="login-panel"><div className="login-top"><div className="brand-word"><strong>PKSIAM</strong><span>SALES DESK</span></div><LanguageSelect language={language} setLanguage={setLanguage} /></div><div className="login-form"><div className="eyebrow">INTERNAL WORKSPACE</div><h2>{t.login}</h2><p>{t.loginNote}</p><label>{t.email}<input type="email" placeholder="name@pksiam.com" /></label><label>{t.password}<input type="password" placeholder="••••••••" /></label><button className="primary-action" onClick={() => setLoggedIn(true)}>{t.signIn}<ChevronRight size={16} /></button><div className="or"><span>or</span></div><button className="secondary-action" onClick={() => { setLoggedIn(true); notify(t.loginError); }}>{t.demo}</button></div><div className="login-footer"><CircleHelp size={15} />{t.help}<span>© PKSIAM</span></div></div></main>;
  }

  return <main className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}><div className="sidebar-head"><div className="brand-mark small">PK<span>S</span></div><div className="brand-word"><strong>PKSIAM</strong><span>SALES DESK</span></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></button></div><div className="workspace-label">{t.workspace}</div><nav>{navItems.map(({ key, icon: Icon }) => <button key={key} className={activeModule === key ? "nav-link active" : "nav-link"} onClick={() => { setActiveModule(key); setMobileOpen(false); }}><Icon size={17} /><span>{t[key]}</span>{key === "customers" && <em>12</em>}</button>)}<div className="nav-divider" /><button className={activeModule === "settings" ? "nav-link active" : "nav-link"} onClick={() => setActiveModule("settings")}><Settings size={17} /><span>{t.settings}</span></button></nav><div className="sidebar-bottom"><button className="help-link"><CircleHelp size={17} /><span>{t.help}</span><ChevronRight size={14} /></button><div className="user-card"><div className="avatar">GS</div><div><strong>Gaia S.</strong><small>Sales Manager</small></div><ChevronDown size={15} /></div></div></aside>
    <section className="main-area"><header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21} /></button><div className="breadcrumbs"><span>PKSIAM</span><ChevronRight size={13} /><strong>{moduleLabel}</strong></div><div className="topbar-actions"><div className="search"><Search size={16} /><input placeholder={t.search} /></div><button className="notification"><Bell size={18} /><i /></button><LanguageSelect language={language} setLanguage={setLanguage} /><div className="top-avatar">GS</div></div></header><div className="content"><div className="page-heading"><div><div className="eyebrow">{t.month} <span className="live-dot" /> {t.live}</div><h1>{activeModule === "dashboard" ? t.greeting : moduleLabel}</h1><p>{activeModule === "dashboard" ? t.subtitle : t.moduleNote}</p></div><button className="primary-action compact" onClick={() => notify(`${t.newItem}: ${moduleLabel}`)}>＋ {activeModule === "dashboard" ? t.addCustomer : t.newItem}</button></div>{activeModule === "dashboard" ? <Dashboard t={t} activities={activities} onNotify={notify} /> : <ModuleView title={moduleLabel} t={t} onNotify={notify} />}</div></section><div className={notice ? "toast visible" : "toast"}>{notice}</div>
  </main>;
}

function LanguageSelect({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return <div className="language-select" aria-label="Language"><span>文</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)}><option value="ja">日本語</option><option value="en">English</option><option value="th">ไทย</option></select></div>;
}

function Dashboard({ t, activities, onNotify }: { t: typeof copy.ja; activities: readonly string[]; onNotify: (message: string) => void }) {
  return <><div className="metric-grid"><Metric icon="¥" value="¥2,480,000" label={t.revenue} change={t.revenueDelta} /><Metric icon="◒" value="48" label={t.activeDeals} change="+12.4%" tone="blue" /><Metric icon="✦" value="126" label={t.newCustomers} change="+24.8%" tone="orange" /><Metric icon="%" value="32.8%" label={t.pendingQuotes} change="-2.1%" tone="pink" /></div><div className="dashboard-grid"><section className="card chart-card"><SectionHeader title={t.pipeline} subtitle={t.pipelineSub} action={t.viewAll} /><div className="chart-summary"><strong>¥2.48M</strong><span>↗ 18.6%</span><small>82% of target</small></div><div className="chart"><div className="chart-lines" /><svg viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3d8b7e" stopOpacity=".22" /><stop offset="1" stopColor="#3d8b7e" stopOpacity="0" /></linearGradient></defs><path d="M0 176 C40 166 72 175 110 143 S176 155 224 122 S280 130 323 95 S388 120 430 88 S496 98 540 59 S622 69 700 24 L700 220 L0 220Z" fill="url(#chart-fill)" /><path d="M0 176 C40 166 72 175 110 143 S176 155 224 122 S280 130 323 95 S388 120 430 88 S496 98 540 59 S622 69 700 24" fill="none" stroke="#3d8b7e" strokeWidth="3" /></svg><div className="chart-labels"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div></section><section className="card target-card"><SectionHeader title={t.target} subtitle={t.month} action="•••" /><div className="target-ring"><strong>82<small>%</small></strong></div><p className="target-value">¥2.48M <span>/ ¥3.00M</span></p><p className="target-note">{t.targetText}</p><div className="progress"><i /></div><div className="progress-meta"><span>¥0</span><span>¥3M</span></div></section></div><div className="lower-grid"><section className="card pipeline-card"><SectionHeader title={t.pipeline} subtitle={t.pipelineSub} action={t.viewAll} /><PipelineTable t={t} /></section><section className="card activity-card"><SectionHeader title={t.recent} subtitle={t.recentSub} action="•••" /><div className="activity-list">{activities.map((activity, index) => <div className="activity-row" key={activity}><div className={`activity-dot dot-${index}`} /><div><p><strong>{["Kanya T.", "Pim N.", "Wichai S."][index]}</strong> {t[activity as keyof typeof t]}</p><small>{["10 min ago", "35 min ago", "1 hour ago"][index]}</small></div></div>)}</div><button className="activity-footer" onClick={() => onNotify(t.viewAll)}>{t.viewAll} <ChevronRight size={14} /></button></section></div><section className="quick-access"><div><p className="eyebrow">{t.quick}</p><h2>{t.manage}</h2></div><QuickAction icon={<Users size={18} />} label={t.customers} onClick={() => onNotify(t.customers)} /><QuickAction icon={<FileText size={18} />} label={t.quotes} onClick={() => onNotify(t.quotes)} /><QuickAction icon={<PackageCheck size={18} />} label={t.shipping} onClick={() => onNotify(t.shipping)} /></section></>;
}

function Metric({ icon, value, label, change, tone = "green" }: { icon: string; value: string; label: string; change: string; tone?: string }) { return <article className={`metric-card ${tone}`}><div className="metric-label"><span>{label}</span><b>{icon}</b></div><strong>{value}</strong><div className="metric-change"><span>↗ {change}</span><small>vs last month</small></div></article>; }
function SectionHeader({ title, subtitle, action }: { title: string; subtitle: string; action: string }) { return <div className="section-header"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="section-action">{action}</button></div>; }
function PipelineTable({ t }: { t: typeof copy.ja }) { const rows = [["Nova Retail", "Kanya T.", "¥450,000", t.negotiation, "teal"], ["Mango House", "Pim N.", "¥285,000", t.proposal, "blue"], ["Siam Logistics", "Wichai S.", "¥192,000", t.won, "green"]]; return <div className="table-scroll"><table><thead><tr><th>{t.company}</th><th>{t.owner}</th><th>{t.value}</th><th>{t.stage}</th></tr></thead><tbody>{rows.map(([company, owner, value, stage, tone]) => <tr key={company}><td><strong>{company}</strong><small>{company === "Nova Retail" ? "CRM Integration" : company === "Mango House" ? "Annual contract" : "Fleet management"}</small></td><td><span className="person"><i>{owner.slice(0, 2)}</i>{owner}</span></td><td><strong>{value}</strong></td><td><span className={`status ${tone}`}>{stage}</span></td></tr>)}</tbody></table></div>; }
function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) { return <button className="quick-action" onClick={onClick}><span>{icon}</span><strong>{label}</strong><ChevronRight size={15} /></button>; }
function ModuleView({ title, t, onNotify }: { title: string; t: typeof copy.ja; onNotify: (message: string) => void }) {
  if (title === t.customers) return <CustomersView t={t} />;
  if (title === t.products) return <ProductsView />;
  if (title === t.quotes) return <QuotesView />;
  if (title === t.orders) return <OrdersView />;
  if (title === t.shipping) return <ShippingView />;
  return <section className="module-empty card"><div className="module-icon"><ClipboardList size={25} /></div><h2>{title}</h2><p>{t.moduleNote}</p><button className="primary-action compact" onClick={() => onNotify(`${t.newItem}: ${title}`)}>{t.newItem}</button></section>;
}

function CustomersView({ t }: { t: typeof copy.ja }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<CustomerForm>(emptyCustomer);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredCustomers = customers.filter((customer) =>
    [customer.companyName, customer.contactName, customer.email, customer.telephone, customer.salesperson]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyCustomer);
    setShowForm(true);
  };

  const openEdit = (customer: Customer) => {
    const { id, active, ...customerForm } = customer;
    void id;
    void active;
    setEditingId(customer.id);
    setForm(customerForm);
    setShowForm(true);
  };

  const saveCustomer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingId === null) {
      setCustomers((current) => [...current, { ...form, id: Date.now(), active: true }]);
    } else {
      setCustomers((current) => current.map((customer) => customer.id === editingId ? { ...customer, ...form } : customer));
    }
    setShowForm(false);
  };

  const updateForm = (field: keyof CustomerForm, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return <div className="customer-workspace">
    <div className="customer-toolbar"><div className="customer-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company, contact, email..." /></div><button className="primary-action compact" onClick={openCreate}><Plus size={16} /> {t.newItem}</button></div>
    <div className="customer-summary"><span><strong>{filteredCustomers.length}</strong> customers</span><span><i className="active-dot" /> {customers.filter((customer) => customer.active).length} active</span></div>
    <section className="card customer-table-card"><div className="table-scroll"><table className="customer-table"><thead><tr><th>Company</th><th>Contact</th><th>Language</th><th>Telephone</th><th>Email</th><th>Salesperson</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{filteredCustomers.map((customer) => <tr key={customer.id}><td><strong>{customer.companyName}</strong><small>{customer.paymentTerms || "Payment terms not set"}</small></td><td>{customer.contactName}</td><td><span className="language-badge">{customer.language === "ja" ? "Japanese" : customer.language === "en" ? "English" : "Thai"}</span></td><td>{customer.telephone}</td><td>{customer.email}</td><td>{customer.salesperson || "Unassigned"}</td><td><span className={`status ${customer.active ? "green" : "muted"}`}>{customer.active ? "Active" : "Inactive"}</span></td><td><div className="row-actions"><button aria-label={`Edit ${customer.companyName}`} onClick={() => openEdit(customer)}><Pencil size={14} /></button><button aria-label={customer.active ? `Deactivate ${customer.companyName}` : `Activate ${customer.companyName}`} onClick={() => setCustomers((current) => current.map((item) => item.id === customer.id ? { ...item, active: !item.active } : item))}><span>{customer.active ? "Deactive" : "Activate"}</span></button><button aria-label={`Delete ${customer.companyName}`} onClick={() => setCustomers((current) => current.filter((item) => item.id !== customer.id))}><Trash2 size={14} /></button></div></td></tr>)}</tbody></table>{filteredCustomers.length === 0 && <p className="empty-state">No customers match your search.</p>}</div></section>
    {showForm && <div className="customer-form-wrap"><form className="card customer-form" onSubmit={saveCustomer}><div className="section-header"><div><h2>{editingId === null ? "Create customer" : "Edit customer"}</h2><p>Keep customer contacts and delivery details together.</p></div><button type="button" className="form-close" onClick={() => setShowForm(false)}>×</button></div><div className="form-grid"><label>Company Name<input required value={form.companyName} onChange={(event) => updateForm("companyName", event.target.value)} /></label><label>Contact Name<input required value={form.contactName} onChange={(event) => updateForm("contactName", event.target.value)} /></label><label>Language<select value={form.language} onChange={(event) => updateForm("language", event.target.value)}><option value="ja">Japanese</option><option value="en">English</option><option value="th">Thai</option></select></label><label>Telephone<input type="tel" value={form.telephone} onChange={(event) => updateForm("telephone", event.target.value)} /></label><label>Email<input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} /></label><label>Payment Terms<input value={form.paymentTerms} onChange={(event) => updateForm("paymentTerms", event.target.value)} placeholder="Net 30" /></label><label>Assigned Salesperson<input value={form.salesperson} onChange={(event) => updateForm("salesperson", event.target.value)} /></label><label>Billing Address<textarea required value={form.billingAddress} onChange={(event) => updateForm("billingAddress", event.target.value)} /></label><label>Shipping Address<textarea required value={form.shippingAddress} onChange={(event) => updateForm("shippingAddress", event.target.value)} /></label><label className="form-wide">Notes<textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} /></label></div><div className="form-actions"><button type="button" className="secondary-action" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-action">{editingId === null ? "Create customer" : "Save changes"}</button></div></form></div>}
  </div>;
}

function ProductsView() {
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const filteredProducts = products.filter((product) => [product.sku, product.nameJa, product.nameEn, product.nameTh, product.storageType, product.countryOfOrigin].join(" ").toLowerCase().includes(query.toLowerCase()));

  const updateForm = (field: keyof ProductForm, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const openCreate = () => { setEditingId(null); setForm(emptyProduct); setShowForm(true); };
  const openEdit = (product: Product) => { const { id, active, ...productForm } = product; void id; void active; setEditingId(product.id); setForm(productForm); setShowForm(true); };
  const saveProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editingId === null) setProducts((current) => [...current, { ...form, id: Date.now(), active: true }]);
    else setProducts((current) => current.map((product) => product.id === editingId ? { ...product, ...form } : product));
    setShowForm(false);
  };

  return <div className="customer-workspace">
    <div className="customer-toolbar"><div className="customer-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SKU or product name..." /></div><button className="primary-action compact" onClick={openCreate}><Plus size={16} /> Create product</button></div>
    <div className="customer-summary"><span><strong>{filteredProducts.length}</strong> products</span><span><i className="active-dot" /> {products.filter((product) => product.active).length} active</span><span>{products.reduce((total, product) => total + Number(product.stock), 0)} units in stock</span></div>
    <section className="card customer-table-card"><div className="table-scroll"><table className="customer-table product-table"><thead><tr><th>SKU</th><th>Japanese Name</th><th>English Name</th><th>Thai Name</th><th>Unit</th><th>Default Price</th><th>Tax Rate</th><th>Stock</th><th>Storage</th><th>Origin</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{filteredProducts.map((product) => <tr key={product.id}><td><strong>{product.sku}</strong></td><td>{product.nameJa}</td><td>{product.nameEn}</td><td>{product.nameTh}</td><td>{product.unit}</td><td>{product.defaultPrice} THB</td><td>{product.taxRate}%</td><td><strong>{product.stock}</strong></td><td>{product.storageType}</td><td>{product.countryOfOrigin}</td><td><span className={`status ${product.active ? "green" : "muted"}`}>{product.active ? "Active" : "Inactive"}</span></td><td><div className="row-actions"><button aria-label={`Edit ${product.sku}`} onClick={() => openEdit(product)}><Pencil size={14} /></button><button aria-label={product.active ? `Deactivate ${product.sku}` : `Activate ${product.sku}`} onClick={() => setProducts((current) => current.map((item) => item.id === product.id ? { ...item, active: !item.active } : item))}><span>{product.active ? "Deactivate" : "Activate"}</span></button><button aria-label={`Delete ${product.sku}`} onClick={() => setProducts((current) => current.filter((item) => item.id !== product.id))}><Trash2 size={14} /></button></div></td></tr>)}</tbody></table>{filteredProducts.length === 0 && <p className="empty-state">No products match your search.</p>}</div></section>
    {showForm && <div className="customer-form-wrap"><form className="card customer-form" onSubmit={saveProduct}><div className="section-header"><div><h2>{editingId === null ? "Create product" : "Edit product"}</h2><p>Keep catalog names, pricing, and stock details current.</p></div><button type="button" className="form-close" onClick={() => setShowForm(false)}>×</button></div><div className="form-grid"><label>SKU<input required value={form.sku} onChange={(event) => updateForm("sku", event.target.value)} /></label><label>Unit<input required value={form.unit} onChange={(event) => updateForm("unit", event.target.value)} /></label><label>Japanese Name<input required value={form.nameJa} onChange={(event) => updateForm("nameJa", event.target.value)} /></label><label>English Name<input required value={form.nameEn} onChange={(event) => updateForm("nameEn", event.target.value)} /></label><label>Thai Name<input required value={form.nameTh} onChange={(event) => updateForm("nameTh", event.target.value)} /></label><label>Default Price<input required type="number" min="0" step="0.01" value={form.defaultPrice} onChange={(event) => updateForm("defaultPrice", event.target.value)} /></label><label>Tax Rate (%)<input required type="number" min="0" max="100" step="0.01" value={form.taxRate} onChange={(event) => updateForm("taxRate", event.target.value)} /></label><label>Stock<input required type="number" min="0" step="0.01" value={form.stock} onChange={(event) => updateForm("stock", event.target.value)} /></label><label>Storage Type<input value={form.storageType} onChange={(event) => updateForm("storageType", event.target.value)} placeholder="Ambient, Chilled..." /></label><label>Country of Origin<input value={form.countryOfOrigin} onChange={(event) => updateForm("countryOfOrigin", event.target.value)} /></label></div><div className="form-actions"><button type="button" className="secondary-action" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-action">{editingId === null ? "Create product" : "Save changes"}</button></div></form></div>}
  </div>;
}

function ShippingView() {
  const [shipments, setShipments] = useState(initialShipments);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Shipment>(initialShipments[0]);
  const [showForm, setShowForm] = useState(false);
  const updateForm = (field: keyof Shipment, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const openCreate = () => { setEditingId(null); setForm({ id: Date.now(), customer: "", carrier: "Other", trackingNumber: "", shippingAddress: "", shippingDate: "", requestedDeliveryDate: "", status: "Pending" }); setShowForm(true); };
  const openEdit = (shipment: Shipment) => { setEditingId(shipment.id); setForm(shipment); setShowForm(true); };
  const saveShipment = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); if (editingId === null) setShipments((current) => [...current, form]); else setShipments((current) => current.map((shipment) => shipment.id === editingId ? form : shipment)); setShowForm(false); };

  return <div className="customer-workspace"><div className="customer-toolbar"><div className="customer-summary"><span><strong>{shipments.length}</strong> shipments</span><span><i className="active-dot" /> {shipments.filter((shipment) => shipment.status !== "Delivered").length} active</span></div><button className="primary-action compact" onClick={openCreate}><Plus size={16} /> Create shipment</button></div><section className="card customer-table-card"><div className="table-scroll"><table className="customer-table"><thead><tr><th>Customer</th><th>Carrier</th><th>Tracking Number</th><th>Shipping Address</th><th>Shipping Date</th><th>Requested Delivery</th><th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{shipments.map((shipment) => <tr key={shipment.id}><td><strong>{shipment.customer}</strong></td><td>{shipment.carrier}</td><td>{shipment.trackingNumber || <span className="muted-text">Not entered</span>}</td><td>{shipment.shippingAddress}</td><td>{shipment.shippingDate || <span className="muted-text">Not set</span>}</td><td>{shipment.requestedDeliveryDate || <span className="muted-text">Not set</span>}</td><td><span className={`status ${shipment.status === "Delivered" ? "green" : shipment.status === "Shipped" ? "blue" : shipment.status === "Ready" ? "teal" : "muted"}`}>{shipment.status}</span></td><td><button className="row-edit" aria-label={`Edit shipment for ${shipment.customer}`} onClick={() => openEdit(shipment)}><Pencil size={14} /></button></td></tr>)}</tbody></table></div></section>{showForm && <div className="customer-form-wrap"><form className="card customer-form" onSubmit={saveShipment}><div className="section-header"><div><h2>{editingId === null ? "Create shipment" : "Edit shipment"}</h2><p>Tracking numbers are entered manually until carrier API integration is added.</p></div><button type="button" className="form-close" onClick={() => setShowForm(false)}>×</button></div><div className="form-grid"><label>Customer<input required value={form.customer} onChange={(event) => updateForm("customer", event.target.value)} placeholder="Customer name" /></label><label>Carrier<select value={form.carrier} onChange={(event) => updateForm("carrier", event.target.value)}><option>Yamato</option><option>Sagawa</option><option>Japan Post</option><option>Other</option></select></label><label>Tracking Number<input value={form.trackingNumber} onChange={(event) => updateForm("trackingNumber", event.target.value)} placeholder="Enter manually" /></label><label>Status<select value={form.status} onChange={(event) => updateForm("status", event.target.value)}><option>Pending</option><option>Ready</option><option>Shipped</option><option>Delivered</option></select></label><label className="form-wide">Shipping Address<textarea required value={form.shippingAddress} onChange={(event) => updateForm("shippingAddress", event.target.value)} /></label><label>Shipping Date<input type="date" value={form.shippingDate} onChange={(event) => updateForm("shippingDate", event.target.value)} /></label><label>Requested Delivery Date<input type="date" value={form.requestedDeliveryDate} onChange={(event) => updateForm("requestedDeliveryDate", event.target.value)} /></label></div><div className="form-actions"><button type="button" className="secondary-action" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-action">Save shipment</button></div></form></div>}</div>;
}

function QuotesView() {
  const [customerId, setCustomerId] = useState<number | "">("");
  const [shippingMethod, setShippingMethod] = useState("Standard delivery");
  const [shippingAmount, setShippingAmount] = useState("0");
  const [lines, setLines] = useState<OrderLine[]>([{ id: 1, productId: initialProducts[0].id, quantity: 1 }]);
  const [generated, setGenerated] = useState(false);
  const [sent, setSent] = useState(false);
  const [converted, setConverted] = useState(false);

  const selectedCustomer = initialCustomers.find((customer) => customer.id === customerId);
  const activeProducts = initialProducts.filter((product) => product.active);
  const documentTitle = selectedCustomer?.language === "ja" ? "御見積書" : selectedCustomer?.language === "th" ? "ใบเสนอราคา" : "Quotation";
  const subtotal = lines.reduce((total, line) => {
    const product = initialProducts.find((item) => item.id === line.productId);
    return total + (product ? Number(product.defaultPrice) * line.quantity : 0);
  }, 0);
  const taxAmount = lines.reduce((total, line) => {
    const product = initialProducts.find((item) => item.id === line.productId);
    return total + (product ? Number(product.defaultPrice) * line.quantity * Number(product.taxRate) / 100 : 0);
  }, 0);
  const total = subtotal + taxAmount + Number(shippingAmount || 0);

  const updateLine = (id: number, field: "productId" | "quantity", value: string) => setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: field === "productId" ? Number(value) : Math.max(1, Number(value) || 1) } : line));
  const generateQuotation = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setGenerated(true); setSent(false); setConverted(false); };

  return <div className="order-workspace"><form onSubmit={generateQuotation}>
    <section className="card order-section"><div className="order-step"><span>1</span><div><h2>Customer</h2><p>Select a customer to set the quotation language.</p></div></div><select required value={customerId} onChange={(event) => { setCustomerId(event.target.value ? Number(event.target.value) : ""); setGenerated(false); }}><option value="">Select customer</option>{initialCustomers.filter((customer) => customer.active).map((customer) => <option key={customer.id} value={customer.id}>{customer.companyName} · {customer.contactName}</option>)}</select>{selectedCustomer && <div className="quote-document-language"><strong>{documentTitle}</strong><span>{selectedCustomer.language === "ja" ? "Japanese" : selectedCustomer.language === "th" ? "Thai" : "English"} customer document</span></div>}</section>
    <section className="card order-section"><div className="order-step"><span>2</span><div><h2>Product & Quantity</h2><p>Choose products. Catalog prices and tax rates are applied automatically.</p></div></div><div className="order-lines">{lines.map((line) => { const product = initialProducts.find((item) => item.id === line.productId); return <div className="order-line" key={line.id}><select value={line.productId} onChange={(event) => updateLine(line.id, "productId", event.target.value)}>{activeProducts.map((item) => <option key={item.id} value={item.id}>{item.sku} · {item.nameEn}</option>)}</select><label>Quantity<input type="number" min="1" step="1" value={line.quantity} onChange={(event) => updateLine(line.id, "quantity", event.target.value)} /></label><div className="line-price"><small>Price / Tax</small><strong>{product?.defaultPrice} THB · {product?.taxRate}%</strong></div>{lines.length > 1 && <button type="button" className="line-remove" onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}>×</button>}</div>; })}</div><button type="button" className="add-line" onClick={() => setLines((current) => [...current, { id: Date.now(), productId: activeProducts[0].id, quantity: 1 }])}><Plus size={14} /> Add product</button></section>
    <section className="card order-section"><div className="order-step"><span>3</span><div><h2>Shipping</h2><p>Add shipping before tax and total are calculated.</p></div></div><div className="form-grid order-shipping-grid"><label>Shipping Method<select value={shippingMethod} onChange={(event) => setShippingMethod(event.target.value)}><option>Standard delivery</option><option>Express delivery</option><option>Pickup</option></select></label><label>Shipping Amount<input type="number" min="0" step="0.01" value={shippingAmount} onChange={(event) => setShippingAmount(event.target.value)} /></label></div></section>
    <section className="card order-total"><div><span>Subtotal</span><strong>{subtotal.toFixed(2)} THB</strong></div><div><span>Tax</span><strong>{taxAmount.toFixed(2)} THB</strong></div><div><span>Shipping</span><strong>{Number(shippingAmount || 0).toFixed(2)} THB</strong></div><div className="grand-total"><span>Total</span><strong>{total.toFixed(2)} THB</strong></div><button type="submit" className="primary-action" disabled={!customerId}>Generate Quotation <FileText size={15} /></button></section>
  </form>{generated && <section className="card quote-actions"><div><strong>{documentTitle}</strong><span>Quotation generated for {selectedCustomer?.companyName}</span></div><div className="quote-action-buttons"><button className="secondary-action" onClick={() => setSent(true)}><Send size={14} /> {sent ? "Sent to Customer" : "Send Customer"}</button><button className="primary-action" onClick={() => setConverted(true)}><ArrowRight size={14} /> {converted ? "Converted to Order" : "Convert to Order"}</button></div></section>}{(sent || converted) && <div className="toast visible">{converted ? "Quote converted to order" : "Quotation sent to customer"}</div>}</div>;
}

function OrdersView() {
  const [customerId, setCustomerId] = useState<number | "">("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Standard delivery");
  const [shippingAmount, setShippingAmount] = useState("0");
  const [lines, setLines] = useState<OrderLine[]>([{ id: 1, productId: initialProducts[0].id, quantity: 1 }]);
  const [saved, setSaved] = useState(false);

  const selectedCustomer = initialCustomers.find((customer) => customer.id === customerId);
  const activeProducts = initialProducts.filter((product) => product.active);
  const subtotal = lines.reduce((total, line) => {
    const product = initialProducts.find((item) => item.id === line.productId);
    return total + (product ? Number(product.defaultPrice) * line.quantity : 0);
  }, 0);
  const taxAmount = lines.reduce((total, line) => {
    const product = initialProducts.find((item) => item.id === line.productId);
    return total + (product ? Number(product.defaultPrice) * line.quantity * Number(product.taxRate) / 100 : 0);
  }, 0);
  const total = subtotal + taxAmount + Number(shippingAmount || 0);

  const updateLine = (id: number, field: "productId" | "quantity", value: string) => {
    setLines((current) => current.map((line) => line.id === id ? { ...line, [field]: field === "productId" ? Number(value) : Math.max(1, Number(value) || 1) } : line));
  };

  const saveOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  return <div className="order-workspace"><form onSubmit={saveOrder}>
    <section className="card order-section"><div className="order-step"><span>1</span><div><h2>Customer</h2><p>Choose the customer for this order.</p></div></div><select required value={customerId} onChange={(event) => { setCustomerId(event.target.value ? Number(event.target.value) : ""); const customer = initialCustomers.find((item) => item.id === Number(event.target.value)); setShippingAddress(customer?.shippingAddress || ""); }}><option value="">Select customer</option>{initialCustomers.filter((customer) => customer.active).map((customer) => <option key={customer.id} value={customer.id}>{customer.companyName} · {customer.contactName}</option>)}</select>{selectedCustomer && <div className="order-customer-note"><strong>{selectedCustomer.email}</strong><span>{selectedCustomer.telephone}</span></div>}</section>
    <section className="card order-section"><div className="order-step"><span>2</span><div><h2>Products</h2><p>Select products and quantities. Prices are loaded from the catalog.</p></div></div><div className="order-lines">{lines.map((line) => { const product = initialProducts.find((item) => item.id === line.productId); return <div className="order-line" key={line.id}><select value={line.productId} onChange={(event) => updateLine(line.id, "productId", event.target.value)}>{activeProducts.map((item) => <option key={item.id} value={item.id}>{item.sku} · {item.nameEn}</option>)}</select><label>Quantity<input type="number" min="1" step="1" value={line.quantity} onChange={(event) => updateLine(line.id, "quantity", event.target.value)} /></label><div className="line-price"><small>System price</small><strong>{product?.defaultPrice} THB / {product?.unit}</strong></div>{lines.length > 1 && <button type="button" className="line-remove" onClick={() => setLines((current) => current.filter((item) => item.id !== line.id))}>×</button>}</div>; })}</div><button type="button" className="add-line" onClick={() => setLines((current) => [...current, { id: Date.now(), productId: activeProducts[0].id, quantity: 1 }])}><Plus size={14} /> Add product</button></section>
    <section className="card order-section"><div className="order-step"><span>3</span><div><h2>Shipping</h2><p>Confirm delivery details and shipping cost.</p></div></div><div className="form-grid order-shipping-grid"><label>Shipping Address<textarea required value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} placeholder="Select a customer or enter address" /></label><label>Shipping Method<select value={shippingMethod} onChange={(event) => setShippingMethod(event.target.value)}><option>Standard delivery</option><option>Express delivery</option><option>Pickup</option></select></label><label>Shipping Amount<input type="number" min="0" step="0.01" value={shippingAmount} onChange={(event) => setShippingAmount(event.target.value)} /></label></div></section>
    <section className="card order-total"><div><span>Subtotal</span><strong>{subtotal.toFixed(2)} THB</strong></div><div><span>Tax</span><strong>{taxAmount.toFixed(2)} THB</strong></div><div><span>Shipping</span><strong>{Number(shippingAmount || 0).toFixed(2)} THB</strong></div><div className="grand-total"><span>Total</span><strong>{total.toFixed(2)} THB</strong></div><button type="submit" className="primary-action" disabled={!customerId || lines.length === 0}>Save order</button></section>
  </form>{saved && <div className="toast visible">Order saved successfully</div>}</div>;
}
