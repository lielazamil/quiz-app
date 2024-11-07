let countSpan = document.querySelector(".count span");
let bulletspanContainer = document.querySelector(".spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let spans = document.querySelectorAll("span");

let questionArray=[];
async function fetchData() {
  try{
  const responce = await fetch("html_questions.json");
  const data= await responce.json();
  questionArray=data;
  displayPullets();
   getQuestions();
  
  }catch(error){
    console.log(error);
  }
}
fetchData();
let currentIndex=0;
function getQuestions(){
  const currentQuestion=questionArray[currentIndex];
  quizArea.innerHTML=`<h2>${currentQuestion.title}</h2>`;
  answerArea.innerHTML=`
  <div class="answer">
  <input type="radio" name="answer" id="answer1" value="${currentQuestion.answer_1}">
  <label for="answer1">${currentQuestion.answer_1}</label>
  </div>
  <div class="answer">
  <input type="radio" name="answer" id="answer2" value="${currentQuestion.answer_2}">
  <label for="answer2">${currentQuestion.answer_2}</label>
  </div>
  <div class="answer">
  <input type="radio" name="answer" id="answer3" value="${currentQuestion.answer_3}">
  <label for="answer3">${currentQuestion.answer_3}</label>
  </div>
  <div class="answer">
  <input type="radio" name="answer" id="answer4" value="${currentQuestion.answer_4}">
  <label for="answer4">${currentQuestion.answer_4}</label> 
 </div>
  `; 

}
let score =0;
submitButton.onclick = function () {
  let checkedAnswer = document.querySelector('input[name="answer"]:checked');
  let is_correct=checkedAnswer.value==questionArray[currentIndex].right_answer;
  spanStyle(is_correct);
  if(checkedAnswer){
    if(is_correct){
      score++;

    }
    currentIndex++;
    if(currentIndex<questionArray.length){
      getQuestions();
      
    }
    else{
      showRes();
    }

  }else{

  }
}
function displayPullets(){
  bulletspanContainer.innerHTML="";
  for(let i=0;i<questionArray.length;i++){
    const span=document.createElement("span");
    span.setAttribute("data-index", i);
    bulletspanContainer.appendChild(span);
  }
  

}
function spanStyle(is_correct){
  const bukket=document.querySelectorAll(".spans span");
  if(is_correct){
    bukket[currentIndex].style.backgroundColor='#0075ff';

  }else{
    bukket[currentIndex].style.backgroundColor='red';
  }
}

function displaycount(seconds){
countSpan.innerHTML=seconds;
if(seconds>0){
  seconds--;
  setTimeout(()=>{
    displaycount(seconds);
  },1000)
}
else{
  showRes();
}
}
displaycount(180);
function showRes(){
  quizArea.innerHTML=` you got ${score} from 10 `;
  answerArea.innerHTML="";
  submitButton.remove();
}