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

  // УДАЛЕНИЕ КРАСНОЙ РАМКИ СО ВСЕХ ПОЛЕЙ ФОРМЫ
  var removeFormFieldsInvalidStatus = function () {
    var invalidFields = noticeForm.querySelectorAll('.invalid');

    [].forEach.call(invalidFields, function (invalidField) {
      invalidField.classList.remove('invalid');
    });
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
