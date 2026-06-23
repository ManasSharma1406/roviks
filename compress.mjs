import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = 'public/assets';

async function compressImages() {
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inputPath = path.join(assetsDir, file);
    const tempPath = path.join(assetsDir, `temp_${file}`);

    try {
      if (ext === '.jpg' || ext === '.jpeg') {
        const stats = fs.statSync(inputPath);
        const initialSize = stats.size;
        
        console.log(`Compressing ${file} (initial size: ${(initialSize / 1024 / 1024).toFixed(2)} MB)...`);
        await sharp(inputPath)
          .jpeg({ quality: 80, progressive: true, mozjpeg: true })
          .toFile(tempPath);
          
        const newStats = fs.statSync(tempPath);
        if (newStats.size < initialSize) {
          fs.renameSync(tempPath, inputPath);
          console.log(`-> Reduced to ${(newStats.size / 1024).toFixed(2)} KB`);
          totalSaved += (initialSize - newStats.size);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`-> Skipped (already optimized)`);
        }
      } else if (ext === '.png') {
        const stats = fs.statSync(inputPath);
        const initialSize = stats.size;

        console.log(`Compressing ${file} (initial size: ${(initialSize / 1024 / 1024).toFixed(2)} MB)...`);
        await sharp(inputPath)
          .png({ quality: 75, compressionLevel: 9, effort: 8, palette: true })
          .toFile(tempPath);

        const newStats = fs.statSync(tempPath);
        if (newStats.size < initialSize) {
          fs.renameSync(tempPath, inputPath);
          console.log(`-> Reduced to ${(newStats.size / 1024).toFixed(2)} KB`);
          totalSaved += (initialSize - newStats.size);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`-> Skipped (already optimized)`);
        }
      }
    } catch (e) {
      console.error(`Error compressing ${file}:`, e.message);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  console.log(`\nDone! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

compressImages().catch(console.error);
