"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, Sparkles, UserCheck, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import type { StudentProfile, Scholarship, LevelOfStudy, SocialCategory } from "@/types/scholarship";
import { calculateMatch, formatINR } from "@/lib/matching";

const degrees: LevelOfStudy[] = [
  "Schooling (Class 1–12)",
  "ITI / Diploma",
  "Undergraduate",
  "Postgraduate",
  "Ph.D.",
  "Vocational"
];

const categories: SocialCategory[] = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
  "Notified Minorities"
];

export function PersonaCanvas({
  profile,
  setProfile,
  scholarships,
  onExplore,
  onOpenProfile
}: {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  scholarships: Scholarship[];
  onExplore: () => void;
  onOpenProfile: () => void;
}) {
  const matched = scholarships
    .map(s => ({ ...s, match: calculateMatch(s, profile) }))
    .sort((a, b) => b.match - a.match);

  const eligibleCount = matched.filter(x => x.match >= 60).length;

  const update = <K extends keyof StudentProfile>(key: K, value: StudentProfile[K]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <section className="panel overflow-hidden border border-[#eee9f5]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#f1edf6] p-5 sm:p-6 bg-[#faf8fd]">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
            <Sparkles size={14} /> Quick Persona Canvas & Eligibility
          </div>
          <h2 className="text-lg font-bold text-[#251933]">Personalize your scholarship matching</h2>
          <p className="muted mt-0.5 text-xs">
            Live matching powered by your academic level, social category, income ceiling & domicile.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenProfile}
            className="rounded-full bg-white border border-brand-200 px-3 py-1.5 text-xs font-bold text-brand-700 shadow-sm transition hover:bg-brand-50"
          >
            <UserCheck size={13} className="mr-1 inline text-brand-600" /> Full Profile & Docs
          </button>
          <span className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            <SlidersHorizontal size={13} className="mr-1 inline" /> Live Indian Scheme Match
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                EDUCATIONAL STATUS
              </label>
              <select
                className="field"
                value={profile.levelOfStudy}
                onChange={e => update("levelOfStudy", e.target.value as LevelOfStudy)}
              >
                {degrees.map(x => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                COURSE / STREAM
              </label>
              <input
                className="field"
                value={profile.courseStream}
                onChange={e => update("courseStream", e.target.value)}
                placeholder="e.g. B.Tech / B.Sc / MBBS"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                SOCIAL CATEGORY
              </label>
              <select
                className="field"
                value={profile.socialCategory}
                onChange={e => update("socialCategory", e.target.value as SocialCategory)}
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                ANNUAL FAMILY INCOME (INR)
              </label>
              <select
                className="field"
                value={
                  profile.annualFamilyIncome <= 150000
                    ? 140000
                    : profile.annualFamilyIncome <= 250000
                    ? 240000
                    : profile.annualFamilyIncome <= 450000
                    ? 400000
                    : profile.annualFamilyIncome <= 800000
                    ? 750000
                    : 900000
                }
                onChange={e => {
                  const val = parseInt(e.target.value);
                  update("annualFamilyIncome", val);
                }}
              >
                <option value={140000}>≤ ₹1.5 Lakhs (Highest need)</option>
                <option value={240000}>≤ ₹2.5 Lakhs (NSP & State ceiling)</option>
                <option value={400000}>≤ ₹4.5 Lakhs (CSSS Central cap)</option>
                <option value={750000}>≤ ₹8.0 Lakhs (AICTE / EWS cap)</option>
                <option value={900000}>&gt; ₹8.0 Lakhs</option>
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                ENROLLED ORGANIZATION / COLLEGE
              </label>
              <input
                className="field"
                value={profile.organization}
                onChange={e => update("organization", e.target.value)}
                placeholder="e.g. COEP Tech University / Delhi Univ"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#61586e]">
                STATE OF DOMICILE
              </label>
              <input
                className="field"
                value={profile.stateOfDomicile}
                onChange={e => update("stateOfDomicile", e.target.value)}
                placeholder="e.g. Maharashtra, Karnataka, UP"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="btn-primary"
              onClick={onExplore}
            >
              Explore {eligibleCount} Matched Grants <ArrowRight size={15} />
            </button>
            <button
              type="button"
              className="btn-secondary text-xs"
              onClick={onOpenProfile}
            >
              Edit Full 4-Section Profile & Documents →
            </button>
          </div>
        </div>

        {/* Live Top Matches Mini List */}
        <div className="rounded-2xl bg-[#faf8ff] p-4 sm:p-5 border border-[#eee9f5] flex flex-col justify-between">
          <div>
            <div className="mb-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-[#2a1e3b]">Top Matched Opportunities</p>
                <p className="text-[11px] text-[#8e849c]">Based on your selected profile variables</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800">
                {eligibleCount} Eligible
              </span>
            </div>

            <div className="space-y-3.5">
              {matched.slice(0, 4).map((item, i) => (
                <div key={item.id} className="rounded-xl bg-white p-3 border border-[#ede7f5] shadow-2xs">
                  <div className="mb-1.5 flex items-start justify-between gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="block truncate font-bold text-[#352946]">{item.title}</span>
                      <span className="text-[10px] text-[#8e859b]">{item.organization}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-brand-700">{item.match}%</span>
                      <div className="text-[10px] font-bold text-emerald-700">{formatINR(item.amount)}</div>
                    </div>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#eeeaf5]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.match}%` }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className={`h-full rounded-full ${
                        item.match >= 75
                          ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                          : "bg-gradient-to-r from-brand-500 to-violet-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#eee9f5] flex items-center justify-between text-[11px] text-[#938a9e]">
            <span>Aadhaar DBT Status: {profile.aadhaarLinkedWithBankDBT ? "✓ Seeded" : "⚠ Pending"}</span>
            <button
              type="button"
              onClick={onOpenProfile}
              className="font-bold text-brand-700 hover:text-brand-900"
            >
              Verify Prerequisites →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
