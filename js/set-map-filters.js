'use strict';

window.setMapFilters = (function () {
  var tokyoFiltersForm = document.querySelector('.tokyo__filters');
  var typeFilter = tokyoFiltersForm.querySelector('#housing_type');
  var priceFilter = tokyoFiltersForm.querySelector('#housing_price');
  var roomsFilter = tokyoFiltersForm.querySelector('#housing_room-number');
  var guestsFilter = tokyoFiltersForm.querySelector('#housing_guests-number');

  var featuresContainer = tokyoFiltersForm.querySelector('.tokyo__filter-set');

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
    switch (priceFilter.value) {
      case 'low':
        return pin.offer.price < 10000;
      case 'high':
        return pin.offer.price > 50000;
      default:
        return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
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
      var features = arrElem.offer.features;
      return features.includes(feature);
    });
  };

  return function (data) {
    // ОБНОВЛЕНИЕ pins
    var updatePins = function () {
      var pins = data.slice();
      var checkedInputs = featuresContainer.querySelectorAll('input:checked');

      pins = filterArray(pins, matchType);
      pins = filterArray(pins, matchPrice);
      pins = filterArray(pins, matchRooms);
      pins = filterArray(pins, matchGuests);

      [].forEach.call(checkedInputs, function (checkedInput) {
        pins = filterArrayByFeature(pins, checkedInput.value);
      });

      window.generateMap.updatePinMarksOnMap(pins);
    };

    tokyoFiltersForm.addEventListener('change', function () {
      window.utils.debounce(500, updatePins);
    });

    updatePins();
  };

})();
