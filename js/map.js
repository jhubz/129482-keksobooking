'use strict';

var noticeForm = document.querySelector('.notice__form');

var noticeFormTitle = noticeForm.querySelector('#title');
var noticeFormType = noticeForm.querySelector('#type');
var noticeFormPrice = noticeForm.querySelector('#price');
var noticeFormRoomNumber = noticeForm.querySelector('#room_number');
var noticeFormCapacity = noticeForm.querySelector('#capacity');
var noticeFormTime = noticeForm.querySelector('#time');
var noticeFormTimeout = noticeForm.querySelector('#timeout');

// ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
var getRandomIntNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

// ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
var getRandomArray = function (array) {
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
};

// ПОЛУЧЕНИЕ ПУТИ К ФАЙЛУ АВАТАРКИ
var getAvatarPath = function (number) {
  var avatarPathFull;

  number++;
  number = (number >= 10) ? number.toString() : '0' + number;
  avatarPathFull = 'img/avatars/user' + number + '.png';

  return avatarPathFull;
};

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ
var generatePin = function (number) {
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
};

// СОЗДАНИЕ МАССИВА ОБЪЯВЛЕНИЙ
var generatePins = function () {
  var pins = [];
  var pinsCount = 8;

  for (var i = 0; i < pinsCount; i++) {
    pins.push(generatePin(i));
  }

  return pins;
};

// ПРИСВОЕНИЕ TITLE ДЛЯ ОБЪЯВЛЕНИЙ
var setPinTitles = function (pins) {
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

  for (var i = 0; i < pins.length; i++) {
    randomIndex = getRandomIntNumber(0, titles.length - 1);
    title = titles.splice(randomIndex, 1)[0];
    pins[i].offer.title = title;
  }
};

// СОЗДАНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЯ
var createPinMark = function (pin) {
  var pinMarkTemplate = document.querySelector('#pin-template');
  var pinMarkElement = pinMarkTemplate.content.cloneNode(true);

  var pinMark = pinMarkElement.querySelector('.pin');
  var pinMarkImage = pinMark.querySelector('img');

  var pinMarkWidth = 56;
  var pinMarkHeight = 75;
  var pinMarkStyle = 'left: ' + (pin.location.x - pinMarkWidth / 2) + 'px; top: ' + (pin.location.y - pinMarkHeight) + 'px';

  pinMark.setAttribute('style', pinMarkStyle);
  pinMarkImage.setAttribute('src', pin.author.avatar);

  addListenerToPinMark(pinMark, pin);

  return pinMarkElement;
};

// СОЗДАНИЕ МАССИВА РАЗМЕТОК ДЛЯ ОБЪЯВЛЕНИЙ
var createPinMarks = function (pins) {
  var pinMark;
  var pinMarks = [];

  for (var i = 0; i < pins.length; i++) {
    pinMark = createPinMark(pins[i]);
    pinMarks.push(pinMark);
  }

  return pinMarks;
};

// ДОБАВЛЕНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЙ НА СТРАНИЦУ
var addPinMarksOnPage = function (pinMarks) {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinMarks.length; i++) {
    fragment.appendChild(pinMarks[i]);
  }

  pinMap.appendChild(fragment);
};

// СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
var createPinFeaturesMark = function (pinFeaturesArray) {
  var featureElement;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinFeaturesArray.length; i++) {
    featureElement = document.createElement('span');

    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + pinFeaturesArray[i]);

    fragment.appendChild(featureElement);
  }

  return fragment;
};

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ТИПА СДАВАЕМОГО ОБЪЕКТА
var getOfferTypeValue = function (pin) {
  var offerTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var value = offerTypes[pin.offer.type];

  return value;
};

// СКРЫВАНИЕ ЭЛЕМЕНТА
var hideElement = function (element) {
  element.classList.add('hidden');
};

// ОТОБРАЖЕНИЕ ЭЛЕМЕНТА
var showElement = function (element) {
  element.classList.remove('hidden');
};

// УДАЛЕНИЕ ВСЕХ ДОЧЕРНИХ ЭЛЕМЕНТОВ
var removeAllChild = function (element) {
  element.innerHTML = null;
};

