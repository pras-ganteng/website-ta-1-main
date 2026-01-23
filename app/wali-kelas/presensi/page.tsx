'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const PRESENSI_DATA = [
    { id: 1, nis: '2025RPL001', nama: 'Siswa RPL 1', kelas: '10 RPL 2', status: 'Hadir' },
    { id: 2, nis: '2025RPL002', nama: 'Siswa RPL 2', kelas: '10 RPL 2', status: 'Izin' },
    { id: 3, nis: '2025RPL003', nama: 'Siswa RPL 3', kelas: '10 RPL 2', status: 'Hadir' },
    { id: 4, nis: '2025RPL004', nama: 'Siswa RPL 4', kelas: '10 RPL 2', status: 'Hadir' },
    { id: 5, nis: '2025RPL005', nama: 'Siswa RPL 5', kelas: '10 RPL 2', status: 'Hadir' },
    { id: 6, nis: '2025RPL006', nama: 'Siswa RPL 6', kelas: '10 RPL 2', status: 'Izin' },
    { id: 7, nis: '2025RPL007', nama: 'Siswa RPL 7', kelas: '10 RPL 2', status: 'Sakit' },
    { id: 8, nis: '2025RPL008', nama: 'Siswa RPL 8', kelas: '10 RPL 2', status: 'Sakit' },
];

export default function PresensiPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterJurusan] = useState('Semua Jurusan');
    const [filterKelas] = useState('Semua Kelas');

    return (
        <main className="px-4 md:px-8 py-8 space-y-6 relative font-sans max-w-[1400px] mx-auto">
            <div className="flex items-center mb-4">
                <h1 className="text-4xl font-bold text-black font-roboto">Lihat Presensi</h1>
            </div>

            <section
                className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl min-h-[600px]"
                style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.15)' }}
            >
                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-6 mb-10">
                    {/* Search Input */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[500px]">
                        <div
                            className="flex items-center w-full h-[50px] px-4 rounded-lg bg-white overflow-hidden"
                            style={{ border: '1px solid #AAA' }}
                        >
                            <Search size={20} className="text-gray-400 mr-3 opacity-50" />
                            <input
                                type="text"
                                placeholder="Cari siswa / NIS"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full outline-none text-lg text-black font-sans placeholder-gray-300"
                            />
                        </div>
                    </div>

                    {/* Filter Jurusan */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[300px]">
                        <div
                            className="flex items-center justify-between w-full h-[50px] px-4 rounded-lg bg-white cursor-pointer"
                            style={{ border: '1px solid #AAA' }}
                        >
                            <span className="text-lg text-gray-400 font-sans">{filterJurusan}</span>
                            <ChevronDown size={20} className="text-gray-400 opacity-50" />
                        </div>
                    </div>

                    {/* Filter Kelas */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[300px]">
                        <div
                            className="flex items-center justify-between w-full h-[50px] px-4 rounded-lg bg-white cursor-pointer"
                            style={{ border: '1px solid #AAA' }}
                        >
                            <span className="text-lg text-gray-400 font-sans">{filterKelas}</span>
                            <ChevronDown size={20} className="text-gray-400 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr className="h-[60px]" style={{ background: 'rgba(113, 192, 213, 0.22)' }}>
                                <th className="px-6 text-center text-lg font-bold text-black font-roboto">No</th>
                                <th className="px-6 text-left text-lg font-bold text-black font-roboto">NIS</th>
                                <th className="px-6 text-left text-lg font-bold text-black font-roboto">Nama</th>
                                <th className="px-6 text-left text-lg font-bold text-black font-roboto">Kelas</th>
                                <th className="px-6 text-center text-lg font-bold text-black font-roboto">Status</th>
                                <th className="px-6 text-center text-lg font-bold text-black font-roboto">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRESENSI_DATA.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 h-[70px]">
                                    <td className="px-6 text-center text-lg font-medium text-black font-sans">{index + 1}</td>
                                    <td className="px-6 text-left text-lg font-medium text-black font-sans">{item.nis}</td>
                                    <td className="px-6 text-left text-lg font-medium text-black font-sans">{item.nama}</td>
                                    <td className="px-6 text-left text-lg font-medium text-black font-sans">{item.kelas}</td>
                                    <td className="px-6 text-center">
                                        <span
                                            className={`inline-block px-6 py-1 rounded-full text-black text-base font-bold min-w-[100px] ${item.status === 'Hadir' ? 'bg-[#98FB98]' :
                                                    item.status === 'Izin' ? 'bg-[#FCF55F]' : 'bg-[#87CEEB]'
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="px-6 py-1 rounded-full bg-[#55962A] text-white text-sm font-bold shadow hover:bg-green-700 transition-colors">
                                                Detail
                                            </button>
                                            <button className="px-6 py-1 rounded-full bg-[#4169E1] text-white text-sm font-bold shadow hover:bg-blue-700 transition-colors flex items-center gap-1">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
