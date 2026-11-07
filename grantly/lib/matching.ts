import type { Scholarship, StudentProfile } from "@/types/scholarship";

/**
 * Normalizes student score to an approximate percentage for comparison.
 * CBSE / AICTE standard conversion: CGPA * 9.5
 */
function normalizeScoreToPercent(score: number, type: "Percentage" | "CGPA"): number {
  if (type === "CGPA") {
    // If entered on 10-point scale
    if (score <= 10) return Math.min(100, Math.round(score * 9.5));
  }
  return Math.min(100, Math.max(0, score));
}

export interface MatchAnalysis {
  score: number;
  isEligible: boolean;
  matchedReasons: string[];
  unmetReasons: string[];
  prerequisiteAlerts: string[];
}

export function analyzeMatch(item: Scholarship, profile: StudentProfile): MatchAnalysis {
  let score = 0;
  const matchedReasons: string[] = [];
  const unmetReasons: string[] = [];
  const prerequisiteAlerts: string[] = [];

  // 1. Academic Level & Field (25 points)
  const studentLevel = profile.levelOfStudy || profile.degree || "Undergraduate";
  const levelMatch =
    item.degree.includes(studentLevel) ||
    (studentLevel === "Undergraduate" && item.degree.includes("Undergraduate")) ||
    (studentLevel === "Postgraduate" && item.degree.includes("Postgraduate")) ||
    (studentLevel === "ITI / Diploma" && (item.degree.includes("Diploma") || item.degree.includes("ITI / Diploma"))) ||
    (studentLevel === "Schooling (Class 1–12)" && (item.degree.includes("Schooling") || item.degree.includes("Class 1-12")));

  if (levelMatch) {
    score += 15;
    matchedReasons.push(`Eligible for ${studentLevel} level`);
  } else {
    unmetReasons.push(`Requires level in: ${item.degree.join(", ")}`);
  }

  const studentField = profile.specialization || profile.courseStream || profile.field || "Any Field";
  const fieldMatch =
    item.fields.includes("Any Field") ||
    item.fields.some(f =>
      studentField.toLowerCase().includes(f.toLowerCase()) ||
      (profile.courseStream && profile.courseStream.toLowerCase().includes(f.toLowerCase()))
    );

  if (fieldMatch) {
    score += 10;
    matchedReasons.push("Stream & specialization aligned");
  } else {
    unmetReasons.push(`Preferred fields: ${item.fields.slice(0, 3).join(", ")}`);
  }

  // 2. Academic Merit / Score Cutoff (15 points)
  const studentScorePercent = normalizeScoreToPercent(
    profile.pastScore ?? 75,
    profile.pastScoreType ?? "Percentage"
  );

  if (item.minScorePercent) {
    if (studentScorePercent >= item.minScorePercent) {
      score += 15;
      matchedReasons.push(`Score (${studentScorePercent}%) meets cutoff (>= ${item.minScorePercent}%)`);
    } else if (studentScorePercent >= item.minScorePercent - 5) {
      score += 7;
      unmetReasons.push(`Slightly below cutoff (${studentScorePercent}% vs ${item.minScorePercent}%)`);
    } else {
      unmetReasons.push(`Requires minimum ${item.minScorePercent}% in past examinations`);
    }
  } else {
    score += 14;
    matchedReasons.push("No strict academic percentage cutoff");
  }

  // 3. Socio-Economic Income Limits (15 points)
  const studentIncome = profile.annualFamilyIncome ?? 250000;
  if (item.maxFamilyIncome) {
    if (studentIncome <= item.maxFamilyIncome) {
      score += 15;
      matchedReasons.push(`Family income (₹${(studentIncome / 100000).toFixed(1)}L) within limit (<= ₹${(item.maxFamilyIncome / 100000).toFixed(1)}L)`);
    } else {
      unmetReasons.push(`Income exceeds cap of ₹${(item.maxFamilyIncome / 100000).toFixed(1)}L/year`);
    }
  } else {
    score += 13;
    matchedReasons.push("Universal income eligibility");
  }

  // 4. Social Category & Minorities (15 points)
  const studentCategory = profile.socialCategory || "General";
  const isMinority =
    studentCategory === "Notified Minorities" ||
    (profile.minorityCommunity && profile.minorityCommunity !== "None");

  if (item.targetCategories && item.targetCategories.length > 0) {
    const categoryMatches =
      item.targetCategories.includes(studentCategory) ||
      (item.minoritiesAllowed && isMinority);

    if (categoryMatches) {
      score += 15;
      matchedReasons.push(`Matches target category: ${studentCategory}`);
    } else {
      unmetReasons.push(`Reserved for: ${item.targetCategories.join(", ")}`);
    }
  } else {
    score += 13;
    matchedReasons.push("Open to all social categories");
  }

  // 5. State of Domicile (10 points)
  const studentState = profile.stateOfDomicile || "Maharashtra";
  const stateMatch =
    !item.states ||
    item.states.includes("All India") ||
    item.states.includes(studentState);

  if (stateMatch) {
    score += 10;
    matchedReasons.push(
      item.states?.includes("All India")
        ? "National all-India eligibility"
        : `Matches state domicile: ${studentState}`
    );
  } else {
    unmetReasons.push(`State specific: Only for students of ${item.states?.join(", ")}`);
  }

  // 6. Gender & Special Category (15 points)
  if (item.genderEligibility === "Female Only") {
    if (profile.gender === "Female") {
      score += 10;
      matchedReasons.push("Targeted grant for female students");
    } else {
      score = Math.max(0, score - 25);
      unmetReasons.push("Exclusively reserved for female scholars");
    }
  } else if (item.genderEligibility === "Single Girl Child Preferred") {
    if (profile.isSingleGirlChild) {
      score += 10;
      matchedReasons.push("Single Girl Child priority applicable");
    } else {
      score += 6;
    }
  } else {
    score += 8;
  }

  // PwD Check
  if (item.requiresPwD) {
    if (profile.isPwD && profile.disabilityPercentage >= (item.minDisabilityPercent || 40)) {
      score += 5;
      matchedReasons.push(`PwD benchmark criteria met (${profile.disabilityPercentage}% >= 40%)`);
    } else {
      score = Math.max(0, score - 20);
      unmetReasons.push("Requires Person with Benchmark Disability (PwD >= 40%)");
    }
  }

  // Occupational check (Defense/Martyrs/Workers/Farmers)
  if (item.occupationalTarget && item.occupationalTarget.length > 0) {
    if (item.occupationalTarget.includes(profile.occupationalBackground)) {
      score += 5;
      matchedReasons.push(`Occupational quota met: ${profile.occupationalBackground}`);
    } else {
      score = Math.max(0, score - 15);
      unmetReasons.push(`Requires background in: ${item.occupationalTarget.join(", ")}`);
    }
  }

  // Special Circumstances bonus (Single parent, Orphan, First-gen)
  if (
    item.specialCircumstancesTarget &&
    profile.specialCircumstances?.some(sc => item.specialCircumstancesTarget?.includes(sc))
  ) {
    score = Math.min(100, score + 5);
    matchedReasons.push("Priority given for special circumstances / first-generation scholar");
  }

  // 7. Institution Type & Admission Mode (10 points)
  if (item.institutionTypesAllowed && item.institutionTypesAllowed.length > 0) {
    if (item.institutionTypesAllowed.includes(profile.institutionType)) {
      score += 5;
      matchedReasons.push(`Matches institution type (${profile.institutionType})`);
    } else {
      unmetReasons.push(`Valid for: ${item.institutionTypesAllowed.join(", ")}`);
    }
  } else {
    score += 5;
  }

  if (item.admissionModesAllowed && item.admissionModesAllowed.length > 0) {
    if (item.admissionModesAllowed.includes(profile.admissionMode)) {
      score += 5;
      matchedReasons.push("Admission mode verified");
    } else {
      unmetReasons.push("Specific admission mode required");
    }
  } else {
    score += 5;
  }

  // Prerequisite checks
  if (item.dbtMandatory && !profile.aadhaarLinkedWithBankDBT) {
    prerequisiteAlerts.push("Aadhaar-seeded bank account (DBT) is mandatory for this scheme");
  }
  if (!profile.documentsReady?.incomeCertificate && item.maxFamilyIncome) {
    prerequisiteAlerts.push("Government Income Certificate required for verification");
  }
  if (!profile.documentsReady?.categoryCertificate && item.targetCategories && !item.targetCategories.includes("General")) {
    prerequisiteAlerts.push("Caste / Community Certificate required");
  }

  const finalScore = Math.min(100, Math.max(0, Math.round(score)));
  const isEligible = unmetReasons.length === 0 || finalScore >= 60;

  return {
    score: finalScore,
    isEligible,
    matchedReasons,
    unmetReasons,
    prerequisiteAlerts
  };
}

export function calculateMatch(item: Scholarship, profile: StudentProfile): number {
  return analyzeMatch(item, profile).score;
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
