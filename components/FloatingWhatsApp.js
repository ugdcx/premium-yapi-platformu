import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../lib/helpers/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={createWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile BLAAG'a mesaj gönder"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.28)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6 sm:h-16 sm:w-auto sm:px-5"
    >
      <MessageCircle size={24} />
      <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm sm:font-semibold">
        WhatsApp
      </span>
    </a>
  );
}
