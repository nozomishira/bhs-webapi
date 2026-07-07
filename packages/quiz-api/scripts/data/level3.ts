import { SeedQuestion } from '../seed-data';

// Level 3: 単語20問 + 文法20問 = 40問
// テーマ: 旅行・買い物・時間表現・方角・天気・感情・動詞 / akan未来・sudah完了・sedang進行・belum・接続詞・tolong・数量・mau/ingin

export const level3Vocabulary: SeedQuestion[] = [
  // 旅行 (3問)
  { questionId: 'l3-v001', level: 3, type: 'vocabulary', category: 'travel', question: '「空港」のインドネシア語は？', options: ['Stasiun', 'Bandara', 'Pelabuhan', 'Terminal'], correctAnswer: 1, explanation: 'Bandara = 空港。Bandar Udara の略語。', indonesianWord: 'Bandara' },
  { questionId: 'l3-v002', level: 3, type: 'vocabulary', category: 'travel', question: '「ホテル」のインドネシア語は？', options: ['Rumah', 'Kantor', 'Hotel', 'Losmen'], correctAnswer: 2, explanation: 'Hotel = ホテル。オランダ語由来でそのまま使われる。', indonesianWord: 'Hotel' },
  { questionId: 'l3-v003', level: 3, type: 'vocabulary', category: 'travel', question: '「切符」のインドネシア語は？', options: ['Karcis', 'Paspor', 'Visa', 'Surat'], correctAnswer: 0, explanation: 'Karcis = 切符・チケット。Tiket も使われる。', indonesianWord: 'Karcis' },
  // 買い物 (4問)
  { questionId: 'l3-v004', level: 3, type: 'vocabulary', category: 'shopping', question: '「値段」のインドネシア語は？', options: ['Uang', 'Harga', 'Bayar', 'Murah'], correctAnswer: 1, explanation: 'Harga = 値段・価格。「Berapa harganya?」= いくらですか？', indonesianWord: 'Harga' },
  { questionId: 'l3-v005', level: 3, type: 'vocabulary', category: 'shopping', question: '「安い」のインドネシア語は？', options: ['Mahal', 'Murah', 'Besar', 'Kecil'], correctAnswer: 1, explanation: 'Murah = 安い。反対語は Mahal（高い）。', indonesianWord: 'Murah' },
  { questionId: 'l3-v006', level: 3, type: 'vocabulary', category: 'shopping', question: '「高い（値段）」のインドネシア語は？', options: ['Murah', 'Mahal', 'Tinggi', 'Besar'], correctAnswer: 1, explanation: 'Mahal = （値段が）高い。Tinggi = （高さが）高い。', indonesianWord: 'Mahal' },
  { questionId: 'l3-v007', level: 3, type: 'vocabulary', category: 'shopping', question: '「お金」のインドネシア語は？', options: ['Harga', 'Bayar', 'Uang', 'Belanja'], correctAnswer: 2, explanation: 'Uang = お金。インドネシアの通貨はルピア(Rupiah)。', indonesianWord: 'Uang' },
  // 時間表現 (3問)
  { questionId: 'l3-v008', level: 3, type: 'vocabulary', category: 'time-expression', question: '「朝」のインドネシア語は？', options: ['Siang', 'Pagi', 'Sore', 'Malam'], correctAnswer: 1, explanation: 'Pagi = 朝。Selamat pagi = おはようございます。', indonesianWord: 'Pagi' },
  { questionId: 'l3-v009', level: 3, type: 'vocabulary', category: 'time-expression', question: '「夜」のインドネシア語は？', options: ['Pagi', 'Siang', 'Sore', 'Malam'], correctAnswer: 3, explanation: 'Malam = 夜。Selamat malam = こんばんは。', indonesianWord: 'Malam' },
  { questionId: 'l3-v010', level: 3, type: 'vocabulary', category: 'time-expression', question: '「〜時」を表す「jam」の意味は？', options: ['分', '時間・時計', '秒', '日'], correctAnswer: 1, explanation: 'Jam = 時間・時計。「Jam berapa?」= 何時ですか？', indonesianWord: 'Jam' },
  // 方角 (3問)
  { questionId: 'l3-v011', level: 3, type: 'vocabulary', category: 'direction', question: '「北」のインドネシア語は？', options: ['Selatan', 'Utara', 'Barat', 'Timur'], correctAnswer: 1, explanation: 'Utara = 北。Sumatera Utara = 北スマトラ。', indonesianWord: 'Utara' },
  { questionId: 'l3-v012', level: 3, type: 'vocabulary', category: 'direction', question: '「南」のインドネシア語は？', options: ['Utara', 'Selatan', 'Timur', 'Barat'], correctAnswer: 1, explanation: 'Selatan = 南。Jakarta Selatan = 南ジャカルタ。', indonesianWord: 'Selatan' },
  { questionId: 'l3-v013', level: 3, type: 'vocabulary', category: 'direction', question: '「右」のインドネシア語は？', options: ['Kiri', 'Kanan', 'Lurus', 'Belok'], correctAnswer: 1, explanation: 'Kanan = 右。Kiri = 左。Belok kanan = 右に曲がる。', indonesianWord: 'Kanan' },
  // 天気 (2問)
  { questionId: 'l3-v014', level: 3, type: 'vocabulary', category: 'weather', question: '「雨」のインドネシア語は？', options: ['Panas', 'Hujan', 'Angin', 'Dingin'], correctAnswer: 1, explanation: 'Hujan = 雨。Musim hujan = 雨季。', indonesianWord: 'Hujan' },
  { questionId: 'l3-v015', level: 3, type: 'vocabulary', category: 'weather', question: '「暑い」のインドネシア語は？', options: ['Dingin', 'Panas', 'Hujan', 'Sejuk'], correctAnswer: 1, explanation: 'Panas = 暑い・熱い。Dingin = 寒い・冷たい。', indonesianWord: 'Panas' },
  // 感情 (2問)
  { questionId: 'l3-v016', level: 3, type: 'vocabulary', category: 'emotion', question: '「嬉しい」のインドネシア語は？', options: ['Sedih', 'Senang', 'Marah', 'Takut'], correctAnswer: 1, explanation: 'Senang = 嬉しい・楽しい。Sedih = 悲しい。', indonesianWord: 'Senang' },
  { questionId: 'l3-v017', level: 3, type: 'vocabulary', category: 'emotion', question: '「疲れた」のインドネシア語は？', options: ['Senang', 'Lapar', 'Lelah', 'Marah'], correctAnswer: 2, explanation: 'Lelah = 疲れた。Capek もカジュアルに使われる。', indonesianWord: 'Lelah' },
  // 動詞 (3問)
  { questionId: 'l3-v018', level: 3, type: 'vocabulary', category: 'verb', question: '「買う」のインドネシア語は？', options: ['Jual', 'Beli', 'Bayar', 'Cari'], correctAnswer: 1, explanation: 'Beli = 買う。Jual = 売る。Membeli = 買う（正式形）。', indonesianWord: 'Beli' },
  { questionId: 'l3-v019', level: 3, type: 'vocabulary', category: 'verb', question: '「待つ」のインドネシア語は？', options: ['Pergi', 'Datang', 'Tunggu', 'Pulang'], correctAnswer: 2, explanation: 'Tunggu = 待つ。「Tunggu sebentar!」= ちょっと待って！', indonesianWord: 'Tunggu' },
  { questionId: 'l3-v020', level: 3, type: 'vocabulary', category: 'verb', question: '「帰る」のインドネシア語は？', options: ['Pergi', 'Datang', 'Pulang', 'Jalan'], correctAnswer: 2, explanation: 'Pulang = 帰る。「Saya mau pulang.」= 帰りたいです。', indonesianWord: 'Pulang' },
];

