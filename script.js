// ============ GLOBALS ============
let currentPage = 1;
let musicPlaying = false;
let noButtonMoveCount = 0;

// ============ FLOATING HEARTS BACKGROUND ============
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '♥️', '🩷'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 25 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 14000);
    }, 500);
}

// ============ SPARKLE CURSOR TRAIL ============
function initSparkleTrail() {
    const canvas = document.getElementById('sparkleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let mouse = { x: -100, y: -100 };

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouse.x,
                y: mouse.y,
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 40 + 330}, 100%, ${Math.random() * 30 + 60}%)`,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1,
                decay: Math.random() * 0.02 + 0.015
            });
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(index, 1);
                return;
            }

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.beginPath();

            // Draw star shape
            const spikes = 4;
            const outerRadius = p.size;
            const innerRadius = p.size / 2;
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes - Math.PI / 2;
                const x = p.x + Math.cos(angle) * radius;
                const y = p.y + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });

        if (particles.length > 200) particles.splice(0, 50);
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// ============ ENVELOPE ============
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    envelope.classList.add('opened');
    
    // Create burst of hearts
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 15);
    
    setTimeout(() => {
        goToPage(2);
    }, 1200);
}

// ============ HEART BURST EFFECT ============
function createHeartBurst(x, y, count) {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '🩷'];
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 1000;
            transition: all ${Math.random() * 1 + 0.8}s ease-out;
            opacity: 1;
        `;
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
            const angle = (Math.PI * 2 * i) / count;
            const distance = Math.random() * 200 + 100;
            heart.style.left = (x + Math.cos(angle) * distance) + 'px';
            heart.style.top = (y + Math.sin(angle) * distance) + 'px';
            heart.style.opacity = '0';
            heart.style.transform = `scale(0) rotate(${Math.random() * 360}deg)`;
        });

        setTimeout(() => heart.remove(), 2000);
    }
}

// ============ PAGE NAVIGATION ============
function goToPage(pageNum) {
    const currentPageEl = document.querySelector('.page.active');
    const nextPageEl = document.getElementById('page' + pageNum);
    
    if (currentPageEl) currentPageEl.classList.remove('active');
    
    setTimeout(() => {
        nextPageEl.classList.add('active');
        currentPage = pageNum;
        
        if (pageNum === 3) startTyping();
        if (pageNum === 5) startFireworks();
    }, 300);
}

// ============ TYPING EFFECT ============
function startTyping() {
    const text = `Hai yang spesial di hatiku...\n\nDi hari Valentine ini, aku ingin bilang bahwa kamu adalah hal terindah yang pernah hadir dalam hidupku.\n\nSetiap momen bersamamu terasa begitu berharga, setiap senyummu membuat duniaku lebih berwarna.\n\nTerima kasih sudah menjadi alasan terbesarku untuk tersenyum setiap hari. 💕\n\nAku sayang kamu, hari ini, besok, dan selamanya...`;
    
    const textEl = document.getElementById('typedText');
    const cursorEl = document.querySelector('.cursor-blink');
    textEl.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            if (text[i] === '\n') {
                textEl.innerHTML += '<br>';
            } else {
                textEl.innerHTML += text[i];
            }
            i++;
            setTimeout(typeChar, text[i - 1] === '\n' ? 200 : 40);
        } else {
            cursorEl.style.display = 'none';
        }
    }
    
    setTimeout(typeChar, 500);
}

// ============ NO BUTTON DODGE ============
function moveNoButton() {
    const btn = document.getElementById('btnNo');
    const yesBtn = document.getElementById('btnYes');
    noButtonMoveCount++;
    
    const messages = [
        'Yakin nih? 🥺',
        'Pikir lagi dong... 😢',
        'Jangan gitu... 💔',
        'Please... 🥹',
        'Aku sedih 😭',
        'Satu kesempatan lagi? 🙏',
    ];
    
    // Move button to random position
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    btn.style.position = 'fixed';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    btn.style.zIndex = '100';
    btn.textContent = messages[noButtonMoveCount % messages.length];
    
    // Make yes button bigger each time
    const scale = 1 + (noButtonMoveCount * 0.1);
    yesBtn.style.transform = `scale(${Math.min(scale, 1.8)})`;
    
    // Make no button smaller
    const noScale = 1 - (noButtonMoveCount * 0.05);
    btn.style.transform = `scale(${Math.max(noScale, 0.5)})`;
}

// ============ YES ANSWER ============
function sayYes() {
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
    
    // Create petal rain
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createPetal(), i * 100);
    }
    
    setTimeout(() => goToPage(5), 1000);
}

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.top = '-20px';
    petal.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    const colors = ['#ff6b9d', '#ff3377', '#ffb3d1', '#ff85a8', '#e8557a'];
    petal.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
    
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 6000);
}

// ============ FIREWORKS ============
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    let fireworks = [];
    let particles = [];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = Math.random() * 3 + 4;
            this.color = `hsl(${Math.random() * 60 + 320}, 100%, 65%)`;
            this.alive = true;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 8) this.trail.shift();

            this.y -= this.speed;

            if (this.y <= this.targetY) {
                this.explode();
                this.alive = false;
            }
        }

        explode() {
            const shapes = ['circle', 'heart', 'star'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const particleCount = 60;

            for (let i = 0; i < particleCount; i++) {
                let vx, vy;
                
                if (shape === 'heart') {
                    const t = (i / particleCount) * Math.PI * 2;
                    vx = 16 * Math.pow(Math.sin(t), 3) * 0.3;
                    vy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * 0.3;
                } else if (shape === 'star') {
                    const angle = (i / particleCount) * Math.PI * 2;
                    const radius = i % 2 === 0 ? 5 : 2.5;
                    vx = Math.cos(angle) * radius;
                    vy = Math.sin(angle) * radius;
                } else {
                    const angle = (i / particleCount) * Math.PI * 2;
                    const speed = Math.random() * 4 + 2;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                }

                particles.push({
                    x: this.x,
                    y: this.y,
                    vx: vx + (Math.random() - 0.5),
                    vy: vy + (Math.random() - 0.5),
                    color: this.color,
                    life: 1,
                    decay: Math.random() * 0.015 + 0.008,
                    size: Math.random() * 3 + 1
                });
            }
        }

        draw() {
            // Trail
            this.trail.forEach((t, i) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, 2 * (i / this.trail.length), 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = i / this.trail.length * 0.5;
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Head
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 0, 5, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Spawn new fireworks
        if (Math.random() < 0.04) {
            fireworks.push(new Firework());
        }

        fireworks = fireworks.filter(f => f.alive);
        fireworks.forEach(f => {
            f.update();
            f.draw();
        });

        // Update particles
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.life -= p.decay;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        });

        if (currentPage === 5) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

// ============ MUSIC TOGGLE ============
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    
    if (musicPlaying) {
        music.pause();
        btn.classList.remove('playing');
        btn.textContent = '🎵';
    } else {
        music.play().catch(() => {});
        btn.classList.add('playing');
        btn.textContent = '🎶';
    }
    musicPlaying = !musicPlaying;
}

// ============ RESTART ============
function restart() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    noButtonMoveCount = 0;
    const btnNo = document.getElementById('btnNo');
    btnNo.style.position = '';
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.transform = '';
    btnNo.textContent = 'Tidak 💔';
    
    const btnYes = document.getElementById('btnYes');
    btnYes.style.transform = '';
    
    const envelope = document.getElementById('envelope');
    envelope.classList.remove('opened');
    
    currentPage = 1;
    
    setTimeout(() => {
        document.getElementById('page1').classList.add('active');
    }, 300);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initSparkleTrail();
});
