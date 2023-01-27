import { renders } from "../content/render.js"
import QuizzApiMethods from "../api/quizzApi.js";
import { toggleLoader , togglePage } from "../utils/utils.js";

const quizzDB = {}

class QuizzDBManipulation{

    createQuizz = (ObjectResponse) =>{
        const ObjectDescription = {...ObjectResponse.data}
        const { id } = ObjectDescription
        quizzDB[id] = {quizz: ObjectDescription}
        this.saveQuizz(id)
        renders.insertFinishQuizzInfo(ObjectDescription)
    }

    saveQuizz = (id) =>{
        localStorage.setItem(`${id}`, JSON.stringify(quizzDB))
    }

    loadQuizzes = () => {
        // togglePage()
        // toggleLoader()
        QuizzApiMethods.getAllQuizz().then(renders.gerarLista)
            // .then(() => {
            //     togglePage()
            //     toggleLoader() 
            // })
    }

    loadUniqueQuizz = id =>{
        const quizz = JSON.parse(localStorage.getItem(`${id}`))
        if(!quizz) return
        Object.assign(quizzDB, quizz)
        return quizzDB[id]
    }
}

export default new QuizzDBManipulation