export const level3Grammar: SeedQuestion[] = [
  // akan未来 (3問)
  { questionId: 'l3-g001', level: 3, type: 'grammar', category: 'akan-future', question: '「私は明日行きます」の正しいインドネシア語は？', options: ['Saya sudah pergi besok.', 'Saya akan pergi besok.', 'Saya sedang pergi besok.', 'Saya pergi akan besok.'], correctAnswer: 1, explanation: 'Akan + 動詞 で未来を表す。「Saya akan pergi besok.」= 明日行きます。' },
  { questionId: 'l3-g002', level: 3, type: 'grammar', category: 'akan-future', question: '「彼女は来年結婚します」の正しいインドネシア語は？', options: ['Dia akan menikah tahun depan.', 'Dia sudah menikah tahun depan.', 'Dia sedang menikah tahun depan.', 'Dia menikah akan tahun depan.'], correctAnswer: 0, explanation: 'Akan = 〜するつもり・〜する予定。未来の行動を表す。' },
  { questionId: 'l3-g003', level: 3, type: 'grammar', category: 'akan-future', question: '「雨が降るでしょう」の正しいインドネシア語は？', options: ['Sudah hujan.', 'Sedang hujan.', 'Akan hujan.', 'Belum hujan.'], correctAnswer: 2, explanation: 'Akan + 動詞/名詞 で推測・予定を表す。「Akan hujan.」= 雨が降るだろう。' },
  // sudah完了 (3問)
  { questionId: 'l3-g004', level: 3, type: 'grammar', category: 'sudah-perfect', question: '「私はもう食べました」の正しいインドネシア語は？', options: ['Saya akan makan.', 'Saya sedang makan.', 'Saya sudah makan.', 'Saya belum makan.'], correctAnswer: 2, explanation: 'Sudah + 動詞 で完了を表す。「Sudah makan.」= もう食べた。' },
  { questionId: 'l3-g005', level: 3, type: 'grammar', category: 'sudah-perfect', question: '「彼はもう帰りました」の正しいインドネシア語は？', options: ['Dia akan pulang.', 'Dia sudah pulang.', 'Dia sedang pulang.', 'Dia belum pulang.'], correctAnswer: 1, explanation: 'Sudah = もう〜した（完了）。「Dia sudah pulang.」= 彼はもう帰った。' },
  { questionId: 'l3-g006', level: 3, type: 'grammar', category: 'sudah-perfect', question: '「あなたはもう払いましたか？」の正しいインドネシア語は？', options: ['Anda akan bayar?', 'Anda sudah bayar?', 'Anda sedang bayar?', 'Anda belum bayar?'], correctAnswer: 1, explanation: '「Sudah + 動詞?」で完了を確認する疑問文。' },
  // sedang進行 (2問)
  { questionId: 'l3-g007', level: 3, type: 'grammar', category: 'sedang-progressive', question: '「私は今食べています」の正しいインドネシア語は？', options: ['Saya sudah makan sekarang.', 'Saya akan makan sekarang.', 'Saya sedang makan sekarang.', 'Saya belum makan sekarang.'], correctAnswer: 2, explanation: 'Sedang + 動詞 で進行中を表す。「Sedang makan」= 食べている最中。' },
  { questionId: 'l3-g008', level: 3, type: 'grammar', category: 'sedang-progressive', question: '「彼女は今電話しています」の正しいインドネシア語は？', options: ['Dia sudah telepon.', 'Dia sedang telepon.', 'Dia akan telepon.', 'Dia belum telepon.'], correctAnswer: 1, explanation: 'Sedang = 〜している最中。「Dia sedang telepon.」= 電話中です。' },
  // belum未完了 (2問)
  { questionId: 'l3-g009', level: 3, type: 'grammar', category: 'belum-not-yet', question: '「私はまだ食べていません」の正しいインドネシア語は？', options: ['Saya tidak makan.', 'Saya sudah makan.', 'Saya belum makan.', 'Saya bukan makan.'], correctAnswer: 2, explanation: 'Belum = まだ〜していない。Tidak = 〜しない。ニュアンスが異なる。' },
  { questionId: 'l3-g010', level: 3, type: 'grammar', category: 'belum-not-yet', question: '「まだ届いていません」の正しいインドネシア語は？', options: ['Tidak sampai.', 'Sudah sampai.', 'Belum sampai.', 'Akan sampai.'], correctAnswer: 2, explanation: 'Belum sampai = まだ届いていない。いずれ届く含みがある。' },
  // 接続詞 dan/atau/tetapi (3問)
  { questionId: 'l3-g011', level: 3, type: 'grammar', category: 'conjunction', question: '「コーヒーと紅茶」の正しいインドネシア語は？', options: ['Kopi atau teh', 'Kopi dan teh', 'Kopi tetapi teh', 'Kopi dengan teh'], correctAnswer: 1, explanation: 'Dan = そして・と（and）。「Kopi dan teh」= コーヒーと紅茶。' },
  { questionId: 'l3-g012', level: 3, type: 'grammar', category: 'conjunction', question: '「コーヒーか紅茶」の正しいインドネシア語は？', options: ['Kopi dan teh', 'Kopi atau teh', 'Kopi tetapi teh', 'Kopi dengan teh'], correctAnswer: 1, explanation: 'Atau = または（or）。「Kopi atau teh?」= コーヒーか紅茶？' },
  { questionId: 'l3-g013', level: 3, type: 'grammar', category: 'conjunction', question: '「高いけど美味しい」の正しいインドネシア語は？', options: ['Mahal dan enak.', 'Mahal atau enak.', 'Mahal tetapi enak.', 'Mahal dengan enak.'], correctAnswer: 2, explanation: 'Tetapi / Tapi = しかし・けれど（but）。逆接の接続詞。' },
  // tolong依頼 (2問)
  { questionId: 'l3-g014', level: 3, type: 'grammar', category: 'tolong-request', question: '「手伝ってください」の正しいインドネシア語は？', options: ['Tolong bantu saya.', 'Bantu tolong saya.', 'Saya tolong bantu.', 'Tolong saya bantu.'], correctAnswer: 0, explanation: 'Tolong + 動詞 で丁寧な依頼。「Tolong bantu saya.」= 助けてください。' },
  { questionId: 'l3-g015', level: 3, type: 'grammar', category: 'tolong-request', question: '「写真を撮ってください」の正しいインドネシア語は？', options: ['Foto tolong ambil.', 'Tolong foto ambil.', 'Tolong ambil foto.', 'Ambil tolong foto.'], correctAnswer: 2, explanation: 'Tolong + 動詞 + 目的語。「Tolong ambil foto.」= 写真を撮ってください。' },
  // 数量表現 (3問)
  { questionId: 'l3-g016', level: 3, type: 'grammar', category: 'quantity', question: '「水を一杯ください」の正しいインドネシア語は？', options: ['Minta air satu gelas.', 'Minta satu gelas air.', 'Satu air gelas minta.', 'Gelas satu air minta.'], correctAnswer: 1, explanation: '数 + 助数詞 + 名詞 の語順。「Satu gelas air」= 水一杯。' },
  { questionId: 'l3-g017', level: 3, type: 'grammar', category: 'quantity', question: '「たくさんの人」の正しいインドネシア語は？', options: ['Orang banyak', 'Banyak orang', 'Orang yang banyak', 'Banyak yang orang'], correctAnswer: 1, explanation: 'Banyak = たくさん。数量詞は名詞の前に置く。「Banyak orang」= たくさんの人。' },
  { questionId: 'l3-g018', level: 3, type: 'grammar', category: 'quantity', question: '「少しの時間」の正しいインドネシア語は？', options: ['Waktu sedikit', 'Sedikit waktu', 'Waktu yang sedikit', 'Sedikit yang waktu'], correctAnswer: 1, explanation: 'Sedikit = 少し。数量詞 + 名詞: 「Sedikit waktu」= 少しの時間。' },
  // mau/ingin願望 (2問)
  { questionId: 'l3-g019', level: 3, type: 'grammar', category: 'mau-ingin', question: '「私はコーヒーが飲みたいです」の正しいインドネシア語は？', options: ['Saya mau minum kopi.', 'Saya minum mau kopi.', 'Mau saya minum kopi.', 'Saya kopi mau minum.'], correctAnswer: 0, explanation: 'Mau + 動詞 で「〜したい」。「Saya mau minum kopi.」= コーヒーが飲みたい。' },
  { questionId: 'l3-g020', level: 3, type: 'grammar', category: 'mau-ingin', question: '「私はインドネシアに行きたいです」の正しいインドネシア語は？', options: ['Saya pergi ingin ke Indonesia.', 'Saya ingin pergi ke Indonesia.', 'Ingin saya pergi ke Indonesia.', 'Saya ke Indonesia ingin pergi.'], correctAnswer: 1, explanation: 'Ingin + 動詞 で「〜したい（丁寧）」。Mau より丁寧な表現。' },
];

export const level3Questions: SeedQuestion[] = [...level3Vocabulary, ...level3Grammar];
