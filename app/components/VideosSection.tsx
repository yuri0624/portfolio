import Image from "next/image";
import { publicPath } from "@/lib/publicPath";
import { site } from "@/lib/site";
import { linkActionLabel } from "@/lib/videoLinkLabel";
import { SectionHeading } from "./SectionHeading";

function Thumb({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  return (
    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-stone-200/60 ring-1 ring-stone-200/80 sm:w-56 md:w-64">
      <Image
        src={publicPath(image)}
        alt={`「${title}」のサムネイル`}
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
        sizes="(min-width: 640px) 16rem, 100vw"
      />
    </div>
  );
}

export function VideosSection() {
  const items = site.videos;

  return (
    <section
      id="videos"
      className="scroll-mt-20 border-t border-stone-200/80 bg-white/40 px-5 py-20 sm:px-8 md:scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          en="Talks & demos"
          ja="発表・動画アーカイブ"
        />

        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-300 bg-stone-50/80 px-5 py-8 text-[15px] leading-relaxed text-stone-500">
            まだ登録がありません。URL が決まり次第、
            <code className="rounded bg-stone-200/60 px-1.5 py-0.5 text-[13px]">
              lib/site.ts
            </code>{" "}
            の <code className="rounded bg-stone-200/60 px-1.5 py-0.5 text-[13px]">videos</code>{" "}
            にオブジェクトを足してください。
          </p>
        ) : (
          <ul className="space-y-12">
            {items.map((v, i) => {
              const hasImage = Boolean(v.image?.trim());
              const textBlock = (
                <div className="min-w-0 flex-1">
                  <span className="text-[17px] font-medium text-stone-900 group-hover:text-stone-800">
                    {v.title}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-2 text-[14px] text-stone-500">
                    <span>{v.context}</span>
                    {v.date ? (
                      <>
                        <span className="text-stone-300" aria-hidden>
                          ·
                        </span>
                        <span className="tabular-nums">{v.date}</span>
                      </>
                    ) : null}
                  </span>
                  {v.note ? (
                    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-stone-500">
                      {v.note}
                    </p>
                  ) : null}
                  <span className="mt-3 inline-block text-[13px] text-stone-400 underline decoration-stone-300 underline-offset-4 transition group-hover:decoration-stone-500">
                    {linkActionLabel(v.href, "generic")}
                  </span>
                </div>
              );

              const rowClass =
                "flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8";

              return (
                <li
                  key={i}
                  className="border-b border-stone-200/80 pb-12 last:border-0 last:pb-0"
                >
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group ${rowClass} rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafaf9]`}
                  >
                    {hasImage ? (
                      <Thumb image={v.image!} title={v.title} />
                    ) : null}
                    {textBlock}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
