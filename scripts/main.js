document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector('.prev-btn')
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let autoSlideInterval;

    const createIndicators = () => {
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0 ) dot.classList.add('active');
            dot.addEventListener('click', goToSlide(index));
            dotsContainer.appendChild(dot);
        })
    }
    const updateSlider = () => {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev')

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex + 1) % slides.length) {
                slide.classList.add('next');
            } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
                slide.classList.add('prev')
            }
        })

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        })
    }
    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide()
    }
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        resetAutoSlide()
    }
    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider()
        resetAutoSlide()
    }
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 106000)
    }
    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide()
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);


    createIndicators()
    updateSlider()
    startAutoSlide()

    const slider = document.querySelector('.comment-section');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
})