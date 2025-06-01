const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

// --- Ajustes Estrelas (do seu código anterior) ---
// Removendo 'numStars' como constante global, pois será dinâmico
const minSpeedX = 1.5;
const maxSpeedX = 3.5;
const speedYRange = 0.2;
// --------------------

let stars = [];
let currentNumStars = 60; // Valor inicial para telas grandes, será ajustado

// Função para ajustar a quantidade de estrelas baseada no tamanho da tela
function updateStarQuantity() {
    if (window.innerWidth <= 480) { // Telas MUITO pequenas (celulares em retrato)
        currentNumStars = 20; // Exemplo: 20 estrelas
    } else if (window.innerWidth <= 768) { // Telas pequenas (celulares grandes, tablets em retrato)
        currentNumStars = 40; // Exemplo: 40 estrelas
    } else { // Telas maiores (desktops, laptops)
        currentNumStars = 60; // Quantidade original
    }
}

// Redimensiona o canvas para ocupar a seção e recria as estrelas com a nova quantidade
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateStarQuantity(); // Atualiza a quantidade de estrelas antes de criá-las
    createStars(); // Recria as estrelas com a 'currentNumStars'
}

// Função para criar as estrelas
function createStars() {
    stars = [];
    for (let i = 0; i < currentNumStars; i++) { // Usa a quantidade dinâmica de estrelas
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

// Chamar uma vez no carregamento para configurar o canvas e as estrelas iniciais
resizeCanvas(); 
// Adicionar o listener para redimensionamento da janela
window.addEventListener('resize', resizeCanvas);

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

        // Lógica de reaparecimento da estrela quando sai da tela
        if (star.x > canvas.width + star.radius) {
            star.x = -star.radius; // Reaparece do lado esquerdo
            star.y = Math.random() * canvas.height; // Nova posição Y aleatória
            // Novas velocidades para variar
            star.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX;
            star.speedY = (Math.random() - 0.5) * speedYRange;
        }

        // Se sair pela parte superior ou inferior
        if (star.y < -star.radius || star.y > canvas.height + star.radius) {
            star.y = Math.random() * canvas.height; // Reaparece em Y aleatório
            star.x = -star.radius; // Reaparece do lado esquerdo (melhor para fluxo contínuo)
            star.speedX = Math.random() * (maxSpeedX - minSpeedX) + minSpeedX;
            star.speedY = (Math.random() - 0.5) * speedYRange;
        }
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// --- CÓDIGO PARA O EFEITO DE FADE NA ROLAGEM (mantido o mesmo) ---

const headerTitle = document.querySelector('.header-title');
const mensagemDireita = document.querySelector('.mensagem-direita');
const linksInferiores = document.querySelector('.links-inferiores');
const scrollIndicatorVertical = document.querySelector('.scroll-indicator-vertical');

const elementsToFade = [headerTitle, mensagemDireita, linksInferiores, scrollIndicatorVertical];

function handleScrollFade() {
    const scrollPosition = window.scrollY;
    const page1Height = window.innerHeight;

    const fadeStartThreshold = 0;
    const fadeEndThreshold = page1Height * 0.8;

    let scrollProgress = (scrollPosition - fadeStartThreshold) / (fadeEndThreshold - fadeStartThreshold);
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    const newOpacity = 1 - scrollProgress;

    elementsToFade.forEach(element => {
        if (element) {
            element.style.opacity = newOpacity;
            if (newOpacity <= 0.05) {
                element.style.pointerEvents = 'none';
            } else {
                element.style.pointerEvents = 'auto';
            }
        }
    });
}

window.addEventListener('scroll', handleScrollFade);
document.addEventListener('DOMContentLoaded', handleScrollFade);