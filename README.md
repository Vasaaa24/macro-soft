# macro SOFT s.r.o. – web-vizitka

Jednostránkový prezentační web firmy **macro SOFT s.r.o.** ([www.macro-soft.eu](https://www.macro-soft.eu)) ve slovenštině.
Nemá backend, formulář ani odesílání e-mailů. Kontakt je jen přes odkazy `tel:` a `mailto:`.

**Stack:** Next.js 16 (App Router, statický export), React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger, SplitText), Lenis, React Bits (přes shadcn CLI), lucide-react.

## Spuštění

Vyžaduje Node.js 20+.

```bash
npm install
npm run dev      # vývojový server na http://localhost:3000
npm run lint     # kontrola ESLint
```

## Export pro hosting

```bash
npm run build
```

Výsledek je ve složce **`out/`**. Celý její obsah nahrajte na jakýkoli webhosting (FTP, Apache, Nginx, Netlify, GitHub Pages…). Server ani Node.js nejsou potřeba.

- Web je nastavený na `trailingSlash: true`, takže stránky se exportují jako `…/index.html`.
- Doporučení: na hostingu zapněte gzip/brotli kompresi a dlouhou cache pro `/_next/static/*` (soubory mají v názvu hash).
- Lokální náhled exportu: `npx serve out`

## Kde co upravit

| Co | Kde |
|---|---|
| Texty webu (pro každý jazyk zvlášť) | `src/i18n/dictionaries/sk.ts`, `en.ts`, `uk.ts` |
| Firemní údaje, kontakty, IBAN, mapa, loga | `src/config/site.ts` |
| Partneři / dopravci | `src/data/partners.ts` |
| Barvy (paleta z loga), písmo | `src/app/globals.css` (`@theme`), `src/lib/fonts.ts` |
| Sekce stránky | `src/components/sections/*` |
| SEO (metadata, hreflang), JSON-LD | `src/lib/metadata.ts`, `src/lib/jsonld.ts` |
| Náhledový obrázek pro sdílení (OG) | `src/lib/og.tsx` (texty v `og` ve slovnících) |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Mapa v kontaktu (OpenStreetMap bez cookies), souřadnice | `company.mapEmbedUrl`, `company.geo` v `src/config/site.ts` |

## Jazyky

Web je ve třech jazycích:

| Jazyk | Adresa | Slovník |
|---|---|---|
| slovenština (výchozí) | `/` | `src/i18n/dictionaries/sk.ts` |
| angličtina | `/en/` | `src/i18n/dictionaries/en.ts` |
| ukrajinština | `/uk/` | `src/i18n/dictionaries/uk.ts` |

- Jazyk se přepíná v hlavičce (na mobilu v menu) a v patičce. Přepínač ukazuje zkratky SK / EN / UA.
- Všechny slovníky mají stejnou strukturu (typ `Dictionary` v `src/i18n/types.ts`). Pokud v některém jazyce chybí text, build skončí chybou.
- Každý jazyk má vlastní `<html lang>`, titulek, popis, odkazy `hreflang`, záznam v `sitemap.xml` a vlastní OG obrázek (`/og.png`, `/en/og.png`, `/uk/og.png`).
- Statický export neumí přesměrovat podle jazyka prohlížeče, proto se na `/` vždy zobrazí slovenština.
- Space Grotesk (písmo loga) nemá azbuku, proto jsou nadpisy v ukrajinštině v písmu Inter.
- Nový jazyk: přidejte kód do `locales` v `src/i18n/config.ts` (a jeho údaje do `localeMeta`), vytvořte slovník a zaregistrujte ho v `src/i18n/index.ts`.

## Logo a favicon

Do složky **`public/`** patří tyto soubory (web je používá beze změn):

| Soubor | Použití |
|---|---|
| `logo.svg`, `logo.png` | logo na světlém pozadí (header po odscrollování); PNG je v JSON-LD |
| `logo-white.svg`, `logo-white.png` | logo na tmavém pozadí (hero, průhledný header, footer); PNG se vloží do OG obrázku |
| `icon.svg`, `icon.png` | favicon a apple-touch-icon |

Rozměry loga (kvůli poměru stran, aby se stránka při načítání neposouvala) jsou v `siteConfig.logos` v `src/config/site.ts`. Pokud mají finální soubory jiný poměr stran než 252 : 64, upravte `width`/`height`.

Poznámky k aktuálním souborům:

- `logo.svg` a `icon.svg` jsou dodané soubory beze změny.
- `logo-white.svg` je odvozený z `logo.svg`: text „macro“ je přebarvený na bílou, kostka a „soft“ zůstaly stejné.
- PNG soubory jsou jen převod formátu z SVG.

Jakmile budete mít oficiální varianty, soubory jednoduše přepište.

## Loga partnerů

1. Logo (ideálně SVG, případně PNG s průhledným pozadím) nahrajte do **`public/partners/`**, např. `public/partners/dhl.svg`.
2. V `src/data/partners.ts` u daného partnera doplňte cestu (a případně odkaz):

```ts
{ name: "DHL", logo: "/partners/dhl.svg", url: "https://www.dhl.com" },
```

Partner bez vyplněného `logo` se zobrazí jako textový zástupný symbol se svým názvem. Partnera přidáte nebo odeberete úpravou pole `partners`.

Loga mají velmi rozdílné proporce: Cargo Logistics je široké, DPD kompaktní. Při stejné výšce by proto působila nevyváženě. Každý partner má v `partners.ts` volitelnou `height` (výška v px, výchozí 36), kterou se loga opticky vyrovnají. Soubory v `public/partners/` mají oříznuté okraje. Pokud nahrajete logo s bílým okrajem kolem, bude v pásu menší.

## React Bits komponenty

Komponenty se instalují přes shadcn CLI z registry `@react-bits` (nastavené v `components.json`) a leží v `src/components/ui/`:

| Komponenta | Použití |
|---|---|
| `SplitText` | animovaný nadpis v hero |
| `ShapeGrid` | jemná animovaná mřížka na pozadí hero (načítá se až v nečinnosti prohlížeče) |
| `SpotlightCard` | karty v sekci „Ponúkame“ |
| `LogoLoop` | pás log partnerů (načítá se až při přiblížení sekce) |

Další komponentu přidáte příkazem `npx shadcn@latest add @react-bits/<Název>-TS-TW`. shadcn MCP server pro vyhledávání komponent je nastavený v `.mcp.json`.

Proti originálu z registry jsou v komponentách drobné úpravy: zápis do refu přesunutý z renderu do `useLayoutEffect` (pravidlo `react-hooks/refs`) a prop `id` u `SplitText`.

## Animace a přístupnost

- Lenis je napojený na GSAP ScrollTrigger podle README Lenisu (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker`, `lagSmoothing(0)`). Viz `src/components/providers/SmoothScroll.tsx`.
- Při `prefers-reduced-motion: reduce` se Lenis nespustí a animace odhalení (`gsap.matchMedia()`) se vypnou. Obsah je pak hned viditelný.
- Animuje se jen `transform` a `opacity`. Obsah hero je viditelný okamžitě, animuje se pouze nadpis.
- Web má skip-link, sémantické sekce s `aria-labelledby`, viditelné focus stavy a po kliknutí na kotvu se fokus přesune na cílovou sekci.
