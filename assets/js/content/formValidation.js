class QuizzValidation {
    constructor(form, callback) {
        this.form = form
        this.callback = callback
        this.events()
    }

    events() {
        this.validSubmit()
    }

    validSubmit() {
        const validFields = this.isValidField()

        if (validFields){
            this.isValid = true
        }else{
            this.isValid = false
        }
        
    }

    isValidField() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll(".errorText")) {
            errorText.remove()
        }

        for (let campo of this.form.querySelectorAll(".validar")) {
            const label = campo.previousElementSibling.innerText

            if (!campo.value) {
                this.createError(campo, `Campo "${label}" não pode estar em branco.`)
                valid = false
                continue;
            }
            
            if (campo.classList.contains("titleQuizz") && !(this.validTitle(campo))) valid = false;
            if (campo.classList.contains("urlQuizz") && !(this.validUrl(campo))) valid = false;
        
        }
        if(valid === false){
            alert("Preencha os dados corretamente")
        }

        return valid
    }

    validTitle(campo) {
        let valid = true;
        const inputValue = campo.value

        if ((inputValue.length < 20 || inputValue.length > 65)) {
            this.createError(campo, "Título precisa ter entre 20 e 65 caracteres.")
            valid = false
        }

        return valid
    }

    validUrl(campo) {
        let valid = true
        const findUrlInStart = /^(http(s):\/\/)+[\w&.com|\/|?|=|-]+/gim
        if(!(findUrlInStart.test(campo.value))) {
            this.createError(campo, "Você deve inserir um link válido")
            valid = false
        }

        return valid
    }

    createError(campo, msg) {
        const div = document.createElement("div");
        div.innerText = msg;
        div.classList.add("errorText");
        campo.insertAdjacentElement("afterend", div);
    }

}


export default QuizzValidation