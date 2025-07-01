import dynamic from "next/dynamic";

const AnalyticsDashboard = dynamic(
  () => import("@/components/AnalyticsDashboard"),
  { ssr: false } // Disable server-side rendering
);

export default function DashboardPage() {
  return <AnalyticsDashboard />;
}
