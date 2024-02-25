import { Toaster } from "react-hot-toast";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="relative flex flex-col min-w-[calc(100vw-256px)] max-w-[calc(100vw-65px)] w-full">
        <Navbar />
        <main className="p-5 overflow-y-auto h-[calc(100vh-56px)]">
          <Toaster position="top-center" />
          {children}
        </main>
      </div>
    </div>
  );
}
