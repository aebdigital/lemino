import type { Metadata } from 'next';
import Image from 'next/image';

import { CtaBand } from '@/components/cta-band';
import { FadeUp } from '@/components/fade-up';
import { GalleryGrid } from '@/components/gallery-grid';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { servicePages } from '@/data/site';

const pageData = servicePages.lesenie;

export const metadata: Metadata = {
  title: 'Prenájom lešenia Bratislava | Fasádne a mobilné lešenie',
  description:
    'Prenájom fasádneho a mobilného lešenia v Bratislave. Systémové lešenie PERI UP, hliníkové lešenia CUSTERS. Montáž, demontáž a projekt nasadenia. Zavolajte ešte dnes.',
  keywords: [
    'lešenie Bratislava',
    'prenájom lešenia Bratislava',
    'fasádne lešenie',
    'mobilné lešenie',
    'lešenárske práce',
    'PERI UP lešenie',
    'CUSTERS handy',
    'montáž lešenia',
  ],
  alternates: { canonical: 'https://www.lemino.sk/lesenie' },
  openGraph: {
    title: 'Prenájom lešenia Bratislava — Lemino s.r.o.',
    description: 'Fasádne a mobilné lešenie na prenájom v Bratislave. Systém PERI UP, hliníkové lešenia CUSTERS. Montáž a projekt v cene.',
    url: 'https://www.lemino.sk/lesenie',
    images: [{ url: '/media/lesenie_1-e1681134827533.jpg', width: 1200, height: 630, alt: 'Fasádne lešenie na prenájom — Lemino Bratislava' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prenájom lešenia Bratislava — Lemino s.r.o.',
    description: 'Fasádne a mobilné lešenie na prenájom v Bratislave. Systém PERI UP, CUSTERS. Montáž a projekt v cene.',
    images: ['/media/lesenie_1-e1681134827533.jpg'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Domov', item: 'https://www.lemino.sk' },
    { '@type': 'ListItem', position: 2, name: 'Prenájom lešenia Bratislava', item: 'https://www.lemino.sk/lesenie' },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.lemino.sk/lesenie#service',
  name: 'Prenájom lešenia Bratislava',
  description: 'Fasádne a mobilné lešenie na prenájom v Bratislave. Systém PERI UP, hliníkové lešenia CUSTERS. Montáž a projekt nasadenia.',
  provider: { '@id': 'https://www.lemino.sk/#business' },
  areaServed: { '@type': 'City', name: 'Bratislava' },
  serviceType: 'Prenájom lešenia',
};

export default function LeseniePage() {
  return (
    <main className="-mt-20 lg:-mt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageHero
        eyebrow={pageData.eyebrow}
        title={pageData.title}
        lead={pageData.lead}
        buttonLabel={pageData.callToActionLabel}
        buttonHref="/kontakt"
        image={pageData.heroImage}
      />

      <div className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-sand-50 shadow-[0_-20px_80px_rgba(21,18,14,0.12)]">
        {pageData.sections.map((section, index) => (
          <section key={section.title} className="section-space">
            <div className="site-shell">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <FadeUp className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <SectionHeading title={section.title} />
                  <div className="mt-6 space-y-4 text-base leading-8 text-muted">
                    {section.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="site-card p-4 text-sm leading-7 text-ink">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </FadeUp>

                <FadeUp delay={100} className={`grid items-start gap-4 ${section.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {section.images.map((image) => (
                    <div key={image.src} className="site-card overflow-hidden p-2">
                      <div className="overflow-hidden rounded-[1.3rem]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={600}
                          sizes="(max-width: 1024px) 100vw, 25vw"
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </FadeUp>
              </div>
            </div>
          </section>
        ))}

        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <SectionHeading
                eyebrow="Realizácie"
                title="Ukážky našej práce s lešením"
                description="Výber projektov, pri ktorých sme dodávali techniku aj montáž."
              />
            </FadeUp>
            <FadeUp delay={80} className="mt-10">
              <GalleryGrid items={pageData.gallery} />
            </FadeUp>
          </div>
        </section>

        <FadeUp>
          <CtaBand
            title="Potrebujete lešenie na konkrétnu stavbu?"
            description="Napíšte nám základné parametre projektu a pripravíme návrh nasadenia aj cenovú ponuku."
            buttonLabel={pageData.callToActionLabel}
            buttonHref="/kontakt"
          />
        </FadeUp>
      </div>
    </main>
  );
}
