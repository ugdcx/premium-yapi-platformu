"use client";

import { useState } from "react";
import { Camera, CheckCircle2, Send } from "lucide-react";
import { findProjectByWorkerToken } from "../../../../lib/helpers/projectLookup";
import { createWorkerUpload } from "../../../../lib/mockStorage";

const areas = ["Mutfak", "Banyo", "Salon", "Dış Cephe", "Elektrik", "Tesisat", "Diğer"];
const project = findProjectByWorkerToken("1234567");

export default function WorkerUploadLinkPage() {
  if (typeof window !== "undefined") {
    window.location.replace("/field/akyazi-villa-renovasyonu/usta-takip/1234567");
  }

  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function selectPhotos(fileList) {
    const selected = Array.from(fileList || []);
    setSubmitted(false);

    if (selected.length > 10) {
      setErrors({ photos: "En fazla 10 fotoğraf ekleyebilirsiniz." });
      setPhotos([]);
      return;
    }

    setErrors((current) => ({ ...current, photos: "" }));
    setPhotos(
      selected.map((file, index) => ({
        id: `${file.name}-${index}`,
        name: file.name,
        url: typeof URL !== "undefined" ? URL.createObjectURL(file) : ""
      }))
    );
  }

  function submitPhotos(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!area) nextErrors.area = "Lütfen alan seçin.";
    if (!photos.length) nextErrors.photos = "Lütfen en az bir fotoğraf ekleyin.";
    if (photos.length > 10) nextErrors.photos = "En fazla 10 fotoğraf ekleyebilirsiniz.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    createWorkerUpload({
      project: project?.title || "Villa Renovasyon Süreci",
      worker: "Ahmet Sezer",
      area,
      note: note.trim(),
      photos,
      status: "Onay Bekliyor"
    });

    setSubmitted(true);
    setArea("");
    setNote("");
    setPhotos([]);
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-5 text-stoneDark">
      <div className="mx-auto max-w-xl">
        <header className="rounded-[1.5rem] bg-stoneDark p-5 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-white/35">
            BLAAG saha bağlantısı
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Fotoğraf Gönder
          </h1>
          <p className="mt-3 text-lg leading-7 text-white/70">
            1. Alan seç  2. Fotoğraf ekle  3. Gönder
          </p>
        </header>

        <form onSubmit={submitPhotos} className="mt-5 grid gap-5 rounded-[1.5rem] bg-surface p-4 shadow-card">
          {submitted && (
            <div className="rounded-2xl border border-[#BFD8C3] bg-[#E6F0E7] p-4 text-[#2D5A38]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 shrink-0" size={22} />
                <p className="font-semibold">
                  Fotoğraflar BLAAG ekibinin onayına gönderildi.
                </p>
              </div>
            </div>
          )}

          <section>
            <h2 className="text-2xl font-semibold">1. Alan seç</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {areas.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setArea(item);
                    setSubmitted(false);
                    setErrors((current) => ({ ...current, area: "" }));
                  }}
                  className={`min-h-16 rounded-2xl border px-4 py-3 text-lg font-semibold ${
                    area === item
                      ? "border-stoneDark bg-stoneDark text-white"
                      : "border-border bg-cream text-stoneDark"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            {errors.area && <ErrorText>{errors.area}</ErrorText>}
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Fotoğraf ekle</h2>
            <label className="mt-4 flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-stoneDark px-5 py-4 text-lg font-semibold text-white">
              <Camera size={26} />
              Fotoğraf Ekle
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => selectPhotos(event.target.files)}
                className="sr-only"
              />
            </label>
            <p className="mt-2 text-sm text-muted">En fazla 10 fotoğraf.</p>
            {errors.photos && <ErrorText>{errors.photos}</ErrorText>}

            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-cream">
                    {photo.url && <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />}
                    <p className="truncate px-3 py-2 text-sm text-muted">{photo.name}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <label className="grid gap-2">
            <span className="text-lg font-semibold">Kısa not</span>
            <textarea
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-24 rounded-2xl border border-border bg-cream px-4 py-3 outline-none"
              placeholder="İsteğe bağlı"
            />
          </label>

          <button className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gold px-5 py-4 text-lg font-semibold text-stoneDark">
            <Send size={22} />
            3. Gönder
          </button>
        </form>
      </div>
    </main>
  );
}

function ErrorText({ children }) {
  return <p className="mt-3 text-sm font-semibold text-red-700">{children}</p>;
}
