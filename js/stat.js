'use strict';

// Константы=================================================================================
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 16;
const BAR_GAP = GAP * 5;
const BAR_WIDTH = GAP * 4;
const BAR_HEIGHT = 150;

// Цвета гистограммы времен участников=======================================================
const userColor = `rgba(255, 0, 0, 1)`;
const getOtherColor = function () {
  let color = `hsl(` + 240 + `,` + (100 * Math.random()) + `%,` + 50 + `%)`;
  return color;
};

// renderCloud===============================================================================
const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
// getMaxElement=============================================================================
const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// renderStatistics==========================================================================
window.renderStatistics = function (ctx, names, times) {

  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );

  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#ffffff`
  );

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + (GAP * 3), CLOUD_Y + (GAP * 3));
  ctx.fillText(`Список результатов:`, CLOUD_X + (GAP * 3), CLOUD_Y + (GAP * 3) + FONT_GAP);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `#000`;

    ctx.fillText(
        names[i],
        CLOUD_X + (BAR_WIDTH) + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - (GAP * 2)
    );

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + (BAR_WIDTH) + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - BAR_WIDTH - FONT_GAP - (BAR_HEIGHT * times[i] / maxTime)
    );

    if (names[i] === `Вы`) {
      ctx.fillStyle = userColor;
    } else {
      ctx.fillStyle = getOtherColor();
    }

    ctx.fillRect(
        CLOUD_X + (BAR_WIDTH) + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + CLOUD_HEIGHT - (GAP * 3) - FONT_GAP - (BAR_HEIGHT * times[i] / maxTime),
        BAR_WIDTH,
        BAR_HEIGHT * times[i] / maxTime
    );
  }
};
