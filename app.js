import Innertube from 'youtubei.js';
import prompt from 'prompt';
import { downloadVideo, downloadAudio } from './downloaders.js';
import { merge, getIdByUrl } from './tools.js';

let { videoUrl } = await prompt.get([
  { name: 'videoUrl', required: true, type: 'string' },
]);
const videoId = getIdByUrl(videoUrl);
const youtube = await new Innertube();
const videoDetails = await youtube.getDetails(videoId);

async function main() {
  await downloadVideo(videoDetails);
  await downloadAudio(videoDetails);
  merge(videoDetails);
}

main();
