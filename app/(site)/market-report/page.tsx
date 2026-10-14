import { Container, PageHeader } from "@/components/ui";
import { SubscribeForm } from "@/components/SubscribeForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Market update",
  description:
    "Michelle Lawton's market update for Cape Cod and the South Shore is being written now. Leave your email to get the first one.",
  path: "/market-report",
});

export default function MarketReportPage() {
  return (
    <>
      <PageHeader eyebrow="Market update" title="The first update is being written now.">
        <p>
          A short email about Cape Cod and the South Shore: what sold, what didn&rsquo;t, and what it means if you&rsquo;re
          thinking about a move. Leave your email and it will come to you when it&rsquo;s ready.
        </p>
      </PageHeader>
      <Container>
        <div className="max-w-xl border border-line bg-white p-6 sm:p-8">
          <SubscribeForm source="/market-report" />
        </div>
      </Container>
    </>
  );
}
