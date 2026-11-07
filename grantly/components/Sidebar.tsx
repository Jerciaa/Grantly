"use client";

import {
  GraduationCap,
  LayoutDashboard,
  Compass,
  Bookmark,
  ClipboardCheck,
  Wallet,
  UserCheck,
  X,
  LogOut,
  Sparkles,
  Building2
} from "lucide-react";
import type { StudentProfile } from "@/types/scholarship";

const items = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile & Personalization", icon: UserCheck },
  { id: "discover", label: "Discover Grants", icon: Compass },
  { id: "saved", label: "Saved Shortlist", icon: Bookmark },
  { id: "tracker", label: "Application Tracker", icon: ClipboardCheck },
  { id: "impact", label: "Financial Impact", icon: Wallet }
];

export function Sidebar({
  active,
  onNavigate,
  open,
  onClose,
  onLogout,
  profile
}: {
  active: string;
  onNavigate: (id: string) => void;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  profile?: StudentProfile;
}) {
  const initials =
    profile?.avatarInitials ||
    (profile?.name
      ? profile.name
          .split(" ")
          .map(n => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "ST");

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[275px] flex-col border-r border-[#eeeaf5] bg-white px-5 py-6 shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-violet-700 text-white shadow-sm">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-[#221634]">
                GRANTLY<span className="text-brand-600">.</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9b93a8]">
                India Grants Hub
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#aaa2b5]">
          Workspace Navigation
        </p>
        <nav className="space-y-1">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => {
                onNavigate(id);
                onClose();
              }}
              aria-current={active === id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs sm:text-sm font-semibold transition ${
                active === id
                  ? "bg-brand-50 text-brand-700 shadow-2xs"
                  : "text-[#746b81] hover:bg-[#faf9fc] hover:text-[#332a40]"
              }`}
            >
              <Icon size={17} className={active === id ? "text-brand-600" : "text-[#978fa4]"} />
              <span className="truncate">{label}</span>
              {active === id && <span className="ml-auto h-2 w-2 rounded-full bg-brand-600" />}
            </button>
          ))}
        </nav>

        {/* Callout Card */}
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-[#3c1775] via-[#5e2cb0] to-[#8850ee] p-4 text-white shadow-soft">
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-200">
            <Sparkles size={12} /> NSP & State Window
          </div>
          <p className="text-xs font-bold leading-5">
            Keep your Aadhaar linked with DBT and get Income Certificate verified.
          </p>
          <button
            type="button"
            onClick={() => {
              onNavigate("profile");
              onClose();
            }}
            className="mt-3 block w-full rounded-lg bg-white/20 px-3 py-1.5 text-center text-[11px] font-bold text-white transition hover:bg-white/30"
          >
            Review Profile & Docs →
          </button>
        </div>

        {/* User Account / Profile Footer with working Logout */}
        <div className="mt-4 flex items-center gap-2.5 border-t border-[#f0edf4] pt-4">
          <div
            onClick={() => {
              onNavigate("profile");
              onClose();
            }}
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-brand-100 text-xs font-extrabold text-brand-700 hover:ring-2 hover:ring-brand-400 transition"
            title="Open Profile"
          >
            {initials}
          </div>
          <div
            onClick={() => {
              onNavigate("profile");
              onClose();
            }}
            className="min-w-0 flex-1 cursor-pointer"
          >
            <p className="truncate text-xs font-bold text-[#2b1f3d]">
              {profile?.name || "Student Account"}
            </p>
            <p className="truncate text-[10px] text-[#9b93a8]">
              {profile?.organization || "GRANTLY Student"}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Log out of GRANTLY"
            aria-label="Log out"
            className="rounded-lg p-2 text-[#8d8498] transition hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
