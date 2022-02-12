import { createWriteStream } from 'fs';
import Innertube from 'youtubei.js';

export async function downloadVideo(videoId) {
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

export async function downloadAudio(videoId) {
  const youtube = await new Innertube();
  const stream = youtube.download(videoId, {
    type: 'audio',
  });

  const videoDetails = await youtube.getDetails(videoId);

  stream.pipe(createWriteStream(`./${videoDetails.title}.mp3`));

  return new Promise((resolve) => stream.on('end', resolve));
}
