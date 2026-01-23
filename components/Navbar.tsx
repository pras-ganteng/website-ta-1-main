'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menus = [
  { label: 'BERANDA', href: '/admin' },
  { label: 'JADWAL', href: '/admin/jadwal' },
  { label: 'DATA SISWA', href: '/admin/siswa' },
  { label: 'LIHAT PRESENSI', href: '/admin/presensi' },
  { label: 'LAPORAN', href: '/admin/laporan' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Refs for desktop navbar
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  // Calculate indicator position
  const updateIndicator = useCallback(() => {
    const activeIndex = menus.findIndex(menu => menu.href === pathname);
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const activeLink = linkRefs.current[activeIndex];
      if (activeLink && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        setIndicator({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    }
  }, [pathname]);

  // Update on mount and pathname change
  useEffect(() => {
    updateIndicator();
    // Also update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Update after fonts load
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(updateIndicator);
    }
  }, [updateIndicator]);

  return (
    <>
      {/* ========== MOBILE: Hamburger + Sidebar ========== */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-white p-2 rounded-xl hover:bg-white/20 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-[100] animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-[280px] z-[101] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ background: 'linear-gradient(180deg, #398ED6 0%, #6BB3E8 50%, #FFFFFF 100%)' }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6 border-b border-white/20">
            <h2 className="text-white text-xl font-bold">MENU</h2>
          </div>

          <nav className="p-4 space-y-2">
            {menus.map((menu) => {
              const active = pathname === menu.href;
              return (
                <Link
                  key={menu.label}
                  href={menu.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-white font-medium transition-all duration-300 ${active ? 'bg-white/30 shadow-lg' : 'hover:bg-white/10'}`}
                >
                  <span className="text-lg">{menu.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-200 bg-white/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">A</div>
              <div className="text-gray-800 flex-1">
                <p className="font-bold">ADMIN</p>
                <p className="text-sm text-gray-600">Administrasi</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP: Horizontal Navbar with Sliding Indicator ========== */}
      <nav ref={navRef} className="hidden lg:flex gap-10 xl:gap-14 relative">
        {/* Sliding Indicator Line */}
        <span
          className="absolute -bottom-2 h-[4px] bg-white rounded-full transition-all duration-500 ease-out"
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.width > 0 ? 1 : 0,
          }}
        />

        {menus.map((menu, index) => (
          <Link
            key={menu.label}
            ref={(el) => { linkRefs.current[index] = el; }}
            href={menu.href}
            className="relative text-white text-xl xl:text-2xl font-semibold transition-all duration-300 hover:scale-110"
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
