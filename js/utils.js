'use strict';

window.utils = (function () {
  var lastTimeout;

  //  ПРОВЕРКА ЗНАЧЕНИЯ НА ЧИСЛО
  var isNumber = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  // ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЧИСЛА
  var getRandomIntNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  // ПРОВЕРКА НАЖАТИЯ НА ESC
  var isEscPress = function (evt) {
    return evt.keyCode === 27;
  };

  // ПРОВЕРКА НАЖАТИЯ НА ENTER
  var isEnterPress = function (evt) {
    return evt.keyCode === 13;
  };

  // ИЗБАВЛЕНИЕ ОТ СЛИШКОМ ЧАСТОГО ОБНОВЛЕНИЯ pins
  var debounce = function (callback, debounceInterval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, debounceInterval);
  };

  return {
    isNumber: isNumber,
    getRandomIntNumber: getRandomIntNumber,
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    debounce: debounce
  };

})();
