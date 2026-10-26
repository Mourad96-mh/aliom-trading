/**
 * The ALIOM wordmark, redrawn from the client's logo (a low-resolution capture in
 * ../extract-logo-from-here.jpeg): an "A" whose left leg is a fine hairline and whose foot
 * carries a leaf, "liom" in a heavy serif, "trading" in a light sans underneath.
 *
 * Inline SVG at currentColor, so the header can turn it white over the hero without a
 * second file. `textLength` pins both words to their width, so a fallback font can never
 * push them out of the viewBox. Replace with the client's vector file when it arrives.
 */
export default function Logo({ className, title = 'ALIOM TRADING' }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 168 64" role="img" aria-label={title}>
      <title>{title}</title>
      {/* The A: a thick right leg, a hairline left leg, and the leaf at its foot. */}
      <path d="M27 5h9.5l15 41h-10.2Z" fill="currentColor" />
      <path d="M27.8 6.5 17.6 34.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M5 47.5c1.8-8.7 7.4-13.6 15.6-14.3-.9 8.4-6.6 13.6-15.6 14.3Z" fill="currentColor" />
      <path d="M6.8 45.6c3.3-3.6 6.8-6.6 11.2-9.2" stroke="var(--logo-vein, #fff)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <text
        x="50"
        y="46"
        fill="currentColor"
        fontFamily="var(--font-serif), Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="700"
        letterSpacing="-0.5"
        textLength="114"
        lengthAdjust="spacingAndGlyphs"
      >
        liom
      </text>
      <text
        x="64"
        y="61"
        fill="currentColor"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="12.5"
        fontWeight="400"
        opacity="0.78"
        textLength="56"
        lengthAdjust="spacingAndGlyphs"
      >
        trading
      </text>
    </svg>
  );
}
