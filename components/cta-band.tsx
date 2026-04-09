import Link from 'next/link';

type CtaBandProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export function CtaBand({ title, description, buttonLabel, buttonHref }: CtaBandProps) {
  return (
    <section className="section-space">
      <div className="site-shell">
        <div className="overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-sand-50 shadow-[0_30px_120px_rgba(25,22,18,0.35)] sm:px-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-brand">
                Pripravení pomôcť
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-sand-200">{description}</p>
            </div>
            <div className="lg:justify-self-end">
              <Link href={buttonHref} className="btn-primary inline-flex">
                {buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
