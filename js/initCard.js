'use strict';

window.initCard = (function () {
  var dialog = document.querySelector('.dialog');
  var dialogCloseButton = dialog.querySelector('.dialog__close');

  var title = dialog.querySelector('.lodge__title');
  var titleImage = dialog.querySelector('.dialog__title img');

  var address = dialog.querySelector('.lodge__address');
  var price = dialog.querySelector('.lodge__price');
  var type = dialog.querySelector('.lodge__type');
  var guestsRooms = dialog.querySelector('.lodge__rooms-and-guests');
  var checkinOut = dialog.querySelector('.lodge__checkin-time');
  var features = dialog.querySelector('.lodge__features');
  var description = dialog.querySelector('.lodge__description');

  // СКРЫВАНИЕ ЭЛЕМЕНТА
  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  // ОТОБРАЖЕНИЕ ЭЛЕМЕНТА
  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  // УДАЛЕНИЕ ВСЕХ ДОЧЕРНИХ ЭЛЕМЕНТОВ
  var removeAllChild = function (element) {
    element.innerHTML = null;
  };

  // СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
  var createPinFeaturesMark = function (pinFeaturesArray) {
    var featureElement;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinFeaturesArray.length; i++) {
      featureElement = document.createElement('span');

      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + pinFeaturesArray[i]);

      fragment.appendChild(featureElement);
    }

    return fragment;
  };

  // ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ТИПА СДАВАЕМОГО ОБЪЕКТА
  var getOfferTypeValue = function (pin) {
    var offerTypes = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

    var value = offerTypes[pin.offer.type];

    return value;
  };

  // ЗАПОЛНЕНИЕ ДИАЛОГА ИНФОРМАЦИЕЙ
  var fillDialogFields = function (pin) {
    title.textContent = pin.offer.title;
    titleImage.setAttribute('src', pin.author.avatar);

    address.textContent = pin.offer.address;
    price.innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
    type.textContent = getOfferTypeValue(pin);
    guestsRooms.textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    checkinOut.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

    removeAllChild(features);
    features.appendChild(createPinFeaturesMark(pin.offer.features));

    description.textContent = pin.offer.description;
  };

  // ЗАКРЫТИЕ ДИАЛОГА ПРИ НАЖАТИИ ESC
  var onDialogEscPress = function (evt) {
    if (window.utils.isEscPress(evt)) {
      window.generatePin.unActivateSelectedPin();
      closeDialog(evt);
    }
  };

  // ЗАКРЫТИЕ ДИАЛОГА ПРИ КЛИКЕ НА КНОПКЕ ЗАКРЫТИЯ ДИАЛОГА
  var onDialogCloseClick = function (evt) {
    evt.preventDefault();
    window.generatePin.unActivateSelectedPin();
    closeDialog(evt);
  };

  // ОТКРЫТИЕ ДИАЛОГА
  var openDialog = function (evt) {
    document.addEventListener('keydown', onDialogEscPress);
    dialogCloseButton.addEventListener('click', onDialogCloseClick);

    showElement(dialog);
  };

  // ЗАКРЫТИЕ ДИАЛОГА
  var closeDialog = function (evt) {
    if (evt) {
      document.removeEventListener('keydown', onDialogEscPress);
      evt.currentTarget.removeEventListener('click', onDialogCloseClick);
    }

    hideElement(dialog);
  };

  return {
    closeDialog: closeDialog,
    openDialog: openDialog,
    fillDialogFields: fillDialogFields
  };

})();