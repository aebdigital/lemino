import type { Metadata } from 'next';
import Image from 'next/image';

import { ContactForm } from '@/components/contact-form';
import { FadeUp } from '@/components/fade-up';
import { PageHero } from '@/components/page-hero';
import { company, team } from '@/data/site';

export const metadata: Metadata = {
  title: 'Kontakt | Lemino s.r.o. Bratislava',
  description: 'Kontaktujte Lemino s.r.o. v Bratislave. Dopyt na lešenie, debnenie alebo výťah. Formulár, telefón, mapa.',
  keywords: ['kontakt Lemino', 'lešenie dopyt Bratislava', 'prenájom lešenia kontakt'],
};

export default function KontaktPage() {
  return (
    <main className="-mt-20 lg:-mt-24">
      <PageHero
        eyebrow="Kontakt"
        title="Ozvite sa nám"
        lead="Napíšte krátku správu, zavolajte alebo sa zastavte. Radi pripravíme riešenie aj cenovú ponuku na mieru."
        buttonLabel="Napísať správu"
        buttonHref="#form"
        image={{ src: '/media/uvodna-fotka.jpg', alt: 'Lemino s.r.o. — kontakt' }}
      />

      <div className="relative z-10 overflow-hidden rounded-t-[2.5rem] bg-sand-50 shadow-[0_-20px_80px_rgba(21,18,14,0.12)]">
        <section className="section-space" id="form">
          <div className="site-shell">
            <div className="mt-0 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <FadeUp className="site-card p-6 sm:p-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                      Sídlo firmy
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-ink">{company.legalName}</h2>
                    <p className="mt-4 text-base leading-8 text-muted">
                      {company.addressLine1}
                      <br />
                      {company.addressLine2}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] bg-sand-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Identifikačné údaje</p>
                      <div className="mt-3 space-y-2 text-sm leading-7 text-ink">
                        <p>IČO {company.ico}</p>
                        <p>DIČ {company.dic}</p>
                        <p>IČ DPH {company.icDph}</p>
                      </div>
                    </div>
                    <div className="rounded-[1.4rem] bg-sand-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Priamy kontakt</p>
                      <div className="mt-3 space-y-2 text-sm leading-7">
                        <p className="text-ink">Marián Hollý</p>
                        <p>
                          <a href={`mailto:${company.email}`} className="text-brand transition hover:text-brand-dark">
                            {company.email}
                          </a>
                        </p>
                        <p>
                          <a href={company.phoneHref} className="text-brand transition hover:text-brand-dark">
                            {company.phoneDisplay}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={100}>
                <ContactForm />
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell">
            <FadeUp>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.35em] text-brand">Tím</p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Ľudia, ktorí držia Lemino v chode
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                Od organizácie zákaziek cez administratívu až po technické vedenie na stavbe.
              </p>
            </FadeUp>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {team.map((member, i) => (
                <FadeUp key={member.name} delay={i * 80}>
                  <article className="site-card p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-18 w-18 overflow-hidden rounded-full">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-ink">{member.name}</h3>
                        <p className="text-sm font-medium text-brand">{member.role}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted">{member.bio}</p>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space pt-0">
          <div className="site-shell">
            <FadeUp className="site-card overflow-hidden p-3">
              <div className="overflow-hidden rounded-[1.6rem]">
                <iframe
                  src={company.mapsEmbed}
                  title={company.fullAddress}
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </main>
  );
}
