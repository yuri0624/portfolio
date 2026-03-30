 "use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { StoryScrollytelling } from "./StoryScrollytelling";

export function BeliefSection() {
  const paragraphs = site.belief.body.split(/\n\n/).filter(Boolean);

  const imageByParagraphIndex: Record<number, string> = {
    0: "/media/story-step-1-v2.png",
    1: "/media/story-step-2.png",
    2: "/media/story-step-3-v2.png",
    3: "/media/story-step-4.png",
    4: "/media/story-step-5.png",
    5: "/media/story-step-6.png",
  };

  const stepImages = paragraphs.map(
    (_, i) => imageByParagraphIndex[i] || "/profile-v2.png"
  );

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [storyTopOffset, setStoryTopOffset] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const NAV_HEIGHT_PX = 52; // app/components/Header.tsx の高さ（h-[52px]）

    const update = () => {
      const rect = el.getBoundingClientRect();
      // stickyする「My Story」見出しの下に写真・本文が来るようにオフセットする
      setStoryTopOffset(Math.ceil(NAV_HEIGHT_PX + rect.height + 8));
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="beliefs"
      className="scroll-mt-20 border-t border-stone-200/80 px-5 py-16 sm:px-8 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className="lg:sticky lg:top-[52px] lg:z-10 lg:bg-[#fafaf9]/92 lg:backdrop-blur-sm lg:pt-3 lg:pb-6"
        >
          <SectionHeading en="Story" ja="私のストーリー" />
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-stone-800">
            {site.belief.lead}
          </p>
        </div>

        <div className="mt-8 lg:mt-0">
          <StoryScrollytelling
            steps={paragraphs}
            stepImages={stepImages}
            topOffsetPx={storyTopOffset}
          />
        </div>
      </div>
    </section>
  );
}
