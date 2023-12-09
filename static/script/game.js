document.addEventListener('DOMContentLoaded', () => {
  const balloon = document.getElementById('balloon');
  const friction = 0.95;
  const pushStrength = 20;
  const gravity = 0.18;
  const collisionCooldown = 500;
  let velocityX = 0;
  let velocityY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let lastCollisionTime = 0;

  function startBalloonPosition() {
    const startX = window.innerWidth / 2 - balloon.clientWidth / 2;
    const startY = window.innerHeight / 4 - balloon.clientHeight / 2;
    setBalloonPosition(startX, startY);
  }

  function setBalloonPosition(x, y) {
    balloon.style.left = x + 'px';
    balloon.style.top = y + 'px';
  }

  function checkCollision() {
    let now = Date.now();
    if (now - lastCollisionTime < collisionCooldown) return;

    let rect = balloon.getBoundingClientRect();
    let balloonCenterX = rect.left + rect.width / 2;
    let balloonCenterY = rect.top + rect.height / 2;

    if (distance(mouseX, mouseY, balloonCenterX, balloonCenterY) < rect.width / 2) {
      let angle = Math.atan2(balloonCenterY - mouseY, balloonCenterX - mouseX);
      velocityX += pushStrength * Math.cos(angle);
      velocityY += pushStrength * Math.sin(angle);
      lastCollisionTime = now;
    }
  }

  function update() {
    velocityX *= friction;
    velocityY *= friction;
    velocityY += gravity;

    checkCollision();

    let rect = balloon.getBoundingClientRect();
    let newX = rect.left + velocityX;
    let newY = rect.top + velocityY;

    if (newX + rect.width > window.innerWidth || newX < 0) {
      velocityX *= -1;
      newX = newX < 0 ? 0 : window.innerWidth - rect.width;
    }

    if (newY > window.innerHeight) {
      window.location.href = '/lose';
      return;
    }

    setBalloonPosition(newX, newY);
    requestAnimationFrame(update);
  }

  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  startBalloonPosition();
  update();
});