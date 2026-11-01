export const facebookUrl = "https://www.facebook.com/FeigysStudio/";

export const artworks = [
  { id: "painting", title: "רגע של צבע", category: "ציור", material: "מכחול, צבע ודמיון", image: "/images/photos/painting-hands.webp", alt: "תקריב של יד מציירת פרחים צבעוניים במכחול", shape: "tall" },
  { id: "macrame", title: "קשרים של חומר", category: "מקרמה", material: "חוטים טבעיים · עבודת יד", image: "/images/photos/macrame.webp", alt: "עבודות קיר במקרמה בגוונים טבעיים על קיר ירוק", shape: "regular" },
  { id: "mosaic", title: "שלם מכל החלקים", category: "פסיפס", material: "מפגש של צבע וצורה", image: "/images/photos/mosaic.webp", alt: "פרטי פסיפס גאומטרי מאריחים כחולים, אדומים וצהובים", shape: "regular" },
  { id: "felting", title: "רכות שאפשר להרגיש", category: "ליבוד", material: "צמר, מרקם ומשחק", image: "/images/photos/felting.webp", alt: "כדורי לבד צבעוניים ועיטורים בעבודת יד", shape: "tall" },
  { id: "materials", title: "לפני הקשר הראשון", category: "מקרמה", material: "מבט אל תהליך היצירה", image: "/images/photos/craft-table.webp", alt: "כלי יצירה וחוטים להכנת מקרמה מסודרים על שולחן", shape: "regular" },
  { id: "colors", title: "כל האפשרויות פתוחות", category: "ציור", material: "צבעים שמחכים לרעיון", image: "/images/photos/paint-colors.webp", alt: "מכחולים ופלטות צבע עשירות על שולחן עבודה", shape: "regular" },
] as const;

export const shopItems = [
  { id: "custom-macrame", title: "מקרמה עם אופי משלכם", tag: "לבית ולמרחב", description: "אוהבים חומר טבעי? בואו לבדוק יחד אפשרות ליצירת מקרמה בהזמנה אישית.", image: "/images/photos/macrame.webp", alt: "עבודות מקרמה טבעיות להשראה", inquiry: "יצירת מקרמה בהזמנה אישית" },
  { id: "custom-mosaic", title: "פסיפס, בדרך שלכם", tag: "צבע שנשאר", description: "צבעוניות, צורה ורעיון אישי. פנייה לתיאום יצירה בפסיפס ולבירור אפשרויות.", image: "/images/photos/mosaic.webp", alt: "פרטי פסיפס צבעוני להשראה", inquiry: "יצירת פסיפס בהזמנה אישית" },
  { id: "gift-workshop", title: "לתת רגע של יצירה", tag: "חוויה במתנה", description: "במקום עוד חפץ, זמן של צבע וחומר. פנייה לתיאום סדנה כמתנה למישהו אהוב.", image: "/images/photos/paint-table.webp", alt: "צבעים ומכחולים כהשראה לסדנת יצירה במתנה", inquiry: "סדנה במתנה" },
] as const;
