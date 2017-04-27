'use strict';

window.synchronizeFields = (function () {

  return function (changingField, syncingField, changingFieldValues, syncingFieldValues, callback) {
    changingField.addEventListener('change', function () {
      var changingValueIndex = changingFieldValues.indexOf(changingField.value);
      callback(syncingField, syncingFieldValues[changingValueIndex]);
    });
  };

})();
