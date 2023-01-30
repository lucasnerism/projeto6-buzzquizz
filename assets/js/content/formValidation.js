class FormValidation {
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
            
            if (campo.classList.contains("validar-obrigatorio") && !(this.validMandatory(campo, label))) {
                valid = false 
                continue
            };

            // verifica quantidade de caracteres
            if (campo.classList.contains("validar-caracteres") && !(this.validCaracter(campo, label))) valid = false;

            // verifica campo de url CASO ele exista
            if (campo.classList.contains("validar-url") && !(this.validUrl(campo))) valid = false;

            // verifica campo de hexadecimal caso ele exista
            if (campo.classList.contains("validar-hexadecimal") && !(this.validHexadecimal(campo))) valid = false;

            // Verifica a quantidade mínima dentro do input
            if (campo.classList.contains("validar-quantidade") && !(this.validAmount(campo, label))) valid = false;
    
            // Verifica se o campo passado é uma URL de imagem
            if(campo.classList.contains("validar-imagem") && !(this.validImage(campo, label))) valid = false
        }

        if (valid === false) {
            alert("Preencha os dados corretamente")
        }

        return valid
    }

    validMandatory(campo, label){
        let valid = true;
    
        if (!campo.value) {
            this.createError(campo, `Campo "${label}" não pode estar em branco.`)
            valid = false
        }
        
        return valid
    }

    validCaracter(campo, label) {
        let valid = true;
        const inputValue = campo.value
        const minValue = campo.cols
        const { minCharacter, maxCharacter } = this.characters

        if(maxCharacter === Number.MAX_VALUE) {
            if (inputValue.length < (minValue || minCharacter)) {
                this.createError(campo, `${label} precisa ter no mínimo ${minValue || minCharacter} caracteres.`)
                valid = false
            }
        }else if(inputValue.length < minCharacter || inputValue.length > maxCharacter){
            this.createError(campo, `${label} precisa ter entre ${minCharacter} e ${maxCharacter} caracteres.`)
            valid = false
        }

        return valid
    }

    validUrl(campo) {
        let valid = true
        const findUrlInStart = /^((http|https):\/\/)+[\w&.com|\/|?|=|-]+/gim
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

        if(!(findHexadecimal.test(campoValue)) || (campoValue.length > 7 || campoValue.length < 7)) {
            this.createError(campo, "Você só deve inserir valores hexadecimais")
            valid = false
        }

        return valid
    }

    validAmount(campo, label){
        let valid = true;
        const campoMinimo = campo.min
        const campoMaximo = campo.max
        
        const campoValue = Number(campo.value)
        const identifier = campo.dataset.identifier

        if(campoMinimo > campoValue){
            this.createError(campo, `${label} deve ter no mínimo ${campoMinimo} ${identifier || ""}`)
            valid = false
        }else if(campoValue < campoMinimo || campoValue > campoMaximo){
            this.createError(campo, `Este campo precisa ter um mínimo de ${campoMinimo} e um máximo de ${campoMaximo}`)
            valid = false
        }
        return valid
    }

    validImage(campo, label){
        let valid = true;
        const previousInput = campo.parentElement.querySelector(".answerText")
        let findImageInUrl = /^((http|https):\/\/)[\w|\.|\/|\-|?|=]+(\.jpg|\.jpeg|\.png|\.bmp|\.svg|\.webp)$/gm
        
        // Vai verificar se o input de imagem  e o input de campo foram inseridos corretamente
        if(previousInput && (previousInput.value && !campo.value)) {
            this.createError(campo, `${label} deve ser inserido um link de imagem válido`)
            valid = false
        }

        // Vai verificar se o input de imagem  e o input de campo foram inseridos corretamente
        if(previousInput && (!previousInput.value && campo.value)) {
            this.createError(previousInput, `Este campo deve ser inserido uma resposta válida`)
            valid = false
        }

        if(!campo.value) return valid

        if(!(findImageInUrl.test(campo.value))){
            this.createError(campo, `${label} deve ser inserido um link de imagem válido`)
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


export default FormValidation