//Teste de projeto git commit -a -m "ALTERAÇÃO"
//                 git push origin master

//PARTE-1 [DEFINIÇÃO DO REGISTRO]
const aluno =(nome,idade,matricula,curso)=>Object.freeze({nome, idade, matricula, curso})

//PARTE-2[CRIAÇÃO DO REGISTRO]
const turma =Object.freeze([
    criarAluno("Breno",22,2021000,"CC"),
    criarAluno("Paula",20,2022001,"SI"),
    criarAluno("Breno",22,2023002,"EC"),
    criarAluno("Kalil",78,1978003,"CC")
])

//PARTE-3 [ADIÇÃO DE ALUNOS]

//PARTE-4 [LISTAGEM DE ALUNOS]

//PARTE-5 [BUSCA POR CURSO]

//PARTE-6 [REMOÇÃO DE ALUNOS]

//PARTE-7 [ORDENAÇÃO DOS ALUNOS]

//PARTE-8 [CONTAGEM DE ALUNOS POR CURSO]

//PARTE-9 [EDIÇÃO DE ALUNOS]
