const quizData = [
  {
    question: "How old is Florin?",
    a: "10",
    b: "20",
    c: "17",
    d: "25",
    correct: "c",
  },
  {
    question: "What is the most used programming language in 2020?",
    a: "Java",
    b: "Python",
    c: "C",
    d: "Javascript",
    correct: "b",
  },
  {
    question: "Who is the president of US?",
    a: "Alex Zongo",
    b: "Barack Obama",
    c: "Joe Bidden",
    d: "Donald Trump",
    correct: "c",
  },
  {
    question: " What that HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascade Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters terminal motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was Javascript launched?",
    a: "1990",
    b: "1996",
    c: "1993",
    d: "none of the above",
    correct: "d",
  },
];
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerEl = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;
  answerEl.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
      //console.log(answerEl.checked);
    }
  });
  return answer;
}

function deselectAnswers() {
  answerEl.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      //show result
      quiz.innerHTML = `
      <h2>You answered correctly at ${score}/${quizData.length} questions. </h2> <button onClick="location.reload()">Reload</button>`;
    }
  }
});
