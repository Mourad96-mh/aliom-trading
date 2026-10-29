'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';

import type { Locale } from '@/i18n/config';
import { requiredFieldsFilled } from './requiredFields';
import { sendForm } from './sendForm';
import { Field, FormFailure } from './Field';
import { CheckIcon } from '@/components/Quote/QuoteForm';
import s from './Form.module.css';

export type ProductRequestLabels = {
  pole: string;
  polePick: string;
  poles: { export: string; import: string; unsure: string };
  product: string;
  productHint: string;
  details: string;
  detailsHint: string;
  quantity: string;
  quantityHint: string;
  destination: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  required: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  orWhatsapp: string;
  consent: string;
};

/**
 * "Demander un produit": for a product that is not in the catalogue yet. Mailed by
 * public/api/product-request.php, like the contact form. A family page links here with
 * ?pole=export or ?pole=import, which pre-selects the direction of trade.
 */
export default function ProductRequestForm({
  locale,
  labels,
  email,
  whatsapp,
  privacyHref,
}: {
  locale: Locale;
  labels: ProductRequestLabels;
  email: string;
  whatsapp: string;
  privacyHref: string;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [pole, setPole] = useState('');

  // The page is static, so the query string is only known in the browser.
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('pole');
    if (asked === 'export' || asked === 'import') setPole(labels.poles[asked]);
  }, [labels.poles]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!requiredFieldsFilled(form)) return;
    const data = new FormData(form);
    data.set('langue', locale);

    setState('sending');
    try {
      await sendForm('product-request', data);
      setState('sent');
      form.reset();
    } catch {
      setState('failed');
    }
  }

  if (state === 'sent') {
    return (
      <div className={s.done} role="status">
        <CheckIcon />
        <p>{labels.success}</p>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input type="text" name="_gotcha" className={s.gotcha} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <p className={s.legend}>
        <span className={s.req} aria-hidden="true">
          *
        </span>{' '}
        {labels.required}
      </p>

      {/* Remounted once the query string is read, so the pre-selection shows. */}
      <Field
        key={pole}
        name="sens"
        label={labels.pole}
        placeholder={labels.polePick}
        options={[labels.poles.export, labels.poles.import, labels.poles.unsure]}
        defaultValue={pole}
        required
      />
      <Field name="produit" label={labels.product} placeholder={labels.productHint} required />
      <Field name="details" label={labels.details} multiline placeholder={labels.detailsHint} />
      <div className={s.row}>
        <Field name="quantite" label={labels.quantity} placeholder={labels.quantityHint} />
        <Field name="destination" label={labels.destination} autoComplete="off" />
      </div>
      <div className={s.row}>
        <Field name="prenom" label={labels.firstName} required autoComplete="given-name" />
        <Field name="nom" label={labels.lastName} required autoComplete="family-name" />
      </div>
      <div className={s.row}>
        <Field name="societe" label={labels.company} required autoComplete="organization" />
        <Field name="pays" label={labels.country} required autoComplete="country-name" />
      </div>
      <div className={s.row}>
        <Field name="email" label={labels.email} type="email" required autoComplete="email" />
        <Field name="telephone" label={labels.phone} type="tel" autoComplete="tel" />
      </div>

      {state === 'failed' && (
        <FormFailure text={labels.error} email={email} whatsapp={whatsapp} orWhatsapp={labels.orWhatsapp} />
      )}

      <button type="submit" className="btn" disabled={state === 'sending'}>
        {state === 'sending' ? labels.sending : labels.submit}
      </button>

      <p className={s.consent}>
        <Link href={privacyHref}>{labels.consent}</Link>
      </p>
    </form>
  );
}
