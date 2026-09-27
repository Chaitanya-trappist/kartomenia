import fs from 'fs';

// Precise subpixel coordinates along the center of the official track lanes
const rawPoints = [
  // Pit Straight & Start/Finish
  { x: 256, y: 615 },
  { x: 200, y: 558 },
  { x: 142, y: 498 },
  { x: 82,  y: 438 },
  
  // Turn 1 (Outer West Hairpin)
  { x: 44,  y: 382 },
  { x: 50,  y: 328 },
  { x: 92,  y: 288 },
  { x: 142, y: 288 },
  
  // Turn 2 (West Carousel Infield)
  { x: 176, y: 328 },
  { x: 170, y: 378 },
  { x: 128, y: 414 },
  { x: 98,  y: 408 },
  { x: 104, y: 366 },
  { x: 146, y: 346 },
  
  // Turn 3 & 4 (Climb to North Apex)
  { x: 184, y: 316 },
  { x: 204, y: 246 },
  { x: 236, y: 166 },
  { x: 282, y: 88 },
  { x: 330, y: 28 },
  
  // Turn 5 (North Apex Summit 180°)
  { x: 360, y: 24 },
  { x: 386, y: 58 },
  { x: 376, y: 112 },
  
  // Turn 6 & 7 (S-Chicane Descent)
  { x: 340, y: 172 },
  { x: 310, y: 242 },
  { x: 336, y: 312 },
  { x: 366, y: 372 },
  { x: 360, y: 432 },
  
  // Turn 8 & 9 (Infield Transition Dip)
  { x: 320, y: 482 },
  { x: 278, y: 532 },
  { x: 298, y: 576 },
  { x: 340, y: 560 },
  { x: 366, y: 498 },
  { x: 382, y: 438 },
  
  // Turn 10 (Long Top Straight →)
  { x: 440, y: 435 },
  { x: 550, y: 430 },
  { x: 670, y: 425 },
  { x: 790, y: 420 },
  { x: 910, y: 415 },
  
  // Turn 11 & 12 (East Super Hairpin 180°)
  { x: 976, y: 430 },
  { x: 992, y: 468 },
  { x: 966, y: 506 },
  
  // Turn 13 (Long Bottom Straight ←)
  { x: 900, y: 513 },
  { x: 780, y: 516 },
  { x: 650, y: 518 },
  { x: 520, y: 520 },
  
  // Turn 14 (South-West Diagonal Return Straight ↙)
  { x: 450, y: 530 },
  { x: 395, y: 585 },
  { x: 342, y: 642 },
  
  // Pit Straight link
  { x: 298, y: 672 },
  { x: 268, y: 648 }
];

function pointsToSpline(pts) {
  const n = pts.length;
  let d = `M ${pts[0].x},${pts[0].y} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} `;
  }
  d += 'Z';
  return d;
}

const spline = pointsToSpline(rawPoints);
console.log(spline);
