import React, { useState, useEffect, useRef } from 'react';
import { useMQTT } from '../../service/mqtt';
import { MessageSquare } from 'lucide-react'; // ícone de mensagem
import "./enviarMsg.css";

const EnviarMensagem = ({ esp_mac }) => {
  const { client, isConnected } = useMQTT();
  const [mensagem, setMensagem] = useState('');
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [chatAberto, setChatAberto] = useState(false);
  const [cardAberto, setCardAberto] = useState(false);
  const msgRef = useRef(null);
  const enviarMensagem = () => {
    if (isConnected && client && mensagem.trim() !== '') {
      try {
        client.publish(`${esp_mac}/msg`, mensagem);
        setMensagemEnviada(true);
        setTimeout(() => setMensagemEnviada(false), 3000);
        setMensagem('');
      } catch (error) {
        console.log(error);
      }
      //console.log('Mensagem enviada!');

    }
    //  else {
    //   console.log('MQTT não conectado ou mensagem vazia.');
    // }
  };
 
  

  useEffect(() => {
          const handleClickFora = (event) => {
              if (msgRef.current && !msgRef.current.contains(event.target)) {
                  setChatAberto(false);
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
    <div className='icon-mensagem' >
      {/* Ícone flutuante */}
      <div className='icon-chat' 
        
        onClick={() => setChatAberto(!chatAberto)}
      >
        <MessageSquare color="white" size={24} />
      </div>

      {/* Mini chat */}
      {chatAberto && (
        <div className='mini-chat'
        onMouseEnter={() => setChatAberto(true)}
        onMouseLeave={() => {
          if (!cardAberto) setCardAberto(false);
        }}
        ref={msgRef}
        >
  
          <h3  className='enviar'>Enviar mensagem</h3>

          {mensagemEnviada && (
            <p className='envio'>
              Mensagem enviada com sucesso!
            </p>
          )}

          <textarea
            className="textarea-chat"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            maxLength={100}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviarMensagem();
              }
            }}
          />
          <div
          className='enviar-container'>
            <small>{mensagem.length}/100</small>
            <button
            className='enviar-button' 
            onClick={()=>{enviarMensagem()}} >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnviarMensagem;
