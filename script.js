const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("ansBtn");
const nextBtn = document.getElementById("nextBtn");

let weeklyScore = document.getElementById("weeklyScore");
let currQuestionindex = 0;
let score =0;
console.log(questions);
function startQuiz() {
    currQuestionindex=0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
} 

function showQuestion() {
    resetQues();
    let currQuestion = questions[currQuestionindex];
    let questionNo = currQuestionindex+1;
    questionElement.innerHTML = questionNo + ". " + currQuestion.question;
    if( questionNo>1 && (questionNo - 1) %10 == 0){
        weeklyScore.style.display="inline-flex";
        weeklyScore.style.fontWeight = "bold";
        weeklyScore.innerText = `Week-${(questionNo - 1)/10} score: ${score}/10 marks`;
    }else{
        weeklyScore.style.display="none";
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

function displayScore(){
    resetQues();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = `Play Again`;
    nextBtn.style.display = "flex";
}
startQuiz();
