"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { validateOfferPhone } from "../../lib/helpers/phone";

const projectTypeOptions = [
  {
    label: "Anahtar Teslim İnşaat",
    value: "anahtar-teslim-insaat",
    serviceSlugs: ["anahtar-teslim"]
  },
  {
    label: "Konut Yenileme & Tadilat",
    value: "konut-yenileme-tadilat",
    serviceSlugs: ["renovasyon", "ic-mimari"]
  },
  {
    label: "Peyzaj Mimarisi",
    value: "peyzaj-mimarisi",
    serviceSlugs: ["peyzaj-tasarimi", "peyzaj-uygulama"]
  },
  {
    label: "Gayrimenkul Değer Artışı & Danışmanlığı",
    value: "deger-artirma-danismanlik",
    serviceSlugs: ["danismanlik"]
  },
  {
    label: "Diğer",
    value: "diger",
    serviceSlugs: ["danismanlik"]
  }
];

const initialForm = {
  fullName: "",
  phone: "",
  location: "",
  projectType: "",
  description: "",
  companyWebsite: ""
};

const trustNotes = [
  "Ön görüşme projenizi anlamak içindir.",
  "Süreç, kapsam netleştikten sonra planlanır.",
  "Aktif projelerde BLAGG Remote takip alanı oluşturulur."
];

