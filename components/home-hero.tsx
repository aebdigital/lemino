'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { company } from '@/data/site';

export function HomeHero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    function handleScroll() {
      rafId = requestAnimationFrame(() => {
        if (!parallaxRef.current) return;
        const offset = Math.min(window.scrollY * 0.15, 120);
        parallaxRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="sticky top-0 z-0 h-screen min-h-[620px] overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 scale-[1.08]"
        style={{ transform: 'translate3d(0, 0px, 0) scale(1.08)' }}
      >
        <Image
          src="/media/uvodna-fotka.jpg"
          alt="Úvodná fotografia stavby Lemino"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/40 to-ink/88" />

      <div className="site-shell relative z-10 flex h-full items-center pb-14 pt-20 sm:items-end sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-40">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.62fr] lg:items-end">
          <div className="max-w-4xl">
            <p
              className="mb-4 hidden text-sm font-semibold uppercase tracking-[0.38em] text-brand sm:block"
              style={{ animation: 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
            >
              Spoľahlivý partner na stavbe
            </p>
            <h1
              className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl"
              style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both' }}
            >
              Spoľahnite sa na nás, my sa spoliehame na naše skúsenosti
            </h1>
            <p
              className="mt-4 max-w-3xl text-sm leading-7 text-sand-100 sm:text-base sm:leading-8"
              style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.38s both' }}
            >
              Spoločnosť LEMINO je vašim stabilným a spoľahlivým partnerom v oblasti prenájmu
              fasádnej lešenárskej techniky, stropného debnenia a stavebných výťahov.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.52s both' }}
            >
              <Link href="/kontakt" className="btn-primary hidden sm:inline-flex">
                Kontakt
              </Link>
              <Link
                href="#sluzby"
                className="btn-primary inline-flex w-full justify-center sm:w-auto"
              >
                Naše služby
              </Link>
            </div>
          </div>

          <div
            className="hidden gap-4 lg:grid lg:justify-self-end lg:max-w-[26rem]"
            style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s both' }}
          >
            <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                Kontakt
              </p>
              <p className="mt-3 text-lg font-medium text-white">{company.phoneDisplay}</p>
              <p className="mt-1 text-sm leading-6 text-sand-100">{company.email}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/15 bg-ink/35 p-5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
                Bratislava
              </p>
              <p className="mt-3 text-lg font-medium text-white">{company.addressLine1}</p>
              <p className="mt-1 text-sm leading-6 text-sand-100">{company.addressLine2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
