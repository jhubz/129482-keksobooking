'use strict';

window.utils = (function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  return {
    // ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЧИСЛА
    getRandomIntNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    // ПРОВЕРКА НАЖАТИЯ НА ESC
    isEscPress: function (evt) {
      return evt.keyCode === 27;
    },

    // ПРОВЕРКА НАЖАТИЯ НА ENTER
    isEnterPress: function (evt) {
      return evt.keyCode === 13;
    },

    // ИЗБАВЛЕНИЕ ОТ ДРЕБЕЗГ
    debounce: function (callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
    }

  };

})();
