/** Scroll-triggered fade-up used by content sections. */
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
} as const;

/** `fadeUp` with a stagger delay for the item at `idx`. */
export const fadeUpAt = (idx: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: idx * 0.06 },
});
