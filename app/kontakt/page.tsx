import type { Metadata } from 'next';
import Image from 'next/image';

import { ContactForm } from '@/components/contact-form';
import { FadeUp } from '@/components/fade-up';
import { SectionHeading } from '@/components/section-heading';
import { company, team } from '@/data/site';

export const metadata: Metadata = {
  title: 'Kontakt | Lemino s.r.o. Bratislava',
  description: 'Kontaktujte Lemino s.r.o. v Bratislave. Dopyt na lešenie, debnenie alebo výťah. Formulár, telefón, mapa.',
  keywords: ['kontakt Lemino', 'lešenie dopyt Bratislava', 'prenájom lešenia kontakt'],
};

export default function KontaktPage() {
  return (
    <main>
      <section className="section-space">
        <div className="site-shell">
          <FadeUp>
            <SectionHeading
              eyebrow="Kontakt"
              title="Ozvite sa nám"
              description="Napíšte krátku správu, zavolajte alebo sa zastavte. Radi pripravíme riešenie aj cenovú ponuku na mieru."
            />
          </FadeUp>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
            <SectionHeading
              eyebrow="Tím"
              title="Ľudia, ktorí držia Lemino v chode"
              description="Od organizácie zákaziek cez administratívu až po technické vedenie na stavbe."
            />
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
    </main>
  );
}
