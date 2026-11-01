"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpLeft, MenuIcon, CloseIcon, BagIcon } from "./Icons";
import { facebookUrl } from "@/lib/art";

const links = [{ href: "#about", label: "הסיפור של פייגי" }, { href: "#gallery", label: "הגלריה" }, { href: "#workshops", label: "סדנאות" }, { href: "#shop", label: "החנות" }];

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return <>
    <div className="announcement"><span>קצת חומר. הרבה נשמה. ברוכים הבאים לסטודיו.</span><a href={facebookUrl} target="_blank" rel="noopener noreferrer">גם בפייסבוק <ArrowUpLeft size={13} /></a></div>
    <header className="site-header" id="top">
      <div className="header-inner container">
        <a href="#top" className="brand"><Image src="/images/photos/feigy-studio.webp" width={66} height={66} alt="" /><span className="brand-copy"><strong>בסטודיו עם <em>פייגי</em></strong><small aria-hidden="true">ART, CRAFT & A LITTLE MAGIC</small></span></a>
        <nav id="main-navigation" className={`primary-nav${open ? " nav-open" : ""}`} aria-label="ניווט ראשי">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}<a href="#contact" className="mobile-contact" onClick={() => setOpen(false)}>בואו נדבר</a></nav>
        <div className="header-actions"><a href="#shop" className="header-bag" aria-label="לחנות הסטודיו"><BagIcon size={21} /></a><a href="#contact" className="header-cta">ניצור משהו יחד <ArrowUpLeft size={17} /></a><button type="button" className="mobile-menu" aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <CloseIcon /> : <MenuIcon />}</button></div>
      </div>
    </header>
  </>;
}
