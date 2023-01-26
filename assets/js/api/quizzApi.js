const url = (endpoint = "") => `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${endpoint}`

class QuizzMethods {
    constructor(url) {
        this.url = url
    }
    getAllQuizz() {
        return axios.get(this.url())
            .then(response => response.data)
    }
    getQuizzById = id => {
        return axios.get(this.url(id))
            .then(response => response.data)
    }

    createQuizz = (template) => {
       return axios.post(this.url(), template)
    }
}

export default new QuizzMethods(url)