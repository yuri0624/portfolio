import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function AwardsSection() {
  const categoryOrder = [
    "アプリ開発",
    "研究・ビジネス",
    "プログラム・奨学金",
  ] as const;

  return (
    <section
      id="awards"
      className="scroll-mt-20 border-t border-stone-200/80 bg-white/50 px-5 py-20 sm:px-8 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="Awards" ja="受賞・評価" />
        <div className="space-y-14">
          {categoryOrder.map((category) => {
            const rows = site.awards.filter((a) => a.category === category);
            if (rows.length === 0) return null;

            return (
              <section key={category}>
                <h3 className="mb-5 text-[18px] font-semibold text-stone-900">
                  {category}
                </h3>
                <ul className="divide-y divide-stone-200/90">
                  {rows.map((a, i) => (
                    <li
                      key={`${category}-${i}`}
                      className="flex flex-col gap-2 py-7 first:pt-0 sm:flex-row sm:items-baseline sm:gap-12"
                    >
                      <div className="shrink-0 sm:w-28">
                        {a.year ? (
                          <span className="text-[14px] font-medium tabular-nums text-stone-500">
                            {a.year}
                          </span>
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[17px] font-semibold text-stone-900">
                          {a.title}
                        </p>
                        {a.work ? (
                          <p className="mt-1 text-[15px] text-stone-500">
                            {a.work}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
