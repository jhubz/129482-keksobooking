'use strict';

window.initForm = (function () {
  var noticeForm = document.querySelector('.notice__form');

  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormType = noticeForm.querySelector('#type');
  var noticeFormPrice = noticeForm.querySelector('#price');
  var noticeFormRoomNumber = noticeForm.querySelector('#room_number');
  var noticeFormCapacity = noticeForm.querySelector('#capacity');
  var noticeFormAddress = noticeForm.querySelector('#address');
  var noticeFormTime = noticeForm.querySelector('#time');
  var noticeFormTimeout = noticeForm.querySelector('#timeout');

  var DEFAULT_PRICE_MIN = 1000;

  // ДОБАВЛЕНИЕ АТРИБУТОВ ДЛЯ ВАЛИДАЦИИ ФОРМЫ
  var addValidityAttributesToNoticeForm = function () {
    var DEFAULT_TITLE_MINLENGTH = 30;
    var DEFAULT_TITLE_MAXLENGTH = 100;

    var DEFAULT_PRICE_VALUE = 1000;
    var DEFAULT_PRICE_MAX = 1000000;

    noticeFormTitle.setAttribute('required', 'required');
    noticeFormTitle.setAttribute('minlength', DEFAULT_TITLE_MINLENGTH);
    noticeFormTitle.setAttribute('maxlength', DEFAULT_TITLE_MAXLENGTH);

    noticeFormPrice.setAttribute('required', 'required');
    noticeFormPrice.setAttribute('value', DEFAULT_PRICE_VALUE);
    noticeFormPrice.setAttribute('min', DEFAULT_PRICE_MIN);
    noticeFormPrice.setAttribute('max', DEFAULT_PRICE_MAX);

    noticeFormAddress.setAttribute('required', 'required');
  };

  // ДОБАВЛЕНИЕ СИНХРОНИЗАЦИИ К ПОЛЯМ ФОРМЫ
  var addSyncToNoticeFormFields = function () {
    var types = ['flat', 'shack', 'palace'];
    var minPrices = ['1000', '0', '10000'];

    var rooms = ['1', '2', '100'];
    var guests = ['0', '3', '3'];

    var reverseGuests = ['3', '0'];
    var reverseRooms = ['2', '1'];

    var times = ['12', '13', '14'];

    var setValueToElement = function (element, value) {
      element.value = value;
    };

    var setMinValueToElement = function (element, value) {
      element.value = value;
      element.setAttribute('min', value);
      element.classList.remove('invalid');
    };

    window.synchronizeFields(noticeFormType, noticeFormPrice, types, minPrices, setMinValueToElement);
    window.synchronizeFields(noticeFormRoomNumber, noticeFormCapacity, rooms, guests, setValueToElement);
    window.synchronizeFields(noticeFormCapacity, noticeFormRoomNumber, reverseGuests, reverseRooms, setValueToElement);
    window.synchronizeFields(noticeFormTime, noticeFormTimeout, times, times, setValueToElement);
    window.synchronizeFields(noticeFormTimeout, noticeFormTime, times, times, setValueToElement);
  };

  // ДОБАВЛЕНИЕ КРАСНОЙ РАМКИ ДЛЯ НЕВАЛИДНОГО ПОЛЯ
  var addFormFieldInvalidStatus = function (invalidField) {
    invalidField.classList.add('invalid');
  };

  // ДОБАВЛЕНИЕ ВАЛИДАЦИИ ФОРМЫ NOTICE
  var addNoticeFormValidation = function () {

    var onFieldValueChange = function (evt) {
      evt.target.classList.remove('invalid');
      evt.target.removeEventListener('change', onFieldValueChange);
    };

    noticeForm.addEventListener('invalid', function (evt) {
      evt.preventDefault();

      addFormFieldInvalidStatus(evt.target);
      evt.target.addEventListener('change', onFieldValueChange);
    }, true);

    noticeForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      noticeForm.reset();
      noticeFormPrice.setAttribute('min', DEFAULT_PRICE_MIN);
    });

  };

  // ПОЛУЧЕНИЕ КООРДИНАТЫ ИЗ СТРОКИ
  var getCoordFromString = function (string, axis) {
    var reg = new RegExp('^' + axis + ':\\s\\d+\\.?\\d+$');

    if (string && string.match(reg)) {
      return parseFloat(string.match(/\d+\.?\d+/), 10);
    }

    return null;
  };

  var setAddress = function (left, top) {
    noticeFormAddress.value = 'x: ' + left + ', y: ' + top;
    noticeFormAddress.classList.remove('invalid');
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К ПОЛЮ ADDRESS
  noticeFormAddress.addEventListener('change', function () {
    var stringCoords = noticeFormAddress.value.split(', ');

    var getCorrectCoord = function (coord) {
      var defaultCoord = 0;

      if (window.utils.isNumber(coord)) {
        return coord;
      }

      return defaultCoord;
    };

    var coordX = getCoordFromString(stringCoords[0], 'x');
    var coordY = getCoordFromString(stringCoords[1], 'y');

    var pinMainOffsets = window.generateMap.getElementOffsets(getCorrectCoord(coordX), getCorrectCoord(coordY));

    setAddress(pinMainOffsets.x, pinMainOffsets.y);
    window.generateMap.setPinMainPosition(pinMainOffsets.x, pinMainOffsets.y);
  });


  // ДОБАВЛЕНИЕ ФУНКЦИОНАЛА К ФОРМЫ NOTICE
  var addFunctionalToNoticeForm = function () {
    addValidityAttributesToNoticeForm();
    addSyncToNoticeFormFields();

    addNoticeFormValidation();
  };

  addFunctionalToNoticeForm();

  return setAddress;

})();
