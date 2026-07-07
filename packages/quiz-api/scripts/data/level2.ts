import { SeedQuestion } from '../seed-data';

// Level 2: 単語20問 + 文法20問 = 40問
// テーマ: 家族・食べ物・場所・形容詞・時間・体 / SVO語順・否定・疑問詞・形容詞の位置・前置詞・ada構文

export const level2Vocabulary: SeedQuestion[] = [
  // 家族 (4問)
  { questionId: 'l2-v001', level: 2, type: 'vocabulary', category: 'family', question: '「父」のインドネシア語は？', options: ['Ibu', 'Ayah', 'Kakak', 'Adik'], correctAnswer: 1, explanation: 'Ayah = 父。Bapak も使われるが、よりフォーマル。', indonesianWord: 'Ayah' },
  { questionId: 'l2-v002', level: 2, type: 'vocabulary', category: 'family', question: '「母」のインドネシア語は？', options: ['Ayah', 'Kakak', 'Ibu', 'Nenek'], correctAnswer: 2, explanation: 'Ibu = 母。敬称としても使われる（〜さん）。', indonesianWord: 'Ibu' },
  { questionId: 'l2-v003', level: 2, type: 'vocabulary', category: 'family', question: '「兄・姉」のインドネシア語は？', options: ['Adik', 'Kakak', 'Paman', 'Bibi'], correctAnswer: 1, explanation: 'Kakak = 兄・姉（年上のきょうだい）。性別を区別しない。', indonesianWord: 'Kakak' },
  { questionId: 'l2-v004', level: 2, type: 'vocabulary', category: 'family', question: '「弟・妹」のインドネシア語は？', options: ['Kakak', 'Adik', 'Anak', 'Cucu'], correctAnswer: 1, explanation: 'Adik = 弟・妹（年下のきょうだい）。性別を区別しない。', indonesianWord: 'Adik' },
  // 食べ物・飲み物 (6問)
  { questionId: 'l2-v005', level: 2, type: 'vocabulary', category: 'food', question: '「ご飯・米」のインドネシア語は？', options: ['Roti', 'Nasi', 'Mie', 'Sayur'], correctAnswer: 1, explanation: 'Nasi = ご飯（炊いた米）。インドネシアの主食。', indonesianWord: 'Nasi' },
  { questionId: 'l2-v006', level: 2, type: 'vocabulary', category: 'food', question: '「鶏肉」のインドネシア語は？', options: ['Ayam', 'Ikan', 'Sapi', 'Kambing'], correctAnswer: 0, explanation: 'Ayam = 鶏・鶏肉。Nasi goreng ayam = 鶏肉チャーハン。', indonesianWord: 'Ayam' },
  { questionId: 'l2-v007', level: 2, type: 'vocabulary', category: 'food', question: '「魚」のインドネシア語は？', options: ['Ayam', 'Sapi', 'Ikan', 'Udang'], correctAnswer: 2, explanation: 'Ikan = 魚。島国インドネシアでは魚料理が豊富。', indonesianWord: 'Ikan' },
  { questionId: 'l2-v008', level: 2, type: 'vocabulary', category: 'food', question: '「水」のインドネシア語は？', options: ['Teh', 'Kopi', 'Air', 'Susu'], correctAnswer: 2, explanation: 'Air = 水。Air putih = 白湯・飲料水。', indonesianWord: 'Air' },
  { questionId: 'l2-v009', level: 2, type: 'vocabulary', category: 'food', question: '「コーヒー」のインドネシア語は？', options: ['Teh', 'Kopi', 'Susu', 'Jus'], correctAnswer: 1, explanation: 'Kopi = コーヒー。インドネシアは世界有数のコーヒー産地。', indonesianWord: 'Kopi' },
  { questionId: 'l2-v010', level: 2, type: 'vocabulary', category: 'food', question: '「果物」のインドネシア語は？', options: ['Sayur', 'Buah', 'Daging', 'Roti'], correctAnswer: 1, explanation: 'Buah = 果物。トロピカルフルーツが豊富。', indonesianWord: 'Buah' },
  // 場所 (3問)
  { questionId: 'l2-v011', level: 2, type: 'vocabulary', category: 'place', question: '「学校」のインドネシア語は？', options: ['Rumah', 'Sekolah', 'Kantor', 'Toko'], correctAnswer: 1, explanation: 'Sekolah = 学校。Murid = 生徒、Guru = 先生。', indonesianWord: 'Sekolah' },
  { questionId: 'l2-v012', level: 2, type: 'vocabulary', category: 'place', question: '「家」のインドネシア語は？', options: ['Sekolah', 'Kantor', 'Rumah', 'Pasar'], correctAnswer: 2, explanation: 'Rumah = 家。Rumah sakit = 病院（直訳: 病気の家）。', indonesianWord: 'Rumah' },
  { questionId: 'l2-v013', level: 2, type: 'vocabulary', category: 'place', question: '「市場」のインドネシア語は？', options: ['Toko', 'Pasar', 'Mall', 'Kantor'], correctAnswer: 1, explanation: 'Pasar = 市場。伝統的な市場はインドネシアの日常に欠かせない。', indonesianWord: 'Pasar' },
  // 形容詞 (3問)
  { questionId: 'l2-v014', level: 2, type: 'vocabulary', category: 'adjective', question: '「大きい」のインドネシア語は？', options: ['Kecil', 'Besar', 'Panjang', 'Pendek'], correctAnswer: 1, explanation: 'Besar = 大きい。反対語は Kecil（小さい）。', indonesianWord: 'Besar' },
  { questionId: 'l2-v015', level: 2, type: 'vocabulary', category: 'adjective', question: '「小さい」のインドネシア語は？', options: ['Besar', 'Tinggi', 'Kecil', 'Rendah'], correctAnswer: 2, explanation: 'Kecil = 小さい。反対語は Besar（大きい）。', indonesianWord: 'Kecil' },
  { questionId: 'l2-v016', level: 2, type: 'vocabulary', category: 'adjective', question: '「新しい」のインドネシア語は？', options: ['Lama', 'Baru', 'Tua', 'Muda'], correctAnswer: 1, explanation: 'Baru = 新しい。反対語は Lama（古い・長い時間）。', indonesianWord: 'Baru' },
  // 時間 (2問)
  { questionId: 'l2-v017', level: 2, type: 'vocabulary', category: 'time', question: '「今日」のインドネシア語は？', options: ['Kemarin', 'Hari ini', 'Besok', 'Lusa'], correctAnswer: 1, explanation: 'Hari ini = 今日。Hari = 日、ini = これ。', indonesianWord: 'Hari ini' },
  { questionId: 'l2-v018', level: 2, type: 'vocabulary', category: 'time', question: '「明日」のインドネシア語は？', options: ['Kemarin', 'Hari ini', 'Besok', 'Tadi'], correctAnswer: 2, explanation: 'Besok = 明日。Kemarin = 昨日。', indonesianWord: 'Besok' },
  // 体 (2問)
  { questionId: 'l2-v019', level: 2, type: 'vocabulary', category: 'body', question: '「頭」のインドネシア語は？', options: ['Tangan', 'Kaki', 'Kepala', 'Mata'], correctAnswer: 2, explanation: 'Kepala = 頭。Sakit kepala = 頭痛。', indonesianWord: 'Kepala' },
  { questionId: 'l2-v020', level: 2, type: 'vocabulary', category: 'body', question: '「手」のインドネシア語は？', options: ['Kaki', 'Tangan', 'Kepala', 'Perut'], correctAnswer: 1, explanation: 'Tangan = 手。Kaki = 足。', indonesianWord: 'Tangan' },
];

