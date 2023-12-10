import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar admin={false} />
      <div className="relative flex flex-col flex-grow">
        <Navbar />
        <main className="p-6 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
}
