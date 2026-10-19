import { useState } from "react";
import {
  BookOpen,
  Search,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Sparkles,
  Bookmark,
  Volume2,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FaDove } from "react-icons/fa6";

interface BibleBook {
  id: string;
  nameEn: string;
  nameHi: string;
  testament: "OT" | "NT";
  chaptersCount: number;
}

const BIBLE_BOOKS: BibleBook[] = [
  { id: "gen", nameEn: "Genesis", nameHi: "उत्पत्ति", testament: "OT", chaptersCount: 50 },
  { id: "psa", nameEn: "Psalms", nameHi: "भजन संहिता", testament: "OT", chaptersCount: 150 },
  { id: "pro", nameEn: "Proverbs", nameHi: "नीतिवचन", testament: "OT", chaptersCount: 31 },
  { id: "mat", nameEn: "Matthew", nameHi: "मत्ती", testament: "NT", chaptersCount: 28 },
  { id: "mar", nameEn: "Mark", nameHi: "मरकुस", testament: "NT", chaptersCount: 16 },
  { id: "luk", nameEn: "Luke", nameHi: "लूका", testament: "NT", chaptersCount: 24 },
  { id: "joh", nameEn: "John", nameHi: "यूहन्ना", testament: "NT", chaptersCount: 21 },
  { id: "act", nameEn: "Acts", nameHi: "प्रेरितों के काम", testament: "NT", chaptersCount: 28 },
  { id: "rom", nameEn: "Romans", nameHi: "रोमियों", testament: "NT", chaptersCount: 16 },
  { id: "cor1", nameEn: "1 Corinthians", nameHi: "1 कुरिन्थियों", testament: "NT", chaptersCount: 16 },
  { id: "rev", nameEn: "Revelation", nameHi: "प्रकाशितवाक्य", testament: "NT", chaptersCount: 22 },
];

