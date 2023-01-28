import QuizzApiMethods from "../api/quizzApi.js";

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

buscarQuizz();

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

export { buscarQuizz }

