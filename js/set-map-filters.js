'use strict';

(function () {
  window.setMapFilters = function () {
    var DATA_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

    var pins = [];

    var tokyoFiltersContainer = document.querySelector('.tokyo__filters');
    var tokyoFilters = Array.from(tokyoFiltersContainer.querySelectorAll('.tokyo__filter')).map(function (it) {
      return it;
    });

    var featuresContainer = tokyoFiltersContainer.querySelector('.tokyo__filter-set');
    var featuresInputs = Array.from(featuresContainer.querySelectorAll('input')).map(function (it) {
      return it;
    });

    // ОБНОВЛЕНИЕ pin
    var updatePins = function () {

      var isMatching = function (pin) {

        var rank = 0;
        var matchingRank = 10;

        if (pin.offer.type === tokyoFilters[0].value || tokyoFilters[0].value === 'any') {
          rank++;
        }

        if (isMatchingPrice(pin)) {
          rank++;
        }

        if (pin.offer.rooms === +tokyoFilters[2].value || tokyoFilters[2].value === 'any') {
          rank++;
        }

        if (pin.offer.guests === +tokyoFilters[3].value || tokyoFilters[3].value === 'any') {
          rank++;
        }

        rank += getFeaturesMatchingRank(pin, rank);

        if (rank === matchingRank) {
          return true;
        }

        return false;
      };

      // ПРОВЕРКА СОВПАДЕНИЯ ЦЕНЫ
      var isMatchingPrice = function (pin) {
        var low = 10000;
        var high = 50000;

        if (tokyoFilters[1].value === 'low' && pin.offer.price <= low) {
          return true;
        }

        if (tokyoFilters[1].value === 'middle' && pin.offer.price >= low && pin.offer.price <= high) {
          return true;
        }

        if (tokyoFilters[1].value === 'high' && pin.offer.price >= high) {
          return true;
        }

        return false;
      };

      var isPinContainsFeature = function (pin, feature) {
        if (pin.offer.features.indexOf(feature) !== -1) {
          return true;
        }

        return false;
      };

      // ПРОВЕРКА КОЛИЧЕСТВА СОВПАДЕНИЙ ПО features
      var getFeaturesMatchingRank = function (pin) {
        var featuresRank = featuresInputs.length;

        for (var i = 0; i < featuresInputs.length; i++) {
          if (featuresInputs[i].checked === true && !isPinContainsFeature(pin, featuresInputs[i].value)) {
            featuresRank--;
          }
        }

        return featuresRank;
      };

      var filteredPins = pins.filter(function (it) {
        return isMatching(it);
      });

      window.generateMap.addPinMarksOnMap(filteredPins);

    };

    // ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ ДЛЯ select
    tokyoFilters.forEach(function (tokyoFilter) {
      tokyoFilter.addEventListener('change', function () {
        window.debounce(updatePins);
      });
    });

    // ДОБАВЛЕНИЕ СЛУШАТЕЛЕЙ ДЛЯ featuresInputs
    featuresInputs.forEach(function (featuresInput) {
      featuresInput.addEventListener('change', function () {
        window.debounce(updatePins);
      });
    });

    var onDataLoad = function (data) {
      pins = data;
      updatePins();
    };

    var onDataError = function (errorMessage) {
      window.generateMap.showErrorMessage(errorMessage);
    };

    window.load(DATA_URL, onDataLoad, onDataError);

  };

})();
