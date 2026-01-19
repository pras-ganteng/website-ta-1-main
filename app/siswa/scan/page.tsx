'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
              <img src="/Images/smk.png" alt="Logo" className="h-10 mr-4" />
              <div>
                <h1 className="text-lg font-bold text-white">PRESENSI SHOLAT DIGITAL</h1>
                <p className="text-sm text-white">DHUHA, DHUHUR, JUM'AT</p>
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
                    <a href="/siswa/pengaturan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Keluar</a>
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

        <div className="bg-gray-100 p-4 rounded-2xl shadow-xl w-full max-w-xs">
          <div className="bg-black w-full aspect-square rounded-xl mb-6"></div>
          
          <button 
            onClick={() => console.log('Start Scan')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Mulai Scan
          </button>
        </div>
      </div>
    </div>
  );
}
