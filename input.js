const moverDireita = (estado) => {   //constante para atualizar o estado do jogo quando precisonar para direita
    const {board, score} = estado
    const novoBoard = []

    for (let i = 0; i < 4; i++) {    //for para percorrer todas as linhas do tabuleiro, não encontrei forma de fazer de outro jeito, e nem temos tempo
        const linha = board.slice(i * 4,(i + 1) * 4) // pega uma das linhas da matriz(tabuleiro)
        const filtrada = linha.filter((num) => num !== 0) //Cria uma nova matriz tirando os zeros
        const preenchida = Array(4 - filtrada.length).fill(0).concat(filtrada)//cria uma nova matriz adicionando o 0 na esquerda, já que movemos tudo pra direita
        novoBoard.push(...preenchida) //spread para copiar array e adiciona o tabuleiro novo
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
        const preenchida = filtrada.concat(Array(4 - filtrada.length).fill(0))
        const {novaLinha, novaPontuacao} = combinarLinha(preenchida, novoScore)
        novoBoard.push(...novaLinha)
        novoScore = novaPontuacao
    }

    return{board: novoBoard, score: novoScore}
}