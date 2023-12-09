document.addEventListener("DOMContentLoaded", function () {
    const balloon = document.getElementById('balloon');

    balloon.addEventListener('mouseenter', bounceAway);

    function bounceAway(e) {
        const balloonRect = balloon.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the distance and direction between the mouse and the center of the balloon
        const deltaX = mouseX - (balloonRect.left + balloonRect.width / 2);
        const deltaY = mouseY - (balloonRect.top + balloonRect.height / 2);

        // Calculate the new position based on the distance and direction
        const newX = balloonRect.left - deltaX;
        const newY = balloonRect.top - deltaY;

        // Update the balloon's position and add bounce animation
        balloon.style.left = `${newX}px`;
        balloon.style.top = `${newY}px`;
        balloon.classList.add('bounce-animation');

        // Remove the bounce animation after it completes
        setTimeout(() => {
            balloon.classList.remove('bounce-animation');
        }, 500);
    }
});