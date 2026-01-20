'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/auth';
import { LoginRequest } from '@/lib/types/auth';
import { setSession } from '@/lib/auth/session';
import LoadingSpinner from '@/components/LoadingSpinner';
import CustomDialog from '@/components/CustomDialog';

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginRequest>({
    nis: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState<{open: boolean, title: string, message: string}>({open: false, title: '', message: ''});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(formData);
      setSession(res.data);
      router.push('/siswa');
    } catch (error) {
      setDialog({open: true, title: 'Login Gagal', message: 'Periksa kembali NIS dan password Anda.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(131.02deg, #8CCAFF -60.88%, #ACD9FF -22.65%, #FFFFFF 75.95%)',
      }}
    >
      {/* ORNAMEN BACKGROUND FIGMA */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: "url('/Images/bg.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: '1200px',
        }}
      />

      {/* HEADER */}
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
        <div className="w-32 md:w-[400px] border-t border-white my-2" />
        <p className="text-white text-sm md:text-xl">
          SMK NEGERI 2 SINGOSARI
        </p>
      </header>

      {/* CONTENT */}
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

            <p className="text-left text-base md:text-xl text-[#DDE6F5]/85 mt-10 leading-relaxed">
              Aplikasi ini digunakan untuk absensi sholat Dhuha, Zuhur,
              dan Jumat di SMKN 2 Singosari berbasis web.
            </p>
            <p className="text-left text-base md:text-xl text-[#DDE6F5]/85 mt-4 leading-relaxed">
              Aplikasi ini juga tersedia dalam versi Android dan desktop.
            </p>
          </div>

            <div
            className="rounded-xl p-6 md:p-10 shadow-xl text-white"
            style={{
              background:
                'linear-gradient(129.09deg, #F89D3C -4.1%, #AD2C16 188.08%)',
            }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-center mb-8">
              MASUK
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  NIS / NIP
                </label>
                <input
                  type="text"
                  placeholder="Masukkan NIS / NIP"
                  className="w-full h-[56px] rounded-xl px-4 text-black font-bold"
                  style={{ background: 'rgba(255,255,255,0.5)' }}
                    onChange={(e) =>
                      setFormData({ ...formData, nis: e.target.value })
                    }
                    disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm md:text-lg font-bold mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan kata sandi"
                    className="w-full h-[56px] rounded-xl px-4 pr-12 text-black font-bold"
                    style={{ background: 'rgba(255,255,255,0.5)' }}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>

                <a href="/lupa_sandi" className="text-xs md:text-sm mt-2 block">
                  Lupa kata sandi?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-[56px] md:h-[70px] bg-white text-black rounded-full font-extrabold text-lg shadow-lg flex items-center justify-center gap-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size={18} stroke="#000" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>

            <p className="text-center text-xs md:text-sm mt-4">
              Tidak memiliki akun?{' '}
              <a href="/daftar" className="underline">
                Daftar
              </a>
            </p>
          </div>
        </div>
      </main>
      <CustomDialog
        isOpen={dialog.open}
        title={dialog.title}
        message={dialog.message}
        onClose={() => setDialog({open: false, title: '', message: ''})}
      />
    </div>
  );
}
