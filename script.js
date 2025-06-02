// --- EFEITO DE FADE NA ROLAGEM DA PÁGINA 1 ---
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

// --- SCROLL SUAVE PARA PÁGINA 2 QUANDO CLICAR NO BOTÃO "SOBRE" ---
const botaoSobre = document.querySelector('.link-inferior');

botaoSobre.addEventListener('click', function(event) {
    event.preventDefault();

    const pagina2 = document.getElementById('pagina2');
    if (!pagina2) return;

    // Scroll suave com duração maior para ficar mais lento
    const targetPosition = pagina2.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1800; // tempo em ms (aumente para deixar mais lento)
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        // easeInOutQuad para suavidade
        const ease = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, ease);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
});

// --- FADE IN SUAVE EM SEQUÊNCIA NA PÁGINA 2 (SOBRE MIM + SVG) ---
const sobreTitle = document.querySelector('.sobre-mim-title');
const svgContainer = document.querySelector('.svg-container');

function fadeInElementsSequential() {
    if (!sobreTitle || !svgContainer) return;

    const windowHeight = window.innerHeight;
    const containerTop = sobreTitle.getBoundingClientRect().top;

    // Quando o topo do título chegar a 150px do fim da janela, começa o fade in
    if (containerTop < windowHeight - 150) {
        if (!sobreTitle.classList.contains('visible')) {
            sobreTitle.classList.add('visible');

            setTimeout(() => {
                svgContainer.classList.add('visible');
            }, 600); // delay para a svg aparecer
        }
    } else {
        sobreTitle.classList.remove('visible');
        svgContainer.classList.remove('visible');
    }
}

// EVENTOS DE SCROLL E LOAD
window.addEventListener('scroll', () => {
    handleScrollFade();
    fadeInElementsSequential();
});

document.addEventListener('DOMContentLoaded', () => {
    handleScrollFade();
    fadeInElementsSequential();
});
