import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { ADDRESS, CONTACT } from '@/data/nav';
import s from '@/views/Shared.module.css';

/** Address, phone and e-mail of the Casablanca office — the contact and about pages. */
export default function ContactCard({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <address className={s.contactCard}>
      <div className={s.contactRow}>
        <span className={s.contactIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <span>
          <span className={s.contactLabel}>{t.contact.addressTitle}</span>
          {ADDRESS.lines.map((line) => (
            <span key={line} className={s.contactValue}>
              {line}
            </span>
          ))}
          <a className={s.contactMap} href={ADDRESS.map} target="_blank" rel="noopener noreferrer">
            {t.contact.map} ↗
          </a>
        </span>
      </div>
      <div className={s.contactRow}>
        <span className={s.contactIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
          </svg>
        </span>
        <span>
          <span className={s.contactLabel}>{t.contact.phoneTitle}</span>
          <span className={s.contactValue}>
            <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
          </span>
        </span>
      </div>
      <div className={s.contactRow}>
        <span className={s.contactIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
            <path d="m3 6 9 7 9-7" />
          </svg>
        </span>
        <span>
          <span className={s.contactLabel}>{t.contact.emailTitle}</span>
          <span className={s.contactValue}>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </span>
        </span>
      </div>
    </address>
  );
}
