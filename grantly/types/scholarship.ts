export type LevelOfStudy =
  | "Schooling (Class 1–12)"
  | "ITI / Diploma"
  | "Undergraduate"
  | "Postgraduate"
  | "Ph.D."
  | "Vocational";

export type InstitutionType =
  | "Government"
  | "Government-Aided"
  | "Autonomous"
  | "Private"
  | "Premier Institutes (IITs, NITs, AIIMS, NLU, etc.)";

export type AdmissionMode =
  | "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)"
  | "Management / Direct Quota";

export type SocialCategory =
  | "General"
  | "OBC"
  | "SC"
  | "ST"
  | "EWS"
  | "Notified Minorities";

export type MinorityCommunity =
  | "Muslim"
  | "Christian"
  | "Sikh"
  | "Jain"
  | "Buddhist"
  | "Parsi"
  | "None";

export type OccupationalBackground =
  | "None"
  | "Children of Defense / CAPF personnel"
  | "Wards of Martyrs"
  | "Beedi / Mine / Construction workers"
  | "Farmers / Agricultural workers";

export type PortalType =
  | "National Portal (NSP)"
  | "State Portal"
  | "Corporate / NGO Grant"
  | "Premier Institute / Autonomous";

export type NeedLevel = "High" | "Medium" | "Low" | "Any";

export type StudentProfile = {
  // Basic & Identity
  name: string;
  email: string;
  organization: string; // College, University, or School Name
  avatarInitials?: string;

  // 1. Academic Details
  levelOfStudy: LevelOfStudy;
  courseStream: string; // e.g. B.Tech, B.Sc, B.A., M.B.B.S, MBA, Class 12, etc.
  specialization: string; // e.g. Computer Science, Mechanical, Biology, Commerce, etc.
  pastScoreType: "Percentage" | "CGPA";
  pastScore: number; // e.g. 78% or 8.5 CGPA
  institutionType: InstitutionType;
  admissionMode: AdmissionMode;

  // 2. Socio-Economic Details
  annualFamilyIncome: number; // e.g. 240000
  incomeBracket: "<= ₹1.5L" | "<= ₹2.5L" | "<= ₹4.5L" | "<= ₹6L" | "<= ₹8L" | "> ₹8L";
  socialCategory: SocialCategory;
  minorityCommunity?: MinorityCommunity;
  stateOfDomicile: string; // e.g. Maharashtra, Karnataka, Uttar Pradesh, etc.

  // 3. Special Category / Background Status
  gender: "Female" | "Male" | "Non-binary" | "Other";
  isSingleGirlChild: boolean;
  isPwD: boolean; // Person with Benchmark Disability
  disabilityPercentage: number; // >= 40%
  occupationalBackground: OccupationalBackground;
  specialCircumstances: string[]; // "Single parent", "Orphan status", "First-generation graduate"

  // 4. Essential Application Prerequisites
  aadhaarLinkedWithBankDBT: boolean;
  documentsReady: {
    incomeCertificate: boolean;
    categoryCertificate: boolean;
    bonafideOrFeeReceipt: boolean;
    pastMarksheets: boolean;
  };

  // Backwards compatibility for quick filters
  degree?: string;
  field?: string;
  need?: Exclude<NeedLevel, "Any">;
};

export type Scholarship = {
  id: string;
  title: string;
  organization: string; // Provider or Portal, e.g. "Ministry of Education (NSP)", "Reliance Foundation", "MahaDBT"
  portalType: PortalType;
  amount: number; // Maximum grant amount in INR
  deadline: string; // YYYY-MM-DD
  degree: string[]; // Levels of study eligible
  courses?: string[]; // Specific courses e.g. ["B.Tech", "M.B.B.S", "B.Sc"]
  fields: string[]; // General fields e.g. ["Engineering", "Computer Science", "Medical"]
  need: NeedLevel[];
  location: string; // e.g. "All India", "Maharashtra", "Karnataka"
  states?: string[]; // Specific states eligible, e.g. ["All India"] or ["Maharashtra"]
  description: string;
  eligibility: string[];
  color: string;
  featured?: boolean;

  // Detailed criteria for precise Indian scholarship matching
  minScorePercent?: number; // Minimum percentage required (e.g. 50, 60, 75)
  maxFamilyIncome?: number; // Maximum parental annual income in INR (e.g. 250000, 450000, 800000)
  targetCategories?: SocialCategory[];
  minoritiesAllowed?: boolean;
  genderEligibility?: "All" | "Female Only" | "Single Girl Child Preferred";
  institutionTypesAllowed?: InstitutionType[];
  admissionModesAllowed?: AdmissionMode[];
  requiresPwD?: boolean;
  minDisabilityPercent?: number;
  occupationalTarget?: OccupationalBackground[];
  specialCircumstancesTarget?: string[];
  dbtMandatory?: boolean;
  requiredDocuments?: string[];
  officialPortalUrl?: string;
};
