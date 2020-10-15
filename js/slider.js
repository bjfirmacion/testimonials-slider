/* ========== SLIDER LOGIC ==========
1. Create selectors for the slider container, each slide, the next button and the previous button
2. Clone the first slide and append it at the end of the slides container
3. Clone the last slide and append it at the beginning of the slides container

NOTE: steps 2 and 3 will allow us to create an illusion of infinitely looping through the slider

4. Create a 'counter' variable and set it equal to 1
5. Add event listeners to the next and previous buttons
    If next button is clicked, add 1 to counter
    If prev button is clicked, subtract 1 from counter
6. Move to the next / previous slide by using transform: translateX to shift the slides horizontally
by each slide's width and margin multiplied by the number of slides tracked in counter

7. If the "last clone" is reached, reset counter to 0
8. If the "first clone" is reached, reset counter to 1
===================================== */

// SELECTORS
const container = document.querySelector('.slider');
const slider = document.querySelector('.slider__slides');
const slides = document.querySelectorAll('.slider__slide');
const prevBtn = document.querySelector('.slider__button--prev');
const nextBtn = document.querySelector('.slider__button--next');
const numSlides = slides.length;

// DETERMINE THE LENGTH REQUIRED TO MOVE HORIZONTALLY TO THE NEXT SLIDE
let slideWidth = slides[0].offsetWidth;
let slideMarginRight = parseInt(getComputedStyle(slides[0]).marginRight);
let moveX = slideWidth + slideMarginRight;

// CLONE FIRST AND LAST SLIDES AND ADD TO SLIDER
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[numSlides - 1].cloneNode(true);

firstClone.setAttribute('id', 'first-clone');
lastClone.setAttribute('id', 'last-clone');

slider.appendChild(firstClone);
slider.prepend(lastClone);

const allSlides = document.querySelectorAll('.slider__slide'); //allSlides includes the clones

// SHOW THE FIRST SLIDE
slider.style.transform = `translateX(${-moveX}px)`;

// SET COUNTER AND ADD EVENT LISTENERS TO BUTTON;
// EACH BUTTON CLICK SHOULD MOVE ALL SLIDES HORIZONTALLY BY MOVEX AMOUNT COUNTER TIMES
let counter = 1;

nextBtn.addEventListener('click', () => {
    counter++;
    slider.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    if (counter >= allSlides.length) counter = numSlides;
    console.log(counter);
});

prevBtn.addEventListener('click', () => {
    counter--;
    slider.style.transition = 'transform 0.5s ease-in-out, opacity 0.2s';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    if (counter < 0) counter = 0
});

// CHECK FOR FIRSTCLONE AND LASTCLONE AND RESET THE SLIDES ACCORDINGLY
slider.addEventListener('transitionend', () => {
    if (allSlides[counter].id === 'first-clone') {
        slider.style.transition = 'none';
        counter = 1;
        slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    }

    if (allSlides[counter].id === 'last-clone') {
        slider.style.transition = 'none';
        counter = numSlides;
        slider.style.transform = `translateX(${-(moveX * counter)}px)`;
    }
});

// ADJUST THE SLIDER POSITION WHEN THE SLIDER/VIEWPORT IS RESIZED
window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    slideMarginRight = parseInt(getComputedStyle(slides[0]).marginRight);
    moveX = slideWidth + slideMarginRight;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-(moveX * counter)}px)`;
});