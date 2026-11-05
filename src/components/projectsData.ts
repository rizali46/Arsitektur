export type ProjectCategory = 'Residensial' | 'Galeri & Budaya' | 'Hospitaliti' | 'Ruang Monolitik';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  areaSqm: number;
  category: ProjectCategory;
  bentoSpan: 'wide' | 'tall' | 'standard';
  plateType: 'brutalist_living' | 'zurich_penthouse' | 'kyoto_sanctuary' | 'milan_spiral' | 'antwerp_monolith' | 'oslo_library' | 'berlin_gallery';
  leadArchitect: string;
  client: string;
  lightingLux: string;
  materials: string[];
  editorialSummary: string;
  spatialNarrative: string;
  acousticRating: string;
  dimensions: {
    ceilingHeight: string;
    primarySpan: string;
    glazingRatio: string;
  };
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'zurich-penthouse',
    index: '01',
    title: 'Haus am Zürichberg',
    subtitle: 'Kediaman Beton Kantilever di Lereng Alpen',
    location: 'Zürich, Swiss',
    year: '2026',
    areaSqm: 640,
    category: 'Residensial',
    bentoSpan: 'wide',
    plateType: 'zurich_penthouse',
    leadArchitect: 'Soren Lindqvist & Elena Vance',
    client: 'Yayasan Seni Privat',
    lightingLux: '2.400K Linier Difusi + Bukaan Cahaya Utara',
    materials: ['Beton Ekspos Cetakan Kayu', 'Kayu Ek Alpen Asap', 'Batu Kuarsit Vals Asah', 'Baja Hitam Canai Panas'],
    editorialSummary:
      'Dipahat pada lereng atas Zürichberg, kediaman seluas 640 m² ini meniadakan sekat dekoratif demi tiga bidang beton berpotongan yang membingkai kabut pegunungan Alpen.',
    spatialNarrative:
      'Setiap ambang pintu dirancang rata sempurna hingga presisi milimeter. Dinding struktural sepanjang 14 meter dari beton ekspos mengikat ruang galeri utama berlangit-langit ganda, sementara kusen baja hitam mengatur kontras bayangan alami di atas lempengan batu Vals.',
    acousticRating: 'NRC 0.85 Panel Kayu Mikro-Perforasi Terintegrasi',
    dimensions: {
      ceilingHeight: '5,40 m',
      primarySpan: '14,20 m',
      glazingRatio: '68%',
    },
  },
  {
    id: 'kyoto-sanctuary',
    index: '02',
    title: 'Paviliun Kuro-An',
    subtitle: 'Rumah Kontemplasi Kayu Arang & Granit',
    location: 'Kyoto, Jepang',
    year: '2026',
    areaSqm: 310,
    category: 'Ruang Monolitik',
    bentoSpan: 'standard',
    plateType: 'kyoto_sanctuary',
    leadArchitect: 'Kenjiro Takahashi',
    client: 'Kolektor Privat',
    lightingLux: '1.900K Cahaya Lantai Tidak Langsung + Layar Washi',
    materials: ['Kayu Cedar Bakar Shou Sugi Ban', 'Granit Belah Kurama', 'Tatami Linen Mentah', 'Kuningan Oksidasi'],
    editorialSummary:
      'Suaka halaman dalam yang didefinisikan oleh teritisan atap yang dalam, dinding kayu cemara bakar, serta bejana air granit Kurama seberat dua ton yang menangkap pantulan langit.',
    spatialNarrative:
      'Terinspirasi oleh esai Jun’ichirō Tanizaki tentang estetika bayangan, Kuro-An menolak pantulan mengilap. Cahaya masuk semata-mata dari bukaan shoji rendah di permukaan lantai, menyapu tekstur kasar batu pahatan tangan.',
    acousticRating: 'NRC 0.90 Plester Tanah & Bilah Akustik Cedar',
    dimensions: {
      ceilingHeight: '3,20 m',
      primarySpan: '8,60 m',
      glazingRatio: '34%',
    },
  },
  {
    id: 'milan-atelier',
    index: '03',
    title: 'Fondazione Brera Loft',
    subtitle: 'Tangga Spiral Plester Pahatan & Arsip Privat',
    location: 'Milan, Italia',
    year: '2025',
    areaSqm: 520,
    category: 'Galeri & Budaya',
    bentoSpan: 'standard',
    plateType: 'milan_spiral',
    leadArchitect: 'Elena Vance',
    client: 'Collezione Marchetti',
    lightingLux: '3.000K Standar Museum CRI 98 & Skylight Okulus',
    materials: ['Plester Marmorino Poles Tangan', 'Batu Kapur Pietra Serena', 'Logam Gunmetal Sikat', 'Kayu Kenari Eropa Pucat'],
    editorialSummary:
      'Transformasi bekas pengecoran logam abad ke-19 di distrik Brera menjadi galeri patung monokrom dan hunian yang berpusat pada tangga plester heliks mandiri.',
    spatialNarrative:
      'Tangga heliks berfungsi layaknya jam matahari vertikal, menangkap cahaya zenital dari okulus atap melingkar dan memproyeksikan bayangan parabola yang terus bergerak sepanjang hari.',
    acousticRating: 'NRC 0.80 Kubah Plester Kapur Akustik',
    dimensions: {
      ceilingHeight: '6,80 m',
      primarySpan: '11,50 m',
      glazingRatio: '42%',
    },
  },
  {
    id: 'antwerp-monolith',
    index: '04',
    title: 'Kediaman Kloosterstraat',
    subtitle: 'Ruang Kuliner & Jamuan Marmer Nero Marquina',
    location: 'Antwerpen, Belgia',
    year: '2025',
    areaSqm: 410,
    category: 'Residensial',
    bentoSpan: 'standard',
    plateType: 'antwerp_monolith',
    leadArchitect: 'Soren Lindqvist',
    client: 'Keluarga Van Der Berg',
    lightingLux: '2.700K Pencahayaan Celah Arsitektural Tersembunyi',
    materials: ['Marmer Nero Marquina Cuci Asam', 'Kayu Ek Belgia Asap', 'Besi Cor Mentah', 'Batu Biru Belgia'],
    editorialSummary:
      'Intervensi rumah bandar monastik di Antwerpen di mana aktivitas kuliner dan ruang makan formal menyatu di sekeliling balok marmer Nero Marquina sepanjang enam meter.',
    spatialNarrative:
      'Seluruh perangkat domestik, jalur tata udara, dan ruang penyimpanan tersembunyi di balik pintu geser kayu ek setinggi langit-langit, menyisakan geometri murni yang berdialog dengan cahaya halaman utara.',
    acousticRating: 'NRC 0.78 Matriks Redaman Plafon Tersembunyi',
    dimensions: {
      ceilingHeight: '4,10 m',
      primarySpan: '9,80 m',
      glazingRatio: '51%',
    },
  },
  {
    id: 'oslo-library',
    index: '05',
    title: 'Ruang Studi & Arsip Bygdøy',
    subtitle: 'Perpustakaan Kayu Nordik & Perapian Beton Kantilever',
    location: 'Oslo, Norwegia',
    year: '2025',
    areaSqm: 290,
    category: 'Ruang Monolitik',
    bentoSpan: 'standard',
    plateType: 'oslo_library',
    leadArchitect: 'Soren Lindqvist',
    client: 'Nordic Literary Trust',
    lightingLux: '2.200K Lampu Baca Hangat + Cahaya Ufuk Fjord',
    materials: ['Kayu Douglas Fir Dinesen (Minyak Hitam)', 'Beton Cor di Tempat', 'Kulit Sadel', 'Aluminium Anodisasi Hitam'],
    editorialSummary:
      'Dibangun di atas tanjung granit yang menghadap Oslofjord, arsip literatur privat ini memadukan rak kayu Douglas fir hitam setinggi ruangan dengan perapian beton melayang sepanjang lima meter.',
    spatialNarrative:
      'Dirancang untuk delapan bulan matahari musim dingin Nordik yang bersudut rendah, ceruk jendela yang dalam menyalurkan cahaya miring melintasi 12.000 jilid arsip berbalut linen monokrom.',
    acousticRating: 'NRC 0.92 Konstruksi Kayu Akustik Spesifikasi Perpustakaan',
    dimensions: {
      ceilingHeight: '3,90 m',
      primarySpan: '10,40 m',
      glazingRatio: '58%',
    },
  },
  {
    id: 'berlin-gallery',
    index: '06',
    title: 'Halle Linienstraße',
    subtitle: 'Ruang Dengar Brutalis & Suaka Eksibisi',
    location: 'Berlin, Jerman',
    year: '2024',
    areaSqm: 780,
    category: 'Hospitaliti',
    bentoSpan: 'wide',
    plateType: 'berlin_gallery',
    leadArchitect: 'Elena Vance & Kenjiro Takahashi',
    client: 'Kolektif Suara & Arsitektur Aether',
    lightingLux: '1.800K Garis Ufuk Monokrom + Chiaroscuro Variabel',
    materials: ['Beton Bunker Semprot Pasir', 'Felt Akustik Mentah', 'Batu Basaltina Asah', 'Aluminium Bubut Padat'],
    editorialSummary:
      'Menempati bekas gardu induk brutalis di Berlin-Mitte, Halle Linienstraße memadukan ruang dengar akustik berpresisi tinggi dengan aula pameran arsitektur minimalis.',
    spatialNarrative:
      'Rongga dinding akustik tebal yang dipahat dari batu basaltina dan wol gelap menghasilkan waktu dengung hanya 0,35 detik, menciptakan keheningan sensorik yang mendalam di jantung kota metropolitan.',
    acousticRating: 'RT60 0,35 dtk Ruang Akustik Terkalibrasi Studio',
    dimensions: {
      ceilingHeight: '7,20 m',
      primarySpan: '18,00 m',
      glazingRatio: '22%',
    },
  },
];

