'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();

  const [nis, setNis] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (!nis.trim()) {
      setMessage('NIS/NIP wajib diisi');
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setMessage('Email wajib diisi');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setMessage('Link reset kata sandi telah dikirim ke email.');
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
              className="mx-auto block w-[260px] h-[60px] bg-white text-black rounded-full font-extrabold text-lg shadow-lg disabled:opacity-60"
            >
              {isLoading ? 'Memproses...' : 'Lanjut'}
            </button>
          </form>
        </div>
      </main>

      {/* MESSAGE */}
      {message && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${message.includes('dikirim')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
