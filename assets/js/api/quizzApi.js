const url = (endpoint = "") => `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${endpoint}`

class QuizzApiMethods {
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

    deleteQuizz = (id, SecretKey) => {
       return axios.delete(this.url(id), {
            headers: {
                "Secret-Key": SecretKey
            }
        })
    }

    editQuizz = (id, SecretKey) =>{
        return axios.put(this.url(id), {
            headers: {
                "Secret-Key": SecretKey
            }
        })
    }
}

export default new QuizzApiMethods(url)