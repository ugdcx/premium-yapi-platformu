"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  FileImage,
  MessageCircle,
  Send,
  Trash2,
  Upload
} from "lucide-react";
import { homeServices } from "../../lib/data/homePage";
import { validateOfferPhone } from "../../lib/helpers/phone";
import { createWhatsAppLink } from "../../lib/helpers/whatsapp";
import { createApplication } from "../../lib/mockStorage";

const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

const serviceOptions = [...homeServices.map((service) => service.title), "Diğer"];

const budgetOptions = [
  "Belirtmek istemiyorum",
  "100.000 TL altı",
  "100.000 - 250.000 TL",
  "250.000 - 500.000 TL",
  "500.000 - 1.000.000 TL",
  "1.000.000 TL üzeri"
];

const startOptions = [
  "Hemen",
  "1 ay içinde",
  "1-3 ay içinde",
  "3 ay sonrası",
  "Sadece fiyat araştırıyorum"
];

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
      const validType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      if (!validType) {
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
      setForm((current) => ({
        ...current,
        photos: [...current.photos, ...validFiles]
      }));
    }

    setErrors((current) => ({ ...current, photos: nextErrors.photos || "" }));
  }

  function removePhoto(id) {
    setForm((current) => ({
      ...current,
      photos: current.photos.filter((photo) => photo.id !== id)
    }));
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
      source: "Ön Başvuru Formu",
      answers: [
        ["İl", form.city.trim()],
        ["İlçe", form.district.trim()],
        ["Hizmet Tipi", form.serviceType],
        ["Proje / İş Açıklaması", form.description.trim()],
        ["Yaklaşık Bütçe Aralığı", form.budgetRange],
        ["Başlama Zamanı", form.startTime],
        ["Notlar", form.notes.trim() || "Belirtilmedi"]
      ]
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
          <div className="w-full rounded-[2rem] border border-border bg-surface p-6 text-center shadow-card sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stoneDark text-gold">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl">
              Başvurunuz alındı.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">
              Ekibimiz projenizi inceleyip sizinle iletişime geçecektir.
            </p>
            <div className="mx-auto mt-6 w-fit rounded-full bg-cream px-5 py-2 text-sm font-medium">
              Talep No: {submittedApplication.applicationNo}
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="mt-8 rounded-full border border-border px-7 py-4 font-medium"
            >
              Yeni başvuru oluştur
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] bg-stoneDark p-6 text-white sm:p-8">
          <a href="/" className="text-sm text-white/60">Ana sayfa</a>
          <p className="mt-10 text-sm uppercase tracking-[0.25em] text-white/35">
            Teklif Başvurusu
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Projenizi kolayca anlatın.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            Kısa formu doldurun. BLAAG ekibi kapsamı incelesin ve sizi doğrudan arasın.
          </p>
          <a
            href="#teklif-formu"
            className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 font-semibold text-stoneDark"
          >
            Forma Başla
            <Send size={18} />
          </a>
        </header>

        <form id="teklif-formu" onSubmit={submitApplication} className="mt-6 grid gap-5">
          <FormSection title="1. İletişim Bilgileri" description="Ekibimizin size ulaşması için temel bilgiler.">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Ad Soyad" value={form.fullName} onChange={(value) => updateField("fullName", value)} error={errors.fullName} placeholder="Adınız ve soyadınız" />
              <TextField label="Telefon" value={form.phone} onChange={(value) => updateField("phone", value)} error={errors.phone} placeholder="05XXXXXXXXX" inputMode="tel" helper="05, 5, +90 veya 0090 ile başlayan cep telefonu yazabilirsiniz." />
              <TextField label="İl" value={form.city} onChange={(value) => updateField("city", value)} error={errors.city} placeholder="Örn. Sakarya" />
              <TextField label="İlçe" value={form.district} onChange={(value) => updateField("district", value)} error={errors.district} placeholder="Örn. Akyazı" />
            </div>
          </FormSection>

          <FormSection title="2. Proje Bilgileri" description="Yapılacak işi kısa ve net anlatın.">
            <div className="grid gap-4">
              <ChoiceGrid label="Hizmet Tipi" options={serviceOptions} value={form.serviceType} onChange={(value) => updateField("serviceType", value)} error={errors.serviceType} />
              <TextAreaField label="Proje / İş Açıklaması" value={form.description} onChange={(value) => updateField("description", value)} error={errors.description} placeholder="Örn. Mutfak ve banyo yenileme, dış cephe boya, satış öncesi tadilat..." />
            </div>
          </FormSection>

          <FormSection title="3. Fotoğraf Yükleme" description={`JPG, PNG veya WEBP yükleyin. Her fotoğraf en fazla ${MAX_FILE_SIZE_MB} MB olabilir.`}>
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-black/20 bg-soft p-6 text-center hover:border-gold">
              <Upload className="text-gold" size={34} />
              <span className="mt-4 text-2xl font-semibold">Fotoğraf Ekle</span>
              <span className="mt-2 max-w-xl text-muted">
                Mobilde kameradan fotoğraf seçebilirsiniz.
              </span>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                capture="environment"
                onChange={(event) => addPhotos(event.target.files)}
                className="sr-only"
              />
            </label>
            {errors.photos && <ErrorText>{errors.photos}</ErrorText>}
            {form.photos.length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {form.photos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                    {photo.url ? (
                      <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-soft">
                        <FileImage className="text-gold" size={24} />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2 p-3">
                      <span className="truncate text-sm text-muted">{photo.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-muted"
                        aria-label={`${photo.name} fotoğrafını sil`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FormSection>

          <FormSection title="4. Bütçe ve Zaman" description="Yaklaşık bilgi vermeniz teklif sürecini hızlandırır.">
            <div className="grid gap-4 lg:grid-cols-2">
              <SelectField label="Yaklaşık Bütçe Aralığı" value={form.budgetRange} options={budgetOptions} onChange={(value) => updateField("budgetRange", value)} />
              <SelectField label="Başlama Zamanı" value={form.startTime} options={["", ...startOptions]} onChange={(value) => updateField("startTime", value)} error={errors.startTime} placeholder="Seçiniz" />
            </div>
          </FormSection>

          <FormSection title="5. Notlar" description="Varsa özel beklentinizi veya uygun aranma saatini yazabilirsiniz.">
            <TextAreaField label="Notlar" value={form.notes} onChange={(value) => updateField("notes", value)} placeholder="İsteğe bağlı" />
          </FormSection>

          <div className="rounded-[2rem] border border-border bg-surface p-5 shadow-card">
            <div className="grid gap-3 sm:grid-cols-2">
              <button className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-lg font-semibold text-stoneDark">
                Başvuruyu Gönder
                <Send size={20} />
              </button>
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-16 items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-lg font-semibold text-stoneDark"
              >
                <MessageCircle size={20} />
                WhatsApp Alternatifi
              </a>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function FormSection({ title, description, children }) {
  return (
    <section className="rounded-[2rem] border border-border bg-surface p-5 shadow-card sm:p-6">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-base leading-7 text-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TextField({ label, value, onChange, placeholder, error, helper, inputMode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode={inputMode}
        className={`min-h-14 rounded-2xl border bg-white px-5 py-4 text-lg outline-none placeholder:text-black/35 ${
          error ? "border-red-500" : "border-border"
        }`}
        placeholder={placeholder}
      />
      {helper && <span className="text-sm leading-6 text-muted">{helper}</span>}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, error }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-36 rounded-2xl border bg-white px-5 py-4 text-lg outline-none placeholder:text-black/35 ${
          error ? "border-red-500" : "border-border"
        }`}
        placeholder={placeholder}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ChoiceGrid({ label, options, value, onChange, error }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-muted">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-14 rounded-2xl border px-4 py-3 text-left font-semibold ${
              value === option
                ? "border-stoneDark bg-stoneDark text-white"
                : "border-border bg-soft text-stoneDark hover:border-gold"
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

function SelectField({ label, value, options, onChange, error, placeholder }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-14 rounded-2xl border bg-white px-5 py-4 text-lg outline-none ${
          error ? "border-red-500" : "border-border"
        }`}
      >
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {option || placeholder || "Seçiniz"}
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
