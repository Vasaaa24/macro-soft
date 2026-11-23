import { SiteDocument } from "@/components/SiteDocument";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";

/** Slovenčina – predvolený jazyk na koreňovej adrese (/). */
export const metadata = buildMetadata("sk");

export default function SlovakLayout({ children }: LayoutProps<"/">) {
  return <SiteDocument locale="sk">{children}</SiteDocument>;
}
