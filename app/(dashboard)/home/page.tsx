import { title } from "@/components/primitives";

export default async function DashboardHomePage() {
  return (
    <div>
      <h1 className={title({ size: "md" })}>Dashboard</h1>
    </div>
  );
}
