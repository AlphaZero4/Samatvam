import type { TransitionDirectionalAnimations } from 'astro';

const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)';
const easeIn = 'cubic-bezier(0.4, 0, 1, 1)';

/** Page swap: old page lifts and blurs out, new page rises in. Reversed on back navigation. */
export const pageTransition: TransitionDirectionalAnimations = {
  forwards: {
    old: { name: 'vt-out-up', duration: '0.26s', easing: easeIn, fillMode: 'both' },
    new: { name: 'vt-in-up', duration: '0.6s', easing: easeOut, delay: '0.06s', fillMode: 'both' },
  },
  backwards: {
    old: { name: 'vt-out-down', duration: '0.26s', easing: easeIn, fillMode: 'both' },
    new: { name: 'vt-in-down', duration: '0.6s', easing: easeOut, delay: '0.06s', fillMode: 'both' },
  },
};
