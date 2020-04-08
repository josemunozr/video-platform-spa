import MediaPlayer from '../../MediaPlayer.js';
import AutoPlay from '../../plugins/AutoPlay.js';
import AutoPause from '../../plugins/AutoPause.js';

const video = document.getElementById('video');
const buttonPlay = document.getElementById('buttonPlay');
const buttonMute = document.getElementById('buttonUnMute');

const media = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause()] });

buttonPlay.onclick = () => media.togglePlay();
buttonMute.onclick = () => media.toggleMute();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../../../sw.js').catch(error => console.log(error.message));
}
