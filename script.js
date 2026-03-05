// ═══════ Barra de Progresso de Leitura ═══════
window.addEventListener('scroll', () => {
    updateProgressBar();
    handleNavScroll();
    handleBackToTop();
});

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// ═══════ Navbar - Efeito ao Scrollar ═══════
function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// ═══════ Botão Voltar ao Topo ═══════
function handleBackToTop() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }
}

// ═══════ Partículas Animadas no Hero ═══════
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx2d = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resizeCanvas() {
        const header = canvas.parentElement;
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx2d.beginPath();
            ctx2d.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx2d.fillStyle = `rgba(230, 57, 70, ${this.opacity})`;
            ctx2d.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx2d.beginPath();
                    ctx2d.strokeStyle = `rgba(230, 57, 70, ${opacity})`;
                    ctx2d.lineWidth = 0.5;
                    ctx2d.moveTo(particles[i].x, particles[i].y);
                    ctx2d.lineTo(particles[j].x, particles[j].y);
                    ctx2d.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// ═══════ Gráfico Chart.js - Faturamento ═══════
const chartCanvas = document.getElementById('faturamentoChart');
if (chartCanvas) {
    new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
            labels: ['Exportação (Cocaína)', 'Mercado Interno', 'Lavagem/Negócios', 'Outros'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: ['#e63946', '#1a1a1d', '#555', '#a0a0ab'],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#a0a0ab',
                        font: { family: 'Inter', size: 12 },
                        padding: 15,
                        usePointStyle: true,
                        pointStyleWidth: 10
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// ═══════ Busca com Destaque ═══════
const searchInput = document.getElementById('siteSearch');
if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('keyup', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const term = e.target.value.toLowerCase();
            const keywords = document.querySelectorAll('p, h3, h4, li, .artigo-text');

            keywords.forEach(el => {
                if (term.length > 2) {
                    if (el.innerText.toLowerCase().includes(term)) {
                        el.classList.add('search-highlight');
                    } else {
                        el.classList.remove('search-highlight');
                    }
                } else {
                    el.classList.remove('search-highlight');
                }
            });
        }, 200);
    });
}

// ═══════ Observador de Scroll (Animações de Entrada) ═══════
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ═══════ Scroll Suave ═══════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ═══════ Modo Foco ═══════
const focusToggle = document.getElementById('focusToggle');
if (focusToggle) {
    focusToggle.addEventListener('click', () => {
        document.body.classList.toggle('focus-mode');
        focusToggle.innerText = document.body.classList.contains('focus-mode') ? '🕶️' : '👁️';
    });
}

// ═══════ Atalhos de Teclado ═══════
document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape') {
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        if (nav && burger) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
        }
    }

    // Ctrl+K foca na busca
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const search = document.getElementById('siteSearch');
        if (search) search.focus();
    }
});
