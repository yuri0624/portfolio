 "use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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
    return stepImages[activeIndex] || stepImages[0] || "/profile-v2.png";
  }, [activeIndex, stepImages]);

  useEffect(() => {
    if (steps.length <= 1) return;

    const els = triggersRef.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 複数同時に交差することがあるので、いちばん下（最大index）を採用
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.index || "0"));
        if (intersecting.length === 0) return;

        const next = Math.max(...intersecting);
        if (next === activeIndexRef.current) return;

        // 連続スクロールで発火しても、状態更新を 1 フレームにまとめて滑らかにする
        requestAnimationFrame(() => {
          setActiveIndex(next);
        });
      },
      {
        // 文章が中央付近に来たときに切り替える
        threshold: 0.55,
      }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
      <div
        className="lg:sticky flex h-[62vh] min-h-[400px] items-center"
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
          className="lg:sticky flex h-[62vh] min-h-[400px] items-center"
          style={{ top: topOffsetPx ? `${topOffsetPx}px` : undefined }}
        >
          <p
            key={activeIndex}
            className="story-animate-in max-w-2xl text-left text-[17px] leading-[1.85] text-stone-600"
          >
            {steps[activeIndex] ?? steps[0]}
          </p>
        </div>

        {/* スクロールの“段”を作る（ここは表示しない） */}
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
  );
}

