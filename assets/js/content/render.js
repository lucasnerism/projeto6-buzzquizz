import QuizzMethods from "../api/quizzApi.js";
import Generate from "./generate.js";
import { insertEventOnEditIcon } from "../events/onClickEvents.js";
import { toggleLoader } from "../utils/utils.js";

const renders = {}

//essa função aqui gera os quizzes gerados pelo usuario e salva os id deles para retornar na função de gerar os outros
renders.seusQuizzes = () => {
  const key = [];
  let keyname;
  if (window.localStorage.length != 0) {
    for (let i = 0; i < window.localStorage.length; i++) {
      document.getElementById('seusquizzes').innerHTML = '<h1>Seus Quizzes</h1><button onclick="criarQuizz()" class="add-circleBtn"><ion-icon name="add-circle" ></ion-icon></button>';
      document.querySelector('.placeholder-seus-quizzes').style.display = "none";
      keyname = window.localStorage.key(i);
      QuizzMethods.getQuizzById(keyname).then(dados => {
        const lista = document.querySelector('.seus-quizzes');
        lista.innerHTML += `
      <div class="quizz" id="${dados.id}" onclick="abrirQuizz(${dados.id})" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
      <p>${dados.title}</p>
      </div>
      `;
      });
      key.push(Number(keyname));
    }
  }
  return key;
}

//essa função aqui gera todos os outros quizzes
renders.gerarLista = (response) => {
  const lista = document.querySelector('.container-quizzes');
  let key = renders.seusQuizzes();
  response.forEach(dados => {
    if (!key.includes(dados.id)) {
      const templateLista = `
    <div class="quizz" id="${dados.id}" onclick="abrirQuizz(${dados.id})" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
    <p>${dados.title}</p>
    </div>
    `;
      lista.innerHTML += templateLista;
    }
  });
}

renders.insertFinishQuizzInfo = (dados) => {
  const finishContent = document.querySelector(".finishContent")
  const footer = finishContent.nextElementSibling
  footer.querySelector(".doneQuizzBtn").id = `quizz-${dados.id}`
  finishContent.innerHTML = `
  <div class="imageArea" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
      <p>${dados.title}</p>
      </div>
  `
}

//ali em cima na hora de gerar as listas eu usei essa função aqui pra abrir o Quizz e já tô enviando direto o id
function abrirQuizz(event) {
  const id = this.id
}

function insertEventOnQuizzes() {
  const quizzes = document.querySelectorAll(".quizz")
  quizzes.forEach(quizz => quizz.onclick = abrirQuizz)
}

renders.insertQuestionsOnHtml = (questionsQtd, form) => {
  const formContent = form.querySelector(".questionContent")
  formContent.innerHTML = Generate.questions(Number(questionsQtd))
  insertEventOnEditIcon()
}

renders.insertLevelsOnHtml = (levelsQtd, form) => {
  const formContent = form.querySelector(".levelContent")
  formContent.innerHTML = Generate.levels(Number(levelsQtd))
  insertEventOnEditIcon()
}

renders.changeModal = (btnClicked, inputIsValid) => {
  const form = btnClicked.parentElement.parentElement
  const currentPage = form.parentElement
  const nextPage = currentPage.nextElementSibling;
  if (btnClicked.classList.contains("levelBtn") && inputIsValid) {
    currentPage.classList.add("hidden");
    toggleLoader()
    setTimeout(() => {
      toggleLoader()
      nextPage.classList.remove("hidden");
    }, 800);
  } else if (inputIsValid) {
    currentPage.classList.add("hidden");
    nextPage.classList.remove("hidden");
  }
}

export { renders }
