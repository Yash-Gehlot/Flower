const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sunflowerImage = new Image();
sunflowerImage.src = '5.png'; // Ensure you have a sunflower.png in the same directory

const sunflowers = [];

class Sunflower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 20 + 20; // Random size between 20 and 40 pixels
        this.speedY = Math.random() * 1 + 0.5; // Slower fall speed
        this.speedX = Math.random() * 1 - 0.5; // Slight horizontal drift
        this.opacity = 2;
    }

    update() {
        this.x += this.speedX; // Horizontal movement
        this.y += this.speedY; // Vertical falling movement
        this.opacity -= 0.005; // Slower fading
        if (this.opacity < 0) this.opacity = 0;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(sunflowerImage, this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1; // Reset opacity for other elements
    }
}

function handleSunflowers() {
    for (let i = 0; i < sunflowers.length; i++) {
        sunflowers[i].update();
        sunflowers[i].draw();
        if (sunflowers[i].opacity <= 0) {
            sunflowers.splice(i, 1);
            i--;
        }
    }
}

canvas.addEventListener('mousemove', function(e) {
    for (let i = 0.1; i < 0.5; i++) { // Create fewer sunflowers per mouse move
        sunflowers.push(new Sunflower(e.x, e.y));
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleSunflowers();
    requestAnimationFrame(animate);
}

animate();
