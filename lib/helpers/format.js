export function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(value, options = {}) {
  if (!value) return "Tarih belirtilmedi";

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options
  }).format(new Date(value));
}

export function formatDateTime(value) {
  return formatDate(value, {
    hour: "2-digit",
    minute: "2-digit"
  });
}
