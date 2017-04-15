'use strict';

window.pin = (function () {
  var windowMap = window.map;
  var windowCard = window.card;

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

  // КЛИК НА PIN'Е
  var onPinClick = function (evt, pin) {
    unActivateSelectedPin();
    activatePin(evt.currentTarget);
    windowCard.fillDialogFields(pin);
    windowCard.openDialog(evt);
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К PIN
  var addListenerToPinMark = function (pinMark, pin) {
    pinMark.addEventListener('click', function (evt) {
      onPinClick(evt, pin);
    });

    pinMark.addEventListener('keydown', function (evt) {
      if (windowMap.isEnterPress(evt)) {
        onPinClick(evt, pin);
      }
    });
  };

  return {
    addPinMarkOnMap:
      function (pin, pinMap) {
        var pinMark = createPinMark(pin);

        pinMap.appendChild(pinMark);
      },

    activatePin: activatePin,
    unActivateSelectedPin: unActivateSelectedPin
  };

})();
