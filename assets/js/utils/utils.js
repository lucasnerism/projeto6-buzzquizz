import QuizzValidation from "../content/formValidation.js"

function callQuizValidation(form, minCharacter, maxCharacter){
   return new QuizzValidation({
        form,
        characters: {minCharacter, maxCharacter} // Seta o mínimo e o máximo dos caracteres para validação
    }).validSubmit()
}

export { callQuizValidation }