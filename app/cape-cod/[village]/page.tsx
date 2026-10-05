import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlacePage } from "@/components/PlacePage";
import { villages } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

type Params = { village: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return villages.map((village) => ({ village: village.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { village: slug } = await params;
  const village = villages.find((v) => v.slug === slug);
  if (!village) return {};
  return pageMeta({
    title: `${village.name}, Falmouth`,
    description: `${village.summary} A local note from Michelle Lawton, and a direct line to ask about homes in ${village.name}.`,
    path: village.path,
  });
}

export default async function VillagePage({ params }: { params: Promise<Params> }) {
  const { village: slug } = await params;
  const village = villages.find((v) => v.slug === slug);
  if (!village) notFound();
  return <PlacePage place={village} />;
}
