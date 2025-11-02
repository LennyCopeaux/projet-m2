'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#060202]/40"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col border border-[#dfc09f]/30 rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-[#dfc09f]/30 px-6 py-4 flex justify-between items-center">
          {title && (
            <h2 className="text-lg font-normal text-[#060202]">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-[#060202]/60 hover:text-[#aa3030] w-8 h-8 flex items-center justify-center text-2xl leading-none transition-colors"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-white">{children}</div>
      </div>
    </div>
  );
}

