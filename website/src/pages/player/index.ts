import MediaPlayer from '@jmunozr_/mediaplayer/lib/MediaPlayer';
import AutoPlay from '@jmunozr_/mediaplayer/lib/plugins/AutoPlay';
import AutoPause from '@jmunozr_/mediaplayer/lib/plugins/AutoPause';
import AdsPlugins from '@jmunozr_/mediaplayer/lib/plugins/Ads';

const video: HTMLElement = document.getElementById('video');
const buttonPlay: HTMLElement = document.getElementById('buttonPlay');
const buttonMute: HTMLElement = document.getElementById('buttonUnMute');

const media = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause(), new AdsPlugins()] });

buttonPlay.onclick = () => media.togglePlay();
buttonMute.onclick = () => media.toggleMute();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../../sw.js').catch((error) => console.log(error.message));
}
