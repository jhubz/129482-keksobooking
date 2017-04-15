'use strict';

window.data = (function () {

  // ПОЛУЧЕНИЕ СЛУЧАЙНОГО ЦЕЛОГО ЧИСЛА ИЗ ЗАДАННОГО ДИАПАЗОНА
  var getRandomIntNumber = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  // ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
  var getRandomArray = function (array) {
    var randomArray = [];
    var randomIndex;
    var randomArrayLength = getRandomIntNumber(0, array.length);
    var randomArrayValue;

    for (var i = 0; i < randomArrayLength; i++) {
      randomIndex = getRandomIntNumber(0, array.length - 1);
      randomArrayValue = array.splice(randomIndex, 1)[0];
      randomArray.push(randomArrayValue);
    }

    return randomArray;
  };

  // ПОЛУЧЕНИЕ ПУТИ К ФАЙЛУ АВАТАРКИ
  var getAvatarPath = function (number) {
    var avatarPathFull;

    number++;
    number = (number >= 10) ? number.toString() : '0' + number;
    avatarPathFull = 'img/avatars/user' + number + '.png';

    return avatarPathFull;
  };

  // СОЗДАНИЕ ОБЪЯВЛЕНИЯ
  var generatePin = function (number) {
    var MIN_X = 300;
    var MAX_X = 900;
    var MIN_Y = 100;
    var MAX_Y = 500;
    var locationX = getRandomIntNumber(MIN_X, MAX_X);
    var locationY = getRandomIntNumber(MIN_Y, MAX_Y);

    var MIN_PRICE = 1000;
    var MAX_PRICE = 1000000;

    var types = ['flat', 'house', 'bungalo'];

    var MIN_ROOMS = 1;
    var MAX_ROOMS = 5;

    var times = ['12:00', '13:00', '14:00'];

    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var pin = {
      'author': {
        'avatar': getAvatarPath(number)
      },

      'offer': {
        'title': '',
        'address': locationX + ', ' + locationY,
        'price': getRandomIntNumber(MIN_PRICE, MAX_PRICE),
        'type': types[getRandomIntNumber(0, types.length - 1)],
        'rooms': getRandomIntNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomIntNumber(1, 30),
        'checkin': times[getRandomIntNumber(0, times.length - 1)],
        'checkout': times[getRandomIntNumber(0, times.length - 1)],
        'features': getRandomArray(features),
        'description': '',
        'photos': ''
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    return pin;
  };

  // ПРИСВОЕНИЕ TITLE ДЛЯ ОБЪЯВЛЕНИЙ
  var setPinTitles = function (pins) {
    var titles = [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостиприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ];
    var title = '';

    var randomIndex;

    for (var i = 0; i < pins.length; i++) {
      randomIndex = getRandomIntNumber(0, titles.length - 1);
      title = titles.splice(randomIndex, 1)[0];
      pins[i].offer.title = title;
    }
  };

  return {
    generatePins:
      function () {
        var pins = [];
        var pinsCount = 8;

        for (var i = 0; i < pinsCount; i++) {
          pins.push(generatePin(i));
        }

        setPinTitles(pins);

        return pins;
      }
  };

})();
