"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock3,
  FileImage,
  HardHat,
  PackageX,
  Send
} from "lucide-react";
import { statusChipClass } from "../../lib/designSystem";
import { useDemoRoleGuard } from "../../lib/demoAuth";
import { demoProjectUpdates, updateAreas, updateStages } from "../../lib/projectUpdates";
import DemoLogoutButton from "../../components/DemoLogoutButton";

const assignedProject = "Villa Renovasyon Süreci";
const workerName = "Mehmet Usta";

const areas = [...updateAreas, "Diğer"];

const quickActions = [
  { status: "İş Tamamlandı", icon: CheckCircle2 },
  { status: "Sorun Var", icon: AlertTriangle },
  { status: "Malzeme Eksik", icon: PackageX }
];

const demoPhotos = [
  { name: "Mutfak geniş açı", tag: "Geniş açı" },
  { name: "Elektrik kontrolü", tag: "Kontrol" },
  { name: "Malzeme teslimi", tag: "Teslimat" }
];

export default function FieldPanel() {
  const canView = useDemoRoleGuard("field");
  const [area, setArea] = useState("Mutfak");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Normal");
  const [stage, setStage] = useState("Süreç");
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [recentUpdates, setRecentUpdates] = useState(demoProjectUpdates);

  const currentTime = useMemo(() => {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }, []);

  const selectedTags = [...new Set(photos.map((photo) => photo.tag))];

  function addDemoPhotos() {
    setPhotos((current) => {
      const nextPhoto = demoPhotos[current.length % demoPhotos.length];
      return [...current, { ...nextPhoto, id: `${nextPhoto.name}-${current.length + 1}` }];
    });
    setSubmitted(false);
  }

  function submitUpdate(event) {
    event.preventDefault();
    setRecentUpdates((current) => [
      {
        id: `field-${Date.now()}`,
        date: "Bugün",
        time: currentTime,
        area,
        note: note.trim() || "Saha güncellemesi eklendi.",
        photoCount: photos.length,
        status: "Admin Onayında",
        stage
      },
      ...current
    ]);
    setSubmitted(true);
    setNote("");
    setPhotos([]);
    setStatus("Normal");
    setStage("Süreç");
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
                Saha Güncellemesi
              </h1>
              <p className="mt-2 truncate text-sm font-medium text-gold sm:text-base">
                {assignedProject}
              </p>
            </div>
            <DemoLogoutButton dark />
          </div>
        </header>

        <section className="grid gap-2 sm:grid-cols-3" aria-label="Bugünün hızlı işlemleri">
          {quickActions.map(({ status: actionStatus, icon: Icon }) => {
            const selected = status === actionStatus;

            return (
              <button
                key={actionStatus}
                type="button"
                onClick={() => {
                  setStatus(actionStatus);
                  setSubmitted(false);
                }}
                className={`flex min-h-20 items-center gap-3 rounded-2xl border px-4 py-4 text-left text-base font-semibold sm:min-h-24 sm:flex-col sm:items-start sm:justify-center ${
                  selected
                    ? "border-gold bg-stoneDark text-white shadow-premium"
                    : "border-border bg-surface text-stoneDark"
                }`}
              >
                <Icon className={selected ? "text-gold" : "text-muted"} size={26} />
                <span>{actionStatus}</span>
              </button>
            );
          })}
        </section>

        <form
          onSubmit={submitUpdate}
          className="grid gap-4 rounded-2xl border border-border bg-surface p-4 shadow-premium sm:p-5"
        >
          <div className="grid grid-cols-1 gap-2 text-center min-[420px]:grid-cols-3">
            {["Fotoğraf Seç / Çek", "Kısa Not Yaz", "Güncellemeyi Gönder"].map((step, index) => (
              <div key={step} className="rounded-2xl bg-cream px-2 py-3">
                <p className="text-xs font-semibold text-muted">{index + 1}</p>
                <p className="mt-1 text-xs font-semibold leading-4 sm:text-sm">{step}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-cream p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Proje</p>
            <p className="mt-1 text-lg font-semibold">{assignedProject}</p>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-muted">Alan</span>
            <select
              value={area}
              onChange={(event) => {
                setArea(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-14 rounded-2xl border border-border bg-cream px-4 py-3 text-base font-medium outline-none"
            >
              {areas.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-2">
            <span className="text-sm font-semibold text-muted">Aşama</span>
            <div className="flex flex-wrap gap-2">
              {updateStages.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setStage(item);
                    setSubmitted(false);
                  }}
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold ${
                    stage === item ? "bg-stoneDark text-white" : "bg-cream text-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={addDemoPhotos}
            className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-stoneDark px-5 py-4 text-lg font-semibold text-white"
          >
            <Camera size={24} />
            Fotoğraf Seç / Çek
          </button>

          <div className="grid gap-3 rounded-2xl border border-border bg-cream p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={statusChipClass(status)}>{status}</span>
              <span className={statusChipClass(stage)}>{stage}</span>
              <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                {photos.length} fotoğraf
              </span>
              {selectedTags.map((tag) => (
                <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
                  {tag}
                </span>
              ))}
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
              Net, geniş açı ve iyi ışıklı fotoğraflar müşteri takibini güçlendirir.
            </p>
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-muted">Kısa not</span>
            <textarea
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-28 rounded-2xl border border-border bg-cream px-4 py-4 text-base outline-none placeholder:text-black/35"
              placeholder="Örn. Mutfak sökümü tamamlandı."
            />
          </label>

          <button className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-5 py-4 text-lg font-semibold text-stoneDark">
            <Send size={22} />
            Güncellemeyi Gönder
          </button>

          {submitted && (
            <div className="rounded-2xl border border-[#2D5A38]/15 bg-[#E6F0E7] p-4">
              <p className="font-semibold text-[#2D5A38]">Güncelleme gönderildi.</p>
              <p className="mt-1 text-sm leading-6 text-[#2D5A38]/75">
                Admin kontrolünden sonra müşteri panelinde yayınlanacaktır.
              </p>
            </div>
          )}
        </form>

        <section className="rounded-2xl border border-border bg-surface p-4 shadow-premium sm:p-5">
          <h2 className="text-xl font-semibold">Son güncellemeler</h2>
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
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={statusChipClass(update.stage)}>{update.stage}</span>
                    <span className={statusChipClass(update.status)}>{update.status}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
