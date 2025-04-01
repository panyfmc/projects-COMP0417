const inicializarEstado = () => ({  //Necessário para inicializar p jogo
    board: Array(16).fill(0),       //Array(16) que é o tabuleiro e .fill(0) e prencher elas com 0 
    score: 0,
    status: "playing"               //necessário para indicar o estado e trocar quando ganha ou perde
});

