import { Container, ButtonLink, Rule } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-5xl">That page isn&rsquo;t here.</h1>
      <Rule className="mx-auto mt-7" />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Talk with Michelle</ButtonLink>
      </div>
    </Container>
  );
}
