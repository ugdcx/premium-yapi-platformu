import {
  Camera,
  FileText,
  MessageCircle,
  ShieldCheck,
  WalletCards
} from "lucide-react";
import {
  demoDocuments,
  demoGallery,
  demoPaymentPlan,
  demoProject,
  demoRequests,
  demoTimeline,
  demoWarranty
} from "../../../../lib/demoData";
import { statusChipClass } from "../../../../lib/designSystem";

export const metadata = {
  title: "Özel Proje Takibi | BLAAG Construction and Architecture",
  description:
    "BLAAG müşterileri için hesapsız, projeye özel takip bağlantısı."
};

export default function PrivateProjectTrackingPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-stoneDark sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="bg-stoneDark p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/35">
            BLAAG özel takip bağlantısı
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                {demoProject.title}
              </h1>
              <p className="mt-5 max-w-2xl leading-8 text-white/65">
                Bu bağlantı proje sahibine özel hazırlanmıştır. Yayınlanan
                güncellemeler BLAAG ekibi tarafından kontrol edilir ve anlaşılır
                şekilde düzenlendikten sonra paylaşılır.
              </p>
            </div>
            <div className="grid gap-3 bg-white/10 p-5 text-sm text-white/70 sm:min-w-72">
              <InfoLine label="Müşteri" value="Ahmet S." dark />
              <InfoLine label="Hizmet" value={demoProject.serviceType} dark />
              <InfoLine label="Güncel aşama" value="Uygulama aşaması" dark />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-3">
          <SummaryCard title="Proje tipi" value={demoProject.serviceType} />
          <SummaryCard title="Mevcut durum" value="Uygulama aşaması" />
          <SummaryCard title="Sonraki adım" value="Elektrik altyapı kontrolü" />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Panel title="Onaylı güncellemeler" icon={ShieldCheck}>
            <div className="grid gap-3">
              {demoTimeline.slice(0, 4).map((item) => (
                <article key={item.id} className="border border-border bg-cream p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-black/35">
                        {item.date} · {item.time} · {item.area}
                      </p>
                      <h3 className="mt-2 font-semibold">{item.description}</h3>
                    </div>
                    <span className={statusChipClass(item.status)}>{item.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {item.photos} fotoğraf BLAAG ekibi tarafından incelendi.
                  </p>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Fotoğraf kanıtları" icon={Camera}>
            <div className="grid grid-cols-2 gap-3">
              {demoGallery.slice(0, 4).map((photo) => (
                <div key={photo.id} className="aspect-[4/3] border border-border bg-soft p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
                    {photo.stage}
                  </p>
                  <p className="mt-8 text-sm font-medium text-muted">{photo.area}</p>
                  <p className="mt-1 text-xs text-muted">{photo.date}</p>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <Panel title="Belgeler" icon={FileText}>
            <CompactList
              items={demoDocuments.slice(0, 4).map((item) => [
                item.name,
                item.status
              ])}
            />
          </Panel>
          <Panel title="Ödeme özeti" icon={WalletCards}>
            <CompactList
              items={demoPaymentPlan.map((item) => [
                item.title,
                `${item.amount} · ${item.status}`
              ])}
            />
          </Panel>
          <Panel title="Talepler" icon={MessageCircle}>
            <CompactList
              items={demoRequests.map((item) => [
                item.type,
                `${item.area} · ${item.status}`
              ])}
            />
          </Panel>
        </section>

        <section className="mt-8 bg-soft p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-black/35">
                Teslim & garanti
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                {demoWarranty.completionStatus}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted">
                Teslim tarihi {demoWarranty.deliveryDate}. Garanti başlangıcı
                teslim kapanışı sonrasında paylaşılacaktır.
              </p>
            </div>
            <span className={statusChipClass(demoWarranty.completionStatus)}>
              {demoWarranty.completionStatus}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="border border-border bg-surface p-5 shadow-sm shadow-black/5">
      <p className="text-xs uppercase tracking-[0.16em] text-black/35">{title}</p>
      <p className="mt-3 font-semibold">{value}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <section className="border border-border bg-surface p-5 shadow-sm shadow-black/5">
      <div className="flex items-center gap-3">
        <Icon className="text-gold" size={22} />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CompactList({ items }) {
  return (
    <div className="grid gap-3">
      {items.map(([label, value]) => (
        <div key={label} className="border-b border-border pb-3 last:border-b-0 last:pb-0">
          <p className="font-medium">{label}</p>
          <p className="mt-1 text-sm text-muted">{value}</p>
        </div>
      ))}
    </div>
  );
}

function InfoLine({ label, value, dark = false }) {
  return (
    <div>
      <p className={dark ? "text-xs uppercase tracking-[0.16em] text-white/35" : "text-xs uppercase tracking-[0.16em] text-black/35"}>
        {label}
      </p>
      <p className={dark ? "mt-1 font-medium text-white" : "mt-1 font-medium"}>
        {value}
      </p>
    </div>
  );
}
