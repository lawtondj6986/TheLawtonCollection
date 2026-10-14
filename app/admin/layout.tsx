import Link from "next/link";
import { getSession } from "@/lib/admin/auth";
import { Monogram } from "@/components/Monogram";
import { signOut } from "./actions";

export const metadata = {
  title: { default: "Command center", template: "%s · Command center" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Leads" },
  { href: "/admin/subscribers", label: "Sign-ups" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      <header className="bg-navy text-salt">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Monogram className="h-9 w-auto text-brass" />
            <span className="font-serif text-[1.35rem] leading-none">Command center</span>
          </Link>
          {session ? (
            <nav aria-label="Command center" className="flex items-center gap-x-6 text-[1.05rem]">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="font-semibold text-salt hover:underline">
                  {item.label}
                </Link>
              ))}
              <form action={signOut}>
                <button type="submit" className="text-salt/80 hover:text-salt hover:underline">
                  Sign out
                </button>
              </form>
            </nav>
          ) : null}
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="mx-auto w-full max-w-6xl px-5 py-8 text-base text-shingle-deep sm:px-8">
        {session ? <p>Signed in as {session.email}.</p> : null}
        <p>
          <Link href="/" className="link">
            Back to the website
          </Link>
        </p>
      </footer>
    </>
  );
}
