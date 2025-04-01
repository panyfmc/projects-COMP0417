const moverDireita = (estado) => {   //constante para atualizar o estado do jogo quando precisonar para direita
    const {board, score} = estado
    const novoBoard = []
    let novoScore = score //novo score pra atualizar o score, adicionando a funcção de combinar os valores iguais
    for (let i = 0; i < 4; i++) {    //for para percorrer todas as linhas do tabuleiro, não encontrei forma de fazer de outro jeito, e nem temos tempo
        const linha = board.slice(i * 4,(i + 1) * 4) // pega uma das linhas da matriz(tabuleiro)
        const filtrada = linha.filter((num) => num !== 0) //Cria uma nova matriz tirando os zeros
        const preenchida = Array(4 - filtrada.length).fill(0).concat(filtrada)//cria uma nova matriz adicionando o 0 na esquerda, já que movemos tudo pra direita
        const {novaLinha, novaPontuacao} = combinarLinha(preenchida, novoScore)
        novoBoard.push(...novaLinha) //spread para copiar array e adiciona o tabuleiro novo
        novoScore = novaPontuacao
    }

    return {board: novoBoard, score : novoScore}
}

const moverEsquedra = (estado) =>{
    const {board, score} = estado
    const novoBoard = []
    let novoScore = score

    for (let i = 0; i<4;i++){
        const linha = board.slice(i*4,(i+1)*4)
        const filtrada = linha.filter((num)=>num !== 0 )
        const preenchida = filtrada.concat(Array(4 - filtrada.length).fill(0)) //agora adicionamos o zero no fim da array
        const {novaLinha, novaPontuacao} = combinarLinha(preenchida, novoScore)
        novoBoard.push(...novaLinha)
        novoScore = novaPontuacao
    }

    return{board: novoBoard, score: novoScore}
}

const moverCima = (estado)=>{
    const novoBoard = [...board]
    let novoScore = score
    for (let coluna = 0; coluna < 4; coluna++) {
        const {board,score} = estado
        // Pega os valores das colunas e cria um array pra facilitar a remoção dos zeros
        const colValores = [board[coluna], board[coluna + 4], board[coluna + 8], board[coluna + 12]]
        const filtrada = colValores.filter(num => num !== 0)// remove os zeros 
        const preenchida = filtrada.concat(Array(4 - filtrada.length).fill(0))// Preenche com zeros no final
        const {novaColuna, novaPontuacao} = combinarColuna(preenchida, 4, novoScore) //combina os valores 4 é o tamanho do tab
        for (let i = 0; i < 4; i++) { //for para atualizar os valores
                novoBoard[coluna + i * 4] = novaColuna[i]
            }
            novoScore = novaPontuacao
    }
    
    return { board: novoBoard, score: novoScore }
}    
//mesma ideia de mover pra cima porem o zero é preenchido no inicio dando impressão de movimento pra baixo
const moverBaixo = (estado)=>{
    const novoBoard = [...board]
    let novoScore = score
    for(let coluna = 0; coluna< 4; coluna++){
        const{board,score} = estado
        const colValores = [board[coluna], board[coluna +4],board[coluna + 8], board[coluna + 12]]
        const filtrada = colValores.filter(num => num !== 0)
        const preenchida = filtrada.fill(0)(Array(4 - filtrada.length).fill(0).concat(filtrada)) //preenche com zero no inicio
        const {novaColuna , novaPontuacao} = combinarColuna(preenchida,4,novoScore)
        for (let x = 0; x<4;x++){
            novoBoard[coluna + x *4] = novaColuna[x]
        }
        novoScore = novaPontuacao
    }
    return {board: novoBoard, score:novoScore}
}




const combinarLinha = (quadrados, pontuacao) => {
    return quadrados.reduce(({ novaLinha, novaPontuacao }, valor, indice, array) => {    // Usa o método reduce para processar o array de quadrados
        if (indice < 15 && valor === array[indice + 1]) { // Verifica se o índice está dentro do limite da linha e se os valores consecutivos são iguais
            return {
                novaLinha: [...novaLinha.slice(0, indice), valor * 2, 0, ...novaLinha.slice(indice + 2)],   // Cria uma nova linha combinando os valores e substituindo o segundo valor por 0
                novaPontuacao: novaPontuacao + valor * 2 // Atualiza a pontuação somando o novo valor combinado
            };
        }
        return { novaLinha, novaPontuacao };  // Se não houver combinação, mantém a linha e a pontuação sem alterações
    }, { 
        // Inicializa o acumulador com a cópia do array original e a pontuação fornecida
        novaLinha: [...quadrados], 
        novaPontuacao: pontuacao 
    });
};

const combinarColuna = (quadrados, largura, pontuacao) => {
    return quadrados.reduce(({ novaColuna, novaPontuacao }, valor, indice, array) => {  // Usa reduce para processar o array de quadrados na vertical
        if (indice < 12 && valor === array[indice + largura]) { // Verifica se o índice está dentro do limite da coluna e se os valores na mesma coluna são iguais
            return {
                novaColuna: [...novaColuna.slice(0, indice), valor * 2, 0, ...novaColuna.slice(indice + largura + 1)], // Cria uma nova coluna combinando os valores e substituindo o valor abaixo por 0
                novaPontuacao: novaPontuacao + valor * 2  // Atualiza a pontuação somando o novo valor combinado
            };
        }
        return { novaColuna, novaPontuacao };   // Se não houver combinação, mantém a coluna e a pontuação sem alterações.
    }, { 
        // Inicializa o objeto acumulador com a cópia do array original e a pontuação fornecida
        novaColuna: [...quadrados], 
        novaPontuacao: pontuacao 
    });
};

