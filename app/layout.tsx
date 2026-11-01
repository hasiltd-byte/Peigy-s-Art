import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl, studio } from "@/lib/site";

export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#394536" };

export const metadata: Metadata = {
 metadataBase: new URL(siteUrl),
 title: { default: "בסטודיו עם פייגי | אמנות, סדנאות ויצירה אישית", template:"%s | בסטודיו עם פייגי" },
 description: studio.description,
 keywords: ["סדנאות אמנות", "סדנאות יצירה", "פסיפס", "גרפיטי", "ליבוד", "מקרמה", "ציור", "עיצוב פירות", "סדנאות בעתניאל", "עתניאל"],
 alternates: { canonical:"/" },
 openGraph: { type:"website", locale:"he_IL", title:"בסטודיו עם פייגי | מקום להיפגש עם היצירה", description:studio.description, url:siteUrl, siteName:studio.name, images:[{url:"/og-studio.jpg",width:1200,height:630,alt:"תהליך ציור במכחול — צילום להשראה"}] },
 twitter: {card:"summary_large_image",images:["/og-studio.jpg"]},
 robots: { index:false,follow:false }, // DEMO: change only after owner approval and final domain config.
 icons: {icon:"/favicon.png"},
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="he" dir="rtl"><head><link rel="preload" href="/fonts/font-1.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-4.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body><a href="#main" className="skip-link">דילוג לתוכן הראשי</a>{children}</body></html>
}
