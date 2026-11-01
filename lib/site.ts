import { resolveSiteUrl } from "./site-url";

export const studio = {
  name: "בסטודיו עם פייגי",
  shortName: "עם פייגי",
  phone: "052-613-6132",
  phoneE164: "972526136132",
  address: "מצפה קדם 75ב, עתניאל",
  city: "עתניאל",
  description: "סדנאות אמנות ויצירה: פסיפס, גרפיטי, ליבוד, מקרמה, ציור ועיצוב פירות. לפרטים ותיאום: 052-613-6132.",
  services: ["פסיפס", "גרפיטי", "ליבוד", "מקרמה", "ציור", "עיצוב פירות"],
  // This is a prospective design, not yet an approved official website.
  demo: true,
};

export const siteUrl = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});
export const whatsappUrl = (message: string) =>
  `https://wa.me/${studio.phoneE164}?text=${encodeURIComponent(message)}`;
export const introMessage = "שלום פייגי, הגעתי דרך האתר ואשמח לשמוע פרטים על הסדנאות.";
