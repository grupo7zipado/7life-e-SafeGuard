const CalcularIdade = (dataNascimento) => {
    // Obtendo a data atual
    var dataAtual = new Date();

    // Obtendo a data de nascimento do usuário
    var anoNascimento = dataNascimento.getFullYear();
    var mesNascimento = dataNascimento.getMonth();
    var diaNascimento = dataNascimento.getDate();

    // Obtendo a data atual
    var anoAtual = dataAtual.getFullYear();
    var mesAtual = dataAtual.getMonth();
    var diaAtual = dataAtual.getDate();

    // Calculando a idade
    var idade = anoAtual - anoNascimento;

    // Verificando se o aniversário já ocorreu este ano
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }

    return idade;
}
export default CalcularIdade