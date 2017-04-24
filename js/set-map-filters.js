'use strict';

(function () {
  window.setMapFilters = function (data) {

    var tokyoFiltersContainer = document.querySelector('.tokyo__filters');
    var tokyoFilters = Array.from(tokyoFiltersContainer.querySelectorAll('.tokyo__filter')).map(function (arrElem) {
      return arrElem;
    });

    var featuresContainer = tokyoFiltersContainer.querySelector('.tokyo__filter-set');
    var featuresInputs = Array.from(featuresContainer.querySelectorAll('input')).map(function (arrElem) {
      return arrElem;
    });

    // ОБНОВЛЕНИЕ pins
    var updatePins = function () {

      // ПРОВЕРКА СОВПАДЕНИЯ ПОЛЯ pin С ПОЛЕМ ФИЛЬТРА
      var isFieldMatchFilter = function (pinField, filter) {
        return pinField.toString() === filter.value.toString() ||
          filter.value.toString() === 'any';
      };

      // ПРОВЕРКА СОВПАДЕНИЯ ПО type
      var matchType = function (pin) {
        return isFieldMatchFilter(pin.offer.type, tokyoFilters[0]);
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
          return tokyoFilters[1].options[tokyoFilters[1].selectedIndex].value;
        };

        if (pin.offer.price >= prices[getSelectedValue()].min && pin.offer.price <= prices[getSelectedValue()].max) {
          return true;
        }

        return false;

      };

      // ПРОВЕРКА СОВПАДЕНИЯ ПО rooms
      var matchRooms = function (pin) {
        return isFieldMatchFilter(pin.offer.rooms, tokyoFilters[2]);
      };

      // ПРОВЕРКА СОВПАДЕНИЯ ПО guests
      var matchGuests = function (pin) {
        return isFieldMatchFilter(pin.offer.guests, tokyoFilters[3]);
      };

      // ПРОВЕРКА, СОДЕРЖИТ ЛИ pin ДАННЫЙ feature
      var isPinContainsFeature = function (pin, feature) {
        if (pin.offer.features.indexOf(feature) !== -1) {
          return true;
        }

        return false;
      };

      // ПРОВЕРКА СОВПАДЕНИЯ ПО features
      var matchFeatures = function (pin) {
        for (var i = 0; i < featuresInputs.length; i++) {
          if (featuresInputs[i].checked && !isPinContainsFeature(pin, featuresInputs[i].value)) {
            return false;
          }
        }

        return true;
      };

      // ПОЛУЧИТЬ ОТФИЛЬТРОВАННЫЙ МАССИВ ОБНОВЛЕНИЙ
      var getFilteredArray = function () {
        var pins = data.slice();

        var matchFunctions = [
          matchType,
          matchPrice,
          matchRooms,
          matchGuests,
          matchFeatures
        ];

        for (var i = 0; i < matchFunctions.length; i++) {
          if (pins.length === 0) {
            return pins;
          }
          pins = filterArray(pins, matchFunctions[i]);
        }

        return pins;
      };

      window.generateMap.updatePinMarksOnMap(getFilteredArray());

    };

    var filterArray = function (array, callback) {
      return array.filter(function (arrElem) {
        return callback(arrElem);
      });
    };

    var addListenersToInputs = function (inputs) {
      inputs.forEach(function (input) {
        input.addEventListener('change', function () {
          window.utils.debounce(updatePins);
        });
      });
    };

    addListenersToInputs(tokyoFilters);
    addListenersToInputs(featuresInputs);

    updatePins();

  };

})();
