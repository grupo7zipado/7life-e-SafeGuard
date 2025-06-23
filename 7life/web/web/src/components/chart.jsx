import { useEffect, useState } from "react";
import "./chart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ConnApi from "../service/conn";
import { useMQTT } from "../service/mqtt";


const GraficoLog = ({values, mudarGrafico, setMudarGrafico, dadosExibidos}) => {







  return (
    <section className="grafico-area df ac jcc ">

        <ul className="filtro-graphics">
            <li onClick={() => setMudarGrafico("temperatura")} className=" style-button" > Temperatura</li>
            <li onClick={() => setMudarGrafico("bpm")} className=" style-button"> BPM</li>
            <li onClick={() => setMudarGrafico("oxigenacao")} className=" style-button"> Oxigenação</li>
      
        </ul>
        
          <div className="graficoEstilo">
            <ResponsiveContainer  width="100%" height={400}>

            {/* <LineChart data={data}> */}
            <LineChart data={dadosExibidos}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dados_generate" />
                <YAxis 
                  domain={["auto"]} 
                />
                <Tooltip />
                <Legend   />
          

                <Line 
                  key={mudarGrafico} 
                  type="monotone" 
                  dataKey={"dados_valor"} 
                  stroke={mudarGrafico === "temperatura" ? "#fdb44b" : mudarGrafico === "bpm" ? "#f4a3a3" : "#e0e0e0"} 
                  name={mudarGrafico == "oxigenacao"? "OXIGENAÇÃO": mudarGrafico.toUpperCase() }
                  isAnimationActive={true} 
                  animationDuration={800} 
                />



            </LineChart>
            </ResponsiveContainer>
          </div>
       

    </section>
  );
};

export default GraficoLog;