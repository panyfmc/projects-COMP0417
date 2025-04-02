/*document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid")     // o contêiner do tabuleiro do jogo.
    const scoreDisplay = document.querySelector("#score")   // onde o placar será exibido
    const resultDisplay = document.querySelector("#result") // mensagens como "You WIN!" ou "You LOSE!" serão exibidas.
    const width = 4     // largura do tabuleiro (4x4).
    const score = 0     // o placar inicializado com 0.
    const squares = []  // as células do tabuleiro.


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


   // Gera um número 2 em uma posição aleatória do tabuleiro.
    const generate = () => 
        (squares[Math.floor(Math.random() * squares.length)].innerHTML == 0     // Verifica se a célula está vazia,
            ? (squares[Math.floor(Math.random() * squares.length)].innerHTML = 2, // se estiver vazia, coloca o número 2.
                checkForGameOver())     // Verifica se o jogo terminou.
            : generate()) // se não estiver vazia, chama a função generate novamente para gerar um novo número 2.
    

})*/

let estado = inicializarJogo();

function renderizar() {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    estado.board.forEach(valor => {
        const celula = document.createElement("div");
        celula.classList.add("celula");
        celula.textContent = valor !== 0 ? valor : "";
        tabuleiro.appendChild(celula);
    });

    document.getElementById("pontuacao").textContent = estado.score;
}

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");

    for (let i = 0; i < 16; i++) {
        let cell = document.createElement("div");
        grid.appendChild(cell);
    }
});

renderizar();

