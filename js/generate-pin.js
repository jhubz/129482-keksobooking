'use strict';

window.generatePin = (function () {
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
    window.initCard.showDialog(evt, pin);
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ К PIN
  var addListenersToPinMark = function (pinMark, pin) {
    pinMark.addEventListener('click', function (evt) {
      onPinClick(evt, pin);
    });

    pinMark.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPress(evt)) {
        onPinClick(evt, pin);
      }
    });
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

    addListenersToPinMark(pinMark, pin);

    return pinMarkElement;
  };

  return {
    createPinMark: createPinMark,
    unActivateSelectedPin: unActivateSelectedPin
  };

})();
