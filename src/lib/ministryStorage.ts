// Ministry Storage for RK MINISTRIES
// Handles local storage persistence, demo seed data, and export/import for Local Data Backup

export interface MemberRecord {
  id: string; // e.g. RKM-2026-1001
  name: string;
  nameHindi?: string;
  mobile: string;
  email: string;
  fatherName: string;
  motherName?: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  village: string;
  post: string;
  policeStation: string;
  district: string;
  state: string;
  pincode: string;
  photoUrl?: string;
  joinDate: string;
  status: "Active" | "Pending" | "Suspended";
  role: "Believer / विश्वासी" | "Evangelist / प्रचारक" | "Volunteer / सेवक" | "Elder / प्राचीन";
  isBaptized: boolean;
  baptismDate?: string;
  certificateNo?: string;
}

export interface BaptismApplication {
  id: string; // e.g. BAP-2026-0891
  name: string;
  mobile: string;
  email: string;
  fatherName: string;
  motherName: string;
  dob?: string;
  address: string;
  village: string;
  district: string;
  statementOfFaith: string;
  videoUrl?: string;
  documentName?: string;
  documentUrl?: string;
  // 2 Witnesses / Evidence fields (as requested: "2 colam 2 Witness/Evidence fields")
  witness1: {
    name: string;
    relation: string;
    mobile: string;
    statement: string;
  };
  witness2: {
    name: string;
    relation: string;
    mobile: string;
    statement: string;
  };
  applicationDate: string;
  status: "Pending" | "Verified" | "Approved" | "Certificate Issued" | "Rejected";
  verifiedBy?: string;
  verificationNotes?: string;
  baptismDate?: string;
  officiatingPastor?: string;
  certificateNo?: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  mobile: string;
  address: string;
  subject: "Healing / चंगाई" | "Family / परिवार" | "Deliverance / छुटकारा" | "Financial / आर्थिक" | "Spiritual Growth / आत्मिक" | "Peace / शांति" | "Other / अन्य";
  details: string;
  date: string;
  isUrgent: boolean;
  isPublic: boolean;
  prayersCount: number;
  status: "Open" | "Answered" | "Praying";
}

export interface Testimony {
  id: string;
  name: string;
  mobile: string;
  address: string;
  title: string;
  content: string;
  mediaType: "video" | "audio" | "written";
  mediaUrl?: string;
  date: string;
  status: "Approved" | "Pending";
  likes: number;
}

export interface FieldWorker {
  id: string;
  name: string;
  mobile: string;
  area: string;
  totalMembersEnrolled: number;
  totalBaptismsReferred: number;
  joinedDate: string;
  status: "Active" | "Inactive";
}

const STORAGE_KEYS = {
  MEMBERS: "rkm_members_v1",
  BAPTISMS: "rkm_baptisms_v1",
  PRAYERS: "rkm_prayers_v1",
  TESTIMONIES: "rkm_testimonies_v1",
  WORKERS: "rkm_workers_v1",
};

// Initial Seed Data
const initialMembers: MemberRecord[] = [
  {
    id: "RKM-2026-1001",
    name: "Ramesh Kumar",
    nameHindi: "रमेश कुमार",
    mobile: "9598059289",
    email: "azaramesh@gmail.com",
    fatherName: "Ram Prasad",
    motherName: "Shanti Devi",
    gender: "Male",
    dob: "1982-04-15",
    village: "Mustafabad",
    post: "Gujarpar",
    policeStation: "Mubarakpur",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    pincode: "276404",
    joinDate: "2018-01-10",
    status: "Active",
    role: "Elder / प्राचीन",
    isBaptized: true,
    baptismDate: "2015-08-20",
    certificateNo: "RKM-BAP-2015-001",
  },
  {
    id: "RKM-2026-1002",
    name: "Sunita Kumari",
    nameHindi: "सुनीता कुमारी",
    mobile: "9838112233",
    email: "sunita.azamgarh@gmail.com",
    fatherName: "Dinanath",
    motherName: "Gita Devi",
    gender: "Female",
    dob: "1990-07-22",
    village: "Gujarpar",
    post: "Gujarpar",
    policeStation: "Mubarakpur",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    pincode: "276404",
    joinDate: "2020-03-15",
    status: "Active",
    role: "Believer / विश्वासी",
    isBaptized: true,
    baptismDate: "2021-11-14",
    certificateNo: "RKM-BAP-2021-042",
  },
  {
    id: "RKM-2026-1003",
    name: "Anand Masih",
    nameHindi: "आनंद मसीह",
    mobile: "9450334455",
    email: "anand.masih@gmail.com",
    fatherName: "Kishore Kumar",
    motherName: "Pushpa",
    gender: "Male",
    dob: "1995-11-03",
    village: "Mustafabad",
    post: "Gujarpar",
    policeStation: "Mubarakpur",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    pincode: "276404",
    joinDate: "2022-05-18",
    status: "Active",
    role: "Evangelist / प्रचारक",
    isBaptized: true,
    baptismDate: "2023-01-08",
    certificateNo: "RKM-BAP-2023-108",
  },
  {
    id: "RKM-2026-1004",
    name: "Pooja Joseph",
    nameHindi: "पूजा जोसेफ",
    mobile: "9120445566",
    email: "pooja.joseph@gmail.com",
    fatherName: "Joseph Masih",
    motherName: "Mary",
    gender: "Female",
    dob: "1998-02-14",
    village: "Mubarakpur Town",
    post: "Mubarakpur",
    policeStation: "Mubarakpur",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    pincode: "276404",
    joinDate: "2024-02-10",
    status: "Active",
    role: "Believer / विश्वासी",
    isBaptized: false,
  },
];

