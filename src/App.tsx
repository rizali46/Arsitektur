
import { EXPERIENCE_ITEMS } from './data/experienceData';
import { Briefcase } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { ContactPage } from './pages/ContactPage';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';


import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Maximize2,
  Sun,
  Check,
  SlidersHorizontal,
} from 'lucide-react';
import {
  PORTFOLIO_PROJECTS,
  MATERIAL_LIBRARY,
  ProjectItem,
  ProjectCategory,
  MaterialSample,
} from './components/projectsData';
import { ArchitecturalPlate } from './components/ArchitecturalPlate';

type FilterOption = 'Semua Karya' | ProjectCategory;

const FILTER_OPTIONS: FilterOption[] = [
  'Semua Karya',
  'Residensial',
  'Ruang Monolitik',
  'Galeri & Budaya',
  'Hospitaliti',
];

export default function App() {
  // Kontrol Interaktif Hero
  const [heroPlateMode, setHeroPlateMode] = useState<'perspective' | 'blueprint'>('perspective');
  const [heroSunAngle, setHeroSunAngle] = useState<number>(62);

  // Filter Galeri Portofolio & Mode Tampilan
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('Semua Karya');
  const [galleryViewMode, setGalleryViewMode] = useState<'bento' | 'index'>('bento');

  // Status Modal Lightbox
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [lightboxMode, setLightboxMode] = useState<'perspective' | 'blueprint'>('perspective');
  const [lightboxSunAngle, setLightboxSunAngle] = useState<number>(58);

  // Status Pustaka Material & Kalkulator Ruang
  const [activeMaterial, setActiveMaterial] = useState<MaterialSample>(MATERIAL_LIBRARY[0]);
  const [scopeSqm, setScopeSqm] = useState<number>(420);
  const [selectedTypology, setSelectedTypology] = useState<ProjectCategory>('Residensial');

  // Status Panel Konsultasi Komisi
  const [inquiryOpen, setInquiryOpen] = useState<boolean>(false);
  const [inquiryProjectRef, setInquiryProjectRef] = useState<string>('Komisi Arsitektur Umum');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    location: 'Jakarta / Bali / Zürich',
    estimatedArea: '400 – 650 m²',
    notes: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

  const navigate = useNavigate();

  // Proyek Terfilter
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Semua Karya') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

  // Navigasi Keyboard untuk Lightbox & Panel Konsultasi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null);
        if (inquiryOpen) setInquiryOpen(false);
      } else if (activeProject && e.key === 'ArrowRight') {
        const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === activeProject.id);
        const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
        setActiveProject(PORTFOLIO_PROJECTS[nextIndex]);
      } else if (activeProject && e.key === 'ArrowLeft') {
        const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === activeProject.id);
        const prevIndex = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
        setActiveProject(PORTFOLIO_PROJECTS[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, inquiryOpen]);

  const openProjectLightbox = (project: ProjectItem) => {
    setLightboxMode('perspective');
    setLightboxSunAngle(58);
    setActiveProject(project);
  };

  const openCommissionWithContext = (contextLabel: string) => {
    setInquiryProjectRef(contextLabel);
    setInquirySubmitted(false);
    setInquiryOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;
    setInquirySubmitted(true);
  };

  // Kalkulasi Estimasi Ruang
  const estimatedMonths = useMemo(() => {
    const base = selectedTypology === 'Galeri & Budaya' ? 14 : 10;
    return Math.round(base + scopeSqm / 85);
  }, [scopeSqm, selectedTypology]);

  const estimatedDrawingsCount = useMemo(() => {
    return Math.round(45 + scopeSqm * 0.18);
  }, [scopeSqm]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4F4F0] font-light flex flex-col">
      {/* 1. TOP BAR CONTRACT: 3 zona dipisahkan oleh gap-8 */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-[#27272A]">
        {/* Zona 1: Nama Studio */}
        <a onClick={() => navigate('/')}
          href="#top"
          className="font-display text-lg font-light tracking-[0.14em] text-[#F4F4F0] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F4F0]"
        >
          KRONOS ATELIER
        </a>

        {/* Zona 2: 4 tautan navigasi satu baris */}
        <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8 text-sm font-light text-[#A1A1AA]">
          <a
            href="#portfolio"
            className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Karya Pilihan
          </a>
          <a
            href="#materials"
            className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Pustaka Material
          </a>
          <a
            href="#philosophy"
            className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Filosofi
          </a>
          <a
            href="#practice"
            className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Praktik
          </a>
             <Link to="/contact" className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors"> Contact
          </Link>

        <Link
          to="/about"
          className="hover:text-[#F4F4F0] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"> Practice
        </Link>
        </nav>

        {/* Zona 3: 1 tombol aksi utama */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => openCommissionWithContext('Konsultasi Komisi Langsung')}
            className="px-4 py-2 text-xs font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F4F4F0]"
          >
            Konsultasi Proyek
          </button>
        </div>
      </header>
       <Routes>
        <Route
          path="/contact"
          element={<ContactPage onBack={() => navigate('/')} />}
        />
        <Route
    path="/about"
    element={
      <AboutPage
        onBack={() => navigate('/')}
        onInquire={(contextLabel) => openCommissionWithContext(contextLabel)}
      />
    }
  />
        <Route
          path="/"
          element={
      <main id="top" className="flex-1">
        {/* 2. BAGIAN HERO DUA KOLOM */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10 lg:pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Kolom Kiri: Hirarki Tipografi Tipis & Presisi */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA] font-mono-tabular">
                  <span>Zürich</span>
                  <span aria-hidden="true">·</span>
                  <span>Kyoto</span>
                  <span aria-hidden="true">·</span>
                  <span>Jakarta</span>
                  <span aria-hidden="true">/</span>
                  <span>Monograf Vol. IV</span>
                </div>

                <h1
                  className="font-display font-extralight tracking-tight text-[#F4F4F0] leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 3.8vw, 3.75rem)',
                    textWrap: 'balance',
                  }}
                >
                  Arsitektur yang dipahat dari keheningan, bayangan, dan massa mineral murni.
                </h1>

                <p className="text-[#A1A1AA] text-base font-light leading-relaxed max-w-[62ch]">
                  Kronos Atelier adalah studio arsitektur dan desain interior yang berfokus pada keabadian ruang
                  monokromatik. Kami menanggalkan ornamen artifisial untuk menampilkan beton ekspos cetakan kayu,
                  cemara bakar, serta pencahayaan alami yang dikalibrasi hingga presisi milimeter.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-[#27272A] space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#portfolio"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Jelajahi Karya Pilihan</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openProjectLightbox(PORTFOLIO_PROJECTS[0])}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-light text-[#F4F4F0] border border-[#27272A] rounded-lg hover:border-[#71717A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Tinjau Pelat 01</span>
                  </button>
                </div>

                {/* Pengendali Sudut Cahaya & Denah Potongan */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A1A1AA]">
                  <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#27272A] rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => setHeroPlateMode('perspective')}
                      className={`px-3 py-1.5 rounded-md font-light transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        heroPlateMode === 'perspective'
                          ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                      }`}
                    >
                      Pelat Chiaroscuro
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroPlateMode('blueprint')}
                      className={`px-3 py-1.5 rounded-md font-light transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        heroPlateMode === 'blueprint'
                          ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                      }`}
                    >
                      Denah Potongan 1:50
                    </button>
                  </div>

                  {heroPlateMode === 'perspective' && (
                    <label className="flex items-center gap-3 font-mono-tabular">
                      <Sun className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0 stroke-[1.5]" />
                      <span className="whitespace-nowrap">Azimut Surya</span>
                      <input
                        type="range"
                        min={15}
                        max={90}
                        value={heroSunAngle}
                        onChange={(e) => setHeroSunAngle(Number(e.target.value))}
                        aria-label="Atur sudut bayangan azimut surya"
                        className="w-24 accent-[#F4F4F0] cursor-pointer"
                      />
                      <span className="w-9 text-right text-[#F4F4F0]">{heroSunAngle}°</span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Kontainer Visual Utama */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="relative flex-1 min-h-[380px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-[#27272A] group">
                <ArchitecturalPlate
                  plateType="brutalist_living"
                  mode={heroPlateMode}
                  sunAngle={heroSunAngle}
                  className="w-full h-full"
                />

                {/* Keterangan Bawah dengan Gradasi Terukur */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#A1A1AA]">
                      PELAT 00 · STUDI PAVILIUN ATELIER · 47°22&apos;LU 8°32&apos;BT
                    </div>
                    <p className="text-sm font-light text-[#F4F4F0] mt-1">
                      Dinding geser beton cetakan kayu &amp; podium travertine Tivoli di bawah cahaya zenital miring
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openProjectLightbox(PORTFOLIO_PROJECTS[0])}
                    aria-label="Buka peninjau pelat resolusi penuh"
                    className="p-2.5 rounded-lg bg-[#050505]/80 border border-[#3F3F46] text-[#F4F4F0] hover:bg-[#F4F4F0] hover:text-[#050505] transition-colors shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Baris Metrik Kuantitatif 4 Kolom di Bawah Hero */}
          <div className="mt-12 pt-8 border-t border-[#27272A] grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl lg:text-3xl font-display font-light text-[#F4F4F0] font-mono-tabular">
                42.800 m²
              </div>
              <p className="text-xs font-light text-[#A1A1AA] mt-1">
                Volume Interior Monolitik Terbangun di 14 Negara (2016–2026)
              </p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-light text-[#F4F4F0] font-mono-tabular">
                ±0,5 mm
              </div>
              <p className="text-xs font-light text-[#A1A1AA] mt-1">
                Toleransi Sambungan Maksimum pada Konstruksi Batu, Kayu &amp; Baja Mentah
              </p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-light text-[#F4F4F0] font-mono-tabular">
                0,35 dtk
              </div>
              <p className="text-xs font-light text-[#A1A1AA] mt-1">
                Rata-Rata Waktu Dengung Akustik RT60 pada Galeri Kediaman Privat
              </p>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-display font-light text-[#F4F4F0] font-mono-tabular">
                100%
              </div>
              <p className="text-xs font-light text-[#A1A1AA] mt-1">
                Permukaan Mineral Alami &amp; Kayu Tanpa Lapisan Sintetis Berbahaya
              </p>
            </div>
          </div>
        </section>

        {/* 3. PEMBATAS SEKSI PITA TEKS BERGERAK */}
        <div
          aria-hidden="true"
          className="border-y border-[#27272A] py-3.5 bg-[#09090B] overflow-hidden select-none"
        >
          <div className="animate-marquee flex items-center gap-10 text-xs font-mono-tabular text-[#71717A]">
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <span>komisi arsitektur pilihan</span>
                <span>·</span>
                <span>keabadian ruang monokrom</span>
                <span>·</span>
                <span>beton brutalis cetakan kayu</span>
                <span>·</span>
                <span>kayu cedar bakar shou sugi ban</span>
                <span>·</span>
                <span>kuarsit vals asah</span>
                <span>·</span>
                <span>iluminasi chiaroscuro zenital</span>
                <span>·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4. GALERI PORTOFOLIO MINIMALIS (BENTO GRID + TABEL INDEKS SPASIAL) */}
        <section id="portfolio" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          {/* Tajuk Seksi + Kontrol Filter Interaktif */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#27272A]">
            <div>
              <div className="text-xs text-[#A1A1AA] font-mono-tabular mb-2">
                01. ARSIP TERKURASI · 2024–2026
              </div>
              <h2
                className="font-display text-2xl lg:text-4xl font-extralight tracking-tight text-[#F4F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Komisi Arsitektur Pilihan
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Bar Filter Kategori */}
              <div
                role="tablist"
                aria-label="Filter proyek berdasarkan kategori arsitektur"
                className="flex flex-wrap items-center gap-1 p-1 bg-[#121214] border border-[#27272A] rounded-lg"
              >
                {FILTER_OPTIONS.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 text-xs font-light rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Pengalih Tampilan: Galeri Bento vs Indeks Spasial */}
              <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#27272A] rounded-lg">
                <button
                  type="button"
                  onClick={() => setGalleryViewMode('bento')}
                  className={`px-3 py-1.5 text-xs font-light rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    galleryViewMode === 'bento'
                      ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  Galeri Bento
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryViewMode('index')}
                  className={`px-3 py-1.5 text-xs font-light rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    galleryViewMode === 'index'
                      ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  Indeks Spasial
                </button>
              </div>
            </div>
          </div>

          {/* Grid Portofolio Bento */}
          {galleryViewMode === 'bento' ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[360px]">
              {filteredProjects.map((project) => {
                const isWide = project.bentoSpan === 'wide' && selectedCategory === 'Semua Karya';
                return (
                  <article
                    key={project.id}
                    onClick={() => openProjectLightbox(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openProjectLightbox(project);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Tinjau proyek ${project.title} di ${project.location}`}
                    className={`group relative rounded-2xl overflow-hidden border border-[#27272A] bg-[#0D0D0F] flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F4F0] ${
                      isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                    }`}
                  >
                    {/* Lapisan Pelat Visual */}
                    <div className="absolute inset-0">
                      <ArchitecturalPlate plateType={project.plateType} mode="perspective" sunAngle={58} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15 group-hover:via-black/25 transition-colors duration-200" />
                    </div>

                    {/* Baris Atas Kartu: Metadata Tanpa Kotak */}
                    <div className="relative z-10 p-6 flex items-center justify-between text-xs font-mono-tabular text-[#D4D4D8]">
                      <div className="flex items-center gap-2">
                        <span>{project.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.areaSqm} m²</span>
                      </div>
                      <span className="p-2 rounded-lg bg-[#050505]/70 border border-[#3F3F46] text-[#F4F4F0] group-hover:bg-[#F4F4F0] group-hover:text-[#050505] transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
                      </span>
                    </div>

                    {/* Konten Bawah Kartu */}
                    <div className="relative z-10 p-6 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-light text-[#A1A1AA]">
                        <span>{project.location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">{project.year}</span>
                      </div>
                      <h3 className="font-display text-xl lg:text-2xl font-light text-[#F4F4F0] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="font-editorial italic text-base font-light text-[#D4D4CE]">
                        {project.subtitle}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Tampilan Tabel Indeks Spasial */
            <div className="mt-10 overflow-x-auto border border-[#27272A] rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#27272A] text-xs font-mono-tabular text-[#A1A1AA] bg-[#0B0B0D]">
                    <th className="py-4 px-6 font-light">No.</th>
                    <th className="py-4 px-6 font-light">Komisi</th>
                    <th className="py-4 px-6 font-light">Tipologi</th>
                    <th className="py-4 px-6 font-light">Lokasi</th>
                    <th className="py-4 px-6 font-light text-right">Luas</th>
                    <th className="py-4 px-6 font-light text-right">Tinggi Plafon</th>
                    <th className="py-4 px-6 font-light text-right">Tahun</th>
                    <th className="py-4 px-6 font-light text-right">Pelat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A] text-sm font-light">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => openProjectLightbox(project)}
                      className="hover:bg-[#121215] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 font-mono-tabular text-xs text-[#71717A]">{project.index}</td>
                      <td className="py-4 px-6">
                        <div className="font-normal text-[#F4F4F0] group-hover:underline underline-offset-4">
                          {project.title}
                        </div>
                        <div className="text-xs text-[#A1A1AA] font-editorial italic">{project.subtitle}</div>
                      </td>
                      <td className="py-4 px-6 text-xs text-[#A1A1AA]">{project.category}</td>
                      <td className="py-4 px-6 text-xs text-[#D4D4D8]">{project.location}</td>
                      <td className="py-4 px-6 text-right font-mono-tabular text-xs text-[#F4F4F0]">
                        {project.areaSqm} m²
                      </td>
                      <td className="py-4 px-6 text-right font-mono-tabular text-xs text-[#A1A1AA]">
                        {project.dimensions.ceilingHeight}
                      </td>
                      <td className="py-4 px-6 text-right font-mono-tabular text-xs text-[#A1A1AA]">
                        {project.year}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-light text-[#F4F4F0]">
                          <span>Buka</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5]" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* {  Experienced Section} */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 border-t border-[#27272A]">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA] mb-2">
            <Briefcase className="w-4 h-4 text-[#F4F4F0]" />
            <span>02. PROFESSIONAL BACKGROUND</span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[#F4F4F0] mb-8">
            Experience &amp; Milestones
          </h2>

          {/* Professional .map() Loop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIENCE_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="p-6 rounded-2xl border border-[#27272A] bg-[#0C0C0E] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#A1A1AA]">
                    <span>{item.company}</span>
                    <span>{item.period}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#F4F4F0]">
                    {item.role}
                  </h3>
                  <p className="text-sm text-[#D4D4D8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#27272A]">
                  {item.skills.map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs font-mono-tabular bg-[#161619] text-[#A1A1AA] rounded-md border border-[#27272A]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PUSTAKA MATERIAL INTERAKTIF & KALKULATOR PROPORSI RUANG */}
        <section id="materials" className="border-t border-[#27272A] bg-[#08080A] py-16 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#27272A]">
              <div>
                <div className="text-xs text-[#A1A1AA] font-mono-tabular mb-2">
                  02. MONOLIT TAKTIL &amp; REFLEKTANSI CAHAYA
                </div>
                <h2
                  className="font-display text-2xl lg:text-4xl font-extralight tracking-tight text-[#F4F4F0]"
                  style={{ textWrap: 'balance' }}
                >
                  Arsip Material Monokrom &amp; Estimator Ruang
                </h2>
              </div>
              <p className="text-sm font-light text-[#A1A1AA] max-w-[54ch]">
                Tanpa distraksi warna, porositas permukaan dan nilai pantulan cahaya (LRV) menentukan bobot emosional
                sebuah ruang. Tinjau lima substrat mineral dan kayu utama kami di bawah ini.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* 7 Kolom Kiri: Pemilih Sampel Material + Detail Spesifikasi */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {MATERIAL_LIBRARY.map((mat) => {
                    const isSelected = mat.id === activeMaterial.id;
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setActiveMaterial(mat)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#F4F4F0] bg-[#161619]'
                            : 'border-[#27272A] bg-[#0C0C0E] hover:border-[#52525B]'
                        }`}
                      >
                        <div
                          className="w-full h-12 rounded-lg mb-2.5 border border-[#3F3F46]"
                          style={{
                            background: `linear-gradient(135deg, ${mat.toneHex} 0%, ${mat.secondaryHex} 100%)`,
                          }}
                        />
                        <div className="text-[11px] font-mono-tabular text-[#A1A1AA]">{mat.code}</div>
                        <div className="text-xs font-light text-[#F4F4F0] truncate mt-0.5">{mat.name}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Pelat Detail Material Terpilih */}
                <div className="p-6 lg:p-8 rounded-2xl border border-[#27272A] bg-[#0C0C0E] space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
                        <span>{activeMaterial.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeMaterial.origin}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeMaterial.reflectance}</span>
                      </div>
                      <h3 className="font-display text-xl lg:text-2xl font-light text-[#F4F4F0] mt-1">
                        {activeMaterial.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openCommissionWithContext(`Permintaan Sampel: ${activeMaterial.code} (${activeMaterial.name})`)
                      }
                      className="px-3.5 py-2 text-xs font-light border border-[#3F3F46] text-[#F4F4F0] rounded-lg hover:bg-[#F4F4F0] hover:text-[#050505] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Minta Kotak Sampel Fisik
                    </button>
                  </div>

                  <p className="text-sm font-light text-[#D4D4D8] leading-relaxed">{activeMaterial.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#27272A] text-xs font-light">
                    <div>
                      <div className="text-[#71717A] font-mono-tabular">PERLAKUAN PERMUKAAN</div>
                      <div className="text-[#F4F4F0] mt-1">{activeMaterial.finish}</div>
                    </div>
                    <div>
                      <div className="text-[#71717A] font-mono-tabular">DENSITAS MINERAL</div>
                      <div className="text-[#F4F4F0] font-mono-tabular mt-1">{activeMaterial.density}</div>
                    </div>
                    <div>
                      <div className="text-[#71717A] font-mono-tabular">APLIKASI ARSITEKTURAL</div>
                      <div className="text-[#F4F4F0] mt-1">{activeMaterial.application}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 Kolom Kanan: Kalkulator Kelayakan & Cakupan Komisi */}
              <div className="lg:col-span-5 p-6 lg:p-8 rounded-2xl border border-[#27272A] bg-[#0C0C0E] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono-tabular text-[#A1A1AA]">KELAYAKAN ARSITEKTURAL</div>
                    <h3 className="font-display text-xl font-light text-[#F4F4F0] mt-1">
                      Estimator Komisi Spasial
                    </h3>
                  </div>
                  <SlidersHorizontal className="w-4 h-4 text-[#A1A1AA] stroke-[1.5]" />
                </div>

                {/* Pemilih Tipologi */}
                <div className="space-y-2">
                  <label className="block text-xs font-light text-[#A1A1AA]">Tipologi Ruang</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Residensial', 'Ruang Monolitik', 'Galeri & Budaya', 'Hospitaliti'] as ProjectCategory[]).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedTypology(type)}
                          className={`px-3 py-2 text-xs font-light rounded-lg border text-left transition-colors whitespace-nowrap truncate cursor-pointer ${
                            selectedTypology === type
                              ? 'bg-[#F4F4F0] text-[#050505] border-[#F4F4F0] font-normal'
                              : 'bg-[#121215] text-[#A1A1AA] border-[#27272A] hover:text-[#F4F4F0]'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Penggeser Luas Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-light">
                    <span className="text-[#A1A1AA]">Luas Lantai Kotor Interior</span>
                    <span className="font-mono-tabular text-[#F4F4F0]">{scopeSqm} m²</span>
                  </div>
                  <input
                    type="range"
                    min={150}
                    max={1200}
                    step={10}
                    value={scopeSqm}
                    onChange={(e) => setScopeSqm(Number(e.target.value))}
                    aria-label="Luas Lantai Kotor Interior dalam meter persegi"
                    className="w-full accent-[#F4F4F0] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono-tabular text-[#71717A]">
                    <span>150 m²</span>
                    <span>600 m²</span>
                    <span>1.200 m²</span>
                  </div>
                </div>

                {/* Metrik Hasil */}
                <div className="pt-4 border-t border-[#27272A] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-light text-[#71717A]">Estimasi Rancang &amp; Bangun</div>
                    <div className="text-2xl font-display font-light text-[#F4F4F0] font-mono-tabular mt-0.5">
                      {estimatedMonths} Bulan
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-light text-[#71717A]">Gambar Kerja Detail 1:20</div>
                    <div className="text-2xl font-display font-light text-[#F4F4F0] font-mono-tabular mt-0.5">
                      {estimatedDrawingsCount} Lembar
                    </div>
                  </div>
                </div>

                <div className="text-xs font-light text-[#A1A1AA] pt-2">
                  Spesifikasi Material Utama: <span className="text-[#F4F4F0]">{activeMaterial.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openCommissionWithContext(
                      `Komisi ${selectedTypology} (${scopeSqm} m²) · Material Utama: ${activeMaterial.name}`
                    )
                  }
                  className="w-full py-3 px-4 text-xs font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors cursor-pointer"
                >
                  Ajukan Ringkasan Proyek dengan Parameter Ini
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FILOSOFI ARSITEKTUR & TESTIMONI KLIEN */}
        <section id="philosophy" className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 border-t border-[#27272A]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs text-[#A1A1AA] font-mono-tabular">
                03. DOKTRIN SPASIAL &amp; PROSES
              </div>
              <h2
                className="font-display text-2xl lg:text-4xl font-extralight tracking-tight text-[#F4F4F0]"
                style={{ textWrap: 'balance' }}
              >
                Tiga Prinsip Kesederhanaan Monokromatik
              </h2>
              <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">
                Ketika pigmen warna ditiadakan, proporsi tidak lagi dapat bersembunyi. Setiap celah bayangan, rongga
                akustik, dan sambungan sudut batu harus memiliki kejujuran struktural.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#27272A] border-t border-b border-[#27272A]">
              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-display text-lg font-light text-[#F4F4F0]">
                    01. Pengurangan Sebelum Penambahan
                  </h3>
                  <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">
                    Sebelum memasukkan satu pun furnitur, kami menyingkirkan sekat non-struktural dan menyembunyikan
                    jalur mekanikal di dalam ketebalan dinding agar cahaya alami mengalir tanpa hambatan dari fasad ke
                    inti bangunan.
                  </p>
                </div>
                <span className="font-mono-tabular text-xs text-[#71717A] shrink-0">FASE I · EKSKAVASI</span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-display text-lg font-light text-[#F4F4F0]">
                    02. Chiaroscuro sebagai Material Bangunan
                  </h3>
                  <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">
                    Kami memodelkan lintasan azimut matahari sepanjang tahun sebelum tahap skematik disahkan,
                    menempatkan ceruk beton dalam dan bukaan rendah untuk memproyeksikan geometri bayangan yang
                    bergerak tenang.
                  </p>
                </div>
                <span className="font-mono-tabular text-xs text-[#71717A] shrink-0">FASE II · STUDI HELIODON</span>
              </div>

              <div className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="space-y-1 max-w-xl">
                  <h3 className="font-display text-lg font-light text-[#F4F4F0]">
                    03. Patina Mineral Tanpa Lapisan Sintetis
                  </h3>
                  <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">
                    Kami memilih batu kapur cuci asam, kayu Douglas fir berminyak alami, dan baja canai panas berlilin
                    lebah yang semakin matang seiring sentuhan waktu, alih-alih mengelupas di bawah lapisan poliuretan.
                  </p>
                </div>
                <span className="font-mono-tabular text-xs text-[#71717A] shrink-0">FASE III · FABRIKASI</span>
              </div>
            </div>
          </div>

          {/* Testimoni Klien Teratribusi */}
          <div id="practice" className="mt-16 pt-16 border-t border-[#27272A] grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="p-8 rounded-2xl border border-[#27272A] bg-[#0A0A0C] flex flex-col justify-between space-y-6">
              <p className="font-editorial italic text-xl lg:text-2xl font-light text-[#F4F4F0] leading-relaxed">
                &ldquo;Sebelum intervensi Kronos Atelier, kediaman kami di Zürichberg terasa terpecah-pecah dan silau
                oleh pantulan plester mengilap. Dengan mengganti enam dinding sekat menjadi satu tulang punggung beton
                ekspos sepanjang 14 meter, mereka mengubah rumah ini menjadi suaka tenang berstandar museum tepat waktu
                dalam 14 bulan.&rdquo;
              </p>
              <footer className="text-xs font-light text-[#A1A1AA] flex items-center justify-between pt-4 border-t border-[#27272A]">
                <div>
                  <div className="font-normal text-[#F4F4F0]">Dr. Henrik von Meyenburg</div>
                  <div>Direktur, Yayasan Seni Privat Meyenburg · Zürich</div>
                </div>
                <span className="font-mono-tabular text-[#71717A]">KOMISI 01 · 640 m²</span>
              </footer>
            </blockquote>

            <blockquote className="p-8 rounded-2xl border border-[#27272A] bg-[#0A0A0C] flex flex-col justify-between space-y-6">
              <p className="font-editorial italic text-xl lg:text-2xl font-light text-[#F4F4F0] leading-relaxed">
                &ldquo;Bekas gardu induk kami di Berlin memiliki gema kasar selama 3,8 detik yang membuat ruang dengar
                mustahil digunakan. Kronos Atelier merancang rongga batu basaltina dan peredam wol tersembunyi yang
                menurunkan waktu dengung menjadi 0,35 detik tanpa mengorbankan karakter beton brutalis aslinya.&rdquo;
              </p>
              <footer className="text-xs font-light text-[#A1A1AA] flex items-center justify-between pt-4 border-t border-[#27272A]">
                <div>
                  <div className="font-normal text-[#F4F4F0]">Clara Lindemann</div>
                  <div>Salah Satu Pendiri, Kolektif Suara &amp; Arsitektur Aether · Berlin</div>
                </div>
                <span className="font-mono-tabular text-[#71717A]">KOMISI 06 · 780 m²</span>
              </footer>
            </blockquote>
          </div>
        </section>
      </main>
    }
        />
      </Routes>
      {/* 7. FOOTER ARSITEKTURAL MINIMALIS */}
      <footer className="border-t border-[#27272A] bg-[#050505] py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-xs font-light text-[#A1A1AA]">
          <div className="space-y-1">
            <div className="font-display font-light text-sm text-[#F4F4F0] tracking-[0.14em]">KRONOS ATELIER</div>
            <div>Talstrasse 82, 8001 Zürich · Nakagyo Ward, Kyoto · Via Brera 28, Milan</div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#portfolio" className="hover:text-[#F4F4F0] transition-colors">
              Karya Pilihan
            </a>
            <a href="#materials" className="hover:text-[#F4F4F0] transition-colors">
              Pustaka Material
            </a>
            <a href="#philosophy" className="hover:text-[#F4F4F0] transition-colors">
              Filosofi
            </a>
            <button
              type="button"
              onClick={() => openCommissionWithContext('Konsultasi dari Footer')}
              className="text-[#F4F4F0] underline underline-offset-4 cursor-pointer"
            >
              Konsultasi Komisi
            </button>
          </div>

          <div className="font-mono-tabular text-[#71717A]">
            © {new Date().getFullYear()} Kronos Atelier SIA / RIBA. Hak cipta dilindungi.
          </div>
        </div>
      </footer>

      {/* 8. MODAL LIGHTBOX MONOGRAF ARSITEKTUR LAYAR PENUH */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-project-title"
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-lg flex flex-col overflow-y-auto"
        >
          {/* Bar Kontrol Atas Lightbox */}
          <div className="flex items-center justify-between gap-4 px-6 lg:px-10 py-4 border-b border-[#27272A] shrink-0">
            <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#A1A1AA]">
              <span>PELAT {activeProject.index}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F4F4F0] font-normal">{activeProject.title}</span>
              <span aria-hidden="true">·</span>
              <span className="hidden sm:inline">{activeProject.location}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Pengalih Pelat Perspektif vs Denah Ortogonal */}
              <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#27272A] rounded-lg">
                <button
                  type="button"
                  onClick={() => setLightboxMode('perspective')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-light rounded-md transition-colors cursor-pointer ${
                    lightboxMode === 'perspective'
                      ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Pelat Chiaroscuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxMode('blueprint')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-light rounded-md transition-colors cursor-pointer ${
                    lightboxMode === 'blueprint'
                      ? 'bg-[#F4F4F0] text-[#050505] font-normal'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Denah Ortogonal 1:50</span>
                </button>
              </div>

              {/* Proyek Sebelumnya / Berikutnya */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === activeProject.id);
                    setActiveProject(PORTFOLIO_PROJECTS[(idx - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length]);
                  }}
                  aria-label="Proyek sebelumnya"
                  className="p-2 rounded-lg border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F0] hover:border-[#52525B] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idx = PORTFOLIO_PROJECTS.findIndex((p) => p.id === activeProject.id);
                    setActiveProject(PORTFOLIO_PROJECTS[(idx + 1) % PORTFOLIO_PROJECTS.length]);
                  }}
                  aria-label="Proyek berikutnya"
                  className="p-2 rounded-lg border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F0] hover:border-[#52525B] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              {/* Tombol Tutup Kontras Tinggi */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Tutup peninjau (ESC)"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F4F4F0] text-[#050505] text-xs font-normal hover:bg-[#D4D4CE] transition-colors cursor-pointer"
              >
                <span>Tutup</span>
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Isi Lightbox */}
          <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
            {/* Peninjau Media Besar */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden border border-[#27272A]">
                <ArchitecturalPlate
                  plateType={activeProject.plateType}
                  mode={lightboxMode}
                  sunAngle={lightboxSunAngle}
                />
              </div>

              {lightboxMode === 'perspective' && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#0D0D10] border border-[#27272A] text-xs font-light text-[#A1A1AA]">
                  <span>Simulasi Cahaya Heliodon — Geser untuk meninjau jatuhnya bayangan alami pada bidang lantai</span>
                  <div className="flex items-center gap-3 font-mono-tabular">
                    <Sun className="w-3.5 h-3.5 stroke-[1.5]" />
                    <input
                      type="range"
                      min={15}
                      max={90}
                      value={lightboxSunAngle}
                      onChange={(e) => setLightboxSunAngle(Number(e.target.value))}
                      aria-label="Simulasikan sudut cahaya matahari"
                      className="w-28 accent-[#F4F4F0] cursor-pointer"
                    />
                    <span className="text-[#F4F4F0] w-8 text-right">{lightboxSunAngle}°</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lembar Spesifikasi Monograf Proyek */}
            <div className="lg:col-span-4 space-y-6 bg-[#0B0B0D] border border-[#27272A] rounded-2xl p-6 lg:p-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA]">
                  <span>{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.areaSqm} m²</span>
                </div>
                <h2 id="lightbox-project-title" className="font-display text-2xl font-light text-[#F4F4F0] mt-1">
                  {activeProject.title}
                </h2>
                <p className="font-editorial italic text-lg font-light text-[#D4D4CE]">{activeProject.subtitle}</p>
              </div>

              <p className="text-sm font-light text-[#D4D4D8] leading-relaxed">{activeProject.editorialSummary}</p>
              <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">{activeProject.spatialNarrative}</p>

              {/* Kredit Teknis & Dimensi */}
              <div className="pt-4 border-t border-[#27272A] space-y-3 text-xs font-light">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Arsitek Utama</span>
                  <span className="text-[#F4F4F0]">{activeProject.leadArchitect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Klien / Koleksi</span>
                  <span className="text-[#F4F4F0]">{activeProject.client}</span>
                </div>
                <div className="flex justify-between font-mono-tabular">
                  <span className="text-[#71717A]">Plafon · Bentang · Kaca</span>
                  <span className="text-[#F4F4F0]">
                    {activeProject.dimensions.ceilingHeight} · {activeProject.dimensions.primarySpan} ·{' '}
                    {activeProject.dimensions.glazingRatio}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#71717A] shrink-0">Kalibrasi Akustik</span>
                  <span className="text-[#F4F4F0] text-right">{activeProject.acousticRating}</span>
                </div>
              </div>

              {/* Daftar Material Tanpa Kotak */}
              <div className="pt-4 border-t border-[#27272A]">
                <div className="text-xs font-mono-tabular text-[#71717A] mb-2">PALET MATERIAL UTAMA</div>
                <div className="text-xs font-light text-[#D4D4D8] leading-relaxed">
                  {activeProject.materials.join(' · ')}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const title = activeProject.title;
                  setActiveProject(null);
                  openCommissionWithContext(`Referensi Komisi: ${title}`);
                }}
                className="w-full py-3 px-4 text-xs font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors cursor-pointer"
              >
                Konsultasikan Komisi Ruang Serupa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. PANEL SAMPING KONSULTASI KOMISI */}
      {inquiryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
        >
          <div className="w-full max-w-lg bg-[#09090B] border-l border-[#27272A] h-full overflow-y-auto p-6 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#27272A]">
                <div>
                  <div className="text-xs font-mono-tabular text-[#A1A1AA]">RINGKASAN ARSITEKTUR BARU</div>
                  <h2 id="inquiry-modal-title" className="font-display text-xl font-light text-[#F4F4F0] mt-1">
                    Mulai Konsultasi Studio
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setInquiryOpen(false)}
                  aria-label="Tutup panel konsultasi"
                  className="p-2 rounded-lg border border-[#27272A] text-[#A1A1AA] hover:text-[#F4F4F0] cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121215] border border-[#27272A] text-xs font-light text-[#D4D4D8]">
                <span className="text-[#71717A] font-mono-tabular block mb-0.5">KONTEKS PROYEK</span>
                {inquiryProjectRef}
              </div>

              {inquirySubmitted ? (
                <div className="p-6 rounded-2xl border border-[#3F3F46] bg-[#121215] space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#F4F4F0]">
                    <Check className="w-4 h-4 stroke-[1.5]" />
                    <span>BERKAS TERDAFTAR · REF #KA-2026-89</span>
                  </div>
                  <h3 className="font-display text-lg font-light text-[#F4F4F0]">
                    Terima kasih, {formState.name}.
                  </h3>
                  <p className="text-sm font-light text-[#A1A1AA] leading-relaxed">
                    Kantor Partner Senior Soren Lindqvist telah mencatat ringkasan arsitektur Anda untuk lokasi{' '}
                    <span className="text-[#F4F4F0]">{formState.location}</span> ({formState.estimatedArea}). Kami akan
                    menghubungi Anda dalam 48 jam kerja dengan jadwal studi kelayakan awal serta pengiriman kotak sampel
                    material fisik.
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(false)}
                    className="w-full py-2.5 px-4 text-xs font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors cursor-pointer"
                  >
                    Kembali ke Portofolio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div>
                    <label htmlFor="client-name" className="block text-xs font-light text-[#A1A1AA] mb-1.5">
                      Nama Lengkap atau Perwakilan Institusi
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="mis., Bapak Hendra Wijaya"
                      className="w-full px-3.5 py-2.5 text-sm font-light bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-email" className="block text-xs font-light text-[#A1A1AA] mb-1.5">
                      Alamat Email Langsung
                    </label>
                    <input
                      id="client-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="nama@domain.com"
                      className="w-full px-3.5 py-2.5 text-sm font-light bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="site-location" className="block text-xs font-light text-[#A1A1AA] mb-1.5">
                        Lokasi Tapak Proyek
                      </label>
                      <input
                        id="site-location"
                        type="text"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm font-light bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                      />
                    </div>
                    <div>
                      <label htmlFor="site-area" className="block text-xs font-light text-[#A1A1AA] mb-1.5">
                        Perkiraan Luas Bangunan
                      </label>
                      <select
                        id="site-area"
                        value={formState.estimatedArea}
                        onChange={(e) => setFormState({ ...formState, estimatedArea: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm font-light bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                      >
                        <option value="200 – 400 m²">200 – 400 m²</option>
                        <option value="400 – 650 m²">400 – 650 m²</option>
                        <option value="650 – 1.200 m²">650 – 1.200 m²</option>
                        <option value="1.200+ m² Galeri / Estate">1.200+ m² Galeri / Estate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="architectural-notes" className="block text-xs font-light text-[#A1A1AA] mb-1.5">
                      Tujuan Spasial &amp; Kondisi Tapak
                    </label>
                    <textarea
                      id="architectural-notes"
                      rows={4}
                      value={formState.notes}
                      onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                      placeholder="Jelaskan kondisi struktur bangunan, orientasi cahaya alami, atau target tahun penyelesaian..."
                      className="w-full px-3.5 py-2.5 text-sm font-light bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-normal bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors cursor-pointer"
                  >
                    Kirim Ringkasan Arsitektur
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 border-t border-[#27272A] text-[11px] font-mono-tabular text-[#71717A]">
              ZÜRICH · KYOTO · MILAN · SELURUH KONSULTASI DIJAGA DI BAWAH PERJANJIAN KERAHASIAAN KETAT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
