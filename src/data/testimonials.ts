/**
 * Client Testimonials Data
 *
 * Video testimonials and client success stories
 */

export interface Testimonial {
  name: string;
  title: string;
  firm: string;
  practiceArea: string;
  location: string;
  photo: string;
  youtubeId?: string;
  quote?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Clarke Speaks',
    title: 'Founder',
    firm: 'Speaks Law',
    practiceArea: 'Personal Injury and Workers Comp',
    location: 'Wilmington, NC',
    photo: '/images/clients/clarke-speaks.png',
    quote: 'LEXGRO took us from guessing to knowing exactly where our cases come from. The accountability changed how we spend every dollar.',
  },
  {
    name: 'Peter Davis',
    title: 'Founder',
    firm: 'Peter N. Davis and Associates',
    practiceArea: 'Personal Injury and Workers Comp',
    location: 'Paterson, NJ',
    photo: '/images/clients/peter-davis.png',
  },
  {
    name: 'Eric Richardson',
    title: 'Founder',
    firm: 'ER Law',
    practiceArea: 'Personal Injury, Estate Planning and Family Law',
    location: 'Greensboro, NC',
    photo: '/images/clients/eric-richardson.png',
  },
  {
    name: 'Riah Greathouse',
    title: 'Founder',
    firm: 'Greathouse Law',
    practiceArea: 'Personal Injury',
    location: 'Atlanta, GA',
    photo: '/images/clients/riah-greathouse.webp',
    quote: 'Having a CMO who actually understands injury law made all the difference. No learning curve. Results from day one.',
  },
  {
    name: 'Drew Brown',
    title: 'Founder',
    firm: 'Greensboro Law Center',
    practiceArea: 'Personal Injury and Business',
    location: 'Greensboro, NC',
    photo: '/images/clients/drew-brown.png',
  },
  {
    name: 'Barry Siegel',
    title: 'Founder',
    firm: 'Siegel Law Group',
    practiceArea: 'Estate Planning and Elder Law',
    location: 'Boca Raton, FL',
    photo: '/images/clients/barry-siegel.jpg',
  },
  {
    name: 'Blake Swan',
    title: 'Founder',
    firm: 'Tennessee Injury Attorneys',
    practiceArea: 'Personal Injury and Business',
    location: 'Nashville, TN',
    photo: '/images/clients/blake-swan.png',
  },
  {
    name: 'Matthew Albrecht',
    title: 'Founder',
    firm: 'Albrecht Law',
    practiceArea: 'Personal Injury',
    location: 'Spokane, WA',
    photo: '/images/clients/matthew-albrecht.webp',
    quote: 'We went from spending money on marketing to investing in growth. The difference shows up in our case count every month.',
  },
  {
    name: 'Yunuen Alvarado Bustos',
    title: 'Marketing Manager',
    firm: 'Lincoln Goldfinch Law',
    practiceArea: 'Immigration',
    location: 'Austin, TX',
    photo: '/images/clients/yunuen-alvarado-bustos.webp',
  },
  {
    name: 'James Amaro',
    title: 'Founder',
    firm: 'Amaro Law Firm',
    practiceArea: 'Personal Injury',
    location: 'Houston, TX',
    photo: '/images/clients/james-amaro.webp',
  },
  {
    name: 'Beth Tibbott',
    title: 'Co-Founder',
    firm: 'Tibbott and Richardson',
    practiceArea: 'Family Law and Criminal Defense',
    location: 'Pittsburgh, PA',
    photo: '/images/clients/beth-tibbott.png',
  },
];

export function getTestimonialsWithVideos(): Testimonial[] {
  return testimonials.filter(t => t.youtubeId);
}
