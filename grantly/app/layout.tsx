import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRANTLY — Scholarship Workspace",
  description: "Discover, match and manage scholarship opportunities."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
