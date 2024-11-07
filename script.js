let countSpan = document.querySelector(".count span");
let bulletspanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");

let currentIndex = 0; 
let correctAnswers = 0;  
let questions;

function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", "html_questions.json", true); // تأكد من المسار الصحيح بناءً على إعداد الخادم المحلي
  myRequest.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      questions = JSON.parse(this.responseText);
      createBullets(questions.length);
      addQuestionData(questions[currentIndex]);
    } else {
      console.error("Error fetching questions");
    }
  };
  myRequest.onerror = function () {
    console.error("Request error");
  };
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;
  for (let i = 1; i <= num; i++) {
    let bullet = document.createElement("span");
    if (i === 1) {
      bullet.className = "on";
    }
    bulletspanContainer.appendChild(bullet);
  }
}

function addQuestionData(questionObj) {
  quizArea.innerHTML = '';
  answerArea.innerHTML = '';

  let questionTitle = document.createElement("h2");
  questionTitle.textContent = questionObj.title;
  quizArea.appendChild(questionTitle);

  for (let i = 1; i <= 4; i++) {
    let answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.id = `answer-${i}`;
    radioInput.value = questionObj[`answer_${i}`];

    let answerLabel = document.createElement("label");
    answerLabel.htmlFor = radioInput.id;
    answerLabel.textContent = questionObj[`answer_${i}`];

    answerDiv.appendChild(radioInput);
    answerDiv.appendChild(answerLabel);

    answerArea.appendChild(answerDiv);
  }
}

submitButton.onclick = function () {
  let selectedAnswer = document.querySelector('input[name="answer"]:checked');
  
  if (selectedAnswer) {
    let userAnswer = selectedAnswer.value;
    
    if (userAnswer === questions[currentIndex].right_answer) {
      correctAnswers++;
    }

    currentIndex++; 
    
    if (currentIndex < questions.length) {
      addQuestionData(questions[currentIndex]);
      updateBullets();
    } else {
      showResults();
    }
  } else {
    alert("Please select an answer!");
  }
};

function updateBullets() {
  let allBullets = document.querySelectorAll(".bullets .spans span");
  allBullets.forEach((bullet, index) => {
    if (index < currentIndex) {
      bullet.classList.add("completed");
    } else if (index === currentIndex) {
      bullet.classList.add("on");
    }
  });
}

function showResults() {
  quizArea.innerHTML = ''; 
  answerArea.innerHTML = ''; 
  
  submitButton.remove(); 

  let resultText = document.createElement("h2");
  resultText.textContent = `You've answered ${correctAnswers} out of ${questions.length} correctly!`;
  resultsContainer.appendChild(resultText);
}
