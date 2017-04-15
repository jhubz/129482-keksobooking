'use strict';

window.map = (function () {
  var windowData = window.data;
  var windowPin = window.pin;
  var windowCard = window.card;

  var pinMap = document.querySelector('.tokyo__pin-map');

  // ПРОВЕРКА НАЖАТИЯ ESC
  var isEscPress = function (evt) {
    return evt.keyCode === 27;
  };

  // ПРОВЕРКА НАЖАТИЯ ENTER
  var isEnterPress = function (evt) {
    return evt.keyCode === 13;
  };

  // ДОБАВЛЕНИЕ РАЗМЕТОК PIN НА КАРТУ
  var addPinMarksOnPage = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      windowPin.addPinMarkOnMap(pins[i], pinMap);
    }
  };

  return {
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,

    generateMap:
      (function () {
        var pins = windowData.generatePins();

        addPinMarksOnPage(pins);
        windowCard.closeDialog();
      })()
  };

})();
