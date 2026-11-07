"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CalendarDays,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap,
  IndianRupee,
  FileText
} from "lucide-react";
import type { Scholarship, StudentProfile } from "@/types/scholarship";
import { formatINR, analyzeMatch } from "@/lib/matching";

export function ScholarshipDrawer({
  item,
  profile,
  saved,
  onClose,
  onSave,
  onTrack
}: {
  item: Scholarship | null;
  profile?: StudentProfile;
  saved: boolean;
  onClose: () => void;
  onSave: () => void;
  onTrack: () => void;
}) {
  if (!item) return null;

  const matchAnalysis = profile ? analyzeMatch(item, profile) : null;

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.button
            aria-label="Close scholarship details"
            className="fixed inset-0 z-[60] bg-[#211a2d]/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${item.title} details`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed bottom-0 right-0 top-0 z-[70] w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between border-b border-[#f1edf6] pb-4">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                {item.portalType}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-[#f6f3fa] p-2 text-[#766c84] transition hover:bg-[#ede8f5]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Provider and Title */}
            <div className="flex items-start gap-4">
              <div
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.color} text-xl font-black text-white shadow-md`}
              >
                {item.organization.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-[#897f96] uppercase tracking-wide">
                  {item.organization}
                </p>
                <h2 className="mt-1 text-xl font-black leading-tight text-[#241933] sm:text-2xl">
                  {item.title}
                </h2>
              </div>
            </div>

            {/* Amount Banner */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-brand-50 via-purple-50 to-brand-100 p-5 border border-brand-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
                MAXIMUM GRANT VALUE
              </span>
              <p className="mt-1 text-3xl font-black text-brand-800">
                {formatINR(item.amount)}
              </p>
              <p className="mt-0.5 text-xs text-[#71677f]">
                Disbursed per academic year directly to student / institution
              </p>
            </div>

            {/* Quick Meta */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#faf8ff] p-3.5 border border-[#eee9f5]">
                <CalendarDays size={18} className="mb-1.5 text-brand-600" />
                <p className="text-[11px] font-semibold text-[#9b93a8]">Application Deadline</p>
                <p className="mt-1 text-sm font-bold text-[#2e233d]">
                  {new Date(item.deadline + "T00:00:00").toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </p>
              </div>

              <div className="rounded-xl bg-[#faf8ff] p-3.5 border border-[#eee9f5]">
                <MapPin size={18} className="mb-1.5 text-brand-600" />
                <p className="text-[11px] font-semibold text-[#9b93a8]">Eligible Domicile</p>
                <p className="mt-1 text-sm font-bold text-[#2e233d]">{item.location}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#938a9f]">About the Scheme</h3>
              <p className="mt-2 text-sm leading-6 text-[#695f76]">{item.description}</p>
            </div>

            {/* Live Profile Match Analysis */}
            {matchAnalysis && (
              <div className="mt-6 rounded-2xl border border-brand-200 bg-[#fbf9fe] p-4.5">
                <div className="flex items-center justify-between border-b border-[#ece7f5] pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-brand-600" />
                    <span className="text-xs font-bold text-[#352945]">Your Profile Eligibility</span>
                  </div>
                  <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-black text-brand-700">
                    {matchAnalysis.score}% Match
                  </span>
                </div>

                {matchAnalysis.matchedReasons.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[11px] font-bold text-emerald-800">Criteria Met:</p>
                    {matchAnalysis.matchedReasons.map(r => (
                      <div key={r} className="flex items-center gap-2 text-xs text-emerald-700">
                        <CheckCircle2 size={13} className="shrink-0 text-emerald-600" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchAnalysis.unmetReasons.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-[11px] font-bold text-amber-800">Points to check:</p>
                    {matchAnalysis.unmetReasons.map(r => (
                      <div key={r} className="flex items-center gap-2 text-xs text-amber-700">
                        <AlertCircle size={13} className="shrink-0 text-amber-600" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchAnalysis.prerequisiteAlerts.length > 0 && (
                  <div className="mt-3 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-800 border border-amber-200">
                    <p className="font-bold mb-1">Prerequisite Actions Needed:</p>
                    {matchAnalysis.prerequisiteAlerts.map(a => (
                      <p key={a} className="text-[11px] leading-4 text-amber-700">
                        • {a}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Official Eligibility Checklist */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#938a9f]">
                Official Eligibility Rules
              </h3>
              <div className="space-y-2.5">
                {item.eligibility.map(x => (
                  <div key={x} className="flex gap-2.5 text-xs leading-5 text-[#5e536c]">
                    <CheckCircle2 size={16} className="shrink-0 text-brand-600 mt-0.5" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            {item.requiredDocuments && item.requiredDocuments.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-[#938a9f]">
                  Required Documents Checklist
                </h3>
                <div className="rounded-xl bg-[#faf8ff] p-3.5 border border-[#eee9f5] space-y-2">
                  {item.requiredDocuments.map(doc => (
                    <div key={doc} className="flex items-center gap-2 text-xs text-[#5e536c]">
                      <FileText size={14} className="text-brand-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligible Degrees & Fields */}
            <div className="mt-6 space-y-3">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#938a9f]">
                  Eligible Study Levels
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.degree.map(x => (
                    <span
                      key={x}
                      className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-100"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#938a9f]">
                  Eligible Streams / Fields
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.fields.map(x => (
                    <span
                      key={x}
                      className="rounded-full bg-[#f5f3f8] px-3 py-1 text-xs font-semibold text-[#6a5e78]"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Official Link */}
            {item.officialPortalUrl && (
              <div className="mt-6">
                <a
                  href={item.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50/50 p-3.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100/70"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={15} /> Official Portal: {item.officialPortalUrl}
                  </span>
                  <span>Visit →</span>
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#f0edf4] pt-5">
              <button
                type="button"
                onClick={onSave}
                className="btn-secondary !py-3"
              >
                <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                {saved ? "Shortlisted" : "Save Opportunity"}
              </button>
              <button
                type="button"
                onClick={onTrack}
                className="btn-primary !py-3"
              >
                Track Application
              </button>
            </div>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#a49bac]">
              GRANTLY verification assistant · Review official notifications on the designated national/state portal before final application submission.
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
