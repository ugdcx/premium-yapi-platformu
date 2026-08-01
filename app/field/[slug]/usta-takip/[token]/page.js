"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Camera,
  CheckCircle2,
  MapPin,
  Send,
  Trash2
} from "lucide-react";
import { projects } from "../../../../../lib/data/mockData";
import { formatDate } from "../../../../../lib/helpers/format";
import { createWorkerUpload } from "../../../../../lib/localStorageRecords";

const workItems = [
  "Zemin",
  "Seramik",
  "Boya",
  "Elektrik",
  "Tesisat",
  "Mutfak",
  "Banyo",
  "Dış Cephe",
  "Temizlik",
  "Diğer"
];
const statusOptions = ["Devam Ediyor", "Tamamlandı", "Sorun Var", "Malzeme Bekliyor"];
const maxPhotos = 10;

export default function FieldWorkerTrackingPage({ params }) {
  const project = projects.find(
    (item) => item.slug === params.slug && item.workerToken === params.token
  );

  if (!project) return <InvalidWorkerLinkState />;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-5 text-[#111111]">
      <div className="mx-auto max-w-xl">
        <FieldProjectHeader project={project} />
        <WorkerUploadForm project={project} token={params.token} />
      </div>
    </main>
  );
}

function FieldProjectHeader({ project }) {
  return (
    <header className="rounded-[2rem] border border-black/10 bg-black p-5 text-white">
      <p className="text-xs uppercase tracking-[0.28em] text-white/42">BLAGG Field</p>
      <h1 className="mt-4 text-[2.4rem] leading-tight">{project.title}</h1>
      <div className="mt-4 grid gap-3 text-sm text-white/68">
        <InfoLine icon={MapPin} text={project.location} />
        <InfoLine icon={CalendarDays} text={formatDate(new Date().toISOString())} />
      </div>
      <p className="mt-5 text-sm leading-7 text-white/62">
        Bu ekrandan yalnızca kendi iş kaleminize ait fotoğraf, not ve durum gönderebilirsiniz.
      </p>
    </header>
  );
}

