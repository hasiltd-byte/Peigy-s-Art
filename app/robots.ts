import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function robots():MetadataRoute.Robots {
 return {
  rules: [
   { userAgent: ["WhatsApp", "facebookexternalhit", "Facebot"], allow: "/" },
   { userAgent: "*", disallow: "/" },
  ],
  sitemap: `${siteUrl}/sitemap.xml`,
 };
}
// DEMO ONLY. Before approved launch: replace disallow with allow and change metadata robots in layout.tsx.
