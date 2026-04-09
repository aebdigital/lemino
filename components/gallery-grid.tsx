'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Lightbox } from '@/components/lightbox';
import type { ImageItem } from '@/data/site';

type GalleryGridProps = {
  items: ImageItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, i) => (
          <figure
            key={item.src}
            onClick={() => setLightboxIndex(i)}
            className="site-card group cursor-zoom-in overflow-hidden border-sand-200 bg-white p-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </figure>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
