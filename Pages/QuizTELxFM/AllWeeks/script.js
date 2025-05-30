const correctAnswer =  ["D", "A", "D", "D", "D", "D", "A", "B", "A", "A","B", "A", "A", "D", "D", "B", "A", "B", "C", "C", "B", "B", "D", "A", "B", "D", "B", "A", "B", "A", "A", "C", "A", "D", "D", "B", "C", "B", "A", "A", "B", "D", "A", "A", "C", "D", "A", "B", "B", "D","C", "D", "A", "C", "C", "D", "B", "A", "C", "C","B", "C", "C", "B", "D", "C", "C", "A", "D", "D","A", "A", "A", "B", "B", "C", "B", "B", "D", "B","B", "C", "B", "C", "B", "D", "A", "B", "C", "B","D", "B", "A", "B", "C", "A", "B", "C", "D", "D","C","B","D","A","D","C","B","D","D","D","B","B","B","C","B","A","C","D","B","C"];
const correctOptions = ["D", "A", "D", "D", "D", "D", "A", "B", "A", "A","B", "A", "A", "D", "D", "B", "A", "B", "C", "C", "B", "B", "D", "A", "B", "D", "B", "A", "B", "A", "A", "C", "A", "D", "D", "B", "C", "B", "A", "A", "B", "D", "A", "A", "C", "D", "A", "B", "B", "D","C", "D", "A", "C", "C", "D", "B", "A", "C", "C","B", "C", "C", "B", "D", "C", "C", "A", "D", "D","A", "A", "A", "B", "B", "C", "B", "B", "D", "B","B", "C", "B", "C", "B", "D", "A", "B", "C", "B","D", "B", "A", "B", "C", "A", "B", "C", "D", "D","C","B","D","A","D","C","B","D","D","D","B","B","B","C","B","A","C","D","B","C"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");
const radios = document.querySelectorAll('input[type="radio"]');
const questions = document.querySelectorAll(".question");
const messageElement = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // radios.forEach(function(radio) {
  //   radio.disabled = true;
  // });
  radios.forEach(function(radio) {
    const label = document.querySelector(`label[for="${radio.id}"]`);
    
    if (radio.checked) {
        label.classList.add('selected');
    }else{
      radio.disabled = true;
    }
});
  let score = 0;
  const userAnswers = [
    ...document.querySelectorAll("input[type=radio]:checked"),
  ].map((el) => el.value);

  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswer[index]) {
      score += 1;
      questions[index].classList.add("correct");
    } else {
      questions[index].classList.add("wrong");

      // Find the correct option and highlight it
      const options = questions[index].querySelectorAll(".option");
      options.forEach((option) => {
        const optionValue = option.querySelector("input").value;
        if (correctOptions[index] === optionValue) {
          option.classList.add("correct-option");
        }
      });
    }
  });

  scrollTo(0, 0);
  result.classList.remove("hide");
  result.querySelector(
    "p"
  ).textContent = `You scored ${score}/${userAnswers.length}!`;

  if (score === userAnswers.length) {
    messageElement.textContent = "Excellent!";
  } else if (score >= Math.floor(userAnswers.length * 0.7)) {
    messageElement.textContent = "Good!";
  } else if (score >= Math.floor(userAnswers.length * 0.5)) {
    messageElement.textContent = "Average!";
  } else {
    messageElement.textContent = "Try Once more!";
  }
});

let mybutton = document.getElementById("scrolltoTop");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
