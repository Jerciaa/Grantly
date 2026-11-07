"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  Mail,
  Lock,
  Building2,
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import type { StudentProfile } from "@/types/scholarship";

type Mode = "login" | "register" | "forgot";

const demoUsers = [
  {
    name: "Ananya Joshi",
    email: "ananya.joshi@example.com",
    organization: "Government Engineering College, Pune (COEP Tech)",
    role: "B.Tech Student (OBC / Female STEM)"
  },
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    organization: "CSJM University, Kanpur",
    role: "B.Sc Scholar (SC / Rural Background)"
  },
  {
    name: "Aman Khan",
    email: "aman.khan@example.com",
    organization: "Jamia Millia Islamia, New Delhi",
    role: "M.Tech Scholar (Minority / Premier)"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleDemoSignIn = (demo: typeof demoUsers[0]) => {
    sessionStorage.setItem("grantly-demo-session", "active");

    // Load or create stored profile
    let existingProfile: Partial<StudentProfile> = {};
    try {
      const stored = localStorage.getItem("grantly-student-profile");
      if (stored) existingProfile = JSON.parse(stored);
    } catch {}

    const updatedProfile: StudentProfile = {
      name: demo.name,
      email: demo.email,
      organization: demo.organization,
      avatarInitials: demo.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase(),
      levelOfStudy: existingProfile.levelOfStudy || "Undergraduate",
      courseStream: existingProfile.courseStream || "B.Tech",
      specialization: existingProfile.specialization || "Computer Science",
      pastScoreType: existingProfile.pastScoreType || "Percentage",
      pastScore: existingProfile.pastScore || 82,
      institutionType: existingProfile.institutionType || "Government",
      admissionMode:
        existingProfile.admissionMode ||
        "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: existingProfile.annualFamilyIncome || 220000,
      incomeBracket: existingProfile.incomeBracket || "<= ₹2.5L",
      socialCategory: existingProfile.socialCategory || "OBC",
      stateOfDomicile: existingProfile.stateOfDomicile || "Maharashtra",
      gender: existingProfile.gender || "Female",
      isSingleGirlChild: existingProfile.isSingleGirlChild ?? true,
      isPwD: existingProfile.isPwD ?? false,
      disabilityPercentage: existingProfile.disabilityPercentage || 0,
      occupationalBackground: existingProfile.occupationalBackground || "None",
      specialCircumstances: existingProfile.specialCircumstances || ["First-generation graduate"],
      aadhaarLinkedWithBankDBT: existingProfile.aadhaarLinkedWithBankDBT ?? true,
      documentsReady: existingProfile.documentsReady || {
        incomeCertificate: true,
        categoryCertificate: true,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: "Undergraduate",
      field: "Computer Science",
      need: "High"
    };

    localStorage.setItem("grantly-student-profile", JSON.stringify(updatedProfile));
    router.replace("/");
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mode === "forgot") {
      setMessage("Password reset instructions have been sent to your registered email (demo mode).");
      return;
    }
    if (mode === "register") {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (!organization.trim()) {
        setError("Please enter your college, school or university name.");
        return;
      }
    }
    if (password.length < 6) {
      setError("Please enter a password with at least 6 characters.");
      return;
    }

    // Authenticate session
    sessionStorage.setItem("grantly-demo-session", "active");

    let currentProfile: Partial<StudentProfile> = {};
    try {
      const stored = localStorage.getItem("grantly-student-profile");
      if (stored) currentProfile = JSON.parse(stored);
    } catch {}

    const resolvedName = name.trim() || currentProfile.name || email.split("@")[0];
    const resolvedOrg =
      organization.trim() ||
      currentProfile.organization ||
      "Government Engineering College";

    const updatedProfile: StudentProfile = {
      name: resolvedName,
      email: email.trim(),
      organization: resolvedOrg,
      avatarInitials: resolvedName
        .split(" ")
        .map(n => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase(),
      levelOfStudy: currentProfile.levelOfStudy || "Undergraduate",
      courseStream: currentProfile.courseStream || "B.Tech",
      specialization: currentProfile.specialization || "Computer Science & Engineering",
      pastScoreType: currentProfile.pastScoreType || "Percentage",
      pastScore: currentProfile.pastScore || 80,
      institutionType: currentProfile.institutionType || "Government",
      admissionMode:
        currentProfile.admissionMode ||
        "Merit-based allotment (Central/State Counseling e.g. JEE, NEET, TNEA)",
      annualFamilyIncome: currentProfile.annualFamilyIncome || 240000,
      incomeBracket: currentProfile.incomeBracket || "<= ₹2.5L",
      socialCategory: currentProfile.socialCategory || "General",
      stateOfDomicile: currentProfile.stateOfDomicile || "Maharashtra",
      gender: currentProfile.gender || "Female",
      isSingleGirlChild: currentProfile.isSingleGirlChild ?? false,
      isPwD: currentProfile.isPwD ?? false,
      disabilityPercentage: currentProfile.disabilityPercentage || 0,
      occupationalBackground: currentProfile.occupationalBackground || "None",
      specialCircumstances: currentProfile.specialCircumstances || ["First-generation graduate"],
      aadhaarLinkedWithBankDBT: currentProfile.aadhaarLinkedWithBankDBT ?? true,
      documentsReady: currentProfile.documentsReady || {
        incomeCertificate: true,
        categoryCertificate: true,
        bonafideOrFeeReceipt: true,
        pastMarksheets: true
      },
      degree: currentProfile.degree || "Undergraduate",
      field: currentProfile.field || "Computer Science",
      need: currentProfile.need || "High"
    };

    localStorage.setItem("grantly-student-profile", JSON.stringify(updatedProfile));
    router.replace("/");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5fc] px-4 py-8">
      {/* Background blurs */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-purple-200/50 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-[0_30px_100px_rgba(75,35,130,.12)] lg:grid-cols-2">
        {/* Left Hero Pane */}
        <section className="relative hidden min-h-[660px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#301166] via-[#5c28ad] to-[#8d5be5] p-10 text-white lg:flex">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border-[40px] border-white/10" />

          <div className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
              <GraduationCap size={28} />
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">
                GRANTLY<span className="text-purple-300">.</span>
              </p>
              <p className="text-[10px] uppercase tracking-[.24em] text-white/70">
                India Scholarship Engine
              </p>
            </div>
          </div>

          <div className="relative max-w-md">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold">
              <Sparkles size={14} className="text-amber-300" /> CENTRAL · STATE · CORPORATE GRANTS
            </div>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl">
              Match every scholarship you qualify for.
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Personalize by educational status, family income cap, social category, domicile state,
              and DBT prerequisites across NSP and state portals.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold text-white/90">
              <span className="rounded-full bg-white/15 px-3 py-1">✓ NSP Central Schemes</span>
              <span className="rounded-full bg-white/15 px-3 py-1">✓ State Portals (MahaDBT, SSP)</span>
              <span className="rounded-full bg-white/15 px-3 py-1">✓ Reliance, Tata & HDFC Grants</span>
            </div>
          </div>

          <p className="relative text-xs text-white/60">
            Secure paired authentication · Instant matching with verified Indian schemes.
          </p>
        </section>

        {/* Right Form Pane */}
        <section className="flex min-h-[660px] flex-col justify-center px-6 py-10 sm:px-12 lg:px-12">
          {/* Mobile Logo */}
          <div className="mb-7 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-xl font-black text-[#261a38]">
                GRANTLY<span className="text-brand-600">.</span>
              </p>
              <p className="text-[10px] uppercase tracking-[.18em] text-[#9b93a8]">
                India Scholarship Portal
              </p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-brand-600">
              {mode === "login"
                ? "STUDENT SIGN IN"
                : mode === "register"
                ? "NEW STUDENT REGISTRATION"
                : "RESET PASSWORD"}
            </p>
            <h2 className="text-2xl font-black tracking-tight text-[#261b35] sm:text-3xl">
              {mode === "login"
                ? "Sign in to your workspace"
                : mode === "register"
                ? "Create student profile"
                : "Recover your account"}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#8b8298]">
              {mode === "login"
                ? "Access your shortlisted opportunities and live match scorecard."
                : mode === "register"
                ? "Enter your details and enrolled organization to begin."
                : "Enter your registered email to receive a password reset link."}
            </p>
          </div>

          {/* Quick Demo Sign In Bar */}
          {mode === "login" && (
            <div className="mb-5 rounded-2xl bg-[#faf8ff] p-3 border border-[#ece6f6]">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                1-Click Quick Demo Sign-In (Select Scenario):
              </p>
              <div className="grid gap-1.5 sm:grid-cols-3">
                {demoUsers.map(u => (
                  <button
                    key={u.name}
                    type="button"
                    onClick={() => handleDemoSignIn(u)}
                    className="rounded-xl border border-brand-200 bg-white p-2 text-left transition hover:bg-brand-50 hover:border-brand-400"
                  >
                    <div className="text-xs font-bold text-[#2d213f]">{u.name.split(" ")[0]}</div>
                    <div className="truncate text-[10px] text-[#867b93]">{u.role.split("(")[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-3.5">
            {mode === "register" && (
              <>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-[#62586f]">FULL NAME</span>
                  <span className="relative block">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a49bac]" />
                    <input
                      className="field pl-9"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Ananya Joshi"
                      autoComplete="name"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-[#62586f]">
                    ORGANIZATION / COLLEGE NAME
                  </span>
                  <span className="relative block">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a49bac]" />
                    <input
                      className="field pl-9"
                      value={organization}
                      onChange={e => setOrganization(e.target.value)}
                      placeholder="e.g. Government Engineering College, Pune"
                    />
                  </span>
                </label>
              </>
            )}

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-[#62586f]">EMAIL ADDRESS</span>
              <span className="relative block">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a49bac]" />
                <input
                  className="field pl-9"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  autoComplete="email"
                />
              </span>
            </label>

            {mode !== "forgot" && (
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-[#62586f]">PASSWORD</span>
                <span className="relative block">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a49bac]" />
                  <input
                    className="field pl-9 pr-11"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8f869c] hover:text-brand-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </label>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setError("");
                    setMessage("");
                  }}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-900"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-800">
                {message}
              </p>
            )}

            <button type="submit" className="btn-primary w-full !py-3.5 mt-2">
              <span>{mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Send Reset Link"}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center text-xs text-[#8b8298]">
            {mode === "login" ? (
              <>
                New student?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setMessage("");
                  }}
                  className="font-bold text-brand-700 hover:text-brand-900"
                >
                  Create an account
                </button>
              </>
            ) : mode === "register" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setMessage("");
                  }}
                  className="font-bold text-brand-700"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setMessage("");
                  }}
                  className="font-bold text-brand-700"
                >
                  Back to sign in
                </button>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-[10px] text-[#aaa2b5]">
            GRANTLY India Platform · Student verification and matching workspace
          </p>
        </section>
      </div>
    </main>
  );
}
