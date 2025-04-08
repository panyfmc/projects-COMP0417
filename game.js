let estado = { board: [], score: 0 } // Inicializa o estado com um tabuleiro vazio e pontuação 0.

document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid")     // o contêiner do tabuleiro do jogo.
    const scoreDisplay = document.querySelector("#score")   // onde o placar será exibido
    const resultDisplay = document.querySelector("#result") // mensagens como "You WIN!" ou "You LOSE!" serão exibidas.
    const width = 4     // largura do tabuleiro (4x4).
    const squares = []  // as células do tabuleiro.

    const generate = () => {
        const emptySquares = squares.filter(square => square.innerHTML == 0)
        if (emptySquares.length === 0) {
            const novoEstado = verificarGameOver(estado)
            if (novoEstado.mensagem) {
                resultDisplay.innerHTML = novoEstado.mensagem
                clear()
            }
            return
        }
    
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
        randomSquare.innerHTML = 2
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


    createBoard() 

    // Inicializa o estado do jogo com dois números aleatórios no tabuleiro.
    estado.board = squares.map(square => parseInt(square.innerHTML))
    estado = inicializarJogo()

    document.addEventListener("keydown", (evento) => {
        const novoEstado = atualizarEstado(evento, estado) // Atualiza o estado do jogo com base na tecla pressionada
        if (novoEstado !== estado) {
            estado = novoEstado 
            atualizarDOM() 
            generate() 
        }
    })
})


