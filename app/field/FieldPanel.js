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
  Upload
} from "lucide-react";
import { demoFiles, demoProject, demoTimeline } from "../../lib/demoData";

const projects = [
  demoProject.title,
  "Müstakil Ev İnşaatı",
  "Satışa Hazırlık Tadilat"
];

const statusActions = [
  { id: "normal", label: "Normal", icon: CheckCircle2 },
  { id: "issue", label: "Sorun Var", icon: AlertTriangle },
  { id: "missing", label: "Malzeme Eksik", icon: PackageX }
];

const photoTags = ["Öncesi", "Süreç", "Sonrası", "Malzeme", "Sorun"];

export default function FieldPanel() {
  const [selectedStatus, setSelectedStatus] = useState("normal");
  const [selectedTag, setSelectedTag] = useState("Süreç");
  const [project, setProject] = useState(projects[0]);
  const [area, setArea] = useState(demoProject.areas[0]);
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState(
    demoTimeline.map((item) => ({
      time: item.time,
      area: item.area,
      note: item.description,
      photos: item.photos,
      status: item.status
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const currentTime = useMemo(() => {
    return new Intl.DateTimeFormat("tr-TR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }, []);

  function selectDemoPhotos() {
    setFiles(demoFiles.slice(0, 3));
  }

  function submitUpdate(event) {
    event.preventDefault();
    setRecentUpdates((current) => [
      {
        time: currentTime,
        area,
        note: note || "Saha ilerleme fotoğrafları eklendi.",
        photos: files.length || 2,
        status: statusActions.find((item) => item.id === selectedStatus)?.label || "Normal"
      },
      ...current
    ]);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream px-5 py-6 text-stoneDark">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-xl items-center justify-center">
          <section className="w-full rounded-[2rem] border border-black/10 bg-white/75 p-8 text-center shadow-2xl shadow-black/5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stoneDark text-gold">
              <CheckCircle2 size={34} />
            </div>
            <h1 className="mt-7 text-4xl font-semibold tracking-tight">
              Güncelleme Kaydedildi
            </h1>
            <p className="mt-4 leading-8 text-black/60">
              Güncelleme admin kontrolüne gönderildi.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setNote("");
                setFiles([]);
              }}
              className="mt-8 w-full rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white"
            >
              Yeni Güncelleme Ekle
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-6 text-stoneDark">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white md:p-8">
          <div className="flex items-center gap-3 text-sm text-white/55">
            <HardHat size={18} />
            <span>{project}</span>
          </div>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight">
            Saha Güncellemesi
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/60">
            Bugünkü iş ilerlemesini fotoğraf ve kısa not ile ekleyin.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
            <Clock3 size={16} />
            Saat: {currentTime}
          </div>
        </header>

        <section className="mt-5 grid gap-3 sm:grid-cols-3">
          {statusActions.map((action) => {
            const Icon = action.icon;
            const selected = selectedStatus === action.id;
            return (
              <button
                key={action.id}
                onClick={() => setSelectedStatus(action.id)}
                className={`flex min-h-24 items-center gap-4 rounded-[1.5rem] border p-5 text-left text-lg font-semibold ${
                  selected
                    ? "border-gold bg-stoneDark text-white"
                    : "border-black/10 bg-white/70 hover:border-gold"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    selected ? "bg-white/10 text-gold" : "bg-cream text-stoneDark"
                  }`}
                >
                  <Icon size={24} />
                </span>
                {action.label}
              </button>
            );
          })}
        </section>

        <form
          onSubmit={submitUpdate}
          className="mt-5 grid gap-5 rounded-[2rem] border border-black/10 bg-white/75 p-5 md:p-7"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField label="Proje seçimi" value={project} onChange={setProject} items={projects} />
            <SelectField label="Alan seçimi" value={area} onChange={setArea} items={demoProject.areas} />
          </div>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-black/60">
              Yapılan iş kısa açıklaması
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="min-h-32 rounded-2xl border border-black/10 bg-cream px-4 py-4 text-base outline-none placeholder:text-black/35"
              placeholder="Örn. Mutfak söküm işlemleri tamamlandı, elektrik altyapı kontrolü yapıldı."
            />
          </label>

          <section className="rounded-[1.5rem] border border-dashed border-black/20 bg-cream p-5 text-center md:p-8">
            <Upload className="mx-auto text-gold" size={34} />
            <h2 className="mt-4 text-2xl font-semibold">Fotoğraf yükleme</h2>
            <p className="mx-auto mt-2 max-w-xl leading-7 text-black/55">
              Net, geniş açı ve iyi ışıklı fotoğraflar müşteri takibini güçlendirir.
            </p>
            <button
              type="button"
              onClick={selectDemoPhotos}
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-stoneDark px-5 py-4 font-medium text-white sm:w-auto"
            >
              <Camera size={20} />
              Fotoğraf Seç / Çek
            </button>
          </section>

          <div className="flex flex-wrap gap-2">
            {photoTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 text-sm ${
                  selectedTag === tag ? "bg-stoneDark text-white" : "bg-cream text-black/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {files.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {files.map((file) => (
                <div key={file} className="rounded-2xl bg-cream p-4">
                  <FileImage className="text-gold" size={20} />
                  <p className="mt-3 text-sm font-medium">{file}</p>
                  <p className="mt-1 text-xs text-black/45">{selectedTag}</p>
                </div>
              ))}
            </div>
          )}

          <button className="min-h-16 rounded-2xl bg-gold px-5 py-4 text-lg font-semibold text-stoneDark">
            Güncellemeyi Yükle
          </button>
        </form>

        <section className="mt-6 rounded-[2rem] border border-black/10 bg-white/75 p-5 md:p-7">
          <h2 className="text-2xl font-semibold">Son saha güncellemeleri</h2>
          <div className="mt-5 grid gap-3">
            {recentUpdates.map((update, index) => (
              <article key={`${update.time}-${update.area}-${index}`} className="rounded-[1.5rem] bg-cream p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-black/45">
                      <Clock3 size={15} />
                      {update.time} · {update.area}
                    </div>
                    <p className="mt-2 font-medium">{update.note}</p>
                    <p className="mt-2 text-sm text-black/50">
                      {update.photos} fotoğraf eklendi
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-sm text-black/55">
                    {update.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SelectField({ label, value, onChange, items }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/60">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 rounded-2xl border border-black/10 bg-cream px-4 py-3 text-base outline-none"
      >
        {items.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}
