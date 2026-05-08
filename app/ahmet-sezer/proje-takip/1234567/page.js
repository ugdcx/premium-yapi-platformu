"use client";

import { useEffect, useState } from "react";
import { Camera, ShieldCheck } from "lucide-react";
import { getApprovedUpdates } from "../../../../lib/localStorageRecords";
import { findProjectByClientToken } from "../../../../lib/helpers/projectLookup";
import { formatDateTime } from "../../../../lib/helpers/format";
import { statusChipClass } from "../../../../lib/designSystem";

export default function PrivateProjectTrackingPage() {
  const [updates, setUpdates] = useState([]);
  const project = findProjectByClientToken("1234567");

  useEffect(() => {
    setUpdates(getApprovedUpdates());
  }, []);

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            BLAGG özel takip bağlantısı
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            {project?.title || "Proje Takibi"}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Burada yalnızca BLAGG ekibinin onayladığı gelişmeler görünür.
          </p>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <SummaryCard title="Müşteri" value="Ahmet S." />
          <SummaryCard title="Hizmet" value={project?.serviceType || "BLAGG hizmeti"} />
          <SummaryCard title="Durum" value={project?.status || "BLAGG takipte"} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-border bg-surface p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-gold" size={24} />
            <h2 className="text-3xl font-semibold">Onaylı güncellemeler</h2>
          </div>

          {!updates.length && (
            <div className="mt-6 rounded-2xl bg-soft p-5 text-muted">
              <p className="text-xl font-semibold text-stoneDark">
                Henüz yayınlanmış güncelleme yok.
              </p>
              <p className="mt-2 leading-7">
                BLAGG ekibi onaylanan gelişmeleri burada paylaşacaktır.
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-5">
            {updates.map((update) => (
              <article key={update.id} className="rounded-[1.5rem] border border-border bg-cream p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-black/35">
                      {formatDateTime(update.createdAt)} · {update.area}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      {update.customerDescription}
                    </h3>
                  </div>
                  <span className={statusChipClass("Onaylandı")}>
                    BLAGG onaylı güncelleme
                  </span>
                </div>

                {update.photos?.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {update.photos.map((photo) => (
                      <div key={photo.id || photo.name} className="overflow-hidden rounded-2xl border border-border bg-surface">
                        {photo.url ? (
                          <img src={photo.url} alt={photo.name || "Proje fotoğrafı"} className="aspect-square w-full object-cover" />
                        ) : (
                          <div className="flex aspect-square items-center justify-center bg-soft">
                            <Camera className="text-gold" size={26} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-card">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{title}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

