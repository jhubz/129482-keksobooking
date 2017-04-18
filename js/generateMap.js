'use strict';

window.generateMap = (function () {
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;

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

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ СМЕЩЕНИЯ ОБЪЕКТА, УЧИТЫВАЯ ГРАНИЦЫ
    var getElementOffsets = function (elementOffsets, minCoords, maxCoords) {
      for (var i = 0; i < elementOffsets.length; i++) {
        if (elementOffsets[i] < minCoords[i]) {
          elementOffsets[i] = minCoords[i];
        } else if (elementOffsets[i] > maxCoords[i]) {
          elementOffsets[i] = maxCoords[i];
        }
      }

      return elementOffsets;
    };

    // ОБРАБОТЧИК mousemove ПРИ ПЕРЕТАСКИВАНИИ pin-main
    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var pinMainOffsets = getElementOffsets([pinMain.offsetLeft + pinMainWidth / 2, pinMain.offsetTop + pinMainHeigth], [MIN_X, MIN_Y], [MAX_X, MAX_Y]);

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      pinMain.style.left = pinMainOffsets[0] - shift.x - (pinMainWidth / 2) + 'px';
      pinMain.style.top = pinMainOffsets[1] - shift.y - pinMainHeigth + 'px';

      window.initForm(pinMainOffsets[0], pinMainOffsets[1]);
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

  return {
    setPinMainOffset: function (pinMainLeft, pinMainTop) {
      pinMain.style.left = pinMainLeft - pinMainWidth / 2 + 'px';
      pinMain.style.top = pinMainTop - pinMainHeigth + 'px';
    },

    getCoordsInRange: function (numberX, numberY) {
      if (numberX < MIN_X) {
        numberX = MIN_X;
      } else if (numberX > MAX_X) {
        numberX = MAX_X;
      }

      if (numberY < MIN_Y) {
        numberY = MIN_Y;
      } else if (numberY > MAX_Y) {
        numberY = MAX_Y;
      }

      return [numberX, numberY];
    }

  };

})();
