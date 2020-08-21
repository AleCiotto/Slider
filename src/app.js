/* ### AUTOPLAY ### */

let autoplayInterval;
document.getElementById('autoplay').addEventListener('change', data => {
  if (data.target && data.target.checked) {
    autoplayInterval = setInterval(() => {
      moveRight();
    }, 3000);
  } else {
    clearInterval(autoplayInterval);
  }
});

/* ### NAV ### */

const sliderNavButtons = document.querySelectorAll('#slider-nav button');
for (const navButton of sliderNavButtons) {
  navButton.addEventListener('click', event => {
    console.log('TODO: implement goTo function!', event.target.dataset.index);
  });
}

/* ### SLIDER ### */

let slider = document.getElementById('slider');
let slides = slider.querySelectorAll('li');
let slideCount = slides.length;
let slideWidth = slides[0].clientWidth;
let slideHeight = slides[0].clientHeight;
let animating = false;

// $('#slider').css({ width: slideWidth, height: slideHeight });

slider.style.width = `${slideWidth}px`;
slider.style.height = `${slideHeight}px`;

function moveLeft() {
  slider.querySelector('ul').classList.add('prev');
};

function moveRight() {
  slider.querySelector('ul').classList.add('next');
};

function fixSlidePosition(nextTriggered = true) {
  const activeS = slider.querySelector('li.active');
  let prevS, nextS;

  if (nextTriggered) {
    prevS = activeS.previousElementSibling || slider.querySelector('li:last-child');
    nextS = activeS.nextElementSibling || slides[0];
    const futureNextS = nextS.nextElementSibling || slides[0];

    activeS.classList.add('prev');
    nextS.classList.add('active');
    futureNextS.classList.add('next');
  } else {
    prevS = activeS.previousElementSibling || slider.querySelector('li:last-child');
    nextS = activeS.nextElementSibling || slides[0];
    const futurePrevS = prevS.previousElementSibling || slider.querySelector('li:last-child');

    prevS.classList.add('active');
    activeS.classList.add('next');
    futurePrevS.classList.add('prev');
  }

  prevS.classList.remove('prev');
  activeS.classList.remove('active');
  nextS.classList.remove('next');
}

slider.querySelector('.control_prev').addEventListener('click', () => {
  if (animating) return false;

  animating = true;
  moveLeft();
});

slider.querySelector('a.control_next').addEventListener('click', () => {
  if (animating) return false;

  animating = true;
  moveRight();
});

slider.querySelector('ul').addEventListener('animationend', () => {
  console.log('Animation ended');
  animating = false;
  const nextTriggered = slider.querySelector('ul').classList.contains('next');
  slider.querySelector('ul').classList.remove('prev');
  slider.querySelector('ul').classList.remove('next');

  fixSlidePosition(nextTriggered);
});