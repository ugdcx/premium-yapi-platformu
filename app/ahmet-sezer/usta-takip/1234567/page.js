"use client";

import { useState } from "react";
import { Camera, Send, Upload } from "lucide-react";

const areas = ["Mutfak", "Banyo", "Salon", "Dış Cephe", "Elektrik", "Tesisat", "Diğer"];

export default function WorkerUploadLinkPage() {
  const [area, setArea] = useState("Mutfak");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function addPhoto() {
    setPhotos((current) => [
      ...current,
      { id: `photo-${current.length + 1}`, name: `Saha fotoğrafı ${current.length + 1}` }
    ]);
    setSubmitted(false);
  }

  function submitPhotos(event) {
    event.preventDefault();
    if (!photos.length) return;
    setSubmitted(true);
    setPhotos([]);
    setNote("");
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-5 text-stoneDark">
      <div className="mx-auto max-w-xl">
        <header className="bg-stoneDark p-5 text-white">
          <p className="text-sm uppercase tracking-[0.25em] text-white/35">
            BLAAG saha bağlantısı
          </p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Villa Renovasyon Süreci
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/65">
            Bu bağlantı yalnızca fotoğraf yükleme içindir. Müşteriye görünecek
            açıklamalar BLAAG ekibi tarafından hazırlanır.
          </p>
        </header>

        <form onSubmit={submitPhotos} className="mt-5 grid gap-4 bg-surface p-4 shadow-sm shadow-black/5">
          <section className="bg-soft p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-black/35">
              Atanan alan
            </p>
            <p className="mt-2 text-lg font-semibold">{area}</p>
          </section>

          <div>
            <p className="mb-3 text-sm font-medium text-muted">Alan seçimi</p>
            <div className="grid grid-cols-2 gap-2">
              {areas.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setArea(item);
                    setSubmitted(false);
                  }}
                  className={`min-h-12 border px-3 py-2 text-sm font-medium ${
                    area === item
                      ? "border-stoneDark bg-stoneDark text-white"
                      : "border-border bg-cream text-muted"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={addPhoto}
            className="flex min-h-20 items-center justify-center gap-3 bg-stoneDark px-5 py-4 text-lg font-semibold text-white"
          >
            <Camera size={24} />
            Fotoğraf Ekle
          </button>

          {photos.length > 0 && (
            <div className="grid gap-2">
              {photos.map((photo) => (
                <div key={photo.id} className="flex items-center gap-3 bg-cream p-3 text-sm">
                  <Upload className="text-gold" size={18} />
                  <span>{photo.name}</span>
                </div>
              ))}
            </div>
          )}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-muted">Kısa not (opsiyonel)</span>
            <textarea
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                setSubmitted(false);
              }}
              className="min-h-24 border border-border bg-cream px-4 py-3 outline-none"
              placeholder="Örn. Mutfak sökümü tamamlandı."
            />
          </label>

          <button
            disabled={!photos.length}
            className="flex min-h-14 items-center justify-center gap-3 bg-gold px-5 py-4 font-semibold text-stoneDark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={20} />
            Fotoğrafları Gönder
          </button>

          {submitted && (
            <div className="bg-[#E6F0E7] p-4 text-[#2D5A38]">
              <p className="font-semibold">Fotoğraflar BLAAG ekibinin onayına gönderildi.</p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
