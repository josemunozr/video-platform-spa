class AutoPause {
  constructor() {
    this.player = {};
    this.handlerInterceptor = this.handlerInterceptor.bind(this);
  }

  run(player) {
    this.player = player;
    const observer = new IntersectionObserver(this.handlerInterceptor, {
      threshold: 0.25
    });
    observer.observe(this.player.media);
  }

  handlerInterceptor(entries) {
    const entry = entries[0];
    if (entry.isIntersecting) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}

export default AutoPause;
