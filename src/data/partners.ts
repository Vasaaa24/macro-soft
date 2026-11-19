/**
 * Partneri a dopravcovia zobrazení v sekcii „Partneri a dopravcovia“.
 *
 * Doplnenie skutočného loga:
 *  1. Nahrajte súbor (ideálne SVG, prípadne PNG s priehľadným pozadím) do /public/partners,
 *     napr. /public/partners/dhl.svg
 *  2. Pri danom partnerovi doplňte `logo: "/partners/dhl.svg"` (prípadne `height` na vyváženie).
 * Bez vyplneného `logo` sa zobrazí textový zástupný symbol s názvom partnera.
 */

export type Partner = {
  /** Názov partnera – použije sa ako alt text aj ako textový zástupca. */
  name: string;
  /** Cesta k logu v /public, napr. "/partners/dpd.svg". */
  logo?: string;
  /**
   * Výška loga v px (predvolene 36). Slúži na optické vyváženie – široké logá
   * (napr. Cargo Logistics) potrebujú menšiu výšku než kompaktné (napr. DPD).
   */
  height?: number;
  /** Voliteľný odkaz na web partnera. */
  url?: string;
};

export const partners: Partner[] = [
  { name: "Cargo Logistics", logo: "/partners/cargo-logistics.png", height: 26 },
  { name: "DHL", logo: "/partners/dhl.png", height: 36 },
  { name: "DPD", logo: "/partners/dpd.png", height: 44 },
];
