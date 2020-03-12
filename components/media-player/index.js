const video = document.getElementById('video');
const buttonPlay = document.getElementById('buttonPlay');
const buttonPause = document.getElementById('buttonPause');

function MediaPlayer(config) {
  this.media = config.el;
}

MediaPlayer.prototype.play = function() {
  this.media.play();
};

MediaPlayer.prototype.pause = function() {
  this.media.pause();
};

MediaPlayer.prototype.togglePlay = function() {
  this.media.paused ? this.play() : this.pause();
};

const media = new MediaPlayer({ el: video });

buttonPlay.onclick = () => media.togglePlay();
// buttonPause.onclick = () => media.pause();
