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

function StoryMobilePager({
  steps,
  stepImages,
}: {
  steps: string[];
  stepImages: string[];
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, Math.max(steps.length - 1, 0)));
  }, [steps.length]);

  const currentText = steps[index] ?? steps[0] ?? "";
  const currentImage = stepImageSrc(stepImages, index);
  const canPrev = index > 0;
  const canNext = index < steps.length - 1;

  const onPrev = () => setIndex((v) => Math.max(0, v - 1));
  const onNext = () => setIndex((v) => Math.min(steps.length - 1, v + 1));

  return (
    <div className="lg:hidden">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200/80"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
          const dx = endX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 40) return;
          if (dx < 0) onNext();
          if (dx > 0) onPrev();
        }}
      >
        <Image
          key={index}
          src={currentImage}
          alt=""
          fill
          className="object-cover story-animate-in"
          sizes="100vw"
          priority={index === 0}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#fafaf9] via-transparent to-transparent opacity-40" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="rounded-md border border-stone-300 px-3 py-1.5 text-[13px] text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          前へ
        </button>
        <span className="text-[12px] tabular-nums text-stone-500">
          {index + 1} / {steps.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="rounded-md border border-stone-300 px-3 py-1.5 text-[13px] text-stone-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          次へ
        </button>
      </div>

      <p
        key={index}
        className="story-animate-in mt-5 text-left text-[17px] leading-[1.85] text-stone-600"
      >
        {currentText}
      </p>

      <div className="mt-4 flex justify-center gap-1.5">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}番目のストーリーへ`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-stone-700" : "w-1.5 bg-stone-300"
            }`}
          />
        ))}
      </div>
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
      <StoryMobilePager steps={steps} stepImages={stepImages} />

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
