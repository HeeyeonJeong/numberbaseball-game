const numberbox = document.querySelector(".numberbox");
const button = document.querySelector(".button");
const strikeHint = document.querySelector(".strike-hint");
const ballHint = document.querySelector(".ball-hint");
const answerBOX = document.querySelector(".answer");

//비밀 숫자(1,2,3,4,5,6,7,8,9 중 4개를 조합)
let candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let numberArray = [];

for (let i = 0; i < 4; i++) {
  let getNumber = candidate.splice(Math.floor(Math.random() * 9 - 1) - i, 1);
  numberArray.push(getNumber);
}

numberAnswer = numberArray.join(""); //정답
console.log(numberAnswer);

//내가 제출한 숫자(10번 제한)
let chance = 0;
const numberset = document.getElementById("numberset");

numberset.addEventListener("submit", getValueHandler);

function getValueHandler(e) {
  e.preventDefault();
  let getValue = numberbox.value; //numberbox 입력 값

  numberbox.focus();
  numberset.reset();

  const note = document.querySelector(".note");
  const noteList = document.createElement("LI");
  note.appendChild(noteList);

  if (chance < 10) {
    if (numberAnswer === getValue) {
      //정답일 경우
      noteList.innerHTML = `${getValue}는 정답입니다. 홈런!`;
      reset();
    } else if (numberAnswer !== getValue) {
      //정답이 아닐 경우
      let strike = 0;
      let ball = 0;

      for (let i = 0; i < 4; i++) {
        if (numberAnswer[i] === getValue[i]) {
          strike++;
        } else if (numberAnswer.indexOf(getValue[i]) > -1) {
          ball++;
        }
      }
      noteList.innerHTML = `${getValue}는 ${strike}스트라이크, ${ball}볼 입니다.`;
      chance = chance + 1;
    }
    if (chance === 10) {
      answerBOX.innerHTML = numberAnswer;
      reset();
    }
  }
}

//새로고침, reset
const submitbox = document.querySelector(".submitbox");
const resetBnt = document.querySelector(".resetbutton");

function reset() {
  submitbox.classList.add("resetbutton");
  resetBnt.classList.add("block");
}
