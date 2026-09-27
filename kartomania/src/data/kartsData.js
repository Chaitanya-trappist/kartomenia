export const KARTS_DATA = [
  {
    id: 'l1',
    name: 'L1',
    level: 1,
    topSpeedKmh: 65,
    image: '/karts/kart-yellow.jpg',
    weekdayPrice: 650,
    weekendPrice: 760
  },
  {
    id: 'l2',
    name: 'L2',
    level: 2,
    topSpeedKmh: 85,
    qualification: { kartId: 'l1', lapTimeSeconds: 47 },
    image: '/karts/kart-blue.jpg',
    weekdayPrice: 1000,
    weekendPrice: 1200
  },
  {
    id: 'l3',
    name: 'L3',
    level: 3,
    topSpeedKmh: 100,
    qualification: { kartId: 'l2', lapTimeSeconds: 43 },
    image: '/karts/kart-green.jpg',
    weekdayPrice: 650,
    weekendPrice: 760
  },
  {
    id: 'junior',
    name: 'Junior',
    image: '/karts/kart-red.jpg',
    weekdayPrice: 650,
    weekendPrice: 760
  }
];

export const RACING_LEVELS = KARTS_DATA.filter((kart) => Number.isInteger(kart.level));
export const MAX_KART_SPEED_KMH = Math.max(...RACING_LEVELS.map((kart) => kart.topSpeedKmh));

export default KARTS_DATA;
