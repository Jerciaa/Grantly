"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  IndianRupee,
  ShieldAlert,
  Award,
  Users,
  HeartHandshake,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import type {
  StudentProfile,
  LevelOfStudy,
  InstitutionType,
  AdmissionMode,
  SocialCategory,
  MinorityCommunity,
  OccupationalBackground
} from "@/types/scholarship";

const studyLevels: LevelOfStudy[] = [
  "Schooling (Class 1–12)",
  "ITI / Diploma",
  "Undergraduate",
  "Postgraduate",
  "Ph.D.",
  "Vocational"
];

const institutionTypes: InstitutionType[] = [
  "Government",
  "Government-Aided",
  "Autonomous",
  "Private",
  "Premier Institutes (IITs, NITs, AIIMS, NLU, etc.)"
];

const admissionModes: AdmissionMode[] = [
  "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
  "Management / Direct Quota"
];

const socialCategories: SocialCategory[] = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
  "Notified Minorities"
];

const minorityList: MinorityCommunity[] = [
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Buddhist",
  "Parsi"
];

const statesList = [
  "All-India / Other",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal"
];

const occupationalOptions: OccupationalBackground[] = [
  "None",
  "Children of Defense / CAPF personnel",
  "Wards of Martyrs",
  "Beedi / Mine / Construction workers",
  "Farmers / Agricultural workers"
];

