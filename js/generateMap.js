'use strict';

window.generateMap = (function () {
  var tokyo = document.querySelector('.tokyo');
  var pinMap = tokyo.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var pinMainWidth = 75;
  var filtersHeight = 46;

  var MIN_X = 0;
  var MAX_X = tokyo.offsetWidth;
  var MIN_Y = 94;
  var MAX_Y = tokyo.offsetHeight - filtersHeight;

  var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  // ДОБАВЛЕНИЕ РАЗМЕТКИ PIN НА КАРТУ
  var addPinMarkOnMap = function (pin) {
    pinMap.appendChild(window.generatePin.createPinMark(pin));
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
      var mainPinTop = pinMain.offsetTop - shift.y + MIN_Y;

      var pinMainOffsets = getElementOffsets(mainPinLeft, mainPinTop);

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      pinMain.style.left = pinMainOffsets[0] - (pinMainWidth / 2) + 'px';
      pinMain.style.top = pinMainOffsets[1] - MIN_Y + 'px';

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

  var onLoadData = function (data) {
    window.setMapFilters(data);
  };

  var onDataError = function (errorMessage) {
    var errorMarkTemplate = document.querySelector('#error-template');
    var errorMarkElement = errorMarkTemplate.content.cloneNode(true);

    var errorMessageDiv = errorMarkElement.querySelector('.error-message');
    errorMessageDiv.textContent = errorMessage;

    tokyo.appendChild(errorMarkElement);
  };

  var initMap = function () {
    window.initCard.closeDialog();
    window.initForm(pinMain.offsetLeft + pinMainWidth / 2, pinMain.offsetTop + MIN_Y);
  };

  window.load(DATA_URL, onLoadData, onDataError);
  initMap();

  return {
    setPinMainOffset: function (pinMainLeft, pinMainTop) {
      pinMain.style.left = pinMainLeft - pinMainWidth / 2 + 'px';
      pinMain.style.top = pinMainTop - MIN_Y + 'px';
    },

    updatePinMarksOnMap: function (data) {

      for (var i = pinMap.children.length - 1; i > 0; i--) {
        pinMap.children[i].remove();
      }

      for (i = 0; i < data.length; i++) {
        addPinMarkOnMap(data[i]);
      }

    },

    getElementOffsets: getElementOffsets

  };

})();
