import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/kartomania-official-track.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;

    // Ordered sequence of exact visual waypoints along the track centerline following all arrows:
    // Starting at PIT LANE (Start/Finish) and going counter-clockwise / clockwise along the arrow directions:
    const rawPoints = [
      // 1. Pit Straight & Start/Finish line (heading up-left)
      { x: 260, y: 620 },
      { x: 200, y: 560 },
      { x: 140, y: 500 },
      { x: 80,  y: 440 },
      
      // 2. Turn 1 (Outer West Hairpin, sweeping UP)
      { x: 45,  y: 380 },
      { x: 50,  y: 330 },
      { x: 90,  y: 290 },
      { x: 140, y: 290 },
      
      // 3. West Infield Loop (curving down-left)
      { x: 175, y: 330 },
      { x: 170, y: 380 },
      { x: 130, y: 415 },
      { x: 100, y: 410 },
      { x: 105, y: 370 },
      { x: 145, y: 350 },
      
      // 4. Climb into North Mountain / Tower (heading up-right)
      { x: 185, y: 320 },
      { x: 205, y: 250 },
      { x: 235, y: 170 },
      { x: 280, y: 90 },
      { x: 330, y: 30 },
      
      // 5. North Apex Summit Hairpin (180° loop at the top)
      { x: 360, y: 25 },
      { x: 385, y: 60 },
      { x: 375, y: 110 },
      
      // 6. S-Chicane Descent (wavy vertical descent)
      { x: 340, y: 170 },
      { x: 310, y: 240 },
      { x: 335, y: 310 },
      { x: 365, y: 370 },
      { x: 360, y: 430 },
      
      // 7. Infield Transition Dip & Hook
      { x: 320, y: 480 },
      { x: 280, y: 530 },
      { x: 300, y: 575 },
      { x: 340, y: 560 },
      { x: 365, y: 500 },
      { x: 380, y: 440 },
      
      // 8. Long Top Straight (Heading straight East →)
      { x: 440, y: 435 },
      { x: 550, y: 430 },
      { x: 670, y: 425 },
      { x: 790, y: 420 },
      { x: 910, y: 415 },
      
      // 9. Far-Right Super Hairpin (180° loop at East edge)
      { x: 975, y: 430 },
      { x: 990, y: 468 },
      { x: 965, y: 505 },
      
      // 10. Long Bottom Straight (Heading straight West ←)
      { x: 900, y: 512 },
      { x: 780, y: 515 },
      { x: 650, y: 518 },
      { x: 520, y: 520 },
      
      // 11. South-West Diagonal Link Straight (Heading down-left ↙)
      { x: 450, y: 530 },
      { x: 395, y: 585 },
      { x: 345, y: 640 },
      
      // 12. Final Corner Sweeper back into Pit Straight
      { x: 300, y: 670 },
      { x: 270, y: 650 }
    ];

    // Convert waypoints to smooth Catmull-Rom to Cubic Bézier SVG Path
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

    const path = pointsToSpline(rawPoints);
    console.log('Generated Spline Path:');
    console.log(path);
  });