const demoProfiles: { label: string; desc: string; profile: StudentProfile }[] = [
  {
    label: "Ananya Joshi (B.Tech - Govt College)",
    desc: "OBC · Female STEM · Govt Engineering College, Pune · Income ₹2.2L",
    profile: {
      name: "Ananya Joshi",
      email: "ananya.joshi@example.com",
      organization: "Government Engineering College, Pune (COEP Tech)",
      avatarInitials: "AJ",
      levelOfStudy: "Undergraduate",
      courseStream: "B.Tech",
      specialization: "Computer Science & Engineering",
      pastScoreType: "Percentage",
      pastScore: 84.5,
      institutionType: "Government",
      admissionMode: "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: 220000,
      incomeBracket: "<= ₹2.5L",
      socialCategory: "OBC",
      stateOfDomicile: "Maharashtra",
      gender: "Female",
      isSingleGirlChild: true,
      isPwD: false,
      disabilityPercentage: 0,
      occupationalBackground: "None",
      specialCircumstances: ["First-generation graduate"],
      aadhaarLinkedWithBankDBT: true,
      documentsReady: {
        incomeCertificate: true,
        categoryCertificate: true,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: "Undergraduate",
      field: "Computer Science",
      need: "High"
    }
  },
  {
    label: "Rahul Sharma (Class 12 to B.Sc - UP)",
    desc: "SC · Single Parent · Farmers / Rural Background · Income ₹1.2L",
    profile: {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      organization: "Chhatrapati Shahu Ji Maharaj University, Kanpur",
      avatarInitials: "RS",
      levelOfStudy: "Undergraduate",
      courseStream: "B.Sc",
      specialization: "General Sciences & Electronics",
      pastScoreType: "Percentage",
      pastScore: 78,
      institutionType: "Government-Aided",
      admissionMode: "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: 120000,
      incomeBracket: "<= ₹1.5L",
      socialCategory: "SC",
      stateOfDomicile: "Uttar Pradesh",
      gender: "Male",
      isSingleGirlChild: false,
      isPwD: false,
      disabilityPercentage: 0,
      occupationalBackground: "Farmers / Agricultural workers",
      specialCircumstances: ["Single parent", "First-generation graduate"],
      aadhaarLinkedWithBankDBT: true,
      documentsReady: {
        incomeCertificate: true,
        categoryCertificate: true,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: "Undergraduate",
      field: "Science",
      need: "High"
    }
  },
  {
    label: "Aman Khan (Postgraduate - Delhi)",
    desc: "Notified Minority (Muslim) · Premier Institute · Income ₹1.9L",
    profile: {
      name: "Aman Khan",
      email: "aman.khan@example.com",
      organization: "Jamia Millia Islamia, New Delhi",
      avatarInitials: "AK",
      levelOfStudy: "Postgraduate",
      courseStream: "M.Tech",
      specialization: "Data Science & Artificial Intelligence",
      pastScoreType: "CGPA",
      pastScore: 8.7,
      institutionType: "Premier Institutes (IITs, NITs, AIIMS, NLU, etc.)",
      admissionMode: "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: 190000,
      incomeBracket: "<= ₹2.5L",
      socialCategory: "Notified Minorities",
      minorityCommunity: "Muslim",
      stateOfDomicile: "Delhi",
      gender: "Male",
      isSingleGirlChild: false,
      isPwD: false,
      disabilityPercentage: 0,
      occupationalBackground: "None",
      specialCircumstances: ["First-generation graduate"],
      aadhaarLinkedWithBankDBT: true,
      documentsReady: {
        incomeCertificate: true,
        categoryCertificate: true,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: "Postgraduate",
      field: "Data Science",
      need: "High"
    }
  },
  {
    label: "Divya Nair (MBBS - PwD Benchmark)",
    desc: "General / EWS · PwD 45% · Premier Institute · Karnataka",
    profile: {
      name: "Divya Nair",
      email: "divya.nair@example.com",
      organization: "Bangalore Medical College & Research Institute",
      avatarInitials: "DN",
      levelOfStudy: "Undergraduate",
      courseStream: "M.B.B.S",
      specialization: "Medicine & Surgery",
      pastScoreType: "Percentage",
      pastScore: 89,
      institutionType: "Premier Institutes (IITs, NITs, AIIMS, NLU, etc.)",
      admissionMode: "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: 350000,
      incomeBracket: "<= ₹4.5L",
      socialCategory: "General",
      stateOfDomicile: "Karnataka",
      gender: "Female",
      isSingleGirlChild: false,
      isPwD: true,
      disabilityPercentage: 45,
      occupationalBackground: "None",
      specialCircumstances: [],
      aadhaarLinkedWithBankDBT: true,
      documentsReady: {
        incomeCertificate: true,
        categoryCertificate: false,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: "Undergraduate",
      field: "Science",
      need: "Medium"
    }
  }
];

export function ProfileManager({
  profile,
  onSaveProfile,
  onExplore
}: {
  profile: StudentProfile;
  onSaveProfile: (updated: StudentProfile) => void;
  onExplore: () => void;
}) {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [savedBanner, setSavedBanner] = useState(false);

  const calculateCompleteness = (p: StudentProfile) => {
    let score = 0;
    if (p.name?.trim()) score += 10;
    if (p.organization?.trim()) score += 15;
    if (p.levelOfStudy) score += 10;
    if (p.courseStream?.trim()) score += 10;
    if (p.pastScore > 0) score += 10;
    if (p.annualFamilyIncome > 0) score += 10;
    if (p.socialCategory) score += 10;
    if (p.stateOfDomicile) score += 10;
    if (p.aadhaarLinkedWithBankDBT) score += 10;
    const docs = Object.values(p.documentsReady || {}).filter(Boolean).length;
    score += Math.min(5, docs * 2);
    return Math.min(100, score);
  };

  const completeness = calculateCompleteness(formData);

  const handleUpdate = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => {
    const updated = { ...formData, [key]: value };
    // Maintain degree/field sync for backwards compatibility
    if (key === "levelOfStudy") {
      updated.degree = String(value);
    }
    if (key === "specialization") {
      updated.field = String(value);
    }
    setFormData(updated);
  };

  const handleDocumentToggle = (docKey: keyof StudentProfile["documentsReady"]) => {
    const updated = {
      ...formData,
      documentsReady: {
        ...formData.documentsReady,
        [docKey]: !formData.documentsReady[docKey]
      }
    };
    setFormData(updated);
  };

  const handleCircumstanceToggle = (item: string) => {
    const current = formData.specialCircumstances || [];
    const updated = current.includes(item)
      ? current.filter(x => x !== item)
      : [...current, item];
    handleUpdate("specialCircumstances", updated);
  };

  const save = () => {
    onSaveProfile(formData);
    // Persist in localStorage
    try {
      localStorage.setItem("grantly-student-profile", JSON.stringify(formData));
    } catch {
      // storage unavailable
    }
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const loadPreset = (p: StudentProfile) => {
    setFormData(p);
    onSaveProfile(p);
    try {
      localStorage.setItem("grantly-student-profile", JSON.stringify(p));
    } catch {
      // storage unavailable
    }
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Summary & Completeness Card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b1772] via-[#5d2ba8] to-[#874eed] p-6 text-white shadow-soft sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/20 text-2xl font-black text-white shadow-inner sm:h-20 sm:w-20 sm:text-3xl">
              {formData.avatarInitials || (formData.name ? formData.name.substring(0, 2).toUpperCase() : "ST")}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <Sparkles size={13} /> VERIFIED STUDENT PROFILE
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                {formData.name || "Student Profile"}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/80 sm:text-sm">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Building2 size={15} /> {formData.organization || "Add your college / university"}
                </span>
                <span>•</span>
                <span>{formData.courseStream || "Degree"}</span>
                <span>•</span>
                <span>{formData.stateOfDomicile || "State"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:w-72">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>PROFILE COMPLETENESS</span>
              <span className="text-sm font-extrabold text-amber-300">{completeness}%</span>
            </div>
            <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-black/25">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${completeness}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="mt-2 text-[11px] text-white/75">
              {completeness >= 90
                ? "Excellent! All national and state portal match criteria ready."
                : "Complete all sections to unlock 100% matched government & CSR grants."}
            </p>
          </div>
        </div>

        {/* Preset Quick Load Bar */}
        <div className="mt-6 border-t border-white/15 pt-5">
          <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-white/70">
            Quick-Load Test Profiles (Indian Scholarship Scenarios):
          </p>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {demoProfiles.map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => loadPreset(item.profile)}
                className="rounded-xl border border-white/20 bg-white/10 p-2.5 text-left transition hover:bg-white/20 hover:shadow-sm"
              >
                <div className="text-xs font-bold text-white">{item.label}</div>
                <div className="mt-0.5 truncate text-[11px] text-white/70">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Save Notification Banner */}
      {savedBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-2xl bg-emerald-500/15 border border-emerald-500/30 px-5 py-3.5 text-sm font-semibold text-emerald-800"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            Profile details updated successfully! Matching scholarships refreshed.
          </span>
          <button
            type="button"
            onClick={onExplore}
            className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white transition hover:bg-emerald-700"
          >
            View Matches <ChevronRight size={14} />
          </button>
        </motion.div>
      )}

      {/* Basic Student & Institution Information */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-[#f0ecf5] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#271b36]">Student Identity & Organization</h3>
              <p className="text-xs text-[#8c8299]">Your name and enrolled institution/university</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">FULL NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleUpdate("name", e.target.value)}
              placeholder="e.g. Ananya Joshi"
              className="field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">EMAIL ADDRESS</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleUpdate("email", e.target.value)}
              placeholder="student@example.com"
              className="field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              ORGANIZATION / INSTITUTION NAME
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={e => handleUpdate("organization", e.target.value)}
              placeholder="e.g. COEP Tech University / IIT Bombay / Delhi University"
              className="field"
            />
            <span className="mt-1 block text-[10px] text-[#9b92a6]">
              Your college or school where currently enrolled
            </span>
          </div>
        </div>
      </section>

      {/* 1. Academic Details */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-[#f0ecf5] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-700">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#271b36]">1. Academic Details</h3>
              <p className="text-xs text-[#8c8299]">
                Course level, marks, institution accreditation & counseling admission mode
              </p>
            </div>
          </div>
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
            Mandatory for NSP & AICTE
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              CURRENT EDUCATIONAL STATUS
            </label>
            <select
              value={formData.levelOfStudy}
              onChange={e => handleUpdate("levelOfStudy", e.target.value as LevelOfStudy)}
              className="field"
            >
              {studyLevels.map(lvl => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              COURSE & STREAM
            </label>
            <input
              type="text"
              value={formData.courseStream}
              onChange={e => handleUpdate("courseStream", e.target.value)}
              placeholder="e.g. B.Tech, M.B.B.S, B.Sc, B.Com, MBA, Class 12"
              className="field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              SPECIALISATION / BRANCH
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={e => handleUpdate("specialization", e.target.value)}
              placeholder="e.g. Computer Science, AI, Mechanical, Finance"
              className="field"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              PAST ACADEMIC SCORES
            </label>
            <div className="flex gap-2">
              <select
                value={formData.pastScoreType}
                onChange={e => handleUpdate("pastScoreType", e.target.value as "Percentage" | "CGPA")}
                className="field w-32 shrink-0"
              >
                <option value="Percentage">% Marks</option>
                <option value="CGPA">CGPA (10)</option>
              </select>
              <input
                type="number"
                step="0.1"
                min="0"
                max={formData.pastScoreType === "CGPA" ? "10" : "100"}
                value={formData.pastScore}
                onChange={e => handleUpdate("pastScore", parseFloat(e.target.value) || 0)}
                placeholder={formData.pastScoreType === "CGPA" ? "e.g. 8.5" : "e.g. 84.5"}
                className="field flex-1"
              />
            </div>
            <span className="mt-1 block text-[10px] text-[#9b92a6]">
              Class 10th, 12th, or recent semester GPA (Cutoffs: ≥ 50%, ≥ 60%, ≥ 80%)
            </span>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              INSTITUTION TYPE
            </label>
            <select
              value={formData.institutionType}
              onChange={e => handleUpdate("institutionType", e.target.value as InstitutionType)}
              className="field"
            >
              {institutionTypes.map(it => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              ADMISSION MODE
            </label>
            <select
              value={formData.admissionMode}
              onChange={e => handleUpdate("admissionMode", e.target.value as AdmissionMode)}
              className="field"
            >
              {admissionModes.map(am => (
                <option key={am} value={am}>
                  {am}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[10px] text-[#9b92a6]">
              Central/State entrance counseling (JEE/NEET/State CET) vs Management quota
            </span>
          </div>
        </div>
      </section>

      {/* 2. Socio-Economic Details */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-[#f0ecf5] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <IndianRupee size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#271b36]">2. Socio-Economic Details</h3>
              <p className="text-xs text-[#8c8299]">
                Annual parental income limit, social reservation & residential domicile state
              </p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            Income Verified
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              GROSS ANNUAL FAMILY INCOME (INR)
            </label>
            <input
              type="number"
              step="10000"
              min="0"
              value={formData.annualFamilyIncome}
              onChange={e => {
                const inc = Math.max(0, parseInt(e.target.value) || 0);
                let bracket: StudentProfile["incomeBracket"] = "> ₹8L";
                if (inc <= 150000) bracket = "<= ₹1.5L";
                else if (inc <= 250000) bracket = "<= ₹2.5L";
                else if (inc <= 450000) bracket = "<= ₹4.5L";
                else if (inc <= 600000) bracket = "<= ₹6L";
                else if (inc <= 800000) bracket = "<= ₹8L";

                setFormData(prev => ({
                  ...prev,
                  annualFamilyIncome: inc,
                  incomeBracket: bracket,
                  need: inc <= 250000 ? "High" : inc <= 600000 ? "Medium" : "Low"
                }));
              }}
              className="field"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[
                { label: "≤ ₹1.5L", val: 140000 },
                { label: "≤ ₹2.5L", val: 240000 },
                { label: "≤ ₹4.5L", val: 400000 },
                { label: "≤ ₹6.0L", val: 550000 },
                { label: "≤ ₹8.0L", val: 750000 }
              ].map(b => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => {
                    handleUpdate("annualFamilyIncome", b.val);
                  }}
                  className={`rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
                    formData.annualFamilyIncome <= b.val && formData.annualFamilyIncome > b.val - 120000
                      ? "bg-emerald-700 text-white"
                      : "bg-[#f1edf7] text-[#6d637b] hover:bg-[#e7e1f0]"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              SOCIAL CATEGORY
            </label>
            <select
              value={formData.socialCategory}
              onChange={e => handleUpdate("socialCategory", e.target.value as SocialCategory)}
              className="field"
            >
              {socialCategories.map(sc => (
                <option key={sc} value={sc}>
                  {sc}
                </option>
              ))}
            </select>
            {formData.socialCategory === "Notified Minorities" && (
              <div className="mt-2.5">
                <label className="mb-1 block text-[11px] font-bold text-brand-700">
                  NOTIFIED MINORITY COMMUNITY
                </label>
                <select
                  value={formData.minorityCommunity || "Muslim"}
                  onChange={e => handleUpdate("minorityCommunity", e.target.value as MinorityCommunity)}
                  className="field !text-xs !py-1.5"
                >
                  {minorityList.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-[#62586f]">
              STATE OF DOMICILE
            </label>
            <select
              value={formData.stateOfDomicile}
              onChange={e => handleUpdate("stateOfDomicile", e.target.value)}
              className="field"
            >
              {statesList.map(st => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[10px] text-[#9b92a6]">
              Permanent residential state (Vital for State Post-Matric & CM schemes)
            </span>
          </div>
        </div>
      </section>

      {/* 3. Special Category / Background Status */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-[#f0ecf5] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-pink-700">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#271b36]">
                3. Special Category & Heritage Background
              </h3>
              <p className="text-xs text-[#8c8299]">
                Gender priority, benchmark disability (PwD ≥ 40%), defense/worker background & circumstances
              </p>
            </div>
          </div>
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-800">
            Dedicated Grants
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Gender & Single Girl Child */}
          <div className="space-y-3 rounded-2xl bg-[#fbf9fe] p-4 border border-[#eee9f5]">
            <label className="block text-xs font-bold text-[#62586f]">GENDER</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Female", "Male", "Other"] as const).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleUpdate("gender", g)}
                  className={`rounded-xl py-2 text-xs font-bold transition ${
                    formData.gender === g
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-white text-[#655b72] border border-[#e8e2f2] hover:bg-brand-50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <label className="mt-3 flex cursor-pointer items-center gap-3 pt-2">
              <input
                type="checkbox"
                checked={formData.isSingleGirlChild}
                onChange={e => handleUpdate("isSingleGirlChild", e.target.checked)}
                className="h-4 w-4 rounded accent-brand-600"
              />
              <span className="text-xs font-semibold text-[#483d57]">
                Single Girl Child (Unlocks AICTE Pragati & CBSE grants)
              </span>
            </label>
          </div>

          {/* Person with Benchmark Disability (PwD) */}
          <div className="space-y-3 rounded-2xl bg-[#fbf9fe] p-4 border border-[#eee9f5]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#62586f]">PERSON WITH DISABILITY (PwD)</label>
              <input
                type="checkbox"
                checked={formData.isPwD}
                onChange={e => handleUpdate("isPwD", e.target.checked)}
                className="h-4 w-4 rounded accent-brand-600"
              />
            </div>

            {formData.isPwD ? (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold text-[#62586f]">
                  <span>Disability Percentage:</span>
                  <span className="font-bold text-brand-700">{formData.disabilityPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={formData.disabilityPercentage || 40}
                  onChange={e => handleUpdate("disabilityPercentage", parseInt(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <span className="block text-[11px] text-emerald-700">
                  ✓ Meets government benchmark disability requirement (≥ 40% with UDID)
                </span>
              </div>
            ) : (
              <p className="text-xs text-[#9c93a8] pt-2">
                Enable to verify benchmark disability (≥ 40%) for DEPwD central scholarships.
              </p>
            )}
          </div>

          {/* Occupational / Heritage Background */}
          <div className="space-y-3 rounded-2xl bg-[#fbf9fe] p-4 border border-[#eee9f5]">
            <label className="block text-xs font-bold text-[#62586f]">
              OCCUPATIONAL / HERITAGE BACKGROUND
            </label>
            <select
              value={formData.occupationalBackground}
              onChange={e => handleUpdate("occupationalBackground", e.target.value as OccupationalBackground)}
              className="field"
            >
              {occupationalOptions.map(op => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <span className="block text-[10px] text-[#9b92a6]">
              Covers PMSS Defense/CAPF wards, Ministry of Labour Beedi/Mine worker schemes & Kisan quotas
            </span>
          </div>

          {/* Special Circumstances */}
          <div className="col-span-full rounded-2xl bg-[#fbf9fe] p-4 border border-[#eee9f5]">
            <label className="mb-2.5 block text-xs font-bold text-[#62586f]">
              SPECIAL CIRCUMSTANCES / FIRST GENERATION
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: "First-generation graduate", label: "First-Generation College Graduate" },
                { id: "Single parent", label: "Raised by Single Parent" },
                { id: "Orphan status", label: "Orphan / Ward of State" }
              ].map(item => (
                <label key={item.id} className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#483d57]">
                  <input
                    type="checkbox"
                    checked={formData.specialCircumstances?.includes(item.id)}
                    onChange={() => handleCircumstanceToggle(item.id)}
                    className="h-4 w-4 rounded accent-brand-600"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Essential Application Prerequisites */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between border-b border-[#f0ecf5] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
              <FileCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#271b36]">
                4. Essential Application Prerequisites
              </h3>
              <p className="text-xs text-[#8c8299]">
                Aadhaar-Bank DBT linking & statutory certificates required before submission
              </p>
            </div>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
            Mandatory for DBT
          </span>
        </div>

        {/* Aadhaar DBT Linking Warning / Status */}
        <div className={`mb-6 rounded-2xl p-4.5 border transition ${
          formData.aadhaarLinkedWithBankDBT
            ? "border-emerald-200 bg-emerald-50/70"
            : "border-amber-200 bg-amber-50/70"
        }`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              {formData.aadhaarLinkedWithBankDBT ? (
                <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={22} className="text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-sm font-bold text-[#2b213b]">
                  Aadhaar Seeded & Linked with Active Bank Account (DBT Enabled)
                </h4>
                <p className="mt-1 text-xs leading-5 text-[#6c617b]">
                  Under National Scholarship Portal (NSP) guidelines, all scholarship disbursements are made exclusively via Direct Benefit Transfer (DBT) to the student’s Aadhaar-seeded NPCI bank account.
                </p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center shrink-0">
              <input
                type="checkbox"
                checked={formData.aadhaarLinkedWithBankDBT}
                onChange={e => handleUpdate("aadhaarLinkedWithBankDBT", e.target.checked)}
                className="sr-only peer"
              />
              <div className="h-6 w-11 rounded-full bg-gray-200 peer-focus:outline-none peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>

        {/* Valid Documents Checklist */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#6a5e78]">
            Valid Documents Checklist:
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                id: "incomeCertificate" as const,
                title: "Government-issued Income Certificate",
                desc: "Issued by competent authority (Tehsildar/SDM/Revenue Officer) for current financial year"
              },
              {
                id: "categoryCertificate" as const,
                title: "Community / Category Certificate",
                desc: "Caste Certificate & Caste Validity (for SC, ST, OBC, EWS or Minority self-declaration)"
              },
              {
                id: "bonafideOrFeeReceipt" as const,
                title: "Bonafide Student Certificate / Fee Receipt",
                desc: "Official letter from College Dean/Principal with current year enrollment & tuition receipt"
              },
              {
                id: "pastMarksheets" as const,
                title: "Past Marksheets & Transcripts",
                desc: "Verified Class 10th, 12th, or recent semester grade cards showing percentage / CGPA"
              }
            ].map(doc => {
              const ready = !!formData.documentsReady?.[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => handleDocumentToggle(doc.id)}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                    ready
                      ? "border-emerald-300 bg-emerald-50/50"
                      : "border-[#e7e1f0] bg-white hover:bg-[#faf8fd]"
                  }`}
                >
                  <div className={`mt-0.5 grid h-5 w-5 place-items-center rounded-md border ${
                    ready ? "border-emerald-600 bg-emerald-600 text-white" : "border-[#ccc5d6] bg-white"
                  }`}>
                    {ready && <CheckCircle2 size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold ${ready ? "text-emerald-900" : "text-[#2e233d]"}`}>
                      {doc.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-[#8b8198]">{doc.desc}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    ready ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                  }`}>
                    {ready ? "Ready" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-5 border border-[#eee9f5] shadow-sm">
        <div>
          <p className="text-sm font-bold text-[#2a1e3a]">Ready to find your eligible scholarships?</p>
          <p className="text-xs text-[#8c8299]">
            Your profile criteria will be matched against all central, state, and corporate schemes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={save}
            className="flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-5 py-3 text-xs font-bold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            <Save size={15} /> Save Profile Changes
          </button>
          <button
            type="button"
            onClick={() => {
              save();
              onExplore();
            }}
            className="btn-primary !py-3 !px-6"
          >
            Explore Matched Scholarships <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
