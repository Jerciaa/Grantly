"use client";

import { motion } from "framer-motion";
import { Bookmark, CalendarDays, ArrowUpRight, MapPin, Building, ShieldCheck } from "lucide-react";
import type { Scholarship } from "@/types/scholarship";
import { formatINR } from "@/lib/matching";

export function ScholarshipCard({
  item,
  match,
  saved,
  onSave,
  onOpen
}: {
  item: Scholarship;
  match: number;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  const getBadgeColor = (portalType: string) => {
    switch (portalType) {
      case "National Portal (NSP)":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "State Portal":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Corporate / NGO Grant":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  const matchColor =
    match >= 75
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : match >= 50
      ? "bg-brand-50 text-brand-700 border-brand-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="panel flex h-full flex-col p-5 transition-all duration-200 hover:shadow-xl hover:border-brand-200 relative overflow-hidden"
    >
      {/* Top Bar with Portal Type & Match Score */}
      <div className="mb-3.5 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-base font-black text-white shadow-sm`}
          >
            {item.organization.charAt(0)}
          </div>
          <div className="min-w-0">
            <span
              className={`inline-block truncate rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getBadgeColor(
                item.portalType
              )}`}
            >
              {item.portalType}
            </span>
            <p className="truncate text-xs font-semibold text-[#8c8299] mt-0.5">
              {item.organization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${matchColor}`}>
            {match}% match
          </span>
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onSave();
            }}
            aria-label={saved ? "Remove bookmark" : "Save scholarship"}
            className={`rounded-lg p-2 transition ${
              saved
                ? "bg-brand-50 text-brand-700"
                : "text-[#9b93a8] hover:bg-[#f6f3fa] hover:text-[#554b63]"
            }`}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-1 min-h-[48px] text-base font-bold leading-6 text-[#241933] line-clamp-2">
        {item.title}
      </h3>

      {/* Amount Display */}
      <div className="mt-3">
        <p className="text-2xl font-black tracking-tight text-brand-700">
          {formatINR(item.amount)}
        </p>
        <p className="mt-0.5 text-[11px] text-[#9b93a8]">
          Annual grant / Tuition assistance
        </p>
      </div>

      {/* Key Eligibility Chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.minScorePercent && (
          <span className="rounded-md bg-[#f6f3fa] px-2 py-0.5 text-[10px] font-semibold text-[#665a75]">
            Min {item.minScorePercent}%
          </span>
        )}
        {item.maxFamilyIncome && (
          <span className="rounded-md bg-[#f6f3fa] px-2 py-0.5 text-[10px] font-semibold text-[#665a75]">
            Income ≤ ₹{(item.maxFamilyIncome / 100000).toFixed(1)}L
          </span>
        )}
        {item.genderEligibility === "Female Only" && (
          <span className="rounded-md bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 text-[10px] font-semibold">
            Girls Only
          </span>
        )}
        {item.requiresPwD && (
          <span className="rounded-md bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 text-[10px] font-semibold">
            PwD (≥ 40%)
          </span>
        )}
        {item.dbtMandatory && (
          <span className="rounded-md bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 text-[10px] font-semibold">
            Aadhaar DBT
          </span>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between border-t border-[#f0edf4] pt-3 text-xs text-[#81798e]">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-brand-500" /> {item.location}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <CalendarDays size={13} className="text-brand-500" />
            {new Date(item.deadline + "T00:00:00").toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="btn-secondary mt-3.5 w-full justify-between !py-2.5"
        >
          <span>View Details & Eligibility</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </motion.article>
  );
}
