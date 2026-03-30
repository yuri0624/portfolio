"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function ActivitiesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : site.activities[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <section
      id="projects"
      className="scroll-mt-20 border-t border-stone-200/80 px-5 py-20 sm:px-8 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="Projects" ja="プロジェクト" />
        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {site.activities.map((item, i) => (
            <li
              key={i}
              className="group"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="w-full overflow-hidden rounded-xl border border-stone-200/90 bg-white/80 text-left outline-none transition hover:border-stone-300 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-stone-400"
                aria-label={`${item.title} の詳細を開く`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.title} のサムネイル`}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-100" />
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {active ? (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="プロジェクト詳細"
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="w-full max-w-xl rounded-2xl bg-[#fafaf9] p-5 shadow-2xl ring-1 ring-stone-200 sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  {active.period ? (
                    <p className="text-[12px] font-medium tracking-wide text-stone-400">
                      {active.period}
                    </p>
                  ) : null}
                  <h3 className="mt-1 text-xl font-semibold text-stone-900">
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="rounded-md px-2 py-1 text-[13px] text-stone-500 transition hover:bg-stone-200/60 hover:text-stone-800"
                >
                  閉じる
                </button>
              </div>

              {active.image &&
              active.imageWidth != null &&
              active.imageHeight != null ? (
                <div className="mb-5 w-full overflow-hidden rounded-lg bg-stone-100">
                  <Image
                    src={active.image}
                    alt=""
                    width={active.imageWidth}
                    height={active.imageHeight}
                    sizes="(min-width: 640px) 36rem, 100vw"
                    className="h-auto w-full object-contain"
                  />
                </div>
              ) : null}

              <p className="text-[15px] leading-relaxed text-stone-700">
                {active.detail || active.description}
              </p>
              {active.href ? (
                <a
                  href={active.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[14px] text-stone-600 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-500"
                >
                  関連リンクを開く
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
