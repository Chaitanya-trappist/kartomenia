import siteConfig from './siteConfig.js';
import { RACING_LEVELS } from './kartsData.js';
import { formatKartQualification } from '../utils/karts.js';

export const FAQ_ITEMS = [
  {
    id: 'first-race',
    question: 'First time karting? You are in the right place.',
    answer: "No prior experience or driver's license is required to get started. L2 and L3 require a qualifying lap. Our marshals provide a full safety briefing and driving tutorial before every session."
  },
  {
    id: 'kart-levels',
    question: 'What kart levels are available?',
    answer: `${RACING_LEVELS.map((kart) => `${kart.name}: ${kart.topSpeedKmh} km/h`).join('; ')}. Junior karts are also available.`
  },
  {
    id: 'qualification',
    question: 'How do I qualify for L2 and L3?',
    answer: RACING_LEVELS.filter((kart) => kart.qualification)
      .map((kart) => `To qualify for ${kart.name}: ${formatKartQualification(kart.qualification)}.`)
      .join(' ')
  },
  {
    id: 'age-height',
    question: 'What are the age and height requirements?',
    answer: 'Please contact our team to confirm age and height requirements before booking.'
  },
  {
    id: 'safety-gear',
    question: 'What should I wear? Is safety gear included?',
    answer: 'DOT-certified helmets and sanitary balaclavas are included with every booking. Flat, closed-toe shoes are mandatory; high heels and open sandals are not allowed.'
  },
  {
    id: 'walk-ins',
    question: 'Can I walk in, or should I book ahead?',
    answer: 'Walk-ins are welcome. We recommend booking ahead through RaceFacer for your preferred session, especially during busy weekends and evening hours.'
  },
  {
    id: 'duration',
    question: 'How long is a standard race?',
    answer: `A standard single session includes ${siteConfig.racing.sessionMinutes} minutes on our 720-metre circuit. The number of laps depends on your pace; your session is timed rather than lap-counted. Multi-session passes have their own inclusions listed on the packages page.`
  },
  {
    id: 'lap-times',
    question: 'Where can I find my lap times?',
    answer: 'RaceFacer lap timing is displayed on the pit screens and synced to your RaceFacer profile, with sector breakdowns, top speeds, and leaderboards.'
  }
];

export default FAQ_ITEMS;
