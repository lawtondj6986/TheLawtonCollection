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
          An online estimate can&rsquo;t see your new roof, your old furnace, or the street you are on. Michelle
          can. Tell her a little about the house and she will set up a conversation, look at the home with you, and
          give you a straight read on price and timing.
        </p>
      </PageHeader>

      <Container className="grid gap-14 md:grid-cols-[1fr_30rem] lg:gap-20">
        <div className="order-2 md:order-1">
          <h2 className="text-[2rem]">What happens next</h2>
          <ol className="mt-6 space-y-7">
            {[
              ["Michelle calls or emails you", "At a time that works for your schedule, by phone or email, whichever you prefer."],
              ["She sees the house", "In person when possible. The things that move price are rarely visible online."],
              ["You get a straight answer", "A realistic price range, what would raise it, and what isn't worth spending on. No pressure to list."],
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
            This is a consultation request, not an automated valuation. Nothing on this site will show you an
            estimated value; that comes from a conversation.
          </p>
        </div>

        <div className="order-1 border border-line bg-white p-6 sm:p-8 md:order-2">
          <h2 className="text-[1.9rem]">Request a consultation</h2>
          <div className="mt-6">
            <LeadForm kind="valuation" source="/home-value" submitLabel="Request a consultation" />
          </div>
        </div>
      </Container>
    </>
  );
}
