export const contactInfo = {
  brandName: "BLAAG Construction and Architecture",
  phoneLabel: "+90 532 000 00 00",
  phoneHref: "+905320000000",
  whatsappNumber: "905320000000",
  email: "info@blaag.com.tr",
  region: "Sakarya, Kocaeli, İstanbul Anadolu Yakası ve çevre bölgeler",
  workingHours: "Pazartesi - Cumartesi, 09:00 - 18:00",
  whatsappMessages: {
    default:
      "Merhaba, BLAAG üzerinden bilgi almak istiyorum. Projem hakkında görüşebilir miyiz?",
    service: (serviceName) =>
      `Merhaba, BLAAG üzerinden ${serviceName} hakkında bilgi almak istiyorum.`,
    project: (projectName) =>
      `Merhaba, bu projeye benzer bir çalışma için bilgi almak istiyorum: ${projectName}`
  }
};
