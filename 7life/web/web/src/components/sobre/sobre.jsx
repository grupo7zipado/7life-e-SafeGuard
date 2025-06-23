import "./sobre.css";

const Sobre = () => {
  return (
    <section className="area-sobre">
      <h2 className="titulo-sobre">Sobre Nós</h2>

      <div className="sub-area">
        <label className="subtext">Informações de contato:</label>
        <label className="text-sobre">Email: grupo7zipado@gmail.com</label>
        <label className="text-sobre">Telefone: (14)99662-2438</label>
      </div>

      <div className="area-projeto">
        <h3 className="titulo-projeto">Sobre o Projeto</h3>
        <p className="texto-projeto">
          O projeto visa unir o protótipo IoT Safeguard e o sistema SetLife (7Life), criando um serviço de monitoramento de sinais vitais multiusuário em tempo real em ambientes de ocupação colaborativa. Como foco em monitorar os sinais vitais dos colaboradores em ambiente de trabalho para reduzir o risco de acidentes vindos de problemas patológicos.
          <br /><br />
          O Safeguard consistirá de um invólucro contendo um ESP32 (C3), oxímetro, sensor de temperatura e uma bateria de alimentação, fazendo a medição dos seguintes sinais vitais do usuário: batimento cardíaco (bpm), temperatura (°C) e oxigenação sanguínea (%).
          <br /><br />
          - Munhequeira protetora anatômica<br />
          - Carregador de bateria Tp4056 Type-C<br />
          - Bateria Li-po 3.7V<br />
          - ESP32-C3 Super mini<br />
          - Módulo sensor de temperatura MLX90614ESF<br />
          - Módulo sensor de BPM e spO2 MAX30102
          <br /><br />
          O SetLife (7L) consistirá de um servidor Linux (Ubuntu) que disponibilizará os serviços de:<br />
          - Broker MQTT para o Safeguard, ao qual os dados do dispositivo passaram ao broker para serem armazenados.<br />
          - Banco de dados MySQL para armazenamento dos dados<br />
          - API para comunicação entre as aplicações web e banco, ao qual a página web solicita dados ao banco e a API realiza essa operação<br />
          - Página web em React.JS para visualização dos dados e cadastro de usuários e dispositivos safeguard.
        </p>
      </div>
    </section>
  );
};

export default Sobre;