export interface MaterialSample {
  id: string;
  code: string;
  name: string;
  origin: string;
  finish: string;
  reflectance: string;
  density: string;
  application: string;
  toneHex: string;
  secondaryHex: string;
  grainPattern: 'concrete' | 'charred_wood' | 'veined_marble' | 'travertine' | 'brushed_steel';
  description: string;
}

export const MATERIAL_LIBRARY: MaterialSample[] = [
  {
    id: 'mat-01',
    code: 'KA-M01',
    name: 'Beton Arsitektural Cetakan Kayu',
    origin: 'Kanton Valais, Swiss',
    finish: 'Jejak Bekisting Douglas Fir Mentah · Pelindung Silikat Doff',
    reflectance: 'LRV 18%',
    density: '2.420 kg/m³',
    application: 'Dinding geser struktural, perapian kantilever, langit-langit monolitik',
    toneHex: '#262628',
    secondaryHex: '#3A3A3D',
    grainPattern: 'concrete',
    description:
      'Dicor langsung pada papan kayu gergajian kasar untuk memfosilkan serat kayu organik secara permanen di dalam massa beton mineral.',
  },
  {
    id: 'mat-02',
    code: 'KA-M02',
    name: 'Kayu Cemara Bakar Shou Sugi Ban',
    origin: 'Prefektur Kyoto, Jepang',
    finish: 'Lapisan Karbonisasi Dalam · Minyak Tung Peras Dingin',
    reflectance: 'LRV 04%',
    density: '510 kg/m³',
    application: 'Pelapis dinding akustik, pintu poros tersembunyi, plafon suaka',
    toneHex: '#0F0F10',
    secondaryHex: '#1F1F22',
    grainPattern: 'charred_wood',
    description:
      'Kayu cemara hinoki Jepang yang dibakar dalam tungku hingga membentuk tekstur karbon halus yang menyerap pantulan cahaya liar serta tahan kelembapan.',
  },
  {
    id: 'mat-03',
    code: 'KA-M03',
    name: 'Marmer Nero Marquina Cuci Asam',
    origin: 'Markina-Xemein, Negeri Basque',
    finish: 'Etsa Asam Pori Terbuka · Tanpa Kilap',
    reflectance: 'LRV 07%',
    density: '2.690 kg/m³',
    application: 'Pulau dapur monolitik, wastafel pahatan, podium patung',
    toneHex: '#141416',
    secondaryHex: '#D8D8D2',
    grainPattern: 'veined_marble',
    description:
      'Batu kapur hitam pekat yang dietsa dengan asam lembut untuk menurunkan matriks gelapnya sedikit, sehingga urat kalsit putih menonjol secara taktil.',
  },
  {
    id: 'mat-04',
    code: 'KA-M04',
    name: 'Travertine Titanium Tanpa Tambalan',
    origin: 'Tambang Tivoli, Italia',
    finish: 'Potongan Urat Berpori Alami · Diasah Doff',
    reflectance: 'LRV 34%',
    density: '2.450 kg/m³',
    application: 'Lantai galeri menerus, bangku monolitik, anak tangga',
    toneHex: '#6E6D68',
    secondaryHex: '#9E9D96',
    grainPattern: 'travertine',
    description:
      'Batuan sedimen kalsium karbonat yang dibiarkan berpori tanpa penambal sintetis agar garis-garis horizontalnya menangkap bayangan mikro di bawah cahaya miring.',
  },
  {
    id: 'mat-05',
    code: 'KA-M05',
    name: 'Baja Hitam Canai Panas',
    origin: 'Lembah Ruhr, Jerman',
    finish: 'Kulit Oksidasi Alami · Poles Lilin Lebah & Grafit',
    reflectance: 'LRV 11%',
    density: '7.850 kg/m³',
    application: 'Rangka tangga tipis, kusen kaca ramping, tangga perpustakaan',
    toneHex: '#1B1C1E',
    secondaryHex: '#45474B',
    grainPattern: 'brushed_steel',
    description:
      'Pelat baja struktural yang mempertahankan lapisan oksidasi termal biru-kehitaman aslinya, digosok manual dengan lilin lebah untuk kedalaman rona.',
  },
];
