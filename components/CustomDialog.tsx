import React from 'react';

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function CustomDialog({ isOpen, title, message, onClose }: CustomDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div
        className="w-full max-w-md rounded-xl p-6 md:p-8 text-white shadow-2xl"
        style={{
          background: 'linear-gradient(129.09deg, #F89D3C -4.1%, #AD2C16 188.08%)',
        }}
      >
        <h2 className="text-2xl md:text-3xl font-black text-center mb-4">{title}</h2>
        <p className="text-center text-base md:text-lg mb-6">{message}</p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-white text-black rounded-full px-6 py-2 font-bold shadow-lg hover:bg-gray-100"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}