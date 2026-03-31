"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { publicPath } from "@/lib/publicPath";

function stepImageSrc(
  stepImages: string[],
  index: number
): string {
  return (
    stepImages[index] ??
    stepImages[0] ??
    publicPath("/profile-v2.png")
  );
}

/** 狭い画面では IntersectionObserver 前提のスクロール連動が不安定になりやすいので、段落ごとに縦並びで見せる */
function StoryMobileStack({
  steps,
  stepImages,
}: {
  steps: string[];
  stepImages: string[];
}) {
  return (
    <div className="space-y-14 lg:hidden">
      {steps.map((step, idx) => (
        <article key={idx} className="space-y-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200/80">
            <Image
              src={stepImageSrc(stepImages, idx)}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={idx === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-transparent opacity-40" />
          </div>
          <p className="text-left text-[17px] leading-[1.85] text-stone-600">
            {step}
          </p>
        </article>
      ))}
    </div>
  );
}

export function StoryScrollytelling({
  steps,
  stepImages,
  topOffsetPx = 0,
}: {
  steps: string[];
  stepImages: string[];
  /** ビューポート上部（固定ヘッダー等）からのオフセット（px） */
  topOffsetPx?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggersRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const activeImage = useMemo(() => {
    return stepImageSrc(stepImages, activeIndex);
  }, [activeIndex, stepImages]);

  useEffect(() => {
    if (steps.length <= 1) return;

    const els = triggersRef.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.index || "0"));
        if (intersecting.length === 0) return;

        const next = Math.max(...intersecting);
        if (next === activeIndexRef.current) return;

        requestAnimationFrame(() => {
          setActiveIndex(next);
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-12% 0px -18% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <>
      <StoryMobileStack steps={steps} stepImages={stepImages} />

      <div className="hidden gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
        <div
          className="flex h-[62vh] min-h-[400px] items-center lg:sticky"
          style={{ top: topOffsetPx ? `${topOffsetPx}px` : undefined }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200/80">
            <Image
              key={activeIndex}
              src={activeImage}
              alt=""
              fill
              className="object-cover transition duration-500 ease-out story-animate-in"
              sizes="(min-width: 1024px) 32rem, 100vw"
              priority={activeIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-transparent opacity-40" />
          </div>
        </div>

        <div>
          <div
            className="flex h-[62vh] min-h-[400px] items-center lg:sticky"
            style={{ top: topOffsetPx ? `${topOffsetPx}px` : undefined }}
          >
            <p
              key={activeIndex}
              className="story-animate-in max-w-2xl text-left text-[17px] leading-[1.85] text-stone-600"
            >
              {steps[activeIndex] ?? steps[0]}
            </p>
          </div>

          <div className="mt-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                data-index={idx}
                ref={(el) => {
                  triggersRef.current[idx] = el;
                }}
                className="h-[62vh] min-h-[400px]"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
