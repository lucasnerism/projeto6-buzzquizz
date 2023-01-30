import QuizzApiMethods from "../api/quizzApi.js";
import {adicionarEventos, acertos} from "../events/onclickresposta.js";

let banner = document.querySelector('.banner');

let listaPerguntas = document.querySelector('.listaDePergunta');

let respostas = [];

let quizz = [];

function comparador() { 
	return Math.random() - 0.5; 
} 

function buscarQuizz(id) {
    const promise = QuizzApiMethods.getQuizzById(id)
    promise.then(exibirQuizz);
    promise.catch('deu errado');
}

function exibirQuizz(response) {
    console.log('buscou o quizz')
    quizz = response;
    TelaquizzEscolhido();
}

buscarQuizz(11);

function TelaquizzEscolhido() {

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

 /*  
    if (todasRespondidas) {
        listaPerguntas.innerHTML += template;
    }
*/
}

export { buscarQuizz }

