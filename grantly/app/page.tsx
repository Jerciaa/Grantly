"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  ArrowUpRight,
  Bookmark,
  GraduationCap,
  Wallet,
  Clock3,
  SlidersHorizontal,
  X,
  UserCheck,
  Building2,
  LogOut,
  ChevronDown,
  Filter,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ExternalLink
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { PersonaCanvas } from "@/components/PersonaCanvas";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { ScholarshipDrawer } from "@/components/ScholarshipDrawer";
import { ApplicationTracker, type TrackerState } from "@/components/ApplicationTracker";
import { FinancialImpact } from "@/components/FinancialImpact";
import { ProfileManager } from "@/components/ProfileManager";
import { scholarships } from "@/data/scholarships";
import { calculateMatch, formatINR } from "@/lib/matching";
import type { Scholarship, StudentProfile, PortalType, LevelOfStudy } from "@/types/scholarship";

const defaultProfile: StudentProfile = {
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
};

export default function Home() {
  const [authReady, setAuthReady] = useState(false);
  const [active, setActive] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [saved, setSaved] = useState<string[]>(["nsp-csss", "aicte-pragati"]);
  const [selected, setSelected] = useState<Scholarship | null>(null);
  const [tracker, setTracker] = useState<TrackerState>({
    "nsp-csss": [true, true, true, false, false],
    "aicte-pragati": [true, true, false, false, false]
  });
  const [tuition, setTuition] = useState(120000);
  const [impactSelected, setImpactSelected] = useState<string[]>(["nsp-csss", "aicte-pragati"]);

  // Search & Filter State
  const [query, setQuery] = useState("");
  const [portalFilter, setPortalFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [sortBy, setSortBy] = useState<"match" | "amount" | "deadline">("match");

  // Header quick search, notifications, & user menu states
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [bellMenuOpen, setBellMenuOpen] = useState(false);
  const headerSearchInputRef = useRef<HTMLInputElement>(null);

  // Load auth & profile
  useEffect(() => {
    const signedIn = sessionStorage.getItem("grantly-demo-session") === "active";
    if (!signedIn) {
      window.location.replace("/login");
      return;
    }

    try {
      const savedProfile = localStorage.getItem("grantly-student-profile");
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch {}

    setAuthReady(true);
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        headerSearchInputRef.current?.focus();
        setHeaderSearchOpen(true);
      }
      if (e.key === "Escape") {
        setHeaderSearchOpen(false);
        setUserMenuOpen(false);
        setBellMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("grantly-demo-session");
    window.location.replace("/login");
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem("grantly-student-profile", JSON.stringify(updated));
    } catch {}
  };

  // Rank scholarships using matching engine
  const ranked = useMemo(
    () =>
      scholarships
        .map(s => ({ ...s, match: calculateMatch(s, profile) }))
        .sort((a, b) => {
          if (sortBy === "amount") return b.amount - a.amount;
          if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          return b.match - a.match;
        }),
    [profile, sortBy]
  );

  // Discovery Filter
  const visible = useMemo(() => {
    return ranked.filter(s => {
      // Level of study filter
      if (levelFilter !== "All" && !s.degree.some(d => d.toLowerCase().includes(levelFilter.toLowerCase()))) {
        return false;
      }
      // Portal type filter
      if (portalFilter !== "All" && s.portalType !== portalFilter) {
        return false;
      }
      // Only eligible filter
      if (onlyEligible && s.match < 60) {
        return false;
      }
      // Search query
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchOrg = s.organization.toLowerCase().includes(q);
      const matchPortal = s.portalType.toLowerCase().includes(q);
      const matchLocation = s.location.toLowerCase().includes(q);
      const matchFields = s.fields.some(f => f.toLowerCase().includes(q));
      const matchCourses = s.courses?.some(c => c.toLowerCase().includes(q)) ?? false;
      const matchDesc = s.description.toLowerCase().includes(q);
      return matchTitle || matchOrg || matchPortal || matchLocation || matchFields || matchCourses || matchDesc;
    });
  }, [ranked, query, levelFilter, portalFilter, onlyEligible]);

  // Header quick search matches
  const quickSearchMatches = useMemo(() => {
    if (!headerSearchQuery.trim()) return [];
    const q = headerSearchQuery.toLowerCase();
    return ranked.filter(
      s =>
        s.title.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.portalType.toLowerCase().includes(q) ||
        s.fields.some(f => f.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [ranked, headerSearchQuery]);

  const savedItems = ranked.filter(s => saved.includes(s.id));
  const trackedCount = Object.keys(tracker).length;
  const totalPotential = scholarships.filter(s => saved.includes(s.id)).reduce((a, s) => a + s.amount, 0);

  const toggleSave = (id: string) =>
    setSaved(curr => (curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]));

  const startTracking = (item: Scholarship) => {
    setTracker(curr => ({
      ...curr,
      [item.id]: curr[item.id] ?? [true, false, false, false, false]
    }));
    setSelected(null);
    setActive("tracker");
  };

  const goDiscover = (initialQuery?: string) => {
    if (initialQuery !== undefined) setQuery(initialQuery);
    setActive("discover");
    setHeaderSearchOpen(false);
    setTimeout(() => {
      document.getElementById("discovery-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const titleMap: Record<string, string> = {
    overview: "Scholarship Workspace",
    profile: "Student Profile & Personalization",
    discover: "Discover Indian Scholarships",
    saved: "Saved Shortlist",
    tracker: "Application Tracker & Milestones",
    impact: "Financial Impact & Tuition Coverage"
  };

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7fc]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          <p className="text-xs font-bold text-[#8f859d]">Loading your GRANTLY workspace...</p>
        </div>
      </div>
    );
  }

  const userInitials =
    profile.avatarInitials ||
    (profile.name
      ? profile.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "AJ");

  return (
    <div className="min-h-screen lg:flex bg-[#f8f7fc]">
      {/* Sidebar with working logout and active profile */}
      <Sidebar
        active={active}
        onNavigate={setActive}
        open={mobileNav}
        onClose={() => setMobileNav(false)}
        onLogout={handleLogout}
        profile={profile}
      />

      <main className="min-w-0 flex-1">
        {/* Top Header - Clearly styled, high-contrast, fully visible */}
        <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between border-b border-[#e5dfef] bg-white px-3 sm:px-6 lg:px-9 shadow-xs">
          {/* Left Title & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNav(true)}
              className="rounded-xl border border-[#e0d9ec] bg-white p-2 text-[#564966] lg:hidden hover:bg-[#f6f3fa] transition shadow-2xs"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-[11px] font-semibold text-[#8f859d]">
                Workspace / <span className="font-bold text-brand-700">{titleMap[active]}</span>
              </p>
              <h1 className="mt-0.5 text-base sm:text-lg font-black text-[#241934]">
                {titleMap[active]}
              </h1>
            </div>
          </div>

          {/* Right Header Controls: Search bar, Bell icon, Profile pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 1. Global "Search your workspace" Bar */}
            <div className="relative">
              <div className="flex items-center gap-2 rounded-xl border border-[#d6cde3] bg-[#faf9fd] px-3 py-2 text-xs text-[#4c405a] shadow-xs focus-within:border-brand-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100 transition">
                <Search size={15} className="text-brand-600 shrink-0" />
                <input
                  ref={headerSearchInputRef}
                  type="text"
                  value={headerSearchQuery}
                  onChange={e => {
                    setHeaderSearchQuery(e.target.value);
                    setHeaderSearchOpen(true);
                  }}
                  onFocus={() => setHeaderSearchOpen(true)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && headerSearchQuery.trim()) {
                      goDiscover(headerSearchQuery);
                    }
                  }}
                  placeholder="Search your workspace..."
                  className="w-28 sm:w-52 md:w-64 bg-transparent text-xs font-semibold text-[#251935] placeholder-[#9c91a8] focus:outline-none"
                />
                {headerSearchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setHeaderSearchQuery("");
                      setHeaderSearchOpen(false);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center rounded border border-[#ded5ea] bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#7a6f87] shadow-2xs">
                    ⌘ K
                  </kbd>
                )}
              </div>

              {/* Instant Search Results Dropdown */}
              <AnimatePresence>
                {headerSearchOpen && headerSearchQuery.trim().length > 0 && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setHeaderSearchOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-[#eee9f5] bg-white p-3 shadow-xl z-50"
                    >
                      <div className="mb-2 flex items-center justify-between px-2 text-[11px] font-bold text-[#8e839c]">
                        <span>SEARCH RESULTS ({quickSearchMatches.length})</span>
                        <button
                          type="button"
                          onClick={() => goDiscover(headerSearchQuery)}
                          className="text-brand-700 hover:underline"
                        >
                          View all in Discover →
                        </button>
                      </div>

                      {quickSearchMatches.length > 0 ? (
                        <div className="space-y-1.5">
                          {quickSearchMatches.map(item => (
                            <div
                              key={item.id}
                              onClick={() => {
                                setSelected(item);
                                setHeaderSearchOpen(false);
                              }}
                              className="cursor-pointer rounded-xl p-2.5 transition hover:bg-[#faf8fd] border border-transparent hover:border-[#eeeaf5]"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-xs font-bold text-[#2d213e]">
                                    {item.title}
                                  </p>
                                  <p className="truncate text-[10px] text-[#8b8198]">
                                    {item.organization} · {item.portalType}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                                    {item.match}%
                                  </span>
                                  <p className="text-[10px] font-extrabold text-emerald-700 mt-0.5">
                                    {formatINR(item.amount)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-[#9c93a8]">
                          No scholarships match “{headerSearchQuery}”
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => goDiscover(headerSearchQuery)}
                        className="mt-2 w-full rounded-xl bg-brand-50 py-2 text-center text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                      >
                        Search & Filter “{headerSearchQuery}” in Discover
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Bell Icon & Interactive Reminders Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setBellMenuOpen(prev => !prev);
                  setUserMenuOpen(false);
                  setHeaderSearchOpen(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6cde3] bg-white text-[#554966] shadow-xs transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                aria-label="View notifications and reminders"
                title="Application Reminders & Alerts"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-600 ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {bellMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setBellMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 4 }}
                      className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-[#eee9f5] bg-white p-4 shadow-xl z-50"
                    >
                      <div className="mb-3 flex items-center justify-between border-b border-[#f1edf6] pb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#342747]">
                          Notifications & Reminders
                        </span>
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-extrabold text-brand-700">
                          3 Alerts
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div
                          onClick={() => {
                            setActive("profile");
                            setBellMenuOpen(false);
                          }}
                          className="cursor-pointer rounded-xl bg-amber-50/80 p-3 border border-amber-200 transition hover:bg-amber-100/60"
                        >
                          <p className="font-bold text-amber-900">Aadhaar-DBT Verification Needed</p>
                          <p className="text-[11px] text-amber-800 mt-0.5 leading-4">
                            Central & State schemes disburse via DBT only. Confirm your bank account is seeded with NPCI.
                          </p>
                        </div>

                        <div
                          onClick={() => {
                            setActive("tracker");
                            setBellMenuOpen(false);
                          }}
                          className="cursor-pointer rounded-xl bg-[#faf8fd] p-3 border border-[#ede7f6] transition hover:bg-brand-50"
                        >
                          <p className="font-bold text-[#2d213e]">NSP Central Sector Scheme (CSSS)</p>
                          <p className="text-[11px] text-[#786e86] mt-0.5">
                            Application window closes Jan 31. 3 of 5 checklist milestones completed.
                          </p>
                        </div>

                        <div
                          onClick={() => {
                            setActive("discover");
                            setBellMenuOpen(false);
                          }}
                          className="cursor-pointer rounded-xl bg-[#faf8fd] p-3 border border-[#ede7f6] transition hover:bg-brand-50"
                        >
                          <p className="font-bold text-[#2d213e]">Reliance Foundation Scholarship</p>
                          <p className="text-[11px] text-[#786e86] mt-0.5">
                            Up to ₹2,00,000 grant for eligible undergraduate & PG scholars. 88% match for your profile.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActive("tracker");
                          setBellMenuOpen(false);
                        }}
                        className="mt-3 w-full rounded-xl bg-brand-50 py-2 text-center text-xs font-bold text-brand-700 transition hover:bg-brand-100"
                      >
                        Open Application Tracker →
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* 3. User Profile Pill with Avatar, Name, Organization & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUserMenuOpen(prev => !prev);
                  setBellMenuOpen(false);
                  setHeaderSearchOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-[#d6cde3] bg-white p-1 sm:px-2.5 sm:py-1.5 shadow-xs transition hover:border-brand-400 hover:bg-brand-50"
                title="User Profile Menu"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-600 to-violet-700 text-xs font-black text-white shadow-2xs">
                  {userInitials}
                </div>
                <div className="hidden text-left md:block">
                  <p className="truncate text-xs font-extrabold text-[#281c38] max-w-[120px]">
                    {profile.name || "Student"}
                  </p>
                  <p className="truncate text-[10px] font-medium text-[#847892] max-w-[120px]">
                    {profile.organization.split(",")[0] || "College"}
                  </p>
                </div>
                <ChevronDown size={14} className="text-[#877a94] shrink-0" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 4 }}
                      className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-[#eee9f5] bg-white p-4 shadow-xl z-50"
                    >
                      <div className="border-b border-[#f1edf6] pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-sm font-black text-white">
                            {userInitials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-extrabold text-[#271b36] truncate">{profile.name}</p>
                            <p className="text-[11px] text-[#8e849c] truncate">{profile.email}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-[#faf8fd] p-2 text-[11px] text-brand-700 font-semibold border border-[#eee8f6]">
                          <Building2 size={13} className="shrink-0" />
                          <span className="truncate">{profile.organization}</span>
                        </div>
                      </div>

                      <div className="py-2 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActive("profile");
                            setUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold text-[#5a4f68] hover:bg-brand-50 hover:text-brand-700 transition"
                        >
                          <UserCheck size={15} /> Edit Student Profile & Docs
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActive("tracker");
                            setUserMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-semibold text-[#5a4f68] hover:bg-brand-50 hover:text-brand-700 transition"
                        >
                          <Clock3 size={15} /> Application Tracker ({trackedCount})
                        </button>
                      </div>

                      <div className="border-t border-[#f1edf6] pt-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={15} /> Sign Out of Workspace
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <div className="mx-auto max-w-[1500px] space-y-6 p-4 sm:p-7 lg:p-9">
          {/* TAB 1: OVERVIEW */}
          {active === "overview" && (
            <>
              {/* Hero Banner */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#381472] via-[#5c28ad] to-[#8a55e8] p-6 text-white shadow-soft sm:p-8">
                <div className="relative z-10 max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold">
                    <Sparkles size={13} className="text-amber-300" /> UNIFIED INDIAN SCHOLARSHIP PLATFORM
                  </div>
                  <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                    Find and match verified scholarships in India.
                  </h2>
                  <p className="mt-3 max-w-lg text-xs sm:text-sm leading-6 text-white/80">
                    Aggregating Central Ministry schemes (NSP), State Post-Matric schemes, and
                    corporate/NGO grants (Reliance, Tata, HDFC) matched to your academic scores, category,
                    and income limit.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => goDiscover()}
                      className="rounded-xl bg-white px-4 py-3 text-xs sm:text-sm font-bold text-brand-800 transition hover:bg-brand-50 shadow-sm"
                    >
                      Explore Opportunities ({scholarships.length}) <ArrowUpRight size={16} className="ml-1 inline" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive("profile")}
                      className="rounded-xl bg-white/20 border border-white/25 px-4 py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-white/30"
                    >
                      Update Profile & Documents →
                    </button>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-12 -top-24 h-80 w-80 rounded-full border-[42px] border-white/10" />
                <div className="pointer-events-none absolute -bottom-36 right-36 h-72 w-72 rounded-full border-[35px] border-white/10" />
                <GraduationCap
                  className="absolute bottom-6 right-8 hidden text-white/15 lg:block"
                  size={140}
                  strokeWidth={1}
                />
              </section>

              {/* 4 Metric Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "National & State Grants",
                    value: String(scholarships.length).padStart(2, "0"),
                    note: "NSP, State Portals & CSR",
                    icon: GraduationCap
                  },
                  {
                    label: "Shortlisted Opportunities",
                    value: String(saved.length).padStart(2, "0"),
                    note: "Saved for application",
                    icon: Bookmark
                  },
                  {
                    label: "Potential Shortlist Value",
                    value: formatINR(totalPotential),
                    note: "Calculated annual grants",
                    icon: Wallet
                  },
                  {
                    label: "Applications in Tracker",
                    value: String(trackedCount).padStart(2, "0"),
                    note: "Checklists in progress",
                    icon: Clock3
                  }
                ].map(({ label, value, note, icon: Icon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="panel p-5 border border-[#eee9f5]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#938a9f]">{label}</span>
                      <span className="rounded-xl bg-brand-50 p-2 text-brand-600">
                        <Icon size={17} />
                      </span>
                    </div>
                    <p className="mt-3.5 text-2xl font-black tracking-tight text-[#281c3a]">{value}</p>
                    <p className="mt-1 text-xs text-[#a49bac]">{note}</p>
                  </motion.div>
                ))}
              </div>

              {/* Persona Canvas */}
              <PersonaCanvas
                profile={profile}
                setProfile={setProfile}
                scholarships={scholarships}
                onExplore={() => goDiscover()}
                onOpenProfile={() => setActive("profile")}
              />

              {/* Top Recommended for You */}
              <section>
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-[#281c3a]">
                      Top Recommended Opportunities
                    </h2>
                    <p className="muted mt-0.5 text-xs">
                      Filtered for {profile.courseStream || "Degree"} · {profile.socialCategory} · {profile.stateOfDomicile}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goDiscover()}
                    className="text-xs font-bold text-brand-700 hover:text-brand-900"
                  >
                    View all {scholarships.length} scholarships <ArrowUpRight size={14} className="inline" />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {ranked.slice(0, 3).map(item => (
                    <ScholarshipCard
                      key={item.id}
                      item={item}
                      match={item.match}
                      saved={saved.includes(item.id)}
                      onSave={() => toggleSave(item.id)}
                      onOpen={() => setSelected(item)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* TAB 2: PROFILE & PERSONALIZATION */}
          {active === "profile" && (
            <ProfileManager
              profile={profile}
              onSaveProfile={handleSaveProfile}
              onExplore={() => goDiscover()}
            />
          )}

          {/* TAB 3: DISCOVER SCHOLARSHIPS */}
          {active === "discover" && (
            <section id="discovery-grid" className="space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#271b38]">Discover Scholarships</h2>
                  <p className="muted mt-0.5 text-xs">
                    Search and filter across Central Ministries (NSP), State Portals & CSR Grants.
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-extrabold text-brand-700 border border-brand-200">
                  {visible.length} Matching Opportunities
                </span>
              </div>

              {/* Search & Filter Controls */}
              <div className="panel p-4 sm:p-5 border border-[#eee9f5] space-y-4">
                {/* Search Bar Input */}
                <div className="relative">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e94aa]" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by scheme name, portal (NSP, MahaDBT), degree (B.Tech, MBBS), or keywords..."
                    className="field pl-10 pr-10 text-sm font-medium"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#f2edf7]">
                  {/* Portal Type Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#716680] uppercase">Portal:</span>
                    <select
                      value={portalFilter}
                      onChange={e => setPortalFilter(e.target.value)}
                      className="field !py-1 !text-xs !w-auto"
                    >
                      <option value="All">All Portals</option>
                      <option value="National Portal (NSP)">National Portal (NSP)</option>
                      <option value="State Portal">State Portals (MahaDBT/SSP)</option>
                      <option value="Corporate / NGO Grant">Corporate / NGO Grants</option>
                    </select>
                  </div>

                  {/* Level of Study Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#716680] uppercase">Level:</span>
                    <select
                      value={levelFilter}
                      onChange={e => setLevelFilter(e.target.value)}
                      className="field !py-1 !text-xs !w-auto"
                    >
                      <option value="All">All Levels</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Diploma">ITI / Diploma</option>
                      <option value="Schooling">Schooling (Class 1-12)</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#716680] uppercase">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      className="field !py-1 !text-xs !w-auto"
                    >
                      <option value="match">Highest Match Score</option>
                      <option value="amount">Grant Amount (High to Low)</option>
                      <option value="deadline">Nearest Deadline</option>
                    </select>
                  </div>

                  {/* High Match Only Toggle */}
                  <label className="ml-auto flex cursor-pointer items-center gap-2 rounded-xl bg-[#faf8fd] px-3 py-1.5 border border-[#eee8f7] text-xs font-bold text-brand-700">
                    <input
                      type="checkbox"
                      checked={onlyEligible}
                      onChange={e => setOnlyEligible(e.target.checked)}
                      className="h-3.5 w-3.5 rounded accent-brand-600"
                    />
                    <span>High Match (≥ 60%) Only</span>
                  </label>
                </div>
              </div>

              {/* Grid of Results */}
              {visible.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {visible.map(item => (
                    <ScholarshipCard
                      key={item.id}
                      item={item}
                      match={item.match}
                      saved={saved.includes(item.id)}
                      onSave={() => toggleSave(item.id)}
                      onOpen={() => setSelected(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="panel p-12 text-center border border-[#eee9f5]">
                  <Search className="mx-auto mb-3 text-brand-400" size={32} />
                  <h3 className="font-bold text-base text-[#281c38]">No matching scholarships found</h3>
                  <p className="muted mt-1 text-xs">
                    Try broadening your search term or clearing the portal / study level filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setPortalFilter("All");
                      setLevelFilter("All");
                      setOnlyEligible(false);
                    }}
                    className="btn-secondary mt-4"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>
          )}

          {/* TAB 4: SAVED SHORTLIST */}
          {active === "saved" && (
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#271b38]">Your Shortlisted Opportunities</h2>
                  <p className="muted mt-0.5 text-xs">
                    Saved grants ready for document review and portal submission.
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {savedItems.length} Saved
                </span>
              </div>

              {savedItems.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {savedItems.map(item => (
                    <ScholarshipCard
                      key={item.id}
                      item={item}
                      match={item.match}
                      saved
                      onSave={() => toggleSave(item.id)}
                      onOpen={() => setSelected(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="panel p-12 text-center border border-[#eee9f5]">
                  <Bookmark className="mx-auto mb-3 text-brand-400" size={32} />
                  <h3 className="font-bold text-base text-[#281c38]">Nothing saved yet</h3>
                  <p className="muted mt-1 text-xs">
                    Bookmark scholarships in the Discover tab to build your application shortlist.
                  </p>
                  <button
                    type="button"
                    onClick={() => goDiscover()}
                    className="btn-primary mt-4"
                  >
                    Discover Scholarships
                  </button>
                </div>
              )}
            </section>
          )}

          {/* TAB 5: APPLICATION TRACKER */}
          {active === "tracker" && (
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#271b38]">
                    Application Tracker & Submission Milestones
                  </h2>
                  <p className="muted mt-0.5 text-xs">
                    Track Aadhaar-DBT linking, certificate collection, and Nodal Officer verification.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goDiscover()}
                  className="rounded-xl border border-brand-200 bg-white px-3 py-1.5 text-xs font-bold text-brand-700 hover:bg-brand-50"
                >
                  + Track More Grants
                </button>
              </div>

              <ApplicationTracker
                items={scholarships}
                tracker={tracker}
                setTracker={setTracker}
                onOpenScholarship={item => setSelected(item)}
              />
            </section>
          )}

          {/* TAB 6: FINANCIAL IMPACT */}
          {active === "impact" && (
            <section className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-[#271b38]">
                  Financial Impact & Tuition Coverage
                </h2>
                <p className="muted mt-0.5 text-xs">
                  Model how central, state, and corporate scholarships offset your college expenses.
                </p>
              </div>

              <FinancialImpact
                tuition={tuition}
                setTuition={setTuition}
                selected={impactSelected}
                setSelected={setImpactSelected}
                scholarships={scholarships}
              />
            </section>
          )}

          {/* Footer */}
          <footer className="border-t border-[#eeeaf5] py-6 text-center text-xs text-[#a49bac]">
            <p className="font-semibold text-[#8a8098]">
              GRANTLY · Unified India Scholarship Discovery & Personalization Workspace
            </p>
            <p className="mt-1 text-[11px] text-[#b3aabf]">
              National Scholarship Portal (NSP) · State Portals (MahaDBT, SSP) · Corporate/NGO Grants
            </p>
          </footer>
        </div>
      </main>

      {/* Scholarship Detail Drawer with Live Profile Analysis */}
      <ScholarshipDrawer
        item={selected}
        profile={profile}
        saved={selected ? saved.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onSave={() => selected && toggleSave(selected.id)}
        onTrack={() => selected && startTracking(selected)}
      />
    </div>
  );
}
