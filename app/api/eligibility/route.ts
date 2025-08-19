import { NextResponse } from "next/server";
import { evaluateEligibility } from "@/lib/eligibility/rules";
import type { EligibilityInput } from "@/types/eligibility";

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<EligibilityInput>;

    // Minimal input checks before evaluating
    const input: EligibilityInput = {
      fullName: String(payload.fullName || "").trim(),
      age: Number(payload.age ?? NaN),
      isNamibianCitizen: Boolean(payload.isNamibianCitizen),
      hasValidID: Boolean(payload.hasValidID),
      region: String(payload.region || "").trim(),
      businessRegistered: Boolean(payload.businessRegistered),
      businessYearsOperating:
        typeof payload.businessYearsOperating === "number"
          ? payload.businessYearsOperating
          : undefined,
    };

    const result = evaluateEligibility(input);
    return NextResponse.json({ ok: true, input, result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Invalid request body." },
      { status: 400 }
    );
  }
}
