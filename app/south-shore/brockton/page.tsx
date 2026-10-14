import { PlacePage } from "@/components/PlacePage";
import { brockton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Brockton, South Shore",
  description:
    "Brockton homes for sale and local notes from Michelle Lawton, real estate agent for Greater Brockton. First homes, two- and three-families, family estates.",
  path: brockton.path,
});

export default function BrocktonPage() {
  return <PlacePage place={brockton} />;
}
