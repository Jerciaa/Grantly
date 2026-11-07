"use client";

import { motion } from "framer-motion";
import { Check, Circle, ClipboardCheck, ExternalLink, ShieldCheck, FileText, Building2 } from "lucide-react";
import type { Scholarship } from "@/types/scholarship";

export type TrackerState = Record<string, boolean[]>;

const standardTasks = [
  "Verify eligibility criteria & domicile requirements",
  "Ensure Aadhaar is linked to active bank account (DBT enabled)",
  "Collect Income Certificate, Category Certificate & Bonafide/Fee Receipt",
  "Complete online registration & form submission on official portal",
  "Submit hardcopy / get verified by College Nodal Officer"
];

export function ApplicationTracker({
  items,
  tracker,
  setTracker,
  onOpenScholarship
}: {
  items: Scholarship[];
  tracker: TrackerState;
  setTracker: React.Dispatch<React.SetStateAction<TrackerState>>;
  onOpenScholarship?: (item: Scholarship) => void;
}) {
  const tracked = items.filter(x => tracker[x.id]);

  const toggle = (id: string, index: number) => {
    const current = tracker[id] ?? standardTasks.map(() => false);
    setTracker(prev => ({
      ...prev,
      [id]: current.map((v, i) => (i === index ? !v : v))
    }));
  };

  const removeTracking = (id: string) => {
    setTracker(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  if (!tracked.length) {
    return (
      <div className="panel p-12 text-center">
        <ClipboardCheck className="mx-auto mb-3 text-brand-500" size={34} />
        <h3 className="text-lg font-bold text-[#2a1d3a]">Your application tracker is empty</h3>
        <p className="muted mt-1 max-w-md mx-auto text-sm">
          Browse scholarships in the Discover tab and click “Track application” to manage your step-by-step submission checklist.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {tracked.map(item => {
        const checks = tracker[item.id] ?? standardTasks.map(() => false);
        const completedCount = checks.filter(Boolean).length;
        const progress = Math.round((completedCount / standardTasks.length) * 100);

        return (
          <div key={item.id} className="panel p-5 sm:p-6 border border-[#ece7f5]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                  {item.portalType}
                </span>
                <p className="mt-1 text-xs font-semibold text-[#8e849b] truncate">
                  {item.organization}
                </p>
                <h3 className="mt-0.5 text-base font-bold text-[#271b36]">{item.title}</h3>
              </div>
              <div className="text-right shrink-0">
                <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-extrabold ${
                  progress === 100
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-brand-50 text-brand-700"
                }`}>
                  {progress}% Complete
                </span>
                <p className="mt-1 text-[11px] text-[#9b93a8]">
                  {completedCount} of {standardTasks.length} steps
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#eee9f6]">
              <motion.div
                className={`h-full rounded-full transition-all duration-300 ${
                  progress === 100
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : "bg-gradient-to-r from-brand-600 to-violet-500"
                }`}
                animate={{ width: `${progress}%` }}
              />
            </div>

            {/* Checklist */}
            <div className="mb-2 mt-5 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-[#958ca1]">
                Application Milestones
              </p>
              <button
                type="button"
                onClick={() => removeTracking(item.id)}
                className="text-[11px] font-semibold text-red-500 hover:text-red-700 transition"
              >
                Remove from tracker
              </button>
            </div>

            <div className="space-y-2">
              {standardTasks.map((task, i) => {
                const isChecked = checks[i];
                return (
                  <button
                    key={task}
                    type="button"
                    onClick={() => toggle(item.id, i)}
                    className={`flex w-full items-start gap-3 rounded-xl p-2.5 text-left text-xs sm:text-sm transition ${
                      isChecked
                        ? "bg-[#fbf9fe] text-[#938b9e]"
                        : "hover:bg-[#f6f2fc] text-[#4d425c]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
                        isChecked
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-[#d8d1e2] bg-white text-transparent"
                      }`}
                    >
                      {isChecked ? <Check size={12} strokeWidth={3} /> : <Circle size={8} />}
                    </span>
                    <span className={isChecked ? "line-through text-[#9890a2]" : "font-medium"}>
                      {task}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Portal link footer */}
            {item.officialPortalUrl && (
              <div className="mt-4 border-t border-[#f0edf4] pt-3 flex items-center justify-between text-xs">
                <a
                  href={item.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-900"
                >
                  <ExternalLink size={13} /> Visit Application Portal
                </a>
                {onOpenScholarship && (
                  <button
                    type="button"
                    onClick={() => onOpenScholarship(item)}
                    className="font-semibold text-[#7f758e] hover:text-brand-700"
                  >
                    View details
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
