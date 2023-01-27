const url = (endpoint = "") => `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${endpoint}`

class QuizzApiMethods {
    constructor(url) {
        this.url = url
    }
    getAllQuizz = async () => {
        const res = await axios.get(this.url())
        return res.data
    }
    getQuizzById = async id => {
        const res = await axios.get(this.url(id))
        return res.data
    }

    createQuizz = async (template) => {
        const res = await axios.post(this.url(), template)
        return res.data
    }

    deleteQuizz = async (id, SecretKey) => {
        const res = await axios.delete(this.url(id), template, {
            headers: {
                "Secret-Key": SecretKey
            }
        })
        return res
    }

    editQuizz = async (id, SecretKey, template) => {
        const res = await axios.put(this.url(id), template, {
            headers: {
                "Secret-Key": SecretKey
            }
        })
        return res
    }
}

export default new QuizzApiMethods(url)