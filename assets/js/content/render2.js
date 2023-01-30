import QuizzApiMethods from "../api/quizzApi.js";
import {adicionarEventos, acertos} from "../events/onclickresposta.js";

let listaPerguntas = document.querySelector('.listaDePergunta');

let respostas = [];

let quizz = [];

function comparador() { 
	return Math.random() - 0.5; 
} 

function buscarQuizz() {
    // const id = Number(event.target.id)
    const promise = QuizzApiMethods.getQuizzById(11)
    promise.then(exibirQuizz);
    promise.catch(e => console.log("Deu errado"));
}

function insertBuscarQuizzes(){
    const quizzes = document.querySelectorAll(".quizz")
    quizzes.forEach(quizz => quizz.onclick = buscarQuizz)
}

function exibirQuizz(response) {
    quizz = response;
    TelaquizzEscolhido();
}
buscarQuizz(11)
function TelaquizzEscolhido() {
    let banner = document.querySelector('.banner');

    const template = `
                <img src="${quizz.image}" alt="imagem do quizz" class="imagemBanner">
                <p class="tituloQuizz">${quizz.title}</p>
    `;

    banner.innerHTML += template;
    
    for (let i = 0; i < quizz.questions.length; i++) {
        
        respostas = [];
        
        let lista = `
            <div class="caixa">
                <div class="caixaPergunta">
                    <p class="pergunta">${quizz.questions[i].title}</p>
                </div> 

                <div class="containerResposta"></div>
            </div>
            `;

        listaPerguntas.innerHTML += lista;

        document.querySelector('.caixa:last-child .caixaPergunta').style.backgroundColor = `${quizz.questions[i].color}`

        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            let resp = `
                    <div class="caixaResposta">
                            <img src="${quizz.questions[i].answers[j].image}" class="imagemOpcao">
                            <p class="respostaOpcao">${quizz.questions[i].answers[j].text}</p>
                    </div>  
                `

            respostas.push(resp);
        }
        respostas.sort(comparador);

        for (let k = 0; k < respostas.length; k++) {
            document.querySelector('.caixa:last-child .containerResposta').innerHTML += respostas[k];
        }
    }    
    adicionarEventos(quizz)
}

function quizzFinalizado() {
    let template;
    let pctgDecimal = (acertos/quizz.questions.length)*100;
    let porcentagem = (Math.round(pctgDecimal));
    
    for (let i = 0; i < quizz.levels.length; i++) {
        if (porcentagem >= quizz.levels[i].minValue) {

            template = `
                <div class="caixa">
                    <div class="topoFinal">
                        <p class="tituloFinal">${porcentagem}% de acerto: ${quizz.levels[i].title}</p>
                    </div>

                    <div class="containerTxtImg">
                        <img src="${quizz.levels[i].image}" class="imagemFinal">
                        <p class="textoFinal">${quizz.levels[i].text}</p>
                    </div>
                </div>
            `
        }
    }

    listaPerguntas.innerHTML += template;

}

export { buscarQuizz, quizzFinalizado, insertBuscarQuizzes }

