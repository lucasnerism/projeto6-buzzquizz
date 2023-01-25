import QuizzMethods from "./api/quizzApi.js";

QuizzMethods.getQuizzById(17861).then(response => console.log(response))