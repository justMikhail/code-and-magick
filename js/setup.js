'use strict';

// Обьявляет КОНСТАНТЫ=============================================================================
const WIZARDS_QUANTITY = 4;
const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

// Показывает блок с карточкой мага===============================================================
const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

// ===============================================================================================
const similarListElement = document.querySelector(`.setup-similar-list`);

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

// Функция возвращает случайный элемент масива====================================================
function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const getRandomArrayElement = (array) => {
  return array[getRandom(array.length - 1)];
};

// Функция, создает масив из сгенерированных магов=================================================
const generateWizardsArray = function (count) {
  const result = [];

  for (let i = 0; i < count.length; i++) {
    result[i] = {
      wizardName: `${getRandomArrayElement(WIZARD_NAMES)} ${getRandomArrayElement(WIZARD_SURNAMES)}`,
      wizardCoatColor: getRandomArrayElement(COAT_COLORS),
      wizardEyesColor: getRandomArrayElement(EYES_COLORS)
    };
  }
  return result;
};

// Функция генерирует случайных волшебников=======================================================
const renderWizards = function (wizards) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < wizards.length; i++) {

    const wizardData = wizards[i];
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizardData.wizardName;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizardData.wizardCoatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizardData.wizardEyesColor;

    fragment.appendChild(wizardElement);
  }

  similarListElement.appendChild(fragment);
};


// ===============================================================================================
const wizards = generateWizardsArray(WIZARDS_QUANTITY);
renderWizards(wizards);

userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
