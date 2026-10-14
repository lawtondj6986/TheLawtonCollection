import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallBar } from "@/components/CallBar";

// The public site's chrome. The admin area under /admin has its own.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      <Footer />
      <CallBar />
    </>
  );
}
