import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  PieChart,
  Users,
  Award,
  Heart,
  Printer,
  Download,
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function ReportsPage() {
  const members = MinistryStorage.getMembers();
  const baptisms = MinistryStorage.getBaptisms();
  const prayers = MinistryStorage.getPrayers();
  const testimonies = MinistryStorage.getTestimonies();

  // Village analytics
  const villageCount: Record<string, number> = {};
  members.forEach(m => {
    const v = m.village || "Mustafabad";
    villageCount[v] = (villageCount[v] || 0) + 1;
  });

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-12 px-4 border-b border-amber-500/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5 text-amber-400" /> सांख्यिकी एवं प्रगति रिपोर्ट (Reports)</span>
              <span>•</span>
              <span>RK MINISTRIES</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight">
              कलीसियाई वार्षिक व मासिक प्रगति रिपोर्ट
            </h1>
            <p className="text-slate-300 text-xs md:text-sm">
              बपतिस्मा, सदस्यता वृद्धि, प्रार्थना उत्तर एवं क्षेत्रवार प्रभाव का सांख्यिकी विवरण।
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5 self-start md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>रिपोर्ट प्रिंट करें (Print Report)</span>
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">कुल पंजीकृत विश्वासी</span>
            <strong className="text-2xl sm:text-3xl font-black text-[#0A2540]">{members.length}</strong>
            <span className="text-[11px] text-emerald-600 block mt-1">+12% इस माह वृद्धि</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">पवित्र जल बपतिस्मा</span>
            <strong className="text-2xl sm:text-3xl font-black text-amber-600">{baptisms.length}</strong>
            <span className="text-[11px] text-amber-800 block mt-1">सत्यापित एवं प्रमाण पत्र जारी</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">प्रार्थना निवेदन दर्ज</span>
            <strong className="text-2xl sm:text-3xl font-black text-blue-900">{prayers.length}</strong>
            <span className="text-[11px] text-slate-500 block mt-1">मध्यस्थता प्रार्थना में</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs text-slate-500 font-semibold block">अद्भुत चंगाई गवाहियां</span>
            <strong className="text-2xl sm:text-3xl font-black text-emerald-600">{testimonies.length}</strong>
            <span className="text-[11px] text-emerald-700 block mt-1">महिमित जीवन</span>
          </div>
        </div>

        {/* Village Breakdown & Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Village Wise Table */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <h3 className="font-bold text-base text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>गाँव / क्षेत्र अनुसार सदस्यता (Village Distribution)</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(villageCount).map(([village, count]) => {
                const pct = Math.round((count / members.length) * 100);
                return (
                  <div key={village} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{village} (आजमगढ़)</span>
                      <strong className="text-amber-800">{count} सदस्य ({pct}%)</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Baptism Milestones */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <h3 className="font-bold text-base text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>बपतिस्मा रिकॉर्ड एवं पादरी रिपोर्ट (Sacramental Record)</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex justify-between items-center">
                <div>
                  <strong className="block text-amber-950 font-bold">2026 मार्च बपतिस्मा सेवा</strong>
                  <span className="text-slate-600 text-[11px]">स्थान: मुस्तफाबाद चर्च तालाब</span>
                </div>
                <span className="font-black text-amber-800 text-sm">२८ बपतिस्मे</span>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex justify-between items-center">
                <div>
                  <strong className="block text-blue-950 font-bold">2026 अप्रैल आगामी बपतिस्मा</strong>
                  <span className="text-slate-600 text-[11px]">रविवार ईस्टर आराधना</span>
                </div>
                <span className="font-black text-blue-800 text-sm">१४ प्रतीक्षारत</span>
              </div>

              <div className="pt-2 text-slate-500 text-[11px]">
                चेयरमैन एवं पादरी: <strong>Pastor Ramesh Kumar</strong> • RK MINISTRIES
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
