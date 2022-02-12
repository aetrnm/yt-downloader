import { createWriteStream } from 'fs';
import Innertube from 'youtubei.js';

export async function downloadVideo({
  id,
  title,
  metadata: { available_qualities },
}) {
  const youtube = await new Innertube();
  const stream = youtube.download(id, {
    format: 'mp4',
    quality: '1080p60',
    type: 'video',
  });

  stream.pipe(createWriteStream(`./${title}.mp4`));

  return new Promise((resolve) => stream.on('end', resolve));
}

export async function downloadAudio({ id, title }) {
  const youtube = await new Innertube();
  const stream = youtube.download(id, {
    type: 'audio',
  });

  stream.pipe(createWriteStream(`./${title}.mp3`));

  return new Promise((resolve) => stream.on('end', resolve));
}
