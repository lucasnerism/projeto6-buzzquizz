import StartEvents from "./events/listenerEvents.js";
import QuizzDBManipulation from "./db/quizzes.js"
// Inicia os eventos do arquivo listenerEvents.js
// PS: Lembrem-se de utilizar os eventos addEventListener apenas nesse arquivo listenerEvents.js

QuizzDBManipulation.loadQuizzes()
StartEvents.listenerEvent()

// localStorage.setItem('17890', '17890');
// localStorage.setItem('17888', '17888');
// localStorage.setItem('17887', '17887');


//usei essas abaixo pra testar se gerava as listas dos quizz do usuario


//usa esse de baixo pra limpar o storage
//localStorage.clear();
// QuizzValidation.camposSaoValidos()



