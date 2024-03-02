const $ = document.querySelector.bind(document);

const ball = $(".ball");
const barrier = $(".barrier");

const counter = $(".counter-value");
const jumpBtn = $(".jump-btn");
const resetBtn = $(".reset-btn");
let wasCollision = false;
let counterValue = 0;
let barrierX = 0;
let ballY = 0;
const barrierStep = 30;
let time = 200;
let countFall = 0;
// значения 390 и 460 подобраны опытным путем, по-хорошему надо их рассчитывать исходя
// из размер поля, элементов, шага, но мне лень

const checkCollision = () => {
  if (ballY === 0 && barrierX > 390) {
    return true;
  }
  return false;
};

const startGame = () => {
  jumpBtn.addEventListener("click", () => {
    ballY += 100;
    ball.style.bottom = `${ballY}px`;

    setTimeout(() => {
      ballY = 0;
      ball.style.bottom = `${ballY}px`;
    }, 700);
  });

  const moveBarrier = () => {
    barrierX += barrierStep;
    wasCollision = checkCollision();

    if (barrierX >= 460) {
      barrierX = 0;
      if (!wasCollision) {
        // по этим же столкновениям можно отнимать единицу из какого-нибудь счетчика жизней
        if ((counterValue += 1)) {
          time -= 10;
          counter.innerText = counterValue;
        }
      }
      wasCollision = false;
    } else if (wasCollision === true) {
      countFall++;
      let collision = setTimeout(() => {
        barrier.style.border = "4px solid red";
      }, 40);
      setTimeout(() => {
        barrier.style.border = "none";
      }, 180);
    } else if (countFall === 6) {
      location.reload();
    }
    barrier.style.right = `${barrierX}px`;
    setTimeout(moveBarrier, time);
  };

  setTimeout(moveBarrier, 300);
};

startGame();

// // const barrierOne = $(".barrierOne");
// // const barrierTwo = $(".barrierTwo");
