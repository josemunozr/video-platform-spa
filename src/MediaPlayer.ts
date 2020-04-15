class MediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;
  container: HTMLElement;
  constructor(config) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initPlugins();
  }
  private initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run(this);
    });
  }

  initPlayer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  play() {
    this.media.play();
  }
  pause() {
    this.media.pause();
  }
  togglePlay() {
    this.media.paused ? this.play() : this.pause();
  }
  mute() {
    this.media.muted = true;
  }
  unMute() {
    this.media.muted = false;
  }
  toggleMute() {
    this.media.muted = !this.media.muted;
  }
}

export default MediaPlayer;
