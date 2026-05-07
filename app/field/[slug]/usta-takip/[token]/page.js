"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Send,
  Trash2
} from "lucide-react";
import { projects } from "../../../../../lib/data/mockData";
import { formatDate } from "../../../../../lib/helpers/format";
import { createWorkerUpload } from "../../../../../lib/mockStorage";

const workItems = ["Zemin", "Seramik", "Boya", "Elektrik", "Tesisat", "Mutfak", "Banyo", "Dış Cephe", "Temizlik", "Diğer"];
const statusOptions = ["Devam Ediyor", "Tamamlandı", "Sorun Var", "Malzeme Bekliyor"];
const maxPhotos = 10;

export default function FieldWorkerTrackingPage({ params }) {
  const project = projects.find(
    (item) => item.slug === params.slug && item.workerToken === params.token
  );

  if (!project) return <InvalidWorkerLinkState />;

  return (
    <main className="min-h-screen bg-cream px-4 py-5 text-stoneDark">
      <div className="mx-auto max-w-xl">
        <FieldProjectHeader project={project} />
        <WorkerUploadForm project={project} />
      </div>
    </main>
  );
}

function FieldProjectHeader({ project }) {
  return (
    <header className="rounded-[1.5rem] bg-stoneDark p-5 text-white">
      <p className="text-sm uppercase tracking-[0.2em] text-white/35">
        BLAAG saha bağlantısı
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>
      <div className="mt-4 grid gap-3 text-sm text-white/70">
        <InfoLine icon={MapPin} text={project.location} />
        <InfoLine icon={CalendarDays} text={formatDate(new Date().toISOString())} />
      </div>
      <p className="mt-5 text-lg leading-7 text-white/70">
        Bu ekrandan yaptığınız işe ait fotoğraf ve notları BLAAG ekibine iletebilirsiniz.
      </p>
    </header>
  );
}

function WorkerUploadForm({ project }) {
  const [workItem, setWorkItem] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function selectPhotos(fileList) {
    const selected = Array.from(fileList || []);
    const nextErrors = {};
    const accepted = [];

    if (photos.length + selected.length > maxPhotos) {
      setErrors((current) => ({ ...current, photos: `En fazla ${maxPhotos} fotoğraf ekleyebilirsiniz.` }));
      return;
    }

    selected.forEach((file) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        nextErrors.photos = "JPG, PNG veya WEBP fotoğraf ekleyin.";
        return;
      }

      accepted.push({
        id: `${file.name}-${file.lastModified}-${file.size}`,
        name: file.name,
        url: typeof URL !== "undefined" ? URL.createObjectURL(file) : ""
      });
    });

    setPhotos((current) => [...current, ...accepted]);
    setErrors((current) => ({ ...current, photos: nextErrors.photos || "" }));
    setSubmitted(false);
  }

  function removePhoto(id) {
    setPhotos((current) => current.filter((photo) => photo.id !== id));
  }

  function submitUpload(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!workItem) nextErrors.workItem = "İş kalemi seçin.";
    if (!status) nextErrors.status = "Durum seçin.";
    if (!photos.length) nextErrors.photos = "En az bir fotoğraf ekleyin.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    createWorkerUpload({
      project: project.title,
      worker: "Saha ekibi",
      area: workItem,
      workItem,
      workStatus: status,
      note: note.trim(),
      photos,
      status: "Onay Bekliyor"
    });

    setSubmitted(true);
    setWorkItem("");
    setStatus("");
    setNote("");
    setPhotos([]);
  }

  if (submitted) return <SubmitSuccessState onNewUpload={() => setSubmitted(false)} />;

  return (
    <form onSubmit={submitUpload} className="mt-5 grid gap-5 rounded-[1.5rem] bg-surface p-4 shadow-card">
      <section>
        <h2 className="text-2xl font-semibold">1. İş Kalemi Seç</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {workItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setWorkItem(item);
                setErrors((current) => ({ ...current, workItem: "" }));
              }}
              className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-base font-semibold ${
                workItem === item
                  ? "border-stoneDark bg-stoneDark text-white"
                  : "border-border bg-cream text-stoneDark"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {errors.workItem && <ErrorText>{errors.workItem}</ErrorText>}
      </section>

      <WorkStatusSelector value={status} onChange={setStatus} error={errors.status} />
      <PhotoUploadBox photos={photos} onSelect={selectPhotos} onRemove={removePhoto} error={errors.photos} />

      <label className="grid gap-2">
        <span className="text-xl font-semibold">4. Açıklama / Not Yaz</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="min-h-28 rounded-2xl border border-border bg-cream px-4 py-3 text-lg outline-none"
          placeholder="Kısa not yazın"
        />
      </label>

      <button className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-5 py-4 text-lg font-semibold text-stoneDark">
        <Send size={22} />
        5. Gönder
      </button>
    </form>
  );
}

function WorkStatusSelector({ value, onChange, error }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">2. Durum Seç</h2>
      <div className="mt-4 grid gap-3">
        {statusOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-base font-semibold ${
              value === item
                ? "border-stoneDark bg-stoneDark text-white"
                : "border-border bg-cream text-stoneDark"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </section>
  );
}

function PhotoUploadBox({ photos, onSelect, onRemove, error }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">3. Fotoğraf Yükle</h2>
      <label className="mt-4 flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-stoneDark px-5 py-4 text-lg font-semibold text-white">
        <Camera size={26} />
        Fotoğraf Ekle
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          multiple
          onChange={(event) => onSelect(event.target.files)}
          className="sr-only"
        />
      </label>
      <p className="mt-2 text-sm text-muted">JPG, PNG, WEBP. Çoklu fotoğraf ekleyebilirsiniz.</p>
      {error && <ErrorText>{error}</ErrorText>}

      {photos.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-cream">
              {photo.url && <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />}
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="truncate text-sm text-muted">{photo.name}</p>
                <button
                  type="button"
                  onClick={() => onRemove(photo.id)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-muted"
                  aria-label={`${photo.name} fotoğrafını sil`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function SubmitSuccessState({ onNewUpload }) {
  return (
    <section className="mt-5 rounded-[1.5rem] border border-[#BFD8C3] bg-[#E6F0E7] p-5 text-[#2D5A38]">
      <CheckCircle2 size={32} />
      <h2 className="mt-4 text-2xl font-semibold">
        Fotoğraflar ve notunuz BLAAG ekibine iletildi.
      </h2>
      <button
        type="button"
        onClick={onNewUpload}
        className="mt-5 min-h-14 rounded-2xl bg-white px-5 py-3 font-semibold text-[#2D5A38]"
      >
        Yeni fotoğraf gönder
      </button>
    </section>
  );
}

function InvalidWorkerLinkState() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
        <div className="w-full rounded-[2rem] border border-border bg-surface p-6 text-center shadow-card">
          <AlertCircle className="mx-auto text-gold" size={42} />
          <h1 className="mt-6 text-3xl font-semibold">
            Geçersiz veya süresi dolmuş bağlantı
          </h1>
          <p className="mt-4 leading-7 text-muted">
            Lütfen BLAAG ekibinden size gönderilen güncel bağlantıyı kullanın.
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={17} />
      <span>{text}</span>
    </div>
  );
}

function ErrorText({ children }) {
  return <p className="mt-3 text-sm font-semibold text-red-700">{children}</p>;
}
