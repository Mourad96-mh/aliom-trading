import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CONTACT } from '@/data/nav';
import s from './FloatingContact.module.css';

/**
 * WhatsApp and phone, always within reach: two round buttons fixed bottom-right on every
 * page. WhatsApp opens with a short greeting already typed, in the page's language.
 */
export default function FloatingContact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const whatsapp = `${CONTACT.whatsapp}?text=${encodeURIComponent(t.floating.whatsappMessage)}`;

  return (
    <div className={s.dock}>
      <a className={`${s.btn} ${s.whatsapp}`} href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t.floating.whatsapp}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" />
        </svg>
        <span className={s.tip} aria-hidden="true">
          {t.floating.whatsapp}
        </span>
      </a>
      <a className={`${s.btn} ${s.phone}`} href={CONTACT.phone.href} aria-label={`${t.floating.call} ${CONTACT.phone.label}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
        <span className={s.tip} aria-hidden="true">
          {CONTACT.phone.label}
        </span>
      </a>
    </div>
  );
}
