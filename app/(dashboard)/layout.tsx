import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen max-w-screen h-screen w-screen border border-blue box-border">
      <Sidebar />
      <div className="relative flex flex-col w-full">
        <Navbar />
        <main className="p-5 h-[calc(100vh-64px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
