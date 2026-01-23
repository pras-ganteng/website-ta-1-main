'use client';

import { useState } from 'react';

/* ===================== DATA JADWAL ===================== */
const initialJadwalHarian = [
    { hari: 'Senin', jurusan1: 'Rekayasa Perangkat Lunak (RPL)', jurusan2: 'Teknik Elektronika Industri (TEI)' },
    { hari: 'Selasa', jurusan1: 'Mekatronika (MT)', jurusan2: 'Teknik Komputer dan Jaringan (TKJ)' },
    { hari: 'Rabu', jurusan1: 'Desain Komunikasi Visual (DKV)', jurusan2: 'Animasi (ANIM)' },
    { hari: 'Kamis', jurusan1: 'Broadcasting (BC)', jurusan2: '-' },
    { hari: 'Jumat', jurusan1: 'Audio Video (AV)', jurusan2: '-' },
];

const daftarJurusan = [
    'Rekayasa Perangkat Lunak (RPL)',
    'Teknik Elektronika Industri (TEI)',
    'Teknik Komputer dan Jaringan (TKJ)',
    'Mekatronika (MT)',
    'Desain Komunikasi Visual (DKV)',
    'Animasi (ANIM)',
    'Audio Video (AV)',
    'Broadcasting (BC)',
];

const initialJadwalSholat = [
    { nama: 'Dhuha', waktu: '07.00 - 07.15 WIB', jurusan: 'Semua Jurusan', kelas: '10, 11', icon: '☀️', bgColor: 'rgba(255, 149, 0, 0.61)' },
    { nama: 'Zuhur', waktu: '11.40 - 12.40 WIB', jurusan: 'Semua Jurusan', kelas: '10, 11', icon: '🕌', bgColor: 'rgba(0, 242, 112, 0.61)' },
    { nama: 'Jumat', waktu: '11.40 - 12.40 WIB', jurusan: 'Semua Jurusan', kelas: '10, 11', icon: '🕌', bgColor: 'rgba(187, 131, 228, 0.61)' },
];

