import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Sun, Compass, Layers } from 'lucide-react';
import { ArchitecturalPlate } from '../components/ArchitecturalPlate';
import { MATERIAL_LIBRARY, MaterialSample } from '../components/projectsData';

interface AboutPageProps {
  onBack: () => void;
  onInquire?: (contextLabel: string) => void;
}

const PRINCIPAL_ARCHITECTS = [
  {
    code: 'PA-01',
    name: 'Soren Lindqvist',
    role: 'Mitra Pendiri · Arsitek Utama (SIA / RIBA)',
    atelier: 'Studio Zürich',
    focus: 'Beton struktural monolitik, kantilever alpine, dan volume galeri bawah tanah.',
    background:
      'Pendidikan di ETH Zürich dengan pengalaman satu dekade riset struktural di Valais sebelum mendirikan Kronos Atelier pada tahun 2016.',
  },
  {
    code: 'PA-02',
    name: 'Elena Vance',
    role: 'Mitra Senior · Pengarah Spasial & Akustik',
    atelier: 'Studio Milan',
    focus: 'Kalibrasi ruang psikoakustik, plester mineral buatan tangan, dan bukaan okular senit.',
    background:
      'Mantan kepala restorasi pengecoran industri di Brera, mengkhususkan diri pada pencahayaan chiaroscuro kelas museum.',
  },
  {
    code: 'PA-03',
    name: 'Kenjiro Takahashi',
    role: 'Mitra · Fabrikasi Kayu & Kerajinan',
    atelier: 'Studio Kyoto',
    focus: 'Sambungan kayu karbonisasi Shou Sugi Ban, wastafel batu Kurama belah, dan pencahayaan alami shoji tingkat rendah.',
    background:
      'Berguru pada ahli pertukangan sukiya-zukuri tradisional di Kyoto sebelum bergabung dengan firma ini.',
  },
];

