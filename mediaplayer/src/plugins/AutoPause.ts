import MediaPlayer from '../MediaPlayer';

class AutoPause {
  player: MediaPlayer;

  constructor() {
    this.handlerInterceptor = this.handlerInterceptor.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  private run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handlerInterceptor, {
      threshold: 0.25
    });
    observer.observe(this.player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handlerInterceptor(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    entry.isIntersecting ? this.player.play() : this.player.pause();
  }

  private handleVisibilityChange() {
    const isVisibility = document.visibilityState === 'visible';
    isVisibility ? this.player.play() : this.player.pause();
  }
}

export default AutoPause;
