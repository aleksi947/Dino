const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const startGame = document.getElementById("start");
const sky1 = document.getElementById("sky1");
const sky2 = document.getElementById("sky2");

let score = 0; // Переменная для хранения очков
let scoreInterval = null; // Для управления интервалом таймера

let isJumping = false;
let isGameRunning = false;

// Обработчик для прыжка
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && isGameRunning && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  dino.classList.add("jumping");
  setTimeout(() => {
    dino.classList.remove("jumping");
    isJumping = false;
  }, 500);
}

// Проверка столкновения
function checkCollision() {
  if (!isGameRunning) return;

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  if (
    dinoRect.right > cactusRect.left &&
    dinoRect.left < cactusRect.right &&
    dinoRect.bottom > cactusRect.top
  ) {
    alert("Game Over!");
    resetGame();
  }
}

// Сброс игры
function resetGame() {
  isGameRunning = false;

  // Остановка всех анимаций
  cactus.style.animation = "none";
  sky1.style.animation = "none";
  sky2.style.animation = "none";

  // Остановка таймера
  clearInterval(scoreInterval); // Останавливаем таймер
  scoreInterval = null; // Сбрасываем переменную

  // Сбрасываем текст счёта
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: 0`;

  setTimeout(() => {
    cactus.style.animation = "";
    sky1.style.animation = "";
    sky2.style.animation = "";
  }, 10);
}

// Запуск игры
startGame.addEventListener("click", () => {
  if (isGameRunning) return; // Если игра уже идёт, не запускаем заново

  isGameRunning = true;
  score = 0; // Сбрасываем очки
  startScoreTimer();

  // Анимация для кактуса
  cactus.style.animation = "moveCactus 2s linear infinite";

  // Анимация для облаков
  sky1.style.animation = "moveLeft1 5s linear infinite";
  sky2.style.animation = "moveLeft2 5s linear infinite";
  sky2.style.animationDelay = "2s";
});

function startScoreTimer() {
  const scoreElement = document.getElementById("score"); // Элемент для отображения очков

  // Если таймер уже запущен, не запускаем его повторно
  if (scoreInterval) return;

  scoreElement.textContent = `Score: ${score}`; // Сбрасываем текст

  // Запуск таймера
  scoreInterval = setInterval(() => {
    if (isGameRunning) {
      score += 1; // Увеличиваем очки
      scoreElement.textContent = `Score: ${score}`; // Обновляем текст
    }
  }, 1000); // Каждую секунду
}

// Проверяем столкновения каждые 10 мс
setInterval(checkCollision, 10);