export const level2Grammar: SeedQuestion[] = [
  // SVO語順 (3問)
  { questionId: 'l2-g001', level: 2, type: 'grammar', category: 'svo', question: '「私はご飯を食べます」の正しいインドネシア語は？', options: ['Nasi saya makan.', 'Saya makan nasi.', 'Makan saya nasi.', 'Saya nasi makan.'], correctAnswer: 1, explanation: 'インドネシア語はSVO語順。主語(Saya) + 動詞(makan) + 目的語(nasi)。' },
  { questionId: 'l2-g002', level: 2, type: 'grammar', category: 'svo', question: '「彼は本を読みます」の正しいインドネシア語は？', options: ['Dia membaca buku.', 'Buku dia membaca.', 'Membaca dia buku.', 'Dia buku membaca.'], correctAnswer: 0, explanation: 'SVO語順: Dia(主語) + membaca(動詞) + buku(目的語)。' },
  { questionId: 'l2-g003', level: 2, type: 'grammar', category: 'svo', question: '「彼女は水を飲みます」の正しいインドネシア語は？', options: ['Air dia minum.', 'Minum dia air.', 'Dia minum air.', 'Dia air minum.'], correctAnswer: 2, explanation: 'SVO語順: Dia(主語) + minum(動詞) + air(目的語)。' },
  // tidak否定 (3問)
  { questionId: 'l2-g004', level: 2, type: 'grammar', category: 'tidak-negation', question: '「私は食べません」の正しいインドネシア語は？', options: ['Saya bukan makan.', 'Saya tidak makan.', 'Tidak saya makan.', 'Saya makan tidak.'], correctAnswer: 1, explanation: 'Tidak は動詞・形容詞の前に置いて否定する。主語 + tidak + 動詞。' },
  { questionId: 'l2-g005', level: 2, type: 'grammar', category: 'tidak-negation', question: '「このコーヒーは美味しくない」の正しいインドネシア語は？', options: ['Kopi ini bukan enak.', 'Kopi ini tidak enak.', 'Tidak kopi ini enak.', 'Kopi ini enak tidak.'], correctAnswer: 1, explanation: 'Tidak は形容詞の否定にも使う。名詞 + tidak + 形容詞。' },
  { questionId: 'l2-g006', level: 2, type: 'grammar', category: 'tidak-negation', question: '「彼は来ません」の正しいインドネシア語は？', options: ['Dia bukan datang.', 'Dia datang tidak.', 'Dia tidak datang.', 'Tidak dia datang.'], correctAnswer: 2, explanation: 'Tidak + 動詞 で動作の否定。「Dia tidak datang.」= 彼は来ない。' },
  // bukan否定 (2問)
  { questionId: 'l2-g007', level: 2, type: 'grammar', category: 'bukan-negation', question: '「これはお茶ではありません」の正しいインドネシア語は？', options: ['Ini tidak teh.', 'Ini bukan teh.', 'Bukan ini teh.', 'Ini teh bukan.'], correctAnswer: 1, explanation: 'Bukan は名詞の否定に使う。「Ini bukan teh.」= これはお茶ではない。' },
  { questionId: 'l2-g008', level: 2, type: 'grammar', category: 'bukan-negation', question: '「彼は先生ではありません」の正しいインドネシア語は？', options: ['Dia tidak guru.', 'Dia bukan guru.', 'Bukan dia guru.', 'Dia guru bukan.'], correctAnswer: 1, explanation: 'Bukan + 名詞 で「〜ではない」。Tidak は動詞・形容詞の否定。' },
  // 疑問詞 (3問)
  { questionId: 'l2-g009', level: 2, type: 'grammar', category: 'interrogative', question: '「あなたは何を食べますか？」の正しいインドネシア語は？', options: ['Anda makan apa?', 'Apa Anda makan?', 'Makan apa Anda?', 'Anda apa makan?'], correctAnswer: 0, explanation: '「Anda makan apa?」= あなたは何を食べますか？ apa は文末に置ける。' },
  { questionId: 'l2-g010', level: 2, type: 'grammar', category: 'interrogative', question: '「トイレはどこですか？」の正しいインドネシア語は？', options: ['Toilet di mana?', 'Di mana toilet?', 'Mana toilet di?', 'Toilet mana di?'], correctAnswer: 0, explanation: '「Toilet di mana?」が一般的。「Di mana toilet?」も可。' },
  { questionId: 'l2-g011', level: 2, type: 'grammar', category: 'interrogative', question: '「これはいくらですか？」の正しいインドネシア語は？', options: ['Apa harganya?', 'Berapa harganya?', 'Siapa harganya?', 'Kapan harganya?'], correctAnswer: 1, explanation: 'Berapa = いくら・いくつ。「Berapa harganya?」= いくらですか？' },
  // 形容詞の位置 (3問)
  { questionId: 'l2-g012', level: 2, type: 'grammar', category: 'adjective-position', question: '「大きい家」の正しいインドネシア語は？', options: ['Besar rumah', 'Rumah besar', 'Rumah yang besar', 'Besar yang rumah'], correctAnswer: 1, explanation: 'インドネシア語の形容詞は名詞の後。「Rumah besar」= 大きい家。' },
  { questionId: 'l2-g013', level: 2, type: 'grammar', category: 'adjective-position', question: '「美味しい料理」の正しいインドネシア語は？', options: ['Enak masakan', 'Masakan enak', 'Enak yang masakan', 'Yang enak masakan'], correctAnswer: 1, explanation: '名詞 + 形容詞 の語順。「Masakan enak」= 美味しい料理。' },
  { questionId: 'l2-g014', level: 2, type: 'grammar', category: 'adjective-position', question: '「冷たい水」の正しいインドネシア語は？', options: ['Dingin air', 'Air dingin', 'Air yang dingin', 'Dingin yang air'], correctAnswer: 1, explanation: '名詞 + 形容詞: 「Air dingin」= 冷たい水。dingin = 冷たい。' },
  // 前置詞 di/ke/dari (3問)
  { questionId: 'l2-g015', level: 2, type: 'grammar', category: 'preposition', question: '「私は学校にいます」の正しいインドネシア語は？', options: ['Saya ke sekolah.', 'Saya di sekolah.', 'Saya dari sekolah.', 'Saya sekolah di.'], correctAnswer: 1, explanation: 'Di = 〜で・〜に（場所を表す）。「Saya di sekolah.」= 私は学校にいる。' },
  { questionId: 'l2-g016', level: 2, type: 'grammar', category: 'preposition', question: '「私は学校へ行きます」の正しいインドネシア語は？', options: ['Saya pergi di sekolah.', 'Saya pergi dari sekolah.', 'Saya pergi ke sekolah.', 'Saya pergi sekolah ke.'], correctAnswer: 2, explanation: 'Ke = 〜へ（方向）。「Pergi ke sekolah」= 学校へ行く。' },
  { questionId: 'l2-g017', level: 2, type: 'grammar', category: 'preposition', question: '「私は日本から来ました」の正しいインドネシア語は？', options: ['Saya datang di Jepang.', 'Saya datang ke Jepang.', 'Saya datang dari Jepang.', 'Saya dari datang Jepang.'], correctAnswer: 2, explanation: 'Dari = 〜から（出発点）。「Datang dari Jepang」= 日本から来た。' },
  // ada構文 (3問)
  { questionId: 'l2-g018', level: 2, type: 'grammar', category: 'ada-construction', question: '「机の上に本があります」の正しいインドネシア語は？', options: ['Buku ada di atas meja.', 'Ada buku di atas meja.', 'Di atas meja buku ada.', 'Ada di atas meja buku.'], correctAnswer: 1, explanation: 'Ada + 名詞 + 場所 で「〜に…がある」。「Ada buku di atas meja.」' },
  { questionId: 'l2-g019', level: 2, type: 'grammar', category: 'ada-construction', question: '「ここにトイレはありますか？」の正しいインドネシア語は？', options: ['Ada toilet di sini?', 'Toilet ada di sini?', 'Di sini ada toilet?', 'Ada di sini toilet?'], correctAnswer: 0, explanation: '「Ada + 名詞 + 場所?」で存在を尋ねる。「Ada toilet di sini?」' },
  { questionId: 'l2-g020', level: 2, type: 'grammar', category: 'ada-construction', question: '「お金がありません」の正しいインドネシア語は？', options: ['Uang tidak ada.', 'Tidak ada uang.', 'Ada tidak uang.', 'Tidak uang ada.'], correctAnswer: 1, explanation: 'Tidak ada + 名詞 で「〜がない」。「Tidak ada uang.」= お金がない。' },
];

export const level2Questions: SeedQuestion[] = [...level2Vocabulary, ...level2Grammar];
