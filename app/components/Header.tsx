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
      <div className="mx-auto flex min-h-[52px] max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-2 sm:h-[52px] sm:flex-nowrap sm:py-0 sm:px-8">
        <a
          href="#top"
          className="text-[13px] font-medium tracking-wide text-stone-800 transition-opacity hover:opacity-70"
        >
          {site.nameEn}
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1.5 text-[11px] text-stone-500 sm:gap-x-6 sm:text-[13px]">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap transition-colors hover:text-stone-900"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
