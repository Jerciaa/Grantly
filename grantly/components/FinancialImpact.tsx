"use client";

import { useMemo } from "react";
import { formatINR } from "@/lib/matching";
import type { Scholarship } from "@/types/scholarship";

export function FinancialImpact({
  tuition,
  setTuition,
  selected,
  setSelected,
  scholarships
}: {
  tuition: number;
  setTuition: (n: number) => void;
  selected: string[];
  setSelected: (s: string[]) => void;
  scholarships: Scholarship[];
}) {
  const grantTotal = useMemo(
    () =>
      scholarships
        .filter(s => selected.includes(s.id))
        .reduce((sum, s) => sum + s.amount, 0),
    [selected, scholarships]
  );

  const covered = Math.min(tuition, grantTotal);
  const remaining = Math.max(0, tuition - covered);
  const percent = tuition > 0 ? Math.min(100, Math.round((covered / tuition) * 100)) : 0;
  const circumference = 2 * Math.PI * 62;
  const offset = circumference - (percent / 100) * circumference;

  const presets = [
    { label: "Govt College (₹45k)", val: 45000 },
    { label: "Govt-Aided / Univ (₹1.2L)", val: 120000 },
    { label: "Autonomous Engg (₹1.8L)", val: 180000 },
    { label: "Premier / Private (₹2.8L)", val: 280000 }
  ];

  return (
    <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
      <section className="panel p-5 sm:p-6 border border-[#ece7f5]">
        <h2 className="text-base font-bold text-[#281b38]">Tuition & Fee Overview</h2>
        <p className="muted mt-1 text-xs">
          Adjust your annual college fees to model funding coverage through scholarships.
        </p>

        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-bold text-[#71687e]">
            TOTAL ANNUAL TUITION & COLLEGE EXPENSES (INR)
          </span>
          <input
            className="field font-bold text-lg"
            type="number"
            min="0"
            step="5000"
            value={tuition}
            onChange={e => setTuition(Math.max(0, Number(e.target.value)))}
          />
        </label>

        {/* Presets */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {presets.map(p => (
            <button
              key={p.label}
              type="button"
              onClick={() => setTuition(p.val)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                tuition === p.val
                  ? "bg-brand-600 text-white"
                  : "bg-[#f4f0fa] text-[#695d79] hover:bg-[#eae3f5]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3.5 border-t border-[#f0edf4] pt-5">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#82798e]">Combined Selected Grant Value:</span>
            <b className="text-brand-700 font-extrabold">{formatINR(grantTotal)}</b>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-[#82798e]">Net Covered Amount (Capped):</span>
            <b className="text-emerald-700 font-extrabold">{formatINR(covered)}</b>
          </div>
          <div className="flex justify-between border-t border-[#f0edf4] pt-3 text-sm">
            <span className="font-bold text-[#352945]">Remaining Tuition Burden:</span>
            <b className="text-lg font-black text-[#261937]">{formatINR(remaining)}</b>
          </div>
        </div>
      </section>

      <section className="panel flex flex-col items-center justify-center p-5 sm:p-6 border border-[#ece7f5]">
        <h2 className="self-start text-base font-bold text-[#281b38]">Funding Coverage Meter</h2>
        <p className="muted mt-1 self-start text-xs">
          Ratio of approved or applied grants against your annual institutional fees.
        </p>

        <div className="relative my-6 grid h-44 w-44 place-items-center">
          <svg viewBox="0 0 144 144" className="h-full w-full -rotate-90">
            <circle cx="72" cy="72" r="62" fill="none" stroke="#eee9f6" strokeWidth="12" />
            <circle
              cx="72"
              cy="72"
              r="62"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-3xl font-black text-brand-700">{percent}%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#9b93a8]">
              Covered
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-emerald-800">Grants Applied</p>
            <p className="mt-1 font-bold text-emerald-700">{formatINR(covered)}</p>
          </div>
          <div className="rounded-xl bg-[#f7f5f9] border border-[#ece7f4] p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-[#8e8599]">Remaining Gap</p>
            <p className="mt-1 font-bold text-[#362a48]">{formatINR(remaining)}</p>
          </div>
        </div>
      </section>

      <section className="panel p-5 xl:col-span-2 border border-[#ece7f5]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-[#281b38]">
              Select Grants to Model Your Funding
            </h2>
            <p className="muted mt-0.5 text-xs">
              Check the scholarships you intend to apply for to compute aggregate support.
            </p>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            {selected.length} selected ({formatINR(grantTotal)})
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {scholarships.map(s => (
            <label
              key={s.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${
                selected.includes(s.id)
                  ? "border-brand-400 bg-brand-50/70 shadow-2xs"
                  : "border-[#eeeaf5] hover:bg-[#faf9fc]"
              }`}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-brand-600 shrink-0"
                checked={selected.includes(s.id)}
                onChange={e =>
                  setSelected(
                    e.target.checked
                      ? [...selected, s.id]
                      : selected.filter(id => id !== s.id)
                  )
                }
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs sm:text-sm font-bold text-[#2c203d]">
                  {s.title}
                </span>
                <span className="text-[11px] text-[#948ba0]">{s.organization}</span>
              </span>
              <b className="text-sm font-extrabold text-brand-700 shrink-0">
                {formatINR(s.amount)}
              </b>
            </label>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[#a49bac]">
          * Illustrative model. Government schemes generally do not permit dual claiming for tuition fee reimbursement, while corporate CSR grants may be combined with certain state freeships.
        </p>
      </section>
    </div>
  );
}
