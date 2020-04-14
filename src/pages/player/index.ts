import MediaPlayer from '../../MediaPlayer';
import AutoPlay from '../../plugins/AutoPlay';
import AutoPause from '../../plugins/AutoPause';
import AdsPlugins from '../../plugins/Ads';

const video: HTMLElement = document.getElementById('video');
const buttonPlay: HTMLElement = document.getElementById('buttonPlay');
const buttonMute: HTMLElement = document.getElementById('buttonUnMute');

const media = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause(), new AdsPlugins()] });

buttonPlay.onclick = () => media.togglePlay();
buttonMute.onclick = () => media.toggleMute();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../../sw.js').catch((error) => console.log(error.message));
}
