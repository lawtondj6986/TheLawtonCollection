import { Container, PageHeader, ButtonLink } from "@/components/ui";
import { buyingSteps, sellingSteps, type Step } from "@/content/steps";
import { pageMeta } from "@/lib/metadata";
import { site, telHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "How buying and selling works",
  description:
    "The steps to buying or selling a home in Massachusetts, in plain English, from your first call to the closing table.",
  path: "/how-it-works",
});

function Steps({ id, title, intro, steps }: { id: string; title: string; intro: string; steps: Step[] }) {
  return (
    <section aria-labelledby={id} className="border border-line bg-white p-6 sm:p-9">
      <h2 id={id} className="text-[2.2rem]">{title}</h2>
      <p className="mt-2 text-ink/90">{intro}</p>
      <ol className="mt-8 space-y-7">
        {steps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
            <span aria-hidden className="font-serif text-[2rem] leading-none text-brass-deep">
              {index + 1}
            </span>
            <div>
              <h3 className="text-[1.5rem] leading-snug">{step.title}</h3>
              <p className="mt-1 text-ink/90">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="How it works" title="Buying or selling, step by step">
        <p>
          Here is what usually happens, from the first call to the closing table. Every sale is a little different,
          and Michelle walks you through each step as it comes.
        </p>
      </PageHeader>

      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Steps id="buying" title="Buying a home" intro="Especially helpful if it's your first." steps={buyingSteps} />
        <Steps id="selling" title="Selling a home" intro="Including a parent's house or a longtime family home." steps={sellingSteps} />
      </Container>

      <Container className="mt-12">
        <p className="max-w-2xl text-base text-shingle-deep">
          This page is general information, not legal advice. Your attorney and lender will explain the details that
          apply to you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
          <ButtonLink href="/home-value" variant="secondary">
            What is my home worth?
          </ButtonLink>
          <a href={telHref} className="text-lg font-semibold text-navy underline decoration-brass underline-offset-4">
            or call {site.phone}
          </a>
        </div>
      </Container>
    </>
  );
}
