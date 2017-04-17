'use strict';

window.generateMap = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  var pinMain = pinMap.querySelector('.pin__main');
  var pinMainWidth = 75;
  var pinMainHeigth = 94;

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

  // ДОБАВЛЕНИЕ ПЕРЕДВИЖЕНИЯ К ГЛАВНОМУ PIN'У
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pinMainLeft;
    var pinMainTop;

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      pinMainLeft = pinMain.offsetLeft - shift.x;
      pinMainTop = pinMain.offsetTop - shift.y;

      pinMain.style.left = pinMainLeft + 'px';
      pinMain.style.top = pinMainTop + 'px';

      window.initForm(pinMainLeft + pinMainWidth / 2, pinMainTop + pinMainHeigth);
    };

    var onPinMainMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onPinMainMouseMove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMouseMove);
    document.addEventListener('mouseup', onPinMainMouseUp);

  });

  // ГЕНЕРАЦИЯ КАРТЫ
  var generateMap = function () {
    var pins = window.generateData();

    window.initForm(pinMain.offsetLeft + pinMainWidth / 2, pinMain.offsetTop + pinMainHeigth);
    addPinMarksOnPage(pins);
    window.initCard.closeDialog();
  };

  generateMap();

  return function (pinMainLeft, pinMainTop) {
    pinMain.style.left = pinMainLeft - pinMainWidth / 2 + 'px';
    pinMain.style.top = pinMainTop - pinMainHeigth + 'px';
  };

})();
