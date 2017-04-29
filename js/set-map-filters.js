'use strict';

window.setMapFilters = (function () {
  var tokyoFiltersForm = document.querySelector('.tokyo__filters');
  var typeFilter = tokyoFiltersForm.querySelector('#housing_type');
  var priceFilter = tokyoFiltersForm.querySelector('#housing_price');
  var roomsFilter = tokyoFiltersForm.querySelector('#housing_room-number');
  var guestsFilter = tokyoFiltersForm.querySelector('#housing_guests-number');

  var pinsData;

  // ПРОВЕРКА СОВПАДЕНИЯ ПОЛЯ pin С ПОЛЕМ ФИЛЬТРА
  var isFieldMatchFilter = function (pinField, filter) {
    return pinField.toString() === filter.value.toString() ||
      filter.value.toString() === 'any';
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО type
  var matchType = function (pin) {
    return isFieldMatchFilter(pin.offer.type, typeFilter);
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО price
  var matchPrice = function (pin) {
    var firstPricePoint = 10000;
    var secondPricePoint = 50000;

    switch (priceFilter.value) {
      case 'low':
        return pin.offer.price < firstPricePoint;
      case 'high':
        return pin.offer.price > secondPricePoint;
      default:
        return (pin.offer.price >= firstPricePoint) && (pin.offer.price <= secondPricePoint);
    }
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО rooms
  var matchRooms = function (pin) {
    return isFieldMatchFilter(pin.offer.rooms, roomsFilter);
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО guests
  var matchGuests = function (pin) {
    return isFieldMatchFilter(pin.offer.guests, guestsFilter);
  };

  // ФИЛЬТРАЦИЯ МАССИВА
  var filterArray = function (array, callback) {
    return array.filter(function (arrElem) {
      return callback(arrElem);
    });
  };

  // ФИЛЬТРАЦИЯ МАССИВА ПО feature
  var filterArrayByFeature = function (array, feature) {
    return array.filter(function (arrElem) {
      return arrElem.offer.features.includes(feature);
    });
  };

  // ОБНОВЛЕНИЕ pins
  var updatePins = function () {
    var pins = pinsData.slice();
    var checkedInputs = tokyoFiltersForm.querySelectorAll('input[name="feature"]:checked');

    pins = filterArray(pins, matchType);
    pins = filterArray(pins, matchPrice);
    pins = filterArray(pins, matchRooms);
    pins = filterArray(pins, matchGuests);

    [].forEach.call(checkedInputs, function (input) {
      pins = filterArrayByFeature(pins, input.value);
    });

    window.generateMap.updatePinMarksOnMap(pins);
  };

  tokyoFiltersForm.addEventListener('change', function () {
    window.utils.debounce(updatePins, 500);
  });

  return function (data) {
    pinsData = data;
    updatePins();
  };

})();
