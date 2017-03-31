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
    if (getRandomIntNumber(0, 1) >= 0.5) {
      randomArray.push(array[i]);
    }
  }

  return randomArray;
}

// ПОЛУЧЕНИЕ ПУТИ К ФАЙЛУ АВАТАРКИ
function getAvatarPath(number) {
  number++;
  var avatarPath = 'img/avatars/user0' + number + '.png';

  return avatarPath;
}

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ
function generatePin(number) {
  var minX = 300;
  var maxX = 900;
  var minY = 100;
  var maxY = 500;
  var locationX = getRandomIntNumber(minX, maxX);
  var locationY = getRandomIntNumber(minY, maxY);

  var address = locationX + ', ' + locationY;

  var minPrice = 1000;
  var maxPrice = 1000000;
  var price = getRandomIntNumber(minPrice, maxPrice);

  var types = ['flat', 'house', 'bungalo'];
  var type = types[getRandomIntNumber(0, types.length - 1)];

  var minRooms = 1;
  var maxRooms = 5;
  var rooms = getRandomIntNumber(minRooms, maxRooms);

  var guests = getRandomIntNumber(1, 30);

  var times = ['12:00', '13:00', '14:00'];
  var checkin = times[getRandomIntNumber(0, times.length - 1)];
  var checkout = times[getRandomIntNumber(0, times.length - 1)];

  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var pin = {
    'author': {
      'avatar': getAvatarPath(number)
    },

    'offer': {
      'title': '',
      'address': address,
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': getRandomArray(features),
      'description': '',
      'photos': ''
    },

    'location': {
      'x': locationX,
      'y': locationY
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

// ПРИСВОЕНИЕ TITLE ДЛЯ ОБЪЯВЛЕНИЙ
function setPinTitles(array) {
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостиприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var title = '';

  var randomIndex;
  var i;

  for (i = 0; i < array.length; i++) {
    randomIndex = getRandomIntNumber(0, titles.length - 1);
    title = titles.splice(randomIndex, 1)[0];
    array[i].offer.title = title;
  }
}

// СОЗДАНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЯ
function createPinMark(x, y, avatarPath) {
  var pinTemplate = document.querySelector('#pin-template');
  var pinElement = pinTemplate.content.cloneNode(true);

  var pin = pinElement.querySelector('.pin');
  var pinImage = pin.querySelector('img');

  var pinWidth = 56;
  var pinHeight = 75;
  var pinStyle = 'left: ' + (x - pinWidth / 2) + 'px; top: ' + (y - pinHeight) + 'px';

  pin.setAttribute('style', pinStyle);
  pinImage.setAttribute('src', avatarPath);

  return pinElement;
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
  var fragment = document.createDocumentFragment();

  var i;

  for (i = 0; i < array.length; i++) {
    fragment.appendChild(array[i]);
  }

  pinMap.appendChild(fragment);
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
function createFeaturesMark(pin) {
  var featureElement;
  var fragment = document.createDocumentFragment();

  var i;

  for (i = 0; i < pin.offer.features.length; i++) {
    featureElement = document.createElement('span');

    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + pin.offer.features[i]);

    fragment.appendChild(featureElement);
  }

  return fragment;
}

// СОЗДАНИЕ РАЗМЕТКИ КОНТЕЙНЕРА ДЛЯ ДИАЛОГА
function createDialogContainer(pin) {
  var dialogContainerTemplate = document.querySelector('#dialog-container-template');
  var dialogContainerElement = dialogContainerTemplate.content.cloneNode(true);

  var dialogTitleImage = dialogContainerElement.querySelector('.dialog-title img');

  dialogTitleImage.setAttribute('src', pin.author.avatar);

  return dialogContainerElement;
}

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ТИПА СДАВАЕМОГО ОБЪЕКТА
function getOfferTypeValue(pin) {
  var offerTypes = {
    'flat' : 'Квартира',
    'house' : 'Дом',
    'bungalo' : 'Бунгало'
  };

  var value = '';
  var key;

  for (key in offerTypes) {
    if (pin.offer.type === key) {
      value = offerTypes[key];
    }
  }

  return value;
}

// ДОБАВЛЕНИЕ ДИАЛОГА НА СТРАНИЦУ
function addDialogOnPage(pin) {
  var tokyo = document.querySelector('.tokyo');

  var dialogContainerElement = createDialogContainer(pin);
  var dialogContainer = dialogContainerElement.querySelector('.dialog');

  var offerDialog = tokyo.querySelector('#offer-dialog');
  var offerDialogTemplate = document.querySelector('#lodge-template');
  var dialogElement = offerDialogTemplate.content.cloneNode(true);

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

  tokyo.replaceChild(dialogContainerElement, offerDialog);
}

function generateMap() {
  var pins = generatePins();
  setPinTitles(pins);
  var pinMarks = createPinMarks(pins);

  addPinMarksOnPage(pinMarks);
  addDialogOnPage(pins[0]);
}

generateMap();
