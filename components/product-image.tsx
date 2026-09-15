"use client";

import { useState } from "react";

export function ProductImage({ src, alt, className = "", priority = false }: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onLoad={() => setLoaded(true)}
      className={`product-image ${loaded ? "is-loaded" : ""} ${className}`}
    />
  );
}
