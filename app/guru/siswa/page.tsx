'use client';

import { useState } from 'react';
import { Search, ChevronDown, Pencil, Trash2, Plus } from 'lucide-react';

const STUDENT_DATA = [
    { id: 1, nis: '2025RPL001', nama: 'Siswa RPL 1', kelas: '10 RPL 2' },
    { id: 2, nis: '2025RPL002', nama: 'Siswa RPL 2', kelas: '10 RPL 2' },
    { id: 3, nis: '2025RPL003', nama: 'Siswa RPL 3', kelas: '10 RPL 2' },
    { id: 4, nis: '2025RPL004', nama: 'Siswa RPL 4', kelas: '10 RPL 2' },
    { id: 5, nis: '2025RPL005', nama: 'Siswa RPL 5', kelas: '10 RPL 2' },
    { id: 6, nis: '2025RPL006', nama: 'Siswa RPL 6', kelas: '10 RPL 2' },
    { id: 7, nis: '2025RPL007', nama: 'Siswa RPL 7', kelas: '10 RPL 2' },
    { id: 8, nis: '2025RPL008', nama: 'Siswa RPL 8', kelas: '10 RPL 2' },
    { id: 9, nis: '2025RPL009', nama: 'Siswa RPL 9', kelas: '10 RPL 2' },
];

export default function DataSiswaPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterJurusan] = useState('Semua Jurusan');
    const [filterKelas] = useState('Semua Kelas');

    const filteredData = STUDENT_DATA.filter((s) =>
        s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nis.includes(searchTerm)
    );

    return (
        <main className="px-4 md:px-8 py-6 space-y-6 relative font-sans max-w-[1400px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
                <h1
                    className="text-3xl md:text-4xl font-bold text-black leading-tight"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                    Data Siswa
                </h1>

                <button
                    className="group flex items-center gap-2 bg-[#107AE4] text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all active:scale-95 shadow-lg"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    <Plus size={24} strokeWidth={3} />
                    <span className="text-lg font-medium">Tambah Siswa</span>
                </button>
            </div>

            {/* Main Card */}
            <section
                className="bg-white rounded-[20px] p-6 shadow-xl min-h-[500px]"
                style={{ boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.15)' }}
            >
                {/* Filter Row */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[320px]">
                        <div
                            className="flex items-center w-full h-[48px] px-3 rounded-lg bg-white overflow-hidden"
                            style={{ border: '1px solid #000000' }}
                        >
                            <div className="bg-white p-1 mr-2">
                                <div className="p-1" style={{ background: 'rgba(255, 255, 255, 0.43)' }}>
                                    <Search size={20} className="text-gray-400 opacity-50" />
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Cari Siswa"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-full outline-none text-base font-normal placeholder-gray-300 text-black"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>
                    </div>

                    {/* Filter Jurusan */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[280px]">
                        <div
                            className="flex items-center justify-between w-full h-[48px] px-4 rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                            style={{ border: '1px solid #000000' }}
                        >
                            <span className="text-base text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>{filterJurusan}</span>
                            <ChevronDown size={20} className="text-gray-400 opacity-50" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Filter Kelas */}
                    <div className="relative flex-grow md:flex-grow-0 md:w-[280px]">
                        <div
                            className="flex items-center justify-between w-full h-[48px] px-4 rounded-lg bg-white cursor-pointer hover:bg-gray-50"
                            style={{ border: '1px solid #000000' }}
                        >
                            <span className="text-base text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>{filterKelas}</span>
                            <ChevronDown size={20} className="text-gray-400 opacity-50" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto pb-4">
                    <table className="w-full min-w-[1000px]">
                        <thead>
                            <tr style={{ background: 'rgba(113, 192, 213, 0.22)', height: '64px' }}>
                                <th className="px-6 text-left text-lg font-semibold text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>No.</th>
                                <th className="px-6 text-left text-lg font-semibold text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>NIS</th>
                                <th className="px-6 text-left text-lg font-semibold text-black w-[30%]" style={{ fontFamily: 'Roboto, sans-serif' }}>Nama</th>
                                <th className="px-6 text-left text-lg font-semibold text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Kelas</th>
                                <th className="px-6 text-center text-lg font-semibold text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Keterangan</th>
                                <th className="px-6 text-center text-lg font-semibold text-black" style={{ fontFamily: 'Roboto, sans-serif' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((student, index) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <td className="py-4 px-6 text-base font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>{index + 1}.</td>
                                    <td className="py-4 px-6 text-base font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>{student.nis}</td>
                                    <td className="py-4 px-6 text-base font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>{student.nama}</td>
                                    <td className="py-4 px-6 text-base font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>{student.kelas}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            className="text-white px-5 py-1 rounded-full text-base font-medium shadow hover:bg-green-700 transition-colors"
                                            style={{ background: '#55962A', fontFamily: 'Roboto, sans-serif' }}
                                        >
                                            Detail
                                        </button>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-4">
                                            {/* Edit Button */}
                                            <button
                                                className="w-[36px] h-[36px] flex items-center justify-center hover:bg-blue-50 transition-colors bg-white relative rounded-[4px]"
                                                style={{ border: '3px solid #0068DF' }}
                                                aria-label="Edit"
                                            >
                                                <Pencil size={18} className="text-[#0068DF] fill-[#0068DF]" />
                                            </button>

                                            {/* Trash Button */}
                                            <button
                                                className="w-[36px] h-[36px] flex items-center justify-center bg-white hover:bg-red-50 transition-colors relative rounded-[4px]"
                                                style={{ border: '3px solid #FF0000' }}
                                                aria-label="Delete"
                                            >
                                                <Trash2 size={18} className="text-[#FF0000]" strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredData.length === 0 && (
                        <div className="p-8 text-center text-gray-400 text-base">
                            Tidak ada data siswa ditemukan
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
