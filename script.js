const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

// --- Ajustes Estrelas (do seu código anterior) ---
const numStars = 60;
const minSpeedX = 1.5;
const maxSpeedX = 3.5;
const speedYRange = 0.2;
// --------------------

let stars = [];

// Redimensiona o canvas para ocupar a seção
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
}

// Função para criar as estrelas
function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        const speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX;
        const speedY = (Math.random() - 0.5) * speedYRange;

        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speedX: speedX,
            speedY: speedY
        });
    }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
createStars();

// Animação das estrelas
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x > canvas.width + star.radius) {
            star.x = -star.radius;
            star.y = Math.random() * canvas.height;
            star.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX;
            star.speedY = (Math.random() - 0.5) * speedYRange;
        }

        if (star.y < -star.radius || star.y > canvas.height + star.radius) {
            star.y = Math.random() * canvas.height;
            star.x = -star.radius;
            star.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX;
            star.speedY = (Math.random() - 0.5) * speedYRange;
        }
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// --- NOVO CÓDIGO PARA O EFEITO DE FADE NA ROLAGEM ---

// Seleciona os elementos da página 1 que irão sumir/aparecer
const headerTitle = document.querySelector('.header-title');
const mensagemDireita = document.querySelector('.mensagem-direita');
const linksInferiores = document.querySelector('.links-inferiores');
const scrollIndicatorVertical = document.querySelector('.scroll-indicator-vertical');

const elementsToFade = [headerTitle, mensagemDireita, linksInferiores, scrollIndicatorVertical];

function handleScrollFade() {
    const scrollPosition = window.scrollY; // Distância de rolagem do topo
    const page1Height = window.innerHeight; // Altura total da primeira página (viewport)

    // Define a faixa de rolagem onde o fade ocorrerá
    // O fade começa quando o scroll está em 0% da página 1
    // E termina quando o scroll atinge 80% da altura da página 1
    const fadeStartThreshold = 0;
    const fadeEndThreshold = page1Height * 0.8; // 80% da altura da página

    // Calcula o progresso da rolagem dentro da faixa de fade (0 a 1)
    let scrollProgress = (scrollPosition - fadeStartThreshold) / (fadeEndThreshold - fadeStartThreshold);

    // Garante que o progresso esteja entre 0 e 1
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    // Calcula a nova opacidade (de 1 para 0 conforme rola para baixo)
    const newOpacity = 1 - scrollProgress;

    // Aplica a nova opacidade e ajusta o 'pointer-events'
    elementsToFade.forEach(element => {
        if (element) { // Garante que o elemento exista antes de manipular
            element.style.opacity = newOpacity;

            // Desabilita eventos de mouse quando o elemento está quase invisível
            // Isso evita que elementos invisíveis bloqueiem cliques em conteúdo abaixo
            if (newOpacity <= 0.05) {
                element.style.pointerEvents = 'none';
            } else {
                element.style.pointerEvents = 'auto';
            }
        }
    });
}

// Adiciona o event listener para o evento de rolagem
window.addEventListener('scroll', handleScrollFade);

// Chama a função uma vez ao carregar a página
// Isso garante que a opacidade inicial esteja correta caso a página seja carregada já rolada
document.addEventListener('DOMContentLoaded', handleScrollFade);