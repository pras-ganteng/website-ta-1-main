'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import CustomDialog from '@/components/CustomDialog';

export default function OtpPage() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [resendLoading, setResendLoading] = useState(false);
  const [dialog, setDialog] = useState<{ open: boolean, title: string, message: string }>({ open: false, title: '', message: '' });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Focus previous input on backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
          className="w-full max-w-md rounded-xl p-8 md:p-12 text-white shadow-2xl"
          style={{
            background:
              'linear-gradient(129.09deg, #F89D3C -4.1%, #AD2C16 188.08%)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-center mb-6">
            LUPA KATA SANDI
          </h2>
          <div className="text-center">
            <p className="font-bold">Verifikasi kode OTP</p>
            <p className="text-sm">Kode telah dikirim ke email@example.com</p>
          </div>

          <div className="mt-8">
            <label className="font-bold">Masukkan kode OTP :</label>
            <div className="flex justify-center gap-2 md:gap-4 mt-2">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold text-gray-800 bg-orange-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                );
              })}
            </div>
          </div>

          <div className="text-center mt-8 text-sm">
            <p>
              Kirim ulang kode dalam waktu 1 menit{' '}
              <button
                className="align-middle inline-flex items-center gap-2"
                onClick={async () => {
                  setResendLoading(true);
                  // simulate resend call
                  await new Promise((res) => setTimeout(res, 1200));
                  setDialog({ open: true, title: 'Berhasil', message: 'Kode telah dikirim ulang.' });
                  setResendLoading(false);
                }}
                disabled={resendLoading}
              >
                {resendLoading ? <LoadingSpinner size={18} stroke="#000" /> : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z"></path></svg>
                )}
              </button>
            </p>
          </div>
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