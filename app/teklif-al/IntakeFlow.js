"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileImage,
  Hammer,
  Home,
  Upload
} from "lucide-react";

const services = [
  {
    id: "build",
    icon: Building2,
    title: "Anahtar Teslim Yapı Geliştirme",
    value:
      "Arsa, konsept, bütçe, kalite standardı ve uygulama planını tek çatı altında netleştirin."
  },
  {
    id: "renovation",
    icon: Hammer,
    title: "Tadilat & Değer Artırma Çalışmaları",
    value:
      "Konutunuzu daha konforlu, modern, kiraya veya satışa hazır hale getirecek kapsamı belirleyin."
  },
  {
    id: "realEstate",
    icon: Home,
    title: "Gayrimenkul Satış Danışmanlığı",
    value:
      "Satış, kiralama, satın alma veya yatırım kararınızı veri ve sunum gücüyle planlayın."
  }
];

const questionSets = {
  build: [
    { key: "land", label: "Arsanız var mı?", type: "chips", options: ["Evet", "Hayır"] },
    { key: "location", label: "Konum", type: "input", placeholder: "İl / ilçe / bölge" },
    {
      key: "structureType",
      label: "Hedef yapı tipi",
      type: "chips",
      options: ["Villa", "Müstakil Konut", "Ticari Yapı"]
    },
    { key: "size", label: "Yaklaşık m²", type: "input", placeholder: "Örn. 280 m²" },
    { key: "floors", label: "Kat sayısı", type: "input", placeholder: "Örn. 2 kat" },
    { key: "rooms", label: "Oda sayısı", type: "input", placeholder: "Örn. 5+1" },
    {
      key: "quality",
      label: "Hedef kalite",
      type: "chips",
      options: ["Select", "Signature", "Ultra"]
    },
    { key: "start", label: "Başlama zamanı", type: "input", placeholder: "Örn. 3 ay içinde" },
    { key: "budget", label: "Bütçe aralığı", type: "input", placeholder: "Örn. ₺8M - ₺12M" }
  ],
  renovation: [
    {
      key: "scope",
      label: "Kapsam",
      type: "chips",
      options: ["Komple Ev", "Mutfak", "Banyo", "Salon", "Dış Cephe", "Satışa Hazırlık"]
    },
    {
      key: "occupancy",
      label: "Ev şu an boş mu?",
      type: "chips",
      options: ["Boş", "İçinde yaşanıyor"]
    },
    { key: "location", label: "Konum", type: "input", placeholder: "İl / ilçe / mahalle" },
    { key: "size", label: "Yaklaşık m²", type: "input", placeholder: "Örn. 145 m²" },
    {
      key: "goal",
      label: "Hedef",
      type: "chips",
      options: ["Konfor", "Değer Artışı", "Satışa Hazırlık", "Kiraya Hazırlık", "Modern Görünüm"]
    },
    {
      key: "issues",
      label: "Kritik sorunlar",
      type: "multi",
      options: ["Elektrik", "Tesisat", "Zemin", "Nem", "Mobilya", "Boya"]
    },
    { key: "start", label: "Başlama zamanı", type: "input", placeholder: "Örn. Hemen / 1 ay içinde" },
    { key: "budget", label: "Bütçe aralığı", type: "input", placeholder: "Örn. ₺750K - ₺1.2M" }
  ],
  realEstate: [
    {
      key: "need",
      label: "İhtiyaç tipi",
      type: "chips",
      options: ["Satmak", "Kiraya Vermek", "Satın Almak", "Yatırım Danışmanlığı"]
    },
    {
      key: "propertyType",
      label: "Gayrimenkul tipi",
      type: "chips",
      options: ["Daire", "Villa", "Arsa", "Ticari"]
    },
    { key: "location", label: "Konum", type: "input", placeholder: "İl / ilçe / bölge" },
    { key: "size", label: "Yaklaşık m²", type: "input", placeholder: "Örn. 180 m²" },
    {
      key: "expectation",
      label: "Beklenti",
      type: "chips",
      options: ["Hızlı satış", "Maksimum değer", "Önce değer artırma"]
    },
    { key: "listing", label: "Mevcut ilan linki", type: "input", placeholder: "Varsa ilan bağlantısı" },
    {
      key: "price",
      label: "Beklenen fiyat veya bütçe aralığı",
      type: "input",
      placeholder: "Örn. ₺6M - ₺7M"
    }
  ]
};

