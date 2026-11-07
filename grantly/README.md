# GRANTLY — Unified Indian Scholarship Discovery & Personalization Platform

A responsive Next.js App Router application built with React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Tailored specifically for Indian scholarship discovery across National Portals (NSP), State Portals (MahaDBT, SSP Karnataka, etc.), and Corporate/NGO Grants (Reliance Foundation, Tata Trusts, HDFC Parivartan, ONGC, Siemens, Kotak).

---

## 🚀 Key Improvements & Fixes Implemented

### 1. Functional Global & Workspace Search Bar
- **Header Search Bar**: Replaced static header placeholder with an interactive live search input with keyboard shortcut (`⌘K` / `Ctrl+K`), instant drop-down recommendations showing match scores and grant amounts, and click-to-open drawer / Enter to search.
- **Discover Page Search**: Full-text multi-criteria search covering:
  - Scholarship titles and provider organizations (Ministry of Education, AICTE, Reliance, etc.)
  - Portal types (National Portal NSP, State Portals, Corporate/NGO)
  - Study levels & degrees (B.Tech, M.B.B.S, B.Sc, B.Com, MBA, ITI/Diploma, Class 10/12)
  - Domicile states and regions
  - Filter pills for Portal Type, Study Level, High Match Only ($\ge 60\%$), and dynamic sorting (Highest Match, Amount, Nearest Deadline).

### 2. Robust Login, Registration & Logout System
- **Sidebar & Header Logout**: Fixed broken logout callback that threw unhandled errors. Added working logout buttons in the Sidebar and Header profile menu.
- **Organization & Student Identity**: Login and Registration now collect student name, email, and current enrolled institution / university name (organization).
- **1-Click Quick Demo Sign-In**: Instant scenarios for testing (Ananya Joshi - Govt Engg College OBC/Female, Rahul Sharma - SC Rural B.Sc, Aman Khan - Minority M.Tech).
- **Session Persistence**: User sessions and custom profiles persist across page reloads via `sessionStorage` and `localStorage`.

### 3. Comprehensive Indian Profile & Personalization (`ProfileManager`)
Matches students with specific eligibility rules under 4 core sections:
1. **Academic Details**:
   - Current Educational Status (Schooling Class 1–12, ITI/Diploma, Undergraduate, Postgraduate, Ph.D., Vocational)
   - Course & Stream (e.g. B.Tech, B.Sc, B.A., M.B.B.S, MBA) & Specialisation
   - Past Academic Scores (% or CGPA with normalized cutoff evaluation)
   - Enrolled Organization / College Name
   - Institution Type (Government, Government-Aided, Autonomous, Private, Premier IIT/NIT/AIIMS)
   - Admission Mode (Merit-based Central/State Counseling vs Management Quota)
2. **Socio-Economic Details**:
   - Gross Annual Family Income (Exact figure and quick brackets: $\le ₹1.5\text{L}$, $\le ₹2.5\text{L}$, $\le ₹4.5\text{L}$, $\le ₹6\text{L}$, $\le ₹8\text{L}$)
   - Social Category (SC, ST, OBC, EWS, General, Notified Minorities)
   - Notified Minority Community (Muslim, Christian, Sikh, Jain, Buddhist, Parsi)
   - State of Domicile (All Indian States & UTs for State Post-Matric schemes)
3. **Special Category / Background Status**:
   - Gender & Single Girl Child grant priority
   - Person with Benchmark Disability (PwD) toggle & disability percentage ($\ge 40\%$)
   - Occupational / Heritage Background (Children of Defense/CAPF, Wards of Martyrs, Beedi/Mine/Construction workers, Farmers)
   - Special Circumstances (Single parent, orphan status, first-generation graduate)
4. **Essential Application Prerequisites**:
   - Aadhaar Seeded & Linked with Active Bank Account (Mandatory DBT flag & alerts)
   - Document Readiness Checklist:
     - Government-issued Income Certificate
     - Community / Category / Caste Certificate
     - Bonafide Student Certificate / Fee Receipt from college
     - Past Marksheets & Transcripts

### 4. Transparent Multi-Factor Indian Matching Engine (`lib/matching.ts`)
Calculates an explainable match score ($0-100\%$) considering:
- Academic Level & Stream (25 points)
- Academic Score cutoff (15 points)
- Income ceiling verification (15 points)
- Social Category & Minority reservation (15 points)
- State Domicile match (10 points)
- Gender & Special background quotas (15 points)
- Institution type & counseling admission mode (10 points)
- Live criteria breakdown in the Scholarship Drawer highlighting met requirements and prerequisite actions.

---

## 🛠️ Project Structure
```text
grantly/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx             # Main dashboard (Overview, Discover, Profile, Saved, Tracker, Impact)
│   └── login/page.tsx       # Auth page with registration, login and 1-click test scenarios
├── components/
│   ├── ApplicationTracker.tsx # Indian scholarship submission milestone checklist
│   ├── FinancialImpact.tsx    # Tuition presets (INR) & stackable grant modeler
│   ├── PersonaCanvas.tsx      # Quick matching canvas with links to full profile
│   ├── ProfileManager.tsx     # 4-section Indian profile & prerequisite verification
│   ├── ScholarshipCard.tsx    # Indian portal badge, organization, eligibility chips
│   ├── ScholarshipDrawer.tsx  # Detailed view with live criteria analysis & official links
│   └── Sidebar.tsx            # Navigation, active student profile & working logout
├── data/
│   └── scholarships.ts        # Comprehensive database of Central, State & CSR scholarships
├── lib/
│   └── matching.ts            # Indian matching algorithm, normalization & INR formatting
├── types/
│   └── scholarship.ts         # TypeScript schema for Indian scholarship ecosystem
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💻 Run Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Production Build

```bash
npm run build
npm start
```