export default function JadwalPage() {
    const [jadwalHarian, setJadwalHarian] = useState(initialJadwalHarian);
    const [jadwalSholat, setJadwalSholat] = useState(initialJadwalSholat);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditDhuhaTimeModalOpen, setIsEditDhuhaTimeModalOpen] = useState(false);
    const [dhuhaTime, setDhuhaTime] = useState('07.00 - 07.15 WIB');
    const [isPilihJurusanOpen, setIsPilihJurusanOpen] = useState(false);
    const [isSelectJurusanOpen, setIsSelectJurusanOpen] = useState(false);
    const [selectedHari, setSelectedHari] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<'jurusan1' | 'jurusan2' | null>(null);

    const handleOpenPilihJurusan = (hari: string) => {
        setSelectedHari(hari);
        setIsPilihJurusanOpen(true);
    };

    const handleSelectSlot = (slot: 'jurusan1' | 'jurusan2') => {
        setSelectedSlot(slot);
        setIsPilihJurusanOpen(false);
        setIsSelectJurusanOpen(true);
    };

    const handleSelectJurusan = (jurusan: string) => {
        if (selectedHari && selectedSlot) {
            const currentData = jadwalHarian.find(d => d.hari === selectedHari);
            if (selectedSlot === 'jurusan1' && currentData?.jurusan2 === jurusan && jurusan !== '-') {
                alert('Jurusan tidak boleh sama dengan Jurusan 2!');
                return;
            }
            if (selectedSlot === 'jurusan2' && currentData?.jurusan1 === jurusan && jurusan !== '-') {
                alert('Jurusan tidak boleh sama dengan Jurusan 1!');
                return;
            }
            setJadwalHarian(prev => prev.map(item =>
                item.hari === selectedHari ? { ...item, [selectedSlot]: jurusan } : item
            ));
        }
        setIsSelectJurusanOpen(false);
    };

    const handleSaveDhuhaTime = () => {
        setJadwalSholat(prev => prev.map(sholat =>
            sholat.nama === 'Dhuha' ? { ...sholat, waktu: dhuhaTime } : sholat
        ));
        setIsEditDhuhaTimeModalOpen(false);
    };

    const handleSave = () => {
        console.log('Saved:', jadwalHarian);
        setIsEditModalOpen(false);
    };

    const handleCancel = () => {
        setJadwalHarian(initialJadwalHarian);
        setIsEditModalOpen(false);
    };

    return (
        <>
            <main className="px-3 md:px-8 lg:px-16 py-4 md:py-14 space-y-4 md:space-y-10">
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-2xl md:text-4xl">📅</span>
                    <h1 className="text-2xl md:text-5xl font-semibold text-black">Jadwal Sholat</h1>
                </div>

                {/* TABLE JADWAL */}
                <section
                    className="bg-white rounded-xl md:rounded-3xl p-3 md:p-8 relative transition-all duration-300 hover:shadow-2xl"
                    style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                >
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="absolute top-3 right-3 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-lg"
                        title="Edit Jadwal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                        <span className="text-xl md:text-3xl">📅</span>
                        <h2 className="text-lg md:text-3xl font-semibold text-black">Jadwal Sholat Dhuha</h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl">
                        <div
                            className="grid grid-cols-3 py-2 md:py-4 px-2 md:px-6 min-w-[500px]"
                            style={{ background: 'rgba(185, 236, 255, 0.22)' }}
                        >
                            <p className="text-sm md:text-2xl font-black text-black">Hari</p>
                            <p className="text-sm md:text-2xl font-black text-black">Jurusan 1</p>
                            <p className="text-sm md:text-2xl font-black text-black">Jurusan 2</p>
                        </div>

                        {jadwalHarian.map((row, idx) => (
                            <div
                                key={row.hari}
                                className={`grid grid-cols-3 py-2 md:py-4 px-2 md:px-6 border-t transition-all duration-300 hover:bg-blue-50 min-w-[500px]`}
                                style={{
                                    borderTopWidth: idx === 0 ? '2px' : '1px',
                                    borderTopColor: idx === 0 ? '#398ED6' : '#000000',
                                }}
                            >
                                <p className="text-xs md:text-xl text-black">{row.hari}</p>
                                <p className="text-xs md:text-xl text-black">{row.jurusan1}</p>
                                <p className="text-xs md:text-xl text-black">{row.jurusan2}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* JADWAL SHOLAT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                    {jadwalSholat
                        .filter(sholat => {
                            const today = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Friday = 5, Saturday = 6
                            if (sholat.nama === 'Jumat') {
                                return today === 5; // Only show on Friday
                            }
                            if (sholat.nama === 'Zuhur') {
                                return today !== 5; // Hide on Friday
                            }
                            return true; // Show other sholat times
                        })
                        .map((sholat) => (
                            <div
                                key={sholat.nama}
                                className="relative bg-white rounded-xl md:rounded-3xl p-4 md:p-8 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
                                style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                            >
                                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                                    <div
                                        className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-3xl"
                                        style={{ background: sholat.bgColor }}
                                    >
                                        {sholat.icon}
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-bold text-black">{sholat.nama}</h3>
                                </div>

                                <div className="space-y-2 md:space-y-4">
                                    <div className="flex">
                                        <p className="text-sm md:text-xl text-black w-20 md:w-32">Waktu</p>
                                        <p className="text-sm md:text-xl text-black">: {sholat.waktu}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-sm md:text-xl text-black w-20 md:w-32">Jurusan</p>
                                        <p className="text-sm md:text-xl text-black">: {sholat.jurusan}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-sm md:text-xl text-black w-20 md:w-32">Kelas</p>
                                        <p className="text-sm md:text-xl text-black">: {sholat.kelas}</p>
                                    </div>
                                </div>
                                {sholat.nama === 'Dhuha' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDhuhaTime(sholat.waktu);
                                            setIsEditDhuhaTimeModalOpen(true);
                                        }}
                                        className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm rounded-full p-2 hover:bg-white/80 transition-all"
                                        title="Edit Waktu Dhuha"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            </main>

            {/* ================= EDIT DHUHA TIME MODAL ================= */}
            {isEditDhuhaTimeModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-[80] animate-[fadeIn_0.3s_ease-out]"
                    onClick={() => setIsEditDhuhaTimeModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-[30px] p-8 w-[90%] max-w-[1249px] relative animate-[scaleIn_0.3s_ease-out]"
                        style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsEditDhuhaTimeModalOpen(false)}
                            className="absolute top-4 right-6 text-6xl font-semibold text-black hover:text-red-500 transition-colors"
                        >
                            &times;
                        </button>

                        <h2 className="text-5xl font-semibold text-black mb-12">
                            Edit Jadwal Sholat Dhuha
                        </h2>

                        <div className="space-y-4">
                            <label className="text-4xl font-semibold text-black">Waktu</label>
                            <input
                                type="text"
                                value={dhuhaTime}
                                onChange={(e) => setDhuhaTime(e.target.value)}
                                placeholder="Masukkan jam"
                                className="w-full bg-[#F5F5F5] rounded-[30px] px-8 py-6 text-3xl text-black shadow-[0px_4px_30px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end gap-6 mt-16">
                            <button
                                onClick={() => setIsEditDhuhaTimeModalOpen(false)}
                                className="bg-[#F5F5F5] rounded-[30px] px-12 py-3 text-4xl font-semibold text-black transition-all duration-300 hover:bg-gray-200 shadow-[0px_4px_30px_rgba(0,0,0,0.25)]"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSaveDhuhaTime}
                                className="bg-[#F5F5F5] rounded-[30px] px-12 py-3 text-4xl font-semibold text-black transition-all duration-300 hover:bg-gray-200 shadow-[0px_4px_30px_rgba(0,0,0,0.25)]"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= EDIT MODAL ================= */}
            {isEditModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out]"
                    onClick={handleCancel}
                >
                    <div
                        className="bg-white rounded-3xl p-8 w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto relative animate-[scaleIn_0.3s_ease-out]"
                        style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCancel}
                            className="absolute top-4 right-6 text-4xl font-bold text-black hover:text-red-500 transition-colors"
                        >
                            X
                        </button>

                        <h2 className="text-3xl font-semibold text-black mb-6">
                            Edit Jadwal Sholat Dhuha
                        </h2>

                        <div className="space-y-4">
                            {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map((hari) => (
                                <div key={hari}>
                                    <p className="text-xl font-semibold text-black mb-2">{hari}</p>
                                    <button
                                        onClick={() => handleOpenPilihJurusan(hari)}
                                        className="w-full bg-gray-100 rounded-xl px-5 py-3 flex items-center justify-between transition-all duration-300 hover:bg-gray-200 hover:shadow-md"
                                    >
                                        <span className="text-lg text-gray-600">Pilih jurusan</span>
                                        <span className="text-gray-400">▼</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-200 rounded-xl px-6 py-2 text-lg font-semibold text-black transition-all duration-300 hover:bg-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-gray-200 rounded-xl px-6 py-2 text-lg font-semibold text-black transition-all duration-300 hover:bg-gray-300"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )
            }

            {/* ================= PILIH JURUSAN MODAL (2 tombol biru) ================= */}
            {
                isPilihJurusanOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] animate-[fadeIn_0.2s_ease-out]"
                        onClick={() => setIsPilihJurusanOpen(false)}
                    >
                        <div
                            className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] animate-[scaleIn_0.2s_ease-out]"
                            style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-semibold text-black mb-4">
                                Pilih Jurusan
                            </h3>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleSelectSlot('jurusan1')}
                                    className="flex-1 bg-blue-100 rounded-2xl px-4 py-3 text-lg text-blue-600 font-medium transition-all duration-300 hover:bg-blue-200 hover:scale-105"
                                >
                                    pilih jurusan 1
                                </button>
                                <button
                                    onClick={() => handleSelectSlot('jurusan2')}
                                    className="flex-1 bg-blue-100 rounded-2xl px-4 py-3 text-lg text-blue-600 font-medium transition-all duration-300 hover:bg-blue-200 hover:scale-105"
                                >
                                    pilih jurusan 2
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* ================= SELECT JURUSAN MODAL (combobox) ================= */}
            {
                isSelectJurusanOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-[70] animate-[fadeIn_0.2s_ease-out]"
                        onClick={() => setIsSelectJurusanOpen(false)}
                    >
                        <div
                            className="bg-white rounded-2xl p-6 w-[90%] max-w-[400px] animate-[scaleIn_0.2s_ease-out]"
                            style={{ boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-semibold text-black mb-4">
                                Pilih {selectedSlot === 'jurusan1' ? 'Jurusan 1' : 'Jurusan 2'} - {selectedHari}
                            </h3>

                            <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                <button
                                    onClick={() => handleSelectJurusan('-')}
                                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                                >
                                    - (Kosong)
                                </button>
                                {daftarJurusan.map((jurusan) => {
                                    const currentData = jadwalHarian.find(d => d.hari === selectedHari);
                                    const isDisabled =
                                        (selectedSlot === 'jurusan1' && currentData?.jurusan2 === jurusan) ||
                                        (selectedSlot === 'jurusan2' && currentData?.jurusan1 === jurusan);

                                    return (
                                        <button
                                            key={jurusan}
                                            onClick={() => !isDisabled && handleSelectJurusan(jurusan)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${isDisabled
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                                : 'hover:bg-blue-50 text-black'
                                                }`}
                                            disabled={isDisabled}
                                        >
                                            {jurusan}
                                            {isDisabled && <span className="text-xs text-red-400 ml-2">(sudah dipilih)</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}
