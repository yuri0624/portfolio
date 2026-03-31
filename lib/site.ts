/**
 * 孫正義育英財団 2 次選考用ポートフォリオの内容です。
 * 下のプレースホルダーを、事実ベースで書き換えてください。
 */

export type ArticleEntry = {
  title: string;
  /** 媒体名（例: ○○新聞デジタル、大学広報） */
  outlet: string;
  /** 任意。例: 2025年3月 */
  date?: string;
  /** 公開 URL。未設定なら本文のみ表示（リンクなし） */
  href?: string;
  /**
   * サムネイル画像。記事の og:image URL や、`/public` 下のパス（例: `/media/foo.jpg`）。
   * 外部 URL を使う場合は `next.config.ts` の `images.remotePatterns` にホストを追加してください。
   */
  image?: string;
  /** 視聴条件・リンクの注意など（任意） */
  note?: string;
};

export type AwardEntry = {
  category: "アプリ開発" | "研究・ビジネス" | "プログラム・奨学金";
  title: string;
  /** 主催・選考主体（内部メモ・将来の拡張用。一覧のグレー行には使わない） */
  issuer: string;
  /** 一覧の薄いグレー行（アプリ名・成果物名など） */
  work?: string;
  year?: string;
  detail?: string;
  /** サムネイル（`/public` 配下や外部 URL）。未設定ならテキストのみ */
  image?: string;
};

export type ActivityEntry = {
  /** 例: 2023年〜現在、2024年4月—8月 */
  period?: string;
  title: string;
  description: string;
  /** プロジェクトのサムネイル（`/public` 配下か外部 URL） */
  image?: string;
  /** 画像ファイルの実ピクセル幅・高さ（`next/image` の縦横比用。未設定なら枠だけ表示） */
  imageWidth?: number;
  imageHeight?: number;
  /** 詳細モーダルに出す補足（任意） */
  detail?: string;
  /** 外部公開ページがある場合に設定（任意） */
  href?: string;
};

/** 未踏ジュニア・アプリ甲子園など「公式アーカイブの発表・デモ・ピッチ動画」 */
export type VideoEntry = {
  /** 発表タイトル・回名（例: BentoPalette プロジェクト発表） */
  title: string;
  /** 文脈（例: 未踏ジュニア クリエイターらの夜、アプリ甲子園2024 決勝） */
  context: string;
  date?: string;
  href: string;
  image?: string;
  note?: string;
};

