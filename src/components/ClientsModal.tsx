"use client";

import { useEffect } from "react";
import Image from "next/image";

const allClients = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
];

export default function ClientsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-5xl rounded-xl md:rounded-2xl shadow-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col">
        {/* HEADER - Fixed at top */}
        <div className="flex items-center justify-between p-4 md:p-8 border-b border-gray-200 bg-white shrink-0">
          <h3 className="text-lg md:text-2xl font-bold">
            Our Clients
          </h3>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full md:rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <span className="text-xl md:text-base font-bold" aria-hidden="true">✕</span>
            <span className="hidden md:inline ml-2 text-sm font-semibold">Close</span>
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto p-4 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {allClients.map((client) => (
              <div key={client} className="flex items-center justify-center p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Image
                  src={`/images/brands/${client}.jpg`}
                  alt={`${client} logo`}
                  width={150}
                  height={150}
                  className="w-full h-auto max-h-12 md:max-h-14 object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
