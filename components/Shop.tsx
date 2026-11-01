"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { shopItems } from "@/lib/art";
import { whatsappUrl } from "@/lib/site";
import { ArrowLeft, BagIcon, CloseIcon, PlusIcon, WhatsappIcon } from "./Icons";

export default function Shop() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const selected = shopItems.filter(item => quantities[item.id] > 0);
  const count = selected.reduce((sum, item) => sum + quantities[item.id], 0);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previous; };
    }
    dialog.current?.close();
  }, [open]);
  function add(id: string, title: string) {
    setQuantities(current => ({ ...current, [id]: Math.min((current[id] || 0) + 1, 20) }));
    setNotice(`${title} נוסף לבקשה`);
  }
  const message = `שלום פייגי, אשמח לברר זמינות ומחיר עבור:\n${selected.map(item => `• ${item.inquiry} × ${quantities[item.id]}`).join("\n")}\nאשמח לשמוע על האפשרויות, זמני ההכנה ואופן קבלת ההזמנה.`;
  return <>
    <div className="shop-topline"><p>בוחרים כיוון שאוהבים, ופייגי עוזרת להפוך אותו למשהו אישי.</p><button type="button" className="cart-trigger" onClick={() => setOpen(true)}><BagIcon size={18} /> הבקשה שלי <span className="cart-count">{count}</span></button></div>
    <div className="shop-grid">{shopItems.map((item, index) => <article className="shop-card" key={item.id}><div className="shop-photo"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 650px) 100vw, 33vw" loading="lazy" /><span className="shop-tag">{item.tag}</span><span className="shop-index">0{index + 1}</span></div><div className="shop-info"><h3>{item.title}</h3><p>{item.description}</p><div className="shop-card-bottom"><span>מחיר וזמינות בתיאום<small>התמונה להשראה</small></span><button type="button" className="add-to-cart" onClick={() => add(item.id, item.title)} aria-label={`${item.title} — ${"הוספה לבקשה"}`}><PlusIcon size={18} /><span>הוספה לבקשה</span></button></div></div></article>)}</div>
    <div className="shop-note"><span className="shop-status" role="status">{notice || "כל יצירה מתחילה בשיחה קטנה."}</span><p>ההזמנה מתואמת ישירות עם פייגי. מחיר, זמינות ופרטי האספקה יאושרו לפני תשלום.</p></div>
    {count > 0 && <button type="button" className="cart-floating" onClick={() => setOpen(true)}><BagIcon size={19} /><span>הבקשה שלי</span><b>{count}</b><ArrowLeft size={17} /></button>}
    <dialog className="cart-dialog" ref={dialog} onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} aria-labelledby="cart-title">
      <div className="cart-content"><div className="cart-heading"><div><p className="overline">A LITTLE SOMETHING, MADE FOR YOU</p><h2 id="cart-title">משהו יפה מתחיל כאן.</h2></div><button autoFocus type="button" className="icon-button" aria-label="סגירת סל הבקשות" onClick={() => setOpen(false)}><CloseIcon /></button></div>
        {count ? <><div className="cart-items">{selected.map(item => <div className="cart-item" key={item.id}><Image src={item.image} alt={item.alt} width={76} height={90} /><div className="cart-item-copy"><h3>{item.title}</h3><p>מחיר וזמינות בתיאום</p><button type="button" className="remove-item" onClick={() => setQuantities(current => ({ ...current, [item.id]: 0 }))}>הסרה</button></div><div className="quantity-controls"><button type="button" aria-label={`הפחתת כמות: ${item.title}`} onClick={() => setQuantities(current => ({ ...current, [item.id]: Math.max(0, current[item.id] - 1) }))}>−</button><output aria-label={`כמות ${item.title}`}>{quantities[item.id]}</output><button type="button" disabled={quantities[item.id] >= 20} aria-label={`הגדלת כמות: ${item.title}`} onClick={() => add(item.id, item.title)}>+</button></div></div>)}</div><p className="cart-explanation">נשלח לפייגי את הבחירות שלכם לבירור. זו פנייה להצעת מחיר — ההזמנה והתשלום יבוצעו רק לאחר תיאום ישיר.</p><a className="button button-dark button-wide" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer"><WhatsappIcon size={19} /> בירור והזמנה בוואטסאפ <ArrowLeft size={18} /></a></> : <div className="cart-empty"><BagIcon size={42} /><h3>מה תרצו ליצור?</h3><p>בחרו פריט מהחנות כדי להתחיל בקשה אישית לפייגי.</p><button type="button" className="button button-dark" onClick={() => setOpen(false)}>בחזרה לחנות <ArrowLeft size={17} /></button></div>}
      </div>
    </dialog>
  </>;
}
