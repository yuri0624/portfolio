import Image from "next/image";
import { site } from "@/lib/site";

export function Intro() {
  const paragraphs = site.about.split(/\n\n/).filter(Boolean);

  return (
    <section
      id="top"
      className="scroll-mt-20 px-5 pb-24 pt-[7.5rem] sm:px-8 sm:pt-32 md:scroll-mt-24 md:pb-32 md:pt-32"
    >
      <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-16 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-20">
        <div className="md:sticky md:top-28">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] md:mx-0 md:max-w-none">
            <Image
              src="/profile-v2.png"
              alt={`${site.nameJa}の肖像`}
              fill
              sizes="(min-width: 768px) 340px, 280px"
              className="rounded-2xl object-cover shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] ring-1 ring-stone-200/90"
              priority
            />
          </div>
        </div>

        <div className="min-w-0 pt-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            自己紹介
          </p>
          <h1 className="font-display mt-6 text-[2.75rem] font-medium leading-[1.06] tracking-[-0.02em] text-stone-900 sm:text-5xl lg:text-[3.35rem]">
            {site.nameEn}
          </h1>
          <p className="mt-4 text-lg font-medium text-stone-700">{site.nameJa}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-stone-500">
            {site.role}
          </p>

          <div className="mt-12 max-w-xl space-y-6 text-[17px] leading-[1.85] text-stone-600">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