function WorkerUploadForm({ project, token }) {
  const [workItem, setWorkItem] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.url) URL.revokeObjectURL(photo.url);
      });
    };
  }, [photos]);

  function selectPhotos(fileList) {
    const selected = Array.from(fileList || []);
    const nextErrors = {};
    const accepted = [];

    if (photos.length + selected.length > maxPhotos) {
      setErrors((current) => ({
        ...current,
        photos: `En fazla ${maxPhotos} fotoğraf ekleyebilirsiniz.`
      }));
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
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return current.filter((photo) => photo.id !== id);
    });
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
      projectSlug: project.slug,
      projectName: project.title,
      token,
      workerName: "Saha ekibi",
      workerLabel: "Saha ekibi",
      area: workItem,
      workItem,
      workStatus: status,
      note: note.trim(),
      photos: photos.map((photo) => ({
        id: photo.id,
        name: photo.name,
        url: ""
      })),
      status: "pending_review",
      approvalStatus: "pending",
      visibleToClient: false,
      visible_to_customer: false
    });

    setSubmitted(true);
    setWorkItem("");
    setStatus("");
    setNote("");
    photos.forEach((photo) => {
      if (photo.url) URL.revokeObjectURL(photo.url);
    });
    setPhotos([]);
  }

  if (submitted) return <SubmitSuccessState onNewUpload={() => setSubmitted(false)} />;

  return (
    <form
      onSubmit={submitUpload}
      className="mt-5 grid gap-5 rounded-[2rem] border border-black/10 bg-white p-5"
      noValidate
    >
      <section>
        <h2 className="text-2xl">1. İş Kalemi Seç</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {workItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setWorkItem(item);
                setErrors((current) => ({ ...current, workItem: "" }));
              }}
              className={`min-h-14 rounded-[1rem] border px-4 py-3 text-left text-base ${
                workItem === item
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-[#F7F7F5] text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {errors.workItem ? <ErrorText>{errors.workItem}</ErrorText> : null}
      </section>

      <section>
        <h2 className="text-2xl">2. Durum Seç</h2>
        <div className="mt-4 grid gap-3">
          {statusOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStatus(item)}
              className={`min-h-14 rounded-[1rem] border px-4 py-3 text-left text-base ${
                status === item
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-[#F7F7F5] text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {errors.status ? <ErrorText>{errors.status}</ErrorText> : null}
      </section>

      <section>
        <h2 className="text-2xl">3. Fotoğraf Yükle</h2>
        <label className="mt-4 flex min-h-28 cursor-pointer items-center justify-center gap-3 rounded-[1rem] bg-black px-5 py-4 text-lg text-white">
          <Camera size={24} />
          Fotoğraf Ekle
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            multiple
            onChange={(event) => selectPhotos(event.target.files)}
            className="sr-only"
          />
        </label>
        <p className="mt-2 text-sm text-black/54">
          JPG, PNG, WEBP. Çoklu fotoğraf ekleyebilirsiniz.
        </p>
        <p className="mt-1 text-sm text-black/46">
          {photos.length}/{maxPhotos} fotoğraf eklendi
        </p>
        {errors.photos ? <ErrorText>{errors.photos}</ErrorText> : null}

        {photos.length ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="overflow-hidden rounded-[1rem] border border-black/10 bg-[#F7F7F5]"
              >
                {photo.url ? (
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="aspect-square w-full object-cover"
                  />
                ) : null}
                <div className="flex items-center justify-between gap-2 p-3">
                  <p className="truncate text-sm text-black/54">{photo.name}</p>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black/54"
                    aria-label={`${photo.name} fotoğrafını sil`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <label className="grid gap-2">
        <span className="text-2xl">4. Açıklama / Not Yaz</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          className="min-h-28 rounded-[1rem] border border-black/10 bg-[#F7F7F5] px-4 py-3 text-base outline-none"
          placeholder="Kısa not yazın"
          maxLength={400}
        />
        <p className="text-sm text-black/46">{note.length}/400 karakter</p>
      </label>

      <button
        className="flex min-h-14 items-center justify-center gap-3 rounded-full bg-black px-5 py-4 text-white disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!workItem || !status || !photos.length}
      >
        <Send size={18} />
        5. Gönder
      </button>
    </form>
  );
}

function SubmitSuccessState({ onNewUpload }) {
  return (
    <section className="mt-5 rounded-[2rem] border border-black/10 bg-white p-5">
      <CheckCircle2 size={28} className="text-black/62" />
      <h2 className="mt-4 text-2xl">
        Kayıt şirket onayına gönderildi.
      </h2>
      <p className="mt-3 text-sm leading-6 text-black/58">
        BLAGG Studio ekibi kaydı inceleyip uygun bulursa müşteri proje akışında yayınlar.
      </p>
      <button
        type="button"
        onClick={onNewUpload}
        className="mt-5 min-h-14 rounded-full bg-black px-5 py-3 text-white"
      >
        Yeni fotoğraf gönder
      </button>
    </section>
  );
}

function InvalidWorkerLinkState() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-8 text-[#111111]">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
        <div className="w-full rounded-[2rem] border border-black/10 bg-white p-6 text-center">
          <AlertCircle className="mx-auto text-black/62" size={42} />
          <h1 className="mt-6 text-[2rem]">Geçersiz veya süresi dolmuş bağlantı</h1>
          <p className="mt-4 leading-7 text-black/58">
            Lütfen BLAGG Studio ekibinden size gönderilen güncel bağlantıyı kullanın.
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoLine({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} />
      <span>{text}</span>
    </div>
  );
}

function ErrorText({ children }) {
  return <p className="mt-3 text-sm text-black/58">{children}</p>;
}
