const statusAliases = {
  "Ä°nceleniyor": "İnceleniyor",
  "Teklif HazÄ±r": "Teklif Hazır",
  "Teklif HazÄ±rlanÄ±yor": "Teklif Hazırlanıyor",
  "Teklif GÃ¶nderildi": "Teklif Gönderildi",
  "OnaylandÄ±": "Onaylandı",
  "TamamlandÄ±": "Tamamlandı",
  "AÃ§Ä±k": "Açık",
  "HazÄ±r": "Hazır",
  "Ã–dendi": "Ödendi",
  "YaklaÅŸan": "Yaklaşan",
  "Ä°ncelendi": "İncelendi",
  "Sahaya alÄ±ndÄ±": "Sahaya alındı",
  "YanÄ±tlandÄ±": "Yanıtlandı",
  "Revize Ä°stendi": "Revize İstendi",
  "SÃ¼resi Doldu": "Süresi Doldu",
  "Admin OnayÄ±nda": "Admin Onayında",
  "YayÄ±na HazÄ±r": "Yayına Hazır",
  "YayÄ±nlandÄ±": "Yayınlandı",
  "YayÄ±nda": "Yayında",
  "Ä°ÅŸ TamamlandÄ±": "İş Tamamlandı",
  "Ã–ncesi": "Öncesi",
  "SÃ¼reÃ§": "Süreç",
  "SonrasÄ±": "Sonrası"
};

const mutedStatuses = new Set([
  "Yeni",
  "Bekliyor",
  "Bekleniyor",
  "Planlama",
  "Taslak",
  "Öncesi",
  "Kontrol"
]);

const darkStatuses = new Set([
  "İnceleniyor",
  "Teklif Hazır",
  "Teklif Hazırlanıyor",
  "Teklif Gönderildi",
  "Uygulamada",
  "Devam Ediyor",
  "Yaklaşan",
  "İncelendi",
  "Tedarikte",
  "Yayına Hazır",
  "Yayında",
  "Süreç",
  "Malzeme",
  "Açık"
]);

const positiveStatuses = new Set([
  "Onaylandı",
  "Tamamlandı",
  "Teslim Tamamlandı",
  "Ödendi",
  "Yayınlandı",
  "Sahaya alındı",
  "Normal",
  "Hazır",
  "Sonrası"
]);

const cautionStatuses = new Set([
  "Eksik Bilgi",
  "Onay Bekliyor",
  "Onay bekliyor",
  "Teslime Hazırlanıyor",
  "Admin Onayında",
  "Malzeme Eksik"
]);

const dangerStatuses = new Set([
  "İptal",
  "Reddedildi",
  "Sorun",
  "Sorun Var",
  "Revize Gerekli",
  "Revize İstendi",
  "Süresi Doldu"
]);

export function normalizeStatus(status) {
  const value = String(status || "").trim();
  return statusAliases[value] || value;
}

export function statusChipClass(status) {
  const normalized = normalizeStatus(status);
  const base =
    "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium";

  if (positiveStatuses.has(normalized)) {
    return `${base} border-black/12 bg-white text-black`;
  }

  if (dangerStatuses.has(normalized)) {
    return `${base} border-black bg-black text-white`;
  }

  if (cautionStatuses.has(normalized)) {
    return `${base} border-black/16 bg-[#F3F3F1] text-black`;
  }

  if (darkStatuses.has(normalized)) {
    return `${base} border-black/10 bg-[#111111] text-white`;
  }

  if (mutedStatuses.has(normalized)) {
    return `${base} border-black/10 bg-[#F7F7F5] text-black/68`;
  }

  return `${base} border-black/10 bg-[#F7F7F5] text-black/68`;
}