// ЗАПОЛНЕНИЕ ДИАЛОГА ИНФОРМАЦИЕЙ
var fillDialogFields = function (pin) {
  var dialog = document.querySelector('.dialog');

  var title = dialog.querySelector('.lodge__title');
  var titleImage = dialog.querySelector('.dialog__title img');

  var address = dialog.querySelector('.lodge__address');
  var price = dialog.querySelector('.lodge__price');
  var type = dialog.querySelector('.lodge__type');
  var guestsRooms = dialog.querySelector('.lodge__rooms-and-guests');
  var checkinOut = dialog.querySelector('.lodge__checkin-time');
  var features = dialog.querySelector('.lodge__features');
  var description = dialog.querySelector('.lodge__description');

  title.textContent = pin.offer.title;
  titleImage.setAttribute('src', pin.author.avatar);

  address.textContent = pin.offer.address;
  price.innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
  type.textContent = getOfferTypeValue(pin);
  guestsRooms.textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
  checkinOut.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

  removeAllChild(features);
  features.appendChild(createPinFeaturesMark(pin.offer.features));

  description.textContent = pin.offer.description;
};

// ПРОВЕРКА НАЖАТИЯ ESC
var isEscPress = function (evt) {
  return evt.keyCode === 27;
};

// ПРОВЕРКА НАЖАТИЯ ENTER
var isEnterPress = function (evt) {
  return evt.keyCode === 13;
};

// АКТИВАЦИЯ PIN
var activatePin = function (pinMark) {
  if (pinMark) {
    pinMark.classList.add('pin--active');
  }
};

// ДЕАКТИВАЦИЯ PIN
var unActivateSelectedPin = function () {
  var selectedPin = document.querySelector('.pin--active');

  if (selectedPin) {
    selectedPin.classList.remove('pin--active');
  }
};

// ЗАКРЫТИЕ ДИАЛОГА ПРИ НАЖАТИИ ESC
var onDialogEscPress = function (evt) {
  if (isEscPress(evt)) {
    unActivateSelectedPin();
    closeDialog(evt);
  }
};

// ЗАКРЫТИЕ ДИАЛОГА ПРИ КЛИКЕ НА КНОПКЕ ЗАКРЫТИЯ ДИАЛОГА
var onDialogCloseClick = function (evt) {
  evt.preventDefault();
  unActivateSelectedPin();
  closeDialog(evt);
};

// ОТКРЫТИЕ ДИАЛОГА
var openDialog = function (evt) {
  var dialog = document.querySelector('.dialog');
  var dialogCloseButton = dialog.querySelector('.dialog__close');

  document.addEventListener('keydown', onDialogEscPress);
  dialogCloseButton.addEventListener('click', onDialogCloseClick);

  showElement(dialog);
};

// ЗАКРЫТИЕ ДИАЛОГА
var closeDialog = function (evt) {
  var dialog = document.querySelector('.dialog');

  if (evt) {
    document.removeEventListener('keydown', onDialogEscPress);
    evt.currentTarget.removeEventListener('click', onDialogCloseClick);
  }

  hideElement(dialog);
};

// КЛИК НА PIN'Е
var onPinClick = function (evt, pin) {
  unActivateSelectedPin();
  activatePin(evt.currentTarget);
  fillDialogFields(pin);
  openDialog(evt);
};

// ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К PIN
var addListenerToPinMark = function (pinMark, pin) {
  pinMark.addEventListener('click', function (evt) {
    onPinClick(evt, pin);
  });

  pinMark.addEventListener('keydown', function (evt) {
    if (isEnterPress(evt)) {
      onPinClick(evt, pin);
    }
  });
};

// СОЗДАНИЕ КАРТЫ С ОБЪЯВЛЕНИЯМИ
var generateMap = function () {
  var pins = generatePins();
  var pinMarks = createPinMarks(pins);

  setPinTitles(pins);
  addPinMarksOnPage(pinMarks);
  closeDialog();
};

// ДОБАВЛЕНИЕ АТРИБУТОВ ДЛЯ ВАЛИДАЦИИ ФОРМЫ
var addValidityAttributesToNoticeForm = function () {
  noticeFormTitle.setAttribute('required', 'required');
  noticeFormTitle.setAttribute('minlength', 30);
  noticeFormTitle.setAttribute('maxlength', 100);

  noticeFormPrice.setAttribute('required', 'required');
  noticeFormPrice.setAttribute('value', 1000);
  noticeFormPrice.setAttribute('min', 1000);
  noticeFormPrice.setAttribute('max', 1000000);
};

