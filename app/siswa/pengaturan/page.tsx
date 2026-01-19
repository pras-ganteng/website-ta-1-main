'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, ChevronDown, ArrowLeft, X } from 'lucide-react';
import { getSession, clearSession } from '@/lib/auth/session';

export default function PengaturanAkunPage() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    nis: '7803/1148.063',
    nama: 'Ravel',
    jenisKelamin: 'Laki - laki',
    kelas: '11 RPL 2',
    email: 'jurusann@gamil.com'
  });

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace('/');
    } else {
      setUser(session);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

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
        {/* Back Button and Page Title */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push('/siswa')} className="hover:bg-gray-300/20 rounded-full p-2 transition" aria-label="Kembali">
            <ArrowLeft size={28} className="text-black" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-black">Pengaturan Akun</h2>
            <p className="text-gray-600">kelola informasi akun anda</p>
          </div>
          <button className="ml-auto bg-[#4C6EF5] hover:bg-blue-600 text-white px-8 py-2.5 rounded-lg font-medium transition shadow-sm">
            Edit Akun
          </button>
        </div>


        {/* Profile Photo */}
         <div className="mb-8">
           <div className="relative inline-block">
             <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-transparent"></div>
              {/* Note: The image shows a placeholder, no image src provided, so gray circle. */}
             <button className="absolute bottom-1 right-2 text-blue-500 p-1 hover:text-blue-700 transition">
               <Pencil size={18} />
             </button>
           </div>
           <h2 className="text-xl font-bold text-black mt-2 ml-4 inline-block align-top">Foto Profil</h2>
         </div>

         {/* Form */}
         <div className="space-y-6 max-w-4xl">
            {/* NIS */}
            <div>
              <label className="block text-black font-bold mb-2">NIS</label>
              <div className="w-full md:w-5/12">
                <input
                    type="text"
                    value={formData.nis}
                    readOnly
                    className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border-none text-gray-800 outline-none"
                />
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-black font-bold mb-2">Nama lengkap</label>
              <input
                type="text"
                value={formData.nama}
                readOnly
                className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border-none text-gray-800 outline-none"
              />
            </div>

            {/* Row: Jenis Kelamin & Kelas/Jurusan */}
            <div className="flex flex-col md:flex-row gap-6">
               <div className="w-full md:w-5/12">
                  <label className="block text-black font-bold mb-2">Jenis Kelamin</label>
                  <div className="relative">
                    <select 
                        value={formData.jenisKelamin}
                        onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                        className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border-none text-gray-800 appearance-none cursor-pointer outline-none"
                    >
                        <option>Laki - laki</option>
                        <option>Perempuan</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
               </div>
               <div className="w-full md:w-5/12">
                  <label className="block text-black font-bold mb-2">Kelas/Jurusan</label>
                  <input
                    type="text"
                    value={formData.kelas}
                    readOnly
                    className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border-none text-gray-800 outline-none"
                  />
               </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-black font-bold mb-2">E-mail</label>
              <div className="w-full md:w-5/12">
                <input
                    type="text"
                    value={formData.email}
                    readOnly
                    className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border-none text-gray-800 outline-none"
                />
              </div>
              <button 
                onClick={() => {
                  setNewEmail(formData.email);
                  setIsEmailModalOpen(true);
                }}
                className="text-xs text-black mt-2 ml-1 hover:underline"
              >
                Mengubah Email ?
              </button>
            </div>
         </div>

         {/* Bottom Buttons */}
         <div className="flex justify-end gap-4 mt-16 pb-10">
            <button className="bg-white text-black font-bold py-3 px-8 rounded-xl shadow-md hover:bg-gray-50 transition border border-transparent">
              Simpan Perubahan
            </button>
            <button 
                onClick={() => router.back()}
                className="bg-white text-black font-bold py-3 px-12 rounded-xl shadow-md hover:bg-gray-50 transition border border-transparent"
            >
              Batal
            </button>
         </div>

      {/* Edit Email Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">Edit Email</h3>
                <button 
                  onClick={() => setIsEmailModalOpen(false)}
                  className="text-black hover:bg-gray-100 rounded-full p-1"
                >
                  <X size={24} />
                </button>
             </div>
             
             <div className="mb-8">
               <label className="block text-black font-bold mb-2">Email</label>
               <input 
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-black"
               />
             </div>

             <div className="flex justify-end gap-3">
               <button 
                  onClick={() => setIsEmailModalOpen(false)}
                  className="px-6 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-gray-200 transition"
               >
                 Batal
               </button>
               <button 
                  onClick={() => {
                    setFormData({...formData, email: newEmail});
                    setIsEmailModalOpen(false);
                  }}
                  className="px-6 py-2 rounded-full bg-gray-100 text-black font-bold hover:bg-gray-200 transition"
               >
                 Simpan
               </button>
             </div>
          </div>
        </div>
      )}
       </main>
    </div>
  );
}
