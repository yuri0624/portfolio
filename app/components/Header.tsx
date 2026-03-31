import { site } from "@/lib/site";

const links = [
  { href: "#top", label: "自己紹介" },
  { href: "#beliefs", label: "ストーリー" },
  { href: "#projects", label: "プロジェクト" },
  { href: "#awards", label: "受賞" },
  { href: "#media", label: "取材" },
  { href: "#videos", label: "発表動画" },
  { href: "#contact", label: "連絡" },
] as const;

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/60 bg-[#fafaf9]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-5xl items-center gap-2 px-5 sm:gap-3 sm:px-8">
        <a
          href="#top"
          className="shrink-0 text-[13px] font-medium tracking-wide text-stone-800 transition-opacity hover:opacity-70"
        >
          {site.nameEn}
        </a>
        <nav
          className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="ページ内リンク"
        >
          <ul className="flex flex-nowrap items-center justify-end gap-x-4 py-1 sm:gap-x-6">
            {links.map(({ href, label }) => (
              <li key={href} className="shrink-0">
                <a
                  href={href}
                  className="whitespace-nowrap text-[11px] text-stone-500 transition-colors hover:text-stone-900 sm:text-[13px]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
