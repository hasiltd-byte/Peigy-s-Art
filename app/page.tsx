import Image from "next/image";
import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import Gallery from "@/components/Gallery";
import Shop from "@/components/Shop";
import RotatingArt from "@/components/RotatingArt";
import Motion from "@/components/Motion";
import { ArrowLeft, ArrowUpLeft, Pin, Phone, WhatsappIcon } from "@/components/Icons";
import { introMessage, siteUrl, studio, whatsappUrl } from "@/lib/site";
import { facebookUrl } from "@/lib/art";

const workshops = [
  { title: "פסיפס", english: "MOSAIC", num: "01", description: "לתת לכל חלק קטן את המקום שלו, ולגלות יחד תמונה שלמה.", image: "/images/photos/mosaic.webp", alt: "פסיפס גאומטרי צבעוני להמחשת טכניקת העבודה" },
  { title: "מקרמה", english: "MACRAMÉ", num: "02", description: "קשר אחרי קשר. חוטים טבעיים, קצב רגוע ומשהו יפה שנולד בידיים.", image: "/images/photos/craft-table.webp", alt: "כלים וחוטים למלאכת המקרמה" },
  { title: "ציור וצבע", english: "PAINTING", num: "03", description: "לערבב, להתנסות ולהעז. לתת לצבע לקחת אתכם למקום חדש.", image: "/images/photos/painting-hands.webp", alt: "יד אוחזת במכחול ומציירת פרחים" },
];
const faq = [
  { q: "צריך ניסיון קודם כדי ליצור?", a: "אפשר לפנות גם אם זו הפעם הראשונה שלכם עם החומר. נתאם עם פייגי את התחום ואת אופי הפעילות שמתאימים לכם." },
  { q: "איך מתאמים סדנה לקבוצה?", a: "שלחו לפייגי את מספר המשתתפים, המועד הרצוי והחומר שמסקרן אתכם. יחד תבררו מתכונת, מיקום, זמינות ומחיר." },
  { q: "איך מזמינים יצירה מהחנות?", a: "מוסיפים לבקשה את הכיוונים שאהבתם ופותחים פנייה בוואטסאפ. פייגי תאשר את האפשרויות, המחיר ואופן האספקה לפני הזמנה ותשלום." },
  { q: "איפה אפשר לראות עוד עבודות של פייגי?", a: "בעמוד הפייסבוק Feigy's Studio — בסטודיו עם פייגי תמצאו את החומרים שפייגי משתפת. הקישור לעמוד נמצא כאן באתר." },
];
const jsonLd = {
  "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${siteUrl}/#business`,
  name: studio.name, description: studio.description, telephone: `+${studio.phoneE164}`,
  url: siteUrl, image: `${siteUrl}/images/photos/feigy-studio.webp`, sameAs: [facebookUrl],
  address: { "@type": "PostalAddress", streetAddress: "מצפה קדם 75ב", addressLocality: "עתניאל", addressCountry: "IL" },
};

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="overline"><span className="label-dot" />{children}<span className="label-number">/ {number}</span></p>;
}

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <Header />
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <Image className="hero-image" src="/images/photos/painting-hands.webp" alt="תקריב של תהליך ציור פרחים במכחול — צילום להשראה" fill priority fetchPriority="high" decoding="sync" sizes="100vw" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-eyebrow"><span /> בסטודיו עם פייגי · אמנות, חומר ויצירה</p>
          <h1 id="hero-title">יש דברים<br />שרק <em>הידיים</em><br />יודעות לספר<span className="hero-period">.</span></h1>
          <p className="hero-intro">מקום להיפגש עם החומר, לתת לדמיון מקום,<br className="desktop-break" /> וליצור משהו שיש בו קצת מכם.</p>
          <div className="hero-actions"><a className="button button-cream" href="#gallery">לגלות את היצירה <ArrowUpLeft size={18} /></a><a className="hero-text-link" href="#workshops">רגע של יצירה בשבילכם <ArrowLeft size={17} /></a></div>
        </div>
        <div className="hero-seal" aria-hidden="true"><svg className="seal-ring" viewBox="0 0 120 120"><defs><path id="seal-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs><text><textPath href="#seal-circle" textLength="280" lengthAdjust="spacing">MADE BY HAND · MADE WITH HEART · </textPath></text></svg><span>f.</span></div>
        <div className="hero-bottom container"><span>FEIGY’S STUDIO — A SPACE TO CREATE</span><a href="#about">ממשיכים לגלות <span className="scroll-arrow" aria-hidden="true">↓</span></a><span className="hero-photo-note">צילום להשראה</span></div>
      </section>

      <div className="materials-marquee" aria-hidden="true"><div className="marquee-track">{[0, 1, 2, 3].map(index => <span className="marquee-group" key={index}>אמנות שעושים בידיים <i>✳</i> צבע שמרגישים בלב <i>✳</i> מקום לדמיון <i>✳</i></span>)}</div></div>

      <section className="about-section section" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="about-copy" data-reveal><SectionLabel number="01">נעים להכיר</SectionLabel><h2 id="about-title">מאחורי כל יצירה,<br />יש <em>עולם שלם.</em></h2><p className="about-lead">ברוכים הבאים לסטודיו של פייגי. מקום של יצירות ותהליכים, מפגש עם חומרים, ובעיקר — השראה.</p><p>בין צבע למכחול, בין חוט לקשר ובין חלקי פסיפס, נפתח מרחב להתנסות ולגלות. כאן אפשר לבחור סדנה, להכיר טכניקה חדשה או להתחיל שיחה על יצירה אישית.</p><blockquote>״ברוכים הבאים לסטודיו שלי, מקום בו אשתף יצירות ותהליכים. מקום להשראה.״<cite>פייגי · מתוך עמוד הסטודיו</cite></blockquote><a className="inline-link" href={facebookUrl} target="_blank" rel="noopener noreferrer">אל העולם של פייגי בפייסבוק <ArrowUpLeft size={18} /></a></div>
          <div className="about-visual" data-reveal><div className="about-main-photo"><Image src="/images/photos/craft-table.webp" alt="חוטים, עץ וכלי יצירה על שולחן — צילום להמחשת עולם החומרים" fill sizes="(max-width: 700px) 80vw, 43vw" loading="lazy" fetchPriority="low" /></div><div className="about-small-photo"><Image src="/images/photos/paint-colors.webp" alt="מבט מקרוב על מכחולים וצבעים" fill sizes="(max-width: 800px) 40vw, 20vw" loading="lazy" fetchPriority="low" /></div><span className="about-handwritten" aria-hidden="true">a little<br /><i>creative magic.</i></span><span className="about-image-note">חומר, תהליך והשראה · צילומי המחשה</span></div>
        </div>
      </section>

      <section className="gallery-section section" id="gallery" aria-labelledby="gallery-title"><div className="container"><div className="section-heading" data-reveal><div><SectionLabel number="02">מבט אל החומר</SectionLabel><h2 id="gallery-title">חומר. צורה. <em>סיפור.</em></h2></div><p className="section-lead">לפעמים צריך רק להתקרב.<br />למרקם, לפרטים, לאפשרויות שבדרך.</p></div><Gallery /></div></section>

      <section className="object-section" aria-labelledby="object-title"><div className="container object-grid"><div className="object-copy" data-reveal><SectionLabel number="03">זווית חדשה על יצירה</SectionLabel><h2 id="object-title">יופי נמצא<br /><em>בכל זווית.</em></h2><p>המרקם, הצבע, המפגש בין החלקים.<br />תנו ליצירה להסתובב, עצרו רגע,<br />וגלו אותה בקצב שלכם.</p><a className="button button-outline-light" href="#shop">משהו יפה גם בשבילכם <ArrowUpLeft size={18} /></a><span className="object-footnote">הדמיית מסגרת בתלת־ממד עם צילום להשראה.</span></div><RotatingArt /></div><span className="object-background-word" aria-hidden="true" /></section>

      <section className="workshops-section section" id="workshops" aria-labelledby="workshops-title"><div className="container"><div className="section-heading" data-reveal><div><SectionLabel number="04">בואו ליצור</SectionLabel><h2 id="workshops-title">פחות מסכים.<br /><em>יותר ידיים.</em></h2></div><div className="section-lead"><p>לצאת קצת מהשגרה. לפגוש חומר חדש.<br />ולחזור עם משהו שיצרתם בעצמכם.</p><a href="#contact" className="inline-link">נתאים לכם רגע של יצירה <ArrowLeft size={17} /></a></div></div><div className="workshops-grid">{workshops.map(workshop => <article className="workshop-card" key={workshop.num} data-reveal><a className="workshop-photo" href={whatsappUrl(`שלום פייגי, אשמח לפרטים על סדנת ${workshop.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`פרטים ותיאום סדנת ${workshop.title}`}><Image src={workshop.image} alt={workshop.alt} fill sizes="(max-width: 700px) 45vw, 33vw" loading="lazy" fetchPriority="low" /><span className="workshop-number">{workshop.num}</span><span className="workshop-photo-link"><ArrowUpLeft size={24} /></span></a><div className="workshop-copy"><span className="workshop-english">{workshop.english}</span><h3>{workshop.title}</h3><p>{workshop.description}</p><a className="inline-link" href={whatsappUrl(`שלום פייגי, אשמח לפרטים על סדנת ${workshop.title}.`)} target="_blank" rel="noopener noreferrer">זה מסקרן אותי <ArrowLeft size={17} /></a></div></article>)}</div><div className="more-workshops"><span>עוד עולמות שאפשר לגלות:</span>{["ליבוד", "גרפיטי", "עיצוב פירות"].map(topic => <a key={topic} href={whatsappUrl(`שלום פייגי, אשמח לברר על סדנת ${topic}.`)} target="_blank" rel="noopener noreferrer">{topic} <ArrowUpLeft size={14} /></a>)}<small>כל פרטי הסדנה בתיאום עם פייגי · הצילומים להמחשה</small></div></div></section>

      <section className="statement-section"><div className="statement-photo"><Image src="/images/photos/paint-table.webp" alt="צבעים ומכחולים על שולחן עבודה — צילום להשראה" fill sizes="100vw" loading="lazy" fetchPriority="low" /></div><div className="statement-overlay" /><div className="container statement-copy" data-reveal><span className="statement-star" aria-hidden="true">✳</span><p>לא צריך לחכות להשראה.<br /><em>לפעמים היא מחכה לידיים שלכם.</em></p><a href="#contact" className="inline-link">בואו נמצא את ההתחלה שלכם <ArrowLeft size={18} /></a></div></section>

      <section className="shop-section section" id="shop" aria-labelledby="shop-title"><div className="container"><div className="section-heading" data-reveal><div><SectionLabel number="05">מהסטודיו, אליכם</SectionLabel><h2 id="shop-title">קצת אמנות.<br /><em>הרבה אופי.</em></h2></div><span className="shop-heading-note">THOUGHTFULLY CHOSEN.<br />PERSONALLY MADE.</span></div><Shop /></div></section>

      <section className="social-section"><div className="container social-grid"><div className="social-brand"><Image src="/images/photos/feigy-studio.webp" width={210} height={210} alt="הלוגו של פייגי כפי שמופיע בעמוד הפייסבוק של הסטודיו" loading="lazy" fetchPriority="low" /></div><div className="social-copy"><p className="overline">THE STUDIO, BETWEEN THE MOMENTS</p><h2>היצירה ממשיכה גם <em>שם.</em></h2><p>עוד עבודות, תהליכים ורגעים של השראה — בעמוד של פייגי בפייסבוק.</p><a href={facebookUrl} className="button button-dark" target="_blank" rel="noopener noreferrer">מציצים לסטודיו בפייסבוק <ArrowUpLeft size={18} /></a></div><span className="social-side" aria-hidden="true">FOLLOW THE PROCESS</span></div></section>

      <section className="faq-section section" id="faq" aria-labelledby="faq-title"><div className="container faq-grid"><div data-reveal><SectionLabel number="06">לפני שמתחילים</SectionLabel><h2 id="faq-title">מקום גם<br /><em>לשאלות.</em></h2><a href={`tel:+${studio.phoneE164}`} className="inline-link"><Phone size={17} /><span dir="ltr">{studio.phone}</span></a></div><div className="faq-list">{faq.map((item, index) => <details key={item.q}><summary><span className="faq-number">0{index + 1}</span>{item.q}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></div></section>

      <section className="contact-section section" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-copy" data-reveal><SectionLabel number="07">כל יצירה מתחילה בקשר</SectionLabel><h2 id="contact-title">יש לכם רעיון?<br /><em>תנו לו ידיים.</em></h2><p>סדנה, יצירה אישית או פשוט שאלה.<br />ספרו לפייגי מה אתם מדמיינים.</p><div className="contact-methods"><a href={`tel:+${studio.phoneE164}`}><Phone size={20} /><span dir="ltr">{studio.phone}</span><ArrowUpLeft size={17} /></a><a href="https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%A6%D7%A4%D7%94%20%D7%A7%D7%93%D7%9D%2075%D7%91%20%D7%A2%D7%AA%D7%A0%D7%99%D7%90%D7%9C" target="_blank" rel="noopener noreferrer"><Pin size={20} />{studio.address}<ArrowUpLeft size={17} /></a></div><span className="contact-signature" aria-hidden="true">Let’s make<br /><i>something meaningful.</i></span></div><div className="contact-form-wrap"><p className="overline">A CONVERSATION IS A GOOD START</p><h3>נעים להכיר.</h3><p className="form-intro">כמה מילים קטנות, ומשם נמשיך בוואטסאפ.</p><LeadForm /></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><a href="#top" className="footer-brand"><strong>בסטודיו עם <em>פייגי.</em></strong><span>חומר. צבע. נשמה.</span></a><div className="footer-links"><a href="#gallery">הגלריה</a><a href="#workshops">סדנאות</a><a href="#shop">החנות</a><a href={facebookUrl} target="_blank" rel="noopener noreferrer">פייסבוק <ArrowUpLeft size={13} /></a><a href="/accessibility/">נגישות</a><a href="/privacy/">פרטיות</a></div><a className="back-to-top" href="#top" aria-label="חזרה לראש העמוד">↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} בסטודיו עם פייגי</span><span>גרסת עיצוב להדגמה · צילומי ההשראה אינם עבודות הסטודיו</span><span>עיצוב ופיתוח <a href="https://www.mybizsite.co/" target="_blank" rel="noopener noreferrer">HASI Digital <ArrowUpLeft size={12} /></a></span></div></div></footer>
    <a className="floating-whatsapp" href={whatsappUrl(introMessage)} target="_blank" rel="noopener noreferrer" aria-label="שיחה עם פייגי בוואטסאפ"><WhatsappIcon size={25} /></a>
    <Motion />
  </>;
}
