import QuizzValidation from "../content/formValidation.js"

// addQuiz.html formValidation
class StartEvents {
    constructor(){
        this.button = document.querySelector("#formBtn")
        this.form = document.getElementById("quizzForm")
    }

    listenerEvent(){
        this.button.addEventListener("click", _ => {
            const quizzForm = new QuizzValidation(this.form)
            console.log(quizzForm.isValid)
        })
    }
}

function falaOiParaOConsole(){
    console.log("Oi")
}

export default new StartEvents
