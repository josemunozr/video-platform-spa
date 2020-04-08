import MediaPlayer from '../../MediaPlayer';
import AutoPlay from '../../plugins/AutoPlay';
import AutoPause from '../../plugins/AutoPause';

const video: HTMLElement = document.getElementById('video');
const buttonPlay: HTMLElement = document.getElementById('buttonPlay');
const buttonMute: HTMLElement = document.getElementById('buttonUnMute');

const media = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause()] });

buttonPlay.onclick = () => media.togglePlay();
buttonMute.onclick = () => media.toggleMute();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../../sw.js').catch(error => console.log(error.message));
}
