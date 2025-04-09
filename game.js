let estado = { board: [], score: 0 } // Inicializa o estado com um tabuleiro vazio e pontuação 0.
document.getElementById("botao-iniciar").addEventListener("click", function () {
    const telaInicio = document.getElementById("iniciar-tela");
    const containerJogo = document.getElementById("game-container");

    telaInicio.classList.add("hidden");
    containerJogo.classList.remove("hidden");
    containerJogo.classList.add("show");
});

document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("iniciar-tela");
    const startButton = document.getElementById("botao-iniciar");
    const gameContainer = document.getElementById("game-container");

    startButton.addEventListener("click", () => {
        startScreen.classList.add("hidden"); // Oculta a tela inicial
        gameContainer.classList.remove("hidden"); // Exibe o jogo
    });

    const gridDisplay = document.querySelector(".grid")     // o contêiner do tabuleiro do jogo.
    const scoreDisplay = document.querySelector("#score")   // onde o placar será exibido
    const resultDisplay = document.querySelector("#result") // mensagens como "You WIN!" ou "You LOSE!" serão exibidas.
    const restartButton = document.querySelector("#botao-reiniciar") // Seleciona o botão de reiniciar
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

    const reiniciarJogo = () => {
        estado = inicializarJogo() // Reinicia o estado do jogo
        atualizarDOM() // Atualiza o DOM para refletir o novo estado
    }

    restartButton.addEventListener("click", reiniciarJogo) // Adiciona evento ao botão

    createBoard() 

    // Inicializa o estado do jogo com dois números aleatórios no tabuleiro.
    estado.board = squares.map(square => parseInt(square.innerHTML))
    estado = inicializarJogo()
    atualizarDOM()

    document.addEventListener("keydown", (evento) => {
        const novoEstado = atualizarEstado(evento, estado) // Atualiza o estado do jogo com base na tecla pressionada
        if (novoEstado !== estado) {
            estado = novoEstado 
            atualizarDOM() 
           // generate() //Esse generate aqui que tava causando todo o desespero desse grupo slk
        }
    })
})


