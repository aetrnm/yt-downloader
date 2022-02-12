import Innertube from 'youtubei.js';
import { downloadAudio, downloadVideo } from './downloaders';
import { merge } from './tools';

const videoId = 'D9G1VOjN_84';
const youtube = await new Innertube();
const videoDetails = await youtube.getDetails(videoId);

async function main(videoId) {
  await downloadVideo(videoId);
  await downloadAudio(videoId);
  merge(videoDetails);
}

main(videoId);
