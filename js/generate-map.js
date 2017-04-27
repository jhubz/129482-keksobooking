'use strict';

window.generateMap = (function () {
  var tokyo = document.querySelector('.tokyo');
  var pinMap = tokyo.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');

  var PIN_MAIN_WIDTH = 75;
  var FILTERS_HEIGHT = 46;

  var MIN_X = 0;
  var MAX_X = tokyo.offsetWidth;
  var MIN_Y = 94;
  var MAX_Y = tokyo.offsetHeight - FILTERS_HEIGHT;

  var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ СМЕЩЕНИЯ ОБЪЕКТА, УЧИТЫВАЯ ГРАНИЦЫ
  var getElementOffsets = function (elementOffsetX, elementOffsetY) {
    if (elementOffsetX < MIN_X) {
      elementOffsetX = MIN_X;
    } else if (elementOffsetX > MAX_X) {
      elementOffsetX = MAX_X;
    }

    if (elementOffsetY < MIN_Y) {
      elementOffsetY = MIN_Y;
    } else if (elementOffsetY > MAX_Y) {
      elementOffsetY = MAX_Y;
    }

    return {
      x: elementOffsetX,
      y: elementOffsetY
    };
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

      var pinMainLeft = pinMain.offsetLeft - shift.x + PIN_MAIN_WIDTH / 2;
      var pinMainTop = pinMain.offsetTop - shift.y + MIN_Y;

      var pinMainOffsets = getElementOffsets(pinMainLeft, pinMainTop);

      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      pinMain.style.left = pinMainOffsets.x - (PIN_MAIN_WIDTH / 2) + 'px';
      pinMain.style.top = pinMainOffsets.y - MIN_Y + 'px';

      window.initForm(pinMainOffsets.x, pinMainOffsets.y);
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

  var updatePinMarksOnMap = function (data) {
    var pinsOnMap = pinMap.querySelectorAll('.pin:not(.pin__main)');
    var fragment = document.createDocumentFragment();

    [].forEach.call(pinsOnMap, function (pin) {
      pin.remove();
    });

    if (data) {
      data.forEach(function (pin) {
        fragment.appendChild(window.generatePin.createPinMark(pin));
        pinMap.appendChild(fragment);
      });
    }
  };

  var setPinMainPosition = function (pinMainOffsetX, pinMainOffsetY) {
    pinMain.style.left = pinMainOffsetX - PIN_MAIN_WIDTH / 2 + 'px';
    pinMain.style.top = pinMainOffsetY - MIN_Y + 'px';
  };

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

  window.initCard.closeDialog();
  window.load(DATA_URL, onLoadData, onDataError);

  return {
    setPinMainPosition: setPinMainPosition,
    updatePinMarksOnMap: updatePinMarksOnMap,
    getElementOffsets: getElementOffsets
  };

})();
