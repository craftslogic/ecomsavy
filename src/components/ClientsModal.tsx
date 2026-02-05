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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-5xl mx-auto rounded-2xl p-8 md:p-12 max-h-[85vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            Our Clients
          </h3>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-black"
          >
            ✕ Close
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center">
          {allClients.map((client) => (
            <Image
              key={client}
              src={`/images/brands/${client}.jpg`}
              alt={`${client} logo`}
              width={150}
              height={150}
              className="mx-auto h-14 opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
