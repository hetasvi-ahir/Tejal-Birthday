import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

export const fireHeartConfetti = () => {
  const scalar = 2;
  const heart = confetti.shapeFromPath({ path: 'M167 10c-75 0-167 60-167 135 0 97 167 245 167 245s167-148 167-245c0-75-92-135-167-135z' });

  confetti({
    shapes: [heart],
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#F4A6C1', '#E891B4', '#FFE4E1'],
    scalar
  });
};
