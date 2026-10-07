import { PlacePage } from "@/components/PlacePage";
import { easton } from "@/content/places";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Easton",
  description:
    "Buying or selling in Easton, North Easton, or South Easton? Michelle Lawton, Broker Associate with CENTURY 21 North East, gives straight advice on homes in Easton and Greater Brockton.",
  path: easton.path,
});

export default function EastonPage() {
  return <PlacePage place={easton} />;
}
