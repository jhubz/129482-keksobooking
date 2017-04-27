'use strict';

(function () {
  window.load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    // ПОДКЛЮЧЕНИЯ СЛУШАТЕЛЯ К ЗАГРУЗКЕ ДАННЫХ
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.open('GET', url);
    xhr.send();
  };

})();