const ATELIER_LOCATIONS = [
  {
    city: 'Zürich',
    coordinates: "47°22'N 8°32'E",
    address: 'Talstrasse 82, 8001 Zürich, Swiss',
    specialty: 'Teknik Struktural & Proyek Pegunungan Alpine',
  },
  {
    city: 'Kyoto',
    coordinates: "35°00'N 135°45'E",
    address: 'Distrik Nakagyo, Kyoto 604-8006, Jepang',
    specialty: 'Riset Karbonisasi Kayu & Sambungan Konstruksi',
  },
  {
    city: 'Milan',
    coordinates: "45°28'N 9°11'E",
    address: 'Via Brera 28, 20121 Milano MI, Italia',
    specialty: 'Batu Monolitik & Desain Pameran',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onInquire }) => {
  const [plateMode, setPlateMode] = useState<'perspective' | 'blueprint'>('perspective');
  const [sunAngle, setSunAngle] = useState<number>(54);
  const [selectedSubstrate, setSelectedSubstrate] = useState<MaterialSample>(MATERIAL_LIBRARY[0]);

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-20 space-y-20">
      {/* Navigasi Atas / Aksi Kembali */}
      <div className="flex items-center justify-between border-b border-[#27272A] pb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA] hover:text-[#F4F4F0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>KEMBALI KE ARSIP</span>
        </button>
        <div className="text-xs font-mono-tabular text-[#71717A]">
          DOSIER MONOGRAFI · EST. 2016
        </div>
      </div>

      {/* Bagian 1: Manifesto Praktik & Studi Spasial Interaktif */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="text-xs font-mono-tabular text-[#A1A1AA]">
              01. PRAKTIK ARSITEKTUR · ZÜRICH / KYOTO / MILAN
            </div>
            <h1
              className="font-display text-3xl lg:text-5xl font-semibold tracking-tight text-[#F4F4F0] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Hening yang dirancang melalui keabadian mineral.
            </h1>
            <p className="text-sm lg:text-base text-[#A1A1AA] leading-relaxed">
              Didirikan pada tahun 2016, Kronos Atelier beroperasi di persimpangan kejujuran struktural brutalisme dan
              ketenangan ruang kontemplatif. Di ketiga studio kami di Zürich, Kyoto, dan Milan, kami mengartikan
              arsitektur bukan sekadar hiasan permukaan, melainkan kalibrasi massa, bayangan, dan ketenangan akustik.
            </p>
            <p className="text-sm text-[#D4D4D8] leading-relaxed">
              Setiap proyek dimulai dengan pengurangan struktural—menghapus sekat non-struktural dan pelapis sintetis
              hingga hanya batu mentah, kayu hangus, dan beton bertekstur cetakan papan yang tersisa dalam dialog dengan cahaya alami.
            </p>
          </div>

          {/* Kontrol Heliodon Interaktif untuk Plat Studi Studio */}
          <div className="pt-6 border-t border-[#27272A] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-1 p-1 bg-[#121214] border border-[#27272A] rounded-lg">
                <button
                  type="button"
                  onClick={() => setPlateMode('perspective')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    plateMode === 'perspective'
                      ? 'bg-[#F4F4F0] text-[#050505]'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Studi Chiaroscuro</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlateMode('blueprint')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    plateMode === 'blueprint'
                      ? 'bg-[#F4F4F0] text-[#050505]'
                      : 'text-[#A1A1AA] hover:text-[#F4F4F0]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Potongan 1:50</span>
                </button>
              </div>

              {plateMode === 'perspective' && (
                <label className="flex items-center gap-3 font-mono-tabular">
                  <Sun className="w-3.5 h-3.5 text-[#A1A1AA]" />
                  <span>Azimut</span>
                  <input
                    type="range"
                    min={15}
                    max={90}
                    value={sunAngle}
                    onChange={(e) => setSunAngle(Number(e.target.value))}
                    aria-label="Atur sudut cahaya matahari studio"
                    className="w-24 accent-[#F4F4F0] cursor-pointer"
                  />
                  <span className="w-8 text-right text-[#F4F4F0]">{sunAngle}°</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Plat Arsitektur Interaktif */}
        <div className="lg:col-span-7">
          <div className="relative h-[360px] lg:h-[480px] rounded-2xl overflow-hidden border border-[#27272A]">
            <ArchitecturalPlate
              plateType="kyoto_sanctuary"
              mode={plateMode}
              sunAngle={sunAngle}
              className="w-full h-full"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
              <div className="text-xs font-mono-tabular text-[#A1A1AA]">
                STUDI ARSIP ATELIER · KALIBRASI CAHAYA ALAMI KYOTO &amp; ZÜRICH
              </div>
              <p className="text-sm text-[#F4F4F0] mt-1">
                Bukaan tingkat rendah membiaskan cahaya pada granit Kurama belah dan bilah kayu cemara terkarbonisasi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 2: Arsitek Utama & Mitra */}
      <section className="pt-16 border-t border-[#27272A] space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-[#A1A1AA] mb-2">
              02. JAJARAN PIMPINAN &amp; MITRA
            </div>
            <h2 className="font-display text-2xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F0]">
              Arsitek Utama
            </h2>
          </div>
          <p className="text-sm text-[#A1A1AA] max-w-[50ch]">
            Setiap proyek dipimpin langsung oleh salah satu dari tiga pendiri kami, mulai dari penggalian tapak awal hingga
            fabrikasi furnitur khusus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPAL_ARCHITECTS.map((partner) => (
            <article
              key={partner.code}
              className="p-6 lg:p-8 rounded-2xl border border-[#27272A] bg-[#0C0C0E] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-tabular text-[#71717A]">
                  <span>{partner.code}</span>
                  <span>{partner.atelier}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#F4F4F0]">
                  {partner.name}
                </h3>
                <p className="font-editorial italic text-base text-[#D4D4CE]">
                  {partner.role}
                </p>
                <p className="text-sm text-[#A1A1AA] leading-relaxed pt-2">
                  {partner.background}
                </p>
              </div>

              <div className="pt-4 border-t border-[#27272A] text-xs">
                <div className="font-mono-tabular text-[#71717A] mb-1">FOKUS RISET</div>
                <div className="text-[#D4D4D8] leading-relaxed">{partner.focus}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bagian 3: Etika Material & Penjelajah Substrat */}
      <section className="pt-16 border-t border-[#27272A] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono-tabular text-[#A1A1AA]">
            03. ETIKA MATERIAL
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold tracking-tight text-[#F4F4F0]">
            Kejujuran Mineral Tanpa Pelapis
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Kami menolak bahan pengawet poliuretan sintetis dan lapisan buatan. Pilih substrat dasar untuk mengamati
            bagaimana studio kami mengambil dan mengolah material arsitektur mentah.
          </p>

          <div className="pt-4 flex flex-wrap gap-2">
            {MATERIAL_LIBRARY.map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedSubstrate(mat)}
                className={`px-3 py-2 rounded-lg text-xs font-mono-tabular border transition-colors cursor-pointer ${
                  selectedSubstrate.id === mat.id
                    ? 'bg-[#F4F4F0] text-[#050505] border-[#F4F4F0]'
                    : 'bg-[#121215] text-[#A1A1AA] border-[#27272A] hover:text-[#F4F4F0]'
                }`}
              >
                {mat.code} · {mat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-8 rounded-2xl border border-[#27272A] bg-[#0C0C0E] space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tabular text-[#A1A1AA]">
              {selectedSubstrate.code} · {selectedSubstrate.origin}
            </span>
            <span className="text-xs font-mono-tabular text-[#F4F4F0]">
              {selectedSubstrate.reflectance} · {selectedSubstrate.density}
            </span>
          </div>
          <h3 className="font-display text-xl font-semibold text-[#F4F4F0]">
            {selectedSubstrate.name}
          </h3>
          <p className="text-sm text-[#D4D4D8] leading-relaxed">
            {selectedSubstrate.description}
          </p>
          <div className="pt-4 border-t border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A1A1AA]">
            <span>Finishing: {selectedSubstrate.finish}</span>
            {onInquire && (
              <button
                type="button"
                onClick={() => onInquire(`Konsultasi Arsip Material: ${selectedSubstrate.name}`)}
                className="inline-flex items-center gap-1.5 text-[#F4F4F0] hover:underline underline-offset-4 cursor-pointer"
              >
                <span>Minta Sampel Fisik</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Bagian 4: Lokasi Studio Global */}
      <section className="pt-16 border-t border-[#27272A] space-y-8">
        <div className="text-xs font-mono-tabular text-[#A1A1AA]">
          04. STUDIO GLOBAL
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ATELIER_LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className="p-6 rounded-2xl border border-[#27272A] bg-[#09090B] space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#71717A]">
                <span>STUDIO</span>
                <span>{loc.coordinates}</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F4F4F0]">{loc.city}</h3>
              <p className="text-xs text-[#D4D4D8]">{loc.address}</p>
              <p className="text-xs text-[#A1A1AA] pt-2">{loc.specialty}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};