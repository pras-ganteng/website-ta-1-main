'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { getSession, clearSession, UserSession } from '@/lib/auth/session';
import jsQR from 'jsqr';
import Image from 'next/image';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserSession | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Promise.resolve().then(() => {
      const session = getSession();
      if (!session) {
        router.replace('/');
      } else {
        setUser(session);
      }
      setIsLoading(false);
    });
  }, [router]);

  useEffect(() => {
    if (!isScanning) return;

    let animationFrameId: number;

    const scan = () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScannedData(code.data);
          setIsScanning(false);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(scan);
    };

    const startCamera = async () => {
      try {
        setError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          setTimeout(() => {
            scan();
          }, 500);
        }
      } catch {
        setError('Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin.');
        setIsScanning(false);
      }
    };

    startCamera();

    const currentVideo = videoRef.current;
    return () => {
      if (currentVideo?.srcObject) {
        const tracks = (currentVideo.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isScanning]);

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;



  const handleStopScan = () => {
    setIsScanning(false);
    setScannedData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col">
      <header
        className="shadow-md flex-none"
        style={{
          background:
            'linear-gradient(92.21deg, #398ED6 50.74%, #FFFFFF 168.73%)',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/Images/smk.png" alt="Logo" width={40} height={40} className="h-10 mr-4" />
              <div>
                <h1 className="text-lg font-bold text-white">PRESENSI SHOLAT DIGITAL</h1>
                <p className="text-sm text-white">DHUHA, DHUHUR, JUM&apos;AT</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center text-right">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white mr-2">M</div>
                  <div>
                    <p className="font-semibold text-sm text-white">M. MALIK</p>
                    <p className="text-xs text-white">Siswa</p>
                  </div>
                  <ChevronDown size={20} className="ml-1 text-gray-500" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                    <Link href="/siswa/pengaturan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-1">Pindai Kode QR</h1>
          <p className="text-gray-700">Arahkan kamera ke QR Kode</p>
        </div>

        {scannedData ? (
          // Success View
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 font-semibold text-center">QR Code Berhasil Dipindai</p>
              <p className="text-gray-600 text-sm text-center mt-2 break-all">{scannedData}</p>
            </div>
            <button
              onClick={() => handleStopScan()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Pindai Ulang
            </button>
          </div>
        ) : isScanning ? (
          // Camera View
          <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-md">
            <div className="relative bg-black w-full aspect-square rounded-xl overflow-hidden mb-6">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
            </div>
            <button
              onClick={handleStopScan}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Hentikan Scan
            </button>
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
        ) : (
          // Initial View
          <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-md">
            <div className="bg-black w-full aspect-square rounded-xl mb-6"></div>

            <button
              onClick={() => {
                setIsScanning(true);
                setError(null);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Mulai Scan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
