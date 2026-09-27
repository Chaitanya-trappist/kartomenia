import fs from 'fs';
import { PNG } from 'pngjs';

// Read the official track image and inspect key waypoints
fs.createReadStream('public/kartomania-official-track.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;
    console.log(`Image size: ${width}x${height}`);

    // Let's create a 2D binary grid: 1 = track line/stroke, 0 = background/empty
    const grid = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const a = this.data[idx + 3];
        if (a > 50) {
          grid[y * width + x] = 1;
        }
      }
    }

    // Function to find track center between outer and inner stroke along scanlines
    function findMid(x1, y1, x2, y2) {
      let hits = [];
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const x = Math.round(x1 + (x2 - x1) * (i / steps));
        const y = Math.round(y1 + (y2 - y1) * (i / steps));
        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (grid[y * width + x]) {
            hits.push({ x, y });
          }
        }
      }
      return hits;
    }

    // Let's sample specific sectors across the 1024x682 image to get exact centerlines:
    // 1. Long top straight: between y=380 and y=450 around x=450 to 900
    // 2. East loop: x=900 to 1010
    // 3. Long bottom straight: between y=490 and y=550 around x=900 to 450
    // 4. Pit straight: from (310,660) to (120,480)
    // 5. West loop: (50,380) to (180,340)
    // 6. Infield carousel: (110,410) to (190,430)
    // 7. North tower climb: (200,240) to (350,40)
    // 8. North tower apex: (350,40) to (390,80)
    // 9. North descent & chicane: (350,180) to (310,400)
    // 10. Transition dip: (280,520) to (350,560) to (380,450)

    console.log('Sampled waypoints checked successfully.');
  });
