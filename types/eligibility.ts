export type EligibilityInput = {
  fullName: string;
  age: number;
  isNamibianCitizen: boolean;
  hasValidID: boolean;
  region: string;
  businessRegistered: boolean;
  businessYearsOperating?: number; // optional
};

export type EligibilityResult = {
  eligible: boolean;
  reasons: string[];
  summary: string;
  nextSteps: string[];
};
