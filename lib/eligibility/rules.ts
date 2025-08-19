import type { EligibilityInput, EligibilityResult } from "@/types/eligibility";

export function evaluateEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: string[] = [];
  const nextSteps: string[] = [];

  // Rule 1: Youth age bracket (example: 18–35 inclusive)
  if (isNaN(input.age) || input.age < 18 || input.age > 35) {
    reasons.push("Applicant must be between 18 and 35 years old.");
    nextSteps.push("Confirm date of birth and provide a copy of ID.");
  }

  // Rule 2: Citizenship
  if (!input.isNamibianCitizen) {
    reasons.push("Applicant must be a Namibian citizen.");
    nextSteps.push("Provide proof of Namibian citizenship.");
  }

  // Rule 3: Valid ID
  if (!input.hasValidID) {
    reasons.push("Valid Namibian ID or passport is required.");
    nextSteps.push("Upload a clear scan of your valid ID/passport.");
  }

  // Rule 4: Region provided
  if (!input.region || input.region.trim().length < 2) {
    reasons.push("Region is required.");
    nextSteps.push("Select your region of residence.");
  }

  // Rule 5: Business criteria (example policy: registered and <= 5 years operating)
  if (!input.businessRegistered) {
    reasons.push("Business must be registered (CC/Pty/Licence as applicable).");
    nextSteps.push("Register your business or provide municipal trade licence.");
  }

  if (
    typeof input.businessYearsOperating === "number" &&
    input.businessYearsOperating > 5
  ) {
    reasons.push("Business must generally be <= 5 years old at time of application.");
    nextSteps.push("If older than 5 years, provide justification or growth plan.");
  }

  const eligible = reasons.length === 0;
  const summary = eligible
    ? "Eligible — You meet baseline requirements."
    : "Not Eligible — See reasons and next steps.";

  // De-duplicate next steps
  const uniqueNext = Array.from(new Set(nextSteps));

  return {
    eligible,
    reasons,
    summary,
    nextSteps: uniqueNext.length ? uniqueNext : ["Proceed to application."],
  };
}
