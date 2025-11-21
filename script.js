const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);

const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const dotsContainer = document.querySelector('.carousel-dots');

let index = 0;
let interval;

// Cria bolinhas
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

// Atualiza carrossel
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 30;
  track.style.transform = `translateX(${-index * slideWidth}px)`;

  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

// Auto play
function startAutoPlay() {
  interval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateCarousel();
  }, 4000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

// Botão próximo
nextBtn.addEventListener('click', () => {
  stopAutoPlay();
  index = (index + 1) % slides.length;
  updateCarousel();
  startAutoPlay();
});

// Botão anterior
prevBtn.addEventListener('click', () => {
  stopAutoPlay();
  index = (index - 1 + slides.length) % slides.length;
  updateCarousel();
  startAutoPlay();
});

// Clique nas bolinhas
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopAutoPlay();
    index = i;
    updateCarousel();
    startAutoPlay();
  });
});

// Arrastar no mobile
let startX = 0;

track.addEventListener('touchstart', (e) => {
  stopAutoPlay();
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX > endX + 50) index = (index + 1) % slides.length;
  if (startX < endX - 50) index = (index - 1 + slides.length) % slides.length;

  updateCarousel();
  startAutoPlay();
});

// Iniciar autoplay
startAutoPlay();

// ---- Scroll Suave Profissional (âncora) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#" || targetId === "#!") return;

    e.preventDefault();
    const target = document.querySelector(targetId);

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior:"smooth",
    });
  });
});
