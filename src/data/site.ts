// Single source of truth for site-wide content: navigation, contact details, locations.
// Content ported from samatvam.org.

export const site = {
  name: 'Samatvam',
  fullName: 'Samatvam: Science and Research for Human Welfare Trust',
  tagline: 'Service with Devotion',
  description:
    'Samatvam Endocrinology Diabetes and Jnana Sanjeevini: comprehensive, compassionate diabetes and endocrine care in Bangalore since 1987.',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'samatvam@gmail.com',
  founded: 1987,
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Diabetes', href: '/diabetes/' },
  { label: 'Endocrinology', href: '/endocrinology/' },
  { label: 'Specialities', href: '/specialties/' },
  { label: 'Doctors', href: '/doctors/' },
  { label: 'Education', href: '/education/' },
  { label: 'Research', href: '/research/' },
  { label: 'Facilities', href: '/facilities/' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const exploreNav: (NavItem & { blurb: string })[] = [
  { label: 'Achievements', href: '/achievements/', blurb: 'Milestones since 1987' },
  { label: 'News and Events', href: '/news-events/', blurb: 'Press and reports' },
  { label: 'Newsletter', href: '/newsletter/', blurb: 'Swasthya and more' },
  { label: 'Photo Video Gallery', href: '/photos-gallery/', blurb: 'Moments from our centers' },
  { label: 'Testimonials', href: '/testimonial/', blurb: 'In our patients’ words' },
  { label: 'International Patients', href: '/international-patients/', blurb: 'Care across borders' },
  { label: 'Charity Donations', href: '/charity/', blurb: 'Projects DISHA and DOSTI' },
  { label: 'Health Professionals', href: '/health-professional/', blurb: 'Torch of Life CME' },
];

export type Location = {
  group: 'Samatvam Endocrinology Diabetes Centers' | 'Jnana Sanjeevini Medical Center and Diabetes Hospitals';
  area: string;
  address: string;
  map: string;
  phones: string[];
  helpline: string;
  email: string;
};

export const locations: Location[] = [
  {
    group: 'Samatvam Endocrinology Diabetes Centers',
    area: 'Jayanagar',
    address: '313, 33 Cross, 17th Main, Jayanagar 4th T Block, Bangalore 560 041, India',
    map: 'https://www.google.com/maps/place/12.92607+77.5866683/@12.92607,77.5866683,17z',
    phones: ['4111 3308', '2663 7486'],
    helpline: '9448356575',
    email: 'samatvam@gmail.com',
  },
  {
    group: 'Samatvam Endocrinology Diabetes Centers',
    area: 'Indiranagar',
    address: '640, I Main, I Stage, Indiranagar, Bangalore 560 038, India',
    map: 'https://www.google.com/maps/place/12.9827409+77.6374418/@12.9827409,77.6374418,17z',
    phones: ['+91 80 2521 3156', '2525 7508'],
    helpline: '9449994978',
    email: 'sharda.a@gmail.com',
  },
  {
    group: 'Samatvam Endocrinology Diabetes Centers',
    area: 'BTM Layout',
    address: "82, 36th Main 4th A Cross, BTM 1st Stage, 1st Phase, Dollar's Scheme, Bangalore 560 068, India",
    map: 'https://www.google.com/maps/place/12.9188736+77.618257/@12.9188736,77.618257,17z',
    phones: ['7022635742'],
    helpline: '7022635742',
    email: 'samatvambtm@gmail.com',
  },
  {
    group: 'Jnana Sanjeevini Medical Center and Diabetes Hospitals',
    area: 'JP Nagar',
    address: '2, 1 A Cross, Marenahalli, JP Nagar Phase 2, Bangalore 560 078, India',
    map: 'https://www.google.com/maps/place/12.915217+77.5841653/@12.915217,77.5841653,17z',
    phones: ['+91 80 2649 3040', '2649 3060'],
    helpline: '9448350728',
    email: 'jsmcindia@gmail.com',
  },
];

export const directors = [
  {
    name: 'Dr S Srikanta',
    credentials: 'MD (AIIMS), (PhD), FACE',
    training: 'Duke University Medical Center, Joslin Diabetes Center, Harvard Medical School, USA',
    email: 'samatvam@gmail.com',
    href: '/dr-s-sri-kanta/',
  },
  {
    name: 'Dr A Sharda',
    credentials: 'MD, DNB, MRCP, FACE, FRCP',
    training: 'University of California, Henry Ford Hospital, USA; McGill University, Canada',
    email: 'sharda.a@gmail.com',
  },
  {
    name: 'Dr Tejaswini Patil',
    credentials: 'MD, FEDM, FACE',
    training: 'University of Liverpool, Birmingham Heartlands Hospital, Royal Albert Infirmary, UK',
    email: 'samatvambtm@gmail.com',
  },
];

/** Digits-only tel: link. Bangalore landlines without a country code get +91 80. */
export function tel(n: string): string {
  const d = n.replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return `tel:${d}`;
  if (d.length === 10) return `tel:+91${d}`;
  if (d.length === 8) return `tel:+9180${d}`;
  return `tel:${d}`;
}
