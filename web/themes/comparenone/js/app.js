const items = document.querySelectorAll('[data-animate-class]');

function scrollTrigger(options = {}) {
  let els = document.querySelectorAll('[data-animate-class]');
  els = Array.from(els)
  els.forEach(el => {
    
    el.addEventListener('animationend', () => {
      if(el.dataset.animationFrequency === 'once') {
        el.dataset.animationState = 'done';
      } else {
        el.dataset.animationState = 'ready';
      }
      el.classList.remove(el.dataset.animateClass);
    });
    addObserver(el, options)
  })
}


// Receiving options passed from the scrollTrigger function
function addObserver(el, options) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const entryClassToAddOrRemove = entry.target.dataset.animateClass;
      if(entry.isIntersecting) {
        // console.log('Intersecting', Date.now(), Math.random());
        if(!entry.target.dataset.animationState || entry.target.dataset.animationState === 'ready') {
          entry.target.classList.add(entryClassToAddOrRemove);
          entry.target.dataset.animationState = "animating";
        }
      }
    })
  }, options) // Passing the options object to the observer
  observer.observe(el)
}

scrollTrigger({
  threshold: 0.25,
  rootMargin: '0px',
  root: null
})


/* Handle Animation Pause */
const partnerImages = document.querySelectorAll('.content-partners-image');
partnerImages.forEach(partnerImage => {
  partnerImage.addEventListener('mouseover', () => {
    document.querySelector('.content-partners-image-strip-one').style.animationPlayState = 'paused';
    document.querySelector('.content-partners-image-strip-two').style.animationPlayState = 'paused';
  });
  partnerImage.addEventListener('mouseleave', () => {
    document.querySelector('.content-partners-image-strip-one').style.animationPlayState = 'running';
    document.querySelector('.content-partners-image-strip-two').style.animationPlayState = 'running';
  });
});

/* Handle landing page pill toggles */
const pillableToggleElems = document.querySelectorAll('.pillable-toggle');
pillableToggleElems.forEach(pillableToggleElem => {
  pillableToggleElem.addEventListener('click', function(e) {
    pillableToggleElems.forEach(elem => {
      elem.classList.remove('context-pill', 'sub-context-pill');
    });
    e.target.classList.add('context-pill', 'sub-context-pill');
  });
});

/* Hamburger Toggle */
const hamBurgerElem = document.querySelector('.nav-menu-hamburger');
hamBurgerElem.addEventListener('click', function (e) {
  document.querySelector('.page-header').classList.add('menu-opened');
  hamBurgerElem.classList.add('no-display');
  document.querySelector('.nav-menu-close').classList.remove('no-display');
});

const menuCloseElem = document.querySelector('.nav-menu-close');
menuCloseElem.addEventListener('click', function (e) {
  document.querySelector('.page-header').classList.remove('menu-opened');
  menuCloseElem.classList.add('no-display');
  document.querySelector('.nav-menu-hamburger').classList.remove('no-display');
});