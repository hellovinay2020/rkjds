import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Shield, BadgeCheck, Receipt, Users, Building2, IndianRupee, CheckCircle2, Smartphone, QrCode, Landmark, Info, Loader2, BookOpen, Church } from "lucide-react";
import { FaHandsPraying } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import qrCodeImg from "@/assets/qr-code/qr-code-1.jpeg";
import { fetchDonationSettings, type DonationSettings } from "@/data/donate";
import api from "@/lib/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const causes = [
  {
    icon: FaHandsPraying,
    title: "सुसमाचार प्रचार सेवकाई",
    subtitle: "Village Gospel Outreach",
    amount: "₹1,500 / गाँव सभा",
    color: "#D97706",
  },
  {
    icon: BookOpen,
    title: "पवित्र बाइबिल वितरण",
    subtitle: "Free Bible Distribution",
    amount: "₹500 / 2 पवित्र बाइबिल",
    color: "#2563EB",
  },
  {
    icon: Church,
    title: "रविवार संगति व आराधना",
    subtitle: "Church Worship & Fellowship",
    amount: "₹2,500 / मासिक सहयोग",
    color: "#059669",
  },
  {
    icon: Heart,
    title: "ज़रूरतमंद व चंगाई सेवा",
    subtitle: "Compassion & Healing Aid",
    amount: "₹3,000 / परिवार सहायता",
    color: "#7C3AED",
  },
];

