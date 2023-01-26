import { renders } from "../content/render.js"
import QuizzMethods from "../api/quizzApi.js";

const quizzDB = {}

class QuizzDBManipulation{

    createQuizz = (ObjectResponse) =>{
        const ObjectDescription = {...ObjectResponse.data}
        const { id } = ObjectDescription
        quizzDB[id] = {quizz: ObjectResponse}
        this.saveQuizzes(id)
        renders.insertFinishQuizzInfo(ObjectDescription)
    }

    saveQuizzes = (id) =>{
        localStorage.setItem(`${id}`, JSON.stringify(quizzDB))
    }

    loadQuizzes = () => {
        QuizzMethods.getAllQuizz().then(renders.gerarLista)
    }

    loadUniqueQuizz = id =>{
        const quizz = JSON.parse(localStorage.getItem(`${id}`))
        if(!quizz) return
        Object.assign(quizzDB, quizz)
    }
}

export default new QuizzDBManipulation