'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { company, navigation } from '@/data/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-sand-50/75 shadow-[0_18px_60px_rgba(22,18,14,0.08)] backdrop-blur-md">
        <div className="site-shell">
          <div className="flex h-14 items-center justify-between gap-6 lg:h-20">
            <Link href="/" className="shrink-0">
              <Image
                src="/media/logo_lemino_cele.png"
                alt={`${company.name} logo`}
                width={180}
                height={50}
                priority
                className="h-auto w-[150px] sm:w-[180px]"
              />
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      active
                        ? 'bg-brand text-white shadow-[0_12px_30px_rgba(214,134,34,0.35)]'
                        : 'text-ink hover:bg-white/80 hover:text-brand'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/kontakt" className="btn-primary hidden lg:inline-flex">
                Kontakt
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Zatvoriť menu' : 'Otvoriť menu'}
                aria-expanded={open}
                className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] transition lg:hidden"
              >
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                    open ? 'translate-y-[7px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
                    open ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-down mobile drawer */}
      <div
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-sand-50/95 pt-14 backdrop-blur-md lg:pt-20">
          <div className="border-b border-sand-200 py-6 shadow-[0_20px_60px_rgba(22,18,14,0.12)]">
            <nav className="flex flex-col gap-1 px-4 sm:px-6">
              {navigation.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3.5 text-base font-medium transition ${
                      active
                        ? 'bg-brand text-white'
                        : 'text-ink hover:bg-white hover:text-brand'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-ink/20 transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
    </>
  );
}
