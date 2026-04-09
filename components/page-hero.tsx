import Image from 'next/image';
import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  buttonLabel: string;
  buttonHref?: string;
  image: { src: string; alt: string };
};

export function PageHero({ eyebrow, title, lead, buttonLabel, buttonHref = '/kontakt', image }: PageHeroProps) {
  return (
    <section className="relative h-[30vh] min-h-[320px] overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/42 to-ink/88" />

      <div className="site-shell relative z-10 flex h-full flex-col justify-end pb-10 lg:pb-14">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.38em] text-brand"
          style={{ animation: 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
        >
          {eyebrow}
        </p>
        <h1
          className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both' }}
        >
          {title}
        </h1>
        <p
          className="mt-3 max-w-2xl text-base leading-7 text-sand-100 sm:text-lg"
          style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both' }}
        >
          {lead}
        </p>
        <div style={{ animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.46s both' }}>
          <Link href={buttonHref} className="btn-primary mt-6 inline-flex">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
