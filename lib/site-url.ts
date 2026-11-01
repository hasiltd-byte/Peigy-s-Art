// Resolve at build time: the static export must contain public, absolute URLs
// for social crawlers, even when no custom domain has been configured yet.
export function resolveSiteUrl(environment: Record<string, string | undefined>): string {
  const candidates = [
    environment.NEXT_PUBLIC_SITE_URL,
    environment.VERCEL_PROJECT_PRODUCTION_URL,
    environment.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      if (!["http:", "https:"].includes(url.protocol)) continue;
      // Ignore copied sample values so they cannot override Vercel's domain.
      if (/^(www\.)?example\.(com|org|net)$/i.test(url.hostname)) continue;
      return url.origin;
    } catch {
      // Try the platform-provided URL when a custom value is malformed.
    }
  }

  return "http://localhost:3000";
}
