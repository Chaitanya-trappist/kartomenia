import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/kartomania-official-track.png';
const darkOutputPath = 'public/kartomania-track-dark.png';
const pureWhitePath = 'public/kartomania-track-white.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;

    const darkPng = new PNG({ width, height });
    const pureWhitePng = new PNG({ width, height });

    let linePixels = 0;
    let transparentPixels = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a === 0) {
          // 100% transparent background remains 100% transparent!
          darkPng.data[idx] = 0;
          darkPng.data[idx + 1] = 0;
          darkPng.data[idx + 2] = 0;
          darkPng.data[idx + 3] = 0;

          pureWhitePng.data[idx] = 0;
          pureWhitePng.data[idx + 1] = 0;
          pureWhitePng.data[idx + 2] = 0;
          pureWhitePng.data[idx + 3] = 0;
          transparentPixels++;
        } else {
          // This is the track outline stroke / arrow / text
          // Convert stroke to pure crisp white with exact original alpha
          darkPng.data[idx] = 255;
          darkPng.data[idx + 1] = 255;
          darkPng.data[idx + 2] = 255;
          darkPng.data[idx + 3] = a;

          pureWhitePng.data[idx] = 255;
          pureWhitePng.data[idx + 1] = 255;
          pureWhitePng.data[idx + 2] = 255;
          pureWhitePng.data[idx + 3] = a;
          linePixels++;
        }
      }
    }

    console.log(`Processed: ${transparentPixels} transparent pixels (100% clean background), ${linePixels} track line pixels.`);

    darkPng.pack().pipe(fs.createWriteStream(darkOutputPath)).on('finish', () => {
      console.log('Saved perfect dark track PNG with 100% transparent background!');
    });
  });
