export default function DahboardHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="">
        {children}
      </div>
    </section>
  );
}
