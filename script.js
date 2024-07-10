const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ansBtn");
const nextBtn = document.getElementById("nextBtn");

let weeklyScore = document.getElementById("weeklyScore");
let resetWeekly = document.getElementById("Week_Reset");

let currQuestionindex = 0;
let score =0;
// console.log(questions);
function startQuiz() {
    currQuestionindex=0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
} 
let weeklyScoreDisplay = 0;
function showQuestion() {
    resetQues();
    let currQuestion = questions[currQuestionindex];
    let questionNo = currQuestionindex+1;
    questionElement.innerHTML = questionNo + ". " + currQuestion.question;
    if( questionNo>1 && (questionNo - 1)%10 ==0){
        weeklyScore.style.display="inline-flex";
        weeklyScore.style.fontWeight = "bold";
        weeklyScore.innerText = `Week-${(questionNo-1)/10} score: ${weeklyScoreDisplay}/10 marks`;
        // console.log(score);
        // console.log(weeklyScoreDisplay);
        weeklyScoreDisplay=0;
        resetWeekly.style.display="flex";
    }else{
        weeklyScore.style.display="none";
        resetWeekly.style.display="none";
    }
    //adding Question Details
    currQuestion.answers.forEach(answer =>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("option");
        ansBtn.appendChild(btn);
        if(answer.correct){
            //adding correct answer to btn dataset
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click",selectAnswer);
    })
}

function resetQues(){
    nextBtn.style.display="none";
    //removes previous Options
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild); 
    }
}

function selectAnswer(e){
    const selectedAnswer = e.target;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    if(isCorrect){
        selectedAnswer.classList.add("correct");
        score++;
        weeklyScoreDisplay++;
    }else{
        selectedAnswer.classList.add("Incorrect");
    }
    //disabling choosing other options and enabling display of nextBtn
    Array.from(ansBtn.children).forEach(btn =>{
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextBtn.style.display = "flex";
}

function nextQuestion(){
    currQuestionindex++;
    if(currQuestionindex<questions.length){
        showQuestion();
    }else{
        displayScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(currQuestionindex<questions.length){
        nextQuestion();
    }else{
        startQuiz();
    }
})
resetWeekly.addEventListener("click",()=>{
    weeklyScoreDisplay=0;
    currQuestionindex = currQuestionindex - 10;
    showQuestion();
})

function displayScore(){
    resetQues();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = `Play Again`;
    nextBtn.style.display = "flex";
}
startQuiz();
