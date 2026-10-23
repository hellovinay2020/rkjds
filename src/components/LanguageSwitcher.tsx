import { Globe, Check, Languages, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "bho", name: "Bhojpuri", nativeName: "भोजपुरी" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
];

function getSavedLanguage(): string {
  if (typeof window === "undefined") return "hi";

  // Check localStorage
  const saved = localStorage.getItem("gt_lang");
  if (saved) return saved;

  // Check googtrans cookie: format is e.g. /en/hi or /auto/hi
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([a-zA-Z-]+)/);
  if (match && match[1]) {
    return match[1];
  }

  return "hi";
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentLang, setCurrentLang] = useState<string>("hi");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getSavedLanguage());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (langCode: string) => {
    try {
      localStorage.setItem("gt_lang", langCode);

      // Set cookie for Google Translate
      const domain = window.location.hostname;
      const cookieVal = `/en/${langCode}`;

      // Set on current domain, root path, and host domain
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${domain};`;
      if (domain.includes(".") && !domain.startsWith("localhost")) {
        document.cookie = `googtrans=${cookieVal}; path=/; domain=.${domain};`;
      }

      // If switching back to English, clear cookies
      if (langCode === "en") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      }

      setCurrentLang(langCode);
      setOpen(false);
      setSearch("");

      // Trigger Google Translate native select if present
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      }

      // Reload to ensure all components and text re-render with clean translation
      setTimeout(() => {
        window.location.reload();
      }, 150);
    } catch (e) {
      console.error("Language switch error:", e);
      window.location.reload();
    }
  };

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const filtered = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative notranslate select-none" translate="no">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-amber-400/40 hover:border-amber-400 text-amber-200 hover:text-white text-[11.5px] sm:text-[12px] font-semibold transition-all duration-200 shadow-sm"
        title="Google Translator — भाषा बदलें"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span className="font-medium tracking-wide">
          {current.nativeName} <span className="hidden sm:inline text-amber-400/80">({current.name})</span>
        </span>
        <ChevronDown className={`w-3 h-3 text-amber-400/80 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-[99999] w-72 bg-white rounded-2xl shadow-2xl border border-amber-500/20 py-2.5 text-slate-900 notranslate animate-in fade-in zoom-in-95 duration-150"
          style={{ boxShadow: "0 14px 45px -10px rgba(2, 40, 87, 0.35)" }}
          translate="no"
        >
          {/* Header */}
          <div className="px-3.5 pb-2.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>Google Translator</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              {SUPPORTED_LANGUAGES.length} भाषाएँ
            </span>
          </div>

          {/* Search Box */}
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="भाषा खोजें / Search language..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900"
                autoFocus
              />
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-[300px] overflow-y-auto p-1.5 space-y-0.5 divide-y divide-slate-50">
            {filtered.length > 0 ? (
              filtered.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => switchLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-amber-500/15 text-amber-950 font-bold border border-amber-500/30"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 text-[10px] font-mono uppercase text-slate-400 font-semibold shrink-0">
                        {lang.code}
                      </span>
                      <span className="font-semibold text-[13px] text-slate-900 truncate">
                        {lang.nativeName}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate">
                        ({lang.name})
                      </span>
                    </div>

                    {isSelected && (
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-slate-950 shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-500">
                कोई भाषा नहीं मिली (No language found)
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-2 px-3 border-t border-slate-100 text-[10px] text-center text-slate-400">
            Powered by Google Translate • आरके मिनिस्ट्रीज
          </div>
        </div>
      )}
    </div>
  );
}
