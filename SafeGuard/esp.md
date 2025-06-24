
# 📡 Módulo de Coleta: ESP32 e Sensores

O módulo de coleta de dados do projeto é composto por um **ESP32-C3 Mini**, responsável por realizar a leitura, o processamento e a transmissão dos sinais vitais captados pelos sensores. Este microcontrolador é uma solução compacta, com conectividade Wi-Fi integrada, ideal para aplicações IoT como a proposta do projeto.

---

## 📍 Componentes Integrados ao ESP32

- **Sensor MAX30105:**  
Utilizado para a medição da **frequência cardíaca (BPM)** e da **oxigenação do sangue (SpO₂)**, através de fotopletismografia.

- **Sensor MLX90614:**  
Sensor infravermelho sem contato, responsável pela **leitura da temperatura corporal**.

- **Display OLED (SSD1306):**  
Utilizado para a exibição local dos principais dados coletados (**BPM**, **SpO₂**, **temperatura** e **horário atual**), facilitando o monitoramento direto no dispositivo.

---

## 🔗 Comunicação e Barramento

Todos os sensores e o display estão conectados ao ESP32 através do **barramento I2C**, utilizando a biblioteca **Wire.h**. Foram utilizados os seguintes pinos:

- **SDA:** GPIO 8  
- **SCL:** GPIO 9  

---

## 🔁 Funcionamento Cíclico

O ESP32 realiza o seguinte ciclo de operação a cada **5 segundos**:

1. Faz a **leitura dos sensores**.
2. **Exibe os dados** no OLED.
3. Formata os dados em **JSON**.
4. **Publica as informações** no **broker MQTT**, garantindo a transmissão em tempo real para o backend.

---

## 🕒 Sincronização de Horário (NTP)

Para garantir que cada registro de dados tenha o **timestamp correto**, o ESP32 utiliza o **protocolo NTP (Network Time Protocol)**, obtendo a hora atual pela internet via **biblioteca time.h**.

---

## 🔋 Alimentação do Dispositivo

O protótipo é alimentado por uma **bateria Li-Ion recarregável**, com controle de carga feito por um módulo **TP4056**. Um **interruptor físico** foi adicionado, permitindo o acionamento e desligamento manual do sistema.

---

## 📚 Bibliotecas Utilizadas

As seguintes bibliotecas foram utilizadas no código embarcado no ESP32:

```
<Wire.h>  
Responsável pela comunicação via I2C com os sensores e o display.

<WiFi.h>  
Conexão com a rede Wi-Fi.

<Preferences.h>  
Armazenamento de configurações persistentes na memória flash.

<time.h>  
Sincronização de horário via NTP.

"MAX30105.h"  
Leitura de BPM e SpO₂ do sensor MAX30105.

"heartRate.h"  
Cálculo e processamento do BPM e SpO₂.

<Adafruit_MLX90614.h>  
Leitura da temperatura corporal pelo sensor MLX90614.

<Adafruit_SSD1306.h>  
Controle e atualização das informações exibidas no display OLED.

<PubSubClient.h>  
Responsável pela comunicação MQTT.

<ArduinoJson.h>  
Formatação dos dados em JSON para envio ao backend.
```

