import QuizzValidation from "../content/formValidation.js"

const sequencia = {
    _id:0,
    get id(){
        return this._id++
    }
}

function callQuizValidation(form, minCharacter, maxCharacter){
   return new QuizzValidation({
        form,
        characters: {minCharacter, maxCharacter} // Seta o mínimo e o máximo dos caracteres para validação
    }).validSubmit()
}

function toggleLoader(){
    const loader = document.querySelector(".loader")
    loader.classList.toggle("hide")
}

export { callQuizValidation , toggleLoader, sequencia }