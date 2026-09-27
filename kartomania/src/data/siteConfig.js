import { MAX_KART_SPEED_KMH } from './kartsData.js';

export const siteConfig = {
  name: "Kartomania",
  tagline: "RACE. FEEL. REPEAT.",
  founder: {
    name: "Mr. Rohit Khanna",
    title: "FOUNDER & DIRECTOR — LEAP FROG RACING",
    credentials: "NATIONAL RACING CHAMPION & LEAP FROG RACING PRINCIPAL",
    bio: "Kartomania was founded by national champion Mr. Rohit Khanna with a singular vision: to bring professional motorsport telemetry, competition Honda chassis, and authentic track dynamics directly to racing enthusiasts in Northern India."
  },
  urls: {
    booking: "https://web.racefacer.com/kiosk/kartomaniaentertainlandmall",
    googleMaps: "https://www.google.com/maps/dir/?api=1&destination=Kartomania+Entertainland+Mall+Sector+83+Gurugram",
    instagram: "https://www.instagram.com/kartomaniacsggn/?r=nametag",
    facebook: "https://www.facebook.com/kartomaniacsggn/",
    whatsapp: "https://wa.me/919717548897"
  },
  contact: {
    phonePrimary: "+91 97175 48897",
    phoneSecondary: "+91 95604 92876",
    email: "kartomaniacsggn@gmail.com",
    address: "Kartomania, Entertainland Mall, Sector 83, NH-48 Manesar, Gurugram, Haryana 122004",
    hours: {
      daily: "Mon–Fri: 2:00 PM – 11:00 PM | Sat, Sun & Holidays: 1:00 PM – 11:00 PM",
      weekday: "2:00 PM – 11:00 PM (Monday – Friday)",
      weekend: "1:00 PM – 11:00 PM (Saturday / Sunday / Public Holidays)",
      weekdayTime: "2:00 PM – 11:00 PM",
      weekendTime: "1:00 PM – 11:00 PM"
    }
  },
  racing: {
    sessionMinutes: 7,
    maxSpeedKmh: MAX_KART_SPEED_KMH
  },
  navLinks: [
    { name: 'The experience', path: '/experience' },
    { name: 'Our karts', path: '/karts' },
    { name: 'Packages', path: '/packages' },
    { name: 'About us', path: '/about' },
    { name: 'Visit us', path: '/contact' }
  ],
  telemetryHighlights: [
    { label: "TRACK LENGTH", value: "720M" },
    { label: "TOP SPEED", value: `${MAX_KART_SPEED_KMH} KM/H` },
    { label: "TECHNICAL TURNS", value: "14" },
    { label: "TELEMETRY", value: "RACEFACER" },
    { label: "STARTING AT", value: "₹650" }
  ]
};

export default siteConfig;
