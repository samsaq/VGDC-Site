import { Navbar } from "@/components/navbar";

// Content pages fill the viewport below the navbar and handle their own
// internal scrolling.
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
