import { useState } from 'react';
import './registerUser.css'
import { useEffect } from 'react';
import CalcularIdade from '../../service/idade';
import { CadastroSuccess, ErrorDados } from '../../service/swal';
import ConnApi from '../../service/conn';

// Formulário para cadastro de usuario colaborativo //
const RegisterUser = () => {

    const [nome , setNome] = useState("");
    const [sobrenome , setSobrenome] = useState("");
    const [nascimento, setNascimento] = useState("");

    const CadastroDeUsuarios = async ()=>{

        //Valida o nome
        if (!nome) {
            ErrorDados({campo:"nome"})
            return;
        }

        //Valida o sobrenome
        if (!sobrenome) {
            ErrorDados({campo:"sobrenome"})
            return;
        }

        //Valida a data de nascimento
        if (!nascimento) {
            ErrorDados({campo:"data de nascimento"})
            return;
        }

        //Valida a idade
        if ( CalcularIdade(new Date(nascimento)) < 18 || CalcularIdade(new Date(nascimento)) > 80 ) {
            ErrorDados({campo:"data de nascimento válida"})
            return;
        }

        try {
            const dados= {
                usu_nome: nome.trim()+ " " + sobrenome.trim(),
                usu_nascimento: nascimento
            }
            const resposta = await ConnApi.post("/usuarios", dados);
            if (resposta.data.message == "suscesso") {
                CadastroSuccess();
            }
        } catch (error) {
            console.log(error);
               
        }
    }


    // useEffect(()=>{console.log(nome);},[nome])

    
    return (
        <div className="register-container fdc ac df jcsa w600 h400 br20 wmax090">
            <h2 className='fs1_5'>— CADASTRO DE USUÁRIO —</h2>
            <div className="form-wrapper jcc w090 h050  br20 wmax090 hmin200">
                <div className="form-fields w080">
                    {/* Campo a serem preenchidos */}
                    <input 
                        type="text" 
                        placeholder="NOME" 
                        className="input-field " 
                        value={nome}
                        onInput={(e) => {
                            const apenasLetras = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                            setNome(apenasLetras);
                        }}
                        required
                    />

                    <input 
                        type="text" 
                        placeholder="SOBRENOME" 
                        className="input-field" 
                        value={sobrenome}
                        onInput={(e) => {
                            const apenasLetras = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                            setSobrenome(apenasLetras);
                        }}
                        required
                    />
                    <input 
                        type="date" 
                        className="input-field" 
                        name='nascimento'
                        value={nascimento}
                        onChange={(e)=>{setNascimento(e.target.value)}}
                        required
                    />
                </div>
            </div>
            {/* Conclusão de cadastro */}
            <button 
                className="submit-button h50" 
                onClick={
                    ()=>{
                        CadastroDeUsuarios()
                    }
                }
            >
                CONCLUIR CADASTRO
            </button>
        </div>
    );
};

export default RegisterUser;
   