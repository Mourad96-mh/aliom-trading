import s from './Faq.module.css';

/** Questions as native <details>: readable without JavaScript, and by crawlers. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={s.list}>
      {items.map((item, i) => (
        <details key={item.q} className={s.item} open={i === 0}>
          <summary className={s.q}>{item.q}</summary>
          <p className={s.a}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
