'use client';

import { useState } from 'react';
import { ChevronDown, Calendar, ChevronRight } from 'lucide-react';

const ATTENDANCE_DATA = [
    { id: 1, tanggal: '18/11/2025', nis: '2025RPL001', nama: 'Siswa RPL 1', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Hadir' },
    { id: 2, tanggal: '18/11/2025', nis: '2025RPL002', nama: 'Siswa RPL 2', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Hadir' },
    { id: 3, tanggal: '18/11/2025', nis: '2025RPL003', nama: 'Siswa RPL 3', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Hadir' },
    { id: 4, tanggal: '18/11/2025', nis: '2025RPL004', nama: 'Siswa RPL 4', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Sakit' },
    { id: 5, tanggal: '18/11/2025', nis: '2025RPL005', nama: 'Siswa RPL 5', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Hadir' },
    { id: 6, tanggal: '18/11/2025', nis: '2025RPL006', nama: 'Siswa RPL 6', kelas: '10 RPL 2', sholat: 'Dhuha', status: 'Izin' },
];

export default function LaporanPage() {
    const [dateStart, setDateStart] = useState('18/11/2025');
    const [dateEnd, setDateEnd] = useState('18/11/2025');
    const [jurusan, setJurusan] = useState('Semua Jurusan');
    const [kelas, setKelas] = useState('Semua Kelas');

    return (
        <main className="px-4 md:px-8 py-8 space-y-6 relative font-sans max-w-[1400px] mx-auto">
            {/* Page Title */}
            <h1
                className="text-3xl md:text-4xl font-bold text-black font-roboto"
                style={{ fontFamily: 'Roboto, sans-serif' }}
            >
                Laporan
            </h1>

            {/* Card 1: Ringkasan Periode & Unduh Laporan */}
            <section
                className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl"
                style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.15)' }}
            >
                <h2 className="text-2xl font-medium mb-6 text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Ringkasan Periode</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Kehadiran */}
                    <div className="bg-[#ECFFE3] rounded-[20px] p-6 flex flex-col items-center justify-center h-[140px] shadow-sm">
                        <p className="text-4xl font-bold text-[#25A719] mb-1 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>83.8%</p>
                        <p className="text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Kehadiran</p>
                    </div>
                    {/* Izin */}
                    <div className="bg-[#FFFED9] rounded-[20px] p-6 flex flex-col items-center justify-center h-[140px] shadow-sm">
                        <p className="text-4xl font-bold text-[#B8B831] mb-1 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>8</p>
                        <p className="text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Izin</p>
                    </div>
                    {/* Sakit */}
                    <div className="bg-[#E8F3FF] rounded-[20px] p-6 flex flex-col items-center justify-center h-[140px] shadow-sm">
                        <p className="text-4xl font-bold text-[#2F9ACF] mb-1 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>8</p>
                        <p className="text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Sakit</p>
                    </div>
                    {/* Alpha */}
                    <div className="bg-[#FFE0E0] rounded-[20px] p-6 flex flex-col items-center justify-center h-[140px] shadow-sm">
                        <p className="text-4xl font-bold text-[#E04F4F] mb-1 leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>0</p>
                        <p className="text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Alpha</p>
                    </div>
                </div>

                {/* Unduh Button Full Width */}
                <button
                    className="w-full bg-[#2BCF3E] text-white py-4 rounded-[15px] text-2xl font-medium shadow-md hover:bg-green-600 transition-colors flex items-center justify-center relative"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                    Unduh laporan
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 transform rotate-90">
                        <span className="text-2xl font-black">v</span>
                    </div>
                </button>
            </section>

            {/* Card 2: Filters */}
            <section
                className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl"
                style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.15)' }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Tanggal Awal */}
                    <div>
                        <label className="block text-sm font-bold mb-2 ml-1 text-black">Tanggal Awal</label>
                        <div
                            className="relative rounded-[15px] h-[50px] flex items-center px-4 overflow-hidden bg-white"
                            style={{ border: '1px solid #777' }}
                        >
                            <span className="text-lg text-gray-400 flex-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{dateStart}</span>
                            <Calendar size={20} className="text-black" />
                        </div>
                    </div>
                    {/* Tanggal Akhir */}
                    <div>
                        <label className="block text-sm font-bold mb-2 ml-1 text-black">Tanggal Akhir</label>
                        <div
                            className="relative rounded-[15px] h-[50px] flex items-center px-4 overflow-hidden bg-white"
                            style={{ border: '1px solid #777' }}
                        >
                            <span className="text-lg text-gray-400 flex-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{dateEnd}</span>
                            <Calendar size={20} className="text-black" />
                        </div>
                    </div>
                    {/* Jurusan */}
                    <div>
                        <label className="block text-sm font-bold mb-2 ml-1 text-black">Jurusan</label>
                        <div
                            className="relative rounded-[15px] h-[50px] flex items-center px-4 overflow-hidden bg-white"
                            style={{ border: '1px solid #777' }}
                        >
                            <span className="text-lg text-gray-400 flex-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{jurusan}</span>
                            <ChevronDown size={20} className="text-gray-400" />
                        </div>
                    </div>
                    {/* Kelas */}
                    <div>
                        <label className="block text-sm font-bold mb-2 ml-1 text-black">Kelas</label>
                        <div
                            className="relative rounded-[15px] h-[50px] flex items-center px-4 overflow-hidden bg-white"
                            style={{ border: '1px solid #777' }}
                        >
                            <span className="text-lg text-gray-400 flex-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{kelas}</span>
                            <ChevronDown size={20} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Card 3: Data Absensi Table */}
            <section
                className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl min-h-[400px]"
                style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.15)' }}
            >
                <h2 className="text-2xl font-medium mb-6 text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Data Absensi</h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="h-[60px]" style={{ background: 'rgba(133, 250, 168, 0.25)' }}>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>No</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Tanggal</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>NIS</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Nama</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Kelas</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Sholat</th>
                                <th className="px-6 text-left text-lg font-medium text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ATTENDANCE_DATA.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 h-[50px]">
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{index + 1}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.tanggal}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.nis}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.nama}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.kelas}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.sholat}</td>
                                    <td className="px-6 text-lg font-normal text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    );
}
