import { readFileSync, writeFileSync } from 'fs';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';
import { writeFile, mkdirSync, existsSync } from 'fs';

function createResultFolder() {
  const dir = './result';
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFile('./result/out.mp4', '', function (err) {
    if (err) throw err;
  });
}

export function merge({ title }) {
  const audioPath = `${title}.mp3`;
  const videoPath = `${title}.mp4`;
  const resultPath = './result/out.mp4';

  createResultFolder();

  const audioData = new Uint8Array(readFileSync(audioPath));
  const videoData = new Uint8Array(readFileSync(videoPath));

  const result = ffmpeg({
    MEMFS: [
      {
        name: `${title}.mp3`,
        data: audioData,
      },
      {
        name: `${title}.mp4`,
        data: videoData,
      },
    ],
    arguments: [
      '-i',
      `${title}.mp3`,
      '-i',
      `${title}.mp4`,
      '-c:v',
      'copy',
      '-c:a',
      'aac',
      '-strict',
      'experimental',
      'out.mp4',
    ],
  });
  const out = result.MEMFS[0];
  writeFileSync(resultPath, Buffer.from(out.data));
}
