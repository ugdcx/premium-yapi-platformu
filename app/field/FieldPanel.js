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

  const currentTime = useMemo(() => {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }, []);

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
        stage: "Fotoğraf"
      },
      ...current
    ]);
    setSubmitted(true);
    setPhotos([]);
  }

  if (!canView) {
    return (
      <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6">
          Oturum kontrol ediliyor...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-4 text-stoneDark sm:px-6 sm:py-6">
      <div className="mx-auto grid max-w-3xl gap-4">
        <header className="rounded-2xl bg-stoneDark p-5 text-white shadow-premium">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-sm text-white/65">
                <HardHat size={17} />
                {workerName}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Fotoğraf Yükleme
              </h1>
              <p className="mt-2 truncate text-sm font-medium text-gold sm:text-base">
                {assignedProject}
              </p>
            </div>
            <DemoLogoutButton dark />
          </div>
        </header>

        <form
          onSubmit={submitPhotos}
          className="grid gap-4 rounded-2xl border border-border bg-surface p-4 shadow-premium sm:p-5"
        >
          <div className="rounded-2xl bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Özel saha bağlantısı</p>
            <p className="mt-2 leading-7 text-muted">
              Usta yalnızca fotoğraf yükler. Açıklama yazımı ve müşteri yayını
              BLAAG yönetim ekibi tarafından yapılır.
            </p>
          </div>

          <button
            type="button"
            onClick={addDemoPhotos}
            className="flex min-h-20 items-center justify-center gap-3 rounded-2xl bg-stoneDark px-5 py-4 text-lg font-semibold text-white"
          >
            <Camera size={24} />
            Fotoğraf Seç / Çek
          </button>

          <div className="grid gap-3 rounded-2xl border border-border bg-cream p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                {photos.length} fotoğraf
              </span>
              <span className={statusChipClass("Admin Onayında")}>Admin açıklaması bekliyor</span>
            </div>

            {photos.length > 0 && (
              <div className="grid gap-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-sm"
                  >
                    <span className="font-medium">{photo.name}</span>
                    <span className="text-muted">{photo.tag}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm leading-6 text-muted">
              Net, geniş açı ve iyi ışıklı fotoğraflar admin açıklamasının doğru
              yazılmasını sağlar.
            </p>
          </div>

          <button
            disabled={!photos.length}
            className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-5 py-4 text-lg font-semibold text-stoneDark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={22} />
            Fotoğrafları Gönder
          </button>

          {submitted && (
            <div className="rounded-2xl border border-[#2D5A38]/15 bg-[#E6F0E7] p-4">
              <p className="font-semibold text-[#2D5A38]">Fotoğraflar gönderildi.</p>
              <p className="mt-1 text-sm leading-6 text-[#2D5A38]/75">
                Admin açıklama yazımı ve onayından sonra müşteri takip alanında yayınlanacaktır.
              </p>
            </div>
          )}
        </form>

        <section className="rounded-2xl border border-border bg-surface p-4 shadow-premium sm:p-5">
          <h2 className="text-xl font-semibold">Son yüklemeler</h2>
          <div className="mt-3 grid gap-2">
            {recentUpdates.slice(0, 4).map((update, index) => (
              <article key={`${update.id}-${index}`} className="relative rounded-2xl bg-cream p-3 pl-5">
                <span className="absolute left-2 top-4 h-[calc(100%-2rem)] w-px bg-gold/45" />
                <span className="absolute left-[5px] top-4 h-2.5 w-2.5 rounded-full bg-gold" />
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs font-semibold text-muted">
                      <Clock3 size={14} />
                      {update.date} · {update.time} · {update.area}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-medium">{update.note}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-muted">
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