// ЗАПОЛНЕНИЕ ФОРМЫ ЗНАЧЕНИЯМИ ПО УМОЛЧАНИЮ
var fillNoticeFormDefaultValues = function () {
  var DEFAULT_TITLE_VALUE = '';
  var DEFAULT_TYPE_VALUE = 'flat';
  var DEFAULT_PRICE_VALUE = 1000;
  var DEFAULT_ROOM_NUMBER_VALUE = '1';
  var DEFAULT_CAPACITY_VALUE = '0';
  var DEFAULT_TIME_VALUE = '12';

  noticeFormTitle.value = DEFAULT_TITLE_VALUE;
  noticeFormType.value = DEFAULT_TYPE_VALUE;
  noticeFormPrice.value = DEFAULT_PRICE_VALUE;
  noticeFormRoomNumber.value = DEFAULT_ROOM_NUMBER_VALUE;
  noticeFormCapacity.value = DEFAULT_CAPACITY_VALUE;
  noticeFormTime.value = DEFAULT_TIME_VALUE;
  noticeFormTimeout.value = DEFAULT_TIME_VALUE;
};

// СИНХРОНИЗАЦИЯ ЗНАЧЕНИЯ
var syncValue = function (syncedElement, changingElement, dictionary) {
  syncedElement.value = dictionary[changingElement.value];
};

// ДОБАВЛЕНИЕ СИНХРОНИЗАЦИИ К ПОЛЯМ ФОРМЫ
var addSyncToNoticeFormFields = function () {
  var minPrices = {
    'flat': 1000,
    'shack': 0,
    'palace': 10000
  };

  var roomsCapacity = {
    '1': 0,
    '2': 3,
    '100': 3
  };

  var guestsCapacity = {
    '0': 1,
    '3': 2
  };

  var times = {
    '12': 12,
    '13': 13,
    '14': 14
  };

  noticeFormType.addEventListener('change', function () {
    syncValue(noticeFormPrice, noticeFormType, minPrices);
    noticeFormPrice.setAttribute('min', minPrices[noticeFormType.value]);
  });

  noticeFormRoomNumber.addEventListener('change', function () {
    syncValue(noticeFormCapacity, noticeFormRoomNumber, roomsCapacity);
  });

  noticeFormCapacity.addEventListener('change', function () {
    syncValue(noticeFormRoomNumber, noticeFormCapacity, guestsCapacity);
  });

  noticeFormTime.addEventListener('change', function () {
    syncValue(noticeFormTimeout, noticeFormTime, times);
  });

  noticeFormTimeout.addEventListener('change', function () {
    syncValue(noticeFormTime, noticeFormTimeout, times);
  });
};

// ДОБАВЛЕНИЕ КРАСНОЙ РАМКИ ДЛЯ НЕВАЛИДНОГО ПОЛЯ
var addFormFieldInvalidStatus = function (invalidField) {
  invalidField.classList.add('invalid');
};

// УДАЛЕНИЕ КРАСНОЙ РАМКИ СО ВСЕХ ПОЛЕЙ ФОРМЫ
var removeFormFieldsInvalidStatus = function () {
  var invalidFields = noticeForm.querySelectorAll('.invalid');

  for (var i = 0; i < invalidFields.length; i++) {
    invalidFields[i].classList.remove('invalid');
  }
};

// ДОБАВЛЕНИЕ ВАЛИДАЦИИ ФОРМЫ NOTICE
var addNoticeFormValidation = function () {
  noticeForm.addEventListener('invalid', function (evt) {
    evt.preventDefault();
    addFormFieldInvalidStatus(evt.target);
  }, true);

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    removeFormFieldsInvalidStatus();
    fillNoticeFormDefaultValues();
  });
};

// ДОБАВЛЕНИЕ ФУНКЦИОНАЛА К ФОРМЕ NOTICE
var addFunctionalToNoticeForm = function () {
  addValidityAttributesToNoticeForm();
  fillNoticeFormDefaultValues();
  addSyncToNoticeFormFields();

  addNoticeFormValidation();
};

generateMap();
addFunctionalToNoticeForm();
