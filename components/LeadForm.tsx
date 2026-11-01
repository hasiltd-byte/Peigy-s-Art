"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, WhatsappIcon } from "./Icons";
import { whatsappUrl } from "@/lib/site";

const topics = ["פסיפס", "גרפיטי", "ליבוד", "מקרמה", "ציור", "עיצוב פירות", "יצירה בהזמנה אישית", "סדנה במתנה", "עדיין מתלבט/ת"];

export default function LeadForm(){
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [topic,setTopic]=useState(topics[0]);
  const [details,setDetails]=useState("");
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const msg = `שלום פייגי, הגעתי דרך האתר ואשמח לשמוע פרטים.\nשם: ${name.trim()}\nטלפון לחזרה: ${phone.trim()}\nתחום מעניין: ${topic}\nפרטים: ${details.trim() || "אשמח לשמוע פרטים"}`;
    // No server storage, emails or third-party tracking. WhatsApp opens after an explicit click.
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
  }
  return <form onSubmit={submit} className="lead-form" aria-label="פנייה לסדנה באמצעות וואטסאפ">
    <div className="field-row">
      <div className="field"><label htmlFor="lead-name">שם מלא</label><input id="lead-name" name="name" autoComplete="name" maxLength={80} required placeholder="איך קוראים לך?" value={name} onChange={e=>setName(e.target.value)}/></div>
      <div className="field"><label htmlFor="lead-phone">טלפון לחזרה</label><input id="lead-phone" name="phone" autoComplete="tel" type="tel" inputMode="tel" dir="ltr" minLength={9} maxLength={20} required placeholder="050-000-0000" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
    </div>
    <div className="field"><label htmlFor="lead-topic">מה מסקרן אותך ליצור?</label><select id="lead-topic" name="topic" value={topic} onChange={e=>setTopic(e.target.value)}>{topics.map(t=><option key={t}>{t}</option>)}</select></div>
    <div className="field"><label htmlFor="lead-details">ספרו לנו עוד קצת <span className="optional">(לא חובה)</span></label><textarea id="lead-details" name="details" rows={3} maxLength={600} placeholder="למי הסדנה, מספר משתתפים, מועד רצוי..." value={details} onChange={e=>setDetails(e.target.value)}/></div>
    <button type="submit" className="button button-dark button-wide"><WhatsappIcon/> פתיחת פנייה בוואטסאפ <ArrowLeft size={18}/></button>
    <p className="fine-print">הפרטים אינם נשמרים באתר. בלחיצה ייפתח WhatsApp עם הודעה מוכנה לשליחה, ורק לאחר שתאשרו אותה היא תישלח.</p>
  </form>
}
