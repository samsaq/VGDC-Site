import { VGDCnavbar } from "@/components/VGDCnavbar";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <VGDCnavbar />
      <div className="container min-h-full min-w-full flex-grow">
        {children}
      </div>
    </>
  );
}
