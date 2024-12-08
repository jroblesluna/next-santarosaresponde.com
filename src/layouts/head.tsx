import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" property="og:title" content={siteConfig.name} />
      <meta property="og:description" content={siteConfig.description} />
      <meta name="description" content={siteConfig.description} />
      <meta property="og:url" content="https://www.santarosaresponde.com" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://www.santarosaresponde.com/images/santarosa.png"
      />

      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
    </NextHead>
  );
};
