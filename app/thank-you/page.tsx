import { Container, ButtonLink, Rule } from "@/components/ui";
import { Monogram } from "@/components/Monogram";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Thank you",
  description: "Your note reached Michelle Lawton.",
  path: "/thank-you",
  noIndex: true,
});

const copy: Record<string, { title: string; body: string }> = {
  valuation: {
    title: "Thank you. Michelle has your request.",
    body: "She will reach out to set up a time to talk about the house. No automated estimate is coming; you will hear from a person.",
  },
  letter: {
    title: "You're on the list.",
    body: "The first market update is being written now. It will come to your inbox when it's ready, and you can stop it any time.",
  },
  default: {
    title: "Thank you. Your note reached Michelle.",
    body: "She reads every message herself and will get back to you by phone or email.",
  },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const { title, body } = copy[from ?? ""] ?? copy.default;

  return (
    <Container className="py-20 text-center sm:py-28">
      <Monogram className="mx-auto h-16 w-auto text-navy" />
      <h1 className="mx-auto mt-8 max-w-2xl text-[2.6rem] sm:text-5xl">{title}</h1>
      <Rule className="mx-auto mt-7" />
      <p className="mx-auto mt-7 max-w-xl text-lg text-ink/90">{body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="secondary">Back to home</ButtonLink>
        <ButtonLink href="/collection" variant="secondary">See homes for sale</ButtonLink>
      </div>
    </Container>
  );
}
