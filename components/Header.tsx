'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';

export default function Header() {
    return (
        <header
            className="h-[70px] md:h-[100px] lg:h-[160px] w-full shadow-xl flex items-center px-3 md:px-6 lg:px-10"
            style={{
                background:
                    'linear-gradient(92.21deg,#398ED6 50.74%,#FFFFFF 168.73%)',
            }}
        >
            {/* Mobile: Menu Button | Desktop: Logo */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="lg:hidden">
                    <Navbar />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <Image src="/Images/logo.png" alt="Logo" width={100} height={100} className="w-[80px] h-[80px]" />
                    <div className="text-white">
                        <h1 className="text-2xl font-bold">PRESENSI SHOLAT DIGITAL</h1>
                        <p className="text-base">DHUHA, ZUHUR, JUM&apos;AT</p>
                    </div>
                </div>
            </div>

            {/* Mobile: Logo Center | Desktop: Navbar Center */}
            <div className="flex-1 flex justify-center">
                <div className="lg:hidden flex items-center gap-2">
                    <Image src="/Images/logo.png" alt="Logo" width={50} height={50} className="w-10 h-10" />
                    <div className="text-white">
                        <h1 className="text-sm font-bold">PRESENSI SHOLAT</h1>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
            </div>

            {/* Desktop: Profile */}
            <Link href="/admin/akun" className="hidden lg:flex items-center gap-4 shrink-0 hover:bg-white/10 p-2 rounded-xl transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-black">
                    A
                </div>
                <div className="text-white">
                    <p className="font-semibold">ADMIN</p>
                    <p className="text-sm opacity-80">Administrasi</p>
                </div>
            </Link>

            <div className="lg:hidden w-10 shrink-0" />
        </header>
    );
}
