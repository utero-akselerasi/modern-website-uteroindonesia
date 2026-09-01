// Centralized contact constants shared across Footer, Contact, and chatbot.

export const WHATSAPP = {
  allInformation: "6281999900900",
  csJasa: "6289621439416",
  csProduk: "62817388616",
  publicRelation: "6289517898767",
} as const;

export const EMAIL = {
  marketing: "marketingutero@gmail.com",
  branding: "uterobranding@gmail.com",
  info: "info@uteroindonesia.com",
} as const;

export const waLink = (phone: string) => `https://wa.me/${phone}`;

export const mailtoLink = (email: string) => `mailto:${email}`;
