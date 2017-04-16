'use strict';

window.generateData = (function () {
  // ПОЛУЧЕНИЕ СЛУЧАЙНОЙ ВЫБОРКИ ИЗ МАССИВА
  var getRandomArray = function (array) {
    var randomArray = [];
    var randomIndex;
    var randomArrayLength = window.utils.getRandomIntNumber(0, array.length);
    var randomArrayValue;

    for (var i = 0; i < randomArrayLength; i++) {
      randomIndex = window.utils.getRandomIntNumber(0, array.length - 1);
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

  // СОЗДАНИЕ ОБЪЕКТА НЕДВИЖИМОСТИ
  var generateProperty = function (number) {
    var MIN_X = 300;
    var MAX_X = 900;
    var MIN_Y = 100;
    var MAX_Y = 500;
    var locationX = window.utils.getRandomIntNumber(MIN_X, MAX_X);
    var locationY = window.utils.getRandomIntNumber(MIN_Y, MAX_Y);

    var MIN_PRICE = 1000;
    var MAX_PRICE = 1000000;

    var types = ['flat', 'house', 'bungalo'];

    var MIN_ROOMS = 1;
    var MAX_ROOMS = 5;

    var times = ['12:00', '13:00', '14:00'];

    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var property = {
      'author': {
        'avatar': getAvatarPath(number)
      },

      'offer': {
        'title': '',
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomIntNumber(MIN_PRICE, MAX_PRICE),
        'type': types[window.utils.getRandomIntNumber(0, types.length - 1)],
        'rooms': window.utils.getRandomIntNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': window.utils.getRandomIntNumber(1, 30),
        'checkin': times[window.utils.getRandomIntNumber(0, times.length - 1)],
        'checkout': times[window.utils.getRandomIntNumber(0, times.length - 1)],
        'features': getRandomArray(features),
        'description': '',
        'photos': ''
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };

    return property;
  };

  // ПРИСВОЕНИЕ TITLE ДЛЯ ОБЪЕКТА НЕДВИЖИМОСТИ
  var setPropertiesTitles = function (properties) {
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

    for (var i = 0; i < properties.length; i++) {
      randomIndex = window.utils.getRandomIntNumber(0, titles.length - 1);
      title = titles.splice(randomIndex, 1)[0];
      properties[i].offer.title = title;
    }
  };

  return function () {
    var properties = [];
    var propertiesCount = 8;

    for (var i = 0; i < propertiesCount; i++) {
      properties.push(generateProperty(i));
    }

    setPropertiesTitles(properties);

    return properties;
  };

})();
