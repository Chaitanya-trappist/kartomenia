import { RACING_LEVELS } from '../data/kartsData.js';

export function formatKartQualification(qualification) {
  if (!qualification || !Number.isFinite(qualification.lapTimeSeconds) || qualification.lapTimeSeconds <= 0) {
    throw new RangeError('A qualifying lap time must be a positive, finite number of seconds.');
  }
  const requiredKart = RACING_LEVELS.find((kart) => kart.id === qualification.kartId);
  if (!requiredKart) {
    throw new RangeError('A qualifying lap must reference an existing racing level.');
  }
  return `${qualification.lapTimeSeconds}-second lap in ${requiredKart.name}`;
}
