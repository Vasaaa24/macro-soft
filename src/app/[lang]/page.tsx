import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { isLocale } from "@/i18n/config";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage locale={lang} />;
}
