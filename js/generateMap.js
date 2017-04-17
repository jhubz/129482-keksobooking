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

    // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ СМЕЩЕНИЯ ОБЪЕКТА, УЧИТЫВАЯ ГРАНИЦЫ
    var getElementOffset = function (elementOffset, shift, borderValueMin, borderValueMax, elementDimension) {
      var offset;
      if ((elementOffset - shift) < (borderValueMin - elementDimension)) {
        offset = borderValueMin - elementDimension;
      } else if ((elementOffset - shift) > (borderValueMax - elementDimension)) {
        offset = borderValueMax - elementDimension;
      } else {
        offset = elementOffset - shift;
      }
      return offset;
    };

    // ОБРАБОТЧИК mousemove ПРИ ПЕРЕТАСКИВАНИИ pin-main
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

      pinMainLeft = getElementOffset(pinMain.offsetLeft, shift.x, window.variables.MIN_X, window.variables.MAX_X, pinMainWidth / 2);
      pinMainTop = getElementOffset(pinMain.offsetTop, shift.y, window.variables.MIN_Y, window.variables.MAX_Y, pinMainHeigth);

      pinMain.style.left = pinMainLeft + 'px';
      pinMain.style.top = pinMainTop + 'px';

      window.initForm(pinMainLeft + pinMainWidth / 2, pinMainTop + pinMainHeigth);
    };

    // ОБРАБОТЧИК mouseup ПРИ ЗАВЕРШЕНИИ ПЕРЕТАСКИВАНИЯ pin-main
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
