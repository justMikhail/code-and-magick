'use strict';

// КОНСТАНТЫ---------------------------------------------------------------------------------------------

const WIZARDS_QUANTITY = 4;

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

// ------------------------------------------------------------------------------------------------------

const userSetup = document.querySelector(`.setup`);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userSetup.querySelector(`.setup-close`);
const setupInputName = userSetup.querySelector(`.setup-user-name`);

const similarListElement = document.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

// Генерируется случайный элемент масива------------------------------------------------------------------

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const getRandomArrayElement = (array) => {
  return array[getRandom(array.length - 1)];
};

// Создается новый пустой Фрагмент------------------------------------------------------------------------

const fragment = document.createDocumentFragment();

// Создается обьект с данными мага
const getDataWizard = function () {
  return {
    wizardName: `${getRandomArrayElement(WIZARD_NAMES)} ${getRandomArrayElement(WIZARD_SURNAMES)}`,
    wizardCoatColor: getRandomArrayElement(COAT_COLORS),
    wizardEyesColor: getRandomArrayElement(EYES_COLORS)
  };
};

// Генерируются случайные волшебники----------------------------------------------------------------------

const renderWizards = function () {
  for (let i = 0; i < WIZARDS_QUANTITY; i++) {

    const getWizard = function () {
      const dataWizard = getDataWizard();
      const wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector(`.setup-similar-label`).textContent = dataWizard.wizardName;
      wizardElement.querySelector(`.wizard-coat`).style.fill = dataWizard.wizardCoatColor;
      wizardElement.querySelector(`.wizard-eyes`).style.fill = dataWizard.wizardEyesColor;
      return wizardElement;
    };

    fragment.appendChild(getWizard());
  }

  similarListElement.appendChild(fragment);
};

renderWizards();

// Функция, ОТКРЫВАЕТ окно настроек персонажа----------------------------------------------------------------

const openPopup = function () {
  userSetup.classList.remove(`hidden`);
  userSetup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  setupClose.addEventListener(`click`, onSetupCloseClick);
  setupClose.addEventListener(`keydown`, onSetupCloseEnterPress);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupInputName.addEventListener(`keydown`, onInputNameEscPress);
};

// Функция, ЗАКРЫВАЕТ окно настроек персонажа----------------------------------------------------------------

const closePopup = function () {
  userSetup.classList.add(`hidden`);

  setupClose.removeEventListener(`click`, onSetupCloseClick);
  setupClose.removeEventListener(`keydown`, onSetupCloseEnterPress);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupInputName.removeEventListener(`keydown`, onInputNameEscPress);
};

// ----------------------------------------------------------------------------------------------------------

const onSetupOpenClick = function () {
  openPopup();
};

const onSetupOpenEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDfault();
    closePopup();
  }
};

const onSetupCloseClick = function () {
  closePopup();
};

const onSetupCloseEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const onInputNameEscPress = function (evt) { //
  if (evt.key === `Escape`) {
    evt.stopPropagation();
  }
};

// ОТКРЫТИЕ по клику на аватарке-------------------------------------------------------------------------------

setupOpen.addEventListener(`click`, onSetupOpenClick);

// ОТКРЫТИЕ по нажатию Enter на аватарке в фокусе--------------------------------------------------------------

setupOpen.addEventListener(`keydown`, onSetupOpenEnterPress);

// ВАЛИДАЦИЯ формы ввода имени пользователя

const onSetupInputNameInput = function () {
  const actionValueLength = setupInputName.value.length;

  if (actionValueLength < MIN_NAME_LENGTH) {
    setupInputName.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - actionValueLength} симв.`);
  } else if (actionValueLength > MAX_NAME_LENGTH) {
    setupInputName.setCustomValidity(`Удалите лишние ${actionValueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    setupInputName.setCustomValidity(``);
  }
  setupInputName.reportValidity();
};

setupInputName.addEventListener(`input`, onSetupInputNameInput);

// КАСТОМИЗАЦИЯ мага (цвет элементов)--------------------------------------------------------------------------
