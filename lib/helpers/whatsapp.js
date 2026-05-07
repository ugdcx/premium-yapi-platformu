import { contactInfo } from "../data/contact";

export function createWhatsAppLink(message = contactInfo.whatsappMessages.default) {
  const text = encodeURIComponent(message || contactInfo.whatsappMessages.default);
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${text}`;
}

export function createServiceWhatsAppLink(serviceName) {
  return createWhatsAppLink(contactInfo.whatsappMessages.service(serviceName));
}

export function createProjectWhatsAppLink(projectName) {
  return createWhatsAppLink(contactInfo.whatsappMessages.project(projectName));
}
