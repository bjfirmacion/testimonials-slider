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
const slider = document.querySelector('.slider__slides');
const slides = document.querySelectorAll('.slider__slide');
const prevBtn = document.querySelector('.slider__button--prev');
const nextBtn = document.querySelector('.slider__button--next');
const numSlides = slides.length;

// DETERMINE THE LENGTH REQUIRED TO MOVE HORIZONTALLY TO THE NEXT SLIDE
const slideWidth = slides[0].offsetWidth;
const slideMarginRight = parseInt(getComputedStyle(slides[0]).marginRight);
const moveX = slideWidth + slideMarginRight;

// CLONE FIRST AND LAST SLIDES AND ADD TO SLIDER
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[numSlides - 1].cloneNode(true);

firstClone.setAttribute('id', 'first-clone');
lastClone.setAttribute('id', 'last-clone');

slider.appendChild(firstClone);
slider.prepend(lastClone);

const allSlides = document.querySelectorAll('.slider__slide'); //allSlides includes the clones

// SHOW THE FIRST SLIDE
slides[0].classList.add('active');
allSlides.forEach(slide => {
    slide.style.transform = `translateX(${-moveX}px)`;
});

// SET COUNTER AND ADD EVENT LISTENERS TO BUTTON;
// EACH BUTTON CLICK SHOULD MOVE ALL SLIDES HORIZONTALLY BY MOVEX AMOUNT COUNTER TIMES
let counter = 1;

nextBtn.addEventListener('click', () => {
    allSlides[counter].classList.remove('active');
    counter++;
    allSlides[counter].classList.add('active');
    allSlides.forEach(slide => {
        slide.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s';
        slide.style.transform = `translateX(${-(moveX * counter)}px)`;
    });
    console.log(counter);
});

prevBtn.addEventListener('click', () => {
    allSlides[counter].classList.remove('active');
    counter--;
    allSlides[counter].classList.add('active');
    allSlides.forEach(slide => {
        slide.style.transform = `translateX(${-(moveX * counter)}px)`;
    });
    console.log(counter, allSlides[counter].id);
});

// CHECK FOR FIRSTCLONE AND LASTCLONE AND RESET THE SLIDES ACCORDINGLY
//DEBUG THIS!!!
allSlides.forEach(slide => {
    slide.addEventListener('transitionend', () => {
        if (allSlides[counter].id === 'first-clone') {
            allSlides.forEach(slide => {
                slide.style.transition = 'none';
            });
            counter = 1;
            allSlides[counter].classList.add('active');
            allSlides.forEach(slide => {
                slide.style.transform = `translateX(${-(moveX * counter)}px)`;
            });
        }

        if (allSlides[counter].id === 'last-clone') {
            allSlides.forEach(slide => {
                slide.style.transition = 'none';
            });
            counter = numSlides - 1;
            allSlides[counter].classList.add('active');
            allSlides.forEach(slide => {
                slide.style.transform = `translateX(${-(moveX * counter)}px)`;
            });
        }

    });
});