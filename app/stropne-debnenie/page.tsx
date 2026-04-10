import type { Metadata } from 'next';
import Image from 'next/image';

import { CtaBand } from '@/components/cta-band';
import { DebnienieTabs } from '@/components/debnenie-tabs';
import { FadeUp } from '@/components/fade-up';
import { GalleryGrid } from '@/components/gallery-grid';
import { PageHero } from '@/components/page-hero';
import { servicePages } from '@/data/site';

const pageData = servicePages.stropneDebnenie;

export const metadata: Metadata = {
  title: 'Stropné debnenie Bratislava | Systém PERI MULTIFLEX',
  description:
    'Prenájom stropného debnenia PERI MULTIFLEX v Bratislave. Nosníky GT 24, stojky PERI a DOKA, debniace dosky 3S. Kladačský plán a cenová ponuka zdarma.',
  keywords: [
    'stropné debnenie Bratislava',
    'prenájom debnenia Bratislava',
    'PERI MULTIFLEX',
    'nosník GT 24',
    'stropné stojky',
    'debniace dosky',
    'DOKA stojky',
    'systémové debnenie',
  ],
  openGraph: {
    title: 'Stropné debnenie Bratislava — Lemino s.r.o.',
    description: 'Systém PERI MULTIFLEX na prenájom v Bratislave. Nosníky, stojky, dosky. Kladačský plán v cene.',
    images: [{ url: '/media/debnenie_2-e1743107761381.jpg' }],
  },
};

export default function StropneDebneniePage() {
  const [overview, ...specBlocks] = pageData.sections;

  return (
    <main className="-mt-20 lg:-mt-24">
      <PageHero
        eyebrow={pageData.eyebrow}
        title={pageData.title}
        lead={pageData.lead}
        buttonLabel={pageData.callToActionLabel}
        buttonHref="/kontakt"
        image={pageData.heroImage}
      />

      <div className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-sand-50 shadow-[0_-20px_80px_rgba(21,18,14,0.12)]">
        {/* Overview — text on left, hero image on right */}
        <section className="section-space">
          <div className="site-shell">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <FadeUp>
                <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  {overview.title}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-muted">
                  {overview.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={100} className="site-card overflow-hidden p-3">
                <div className="overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={overview.images[0].src}
                    alt={overview.images[0].alt}
                    width={800}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Tab panel — spec blocks */}
        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-brand">
                Technické prvky
              </p>
              <h2 className="mb-10 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Z čoho sa systém skladá
              </h2>
            </FadeUp>
            <FadeUp delay={80}>
              <DebnienieTabs sections={specBlocks} />
            </FadeUp>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-brand">
                Realizácie
              </p>
              <h2 className="mb-10 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Debniace zostavy z praxe
              </h2>
            </FadeUp>
            <FadeUp delay={80} className="mt-0">
              <GalleryGrid items={pageData.gallery} />
            </FadeUp>
          </div>
        </section>

        <FadeUp>
          <CtaBand
            title="Potrebujete systém debnenia na mieru?"
            description="Zašlite nám informácie o pôdoryse, rozsahu a termíne realizácie. Navrhneme vhodnú skladbu aj prenájom."
            buttonLabel={pageData.callToActionLabel}
            buttonHref="/kontakt"
          />
        </FadeUp>
      </div>
    </main>
  );
}
