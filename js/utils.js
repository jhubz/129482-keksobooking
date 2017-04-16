'use strict';

window.utils = (function () {

  return {
    // онксвемхе яксвюимнцн вхякю
    getRandomIntNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    // опнбепйю мюфюрхъ ESC
    isEscPress: function (evt) {
      return evt.keyCode === 27;
    },

    // опнбепйю мюфюрхъ ENTER
    isEnterPress: function (evt) {
      return evt.keyCode === 13;
    }

  };

})();
