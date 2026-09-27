import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/kartomania-official-track.png';
const darkFullOutputPath = 'public/kartomania-track-dark.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;

    const darkPng = new PNG({ width, height });

    // In the original image:
    // - Black strokes (outer boundaries, inner boundaries, directional arrows, checkered line, PIT LANE text): r,g,b < 90, a > 100
    // - White track road surface (the asphalt inside the boundary lines): r,g,b > 240, a > 100
    // - Background (outside the track): a == 0 or white/transparent

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a === 0) {
          // Transparent outside
          darkPng.data[idx] = 0;
          darkPng.data[idx + 1] = 0;
          darkPng.data[idx + 2] = 0;
          darkPng.data[idx + 3] = 0;
        } else {
          const isBlackStroke = (r < 100 && g < 100 && b < 100);
          
          if (isBlackStroke) {
            // Track boundary lines, directional arrows, and text -> Crisp Pure White (#FFFFFF)
            darkPng.data[idx] = 255;
            darkPng.data[idx + 1] = 255;
            darkPng.data[idx + 2] = 255;
            darkPng.data[idx + 3] = a;
          } else {
            // Track road surface interior between the lines -> Dark Racing Asphalt (#181818 with subtle glow)
            darkPng.data[idx] = 22;
            darkPng.data[idx + 1] = 22;
            darkPng.data[idx + 2] = 22;
            darkPng.data[idx + 3] = Math.max(a, 240);
          }
        }
      }
    }

    darkPng.pack().pipe(fs.createWriteStream(darkFullOutputPath)).on('finish', () => {
      console.log('Saved dark track with complete road surface, all boundary lines, arrows, and checkered finish line fully preserved!');
    });
  });
