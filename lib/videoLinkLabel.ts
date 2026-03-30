type LinkVariant = "article" | "generic";

/** 取材・発表リンクの CTA 文言 */
export function linkActionLabel(href: string, variant: LinkVariant = "article") {
  const u = href.toLowerCase();
  if (u.includes("tiktok.com")) return "TikTok で見る（別タブ）";
  if (u.includes("youtube.com") || u.includes("youtu.be"))
    return "YouTube で見る（別タブ）";
  if (u.includes("note.com")) return "note で読む（別タブ）";
  if (u.endsWith(".nhk") || u.includes(".web.nhk") || u.includes("nhk.or.jp"))
    return "NHK のページを開く（別タブ）";
  return variant === "article"
    ? "記事を開く（別タブ）"
    : "開く（別タブ）";
}
