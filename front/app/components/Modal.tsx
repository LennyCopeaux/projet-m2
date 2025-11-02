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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-white max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col border border-black/10 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex justify-between items-center">
          {title && (
            <h2 className="text-lg font-normal text-black">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-black/60 hover:text-black w-8 h-8 flex items-center justify-center text-2xl leading-none"
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

