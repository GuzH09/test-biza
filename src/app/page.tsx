import CachedHomeContent from "@/app/components/CachedHomeContent";
import HomeClient from "@/app/components/HomeClient";

/**
 * Server Component - Home page
 * This is a server component that renders the client component
 * We could add cache directives here if needed, but since we're using
 * client-side localStorage, this page should be dynamic
 */
export default function Home() {
  return (
    <HomeClient>
      <CachedHomeContent />
    </HomeClient>
  );
}
