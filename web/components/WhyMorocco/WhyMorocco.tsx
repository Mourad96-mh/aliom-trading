import type { ReactNode } from 'react';
import Reveal from '@/components/Reveal/Reveal';
import s from '@/views/Shared.module.css';

/** Numbered points under a heading — "how we support you", "how we work". */
export default function NumberedPoints({
  title,
  points,
  accent,
  tint = true,
  children,
}: {
  title: string;
  points: { title: string; text: string }[];
  accent?: string;
  /** On the grey band (default) or on white. */
  tint?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`section ${tint ? 'section--tint' : ''}`}
      style={accent ? ({ '--accent': accent } as React.CSSProperties) : undefined}
    >
      <div className="page">
        <Reveal className="section-head">
          <h2>{title}</h2>
          {children}
        </Reveal>
        <ol className={`${s.points} ${points.length === 4 ? s.points4 : ''}`}>
          {points.map((point, i) => (
            <li key={point.title} className={s.point}>
              <Reveal delay={i * 90} className={s.pointInner}>
                <span className={s.pointNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={s.pointTitle}>{point.title}</h3>
                <p className={s.pointText}>{point.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
