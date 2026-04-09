'use client';

import { FormEvent, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const initial: FormState = { name: '', email: '', phone: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function set<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm(initial);
      } else {
        const data = (await res.json()) as { error?: string };
        setErrorMsg(data.error ?? 'Odoslanie zlyhalo, skúste neskôr.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Nastala sieťová chyba, skúste neskôr.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="site-card space-y-4 p-6 sm:p-8">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Meno
        </label>
        <input
          id="name"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className="form-input"
          placeholder="Vaše meno"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className="form-input"
            placeholder="vas@email.sk"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Telefón
          </label>
          <input
            id="phone"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className="form-input"
            placeholder="+421..."
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Správa *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className="form-input min-h-36 resize-y"
          placeholder="Napíšte nám stručne, s čím potrebujete pomôcť."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
        >
          {status === 'sending' ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Odosielam…
            </>
          ) : (
            'Odoslať dopyt'
          )}
        </button>
        <p className="text-sm leading-6 text-muted">Správu dostaneme priamo do e-mailu.</p>
      </div>

      {status === 'success' && (
        <div className="rounded-[1.2rem] bg-green-50 px-5 py-4 text-sm font-medium text-green-800">
          Ďakujeme! Vaša správa bola odoslaná, ozveme sa čo najskôr.
        </div>
      )}
      {status === 'error' && (
        <div className="rounded-[1.2rem] bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {errorMsg}
        </div>
      )}
    </form>
  );
}
