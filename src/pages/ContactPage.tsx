import React, { useState } from 'react';
import { ArrowLeft, Mail, MapPin, Send, Check } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex-1 w-full">
      {/* Tombol Kembali ke Beranda */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#A1A1AA] hover:text-[#F4F4F0] mb-12 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>KEMBALI KE PORTOFOLIO</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Kolom Kiri: Detail Kontak */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono-tabular text-[#A1A1AA]">
            04. PERTANYAAN LANGSUNG
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight text-[#F4F4F0]">
            Hubungi Kami
          </h1>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            Hubungi kami untuk komisi arsitektur, konsultasi privat, atau pertanyaan arsip material.
          </p>

          <div className="pt-6 border-t border-[#27272A] space-y-4 text-sm">
            <div className="flex items-center gap-3 text-[#D4D4D8]">
              <Mail className="w-4 h-4 text-[#A1A1AA]" />
              <span>studio@kronos-atelier.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#D4D4D8]">
              <MapPin className="w-4 h-4 text-[#A1A1AA]" />
              <span>Zürich · Kyoto · Milan</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Kontak */}
        <div className="lg:col-span-7 p-8 rounded-2xl border border-[#27272A] bg-[#0C0C0E]">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex p-3 rounded-full bg-[#18181B] border border-[#3F3F46] text-[#F4F4F0]">
                <Check className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#F4F4F0]">
                Pesan Diterima
              </h2>
              <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
                Terima kasih telah menghubungi kami. Studio kami akan merespons dalam waktu 48 jam kerja.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 text-xs font-medium border border-[#3F3F46] rounded-lg hover:bg-[#F4F4F0] hover:text-[#050505] transition-colors cursor-pointer"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1.5">Nama Anda</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-2.5 text-sm bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1.5">Alamat Email</label>
                <input
                  type="email"
                  required
                  placeholder="nama@contoh.com"
                  className="w-full px-4 py-2.5 text-sm bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A1A1AA] mb-1.5">Pesan</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Ceritakan tentang proyek Anda..."
                  className="w-full px-4 py-2.5 text-sm bg-[#121215] border border-[#27272A] rounded-lg text-[#F4F4F0] focus:outline-none focus:border-[#F4F4F0]"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 text-xs font-medium bg-[#F4F4F0] text-[#050505] rounded-lg hover:bg-[#D4D4CE] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};