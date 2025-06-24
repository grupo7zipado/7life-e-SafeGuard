/*

*/
#include <WiFi.h>
#include <PubSubClient.h>
#include <time.h>
#include <ArduinoJson.h>
#include <Preferences.h> 

// Definições da rede Wi-Fi
const char* ssid = "TP-Link_0486";
const char* password = "46179951";
// const char* ssid = "777zip";
// const char* password = "R125redes";
// Definições do Broker MQTT
//const char* mqtt_broker = "192.168.1.103";  // Ou IP do seu broker local
// const char* mqtt_broker = "10.67.23.44";  // Ou IP do seu broker local
const char* mqtt_broker = "7life.kinghost.net";  // Ou IP do seu broker local
const int mqtt_port = 21000;


const char* mqtt_client_id = "ESP32_MQTT";
const char* mqtt_topic_sub = "esp32/teste";   // Tópico para inscrição
const char* mqtt_topic_pub = "esp32/envio";   // Tópico para publicação

WiFiClient espClient;
PubSubClient mqttClient(espClient);
Preferences prefs;
String mac_address;
String topic_pub_request_user;
String topic_sub_response_user;
String topic_sub_msg;
String user;
unsigned long tempoAnterior = 0;
const unsigned long intervalo = 5000; // 5 segundos
unsigned long tempoMensagem = 0;
bool mostrandoMensagem = false;
// Callback quando receber uma mensagem MQTT
void mqttCallback(char* topic, byte* payload, unsigned int length) {
    //verifica se o topico e o correto
    if(strcmp(topic, topic_sub_response_user.c_str()) == 0){
        //joga o payload(usuario) dentro de uma variavel
        String novoUser;
        for (int i = 0; i < length; i++) {
            novoUser += (char)payload[i];
        }
        // Salvar novo valor do usuario permanentemente
        prefs.begin("config", false);
        prefs.putString("user", novoUser);
        prefs.end();
        // Atualiza o valor do usuário no codigo
        user = novoUser;
    }
  String msg = "";

  if (strcmp(topic, topic_sub_msg.c_str()) == 0) {
    for (int i = 0; i < length; i++) {
      msg += (char)payload[i];
    }
    tempoMensagem = millis();
    mostrandoMensagem = true;
    Serial.println(msg);  // ou o que você quiser fazer com a mensagem
  }
}

void atualizarTopicos(){
  topic_pub_request_user = mac_address + "/request_user";
  topic_sub_response_user = mac_address + "/response_user";
  topic_sub_msg = mac_address + "/msg";
}

void enviarPrimeiraMensagem() {
    while (!mqttClient.publish(topic_pub_request_user.c_str(), mac_address.c_str())) {
        delay(3000);
    }

}


// Função para conectar ao Wi-Fi
void setup_wifi() {
	    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }
}

// Função para conectar ao Broker MQTT
void reconnect_mqtt() {
    while (!mqttClient.connected()) {
        Serial.print(" Conectando ao Broker MQTT...");
        if (mqttClient.connect(mqtt_client_id)) {
            Serial.println(" Conectado!");
            mqttClient.subscribe(topic_sub_response_user.c_str());
            mqttClient.subscribe(topic_sub_msg.c_str());  // Inscreve-se no tópico
        } else {
            Serial.print(" Falha, código: ");
            Serial.print(mqttClient.state());
            Serial.println(" Tentando novamente em 5s...");
            delay(5000);
        }
    }
}

const char* tipos[] = { "temperatura", "oxigenacao", "bpm" };

void setup() {
  Serial.begin(115200);
  setup_wifi();
  mac_address = WiFi.macAddress();
  configTime(-3 * 3600, 0, "pool.ntp.org");
  mqttClient.setServer(mqtt_broker, mqtt_port);
  mqttClient.setCallback(mqttCallback);
  atualizarTopicos();
  configTime(-3 * 3600, 0, "pool.ntp.org");

  // Abrir namespace "config" no modo leitura/escrita
  prefs.begin("config", false);
  // temporario para testes
  prefs.remove("user");
  // Ver se já existe valor salvo
  user = prefs.getString("user", "");
}
void loop() {

  if (!mqttClient.connected()) {
    reconnect_mqtt();
  }
  mqttClient.loop();



	if (user == "") {
        static bool primeiraMensagemEnviada = false;
        //pede um novo usuário
        if (!primeiraMensagemEnviada) {
            enviarPrimeiraMensagem();
            primeiraMensagemEnviada = true;
        }
    } else {
        unsigned long tempoAtual = millis();

        // Se passaram 5 segundos?
        if (tempoAtual - tempoAnterior >= intervalo) {
            tempoAnterior = tempoAtual;
            // Aqui você coloca o que deseja fazer a cada 5 segundos
            // put your main code here, to run repeatedly:
  			for (int i = 0; i < 3; i++) {
    			std::string valor;
			
    			if (strcmp(tipos[i], "temperatura") == 0) {
              float valorFloat = random(330, 370)/10.0;
              String valorString = String(valorFloat, 2);  
        			valor = valorString.c_str(); 
    			} else if (strcmp(tipos[i], "oxigenacao") == 0) {
        			valor = std::to_string(random(90, 100));
    			} else if (strcmp(tipos[i], "bpm") == 0) {
        			valor = std::to_string(random(60, 120));
    			}
			
    			StaticJsonDocument<200> doc;
    			doc["use_id"] = user;
    			doc["dados_tipo"] = tipos[i];
    			doc["dados_valor"] = valor;
    			doc["dados_generate"] = time(NULL);
			
    			String e;
    			serializeJson(doc, e);
          String global = mac_address + "/" + tipos[i];
    			// 🚀 Verifica se a mensagem foi publicada com sucesso
    			if (mqttClient.publish(global.c_str(), e.c_str())) {
      			Serial.println("✅ Mensagem enviada: " + e);
    			} else {
      			Serial.println("❌ ERRO ao enviar: " + e);
    			}
        }
      }
    }
  }


