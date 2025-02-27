
// PARTE-1 [DEFINIÇÃO DO REGISTRO]
const aluno = (nome, idade, matricula, curso) => Object.freeze({ nome, idade, matricula, curso })

// PARTE-2 [CRIAÇÃO DO REGISTRO]
const turma = Object.freeze([
    aluno("Helen", 22, 2021000, "CC"),
    aluno("Paula", 20, 2022001, "EC"),
    aluno("Breno", 22, 2023002, "CC"),
    aluno("Kalil", 78, 1978003, "SI")
]);

// PARTE-3 [ADIÇÃO DE ALUNOS]
const adicionarAluno = (nome, idade, matricula, curso) => {
    const alunoNovo = aluno(nome, idade, matricula, curso)
    return Object.freeze([...turma, alunoNovo])
}

// PARTE-4 [LISTAGEM DE ALUNOS]
const listagemAlunos = (turma) => {
    turma.forEach(aluno => {
        
    })
}

//PARTE-5 [BUSCA POR CURSO]
const buscaPorCurso = (turma, curso) => {
    return Object.freeze(turma.filter(aluno => aluno.curso === curso));
};

//PARTE-6 [REMOÇÃO DE ALUNOS]

const removerAluno = (turma, nome) => {
    return Object.freeze(turma.filter(aluno => aluno.nome !== nome));
};

//PARTE-7 [ORDENAÇÃO DOS ALUNOS]

const ordenarAlunosPorMatricula = (turma) => {
    return Object.freeze([...turma].sort((a, b) => a.matricula - b.matricula));
};

//PARTE-8 [CONTAGEM DE ALUNOS POR CURSO]

const numAlunosPorCurso = (turma) => {
    // Object.freeze impede que novas propriedades sejam adicionadas a ele
    return Object.freeze(turma.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1
        return acc
        
    }, {}))
}

//PARTE-9 [EDIÇÃO DE ALUNOS]
// Permita a edição dos detalhes de um(a) aluno(a), como nome, matricula, idade ou curso.
const editarAluno = (turma, nome, novosDetalhes) => {
    return Object.freeze(turma.map(aluno => aluno.nome == nome 
        ? {...aluno, ...novosDetalhes} : aluno
    ))
}

console.log ("Turma Original\n", turma)

const novaTurma = adicionarAluno("Carlos", 23, 2024004, "CC");
console.log("\nTurma após adição de Carlos:", novaTurma);

console.log("\nListagem de alunos:");
listagemAlunos(turma);

const alunosCC = buscaPorCurso(turma, "CC");
console.log("\nAlunos do curso CC:", alunosCC);

const turmaSemKalil = removerAluno(turma, "Kalil");
console.log("\nTurma após remoção de Kalil:", turmaSemKalil);

const turmaOrdenada = ordenarAlunosPorMatricula(turma);
console.log("\nTurma ordenada por matrícula:", turmaOrdenada);

const contagemDeAlunosDosCursos = numAlunosPorCurso(turma);
console.log("\nNúmero de alunos por curso:", contagemDeAlunosDosCursos);

const turmaAtualizada = editarAluno(turma, "Kalil", { nome: "Bruno", idade: 58 });
console.log("\nTurma após edição do aluno Kalil:", turmaAtualizada);
