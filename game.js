let acertos = 0;
let vitorias = 0;
let derrotas = 0;
let jogoIniciado = false;
let angulo = 0;
let animationFrameId;

const randNum = document.querySelector(".num--atual");
const startBtn = document.querySelector("#btn--start");
const maisAlto = document.querySelector("#btn--alto");
const maisBaixo = document.querySelector("#btn--baixo");
const scoreBoard = document.querySelector(".num--vit");
const loserBoard = document.querySelector(".num--der");

function sortearNum() {
  let numAleatorio = Math.floor(Math.random() * 20) + 1;
  randNum.textContent = numAleatorio;
  return numAleatorio;
}

function verificarAcerto(guess) {
  console.log(guess);
  if (!jogoIniciado) {
    alert("Inicie o jogo antes...");
    return;
  }

  let numAnterior = Number(randNum.textContent);
  while (numAnterior == randNum.textContent) {
    sortearNum();
  }

  let numNovo = Number(randNum.textContent);

  setTimeout(() => {
    if (guess === "alto" && numNovo > numAnterior) {
      acertos++;
      startAnimation(18);
      setTimeout(stopAnimation, 1500);
      checarVitoria();
    } else if (guess === "baixo" && numNovo < numAnterior) {
      acertos++;
      startAnimation(18);
      setTimeout(stopAnimation, 1500);
      checarVitoria();
    } else {
      gameOver();
    }
  }, 100);
}

function checarVitoria() {
  if (acertos >= 3) {
    document.body.classList.add("won");
    setTimeout(() => startAnimation(9), 1500);
    vitorias++;
    scoreBoard.textContent = vitorias;
    setTimeout(() => {
      resetarJogo();
    }, 5000);
  }
}

function gameOver() {
  derrotas++;
  document.body.classList.add("lost");
  startAnimation(9);
  loserBoard.textContent = derrotas;
  setTimeout(() => {
    resetarJogo();
  }, 3000);
}

function resetarJogo() {
  document.body.classList.remove("won", "lost");
  jogoIniciado = false;
  acertos = 0;
  randNum.textContent = "";
  startAnimation(3);
  startBtn.removeAttribute("disabled");
}

function iniciarJogo() {
  jogoIniciado = true;
  sortearNum();
  stopAnimation();
  startBtn.setAttribute("disabled", true);
}

function animarGradiente(speed = 3) {
  angulo += speed;
  angulo >= 359 ? (angulo = 0) : null;
  document.documentElement.style.setProperty("--angulo", `${angulo}deg`);
  animationFrameId = requestAnimationFrame(() => animarGradiente(speed));
}
function startAnimation(speed) {
  stopAnimation();
  animarGradiente(speed);
}

function stopAnimation() {
  animationFrameId
    ? cancelAnimationFrame(animationFrameId)
    : (animationFrameId = null);
}

startBtn.addEventListener("click", iniciarJogo);
startAnimation(3);
