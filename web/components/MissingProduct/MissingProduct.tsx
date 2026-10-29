import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import type { GroupKey } from '@/data/catalog';
import { href } from '@/data/routes';
import s from './MissingProduct.module.css';

/**
 * "The list is not limited": under a product list, the way to ask for a product that is
 * not in it. The pole travels to the request form (?pole=import), which pre-selects it.
 */
export default function MissingProduct({ locale, pole }: { locale: Locale; pole?: GroupKey }) {
  const t = getDictionary(locale);
  const target = href(locale, 'request') + (pole ? `?pole=${pole}` : '');
  return (
    <aside className={s.box}>
      <div>
        <h2 className={s.title}>{t.request.bandTitle}</h2>
        <p className={s.text}>{t.request.bandText}</p>
      </div>
      <Link className="btn" href={target}>
        {t.request.bandCta}
      </Link>
    </aside>
  );
}
