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

  // ДОБАВЛЕНИЕ АТРИБУТОВ ДЛЯ ВАЛИДАЦИИ ФОРМЫ
  var addValidityAttributesToNoticeForm = function () {
    noticeFormTitle.setAttribute('required', 'required');
    noticeFormTitle.setAttribute('minlength', 30);
    noticeFormTitle.setAttribute('maxlength', 100);

    noticeFormPrice.setAttribute('required', 'required');
    noticeFormPrice.setAttribute('value', 1000);
    noticeFormPrice.setAttribute('min', 1000);
    noticeFormPrice.setAttribute('max', 1000000);

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
      noticeForm.reset();
      noticeFormPrice.setAttribute('min', 1000);
    });
  };

  // ПОЛУЧЕНИЕ ЧИСЛА ИЗ СТРОКИ
  var getNumberFromString = function (string) {
    return parseInt(string.match(/\d+\.\d+/), 10) || parseInt(string.match(/\d+/), 10);
  };

  var setAddress = function (left, top) {
    noticeFormAddress.value = 'x: ' + left + ', y: ' + top;
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К ПОЛЮ ADDRESS
  noticeFormAddress.addEventListener('change', function () {
    var stringCoords = noticeFormAddress.value.split(', ');

    var coordX = getNumberFromString(stringCoords[0]);
    var coordY = getNumberFromString(stringCoords[1]);

    var pinMainOffsets = window.generateMap.getElementOffsets(coordX, coordY);

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
