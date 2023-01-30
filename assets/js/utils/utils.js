import FormValidation from "../content/formValidation.js"

function callQuizValidation(form, minCharacter, maxCharacter){
   return new FormValidation({
        form,
        characters: {minCharacter, maxCharacter} // Seta o mínimo e o máximo dos caracteres para validação
    }).validSubmit()
}

function toggleLoader(){
    const loader = document.querySelector(".loader")
    loader.classList.toggle("hide")
}

function togglePage(){
    const toggleInfo = document.querySelector(".toggleInfo")
    toggleInfo.classList.toggle("hide")
}

function toggleModal(){
    const modal = document.querySelector(".sureModal");
    const overlay = document.querySelector(".overlay");
    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")
    document.body.classList.toggle("overflow")
}

function repeatParentElement(element, iteration){
    let newElement = element
    for(let i = 0; i < iteration; i++){
        newElement = newElement.parentElement
    }

    return newElement
}

function stringToBoolean(str)
{
    switch (str.toLowerCase())
    {
        case "true":
            return true;
 
        case "false":
            return false;
 
        default:
            return undefined;
    }
}

function clearInput(){
    document.querySelectorAll("input").forEach(input => input.value = "")
    document.querySelectorAll("form").forEach(form => form.classList.remove("EditMode"))
}

export { callQuizValidation , toggleLoader, togglePage, toggleModal, repeatParentElement , stringToBoolean, clearInput }