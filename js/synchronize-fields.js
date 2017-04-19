'use strict';

window.synchronizeFields = (function () {
  return function (changingField, syncingField, changingFieldValues, syncingFieldValues, callback) {
    var changingValueIndex = changingFieldValues.indexOf(changingField.value);
    callback(syncingField, syncingFieldValues[changingValueIndex]);
  };

})();
