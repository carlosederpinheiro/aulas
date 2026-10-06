document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideDisplay = document.getElementById('current-slide');
    const totalSlidesDisplay = document.getElementById('total-slides');
    const progressBar = document.getElementById('progress-bar');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // Inicializa contador
    totalSlidesDisplay.textContent = totalSlides;

    function updateSlide() {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[currentSlideIndex].classList.add('active');
        
        // Update counter
        currentSlideDisplay.textContent = currentSlideIndex + 1;
        
        // Update progress bar
        const progressPercentage = ((currentSlideIndex) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Manage button states
        prevBtn.style.opacity = currentSlideIndex === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentSlideIndex === 0 ? 'default' : 'pointer';
        
        nextBtn.style.opacity = currentSlideIndex === totalSlides - 1 ? '0.3' : '1';
        nextBtn.style.cursor = currentSlideIndex === totalSlides - 1 ? 'default' : 'pointer';
    }

    function goToNextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlide();
        }
    }

    function goToPrevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlide();
        }
    }

    // Event Listeners para botões
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Event Listeners para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'Enter') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Navegação por Clique (Mobile e Desktop)
    document.addEventListener("click", (e) => {
        if (window.innerHeight > window.innerWidth && window.innerWidth < 900) return;
        if (e.target.closest("button")) return; // Ignora se clicou nos botões originais
        const halfScreen = window.innerWidth / 2;
        if (e.clientX > halfScreen) {
            goToNextSlide();
        } else {
            goToPrevSlide();
        }
    });

    // Inicia a apresentação
    updateSlide();
});
