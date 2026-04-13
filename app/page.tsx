import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CtaBand } from '@/components/cta-band';
import { FadeUp } from '@/components/fade-up';
import { GalleryGrid } from '@/components/gallery-grid';
import { HomeHero } from '@/components/home-hero';
import { SectionHeading } from '@/components/section-heading';
import { homeGallery, homeServicePreviews, reasons, stats } from '@/data/site';

export const metadata: Metadata = {
  title: 'Lemino | Lešenie, debnenie a výťahy Bratislava',
  description:
    'Prenájom lešenia, stropného debnenia, stavebných výťahov a sklzov v Bratislave a okolí. Montáž, demontáž, poradenstvo. Rýchle nasadenie, férová cena.',
  alternates: { canonical: 'https://www.lemino.sk' },
  openGraph: {
    title: 'Lemino — Lešenie, debnenie a výťahy Bratislava',
    description:
      'Prenájom lešenia, stropného debnenia, stavebných výťahov a sklzov v Bratislave a okolí. Montáž, demontáž, poradenstvo. Rýchle nasadenie, férová cena.',
    url: 'https://www.lemino.sk',
    images: [{ url: '/media/uvodna-fotka.jpg', width: 1200, height: 630, alt: 'Lešenie, debnenie a výťahy — Lemino Bratislava' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lemino — Lešenie, debnenie a výťahy Bratislava',
    description:
      'Prenájom lešenia, stropného debnenia a stavebných výťahov v Bratislave. Rýchle nasadenie, férová cena.',
    images: ['/media/uvodna-fotka.jpg'],
  },
};

export default function HomePage() {
  return (
    <main className="-mt-20 lg:-mt-24">
      <HomeHero />

      <div className="relative z-10 -mt-14 overflow-hidden rounded-t-[2.5rem] bg-sand-50 shadow-[0_-25px_100px_rgba(21,18,14,0.18)]">
        <section id="sluzby" className="section-space pt-16 sm:pt-20 lg:pt-24">
          <div className="site-shell">
            <FadeUp>
              <SectionHeading
                eyebrow="Naše služby"
                title="S čím vám vieme pomôcť?"
                description="Každú zákazku navrhujeme podľa reálneho priebehu stavby, nie podľa univerzálnej šablóny."
              />
            </FadeUp>

            <div className="mt-10 grid gap-1 lg:grid-cols-3">
              {homeServicePreviews.map((service, i) => (
                <FadeUp key={service.href} delay={i * 80}>
                  <Link href={service.href} className="group block">
                    <article className="relative overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* brand-tinted dark gradient */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,21,16,0.94)_0%,rgba(23,21,16,0.52)_45%,rgba(212,136,34,0.14)_100%)]" />
                        {/* text overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-semibold tracking-tight text-white">
                            {service.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-sand-200 line-clamp-2">
                            {service.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-3">
                            Viac informácií
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <FadeUp>
                <SectionHeading
                  eyebrow="Prečo Lemino"
                  title="Bezpečnosť, rozum a riešenie na mieru"
                  description="Nie sme len požičovňa techniky. Pomáhame navrhnúť nasadenie tak, aby stavba napredovala hladko."
                />
              </FadeUp>
              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason, i) => (
                  <FadeUp key={reason} delay={i * 60}>
                    <div className="site-card p-5">
                      <p className="text-base leading-7 text-ink">{reason}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <div className="rounded-[2rem] bg-ink px-6 py-8 text-sand-50 shadow-[0_30px_120px_rgba(20,16,12,0.35)] sm:px-10">
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
                      style={{ animation: `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms both` }}
                    >
                      <p className="text-3xl font-semibold text-brand sm:text-4xl">{stat.value}</p>
                      <p className="mt-3 text-sm uppercase tracking-[0.25em] text-sand-200">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <SectionHeading
                eyebrow="Naša práca"
                title="Pozrite sa na naše projekty"
                description="Výber realizácií z lešení, debnenia a stavebných riešení, ktoré sme pripravovali pre klientov."
              />
            </FadeUp>
            <FadeUp delay={100} className="mt-10">
              <GalleryGrid items={homeGallery} />
            </FadeUp>
          </div>
        </section>

        <FadeUp>
          <CtaBand
            title="Ste pripravení na úspešnú spoluprácu?"
            description="Kontaktujte nás telefonicky alebo mailom a pripravíme pre vás riešenie priamo na mieru za férovú cenu."
            buttonLabel="Napísať dopyt"
            buttonHref="/kontakt"
          />
        </FadeUp>
      </div>
    </main>
  );
}
