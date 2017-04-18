'use strict';

window.generateMap = (function () {

  var tokyo = document.querySelector('.tokyo');
  var mapWidth = tokyo.offsetWidth;
  var mapHeight = tokyo.offsetHeight;
  var filtersHeight = 46;

  var pinMap = tokyo.querySelector('.tokyo__pin-map');

  var pinMain = pinMap.querySelector('.pin__main');
  var pinMainWidth = 75;
  var pinMainHeigth = 94;

  var MIN_X = 0;
  var MAX_X = mapWidth;
  var MIN_Y = pinMainHeigth;
  var MAX_Y = mapHeight - filtersHeight;

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

  // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ СМЕЩЕНИЯ ОБЪЕКТА, УЧИТЫВАЯ ГРАНИЦЫ
  var getElementOffsets = function (elementOffsetsX, elementOffsetsY) {
    if (elementOffsetsX < MIN_X) {
      elementOffsetsX = MIN_X;
    } else if (elementOffsetsX > MAX_X) {
      elementOffsetsX = MAX_X;
    }

    if (elementOffsetsY < MIN_Y) {
      elementOffsetsY = MIN_Y;
    } else if (elementOffsetsY > MAX_Y) {
      elementOffsetsY = MAX_Y;
    }

    return [elementOffsetsX, elementOffsetsY];
  };

  // ДОБАВЛЕНИЕ ПЕРЕДВИЖЕНИЯ К ГЛАВНОМУ PIN'У
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    // ОБРАБОТЧИК mousemove ПРИ ПЕРЕТАСКИВАНИИ pin-main
    var onPinMainMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      var mainPinLeft = pinMain.offsetLeft - shift.x + pinMainWidth / 2;
      var mainPinTop = pinMain.offsetTop - shift.y + pinMainHeigth;

      var pinMainOffsets = getElementOffsets(mainPinLeft, mainPinTop);

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      pinMain.style.left = pinMainOffsets[0] - (pinMainWidth / 2) + 'px';
      pinMain.style.top = pinMainOffsets[1] - pinMainHeigth + 'px';

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

    getElementOffsets: getElementOffsets

  };

})();
