import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/me"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};

export default robots;
