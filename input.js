// Funções de movimento
//Pela função de combinar linha estar com um problema, o jogo não estava funcionando corretamente.
const botaoVoltarInicio = document.getElementById("botao-voltar-inicio") // Corrigido o seletor

botaoVoltarInicio.addEventListener("click", () => {
    document.getElementById("game-over").classList.add("hidden") // Oculta a tela de Game Over
    document.getElementById("game-container").classList.add("hidden") // Oculta o jogo
    document.getElementById("iniciar-tela").classList.remove("hidden") // Exibe a tela inicial
});

const moverDireita = (estado) => {
    const { board, score } = estado // o estado atual do jogo
    const novoBoard = [] 
    let novoScore = score 

    for (let i = 0; i < 4; i++) {
        const linha = board.slice(i * 4, (i + 1) * 4).reverse() // pega a linha atual do tabuleiro e inverte a ordem dos números
        const { novaLinha, novaPontuacao } = combinarLinha(linha, novoScore)// combina os números da linha
        novoBoard.push(...novaLinha.reverse()) // adiciona a nova linha ao tabuleiro
        novoScore = novaPontuacao
    }

    return { board: novoBoard, score: novoScore }
}


const moverEsquerda = (estado) => {
    const { board, score } = estado
    const novoBoard = []
    let novoScore = score

    for (let i = 0; i < 4; i++) {
        const linha = board.slice(i * 4, (i + 1) * 4) 
        const { novaLinha, novaPontuacao } = combinarLinha(linha, novoScore)
        novoBoard.push(...novaLinha)
        novoScore = novaPontuacao
    }

    return { board: novoBoard, score: novoScore }
}


const moverCima = (estado) => {
    const { board, score } = estado
    const novoBoard = [...board]
    let novoScore = score

    for (let col = 0; col < 4; col++) {
        const coluna = [board[col], board[col + 4], board[col + 8], board[col + 12]]
        const { novaColuna, novaPontuacao } = combinarColuna(coluna, novoScore)

        for (let i = 0; i < 4; i++) {
            novoBoard[col + i * 4] = novaColuna[i]
        }

        novoScore = novaPontuacao
    }

    return { board: novoBoard, score: novoScore }
}


const moverBaixo = (estado) => {
    const { board, score } = estado
    const novoBoard = [...board]
    let novoScore = score

    for (let x = 0; x < 4; x++) {
        const coluna = [board[x], board[x + 4], board[x + 8], board[x + 12]].reverse() //Pega as colunas e inverte a ordem dos números
        const { novaColuna, novaPontuacao } = combinarColuna(coluna, novoScore)
        const resultado = novaColuna.reverse()

        for (let i = 0; i < 4; i++) {
            novoBoard[x + i * 4] = resultado[i]
        }

        novoScore = novaPontuacao
    }

    return { board: novoBoard, score: novoScore }
}



const combinarLinha = (linha, pontuacao) => {
    let novaLinha = linha.filter(num => num !== 0) // filtra os números diferentes de zero
    let novaPontuacao = pontuacao 

    for (let i = 0; i < novaLinha.length - 1; i++) { // um for pra percorrer a linha, combinar os iguais e somar a pontuação
        if (novaLinha[i] === novaLinha[i + 1]) {
            novaLinha[i] *= 2
            novaPontuacao += novaLinha[i]
            novaLinha[i + 1] = 0
        }
    }

    novaLinha = novaLinha.filter(num => num !== 0)
    while (novaLinha.length < 4) novaLinha.push(0)

    return { novaLinha, novaPontuacao }
}


const combinarColuna = (coluna, pontuacao) => {
    let novaColuna = coluna.filter(num => num !== 0)
    let novaPontuacao = pontuacao

    for (let i = 0; i < novaColuna.length - 1; i++) {
        if (novaColuna[i] === novaColuna[i + 1]) {
            novaColuna[i] *= 2
            novaPontuacao += novaColuna[i]
            novaColuna[i + 1] = 0
        }
    }

    novaColuna = novaColuna.filter(num => num !== 0)
    while (novaColuna.length < 4) novaColuna.push(0)

    return { novaColuna, novaPontuacao }
}



const controlarTecla = (evento, estado) => {
    const acoes = { // cada tecla tem uma função correspondente de movimento
        ArrowLeft: moverEsquerda, // Move os blocos para a esquerda
        ArrowRight: moverDireita, // Move os blocos para a direita
        ArrowUp: moverCima,       // Move os blocos para cima
        ArrowDown: moverBaixo     // Move os blocos para baixo
    }
    return acoes[evento.key] ? acoes[evento.key](estado) : estado // Se a tecla pressionada estiver em "acoes", executa a função correspondente
}


const verificarVitoria = (estado) =>
    estado.board.some(valor => valor === 2048)
        ? { ...estado, mensagem: "Você Ganhou" }  // Quando o valor final for 2048, define mensagem de vitória
        : estado
    const semMovimentosPossiveis = (board) => {
        for (let i = 0; i < 16; i++) {
            const valor = board[i]
            const direita = (i % 4 !== 3) && board[i + 1] === valor // mesmo valor à direita
            const baixo = (i < 12) && board[i + 4] === valor       // mesmo valor abaixo
            if (direita || baixo) return false
        }
        return true
        }
        
const verificarGameOver = (estado) => {
    const semZeros = !estado.board.includes(0)
    const semMovimentos = semMovimentosPossiveis(estado.board)

    if (semZeros && semMovimentos) {
        document.getElementById("game-over").classList.remove("hidden")
        return { ...estado, mensagem: "Você perdeu" }
    }

    return estado
}

        const atualizarEstado = (evento, estado) => {
            const novoEstadoBase = controlarTecla(evento, estado)
        
            // Verifica se o board mudou após o movimento
            const mudou = JSON.stringify(estado.board) !== JSON.stringify(novoEstadoBase.board)
        
            // Só adiciona número se o board mudou
            const boardFinal = mudou 
                ? adicionarNumeroAleatorio(novoEstadoBase.board) 
                : novoEstadoBase.board
        
            const novoEstado = verificarGameOver(verificarVitoria({
                ...novoEstadoBase,
                board: boardFinal
            }))
        
            if (novoEstado.mensagem) {
                clear() // para o jogo
            }
        
            return novoEstado
        }
        

const adicionarNumeroAleatorio = (board) => {
    const posicoesVazias = board
        .map((valor, indice) => (valor === 0 ? indice : null))
        .filter(indice => indice !== null) // Encontra todas as posições vazias no tabuleiro

    if (posicoesVazias.length === 0) return board // Se não houver posições vazias, retorna o tabuleiro inalterado

    const indiceAleatorio = posicoesVazias[Math.floor(Math.random() * posicoesVazias.length)]
    const novoValor = Math.random() < 0.9 ? 2 : 4 // 90% de chance de ser 2, 10% de chance de ser 4

    const novoBoard = [...board]
    novoBoard[indiceAleatorio] = novoValor // Insere o novo valor na posição aleatória

    return novoBoard
};

const inicializarJogo = () => {
    let board = Array(16).fill(0)
    board = adicionarNumeroAleatorio(board)
    board = adicionarNumeroAleatorio(board)
    
    return {board, score: 0}
}






