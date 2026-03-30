type Props = {
  en: string;
  ja: string;
};

export function SectionHeading({ en, ja }: Props) {
  return (
    <header className="mb-12 max-w-2xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-stone-400">
        {en}
      </p>
      <h2 className="font-display mt-4 text-3xl font-medium tracking-tight text-stone-900 sm:text-[2.125rem]">
        {ja}
      </h2>
    </header>
  );
}
