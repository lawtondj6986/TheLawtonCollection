import { PlacePage } from "@/components/PlacePage";
import { brockton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Brockton",
  description:
    "Buying or selling in Brockton? Michelle Lawton grew up here. First homes, multi-families, and family estates, with straight advice.",
  path: brockton.path,
});

export default function BrocktonPage() {
  return <PlacePage place={brockton} />;
}
