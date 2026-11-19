import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { company, footer, nav } = siteConfig;
  // Rok sa doplní pri builde (statický export).
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-2 text-white/70">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo variant="light" className="h-12" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{footer.tagline}</p>
          </div>

          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-white">{company.legalName}</p>
            <p className="mt-2">
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city} – {company.address.district}
            </p>
            <p className="mt-2">
              {siteConfig.contact.labels.ico}: {company.ico}
              <br />
              {siteConfig.contact.labels.dic}: {company.dic}
            </p>
          </div>

          <div className="text-sm leading-relaxed">
            <p>
              <a href={company.phone.href} className="rounded hover:text-brand-light">
                {company.phone.display}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${company.email}`} className="rounded break-all hover:text-brand-light">
                {company.email}
              </a>
            </p>
            <nav aria-label={siteConfig.a11y.footerNav} className="mt-5">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="rounded hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName} {footer.rights}
          </p>
          <p>{siteConfig.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
