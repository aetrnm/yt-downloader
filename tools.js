import { readFileSync, writeFileSync } from 'fs';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';

export function merge(videoDetails) {
  const videoTitle = videoDetails.title;
  const audioPath = `${videoTitle}.mp3`;
  const videoPath = `${videoTitle}.mp4`;
  const resultPath = './result/output.mp4';

  const audioData = new Uint8Array(readFileSync(audioPath));
  const videoData = new Uint8Array(readFileSync(videoPath));

  const result = ffmpeg({
    MEMFS: [
      {
        name: `${videoTitle}.mp3`,
        data: audioData,
      },
      {
        name: `${videoTitle}.mp4`,
        data: videoData,
      },
    ],
    arguments: [
      '-i',
      `${videoTitle}.mp3`,
      '-i',
      `${videoTitle}.mp4`,
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
