'use strict';

// КОНСТАНТЫ---------------------------------------------------------------------------------------------

const WIZARDS_QUANTITY = 4;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const USER_SETUP = document.querySelector(`.setup`);

const SETUP_OPEN_BUTTON = document.querySelector(`.setup-open`);
const SETUP_CLOSE_BUTTON = USER_SETUP.querySelector(`.setup-close`);
const SETUP_INPUT_USERNAME = USER_SETUP.querySelector(`.setup-user-name`);

// ------------------------------------------------------------------------------------------------------

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
  USER_SETUP.classList.remove(`hidden`);
  USER_SETUP.querySelector(`.setup-similar`).classList.remove(`hidden`);

  SETUP_CLOSE_BUTTON.addEventListener(`click`, onSetupCloseClick);
  SETUP_CLOSE_BUTTON.addEventListener(`click`, onSetupCloseEnterPress);

  document.addEventListener(`keydown`, onPopupEscPress);
  SETUP_INPUT_USERNAME.addEventListener(`keydown`, onInputNameEscPress);
};

// Функция, ЗАКРЫВАЕТ окно настроек персонажа----------------------------------------------------------------

const closePopup = function () {
  USER_SETUP.classList.add(`hidden`);

  SETUP_CLOSE_BUTTON.removeEventListener(`click`, onSetupCloseClick);
  SETUP_CLOSE_BUTTON.removeEventListener(`keydown`, onSetupCloseEnterPress);

  document.removeEventListener(`keydown`, onPopupEscPress);
  SETUP_INPUT_USERNAME.removeEventListener(`keydown`, onInputNameEscPress);
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
SETUP_OPEN_BUTTON.addEventListener(`click`, onSetupOpenClick);

// ОТКРЫТИЕ по нажатию Enter на аватарке в фокусе
SETUP_OPEN_BUTTON.addEventListener(`keydown`, onSetupOpenEnterPress);
