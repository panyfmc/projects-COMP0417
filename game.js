document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid")     // o contêiner do tabuleiro do jogo.
    const scoreDisplay = document.querySelector("#score")   // onde o placar será exibido
    const resultDisplay = document.querySelector("#result") // mensagens como "You WIN!" ou "You LOSE!" serão exibidas.
    const width = 4     // largura do tabuleiro (4x4).
    const score = 0     // o placar inicializado com 0.
    const squares = []  // as células do tabuleiro.
    const generate = (estado) => {
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

   // Cria o tabuleiro do jogo.
    const createBoard = (i = 0) => {    // i é o índice inicializado com 0.
        if (i >= width * width) {   // Se o índice for maior ou igual ao número total de células (16),
            // Gera dois números 2 no tabuleiro
            generate() 
            generate()
            return
        }
    
        const square = document.createElement("div")
        square.innerHTML = 0        // inicializa cada célula com 0.
        gridDisplay.appendChild(square) // adiciona a célula ao contêiner gridDisplay,
        squares.push(square)     // adiciona a célula ao array squares.
    
        createBoard(i + 1) // Recursividade para o próximo índice.
    }
    
    createBoard() // cria o tabuleiro chamando a função createBoard.



    

})

