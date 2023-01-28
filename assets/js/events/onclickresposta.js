let quizz;
let acertos;
function adicionarEventos(dados) {
  let rspsts = document.querySelectorAll('.caixaResposta');
  quizz = dados;
  acertos = 0;
  rspsts.forEach(caixa => {
    caixa.addEventListener("click", comportamentoResp);
  });
}
function comportamentoResp(event) {
  const target = event.currentTarget;
  const question = target.parentNode.parentNode.firstElementChild;
  const tituloquest = question.innerText;
  let respcerta;
  quizz.questions.forEach(item => {
    if (item.title === tituloquest) {
      item.answers.forEach(answer => {
        if (answer.isCorrectAnswer) {
          respcerta = { text: answer.text, image: answer.image };
        }
      });
      const answers = question.parentNode.querySelectorAll(".caixaResposta");
      answers.forEach(item => {
        let resp = { text: item.innerText, image: item.querySelector('img').src };
        item.removeEventListener("click", comportamentoResp);
        if (item != target) {
          item.classList.add("esbranquicado");
        }
        if (resp.text === respcerta.text && resp.image === respcerta.image) {
          item.querySelector("p").style.color = "green";
          if (item === target) {
            acertos++;
          }
        } else {
          item.querySelector("p").style.color = "red";
        }


      });
    }
  });
  const proxquest = question.nextElementSibling;
  setTimeout(() => {
    proxquest.scrollIntoView();
  }, 2000);
}
export { adicionarEventos, acertos };