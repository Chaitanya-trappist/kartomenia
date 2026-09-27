import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/kartomania-official-track.png';
const darkOutputPath = 'public/kartomania-track-dark.png';
const lightOutputPath = 'public/kartomania-track-transparent.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;
    console.log(`Track image dimensions: ${width}x${height}`);

    const darkPng = new PNG({ width, height });
    const lightPng = new PNG({ width, height });

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        const isBlackLine = (r < 90 && g < 90 && b < 90);
        const brightness = (r + g + b) / 3;

        if (isBlackLine) {
          // Dark mode: turn black line into pure crisp white line (#FFFFFF)
          darkPng.data[idx] = 255;
          darkPng.data[idx + 1] = 255;
          darkPng.data[idx + 2] = 255;
          darkPng.data[idx + 3] = 255;

          // Light mode: solid black
          lightPng.data[idx] = 0;
          lightPng.data[idx + 1] = 0;
          lightPng.data[idx + 2] = 0;
          lightPng.data[idx + 3] = 255;
        } else if (brightness < 210) {
          // Anti-aliasing edge
          const alpha = 255 - brightness;
          darkPng.data[idx] = 255;
          darkPng.data[idx + 1] = 255;
          darkPng.data[idx + 2] = 255;
          darkPng.data[idx + 3] = alpha;

          lightPng.data[idx] = 0;
          lightPng.data[idx + 1] = 0;
          lightPng.data[idx + 2] = 0;
          lightPng.data[idx + 3] = alpha;
        } else {
          // Transparent background
          darkPng.data[idx] = 0;
          darkPng.data[idx + 1] = 0;
          darkPng.data[idx + 2] = 0;
          darkPng.data[idx + 3] = 0;

          lightPng.data[idx] = 0;
          lightPng.data[idx + 1] = 0;
          lightPng.data[idx + 2] = 0;
          lightPng.data[idx + 3] = 0;
        }
      }
    }

    darkPng.pack().pipe(fs.createWriteStream(darkOutputPath));
    lightPng.pack().pipe(fs.createWriteStream(lightOutputPath)).on('finish', () => {
      console.log('Successfully generated clean dark and transparent track images matching exact dimensions!');
    });
  });
