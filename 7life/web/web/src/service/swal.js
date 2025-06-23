import Swal from 'sweetalert2'

const ErrorApi = () => {
    Swal.fire({
        icon: 'error',
        title: 'Erro de Conexão',
        text: 'O sistema tem um erro na API. Por favor, entre em contato com o suporte e tente novamente mais tarde.',
        confirmButtonText: 'OK'
    });
}
const CadastroSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        text: 'Seu cadastro foi concluído com sucesso.',
        confirmButtonText: 'OK'
    });
}
const ErrorDados = (props = {}) => {
    const { campo } = props;
    Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text:  campo 
        ? `Por favor, preencha o campo ${campo}` 
        : 'Por favor, preencha todos os campos do formulário.',
        confirmButtonText: 'OK'
    });
}

export { ErrorApi, CadastroSuccess, ErrorDados}