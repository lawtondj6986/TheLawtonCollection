import { Container, PageHeader } from "@/components/ui";
import { Monogram } from "@/components/Monogram";
import { LeadForm } from "@/components/LeadForm";
import { Headshot } from "@/components/Headshot";
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
      <div className="flex flex-col items-center justify-center border border-line bg-[#fbf9f4] px-4 py-7 text-center text-navy sm:aspect-[7/4] sm:px-5 sm:py-0">
        <Monogram className="h-12 w-auto" />
        <p className="mt-3 font-serif text-[1.3rem] leading-none tracking-[0.1em] uppercase sm:text-[1.6rem] sm:tracking-[0.12em]">{site.name}</p>
        <p className="mt-1.5 font-serif text-[1rem] italic">{site.brand}</p>
        <span aria-hidden className="mt-2.5 block h-px w-36 bg-navy/60" />
        <p className="mt-2.5 text-[0.75rem] tracking-[0.1em] uppercase sm:text-[0.8rem] sm:tracking-[0.16em]">Cape Cod &amp; the South Shore</p>
        <p className="mt-1 font-serif text-base italic">{site.native}</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-navy px-4 py-8 text-center text-salt sm:aspect-[7/4] sm:px-5 sm:py-0">
        <p className="font-serif text-[1.6rem] leading-none tracking-[0.12em] uppercase sm:text-[2rem] sm:tracking-[0.14em]">Real estate</p>
        <span aria-hidden className="mt-3 block h-px w-16 bg-brass" />
        <a href={telHref} className="mt-3 text-[1.1rem] tracking-wide text-salt select-text hover:underline">
          {site.phone}
        </a>
        <p className="mt-3 font-serif text-[1.15rem] text-salt/90 italic sm:text-[1.35rem]">Here when you are ready.</p>
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

      <Container className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,1fr)_20rem] lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
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
            <p className="mt-3">
              <a href="/michelle-lawton.vcf" download className="inline-flex items-center gap-2 font-semibold text-navy">
                <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-none stroke-brass-deep" strokeWidth="1.8">
                  <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="border-b border-brass">Save Michelle&rsquo;s contact to your phone</span>
              </a>
            </p>
          </section>
          <div className="border border-line bg-white p-6 sm:p-8">
            <LeadForm kind="contact" source="/contact" />
          </div>
        </div>
        <aside aria-label="Michelle's card" className="space-y-8">
          <figure className="flex items-center gap-5">
            <Headshot className="w-28 shrink-0" />
            <figcaption className="text-base text-ink/90">
              <span className="font-serif text-[1.6rem] leading-tight text-navy">{site.name}</span>
              <br />
              Michelle answers her own phone.
            </figcaption>
          </figure>
          <Cards />
          <div className="space-y-1 text-ink/90">
            <p className="font-semibold text-navy">
              {site.title}, {site.brokerage}
            </p>
            <p>Falmouth and the Upper Cape. Easton and Greater Brockton.</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
