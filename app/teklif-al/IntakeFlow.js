"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileImage, MessageCircle, Send, Trash2, Upload } from "lucide-react";
import { homeServices } from "../../lib/data/homePage";
import { validateOfferPhone } from "../../lib/helpers/phone";
import { createWhatsAppLink } from "../../lib/helpers/whatsapp";
import { createApplication } from "../../lib/localStorageRecords";

const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

const serviceOptions = [...homeServices.map((service) => service.title), "Diğer"];

const budgetOptions = [
  "Belirtmek istemiyorum",
  "100.000 TL altı",
  "100.000 - 250.000 TL",
  "250.000 - 500.000 TL",
  "500.000 - 1.000.000 TL",
  "1.000.000 TL üzeri"
];

const startOptions = ["Hemen", "1 ay içinde", "1-3 ay içinde", "3 ay sonrası", "Sadece fiyat araştırıyorum"];

const initialForm = {
  fullName: "",
  phone: "",
  city: "",
  district: "",
  serviceType: "",
  description: "",
  budgetRange: "Belirtmek istemiyorum",
  startTime: "",
  notes: "",
  photos: []
};

export default function IntakeFlow() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const photoNames = useMemo(() => form.photos.map((photo) => photo.name), [form.photos]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function addPhotos(fileList) {
    const files = Array.from(fileList || []);
    const nextErrors = {};
    const validFiles = [];

    files.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        nextErrors.photos = "JPG, PNG veya WEBP formatında fotoğraf ekleyin.";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        nextErrors.photos = `Her fotoğraf en fazla ${MAX_FILE_SIZE_MB} MB olmalıdır.`;
        return;
      }

      validFiles.push({
        id: `${file.name}-${file.lastModified}-${file.size}`,
        name: file.name,
        size: file.size,
        url: typeof URL !== "undefined" ? URL.createObjectURL(file) : ""
      });
    });

    if (validFiles.length) {
      setForm((current) => ({ ...current, photos: [...current.photos, ...validFiles] }));
    }

    setErrors((current) => ({ ...current, photos: nextErrors.photos || "" }));
  }

  function removePhoto(id) {
    setForm((current) => ({
      ...current,
      photos: current.photos.filter((photo) => photo.id !== id)
    }));
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);
    addPhotos(event.dataTransfer.files);
  }

  function validateForm() {
    const nextErrors = {};
    const phoneResult = validateOfferPhone(form.phone);

    if (!form.fullName.trim()) nextErrors.fullName = "Ad soyad zorunludur.";
    if (!phoneResult.valid) nextErrors.phone = phoneResult.error;
    if (!form.city.trim()) nextErrors.city = "İl zorunludur.";
    if (!form.district.trim()) nextErrors.district = "İlçe zorunludur.";
    if (!form.serviceType) nextErrors.serviceType = "Lütfen hizmet tipi seçin.";
    if (!form.description.trim()) nextErrors.description = "Proje açıklaması zorunludur.";
    if (!form.startTime) nextErrors.startTime = "Lütfen başlama zamanı seçin.";

    return { nextErrors, phoneResult };
  }

  function submitApplication(event) {
    event.preventDefault();
    const { nextErrors, phoneResult } = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const now = new Date().toISOString();
    const application = createApplication({
      fullName: form.fullName.trim(),
      customer: form.fullName.trim(),
      phone: form.phone.trim(),
      normalizedPhone: phoneResult.normalizedPhone,
      city: form.city.trim(),
      district: form.district.trim(),
      location: `${form.city.trim()} / ${form.district.trim()}`,
      serviceType: form.serviceType,
      service: form.serviceType,
      description: form.description.trim(),
      projectScale: form.description.trim(),
      budgetRange: form.budgetRange,
      startTime: form.startTime,
      photos: photoNames,
      files: photoNames,
      status: "Yeni",
      createdAt: now,
      updatedAt: now,
      adminNotes: form.notes.trim(),
      note: form.notes.trim(),
      date: new Date().toLocaleDateString("tr-TR"),
      source: "Ön Başvuru Formu"
    });

    setSubmittedApplication(application);
  }

  function resetForm() {
    setForm(initialForm);
    setErrors({});
    setSubmittedApplication(null);
  }

  if (submittedApplication) {
    return (
      <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl items-center">
          <div className="w-full rounded-[1.75rem] border border-border bg-surface p-6 text-center shadow-card sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stoneDark text-white">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl">
              Başvurunuz alındı.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
              BLAGG Studio ekibi kapsamı inceleyip sizinle iletişime geçecektir.
            </p>
            <div className="mx-auto mt-6 w-fit rounded-full bg-soft px-5 py-2 text-sm font-medium">
              Talep No: {submittedApplication.applicationNo}
            </div>
            <button type="button" onClick={resetForm} className="mt-8 rounded-full border border-border px-7 py-4 font-medium">
              Yeni başvuru oluştur
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-stoneDark sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-[1.75rem] bg-stoneDark p-7 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.24em] text-white/40">Project Intake</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Projenizi Başlatın
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Proje bilgilerinizi paylaşın. BLAGG Studio ekibi kapsamı inceleyip sizinle iletişime geçsin.
          </p>
        </header>

        <form id="teklif-formu" onSubmit={submitApplication} className="grid gap-5">
          <FormSection number="1" title="İletişim">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Ad Soyad" value={form.fullName} onChange={(value) => updateField("fullName", value)} error={errors.fullName} />
              <TextField label="Telefon" value={form.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} inputMode="tel" helper="05 veya +90 cep telefonu formatı." />
              <TextField label="İl" value={form.city} onChange={(value) => updateField("city", value)} error={errors.city} />
              <TextField label="İlçe" value={form.district} onChange={(value) => updateField("district", value)} error={errors.district} />
            </div>
          </FormSection>

          <FormSection number="2" title="Proje Bilgileri">
            <div className="grid gap-5">
              <ChoiceGrid label="Hizmet Tipi" options={serviceOptions} value={form.serviceType} onChange={(value) => updateField("serviceType", value)} error={errors.serviceType} />
              <TextAreaField label="Proje Açıklaması" value={form.description} onChange={(value) => updateField("description", value)} error={errors.description} />
            </div>
          </FormSection>

          <FormSection number="3" title="Fotoğraflar">
            <PhotoDropzone
              dragActive={dragActive}
              setDragActive={setDragActive}
              onDrop={handleDrop}
              onSelect={addPhotos}
              error={errors.photos}
            />
            <PhotoPreviewGrid photos={form.photos} onRemove={removePhoto} />
          </FormSection>

          <FormSection number="4" title="Zamanlama ve Notlar">
            <div className="grid gap-4 lg:grid-cols-2">
              <SelectField label="Yaklaşık Bütçe" value={form.budgetRange} options={budgetOptions} onChange={(value) => updateField("budgetRange", value)} />
              <SelectField label="Başlama Zamanı" value={form.startTime} options={["", ...startOptions]} onChange={(value) => updateField("startTime", value)} error={errors.startTime} />
            </div>
            <div className="mt-4">
              <TextAreaField label="Notlar" value={form.notes} onChange={(value) => updateField("notes", value)} optional />
            </div>
          </FormSection>

          <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card">
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 text-lg font-semibold text-white">
                Ön Başvuru Oluştur
                <Send size={20} />
              </button>
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-lg font-semibold text-stoneDark"
              >
                <MessageCircle size={20} />
                WhatsApp ile İletişim
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function FormSection({ number, title, children }) {
  return (
    <section className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-card sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stoneDark text-sm font-semibold text-white">{number}</span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TextField({ label, value, onChange, error, helper, inputMode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode={inputMode}
        className={`h-14 rounded-2xl border bg-white px-5 text-base outline-none placeholder:text-black/35 ${error ? "border-red-500" : "border-border"}`}
      />
      {helper && <span className="text-sm leading-6 text-muted">{helper}</span>}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function TextAreaField({ label, value, onChange, error, optional = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-36 rounded-2xl border bg-white px-5 py-4 text-base outline-none placeholder:text-black/35 ${error ? "border-red-500" : "border-border"}`}
      />
      {optional && <span className="text-sm text-muted">İsteğe bağlı.</span>}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ChoiceGrid({ label, options, value, onChange, error }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-graphite">{label}</p>
      <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex min-h-14 items-center rounded-2xl border px-4 py-3 text-left text-sm font-semibold ${
              value === option ? "border-stoneDark bg-stoneDark text-white" : "border-border bg-soft text-stoneDark hover:border-stoneDark"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function PhotoDropzone({ dragActive, setDragActive, onDrop, onSelect, error }) {
  return (
    <div>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed p-6 text-center ${
          dragActive ? "border-stoneDark bg-white" : "border-black/20 bg-soft"
        }`}
      >
        <Upload className="text-graphite" size={34} />
        <span className="mt-4 text-2xl font-semibold">Fotoğraf ekleyin</span>
        <span className="mt-2 max-w-xl text-sm text-muted">Dosya seçin veya buraya sürükleyin. JPG, PNG, WEBP.</span>
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" capture="environment" onChange={(event) => onSelect(event.target.files)} className="sr-only" />
      </label>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function PhotoPreviewGrid({ photos, onRemove }) {
  if (!photos.length) return null;

  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
          {photo.url ? (
            <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />
          ) : (
            <div className="flex aspect-square items-center justify-center bg-soft">
              <FileImage className="text-graphite" size={24} />
            </div>
          )}
          <div className="flex items-center justify-between gap-2 p-3">
            <span className="truncate text-sm text-muted">{photo.name}</span>
            <button
              type="button"
              onClick={() => onRemove(photo.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft text-muted"
              aria-label={`${photo.name} fotoğrafını sil`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SelectField({ label, value, options, onChange, error }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-graphite">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-14 rounded-2xl border bg-white px-5 text-base outline-none ${error ? "border-red-500" : "border-border"}`}
      >
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {option || "Seçiniz"}
          </option>
        ))}
      </select>
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }) {
  return <p className="mt-2 text-sm font-semibold text-red-700">{children}</p>;
}