const trust = [
  { icon: Shield, title: "100% Secure", desc: "Encrypted, PCI-compliant payments." },
  { icon: BadgeCheck, title: "80G Tax Benefit", desc: "Save up to 50% in taxes on every donation." },
  { icon: Receipt, title: "Instant Receipt", desc: "Auto-mailed receipt for your records." },
];

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function DonatePage() {
  const navigate = useNavigate();
  const [loaderData, setLoaderData] = useState<{ settings: any }>({ settings: null });
  const [loading, setLoading] = useState(true);
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(0);
  const [custom, setCustom] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    document.title = "Donate / Tithes — RKV MINISTRIES | Azamgarh, U.P.";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const settings = await fetchDonationSettings();
        setLoaderData({ settings });
        setAmount(settings.onceAmounts[1] || 0);
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    loadRazorpayScript().then(setRazorpayReady);
  }, []);

  if (loading) return <Preloader />;

  const { settings } = loaderData;
  const s = settings;
  const firstAccount = s.bankAccounts[0];
  const amounts = freq === "monthly" && s.monthlyAmounts.length > 0 ? s.monthlyAmounts : s.onceAmounts;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) return setMessage({ type: "error", text: "Please enter your full name" });
    if (!email.trim()) return setMessage({ type: "error", text: "Please enter your email" });
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) return setMessage({ type: "error", text: "Please enter a valid 10-digit phone number" });
    if (!amount || amount < 1) return setMessage({ type: "error", text: "Please enter a donation amount" });
    if (!razorpayReady) return setMessage({ type: "error", text: "Payment gateway loading. Please wait." });

    setPayLoading(true);
    try {
      const { data: orderData } = await api.post("/donations/create-order", {
        amount,
        donorName: name.trim(),
        donorEmail: email.trim(),
        donorPhone: phone.replace(/\D/g, ""),
        donorAddress: address.trim(),
        address: address.trim(),
        donorPAN: pan.trim(),
        donationType: freq,
        purpose: "General",
      });

      const { orderId, subscriptionId, amount: orderAmount, currency, keyId, donorMeta } = orderData.data;

      const options: any = {
        key: keyId,
        amount: orderAmount,
        currency,
        name: "RKV MINISTRIES",
        description: `Donation - ${freq === "monthly" ? "Monthly" : "One-Time"}`,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.replace(/\D/g, "") },
        theme: { color: "#FF6B00" },
        handler: async function (response: any) {
          try {
            const { data: verifyData } = await api.post("/donations/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              razorpaySubscriptionId: response.razorpay_subscription_id,
              donorMeta: { ...donorMeta, amount },
            });
            setMessage({ type: "success", text: "Payment successful! Receipt will be sent to your email." });
            setName(""); setEmail(""); setPhone(""); setAddress(""); setPan(""); setCustom(""); setAmount(s.onceAmounts[1] || 0);
          } catch (err: any) {
            setMessage({ type: "error", text: "Error saving record: " + (err?.response?.data?.message || err.message) });
          }
        },
        modal: {
          ondismiss: () => setPayLoading(false),
        },
      };

      if (orderId) {
        options.order_id = orderId;
      }
      if (subscriptionId) {
        options.subscription_id = subscriptionId;
      }

      setPayLoading(false);
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function () {
        setMessage({ type: "error", text: "Payment failed. Please try again." });
      });
      rzp.open();
    } catch (err: any) {
      setPayLoading(false);
      setMessage({ type: "error", text: err?.response?.data?.message || "Failed to initiate payment. Please try again." });
    }
  }

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Donate"
        description="Your contribution fuels real change — every rupee empowers women, educates children and uplifts communities across India."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Donate" }]}
      />

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">Make a Difference</span>
            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-navy font-display leading-tight mt-4">Every Rupee You Give <span className="text-orange">Changes a Life</span></h2>
            <div className="mt-3 h-1 w-16 bg-orange rounded-full" />
            <p className="mt-5 text-text-2 text-[15px] leading-relaxed">Your offerings, tithes, and donations directly support RKV MINISTRIES, Sunday worship services, village gospel outreach, baptism sacraments, prayer fellowship, and community aid in Azamgarh, Uttar Pradesh.</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {causes.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 hover:shadow-md hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: `${c.color}15`, color: c.color }}
                  >
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-navy text-[14.5px] font-display truncate leading-tight">
                      {c.title}
                    </div>
                    <div className="text-[11.5px] text-slate-400 font-medium truncate mt-0.5">
                      {c.subtitle}
                    </div>
                    <div
                      className="text-[12.5px] font-bold mt-1 inline-block"
                      style={{ color: c.color }}
                    >
                      {c.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {trust.map((t) => (
                <div key={t.title} className="bg-white border border-border rounded-[16px] p-5 text-center">
                  <t.icon className="w-7 h-7 text-orange mx-auto" />
                  <div className="font-bold text-navy mt-2 text-[14px] font-display">{t.title}</div>
                  <div className="text-[12px] text-text-2 mt-1 leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border h-fit lg:sticky lg:top-28">
            <div className="text-center pb-5 border-b border-border">
              <Heart className="w-10 h-10 text-orange mx-auto fill-orange/20" />
              <h3 className="font-display font-extrabold text-[22px] text-navy mt-2">Donate Now</h3>
              <p className="text-[13px] text-text-2 mt-1">Quick, secure & 80G eligible</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
              {(["once", "monthly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFreq(f)}
                  className={`py-2.5 rounded-full text-[13px] font-extrabold transition-all duration-300 ${freq === f
                    ? "bg-gradient-to-r from-orange to-[#e56000] text-white shadow-md shadow-orange/30 scale-[1.02]"
                    : "text-slate-600 hover:text-navy hover:bg-white/50"
                    }`}
                >
                  {f === "once" ? "One-Time" : "Monthly"}
                </button>
              ))}
            </div>

            {amounts.length > 0 && (
              <>
                <label className="mt-6 block text-[13px] font-semibold text-navy">Choose Amount</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {amounts.map((a: number) => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className={`py-3 rounded-xl border text-[14px] font-bold transition ${amount === a && !custom ? "border-orange bg-orange text-white" : "border-border text-navy hover:border-orange"}`}>
                      ₹{a.toLocaleString()}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="mt-3 relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2" />
              <input
                type="number"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setAmount(Number(e.target.value) || 0); }}
                placeholder="Custom amount"
                className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:border-orange"
              />
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-xl text-[13px] font-medium ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                {message.text}
              </div>
            )}

            <form className="mt-5 space-y-3" onSubmit={handleDonate}>
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange" />
              <div className="grid grid-cols-2 gap-3">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange" />
                <input type="tel" placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange" />
              </div>
              <input type="text" placeholder="Address (Full Postal Address / City, State)" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange" />
              <input type="text" placeholder="PAN (for 80G receipt)" value={pan} onChange={(e) => setPan(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange" />

              <button type="submit" disabled={payLoading} className="w-full bg-gradient-to-r from-orange to-orange-2 text-white font-bold rounded-xl py-4 hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-orange/30 disabled:opacity-60">
                {payLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className="w-5 h-5 fill-white" />}
                {payLoading ? "Processing..." : `Donate ₹${(amount || 0).toLocaleString()}${freq === "monthly" ? " / month" : ""}`}
              </button>
              <p className="text-center text-[11.5px] text-text-2 flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3.5 h-3.5" /> Secured by industry-standard encryption
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
              <Landmark className="w-3.5 h-3.5" /> Bank Transfer
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight font-display">
              Direct <span className="text-orange">Donations</span>
            </h2>
            <p className="mt-3 text-text-2 text-[14px] sm:text-[15px] leading-relaxed">
              Support us by scanning our QR code or transferring directly to our official bank account. Every rupee counts.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-orange/30" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#16A34A]" />
              <div className="h-[3px] w-6 rounded-full bg-[#16A34A]/30" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">

            {/* QR Card */}
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgba(11,31,58,0.07)] p-7 sm:p-8 overflow-hidden flex flex-col items-center">
              {/* Top accent */}
              <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-orange to-orange-2 opacity-70" />

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-7 self-start">
                <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center shadow-sm">
                  <Smartphone className="w-6 h-6 text-orange" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-navy text-[18px] leading-tight">Scan to Donate</h3>
                  <p className="text-text-2 text-[12px] mt-0.5">Works with any UPI app</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="relative">
                <div className="w-52 h-52 rounded-2xl bg-white border-2 border-orange/20 shadow-[0_0_0_6px_rgba(255,107,0,0.06)] flex flex-col items-center justify-center relative overflow-hidden">
                  {s.qrCode ? (
                    <img src={s.qrCode} alt="Donation QR Code" className="w-full h-full object-contain rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <QrCode className="w-16 h-16 text-slate-300 mb-2" />
                      <span className="font-mono text-sm font-bold text-navy">{s.upiId || "9415314486@upi"}</span>
                      <span className="text-[11px] text-text-2 mt-1">UPI QR Code</span>
                    </div>
                  )}
                </div>
                {/* Scan me badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                  Scan Me
                </div>
              </div>

              {/* UPI ID */}
              <div className="mt-8 w-full flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-text-2 font-semibold uppercase tracking-wide">UPI ID</div>
                  <div className="text-[14px] font-bold font-mono text-navy mt-0.5 truncate">{s.upiId || "9415314486@upi"}</div>
                </div>
                <QrCode className="w-5 h-5 text-orange flex-shrink-0" />
              </div>

              {/* App Badges */}
              <div className="mt-5 w-full grid grid-cols-3 gap-3">
                {[
                  { label: "Paytm", sub: s.paytmNumber || "+91 94153 14486", color: "#0A2FB5", bg: "#EEF2FF" },
                  { label: "BHIM", sub: "UPI", color: "#1E8547", bg: "#E8F7EE" },
                  { label: "PhonePe", sub: "UPI", color: "#5F259F", bg: "#F3EEFE" },
                ].map((app) => (
                  <div key={app.label} className="flex flex-col items-center gap-1 rounded-xl p-3 border" style={{ background: app.bg, borderColor: `${app.color}20` }}>
                    <span className="text-[12px] font-bold" style={{ color: app.color }}>{app.label}</span>
                    <span className="text-[10px] text-text-2 truncate max-w-full">{app.sub || "Accepted"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Details Card */}
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgba(11,31,58,0.07)] p-7 sm:p-8 overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-[#2563EB] to-[#16A34A] opacity-70" />

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm">
                  <Landmark className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-navy text-[18px] leading-tight">Account Information</h3>
                  <p className="text-text-2 text-[12px] mt-0.5">Direct bank transfer details</p>
                </div>
              </div>

              {/* Account Rows */}
              <dl className="space-y-0">
                {firstAccount?.accountName && <Row k="Account Name" v={firstAccount.accountName} />}
                <Row k="Bank Name" v={firstAccount?.bankName || "State Bank of India"} />
                <Row k="Account No." v={firstAccount?.accountNumber || "XXXXXXXXXXXX"} highlight />
                <Row k="IFSC Code" v={firstAccount?.ifsc || "SBIN000XXXX"} highlight />
                <Row k="Account Type" v={firstAccount?.accountType || "Current Account"} />
                {firstAccount?.branch && <Row k="Branch" v={firstAccount.branch} />}
              </dl>

              {/* Additional Bank Accounts if any */}
              {s.bankAccounts.length > 1 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Additional Accounts</span>
                  <div className="space-y-2">
                    {s.bankAccounts.slice(1).map((acc: any, i: number) => (
                      <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[12px]">
                        <strong className="block text-navy font-bold">{acc.bankName} ({acc.accountType || "Account"})</strong>
                        <div className="font-mono text-slate-600">A/C: <span className="font-bold text-navy">{acc.accountNumber}</span> • IFSC: <span className="font-bold text-navy">{acc.ifsc}</span></div>
                        {acc.accountName && <div className="text-slate-500">Name: {acc.accountName}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tax badge */}
              <div className="mt-6 flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                <BadgeCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div className="text-[12.5px] font-bold text-green-800">80G Tax Exemption Available</div>
                  <div className="text-[11.5px] text-green-700/80 mt-0.5">Donations are eligible for tax deduction under Section 80G</div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Notice */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="bg-white border border-orange/15 rounded-2xl p-5 flex items-start gap-4 shadow-[0_4px_20px_rgba(11,31,58,0.05)]">
              <div className="w-9 h-9 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-4.5 h-4.5 text-orange" />
              </div>
              <p className="text-[13px] text-text-2 leading-relaxed">
                <span className="font-bold text-navy">Important:</span> Please share a screenshot of your transaction at{" "}
                <a href="mailto:azaramesh@gmail.com" className="text-orange font-semibold hover:underline">azaramesh@gmail.com</a>{" "}
                or WhatsApp at{" "}
                <strong className="text-navy">+91 94153 14486</strong>{" "}
                to receive your confirmation and official donation receipt.
              </p>
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center gap-4 py-3 border-b border-dashed border-slate-100 last:border-0 group ${highlight ? "hover:bg-orange/3 rounded-lg px-2 -mx-2 transition-colors duration-150" : ""
      }`}>
      <dt className="text-text-2 text-[13px] font-medium flex-shrink-0">{k}</dt>
      <dd className={`font-bold text-right text-[13.5px] ${highlight ? "font-mono text-navy tracking-wide" : "text-navy"
        }`}>{v}</dd>
    </div>
  );
}
