import { quizzFinalizado } from "../content/render2.js"
import {stringToBoolean} from "../utils/utils.js"

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
  
      const answers = question.parentNode.querySelectorAll(".caixaResposta");
    
      answers.forEach(item => {
        item.removeEventListener("click", comportamentoResp);
        if (item != target) {
          item.classList.add("esbranquicado");
          item.parentElement.classList.add("respondido")
        }
        if (stringToBoolean(item.dataset.answer)) {
          item.querySelector("p").style.color = "green";
          if(target === item){
            acertos++
          }
        } else {
          item.querySelector("p").style.color = "red";
        }
      });

  const proxquest = question.nextElementSibling;
  setTimeout(() => {
    proxquest.scrollIntoView();
  }, 2000);

  if(document.querySelectorAll(".respondido").length === quizz.questions.length){
    quizzFinalizado()
  }
}

export { adicionarEventos, acertos };