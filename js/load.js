'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 5000;

    // ОТРИСОВКА ОШИБКИ НА КАРТЕ
    var onError = function (errorMessage) {
      window.generateMap.showRequestError(errorMessage);
    };

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    // ПОДКЛЮЧЕНИЯ СЛУШАТЕЛЯ К ЗАГРУЗКЕ ДАННЫХ
    xhr.addEventListener('load', function () {
      var errorMessage;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          errorMessage = 'Неверный запрос';
          break;
        case 404:
          errorMessage = 'Запрашиваемый ресурс не найден';
          break;

        case 500:
          errorMessage = 'Ошибка сервера';
          break;

        default:
          errorMessage = 'Неизвестная ошибка: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorMessage) {
        onError(errorMessage);
      }
    });

    xhr.open('GET', url);
    xhr.send();

  };

})();
