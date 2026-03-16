import type { MetadataRoute } from "next";

const DEFAULT_SITE_URL = "http://localhost:3000";

const sitemap = (): MetadataRoute.Sitemap => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/main`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/deck`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/post`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/join`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
};

export default sitemap;
