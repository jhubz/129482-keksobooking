'use strict';

var tokyo = document.querySelector('.tokyo');
var pinMap = tokyo.querySelector('.tokyo__pin-map');

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
function getRandomIntNumber(min, max) {
  var randomNumber = Math.random() * (max + 1 - min) + min;
  randomNumber = Math.floor(randomNumber);

  return randomNumber;
}

// ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
function getRandomArray(array) {
  var randomArray = [];
  var randomIndex;
  var randomArrayLength = getRandomIntNumber(0, array.length);
  var randomArrayValue;
  var i;

  for (i = 0; i < randomArrayLength; i++) {
    randomIndex = getRandomIntNumber(0, array.length - 1);
    randomArrayValue = array.splice(randomIndex, 1)[0];
    randomArray.push(randomArrayValue);
  }

  return randomArray;
}

// ПОЛУЧЕНИЕ ПУТИ К ФАЙЛУ АВАТАРКИ
function getAvatarPath(number) {
  var avatarPathFull;

  number++;
  number = (number >= 10) ? number.toString() : '0' + number;
  avatarPathFull = 'img/avatars/user' + number + '.png';

  return avatarPathFull;
}

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ
function generatePin(number) {
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var locationX = getRandomIntNumber(MIN_X, MAX_X);
  var locationY = getRandomIntNumber(MIN_Y, MAX_Y);

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  var types = ['flat', 'house', 'bungalo'];

  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var times = ['12:00', '13:00', '14:00'];

  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var pin = {
    'author': {
      'avatar': getAvatarPath(number)
    },

    'offer': {
      'title': '',
      'address': locationX + ', ' + locationY,
      'price': getRandomIntNumber(MIN_PRICE, MAX_PRICE),
      'type': types[getRandomIntNumber(0, types.length - 1)],
      'rooms': getRandomIntNumber(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomIntNumber(1, 30),
      'checkin': times[getRandomIntNumber(0, times.length - 1)],
      'checkout': times[getRandomIntNumber(0, times.length - 1)],
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
function createPinFeaturesMark(pinFeaturesArray) {
  var featureElement;
  var fragment = document.createDocumentFragment();

  var i;

  for (i = 0; i < pinFeaturesArray.length; i++) {
    featureElement = document.createElement('span');

    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + pinFeaturesArray[i]);

    fragment.appendChild(featureElement);
  }

  return fragment;
}

// СОЗДАНИЕ РАЗМЕТКИ КОНТЕЙНЕРА ДЛЯ ДИАЛОГА
function createDialogContainer(pin) {
  var dialogContainerTemplate = document.querySelector('#dialog-container-template');
  var dialogContainerElement = dialogContainerTemplate.content.cloneNode(true);

  var dialogTitle = dialogContainerElement.querySelector('.dialog-title');
  var dialogTitleImage = dialogContainerElement.querySelector('.dialog-title img');

  dialogTitle.style.position = 'relative';
  dialogTitleImage.setAttribute('src', pin.author.avatar);

  return dialogContainerElement;
}

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ТИПА СДАВАЕМОГО ОБЪЕКТА
function getOfferTypeValue(pin) {
  var offerTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var value = offerTypes[pin.offer.type];

  return value;
}

// ДОБАВЛЕНИЕ ДИАЛОГА НА СТРАНИЦУ
function addDialogOnPage(pin) {
  var currentDialog = tokyo.querySelector('.dialog');

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
  features.appendChild(createPinFeaturesMark(pin.offer.features));
  description.textContent = pin.offer.description;

  dialogContainer.appendChild(dialogElement);

  if (offerDialog) {
    tokyo.replaceChild(dialogContainerElement, offerDialog);
  } else {
    tokyo.replaceChild(dialogContainerElement, currentDialog);
  }
}

// ДОБАВЛЕНИЕ LISTENER К ОБЪЯВЛЕНИЯМ
function addListenersToPins(pins) {
  var pinsOnMap = pinMap.querySelectorAll('div.pin:not(.pin__main)');

  var i;

  var unselectPins = function () {
    for (i = 0; i < pinsOnMap.length; i++) {
      if (pinsOnMap[i].classList.contains('pin--active')) {
        pinsOnMap[i].classList.remove('pin--active');
      }
    }
  };

  var onDialogEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeDialog(evt);
    }
  };

  var onDialogCloseClick = function (evt) {
    if (evt.target.parentElement.classList.contains('dialog__close')) {
      closeDialog(evt);
    }
  };

  var onDialogCloseEnterPress = function (evt) {
    if (evt.keyCode === 13) {
      closeDialog(evt);
    }
  };

  // ОТКРЫТИЕ ДИАЛОГА
  var openDialog = function (evt) {

    var evtTarget;
    if (evt.target.classList.value === 'pin') {
      evtTarget = evt.target;
    } else if (evt.target.parentElement.classList.value === 'pin') {
      evtTarget = evt.target.parentElement;
    }

    var dialog;
    var dialogCloseButton;

    unselectPins();

    evtTarget.classList.add('pin--active');
    for (i = 0; i < pins.length; i++) {
      if (evtTarget.childNodes[1].getAttribute('src') === pins[i].author.avatar) {
        addDialogOnPage(pins[i]);
      }
    }

    dialog = tokyo.querySelector('.dialog');
    dialogCloseButton = dialog.querySelector('.dialog__close');

    document.addEventListener('keydown', onDialogEscPress);
    dialogCloseButton.addEventListener('keydown', onDialogCloseEnterPress);
    dialogCloseButton.addEventListener('click', onDialogCloseClick);

  };

  // ЗАКРЫТИЕ ДИАЛОГА
  var closeDialog = function (evt) {
    var dialog = tokyo.querySelector('.dialog');
    var dialogCloseButton = dialog.querySelector('.dialog__close');

    document.removeEventListener('keydown', onDialogEscPress);
    dialogCloseButton.removeEventListener('keydown', onDialogCloseEnterPress);
    dialogCloseButton.removeEventListener('click', onDialogCloseClick);

    unselectPins();
    dialog.style.display = 'none';

  };

  pinMap.addEventListener('click', function (evt) {
    openDialog(evt);
  });

  pinMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      openDialog(evt);
    }
  });

}

// ДОБАВЛЕНИЕ ПЕРВОГО ОБЪЯВЛЕНИЯ
function initFirstPin(pin) {
  var pinsOnMap = pinMap.querySelectorAll('div.pin:not(.pin__main)');

  addDialogOnPage(pin);
  for (var i = 0; i < pinsOnMap.length; i++) {
    if (pin.author.avatar === pinsOnMap[i].childNodes[1].getAttribute('src')) {
      pinsOnMap[i].classList.add('pin--active');
    }
  }

}

// СОЗДАНИЕ КАРТЫ С ОБЪЯВЛЕНИЯМИ
function generateMap() {
  var pins = generatePins();
  setPinTitles(pins);
  var pinMarks = createPinMarks(pins);

  addPinMarksOnPage(pinMarks);

  addListenersToPins(pins);

  initFirstPin(pins[0]);
}

generateMap();
