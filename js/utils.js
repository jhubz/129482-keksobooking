'use strict';

window.utils = (function () {

  return {
    // ��������� ���������� �����
    getRandomIntNumber: function (min, max) {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    },

    // �������� ������� ESC
    isEscPress: function (evt) {
      return evt.keyCode === 27;
    },

    // �������� ������� ENTER
    isEnterPress: function (evt) {
      return evt.keyCode === 13;
    }

  };

})();
