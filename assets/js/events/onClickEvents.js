import { renders } from "../content/render.js";

function insertEventOnEditIcon() {
    const editIcons = document.querySelectorAll(".editIcon");
    editIcons.forEach(editIcon => editIcon.onclick = eventOnEditIcon)
}

function eventOnEditIcon(event){
    const divClicked = event.currentTarget.parentElement;
    const article = divClicked.parentElement;

    const questions = document.querySelectorAll(".questions");

    for (let question of questions) {
        question.classList.add("close")
    }
    if (article.classList.contains("close")) {
        article.classList.remove("close")
    }
}

function eventOnCreateQuizzButton(event){
    const target = event.target
    renders.changeModal(target)
}

function insertEventOnCreateQuizzButton(){
    const createQuizzBtn = document.querySelector(".createQuizzBtn")
    createQuizzBtn.onclick = eventOnCreateQuizzButton
}

export { insertEventOnEditIcon , insertEventOnCreateQuizzButton}