import MediaPlayer from '../../MediaPlayer.js';
import AutoPlay from '../../plugins/AutoPlay.js';

const video = document.getElementById('video');
const buttonPlay = document.getElementById('buttonPlay');
const buttonMute = document.getElementById('buttonUnMute');

const media = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });

buttonPlay.onclick = () => media.togglePlay();
buttonMute.onclick = () => media.toggleMute();
