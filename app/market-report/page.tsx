import { Container, PageHeader } from "@/components/ui";
import { SubscribeForm } from "@/components/SubscribeForm";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Market letter",
  description:
    "Michelle Lawton's market letter for Cape Cod and the South Shore is in preparation. Leave your email to receive the first one.",
  path: "/market-report",
});

export default function MarketReportPage() {
  return (
    <>
      <PageHeader eyebrow="Market letter" title="The letter is in preparation.">
        <p>
          A short, plain-spoken letter on Cape Cod and the South Shore: what sold, what sat, and what it means if you
          are thinking about a move. The first issue is being written now. Leave your email and it will come to you
          when it is ready.
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
