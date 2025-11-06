"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Client component for the home page
 * Checks localStorage and redirects if not authenticated
 * This must be a client component because localStorage is only available in the browser
 */
export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for authentication
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("bzrp-access");
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.expires && parsed.expires > Date.now()) {
            setIsAuthenticated(true);
            return;
          } else {
            localStorage.removeItem("bzrp-access");
          }
        }
        router.push("/bzrp");
      } catch {
        // Invalid data or error reading localStorage
        localStorage.removeItem("bzrp-access");
        router.push("/bzrp");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
