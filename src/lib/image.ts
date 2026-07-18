export function promptImageUrl(promptId: string, variant?: number) {
  const url = new URL(`/api/prompt-image/${promptId}`, process.env.NEXTAUTH_URL || "http://localhost:3000");
  if (variant && variant > 0) url.searchParams.set("variant", String(variant));
  return url.pathname + url.search;
}

export function productImageUrl(slug: string) {
  return `/api/product-image/${slug}`;
}
