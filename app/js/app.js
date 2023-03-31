console.log('Все работает!');

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content',
  smooth: .5,
  effects: true,
});

const splide = new Splide('.collab__slider', {
  type: 'loop',
  drag: 'free',
  focus: 'center',
  perPage: 4.5,
  arrows: false,
  pagination: false,
  autoScroll: {
    speed: 2,
    pauseOnHover: false,
  },
});

splide.mount(window.splide.Extensions);
