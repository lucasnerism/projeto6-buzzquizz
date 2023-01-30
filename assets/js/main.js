import StartEvents from "./events/listenerEvents.js";
import QuizzDBManipulation from "./db/quizzes.js"
// Inicia os eventos do arquivo listenerEvents.js
// PS: Lembrem-se de utilizar os eventos addEventListener apenas nesse arquivo listenerEvents.js

QuizzDBManipulation.loadQuizzes()
StartEvents.listenerEvent()


