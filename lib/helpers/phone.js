export function normalizePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("0090") && digits.length === 14) return digits.slice(4);
  if (digits.startsWith("90") && digits.length === 12) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) return digits.slice(1);
  if (digits.startsWith("5") && digits.length === 10) return digits;

  return digits;
}

export function validateTurkishPhone(value) {
  return validateOfferPhone(value).valid;
}

export function validateOfferPhone(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return { valid: false, normalizedPhone: "", error: "Telefon numarası zorunludur." };
  }

  if (/[a-zA-Z]/.test(trimmed)) {
    return {
      valid: false,
      normalizedPhone: "",
      error: "Lütfen geçerli bir cep telefonu numarası girin."
    };
  }

  const compact = trimmed.replace(/\s/g, "");
  const acceptedPattern = /^(\+905\d{9}|00905\d{9}|05\d{9}|5\d{9})$/;
  if (!acceptedPattern.test(compact)) {
    return {
      valid: false,
      normalizedPhone: "",
      error: "Lütfen geçerli bir cep telefonu numarası girin."
    };
  }

  const normalizedPhone = normalizePhone(compact);
  if (!/^5\d{9}$/.test(normalizedPhone)) {
    return {
      valid: false,
      normalizedPhone: "",
      error: "Lütfen geçerli bir cep telefonu numarası girin."
    };
  }

  const fakeNumbers = new Set([
    "1234567890",
    "0123456789",
    "1111111111",
    "2222222222",
    "5555555555",
    "5000000000",
    "5012345678",
    "5551234567",
    "5555551212"
  ]);

  if (
    fakeNumbers.has(normalizedPhone) ||
    /^(\d)\1+$/.test(normalizedPhone) ||
    isSequential(normalizedPhone)
  ) {
    return {
      valid: false,
      normalizedPhone: "",
      error: "Bu telefon numarası gerçek bir başvuru için uygun görünmüyor."
    };
  }

  return { valid: true, normalizedPhone, error: "" };
}

function isSequential(value) {
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  return ascending.includes(value) || descending.includes(value);
}
