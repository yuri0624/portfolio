const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** `public/` 内のルート相対パスに `basePath` を付与（GitHub Pages のプロジェクトサイト向け）。https はそのまま。 */
export function publicPath(path: string): string {
  const p = path.trim();
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p;
  if (!p.startsWith("/")) return p;
  return base ? `${base}${p}` : p;
}
