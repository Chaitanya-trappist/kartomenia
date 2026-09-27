import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/kartomania-circuit-map.png';
const darkOutputPath = 'public/kartomania-track-dark.png';
const transparentOutputPath = 'public/kartomania-track-transparent.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    const width = this.width;
    const height = this.height;

    // Create dark version (black background, white track lines)
    const darkPng = new PNG({ width, height });
    const transPng = new PNG({ width, height });

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        // Is it part of the black lines / text / arrows?
        // Black outline has low RGB values (< 80)
        const isBlackOutline = (r < 80 && g < 80 && b < 80);
        
        // Is it the track fill (pure white, r > 240, g > 240, b > 240)?
        // Note: the background checkerboard has alternating light grey (~238-245) and white (~255)
        // Let's distinguish black line from background
        
        if (isBlackOutline) {
          // For Dark mode: The line becomes bright crisp white (#FFFFFF)
          darkPng.data[idx] = 255;
          darkPng.data[idx + 1] = 255;
          darkPng.data[idx + 2] = 255;
          darkPng.data[idx + 3] = 255;

          // For Transparent mode: pure black with full opacity
          transPng.data[idx] = 0;
          transPng.data[idx + 1] = 0;
          transPng.data[idx + 2] = 0;
          transPng.data[idx + 3] = 255;
        } else {
          // Check if it's pure white track interior or background
          // We can make the background transparent!
          // Smooth anti-aliasing:
          const brightness = (r + g + b) / 3;
          if (brightness < 180) {
            // Anti-aliased edge
            const alpha = 255 - brightness;
            darkPng.data[idx] = 255;
            darkPng.data[idx + 1] = 255;
            darkPng.data[idx + 2] = 255;
            darkPng.data[idx + 3] = alpha;

            transPng.data[idx] = 0;
            transPng.data[idx + 1] = 0;
            transPng.data[idx + 2] = 0;
            transPng.data[idx + 3] = alpha;
          } else {
            // Background is completely transparent!
            darkPng.data[idx] = 0;
            darkPng.data[idx + 1] = 0;
            darkPng.data[idx + 2] = 0;
            darkPng.data[idx + 3] = 0;

            transPng.data[idx] = 0;
            transPng.data[idx + 1] = 0;
            transPng.data[idx + 2] = 0;
            transPng.data[idx + 3] = 0;
          }
        }
      }
    }

    darkPng.pack().pipe(fs.createWriteStream(darkOutputPath));
    transPng.pack().pipe(fs.createWriteStream(transparentOutputPath)).on('finish', () => {
      console.log('Successfully generated transparent & dark track images!');
    });
  });
