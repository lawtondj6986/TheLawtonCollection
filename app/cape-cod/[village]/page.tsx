import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlacePage } from "@/components/PlacePage";
import { capePlaces } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

type Params = { village: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return capePlaces.map((place) => ({ village: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { village: slug } = await params;
  const village = capePlaces.find((v) => v.slug === slug);
  if (!village) return {};
  return pageMeta({
    title: village.town === village.name ? `${village.name}, Cape Cod` : `${village.name}, ${village.town}`,
    description: `${village.summary} Local notes and straight advice from Michelle Lawton.`,
    path: village.path,
  });
}

export default async function VillagePage({ params }: { params: Promise<Params> }) {
  const { village: slug } = await params;
  const village = capePlaces.find((v) => v.slug === slug);
  if (!village) notFound();
  return <PlacePage place={village} />;
}
