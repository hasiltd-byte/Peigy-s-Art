# תמונת השיתוף בוואטסאפ

נוצרה ב־1.11.2026 באמצעות כלי image_gen המובנה, בהרכבת כרטיס שיתוף על בסיס הלוגו הקיים וצילום הציור מהאתר. זהו גרפיקת שיווק, לא תיעוד מקורי של עבודות הסטודיו.

- קובץ לשימוש באתר: `public/og-feigy-studio-v2.jpg`.
- גודל: 1200×630 פיקסלים, JPEG, כ־115KB.
- נוסח הבקשה המלא לכלי היצירה: [og-feigy-studio-prompt.txt](./og-feigy-studio-prompt.txt).
- הגדרות השיתוף: `app/layout.tsx`, כולל Open Graph, סוג התמונה, המידות, תיאור חלופי ו־Twitter Card.

## תיקון כתובת התמונה

הקוד הקודם השתמש ב־`https://example.com` כשלא הוגדר `NEXT_PUBLIC_SITE_URL`. לכן גם כתובת תמונת השיתוף נוצרה תחת דומיין הדוגמה.

כעת `lib/site-url.ts` בוחר כתובת לפי הסדר הבא:

1. `NEXT_PUBLIC_SITE_URL`, אם זו כתובת תקינה שאינה דומיין דוגמה.
2. `VERCEL_PROJECT_PRODUCTION_URL` — הדומיין שמספקת Vercel בזמן הבנייה.
3. `VERCEL_URL` — כתובת הפריסה, אם כתובת הייצור אינה זמינה.
4. כתובת האתר המאומתת בפרויקט: `https://peigysart.mybizsite.co`.

בדומיין מותאם אישית אפשר להגדיר את `NEXT_PUBLIC_SITE_URL` ב־Vercel ולבצע פריסה חדשה. אחרת אין צורך להעתיק את כתובת הדוגמה מקובץ הסביבה.

בנוסף, `robots.txt` מאפשר גישה לסורקי שיתוף של WhatsApp ופייסבוק, תוך שמירת הגדרת ההדגמה הקיימת לשאר הסורקים.

התמונה קיבלה שם קובץ חדש כדי להפריד אותה מתמונת השיתוף הקודמת. השינויים המקומיים צריכים להיכנס לקומיט ולפריסה כדי להשפיע על כתובת האתר הציבורית. תצוגות מקדימות שכבר נשלחו עשויות להישאר במטמון של שירות השיתוף.

בדיקה מול האתר הציבורי ב־1.11.2026 אישרה ש־`og:image` עדיין הפנה ל־`https://example.com/og-studio.jpg`, בעוד שתמונת המקור עצמה זמינה בדומיין האתר. תמונת השיתוף החדשה תחזיר 404 עד לפריסת העדכון. בבדיקת הבנייה המקומית של העדכון נבדקת הכתובת המלאה תחת הדומיין המאומת.

מקורות הגדרות: [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables#vercel_project_production_url), [Next.js metadataBase and Open Graph](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase).
