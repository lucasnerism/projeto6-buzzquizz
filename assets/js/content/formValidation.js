class QuizzValidation {
    constructor({form, characters }) {
        this.form = form
        this.characters = characters
    }

    validSubmit() {
        const validFields = this.isValidField()

        if (validFields) {
            return true
        } else {
            return false
        }
    }

    isValidField() {
        let valid = true;

        for (let errorText of this.form.querySelectorAll(".errorText")) {
            errorText?.remove()
            this.form.querySelector(".inputError").classList.remove("inputError")
        }

        for (let campo of this.form.querySelectorAll(".validar")) {
            const label = campo.previousElementSibling.innerText

            //Verifica se o valor não está em branco
            if (!campo.value) {
                this.createError(campo, `Campo "${label}" não pode estar em branco.`)
                valid = false
                continue
            }

            // verifica quantidade de caracteres
            if (campo.classList.contains("validar-caracteres") && !(this.validTitle(campo))) valid = false;

            // verifica campo de url CASO ele exista
            if (campo.classList.contains("validar-url") && !(this.validUrl(campo))) valid = false;

            // verifica campo de hexadecimal caso ele exista
            if (campo.classList.contains("validar-hexadecimal") && !(this.validHexadecimal(campo))) valid = false;

            // Verifica a quantidade mínima dentro do input
            if (campo.classList.contains("validar-quantidade") && !(this.validAmount(campo))) valid = false;
    
        }

        if (valid === false) {
            alert("Preencha os dados corretamente")
        }

        return valid
    }

    validTitle(campo) {
        let valid = true;
        const inputValue = campo.value
        const { minCharacter, maxCharacter } = this.characters

        if(maxCharacter === Number.MAX_VALUE) {
            if (inputValue.length < minCharacter) {
                this.createError(campo, `Título precisa ter no mínimo ${minCharacter} caracteres.`)
                valid = false
            }
        }else if(inputValue.length < minCharacter || inputValue.length > maxCharacter){
            this.createError(campo, `Título precisa ter entre ${minCharacter} e ${maxCharacter} caracteres.`)
            valid = false
        }

        return valid
    }

    validUrl(campo) {
        let valid = true
        const findUrlInStart = /^(http(s):\/\/)+[\w&.com|\/|?|=|-]+/gim
        if (!(findUrlInStart.test(campo.value))) {
            this.createError(campo, "Você deve inserir um link válido")
            valid = false
        }

        return valid
    }

    validHexadecimal(campo){
        let valid = true;
        const campoValue = campo.value;
        const findHexadecimal = /^(#[0-9a-f]+)/gim

        if(!(findHexadecimal.test(campoValue)) || campoValue.length > 7) {
            this.createError(campo, "Você só deve inserir valores hexadecimais")
            valid = false
        }

        return valid
    }

    validAmount(campo){
        let valid = true;
        const campoMinimo = campo.min
        const campoValue = Number(campo.value)
        const identifier = campo.dataset.identifier

        if(campoMinimo > campoValue){
            this.createError(campo, `O quizz deve ter no mínimo ${campoMinimo} ${identifier}`)
            valid = false
        }
        return valid
    }

    createError(campo, msg) {
        const div = document.createElement("div");
        div.innerText = msg;
        div.classList.add("errorText");
        campo.classList.add("inputError")
        campo.insertAdjacentElement("afterend", div);
    }

}


export default QuizzValidation