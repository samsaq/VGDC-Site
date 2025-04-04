import { VGDCnavbar } from "@/components/VGDCnavbar";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <VGDCnavbar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
