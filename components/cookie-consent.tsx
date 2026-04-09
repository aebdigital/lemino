'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { OPEN_COOKIE_SETTINGS_EVENT } from '@/components/cookie-consent-events';

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
};

const STORAGE_KEY = 'lemino-cookie-preferences';

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
};

function Toggle({
  checked,
  disabled = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition ${
        checked
          ? 'border-brand bg-brand'
          : 'border-sand-300 bg-sand-200'
      } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasStoredPreferences, setHasStoredPreferences] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const storedPreferences = window.localStorage.getItem(STORAGE_KEY);
    if (storedPreferences) {
      try {
        const parsed = JSON.parse(storedPreferences) as Partial<CookiePreferences>;
        setPreferences({
          necessary: true,
          functional: Boolean(parsed.functional),
          analytics: Boolean(parsed.analytics),
        });
        setHasStoredPreferences(true);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    function openSettings() {
      setIsSettingsOpen(true);
    }

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  function savePreferences(nextPreferences: CookiePreferences) {
    const normalized = {
      ...nextPreferences,
      necessary: true,
    };

    setPreferences(normalized);
    setHasStoredPreferences(true);
    setIsSettingsOpen(false);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...normalized,
        updatedAt: new Date().toISOString(),
      }),
    );
  }

  function handleAcceptAll() {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
    });
  }

  function handleRejectOptional() {
    savePreferences({
      necessary: true,
      functional: false,
      analytics: false,
    });
  }

  function updatePreference(key: 'functional' | 'analytics') {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  if (!isMounted) {
    return null;
  }

  const shouldShowBanner = !hasStoredPreferences;

  return (
    <>
      {shouldShowBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[70] p-3 sm:p-5">
          <div className="mx-auto max-w-5xl rounded-[1.8rem] border border-white/70 bg-ink/95 p-5 text-sand-50 shadow-[0_30px_120px_rgba(18,15,12,0.5)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
                  Cookies
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  Vážime si vaše súkromie
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-sand-200">
                  Používame cookies na základnú funkčnosť webu a voliteľne aj na funkčné a
                  analytické účely. Nastavenia si môžete upraviť teraz alebo neskôr cez odkaz
                  v pätičke.
                </p>
                <p className="mt-3 text-sm text-sand-300">
                  Viac informácií nájdete na stránke{' '}
                  <Link href="/ochrana-osobnych-udajov" className="font-medium text-brand hover:text-sand-50">
                    Ochrana osobných údajov
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                <button type="button" onClick={() => setIsSettingsOpen(true)} className="btn-secondary inline-flex justify-center border-white/15 bg-white/10 text-white hover:border-brand hover:text-brand">
                  Nastavenia
                </button>
                <button type="button" onClick={handleRejectOptional} className="btn-secondary inline-flex justify-center border-white/15 bg-transparent text-white hover:border-brand hover:text-brand">
                  Odmietnuť voliteľné
                </button>
                <button type="button" onClick={handleAcceptAll} className="btn-primary inline-flex justify-center">
                  Prijať všetko
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isSettingsOpen ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/70 bg-sand-50 p-6 shadow-[0_30px_120px_rgba(18,15,12,0.35)] sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">
                  Cookie settings
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
                  Nastavenie cookies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="rounded-full border border-sand-200 px-4 py-2 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
              >
                Zavrieť
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Nevyhnutné</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      Tieto cookies zabezpečujú základnú funkčnosť webu a ukladanie vášho súhlasu.
                    </p>
                  </div>
                  <Toggle checked disabled />
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Funkčné</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      Pomáhajú zapamätať si vaše preferencie a zlepšiť komfort pri ďalšej návšteve.
                    </p>
                  </div>
                  <Toggle
                    checked={preferences.functional}
                    onChange={() => updatePreference('functional')}
                  />
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Analytika</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      Umožňujú nám anonymne sledovať používanie stránky a priebežne ju zlepšovať.
                    </p>
                  </div>
                  <Toggle
                    checked={preferences.analytics}
                    onChange={() => updatePreference('analytics')}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="btn-secondary inline-flex justify-center"
              >
                Len nevyhnutné
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-secondary inline-flex justify-center"
              >
                Prijať všetko
              </button>
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="btn-primary inline-flex justify-center"
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
