'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSession, clearSession, UserSession } from '@/lib/auth/session';
import Link from 'next/link';
import Image from 'next/image';

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

interface PrayerTimeCardProps {
  prayer: string;
  time: string;
  status: string;
}

interface HistoryRowProps {
  date: string;
  prayer: string;
  time: string;
  status: string;
}

const StatCard = ({ title, value, color }: StatCardProps) => (
  <div className={`bg-white p-4 rounded-lg shadow-md flex items-center border-l-4 ${color}`}>
    <div>
      <p className="text-black text-sm">{title}</p>
      <p className="font-bold text-2xl text-black">{value}</p>
    </div>
  </div>
);

const PrayerTimeCard = ({ prayer, time, status }: PrayerTimeCardProps) => {
  const getClasses = (status: string) => {
    switch (status) {
      case 'Selesai':
        return 'border-2 border-green-300 bg-green-50';
      case 'Berlangsung':
        return 'border-2 border-orange-300 bg-orange-50';
      default:
        return 'border-2 border-blue-300 bg-blue-50';
    }
  };
  return (
    <div className={`rounded-lg p-4 flex justify-between items-center mb-3 ${getClasses(status)} shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer`}>
      <div>
        <p className="font-bold text-black">{prayer}</p>
        <p className="text-sm text-black">{time}</p>
      </div>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status === 'Selesai' ? 'bg-green-100 text-green-700' : status === 'Berlangsung' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
        {status}
      </span>
    </div>
  );
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserSession | null>(null);

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

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  // Helpers to parse time strings like "07.00" or "07:00" into today's Date
  const parseTimeToDate = (timeStr: string) => {
    const cleaned = timeStr.replace(/\./g, ':').trim();
    const [h, m] = cleaned.split(':').map((s) => parseInt(s, 10));
    const d = new Date();
    d.setHours(Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0, 0, 0);
    return d;
  };

  const getStatusForRange = (start: Date, end: Date) => {
    const now = new Date();
    if (now < start) return 'Akan Datang';
    if (now >= start && now <= end) return 'Berlangsung';
    return 'Selesai';
  };

  // Prayer schedule for today. Times are local. Update these values if needed.
  const isFriday = new Date().getDay() === 5; // Friday -> 5 (Sun=0)

  // base schedule
  const basePrayers = [
    { prayer: 'Dhuha', start: '07:00', end: '08:00' },
    { prayer: 'Dhuhur', start: '12:00', end: '13:00' },
    { prayer: 'Ashar', start: '15:00', end: '16:00' },
  ];

  const prayers: Array<{ prayer: string; start: string; end: string; status: string; priority: number; displayTime: string; startDate: Date; endDate: Date; }> = [];

  basePrayers.forEach((p) => {
    if (p.prayer === 'Ashar' && isFriday) {
      // On Friday: show Jumat in place of Ashar, then add a later Ashar for women
      const startDate = parseTimeToDate(p.start);
      const endDate = parseTimeToDate(p.end);
      const jumatStatus = getStatusForRange(startDate, endDate);
      const jumatPriority = jumatStatus === 'Akan Datang' ? 0 : jumatStatus === 'Berlangsung' ? 1 : 2;
      prayers.push({
        prayer: 'Jumat',
        start: p.start,
        end: p.end,
        startDate,
        endDate,
        status: jumatStatus,
        priority: jumatPriority,
        displayTime: `${p.start.replace(':', '.')} - ${p.end.replace(':', '.')} WIB`,
      });

      // create Ashar for women later: start 30 minutes after Jumat end, same duration
      const duration = endDate.getTime() - startDate.getTime();
      const asharlaterStart = new Date(endDate.getTime() + 30 * 60000);
      const asharlaterEnd = new Date(asharlaterStart.getTime() + duration);
      const asharlaterStatus = getStatusForRange(asharlaterStart, asharlaterEnd);
      const asharlaterPriority = asharlaterStatus === 'Akan Datang' ? 0 : asharlaterStatus === 'Berlangsung' ? 1 : 2;
      prayers.push({
        prayer: 'Ashar (Wanita)',
        start: asharlaterStart.toTimeString().slice(0, 5),
        end: asharlaterEnd.toTimeString().slice(0, 5),
        startDate: asharlaterStart,
        endDate: asharlaterEnd,
        status: asharlaterStatus,
        priority: asharlaterPriority,
        displayTime: `${asharlaterStart.getHours().toString().padStart(2, '0')}.${asharlaterStart.getMinutes().toString().padStart(2, '0')} - ${asharlaterEnd.getHours().toString().padStart(2, '0')}.${asharlaterEnd.getMinutes().toString().padStart(2, '0')} WIB`,
      });
    } else {
      const startDate = parseTimeToDate(p.start);
      const endDate = parseTimeToDate(p.end);
      const status = getStatusForRange(startDate, endDate);
      const priority = status === 'Akan Datang' ? 0 : status === 'Berlangsung' ? 1 : 2;
      prayers.push({
        ...p,
        startDate,
        endDate,
        status,
        priority,
        displayTime: `${p.start.replace(':', '.')} - ${p.end.replace(':', '.')} WIB`,
      });
    }
  });

  // Sort: upcoming first, ongoing middle, done bottom. Within each group sort by start time ascending.
  const sortedPrayers = prayers.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.startDate.getTime() - b.startDate.getTime();
  });

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

      <main className="container mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-8">
          <div>
            <h2 className="font-bold text-xl">Waktu Sholat Dhuhur !</h2>
            <p>Segera lakukan absensi sebelum waktu berakhir</p>
          </div>
          <button
            onClick={() => router.push('/siswa/scan')}
            className="bg-white text-red-500 font-bold py-2 px-6 rounded-lg shadow hover:shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
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
              {sortedPrayers.map((p) => (
                <PrayerTimeCard
                  key={p.prayer}
                  prayer={p.prayer}
                  time={p.displayTime}
                  status={p.status}
                />
              ))}
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
