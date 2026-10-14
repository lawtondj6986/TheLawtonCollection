import { Container, PageHeader, ButtonLink } from "@/components/ui";
import { buyingSteps, sellingSteps, type Step } from "@/content/steps";
import { pageMeta } from "@/lib/metadata";
import { site, telHref } from "@/lib/site";
import { Monogram } from "@/components/Monogram";
import { PrintButton } from "@/components/PrintButton";

export const metadata = pageMeta({
  title: "How buying and selling works",
  description:
    "The steps to buying or selling a home in Massachusetts, in plain English, from your first call to the closing table.",
  path: "/how-it-works",
});

function Steps({ id, title, intro, steps }: { id: string; title: string; intro: string; steps: Step[] }) {
  return (
    <section aria-labelledby={id} className="border border-line bg-white p-6 sm:p-9 print:border-0 print:p-0">
      <h2 id={id} className="text-[2.2rem] print:text-[17pt]">{title}</h2>
      <p className="mt-2 text-ink/90 print:mt-0.5 print:text-[9.5pt]">{intro}</p>
      <ol className="mt-8 space-y-7 print:mt-2 print:space-y-1.5">
        {steps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 print:grid-cols-[1.4rem_minmax(0,1fr)] print:gap-x-1.5 print:break-inside-avoid">
            <span aria-hidden className="font-serif text-[2rem] leading-none text-brass-deep print:text-[14pt]">
              {index + 1}
            </span>
            <div>
              <h3 className="text-[1.5rem] leading-tight print:text-[12pt]">{step.title}</h3>
              <p className="mt-1 text-ink/90 print:mt-0 print:text-[10pt] print:leading-snug">{step.body}</p>
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
      {/* Printed handout header: who to call, on every printed copy. */}
      <div className="hidden print:flex print:items-center print:gap-5 print:border-b print:border-brass print:px-0 print:pb-4">
        <Monogram className="h-14 w-auto text-navy" />
        <div className="text-[12pt] leading-snug">
          <p className="font-serif text-[18pt] text-navy">{site.name}</p>
          <p>
            {site.title}, {site.brokerage}
          </p>
          <p>
            {site.phone} · {site.email} · {site.url.replace("https://", "")}
          </p>
        </div>
      </div>
      <PageHeader eyebrow="How it works" title="Buying or selling, step by step">
        <p>
          Here is what usually happens, from the first call to the closing table. Every sale is a little different,
          and Michelle walks you through each step as it comes.
        </p>
      </PageHeader>

      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-2 print:grid-cols-2 print:gap-6 print:px-0">
        <Steps id="buying" title="Buying a home" intro="Especially helpful if it's your first." steps={buyingSteps} />
        <Steps id="selling" title="Selling a home" intro="Including a parent's house or a longtime family home." steps={sellingSteps} />
      </Container>

      <Container className="mt-12 print:mt-4 print:px-0">
        <p className="max-w-2xl text-base text-shingle-deep print:max-w-none print:text-[8.5pt]">
          This page is general information, not legal advice. Your attorney and lender will explain the details that
          apply to you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 print:hidden">
          <ButtonLink href="/contact">Talk with Michelle</ButtonLink>
          <PrintButton label="Print as a handout" />
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
