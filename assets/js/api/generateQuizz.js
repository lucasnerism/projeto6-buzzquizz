class Templates {
	constructor() {
		this.quizzTemplate = {
			title: "Título do quizz",
			image: "https://http.cat/411.jpg",
			questions: [
				{
					title: "Título da pergunta 1",
					color: "#123456",
					answers: [
						{
							text: "Texto da resposta 1",
							image: "https://http.cat/411.jpg",
							isCorrectAnswer: true
						},
					]
				},
			],
			levels: [
				{
					title: "Título do nível 1",
					image: "https://http.cat/411.jpg",
					text: "Descrição do nível 1",
					minValue: 0
				},
			]
		}
	}

	getQuizzTemplate = () => {
		return { ...this.quizzTemplate }
	}

}


export default new Templates