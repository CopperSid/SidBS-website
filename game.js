<script>
const questions = [
  {
    prompt: "Enemy team picks Surge in Gem Grab. Who counters him best?",
    options: ["Shelly", "Piper", "Gale", "Tick"],
    answer: 2
  },
  {
    prompt: "You're pushing trophies in Solo Showdown. Best brawler?",
    options: ["Edgar", "Mortis", "Piper", "Jessie"],
    answer: 0
  },
  {
    prompt: "Heist map with narrow lanes. Best pick?",
    options: ["Colt", "Bull", "Barley", "Leon"],
    answer: 2
  },
  {
    prompt: "Enemy team has a thrower comp in Brawl Ball. Who counters?",
    options: ["Mortis", "Tick", "Sprout", "Dynamike"],
    answer: 0
  },
  {
    prompt: "Open map in Bounty. Best sniper?",
    options: ["Poco", "Bull", "Piper", "Jacky"],
    answer: 2
  },
  {
    prompt: "Enemy team has tanks in Hot Zone. Best counter?",
    options: ["Colette", "El Primo", "Frank", "Edgar"],
    answer: 0
  },
  {
    prompt: "Which brawler is best for bush control?",
    options: ["Bo", "Nita", "Spike", "Sandy"],
    answer: 3
  },
  {
    prompt: "You're playing Knockout. Best clutch brawler?",
    options: ["Crow", "Surge", "Shelly", "Grom"],
    answer: 2
  },
  {
    prompt: "Enemy team is long-range. Best assassin pick?",
    options: ["Edgar", "Bull", "Darryl", "Poco"],
    answer: 0
  },
  {
    prompt: "Best mid for Gem Grab overall?",
    options: ["Gene", "Bull", "Frank", "Jacky"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const currentQSpan = document.getElementById("currentQ");
const finalScoreSpan = document.getElementById("finalScore");
const rankText = document.getElementById("rank-text");
const highScoreSpan = document.getElementById("highScore");

const savedHighScore = localStorage.getItem("sidbsHighScore") || 0;
highScoreSpan.textContent = savedHighScore;

startBtn.onclick = startGame;
restartBtn.onclick = startGame;

function startGame() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.prompt;
  optionsDiv.innerHTML = "";
  currentQSpan.textContent = currentQuestion + 1;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  const correctIndex = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === correctIndex) b.classList.add("correct");
    if (i === index && i !== correctIndex) b.classList.add("wrong");
  });

  if (index === correctIndex) {
    score += 10;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 800);
}

function endGame() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScoreSpan.textContent = score;

  let rank = "Bronze";
  if (score >= 90) rank = "Legendary";
  else if (score >= 70) rank = "Mythic";
  else if (score >= 50) rank = "Diamond";
  else if (score >= 30) rank = "Gold";
  else if (score >= 10) rank = "Silver";

  rankText.textContent = `Rank: ${rank}`;

  const savedHighScore = localStorage.getItem("sidbsHighScore") || 0;
  if (score > savedHighScore) {
    localStorage.setItem("sidbsHighScore", score);
    highScoreSpan.textContent = score;
  }
}
</script>
