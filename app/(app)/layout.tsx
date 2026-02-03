import NavBar from "@/ui/Navigation/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main className="p-4">{children}</main>
    </div>
  );
}
