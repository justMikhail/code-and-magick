'use strict';

const fireballSize = 22;

const getFireballSpeed = function (isMovingLeft) {
  return isMovingLeft ? 2 : 5;
};

const wizardSpeed = 3;

const wizardWidth = 70;

const getWizardHeight = function () {
  return 1.337 * wizardWidth;
};

const getWizardX = function (gameFieldWidth) {
  return (gameFieldWidth - wizardWidth) / 2;
};

const getWizardY = function (gameFieldHeight) {
  return gameFieldHeight / 3;
};
