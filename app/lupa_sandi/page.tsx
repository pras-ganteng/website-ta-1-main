'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import CustomDialog from '@/components/CustomDialog';

export default function ForgotPassword() {
  const [nis, setNis] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState<{ open: boolean, title: string, message: string }>({ open: false, title: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nis.trim()) {
      setDialog({ open: true, title: 'Error', message: 'NIS/NIP wajib diisi' });
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setDialog({ open: true, title: 'Error', message: 'Email wajib diisi' });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setDialog({ open: true, title: 'Berhasil', message: 'Link reset kata sandi telah dikirim ke email.' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(131.02deg, #8CCAFF -60.88%, #ACD9FF -22.65%, #FFFFFF 75.95%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "url('/Images/bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: '1200px',
        }}
      />

      <header
        className="relative z-10 h-[120px] md:h-[140px] flex flex-col items-center justify-center shadow-lg"
        style={{
          background:
            'linear-gradient(92.21deg, #398ED6 50.74%, #FFFFFF 168.73%)',
        }}
      >
        <h1 className="text-white font-bold text-xl md:text-3xl">
          PRESENSI SHOLAT DIGITAL
        </h1>
        <div className="w-32 md:w-[400px] border-t border-white my-2" />
        <p className="text-white text-sm md:text-xl">
          SMK NEGERI 2 SINGOSARI
        </p>
      </header>

      <main className="relative z-10 flex items-center justify-center px-4 py-16">
        <Image
          src="/Images/rasi.png"
          alt="Maskot Kiri"
          width={200}
          height={450}
          className="hidden lg:block absolute left-45 bottom-10 z-10 drop-shadow-lg"
        />

        <Image
          src="/Images/ino.png"
          alt="Maskot Kanan"
          width={200}
          height={450}
          className="hidden lg:block absolute right-45 bottom-10 z-10"
        />

        {/* CARD */}
        <div
          className="w-full max-w-3xl rounded-xl p-8 md:p-12 text-white shadow-2xl"
          style={{
            background:
              'linear-gradient(129.09deg, #F89D3C -4.1%, #AD2C16 188.08%)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
            LUPA KATA SANDI
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">
                NIS / NIP
              </label>
              <input
                type="text"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                disabled={isLoading}
                placeholder="Masukkan NIS / NIP"
                className="w-full h-[60px] rounded-xl px-4 text-black font-bold bg-white/60 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="Masukkan email"
                className="w-full h-[60px] rounded-xl px-4 text-black font-bold bg-white/60 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mx-auto block w-[260px] h-[60px] bg-white text-black rounded-full font-extrabold text-lg shadow-lg disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size={18} stroke="#000" />
                  <span>Memproses...</span>
                </>
              ) : (
                'Lanjut'
              )}
            </button>
          </form>
        </div>
      </main>

      <CustomDialog
        isOpen={dialog.open}
        title={dialog.title}
        message={dialog.message}
        onClose={() => setDialog({ open: false, title: '', message: '' })}
      />
    </div>
  );
}
