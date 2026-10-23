import { useState, useEffect, useMemo, useRef } from "react";
import {
  BookOpen,
  Search,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Volume2,
  VolumeX,
  Heart,
  X,
  BookMarked,
  ChevronsUpDown,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { FaCross, FaHandsPraying } from "react-icons/fa6";

interface BibleBook {
  id: string;
  nameEn: string;
  nameHi: string;
  testament: "OT" | "NT";
  category: string;
  chaptersCount: number;
  shortDesc: string;
}

interface Verse {
  v: number;
  hi: string;
  en: string;
  meaning?: string; // सरल व्याख्या / जीवन में अर्थ
}

// Complete books list with Hindi & English names
const BIBLE_BOOKS: BibleBook[] = [
  // Gospels & History (New Testament)
  { id: "mat", nameEn: "Matthew", nameHi: "मत्ती", testament: "NT", category: "सुसमाचार (Gospel)", chaptersCount: 28, shortDesc: "मसीह राजा के रूप में" },
  { id: "mar", nameEn: "Mark", nameHi: "मरकुस", testament: "NT", category: "सुसमाचार (Gospel)", chaptersCount: 16, shortDesc: "मसीह सेवक के रूप में" },
  { id: "luk", nameEn: "Luke", nameHi: "लूका", testament: "NT", category: "सुसमाचार (Gospel)", chaptersCount: 24, shortDesc: "मसीह मनुष्य के पुत्र के रूप में" },
  { id: "joh", nameEn: "John", nameHi: "यूहन्ना", testament: "NT", category: "सुसमाचार (Gospel)", chaptersCount: 21, shortDesc: "मसीह परमेश्वर के पुत्र के रूप में" },
  { id: "act", nameEn: "Acts", nameHi: "प्रेरितों के काम", testament: "NT", category: "इतिहास (History)", chaptersCount: 28, shortDesc: "पवित्र आत्मा और आरंभिक कलीसिया" },

  // Epistles (Letters)
  { id: "rom", nameEn: "Romans", nameHi: "रोमियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 16, shortDesc: "विश्वास द्वारा धर्मिता व उद्धार" },
  { id: "cor1", nameEn: "1 Corinthians", nameHi: "1 कुरिन्थियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 16, shortDesc: "मसीही प्रेम और एकता" },
  { id: "cor2", nameEn: "2 Corinthians", nameHi: "2 कुरिन्थियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 13, shortDesc: "सच्ची सेवकाई और अनुग्रह" },
  { id: "gal", nameEn: "Galatians", nameHi: "गलातियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 6, shortDesc: "मसीह में स्वतंत्रता" },
  { id: "eph", nameEn: "Ephesians", nameHi: "इफिसियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 6, shortDesc: "परमेश्वर का अनुग्रह व आत्मिक हथियार" },
  { id: "phi", nameEn: "Philippians", nameHi: "फिलिप्पियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 4, shortDesc: "प्रभु में सदा आनन्दित रहो" },
  { id: "col", nameEn: "Colossians", nameHi: "कुलुस्सियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 4, shortDesc: "मसीह की सर्वोच्चता" },
  { id: "heb", nameEn: "Hebrews", nameHi: "इब्रानियों", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 13, shortDesc: "विश्वास की सामर्थ्य" },
  { id: "jam", nameEn: "James", nameHi: "याकूब", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 5, shortDesc: "कर्म सहित जीवित विश्वास" },
  { id: "pet1", nameEn: "1 Peter", nameHi: "1 पतरस", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 5, shortDesc: "आशा, पवित्रता व चंगाई" },
  { id: "joh1", nameEn: "1 John", nameHi: "1 यूहन्ना", testament: "NT", category: "पत्रियाँ (Epistles)", chaptersCount: 5, shortDesc: "परमेश्वर प्रेम है" },
  { id: "rev", nameEn: "Revelation", nameHi: "प्रकाशितवाक्य", testament: "NT", category: "भविष्यद्वाणी (Prophecy)", chaptersCount: 22, shortDesc: "मसीह की अंतिम विजय" },

  // Old Testament Classics
  { id: "gen", nameEn: "Genesis", nameHi: "उत्पत्ति", testament: "OT", category: "सृष्टि व व्यवस्था (Law)", chaptersCount: 50, shortDesc: "संसार की सृष्टि व परमेश्वर की वाचा" },
  { id: "exo", nameEn: "Exodus", nameHi: "निर्गमन", testament: "OT", category: "सृष्टि व व्यवस्था (Law)", chaptersCount: 40, shortDesc: "गुलामी से छुटकारा व दस आज्ञाएँ" },
  { id: "psa", nameEn: "Psalms", nameHi: "भजन संहिता", testament: "OT", category: "प्रार्थना व स्तुति (Poetry)", chaptersCount: 150, shortDesc: "स्तुति, सांत्वना, सुरक्षा व प्रार्थनाएँ" },
  { id: "pro", nameEn: "Proverbs", nameHi: "नीतिवचन", testament: "OT", category: "ज्ञान व बुद्धि (Wisdom)", chaptersCount: 31, shortDesc: "दैनिक जीवन के लिए स्वर्गीय ज्ञान" },
  { id: "isa", nameEn: "Isaiah", nameHi: "यशायाह", testament: "OT", category: "भविष्यद्वक्ता (Prophets)", chaptersCount: 66, shortDesc: "मसीह के जन्म, बलिदान व उद्धार की भविष्यवाणी" },
  { id: "jer", nameEn: "Jeremiah", nameHi: "यिर्मयाह", testament: "OT", category: "भविष्यद्वक्ता (Prophets)", chaptersCount: 52, shortDesc: "भलाई की योजनाएँ और नई वाचा" },
];

// Curated verses for major chapters with plain-Hindi explanations (सरल अर्थ)
const VERSES_DATA: Record<string, Verse[]> = {
  // Psalms 23 - The Lord is my Shepherd
  "psa-23": [
    {
      v: 1,
      hi: "यहोवा मेरा चरवाहा है; मुझे कुछ घटी न होगी।",
      en: "The LORD is my shepherd; I shall not want.",
      meaning: "जैसे एक भला चरवाहा अपनी भेड़ों की पूरी देखभाल करता है, वैसे ही प्रभु परमेश्वर हमारी हर जरूरत पूरी करते हैं। हमें किसी भली वस्तु की कमी नहीं होगी।"
    },
    {
      v: 2,
      hi: "वह मुझे हरी-हरी चराइयों में बैठाता है; वह मुझे सुखदाई जल के झरने के पास ले चलता है।",
      en: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
      meaning: "परमेश्वर हमारे अशांत और थके हुए मन को विश्राम, आत्मिक शांति और तृप्ति प्रदान करते हैं।"
    },
    {
      v: 3,
      hi: "वह मेरे जी में जी ले आता है। धर्म के मार्गों में वह अपने नाम के निमित्त मेरी अगुवाई करता है।",
      en: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
      meaning: "जब हम निराश होते हैं तो वह हमारी आत्मा को नई शक्ति देते हैं और हमें हमेशा सत्य और भलाई के सही रास्ते पर चलाते हैं।"
    },
    {
      v: 4,
      hi: "चाहे मैं घोर अन्धकार से भरी हुई तराई में होकर चलूँ, तौभी हानि से न डरूँगा, क्योंकि तू मेरे साथ रहता है; तेरे सोंटे और तेरी लाठी से मुझे शान्ति मिलती है।",
      en: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      meaning: "जीवन के सबसे कठिन दौर या संकट में भी हमें डरने की जरूरत नहीं है, क्योंकि प्रभु स्वयं हमारे साथ हैं और उनका सामर्थ्य हमारी रक्षा करता है।"
    },
    {
      v: 5,
      hi: "तू मेरे सताने वालों के साम्हने मेरे लिये मेज बिछाता है; तू ने मेरे सिर पर तेल मला है, मेरा कटोरा उमड़ रहा है।",
      en: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
      meaning: "विरोधियों के सामने भी प्रभु हमें मान-सम्मान और इतनी बहुतायत की आशीष देते हैं कि हमारा जीवन अनुग्रह से भर जाता है।"
    },
    {
      v: 6,
      hi: "निश्चय भलाई और करूणा जीवन भर मेरे साथ-साथ बनी रहेंगी; और मैं यहोवा के धाम में सर्वदा वास करूँगा।",
      en: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
      meaning: "प्रभु का प्रेम और दया हमारे पूरे जीवन में कभी समाप्त नहीं होगी, और हम सदा उनकी पवित्र उपस्थिति में रहेंगे।"
    }
  ],

  // Psalm 91 - Divine Protection
  "psa-91": [
    {
      v: 1,
      hi: "जो परमप्रधान के छाए हुए स्थान में बैठा रहे, वह सर्वशक्तिमान की छाया में ठिकाना पाएगा।",
      en: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
      meaning: "जो व्यक्ति परमेश्वर के साथ निरंतर प्रार्थना और विश्वास में रहता है, वह सर्वशक्तिमान ईश्वर की सुरक्षित छत्रछाया में सुरक्षित रहता है।"
    },
    {
      v: 2,
      hi: "मैं यहोवा के विषय कहूँगा, कि वह मेरा शरणस्थान और मेरा गढ़ है; वह मेरा परमेश्वर है, मैं उस पर भरोसा रखूँगा।",
      en: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
      meaning: "संसार की किसी शक्ति पर नहीं, बल्कि केवल जीवित परमेश्वर पर हमारा भरोसा होना चाहिए।"
    },
    {
      v: 4,
      hi: "वह तुझे अपने पंखों की आड़ में ले लेगा, और तू उसके परों के नीचे शरण पाएगा; उसकी सच्चाई तेरे लिये ढाल और झिलम ठहरेगी।",
      en: "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.",
      meaning: "परमेश्वर अपने बच्चों को हर विपत्ति और शैतानी हमलों से एक मजबूत ढाल की तरह बचाते हैं।"
    },
    {
      v: 7,
      hi: "तेरे निकट हज़ार, और तेरी दाहिनी ओर दस हज़ार गिरेंगे; परन्तु वह तेरे पास न आएगा।",
      en: "A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.",
      meaning: "चाहे चारों तरफ कितनी भी महामारियां या मुसीबतें हों, प्रभु में विश्वास रखने वाले को कोई हानि नहीं छू सकती।"
    },
    {
      v: 11,
      hi: "क्योंकि वह अपने दूतों को तेरे निमित्त आज्ञा देगा, कि जहाँ कहीं तू जाए वे तेरी रक्षा करें।",
      en: "For he shall give his angels charge over thee, to keep thee in all thy ways.",
      meaning: "परमेश्वर ने अपने स्वर्गदूतों को हमारी हर यात्रा और मार्ग में रक्षा करने का आदेश दे रखा है।"
    }
  ],

  // John 3 - God's Great Love
  "joh-3": [
    {
      v: 3,
      hi: "यीशु ने उसको उत्तर दिया, 'मैं तुझ से सच सच कहता हूँ, यदि कोई नये सिरे से न जन्मे तो परमेश्वर का राज्य देख नहीं सकता।'",
      en: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
      meaning: "प्रभु के राज्य में प्रवेश करने के लिए हमें पापों से मन फिराकर पवित्र आत्मा के द्वारा नया आत्मिक जीवन पाना आवश्यक है।"
    },
    {
      v: 16,
      hi: "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया, ताकि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।",
      en: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      meaning: "यह बाइबिल का सबसे महान वचन है: परमेश्वर ने हमसे इतना गहरा प्रेम किया कि हमें पाप और नरक से बचाने के लिए प्रभु यीशु को दे दिया, ताकि जो विश्वास करे उसे स्वर्ग और अमर जीवन मिले।"
    },
    {
      v: 17,
      hi: "क्योंकि परमेश्वर ने अपने पुत्र को जगत में इसलिये नहीं भेजा कि जगत पर दण्ड की आज्ञा दे, परन्तु इसलिये कि जगत उसके द्वारा उद्धार पाए।",
      en: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
      meaning: "प्रभु यीशु किसी को दोषी ठहराने नहीं, बल्कि भटके हुए और पापी मनुष्यों को मुक्ति और दया का रास्ता दिखाने आए।"
    },
    {
      v: 18,
      hi: "जो उस पर विश्वास करता है, उस पर दण्ड की आज्ञा नहीं होती; परन्तु जो विश्वास नहीं करता, वह दोषी ठहर चुका, क्योंकि उसने परमेश्वर के एकलौते पुत्र के नाम पर विश्वास नहीं किया।",
      en: "He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.",
      meaning: "प्रभु यीशु मसीह पर सच्चा विश्वास हमें परमेश्वर के न्याय और दण्ड से पूर्ण मुक्ति दिलाता है।"
    }
  ],

  // John 1 - The Living Word
  "joh-1": [
    {
      v: 1,
      hi: "आदि में वचन था, और वचन परमेश्वर के साथ था, और वचन परमेश्वर था।",
      en: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      meaning: "सृष्टि से भी पहले प्रभु यीशु मसीह (वचन) मौजूद थे और वे साक्षात परमेश्वर हैं।"
    },
    {
      v: 4,
      hi: "उस में जीवन था; और वह जीवन मनुष्यों की ज्योति था।",
      en: "In him was life; and the life was the light of men.",
      meaning: "प्रभु यीशु ही हमारे वास्तविक जीवन के स्रोत हैं और वे हमारे अज्ञान व अंधकार को अपनी ईश्वरीय ज्योति से दूर करते हैं।"
    },
    {
      v: 5,
      hi: "और ज्योति अंधकार में चमकती है, और अंधकार ने उसे ग्रहण न किया।",
      en: "And the light shineth in darkness; and the darkness comprehended it not.",
      meaning: "पाप और निराशा का कोई भी अंधकार प्रभु यीशु के प्रकाश को कभी बुझा नहीं सकता।"
    },
    {
      v: 12,
      hi: "परन्तु जितनों ने उसे ग्रहण किया, उसने उन्हें परमेश्वर की सन्तान होने का अधिकार दिया, अर्थात् उन्हें जो उसके नाम पर विश्वास रखते हैं।",
      en: "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.",
      meaning: "जो कोई प्रभु यीशु को अपने हृदय में स्वीकार करता है, उसे परमेश्वर का बेटा और बेटी होने का स्वर्गीय पद और अधिकार मिलता है।"
    },
    {
      v: 14,
      hi: "और वचन देहधारी हुआ; और अनुग्रह और सच्चाई से परिपूर्ण होकर हमारे बीच में डेरा किया।",
      en: "And the Word was made flesh, and dwelt among us, full of grace and truth.",
      meaning: "परमेश्वर ने मनुष्य का रूप धरकर इस धरती पर जन्म लिया ताकि हम उनके अनुग्रह और सच्चाई को साक्षात देख सकें।"
    }
  ],

  // Matthew 5 - The Beatitudes (धन्य वचन)
  "mat-5": [
    {
      v: 3,
      hi: "धन्य हैं वे, जो मन के दीन हैं, क्योंकि स्वर्ग का राज्य उन्हीं का है।",
      en: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
      meaning: "जो लोग नम्र हैं और अपने आत्मिक जीवन में परमेश्वर की आवश्यकता महसूस करते हैं, स्वर्ग का राज्य उन्हीं के लिए है।"
    },
    {
      v: 4,
      hi: "धन्य हैं वे, जो शोक करते हैं, क्योंकि वे शान्ति पाएंगे।",
      en: "Blessed are they that mourn: for they shall be comforted.",
      meaning: "जो अपने पापों पर या दुःखों में विलाप करते हैं, प्रभु उन्हें स्वर्गीय सांत्वना और शांति देंगे।"
    },
    {
      v: 6,
      hi: "धन्य हैं वे जो धर्म के भूखे और प्यासे हैं, क्योंकि वे तृप्त किये जाएंगे।",
      en: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
      meaning: "जो परमेश्वर की इच्छा और धार्मिकता की खोज करते हैं, प्रभु उनकी आत्मा को पूर्ण रूप से तृप्त करेंगे।"
    },
    {
      v: 8,
      hi: "धन्य हैं वे, जिनके मन शुद्ध हैं, क्योंकि वे परमेश्वर को देखेंगे।",
      en: "Blessed are the pure in heart: for they shall see God.",
      meaning: "कपट और छल से रहित शुद्ध हृदय वाले लोग परमेश्वर की उपस्थिति का अनुभव कर पाते हैं।"
    },
    {
      v: 14,
      hi: "तुम जगत की ज्योति हो; जो नगर पहाड़ पर बसा हुआ है वह छिप नहीं सकता।",
      en: "Ye are the light of the world. A city that is set on an hill cannot be hid.",
      meaning: "मसीही विश्वासियों को अपने भले कामों और प्रेम से संसार में प्रकाश की तरह चमकना है।"
    },
    {
      v: 16,
      hi: "उसी प्रकार तुम्हारा उजियाला मनुष्यों के साम्हने चमके कि वे तुम्हारे भले कामों को देखकर तुम्हारे पिता की, जो स्वर्ग में हैं, बड़ाई करें।",
      en: "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.",
      meaning: "हमारे जीवन और व्यवहार ऐसा हो कि लोग हमारे अच्छे कार्यों को देखकर परमेश्वर की स्तुति करें।"
    }
  ],

  // Matthew 6 - The Lord's Prayer (प्रभु की प्रार्थना)
  "mat-6": [
    {
      v: 9,
      hi: "हे हमारे पिता, तू जो स्वर्ग में है; तेरा नाम पवित्र माना जाए।",
      en: "Our Father which art in heaven, Hallowed be thy name.",
      meaning: "प्रार्थना की शुरुआत हमेशा परमेश्वर के पवित्र नाम की महिमा और आदर के साथ करनी चाहिए।"
    },
    {
      v: 10,
      hi: "तेरा राज्य आए; तेरी इच्छा जैसी स्वर्ग में पूरी होती है, वैसे पृथ्वी पर भी हो।",
      en: "Thy kingdom come. Thy will be done in earth, as it is in heaven.",
      meaning: "हम अपनी मर्जी नहीं, बल्कि अपने जीवन और संसार में परमेश्वर की उत्तम इच्छा पूरी होने की प्रार्थना करते हैं।"
    },
    {
      v: 11,
      hi: "हमारी दिन भर की रोटी आज हमें दे।",
      en: "Give us this day our daily bread.",
      meaning: "अपनी दैनिक आवश्यकताओं और जीविका के लिए हम हर दिन प्रभु पर निर्भर रहते हैं।"
    },
    {
      v: 12,
      hi: "और जिस प्रकार हम ने अपने अपराधियों को क्षमा किया है, वैसे ही तू भी हमारे अपराधों को क्षमा कर।",
      en: "And forgive us our debts, as we forgive our debtors.",
      meaning: "यदि हम चाहते हैं कि परमेश्वर हमें क्षमा करें, तो हमें भी उन लोगों को दिल से माफ करना होगा जिन्होंने हमारे साथ बुरा किया।"
    },
    {
      v: 33,
      hi: "इसलिये पहिले तुम परमेश्वर के राज्य और उसके धर्म की खोज करो तो ये सब वस्तुएं भी तुम्हें मिल जाएंगी।",
      en: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
      meaning: "चिंता छोड़कर सबसे पहले परमेश्वर की संगति और आज्ञाकारिता को प्राथमिकता दें, बाकी सभी सांसारिक जरूरतें प्रभु खुद पूरी करेंगे।"
    }
  ],

  // Romans 8 - More than Conquerors
  "rom-8": [
    {
      v: 1,
      hi: "सो अब जो मसीह यीशु में हैं, उन पर दण्ड की आज्ञा नहीं।",
      en: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
      meaning: "जो मसीह यीशु में हैं, उनके सारे पुराने पाप क्षमा हो चुके हैं और वे अब दोषी नहीं हैं।"
    },
    {
      v: 28,
      hi: "और हम जानते हैं, कि जो लोग परमेश्वर से प्रेम रखते हैं, उनके लिये सब बातें मिलकर भलाई ही को उत्पन्न करती हैं, अर्थात् उन्हीं के लिये जो उसकी इच्छा के अनुसार बुलाए हुए हैं।",
      en: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
      meaning: "चाहे आज हमारे जीवन में दुख या रुकावट आए, परमेश्वर अंततः सब कुछ हमारे अच्छे और आत्मिक कल्याण के लिए बदल देंगे।"
    },
    {
      v: 31,
      hi: "सो हम इन बातों के विषय में क्या कहें? यदि परमेश्वर हमारी ओर है, तो हमारा विरोधी कौन हो सकता है?",
      en: "What shall we then say to these things? If God be for us, who can be against us?",
      meaning: "जब ब्रह्मांड का मालिक परमेश्वर हमारे पक्ष में है, तो दुनिया की कोई भी ताकत हमारा नुकसान नहीं कर सकती।"
    },
    {
      v: 37,
      hi: "परन्तु इन सब बातों में हम उसके द्वारा जिसने हम से प्रेम किया है, जयवन्त से भी बढ़कर हैं।",
      en: "Nay, in all these things we are more than conquerors through him that loved us.",
      meaning: "प्रभु यीशु के प्रेम और बलिदान के कारण हम हर संकट, बीमारी और परेशानी पर पूरी तरह से विजयी हैं।"
    },
    {
      v: 38,
      hi: "क्योंकि मैं निश्चय जानता हूँ, कि न मृत्यु, न जीवन, न स्वर्गदूत, न प्रधानताएं, न वर्तमान, न भविष्य, न सामर्थ्य,",
      en: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,",
      meaning: "कोई भी शक्ति हमें प्रभु यीशु मसीह के प्रेम से कभी अलग नहीं कर सकती।"
    }
  ],

  // 1 Corinthians 13 - The Love Chapter
  "cor1-13": [
    {
      v: 4,
      hi: "प्रेम धीरजवन्त है, और कृपालु है; प्रेम डाह नहीं करता; प्रेम अपनी बड़ाई नहीं करता, और फूलता नहीं।",
      en: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,",
      meaning: "सच्चा ईश्वरीय प्रेम हमेशा धैर्यवान और दयालु होता है; उसमें घमंड, ईर्ष्या या दिखावा नहीं होता।"
    },
    {
      v: 7,
      hi: "वह सब बातें सह लेता है, सब बातों की प्रतीति करता है, सब बातों की आशा रखता है, सब बातों में धीरज धरता है।",
      en: "Beareth all things, believeth all things, hopeth all things, endureth all things.",
      meaning: "मसीही प्रेम हर परिस्थिति में अडिग रहता है और कभी निराश नहीं होता।"
    },
    {
      v: 8,
      hi: "प्रेम कभी टलता नहीं; भविष्यद्वाणियां हों, तो समाप्त हो जाएंगी; भाषाएं हों, तो जाती रहेंगी; ज्ञान हो, तो मिट जाएगा।",
      en: "Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away.",
      meaning: "संसार की हर विद्या और वरदान एक दिन समाप्त हो जाएंगे, परन्तु प्रेम सदा अमर और अटल रहेगा।"
    },
    {
      v: 13,
      hi: "पर अब विश्वास, आशा, प्रेम ये तीनों बने हैं, पर इन में सब से बड़ा प्रेम है।",
      en: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
      meaning: "आत्मिक जीवन के तीनों प्रमुख गुणों में प्रेम सबसे महान है क्योंकि परमेश्वर स्वयं प्रेम हैं।"
    }
  ],

  // Isaiah 53 - The Suffering Servant (चंगाई का वचन)
  "isa-53": [
    {
      v: 3,
      hi: "वह तुच्छ जाना जाता और मनुष्यों का त्यागा हुआ था; वह दुःखी पुरुष था, रोग से उसकी जान-पहचान थी।",
      en: "He is despised and rejected of men; a man of sorrows, and acquainted with grief.",
      meaning: "प्रभु यीशु ने हमारे खातिर अपमान, तिरस्कार और भारी पीड़ा सही।"
    },
    {
      v: 4,
      hi: "निश्चय उसने हमारे रोगों को सह लिया और हमारे ही दुःखों को उठा लिया; तौभी हम ने उसे परमेश्वर का मारा-कूटा और दुर्दशा में पड़ा हुआ समझा।",
      en: "Surely he hath borne our griefs, and carried our sorrows: yet we did esteem him stricken, smitten of God, and afflicted.",
      meaning: "क्रूस पर प्रभु यीशु ने हमारी सारी बीमारियों, दर्दों और कमजोरियों को अपने ऊपर ले लिया।"
    },
    {
      v: 5,
      hi: "परन्तु वह हमारे ही अपराधों के कारण घायल किया गया, वह हमारे अधर्म के कामों के हेतु कुचला गया; हमारी ही शान्ति के लिये उस पर ताड़ना पड़ी कि उसके कोड़े खाने से हम चंगे हो जाएं।",
      en: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
      meaning: "यह चंगाई का सबसे शक्तिशाली वचन है: प्रभु यीशु के कोड़े खाने से हमें हर शारीरिक, मानसिक और आत्मिक बीमारी से पूर्ण चंगाई मिली है।"
    }
  ],

  // Philippians 4 - Strength & Joy
  "phi-4": [
    {
      v: 4,
      hi: "प्रभु में सदा आनन्दित रहो; मैं फिर कहता हूँ, आनन्दित रहो।",
      en: "Rejoice in the Lord alway: and again I say, Rejoice.",
      meaning: "परिस्थितियां कैसी भी हों, प्रभु की उपस्थिति के कारण हमारे हृदय में सदा ईश्वरीय आनन्द होना चाहिए।"
    },
    {
      v: 6,
      hi: "किसी भी बात की चिन्ता मत करो: परन्तु हर एक बात में तुम्हारे निवेदन, प्रार्थना और विन्ती के द्वारा धन्यवाद के साथ परमेश्वर के साम्हने उपस्थित किये जाएं।",
      en: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
      meaning: "चिंता करने के बजाय अपनी हर परेशानी को धन्यवाद के साथ प्रार्थना में परमेश्वर के चरणों में सौंप दें।"
    },
    {
      v: 7,
      hi: "तब परमेश्वर की शान्ति, जो सारी समझ से परे है, तुम्हारे हृदय और तुम्हारे विचारों को मसीह यीशु में सुरक्षित रखेगी।",
      en: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
      meaning: "परमेश्वर ऐसी अलौकिक शांति देंगे जिसे सांसारिक बुद्धि नहीं समझ सकती, जो हमारे मन को भय से मुक्त रखेगी।"
    },
    {
      v: 13,
      hi: "जो मुझे सामर्थ्य देता है उस में मैं सब कुछ कर सकता हूँ।",
      en: "I can do all things through Christ which strengtheneth me.",
      meaning: "मसीह यीशु की शक्ति के द्वारा हम किसी भी कठिनाई का सामना कर सकते हैं और असंभव को संभव बना सकते हैं।"
    },
    {
      v: 19,
      hi: "और मेरा परमेश्वर भी अपने उस धन के अनुसार जो महिमा सहित मसीह यीशु में है, तुम्हारी हर एक घटी को पूरी करेगा।",
      en: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
      meaning: "परमेश्वर अपनी असीम स्वर्गीय संपत्ति से हमारी प्रत्येक आर्थिक और व्यक्तिगत आवश्यकता को पूरा करेंगे।"
    }
  ]
};

export default function HolyBiblePage() {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(
    BIBLE_BOOKS.find((b) => b.id === "psa") || BIBLE_BOOKS[0]
  );
  const [selectedChapter, setSelectedChapter] = useState(23);
  const [langMode, setLangMode] = useState<"both" | "hi" | "en">("both");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Accordion state: Set of open verse numbers (by default verse 1 is open)
  const [openVerses, setOpenVerses] = useState<number[]>([1]);

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("rk_bible_bookmarks");
      return saved ? JSON.parse(saved) : ["psa-23-1", "joh-3-16"];
    } catch {
      return ["psa-23-1", "joh-3-16"];
    }
  });

  const [activeSpeakingKey, setActiveSpeakingKey] = useState<string | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Toggle single accordion verse
  const toggleAccordion = (verseNum: number) => {
    setOpenVerses((prev) =>
      prev.includes(verseNum)
        ? prev.filter((v) => v !== verseNum)
        : [...prev, verseNum]
    );
  };

  // Expand all verses
  const expandAll = (verseNumbers: number[]) => {
    setOpenVerses(verseNumbers);
  };

  // Collapse all verses
  const collapseAll = () => {
    setOpenVerses([]);
  };

  // Save bookmarks
  const toggleBookmark = (key: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      try {
        localStorage.setItem("rk_bible_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Text-to-speech audio reader
  const handleListen = (text: string, lang: "hi" | "en", key: string) => {
    if (!("speechSynthesis" in window)) {
      alert("आपके ब्राउज़र में ऑडियो स्पीच सपोर्ट उपलब्ध नहीं है।");
      return;
    }

    if (activeSpeakingKey === key) {
      window.speechSynthesis.cancel();
      setActiveSpeakingKey(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => setActiveSpeakingKey(null);
    utterance.onerror = () => setActiveSpeakingKey(null);

    speechRef.current = utterance;
    setActiveSpeakingKey(key);
    window.speechSynthesis.speak(utterance);
  };

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const chapterKey = `${selectedBook.id}-${selectedChapter}`;
  const currentVerses = useMemo(() => {
    if (VERSES_DATA[chapterKey]) {
      return VERSES_DATA[chapterKey];
    }
    // Fallback generated verses
    return [
      {
        v: 1,
        hi: `${selectedBook.nameHi} अध्याय ${selectedChapter}:1 — प्रभु परमेश्वर का जीवित वचन हमारे जीवन के लिए प्रकाश और ज्योति है।`,
        en: `${selectedBook.nameEn} ${selectedChapter}:1 — The word of the Lord is a lamp unto our feet and a light unto our path.`,
        meaning: "प्रभु का पवित्र वचन हमारे हर निर्णय और कदम में स्वर्गीय ज्ञान और मार्गदर्शन देता है।"
      },
      {
        v: 2,
        hi: "विश्वास ही आशा की हुई वस्तुओं का निश्चय, और अनदेखी वस्तुओं का प्रमाण है।",
        en: "Now faith is the substance of things hoped for, the evidence of things not seen.",
        meaning: "जब हम आँखों से नहीं देख पाते, तब भी परमेश्वर के वादों पर भरोसा रखना ही सच्चा विश्वास है।"
      },
      {
        v: 3,
        hi: "प्रभु का धन्यवाद करो क्योंकि वह भला है; और उसकी करूणा सदा की है।",
        en: "O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",
        meaning: "हर दिन हर परिस्थिति में प्रभु का धन्यवाद करें क्योंकि उनका प्रेम कभी खत्म नहीं होता।"
      }
    ];
  }, [chapterKey, selectedBook, selectedChapter]);

  // When chapter changes, reset open verses to verse 1
  useEffect(() => {
    setOpenVerses([1]);
  }, [chapterKey]);

  // Filtered verses by search query
  const filteredVerses = useMemo(() => {
    if (!searchQuery.trim()) return currentVerses;
    const q = searchQuery.toLowerCase();
    return currentVerses.filter(
      (v) =>
        v.hi.toLowerCase().includes(q) ||
        v.en.toLowerCase().includes(q) ||
        (v.meaning && v.meaning.toLowerCase().includes(q)) ||
        String(v.v) === q
    );
  }, [currentVerses, searchQuery]);

  // Copy verse to clipboard
  const handleCopy = (verse: Verse) => {
    const key = `${chapterKey}-${verse.v}`;
    const text = `📖 *पवित्र वचन (Holy Bible)*\n${selectedBook.nameHi} (${selectedBook.nameEn}) ${selectedChapter}:${verse.v}\n\n"${verse.hi}"\n\n"${verse.en}"${verse.meaning ? `\n\n💡 *सरल अर्थ:* ${verse.meaning}` : ""}\n\n✝️ *आरके मिनिस्ट्रीज (RK MINISTRIES)*\nप्रार्थना व संगति: https://rkministries.org/bible`;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Share to WhatsApp
  const handleShareWhatsApp = (verse: Verse) => {
    const text = `📖 *पवित्र वचन (Holy Bible) — आरके मिनिस्ट्रीज*\n\n*${selectedBook.nameHi} (${selectedBook.nameEn}) ${selectedChapter}:${verse.v}*\n\n"${verse.hi}"\n\n"${verse.en}"${verse.meaning ? `\n\n💡 *सरल अर्थ:* ${verse.meaning}` : ""}\n\n✝️ प्रभु यीशु मसीह आपको आशीष दें!\nऑनलाइन बाइबिल पढ़ें: https://rkministries.org/bible`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const allFilteredNumbers = useMemo(() => filteredVerses.map((v) => v.v), [filteredVerses]);
  const isAllOpen = allFilteredNumbers.length > 0 && allFilteredNumbers.every((num) => openVerses.includes(num));

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-slate-900 font-sans">
      <SiteHeader />

      <PageHero
        title="Holy Bible"
        accent="पवित्र बाइबिल (Hindi / English)"
        description="तेरा वचन मेरे पांव के लिये दीपक, और मेरे मार्ग के लिये उजियाला है (भजन संहिता 119:105) — सरल और सहज बाइबिल अध्ययन।"
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6 -mt-8">
        
        {/* Navigation & Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EADFC7] shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Book & Chapter Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Select Book */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">पुस्तक:</span>
                <select
                  value={selectedBook.id}
                  onChange={(e) => {
                    const book = BIBLE_BOOKS.find((b) => b.id === e.target.value);
                    if (book) {
                      setSelectedBook(book);
                      setSelectedChapter(1);
                      setSearchQuery("");
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl border border-[#EADFC7] text-sm font-bold bg-[#FFFDF7] text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition"
                >
                  <optgroup label="नया नियम (New Testament)">
                    {BIBLE_BOOKS.filter((b) => b.testament === "NT").map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nameHi} — {b.nameEn}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="पुराना नियम (Old Testament)">
                    {BIBLE_BOOKS.filter((b) => b.testament === "OT").map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nameHi} — {b.nameEn}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Select Chapter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">अध्याय:</span>
                <select
                  value={selectedChapter}
                  onChange={(e) => {
                    setSelectedChapter(Number(e.target.value));
                    setSearchQuery("");
                  }}
                  className="px-3.5 py-2 rounded-xl border border-[#EADFC7] text-sm font-bold bg-[#FFFDF7] text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none transition"
                >
                  {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      अध्याय {num} (Ch {num})
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Selector */}
              <div className="flex items-center p-1 rounded-xl border border-slate-200 bg-slate-100">
                <button
                  onClick={() => setLangMode("both")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    langMode === "both" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  दोनों (Both)
                </button>
                <button
                  onClick={() => setLangMode("hi")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    langMode === "hi" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLangMode("en")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    langMode === "en" ? "bg-amber-500 text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Expand / Collapse All Toggle Button */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => (isAllOpen ? collapseAll() : expandAll(allFilteredNumbers))}
                className="px-3.5 py-2 rounded-xl border border-[#EADFC7] bg-[#FFFDF7] hover:bg-[#FAF4E5] text-[#5C3D1E] text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              >
                <ChevronsUpDown className="w-4 h-4 text-amber-700" />
                <span>{isAllOpen ? "सभी वचन समेटें (Collapse All)" : "सभी वचन खोलें (Expand All)"}</span>
              </button>
            </div>
          </div>

          {/* Quick Search inside current chapter */}
          <div className="mt-4 pt-3 border-t border-[#EADFC7]/60 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="इस अध्याय में शब्द खोजें (उदा. चरवाहा, प्रेम, चंगाई, 16, शांति)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-[#FFFDF7] text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <span className="text-xs text-amber-700 font-bold shrink-0">
                {filteredVerses.length} वचन मिले
              </span>
            )}
          </div>
        </div>

        {/* Verses Accordion Container */}
        <div className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-8 border border-[#EADFC7] shadow-md space-y-6">
          
          {/* Chapter Header */}
          <div className="text-center pb-5 border-b border-[#EADFC7]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 font-bold text-xs mb-2">
              <FaCross className="w-3 h-3 text-amber-600" />
              <span>{selectedBook.category} • {selectedBook.shortDesc}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#0A2540]">
              {selectedBook.nameHi} ({selectedBook.nameEn}) — अध्याय {selectedChapter}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl mx-auto">
              पवित्र बाइबिल (Hindi BSI / King James Version) • आरके मिनिस्ट्रीज (RK MINISTRIES)
            </p>
          </div>

          {/* Verses Accordion List */}
          <div className="space-y-3.5">
            {filteredVerses.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-slate-500 text-sm font-medium">
                  "{searchQuery}" के लिए कोई वचन नहीं मिला।
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  सर्च रीसेट करें
                </button>
              </div>
            ) : (
              filteredVerses.map((verse) => {
                const verseKey = `${chapterKey}-${verse.v}`;
                const isOpen = openVerses.includes(verse.v);
                const isBookmarked = bookmarks.includes(verseKey);
                const isSpeaking = activeSpeakingKey === verseKey;
                const isCopied = copiedKey === verseKey;

                return (
                  <div
                    key={verse.v}
                    id={`v-${verse.v}`}
                    className={`rounded-2xl border transition-all relative overflow-hidden bg-[#FFFDF7] ${
                      isOpen
                        ? "border-[#D8C7A3] shadow-sm ring-1 ring-amber-400/20"
                        : "border-[#EADFC7]/70 hover:border-[#D8C7A3]"
                    }`}
                  >
                    {/* Accordion Trigger Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(verse.v)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAF4E5] border-[#EADFC7]/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {/* Verse number */}
                        <span className="w-8 h-8 rounded-full bg-[#F3E5C8] text-[#5C3D1E] border border-[#DECA9E] font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-sm">
                          {verse.v}
                        </span>

                        {/* Verse preview headline */}
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-base sm:text-lg text-[#241A12] truncate">
                            {verse.hi}
                          </p>
                          <p className="text-xs text-[#5C5248] italic truncate">
                            {verse.en}
                          </p>
                        </div>
                      </div>

                      {/* Accordion toggle indicator */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                          {isOpen ? "समेटें" : "विस्तार से पढ़ें"}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-amber-800 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Accordion Body Content */}
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-[#EADFC7]/60 bg-[#FAF7F0]/50 space-y-4">
                        {/* Hindi Scripture */}
                        {(langMode === "both" || langMode === "hi") && (
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800/80 block">
                              पवित्र वचन (Hindi)
                            </span>
                            <p className="font-serif font-medium text-lg sm:text-xl text-[#241A12] leading-relaxed">
                              {verse.hi}
                            </p>
                          </div>
                        )}

                        {/* English Scripture */}
                        {(langMode === "both" || langMode === "en") && (
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                              King James Version (English)
                            </span>
                            <p className="font-serif italic text-sm sm:text-base text-[#5C5248] leading-relaxed">
                              {verse.en}
                            </p>
                          </div>
                        )}

                        {/* Meaning / Explanation */}
                        {verse.meaning && (
                          <div className="p-3.5 sm:p-4 rounded-xl border border-[#E2D2B0] bg-[#F7EED9]/90 text-[#4A3219] text-xs sm:text-sm font-sans flex items-start gap-2.5">
                            <span className="font-extrabold shrink-0 text-amber-800">
                              💡 सरल अर्थ व संदेश:
                            </span>
                            <span className="leading-relaxed font-medium">
                              {verse.meaning}
                            </span>
                          </div>
                        )}

                        {/* Actions Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EADFC7]/60">
                          <div className="flex items-center gap-2">
                            {/* Audio Listen */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleListen(verse.hi, "hi", verseKey);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                                isSpeaking
                                  ? "bg-amber-500 text-slate-950 animate-pulse shadow"
                                  : "bg-[#F3E5C8] hover:bg-[#EADFC7] text-[#5C3D1E]"
                              }`}
                            >
                              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              <span>{isSpeaking ? "सुनना रोकें" : "वचन सुनें (Audio)"}</span>
                            </button>

                            {/* Copy Verse */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(verse);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                            >
                              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                              <span>{isCopied ? "कॉपी हो गया!" : "कॉपी करें"}</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* WhatsApp Share */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShareWhatsApp(verse);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>व्हाट्सएप पर शेयर</span>
                            </button>

                            {/* Bookmark */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(verseKey);
                              }}
                              className={`p-2 rounded-xl border text-xs transition ${
                                isBookmarked
                                  ? "bg-rose-50 border-rose-300 text-rose-600"
                                  : "bg-white border-slate-200 text-slate-400 hover:text-rose-500"
                              }`}
                              title={isBookmarked ? "बुकमार्क हटाएं" : "बुकमार्क करें"}
                            >
                              <Heart className={`w-4 h-4 ${isBookmarked ? "fill-rose-500 text-rose-500" : ""}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Chapter Bottom Navigation (Prev / Next) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-8 border-t border-[#EADFC7]">
            <button
              disabled={selectedChapter <= 1}
              onClick={() => {
                setSelectedChapter((prev) => Math.max(1, prev - 1));
                setSearchQuery("");
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#EADFC7] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#FAF4E5] text-[#5C3D1E] text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>पिछला अध्याय (Chapter {selectedChapter - 1})</span>
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-500">
                {selectedBook.nameHi} ({selectedBook.nameEn}) • कुल {selectedBook.chaptersCount} अध्याय
              </span>
            </div>

            <button
              disabled={selectedChapter >= selectedBook.chaptersCount}
              onClick={() => {
                setSelectedChapter((prev) => Math.min(selectedBook.chaptersCount, prev + 1));
                setSearchQuery("");
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>अगला अध्याय (Chapter {selectedChapter + 1})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bible Study Help & Blessing Card */}
        <div className="grid md:grid-cols-2 gap-5 pt-2">
          
          {/* Daily Reading Plan & Guidance */}
          <div className="p-6 rounded-3xl border border-[#EADFC7] bg-white text-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
                <BookMarked className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base">प्रतिदिन बाइबिल अध्ययन के लाभ</h4>
                <p className="text-xs text-slate-500">आत्मिक उन्नति और मानसिक शांति</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-disc list-inside">
              <li>प्रतिदिन कम से कम एक अध्याय प्रार्थनापूर्वक पढ़ें।</li>
              <li>वचन के <strong>सरल अर्थ</strong> पर मनन करें।</li>
              <li>प्रभु यीशु के वचनों को अपने जीवन में लागू करें।</li>
              <li>पसंदीदा वचनों को बुकमार्क करें और अपनों के साथ साझा करें।</li>
            </ul>
          </div>

          {/* Need Prayer / Fellowship Help */}
          <div className="p-6 rounded-3xl border border-[#EADFC7] bg-white text-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
                <FaHandsPraying className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base">क्या आपको विशेष प्रार्थना की आवश्यकता है?</h4>
                <p className="text-xs text-slate-500">आरके मिनिस्ट्रीज प्रार्थना संगति</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              यदि आप किसी बीमारी, पारिवारिक समस्या या संकट में हैं, तो हमारी प्रार्थना टीम आपके लिए प्रभु यीशु मसीह के नाम में निरंतर प्रार्थना करने के लिए तत्पर है।
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/prayer-request"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                प्रार्थना निवेदन भेजें (Prayer Request)
              </a>
              <a
                href="https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-xs transition"
              >
                यूट्यूब आराधना व वचन
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
