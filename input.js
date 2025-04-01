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

    return { board: novoBoard, score }
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

const combinarLinha = (quadrados, pontuacao) => {
    // Usa o método reduce para processar o array de quadrados
    return quadrados.reduce(({ novaLinha, novaPontuacao }, valor, indice, array) => {
        // Verifica se o índice está dentro do limite da linha e se os valores consecutivos são iguais
        if (indice < 15 && valor === array[indice + 1]) {
            return {
                // Cria uma nova linha combinando os valores e substituindo o segundo valor por 0
                novaLinha: [...novaLinha.slice(0, indice), valor * 2, 0, ...novaLinha.slice(indice + 2)],
                // Atualiza a pontuação somando o novo valor combinado
                novaPontuacao: novaPontuacao + valor * 2
            };
        }
        // Se não houver combinação, mantém a linha e a pontuação sem alterações
        return { novaLinha, novaPontuacao };
    }, { 
        // Inicializa o acumulador com a cópia do array original e a pontuação fornecida
        novaLinha: [...quadrados], 
        novaPontuacao: pontuacao 
    });
};

