'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type Item = { src: string; alt: string };

type Props = {
  items: Item[];
  startIndex: number;
  onClose: () => void;
};

export function Lightbox({ items, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex);
  const [visible, setVisible] = useState(false);
  const [imgFade, setImgFade] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // Fade in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Auto-scroll filmstrip to active thumb
  useEffect(() => {
    if (!stripRef.current) return;
    const btn = stripRef.current.children[current] as HTMLElement | undefined;
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || imgFade) return;
      setImgFade(true);
      setTimeout(() => {
        setCurrent(index);
        setImgFade(false);
      }, 180);
    },
    [current, imgFade],
  );

  const prev = useCallback(
    () => goTo((current - 1 + items.length) % items.length),
    [current, goTo, items.length],
  );
  const next = useCallback(
    () => goTo((current + 1) % items.length),
    [current, goTo, items.length],
  );

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [handleClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{
        background: 'rgba(14,12,9,0.97)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        aria-label="Zatvoriť"
        className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main image */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-14 py-6">
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Predchádzajúca"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-white/70 transition hover:bg-white/18 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Image — fades + subtle scale on change */}
        <div
          className="relative h-full w-full"
          style={{
            opacity: imgFade ? 0 : 1,
            transform: imgFade ? 'scale(0.97)' : 'scale(1)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}
        >
          <Image
            key={current}
            src={items[current].src}
            alt={items[current].alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Nasledujúca"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-white/70 transition hover:bg-white/18 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Filmstrip */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto px-4 pb-5 pt-2"
        style={{ scrollbarWidth: 'none', justifyContent: items.length < 6 ? 'center' : undefined }}
      >
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => goTo(i)}
            className="relative h-16 w-[4.5rem] shrink-0 overflow-hidden rounded-lg transition-all duration-200"
            style={{
              opacity: i === current ? 1 : 0.38,
              outline: i === current ? '2px solid #d48822' : 'none',
              outlineOffset: '2px',
              transform: i === current ? 'scale(1)' : 'scale(0.94)',
            }}
          >
            <Image src={item.src} alt="" fill sizes="72px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
