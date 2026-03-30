import Image from "next/image";
import { site } from "@/lib/site";
import { linkActionLabel } from "@/lib/videoLinkLabel";
import { SectionHeading } from "./SectionHeading";

function ArticleVisual({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-stone-200/60 ring-1 ring-stone-200/80 sm:w-56 md:w-64">
      <Image
        src={image}
        alt={`「${title}」のメイン画像`}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
        sizes="(min-width: 640px) 16rem, 100vw"
      />
    </div>
  );
}

function parseArticleDateToTime(date?: string): number | null {
  if (!date) return null;
  // 日本語の表記ゆれを想定して、まず YYYY年MM月DD日 を優先的に拾う
  const m = date.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (m) {
    const year = Number(m[1]);
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day))
      return Date.UTC(year, month - 1, day);
  }

  // DD が無い場合は YYYY年MM月
  const my = date.match(/(\d{4})\s*年\s*(\d{1,2})\s*月/);
  if (my) {
    const year = Number(my[1]);
    const month = Number(my[2]);
    if (Number.isFinite(year) && Number.isFinite(month))
      return Date.UTC(year, month - 1, 1);
  }

  return null;
}

export function MediaSection() {
  const orderedArticles = site.articles
    .map((article, idx) => ({ article, idx }))
    .sort((a, b) => {
      const at = parseArticleDateToTime(a.article.date);
      const bt = parseArticleDateToTime(b.article.date);

      // date が取れないものは末尾へ
      if (at === null && bt === null) return a.idx - b.idx;
      if (at === null) return 1;
      if (bt === null) return -1;

      // 新しい順（降順）
      return bt - at;
    })
    .map(({ article }) => article);

  return (
    <section
      id="media"
      className="scroll-mt-20 border-t border-stone-200/80 px-5 py-20 sm:px-8 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="Press & interviews" ja="取材・紹介記事" />
        <ul className="space-y-12">
          {orderedArticles.map((article, i) => {
            const hasUrl = Boolean(article.href?.trim());
            const hasImage = Boolean(article.image?.trim());

            const textBlock = (
              <div className="min-w-0 flex-1">
                <span className="text-[17px] font-medium text-stone-900 group-hover:text-stone-800">
                  {article.title}
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-x-2 text-[14px] text-stone-500">
                  <span>{article.outlet}</span>
                  {article.date ? (
                    <>
                      <span className="text-stone-300" aria-hidden>
                        ·
                      </span>
                      <span className="tabular-nums">{article.date}</span>
                    </>
                  ) : null}
                </span>
                {article.note ? (
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-stone-500">
                    {article.note}
                  </p>
                ) : null}
                {hasUrl ? (
                  <span className="mt-3 inline-block text-[13px] text-stone-400 underline decoration-stone-300 underline-offset-4 transition group-hover:decoration-stone-500">
                    {linkActionLabel(article.href!)}
                  </span>
                ) : null}
              </div>
            );

            const rowClass =
              "flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8";

            return (
              <li
                key={article.href ?? `${article.title}-${i}`}
                className="border-b border-stone-200/80 pb-12 last:border-0 last:pb-0"
              >
                {hasUrl ? (
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${rowClass} rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]`}
                  >
                    {hasImage ? (
                      <ArticleVisual
                        image={article.image!}
                        title={article.title}
                      />
                    ) : null}
                    {textBlock}
                  </a>
                ) : (
                  <div className={rowClass}>
                    {hasImage ? (
                      <ArticleVisual
                        image={article.image!}
                        title={article.title}
                      />
                    ) : null}
                    {textBlock}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
