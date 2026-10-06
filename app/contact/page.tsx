import { Container, PageHeader } from "@/components/ui";
import { Monogram } from "@/components/Monogram";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta } from "@/lib/metadata";
import { mailHref, site, telHref } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: "Talk with Michelle Lawton about buying or selling on Cape Cod or the South Shore.",
  path: "/contact",
});

// Card pair after public/brand/05-family-card.jpg: cream front, navy back.
function Cards() {
  return (
    <div className="grid max-w-md gap-5">
      <div className="flex aspect-[7/4] flex-col items-center justify-center border border-line bg-[#fbf9f4] px-5 text-center text-navy">
        <Monogram className="h-12 w-auto" />
        <p className="mt-3 font-serif text-[1.6rem] leading-none tracking-[0.12em] uppercase">{site.name}</p>
        <p className="mt-1.5 font-serif text-[1rem] italic">{site.brand}</p>
        <span aria-hidden className="mt-2.5 block h-px w-36 bg-navy/60" />
        <p className="mt-2.5 text-[0.72rem] tracking-[0.16em] uppercase">Cape Cod &amp; the South Shore</p>
        <p className="mt-1 font-serif text-[0.95rem] italic">Brockton native</p>
      </div>
      <div className="flex aspect-[7/4] flex-col items-center justify-center bg-navy px-5 text-center text-salt">
        <p className="font-serif text-[2rem] leading-none tracking-[0.14em] uppercase">Real estate</p>
        <span aria-hidden className="mt-3 block h-px w-16 bg-brass" />
        <a href={telHref} className="mt-3 text-[1.1rem] tracking-wide text-salt select-text hover:underline">
          {site.phone}
        </a>
        <p className="mt-3 font-serif text-[1.35rem] text-salt/90 italic">Here when you are ready.</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk with Michelle">
        <p>
          Buying, selling, both, or just a question. Send a note and Michelle will get back to you herself, by phone
          or email, whichever you prefer.
        </p>
      </PageHeader>

      <Container className="grid gap-14 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_26rem] lg:gap-20">
        <div>
          <section aria-labelledby="direct" className="mb-8 border-l-2 border-brass pl-5">
            <h2 id="direct" className="text-[1.9rem]">Call or email. Michelle answers.</h2>
            <p className="mt-3 flex flex-col gap-1 text-lg sm:flex-row sm:flex-wrap sm:gap-x-8">
              <a href={telHref} className="link font-semibold select-text">
                {site.phone}
              </a>
              <a href={mailHref} className="link break-all select-text">
                {site.email}
              </a>
            </p>
          </section>
          <div className="border border-line bg-white p-6 sm:p-8">
            <LeadForm kind="contact" source="/contact" />
          </div>
        </div>
        <aside aria-label="Michelle's card" className="space-y-8">
          <Cards />
          <div className="space-y-1 text-ink/85">
            <p className="font-semibold text-navy">
              {site.title}, {site.brokerage}
            </p>
            <address className="not-italic">
              {site.office.street}
              <br />
              {site.office.city}, {site.office.region} {site.office.postalCode}
            </address>
            <p className="pt-2">Working on Cape Cod and across the South Shore.</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
