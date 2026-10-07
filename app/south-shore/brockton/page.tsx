import { PlacePage } from "@/components/PlacePage";
import { brockton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Brockton",
  description:
    "Buying or selling in Brockton? First homes, two- and three-families, and family estates, with straight advice from Michelle Lawton, CENTURY 21 North East.",
  path: brockton.path,
});

export default function BrocktonPage() {
  return <PlacePage place={brockton} />;
}
