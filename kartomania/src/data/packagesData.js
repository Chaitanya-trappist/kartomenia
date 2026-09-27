import { KARTS_DATA } from './kartsData.js';

export const SINGLE_SESSIONS = KARTS_DATA;
export const SINGLE_SPRINTS = SINGLE_SESSIONS;

export const MULTI_SESSION_PACKAGES = [
  {
    id: 'pkg-5',
    sessions: 5,
    bonusSessions: 0,
    bowlingGames: 1,
    tag: 'Starter',
    weekdayPrice: 3250,
    weekendPrice: 3800,
    validityMonths: 2,
    perks: ['5 × 10-minute track sessions', 'Share with friends & family', 'Live RaceFacer lap timing']
  },
  {
    id: 'pkg-10',
    sessions: 10,
    bonusSessions: 1,
    bowlingGames: 1,
    tag: 'Most popular',
    weekdayPrice: 6500,
    weekendPrice: 7600,
    validityMonths: 4,
    perks: ['10 paid + 1 free race session', 'Share with friends & family', 'Live RaceFacer lap timing']
  },
  {
    id: 'pkg-15',
    sessions: 15,
    bonusSessions: 2,
    bowlingGames: 2,
    tag: 'Best value',
    weekdayPrice: 9750,
    weekendPrice: 11400,
    validityMonths: 6,
    perks: ['15 paid + 2 free race sessions', 'Share with friends & family', 'Live RaceFacer lap timing']
  },
  {
    id: 'pkg-20',
    sessions: 20,
    bonusSessions: 3,
    bowlingGames: 3,
    tag: 'Pro fleet',
    weekdayPrice: 13000,
    weekendPrice: 15200,
    validityMonths: 6,
    perks: ['20 paid + 3 free race sessions', 'Priority pitlane queue & shareable', 'Live RaceFacer lap timing']
  }
];

export const REPEAT_TIERS = [
  { run: '1st run', price: 880, saving: 0 },
  { run: '2nd run', price: 820, saving: 60 },
  { run: '3rd run', price: 740, saving: 140 },
  { run: '4th+ run', price: 680, saving: 200 }
];
