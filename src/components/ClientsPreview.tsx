"use client";

import { useState } from "react";
import ClientsModal from "./ClientsModal";
import Image from "next/image";

const featuredClients = [
  1,2,3,4,5,6,7,8
];

export default function ClientsPreview() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-20 bg-white/60 backdrop-blur-sm" id="#projects">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          We Craft Top Rated Businesses On Ecommerce
        </h2>
        <p className="text-muted-foreground mb-12">
          A few of the clients who are proud to have served
        </p>

        {/* LOGOS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center">
          {featuredClients.map((client) => (
            <Image
              key={client}
              src={`/images/brands/${client}.jpg`}
              alt={`logo`}
              width={150}
              height={150}
              className="mx-auto h-12 opacity-70 hover:opacity-100 transition"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            View All Clients
          </button>
        </div>
      </div>

      {/* MODAL */}
      <ClientsModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