const initialBaptisms: BaptismApplication[] = [
  {
    id: "BAP-2026-0891",
    name: "Rajesh Kumar",
    mobile: "9598059289",
    email: "azaramesh@gmail.com",
    fatherName: "Ram Prasad",
    motherName: "Shanti Devi",
    dob: "1988-06-12",
    address: "Village Mustafabad, Post Gujarpar, Mubarakpur, Azamgarh",
    village: "Mustafabad",
    district: "Azamgarh",
    statementOfFaith: "I believe that the Lord Jesus Christ died for my sins and rose again on the third day. I accept Him as my personal Savior and wish to be baptized according to the Holy Scriptures (Matthew 28:19).",
    videoUrl: "https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh",
    documentName: "Aadhaar_Card_Verified.pdf",
    witness1: {
      name: "Pastor Ramesh Kumar",
      relation: "Church Chairman / Pastor",
      mobile: "9598059289",
      statement: "I have known the candidate for 4 years. He faithfully attends church and confesses Jesus Christ."
    },
    witness2: {
      name: "Anand Masih",
      relation: "Field Worker / Church Elder",
      mobile: "9450334455",
      statement: "I testify that Brother Rajesh has taken catechism class and has sincere faith."
    },
    applicationDate: "2026-03-10",
    status: "Certificate Issued",
    verifiedBy: "Pastor Ramesh Kumar",
    verificationNotes: "Faith verified. Candidate baptized in church pool.",
    baptismDate: "2026-03-25",
    officiatingPastor: "Pastor Ramesh Kumar",
    certificateNo: "RKM-BAP-2026-0891",
  },
  {
    id: "BAP-2026-0892",
    name: "Sunita Kumari",
    mobile: "9838112233",
    email: "sunita.azamgarh@gmail.com",
    fatherName: "Dinanath",
    motherName: "Gita Devi",
    dob: "1990-07-22",
    address: "Village Gujarpar, Mubarakpur, Azamgarh",
    village: "Gujarpar",
    district: "Azamgarh",
    statementOfFaith: "यीशु मसीह मेरे उद्धारकर्ता हैं। मैं बपतिस्मा लेकर प्रभु के वचनों पर चलने का संकल्प लेती हूँ।",
    videoUrl: "",
    documentName: "Govt_ID_Proof.jpg",
    witness1: {
      name: "Suman Devi",
      relation: "Village Elder",
      mobile: "9792001122",
      statement: "She has been coming to prayer meetings regularly."
    },
    witness2: {
      name: "Ramesh Kumar",
      relation: "Pastor",
      mobile: "9598059289",
      statement: "Statement of faith verified and confirmed."
    },
    applicationDate: "2026-04-01",
    status: "Approved",
    verifiedBy: "Church Committee",
    verificationNotes: "Approved for upcoming Sunday baptism service.",
    baptismDate: "2026-04-19",
    officiatingPastor: "Pastor Ramesh Kumar",
    certificateNo: "RKM-BAP-2026-0892",
  },
  {
    id: "BAP-2026-0893",
    name: "Vikas David",
    mobile: "9415887766",
    email: "vikas.david@gmail.com",
    fatherName: "Mata Prasad",
    motherName: "Laxmi Devi",
    dob: "2001-09-18",
    address: "Mustafabad, Mubarakpur, Azamgarh",
    village: "Mustafabad",
    district: "Azamgarh",
    statementOfFaith: "I confess my faith in Lord Jesus and desire baptism in water in the name of the Father, the Son, and the Holy Spirit.",
    witness1: {
      name: "Anand Masih",
      relation: "Brother in Christ",
      mobile: "9450334455",
      statement: "He repented and received Jesus Christ into his heart."
    },
    witness2: {
      name: "Pooja Joseph",
      relation: "Youth Fellowship Leader",
      mobile: "9120445566",
      statement: "Witness to his transformation and dedicated service."
    },
    applicationDate: "2026-04-08",
    status: "Pending",
  }
];

