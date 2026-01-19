'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Bell } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  icon?: string;
}

interface PrayerTimeCardProps {
  prayer: string;
  time: string;
  status: string;
  statusColor: string;
}

interface HistoryRowProps {
  date: string;
  prayer: string;
  time: string;
  status: string;
}

const StatCard = ({ title, value, color, icon }: StatCardProps) => (
  <div className={`bg-white p-4 rounded-lg shadow-md flex items-center border-l-4 ${color}`}>
    <div>
      <p className="text-black text-sm">{title}</p>
      <p className="font-bold text-2xl text-black">{value}</p>
    </div>
  </div>
);

const PrayerTimeCard = ({ prayer, time, status, statusColor }: PrayerTimeCardProps) => (
  <div className={`border rounded-lg p-4 flex justify-between items-center mb-3 border-l-4 ${statusColor}`}>
    <div>
      <p className="font-bold text-black">{prayer}</p>
      <p className="text-sm text-black">{time}</p>
    </div>
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
        status === 'Selesai' ? 'bg-green-100 text-green-700' : 
        status === 'Berlangsung' ? 'bg-orange-100 text-orange-700' : 
        'bg-blue-100 text-blue-700'
    }`}>
      {status}
    </span>
  </div>
);

const HistoryRow = ({ date, prayer, time, status }: HistoryRowProps) => (
  <tr className="border-b">
    <td className="py-3 px-4 text-black">{date}</td>
    <td className="py-3 px-4 text-black">{prayer}</td>
    <td className="py-3 px-4 text-black">{time}</td>
    <td className="py-3 px-4">
      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">{status}</span>
    </td>
  </tr>
);

export default function SiswaPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <header
        className="shadow-md"
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

      <main className="container mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-8">
          <div>
            <h2 className="font-bold text-xl">Waktu Sholat Dhuhur !</h2>
            <p>Segera lakukan absensi sebelum waktu berakhir</p>
          </div>
          <button 
            onClick={() => router.push('/siswa/scan')}
            className="bg-white text-red-500 font-bold py-2 px-6 rounded-lg shadow"
          >
            Absen Sekarang
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Absensi" value="5" color="border-blue-500" />
          <StatCard title="Kehadiran" value="5" color="border-green-500" />
          <StatCard title="Persentase" value="100%" color="border-purple-500" />
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-black">Jadwal Sholat hari ini</h3>
            <div>
              <PrayerTimeCard prayer="Dhuha" time="07.00 - 08.00 WIB" status="Selesai" statusColor="border-l-green-500" />
              <PrayerTimeCard prayer="Dhuhur" time="12.00 - 13.00 WIB" status="Berlangsung" statusColor="border-l-orange-500" />
              <PrayerTimeCard prayer="Ashar" time="15.00 - 16.00 WIB" status="Akan Datang" statusColor="border-l-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4 text-black">Riwayat Absensi</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-black">Tanggal</th>
                  <th className="py-3 px-4 font-semibold text-black">Sholat</th>
                  <th className="py-3 px-4 font-semibold text-black">Waktu</th>
                  <th className="py-3 px-4 font-semibold text-black">Status</th>
                </tr>
              </thead>
              <tbody>
                <HistoryRow date="13 NOV 2025" prayer="Dhuhur" time="12:20" status="Hadir" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