const demoFiles = ["Cephe fotoğrafı.jpg", "Tapu bilgisi.pdf", "Salon mevcut durum.png"];

const steps = ["Hizmet", "Detay", "Dosya", "İletişim", "Özet"];

const initialState = {
  serviceId: "",
  answers: {},
  files: [],
  contact: {
    name: "",
    phone: "",
    email: "",
    note: ""
  }
};

export default function IntakeFlow() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(initialState);

  const selectedService = services.find((service) => service.id === data.serviceId);
  const questions = data.serviceId ? questionSets[data.serviceId] : [];

  const summaryAnswers = useMemo(() => {
    return questions
      .map((question) => ({
        label: question.label,
        value: Array.isArray(data.answers[question.key])
          ? data.answers[question.key].join(", ")
          : data.answers[question.key]
      }))
      .filter((item) => item.value);
  }, [data.answers, questions]);

  function chooseService(serviceId) {
    setData((current) => ({ ...current, serviceId, answers: {} }));
  }

  function setAnswer(key, value) {
    setData((current) => ({
      ...current,
      answers: { ...current.answers, [key]: value }
    }));
  }

  function toggleAnswer(key, value) {
    setData((current) => {
      const selected = current.answers[key] || [];
      const next = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return {
        ...current,
        answers: { ...current.answers, [key]: next }
      };
    });
  }

  function addDemoFiles() {
    setData((current) => ({ ...current, files: demoFiles }));
  }

  function setContact(key, value) {
    setData((current) => ({
      ...current,
      contact: { ...current.contact, [key]: value }
    }));
  }

  function nextStep() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function resetFlow() {
    setSubmitted(false);
    setStep(0);
    setData(initialState);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream px-6 py-10 text-stoneDark">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
          <section className="w-full rounded-[2rem] border border-black/10 bg-white/70 p-8 text-center shadow-2xl shadow-black/5 md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stoneDark text-gold">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight">
              Başvurunuz Alındı
            </h1>
            <p className="mx-auto mt-5 max-w-xl leading-8 text-black/60">
              Bilgileriniz şirket paneline iletildi. Ekibimiz inceleme sonrası
              sizinle iletişime geçecek.
            </p>
            <div className="mx-auto mt-6 w-fit rounded-full bg-cream px-5 py-2 text-sm font-medium text-stoneDark">
              Başvuru No: AG-2026-001
            </div>
            <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left">
              {[
                "Başvurunuz incelenir",
                "Ekibimiz sizinle iletişime geçer",
                "Teklif ve yol haritası hazırlanır",
                "Süreç panelden takip edilir"
              ].map((item, index) => (
                <div key={item} className="rounded-2xl bg-cream p-4 text-sm text-black/65">
                  {index + 1}. {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/client"
                className="inline-flex justify-center rounded-full bg-stoneDark px-7 py-4 text-white"
              >
                Müşteri Panelini Gör
              </a>
              <button
                onClick={resetFlow}
                className="inline-flex justify-center rounded-full border border-black/10 px-7 py-4"
              >
                Yeni Başvuru Oluştur
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-8 text-stoneDark">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 rounded-[2rem] bg-stoneDark p-8 text-white md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex gap-5">
              <a href="/" className="text-sm text-white/55">
                Ana sayfa
              </a>
              <a href="/login" className="text-sm text-white/55">
                Giriş Yap
              </a>
            </div>
            <p className="mt-12 text-sm uppercase tracking-[0.3em] text-white/35">
              Akıllı Ön Başvuru
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
              Proje Yolculuğunuzu Başlatın
            </h1>
            <p className="mt-6 max-w-2xl leading-8 text-white/60">
              Birkaç net seçimle ihtiyacınızı, kapsamı ve öncelikleri
              belirleyin. Ekibimiz başvurunuzu proje danışmanlığı formatında
              değerlendirsin.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-sm text-white/60 lg:w-72">
            <strong className="block text-base text-white">Premium intake</strong>
            <span className="mt-2 block">
              Gereksiz form kalabalığı yerine karar ağacı ile doğru kapsam.
            </span>
          </div>
        </header>

        <section className="mt-8 rounded-[2rem] border border-black/10 bg-white/70 p-5 md:p-7">
          <Stepper current={step} />

          <div className="mt-8">
            {step === 0 && (
              <StepShell
                eyebrow="1. Adım"
                title="Size en yakın hizmet yolunu seçin."
                description="Seçiminize göre sonraki sorular otomatik olarak sadeleşir."
              >
                <div className="grid gap-4 lg:grid-cols-3">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const isSelected = data.serviceId === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => chooseService(service.id)}
                        className={`rounded-[2rem] border p-6 text-left ${
                          isSelected
                            ? "border-gold bg-stoneDark text-white"
                            : "border-black/10 bg-cream hover:border-gold hover:bg-white"
                        }`}
                      >
                        <div
                          className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${
                            isSelected ? "bg-white/10 text-gold" : "bg-stoneDark text-white"
                          }`}
                        >
                          <Icon size={26} />
                        </div>
                        <h3 className="text-2xl font-semibold">{service.title}</h3>
                        <p
                          className={`mt-4 leading-7 ${
                            isSelected ? "text-white/60" : "text-black/60"
                          }`}
                        >
                          {service.value}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell
                eyebrow="2. Adım"
                title={selectedService?.title || "Proje detayları"}
                description="Kapsamı hızlıca okuyabilmemiz için kritik bilgileri seçin."
              >
                <div className="grid gap-5 lg:grid-cols-2">
                  {questions.map((question) => (
                    <Question
                      key={question.key}
                      question={question}
                      value={data.answers[question.key]}
                      onChange={setAnswer}
                      onToggle={toggleAnswer}
                    />
                  ))}
                </div>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                eyebrow="3. Adım"
                title="Fotoğraf ve belge ekleyin."
                description="Bu ilk sürümde dosyalar örnek etiketlerle temsil edilir."
              >
                <button
                  onClick={addDemoFiles}
                  className="flex min-h-64 w-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-black/20 bg-cream p-8 text-center hover:border-gold hover:bg-white"
                >
                  <Upload className="text-gold" size={34} />
                  <strong className="mt-5 text-2xl">
                    Dosyaları buraya sürükleyin veya seçin
                  </strong>
                  <span className="mt-3 max-w-2xl leading-7 text-black/55">
                    Fotoğraf, tapu, imar durumu veya mevcut ilan görsellerinizi
                    buraya ekleyebilirsiniz.
                  </span>
                  <span className="mt-4 text-sm text-black/40">
                    Net cephe, oda, tesisat ve sorun fotoğrafları daha doğru
                    değerlendirme sağlar.
                  </span>
                </button>

                {data.files.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {data.files.map((file) => (
                      <span
                        key={file}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black/65"
                      >
                        <FileImage size={16} />
                        {file}
                      </span>
                    ))}
                  </div>
                )}
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                eyebrow="4. Adım"
                title="Size ulaşabileceğimiz bilgileri bırakın."
                description="Başvuruyu inceleyen ekip doğru kişiyle hızlıca iletişime geçsin."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Ad Soyad"
                    value={data.contact.name}
                    onChange={(value) => setContact("name", value)}
                    placeholder="Adınız ve soyadınız"
                  />
                  <Field
                    label="Telefon"
                    value={data.contact.phone}
                    onChange={(value) => setContact("phone", value)}
                    placeholder="+90 5xx xxx xx xx"
                  />
                  <Field
                    label="E-posta"
                    value={data.contact.email}
                    onChange={(value) => setContact("email", value)}
                    placeholder="ornek@firma.com"
                  />
                  <label className="grid gap-2 md:col-span-2">
                    <span className="text-sm font-medium text-black/60">
                      Not / Ek açıklama
                    </span>
                    <textarea
                      value={data.contact.note}
                      onChange={(event) => setContact("note", event.target.value)}
                      className="min-h-36 rounded-2xl border border-black/10 bg-cream px-5 py-4 outline-none placeholder:text-black/35"
                      placeholder="Öncelikleriniz, zaman baskısı veya özel beklentiler"
                    />
                  </label>
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell
                eyebrow="5. Adım"
                title="Ön başvurunuzu kontrol edin."
                description="Seçimleriniz ve iletişim bilgileriniz aşağıdaki özetle iletilecek."
              >
                <div className="grid gap-5 lg:grid-cols-2">
                  <SummaryCard title="Seçilen hizmet">
                    <p className="text-xl font-semibold">{selectedService?.title}</p>
                  </SummaryCard>
                  <SummaryCard title="İletişim özeti">
                    <SummaryLine label="Ad Soyad" value={data.contact.name} />
                    <SummaryLine label="Telefon" value={data.contact.phone} />
                    <SummaryLine label="E-posta" value={data.contact.email} />
                  </SummaryCard>
                  <SummaryCard title="Proje cevapları" wide>
                    <div className="grid gap-3 md:grid-cols-2">
                      {summaryAnswers.map((item) => (
                        <SummaryLine
                          key={item.label}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </div>
                  </SummaryCard>
                  <SummaryCard title="Dosyalar">
                    <p className="text-black/60">
                      {data.files.length
                        ? data.files.join(", ")
                        : "Dosya eklenmedi"}
                    </p>
                  </SummaryCard>
                </div>
              </StepShell>
            )}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={previousStep}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={17} />
              Geri
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={step === 0 && !data.serviceId}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stoneDark px-7 py-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                Devam Et
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-4 text-sm font-medium text-stoneDark"
              >
                Ön Başvuruyu Oluştur
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stepper({ current }) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {steps.map((label, index) => (
        <div key={label} className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
              index <= current ? "bg-stoneDark text-white" : "bg-cream text-black/40"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-sm ${
              index <= current ? "text-stoneDark" : "text-black/40"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function StepShell({ eyebrow, title, description, children }) {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.25em] text-black/35">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl leading-8 text-black/60">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Question({ question, value, onChange, onToggle }) {
  if (question.type === "chips" || question.type === "multi") {
    const selectedValues = question.type === "multi" ? value || [] : [value];
    return (
      <div className="rounded-[1.5rem] bg-cream p-5">
        <p className="mb-4 text-sm font-medium text-black/65">{question.label}</p>
        <div className="flex flex-wrap gap-2">
          {question.options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <button
                key={option}
                onClick={() =>
                  question.type === "multi"
                    ? onToggle(question.key, option)
                    : onChange(question.key, option)
                }
                className={`rounded-full px-4 py-2 text-sm ${
                  isSelected
                    ? "bg-stoneDark text-white"
                    : "bg-white text-black/60 hover:bg-stoneDark hover:text-white"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Field
      label={question.label}
      value={value || ""}
      onChange={(nextValue) => onChange(question.key, nextValue)}
      placeholder={question.placeholder}
    />
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="grid gap-2 rounded-[1.5rem] bg-cream p-5">
      <span className="text-sm font-medium text-black/65">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-black/10 bg-white px-5 py-4 outline-none placeholder:text-black/35"
        placeholder={placeholder}
      />
    </label>
  );
}

function SummaryCard({ title, children, wide }) {
  return (
    <div
      className={`rounded-[1.5rem] bg-cream p-5 ${
        wide ? "lg:col-span-2" : ""
      }`}
    >
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-black/35">
        {title}
      </p>
      {children}
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{label}</p>
      <p className="mt-1 text-black/70">{value || "Belirtilmedi"}</p>
    </div>
  );
}