export default function IntakeFlow() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validateForm() {
    const nextErrors = {};
    const phoneResult = validateOfferPhone(form.phone);

    if (!form.fullName.trim()) nextErrors.fullName = "Ad soyad zorunludur.";
    if (!phoneResult.valid) nextErrors.phone = phoneResult.error;
    if (!form.projectType) nextErrors.projectType = "Lütfen proje türü seçin.";
    if (!form.description.trim()) {
      nextErrors.description = "Projenizi kısaca anlatın.";
    }

    return { nextErrors, phoneResult };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const { nextErrors, phoneResult } = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const selectedProjectType = projectTypeOptions.find(
      (option) => option.value === form.projectType
    );

    if (!selectedProjectType) {
      setErrors({ projectType: "Lütfen proje türü seçin." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: phoneResult.normalizedPhone,
          location: form.location,
          projectType: selectedProjectType.label,
          description: form.description,
          source: "website",
          serviceSlugs: selectedProjectType.serviceSlugs,
          startedAt,
          companyWebsite: form.companyWebsite
        })
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setErrors({
          ...(result?.fieldErrors || {}),
          form:
            response.status >= 500
              ? "Başvuru şu anda kaydedilemedi. Lütfen daha sonra tekrar deneyin."
              : result?.message || "Gönderilen bilgiler kontrol edilemedi."
        });
        return;
      }

      setSubmittedApplication({
        applicationNo: result.leadId,
        leadId: result.leadId
      });
      setForm(initialForm);
      setStartedAt(Date.now());
      setErrors({});
    } catch {
      setErrors({
        form: "Bağlantı kurulamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedApplication) {
    return (
      <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
        <section className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center px-4 py-8 sm:px-6">
          <div className="w-full rounded-[2rem] border border-black/10 bg-white p-8 text-center sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <CheckCircle2 size={30} />
            </div>
            <h1 className="mt-6 text-[2.7rem] leading-tight sm:text-[3.5rem]">
              Başvurunuz alındı.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-black/58 sm:text-lg">
              Projenizi inceleyip sizinle iletişime geçeceğiz.
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.2em] text-black/42">
              Kayıt No: {submittedApplication.applicationNo}
            </p>
            <div className="mx-auto mt-6 max-w-lg rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] p-4 text-left">
              <p className="text-sm font-medium text-black">Sonraki adım</p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-black/58">
                <li>Ekibimiz kapsamı inceleyecek.</li>
                <li>Uygun görülürse sizinle telefon üzerinden iletişime geçilecek.</li>
                <li>Aktif projelerde takip alanı daha sonra ayrıca paylaşılacak.</li>
              </ul>
            </div>
            <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/12 px-6 py-4 text-base text-black"
              >
                Ana Sayfaya Dön
              </Link>
              <button
                type="button"
                onClick={() => setSubmittedApplication(null)}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-black px-6 py-4 text-base text-white"
              >
                Yeni Başvuru Oluştur
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F7F5] pt-24 text-[#111111]">
      <section className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(22rem,0.92fr)]">
          <div className="lg:pt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-black/45">
              Başvuru
            </p>
            <h1 className="mt-5 text-[3rem] leading-[0.98] sm:text-[4.4rem]">
              Projenizi Başlatın
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/58 sm:text-lg">
              Projenizi kısaca anlatın. Size uygun çalışma modelini netleştirmek için sizinle iletişime geçelim.
            </p>

            <div className="mt-10 grid gap-4">
              {trustNotes.map((note) => (
                <div key={note} className="border-t border-black/10 py-4">
                  <p className="text-base leading-7 text-black/66">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            id="teklif-formu"
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-black/10 bg-white p-5 sm:p-7"
            noValidate
          >
            <div className="grid gap-5">
              <input
                type="text"
                name="companyWebsite"
                value={form.companyWebsite}
                tabIndex={-1}
                autoComplete="off"
                onChange={(event) => updateField("companyWebsite", event.target.value)}
                className="hidden"
                aria-hidden="true"
              />
              <Field
                id="full-name"
                label="Ad Soyad"
                value={form.fullName}
                error={errors.fullName}
                autoComplete="name"
                maxLength={80}
                onChange={(value) => updateField("fullName", value)}
              />
              <Field
                id="phone"
                label="Telefon"
                value={form.phone}
                error={errors.phone}
                helper="05 ile başlayan veya +90 formatındaki cep telefonu numaranızı yazın."
                inputMode="tel"
                autoComplete="tel"
                maxLength={16}
                onChange={(value) => updateField("phone", value)}
              />
              <Field
                id="location"
                label="Proje Lokasyonu"
                value={form.location}
                placeholder="İl / İlçe"
                autoComplete="address-level2"
                maxLength={80}
                onChange={(value) => updateField("location", value)}
              />
              <SelectField
                id="project-type"
                label="Proje Türü"
                value={form.projectType}
                error={errors.projectType}
                options={projectTypeOptions}
                onChange={(value) => updateField("projectType", value)}
              />
              <TextAreaField
                id="description"
                label="Kısa Açıklama"
                value={form.description}
                error={errors.description}
                placeholder="Projenizden kısaca bahsedin..."
                maxLength={600}
                onChange={(value) => updateField("description", value)}
              />
              <p className="text-sm leading-6 text-black/46">
                Zorunlu alanlar yalnızca ilk değerlendirme için kullanılır.
              </p>
              {errors.form ? <ErrorText id="form-error">{errors.form}</ErrorText> : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-black/60"
              >
                {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  placeholder,
  inputMode = "text",
  autoComplete,
  maxLength
}) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="text-sm uppercase tracking-[0.16em] text-black/56">{label}</span>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={[
          helper ? `${id}-helper` : null,
          error ? `${id}-error` : null
        ]
          .filter(Boolean)
          .join(" ")}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-[1.2rem] border bg-[#F7F7F5] px-5 py-4 text-base outline-none ${
          error ? "border-black" : "border-black/10"
        }`}
      />
      {helper ? (
        <p id={`${id}-helper`} className="text-sm leading-6 text-black/46">
          {helper}
        </p>
      ) : null}
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </label>
  );
}

function SelectField({ id, label, value, onChange, options, error }) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="text-sm uppercase tracking-[0.16em] text-black/56">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-[1.2rem] border bg-[#F7F7F5] px-5 py-4 text-base outline-none ${
          error ? "border-black" : "border-black/10"
        }`}
      >
        <option value="">Seçiniz</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </label>
  );
}

function TextAreaField({ id, label, value, onChange, error, placeholder, maxLength }) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="text-sm uppercase tracking-[0.16em] text-black/56">{label}</span>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-meta${error ? ` ${id}-error` : ""}`}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-40 w-full rounded-[1.2rem] border bg-[#F7F7F5] px-5 py-4 text-base outline-none ${
          error ? "border-black" : "border-black/10"
        }`}
      />
      <p id={`${id}-meta`} className="text-sm leading-6 text-black/46">
        {value.length}/{maxLength} karakter
      </p>
      {error ? <ErrorText id={`${id}-error`}>{error}</ErrorText> : null}
    </label>
  );
}

function ErrorText({ children, id }) {
  return (
    <p id={id} className="text-sm leading-6 text-black/58" aria-live="polite">
      {children}
    </p>
  );
}
