export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-screen w-screen">
      <div className="w-72 bg-blue-500 p-10 flex flex-col justify-between">
        <p className="font-bold text-white text-xl">SMIT ACADEMY</p>
        <p className="text-white font-semibold">
          SMIT Academy provide professional services for recruiting Sri Lankan
          students to universities in Italy.
        </p>
      </div>
      <div className="flex flex-grow">{children}</div>
    </section>
  );
}
