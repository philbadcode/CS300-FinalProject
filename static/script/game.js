document.addEventListener("DOMContentLoaded", function () {
    const balloon = document.getElementById('balloon');

    let velocity = { x: 0, y: 0 };
    const gravity = 0.1;
    const maxSpeed = 2; // Adjust the max speed as needed
    const mouseForceFactor = 0.01;

    balloon.addEventListener('mouseenter', applyMouseForce);

    function applyMouseForce(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the distance and direction between the mouse and the balloon
        const deltaX = mouseX - balloon.getBoundingClientRect().left;
        const deltaY = mouseY - balloon.getBoundingClientRect().top;

        // Adjust the velocity based on the mouse force
        velocity.x += deltaX * mouseForceFactor;
        velocity.y += deltaY * mouseForceFactor;
    }

    function updateBalloon() {
        // Apply gravity
        velocity.y += gravity;

        // Limit the speed
        const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
        if (speed > maxSpeed) {
            const ratio = maxSpeed / speed;
            velocity.x *= ratio;
            velocity.y *= ratio;
        }

        // Update position based on velocity
        const balloonRect = balloon.getBoundingClientRect();
        const newX = balloonRect.left + velocity.x;
        const newY = balloonRect.top + velocity.y;

        balloon.style.left = `${newX}px`;
        balloon.style.top = `${newY}px`;

        // Bounce off the walls
        if (newX < 0 || newX + balloonRect.width > window.innerWidth) {
            velocity.x *= -1;
        }
        if (newY < 0 || newY + balloonRect.height > window.innerHeight) {
            velocity.y *= -1;
        }

        requestAnimationFrame(updateBalloon);
    }

    // Start the animation loop
    updateBalloon();
});