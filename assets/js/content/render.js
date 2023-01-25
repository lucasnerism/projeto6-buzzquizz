import QuizzMethods from "../api/quizzApi.js";

function gerarLista(response) {
  const lista = document.querySelector('.container-quizzes');
  response.forEach(dados => {

    const templateLista = `
    <div class="quizz" id="${dados.id}" onclick="abrirQuizz(${dados.id})" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${dados.image});background-size: cover; background-position: center;" >
    <p>${dados.title}</p>
    </div>
    `;
    lista.innerHTML += templateLista;
  });
}

//ali em cima na hora de gerar a lista eu usei essa função aqui pra abrir o Quizz e já tô enviando direto o id
function abrirQuizz(id) {

}

QuizzMethods.getAllQuizz().then(gerarLista);