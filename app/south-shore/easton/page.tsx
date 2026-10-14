import { PlacePage } from "@/components/PlacePage";
import { easton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Easton, South Shore",
  description:
    "Easton homes for sale and local notes from Michelle Lawton, real estate agent for Easton and Greater Brockton. North Easton, South Easton, and nearby.",
  path: easton.path,
});

export default function EastonPage() {
  return <PlacePage place={easton} />;
}
