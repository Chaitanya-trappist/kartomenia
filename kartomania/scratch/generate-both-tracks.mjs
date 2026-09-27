import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/kartomania-official-track.png';

fs.createReadStream(inputPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;

    const darkPng = new PNG({ width, height }); // White lines on transparent
    const lightPng = new PNG({ width, height }); // Black lines on transparent

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a === 0) {
          darkPng.data[idx] = 0;
          darkPng.data[idx + 1] = 0;
          darkPng.data[idx + 2] = 0;
          darkPng.data[idx + 3] = 0;

          lightPng.data[idx] = 0;
          lightPng.data[idx + 1] = 0;
          lightPng.data[idx + 2] = 0;
          lightPng.data[idx + 3] = 0;
        } else {
          // Dark version (White strokes)
          darkPng.data[idx] = 255;
          darkPng.data[idx + 1] = 255;
          darkPng.data[idx + 2] = 255;
          darkPng.data[idx + 3] = a;

          // Light version (Black strokes)
          lightPng.data[idx] = 0;
          lightPng.data[idx + 1] = 0;
          lightPng.data[idx + 2] = 0;
          lightPng.data[idx + 3] = a;
        }
      }
    }

    darkPng.pack().pipe(fs.createWriteStream('public/kartomania-track-dark.png'));
    lightPng.pack().pipe(fs.createWriteStream('public/kartomania-track-light.png')).on('finish', () => {
      console.log('Successfully generated both dark and light versions of the new track image!');
    });
  });
