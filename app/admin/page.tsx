'use client';

import Image from 'next/image';

const jadwalJurusan: Record<string, { nama: string; kode: string; logo: string; gradient: string }[]> = {
  Senin: [
    { nama: 'Rekayasa Perangkat Lunak', kode: 'RPL', logo: '/Images/PPLG.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#F68C34 87%)' },
    { nama: 'Teknik Elektronika Industri', kode: 'TEI', logo: '/Images/ELEKTRONIKA INDUSTRI.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#009252 87%)' },
  ],
  Selasa: [
    { nama: 'Mekatronika', kode: 'MT', logo: '/Images/MEKATRONIKA.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#0E4A0E 87%)' },
    { nama: 'Teknik Komputer dan Jaringan', kode: 'TKJ', logo: '/Images/JARKOMSI.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#FFCC29 87%)' },
  ],
  Rabu: [
    { nama: 'Desain Komunikasi Visual', kode: 'DKV', logo: '/Images/DKV.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#1A89D8 87%)' },
    { nama: 'Animasi', kode: 'ANIM', logo: '/Images/ANIMASI.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#D94B97 87%)' },
  ],
  Kamis: [
    { nama: 'Broadcasting', kode: 'BC', logo: '/Images/BROADCASTING.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#E05052 87%)' },
  ],
  Jumat: [
    { nama: 'Audio Video', kode: 'AV', logo: '/Images/AUDIO VIDEO.png', gradient: 'linear-gradient(83.71deg,#FFFFFF -54%,#62BB51 87%)' },
  ],
};

const jadwalSholat = [
  { nama: 'Subuh', waktu: '04.30 WIB', icon: '🌙', jamMulai: 4, menitMulai: 30 },
  { nama: 'Dhuha', waktu: '07.00 - 08.00 WIB', icon: '☀️', jamMulai: 7, menitMulai: 0 },
  { nama: 'Dzuhur', waktu: '11.45 WIB', icon: '🕌', jamMulai: 11, menitMulai: 45 },
  { nama: 'Ashar', waktu: '15.00 WIB', icon: '🌤️', jamMulai: 15, menitMulai: 0 },
  { nama: 'Maghrib', waktu: '17.45 WIB', icon: '🌅', jamMulai: 17, menitMulai: 45 },
  { nama: 'Isya', waktu: '19.00 WIB', icon: '🌃', jamMulai: 19, menitMulai: 0 },
];

function getSholatSekarang() {
  const now = new Date();
  const waktuSekarang = now.getHours() * 60 + now.getMinutes();
  let sholatSekarang = jadwalSholat[jadwalSholat.length - 1];
  for (let i = 0; i < jadwalSholat.length; i++) {
    const waktuSholat = jadwalSholat[i].jamMulai * 60 + jadwalSholat[i].menitMulai;
    if (waktuSekarang < waktuSholat) {
      sholatSekarang = i > 0 ? jadwalSholat[i - 1] : jadwalSholat[jadwalSholat.length - 1];
      break;
    }
  }
  return sholatSekarang;
}

export default function AdminDashboard() {
  const hariIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const hariIni = hariIndo[new Date().getDay()];
  const jurusanHariIni = jadwalJurusan[hariIni] || [];
  const sholatSekarang = getSholatSekarang();

  return (
    <main className="px-3 md:px-8 lg:px-16 py-4 md:py-14 space-y-4 md:space-y-14">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-12">
        <StatCard title="Total Siswa" value="800" color="#1883EE" />
        <StatCard title="Hadir Hari Ini" value="80" desc="Dari 90 siswa" color="#1CE247" />
        <StatCard title="Izin / Sakit" value="20" desc="10 izin, 10 sakit" color="#E6A71F" />
        <StatCard title="Alpha" value="7" color="#E62C2C" />
      </div>

      <section className="bg-white rounded-xl md:rounded-3xl shadow-xl p-3 md:p-10">
        <h2 className="text-lg md:text-3xl font-bold mb-3 md:mb-8 text-black">Jadwal Sholat</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {jadwalSholat.map((s) => {
            const isActive = s.nama === sholatSekarang.nama;
            return (
              <div key={s.nama} className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 p-2 md:p-4 rounded-xl md:rounded-3xl shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${isActive ? 'bg-white border-2 border-blue-500' : 'bg-gray-100 opacity-50 hover:opacity-80'}`}>
                <div className={`text-xl md:text-3xl ${isActive ? '' : 'grayscale'}`}>{s.icon}</div>
                <div className="text-center md:text-left">
                  <p className={`text-xs md:text-lg font-bold ${isActive ? 'text-black' : 'text-gray-400'}`}>{s.nama}</p>
                  <p className={`text-[10px] md:text-sm ${isActive ? 'text-black' : 'text-gray-400'}`}>{s.waktu}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-xl md:rounded-3xl shadow-xl p-3 md:p-10">
        <h2 className="text-lg md:text-3xl font-bold mb-3 md:mb-8 text-black">Jurusan Hari Ini ({hariIni})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
          {jurusanHariIni.map((j) => (
            <div key={j.kode} className="rounded-xl md:rounded-2xl p-3 md:p-8 shadow-xl transition-all duration-300 cursor-pointer hover:scale-105" style={{ background: j.gradient }}>
              <div className="flex items-center gap-3 md:gap-6">
                <Image src={j.logo} alt={j.kode} width={80} height={80} className="w-10 h-10 md:w-16 md:h-16" />
                <div>
                  <p className="text-sm md:text-2xl font-bold text-black">{j.nama}</p>
                  <p className="opacity-70 text-black text-xs md:text-base">({j.kode})</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, desc, color }: { title: string; value: string; desc?: string; color: string }) {
  return (
    <div className="relative h-[90px] md:h-[160px] transition-all duration-300 cursor-pointer hover:scale-105">
      <div className="absolute inset-0 rounded-lg md:rounded-2xl" style={{ background: color }} />
      <div className="absolute inset-0 ml-2 md:ml-6 bg-[#F5F4F4] rounded-lg md:rounded-2xl shadow-xl p-2 md:p-6">
        <p className="text-xs md:text-lg text-black">{title}</p>
        <p className="text-lg md:text-3xl font-bold text-black">{value}</p>
        {desc && <p className="text-[10px] md:text-sm opacity-60 mt-1 text-black hidden md:block">{desc}</p>}
      </div>
    </div>
  );
}
