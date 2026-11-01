"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { artworks, facebookUrl } from "@/lib/art";
import { ArrowLeft, ArrowUpLeft, CloseIcon, PlusIcon } from "./Icons";

const filters = ["הכול", "ציור", "מקרמה", "פסיפס", "ליבוד"];

export default function Gallery() {
  const [filter, setFilter] = useState("הכול");
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = artworks.filter(art => filter === "הכול" || art.category === filter);
  const current = active === null ? null : visible[active];
  useEffect(() => {
    if (active !== null) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
    dialog.current?.close();
  }, [active]);
  function navigate(direction: number) { setActive(index => index === null ? null : (index + direction + visible.length) % visible.length); }
  return <>
    <div className="gallery-toolbar"><div className="gallery-filters" role="group" aria-label="סינון גלריה לפי חומר">{filters.map(item => <button type="button" key={item} className={filter === item ? "active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "הכול" && <sup>06</sup>}</button>)}</div><span className="gallery-count" aria-live="polite">{String(visible.length).padStart(2, "0")} מבטים אל היצירה</span></div>
    <div className="gallery-grid">{visible.map((art, index) => <button type="button" key={art.id} className={`gallery-item gallery-item-${art.shape}`} onClick={() => setActive(index)} title={`הגדלת התמונה: ${art.title}`}>
      <div className="gallery-photo"><Image src={art.image} alt={art.alt} fill sizes="(max-width: 700px) 45vw, 33vw" loading="lazy" fetchPriority="low" /><span className="gallery-zoom"><PlusIcon /></span><span className="photo-category">{art.category}</span></div><div className="gallery-caption"><div><h3>{art.title}</h3><p>{art.material}</p></div><ArrowUpLeft size={23} /></div>
    </button>)}</div>
    <div className="gallery-bottom"><p>צילומי השראה לחומרים ולטכניקות. לעבודות ולתהליכים של פייגי — בקרו בעמוד הסטודיו.</p><a className="inline-link" href={facebookUrl} target="_blank" rel="noopener noreferrer">היצירות של פייגי בפייסבוק <ArrowUpLeft size={17} /></a></div>
    <dialog ref={dialog} className="lightbox" onCancel={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => { if (event.key === "ArrowLeft") navigate(1); if (event.key === "ArrowRight") navigate(-1); }} aria-label={current ? `תמונת השראה: ${current.title}` : "תצוגת תמונה"}>
      {current && <div className="lightbox-inner"><button autoFocus type="button" className="lightbox-close icon-button" aria-label="סגירת תמונה" onClick={() => setActive(null)}><CloseIcon /></button><div className="lightbox-photo"><Image src={current.image} alt={current.alt} fill sizes="(max-width: 700px) 90vw, 75vw" /></div><div className="lightbox-footer"><div><h3>{current.title}</h3><p>{current.material} · צילום השראה</p></div><div className="lightbox-arrows"><button type="button" className="icon-button" onClick={() => navigate(-1)} aria-label="התמונה הקודמת"><ArrowLeft style={{ transform: "rotate(180deg)" }} /></button><span>{(active ?? 0) + 1} / {visible.length}</span><button type="button" className="icon-button" onClick={() => navigate(1)} aria-label="התמונה הבאה"><ArrowLeft /></button></div></div></div>}
    </dialog>
  </>;
}
