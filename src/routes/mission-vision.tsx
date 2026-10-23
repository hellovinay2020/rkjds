import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Gem, Compass, ShieldCheck, Sparkles, Heart, HandHeart, CheckCircle2, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { fetchHomeMission, fetchHomeVision } from "@/data/homepage";
import { getFullUrl } from "@/lib/api";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import missionImg from "@/assets/about/our-mission.png";
import visionImg from "@/assets/about/our-vision.png";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honesty, transparency, and accountability in every action." },
  { icon: Heart, title: "Compassion", desc: "Deep care for every community, every woman, and every child." },
  { icon: HandHeart, title: "Empowerment", desc: "Enabling people to create change themselves, not only offering help." },
  { icon: Sparkles, title: "Excellence", desc: "Consistent effort toward measurable, lasting impact." },
  { icon: Compass, title: "Inclusivity", desc: "Equal respect and opportunity beyond caste, religion, or class." },
  { icon: Gem, title: "Sustainability", desc: "Long-term solutions that continue beyond any single program." },
];

const objectives = [
  "Quality education and skill training for underserved women and children",
  "Self-help groups aur entrepreneurship ke through rural livelihoods majboot karna",
  "Improve maternal, child, and adolescent health in remote villages",
  "Build awareness of women's rights, safety, and legal support",
  "Sustainable, community-led development ko aage badhana",
];

