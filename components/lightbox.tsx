'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Item = { src: string; alt: string };

type Props = {
  items: Item[];
  startIndex: number;
  onClose: () => void;
};

export function Lightbox({ items, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex);
  const [displayed, setDisplayed] = useState(startIndex); // what's actually shown
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    if (!stripRef.current) return;
    const btn = stripRef.current.children[current] as HTMLElement | undefined;
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [current]);

  const goTo = useCallback(
    (index: number) => {
      if (index === current || fading) return;
      setCurrent(index);
      setFading(true);
      setTimeout(() => {
        setDisplayed(index);
        setFading(false);
      }, 180);
    },
    [current, fading],
  );

  const prev = useCallback(() => goTo((current - 1 + items.length) % items.length), [current, goTo, items.length]);
  const next = useCallback(() => goTo((current + 1) % items.length), [current, goTo, items.length]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
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

  const content = (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={handleClose}
    >
      {/* Close */}
      <button
        onClick={handleClose}
        aria-label="Zatvoriť"
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute left-5 top-5 z-20 text-sm text-white/50">
        {current + 1} / {items.length}
      </div>

      {/* Main image area */}
      <div
        className="relative flex flex-1 items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Predchádzajúca"
          className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Image — fades on slide change */}
        <div
          className="relative mx-16 h-full w-full"
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? 'scale(0.97)' : 'scale(1)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}
        >
          <Image
            src={items[displayed].src}
            alt={items[displayed].alt}
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
          className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Filmstrip */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto px-4 pb-5 pt-3"
        style={{ scrollbarWidth: 'none', justifyContent: items.length < 7 ? 'center' : undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, i) => (
          <button
            key={item.src}
            onClick={() => goTo(i)}
            className="relative h-16 w-[4.5rem] shrink-0 overflow-hidden rounded-lg transition-all duration-200"
            style={{
              opacity: i === current ? 1 : 0.4,
              outline: i === current ? '2px solid #d48822' : '2px solid transparent',
              outlineOffset: '2px',
            }}
          >
            <Image src={item.src} alt="" fill sizes="72px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
