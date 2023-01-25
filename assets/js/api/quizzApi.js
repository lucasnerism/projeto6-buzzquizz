const url = (endpoint = "") => `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${endpoint}`
const quizzMethods = {}

quizzMethods.getAllQuizz = () =>{
    return axios.get(url()).then(response => response.data)
}

quizzMethods.getQuizzById = id =>{
    return axios.get(url(id)).then(response => response.data)
}

quizzMethods.createQuizz = (template) => {
    return axios.post(url(), template)
}

export { quizzMethods }