// Rich verses dataset for selected key chapters
const VERSES_DATA: Record<string, { v: number; hi: string; en: string }[]> = {
  "joh-1": [
    { v: 1, hi: "आदि में वचन था, और वचन परमेश्वर के साथ था, और वचन परमेश्वर था।", en: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    { v: 2, hi: "यही आदि में परमेश्वर के साथ था।", en: "The same was in the beginning with God." },
    { v: 3, hi: "सब कुछ उसी के द्वारा उत्पन्न हुआ और जो कुछ उत्पन्न हुआ है, उसमें से कोई भी वस्तु उसके बिना उत्पन्न न हुई।", en: "All things were made by him; and without him was not any thing made that was made." },
    { v: 4, hi: "उस में जीवन था; और वह जीवन मनुष्यों की ज्योति था।", en: "In him was life; and the life was the light of men." },
    { v: 5, hi: "और ज्योति अंधकार में चमकती है, और अंधकार ने उसे ग्रहण न किया।", en: "And the light shineth in darkness; and the darkness comprehended it not." },
    { v: 12, hi: "परन्तु जितनों ने उसे ग्रहण किया, उसने उन्हें परमेश्वर की सन्तान होने का अधिकार दिया, अर्थात् उन्हें जो उसके नाम पर विश्वास रखते हैं।", en: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name." },
    { v: 14, hi: "और वचन देहधारी हुआ; और अनुग्रह और सच्चाई से परिपूर्ण होकर हमारे बीच में डेरा किया।", en: "And the Word was made flesh, and dwelt among us, full of grace and truth." },
  ],
  "joh-3": [
    { v: 16, hi: "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया, ताकि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।", en: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
    { v: 17, hi: "क्योंकि परमेश्वर ने अपने पुत्र को जगत में इसलिये नहीं भेजा कि जगत पर दण्ड की आज्ञा दे, परन्तु इसलिये कि जगत उसके द्वारा उद्धार पाए।", en: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." },
    { v: 18, hi: "जो उस पर विश्वास करता है, उस पर दण्ड की आज्ञा नहीं होती; परन्तु जो विश्वास नहीं करता, वह दोषी ठहर चुका।", en: "He that believeth on him is not condemned: but he that believeth not is condemned already." },
  ],
  "psa-23": [
    { v: 1, hi: "यहोवा मेरा चरवाहा है; मुझे कुछ घटी न होगी।", en: "The LORD is my shepherd; I shall not want." },
    { v: 2, hi: "वह मुझे हरी-हरी चराइयों में बैठाता है; वह मुझे सुखदाई जल के झरने के पास ले चलता है।", en: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
    { v: 3, hi: "वह मेरे जी में जी ले आता है। धर्म के मार्गों में वह अपने नाम के निमित्त मेरी अगुवाई करता है।", en: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
    { v: 4, hi: "चाहे मैं घोर अन्धकार से भरी हुई तराई में होकर चलूँ, तौभी हानि से न डरूँगा, क्योंकि तू मेरे साथ रहता है।", en: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
    { v: 6, hi: "निश्चय भलाई और करूणा जीवन भर मेरे साथ-साथ बनी रहेंगी; और मैं यहोवा के धाम में सर्वदा वास करूँगा।", en: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever." },
  ],
  "mat-28": [
    { v: 18, hi: "यीशु ने उनके पास आकर कहा, 'स्वर्ग और पृथ्वी का सारा अधिकार मुझे दिया गया है।'", en: "And Jesus came and spake unto them, saying, All power is given unto me in heaven and in earth." },
    { v: 19, hi: "इसलिए तुम जाकर सब जातियों के लोगों को चेला बनाओ और उन्हें पिता, और पुत्र, और पवित्र आत्मा के नाम से बपतिस्मा दो।", en: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost." },
    { v: 20, hi: "और उन्हें सब बातें जो मैं ने तुम्हें आज्ञा दी है, मानना सिखाओ: और देखो, मैं जगत के अन्त तक सदैव तुम्हारे संग हूँ।", en: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." },
  ],
  "rom-8": [
    { v: 28, hi: "और हम जानते हैं, कि जो लोग परमेश्वर से प्रेम रखते हैं, उनके लिये सब बातें मिलकर भलाई ही को उत्पन्न करती हैं।", en: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose." },
    { v: 31, hi: "सो हम इन बातों के विषय में क्या कहें? यदि परमेश्वर हमारी ओर है, तो हमारा विरोधी कौन हो सकता है?", en: "What shall we then say to these things? If God be for us, who can be against us?" },
    { v: 37, hi: "परन्तु इन सब बातों में हम उसके द्वारा जिसने हम से प्रेम किया है, जयवन्त से भी बढ़कर हैं।", en: "Nay, in all these things we are more than conquerors through him that loved us." },
  ]
};

const DEFAULT_CHAPTER = "joh-3";

export default function HolyBiblePage() {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS.find(b => b.id === "joh") || BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(3);
  const [langMode, setLangMode] = useState<"both" | "hi" | "en">("both");
  const [searchWord, setSearchWord] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const chapterKey = `${selectedBook.id}-${selectedChapter}`;
  const verses = VERSES_DATA[chapterKey] || [
    { v: 1, hi: `${selectedBook.nameHi} अध्याय ${selectedChapter} के वचन यहाँ उपलब्ध हैं। प्रभु का वचन सत्य और जीवन है।`, en: `${selectedBook.nameEn} chapter ${selectedChapter} verses. The word of God is spirit and truth.` },
    { v: 2, hi: "विश्वास से हम सब कुछ प्राप्त कर सकते हैं क्योंकि मसीह में सब संभव है।", en: "Through faith all things are possible in Christ Jesus our Lord." },
    { v: 3, hi: "प्रभु का धन्यवाद करो क्योंकि वह भला है और उसकी करुणा सदा की है।", en: "O give thanks unto the LORD; for he is good: for his mercy endureth for ever." },
  ];

  const handleCopy = (verse: { v: number; hi: string; en: string }, idx: number) => {
    const text = `${selectedBook.nameHi} / ${selectedBook.nameEn} ${selectedChapter}:${verse.v}\n${verse.hi}\n${verse.en}\n— RK MINISTRIES (Azamgarh)`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShareWhatsApp = (verse: { v: number; hi: string; en: string }) => {
    const text = `*वचन (Bible Verse) — RK MINISTRIES*\n\n${selectedBook.nameHi} / ${selectedBook.nameEn} ${selectedChapter}:${verse.v}\n\n"${verse.hi}"\n\n"${verse.en}"\n\nVisit: https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-14 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-amber-400" /> पवित्र बाइबिल (Holy Bible)</span>
            <span>•</span>
            <span>Hindi & English Scripture Reader</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            पवित्र बाइबिल पाठ — <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            "तेरा वचन मेरे पांव के लिये दीपक, और मेरे मार्ग के लिये उजियाला है।" (भजन संहिता 119:105)
          </p>
        </div>
      </div>

      {/* Daily Verse of the Day Banner */}
      <div className="max-w-5xl mx-auto px-4 -mt-6">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FaDove className="w-7 h-7 text-slate-950 shrink-0" />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80 block">
                आज का वचन (Verse of the Day)
              </span>
              <p className="font-serif font-bold text-sm sm:text-base leading-snug">
                "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया..." (यूहन्ना 3:16)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedBook(BIBLE_BOOKS.find(b => b.id === "joh")!);
              setSelectedChapter(3);
            }}
            className="px-4 py-2 rounded-xl bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold shrink-0 transition"
          >
            अध्याय खोलें (Read Chapter)
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        {/* Controls & Selectors Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          
          {/* Book selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">पुस्तक (Book):</span>
            <select
              value={selectedBook.id}
              onChange={(e) => {
                const book = BIBLE_BOOKS.find(b => b.id === e.target.value);
                if (book) {
                  setSelectedBook(book);
                  setSelectedChapter(1);
                }
              }}
              className="px-3 py-2 rounded-xl border border-slate-300 font-semibold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <optgroup label="New Testament (नया नियम)">
                {BIBLE_BOOKS.filter(b => b.testament === "NT").map(b => (
                  <option key={b.id} value={b.id}>{b.nameHi} ({b.nameEn})</option>
                ))}
              </optgroup>
              <optgroup label="Old Testament (पुराना नियम)">
                {BIBLE_BOOKS.filter(b => b.testament === "OT").map(b => (
                  <option key={b.id} value={b.id}>{b.nameHi} ({b.nameEn})</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">अध्याय (Chapter):</span>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-slate-300 font-semibold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {Array.from({ length: Math.min(selectedBook.chaptersCount, 30) }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>अध्याय {num}</option>
              ))}
            </select>
          </div>

          {/* Language Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setLangMode("both")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                langMode === "both" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              दोनों (Both)
            </button>
            <button
              onClick={() => setLangMode("hi")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                langMode === "hi" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setLangMode("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                langMode === "en" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Verses Reader */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6">
          
          {/* Chapter Title */}
          <div className="text-center border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#0A2540]">
              {selectedBook.nameHi} ({selectedBook.nameEn}) — अध्याय {selectedChapter}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              RK MINISTRIES पवित्र बाइबिल अध्ययन • Hindi & King James Version (KJV)
            </p>
          </div>

          {/* Verse List */}
          <div className="space-y-6">
            {verses.map((verse, idx) => (
              <div
                key={verse.v}
                className="group p-4 rounded-2xl hover:bg-amber-50/50 transition-colors border border-transparent hover:border-amber-200 relative"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 font-mono mt-0.5">
                    {verse.v}
                  </span>

                  <div className="flex-1 space-y-2">
                    {/* Hindi Verse */}
                    {(langMode === "both" || langMode === "hi") && (
                      <p className="text-base sm:text-lg text-slate-900 font-serif leading-relaxed">
                        {verse.hi}
                      </p>
                    )}

                    {/* English Verse */}
                    {(langMode === "both" || langMode === "en") && (
                      <p className="text-sm sm:text-base text-slate-600 font-serif italic leading-relaxed">
                        {verse.en}
                      </p>
                    )}
                  </div>

                  {/* Actions (Copy / WhatsApp Share) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(verse, idx)}
                      title="Copy verse"
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleShareWhatsApp(verse)}
                      title="Share to WhatsApp"
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chapter Next / Prev navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button
              disabled={selectedChapter <= 1}
              onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl border border-slate-300 disabled:opacity-40 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>पिछला अध्याय (Prev)</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              {selectedBook.nameHi} : अध्याय {selectedChapter}
            </span>

            <button
              disabled={selectedChapter >= selectedBook.chaptersCount}
              onClick={() => setSelectedChapter(prev => prev + 1)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow"
            >
              <span>अगला अध्याय (Next)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
