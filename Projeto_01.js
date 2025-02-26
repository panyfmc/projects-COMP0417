//Teste de projeto git commit -a -m "ALTERAÇÃO"
//                 git push origin master

// PARTE-1 [DEFINIÇÃO DO REGISTRO]
const aluno = (nome, idade, matricula, curso) => Object.freeze({ nome, idade, matricula, curso });

// PARTE-2 [CRIAÇÃO DO REGISTRO]
const turma = Object.freeze([
    aluno("Helen", 22, 2021000, "CC"),
    aluno("Paula", 20, 2022001, "SI"),
    aluno("Breno", 22, 2023002, "EC"),
    aluno("Kalil", 78, 1978003, "CC")
]);

// PARTE-3 [ADIÇÃO DE ALUNOS]
const adicionarAluno = (nome, idade, matricula, curso) => {
    const alunoNovo = aluno(nome, idade, matricula, curso);
    return Object.freeze([...turma, alunoNovo]);
};

// PARTE-4 [LISTAGEM DE ALUNOS]
const listagemAlunos = (turma) => {
    turma.forEach(aluno => {
        console.log(`Nome: ${aluno.nome}, Idade: ${aluno.idade}, Matrícula: ${aluno.matricula}, Curso: ${aluno.curso}`);
    });
};

//PARTE-5 [BUSCA POR CURSO]

//PARTE-6 [REMOÇÃO DE ALUNOS]

//PARTE-7 [ORDENAÇÃO DOS ALUNOS]

//PARTE-8 [CONTAGEM DE ALUNOS POR CURSO]

//PARTE-9 [EDIÇÃO DE ALUNOS]
