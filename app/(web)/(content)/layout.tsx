import { VGDCnavbar } from "@/components/VGDCnavbar";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <VGDCnavbar />
      <div className="container mx-auto max-w-7xl flex-grow">{children}</div>
    </>
  );
}