export const site = {
  nameEn: "Yuri Yoshida",
  nameJa: "吉田祐梨",
  /** 一文で立場（学生・研究テーマ・活動の軸など） */
  role:
    "2009年6月生まれ　16歳",
  /** 自己紹介。段落は空行で区切る */
  about: `現代社会では、不健康な食事が生活習慣病などの疾患を引き起こし、深刻な問題になっています。その背景には、お金、時間、情報、環境といった様々な制約があります。健康的な食事を選びたくても選べない、この状況をテクノロジーの力で変えることが私の目標です。

アプリ開発、数理モデル、AI研究、ビジネス、留学を通した探求など、多角的なアプローチでこの問題に取り組んでいます。`,

  /** 信念・大切にしていること・将来の志 */
  belief: {
    lead: "食事の問題を、テクノロジーで解決する",
    body: `私が食事の問題に取り組み始め、そして本格的にプログラミングを始めたのは中学2年生の頃です。毎回自分でお弁当を作っていた友達の昼食がある日突然菓子パン1個だけになったことがありました。忙しくて作れなかったのだと思いますが、それがとても印象的でした。身近な人から、食生活の乱れが心身の健康を蝕むという話を聞いていたこともあり、この問題を解決したいと思いました。

自分でもお弁当を作った経験は何度かありましたが、彩りや栄養バランスを考えるのは本当に大変でした。そこで、テンプレートを使って簡単に彩り豊かなお弁当を作れるアプリ「Bento Color」にして構想しました。

中2の秋にアプリ甲子園アイデア部門でグリコ賞を受賞し、ノーコードで実装して同じ年に東京都モバイルアプリコンテストで審査員特別賞を受賞。これらの実績をもとに中3の春に未踏ジュニアに採択され、そこで初めてプログラミング言語を学び、Flutterでアプリを実装しました。中3のアプリ甲子園では準優勝とグリコ賞を受賞しました。


その後、起業家育成プログラムに採択され、食生活の改善に関するビジネスアイデアをピッチする機会を得ました。同時期に東京都の次世代リーダー育成道場に合格し、1年間のアメリカ留学が決まりました。留学中の探究テーマを決める際、ゼミの先生と相談する中で、自分が本当に興味があるのは「食生活の改善」だと改めて気づきました。

留学中は、アメリカの学校給食の不健康さを目の当たりにして日本式の給食を導入した際の費用対効果を数理モデルでシミュレーションする研究をしたり、個別化栄養の実現に向けて知識グラフで食品成分とタンパク質の相互作用を予測する研究をしたりしました。超加工食品大国アメリカで生活した実体験をもとに、いくつかのアプリも開発しています。

このように、一つのテーマを様々な角度から深めてきました。`,
  },

  articles: [
    {
      title:
        "健康のための「お弁当アプリ」を開発。若者の食生活をテクノロジーから支えたい高校生【吉田祐梨・15歳】",
      outlet: "Steenz（スティーンズ）／ Teen's Snapshots（気になる10代名鑑）",
      date: "2025年4月26日",
      href: "https://steenz.jp/40911/",
      image: "https://steenz.jp/wp-content/uploads/2025/03/MG_0938.jpg",
    },
    {
      title:
        "アプリ開発ガールが解決する身近な悩み【全国！中高生ニュース】",
      outlet: "TBS「THE TIME,」全国！中高生ニュース（公式 TikTok @thetime_tbs）",
      href: "https://www.tiktok.com/@thetime_tbs/video/7532362879010376961",
      image: "/media/tbs-zenkoku-chugakusei-news.png",
    },
    {
      title:
        "「悩みを解決したい」アプリを続々開発する高校生、4時半起きで作業し熱中",
      outlet: "高校生新聞®︎（School Partners）／ カテゴリ：イノベーター・高校生の挑戦",
      date: "2025年8月6日掲載（最終更新：2025年12月17日）",
      href: "https://www.koukouseishinbun.jp/articles/-/13051",
      image: "/media/koukouseishinbun-13051.png",
    },
    {
      title:
        "開発経験ゼロからの挑戦を続けた先に出会えたもの【アプリ甲子園準優勝と米国留学｜中学3年生 吉田祐梨さん】",
      outlet: "note／ライフイズテック株式会社（公式）",
      date: "2025年1月28日",
      href: "https://note.com/lifeistech/n/nf77858d9e0fa",
      image: "/media/note-lifeistech-yoshida-yuri.png",
    },
    {
      title:
        "アプリ甲子園で2年連続グリコ賞を受賞した吉田さんと、グリコピア神戸で交流会を実施しました。",
      outlet: "江崎グリコ株式会社（公式サイト）／ 健康・CSR コンテンツ",
      href: "https://www.glico.com/jp/health/contents/applikoshien_kouryukai/",
      image: "https://www.glico.com/assets/images/original/P4021991.png",
    },
    {
      title: "アプリ開発沼｜番組「沼にハマってきいてみた」",
      outlet: "NHK教育テレビ（Eテレ）／ NHK ONE 番組ページ",
      date: "初回放送：2025年6月21日（土）午後8:00",
      href: "https://www.web.nhk/tv/an/hamatta/pl/series-tep-KNY2YKWLG9/ep/G6ZL7ZW564",
      image:
        "https://imgu.web.nhk/static/assets/images/tvepisode/te/G6ZL7ZW564/G6ZL7ZW564-eyecatch_56eaeb58013575f91a9bbec478149925.png",
      note: "リンクは NHK のオンライン視聴ページです。同時配信・見逃しなどは受信契約・利用登録（NHK ID 等）の条件が必要な場合があります。",
    },
  ] satisfies ArticleEntry[],

  /**
   * メディア取材とは別枠。主催側公式チャンネル等のプレゼン・ピッチ・成果発表動画。
   * YouTube なら `href` に限定公開・一般公開の URL、必要なら `note` に補足。
   */
  videos: [
    {
      title: "アプリ甲子園2024　No.6 吉田 祐梨「BentoPalette」",
      context: "アプリ甲子園（成果発表）",
      date: undefined,
      href: "https://www.youtube.com/watch?v=C-gfiYnEZyA",
      image: "https://img.youtube.com/vi/C-gfiYnEZyA/hqdefault.jpg",
      note: undefined,
    },
    {
      title: "BentoColor - テンプレートを使って簡単に彩り豊かなお弁当を作るアプリ",
      context: "未踏ジュニア（成果報告会）",
      date: "2024年11月6日公開",
      href: "https://www.youtube.com/watch?v=PjYGqSGzRD4",
      image: "https://img.youtube.com/vi/PjYGqSGzRD4/hqdefault.jpg",
      note: undefined,
    },
  ] satisfies VideoEntry[],

  awards: [
    {
      category: "アプリ開発",
      title: "アプリ甲子園2023 アイデア部門 グリコ賞",
      issuer: "アプリ甲子園",
      work: "BentoColor",
      year: "2023年11月",
      image: "/media/projects/bentocolor.png",
    },
    {
      category: "アプリ開発",
      title: "東京都モバイルアプリコンテスト 審査員特別賞",
      issuer: "東京都モバイルアプリコンテスト",
      work: "BentoColor",
      year: "2024年1月",
      image: "/media/projects/bentocolor.png",
    },
    {
      category: "アプリ開発",
      title: "アプリ甲子園2024 アイデア部門 MonstarLab賞",
      issuer: "アプリ甲子園",
      work: "BentoPalette",
      year: "2024年11月",
      image: "/media/projects/bentocolor.png",
    },
    {
      category: "アプリ開発",
      title: "アプリ甲子園2024 一般開発部門 準優勝・グリコ賞",
      issuer: "アプリ甲子園",
      work: "BentoPalette",
      year: "2024年11月",
      image: "/media/projects/bentocolor.png",
    },
    {
      category: "アプリ開発",
      title: "東京都モバイルアプリコンテスト 金賞・銀賞",
      issuer: "東京都モバイルアプリコンテスト",
      work: "BentoPalette, Fulove",
      year: "2025年1月",
      image: "/media/projects/fulove.png",
    },
    {
      category: "アプリ開発",
      title: "Technovation Girls 日本公式ピッチイベント Lenovo賞",
      issuer: "Technovation Girls",
      year: "2025年6月",
      image: "/media/projects/tastelink.png",
    },
    {
      category: "アプリ開発",
      title: "micro:bit 「do your :bit」 international showcase 選出",
      issuer: "micro:bit",
      year: "2025年9月",
      image: "/media/projects/beat-the-heat.png",
    },
    {
      category: "アプリ開発",
      title: "Congressional App Challenge 3rd Place",
      issuer: "Congressional App Challenge",
      work: "Nutorio",
      year: "2025年10月",
      image: "/media/projects/nutorio.png",
    },
    {
      category: "研究・ビジネス",
      title: "東京都大学ジュニア起業講座 優秀発表者",
      issuer: "東京都大学ジュニア起業講座",
      year: "2023年2月",
      image: "/media/projects/mission-vision-school-lunch.png",
    },
    {
      category: "研究・ビジネス",
      title: "株式会社Unpacked AbsoluteU-18 採択・TOP8選出",
      issuer: "株式会社Unpacked AbsoluteU-18",
      year: "2024年11月",
      image: "/media/projects/modeling-the-future-title.png",
    },
    {
      category: "研究・ビジネス",
      title: "Global Enterprise Challenge TOP12",
      issuer: "Global Enterprise Challenge",
      year: "2025年3月",
      image: "/media/projects/modeling-the-future-title.png",
    },
    {
      category: "研究・ビジネス",
      title: "GTEビジネスプランコンテスト TOP30賞",
      issuer: "GTEビジネスプランコンテスト",
      year: "2025年5月",
      image: "/media/projects/modeling-the-future-title.png",
    },
    {
      category: "研究・ビジネス",
      title: "SusHi Tech Teen Challenge 登壇",
      issuer: "SusHi Tech Teen Challenge",
      year: "2025年5月",
      image: "/media/projects/mission-vision-school-lunch.png",
    },
    {
      category: "プログラム・奨学金",
      title: "未踏ジュニア 採択",
      issuer: "未踏ジュニア",
      work: "BentoColor",
      year: "2024年4月",
      image: "/media/projects/bentocolor.png",
    },
    {
      category: "プログラム・奨学金",
      title: "ガイアックス未来の起業家奨学金 採択",
      issuer: "ガイアックス未来の起業家奨学金",
      year: "2025年4月",
      image: "/media/projects/modeling-the-future-title.png",
    },
  ] satisfies AwardEntry[],

  activities: [
    {
      title: "Fulove",
      description:
        "友達と入浴記録を共有し、風呂キャン（入浴サボり）を防ぐことを目的としたアプリです。",
      image: "/media/projects/fulove.png",
      imageWidth: 1764,
      imageHeight: 986,
    },
    {
      title: "Nutorio",
      description:
        "シンプルなステップで料理に取り組み、健康的な食習慣をつくることを支援するアプリです。",
      image: "/media/projects/nutorio.png",
      imageWidth: 1756,
      imageHeight: 980,
    },
    {
      title: "Beat the Heat",
      description:
        "高齢者の熱中症予防を目的としたスマートフォンアプリです。天気や気温などの情報を踏まえ、体調管理をサポートします。",
      image: "/media/projects/beat-the-heat.png",
      imageWidth: 1024,
      imageHeight: 575,
    },
    {
      title: "BentoColor",
      description:
        "テンプレートを使って、彩りと栄養バランスを意識したお弁当づくりを支援するアプリです。",
      image: "/media/projects/bentocolor.png",
      imageWidth: 1076,
      imageHeight: 601,
    },
    {
      title: "TasteLink",
      description:
        "世界各国の料理や文化を「味」でつなぐ体験を支援するアプリです。フラッグコレクションやジャーニー進捗、保存した料理の閲覧など、写真ベースで食の探求を記録できます。",
      image: "/media/projects/tastelink.png",
      imageWidth: 1648,
      imageHeight: 912,
    },
    {
      title: "MISSION & VISION — 給食と食の流れ",
      description:
        "日本の学校給食が直面する残菜・無償化・現場の非効率といった課題を背景に、契約農家と管理栄養士のレシピをつなぐSaaSで「残さず、つなぐ、未来へ」「無駄のない食の流れを創る」を掲げる事業の紹介スライドです。",
      image: "/media/projects/mission-vision-school-lunch.png",
      imageWidth: 952,
      imageHeight: 550,
    },
    {
      title:
        "Reducing Diabetes Risk Through Japanese-Style School Lunch Programs（MFC 2025-26 提出）",
      description:
        "Modeling the Future Challenge（2025-26）に提出した文書の表紙です。アメリカの学校における日本式給食プログラムと糖尿病リスク低減について、リスク分析と導入戦略を扱っています。",
      image: "/media/projects/modeling-the-future-title.png",
      imageWidth: 1604,
      imageHeight: 1184,
    },
    {
      title: "METHODS ① — KG 構築と評価設計",
      description:
        "知識グラフ研究の方法スライドです。ChEMBL・FOODB・UniProt などのデータソース、学習／テスト分割と化合物スプリット、ノード・リレーションの設計、およびベースライン手法との比較の整理を示しています。",
      image: "/media/projects/kg-methods-kge-design.png",
      imageWidth: 2048,
      imageHeight: 1244,
    },
  ] as ActivityEntry[],

  email: "yuri2009y@gmail.com",
} as const;
