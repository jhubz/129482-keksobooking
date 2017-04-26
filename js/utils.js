'use strict';

window.utils = (function () {
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

    // ИЗБАВЛЕНИЕ ОТ СЛИШКОМ ЧАСТОГО ОБНОВЛЕНИЯ pins
    debounce: function (debounceInterval, callback) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(callback, debounceInterval);
    }

  };

})();
