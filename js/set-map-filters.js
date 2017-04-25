'use strict';

window.setMapFilters = (function () {

  var tokyoFiltersContainer = document.querySelector('.tokyo__filters');
  var typeFilter = tokyoFiltersContainer.querySelector('#housing_type');
  var priceFilter = tokyoFiltersContainer.querySelector('#housing_price');
  var roomsFilter = tokyoFiltersContainer.querySelector('#housing_room-number');
  var guestsFilter = tokyoFiltersContainer.querySelector('#housing_guests-number');

  var featuresContainer = tokyoFiltersContainer.querySelector('.tokyo__filter-set');
  var featuresInputs = featuresContainer.querySelectorAll('input');

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
    var prices = {
      low: {
        min: 0,
        max: 10000
      },

      middle: {
        min: 10000,
        max: 50000
      },

      high: {
        min: 50000,
        max: 9999999999
      }

    };

    var getSelectedValue = function () {
      return priceFilter.options[priceFilter.selectedIndex].value;
    };

    var pinPrice = pin.offer.price;
    var priceRange = prices[getSelectedValue()];

    return pinPrice >= priceRange.min && pinPrice <= priceRange.max;
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

  // ПРОВЕРКА СОВПАДЕНИЯ filter feature С pin features
  var matchFeature = function (pin, feature) {
    var checkedInput = featuresContainer.querySelector('input[value=' + feature + ']:checked');

    if (!checkedInput) {
      return true;
    }

    return pin.offer.features.indexOf(checkedInput.value) !== -1;
  };

  // ФИЛЬТРАЦИЯ МАССИВА ПО feature
  var filterArrayByFeature = function (array, feature) {
    return array.filter(function (arrElem) {
      return matchFeature(arrElem, feature);
    });
  };

  return function (data) {
    // ОБНОВЛЕНИЕ pins
    var updatePins = function () {
      var pins = data.slice();

      pins = filterArray(pins, matchType);
      pins = filterArray(pins, matchPrice);
      pins = filterArray(pins, matchRooms);
      pins = filterArray(pins, matchGuests);

      pins = filterArrayByFeature(pins, 'wifi');
      pins = filterArrayByFeature(pins, 'dishwasher');
      pins = filterArrayByFeature(pins, 'parking');
      pins = filterArrayByFeature(pins, 'washer');
      pins = filterArrayByFeature(pins, 'elevator');
      pins = filterArrayByFeature(pins, 'conditioner');

      window.generateMap.updatePinMarksOnMap(pins);
    };

    var addListenerToSelect = function (select) {
      select.addEventListener('change', function () {
        window.utils.debounce(updatePins);
      });
    };

    var addListenersToInputs = function (inputs) {
      [].forEach.call(inputs, function (input) {
        input.addEventListener('change', function () {
          window.utils.debounce(updatePins);
        });
      });
    };

    addListenerToSelect(typeFilter);
    addListenerToSelect(priceFilter);
    addListenerToSelect(roomsFilter);
    addListenerToSelect(guestsFilter);

    addListenersToInputs(featuresInputs);

    updatePins();
  };

})();
