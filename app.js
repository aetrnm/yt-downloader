import Innertube from 'youtubei.js';
import { downloadVideo, downloadAudio } from './downloaders.js';
import { merge } from './tools.js';

// const videoLink = 'https://www.youtube.com/watch?v=rLEnn_Y4Jbs';
const videoId = 'rLEnn_Y4Jbs';
const youtube = await new Innertube();
const videoDetails = await youtube.getDetails(videoId);

async function main() {
  await downloadVideo(videoDetails);
  await downloadAudio(videoDetails);
  merge(videoDetails);
}

main();
