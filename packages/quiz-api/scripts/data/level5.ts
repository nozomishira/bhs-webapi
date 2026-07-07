import { SeedQuestion } from '../seed-data';

// Level 5: 単語20問 + 文法20問 = 40問
// テーマ: 文化・慣用句・複合語・政治・抽象概念・フォーマル表現・借用語
// 文法: 受動態主語強調・ber-接頭辞・ke-an接辞・重複形・per-接頭辞・-kan/-i接尾辞・フォーマル接続詞・関係代名詞yang

export const level5Vocabulary: SeedQuestion[] = [
  // 文化 (3問)
  { questionId: 'l5-v001', level: 5, type: 'vocabulary', category: 'culture', question: '「伝統」のインドネシア語は？', options: ['Budaya', 'Tradisi', 'Adat', 'Seni'], correctAnswer: 1, explanation: 'Tradisi = 伝統。Adat = 慣習、Budaya = 文化、Seni = 芸術。', indonesianWord: 'Tradisi' },
  { questionId: 'l5-v002', level: 5, type: 'vocabulary', category: 'culture', question: '「芸術」のインドネシア語は？', options: ['Budaya', 'Tradisi', 'Seni', 'Adat'], correctAnswer: 2, explanation: 'Seni = 芸術。Seni rupa = 美術、Seni musik = 音楽芸術。', indonesianWord: 'Seni' },
  { questionId: 'l5-v003', level: 5, type: 'vocabulary', category: 'culture', question: '「祭り」のインドネシア語は？', options: ['Pesta', 'Festival', 'Upacara', 'Perayaan'], correctAnswer: 3, explanation: 'Perayaan = 祭り・祝典。rayaから派生（pe-...-an）。Hari Raya = 祝日。', indonesianWord: 'Perayaan' },
  // 慣用句 (3問)
  { questionId: 'l5-v004', level: 5, type: 'vocabulary', category: 'idiom', question: '「masuk angin」の意味は？', options: ['風邪をひく', '風が入る', '部屋に入る', '気分が悪い'], correctAnswer: 0, explanation: 'Masuk angin = 風邪をひく（直訳: 風が入る）。インドネシア独特の表現。', indonesianWord: 'Masuk angin' },
  { questionId: 'l5-v005', level: 5, type: 'vocabulary', category: 'idiom', question: '「naik darah」の意味は？', options: ['血圧が上がる', '怒る', '興奮する', '顔が赤くなる'], correctAnswer: 1, explanation: 'Naik darah = 怒る・激怒する（直訳: 血が上がる）。', indonesianWord: 'Naik darah' },
  { questionId: 'l5-v006', level: 5, type: 'vocabulary', category: 'idiom', question: '「buah tangan」の意味は？', options: ['果物', '手作り', 'お土産', '手の実'], correctAnswer: 2, explanation: 'Buah tangan = お土産（直訳: 手の果物）。旅行先からの贈り物。', indonesianWord: 'Buah tangan' },
  // 複合語 (3問)
  { questionId: 'l5-v007', level: 5, type: 'vocabulary', category: 'compound', question: '「mata hari」の意味は？', options: ['目の日', '太陽', 'スパイ', '目薬'], correctAnswer: 1, explanation: 'Mata hari = 太陽（直訳: 日の目）。mata = 目、hari = 日。', indonesianWord: 'Mata hari' },
  { questionId: 'l5-v008', level: 5, type: 'vocabulary', category: 'compound', question: '「rumah sakit」の意味は？', options: ['病気の家', '病院', '療養所', '救急車'], correctAnswer: 1, explanation: 'Rumah sakit = 病院（直訳: 病気の家）。rumah = 家、sakit = 病気。', indonesianWord: 'Rumah sakit' },
  { questionId: 'l5-v009', level: 5, type: 'vocabulary', category: 'compound', question: '「kerja sama」の意味は？', options: ['同じ仕事', '協力', '同僚', '共同作業'], correctAnswer: 1, explanation: 'Kerja sama = 協力（直訳: 一緒に働く）。kerja = 仕事、sama = 同じ。', indonesianWord: 'Kerja sama' },
  // 政治 (2問)
  { questionId: 'l5-v010', level: 5, type: 'vocabulary', category: 'politics', question: '「政府」のインドネシア語は？', options: ['Negara', 'Pemerintah', 'Presiden', 'Rakyat'], correctAnswer: 1, explanation: 'Pemerintah = 政府。perintah(命令) に接辞 pe- がついた形。', indonesianWord: 'Pemerintah' },
  { questionId: 'l5-v011', level: 5, type: 'vocabulary', category: 'politics', question: '「法律」のインドネシア語は？', options: ['Aturan', 'Hukum', 'Undang-undang', 'Peraturan'], correctAnswer: 1, explanation: 'Hukum = 法律。Undang-undang = 法令（より正式）。', indonesianWord: 'Hukum' },
  // 抽象概念 (3問)
  { questionId: 'l5-v012', level: 5, type: 'vocabulary', category: 'abstract', question: '「自由」のインドネシア語は？', options: ['Keadilan', 'Kemerdekaan', 'Kebebasan', 'Keamanan'], correctAnswer: 2, explanation: 'Kebebasan = 自由。bebas(自由な) + ke-...-an で抽象名詞化。', indonesianWord: 'Kebebasan' },
  { questionId: 'l5-v013', level: 5, type: 'vocabulary', category: 'abstract', question: '「正義」のインドネシア語は？', options: ['Kebebasan', 'Keadilan', 'Kebenaran', 'Kebaikan'], correctAnswer: 1, explanation: 'Keadilan = 正義・公正。adil(公正な) + ke-...-an。Pancasilaの第5原則。', indonesianWord: 'Keadilan' },
  { questionId: 'l5-v014', level: 5, type: 'vocabulary', category: 'abstract', question: '「発展・開発」のインドネシア語は？', options: ['Kemajuan', 'Pembangunan', 'Pertumbuhan', 'Perkembangan'], correctAnswer: 1, explanation: 'Pembangunan = 開発・発展。bangun(建てる) + pe-...-an。', indonesianWord: 'Pembangunan' },
  // フォーマル表現 (3問)
  { questionId: 'l5-v015', level: 5, type: 'vocabulary', category: 'formal', question: '「しかしながら（フォーマル）」のインドネシア語は？', options: ['Tapi', 'Tetapi', 'Namun', 'Akan tetapi'], correctAnswer: 2, explanation: 'Namun = しかしながら（フォーマル）。Tapi はカジュアル。', indonesianWord: 'Namun' },
  { questionId: 'l5-v016', level: 5, type: 'vocabulary', category: 'formal', question: '「したがって（フォーマル）」のインドネシア語は？', options: ['Jadi', 'Oleh karena itu', 'Karena', 'Makanya'], correctAnswer: 1, explanation: 'Oleh karena itu = したがって（フォーマル）。Jadi はカジュアル。', indonesianWord: 'Oleh karena itu' },
  { questionId: 'l5-v017', level: 5, type: 'vocabulary', category: 'formal', question: '「〜に関して（フォーマル）」のインドネシア語は？', options: ['Tentang', 'Mengenai', 'Soal', 'Masalah'], correctAnswer: 1, explanation: 'Mengenai = 〜に関して（フォーマル）。Tentang はよりカジュアル。', indonesianWord: 'Mengenai' },
  // 借用語 (3問)
  { questionId: 'l5-v018', level: 5, type: 'vocabulary', category: 'loanword', question: '「kualitas」はどの言語からの借用語か？', options: ['英語', 'オランダ語', 'アラビア語', 'サンスクリット語'], correctAnswer: 0, explanation: 'Kualitas = 品質。英語 quality からの借用語。', indonesianWord: 'Kualitas' },
  { questionId: 'l5-v019', level: 5, type: 'vocabulary', category: 'loanword', question: '「masjid（モスク）」はどの言語からの借用語か？', options: ['英語', 'オランダ語', 'アラビア語', 'ポルトガル語'], correctAnswer: 2, explanation: 'Masjid = モスク。アラビア語 مسجد (masjid) からの借用語。', indonesianWord: 'Masjid' },
  { questionId: 'l5-v020', level: 5, type: 'vocabulary', category: 'loanword', question: '「kantor（事務所）」はどの言語からの借用語か？', options: ['英語', 'オランダ語', 'アラビア語', 'ポルトガル語'], correctAnswer: 1, explanation: 'Kantor = 事務所。オランダ語 kantoor からの借用語。', indonesianWord: 'Kantor' },
];

