const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Circle and ripple properties
let circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 25,
    scale: 1
};

let ripple = {
    active: false,
    scale: 2,
    opacity: 1,
};

// Function to draw the circle
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw ripple if active
    if (ripple.active) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius * ripple.scale, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(224, 139, 270, ${ripple.opacity})`;
        ctx.fill();
        updateRipple();
    }

    // Draw main circle
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius * circle.scale, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(209, 124, 255, 1)';
    ctx.fill();
}

// Update ripple properties
function updateRipple() {
    ripple.scale += 0.05;
    ripple.opacity -= 0.02;

    if (ripple.opacity <= 0) {
        ripple.active = false;
        ripple.scale = 0.75;
        ripple.opacity = 1;
    }
}

// Event listener for keydown
document.addEventListener('keydown', function(event) {
    if(event.key === 'c' || event.key === 'C') {
        circle.scale = 1.1; // Increase circle size by 10%
        
        ripple.active = true; // Activate ripple effect
        drawCircle();
        }
        });
        
    // Event listener for keyup
    document.addEventListener('keyup', function(event) {
    if(event.key === 'c' || event.key === 'C') {
        circle.scale = 1; // Reset circle size
        drawCircle();
    }
});

    // Animation loop
    function animate() {
    requestAnimationFrame(animate);
    drawCircle();
}
        
animate();
        
        
