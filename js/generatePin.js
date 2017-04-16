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
    window.initCard.fillDialogFields(pin);
    window.initCard.openDialog(evt);
  };

  // ДОБАВЛЕНИЕ СЛУШАТЕЛЯ К PIN
  var addListenerToPinMark = function (pinMark, pin) {
    pinMark.addEventListener('click', function (evt) {
      onPinClick(evt, pin);
    });

    pinMark.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPress(evt)) {
        onPinClick(evt, pin);
      }
    });
  };

  return {
    // СОЗДАНИЕ РАЗМЕТКИ ОБЪЯВЛЕНИЯ
    createPinMark: function (pin) {
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
    },

    unActivateSelectedPin: unActivateSelectedPin
  };

})();
