// Funções de movimento

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


const moverEsquerda = (estado) =>{
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
    const{board,score} = estado
    const novoBoard = [...board]
    let novoScore = score
    for (let coluna = 0; coluna < 4; coluna++) {
        //const {board,score} = estado
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
    
    return {board: novoBoard, score: novoScore}
}    


const moverBaixo = (estado)=>{
    const {board,score} = estado
    const novoBoard = [...board]
    let novoScore = score
    for(let coluna = 0; coluna< 4; coluna++){
        const{board,score} = estado
        const colValores = [board[coluna], board[coluna +4],board[coluna + 8], board[coluna + 12]]
        const filtrada = colValores.filter(num => num !== 0)
        const preenchida = Array(4 - filtrada.length).fill(0).concat(filtrada) //preenche com zero no inicio
        const invertida = preenchida.reverse() //  inverte antes de combinar
        const {novaColuna , novaPontuacao} = combinarColuna(preenchida,4,novoScore)
        const resultado = novaColuna.reverse() //  volta à ordem original

        for (let x = 0; x<4;x++){
            novoBoard[coluna + x *4] = novaColuna[x]
        }
        novoScore = novaPontuacao
    }
    return {board: novoBoard, score:novoScore}
}


const combinarLinha = (quadrados, pontuacao) => {
    let novaLinha = [...quadrados]
    let novaPontuacao = pontuacao

    for (let i = 3; i > 0; i--) { // Itera da direita para a esquerda
        if (novaLinha[i] !== 0 && novaLinha[i] === novaLinha[i - 1]) {
            novaLinha[i] *= 2 // Combina os valores
            novaLinha[i - 1] = 0 // Zera o valor combinado
            novaPontuacao += novaLinha[i] // Atualiza a pontuação
        }
    }

    // Remove os zeros e preenche com zeros à esquerda
    novaLinha = Array(4 - novaLinha.filter(num => num !== 0).length).fill(0).concat(novaLinha.filter(num => num !== 0))

    return { novaLinha, novaPontuacao }
}

const combinarColuna = (quadrados, largura, pontuacao) => {
    let novaColuna = [...quadrados]
    let novaPontuacao = pontuacao

    for (let i = largura - 1; i > 0; i--) { // Itera de baixo para cima
        if (novaColuna[i] !== 0 && novaColuna[i] === novaColuna[i - 1]) {
            novaColuna[i] *= 2 // Combina os valores
            novaColuna[i - 1] = 0 // Zera o valor combinado
            novaPontuacao += novaColuna[i] // Atualiza a pontuação
        }
    }

    // Remove os zeros e preenche com zeros no topo
    novaColuna = novaColuna.filter(num => num !== 0).concat(Array(4 - novaColuna.filter(num => num !== 0).length).fill(0))

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


// document.addEventListener("keydown", (evento) => { 
//     estado = atualizarEstado(evento, estado) // Atualiza o estado do jogo com base na tecla pressionada.
// })

const verificarVitoria = (estado) =>
    estado.board.some(valor => valor === 2048)
        ? { ...estado, mensagem: "Você Ganhou" }  // Quando o valor final for 2048, define mensagem de vitória
        : estado

const verificarGameOver = (estado) =>
    estado.board.includes(0)
        ? estado  // Se ainda houver zeros, o jogo continua, ou seja, se houver espaços vazios.
        : { ...estado, mensagem: "Você Perdeu!" }  // Se não houver espaços vazios, ou zero, o jogador perdeu


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
    
    return { board, score: 0 }
}





