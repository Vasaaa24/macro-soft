"use client";

import dynamic from "next/dynamic";
import { useWhenIdle } from "@/lib/useWhenIdle";

// Canvas pozadie sa načíta až na klientovi, keď je prehliadač nečinný – nespomaľuje prvé vykreslenie.
const ShapeGrid = dynamic(() => import("@/components/ui/ShapeGrid"), { ssr: false });

export function HeroBackground() {
  const idle = useWhenIdle();
  if (!idle) return null;

  return (
    <ShapeGrid
      shape="square"
      cellSize={56}
      lineWidth={1}
      direction="diagonal"
      speed={0.2}
      lineColor="rgba(255, 255, 255, 0.07)"
      hoverColor="rgba(47, 128, 237, 0.6)"
      hoverFillColor="#2F80ED"
      fillOpacity={0.08}
      radius={1.2}
      trail={0.4}
      glow={0.2}
      clickCascade={false}
      intro={false}
      fade={1}
    />
  );
}
