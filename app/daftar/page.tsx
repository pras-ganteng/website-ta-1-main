'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { register } from '@/lib/api/auth';
import { RegisterRequest } from '@/lib/types/auth';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    nis: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      if (!formData.nis.trim() || !formData.email.trim() || !formData.password.trim() || !confirmPassword.trim()) {
        setMessage('Semua field wajib diisi.');
        setIsLoading(false);
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setMessage('Email tidak valid.');
        setIsLoading(false);
        return;
      }

      if (formData.password !== confirmPassword) {
        setMessage('Kata sandi dan konfirmasi tidak cocok.');
        setIsLoading(false);
        return;
      }

      await register(formData);
      setMessage('Registrasi berhasil! Silakan login.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registrasi gagal. Silakan coba lagi.';
      setMessage(`Registrasi gagal: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(131.02deg, #8CCAFF -60.88%, #ACD9FF -22.65%, #FFFFFF 75.95%)',
      }}
    >
      {/* BACKGROUND IMAGE (opsional, bisa diaktifkan jika ada) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "url('/Images/bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: '1200px',
        }}
      />

      {/* HEADER — IDENTIK DENGAN HALAMAN LOGIN */}
      <header
        className="relative z-10 h-[120px] md:h-[130px] flex flex-col items-center justify-center shadow-lg"
        style={{
          background:
            'linear-gradient(92.21deg, #398ED6 50.74%, #FFFFFF 168.73%)',
        }}
      >
        <h1 className="text-white font-bold text-xl md:text-3xl">
          PRESENSI SHOLAT DIGITAL
        </h1>
        <div className="w-30 md:w-[400px] border-t border-white my-2" />
        <p className="text-white text-sm md:text-xl">
          SMK NEGERI 2 SINGOSARI
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 px-4 py-10 md:py-20">
        <Image
          src="/Images/rasi.png"
          alt="Maskot Kiri"
          width={200}
          height={480}
          className="hidden lg:block absolute left-6 bottom-10 z-10 drop-shadow-lg"
        />

        <Image
          src="/Images/ino.png"
          alt="Maskot Kanan"
          width={200}
          height={480}
          className="hidden lg:block absolute right-6 bottom-10 z-10"
          />
  
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">

          {/* KIRI — FORM DAFTAR (GRADIEN ORANGE) */}
          <div
            className="rounded-xl p-6 md:p-10 shadow-xl text-white"
            style={{
              background:
                'linear-gradient(129.09deg, #F89D3C -4.1%, #AD2C16 188.08%)',
            }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-center mb-8">
              DAFTAR
            </h2>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  NIS
                </label>
                <input
                  type="text"
                  value={formData.nis}
                  onChange={(e) => setFormData(prev => ({ ...prev, nis: e.target.value }))}
                  disabled={isLoading}
                  placeholder="Masukkan NIS"
                  className="w-full h-[56px] md:h-[50px] rounded-xl px-4 text-black font-bold"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                />
              </div>

              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isLoading}
                  placeholder="Masukkan email"
                  className="w-full h-[56px] md:h-[50px] rounded-xl px-4 text-black font-bold"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                />
              </div>

              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={isLoading}
                    placeholder="Masukkan kata sandi"
                    className="w-full h-[56px] md:h-[50px] rounded-xl px-4 pr-12 text-black font-bold"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="Masukkan konfirmasi kata sandi"
                    className="w-full h-[56px] md:h-[50px] rounded-xl px-4 pr-12 text-black font-bold"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                  >
                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[56px] md:h-[70px] bg-white text-black rounded-full font-extrabold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Memproses...' : 'Daftar'}
              </button>
            </form>

            <p className="text-center text-xs md:text-sm mt-4">
              Sudah punya akun?{' '}
              <a href="/" className="underline">
                Login
              </a>
            </p>
          </div>

          {/* KANAN — SAMBUTAN (GRADIEN BIRU-HIJAU) */}
          <div
            className="rounded-xl p-6 md:p-10 text-center shadow-xl"
            style={{
              background:
                'linear-gradient(129.08deg, #3C91DA 38.25%, #71E9CC 145.63%)',
            }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-[#DDE6F5]">
              “AHLAN WA SAHLAN”
            </h2>
            <p className="text-lg md:text-2xl font-bold text-[#DDE6F5] mt-1">
              ( Selamat datang )
            </p>

            <p className="text-left text-base md:text-xl text-[#DDE6F5]/85 mt-30 leading-relaxed">
              Aplikasi ini digunakan untuk absensi sholat Dhuha,
              Zuhur, dan Jumat di SMKN 2 Singosari berbasis web.
            </p>
            <p className="text-left text-base md:text-xl text-[#DDE6F5]/85 mt-4 leading-relaxed">
              Aplikasi ini juga tersedia dalam versi Android dan desktop.
            </p>
          </div>
        </div>
      </main>

      {/* TOAST MESSAGE (fixed bottom) */}
      {message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg max-w-md text-center z-50 ${
            message.includes('berhasil')
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}