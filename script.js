const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// container for note circles
const circles = [];

// Create circle objects
for (let i = 0; i < 11; i++) {
    const circle = {
        x: (i+1) * canvas.width / 12,
        y: canvas.height/2 + (Math.PI * 2) * (-30) * Math.sin(i * Math.PI / 5),
        radius: 25,
        scale: 1,
        midi: "./MIDI_notes/" + i + ".wav",
        playable: true,
        color: 'rgba(224, 139, 270, 1)',
        ripple: {
            active: false,
            scale: 0.75,
            opacity: 1,
        },
    };

    circles.push(circle);
}

// Function to draw the circles
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw ripple if active
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        if (circle.ripple.active) {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius * circle.ripple.scale, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(224, 139, 270, ${circle.ripple.opacity})`;
            ctx.fill();
            updateRipple(circle);
        }

        // Draw main circles
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius * circle.scale, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(209, 124, 255, 1)';
        ctx.fill();
    }
}

// Update ripple properties
function updateRipple(circle) {
    circle.ripple.scale += 0.25; // Increase the value to make the ripple effect larger
    circle.ripple.opacity -= 0.01; // Increase the value to make the ripple effect last longer

    if (circle.ripple.opacity <= 0) {
        circle.ripple.active = false;
        circle.ripple.scale = 0.75;
        circle.ripple.opacity = 1;
    }
}

// Function to play the assigned WAV file
function playWav(circle) {
    const audio = new Audio(circle.midi);
    audio.play();
}

// Event listener for keydown
document.addEventListener('keydown', function(event) {
    if(event.key === 'a' || event.key === 'A') {
        const circle = circles[0];
        circle.scale = 1.1; // Increase circle size by 10%
        
        circle.ripple.active = true; // Activate ripple effect
        drawCircles();
        
        if (circle.playable) {
            playWav(circle);
            circle.playable = false;
        }
    }

    if(event.key === 's' || event.key === 'S') {
        const circle = circles[1];
        circle.scale = 1.1; // Increase circle size by 10%
        
        circle.ripple.active = true; // Activate ripple effect
        drawCircles();
        
        if (circle.playable) {
            playWav(circle);
            circle.playable = false;
        }
    }
});

// Event listener for keyup
document.addEventListener('keyup', function(event) {
    if(event.key === 'a' || event.key === 'A') {
        const circle = circles[0];
        circle.scale = 1; // Reset circle size
        drawCircles();
        circle.playable = true;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    drawCircles();
}

animate();
