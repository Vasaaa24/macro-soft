import {
  Cable,
  Cctv,
  Cpu,
  FileText,
  Globe,
  RadioTower,
  Search,
  Server,
  ShieldCheck,
  Stamp,
  Truck,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/config/site";

const icons: Record<IconName, LucideIcon> = {
  search: Search,
  shield: ShieldCheck,
  truck: Truck,
  cpu: Cpu,
  cable: Cable,
  cctv: Cctv,
  radio: RadioTower,
  server: Server,
  file: FileText,
  globe: Globe,
  stamp: Stamp,
};

type IconProps = LucideProps & { name: IconName };

/** Dekoratívna ikona podľa názvu z konfigurácie (pre čítačky skrytá). */
export function Icon({ name, ...props }: IconProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" focusable="false" strokeWidth={1.75} {...props} />;
}
