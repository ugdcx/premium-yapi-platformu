"use client";

import { useMemo, useState } from "react";
import { Camera, Clock3, FileImage, HardHat, Send } from "lucide-react";
import { statusChipClass } from "../../lib/designSystem";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import { demoProjectUpdates } from "../../lib/projectUpdates";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const assignedProject = "Villa Renovasyon Süreci";
const workerName = "Mehmet Usta";

const demoPhotos = [
  { name: "Mutfak geniş açı", tag: "Saha fotoğrafı" },
  { name: "Elektrik kontrol noktası", tag: "Saha fotoğrafı" },
  { name: "Malzeme teslim alanı", tag: "Saha fotoğrafı" }
];

export default function FieldPanel() {
  const canView = useDemoRoleGuard("field");
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState(demoProjectUpdates);

  const currentTime = useMemo(
    () =>
      new Intl.DateTimeFormat("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date()),
    []
  );

  function addDemoPhotos() {
    setPhotos((current) => {
      const nextPhoto = demoPhotos[current.length % demoPhotos.length];
      return [...current, { ...nextPhoto, id: `${nextPhoto.name}-${current.length + 1}` }];
    });
    setSubmitted(false);
  }

  function submitPhotos(event) {
    event.preventDefault();
    if (!photos.length) return;

    setRecentUpdates((current) => [
      {
        id: `field-${Date.now()}`,
        date: "Bugün",
        time: currentTime,
        area: "Saha",
        note: "Fotoğraflar admin açıklaması için yüklendi.",
        photoCount: photos.length,
        status: "Admin Onayında",
        stage: "Süreç"
      },
      ...current
    ]);
    setSubmitted(true);
    setPhotos([]);
  }

  if (!canView) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-4 py-6 text-[#111111]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white p-6">
          Oturum kontrol ediliyor...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-4 text-[#111111] sm:px-6 sm:py-6">
      <div className="mx-auto grid max-w-3xl gap-4">
        <header className="rounded-[2rem] border border-black/10 bg-black p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-sm text-white/64">
                <HardHat size={16} />
                {workerName}
              </p>
              <h1 className="mt-3 text-[2.4rem] leading-tight">Fotoğraf Yükleme</h1>
              <p className="mt-2 text-sm text-white/58">{assignedProject}</p>
            </div>
            <DemoLogoutButton dark />
          </div>
        </header>

        <form
          onSubmit={submitPhotos}
          className="grid gap-4 rounded-[2rem] border border-black/10 bg-white p-5 sm:p-6"
        >
          <div className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-black/42">
              Özel saha bağlantısı
            </p>
            <p className="mt-2 text-sm leading-6 text-black/58">
              Usta yalnızca fotoğraf yükler. Açıklama ve müşteri yayını admin onayından sonra yapılır.
            </p>
          </div>

          <button
            type="button"
            onClick={addDemoPhotos}
            className="flex min-h-20 items-center justify-center gap-3 rounded-[1.25rem] bg-black px-5 py-4 text-lg text-white"
          >
            <Camera size={22} />
            Fotoğraf Seç / Çek
          </button>

          <div className="grid gap-3 rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/54">
                {photos.length} fotoğraf
              </span>
              <span className={statusChipClass("Admin Onayında")}>
                Admin incelemesi bekliyor
              </span>
            </div>

            {photos.length ? (
              <div className="grid gap-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex items-center justify-between rounded-[1rem] border border-black/10 bg-white px-3 py-3 text-sm"
                  >
                    <span>{photo.name}</span>
                    <span className="text-black/48">{photo.tag}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <p className="text-sm leading-6 text-black/58">
              Net, geniş açı ve iyi ışıklı fotoğraflar açıklama akışını hızlandırır.
            </p>
          </div>

          <button
            disabled={!photos.length}
            className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={18} />
            Fotoğrafları Gönder
          </button>

          {submitted ? (
            <div className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4">
              <p className="font-medium text-black">Fotoğraflar gönderildi.</p>
              <p className="mt-1 text-sm leading-6 text-black/58">
                Kayıtlar admin incelemesinden sonra proje akışına eklenecektir.
              </p>
            </div>
          ) : null}
        </form>

        <section className="rounded-[2rem] border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="text-2xl">Son yüklemeler</h2>
          <div className="mt-4 grid gap-3">
            {recentUpdates.slice(0, 4).map((update, index) => (
              <article
                key={`${update.id}-${index}`}
                className="rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-black/38">
                      <Clock3 size={14} />
                      {update.date} · {update.time} · {update.area}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-black/64">{update.note}</p>
                    <p className="mt-2 flex items-center gap-2 text-xs text-black/44">
                      <FileImage size={14} />
                      {update.photoCount} fotoğraf
                    </p>
                  </div>
                  <span className={statusChipClass(update.status)}>{update.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
