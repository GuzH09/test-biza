import CachedHomeContent from "@/app/components/CachedHomeContent";
import HomeClient from "@/app/components/HomeClient";

/**
 * Server Component - Home page
 * This is a server component that renders a client component using donut-pattern
 * Inside the client component, we have a cached component that passes as children
 */
export default function Home() {
  return (
    <HomeClient>
      <CachedHomeContent />
    </HomeClient>
  );
}

