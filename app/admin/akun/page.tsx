'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AkunPage() {
    const [name, setName] = useState('Ravel');

    return (
        <main className="px-4 md:px-8 py-8 space-y-6 relative font-sans max-w-[1200px] mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors font-bold">
                        <ArrowLeft size={32} strokeWidth={2.5} className="text-black" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-black">Pengaturan Akun</h1>
                        <p className="text-lg text-gray-500">kelola informasi akun anda</p>
                    </div>
                </div>
                <button className="bg-[#5669FF] text-white px-8 py-2 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors">
                    Edit Akun
                </button>
            </div>

            {/* Profile Photo */}
            <div className="flex items-center gap-6 mb-8">
                <div className="w-32 h-32 rounded-full bg-gray-200"></div>
                <span className="text-2xl font-bold text-black">Foto Profile</span>
            </div>

            <hr className="border-black/20 mb-8" />

            {/* Form Section */}
            <div className="space-y-6">
                <div>
                    <label className="block text-xl font-bold text-black mb-3">Nama lengkap</label>
                    <div
                        className="bg-white rounded-[15px] shadow-sm p-4 w-full max-w-[700px]"
                        style={{ boxShadow: '0px 2px 10px rgba(0,0,0,0.05)' }}
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-full text-lg outline-none text-black bg-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-6 mt-12">
                <button className="px-8 py-3 bg-white rounded-[15px] shadow-md text-lg font-bold text-black hover:bg-gray-50 transition-colors border border-gray-100">
                    Simpan Perubahan
                </button>
                <button className="px-8 py-3 bg-white rounded-[15px] shadow-md text-lg font-bold text-black hover:bg-gray-50 transition-colors border border-gray-100">
                    Batal
                </button>
            </div>

        </main>
    );
}
