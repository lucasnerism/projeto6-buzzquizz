import { callQuizValidation } from "../utils/utils.js"

// addQuiz.html formValidation
class StartEvents {
    constructor() {
        this.quizzBtn = document.querySelector("#quizzBtn")
        this.quizzForm = document.getElementById("quizzForm")

        this.questionsBtn = document.getElementById("questionsFormBtn");
        this.questionForm = document.getElementById("questionForm");

        this.editIcons = document.querySelectorAll(".editIcon")
    }

    listenerEvent() {
        this.quizzBtn.addEventListener("click", _ => {
            const formIsValid = callQuizValidation(this.quizzForm, 20, 65)
        })

        this.questionsBtn.addEventListener("click", _ => {
            const formIsValid = callQuizValidation(this.questionForm, 20, Number.MAX_VALUE)
        })

        this.editIcons.forEach(editIcon => {
            editIcon.addEventListener("click", e => {
                const divClicked = e.currentTarget.parentElement;
                const article = divClicked.parentElement;
                const questions = document.querySelectorAll(".questions");

                for(let question of questions){
                    question.classList.add("close")
                }
                if(article.classList.contains("close")){
                    article.classList.remove("close")
                }
            })
        })

    }

}


export default new StartEvents
