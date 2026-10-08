import { PlacePage } from "@/components/PlacePage";
import { easton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Easton, South Shore",
  description:
    "Buying or selling in North Easton or South Easton? Local notes and straight advice from Michelle Lawton, CENTURY 21 North East.",
  path: easton.path,
});

export default function EastonPage() {
  return <PlacePage place={easton} />;
}
