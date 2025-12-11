"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticlesBG = ParticlesBG;
var react_1 = require("react");
function ParticlesBG() {
    var canvasRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (!canvas)
            return;
        var ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        var animationId;
        var particles = [];
        var resizeCanvas = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        var createParticles = function () {
            particles = [];
            var particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            for (var i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                });
            }
        };
        var drawParticle = function (particle) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = "hsla(32, 95%, 55%, ".concat(particle.opacity, ")");
            ctx.fill();
        };
        var connectParticles = function () {
            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 120) {
                        var opacity = (1 - distance / 120) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = "hsla(32, 95%, 55%, ".concat(opacity, ")");
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };
        var updateParticle = function (particle) {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        };
        var animate = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function (particle) {
                updateParticle(particle);
                drawParticle(particle);
            });
            connectParticles();
            animationId = requestAnimationFrame(animate);
        };
        resizeCanvas();
        createParticles();
        animate();
        window.addEventListener('resize', function () {
            resizeCanvas();
            createParticles();
        });
        return function () {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);
    return (<canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: 'transparent' }}/>);
}
// override background\nconst overrideStyle = { background: 'transparent' };\n
