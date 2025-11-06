"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateAccessCode } from "@/app/actions";

/**
 * Client component for the bzrp access page
 * Shows a form to enter the 3-digit code
 * Must check localStorage and redirect if already authenticated
 */
export default function BzrpClient() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already authenticated - redirect to home
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("bzrp-access");
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.expires && parsed.expires > Date.now()) {
            router.push("/");
            return;
          } else {
            localStorage.removeItem("bzrp-access");
          }
        }
      } catch {
        // Invalid data, remove it
        localStorage.removeItem("bzrp-access");
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await validateAccessCode(code);

      if (result.success && result.expires) {
        localStorage.setItem(
          "bzrp-access",
          JSON.stringify({
            authenticated: true,
            expires: result.expires,
          }),
        );
        router.push("/");
      } else {
        setError("Invalid code. Please try again.");
        setCode("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center gap-6 p-8">
        <h1 className="text-3xl font-bold">Bizarrap Access</h1>
        <p className="text-lg">Enter the 3-digit access code</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 3);
              setCode(value);
              setError("");
            }}
            placeholder="000"
            maxLength={3}
            className="rounded border border-gray-300 px-4 py-2 text-center text-2xl tracking-widest"
            disabled={isSubmitting}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={code.length !== 3 || isSubmitting}
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Validating..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
