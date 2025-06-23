import { useState, useEffect, useRef } from "react";
import "./header.css";

const Header = ({setTela}) => {

    const [mostrarCard, setMostrarCard] = useState(false);
    const [cardAberto, setCardAberto] = useState(false); // novo estado
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const cardRef = useRef(null);

    let timeoutId;

    // Fecha o card quando clicar fora dele
    useEffect(() => {
        const handleClickFora = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setMostrarCard(false);
                setCardAberto(false);
            }
        };

        // Adiciona o event listener
        document.addEventListener("mousedown", handleClickFora);
        
        return () => {
            document.removeEventListener("mousedown", handleClickFora);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-buttons">
                {/* Botão do Menu */}

                <button
                    className="header-button-menu"
                    onMouseEnter={() => setMostrarCard(true)}
                    onMouseLeave={() => {
                        if (!cardAberto) setMostrarCard(false);
                    }}
                    onClick={() => {
                        setCardAberto(true);
                        setMostrarCard(true); // garante que esteja visível ao clicar
                    }}
                >
                    
                    <div className="button-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </div>
                </button>
               

                    {/* Imagem-Logo */}
                    <div className="img-logo">
                    <img src ="img\7zipLogo (2).png" className="logoproj" />
                    </div>
                 
               
             
                 {/* Botão de saída */}
                <button className="header-button-saida"
                    onMouseEnter={() => setMostrarMensagem(true)}
                    onMouseLeave={() => setMostrarMensagem(false)}
                    onClick={() => { setTela("card"); }} // <-- AQUI
                >
                    {mostrarMensagem && <p className="mensagem-saida">Voltar</p>}
                    <div className="button-saida">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-log-out">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                    </div>
                </button>
            </div>
            
            {/* Card do Menu */}
            {mostrarCard && (
                <div className="menu-card" ref={cardRef}
                
                onMouseEnter={() => setMostrarCard(true)}
                onMouseLeave={() => {
                  if (!cardAberto) setMostrarCard(false);
                }}>
                    <button className="menu-item" onClick={()=>{setTela("card")}} >Home</button>
                    <button className="menu-item" onClick={()=>{setTela("cadUser")}} >Adicionar Usuário</button>
                    <button className="menu-item" onClick={()=>{setTela("espUser")}} >Esp Usuário</button>

                    <button className="menu-item" onClick={()=>{setTela("config")}}>Configurações</button>
                    <button
                        className="menu-item border"
                        style={{ borderBottomRightRadius: "110px" }}
                        onClick={()=>{setTela("sobre")}}
                        >
                            Sobre
                    </button>

                    
                    
                    
                </div>
            )}
        </header>
    );
};

export default Header;
