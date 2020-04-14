import MediaPlayer from '../../MediaPlayer';
import Ads, { Ad } from './Ads';

class AdsPlugins {
  private ads: Ads;
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private currentAd: Ad;

  constructor() {
    this.ads = Ads.getIstance();
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }
  run(player: MediaPlayer) {
    this.player = player;
    this.media = this.player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate);
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if (currentTime % 30 === 0) {
      this.rederAd();
    }
  }

  private rederAd() {
    if (this.currentAd) {
      return;
    }
    const ad = this.ads.getAds();
    this.currentAd = ad;
    console.log(ad);
  }
}

export default AdsPlugins;
