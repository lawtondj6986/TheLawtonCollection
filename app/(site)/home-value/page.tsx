import { Container, PageHeader, Rule } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "What is my home worth?",
  description:
    "Ask Michelle Lawton for a real consultation on your home's value, on Cape Cod or the South Shore. No automated estimate, a straight answer from a person.",
  path: "/home-value",
});

export default function HomeValuePage() {
  return (
    <>
      <PageHeader eyebrow="Home value" title="What is my home worth?">
        <p>
          An online estimate can&rsquo;t see your new roof, your old furnace, or your street. Michelle can. Tell
          her a little about the house, and she&rsquo;ll come see it and give you a straight answer on price.
        </p>
      </PageHeader>

      <Container className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,1fr)_30rem] lg:gap-20">
        <div className="order-2 md:order-1">
          <h2 className="text-[2rem]">What happens next</h2>
          <ol className="mt-6 space-y-7">
            {[
              ["Michelle calls or emails you", "At a time that works for your schedule, by phone or email, whichever you prefer."],
              ["She sees the house", "In person when possible. Most of what affects price can't be seen online."],
              ["You get a straight answer", "A fair price range, what would raise it, and what isn't worth the money. No pressure to sell."],
            ].map(([title, body], index) => (
              <li key={title} className="flex gap-5">
                <span className="font-serif text-[2rem] leading-none text-brass-deep">{index + 1}</span>
                <div>
                  <h3 className="text-[1.5rem]">{title}</h3>
                  <p className="mt-1 text-ink/90">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <Rule className="mt-10" />
          <p className="mt-6 max-w-lg text-base text-shingle-deep">
            This is not an online estimate. Michelle gives you a real number after she sees the house and talks
            with you.
          </p>
          <p className="mt-4">
            <a href="/how-it-works#selling" className="link font-semibold">
              See every step of selling a home
            </a>
          </p>
        </div>

        <div className="order-1 border border-line bg-white p-6 sm:p-8 md:order-2">
          <h2 className="text-[1.9rem]">Ask Michelle what your house is worth</h2>
          <div className="mt-6">
            <LeadForm kind="valuation" source="/home-value" submitLabel="Send to Michelle" />
          </div>
        </div>
      </Container>
    </>
  );
}