export default function MissionVisionPage() {
  useEffect(() => { document.title = "Mission & Vision — RK MINISTRIES | Azamgarh, U.P."; }, []);

  const [missionData, setMissionData] = useState<any>(null);
  const [visionData, setVisionData] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchHomeMission(), fetchHomeVision()]).then(([m, v]) => {
      setMissionData(m);
      setVisionData(v);
    });
  }, []);

  const mImg = (missionData?.image && getFullUrl(missionData.image)) || missionImg;
  const vImg = (visionData?.image && getFullUrl(visionData.image)) || visionImg;

  const mHeading = missionData?.heading || "प्रभु यीशु मसीह का सुसमाचार, जल बपतिस्मा और आत्मिक उद्धार";
  const mBadge = missionData?.badge || "हमारा पावन मिशन (Our Mission)";
  const mImageBadge = missionData?.imageBadge || "प्रभु यीशु मसीह की सेवा";
  const mParagraphs = (missionData?.paragraphs && missionData.paragraphs.length > 0)
    ? missionData.paragraphs
    : [
        "आरके मिनिस्ट्रीज (RK MINISTRIES) का परम पावन मिशन प्रभु यीशु मसीह के उद्धारकारी सुसमाचार को हर गाँव, हर मोहल्ले और हर पीड़ित हृदय तक पहुँचाना है। जैसा कि प्रभु यीशु मसीह ने महा-आदेश दिया: \"इसलिए तुम जाकर सब जातियों के लोगों को चेला बनाओ और उन्हें पिता, और पुत्र, और पवित्र आत्मा के नाम से बपतिस्मा दो\" (मत्ती 28:19)।",
        "हमारा समर्पण हर रोगी, निराश और व्याकुल जन को मसीह यीशु के क्रूस के प्रेम, चंगाई और क्षमा के प्रकाश में लाना है। निरंतर मध्यस्थता प्रार्थना, शुक्रवार उपवास सभा, पवित्र जल बपतिस्मा और कलीसियाई संगति द्वारा हम अंधकार के बंधनों को तोड़कर लोगों के जीवन में अनन्त उद्धार, शांति और आत्मिक जागृति का मार्ग प्रशस्त करते हैं।"
      ];
  const mHighlights = (missionData?.highlights && missionData.highlights.length > 0)
    ? missionData.highlights
    : [
        "पवित्र जल बपतिस्मा संस्कार (मत्ती 28:19)",
        "अलौकिक चंगाई व मध्यस्थता प्रार्थना संगति",
        "गाँव-गाँव में कुटीर सभा व सुसमाचार प्रचार",
        "पवित्र बाइबिल पाठ एवं आत्मिक मार्गदर्शन"
      ];

  const vHeading = visionData?.heading || "आत्माओं का उद्धार, आत्मिक शांति एवं मसीही एकता";
  const vBadge = visionData?.badge || "हमारा दिव्य विज़न (Our Vision)";
  const vImageBadge = visionData?.imageBadge || "आत्मिक पुनरुद्धार एवं शांति";
  const vParagraphs = (visionData?.paragraphs && visionData.paragraphs.length > 0)
    ? visionData.paragraphs
    : [
        "आरके मिनिस्ट्रीज (RK MINISTRIES) का परम पावन विज़न एक ऐसे आत्मिक समाज का निर्माण करना है जहां हर व्यक्ति, परिवार और समुदाय को प्रभु यीशु मसीह के उद्धार, प्रेम, क्षमा और असीम अनुग्रह का व्यक्तिगत अनुभव हो। हमारा विज़न है कि कोई भी आत्मा पाप, निराशा, बीमारी, पारिवारिक क्लेश या अंधकार के बंधनों में न रहे, बल्कि परमेश्वर के वचन की सामर्थ्य से स्वतंत्र होकर एक जयवन्त और पवित्र जीवन जिए।",
        "हम विश्वास करते हैं कि कलीसिया केवल एक भवन नहीं, बल्कि मसीह की जीवित देह है। हमारा लक्ष्य ग्रामीण और दूरदराज के क्षेत्रों में निरंतर प्रार्थना की वेदियां स्थापित करना, मसीही परिवारों को आत्मिक रूप से सुदृढ़ बनाना और हर विश्वासी को पवित्र आत्मा के फलों और वरदानों में परिपक्व करना है। जैसा कि पवित्र वचन में लिखा है: 'क्योंकि पृथ्वी यहोवा की महिमा के ज्ञान से ऐसी भर जाएगी जैसे जल समुद्र में भरा रहता है' (हबक्कूक 2:14)।"
      ];
  const vHighlights = (visionData?.highlights && visionData.highlights.length > 0)
    ? visionData.highlights
    : [
        "हर गाँव और हर घर में प्रभु यीशु के सुसमाचार की ज्योति",
        "रोगियों व व्याकुलों के लिए अलौकिक चंगाई व शांति",
        "पवित्र जल बपतिस्मा एवं आत्मिक शिष्यत्व निर्माण",
        "प्रार्थना के योद्धाओं एवं कलीसियाई सेवकों का उत्थान"
      ];

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Mission & Vision"
        description="Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual hope across Azamgarh, Uttar Pradesh."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Mission & Vision" }]}
      />

      {/* Mission — image left, content card right */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute -top-24 right-0 font-display font-extrabold text-[120px] sm:text-[180px] text-amber-500/10 leading-none select-none pointer-events-none">
          Mission
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Image (Left Side) - Matching Dimensions */}
            <div className="w-full max-w-[560px] mx-auto h-full relative flex flex-col justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full aspect-square ring-1 ring-black/5 group flex items-center justify-center bg-white">
                <img
                  src={mImg}
                  alt="Our Mission — RK MINISTRIES"
                  className="w-full h-full max-h-[560px] object-contain rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-md text-amber-400 text-xs sm:text-sm font-bold shadow-lg border border-amber-400/30">
                    <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {mImageBadge}
                  </span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-amber-500/15 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-amber-500/10 -z-10" />
            </div>

            {/* Content Card (Right Side) - Matching Dimensions */}
            <div className="w-full max-w-[560px] mx-auto h-full relative bg-white rounded-2xl shadow-xl border border-border/60 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-800 font-bold uppercase tracking-wider text-[12px]">
                  <Target className="w-3.5 h-3.5" /> {mBadge}
                </div>
                <h2 className="font-display font-extrabold text-navy text-[24px] sm:text-[30px] leading-[1.2] mt-3.5">
                  {mHeading}
                </h2>

                <div className="text-text-muted mt-3.5 space-y-3 text-justify leading-relaxed text-[14px]">
                  {mParagraphs.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 mt-5">
                {mHighlights.map((t: any, i: number) => {
                  const title = typeof t === 'string' ? t : (t?.title || t?.description || '');
                  return (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-slate-50/70 p-3 hover:border-amber-500/50 hover:shadow-md transition">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-navy font-semibold text-[13px] leading-snug">{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision — content card left, image right */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#FAFBFD]">
        <div className="absolute -top-24 left-0 font-display font-extrabold text-[120px] sm:text-[180px] text-amber-500/10 leading-none select-none pointer-events-none">
          Vision
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Content Card (Left Side) - Matching Dimensions */}
            <div className="w-full max-w-[560px] mx-auto h-full relative bg-white rounded-2xl shadow-xl border border-border/60 p-6 sm:p-8 flex flex-col justify-between lg:order-1">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-800 font-bold uppercase tracking-wider text-[12px]">
                  <Eye className="w-3.5 h-3.5" /> {vBadge}
                </div>
                <h2 className="font-display font-extrabold text-navy text-[24px] sm:text-[30px] leading-[1.2] mt-3.5">
                  {vHeading}
                </h2>

                <div className="text-text-muted mt-3.5 space-y-3 text-justify leading-relaxed text-[14px]">
                  {vParagraphs.map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 mt-5">
                {vHighlights.map((t: any, i: number) => {
                  const title = typeof t === 'string' ? t : (t?.title || t?.description || '');
                  return (
                    <div key={i} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-slate-50/70 p-3 hover:border-amber-500/50 hover:shadow-md transition">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-navy font-semibold text-[13px] leading-snug">{title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image (Right Side) - Matching Dimensions */}
            <div className="w-full max-w-[560px] mx-auto h-full relative lg:order-2 flex flex-col justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-full aspect-square ring-1 ring-black/5 group flex items-center justify-center bg-white">
                <img
                  src={vImg}
                  alt="Our Vision — RK MINISTRIES"
                  className="w-full h-full max-h-[560px] object-contain rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute bottom-5 left-5">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/85 backdrop-blur-md text-amber-400 text-xs sm:text-sm font-bold shadow-lg border border-amber-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {vImageBadge}
                  </span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-amber-500/15 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-amber-500/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
