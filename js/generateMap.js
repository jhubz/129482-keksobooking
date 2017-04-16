'use strict';

window.generateMap = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  // ДОБАВЛЕНИЕ РАЗМЕТКИ PIN НА КАРТУ
  var addPinMarkOnMap = function (pin) {
    pinMap.appendChild(window.generatePin.createPinMark(pin));
  };

  // ДОБАВЛЕНИЕ МАССИВА РАЗМЕТОК PIN НА КАРТУ
  var addPinMarksOnPage = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      addPinMarkOnMap(pins[i]);
    }
  };

  var generateMap = function () {
    var pins = window.generateData();

    addPinMarksOnPage(pins);
    window.initCard.closeDialog();
  };

  generateMap();

})();
