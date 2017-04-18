'use strict';

window.initForm = (function () {
  var noticeForm = document.querySelector('.notice__form');

  var noticeFormTitle = noticeForm.querySelector('#title');
  var noticeFormType = noticeForm.querySelector('#type');
  var noticeFormPrice = noticeForm.querySelector('#price');
  var noticeFormRoomNumber = noticeForm.querySelector('#room_number');
  var noticeFormCapacity = noticeForm.querySelector('#capacity');
  var address = noticeForm.querySelector('#address');
  var noticeFormTime = noticeForm.querySelector('#time');
  var noticeFormTimeout = noticeForm.querySelector('#timeout');

  var DEFAULT_TITLE_VALUE = '';
  var DEFAULT_TYPE_VALUE = 'flat';
  var DEFAULT_PRICE_VALUE = 1000;
  var DEFAULT_ROOM_NUMBER_VALUE = '1';
  var DEFAULT_CAPACITY_VALUE = '0';
  var DEFAULT_TIME_VALUE = '12';

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

  // ПОЛУЧЕНИЕ ЧИСЛА ИЗ СТРОКИ
  var getNumberFromString = function (string) {
    return +string.match(/\d+\.\d+/) || +string.match(/\d+/);
  };

  var setAddress = function (left, top) {
    address.value = 'x: ' + left + ', y: ' + top;
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К ПОЛЮ ADDRESS
  address.addEventListener('change', function () {
    var coords = address.value.split(', ');
    var resultCoords = window.generateMap.getElementOffsets(getNumberFromString(coords[0]), getNumberFromString(coords[1]));
    setAddress(resultCoords[0], resultCoords[1]);
    window.generateMap.setPinMainOffset(resultCoords[0], resultCoords[1]);
  });

  // ДОБАВЛЕНИЕ ФУНКЦИОНАЛА К ФОРМЫ NOTICE
  var addFunctionalToNoticeForm = function () {
    addValidityAttributesToNoticeForm();
    fillNoticeFormDefaultValues();
    addSyncToNoticeFormFields();

    addNoticeFormValidation();
  };

  addFunctionalToNoticeForm();

  return setAddress;

})();
