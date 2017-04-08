'use strict';

var tokyo = document.querySelector('.tokyo');
var pinMap = tokyo.querySelector('.tokyo__pin-map');
var selectedPin;

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
function getRandomIntNumber(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

// ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
function getRandomArray(array) {
  var randomArray = [];
  var randomIndex;
  var randomArrayLength = getRandomIntNumber(0, array.length);
  var randomArrayValue;

  for (var i = 0; i < randomArrayLength; i++) {
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

  for (var i = 0; i < pinsCount; i++) {
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

  for (var i = 0; i < array.length; i++) {
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

  for (var i = 0; i < array.length; i++) {
    pinMark = createPinMark(array[i].location.x, array[i].location.y, array[i].author.avatar);
    pinMarks.push(pinMark);
  }

  return pinMarks;
}

// ДОБАВЛЕНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЙ НА СТРАНИЦУ
function addPinMarksOnPage(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(array[i]);
  }

  pinMap.appendChild(fragment);
}

// СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
function createPinFeaturesMark(pinFeaturesArray) {
  var featureElement;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinFeaturesArray.length; i++) {
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

  var dialogTitleImage = dialogContainerElement.querySelector('.dialog__title img');

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

// СОЗДАНИЕ ДИАЛОГА
function createDialog(pin) {
  var dialogContainerElement = createDialogContainer(pin);
  var dialogContainer = dialogContainerElement.querySelector('.dialog');

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

  return dialogContainerElement;
}

// УДАЛЕНИЕ ДИАЛОГА СО СТРАНИЦЫ
function removeDialogFromPage(dialog) {
  tokyo.removeChild(dialog);
}

// ДОБАВЛЕНИЕ ДИАЛОГА НА СТРАНИЦУ
function addDialogOnPage(dialogContainerElement) {
  tokyo.appendChild(dialogContainerElement);
}

// СКРЫВАНИЕ ДИАЛОГА
function hideDialog(dialog) {
  dialog.classList.add('hidden');
}

// ОТОБРАЖЕНИЕ ДИАЛОГА
function showDialog(dialog) {
  dialog.classList.remove('hidden');
}

// УДАЛЕНИЕ ВСЕХ ДОЧЕРНИХ ЭЛЕМЕНТОВ
function removeAllChild(element) {
  while (element.childNodes[0]) {
    element.removeChild(element.childNodes[0]);
  }
}

// ЗАПОЛНЕНИЕ ДИАЛОГА ИНФОРМАЦИЕЙ
function fillPinContent(pin, dialogContent) {
  dialogContent.titleImage.setAttribute('src', pin.author.avatar);

  dialogContent.title.textContent = pin.offer.title;
  dialogContent.address.textContent = pin.offer.address;
  dialogContent.price.innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
  dialogContent.type.textContent = getOfferTypeValue(pin);
  dialogContent.guestsRooms.textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
  dialogContent.checkinOut.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

  removeAllChild(dialogContent.features);
  dialogContent.features.appendChild(createPinFeaturesMark(pin.offer.features));

  dialogContent.description.textContent = pin.offer.description;
}

// ДОБАВЛЕНИЕ LISTENER К ОБЪЯВЛЕНИЯМ
function addListenersToMap(pins) {
  var pinsOnMap = pinMap.querySelectorAll('.pin:not(.pin__main)');
  var dialog = tokyo.querySelector('.dialog');
  var dialogCloseButton = dialog.querySelector('.dialog__close');

  var dialogContent = {
    title: dialog.querySelector('.lodge__title'),
    titleImage: dialog.querySelector('.dialog__title img'),

    address: dialog.querySelector('.lodge__address'),
    price: dialog.querySelector('.lodge__price'),
    type: dialog.querySelector('.lodge__type'),
    guestsRooms: dialog.querySelector('.lodge__rooms-and-guests'),
    checkinOut: dialog.querySelector('.lodge__checkin-time'),
    features: dialog.querySelector('.lodge__features'),
    description: dialog.querySelector('.lodge__description')
  };

  var unActivatePin = function (pin) {
    if (pin) {
      pin.classList.remove('pin--active');
    }
  };

  var activatePin = function (pin) {
    if (pin) {
      pin.classList.add('pin--active');
    }
  };

  var isEscPress = function (evt) {
    return evt.keyCode === 27;
  };

  var isEnterPress = function (evt) {
    return evt.keyCode === 13;
  };

  var isDialogCloseClick = function (evt) {
    return evt.target.parentElement.classList.contains('dialog__close');
  };

  var onDialogEscPress = function (evt) {
    if (isEscPress(evt)) {
      closeDialog(evt);
    }
  };

  var onDialogCloseClick = function (evt) {
    if (isDialogCloseClick) {
      closeDialog(evt);
    }
  };

  var onDialogCloseEnterPress = function (evt) {
    if (isEnterPress(evt)) {
      closeDialog(evt);
    }
  };

  // ОТКРЫТИЕ ДИАЛОГА
  var openDialog = function (evt) {
    showDialog(dialog);

    unActivatePin(selectedPin);
    selectedPin = evt.currentTarget;
    activatePin(selectedPin);

    for (var i = 0; i < pinsOnMap.length; i++) {
      if (evt.currentTarget === pinsOnMap[i]) {
        fillPinContent(pins[i], dialogContent);
      }
    }

    document.addEventListener('keydown', onDialogEscPress);
    dialogCloseButton.addEventListener('keydown', onDialogCloseEnterPress);
    dialogCloseButton.addEventListener('click', onDialogCloseClick);
  };

  // ЗАКРЫТИЕ ДИАЛОГА
  var closeDialog = function (evt) {
    document.removeEventListener('keydown', onDialogEscPress);
    dialogCloseButton.removeEventListener('keydown', onDialogCloseEnterPress);
    dialogCloseButton.removeEventListener('click', onDialogCloseClick);

    unActivatePin(selectedPin);
    selectedPin = null;
    hideDialog(dialog);
  };

  hideDialog(dialog);

  for (var i = 0; i < pinsOnMap.length; i++) {
    pinsOnMap[i].addEventListener('click', function (evt) {
      openDialog(evt);
    });

    pinsOnMap[i].addEventListener('click', openDialog);

    pinsOnMap[i].addEventListener('keydown', function (evt) {
      if (isEnterPress(evt)) {
        openDialog(evt);
      }
    });
  }

}

// СОЗДАНИЕ КАРТЫ С ОБЪЯВЛЕНИЯМИ
function generateMap() {
  var pins = generatePins();
  var pinMarks = createPinMarks(pins);
  var offerDialog = tokyo.querySelector('#offer-dialog');

  removeDialogFromPage(offerDialog);

  setPinTitles(pins);
  addPinMarksOnPage(pinMarks);

  addDialogOnPage(createDialog(pins[0]));

  addListenersToMap(pins);
}

generateMap();
