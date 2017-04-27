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
  var photos = dialog.querySelector('.lodge__photos');

  // СКРЫВАНИЕ ЭЛЕМЕНТА
  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  // ОТОБРАЖЕНИЕ ЭЛЕМЕНТА
  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  // УДАЛЕНИЕ ВСЕХ ДОЧЕРНИХ ЭЛЕМЕНТОВ
  var removeAllChildren = function (element) {
    element.innerHTML = null;
  };

  // СОЗДАНИЕ МАССИВА РАЗМЕТОК УДОБСТВ
  var createPinFeaturesMark = function (pinFeaturesArray) {
    var featureElement;
    var fragment = document.createDocumentFragment();

    pinFeaturesArray.forEach(function (feature) {
      featureElement = document.createElement('span');

      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + feature);

      fragment.appendChild(featureElement);
    });

    return fragment;
  };

  var createPinPhotosMark = function (pinPhotosArray) {
    var photosElement;
    var fragment = document.createDocumentFragment();

    pinPhotosArray.forEach(function (photo) {
      photosElement = document.createElement('img');

      photosElement.setAttribute('src', photo);
      photosElement.setAttribute('alt', 'Lodge photo');
      photosElement.setAttribute('width', '52');
      photosElement.setAttribute('height', '42');

      fragment.appendChild(photosElement);
    });

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

    var refillElement = function (element, array, callback) {
      removeAllChildren(element);
      element.appendChild(callback(array));
    };

    title.textContent = pin.offer.title;
    titleImage.setAttribute('src', pin.author.avatar);

    address.textContent = pin.offer.address;
    price.innerHTML = pin.offer.price + '&#x20bd;' + '/ночь';
    type.textContent = getOfferTypeValue(pin);
    guestsRooms.textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    checkinOut.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;

    refillElement(features, pin.offer.features, createPinFeaturesMark);

    description.textContent = pin.offer.description;

    refillElement(photos, pin.offer.photos, createPinPhotosMark);
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

  var showDialog = function (evt, pin) {
    fillDialogFields(pin);
    openDialog(evt);
  };

  return {
    closeDialog: closeDialog,
    showDialog: showDialog
  };

})();
