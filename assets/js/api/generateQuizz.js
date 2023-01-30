class Templates {
	constructor() {
		this.quizzTemplate = {
			title: "",
			image: "",
			questions: [
				{
					title: "",
					color: "",
					answers: [
						{
							text: "",
							image: "",
							isCorrectAnswer: true
						},
					]
				},
			],
			levels: [
				{
					title: "",
					image: "",
					text: "",
					minValue: 0
				},
			]
		}
	}
}


export default new Templates