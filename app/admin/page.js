import AdminKanban from "./AdminKanban";
import { redirect } from "next/navigation";

import { AdminAuthError, requireAdminSession } from "../../src/lib/auth/requireAdminSession";

export const metadata = {
  title: "BLAGG Control",
  description:
    "BLAGG Control başvurular, teklifler, projeler, müşteriler, ustalar, fotoğraf onayları, finans ve belgeler."
};

export default async function AdminPage() {
  try {
    await requireAdminSession();
  } catch (error) {
    if (error instanceof AdminAuthError && error.code === "AUTH_REQUIRED") {
      redirect("/control?next=/admin");
    }

    if (error instanceof AdminAuthError && error.code === "AUTH_CHECK_FAILED") {
      return (
        <AdminAccessMessage
          title="Erişim kontrolü tamamlanamadı."
          text="Yönetim erişimi şu anda doğrulanamıyor. Lütfen kısa süre sonra tekrar deneyin."
        />
      );
    }

    return (
      <AdminAccessMessage
        title="Erişim yetkisi yok."
        text="Bu alan yalnızca yetkili BLAGG Studio ekip üyeleri için açıktır."
      />
    );
  }

  return <AdminKanban />;
}

function AdminAccessMessage({ title, text }) {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-10 text-[#111111]">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/10 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-black/42">
          BLAGG Control
        </p>
        <h1 className="mt-4 text-[2.4rem] leading-tight">{title}</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-black/58">
          {text}
        </p>
      </div>
    </main>
  );
}
