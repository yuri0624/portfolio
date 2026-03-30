import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-stone-200/80 px-5 py-14 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
            Contact
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block w-fit text-[15px] text-stone-700 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900 hover:decoration-stone-500"
          >
            {site.email}
          </a>
        </div>
        <p className="mt-14 text-[12px] text-stone-400">
          © {new Date().getFullYear()} {site.nameJa}
        </p>
      </div>
    </footer>
  );
}
