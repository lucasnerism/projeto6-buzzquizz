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

export { insertEventOnEditIcon }