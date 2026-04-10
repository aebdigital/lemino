'use client';

import Image from 'next/image';
import { useState } from 'react';

type Section = {
  title: string;
  description: string[];
  bullets?: string[];
  images: { src: string; alt: string }[];
};

export function DebnienieTabs({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(0);
  const current = sections[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-0">
      {/* Left tab rail */}
      <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:border-r lg:border-sand-200 lg:pb-0 lg:pr-6">
        {sections.map((section, i) => (
          <button
            key={section.title}
            onClick={() => setActive(i)}
            className={`flex shrink-0 items-center justify-between gap-3 rounded-[1.2rem] px-5 py-3.5 text-left text-sm font-medium transition lg:w-full ${
              active === i
                ? 'bg-brand text-white shadow-[0_8px_24px_rgba(212,136,34,0.3)]'
                : 'bg-sand-100 text-ink hover:bg-sand-200 hover:text-brand'
            }`}
          >
            <span>{section.title}</span>
            <svg
              className={`h-4 w-4 shrink-0 transition-transform ${active === i ? 'text-white' : 'text-brand'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        ))}
      </div>

      {/* Right content panel */}
      <div className="lg:pl-10">
        <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{current.title}</h3>

        <div className="mt-4 space-y-3 text-base leading-8 text-muted">
          {current.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {current.bullets ? (
          <ul className="mt-6 space-y-2.5">
            {current.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-ink">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={`mt-8 grid items-start gap-4 ${current.images.length > 1 ? 'sm:grid-cols-2' : 'max-w-sm'}`}>
          {current.images.map((image) => (
            <div key={image.src} className="site-card overflow-hidden p-2">
              <div className="overflow-hidden rounded-[1.3rem]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
