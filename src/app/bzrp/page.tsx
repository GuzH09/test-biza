import BzrpClient from "../components/BzrpClient";

/**
 * Server Component - Bzrp access page
 * This is a server component that renders the client component
 * Since authentication is client-side (localStorage), this should be dynamic
 */
export default function BzrpPage() {
  return <BzrpClient />;
}
