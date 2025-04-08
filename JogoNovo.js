let estado = { board: [], score: 0 }

document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid")
    const scoreDisplay = document.querySelector("#score")
    const resultDisplay = document.querySelector("#result")
    const width = 4
    const squares = []

    const inicializarJogo = () => {
        const board = Array(width * width).fill(0)
        // Adiciona duas peças iniciais (2's)
        let count = 0
        while (count < 2) {
            const randomIndex = Math.floor(Math.random() * board.length)
            if (board[randomIndex] === 0) {
                board[randomIndex] = 2
                count++
            }
        }
        return { board, score: 0 }
    }
    const generate = () => {
        const emptyCells = []
        estado.board.forEach((cell, index) => {
            if (cell === 0) emptyCells.push(index)
        })

        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            const newBoard = [...estado.board]
            newBoard[randomIndex] = 2
            estado.board = newBoard
        }
    }

    const createBoard = (i = 0) => {    
        if (i >= width * width) {
            generate()
            generate()
            return
        }
    
        const square = document.createElement("div")
        square.innerHTML = " "        
        gridDisplay.appendChild(square) 
        squares.push(square)     
        createBoard(i + 1)
    }

    const atualizarDOM = () => {
        squares.forEach((square, index) => {
            const value = estado.board[index]
            square.innerHTML = value === 0 ? " " : value  
            square.className = `tile-${value}` 
        })
        scoreDisplay.innerHTML = estado.score
    }

const verificarGameOver = () => {
    if (estado.board.some(cell => cell === 0)) return false
    for (let linha = 0; linha < width; linha++) { // Alterado row para linha
        for (let col = 0; col < width - 1; col++) {
            const idx = linha * width + col // Ajustado para linha
            if (estado.board[idx] === estado.board[idx + 1]) return false
        }
    }
    
    for (let col = 0; col < width; col++) {
        for (let linha = 0; linha < width - 1; linha++) { 
            const idx = linha * width + col 
            if (estado.board[idx] === estado.board[idx + width]) return false
        }
    }
    
    return true
}

const moverEsquerda = () => {
    const newBoard = []
    let totalScore = 0
    
    for (let linha = 0; linha < width; linha++) { 
        const linhaAtual = estado.board.slice(linha * width, (linha + 1) * width) 
        const resultado = moverLinha(linhaAtual)
        newBoard.push(...resultado.linha)
        totalScore += resultado.score
    }
    
    return { newBoard, totalScore }
}

const moverDireita = () => {
    const newBoard = []
    let totalScore = 0
    
    for (let linha = 0; linha < width; linha++) { 
        const linhaAtual = estado.board.slice(linha * width, (linha + 1) * width).reverse() 
        const resultado = moverLinha(linhaAtual)
        newBoard.push(...resultado.linha.reverse())
        totalScore += resultado.score
    }
    
    return { newBoard, totalScore }
}

const moverCima = () => {
    const newBoard = Array(width * width).fill(0)
    let totalScore = 0
    
    for (let col = 0; col < width; col++) {
        const coluna = []
        for (let linha = 0; linha < width; linha++) { 
            coluna.push(estado.board[linha * width + col]) 
        }
        
        const resultado = moverLinha(coluna)
        resultado.linha.forEach((value, linha) => { 
            newBoard[linha * width + col] = value 
        })
        
        totalScore += resultado.score
    }
    
    return { newBoard, totalScore }
}

const moverBaixo = () => {
    const newBoard = Array(width * width).fill(0)
    let totalScore = 0
    
    for (let col = 0; col < width; col++) {
        const coluna = []
        for (let linha = 0; linha < width; linha++) {
            coluna.push(estado.board[linha * width + col]) 
        }
        
        const resultado = moverLinha(coluna.reverse())
        resultado.linha.reverse().forEach((value, linha) => { 
            newBoard[linha * width + col] = value 
        })
        
        totalScore += resultado.score
    }
    
    return { newBoard, totalScore }
}
    const atualizarEstado = (evento) => {
        let movimento = null
        switch(evento.key) {
            case 'ArrowLeft':
                movimento = moverEsquerda()
                break
            case 'ArrowRight':
                movimento = moverDireita()
                break
            case 'ArrowUp':
                movimento = moverCima()
                break
            case 'ArrowDown':
                movimento = moverBaixo()
                break
            default:
                return estado
        }
        
        if (movimento.newBoard.join(',') !== estado.board.join(',')) {
            estado.board = movimento.newBoard
            estado.score += movimento.totalScore
            generate()
        }
        
        return estado
    }

    createBoard()
    estado = inicializarJogo()
    atualizarDOM()

    document.addEventListener("keydown", (evento) => {
        if (verificarGameOver()) {
            resultDisplay.innerHTML = "Você Perdeu!"
            return
        }
        
        const novoEstado = atualizarEstado(evento)
        if (novoEstado !== estado) {
            estado = novoEstado
            atualizarDOM()
        }
    })
})
