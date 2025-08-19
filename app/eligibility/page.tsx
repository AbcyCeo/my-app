"use client";
import { useState } from "react";

type FormState = {
  fullName: string;
  age: string;
  isNamibianCitizen: boolean;
  hasValidID: boolean;
  region: string;
  businessRegistered: boolean;
  businessYearsOperating: string;
};

export default function EligibilityPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    age: "",
    isNamibianCitizen: true,
    hasValidID: false,
    region: "",
    businessRegistered: false,
    businessYearsOperating: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkEligibility(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          age: Number(form.age),
          isNamibianCitizen: form.isNamibianCitizen,
          hasValidID: form.hasValidID,
          region: form.region,
          businessRegistered: form.businessRegistered,
          businessYearsOperating:
            form.businessYearsOperating.trim() === ""
              ? undefined
              : Number(form.businessYearsOperating),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to evaluate eligibility.");
      }
      setResponse(data);
    } catch (err: any) {
      setError(err?.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold">Eligibility Check (NYDF)</h1>
        <p className="mt-3 text-gray-700">
          Answer the questions below to see if you meet the baseline requirements.
        </p>

        <form onSubmit={checkEligibility} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isNamibianCitizen}
                onChange={(e) =>
                  setForm({ ...form, isNamibianCitizen: e.target.checked })
                }
              />
              Namibian Citizen
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.hasValidID}
                onChange={(e) =>
                  setForm({ ...form, hasValidID: e.target.checked })
                }
              />
              Has Valid ID/Passport
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.businessRegistered}
                onChange={(e) =>
                  setForm({ ...form, businessRegistered: e.target.checked })
                }
              />
              Business Registered
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Region</label>
            <input
              className="mt-1 w-full rounded-md border px-3 py-2"
              placeholder="e.g., Khomas"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Years in Operation (optional)
            </label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-md border px-3 py-2"
              value={form.businessYearsOperating}
              onChange={(e) =>
                setForm({ ...form, businessYearsOperating: e.target.value })
              }
              placeholder="e.g., 2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md border px-4 py-2"
          >
            {loading ? "Checking..." : "Check Eligibility"}
          </button>
        </form>

        {error && (
          <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-4">
            <p className="font-medium">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {response && (
          <div className="mt-6 rounded-md border p-4">
            <p className="text-sm text-gray-600">
              Summary: {response.result.summary}
            </p>
            <p className="mt-2 font-medium">
              Eligible: {response.result.eligible ? "Yes" : "No"}
            </p>

            {response.result.reasons?.length > 0 && (
              <>
                <h3 className="mt-4 font-semibold">Reasons</h3>
                <ul className="list-disc pl-6">
                  {response.result.reasons.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {response.result.nextSteps?.length > 0 && (
              <>
                <h3 className="mt-4 font-semibold">Next Steps</h3>
                <ul className="list-disc pl-6">
                  {response.result.nextSteps.map((n: string, i: number) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
