import Image from 'next/image';
import Link from 'next/link';

import { OpenCookieSettingsButton } from '@/components/open-cookie-settings-button';
import { company, navigation } from '@/data/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-sand-200 bg-ink text-sand-100">
      <div className="site-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div>
            <Image
              src="/media/logo_lemino_cele_biele.png"
              alt={`${company.name} logo`}
              width={220}
              height={64}
              className="h-auto w-[180px]"
            />
            <p className="mt-6 max-w-md text-sm leading-7 text-sand-300">
              Spoľahlivý partner pre prenájom lešenia, stropného debnenia, stavebných výťahov a
              sklzov. Staviame na zodpovednosti, bezpečnosti a skúsenostiach z reálnych stavieb.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Navigácia</p>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-sand-200 transition hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/ochrana-osobnych-udajov"
                  className="text-sm text-sand-200 transition hover:text-brand"
                >
                  Ochrana osobných údajov
                </Link>
              </li>
              <li>
                <OpenCookieSettingsButton className="text-sm text-sand-200 transition hover:text-brand" />
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Kontakt</p>
            <div className="mt-5 space-y-3 text-sm text-sand-200">
              <p>{company.legalName}</p>
              <p>{company.fullAddress}</p>
              <p>
                <a href={`mailto:${company.email}`} className="transition hover:text-brand">
                  {company.email}
                </a>
              </p>
              <p>
                <a href={company.phoneHref} className="transition hover:text-brand">
                  {company.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={company.facebook} className="transition hover:text-brand" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-sand-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
          <a
            href="https://aebdigital.sk"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-sand-200"
          >
            Tvorba webu — AEB Digital
          </a>
        </div>
      </div>
    </footer>
  );
}
