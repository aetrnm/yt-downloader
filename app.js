import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import Innertube from 'youtubei.js';
import ffmpeg from 'ffmpeg.js/ffmpeg-mp4.js';

async function downloadVideo(videoId) {
  const youtube = await new Innertube();
  const stream = youtube.download(videoId, {
    format: 'mp4',
    quality: '1080p',
    type: 'video',
  });

  const videoDetails = await youtube.getDetails(videoId);

  stream.pipe(createWriteStream(`./${videoDetails.title}.mp4`));

  return new Promise((resolve) => stream.on('end', resolve));
}

async function downloadAudio(videoId) {
  const youtube = await new Innertube();
  const stream = youtube.download(videoId, {
    type: 'audio',
  });

  const videoDetails = await youtube.getDetails(videoId);

  stream.pipe(createWriteStream(`./${videoDetails.title}.mp3`));

  return new Promise((resolve) => stream.on('end', resolve));
}

async function main(videoId) {
  await downloadVideo(videoId);
  await downloadAudio(videoId);
  merge();
}

const videoId = 'D9G1VOjN_84';
const youtube = await new Innertube();
const videoDetails = await youtube.getDetails(videoId);
const videoTitle = videoDetails.title;

main(videoId);

function merge() {
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