const initialPrayers: PrayerRequest[] = [
  {
    id: "PR-2026-01",
    name: "Sunita Kumari",
    mobile: "9838112233",
    address: "Village Gujarpar, Azamgarh",
    subject: "Healing / चंगाई",
    details: "Please pray for complete recovery from persistent fever and strength in family.",
    date: "2026-04-10",
    isUrgent: true,
    isPublic: true,
    prayersCount: 48,
    status: "Praying",
  },
  {
    id: "PR-2026-02",
    name: "Raju Masih",
    mobile: "9598059289",
    address: "Mustafabad, Mubarakpur",
    subject: "Family / परिवार",
    details: "Praying for peace, unity and financial breakthrough in our household.",
    date: "2026-04-09",
    isUrgent: false,
    isPublic: true,
    prayersCount: 32,
    status: "Praying",
  },
  {
    id: "PR-2026-03",
    name: "Manoj Kumar",
    mobile: "9450112244",
    address: "Mubarakpur, Azamgarh",
    subject: "Deliverance / छुटकारा",
    details: "Praise God! After church prayer, my severe joint pain is healed. Pray for continuous protection.",
    date: "2026-04-05",
    isUrgent: false,
    isPublic: true,
    prayersCount: 65,
    status: "Answered",
  },
];

const initialTestimonies: Testimony[] = [
  {
    id: "TST-01",
    name: "Sunita Devi",
    mobile: "9838112233",
    address: "Mustafabad, Mubarakpur",
    title: "Miraculous Healing from Chronic Illness (प्रभु यीशु ने दी चंगाई)",
    content: "I was suffering from chronic health issues for 3 years. Doctors had given up hope. Pastor Ramesh and RK Ministries believers prayed for me with fasting. Today by the grace of God, I am 100% healthy and joyful! Hallelujah!",
    mediaType: "written",
    date: "2026-03-18",
    status: "Approved",
    likes: 54,
  },
  {
    id: "TST-02",
    name: "Anand Masih",
    mobile: "9450334455",
    address: "Mubarakpur, Azamgarh",
    title: "Family Salvation & Peace Restored",
    content: "My family experienced tremendous peace and blessings after attending Sunday service at RK Ministries. My father accepted Jesus Christ and our broken home is now full of love and faith.",
    mediaType: "video",
    mediaUrl: "https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh",
    date: "2026-03-28",
    status: "Approved",
    likes: 89,
  },
];

const initialWorkers: FieldWorker[] = [
  {
    id: "FW-101",
    name: "Anand Masih",
    mobile: "9450334455",
    area: "Mustafabad & Gujarpar",
    totalMembersEnrolled: 84,
    totalBaptismsReferred: 19,
    joinedDate: "2022-05-18",
    status: "Active",
  },
  {
    id: "FW-102",
    name: "Pooja Joseph",
    mobile: "9120445566",
    area: "Mubarakpur Town & Rural",
    totalMembersEnrolled: 62,
    totalBaptismsReferred: 14,
    joinedDate: "2023-01-10",
    status: "Active",
  },
  {
    id: "FW-103",
    name: "Brother David",
    mobile: "9415887766",
    area: "Azamgarh District North",
    totalMembersEnrolled: 47,
    totalBaptismsReferred: 8,
    joinedDate: "2023-08-01",
    status: "Active",
  },
];

