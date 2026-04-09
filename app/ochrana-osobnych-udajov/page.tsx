import type { Metadata } from 'next';

import { SectionHeading } from '@/components/section-heading';
import { company, privacySections } from '@/data/site';

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Zásady ochrany osobných údajov pre Lemino s.r.o. vrátane informácií o kontaktnom formulári a súboroch cookies.',
};

export default function OchranaOsobnychUdajovPage() {
  return (
    <main>
      <section className="section-space">
        <div className="site-shell">
          <SectionHeading
            eyebrow="Právne informácie"
            title="Ochrana osobných údajov"
            description="Prehľad spracúvania osobných údajov pri kontakte cez web, používaní cookies a uplatňovaní práv podľa GDPR."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="site-card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">Prevádzkovateľ</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-muted">
                <p className="text-base font-medium text-ink">{company.legalName}</p>
                <p>{company.fullAddress}</p>
                <p>IČO: {company.ico}</p>
                <p>DIČ: {company.dic}</p>
                <p>
                  E-mail:{' '}
                  <a href={`mailto:${company.email}`} className="text-brand transition hover:text-brand-dark">
                    {company.email}
                  </a>
                </p>
                <p>
                  Telefón:{' '}
                  <a href={company.phoneHref} className="text-brand transition hover:text-brand-dark">
                    {company.phoneDisplay}
                  </a>
                </p>
                <p>Tieto zásady nadobúdajú účinnosť dňom 8. 6. 2025.</p>
              </div>
            </aside>

            <div className="space-y-6">
              {privacySections.map((section) => (
                <section key={section.title} className="site-card p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.title}</h2>
                  <div className="mt-5 space-y-4 text-sm leading-8 text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
