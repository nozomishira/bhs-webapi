import { SeedQuestion } from '../seed-data';

// Level 4: 単語20問 + 文法20問 = 40問
// テーマ: ビジネス・接頭辞me-・接頭辞di-・接尾辞-an・健康・自然・経済・交通
// 文法: 受動態di-・比較級lebih・最上級paling・条件kalau/jika・目的agar/supaya・時間副詞・助動詞

export const level4Vocabulary: SeedQuestion[] = [
  // ビジネス (3問)
  { questionId: 'l4-v001', level: 4, type: 'vocabulary', category: 'business', question: '「会議」のインドネシア語は？', options: ['Kantor', 'Rapat', 'Pekerjaan', 'Gaji'], correctAnswer: 1, explanation: 'Rapat = 会議。「Ada rapat jam 10.」= 10時に会議があります。', indonesianWord: 'Rapat' },
  { questionId: 'l4-v002', level: 4, type: 'vocabulary', category: 'business', question: '「会社」のインドネシア語は？', options: ['Kantor', 'Perusahaan', 'Toko', 'Pabrik'], correctAnswer: 1, explanation: 'Perusahaan = 会社・企業。usaha(事業) に接辞 pe-...-an がついた形。', indonesianWord: 'Perusahaan' },
  { questionId: 'l4-v003', level: 4, type: 'vocabulary', category: 'business', question: '「給料」のインドネシア語は？', options: ['Uang', 'Harga', 'Gaji', 'Bayar'], correctAnswer: 2, explanation: 'Gaji = 給料・月給。「Gaji bulanan」= 月給。', indonesianWord: 'Gaji' },
  // 接頭辞 me- (3問)
  { questionId: 'l4-v004', level: 4, type: 'vocabulary', category: 'prefix-me', question: '「menulis」の意味は？', options: ['読む', '書く', '話す', '聞く'], correctAnswer: 1, explanation: 'Menulis = 書く。me- + tulis。接頭辞 me- は能動態を作る。', indonesianWord: 'Menulis' },
  { questionId: 'l4-v005', level: 4, type: 'vocabulary', category: 'prefix-me', question: '「membaca」の意味は？', options: ['書く', '読む', '見る', '聞く'], correctAnswer: 1, explanation: 'Membaca = 読む。me- + baca。b の前で mem- になる。', indonesianWord: 'Membaca' },
  { questionId: 'l4-v006', level: 4, type: 'vocabulary', category: 'prefix-me', question: '「mengajar」の意味は？', options: ['学ぶ', '教える', '働く', '考える'], correctAnswer: 1, explanation: 'Mengajar = 教える。me- + ajar。母音の前で meng- になる。', indonesianWord: 'Mengajar' },
  // 接頭辞 di- (2問)
  { questionId: 'l4-v007', level: 4, type: 'vocabulary', category: 'prefix-di', question: '「ditulis」の意味は？', options: ['書く', '書かれる', '書いた', '書きたい'], correctAnswer: 1, explanation: 'Ditulis = 書かれる。di- + tulis。接頭辞 di- は受動態を作る。', indonesianWord: 'Ditulis' },
  { questionId: 'l4-v008', level: 4, type: 'vocabulary', category: 'prefix-di', question: '「dimakan」の意味は？', options: ['食べる', '食べた', '食べられる', '食べたい'], correctAnswer: 2, explanation: 'Dimakan = 食べられる。di- + makan。受動態の形。', indonesianWord: 'Dimakan' },
  // 接尾辞 -an (2問)
  { questionId: 'l4-v009', level: 4, type: 'vocabulary', category: 'suffix-an', question: '「makanan」の意味は？', options: ['食べる', '食べ物', '食堂', '食事する'], correctAnswer: 1, explanation: 'Makanan = 食べ物。makan + -an で名詞化。', indonesianWord: 'Makanan' },
  { questionId: 'l4-v010', level: 4, type: 'vocabulary', category: 'suffix-an', question: '「minuman」の意味は？', options: ['飲む', '飲み物', '飲み屋', '飲みたい'], correctAnswer: 1, explanation: 'Minuman = 飲み物。minum + -an で名詞化。', indonesianWord: 'Minuman' },
  // 健康 (3問)
  { questionId: 'l4-v011', level: 4, type: 'vocabulary', category: 'health', question: '「病気」のインドネシア語は？', options: ['Sehat', 'Sakit', 'Obat', 'Dokter'], correctAnswer: 1, explanation: 'Sakit = 病気・痛い。Rumah sakit = 病院。', indonesianWord: 'Sakit' },
  { questionId: 'l4-v012', level: 4, type: 'vocabulary', category: 'health', question: '「薬」のインドネシア語は？', options: ['Dokter', 'Sakit', 'Obat', 'Rumah sakit'], correctAnswer: 2, explanation: 'Obat = 薬。「Minum obat」= 薬を飲む。', indonesianWord: 'Obat' },
  { questionId: 'l4-v013', level: 4, type: 'vocabulary', category: 'health', question: '「健康な」のインドネシア語は？', options: ['Sakit', 'Sehat', 'Lemah', 'Kuat'], correctAnswer: 1, explanation: 'Sehat = 健康な。反対語は Sakit（病気の）。', indonesianWord: 'Sehat' },
  // 自然 (2問)
  { questionId: 'l4-v014', level: 4, type: 'vocabulary', category: 'nature', question: '「山」のインドネシア語は？', options: ['Laut', 'Gunung', 'Sungai', 'Danau'], correctAnswer: 1, explanation: 'Gunung = 山。Gunung Fuji = 富士山。', indonesianWord: 'Gunung' },
  { questionId: 'l4-v015', level: 4, type: 'vocabulary', category: 'nature', question: '「海」のインドネシア語は？', options: ['Gunung', 'Sungai', 'Laut', 'Pantai'], correctAnswer: 2, explanation: 'Laut = 海。Pantai = 海岸・ビーチ。', indonesianWord: 'Laut' },
  // 経済 (2問)
  { questionId: 'l4-v016', level: 4, type: 'vocabulary', category: 'economy', question: '「銀行」のインドネシア語は？', options: ['Toko', 'Bank', 'Kantor', 'Pasar'], correctAnswer: 1, explanation: 'Bank = 銀行。オランダ語由来。', indonesianWord: 'Bank' },
  { questionId: 'l4-v017', level: 4, type: 'vocabulary', category: 'economy', question: '「税金」のインドネシア語は？', options: ['Pajak', 'Gaji', 'Harga', 'Untung'], correctAnswer: 0, explanation: 'Pajak = 税金。「Pajak penghasilan」= 所得税。', indonesianWord: 'Pajak' },
  // 交通 (3問)
  { questionId: 'l4-v018', level: 4, type: 'vocabulary', category: 'transportation', question: '「電車」のインドネシア語は？', options: ['Bus', 'Kereta api', 'Pesawat', 'Kapal'], correctAnswer: 1, explanation: 'Kereta api = 電車・列車。api = 火（蒸気機関車に由来）。', indonesianWord: 'Kereta api' },
  { questionId: 'l4-v019', level: 4, type: 'vocabulary', category: 'transportation', question: '「飛行機」のインドネシア語は？', options: ['Kapal', 'Bus', 'Kereta api', 'Pesawat'], correctAnswer: 3, explanation: 'Pesawat = 飛行機。Pesawat terbang とも言う。', indonesianWord: 'Pesawat' },
  { questionId: 'l4-v020', level: 4, type: 'vocabulary', category: 'transportation', question: '「船」のインドネシア語は？', options: ['Pesawat', 'Kereta api', 'Kapal', 'Mobil'], correctAnswer: 2, explanation: 'Kapal = 船。Kapal laut = 船舶。島国のため重要な交通手段。', indonesianWord: 'Kapal' },
];

