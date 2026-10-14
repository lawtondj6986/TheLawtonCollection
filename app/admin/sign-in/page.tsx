import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/auth";
import { SignInForm } from "@/components/admin/SignInForm";
import { Monogram } from "@/components/Monogram";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };

export default async function SignInPage() {
  if (await getSession()) redirect("/admin");
  return (
    <div className="mx-auto w-full max-w-md px-5 py-14 sm:py-20">
      <Monogram className="h-14 w-auto text-navy" />
      <h1 className="mt-6 text-[2.4rem]">Command center</h1>
      <p className="mt-2 text-ink/90">Sign in to see leads and sign-ups. No password: we email you a code.</p>
      <div className="mt-8">
        <SignInForm />
      </div>
    </div>
  );
}
