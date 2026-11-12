import type { CategoryKey } from '@/data/catalog';

/**
 * Line icons for the product families that have no photo (client's request of
 * 2026-11-12: keep only a few representative photos). Drawn on a 48-unit grid,
 * stroked in currentColor so the card's accent colours them.
 */
const PATHS: Partial<Record<CategoryKey, React.ReactNode>> = {
  // An octopus: head, eyes and four curled arms.
  seafood: (
    <>
      <path d="M15 22c0-6.6 4-12 9-12s9 5.4 9 12c0 3-1 5-2.5 6.5" />
      <path d="M17.5 28.5C16 27 15 25 15 22" />
      <circle cx="20.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="27.5" cy="20" r="1.2" fill="currentColor" stroke="none" />
      <path d="M17.5 28.5c-2 3-5 4-7.5 3.5 0 2.5 2 4 4.5 3.5" />
      <path d="M21 29.5c-.5 4-2 7-4.5 8.5 1.5 1.5 4 1 5.5-1" />
      <path d="M27 29.5c.5 4 2 7 4.5 8.5-1.5 1.5-4 1-5.5-1" />
      <path d="M30.5 28.5c2 3 5 4 7.5 3.5 0 2.5-2 4-4.5 3.5" />
    </>
  ),
  // An open tin with a fish on its lid.
  'canned-food': (
    <>
      <ellipse cx="24" cy="17" rx="14" ry="5" />
      <path d="M10 17v14c0 2.8 6.3 5 14 5s14-2.2 14-5V17" />
      <path d="M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5" />
      <path d="M17 17c2-2 4.5-3 7-3s5 1 7 3c-2 2-4.5 3-7 3s-5-1-7-3Z" />
      <path d="M31 17l3-2v4z" />
    </>
  ),
  // Two breaded fish fingers on a plate.
  'precooked-fish': (
    <>
      <ellipse cx="24" cy="31" rx="17" ry="6" />
      <rect x="12" y="20" width="20" height="6" rx="2.5" transform="rotate(-8 22 23)" />
      <rect x="17" y="25" width="20" height="6" rx="2.5" transform="rotate(6 27 28)" />
      <path d="M16 22.5h.01M21 21.6h.01M26 21h.01M22 27.3h.01M27 27.8h.01M32 28.3h.01" strokeWidth="2.4" />
    </>
  ),
  // A feed sack with a fish mark.
  'animal-feed': (
    <>
      <path d="M15 13h18l-2 4c3 3 5 8 5 14 0 4-2 6-5 6H17c-3 0-5-2-5-6 0-6 2-11 5-14z" />
      <path d="M17 17h14" />
      <path d="M18 28c2-2.2 4-3.2 6-3.2s4 1 6 3.2c-2 2.2-4 3.2-6 3.2s-4-1-6-3.2Z" />
      <path d="M30 28l3-2v4z" />
    </>
  ),
};

const FALLBACK = (
  <>
    <path d="M8 18l16-8 16 8v16l-16 8-16-8z" />
    <path d="M8 18l16 8 16-8M24 26v16" />
  </>
);

export default function CategoryIcon({ category, className }: { category: CategoryKey; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[category] ?? FALLBACK}
    </svg>
  );
}
