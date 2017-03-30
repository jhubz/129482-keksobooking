'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
function getRandomIntNumber(min, max) {
  var randomNumber = Math.random() * (max + 1 - min) + min;
  randomNumber = Math.floor(randomNumber);

  return randomNumber;
}

// ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
function getRandomArray(array) {
  var randomArray = [];
  var i;

  for (i = 0; i < array.length; i++) {
    if (Math.random() >= 0.5) {
      randomArray.push(array[i]);
    }
  }

  return randomArray;
}

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ
function generatePin(number) {
  var types = ['flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var title = 'Заголовок';
  var address = 'Адрес';
  var minPrice = 1000;
  var maxPrice = 1000000;
  var minRooms = 1;
  var maxRooms = 5;
  var minGuests = 1;
  var maxGuests = 10;

  var minX = 300;
  var maxX = 900;
  var minY = 100;
  var maxY = 500;

  var pin = {
    'author': {
      "avatar": 'img/avatars/user0' + (number + 1) + '.png'
    },

    'offer': {
      'title': title,
      'address': address,
      'price': getRandomIntNumber(minPrice, maxPrice),
      'type': types[getRandomIntNumber(0, types.length - 1)],
      'rooms': getRandomIntNumber(minRooms, maxRooms),
      'guests': getRandomIntNumber(minGuests, maxGuests),
      'checkin': times[getRandomIntNumber(0, times.length - 1)],
      'checkout': times[getRandomIntNumber(0, times.length - 1)],
      'features': getRandomArray(features),
      'description': '',
      'photos': ''
    },

    'location': {
      'x': getRandomIntNumber(minX, maxX),
      'y': getRandomIntNumber(minY, maxY)
    }
  };

  return pin;
}

// СОЗДАНИЕ МАССИВА ОБЪЯВЛЕНИЙ
function generatePins() {
  var pins = [];
  var pinsCount = 8;
  var i;

  for (i = 0; i < pinsCount; i++) {
    pins.push(generatePin(i));
  }

  return pins;
}

// СОЗДАНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЯ
function createPinMark(x, y, avatarPath) {
  var pinWidth = 56;
  var pinHeight = 75;
  var rootNodeClass = 'pin';
  var rootNodeStyle = 'left: ' + (x - pinWidth / 2) + 'px; top: ' + (y - pinHeight) + 'px';
  var pinMark;
  var pinImageMark;

  pinMark = document.createElement('div');
  pinMark.classList.add(rootNodeClass);
  pinMark.setAttribute('style', rootNodeStyle);

  pinImageMark = document.createElement('img');
  pinImageMark.setAttribute('src', avatarPath);

  pinMark.appendChild(pinImageMark);

  return pinMark.outerHTML;
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК ДЛЯ ОБЪЯВЛЕНИЙ
function createPinMarks(array) {
  var pinMark;
  var pinMarks = [];

  var i;

  for (i = 0; i < array.length; i++) {
    pinMark = createPinMark(array[i].location.x, array[i].location.y, array[i].author.avatar);
    pinMarks.push(pinMark);
  }
  return pinMarks;
}

// ДОБАВЛЕНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЙ НА СТРАНИЦУ
function addPinMarksOnPage(array) {
  var i;

  for (i = 0; i < array.length; i++) {
    pinMap.insertAdjacentHTML('beforeEnd', array[i]);
  }
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
function createFeaturesMark(pin) {
  var featureElement;
  var featuresFragment = document.createDocumentFragment();

  var i;

  for (i = 0; i < pin.offer.features.length; i++) {
    featureElement = document.createElement('span');

    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + pin.offer.features[i]);

    featuresFragment.appendChild(featureElement);
  }

  return featuresFragment;
}

// СОЗДАНИЕ РАЗМЕТКИ КОНТЕЙНЕРА ДЛЯ ДИАЛОГА
function createDialogContainer(pin) {
  var dialogContainer = document.createElement('div');

  var dialogTitle = document.createElement('div');
  var dialogTitleImage = document.createElement('img');
  var dialogTitleImageAlt = 'Avatar';
  var dialogTitleImageWidth = '70';
  var dialogTitleImageHeight = '70';

  var dialogContainerClose = document.createElement('a');
  var dialogContainerCloseHref = '#';
  var dialogContainerCloseClass = 'dialog__close';

  var dialogContainerCloseImage = document.createElement('img');
  var dialogContainerCloseImageSrc = 'img/close.svg';
  var dialogContainerCloseImageAlt = 'close';
  var dialogContainerCloseImageWidth = '22';
  var dialogContainerCloseImageHeight = '22';

  dialogContainer.classList.add('dialog');

  dialogTitle.classList.add('dialog__title');

  dialogTitleImage.setAttribute('src', pin.author.avatar);
  dialogTitleImage.setAttribute('alt', dialogTitleImageAlt);
  dialogTitleImage.setAttribute('width', dialogTitleImageWidth);
  dialogTitleImage.setAttribute('height', dialogTitleImageHeight);

  dialogContainerClose.setAttribute('href', dialogContainerCloseHref);
  dialogContainerClose.setAttribute('class', dialogContainerCloseClass);

  dialogContainerCloseImage.setAttribute('src', dialogContainerCloseImageSrc);
  dialogContainerCloseImage.setAttribute('alt', dialogContainerCloseImageAlt);
  dialogContainerCloseImage.setAttribute('width', dialogContainerCloseImageWidth);
  dialogContainerCloseImage.setAttribute('height', dialogContainerCloseImageHeight);

  dialogContainerClose.appendChild(dialogContainerCloseImage);

  dialogTitle.appendChild(dialogTitleImage);
  dialogTitle.appendChild(dialogContainerClose);

  dialogContainer.appendChild(dialogTitle);

  return dialogContainer;
}

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ТИПА СДАВАЕМОГО ОБЪЕКТА
function getOfferTypeValue(pin) {
  return (pin.offer.type === 'flat') ? 'Квартира' : (pin.offer.type === 'house') ? 'Дом' : 'Бунгало';
}

// ДОБАВЛЕНИЕ ДИАЛОГА НА СТРАНИЦУ
function addDialogOnPage(pin) {
  var tokyo = document.querySelector('.tokyo');
  var offerDialog = tokyo.querySelector('#offer-dialog');
  var offerDialogTemplate = document.querySelector('#lodge-template');
  var dialogElement = offerDialogTemplate.content.cloneNode(true);
  var dialogContainer = createDialogContainer(pin);

  var title = dialogElement.querySelector('.lodge__title');
  var address = dialogElement.querySelector('.lodge__address');
  var price = dialogElement.querySelector('.lodge__price');
  var type = dialogElement.querySelector('.lodge__type');
  var guestsRooms = dialogElement.querySelector('.lodge__rooms-and-guests');
  var checkinOut = dialogElement.querySelector('.lodge__checkin-time');
  var features = dialogElement.querySelector('.lodge__features');
  var description = dialogElement.querySelector('.lodge__description');

  title.textContent = pin.offer.title;
  address.textContent = pin.offer.address;
  price.innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
  type.textContent = getOfferTypeValue(pin);
  guestsRooms.textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
  checkinOut.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
  features.appendChild(createFeaturesMark(pin));
  description.textContent = pin.offer.description;

  dialogContainer.appendChild(dialogElement);

  tokyo.replaceChild(dialogContainer, offerDialog);
}

function generateMap() {
  var pins = generatePins();
  var pinMarks = createPinMarks(pins);

  addPinMarksOnPage(pinMarks);
  addDialogOnPage(pins[0]);
}

generateMap();
