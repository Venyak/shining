console.log('Все работает!');

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// ScrollSmoother.create({
//   wrapper: '.wrapper',
//   content: '.content',
//   smooth: 0.5,
//   effects: true,
// });

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

// Service's tabs
{
  const tabs = document.querySelectorAll('.services__tab');
  const item = document.querySelectorAll('.services__content');

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i] === btn) {
          tabs[i].classList.add('active');
          item[i].classList.add('active');
        } else {
          tabs[i].classList.remove('active');
          item[i].classList.remove('active');
        }
      }
    });
  });
}

// Calculator

// Elements

const totalPrice = document.querySelector('.calc__price-value');
const cleaningType = document.querySelector('#cleaning-type');
const areaType = document.querySelector('#area-type');
const roomsSelector = document.querySelector('.rooms');
const areaSelector = document.querySelector('.area');
const windowsSelector = document.querySelector('.windows-count');
const windowsCheckbox = document.querySelector('#windows');
const disinfectionCheckbox = document.querySelector('#disinfection');

let cleaningTypeValue = +cleaningType.value;
let areaTypeValue = +areaType.value;
let roomsCount = +roomsSelector.innerText;
let areaCount = +areaSelector.innerText;
let windowsCount = +windowsSelector.innerText;
const windowsCheckboxValue = windowsCheckbox.checked ? 1 : 0;
const disinfectionCheckboxValue = disinfectionCheckbox.checked ? 1 : 0;

var priceValue = 0;

const calculator = () => {
  let priceForCleaningType = 0;
  let priceForAreaType = 0;
  const pricePerRooms = 200;
  const pricePerArea = 50;
  const pricePerWindow = 150 * windowsCheckboxValue;
  const priceForDisinfection = 1000 * disinfectionCheckboxValue;

  if (cleaningTypeValue === 1) {
    priceForCleaningType = 2000;
  } else if (cleaningTypeValue === 2) {
    priceForCleaningType = 2500;
  } else if (cleaningTypeValue === 3) {
    priceForCleaningType = 1000;
  }

  if (priceForAreaType === 1) {
    priceForAreaType = 1000;
  } else if (priceForAreaType === 2) {
    priceForAreaType = 3000;
  } else if (priceForAreaType === 3) {
    priceForAreaType = 2500;
  }

  const totalForRooms = pricePerRooms * roomsCount;
  const totalForArea = pricePerArea * areaCount;
  const totalForWindow = pricePerWindow * windowsCount;
  const totalForDisinfection = priceForDisinfection;

  console.log(totalForRooms, totalForArea, totalForWindow, totalForDisinfection);

  priceValue =
    priceForCleaningType +
    priceForAreaType +
    totalForRooms +
    totalForArea +
    totalForWindow +
    totalForDisinfection;
};

// Dropdown

document.querySelectorAll('.dropdown').forEach((dropdownWrapper) => {
  const dropdownBtn = dropdownWrapper.querySelector('.dropdown__btn');
  const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
  const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');
  const dropdownInput = dropdownWrapper.querySelector('.dropdown__input');

  dropdownBtn.addEventListener('click', () => {
    dropdownList.classList.toggle('dropdown__list-active');
  });

  dropdownItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.stopPropagation();
      dropdownBtn.innerText = item.innerText;
      dropdownList.classList.remove('dropdown__list-active');
      dropdownInput.value = item.dataset.value;
      calculator();
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target !== dropdownBtn && event.target !== dropdownList) {
      dropdownList.classList.remove('dropdown__list-active');
    }
  });

  if ((dropdownWrapper.id = 'area')) {
  }
});

// Counter

document.querySelectorAll('.calc__area-counter').forEach((counterWrapper) => {
  const minusBtn = counterWrapper.querySelector('.calc__counter-minus');
  const plusBtn = counterWrapper.querySelector('.calc__counter-plus');
  const counter = counterWrapper.querySelector('.calc__counter-count');

  minusBtn.addEventListener('click', () => {
    if (Number(counter.innerText) !== 0) {
      counter.innerText = Number(counter.innerText) - 1;
      calculator();
    }
  });

  plusBtn.addEventListener('click', () => {
    counter.innerText = Number(counter.innerText) + 1;
    calculator();
  });
});
