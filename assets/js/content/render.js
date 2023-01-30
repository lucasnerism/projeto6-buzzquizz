import QuizzApiMethods from "../api/quizzApi.js";
import Generate from "./generate.js";
import { insertEventOnEditIcon, insertEventOnCreateQuizzButton, insertEventOnCrudButton } from "../events/onClickEvents.js";
import { toggleLoader, repeatParentElement } from "../utils/utils.js";
import {insertBuscarQuizzes} from "./render2.js"

const renders = {};

//essa função aqui gera os quizzes gerados pelo usuario e salva os id deles para retornar na função de gerar os outros
renders.seusQuizzes = () => {
  const key = [];
  let keyname;
  if (window.localStorage.length != 0) {
    for (let i = 0; i < window.localStorage.length; i++) {
      document.getElementById('seusquizzes').innerHTML = '<h1>Seus Quizzes</h1><button class="add-circleBtn createQuizzBtn"><ion-icon name="add-circle"></ion-icon></button>';
      insertEventOnCreateQuizzButton();
      document.querySelector('.placeholder-seus-quizzes').style.display = "none";
      keyname = window.localStorage.key(i);
      QuizzApiMethods.getQuizzById(keyname).then(dados => {
        const lista = document.querySelector('.seus-quizzes');
        lista.innerHTML += `
      <div class="quizz" id="${dados.id}" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
      <p>${dados.title}</p>
        <div class="editDeleteIcons">
        <button id="edit-${dados.id}" class="editYourQuizz crudButton">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button id="delete-${dados.id}" class="deleteYourQuizz crudButton">
          <ion-icon name="trash-outline"></ion-icon>
        </button>  
        </div>
      </div>
      `;
      insertEventOnCrudButton()
      });
      key.push(Number(keyname));

    }
  }
  return key;
};

//essa função aqui gera todos os outros quizzes
renders.gerarLista = (response) => {
  const lista = document.querySelector('.container-quizzes');
  let key = renders.seusQuizzes();
  response.forEach(dados => {
    if (!key.includes(dados.id)) {
      const templateLista = `
    <div class="quizz" id="${dados.id}" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
    <p>${dados.title}</p>
        </div>
    `;
      lista.innerHTML += templateLista;
    }
  });
};

renders.insertFinishQuizzInfo = (dados) => {
  const finishContent = document.querySelector(".finishContent");
  const footer = finishContent.nextElementSibling;
  footer.querySelector(".doneQuizzBtn").id = `quizz-${dados.id}`;
  finishContent.innerHTML = `
  <div class="imageArea" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
      <p>${dados.title}</p>
      </div>
  `;
};

renders.insertQuestionsOnHtml = (questionsQtd, form) => {
  const formContent = form.querySelector(".questionContent");
  formContent.innerHTML = Generate.questions(Number(questionsQtd));
  formContent.querySelector(".questions:first-child").classList.remove("close")
  insertEventOnEditIcon();
};

renders.insertLevelsOnHtml = (levelsQtd, form) => {
  const formContent = form.querySelector(".levelContent");
  formContent.innerHTML = Generate.levels(Number(levelsQtd));
  insertEventOnEditIcon();
};

renders.changeFormModal = (btnClicked, inputIsValid) => {
  const form = repeatParentElement(btnClicked, 2);
  const currentPage = form.parentElement;
  const nextPage = currentPage.nextElementSibling;
  if (btnClicked.classList.contains("levelBtn") && inputIsValid) {
    currentPage.classList.add("hidden");
    toggleLoader();
    setTimeout(() => {
      toggleLoader();
      nextPage.classList.remove("hidden");
    }, 800);
  } else if (inputIsValid) {
    currentPage.classList.add("hidden");
    nextPage.classList.remove("hidden");
  }
};

renders.changeModal = (btnClicked) => {
  let currentPage = "";
  let nextPage = "";

  if (btnClicked.classList.contains("createQuizzBtn")) {
    currentPage = repeatParentElement(btnClicked, 4);
    nextPage = currentPage.nextElementSibling;
  }
  
  if (btnClicked.classList.contains("createQuizzAlternate")) {
    currentPage = repeatParentElement(btnClicked, 4);
    nextPage = currentPage.nextElementSibling;
  }

  if (btnClicked.classList.contains("editYourQuizz")) {
    currentPage = repeatParentElement(btnClicked, 6)
    nextPage = currentPage.nextElementSibling;
  }

  if (btnClicked.classList.contains("quizz")) {
    currentPage = repeatParentElement(btnClicked, 4)
    nextPage = currentPage.previousElementSibling;
  }

  currentPage.classList.add("hidden");
  nextPage.classList.remove("hidden");
};


export { renders };
