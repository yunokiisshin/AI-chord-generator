const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const defaultSize = 50; // Default size of the shape
let size = defaultSize;  // Current size of the shape
const maxLimit = 300;    // Max size to prevent overgrowth
const animationDuration = 50; // Duration of the animation in milliseconds
let animating = false;   // Flag to check if currently animating
let lastKeyPressed = null; // Track the last key pressed

// Function to draw the shape
function drawShape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.rect(50, 50, size, size); // Draw a square as an example
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

// Function to smoothly change the shape size
function animateSizeChange(targetSize) {
    const startTime = Date.now();
    const originalSize = size;
    animating = true;

    function animate() {
        const elapsedTime = Date.now() - startTime;
        const fraction = elapsedTime / animationDuration;

        if (fraction < 1) {
            size = originalSize + (targetSize - originalSize) * fraction;
            drawShape();
            requestAnimationFrame(animate);
        } else {
            size = targetSize;
            drawShape();
            animating = false;
        }
    }

    animate();
}

// Event listener for key down
document.addEventListener('keydown', (event) => {
    if (!animating && event.key === 'a' && lastKeyPressed !== 'a') {
        const newSize = Math.min(size * 1.1, maxLimit); // Increase size by 10%
        animateSizeChange(newSize);
        lastKeyPressed = 'a';
    }
});

// Event listener for key up
document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        animateSizeChange(defaultSize);
        lastKeyPressed = null;
    }
});

// Initial drawing
drawShape();
