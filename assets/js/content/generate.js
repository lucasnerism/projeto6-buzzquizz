class Generate {
    questions(qtdQuestion) {
        let acc = ""
        for (let i = 0; i < qtdQuestion; i++) {
            acc += `
            <article class="questions close">
                <div class="titleArea">
                    <h3 class="questionTitle">Pergunta ${i + 1}</h3>
                    <img src="../img/edit.svg" alt="" class="editIcon">
                </div>

                <div class="inputArea inputblock">
                    <label class="labelHidden">Texto da pergunta</label>
                    <input type="text" name="" placeholder="Texto da pergunta"
                        class="validar validar-obrigatorio validar-caracteres questionTitleInput${i}">

                    <label class="labelHidden">Cor de fundo da pergunta</label>
                    <input type="text" name="" placeholder="Cor de fundo da pergunta"
                        class="validar validar-obrigatorio validar-hexadecimal questionColor${i}">

                    <div class="correctAnswers answerBlock">
                        <h3 class="questionTitle">Resposta correta</h3>
                        <label class="labelHidden">Resposta Correta</label>
                        <input type="text" name="" placeholder="Resposta correta" class="validar validar-obrigatorio answerTextCorrect${i} answerText answer" data-correct="true" >

                        <label class="labelHidden">URL da imagem</label>
                        <input type="text" name="" placeholder="URL da imagem" class="validar validar-obrigatorio validar-imagem answerImageCorrect${i} answerImage answer" >
                    </div>

                    <div class="incorrectAnswers answerBlock">
                        <h3 class="questionTitle">Respostas incorretas</h3>
                        <div class="incorrectAnswerBlock">
                            <label class="labelHidden">Resposta incorreta 1</label>
                            <input type="text" name="" placeholder="Resposta incorreta 1" class="validar validar-obrigatorio answerText answer" data-correct="false">

                            <label class="labelHidden">URL da imagem1</label>
                            <input type="text" name="" placeholder="URL da imagem 1"
                                class="validar validar-obrigatorio validar-imagem answerImage answer" >
                        </div>

                        <div class="incorrectAnswerBlock">
                            <label class="labelHidden">Resposta incorreta 2</label>
                            <input type="text" name="" placeholder="Resposta incorreta 2" class="answerText answer" data-correct="false">

                            <label class="labelHidden">URL da imagem 2</label>
                            <input type="text" name="" placeholder="URL da imagem 2" class="validar validar-imagem answerImage answer">
                        </div>

                        <div class="incorrectAnswerBlock">
                            <label class="labelHidden">Resposta incorreta 3</label>
                            <input type="text" name="" placeholder="Resposta incorreta 3" class="answerText answer" data-correct="false">
                            <label class="labelHidden">URL da imagem 3</label>
                            <input type="text" name="" placeholder="URL da imagem 3" class="validar validar-imagem answerImage answer">
                        </div>

                    </div>
                </div>
            </article>

            `
        }
        return acc
    }

    levels(qtdLevel) {
        let acc = ""
        for (let i = 0; i < qtdLevel; i++) {
            acc += `
            <article class="questionOne questions close">
            <div class="titleArea">
                <h3 class="questionTitle">Nivel ${i + 1}</h3>
                <img src="../img/edit.svg" alt="" class="editIcon">
            </div>

            <div class="inputArea inputblock levelBlock">
                <label class="labelHidden">Título do nível</label>
                <input type="text" name="" placeholder="Título do nível" class="validar validar-obrigatorio validar-caracteres levelTitle" value="Texto da pergunta de templateTexto da pergunta de template">

                <label class="labelHidden">% de acerto mínima</label>
                <input type="number" min="0" max="100" name="" placeholder="% de acerto mínima"
                    class="validar validar-obrigatorio validar-quantidade minStrike" value="50">

                <label class="labelHidden">URL da imagem do nível</label>
                <input type="text" name="" placeholder="URL da imagem do nível" class="validar validar-obrigatorio validar-imagem levelImage" value ="https://www.youtube.com/">

                <label class="labelHidden">Descrição do nível</label>
                <textarea cols="30" rows="10" style="resize:none; width:100%;"
                    placeholder="Descrição do nível" class="validar validar-obrigatorio validar-caracteres levelDesc" >Texto da pergunta de templateTexto da pergunta de template</textarea>

            </div>
        </article>
            `
        }
        return acc
    }
}

export default new Generate