export const level5Grammar: SeedQuestion[] = [
  // 受動態主語強調 (2問)
  { questionId: 'l5-g001', level: 5, type: 'grammar', category: 'passive-subject-focus', question: '「この手紙は私が書きました」の正しいインドネシア語は？', options: ['Surat ini saya tulis.', 'Surat ini ditulis saya.', 'Saya menulis surat ini.', 'Ditulis saya surat ini.'], correctAnswer: 0, explanation: '一人称・二人称主語の受動態: 目的語 + 主語 + 動詞語幹。「Surat ini saya tulis.」' },
  { questionId: 'l5-g002', level: 5, type: 'grammar', category: 'passive-subject-focus', question: '「このケーキは彼女が作りました」の正しいインドネシア語は？', options: ['Kue ini dia buat.', 'Kue ini dibuat dia.', 'Dia membuat kue ini.', 'Dibuat kue ini dia.'], correctAnswer: 0, explanation: '三人称も口語では「目的語 + 主語 + 動詞語幹」が使える。「Kue ini dia buat.」' },
  // ber-接頭辞 (3問)
  { questionId: 'l5-g003', level: 5, type: 'grammar', category: 'prefix-ber', question: '「berbicara」の意味は？', options: ['話させる', '話す', '話される', '話し合い'], correctAnswer: 1, explanation: 'Ber- + bicara = berbicara（話す）。Ber- は自動詞・状態を表す接頭辞。' },
  { questionId: 'l5-g004', level: 5, type: 'grammar', category: 'prefix-ber', question: '「berjalan」の意味は？', options: ['歩かせる', '歩く', '歩かれる', '散歩'], correctAnswer: 1, explanation: 'Ber- + jalan = berjalan（歩く）。Ber- は自発的な動作を表す。' },
  { questionId: 'l5-g005', level: 5, type: 'grammar', category: 'prefix-ber', question: '「berpakaian」の意味は？', options: ['服を作る', '服を着る', '服を脱ぐ', '服を洗う'], correctAnswer: 1, explanation: 'Ber- + pakaian = berpakaian（服を着る・着ている）。状態を表す。' },
  // ke-an接辞 (3問)
  { questionId: 'l5-g006', level: 5, type: 'grammar', category: 'circumfix-ke-an', question: '「kesehatan」の意味は？', options: ['健康な', '健康', '病院', '医者'], correctAnswer: 1, explanation: 'Ke- + sehat + -an = kesehatan（健康）。抽象名詞を作る接辞。' },
  { questionId: 'l5-g007', level: 5, type: 'grammar', category: 'circumfix-ke-an', question: '「kehujanan」の意味は？', options: ['雨が降る', '雨に降られる', '雨季', '雨雲'], correctAnswer: 1, explanation: 'Ke- + hujan + -an = kehujanan（雨に降られる）。不本意な被害を表す。' },
  { questionId: 'l5-g008', level: 5, type: 'grammar', category: 'circumfix-ke-an', question: '「kemampuan」の意味は？', options: ['能力', '可能性', '許可', '義務'], correctAnswer: 0, explanation: 'Ke- + mampu + -an = kemampuan（能力）。mampu = できる。' },
  // 重複形 (2問)
  { questionId: 'l5-g009', level: 5, type: 'grammar', category: 'reduplication', question: '「anak-anak」の意味は？', options: ['子供', '子供たち', '小さい子供', '子供っぽい'], correctAnswer: 1, explanation: '名詞の重複で複数を表す。anak = 子供 → anak-anak = 子供たち。' },
  { questionId: 'l5-g010', level: 5, type: 'grammar', category: 'reduplication', question: '「sayur-mayur」の意味は？', options: ['一つの野菜', '野菜類', '野菜炒め', '生野菜'], correctAnswer: 1, explanation: '部分的重複で「〜の類」を表す。sayur-mayur = 各種野菜・野菜類。' },
  // per-接頭辞 (2問)
  { questionId: 'l5-g011', level: 5, type: 'grammar', category: 'prefix-per', question: '「pelajaran」の意味は？', options: ['生徒', '先生', '授業・科目', '学校'], correctAnswer: 2, explanation: 'Pe- + ajar + -an = pelajaran（授業・科目）。ajar = 教える。' },
  { questionId: 'l5-g012', level: 5, type: 'grammar', category: 'prefix-per', question: '「perjalanan」の意味は？', options: ['歩く', '道', '旅行・道のり', '乗り物'], correctAnswer: 2, explanation: 'Per- + jalan + -an = perjalanan（旅行・道のり）。jalan = 道・歩く。' },
  // -kan/-i接尾辞 (3問)
  { questionId: 'l5-g013', level: 5, type: 'grammar', category: 'suffix-kan-i', question: '「membelikan」と「membeli」の違いは？', options: ['同じ意味', '前者は「〜のために買う」', '前者は受動態', '前者は過去形'], correctAnswer: 1, explanation: '-kan は受益者を表す。Membelikan = 〜のために買ってあげる。Membeli = 買う。' },
  { questionId: 'l5-g014', level: 5, type: 'grammar', category: 'suffix-kan-i', question: '「mendatangi」の意味は？', options: ['来る', '〜を訪れる', '来させる', '来られる'], correctAnswer: 1, explanation: '-i は場所・対象に向かう動作を表す。Mendatangi = 〜を訪れる・〜のところへ行く。' },
  { questionId: 'l5-g015', level: 5, type: 'grammar', category: 'suffix-kan-i', question: '「menjelaskan」の意味は？', options: ['明らかになる', '説明する', '明確な', '理解する'], correctAnswer: 1, explanation: 'Men- + jelas + -kan = menjelaskan（説明する）。-kan で他動詞化。' },
  // フォーマル接続詞 (3問)
  { questionId: 'l5-g016', level: 5, type: 'grammar', category: 'formal-conjunction', question: '「〜であるにもかかわらず」のフォーマルなインドネシア語は？', options: ['Tapi', 'Walaupun', 'Meskipun', 'Karena'], correctAnswer: 2, explanation: 'Meskipun / Walaupun = 〜にもかかわらず（譲歩）。両方フォーマルだがMeskipunがより文語的。' },
  { questionId: 'l5-g017', level: 5, type: 'grammar', category: 'formal-conjunction', question: '「〜する限り」のインドネシア語は？', options: ['Selama', 'Asalkan', 'Sebelum', 'Sesudah'], correctAnswer: 1, explanation: 'Asalkan = 〜する限り・〜さえすれば（条件）。Selama = 〜の間。' },
  { questionId: 'l5-g018', level: 5, type: 'grammar', category: 'formal-conjunction', question: '「〜した後で」のフォーマルなインドネシア語は？', options: ['Sebelum', 'Sesudah', 'Setelah', 'Selama'], correctAnswer: 2, explanation: 'Setelah = 〜した後で（フォーマル）。Sesudah も同義だがSetelahがより一般的。' },
  // 関係代名詞 yang (2問)
  { questionId: 'l5-g019', level: 5, type: 'grammar', category: 'relative-yang', question: '「昨日買った本」の正しいインドネシア語は？', options: ['Buku membeli kemarin', 'Buku yang saya beli kemarin', 'Buku kemarin yang beli', 'Yang buku saya beli kemarin'], correctAnswer: 1, explanation: '名詞 + yang + 修飾節。「Buku yang saya beli kemarin」= 昨日私が買った本。' },
  { questionId: 'l5-g020', level: 5, type: 'grammar', category: 'relative-yang', question: '「ここに住んでいる人」の正しいインドネシア語は？', options: ['Orang tinggal yang di sini', 'Orang yang tinggal di sini', 'Yang orang tinggal di sini', 'Orang di sini yang tinggal'], correctAnswer: 1, explanation: '名詞 + yang + 動詞句。「Orang yang tinggal di sini」= ここに住んでいる人。' },
];

export const level5Questions: SeedQuestion[] = [...level5Vocabulary, ...level5Grammar];
