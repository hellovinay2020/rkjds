import { Globe, Check, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "ur", label: "اردو" },
];

declare global {
  interface Window {
    google?: any;
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("gt_lang");
    if (saved && saved !== "en") {
      setCurrentLang(saved);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (langCode: string) => {
    if (langCode === "en") {
      localStorage.removeItem("gt_lang");
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setCurrentLang("en");
      setOpen(false);
      window.location.reload();
      return;
    }

    localStorage.setItem("gt_lang", langCode);
    document.cookie = `googtrans=/en/${langCode};path=/;SameSite=Lax`;
    setCurrentLang(langCode);
    setOpen(false);
    window.location.reload();
  };

  const current = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-white/80 hover:text-orange transition text-[12px] font-medium px-2 py-1 rounded-md hover:bg-white/10"
        title="Change Language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-[9999] bg-white rounded-xl shadow-2xl border border-gray-200 py-2 min-w-[180px] max-h-[340px] overflow-y-auto"
          style={{ animation: "fade-down 0.2s ease-out" }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-[13px] hover:bg-orange/5 transition ${
                currentLang === lang.code
                  ? "bg-orange/10 text-orange font-semibold"
                  : "text-gray-700 hover:text-orange"
              }`}
            >
              <Languages className="w-4 h-4 text-orange/80 shrink-0" />
              <span>{lang.label}</span>
              {currentLang === lang.code && (
                <Check className="ml-auto w-3.5 h-3.5 text-orange" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