export const level4Grammar: SeedQuestion[] = [
  // 受動態 di- (4問)
  { questionId: 'l4-g001', level: 4, type: 'grammar', category: 'passive-di', question: '「この本は多くの人に読まれています」の正しいインドネシア語は？', options: ['Buku ini membaca banyak orang.', 'Buku ini dibaca banyak orang.', 'Banyak orang dibaca buku ini.', 'Dibaca buku ini banyak orang.'], correctAnswer: 1, explanation: '受動態: 主語 + di-動詞 + 行為者。「Buku ini dibaca banyak orang.」' },
  { questionId: 'l4-g002', level: 4, type: 'grammar', category: 'passive-di', question: '「手紙は昨日送られました」の正しいインドネシア語は？', options: ['Surat mengirim kemarin.', 'Surat dikirim kemarin.', 'Kemarin surat mengirim.', 'Dikirim surat kemarin.'], correctAnswer: 1, explanation: 'Di- + 動詞語幹 で受動態。「Surat dikirim kemarin.」= 手紙は昨日送られた。' },
  { questionId: 'l4-g003', level: 4, type: 'grammar', category: 'passive-di', question: '「この料理は母に作られました」の正しいインドネシア語は？', options: ['Masakan ini membuat ibu.', 'Masakan ini dibuat oleh ibu.', 'Ibu dibuat masakan ini.', 'Dibuat masakan ini ibu.'], correctAnswer: 1, explanation: '受動態 + oleh（〜によって）。「Dibuat oleh ibu」= 母によって作られた。' },
  { questionId: 'l4-g004', level: 4, type: 'grammar', category: 'passive-di', question: '「ドアが開けられた」の正しいインドネシア語は？', options: ['Pintu membuka.', 'Pintu dibuka.', 'Membuka pintu.', 'Dibuka membuka pintu.'], correctAnswer: 1, explanation: 'Di- + buka = dibuka（開けられた）。受動態のシンプルな形。' },
  // 比較級 lebih (3問)
  { questionId: 'l4-g005', level: 4, type: 'grammar', category: 'comparative', question: '「ジャカルタは東京より暑い」の正しいインドネシア語は？', options: ['Jakarta panas dari Tokyo.', 'Jakarta lebih panas daripada Tokyo.', 'Jakarta paling panas Tokyo.', 'Jakarta daripada Tokyo panas.'], correctAnswer: 1, explanation: 'Lebih + 形容詞 + daripada で比較級。「Lebih panas daripada」= 〜より暑い。' },
  { questionId: 'l4-g006', level: 4, type: 'grammar', category: 'comparative', question: '「この道はあの道より長い」の正しいインドネシア語は？', options: ['Jalan ini lebih panjang daripada jalan itu.', 'Jalan ini panjang lebih daripada jalan itu.', 'Jalan ini daripada jalan itu lebih panjang.', 'Lebih jalan ini panjang daripada jalan itu.'], correctAnswer: 0, explanation: '主語 + lebih + 形容詞 + daripada + 比較対象 が基本語順。' },
  { questionId: 'l4-g007', level: 4, type: 'grammar', category: 'comparative', question: '「彼は私より背が高い」の正しいインドネシア語は？', options: ['Dia tinggi saya.', 'Dia lebih tinggi daripada saya.', 'Dia paling tinggi saya.', 'Dia daripada saya tinggi.'], correctAnswer: 1, explanation: 'Lebih tinggi daripada = 〜より背が高い。Tinggi = 高い。' },
  // 最上級 paling (2問)
  { questionId: 'l4-g008', level: 4, type: 'grammar', category: 'superlative', question: '「これが一番美味しいです」の正しいインドネシア語は？', options: ['Ini lebih enak.', 'Ini paling enak.', 'Ini enak paling.', 'Ini enak sekali.'], correctAnswer: 1, explanation: 'Paling + 形容詞 で最上級。「Paling enak」= 一番美味しい。' },
  { questionId: 'l4-g009', level: 4, type: 'grammar', category: 'superlative', question: '「彼はクラスで一番賢い」の正しいインドネシア語は？', options: ['Dia lebih pintar di kelas.', 'Dia paling pintar di kelas.', 'Dia pintar paling di kelas.', 'Dia pintar sekali di kelas.'], correctAnswer: 1, explanation: 'Paling + 形容詞 + 範囲。「Paling pintar di kelas」= クラスで一番賢い。' },
  // 条件 kalau/jika (3問)
  { questionId: 'l4-g010', level: 4, type: 'grammar', category: 'conditional', question: '「もし雨が降ったら、家にいます」の正しいインドネシア語は？', options: ['Kalau hujan, saya di rumah.', 'Saya di rumah kalau hujan.', 'Hujan kalau saya di rumah.', 'Kalau saya di rumah hujan.'], correctAnswer: 0, explanation: 'Kalau + 条件, 結果。「Kalau hujan, saya di rumah.」= 雨なら家にいる。' },
  { questionId: 'l4-g011', level: 4, type: 'grammar', category: 'conditional', question: '「もし時間があれば、行きます」の正しいインドネシア語は？', options: ['Jika ada waktu, saya pergi.', 'Saya pergi jika ada waktu.', 'Ada waktu jika saya pergi.', 'Jika saya pergi ada waktu.'], correctAnswer: 0, explanation: 'Jika = もし（kalau よりフォーマル）。Jika + 条件, 結果。' },
  { questionId: 'l4-g012', level: 4, type: 'grammar', category: 'conditional', question: '「もしお腹が空いたら、何を食べますか？」の正しいインドネシア語は？', options: ['Kalau lapar, mau makan apa?', 'Mau makan apa kalau lapar?', 'Lapar kalau makan apa?', 'Apa makan kalau lapar?'], correctAnswer: 0, explanation: 'Kalau + 条件, 疑問文。「Kalau lapar, mau makan apa?」' },
  // 目的 agar/supaya (2問)
  { questionId: 'l4-g013', level: 4, type: 'grammar', category: 'purpose', question: '「健康でいるために運動します」の正しいインドネシア語は？', options: ['Saya olahraga agar sehat.', 'Agar saya olahraga sehat.', 'Saya sehat agar olahraga.', 'Olahraga saya agar sehat.'], correctAnswer: 0, explanation: '主文 + agar/supaya + 目的。「Olahraga agar sehat」= 健康のために運動する。' },
  { questionId: 'l4-g014', level: 4, type: 'grammar', category: 'purpose', question: '「遅れないように早く出ます」の正しいインドネシア語は？', options: ['Saya berangkat awal supaya tidak terlambat.', 'Supaya saya berangkat awal tidak terlambat.', 'Tidak terlambat supaya saya berangkat awal.', 'Saya supaya berangkat awal tidak terlambat.'], correctAnswer: 0, explanation: '主文 + supaya + 目的。「Berangkat awal supaya tidak terlambat」' },
  // 時間副詞 (3問)
  { questionId: 'l4-g015', level: 4, type: 'grammar', category: 'time-adverb', question: '「彼はいつも遅れます」の正しいインドネシア語は？', options: ['Dia selalu terlambat.', 'Dia sering terlambat.', 'Dia kadang-kadang terlambat.', 'Dia jarang terlambat.'], correctAnswer: 0, explanation: 'Selalu = いつも。Sering = よく。Kadang-kadang = 時々。Jarang = めったに〜ない。' },
  { questionId: 'l4-g016', level: 4, type: 'grammar', category: 'time-adverb', question: '「私は時々映画を見ます」の正しいインドネシア語は？', options: ['Saya selalu menonton film.', 'Saya sering menonton film.', 'Saya kadang-kadang menonton film.', 'Saya jarang menonton film.'], correctAnswer: 2, explanation: 'Kadang-kadang = 時々。頻度を表す副詞は動詞の前に置く。' },
  { questionId: 'l4-g017', level: 4, type: 'grammar', category: 'time-adverb', question: '「彼女はめったに遅刻しません」の正しいインドネシア語は？', options: ['Dia selalu terlambat.', 'Dia sering terlambat.', 'Dia kadang-kadang terlambat.', 'Dia jarang terlambat.'], correctAnswer: 3, explanation: 'Jarang = めったに〜ない。頻度が低いことを表す。' },
  // 助動詞 bisa/harus/boleh (3問)
  { questionId: 'l4-g018', level: 4, type: 'grammar', category: 'modal-verb', question: '「私はインドネシア語が話せます」の正しいインドネシア語は？', options: ['Saya harus bicara bahasa Indonesia.', 'Saya bisa bicara bahasa Indonesia.', 'Saya boleh bicara bahasa Indonesia.', 'Saya mau bicara bahasa Indonesia.'], correctAnswer: 1, explanation: 'Bisa = 〜できる（能力）。「Bisa bicara」= 話すことができる。' },
  { questionId: 'l4-g019', level: 4, type: 'grammar', category: 'modal-verb', question: '「ここで写真を撮ってもいいですか？」の正しいインドネシア語は？', options: ['Bisa foto di sini?', 'Harus foto di sini?', 'Boleh foto di sini?', 'Mau foto di sini?'], correctAnswer: 2, explanation: 'Boleh = 〜してもよい（許可）。「Boleh foto di sini?」= ここで撮影していい？' },
  { questionId: 'l4-g020', level: 4, type: 'grammar', category: 'modal-verb', question: '「あなたはパスポートを持っていなければなりません」の正しいインドネシア語は？', options: ['Anda bisa bawa paspor.', 'Anda boleh bawa paspor.', 'Anda harus bawa paspor.', 'Anda mau bawa paspor.'], correctAnswer: 2, explanation: 'Harus = 〜しなければならない（義務）。「Harus bawa paspor」= パスポートを持つ必要がある。' },
];

export const level4Questions: SeedQuestion[] = [...level4Vocabulary, ...level4Grammar];
