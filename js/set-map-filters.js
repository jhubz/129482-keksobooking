'use strict';

(function () {

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
    var minFilterPrice = prices[getSelectedValue()].min;
    var maxFilterPrice = prices[getSelectedValue()].max;

    return pinPrice >= minFilterPrice && pinPrice <= maxFilterPrice;

  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО rooms
  var matchRooms = function (pin) {
    return isFieldMatchFilter(pin.offer.rooms, roomsFilter);
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО guests
  var matchGuests = function (pin) {
    return isFieldMatchFilter(pin.offer.guests, guestsFilter);
  };

  // ПРОВЕРКА, СОДЕРЖИТ ЛИ pin ДАННЫЙ feature
  var isPinContainsFeature = function (pin, feature) {
    return pin.offer.features.indexOf(feature) !== -1;
  };

  // ПРОВЕРКА СОВПАДЕНИЯ ПО features
  var matchFeatures = function (pin) {
    var mismatchFeatures = 0;
    [].forEach.call(featuresInputs, function (input) {
      if (input.checked && !isPinContainsFeature(pin, input.value)) {
        mismatchFeatures++;
      }
    });

    return mismatchFeatures === 0;

  };

  // ФИЛЬТРАЦИЯ МАССИВА
  var filterArray = function (array, callback) {
    return array.filter(function (arrElem) {
      return callback(arrElem);
    });
  };

  // ЗАДАТЬ ФИЛЬРЫ ДЛЯ ОБЪЯВЛЕНИЙ
  window.setMapFilters = function (data) {

    // ОБНОВЛЕНИЕ pins
    var updatePins = function () {
      var pins = data.slice();

      pins = filterArray(pins, matchType);
      pins = filterArray(pins, matchPrice);
      pins = filterArray(pins, matchRooms);
      pins = filterArray(pins, matchGuests);
      pins = filterArray(pins, matchFeatures);

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
