import { Howl } from 'howler';

const tickSoft = new Howl({ src: ['https://cdn.doomclock.fun/tick-soft.mp3'], volume: 0.4, preload: true });
const tickLoud = new Howl({ src: ['https://cdn.doomclock.fun/tick-loud.mp3'], volume: 0.8, preload: true });
const sirenRise = new Howl({ src: ['https://cdn.doomclock.fun/siren-rise.mp3'], volume: 0.7 });

let tickerInterval: NodeJS.Timeout | null = null;

export const startDoomsdayTicker = (initialSeconds: number) => {
  let secondsLeft = initialSeconds;
  tickerInterval = setInterval(() => {
    if (secondsLeft <= 0) {
      clearInterval(tickerInterval!);
      sirenRise.play();
      return;
    }
    if (secondsLeft <= 10) tickLoud.play();
    else tickSoft.play();
    if (secondsLeft <= 30 && 'vibrate' in navigator) navigator.vibrate(30);
    secondsLeft--;
  }, 1000);
};
