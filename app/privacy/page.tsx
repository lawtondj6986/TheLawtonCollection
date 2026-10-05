import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How Michelle Lawton's website collects and uses the information you send.",
  path: "/privacy",
});

const sections: [string, string[]][] = [
  [
    "What this site collects",
    [
      "When you send a form, the site stores what you typed: your name, phone, email, town, timing, notes, and which page you sent it from.",
      "To limit spam, the site keeps a one-way scrambled version (a hash) of your internet address for a short window. Your actual IP address is not stored.",
    ],
  ],
  [
    "How it is used",
    [
      "Only to reply to you and to help with the real estate question you asked. Your information is never sold or rented to anyone.",
      "If you check the market letter box, your email is added to that list. The box is never checked for you.",
    ],
  ],
  [
    "Who handles it",
    [
      "Form submissions are stored with Supabase, and notification emails are sent through Resend. Both act only as service providers for this site.",
      "The site does not use advertising trackers.",
    ],
  ],
  [
    "Your choices",
    [
      "To unsubscribe from the market letter, reply to any letter or send a note through the contact page.",
      "To see, correct, or delete what you have sent, send a note through the contact page and Michelle will take care of it.",
    ],
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Your information, plainly">
        <p>
          This is the website of {site.name}, {site.brand}. Here is what happens to the information you send through it.
        </p>
      </PageHeader>
      <Container>
        <div className="max-w-2xl space-y-10">
          {sections.map(([title, paragraphs]) => (
            <section key={title}>
              <h2 className="text-[1.9rem]">{title}</h2>
              <div className="prose-quiet mt-3 text-ink/90">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="text-[0.95rem] text-shingle-deep">
            Questions? <Link href="/contact" className="link">Contact Michelle</Link>. Real estate services are provided
            through {site.brokerage}.
          </p>
        </div>
      </Container>
    </>
  );
}
