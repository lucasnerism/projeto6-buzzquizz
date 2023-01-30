import { renders } from "../content/render.js";
import QuizzDBManipulation from "../db/quizzes.js"
import { clearInput, toggleModal, togglePage, toggleLoader} from "../utils/utils.js";
import QuizzApiMethods from "../api/quizzApi.js"
import Templates from "../api/generateQuizz.js"


// Evento no modal
function closeModal() {
    if (this.classList.contains("confirm-modal")) {
        const id = this.id.split("-")[1]
        const ObjectStructure = QuizzDBManipulation.loadUniqueQuizz(id).quizz
        const key = ObjectStructure.key
        QuizzApiMethods.deleteQuizz(id, key).then(() => {
            toggleModal()
            togglePage()
            toggleLoader()
            QuizzDBManipulation.deleteQuizz(id)
            setTimeout(() =>{
                location.reload()
            }, 600)
        })
        .catch(() => {
            location.reload()
        })
    } else {
        toggleModal()
    }
}

function insertEventOnModal() {
    const closeButtons = document.querySelectorAll(".closeModal")
    closeButtons.forEach(button => button.onclick = closeModal)
}

// Evento nos botões de editar das perguntas

function insertEventOnEditIcon() {
    const editIcons = document.querySelectorAll(".editIcon");
    editIcons.forEach(editIcon => editIcon.onclick = eventOnEditIcon)
}
function eventOnEditIcon(event) {
    const divClicked = event.currentTarget.parentElement;
    const article = divClicked.parentElement;

    const questions = article.parentElement.querySelectorAll(".questions");

    for (let question of questions) {
        question.classList.add("close")
    }
    if (article.classList.contains("close")) {
        article.classList.remove("close")
    }
}

// Evento nos botões de criar novo quizz

function insertEventOnCreateQuizzButton() {
    const createQuizzBtn = document.querySelectorAll(".createQuizzBtn")
    createQuizzBtn.forEach(btn => btn.onclick = eventOnCreateQuizzButton)
}

function eventOnCreateQuizzButton(event) {
    clearInput()
    const questionForm = document.getElementById("questionForm")
    questionForm.classList.remove("EditionMode")
    const target = event.currentTarget
    renders.changeModal(target)
}

// Evento no botão de editar e deletar dos quizzes

function insertEventOnCrudButton() {
    const crudButtons = document.querySelectorAll(".crudButton")
    crudButtons.forEach(button => button.onclick = eventOnCrudButton)
}
function eventOnCrudButton(event) {
    event.stopPropagation()
    const id = this.id.split("-")[1]
    const ObjectStructure = QuizzDBManipulation.loadUniqueQuizz(id).quizz
    const key = ObjectStructure.key
    insertEventOnModal()

    if (this.classList.contains("editYourQuizz")) {
        const forms = document.querySelectorAll(".createQuizzPage form")
        const finishBtn = document.getElementById("levelsBtn")
        forms.forEach(form => form.classList.add("EditMode"))
        renders.changeModal(this)
        insertInputsInfo(ObjectStructure)

        finishBtn.addEventListener("click", _ => {
            if (forms[0].classList.contains("EditMode")) {
                QuizzApiMethods.editQuizz(id, key, Templates.quizzTemplate)
                    .then(QuizzDBManipulation.createQuizz)
                    .then(() => renders.changeFormModal(finishBtn, true))
            }
        })
    }

    if (this.classList.contains("deleteYourQuizz")) {
        const sureModal = document.querySelector(".confirm-modal")
        sureModal.id = `delete-${id}`
        toggleModal()
    }
}

function insertInputsInfo(ObjectStructure) {
    insertQuizzPageInfo(ObjectStructure)
}

function insertQuizzPageInfo(ObjectStructure) {
    const quizzForm = document.getElementById("quizzForm")
    const quizzBtn = document.querySelector("#quizzBtn")

    const questionsQtd = quizzForm.querySelector("#qtdPerguntas");
    const levelQtd = quizzForm.querySelector("#qtdNiveis");
    const quizzTitle = quizzForm.querySelector("#quizzTitle");
    const quizzImage = quizzForm.querySelector("#quizzImage");

    quizzTitle.value = ObjectStructure.title
    quizzImage.value = ObjectStructure.image
    questionsQtd.value = ObjectStructure.questions.length
    levelQtd.value = ObjectStructure.levels.length

    quizzBtn.addEventListener("click", () => {
        if (quizzForm.classList.contains("EditMode")) {
            insertQuestionPageInfo(ObjectStructure, questionsQtd, levelQtd)
        }
    })
}

function insertQuestionPageInfo(ObjectStructure, questionsQtd, levelQtd) {
    const questionForm = document.getElementById("questionForm")
    renders.insertQuestionsOnHtml(questionsQtd.value, questionForm)

    const questionsHTML = questionForm.querySelectorAll(".questions")
    const questionsHTMLToArray = Array.from(questionsHTML)

    const answers = {}
    const { questions: questionsOBJ } = ObjectStructure

    questionsOBJ.forEach((question, indice) => {
        const title = questionForm.querySelector(`.questionTitleInput${indice}`)
        const color = questionForm.querySelector(`.questionColor${indice}`)
        try {
            title.value = question.title,
            color.value = question.color

            answers[indice] = [...question.answers]
        }
        catch (error) {
            return error
        }
    })

    for (let question in questionsHTMLToArray) {
        questionsHTMLToArray[question].querySelectorAll(".answerBlock").forEach((answer, indice) => {
            const text = answer.querySelector(".answerText")
            const image = answer.querySelector(".answerImage")

            try {
                if (indice <= questionsHTMLToArray.length) {
                    text.value = answers[question][indice]?.text ?? ""
                    image.value = answers[question][indice]?.image ?? ""
                }
            } catch (error) {
                return error
            }
        })
    }

    insertLevelPageInfo(ObjectStructure, levelQtd)
}

function insertLevelPageInfo(ObjectStructure, levelQtd) {
    const levelsForm = document.getElementById("levelsForm");
    const levels = [...ObjectStructure.levels]

    renders.insertLevelsOnHtml(levelQtd.value, levelsForm);

    const questionsHTML = levelsForm.querySelectorAll(".questions")
    const questionsToArray = Array.from(questionsHTML)

    for (let question in questionsToArray) {
        questionsToArray[question].querySelectorAll(".levelBlock").forEach(answer => {
            const title = answer.querySelector(".levelTitle")
            const minValue = answer.querySelector(".minStrike")
            const levelImage = answer.querySelector(".levelImage")
            const levelDesc = answer.querySelector(".levelDesc")

            try {
                title.value = levels[question].title
                minValue.value = levels[question].minValue
                levelImage.value = levels[question].image
                levelDesc.value = levels[question].text
            } catch (e) {
                return e
            }
        })
    }

}

export { insertEventOnEditIcon, insertEventOnCreateQuizzButton, insertEventOnCrudButton }