export const MinistryStorage = {
  // Members
  getMembers(): MemberRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(initialMembers));
        return initialMembers;
      }
      return JSON.parse(data);
    } catch {
      return initialMembers;
    }
  },
  saveMember(member: Omit<MemberRecord, "id" | "joinDate">): MemberRecord {
    const list = this.getMembers();
    const id = `RKM-2026-${1000 + list.length + 1}`;
    const newRecord: MemberRecord = {
      ...member,
      id,
      joinDate: new Date().toISOString().split("T")[0],
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(list));
    return newRecord;
  },
  findMember(query: string): MemberRecord | undefined {
    const q = query.trim().toLowerCase();
    const list = this.getMembers();
    return list.find(m => m.id.toLowerCase() === q || m.mobile.replace(/\D/g, '') === q.replace(/\D/g, '') || m.email.toLowerCase() === q);
  },

  // Baptisms
  getBaptisms(): BaptismApplication[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BAPTISMS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.BAPTISMS, JSON.stringify(initialBaptisms));
        return initialBaptisms;
      }
      return JSON.parse(data);
    } catch {
      return initialBaptisms;
    }
  },
  saveBaptism(app: Omit<BaptismApplication, "id" | "applicationDate" | "status">): BaptismApplication {
    const list = this.getBaptisms();
    const count = list.length + 1;
    const id = `BAP-2026-${String(890 + count).padStart(4, "0")}`;
    const newRecord: BaptismApplication = {
      ...app,
      id,
      applicationDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.BAPTISMS, JSON.stringify(list));
    return newRecord;
  },
  updateBaptismStatus(id: string, status: BaptismApplication["status"], notes?: string, certificateNo?: string): BaptismApplication | null {
    const list = this.getBaptisms();
    const idx = list.findIndex(b => b.id === id);
    if (idx === -1) return null;
    list[idx].status = status;
    if (notes) list[idx].verificationNotes = notes;
    if (certificateNo) list[idx].certificateNo = certificateNo;
    if (status === "Certificate Issued" && !list[idx].certificateNo) {
      list[idx].certificateNo = `RKM-${list[idx].id}`;
    }
    localStorage.setItem(STORAGE_KEYS.BAPTISMS, JSON.stringify(list));
    return list[idx];
  },
  findBaptism(query: string): BaptismApplication | undefined {
    const q = query.trim().toLowerCase();
    const list = this.getBaptisms();
    return list.find(b => 
      b.id.toLowerCase() === q ||
      (b.certificateNo && b.certificateNo.toLowerCase() === q) ||
      b.mobile.replace(/\D/g, '') === q.replace(/\D/g, '') ||
      b.name.toLowerCase().includes(q)
    );
  },

  // Prayers
  getPrayers(): PrayerRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRAYERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(initialPrayers));
        return initialPrayers;
      }
      return JSON.parse(data);
    } catch {
      return initialPrayers;
    }
  },
  savePrayer(prayer: Omit<PrayerRequest, "id" | "date" | "prayersCount" | "status">): PrayerRequest {
    const list = this.getPrayers();
    const id = `PR-2026-${String(list.length + 1).padStart(2, "0")}`;
    const newRecord: PrayerRequest = {
      ...prayer,
      id,
      date: new Date().toISOString().split("T")[0],
      prayersCount: 1,
      status: "Praying",
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(list));
    return newRecord;
  },
  incrementPrayer(id: string): number {
    const list = this.getPrayers();
    const target = list.find(p => p.id === id);
    if (target) {
      target.prayersCount = (target.prayersCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(list));
      return target.prayersCount;
    }
    return 0;
  },

  // Testimonies
  getTestimonies(): Testimony[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(initialTestimonies));
        return initialTestimonies;
      }
      return JSON.parse(data);
    } catch {
      return initialTestimonies;
    }
  },
  saveTestimony(testimony: Omit<Testimony, "id" | "date" | "status" | "likes">): Testimony {
    const list = this.getTestimonies();
    const id = `TST-${String(list.length + 1).padStart(2, "0")}`;
    const newRecord: Testimony = {
      ...testimony,
      id,
      date: new Date().toISOString().split("T")[0],
      status: "Approved",
      likes: 1,
    };
    list.unshift(newRecord);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(list));
    return newRecord;
  },
  likeTestimony(id: string): number {
    const list = this.getTestimonies();
    const target = list.find(t => t.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(list));
      return target.likes;
    }
    return 0;
  },

  // Field Workers
  getWorkers(): FieldWorker[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORKERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(initialWorkers));
        return initialWorkers;
      }
      return JSON.parse(data);
    } catch {
      return initialWorkers;
    }
  },

  // Full Backup & Restore
  exportFullBackup(): string {
    const bundle = {
      version: "1.0",
      ministry: "RK MINISTRIES",
      exportedAt: new Date().toISOString(),
      members: this.getMembers(),
      baptisms: this.getBaptisms(),
      prayers: this.getPrayers(),
      testimonies: this.getTestimonies(),
      workers: this.getWorkers(),
    };
    return JSON.stringify(bundle, null, 2);
  },
  importFullBackup(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.members) localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(data.members));
      if (data.baptisms) localStorage.setItem(STORAGE_KEYS.BAPTISMS, JSON.stringify(data.baptisms));
      if (data.prayers) localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(data.prayers));
      if (data.testimonies) localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(data.testimonies));
      if (data.workers) localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(data.workers));
      return true;
    } catch (e) {
      console.error("Backup import failed", e);
      return false;
    }
  },
  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(initialMembers));
    localStorage.setItem(STORAGE_KEYS.BAPTISMS, JSON.stringify(initialBaptisms));
    localStorage.setItem(STORAGE_KEYS.PRAYERS, JSON.stringify(initialPrayers));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(initialTestimonies));
    localStorage.setItem(STORAGE_KEYS.WORKERS, JSON.stringify(initialWorkers));
  }
};
